"use client";

import { Icon } from "gliff";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ALL_THEMES, ANIMATION_SPEEDS, type AnimationSpeed, DARK_THEMES, LIGHT_THEMES, useAnimation } from "#components/providers";
import { cn } from "#utils/helper";

type ThemeTab = "all" | "light" | "dark";

const TABS: { id: ThemeTab; label: string; icon: string }[] = [
	{ id: "light", label: "Light", icon: "e28f" },
	{ id: "dark", label: "Dark", icon: "f186" },
	{ id: "all", label: "All", icon: "e196" },
];

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const { speed, setSpeed } = useAnimation();
	const [mounted, setMounted] = useState(false);
	const [themeTab, setThemeTab] = useState<ThemeTab>("dark");

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
		<div className="min-h-full w-full p-6 pb-20 md:p-10">
			<div className="relative mb-12 flex flex-col items-start gap-2">
				<div className="absolute -top-10 -left-10 -z-10 h-40 w-40 rounded-full bg-primary/20 blur-[80px]" />
				<h1 className="animate-fade-up font-black font-display text-4xl text-base-content tracking-tight md:text-5xl" style={{ animationDuration: "800ms" }}>
					Settings
				</h1>
				<p className="animate-fade-up text-base text-base-content/60" style={{ animationDuration: "800ms", animationDelay: "100ms" }}>
					Customize your workspace appearance and physics.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_minmax(300px,auto)]">
				<section
					className="group/section relative animate-fade-up overflow-hidden rounded-[2rem] border border-base-content/5 bg-base-200/50 shadow-sm backdrop-blur-xl lg:col-span-12"
					style={{ animationDelay: "200ms" }}>
					<div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/section:opacity-100" />

					<div className="relative flex flex-col justify-between gap-6 border-base-content/5 border-b p-6 lg:flex-row lg:items-center">
						<div className="text-center sm:text-left">
							<div className="mb-2 flex items-center justify-center gap-3 sm:justify-start">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
									<Icon code="e0b5" type="solid" className="ico-5" />
								</div>
								<h2 className="font-bold font-display text-base-content text-xl">Appearance</h2>
							</div>
							<p className="text-base-content/60 text-sm">Choose a theme that fits your style</p>
						</div>

						<div className="relative mx-auto flex w-full max-w-[324px] rounded-full bg-base-content/[0.03] p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.1)] ring-1 ring-white/5 backdrop-blur-3xl lg:mx-0">
							<div
								className="absolute inset-y-1.5 left-1.5 z-0 rounded-full bg-base-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.15)] ring-1 ring-base-content/10 transition-all duration-500 ease-spring"
								style={{
									width: `calc((100% - 12px) / ${TABS.length})`,
									transform: `translateX(calc(${TABS.findIndex((t) => t.id === themeTab)} * 100%))`,
								}}>
								{" "}
								<div className="absolute inset-x-2 -bottom-2 h-4 rounded-full bg-primary/40 blur-xl" />
								<div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
							</div>

							{TABS.map((tab) => {
								const isActive = themeTab === tab.id;
								return (
									<button
										key={tab.id}
										type="button"
										onClick={() => setThemeTab(tab.id)}
										className={cn(
											"group relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 font-semibold text-xs outline-none transition-all duration-500 sm:gap-2 sm:px-5 sm:text-sm",
											isActive ? "scale-100 text-primary" : "scale-[0.98] text-base-content/50 hover:text-base-content/90",
										)}>
										{isActive && (
											<div className="pointer-events-none absolute inset-0 z-0 animate-pulse rounded-full bg-primary/10 mix-blend-overlay" />
										)}
										<div className="relative flex shrink-0 items-center justify-center">
											<Icon
												code={tab.icon}
												type="solid"
												className={cn(
													"ico-4 transition-all duration-500 ease-out",
													isActive
														? "scale-110 drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]"
														: "group-hover:rotate-6 group-hover:scale-110",
												)}
											/>
										</div>
										<span
											className={cn(
												"truncate tracking-tight transition-all duration-500 max-sm:max-w-16",
												isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-70 group-hover:translate-x-0 group-hover:opacity-100",
											)}>
											{tab.label}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					<div className="relative p-6">
						<div className="grid grid-cols-2 xs:grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
							{filteredThemes.map((t, i) => (
								<div key={t} className="animate-fade-up" style={{ animationDelay: `${400 + i * 30}ms` }}>
									<ThemeCard name={t} active={theme === t} onSelect={() => setTheme(t)} />
								</div>
							))}
						</div>
					</div>
				</section>

				<section
					className="group/section relative animate-fade-up overflow-hidden rounded-[2rem] border border-base-content/5 bg-base-200/50 p-6 shadow-sm backdrop-blur-xl lg:col-span-4"
					style={{ animationDelay: "300ms" }}>
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/section:opacity-100" />

					<div className="relative mb-6">
						<div className="mb-2 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<Icon code="f0e4" type="solid" className="ico-5" />
							</div>
							<h2 className="font-bold font-display text-base-content text-xl">Animation Speed</h2>
						</div>
						<p className="text-base-content/60 text-sm">Configure interface animation speed and transition physics.</p>
					</div>

					<div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
						{ANIMATION_SPEEDS.map((s) => {
							const isActive = speed === s.id;
							return (
								<button
									key={s.id}
									type="button"
									onClick={() => setSpeed(s.id)}
									className={cn(
										"group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ease-spring hover:scale-[1.02] active:scale-[0.97]",
										isActive
											? "border-primary/30 bg-primary/10 shadow-[0_0_20px_oklch(from_var(--color-primary)_l_c_h_/_0.1)]"
											: "border-base-content/5 bg-base-100/50 hover:border-base-content/15 hover:bg-base-100",
									)}>
									{isActive && <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/20 blur-[20px]" />}
									<div className="relative flex items-center gap-4">
										<div
											className={cn(
												"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
												isActive
													? "border-primary/50 bg-primary text-primary-content shadow-lg shadow-primary/20"
													: "border-base-content/10 bg-base-content/5 text-base-content/50 group-hover:border-primary/30 group-hover:text-primary",
											)}>
											<Icon code={s.icon} type="solid" className="ico-[18]" />
										</div>
										<div className="min-w-0 pr-2">
											<span
												className={cn(
													"block truncate font-semibold transition-colors duration-300",
													isActive ? "text-primary" : "text-base-content",
												)}>
												{s.label}
											</span>
											<span className="block truncate text-base-content/50 text-xs">{s.description}</span>
										</div>
									</div>
									<div
										className={cn(
											"relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
											isActive
												? "scale-100 border-primary bg-primary text-primary-content opacity-100"
												: "scale-50 border-base-content/20 opacity-0",
										)}>
										<Icon code="f00c" type="solid" className="ico-[10]" />
									</div>
								</button>
							);
						})}
					</div>
				</section>

				<section
					className="relative flex animate-fade-up flex-col overflow-hidden rounded-[2rem] border border-base-content/5 bg-base-200/50 shadow-sm backdrop-blur-xl lg:col-span-8"
					style={{ animationDelay: "400ms" }}>
					<div className="relative z-10 p-6 sm:absolute sm:top-6 sm:left-6 sm:p-0">
						<h2 className="font-bold font-display text-base-content text-xl">Interactive Preview</h2>
						<p className="text-base-content/60 text-sm">Hover and click to feel the motion</p>
					</div>
					<div className="h-[300px] min-h-[300px] w-full flex-1 lg:h-full">
						<AnimationPreview3D speed={speed} />
					</div>
				</section>
			</div>
		</div>
	);
}

function AnimationPreview3D({ speed }: { speed: AnimationSpeed }) {
	const [clicked, setClicked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	const handleClick = () => {
		setClicked(true);
		setIsPressed(false);
		setTimeout(() => setClicked(false), speed === "instant" ? 200 : speed === "swift" ? 600 : speed === "smooth" ? 1000 : 1500);
	};

	const durMs = speed === "swift" ? 150 : speed === "smooth" ? 300 : speed === "gentle" ? 500 : 0;

	return (
		<div className="relative flex h-full min-h-[350px] w-full items-center justify-center overflow-hidden p-8">
			<div className="absolute inset-0 z-0 overflow-hidden opacity-40 blur-[80px] saturate-200">
				<div
					className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/40 mix-blend-multiply dark:mix-blend-screen"
					style={{ animation: `spin ${durMs * 60}ms cubic-bezier(0.4, 0, 0.2, 1) infinite` }}
				/>
				<div
					className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-secondary/30 mix-blend-multiply dark:mix-blend-screen"
					style={{ animation: `spin ${durMs * 80}ms cubic-bezier(0.4, 0, 0.2, 1) infinite reverse` }}
				/>
			</div>

			<div
				className="absolute inset-0 z-0 opacity-[0.05]"
				style={{
					backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
					backgroundSize: "20px 20px",
					maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
				}}
			/>

			<button
				type="button"
				onClick={handleClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => {
					setIsHovered(false);
					setIsPressed(false);
				}}
				onMouseDown={() => setIsPressed(true)}
				onMouseUp={() => setIsPressed(false)}
				className={cn(
					"group relative z-10 flex h-48 w-72 flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] p-6 outline-none backdrop-blur-3xl transition-all duration-300 ease-spring",
					isHovered && !isPressed && "-translate-y-2 scale-[1.04] shadow-2xl shadow-primary/15",
					isPressed && "translate-y-1 scale-[0.96] shadow-md",
					!isHovered && !isPressed && "shadow-base-content/5 shadow-xl",
				)}
				style={{ transitionDuration: `${durMs}ms` }}>
				<div
					className={cn("absolute inset-0 transition-colors", isPressed ? "bg-base-100/40" : "bg-base-100/70", clicked && "bg-primary/10")}
					style={{ transitionDuration: `${durMs}ms` }}
				/>

				<div
					className={cn(
						"absolute inset-0 rounded-[2rem] border transition-colors",
						isHovered && !isPressed ? "border-primary/20" : "border-white/10 dark:border-white/5",
						clicked && "border-2 border-primary/30",
						isPressed && "border-base-content/10",
					)}
					style={{ transitionDuration: `${durMs}ms` }}
				/>

				<div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30" />

				<div
					className={cn("absolute inset-0 rounded-[2rem] border-2 border-primary opacity-0 transition-all", clicked && "scale-110 animate-ping opacity-20")}
					style={{ transitionDuration: `${durMs}ms`, animationDuration: `${durMs * 4}ms` }}
				/>

				<div
					className={cn(
						"relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-100 text-base-content/70 shadow-sm ring-1 ring-base-content/5 transition-all ease-spring",
						isHovered && !isPressed && "scale-110 bg-primary/5 text-primary shadow-lg shadow-primary/25 ring-primary/20",
						isPressed && "scale-90 bg-base-200/50 text-base-content/40 shadow-inner ring-0",
						clicked && "scale-100 border border-primary bg-primary text-primary-content shadow-lg shadow-primary/40 ring-primary",
					)}
					style={{ transitionDuration: `${durMs}ms` }}>
					<Icon
						code={clicked ? "f00c" : isPressed ? "e12a" : isHovered ? "f04b" : "f144"}
						type="solid"
						className={cn("ico-6 transition-transform", isHovered && !isPressed && "scale-110")}
						style={{ transitionDuration: `${durMs}ms` }}
					/>
				</div>

				<div className="z-10 mt-1 flex flex-col items-center gap-1 transition-all" style={{ transitionDuration: `${durMs}ms` }}>
					<span
						className={cn(
							"text-center font-bold font-display text-xl tracking-tight transition-colors",
							clicked ? "text-primary" : isHovered ? "text-primary" : "text-base-content",
							isPressed && "text-base-content/50",
						)}
						style={{ transitionDuration: `${durMs}ms` }}>
						{clicked ? "Clicked" : isPressed ? "Pressed" : isHovered ? "Hover" : "Preview Card"}
					</span>
					<div className="flex items-center justify-center gap-2">
						<div
							className={cn("h-1.5 w-1.5 rounded-full transition-colors", clicked ? "bg-primary" : isHovered ? "bg-primary" : "bg-base-content/30")}
							style={{
								animation: `pulse ${durMs * 3}ms infinite`,
								transitionDuration: `${durMs}ms`,
							}}
						/>
						<span
							className={cn(
								"font-semibold text-xs uppercase tracking-widest opacity-60 transition-colors",
								clicked ? "text-primary" : isHovered ? "text-primary" : "text-base-content",
							)}
							style={{ transitionDuration: `${durMs}ms` }}>
							{speed} physics
						</span>
					</div>
				</div>
			</button>
		</div>
	);
}

function ThemeCard({ name, active, onSelect }: { name: string; active: boolean; onSelect: () => void }) {
	return (
		<button
			type="button"
			onClick={onSelect}
			data-theme={name}
			className={cn(
				"group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-base-100 transition-all duration-300 ease-spring hover:-translate-y-1 hover:scale-[1.05] hover:shadow-base-content/5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
				active ? "border-primary shadow-lg shadow-primary/10" : "border-base-content/10",
			)}>
			<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			<div className="relative h-20 w-full overflow-hidden bg-base-200">
				<div className="absolute top-2 left-2 flex gap-1">
					<div className="h-2 w-2 rounded-full bg-error/80" />
					<div className="h-2 w-2 rounded-full bg-warning/80" />
					<div className="h-2 w-2 rounded-full bg-success/80" />
				</div>
				<div className="absolute top-6 left-2 h-2 w-1/3 rounded-full bg-primary" />
				<div className="absolute top-10 left-2 h-1.5 w-1/2 rounded-full bg-base-content/20" />
				<div className="absolute right-2 bottom-2 h-6 w-6 rounded-lg bg-secondary shadow-sm" />

				<div className="absolute bottom-0 left-0 flex h-1 w-full opacity-80">
					<div className="flex-1 bg-primary" />
					<div className="flex-1 bg-secondary" />
					<div className="flex-1 bg-accent" />
				</div>
			</div>

			<div className="relative flex items-center justify-between border-base-content/5 border-t p-3">
				<span className="truncate font-semibold text-base-content text-xs capitalize tracking-wide">{name}</span>
				<div
					className={cn(
						"flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all duration-300",
						active ? "scale-100 bg-primary text-primary-content opacity-100" : "scale-50 bg-base-content/10 opacity-0",
					)}>
					<Icon code="f00c" type="solid" className="ico-[8]" />
				</div>
			</div>

			{active && <div className="absolute inset-0 rounded-2xl border-2 border-primary ring-4 ring-primary/20 transition-all duration-500" />}
		</button>
	);
}
