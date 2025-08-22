"use client";

import Link from "next/link";
import {
  Calendar,
  BarChart3,
  Settings,
  BookOpen,
  Home,
  User,
  LogOutIcon,
  WifiOff,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { toast } from "sonner";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Progress", href: "/dashboard/progress", icon: BarChart3 },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Guidance", href: "/dashboard/guidance", icon: BookOpen },
];

export default function OfflinePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#1d2021]">
      <header className="justify-between sticky top-0 z-10 flex h-16 items-center border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex-1 flex space-x-2">
            <span className="text-xl font-bold text-[#e0e0e0]">Offline</span>
          </div>
        </Link>
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
            <Link href="/dashboard/settings">
              <DropdownMenuItem className="hover:bg-[#2e2e2e]">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-[#2e2e2e]" />
            <DropdownMenuItem className="text-red-500 hover:bg-[#2e2e2e] hover:text-red-400">
              <button
                onClick={() => toast.error("Internet connection needed")}
                className="w-full flex items-center text-red-500 hover:bg-dark-bg2 hover:text-red-400 px-2 py-1 text-sm"
              >
                <LogOutIcon className="mr-2 h-4 w-4" /> Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <WifiOff className="h-16 w-16 text-[#fe8019] mx-auto opacity-80" />

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#ebdbb2]">
              You're offline
            </h2>
            <p className="text-[#a89984] text-sm leading-relaxed">
              Check your connection and try again. Your progress is saved
              locally.
            </p>
          </div>

          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-[#fe8019] hover:bg-[#d65d0e] text-white px-6 py-2 rounded-lg transition-colors"
          >
            <RefreshCw
              className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")}
            />
            {isRefreshing ? "Refreshing..." : "Try again"}
          </Button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2e2e2e] bg-[#1d2021] shadow-lg md:hidden">
        <div className="flex items-center justify-between px-2">
          {navItems.map((item) => {
            const isActive = false;
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
    </div>
  );
}
