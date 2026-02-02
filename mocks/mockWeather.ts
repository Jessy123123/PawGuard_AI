import { WeatherData } from '../hooks/useWeather';

export const mockWeatherCases: Record<string, WeatherData> = {
    THUNDERSTORM: {
        temp: 29,
        description: 'severe thunderstorm',
        icon: '11d',
        humidity: 92,
        windSpeed: 22,
        weatherId: 202,
        weatherMain: 'Thunderstorm',
        cityName: 'Ipoh (Mock)',
    },

    TORNADO: {
        temp: 28,
        description: 'tornado detected',
        icon: '50d',
        humidity: 80,
        windSpeed: 40,
        weatherId: 781,
        weatherMain: 'Tornado',
        cityName: 'Ipoh (Mock)',
    },

    HEATWAVE: {
        temp: 42,
        description: 'extreme heat',
        icon: '01d',
        humidity: 40,
        windSpeed: 5,
        weatherId: 800,
        weatherMain: 'Clear',
        cityName: 'Ipoh (Mock)',
    },
};
