"use client";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useProfileUrlStore } from "@/zustand/stores/useProfileUrlStore";
import ForgotPasswordModal from "@/components/guard/ForgotPasswordModal";


export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const profileUrl = useProfileUrlStore((state) => state.setUrl);

  const [mounted, setMounted] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { setName } = useProfileUrlStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_LOGIN_API!,
        form
      );

      const data = response.data;
      console.log("Login response:", data);

      if (data?.data?.token) {
        // Save token
        Cookies.set("token", data.data.token, { expires: 7 });

        // Save agencyId from nested path
        const agencyId = data.data.id;
        if (agencyId) {
          Cookies.set("agencyId", agencyId.toString(), { expires: 7 });
        } else {
          console.warn("agencyId not found in login response");
        }

        Cookies.set("profileUrl", data.data.agencyDetails?.agency?.avatar);
        profileUrl(data.data.agencyDetails?.agency?.avatar);
        setName(data.data.agencyDetails?.agency?.name)

        router.push("/main");
      } else {
        console.warn("Token missing in response:", data);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.data.error || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error("Check your email and password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_FORGOT_PASSWORD_API!, { email }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      toast.success("Password reset link sent! Check your email.");
    } catch (err: any) {
      const errorMessage = err.response?.data?.data?.error || "Failed to send reset link.";
      toast.error(errorMessage);
    } finally {
      setShowForgot(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/assets/banner.png"
        alt="Login background"
        layout="fill"
        objectFit="cover"
        priority
      />

      {/* Back Button fixed at top left of viewport */}
      <button
        type="button"
        className="fixed top-6 cursor-pointer left-6 flex items-center gap-2 text-white hover:text-orange-400 bg-black/40 hover:bg-black/60 rounded-full px-4 py-2 transition z-30 text-base font-medium shadow-lg"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <FaArrowLeft size={18} />
        <span>Back</span>
      </button>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black bg-opacity-80 rounded-xl shadow-lg w-full max-w-md relative">
          <div className="p-8 flex flex-col">
            <h2 className="text-white text-2xl font-bold mb-6">Login</h2>

            <form onSubmit={handleLogin}>
              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="6+ characters"
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-orange-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 rounded transition duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              type="button"
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm self-end underline"
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={showForgot}
        onClose={() => setShowForgot(false)}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
}
