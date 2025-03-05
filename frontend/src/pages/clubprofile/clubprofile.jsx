import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Top Navbar */}
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
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Gamesphere User999</h1>
      </div>

      {/* Club List */}
      <div className="club-list">
        {[1, 2, 3].map((item) => (
          <div className="club-card" key={item}>
            <img src="/sd.png" alt="Club Logo" className="club-logo" />
            <div className="club-info">
              <h3>Sport Club Name</h3>
              <p>Club Short Description</p>
            </div>
            <i className="ri-heart-line favorite-icon"></i>
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

export default App;
