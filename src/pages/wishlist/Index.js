import React, { useState, useEffect } from 'react';
import { useWishlist } from './WishlistContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from "../../components/logo256.png";

function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
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
        <div className='overflow-y-hidden	'>
            <nav className=" shadow-md h-20">
                <div className=" fixed shadow-lg   bg-black backdrop-blur-lg w-[100vw] ">
                    <div className="flex items-center z-100  container justify-between mx-auto px-6 py-4">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center mr-6">
                                <img src={logo} className="h-10 mr-2" alt="KartMatch Logo" />
                                <span className="text-xl font-semibold text-[#e03757]">KartMatch</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
            <div className="min-h-screen w-screen flex flex-col items-center bg-gray-100 py-10">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">Wishlist</h1>
                <div className="w-full max-w-md">
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((item, index) => (
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
                                        <button
                                            className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            Remove
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
        </div>
    );
}

export default Wishlist;
