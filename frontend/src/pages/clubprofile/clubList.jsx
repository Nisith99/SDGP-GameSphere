import React, { useState, useMemo } from "react";
import "./App.css";

const mockPlayers = [
  { id: 1, name: "John Doe", position: "Forward", rating: 4.8, matches: 50, available: true, location: "USA" },
  { id: 2, name: "Mike Smith", position: "Midfielder", rating: 4.5, matches: 40, available: false, location: "UK" },
  { id: 3, name: "David Johnson", position: "Defender", rating: 4.7, matches: 45, available: true, location: "Germany" },
  { id: 4, name: "Chris Lee", position: "Goalkeeper", rating: 4.6, matches: 55, available: true, location: "Brazil" },
  { id: 5, name: "Liam Brown", position: "Forward", rating: 4.9, matches: 60, available: true, location: "France" }
];

const ClubProfile = () => {
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [availability, setAvailability] = useState("all");

  const handlePositionChange = (position) => {
    setSelectedPosition((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  const filteredPlayers = useMemo(() => {
    return mockPlayers
      .filter(player => selectedPosition.length === 0 || selectedPosition.includes(player.position))
      .filter(player => player.matches >= matchesPlayed)
      .filter(player => availability === "all" || player.available === (availability === "available"))
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [selectedPosition, sortBy, matchesPlayed, availability]);

  return (
    <div className="club-profile">
      <div className="club-info-box">
        <img src="/club_logo.png" alt="Club Logo" className="club-logo-large" />
        <div>
          <h1>Elite Football Club</h1>
          <p>Based in New York, Elite FC has a rich history of producing top talent in the game.</p>
        </div>
      </div>

      <div className="filter-section">
        <div className="position-filter">
          {["Forward", "Midfielder", "Defender", "Goalkeeper"].map((pos) => (
            <label key={pos}>
              <input
                type="checkbox"
                value={pos}
                checked={selectedPosition.includes(pos)}
                onChange={() => handlePositionChange(pos)}
              />
              {pos}
            </label>
          ))}
        </div>

        <input type="number" min="0" max="100" value={matchesPlayed} onChange={(e) => setMatchesPlayed(Number(e.target.value))} />
        <span>Min Matches: {matchesPlayed}</span>

        <select onChange={(e) => setAvailability(e.target.value)}>
          <option value="all">All Players</option>
          <option value="available">Available Only</option>
          <option value="unavailable">Unavailable Only</option>
        </select>
      </div>

      <div className="player-list">
        {filteredPlayers.map(player => (
          <div className="player-card" key={player.id}>
            <h3>{player.name}</h3>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Rating:</strong> {player.rating} ⭐</p>
            <p><strong>Matches Played:</strong> {player.matches}</p>
            <p className={player.available ? "available" : "unavailable"}>
              {player.available ? "Available for Recruitment" : "Currently Unavailable"}
            </p>
            <button className="profile-btn">View Profile</button>
            <button className="contact-btn">Contact Player</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubProfile;
