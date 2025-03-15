"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Essay = {
  __html: string;
  title: string;
};

type EssayContextType = {
  id: string | undefined;
  essay: Essay | undefined;
  isLoading: boolean;
  setId: (id: string | undefined) => void;
  setEssay: (essay: Essay | undefined) => void;
};

const EssayContext = createContext<EssayContextType | undefined>(undefined);

export function EssayProvider({ children }: { children: ReactNode }) {
  const [essay, setEssay] = useState<Essay | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`/api/essay/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            return;
          }

          const { id, title, html: notActuallyHTML } = data;
          
          console.log("Essay fetched", { id, title, notActuallyHTML });

          const realHtml = notActuallyHTML
            .split("\n") // Split string by newlines
            .map((line: string) => `<p>${line.trim()}</p>`) // Wrap each line in a <p> tag
            .join("");

          setEssay({
            title,
            __html: realHtml as string,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch essay", error);
        });
    } else {
      setEssay(undefined);
    }
    setLoading(false);
  }, [id]);

  return (
    <EssayContext.Provider
      value={{ isLoading: loading, id, essay, setId, setEssay }}
    >
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
