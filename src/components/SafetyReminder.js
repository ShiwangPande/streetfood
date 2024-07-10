import React from 'react';
import axios from 'axios';
const SafetyReminder = ({ onAgree, userId }) => {
    const handleAgree = () => {
        localStorage.setItem('safetyReminderShown', 'true');
        onAgree(); // Call the parent component function to handle agreement
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow p-6">
            <div className="bg-background text-yellow-400 rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl text-yellow font-bold mb-4">Stay Safe Online</h2>
                <p className="mb-6 text-yellow">
                    Remember to never share personal information and be aware of the risks of online interactions.
                </p>
                <button
                    className="mt-2 bg-background text-yellow px-4 py-2 rounded hover:bg-yellow hover:text-background border-2 border-yellow font-semibold focus:outline-none"
                    onClick={handleAgree} // Update to call handleAgree
                >
                    I Understand
                </button>
            </div>
        </div>
    );
};

export default SafetyReminder;
