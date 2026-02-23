export type Instrument = "default" | "vibraphone" | "wave";

export const INSTRUMENTS: Instrument[] = ["default", "vibraphone", "wave"];

export type Arc = {
	velocity: number;
	lastImpactTime: number;
	nextImpactTime: number;
};
