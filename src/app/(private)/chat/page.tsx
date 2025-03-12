import AgentSidebar from "./agent-sidebar";

import SidebarToggle from "./sidebar-toggle";
import { SidebarProvider } from "./sidebar-context";
import { Chat } from "./chat";

export default async function Page() {
  return (
    <SidebarProvider>
      <div className="flex flex-row h-screen w-full bg-[radial-gradient(ellipse_100%_50%_at_top,_#98dbd5,_white)]">
        <AgentSidebar />
        <div className="flex flex-col w-full min-w-0 h-dvh bg-background">
          <div className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
            <SidebarToggle />
          </div>
          <Chat />
        </div>
      </div>
    </SidebarProvider>
  );
}
