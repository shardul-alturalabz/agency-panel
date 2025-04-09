"use client";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Settings,
  User2,
  UserCircle,
  Users,
  Wallet2,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
];

export function AppSidebar() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar className="bg-black text-white min-h-screen">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-neutral-400 px-4 pt-4 pb-2 tracking-widest mb-5 uppercase">
            Agency Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const hasChildren = !!item.children;
                const isAnyChildActive =
                  item.children?.some((child) => isActive(child.url)) ?? false;
                const isItemActive = isActive(item.url) || isAnyChildActive;
                const isOpen = openMenus[item.title] || isAnyChildActive;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <div
                        className={`flex items-center justify-between cursor-pointer w-full rounded-lg px-2 py-2 ${
                          isItemActive
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                            : "hover:bg-neutral-800"
                        }`}
                        onClick={() =>
                          hasChildren ? toggleMenu(item.title) : null
                        }
                      >
                        <a
                          href={item.url ?? "#"}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </a>
                        {hasChildren &&
                          (isOpen ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          ))}
                      </div>
                    </SidebarMenuButton>

                    {hasChildren && isOpen && (
                      <SidebarMenu className="pl-6">
                        {item.children.map((sub) => {
                          const isChildActive = isActive(sub.url);
                          return (
                            <SidebarMenuItem key={sub.title}>
                              <SidebarMenuButton asChild>
                                <a
                                  href={sub.url}
                                  className={`flex items-center gap-2 w-full px-2 py-2 rounded ${
                                    isChildActive
                                      ? "bg-orange-500 text-white"
                                      : "hover:bg-neutral-800"
                                  }`}
                                >
                                  <sub.icon className="w-4 h-4" />
                                  {sub.title}
                                </a>
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
