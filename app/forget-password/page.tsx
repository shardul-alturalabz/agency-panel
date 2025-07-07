"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

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

// Extract the component that uses useSearchParams
function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_NEW_PASSWORD_API!,
        {
          token,
          newPassword,
          confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("Password reset successful! You can now log in.");
    } catch (err: any) {
      const errorMsg = err.response?.data?.data?.error || "Failed to reset password.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">Reset Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none pr-10"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                tabIndex={-1}
                onClick={() => setShowNewPassword((v) => !v)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none pr-10"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
          {message && <div className="text-green-400 text-sm">{message}</div>}
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
            disabled={loading || newPassword.length === 0 || !passwordChecks.every(r => r.check(newPassword))}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}