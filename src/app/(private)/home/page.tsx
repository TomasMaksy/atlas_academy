import React from "react";
import MainChat from "./main-chat";
import AgentCard from "./components/agent-card";
import messages from "../chat/messages";
import ProgressCard from "./components/progress-card";
import DeadlineCard from "./components/deadline-card";
import ScreenTime from "./components/screen-time";
// import { SidebarProvider } from "../chat/sidebar-context";

export default async function Component() {
	return (
		<div className="flex w-full bg-[radial-gradient(ellipse_80%_50%_at_top,rgba(191,206,67,1),rgba(250,255,245,0))] flex-col h-full">
			<div className="mx-4 h-full">
				<MainChat />
			</div>
			<div className=" flex md:flex-row sm:flex-col justify-center gap-8 text-[#08010e] mx-8 mb-16">
				<AgentCard
					higlighted={messages.length > 1}
					color="#3fafa8,#1af9ea"
					character="Esme"
					title="Common Essay Writer"
					imageSrc="/esme_1.png"
				/>
				<AgentCard
					color="#c9d843,#d6e07e"
					character="Mani"
					title="General Support"
					imageSrc="/irven_2.png"
				/>
				<AgentCard
					//   color red gradient with 2 different colors
					color="#6c5b7b,#7e2ec4"
					character="Milo"
					title="Interview Specialist"
					imageSrc="/guido_3.png"
				/>
				<AgentCard
					color="#ff4d4d,#ff0000"
					character="Guido"
					title="University Guide"
					imageSrc="milo_4.png"
				/>
			</div>
			<div className="flex flex-col justify-between items-stretch flex-grow gap-4 my-12 mx-8 w-full">
				<span className="text-2xl font-bold">Track your progress</span>
				<div className="flex flex-row flex-grow gap-8 max-h-[160px] justify-between mb-44 w-[calc(100%-64px)]">
					<ProgressCard />
					<DeadlineCard />
					<ScreenTime />
				</div>
			</div>
		</div>
	);
}
