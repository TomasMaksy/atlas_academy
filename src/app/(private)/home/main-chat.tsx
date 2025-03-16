"use client";

import React, { useEffect } from "react";
import { Button } from "@heroui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { PromptInputFullLineComponent } from "./prompt-input-full-line";
import { cn } from "@heroui/react";
import { useChat } from "@ai-sdk/react";

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
		id: "start",
		label: "Figure out where to start",
		icon: "solar:code-linear",
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
			<div className="flex flex-col w-full items-center justify-center py-24 z-50">
				<div
					className={cn("flex w-full flex-col items-center gap-8 max-w-5xl")}
				>
					{messages.length === 0 && (
						<h1 className="text-3xl font-black leading-9 text-white tracking-tight h-[140px] z-50">
							{``}
						</h1>
					)}
					<div className="flex w-full flex-col gap-2 max-w-xl">
						{messages.length === 0 && (
							<div className="flex items-center justify-center absolute top-8 left-1/2 transform -translate-x-1/2 z-0 h-max-[100px]">
								<Image
									alt="image"
									src="/general_cap.png"
									width={330}
									height={400}
									className="z-0"
								/>
								<div className="absolute top-[160px] left-[300px] h-4 w-4 bg-white/90 rounded-full"></div>
								<div className="absolute top-[155px] left-[280px] h-2 w-2 bg-white/90 rounded-full"></div>
								<div className="p-4 mr-12 rounded-2xl bg-white">
									<div className="text-xl font-bold text-default-700">
										Hey! 👋
									</div>
									<div className="text-md text-default-500">
										What&apos;s on your mind today?
									</div>
								</div>
							</div>
						)}

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
		</>
	);
}
