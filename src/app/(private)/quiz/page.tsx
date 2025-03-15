"use client";

import React, { useEffect, useState } from "react";

import QuestionStep from "./QuestionStep";
import QuestionStep2 from "./QuestionStep2";

import { useRouter } from "next/navigation";

import { FormValues } from "@/app/(private)/types";

export const steps = [
	{
		title: "Hi! 👋 ",
		title2: "I am Esme!",
		imageUrl: "/Esme.png",
		question: "What's your name?",
		inputText: "Enter your name",
		color: "rgba(63, 175, 168, 1)",
		field: "name" as keyof FormValues,
	},
	{
		title: "Step 2",
		title2: "Iisdiwn! 👋 ",
		imageUrl: "/Irven.png",
		question: "How would your friends describe you?",
		inputText: "Enter your name",
		color: "rgba(201, 216, 67, 1)",
		field: "friendDescriptions" as keyof FormValues,
	},
	{
		title: "Step 3",
		title2: "I am Esme! 👋 ",
		imageUrl: "/Guido.png",
		question: "What is your name?",
		inputText: "Enter your name",
		color: "rgba(108, 91, 123, 1)",
		field: "motivations" as keyof FormValues,
	},
	{
		title: "Step 4",
		title2: "Random text! 👋 ",
		imageUrl: "/Esme.png",
		question: "What is your name?",
		inputText: "Enter your name",
		color: "rgba(63, 175, 168, 1)",
		field: "challenges" as keyof FormValues,
	},
];

const Quiz = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter();
	const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)"); // Default background color

	// Handling Storing the Values
	const [formValues, setFormValues] = useState<FormValues>({
		name: "",
		friendDescriptions: "",
		motivations: "",
		challenges: "",
		leadership: "",
		extracurriculars: "",
		seeYou: "",
		storyStyle: "",
		personalQualities: "",
		futureImpact: "",
		academicStrenght: "",
		introduction: "",
		keyMoments: "",
		fiveSec: "",
		digDeeper: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof FormValues
	) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[field]: e.target.value,
		}));
	};
	console.log(formValues);
	//SWITCHING BETWEEN PAGES//
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
			{currentStep === 1 ? (
				<QuestionStep2
					currentStep={currentStep}
					title={steps[currentStep].title}
					title2={steps[currentStep].title2}
					question={steps[currentStep].question}
					imageUrl={steps[currentStep].imageUrl}
					inputText={steps[currentStep].inputText}
					color={steps[currentStep].color}
					setStep={handleNextStep}
					value={formValues[steps[currentStep].field]}
					onChange={(e) => handleInputChange(e, steps[currentStep].field)}
				/>
			) : (
				<QuestionStep
					currentStep={currentStep}
					title={steps[currentStep].title}
					title2={steps[currentStep].title2}
					question={steps[currentStep].question}
					imageUrl={steps[currentStep].imageUrl}
					inputText={steps[currentStep].inputText}
					color={steps[currentStep].color}
					setStep={handleNextStep}
					value={formValues[steps[currentStep].field]}
					onChange={(e) => handleInputChange(e, steps[currentStep].field)}
				/>
			)}
		</main>
	);
};
export default Quiz;
