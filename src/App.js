import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./API/Dashboard";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
