import React from "react";

interface ContactInfoProps {
  isEditing: boolean;
  email: string;
  setEditData: (cb: (prev: any) => any) => void;
  editData: any;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isEditing, email, setEditData, editData }) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
    <h2 className="text-lg text-white font-semibold mb-4">Contact information</h2>
    <div className="text-sm text-gray-300">
      <div>
        <p className="text-gray-500 mb-1">Contact email</p>
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEditData((prev: any) => ({
                ...prev,
                agency: { ...prev.agency, email: e.target.value },
              }))
            }
            className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p>{email || "N/A"}</p>
        )}
      </div>
    </div>
  </div>
);

export default ContactInfo;
