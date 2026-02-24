import type { Metadata } from "next";
import type { ReactNode } from "react";
import meta from "./meta.json";

export const metadata: Metadata = {
	title: meta.name,
	description: meta.description,
};

export default function PolyrhythmLayout({ children }: { children: ReactNode }) {
	return children;
}
