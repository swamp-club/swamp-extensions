# gatorwalk-factory

`gatorwalk-factory` is a code name. This is the from-scratch rebuild of
`@swamp/software-factory`: a lifecycle held as data, one model instance per work
item, and a pure state piece that enforces gates and writes a journal. It is
**not published**, and its public name is chosen at go-live.

## Not published until go-live

CI publishes any directory whose `manifest.yaml` changes on main. This directory
therefore has **no `manifest.yaml` at any depth** until go-live, and
`extensions/models/no_manifest_test.ts` fails if one appears. The go-live change
adds the manifest and deletes that test.

## Layout

```
extensions/models/
  lifecycle.ts            the lifecycle holder model type
  work_item.ts            the work-item model type
  _lib/
    lifecycle_schema.ts   the lifecycle and plugin meta-schema
    payload_schema.ts     JSON Schema 2020-12 payload schemas and contracts
    template.ts           {{name}} placeholders in prompts
    canonical.ts          JSON safety (CEL integers) and content digests
    journal.ts            journal events and actors
    run_record.ts         the per-work-item run record
    run_ops.ts            pure operations: start, record, dispatch, approve,
                          advance, reset
    run_store.ts          storage and the commit protocol
    cel_context.ts        the CEL vocabulary for bindings and cel gates
    dispatch.ts           dispatch packets: bindings, inputs, rendered prompts
    gates.ts              gate evaluation and transition readiness
    work_item_ops.ts      the methods of both model types
    test_support.ts       shared test fixtures
    fake_swamp.ts         a fake swamp method context for tests
lifecycles/               lifecycles gatorwalk-factory ships
testdata/
  lifecycles/             software-factory's examples, ported
  plugins/                stage plugins
```

## The lifecycle format

A lifecycle is **checked** by the holder's `validate` method and again whenever
a work item starts on it, and every problem is reported with its path. Editing a
holder with `swamp model edit` does not check it: swamp only applies a lenient
version of a model's schema, so the full check is gatorwalk's own.

A lifecycle is ported from software-factory's definition schema: stages, work,
artifacts, evidence, transitions and gates. Three things change:

- **Payload schemas are standard JSON Schema, draft 2020-12**, with standard
  meaning. Two stricter rules apply when a lifecycle is checked: unknown
  keywords and unknown `format` names are rejected, so a typo is an error, not a
  silent no-op. References must be local (`#/...` or `#anchor`), and nothing is
  fetched.
- **Runtime values are bare CEL**, in `work.bindings` and `cel` gates. Never use
  `${{ }}`: a lifecycle lives in a model's `globalArguments`, where the platform
  evaluates `${{ }}` when the definition is saved. This also means a prompt
  cannot contain a literal `${{` (a GitHub Actions snippet, say); the platform
  has no escape for it.
- **Prompts refer to bindings as `{{name}}`**, in `systemPrompt` and `command`.
  A placeholder holds a binding name, never an expression, and an undeclared
  name is an error when the lifecycle is checked. `{{` around anything that is
  not a bare name (`{{ .Values.x }}`, `{{#each}}`) is literal text, and `\{{` is
  a literal `{{`. At dispatch, a null or missing value fails the stage rather
  than rendering blank. See [DESIGN.md](DESIGN.md) for why.
- **References are checked when the lifecycle is checked.** This covers
  transition targets, gate references, `reviews` links and injected context, and
  every problem is reported with its path. Graph analysis (reachability, dead
  ends, ambiguous exits) is separate.

A **plugin** has the same shape plus a `contract`: `inputs` it consumes,
`outputs` its stages produce, named `exits`, and a `parameters` schema. Its
transitions leave through `exit:` rather than `to:`. See
`testdata/plugins/review-plan.yaml`.

## Bundled lifecycles

`lifecycles/build-swamp-extension.yaml` takes a change to a swamp extension from
plan to release:

```
plan → plan-review → implement → check → code-review → release → done
```

- **People decide at four points:** approving the plan, waiving the quality
  score, releasing, and abandoning the work.
- **Manual ways back:** a person can always send the work back by hand (`revise`
  after either review, `recheck` for a flaky check). So declining an approval
  never leaves `abandon` as the only way out.
- **Quality waiver:** `check` normally needs `swamp extension quality` to pass.
  An extension with no manifest yet can't be scored, so a person can waive the
  score instead. gatorwalk-factory itself needs this until go-live.
- **Two release routes:** `swamp extension push`, or a pull request that CI
  publishes when it merges. A pull-request release must record its verification
  attestation id and its merge commit. A registry push must publish the version
  recorded in `change-summary`.
- **Commit binding:** the checks and the release must name the commit recorded
  in `change-summary`, which is the commit that was reviewed. A squash merge's
  own commit is recorded separately, as `mergeCommit`.

This is the tier 1 lifecycle and gatorwalk-factory's own process. Later it will
be recomposed from stage plugins; it lives under `lifecycles/` because it is a
lifecycle either way.

## Developing

```bash
cd gatorwalk-factory
deno task check
deno task lint
deno task fmt
deno task test
deno install --frozen
```

These are the same checks that `verification/checks.yaml` runs before a PR.

## Running it

In a swamp repo, without publishing anything:

```bash
swamp extension source add /path/to/swamp-extensions/gatorwalk-factory

# A lifecycle holder: its globalArguments are a lifecycle, e.g. the contents
# of lifecycles/build-swamp-extension.yaml (swamp model edit team).
swamp model create @swamp/gatorwalk-factory/lifecycle team
swamp model method run team validate --log
swamp model method run team new_key --log        # prints a work-item key

# A work item, named by that key.
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input lifecycle=team --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

`status` prints the stage, what it needs, and each exit's readiness, plus the
`expectedStage`, `expectedCycle` and `expectedEra` every write must pass back.
Writes are `record_artifact`, `record_evidence`, `dispatch`, `record_usage`,
`approve`, `decline`, `grant_override`, `advance` and `reset`. A refused write
fails with its reason and writes nothing. A payload that breaks its schema also
fails, but is kept on the work item as retry feedback. Method output goes to the
log, so pass `--log`.
