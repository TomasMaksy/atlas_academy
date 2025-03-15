import Messages from "./messages";
import { PromptInputFullLineComponent } from "./prompt-input-full-line";

export default async function Chat() {
  const id = "randomId";

  return (
    <>
      <div className="relative flex h-[95%] flex-col max-w-full">
        <Messages id={id} initialMessages={[]} />

        <div className="flex mx-auto mt-auto px-4 pb-6 w-full md:max-w-3xl">
          <PromptInputFullLineComponent id={id} />
        </div>
      </div>
    </>
  );
}
