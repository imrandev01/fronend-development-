# Repository Architecture

The repository is intentionally split into two top-level applications:

```text
.
├── frontend/                  # React + Vite web app
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                   # Express API for company verification
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── storage.js
│   ├── test/
│   ├── data/                  # local JSON persistence (ignored from git)
│   └── package.json
├── Docs/
│   └── ARCHITECTURE/
│       └── ARCHITECTURE.md
├── package.json               # root convenience scripts only
└── README.md
```

## Separation Rules

- UI code lives **only** in `frontend/`.
- API and persistence code lives **only** in `backend/`.
- Root-level scripts only orchestrate frontend/backend commands; app dependencies are scoped to each app.

## Root Commands

```bash
npm run dev:frontend
npm run build:frontend
npm run lint:frontend
npm run preview:frontend
npm run dev:backend
npm run start:backend
npm run test:backend
```
