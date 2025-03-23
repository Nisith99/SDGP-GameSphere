import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SkillsSection = ({ userData, isOwnProfile, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    } else if (!newSkill) {
      toast.error("Please enter a skill");
    } else {
      toast.error("Skill already exists");
    }
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave({ skills });
    setIsEditing(false);
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-md p-6 border border-orange-200 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {skill}
              {isEditing && (
                <button onClick={() => handleDeleteSkill(skill)} className="ml-2 text-red-600">
                  <X size={14} />
                </button>
              )}
            </span>
          ))
        ) : (
          <p className="text-gray-600">No skills added yet.</p>
        )}
      </div>
      {isEditing && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-grow p-2 bg-gray-50 border border-orange-300 rounded text-gray-800"
          />
          <button
            onClick={handleAddSkill}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
          >
            Add Skill
          </button>
        </div>
      )}
      {isOwnProfile && (
        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-orange-600 hover:text-orange-500 transition duration-300"
            >
              Edit Skills
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;