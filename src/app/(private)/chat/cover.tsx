"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSidebar } from "./sidebar-context";

export default function Cover({ children }: { children: React.ReactNode }) {
  const { toggleLeft, toggleRight, leftOpen, rightOpen } = useSidebar();

  return (
    <motion.div
      className="relative w-full bg-[radial-gradient(ellipse_100%_50%_at_top,_#98dbd5,_white)] rounded-xl shadow-xl z-10 transition-all duration-300 "
      animate={{
        marginLeft: leftOpen ? "15%" : "0px",
        marginRight: rightOpen ? "70%" : "0px",
      }}
      transition={{ type: "tween", duration: 0.03 }}
    >
      <div className="flex sticky top-0 py-2 px-4 items-center justify-between">
        <Button isIconOnly variant="light" onPress={toggleLeft}>
          <Icon
            icon="solar:sidebar-minimalistic-bold"
            fontSize={25}
            className="text-gray-700"
          />
        </Button>

        {/* Right Sidebar Toggle */}
        <Button isIconOnly variant="light" onPress={toggleRight}>
          <Icon icon="solar:pen-bold" fontSize={25} className="text-gray-700" />
        </Button>
      </div>
      {children}
    </motion.div>
  );
}
