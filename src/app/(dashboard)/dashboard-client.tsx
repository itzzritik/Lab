"use client";

import { Icon } from "gliff";
import Link from "next/link";
import { useState } from "react";
import type { Experiment } from "#utils/experiments";

export type ProjectApiRes = {
	domain: string;
	reservedSubdomains: string[];
};

export function DashboardClient({ experiments, projectsData }: { experiments: Experiment[]; projectsData: ProjectApiRes | null }) {
	const [activeTab, setActiveTab] = useState<"experiments" | "projects">("experiments");

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
			{/* Experiments Tab */}
			<button
				type="button"
				onClick={() => setActiveTab("experiments")}
				className={`group/section text-left relative animate-fade-up overflow-hidden rounded-4xl border ${
					activeTab === "experiments" ? "border-primary/30 ring-1 ring-primary/20" : "border-base-content/5 hover:border-base-content/10"
				} bg-base-200/50 p-6 shadow-sm backdrop-blur-xl sm:p-8 lg:col-span-6 transition-all duration-300`}
				style={{ animationDelay: "300ms" }}>
				<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/section:opacity-100" />
				{activeTab === "experiments" && <div className="absolute inset-0 bg-primary/5" />}
				<div className="absolute -top-20 -right-20 z-0 h-48 w-48 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 group-hover/section:scale-150" />

				<div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
					<div>
						<div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
							<div
								className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
									activeTab === "experiments"
										? "bg-primary text-primary-content shadow-lg shadow-primary/30"
										: "bg-base-100 text-base-content/60 group-hover/section:bg-base-100/80 group-hover/section:text-base-content"
								}`}>
								<Icon code="f0c3" type="solid" className="ico-5" />
							</div>
							<div>
								<h2 className="font-bold font-display text-2xl text-base-content">Experiments</h2>
								<p className="text-base-content/60 text-sm">Playground for my distracted weekend ideas</p>
							</div>
						</div>
					</div>

					<div className="flex gap-4 self-start md:self-auto">
						<div className="flex min-w-25 flex-col items-center justify-center rounded-2xl border border-base-content/5 bg-base-100/50 p-4 backdrop-blur-sm transition-colors duration-300">
							<span className="font-black font-display text-4xl text-primary">{experiments.length}</span>
							<span className="mt-1 font-bold text-base-content/40 text-xs uppercase tracking-widest">Total</span>
						</div>
					</div>
				</div>
			</button>

			{/* Projects Tab */}
			<button
				type="button"
				onClick={() => setActiveTab("projects")}
				className={`group/section text-left relative animate-fade-up overflow-hidden rounded-4xl border ${
					activeTab === "projects" ? "border-primary/30 ring-1 ring-primary/20" : "border-base-content/5 hover:border-base-content/10"
				} bg-base-200/50 p-6 shadow-sm backdrop-blur-xl sm:p-8 lg:col-span-6 transition-all duration-300`}
				style={{ animationDelay: "400ms" }}>
				<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/section:opacity-100" />
				{activeTab === "projects" && <div className="absolute inset-0 bg-primary/5" />}
				<div className="absolute -top-20 -right-20 z-0 h-48 w-48 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 group-hover/section:scale-150" />

				<div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
					<div>
						<div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
							<div
								className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
									activeTab === "projects"
										? "bg-primary text-primary-content shadow-lg shadow-primary/30"
										: "bg-base-100 text-base-content/60 group-hover/section:bg-base-100/80 group-hover/section:text-base-content"
								}`}>
								<Icon code="f0ac" type="solid" className="ico-5" />
							</div>
							<div>
								<h2 className="font-bold font-display text-2xl text-base-content">Projects</h2>
								<p className="text-base-content/60 text-sm">The few things I actually finished and deployed</p>
							</div>
						</div>
					</div>

					<div className="flex gap-4 self-start md:self-auto">
						<div className="flex min-w-25 flex-col items-center justify-center rounded-2xl border border-base-content/5 bg-base-100/50 p-4 backdrop-blur-sm transition-colors duration-300">
							<span className="font-black font-display text-4xl text-primary">{projectsData ? projectsData.reservedSubdomains.length : "-"}</span>
							<span className="mt-1 font-bold text-base-content/40 text-xs uppercase tracking-widest">Total</span>
						</div>
					</div>
				</div>
			</button>

			<div className="col-span-full mt-4 flex animate-fade-up items-center gap-3" style={{ animationDelay: "500ms" }}>
				<h2 className="font-bold font-display text-base-content text-xl">{activeTab === "experiments" ? "Experiments Gallery" : "Projects Showcase"}</h2>
				<div className="h-px flex-1 bg-linear-to-r from-base-content/10 to-transparent" />
			</div>

			<div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{activeTab === "experiments" && (
					<>
						{experiments.map((exp, i) => (
							<div key={exp.slug} className="animate-fade-up perspective-[1000px]" style={{ animationDelay: `${600 + i * 50}ms` }}>
								<Link
									href={`/${exp.slug}`}
									className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-base-content/5 bg-base-200/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 ease-spring hover:-translate-y-2 hover:border-primary/20 hover:shadow-primary/10 hover:shadow-xl"
									style={{ transformStyle: "preserve-3d" }}>
									<div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

									<div className="relative z-10 flex flex-1 flex-col">
										<div className="mb-6 flex items-start justify-between">
											<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-base-100 text-base-content/80 shadow-sm ring-1 ring-base-content/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content group-hover:shadow-primary/30">
												<Icon code={exp.icon} type="solid" className="ico-[24] transition-transform duration-500 group-hover:rotate-12" />
											</div>
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-content/5 text-base-content/40 transition-all duration-500 group-hover:bg-base-content/10 group-hover:text-primary">
												<Icon
													code="f061"
													type="solid"
													className="ico-3 -rotate-45 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:rotate-0"
												/>
											</div>
										</div>

										<div className="mt-auto">
											<h3 className="mb-2 font-bold font-display text-base-content text-xl tracking-tight transition-colors duration-300 group-hover:text-primary">
												{exp.name}
											</h3>
											{exp.description && <p className="line-clamp-2 text-base-content/60 text-sm leading-relaxed">{exp.description}</p>}
										</div>
									</div>

									<div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary via-secondary to-accent opacity-80 transition-all duration-500 ease-spring group-hover:w-full" />
								</Link>
							</div>
						))}

						{experiments.length === 0 && (
							<div
								className="col-span-full flex animate-fade-up flex-col items-center justify-center py-24 text-center"
								style={{ animationDelay: "600ms" }}>
								<div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-base-200 shadow-inner">
									<div className="absolute inset-0 animate-ping rounded-3xl border border-primary/20" style={{ animationDuration: "3s" }} />
									<Icon code="f0c3" type="solid" className="ico-[40] text-base-content/20" />
								</div>
								<h3 className="mb-2 font-bold font-display text-2xl text-base-content/60">Empty Canvas</h3>
								<p className="max-w-md text-base-content/40">
									No experiments yet. Add a new folder under the{" "}
									<code className="rounded bg-base-200 px-1.5 py-0.5 text-base-content/60 text-xs">(experiments)</code> directory to get started.
								</p>
							</div>
						)}
					</>
				)}

				{activeTab === "projects" && (
					<>
						{projectsData?.reservedSubdomains.map((subdomain, i) => {
							const projectName = subdomain.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
							const projectUrl = `https://${subdomain}.${projectsData.domain}`;
							return (
								<div key={subdomain} className="animate-fade-up perspective-[1000px]" style={{ animationDelay: `${600 + i * 50}ms` }}>
									<a
										href={projectUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-base-content/5 bg-base-200/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 ease-spring hover:-translate-y-2 hover:border-primary/20 hover:shadow-primary/10 hover:shadow-xl"
										style={{ transformStyle: "preserve-3d" }}>
										<div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

										<div className="relative z-10 flex flex-1 flex-col">
											<div className="mb-6 flex items-start justify-between">
												<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-base-100 text-base-content/80 shadow-sm ring-1 ring-base-content/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content group-hover:shadow-primary/30">
													<Icon code="f0ac" type="solid" className="ico-[24] transition-transform duration-500 group-hover:rotate-12" />
												</div>
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-content/5 text-base-content/40 transition-all duration-500 group-hover:bg-base-content/10 group-hover:text-primary">
													<Icon
														code="f08e"
														type="solid"
														className="ico-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
													/>
												</div>
											</div>

											<div className="mt-auto">
												<h3 className="mb-2 font-bold font-display text-base-content text-xl tracking-tight transition-colors duration-300 group-hover:text-primary">
													{projectName}
												</h3>
												<p className="line-clamp-2 text-base-content/60 text-sm leading-relaxed">{`${subdomain}.${projectsData.domain}`}</p>
											</div>
										</div>

										<div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary via-secondary to-accent opacity-80 transition-all duration-500 ease-spring group-hover:w-full" />
									</a>
								</div>
							);
						})}
						{projectsData?.reservedSubdomains.length === 0 && (
							<div
								className="col-span-full flex animate-fade-up flex-col items-center justify-center py-24 text-center"
								style={{ animationDelay: "600ms" }}>
								<div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-base-200 shadow-inner">
									<div className="absolute inset-0 animate-ping rounded-3xl border border-primary/20" style={{ animationDuration: "3s" }} />
									<Icon code="f0ac" type="solid" className="ico-[40] text-base-content/20" />
								</div>
								<h3 className="mb-2 font-bold font-display text-2xl text-base-content/60">No Projects Found</h3>
								<p className="max-w-md text-base-content/40">Try checking back later.</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
