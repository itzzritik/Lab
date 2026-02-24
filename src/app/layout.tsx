import { Gliff } from "gliff";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "#components/providers";
import { displayFamily, monoFamily, textFamily } from "#utils/font";
import { BASE_URL } from "#utils/helper";
import "./globals.css";

const description = "Interactive experiments & creative explorations in web development, creative coding, and generative art";

export const metadata: Metadata = {
	title: { default: "Ritik's Lab", template: "%s | Ritik's Lab" },
	description,
	metadataBase: new URL(BASE_URL),
	keywords: ["experiments", "creative coding", "web development", "generative art", "interactive", "visualization"],
	authors: [{ name: "Ritik", url: BASE_URL }],
	creator: "Ritik",
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Ritik's Lab",
		title: "Ritik's Lab",
		description,
		url: BASE_URL,
	},
	twitter: {
		card: "summary_large_image",
		title: "Ritik's Lab",
		description,
	},
	alternates: { canonical: BASE_URL },
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
