import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData?.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">
        About
      </h2>
      {isOwnProfile ? (
        isEditing ? (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              rows="4"
              placeholder="Tell us about yourself..."
            />
            <button
              onClick={handleSave}
              className="bg-gray-100 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
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
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
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