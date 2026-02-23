"use client";

import { ThemeProvider } from "next-themes";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";

/* ── Theme lists ─────────────────────────────────────── */

export const LIGHT_THEMES = [
	"light",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"retro",
	"cyberpunk",
	"valentine",
	"garden",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"cmyk",
	"autumn",
	"acid",
	"lemonade",
	"winter",
	"nord",
	"caramellatte",
	"silk",
] as const;

export const DARK_THEMES = ["dark", "synthwave", "halloween", "forest", "black", "luxury", "dracula", "business", "night", "coffee", "dim", "abyss", "sunset"] as const;

export const ALL_THEMES = [...LIGHT_THEMES, ...DARK_THEMES] as const;

export const FEATURED_THEMES = ["light", "dark", "nord", "black", "sunset"] as const;

/* ── Animation speed ─────────────────────────────────── */

export const ANIMATION_SPEEDS = [
	{ id: "instant", label: "Instant", description: "No animations", icon: "f0e7" },
	{ id: "swift", label: "Swift", description: "Quick & snappy", icon: "f135" },
	{ id: "smooth", label: "Smooth", description: "Balanced default", icon: "f4d8" },
	{ id: "gentle", label: "Gentle", description: "Slow & elegant", icon: "f06c" },
] as const;

export type AnimationSpeed = (typeof ANIMATION_SPEEDS)[number]["id"];

const STORAGE_KEY = "animation-speed";

type AnimationContextValue = {
	speed: AnimationSpeed;
	setSpeed: (speed: AnimationSpeed) => void;
};

const AnimationContext = createContext<AnimationContextValue>({
	speed: "smooth",
	setSpeed: () => {},
});

export const useAnimation = () => useContext(AnimationContext);

function AnimationProvider({ children }: { children: ReactNode }) {
	const [speed, setSpeedState] = useState<AnimationSpeed>("smooth");

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && ANIMATION_SPEEDS.some((s) => s.id === stored)) {
			setSpeedState(stored as AnimationSpeed);
		}
	}, []);

	const setSpeed = useCallback((s: AnimationSpeed) => {
		setSpeedState(s);
		localStorage.setItem(STORAGE_KEY, s);
		document.documentElement.setAttribute("data-animation", s);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-animation", speed);
	}, [speed]);

	return <AnimationContext value={{ speed, setSpeed }}>{children}</AnimationContext>;
}

/* ── Root provider ───────────────────────────────────── */

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="data-theme" defaultTheme="black" themes={[...ALL_THEMES]}>
			<AnimationProvider>{children}</AnimationProvider>
		</ThemeProvider>
	);
}
