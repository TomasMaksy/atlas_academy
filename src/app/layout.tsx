import clsx from "clsx";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(dmSans.className, "antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
