import type { Metadata } from "next";
import type { ReactNode } from "react";

const description = "Customize your workspace appearance and animation speed";

export const metadata: Metadata = {
	title: "Settings",
	description,
	alternates: { canonical: "/settings" },
	openGraph: { title: "Settings", description, url: "/settings" },
	robots: { index: false, follow: false },
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
	return children;
}
