import { AppSidebar } from "@/components/ui/app-sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "../../components/ui/header";
import AuthGuard from "@/components/guard/AuthGuard";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen overflow-hidden">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}
