"use client";

import React from "react";
import { Avatar, Badge, Card, CardBody, Link, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { UIMessage } from "ai";

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  message: UIMessage;
};

const MessageCardHome = React.forwardRef<HTMLDivElement, MessageCardProps>(
  ({ message, ...props }, ref) => {
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
            <div className="relative w-full rounded-medium px-4 py-3 shadow-lg bg-danger-50 border border-danger-100 text-foreground">
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
                        className=" relative w-full rounded-medium px-4 py-3 text-default-600 shadow-lg border-1 
                         pr-20 text-small"
                      >
                        <p>{part.text}</p>
                      </div>
                    );
                  case "tool-invocation":
                    const { toolCallId, state, toolName } = part.toolInvocation;

                    // if (toolName === "detectPlagiarism" && state === "result") {
                    // return

                    if (
                      toolName != "createEssayFromScratchAndDisplay" &&
                      toolName != "displayEssay"
                    ) {
                      return (
                        <div
                          key={index}
                          className="relative w-full rounded-medium px-4 py-3 text-default-600 shadow-lg bg-white pr-20 text-small"
                        >
                          <p>{toolName}</p>
                        </div>
                      );
                    }

                    return (
                      <Card
                        isPressable
                        key={toolCallId}
                        isDisabled={state !== "result"}
                        className="w-[400px] shadow-lg rounded-2xl bg-white font-bold text-xl "
                      >
                        <CardBody className="flex flex-row items-center gap-4">
                          {state === "result" ? (
                            <>
                              <Icon
                                icon="solar:document-add-bold"
                                height={90}
                                className="text-[#2d7b76] h-full"
                              />
                              {part.toolInvocation.result.title}
                            </>
                          ) : (
                            <>
                              <Spinner />
                              <p>Generating...</p>
                            </>
                          )}
                        </CardBody>
                      </Card>
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

export default MessageCardHome;
MessageCardHome.displayName = "MessageCardHome";
