import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Camera, MapPin, Star } from "lucide-react";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
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
      <div className="relative">
        <img
          src={
            editedData.bannerImg
              ? URL.createObjectURL(editedData.bannerImg)
              : userData.bannerImg || "/banner-placeholder.jpg"
          }
          alt="Banner"
          className="w-full h-56 object-cover"
        />
        {isOwnProfile && isEditing && (
          <div className="absolute top-4 right-4">
            <label className="cursor-pointer bg-gray-900/80 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300">
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

      <div className="p-6 relative">
        <div className="relative -mt-20 mb-6 flex justify-center">
          <img
            src={
              editedData.profilePicture
                ? URL.createObjectURL(editedData.profilePicture)
                : userData.profilePicture || "/avatar.png"
            }
            alt={userData.name}
            className="w-36 h-36 rounded-full border-4 border-gray-900 shadow-lg object-cover"
          />
          {isOwnProfile && isEditing && (
            <label className="absolute bottom-0 right-1/2 translate-x-16 bg-gray-900/80 p-2 rounded-full text-white cursor-pointer hover:bg-gray-700 transition-all duration-300">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profilePicture")}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="text-center space-y-3">
          {isEditing ? (
            <input
              type="text"
              value={editedData.name ?? userData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              className="text-3xl font-bold text-white bg-transparent border-b border-gray-600 focus:border-yellow-500 outline-none w-full text-center transition-all duration-300"
            />
          ) : (
            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={editedData.headline ?? userData.headline}
              onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
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
          </div>
        </div>

        {isOwnProfile && (
          <div className="flex justify-center gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  disabled={isUpdating}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setEditedData({});
                    setIsEditing(false);
                  }}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md"
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