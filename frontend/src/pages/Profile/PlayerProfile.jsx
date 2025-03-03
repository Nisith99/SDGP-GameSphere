import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  ChevronDown,
  User,
  Target,
  Settings,
  Bell,
  Eye,
  Moon,
  X,
  Lock,
} from 'lucide-react';

const PlayerProfile = ({
  playerName = "Player Name",
  rating = 7.5,
  location = "Sri Lanka",
  about = "This is a brief description about the player.",
  age = 23,
  position = "Forward",
  achievements = "",
  onAchievementsChange = () => {},
  sportType = "Soccer",
  recentPerformance = "Good",
  participateMatchesCount = 50,
  bestAchievements = "Won the regional championship",
  playerType = "Pro",
  pastClubStatus = "Played for Club A and Club B",
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClubsOpen, setIsClubsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState(playerName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedAbout, setEditedAbout] = useState(about);
  const [editedAge, setEditedAge] = useState(age);
  const [editedPosition, setEditedPosition] = useState(position);
  const [editedSportType, setEditedSportType] = useState(sportType);
  const [editedRecentPerformance, setEditedRecentPerformance] = useState(recentPerformance);
  const [editedParticipateMatchesCount, setEditedParticipateMatchesCount] = useState(participateMatchesCount);
  const [editedBestAchievements, setEditedBestAchievements] = useState(bestAchievements);
  const [editedPlayerType, setEditedPlayerType] = useState(playerType);
  const [editedPastClubStatus, setEditedPastClubStatus] = useState(pastClubStatus);
  const [playerImage, setPlayerImage] = useState("./player.png");

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleClubs = () => setIsClubsOpen(!isClubsOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlayerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Update the state variables directly
    setIsSettingsOpen(false);
    console.log("All changes saved!");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="relative">
          <img
            src={playerImage}
            alt="Player avatar"
            className="w-150 h-150 object-contain mx-auto"
          />
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">{playerName}</h1>
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
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600">{about}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Age: {age} years</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Position: {position}</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Sport Type: {sportType}</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Recent Performance: {recentPerformance}</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Participate Matches Count: {participateMatchesCount}</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Best Achievements: {bestAchievements}</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Player Type: {playerType}</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Past Club Status: {pastClubStatus}</h2>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {isClubsOpen && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-3">
                    {clubsInterested.map((club) => (
                      <div
                        key={club.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="p-2 bg-gray-200 rounded-full">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{club.name}</div>
                          <div className="text-sm text-gray-600">
                            {club.location} • Rating: {club.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              <div className="mb-4">
                <label className="block">
                  <span className="font-semibold mb-2 block">
                    Sports achievements 🏆
                  </span>
                  <textarea
                    value={achievements}
                    onChange={(e) => onAchievementsChange(e.target.value)}
                    className="w-full min-h-[120px] p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors resize-y"
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
              {/* Change Image Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-medium">Change Profile Image</h3>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                />
              </div>

              {/* Username Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-medium">Player Name</h3>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter new player name"
                />
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-medium">Location</h3>
                </div>
                <input
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter new location"
                />
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare size={20} className="text-purple-600" />
                  </div>
                  <h3 className="font-medium">About</h3>
                </div>
                <textarea
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  className="w-full min-h-[120px] p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors resize-y"
                  placeholder="Enter new about text"
                />
              </div>

              {/* Age Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Target size={20} className="text-yellow-600" />
                  </div>
                  <h3 className="font-medium">Age</h3>
                </div>
                <input
                  type="number"
                  value={editedAge}
                  onChange={(e) => setEditedAge(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter new age"
                />
              </div>

              {/* Sport Type Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Target size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-medium">Sport Type</h3>
                </div>
                <input
                  type="text"
                  value={editedSportType}
                  onChange={(e) => setEditedSportType(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter new sport type"
                />
              </div>

              {/* Recent Performance Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target size={20} className="text-purple-600" />
                  </div>
                  <h3 className="font-medium">Recent Performance</h3>
                </div>
                <input
                  type="text"
                  value={editedRecentPerformance}
                  onChange={(e) => setEditedRecentPerformance(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter recent performance"
                />
              </div>

              {/* Participate Matches Count Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-medium">Participate Matches Count</h3>
                </div>
                <input
                  type="number"
                  value={editedParticipateMatchesCount}
                  onChange={(e) => setEditedParticipateMatchesCount(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                  placeholder="Enter participate matches count"
                />
              </div>

              {/* Best Achievements Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-medium">Best Achievements</h3>
                </div>
                <textarea
                  value={editedBestAchievements}
                  onChange={(e) => setEditedBestAchievements(e.target.value)}
                  className="w-full min-h-[120px] p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors resize-y"
                  placeholder="Enter best achievements"
                />
              </div>

              {/* Player Type Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Target size={20} className="text-yellow-600" />
                  </div>
                  <h3 className="font-medium">Player Type</h3>
                </div>
                <select
                  value={editedPlayerType}
                  onChange={(e) => setEditedPlayerType(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Pro">Pro</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {/* Past Club Status Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Target size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-medium">Past Club Status</h3>
                </div>
                <textarea
                  value={editedPastClubStatus}
                  onChange={(e) => setEditedPastClubStatus(e.target.value)}
                  className="w-full min-h-[120px] p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors resize-y"
                  placeholder="Enter past club status"
                />
              </div>

              {/* Change Password Section */}
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
                    className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                    placeholder="Current password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                    placeholder="New password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
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

              {/* Notifications Section */}
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

              {/* Profile Visibility Section */}
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
                  className="p-2 rounded-lg border bg-white outline-none focus:bg-white"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              {/* Dark Mode Section */}
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

export default PlayerProfile;