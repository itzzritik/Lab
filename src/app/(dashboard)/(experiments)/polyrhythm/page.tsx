"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "#utils/helper";
import { Controls } from "./_lib/controls";
import type { Instrument } from "./_lib/types";
import { usePolyrhythm } from "./_lib/usePolyrhythm";

export default function PolyrhythmPage() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [soundEnabled, setSoundEnabled] = useState(false);
	const [instrument, setInstrument] = useState<Instrument>("vibraphone");

	usePolyrhythm(canvasRef, { soundEnabled, instrument });

	const toggleSound = useCallback(() => setSoundEnabled((v) => !v), []);

	return (
		<div className="relative h-full overflow-hidden bg-black">
			<canvas ref={canvasRef} className="h-full w-full cursor-pointer" onClick={toggleSound} />

			<Controls soundEnabled={soundEnabled} instrument={instrument} onToggleSound={toggleSound} onInstrumentChange={setInstrument} />

			<div
				className={cn(
					"pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-neutral/80 px-6 py-3 text-sm text-neutral-content/50 transition-opacity dur-slow",
					soundEnabled ? "opacity-0" : "opacity-100",
				)}>
				Click anywhere to toggle sound
			</div>
		</div>
	);
}
