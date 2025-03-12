import Messages from "./messages";
import { v4 as generateUUID } from "uuid";

import { PromptInputFullLineComponent } from "./prompt-input-full-line";

export async function Chat() {
  const id = generateUUID();

  return (
    <div className="relative flex h-full flex-col max-w-full">
      <Messages id={id} initialMessages={[]} />

      <div className="flex mx-auto mt-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <PromptInputFullLineComponent id={id} />
      </div>
    </div>
  );
}
