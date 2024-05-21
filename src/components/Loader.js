import React, { useState } from 'react';
import './Loader.css'; // Assuming you have a CSS file for styling the loader
import appLogo from './logo256.png'; // Import the app's logo image

const Loader = () => {
    const [filled, setFilled] = useState(false);

    const toggleFill = () => {
        setFilled(!filled);
    };

    return (
        <div>
            <div id="background"></div>
            <div id="logocontainer" onClick={toggleFill} style={{ backgroundColor: filled ? '#3ebffa' : 'transparent' }}>
                <img src={appLogo} alt="App Logo" id="appLogo" />
                <div className="loader" style={{ left: '2vh', top: 0, height: '2vh', width: 0, animation: 'slide1 1s linear forwards infinite' }}></div>
                <div className="loader" style={{ right: 0, top: '2vh', width: '2vh', height: 0, animation: 'slide2 1s linear forwards infinite', animationDelay: '0.5s' }}></div>
                <div className="loader" style={{ right: '2vh', bottom: 0, height: '2vh', width: 0, animation: 'slide3 1s linear forwards infinite' }}></div>
                <div className="loader" style={{ left: 0, bottom: '2vh', width: '2vh', height: 0, animation: 'slide4 1s linear forwards infinite', animationDelay: '0.5s' }}></div>
            </div>
        </div>
    );
};

export default Loader;
