import React from 'react';
import { Geolocation } from '@capacitor/geolocation';

const LocationPermissionModal = ({ isOpen, onRequestClose, onPermissionGranted }) => {

    const requestLocationPermission = async () => {
        try {
            const permission = await Geolocation.requestPermissions();
            if (permission && permission.location === 'granted') {
                onPermissionGranted();
            } else {
                console.error('Location permission denied');
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

    return (
        <div className={`fixed z-[1000] top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold mb-4">Allow access to your location</p>
                <button
                    onClick={requestLocationPermission}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                >
                    Allow
                </button>
                <button
                    onClick={onRequestClose}
                    className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LocationPermissionModal;
