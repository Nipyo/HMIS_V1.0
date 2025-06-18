"use client";

import type { ReactNode } from "react";
import { useState, useEffect, Suspense } from "react";
import {
  Home,
  Users,
  Briefcase,
  FileText,
  Heart,
  Bell,
  Calendar,
  Settings,
  User,
  MapPin,
  ChevronDown,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./../ui/button";
import { Input } from "./../ui/input";
import { cn } from "@/lib/utils";
import { PATH } from "@/constants/paths";

const sidebarItems = [
  { title: "HOME", icon: Home, href: PATH.DASHBOARD_PATH },
  { title: "REGISTER", icon: Users, href: PATH.DASHBOARD_REGISTER_PATH },
  { title: "ACCOUNT", icon: Briefcase, href: PATH.DASHBOARD_ACCOUNT_PATH },
  { title: "REPORTS", icon: FileText, href: PATH.DASHBOARD_REPORTS_PATH },
  { title: "E-HEALTH", icon: Heart, href: PATH.DASHBOARD_E_HEALTH_PATH },
  { title: "ALERTS", icon: Bell, href: PATH.DASHBOARD_ALERTS_PATH },
  { title: "BOOKING", icon: Calendar, href: PATH.DASHBOARD_BOOKINGS_PATH },
  { title: "SETTING", icon: Settings, href: PATH.DASHBOARD_SETTINGS_PATH },
  { title: "PROFILE", icon: User, href: PATH.DASHBOARD_PROFILE_PATH },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("token");

    if (authStatus === "true" || token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleItemClick = (href: string) => {
    router.push(href);
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("currentBookingId");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const getActiveItem = () => {
    if (pathname === "/dashboard") return "HOME";
    return (
      sidebarItems.find(
        (item) => pathname?.startsWith(item.href) && item.href !== "/dashboard"
      )?.title || "HOME"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static z-40 h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-lg",
          sidebarOpen
            ? "w-[100px] translate-x-0"
            : "w-0 -translate-x-full md:translate-x-0"
        )}
        style={{
          minWidth: sidebarOpen ? "100px" : "0px",
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 border-b border-gray-200 py-4 bg-white">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">NM</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 bg-white">
          <ul className="space-y-2 px-2">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => handleItemClick(item.href)}
                  className={cn(
                    "flex flex-col items-center w-full px-2 py-3 rounded-md transition-colors text-center hover:bg-gray-100",
                    getActiveItem() === item.title
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600"
                  )}
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mb-2">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <p className="text-xs text-gray-500">Powered by</p>
            <p className="text-xs font-medium text-gray-700">RMIS</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-4 hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>

          <h1 className="text-xl font-semibold text-gray-800 mr-auto">
            {getActiveItem()}
          </h1>

          <div className="hidden md:flex items-center space-x-4">
            <Suspense fallback={<div>Loading...</div>}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedLocation}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("Tokyo, Japan")}
                  >
                    Tokyo, Japan
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("Osaka, Japan")}
                  >
                    Osaka, Japan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-[300px]" />
              </div>
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-xs flex items-center justify-center text-white">
                  2
                </span>
              </Button>
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">NM</span>
                    </div>
                    <span className="text-sm font-medium hidden lg:inline-block">
                      Nippon Medical Center
                    </span>
                    <ChevronDown className="h-4 w-4 hidden lg:inline-block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/settings")}
                  >
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Suspense>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
