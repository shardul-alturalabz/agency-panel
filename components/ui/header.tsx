import { Bell, Headphones } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full px-4 py-2 bg-black border-b border-neutral-800">
      {/* Left section: Sidebar toggle + Banner fills the space */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <SidebarTrigger className="text-white hover:text-orange-500 flex-shrink-0" />
        
        <img
          src="/assets/banner.png" 
          alt="Banner"
          className="h-16 w-full object-cover rounded-xl"
        />
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-6 flex-shrink-0 ml-4">
        <Bell className="text-white w-5 h-5 cursor-pointer hover:text-orange-500" />
        <Headphones className="text-white w-5 h-5 cursor-pointer hover:text-orange-500" />
        <img
          src="/user-avatar.jpg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
        />
      </div>
    </header>
  );
}
