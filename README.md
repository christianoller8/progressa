# Progressa

Personal web platform for learning English, built as an Angular learning and portfolio
project. _Progressa_ is Latin — the feminine participle of _progredior_ (to advance): "the one
who has moved forward". It also works as an umbrella brand: `Progressa English` today, other
subjects later.

> **Status:** early stage. The environment and application skeleton are in place. Feature
> modules are being built layer by layer — see the roadmap below.

## Tech stack

- **Angular 22** — standalone components, zoneless change detection, signals
- **Angular Material** (Material 3) for UI
- **Signals + services** for state (no external state library)
- **Repository pattern** over local storage, so a real backend can be added later by swapping a
  single class
- **Transloco** for in-app language switching (Spanish / English) — planned
- **Vitest** for unit tests; **Playwright** for e2e tests — planned
- **ESLint** (angular-eslint, including template accessibility rules) and **Prettier**
- Free, key-less external APIs: Free Dictionary API, Datamuse, Web Speech API

The architecture deliberately keeps the generic engine (layout, routing, quiz engine,
persistence) decoupled from English-specific content, so the shell can be reused for future
learning platforms.

## Planned modules

| Module     | Purpose                                          |
| ---------- | ------------------------------------------------ |
| Vocabulary | Themed lists, cards, meaning and usage quizzes   |
| Grammar    | Theory lessons plus exercises                    |
| Reading    | Texts with comprehension questions               |
| Listening  | Browser-generated audio plus comprehension       |
| Speaking   | Browser speech recognition for pronunciation     |
| Writing    | Guided exercises with a rubric and model answer  |
| Progress   | Stats and evolution per skill                    |
| Settings   | Interface language, light/dark theme, data reset |

The reusable quiz engine is the technical core of the project.

## Getting started

Requires **Node `^22.22.3 || ^24.15.0 || >=26`** (Angular 22's range) and npm. The exact
version used in development and CI is pinned in `.node-version`.

```bash
npm install
```

Start the development server (defaults to `http://localhost:4200/`):

```bash
npm start
```

Build for production (artifacts in `dist/`):

```bash
npm run build
```

Run the unit tests (watch mode):

```bash
npm test
```

Lint and check formatting:

```bash
npm run lint
npm run format:check
```

## Contributing workflow

This project follows **GitHub Flow**: `main` is always deployable, work happens on descriptive
branches (`feature/...`, `fix/...`, `docs/...`), and changes are merged through pull requests.

Commit messages follow **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`,
`test:`, `chore:`).

Every pull request runs formatting, lint, build and unit tests in GitHub Actions
(`.github/workflows/ci.yml`).
