'use client'
import React, { useState } from "react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ email, oldPassword, newPassword, confirmPassword });
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#232323] rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-xl font-semibold mb-4 text-white">Change Password</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Old Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
