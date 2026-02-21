# TrustCareer Monorepo

This project is split into two folders in the same repository:

- `frontend/` → React + Vite application
- `backend/` → Express API for company verification

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
