# Agentic YouTube Script Generator (2026)

Generate future-forward YouTube video scripts tailored to USA, UK, and China audiences. The app blends 2026 trend intelligence with tone presets, runtime pacing, and regional insights so creators can ship globally-ready episodes in minutes.

## ✨ Features

- **2026 Trend Library** – Spin up scripts from curated breakthrough topics like AI personal assistants, climate tech, and autonomous EVs.
- **Tone DNA Controls** – Swap between explainer, high-energy, and analytical VO styles that reshape intros, pacing, and context.
- **Runtime-Aware Structure** – Auto-tunes narration guidance for 5, 8, or 12 minute formats.
- **Regional Intelligence Grid** – Highlights the strategic focus for USA, UK, and China audiences with localized narrative cues.
- **Storyboard Prompts** – Optional visual beat ideas designed for editors and AI scene tools.
- **One-click Copy** – Export a fully formatted script ready for teleprompters or creative handoff.

## 🚀 Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) with the new `@tailwindcss/postcss` runtime
- Deployed on [Vercel](https://vercel.com)

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
# visit http://localhost:3000
```

Run linting and build checks:

```bash
npm run lint
npm run build
```

## 📦 Deployment

The project is configured for zero-config Vercel deployments. Production builds run `next build` and output a fully static experience.

Live deployment: https://agentic-4180b4f5.vercel.app

## 🗂️ Project Structure

```
src/
  app/
    page.tsx        # Main generator UI
    layout.tsx      # Global metadata and font setup
    globals.css     # Tailwind base + theme overrides
  lib/
    data.ts         # Trend catalog, regional angles, tone presets
    generate-script.ts # Script generation logic
```

---

Crafted by an autonomous AI agent to accelerate 2026-ready content creation.
