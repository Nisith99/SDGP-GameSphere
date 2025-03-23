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
    <div className="bg-white/90 rounded-xl shadow-md p-6 border border-[#F0D3F7] hover:shadow-lg transition-all duration-300">
      {educations.length > 0 ? (
        educations.map((edu) => (
          <div key={edu._id} className="mb-4 flex justify-between items-start">
            <div className="flex items-start">
              <School size={20} className="mr-2 mt-1 text-[#302F4D]" />
              <div>
                <h3 className="font-semibold text-[#302F4D]">{edu.fieldOfStudy}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-gray-500 text-sm">
                  {edu.startYear} - {edu.endYear || "Present"}
                </p>
              </div>
            </div>
            {isEditing && (
              <button onClick={() => handleDeleteEducation(edu._id)} className="text-[#A57982]">
                <X size={20} />
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No education added yet.</p>
      )}
      {isEditing && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="School *"
            value={newEducation.school}
            onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
            className="w-full p-2 bg-[#F0D3F7]/30 border border-[#B98EA7] rounded text-[#302F4D]"
          />
          <input
            type="text"
            placeholder="Field of Study *"
            value={newEducation.fieldOfStudy}
            onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
            className="w-full p-2 bg-[#F0D3F7]/30 border border-[#B98EA7] rounded text-[#302F4D]"
          />
          <input
            type="number"
            placeholder="Start Year *"
            value={newEducation.startYear}
            onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
            className="w-full p-2 bg-[#F0D3F7]/30 border border-[#B98EA7] rounded text-[#302F4D]"
          />
          <input
            type="number"
            placeholder="End Year"
            value={newEducation.endYear}
            onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
            className="w-full p-2 bg-[#F0D3F7]/30 border border-[#B98EA7] rounded text-[#302F4D]"
          />
          <button
            onClick={handleAddEducation}
            className="bg-[#302F4D] text-white py-2 px-4 rounded hover:bg-[#A57982] transition duration-300"
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
              className="bg-[#302F4D] text-white py-2 px-4 rounded hover:bg-[#A57982] transition duration-300"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#302F4D] hover:text-[#A57982] transition duration-300"
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