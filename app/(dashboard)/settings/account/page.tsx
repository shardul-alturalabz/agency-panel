'use client'
import { Trash2, ChevronRight, CreditCard } from "lucide-react";
import React, { useState } from "react";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";


const AccountPage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Placeholder for API call
  const handleChangePassword = async (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // TODO: Call your API here
    // Example: await api.changePassword(data)
    // For now, just close the modal
    setShowChangePassword(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6 lg:p-8 overflow-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Account</h1>

      <div className="w-full mb-6 rounded-xl bg-[#1E1E1E] shadow-lg overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Login & Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-2">
              <p className="text-zinc-400 text-sm">Username</p>
              <p className="font-medium">Sushi_vid1207</p>
            </div>

            <div className="space-y-2">
              <p className="text-zinc-400 text-sm">Password</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="font-mono">••••••••••••</p>
                <button
                  className="text-blue-500 text-sm hover:text-blue-400 transition-colors"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-zinc-400 text-sm">Recovery Options</p>
                <button className="text-blue-500 text-sm hover:text-blue-400 transition-colors">
                  Add recovery email address
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-zinc-400 text-sm">Account Verification</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-medium">Verified</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSubmit={handleChangePassword}
      />

      {/* ...existing code for Payment Methods... */}
      <div className="w-full mb-6 rounded-xl bg-[#1E1E1E] shadow-lg overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Payment Methods
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-4 w-full lg:w-2/3">
              <p className="text-zinc-400 text-sm font-medium">
                Primary payout method
              </p>

              <div className="flex items-center gap-4 p-3 bg-zinc-800 rounded-lg">
                <div className="border border-zinc-600 rounded-lg w-10 h-10 flex items-center justify-center">
                  <CreditCard size={20} className="text-zinc-300" />
                </div>

                <div className="flex-grow">
                  <p className="font-medium">Account holder name</p>
                  <p className="text-zinc-400 text-sm">
                    <span className="font-mono">••••</span>
                    <span className="font-mono">••••</span> 5678
                  </p>
                </div>

                <button
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                  aria-label="Delete payment method"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3 w-full lg:w-1/3 lg:pl-6 lg:border-l lg:border-zinc-700">
              <p className="text-zinc-400 text-sm font-medium mb-2">
                Additional options
              </p>

              <button className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                <span>Add UPI</span>
                <ChevronRight size={16} />
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                <span>Add another bank account</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
