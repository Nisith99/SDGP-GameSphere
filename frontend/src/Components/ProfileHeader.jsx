import { useState } from "react";
import { Camera, MapPin, Star } from "lucide-react";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
<<<<<<< HEAD
  const queryClient = useQueryClient();

  const { data: ratingData } = useQuery({
    queryKey: ["userRatings", userData.username],
    queryFn: () => axiosInstance.get(`/users/ratings/${userData.username}`).then((res) => res.data),
    enabled: !!userData.username,
  });

  const averageRating = ratingData?.averageRating || 0;
  const ratingCount = ratingData?.ratingCount || 0;

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.put("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      const updatedUserData = { ...userData, ...data.user };
      queryClient.setQueryData(["userProfile", userData.username], updatedUserData);
      queryClient.setQueryData(["authUser"], updatedUserData);
      queryClient.invalidateQueries(["userProfile", userData.username]);
      setEditedData({});
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Update profile error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSaveChanges = () => {
    if (Object.keys(editedData).length === 0) {
      setIsEditing(false);
      return;
    }
    const formData = new FormData();
    if (editedData.name) formData.append("name", editedData.name);
    if (editedData.headline) formData.append("headline", editedData.headline);
    if (editedData.location) formData.append("location", editedData.location);
    if (editedData.profilePicture) formData.append("profilePicture", editedData.profilePicture);
    if (editedData.bannerImg) formData.append("bannerImg", editedData.bannerImg);
    updateProfile(formData);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setEditedData({ ...editedData, [field]: file });
    }
  };

  // Calculate overall ranking from achievements
  const totalScore = userData.achievements?.reduce((sum, ach) => sum + (ach.score || 0), 0) || 0;
  const getRanking = (score) => {
    if (score >= 500) return { label: "Gold", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" };
    if (score >= 250) return { label: "Silver", color: "bg-gradient-to-r from-gray-300 to-gray-500" };
    return { label: "Bronze", color: "bg-gradient-to-r from-orange-600 to-orange-800" };
  };
  const ranking = getRanking(totalScore);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl mb-8 overflow-hidden border border-gray-700/50">
=======

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
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
      <div className="relative">
        <img
          src={
            editedData.bannerImg
              ? URL.createObjectURL(editedData.bannerImg)
              : userData.bannerImg || "/banner-placeholder.jpg"
          }
          alt="Banner"
<<<<<<< HEAD
          className="w-full h-56 object-cover"
        />
        {isOwnProfile && isEditing && (
          <div className="absolute top-4 right-4">
            <label className="cursor-pointer bg-gray-900/80 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300">
=======
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => console.log("Banner image load error:", e.target.src)} // Log image load errors
        />
        {isOwnProfile && isEditing && (
          <div className="absolute top-2 right-2">
            <label className="cursor-pointer bg-gray-800 text-white px-2 py-1 rounded">
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
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

<<<<<<< HEAD
      <div className="p-6 relative">
        <div className="relative -mt-20 mb-6 flex justify-center">
=======
      <div className="p-4">
        <div className="relative -mt-16 mb-4">
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
          <img
            src={
              editedData.profilePicture
                ? URL.createObjectURL(editedData.profilePicture)
                : userData.profilePicture || "/avatar.png"
            }
            alt={userData.name}
<<<<<<< HEAD
            className="w-36 h-36 rounded-full border-4 border-gray-900 shadow-lg object-cover"
          />
          {isOwnProfile && isEditing && (
            <label className="absolute bottom-0 right-1/2 translate-x-16 bg-gray-900/80 p-2 rounded-full text-white cursor-pointer hover:bg-gray-700 transition-all duration-300">
              <Camera size={20} />
=======
            className="w-32 h-32 rounded-full border-4 border-white mx-auto"
            onError={(e) => console.log("Profile picture load error:", e.target.src)} // Log image load errors
          />
          {isOwnProfile && isEditing && (
            <label className="absolute bottom-0 right-0 w-8 h-8 text-gray-500 cursor-pointer">
              <Camera />
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profilePicture")}
                className="hidden"
              />
            </label>
          )}
        </div>

<<<<<<< HEAD
        <div className="text-center space-y-3">
=======
        <div className="text-center mb-4">
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
          {isEditing ? (
            <input
              type="text"
              value={editedData.name ?? userData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
<<<<<<< HEAD
              className="text-3xl font-bold text-white bg-transparent border-b border-gray-600 focus:border-yellow-500 outline-none w-full text-center transition-all duration-300"
            />
          ) : (
            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
=======
              className="text-2xl font-bold mb-2 text-center w-full bg-gray-800 text-white border-none"
            />
          ) : (
            <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
          )}

          {isEditing ? (
            <input
              type="text"
              value={editedData.headline ?? userData.headline}
              onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
<<<<<<< HEAD
              className="text-gray-400 bg-transparent border-b border-gray-600 focus:border-yellow-500 outline-none w-full text-center transition-all duration-300"
            />
          ) : (
            <p className="text-gray-400 text-lg">{userData.headline}</p>
          )}

          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={`${
                    star <= Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {averageRating.toFixed(1)} ({ratingCount} {ratingCount === 1 ? "rating" : "ratings"})
            </span>
          </div>

          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center">
              <MapPin size={18} className="text-gray-500 mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.location ?? userData.location}
                  onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                  className="text-gray-400 bg-transparent border-b border-gray-600 focus:border-yellow-500 outline-none text-center transition-all duration-300"
                />
              ) : (
                <span className="text-gray-400">{userData.location}</span>
              )}
            </div>
            <span
              className={`${ranking.color} text-white px-3 py-1 rounded-full text-sm font-medium shadow-md`}
            >
              {ranking.label}
            </span>
=======
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
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
          </div>
        </div>

        {isOwnProfile && (
<<<<<<< HEAD
          <div className="flex justify-center gap-4 mt-6">
=======
          <div className="flex justify-center gap-4">
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
<<<<<<< HEAD
                  disabled={isUpdating}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save"}
=======
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
                </button>
                <button
                  onClick={() => {
                    setEditedData({});
                    setIsEditing(false);
                  }}
<<<<<<< HEAD
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md"
=======
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
<<<<<<< HEAD
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md"
=======
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
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