/** biome-ignore-all lint/a11y/noSvgWithoutTitle: We need it of OG */

import type { FC } from "react";
import { OgBackground } from "./seo/OgBackground";

interface OGImageProps {
	pill: string;
	title: string;
	description: string;
}

const THEME_COLORS = [
	{ h: 220, s: 90, l: 55 }, // Indigo (Lab default)
	{ h: 326, s: 100, l: 74 }, // Pink (Dracula)
	{ h: 141, s: 50, l: 60 }, // Emerald
	{ h: 321, s: 70, l: 69 }, // Synthwave
	{ h: 41, s: 74, l: 53 }, // Bumblebee
	{ h: 183, s: 47, l: 59 }, // Cupcake
	{ h: 3, s: 74, l: 76 }, // Retro
	{ h: 259, s: 94, l: 51 }, // Light (Deep Purple)
	{ h: 187, s: 85, l: 39 }, // Night
	{ h: 344, s: 96, l: 28 }, // Autumn
	{ h: 25, s: 95, l: 55 }, // Orange
];

function getThemeColor(name: string): { h: number; s: number; l: number } {
	if (name === "Ritik's Lab") return THEME_COLORS[0] as { h: number; s: number; l: number };
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	const index = Math.abs(hash) % THEME_COLORS.length;
	return (THEME_COLORS[index] || THEME_COLORS[0]) as { h: number; s: number; l: number };
}

export const OGImage: FC<OGImageProps> = ({ pill, title, description }) => {
	const theme = getThemeColor(title);

	return (
		<OgBackground themeColor={theme}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
				<div
					style={{
						padding: "10px 24px",
						background: `linear-gradient(135deg, hsl(${theme.h}, ${theme.s}%, ${theme.l ?? 50}%) 0%, hsl(${(theme.h + 40) % 360}, ${theme.s}%, ${Math.max((theme.l ?? 50) - 15, 20)}%) 100%)`,
						borderRadius: "99px",
						display: "flex",
						alignItems: "center",
						marginTop: "-75px",
						marginBottom: "32px",
						boxShadow: `0 8px 16px -4px hsla(${theme.h}, ${theme.s}%, ${theme.l ?? 50}%, 0.3)`,
					}}>
					<span style={{ fontSize: "16px", fontWeight: 700, color: "white", letterSpacing: "1.5px", textTransform: "uppercase" }}>{pill}</span>
				</div>

				<h1
					style={{
						fontSize: title.length > 25 ? "72px" : "96px",
						fontWeight: 900,
						color: "#1a1a1a",
						margin: "0 0 32px 0",
						lineHeight: 1.1,
						letterSpacing: "-3px",
						textAlign: "center",
						maxWidth: "1000px",
					}}>
					{title}
				</h1>

				<p
					style={{
						fontSize: "28px",
						color: "#525252",
						margin: 0,
						maxWidth: "700px",
						textAlign: "center",
						fontWeight: 500,
						lineHeight: 1.4,
						letterSpacing: "-0.5px",
					}}>
					{description}
				</p>
			</div>
		</OgBackground>
	);
};
