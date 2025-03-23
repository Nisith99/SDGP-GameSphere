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
    if (score >= 500) return { label: "Gold", color: "bg-gradient-to-r from-[#B98EA7] to-[#A57982]" };
    if (score >= 250) return { label: "Silver", color: "bg-gradient-to-r from-gray-200 to-gray-400" };
    return { label: "Bronze", color: "bg-gradient-to-r from-[#F0D3F7] to-[#B98EA7]" };
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
    formData.append("achievements", JSON.stringify(achievements));
    onSave(formData);
    if (queryClient) {
      queryClient.invalidateQueries(["userProfile", username]);
      queryClient.invalidateQueries(["authUser"]);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {achievements.length > 0 ? (
        achievements.map((ach) => (
          <div
            key={ach._id}
            className="flex justify-between items-center bg-[#F0D3F7]/30 p-4 rounded-xl border border-[#B98EA7] hover:bg-[#F0D3F7]/50 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <Trophy size={24} className="text-[#A57982] animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold text-[#302F4D] capitalize">
                  {ach.rankType} Rank: {ach.rankValue}
                </h3>
                <p className="text-sm text-gray-600">
                  Score: <span className="font-medium text-[#A57982]">{ach.score}</span>
                </p>
              </div>
            </div>
            {isEditing && (
              <button
                onClick={() => handleDeleteAchievement(ach._id)}
                className="text-[#A57982] hover:text-[#302F4D] transition-colors duration-200"
              >
                <X size={24} />
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center italic">No achievements to showcase yet.</p>
      )}

      {achievements.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-br from-[#F0D3F7]/30 to-[#B98EA7]/10 rounded-xl border border-[#B98EA7]">
          <p className="text-[#302F4D] text-lg">
            Total Score: <span className="font-bold text-[#A57982]">{totalScore}</span>
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
              className="w-full p-3 bg-[#F0D3F7]/30 text-[#302F4D] border border-[#B98EA7] rounded-lg appearance-none focus:ring-2 focus:ring-[#A57982] focus:outline-none hover:bg-[#F0D3F7]/50 transition-all duration-300 cursor-pointer"
            >
              <option value="district">District Rank</option>
              <option value="island">Island Rank</option>
              <option value="province">Province Rank</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#302F4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full p-3 bg-[#F0D3F7]/30 text-[#302F4D] border border-[#B98EA7] rounded-lg focus:ring-2 focus:ring-[#A57982] focus:outline-none placeholder-gray-400 transition-all duration-300"
          />
          <button
            onClick={handleAddAchievement}
            className="w-full bg-gradient-to-r from-[#302F4D] to-[#A57982] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#A57982] hover:to-[#302F4D] transition-all duration-300 shadow-md"
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
              className="w-full bg-gradient-to-r from-[#302F4D] to-[#A57982] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#A57982] hover:to-[#302F4D] transition-all duration-300 shadow-md"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-transparent text-[#302F4D] py-2 px-6 rounded-lg font-semibold border border-[#B98EA7] hover:bg-[#B98EA7] hover:text-white transition-all duration-300"
            >
              Edit Achievements
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;