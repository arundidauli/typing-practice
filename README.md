# Typing Master Fun [Live Demo](https://arundidauli.github.io/typing-practice/)

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

### GitHub Pages

The site is published from the **`docs/`** folder (built static files), not the repo root.

1. **Settings → Pages → Build and deployment** → Source: **Deploy from a branch** → Branch: `main` → Folder: **`/docs`**
2. Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which rebuilds and updates `docs/`.

Site URL: **https://arundidauli.github.io/typing-practice/**

Do not use the repo root (`/`) as the Pages folder — that serves dev `index.html` and causes a blank page (`/src/main.jsx` 404).

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
