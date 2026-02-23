"use client";

import { Icon } from "gliff";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Experiment } from "#utils/experiments";
import { cn } from "#utils/helper";

export function Sidebar({ experiments }: { experiments: Experiment[] }) {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<aside className={cn("flex h-full shrink-0 flex-col bg-base-100 border-r border-base-content/10 transition-all dur ease-in-out", collapsed ? "w-18" : "w-64")}>
			{/* Brand */}
			<div className={cn("flex items-center gap-3 h-14 border-b border-base-content/10 px-4", collapsed && "justify-center px-2")}>
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
					<Icon code="f0c3" type="solid" className="ico-4 text-primary" />
				</div>
				{!collapsed && <span className="font-display font-bold text-base tracking-tight animate-fade-in">Lab</span>}
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto px-3 py-4">
				<NavItem href="/" icon="f015" label="Home" active={pathname === "/"} collapsed={collapsed} />

				{!collapsed && <p className="mt-6 mb-2 px-3 text-[0.6rem] font-semibold text-base-content/30 uppercase tracking-[0.15em]">Experiments</p>}
				{collapsed && <div className="my-4 mx-2 border-t border-base-content/10" />}

				{experiments.map((exp, i) => (
					<NavItem
						key={exp.slug}
						href={`/${exp.slug}`}
						icon={exp.icon}
						label={exp.name}
						active={pathname === `/${exp.slug}`}
						collapsed={collapsed}
						delay={i * 30}
					/>
				))}

				{experiments.length === 0 && !collapsed && <p className="px-3 py-2 text-xs text-base-content/20">No experiments yet</p>}
			</nav>

			{/* Footer */}
			<div className="flex flex-col gap-1 border-t border-base-content/10 p-3">
				<NavItem href="/settings" icon="f013" label="Settings" active={pathname === "/settings"} collapsed={collapsed} />
				<button
					type="button"
					onClick={() => setCollapsed((v) => !v)}
					className={cn(
						"flex items-center gap-3 rounded-lg px-3 py-2 text-base-content/30 transition-all dur-fast hover:bg-base-200 hover:text-base-content/60",
						collapsed && "justify-center",
					)}>
					<Icon code={collapsed ? "f101" : "f100"} type="solid" className="ico-3" />
					{!collapsed && <span className="text-xs">Collapse</span>}
				</button>
			</div>
		</aside>
	);
}

function NavItem({
	href,
	icon,
	label,
	active,
	collapsed,
	delay = 0,
}: {
	href: string;
	icon: string;
	label: string;
	active: boolean;
	collapsed: boolean;
	delay?: number;
}) {
	return (
		<div className={collapsed ? "tooltip tooltip-right" : ""} data-tip={collapsed ? label : undefined}>
			<Link
				href={href}
				className={cn(
					"group relative flex items-center gap-3 rounded-lg px-3 py-2 transition-all dur-fast",
					active ? "bg-primary/10 text-primary font-medium" : "text-base-content/50 hover:bg-base-200 hover:text-base-content",
					collapsed && "justify-center px-2",
				)}
				style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}>
				{active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-primary animate-scale-in" />}
				<Icon code={icon} type="solid" className="ico-4 shrink-0" />
				{!collapsed && <span className="truncate text-sm">{label}</span>}
			</Link>
		</div>
	);
}
