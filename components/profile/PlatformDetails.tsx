import React from "react";

interface PlatformDetailsProps {
  isEditing: boolean;
  members: number;
  createdAt?: string;
  setEditData: (cb: (prev: any) => any) => void;
  editData: any;
}

const PlatformDetails: React.FC<PlatformDetailsProps> = ({
  isEditing,
  members,
  createdAt,
  setEditData,
  editData,
}) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg">
    <h2 className="text-lg text-white font-semibold mb-4">Platform details</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
      <div>
        <p className="text-gray-500 mb-1">Total creators onboard</p>
        {isEditing ? (
          <input
            type="number"
            value={members}
            onChange={(e) =>
              setEditData((prev: any) => ({
                ...prev,
                meta: {
                  ...prev.meta,
                  members: parseInt(e.target.value) || 0,
                },
              }))
            }
            className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p>{members ?? "0"}</p>
        )}
      </div>
      <div>
        <p className="text-gray-500 mb-1">Registered with Salsa</p>
        <p>{createdAt ? new Date(createdAt).toLocaleDateString() : "—"}</p>
      </div>
    </div>
  </div>
);

export default PlatformDetails;
