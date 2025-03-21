import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
  });

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/${username}`),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosInstance.put("/users/profile", updatedData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["userProfile", username]);
    },
  });

  if (isLoading || isUserProfileLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="flex justify-center">
            <svg
              className="animate-spin h-12 w-12 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-center mt-4 text-gray-300 font-semibold">
            Loading profile...
          </p>
        </div>
      </div>
    );

  const isOwnProfile = authUser.username === userProfile.data.username;
  const userData = isOwnProfile ? authUser : userProfile.data;

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Header and About */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <ProfileHeader
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <AboutSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>
          </div>

          {/* Right Column: Experience, Education, Skills */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
                Sports Experience
              </h2>
              <ExperienceSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <EducationSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
                Sports Skills & Interests
              </h2>
              <SkillsSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-10 pb-8 bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Help Center
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Privacy & Terms
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Accessibility
            </a>
          </div>
          <p className="text-gray-500">
            GameSphere © {new Date().getFullYear()} | The Ultimate Sports Gaming
            Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
