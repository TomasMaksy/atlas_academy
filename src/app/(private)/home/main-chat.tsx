"use client";

import React, { useEffect } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { PromptInputFullLineComponent } from "./prompt-input-full-line";
import { Card, cn, Link } from "@heroui/react";
import { useChat } from "@ai-sdk/react";
import DeadlineCard from "./components/deadline-card";
import ProgressCard from "./components/progress-card";
import AgentCard from "./components/agent-card";

const suggestions = [
  // {
  // 	id: "draft-email",
  // 	label: "Draft an email",
  // 	icon: "solar:document-add-outline",
  // },
  // {
  // 	id: "create-image",
  // 	label: "Create an image",
  // 	icon: "solar:gallery-linear",
  // },
  {
    id: "help-write",
    label: "Help me write",
    icon: "solar:pen-2-outline",
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    icon: "solar:lightbulb-linear",
  },
  {
    id: "make-plan",
    label: "Make a plan",
    icon: "solar:checklist-linear",
  },
  // {
  // 	id: "code",
  // 	label: "Code",
  // 	icon: "solar:code-linear",
  // },

  {
    id: "get-advice",
    label: "Get advice",
    icon: "solar:square-academic-cap-2-outline",
  },
];

type PromptSuggestion = (typeof suggestions)[number];

interface PromptSuggestionsProps {
  onSelect?: (suggestion: PromptSuggestion) => void;
}

const PromptSuggestions = ({ onSelect }: PromptSuggestionsProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.id}
          className="h-8 gap-2 bg-white rounded-full px-3 text-default-700 transition-colors !duration-350  hover:text-default-700 data-[hover=true]:text-default-700"
          startContent={
            <Icon
              className="text-default-500"
              icon={suggestion.icon}
              width={18}
            />
          }
          variant="light"
          onPress={() => onSelect?.(suggestion)}
        >
          {suggestion.label}
        </Button>
      ))}
    </div>
  );
};

export default function MainChat() {
  const { messages, input, setInput, handleSubmit, setMessages, status } =
    useChat({
      api: "/api/dummy",
    });

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    setInput(`Help me ${suggestion.label.toLowerCase()}`);
  };
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

  return (
    <>
      <div className="flex w-full items-top justify-center py-24 z-50">
        <div
          className={cn("flex w-full flex-col items-center gap-8  max-w-5xl")}
        >
          {messages.length === 0 && (
            <h1 className="text-3xl font-black leading-9 text-white tracking-tight">
              {`What's on your mind today?`}
            </h1>
          )}
          <div className="flex w-full flex-col gap-4  max-w-xl">
            <PromptInputFullLineComponent
              prompt={input}
              setPrompt={setInput}
              messages={messages}
              handleSubmit={handleSubmit}
            />
            {messages.length === 0 && (
              <PromptSuggestions onSelect={handleSuggestionSelect} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-grow pb-24 max">
        <Card className="flex flex-col gap-2 w-full max-w-5xl bg-white p-8 shadow-xl z-50">
          <p className="text-xl font-semibold text-[rgba(63,175,168,1)] ">
            Keep track of your progress
          </p>
          <div className="flex flex-row flex-grow gap-4">
            <ProgressCard />
            <DeadlineCard />
          </div>
        </Card>
      </div>
      <div className=" flex md:flex-row sm:flex-col justify-center gap-8 text-[#08010e] mx-4  mb-12">
        <Link href="/quiz" className="w-full">
          <AgentCard
            higlighted={messages.length > 1}
            color="#2a9790,#1af9c5"
            character="Esme"
            title="Common Essay Writer"
            imageSrc="/Tommy.png"
          />
        </Link>
        <AgentCard
          color="#c9d843,#d6e07e"
          character="Irven"
          title="Interview Specialist"
          imageSrc="/Irven.png"
        />
        <AgentCard
          color="#6c5b7b,#7e2ec4"
          character="Guido"
          title="University Guide"
          imageSrc="/Guido.png"
        />
        <AgentCard
          //   color red gradient with 2 different colors
          color="#ff4d4d,#ff0000"
          character="Milo"
          title="Interview Specialist"
          imageSrc="/Irven.png"
        />
      </div>
    </>
  );
}
