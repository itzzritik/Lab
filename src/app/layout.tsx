import { Gliff } from "gliff";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "#components/providers";
import { displayFamily, monoFamily, textFamily } from "#utils/font";
import "./globals.css";

export const metadata: Metadata = {
	title: "Ritik's Lab",
	description: "Interactive experiments & creative explorations",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			data-animation="smooth"
			className={`${displayFamily.variable} ${textFamily.variable} ${monoFamily.variable} antialiased`}
			suppressHydrationWarning>
			<head>
				<meta name="view-transition" content="same-origin" />
				<Gliff next />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var s=localStorage.getItem("animation-speed");if(s&&["instant","swift","smooth","gentle"].indexOf(s)!==-1){document.documentElement.setAttribute("data-animation",s)}else{document.documentElement.setAttribute("data-animation","smooth")}}catch(e){document.documentElement.setAttribute("data-animation","smooth")}})()`,
					}}
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
