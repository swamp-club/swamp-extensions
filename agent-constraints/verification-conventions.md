# Verification Conventions

Pull-request CI in this repository does not build, test, or review code. Every
check runs locally, before the PR opens, as two swamp workflows in
`verification/`. The result is posted to swamp-club as an **attestation** bound
to the commit, and CI validates that attestation. A PR without a passing
attestation for its head commit cannot merge.

## Build Verification (Host Workflow)

Build checks run as a swamp workflow on the host — native filesystem speed, same
Deno that's already installed. Isolation comes from a fresh `git worktree` at
the verified commit in `/tmp/swamp-verify-build-<run-id>`. Each run gets its own
directory (keyed by run ID, not commit SHA) so verifications can run in parallel
without colliding. A `cleanup` job removes the worktree whether the run passed
or failed.

### What verify-build checks

1. **Per-directory checks** (`checks` job) — `verification/checks.yaml` is the
   one table of what each directory must pass; `scripts/run_checks.ts` runs it.
   Only directories the change touches are checked, one step per group:

   | Group        | Directories                                            | Checks                                                            |
   | ------------ | ------------------------------------------------------ | ----------------------------------------------------------------- |
   | `extensions` | every hand-written extension (`ssh/`, `cve/*`, ...)    | check, lint, fmt, test, `deno install --frozen`                   |
   | `vaults`     | `vault/*`                                              | same                                                              |
   | `datastores` | `datastore/*`                                          | same                                                              |
   | `models`     | changed `model/**` directories                         | check, lockfile (`--no-config` lint/fmt for hetzner/digitalocean) |
   | `codegen`    | `codegen/`                                             | check, lint, fmt, lockfile                                        |
   | `harness`    | root `extensions/models/` and the verification scripts | check, lint, fmt, test, lockfile                                  |

   Check targets and test permissions differ per extension on purpose. When
   `model/` or `codegen/` changes, the models group also type-checks a sample of
   AWS, GCP, Cloudflare and Vercel services plus both single-directory
   providers; the nightly `full-model-check.yml` covers the rest.

   **Adding an extension means adding a target to `verification/checks.yaml`.**
   `scripts/verification_harness_test.ts` fails when an extension manifest has
   no target.

2. **Audits** (`audit` job) — `scripts/audit_deps.ts` (OSV.dev vulnerability
   scan of every lockfile, not just changed ones — a new CVE can land in a
   dependency nobody touched; each distinct package version is queried once) and
   `scripts/audit_actions.ts` (unpinned or outdated Actions).
3. **Codegen idempotency** — when `codegen/` changed: generate Hetzner +
   DigitalOcean twice. The second run must produce zero new diffs.
4. **Model upgrade gate** (`scripts/check_upgrades.ts`) — for every model whose
   own `version` the change bumps, generated or hand-written. The gate reads the
   model files, not `manifest.yaml`: instances pin the model's `version`.
   - Static check: the last `upgrades` entry's `toVersion` equals the new
     version, and the new version is newer.
   - Dynamic check: the upgrade path from `implementation-conventions.md` — an
     instance of the published extension, swapped for the local source, must
     step `typeVersion` to the new version. Once per extension; skipped for
     extensions not yet published.

   Both steps list every model they examined, so a run that found nothing to
   check says so. Run it locally with
   `deno run --allow-read --allow-write --allow-env --allow-run scripts/check_upgrades.ts --base origin/main --path-test`.

Run any group directly while iterating:

```bash
deno task check --group extensions --base origin/main
deno task check --group vaults --all
```

## Agent Reviews (Host Workflow)

Reviews run on the host so the claude CLI has full project context — CLAUDE.md,
skills, and the codebase — in a fresh `git worktree` at the verified commit
(`/tmp/swamp-verify-reviews-<run-id>`), so `claude -p`'s Read/Glob/Grep see the
committed file state, not the caller's working tree.

Each reviewer gets the merge-base diff as a file and must begin its answer with
`VERDICT: pass` or `VERDICT: fail`. `scripts/check_review_verdict.ts` decides
the step: it passes only when the review's opening line is exactly
`VERDICT: pass` (markdown emphasis allowed). A marker further down is quoted,
never the verdict. A missing marker, empty output, or provider error (rate
limit, auth, credit) fails the step — a review that did not answer is exactly
when a human should look.

| Review             | Runs when these paths change                                               | Model           |
| ------------------ | -------------------------------------------------------------------------- | --------------- |
| code-review        | always                                                                     | claude-opus-5-5 |
| adversarial-review | any extension, `model/`, `codegen/`, `vault/`, `datastore/`, `extensions/` | claude-opus-5-5 |
| ci-security-review | `.forgejo/`, `.github/`, `scripts/`, `verification/`                       | claude-opus-5-5 |

Change detection is a plain `command/shell` step (`review-detect-<run-id>`) that
runs `git diff --name-only origin/main...HEAD` in the verified worktree — the
same merge-base diff the reviewers read — and prints a `REVIEW_<KIND>: true`
marker for each guarded review whose paths changed. A guard skips its step when
it evaluates **true**, so each guard is written as "the marker is absent". The
diff must run in the worktree, never the caller's checkout: there it comes back
empty and every guarded review silently skips. No step uses a registry
extension, whose type would be resolved from the host checkout's extension
state. When adding a guard, confirm on a real run that it fires.

### Authentication

The claude CLI authenticates via one of two methods:

1. **`~/.config/swamp/verify.env`** — if this file exists with
   `ANTHROPIC_API_KEY=sk-ant-...`, load it before running the workflow:
   `set -a; . ~/.config/swamp/verify.env; set +a`.
2. **claude.ai login** — if no env file exists, the CLI uses your existing
   claude.ai login.

## Running Verification

Always pass the commit as a SHA (`$(git rev-parse HEAD)`), never `HEAD` or a
branch name: a symbolic ref names a different commit later, so
`build-attestation` refuses runs launched with one.

The agent launches both workflows simultaneously. Both must pass.

```bash
SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-build \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)

SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-reviews \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)
```

**From a git worktree**, swamp commands need `--repo-dir` pointing at the main
checkout, and `SWAMP_WORKFLOWS_DIR` must then be an **absolute** path to the
worktree's `verification/` — a relative path resolves against `--repo-dir`, so
the runs would execute the main checkout's workflows, and `build-attestation`
refuses runs whose executed workflow does not match the committed one.

## Verification Checklist

After both workflows complete, build a **combined checklist** and present it to
the user:

1. Find the run IDs for this commit:
   ```
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
     --workflow verify-build --input commit=<SHA> --json
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
     --workflow verify-reviews --input commit=<SHA> --json
   ```
2. Get each run's step data (status, duration, skip reason):
   ```
   SWAMP_WORKFLOWS_DIR=verification swamp workflow history get <run-id> --json
   ```
3. Present every step, grouped by job, with its status and duration, and each
   review's verdict. Include the run record paths
   (`.swamp/workflow-runs/<workflow-id>/workflow-run-<run-id>.yaml`) so the user
   can inspect the raw data.

```
Verification Checklist (commit <short-sha>)
─────────────────────────────────────────────────────────────
✓ Checks
  ✓ extensions         ssh check/lint/fmt/test/lock      14.2s
  ✓ vaults             nothing to check                   0.3s
  ✓ harness            check/lint/fmt/test/lock          21.0s
✓ Audit
  ✓ deps-audit                                            6.1s
  ✓ actions-audit                                         3.4s
○ Codegen Verify
  ○ idempotency        skipped (guard: no codegen change)
✓ Reviews
  ✓ code-review        claude-opus-5-5   87.0s   VERDICT: pass
  ✓ adversarial-review claude-opus-5-5   92.0s   VERDICT: pass
  ○ ci-security-review skipped (guard: no CI changes)

Gate: 12/12 passed, 2 skipped
```

**Only proceed when every non-skipped step succeeded.** A partial pass is not a
pass.

## Attestation

What the attestation covers — which workflows, which job holds the reviews,
which files are pinned — is `verification/attestation.yaml`; the scripts carry
no repository-specific knowledge. The attestation is **generated, never written
by hand**, and never reused or edited — swapping the commit or run IDs in an old
attestation is a trust chain violation.

1. Generate it from the two runs:
   ```bash
   deno task build-attestation \
     --run <build-run-id> --run <reviews-run-id> \
     --commit <SHA> --branch <branch> > /tmp/attestation-<SHA>.json
   ```
   The generator refuses runs of another commit, runs that did not execute the
   committed workflow, and output that does not match `AttestationSchema`. It
   pins the SHA-256 of every harness file (`pinned` in
   `verification/attestation.yaml`, plus the workflows and that file itself) as
   it stands at the commit.
2. Only if its `gate.allPassed` is true, record the result with
   `verification_passed` (otherwise `verification_failed`).
3. Present the checklist and **wait for the user to confirm** before posting.
4. After confirmation, post it:
   ```bash
   swamp model @swamp/issue-lifecycle method run post_attestation issue-<N> \
     --input attestation="$(cat /tmp/attestation-<SHA>.json)"
   ```
   If the post fails, do not open a PR.
5. Open the PR, then `link_pr`. **Never amend, rebase, or otherwise change the
   commit after posting** — the attestation is bound to the SHA. A changed
   commit needs a fresh verification and a new attestation.

## What CI Checks

`.forgejo/workflows/ci.yml` has two jobs, and nothing else gates a PR. Both run
on `pull_request`, as swamp's CI does, so the workflow file is the PR's own. The
scripts it runs — the validator, the review prompt, the verdict rule — come from
the **base** commit, so a PR that edits one of them without editing `ci.yml`
cannot make it judge itself. The PR head is checked out at exactly the event's
commit and only read as data.

- **validate-attestation** — fetches the attestation for the PR head from
  swamp-club and fails on a missing attestation, a schema mismatch, a commit
  mismatch, a failed gate, a workflow with no run in the attestation, or any
  pinned file that differs from the head, is missing from the attestation, or is
  missing (or not a regular file) at the head. Which workflows and files count
  comes from the base's `verification/attestation.yaml`, and files are hashed
  from the head commit's git blobs, not the checkout. So removing a pinned file
  or a verification workflow cannot pass on its own attestation. An attestation
  older than 24h is a warning. Runs for every non-draft PR — there is no
  branch-name exemption, so automated PRs (model regeneration) need verification
  like any other.
- **review-integrity** — when a trust-root file changes (`scripts/`,
  `verification/`, `agent-constraints/`, `.claude/`, `extensions/models/`,
  CLAUDE.md, AGENTS.md, `.forgejo/`, `deno.json`/`deno.lock`, any
  `.gitattributes`), an Opus 5.5 agent audits the change for prompt injection,
  hidden content, and weakened checks. The agent has no tools: the change (file
  list, commit messages, diff, and the changed files at head) reaches it as text
  inside the prompt, between random boundary markers, and it runs from an empty
  directory. It cannot read the filesystem, load instructions planted in the
  change (a `CLAUDE.md` in a staged directory), or quote anything from the
  runner into its public comment; its output is also scrubbed of the key before
  it is posted. A change too large for one prompt fails the job for human
  review. Its verdict goes through the base's `check_review_verdict.ts`. Fork
  PRs get no secrets, so the audit cannot run for one: a fork that changes
  trust-root files fails this job until a maintainer pushes the branch to this
  repository.

Each job posts its result as its own PR comment, because Forgejo does not
render step summaries: the attestation check (commit, gate, freshness, each
pinned file, the steps table, or the reason it failed), and the integrity
review when it ran (or why it did not complete). The comments are posted by
`scripts/post_pr_comment.ts`. Each starts with a hidden marker naming its job
and the commit it judged. A later push updates the same comment instead of
adding one. Nothing is posted for a run that a newer push superseded, or for a
fork, which has no token; a fork's result stays in the job log. The integrity
review is also printed, redacted, in its job's log. The comments only report:
failing to post one is a warning, and neither verdict depends on it. Text from
the attestation is escaped before it reaches the comment, because the PR
author controls it. The poster and the validator run from the base commit, so
a change to either reaches PRs opened after it merges.

Because the workflow is the PR's own, a PR can change what CI does to it.
Changes under `.forgejo/` are trust-root changes: review-integrity audits them,
and the reviewer of the PR should read them with that in mind.

## Handling Failures

When verification fails, present the failed checklist with a clear summary of
what failed and what you will do about it, then call `verification_failed`.

Read failing step output by finding the step's `log` entry, then reading it from
the data store. The cleanup job deletes each run's model definitions, so
`swamp data get <model> log` no longer resolves the per-run model name, and
`swamp data get --workflow … --run … log` returns only the first log of the run:

```bash
# Find the entry whose stepName is the failing step; note its modelId
SWAMP_WORKFLOWS_DIR=verification swamp data list \
  --workflow verify-build --run <run-id> --json

# Read that step's log (paths are relative to the repo swamp runs against)
cat .swamp/data/command/shell/<modelId>/log/1/raw
```

Each check prints a `CHECK: <dir> <check> passed|failed` summary line.

- **Lint / fmt / type errors**: fix locally (`deno lint`, `deno fmt`,
  `deno check` in the extension directory), or re-run the one group with
  `deno task check --group <group> --base origin/main`.
- **Test failures**: read the failing test names and errors, fix, run
  `deno test <file>` locally.
- **Review blocking findings**: address each finding and explain the change to
  the user. A `missing` or `provider-error` verdict means the review did not run
  — fix auth or retry, do not treat it as a pass.
- **Upgrade gate failure**: add the missing `upgrades` entry.
- **Codegen idempotency failure**: fix the non-deterministic template.

Commit the fixes, then re-run **both** workflows on the new SHA. Repeat until
green, presenting the checklist after each run. Do NOT open a PR until the user
has seen a fully green checklist and confirmed.

## Review Prompts

Agent review prompts live at `verification/review-prompts/`. Each is combined
with a pointer to the diff file. A prompt must never tell the reviewer to run a
command — reviewers have only Read, Glob and Grep.
