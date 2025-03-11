import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "./providers"; // Adjust the import path as needed
import ClientLayout from "./layout-client";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>
			</head>
			<body
				className={clsx(
					dmSans.className,
					"antialiased  text-default-600 min-h-screen flex flex-col"
				)}
			>
				<Providers>
					<ClientLayout>{children}</ClientLayout>
				</Providers>
			</body>
		</html>
	);
}
