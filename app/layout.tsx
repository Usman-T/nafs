import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nafs - Islamic Spiritual Growth Tracker",
  description:
    "Track your journey to spiritual enlightenment with our Islamic spiritual growth tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-dark-bg0 text-dark-fg0 `}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
