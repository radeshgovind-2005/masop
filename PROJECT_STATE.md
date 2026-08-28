# Project State

## Current phase

Phase 1 — repo scaffolding + CI/CD gates (branch protection, SAST checks, AI reviewer, Dependabot) before any app code.

## Last session

2026-08-28 — Scaffolded the npm workspace monorepo (`apps/web` via Vite React+TS, `packages/shared` empty), added Prettier + Husky/lint-staged, wired Vitest into `apps/web`, and added all Phase 1 GitHub Actions workflows (`ci.yml`, `codeql.yml`, `semgrep.yml`, `gitleaks.yml`, `deploy.yml`, `claude-review.yml`) plus `dependabot.yml`. Verified locally: lint, typecheck, test, and build all pass; confirmed the dev server actually renders in a browser. Added README run instructions, fixed the README's stale "masio" naming to MASOP, and created four project-specific subagents in `.claude/agents/` (`data-modeler`, `security-reviewer`, `ports-adapters-guardian`, `quality-reviewer`), wired into CLAUDE.md's new "Specialist agents" section. Committed as three split commits (workspace scaffolding, CI/CD workflows, docs/subagents) directly to `main` and pushed to `origin/main` (`radeshgovind-2005/masop`).

2026-08-28 (later) — Created the `protect-main` branch ruleset (active): PR required with 0 approvals (solo repo), linear history, no force-push/deletion, required status checks (`ci`, `gitleaks`, `semgrep`, `analyze (javascript-typescript)`) with strict up-to-date policy. Enabled repo-wide auto-merge and delete-branch-on-merge. While clearing the resulting Dependabot PR backlog, found and fixed two real CI issues (see "Known CI gotchas" below): unpinned Actions tags failing Semgrep's supply-chain rule, and a `codeql-action` init/analyze version mismatch. Ended with 0 open PRs and a clean `main`.

## Next steps

- Run `claude setup-token` locally → add as `CLAUDE_CODE_OAUTH_TOKEN` repo secret
- Create Cloudflare API token + get account ID → add as `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets
- Confirm `radesh-govind.com` is an active Cloudflare zone, then uncomment the custom domain route in `apps/web/wrangler.jsonc`
- Once CI/deploy prove green end-to-end: start the ports & adapters frontend work (fake adapters first)

## Known CI gotchas (read before touching workflows or merging Dependabot PRs)

- **GitHub Actions must stay pinned to a full commit SHA** (`uses: owner/repo@<40-char-sha> # vX`), never a mutable tag like `@v4`. Semgrep's `github-actions-mutable-action-tag` rule (part of `p/default`, run by `semgrep.yml`) blocks on any unpinned `uses:` line — this isn't a false positive, it's a real supply-chain-pinning check. If a future PR reintroduces an unpinned tag, that's why CI fails; re-pin it, don't suppress the rule.
- **`github/codeql-action/init`, `.../analyze`, and `.../upload-sarif` must all be the same major version** or CodeQL errors at runtime ("Loaded a configuration file for version X, but running version Y"). Dependabot treats each of these `uses:` paths as an independent package and will happily propose bumping just one of them — do not merge a solo `init`- or `analyze`-only version bump; bump them together by hand instead.
- **The ruleset's required status checks use `strict_required_status_checks_policy: true`**, meaning an open PR's green checks go stale the moment another PR merges to `main` — the merge button then fails with `"N of N required status checks are expected"` even though the PR page shows all-green. Fix: `gh api -X PUT repos/<owner>/<repo>/pulls/<n>/update-branch`, then re-merge (or use `gh pr merge --auto` beforehand so it retries on its own).

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
