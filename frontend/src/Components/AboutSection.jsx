import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData?.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#F0D3F7] transition-all duration-300 hover:shadow-md">
      <h2 className="text-xl font-semibold text-[#302F4D] mb-4 tracking-tight">
        About
      </h2>
      {isOwnProfile ? (
        isEditing ? (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 bg-white border border-[#B98EA7] rounded-md text-[#302F4D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A57982] transition-all duration-200"
              rows="4"
              placeholder="Tell us about yourself..."
            />
            <button
              onClick={handleSave}
              className="bg-[#A57982] text-white py-2 px-6 rounded-md font-medium hover:bg-[#B98EA7] focus:ring-2 focus:ring-[#A57982] focus:outline-none transition-all duration-300"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              {userData?.about || "No about info yet."}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#302F4D] hover:text-[#A57982] font-medium transition-colors duration-200"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p className="text-gray-600 leading-relaxed">
          {userData?.about || "No about info available."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;