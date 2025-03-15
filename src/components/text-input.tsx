"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";

interface TextInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export function TextInput({ onSubmit, disabled = false }: TextInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={disabled || !text.trim()} isIconOnly>
        Send
      </Button>
    </form>
  );
}
