import { FaLinkedin, FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Side - Logo & Search */}
      <div className="flex items-center space-x-3">
        <FaLinkedin className="text-blue-600 text-3xl" />
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center space-x-6">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
      </div>
    </div>
  );
}
