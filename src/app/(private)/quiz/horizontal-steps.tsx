"use client";

import type { ComponentProps } from "react";
import type { ButtonProps } from "@heroui/react";

import React from "react";
import { useControlledState } from "@react-stately/utils";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@heroui/react";

export type HorizontalStepProps = {
	title?: React.ReactNode;
	className?: string;
};

export interface HorizontalStepsProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	/**
	 * An array of steps.
	 *
	 * @default []
	 */
	steps?: HorizontalStepProps[];
	/**
	 * The color of the steps.
	 *
	 * @default "primary"
	 */
	color?: ButtonProps["color"];
	/**
	 * The current step index.
	 */
	currentStep?: number;
	/**
	 * The default step index.
	 *
	 * @default 0
	 */
	defaultStep?: number;
	/**
	 * Whether to hide the progress bars.
	 *
	 * @default false
	 */
	hideProgressBars?: boolean;
	/**
	 * The custom class for the steps wrapper.
	 */
	className?: string;
	/**
	 * The custom class for the step.
	 */
	stepClassName?: string;
	/**
	 * Callback function when the step index changes.
	 */
	onStepChange?: (stepIndex: number) => void;
}

function CheckIcon(props: ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			viewBox="0 0 24 24"
		>
			<m.path
				animate={{ pathLength: 1 }}
				d="M5 13l4 4L19 7"
				initial={{ pathLength: 0 }}
				strokeLinecap="round"
				strokeLinejoin="round"
				transition={{
					delay: 0.2,
					type: "tween",
					ease: "easeOut",
					duration: 0.3,
				}}
			/>
		</svg>
	);
}

const HorizontalSteps = React.forwardRef<
	HTMLButtonElement,
	HorizontalStepsProps
>(
	(
		{
			color = "default",
			steps = [],
			defaultStep = 0,
			onStepChange,
			currentStep: currentStepProp,
			hideProgressBars = false,
			stepClassName,
			className,
			...props
		},
		ref
	) => {
		const [currentStep, setCurrentStep] = useControlledState(
			currentStepProp,
			defaultStep,
			onStepChange
		);

		const colors = React.useMemo(() => {
			let userColor;
			let fgColor;

			const colorsVars = [
				"[--active-fg-color:hsl(var(--step-fg-color))]",
				"[--active-border-color:hsl(var(--step-color))]",
				"[--active-color:hsl(var(--step-color))]",
				"[--complete-background-color:hsl(var(--step-color))]",
				"[--complete-border-color:hsl(var(--step-color))]",
				"[--inactive-border-color:hsl(var(--heroui-default-300))]",
				"[--inactive-color:hsl(var(--heroui-default-300))]",
			];

			switch (color) {
				case "primary":
					userColor = "[--step-color:var(--heroui-primary)]";
					fgColor = "[--step-fg-color:var(--heroui-primary-foreground)]";
					break;
				case "secondary":
					userColor = "[--step-color:var(--heroui-secondary)]";
					fgColor = "[--step-fg-color:var(--heroui-secondary-foreground)]";
					break;
				case "success":
					userColor = "[--step-color:var(--heroui-success)]";
					fgColor = "[--step-fg-color:var(--heroui-success-foreground)]";
					break;
				case "warning":
					userColor = "[--step-color:var(--heroui-warning)]";
					fgColor = "[--step-fg-color:var(--heroui-warning-foreground)]";
					break;
				case "danger":
					userColor = "[--step-color:var(--heroui-error)]";
					fgColor = "[--step-fg-color:var(--heroui-error-foreground)]";
					break;
				case "default":
					userColor = "[--step-color:var(--heroui-default)]";
					fgColor = "[--step-fg-color:var(--heroui-default-foreground)]";
					break;
				default:
					userColor = "[--step-color:var(--heroui-primary)]";
					fgColor = "[--step-fg-color:var(--heroui-primary-foreground)]";
					break;
			}

			colorsVars.unshift(fgColor);
			colorsVars.unshift(userColor);

			return colorsVars;
		}, [color]);

		return (
			<nav aria-label="Progress" className="w-full overflow-x-auto">
				<ol
					className={cn("flex flex-row flex-nowrap w-full", colors, className)}
				>
					{steps?.map((step, stepIdx) => {
						let status =
							currentStep === stepIdx
								? "active"
								: currentStep < stepIdx
								? "inactive"
								: "complete";

						return (
							<li
								key={stepIdx}
								className="relative flex w-full items-center justify-between " // Ensuring full width for each step
							>
								<button
									ref={ref}
									aria-current={status === "active" ? "step" : undefined}
									className={cn(
										"group flex w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-large py-2.5",
										stepClassName
									)}
									onClick={() => setCurrentStep(stepIdx)}
									{...props}
								>
									<div className="h-full relative flex items-center ">
										<LazyMotion features={domAnimation}>
											<m.div
												animate={status}
												className="relative w-full flex justify-between"
											>
												{" "}
												{/* Ensure full width */}
												<m.div
													className={cn(
														"relative flex h-[34px] w-[34px] items-center justify-center rounded-full border-medium text-large font-semibold text-default-foreground",
														{
															"shadow-lg": status === "complete",
														}
													)}
													initial={false}
													transition={{ duration: 0.25 }}
													variants={{
														inactive: {
															backgroundColor: "transparent",
															borderColor: "white",
															color: "white",
														},
														active: {
															backgroundColor: "transparent",
															borderColor: "white",
															color: "white",
														},
														complete: {
															backgroundColor: "white",
															borderColor: "white",
															color: "white",
														},
													}}
												>
													<div className="flex items-center justify-center">
														{status === "complete" ? (
															<CheckIcon className="h-6 w-6 text-[var(--active-fg-color)]" />
														) : (
															<span>{stepIdx + 1}</span>
														)}
													</div>
												</m.div>
											</m.div>
										</LazyMotion>
										{stepIdx < steps.length - 1 && !hideProgressBars && (
											<div
												aria-hidden="true"
												className={cn(
													"pointer-events-none absolute top-1/2 -translate-y-1/2 translate-x-screen"
												)}
											>
												<div
													className={cn(
														"relative h-0.5 w-full bg-default-200 transition-colors duration-300",
														"after:absolute after:block after:h-full after:w-0 after:bg-[var(--active-border-color)] after:transition-[width] after:duration-300 after:content-['']",
														{
															"after:w-[50%]": stepIdx < currentStep,
														}
													)}
													style={{
														left: `calc(100% / ${steps.length} * ${
															stepIdx + 1
														})`, // Position the progress bar between stepIdx and stepIdx+1
													}}
												/>
											</div>
										)}
									</div>
									<div className="max-w-[100px] flex-1 px-2 text-center lg:max-w-[120px]">
										<div
											className={cn(
												"line-clamp-2 text-small font-medium text-white transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium",
												{
													"text-white": status === "inactive",
												}
											)}
										>
											{step.title}
										</div>
									</div>
								</button>
							</li>
						);
					})}
				</ol>
			</nav>
		);
	}
);

HorizontalSteps.displayName = "HorizontalSteps";

export default HorizontalSteps;
