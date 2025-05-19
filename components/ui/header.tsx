"use client";

import { useRouter } from "next/navigation";
import { Bell, CrossIcon, Headphones, UserCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";

export default function Header() {
  const router = useRouter();
  const [menu, setMenu] = useState(-1);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token from cookies
    router.push("/auth/login"); // Redirect to login
  };

  return (
    <header className="flex items-center justify-between w-full px-2 py-2 bg-black border-b border-neutral-800">
      {/* Left section: Sidebar toggle + Banner fills the space */}
      {menu==2 && 
          <div className="absolute z-30 w-screen h-screen inset-0 gap-5 flex flex-col items-center justify-center bg-black/90">
            <FeedbackForm setMenu={setMenu} />
          </div>
        }
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <SidebarTrigger className="text-white hover:text-orange-500 flex-shrink-0" />

        <img
          src="/assets/banner.png"
          alt="Banner"
          className="h-16 w-full object-cover rounded-xl"
        />
      </div>

      {/* Right: Icons & Avatar with dropdown */}
      <div className="flex items-center gap-6 flex-shrink-0 ml-4 relative">
        <Bell className="text-white w-5 h-5 cursor-pointer hover:text-orange-500" />
        <Headphones onClick={()=>setMenu(0)} className="text-white w-5 h-5 cursor-pointer hover:text-orange-500" />
        {menu==0 && <div className="z-20 absolute h-[8rem] border-0 rounded-2xl flex flex-col items-start pl-4 text-lg gap-5 text-white font-semibold justify-center w-[17rem] bg-zinc-800 top-16 right-5">
          <p onClick={()=>setMenu(1)} className="hover:bg-white/20 px-5 pr-12 py-1.5 rounded-xl cursor-pointer">Contact us</p>
          <p onClick={()=>setMenu(2)} className="hover:bg-white/20 px-5 pr-12 py-1.5 rounded-xl cursor-pointer">Send feedback</p>
        </div>}
        {/* Profile Icon with Hover Dropdown */}
        <div className="relative group">
          <UserCircle className="w-10 h-10 text-white border-2 border-white rounded-full p-1 cursor-pointer hover:text-orange-500" />

          {/* Dropdown */}
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-orange-100 transition-colors duration-200 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
