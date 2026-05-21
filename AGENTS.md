# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React typing game. Application source lives in `src/`.

- `src/components/`: reusable UI components such as `TypingArea.jsx`, `ResultScreen.jsx`, and `KeyboardHeatmap.jsx`.
- `src/hooks/`: stateful game and persistence logic, including `useTypingGame.js`, `useStats.js`, and `useLocalStorage.js`.
- `src/data/wordBanks.js`: typing content and category data.
- `src/utils/gameUtils.js`: shared game utilities such as XP, sound, and celebration helpers.
- `src/assets/` and `public/`: static assets.
- `dist/`: generated production build output; do not edit manually.

Keep feature logic close to its owner. Extract shared behavior into `hooks/` or `utils/` only when reused.

## Build, Test, and Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Vite development server.
- `npm run build`: create the production bundle in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint across the project.

## Coding Style & Naming Conventions

Use JavaScript modules and React function components. Name components in PascalCase (`DashboardCards.jsx`) and hooks with the `use` prefix (`useTypingGame.js`). Use camelCase for variables, functions, and derived state.

Follow the existing style: 2-space indentation, single quotes, no semicolons in most files, and Tailwind utility classes for styling. Keep components focused and avoid moving game-state logic into presentation components.

## Testing Guidelines

There is no test runner configured yet. Before larger behavior changes, add Vitest + React Testing Library. Suggested placement: colocated `*.test.jsx` files or `src/__tests__/` for integration coverage.

Prioritize tests for `useTypingGame.js`, `useStats.js`, `gameUtils.js`, localStorage behavior, timer edge cases, and score/accuracy calculations. Always run `npm run lint` and `npm run build` before handing off changes.

## Commit & Pull Request Guidelines

This checkout has no Git history available, so use conventional, imperative commits such as `feat: add streak bonus animation` or `fix: prevent timer restart on pause`.

Pull requests should include a concise summary, validation steps (`npm run lint`, `npm run build`), linked issues when applicable, and screenshots or screen recordings for UI changes. Note any changes to stored stats, achievements, or word-bank data because they affect existing users.

## Security & Configuration Tips

Do not commit secrets or environment-specific credentials. The app currently uses client-side storage only, so treat localStorage data as user-controlled. The Vite `base` is `./` for portable static output (local preview, arbitrary static hosts, and GitHub Pages project sites without a fixed repo name).
