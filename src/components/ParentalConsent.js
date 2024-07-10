import React from 'react';
import axios from 'axios';
const ParentalConsent = ({ onConsent,userId }) => {
    const handleConsent = () => {
        localStorage.setItem('parentalConsentShown', 'true');
        onConsent(); // Call the parent component function to handle consent
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow p-6">
            <div className="bg-background text-yellow-400 rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl text-yellow font-bold mb-4">Parental Consent Required</h2>
                <p className="mb-6 text-yellow">Please have your parent or guardian verify your account.</p>
                <button
                    className="mt-2 bg-background text-yellow px-4 py-2 rounded hover:bg-yellow hover:text-background border-2 border-yellow font-semibold focus:outline-none"
                    onClick={handleConsent} // Update to call handleConsent
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default ParentalConsent;
