
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Calendar, Book, Briefcase, ShoppingBag, CheckSquare, FileText, Users, FolderKanban, LayoutDashboard } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "School", icon: Book, href: "/school" },
  { title: "Work", icon: Briefcase, href: "/work" },
  { title: "Shopping", icon: ShoppingBag, href: "/shopping" },
  { title: "Tasks", icon: CheckSquare, href: "/tasks" },
  { title: "Notes", icon: FileText, href: "/notes" },
  { title: "Meetings", icon: Users, href: "/meetings" },
  { title: "Projects", icon: FolderKanban, href: "/projects" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.href} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
