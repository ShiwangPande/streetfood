// src/WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (item) => {
        // Check if the item already exists in the wishlist
        const exists = wishlist.some((wishlistItem) => wishlistItem.name === item.name);
        if (!exists) {
            setWishlist((prevWishlist) => [...prevWishlist, item]);
        }
    };


    const removeFromWishlist = (itemIdToRemove) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== itemIdToRemove));
    };
    

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
