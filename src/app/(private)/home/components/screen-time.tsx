"use client";

import { Card, cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";

export default function HardcodedChart() {
	// Hardcoded data points
	const chartData = [
		{ value: 10 },
		{ value: 15 },
		{ value: 8 },
		{ value: 12 },
		{ value: 20 },
	];

	return (
		<Card className="flex flex-col p-4 dark:border-default-100 flex-grow w-[330px]">
			<section className="flex justify-between">
				{/* Left Section: Title & Value */}
				<div className="flex flex-col flex-grow">
					<div
						className={cn(
							"flex min-h-8 w-8 items-center justify-center rounded-md border p-0.5",
							"border-[#3fafa8]/30 bg-[#3fafa8]/20"
						)}
					>
						<Icon
							className="text-[#3fafa8]"
							icon={"solar:clock-circle-outline"}
							width={20}
						/>
					</div>
					<div className="flex h-full items-start flex-col justify-start">
						<div className="pt-1">
							<dt className="my-2 text-sm font-medium text-default-500">
								Time spent today
							</dt>
							<dd className="text-2xl font-semibold text-default-700">
								52 min
							</dd>
						</div>
						<div className="mt-1 flex items-center gap-x-1 text-sm font-medium text-[#3fafa8]">
							<span>▲</span>
							<span>+5%</span>
							<span className="text-gray-400"> vs yesterday</span>
						</div>
					</div>
				</div>

				{/* Right Section: Chart */}
				<div className="mt-4 w-40 min-w-[140px] flex flex-col justify-between">
					<ResponsiveContainer width="100%" height={110}>
						<AreaChart data={chartData}>
							<defs>
								<linearGradient id="colorGreen" x1="0" x2="0" y1="0" y2="1">
									<stop offset="5%" stopColor="#3fafa8" stopOpacity={0.4} />
									<stop offset="80%" stopColor="#3fafa8" stopOpacity={0} />
								</linearGradient>
							</defs>
							<YAxis hide domain={[0, "auto"]} />
							<Area dataKey="value" stroke="#3fafa8" fill="#3fafa8" />{" "}
						</AreaChart>
					</ResponsiveContainer>
					{/* Change Indicator */}
				</div>
			</section>
		</Card>
	);
}
