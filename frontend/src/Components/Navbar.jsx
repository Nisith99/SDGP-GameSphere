import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

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
