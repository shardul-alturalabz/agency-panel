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
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

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
    <Sidebar className="bg-[#0D0D0D] border-neutral-900">
      <SidebarContent className="bg-[#111111] m-2 shadow-xl rounded-3xl relative z-20">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium text-neutral-500 px-4 uppercase tracking-widest mb-6">
            Agency Panel
          </SidebarGroupLabel>
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
                      className={`flex items-center justify-between cursor-pointer w-full rounded-xl px-3 py-2 transition-all duration-150 ease-in-out ${
                        isItemActive
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm"
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
                                      ? "bg-orange-500 text-white"
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
