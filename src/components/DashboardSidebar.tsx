import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Trophy,
  CreditCard,
  FileText,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "ওভারভিউ", titleEn: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "শিক্ষার্থী", titleEn: "Students", url: "/dashboard/students", icon: Users },
  { title: "কন্টেন্ট", titleEn: "Content", url: "/dashboard/content", icon: BookOpen },
  { title: "অ্যানালিটিক্স", titleEn: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
];

const secondaryItems = [
  { title: "লিডারবোর্ড", titleEn: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
  { title: "সাবস্ক্রিপশন", titleEn: "Subscriptions", url: "/dashboard/subscriptions", icon: CreditCard },
  { title: "রিপোর্ট", titleEn: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "সেটিংস", titleEn: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-card">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border/50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-amber">
            <BookOpen size={18} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold text-foreground whitespace-nowrap">
              My Teacher
            </span>
          )}
        </div>

        {/* Main nav */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {collapsed ? "" : "মেনু"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                      activeClassName="bg-primary/15 text-primary hover:bg-primary/20 hover:text-primary"
                    >
                      <item.icon size={18} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary nav */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {collapsed ? "" : "অন্যান্য"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                      activeClassName="bg-primary/15 text-primary hover:bg-primary/20 hover:text-primary"
                    >
                      <item.icon size={18} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
