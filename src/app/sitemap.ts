import type { MetadataRoute } from "next";
import { getExperiments } from "#utils/experiments";
import { BASE_URL } from "#utils/helper";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
		...getExperiments().map((exp) => ({
			url: `${BASE_URL}/${exp.slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}
