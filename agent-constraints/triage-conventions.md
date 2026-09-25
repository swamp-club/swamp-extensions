# Triage Conventions

## Issue Filing

swamp-club is the issue tracker for this repo — not GitHub. When triage
surfaces a side-finding that needs its own issue (unrelated bug, doc
gap, upstream change), file it with the `swamp` CLI, never `gh`:

```
swamp issue bug --title "..."
swamp issue feature --title "..."
swamp issue security --title "..."
```

Add `--extension <name>` to route the issue against a specific
extension. This writes directly to swamp-club; the new issue can then
be picked up by `issue-lifecycle` the same way as the one being
triaged.

## Codebase Exploration

When triaging an issue in this repo, read:

- `CLAUDE.md` at the repo root — the rules (never hand-edit `model/`, named
  exports, pinned deps, testing rules).
- For issues where the symptom appears in generated code (`model/<provider>/`),
  read the relevant design document: `codegen/designs/aws.md`,
  `codegen/designs/gcp.md`, `codegen/designs/hetzner.md`, or
  `codegen/designs/digitalocean.md`. These document the schema-to-model mapping
  decisions and are often where the mental model of "how did we end up with
  this output" lives.
- The canonical vault test `vault/aws-sm/extensions/vaults/aws_sm_test.ts`
  before planning any vault/datastore change — it sets the pattern for
  conformance assertions, mock HTTP server shape, env-var restore, and the
  `sanitizeResources: false` comment.

## Scope Classification (diagnostic, not cosmetic)

Classification drives reproduction mechanics, so do it with care. The six
scopes:

| Scope                          | Path                             |
| ------------------------------ | -------------------------------- |
| Vault extension                | `vault/<name>/`                  |
| Datastore extension            | `datastore/<name>/`              |
| Generated model (symptom only) | `model/<provider>/<service>/`    |
| Codegen (where model fixes go) | `codegen/<provider>/` or `codegen/shared/` |
| Workflow extension             | `workflows/<name>/`              |
| issue-lifecycle extension      | `issue-lifecycle/`               |

**The cardinal rule**: if the symptom is in `model/`, the fix is almost never
in `model/`. Generated code never gets hand-edited. Trace the symptom:

- Same symptom across many services in one provider → bug in
  `codegen/<provider>/pipeline.ts`, `extensionModelGenerator.ts`, or
  `libGenerator.ts`.
- Same symptom across providers → bug in `codegen/shared/`
  (`zodGenerator.ts`, `manifestGenerator.ts`, `denoConfigGenerator.ts`,
  `version.ts`, or schema normalization under `codegen/shared/schema/`).
- Symptom in one specific service only → likely a schema quirk in that
  service (an `oneOf` / `anyOf` / recursive / nullable type the pipeline
  didn't handle) or a provider-specific template edge case.
- Registry **publish** failure rather than runtime failure → codegen
  validation gap (name shape, file size, manifest platforms). See issue
  #34 for precedent: 976.6KB file-size limit and lowercase name rules both
  live on the registry side, codegen must respect them.

Record this trace on the triage. "Symptom in `model/aws/ssm/parameter`, but
fix is in AWS codegen template because this affects every CloudControl
service's `create`/`get`/`update`/`sync`/`delete`" is the right shape of
observation (issue #35 precedent).

## Regression Signals

- Hand-written extension (`vault/`, `datastore/`, `workflows/`,
  `issue-lifecycle/`) bug → `git log` the extension directory.
- Symptom in `model/` → **never** `git log` the file itself (generated code
  churns). Instead: `git log codegen/<provider>/` and `git log codegen/shared/`
  to find the template change that regressed.
- Registry publish regression → look at the last successful `publish.yml`
  run for the affected extension versus the first failing one; the diff
  between those two manifest versions localizes the issue.

If the bug previously worked, classify with `isRegression=true`. The
`issue-lifecycle` extension treats regressions as a detail on a `bug`
classification, not a separate type.

## Bug Reproduction

**Bugs and regressions only — skip for features and security-hardening
requests.** Reproduction mechanics depend on the scope:

### Vault / datastore / workflow / issue-lifecycle bugs

The reproduction is a failing `deno test`. Do not spin up a scratch swamp
repo; do not exercise the extension against a live cloud account.

1. Write a test case that reproduces the observed failure using the
   canonical patterns from `vault/aws-sm/extensions/vaults/aws_sm_test.ts`:
   - Local HTTP mock (`Deno.serve({ port: 0 })`) OR an in-memory mock
     client.
   - Env vars restored in a `finally` block.
   - `sanitizeResources: false` with a comment naming the SDK whose
     connection pool leaks resources.
   - Conformance helper (`assertVaultExportConformance`,
     `assertDatastoreExportConformance`) invoked if the test is about
     contract adherence.
2. **For SDK-wrapping bugs like #74**, the mock must return the *malformed*
   response that caused the SDK to misbehave — not a happy-path response.
   Plain-text or truncated XML bodies, HTTP 401/403 without a parseable
   body, non-standard headers. The bug only reproduces when the mock mirrors
   the real provider's quirks.
3. Run the test from the extension directory:
   ```
   cd <scope-dir>
   deno test --allow-env --allow-net --allow-sys extensions/<type>/
   ```
4. Confirm the test fails for the reason the issue describes — not for an
   unrelated reason.

### Codegen / generated-model bugs

The reproduction is diff-driven. The bad generator output *is* the
reproduction.

1. From `codegen/`, fetch the current source schema:
   ```
   deno task fetch-schema:<provider>
   ```
2. Run generation filtered to the affected service(s) first. AWS has ~249
   services and GCP ~260 — running unfiltered is slow and noisy when you
   only need one:
   ```
   deno task generate:aws <service>        # e.g. ec2, ssm
   deno task generate:gcp <service>
   ```
   Hetzner and DigitalOcean don't support filtering — they regenerate the
   single provider directory.
3. Run `git diff model/<provider>/<service>/` and confirm the bad output
   matches the issue's description. If the bad output does not appear, the
   schema may have already changed upstream or the bug may be environment
   specific — flag that to the human.
4. Keep the working tree dirty until verification. You will re-run the
   same command after the fix and confirm the diff now shows the intended
   output only.

### Registry-publish bugs

The reproduction is the CI run itself. Open the failed `publish.yml` run
(or the failing verify-build `checks` step), capture the registry error verbatim
per extension, and map each failure to a codegen hypothesis (see issue
#34: oversized file → emit too large; camelCase name → naming validator
missing).

## Document What You Observed

Before moving to planning, record:

- The exact command(s) or CI run that reproduces the failure.
- The actual output/error/diff, verbatim.
- The expected behavior and where it's documented (CLAUDE.md,
  `codegen/designs/<provider>.md`, extension README, or registry contract).
- Which scope the fix belongs in — **not** the scope the symptom appears
  in. Generated-code symptoms map to codegen fixes.
- Blast radius estimate: "single service", "all AWS CloudControl services",
  "every vault/datastore", "registry-wide publish failure for N
  extensions". This drives planning and the adversarial review.

If the bug **cannot be reproduced**, say so in the plan and ask the human.
Do not guess — environment-specific bugs, schema drift, and already-fixed
bugs all produce "can't reproduce" and need different responses.
