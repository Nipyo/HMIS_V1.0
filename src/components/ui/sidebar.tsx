import type React from "react"

export const Home = () => <svg>Home</svg>
export const Users = () => <svg>Users</svg>
export const CreditCard = () => <svg>CreditCard</svg>
export const FileText = () => <svg>FileText</svg>
export const Heart = () => <svg>Heart</svg>
export const Bell = () => <svg>Bell</svg>
export const Calendar = () => <svg>Calendar</svg>
export const Settings = () => <svg>Settings</svg>
export const User = () => <svg>User</svg>
export const MapPin = () => <svg>MapPin</svg>
export const ChevronDown = () => <svg>ChevronDown</svg>
export const Search = () => <svg>Search</svg>
export const TrendingUp = () => <svg>TrendingUp</svg>
export const LogOut = () => <svg>LogOut</svg>
export const UserCircle = () => <svg>UserCircle</svg>
export const PanelLeft = () => <svg>PanelLeft</svg>

export const Sidebar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar ${className}`}>{children}</div>
}

export const SidebarContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-content ${className}`}>{children}</div>
}

export const SidebarHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-header ${className}`}>{children}</div>
}

export const SidebarFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-footer ${className}`}>{children}</div>
}

export const SidebarGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-group ${className}`}>{children}</div>
}

export const SidebarGroupContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-group-content ${className}`}>{children}</div>
}

export const SidebarMenu = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-menu ${className}`}>{children}</div>
}

export const SidebarMenuItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`sidebar-menu-item ${className}`}>{children}</div>
}

export const SidebarMenuButton = ({
  children,
  className,
  isActive,
}: { children: React.ReactNode; className?: string; isActive?: boolean }) => {
  return <div className={`sidebar-menu-button ${className} ${isActive ? "active" : ""}`}>{children}</div>
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const SidebarInset = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const SidebarTrigger = ({ className }: { className?: string }) => {
  return <button className={`sidebar-trigger ${className}`}>Trigger</button>
}

export const useSidebar = () => {
  return { isOpen: true, onOpen: () => {}, onClose: () => {} }
}
