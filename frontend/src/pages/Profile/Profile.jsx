import Navbar from "../../Components/Navbar";
import React, { useState } from "react";
import { Footer } from "../../Components/footer";
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
import "./Profile.css"; // Import the CSS file

export const Profile = ({
  clubName = "Club Name",
  rating = 8.9,
  location = "Sri Lanka",
  about = "This is a brief description about the club.",
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
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedAbout, setEditedAbout] = useState(about);
  const [editedAgeRange, setEditedAgeRange] = useState(ageRange);
  const [clubLogo, setClubLogo] = useState("./soccer.png");

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClubLogo(reader.result);
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
      <div className="profile-container">
        <div className="relative">
          <img
            src={clubLogo}
            alt="Club logo"
            className="club-logo"
          />
          <div className="header">
            <div>
              <h1 className="club-name">{clubName}</h1>
              <p className="location">{location}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="rating">{rating}</div>
                <div className="rating-label">Ratings</div>
              </div>
              <button className="button">
                <MessageSquare size={18} />
                Message
              </button>
              <button
                onClick={toggleFavorite}
                className={`favorite-button ${isFavorite ? "active" : ""}`}
                aria-label={`${
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }`}
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
            <div className="section">
              <h2 className="section-title">About</h2>
              <p className="section-content">{about}</p>
            </div>
            <div className="section">
              <h2 className="section-title">
                Age Range: {ageRange.min}yr - {ageRange.max}yr
              </h2>
            </div>
            <div className="section">
              <button
                onClick={togglePlayers}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                aria-expanded={isPlayersOpen}
              >
                <h2 className="section-title">Our current players</h2>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-200 ${
                    isPlayersOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isPlayersOpen && (
                <div className="border-t border-gray-200 p-4">
                  <div className="players-list">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="player-item"
                      >
                        <div className="player-icon">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="player-name">{player.name}</div>
                          <div className="player-details">
                            {player.position} • {player.age} years
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="section">
              <h2 className="section-title">Opportunities</h2>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="opportunity-item"
                  >
                    <div className="opportunity-icon">
                      {getOpportunityIcon(opportunity.icon)}
                    </div>
                    <div>
                      <h3 className="opportunity-title">{opportunity.title}</h3>
                      <p className="opportunity-description">{opportunity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="section">
              <h2 className="section-title">Requirements</h2>
              <div className="mb-4">
                <label className="block">
                  <span className="font-semibold mb-2 block">
                    Sports achievements 🏆
                  </span>
                  <textarea
                    value={achievements}
                    onChange={(e) => onAchievementsChange(e.target.value)}
                    className="requirements-textarea"
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
              <h2 className="settings-title">Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="close-button"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>
            <div className="settings-body">
              {/* Change Club Logo Section */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <div className="settings-section-icon green">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-medium">Change Club Logo</h3>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="settings-input"
                />
              </div>

              {/* Club Name Section */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <div className="settings-section-icon green">
                    <User size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-medium">Club Name</h3>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="settings-input"
                  placeholder="Enter new club name"
                />
              </div>

              {/* Location Section */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <div className="settings-section-icon blue">
                    <Eye size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-medium">Location</h3>
                </div>
                <input
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="settings-input"
                  placeholder="Enter new location"
                />
              </div>

              {/* About Section */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <div className="settings-section-icon purple">
                    <MessageSquare size={20} className="text-purple-600" />
                  </div>
                  <h3 className="font-medium">About</h3>
                </div>
                <textarea
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  className="settings-textarea"
                  placeholder="Enter new about text"
                />
              </div>

              {/* Age Range Section */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <div className="settings-section-icon yellow">
                    <Target size={20} className="text-yellow-600" />
                  </div>
                  <h3 className="font-medium">Age Range</h3>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={editedAgeRange.min}
                    onChange={(e) =>
                      setEditedAgeRange({
                        ...editedAgeRange,
                        min: parseInt(e.target.value),
                      })
                    }
                    className="settings-input"
                    placeholder="Min age"
                  />
                  <input
                    type="number"
                    value={editedAgeRange.max}
                    onChange={(e) =>
                      setEditedAgeRange({
                        ...editedAgeRange,
                        max: parseInt(e.target.value),
                      })
                    }
                    className="settings-input"
                    placeholder="Max age"
                  />
                </div>
              </div>

              {/* Change Password Section */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <div className="settings-section-icon red">
                    <Lock size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-medium">Change Password</h3>
                </div>
                <div className="space-y-3">
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="settings-input"
                    placeholder="Current password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="settings-input"
                    placeholder="New password"
                  />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="settings-input"
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
              <div className="settings-toggle">
                <div className="settings-toggle-label">
                  <div className="settings-toggle-icon purple">
                    <Bell size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-600">
                      Receive alerts and updates
                    </p>
                  </div>
                </div>
                <label className="settings-toggle-switch">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>

              {/* Profile Visibility Section */}
              <div className="settings-toggle">
                <div className="settings-toggle-label">
                  <div className="settings-toggle-icon blue">
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
                  className="settings-input"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              {/* Dark Mode Section */}
              <div className="settings-toggle">
                <div className="settings-toggle-label">
                  <div className="settings-toggle-icon yellow">
                    <Moon size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Toggle dark theme</p>
                  </div>
                </div>
                <label className="settings-toggle-switch">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                  <div className="settings-toggle-slider"></div>
                </label>
              </div>
            </div>
            <div className="settings-footer">
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
      <Footer />
    </>
  );
};