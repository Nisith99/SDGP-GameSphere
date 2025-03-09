import React, { useState } from "react";
import "./App.css";

const ClubProfile = () => {
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const players = [
    { id: 1, name: "John Doe", position: "Forward", rating: 4.8, available: true },
    { id: 2, name: "Mike Smith", position: "Midfielder", rating: 4.5, available: false },
    { id: 3, name: "David Johnson", position: "Defender", rating: 4.7, available: true },
    { id: 4, name: "Chris Lee", position: "Goalkeeper", rating: 4.6, available: true },
  ];

  const filteredPlayers = selectedPosition === "All" ? players : players.filter(player => player.position === selectedPosition);

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Navbar */}
      <div className="navbar">
        <img src="/gameSphere_logo.png" alt="GameSphere Logo" className="logo" />
        <h2>GameSphere</h2>
        <div className="search-container">
          <input type="text" placeholder="Search here..." className="search-bar" />
          <i className="ri-search-line search-icon"></i>
        </div>
        <div className="nav-icons">
          <div className="nav-item active">
            <i className="ri-home-line"></i>
            <span>Home</span>
          </div>
          <div className="nav-item">
            <i className="ri-message-2-line"></i>
            <span>Messages</span>
          </div>
          <div className="nav-item">
            <i className="ri-notification-line"></i>
            <span>Notification</span>
          </div>
          <div className="nav-item">
            <i className="ri-user-line"></i>
            <span>User Profile</span>
          </div>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Club Information Section */}
      <div className="club-info-box">
        <img src="/club_logo.png" alt="Club Logo" className="club-logo-large" />
        <div>
          <h1>Elite Football Club</h1>
          <p>Based in New York, Elite FC has a rich history of producing top talent in the game.</p>
          <p><strong>Location:</strong> New York, USA</p>
        </div>
      </div>

      {/* Player Filters */}
      <div className="filter-section">
        <label>Filter by Position:</label>
        <select onChange={(e) => setSelectedPosition(e.target.value)}>
          <option value="All">All</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>

      {/* Players List */}
      <div className="player-list">
        {filteredPlayers.map(player => (
          <div className="player-card" key={player.id}>
            <h3>{player.name}</h3>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Rating:</strong> {player.rating} ⭐</p>
            <p className={player.available ? "available" : "unavailable"}>
              {player.available ? "Available for Recruitment" : "Currently Unavailable"}
            </p>
            <button className="profile-btn">View Profile</button>
            <button className="contact-btn">Contact Player</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="row social-links">
            <a id="facebook" href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>
            <a id="insta" href="https://instagram.com/"><i className="fa fa-instagram"></i></a>
            <a id="whatsapp" href="https://whatsapp.com/"><i className="fa fa-whatsapp"></i></a>
            <a id="linkedin" href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a>
          </div>
          <div className="row">
            <ul>
              <li><a href="#">Back to TOP</a></li>
              <li><a href="contactus.html">Contact us</a></li>
              <li><a href="privacypolicy.html">Privacy Policy</a></li>
              <li><a href="termsandconditions.html">Terms & Conditions</a></li>
              <li><a href="editorspage.html">Editors page</a></li>
            </ul>
          </div>
          <div className="row copyright">
            Gamesphere Copyright © 2024 Sports - All rights reserved || Designed By: <a href="gamespheremembers.html">Gamesphere Members</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClubProfile;
