# Implementation Conventions

## Execution Order by Scope

The order of operations differs by scope because the reproduction and
verification mechanics differ.

### Vault / datastore / workflow / issue-lifecycle changes

1. Write or update the failing test first (TDD for the reproduction,
   covered in triage).
2. Implement the fix in the extension model (`extensions/<type>/*.ts`).
3. Confirm the previously failing test is now green:
   ```
   cd <scope-dir>
   deno test --allow-env --allow-net --allow-sys extensions/<type>/
   ```
4. Run the full local quality gate for the extension directory (below).
5. Update the extension's `README.md` if behavior visible to users
   changed.
6. Bump `manifest.yaml` if behavior changed (CalVer, e.g.
   `2026.04.23.3`). Pure refactors with no behavior change do not bump.

### Codegen changes

1. Implement the fix in the appropriate layer:
   - `codegen/shared/` for cross-provider helpers (zod emission,
     manifest generation, deno config, versioning, schema normalization).
   - `codegen/<provider>/pipeline.ts` for provider-level orchestration.
   - `codegen/<provider>/extensionModelGenerator.ts` for the model
     emission template.
   - `codegen/<provider>/libGenerator.ts` for provider shared-library
     emission.
2. Run filtered generation first to confirm the fix hits the target:
   ```
   cd codegen
   deno task fetch-schema:<provider>
   deno task generate:aws <service>      # e.g. ec2, ssm
   deno task generate:gcp <service>
   ```
   (Hetzner and DigitalOcean don't support filtering — they regenerate
   the full provider directory.)
3. `git diff model/<provider>/<service>/` — confirm the diff is exactly
   the intended change, nothing else.
4. Run unfiltered generation to surface collateral damage across the
   rest of the provider:
   ```
   deno task generate:<provider>
   ```
5. **Run unfiltered generation a second time. The second run must
   produce zero new diffs** (`git status` clean beyond the intended
   change). A second-run diff means non-determinism in the template —
   fix the template, don't commit. This is the idempotency canary.
6. Confirm CalVer bumped only the services whose content actually
   changed. Unexpected bumps mean `version.ts` is misreading content or
   the template touched more than intended.
7. Run the codegen quality gate and model matrix (below).
8. If the change affects design decisions documented in
   `codegen/designs/<provider>.md`, update the design doc.

### New-extension additions (vault, datastore, workflow, or codegen
provider)

The code change is often straightforward; wiring the new directory into
verification is where mistakes happen. Enumerate every update from the
checklist in `planning-conventions.md` and verify each as a separate
implementation step:

1. New extension directory with `deno.json`, `deno.lock`,
   `manifest.yaml`, `README.md`, `LICENSE.txt`, and
   `extensions/<type>/`.
2. A target in `verification/checks.yaml` — its check
   targets, lint/fmt paths, and `deno test` permissions. Pull-request CI
   builds nothing, so an extension without a target is never checked.
   `scripts/verification_harness_test.ts` fails until the target exists.
3. `publish.yml` — new push step.
4. `regenerate-models.yml` — only for new codegen providers.
5. Run `deno task check --group <group> --all` and confirm the new
   target actually runs.

## Local Quality Gate

Run these while iterating. verify-build runs the same commands, from the
table in `verification/checks.yaml` — a local failure means verification
fails and no PR can open. The gate is per-directory because each
extension has its own `deno.json` / `deno.lock`. To run exactly what
verify-build runs for your change:

```
deno task check --group <extensions|vaults|datastores|models|codegen|harness> --base origin/main
```

### Vault / datastore / workflow / issue-lifecycle directory

```
cd <scope-dir>        # e.g. vault/aws-sm, datastore/s3, issue-lifecycle
deno check extensions/<type>/*.ts
deno lint extensions/<type>/
deno fmt --check extensions/<type>/
deno test --allow-env --allow-net --allow-sys extensions/<type>/
deno install --frozen
```

`datastore/` and `issue-lifecycle/` may also need `--allow-read
--allow-write` on `deno test`; mirror the flags from the directory's
target in `verification/checks.yaml`.

### Model directory (`model/hetzner-cloud`, `model/digitalocean`,
`model/aws/<service>`, `model/gcp/<service>`)

Generated directories use `--no-config` for lint and format because they
use global defaults, not a local `deno.json` config:

```
cd model/<provider>/<service>          # or model/hetzner-cloud, etc.
deno check extensions/models/*.ts
deno lint --no-config extensions/models/
deno fmt --no-config --check extensions/models/
deno install --frozen
```

### Codegen directory

```
cd codegen
deno check main.ts
deno lint
deno fmt --check
deno install --frozen
```

## Verification

Report verification results to the human before creating the PR, using
the exact format the `issue-lifecycle` skill expects:

- **Vault/datastore/workflow/issue-lifecycle fix**: "Verified: the
  previously failing test `<test name>` in `<scope>/extensions/<type>/<file>_test.ts`
  is now green."
- **Codegen fix**: "Verified: filtered regeneration of `<provider>/<service>`
  now produces the intended diff; unfiltered regeneration shows no
  collateral damage; second unfiltered run produces zero new diff."
- **Registry-publish fix**: "Verified locally: the validation that would
  have caught issue #<N> is now in place in `codegen/<provider>/<file>`
  and rejects the known-bad shape."
- **Model version/upgrade change**: "Verified: instance at published
  version `<old>` upgrades to `<new>` via `swamp extension source add`.
  No version mismatch error on method run."
- **Verification failed**: "Verification failed: <what still breaks>" —
  do not open a PR.

## Upgrade Path Verification

**Required when a change touches a model's `version` field or `upgrades`
array.** Skip for brand-new extensions with no published version, and
for vault/datastore extensions (they don't participate in the model
upgrade system).

This applies to every model, generated or hand-written: the check reads the
model file's own `version`, not `manifest.yaml`. verify-build runs it for
every bumped model (`scripts/check_upgrades.ts`); run the same thing while
iterating with:

```bash
deno run --allow-read --allow-write --allow-env --allow-run \
  scripts/check_upgrades.ts --base origin/main --path-test
```

By hand, verify that an instance created at the currently published version
can upgrade to the new version by stepping through the upgrade chain:

```bash
# 1. Set up a scratch swamp repo
swamp init /tmp/upgrade-test --tool none --force

# 2. Pull the currently published extension
swamp extension pull @swamp/<extension>

# 3. Create a model instance — this pins typeVersion to the published version
swamp model create @swamp/<extension>/<type> upgrade-test

# 4. Remove the registry extension so the local source takes precedence
swamp extension rm @swamp/<extension> --force

# 5. Add the local working copy as an extension source
swamp extension source add <abs-path-to-extension-dir> --only models

# 6. Run any method — the upgrade system applies the migration chain
#    before method execution. If the upgrade entries are broken, this
#    fails with "Last upgrade toVersion does not match model version".
swamp model method run upgrade-test <method>

# 7. Confirm typeVersion stepped to the new version
swamp model get upgrade-test --json
```

The method in step 6 may fail for unrelated reasons (no cloud
credentials, no kubectl, etc.) — that's fine. The upgrade validation
runs before the method body. If step 6 does not produce a version
mismatch error, the upgrade entries are correct.

Issue #554 is the precedent: the branding commit bumped 20 model
versions without adding upgrade entries, and the gap wasn't caught
until users reported stuck models.

## Hard No List

Do not do any of these, regardless of apparent convenience:

- **Hand-edit files under `model/`.** Fix the codegen pipeline and
  regenerate. The only legitimate model-only diff is a
  `bump-versions`-driven version/upgrade/manifest change.
- **Use `--allow-all` in tests or codegen scripts.** Scope permissions
  to the minimum needed. `audit_deps.ts` and `audit_actions.ts` are the
  precedents — note their scoped `--allow-read --allow-net=<host>
  --allow-env=<name>` patterns.
- **Hit live cloud services in tests.** Mock via `Deno.serve({ port: 0 })`
  or an in-memory client. The canonical pattern is
  `vault/aws-sm/extensions/vaults/aws_sm_test.ts`.
- **Use npm semver ranges.** Pin to exact versions. `deno.lock` must
  match.
- **Commit with lockfile drift.** Run `deno install --frozen` in every
  directory the change touched.
- **Ignore registry validation failures.** A `publish.yml` failure is a
  codegen bug, not a registry quirk to work around. Issue #34 is the
  precedent — the same 7 extensions failed twice because the fix wasn't
  in codegen.
- **Cram unrelated fixes into the current PR.** File a new swamp-club
  issue with `swamp issue bug --title "..."` (or
  `swamp issue feature` / `swamp issue security` as appropriate) for
  unrelated bugs or cleanups discovered during investigation. Do
  **not** use `gh issue create` — swamp-club is the issue tracker for
  this repo, not GitHub. Rule 8 of the `issue-lifecycle` skill and
  issue #53 are the precedents.
- **Skip hooks with `--no-verify`, `--no-gpg-sign`, or similar.** If a
  hook fails, fix the underlying issue.
- **`git push --force` to `main`.** Never.

## Creating PRs

Use the `fgj` CLI to create pull requests (not `gh` — this repo is on
Forgejo). **A PR opens only after verification passed and its
attestation was posted** — see `verification-conventions.md`. Before
opening, confirm with the human that the change summary is correct.

```bash
fgj pr create -R swamp-club/swamp-extensions -B main -H <branch> -t "title" -b "body"
fgj pr view <number> -R swamp-club/swamp-extensions   # state and checks, for pr_merged / pr_failed
```

After the PR is open, CI builds and reviews nothing — that all ran in
verification. It runs two jobs:

- `validate-attestation` — the attestation for the PR head exists,
  passed, and pins the same verification harness the PR contains.
  **Blocks merge.**
- `review-integrity` — runs only when trust-root files change
  (`scripts/`, `verification/`, `agent-constraints/`, `.claude/`,
  `extensions/models/`, CLAUDE.md, AGENTS.md, `.forgejo/`, `deno.json`,
  any `.gitattributes`).
  An agent audits the change for weakened checks or prompt injection.
  **Blocks merge** on a fail verdict.

Both jobs run on `pull_request`, so a PR's own `ci.yml` is what runs;
the scripts they call are taken from the base commit.

Each job posts its result as its own PR comment, updated in place on
every push and naming the commit it judged. Read those comments to see
why a check passed or failed. Forks get no comment; their result is in
the job log. A failure to post never changes a verdict.

A red CI blocks merge. Fix locally and push a new commit — do not
force-push to `main`, do not merge around failures.
