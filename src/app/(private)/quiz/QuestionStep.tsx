"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button, Image, Input } from "@heroui/react";

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
		<AnimatePresence>
			<motion.div
				key={currentStep}
				initial={{
					x: "100%",
					opacity: 0.5,
				}}
				animate={{
					x: 0,
					opacity: 1,
				}}
				exit={{
					x: "-100%",
					opacity: 0.5,
				}}
				transition={{
					duration: 1,
					ease: "easeInOut",
					style: {
						filter: "blur(20px)",
					},
				}}
				className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center"
			>
				<main className="w-full h-full flex flex-col justify-end">
					{/* Steppers */}

					{/* Image */}
					<div className="absolute flex items-center justify-center w-full z-0 mt-40 flex-col ">
						<div
							className={`${pacifico.className} font-semibold text-9xl text-white text-wrap whitespace-pre-line text-center z-0  text-white/50`}
						>
							<span className="block text-5xl">{title}</span>
							{title2}
						</div>
						<div className="z-10 -mt-12 ">
							<Image src={imageUrl} alt={title} width={400} className="z-10 " />
						</div>
					</div>

					{/* Lower Input + Gradient */}
					<div
						className="flex flex-col justify-end items-center align-bottom z-50 h-[800px]"
						style={{
							background: `radial-gradient(ellipse at bottom, ${color} 0%, ${color} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
						}}
					>
						<div className="bottom-0 z-20 gap-4 flex flex-col items-center text-center justify-end mb-8 p-4 h-[500px] md:w-[500px] sm:w-[350px] ">
							<div className="w-full font-black leading-tight text-white tracking-tighter sm:text-2xl  md:text-3xl z-50 mb-6 text-center">
								{question}
							</div>

							<Input
								value={value}
								onChange={onChange}
								isClearable
								placeholder={inputText}
								radius="lg"
								color="default"
								classNames={{
									input: "text-default-500",
									innerWrapper: "bg-white/20",
								}}
								onClear={() =>
									onChange({
										target: { value: "" },
									} as React.ChangeEvent<HTMLInputElement>)
								} // Clear the input by setting it to an empty string
							/>
							<Button
								onPress={() => setStep(currentStep + 1)}
								variant="flat"
								style={{ color: "white" }} // Force text color to white
								className="bg-white/20 text-white hover:bg-white/60 text-tiny h-10 w-full"
							>
								Continue
							</Button>
						</div>
					</div>
				</main>
			</motion.div>
		</AnimatePresence>
	);
}
