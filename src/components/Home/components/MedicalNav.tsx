"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Clock, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { PATH } from "@/constants/paths";

export default function MedicalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: PATH.HOME_PATH },
    { name: "About", path: PATH.ABOUT_PATH },
    { name: "Services", path: PATH.OUR_SERVICES_PATH },
    { name: "Blog", path: PATH.BLOG_PATH },
    { name: "Gallery", path: PATH.GALLERY_PATH },
    { name: "Contact", path: PATH.CONTACT_PATH },
  ];

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 right-0 z-50">
      {/* Top bar with contact info */}
      <div className="w-full bg-blue-900 text-white py-1 px-4 flex justify-end items-center text-xs md:text-sm">
        <div className="flex items-center mr-4">
          <Phone className="h-3 w-3 mr-1" />
          <span>(977)-9851065231</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Mon to Sat 07 am to 06 pm</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <Image
                src="/logo.svg?height=48&width=100"
                width={100}
                height={48}
                alt="Nippon Medical Centre Logo"
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm" className="px-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "block px-2 py-1 text-lg font-medium",
                      pathname === item.path
                        ? "text-blue-800 font-semibold"
                        : "text-black"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-2">
                  <Link href="/booking">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      BOOK NOW
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                      LOG IN
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="flex space-x-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      href={item.path}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-800 focus:bg-blue-50 focus:text-blue-800 focus:outline-none",
                        pathname === item.path
                          ? "text-blue-800 font-semibold bg-blue-50"
                          : "text-black"
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2">
              <Link href="/booking">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  BOOK NOW
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                  LOG IN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
