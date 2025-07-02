"use client";
import { useState } from "react";

const passwordChecks = [
  {
    label: "At least 8 characters",
    check: (pw: string) => pw.length >= 8,
  },
  {
    label: "At least one uppercase letter",
    check: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "At least one lowercase letter",
    check: (pw: string) => /[a-z]/.test(pw),
  },
];

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">Reset Password</h2>
        <form className="space-y-6">
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
            <ul className="mt-2 space-y-1">
              {passwordChecks.map((rule, idx) => (
                <li key={idx} className={
                  rule.check(newPassword)
                    ? "text-green-400 text-xs flex items-center"
                    : "text-red-400 text-xs flex items-center"
                }>
                  <span className="mr-1">{rule.check(newPassword) ? "✓" : "✗"}</span>
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
            disabled={newPassword.length === 0 || !passwordChecks.every(r => r.check(newPassword))}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
