import React from 'react';

const Settings = ({ onToggleComments, commentsEnabled }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-yellow text-background rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Parental Controls</h2>
                <label htmlFor="toggle" className="flex items-center space-x-4 cursor-pointer">
                    <span className="text-background font-semibold">Enable Comments:</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="toggle"
                            className="sr-only"
                            checked={commentsEnabled}
                            onChange={onToggleComments}
                        />
                        <div className="w-12 h-6 bg-background rounded-full shadow-inner ring-2 ring-background ring-offset-2 ring-offset-background transition-all duration-200 ease-in-out">
                            <div className={`w-6 h-6 bg-yellow rounded-full shadow-md transform ${commentsEnabled ? 'translate-x-full' : ''} transition-transform duration-200 ease-in-out`}></div>
                        </div>
                    </div>
                    <span className="text-background font-bold">{commentsEnabled ? 'On' : 'Off'}</span>
                </label>
            </div>
        </div>
    );
};

export default Settings;
