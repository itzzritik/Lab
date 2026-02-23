"use client";

import { Icon } from "gliff";
import { cn } from "#utils/helper";
import type { Instrument } from "./types";
import { INSTRUMENTS } from "./types";

type Props = {
	soundEnabled: boolean;
	instrument: Instrument;
	onToggleSound: () => void;
	onInstrumentChange: (i: Instrument) => void;
};

export function Controls({ soundEnabled, instrument, onToggleSound, onInstrumentChange }: Props) {
	return (
		<div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/8 bg-white/4 px-1.5 py-1.5 backdrop-blur-2xl">
			<button
				type="button"
				onClick={onToggleSound}
				className={cn(
					"flex size-8 items-center justify-center rounded-full transition-all dur-fast",
					soundEnabled ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70",
				)}>
				<Icon code={soundEnabled ? "f028" : "f6a9"} type="solid" className="ico-3" />
			</button>

			<div className="mx-1 h-4 w-px bg-white/8" />

			{INSTRUMENTS.map((inst) => (
				<button
					key={inst}
					type="button"
					onClick={() => onInstrumentChange(inst)}
					className={cn(
						"rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all dur-fast",
						inst === instrument ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60",
					)}>
					{inst}
				</button>
			))}
		</div>
	);
}
