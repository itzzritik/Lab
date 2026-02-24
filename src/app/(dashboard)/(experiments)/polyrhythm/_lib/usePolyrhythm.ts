"use client";

import { useEffect, useRef } from "react";
import type { Instrument } from "./types";

const N = 21;
const DURATION = 900;
const MAX_CYCLES = 100;

const VOICES: Record<Instrument, { type: OscillatorType; freq: (i: number) => number }> = {
	sine: { type: "sine", freq: (i) => 220 * 2 ** ((i * 2) / 12) },
	bell: { type: "triangle", freq: (i) => 262 * 2 ** ((i * 1.5) / 12) },
	wave: { type: "sawtooth", freq: (i) => 174 * 2 ** ((i * 2.5) / 12) },
};

type Ripple = { x: number; y: number; t: number; idx: number };

const vel = (i: number) => ((MAX_CYCLES - i) * 2 * Math.PI) / DURATION;

type RGB = [number, number, number];

const sampleClass = (cls: string): RGB => {
	const el = document.createElement("div");
	el.className = cls;
	el.style.cssText = "position:fixed;width:1px;height:1px;pointer-events:none;opacity:0";
	document.body.appendChild(el);
	const bg = getComputedStyle(el).backgroundColor;
	el.remove();
	const c = document.createElement("canvas");
	c.width = c.height = 1;
	const ctx = c.getContext("2d", { willReadFrequently: true });
	if (!ctx) return [128, 128, 128] as RGB;
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, 1, 1);
	const d = ctx.getImageData(0, 0, 1, 1).data;
	return [d[0] ?? 128, d[1] ?? 128, d[2] ?? 128];
};

type HSL = [number, number, number];

const rgbToHsl = (c: RGB): HSL => {
	const r = c[0] / 255,
		g = c[1] / 255,
		b = c[2] / 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return [0, 0, l];
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) h = ((b - r) / d + 2) / 6;
	else h = ((r - g) / d + 4) / 6;
	return [h, s, l];
};

const hslToRgb = (h: number, s: number, l: number): RGB => {
	if (s === 0) {
		const v = Math.round(l * 255);
		return [v, v, v];
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
		if (tt < 1 / 6) return p + (q - p) * 6 * tt;
		if (tt < 1 / 2) return q;
		if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
		return p;
	};
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1 / 3) * 255)];
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const lerpHue = (a: number, b: number, t: number) => {
	let d = b - a;
	if (d > 0.5) d -= 1;
	if (d < -0.5) d += 1;
	return ((a + d * t) % 1 + 1) % 1;
};

const buildPalette = (): RGB[] => {
	const primary = sampleClass("bg-primary");
	const secondary = sampleClass("bg-secondary");
	const bg = sampleClass("bg-base-100");
	const hslA = rgbToHsl(primary);
	const hslB = rgbToHsl(secondary);
	const bgL = rgbToHsl(bg)[2];

	const brightL = Math.max(hslA[2], hslB[2]);
	const targetL = bgL < 0.5 ? Math.max(brightL, 0.65) : Math.min(brightL, 0.35);

	return Array.from({ length: N }, (_, i) => {
		const t = i / (N - 1);
		const h = lerpHue(hslA[0], hslB[0], t);
		const s = hslA[1] + (hslB[1] - hslA[1]) * t;
		return hslToRgb(h, s, targetL);
	});
};

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

		let palette = buildPalette();
		const observer = new MutationObserver(() => {
			palette = buildPalette();
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

		let t0 = Date.now();
		let hiddenAt = 0;
		const arcs = Array.from({ length: N }, (_, i) => {
			const v = vel(i);
			return { v, last: 0, next: t0 + (Math.PI / v) * 1000 };
		});
		const ripples: Ripple[] = [];

		const onVisibilityChange = () => {
			if (document.hidden) {
				hiddenAt = Date.now();
			} else if (hiddenAt > 0) {
				const elapsed = Date.now() - hiddenAt;
				t0 += elapsed;
				for (const arc of arcs) {
					arc.next += elapsed;
					if (arc.last > 0) arc.last += elapsed;
				}
				for (const rip of ripples) {
					rip.t += elapsed;
				}
				hiddenAt = 0;
			}
		};
		document.addEventListener("visibilitychange", onVisibilityChange);

		const BELL_PARTIALS: [number, number, number][] = [
			[1, 0.04, 1.2],
			[2.4, 0.02, 0.8],
			[5.43, 0.012, 0.5],
			[6.8, 0.008, 0.4],
			[8.21, 0.005, 0.3],
		];
		const playBell = (ac: AudioContext, freq: number) => {
			for (const [partial, vol, decay] of BELL_PARTIALS) {
				const osc = ac.createOscillator();
				const gain = ac.createGain();
				osc.type = "sine";
				osc.frequency.value = freq * partial;
				gain.gain.setValueAtTime(vol, ac.currentTime);
				gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + decay);
				osc.connect(gain).connect(ac.destination);
				osc.start();
				osc.stop(ac.currentTime + decay);
			}
		};

		const tone = (i: number) => {
			if (!optsRef.current.soundEnabled || document.hidden) return;
			if (!audioRef.current) audioRef.current = new AudioContext();
			const ac = audioRef.current;
			const voice = VOICES[optsRef.current.instrument];

			if (optsRef.current.instrument === "bell") {
				playBell(ac, voice.freq(i));
				return;
			}

			const osc = ac.createOscillator();
			const gain = ac.createGain();
			osc.type = voice.type;
			osc.frequency.value = voice.freq(i);
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
			const pal = palette;
			const fallbackColor: RGB = [128, 128, 128];

			ctx.clearRect(0, 0, w, h);
			ctx.lineCap = "round";

			for (let i = 0; i < N; i++) {
				const arc = arcs[i];
				if (!arc) continue;
				const c = pal[i] ?? fallbackColor;
				const r = r0 + sp * i;
				const fade = Math.min((now - arc.last) / 800, 1);
				const gap = (dotR * 4) / r;

				ctx.lineWidth = sz * 0.0015;
				ctx.strokeStyle = rgba(c, 0.25 + 0.2 * (1 - fade));
				for (const off of [Math.PI, 0]) {
					ctx.beginPath();
					ctx.arc(cx, cy, r, off + gap, off + Math.PI - gap);
					ctx.stroke();
				}

				const endR = dotR * (0.5 + 0.7 * (1 - fade));
				ctx.fillStyle = rgba(c, 0.35 + 0.25 * (1 - fade));
				for (const a of [0, Math.PI]) {
					ctx.beginPath();
					ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), endR, 0, 2 * Math.PI);
					ctx.fill();
				}

				const angle = (Math.PI + sec * arc.v) % (2 * Math.PI);
				if (now >= arc.next) {
					tone(i);
					arc.last = arc.next;
					arc.next += (Math.PI / arc.v) * 1000;
					const side = angle < Math.PI / 2 || angle > (3 * Math.PI) / 2 ? 0 : Math.PI;
					ripples.push({ x: cx + r * Math.cos(side), y: cy + r * Math.sin(side), t: now, idx: i });
				}

				ctx.shadowBlur = 10;
				ctx.shadowColor = rgba(c, 0.5);
				ctx.fillStyle = rgba(c, 0.9);
				ctx.beginPath();
				ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), dotR, 0, 2 * Math.PI);
				ctx.fill();
				ctx.shadowBlur = 0;
			}

			for (let j = ripples.length - 1; j >= 0; j--) {
				const rip = ripples[j];
				if (!rip) continue;
				const age = (now - rip.t) / 600;
				if (age > 1) {
					ripples.splice(j, 1);
					continue;
				}
				const c = pal[rip.idx] ?? fallbackColor;
				const ease = 1 - age;
				ctx.strokeStyle = rgba(c, 0.6 * ease);
				ctx.lineWidth = sz * 0.002 * ease;
				ctx.shadowBlur = 12 * ease;
				ctx.shadowColor = rgba(c, 0.3);
				ctx.beginPath();
				ctx.arc(rip.x, rip.y, dotR + age * sz * 0.018, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.shadowBlur = 0;
			}

			raf = requestAnimationFrame(draw);
		};

		raf = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [ref]);

	useEffect(() => () => void audioRef.current?.close(), []);
}
