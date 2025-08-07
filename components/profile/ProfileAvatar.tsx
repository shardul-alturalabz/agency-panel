import React from "react";
import { User, Upload } from "lucide-react";

interface ProfileAvatarProps {
  isEditing: boolean;
  agencyAvatar?: string;
  editAvatar: File | null;
  setEditData: (cb: (prev: any) => any) => void;
  editData: any;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  isEditing,
  agencyAvatar,
  editAvatar,
  setEditData,
  editData,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData((prev: any) => ({
        ...prev,
        agency: {
          ...prev.agency,
          avatar: file,
        },
      }));
    }
  };
  if (isEditing) {
    return (
      <label className="cursor-pointer group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="w-24 h-24 flex items-center justify-center bg-zinc-800 rounded-full relative overflow-hidden group-hover:opacity-80 transition-opacity">
          {editAvatar ? (
            <img
              src={URL.createObjectURL(editAvatar)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : agencyAvatar ? (
            <img
              src={agencyAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={40} className="text-white" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Upload size={24} className="text-white" />
          </div>
        </div>
      </label>
    );
  }
  return (
    <div className="w-24 h-24 flex items-center justify-center bg-zinc-800 rounded-full overflow-hidden">
      {agencyAvatar ? (
        <img
          src={agencyAvatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <User size={40} className="text-white" />
      )}
    </div>
  );
};

export default ProfileAvatar;
