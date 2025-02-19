import {  FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Side -  Search */}
      <div className="flex items-center space-x-3">
        
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Right Side - Home, Notifications & Profile */}
      <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl cursor-pointer hover:text-blue-600 transition">
          Home
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl cursor-pointer hover:text-blue-600 transition">
          Player
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl cursor-pointer hover:text-blue-600 transition">
          Club
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl cursor-pointer hover:text-blue-600 transition">
          Notifications
        </span>

        <div className="flex items-center space-x-6">
        <span className="text-gray-600 text-xl cursor-pointer hover:text-blue-600 transition">
          Profile
        </span>

      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
  );
}
