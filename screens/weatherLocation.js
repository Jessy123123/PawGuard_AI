import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocation from '../hooks/useLocation';

export default function WeatherScreen() {
    const { coords, error, loading } = useLocation();
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!coords) return;

        const fetchWeather = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_KEY}`;

            const response = await axios.get(url);
            setWeather(response.data);
        };

        fetchWeather();
    }, [coords]);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>{error}</Text>;

    return (
        <View>
            {weather && (
                <>
                    <Text>🌡 {weather.main.temp} °C</Text>
                    <Text>🌤 {weather.weather[0].description}</Text>
                </>
            )}
        </View>
    );
}
