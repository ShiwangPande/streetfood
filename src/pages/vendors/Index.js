import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VendorCard from './VendorCard';
import logo from "../../components/logo256.png";
import { Link } from 'react-router-dom';
import Tabbar from '../../components/Tabbar';
import Loader from 'react-js-loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Settings from '../../components/Settings';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const VendorPage = ({ handleToggleComments, commentsEnabled }) => {
    const [vendors, setVendors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [focusedCategory, setFocusedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://kartmatchbackend.onrender.com/vendors'); // Replace with your API endpoint
                setVendors(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const categories = [
        { name: 'All', show: "All", imageUrl: 'https://i.postimg.cc/50DSzDbZ/all-vendors.jpg' },
        { name: 'Lassi', show: "Beverage", imageUrl: 'https://i.postimg.cc/nzqgTNzk/beverages.webp' },
        { name: 'Dosa', show: "Dosa", imageUrl: 'https://i.postimg.cc/8cH3gWLf/dosa.webp' },
        { name: 'Egg', show: "Egg", imageUrl: 'https://i.postimg.cc/jjpBHRs2/egg.webp' },
        { name: 'Puchka', show: "Puchka", imageUrl: 'https://i.postimg.cc/cHBKSJ6t/puchkaa.webp' },
        { name: 'chat', show: "Chaat", imageUrl: 'https://i.postimg.cc/nrZ5WT9t/chat.webp' },


    ];

    const filteredVendors = vendors.filter((vendor) => {
        const vendorName = vendor.name.toLowerCase();
        const foodItems = vendor.foodItems.filter(item => typeof item === 'string').join(' ').toLowerCase();
        const query = searchQuery.toLowerCase().trim();
        const searchWords = query.split(' ');

        const matchesQuery = searchWords.every((word) => {
            return vendorName.includes(word) || foodItems.includes(word);
        });

        if (selectedCategory === 'All') {
            return matchesQuery;
        }

        return matchesQuery && vendor.foodItems.some(item => typeof item === 'string' && item.toLowerCase().includes(selectedCategory.toLowerCase()));
    });



    return (
        <div className='bg-background'>
            <nav className="shadow-md relative z-[1000]">
                <div className="sticky shadow-lg bg-background backdrop-blur-lg w-[100vw]">
                    <div className="flex items-center z-100 justify-center mx-auto px-6 py-3">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center mr-6">
                                <span className="text-2xl font-semibold text-center w-full text-yellow"><img className='w-44' src="https://i.postimg.cc/bvqMjHYY/kartmatchlogo.png" alt="" /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {loading ? (
                <div className="flex justify-center z-[1000000] bg-background items-center h-screen">
                    <Loader type="bubble-loop" bgColor={"#ffa200"} size={100} />
                </div>
            ) : (
                <>
                        <Settings handleToggleComments={handleToggleComments} commentsEnabled={commentsEnabled} />
                    <div className="container mx-auto px-5 lg:px-20 pt-14">
                        <h1 className="text-3xl font-bold text-yellow mb-4">All Vendors</h1>
                        <div className="relative mb-4">
                            <div className="flex items-center border-b border-yellow py-2">
                                <svg className="w-6 h-6 text-yellow mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search by vendor name or food items..."
                                    className="px-4 text-yellow placeholder-yellow py-2 w-full  bg-background rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-opacity-50"
                                />
                            </div>
                            {searchQuery && (
                                <button
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 text-gray-600 hover:bg-yellow focus:outline-none"
                                    onClick={() => setSearchQuery('')}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <Swiper
                            spaceBetween={10}
                            modules={[Pagination, Navigation]}
                            pagination={{ clickable: true }}
                            navigation={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 50,
                                },
                            }}
                            className="category-swiper h-fit mySwiper mb-4"
                        >
                            {categories.map((category, index) => (
                                <SwiperSlide className='min-h-72' key={index}>
                                    <button
                                        className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category.name)}
                                    >
                                        <div className={`card ${focusedCategory === category.name ? 'focused' : ''}`} key={index} onClick={() => setFocusedCategory(category.name)}>
                                            <div className="card-body h-52">
                                                <img
                                                    alt={category.show}
                                                    className="object-cover rounded-lg min-h-52"
                                                    src={category.imageUrl}
                                                />
                                                <div className="overlay text-center">
                                                    {category.show}
                                                </div>
                                            </div>
                                            <div className="card-footer text-xl my-2 text-yellow">
                                                {category.show}
                                            </div>
                                        </div>
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* 
            {focusedCategory && (
                <div className="focused-category-modal" onClick={() => setFocusedCategory(null)}>
                    <div className="modal-content">
                        <img src={categories.find(category => category.name === focusedCategory).imageUrl} alt={focusedCategory} />
                        <div className="category-name">{focusedCategory}</div>
                    </div>
                </div>
            )} */}

                        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredVendors.map((vendor, index) => (
                                <VendorCard handleToggleComments={handleToggleComments} commentsEnabled={commentsEnabled} key={index} vendor={vendor} />
                            ))}
                        </div>
                    </div>
                    <Tabbar />
                </>
            )}
        </div>
    );
};

export default VendorPage;
