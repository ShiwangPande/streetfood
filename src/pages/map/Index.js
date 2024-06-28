import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { IconCurrentLocation } from '@tabler/icons-react';
import Tabbar from '../../components/Tabbar';
import { Geolocation } from '@capacitor/geolocation';

import { useMemo } from 'react';

const streetVendorIcon = new L.Icon({
    iconUrl: 'https://i.postimg.cc/W1WXqByq/street-food.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const userLocationIcon = new L.Icon({
    iconUrl: 'https://i.postimg.cc/fLJLT990/placeholder.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [vendors, setVendors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFoodItems, setSelectedFoodItems] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [radius, setRadius] = useState(5); // Default radius is 5km
    const [customRadius, setCustomRadius] = useState('');
    const mapRef = useRef();

    const base_url = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY; // Ensure correct environment variable name

    // Function to calculate distance between two points
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance; // Distance in km
    };

    // Function to reverse geocode coordinates to get address
    const reverseGeocode = async (lat, lon) => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const results = response.data.results;
            if (results.length > 0) {
                return results[0].formatted;
            }
            return 'Unknown location';
        } catch (error) {
            console.error('Error fetching address:', error);
            return 'Unknown location';
        }
    };

    // Request location PermissionStatus and fetch user location
    const requestLocationPermission = async () => {
        try {
            const permission = await PermissionStatus.request({ name: 'geolocation' });

            if (permission.state === 'granted') {
                const position = await Geolocation.getCurrentPosition();
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            } else {
                console.error('Location permission denied');
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

    // Fetch vendors data and user location on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://kartmatchbackend.onrender.com/vendors');
                const vendorsData = response.data;

                const updatedVendors = await Promise.all(
                    vendorsData.map(async (vendor) => {
                        const address = await reverseGeocode(
                            vendor.location.coordinates[1],
                            vendor.location.coordinates[0]
                        );
                        return { ...vendor, address };
                    })
                );

                setVendors(updatedVendors);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchData();
        requestLocationPermission();
    }, []);

    // Watch user's current location and update
    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            {},
            (position, err) => {
                if (err) {
                    console.error('Error getting user location:', err);
                    return;
                }
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            }
        );

        return () => {
            if (watchId !== null) {
                Geolocation.clearWatch({ id: watchId });
            }
        };
    }, []);

    // Memoize the filtered vendors
    useEffect(() => {
        const radiusValue = radius === 'other' ? parseFloat(customRadius) : radius;

        const filtered = vendors.filter((vendor) => {
            const matchesFoodItem = selectedFoodItems.length === 0 ||
                (vendor.foodItems && vendor.foodItems.some((foodItem) => {
                    if (typeof foodItem === 'string') {
                        return selectedFoodItems.includes(foodItem);
                    }
                    return false;
                }));
            const matchesSearchQuery = searchQuery === '' ||
                vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (vendor.foodItems && vendor.foodItems.some((foodItem) => {
                    if (typeof foodItem === 'string') {
                        return foodItem.toLowerCase().includes(searchQuery.toLowerCase());
                    }
                    return false;
                }));
            return matchesFoodItem && matchesSearchQuery &&
                (userLocation ? calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    vendor.location.coordinates[1],
                    vendor.location.coordinates[0]
                ) <= radiusValue : true);
        });

        setFilteredVendors(filtered); // Update filteredVendors state
    }, [vendors, searchQuery, selectedFoodItems, userLocation, radius, customRadius]);

    // Memoize filteredOptions for food item search
    const filteredOptions = useMemo(() => {
        return Array.from(
            new Set(vendors.flatMap((vendor) => vendor.foodItems))
        ).filter((option) =>
            typeof option === 'string' && // Ensure option is a string
            option.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedFoodItems.includes(option)
        );
    }, [vendors, searchQuery, selectedFoodItems]);

    // Handle search input change
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setShowOptions(true);
    };

    // Adjust map view on user location or radius change
    useEffect(() => {
        if (userLocation && mapRef.current) {
            mapRef.current.setView([userLocation.latitude, userLocation.longitude], getZoomLevel(radius));
        }
    }, [userLocation, radius]);

    // Get appropriate zoom level based on radius
    const getZoomLevel = (radius) => {
        const radiusValue = radius === 'other' ? parseFloat(customRadius) : radius;
        if (radiusValue <= 5) return 13;
        if (radiusValue <= 10) return 12;
        return 11; // Adjust as necessary
    };

    // Toggle dropdown visibility for selected food items
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Remove selected food item from the list
    const removeSelectedFoodItem = (itemToRemove) => {
        setSelectedFoodItems((prevItems) =>
            prevItems.filter((item) => item !== itemToRemove)
        );
    };

    // Redirect to user's current location on the map
    const redirectToCurrentLocation = () => {
        if (userLocation && mapRef.current) {
            mapRef.current.setView([userLocation.latitude, userLocation.longitude], getZoomLevel(radius));
        }
    };

    // Generate Google Maps directions URL for a vendor
    const getDirectionsUrl = (vendor) => {
        if (!userLocation) return '';

        const { latitude, longitude } = userLocation;
        const vendorLat = vendor.location.coordinates[1];
        const vendorLon = vendor.location.coordinates[0];

        return `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${vendorLat},${vendorLon}`;
    };


    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">

            <div className="w-full lg:w-1/3 h-1/2 lg:h-full bg-white p-4 overflow-y-auto order-2 lg:order-1">
                <div className="mb-4">
                    <label htmlFor="search" className="block text-gray-700 font-semibold mb-2">Search</label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by food item or vendor name"
                        className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {showOptions && searchQuery && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                            {filteredOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedFoodItems([...selectedFoodItems, option]);
                                        setSearchQuery('');
                                        setShowOptions(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="radius" className="block text-gray-700 font-semibold mb-2">Search Radius (km)</label>
                    <select
                        id="radius"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                        <option value="other">Other</option>
                    </select>
                    {radius === 'other' && (
                        <input
                            type="number"
                            value={customRadius}
                            onChange={(e) => setCustomRadius(e.target.value)}
                            placeholder="Enter custom radius in km"
                            className="block w-full p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    )}
                </div>
                <div className="relative mb-4">
                    {selectedFoodItems.length > 0 && (
                        <div className="mb-4">
                            <button
                                onClick={toggleDropdown}
                                className="text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-black w-full text-left"
                            >
                                {isOpen ? 'Hide Selected Food Items' : 'Show Selected Food Items'}
                            </button>
                            {isOpen && (
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    {selectedFoodItems.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center mb-2">
                                            <span>{item}</span>
                                            <button
                                                onClick={() => removeSelectedFoodItem(item)}
                                                className="text-gray-600 hover:text-red-600 focus:outline-none"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <h2 className="text-xl font-bold mb-4">Vendors</h2>
                    {filteredVendors.map((vendor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
                            <button
                                onClick={() => setFilteredVendors(filteredVendors.filter((_, i) => i !== index))}
                                className="absolute top-2 right-2 text-gray-600 hover:text-red-600 focus:outline-none"
                            >
                                <FaTimes />
                            </button>
                            <div className='flex flex-row gap-4'>
                                <div>
                                    <img src={vendor.photoUrl} alt={vendor.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                                    <p className="text-gray-600">{vendor.address}</p>
                                    <p>Food Items: {vendor.foodItems.join(', ')}</p>
                                    <p>Hygiene Rating: {vendor.hygieneRating}</p>
                                    <p>Taste Rating: {vendor.tasteRating}</p>
                                    <p>Hospitality Rating: {vendor.hospitalityRating}</p>
                                    <a
                                        href={getDirectionsUrl(vendor)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-blue-500 hover:underline"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative order-1 lg:order-2">
                <MapContainer
                    center={userLocation ? [userLocation.latitude, userLocation.longitude] : [51.505, -0.09]}
                    zoom={getZoomLevel(radius)}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userLocation && (
                        <Marker
                            position={[userLocation.latitude, userLocation.longitude]}
                            icon={userLocationIcon}
                        >
                            <Popup>Your location</Popup>
                            <Circle
                                center={[userLocation.latitude, userLocation.longitude]}
                                radius={(radius === 'other' ? customRadius : radius) * 1000} // Convert km to meters
                                color="blue"
                                fillOpacity={0.2}
                            />
                        </Marker>
                    )}
                    {filteredVendors.map((vendor, index) => (
                        <Marker
                            key={index}
                            position={[
                                vendor.location.coordinates[1],
                                vendor.location.coordinates[0]
                            ]}
                            icon={streetVendorIcon}
                        >
                            <Popup>
                                <div>
                                    <img src={vendor.photoUrl} alt={vendor.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                                    <p className="text-gray-600">{vendor.address}</p>
                                    <p>Food Items: {vendor.foodItems.join(', ')}</p>
                                    <p>Hygiene Rating: {vendor.hygieneRating}</p>
                                    <p>Taste Rating: {vendor.tasteRating}</p>
                                    <p>Hospitality Rating: {vendor.hospitalityRating}</p>
                                    <a
                                        href={getDirectionsUrl(vendor)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-blue-500 hover:underline"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                <button
                    onClick={redirectToCurrentLocation}
                    className="absolute z-[1000] bottom-24 right-8 bg-white text-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
                    title="Go to Current Location"
                >
                    <IconCurrentLocation color="black" />
                </button>
            </div>
            <Tabbar />
        </div>
    );
};

export default MapComponent;
