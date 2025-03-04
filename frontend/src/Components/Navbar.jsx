import { FaSearch } from "react-icons/fa";

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
      <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Home
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Player
        </span> 

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Club
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Notifications
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Message
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Profile
        </span> 

      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}
