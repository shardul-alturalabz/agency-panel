import React from "react";

interface DescriptionSectionProps {
  isEditing: boolean;
  value: string;
  setEditData: (cb: (prev: any) => any) => void;
  editData: any;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ isEditing, value, setEditData, editData }) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
    <h2 className="text-lg text-white font-semibold mb-4">Description</h2>
    <div className="text-sm text-gray-300">
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) =>
            setEditData((prev: any) => ({
              ...prev,
              meta: { ...prev.meta, description: e.target.value },
            }))
          }
          rows={4}
          className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Add a description for your agency..."
        />
      ) : (
        <p className="text-gray-300">{value || "No description provided"}</p>
      )}
    </div>
  </div>
);

export default DescriptionSection;
