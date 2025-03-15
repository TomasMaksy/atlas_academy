import Character from "./character";
import Chat from "./chat";
import Cover from "./cover";
import { EssayProvider } from "./essay-context";
import EssayEditor from "./essay-editor";

import { SidebarProvider } from "./sidebar-context";
import { Button } from "@heroui/react";

export default function Page() {
  return (
    <SidebarProvider>
      <EssayProvider>
        <div className="h-full w-full flex relative  bg-white shadow-inner-strong">
          <div className="absolute left-0 h-full w-[15%] transition-all duration-300">
            <div className="h-full px-4 text-white py-2 shadow-md transition-all duration-300">
              <>
                <div className="flex items-center justify-between text-2xl font-bold">
                  <h1>Esme</h1>
                </div>
                <p className="text-sm font-semibold">CommonApp Essay Writer</p>

                <div className="flex flex-col items-center">
                  <>
                    {/* <Image
                    src="/Esme.png"
                    alt="Agent"
                    className="w-40 object-cover rounded-full"
                  /> */}
                    <Character></Character>
                    <Button className="w-full mt-0 py-3 text-xl font-bold bg-white text-[#3fafa8]">
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
            </div>
          </div>
          <Cover>
            <Chat />
          </Cover>
          <EssayEditor />
        </div>
      </EssayProvider>
    </SidebarProvider>
  );
}
