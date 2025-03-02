import {  FaSearch } from "react-icons/fa";
import { Link  } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-400 shadow-md p-4 flex justify-between items-center px-8">
      {/* Left Side -  Logo & Search */}
      <div className="flex items-center space-x-10">
        <img src="/gameSphere_logo.png" alt="Logo" className="h-16 w-auto"/>
        <div className="flex items-center bg-blue-200 p-2 rounded-md w-72">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        <Link to="/Home.jsx" className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Home
        </Link>

        <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Player
        </Link> 

        <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Club
        </Link>

        <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Notifications
        </Link>

        <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Message
        </Link>

        <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 text-xl font-medium cursor-pointer hover:text-blue-600 transition">
          Profile
        </Link> 

      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
  );
}