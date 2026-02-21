# Backend Folder Guide

This folder contains only the API/persistence service.

## Location
- API root: `backend/`

## Tech stack
- Node.js
- Express

## Commands
From repository root:

```bash
npm run dev:backend
npm run start:backend
npm run test:backend
```

## Scope boundary
- API routes, validation, and storage logic must stay in `backend/`.
- Do not place frontend UI components/assets inside this folder.
