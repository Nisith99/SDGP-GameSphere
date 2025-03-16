import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
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
import './PlayerProfile.css'; // Import the CSS file

const PlayerProfile = () => {
  const [playerData, setPlayerData] = useState({
    playerName: "",
    rating: 0,
    location: "",
    about: "",
    age: 0,
    position: "",
    achievements: "",
    sportType: "",
    recentPerformance: "",
    participateMatchesCount: 0,
    bestAchievements: "",
    playerType: "",
    pastClubStatus: "",
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [isClubsOpen, setIsClubsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [playerImage, setPlayerImage] = useState("./player.png");

  useEffect(() => {
    // Fetch player data from the backend
    fetch('http://localhost:3000/api/player')
      .then(response => response.json())
      .then(data => {
        setPlayerData(data);
        setUsername(data.playerName);
      })
      .catch(error => console.error('Error fetching player data:', error));
  }, []);

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
    setIsSettingsOpen(false);
    console.log("All changes saved!");
  };

  return (
    <>
      <Navbar />
      <div className="player-profile-container">
        <div className="relative">
          <img
            src={playerImage}
            alt="Player avatar"
            className="player-avatar"
          />
          <div className="player-header">
            <div>
              <h1 className="player-name">{playerData.playerName}</h1>
              <p className="player-location">{playerData.location}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rating-container">
                <div className="rating-value">{playerData.rating}</div>
                <div className="rating-label">Ratings</div>
              </div>
              <button className="message-button">
                <MessageSquare size={18} />
                Message
              </button>
              <button
                onClick={toggleFavorite}
                className={`favorite-button ${isFavorite ? 'active' : ''}`}
                aria-label={`${isFavorite ? "Remove from favorites" : "Add to favorites"}`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={toggleSettings}
                className="settings-button"
                aria-label="Open settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="info-section">
              <h2>About</h2>
              <p>{playerData.about}</p>
            </div>
            <div className="info-section">
              <h2>Age: {playerData.age} years</h2>
            </div>
            <div className="info-section">
              <h2>Position: {playerData.position}</h2>
            </div>
            <div className="info-section">
              <h2>Sport Type: {playerData.sportType}</h2>
            </div>
            <div className="info-section">
              <h2>Recent Performance: {playerData.recentPerformance}</h2>
            </div>
            <div className="info-section">
              <h2>Participate Matches Count: {playerData.participateMatchesCount}</h2>
            </div>
            <div className="info-section">
              <h2>Best Achievements: {playerData.bestAchievements}</h2>
            </div>
            <div className="info-section">
              <h2>Player Type: {playerData.playerType}</h2>
            </div>
            <div className="info-section">
              <h2>Past Club Status: {playerData.pastClubStatus}</h2>
            </div>
            <div className="info-section">
              <h2>Achievements</h2>
              <div className="mb-4">
                <label>
                  <span>Sports achievements 🏆</span>
                  <textarea
                    value={playerData.achievements}
                    onChange={(e) => setPlayerData({ ...playerData, achievements: e.target.value })}
                    className="textarea-field"
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
        <div className="settings-modal">
          <div className="settings-content">
            <div className="settings-header">
              <h2>Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="close-button"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>
            <div className="settings-body">
              {/* Change Image Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3>Change Profile Image</h3>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input-field"
                />
              </div>

              {/* Username Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3>Player Name</h3>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                  placeholder="Enter new player name"
                />
              </div>

              {/* Location Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye size={20} className="text-blue-600" />
                  </div>
                  <h3>Location</h3>
                </div>
                <input
                  type="text"
                  value={playerData.location}
                  onChange={(e) => setPlayerData({ ...playerData, location: e.target.value })}
                  className="input-field"
                  placeholder="Enter new location"
                />
              </div>

              {/* About Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare size={20} className="text-purple-600" />
                  </div>
                  <h3>About</h3>
                </div>
                <textarea
                  value={playerData.about}
                  onChange={(e) => setPlayerData({ ...playerData, about: e.target.value })}
                  className="textarea-field"
                  placeholder="Enter new about text"
                />
              </div>

              {/* Age Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Target size={20} className="text-yellow-600" />
                  </div>
                  <h3>Age</h3>
                </div>
                <input
                  type="number"
                  value={playerData.age}
                  onChange={(e) => setPlayerData({ ...playerData, age: e.target.value })}
                  className="input-field"
                  placeholder="Enter new age"
                />
              </div>

              {/* Sport Type Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Target size={20} className="text-red-600" />
                  </div>
                  <h3>Sport Type</h3>
                </div>
                <input
                  type="text"
                  value={playerData.sportType}
                  onChange={(e) => setPlayerData({ ...playerData, sportType: e.target.value })}
                  className="input-field"
                  placeholder="Enter new sport type"
                />
              </div>

              {/* Recent Performance Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target size={20} className="text-purple-600" />
                  </div>
                  <h3>Recent Performance</h3>
                </div>
                <input
                  type="text"
                  value={playerData.recentPerformance}
                  onChange={(e) => setPlayerData({ ...playerData, recentPerformance: e.target.value })}
                  className="input-field"
                  placeholder="Enter recent performance"
                />
              </div>

              {/* Participate Matches Count Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target size={20} className="text-blue-600" />
                  </div>
                  <h3>Participate Matches Count</h3>
                </div>
                <input
                  type="number"
                  value={playerData.participateMatchesCount}
                  onChange={(e) => setPlayerData({ ...playerData, participateMatchesCount: e.target.value })}
                  className="input-field"
                  placeholder="Enter participate matches count"
                />
              </div>

              {/* Best Achievements Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target size={20} className="text-green-600" />
                  </div>
                  <h3>Best Achievements</h3>
                </div>
                <textarea
                  value={playerData.bestAchievements}
                  onChange={(e) => setPlayerData({ ...playerData, bestAchievements: e.target.value })}
                  className="textarea-field"
                  placeholder="Enter best achievements"
                />
              </div>

              {/* Player Type Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Target size={20} className="text-yellow-600" />
                  </div>
                  <h3>Player Type</h3>
                </div>
                <select
                  value={playerData.playerType}
                  onChange={(e) => setPlayerData({ ...playerData, playerType: e.target.value })}
                  className="input-field"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Pro">Pro</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {/* Past Club Status Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Target size={20} className="text-red-600" />
                  </div>
                  <h3>Past Club Status</h3>
                </div>
                <textarea
                  value={playerData.pastClubStatus}
                  onChange={(e) => setPlayerData({ ...playerData, pastClubStatus: e.target.value })}
                  className="textarea-field"
                  placeholder="Enter past club status"
                />
              </div>

              {/* Change Password Section */}
              <div className="settings-section">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Lock size={20} className="text-red-600" />
                  </div>
                  <h3>Change Password</h3>
                </div>
                <div className="space-y-3">
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                    placeholder="Current password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                    placeholder="New password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    placeholder="Confirm new password"
                  />
                  <label className="password-toggle">
                    <input
                      type="checkbox"
                      checked={showPasswords}
                      onChange={(e) => setShowPasswords(e.target.checked)}
                    />
                    Show passwords
                  </label>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="settings-section">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Bell size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3>Notifications</h3>
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
              </div>

              {/* Profile Visibility Section */}
              <div className="settings-section">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Eye size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3>Profile Visibility</h3>
                      <p className="text-sm text-gray-600">
                        Control who can see your profile
                      </p>
                    </div>
                  </div>
                  <select
                    value={profileVisibility}
                    onChange={(e) => setProfileVisibility(e.target.value)}
                    className="input-field"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              {/* Dark Mode Section */}
              <div className="settings-section">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Moon size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <h3>Dark Mode</h3>
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
            </div>
            <div className="p-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={handleSave}
                className="save-button"
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