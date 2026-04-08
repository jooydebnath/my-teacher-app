import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Bell, Search, User } from "lucide-react";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-card/80 backdrop-blur-md px-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 border border-border/50">
                <Search size={14} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
            </div>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 border border-border/50 hover:bg-accent transition-colors">
              <Bell size={16} className="text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
              <User size={16} className="text-primary" />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
