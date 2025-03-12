"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSidebar } from "./sidebar-context";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button isIconOnly variant="light" onPress={toggleSidebar}>
      <Icon
        icon="solar:sidebar-minimalistic-outline"
        fontSize={25}
        className="self-center text-[#13615d]"
      />
    </Button>
  );
}
