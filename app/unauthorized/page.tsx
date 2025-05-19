"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-100 via-orange-100 to-red-200">
      <div className="bg-white/80 backdrop-blur-md border border-red-200 shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center space-y-6">
        {/* Warning Icon and Header */}
        <div className="flex items-center justify-center gap-3 text-red-700">
          <AlertTriangle className="w-10 h-10 animate-pulse text-red-600" />
          <h1 className="text-3xl font-bold">Access Denied</h1>
        </div>

        {/* Message */}
        <p className="text-red-800 text-base sm:text-lg leading-relaxed">
          You’re not authorized to access this page.
          <br />
          Please log in with the correct account or go back to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Button
            onClick={() => router.push("/auth/login")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 transition"
          >
            🔐 Login
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-red-500 text-red-600 hover:bg-red-50 font-semibold px-6 py-2 transition"
          >
            🏠 Home
          </Button>
        </div>
      </div>
    </div>
  );
}
