# Personal Notes

Minimal note app built with Angular 21, NgRx, PrimeNG, and Tailwind CSS. Notes are saved locally.

## Prerequisites

- Node.js 20+
- pnpm 10+

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the app

```bash
pnpm start
```

Open `http://localhost:4200`.

## Deployment

Build with `pnpm build` and deploy the output from `dist/personal-note-taking`.

## Available Scripts

- `pnpm start` – run the dev server
- `pnpm build` – build the production app
- `pnpm watch` – rebuild on file changes
- `pnpm test` – run unit tests
- `pnpm e2e` – run Playwright e2e tests
- `pnpm serve:ssr:personal-note-taking` – serve the SSR build output

## Testing

Run unit tests or end-to-end tests:

```bash
pnpm test
pnpm e2e
```

## Application Features

- 🗒️ **Note CRUD** create, edit, delete, and select notes
- 🔎 **Search** filter notes by title or content
- 💾 **Persistence** store notes in local storage
- ⏱️ **Timestamps** human-friendly "last edited" labels

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Contact & Support

Please open a GitHub Issue for bugs or questions.
