import { ImageResponse } from "next/og";

export function generateAppIcon(size: number) {
	// Radius for the outermost container
	const radius = Math.round(size * 0.22);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#ffffff",
				borderRadius: `${radius}px`,
			}}>
			<svg role="img" aria-label="App Icon" width="60%" height="60%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<clipPath id="flask-clip">
						<path d="M 40 11 L 40 35 L 16 77 C 12 84 18 91 28 91 L 72 91 C 82 91 88 84 84 77 L 60 35 L 60 11 Z" />
					</clipPath>
				</defs>

				{/* Base Inner White Fill */}
				<path d="M 40 11 L 40 35 L 16 77 C 12 84 18 91 28 91 L 72 91 C 82 91 88 84 84 77 L 60 35 L 60 11 Z" fill="#ffffff" />

				{/* Accent Liquid Fill - Vivid Electric Blue for striking contrast against black and white */}
				<g clipPath="url(#flask-clip)">
					<rect x="0" y="56" width="100" height="50" fill="#2563EB" />
				</g>

				{/* Accent Minimal Bubble */}
				<circle cx="50" cy="46" r="4.5" fill="#2563EB" />

				{/* Ultra-Bold Outline */}
				<path
					d="M 40 11 L 40 35 L 16 77 C 12 84 18 91 28 91 L 72 91 C 82 91 88 84 84 77 L 60 35 L 60 11 Z"
					stroke="#000000"
					strokeWidth="10"
					strokeLinejoin="round"
					fill="none"
				/>

				{/* Thick Flask Lip */}
				<path d="M 28 11 L 72 11" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
			</svg>
		</div>,
		{ width: size, height: size },
	);
}
