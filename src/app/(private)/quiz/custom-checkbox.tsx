import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@heroui/react";

interface CustomCheckboxProps {
	children?: React.ReactNode;
	isSelected?: boolean;
	isFocusVisible?: boolean;
	// ignore eslint
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
	color: string;
}

export const CustomCheckbox = ({ color, ...props }: CustomCheckboxProps) => {
	console.log(color);
	const checkbox = tv({
		slots: {
			base: "hover:bg-default-100 bg-white/70",
			content: "text-default-700 font-normal",
		},
		variants: {
			isSelected: {
				true: {
					base: `border-white border-3 bg-white hover:bg-white/80`,
					content: "text-primary-foreground pl-1",
				},
			},
			isFocusVisible: {
				true: {
					base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
				},
			},
		},
	});

	const {
		children,
		isSelected,
		isFocusVisible,
		getBaseProps,
		getLabelProps,
		getInputProps,
	} = useCheckbox({ ...props });

	const styles = checkbox({ isSelected, isFocusVisible });

	return (
		<label {...getBaseProps()}>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<div className="flex-grow justify-center items-center">
				<Chip
					classNames={{
						base: styles.base(),
						content: styles.content(),
					}}
					color="primary"
					startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
					variant="flat"
					{...getLabelProps()}
				>
					{children ? children : isSelected ? "Enabled" : "Disabled"}
				</Chip>
			</div>
		</label>
	);
};

const CheckIcon = (
	props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height="1em"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			viewBox="0 0 24 24"
			width="1em"
			{...props}
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
};
