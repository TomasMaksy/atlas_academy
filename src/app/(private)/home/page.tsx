import React from "react";
import MainChat from "./main-chat";
import AgentCard from "./components/agent-card";
import messages from "../chat/messages";
import ProgressCard from "./components/progress-card";
import DeadlineCard from "./components/deadline-card";
// import ScreenTime from "./components/screen-time";
// import { SidebarProvider } from "../chat/sidebar-context";

export default async function Component() {
  return (
    <div className="flex w-full  bg-[radial-gradient(ellipse_75%_40%_at_top,rgba(63,175,168,1),rgba(250,255,245,0))] flex-col h-full items-center gap-4">
      <div className="w-full flex items-center scale-95">
        <MainChat />
      </div>
      <div className="flex flex-col items-center flex-grow gap-4 w-full max-w-5xl scale-95">
        <span className="text-2xl text-left font-bold text-default-500 w-full">
          Track your progress
        </span>
        <div className="flex flex-row flex-grow gap-8 max-h-[160px] justify-between w-full">
          <ProgressCard />
          <DeadlineCard />
          {/* <ScreenTime /> */}
        </div>
      </div>
      <div className="flex flex-col w-full px-10">
        <span className="text-2xl font-bold text-default-500 py-4 text-left w-full">
          AI Tutors
        </span>
        <div className=" flex w-full md:flex-row sm:flex-col justify-center gap-8 text-[#08010e] mb-16">
          <AgentCard
            higlighted={messages.length > 0}
            color="#3fafa8,#1af9ea"
            character="Tommy"
            title="Common Essay Writer"
            imageSrc="/esme_1.png"
          />
          <AgentCard
            color="#c9d843,#d6e07e"
            character="Mani"
            title="General Support"
            imageSrc="/irven_2.png"
          />
          <AgentCard
            //   color red gradient with 2 different colors
            color="#6c5b7b,#7e2ec4"
            character="Milo"
            title="Interview Specialist"
            imageSrc="/guido_3.png"
          />
          <AgentCard
            color="#ff4d4d,#ff0000"
            character="Guido"
            title="University Guide"
            imageSrc="milo_4.png"
          />
        </div>
      </div>
    </div>
  );
}
