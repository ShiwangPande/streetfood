import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Tabbar from '../../components/Tabbar';

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
    const mapRef = useRef();

    // Function to calculate distance between two coordinates using Haversine formula
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

    // Function to fetch vendors from API and set initial state
    useEffect(() => {
        axios.get('https://kartmatchbackend.onrender.com/vendors')
            .then(response => {
                setVendors(response.data);
            })
            .catch(error => {
                console.error('Error fetching vendor data:', error);
            });

        // Get user's current location using geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    // Watch user's location for continuous updates
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // Filter vendors within 5km radius based on selected food items
    const filteredVendors = vendors.filter((vendor) =>
        userLocation ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            vendor.location.coordinates[1],
            vendor.location.coordinates[0]
        ) <= 5 : true
    );

    // Handle search input change
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setShowOptions(true);
    };

    // Rendered list of filtered food options for selection
    const filteredOptions = Array.from(
        new Set(vendors.flatMap((vendor) => vendor.foodItems))
    ).filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedFoodItems.includes(option)
    );

    // Center the map on user's location when available
    useEffect(() => {
        if (userLocation && mapRef.current) {
            mapRef.current.setView([userLocation.latitude, userLocation.longitude], 16);
        }
    }, [userLocation]);

    // Toggle dropdown menu for selected food items
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Remove selected food item from the list
    const removeSelectedFoodItem = (itemToRemove) => {
        setSelectedFoodItems((prevItems) =>
            prevItems.filter((item) => item !== itemToRemove)
        );
    };

    const redirectToCurrentLocation = () => {
        if (userLocation && mapRef.current) {
            mapRef.current.setView([userLocation.latitude, userLocation.longitude], 16);
        }
    };
    return (
        <div className='overflow-hidden overflow-x-hidden h-screen bg-white'>
            <div className="flex flex-col w-screen h-screen">
                <div className="relative px-5 lg:px-20 flex justify-between z-[1000] p-4 bg-white">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={() => setShowOptions(true)}
                            placeholder="Search food items..."
                            className="px-4 py-2 text-gray-800 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {showOptions && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-md z-10 max-h-48 overflow-y-auto">
                                {filteredOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedFoodItems([...selectedFoodItems, option])}
                                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="ml-4 flex items-center">
                        <div className="absolute right-0 lg:right-[1rem] top-[2vh]">
                            {selectedFoodItems.length > 0 && (
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="bg-white text-black px-4 mr-5 py-2 rounded focus:outline-none focus:ring-2 focus:gray-500"
                                    >
                                        {isOpen ? "Close" : "Open"} ^
                                    </button>
                                    {isOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-md z-10">
                                            {selectedFoodItems.map((item, index) => (
                                                <div className="relative flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white" key={index}>
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
                    </div>
                </div>
                <div className="flex-grow relative">
                    <MapContainer
                        center={userLocation ? [userLocation.latitude, userLocation.longitude] : [22.5726, 88.3639]}
                        zoom={10000}
                        scrollWheelZoom={true}
                        ref={mapRef}
                        zoomControl={true}
                        maxZoom={1000}
                        className="h-full w-full"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {userLocation && (
                            <Marker
                                position={[
                                    userLocation.latitude,
                                    userLocation.longitude,
                                ]}
                                icon={userLocationIcon}
                            >
                                <Popup>
                                    <div>
                                        <h3>Your Location</h3>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                        {filteredVendors.map((vendor, index) => (
                            <Marker
                                key={index}
                                position={[
                                    vendor.location.coordinates[1],
                                    vendor.location.coordinates[0],
                                ]}
                                icon={streetVendorIcon}
                            >
                                <Popup>
                                    <div>
                                        <h3>{vendor.name}</h3>
                                        <p>Food Items: {vendor.foodItems.join(', ')}</p>
                                        <p>Hygiene Rating: {vendor.hygieneRating}</p>
                                        <p>Taste Rating: {vendor.tasteRating}</p>
                                        <p>Hospitality Rating: {vendor.hospitalityRating}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {filteredVendors.map((vendor, index) => (
                            <Circle
                                key={index}
                                center={[
                                    vendor.location.coordinates[1],
                                    vendor.location.coordinates[0],
                                ]}
                                pathOptions={{ color: '#4CAF50', fillColor: '#4CAF50', fillOpacity: 0.2 }} // Green shade
                                radius={5000} // 5km in meters
                            />
                        ))}
                    </MapContainer>
                    <button
                        onClick={redirectToCurrentLocation}
                        className="absolute z-[1000] bottom-24 right-8 bg-white text-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
                        title="Go to Current Location"
                    >
                        <img
                            src="https://i.postimg.cc/fLJLT990/placeholder.png"
                            alt="Current Location"
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            </div>
            <Tabbar />
        </div>
    );
};

export default MapComponent;




