"use client";

import React from "react";
import { Avatar, Badge, Link, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";
import { motion } from "framer-motion";

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  message: React.ReactNode;
  loading?: boolean;
  failed?: boolean;
  role: "user" | "assistant" | "system" | "data";
  messageClassName?: string;
};

const MessageCard = React.forwardRef<HTMLDivElement, MessageCardProps>(
  (
    { message, role, failed, loading, className, messageClassName, ...props },
    ref
  ) => {
    const messageRef = React.useRef<HTMLDivElement>(null);

    const failedMessage = (
      <p>
        Something went wrong, if the issue persists please contact us through
        our help center at&nbsp;
        <Link href="mailto:support@acmeai.com" size="sm">
          tomasmaksimovic@gmail.com
        </Link>
      </p>
    );

    return (
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div {...props} ref={ref} className={cn("flex gap-3", className)}>
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
              isInvisible={!failed}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                className="shadow"
                src={
                  role === "assistant"
                    ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                    : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
                }
              />
            </Badge>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div
              className={cn(
                "relative w-full rounded-medium px-4 py-3 text-default-600 shadow-lg bg-white",
                failed &&
                  "bg-danger-50 border border-danger-100 text-foreground",
                messageClassName
              )}
            >
              <div ref={messageRef} className={"pr-20 text-small"}>
                {loading ? (
                  <Spinner variant="dots" className="h-1" />
                ) : failed ? (
                  failedMessage
                ) : (
                  message
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

export default MessageCard;

MessageCard.displayName = "MessageCard";
