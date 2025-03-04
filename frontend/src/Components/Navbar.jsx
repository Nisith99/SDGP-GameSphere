import { FaSearch } from "react-icons/fa";
import './Navbar.css'; 

export default function Navbar() {
  return (
    <div className="navbar">
      {/* Logo & Search */}
      <div className="navbar-left">
        <img src="/gameSphere_logo.png" alt="Logo" className="logo" />
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <span className="navbar-item">Home</span>
        <span className="navbar-item">Player</span>
        <span className="navbar-item">Club</span>
        <span className="navbar-item">Notifications</span>
        <span className="navbar-item">Message</span>
        <span className="navbar-item">Profile</span>
      </div>
    </div>
  );
}
