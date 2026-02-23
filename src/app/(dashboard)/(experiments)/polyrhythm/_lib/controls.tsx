"use client";

import { Icon } from "gliff";
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
		<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
			<button type="button" onClick={onToggleSound} className="btn btn-sm btn-circle btn-neutral dur-fast transition-all">
				<Icon code={soundEnabled ? "f028" : "f6a9"} type="solid" className="ico-3" />
			</button>

			<div className="flex overflow-hidden rounded-full border border-neutral-content/10 bg-neutral">
				{INSTRUMENTS.map((inst) => (
					<button
						key={inst}
						type="button"
						onClick={() => onInstrumentChange(inst)}
						className={`px-3 py-1.5 font-medium text-xs capitalize transition-all dur-fast${
							inst === instrument
								? "bg-neutral-content/15 text-neutral-content"
								: "text-neutral-content/40 hover:bg-neutral-content/5 hover:text-neutral-content/70"
						}
						`}>
						{inst}
					</button>
				))}
			</div>
		</div>
	);
}
