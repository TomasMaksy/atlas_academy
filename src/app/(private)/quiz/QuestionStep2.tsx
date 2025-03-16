"use client";

import { Button, Image, CheckboxGroup, Tooltip } from "@heroui/react";
import { CustomCheckbox } from "./custom-checkbox"; // Import from the new file

import { Pacifico } from "next/font/google";
import React from "react";

// Initialize the font
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

interface Props {
	currentStep: number;
	title: string;
	title2: string;
	question: string;
	imageUrl: string;
	inputText: string;
	color: string;
	setStep: (step: number) => void;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange function for the input
}

export default function QuestionStep({
	currentStep,
	title,
	title2,
	question,
	imageUrl,
	color,
	setStep,
	onChange,
}: Props) {
	const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

	function darkenRGBA(rgba: string, amount: number): string {
		// Extract the RGBA values from the input
		const rgbaValues = rgba.match(/\d+(\.\d+)?/g); // Match numbers (including decimals) in rgba

		if (!rgbaValues || rgbaValues.length !== 4) {
			throw new Error("Invalid RGBA string");
		}

		// Assign values to RGBA object
		const r = Number(rgbaValues[0]);
		const g = Number(rgbaValues[1]);
		const b = Number(rgbaValues[2]);
		const a = Number(rgbaValues[3]);

		// Decrease each of the RGB values by the amount, ensuring they don't go below 0
		const newR = Math.max(r - amount, 0);
		const newG = Math.max(g - amount, 0);
		const newB = Math.max(b - amount, 0);

		// Return the new darker rgba color with the same alpha value
		return `rgba(${newR}, ${newG}, ${newB}, ${a})`;
	}
	return (
		<div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center">
			{/* TITLES */}
			<div
				className={`${pacifico.className} font-semibold text-5xl text-wrap whitespace-pre-line tracking-wide text-center z-0 mt-24 text-white/70`}
			>
				<span className="text-7xl text-white/70">Hi, {title2}! 👋 </span>
				<br />
				{title}
			</div>

			{/* Image */}
			<div className="absolute bottom-[200px] flex items-center justify-top w-full z-20  flex-col ">
				<div className="z-20 ">
					<Image alt="image" src={imageUrl} width={620} className="" />
				</div>
			</div>

			<main className="w-full h-full flex flex-col justify-end">
				{/* Lower Input + Gradient */}
				<div
					className="flex flex-col justify-end items-center align-bottom z-30 h-[800px] w-[calc(100vw-70px)]"
					style={{
						background: `radial-gradient(ellipse at bottom, ${darkenRGBA(
							color,
							20
						)} 0%, ${darkenRGBA(
							color,
							20
						)} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
					}}
				>
					<div className="bottom-0 flex flex-col items-center text-center justify-end mb-8 p-4 h-[500px] z-50 ">
						{" "}
						<div className="md:w-[500px] sm:w-[350px] gap-4 flex flex-col">
							<div
								className=" flex w-full justify-center items-center font-black leading-tight  text-white tracking-tighter sm:text-2xl md:text-5xl z-50 text-center"
								style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.11)" }}
							>
								{" "}
								<Tooltip className="z-50" content="Pick up to 5 options!">
									{question}
								</Tooltip>
							</div>
							<div className="flex gap- w-full  items-center justify-center text-center z-50">
								<CheckboxGroup
									className="flex flex-wrap justify-center items-center gap-2 w-[1000px] text-center z-50"
									orientation="horizontal"
									value={groupSelected}
									onValueChange={(value) => {
										if (value.length <= 5) {
											// Allow selection only if 5 or fewer are selected
											const exampl = value.join(", ");
											onChange({
												// @ts-expect-error TS2339
												target: {
													value: exampl,
												},
											});

											setGroupSelected(value);
										}
									}}
								>
									<div className="items-center justify-center gap-2 flex flex-wrap ">
										<CustomCheckbox value="Altruistic" color={color}>
											Altruistic 🤝
										</CustomCheckbox>
										<CustomCheckbox value="Creative" color={color}>
											Creative 🎨
										</CustomCheckbox>
										<CustomCheckbox value="Curious" color={color}>
											Curious 🤔
										</CustomCheckbox>
										<CustomCheckbox value="Driven" color={color}>
											Driven 💪
										</CustomCheckbox>
										<CustomCheckbox value="Ethical" color={color}>
											Ethical ⚖️
										</CustomCheckbox>
										<CustomCheckbox value="Hard-working" color={color}>
											Hard-working 💼
										</CustomCheckbox>
										<CustomCheckbox value="Independent thinker" color={color}>
											Independent thinker 🧠
										</CustomCheckbox>
										<CustomCheckbox value="Innovative" color={color}>
											Innovative 💡
										</CustomCheckbox>
										<CustomCheckbox value="Open-minded" color={color}>
											Open-minded 🌍
										</CustomCheckbox>
										<CustomCheckbox value="Persistent" color={color}>
											Persistent 🔄
										</CustomCheckbox>
										<CustomCheckbox value="Resilient" color={color}>
											Resilient 💪
										</CustomCheckbox>
										<CustomCheckbox value="Self-starter" color={color}>
											Self-starter 🚀
										</CustomCheckbox>
										<CustomCheckbox value="Collaborative" color={color}>
											Collaborative 🤝
										</CustomCheckbox>
										<CustomCheckbox value="Thoughtful" color={color}>
											Thoughtful 💭
										</CustomCheckbox>
										<CustomCheckbox value="Well-rounded" color={color}>
											Well-rounded 🌀
										</CustomCheckbox>
									</div>
								</CheckboxGroup>
								{/* <p className="mt-4 ml-1 text-default-500">
										Selected: {groupSelected.join(", ")}
									</p> */}
							</div>
							<Button
								onPress={() => setStep(currentStep + 1)}
								variant="flat"
								radius="lg"
								className="bg-white/20 text-white hover:bg-white/60 h-10 w-full text-md font-semibold"
							>
								Continue
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
