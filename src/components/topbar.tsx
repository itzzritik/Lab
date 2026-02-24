"use client";

import { Icon } from "gliff";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ALL_THEMES, useSidebar } from "#components/providers";
import { cn } from "#utils/helper";

export function Topbar() {
	const { collapsed, toggle } = useSidebar();

	return (
		<header className="relative z-30 flex h-16 shrink-0 items-center justify-between border-b border-base-content/5 bg-base-100/60 px-6 backdrop-blur-md transition-all duration-300">
			<div className="flex items-center gap-4">
				<button
					type="button"
					onClick={toggle}
					className="group flex h-10 w-10 items-center justify-center rounded-xl bg-base-200/50 text-base-content/60 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-base-200 hover:text-base-content hover:scale-105 active:scale-95">
					<Icon code={collapsed ? "f0c9" : "f100"} type="solid" className="ico-4 transition-transform duration-300 group-hover:scale-110" />
				</button>
			</div>
			<div className="flex items-center gap-4">
				<ThemePicker />
			</div>
		</header>
	);
}

function ThemePicker() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return <div className="h-10 w-24 animate-pulse rounded-xl bg-base-200" />;

	return (
		<div className="dropdown dropdown-end" title="Change Theme">
			<div
				tabIndex={0}
				role="button"
				className="group flex items-center justify-between gap-3 rounded-xl border border-base-content/5 bg-base-200/50 p-1.5 pr-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-base-content/15 hover:bg-base-200 active:scale-95"
				aria-label="Change Theme">
				<div className="grid shrink-0 grid-cols-2 gap-[3px] rounded-lg bg-base-100 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-colors duration-300 group-hover:shadow-sm">
					<div className="size-1.5 rounded-full bg-base-content shadow-sm" />
					<div className="size-1.5 rounded-full bg-primary shadow-sm" />
					<div className="size-1.5 rounded-full bg-secondary shadow-sm" />
					<div className="size-1.5 rounded-full bg-accent shadow-sm" />
				</div>
				<Icon code="f078" type="solid" className="ico-3 text-base-content/40 transition-transform duration-300 group-hover:text-base-content/70" />
			</div>

			<div
				tabIndex={0}
				className="dropdown-content z-[100] mt-4 w-64 origin-top-right rounded-3xl border border-base-content/5 bg-base-100/90 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
				<div className="mb-2 px-3 pt-2">
					<span className="text-xs font-bold uppercase tracking-widest text-base-content/40">Select Theme</span>
				</div>
				<ul className="max-h-[min(60vh,300px)] overflow-y-auto overflow-x-hidden p-1 space-y-1">
					{ALL_THEMES.map((t, i) => (
						<li key={t}>
							<button
								type="button"
								className={cn(
									"group flex w-full items-center justify-between rounded-xl px-3 py-2 transition-all duration-300",
									theme === t ? "bg-primary/10 text-primary" : "hover:bg-base-content/5 text-base-content/70 hover:text-base-content",
								)}
								onClick={() => {
									setTheme(t);
									// Close dropdown behavior via DOM
									if (document.activeElement instanceof HTMLElement) {
										document.activeElement.blur();
									}
								}}>
								<div className="flex items-center gap-3">
									<div
										data-theme={t}
										className="grid shrink-0 grid-cols-2 gap-[3px] rounded-lg bg-base-100 p-1.5 shadow-sm ring-1 ring-base-content/5 transition-transform duration-300 group-hover:scale-110">
										<div className="size-1.5 rounded-full bg-base-content" />
										<div className="size-1.5 rounded-full bg-primary" />
										<div className="size-1.5 rounded-full bg-secondary" />
										<div className="size-1.5 rounded-full bg-accent" />
									</div>
									<span className={cn("text-sm font-medium capitalize", theme === t ? "font-bold" : "")}>{t}</span>
								</div>
								{theme === t && (
									<div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content shadow-sm scale-in-center">
										<Icon code="f00c" type="solid" className="ico-[10]" />
									</div>
								)}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
