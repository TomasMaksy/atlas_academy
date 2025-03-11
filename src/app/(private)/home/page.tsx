"use client";

import React from "react";
import PromptInputFullLineWithBottomActions from "./prompt-input-full-line-with-bottom-actions";
import AgentCard2 from "@/app/(private)/home/components/agent-card2";
import AgentCard from "@/app/(private)/home/components/agent-card";
import ProgressCard from "@/app/(private)/home/components/progress-card";
import AgentCard3 from "./components/agent-card3";
import DeadlineCard from "./components/deadline-card";
import { Card } from "@heroui/react";
export default function Component() {
	return (
		<div className="flex h-screen max-h-[calc(100vh-140px)] w-full bg-[radial-gradient(ellipse_100%_80%_at_top,rgba(63,175,168,1),rgba(255,255,255,1))] flex-col px-24">
			<div className="flex w-full items-top justify-center py-24 z-50">
				<div className="flex w-full max-w-xl flex-col items-center gap-8">
					<h1 className="text-3xl font-semibold leading-9 text-white tracking-tight">
						What's on your mind today?
					</h1>
					<PromptInputFullLineWithBottomActions />
				</div>
			</div>
			<div className="flex  justify-center items-center flex-grow pb-24">
				<Card className="flex flex-col gap-2 bg-white p-8 shadow-xl w-[1000px] ">
					<p className="text-xl font-semibold text-[rgba(63,175,168,1)] ">
						Keep track of your progress
					</p>
					<div className="flex flex-row flex-grow gap-4">
						<ProgressCard />
						<DeadlineCard />
					</div>
				</Card>
			</div>
			<div className=" flex flex-row justify-between gap-8">
				<AgentCard2 />
				<AgentCard />
				<AgentCard3 />
			</div>
		</div>
	);
}
