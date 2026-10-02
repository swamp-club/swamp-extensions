# stagecraft reference

The detail behind the [README](README.md): the factory definition format, the
methods of each model type, the studio's controls, metrics and every tracker
adapter. An agent with the stagecraft skill (`.claude/skills/stagecraft/`) runs
these for you; this page is for when you want to know exactly what it does. Why
it works this way is in [DESIGN.md](DESIGN.md).

## Contents

- [The model types](#the-model-types)
- [The factory definition format](#the-factory-definition-format)
- [Loops](#loops)
- [Example factory definitions](#example-factory-definitions)
- [Saved scenarios](#saved-scenarios)
- [Running it](#running-it)
- [The studio](#the-studio)
- [Summary and metrics](#summary-and-metrics)
- [Built-in tracker](#built-in-tracker)
- [Linear](#linear)
- [Start from a ticket](#start-from-a-ticket)
- [swamp-club Lab (swamp-club team only)](#swamp-club-lab-swamp-club-team-only)

## The model types

- **factory**: a model of type `@swamp/stagecraft/factory`, created
  once and named, for example `team`. You run `validate` on it, and start
  work items on it.
- **factory definition**: the YAML document of a factory's stages, work,
  transitions and gates. It lives in the factory's own model definition,
  `models/@swamp/stagecraft/factory/<factory>.yaml`, under
  `globalArguments.definition`, beside the factory's `tracker` and its saved
  `scenarios`. swamp checks it against the factory type's schema, `validate`
  checks it in full, and a work item pins a copy of it when it starts. In code
  and data it is `definition`.
- **work item**: one piece of work moving through a factory, a model of type
  `@swamp/stagecraft/work-item` named by a key: its ticket's id (`team-1`,
  `abc-12`), which the tracker's `claim` gives, or a name chosen by hand.

## The factory definition format

A factory definition is **checked** by the factory's `validate` method, and
every problem is reported with its path. The schema check runs again whenever a
work item starts on it; the graph analysis (below) runs only in `validate`.
Editing a factory with `swamp model edit` does not check it: swamp only applies
a lenient version of a model's schema, so the full check is stagecraft's own.

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
  `${{` anywhere. The definition lives in the factory's `globalArguments`,
  where swamp evaluates every `${{ }}` before each method runs, so a prompt
  cannot contain a literal `${{` (a GitHub Actions snippet, say). See
  DESIGN.md, "Where a factory definition lives".
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
  (`item`, `stage`, `artifacts`, `evidence`, `validations`). A fixed product
  name in CEL (`artifacts.plan`, `evidence["ci"]`, `"plan" in artifacts`,
  `has(...)`) must name a declared product of that kind.
- **The factory definition is analysed as a graph** by `validate`. Errors are
  stages that cannot be reached, stages with no way to a terminal stage,
  transitions whose gates can never pass (such as `evidence-recorded` on
  evidence another stage records). They fail `validate`. Warnings are logged:
  exits that can pass together with no person choosing, loops whose only way out
  is a global transition such as `abandon`, loops bounded only by the default
  cycle limit, products that some path to a stage does not produce (except
  context from an earlier pass: a product injected from the stage's own loop),
  including products a binding, `cel` gate or approval's `when` reads without
  testing for them with `has()`, and transitions only a cycle override opens.
  Each finding gives its path, the stage it is judged from, and a trace of
  stages from the initial stage. See
  [DESIGN.md](DESIGN.md), "Graph validation".
- **A factory definition names the kind of tracker it is written for**,
  `tracker: { kind: builtin | linear }` (the built-in tracker when absent), new
  in stagecraft. The factory names the tracker instance (its `tracker` global
  argument), which keeps the tracker's own settings; `validate` and `start`
  refuse an instance of another type than the kind needs, and `start` pins the
  binding in the run record. See [DESIGN.md](DESIGN.md), "The seam".
- **A stage may name a tracker status key**, `tracker: { status: <key> }`,
  new in stagecraft. When a work item enters the stage, the publisher
  moves its ticket to the status the tracker adapter's `statuses` argument maps
  that key to. A stage without one leaves the ticket's status alone. See
  [DESIGN.md](DESIGN.md), "The publisher".
- **A stage may list tracker entries**, `tracker.entries`, new in
  stagecraft: which of its journal events become structured entries in the
  ticket's history. Each has a trigger
  (`on: enter`, `on: dispatch` for the stage's first dispatch in a cycle,
  `on: { record: <product> }`, `on: { approve: <gate id> }` or
  `on: { transition: <name> }` for leaving the stage by it),
  a `step`, `emoji` and `summary` (whose `{{field}}` placeholders are fields of
  the recorded payload; `{{$cycle}}`, `{{$version}}`, `{{$version.<product>}}`
  and, on dispatch, `{{$input.<name>}}` come from the event, and
  `{{count findings severity=critical}}` counts a list's items), and optionally `match` (payload fields that must hold a
  value), `cycle` (`first` or `later`), `status` (the status key labelling it,
  defaulting to the stage's), `verbose`, `setsType` (a payload field holding
  the ticket type to set first) and `linkPr` (a payload field holding a pull
  request url to link on the ticket first, where the tracker links pull
  requests). Two entries on one trigger must be told apart
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
  overrides, against a runaway loop within one pass. A dispatch refused at the
  cap parks the work item until a person grants an override; the park is
  journaled, measured as a wait and published to the ticket.
- **Routing on the loop count** with a `max-cycles` gate, such as escalating
  after a number of passes.
- **Escape hatches.** Global transitions are exempt from cycle limits, and a
  reset starts a new era.
- **Design-time checks** in `validate`'s graph analysis, and **measurement** of
  rework in the per-item metrics.

See [DESIGN.md](DESIGN.md), "Loops and their controls", for each control with an
example.

## Example factory definitions

stagecraft ships no factory definition of its own. The skill carries
examples to write into a factory and change, under
`.claude/skills/stagecraft/references/examples/`, so they reach every
agent the skill is installed for. Each holds a `definition:` block and a
`scenarios:` block, the part of a factory's `globalArguments` the agent writes
in beside its `tracker`. Each definition's description says what it is for and
what to change first, and each example passes the factory type's schema and
`validate` with its saved scenarios
(`extensions/models/engine/examples_test.ts`):

- `minimal.yaml`: one stage of work, then done.
- `starter.yaml`: a general change, from plan through plan review, implement,
  verify and code review to release.
- `content-review.yaml`: a piece of writing, from draft through an editorial
  review and a person's approval to published.
- `incident-review.yaml`: an incident, from timeline through analysis, review
  and a person's sign-off on the action items to published.
- `openapi-models.yaml`: an API's OpenAPI spec, or a slice of it, mapped to
  swamp models, implemented as an extension, checked, reviewed, optionally
  tried against the live API, and released.
- `build-swamp-extension.yaml`, below.

`build-swamp-extension.yaml` takes a change to a swamp extension from plan to
release:

```
plan → plan-review → implement → check → code-review → release → done
```

- **People decide at four points:** approving the plan, waiving the quality
  score, releasing, and abandoning the work.
- **Manual ways back:** a person can always send the work back by hand (`revise`
  after either review, `recheck` for a flaky check). So declining an approval
  never leaves `abandon` as the only way out. `revise` after the plan review
  needs the person's feedback, recorded as `plan-feedback` evidence, and the
  next plan is handed it with the last plan and its review.
- **Quality waiver:** `check` normally needs `swamp extension quality` to pass.
  An extension with no manifest yet can't be scored, so a person can waive the
  score instead.
- **Two release routes:** `swamp extension push`, or a pull request that CI
  publishes when it merges. A pull-request release must record its verification
  attestation id and its merge commit. A registry push must publish the version
  recorded in `change-summary`.
- **Commit binding:** the checks and the release must name the commit recorded
  in `change-summary`, which is the commit that was reviewed. A squash merge's
  own commit is recorded separately, as `mergeCommit`.

This is the tier 1 factory definition and stagecraft's own process.

`build-swamp-extension.yaml` and `starter.yaml` name a status key on their
stages, using the built-in tracker's default statuses: the planning stages are
`open`, the work through release is `in_progress`, `done` is `shipped`, and
`abandoned` is `closed`. The built-in tracker takes them as they are; a Linear
instance maps them to its team's names.

## Saved scenarios

A saved scenario is a known path through a factory, written down so a change to
the factory definition that breaks it fails `validate`. A factory keeps them in
its model definition, as the `scenarios` list under `globalArguments`, beside
its `definition`; no two share a name. swamp checks their shape before every
factory method. `validate` runs every one on the real engine, in process
against an in-memory store, and fails naming each step that did not do what its
scenario said, as `scenarios.<index> (<name>) step <n> (<label>): <message>`.
An agent writes them (the skill's `references/scenarios.md`); nothing else
creates them. One entry:

```yaml
scenario: plan-waits-for-approval
description: A reviewed plan waits for a person's approval, then goes on to implement.
externalRefs: { builtin: "ext-12" }
steps:
  - record: { artifact: plan }
    payload:
      summary: Add list
      steps: [{ description: Add list, files: [x.ts] }]
      testingStrategy: Unit tests
      versionBump: { needed: true, reason: New method }
  - move: submit
  - record: { artifact: plan-review }
    payload: { findings: [] }
  - move: approve
    expect: { refused: "awaiting approval 'plan-approval'" }
  - wait: 1800
    note: The person reads the plan and the review
  - approve: plan-approval
  - move: approve
  - expect: { stage: implement }
```

(for a factory `team` whose definition is `build-swamp-extension.yaml`).

One engine call per step:

- `record: { artifact: <name> }` or `record: { evidence: <name> }`, with
  `payload`: record a product.
- `approve: <gate id>`, `decline: <gate id>`: a person's decision.
- `move: <transition>`: take a transition; `manual: true` is a person's go for
  a manual one.
- `override: { stage, note }`: a person grants one more entry into a stage past
  its cycle limit.
- `wait: <seconds>`: time passes on the scenario's clock.
- `expect: { stage: <stage> }`, as a step of its own: the work item must be at
  that stage.

Any step but a wait can carry `expect: { refused: "<text>" }`: the step must be
refused, and the reason must contain the text (`""` accepts any refusal). That
pins gate messages. A step can also carry a `note`.

The clock moves one second per engine reading, plus each `wait`. Records and
automatic moves are an agent's; approvals, declines, overrides and manual moves
are a person's. See [DESIGN.md](DESIGN.md), "Saved scenarios".

## Running it

In a swamp repo with stagecraft pulled:

```bash
swamp extension pull @swamp/stagecraft

# The tracker work items publish to: the built-in one, with no external
# tracker (see "Built-in tracker" below).
swamp model create @swamp/stagecraft/tracker board \
  --global-arg prefix=team --json

# A factory, bound to its tracker. Then write a definition into it: the
# definition: and scenarios: blocks of one of the skill's examples, under
# globalArguments: in models/@swamp/stagecraft/factory/team.yaml.
# That file is the one copy of the definition; edit it there.
swamp model create @swamp/stagecraft/factory team \
  --global-arg tracker=board --json
swamp model validate team                        # swamp's own schema check
swamp model method run team validate       # that, the graph, scenarios
# A ticket for the work, on the factory's tracker; the built-in tracker
# numbers it with its prefix: team-1.
swamp model method run board create --input 'title=Add a list method' \
  --input 'body=Add a list method to the extension.' --input type=feature
# Reserves the key, the ticket's id, and prints the start command to run.
swamp model method run board claim --input issue=team-1 --input factory=team

# A work item, named by that key. The title is kept in its run record:
# status, the summary and the studio show it beside the key.
swamp model @swamp/stagecraft/work-item method run start team-1 \
  --input factory=team --input 'title=Add a list method' \
  --input 'externalRefs={"builtin":"team-1","builtin.display":"team-1"}'
swamp model @swamp/stagecraft/work-item method run status team-1
```

`start` also takes any unused name chosen by hand, for work with no ticket.
`title` is optional: a work item started without one shows its key where a
title would be.

`status` prints the stage and cycle; the `expectedStage`, `expectedCycle` and
`expectedEra` every write must pass back; each exit's readiness, with its
failures and the ids of its human-approval gates (`[human: plan-approval]`, or
`[approval not required now: regression-review]` for a conditional approval
whose `when` is false); the stage's work mode and dispatch count; and any
payload rejections. `dispatch` prints the whole dispatch packet, including the
products the stage must record and each one's schema; for a dispatch stage it
prints one ready-to-send prompt per subagent instead of the rendered prompt,
with result files under `resultDir` (a new temporary directory when omitted). Writes are
`record_artifact`, `record_evidence`, `dispatch`, `record_usage`, `approve`,
`decline`, `grant_override`, `advance`, `reset` and `retarget`. A refused write
fails with its reason and writes nothing. A payload that breaks its schema also
fails, but is kept on the work item as retry feedback. A write that succeeds
ends its output with the status that follows it, the same block `status`
prints, so no separate `status` call is needed after one. Run methods without
`--log`: swamp prints a method's output without it, and twice with it.

## The studio

The studio is a local page for looking at the factories in a repo, reloaded as
their model definitions change. It is read-only. Edits come from the agent, and the page
shows them as the agent saves.

- **Design** draws a factory's definition: one row per tracker status, stages in
  flow order, each exit a port with pips for its gates (gold where a person
  decides), and every forward edge, loop back and global exit. The page runs
  stagecraft's own schema check and graph analysis on the definition, as
  `validate` does, every time the file changes. Select a stage, an exit or a gate to inspect it;
  select a finding to walk its trace on the graph and underline its path in the
  source. Stages that changed since you last looked are marked until you select
  them.
- **Copy reference** on any stage, exit, gate or finding copies one line to
  paste to the agent, naming the model definition file and the path in it,
  such as
  `models/@swamp/stagecraft/factory/team.yaml globalArguments.definition.stages.2.transitions.0 (exit submit: plan → review)`.
- **Keyboard:** the graph is one tab stop. Arrows move between stages, Enter
  steps into a stage's exits, Enter on an exit follows it to the next stage, →
  steps into an exit's gates, Esc steps back out, and `c` copies a reference.
- **Simulate** plays the factory's saved scenarios (`globalArguments.scenarios`
  in the same file) on the real engine in the browser, and plays them again
  every time the file changes, with a pass or fail for each and the steps that
  did not go as expected. Step through the frames to see the stage, its exits
  as `status` reports them (READY, PERSON or BLOCKED, with the engine's
  messages), the journal and the metrics. From any frame, **walk from here**:
  take an exit, approve or decline, override a cycle limit, wait, or record a
  payload a saved scenario uses, and the engine goes on from there. **Copy as
  scenario** gives the walk as one entry for `globalArguments.scenarios`, to
  paste to the agent, which saves it. Space plays, ← and → step.
- **Board** lists every work item started on the factory, in a column for its
  stage, in the order Design draws the stages; a work item in a stage the
  current definition no longer has gets a column of its own at the end.
  Finished stages show a count, and **Show finished** lists their work items.
  Each card shows the title (else the key), then the key on one line (in
  full on hover and focus) and the ticket's display id when it is not the key
  itself (the built-in tracker's ticket id is the key), time in the stage,
  the cycle when above 1, and, in words and colour: **waiting on a
  person** (the exits a person holds, as the run's `awaiting` events record
  them, and for how long), **parked** at the dispatch cap or by a cycle limit
  (an exit whose gates all pass but whose target stage is at its limit, so only
  a cycle override lets it through), and **stale pin** (pinned to another
  definition than the file's current one). Filters keep any of those, and
  search matches the key or title. A column shows 50 cards, then **Show
  more**. The cards move as work items change: while a board is open, `serve`
  reads each of its work items' run record versions every 3 seconds and tells
  the page when one is written, added or removed. **Keyboard:** each column is
  one tab stop; ↑ and ↓ move between its cards, ← and → to the next column's,
  Home and End to the first and last, and Enter opens the work item.
- **Work item** (`/w/<key>`, from a Board card or the bar's **go to work
  item** box, which takes a key) draws one work item on the definition it
  pinned, which may be older than the file's; a notice says so. Stages it
  entered show how many times (this era), the current stage glows, exits it
  took are solid with how often, and stages it never entered are dimmed.
  **Now** shows where it waits, from the code `status` prints from: a person's
  decision and which gates, evidence a person records, the stage's dispatch,
  parked at the dispatch cap, each exit's readiness with the engine's own
  reasons, and how long it has been in the stage entry. **Timeline** is the
  journal (products, approvals and declines with the person, moves,
  overrides, dispatches, resets); ↑ and ↓ move through it, and Enter selects
  the entry's stage on the graph. **Metrics** is Simulate's, on the real run.
  **Ticket**, which a work item with a ticket opens on, shows the ticket as
  its tracker last recorded it: title, status, labels or type, assignees,
  created and updated times, its description (markdown, drawn safely: no
  markup or script in it runs), and its comments and lifecycle entries oldest
  first, each labelled a person's comment, one stagecraft posted, or an entry.
  Its relations (parent, blocked by, duplicate, related) link to the work item
  on the other ticket, in any factory, and an external ticket links out to
  its tracker, such as Linear. It is read from the tracker's records with no
  network call, and says when its copy was recorded: run the tracker's `fetch_issue`
  for a newer one, then **Refresh**. A work item with no ticket, or one the
  tracker has no record of yet, says so. **Scenario** shows this era of the run as one
  entry for `globalArguments.scenarios`, with the payloads it recorded, replays
  it on the pinned definition to say whether it ends where the run is, and
  notes what a scenario cannot carry (dispatches, dispatch overrides,
  retargets, an earlier era). It is made again when the journal grows, and
  says when it was made from a newer read of the run than the page shows.
  **Copy reference** gives the work item, its stage and the `status` command
  to paste to the agent. The page reads the work item again when it changes.
- **Addresses:** each view has its own path: `/f/<factory>/design`,
  `/f/<factory>/simulate`, `/f/<factory>/board`, and `/w/<key>` for one work
  item. `/` opens the last factory you looked at. Back and forward move between
  views. The bar's Design, Simulate and Board are links: the one shown is
  marked (a work item's page marks Board, under a "Board › key" breadcrumb),
  and the browser tab's title says where you are.

```bash
# Once per repo.
swamp model create @swamp/stagecraft/studio studio --json
# Logs the URL, such as http://127.0.0.1:38813/, and runs until Ctrl-C.
swamp model method run studio serve
swamp model method run studio serve --input port=8123   # a fixed port
```

The server listens on 127.0.0.1 only, answers only requests addressed to it from
its own page, and serves nothing but the page, each factory's model
definition file, at the path swamp's definition repository gives, and what
the Board needs of its work items, which it reads with swamp's data query
(`GET /api/work-items?factory=<name>`, `GET /api/work-items/<key>` for
one, and `GET /api/work-items/<key>/ticket` for its ticket), so it works whatever datastore holds them. `serve` holds the
studio's lock while it runs, so a second `serve` of the same studio waits; it
never takes a factory's lock. See [DESIGN.md](DESIGN.md), "The studio server".

## Summary and metrics

`summary` is a read that prints the work item's timeline, per era, and its
metrics as markdown. The `@swamp/stagecraft/work-item-summary` report
runs after it and stores the same markdown, with the metrics and timeline as
JSON:

```bash
swamp model @swamp/stagecraft/work-item method run summary <key>
swamp report get @swamp/stagecraft/work-item-summary --model <key>
```

Every write also stores a `metrics` record on the work item: time in each stage
and cycle, rework (re-entries, review rounds, declines, rejected payloads),
waits at human stops (including a park at the dispatch cap, ended by a
dispatch override), dispatches and retries, overrides, and token usage, marked
attested. It is computed from the run record alone and names the journal version
it was computed from. A dashboard reads every work item's metrics in one query:

```bash
swamp data query 'modelType == "@swamp/stagecraft/work-item" && name == "metrics"' --json
```

If a metrics write failed, or the work item has not committed since metrics were
introduced, `rebuild_metrics` rewrites the record from the run:

```bash
swamp model @swamp/stagecraft/work-item method run rebuild_metrics <key>
```

See [DESIGN.md](DESIGN.md), "Summary and metrics", for what each metric means.

## Built-in tracker

`@swamp/stagecraft/tracker` keeps tickets in swamp data, for a project
with no external tracker. It makes no network call. Keep one instance per
project. See [DESIGN.md](DESIGN.md), "The built-in tracker".

```bash
swamp model create @swamp/stagecraft/tracker board --json
# In the printed definition file, set globalArguments:
#   prefix: cue                 # ticket ids are cue-1, cue-2, ...; default: the instance's name, cut to 12
#   statuses: [open, in_progress, shipped, closed]   # the default
#   types: [bug, feature, security]                  # the default
swamp model method run board create --input title="Board shortcuts" \
  --input body="Keys for the board." --input type=feature
swamp model method run board claim --input issue=cue-1 \
  --input factory=team
swamp model method run board publish --input workItem=<key>
```

Ticket ids are `<prefix>-<n>`: `prefix` is lowercase letters, digits and `-`,
at most 12 characters, and `n` is counted per prefix in the tracker's own data
(a `counter-<prefix>` record). A new counter starts above the highest number any
ticket or work item with that prefix already has, so a recreated tracker never
reuses an id; a name one of its own tickets or any model already has is
passed over. Two built-in trackers with one prefix can still both file the
same id, and `claim` then qualifies the second work item's key. The
counter is unique within one swamp repository's data: clones with separate
data can each file `cue-5`. Changing the prefix affects only new tickets. A
ticket's `issue-<id>` record is the
ticket itself. A new ticket starts in the first status, and a ticket may move
between any two statuses; `statuses` keys are also the status names, so a
factory definition's status keys name them directly. It keeps lifecycle
entries and the ticket type, so `publish` writes entries for a
factory definition that declares them, and `set_type` sets a type by hand. A
ticket has assignees, swamp usernames: `publish` assigns your stored login's
user when it delivers the work item's start.
`prefix`, `statuses` and `types` are the instance's own settings: a factory
definition names only the kind of tracker (`builtin` unless it says
otherwise), and a factory names the instance with `--global-arg
tracker=board`.

Every tracker relates tickets the same way, by stable id:

```bash
swamp model method run board relate --input issue=<parent> \
  --input type=parent_of --input to=<child>
swamp model method run board unrelate --input issue=<parent> \
  --input type=parent_of --input to=<child>
```

`type` is `parent_of` (`issue` is the parent), `blocked_by` (`issue` waits on
`to`), `related_to` or `duplicate_of` (`to` is the canonical). Relating again,
or removing what is absent, writes nothing, and `workItem` with
`journalVersion` makes either idempotent through the ledger. Every tracker
refuses the same relations: a second parent, a parent cycle, a second
canonical, a duplicate of a duplicate, and a duplicate that has duplicates of
its own. `fetch_issue` reports a ticket's relations, each with its direction;
`related_to` is read with one too. The built-in tracker keeps them on both
tickets.

To mark a duplicate, which also closes it (Linear closes a duplicate itself):

```bash
swamp model method run board mark_duplicate --input issue=<duplicate> \
  --input primary=<primary>
```

`mark_duplicate` moves no work. A duplicate takes none: `claim` refuses it,
naming the primary, and `publish` refuses a work item still at work on it until
a driver moves the work, by `retarget` onto the primary or the definition's
duplicate exit. A stage's `tracker.duplicate` (`on: { approve: <gate> }`,
`record`, `field`) has `publish` do the same marking when that human-approval
gate is approved, with the primary's stable id read from the recorded product's
field. See [DESIGN.md](DESIGN.md), "Duplicates".

## Linear

`@swamp/stagecraft/linear` connects a Linear workspace. Keep one instance
per workspace; its API key comes from a vault. See [DESIGN.md](DESIGN.md),
"Trackers".

```bash
swamp vault create local_encryption secrets
swamp vault put secrets linear-token          # prompts for the key
swamp model create @swamp/stagecraft/linear linear --json
# In the printed definition file, set globalArguments:
#   apiToken: ${{ vault.get(secrets, linear-token) }}
#   statuses: { open: Todo, in_progress: In Progress, shipped: Done, closed: Canceled }
#   teamId: <the team create files issues in>
#   prefix: abc                 # the team's short name; keys are ABC-12 as-is: abc-12
#   types: { bug: Bug, feature: Feature }
swamp model method run linear fetch_issue --input issue=ABC-1
swamp model method run linear create --input title="A new issue" \
  --input body="What and why." --input type=bug
swamp model method run linear publish --input workItem=<key>
swamp model method run linear assign --input issue=<UUID>
```

The API key needs write access, and may be limited to the teams the factory
files in. `teamId` is the team's UUID, not its key (ENG). A new issue starts in
the team's default status, often Backlog, until `publish` moves it.

`fetch_issue` prints the issue's UUID and the `externalRefs` to start a work
item with, and records the issue's assignee. `comment` and `set_status` take the UUID; given `workItem` and
`journalVersion`, a repeat of the same pair writes nothing to Linear. `create`
files an issue in the `teamId` team. Linear has no issue type, so `types` maps
each type to a label name, matched exactly among the team's and the workspace's
labels; an unmapped type, or a label the team cannot use, is refused.
`relate` and `unrelate` (see "Built-in tracker") take UUIDs: `parent_of` sets
the child's parent, `blocked_by` is Linear's blocks read the other way, and
Linear may move an issue marked a duplicate to its own Duplicate status, which
swamp does not undo; Linear moves it back out when the relation is removed. Up
to 250 relations of each kind are read per issue.

`publish` assigns the issue to the API key's owner when it delivers the work
item's start: every Linear write acts as that user, and no swamp login maps to
a Linear user. A Linear issue has one assignee, so a person already assigned is
replaced, and the log names them. It tries once, and if it cannot it warns and
goes on. `assign` assigns by hand, to the key's owner or, with
`--input user=<Linear user id>`, to someone else; assigning the one already
assigned writes nothing.

`publish` replays a work item's journal to the issue its `externalRefs` name (to
a tracker that keeps lifecycle entries, with a factory definition that declares
them, it writes those instead of comments): a comment for each event a person
needs (the start, each stage entered, approvals, waits at a human stop, a park
at the dispatch cap and the dispatch override that ends it, resets, the
finish), and the status when the stage's status key changes. Run it after
any change; it delivers only what is new, and after a failure a re-run picks up
where it stopped. It is the only writer of a work item's ticket status, and it
runs only on the tracker instance the work item's factory was bound to at
start. The work item's `status` reads that instance's publish cursor, with no
network call, and says `tracker '<instance>' behind by N event(s)` while
`publish` has events to deliver. A status move the tracker refuses (a key
missing from the instance's `statuses` argument, say) fails the publish but
does not hold back later events: they are still delivered, the next publish
retries only the move, and `status` says
`tracker '<instance>' could not move the ticket to '<key>'` and why until it
lands.

## Start from a ticket

Every tracker adapter has `claim`, which starts a work item from a ticket and
makes sure the same ticket never starts two at once:

```bash
swamp model method run board claim --input issue=ext-12 \
  --input factory=team
```

With no work item for the ticket, `claim` reserves a key, the ticket's id as a
key: `ext-12` for a built-in ticket, `abc-12` for Linear's `ABC-12`, and the
instance's `prefix` before a number-only id (`ops-2711` for `#2711`).
A later work item on the same ticket adds a number (`abc-12-2`). When another
work item already has the name, which happens only when two trackers share a
prefix, the tracker instance's name qualifies it (`abc-12-linear`, then
`abc-12-linear-2`); if that is taken too, `claim` refuses and says to give one
tracker another prefix. `claim` records the key in the adapter's ticket index
(`ticket-<stable id>`), and prints the work-item `start` command to run, with
the ticket's `externalRefs` and title. The record
is written before the work item starts, so if anything fails in between, `claim`
again hands back the same key and command. If the reserved factory no longer
loads, claiming with another factory moves the reservation to it under the
same key. Once the work item has started,
`claim` names it and its stage. Once it has finished, the ticket can claim a new
one; the record keeps the earlier keys. A work item `retarget` moved to another
ticket counts as finished here, and the `publish` after the retarget moves the
index to the new ticket. `factory` is needed only when a new key is reserved.
`--input dryRun=true` reports the ticket's work item, or that it has none, and
writes nothing. `claim` never writes to the tracker, and a refused claim writes
nothing. A repeat claim refreshes only the ticket's snapshot, not the index
record, so read the key with
`swamp data query 'modelName == "board" && name == "ticket-ext-12"' --select content --json`.
See [DESIGN.md](DESIGN.md), "Start from a ticket".

## swamp-club Lab (swamp-club team only)

The swamp-club Lab tracker is for the swamp-club team's own repositories. It
drives swamp-club Lab issues and needs a swamp-club team account, so it is not
an option for anyone else: use the built-in tracker or Linear. It is not in the
published `@swamp/stagecraft` package; the swamp-club team runs it from this
repository's source.

`@swamp/stagecraft/swamp-club` connects a swamp-club server, for the
swamp-club team. It uses the same key as swamp and issue-lifecycle: the
`apiKey` global argument if set, otherwise `SWAMP_API_KEY`, otherwise your
`swamp auth login` (whose key is only ever sent to the server you logged in
to). Status moves past open or closed,
assignment, attestations, lifecycle entries, the type and the team check need an
admin key. A Lab issue's id is only a number, so a work item claimed from it
is keyed with the instance's `prefix` global argument (default: the instance's
name): `lab-2631`. See [DESIGN.md](DESIGN.md), "The swamp-club Lab adapter".

```bash
# swamp-club team only
swamp model create @swamp/stagecraft/swamp-club lab --json
swamp model method run lab fetch_issue --input issue=2631
swamp model method run lab create --input title="A new issue" \
  --input body="What and why." --input type=bug
swamp model method run lab set_status --input issue=2631 --input status=triaged
swamp model method run lab assign --input issue=2631
swamp model method run lab post_attestation \
  --input attestation="$(cat /tmp/attestation-<SHA>.json)"
swamp model method run lab set_type --input issue=2631 --input type=bug
swamp model method run lab team_member --input issue=2631
swamp model method run lab thank_author --input issue=2631
```

For the swamp-club team: `publish` assigns the issue to your stored login's user
when it delivers the work item's start, so you need not run `assign`; it tries
once, and if it cannot (no login, a login for another server) it warns and goes
on. `assign` is for assigning someone else, or by hand. `assign` without
`username` assigns your stored login's user, and only on the server that login
is for. It drops, and names, any assignee no longer on swamp-club's team, since
swamp-club refuses the whole list otherwise. `comment` posts a ripple. Statuses
only move forward, one step at a time, which `set_status` walks for you; moving
back is refused. `publish` works as it does for Linear (above), and skips a
status move the issue cannot make, such as back to `triaged` after a reset,
rather than failing. For a factory definition that declares tracker entries it
writes lifecycle entries instead of ripples, and the type (`setsType`) and the
pull request (`linkPr`, the issue's `githubPrUrl` and `githubPrNumber`, a later
one replacing it) an entry reads just before it; it is the only writer of a
work item's status, type and pull request link. `claim` refuses an issue that issue-lifecycle drives in the repository (an
instance `issue-<N>`), even a finished one. `post_attestation` posts an
attestation built elsewhere (`deno task build-attestation`), and posting the
same one again for a commit writes nothing. `create` files an issue of type
feature, bug or security (platform needs an admin key) and records it from
swamp-club's reply. `fetch_issue` records the issue's body, type, author and
ripples too. `set_type` sets the type by hand. `team_member` says whether the
issue's author is on swamp-club's team, failing rather than guessing when a
lookup fails. `relate` and `unrelate` (see "Built-in tracker") take issue
numbers; `blocked_by` needs an admin key, as do relations on another user's
issues, and `duplicate_of` leaves the issue's status alone. `thank_author` posts
issue-lifecycle's thank-you ripple to an author outside the team and skips a
team member; a failed lookup posts nothing, and `force=true` skips only the team
check. `assign` also records issue-lifecycle's `assigned` entry, best effort.
