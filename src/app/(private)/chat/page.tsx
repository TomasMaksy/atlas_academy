"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.css";
import Chat from "./chat";
import Cover from "./cover";
import EssayEditor from "./essay-editor";
import { Badge, Button, Image, Link } from "@heroui/react";
import Character from "@/components/character/character";

export default function Page() {
  const [chatState, setChatState] = useState("");
  const [hidden, setHidden] = useState(true);

  return (
    <div className="h-full w-full flex relative bg-[radial-gradient(ellipse_100%_100%_at_top,_#1af9ea,_#3fafa8,_#116661)] bg-[length:20%_100%] bg-left bg-no-repeat shadow-inner-strong">
      <div className="absolute left-0 h-full w-[15%] transition-all duration-300">
        <div className="h-full px-4 text-white py-2 shadow-md transition-all duration-300">
          <>
            <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Tommy</h1>
            </div>
            <p className="text-sm font-semibold">CommonApp Essay Writer</p>

            <div className="flex flex-col items-center">
              <>
                <Character
                  chatState={chatState}
                  closeup={true}
                  model={"/models/esme.glb"}
                  talk={false}
                ></Character>
                <Button
                  onPress={() => setHidden((prev) => !prev)}
                  className="w-full mt-0 py-3 text-xl font-bold bg-white text-[#3fafa8]"
                >
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

          {/* Guido at the bottom with thought bubble */}
          <AnimatePresence>
            {!hidden && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-[-30px] flex flex-col items-center"
              >
                <Badge
                  content="x"
                  onClick={() => setHidden(true)}
                  className="cursor-pointer shadow-md bg-[#9b5de5] text-white font-bold pb-1 hover:scale-110"
                >
                  <div className="relative mb-[-2px] rounded-2xl bg-white text-black text-sm p-3 shadow-lg w-[230px]">
                    <p className="font-semibold">
                      Whenever you feel like you are done with the essay, come
                      over and let’s practice for your interview.
                    </p>
                    <Button
                      fullWidth
                      as={Link}
                      href="/call"
                      className="mt-3 bg-[#9b5de5] text-white font-bold shadow-md"
                    >
                      {"Let's Practice!"}
                    </Button>
                  </div>
                </Badge>
                <Image alt="Guido" width={300} src="guido_1.png" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Cover>
        <Chat openGuido={() => setHidden(false)} setChatState={setChatState} />
      </Cover>
      <EssayEditor />
    </div>
  );
}
