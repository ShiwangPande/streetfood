// src/WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (item) => {
        setWishlist((prevWishlist) => [...prevWishlist, item]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
