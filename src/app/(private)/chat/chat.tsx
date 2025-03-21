import Messages from "./messages";
import { PromptInputFullLineComponent } from "./prompt-input-full-line";

interface ChatProps {
  setChatState: (state: string) => void;
  openGuido: () => void;
}

export default function Chat({ setChatState, openGuido }: ChatProps) {
  const id = "randomId";

  return (
    <>
      <div className="relative flex h-[95%] flex-col max-w-full">
        <Messages id={id} initialMessages={[]} setChatState={setChatState} openGuido={openGuido} />

        <div className="flex mx-auto mt-auto px-4 pb-6 w-full md:max-w-3xl">
          <PromptInputFullLineComponent id={id} />
        </div>
      </div>
    </>
  );
}
