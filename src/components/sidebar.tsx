"use client";

import { Icon } from "gliff";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "#components/providers";
import type { Experiment } from "#utils/experiments";
import { cn } from "#utils/helper";

export function Sidebar({ experiments }: { experiments: Experiment[] }) {
	const pathname = usePathname();
	const { collapsed, toggle } = useSidebar();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// On mobile the sidebar is always "expanded" style (never icon-only)
	const iconOnly = collapsed;

	return (
		<>
			{/* Mobile backdrop */}
			{!collapsed && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={toggle} onKeyDown={undefined} />}

			<aside
				className={cn(
					"relative z-50 flex flex-col bg-base-200/80 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
					// Desktop: inline, collapsible, border-right
					"border-r border-base-content/5",
					"max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:w-[280px] max-md:shadow-2xl",
					collapsed ? "max-md:-translate-x-full md:w-[72px]" : "max-md:translate-x-0 md:w-[280px]",
					"md:shrink-0",
				)}>
				{/* Top Header */}
				<div className="flex h-16 shrink-0 items-center px-4">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 active:scale-95">
						<Icon code="f0c3" type="solid" className="ico-[16]" />
					</div>
					<div
						className={cn(
							"overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
							"max-md:ml-3 max-md:w-full max-md:opacity-100",
							iconOnly ? "md:w-0 md:opacity-0" : "md:ml-3 md:w-full md:opacity-100",
						)}>
						<span className="font-display text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-base-content to-base-content/60">
							Ritik's Lab
						</span>
					</div>
					<div className="flex-1" />
					{/* Mobile close button */}
					<button
						type="button"
						onClick={toggle}
						className="btn btn-ghost btn-sm btn-square md:hidden text-base-content/50 hover:bg-base-content/10 hover:text-base-content">
						<Icon code="f00d" type="solid" className="ico-[16]" />
					</button>
				</div>

				{/* Navigation */}
				<nav
					className={cn(
						"flex-1 space-y-1.5 px-3 py-4",
						"max-md:overflow-y-auto overflow-x-hidden",
						iconOnly ? "md:overflow-visible" : "md:overflow-y-auto",
						mounted ? "" : "opacity-0",
					)}>
					<div className="animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
						<NavItem href="/" icon="f015" label="Home" active={pathname === "/"} collapsed={iconOnly} />
					</div>

					{/* Section Divider */}
					<div
						className={cn(
							"overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
							"max-md:max-h-12 max-md:opacity-100",
							iconOnly ? "md:max-h-0 md:opacity-0" : "md:max-h-12 md:opacity-100",
						)}>
						<div className="flex items-center gap-3 px-3 pb-2 pt-6">
							<span className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.25em] text-base-content/40">Experiments</span>
							<div className="h-px flex-1 bg-gradient-to-r from-base-content/10 to-transparent" />
						</div>
					</div>
					<div
						className={cn(
							"overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
							"max-md:max-h-0 max-md:opacity-0",
							iconOnly ? "md:max-h-6 md:py-3 md:opacity-100" : "md:max-h-0 md:opacity-0",
						)}>
						<div className="mx-auto w-6 rounded-full border-t-2 border-base-content/10" />
					</div>

					{experiments.map((exp, idx) => (
						<div key={exp.slug} className="animate-fade-up" style={{ animationDelay: `${200 + idx * 50}ms`, animationFillMode: "both" }}>
							<NavItem href={`/${exp.slug}`} icon={exp.icon} label={exp.name} active={pathname === `/${exp.slug}`} collapsed={iconOnly} />
						</div>
					))}

					{experiments.length === 0 && (
						<div
							className={cn(
								"overflow-hidden whitespace-nowrap transition-all duration-500",
								"max-md:max-h-12 max-md:px-4 max-md:py-3 max-md:opacity-100",
								iconOnly ? "md:max-h-0 md:opacity-0" : "md:max-h-12 md:px-4 md:py-3 md:opacity-100",
							)}>
							<div className="flex items-center gap-3 rounded-xl border border-dashed border-base-content/10 bg-base-100/50 px-4 py-3 text-[0.75rem] text-base-content/40">
								<Icon code="f071" type="solid" className="ico-3" />
								<span>No experiments yet</span>
							</div>
						</div>
					)}
				</nav>

				{/* Footer Settings */}
				<div className="shrink-0 p-3 pb-4">
					<div className="animate-fade-up" style={{ animationDelay: `${300 + experiments.length * 50}ms`, animationFillMode: "both" }}>
						<NavItem href="/settings" icon="f013" label="Settings" active={pathname === "/settings"} collapsed={iconOnly} isSettings />
					</div>
				</div>
			</aside>
		</>
	);
}

function NavItem({
	href,
	icon,
	label,
	active,
	collapsed,
	isSettings = false,
}: {
	href: string;
	icon: string;
	label: string;
	active: boolean;
	collapsed: boolean;
	isSettings?: boolean;
}) {
	const link = (
		<Link
			href={href}
			className={cn(
				"group relative flex items-center rounded-xl p-2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
				active
					? "bg-primary/10 text-primary shadow-sm"
					: "text-base-content/60 hover:bg-base-content/5 hover:text-base-content hover:scale-[1.02] active:scale-[0.98]",
			)}>
			{/* Active Background Glow */}
			{active && <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-50" />}

			{/* Icon Container */}
			<div
				className={cn(
					"relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
					active ? "bg-primary text-primary-content shadow-md shadow-primary/20" : "bg-transparent group-hover:bg-base-content/10",
				)}>
				<Icon code={icon} type="solid" className={cn("ico-4 transition-transform duration-300", active ? "scale-100" : "group-hover:scale-110")} />
			</div>

			{/* Label */}
			<span
				className={cn(
					"overflow-hidden whitespace-nowrap text-[0.875rem] font-medium transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
					collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[200px] opacity-100 ml-3",
				)}>
				{label}
			</span>

			{/* Active Indicator Line */}
			{active && !collapsed && <div className="absolute right-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-primary" />}

			{/* Settings specific styling */}
			{isSettings && !active && !collapsed && (
				<Icon
					code="f054"
					type="solid"
					className="absolute right-3 top-1/2 -translate-y-1/2 ico-3 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
				/>
			)}
		</Link>
	);

	if (collapsed) {
		return (
			<div className="tooltip tooltip-right tooltip-primary z-50 block w-full" data-tip={label}>
				{link}
			</div>
		);
	}

	return link;
}
