import React from "react";
import { Card, CardBody, Image, type CardProps } from "@heroui/react";

const agentCard = (props: CardProps) => {
	return (
		<div className="w-full">
			{" "}
			<Card
				className="overflow-none  bg-[radial-gradient(ellipse_500%_150%_at_top,#c9d843,#d6e07e)] flex-grow h-[400px] w-full" // Use w-full to make the card responsive and grow with the space
				{...props}
				shadow="lg"
			>
				<CardBody className="px-3 relative scroll overflow-y-hidden p-10">
					<div className="flex flex-col px-2 relative items-center">
						<p className="text-7xl font-semibold text-white/100 tracking-tighter">
							Irven
						</p>
						<span className="text-small text-white/60 tracking-normal -mt-1">
							Interview Specialist{" "}
						</span>

						<div className="absolute top-20">
							<Image src="/Irven.png" alt="Agent" width={200} />
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default agentCard;
