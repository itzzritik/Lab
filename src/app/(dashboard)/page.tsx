import type { Metadata } from "next";
import { GREETINGS, VERCEL_PROJECTS_API_URL } from "#utils/constants";
import { getExperiments } from "#utils/experiments";
import type { ProjectApiRes } from "./dashboard-client";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
	title: "Home",
	description: "Interactive playground for creative coding, experiments, and web innovation",
	alternates: { canonical: "/" },
};

export const revalidate = 0;

export default async function HomePage() {
	const experiments = getExperiments();
	const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

	let projectsData: ProjectApiRes | null = null;
	try {
		const res = await fetch(VERCEL_PROJECTS_API_URL);
		if (res.ok) {
			projectsData = await res.json();
			if (projectsData) {
				projectsData.reservedSubdomains = projectsData.reservedSubdomains.filter((subdomain) => subdomain !== "lab");
			}
		}
	} catch (error) {
		console.error("Failed to fetch projects:", error);
	}

	return (
		<div className="min-h-full w-full p-6 pb-20 md:p-10">
			<div className="relative mb-12 flex flex-col items-start gap-2 pt-4">
				<div className="absolute -top-10 -left-10 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

				<p className="animate-fade-up font-semibold text-primary/80 text-sm uppercase tracking-widest" style={{ animationDuration: "800ms" }}>
					{today}
				</p>

				<h1
					className="animate-fade-up bg-gradient-to-br from-base-content to-base-content/60 bg-clip-text py-1 font-black font-display text-5xl text-transparent tracking-tight md:text-6xl"
					style={{ animationDuration: "800ms", animationDelay: "100ms" }}>
					{greeting}
				</h1>

				<p className="animate-fade-up text-base-content/60 text-lg" style={{ animationDuration: "800ms", animationDelay: "200ms" }}>
					Interactive playground for creative coding, experiments, and web innovation
				</p>
			</div>

			<DashboardClient experiments={experiments} projectsData={projectsData} />
		</div>
	);
}
