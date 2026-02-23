"use client";

import { Icon } from "gliff";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ANIMATION_SPEEDS, DARK_THEMES, FEATURED_THEMES, LIGHT_THEMES, useAnimation } from "#components/providers";
import { cn } from "#utils/helper";

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const { speed, setSpeed } = useAnimation();
	const [mounted, setMounted] = useState(false);
	const [themesExpanded, setThemesExpanded] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="mx-auto max-w-4xl p-8">
				<div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-base-300" />
				<div className="h-64 animate-pulse rounded-2xl bg-base-300" />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl p-8">
			<h1 className="mb-8 animate-fade-up font-display text-3xl font-bold tracking-tight">Settings</h1>

			{/* ── Theme ─────────────────────────────────────── */}
			<section className="mb-6 animate-fade-up rounded-2xl border border-base-content/5 bg-base-100 p-6">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
						<Icon code="f53f" type="solid" className="ico-4 text-primary" />
					</div>
					<div>
						<h2 className="font-semibold">Theme</h2>
						<p className="text-sm text-base-content/40">Personalize your interface</p>
					</div>
				</div>

				{/* Featured themes */}
				<div className="mb-4 grid grid-cols-5 gap-3">
					{FEATURED_THEMES.map((t) => (
						<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} featured />
					))}
				</div>

				{/* Expand toggle */}
				<button
					type="button"
					onClick={() => setThemesExpanded((v) => !v)}
					className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm text-base-content/40 transition-all dur-fast hover:bg-base-200 hover:text-base-content/60">
					<span>{themesExpanded ? "Show less" : "Browse all themes"}</span>
					<Icon code={themesExpanded ? "f077" : "f078"} type="solid" className={cn("ico-3 transition-transform dur-fast")} />
				</button>

				{/* All themes (expandable) */}
				<div className={cn("grid transition-all dur-slow", themesExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
					<div className="overflow-hidden">
						<p className="mb-2 mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-base-content/30">Light</p>
						<div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
							{LIGHT_THEMES.map((t) => (
								<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} />
							))}
						</div>

						<p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-base-content/30">Dark</p>
						<div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
							{DARK_THEMES.map((t) => (
								<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── Animation Speed ───────────────────────────── */}
			<section className="animate-fade-up rounded-2xl border border-base-content/5 bg-base-100 p-6" style={{ animationDelay: "80ms" }}>
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
						<Icon code="f3fd" type="solid" className="ico-4 text-primary" />
					</div>
					<div>
						<h2 className="font-semibold">Animation Speed</h2>
						<p className="text-sm text-base-content/40">Control transition & animation pace</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{ANIMATION_SPEEDS.map((s) => (
						<button
							key={s.id}
							type="button"
							onClick={() => setSpeed(s.id)}
							className={cn(
								"flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all dur",
								speed === s.id
									? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
									: "border-base-content/5 bg-base-200 hover:border-base-content/10 hover:bg-base-300",
							)}>
							<div
								className={cn(
									"flex h-10 w-10 items-center justify-center rounded-full transition-colors dur",
									speed === s.id ? "bg-primary/15 text-primary" : "bg-base-300 text-base-content/30",
								)}>
								<Icon code={s.icon} type="solid" className="ico-4" />
							</div>
							<span className={cn("text-sm font-semibold", speed === s.id ? "text-primary" : "text-base-content/70")}>{s.label}</span>
							<span className={cn("text-center text-[0.65rem]", speed === s.id ? "text-primary/50" : "text-base-content/25")}>{s.description}</span>
						</button>
					))}
				</div>
			</section>
		</div>
	);
}

function ThemeCard({ name, active, onSelect, featured = false }: { name: string; active: boolean; onSelect: () => void; featured?: boolean }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			data-theme={name}
			className={cn(
				"relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 bg-base-100 transition-all dur",
				featured ? "p-3" : "p-2",
				active ? "border-primary shadow-md ring-2 ring-primary/20" : "border-base-content/10 hover:border-base-content/20 hover:shadow-sm",
			)}>
			{active && (
				<div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content animate-scale-in">
					<Icon code="f00c" type="solid" className="ico-[10]" />
				</div>
			)}
			<div className={cn("flex gap-1", featured ? "gap-1.5" : "gap-1")}>
				<div className={cn("rounded-full bg-primary", featured ? "h-5 w-5" : "h-4 w-4")} />
				<div className={cn("rounded-full bg-secondary", featured ? "h-5 w-5" : "h-4 w-4")} />
				<div className={cn("rounded-full bg-accent", featured ? "h-5 w-5" : "h-4 w-4")} />
				<div className={cn("rounded-full bg-neutral", featured ? "h-5 w-5" : "h-4 w-4")} />
			</div>
			<span className={cn("w-full truncate text-center font-medium capitalize text-base-content", featured ? "text-xs" : "text-[0.6rem]")}>{name}</span>
		</button>
	);
}
