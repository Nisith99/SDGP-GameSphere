import { Trophy, X } from "lucide-react";
import { useState, useEffect } from "react";

const AchievementsSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState(userData.achievements || []);
  const [newAchievement, setNewAchievement] = useState({
    rankType: "district", // Default to district
    rankValue: "",
    score: 0,
  });
  const [totalScore, setTotalScore] = useState(0);

  // Calculate score based on rank type and value
  const calculateScore = (rankType, rankValue) => {
    const rankNum = parseInt(rankValue) || 999; // Default to low score if invalid
    switch (rankType) {
      case "district":
        if (rankNum === 1) return 100;
        if (rankNum === 2) return 75;
        if (rankNum === 3) return 50;
        return 25; // 4th or lower
      case "island":
        if (rankNum === 1) return 200;
        if (rankNum === 2) return 150;
        if (rankNum === 3) return 100;
        return 50;
      case "province":
        if (rankNum === 1) return 300;
        if (rankNum === 2) return 225;
        if (rankNum === 3) return 150;
        return 75;
      default:
        return 0;
    }
  };

  // Calculate total score whenever achievements change
  useEffect(() => {
    const total = achievements.reduce((sum, ach) => sum + ach.score, 0);
    setTotalScore(total);
  }, [achievements]);

  // Get overall ranking based on total score
  const getRanking = (score) => {
    if (score >= 500) return { label: "Gold", color: "text-yellow-400" };
    if (score >= 250) return { label: "Silver", color: "text-gray-300" };
    return { label: "Bronze", color: "text-orange-600" };
  };

  const handleAddAchievement = () => {
    if (newAchievement.rankValue) {
      const score = calculateScore(newAchievement.rankType, newAchievement.rankValue);
      const achievementWithScore = { ...newAchievement, score, _id: Date.now().toString() }; // Temp ID
      setAchievements([...achievements, achievementWithScore]);
      setNewAchievement({ rankType: "district", rankValue: "", score: 0 });
    }
  };

  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter((ach) => ach._id !== id));
  };

  const handleSaveChanges = () => {
    onSave({ achievements });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-yellow-600/40 hover:shadow-yellow-600/20 transition-all duration-300">
      <h2 className="text-2xl font-bold text-green-400 mb-5 tracking-tight drop-shadow-md">
        Achievements
      </h2>
      <div className="space-y-4">
        {/* Display Achievements */}
        {achievements.length > 0 ? (
          achievements.map((ach) => (
            <div key={ach._id} className="flex justify-between items-start">
              <div className="flex items-start">
                <Trophy size={20} className="mr-2 mt-1 text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-gray-100 capitalize">
                    {ach.rankType} Rank: {ach.rankValue}
                  </h3>
                  <p className="text-gray-400 text-sm">Score: {ach.score}</p>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => handleDeleteAchievement(ach._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No achievements added yet.</p>
        )}

        {/* Total Score and Ranking */}
        {achievements.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-300">
              Total Score: <span className="font-semibold">{totalScore}</span>
            </p>
            <p className="text-lg">
              Overall Ranking:{" "}
              <span className={`${getRanking(totalScore).color} font-bold`}>
                {getRanking(totalScore).label}
              </span>
            </p>
          </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <div className="mt-6">
            <select
              value={newAchievement.rankType}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, rankType: e.target.value })
              }
              className="w-full p-2 border rounded mb-2 bg-gray-800 text-gray-100"
            >
              <option value="district">District Rank</option>
              <option value="island">Island Rank</option>
              <option value="province">Province Rank</option>
            </select>
            <input
              type="number"
              min="1"
              placeholder="Enter rank (e.g., 1, 2, 3)"
              value={newAchievement.rankValue}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, rankValue: e.target.value })
              }
              className="w-full p-2 border rounded mb-2 bg-gray-800 text-gray-100"
            />
            <button
              onClick={handleAddAchievement}
              className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-300"
            >
              Add Achievement
            </button>
          </div>
        )}

        {/* Edit/Save Buttons */}
        {isOwnProfile && (
          <div className="mt-4">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-yellow-400 hover:text-yellow-500 transition duration-300"
              >
                Edit Achievements
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;