import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search, Bell, MessageCircle, User, Home, Users, ChevronDown, Menu } from "lucide-react";
import "./Navbar.css"; // Import the external CSS file

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo & Search */}
          <div className="navbar-logo-search">
            <div className="navbar-logo">
              <img src="gameSphere_logo.png" alt="GameSphere Logo" />
            </div>
            <div className={`navbar-search-container ${searchFocused ? "focused" : ""}`}>
              <div className={`navbar-search ${searchFocused ? "focused" : ""}`}>
                <Search className={`navbar-search-icon ${searchFocused ? "focused" : ""}`} />
                <input
                  type="text"
                  placeholder="Search games, players, clubs..."
                  className={`navbar-search-input ${searchFocused ? "focused" : ""}`}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} color="#ffffff" />
          </button>

          {/* Navigation */}
          <div className={`navbar-navigation ${isMobileMenuOpen ? "open" : ""}`}>
            <NavItem icon={<Home size={18} />} label="Home" link="/home" />
            <NavItem icon={<User size={18} />} label="Player" link="/player" />
            <NavItem icon={<Users size={18} />} label="Club" link="/club" />
            <NavItem icon={<Bell size={18} />} label="Notifications" link="/notifications" />
            <NavItem icon={<MessageCircle size={18} />} label="Messages" link="/messages" />

            {/* Profile Dropdown */}
            <div className="profile-dropdown-container">
              <button className="profile-button" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <span className="sr-only">Open user menu</span>
                <div className="profile-avatar">NI</div>
                <ChevronDown style={{ width: "1rem", height: "1rem", color: "#ffffff" }} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <a href="#" className="profile-dropdown-item">
                    Your Profile
                  </a>
                  <a href="#" className="profile-dropdown-item">
                    Settings
                  </a>
                  <a href="#" className="profile-dropdown-item">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// NavItem Component
const NavItem = ({ label, icon, link }) => {
  return (
    <a href={link} className="nav-item">
      {icon}
      {label}
    </a>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
};
