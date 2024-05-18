import React from 'react';
import { useWishlist } from './WishlistContext';
import vendorData from '../../components/Data';

function Wishlist() {
    const { wishlist } = useWishlist();


    function handleGetDirections(item) {
        if (item && item.location && item.location.coordinates) {
            const [longitude, latitude] = item.location.coordinates;
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
        } else {
            console.error("Coordinates not found:", item);
        }
    }






    function generateStars(rating) {
        const starCount = 5;
        const fullStars = Math.floor(rating);
        const halfStars = Math.ceil(rating - fullStars);

        const fullStarsString = Array(fullStars).fill('★').join('');
        const halfStarsString = Array(halfStars).fill('½').join('');
        const emptyStars = starCount - fullStars - halfStars;
        const emptyStarsString = Array(emptyStars).fill('☆').join('');

        return fullStarsString + halfStarsString + emptyStarsString;
    }

    return (
        <div className="min-h-screen w-screen flex flex-col items-center bg-gray-100 py-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Wishlist</h1>
            <div className="w-full max-w-md">
                {wishlist.length > 0 ? (
                    wishlist.map((item, index) => (
                        <div key={index} className="bg-white p-6 mb-6 shadow-lg rounded-lg">
                            <div className="flex flex-col md:flex-row items-center md:items-start">
                                <img
                                    src={item.photoUrl}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
                                    <p className="text-gray-700 mb-1">Hygiene Rating: {generateStars(item.hygieneRating)}</p>
                                    <p className="text-gray-700 mb-1">Taste Rating: {generateStars(item.tasteRating)}</p>
                                    <p className="text-gray-700 mb-1">Hospitality Rating: {generateStars(item.hospitalityRating)}</p>
                                    <button
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                        onClick={() => handleGetDirections(item)}
                                    >
                                        Get Directions
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 text-center">No items in the wishlist.</p>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
