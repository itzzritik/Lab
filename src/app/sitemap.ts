import type { MetadataRoute } from "next";
import { getExperiments } from "#utils/experiments";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lab.ritik.me";
	const experiments = getExperiments();

	const staticRoutes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/settings`,
			lastModified: new Date(),
			changeFrequency: "yearly" as const,
			priority: 0.5,
		},
	];

	const experimentRoutes = experiments.map((experiment) => ({
		url: `${baseUrl}/${experiment.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	return [...staticRoutes, ...experimentRoutes];
}
