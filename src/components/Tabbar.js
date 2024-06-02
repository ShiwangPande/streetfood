import React, { useState, useEffect } from 'react';
import './Tabbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faStore, faFire } from '@fortawesome/free-solid-svg-icons';

function Tabbar() {
    const [activeTab, setActiveTab] = useState('advanced');

    useEffect(() => {
        // Get the current URL path
        const currentPath = window.location.pathname;

        // Map URL paths to tab names
        const tabMappings = {
            '/advanced': 'advanced',
            '/map': 'map',
            '/vendors': 'vendors'
        };

        // Set active tab based on current URL path
        setActiveTab(tabMappings[currentPath]);
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="h-0">
            <nav className="TabNavigationContainer shadow-lg bg-black/30 backdrop-blur-lg">
                <a
                    href="/advanced" setActiveTab
                    className={`TabNavigationLink ${activeTab === 'advanced' ? 'active' : ''}`}
                    onClick={() => handleTabClick('advanced')}
                >
                    <FontAwesomeIcon icon={faFire} />
                </a>
                <a
                    href="/map"
                    className={`TabNavigationLink ${activeTab === 'map' ? 'active' : ''}`}
                    onClick={() => handleTabClick('map')}
                >
                    <FontAwesomeIcon icon={faLocationPin} />
                </a>
                <a
                    href="/vendors"
                    className={`TabNavigationLink ${activeTab === 'vendors' ? 'active' : ''}`}
                    onClick={() => handleTabClick('vendors')}
                >
                    <FontAwesomeIcon icon={faStore} />
                </a>
            </nav>
        </div>
    );
}

export default Tabbar;
