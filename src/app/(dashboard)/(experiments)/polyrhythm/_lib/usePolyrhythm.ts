"use client";

import { useEffect, useRef } from "react";
import type { Instrument } from "./types";

const N = 21;
const DURATION = 900;
const MAX_CYCLES = 100;

const FREQ: Record<Instrument, (i: number) => number> = {
	sine: (i) => 220 * 2 ** ((i * 2) / 12),
	bell: (i) => 262 * 2 ** ((i * 1.5) / 12),
	wave: (i) => 174 * 2 ** ((i * 2.5) / 12),
};

type Ripple = { x: number; y: number; t: number; idx: number };

const vel = (i: number) => ((MAX_CYCLES - i) * 2 * Math.PI) / DURATION;
const arcHue = (i: number) => 30 + (i / (N - 1)) * 250;
const hsla = (h: number, s: number, l: number, a: number) => `hsla(${h},${s}%,${l}%,${a})`;

export function usePolyrhythm(
	ref: React.RefObject<HTMLCanvasElement | null>,
	opts: { soundEnabled: boolean; instrument: Instrument },
) {
	const optsRef = useRef(opts);
	optsRef.current = opts;
	const audioRef = useRef<AudioContext | null>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const t0 = Date.now();
		const arcs = Array.from({ length: N }, (_, i) => {
			const v = vel(i);
			return { v, last: 0, next: t0 + (Math.PI / v) * 1000 };
		});
		const ripples: Ripple[] = [];

		const tone = (i: number) => {
			if (!optsRef.current.soundEnabled || document.hidden) return;
			const ac = (audioRef.current ??= new AudioContext());
			const osc = ac.createOscillator();
			const gain = ac.createGain();
			osc.type = "sine";
			osc.frequency.value = FREQ[optsRef.current.instrument](i);
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
			const sec = (now - t0) / 1000;
			const sz = Math.min(w, h) * 0.9;
			const cx = w / 2;
			const cy = h / 2;
			const r0 = sz * 0.05;
			const dotR = sz * 0.006;
			const sp = (sz / 2 - r0 - sz * 0.02) / N;

			// ── Background ──
			ctx.fillStyle = "#08080f";
			ctx.fillRect(0, 0, w, h);

			const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sz * 0.55);
			glow.addColorStop(0, "rgba(40,20,60,0.25)");
			glow.addColorStop(0.5, "rgba(20,12,35,0.12)");
			glow.addColorStop(1, "transparent");
			ctx.fillStyle = glow;
			ctx.fillRect(0, 0, w, h);

			ctx.lineCap = "round";

			// ── Arcs ──
			for (let i = 0; i < N; i++) {
				const arc = arcs[i];
				if (!arc) continue;
				const r = r0 + sp * i;
				const hue = arcHue(i);
				const fade = Math.min((now - arc.last) / 800, 1);
				const gap = (dotR * 4) / r;

				// Semicircles
				ctx.lineWidth = sz * 0.0015;
				ctx.strokeStyle = hsla(hue, 70, 65, 0.1 + 0.35 * (1 - fade));
				for (const off of [Math.PI, 0]) {
					ctx.beginPath();
					ctx.arc(cx, cy, r, off + gap, off + Math.PI - gap);
					ctx.stroke();
				}

				// Endpoints
				const endAlpha = 0.2 + 0.6 * (1 - fade);
				const endR = dotR * (0.5 + 0.7 * (1 - fade));
				ctx.fillStyle = hsla(hue, 70, 70, endAlpha);
				for (const a of [0, Math.PI]) {
					ctx.beginPath();
					ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), endR, 0, 2 * Math.PI);
					ctx.fill();
				}

				// Angle + impact check
				const angle = (Math.PI + sec * arc.v) % (2 * Math.PI);
				if (now >= arc.next) {
					tone(i);
					arc.last = arc.next;
					arc.next += (Math.PI / arc.v) * 1000;
					const side = angle < Math.PI / 2 || angle > (3 * Math.PI) / 2 ? 0 : Math.PI;
					ripples.push({ x: cx + r * Math.cos(side), y: cy + r * Math.sin(side), t: now, idx: i });
				}

				// Moving dot with glow
				ctx.shadowBlur = 10;
				ctx.shadowColor = hsla(hue, 80, 65, 0.5);
				ctx.fillStyle = hsla(hue, 75, 72, 1);
				ctx.beginPath();
				ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), dotR, 0, 2 * Math.PI);
				ctx.fill();
				ctx.shadowBlur = 0;
			}

			// ── Ripples ──
			for (let j = ripples.length - 1; j >= 0; j--) {
				const rip = ripples[j];
				if (!rip) continue;
				const age = (now - rip.t) / 600;
				if (age > 1) {
					ripples.splice(j, 1);
					continue;
				}
				const hue = arcHue(rip.idx);
				const ease = 1 - age;
				ctx.strokeStyle = hsla(hue, 70, 70, 0.5 * ease);
				ctx.lineWidth = sz * 0.002 * ease;
				ctx.shadowBlur = 12 * ease;
				ctx.shadowColor = hsla(hue, 80, 65, 0.3);
				ctx.beginPath();
				ctx.arc(rip.x, rip.y, dotR + age * sz * 0.018, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.shadowBlur = 0;
			}

			raf = requestAnimationFrame(draw);
		};

		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, [ref]);

	useEffect(() => () => void audioRef.current?.close(), []);
}
