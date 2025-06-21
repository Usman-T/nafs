import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import "../lib/setup-logger";
import DisablePinchZoom from "@/components/ui/pinch-zoom";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nafs - Islamic Spiritual Growth Tracker",
  description:
    "Track your journey to spiritual enlightenment with our Islamic spiritual growth tracker",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nafs - Islamic Spiritual Growth Tracker",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Nafs",
    title: "Nafs - Islamic Spiritual Growth Tracker",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Nafs – Islamic Spiritual Growth Tracker",
        type: "image/png",
      },
    ],
    description: "Track your journey to spiritual enlightenment Nafs",
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icon-192x192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nafs" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />
        <meta name="application-name" content="Nafs" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geist.className} bg-[#1d2021] text-[#ebdbb2] antialiased`}
      >
        <div className="h-screen overflow-y-auto overscroll-none">
          <DisablePinchZoom />
          <SessionProvider>
            <Toaster />
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
