"use client";

import React, { useState } from "react";
import HorizontalSteps from "./horizontal-steps";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";

const Questionaire = () => {
	const [currentStep, setCurrentStep] = useState(0);

	// Function to go to the next step
	const goToNextStep = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1);
		}
	};

	return (
		<main className="w-full bg-[radial-gradient(ellipse_100%_700%_at_top,rgba(63,175,168,1),rgba(255,255,255,1))] h-full">
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
			<div className="overflow-hidden relative h-[calc(100vh-250px)]">
				<div className="absolute flex items-center justify-center w-full z-0">
					<Image src={"/Esme.png"} width={600} className="z-0" />
				</div>
			</div>
			<div className="flex items-center justify-center mt-4 z-20 relative">
				<Button onClick={goToNextStep} variant="solid">
					Next Step
				</Button>
			</div>
			<div className="absolute z-10 w-full h-[500px] items-center justify-center -bottom-20 block bg-[radial-gradient(ellipse_50%_50%_at_center,rgba(63,175,168,1),rgba(255,255,255,0.0))]"></div>
		</main>
	);
};
export default Questionaire;
