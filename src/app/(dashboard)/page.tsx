import { Icon } from "gliff";
import type { Metadata } from "next";
import Link from "next/link";
import { getExperiments } from "#utils/experiments";

export const metadata: Metadata = {
	title: "Home | Ritik's Lab",
	description: "Interactive playground for creative coding, experiments, and web innovation",
};

const GREETINGS = [
	"Welcome to the lab",
	"Let's cook.",
	"Break things beautifully.",
	"Where ideas mutate.",
	"Tinker. Break. Ship.",
	"What's brewing?",
];

export default function HomePage() {
	const experiments = getExperiments();
	const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

	return (
		<div className="min-h-full w-full p-6 md:p-10 pb-20">
			<div className="relative mb-12 flex flex-col items-start gap-2 pt-4">
				<div className="absolute -left-10 -top-10 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

				<p className="animate-fade-up text-sm font-semibold uppercase tracking-widest text-primary/80" style={{ animationDuration: "800ms" }}>
					{today}
				</p>

				<h1
					className="animate-fade-up font-display text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-base-content to-base-content/60 md:text-6xl py-1"
					style={{ animationDuration: "800ms", animationDelay: "100ms" }}>
					{greeting}
				</h1>

				<p className="animate-fade-up text-lg text-base-content/60" style={{ animationDuration: "800ms", animationDelay: "200ms" }}>
					Interactive playground for creative coding, experiments, and web innovation
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
				<section
					className="group/section relative animate-fade-up overflow-hidden rounded-[2rem] border border-base-content/5 bg-base-200/50 p-6 sm:p-8 shadow-sm backdrop-blur-xl lg:col-span-12"
					style={{ animationDelay: "300ms" }}>
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/section:opacity-100" />
					<div className="absolute -right-20 -top-20 z-0 h-48 w-48 rounded-full bg-primary/10 blur-[40px] transition-transform duration-700 group-hover/section:scale-150" />

					<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
						<div>
							<div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 text-primary-content">
									<Icon code="f0c3" type="solid" className="ico-5" />
								</div>
								<div>
									<h2 className="font-display text-2xl font-bold text-base-content">Active Projects</h2>
									<p className="text-sm text-base-content/60">Currently tracking {experiments.length} creative explorations.</p>
								</div>
							</div>
						</div>

						<div className="flex gap-4 self-start md:self-auto">
							<div className="flex flex-col items-center justify-center rounded-2xl border border-base-content/5 bg-base-100/50 p-4 min-w-[100px] backdrop-blur-sm">
								<span className="font-display text-4xl font-black text-primary">{experiments.length}</span>
								<span className="text-xs font-bold uppercase tracking-widest text-base-content/40 mt-1">Total</span>
							</div>
						</div>
					</div>
				</section>

				<div className="animate-fade-up col-span-full mt-4 flex items-center gap-3" style={{ animationDelay: "400ms" }}>
					<h2 className="font-display text-xl font-bold text-base-content">Experiments Gallery</h2>
					<div className="h-px flex-1 bg-gradient-to-r from-base-content/10 to-transparent" />
				</div>

				<div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{experiments.map((exp, i) => (
						<div key={exp.slug} className="animate-fade-up [perspective:1000px]" style={{ animationDelay: `${500 + i * 100}ms` }}>
							<Link
								href={`/${exp.slug}`}
								className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-base-content/5 bg-base-200/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20"
								style={{ transformStyle: "preserve-3d" }}>
								<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

								<div className="relative z-10 flex flex-1 flex-col">
									<div className="mb-6 flex items-start justify-between">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-base-100 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content group-hover:shadow-primary/30 text-base-content/80 ring-1 ring-base-content/5">
											<Icon code={exp.icon} type="solid" className="ico-[24] transition-transform duration-500 group-hover:rotate-12" />
										</div>
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-content/5 text-base-content/40 transition-all duration-500 group-hover:bg-base-content/10 group-hover:text-primary">
											<Icon
												code="f061"
												type="solid"
												className="ico-3 -rotate-45 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0.5"
											/>
										</div>
									</div>

									<div className="mt-auto">
										<h3 className="mb-2 font-display text-xl font-bold tracking-tight text-base-content transition-colors duration-300 group-hover:text-primary">
											{exp.name}
										</h3>
										{exp.description && <p className="line-clamp-2 text-sm text-base-content/60 leading-relaxed">{exp.description}</p>}
									</div>
								</div>

								<div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-80 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:w-full" />
							</Link>
						</div>
					))}

					{experiments.length === 0 && (
						<div className="animate-fade-up col-span-full flex flex-col items-center justify-center py-24 text-center" style={{ animationDelay: "500ms" }}>
							<div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-base-200 shadow-inner">
								<div className="absolute inset-0 rounded-3xl animate-ping border border-primary/20" style={{ animationDuration: "3s" }} />
								<Icon code="f0c3" type="solid" className="ico-[40] text-base-content/20" />
							</div>
							<h3 className="mb-2 font-display text-2xl font-bold text-base-content/60">Empty Canvas</h3>
							<p className="max-w-md text-base-content/40">
								No experiments yet. Add a new folder under the{" "}
								<code className="rounded bg-base-200 px-1.5 py-0.5 text-xs text-base-content/60">(experiments)</code> directory to get started.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
