import React from 'react';
import logo from "./logo256.png";
import { Link } from 'react-router-dom';

function Navbar({ wishlistCount }) {
    return (
        <nav className="bg-gray-100  shadow-md">
            <div className=" fixed bg-gray-100  w-[100vw] ">
                <div className="flex items-center z-100 container justify-between mx-auto px-6 py-4">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center mr-6">
                            <img src={logo} className="h-10 mr-2" alt="Streetfood Logo" />
                            <span className="text-xl font-semibold text-gray-800">StreetFood</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link to="/wishlist" className="text-lg font-semibold mr-4 flex items-center">
                            <img src="https://i.postimg.cc/2jtxhRTv/wishlist.png" className="h-6 mr-2" alt="Wishlist Icon" />
                            <span className="text-gray-800">{wishlistCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
