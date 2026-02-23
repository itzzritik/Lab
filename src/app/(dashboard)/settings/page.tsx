"use client";

import { Icon } from "gliff";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ANIMATION_SPEEDS, DARK_THEMES, LIGHT_THEMES, useAnimation } from "#components/providers";

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const { speed, setSpeed } = useAnimation();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="mx-auto max-w-4xl p-8">
				<div className="mb-8 h-10 w-40 animate-pulse rounded-lg bg-base-300" />
				<div className="h-96 animate-pulse rounded-2xl bg-base-300" />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl p-8">
			<h1 className="mb-8 font-bold font-display text-3xl tracking-tight">Settings</h1>

			{/* ── Theme Picker ──────────────────────────────── */}
			<section className="mb-6 animate-fade-up rounded-2xl border border-base-content/5 bg-base-100 p-6">
				<h2 className="mb-1 flex items-center gap-2 font-semibold text-lg">
					<Icon code="f53f" type="solid" className="ico-4 text-primary" />
					Theme
				</h2>
				<p className="mb-6 text-base-content/40 text-sm">Choose a theme for the interface</p>

				<h3 className="mb-3 font-semibold text-base-content/30 text-xs uppercase tracking-widest">Light</h3>
				<div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
					{LIGHT_THEMES.map((t) => (
						<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} />
					))}
				</div>

				<h3 className="mb-3 font-semibold text-base-content/30 text-xs uppercase tracking-widest">Dark</h3>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
					{DARK_THEMES.map((t) => (
						<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} />
					))}
				</div>
			</section>

			{/* ── Animation Speed ───────────────────────────── */}
			<section className="animate-fade-up rounded-2xl border border-base-content/5 bg-base-100 p-6" style={{ animationDelay: "100ms" }}>
				<h2 className="mb-1 flex items-center gap-2 font-semibold text-lg">
					<Icon code="f3fd" type="solid" className="ico-4 text-primary" />
					Animation Speed
				</h2>
				<p className="mb-6 text-base-content/40 text-sm">Control how fast transitions and animations play</p>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{ANIMATION_SPEEDS.map((s) => (
						<button
							key={s.id}
							type="button"
							onClick={() => setSpeed(s.id)}
							className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all dur${
								speed === s.id
									? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
									: "border-base-content/5 bg-base-200 hover:border-base-content/10 hover:bg-base-300"
							}
							`}>
							<span className={`font-semibold text-sm ${speed === s.id ? "text-primary" : "text-base-content/70"}`}>{s.label}</span>
							<span className={`text-center text-xs ${speed === s.id ? "text-primary/60" : "text-base-content/30"}`}>{s.description}</span>
						</button>
					))}
				</div>
			</section>
		</div>
	);
}

function ThemeCard({ name, active, onSelect }: { name: string; active: boolean; onSelect: () => void }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			data-theme={name}
			className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 bg-base-100 p-3 transition-all dur${active ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-base-content/10 hover:border-base-content/20"}
			`}>
			<div className="flex gap-1">
				<div className="h-5 w-5 rounded-full bg-primary" />
				<div className="h-5 w-5 rounded-full bg-secondary" />
				<div className="h-5 w-5 rounded-full bg-accent" />
				<div className="h-5 w-5 rounded-full bg-neutral" />
			</div>
			<span className="w-full truncate text-center font-medium text-base-content text-xs capitalize">{name}</span>
		</button>
	);
}
