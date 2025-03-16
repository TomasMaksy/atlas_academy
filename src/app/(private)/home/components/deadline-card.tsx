"use client";

import React from "react";
import { Card, Progress, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function DaysTillDeadlineCard() {
	const data = {
		title: "Days Till Deadline",
		value: 8,
		color: "[#FF5722]",
		iconName: "solar:calendar-outline",
	};

	return (
		<Card className="flex flex-col  p-4 dark:border-default-100 flex-grow w-[330px]">
			<div
				className={cn(
					"flex h-8 w-8 items-center justify-center rounded-md border p-0.5",
					"border-[#de3e3e]/30 bg-[#de3e3e]/40"
				)}
			>
				<Icon className="text-[#ee3737]" icon={data.iconName} width={20} />
			</div>

			<div className="pt-1">
				<dt className="my-2 text-sm font-medium text-default-500">
					{data.title}
				</dt>
				<dd className="text-2xl font-semibold text-default-700">
					{data.value} days left
				</dd>
			</div>
			<Progress
				aria-label="status"
				className="mt-2"
				classNames={{
					indicator: "bg-[#ee3737]",
				}}
				value={100 - data.value} // Shows increasing urgency
			/>
		</Card>
	);
}
