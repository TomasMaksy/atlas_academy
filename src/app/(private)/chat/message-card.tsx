"use client";

import React from "react";
import { Avatar, Badge, Button, Link, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { UIMessage } from "ai";
// import { useEssay } from "./essay-context";

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  message: UIMessage;
};

const MessageCard = React.forwardRef<HTMLDivElement, MessageCardProps>(
  ({ message, ...props }, ref) => {
    // const { essay, setEssay } = useEssay();

    const messageFailed = message.id === "failed";
    const messageLoading = message.id === "loading";

    return (
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div {...props} ref={ref} className="flex gap-3">
          <div className="relative flex-none">
            <Badge
              isOneChar
              color="danger"
              content={
                <Icon
                  className="text-background"
                  icon="gravity-ui:circle-exclamation-fill"
                />
              }
              isInvisible={!(message.id === "failed")}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                className="shadow"
                src={
                  message.role === "assistant"
                    ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                    : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
                }
              />
            </Badge>
          </div>
          {messageLoading ? (
            <Spinner variant="dots" />
          ) : messageFailed ? (
            <div className="relative w-full rounded-medium px-4 py-3 text-default-600 shadow-lg bg-danger-50 border border-danger-100 text-foreground">
              <div className={"pr-20 text-small"}>
                <p>
                  Something went wrong, if the issue persists please contact us
                  through our help center at&nbsp;
                  <Link href="mailto:support@acmeai.com" size="sm">
                    tomasmaksimovic@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {message.parts.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={index}
                        className="relative w-full rounded-medium px-4 py-3 text-default-600 shadow-lg bg-white pr-20 text-small"
                      >
                        <p>{part.text}</p>
                      </div>
                    );
                  case "tool-invocation":
                    const { toolCallId, state } = part.toolInvocation;
                    if (state === "result") {
                      // const { result } = part.toolInvocation;
                      return (
                        <div
                          key={toolCallId}
                          className="shadow-lg rounded-2xl bg-white p-4"
                        >
                          Complete
                        </div>
                      );
                    }
                    return (
                      <div
                        key={toolCallId}
                        className="w-[350px] shadow-lg rounded-2xl p-4 bg-gray-200 border border-gray-300 items-center justify-between  flex gap-4"
                      >
                        <Spinner />
                        <p className="text-gray-600 font-bold text-xl">
                          Generating...
                        </p>
                        <Button isIconOnly variant="light">
                          <Icon
                            icon="solar:full-screen-square-broken"
                            width={42}
                            className="text-[#2d7b76]"
                          />
                        </Button>
                      </div>
                    );
                }
              })}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

export default MessageCard;

MessageCard.displayName = "MessageCard";
