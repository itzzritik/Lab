import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Settings",
	description: "Customize your workspace appearance and animation speed",
	alternates: { canonical: "/settings" },
	openGraph: { url: "/settings" },
	robots: { index: false, follow: false },
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
	return children;
}
