import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./AvailabilityCard.css"; 

const AvailabilityCard = () => {
  return (
    <div className="card-container">
      {/* User Icon & Input Field */}
      <div className="input-section">
        <FaUserCircle className="user-icon" />
        <input
          type="text"
          placeholder="Find players..."
          className="input-field"
        />
      </div>

      {/* Buttons in Row Below */}
      <div className="button-section">
        <button className="button highlight">🎥 Highlight</button>
        <button className="button stats">📊 Stats</button>
        <button className="button available">🏃‍♂️ Available</button>
      </div>
    </div>
  );
};

export default AvailabilityCard;
