import Navbar from "../../Components/Navbar";
import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./PlayerListView.css"; 

const players = [
  {
    id: 1,
    name: "Jamie Varady",
    score: 12,
    team: "Leicester City",
    sport: "Football",
    country: "England",
  },
  {
    id: 2,
    name: "Saibo Mane",
    score: 10,
    team: "Liverpool",
    sport: "Football",
    country: "England",
  },
  {
    id: 3,
    name: "Tammy Abraham",
    score: 9,
    team: "Chelsea",
    sport: "Football",
    country: "England",
  },
  {
    id: 4,
    name: "Marcus Rashford",
    score: 7,
    team: "Manchester United",
    sport: "Football",
    country: "England",
  },
  {
    id: 5,
    name: "Saman Kumara",
    score: 6,
    team: "Crystal Palace",
    sport: "Football",
    country: "England",
  },
  {
    id: 6,
    name: "LeBron James",
    score: 30,
    team: "Los Angeles Lakers",
    sport: "Basketball",
    country: "USA",
  },
  {
    id: 7,
    name: "Stephen Curry",
    score: 28,
    team: "Golden State Warriors",
    sport: "Basketball",
    country: "USA",
  },
];

const PlayerListView = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState([]);
  const [selectedSport, setSelectedSport] = React.useState("All");
  const [selectedCountry, setSelectedCountry] = React.useState("All");

  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Assign positions based on sorted order
  const playersWithPosition = sortedPlayers.map((player, index) => ({
    ...player,
    pos: index + 1, // Position is index + 1 (since index starts at 0)
  }));

  // Filter players based on selected sport and country
  const filteredPlayers = playersWithPosition.filter((player) => {
    const matchesSport =
      selectedSport === "All" || player.sport === selectedSport;
    const matchesCountry =
      selectedCountry === "All" || player.country === selectedCountry;
    return matchesSport && matchesCountry;
  });

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="PlayerList-container">
      <Navbar />
      {/* Filter Section */}
      <div className="filterSection">
        <h2>Filters</h2>
        <div className="filterOptions">
          <label>
            Sport:
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
            </select>
          </label>
          <label>
            Country:
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="All">All</option>
              <option value="England">England</option>
              <option value="USA">USA</option>
            </select>
          </label>
        </div>
      </div>

      {/* Top Scorer Section */}
      <div className="topScorerSection">
        <h1 className="topScorerTitle">Top Scorers</h1>
        {filteredPlayers.length > 0 ? (
          <div className="topScorerCard">
            <div
              className="heartIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(filteredPlayers[0].id);
              }}
            >
              <Heart
                className={
                  favorites.includes(filteredPlayers[0].id)
                    ? "heartIconFilled"
                    : "heartIconEmpty"
                }
              />
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/playerProfile/${filteredPlayers[0].id}`)}
            >

                {/* Player Img */}

              <div className="playerImage">
                <img src="player.png" alt="Soccer player" />
              </div>
              <span className="playerPosition">{filteredPlayers[0].pos}</span>
              <h2 className="playerName">{filteredPlayers[0].name}</h2>
              <p className="playerTeam">{filteredPlayers[0].team}</p>
              <div className="playerScore">
                <div className="scoreLabel">Scores</div>
                <div className="scoreValue">{filteredPlayers[0].score}</div>
              </div>
            </div>
          </div>
        ) : (
          <p>No players found for the selected filters.</p>
        )}
      </div>

      {/* Scorers List Section */}
      <div className="scorersListSection">
        <div className="listHeader">
          <div className="listHeaderPos">Pos</div>
          <div className="listHeaderPlayer">Player</div>
          <div className="listHeaderScores">Scores</div>
          <div></div>
        </div>
        {filteredPlayers.slice(1).map((player) => (
          <div key={player.id} className="playerRow">
            <div
              className="playerRowContent"
              onClick={() => navigate(`/playerProfile/${player.id}`)}
            >
              <div className="playerRowPos">{player.pos}</div>
              <div className="playerRowName">{player.name}</div>
              <div className="playerRowScore">{player.score}</div>
            </div>
            <div className="playerRowHeart">
              <Heart
                className={
                  favorites.includes(player.id)
                    ? "heartIconSmall heartIconSmallFilled"
                    : "heartIconSmall heartIconSmallEmpty"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(player.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerListView;