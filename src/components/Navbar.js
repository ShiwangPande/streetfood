import React from 'react';
import logo from "./logo256.png";
import { Link } from 'react-router-dom';

function Navbar({ wishlistCount }) {
    return (
        <nav className=" ">
            <div className=" fixed   bg-white backdrop-blur-lg w-[100vw] ">
                <div className="flex items-center z-100  justify-between mx-auto px-1 lg:px-6 py-4">
                    <div className="flex items-center ml-2">
                        <div  className="">
                            <div className='flex items-center justify-center mr-6 h-10 w-10 py-auto bg-white font-semibold shadow-md rounded-full border-2 border-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M19 4v2.339A9 9 0 0 0 3 12h2a6.987 6.987 0 0 1 12.725-4H15v2h6V4zM12 19a6.957 6.957 0 0 1-5.726-3H9v-2H3v6h2v-2.339A9 9 0 0 0 21 12h-2a7.009 7.009 0 0 1-7 7z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">   <span className="text-3xl font-semibold text-black">KartMatch</span>
                    </div>
                    <Link to="/wishlist" className="text-lg font-semibold mr-2 flex items-center">
                        <div className="mr-1 h-10 w-10 " >
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" style={{position:' absolute', top: '13px', right: '2'}}>
                                <path style={{ 'fill': '#00000' }} d="M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5a4.444 4.444 0 0 1 4 2 4.444 4.444 0 0 1 4-2c2.934 0 5.773 2.6 4.808 7.579z" />
                            </svg>
                            <g width="20" height="20" style={{position:' absolute', top: '18px', right: '17px'}}>
                                <span className="relative text-white text-sm">{wishlistCount}</span>
                            </g>

                        </div>

                    </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
