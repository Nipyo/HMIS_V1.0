"use client"

import { Home, Users, CreditCard, FileText, Heart, Bell, Calendar, Settings, User, Sheet, Menu } from "lucide-react"
import { useState } from "react"

import Image from "next/image"
import { SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"


export function MobileSidebar() {
  const [activeItem, setActiveItem] = useState("HOME")

  const handleItemClick = (title: string) => {
    setActiveItem(title)
  }

  const sidebarItems = [
    { title: "HOME", icon: Home, href: "#" },
    { title: "REGISTER", icon: Users, href: "#" },
    { title: "ACCOUNT", icon: CreditCard, href: "#" },
    { title: "REPORTS", icon: FileText, href: "#" },
    { title: "E-HEALTH", icon: Heart, href: "#" },
    { title: "ALERTS", icon: Bell, href: "#" },
    { title: "BOOKING", icon: Calendar, href: "" },
    { title: "SETTING", icon: Settings, href: "#" },
    { title: "PROFILE", icon: User, href: "#" },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[250px]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 border-b border-gray-200 px-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={100} height={50} />
            </div>
            <span className="ml-3 font-semibold text-gray-800">Medical Center</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {sidebarItems.map((item) => (
                <li key={item.title}>
                  <button
                    onClick={() => handleItemClick(item.title)}
                    className={cn(
                      "flex items-center w-full px-3 py-3 rounded-md transition-colors",
                      activeItem === item.title
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-3 text-sm font-medium">{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Logo */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={100} height={50} />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Powered by</p>
                <p className="text-xs font-medium text-gray-700">HMIS v1</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
