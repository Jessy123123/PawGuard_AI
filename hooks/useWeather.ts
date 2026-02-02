import { mockWeatherCases } from '../mocks/mockWeather';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import useLocation from './useLocation';

const USE_MOCK_WEATHER =
    process.env.EXPO_PUBLIC_USE_MOCK_WEATHER === 'true';


// Weather condition codes from OpenWeatherMap
// https://openweathermap.org/weather-conditions
export interface WeatherData {
    temp: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    weatherId: number;
    weatherMain: string;
    cityName: string;
}

export interface WeatherAlert {
    type: 'thunderstorm' | 'flood' | 'snow' | 'extreme_heat' | 'extreme_cold' | 'high_wind' | 'tornado' | 'dust' | 'none';
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    title: string;
    description: string;
}

interface UseWeatherReturn {
    weather: WeatherData | null;
    isExtremeWeather: boolean;
    weatherAlert: WeatherAlert;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

const getWeatherAlert = (weatherId: number, temp: number, windSpeed: number): WeatherAlert => {
    // Thunderstorm (200-232)
    if (weatherId >= 200 && weatherId <= 232) {
        return {
            type: 'thunderstorm',
            severity: 'CRITICAL',
            title: 'Thunderstorm Warning',
            description: 'Severe thunderstorm detected. Seek shelter immediately and secure outdoor animals.',
        };
    }

    // Tornado (781)
    if (weatherId === 781) {
        return {
            type: 'tornado',
            severity: 'CRITICAL',
            title: 'Tornado Alert',
            description: 'Tornado warning in effect. Move to the lowest floor and protect all animals.',
        };
    }

    // Dust storm / Sandstorm (761, 762)
    if (weatherId >= 761 && weatherId <= 762) {
        return {
            type: 'dust',
            severity: 'HIGH',
            title: 'Dust Storm Warning',
            description: 'Dangerous dust storm conditions. Keep animals indoors with windows closed.',
        };
    }

    // Heavy Rain / Flood (502-531)
    if (weatherId >= 502 && weatherId <= 531) {
        return {
            type: 'flood',
            severity: 'HIGH',
            title: 'Flood Warning',
            description: 'Heavy rainfall and potential flooding. Move animals to higher ground.',
        };
    }

    // Snow / Blizzard (600-622)
    if (weatherId >= 600 && weatherId <= 622) {
        const isBlizzard = weatherId >= 615 || windSpeed > 15;
        return {
            type: 'snow',
            severity: isBlizzard ? 'HIGH' : 'MEDIUM',
            title: isBlizzard ? 'Blizzard Warning' : 'Snow Advisory',
            description: isBlizzard
                ? 'Blizzard conditions detected. Bring all animals indoors immediately.'
                : 'Snow conditions present. Ensure outdoor animals have warm shelter.',
        };
    }

    // Extreme Heat (temp > 40°C / 104°F)
    if (temp > 40) {
        return {
            type: 'extreme_heat',
            severity: 'HIGH',
            title: 'Extreme Heat Warning',
            description: `Temperature at ${temp}°C. Provide shade, water, and cool shelter for all animals.`,
        };
    }

    // Extreme Cold (temp < -10°C / 14°F)
    if (temp < -10) {
        return {
            type: 'extreme_cold',
            severity: 'HIGH',
            title: 'Extreme Cold Warning',
            description: `Temperature at ${temp}°C. Bring all animals indoors immediately.`,
        };
    }

    // High Wind (wind > 20 m/s)
    if (windSpeed > 20) {
        return {
            type: 'high_wind',
            severity: 'MEDIUM',
            title: 'High Wind Advisory',
            description: 'Strong winds detected. Secure loose objects and provide shelter for animals.',
        };
    }

    // No extreme weather
    return {
        type: 'none',
        severity: 'NONE',
        title: 'Normal Conditions',
        description: 'Weather conditions are normal. All systems monitoring.',
    };
};

export default function useWeather(): UseWeatherReturn {
    const { coords, error: locationError, loading: locationLoading } = useLocation() as {
        coords: { latitude: number; longitude: number } | null;
        error: string | null;
        loading: boolean;
    };
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weatherAlert, setWeatherAlert] = useState<WeatherAlert>({
        type: 'none',
        severity: 'NONE',
        title: 'Normal Conditions',
        description: 'Weather conditions are normal. All systems monitoring.',
    });

    const fetchWeather = useCallback(async () => {
        if (!coords && !USE_MOCK_WEATHER) return;

        setLoading(true);
        setError(null);

        try {
            let weatherData: WeatherData;

            // 🧪 MOCK MODE (for testing)
            if (USE_MOCK_WEATHER) {
                const MOCK_TYPE = 'TORNADO'; // 🔁 change to test others
                weatherData = mockWeatherCases[MOCK_TYPE];
            }
            // 🌍 REAL API MODE (production)
            else {
                const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_KEY;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords!.latitude}&lon=${coords!.longitude}&units=metric&appid=${apiKey}`;

                const response = await axios.get(url);
                const data = response.data;

                weatherData = {
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    weatherId: data.weather[0].id,
                    weatherMain: data.weather[0].main,
                    cityName: data.name,
                };
            }

            setWeather(weatherData);

            // 🔥 SAME disaster logic for real + mock
            const alert = getWeatherAlert(
                weatherData.weatherId,
                weatherData.temp,
                weatherData.windSpeed
            );

            setWeatherAlert(alert);
        } catch (err) {
            setError('Failed to fetch weather data');
            console.error('Weather fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [coords]);


    useEffect(() => {
        if (coords) {
            fetchWeather();
        }
    }, [coords, fetchWeather]);

    useEffect(() => {
        if (locationError) {
            setError(locationError);
            setLoading(false);
        }
    }, [locationError]);

    const isExtremeWeather = weatherAlert.severity !== 'NONE' && weatherAlert.type !== 'none';

    return {
        weather,
        isExtremeWeather,
        weatherAlert,
        loading: loading || locationLoading,
        error,
        refetch: fetchWeather,
    };
}
