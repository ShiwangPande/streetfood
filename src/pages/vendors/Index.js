import React, { useState } from 'react';
import VendorCard from './VendorCard';
import vendorData from '../../components/Data';

const VendorPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVendors = vendorData.filter((vendor) => {
        const vendorName = vendor.name.toLowerCase();
        const foodItems = vendor.foodItems.join(' ').toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        const searchWords = query.split(' ');
        return searchWords.every((word) => {
            return vendorName.includes(word) || foodItems.includes(word);
        });
    });

    return (
        <div className="container mx-auto p-4">
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
    );
};

export default VendorPage;
