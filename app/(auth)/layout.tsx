import { MoonIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col bg-[#121212]">
      <header className="border-b border-[#2e2e2e] bg-[#121212]/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <MoonIcon className="h-6 w-6 text-[#d65d0e]" />
            <span className="text-xl font-bold text-[#e0e0e0]">
              Nafs
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md border border-[#2e2e2e] bg-transparent px-4 py-2 text-sm font-medium text-[#e0e0e0] shadow-sm transition-colors hover:bg-[#1e1e1e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d65d0e]"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">{children}</div>
      </main>
      <footer className="border-t border-[#2e2e2e] bg-[#121212] py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MoonIcon className="h-5 w-5 text-[#d65d0e]" />
              <span className="text-lg font-bold text-[#e0e0e0]">
                Nafs
              </span>
            </div>
            <div className="text-sm text-[#909090]">
              &copy; {new Date().getFullYear()} Nafs. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;