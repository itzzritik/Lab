import { ImageResponse } from "next/og";
import { OGImage } from "#components/og-image";
import meta from "./meta.json";

export const runtime = "edge";
export const alt = meta.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(<OGImage pill="Ritik's Lab" title={meta.name} description={meta.description} />, {
		...size,
	});
}
