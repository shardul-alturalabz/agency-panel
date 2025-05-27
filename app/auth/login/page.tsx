"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner"; // ✅ Import toast

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);
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
        const agencyId = data.data.agencyDetails?.meta?.agencyId;
        if (agencyId) {
          Cookies.set("agencyId", agencyId.toString(), { expires: 7 });
        } else {
          console.warn("agencyId not found in login response");
        }

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

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black bg-opacity-80 rounded-xl shadow-lg w-full max-w-md">
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="6+ characters"
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 rounded transition duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
