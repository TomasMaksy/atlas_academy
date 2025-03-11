"use client";

import React from "react";
import PromptInputFullLineWithBottomActions from "./prompt-input-full-line-with-bottom-actions";
import AgentCard2 from "@/components/agent-card2";
import AgentCard from "@/components/agent-card";


export default function Component() {
	return (
		<div className="flex h-screen max-h-[calc(100vh-140px)] w-full bg-[radial-gradient(ellipse_100%_50%_at_top,#3fafa8,white)] flex-col">
			<div className="flex h-full w-full items-top justify-center py-12">
				<div className="flex w-full max-w-xl flex-col items-center gap-6">
					<h1 className="text-3xl font-semibold leading-9 text-white">
						How can I help you today?
					</h1>
					<PromptInputFullLineWithBottomActions />
				</div>
			</div>
			<div className="mx-12 flex flex-row justify-center gap-6">
				<AgentCard />
				<AgentCard2 />
			</div>
		</div>
	);
}