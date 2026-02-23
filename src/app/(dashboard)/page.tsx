import { Icon } from "gliff";
import Link from "next/link";
import { getExperiments } from "#utils/experiments";

export default function HomePage() {
	const experiments = getExperiments();

	return (
		<div className="mx-auto max-w-5xl p-8">
			<div className="mb-12 pt-4">
				<h1 className="mb-2 font-bold font-display text-4xl tracking-tight">Welcome to the Lab</h1>
				<p className="text-base-content/50 text-lg">Interactive experiments & creative explorations</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{experiments.map((exp, i) => (
					<Link
						key={exp.slug}
						href={`/${exp.slug}`}
						className="group dur animate-fade-up rounded-2xl border border-base-content/5 bg-base-100 p-6 transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-base-200 hover:shadow-base-content/5 hover:shadow-xl"
						style={{ animationDelay: `${i * 100}ms` }}>
						<div className="dur mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
							<Icon code={exp.icon} type="solid" className="ico-5 text-primary" />
						</div>
						<h3 className="mb-1 font-semibold text-lg">{exp.name}</h3>
						{exp.description && <p className="text-base-content/40 text-sm">{exp.description}</p>}
					</Link>
				))}

				{experiments.length === 0 && (
					<div className="col-span-full py-20 text-center text-base-content/30">
						<Icon code="f0c3" type="solid" className="ico-12 mx-auto mb-4 block" />
						<p>No experiments yet. Add a folder under (experiments) to get started.</p>
					</div>
				)}
			</div>
		</div>
	);
}
