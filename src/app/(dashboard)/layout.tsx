import type { ReactNode } from "react";
import { Sidebar } from "#components/sidebar";
import { Topbar } from "#components/topbar";
import { getExperiments } from "#utils/experiments";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const experiments = getExperiments();

	return (
		<div className="flex h-dvh flex-col overflow-hidden bg-base-100">
			{/* Dashboard accent bar */}
			<div className="h-1 shrink-0 bg-gradient-to-r from-primary via-secondary to-accent" />

			<div className="flex min-h-0 flex-1">
				<Sidebar experiments={experiments} />
				<div className="flex min-w-0 flex-1 flex-col">
					<Topbar />
					<main className="relative min-w-0 flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</div>
	);
}
