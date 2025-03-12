"use client";

import { Button, cn, Image } from "@heroui/react";

import { useSidebar } from "./sidebar-context";

export default function AgentSidebar() {
  const { isSidebarCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "h-full w-1/5 px-4 bg-[radial-gradient(ellipse_100%_100%_at_top,_#1af9ea,_#3fafa8,_#116661)] text-white py-2 shadow-md transition-all duration-300",
        isSidebarCollapsed && "w-0 p-0"
      )}
    >
      {!isSidebarCollapsed && (
        <>
          <div className="flex items-center justify-between text-2xl font-bold">
            <h1>Esme</h1>
          </div>
          <p className="text-sm font-semibold">CommonApp Essay Writer</p>

          <div className="flex flex-col items-center">
            <>
              <Image
                src="/Esme.png"
                alt="Agent"
                className="w-40 object-cover rounded-full"
              />
              <Button className="w-full mt-4 py-3 text-xl font-bold bg-white text-[#3fafa8]">
                + New Chat
              </Button>
            </>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <h2 className="text-xl font-bold">History</h2>
            <span className="self-center font-bold opacity-70">
              No chat history
            </span>
          </div>
        </>
      )}
    </aside>
  );
}
