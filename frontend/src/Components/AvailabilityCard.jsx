import React from "react";
import { FaUserCircle } from "react-icons/fa"; // User icon

const AvailabilityCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center space-y-3 w-full max-w-2xl mx-auto mt-6 border border-gray-200">
      {/* Top Section: User Icon & Input Field */}
      <div className="flex items-center w-full">
        <FaUserCircle className="text-gray-600 text-3xl mr-3" />
        <input
          type="text"
          placeholder="Share your availability or find players..."
          className="flex-1 bg-gray-100 p-3 rounded-full outline-none text-gray-700 focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Bottom Section: Buttons in Row Below */}
      <div className="flex justify-around w-full mt-3">
        <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800">
          <span className="text-sm font-medium">🎥 Highlight</span>
        </button>

        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
          <span className="text-sm font-medium">📊 Stats</span>
        </button>

        <button className="flex items-center space-x-1 text-green-600 hover:text-green-800">
          <span className="text-sm font-medium">🏃‍♂️ Available</span>
        </button>
      </div>
    </div>
  );
};

export default AvailabilityCard;
