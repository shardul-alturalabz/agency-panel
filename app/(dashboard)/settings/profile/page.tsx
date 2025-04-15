"use client";
import React from "react";
import { Copy, User } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Profile</h1>

      {/* Basic Info */}
      <div className="bg-zinc-900 rounded-xl p-6 mb-6 shadow-lg">
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
              <p>MAVN</p>
            </div>
            <div>
              <p className="text-gray-500">Website link</p>
              <a
                href="https://www.mavnmodels.com/talent-agency-malaysia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                mavnmodels.com
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <div>
                <p className="text-gray-500">Agency code</p>
                <p>G23GJ</p>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-zinc-900 rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Contact information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500">Contact email</p>
            <p>loremipsum@lorem.com</p>
          </div>
          <div>
            <p className="text-gray-500">Phone number</p>
            <p>+91-9876543210</p>
          </div>
        </div>
      </div>

      {/* Platform Details */}
      <div className="bg-zinc-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg text-white font-semibold mb-4">
          Platform details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500">Total creators onboard</p>
            <p>52</p>
          </div>
          <div>
            <p className="text-gray-500">Registered with Salsa</p>
            <p>12/06/2018</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
