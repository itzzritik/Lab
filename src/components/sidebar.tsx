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
		<aside className={cn("flex h-full shrink-0 flex-col border-r border-base-content/8 bg-base-100 transition-all dur ease-in-out", collapsed ? "w-16" : "w-60")}>
			{/* Header — hamburger + brand */}
			<div className="flex h-14 items-center gap-3 border-b border-base-content/8 px-3">
				<button type="button" onClick={() => setCollapsed((v) => !v)} className="btn btn-ghost btn-sm btn-square">
					<Icon code="f0c9" type="solid" className="ico-4" />
				</button>
				{!collapsed && <span className="animate-fade-in font-display text-base font-bold tracking-tight">Lab</span>}
			</div>

			{/* Nav */}
			<nav className={cn("flex-1 space-y-0.5 overflow-y-auto py-3", collapsed ? "px-2" : "px-2.5")}>
				<NavItem href="/" icon="f015" label="Home" active={pathname === "/"} collapsed={collapsed} />

				{!collapsed && <p className="mb-1.5 mt-5 px-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-base-content/25">Experiments</p>}
				{collapsed && <div className="mx-auto my-3 w-5 border-t border-base-content/8" />}

				{experiments.map((exp) => (
					<NavItem key={exp.slug} href={`/${exp.slug}`} icon={exp.icon} label={exp.name} active={pathname === `/${exp.slug}`} collapsed={collapsed} />
				))}

				{experiments.length === 0 && !collapsed && <p className="px-2.5 py-2 text-xs text-base-content/20">No experiments yet</p>}
			</nav>

			{/* Footer */}
			<div className={cn("border-t border-base-content/8 py-3", collapsed ? "px-2" : "px-2.5")}>
				<NavItem href="/settings" icon="f013" label="Settings" active={pathname === "/settings"} collapsed={collapsed} />
			</div>
		</aside>
	);
}

function NavItem({ href, icon, label, active, collapsed }: { href: string; icon: string; label: string; active: boolean; collapsed: boolean }) {
	return (
		<div className={collapsed ? "tooltip tooltip-right" : ""} data-tip={collapsed ? label : undefined}>
			<Link
				href={href}
				className={cn(
					"flex items-center gap-2.5 rounded-lg transition-all dur-fast",
					collapsed ? "justify-center p-2.5" : "px-2.5 py-2",
					active ? "bg-base-content/10 text-base-content font-medium" : "text-base-content/45 hover:bg-base-content/5 hover:text-base-content/75",
				)}>
				<Icon code={icon} type="solid" className={cn("shrink-0", collapsed ? "ico-5" : "ico-4")} />
				{!collapsed && <span className="truncate text-[0.8rem]">{label}</span>}
			</Link>
		</div>
	);
}
