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

The code change is often straightforward; the CI fan-out is where
mistakes happen. Enumerate every update from the CI fan-out checklist in
`planning-conventions.md` and verify each as a separate implementation
step:

1. New extension directory with `deno.json`, `deno.lock`,
   `manifest.yaml`, `README.md`, `LICENSE.txt`, and
   `extensions/<type>/`.
2. `ci.yml` updates — `paths-filter`, per-task matrix, lockfile matrix,
   `claude-review` `needs:`, `claude-adversarial-review` `needs:`,
   `deps-audit` `find` expression.
3. `publish.yml` — new push step.
4. `regenerate-models.yml` — only for new codegen providers.
5. Push to a scratch branch and confirm the new matrix jobs actually
   fire in CI (visible in the Actions tab). A job that doesn't fire is
   silently uncovered.

## Local Quality Gate

Run these before pushing. CI runs the same commands — local failure
means the PR is blocked. The gate is per-directory because each
extension has its own `deno.json` / `deno.lock`.

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
--allow-write` on `deno test`; mirror the flags from the corresponding
CI matrix job in `.forgejo/workflows/ci.yml`.

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
- **Verification failed**: "Verification failed: <what still breaks>" —
  do not open a PR.

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

Use the `github-pr` skill to create pull requests. Before opening,
confirm with the human that the change summary is correct.

After the PR is open, CI runs every job whose `paths-filter` matches:

- Per-scope `check`, `lint`, `fmt`, `test`, and `lockfile` jobs.
- `codegen-verify` — regenerates Hetzner and DigitalOcean and fails if
  the result differs from the committed output. This is an automated
  version of the idempotency gate; local second-run confirmation should
  mean it passes.
- `deps-audit` and `actions-audit` — surface outdated deps and unpinned
  actions. `deps-audit` is informational; `actions-audit` is stricter.
- `claude-review` — model-level correctness pass. **Blocks merge** on
  requested changes.
- `claude-adversarial-review` — adversarial pass across the dimensions
  in `agent-constraints/adversarial-dimensions.md`. **Blocks merge** on
  critical/high findings.
- `claude-ci-security-review` — runs only when `.forgejo/workflows/` or
  `scripts/` changed. **Blocks merge** on critical/high findings.

A red CI blocks merge. Fix locally and push a new commit — do not
force-push to `main`, do not merge around failures.
