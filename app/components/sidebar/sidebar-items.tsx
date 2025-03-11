import { type SidebarItem } from "./sidebar";

export const sectionItems: SidebarItem[] = [
	{
		key: "main",
		title: "Main menu",
		items: [
			{
				key: "home",
				href: "#",
				icon: "solar:home-2-linear",
				title: "Home",
			},
			{
				key: "projects",
				href: "#",
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
		],
	},
];
