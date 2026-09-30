# gatorwalk-factory

`gatorwalk-factory` is a code name. This is the from-scratch rebuild of
`@swamp/software-factory`: a factory definition held as data, one model instance
per work item, and a pure state piece that enforces gates and writes a journal.
It is **not published**, and its public name is chosen at go-live.

## Vocabulary

- **factory**: a model of type `@swamp/gatorwalk-factory/factory`, created
  once and named, for example `team`. You run `init`, `validate`, `design_page`
  and `new_key` on it, and start work items on it.
- **factory definition**: the YAML document of a factory's stages, work,
  transitions and gates. It lives in one file in the repo,
  `factories/<factory>.yaml` by convention, which the factory's
  `globalArguments` name (`definition: factories/team.yaml`). `validate`
  checks it, and a work item pins a copy of it when it starts. In code and data
  it is `definition`.
- **work item**: one piece of work moving through a factory, a model of type
  `@swamp/gatorwalk-factory/work-item` named by a key from `new_key`.

## Not published until go-live

CI publishes any directory whose `manifest.yaml` changes on main. This directory
therefore has **no `manifest.yaml` at any depth** until go-live, and
`extensions/models/no_manifest_test.ts` fails if one appears. The go-live change
adds the manifest and deletes that test.

## Layout

```
extensions/models/
  engine/
    factory.ts          the factory model type
    work_item.ts          the work-item model type
  tracker/
    linear.ts             the Linear tracker adapter model type
    swamp_club.ts         the swamp-club Lab tracker adapter model type
  boundary_test.ts        the seam: engine and tracker code keep apart
  _lib/
    engine/
      definition_schema.ts   the definition meta-schema
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
      graph.ts              graph analysis of a definition
      design_page.ts        a definition as a static HTML page
      work_item_ops.ts      the methods of the factory and work-item types
      tracker.ts            the engine as tracker code sees it (the seam)
      tracker_testing.ts    the same, plus what tracker tests drive
      test_support.ts       shared test fixtures
      fake_swamp.ts         a fake swamp method context for tests
    tracker/
      core/
        adapter.ts            the tracker adapter contract
        tracker_methods.ts    the methods every tracker model has, and its ledger
        tracker_conformance.ts  the contract, checked the same way per adapter
        claim.ts              start from a ticket: the ticket index and claim
        projection.ts         what a ticket shows, from the journal
        test_support.ts       the projection tests' work item
      backends/
        linear.ts             the Linear GraphQL client
        linear_fake.ts        a local fake of Linear's API, for tests
        swamp_club.ts         the swamp-club Lab REST client
        swamp_club_fake.ts    a local fake of the Lab API, for tests
extensions/reports/
  work_item_summary_report.ts  the summary report, run after `summary`
integration/              the real-engine suite: gatorwalk through the swamp CLI
  harness.ts              a throwaway swamp repo per test
  engine/                 the factory and work item
  tracker/                the adapters against local fakes
  extension/              the whole extension: model registration and the skill
    skill_commands.ts     the skill's commands, pulled out to check and run
.claude/skills/gatorwalk-factory/
  SKILL.md                the skill: how an agent drives a work item
  references/             driving in full
    examples/             the example definitions to start from, a worked
                          example, and the swamp-club-swamp-extensions
                          mapping (a .md)
testdata/
  factories/             software-factory's examples, ported
```

## The factory definition format

A factory definition is **checked** by the factory's `validate` method, and
every problem is reported with its path. The schema check runs again whenever a
work item starts on it; the graph analysis (below) runs only in `validate`.
Editing a factory with `swamp model edit` does not check it: swamp only applies
a lenient version of a model's schema, so the full check is gatorwalk's own.

A factory definition is ported from software-factory's definition schema:
stages, work, artifacts, evidence, transitions and gates. Three things change:

- **Payload schemas are standard JSON Schema, draft 2020-12**, with standard
  meaning. Two stricter rules apply when a factory definition is checked:
  unknown keywords and unknown `format` names are rejected, so a typo is an
  error, not a silent no-op. References must be local (`#/...` or `#anchor`),
  and nothing is fetched.
- **Runtime values are bare CEL**, in `work.bindings`, `cel` gates and a
  `human-approval` gate's `when` (the gate applies only while it is true). Never
  use `${{ }}`, swamp's own expression syntax: a factory definition rejects
  `${{` anywhere. swamp no longer evaluates the definition's text, since it
  lives in its own file rather than in `globalArguments`, but the rejection
  stays until go-live settles it (see DESIGN.md, "Where a factory definition
  lives"), so a prompt cannot yet contain a literal `${{` (a GitHub Actions
  snippet, say).
- **Prompts refer to bindings as `{{name}}`**, in `systemPrompt` and `command`.
  A placeholder holds a binding name, never an expression, and an undeclared
  name is an error when the factory definition is checked. `{{` around anything
  that is not a bare name (`{{ .Values.x }}`, `{{#each}}`) is literal text, and
  `\{{` is a literal `{{`. At dispatch, a null or missing value fails the stage
  rather than rendering blank. See [DESIGN.md](DESIGN.md) for why.
- **References are checked when the factory definition is checked.** This covers
  transition targets, gate references, `reviews` links and injected context, and
  every problem is reported with its path. A name is one kind: an artifact and
  evidence may not share it, since `context.inject` names a product alone. A CEL
  macro or `cel.bind` may not bind a variable named after the CEL vocabulary
  (`item`, `stage`, `artifacts`, `evidence`, `validations`).
- **The factory definition is analysed as a graph** by `validate`. Errors are
  stages that cannot be reached, stages with no way to a terminal stage,
  transitions whose gates can never pass (such as `evidence-recorded` on
  evidence another stage records). They fail `validate`. Warnings are logged:
  exits that can pass together with no person choosing, loops whose only way out
  is a global transition such as `abandon`, loops bounded only by the default
  cycle limit, products that some path to a stage does not produce, and
  transitions only a cycle override opens. Each finding gives its path, the
  stage it is judged from, and a trace of stages from the initial stage. See
  [DESIGN.md](DESIGN.md), "Graph validation".
- **A stage may name a tracker status key**, `projection: { status: <key> }`,
  new in gatorwalk. When a work item enters the stage, the projection publisher
  moves its ticket to the status the tracker adapter's `statuses` argument maps
  that key to. A stage without one leaves the ticket's status alone. See
  [DESIGN.md](DESIGN.md), "The projection publisher".
- **A stage may list projection entries**, `projection.entries`, new in
  gatorwalk: which of its journal events become structured entries in the
  ticket's history (the Lab's lifecycle entries). Each has a trigger
  (`on:
  enter`, `on: { record: <product> }` or `on: { approve: <gate id> }`),
  a `step`, `emoji` and `summary` (whose `{{field}}` placeholders are fields of
  the recorded payload), and optionally `match` (payload fields that must hold a
  value), `cycle` (`first` or `later`), `status` (the status key labelling it,
  defaulting to the stage's), `verbose` and `setsType` (a payload field holding
  the ticket type to set first). Two entries on one trigger must be told apart
  by `cycle` or `match`. To a tracker that keeps entries, a factory definition
  that declares any is published as entries instead of comments.

## Loops

A factory definition is a directed graph that contains cycles. It is
deliberately not a DAG: rework, re-checking and revision are loops back to
earlier stages, and every loop is bounded. The swamp workflows that do a stage's
work are acyclic, which is why parallel work belongs there (#2699). Looping
happens between stages; concurrency happens inside one.

A loop is an ordinary transition back, and each re-entry into a stage is a new
cycle of it. The controls:

- **Per-cycle evidence.** Gates count only what the current pass recorded, and
  an approval is voided when what it approved changes.
- **A reason to loop.** Rework exits are gated on data (an open blocking
  finding); manual ways back need a person.
- **The cycle limit** (`maxCycles`, default 5) and cycle overrides, which
  accumulate until a reset.
- **The dispatch cap** (`maxDispatchesPerCycle`, default 2) and dispatch
  overrides, against a runaway loop within one pass.
- **Routing on the loop count** with a `max-cycles` gate, such as escalating
  after a number of passes.
- **Escape hatches.** Global transitions are exempt from cycle limits, and a
  reset starts a new era.
- **Design-time checks** in `validate`'s graph analysis, and **measurement** of
  rework in the per-item metrics.

See [DESIGN.md](DESIGN.md), "Loops and their controls", for each control with an
example.

## Example factory definitions

gatorwalk-factory ships no factory definition of its own. The skill carries
examples to copy into a factory and change, under
`.claude/skills/gatorwalk-factory/references/examples/`, so they reach every
agent the skill is installed for. Each opens with a comment saying what it is
for and what to change first, and each passes `validate`
(`extensions/models/engine/examples_test.ts`):

- `minimal.yaml`: one stage of work, then done.
- `starter.yaml`: a general change, from plan through plan review, implement,
  verify and code review to release.
- `build-swamp-extension.yaml` and `swamp-club-swamp-extensions.yaml`, below.

`build-swamp-extension.yaml` takes a change to a swamp extension from plan to
release:

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

This is the tier 1 factory definition and gatorwalk-factory's own process.

`swamp-club-swamp-extensions.yaml` is a real-world example, to read rather than
copy whole: the process this repository runs with `@swamp/issue-lifecycle` and
its verification conventions, from a Lab issue to the session summary:

```
triage → [reproduce] → plan → plan-review → implement → conformance-review
  → verify → attest → pull-request → merge → release → notify → summary
  → done
```

- **It drives a Lab issue as issue-lifecycle does.** Through the swamp-club
  adapter (`@swamp/gatorwalk-factory/swamp-club`), `publish` moves the issue's
  status, writes issue-lifecycle's lifecycle entries under the same step names
  and sets the type from the classification; `attest` and `notify` post the
  attestation and the thank-you through the adapter. issue-lifecycle stays and
  drives every other issue: the adapter's `claim` refuses an issue it already
  drives. `swamp-club-swamp-extensions.md` lists each entry and where its
  summary differs.
- **People decide at six points:** a bug that cannot be reproduced, plan
  approval, the verification checklist, opening the pull request, what to do
  after a failed pull request, and abandoning the work. Five are approvals;
  after a failed pull request the person picks one of two manual exits.
- **Verification runs as one workflow stage.** Its wrapper workflow,
  `verification/workflow-verify.yaml`, runs verify-build and verify-reviews at
  the same time as nested runs. The stage records one outcome with both runs in
  it. This is how a factory definition, which is in one stage at a time, runs
  things in parallel; see DESIGN.md, "Parallel work inside one stage". Every
  exit from verification to the merge is bound to the commit in
  `change-summary`.

These two and `starter.yaml` name a status key on their stages, using the Lab's
own status names: the planning stages are `triaged`
(swamp-club-swamp-extensions' `triage` stage has no key, so the issue's status
is left alone while it is triaged), the work through release is `in_progress`,
`done` is `shipped` (in swamp-club-swamp-extensions, also `notify` and
`summary`), and `abandoned` is `closed`. The Lab adapter maps them as they are;
a Linear instance maps them to its team's names.

`swamp-club-swamp-extensions.md` is not a factory definition. It maps every
phase, gate and human stop of today's process onto the format, and lists what
the format could not express.

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

# A factory, naming its definition file (a repo-relative YAML path), and
# that file, copied from a starter: one of the skill's examples. Edit the
# file itself; it is the one copy of the definition.
swamp model create @swamp/gatorwalk-factory/factory team \
  --global-arg definition=factories/team.yaml --json
swamp model method run team init --input from=starter --log
swamp model method run team validate --log
swamp model method run team design_page --log    # the definition as a page
swamp data get team design-page --json | jq -r .content > team.html
# Prints a work-item key made from the title, such as
# build-swamp-extension-add-list-method-r2ne. start also takes any unused name.
swamp model method run team new_key --input 'title=Add a list method' --log

# A work item, named by that key.
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input factory=team --log
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

`publish` replays a work item's journal to the issue its `externalRefs` name (to
a tracker that keeps lifecycle entries, with a factory definition that declares
them, it writes those instead of comments): a comment for each event a person
needs (the start, each stage entered, approvals, waits at a human stop, resets,
the finish), and the status when the stage's status key changes. Run it after
any change; it delivers only what is new, and after a failure a re-run picks up
where it stopped. It is the only writer of a work item's ticket status.

## swamp-club Lab

`@swamp/gatorwalk-factory/swamp-club` connects a swamp-club server. It uses the
same key as swamp and issue-lifecycle: the `apiKey` global argument if set,
otherwise `SWAMP_API_KEY`, otherwise your `swamp auth login` (whose key is only
ever sent to the server you logged in to). Status moves past open or closed,
assignment, attestations, lifecycle entries, the type and the team check need an
admin key. See [DESIGN.md](DESIGN.md), "The swamp-club Lab adapter".

```bash
swamp model create @swamp/gatorwalk-factory/swamp-club lab --json
swamp model method run lab fetch_issue --input issue=2631 --log
swamp model method run lab set_status --input issue=2631 --input status=triaged --log
swamp model method run lab assign --input issue=2631 --log
swamp model method run lab post_attestation \
  --input attestation="$(cat /tmp/attestation-<SHA>.json)" --log
swamp model method run lab set_type --input issue=2631 --input type=bug --log
swamp model method run lab team_member --input issue=2631 --log
swamp model method run lab thank_author --input issue=2631 --log
```

`assign` without `username` assigns your stored login's user, and only on the
server that login is for. It drops, and names, any assignee no longer on
swamp-club's team, since swamp-club refuses the whole list otherwise. `comment`
posts a ripple. Statuses only move forward, one step at a time, which
`set_status` walks for you; moving back is refused. `publish` works as it does
for Linear (above), and skips a status move the issue cannot make, such as back
to `triaged` after a reset, rather than failing. For a factory definition that
declares projection entries it writes lifecycle entries instead of ripples, and
the type an entry reads (`setsType`) just before it; it is the only writer of a
work item's status and type. `claim` refuses an issue that issue-lifecycle
drives in the repository (an instance `issue-<N>`), even a finished one.
`post_attestation` posts an attestation built elsewhere (`deno task
build-attestation`), and posting the same one again for a commit writes nothing.
`fetch_issue` records the issue's body, type, author and ripples too. `set_type`
sets the type by hand. `team_member` says whether the issue's author is on
swamp-club's team, failing rather than guessing when a lookup fails.
`thank_author` posts issue-lifecycle's thank-you ripple to an author outside the
team and skips a team member; a failed lookup posts nothing, and `force=true`
skips only the team check. `assign` also records issue-lifecycle's `assigned`
entry, best effort.

## Start from a ticket

Every tracker adapter has `claim`, which starts a work item from a ticket and
makes sure the same ticket never starts two at once:

```bash
swamp model method run lab claim --input issue=2631 --input factory=team --log
```

With no work item for the ticket, `claim` reserves a fresh key, records it in
the adapter's ticket index (`ticket-<stable id>`), and prints the work-item
`start` command to run, with the ticket's `externalRefs`. The record is written
before the work item starts, so if anything fails in between, `claim` again
hands back the same key and command. Once the work item has started, `claim`
names it and its stage. Once it has finished, the ticket can claim a new one;
the record keeps the earlier keys. `factory` is needed only when a new key is
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

`integration/extension/skill_test.ts` keeps it honest: every command the skill
shows must name a real method with inputs it accepts, and the worked example
(`references/examples/build-swamp-extension.md`) runs, as written, from start to
done on the real engine.
