# Planning Conventions

## Scope / Layer Analysis (the `dddAnalysis` field)

This repo does **not** use DDD. The `issue-lifecycle` extension's `plan`
method requires a `dddAnalysis` string — fill it with a scope/layer
analysis tailored to this repo, covering:

1. **Scope**: which of the six scopes the change touches — vault,
   datastore, generated model (symptom-only), codegen, workflow,
   issue-lifecycle. Multi-scope changes must list all of them.
2. **Fix-upstream justification**: if the symptom appears in `model/`,
   state explicitly that the fix lands in `codegen/<provider>/` or
   `codegen/shared/` and name the template file. Plans that edit `model/`
   directly are rejected by the adversarial review (category
   `generated-code-fidelity`).
3. **Blast radius**: how many artifacts this change affects — a single
   extension, one provider's ~249 services, all providers, the registry
   publish pipeline. Quantify where possible. Issue #45 is the precedent:
   one codegen template edit affecting 249 AWS services.
4. **Cross-scope ripple**: does this change pass through `codegen/shared/`
   or a shared test helper like `@systeminit/swamp-testing`? If yes, name
   every scope that will be touched when the change lands.

Keep this field under ~1000 characters. The goal is a crisp orientation
for review, not an essay.

## Fix-Upstream Check

Any plan step that modifies a file under `model/<provider>/` must be the
*output* of a codegen change included in the same plan. Plans that
hand-edit generated code — even "just one line" — are wrong. The fix
belongs upstream.

The one legitimate model-only diff is a version/upgrade entry change from
the `bump-versions` script: only `version`, `upgrades`, and
`manifest.yaml` change. Anything else in a model-only diff means
hand-editing generated code. The CI reviewer enforces this — mirror the
check in planning.

## CI Fan-Out Checklist

CI is a matrix fan-out keyed by `(extension × task)`. When a change adds a
new extension or a new scope directory, every one of the following must be
updated, or the change will be silently uncovered:

- `.forgejo/workflows/ci.yml`:
  - `changes` job's `paths-filter` filters (must include the new path).
  - The matching matrix job's `matrix.<extension>` list (e.g.
    `vault: [1password, aws-sm, azure-kv, <new>]`).
  - The matching `*-lockfile` job's matrix.
  - The `claude-review` job's `needs:` list — missing here means the
    extension check passes but review is skipped.
  - The `claude-adversarial-review` job's `needs:` list — same risk.
- `.forgejo/workflows/publish.yml` — add the push step for the new
  extension.
- `.forgejo/workflows/regenerate-models.yml` — only for new codegen
  providers.
- `deps-audit` job's `find` expression in `ci.yml` (around line 508) —
  uses a space-separated directory list. Missing here means `deno
  outdated` skips the new directory.

Plans that add new extensions must enumerate these updates as explicit
steps, not implicit cleanup.

## Idempotency Plan Step (codegen changes)

Every codegen change states, as an explicit plan step: "Run
`deno task generate:<provider>` twice after the fix; second run must
produce zero diff." This is the primary correctness check — non-zero diff
on the second run means a non-determinism bug (map iteration order,
timestamps, unstable hashing) and the `version.ts` change detector will
spuriously bump CalVer, triggering a dead publish.

## Conformance Plan Step (vault / datastore changes)

Every vault or datastore change names the conformance helper that covers
the modified contract:

- `assertVaultExportConformance(...)` for vault extensions.
- `assertDatastoreExportConformance(...)` for datastore extensions.

If the change adds behavior not covered by an existing conformance
assertion, either extend the helper upstream in `@systeminit/swamp-testing`
(out-of-repo; file a separate issue with
`swamp issue feature --title "..." --extension @systeminit/swamp-testing`)
or add a direct assertion in the extension test with a comment
explaining why no conformance helper applies.

## SDK Wrap Defense Plan Step (vault / datastore changes that touch
error paths)

Vault and datastore extensions wrap third-party SDKs. When the plan
changes an SDK call path — or adds a new one — name the malformed
responses the extension must tolerate. Issue #74 is the precedent: the
bundled AWS SDK's XML deserializer threw `UnknownError` on DO Spaces 403
responses with non-XML bodies. Plans that touch SDK error paths must
include a test case with a deliberately malformed mock response, not just
a happy-path test.

## Version-Bump Plan Step

CalVer versioning lives in `codegen/shared/version.ts` and is content-
based. Plans state whether a manifest bump is expected:

- Behavior change in a hand-written extension → manifest bump expected;
  plan step commits the new `manifest.yaml`.
- Codegen change that touches template output → manifest bumps for every
  regenerated service whose hash changed. Verify the bumped set matches
  the affected set — if a service bumped that wasn't meant to change,
  `version.ts` is misreading the content or the template touched more than
  intended.
- Pure refactor with no output change → no manifest bump; if one appears,
  the refactor wasn't pure.

## testingStrategy Field

Fill the plan's `testingStrategy` with a scope-specific answer, not a
generic "tests will be added":

- **Vault/datastore bug**: a new failing test in
  `<scope>/extensions/<type>/<extension>_test.ts` that uses the mock HTTP
  server or in-memory mock client, restores env vars in `finally`, and
  invokes the relevant conformance helper.
- **Codegen bug**: filtered regeneration (`generate:<provider>
  <service>`) proves the targeted fix; full regeneration proves no
  collateral damage; second run proves idempotency.
- **Registry-publish bug**: a codegen validation step that would catch
  the bad output locally (e.g. file-size check, manifest-name validator).
- **CI matrix change**: push to a scratch branch and confirm the new
  matrix job fires.
- **Pure refactor covered by existing tests**: state that explicitly and
  name the tests that cover the changed code path.

## Documentation Impact

Evaluate whether the change affects:

- `CLAUDE.md` at the repo root — rules, commands, codegen architecture.
- `codegen/designs/<provider>.md` — schema-to-model mapping decisions.
- The extension's `README.md` — behavior, configuration, supported
  features.
- The repo-root `README.md` — only if the change affects the overall
  extension inventory or top-level workflow.

Plans that change behavior documented in any of these must include an
explicit step to update the doc. Stale docs are a `docs-drift` finding in
the adversarial review.

## potentialChallenges Field

This field is a free list. Use it to flag known unknowns, not to repeat
the plan. Typical entries for this repo:

- "Schema drift since last `fetch-schema:<provider>` run — fix may need
  re-tuning when regenerated against a newer schema."
- "The `@systeminit/swamp-testing` conformance helper version pinned in
  this extension may predate the contract change being tested."
- "Registry size/name validation may surface additional failures beyond
  the ones named in the issue."
- "CalVer change detector in `version.ts` may bump services the change
  didn't intend to touch."
