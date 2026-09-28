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
`@swamp/issue-lifecycle` does. `status` is a `read` method, so it takes no lock.
A refused write throws with its reason and writes nothing. A rejected payload is
committed to the run as retry feedback and then thrown: no method declares
`rollbackOnFailure`, so the feedback survives and the caller still gets a
non-zero exit.

**Model types are string literals.** swamp reads a model's `type` from the
source without running it, so each model file writes its type literally; tests
check each equals the constant the code compares against.

**Known gap.** The first `start` of a new work item takes no per-instance lock
(swamp only locks an instance once its definition exists), so two concurrent
first starts can race. That is accepted for solo use until swamp fixes it.
