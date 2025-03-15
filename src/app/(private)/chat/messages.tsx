"use client";

import { Message } from "ai";
import { motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import {
  Card,
  CardHeader,
  CardBody,
  ScrollShadow,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import MessageCard from "./message-card";


interface MessagesProps {
  id: string;
  initialMessages: Array<Message>;
  setChatState: (state: string) => void;
}

export default function Messages({ id, initialMessages, setChatState }: MessagesProps) {
  const { messages, status, setMessages, append } = useChat({
    id,
    initialMessages,
    experimental_throttle: 50,
  });

  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChatState(status);
    if (status === "submitted") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: "loading", role: "assistant", content: "" },
      ]);
    } else {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== "loading")
      );
    }
  }, [setMessages, status, setChatState]);

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    // Imitate a file upload process with a timeout of 4 seconds.
    setTimeout(() => {
      setIsUploading(false);
      append({ role: "user", content: "I have uploaded a file" });
    }, 4000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      processFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default to allow drop event
  };

  return messages.length === 0 ? (
    <motion.div
      key="overview"
      className="mx-auto mt-20 text-center md:max-w-3xl px-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-start">
        <h1 className="text-5xl font-bold">
          Hey, it&apos;s <span className="text-[#3fafa8]">Esme</span> 👋
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">How can I help?</h2>
      </div>
      <div className="flex flex-wrap gap-6 mt-8 justify-center">
        <Card
          isPressable
          classNames={{
            base: "p-4 shadow-md w-full hover:shadow-lg min-w-[300px] flex-1",
            body: "text-lg text-gray-600 font-bold",
          }}
          onPress={() =>
            append({
              role: "user",
              content: "Write me a common app essay from scratch",
            })
          }
        >
          <CardHeader>
            <Icon className="text-warning-500 text-3xl" icon="solar:pen-bold" />
          </CardHeader>
          <CardBody>Write essay from scratch</CardBody>
        </Card>
        <Card
          isPressable
          classNames={{
            base: "flex-1 p-4 shadow-md w-full bg-transparent min-w-[300px] shadow-none border-dashed border-2 border-gray-400 hover:border-gray-500 cursor-pointer",
            body: "text-lg text-gray-600 font-bold",
          }}
          onPress={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CardHeader>
            <Icon
              className="text-primary-500 text-3xl"
              icon="solar:file-bold"
            />
          </CardHeader>
          <CardBody>
            {isUploading ? (
              <span className="flex items-center text-center gap-3">
                <Spinner className="h-1 pb-1" variant="dots" />
                Uploading...
              </span>
            ) : (
              "Upload your draft"
            )}
          </CardBody>
        </Card>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>
    </motion.div>
  ) : (
    // return (
    <ScrollShadow className="flex h-full max-h-[80vh] flex-col gap-6 overflow-y-auto p-6 pb-8">
      {messages.map((message, id) => (
        <MessageCard message={message} key={id} />
      ))}
      {/* <MessageCard
        message={{
          role: "assistant",
          parts: [
            {
              type: "tool-invocation",
              toolInvocation: {
                toolCallId: "toolCallId",
                // state: "result",
                result: "Complete",
              },
            },
          ],
        }}
        key={id}
      /> */}
    </ScrollShadow>
  );
}
