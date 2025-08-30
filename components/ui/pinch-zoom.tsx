"use client";

import { useEffect } from "react";

export default function DisablePinchZoom() {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent multi-touch (pinch zoom)
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Prevent double-tap zoom
      const now = Date.now();
      const lastTouchEnd = parseInt(
        localStorage.getItem("lastTouchEnd") || "0"
      );
      if (now - lastTouchEnd < 300) {
        e.preventDefault();
      }
      localStorage.setItem("lastTouchEnd", now.toString());
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent Ctrl+scroll zoom
      if (e.ctrlKey) e.preventDefault();
    };

    // Add passive: false only where necessary
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}