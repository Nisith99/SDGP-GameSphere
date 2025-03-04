import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-400 shadow-md p-4 flex justify-between items-center px-8">
      {/* Left Side - Logo & Search */}
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

      {/* Right Side - Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/home" className="text-gray-600 text-xl font-medium hover:text-blue-600 transition">
          Home
        </Link>

        <Link to="/" className="text-gray-600 text-xl font-medium hover:text-blue-600 transition">
          Player
        </Link>

        <Link to="/club" className="text-gray-600 text-xl font-medium hover:text-blue-600 transition">
          Club
        </Link>

        <Link to="/Notification" className="text-gray-600 text-xl font-medium hover:text-blue-600 transition">
          Notifications
        </Link>

        <Link to="/message" className="text-gray-600 text-xl font-medium hover:text-blue-600 transition">
          Message
        </Link>
        
        <Link to="/profile" className="text-gray-600 text-xl font-medium hover:text-blue-600 transition">
          Profile
        </Link>
      </div>
    </div>
  );
}
