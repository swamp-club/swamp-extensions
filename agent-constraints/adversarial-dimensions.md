# Adversarial Review Dimensions

Challenge each plan across these dimensions. Findings recorded against the
plan use these names in the `category:` field. Critical and high severity
findings in any category block approval via the
`adversarial-review-clear` pre-flight check.

## generated-code-fidelity

Does the generator emit what the source schema says, and does generated
output respect Swamp core contracts?

- **Sensitive fields preserved.** Fields flagged sensitive in the source
  schema (or by convention for credentials, tokens, secrets) must be
  emitted with `z.meta({ sensitive: true })`. Issue #29 precedent: the
  DigitalOcean `space-key` extension stored the API secret in plaintext
  because codegen missed the sensitive annotation.
- **Name shape respects registry and Swamp-core contracts.** Service
  names passed through verbatim from source schemas can violate registry
  rules (camelCase rejected, issue #34) or Swamp data artifact rules (no
  `/`, `\`, `..`, null bytes, issue #35). Generated code that uses an
  API-returned value as a data artifact name (e.g.
  `instanceName = result.Name`) will fail on hierarchical paths.
- **Capability surface matches real workflows.** Generated templates that
  only emit basic CRUD (`create`, `get`, `update`, `delete`, `sync`) leave
  users unable to import or discover existing infrastructure. Issue #45
  precedent: missing `list`, missing `tag`, and `update`/`sync` not
  factory-aware.
- **Schema edge cases handled.** `oneOf`, `anyOf`, nullable fields,
  recursive types, and deeply nested objects each need an explicit
  strategy. Unhandled edge cases surface as compile failures or, worse,
  as generated code that compiles but misbehaves.

## codegen-idempotency

Does a second `deno task generate:<provider>` run produce zero diff?
Non-determinism in the generator is the canary — ordering (map
iteration, set ordering, unordered schema properties), timestamps,
unstable hashing, and any reliance on wall-clock all surface here. A
non-deterministic template bumps CalVer on every run, triggering dead
publishes and masking real changes in the diff review.

## codegen-blast-radius

A change to `codegen/shared/` or a provider's `extensionModelGenerator.ts`
potentially touches every service under that provider or every provider.
The plan must name the radius (single service, single provider, all
providers) and the review must verify:

- Did an unfiltered generation (not just filtered-to-affected-service)
  surface unintended diffs?
- Did the CalVer change detector bump exactly the services whose content
  changed, or did it bump extras?
- Was the plan's blast-radius estimate accurate, or larger? (If larger,
  the plan needs to be re-scoped.)

## registry-contract

The extension registry enforces external rules that codegen must respect
before emitting. The known constraints (as of issues #29 and #34):

- Extension name is lowercase, alphanumeric, with hyphens or underscores
  (no camelCase).
- Extension TypeScript files stay under 976.6KB.
- `manifest.yaml` fields (`name`, `version`, `description`, `repository`,
  `platforms`, `skills`, `models`, `additionalFiles`, `labels`) match
  the manifest schema.

A fix that leaves these unchecked in codegen will re-fail at publish
time — the CI run in issue #34 failed the exact same 7 extensions twice.
Flag as critical if the plan reintroduces a class of failure the codegen
previously validated.

## swamp-core-contract

Generated code runs under Swamp's execution model and must honor its
contracts:

- Data artifact names: no `/`, `\`, `..`, or null bytes (issue #35).
- Sensitive fields auto-vault via `z.meta({ sensitive: true })` (issue
  #29).
- Factory-pattern data requires `update`/`sync` that can target an
  instance name, not just derive it from `globalArgs.name` (issue #45).
- Required `globalArguments` block discovery-only use cases — consider
  whether a field should be optional for list/lookup paths (issue #45,
  the `VpcId=placeholder` workaround).

These are Swamp-core-level contracts, not extension-specific. Codegen
that violates them breaks the model for every generated service
simultaneously.

## sdk-wrap-defense

Vault and datastore extensions wrap third-party SDKs (AWS SDK,
DigitalOcean, Azure, 1Password). The SDK is not trusted to produce
correctly-shaped errors for every provider variant:

- Does the extension tolerate malformed responses? Plain-text or
  truncated XML in places XML is expected (issue #74)? HTML error
  pages? Missing headers?
- Are SDK errors caught at the extension boundary and re-surfaced with
  actionable context (HTTP status, body preview, credential-source
  hint), or does a bare SDK stack leak to the user?
- Are retries and connection pooling effects accounted for? Issue #74:
  the *first* SDK call surfaced `UnknownError`, the second surfaced
  `InvalidAccessKeyId` — both for the same auth failure. Any test that
  asserts on error shape must cover the first-call path, not just a
  warmed-up client.

## test-fidelity

Does the testing strategy actually exercise the change, or is it
decorative?

- **Malformed mock responses** when testing error paths (issue #74), not
  just happy-path mocks.
- **Conformance helpers applied** to vault/datastore changes, so the
  contract is checked in addition to the specific method behavior.
- **Env vars restored in `finally`** so a mid-test failure doesn't
  corrupt the next test.
- **`sanitizeResources: false`** justified in a comment when an SDK
  leaks connection-pool resources.
- **No live cloud in tests.** Every external call goes through
  `Deno.serve({ port: 0 })` or an in-memory mock client.
- **Permissions scoped.** `--allow-net`, `--allow-env`, `--allow-sys`,
  `--allow-read`, `--allow-write` only as needed — `--allow-all` is
  never acceptable.
- **For refactors**: existing tests actually exercise the code being
  changed, not merely pass alongside it. Flag coverage gaps where the
  refactor targets code no test touches.

## ci-matrix-completeness

A new extension, scope directory, or task is silently uncovered unless
every fan-out point is updated:

- `paths-filter` in the `changes` job matches the new path.
- The per-scope check matrix lists the new extension.
- The per-scope lockfile matrix lists the new extension.
- The `deps-audit` job's `find` expression covers the new directory.
- `claude-review` and `claude-adversarial-review` include the new job in
  their `needs:` arrays.
- `publish.yml` has a push step for the new extension.

The `claude-review` / `claude-adversarial-review` gap is the worst
case — tests pass, review is skipped, and the merge completes without
the safety net.

## scope-discipline

Does the plan stay within the boundary of the filed issue, or has it
absorbed unrelated work?

- A bug fix that adds a refactor is scope creep.
- An adversarial review that surfaces a broader issue should split it
  out as a new swamp-club issue via `swamp issue bug` (or
  `swamp issue feature` / `swamp issue security` as appropriate), not
  widen the current plan. **Never use `gh issue create`** — swamp-club
  is the issue tracker for this repo, not GitHub. Issue #53 is the
  precedent: a `COMMENTED`-review bug was surfaced during an adversarial
  review on an unrelated CI PR. The reviewer's first framing was too
  broad; the right call was narrowing and filing. Rule 8 of the
  `issue-lifecycle` skill codifies this.
- JSDoc additions, `any` removals, or typedef cleanups in files the plan
  wasn't otherwise touching are scope creep.
- Backwards-compatibility shims, feature flags, and fallback paths for
  scenarios the issue doesn't describe are scope creep.

## supply-chain

CI runs Claude-driven code review with GitHub-Actions integrations.
Third-party action pinning and permissions scoping are blast-radius
multipliers if ignored:

- Third-party actions pinned to a full commit SHA unless they come from
  a trusted publisher (`actions/*`, `anthropics/*`, `denoland/*`,
  `systeminit/*`), which may use tags.
- No `curl | bash` or remote script execution.
- `claude-review`, `claude-adversarial-review`, and
  `claude-ci-security-review` have scoped `--allowedTools` — broad
  `Bash(gh api:*)` is too wide.
- Workflow-file changes trigger the `claude-ci-security-review` job;
  plans that touch `.forgejo/workflows/` must expect that gate and not
  blindly silence it.

## docs-drift

Does the change alter behavior documented somewhere the reader will
trust, without updating the doc?

- `CLAUDE.md` rules, commands, codegen architecture section.
- `codegen/designs/<provider>.md` schema-to-model mapping decisions —
  especially relevant when a codegen change alters that mapping.
- Extension `README.md` — behavior, configuration, supported features.
- Repo-root `README.md` — extension inventory and top-level workflow.

Docs that describe the *old* behavior but survive the change are worse
than missing docs. Flag as high severity if the change is user-visible
and a doc now lies about it.
