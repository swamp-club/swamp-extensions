# Verification Conventions

## Build Verification (Host Workflow)

Build checks run as a swamp workflow on the host — native filesystem speed,
same Deno that's already installed. Isolation comes from a fresh `git worktree`
at the verified commit in `/tmp/swamp-verify-build-<run-id>`. Each workflow run
gets its own unique directory (keyed by run ID, not commit SHA) so multiple
verifications can run in parallel without colliding.

```
SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-build \
  --input commit=<SHA> \
  --input branch=<branch>
```

The workflow creates the worktree in a `setup` job, runs all build steps with
`workingDir` pointing at it, and removes the worktree in a `cleanup` job that
fires regardless of pass/fail.

### What verify-build checks

1. **Per-directory quality gate** — for each changed extension directory:
   check, lint, fmt, test, and `deno install --frozen`. Only changed
   directories are checked.
2. **Model directory checks** — changed model directories get check, lint
   (`--no-config`), fmt (`--no-config --check`), and lockfile verification.
3. **Codegen idempotency** — when `codegen/` changed: run codegen quality gate,
   then generate Hetzner + DigitalOcean twice. The second run must produce zero
   new diffs.
4. **Model version/upgrade gate** — when a model's `version` field changes:
   - Static check: assert a matching `upgrades` array entry with `toVersion`
     equal to the new version exists in the model file.
   - Dynamic check: run the 7-step upgrade path verification from
     `implementation-conventions.md` — init a scratch repo, pull the published
     extension, create an instance, swap to the local source, run a method
     (upgrade validation fires before the method body), confirm `typeVersion`
     stepped to the new version.
   - Skips brand-new extensions and vault/datastore extensions.

## Agent Reviews (Host Workflow)

Reviews run as a swamp workflow on the host (not in a container) so the claude
CLI has full project context — CLAUDE.md, skills, and the codebase. Like the
build workflow, reviews run in a fresh `git worktree` at the verified commit
(`/tmp/swamp-verify-reviews-<run-id>`) so that `claude -p`'s Read/Glob/Grep
tools see the committed file state, not the caller's working tree.

```
SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-reviews \
  --input commit=<SHA> \
  --input branch=<branch>
```

### Reviews

| Review | Guard | Model |
| --- | --- | --- |
| code-review | always (any source change) | claude-opus-4-6 |
| adversarial-review | always (any source change) | claude-opus-4-6 |
| ci-security-review | `.forgejo/`, `.github/`, `scripts/`, `verification/` | claude-opus-4-6 |

### Authentication

The claude CLI authenticates via one of two methods:

1. **`~/.config/swamp/verify.env`** — if this file exists with
   `ANTHROPIC_API_KEY=sk-ant-...`, export it before running the workflow.
2. **claude.ai login** — if no env file exists, the CLI uses your existing
   claude.ai login. No additional setup needed.

## Running Both in Parallel

The agent launches the build and review workflows simultaneously. Both must
pass for verification to succeed.

```bash
SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-build \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)

SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-reviews \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)
```

After each workflow completes, present the commands to the user so they can
inspect the results:

```
# Find the run IDs for this commit
SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
  --workflow verify-build --input commit=<SHA> --json
SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
  --workflow verify-reviews --input commit=<SHA> --json

# Get detailed step data
SWAMP_WORKFLOWS_DIR=verification swamp workflow history get <build-run-id> --json
SWAMP_WORKFLOWS_DIR=verification swamp workflow history get <reviews-run-id> --json

# Read step output
SWAMP_WORKFLOWS_DIR=verification swamp data get \
  --workflow verify-reviews --run <reviews-run-id> log --json
```

## Verification Checklist

After both workflows complete, the agent constructs a **combined verification
checklist** from the two workflow run outputs and presents it to the user. This
is the single view of everything that ran.

```
Verification Checklist (commit <short-sha>)
─────────────────────────────────────────────────────────────
✓ Extension Checks
  ✓ vault/aws-sm       check/lint/fmt/test/lock    4.2s
  ✓ datastore/s3       check/lint/fmt/test/lock    6.1s

○ Model Checks
  ○ model/aws/ec2      (no model changes)

✓ Codegen Verify
  ✓ codegen-check      check/lint/fmt/lock         2.1s
  ✓ idempotency        hetzner+digitalocean ×2     8.7s

✓ Upgrade Gate
  ✓ static-check       upgrade entries present     0.1s
  ✓ upgrade-path       typeVersion stepped         3.2s

✓ Code Review
  ✓ review             review-code                87.0s   VERDICT: pass

✓ Adversarial Review
  ✓ review             review-adversarial         92.0s   VERDICT: pass

○ CI Security Review
  ○ review             review-ci-security           —     skipped (no CI changes)

Gate: 9/9 passed, 2 skipped (guard)
Total: 2m 03s
```

To construct this checklist:

1. Find the run IDs for this commit:
   ```
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
     --workflow verify-build --input commit=<SHA> --json
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
     --workflow verify-reviews --input commit=<SHA> --json
   ```

2. Get detailed step data for each run:
   ```
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history get <build-run-id> --json
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history get <reviews-run-id> --json
   ```

3. For each step, extract: job name, step name, model name, duration, and
   status (succeeded/failed/skipped). For review steps that ran, include the
   VERDICT from the review log.

4. Determine the overall result. **Only proceed when all non-skipped steps
   have succeeded.** If any step failed, fix the issues and re-verify.

5. Present the checklist to the user and **wait for confirmation before
   opening a PR.** Do NOT post attestation or open a PR until the user
   explicitly says to proceed.

## Handling Failures

When verification fails, present the failed checklist to the user with a clear
summary of what failed and what the agent will do to fix it.

### 1. Present failures to the user

Show the verification checklist with the failures highlighted, then tell the
user what went wrong and what you're going to do:

- **Test failures**: "N tests failed. I'll read the error output, fix the
  failing tests, and re-run verification."
- **Lint/fmt/type errors**: "Build checks failed (lint/fmt/type). I'll fix
  the issues and re-run."
- **Review blocking findings**: "The code review found N blocking issues.
  I'll address each finding and re-run verification."
- **Upgrade gate failure**: "Version bumped to X but no upgrade entry found /
  upgrade path did not step to the new version. I'll add the missing upgrade
  entry and re-run."
- **Codegen idempotency failure**: "Second codegen run produced new diffs —
  the template is non-deterministic. I'll fix the template and re-run."

### 2. Read the failure details

Use `swamp data` with `--workflow` and `--run` flags to read step output:

```bash
SWAMP_WORKFLOWS_DIR=verification swamp data list \
  --workflow verify-build --run <run-id> --json

SWAMP_WORKFLOWS_DIR=verification swamp data get \
  --workflow verify-build --run <run-id> log --json
```

### 3. Fix the issues

- **Lint errors**: run `deno lint` locally, fix the flagged issues
- **Format errors**: run `deno fmt` to auto-fix
- **Type errors**: run `deno check` locally, fix the type issues
- **Test failures**: read the test names and errors from stderr, fix the
  failing tests, run `deno test <file>` to verify locally
- **Review blocking findings**: read each finding, fix the code issue,
  explain to the user what was changed and why
- **Upgrade entry missing**: add the upgrade entry to the model file with
  `toVersion` matching the new version
- **Codegen non-determinism**: fix the template ordering or timestamp issue

### 4. Re-run verification

Commit the fixes, then re-run BOTH verification workflows:

```bash
SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-build \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)

SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-reviews \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)
```

### 5. Repeat until green

Repeat steps 1–4 until all build steps pass and all reviews return
`VERDICT: pass`. Present the full verification checklist to the user after
each run.

Do NOT open a PR until the user has seen a fully green checklist and confirmed
they want to proceed.

## Review Prompts

Agent review prompts live at `verification/review-prompts/`. Each prompt is
read by the workflow step and combined with the diff. The prompts are the single
source of truth for review criteria — both the verification workflow and CI
reference them.
