import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({ wishlist }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-400 to-blue-400">
            <h1 className="text-white text-5xl font-damion mb-5 shadow-text">Wishlist</h1>
            <div className="w-full max-w-xs mt-5">
                <ul className="bg-white rounded-lg shadow-lg p-4">
                    {wishlist.map((item, index) => (
                        <li key={index} className="mb-2">
                            <h4 className="text-lg font-bold">{item.name}</h4>
                            <p>Hygiene Rating: {item.hygieneRating}</p>
                            <p>Taste Rating: {item.tasteRating}</p>
                            <p>Hospitality Rating: {item.hospitalityRating}</p>
                            <a
                                href={item.geoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View on Map
                            </a>
                        </li>
                    ))}
                </ul>
                <Link to="/" className="block w-full mt-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105">
                    Back to Cards
                </Link>
            </div>
        </div>
    );
}

export default Wishlist;
