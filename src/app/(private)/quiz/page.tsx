import React from "react";
import HorizontalSteps from "./horizontal-steps";

const Questionaire = () => (
	<HorizontalSteps
		defaultStep={2}
		className="w-full"
		steps={[
			{
				title: "Create account",
			},
			{
				title: "Company Information",
			},
			{
				title: "Choose Address",
			},
			{
				title: "Complete Payment",
			},
			{
				title: "Preview and Confirm",
			},
		]}
	/>
);

export default Questionaire;
