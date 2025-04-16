import { AppSidebar } from "@/components/ui/app-sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "../../components/ui/header";
import AuthGuard from "@/components/guard/AuthGuard";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        {/* <div className=""> */}
        <AppSidebar />
        {/* </div> */}
        <main className="w-full">
          <div className="flex items-center justify-start">
            <Header />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}
