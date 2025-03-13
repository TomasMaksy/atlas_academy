"use client";

import React from "react";
import PromptInputFullLineWithBottomActions from "./prompt-input-full-line-with-bottom-actions";
import AgentCard from "./components/agent-card";
import ProgressCard from "@/app/(private)/home/components/progress-card";
import DeadlineCard from "./components/deadline-card";
import { Card, Link } from "@heroui/react";

export default function Component() {
	return (
		<div className="flex w-full bg-[radial-gradient(ellipse_75%_40%_at_top,rgba(63,175,168,1),rgba(255,255,255,1))] flex-col">

			<div className="mx-4">
				<div className="flex w-full items-top justify-center py-24 z-50">
					<div className="flex w-full max-w-xl flex-col items-center gap-8">
						<h1 className="text-3xl font-black leading-9 text-white tracking-tight">
							What's on your mind today?
						</h1>
						<PromptInputFullLineWithBottomActions />
					</div>
				</div>
				<div className="flex justify-center items-center flex-grow pb-24">
					<Card className="flex flex-col gap-2 w-full max-w-xl bg-white p-8 shadow-xl z-50">
						<p className="text-xl font-semibold text-[rgba(63,175,168,1)] ">
							Keep track of your progress
						</p>
						<div className="flex flex-row flex-grow gap-4">
							<ProgressCard />
							<DeadlineCard />
						</div>
					</Card>
				</div>
				<div className=" flex md:flex-row sm:flex-col justify-center gap-8 text-[#08010e] ">
					<Link href="/quiz" className="w-full">
						<AgentCard
							color="#3fafa8,#1af9ea"
							character="Esme"
							title="Common Essay Writer"
							imageSrc="/Esme.png"
						/>
					</Link>
					<AgentCard
						color="#c9d843,#d6e07e"
						character="Irven"
						title="Interview Specialist"
						imageSrc="/Irven.png"
					/>
					<AgentCard
						color="#6c5b7b,#7e2ec4"
						character="Guido"
						title="University Guide"
						imageSrc="/Guido.png"
					/>
				</div>
			</div>
		</div>
	);
}
