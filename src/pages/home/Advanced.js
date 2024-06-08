import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useWishlist } from '../wishlist/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Survey from '../survey/Index';
import Loader from 'react-js-loader';
import { Link } from 'react-router-dom';

function Advanced({ preferences = { hygieneRating: 0, tasteRating: 0, hospitalityRating: 0 } }) {
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastDirection, setLastDirection] = useState();
    const { addToWishlist } = useWishlist();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const [showSurvey, setShowSurvey] = useState(true);

    const controls = useAnimation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://kartmatchbackend.onrender.com/vendors');
                const data = response.data;
                let filtered;
                if (preferences.hygieneRating || preferences.tasteRating || preferences.hospitalityRating) {
                    filtered = data.filter(item =>
                        item.hygieneRating >= preferences.hygieneRating &&
                        item.tasteRating >= preferences.tasteRating &&
                        item.hospitalityRating >= preferences.hospitalityRating
                    );
                } else {
                    filtered = [...data];
                }
                setFilteredData(filtered);
                setCurrentIndex(filtered.length - 1);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [preferences]);

    const swiped = async (direction, index) => {
        setLastDirection(direction);
        if (direction === 'right') {
            addToWishlist(filteredData[index]);
        }
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    const handleDragEnd = (event, info, index) => {
        const offset = info.offset.x;
        if (offset > 150) {
            swiped('right', index);
            controls.start({ x: 1000, opacity: 0 });
        } else if (offset < -150) {
            swiped('left', index);
            controls.start({ x: -1000, opacity: 0 });
        } else {
            controls.start({ x: 0 });
        }
    };

    const goBack = async () => {
        if (currentIndex < filteredData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    function handleGetDirections(character) {
        if (character?.location?.coordinates) {
            const [longitude, latitude] = character.location.coordinates;
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
        } else {
            console.error("Coordinates not found:", character);
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

    const handleSurveyComplete = (preferences) => {
        console.log('Survey preferences:', preferences);
        setShowSurvey(false);
    };

    return (
        <div className='overflow-hidden h-screen'>
            <nav className=" ">
                <div className=" fixed bg-white backdrop-blur-lg w-[100vw] ">
                    <div className="flex items-center z-100 justify-between mx-auto px-1 lg:px-6 py-4">
                        <div className="flex items-center ml-2">
                            <div onClick={() => goBack()} className="">
                                <div className='flex items-center justify-center mr-6 h-10 w-10 py-auto bg-white font-semibold shadow-md rounded-full border-2 border-black'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M19 4v2.339A9 9 0 0 0 3 12h2a6.987 6.987 0 0 1 12.725-4H15v2h6V4zM12 19a6.957 6.957 0 0 1-5.726-3H9v-2H3v6h2v-2.339A9 9 0 0 0 21 12h-2a7.009 7.009 0 0 1-7 7z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-3xl font-semibold text-black">KartMatch</span>
                        </div>
                        <Link to="/wishlist" className="text-lg font-semibold mr-2 flex items-center">
                            <div className="mr-1 h-10 w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" style={{ position: ' absolute', top: '13px', right: '2' }}>
                                    <path style={{ 'fill': '#00000' }} d="M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5a4.444 4.444 0 0 1 4 2 4.444 4.444 0 0 1 4-2c2.934 0 5.773 2.6 4.808 7.579z" />
                                </svg>
                                <g width="20" height="20" style={{ position: ' absolute', top: '18px', right: '17px' }}>
                                    <span className="relative text-white text-sm">{wishlist.length}</span>
                                </g>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className=''>
                {loading ? (
                    <div className="flex justify-center z-[1000000] items-center h-screen">
                        <Loader type="bubble-loop" bgColor={"#000000"} size={100} />
                    </div>
                ) : (
                    <>
                        {showSurvey && <Survey onComplete={handleSurveyComplete} />}
                        <div className="flex flex-col pt-10 items-center justify-center min-h-screen h-full w-screen overflow-hidden bg-white">
                            <div className="relative flex justify-center items-center mb-5 w-[100vw] lg:w-4/5 h-[80vh] top-8 lg:h-[68vh] ">
                                {filteredData.map((character, index) => (
                                    index === currentIndex && (
                                        <motion.div
                                            key={character.name}
                                            className="absolute z-[100] w-full h-full cursor-grab select-none flex items-center justify-center"
                                            drag="x"
                                            onDragEnd={(event, info) => handleDragEnd(event, info, index)}
                                            initial={{ x: 0, opacity: 1 }}
                                            animate={controls}
                                        >
                                            <div
                                                style={{ backgroundImage: 'url(' + character.photoUrl + ')' }}
                                                className="relative bottom-10 bg-white w-full max-w-sm mx-3 lg:max-w-xl h-full rounded-sm bg-cover bg-center p-4 flex flex-col justify-between"
                                            >
                                                <div>
                                                    <h3 className="rounded-lg text-lg font-bold text-center text-white">{character.name}</h3>
                                                </div>
                                                <div className="bg-black/25 p-2 rounded-xl">
                                                    <p className="text-white font-semibold">Hygiene Rating: {generateStars(character.hygieneRating)}</p>
                                                    <p className="text-white font-semibold">Taste Rating: {generateStars(character.tasteRating)}</p>
                                                    <p className="text-white font-semibold">Hospitality Rating: {generateStars(character.hospitalityRating)}</p>
                                                    <button
                                                        onClick={() => handleGetDirections(character)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-white font-semibold bg-green-500 w-full p-2 rounded-lg"
                                                    >
                                                        Get Directions
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )))}
                            </div>
                            <div className='fixed bottom-2 hidden lg:bottom-14 lg:flex'>
                                <button onClick={goBack} className="rounded-full text-black bg-white text-3xl p-4 font-bold m-2 shadow-md"><FontAwesomeIcon icon={faUndo} /></button>
                                <button onClick={() => swiped('left', currentIndex)} className="rounded-full text-red-500 bg-white text-3xl p-4 font-bold m-2 shadow-md"><FontAwesomeIcon icon={faXmark} /></button>
                                <button onClick={() => swiped('right', currentIndex)} className="rounded-full text-green-500 bg-white text-3xl p-4 font-bold m-2 shadow-md"><FontAwesomeIcon icon={faCheck} /></button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Advanced;
