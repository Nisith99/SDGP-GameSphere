import { Trophy, X } from "lucide-react";
import { useState, useEffect } from "react";

const AchievementsSection = ({ userData, isOwnProfile, onSave, queryClient, username }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState(userData.achievements || []);
  const [newAchievement, setNewAchievement] = useState({
    rankType: "district",
    rankValue: "",
    score: 0,
  });
  const [totalScore, setTotalScore] = useState(0);

  const calculateScore = (rankType, rankValue) => {
    const rankNum = parseInt(rankValue) || 999;
    switch (rankType) {
      case "district":
        if (rankNum === 1) return 100;
        if (rankNum === 2) return 75;
        if (rankNum === 3) return 50;
        return 25;
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

  useEffect(() => {
    const total = achievements.reduce((sum, ach) => sum + ach.score, 0);
    setTotalScore(total);
  }, [achievements]);

  const getRanking = (score) => {
    if (score >= 500) return { label: "Gold", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" };
    if (score >= 250) return { label: "Silver", color: "bg-gradient-to-r from-gray-300 to-gray-500" };
    return { label: "Bronze", color: "bg-gradient-to-r from-orange-600 to-orange-800" };
  };

  const handleAddAchievement = () => {
    if (newAchievement.rankValue) {
      const score = calculateScore(newAchievement.rankType, newAchievement.rankValue);
      const achievementWithScore = { ...newAchievement, score, _id: Date.now().toString() };
      setAchievements([...achievements, achievementWithScore]);
      setNewAchievement({ rankType: "district", rankValue: "", score: 0 });
    }
  };

  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter((ach) => ach._id !== id));
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    console.log("Achievements before saving:", achievements);
    formData.append("achievements", JSON.stringify(achievements));
    for (let [key, value] of formData.entries()) {
      console.log(`FormData - ${key}:`, value);
    }
    onSave(formData);
    if (queryClient) {
      queryClient.invalidateQueries(["userProfile", username]);
      queryClient.invalidateQueries(["authUser"]);
    }
    setIsEditing(false);
  };

  
  return (
    <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-yellow-500/30 hover:shadow-yellow-500/10 transition-all duration-500 transform hover:-translate-y-1">
      <h2 className="text-3xl font-extrabold text-green-400 mb-6 tracking-wide drop-shadow-lg">
        Achievements
      </h2>
      <div className="space-y-6">
        {achievements.length > 0 ? (
          achievements.map((ach) => (
            <div
              key={ach._id}
              className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <Trophy size={24} className="text-yellow-500 animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 capitalize">
                    {ach.rankType} Rank: {ach.rankValue}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Score: <span className="font-medium text-yellow-400">{ach.score}</span>
                  </p>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => handleDeleteAchievement(ach._id)}
                  className="text-red-500 hover:text-red-400 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">No achievements to showcase yet.</p>
        )}

        {achievements.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20">
            <p className="text-gray-200 text-lg">
              Total Score: <span className="font-bold text-yellow-400">{totalScore}</span>
            </p>
            <p className="text-xl mt-2">
              Overall Ranking:{" "}
              <span
                className={`${getRanking(totalScore).color} text-white px-3 py-1 rounded-full font-semibold inline-block shadow-md`}
              >
                {getRanking(totalScore).label}
              </span>
            </p>
          </div>
        )}

        {isEditing && (
          <div className="mt-6 space-y-4">
            <div className="relative">
              <select
                value={newAchievement.rankType}
                onChange={(e) => setNewAchievement({ ...newAchievement, rankType: e.target.value })}
                className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-yellow-500 focus:outline-none hover:bg-gray-700 transition-all duration-300 cursor-pointer"
              >
                <option value="district">District Rank</option>
                <option value="island">Island Rank</option>
                <option value="province">Province Rank</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <input
              type="number"
              min="1"
              placeholder="Enter rank (e.g., 1, 2, 3)"
              value={newAchievement.rankValue}
              onChange={(e) => setNewAchievement({ ...newAchievement, rankValue: e.target.value })}
              className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none placeholder-gray-500 transition-all duration-300"
            />
            <button
              onClick={handleAddAchievement}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              Add Achievement
            </button>
          </div>
        )}

        {isOwnProfile && (
          <div className="mt-6">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-transparent text-yellow-400 py-2 px-6 rounded-lg font-semibold border border-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
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