import React, { useState } from "react";
import "./UserRoleType.css"; // Import the CSS file

export function UserRoleType() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="container">
      {/* Logo */}
      <div className="logoContainer">
        <div className="logo">
          <img
            src="/gameSphere_logo.png" // Update the path to your logo
            alt="GameSphere Logo"
            className="logoImage"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="mainContent">
        {/* Player Option */}
        <button
          className={`optionButton ${selectedOption === "player" ? "selected" : ""}`}
          onClick={() => setSelectedOption("player")}
          aria-label="Select Player Option"
        >
          <div className="optionContent">
            <img
              src="/NicePng_sports-png_145042.png" // Update the path to your player icon
              alt="Player Icon"
              className="optionIcon"
            />
            <div className="optionText">I AM PLAYER</div>
          </div>
        </button>

        {/* Club Option */}
        <button
          className={`optionButton ${selectedOption === "club" ? "selected" : ""}`}
          onClick={() => setSelectedOption("club")}
          aria-label="Select Club Option"
        >
          <div className="optionContent">
            <img
              src="/club.png" // Update the path to your club icon
              alt="Club Icon"
              className="optionIcon"
            />
            <div className="optionText">WE ARE A SPORT CLUB</div>
          </div>
        </button>

        {/* Submit Button */}
        <button className="submitButton" aria-label="Submit Selection">
          SUBMIT
        </button>
      </div>
    </div>
  );
}