import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Experiment = {
	slug: string;
	name: string;
	icon: string;
	description: string;
};

const EXPERIMENTS_DIR = join(process.cwd(), "src/app/(dashboard)/(experiments)");

export function getExperiments(): Experiment[] {
	if (!existsSync(EXPERIMENTS_DIR)) return [];

	return readdirSync(EXPERIMENTS_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory() && !d.name.startsWith("_"))
		.map((d) => {
			const defaults: Experiment = {
				slug: d.name,
				name: d.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
				icon: "f0c3",
				description: "",
			};

			const metaPath = join(EXPERIMENTS_DIR, d.name, "meta.json");
			if (existsSync(metaPath)) {
				try {
					return { ...defaults, ...JSON.parse(readFileSync(metaPath, "utf-8")), slug: d.name };
				} catch {}
			}

			return defaults;
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}
