"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [hovering, setHovering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f97316] via-[#fb923c] to-[#f97316] flex flex-col items-center justify-center text-white px-6">
      
      {/* Unauthorized Access Badge with Tooltip Above */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {hovering && (
          <div className="absolute bottom-full mb-3 bg-white text-gray-800 text-sm rounded-lg shadow-lg px-4 py-3 w-72 z-50 text-center">
            Check your login credentials. <br /> If the issue persists, please contact our support team.
          </div>
        )}

        <div className="bg-white text-red-600 flex items-center gap-3 text-3xl font-bold px-10 py-5 rounded-full shadow-lg mb-6 cursor-pointer transition hover:scale-105">
          <AlertCircle className="w-7 h-7 text-red-500" />
          Unauthorized Access
        </div>
      </div>

      {/* Subtext */}
      <p className="text-center text-base sm:text-lg max-w-xl mb-8">
        You don’t have permission to view this page. Please log in with the appropriate credentials or return to the homepage.
      </p>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => router.back()}
          className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded shadow"
        >
          ← Back
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded shadow"
        >
          🏠 Home
        </Button>
      </div>
    </div>
  );
}
