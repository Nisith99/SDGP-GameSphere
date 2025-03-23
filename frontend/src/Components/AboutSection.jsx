import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData?.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-blue-700/40 transition-all duration-300 hover:shadow-blue-700/20">
            <h2 className="text-2xl font-bold text-blue-400 mb-5 tracking-tight drop-shadow-md">
        About
      </h2>
      {isOwnProfile ? (
        isEditing ? (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 bg-gray-800/80 border border-blue-600/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              rows="4"
              placeholder="Tell us about yourself..."
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              disabled={isUpdating} 
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              {userData?.about || "No about info yet."}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 drop-shadow-sm"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p className="text-gray-300 leading-relaxed">
          {userData?.about || "No about info available."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;