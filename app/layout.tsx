import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spiritual Path - Islamic Spiritual Growth Tracker",
  description:
    "Track your journey to spiritual enlightenment with our Islamic spiritual growth tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${inter.className} bg-dark-bg0 text-dark-fg0 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
