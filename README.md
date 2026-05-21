# Typing Master Fun

A fast, polished typing practice game built with React and Vite. Train your speed and accuracy, earn XP, level up, unlock achievements, and track progress—all in the browser with no account required. Everything runs client-side; no server or account is required.

## Features

- Timed practice sessions (15s, 30s, 60s, 120s)
- Multiple content modes: fun words, tech terms, quotes, and more
- Real-time WPM, accuracy, and mistake tracking
- XP, levels, streaks, and achievements (saved in `localStorage`)
- Keyboard heatmap and optional sound effects
- Responsive dark UI with smooth animations

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Other commands:

```bash
npm run build    # production bundle → dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

## Static build (no hosting required)

```bash
npm run build
```

The production files land in `dist/`. Preview them locally:

```bash
npm run preview
```

You can also serve `dist/` with any static file server, or open `dist/index.html` in a browser. Asset paths use a relative `base` (`./` in `vite.config.js`), so the build works from a folder path without extra configuration.

### Optional: GitHub Pages later

If you publish to GitHub Pages later, upload the **contents** of `dist/` (not the repo root). The build includes `public/.nojekyll` so GitHub does not run Jekyll on the output. A project site at `https://<username>.github.io/<repo>/` works with the default relative base—no workflow or hosting setup is included in this repo.

## Project structure

```
src/
  components/   # UI (TypingArea, ResultScreen, DashboardCards, …)
  hooks/        # Game state and persistence (useTypingGame, useStats, …)
  data/         # Word banks, achievements, levels
  utils/        # XP, sound, celebrations
public/         # Static assets (favicon, icons)
```

## License

MIT — use and modify freely.
