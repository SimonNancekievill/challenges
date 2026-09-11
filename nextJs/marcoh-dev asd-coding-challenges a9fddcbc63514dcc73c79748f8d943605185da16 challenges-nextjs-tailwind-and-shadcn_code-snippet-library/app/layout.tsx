import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Snippets",
	description: "Collection snippets",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn(inter.variable, jetBrainsMono.variable, "font-sans", geist.variable)}
		>
			<head>
				<style>{`
					body {
						font-family: var(--font-inter);
					}

					h1, h2, h3, h4, h5, h6 {
						font-family: var(--font-inter);
					}

					pre,
					code {
						font-family: var(--font-jetbrains-mono);
					}
				`}</style>
			</head>
			<body>
				<header>
					<h1 className="text-3xl text-red-500">
						<Link href="/">Code Snippet Library</Link>
					</h1>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
