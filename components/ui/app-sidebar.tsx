"use client";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Settings,
  User2,
  UserCircle,
  Users,
  Wallet2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/agency_logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/main",
    icon: LayoutDashboard,
  },
  {
    title: "Talent Management",
    url: "/talent-management",
    icon: Users,
  },
  {
    title: "Earnings and Payouts",
    url: "/earnings",
    icon: Wallet2,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    children: [
      {
        title: "Profile",
        url: "/settings/profile",
        icon: User2,
      },
      {
        title: "Account",
        url: "/settings/account",
        icon: UserCircle,
      },
    ],
  },
  {
    title: "Notification",
    url: "/notification",
    icon: Bell,
  },
];

export function AppSidebar() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (url: string) => pathname === url;

  // Auto-open the correct submenu on page load
  useEffect(() => {
    const initialOpenMenus: { [key: string]: boolean } = {};

    items.forEach((item) => {
      const isAnyChildActive =
        item.children?.some((child) => isActive(child.url)) ?? false;
      if (isAnyChildActive) {
        initialOpenMenus[item.title] = true;
      }
    });

    setOpenMenus(initialOpenMenus);
  }, [pathname]);

  return (
    <Sidebar className="bg-[#0D0D0D] border-black">
      <SidebarContent className="bg-[#111111] m-2 shadow-xl rounded-3xl relative z-20">
        <SidebarGroup>
          <div className="h-16 rounded-xl w-full my-4 mb-5 border-0 flex items-center overflow-hidden">
            <Image src={logo} alt="AGENCY LOGO" className="object-fill"></Image>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const hasChildren = !!item.children;
                const isAnyChildActive =
                  item.children?.some((child) => isActive(child.url)) ?? false;
                const isItemActive = isActive(item.url) || isAnyChildActive;
                const isOpen = openMenus[item.title] ?? isAnyChildActive; // 👈 FIX HERE

                return (
                  <SidebarMenuItem key={item.title}>
                    <div
                      className={`flex items-center justify-between cursor-pointer w-full rounded-xl px-3 py-3.5 transition-all duration-150 ease-in-out ${
                        isItemActive
                          ? "bg-gradient-to-b from-[#b8301b] to-[#e85414] text-white shadow-sm"
                          : "hover:bg-neutral-800 text-neutral-300"
                      }`}
                      onClick={() => {
                        if (hasChildren) {
                          toggleMenu(item.title);
                        } else {
                          router.push(item.url ?? "#");
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-[18px] h-[18px]" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </div>
                      {hasChildren &&
                        (isOpen ? (
                          <ChevronDown className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-neutral-400" />
                        ))}
                    </div>

                    {hasChildren && isOpen && (
                      <SidebarMenu className="pl-5 mt-1 space-y-1">
                        {item.children.map((sub) => {
                          const isChildActive = isActive(sub.url);
                          return (
                            <SidebarMenuItem key={sub.title}>
                              <SidebarMenuButton asChild>
                                <Link
                                  href={sub.url}
                                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                                    isChildActive
                                      ? "bg-[#e85414] text-white"
                                      : "hover:bg-neutral-800 text-neutral-300"
                                  }`}
                                >
                                  <sub.icon className="w-[16px] h-[16px]" />
                                  {sub.title}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
