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

const INSTRUMENT_ICONS: Record<Instrument, string> = {
	sine: "f899",
	bell: "f8f2",
	wave: "f83e",
};

export function Controls({ soundEnabled, instrument, onToggleSound, onInstrumentChange }: Props) {
	return (
		<div className="fab absolute! bottom-8 right-8 z-10 group/fab">
			{/* Main trigger — sound toggle */}
			<button
				type="button"
				onClick={onToggleSound}
				className={cn(
					"btn btn-circle btn-lg shadow-lg transition-all dur-fast hover:scale-110",
					soundEnabled
						? "btn-primary shadow-primary/30"
						: "border-base-content/10 bg-base-300/60 text-base-content/70 shadow-base-300/20 backdrop-blur-xl hover:bg-base-300/80",
				)}>
				<Icon code={soundEnabled ? "f028" : "f6a9"} type="solid" className="ico-4" />
			</button>

			{/* Speed dial — instrument selectors */}
			{INSTRUMENTS.map((inst) => (
				<div key={inst} className="group-hover/fab:scale-100! group-hover/fab:opacity-100! group-hover/fab:visible!">
					<span
						className={cn(
							"rounded-lg px-3 py-1.5 text-xs font-semibold capitalize shadow-lg transition-all dur-fast",
							inst === instrument
								? "bg-primary text-primary-content shadow-primary/20"
								: "border border-base-content/5 bg-base-200/80 text-base-content/60 shadow-base-300/10 backdrop-blur-xl",
						)}>
						{inst}
					</span>
					<button
						type="button"
						onClick={() => onInstrumentChange(inst)}
						className={cn(
							"btn btn-circle shadow-md transition-all dur-fast hover:scale-110",
							inst === instrument
								? "btn-primary shadow-primary/25"
								: "border-base-content/10 bg-base-300/60 text-base-content/70 shadow-base-300/15 backdrop-blur-xl hover:bg-base-300/80",
						)}>
						<Icon code={INSTRUMENT_ICONS[inst]} type="solid" className="ico-4" />
					</button>
				</div>
			))}
		</div>
	);
}
