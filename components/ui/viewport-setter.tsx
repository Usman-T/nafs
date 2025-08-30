"use client";

import { useEffect } from "react";

export default function ViewportSetter() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();

    setTimeout(setVH, 100);
    setTimeout(setVH, 300);
    setTimeout(setVH, 500);

    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", () => {
      setTimeout(setVH, 100);
    });

    window.addEventListener("focus", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
      window.removeEventListener("focus", setVH);
    };
  }, []);

  return null;
}