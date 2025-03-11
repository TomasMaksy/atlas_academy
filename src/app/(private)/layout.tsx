"use client";

import { Button, Divider, Link, Spacer, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "@/components/acme";
import { usePathname } from "next/navigation";

interface PrivateLayoutProps {
	children: React.ReactNode;
}

export const menuItems = [
	{
		key: "home",
		href: "/home",
		icon: "solar:home-2-linear",
		title: "Home",
	},
	{
		key: "projects",
		href: "/projects",
		icon: "solar:widget-2-outline",
		title: "Projects",
	},
	{
		key: "tasks",
		href: "#",
		icon: "solar:checklist-minimalistic-outline",
		title: "Tasks",
	},
	{
		key: "team",
		href: "#",
		icon: "solar:users-group-two-rounded-outline",
		title: "Team",
	},
];

export default function PrivateLayout({ children }: PrivateLayoutProps) {
	const pathname = usePathname();
	const selectedKey = pathname.split("/")[1];

	return (
		<main className="flex">
			{/* Sidebar */}
			<div className="h-screen fixed bg-white">
				<div className="relative flex h-full w-16 flex-1 flex-col items-center border-r-small border-divider px-2 py-8 justi">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
						<AcmeIcon className="text-background" />
					</div>

					<Spacer y={8} />

					<div className="flex flex-col items-center gap-6 ">
						{menuItems.map((item) => (
							<Tooltip key={item.key} content={item.title} placement="right">
								<Link
									key={item.key}
									href={item.href}
									className="flex w-full items-center justify-center hover:text-foreground"
									isDisabled={selectedKey === item.key}
								>
									<Icon
										className="text-default-500 group-data-[selected=true]:text-foreground"
										icon={item.icon}
										width={24}
									/>
								</Link>
							</Tooltip>
						))}
						<Divider className="w-10" />
					</div>

					<Spacer y={8} />
					{/* Help & Log Out */}
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
			<div className="flex-1 ml-8 pl-8">{children}</div>
		</main>
	);
}
