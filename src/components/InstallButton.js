import React, { useState, useEffect } from 'react';
import logo from './logo256.png';

function InstallPopup() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setIsPopupVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    useEffect(() => {
        if (!isPopupVisible) {
            // Force a re-render to update the DOM
            setIsPopupVisible(false);
        }
    }, [isPopupVisible]);

    return (
        <>
            {isPopupVisible && (
                <div className="flex fixed top-0 w-[100vw] z-[10000] backdrop-blur-lg items-center justify-center h-screen bg-cover bg-center">
                    <div className="backdrop-blur-[1.8px] bg-white/60  p-8 rounded-lg shadow-lg blur-container">
                        {/* Your logo goes here */}
                        <img src={logo} alt="Logo" className="mx-auto h-28 mb-4" />

                        <p className="text-center text-black mb-6">Welcome to KartMatch</p>

                        <div className="flex gap-5 justify-between">
                            <button onClick={handleInstallClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Install
                            </button>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setIsPopupVisible(false);
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default InstallPopup;
