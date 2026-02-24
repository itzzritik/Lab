"use client";

import { Icon } from "gliff";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ALL_THEMES, useSidebar } from "#components/providers";

export function Topbar() {
	const { collapsed, toggle } = useSidebar();

	return (
		<header className="relative z-30 flex h-12 shrink-0 items-center justify-between border-b border-base-content/8 bg-base-200 px-3">
			<button type="button" onClick={toggle} className="btn btn-ghost btn-sm btn-square">
				<Icon code={collapsed ? "f0c9" : "f100"} type="solid" className="ico-[14] text-base-content/50 max-md:hidden" />
			</button>
			<ThemePicker />
		</header>
	);
}

function ThemePicker() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return <div className="btn btn-ghost btn-sm h-8 w-12 animate-pulse rounded-lg" />;

	return (
		<div className="dropdown dropdown-end" title="Change Theme">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1.5 px-1.5" aria-label="Change Theme">
				<div className="grid shrink-0 grid-cols-2 gap-0.5 rounded-md border border-base-content/10 bg-base-100 p-1 transition-colors hover:border-base-content/20">
					<div className="size-1 rounded-full bg-base-content" />
					<div className="size-1 rounded-full bg-primary" />
					<div className="size-1 rounded-full bg-secondary" />
					<div className="size-1 rounded-full bg-accent" />
				</div>
				<svg width="12px" height="12px" className="size-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
					<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
				</svg>
			</div>

			<div
				tabIndex={0}
				className="dropdown-content rounded-box z-50 mt-3 h-80 max-h-[calc(100vh-6rem)] overflow-y-auto border border-base-content/5 bg-base-200 text-base-content shadow-2xl">
				<ul className="menu w-56">
					<li className="menu-title text-xs">Theme</li>
					{ALL_THEMES.map((t) => (
						<li key={t}>
							<button type="button" className="gap-3 px-2" onClick={() => setTheme(t)}>
								<div data-theme={t} className="grid shrink-0 grid-cols-2 gap-0.5 rounded-md bg-base-100 p-1 shadow-sm">
									<div className="size-1 rounded-full bg-base-content" />
									<div className="size-1 rounded-full bg-primary" />
									<div className="size-1 rounded-full bg-secondary" />
									<div className="size-1 rounded-full bg-accent" />
								</div>
								<span className="w-32 truncate capitalize">{t}</span>
								{theme === t && <Icon code="f00c" type="solid" className="ico-3 shrink-0 text-success" />}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
