import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import logo from "../../components/logo256.png";
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
    const [showFilteredVendors, setShowFilteredVendors] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVendorLocation, setSelectedVendorLocation] = useState(null);
    const mapRef = useRef();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const getUserLocation = () => {
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
            // Geolocation is not supported by the browser
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        // Fetch vendor data from API
        axios.get('https://kartmatchbackend.onrender.com/vendors')
            .then(response => {
                setVendors(response.data);
            })
            .catch(error => {
                console.error('Error fetching vendor data:', error);
            });

        getUserLocation();
    }, []);



useEffect(() => {
    if (userLocation && mapRef.current) {
        mapRef.current.setView([userLocation.latitude, userLocation.longitude], 16);
    }
}, [userLocation]);

const filterVendors = (foodItem) => {
    const filteredVendor = vendors.find((vendor) =>
        vendor.foodItems.includes(foodItem)
    );
    if (filteredVendor) {
        setSelectedVendorLocation({
            latitude: filteredVendor.location.coordinates[1],
            longitude: filteredVendor.location.coordinates[0],
        });
    }
    setSelectedFoodItems((prevItems) => [...prevItems, foodItem]);
    setSearchQuery('');
    setShowOptions(false);
};

const removeSelectedFoodItem = (itemToRemove) => {
    setSelectedFoodItems((prevItems) =>
        prevItems.filter((item) => item !== itemToRemove)
    );
};

const filteredVendors = vendors.filter((vendor) =>
    selectedFoodItems.length > 0
        ? selectedFoodItems.some((item) => vendor.foodItems.includes(item))
        : true
);

const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setShowOptions(true);
};

const filteredOptions = Array.from(
    new Set(vendors.flatMap((vendor) => vendor.foodItems))
).filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedFoodItems.includes(option)
);

useEffect(() => {
    if (selectedVendorLocation && mapRef.current) {
        mapRef.current.setView([selectedVendorLocation.latitude, selectedVendorLocation.longitude], 16);
    }
}, [selectedVendorLocation]);

const redirectToCurrentLocation = () => {
    if (userLocation && mapRef.current) {
        mapRef.current.setView([userLocation.latitude, userLocation.longitude], 16);
    }
};

return (
    <div className='overflow-hidden overflow-x-hidden h-screen bg-white'>
        {/* <nav className=" shadow-md h-14">
            <div className=" fixed shadow-sm  bg-white  w-[100vw] ">
                <div className="flex items-center z-100  justify-center mx-auto px-6 py-4">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center mr-6">
                            <span className="text-xl font-semibold text-black">KartMatch</span>
                        </Link>
                    </div>

                </div>
            </div>
        </nav> */}
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
                                    onClick={() => filterVendors(option)}
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
                                    {isOpen ? "" : ""} ^
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
                    zoom={16}
                    scrollWheelZoom={true}
                    ref={mapRef}
                    zoomControl={false}
                    maxZoom={25}
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

                {showFilteredVendors && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md z-10">
                        <h3 className="text-lg font-semibold mb-2">Filtered Vendors</h3>
                        <ul className="overflow-y-auto max-h-60">
                            {filteredVendors.length > 0 ? (
                                filteredVendors.map((vendor, index) => (
                                    <li key={index} className="py-1">
                                        {vendor.name}
                                    </li>
                                ))
                            ) : (
                                <li className="py-1">No filtered vendors found.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
        <Tabbar />
    </div>
);
};

export default MapComponent;
