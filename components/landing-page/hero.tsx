"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";

const Hero = () => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#b83227] to-[#ea541f] flex flex-col overflow-y-hidden"
      style={{
        backgroundImage: `url('assets/Agency website_hero image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Header */}
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-white font-semibold">
          <img src="/assets/logo.png" alt="logo" className="w-30 h-10" />
        </div>
        {/* Login Button at Top Right */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            onClick={() => router.push("/auth/login")}
            className="py-2.5 px-5 flex cursor-pointer items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#ff7143] to-[#ff4e1b] text-white shadow-md hover:scale-105 transition"
          >
            <FaSignInAlt size={18} />
           <span className="font-medium">Log In</span> 
          </button>
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-[#e94e1b] text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
              Login, if you are already a partner
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Fuel Your Talent's <br /> Success with Salsa
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl">
          Partner with us to unlock new revenue streams, brand deals, and a
          thriving creator ecosystem.
        </p>

        {/* Button Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
          <Button
            onClick={() => router.push("#join-us")}
            className="bg-white text-[#e94e1b] font-semibold px-6 py-2 rounded-md shadow-md hover:bg-orange-100 transition"
          >
            Become a partner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
