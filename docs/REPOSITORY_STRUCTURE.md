# Repository Structure

The repository is organized into three clear concerns:

- `frontend/` → client application
- `backend/` → API service
- `docs/` → project documentation

## Why other files are at root
Some files remain at repository root intentionally:

- `package.json` → workspace-level convenience scripts for frontend/backend.
- `README.md` → project entry point for contributors.
- `.gitignore` → repository-level git ignore rules.

These are orchestration/metadata files, not app code.
