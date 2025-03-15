"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Essay = {
  __html: string;
  title: string;
};

type EssayContextType = {
  essay: Essay | undefined;
  setEssay: (essay: Essay | undefined) => void;
};

const EssayContext = createContext<EssayContextType | undefined>(undefined);

export function EssayProvider({ children }: { children: ReactNode }) {
  const [essay, setEssay] = useState<Essay | undefined>(undefined);

  return (
    <EssayContext.Provider value={{ essay, setEssay }}>
      {children}
    </EssayContext.Provider>
  );
}

export function useEssay() {
  const context = useContext(EssayContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
