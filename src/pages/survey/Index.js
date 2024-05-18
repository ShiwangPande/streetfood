import React, { useState } from 'react';

const Survey = ({ onComplete }) => {
    const [preferences, setPreferences] = useState([]);

    const handlePreferenceClick = (preference) => {
        if (preferences.length < 2 && !preferences.includes(preference)) {
            setPreferences([...preferences, preference]);
        } else if (preferences.includes(preference)) {
            setPreferences(preferences.filter((pref) => pref !== preference));
        }
    };

    const handleSubmit = () => {
        if (preferences.length === 2) {
            onComplete(preferences);
        } else {
            alert('Please select any two preferences');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-400 to-blue-400">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Survey</h1>
                <div className="flex flex-wrap justify-center">
                    <button
                        onClick={() => handlePreferenceClick('Hygiene')}
                        className={`px-6 py-3 mb-4 mr-4 text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 ${preferences.includes('Hygiene') ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Hygiene
                    </button>
                    <button
                        onClick={() => handlePreferenceClick('Taste')}
                        className={`px-6 py-3 mb-4 mr-4 text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 ${preferences.includes('Taste') ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Taste
                    </button>
                    <button
                        onClick={() => handlePreferenceClick('Hospitality')}
                        className={`px-6 py-3 mb-4 mr-4 text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 ${preferences.includes('Hospitality') ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Hospitality
                    </button>
                </div>
                {preferences.length === 2 && (
                    <button
                        onClick={handleSubmit}
                        className="block w-full mt-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
                    >
                        Submit
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default Survey;
