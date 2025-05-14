"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 text-white">
      {/* Icon + Message Box */}
      <div className="flex flex-col items-center text-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-xl w-full">
        <div className="flex items-center justify-center gap-3 text-red-700 text-4xl font-bold">
          <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
          <span>Unauthorized Access</span>
        </div>

        <p className="text-white/90 text-base sm:text-lg leading-relaxed">
          You don’t have permission to view this page. <br />
          Please log in with the appropriate credentials or return to the
          homepage.
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={() => router.push("/auth/login")}
            className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded shadow transition"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded shadow transition"
          >
            🏠 Home
          </Button>
        </div>
      </div>
    </div>
  );
}
