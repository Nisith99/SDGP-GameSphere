import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import ProfileHeader from "../components/ProfileHeader";
import RatingSection from "../components/RatingSection";
import AboutSection from "../components/AboutSection";
import AchievementsSection from "../Components/AchievementsSection";
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
      if (updatedData instanceof FormData) {
        return axiosInstance.put("/users/profile", updatedData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => res.data);
      }
      return axiosInstance.put("/users/profile", updatedData, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
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
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F0D3F7] to-[#B98EA7] flex items-center justify-center">
        <div className="bg-white/90 p-8 rounded-xl shadow-md border border-[#F0D3F7]">
          <div className="flex justify-center">
            <svg className="animate-spin h-14 w-14 text-[#302F4D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="mt-4 text-center text-[#302F4D] text-lg font-medium tracking-wide">
            Loading your GameSphere profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F0D3F7] to-[#B98EA7] flex items-center justify-center">
        <div className="bg-white/90 p-8 rounded-xl shadow-md border border-[#A57982]">
          <h2 className="text-xl font-semibold text-[#A57982] mb-4">Error</h2>
          <p className="text-gray-700">
            {error.response?.data?.message || "Unable to load profile"}
          </p>
        </div>
      </div>
    );
  }

  const isOwnProfile = authUser?.username === username;
  const userData = isOwnProfile ? authUser : userProfile;

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffff] via-[#ffff] to-[#B98EA7] text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#F0D3F7] hover:shadow-lg transition-all duration-300">
              <ProfileHeader
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>
            <RatingSection userData={userData} isOwnProfile={isOwnProfile} />
            <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#F0D3F7] hover:shadow-lg transition-all duration-300">
              <AboutSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                isUpdating={isUpdating}
              />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#B98EA7] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#302F4D] mb-5 tracking-tight">
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
            <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#F0D3F7] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#302F4D] mb-5 tracking-tight">
                Education
              </h2>
              <EducationSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                isUpdating={isUpdating}
              />
            </div>
            <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#A57982] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-[#A57982] mb-5 tracking-tight">
                Sports Skills & Interests
              </h2>
              <SkillsSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
                isUpdating={isUpdating}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-12 py-8 bg-white/95 border-t border-[#F0D3F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-[#302F4D] hover:text-[#A57982] transition-colors duration-200 font-medium">
              Help Center
            </a>
            <a href="#" className="text-[#302F4D] hover:text-[#A57982] transition-colors duration-200 font-medium">
              Privacy & Terms
            </a>
            <a href="#" className="text-[#302F4D] hover:text-[#A57982] transition-colors duration-200 font-medium">
              Accessibility
            </a>
          </div>
          <p className="text-gray-700">
            GameSphere © {new Date().getFullYear()} |{" "}
            <span className="text-[#302F4D] font-semibold">
              The Ultimate Sports Gaming Platform
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;