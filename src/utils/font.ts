import { Days_One, Outfit, Space_Mono } from "next/font/google";

export const displayFamily = Days_One({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--display-family",
	display: "swap",
	preload: true,
});

export const textFamily = Outfit({
	subsets: ["latin"],
	variable: "--text-family",
	display: "swap",
	preload: true,
});

export const monoFamily = Space_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--mono-family",
	display: "swap",
	preload: true,
});
