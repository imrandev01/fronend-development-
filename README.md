# TrustCareer Monorepo

This repository is separated by responsibility:

- `frontend/` → React + Vite application
- `backend/` → Express API
- `docs/` → architecture and implementation documentation

> Root files like `package.json`, `.gitignore`, and `README.md` are repository-level orchestration files.

## Run locally

### 1) Install dependencies

```bash
npm --prefix frontend install
npm --prefix backend install
```

### 2) Start backend

```bash
npm run dev:backend
```

### 3) Start frontend

```bash
npm run dev:frontend
```

## Root scripts

```bash
npm run dev:frontend
npm run build:frontend
npm run lint:frontend
npm run preview:frontend
npm run dev:backend
npm run start:backend
npm run test:backend
```

## API endpoints

- `GET /api/health`
- `GET /api/company-verifications`
- `POST /api/company-verifications`

## Additional docs

- `docs/REPOSITORY_STRUCTURE.md`
- `docs/ARCHITECTURE/ARCHITECTURE.md`
- `docs/IMPLEMENTATION_SUMMARY.md`
- `docs/frontend/README.md`
- `docs/backend/README.md`
