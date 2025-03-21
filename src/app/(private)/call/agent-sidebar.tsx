"use client";

// import CharacterCall from "./character-call";

import Character from "@/components/character/character";

export default function AgentSidebar() {
  return (
    <div className=" h-full w-[30%] transition-all duration-300">
      <div className=" h-full text-white transition-all duration-300 flex flex-col justify-between">
        <div className="flex flex-col text-5xl font-bold py-8 px-10">
          <div className="flex items-center justify-between text-5xl font-bold">
            <h1>Milo</h1>
          </div>
          <p className="text-2xl font-semibold">Interview Specialist</p>
        </div>
        {/* <CharacterCall chatState={""}></CharacterCall> */}
        <Character
          chatState={""}
          closeup={false}
          model={"/models/guido.glb"}
          talk={true}
        ></Character>
      </div>
    </div>
  );
}
