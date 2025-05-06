import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import { Calendar } from 'lucide-react'; 

interface WeatherData {
    location: {
        name: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        humidity: number;
        wind_kph: number;
    };
}

const SearchInput = () => {
    const [query, setQuery] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
                params: {
                    q: query,
                    key: 'b1b30081fcf649a3bc4154937250605',
                },
            });
            setWeatherData(response.data);
            setError(''); // clear error
        } catch (error) {
            console.log('Error:', error);
            setWeatherData(null); // clear data
            setError('City not found or invalid request.'); // set error message
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const getDayName = (dateString: string) => {
        const date = new Date(dateString);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
    };

    const getDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="search_container">
            <input
                type="text"
                placeholder="Search city"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p className="error-message">{error}</p>}

            {weatherData && (
                <div className="weather-card">
                    <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
                    <p><strong>Day:</strong> {getDayName(weatherData.location.localtime)}</p>
                    <div className="date-line">
                        <Calendar size={18} style={{ marginRight: '8px' }} />
                        <span>{getDate(weatherData.location.localtime)}</span>
                    </div>
                    <p><strong>Temperature:</strong> {weatherData.current.temp_c}°C</p>
                    <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                    <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
                    <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} km/h</p>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
