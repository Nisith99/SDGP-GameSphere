import { useState } from "react";
import { Camera, MapPin, Star } from "lucide-react";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  console.log("ProfileHeader received userData:", userData); // Log incoming userData

  const handleSaveChanges = () => {
    if (Object.keys(editedData).length === 0) {
      console.log("No changes to save, exiting edit mode"); // Log no changes
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
      profilePicture: editedData.profilePicture?.name, // Log file name
      bannerImg: editedData.bannerImg?.name, // Log file name
    }); // Debug log for FormData content

    onSave(formData); // Pass FormData to ProfilePage
    console.log("FormData sent to onSave"); // Confirm send
    setEditedData({});
    setIsEditing(false);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`File selected for ${field}:`, file.name, file.size, file.type); // Log file details
      setEditedData({ ...editedData, [field]: file });
      console.log("Updated editedData with file:", editedData); // Log state update
    } else {
      console.log(`No file selected for ${field}`);
    }
  };

  return (
    <div className="bg-gray shadow rounded-lg mb-6">
      <div className="relative">
        <img
          src={
            editedData.bannerImg
              ? URL.createObjectURL(editedData.bannerImg)
              : userData.bannerImg || "/banner-placeholder.jpg"
          }
          alt="Banner"
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => console.log("Banner image load error:", e.target.src)} // Log image load errors
        />
        {isOwnProfile && isEditing && (
          <div className="absolute top-2 right-2">
            <label className="cursor-pointer bg-gray-800 text-white px-2 py-1 rounded">
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

      <div className="p-4">
        <div className="relative -mt-16 mb-4">
          <img
            src={
              editedData.profilePicture
                ? URL.createObjectURL(editedData.profilePicture)
                : userData.profilePicture || "/avatar.png"
            }
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-white mx-auto"
            onError={(e) => console.log("Profile picture load error:", e.target.src)} // Log image load errors
          />
          {isOwnProfile && isEditing && (
            <label className="absolute bottom-0 right-0 w-8 h-8 text-gray-500 cursor-pointer">
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
              className="text-2xl font-bold mb-2 text-center w-full bg-gray-800 text-white border-none"
            />
          ) : (
            <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={editedData.headline ?? userData.headline}
              onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
              className="text-gray-600 text-center w-full bg-gray-800 text-white border-none"
            />
          ) : (
            <p className="text-gray-600">{userData.headline}</p>
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
                        : "text-gray-400"
                      }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-400 text-sm">
                {userData.averageRating.toFixed(1)} ({userData.ratingCount})
              </span>
            </div>
          )}

          <div className="flex justify-center items-center mt-2">
            <MapPin size={16} className="text-gray-500 mr-1" />
            {isEditing ? (
              <input
                type="text"
                value={editedData.location ?? userData.location}
                onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                className="text-gray-600 text-center bg-gray-800 text-white border-none"
              />
            ) : (
              <span className="text-gray-600">{userData.location}</span>
            )}
          </div>
        </div>

        {isOwnProfile && (
          <div className="flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditedData({});
                    setIsEditing(false);
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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