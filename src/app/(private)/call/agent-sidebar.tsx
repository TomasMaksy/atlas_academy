"use client";

import { useState } from "react";
import CharacterCall from "./character-call";

export default function AgentSidebar() {
  const [chatState, setChatState] = useState("");
  return (
    <div className=" h-full w-[30%] transition-all duration-300">
      <div className=" h-full text-white transition-all duration-300">
        <div className="flex flex-col text-5xl font-bold py-8 px-10">
          <div className="flex items-center justify-between text-5xl font-bold">
            <h1>Ana</h1>
          </div>
          <p className="text-2xl font-semibold">Interview Specialist</p>
        </div>
        <CharacterCall chatState={chatState}></CharacterCall>
      </div>
    </div>
  );
}
