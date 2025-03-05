import React from "react";
import "./clubprofile.css.css";

const App = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src="/gameSphere_logo.png" alt="GameSphere Logo" className="logo" />
        <h2>GameSphere</h2>
        <ul className="sidebar-menu">
          <li className="active">Home</li>
          <li>Explore</li>
          <li>Events</li>
          <li>Contact</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="navbar">
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

        {/* Hero Section */}
        <div className="hero">
          <h1>Welcome to Gamesphere User999</h1>
        </div>

        {/* Club List */}
        <div className="club-list">
          {[1, 2, 3].map((item) => (
            <div className="club-card" key={item}>
              <img src="/gameSphere_logo.png" alt="Club Logo" className="club-logo" />
              <div className="club-info">
                <h3>Sport Club Name</h3>
                <p>Club Short Description</p>
              </div>
              <i className="ri-heart-line favorite-icon"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
