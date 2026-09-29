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
  plugin.ts               the plugin holder model type
  work_item.ts            the work-item model type
  linear.ts               the Linear tracker adapter model type
  swamp_club.ts           the swamp-club Lab tracker adapter model type
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
    awaiting.ts           which exits only a person can open, journaled
    metrics.ts            per-work-item metrics from the run and journal
    summary.ts            the summary: timeline and metrics as markdown
    cel_context.ts        the CEL vocabulary for bindings, cel gates and when
    dispatch.ts           dispatch packets: bindings, inputs, rendered prompts
    gates.ts              gate evaluation and transition readiness
    graph.ts              graph analysis of a lifecycle or plugin
    plugin_instance.ts    a plugin's $param placeholders, filled in
    eject.ts              a plugin's stages, copied into a lifecycle
    work_item_ops.ts      the methods of the holder, plugin holder and
                          work-item types
    tracker.ts            the tracker adapter contract
    tracker_methods.ts    the methods every tracker model has, and its ledger
    tracker_conformance.ts  the contract, checked the same way per adapter
    claim.ts              start from a ticket: the ticket index and claim
    linear.ts             the Linear GraphQL client
    linear_fake.ts        a local fake of Linear's API, for tests
    swamp_club.ts         the swamp-club Lab REST client
    swamp_club_fake.ts    a local fake of the Lab API, for tests
    test_support.ts       shared test fixtures
    fake_swamp.ts         a fake swamp method context for tests
extensions/reports/
  work_item_summary_report.ts  the summary report, run after `summary`
integration/              the real-engine suite: gatorwalk through the swamp CLI
  skill_commands.ts       the skill's commands, pulled out to check and run
lifecycles/               lifecycles gatorwalk-factory ships, and the
                          swamp-extensions mapping (a .md)
.claude/skills/gatorwalk-factory/
  SKILL.md                the skill: how an agent drives a work item
  references/             driving in full, and a worked example
testdata/
  lifecycles/             software-factory's examples, ported, and a
                          lifecycle to eject a plugin into
  plugins/                stage plugins
```

## The lifecycle format

A lifecycle is **checked** by the holder's `validate` method, and every problem
is reported with its path. The schema check runs again whenever a work item
starts on it; the graph analysis (below) runs only in `validate`. Editing a
holder with `swamp model edit` does not check it: swamp only applies a lenient
version of a model's schema, so the full check is gatorwalk's own.

A lifecycle is ported from software-factory's definition schema: stages, work,
artifacts, evidence, transitions and gates. Three things change:

- **Payload schemas are standard JSON Schema, draft 2020-12**, with standard
  meaning. Two stricter rules apply when a lifecycle is checked: unknown
  keywords and unknown `format` names are rejected, so a typo is an error, not a
  silent no-op. References must be local (`#/...` or `#anchor`), and nothing is
  fetched.
- **Runtime values are bare CEL**, in `work.bindings`, `cel` gates and a
  `human-approval` gate's `when` (the gate applies only while it is true). Never
  use `${{ }}`: a lifecycle lives in a model's `globalArguments`, where the
  platform evaluates `${{ }}` when the definition is saved. This also means a
  prompt cannot contain a literal `${{` (a GitHub Actions snippet, say); the
  platform has no escape for it.
- **Prompts refer to bindings as `{{name}}`**, in `systemPrompt` and `command`.
  A placeholder holds a binding name, never an expression, and an undeclared
  name is an error when the lifecycle is checked. `{{` around anything that is
  not a bare name (`{{ .Values.x }}`, `{{#each}}`) is literal text, and `\{{` is
  a literal `{{`. At dispatch, a null or missing value fails the stage rather
  than rendering blank. See [DESIGN.md](DESIGN.md) for why.
- **References are checked when the lifecycle is checked.** This covers
  transition targets, gate references, `reviews` links and injected context, and
  every problem is reported with its path. A name is one kind: an artifact and
  evidence may not share it, since `context.inject` names a product alone. A CEL
  macro or `cel.bind` may not bind a variable named after the CEL vocabulary
  (`item`, `stage`, `artifacts`, `evidence`, `validations`).
- **The lifecycle is analysed as a graph** by `validate`. Errors are stages that
  cannot be reached, stages with no way to a terminal stage, transitions whose
  gates can never pass (such as `evidence-recorded` on evidence another stage
  records), and plugin exits that nothing reaches. They fail `validate`.
  Warnings are logged: exits that can pass together with no person choosing,
  loops whose only way out is a global transition such as `abandon`, loops
  bounded only by the default cycle limit, products that some path to a stage
  does not produce, and transitions only a cycle override opens. Each finding
  gives its path, the stage it is judged from, and a trace of stages from the
  initial stage. See [DESIGN.md](DESIGN.md), "Graph validation".
- **A stage may name a tracker status key**, `projection: { status: <key> }`,
  new in gatorwalk. When a work item enters the stage, the projection publisher
  moves its ticket to the status the tracker adapter's `statuses` argument maps
  that key to. A stage without one leaves the ticket's status alone. See
  [DESIGN.md](DESIGN.md), "The projection publisher".

A **plugin** has the same shape plus a `contract`: `inputs` it consumes,
`outputs` its stages produce, named `exits`, and a `parameters` schema. Its
transitions leave through `exit:` rather than `to:`. A value anywhere in its
stages may be a parameter placeholder, `{ $param: <name> }`, which is replaced
whole by the parameter's value (or its schema `default`). See
`testdata/plugins/review-plan.yaml`.

## Stage plugins: eject

A plugin is a working starting point, not a dependency. It lives in a **plugin
holder** (`@swamp/gatorwalk-factory/plugin`), and a lifecycle holder's `eject`
method copies its stages into the lifecycle as ordinary stages, which you then
save and edit freely. Nothing refers back to the plugin afterwards.

Sketch the lifecycle first, with a **placeholder stage** where the plugin goes.
It is bare (only `id`, `description`, `initial` and `transitions`; no
`projection`, since the plugin's stages carry their own status keys), and its
transitions are named after the plugin's exits:

```yaml
- id: review
  description: Placeholder for the review-plan plugin.
  transitions:
    - { name: approved, to: implement }
    - { name: rework, to: plan }
```

`eject` replaces it. Transitions into the placeholder now enter the plugin's
first stage, and each exit leaves to the stage the placeholder's transition of
the same name targets. An exit that targets the placeholder itself re-enters the
plugin. The inputs are:

- `plugin`, `replace`: the plugin holder, and the placeholder stage.
- `exits`: where exits go, overriding the placeholder's transitions.
- `inputs`: which of your products each contract input is, when the names differ
  (`{"plan": "design"}`).
- `names`: new names for the plugin's `stages`, `artifacts` and `evidence`
  (`{"stages": {"review": "design-review"}}`). A name that clashes with one of
  yours is an error that says which entry to add; nothing is prefixed, so two
  uses of one plugin are told apart by the names you give them.
- `params`: the plugin's parameter values.

The result must pass the schema and the graph analysis, every exit must be
wired, and every contract input must be produced on every path into the plugin.
`eject` never changes the holder: it logs the lifecycle (as JSON, which is YAML)
and writes it to the holder's `ejected-lifecycle` record. Save it as the
holder's `globalArguments` and run `validate`. See [DESIGN.md](DESIGN.md),
"Stage plugins: eject only".

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

`lifecycles/swamp-extensions.yaml` is the process this repository runs with
`@swamp/issue-lifecycle` and its verification conventions, from a Lab issue to
the session summary:

```
triage → [reproduce] → plan → plan-review → implement → conformance-review
  → verify → attest → pull-request → merge → release → notify → summary
  → done
```

- **It describes the process; it does not replace issue-lifecycle.** The
  repository keeps issue-lifecycle for now. gatorwalk has a swamp-club adapter
  (`@swamp/gatorwalk-factory/swamp-club`), but this lifecycle does not use it
  yet; wiring it in is a follow-up. Until then, where the process posts to
  swamp-club (the attestation, the contributor's thank-you), a person does it
  and the stage records the result.
- **People decide at six points:** a bug that cannot be reproduced, plan
  approval, the verification checklist, opening the pull request, what to do
  after a failed pull request, and abandoning the work. Five are approvals;
  after a failed pull request the person picks one of two manual exits.
- **Verification runs as one workflow stage.** Its wrapper workflow,
  `verification/workflow-verify.yaml`, runs verify-build and verify-reviews at
  the same time as nested runs. The stage records one outcome with both runs in
  it. This is how a lifecycle, which is in one stage at a time, runs things in
  parallel; see DESIGN.md, "Parallel work inside one stage". Every exit from
  verification to the merge is bound to the commit in `change-summary`.

Both lifecycles name a status key on their stages, using the Lab's own status
names: the planning stages are `triaged` (swamp-extensions' `triage` stage has
no key, so the issue's status is left alone while it is triaged), the work
through release is `in_progress`, `done` is `shipped` (in swamp-extensions, also
`notify` and `summary`), and `abandoned` is `closed`. The Lab adapter maps them
as they are; a Linear instance maps them to its team's names.

`lifecycles/swamp-extensions.md` is not a lifecycle. It maps every phase, gate
and human stop of today's process onto the format, and lists what the format
could not express.

## Developing

```bash
cd gatorwalk-factory
deno task check
deno task lint
deno task fmt
deno task test
deno task test:integration
deno install --frozen
```

These are the same checks that `verification/checks.yaml` runs before a PR.

`deno task test` runs the unit tests against fakes. It needs read access, and
network access to 127.0.0.1 only, where the tracker tests serve fakes of
Linear's and swamp-club's APIs. `deno task test:integration` runs gatorwalk
through the installed `swamp` CLI, each test in a throwaway swamp repo. It fails
if `swamp` is not on `PATH`. It uses your swamp config and login and deno's npm
cache, and needs no network once that cache is warm. See [DESIGN.md](DESIGN.md),
"Tests on the real engine".

## Running it

In a swamp repo, without publishing anything:

```bash
swamp extension source add /path/to/swamp-extensions/gatorwalk-factory

# A lifecycle holder. create prints the definition file's path; set that
# file's globalArguments to a lifecycle, e.g. the contents of
# lifecycles/build-swamp-extension.yaml.
swamp model create @swamp/gatorwalk-factory/lifecycle team --json
swamp model method run team validate --log
swamp model method run team new_key --log        # prints a work-item key

# A plugin holder, and its stages ejected into team's placeholder stage.
swamp model create @swamp/gatorwalk-factory/plugin review-plan --json
swamp model method run review-plan validate --log
swamp model method run team eject --input plugin=review-plan \
  --input replace=review --log
swamp data get team ejected-lifecycle --json     # save .content.lifecycle

# A work item, named by that key.
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input lifecycle=team --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

`status` prints the stage and cycle; the `expectedStage`, `expectedCycle` and
`expectedEra` every write must pass back; each exit's readiness, with its
failures and the ids of its human-approval gates (`[human: plan-approval]`, or
`[approval not required now: regression-review]` for a conditional approval
whose `when` is false); the stage's work mode and dispatch count; and any
payload rejections. `dispatch` prints the whole dispatch packet. Writes are
`record_artifact`, `record_evidence`, `dispatch`, `record_usage`, `approve`,
`decline`, `grant_override`, `advance` and `reset`. A refused write fails with
its reason and writes nothing. A payload that breaks its schema also fails, but
is kept on the work item as retry feedback. Method output goes to the log, so
pass `--log`.

## Summary and metrics

`summary` is a read that prints the work item's timeline, per era, and its
metrics as markdown. The `@swamp/gatorwalk-factory/work-item-summary` report
runs after it and stores the same markdown, with the metrics and timeline as
JSON:

```bash
swamp model @swamp/gatorwalk-factory/work-item method run summary <key> --log
swamp report get @swamp/gatorwalk-factory/work-item-summary --model <key>
```

Every write also stores a `metrics` record on the work item: time in each stage
and cycle, rework (re-entries, review rounds, declines, rejected payloads),
waits at human stops, dispatches and retries, overrides, and token usage, marked
attested. It is computed from the run record alone and names the journal version
it was computed from. A dashboard reads every work item's metrics in one query:

```bash
swamp data query 'modelType == "@swamp/gatorwalk-factory/work-item" && name == "metrics"' --json
```

If a metrics write failed, or the work item has not committed since metrics were
introduced, `rebuild_metrics` rewrites the record from the run:

```bash
swamp model @swamp/gatorwalk-factory/work-item method run rebuild_metrics <key> --log
```

See [DESIGN.md](DESIGN.md), "Summary and metrics", for what each metric means.

## Linear

`@swamp/gatorwalk-factory/linear` connects a Linear workspace. Keep one instance
per workspace; its API key comes from a vault. See [DESIGN.md](DESIGN.md),
"Trackers".

```bash
swamp vault create local_encryption secrets
swamp vault put secrets linear-token          # prompts for the key
swamp model create @swamp/gatorwalk-factory/linear linear --json
# In the printed definition file, set globalArguments:
#   apiToken: ${{ vault.get(secrets, linear-token) }}
#   statuses: { triaged: Todo, in_progress: In Progress, shipped: Done, closed: Canceled }
swamp model method run linear fetch_issue --input issue=ABC-1 --log
swamp model method run linear publish --input workItem=<key> --log
```

`fetch_issue` prints the issue's UUID and the `externalRefs` to start a work
item with. `comment` and `set_status` take the UUID; given `workItem` and
`journalVersion`, a repeat of the same pair writes nothing to Linear.

`publish` replays a work item's journal to the issue its `externalRefs` name: a
comment for each event a person needs (the start, each stage entered, approvals,
waits at a human stop, resets, the finish), and the status when the stage's
status key changes. Run it after any change; it delivers only what is new, and
after a failure a re-run picks up where it stopped. It is the only writer of a
work item's ticket status.

## swamp-club Lab

`@swamp/gatorwalk-factory/swamp-club` connects a swamp-club server. It uses the
same key as swamp and issue-lifecycle: the `apiKey` global argument if set,
otherwise `SWAMP_API_KEY`, otherwise your `swamp auth login` (whose key is only
ever sent to the server you logged in to). Status moves past open or closed,
assignment and attestations need an admin key. See [DESIGN.md](DESIGN.md), "The
swamp-club Lab adapter".

```bash
swamp model create @swamp/gatorwalk-factory/swamp-club lab --json
swamp model method run lab fetch_issue --input issue=2631 --log
swamp model method run lab set_status --input issue=2631 --input status=triaged --log
swamp model method run lab assign --input issue=2631 --log
swamp model method run lab post_attestation \
  --input attestation="$(cat /tmp/attestation-<SHA>.json)" --log
```

`assign` without `username` assigns your stored login's user, and only on the
server that login is for. It drops, and names, any assignee no longer on
swamp-club's team, since swamp-club refuses the whole list otherwise. `comment`
posts a ripple. Statuses only move forward, one step at a time, which
`set_status` walks for you; moving back is refused. `publish` works as it does
for Linear (above), and skips a status move the issue cannot make, such as back
to `triaged` after a reset, rather than failing. Do not publish to an issue that
issue-lifecycle also drives: both would write its status. `post_attestation`
posts an attestation built elsewhere (`deno task build-attestation`), and
posting the same one again for a commit writes nothing.

## Start from a ticket

Every tracker adapter has `claim`, which starts a work item from a ticket and
makes sure the same ticket never starts two at once:

```bash
swamp model method run lab claim --input issue=2631 --input lifecycle=team --log
```

With no work item for the ticket, `claim` reserves a fresh key, records it in
the adapter's ticket index (`ticket-<stable id>`), and prints the work-item
`start` command to run, with the ticket's `externalRefs`. The record is written
before the work item starts, so if anything fails in between, `claim` again
hands back the same key and command. Once the work item has started, `claim`
names it and its stage. Once it has finished, the ticket can claim a new one;
the record keeps the earlier keys. `lifecycle` is needed only when a new key is
reserved. `claim` never writes to the tracker, and a refused claim writes
nothing. A repeat claim refreshes only the ticket's snapshot, not the index
record, so read the key with `swamp data get lab ticket-2631 --json`. See
[DESIGN.md](DESIGN.md), "Start from a ticket".

## Driving it

The gatorwalk-factory skill, in `.claude/skills/gatorwalk-factory/`, is how an
agent drives a work item: the loop, when it may advance on its own, where it
must stop for a person, and what to do when a write is refused. It is tracked
here and ships with the extension at go-live. To use it in another repo before
then, link the directory into that repo's `.claude/skills/`.

`integration/skill_test.ts` keeps it honest: every command the skill shows must
name a real method with inputs it accepts, and the worked example
(`references/examples/build-swamp-extension.md`) runs, as written, from start to
done on the real engine.
