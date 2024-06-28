import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const useGeolocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const position = await Geolocation.getCurrentPosition();
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            } catch (err) {
                setError('Error getting user location: ' + err.message);
            }
        };

        getLocation();
    }, []);

    return { location, error };
};

export default useGeolocation;
