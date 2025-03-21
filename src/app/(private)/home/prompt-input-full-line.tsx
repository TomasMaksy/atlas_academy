"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { cn } from "@heroui/theme";
import { Tooltip } from "@heroui/tooltip";
import { Image } from "@heroui/image";
import React, { useCallback, useState } from "react";
import { Badge, ScrollShadow } from "@heroui/react";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import PromptInput from "./prompt-input";

import MessageCardHome from "./message-card-home";
import { UIMessage } from "ai";

interface PromptInputProps {
	prompt: string;
	messages: UIMessage[];
	setPrompt: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: () => void;
}

interface PromptInputAssetsProps {
	assets: string[];
	onRemoveAsset: (index: number) => void;
}

const PromptInputAssets = ({
	assets,
	onRemoveAsset,
}: PromptInputAssetsProps) => {
	if (assets.length === 0) return null;

	return (
		<>
			{assets.map((asset, index) => (
				<Badge
					key={index}
					isOneChar
					className="opacity-0 group-hover:opacity-100"
					content={
						<Button
							isIconOnly
							radius="full"
							size="sm"
							variant="light"
							onPress={() => onRemoveAsset(index)}
						>
							<Icon
								className="text-foreground"
								icon="iconamoon:close-thin"
								width={16}
							/>
						</Button>
					}
				>
					<Image
						alt="uploaded image"
						className="h-14 w-14 rounded-small border-small border-default-200/50 object-cover"
						src={asset}
					/>
				</Badge>
			))}
		</>
	);
};

export function PromptInputFullLineComponent({
	prompt,
	setPrompt,
	handleSubmit,
	messages,
}: PromptInputProps) {
	const [assets, setAssets] = useState<string[]>([]);

	const inputRef = React.useRef<HTMLTextAreaElement>(null);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			handleSubmit();
		},
		[handleSubmit]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();

				handleSubmit();
			}
		},
		[handleSubmit]
	);

	const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
		const items = Array.from(e.clipboardData.items);

		for (const item of items) {
			if (item.type.indexOf("image") !== -1) {
				const blob = item.getAsFile();

				if (!blob) continue;

				const reader = new FileReader();

				reader.onload = () => {
					const base64data = reader.result as string;

					setAssets((prev) => [...prev, base64data]);
				};
				reader.readAsDataURL(blob);
			}
		}
	}, []);

	const handleFileUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(e.target.files || []);

			files.forEach((file) => {
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();

					reader.onload = () => {
						const base64data = reader.result as string;

						setAssets((prev) => [...prev, base64data]);
					};
					reader.readAsDataURL(file);
				}
			});

			// Reset input value to allow uploading the same file again
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		},
		[]
	);

	return (
		<Form
			className="flex w-full flex-col items-start gap-0 rounded-3xl bg-white dark:bg-white shadow-[0_0px_30px_rgba(0,0,0,0.1)] z-50"
			validationBehavior="native"
			onSubmit={onSubmit}
		>
			<div
				className={cn(
					"group flex gap-2 pl-[20px] pr-3",
					assets.length > 0 ? "pt-4" : ""
				)}
			>
				<PromptInputAssets
					assets={assets}
					onRemoveAsset={(index) => {
						setAssets((prev) => prev.filter((_, i) => i !== index));
					}}
				/>
			</div>
			{messages.length > 0 && (
				<ScrollShadow className="flex h-full max-h-[80vh] min-h-[250px] flex-col gap-6 overflow-y-auto p-6 pb-8 w-full">
					{messages.map((message, id) => (
						<MessageCardHome message={message} key={id} />
					))}
				</ScrollShadow>
			)}
			<PromptInput
				ref={inputRef}
				autoFocus
				classNames={{
					innerWrapper: "relative",
					input: "text-medium h-auto w-full",
					inputWrapper:
						"!bg-transparent shadow-none group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0 pr-3 pl-[20px] pt-3 pb-4",
				}}
				maxRows={16}
				minRows={1}
				name="content"
				radius="lg"
				spellCheck="true"
				value={prompt}
				variant="flat"
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
				onValueChange={setPrompt}
			/>
			<div className="flex w-full flex-row items-center justify-between px-3 pb-3">
				<Tooltip showArrow content="Attach Files">
					<Button
						isIconOnly
						radius="full"
						size="sm"
						variant="light"
						onPress={() => fileInputRef.current?.click()}
					>
						<Icon
							className="text-default-500"
							icon="solar:paperclip-outline"
							width={24}
						/>
						<VisuallyHidden>
							<input
								ref={fileInputRef}
								multiple
								accept="image/*"
								type="file"
								onChange={handleFileUpload}
							/>
						</VisuallyHidden>
					</Button>
				</Tooltip>
				<Button
					isIconOnly
					style={{ backgroundColor: prompt ? "#3fafa8" : undefined }}
					isDisabled={!prompt}
					radius="full"
					size="sm"
					type="submit"
					variant="solid"
				>
					<Icon
						className={cn(
							"[&>path]:stroke-[2px]",
							!prompt ? "text-default-600" : "text-white"
						)}
						icon={"solar:arrow-right-linear"}
						width={20}
					/>
				</Button>
			</div>
		</Form>
	);
}
