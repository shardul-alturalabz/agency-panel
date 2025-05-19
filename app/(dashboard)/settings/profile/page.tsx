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
    // add other fields as needed
  };
  meta: {
    code?: string;
    members?: number;
    // add other fields as needed
  };
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_LOGIN_API!,
          {
            email: "",
            password: "",
          }, // send empty body if none
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.statusCode === 200) {
          setProfile(response.data.data.agencyDetails);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);
  console.log("Profile data:", profile); // Debugging line to check the fetched profile data
  const agency = profile?.agency;
  const meta = profile?.meta;

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
              <p>{agency?.name || "Loading..."}</p>
            </div>
            <div>
              <p className="text-gray-500">Website link</p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {/* No website in response, using placeholder */}
                www.agencywebsite.com
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <div>
                <p className="text-gray-500">Agency code</p>
                <p>{meta?.code || "Loading..."}</p>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => navigator.clipboard.writeText(meta?.code || "")}
              >
                <Copy size={16} />
              </button>
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
            <p>{agency?.email || "Loading..."}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone number</p>
            <p>+91-9876543210</p> {/* No phone in API response */}
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
            <p>{meta?.members || "0"}</p>
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
