"use client";

import {
	motion,
	AnimatePresence,
	LazyMotion,
	m,
	domAnimation,
} from "framer-motion";
import { Button, cn, Image, Input } from "@heroui/react";

import { Pacifico } from "next/font/google";
import { ComponentProps } from "react";
import { steps } from "./page";

// Initialize the font
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

function CheckIcon(props: ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			viewBox="0 0 24 24"
		>
			<m.path
				animate={{ pathLength: 1 }}
				d="M5 13l4 4L19 7"
				initial={{ pathLength: 0 }}
				strokeLinecap="round"
				strokeLinejoin="round"
				transition={{
					delay: 0.2,
					type: "tween",
					ease: "easeOut",
					duration: 0.3,
				}}
			/>
		</svg>
	);
}

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
				<main className="w-full h-full flex flex-col justify-between">
					{/* Steppers */}
					<div className="flex transition-transform duration-500 ease-in-out items-center justify-center z-50 w-full mt-4">
						<div className="h-full relative flex items-center ">
							<LazyMotion features={domAnimation}>
								<m.div animate={status} className="relative">
									<m.div
										className={cn(
											"relative flex h-[34px] w-[34px] items-center justify-center rounded-full border-medium text-large font-semibold text-default-foreground",
											{
												"shadow-lg": status === "complete",
											}
										)}
										initial={false}
										transition={{ duration: 0.25 }}
										variants={{
											inactive: {
												backgroundColor: "transparent",
												borderColor: "var(--inactive-border-color)",
												color: "var(--inactive-color)",
											},
											active: {
												backgroundColor: "transparent",
												borderColor: "var(--active-border-color)",
												color: "var(--active-color)",
											},
											complete: {
												backgroundColor: "var(--complete-background-color)",
												borderColor: "var(--complete-border-color)",
											},
										}}
									>
										<div className="flex items-center justify-center">
											{status === "complete" ? (
												<CheckIcon className="h-6 w-6 text-[var(--active-fg-color)]" />
											) : (
												<span className="text-white">{currentStep + 1}</span>
											)}
										</div>
									</m.div>
								</m.div>
							</LazyMotion>
							{currentStep < steps.length - 1 && (
								<div
									aria-hidden="true"
									className={cn(
										"pointer-events-none absolute left-6 top-1/2 flex w-8 -translate-y-1/2 translate-x-1/2 items-center sm:w-12"
									)}
									style={{
										// @ts-ignore
										"--idx": currentStep,
									}}
								>
									<div
										className={cn(
											"relative h-0.5 w-full bg-default-200 transition-colors duration-300",
											"after:absolute after:block after:h-full after:w-0 after:bg-[var(--active-border-color)] after:transition-[width] after:duration-300 after:content-['']",
											{
												"after:w-full": currentStep < steps.length - 1,
											}
										)}
									/>
								</div>
							)}
						</div>
					</div>

					{/* Image */}
					<div className="absolute flex items-center justify-center w-full z-0 mt-40 flex-col ">
						<div
							className={`${pacifico.className} font-semibold text-9xl text-white text-wrap whitespace-pre-line text-center z-0  text-white/50`}
						>
							<span className="block text-5xl">{title}</span>
							{title2}
						</div>
						<div className="z-10 -mt-12 ">
							<Image src={imageUrl} width={400} className="z-10 " />
						</div>
					</div>

					{/* Lower Input + Gradient */}
					<div
						className="flex flex-col justify-end items-center align-bottom z-50 h-[400px]"
						style={{
							background: `radial-gradient(ellipse at bottom, ${color} 0%, ${color} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
						}}
					>
						<div className="bottom-0 z-20 gap-4 flex flex-col items-cente text-center justify-center p-4 h-[300px] md:w-[500px] sm:w-[350px]">
							<div className="flex w-full font-black leading-tight text-white tracking-tighter sm:text-2xl  md:text-3xl z-50 mb-6 text-center">
								{question}
							</div>
							<Input
								value={value}
								onChange={onChange}
								isClearable
								classNames={{
									base: ["text-white"],
									input: [
										"bg-transparent",
										"text-white",
										"placeholder:text-white/50",
									],
									innerWrapper: "bg-transparent text-white",
									inputWrapper: [
										"shadow-xl",
										"bg-white/20",
										"backdrop-blur-xl",
										"hover:bg-white/40",
										"group-data-[focus=true]:bg-white/25",
										"!cursor-text",
									],
								}}
								placeholder={inputText}
								radius="lg"
								className="z-50 text-white  "
							/>
							<Button
								onPress={() => setStep(currentStep + 1)}
								variant="flat"
								style={{ color: "white" }} // Force text color to white
								className="bg-white/20 text-white hover:bg-white/60 text-tiny w-full"
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
