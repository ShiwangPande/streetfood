import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { useWishlist } from '../wishlist/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Survey from '../survey/Index';
import Loader from 'react-js-loader'; // Import the loader component
import { Link } from 'react-router-dom';
import data from './data.js';

function Advanced({ preferences = { hygieneRating: 0, tasteRating: 0, hospitalityRating: 0 } }) {
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(currentIndex);
    const { addToWishlist } = useWishlist();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const [showSurvey, setShowSurvey] = useState(true); // State to show/hide the survey
    const { vendorData } = data;
    const childRefs = useMemo(
        () =>
            Array(filteredData.length)
                .fill(0)
                .map(() => React.createRef()),
        [filteredData.length]
    );

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://kartmatchbackend.onrender.com/vendors');
    //             const data = response.data;
    //             let filtered;
    //             if (preferences.hygieneRating || preferences.tasteRating || preferences.hospitalityRating) {
    //                 filtered = data.filter(item =>
    //                     item.hygieneRating >= preferences.hygieneRating &&
    //                     item.tasteRating >= preferences.tasteRating &&
    //                     item.hospitalityRating >= preferences.hospitalityRating
    //                 );
    //             } else {
    //                 filtered = [...data];
    //             }
    //             setFilteredData(filtered);
    //             setCurrentIndex(filtered.length - 1);
    //             setLoading(false); // Set loading to false when data is fetched
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [preferences]);

    useEffect(() => {
        // Replace API call with vendorData from imported file
        let filtered;
        if (preferences.hygieneRating || preferences.tasteRating || preferences.hospitalityRating) {
            filtered = vendorData.filter(item =>
                item.hygieneRating >= preferences.hygieneRating &&
                item.tasteRating >= preferences.tasteRating &&
                item.hospitalityRating >= preferences.hospitalityRating
            );
        } else {
            filtered = [...vendorData];
        }
        setFilteredData(filtered);
        setCurrentIndex(filtered.length - 1);
        setLoading(false); // Set loading to false when data is fetched
    }, [preferences]);


    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };
    const canGoBack = currentIndex < filteredData.length - 1;
    const canSwipe = currentIndex >= 0;

    const swiped = async (direction, nameToDelete, index) => {
        setLastDirection(direction);
        if (direction === 'right') {
            addToWishlist(filteredData[index]);
        }
        await updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name, idx) => {
        if (currentIndexRef.current >= idx && idx >= 0 && idx < filteredData.length) {
            childRefs[idx].current.restoreCard();
        }
    };
    useEffect(() => {
        let isMounted = true;

        const initializeRefs = async () => {
            const newRefs = await Promise.all(filteredData.map(() => React.createRef()));
            if (isMounted) {
                childRefs.current = newRefs;
            }
        };

        initializeRefs();

        return () => {
            isMounted = false; // Set to false when component unmounts to cancel async operations
        };
    }, [filteredData]);

    const swipe = async (dir) => {
        if (canSwipe && currentIndex >= 0 && currentIndex < filteredData.length) {
            const newIndex = currentIndex - 1;
            updateCurrentIndex(newIndex); // Update currentIndex synchronously before swipe
            const currentRef = childRefs[currentIndex]?.current; // Access current index
            if (currentRef && currentRef.swipe) {
                await currentRef.swipe(dir);
            }
        }
    };
    const removeFromWishlist = (item) => {
        const index = wishlist.findIndex((wishlistItem) => wishlistItem.name === item.name);
        if (index > -1) {
            addToWishlist(wishlist[index]);
        }
    };

    const goBack = async () => {
        if (!canGoBack) return;

        // Get the index of the card to be removed
        const removedIndex = currentIndex;

        // Get the last added item from the wishlist
        const removedItem = wishlist[wishlist.length - 1];

        // Check if the removed item exists and has an ID
        if (removedItem && removedItem.id) {
            // Remove the last added item from the Wishlist
            removeFromWishlist(removedItem);
        }

        // Update the current index to go back
        const newIndex = removedIndex + 1;
        updateCurrentIndex(newIndex);

        // Check if there are more cards to show
        if (newIndex < filteredData.length) {
            // If there are more cards, restore the next card
            await childRefs[newIndex].current.restoreCard();
        } else {
            // If no more cards to show after going back, handle the end of the list
            if (filteredData.length === 1) {
                // If there's only one card left after removal, reset the list to show all cards again
                setFilteredData([]); // Clear the filtered data array
                setCurrentIndex(0); // Reset the current index
            } else {
                // If there are still cards left after removal, just update the current index
                setCurrentIndex(currentIndex - 1);
            }
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

    // Handle survey completion
    const handleSurveyComplete = (preferences) => {
        // Process the preferences here (e.g., update state, make an API call, etc.)
        console.log('Survey preferences:', preferences);
        setShowSurvey(false); // Hide the survey after completion
    };

    return (
        <div className='overflow-hidden h-screen'>
            <nav className=" ">
                <div className=" fixed   bg-white backdrop-blur-lg w-[100vw] ">
                    <div className="flex items-center z-100  justify-between mx-auto px-1 lg:px-6 py-4">
                        <div className="flex items-center ml-2">
                            <div onClick={() => goBack()} className="">
                                <div className='flex items-center justify-center mr-6 h-10 w-10 py-auto bg-white font-semibold shadow-md rounded-full border-2 border-black'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M19 4v2.339A9 9 0 0 0 3 12h2a6.987 6.987 0 0 1 12.725-4H15v2h6V4zM12 19a6.957 6.957 0 0 1-5.726-3H9v-2H3v6h2v-2.339A9 9 0 0 0 21 12h-2a7.009 7.009 0 0 1-7 7z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">   <span className="text-3xl font-semibold text-black">KartMatch</span>
                        </div>
                        <Link to="/wishlist" className="text-lg font-semibold mr-2 flex items-center">
                            <div className="mr-1 h-10 w-10 " >
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
                {loading ? ( // Render loader when loading is true
                    <div className="flex justify-center z-[1000000] items-center h-screen">
                        <Loader type="bubble-loop" bgColor={"#000000"} size={100} />
                    </div>
                ) : (
                    <>
                        {showSurvey && <Survey onComplete={handleSurveyComplete} />} {/* Show the Survey component as a popup */}
                        <div className="flex flex-col pt-10  items-center justify-center min-h-screen h-full w-screen overflow-hidden bg-white">
                            <div className="relative flex justify-center items-center mb-5 w-[100vw] lg:w-4/5 h-[80vh] top-5 lg:h-[68vh] ">

                                {filteredData.map((character, index) => (
                                    <TinderCard
                                        ref={childRefs[index]}
                                        className="absolute z-[1000] w-full h-full cursor-grab select-none flex items-center justify-center"
                                        key={character.name}
                                        onSwipe={(dir) => swiped(dir, character.name, index)}
                                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                                    >

                                        <div
                                            style={{ backgroundImage: 'url(' + character.photoUrl + ')' }}
                                            className="relative bottom-10  bg-white w-full max-w-xs h-full shadow-lg rounded-lg bg-cover bg-center p-4 flex flex-col justify-between"
                                        >
                                            <div>
                                                <h3 className="text-lg font-bold  text-white">{character.name}</h3>
                                            </div>
                                            <div className="bg-black/50 p-2  rounded-xl">
                                                <p className="text-white font-semibold">Hygiene Rating: {generateStars(character.hygieneRating)}</p>
                                                <p className="text-white font-semibold">Taste Rating: {generateStars(character.tasteRating)}</p>
                                                <p className="text-white font-semibold">Hospitality Rating: {generateStars(character.hospitalityRating)}</p>
                                                <button
                                                    onClick={() => handleGetDirections(character)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className=" select-text text-sm mt-2  bg-black text-white px-2 py-1 rounded hover:bg-[white] hover:text-black border-2 border-black font-semibold focus:outline-none"
                                                >
                                                    View on Map
                                                </button>
                                            </div>
                                        </div>
                                    </TinderCard>
                                ))}
                            </div>
                            {/* {!showSurvey && (
                                <div className=' lg:absolute relative z-[100] flex w-screen px-3 flex-row justify-evenly bottom-10 lg:top-[10%] 	backdrop-opacity-10 '>
                                    <button
                                        className={`p-3 text-3xl  absolute top-[92%]  lg:top-[50%] text-white    left-10  lg:left-[25%] h-14 w-14   rounded-full bg-black ${!canSwipe}`}
                                        onClick={() => swipe('left')}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <button
                                        className={`p-3 text-3xl absolute lg:top-[89%] top-[50%] text-white h-14 w-14   rounded-full bg-black  ${!canGoBack}`}
                                        onClick={() => goBack()}
                                    >
                                        <FontAwesomeIcon icon={faUndo} />
                                    </button>
                                    <button
                                        className={`p-3 text-3xl absolute top-[92%] lg:top-[50%] right-10 lg:right-[25%] h-14 w-14 text-white    rounded-full bg-black  ${!canSwipe}`}
                                        onClick={() => swipe('right')}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </div>
                            )} */}

                        </div>

                    </>
                )}
            </div>
        </div>
    );
}

export default Advanced;