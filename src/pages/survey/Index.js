import React, { useState } from 'react';
import logo from "../../components/logo256.png";
import { Link } from 'react-router-dom';
import "../../App.css";
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
        <div className='relative z-[10000]'>
            <nav className=" shadow-md">
                <div className=" fixed h-24 bg-background w-[100vw] ">

                </div>
            </nav>
            <div className="flex items-center  justify-center min-h-screen  bg-center bg-background" >
                <div className=" flex h-[60vh] justify-between flex-col " >
                    <div className=''>
                        <h1 className="lg:text-3xl text-3xl font-semibold text-left ml-3 raleway text-yellow mb-3">Welcome to Kartmatch</h1>
                        <p className="text-left text-xl  ml-3 text-yellow mb-6"> Pick any 2 preferences</p>
                        <div className="flex flex-wrap mt-14 justify-center">
                            <button
                                onClick={() => handlePreferenceClick('Hygiene')}
                                className={`px-2  h-[5.85rem] border-2 border-yellow  mb-4 mr-4 text-lg font-medium rounded-full cursor-pointer shadow-md transition-transform hover:scale-105 ${preferences.includes('Hygiene') ? 'bg-yellow text-background' : 'bg-background text-yellow'
                                    }`}
                            >
                                Hygiene
                            </button>
                            <button
                                onClick={() => handlePreferenceClick('Taste')}
                                className={`px-6  h-[5.8rem] border-2 border-yellow  mb-4 mr-4 text-lg font-medium rounded-full cursor-pointer shadow-md transition-transform hover:scale-105 ${preferences.includes('Taste') ? 'bg-yellow text-background' : 'bg-background text-yellow'
                                    }`}
                            >
                                Taste
                            </button>
                            <button
                                onClick={() => handlePreferenceClick('Hospitality')}
                                className={`px-0 tracking-tight	  h-[5.8rem] border-2 border-yellow  mb-4 mr-4 text-lg font-medium cursor-pointer rounded-full shadow-md transition-transform hover:scale-105 ${preferences.includes('Hospitality') ? 'bg-yellow text-background' : 'bg-background text-yellow'
                                    }`}
                            >
                                Hospitality
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        {preferences.length === 2 && (
                            <button
                                onClick={handleSubmit}
                                className="block w-[5rem]  h-[5rem] mx-auto bg-yellow text-background font-semibold rounded-full shadow-md transition-transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' width={50} height={50} viewBox="0 0 25 25"><path style={{ fill: '#00000' }} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right" /></svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Survey;