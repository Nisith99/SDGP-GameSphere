import { useState, useEffect } from "react";
import { Camera, MapPin, Star, Users } from "lucide-react"; // Added Users icon for leagues
import axios from "axios";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [userLeagues, setUserLeagues] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("ProfileHeader received userData:", userData);

  useEffect(() => {
    const fetchUserLeagues = async () => {
      if (!userData?._id) return;
      
      try {
        setLoading(true);
        const response = await axios.get('/api/leagues', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const joinedLeagues = response.data.filter(league => {
          return league.membersList.some(memberId => {
            const memberIdStr = typeof memberId === 'object' ? 
              (memberId.toString ? memberId.toString() : String(memberId)) : 
              String(memberId);
            
            const userIdStr = typeof userData._id === 'object' ? 
              (userData._id.toString ? userData._id.toString() : String(userData._id)) : 
              String(userData._id);
            
            return memberIdStr === userIdStr;
          });
        });
        
        setUserLeagues(joinedLeagues);
        console.log("User's leagues:", joinedLeagues);
      } catch (error) {
        console.error("Error fetching user leagues:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserLeagues();
  }, [userData]);

  const handleSaveChanges = () => {
    if (Object.keys(editedData).length === 0) {
      console.log("No changes to save, exiting edit mode");
      setIsEditing(false);
      return;
    }

    const formData = new FormData();
    if (editedData.name) formData.append("name", editedData.name);
    if (editedData.headline) formData.append("headline", editedData.headline);
    if (editedData.location) formData.append("location", editedData.location);
    if (editedData.profilePicture) formData.append("profilePicture", editedData.profilePicture);
    if (editedData.bannerImg) formData.append("bannerImg", editedData.bannerImg);

    console.log("FormData to save:", {
      name: editedData.name,
      headline: editedData.headline,
      location: editedData.location,
      profilePicture: editedData.profilePicture?.name,
      bannerImg: editedData.bannerImg?.name,
    });

    onSave(formData);
    console.log("FormData sent to onSave");
    setEditedData({});
    setIsEditing(false);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`File selected for ${field}:`, file.name, file.size, file.type);
      setEditedData({ ...editedData, [field]: file });
      console.log("Updated editedData with file:", editedData);
    } else {
      console.log(`No file selected for ${field}`);
    }
  };

  const totalScore = userData.achievements?.reduce((sum, ach) => sum + (ach.score || 0), 0) || 0;
  const getRanking = (score) => {
    if (score >= 500) return { label: "Gold", color: "bg-gradient-to-r from-yellow-300 to-yellow-500" };
    if (score >= 250) return { label: "Silver", color: "bg-gradient-to-r from-gray-200 to-gray-400" };
    return { label: "Bronze", color: "bg-gradient-to-r from-orange-500 to-orange-700" };
  };
  const ranking = getRanking(totalScore);

  return (
    <div className="bg-white shadow-sm rounded-lg mb-6">
      <div className="relative">
        <img
          src={
            editedData.bannerImg
              ? URL.createObjectURL(editedData.bannerImg)
              : userData.bannerImg || "/banner-placeholder.jpg"
          }
          alt="Banner"
          className="w-full h-56 object-cover rounded-t-lg"
        />
        {isOwnProfile && isEditing && (
          <div className="absolute top-4 right-4">
            <label className="cursor-pointer bg-white/90 text-gray-700 px-3 py-1 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300">
              Change Banner
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "bannerImg")}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="relative -mt-16 mb-4">
          <img
            src={
              editedData.profilePicture
                ? URL.createObjectURL(editedData.profilePicture)
                : userData.profilePicture || "/avatar.png"
            }
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-white mx-auto shadow-sm"
            onError={(e) => console.log("Profile picture load error:", e.target.src)}
          />
          {isOwnProfile && isEditing && (
            <label className="absolute bottom-0 right-1/2 transform translate-x-16 w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
              <Camera />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profilePicture")}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="text-center mb-4">
            {isEditing ? (
              <input
                type="text"
                value={editedData.name ?? userData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                className="text-2xl font-bold mb-2 text-center w-full bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-2 text-gray-800">{userData.name}</h1>
            )}
            <p className="text-gray-600 mt-1">@{userData.username}</p>
            {isEditing ? (
              <div className="flex items-center justify-center">
                <span className="text-gray-500 mr-2">Player Type:</span>
                <input
                  type="text"
                  value={editedData.headline ?? userData.headline}
                  onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
                  className="text-gray-600 text-center w-full max-w-xs bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
                />
              </div>
            ) : (
              <p className="text-gray-600">
                <span className="text-gray-500 mr-2">Player Type:</span>
                {userData.headline}
              </p>
            )}
          {userData.averageRating > 0 && !isEditing && (
            <div className="flex items-center justify-center mt-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${star <= Math.round(userData.averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-500 text-sm">
                {userData.averageRating.toFixed(1)} ({userData.ratingCount})
              </span>
            </div>
          )}

          <div className="flex justify-center items-center mt-2 space-x-4">
            <div className="flex items-center">
              <MapPin size={16} className="text-gray-500 mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.location ?? userData.location}
                  onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                  className="text-gray-600 text-center bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
                />
              ) : (
                <span className="text-gray-600">{userData.location}</span>
              )}
            </div>
            <span
              className={`${ranking.color} text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm`}
            >
              {ranking.label}
            </span>
          </div>

          {/* Leagues Section with robust ID comparison */}
          {!isEditing && (
            <div className="mt-4">
              <div className="flex items-center justify-center">
                <Users size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-500">Joined Leagues:</span>
              </div>
              {loading ? (
                <p className="text-gray-500 text-sm mt-1">Loading leagues...</p>
              ) : userLeagues.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {userLeagues.map((league) => (
                    <span
                      key={league._id}
                      className="px-3 py-1 rounded-full text-sm shadow-sm text-white"
                      style={{ 
                        backgroundColor: league.color || '#3b82f6',
                      }}
                    >
                      {league.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-1">Not a member of any leagues</p>
              )}
            </div>
          )}
        </div>

        {isOwnProfile && (
          <div className="flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditedData({});
                    setIsEditing(false);
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;