# Project: MASOP

Multi-Agent Security Orchestrator Platform — a platform where multiple AI agents run security scans (SAST, secrets, deps, etc.) and surface findings through a web UI.

## Context

- **Type**: Production from day one (stricter review/testing gates, not throwaway)
- **Stack**: TypeScript everywhere. Frontend: Vite + React + TS. Backend (later phase): Cloudflare Workers + Hono, Durable Objects (per-scan orchestration), Queues (scanner dispatch), D1, R2. Auth: Clerk. Domain: masop.radesh-govind.com. Agent memory: Graphiti (temporal knowledge graph) planned as an external service, not buildable inside a Workers isolate.
- **Phase**: Phase 1 — repo scaffolding + CI/CD gates. See PROJECT_STATE.md for current step.

## How to work with me

- Micro-steps: one atomic change at a time, verify it works, then move on.
- Monorepo via npm workspaces: `apps/web`, `apps/worker` (later), `packages/shared`.
- Git: trunk-based, short-lived feature branches, PRs required, squash-merge, Conventional Commits.
  - **One branch per unit of work.** Before starting any new change, `git checkout main && git pull` then branch off `main` with a fresh name — never keep committing to a branch that already has a merged PR.
  - **Delete branches after merge.** Merge PRs with `gh pr merge --auto --squash --delete-branch` (or delete manually post-merge) so no merged branch is left around to accidentally reuse.
  - If asked to make another change after a PR merged, always create a new branch first — do not push follow-up commits onto the old (now-merged) branch.
- **Deploys always go through git**: push branch → PR → merge to `main` → `deploy.yml` (GitHub Actions) runs the actual deploy. Never run `wrangler deploy` / `npm run deploy` directly from the terminal.
- Testing: TDD where practical for ports/adapters, orchestration logic, and API routes. Lighter touch on pure UI.
- **Frontend-first, ports & adapters**: build the entire UI against port interfaces (e.g. `AuthPort`, `ScanPort`, `FindingsPort`) backed by fake/in-memory adapters. Iterate screen-by-screen with the user before any real backend exists. Do not wire a real adapter until the user explicitly starts the "swap adapters" phase.

## Architecture

- `apps/web` — Vite + React + TS SPA. Ports defined in `packages/shared` (or `apps/web/src/ports` until extraction is warranted). Fake adapters live alongside real ones behind the same interface.
- `apps/worker` (future) — Cloudflare Worker (Hono), serves the SPA via Workers Static Assets and the API. Durable Objects hold per-scan orchestration state; Queues dispatch individual scanner jobs; D1 for relational data; R2 for scan artifacts.
- Graphiti (future) — external service (Python + Neo4j/FalkorDB), called over HTTP from the Worker. Leave a `MemoryPort` in the ports layer so it can be swapped in without touching UI code.
- Auth: Clerk React SDK client-side now; Worker-side JWT verification added when the real backend lands.

## Relevant skills

- `project-structure` — when laying out the monorepo/workspaces
- `tdd` / `testing` — for ports, adapters, and later API/orchestration logic
- `version-control` — trunk-based + Conventional Commits workflow
- `deploy` — CI/CD to Cloudflare, custom domain setup
- `integrations` — Clerk wiring when auth phase starts
- `security-review` / `code-review` — required gates before merge
- `setup-pre-commit` — lint/typecheck/test hooks

## Specialist agents

Project-specific subagents live in `.claude/agents/` — invoke them proactively, don't wait to be asked:

- `data-modeler` — any change to a port interface, shared type, or (later) D1 schema
- `security-reviewer` — before merging anything touching auth, secrets, API routes, or workflow files
- `ports-adapters-guardian` — reviewing frontend work during the frontend-first phase, to catch real-adapter wiring or incomplete fake adapters
- `quality-reviewer` — a pass for AI-slop (unneeded comments/abstractions/defensive code) before calling a feature done

Add new specialists here as later phases (Cloudflare deploy, Clerk integration, orchestration) introduce enough live code to warrant one — don't scaffold an agent for a phase that hasn't started.

## Out of scope (for now)

- Real Cloudflare Workers backend, Durable Object orchestration, actual scanner agents
- Graphiti implementation (architecturally accounted for via `MemoryPort`, not built)
- D1 / R2 / Queues wiring

## Session protocol

- At the start of each session, read `PROJECT_STATE.md` for current context.
- Work in micro-steps: one atomic change at a time, verify it works, then move on.
- Before ending a session, update `PROJECT_STATE.md` with what was done and what's next.
