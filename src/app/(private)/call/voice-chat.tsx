"use client";

import "./styles.css";
import React, { useEffect } from "react";
import useWebRTCAudioSession from "@/app/(private)/call/use-webrtc";

import { Button, ScrollShadow } from "@heroui/react";
import VoiceCard from "./voice-card";
import { Icon } from "@iconify/react/dist/iconify.js";

export const VoiceChat: React.FC = () => {
  // State for voice selection
  // const [voice, setVoice] = useState("ash");
  // const [sent, setSent] = React.useState(false);
  const [displayMsg, setDisplayMsg] = React.useState<
    {
      text: string;
      role: string;
    }[]
  >([]);

  // WebRTC Audio Session Hook
  const {
    isSessionActive,
    // registerFunction,
    handleStartStopClick,
    // msgs,
    // startSession,
    // sendTextMessage,
    conversation,
  } = useWebRTCAudioSession("echo");

  // Get all tools functions
  // const toolsFunctions = useToolsFunctions();

  // useEffect(() => {
  //   // Register all functions by iterating over the object
  //   Object.entries(toolsFunctions).forEach(([name, func]) => {
  //     const functionNames: Record<string, string> = {
  //       timeFunction: "getCurrentTime",
  //       backgroundFunction: "changeBackgroundColor",
  //       partyFunction: "partyMode",
  //       launchWebsite: "launchWebsite",
  //       copyToClipboard: "copyToClipboard",
  //       scrapeWebsite: "scrapeWebsite",
  //     };

  //     registerFunction(functionNames[name], func);
  //   });
  // }, [registerFunction, toolsFunctions]);

  // useEffect(() => {
  //   startSession();
  //   setTimeout(() => {
  //     if (sent) return;
  //     sendTextMessage("Start interviewing me");
  //     setSent(true);
  //   }, 7000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // only add conversation to displayMsg but dont delete
    if (conversation.length != 0) {
      setDisplayMsg(conversation);
    }
  }, [conversation, displayMsg.length]);

  return (
    <div className="h-full pt-20 pr-40 flex flex-col justify-between">
      {/* <Button onPress={handleStartStopClick}>
        {isSessionActive ? "Stop" : "Start"}
      </Button> */}

      <ScrollShadow className="flex h-[600px] flex-col gap-6 overflow-y-auto pr-20">
        {displayMsg.map((msg, index) => {
          // if (index === 0) return null;
          if (!msg.text || msg.text === "") return null;

          return (
            <VoiceCard
              key={index}
              message={msg.text}
              classNames={{
                base: "min-w-[400px] shadow-lg",
              }}
              avatar={
                msg.role === "assistant"
                  ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                  : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
              }
              isRTL={msg.role === "user"}
              name={msg.role === "user" ? "You" : "Milo"}
            />
          );
        })}
      </ScrollShadow>
      <div className="flex justify-end px-20 mb-20">
        <Button
          isIconOnly
          radius="full"
          size="lg"
          className=" text-[#333] hover:bg-[#e0e0e0] hover:text-[#222] shadow-lg p-2 hover:shadow-xl hover:scale-105"
          onPress={handleStartStopClick}
        >
          {/* {isSessionActive ? "Stop" : "Start"} */}
          <Icon
            width={40}
            icon={
              isSessionActive
                ? "solar:pause-bold"
                : "solar:microphone-large-bold"
            }
          />
        </Button>
      </div>
    </div>
  );
};
