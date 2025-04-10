"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b83227] to-[#ea541f] flex flex-col">
      {/* Header */}
      <div className="bg-[#f4c9c2] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-[#e94e1b] font-semibold">
          {/* Optional logo icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v2H4zm2 4h12v2H6zm3 4h6v2H9zm3 4h0v2h0z" />
          </svg>
          <span>Salsa. you</span>
        </div>
        <button className="bg-white text-[#e94e1b] font-medium px-4 py-1.5 rounded-lg shadow text-sm hover:bg-orange-100">
          Lorem
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Fuel Your Talent’s <br /> Success with Salsa
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl">
          Partner with us to unlock new revenue streams, brand deals, and a
          thriving creator ecosystem.
        </p>
        <Button
          onClick={() => router.push("/join-us")}
          className="bg-white text-[#e94e1b] font-semibold px-6 py-2 rounded-md shadow-md hover:bg-orange-100 transition"
        >
          Become a partner
        </Button>
      </div>
    </div>
  );
};

export default page;
