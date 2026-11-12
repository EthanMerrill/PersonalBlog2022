import type {Metadata} from "next";
import "./globals.scss";
import "../src/style/style.scss";
import "react-tooltip/dist/react-tooltip.css";

export const metadata: Metadata = {
	title: "Ethan Merrill",
	description: "A collection of work by Ethan Merrill. Completed projects, in-progress projects, and more.",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/manifest.json",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" style={{scrollBehavior: "smooth"}}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				{/* eslint-disable-next-line @next/next/no-page-custom-font */}
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700&family=Oswald:wght@400;500&display=swap" rel="stylesheet" />
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				{children}
			</body>
		</html>
	);
}
