"use client";

import React, { useEffect, useState } from "react";
import { Copy, User, Edit, X, Check, Upload } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type Profile = {
  agency: {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  meta: {
    id?: string;
    agencyId?: string;
    description?: string;
    members?: number;
    code?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

type EditableProfile = {
  agency: {
    name: string;
    email: string;
    avatar?: File | null;
  };
  meta: {
    description: string;
    members: number;
    code: string;
  };
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [originalData, setOriginalData] = useState<EditableProfile | null>(null);
  
  const [editData, setEditData] = useState<EditableProfile>({
    agency: {
      name: "",
      email: "",
      avatar: null,
    },
    meta: {
      description: "",
      members: 0,
      code: "",
    },
  });

  const fetchProfile = async () => {
    const token = Cookies.get("token");
    const agencyId = Cookies.get("agencyId");

    if (!token) {
      setError("Token not found. Please login.");
      console.warn("Token not found in cookies");
      return;
    }
    if (!agencyId) {
      setError("Agency ID not found. Please login.");
      console.warn("Agency ID not found in cookies");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      console.log("Fetching profile with token:", token);
      console.log("Fetching profile for agencyId:", agencyId);

      const url = `${process.env.NEXT_PUBLIC_AGENCY_BY_ID_API!}/${agencyId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.agency && response.data.meta) {
        setProfile({
          agency: response.data.agency,
          meta: response.data.meta,
        });
        
        const initialData = {
          agency: {
            name: response.data.agency.name || "",
            email: response.data.agency.email || "",
            avatar: null,
          },
          meta: {
            description: response.data.meta.description || "",
            members: response.data.meta.members || 0,
            code: response.data.meta.code || "",
          },
        };
        
        setEditData(initialData);
        setOriginalData(initialData);
        
        setError(null);
        console.log("Profile fetched:", response.data);
      } else {
        setError("Failed to fetch profile data.");
        console.warn("API responded without expected data:", response.data);
      }
    } catch (err: any) {
      setError(
        err.response?.status === 401
          ? "Unauthorized: Please login again."
          : "Failed to fetch profile."
      );
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (originalData) {
      setEditData({...originalData});
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData({
        ...editData,
        agency: {
          ...editData.agency,
          avatar: file,
        },
      });
    }
  };

  const hasAgencyChanges = () => {
    if (!originalData) return false;
    return (
      editData.agency.name !== originalData.agency.name ||
      editData.agency.email !== originalData.agency.email ||
      editData.agency.avatar !== null
    );
  };

  const hasMetaChanges = () => {
    if (!originalData) return false;
    return (
      editData.meta.description !== originalData.meta.description ||
      editData.meta.members !== originalData.meta.members
    );
  };

  const handleSubmit = async () => {
    setSaving(true);
    const token = Cookies.get("token");
    const agencyId = Cookies.get("agencyId");
    
    try {
      const updatePromises = [];
      let avatarUrl = profile?.agency?.avatar || "";

      if (editData.agency.avatar) {
        const imageFormData = new FormData();
        imageFormData.append("file", editData.agency.avatar);

        const imageUploadUrl = `${process.env.NEXT_PUBLIC_UPLOAD_IMAGE_API!}`;
        const imageResponse = await axios.post(imageUploadUrl, imageFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        avatarUrl = imageResponse.data.data.url || avatarUrl;
      }

      if (hasAgencyChanges()) {
        const agencyData: any = {};
        
        if (editData.agency.name !== originalData?.agency.name) {
          agencyData.name = editData.agency.name;
        }
        if (editData.agency.email !== originalData?.agency.email) {
          agencyData.email = editData.agency.email;
        }
        agencyData.avatar = avatarUrl;

        const agencyUrl = `${process.env.NEXT_PUBLIC_AGENCY_UPDATE_API!}/${agencyId}`;
        updatePromises.push(
          axios.put(agencyUrl, agencyData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        );
      }

      if (hasMetaChanges()) {
        const metaData: any = {};
        
        if (editData.meta.description !== originalData?.meta.description) {
          metaData.description = editData.meta.description;
        }
        if (editData.meta.members !== originalData?.meta.members) {
          metaData.members = editData.meta.members;
        }

        const metaUrl = `${process.env.NEXT_PUBLIC_AGENCY_META_API!}/2`;
        updatePromises.push(
          axios.put(metaUrl, metaData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        );
      }

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
        await fetchProfile();
      }

      setIsEditing(false);
      console.log("Profile updated successfully");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast("Failed to update profile. Please try again.")
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-white font-semibold">Loading profile...</div>
    );
  if (error)
    return <div className="p-6 text-red-400 font-semibold">{error}</div>;
  if (!profile) return null;

  const agency = profile.agency;
  const meta = profile.meta;

  return (
    <div className="p-6 overflow-scroll">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-[#e85414] cursor-pointer text-white rounded-lg transition-colors"
          >
            <Edit size={18} />
            Edit
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 cursor-pointer text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
        )}
      </div>

      <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Basic information
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            {isEditing ? (
              <label className="cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="w-24 h-24 flex items-center justify-center bg-zinc-800 rounded-full relative overflow-hidden group-hover:opacity-80 transition-opacity">
                  {editData.agency.avatar ? (
                    <img
                      src={URL.createObjectURL(editData.agency.avatar)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : agency?.avatar ? (
                    <img
                      src={agency.avatar}
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
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-zinc-800 rounded-full overflow-hidden">
                {agency?.avatar ? (
                  <img
                    src={agency.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-white" />
                )}
              </div>
            )}
          </div>
          <div className="flex-1 grid grid-cols-1 gap-4 text-sm text-gray-300">
            <div>
              <p className="text-gray-500 mb-1">Agency name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.agency.name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      agency: { ...editData.agency, name: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{agency?.name || "N/A"}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500 mb-1">Agency code</p>
              <div className="flex items-center gap-2">
                <p>{meta?.code || "N/A"}</p>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleCopy(meta?.code || "")}
                  aria-label="Copy agency code"
                >
                  <Copy size={16} />
                </button>
                {copySuccess && (
                  <span className="ml-2 text-green-400 text-sm select-none">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Description
        </h2>
        <div className="text-sm text-gray-300">
          {isEditing ? (
            <textarea
              value={editData.meta.description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  meta: { ...editData.meta, description: e.target.value },
                })
              }
              rows={4}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Add a description for your agency..."
            />
          ) : (
            <p className="text-gray-300">
              {meta?.description || "No description provided"}
            </p>
          )}
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Contact information
        </h2>
        <div className="text-sm text-gray-300">
          <div>
            <p className="text-gray-500 mb-1">Contact email</p>
            {isEditing ? (
              <input
                type="email"
                value={editData.agency.email}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    agency: { ...editData.agency, email: e.target.value },
                  })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p>{agency?.email || "N/A"}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Platform details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500 mb-1">Total creators onboard</p>
            {isEditing ? (
              <input
                type="number"
                value={editData.meta.members}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    meta: { ...editData.meta, members: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p>{meta?.members ?? "0"}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Registered with Salsa</p>
            <p>
              {agency?.createdAt
                ? new Date(agency.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving || (!hasAgencyChanges() && !hasMetaChanges())}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Check size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;