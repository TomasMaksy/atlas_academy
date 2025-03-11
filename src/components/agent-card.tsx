import React from "react";

import { Card, CardBody, Image, type CardProps } from "@heroui/react";

const agentCard = (props: CardProps) => {
	return (
		<div>
			<Card
				className="overflow-none   border-small border-foreground/10 bg-[radial-gradient(ellipse_500%_350%_at_top,#6c5b7b,#7e2ec4)] w-[400px] h-[500px] "
				{...props}
				shadow="lg"
			>
				<CardBody className="px-3 relative scroll overflow-y-hidden py-12">
					<div className="flex flex-col px-2 relative items-center">
						<p className="text-7xl font-semibold text-white/100 tracking-tighter ">
							Guido
						</p>
						<span className="text-small text-white/60 tracking-normal -mt-1">
							University Selection Guide
						</span>

						<div className="absolute top-20">
							<Image src="/Guido.png" alt="Agent" width={300} />{" "}
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default agentCard;
