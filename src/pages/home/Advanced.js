import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Navbar from '../../components/Navbar';
import { useWishlist } from '../wishlist/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Survey from '../survey/Index'; // Import the Survey component

function Advanced({ preferences = { hygieneRating: 0, tasteRating: 0, hospitalityRating: 0 } }) {
    const [filteredData, setFilteredData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(currentIndex);
    const { addToWishlist } = useWishlist();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const [showSurvey, setShowSurvey] = useState(true); // State to show/hide the survey

    const childRefs = useMemo(
        () =>
            Array(filteredData.length)
                .fill(0)
                .map(() => React.createRef()),
        [filteredData.length]
    );

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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
    const swipeFeedbackClass = lastDirection === 'right' ? 'bg-green-200' : lastDirection === 'left' ? 'bg-red-200' : '';


    return (
        <div className={`overflow-hidden h-screen ${swipeFeedbackClass}`}>
            <Navbar wishlistCount={wishlist.length} />
            <div className=''>
                {showSurvey && <Survey onComplete={handleSurveyComplete} />} {/* Show the Survey component as a popup */}
                <div className="flex flex-col pt-10  items-center justify-center min-h-screen w-screen overflow-hidden bg-blue-100">
                    <div className="relative flex justify-center items-center mb-5 w-full max-w-screen-md h-[65vh] ">

                        {filteredData.map((character, index) => (
                            <TinderCard
                                ref={childRefs[index]}
                                className="absolute z-[10000] w-full h-full select-none flex items-center justify-center"
                                key={character.name}
                                onSwipe={(dir) => swiped(dir, character.name, index)}
                                onCardLeftScreen={() => outOfFrame(character.name, index)}
                            >
                                <div
                                    style={{ backgroundImage: 'url(' + character.photoUrl + ')' }}
                                    className="relative bottom-10 bg-white w-4/5 max-w-xs h-full shadow-lg rounded-lg bg-cover bg-center p-4 flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{character.name}</h3>
                                    </div>
                                    <div className="bg-white p-2 my-14 rounded-lg">
                                        <p className="text-gray-800">Hygiene Rating: {generateStars(character.hygieneRating)}</p>
                                        <p className="text-gray-800">Taste Rating: {generateStars(character.tasteRating)}</p>
                                        <p className="text-gray-800">Hospitality Rating: {generateStars(character.hospitalityRating)}</p>
                                        <button
                                            onClick={() => handleGetDirections(character)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 select-text underline"
                                        >
                                            View on Map
                                        </button>
                                    </div>
                                </div>
                            </TinderCard>
                        ))}
                    </div>
                    {!showSurvey && ( // Conditionally render the buttons based on the showSurvey state
                        <div className=' lg:absolute relative z-[1000] flex w-screen px-3 flex-row justify-evenly bottom-5 lg:bottom-14 lg:top-[10%] 	backdrop-opacity-10 '>
                            <button
                                className={`p-3 text-3xl  absolute top-[92%]  lg:top-[50%]  left-10  lg:left-[25%] h-14 w-14   rounded-full bg-red-400 ${!canSwipe}`}
                                onClick={() => swipe('left')}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <button
                                className={`p-3 text-3xl absolute lg:top-[90%] top-[50%] text-white h-14 w-14   rounded-full bg-black  ${!canGoBack}`}
                                onClick={() => goBack()}
                            >
                                <FontAwesomeIcon icon={faUndo} />
                            </button>
                            <button
                                className={`p-3 text-3xl absolute top-[92%] lg:top-[50%] right-10 lg:right-[25%] h-14 w-14    rounded-full bg-green-400   ${!canSwipe}`}
                                onClick={() => swipe('right')}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Advanced;
