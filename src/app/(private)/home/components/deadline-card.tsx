"use client";

import React from "react";
import { Card, Progress, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function DaysTillDeadlineCard() {
	const data = {
		title: "Days Till Deadline",
		value: 8,
		color: "[#]",
		iconName: "solar:clock-circle-outline",
	};

	return (
		<Card className="flex flex-col border border-transparent p-4 dark:border-default-100 flex-grow">
			<div
				className={cn(
					"flex h-8 w-8 items-center justify-center rounded-md border p-0.5",
					"border-[#7e2ec4]/30 bg-[#7e2ec4]/20"
				)}
			>
				<Icon className="text-[#7e2ec4]" icon={data.iconName} width={20} />
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
					indicator: "bg-[#7e2ec4]",
				}}
				value={100 - data.value} // Shows increasing urgency
			/>
		</Card>
	);
}
