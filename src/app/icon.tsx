import { generateAppIcon } from "#components/seo/AppIcon";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
	return generateAppIcon(size.width);
}
