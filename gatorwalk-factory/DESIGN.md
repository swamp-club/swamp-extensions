# gatorwalk-factory design decisions

Decisions about the lifecycle format, with the reasoning behind them. Each names
the code that carries it out.

## Runtime values in prompts: bindings plus `{{name}}` placeholders

**Decision.** Values that come from run data are declared once, as named bare
CEL expressions under a stage's `work.bindings`. Prose fields (`systemPrompt`,
`command`) refer to them by name with `{{name}}` placeholders, which are filled
when the stage is dispatched. Carried out in
`extensions/models/_lib/template.ts` and checked in `lifecycle_schema.ts`.

```yaml
work:
  mode: dispatch
  systemPrompt: |
    Review the change at {{changeUrl}} against the plan.
  bindings:
    changeUrl: evidence["change-request"].payload.url
```

### Why software-factory's `${{ }}` could not be kept

software-factory interpolated `${{ expr }}` anywhere in a definition, at
`status` time. That syntax belongs to swamp: a lifecycle lives in a model's
`globalArguments`, and swamp evaluates every `${{ }}` there when the definition
is saved, before any run data exists (`expression_parser.ts` in swamp matches
`\$\{\{\s*(.+?)\s*\}\}`). software-factory worked around this by keeping the
platform-facing schema loose and re-parsing the raw definition itself. The
result:

- A definition could not be fully validated when it was saved (#1236).
- The same syntax meant two different things, and which one depended on where it
  appeared.

Runtime templating therefore needs a syntax of its own that swamp leaves alone.

### Why `{{name}}`

swamp only matches `${{`, so a plain `{{` passes through untouched. `{{name}}`
is familiar and short. Another delimiter, such as `<%= %>`, would be just as
powerful. The choice only matters for clashes with prompt text, and the rules
below handle the common clashes.

### Why names, not expressions

A placeholder holds a binding name, never CEL. Every expression lives in one
place, `work.bindings`, where:

- it is syntax-checked when the lifecycle is checked;
- its resolved value is recorded on the dispatch, typed, so a stage can later be
  replayed and evaluated against a changed prompt;
- it can also feed a workflow's or method's inputs and be handed to an agent as
  data, not only pasted into prose.

The cost is one extra line per value: you cannot write an expression inline in a
prompt.

### The rules

| Text                                                                    | Meaning                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `{{name}}` or `{{ name }}`                                              | Placeholder. `name` must be a declared binding, or the lifecycle is rejected when checked, with the error's path.                    |
| `{{` around anything else (`{{ .Values.x }}`, `{{#each}}`, `{{ a.b }}`) | Literal text, so most Helm, Handlebars and Go template snippets pass through unescaped.                                              |
| `{{` directly after `{` (`{{{body}}}`)                                  | Literal text, so Handlebars triple-stash passes through.                                                                             |
| `\{{`                                                                   | A literal `{{`, for text that would otherwise be a placeholder.                                                                      |
| `${{`                                                                   | Rejected anywhere in a lifecycle. swamp would evaluate it on save, and it has no escape, so a prompt cannot contain a literal `${{`. |

Bare-word template tags such as Go's `{{end}}` or Handlebars' `{{else}}` look
exactly like placeholders. They are rejected when the lifecycle is checked, as
undeclared bindings, and are written `\{{end}}`. The failure is loud and the
error names the escape. There is no way to write a literal `\` directly before a
live placeholder.

Binding names are identifiers (letters, digits and `_`, not starting with a
digit), so every binding can be used as a placeholder.

At dispatch, strings are inserted as they are, numbers and booleans as text, and
objects and arrays as indented JSON. A placeholder whose value is null or
missing **fails the dispatch** rather than rendering blank. This fixes a
software-factory failure mode: an expression that failed to evaluate was left in
the prompt as literal `${{ … }}`, and a null value became an empty string, so a
broken binding produced a prompt that looked fine and was quietly wrong.

### Alternative considered: no templating at all

The first draft of this format had no substitution. Bound values were handed to
the agent beside the prompt, and the prompt could only mention them by name in
prose. That gives up control over where a value appears in the text, and it
leaves the agent to connect the two. A marked syntax does everything that draft
did and more, so it was dropped.

### Safety

Substitution puts run data (often LLM-written artifacts, or outside text such as
PR titles) into the prompt, where it can carry prompt injection. Placeholders do
not change that risk compared with software-factory. What they add is that every
substituted value is declared and recorded, so what went into a prompt can be
audited afterwards.

## The runtime: one run record per work item

**Decision.** Each work item is one model instance. Inside it, everything about
the work item lives in a single record under the fixed name `run`: current
stage, entries per stage, the index of recorded products, dispatches, approvals
and the journal. Product payloads live in their own records (`artifact-<name>`,
`evidence-<name>`, where `<name>` is declared by the lifecycle), and the run
record indexes each one's version and digest. Code: `_lib/run_record.ts`,
`_lib/run_ops.ts`, `_lib/run_store.ts`.

### Why

- **Identity by instance, not by name.** software-factory served many work items
  from one instance and put the work item into record names. Reading by name
  prefix let one work item read another's records (#2526), and several other
  defects came from the same habit (#1487, #2342). Here no record name carries
  the work item's identity, so the whole family cannot occur.
- **One commit per change.** Every operation writes any payload first and
  commits by writing the run record last. A crash in between leaves a payload
  version that nothing references, which is ignored, never a half-applied change
  (#1566). This needs no `rollbackOnFailure`, which swamp offers only per method
  and refuses under remote placement (`method_execution_service.ts:882-888` in
  swamp).
- **Stale writes are refused.** The per-instance lock serialises method runs
  that write. Every write the caller makes on the strength of what it last read
  also takes the caller's expected stage, cycle and era, and refuses a mismatch,
  so a writer acting on an out-of-date view fails instead of applying (#1998,
  #2343): recording a product, dispatching, approvals, overrides, `advance` and
  `reset`. Only recording usage does not, because usage arrives after the run
  has moved on. The lock does not cover the first run that auto-creates an
  instance (`model_method_run.ts:431` in swamp), so two concurrent first starts
  can still race; that is accepted for solo use until swamp fixes it.
- **Rejections are returned, not thrown.** A product that fails its schema is
  kept on the run as retry feedback and returned to the caller. Throwing would
  let a rollback delete the feedback a retry needs.
- **Swamp never upgrades stored data**, only `globalArguments`. The run record
  carries its own `schemaVersion`, and a record this runtime cannot read is an
  error, never a fresh start.

### Approvals, usage and actors

- An approval records one decision (approve or decline) and a snapshot of every
  product in the era: version and SHA-256 digest over canonical JSON. What a
  person approves is usually declared on an earlier stage (plan-approval is
  decided on plan-review, about the plan).
- Token usage is attached to a dispatch by id, after the work, because it is
  only known then. It is marked attested until a driver measures it.
- Every event records its actor: the platform's caller
  (`tagOverrides.initiatedBy`), or none where swamp gives none (webhook runs,
  remote workers, nested `runModel` calls). A caller may assert who it acts for;
  that is kept beside the principal, never in place of it.

### Retention (for the model type)

Old versions of `run` are safe to collect: the latest holds the whole journal.
Product records are not: approvals and the run index reference specific
versions, and with a numeric `garbageCollection` swamp prunes old versions on
write. Product records need duration-based retention. Building the CEL context
reads each referenced version and checks it against the recorded digest, so a
pruned version, or one changed outside the runtime, is an error rather than
wrong data.

## The CEL vocabulary

Bindings and `cel` gates see (`_lib/cel_context.ts`):

| Name          | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| `item`        | `{ key, externalRefs }`                                     |
| `stage`       | `{ id, cycle }`                                             |
| `artifacts`   | name → `{ payload, version, stage, cycle }`                 |
| `evidence`    | name → `{ payload, version, stage, cycle }`                 |
| `validations` | `{ artifacts, evidence }`, each name → the latest rejection |

`artifacts` and `evidence` hold the latest record of each name in the current
era, **from whichever stage recorded it**. The `evidence-recorded` gate is
deliberately different: it only accepts evidence recorded in the current stage
and cycle. The gate asks "did this stage produce it?", while CEL asks "what is
the latest?". A reset starts a new era, so nothing from before it is visible.

Numbers from run data are CEL doubles, as in swamp's own CEL. Comparing them
with integer literals works (`version >= 2`), but arithmetic needs a double
(`version + 1.0`) or a conversion (`int(version) + 1`).

## Gates and limits

Gates are evaluated by `_lib/gates.ts`. Every gate of a transition is evaluated
and every failure is returned, each naming the gate, what it needed and what it
found, so everything in the way is visible at once. Run data that cannot be read
(a payload failing its digest check) becomes a failure on each gate that needs
it, never an exception. The status view (`evaluateTransitions`) reports each
exit's gates **and** the cycle limit of the stage it enters, so it never shows
as ready a transition that `advance` would refuse; that mismatch is how a
driving agent gets stuck (#916).

### Approvals

`human-approval` counts, for its gate id in the current stage, cycle and era,
each approver's latest decision:

- An approver is a distinct **platform principal**. Every decision without one
  counts as a single unverified approver, whatever name it asserts, so asserted
  names cannot multiply approvals.
- Any approver's latest decline blocks the gate, and its note is shown.
- An approval counts only while every product it was bound to is unchanged
  (#1501). A product recorded after it does not void it; a changed one does.
  Resolving findings means recording the findings artifact again, so it voids an
  approval bound to the old version: what was approved has changed.

Locally the agent and the person run as the same principal, so an approval
cannot show which of them gave it, and `minApprovals` above 1 needs distinct
principals (serve, later trackers).

### Circuit breakers

The limits are enforced inside `advance` and `recordDispatch` themselves, not in
the gate evaluator, so no caller can bypass them with a different one:

- **Cycle limit.** A stage may be entered `maxCycles` times (default 5) plus
  once per cycle override granted for it in the era. Global transitions are
  exempt: they are escape hatches (abort, escalate), and a limit on the stage
  one leads to must never close the way out.
- **Dispatch cap.** A stage entry may take `maxDispatchesPerCycle` dispatches
  (default 2) plus once per dispatch override for that stage and cycle; past
  that, dispatching is refused as a suspected runaway loop (#916, #899).

Overrides are records of their own (`grantOverride`), checked against the
caller's expected view. Every grant counts and none resets a count
(software-factory kept only the latest grant, #1487, #2175). They are never
approval ids with a reserved prefix, so no id is interpolated into a path or
shell word (#2290). A reset starts a new era, and with it fresh counts.

## Graph validation

**Decision.** The schema checks a lifecycle's shape and references when it is
saved. `_lib/graph.ts` then analyses it as a graph, so an author finds a design
problem before a work item hits it. The holder's `validate` method runs both:
graph errors fail it, and warnings are logged one by one. Starting a work item
runs the schema check only, so a warning, or an error the author has accepted,
never stops a work item from loading its lifecycle.

### The propulsion rule

Gates are a veto: `advance` refuses a transition whose gates fail. What moves a
work item is the driver (an agent, a runner, a person), under the rule ported
from software-factory:

- If exactly one transition is fully satisfied and has no `human-approval` gate,
  the driver takes it.
- `manual: true` makes a transition wait for a person's explicit go, even when
  every gate passes.
- If several transitions are satisfied at once, the driver asks a person.

So a person choosing between exits is intended wherever a transition is manual
or has a `human-approval` gate. Anywhere else, two exits that can pass together
leave the driver to guess, and the analysis warns.

### What the analysis assumes

It explores abstract run states breadth-first, so every finding comes with the
shortest trace of stages from the initial stage to where the problem shows.
There are two passes:

- **Structural pass.** A state is the current stage plus the set of stages
  entered so far. Cycle limits and `max-cycles` gates are ignored, because a
  person can always grant a cycle override. Every finding below except
  `needs-cycle-override` comes from this pass.
- **Count pass.** A state is the current stage plus the entries into each stage,
  under each stage's cycle limit with no overrides. Global transitions are
  exempt from the limit, as in `advance`. `max-cycles` gates are evaluated
  exactly on the counts. This pass only finds transitions that nothing but an
  override opens.

In both passes a gate is judged like this:

- **`evidence-recorded`** passes only in a stage that records the evidence (its
  `evidence` or its `work.resultEvidence`), because the gate accepts only
  evidence from the current stage and cycle.
- **`artifact-fresh` with `recordedThisCycle`** likewise needs the current stage
  to declare the artifact.
- **`artifact-exists`, `findings-clear`, `artifact-fresh` and `cooldown`** pass
  only once a stage that produces what they read has been entered on the path.
  For `artifact-fresh` that means both the artifact and the subject it reviews.
  In a plugin, contract inputs are present from the start.
- **`human-approval` and `cel`** are unknowns, so they are assumed to pass.

Each pass stops at 100,000 states. If the structural pass stops early, its
errors are reported as warnings, because they rest on a partial exploration.

### Findings

Errors:

- **`unreachable-stage`:** no path from the initial stage enters the stage.
- **`dead-end`:** a reachable non-terminal stage from which no transition that
  can pass leads to a terminal stage (in a plugin, a contract exit). Global
  transitions count as a way out only if the stage they lead to can itself
  finish.
- **`gate-never-passes`:** a transition from a reachable stage that no path can
  satisfy, with the gate and the reason. A global transition is judged from each
  stage separately, and the finding names the stage.
- **`exit-unreachable`:** a plugin contract exit that no transition that can
  pass takes.

Warnings:

- **`ambiguous-exit`:** two sibling exits to different stages, neither of them
  manual or behind a `human-approval` gate, whose gates are not provably
  exclusive. Exclusive means `evidence-recorded` on the same evidence requiring
  different values of a field, or `max-cycles` on the same stage and limit with
  opposite `invert`. CEL cannot be compared. Two exits to the same stage are not
  ambiguous, since the driver reaches the same place whichever it picks.
- **`escape-only`:** a stage or loop whose only way to finish is a global
  transition, such as `abandon`.
- **`default-cycle-bound`:** a loop in which no stage sets `maxCycles` and no
  transition has a `max-cycles` gate, so only the default limit of 5 bounds it.
- **`product-missing-on-path`:** a stage injects, or gates on, an artifact or
  evidence that some path to it does not produce.
- **`needs-cycle-override`:** a transition only an override opens (for example
  an inverted `max-cycles` above the stage's limit). Running out of cycles is a
  designed stop for a person, never a dead end.
- **`exploration-truncated`:** a pass hit the state cap.

The analysis looks at one document at a time. Checking that a plugin's inputs
are produced on every path into it waits for plugin composition.

## The model types: a lifecycle holder and work items

**Decision.** Two model types (`extensions/models/lifecycle.ts`, `work_item.ts`,
logic in `_lib/work_item_ops.ts`):

- A **lifecycle holder** is an instance whose `globalArguments` are a team's
  lifecycle.
- A **work item** is one instance per piece of work, named by a key. `start`
  reads the holder and **pins a copy** of its lifecycle with its digest. Every
  later method uses that copy, so editing the holder never changes a running
  work item. `reset` keeps the pinned copy unless `repin=true` adopts the
  holder's current one.

**The pinned copy is chosen by version.** The run record names the version of
the pinned copy it uses, and methods read exactly that version and check its
digest. A repin writes the new copy first and commits the run record last, the
same payloads-first rule as products, so an interrupted repin leaves an unused
copy, never a mismatch. Pinned copies are kept by age for ten years, not by
count: they are small and rarely written, and retention must never collect the
one a run reads.

**The holder's schema is plain, on purpose.** swamp validates a model's
`globalArguments` on every run with `schema.partial()`, and zod refuses
`.partial()` on a schema with refinements, which the full lifecycle schema is
made of. So the holder's schema only names the top-level fields, and the full
check is gatorwalk's own: the holder's `validate` method, and every `start`.
Both read the holder's **raw** definition through the definition repository,
never swamp's evaluated `globalArguments`, so a `${{ }}` reaches the lifecycle
schema's own error. On a remote worker that definition arrives as a plain object
with `_globalArguments`; both shapes are read.

**Keys are gatorwalk's.** swamp cannot generate instance names, so the holder's
`new_key` generates an unused `<lifecycle>-<8 base32 characters>` key, and the
work item is created under it. Tracker ids are kept as data (`externalRefs`),
never as the name.

**Output and failure.** Methods report through the log, as
`@swamp/issue-lifecycle` does. The CLI shows only a log message's text, never
its properties, so the text carries everything a driver acts on: `status` prints
each exit's readiness and the ids of its human-approval gates (a ready exit that
a person must decide looks otherwise the same as one an agent may take), the
stage's work mode, the dispatch count, and payload rejections; and `dispatch`
prints the whole packet. `status` is a `read` method, so it takes no lock. A
refused write throws with its reason and writes nothing. A rejected payload is
committed to the run as retry feedback and then thrown: no method declares
`rollbackOnFailure`, so the feedback survives and the caller still gets a
non-zero exit.

**Model types are string literals.** swamp reads a model's `type` from the
source without running it, so each model file writes its type literally; tests
check each equals the constant the code compares against.

**Known gap.** The first `start` of a new work item takes no per-instance lock
(swamp only locks an instance once its definition exists), so two concurrent
first starts can race. That is accepted for solo use until swamp fixes it.

## Tests on the real engine

**Decision.** Besides the unit tests, which run against fakes
(`_lib/fake_swamp.ts`, `memoryStore`), an integration suite drives gatorwalk
through the installed swamp CLI. Each test gets a throwaway repo
(`swamp init --tool none`, then `swamp extension source add` of this directory),
runs methods by direct type execution with `--log`, and reads results back from
swamp's storage with `swamp data get --json`. Code: `integration/harness.ts`,
`integration/cli_test.ts`, and `integration/skill_test.ts`, which checks every
command the driving skill shows and runs its worked example as written.

### Why

Fakes can only show what their author believed about the engine. The GW-6 smoke
run showed the gap: swamp reads a model's type from the source without running
it, so a type given as a constant never registered, and no unit test could see
that. The first suite automates that smoke run. It also closes a GW-4 question
by checking that every payload version and the pinned lifecycle read back from
swamp's storage still have the digest taken before they were written.

### How it runs in verification

The suite needs to run the swamp binary, write a temp dir and read the
environment, so it is its own command, `integration`, on the gatorwalk-factory
target in `verification/checks.yaml`. The unit `test` command stays at
`--allow-read` and never reaches `integration/`. A separate command was chosen
over widening the unit tests' flags, so that tests of the pure runtime keep
their read-only guarantee.

What those flags do not limit:

- `--allow-run=swamp` is not a sandbox. The spawned binary runs with the
  caller's full rights.
- `--allow-write` is unscoped, because the temp dir is only known at run time.

What the suite depends on:

- **swamp on `PATH`.** Without it the suite fails rather than skipping, so it
  can never pass by checking nothing.
- **The caller's HOME.** swamp's config and stored login and deno's npm cache
  come from the host. That is what lets the suite run with no network. With a
  fresh HOME, swamp needed the network to load the extension.
- **The swamp version on the host.** The suite logs `swamp --version` at the
  start of each run, and the path of each repo it creates. It last ran against
  swamp `20260928.205839.0`.
- **Only gatorwalk-factory changes trigger it.** A swamp upgrade that breaks
  gatorwalk is caught by the next gatorwalk change, or by running
  `deno task test:integration` by hand.

Each swamp call runs in the temp repo with `--no-telemetry`. Variables that
would point swamp at another repo or server (`SWAMP_REPO_DIR`, `SWAMP_SERVE_URL`
and the like) are removed from its environment, so nothing is written into the
source tree or another repo.

**Out of scope.** Remote workers and `swamp serve` are not covered. A holder
read on a remote worker arrives as a plain object with `_globalArguments`, and
that shape is still unconfirmed against the real engine. The driving skill is
GW-8. Neither dispatch nor usage is run through the CLI yet.
