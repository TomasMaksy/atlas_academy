"use client";

import { Button, Image, CheckboxGroup } from "@heroui/react";
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

	return (
		<div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center">
			{/* Image */}
			<div className="absolute flex items-center w-full z-0 flex-col bottom-[70px] ">
				<div className="z-10 ">
					<Image alt="image" src={imageUrl} width={400} className="z-10 " />
				</div>
			</div>
			<div
				className={`${pacifico.className} font-semibold text-3xl text-wrap whitespace-pre-line text-center z-0 mt-24 text-white/70`}
			>
				<span className="text-7xl text-white/50">{title2} </span>
				<br />
				{title}
			</div>
			<main className="w-full h-full flex flex-col justify-end">
				{/* Lower Input + Gradient */}
				<div
					className="flex flex-col justify-end items-center align-bottom z-50 h-[700px]"
					style={{
						background: `radial-gradient(ellipse at bottom, ${color} 0%, ${color} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
					}}
				>
					<div className="bottom-0 z-20 gap-4 flex flex-col items-center text-center justify-end mb-8 p-4 h-[500px] md:w-[1000px] sm:w-[350px] ">
						{" "}
						<div className=" flex w-full justify-center items-center font-black leading-tight text-white tracking-tighter sm:text-2xl md:text-3xl z-50 text-center">
							{question}
						</div>
						<div className="flex gap-2 w-full  items-center justify-center text-center">
							<CheckboxGroup
								className="flex flex-wrap justify-center items-center gap-2 w-full text-center "
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
