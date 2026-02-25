import type { ReactNode } from "react";
import { getExperimentMetadata } from "#utils/experiments";
import meta from "./meta.json";

export const metadata = getExperimentMetadata(meta, "polyrhythm");

export default function PolyrhythmLayout({ children }: { children: ReactNode }) {
	return children;
}
