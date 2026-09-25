# Verification Flow

Read this after code conformance review is complete and all deviations are
justified. Pull-request CI does not build or review code — the verification loop
runs every check as host workflows **before** the PR opens, and CI only
validates the attestation it produces.

Read `agent-constraints/verification-conventions.md` for what each workflow
checks, the review guards, the checklist format, and failure handling.

## 1. Start Verification

Commit your work first — verification runs against a commit, not the working
tree. Then transition the lifecycle to the `verifying` phase:

```
swamp model @swamp/issue-lifecycle method run verify issue-<N> \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)
```

`verify` requires a code conformance review to exist.

## 2. Run Verification

Launch both workflows in parallel:

```
SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-build \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)

SWAMP_WORKFLOWS_DIR=verification swamp workflow run verify-reviews \
  --input commit=$(git rev-parse HEAD) \
  --input branch=$(git branch --show-current)
```

Both run on the host in their own `git worktree` at the commit. Reviews need
`~/.config/swamp/verify.env` with `ANTHROPIC_API_KEY`, or a claude.ai login.

From a git worktree, add `--repo-dir <main-checkout>` and make
`SWAMP_WORKFLOWS_DIR` an absolute path to this worktree's `verification/`.

## 3. Build the Checklist

Find both run IDs and read their steps:

```
SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
  --workflow verify-build --input commit=<SHA> --json
SWAMP_WORKFLOWS_DIR=verification swamp workflow history search \
  --workflow verify-reviews --input commit=<SHA> --json
SWAMP_WORKFLOWS_DIR=verification swamp workflow history get <run-id> --json
```

## 4. Handle the Result

### All steps passed

**Only proceed when every non-skipped step succeeded.** A partial pass is NOT a
pass — go to "Any step failed" below.

1. **Generate the attestation** from the two runs. Never write one by hand and
   never reuse or edit a previous one:

   ```
   deno task build-attestation \
     --run <build-run-id> --run <reviews-run-id> \
     --commit <SHA> --branch <branch> > /tmp/attestation-<SHA>.json
   ```

   If it refuses (runs of another commit, a workflow that does not match the
   commit), fix the cause and re-run verification — do not work around it.

2. Confirm `gate.allPassed` is `true` in the generated file, then record the
   result:

   ```
   swamp model @swamp/issue-lifecycle method run verification_passed issue-<N> \
     --input workflowRunId=<build-run-id> \
     --input commit=<SHA> \
     --input branch=<branch> \
     --input steps='[{"job":"checks","step":"extensions","model":"build-extensions-<run-id>","status":"succeeded"}, ...]'
   ```

   Populate `steps` from the attestation's `steps` array — every step from both
   workflows, with its actual status.

3. **Present the full verification checklist to the user and wait for their
   confirmation.** Show every step from both workflows — status, duration, and
   for reviews the verdict — and the run record paths so the user can inspect
   the raw data.

   **Stop here and wait.** Do NOT post the attestation or open a PR until the
   user has seen the checklist and explicitly said they are ready.

4. **After the user confirms**, post the attestation:

   ```
   swamp model @swamp/issue-lifecycle method run post_attestation issue-<N> \
     --input attestation="$(cat /tmp/attestation-<SHA>.json)"
   ```

   `post_attestation` validates the document against `AttestationSchema` and
   throws on failure. **Do NOT proceed until it succeeds** — CI's
   `validate-attestation` fails when no attestation exists for the commit.

   **NEVER amend, rebase, or modify the commit after posting.** The attestation
   is bound to the SHA; a changed commit needs a new verification and a new
   attestation.

5. **Only after `post_attestation` succeeds**, open the PR — read the "Create a
   PR" section in [implementation.md](implementation.md).

### Any step failed

Call `verification_failed`:

```
swamp model @swamp/issue-lifecycle method run verification_failed issue-<N> \
  --input workflowRunId=<run-id> \
  --input commit=<SHA> \
  --input branch=<branch> \
  --input failureReason="<summary of failures>"
```

This transitions back to `implementing`. Present the failures to the user, fix
them (see "Handling Failures" in
`agent-constraints/verification-conventions.md`), commit, and return to step 1.
Repeat until all steps pass.

## 5. Do NOT Open a PR Without Verification and Attestation

**Two hard gates before a PR opens:**

1. **Verification passes** — `gate.allPassed` is true, recorded with
   `verification_passed` (`link_pr` refuses without it).
2. **Attestation posted** — `post_attestation` succeeded for this exact commit.

The loop is: implement → conformance review → verify → fix → re-verify → build
attestation → present checklist → user confirms → post attestation → PR →
link_pr.
