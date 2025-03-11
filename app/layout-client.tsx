"use client";

import React from "react";
import { Button, Spacer, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

import Sidebar from "./components/sidebar/sidebar";
import { sectionItems } from "./components/sidebar/sidebar-items";
import { AcmeIcon } from "./components/sidebar/acme";

interface PrivateClientLayoutProps {
	children: React.ReactNode;
}

export default function PrivateClientLayout({
	children,
}: PrivateClientLayoutProps) {
	return (
		<main className="flex">
			<div className=" min-h-[48rem] h-screen">
				<div className="relative flex h-full w-16 flex-1 flex-col items-center border-r-small border-divider px-2 py-8 justi">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
						<AcmeIcon className="text-background" />
					</div>

					<Spacer y={8} />

					<Sidebar isCompact defaultSelectedKey="home" items={sectionItems} />

					<Spacer y={8} />

					<div className="mt-auto flex flex-col items-center">
						<Tooltip content="Help & Feedback" placement="right">
							<Button
								isIconOnly
								className="data-[hover=true]:text-foreground"
								variant="light"
							>
								<Icon
									className="text-default-500 "
									icon="solar:info-circle-line-duotone"
									width={24}
								/>
							</Button>
						</Tooltip>
						<Tooltip content="Log Out" placement="right">
							<Button
								isIconOnly
								className="data-[hover=true]:text-foreground"
								variant="light"
							>
								<Icon
									className="rotate-180 text-default-500"
									icon="solar:minus-circle-line-duotone"
									width={24}
								/>
							</Button>
						</Tooltip>
					</div>
				</div>
			</div>
			<div className="flex-1">{children}</div>
		</main>
	);
}
