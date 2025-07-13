"use client";

import { createContext, useContext, useState } from "react";

const CommandPaletteContext = createContext<{
  open: boolean;
  setOpen: (val: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

export const CommandPaletteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPalette = () => useContext(CommandPaletteContext);
