import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VendorCard from './VendorCard';
import logo from "../../components/logo256.png";
import { Link } from 'react-router-dom';

const VendorPage = () => {
    const [vendors, setVendors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/vendors'); // Replace 'http://localhost:3000/vendors' with your API endpoint
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVendors = vendors.filter((vendor) => {
        const vendorName = vendor.name.toLowerCase();
        const foodItems = vendor.foodItems.join(' ').toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        const searchWords = query.split(' ');
        return searchWords.every((word) => {
            return vendorName.includes(word) || foodItems.includes(word);
        });
    });

    return (
        <div className='bg-blue-100'>
            <nav className="shadow-md relative z-[1000]">
                <div className="fixed shadow-lg bg-black backdrop-blur-lg w-[100vw]">
                    <div className="flex items-center z-100 container justify-between mx-auto px-6 py-4">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center mr-6">
                                <img src={logo} className="h-10 mr-2" alt="KartMatch Logo" />
                                <span className="text-xl font-semibold text-[#e03757]">KartMatch</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-4bg-center px-5 lg:px-20 py-24 ">
                <h1 className="text-3xl font-bold mb-4">Vendor Information</h1>
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by vendor name or food items..."
                        className="px-4 py-2 w-full text-gray-800 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchQuery && (
                        <button
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 text-gray-600 hover:bg-gray-300 focus:outline-none"
                            onClick={() => setSearchQuery('')}
                        >
                            Clear
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVendors.map((vendor, index) => (
                        <VendorCard key={index} vendor={vendor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorPage;
