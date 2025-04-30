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
import toast from "react-hot-toast";
import SignOutButton from "@/app/(auth)/register/SignOutButton";

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
            ? "bg-gradient-to-r from-dark-orange to-dark-orange-light text-white shadow-md"
            : "text-dark-fg1 hover:bg-dark-bg2 hover:text-dark-fg0"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.name}</span>
      </Link>
    );
  };

  const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-dark-bg2 bg-dark-bg0 shadow-dark-glow md:hidden">
      <div className="flex items-center justify-between px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 p-2 text-xs",
                isActive
                  ? "text-dark-orange-light"
                  : "text-dark-fg2 hover:text-dark-orange-light"
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

  const DesktopSidebar = () => (
    <div className="sticky top-0 z-10 hidden h-screen w-64 flex-col border-r border-dark-bg2 bg-dark-bg0 md:flex">
      <div className="flex h-16 items-center border-b border-dark-bg2 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Moon className="h-6 w-6 text-dark-orange-light" />
          <span className="text-xl font-bold text-dark-fg0">
            Nafs
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto p-4 scrollbar-thin scrollbar-thumb-dark-bg2">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
      </div>
      <div className="border-t border-dark-bg2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-dark-bg2">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="@abdullah"
              />
              <AvatarFallback className="bg-dark-bg2 text-dark-fg0">
                A
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-dark-fg0">Abdullah</p>
              <p className="text-xs text-dark-fg2">abdullah@example.com</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-dark-fg1 hover:text-dark-fg0"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-dark-bg1 border-dark-bg2 text-dark-fg0"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-dark-bg2" />
              <DropdownMenuItem className="hover:bg-dark-bg2">
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-dark-bg2">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-dark-bg2" />
              <DropdownMenuItem
                className="text-red-500 hover:bg-dark-bg2 hover:text-red-400"
                onClick={async () => {
                  toast.success("Logged out successfully");
                }}
              >
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-dark-bg0 bg-dark-pattern">
      <DesktopSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-dark-bg2 bg-dark-bg0/80 px-6 backdrop-blur-md md:px-8 shadow-dark-glow">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-dark-fg0">
              {navItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-dark-fg1 hover:text-dark-fg0"
                >
                  <Avatar className="h-8 w-8 border border-dark-bg2">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="@abdullah"
                    />
                    <AvatarFallback className="bg-dark-bg2 text-dark-fg0">
                      A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-dark-bg1 border-dark-bg2 text-dark-fg0"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-dark-bg2" />
                <DropdownMenuItem className="hover:bg-dark-bg2">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-dark-bg2">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-bg2" />
                <DropdownMenuItem className="text-red-500 hover:bg-dark-bg2 hover:text-red-400">
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <div className="container py-6 md:py-8">{children}</div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
