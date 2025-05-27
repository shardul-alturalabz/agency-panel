"use client";

import React, { useEffect, useState } from "react";
import { Copy, User } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

type Profile = {
  agency: {
    name?: string;
    email?: string;
    createdAt?: string;
  };
  meta: {
    code?: string;
    members?: number;
  };
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
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

    const fetchProfile = async () => {
      setError(null);
      setLoading(true);

      try {
        console.log("Fetching profile with token:", token);
        console.log("Fetching profile for agencyId:", agencyId);

        const url = `https://uat-api.workuplift.com/v1/agency/details/${agencyId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Updated condition for your API response
        if (response.data.agency && response.data.meta) {
          setProfile({
            agency: response.data.agency,
            meta: response.data.meta,
          });
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

    fetchProfile();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
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
      <h1 className="text-2xl font-semibold text-white mb-6">Profile</h1>

      {/* Basic Info */}
      <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Basic information
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 flex items-center justify-center bg-zinc-800 rounded-full">
            <User size={40} className="text-white" />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="text-gray-500">Agency name</p>
              <p>{agency?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Website link</p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                www.agencywebsite.com
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <div>
                <p className="text-gray-500">Agency code</p>
                <p>{meta?.code || "N/A"}</p>
              </div>
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

      {/* Contact Info */}
      <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Contact information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500">Contact email</p>
            <p>{agency?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone number</p>
            <p>+91-9876543210</p> {/* Placeholder */}
          </div>
        </div>
      </div>

      {/* Platform Details */}
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Platform details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500">Total creators onboard</p>
            <p>{meta?.members ?? "0"}</p>
          </div>
          <div>
            <p className="text-gray-500">Registered with Salsa</p>
            <p>
              {agency?.createdAt
                ? new Date(agency.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
