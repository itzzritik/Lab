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
		<aside className={cn("shrink-0 bg-base-100 transition-all dur ease-out", collapsed ? "w-14" : "w-56")}>
			<div className="flex h-full flex-col">
				{/* Header */}
				<div className="flex h-14 cursor-pointer items-center px-2" onClick={() => setCollapsed((v) => !v)}>
					<div className="flex w-10 shrink-0 items-center justify-center">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-content">
							<Icon code="f0c3" type="solid" className="ico-[14]" />
						</div>
					</div>
					<span className={cn("overflow-hidden whitespace-nowrap transition-all dur", collapsed ? "max-w-0 opacity-0" : "ml-1 max-w-48 opacity-100")}>
						<span className="font-display text-sm font-bold tracking-tight">Ritik's Lab</span>
					</span>
					<div className="flex-1" />
					<span className={cn("overflow-hidden transition-all dur", collapsed ? "max-w-0 opacity-0" : "max-w-8 opacity-100")}>
						<Icon code="f100" type="solid" className="ico-3 text-base-content/25" />
					</span>
				</div>

				{/* Nav */}
				<nav className={cn("flex-1 space-y-0.5 px-2 py-2", collapsed ? "overflow-visible" : "overflow-y-auto")}>
					<NavItem href="/" icon="f015" label="Home" active={pathname === "/"} collapsed={collapsed} />

					{/* Section label (expanded) / divider (collapsed) */}
					<div className={cn("overflow-hidden transition-all dur", collapsed ? "max-h-0 opacity-0" : "max-h-10 opacity-100")}>
						<div className="flex items-center gap-2 px-4 pb-1 pt-4">
							<span className="whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.2em] text-base-content/25">Experiments</span>
							<div className="h-px flex-1 bg-base-content/5" />
						</div>
					</div>
					<div className={cn("overflow-hidden transition-all dur", collapsed ? "max-h-4 py-1.5 opacity-100" : "max-h-0 opacity-0")}>
						<div className="mx-auto w-5 border-t border-base-content/8" />
					</div>

					{experiments.map((exp) => (
						<NavItem key={exp.slug} href={`/${exp.slug}`} icon={exp.icon} label={exp.name} active={pathname === `/${exp.slug}`} collapsed={collapsed} />
					))}

					{experiments.length === 0 && (
						<p
							className={cn(
								"overflow-hidden whitespace-nowrap text-[0.7rem] text-base-content/25 transition-all dur",
								collapsed ? "max-h-0 opacity-0" : "max-h-8 px-4 py-2 opacity-100",
							)}>
							No experiments yet
						</p>
					)}
				</nav>

				{/* Footer */}
				<div className="px-2 py-2">
					<NavItem href="/settings" icon="f013" label="Settings" active={pathname === "/settings"} collapsed={collapsed} />
				</div>
			</div>
		</aside>
	);
}

function NavItem({ href, icon, label, active, collapsed }: { href: string; icon: string; label: string; active: boolean; collapsed: boolean }) {
	const link = (
		<Link
			href={href}
			className={cn(
				"flex items-center rounded-lg py-2 transition-all dur-fast",
				active
					? "bg-primary text-primary-content shadow-sm shadow-primary/20"
					: "text-base-content/50 hover:bg-base-content/[0.04] hover:text-base-content/85",
			)}
		>
			<div className="flex w-10 shrink-0 items-center justify-center">
				<Icon code={icon} type="solid" className="ico-[15]" />
			</div>
			<span
				className={cn(
					"overflow-hidden whitespace-nowrap text-[0.8rem] font-medium transition-all dur",
					collapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100",
				)}
			>
				{label}
			</span>
		</Link>
	);

	if (collapsed) {
		return (
			<div className="tooltip tooltip-right z-50 block w-full" data-tip={label}>
				{link}
			</div>
		);
	}

	return link;
}
