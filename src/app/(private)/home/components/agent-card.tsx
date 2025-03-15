import React from "react";

import { Card, CardBody, Image, cn, Link, type CardProps } from "@heroui/react";

interface AgentCardProps extends CardProps {
  color: string;
  character: string;
  title: string;
  higlighted?: boolean;
  imageSrc: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  color,
  character,
  title,
  imageSrc,
  higlighted,
  ...props
}) => {
  return (
    <div className="w-full">
      <Card
        as={Link}
				href="/quiz"
        className={cn(
          `overflow-hidden flex-grow h-[400px] w-full`,
          higlighted
            ? " shadow-2xl scale-105 duration-300"
            : ""
        )}
        {...props}
        shadow="lg"
        style={{
          background: `radial-gradient(ellipse 500% 150% at top, ${color})`,
        }}
      >
        <CardBody className="px-3 relative scroll overflow-y-hidden p-10">
          <div className="flex flex-col px-2 relative items-center">
            <p className="text-7xl font-semibold text-white/100 tracking-tighter">
              {character}
            </p>
            <span className="text-small text-white/60 tracking-normal -mt-1">
              {title}
            </span>


            <div className="absolute top-20 hover:scale-105 duration-300">
              <Image src={imageSrc} alt={character} width={200} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AgentCard;
