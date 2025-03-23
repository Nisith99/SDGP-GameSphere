import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import ProfileHeader from "../components/ProfileHeader";
import RatingSection from "../components/RatingSection";
import AboutSection from "../components/AboutSection"; // Fixed casing
import AchievementsSection from "../components/AchievementsSection"; // Fixed casing
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => axiosInstance.get("/auth/me").then((res) => res.data),
  });

  const { data: userProfile, isLoading: isProfileLoading, error } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/public/${username}`).then((res) => res.data),
    enabled: !!username,
  });

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      console.log("Sending updated data to server:", updatedData);
      if (updatedData instanceof FormData) {
        for (let [key, value] of updatedData.entries()) {
          console.log(`FormData - ${key}:`, value);
        }
        return axiosInstance.put("/users/profile", updatedData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => res.data);
      }
      return axiosInstance.put("/users/profile", updatedData, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      console.log("Profile update success:", data);
      toast.success("Profile updated successfully");
      const updatedUserData = {
        ...(authUser?.username === username ? authUser : userProfile),
        ...data.user,
      };
      queryClient.setQueryData(["userProfile", username], updatedUserData);
      if (authUser?.username === username) {
        queryClient.setQueryData(["authUser"], updatedUserData);
      }
      queryClient.invalidateQueries(["userProfile", username]);
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      console.error("Update profile error:", {
        message: error.response?.data?.message,
        details: error.response?.data?.details || error.message,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center">
        <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-blue-700/40">
          <div className="flex justify-center">
            <svg className="animate-spin h-14 w-14 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="mt-4 text-center text-blue-300 text-lg font-medium tracking-wide">
            Loading your GameSphere profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center">
        <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-red-700/40">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">
            {error.response?.data?.message || "Unable to load profile"}
          </p>
        </div>
      </div>
    );
  }

  const isOwnProfile = authUser?.username === username;
  const userData = isOwnProfile ? authUser : userProfile;
  console.log("ProfilePage userData:", userData);

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-blue-700/40 hover:shadow-blue-700/20 transition-all duration-300">
              <ProfileHeader
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>
            <RatingSection userData={userData} isOwnProfile={isOwnProfile} />
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-blue-700/40 hover:shadow-blue-700/20 transition-all duration-300">
              <AboutSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                isUpdating={isUpdating} // Pass isUpdating here
              />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-yellow-600/40 hover:shadow-yellow-600/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-green-400 mb-5 tracking-tight drop-shadow-md">
                Achievements
              </h2>
              <AchievementsSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                queryClient={queryClient}
                username={username}
              />
            </div>
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-purple-600/40 hover:shadow-purple-600/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-purple-400 mb-5 tracking-tight drop-shadow-md">
                Education
              </h2>
              <EducationSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                isUpdating={isUpdating} // Pass isUpdating here
              />
            </div>
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-orange-600/40 hover:shadow-orange-600/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-orange-400 mb-5 tracking-tight drop-shadow-md">
                Sports Skills & Interests
              </h2>
              <SkillsSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                isUpdating={isUpdating} // Pass isUpdating here
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-12 py-8 bg-gray-900/95 backdrop-blur-md border-t border-blue-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium drop-shadow-sm">
              Help Center
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium drop-shadow-sm">
              Privacy & Terms
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium drop-shadow-sm">
              Accessibility
            </a>
          </div>
          <p className="text-gray-300">
            GameSphere © {new Date().getFullYear()} |{" "}
            <span className="text-blue-400 font-semibold drop-shadow-md">
              The Ultimate Sports Gaming Platform
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;