"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEssay } from "./essay-context";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useSidebar } from "./sidebar-context";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
// import { useChat } from "@ai-sdk/react";

import { useRef } from "react";

export default function EssayEditor() {
  const { id, essay, setEssay, isLoading } = useEssay();
  const [airate, setAirate] = useState<number>(37);
  const [airateLoading, setAirateLoading] = useState<boolean>(false);
  const { rightOpen } = useSidebar();

  // Hover state and timer ref
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Editor setup
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Highlight.configure({ multicolor: true }),
    ],
    content: essay?.__html,
    onUpdate: ({ editor }) => {
      setEssay({
        __html: editor.getHTML(),
        title: essay?.title || "",
      });
    },
  });

  function setRandomAirate() {
    setAirateLoading(true);
    setTimeout(() => {
      setAirateLoading(false);
      setAirate(Math.floor(Math.random() * 16) + 32);
    }, 3000);
  }

  useEffect(() => {
    setRandomAirate();
  }, [id]);

  useEffect(() => {
    if (editor && editor?.isEmpty) {
      editor.commands.setContent(essay?.__html || "", true);
    }
  }, [editor, essay?.__html]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseEnter() {
    hoverTimerRef.current = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 4 seconds delay
  }

  function handleMouseLeave() {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowPopup(false);
  }

  function highlightText(reason: "suggestions" | "plagiarism") {
    if (!editor) return;

    const text = editor.getText();
    const sentences = text.match(/[^.!?]+[.!?]/g); // Splitting text into sentences

    if (sentences && sentences.length > 0) {
      const randomSentences = sentences
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 6) + 6);

      for (const sentence of randomSentences) {
        editor
          .chain()
          .focus()
          .setTextSelection({
            from: text.indexOf(sentence) + 1,
            to: text.indexOf(sentence) + sentence.length + 1,
          })
          .toggleHighlight({
            color: reason === "suggestions" ? "#FFFFED" : "#ffcccc",
          })
          .run();
      }
    }
  }

  return (
    <div className="absolute right-0 h-full w-[70%] transition-all duration-300 pb-12 space-y-10 flex flex-col justify-between px-40 pt-20">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ScrollShadow className="space-y-10 scrollbar-hidden">
            <h1 className="text-4xl font-bold">{essay?.title || ""}</h1>

            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <EditorContent editor={editor} />
              {showPopup && (
                <div
                  className="fixed bg-[#3fafa8] rounded-lg shadow-lg
				   text-white px-3 py-2  text-sm pointer-events-none z-50 font-bold flex flex-row gap-2"
                  style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y - 20}px`, // 40px above cursor
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <Icon
                    width={22}
                    className="font-bold"
                    icon="solar:pen-bold"
                  />
                  Add perplexity to this sentence to reduce AI plagiarism
                </div>
              )}
            </div>
          </ScrollShadow>

          <span className="w-full flex justify-between">
            <Chip
              endContent={
                <Button
                  isIconOnly
                  isLoading={airateLoading}
                  radius="full"
                  onPress={setRandomAirate}
                  className="bg-transparent text-white shadow-none"
                >
                  <Icon
                    width={22}
                    className="font-bold"
                    icon="solar:refresh-linear"
                  />
                </Button>
              }
              size="lg"
              className="bg-[#3fafa8] shadow-lg text-white pr-0"
              classNames={{
                content: "text-lg font-extrabold",
              }}
            >
              AI: {airate}%
            </Chip>

            {rightOpen && (
              <Dropdown
                backdrop="blur"
                placement="top-end"
                classNames={{ content: "bg-transparent shadow-none" }}
              >
                <DropdownTrigger>
                  <Button
                    radius="full"
                    isIconOnly
                    className="bg-[#3fafa8] text-white shadow-xl"
                  >
                    <Icon
                      width={22}
                      className="font-bold"
                      icon="solar:pen-bold"
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="light" aria-label="Static Actions">
                  <DropdownItem
                    onPress={() => highlightText("suggestions")}
                    className="bg-[#3fafa8] text-white rounded-full text-center shadow mb-2 hover:bg-[#5ebeb8] duration-300 "
                    classNames={{ title: "text-lg font-bold px-4 text-white" }}
                    key="new"
                  >
                    Ask for suggestions
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => highlightText("plagiarism")}
                    className="bg-[#3fafa8] text-white rounded-full text-center shadow mb-2 hover:bg-[#5ebeb8] duration-300 "
                    classNames={{ title: "text-lg font-bold px-4 text-white" }}
                    key="detect"
                  >
                    Detect AI plagiarism
                  </DropdownItem>
                  <DropdownItem
                    key={""}
                    className="bg-[#3fafa8] text-white rounded-full text-center shadow mb-2 hover:bg-[#5ebeb8] duration-300 "
                    classNames={{ title: "text-lg font-bold px-4 text-white" }}
                  >
                    Get feedback from mentors
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </span>
        </>
      )}
    </div>
  );
}
