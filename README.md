# Typing Master Fun

A fast, polished typing practice game built with React and Vite. Train your speed and accuracy, earn XP, level up, unlock achievements, and track progress—all in the browser with no account required.

**Live site:** `https://<your-github-username>.github.io/typing-master-fun/`

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

## Deploy to GitHub Pages

This repo is set up for GitHub Pages. The repository name **must** be `typing-master-fun` so it matches the Vite `base` path in `vite.config.js` (`/typing-master-fun/`).

1. Create a new GitHub repository named **`typing-master-fun`**.
2. Push this project to the **`main`** branch.
3. In the repo on GitHub: **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**
4. On the first push to `main`, the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys automatically.

After deploy, the site is available at:

`https://<your-github-username>.github.io/typing-master-fun/`

Replace `<your-github-username>` with your GitHub username. Update the `og:url` and `og:image` meta tags in `index.html` if you add a social preview image.

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
