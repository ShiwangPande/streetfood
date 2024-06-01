import React, { useState } from 'react';
import logo from "../../components/logo256.png";
import { Link } from 'react-router-dom';
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
        <>
            <nav className=" shadow-md">
                <div className=" fixed shadow-lg  bg-[#b9c1ea92] backdrop-blur-lg w-[100vw] ">
                    <div className="flex items-center z-100 container justify-between mx-auto px-6 py-4">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center mr-6">
                                <img src={logo} className="h-10 mr-2" alt="KartMatch Logo" />
                                <span className="text-xl font-semibold text-gray-800">KartMatch</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
            <div className="flex items-center justify-center min-h-screen  bg-center bg-blue-100" >






                <div className=" p-6 rounded-xl shadow-lg  bg-[#b9c1ea92] backdrop-blur-lg" >
                    {/* welcome to kartmatch */}
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome to Kartmatch</h1>
                    <p className="text-center text-lg italic  text-gray-800 mb-6"> Please select any two preferences</p>
                    <div className="flex flex-wrap justify-center">
                        <button
                            onClick={() => handlePreferenceClick('Hygiene')}
                            className={`px-6 py-3 mb-4 mr-4 text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 ${preferences.includes('Hygiene') ? 'bg-[#F0725C] text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            Hygiene
                        </button>
                        <button
                            onClick={() => handlePreferenceClick('Taste')}
                            className={`px-6 py-3 mb-4 mr-4 text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 ${preferences.includes('Taste') ? 'bg-[#F0725C] text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            Taste
                        </button>
                        <button
                            onClick={() => handlePreferenceClick('Hospitality')}
                            className={`px-6 py-3 mb-4 mr-4 text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 ${preferences.includes('Hospitality') ? 'bg-[#F0725C] text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            Hospitality
                        </button>
                    </div>
                    {preferences.length === 2 && (
                        <button
                            onClick={handleSubmit}
                            className="block w-full mt-4 py-3 bg-[#F0725C] text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Survey;
