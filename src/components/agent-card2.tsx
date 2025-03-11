import React from "react";

import { Card, CardBody, Image, type CardProps } from "@heroui/react";

const agentCard = (props: CardProps) => {
	return (
		<div>
			<Card
				className="overflow-none   border-small border-foreground/10 bg-[radial-gradient(ellipse_500%_150%_at_top,#3fafa8,#1af9ea)] w-[400px] h-[500px] "
				{...props}
				shadow="lg"
			>
				<CardBody className="px-3 relative scroll overflow-y-hidden py-12">
					<div className="flex flex-col px-2 relative items-center">
						<p className="text-7xl font-semibold text-white/100 tracking-tighter">
							Esme
						</p>
						<span className="text-small text-white/60 tracking-normal -mt-1">
							Common Essay Writer{" "}
						</span>

						<div className="absolute top-20">
							<Image src="/0084.png" alt="Agent" width={300} />{" "}
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default agentCard;
