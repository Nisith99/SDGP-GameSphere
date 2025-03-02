import React, { useState } from "react";
import {
  MessageSquare,
  Heart,
  ChevronDown,
  User,
  Star,
  Trophy,
  Target,
  Settings,
  Bell,
  Eye,
  Moon,
  X,
  Lock,
} from "lucide-react";

export const Profile = ({
  clubName = "Club Name",
  rating = 8.9,
  location = "Sri Lanka",
  ageRange = { min: 17, max: 35 },
  opportunities = [
    {
      id: 1,
      title: "Professional Training",
      description: "Access to professional training facilities and experienced coaches",
      icon: "star",
    },
    {
      id: 2,
      title: "Tournament Participation",
      description: "Opportunity to participate in national and international tournaments",
      icon: "trophy",
    },
    {
      id: 3,
      title: "Career Development",
      description: "Career guidance and development programs for aspiring professional players",
      icon: "target",
    },
  ],
  achievements = "",
  onAchievementsChange = () => {},
  players = [
    { id: 1, name: "John Smith", position: "Forward", age: 23 },
    { id: 2, name: "David Wilson", position: "Midfielder", age: 25 },
    { id: 3, name: "Michael Brown", position: "Defender", age: 22 },
    { id: 4, name: "Robert Taylor", position: "Goalkeeper", age: 28 },
  ],
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState(clubName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const togglePlayers = () => setIsPlayersOpen(!isPlayersOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const getOpportunityIcon = (iconName) => {
    switch (iconName) {
      case "star":
        return <Star className="text-yellow-500" size={24} />;
      case "trophy":
        return <Trophy className="text-blue-500" size={24} />;
      case "target":
        return <Target className="text-green-500" size={24} />;
      default:
        return <Star className="text-yellow-500" size={24} />;
    }
  };

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setIsSettingsOpen(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="relative">
          <div className="bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg h-48 w-full mb-4">
            <img
              src="https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/files/d2358626-a3e5-4a6c-ad1a-971a406db581/Sport_club.jpg"
              alt="Club logo"
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">{clubName}</h1>
              <p className="text-gray-600">{location}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{rating}</div>
                <div className="text-sm text-gray-600">Ratings</div>
              </div>
              <button className="flex items-center gap-2 bg-black hover:bg-gray-800 transition-colors text-white px-8 py-3 rounded-lg font-medium">
                <MessageSquare size={18} />
                Message
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full border hover:bg-gray-50 transition-colors ${
                  isFavorite ? "border-red-500 text-red-500" : "border-gray-300"
                }`}
                aria-label={`${
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={toggleSettings}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Open settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">
                Age Range: {ageRange.min}yr - {ageRange.max}yr
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button
                onClick={togglePlayers}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                aria-expanded={isPlayersOpen}
              >
                <h2 className="text-lg font-semibold">Our current players</h2>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-200 ${
                    isPlayersOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isPlayersOpen && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-3">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="p-2 bg-gray-200 rounded-full">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-gray-600">
                            {player.position} • {player.age} years
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-6">Opportunities</h2>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {getOpportunityIcon(opportunity.icon)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600">{opportunity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Requirements</h2>
              <div className="mb-4">
                <label className="block">
                  <span className="font-semibold mb-2 block">
                    Sports achievements 🏆
                  </span>
                  <textarea
                    value={achievements}
                    onChange={(e) => onAchievementsChange(e.target.value)}
                    className="w-full min-h-[120px] p-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors resize-y"
                    placeholder="Enter your sports achievements..."
                    aria-label="Sports achievements"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-medium">Club Name</h3>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter new club name"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Lock size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-medium">Change Password</h3>
                </div>
                <div className="space-y-3">
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                    placeholder="Current password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                    placeholder="New password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                    placeholder="Confirm new password"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={showPasswords}
                      onChange={(e) => setShowPasswords(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    Show passwords
                  </label>
                </div>
              </div>
              <div className="border-t -mx-4 my-6"></div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Bell size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-600">
                      Receive alerts and updates
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-gray-600">
                      Control who can see your profile
                    </p>
                  </div>
                </div>
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="p-2 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Moon size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Toggle dark theme</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                </label>
              </div>
            </div>
            <div className="p-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={handleSave}
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};