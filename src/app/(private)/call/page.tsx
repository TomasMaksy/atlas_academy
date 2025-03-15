"use client";

import AgentSidebar from "./agent-sidebar";

export default function Page() {
  return (
    // "#ff4d4d,#ff0000"
    <div className="h-full w-full flex relative bg-[radial-gradient(ellipse_at_top,_#9b5de5_10%,_#5a189a_90%)] shadow-inner-strong">
      <AgentSidebar />
      <div className="w-[70%] h-full p-2">
        <p>Conversation</p>
      </div>
    </div>
  );
}
