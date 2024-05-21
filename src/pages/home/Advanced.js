import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Data from '../../components/Data';
import Navbar from '../../components/Navbar';
import { useWishlist } from '../../pages/wishlist/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Advanced({ preferences = { hygieneRating: 0, tasteRating: 0, hospitalityRating: 0 } }) {
    const [filteredData, setFilteredData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(Data.length - 1);
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(currentIndex);
    const { addToWishlist } = useWishlist();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();

    const childRefs = useMemo(
        () =>
            Array(Data.length)
                .fill(0)
                .map(() => React.createRef()),
        []
    );

    useEffect(() => {
        let filtered;
        if (preferences.hygieneRating || preferences.tasteRating || preferences.hospitalityRating) {
            filtered = Data.filter(item =>
                item.hygieneRating >= preferences.hygieneRating &&
                item.tasteRating >= preferences.tasteRating &&
                item.hospitalityRating >= preferences.hospitalityRating
            );
        } else {
            filtered = [...Data];
        }
        setFilteredData(filtered);
        setCurrentIndex(filtered.length - 1);
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

        // Get the last added item from the wishlist
        const removedItem = wishlist[wishlist.length - 1];

        // Check if the removed item exists and has an ID
        if (removedItem && removedItem.id) {
            // Remove the last added item from the Wishlist
            removeFromWishlist(removedItem.id);
        }

        // Update the current index
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);

        // Check if there are more cards to show
        if (currentIndex < filteredData.length - 1) {
            // If there are more cards, restore the card
            await childRefs[newIndex].current.restoreCard();
        } else {
            // If no more cards to show after removing the last one, handle the end of the list
            if (filteredData.length === 1) {
                // If there's only one card left after removal, reset the list to show all cards again
                setFilteredData([...Data]); // Reset the list to show all cards again
                setCurrentIndex(Data.length - 1); // Reset the current index
            } else {
                // If there are still cards left after removal, just update the current index
                setCurrentIndex(currentIndex - 1);
            }
        }
    };





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

    return (
        <>
            <Navbar wishlistCount={wishlist.length} />
            <div className="flex flex-col pt-10 items-center justify-center min-h-screen w-screen overflow-hidden bg-gradient-to-b from-[#B3DFEC] to-[#B9C0EA]">
                <h1 className="text-[#e74f4f] text-3xl md:text-5xl font-damion font-bold mb-3 md:mb-5 drop-shadow-lg outline-black">KartMatch</h1>

                <div className="relative flex justify-center items-center mb-5 w-full max-w-screen-md h-72 md:h-96">
                    {filteredData.map((character, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className="absolute w-full h-full flex items-center justify-center"
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name, index)}
                            onCardLeftScreen={() => outOfFrame(character.name, index)}
                        >
                            <div
                                style={{ backgroundImage: 'url(' + character.photoUrl + ')' }}
                                className="relative bg-white w-4/5 max-w-xs h-full shadow-lg rounded-lg bg-cover bg-center p-4 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-white">{character.name}</h3>
                                </div>
                                <div className="bg-white p-2 rounded-lg">
                                    <p className="text-gray-800">Hygiene Rating: {generateStars(character.hygieneRating)}</p>
                                    <p className="text-gray-800">Taste Rating: {generateStars(character.tasteRating)}</p>
                                    <p className="text-gray-800">Hospitality Rating: {generateStars(character.hospitalityRating)}</p>
                                    <a
                                        href={character.geoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View on Map
                                    </a>
                                </div>
                            </div>
                        </TinderCard>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center mt-3 md:mt-5 space-y-3 md:space-y-0 md:space-x-3">
                    <button
                        className={`px-4 md:px-5 py-2 md:py-3 rounded-lg text-white font-bold text-lg bg-[#F6AC5A] shadow-lg transform transition-transform ${!canSwipe && 'opacity-50'}`}
                        onClick={() => swipe('left')}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                        className={`px-4 md:px-5 py-2 md:py-3 rounded-lg text-white font-bold text-lg bg-[#E8A5CC] shadow-lg transform transition-transform ${!canGoBack && 'opacity-50'}`}
                        onClick={() => goBack()}
                    >
                        <FontAwesomeIcon icon={faUndo} />
                    </button>
                    <button
                        className={`px-4 md:px-5 py-2 md:py-3 rounded-lg text-white font-bold text-lg bg-[#F0725C] shadow-lg transform transition-transform ${!canSwipe && 'opacity-50'}`}
                        onClick={() => swipe('right')}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                {lastDirection ? (
                    <h2 className="text-white mt-3  animate-popup">
                        You swiped {lastDirection}
                    </h2>
                ) : (
                    <h2 className="text-white mt-3 animate-popup">
                        Swipe a card or press a button to get Restore Card button visible!
                    </h2>
                )}
                <button
                    className="px-4 py-2 mt-3 bg-blue-500 text-white rounded-lg"
                    onClick={() => navigate('/wishlist')}
                >
                    View Wishlist
                </button>
            </div>
        </>
    );
}

export default Advanced;
