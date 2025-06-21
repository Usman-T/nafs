"use client";
import { useEffect } from "react";

export default function DisablePinchZoom() {
  useEffect(() => {
    const disablePinchZoom = () => {
      ["gesturestart", "gesturechange", "gestureend"].forEach((event) => {
        document.addEventListener(event, (e) => e.preventDefault());
      });

      // Prevent double-tap zoom
      let lastTouchEnd = 0;
      document.addEventListener(
        "touchend",
        function (event) {
          const now = Date.now();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );

      // Prevent multi-touch
      ["touchstart", "touchmove"].forEach((event) => {
        document.addEventListener(
          event,
          function (e) {
            if (e.touches.length > 1) {
              e.preventDefault();
            }
          },
          { passive: false }
        );
      });

      // Prevent ctrl+wheel zoom
      document.addEventListener(
        "wheel",
        (e) => {
          if (e.ctrlKey) e.preventDefault();
        },
        { passive: false }
      );
    };

    disablePinchZoom();
  }, []);

  return null;
}
