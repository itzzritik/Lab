<div align="center">

# Ritik's Lab

**A curated collection of interactive web experiments, creative visualizations, and generative art built with modern web technologies.**

An ever-growing playground where ideas come to life through code.

[![Live Site](https://img.shields.io/badge/lab.ritik.me-Visit%20Live%20Site-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://lab.ritik.me)

[![Next.js](https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=000)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI_5-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)](https://daisyui.com)

</div>

---

## About

**Ritik's Lab** is a personal laboratory for interactive web experiments and creative coding explorations. Each experiment is a self-contained, fully interactive piece that runs directly in the browser - no installs, no dependencies, just open and play.

The lab is designed as a living collection that keeps growing over time. New experiments are added regularly across a wide range of topics. The entire platform is built around a convention-based architecture - creating a new experiment is as simple as dropping a folder into the experiments directory. It auto-registers in the sidebar, home grid, and routing without touching a single config file.

### Highlights

- **34+ themes** - every experiment adapts to your chosen theme in real time, powered by DaisyUI's theme engine
- **Configurable animation speeds** - choose between instant, swift, smooth, or gentle transitions globally across the UI
- **Fully responsive** - the dashboard, sidebar, and every experiment work seamlessly across desktop, tablet, and mobile
- **Native browser APIs** - all visualizations are built on top of Canvas, Web Audio, and other standard web APIs with zero external runtime overhead
- **Auto-discovery** - drop a new folder into the experiments directory with a `page.tsx` and an optional `meta.json`, and it appears everywhere automatically
- **Persistent preferences** - theme selection and animation speed are saved to local storage and restored on revisit

---

## Experiments

<!-- ┌──────────────────────────────────────────────────────┐ -->
<!-- │  Experiments are listed below. Each entry includes   │ -->
<!-- │  a brief description and a live demo badge.          │ -->
<!-- └──────────────────────────────────────────────────────┘ -->

### Polyrhythm

A mesmerizing **polyrhythmic metronome visualization** rendered on HTML Canvas. 21 concentric arcs rotate at mathematically related speeds, producing a hypnotic visual pattern. Toggle sound to hear each arc produce a tone when it hits an endpoint - choose between **sine**, **bell**, and **sawtooth wave** instruments. The colors adapt dynamically to the active DaisyUI theme using a primary-to-secondary HSL gradient.

**Concepts:** Canvas 2D rendering &bull; Web Audio API &bull; oscillator synthesis &bull; polyrhythmic timing &bull; HSL color interpolation &bull; theme-reactive palettes

[![Open Polyrhythm](https://img.shields.io/badge/▶%20Open%20Live%20Demo-4f46e5?style=for-the-badge)](https://lab.ritik.me/polyrhythm)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **UI Library** | [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com) |
| **Fonts** | Days One (display) &bull; Outfit (body) &bull; Space Mono (monospace) |
| **Icons** | [Gliff](https://www.npmjs.com/package/gliff) (Font Awesome unicode icons) |
| **Linting** | [Biome 2](https://biomejs.dev) |
| **Package Manager** | [pnpm](https://pnpm.io) |
