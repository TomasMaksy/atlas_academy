"use client";

import React, { useEffect, useState } from "react";

import QuestionStep from "./QuestionStep";
import QuestionStep2 from "./QuestionStep2";
import QuestionStep3 from "./QuestionStep3";

import { useRouter } from "next/navigation";

import { FormValues } from "@/app/(private)/types";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@heroui/react";

const steps = [
	{
		title: "Hi! 👋 ",
		title2: "My name is Esme!",
		imageUrl: "/esme_1.png",
		color: "rgba(63, 175, 168, 1)",
		color2: "#C9D843",
		question: "What's your name?",
		inputText: "Enter your name",

		field: "name" as keyof FormValues,
		options: ["", "", "", "", "", ""],
	},
	{
		title: "Let's get to know you!",
		title2: "",
		imageUrl: "/irven_1.png",
		color: "rgba(201, 216, 67, 1)",
		question: "How would your friends describe you?",
		inputText: "Enter your name",
		field: "friendDescriptions" as keyof FormValues,
		options: ["", "", "", "", "", ""],
	},
	{
		title: "What gets you going? 🔥",
		title2: "",
		imageUrl: "/guido_4.png",
		color: "rgba(108, 91, 123, 1)",
		question: "What motivates you the most in life?",
		options: [
			"Intellectual curiosity – I love learning and exploring new ideas",
			"Impact – I want to make a difference in the world",
			"Achievement – I aim for excellence in everything I do",
			"Creativity – I enjoy expressing myself and thinking outside the box",
			"Challenge – I thrive when pushing myself beyond my limits",
		],
		inputText: "",
		field: "motivations" as keyof FormValues,
	},
	{
		title: "Like to tackle problems? 🔝",
		title2: "",
		imageUrl: "/esme_2.png",
		color: "rgba(63, 175, 168, 1)",
		question: "How do you typically approach challenges?",
		options: [
			"I analyze them logically and strategize solutions",
			"I push through with persistence and determination",
			"I seek help from mentors or my community",
			"I look for creative, out-of-the-box solutions",
			"I stay patient and adapt as needed",
		],
		inputText: "",
		field: "challenges" as keyof FormValues,
	},
	{
		title: "How'd you lead? 🛣️",
		title2: "",
		imageUrl: "/irven_4.png",
		color: "rgba(201, 216, 67, 1)",
		question: "Which of these best describes your leadership style?",
		options: [
			"Visionary – I inspire people with new ideas and big goals",
			"Collaborative – I work well with teams and empower others",
			"Hands-on – I lead by example and take action first",
			"Strategic – I analyze situations and make calculated decisions",
			"Supportive – I focus on helping others grow",
		],
		inputText: "",
		field: "leadership" as keyof FormValues,
	},
	{
		title: " You are doing great rockstar🎸",
		title2: "",
		imageUrl: "/guido_3.png",
		color: "rgba(108, 91, 123, 1)",
		question:
			"What type of extracurricular activities are you most involved in?",
		options: [
			"STEM-related clubs, research, or competitions",
			"Business, finance, or entrepreneurship ventures",
			"Arts, music, or creative expression",
			"Community service, activism, or social impact",
			"Sports, fitness, or outdoor activities",
		],
		inputText: "",
		field: "extracurriculars" as keyof FormValues,
	},
	{
		title: "",
		title2: "Ideal college impression? 🎓",
		imageUrl: "/esme_2.png",
		color: "rgba(63, 175, 168, 1)",
		question: "How do you want colleges to see you?",
		options: [
			"As an innovator with unique ideas and problem-solving skills",
			"As a leader who makes a meaningful impact",
			"As a passionate specialist in a particular field",
			"As a well-rounded student with diverse interests",
			"As someone with a compelling personal story",
		],
		inputText: "",
		field: "seeYou" as keyof FormValues,
	},
	{
		title: "",
		title2: "What's your writing flavour! ✍️",
		imageUrl: "/guido_1.png",
		color: "rgba(108, 91, 123, 1)",
		question: "What’s your preferred storytelling style for essays?",
		options: [
			"Analytical – Focused on logic, reasoning, and problem-solving",
			"Reflective – Deeply personal and introspective",
			"Narrative – Story-driven with vivid details and emotions",
			"Persuasive – Making a strong case for my ideas and values",
			"Humorous – Adding personality and wit to my writing",
		],
		inputText: "",
		field: "storyStyle" as keyof FormValues,
	},
	{
		title: "",
		title2: "What should they remember about you? 🔑",
		imageUrl: "/milo_3.png",
		color: "rgba(255, 87, 34, 1)",
		question: "What personal qualities do you want emphasized in your essays?",
		options: [
			"Resilience and perseverance",
			"Creativity and innovation",
			"Leadership and initiative",
			"Compassion and community involvement",
			"Intellectual curiosity and love for learning",
		],
		inputText: "",
		field: "personalQualities" as keyof FormValues,
	},
	{
		title: "🌍 Talk about legacy... ",
		title2: "",
		imageUrl: "/esme_3.png",
		color: "rgba(63, 175, 168, 1)",
		question: "What kind of impact do you hope to make in the future?",
		options: [
			"Advancing scientific or technological innovation",
			"Creating a successful business or organization",
			"Making an artistic or cultural contribution",
			"Solving social justice or global issues",
			"Inspiring or mentoring others",
		],
		inputText: "",
		field: "futureImpact" as keyof FormValues,
	},
	{
		title: "",
		title2: "Tell me about your secret\n superpowers 🦸‍♂️",
		imageUrl: "/guido_4.png",
		color: "rgba(108, 91, 123, 1)",
		question:
			"What is your biggest strength in academic or professional settings?",
		options: [
			"Critical thinking and problem-solving",
			"Communication and public speaking",
			"Teamwork and collaboration",
			"Creativity and adaptability",
			"Discipline and work ethic",
		],
		inputText: "",
		field: "academicStrenght" as keyof FormValues,
	},
	{
		title: "How do you kick things off?",
		title2: "",
		imageUrl: "/milo_4.png",
		color: "rgba(255, 87, 34, 1)",
		question: "How do you prefer to introduce yourself in an essay?",
		options: [
			"A personal anecdote that highlights my character",
			"A bold statement that grabs attention immediately",
			"A thought-provoking question or philosophical idea",
			"A detailed description of my passion or expertise",
			"A structured overview of my background and experiences",
		],
		inputText: "",
		field: "introduction" as keyof FormValues,
	},
	{
		title: "🔑⏳",
		title2: "Identify Key Moments in Your Life",
		imageUrl: "/esme_4.png",
		color: "rgba(63, 175, 168, 1)",
		question: `Now, take a moment to think about an event or experience that has played a major role in shaping the person you are today.\n You may have several, but focus on one that stands out as particularly meaningful. Jot down the key details—without analyzing or reflecting on them just yet. Treat it like a journal entry, simply noting what happened.`,
		options: ["", "", "", "", ""],
		inputText: "",
		field: "keyMoments" as keyof FormValues,
		addText: `For example:
- I helped a lost child find their parents at a crowded festival...
- I built my first computer from scratch...
- I gave a speech in front of my entire school for the first time...`,
	},
	{
		title: "Focus on a...",
		title2: "Defining 5-Second Moment ⏳⚡",
		imageUrl: "/Milo_3.png",
		color: "rgba(255, 87, 34, 1)",
		question: `Now, zero in on a pivotal five-second moment within your experience—an instant that marked a shift in your perspective, emotions, or actions. \nThis could be the exact second you made a decision, had a breakthrough realization, or felt a surge of emotion. Describe this moment vividly, capturing the details that made it impactful.`,
		options: ["", "", "", "", ""],
		inputText: "",
		field: "fiveSec" as keyof FormValues,
		addText: `For example:
- The instant I hit ‘submit’ on my first college application..."
- The moment my experiment finally worked after months of failure..."
- The exact second I stepped onto the stage and the spotlight hit me..."\n
This brief but powerful moment will serve as the emotional core of your story.`,
	},
	// 	{
	// 		title: "Dig Deeper: 🕳️ ",
	// 		title2: "Why Does This Matter?",
	// 		imageUrl: "/Guido.png",
	// 		color: "rgba(108, 91, 123, 1)",
	// 		question: `Now, take a step back and reflect on the moments you’ve captured. What made this experience meaningful? What did it reveal about you? How did it influence your perspective or shape the path you’re on today? Answer the following questions to uncover the deeper significance of your story.
	// In what ways did this experience shape your future aspirations?
	// Answer:
	// Did this experience challenge or change any of your beliefs? If so, how?
	// Answer:
	// Why was this event so impactful, and what lasting effect did it have on you?
	// `,
	// 		options: ["", "", "", "", ""],
	// 		inputText: "",
	// 		field: "digDeeper" as keyof FormValues,
	// 	},
];

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

	const handleNextStep = async (step: number) => {
		if (step >= steps.length) {
			// submit values to api/user

			console.log(formValues);

			const response = await fetch("/api/user", {
				method: "POST",
				body: JSON.stringify(formValues),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			} else {
				router.push("/home"); // Redirect to /chat after the last step
			}
		} else {
			setCurrentStep(step);
		}
	};

	return (
		<main
			className="h-full w-full transition-colors duration-1000 ease-in-out items-center"
			style={{
				background: `${bgColor}`,
			}}
		>
			<div className="items-center flex justify-center z-50">
				<section className="absolute w-[26vw] opacity-50 -bottom-0 z-50  ">
					<Progress
						classNames={{
							base: "px-0.5 mb-5 ",
							label: "text-small font-bold text-white",
							value: "text-small font-bold text-white",
							indicator: "bg-white/70",
						}}
						maxValue={steps.length - 1}
						minValue={0}
						showValueLabel={false}
						size="md"
						value={currentStep}
						className="z-50"
						valueLabel={`${currentStep + 1} of ${steps.length}`}
					/>
				</section>
			</div>
			{/* <div
				className={`w-[200vw] transition-all duration-1000 pl-[30%]`}
				style={{
					transform:
						currentStep >= steps.length / 2 ? "translateX(-50%)" : "none",
				}}
			>
				<HorizontalSteps
					currentStep={currentStep}
					steps={steps}
					onStepChange={handleNextStep}
					className="w-full"
				/>
			</div> */}

			<AnimatePresence>
				<motion.div
					key={currentStep}
					initial={{ x: "100%", opacity: 0.5 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "-100%", opacity: 0.5 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					className="absolute w-full h-full z-40"
				>
					{currentStep === 1 ? (
						<QuestionStep2
							currentStep={currentStep}
							title={steps[currentStep].title}
							title2={formValues.name}
							question={steps[currentStep].question}
							imageUrl={steps[currentStep].imageUrl}
							inputText={steps[currentStep].inputText}
							color={steps[currentStep].color}
							setStep={handleNextStep}
							value={formValues[steps[currentStep].field]}
							onChange={(e) => handleInputChange(e, steps[currentStep].field)}
						/>
					) : currentStep >= 2 && currentStep <= 11 ? (
						<QuestionStep3
							currentStep={currentStep}
							title={steps[currentStep].title}
							title2={steps[currentStep].title2}
							question={steps[currentStep].question}
							imageUrl={steps[currentStep].imageUrl}
							inputText={steps[currentStep].inputText}
							options={steps[currentStep].options}
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
							addText={steps[currentStep].addText}
							setStep={handleNextStep}
							value={formValues[steps[currentStep].field]}
							onChange={(e) => handleInputChange(e, steps[currentStep].field)}
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</main>
	);
};
export default Quiz;
