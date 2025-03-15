"use client";

import { Button, Image, Input, Textarea } from "@heroui/react";

import { Pacifico } from "next/font/google";

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
	addText: string;
	setStep: (step: number) => void;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange function for the input
}

export default function QuestionStep({
	value,
	currentStep,
	title,
	title2,
	question,
	imageUrl,
	inputText,
	addText,
	color,
	setStep,
	onChange,
}: Props) {
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
		<main className="w-full h-full flex flex-col justify-between">
			{/* TITLES */}
			<div
				className={`${pacifico.className} font-semibold text-5xl text-wrap whitespace-pre-line tracking-wide text-center z-0 mt-12 text-white/80`}
			>
				<span className="text-7xl text-white/70 rotate-2">{title} </span>
				<br />
				{title2}
			</div>

			{/* IMAGE */}
			<div
				className={`absolute flex items-center justify-top w-full z-30  flex-col ${
					question.length > 100 ? "ml-[25%] bottom-[250px]" : "bottom-[100px]"
				}`}
			>
				<div className="z-40">
					<Image alt="image" src={imageUrl} width={650} className="ml-2" />
				</div>
			</div>

			{/* Lower Input + Gradient */}
			<div
				className="flex flex-col justify-end items-center align-bottom z-30 h-[700px] w-[calc(100vw-64px)]"
				style={{
					background: `radial-gradient(ellipse 104% 100% at bottom, ${darkenRGBA(
						color,
						50
					)} 0%, ${darkenRGBA(
						color,
						50
					)} 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 75%)`,
					backgroundPosition:
						question.length > 100 ? "-500px bottom" : "center bottom",
					backgroundSize: question.length > 100 ? "150%" : "130%",
				}}
			>
				<div className="flex flex-col justify-end items-center align-bottom z-50 h-[700px]">
					{question.length > 100 ? (
						<div className="flex flex-row p-4 h-[400px] whitespace-pre-line gap-32">
							<div className="text-white tracking-tighter flex flex-col sm:text-lg md:text-2xl w-[900px] leading-tight text-start justify-start font-extrabold gap-2">
								<div
									dangerouslySetInnerHTML={{
										__html: question, // question contains HTML like <span> tag
									}}
								/>

								<span className=" z-50 font-semibold font-sans text-lg leading-tight tracking-normal opacity-50 hover:opacity-100 duration-1000">
									{addText}
								</span>
							</div>

							<div className="flex flex-col gap-6 items-center justify-end h-full pb-20">
								<Textarea
									value={value}
									onChange={onChange}
									placeholder={inputText}
									label="Type your answer here..."
									size="lg"
									radius="full"
									color="default"
									className="md:w-full text-default-700 placeholder:text-default-500 font-normal text-md w-full"
									classNames={{
										label: "text-default-400",
										input: "min-h-[180px]",
									}}
								/>
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
					) : (
						<div className="bottom-0 z-20 gap-4 flex flex-col items-center text-center justify-end p-4 mb-8 h-[500px] whitespace-pre-line ">
							<div className="font-black leading-tight text-white tracking-tighter sm:text-2xl md:text-3xl z-50 mb-6 text-center w-full">
								{question}
							</div>
							<Input
								value={value}
								className="md:w-[500px] sm:w-[350px]"
								onChange={onChange}
								isClearable
								placeholder={inputText}
								radius="lg"
								color="default"
								classNames={{
									input:
										"text-default-700 placeholder:text-default-500 font-normal text-md w-full ", // Ensure the input itself is also full width
									innerWrapper: "bg-white/20 ",
								}}
								onClear={() =>
									onChange({
										target: { value: "" },
									} as React.ChangeEvent<HTMLInputElement>)
								}
							/>
							<Button
								onPress={() => setStep(currentStep + 1)}
								variant="flat"
								radius="lg"
								className="bg-white/20 text-white hover:bg-white/20 h-10 w-full text-md font-semibold md:w-[500px] sm:w-[350px]"
							>
								Continue
							</Button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
