import React from "react";
import MainChat from "./main-chat";
// import { SidebarProvider } from "../chat/sidebar-context";

export default async function Component() {
	return (
		<div className="flex w-full bg-[radial-gradient(ellipse_75%_40%_at_top,rgba(63,175,168,1),rgba(250,255,245,0))] flex-col">
			<div className="mx-4">
				<MainChat />
			</div>
		</div>
	);
}