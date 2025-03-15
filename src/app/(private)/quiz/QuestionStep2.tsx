"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button, Image, CheckboxGroup } from "@heroui/react";
import { CustomCheckbox } from "./custom-checkbox"; // Import from the new file

import { Pacifico } from "next/font/google";
import React from "react";

// Initialize the font
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

// function CheckIcon(props: ComponentProps<"svg">) {
// 	return (
// 		<svg
// 			{...props}
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth={2}
// 			viewBox="0 0 24 24"
// 		>
// 			<m.path
// 				animate={{ pathLength: 1 }}
// 				d="M5 13l4 4L19 7"
// 				initial={{ pathLength: 0 }}
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 				transition={{
// 					delay: 0.2,
// 					type: "tween",
// 					ease: "easeOut",
// 					duration: 0.3,
// 				}}
// 			/>
// 		</svg>
// 	);
// }

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
}: Props) {
	const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

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
				className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
			>
				{/* Image */}
				<div className="absolute flex items-center justify-top w-full z-0 mt-24 flex-col ">
					<div className="z-10  ">
						<Image alt="image" src={imageUrl} width={400} className="z-10 " />
					</div>
				</div>
				<div
					className={`${pacifico.className} font-semibold text-3xl text-wrap whitespace-pre-line text-center z-0 mt-24 text-white/70`}
				>
					<span className="text-7xl text-white/50">Hi, {title2}!👋 </span>
					<br />
					{title}
				</div>
				<main className="w-full h-full flex flex-col justify-end">
					{/* Lower Input + Gradient */}
					<div
						className="flex flex-col justify-end items-center align-bottom z-50 h-[800px]"
						style={{
							background: `radial-gradient(ellipse at bottom, ${color} 0%, ${color} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
						}}
					>
						<div className="bottom-0 z-20 gap-4 flex flex-col items-center text-center justify-end mb-8 p-4 h-[500px] md:w-[600px] sm:w-[350px] ">
							{" "}
							<div className="flex w-full justify-center items-center font-black leading-tight text-white tracking-tighter sm:text-2xl md:text-3xl z-50 text-center">
								{question}
							</div>
							<div className="flex gap-2 w-full  items-center justify-center text-center">
								<CheckboxGroup
									className="flex flex-wrap justify-center items-center gap-2 w-full text-center "
									orientation="horizontal"
									value={groupSelected}
									onChange={(newSelection) => {
										if (newSelection.length <= 5) {
											setGroupSelected(newSelection);
										}
									}}
								>
									<div className="items-center justify-center gap-2 flex flex-wrap ">
										<CustomCheckbox value="Altruistic" color={color}>
											Altruistic
										</CustomCheckbox>
										<CustomCheckbox value="Collaborative" color={color}>
											Collaborative
										</CustomCheckbox>
										<CustomCheckbox value="Creative" color={color}>
											Creative
										</CustomCheckbox>
										<CustomCheckbox value="Curious" color={color}>
											Curious
										</CustomCheckbox>
										<CustomCheckbox value="Driven" color={color}>
											Driven
										</CustomCheckbox>
										<CustomCheckbox value="Ethical" color={color}>
											Ethical
										</CustomCheckbox>
										<CustomCheckbox value="Hard-working" color={color}>
											Hard-working
										</CustomCheckbox>
										<CustomCheckbox value="Independent thinker" color={color}>
											Independent thinker
										</CustomCheckbox>
										<CustomCheckbox value="Innovative" color={color}>
											Innovative
										</CustomCheckbox>
										<CustomCheckbox value="Open-minded" color={color}>
											Open-minded
										</CustomCheckbox>
										<CustomCheckbox value="Persistent" color={color}>
											Persistent
										</CustomCheckbox>
										<CustomCheckbox value="Resilient" color={color}>
											Resilient
										</CustomCheckbox>
										<CustomCheckbox value="Self-starter" color={color}>
											Self-starter
										</CustomCheckbox>
										<CustomCheckbox value="Thoughtful" color={color}>
											Thoughtful
										</CustomCheckbox>
										<CustomCheckbox value="Well-rounded" color={color}>
											Well-rounded
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
