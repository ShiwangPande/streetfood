import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        return storedWishlist || [];
    });
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item) => {
        const exists = wishlist.some((wishlistItem) => wishlistItem.id === item.id);
        if (!exists) {
            setWishlist((prevWishlist) => [...prevWishlist, item]);
        }
    };
    const removeFromWishlist = (itemId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((wishlistItem) => wishlistItem.id !== itemId));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
