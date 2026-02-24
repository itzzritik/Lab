"use client";

import { Icon } from "gliff";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "#components/providers";
import type { Experiment } from "#utils/experiments";
import { cn } from "#utils/helper";

export function Sidebar({ experiments }: { experiments: Experiment[] }) {
	const pathname = usePathname();
	const { collapsed, toggle } = useSidebar();

	// On mobile the sidebar is always "expanded" style (never icon-only)
	const iconOnly = collapsed;

	return (
		<>
			{/* Mobile backdrop */}
			{!collapsed && (
				<div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggle} onKeyDown={undefined} />
			)}

			<aside
				className={cn(
					"bg-base-200 transition-all dur ease-out",
					// Desktop: inline, collapsible
					"max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-56 max-md:shadow-2xl",
					collapsed ? "max-md:-translate-x-full md:w-14" : "max-md:translate-x-0 md:w-56",
					"md:shrink-0",
				)}>
				<div className="flex h-full flex-col">
					{/* Header */}
					<div className="flex h-14 items-center px-2">
						<div className="flex w-10 shrink-0 items-center justify-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content">
								<Icon code="f0c3" type="solid" className="ico-[14]" />
							</div>
						</div>
						<span className={cn("overflow-hidden whitespace-nowrap transition-all dur", "max-md:ml-1 max-md:max-w-48 max-md:opacity-100", iconOnly ? "md:max-w-0 md:opacity-0" : "md:ml-1 md:max-w-48 md:opacity-100")}>
							<span className="font-display text-sm font-bold tracking-tight">Ritik's Lab</span>
						</span>
						<div className="flex-1" />
						{/* Mobile close button */}
						<button type="button" onClick={toggle} className="btn btn-ghost btn-sm btn-square md:hidden">
							<Icon code="f00d" type="solid" className="ico-[14] text-base-content/50" />
						</button>
					</div>

					{/* Nav */}
					<nav className={cn("flex-1 space-y-0.5 px-2 py-2", "max-md:overflow-y-auto", iconOnly ? "md:overflow-visible" : "md:overflow-y-auto")}>
						<NavItem href="/" icon="f015" label="Home" active={pathname === "/"} collapsed={iconOnly} />

						{/* Section label (expanded) / divider (collapsed) */}
						<div className={cn("overflow-hidden transition-all dur", "max-md:max-h-10 max-md:opacity-100", iconOnly ? "md:max-h-0 md:opacity-0" : "md:max-h-10 md:opacity-100")}>
							<div className="flex items-center gap-2 px-4 pb-1 pt-4">
								<span className="whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.2em] text-base-content/25">Experiments</span>
								<div className="h-px flex-1 bg-base-content/5" />
							</div>
						</div>
						<div className={cn("overflow-hidden transition-all dur", "max-md:max-h-0 max-md:opacity-0", iconOnly ? "md:max-h-4 md:py-1.5 md:opacity-100" : "md:max-h-0 md:opacity-0")}>
							<div className="mx-auto w-5 border-t border-base-content/8" />
						</div>

						{experiments.map((exp) => (
							<NavItem key={exp.slug} href={`/${exp.slug}`} icon={exp.icon} label={exp.name} active={pathname === `/${exp.slug}`} collapsed={iconOnly} />
						))}

						{experiments.length === 0 && (
							<p
								className={cn(
									"overflow-hidden whitespace-nowrap text-[0.7rem] text-base-content/25 transition-all dur",
									"max-md:max-h-8 max-md:px-4 max-md:py-2 max-md:opacity-100",
									iconOnly ? "md:max-h-0 md:opacity-0" : "md:max-h-8 md:px-4 md:py-2 md:opacity-100",
								)}>
								No experiments yet
							</p>
						)}
					</nav>

					{/* Footer */}
					<div className="px-2 py-2">
						<NavItem href="/settings" icon="f013" label="Settings" active={pathname === "/settings"} collapsed={iconOnly} />
					</div>
				</div>
			</aside>
		</>
	);
}

function NavItem({ href, icon, label, active, collapsed }: { href: string; icon: string; label: string; active: boolean; collapsed: boolean }) {
	const link = (
		<Link
			href={href}
			className={cn(
				"flex items-center rounded-lg py-2 transition-all dur-fast",
				active ? "bg-primary text-primary-content shadow-sm shadow-primary/20" : "text-base-content/50 hover:bg-base-content/[0.04] hover:text-base-content/85",
			)}>
			<div className="flex w-10 shrink-0 items-center justify-center">
				<Icon code={icon} type="solid" className="ico-[15]" />
			</div>
			<span
				className={cn(
					"overflow-hidden whitespace-nowrap text-[0.8rem] font-medium transition-all dur",
					collapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100",
				)}>
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
