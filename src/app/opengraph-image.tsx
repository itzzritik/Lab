import { ImageResponse } from "next/og";
import { OGImage } from "#components/og-image";

export const runtime = "edge";
export const alt = "Ritik's Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<OGImage pill="Creative Lab" title="Ritik's Lab" description="Interactive playground for creative coding, experiments, and web innovation" />,
		{
			...size,
		},
	);
}
