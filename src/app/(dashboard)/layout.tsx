import type { ReactNode } from "react";
import { Sidebar } from "#components/sidebar";
import { getExperiments } from "#utils/experiments";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const experiments = getExperiments();

	return (
		<div className="flex h-dvh overflow-hidden bg-base-200">
			<Sidebar experiments={experiments} />
			<main className="relative min-w-0 flex-1 overflow-y-auto">{children}</main>
		</div>
	);
}
