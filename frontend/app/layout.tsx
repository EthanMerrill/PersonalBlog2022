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
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				{children}
			</body>
		</html>
	);
}
