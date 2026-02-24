import { Icon } from "gliff";
import Link from "next/link";
import { getExperiments } from "#utils/experiments";

export default function HomePage() {
	const experiments = getExperiments();
	const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-10 animate-fade-up pt-2">
				<p className="mb-1 text-sm text-base-content/60">{today}</p>
				<h1 className="mb-1 font-display text-3xl font-bold tracking-tight">Welcome back</h1>
				<p className="text-base-content/70">Your creative experiments at a glance</p>
			</div>

			{/* Stats */}
			<div className="mb-10 animate-fade-up grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ animationDelay: "60ms" }}>
				<div className="flex items-center gap-4 rounded-xl border border-base-content/10 bg-base-200 p-4">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
						<Icon code="f0c3" type="solid" className="ico-4 text-primary" />
					</div>
					<div>
						<p className="text-2xl font-bold">{experiments.length}</p>
						<p className="text-xs text-base-content/60">Experiments</p>
					</div>
				</div>
			</div>

			{/* Experiments */}
			<div className="mb-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
				<h2 className="text-lg font-semibold">Experiments</h2>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{experiments.map((exp, i) => (
					<Link
						key={exp.slug}
						href={`/${exp.slug}`}
						className="group animate-fade-up flex gap-4 rounded-xl border border-base-content/10 bg-base-200 p-5 transition-all dur hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
						style={{ animationDelay: `${180 + i * 80}ms` }}>
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors dur group-hover:bg-primary/15">
							<Icon code={exp.icon} type="solid" className="ico-5 text-primary" />
						</div>
						<div className="min-w-0 flex-1">
							<h3 className="font-semibold">{exp.name}</h3>
							{exp.description && <p className="mt-0.5 truncate text-sm text-base-content/60">{exp.description}</p>}
						</div>
						<Icon
							code="f054"
							type="solid"
							className="ico-3 shrink-0 self-center text-base-content/30 transition-all dur group-hover:translate-x-0.5 group-hover:text-primary/60"
						/>
					</Link>
				))}

				{experiments.length === 0 && (
					<div className="animate-fade-in col-span-full py-20 text-center text-base-content/50">
						<Icon code="f0c3" type="solid" className="ico-12 mx-auto mb-4 block" />
						<p>No experiments yet. Add a folder under (experiments) to get started.</p>
					</div>
				)}
			</div>
		</div>
	);
}
