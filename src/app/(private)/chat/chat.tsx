import Messages from "./messages";
import { v4 as generateUUID } from "uuid";

import { PromptInputFullLineComponent } from "./prompt-input-full-line";

export async function Chat() {
  const id = generateUUID();

  return (
    <div className="relative flex h-[95%] flex-col max-w-full">
      <Messages id={id} initialMessages={[]} />

      <div className="flex mx-auto mt-auto px-4 pb-6 w-full md:max-w-3xl">
        <PromptInputFullLineComponent id={id} />
      </div>
    </div>
  );
}
