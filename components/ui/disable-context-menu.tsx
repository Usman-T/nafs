"use client";

import { useEffect } from "react";

export default function DisableContextMenu() {
  useEffect(() => {
    const preventMenu = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", preventMenu);
    return () => document.removeEventListener("contextmenu", preventMenu);
  }, []);

  return null;
}
