"use client";

import { useEffect } from "react";

export default function DisablePinchZoom() {
  useEffect(() => {
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    const preventCtrlWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventMultiTouch, { passive: false });
    document.addEventListener("touchend", preventDoubleTapZoom, { passive: false });
    document.addEventListener("wheel", preventCtrlWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventMultiTouch);
      document.removeEventListener("touchend", preventDoubleTapZoom);
      document.removeEventListener("wheel", preventCtrlWheel);
    };
  }, []); 

  return null;
}