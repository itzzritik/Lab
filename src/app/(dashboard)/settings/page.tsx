"use client";

import { Icon } from "gliff";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ALL_THEMES, ANIMATION_SPEEDS, type AnimationSpeed, DARK_THEMES, LIGHT_THEMES, useAnimation } from "#components/providers";
import { cn } from "#utils/helper";

type ThemeTab = "all" | "light" | "dark";

const TABS: { id: ThemeTab; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "light", label: "Light" },
	{ id: "dark", label: "Dark" },
];

const DEMO_DURATIONS: Record<AnimationSpeed, string> = {
	instant: "0s",
	swift: "0.5s",
	smooth: "1s",
	gentle: "2s",
};

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const { speed, setSpeed } = useAnimation();
	const [mounted, setMounted] = useState(false);
	const [themeTab, setThemeTab] = useState<ThemeTab>("all");
	const [previewKey, setPreviewKey] = useState(0);

	useEffect(() => setMounted(true), []);

	const replay = () => setPreviewKey((k) => k + 1);

	if (!mounted) {
		return (
			<div className="mx-auto max-w-4xl p-8">
				<div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-base-300" />
				<div className="h-64 animate-pulse rounded-2xl bg-base-300" />
			</div>
		);
	}

	const filteredThemes = themeTab === "light" ? LIGHT_THEMES : themeTab === "dark" ? DARK_THEMES : ALL_THEMES;

	return (
		<div className="mx-auto max-w-4xl p-8">
			<h1 className="mb-8 animate-fade-up font-display text-3xl font-bold tracking-tight">Settings</h1>

			{/* ── Theme ─────────────────────────────────────── */}
			<section className="mb-6 animate-fade-up rounded-2xl border border-base-content/15 bg-base-100 p-6">
				<div className="mb-5 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
							<Icon code="f53f" type="solid" className="ico-4 text-primary" />
						</div>
						<div>
							<h2 className="font-semibold text-base-content">Theme</h2>
							<p className="text-sm text-base-content/70">Personalize your interface</p>
						</div>
					</div>

					{/* Tabs */}
					<div className="flex gap-1 rounded-lg bg-base-200 p-1">
						{TABS.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setThemeTab(tab.id)}
								className={cn(
									"rounded-md px-3 py-1 text-xs font-medium transition-all dur-fast",
									themeTab === tab.id ? "bg-base-100 text-base-content shadow-sm" : "text-base-content/60 hover:text-base-content/80",
								)}>
								{tab.label}
							</button>
						))}
					</div>
				</div>

				{/* Theme grid */}
				<div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-6">
					{filteredThemes.map((t) => (
						<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} />
					))}
				</div>
			</section>

			{/* ── Animation Speed ───────────────────────────── */}
			<section className="animate-fade-up rounded-2xl border border-base-content/15 bg-base-100 p-6" style={{ animationDelay: "80ms" }}>
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
						<Icon code="f3fd" type="solid" className="ico-4 text-primary" />
					</div>
					<div>
						<h2 className="font-semibold text-base-content">Animation Speed</h2>
						<p className="text-sm text-base-content/70">Control transition & animation pace</p>
					</div>
				</div>

				{/* Speed cards */}
				<div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
					{ANIMATION_SPEEDS.map((s) => (
						<SpeedCard
							key={s.id}
							speed={s}
							active={speed === s.id}
							onSelect={() => {
								setSpeed(s.id);
								replay();
							}}
						/>
					))}
				</div>

				{/* Live preview */}
				<div className="overflow-hidden rounded-xl border border-base-content/10 bg-base-200">
					<div className="flex items-center justify-between border-b border-base-content/10 px-4 py-2.5">
						<span className="text-xs font-semibold text-base-content/50">Preview</span>
						<button
							type="button"
							onClick={replay}
							className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-base-content/50 transition-all dur-fast hover:bg-base-content/5 hover:text-base-content/80">
							<Icon code="f2f9" type="solid" className="ico-3" />
							Replay
						</button>
					</div>
					<div key={previewKey} className="flex items-center gap-4 p-5">
						{/* Fade-up card */}
						<div className="animate-fade-up flex-1 rounded-lg bg-base-100 p-3 shadow-sm">
							<div className="mb-2 h-2 w-2/3 rounded bg-base-content/15" />
							<div className="h-2 w-1/3 rounded bg-base-content/10" />
						</div>

						{/* Expanding bar */}
						<div className="flex flex-1 flex-col gap-2">
							<div className="h-2 overflow-hidden rounded-full bg-base-300">
								<div className="h-full rounded-full bg-primary" style={{ animation: "expand-width var(--dur-slow) ease-out both" }} />
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-base-300">
								<div className="h-full rounded-full bg-secondary" style={{ animation: "expand-width var(--dur-slow) 100ms ease-out both" }} />
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-base-300">
								<div className="h-full rounded-full bg-accent" style={{ animation: "expand-width var(--dur-slow) 200ms ease-out both" }} />
							</div>
						</div>

						{/* Scale-in badges */}
						<div className="flex flex-1 flex-wrap justify-center gap-2">
							<div className="animate-scale-in rounded-full bg-primary/15 px-3 py-1 text-[0.6rem] font-medium text-primary">Primary</div>
							<div
								className="animate-scale-in rounded-full bg-secondary/15 px-3 py-1 text-[0.6rem] font-medium text-secondary"
								style={{ animationDelay: "80ms" }}>
								Secondary
							</div>
							<div
								className="animate-scale-in rounded-full bg-accent/15 px-3 py-1 text-[0.6rem] font-medium text-accent"
								style={{ animationDelay: "160ms" }}>
								Accent
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

/* ── Theme Card (paint swatch) ──────────────────────── */

function ThemeCard({ name, active, onSelect }: { name: string; active: boolean; onSelect: () => void }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			data-theme={name}
			className={cn(
				"group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-base-100 transition-all dur",
				active ? "border-primary shadow-md ring-2 ring-primary/20" : "border-base-content/15 hover:border-base-content/25 hover:shadow-sm",
			)}>
			{active && (
				<div className="animate-scale-in absolute right-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-content">
					<Icon code="f00c" type="solid" className="ico-[8]" />
				</div>
			)}
			{/* Color swatch */}
			<div className="h-7 w-full bg-primary" />
			<div className="flex h-1.5 w-full">
				<div className="flex-1 bg-secondary" />
				<div className="flex-1 bg-accent" />
				<div className="flex-1 bg-neutral" />
			</div>
			{/* Name */}
			<span className="w-full truncate px-2 py-1.5 text-center text-[0.6rem] font-medium capitalize text-base-content">{name}</span>
		</button>
	);
}

/* ── Speed Card with micro-animation ────────────────── */

function SpeedCard({ speed, active, onSelect }: { speed: (typeof ANIMATION_SPEEDS)[number]; active: boolean; onSelect: () => void }) {
	const demoDuration = DEMO_DURATIONS[speed.id as AnimationSpeed];
	const isInstant = speed.id === "instant";

	return (
		<button
			type="button"
			onClick={onSelect}
			className={cn(
				"flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all dur",
				active ? "border-primary bg-primary/10 shadow-lg shadow-primary/5" : "border-base-content/15 bg-base-200 hover:border-base-content/25 hover:bg-base-300",
			)}>
			{/* Micro-animation track */}
			<div className="relative h-1.5 w-full rounded-full bg-base-content/10">
				<div
					className={cn("absolute top-0 left-0 h-1.5 w-1.5 rounded-full", active ? "bg-primary" : "bg-base-content/40")}
					style={isInstant ? { left: "calc(100% - 0.375rem)" } : { animation: `bounce-x ${demoDuration} ease-in-out infinite` }}
				/>
			</div>

			{/* Icon */}
			<div
				className={cn(
					"flex h-9 w-9 items-center justify-center rounded-full transition-colors dur",
					active ? "bg-primary/15 text-primary" : "bg-base-300 text-base-content/60",
				)}>
				<Icon code={speed.icon} type="solid" className="ico-4" />
			</div>

			<div className="text-center">
				<span className={cn("block text-sm font-semibold", active ? "text-primary" : "text-base-content")}>{speed.label}</span>
				<span className={cn("block text-[0.6rem]", active ? "text-primary/70" : "text-base-content/60")}>{speed.description}</span>
			</div>
		</button>
	);
}
