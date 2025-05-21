import React, { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh, FaWind, FaTint, FaCloudRain } from "react-icons/fa";
import "./Dashboard.css";
import "./Dashboard.css"

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  const API_KEY = "12d153c12a2ed18b4ca0b394e71b7c49";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      updateRecentSearches(city);
    } catch (err) {
      setError("City not found");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (city) => {
    let updated = [city, ...recentSearches.filter((c) => c !== city)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🌤 Weather Dashboard</h1>

        <div className="searchContainer">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input"
          />
          <button onClick={fetchWeather} className="button">
            Search
          </button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weatherInfo">
            <h2 className="weatherTitle">{weatherData.name}</h2>
            <p className="weatherRow">
              <FaTemperatureHigh /> {weatherData.main.temp}°C
            </p>
            <p className="weatherRow">
              <FaCloudRain /> {weatherData.weather[0].description}
            </p>
            <p className="weatherRow">
              <FaWind /> Wind: {weatherData.wind.speed} m/s
            </p>
            <p className="weatherRow">
              <FaTint /> Humidity: {weatherData.main.humidity}%
            </p>
          </div>
        )}

        {recentSearches.length > 0 && (
          <div className="recentSearches">
            <h3 className="recentTitle">🔁 Recent Searches</h3>
            <ul className="recentList">
              {recentSearches.map((c, idx) => (
                <li
                  key={idx}
                  className="recentItem"
                  onClick={() => {
                    setCity(c);
                    fetchWeather();
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
