# Project State

## Current phase

Phase 1 — repo scaffolding + CI/CD gates (branch protection, SAST checks, AI reviewer, Dependabot) before any app code.

## Last session

2026-08-28 — Scaffolded the npm workspace monorepo (`apps/web` via Vite React+TS, `packages/shared` empty), added Prettier + Husky/lint-staged, wired Vitest into `apps/web`, and added all Phase 1 GitHub Actions workflows (`ci.yml`, `codeql.yml`, `semgrep.yml`, `gitleaks.yml`, `deploy.yml`, `claude-review.yml`) plus `dependabot.yml`. Verified locally: lint, typecheck, test, and build all pass; confirmed the dev server actually renders in a browser. Added README run instructions, fixed the README's stale "masio" naming to MASOP, and created four project-specific subagents in `.claude/agents/` (`data-modeler`, `security-reviewer`, `ports-adapters-guardian`, `quality-reviewer`), wired into CLAUDE.md's new "Specialist agents" section. Committed as three split commits (workspace scaffolding, CI/CD workflows, docs/subagents) directly to `main` and pushed to `origin/main` (`radeshgovind-2005/masop`).

## Next steps

- Run `claude setup-token` locally → add as `CLAUDE_CODE_OAUTH_TOKEN` repo secret
- Create Cloudflare API token + get account ID → add as `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets
- Confirm `radesh-govind.com` is an active Cloudflare zone, then uncomment the custom domain route in `apps/web/wrangler.jsonc`
- Apply branch protection on `main` (required checks, admin/maintain-only merge, no direct pushes)
- Once CI/deploy prove green end-to-end: start the ports & adapters frontend work (fake adapters first)

## Decisions made

- Monorepo (npm workspaces), trunk-based git with Conventional Commits, squash-merge
- TDD where practical (ports/adapters, orchestration, API); lighter on UI
- Frontend built first, fully client-side, against ports & adapters with fake adapters — real backend adapters swapped in later, iterated screen-by-screen with the user
- Stack: Vite + React + TS frontend; Clerk auth; Cloudflare Workers + Hono, Durable Objects, Queues, D1, R2 for backend (later phase)
- Graphiti (temporal knowledge-graph memory) is in scope architecturally — a `MemoryPort` should exist — but not implemented yet (needs external Python + Neo4j/FalkorDB service, can't run in a Workers isolate)
- Repo is **public** — CodeQL, Semgrep, and gitleaks all used as free SAST/secret-scanning gates (no GHAS paywall concern)
- Cloudflare Workers free plan covers Phase 1 (Static Assets, basic Worker API, D1, R2). Durable Objects + Queues need the $5/mo Workers Paid plan — not needed until orchestration phase (later)
- AI reviewer (Claude Code Action) is **workflow_dispatch-only** (manual button in Actions tab, never auto-runs on PRs/comments) and gated by an explicit check that the triggering actor has `admin` or `maintain` permission on the repo
- Claude Code Action authenticates via a Pro-subscription OAuth token (`claude setup-token`), stored as a `CLAUDE_CODE_OAUTH_TOKEN` secret — not a metered API key

## Open questions

- Phase order after scaffolding: frontend-first via ports & adapters, then swap to real Cloudflare Workers backend, then orchestration (Durable Objects), then real scanner agents + Graphiti — exact milestone boundaries TBD as we go
- Cloudflare API token, account ID, and confirmation that `radesh-govind.com` is an active Cloudflare zone — needed before the deploy workflow can run
- `claude setup-token` needs to be run locally by the user to generate the OAuth token for the `CLAUDE_CODE_OAUTH_TOKEN` secret
