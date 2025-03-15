"use client";

import React, { useEffect, useState } from "react";

import QuestionStep from "./example";
import { useRouter } from "next/navigation";

const steps = [
	{
		title: "Hi! 👋 \nMy name is Esme!",
		imageUrl: "/Esme.png",
		question: "What is your name?",
		inputText: "Enter your name",
		color: "rgba(63, 175, 168, 1)",
	},
	{
		title: "Step 2",
		imageUrl: "/Irven.png",
		question: "How would your friends describe you?",
		inputText: "Enter your name",
		color: "rgba(201, 216, 67, 1)",
	},
	{
		title: "Step 3",
		imageUrl: "/Guido.png",
		question: "What is your name?",
		inputText: "Enter your name",
		color: "rgba(108, 91, 123, 1)",
	},
	{
		title: "Step 4",
		imageUrl: "/Esme.png",
		question: "What is your name?",
		inputText: "Enter your name",
		color: "rgba(63, 175, 168, 1)",
	},
];

const Quiz = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter(); // Initialize router
	const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)"); // Default background color

	useEffect(() => {
		setBgColor(steps[currentStep].color);
	}, [currentStep]);

	const handleNextStep = (step: number) => {
		if (step >= steps.length) {
			router.push("/chat"); // Redirect to /chat after the last step
		} else {
			setCurrentStep(step);
		}
	};

	return (
		<main
			className="h-full w-full  transition-colors duration-1000 ease-in-out"
			style={{ backgroundColor: bgColor }}
		>
			{" "}
			<QuestionStep
				currentStep={currentStep}
				title={steps[currentStep].title}
				question={steps[currentStep].question}
				imageUrl={steps[currentStep].imageUrl}
				inputText={steps[currentStep].inputText}
				color={steps[currentStep].color}
				setStep={handleNextStep}
			/>
		</main>
	);
};
export default Quiz;
