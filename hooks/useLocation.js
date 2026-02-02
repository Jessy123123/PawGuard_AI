import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
    const [coords, setCoords] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setError('Location permission denied');
                    setLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setCoords(location.coords);
            } catch (err) {
                setError('Failed to get location');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { coords, error, loading };
}
