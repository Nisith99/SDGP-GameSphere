import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const players = [
  {
    id: 1,
    pos: 1,
    name: "Jamie Varady",
    score: 12,
    team: "Leicester City",
  },
  {
    id: 2,
    pos: 2,
    name: "Saibo Mane",
    score: 10,
    team: "Liverpool",
  },
  {
    id: 3,
    pos: 3,
    name: "Tammy Abraham",
    score: 9,
    team: "Chelsea",
  },
  {
    id: 4,
    pos: 4,
    name: "Marcus Rashford",
    score: 7,
    team: "Manchester United",
  },
  {
    id: 5,
    pos: 5,
    name: "Saman Kumara",
    score: 6,
    team: "Crystal Palace",
  },
];

const PlayerListView = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState([]); // Removed TypeScript syntax

  const handleToggleFavorite = (id) => {
    // Removed TypeScript syntax
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Top Scorer Section */}
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Top Scorers</h1>
        <div className="bg-gray-200 rounded-xl p-4 relative overflow-hidden">
          <div
            className="absolute top-4 right-4 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(players[0].id);
            }}
          >
            <Heart
              className={`w-6 h-6 cursor-pointer ${
                favorites.includes(players[0].id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }`}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/playerProfile/${players[0].id}`)}
          >
            <div className="absolute right-0 bottom-0">
              <img
                src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                alt="Soccer player"
                className="h-40 object-cover"
              />
            </div>
            <span className="text-4xl font-bold bg-black text-white inline-block px-3 py-1 rounded-lg">
              {players[0].pos}
            </span>
            <h2 className="text-2xl font-bold mt-2">{players[0].name}</h2>
            <p className="text-gray-600">{players[0].team}</p>
            <div className="mt-2">
              <div className="text-sm text-gray-600">Scores</div>
              <div className="text-6xl font-bold text-red-500">
                {players[0].score}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scorers List Section */}
      <div className="px-4">
        <div className="grid grid-cols-12 text-sm text-gray-500 mb-2">
          <div className="col-span-1">Pos</div>
          <div className="col-span-8">Player</div>
          <div className="col-span-2 text-center">Scores</div>
          <div className="col-span-1"></div>
        </div>
        {players.slice(1).map((player) => (
          <div
            key={player.id}
            className="grid grid-cols-12 items-center py-4 border-b"
          >
            <div
              className="col-span-11 grid grid-cols-11 cursor-pointer"
              onClick={() => navigate(`/playerProfile/${player.id}`)}
            >
              <div className="col-span-1">{player.pos}</div>
              <div className="col-span-7">{player.name}</div>
              <div className="col-span-3 text-center font-medium">
                {player.score}
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <Heart
                className={`w-5 h-5 cursor-pointer ${
                  favorites.includes(player.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-300"
                }`}
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