"use client";

import { Icon } from "gliff";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Experiment } from "#utils/experiments";

export function Sidebar({ experiments }: { experiments: Experiment[] }) {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<aside
			className={`dur flex h-full shrink-0 flex-col border-base-content/5 border-r bg-base-100 transition-all ease-in-out${collapsed ? "w-[4.5rem]" : "w-64"}
			`}>
			{/* Header */}
			<div className={`flex h-16 items-center border-base-content/5 border-b px-4 ${collapsed ? "justify-center" : ""}`}>
				{!collapsed && <span className="flex-1 truncate font-bold font-display text-lg tracking-tight">Lab</span>}
				<button type="button" onClick={() => setCollapsed((v) => !v)} className="btn btn-ghost btn-sm btn-square">
					<Icon code={collapsed ? "f054" : "f053"} type="solid" className="ico-3" />
				</button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
				<NavItem href="/" icon="f015" label="Home" active={pathname === "/"} collapsed={collapsed} />

				<p className={`mt-5 mb-2 px-3 font-semibold text-[0.65rem] text-base-content/30 uppercase tracking-widest ${collapsed ? "sr-only" : ""}`}>Experiments</p>

				{experiments.map((exp) => (
					<NavItem key={exp.slug} href={`/${exp.slug}`} icon={exp.icon} label={exp.name} active={pathname === `/${exp.slug}`} collapsed={collapsed} />
				))}

				{experiments.length === 0 && !collapsed && <p className="px-3 py-2 text-base-content/20 text-xs">No experiments yet</p>}
			</nav>

			{/* Footer */}
			<div className="border-base-content/5 border-t p-3">
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
				className={`dur-fast group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all relative${active ? "bg-primary/10 text-primary shadow-sm" : "text-base-content/50 hover:translate-x-0.5 hover:bg-base-200 hover:text-base-content"}
					${collapsed ? "justify-center" : ""}
				`}>
				<Icon code={icon} type="solid" className="ico-4 shrink-0" />
				{!collapsed && <span className="truncate font-medium text-sm">{label}</span>}
			</Link>
		</div>
	);
}
