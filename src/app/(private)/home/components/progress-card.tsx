"use client";

import React from "react";
import { Card, Progress, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function ApplicationProgressCard() {
	const data = {
		title: "Application Progress",
		value: 27,
		status: "good",
		iconName: "solar:checklist-minimalistic-outline",
	};

	return (
		<Card className="flex flex-col p-4 flex-grow w-[330px]">
			<div
				className={cn(
					"flex h-8 w-8 items-center justify-center rounded-md border p-0.5",
					"border-[#8259B0]/20 bg-[#8259B0]/30 "
				)}
			>
				<Icon className="text-[#8259B0]" icon={data.iconName} width={20} />
			</div>

			<div className="pt-1">
				<dt className="my-2 text-sm font-medium text-default-500">
					{data.title}
				</dt>
				<dd className="text-2xl font-semibold text-default-700">
					{data.value}%
				</dd>
			</div>
			<Progress
				aria-label="status"
				className="mt-2"
				classNames={{
					indicator: "bg-[#8259B0]",
				}}
				value={data.value}
			/>
		</Card>
	);
}
