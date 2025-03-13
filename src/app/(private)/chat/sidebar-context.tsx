"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  leftOpen: boolean;
  rightOpen: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);

  function toggleLeft() {
    setLeftOpen((prev) => !prev);
    setRightOpen(false);
  }

  function toggleRight() {
    setRightOpen((prev) => !prev);
    setLeftOpen(false);
  }

  return (
    <SidebarContext.Provider
      value={{ leftOpen, rightOpen, toggleLeft, toggleRight }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
