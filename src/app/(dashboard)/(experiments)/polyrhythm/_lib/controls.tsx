import { Icon } from "gliff";
import { cn } from "#utils/helper";
import { INSTRUMENTS, type Instrument } from "./types";

const ICONS: Record<Instrument, string> = { sine: "f899", bell: "f8f2", wave: "f83e" };

export function Controls({
	soundEnabled,
	instrument,
	onToggleSound,
	onInstrumentChange,
}: {
	soundEnabled: boolean;
	instrument: Instrument;
	onToggleSound: () => void;
	onInstrumentChange: (i: Instrument) => void;
}) {
	return (
		<div className="absolute! bottom-8 right-8 z-50 flex flex-col items-end gap-3">
			<div
				className={cn(
					"flex flex-col gap-2 overflow-hidden rounded-[2rem] bg-base-100/80 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
					soundEnabled ? "translate-y-0 scale-100 opacity-100 ring-1 ring-base-content/10" : "pointer-events-none translate-y-8 scale-50 opacity-0 ring-0",
				)}>
				{INSTRUMENTS.map((inst) => {
					const active = inst === instrument;
					return (
						<button
							key={inst}
							type="button"
							onClick={() => onInstrumentChange(inst)}
							className={cn(
								"group relative flex items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 transition-all duration-300 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
								active
									? "bg-primary text-primary-content shadow-md shadow-primary/20"
									: "bg-base-200/50 text-base-content/60 hover:bg-base-200 hover:text-base-content hover:shadow-sm",
							)}>
							<span className="text-sm font-bold capitalize tracking-wide">{inst}</span>
							<div
								className={cn(
									"flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-base-100 transition-all duration-300",
									active ? "text-primary shadow-inner" : "bg-transparent group-hover:bg-base-content/5",
								)}>
								<Icon
									code={ICONS[inst]}
									type="solid"
									className={cn("ico-[18] transition-transform duration-300", active ? "scale-100" : "group-hover:scale-110")}
								/>
							</div>
						</button>
					);
				})}
			</div>

			<button
				type="button"
				onClick={(e) => {
					onToggleSound();
					if (soundEnabled) (e.currentTarget as HTMLElement).blur();
				}}
				className={cn(
					"group relative flex h-16 w-16 items-center justify-center rounded-[2rem] shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-95",
					soundEnabled
						? "bg-primary text-primary-content shadow-primary/40 ring-4 ring-primary/20"
						: "bg-base-200/80 text-base-content/60 ring-1 ring-base-content/10 hover:bg-base-200 hover:text-base-content",
				)}>
				{soundEnabled && <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/20 to-transparent opacity-50" />}

				<div
					className={cn(
						"absolute inset-0 rounded-[2rem] border-2 border-primary opacity-0 transition-all duration-1000",
						soundEnabled && "animate-ping opacity-20",
					)}
				/>

				<Icon
					code={soundEnabled ? "f028" : "f6a9"}
					type="solid"
					className={cn(
						"ico-[24] relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
						soundEnabled ? "scale-110" : "scale-100 group-hover:scale-110",
					)}
				/>
			</button>
		</div>
	);
}
