import { School, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const EducationSection = ({ userData, isOwnProfile, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educations, setEducations] = useState(userData?.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
  });

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
      const tempId = Date.now().toString();
      setEducations([...educations, { ...newEducation, _id: tempId }]);
      setNewEducation({ school: "", fieldOfStudy: "", startYear: "", endYear: "" });
    } else {
      toast.error("Please fill in all required fields (School, Field of Study, Start Year)");
    }
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu._id !== id));
  };

  const handleSave = () => {
    onSave({ education: educations });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-purple-600/40 hover:shadow-purple-600/20 transition-all duration-300">
      {educations.length > 0 ? (
        educations.map((edu) => (
          <div key={edu._id} className="mb-4 flex justify-between items-start">
            <div className="flex items-start">
              <School size={20} className="mr-2 mt-1 text-purple-400" />
              <div>
                <h3 className="font-semibold text-gray-200">{edu.fieldOfStudy}</h3>
                <p className="text-gray-400">{edu.school}</p>
                <p className="text-gray-500 text-sm">
                  {edu.startYear} - {edu.endYear || "Present"}
                </p>
              </div>
            </div>
            {isEditing && (
              <button onClick={() => handleDeleteEducation(edu._id)} className="text-red-500">
                <X size={20} />
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No education added yet.</p>
      )}
      {isEditing && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="School *"
            value={newEducation.school}
            onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-purple-600/50 rounded text-gray-200"
          />
          <input
            type="text"
            placeholder="Field of Study *"
            value={newEducation.fieldOfStudy}
            onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-purple-600/50 rounded text-gray-200"
          />
          <input
            type="number"
            placeholder="Start Year *"
            value={newEducation.startYear}
            onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-purple-600/50 rounded text-gray-200"
          />
          <input
            type="number"
            placeholder="End Year"
            value={newEducation.endYear}
            onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-purple-600/50 rounded text-gray-200"
          />
          <button
            onClick={handleAddEducation}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
          >
            Add Education
          </button>
        </div>
      )}
      {isOwnProfile && (
        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
              disabled={isUpdating} // Now defined via props
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-purple-400 hover:text-purple-300 transition duration-300"
            >
              Edit Education
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationSection;