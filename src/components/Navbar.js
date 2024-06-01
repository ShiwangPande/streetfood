import React from 'react';
import logo from "./logo256.png";
import { Link } from 'react-router-dom';

function Navbar({ wishlistCount }) {
    return (
        <nav className=" shadow-md">
            <div className=" fixed  shadow-lg  bg-black backdrop-blur-lg w-[100vw] ">
                <div className="flex items-center z-100 container justify-between mx-auto px-6 py-4">
                    <div className="flex items-center">
                        <Link to="/advanced" className="flex items-center mr-6">
                            <img src={logo} className="h-10 mr-2" alt="Streetfood Logo" />
                            <span className="text-xl font-semibold text-[#e03757]">KartMatch</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link to="/wishlist" className="text-lg font-semibold mr-4 flex items-center">
                            <img src="https://i.postimg.cc/2jtxhRTv/wishlist.png" className="h-6 mr-2" alt="Wishlist Icon" />
                            <span className="text-[#e03757]">{wishlistCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
