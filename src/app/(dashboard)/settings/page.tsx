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

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const { speed, setSpeed } = useAnimation();
	const [mounted, setMounted] = useState(false);
	const [themeTab, setThemeTab] = useState<ThemeTab>("all");

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="p-8">
				<div className="mb-10 h-8 w-48 animate-pulse rounded-lg bg-base-300" />
				<div className="mb-8 h-4 w-32 animate-pulse rounded bg-base-300" />
				<div className="h-48 animate-pulse rounded-xl bg-base-300" />
			</div>
		);
	}

	const filteredThemes = themeTab === "light" ? LIGHT_THEMES : themeTab === "dark" ? DARK_THEMES : ALL_THEMES;

	return (
		<div className="p-8">
			<h1 className="mb-10 animate-fade-up font-display text-3xl font-bold tracking-tight">Settings</h1>

			{/* ── Theme ─────────────────────────────────────── */}
			<section className="mb-6 animate-fade-up overflow-hidden rounded-2xl border border-base-content/8 bg-base-200">
				<div className="flex items-center justify-between border-b border-base-content/8 px-6 py-4">
					<div>
						<h2 className="text-sm font-semibold text-base-content">Theme</h2>
						<p className="text-xs text-base-content/50">Personalize your interface</p>
					</div>
					<div className="flex gap-1 rounded-lg bg-base-content/5 p-1">
						{TABS.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setThemeTab(tab.id)}
								className={cn(
									"rounded-md px-3 py-1 text-xs font-medium transition-all dur-fast",
									themeTab === tab.id ? "bg-base-300 text-base-content shadow-sm" : "text-base-content/50 hover:text-base-content/80",
								)}>
								{tab.label}
							</button>
						))}
					</div>
				</div>

				<div className="grid grid-cols-5 gap-2.5 p-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
					{filteredThemes.map((t) => (
						<ThemeCard key={t} name={t} active={theme === t} onSelect={() => setTheme(t)} />
					))}
				</div>
			</section>

			{/* ── Animation Speed ───────────────────────────── */}
			<section className="animate-fade-up overflow-hidden rounded-2xl border border-base-content/8 bg-base-200" style={{ animationDelay: "80ms" }}>
				<div className="border-b border-base-content/8 px-6 py-4">
					<h2 className="text-sm font-semibold text-base-content">Animation Speed</h2>
					<p className="text-xs text-base-content/50">Control transition & animation pace</p>
				</div>

				<div className="grid grid-cols-[1fr_1fr] gap-6 p-5">
					{/* Speed cards */}
					<div className="grid grid-cols-2 gap-2.5">
						{ANIMATION_SPEEDS.map((s) => {
							const isActive = speed === s.id;
							return (
								<button
									key={s.id}
									type="button"
									onClick={() => setSpeed(s.id)}
									className={cn(
										"group flex cursor-pointer flex-col gap-4 rounded-xl border p-3.5 text-left transition-all dur",
										isActive ? "border-primary bg-primary/5" : "border-base-content/8 hover:bg-base-content/3",
									)}>
									<div className="flex w-full items-start justify-between">
										<div
											className={cn(
												"flex h-8 w-8 items-center justify-center rounded-lg border transition-colors dur-fast",
												isActive
													? "border-primary bg-primary text-primary-content"
													: "border-base-content/10 bg-base-content/5 text-base-content/50 group-hover:border-primary/30",
											)}>
											<Icon code={s.icon} type="solid" className="ico-[14]" />
										</div>
										{isActive && <Icon code="f00c" type="solid" className="ico-3 text-primary" />}
									</div>
									<div>
										<span className="block text-sm font-semibold">{s.label}</span>
										<span className="block text-[0.65rem] text-base-content/50">{s.description}</span>
									</div>
								</button>
							);
						})}
					</div>

					{/* Interactive preview */}
					<AnimationPreview speed={speed} />
				</div>
			</section>
		</div>
	);
}

/* ── Animation Preview ──────────────────────────────── */

function AnimationPreview({ speed }: { speed: AnimationSpeed }) {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(true);
		setTimeout(() => setClicked(false), 800);
	};

	return (
		<div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-base-content/10 bg-base-300/50">
			{/* Grid pattern */}
			<div
				className="pointer-events-none absolute inset-0 opacity-30"
				style={{
					backgroundImage:
						"linear-gradient(to right, oklch(from var(--color-base-content) l c h / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(from var(--color-base-content) l c h / 0.05) 1px, transparent 1px)",
					backgroundSize: "20px 20px",
				}}
			/>

			<span className="pointer-events-none absolute left-0 top-5 w-full select-none text-center text-[0.55rem] font-bold uppercase tracking-[0.2em] text-base-content/20">
				Animation Preview
			</span>

			{/* Card stack */}
			<button type="button" onClick={handleClick} className="group relative flex h-28 w-[55%] cursor-pointer items-center justify-center outline-none">
				{/* Back card */}
				<div
					className={cn(
						"pointer-events-none absolute inset-0 rounded-xl border border-primary/10 bg-primary/10 transition-all ease-out",
						"translate-y-3 rotate-[-5deg] scale-90",
						"group-hover:-translate-x-4 group-hover:translate-y-1 group-hover:rotate-[-10deg]",
						"group-active:translate-x-0 group-active:translate-y-2 group-active:rotate-0 group-active:scale-90",
						clicked && "scale-50 opacity-0",
					)}
					style={{ transitionDuration: "var(--dur)" }}
				/>
				{/* Middle card */}
				<div
					className={cn(
						"pointer-events-none absolute inset-0 rounded-xl border border-base-content/10 bg-base-200/80 shadow-sm transition-all ease-out",
						"translate-y-1.5 rotate-[-2.5deg] scale-95",
						"group-hover:-translate-x-2 group-hover:translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-md",
						"group-active:translate-x-0 group-active:translate-y-0.5 group-active:rotate-0 group-active:scale-95",
						clicked && "scale-90 opacity-0",
					)}
					style={{ transitionDuration: "var(--dur)" }}
				/>
				{/* Front card */}
				<div
					className={cn(
						"relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-base-content/10 bg-base-200 shadow-lg transition-all ease-out",
						"group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-xl",
						"group-active:translate-y-0.5 group-active:scale-[0.98] group-active:shadow-sm",
						clicked && "border-primary ring-4 ring-primary/10",
					)}
					style={{ transitionDuration: "var(--dur)" }}>
					<div
						className={cn(
							"flex h-9 w-9 items-center justify-center rounded-lg bg-base-300 transition-all",
							"group-hover:scale-110 group-hover:bg-primary/10",
							"group-active:scale-90 group-active:bg-primary/20",
							clicked && "bg-success/10",
						)}
						style={{ transitionDuration: "var(--dur)" }}>
						<Icon
							code={clicked ? "f00c" : "f245"}
							type="solid"
							className={cn(
								"ico-4 text-base-content/50 transition-all",
								"group-hover:rotate-12 group-hover:text-primary",
								"group-active:rotate-0",
								clicked && "text-success",
							)}
							style={{ transitionDuration: "var(--dur)" }}
						/>
					</div>
					<div className="text-center">
						<span
							className={cn("block text-sm font-semibold transition-all", "group-hover:text-primary", clicked && "text-success")}
							style={{ transitionDuration: "var(--dur)" }}>
							{clicked ? (
								"Clicked!"
							) : (
								<>
									<span className="block group-hover:hidden group-active:hidden">Interact</span>
									<span className="hidden group-hover:block group-active:hidden">Hovering</span>
									<span className="hidden group-active:block">Pressed</span>
								</>
							)}
						</span>
						<span className="text-[0.6rem] text-base-content/40">{speed}</span>
					</div>
				</div>
			</button>
		</div>
	);
}

/* ── Theme Card ─────────────────────────────────────── */

function ThemeCard({ name, active, onSelect }: { name: string; active: boolean; onSelect: () => void }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			data-theme={name}
			className={cn(
				"group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-base-200 transition-all dur",
				active ? "border-primary shadow-md ring-2 ring-primary/20" : "border-base-content/15 hover:border-base-content/25 hover:shadow-sm",
			)}>
			{active && (
				<div className="animate-scale-in absolute right-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-content">
					<Icon code="f00c" type="solid" className="ico-[8]" />
				</div>
			)}
			<div className="h-7 w-full bg-primary" />
			<div className="flex h-1.5 w-full">
				<div className="flex-1 bg-secondary" />
				<div className="flex-1 bg-accent" />
				<div className="flex-1 bg-neutral" />
			</div>
			<span className="w-full truncate px-2 py-1.5 text-center text-[0.6rem] font-medium capitalize text-base-content">{name}</span>
		</button>
	);
}
