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
	color,
	setStep,
	onChange,
}: Props) {
	return (
		<main className="w-full h-full flex flex-col justify-end">
			{/* IMAGE */}
			<div
				className={`absolute flex items-center justify-top w-full z-0 mt-24 flex-col ${
					question.length > 100 ? "ml-[25%]" : ""
				}`}
			>
				<div className="z-10">
					<Image
						alt="image"
						src={imageUrl}
						width={600}
						className="ml-10 mb-56"
					/>
				</div>
			</div>

			{/* TITLES */}
			<div
				className={`${pacifico.className} font-semibold text-3xl text-wrap whitespace-pre-line tracking-wide text-center z-0 mt-24 text-white/80`}
			>
				<span className="text-7xl text-white/70">{title2} </span>
				<br />
				{title}
			</div>

			{/* Lower Input + Gradient */}
			<div
				className="flex flex-col justify-end items-center align-bottom z-50 h-[800px]"
				style={{
					background: `radial-gradient(ellipse at bottom, ${color} 0%, ${color} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
					backgroundPosition: "175% bottom", // This should move the center towards the right (closer to 100% of the container width)
					backgroundSize: "1500px",
				}}
			>
				<div>
					{question.length > 100 ? (
						<div className="flex flex-row  p-4 h-[500px] whitespace-pre-line gap-32">
							<div className="text-white tracking-tighter flex sm:text-lg md:text-2xl  w-[900px] leading-tight text-start justify-start font-extrabold ">
								<div
									dangerouslySetInnerHTML={{
										__html: question, // question contains HTML like <span> tag
									}}
								/>
							</div>
							<div className="flex flex-col gap-6 items-center justify-end h-full pb-20">
								<Textarea
									value={value}
									onChange={onChange}
									placeholder={inputText}
									label="Your thoughts..."
									size="lg"
									radius="lg"
									color="default"
									className="md:w-full  text-default-700 placeholder:text-default-500 font-semibold text-md w-full"
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
