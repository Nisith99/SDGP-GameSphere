import React, { useState } from "react";
import "./UserRoleType.css"; // Import the external CSS file

export function UserRoleType() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="container">
      {/* Logo */}
      <div className="logoContainer">
        <div className="logo">
          <div className="logoIcon">
            <div className="logoInnerIcon">
              <div className="logoDot"></div>
            </div>
          </div>
          <h1 className="logoText">GameSphere</h1>
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
            <div style={{ marginRight: "16px" }}>
              <svg width="150" height="60" viewBox="0 0 150 60">
                <g fill="#666666">
                  <circle cx="40" cy="30" r="5" />
                  <rect x="37" y="35" width="6" height="15" rx="2" />
                  <line x1="30" y1="45" x2="50" y2="45" stroke="#666666" strokeWidth="2" />
                </g>
                <g fill="#FF8C00">
                  <circle cx="70" cy="30" r="5" />
                  <rect x="67" y="35" width="6" height="15" rx="2" />
                  <line x1="60" y1="45" x2="80" y2="45" stroke="#FF8C00" strokeWidth="2" />
                  <path d="M70,20 Q75,10 80,20" stroke="#FF8C00" strokeWidth="2" fill="none" />
                </g>
                <g fill="#666666">
                  <circle cx="100" cy="30" r="5" />
                  <rect x="97" y="35" width="6" height="15" rx="2" />
                  <line x1="90" y1="45" x2="110" y2="45" stroke="#666666" strokeWidth="2" />
                  <ellipse cx="110" cy="35" rx="10" ry="5" stroke="#666666" strokeWidth="1" fill="none" />
                </g>
              </svg>
            </div>
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
            <svg width="70" height="70" viewBox="0 0 70 70" style={{ marginRight: "16px" }}>
              <circle cx="35" cy="35" r="30" fill="#0A6E8D" />
              <path d="M20,35 Q35,10 50,35 Q35,50 20,35" fill="#1AA7C8" stroke="#1AA7C8" strokeWidth="2" />
              <path d="M25,40 Q35,25 45,40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="optionText">WE ARE a CLUB</div>
              <div style={{ color: "#115e59", fontWeight: "bold", fontSize: "18px" }}>SPORT</div>
            </div>
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