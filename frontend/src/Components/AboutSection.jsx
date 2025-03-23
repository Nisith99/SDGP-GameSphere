import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData?.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-md p-6 border border-blue-200 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-5 tracking-tight">
        About
      </h2>
      {isOwnProfile ? (
        isEditing ? (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              rows="4"
              placeholder="Tell us about yourself..."
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {userData?.about || "No about info yet."}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p className="text-gray-700 leading-relaxed">
          {userData?.about || "No about info available."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;