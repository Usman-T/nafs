"use client";
import { useCommandPalette } from "@/lib/context/command-palette-context";
import CommandPalette from "@/components/ui/guidance-command";

const CommandPaletteWrapper = () => {
  const { open, setOpen } = useCommandPalette();

  return (
    <CommandPalette
      isOpen={open}
      onClose={() => {
        localStorage.removeItem("nafs-hide-mobile-nav");
        window.dispatchEvent(new Event("storage"));
        setOpen(false);
      }}
    />
  );
};

export default CommandPaletteWrapper;
