"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PromptInput from "../home/prompt-input";
import { useCallback, useState } from "react";

export default function ChatPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const onSidebarToggle = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
    setIsEditorOpen((prev) => !prev);
  }, []);

  const onEditorToggle = useCallback(() => {
    setIsEditorOpen((prev) => !prev);
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-row h-full w-full bg-[radial-gradient(ellipse_100%_50%_at_top,_#98dbd5,_white)]">
      <aside
        className={`h-full bg-[radial-gradient(ellipse_100%_100%_at_top,_#1af9ea,_#3fafa8,_#116661)] text-white py-2 shadow-md transition-all duration-300 ${
          isSidebarCollapsed
            ? "w-16 justify-center flex items-start"
            : "w-1/4 px-4 "
        }`}
      >
        <div className="flex items-center justify-between text-2xl font-bold">
          {!isSidebarCollapsed && <h1>Esme</h1>}
          <Button isIconOnly variant="light" onPress={onSidebarToggle}>
            <Icon
              icon="solar:sidebar-minimalistic-outline"
              fontSize={25}
              color="white"
              className="self-center"
            />
          </Button>
        </div>
        {!isSidebarCollapsed && (
          <p className="text-sm font-semibold">CommonApp Essay Writer</p>
        )}

        <div className="flex flex-col items-center">
          {!isSidebarCollapsed && (
            <>
              <Image
                src="/Esme.png"
                alt="Agent"
                className="w-32 md:w-40 object-cover"
              />
              <Button className="w-full mt-4 py-3 text-xl font-bold bg-white text-[#3fafa8]">
                + New Chat
              </Button>
            </>
          )}
        </div>

        {!isSidebarCollapsed && (
          <div className="flex flex-col gap-4 mt-6">
            <h2 className="text-xl font-bold">History</h2>
            <span className="self-center font-bold opacity-70">
              No chat history
            </span>
          </div>
        )}
      </aside>

      {/* Chat Content */}
      <main className="flex flex-col items-center w-full pt-12 px-12">
        {/* Title & Introduction */}
        <div className="w-full max-w-xl">
          <h1 className="text-5xl font-bold">
            Hey, it&apos;s <span className="text-blue-500">Esme</span> 👋
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            How can I help?
          </h2>
        </div>

        <div className="flex flex-row gap-4 mt-6">
          <Card isPressable className="p-4 shadow-md w-72">
            <CardHeader>
              <Icon
                className="text-warning-500 text-3xl"
                icon="solar:pen-bold"
              />
            </CardHeader>
            <CardBody className="text-lg text-gray-600 font-bold">
              Write essay from scratch
            </CardBody>
          </Card>
          <Card isPressable className="p-4 shadow-md w-72">
            <CardHeader>
              <Icon
                className="text-primary-500 text-3xl"
                icon="solar:file-bold"
              />
            </CardHeader>
            <CardBody className="text-lg text-gray-600 font-bold">
              Upload your draft
            </CardBody>
          </Card>
        </div>

        {/* Chat Input */}
        <div className="w-full max-w-xl mt-80">
          <form className="flex items-center gap-2">
            <PromptInput
              variant="flat"
              classNames={{
                inputWrapper: "shadow-md bg-white",
                innerWrapper: "items-center bg-transparent",
                input: "text-lg bg-white font-semibold",
              }}
              endContent={
                <Tooltip showArrow content="Send message">
                  <Button
                    isIconOnly
                    className="bg-[#3fafa8]"
                    isDisabled={!prompt}
                    size="lg"
                  >
                    <Icon
                      className="[&>path]:stroke-[2px] text-white"
                      icon="solar:arrow-up-linear"
                    />
                  </Button>
                </Tooltip>
              }
              startContent={
                <Tooltip showArrow content="Add file">
                  <Button isIconOnly variant="light">
                    <Icon
                      className="text-gray-500"
                      icon="solar:paperclip-linear"
                    />
                  </Button>
                </Tooltip>
              }
              value={prompt}
              onValueChange={setPrompt}
            />
          </form>
          <p className="text-center text-sm font-bold text-gray-500 mt-3">
            Atlas agents can make mistakes. Check important info.
          </p>
        </div>
      </main>
    </div>
  );
}
