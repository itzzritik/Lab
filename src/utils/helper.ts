import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://lab.ritik.me";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
