"use client";

import { useEffect, useRef } from "react";
import type { Arc, Instrument } from "./types";

const ARC_COUNT = 21;
const DURATION = 900;
const MAX_CYCLES = 100;
const ARC_COLOR = "#A6C48A";

const FREQ_SCALES: Record<Instrument, (i: number) => number> = {
	default: (i) => 220 * 2 ** ((i * 2) / 12),
	vibraphone: (i) => 262 * 2 ** ((i * 1.5) / 12),
	wave: (i) => 174 * 2 ** ((i * 2.5) / 12),
};

const calcVelocity = (i: number) => ((MAX_CYCLES - i) * 2 * Math.PI) / DURATION;
const calcNextImpact = (t: number, v: number) => t + (Math.PI / v) * 1000;

export function usePolyrhythm(canvasRef: React.RefObject<HTMLCanvasElement | null>, opts: { soundEnabled: boolean; instrument: Instrument }) {
	const optsRef = useRef(opts);
	optsRef.current = opts;

	const audioRef = useRef<AudioContext | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const t0 = Date.now();
		const arcs: Arc[] = Array.from({ length: ARC_COUNT }, (_, i) => ({
			velocity: calcVelocity(i),
			lastImpactTime: 0,
			nextImpactTime: calcNextImpact(t0, calcVelocity(i)),
		}));

		const playTone = (i: number) => {
			if (!optsRef.current.soundEnabled || document.hidden) return;
			const ac = (audioRef.current ??= new AudioContext());
			const freq = FREQ_SCALES[optsRef.current.instrument](i);
			const osc = ac.createOscillator();
			const gain = ac.createGain();
			osc.type = "sine";
			osc.frequency.value = freq;
			gain.gain.setValueAtTime(0.06, ac.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
			osc.connect(gain).connect(ac.destination);
			osc.start();
			osc.stop(ac.currentTime + 0.6);
		};

		let raf: number;

		const draw = () => {
			const dpr = devicePixelRatio;
			canvas.width = canvas.clientWidth * dpr;
			canvas.height = canvas.clientHeight * dpr;
			ctx.scale(dpr, dpr);

			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			const now = Date.now();
			const elapsed = (now - t0) / 1000;
			const len = Math.min(w, h) * 0.9;
			const cx = w / 2;
			const cy = h / 2;
			const initR = len * 0.05;
			const dotR = len * 0.006;
			const spacing = (len - initR - len * 0.03) / 2 / ARC_COUNT;

			ctx.lineCap = "round";

			for (let i = 0; i < ARC_COUNT; i++) {
				const arc = arcs[i];
				if (!arc) continue;
				const r = initR + spacing * i;
				const fade = Math.min((now - arc.lastImpactTime) / 1000, 1);
				const gap = (dotR * 5) / 3 / r;

				// Arc semicircles
				ctx.globalAlpha = 0.65 - 0.5 * fade;
				ctx.lineWidth = len * 0.002;
				ctx.strokeStyle = ARC_COLOR;
				ctx.beginPath();
				ctx.arc(cx, cy, r, Math.PI + gap, 2 * Math.PI - gap);
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(cx, cy, r, gap, Math.PI - gap);
				ctx.stroke();

				// Impact dots
				ctx.globalAlpha = 0.85 - 0.7 * fade;
				ctx.fillStyle = ARC_COLOR;
				for (const a of [Math.PI, 0]) {
					ctx.beginPath();
					ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), dotR * 0.75, 0, 2 * Math.PI);
					ctx.fill();
				}

				// Moving dot + sound trigger
				ctx.globalAlpha = 1;
				if (now >= arc.nextImpactTime) {
					playTone(i);
					arc.lastImpactTime = arc.nextImpactTime;
					arc.nextImpactTime = calcNextImpact(arc.nextImpactTime, arc.velocity);
				}

				const angle = (Math.PI + Math.max(0, elapsed) * arc.velocity) % (2 * Math.PI);
				ctx.beginPath();
				ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), dotR, 0, 2 * Math.PI);
				ctx.fill();
			}

			raf = requestAnimationFrame(draw);
		};

		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, [canvasRef]);

	useEffect(() => {
		return () => {
			audioRef.current?.close();
		};
	}, []);
}
