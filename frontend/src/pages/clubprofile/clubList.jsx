import React, { useState } from "react";
import "./App.css";
import Navbar from "../src/Components/Navbar";
import { Footer } from "../src/Components/footer";

const mockPlayers = [
  { id: 1, name: "John Doe", position: "Forward", rating: 4.8, available: true, location: "USA" },
  { id: 2, name: "Mike Smith", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 3, name: "David Johnson", position: "Defender", rating: 4.7, available: true, location: "Germany" },
  { id: 4, name: "Chris Lee", position: "Goalkeeper", rating: 4.6, available: true, location: "Brazil" },
  { id: 5, name: "Liam Brown", position: "Forward", rating: 4.9, available: true, location: "France" },
  { id: 6, name: "Noah White", position: "Midfielder", rating: 4.3, available: true, location: "Spain" },
  { id: 7, name: "Falcoa", position: "Forward", rating: 4.5, available: false, location: "UK" },
  { id: 8, name: "Messi", position: "Midfielder", rating: 4.5, available: false, location: "Spain" },
  { id: 9, name: "Zlatan Ibrahimovic", position: "Defender", rating: 4.5, available: false, location: "UK" },
  { id: 10, name: "Mike Noah", position: "Forward", rating: 4.5, available: false, location: "UK" },
  { id: 11, name: "Neymar", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 12, name: "Mike SD", position: "Midfielder", rating: 4.5, available: false, location: "Spain" },
  { id: 12, name: "Mike Sazowski", position: "Defender", rating: 4.5, available: false, location: "UK" },
  { id: 14, name: "Mike Smenah", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 15, name: "Cristiano", position: "Forward", rating: 4.5, available: false, location: "Spain" },
  { id: 16, name: "Ronaldo", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 17, name: "Leo", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 18, name: "Jennda", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 19, name: "Mbappe", position: "Midfielder", rating: 4.5, available: false, location: "UK" },
  { id: 20, name: "Leonardo Da Vinci", position: "Midfielder", rating: 4.5, available: false, location: "UK" },

];

const ClubProfile = () => {
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const filteredPlayers = mockPlayers.filter(player => {
    return (
      (selectedPosition === "All" || player.position === selectedPosition) &&
      (selectedAvailability === "All" || (selectedAvailability === "Available" ? player.available : !player.available)) &&
      (selectedLocation === "All" || player.location === selectedLocation)
    );
  });

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar />

      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="club-info-box">
        <img src="/club_logo.png" alt="Club Logo" className="club-logo-large" />
        <div>
          <h1>Elite Football Club</h1>
          <p>Based in New York, Elite FC has a rich history of producing top talent in the game.</p>
          <p><strong>Location:</strong> New York, USA</p>
        </div>
      </div>

      <div className="filter-section">
        <label>Position:</label>
        <select onChange={(e) => setSelectedPosition(e.target.value)}>
          <option value="All">All</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>

        <label>Availability:</label>
        <select onChange={(e) => setSelectedAvailability(e.target.value)}>
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <label>Location:</label>
        <select onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="All">All</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
          <option value="Brazil">Brazil</option>
          <option value="France">France</option>
        </select>
      </div>

      <div className="player-list">
        {filteredPlayers.map(player => (
          <div className="player-card" key={player.id}>
            <h3>{player.name}</h3>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Rating:</strong> {player.rating} ⭐</p>
            <p><strong>Location:</strong> {player.location}</p>
            <p className={player.available ? "available" : "unavailable"}>
              {player.available ? "Available for Recruitment" : "Currently Unavailable"}
            </p>
            <button className="profile-btn">View Profile</button>
            <button className="contact-btn">Contact Player</button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ClubProfile;
