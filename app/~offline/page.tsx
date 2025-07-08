"use client";

import Link from "next/link";
import {
  Calendar,
  BarChart3,
  Settings,
  BookOpen,
  Home,
} from "lucide-react";
import type { Metadata } from "next";

import { cn } from "@/lib/utils/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/custom/logo";

export const metadata: Metadata = {
  title: "Nafs - Offline",
  description: "You are currently offline. Some features may not work.",
};

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Progress", href: "/dashboard/progress", icon: BarChart3 },
  { name: "Guidance", href: "/dashboard/guidance", icon: BookOpen },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function OfflinePage() {
  return (
    <div className="md:flex bg-[#1d2021] min-h-screen">
      <div className="sticky top-0 hidden h-screen w-64 flex-col border-r border-[#2e2e2e] bg-[#1d2021] md:flex">
        <div className="flex h-16 items-center border-b border-[#2e2e2e] px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-[#fe8019]" />
            <span className="text-xl font-bold text-[#e0e0e0]">Nafs</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300 text-[#909090] hover:bg-[#2e2e2e] hover:text-[#fe8019]"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#2e2e2e] p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-[#2e2e2e]">
              <AvatarFallback className="bg-[#2e2e2e] text-[#e0e0e0]">U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-[#e0e0e0] truncate max-w-[120px]">
                Offline User
              </p>
              <p className="text-xs text-[#909090] truncate max-w-[120px]">
                No connection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-[#e0e0e0]">Offline</h1>
          </div>
        </header>

        <main className="flex-1 bg-[#1d2021] pb-16 md:pb-0 overflow-auto flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-[#ebdbb2]">You're Offline</h2>
            <p className="text-[#a89984] text-sm max-w-md mx-auto">
              Some features may not work while you're disconnected. Reconnect to sync your progress and access full functionality.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
