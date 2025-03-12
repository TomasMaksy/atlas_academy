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
import MessageCard from "./message-card";
import { useEffect, useRef, useState } from "react";

interface MessagesProps {
  id: string;
  initialMessages: Array<Message>;
}

export default function Messages({ id, initialMessages }: MessagesProps) {
  const { messages, status, setMessages, append } = useChat({
    id,
    initialMessages,
  });

  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
  }, [setMessages, status]);

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
      className="mx-auto mt-20 text-center"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card
          isPressable
          classNames={{
            base: "p-4 shadow-md w-full hover:shadow-lg min-w-[400px]",
            body: "text-lg text-gray-600 font-bold",
          }}
          onPress={() =>
            append({ role: "user", content: "Write me a common app essay" })
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
            base: "p-4 shadow-md w-full bg-transparent min-w-[400px] shadow-none border-dashed border-2 border-gray-400 hover:border-gray-500 cursor-pointer",
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
                <Spinner className="h-1 pb-1"  variant="dots" />
                Uploading...
              </span>
            ) : (
              "Upload your draft"
            )}
          </CardBody>
        </Card>
        {/* Hidden file input to trigger file selection */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>
    </motion.div>
  ) : (
    <ScrollShadow className="flex h-full max-h-[80vh] flex-col gap-6 overflow-y-auto p-6 pb-8">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }} // Delay increases with index for sequential animation
        >
          <MessageCard
            status={message.id === "error" ? "failed" : "success"}
            avatar={
              message.role === "assistant"
                ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
            }
            loading={message.id === "loading"}
            message={message.content}
            messageClassName={
              message.role === "user"
                ? "bg-content3 text-content3-foreground bg-white"
                : message.id !== "error"
                ? "bg-white"
                : ""
            }
          />
        </motion.div>
      ))}
    </ScrollShadow>
  );
}
