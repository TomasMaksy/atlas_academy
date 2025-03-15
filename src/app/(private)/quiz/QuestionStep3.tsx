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
	options: string[];
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
	options,
	imageUrl,
	color,
	onChange,
	setStep,
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
		<div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-center">
			{/* TITLES */}
			<div
				className={`${pacifico.className} font-semibold text-5xl text-wrap flex flex-col whitespace-pre-line tracking-[0.07em] text-center z-0 mt-24 text-white/60`}
			>
				<span className="text-7xl text-white/50">{title} </span>
				{title2}
				<br />
			</div>

			{/* Image */}
			<div className="absolute bottom-[160px] flex items-center justify-top w-full z-40  flex-col ">
				<div className="z-40">
					<Image alt="image" src={imageUrl} width={610} className="" />
				</div>
			</div>
			<main className="w-full h-full flex flex-col justify-end">
				{/* Lower Input + Gradient */}
				<div
					className="flex flex-col justify-end items-center align-bottom z-50 h-[700px]"
					style={{
						background: `radial-gradient(ellipse 110% 100% at bottom, ${darkenRGBA(
							color,
							50
						)} 0%, ${darkenRGBA(
							color,
							50
						)} 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 75%)`,
					}}
				>
					<div className="bottom-0 z-50 gap-4 flex flex-col items-center text-center justify-end mb-8 p-4 h-[500px] md:w-[1000px] sm:w-[350px] ">
						{" "}
						<div className=" flex w-full justify-center items-center font-black leading-tight text-white tracking-tighter sm:text-2xl md:text-3xl z-50 text-center">
							<Tooltip className="z-50" content="Pick one option!">
								{question}
							</Tooltip>
						</div>
						<div className="flex w-full  items-center justify-center text-center">
							<CheckboxGroup
								className="flex flex-wrap justify-center items-center gap-2 w-full text-center mb-2"
								orientation="horizontal"
								value={groupSelected}
								onValueChange={(value) => {
									if (value.length <= 1) {
										const finalValue = value.join(", ");
										onChange({
											// @ts-expect-error: Ignoring type mismatch for now
											target: {
												value: finalValue,
											},
										});

										setGroupSelected(value);
									}
								}}
							>
								<div className="items-center justify-center gap-2 flex flex-wrap ">
									{options.map((option) => (
										<CustomCheckbox key={option} value={option} color={color}>
											{option}
										</CustomCheckbox>
									))}
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
							className="bg-white/20 text-white hover:bg-white/20 h-10 w-full text-md font-semibold md:w-[500px] sm:w-[350px]"
						>
							Continue
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
