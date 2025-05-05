"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Moon,
  LayoutDashboard,
  Award,
  Calendar,
  BarChart3,
  Settings,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "../(auth)/register/SignOutButton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Challenges", href: "/dashboard/challenges", icon: Award },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Progress", href: "/dashboard/progress", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const NavLink = ({ item }: { item: (typeof navItems)[number] }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300",
          isActive
            ? "bg-gradient-to-r from-[#d65d0e] to-[#fe8019] text-white shadow-md"
            : "text-[#c0c0c0] hover:bg-[#2e2e2e] hover:text-[#e0e0e0]"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.name}</span>
      </Link>
    );
  };

  const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2e2e2e] bg-[#1d2021] shadow-lg md:hidden">
      <div className="flex items-center justify-between px-2">
        {navItems.slice(0, -1).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 p-2 text-xs",
                isActive
                  ? "text-[#fe8019]"
                  : "text-[#909090] hover:text-[#fe8019]"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#c0c0c0] hover:text-[#e0e0e0]"
        >
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#282828] border-[#2e2e2e] text-[#e0e0e0]"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2e2e2e]" />
        <Link href="/dashboard/profile">
          <DropdownMenuItem className="hover:bg-[#2e2e2e]">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </Link>{" "}
        <Link href="/dashboard/settings">
          <DropdownMenuItem className="hover:bg-[#2e2e2e]">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>{" "}
        <DropdownMenuSeparator className="bg-[#2e2e2e]" />
        <DropdownMenuItem className="text-red-500 hover:bg-[#2e2e2e] hover:text-red-400">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const DesktopSidebar = () => (
    <div className="sticky top-0 z-10 hidden h-screen w-64 flex-col border-r border-[#2e2e2e] bg-[#1d2021] md:flex">
      <div className="flex h-16 items-center border-b border-[#2e2e2e] px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Moon className="h-6 w-6 text-[#fe8019]" />
          <span className="text-xl font-bold text-[#e0e0e0]">Nafs</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
      </div>
      <div className="border-t border-[#2e2e2e] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-[#2e2e2e]">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="@abdullah"
              />
              <AvatarFallback className="bg-[#2e2e2e] text-[#e0e0e0]">
                A
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-[#e0e0e0]">Abdullah</p>
              <p className="text-xs text-[#909090]">abdullah@example.com</p>
            </div>
          </div>
          <UserDropdown />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#1d2021]">
      <DesktopSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-[#e0e0e0]">
              {navItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <UserDropdown />
          </div>
        </header>
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <div className="px-2 py-6 md:py-8">{children}</div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
