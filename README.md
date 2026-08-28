# MASOP

Multi-Agent Security Orchestrator Platform — a platform where multiple AI agents run security scans (SAST, secrets, deps, etc.) and surface findings through a web UI.

Stack, architecture, and current phase are tracked in [`CLAUDE.md`](./CLAUDE.md) and [`PROJECT_STATE.md`](./PROJECT_STATE.md).

## Getting started

```bash
npm install
```

## Running & checking

All commands run from the repo root via npm workspaces:

```bash
npm run dev --workspace=@masop/web   # dev server at http://localhost:5173
npm run lint                         # oxlint
npm run typecheck                    # tsc -b --noEmit
npm run test                         # vitest
npm run build                        # production build
npm run format                       # prettier --write .
```
