import React, { useState, useEffect } from 'react';
import { useWishlist } from './WishlistContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from "../../components/logo256.png";

function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (storedWishlist) {
            setWishlistItems(storedWishlist);
        }

        axios.get('https://kartmatchbackend.onrender.com/vendors')
            .then(response => {
                const apiWishlist = response.data.filter(apiItem =>
                    wishlist.some(wishlistItem => wishlistItem.id === apiItem.id)
                );
                setWishlistItems(apiWishlist);
                localStorage.setItem('wishlist', JSON.stringify(apiWishlist));
            })
            .catch(error => {
                console.error('Error fetching wishlist items:', error);
            });
    }, [wishlist]);

    function handleGetDirections(item) {
        if (item?.location?.coordinates) {
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
        <div className='overflow-y-hidden '>
            <nav className="fixed items-center z-100 flex  justify-between mx-auto px-6 py-4  bg-black backdrop-blur-lg shadow-md h-20 w-screen">

                <Link to="/" className="flex items-center mr-6">
                    <img src={logo} className="h-10 mr-2" alt="KartMatch Logo" />
                    <span className="text-xl font-semibold text-[#e03757]">KartMatch</span>
                </Link>

            </nav>
            <div className="min-h-screen   bg-gray-100 py-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Wishlist</h1>
                <div className="w-full  max-w-md">
                    {wishlistItems.length > 0 ? (
                        <>
                            <div className='w-[100vw] flex  justify-end'>
                                <button
                                    className="mb-6  bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                                    onClick={clearWishlist}
                                >
                                    Remove All
                                </button>
                            </div>
                            <div className='w-[95vw] mx-auto grid grid-cols-1   m-5 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8'>
                                {wishlistItems.map((item, index) => (
                                    <div key={index} className="bg-white p-6 mb-6 lg:ml-10 flex justify-center shadow-lg rounded-lg">
                                        <div className="flex flex-col md:flex-row  items-center md:items-start">
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
                                                    className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-black/80 focus:outline-none"
                                                    onClick={() => handleGetDirections(item)}
                                                >
                                                    Get Directions
                                                </button>
                                                <button
                                                    className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                                                    onClick={() => removeFromWishlist(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-700 text-center">No items in the wishlist.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
