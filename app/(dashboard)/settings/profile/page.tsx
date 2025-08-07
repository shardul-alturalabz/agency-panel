"use client";

import React, { useEffect, useState } from "react";
import { Edit, X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import AgencyCode from "@/components/profile/AgencyCode";
import DescriptionSection from "@/components/profile/DescriptionSection";
import ContactInfo from "@/components/profile/ContactInfo";
import PlatformDetails from "@/components/profile/PlatformDetails";
import SaveButton from "@/components/profile/SaveButton";
import { useProfileUrlStore } from "@/zustand/stores/useProfileUrlStore";

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
  const { setUrl, setName } = useProfileUrlStore();

  const [originalData, setOriginalData] = useState<EditableProfile | null>(
    null
  );

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

        Cookies.set("profileUrl", response.data.agency.avatar);
        setUrl(response.data.agency.avatar);
        setName(response.data.agency.name)

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (originalData) {
      setEditData({ ...originalData });
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

        const agencyUrl = `${process.env
          .NEXT_PUBLIC_AGENCY_UPDATE_API!}/${profile?.agency.id}`;
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

        const metaUrl = `${process.env.NEXT_PUBLIC_AGENCY_META_API!}/${profile?.meta.id}`;
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
      toast("Failed to update profile. Please try again.");
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
          <ProfileAvatar
            isEditing={isEditing}
            agencyAvatar={agency?.avatar}
            editAvatar={editData.agency.avatar ?? null}
            setEditData={setEditData}
            editData={editData}
          />
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
              <AgencyCode code={meta?.code || ""} copySuccess={copySuccess} setCopySuccess={setCopySuccess} />
            </div>
          </div>
        </div>
      </div>

      <DescriptionSection
        isEditing={isEditing}
        value={editData.meta.description}
        setEditData={setEditData}
        editData={editData}
      />

      <ContactInfo
        isEditing={isEditing}
        email={editData.agency.email}
        setEditData={setEditData}
        editData={editData}
      />

      <PlatformDetails
        isEditing={isEditing}
        members={editData.meta.members}
        createdAt={agency?.createdAt}
        setEditData={setEditData}
        editData={editData}
      />

      {isEditing && (
        <SaveButton
          saving={saving}
          disabled={saving || (!hasAgencyChanges() && !hasMetaChanges())}
          onClick={handleSubmit}
        />
      )}
    </div>
  );
};

export default ProfilePage;
