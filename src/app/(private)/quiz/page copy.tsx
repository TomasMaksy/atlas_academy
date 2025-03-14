"use client";

import React, { useState } from "react";
import HorizontalSteps from "./horizontal-steps";
import { Button, Input } from "@heroui/react";
import { Image } from "@heroui/react";

const Quiz = () => {
	const [currentStep, setCurrentStep] = useState(0);

	// Function to go to the next step
	const goToNextStep = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1);
		}
	};

	return (
		<main className="w-full bg-[radial-gradient(ellipse_100%_700%_at_top,rgba(63,175,168,1),rgba(255,255,255,1))] h-full relative overflow-hidden">
			<div
				className="flex transition-transform duration-500 ease-in-out w-max"
				style={{ transform: `translateX(-${currentStep * 20}%)` }}
			>
				<HorizontalSteps
					defaultStep={currentStep}
					className="flex-shrink-0 w-[calc(100vw*5-380px)] mt-1"
					color="danger"
					onProgress={goToNextStep}
					steps={[
						{
							title: "Tell me about yourself",
						},
						{
							title: "Company Information",
						},
						{
							title: "Choose Address",
						},
						{
							title: "Complete Payment",
						},
						{
							title: "Preview and Confirm",
						},
					]}
				/>
			</div>

			<div className="absolute flex items-center justify-center w-full z-0 mt-24">
				<Image src={"/Esme.png"} width={400} className="z-0 " />
			</div>
			<div className="flex flex-col w-full min-h-full justify-end items-center">
				<div className="w-1/4 h-[140px] px-8 rounded-2xl flex flex-col gap-4 justify-center items-center text-white shadow-md z-50 mb-36">
					<Input
						isClearable
						classNames={{
							input: [
								"bg-transparent",
								"text-white/100",
								"placeholder:text-white/50",
							],
							innerWrapper: "bg-transparent",
							inputWrapper: [
								"shadow-xl",
								"bg-white/10",
								"backdrop-blur-xl",
								"hover:none",
								"group-data-[focus=true]:bg-white/15",
								"!cursor-text",
							],
						}}
						placeholder="Type your answer here..."
						radius="lg"
						className="z-50 "
					/>
					<Button
						onClick={goToNextStep}
						variant="solid"
						className="bg-white/10 text-white hover:bg-white/20 text-tiny w-full"
					>
						Next Step
					</Button>
				</div>

				<div className="flex items-center justify-center mt-4 z-20 relative"></div>
			</div>
			<div className="absolute block bottom-0 z-20 w-full h-[500px] bg-[linear-gradient(to_top,rgba(63,175,168,1)_0%,rgba(63,175,168,1)_25%,rgba(63,175,168,0.5)_50%,rgba(63,175,168,0)_100%)]">
				{" "}
			</div>
		</main>
	);
};
export default Quiz;
