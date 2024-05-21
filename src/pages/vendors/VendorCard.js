import React from 'react';
import { FaStar } from 'react-icons/fa';

const VendorCard = ({ vendor }) => {
    const { name, foodItems, hygieneRating, tasteRating, hospitalityRating } = vendor;

    const handleGetDirections = () => {
        const { coordinates } = vendor.location;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;
        window.open(url, '_blank');
    };

    // Function to generate star icons based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<FaStar key={i} className="text-yellow-500 inline-block" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-400 inline-block" />);
            }
        }
        return stars;
    };

    return (
        <div className="border border-gray-200 bg-white/80 rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p><strong>Food Items:</strong> {foodItems.join(', ')}</p>
            <p><strong>Hygiene Rating:</strong> {renderStars(hygieneRating)}</p>
            <p><strong>Taste Rating:</strong> {renderStars(tasteRating)}</p>
            <p><strong>Hospitality Rating:</strong> {renderStars(hospitalityRating)}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none" onClick={handleGetDirections}>
                Get Directions
            </button>
        </div>
    );
};

export default VendorCard;
