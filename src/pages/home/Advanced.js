import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

const db = [
    {
        name: 'Richard Hendricks',
        url: 'https://picsum.photos/200/300',
        hygieneRating: 5,
        tasteRating: 4,
        hospitalityRating: 3,
        geoLink: 'https://maps.google.com/?q=37.7749,-122.4194'
    },
    {
        name: 'Erlich Bachman',
        url: 'https://picsum.photos/200/300',
        hygieneRating: 3,
        tasteRating: 5,
        hospitalityRating: 4,
        geoLink: 'https://maps.google.com/?q=37.7749,-122.4194'
    },
    {
        name: 'Jared Dunn',
        url: 'https://picsum.photos/200/300',
        hygieneRating: 4,
        tasteRating: 3,
        hospitalityRating: 5,
        geoLink: 'https://maps.google.com/?q=37.7749,-122.4194'
    },
    {
        name: 'Dinesh Chugtai',
        url: 'https://picsum.photos/200/300',
        hygieneRating: 2,
        tasteRating: 1,
        hospitalityRating: 2,
        geoLink: 'https://maps.google.com/?q=37.7749,-122.4194'
    },
    {
        name: 'Bertram Gilfoyle',
        url: 'https://picsum.photos/200/300',
        hygieneRating: 1,
        tasteRating: 2,
        hospitalityRating: 1,
        geoLink: 'https://maps.google.com/?q=37.7749,-122.4194'

    },
    {
        name: 'Monica Hall',
        url: 'https://picsum.photos/200/300',
        hygieneRating: 5,
        tasteRating: 4,
        hospitalityRating: 3,
        geoLink: 'https://maps.google.com/?q=37.7749,-122.4194'
    },

];

function Advanced({ preferences = { hygieneRating: 0, tasteRating: 0, hospitalityRating: 0 } }) {
    const [filteredDb, setFilteredDb] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(db.length - 1);
    const [lastDirection, setLastDirection] = useState();
    const [wishlist, setWishlist] = useState([]);
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map(() => React.createRef()),
        []
    );

    useEffect(() => {
        let filtered;
        if (preferences.hygieneRating || preferences.tasteRating || preferences.hospitalityRating) {
            // Filter only if preferences are specified
            filtered = db.filter(item =>
                item.hygieneRating >= preferences.hygieneRating &&
                item.tasteRating >= preferences.tasteRating &&
                item.hospitalityRating >= preferences.hospitalityRating
            );
        } else {
            // If preferences are not specified, include all items
            filtered = [...db];
        }
        setFilteredDb(filtered);
        setCurrentIndex(filtered.length - 1); // Reset currentIndex after preferences update
    }, [preferences]);


    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < filteredDb.length - 1;
    const canSwipe = currentIndex >= 0;

    const swiped = async (direction, nameToDelete, index) => {
        setLastDirection(direction);
        if (direction === 'right') {
            addToWishlist(filteredDb[index]);
        }
        await updateCurrentIndex(index - 1); // Update the index based on the swipe direction before attempting to swipe
    };

    const addToWishlist = (place) => {
        setWishlist([...wishlist, place]);
        // No need to update the index here as it's already updated in the swiped function
    };

    const outOfFrame = (name, idx) => {
        if (currentIndexRef.current >= idx && idx >= 0 && idx < filteredDb.length) {
            childRefs[idx].current.restoreCard();
        }
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < filteredDb.length) {
            const newIndex = currentIndex - 1; // Update the index before swiping
            await updateCurrentIndex(newIndex);
            await childRefs[newIndex].current.swipe(dir);
        }
    };

    const goBack = async () => {
        if (!canGoBack) return;

        // Check if the last direction was a right swipe
        if (lastDirection === 'right') {
            // If it was a right swipe, remove the last item from the wishlist
            const updatedWishlist = [...wishlist];
            updatedWishlist.pop(); // Remove the last item
            setWishlist(updatedWishlist);
        }

        const newIndex = currentIndex + 1;
        await updateCurrentIndex(newIndex);
        await childRefs[newIndex].current.restoreCard();
    };


    function generateStars(rating) {
        const starCount = 5; // Maximum number of stars
        const fullStars = Math.floor(rating); // Number of full stars
        const halfStars = Math.ceil(rating - fullStars); // Number of half stars

        // Generate full stars
        const fullStarsString = Array(fullStars).fill('★').join('');

        // Generate half stars
        const halfStarsString = Array(halfStars).fill('½').join('');

        // Generate empty stars
        const emptyStars = starCount - fullStars - halfStars;
        const emptyStarsString = Array(emptyStars).fill('☆').join('');

        return fullStarsString + halfStarsString + emptyStarsString;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen overflow-hidden bg-gradient-to-b from-red-400 to-blue-400">
            <h1 className="text-white text-3xl md:text-5xl font-damion mb-3 md:mb-5 shadow-text">Street Food Tinder</h1>
            <div className="relative flex justify-center items-center w-full max-w-screen-md h-72 md:h-96">
                {filteredDb.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]} // Ensure each card receives the correct ref
                        className="absolute w-full h-full flex items-center justify-center"
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                        <div
                            style={{ backgroundImage: 'url(' + character.url + ')' }}
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
                    className={`px-4 md:px-5 py-2 md:py-3 rounded-lg text-white font-bold text-lg bg-indigo-400 shadow-lg transform transition-transform ${!canSwipe && 'opacity-50'}`}
                    onClick={() => swipe('left')}
                >
                    Swipe left!
                </button>
                <button
                    className={`px-4 md:px-5 py-2 md:py-3 rounded-lg text-white font-bold text-lg bg-indigo-400 shadow-lg transform transition-transform ${!canGoBack && 'opacity-50'}`}
                    onClick={() => goBack()}
                >
                    Undo swipe!
                </button>
                <button
                    className={`px-4 md:px-5 py-2 md:py-3 rounded-lg text-white font-bold text-lg bg-indigo-400 shadow-lg transform transition-transform ${!canSwipe && 'opacity-50'}`}
                    onClick={() => swipe('right')}
                >
                    Swipe right!
                </button>
            </div>
            {lastDirection ? (
                <h2 className="text-white mt-3 md:mt-5 animate-popup">
                    You swiped {lastDirection}
                </h2>
            ) : (
                <h2 className="text-white mt-3 md:mt-5 animate-popup">
                    Swipe a card or press a button to get Restore Card button visible!
                </h2>
            )}
            <div className="w-full max-w-xs mt-5">
                <h3 className="text-lg md:text-2xl font-bold text-white">Wishlist</h3>
                <ul className="bg-white rounded-lg shadow-lg p-3 md:p-4">
                    {wishlist.map((item, index) => (
                        <li key={index} className="mb-2">
                            <h4 className="text-base md:text-lg font-bold">{item.name}</h4>
                            <p className="text-gray-800">Hygiene Rating: {generateStars(item.hygieneRating)}</p>
                            <p className="text-gray-800">Taste Rating: {generateStars(item.tasteRating)}</p>
                            <p className="text-gray-800">Hospitality Rating: {generateStars(item.hospitalityRating)}</p>
                            <a
                                href={item.geoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View on Map
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
}

export default Advanced;

