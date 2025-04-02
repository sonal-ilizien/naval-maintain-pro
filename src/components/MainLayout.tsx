
import { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ChevronDown, ChevronLeft, ChevronRight, 
  Home, Ship, Wrench, AlertCircle, Database,
  BarChart2, Package, FileText, Users, Settings,
  Bell, LogOut, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  path: string;
  active: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
}

interface SidebarNavItem {
  label: string;
  icon: ReactNode;
  path: string;
  children?: { label: string; path: string }[];
}

const NavItem = ({ icon, label, path, active, hasChildren, onClick }: NavItemProps) => (
  <Link
    to={path}
    className={`nav-item ${active ? "nav-item-active" : ""}`}
    onClick={onClick}
  >
    {icon}
    <span className="flex-1">{label}</span>
    {hasChildren && <ChevronDown className="h-4 w-4" />}
  </Link>
);

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Navigation structure
  const navigation: SidebarNavItem[] = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      label: "Global Master",
      icon: <Database className="h-5 w-5" />,
      path: "#",
      children: [
        { label: "Units", path: "/masters/units" },
        { label: "Commands", path: "/masters/commands" },
        { label: "Equipment", path: "/masters/equipment" },
        { label: "Ships", path: "/masters/ships" },
        { label: "Frequency Master", path: "/masters/frequency" },
        { label: "Operational Authority", path: "/masters/authority" },
      ],
    },
    {
      label: "Ship Fit Details",
      icon: <Ship className="h-5 w-5" />,
      path: "/sfd",
    },
    {
      label: "Maintenance Operations",
      icon: <Wrench className="h-5 w-5" />,
      path: "/maintop",
    },
    {
      label: "Defects and Routine",
      icon: <AlertCircle className="h-5 w-5" />,
      path: "/dart",
    },
    {
      label: "Ship Readiness",
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/srar",
    },
    {
      label: "Stores & Demands",
      icon: <Package className="h-5 w-5" />,
      path: "/storedem",
    },
    {
      label: "Casualties & Emergencies",
      icon: <AlertCircle className="h-5 w-5" />,
      path: "/candef",
    },
    {
      label: "Fleet Usage",
      icon: <FileText className="h-5 w-5" />,
      path: "/fuss",
    },
    {
      label: "Reports",
      icon: <FileText className="h-5 w-5" />,
      path: "/reports",
    },
    {
      label: "User Management",
      icon: <Users className="h-5 w-5" />,
      path: "/users",
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleNavItem = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of the system.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar fixed left-0 top-0 h-screen z-30 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            {!isSidebarCollapsed && (
              <div className="flex items-center">
                <Ship className="h-6 w-6 text-sidebar-primary mr-2" />
                <h1 className="text-sidebar-foreground font-semibold">CMMS</h1>
              </div>
            )}
            {isSidebarCollapsed && <Ship className="h-6 w-6 text-sidebar-primary mx-auto" />}
            <Button
              variant="ghost"
              size="sm"
              className="text-sidebar-foreground hover:bg-sidebar-accent p-1 h-auto"
              onClick={toggleSidebar}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Navigation Items */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                const isExpanded = expandedItems[item.label];
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleNavItem(item.label)}
                          className={`w-full nav-item ${isActive ? "nav-item-active" : ""}`}
                        >
                          {item.icon}
                          {!isSidebarCollapsed && (
                            <>
                              <span className="flex-1">{item.label}</span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  isExpanded ? "transform rotate-180" : ""
                                }`}
                              />
                            </>
                          )}
                        </button>
                        {isExpanded && !isSidebarCollapsed && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.children!.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`nav-item ${
                                  location.pathname === child.path ? "nav-item-active" : ""
                                }`}
                              >
                                <span className="flex-1">{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavItem
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        active={isActive}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* User Profile Section */}
          <div className="p-4 border-t border-sidebar-border">
            {isSidebarCollapsed ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-full p-1 h-auto flex justify-center text-sidebar-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full px-2 justify-start text-left bg-sidebar-accent"
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-sidebar-primary text-xs">AD</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 truncate text-sidebar-foreground">Admin User</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top Navigation Bar */}
        <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <h2 className="text-lg font-medium">
              Naval Fleet Maintenance Management
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-alert text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Maintenance due for INS Vikrant</DropdownMenuItem>
                <DropdownMenuItem>Critical alert: Engine failure reported</DropdownMenuItem>
                <DropdownMenuItem>New defect report submitted</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <span className="hidden md:inline-block text-sm text-navy-600">Admin User</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-navy-600 text-white">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
