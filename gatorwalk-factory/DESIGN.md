# gatorwalk-factory design decisions

Decisions about the factory definition format, with the reasoning behind them.
Each names the code that carries it out.

## Runtime values in prompts: bindings plus `{{name}}` placeholders

**Decision.** Values that come from run data are declared once, as named bare
CEL expressions under a stage's `work.bindings`. Prose fields (`systemPrompt`,
`command`) refer to them by name with `{{name}}` placeholders, which are filled
when the stage is dispatched. Carried out in
`extensions/models/_lib/engine/template.ts` and checked in
`definition_schema.ts`.

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
`status` time. That syntax belongs to swamp: software-factory's definition lived
in a model's `globalArguments`, and swamp evaluates every `${{ }}` there when
the definition is saved, before any run data exists (`expression_parser.ts` in
swamp matches `\$\{\{\s*(.+?)\s*\}\}`). gatorwalk's factory definition started
out there too; it now lives in its own file (see "Where a factory definition
lives"), which swamp does not evaluate, but the syntax is still swamp's.
software-factory worked around this by keeping the platform-facing schema loose
and re-parsing the raw definition itself. The result:

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

- it is syntax-checked when the factory definition is checked;
- its resolved value is recorded on the dispatch, typed, so a stage can later be
  replayed and evaluated against a changed prompt;
- it can also feed a workflow's or method's inputs and be handed to an agent as
  data, not only pasted into prose.

The cost is one extra line per value: you cannot write an expression inline in a
prompt.

### The rules

| Text                                                                    | Meaning                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `{{name}}` or `{{ name }}`                                              | Placeholder. `name` must be a declared binding, or the factory definition is rejected when checked, with the error's path.                    |
| `{{` around anything else (`{{ .Values.x }}`, `{{#each}}`, `{{ a.b }}`) | Literal text, so most Helm, Handlebars and Go template snippets pass through unescaped.                                              |
| `{{` directly after `{` (`{{{body}}}`)                                  | Literal text, so Handlebars triple-stash passes through.                                                                             |
| `\{{`                                                                   | A literal `{{`, for text that would otherwise be a placeholder.                                                                      |
| `${{`                                                                   | Rejected anywhere in a factory definition. It is swamp's syntax, with no escape; swamp no longer evaluates the definition's file, but the rejection is kept until go-live (see "Where a factory definition lives"), so a prompt cannot yet contain a literal `${{`. |

Bare-word template tags such as Go's `{{end}}` or Handlebars' `{{else}}` look
exactly like placeholders. They are rejected when the factory definition is
checked, as undeclared bindings, and are written `\{{end}}`. The failure is loud
and the error names the escape. There is no way to write a literal `\` directly
before a live placeholder.

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
`evidence-<name>`, where `<name>` is declared by the factory definition), and
the run record indexes each one's version and digest. Code:
`_lib/engine/run_record.ts`, `_lib/engine/run_ops.ts`,
`_lib/engine/run_store.ts`.

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
  #2343): recording a product, dispatching, approvals, overrides, `advance`,
  `reset` and `retarget`. Only recording usage does not, because usage arrives
  after the run has moved on. The lock does not cover the first run that
  auto-creates an instance (`model_method_run.ts:431` in swamp), so two
  concurrent first starts can still race; that is accepted for solo use until
  swamp fixes it.
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
- When the exits that only a person can open change, the commit adds an
  `awaiting` event listing them. It is derived from the gates, not something
  anyone did, so its actor is the write that caused the change. See "Summary and
  metrics".
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

Bindings, `cel` gates and an approval's `when` see
(`_lib/engine/cel_context.ts`):

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

These names are reserved. A comprehension macro (`all`, `exists`, `map`, ...) or
`cel.bind` may not bind a variable called `item`, `stage`, `artifacts`,
`evidence` or `validations`; the factory definition schema rejects it. CEL
allows it, and the variable would hide the context's value for the rest of the
expression, which is almost always a mistake. The rule also lets tools that read
CEL take these names to mean the context's. The list is `CEL_VOCABULARY` in
`definition_schema.ts`, checked against `CelContext` when it compiles. Putting
the vocabulary under a single prefix would also do this, at the cost of changing
every factory definition; that is left for later.

One such tool is the product reference check. When a factory definition is
checked, every fixed product name in its CEL must be a declared product of the
kind its map holds: `artifacts.x`, `artifacts["x"]` and
`validations.artifacts.x` must name an artifact, and the same forms on
`evidence` must name evidence (a stage's `resultEvidence` counts). Tests for
presence, `has(...)` and `"x" in artifacts`, are checked too, since a typo
there leaves the test false forever. A lookup by variable (`artifacts[k]`) is
not checked, nor are payload field paths against payload schemas. The walk is
`productRefs` in `_lib/engine/cel_refs.ts`, and it tells reads from tests.

Numbers from run data are CEL doubles, as in swamp's own CEL. Comparing them
with integer literals works (`version >= 2`), but arithmetic needs a double
(`version + 1.0`) or a conversion (`int(version) + 1`).

## Loops and their controls

**Decision.** A factory definition is a directed graph that contains cycles. It
is deliberately not a DAG: rework, re-checking and revision are loops back to
earlier stages, and every loop is bounded by the controls below.

The swamp workflows that do a stage's work are acyclic (they have no loops),
which is why parallel work belongs there (#2699; see "Parallel work inside one
stage"). Looping happens between stages; concurrency happens inside one.

The examples are from `build-swamp-extension.yaml`, under
`.claude/skills/gatorwalk-factory/references/examples/`.

### A loop is an ordinary transition back

There is no loop construct. A loop is a transition whose target is an earlier
stage, such as `rework` from `plan-review` back to `plan`. Each entry into a
stage is a new **cycle** of it: the run record counts entries per stage, and the
cycle number is that count. Entering `plan` for the second time starts `plan`
cycle 2.

### Evidence counts only for the current pass

A gate reads what was recorded in this cycle, so a loop cannot pass on the
previous pass's results:

- `evidence-recorded` accepts only evidence recorded in the current stage and
  cycle.
- `artifact-fresh` with `recordedThisCycle: true` accepts only an artifact
  recorded in the current stage and cycle. Both exits of `plan-review` demand a
  review recorded in this pass.
- `human-approval` counts decisions for its gate id in the current stage, cycle
  and era, so an approval given in an earlier pass does not carry over.
- An approval is voided when what it approved changes, even within one pass.
  Resolving findings means recording the findings artifact again, which voids an
  approval bound to the old version. See "Approvals".

### A loop needs a reason

A way back either reads the run data or waits for a person:

- **Rework exits are gated on data.** `rework` from `plan-review` has a `cel`
  gate that needs an open critical or high finding in `plan-review`. With no
  such finding it cannot pass, so an agent cannot loop on its own whim.
- **Manual ways back need a person.** `revise` (after a review is declined
  without a blocking finding) and `recheck` (for a failure that was not the
  code's, such as a flaky test) are `manual: true`. The driver never takes a
  manual transition, even when its gates pass; a person says go.
- **A revised plan carries its reason.** `revise` from `plan-review` also needs
  `plan-feedback`, the person's feedback on the plan, recorded in this pass
  (swamp-club #2770). The evidence is declared `recordedBy: person`: the
  dispatch packet leaves it out, `status` lists it under `a person records:`,
  and recording it after a decline is not rework (see "Why `awaiting` is
  journaled"). `plan` injects the last plan, its review and the feedback, and
  the revised plan lists every round it answers in `feedbackIncorporated`, so
  the feedback reaches the next planning pass and the ticket's history. A
  person can always record feedback, so the gate never wedges the work.

### The cycle limit

A stage may be entered `maxCycles` times, 5 by default, plus once per cycle
override granted for it. `advance` refuses the entry past that. A stage that
should rarely repeat sets a lower limit (`maxCycles: 2`);
`build-swamp-extension.yaml` keeps the default everywhere.

Cycle overrides (`grant_override` with `kind=cycle`) are granted by a person.
They accumulate: every grant in the era counts, and none resets the count. A
reset starts a new era, and with it fresh entry counts and no overrides. See
"Circuit breakers".

### The dispatch cap

The cycle limit bounds loops between stages. The dispatch cap bounds a runaway
loop within one pass: a stage entry may take `maxDispatchesPerCycle` dispatches,
2 by default, plus once per dispatch override granted for that stage and cycle.
Past that, `dispatch` is refused as a suspected runaway loop. Neither bundled
factory definition sets it.

### Routing on the loop count

A `max-cycles` gate reads how many times a stage has been entered in the era: it
passes while the count is below `limit`, or, with `invert: true`, once it has
reached `limit`. A pair of them routes on the count, for example to stop
reworking and escalate after three passes. No bundled factory definition does
this yet; this is an illustration:

```yaml
- id: code-review
  transitions:
    - name: rework # after the first and second pass
      to: implement
      gates:
        - type: max-cycles
          config: { stage: implement, limit: 3 }
        # ...and the open-finding cel gate, as in the bundled definitions
    - name: escalate # after the third
      to: redesign
      gates:
        - type: max-cycles
          config: { stage: implement, limit: 3, invert: true }
        # ...and the same open-finding cel gate
```

The two gates are on the same stage and limit with opposite `invert`, so the
graph analysis proves the exits exclusive and does not warn that the driver
would have to guess.

### Escape hatches

A loop can never wedge a run:

- **Global transitions are exempt from cycle limits.** `abandon`, a
  `globalTransitions` entry with a `human-approval` gate, can be taken from any
  non-terminal stage, and the cycle limit of the stage it leads to never closes
  it.
- **A reset starts a new era.** `reset` (on a person's word) returns the work
  item to the initial stage with fresh counts. Earlier products, approvals and
  dispatches stay recorded but belong to the old era, so no gate sees them.

### Design-time checks

The factory's `validate` analyses the graph (see "Graph validation"), and four
of its warnings are about loops:

- **`escape-only`:** a loop whose only way out is a global transition such as
  `abandon`.
- **`default-cycle-bound`:** a loop in which no stage sets `maxCycles` and no
  transition has a `max-cycles` gate, so only the default limit of 5 bounds it.
  `build-swamp-extension.yaml` gets it for both of its loops.
- **`undescribed-way-back`:** a way back with no `description` saying why it
  goes back.
- **`needs-cycle-override`:** a transition that only a cycle override opens,
  such as an inverted `max-cycles` above the stage's limit.

Loops do not multiply the states the analysis explores, except where an inverted
`max-cycles` gate counts a stage (see "What the analysis assumes"). `validate`
fails if either pass stops at the 100,000-state cap without finishing, because a
partial exploration cannot show that the factory definition is sound.

### Measurement

Loops are measured per era and in total in the per-item metrics (GW-19, #2687;
see "The metrics"): **re-entries** into each stage after its first, **review
rounds** of each reviewed artifact, **declines** and **rejected payloads**, and
the cycle and dispatch **overrides** granted.

## Gates and limits

Gates are evaluated by `_lib/engine/gates.ts`. Every gate of a transition is
evaluated and every failure is returned, each naming the gate, what it needed
and what it found, so everything in the way is visible at once. Run data that
cannot be read (a payload failing its digest check) becomes a failure on each
gate that needs it, never an exception. The status view (`evaluateTransitions`)
reports each exit's gates **and** the cycle limit of the stage it enters, so it
never shows as ready a transition that `advance` would refuse; that mismatch is
how a driving agent gets stuck (#916).

### Evidence values: `requireField` and `match`

`evidence-recorded` can demand values of the evidence payload in two ways, and a
gate may use both (every condition must hold):

- **`requireField`** maps a dotted field path to the value that must be there,
  compared as canonical JSON.
- **`match`** maps a dotted field path to a JSON Schema 2020-12 fragment the
  value there must satisfy, such as `{ not: { const: bug } }` or
  `{ enum: [high, medium] }`. Fragments are checked when the factory definition
  is saved and validated by the same engine as payload schemas, so there is no
  second dialect. A fragment for one field has nothing to point into, so `$ref`,
  `$dynamicRef`, `$defs`, `$id`, `$anchor` and `$dynamicAnchor` are refused.

A missing field fails both, even under `not`: a condition is about a value that
is there. `match` is a sibling rather than operator objects inside
`requireField` because a `requireField` value may itself be any object, so
`{ in: [...] }` there would be ambiguous.

An optional `message` replaces the gate's opening when a value does not qualify,
with the detail kept after it in parentheses. Missing evidence, or evidence from
another stage or cycle, keeps the standard text: that is about when it was
recorded, not what it holds.

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

**Conditional approval (#2666).** A gate with `when`, a CEL expression over the
same context as a `cel` gate, applies only while `when` is true. While it is
false the gate passes and is not required, whatever decisions were recorded;
`approve` and `decline` still accept its id, and a recorded decline blocks again
once the condition holds in the same stage entry. A `when` that cannot be
evaluated, or is not true or false, fails the gate with the error and counts as
required, so the driver stops and asks; it is not a human stop in the journal,
since the fix is to the run data or the factory definition. CEL has no value for
a missing key, so a `when` that reads evidence which may not exist yet guards it
(`"x" in evidence && ...`, `has(evidence.x.payload.field)`). A conditional gate
is only as strong as the data it reads, and the driving agent records that data:
`when` should read something a person sees anyway, such as the classification
shown before triage, never stand in for a check.

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

**Decision.** The schema checks a factory definition's shape and references when
it is saved. `_lib/engine/graph.ts` then analyses it as a graph, so an author
finds a design problem before a work item hits it. The factory's `validate`
method runs both: graph errors fail it, and warnings are logged one by one.
Starting a work item runs the schema check only, so a warning, or an error the
author has accepted, never stops a work item from loading its factory
definition.

### The propulsion rule

Gates are a veto: `advance` refuses a transition whose gates fail. What moves a
work item is the driver (an agent, a runner, a person), under the rule ported
from software-factory:

- If exactly one transition is fully satisfied and has no `human-approval` gate
  required now (one without `when`, or whose `when` holds), the driver takes it.
- `manual: true` makes a transition wait for a person's explicit go, even when
  every gate passes.
- If several transitions are satisfied at once, the driver asks a person.

So a person choosing between exits is intended wherever a transition is manual
or has a `human-approval` gate without `when`. Anywhere else, two exits that can
pass together leave the driver to guess, and the analysis warns. A conditional
approval does not count, since while its `when` is false no one is asked.

Two exits are exclusive, so never both satisfied, when `evidence-recorded` gates
on the same evidence require values that conflict, when `max-cycles` gates on
the same stage and limit point opposite ways, or when one has `findings-clear`
and the other `findings-open` on the same findings artifact and every severity
`findings-open` counts is one `findings-clear` blocks on. An open finding at
such a severity fails `findings-clear`.

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
- **`artifact-exists`, `findings-clear`, `findings-open`, `artifact-fresh` and
  `cooldown`** pass only once a stage that produces what they read has been
  entered on the path. For `artifact-fresh` that means both the artifact and the
  subject it reviews.
- **`human-approval` and `cel`** are unknowns, so they are assumed to pass. So
  is a `human-approval` gate with `when`: it may apply or not.

The count pass keeps only the states that can show something new. Two states at
the same stage with the same stages entered have passed the same structural
checks, since those read only which stages were entered. If one has no more
entries into any stage than the other, every transition open to the other is
open to it too: an entry below a limit never closes a transition, and a
`max-cycles` gate or a stage's cycle limit refuses only when a count is too
high. So the state with more entries is dropped. An inverted `max-cycles` gate
is the exception, since it passes only after enough entries; the stages such
gates count are compared exactly, not by fewer-or-equal. Every transition adds
one entry, so the breadth-first order always reaches the state with fewer
entries first. This is exact, not an approximation: the findings are those of
the full exploration, which the tests keep as the reference. It also bounds the
count pass by the structural pass, times the counts an inverted gate's stage can
take. Seven stages that each loop on themselves, at the default limit, take 8
count states instead of 175,780 (`graph_test.ts`). A `needs-cycle-override`
finding gives the refusal
seen in the state with the fewest entries, so its message does not depend on the
order states are explored in.

Each pass stops at 100,000 states. If the structural pass stops early, its
errors are reported as warnings, because they rest on a partial exploration. The
factory's `validate` fails whenever either pass stops at the cap: a partial
exploration cannot show the factory definition is sound. It names the cap and
the pass that stopped, and still lists the partial findings as warnings.

### Findings

Errors:

- **`unreachable-stage`:** no path from the initial stage enters the stage.
- **`dead-end`:** a reachable non-terminal stage from which no transition that
  can pass leads to a terminal stage. Global transitions count as a way out only
  if the stage they lead to can itself finish.
- **`gate-never-passes`:** a transition from a reachable stage that no path can
  satisfy, with the gate and the reason. A global transition is judged from each
  stage separately, and the finding names the stage. This includes a transition
  whose `evidence-recorded` gates on one evidence require values no single
  payload can hold, such as `a: { b: 1 }` with `a.b: 2`, or `s: a` with a
  `match` of `{ not: { const: a } }`, since every gate of a transition reads the
  same payload.

Warnings:

- **`ambiguous-exit`:** two sibling exits to different stages, neither of them
  manual or behind a `human-approval` gate without `when`, whose gates are not
  provably exclusive. Exclusive means `evidence-recorded` on the same evidence
  requiring values of a field no single payload can hold, or `max-cycles` on the
  same stage and limit with opposite `invert`. Keys are compared as the field
  paths the gate reads, so `a.b: 1` and `a: { b: 2 }` are exclusive. A
  `requireField` value reads as a `const`; of a `match` fragment, only `const`,
  `enum` and a `not` of those are read, and a fragment with none of them is
  never proven exclusive. Other keywords beside a `const` or `enum` only narrow,
  so they are ignored safely; inside a `not` they would narrow what is excluded,
  so a `not` is read only when it holds nothing else but annotations. A set of
  values required above a path is read at the path below; an exclusion above
  says nothing about the path below. CEL cannot be compared. Two exits to the
  same stage are not ambiguous, since the driver reaches the same place
  whichever it picks.
- **`escape-only`:** a stage or loop whose only way to finish is a global
  transition, such as `abandon`.
- **`default-cycle-bound`:** a loop in which no stage sets `maxCycles` and no
  transition has a `max-cycles` gate, so only the default limit of 5 bounds it.
- **`undescribed-way-back`:** a way back whose `description` is missing or
  blank. A way back is a transition inside a loop (live and not global) to the
  same stage or one earlier in the file; every loop has at least one. An edge to
  an earlier stage that closes no loop is not one.
- **`product-missing-on-path`:** a stage injects, gates on, or reads in CEL an
  artifact or evidence that some path to it does not produce. An inject is not
  reported when some path produces it and every stage that produces it is in
  the injecting stage's own loop (its strongly connected component over live,
  non-global edges): that is context from an earlier pass, such as the last
  review and a person's feedback handed to the next plan, absent on the first
  pass by design (swamp-club #2770). A producer upstream of the stage but
  outside its loop is still reported, and gates are judged as before.
  CEL reads (swamp-club #2792) are the fixed product references of a stage's
  `work.bindings`, its `cel` gates and its approvals' `when`, found by the same
  walker as the declared-name check (`cel_refs.ts`). A read of a product the
  expression also tests for anywhere (`has(artifacts.plan)`,
  `"plan" in artifacts`) is guarded and not reported; the guard need not sit
  around the read, so this is generous on purpose. `artifacts.plan` and
  `validations.artifacts.plan` are the same product, reported once per
  expression. An unguarded read of a missing product fails at run time (cel-js
  throws "No such key"), so a CEL read is reported even when no path produces
  it (gate-never-passes assumes cel gates can pass) and even when it comes from
  the stage's own loop. Bindings are evaluated when the stage is entered, before
  it records anything, so the stage's own products do not count for them; a
  gate or `when` is evaluated at the transition, where they do. Availability is
  the stages entered, as for injects, which matches the CEL context (the era's
  latest record of each product, from whichever stage recorded it); a work item
  reset, which starts a new era, is not modelled. Payload field paths are not
  checked, nor are global transitions, whose CEL runs from every stage (the
  same as their named gates). A binding read in a loop is judged as on the
  loop's first pass, so its message can say no path produces a product that a
  later pass has.
- **`needs-cycle-override`:** a transition only an override opens (for example
  an inverted `max-cycles` above the stage's limit). Running out of cycles is a
  designed stop for a person, never a dead end.
- **`exploration-truncated`:** a pass hit the state cap. `validate` fails on it,
  although it is a warning in the report.

The analysis looks at one document at a time.

## Parallel work inside one stage

**Decision.** A work item is in one stage at a time. Work that should run in
parallel goes inside one stage: the stage's work is a swamp workflow whose jobs
run concurrently, and one piece of evidence records how they did together.
Parallel stages are deferred (swamp-club #2665).

### Why one stage at a time

The run record holds a single current stage. Everything in the runtime is keyed
to it:

- `evidence-recorded` and `artifact-fresh` accept only what the current stage
  recorded in its current cycle.
- The cycle limit counts entries into a stage, and the dispatch cap counts per
  stage and cycle.
- Approvals are counted per stage, cycle and era.
- The graph analysis explores states as a current stage plus counts.

Parallel stages would need a set of current stages, a join that says when the
set has finished, and gates and an analysis that understand both. That is a
different runtime. Running things in parallel does not need it.

### The pattern

The stage has `work.mode: workflow` and names a wrapper workflow. The wrapper's
jobs have no `dependsOn` between them, so swamp puts them at the same dependency
level and runs them concurrently (`execution_service.ts` 2299-2371 in swamp at
c48ef142). Each job either does the work directly or runs another workflow with
a nested step (`task: { type: workflow, workflowIdOrName, inputs }`,
`step_task.ts:51`). The stage records one `resultEvidence` that judges the whole
run. It carries whatever later stages need from each part, and its exits gate on
it as usual.

The swamp-extensions factory definition does this for verification.
`verification/workflow-verify.yaml` runs verify-build and verify-reviews as two
nested runs at the same time. The `verify` stage records `verification`: the
wrapper's status and run id, and each child's status and run id. `passed`
requires both children to have succeeded. Before this, the two ran as two stages
one after the other. A reviews failure showed only after the build passed, and
verification took the sum of both times.

### What the engine does, and what the stage must allow for

Checked on swamp 20260929.151817.0 and in its source at c48ef142
(`runWorkflowStep`, `execution_service.ts` 3950-4215):

- **A nested run is a run of its own.** It has its own run id, and its own
  record under its own workflow's id. It also has its own evaluated workflow,
  its own recorded inputs, and its own `${{ run.id }}`. Anything that reads runs
  by workflow name finds it, as `swamp workflow history get` and
  `scripts/build_attestation.ts` do. So the attestation is built from the two
  child runs, not from the wrapper.
- **The wrapper records a child's run id only when the child succeeds.** It is
  the step's `output.runId` in the wrapper's run record. A failed child's run is
  found with `swamp workflow history search <name>`. A child that never started
  has no run, so the evidence makes child run ids optional and `passed` requires
  them.
- **Nothing stops early.** A failed job does not cancel its sibling. The wrapper
  waits for every job and is `failed` if any failed. The stage therefore always
  sees every part's outcome.
- **Nested inputs are not validated** against the child's input schema; only its
  defaults apply. The wrapper declares the inputs itself and passes each one
  explicitly.
- **Concurrency is capped per nesting level.** The cap is the workflow's
  `concurrency` and `SWAMP_MAX_CONCURRENT_STEPS`, whichever is lower. Each child
  applies its own. `SWAMP_MAX_CONCURRENT_STEPS=1` runs the jobs one after the
  other: the stage is still correct, but no faster.
- **Workflows are found by name** in the repository's `workflows/` directory,
  then in the directory tree `SWAMP_WORKFLOWS_DIR` names. So the wrapper lives
  beside the workflows it nests, which is why swamp-extensions keeps it in
  `verification/`.

`integration/engine/verify_workflow_test.ts` runs the real wrapper on the real
engine with stub children. It checks that the children overlap and are runs of
their own, that the wrapper waits for both, and that it fails when either does.

## The dispatch contract

Whoever does a stage's work gets everything it needs from the dispatch, and
what is recorded is what was sent and what came back (swamp-club #2776). In a
trial, the driving agent wrote its own reviewer prompts. It added scope and
severity guidance, and once left a shell placeholder where the plan summary
belonged. It then retyped the reviewers' findings, which lost half their text.
The dispatch record held a prompt no subagent saw.

- **The packet names the products.** `products` lists every artifact and
  evidence the stage declares, each with the schema its payload is checked
  against: the declared schema, the findings contract, both (as `allOf`), or
  the outcome contract for result evidence. `artifactContract` and
  `evidenceContract` in `payload_schema.ts` give the same contracts that
  recording applies, and a test pins that they accept and reject the same
  payloads. Schemas are shown without their `description` and `$comment`,
  which are for the definition's authors.
- **Evidence a person records is not the work's.** An evidence spec with
  `recordedBy: person` (a person's feedback on the plan, say) is left out of
  `products`, so no subagent is asked to write it and no driver records it as
  the stage's work. `status` names it (`a person records: <name>`), the design
  page marks it, and a saved scenario records it as the person. Recording,
  gates, injection and CEL treat it like any evidence. Declaring it on the
  stage whose exit it gates is what lets `evidence-recorded` require it in the
  current pass (swamp-club #2770).
- **The engine writes the subagent prompt.** For a dispatch stage,
  `buildSubagentPrompts` gives each subagent the rendered prompt byte for
  byte. A fixed section follows it: the skill to follow, a `swamp data get`
  read per injected product, and a result file per product with its schema,
  inline. The dispatch records these prompts, so replay shows exactly what was
  sent. The driver adds nothing. That makes the driver honest by construction,
  which is stronger than recording whatever addendum it chose to write.
- **Results are files, recorded as written.** Each result path is
  `<resultDir>/<key>-d<dispatchId>-<n>-<product>.json`. `resultDir` is the
  driver's scratch directory, or a new temporary directory that is removed
  again if the dispatch is refused. The driver records a result with
  `payload=@<path>`, which swamp reads from the file, and it never edits the
  file. Findings from several subagents on one artifact are joined
  mechanically with `jq`, not by the engine, since no bundled definition runs
  more than one. Each subagent's findings ids carry its number, so a join
  cannot repeat an id.

## The model types: a factory and work items

**Decision.** Two model types (`extensions/models/engine/factory.ts`,
`work_item.ts`, logic in `_lib/engine/work_item_ops.ts`):

- A **factory** is an instance whose `globalArguments` hold a team's factory
  definition, the tracker instance its work items publish to, and its saved
  scenarios, `{ definition: {...}, tracker: board, scenarios: [...] }` ("Where
  a factory definition lives", "The factory's tracker", "Saved scenarios").
- A **work item** is one instance per piece of work, named by a key. `start`
  reads the factory's definition and **pins a copy** of it with its digest.
  Every later method uses that copy, so editing the factory never changes a
  running work item. `reset` keeps the pinned copy unless `repin=true` adopts
  the factory's current definition.

A third type, the **studio**, only reads: see "The studio server".

**The pinned copy is chosen by version.** The run record names the version of
the pinned copy it uses, and methods read exactly that version and check its
digest. A repin writes the new copy first and commits the run record last, the
same payloads-first rule as products, so an interrupted repin leaves an unused
copy, never a mismatch. Pinned copies are kept by age for ten years, not by
count: they are small and rarely written, and retention must never collect the
one a run reads.

**The factory's schema is the definition's.** The factory type's
`globalArguments` schema is `{ definition, tracker, scenarios }`, with
`definition` the definition schema (`_lib/engine/definition_schema.ts`) and
`scenarios` the saved-scenario list (`_lib/engine/scenario.ts`), so swamp checks
them as it checks any model ("What swamp checks, and what validate checks").
gatorwalk's methods still read the definition from the factory's **raw** model
definition through the definition repository, never swamp's evaluated
`globalArguments`, so a pinned copy is exactly what was written. On a remote
worker that model definition arrives as a plain object with
`_globalArguments`; both shapes are read.

**Keys are gatorwalk's.** swamp cannot generate instance names, so the factory's
`new_key` generates an unused key from the work's title (a required `title`
input), and the work item is created under it. A key is how a person refers to a
work item everywhere (`status`, the summary report, commands, conversation), so
it says what the work is: `<factory>-<slug>-<suffix>`, for example
`team-add-list-method-r2ne` from the factory `team`.

- **The slug** is the title with accents removed, lowercased, and split into
  ASCII letters and digits; every other character is a break, so separators
  collapse and trim. Stop words (a, an, and, as, at, be, by, for, from, in,
  into, is, it, of, on, or, the, to, with) are left out unless nothing else is
  left. Whole words are kept while the key fits; only a first word too long for
  the room left is cut. A title with nothing left is refused.
- **The length** is swamp's: an instance name is at most 64 characters matching
  `^[a-z0-9][a-z0-9_-]*$` (`DEFINITION_NAME_MAX_LENGTH` and
  `DEFINITION_NAME_PATTERN` in swamp's `src/domain/definitions/definition.ts`).
  The factory's name is cut at 55 characters (and any trailing
  separator dropped), so the slug always keeps at least 3.
- **The suffix** is 4 random base32 characters, about a million per slug. Only
  work with the same factory and slug can collide, in practice a
  ticket claimed again, and a key some definition already has is drawn again.
- **From a ticket,** `claim` puts the ticket's display id where the factory
  name would go, all its words kept: `abc-12-add-list-r2ne` for
  Linear's `ABC-12`. The id there is for
  reading only (see "Tracker ids are data"). A built-in ticket's first work
  item takes the ticket's own id (`cue-board-shortcuts-r2ne`), and a later one
  on the same ticket is `<prefix>-<slug>-<suffix>` (see "The built-in
  tracker"). Only the factory's `new_key`, which has no ticket, leads with the
  factory's name. A ticket whose title has no ASCII letters or digits
  still claims: its key is the lead and the suffix alone (`2800-k3xq`), since
  the ticket's id already says what the work is; `new_key` refuses such a
  title, having nothing else to go on.
- **A key never changes.** If the work changes meaning the key stays; a person
  may abandon the item and start a new one. `start` takes any unused name, so a
  person may also choose a key by hand.
- **Not a sequence** (`cue-7`): that needs one counter minted in one place,
  reuses numbers when a factory is recreated, and reads like a tracker id. **Not
  calver:** it is long, hard to say, and repeats what the journal records. Order
  does not matter, since work is often picked up out of order.

`new_key` logs the key and also records it as the factory's `key` data, so a
program reads it from `--json` output (`dataArtifacts`) instead of parsing log
text; it is therefore not a `read` method, and the write takes the factory's
lock.

**Output and failure.** Methods report through the log, as
`@swamp/issue-lifecycle` does. The CLI shows only a log message's text, never
its properties, so the text carries everything a driver acts on: `status` prints
each exit's readiness and the ids of its human-approval gates (a ready exit that
a person must decide looks otherwise the same as one an agent may take), split
into those a person must decide now and conditional ones whose `when` is false
(`humanGates` and `humanGatesNotRequired` in the logged status), the stage's
work mode, the dispatch count, and payload rejections; and `dispatch` prints the
whole packet. Every write ends its text with the status that follows it, the
same block `status` prints, built from the run the write committed, so reading
a write's output counts as reading status; a dispatch prints it after the last
subagent prompt. The write is committed by then, so a status that cannot be
built is reported in the text, not thrown. Drivers run methods without `--log`:
swamp shows a method's log text without it, and with it prints the text a
second time through its console log sink. `status` is a `read` method, so it
takes no lock. A refused write throws with its reason and writes nothing. A
rejected payload is committed to the run as retry feedback and then thrown: no
method declares `rollbackOnFailure`, so the feedback survives and the caller
still gets a non-zero exit.

**Model types are string literals.** swamp reads a model's `type` from the
source without running it, so each model file writes its type literally; tests
check each equals the constant the code compares against.

**Known gap.** The first `start` of a new work item takes no per-instance lock
(swamp only locks an instance once its definition exists), so two concurrent
first starts can race. That is accepted for solo use until swamp fixes it.

### Where a factory definition lives

**Decision** (swamp-club #2884, replacing #2803's file). A factory definition
lives in the factory's own model definition,
`models/@swamp/gatorwalk-factory/factory/<factory>.yaml`, under
`globalArguments.definition`, beside the factory's `tracker` and its saved
`scenarios`:

```yaml
globalArguments:
  tracker: board
  definition: { schemaVersion: 1, stages: [...] }
  scenarios: [{ scenario: plan-to-done, steps: [...] }]
```

#2803 had moved the definition into a file the factory named, because people
pasted it into `globalArguments` by hand while keeping a file copy, and the two
drifted. That reason went when factories became authored and edited only by
the agent: a swamp model definition is already a YAML file in the repo that an
agent edits directly. Keeping the definition there gives one copy in the place
swamp already looks, lets swamp's own checks see it (the old software-factory
defect #1236 was a platform-facing schema of `stages: unknown[]`), and lets a
remote worker start work, since it receives the model definition but not the
repo. There were no users before go-live, so the file form was removed, not
kept beside it.

**Who reads it.** `start` pins the parsed definition and its digest, and every
later method reads the pinned copy, so only the methods that pin or check read
the factory's definition: `validate`, `design_page`, `new_key`, `start`,
`reset` with `repin=true`, and the tracker's `claim`, which starts a work item.
All of them go through `loadFactory` in `_lib/engine/work_item_ops.ts`. The
studio reads the model definition file too, and does not hand-edit it: edits
come from the agent. Editing it never changes a running work item.

**No `init`.** The agent creates the factory with only its tracker
(`swamp model create ... --global-arg tracker=<instance>`), then writes the
`definition:` and `scenarios:` blocks of one of the skill's examples into the
file, and never replaces a definition that is there. A method that wrote its own
model definition would have been new and local-only, and an `init` needed the
examples embedded in the engine (`starters.ts`, a generator and a drift test)
as a second copy of each. Each example is now one file holding those two
blocks, and `examples_test.ts` checks every one against the factory type's full
schema, its graph and its scenarios.

**What swamp checks, and what validate checks.** swamp checks a factory's
`globalArguments` against the factory type's schema with `schema.partial()`, in
`swamp model validate` and before every method runs (on the evaluated
arguments). `partial()` only makes the top-level keys optional, so a
`definition` or `scenarios` that is present is checked in full, refinements
included; the top level is a plain object with no refinement of its own, since
swamp falls back to checking key by key when it cannot call `partial()`.
`definition` is optional because `swamp model create` checks the full schema
whenever a `--global-arg` is given, and a factory is created with only its
tracker. So:

- `swamp model validate <factory>` reports a schema error in the definition or
  a scenario, with its path, as `<message> at "definition.stages.1.transitions.0.to"`.
  It does not report a missing definition (an optional key), and it skips a key
  holding a swamp expression (below).
- Every factory method stops on the same error first, as `Global arguments
  validation failed: ...`, before gatorwalk's own code runs.
- gatorwalk's `validate` checks the schema again on the raw definition (which
  also catches `${{`), then the tracker binding, the graph analysis and the saved
  scenarios, and reports a missing definition with where to write it.

**`{{name}}` is marked as foreign template text.** swamp scans `globalArguments`
for `{{...}}` and fails `swamp model validate` on one whose root is a swamp
namespace (`{{run}}`, `{{steps}}`); others are warnings. gatorwalk's
placeholders are its own, so `definition` and `scenarios` carry
`.meta({ foreignTemplate: true })`, which silences the scan for the whole
subtree. Bare CEL in gates and bindings has no `${{`, so swamp never touches it.
`cli_test.ts` checks a definition with CEL gates and a placeholder named `run`
through `swamp model validate` and a start, and that the pinned copy is the
written one.

**`${{` stays rejected.** swamp evaluates `${{ }}` anywhere in
`globalArguments` before each method runs, vault and env references included,
and skips its schema check for a top-level key that holds one. So a `${{` under
`definition` is refused by gatorwalk's own check of the raw definition (it
reaches the method because swamp skipped the key), never evaluated into a
pinned copy. Allowing swamp-native `${{ }}` later, for a vault or env reference
in a specific field, would mean reading that field from the evaluated
arguments while the rest stays raw, and accepting that swamp then skips the
schema check of the whole definition; it is not enabled here.

## Summary and metrics

**Decision.** Metrics are a pure function of the run record and its journal
(`_lib/engine/metrics.ts`), stored as a `metrics` record after every commit. The
`summary` method and the `@swamp/gatorwalk-factory/work-item-summary` report
render the same data as markdown (`_lib/engine/summary.ts`,
`extensions/reports/work_item_summary_report.ts`). One thing is newly recorded:
the `awaiting` journal event (`_lib/engine/awaiting.ts`).

### Why a stored record, not only the report

swamp keeps a report's output for 30 days and five versions, and a report only
exists once something runs it. A team measuring its process needs every work
item, finished or not, over months. The `metrics` record has infinite lifetime,
is written on every commit with no trigger, and one `swamp data query` over
`name == "metrics"` returns it for every work item. It is derived, so it keeps
five versions and can always be rebuilt from the run.

It is written after the run record, in `committingStore`
(`_lib/engine/run_store.ts`). A crash in between leaves it one commit behind,
never ahead of the run; it names the `journalVersion` it was computed from, and
the next commit brings it level. A failed metrics write is logged, not thrown,
because the change it follows is already committed. A terminal work item has no
next commit, and one that has not committed since metrics were introduced has no
record at all, so the `rebuild_metrics` method rewrites the record from the run
whenever it is missing or behind, and writes nothing when it is level. Nothing
in it reads the clock: a stage or wait still running has a start and a null end,
so the same run always gives the same metrics.

### Why `awaiting` is journaled

A wait at a human stop starts when an exit becomes held only by a person, and
the journal did not record that moment. It could be replayed from the journal by
evaluating the gates at each step, but only with the gate code as it is at
replay time and only while every payload version it reads is still stored.
Neither is guaranteed, so every commit evaluates the exits instead and records a
change as it happens.

An exit is **held by a person** when it is not a global transition, its cycle
limit allows entry, every gate that is not a human approval passes, and either
one of its human-approval gates is pending, or it is manual and has gates, all
passing, and the agent has no way out of its own. A conditional approval whose
`when` is false passes, so it is no stop.

The agent has a **way out of its own** while a non-manual exit is ready without
a pending approval, waits on a product the stage declares for the agent
(`artifact-exists`, `artifact-fresh`, `evidence-recorded`, or a cooldown
counting from one) that has not been recorded in this stage entry, or waits
only on cooldowns that will lift. A gate that fails on a product already
recorded (a `requireField` or `match` that does not hold, `findings-clear`,
`findings-open`, `max-cycles`, `cel`) leaves a decision, not work: the agent
has recorded what it records. So a manual `complete` whose gates pass from
entry waits on nobody while the agent works toward the merge evidence its
`merged` exit needs; once a failed merge is recorded, `complete` and `new-pr`
wait on the person. A pending or declined approval is not the agent's way
either, so a gated manual exit beside one waits too; the summary counts that
time once (see "The metrics"). A product of another stage cannot be recorded
here, and evidence `recordedBy: person` is not the agent's. A stage whose agent
exits are gated only by `cel` over data not yet recorded has no way out the
engine can see: pair the `cel` gate with an `evidence-recorded` or
`artifact-exists` gate.

Excluded, on purpose:

- **A manual exit with no gates** (`recheck`, `revise` on stages other than
  `plan-review`) is a way back a person may always take. Counting it would make
  every stage a stop from the moment it is entered.
- **A global transition** (`abandon`) is an escape hatch, open everywhere.
- **A freshly declined gate** waits on rework, not on a person, until a product
  is recorded after the decline. Evidence a person records (`recordedBy:
  person`, such as their feedback) is not rework and does not count: after a
  declined plan and the person's feedback, only `revise` waits on them.
- **A conditional approval whose `when` cannot be evaluated** waits on a fix to
  the run data or the factory definition, not on a person.

A cooldown gate counts as passing from when it lifts; the event carries that
time as `readyAt`. Recording the product it counts from again restarts it, and
the new `readyAt` is a change: the wait so far ends (`cleared`) and a new one
starts when the cooldown lifts again. A commit whose run data cannot be read (a
payload failing its digest check) notes nothing, since the journal cannot take a
wrong event back; the next readable commit notes any change. Runs started before
the event existed have no waits rather than guessed ones.

The event is a new journal variant, so a run that holds one cannot be read by an
earlier gatorwalk-factory. Before go-live that is accepted: the upgrade is
one-way.

### The metrics

Per era, and summed over every era:

| Metric       | Meaning                                                                                                                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stage visits | Each entry into a stage: entered, left, duration, and the transition taken out (or `reset`). A terminal stage has no duration.                                                                                                                                            |
| Stage time   | Per stage, the time in finished visits, and whether a visit is still open.                                                                                                                                                                                                |
| Rework       | Re-entries (entries into a stage after its first in the era), review rounds (versions recorded of each artifact the factory definition declares with `reviews`, using the currently pinned factory definition's links), declines, and rejected payloads.                                    |
| Waits        | From the `awaiting` event that adds an exit (or its `readyAt`) until an event drops it (`approved` or `declined` when a decision on one of its gates caused that, otherwise `cleared`), the work item moves on (`advanced`), or a reset. A wait still running has no end. The summary's time is the time covered by finished waits: exits that wait at once count once. |
| Dispatches   | Per stage entry; retries are the dispatches after the first.                                                                                                                                                                                                              |
| Overrides    | Cycle and dispatch overrides granted, with their stage.                                                                                                                                                                                                                   |
| Usage        | Tokens in total and by model (a dispatch's `totalTokens` when reported, else its input plus output), the input/output split over the dispatches that reported one, tool uses and reported duration, and dispatches without usage, by stage mode. Always `attested: true`: the harness or whoever did the work reported it. |

A wait that would end before its cooldown lifted is not counted: the person
decided before the exit was ready. With `minApprovals` above 1, one wait stays
open until the gate passes.

The summary shows product versions and digests, never payload contents. Team
roll-ups are out of scope: they are a query over these records.

## The design page

**Decision.** The factory's `design_page` method renders the factory definition
as one static HTML page and stores it as the factory's `design-page` file
(`text/html`). The page shows the stage graph, each transition's gates, the
human stops, each stage's handoff (work mode, what it calls, skills, injected
context, bindings, result evidence, prompts) and products, and the graph
analysis's findings with their traces (`_lib/engine/design_page.ts`).

**Descriptions, not comments.** The factory definition, its stages, transitions,
gates, work, artifacts and evidence each take an optional `description`, and the
page shows every one. A description is for the factory definition's authors: no
engine path sends one to whoever does the work, which gets `systemPrompt`,
`command` and `constraints` (`dispatch_test.ts` pins this). Factory definition
files carry no YAML comments: agents rewrite the YAML, which drops them, and the
read-only studio and this page show descriptions, not comments. A note inside a
payload schema uses JSON Schema's own `description` or `$comment`.

**A method, not a report.** A swamp report produces markdown and JSON, is kept
for 30 days and five versions, and only exists once a run triggers it. The page
is HTML an author asks for when they want to look, so it is a file the method
writes on demand, kept like the factory's other records. A report could wrap the
same renderer later. swamp stores the file without an extension, so the page is
saved for a browser with
`swamp data get <factory> design-page --json | jq -r .content > <name>.html`,
the command the method logs.

**It renders what `validate` refuses.** A factory definition the schema rejects
fails the method with every error, as `validate` does. Graph errors and a
truncated analysis do not: the page is where an author sees them. A finding that
has a trace can be selected, and the page walks the trace across the graph one
stage at a time.

**Mermaid from a CDN, pinned.** The issue asked for no network at view time; in
triage it was agreed that loading a standard JS dependency is fine, and that the
diagram may later be animated. The page loads Mermaid from `cdn.jsdelivr.net` at
one exact version (`MERMAID_VERSION`) with a Subresource Integrity hash
(`MERMAID_INTEGRITY`), with `securityLevel: strict`. To move to a new version,
change both together: the hash is the `sha384` of that version's
`dist/mermaid.min.js`, base64 encoded. The script runs only in the viewer's
browser, never in swamp or in tests. Without it (offline, or a refused hash) the
page shows the Mermaid source as text, and every table still renders.

**The view is embedded.** Everything the page shows is derived once, as a view
(`designView`), embedded in the page as JSON and read by the page's own script.
A later view, such as an animated d3 one, reads the same data rather than
re-deriving the graph. Diagram nodes are `s<index>` rather than stage ids,
because a stage id can be a Mermaid keyword (`end`); factory definition text
never reaches the diagram, only names, and every piece of text is escaped in the
HTML and the embedded JSON. Global transitions are drawn once, from an "any
non-terminal stage" node, when that layer is on. The page reads no clock, so the
same factory definition always gives the same bytes.

**The forward flow first; loops and escapes are layers.** A real process has
many rework edges, and drawn all at once they bury the main line. The graph
first shows only the forward flow. Two checkboxes add layers: **loops back**,
the transitions that close a cycle, and **global transitions**. A transition
closes a cycle when a depth-first walk along stage transitions (from the initial
stage, then from any stage it never reached, in document order) meets its target
on its current path. Leaving those out leaves a graph with no cycles in which
every stage keeps the edge it was entered by, so hiding loops never strands a
stage. A stage only a global transition enters (`abandoned`) appears with the
global layer. Loops are drawn thin and dotted even when a person takes them.
Selecting a finding whose trace takes a hidden edge turns that edge's layer on
first. The page carries one diagram per combination of layers, so Mermaid lays
each out afresh.

**Human stops.** A manual transition and a human-approval gate without `when`
are human stops, drawn as thick arrows. A human-approval gate with `when` is a
conditional one, shown with its condition, because the graph analysis treats it
the same way: it may not apply.

## The studio server

**Decision.** The studio is a model type of its own,
`@swamp/gatorwalk-factory/studio` (`extensions/models/engine/studio.ts`), with
one instance per repo and one method, `serve`. `serve` runs a web server on
127.0.0.1 (port 0, a free one, unless `port` says otherwise), logs its URL, and
runs until swamp aborts the method on Ctrl-C (`ctx.signal`). The page lists
every factory in the repo and shows its model definition file, which holds its
definition and saved scenarios (#2884), reloading it as it changes
(`_lib/engine/studio_server.ts`, `studio_watch.ts`, `studio_serve.ts`). What the
page shows is in "Design mode".

**Its own type, not a factory method.** One studio covers every factory in the
repo through a picker, rather than one server per factory. It finds the
factories with the definition repository's `findAllGlobal`, and each one's file
with the repository's `getPath`, which answers from the path the listing just
cached; it is only called on a definition that listing returned. A file swamp
keeps outside the repo (a managed-config datastore) is shown by its absolute
path. It takes only its
own instance's lock, which `serve` holds while it runs, and never a factory's,
so `validate`, `new_key` and `start` run while it is open.

**Read-only.** The studio views; it never writes (Seth, 2026-09-30: edits come
from the agent, and people do not create or edit factory definitions by hand).
The agent writes the factory's model definition, and the page reloads it.
Every route is `GET`; any other method gets 405. No route writes a file or runs
swamp, a shell or a method.

| Route                                             | Returns                                        |
| ------------------------------------------------- | ---------------------------------------------- |
| `GET /`, `/assets/<file>`                         | the page                                       |
| `GET /api/factories`                              | every factory, with its model definition file  |
| `GET /api/factories/<factory>`                    | that file: path, text, digest                  |
| `GET /api/events`                                 | server-sent events when a watched file changes |

The page reads the definition at `globalArguments.definition` in that text and
the saved scenarios at `globalArguments.scenarios`; there is no scenario route
or scenario event.

**Security posture.** Any page in any browser tab can send requests to
localhost, so the server trusts nothing a request says about where it came from,
and reveals only files the local account can already read.

| Threat                                       | Control                                                                                                                                                                                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Another machine on the network               | Binds 127.0.0.1 only                                                                                                                                                                                                                                      |
| DNS rebinding (a hostile name for 127.0.0.1) | `Host` must be `127.0.0.1:<port>` or `localhost:<port>`                                                                                                                                                                                                   |
| Another website reading responses            | A request carrying `Origin` must carry the server's own; a `Sec-Fetch-Site` other than `same-origin` or `none` is refused, except a person opening `/` itself from a link (a top-level document navigation, which the linking page cannot read); no CORS header is ever sent; `Cross-Origin-Resource-Policy: same-origin` and `nosniff` stop no-cors embedding                  |
| Reading other files (path traversal)         | A request names a factory, never a path. The only file read is the one swamp's definition repository gives for that factory's model definition |
| Scripts from elsewhere                       | CSP `default-src 'self'`, no inline script or style; the fonts are bundled                                                                                                                                                                                |

There is no token or cookie: nothing is written, and the files are ones the
local account can already read. **If a write route is ever added**, it needs the
design from the studio proposal first: a one-time token exchanged for an
`HttpOnly`, `SameSite=Strict` cookie, a custom header on every call, and a write
that carries the digest the page loaded and is refused on a mismatch.

**Live reload.** The file watch (`Deno.watchFs`) covers the directory of each
factory's model definition file, so an agent's write by rename is seen. Every
watch is one level deep, on the directory of a path the definition repository
gave. It follows the factory list each
time the page reads it, one refresh at a time so a slow one never wins over a
newer list; a refresh that fails keeps the old watches and the next one retries.
swamp says nothing when a factory is created or removed, so `serve`
reads the factory list again every three seconds, and a change sends
`{ kind: "factories" }`, on which the page lists them again. The watch drops
paths nobody asked about, coalesces a save's several events, and sends
`{ kind: "definition", factory }` to every open event stream. Deno's server waits for
open responses when it stops, so the event streams close on the same signal.

**The page is embedded, not beside the module.** The page's source is
`studio/src/` (Preact with signals, grown from the prototype; its tokens follow
swamp-club's HUD style) with the fonts in `studio/fonts/`.
`deno task build:studio` bundles it with `deno bundle --platform browser` and
writes every served file into generated modules beside the engine, which
`serve` serves from: the script in `_lib/engine/studio_asset_app.ts`, the fonts
in `studio_asset_fonts.ts`, and the HTML and CSS, with the map of them all, in
`studio_assets.ts`. A model added as an extension source runs from
swamp's bundle directory (`.swamp/bundles/<hash>/`), so nothing beside the
source module can be found from `import.meta.url`, and `ctx.extensionFile()`
needs a manifest. Embedding works the same before and after go-live.

**Fresh by digest.** `studio_assets.ts` records a sha256 of the build's inputs,
and `studio_assets_test` recomputes it, so a stale page fails the unit tests.
The inputs are `studio/src` (its tests aside), `studio/fonts`,
`studio/build.ts`, the engine modules the page bundles (`ENGINE_INPUTS` in
`build.ts`), and `deno.json` and `deno.lock`, which pin the packages in the
bundle. So a change to one of those engine modules needs
`deno task build:studio` in the same change (accepted 2026-09-30). Text inputs are hashed with
LF line endings, so a checkout that writes CRLF gives the same digest. Rebuilding
and diffing
would depend on the Deno version that bundles, which verification does not pin.
`build.ts` refuses to build when the bundle's graph differs from the inputs:
a local module outside `studio/src` and `ENGINE_INPUTS`, an engine module
missing from the list or listed but not imported, or a remote module that is
not an exact npm or JSR version. `studio_assets_test` also compares
`ENGINE_INPUTS` with a walk of the import lines (it may only read, so it cannot
run `deno info`), so an engine import added without a rebuild fails the tests
too. The same test keeps every generated module under 800 KB, well under the
registry's 976.6 KB file limit. The script is the one to watch: 670 KB with
Design mode and 737 KB with Simulate mode, most of it zod, cel-js and the yaml
packages the engine and page need. If it nears the limit, the next step is to
store it gzipped and serve it with `content-encoding: gzip`, about a fifth of
the size.

## Design mode

**Decision** (swamp-club #2807). The studio's Design mode shows one factory
definition on one screen, and runs gatorwalk's own checks on it in the browser
every time the file changes. It never edits: the agent writes the file, and the
page hands the agent a reference to what a person is looking at.

**The engine in the page.** `studio/src/model.ts` reads the file's text with
`@std/yaml`, as `validate` reads the file, so the page shows what `validate`
would; checks it with `DefinitionSchema`, keeping each issue's path; then runs
`analyzeDefinition` and `designView`. The engine is imported by relative path,
never copied. The `yaml` package parses the same text again only for positions,
so a document path (`stages.2.transitions.0`) maps to a line, falling back to
its nearest parent that exists. The server's CSP forbids eval, so the page sets
zod's `jitless` before the engine loads (`jitless.ts`); otherwise zod's probe
for eval logs a violation on every load.

**The layout** (`layout.ts`, from the prototype). One row per tracker status: a
stage's `tracker.status`, else the status its enter entry sets, else its
latest predecessor's in flow order. Columns follow the longest forward path from
the initial stage, loops left out. Each exit is a port on the right of its tile,
with a pip per gate, gold where a person decides. Edges are orthogonal and run
through the channels between columns and rows, one track per edge per channel,
forward edges nearest the tiles. Each edge enters its target at a point of its
own on the tile's left side: ports sit halfway down an exit row and entries on
the row lines, so an exit leaving one tile never runs along an entry into the
next, and the tile grows when it has more entries than rows. Global transitions
leave one ANY STAGE tile. The layout is pure, and the tests check, on every
example definition, that no two edges overlap, no edge passes through a tile,
every edge has its own port and entry, and the same definition gives the same
layout.

**Selection by identity.** A document path is positional, so when the agent
inserts a stage or an exit, the same path names something else. The page holds
the selection by what it is (`selection.ts`): a stage by id, an exit by its
stage and name, a finding by code, stage and message. Gates have no names, so a
gate is its type, the name it is about (the artifact, the approval id, the
evidence, the stage of a max-cycles gate, a cel gate's expression), and which of
the gates sharing those it is. After each reload the path is found again; a
target that is gone falls back to its exit, then its stage, then nothing. Gates
were not given names: most already have a natural key, and a field every
definition must carry was not worth it for this.

**Copy reference** (`reference.ts`). Every stage, exit, gate and finding has a
button, and `c`, that copies one plain line: the factory's model definition
file, the document path in it, and a readable name, plus the code and message
for a finding. For example
`models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.stages.2.transitions.0 (exit submit: plan → review)`.
Inside the page, paths stay the definition's own (`stages.2`), as the engine's
findings give them; only the source positions and the copied line carry the
`globalArguments.definition` prefix. That is the whole hand-off: no chat, no
request form.

**Changed marks** (`changes.ts`). Each stage, and the global transitions as ANY
STAGE, has a fingerprint of its parsed spec. The browser keeps, per factory in
`localStorage`, the fingerprints it last showed. A stage counts as seen when it
is selected, or on Mark all seen; the first visit records a baseline and marks
nothing. Storage that throws (private windows) only means the marks last as
long as the page.

**A file that fails the schema** shows its problems in Findings and underlines
them in the source; the graph keeps the last version that passed, dimmed and
labelled stale. Reloads coalesce: one in flight is followed by at most one more.

**Keyboard** (`nav.ts`). The graph is one tab stop (an ARIA tree) whose roving
focus is the selection. Arrows move between stages (left and right in a row, up
and down to the nearest stage in the next row); Enter steps into a stage's
exits; on an exit, Enter follows it to the stage it leads to and → steps into
its gates; Esc or ← steps back out. `c` copies a reference only while focus is
in the graph, the findings or the inspector, never page-wide (WCAG 2.2 SC
2.1.4). The tests check that every stage, exit and gate is reachable from the
first stage by keys. Scrolling to a selection moves only the pane that holds it,
never the page.

**Theme.** swamp-club's HUD. A work mode is shown by colour and always with a
glyph and a label; human stops are gold. Focus rings are visible, all motion
stops under `prefers-reduced-motion` (a finding's trace then shows at once), and
below 980px the panels stack under the graph, which scrolls in its own pane.

## Simulate mode

**Decision** (swamp-club #2808). The studio's Simulate mode plays a factory's
saved scenarios on the real engine in the browser, re-runs them whenever the
factory's model definition changes, and lets a person step a work item
through by hand from any frame. It never writes: a walk worth keeping goes to
the agent as text, and the agent saves it.

**The runner in the page.** Simulate reads the scenarios through Design mode's
own loader (`model.ts`, which keeps each entry as `@std/yaml` reads it) and
the same `definition` event; there is no route or watch of its own. Each entry
is checked with `parseScenario` and played with the engine's `runScenario`
(`scenario.ts`, bundled with `metrics.ts`), so a frame in the page is the frame
`validate` sees: the committed run after one step, every exit's readiness, and
`computeMetrics` on the scenario's clock. An entry that does not parse is
reported on its own, and the rest still run. A reload that fails the schema
does not re-run: the last results stay under the STALE note, so the scenarios
of a broken file never run against the last good definition.

**Walk from here** (`simulate.ts`). From any frame a person can take a step of
their own: an exit (every exit, so a refusal can be seen), approve or decline
on a pending human approval, an override where a cycle limit closes an exit, a
wait, or a record. A walk is the base scenario's steps up to that frame, copied,
then the person's, run as a scenario like any other, so it replays on every
reload and still runs when its base is renamed or removed. Stepping from an
earlier frame of a walk cuts it back there. Until swamp-club #2809, `record`
offers only the payloads that the factory's saved scenarios already record
for that product; a product with none is listed as having nothing to offer.
Another scenario discards a walk with steps of its own only after a yes.

**Exits as status reads them.** READY, PERSON or BLOCKED comes from an exit's
gate checks and cycle limit, not its failure messages: PERSON is a manual exit
that is otherwise ready, or one whose every failing gate is a human approval
that must be decided now; a closed cycle limit is BLOCKED, with the override
offered.

**Copy as scenario.** A walk shows as one entry for `globalArguments.scenarios`
(no `factory` key), indented to paste: the base's steps as they were, the
person's with `expect: { refused }` on each one the engine refused (its reason,
word for word, which the deterministic clock keeps stable), and a closing
`expect: { stage }`. The page re-runs the entry on its own and says whether it
passes. The person hands it to the agent, which names it, may shorten the
refusal texts, and saves it; `validate` then runs it with the rest.

**Overlay and dock.** On the graph: the current stage glows, visited stages
carry their entry count, exits taken carry theirs, the current stage's exits
are coloured by what they need, a refused move flashes its exit, a token runs
along each transition taken when stepping forward, and the canvas follows the
current stage. The dock plays the frames (first, back, play, step, last, speed),
with a tick per step coloured by kind, outlined red when not as expected and
marked when it is the person's own, and a ribbon of the stages over them. Space
plays and the arrow keys step, but only while focus is on no control, so a key
a focused button, field, tab list or the graph uses is never taken twice. Under
`prefers-reduced-motion` there is no token, no pulse, and the canvas jumps
rather than scrolls. Timeline positions are set as style properties through
the CSSOM, which the CSP allows; the page writes no style attribute.

## Trackers

**Decision.** A tracker (the built-in tracker, Linear, and the swamp-club Lab,
which is the swamp-club team's own: see "The swamp-club Lab adapter") is reached only through an **adapter**: its own model type, never part of the
work item. The contract is written once, in `_lib/tracker/core/adapter.ts` and
`_lib/tracker/core/tracker_methods.ts`, and each tracker is a thin model over it
(`extensions/models/tracker/builtin.ts`, with its backend in
`_lib/tracker/backends/builtin.ts`; `extensions/models/tracker/linear.ts`, with
its client in `_lib/tracker/backends/linear.ts`;
`extensions/models/tracker/swamp_club.ts`, with its client in
`_lib/tracker/backends/swamp_club.ts`). Every project has a tracker: with no
external one, the built-in tracker is it.

The contract:

- **Swamp owns the lifecycle facts; the tracker is a view of them.** The work
  item's run record and journal are the truth. What a ticket shows is written
  from them, never read back into them.
- **A ticket's own facts belong to its tracker, and each record says who
  holds them.** A ticket's identity, title, type and status belong to the
  tracker, and the adapter's `issue-<id>` record carries an `origin`. With an
  external tracker (Linear, the Lab) it is `snapshot`: the tracker owns the
  facts, and the record is its last read, stamped `fetchedAt`. `fetch_issue`,
  `claim` and `create` write it, and it may be stale: a change made in the
  tracker since is seen at the next of those reads, which is acceptable because
  nothing gates on it. With the built-in tracker it is `builtin`: the record
  is the ticket, with its body, type and timestamps, and no read overwrites
  it. The adapter declares which it is (`origin`), and the shared methods write
  a snapshot only for `snapshot`.
- **The state piece makes no network calls.** Only adapters talk to a tracker.
  The work-item type and its runtime make no network call, so a tracker being
  down or slow never holds a work item's lock or fails one of its writes.
- **One writer per tracker field.** An adapter's `set_status` is the only code
  that writes a ticket's status, and the publisher (`publish`, below)
  is its only caller for a work item. The same holds for a ticket's type, where
  the tracker has one: `publish` sets it from the entry that names it. A stage
  that wants the ticket to move requests a transition; the publisher reflects
  it. A person moving the ticket in the tracker is outside this rule;
  reconciling that belongs with inbound webhooks.
- **Tracker ids are data.** A work item records them in `externalRefs`: the
  stable id under the tracker's name, and the human identifier under
  `<tracker>.display`, for example
  `{"builtin": "cue-board-shortcuts-r2ne", ...}` for a built-in ticket, or
  `{"linear": "<issue UUID>", "linear.display": "ABC-1"}`.
  `claim` leads the key with the display id for a person to read, but no code
  reads it back: `externalRefs` is the only link. It changes only through
  `start`, which sets it, and `retarget`, which replaces it whole and journals a
  `retargeted` event (the old and new maps, the reason and the actor).
  `retarget` is an engine method: it has no gate, changes no stage, and is
  refused on a finished work item and for a map that names no ticket (no
  non-empty stable id, only `<tracker>.display` keys), which would silently
  detach the work item from every tracker. It knows nothing of trackers or
  duplicates, and the publisher works out from the journal which ticket each
  event belongs to (see "Retargeting" under "The publisher"). A
  Linear identifier that changes when
  an issue moves team leaves that slug stale, which is accepted. Linear
  identifiers change when an issue moves team, so Linear keys on the UUID:
  `comment` and `set_status` refuse an identifier, and `fetch_issue`, which
  accepts either, reports the UUID and the `externalRefs` to start a work item
  with.
- **Credentials never come from factory definition data or method inputs.** An
  adapter's credential is a sensitive global argument, which can be wired with
  `${{ vault.get(<vault>, <key>) }}` so swamp resolves it at run time and
  redacts it from logs. The Linear adapter reads that argument only. The Lab
  adapter resolves its key as issue-lifecycle does: the `apiKey` argument, then
  the `SWAMP_API_KEY` environment variable, then swamp's stored login
  (`auth.json`, written by `swamp auth login`). Its server is the `url`
  argument, then `SWAMP_CLUB_URL`, then the stored login's server (only when the
  key came from there), then `https://swamp-club.com`. Reading the environment
  is reasonable here: it is the credential swamp and issue-lifecycle already use
  for the same service, and it keeps the key out of every definition. One
  difference from issue-lifecycle: the stored login's key is only sent to the
  stored login's own server. A `url` or `SWAMP_CLUB_URL` naming another server,
  with no key of its own, is refused as `auth` rather than handed that key. A
  stored login that exists but cannot be read is also `auth`, never taken as
  "not logged in". Linear's `apiUrl` must be https; plain http is allowed only
  for 127.0.0.1 and `[::1]`, where the tests run a local fake. The swamp-club
  adapter applies the same rule to its resolved server url, wherever it came
  from.
- **Delivery is idempotent on (work item, journal version).** The journal
  version is the length of the run record's journal array. The journal only
  grows (`reset` carries it forward, and only `start` begins one), and its
  length does not depend on swamp's data versions or their retention. A
  `comment` or `set_status` given `workItem` and `journalVersion` records what
  the tracker returned (a comment's id and url, or the status) in the adapter
  instance's delivery ledger, as
  `delivery-<action>-<workItem>-<journalVersion>`. A later call with the same
  key finds that record and writes nothing to the tracker, even if the
  `statuses` mapping has changed since. The record keeps a digest of what was
  asked (the comment body or the status key), so the same key for a different
  ticket or a different request is refused rather than silently skipped. One
  journal version can need a write on two tickets: a retarget's notes to the
  old and the new ticket. `publish` names the new ticket's note with an
  `-opening` suffix, so each ticket has its own key. `relate` and `unrelate`
  name theirs for the relation too (`-<issue>-<type>-<to>`), so one journal
  version can relate several tickets, as a breakdown relates each child.
- **The tracker owns relations.** A ticket's relations to other tickets
  (`parent_of`, `blocked_by`, `related_to`, `duplicate_of`) are tracker facts,
  like its status. Swamp reads them at decision points (`fetch_issue`, `claim`,
  and before each `relate`), never reconciles them, and a relation changed in
  the tracker is seen at the next read; `relate` and `unrelate` do not refresh
  a snapshot. Every tracker keeps the same rules
  (`_lib/tracker/core/relations.ts`): one parent per child, no parent cycle
  (walked 10 deep), one canonical per duplicate, and no duplicate chain. The
  Lab enforces them itself and Linear does not, so each adapter checks them
  before it writes; two relates racing on Linear can both pass. The built-in
  tracker keeps a relation on both tickets' records. A Lab `duplicate_of`
  leaves the issue's status alone.

Every adapter provides eight operations, as swamp methods built by
`trackerMethods`:

| Method        | Inputs                                             | Writes                                                    |
| ------------- | -------------------------------------------------- | --------------------------------------------------------- |
| `create`      | `title`, `body`, `type`: all required              | `issue-<id>`: a snapshot, or the built-in ticket          |
| `fetch_issue` | `issue`: stable id or display identifier           | `issue-<id>`: a snapshot                                  |
| `comment`     | `issue` (stable id), `body`, optional delivery key | the ledger record, when keyed                             |
| `set_status`  | `issue` (stable id), `status` key, optional key    | the ledger record, when keyed                             |
| `relate`      | `issue`, `type`, `to` (stable ids), optional key   | the ledger record, when keyed                             |
| `unrelate`    | `issue`, `type`, `to` (stable ids), optional key   | the ledger record, when keyed                             |
| `claim`       | `issue`: id or display, optional `factory`       | the snapshot, and the ticket index when it reserves a key |
| `publish`     | `workItem`: the work item's key                    | ledger records and its cursor                             |

**Create.** `create` files a new ticket. With an external tracker the ticket is
filed there first and its id is used; swamp never mints an id for a ticket
another tracker owns. The type is required and must be one the tracker has:
the Lab's feature, bug or security (platform needs an admin key), the built-in
tracker's `types`, or, for Linear, which has no issue type, a type the `types`
argument maps to a label (matched exactly among the labels the `teamId` team
can use: its own and the workspace's). Linear files in the `teamId` team and
refuses `create` without one. `create` is not idempotent: see the known gaps.

**Capabilities.** What a tracker offers beside the contract is an explicit
`capabilities` object on the adapter. A capability is present or absent; asking
an adapter for one it lacks is refused as `TrackerError` `invalid`, naming the
capability (`requireCapability`), never degraded silently. `publish` decides
entry mode from whether the capability is present, so it never asks for one an
adapter lacks.

**The history capability.** A tracker that keeps a structured history of each
ticket and a ticket type (the built-in tracker's own records, and the Lab's
lifecycle entries and issue type) offers it as `capabilities.history`
(`postEntry`, `setType`). Linear has neither, so it lacks the capability. `publish` uses it when the factory definition declares
tracker entries; its writes go through the same ledger (actions
`lifecycle_entry` and `set_type`). The conformance suite checks it for an
adapter that declares it (an entry returns its id, a type move is a no-op the
second time, bad credentials are `auth`) and skips it otherwise. A snapshot may
also carry the tracker's own `details` (the Lab's body, type, author and
ripples).

**The assign capability.** A tracker whose tickets have assignees offers
`capabilities.assign` (`assign`): it adds the tracker's user to the ticket's
assignees, keeping those already there, and an already-assigned user writes
nothing. The Lab and the built-in tracker have it; Linear lacks it until its
users can be mapped. Whom to assign is a separate mapping, from swamp's stored
login to the tracker's user, which each tracker model supplies as `assignee`
in its options: the built-in tracker takes the login's username, from
whichever server, since its assignees are swamp users; the Lab takes it only
when the login is for the server it writes to. `publish` assigns only when a
tracker has both (see "The publisher"). The conformance suite checks the
capability for an adapter that declares it (the user is added once, bad
credentials are `auth`, a missing ticket is `not_found`) and that one without
it refuses.

**The pull request capability.** A tracker that links a pull request on a
ticket offers `capabilities.pullRequests` (`linkPr`): it links the url, and a
url already linked writes nothing. Only the Lab has it, as the issue's
`githubPrUrl` and `githubPrNumber`, which keep one pull request, so a new url
replaces the old. `publish` links one when an entry reads its url (`linkPr`),
through the same ledger (action `link_pr`); a tracker without the capability
publishes the entry without a link. The conformance suite checks it for an
adapter that declares it (linked once, another url replaces it, bad credentials
are `auth`, a missing ticket is `not_found`) and that one without it refuses.

`set_status` takes a gatorwalk **status key**, which the `statuses` global
argument maps to the tracker's own status name (Linear statuses belong to a team
and are matched by exact name, then resolved to an id at call time). An unmapped
key is refused, listing the mapped keys; a name the team lacks is refused,
listing the team's statuses. Moving a ticket to the status it already has writes
nothing.

Failures are a `TrackerError` with one of five kinds: `auth`, `not_found`,
`rate_limited`, `invalid` or `upstream`. An `invalid` status move may also carry
the reason `unreachable`: the tracker knows the status, but the ticket cannot
get there from where it is (the Lab only moves forward, and a shipped issue
cannot be closed). A ticket in a status the adapter does not know is plain
`invalid`, so publish reports it rather than skipping the move. Nothing is
retried: every write is idempotent through the ledger or by being a no-op, so
the caller re-runs. `_lib/tracker/core/tracker_conformance.ts` checks this
contract the same way for every adapter, against that adapter's local fake of
its tracker. It checks a bad credential on a write (`comment`), not a read:
swamp-club serves reads to anyone, so a bad key only shows once the adapter
writes.

**Known gaps.** The ledger is read, then the tracker is written, then the
ledger. That relies on swamp running one method at a time per adapter instance,
so keep one adapter instance per tracker workspace. A crash after the tracker
accepted a write but before the ledger record landed repeats that one write on
retry. For a comment that means a duplicate. A hidden marker in the comment
body, searched on retry, would close it if that matters. Ledger records are kept
by age for a year; a replay of a key older than that would write again. Linear
status lookup reads up to 250 statuses per team, Linear's page limit; label
lookup filters by the mapped name on the server, so it has no such limit. `create` has no ledger key: a crash after the
tracker accepted a new ticket but before swamp saw the reply, and a retry, file
a second ticket. That is accepted for now; the duplicate is closed by hand.

### The seam

**Decision.** Tracker code lives in gatorwalk-factory, apart from the engine,
and a test keeps the two apart. The engine is the factory, the work
item and everything under `_lib/engine/`. The tracker is the adapter models in
`extensions/models/tracker/`, the contract in `_lib/tracker/core/`, and the
clients and their fakes in `_lib/tracker/backends/`. `boundary_test.ts` holds
the rules:

- Engine code imports no tracker code. The engine knows only the tracker a
  factory is bound to: the instance's name, its kind and the model type each
  kind needs, and the shape of that instance's publish cursor, which `status`
  reads as data ("The factory's tracker", below). All of it is in
  `_lib/engine/tracker_binding.ts`, and the engine never calls a tracker.
- Tracker code imports the engine only through `_lib/engine/tracker.ts`, which
  re-exports exactly what tracker code uses: the run record, the journal types,
  the pinned factory definition, the template renderer, the publish cursor's
  schema and a few work-item helpers. Tracker tests may also use `_lib/engine/tracker_testing.ts` (the
  fakes and the work-item operations they drive) and `integration/harness.ts`.
- Tracker core imports no backend, so the contract never depends on one tracker.
- Production code imports no test code, and the surface exports nothing that
  tracker code does not import.

The same split holds for tests: the integration suite has `engine/`, `tracker/`
and `extension/`, and only `extension/`, which checks the extension as a whole,
imports from both sides. Each rule is shown failing on a planted import.

**Why a test, not a package.** A separate tracker extension would have one
consumer, gatorwalk. It would also have to publish the run record, the journal
and the pinned factory definition as a cross-package API, because the tracker
reads all three. A test gives the same isolation with none of that: an import
that crosses the line fails the build, and the surface shows in one file exactly
what the tracker depends on.

### The factory's tracker

**Decision.** A factory definition names the kind of tracker it is written for,
`tracker: { kind: builtin | swamp-club | linear }`, and the built-in tracker
when it names none. The kind belongs to the definition because what the
definition says depends on it: its stage entries need a tracker that keeps
history, and its status keys and type fields must be ones that tracker has. The factory names the tracker
instance, its required `tracker` global argument, because which instance is a
choice per repo and the definition is portable. The instance keeps the
tracker's own settings (the built-in tracker's `prefix`, `statuses` and
`types`, Linear's `teamId`, `statuses` and `types`, the Lab's `statuses`): the
tracker instance is the tracker's definition, so there is no separate document
for it.

- **validate and start check the binding.** Both resolve the instance through
  the definition repository and refuse, naming both sides, a factory with no
  `tracker` argument, an instance no model is named, or one whose model type is
  not the one the kind needs. `kinds_test.ts` on the tracker side keeps each
  kind's type and tracker name equal to its adapter's.
- **start pins it.** The run record carries `tracker: { instance, kind }` beside
  `externalRefs`, so a later edit to the factory never moves a running work
  item to another tracker. A retarget changes the refs, not the tracker. A
  saved scenario runs in memory with no tracker, so it pins
  `{ instance: scenario, kind: <the definition's> }`. start also refuses
  `externalRefs` whose tickets are all on another kind of tracker (a ticket
  claimed on one tracker, started under a factory bound to another): no
  tracker could publish that work item, and status would call it never
  behind.
- **status shows the lag.** It reads the pinned instance's `cursor-<key>` as
  data (`readModelData`, no network call) and reports the journal version
  delivered against the journal's length: `tracker '<instance>' behind by N
  event(s): run publish on it`, and nothing once they match. The count is not
  split by ticket after a retarget. A work item with no `externalRefs` under
  its kind has nothing to publish and is never behind. A cursor that cannot be
  read shows `lag unknown` and the reason, and status still answers.
- **publish runs only on the pinned instance.** Any other instance refuses the
  work item, so the cursor status reads is the one publish moves.

**Not checked yet.** Whether each stage's `tracker.status` key is one the bound
tracker has, and whether a definition with entries is bound to a tracker that
keeps history. Each adapter's default status map is tracker code the engine
cannot import, so this is a tracker-side check method (swamp-club #2847).

### The publisher

**Decision.** `publish` replays one work item's journal to its ticket. It is one
of the shared methods in `_lib/tracker/core/tracker_methods.ts`, so every
adapter has it unchanged, and what it says is a pure function of the run and its
pinned factory definition (`_lib/tracker/core/ticket_view.ts`). An explicit
method now: a scheduled sweep or a driver tick can call the same thing later.

What it does, in order (step 3 is comments; a factory definition with entries is
published as entries instead, below):

1. **Reads the work item** through `context.readModelData(<key>, "run")`, and
   its pinned factory definition: by exact version through `context.queryData`
   (a query naming `version` reaches history; `readModelData` gives only the
   latest), and otherwise, or if that query fails (logged), the latest copy. The
   query is not limited to this repository's namespace, so a candidate is used
   only if its digest is the one the run recorded. The ticket is
   `externalRefs[<tracker>]`, one ticket per segment of the journal (see
   "Retargeting" below); a work item that never had one is refused.
2. **Reads its cursor**, `cursor-<key>` on the adapter instance: the journal
   version delivered so far, the ticket, and the last status key written. The
   cursor's ticket must be the one its journal version belongs to: a cursor for
   an older ticket is where the publish resumes, and one for a ticket no
   retarget explains is refused, since one work item projects to one ticket at
   a time.
3. **Posts a comment for each event after the cursor** that a person on the
   ticket needs, keyed on (work item, that event's journal version). publish
   keeps its own ledger records, `delivery-publish-<action>-<key>-<version>`, so
   a key someone passed to `comment` or `set_status` by hand neither stands in
   for a publish nor blocks it. The events: `started`, `advanced` (worded as
   finishing when the stage is terminal, so `abandoned` is not announced as
   done), `approval` (given or declined, naming the actor's platform principal
   as the journal records it; an asserted actor is free text and left out),
   `awaiting` with exits (each exit and what it needs), and `reset`.
   `dispatched`, `usage`, `recorded`, `rejected`, `override` and an empty
   `awaiting` post nothing; `retargeted` is said by the two tickets' notes
   (see "Retargeting").
4. **Writes the status once**, keyed on (work item, journal length), and only
   when the current stage's status key differs from the last one written. A
   person who moves the ticket in the tracker is not undone by a publish that
   did not change the stage; the next stage whose key differs moves it again. A
   move the tracker refuses as `unreachable` is recorded in the ledger as
   skipped, counts as written, and is logged rather than failing the publish.
5. **Writes the cursor last.** A failure part-way leaves the cursor where it
   was; the re-run replays from there and the ledger turns every write that
   landed into a no-op. A publish with nothing new writes nothing.

**Assigning when work starts.** On the work item's `started` event, after
that event's own comment or entry and before any later event's, `publish`
assigns the ticket through the assign capability to the user the stored login
maps to, under its own ledger key (action `assign`, the `started` event's
journal version). It is best effort and never retried, as issue-lifecycle's
`start` assigns: any failure, finding the user included (no stored login, a
login for another server, a user the tracker does not know, a tracker that is
down), is logged as a warning and recorded in the ledger as skipped, so a
re-run tries nothing and the replay goes on. Assigning a ticket is a
convenience, not a lifecycle fact, and a person can assign it by hand; a
publish that stalled on it would hold back every later write. In entry mode,
when the assign added the user, issue-lifecycle's `assigned` entry follows,
labelled with the ticket's status, under the `started` event's entry key with
an `-assigned` suffix. It is driven from the assign's ledger record, so a
re-run after the entry failed writes it without assigning again. Only the
publish that delivers the `started` event assigns: a work item first published
before `publish` assigned is never assigned by a later one, and a retarget's
new ticket is not assigned. A reset is not a start and assigns nothing. A
tracker without the capability, or without a login mapping, is never asked.

**Entries instead of comments.** A stage's `tracker.entries` says which of
its journal events become structured entries in the ticket's history: entering
the stage (or starting in it), a product it declares being recorded, or one of
its human-approval gates being approved. When the pinned factory definition
declares any and the adapter has the history capability, `publish` writes those
entries and no comments: one event, one entry, or none if no entry answers it (a
decline, a wait, a reset, a stage without entries). This is how a built-in
ticket keeps a history of steps rather than a stream of comments; a definition
names each entry's step, emoji and status label. (The swamp-club team's own
factory definition uses it to write issue-lifecycle's step names on its Lab
issues.)
Which event is which step belongs to the factory definition, pinned with it, for
the same reason as the status key. For a recorded product, `publish` reads the
payload at the version the journal names (by query, falling back to the latest
copy) and accepts it only if its digest is the one the journal recorded, so an
entry never describes a later version. `match` picks between entries on one
trigger, `{{field}}` fills the summary from the payload (an absent field is
empty text), and `setsType` names a payload field whose value is written as the
ticket type first, under its own ledger key, as issue-lifecycle writes the type
before its `classified` entry. `linkPr` names a payload field holding a pull
request url, linked next (where the tracker has the pull request capability)
under its own ledger key, as issue-lifecycle's `link_pr` links the pull request
with its `pr_linked` entry. An entry's `targetStatus` is a label only
(swamp-club never moves the issue for it): the entry's own `status` key, else
its stage's, else the last stage's before it, else the ticket's current status.
Summaries are a template over the payload, not CEL, so what issue-lifecycle
computes (counts, versions, attempts) is left out. A summary needs fixed text besides
its placeholders, and names only scalar fields. The payload sent is the recorded
one without keys that start with `$`, which swamp-club refuses. An entry or type
the tracker still refuses outright (`invalid`) is recorded in the ledger as
skipped and logged, and the replay moves past it: its request comes from a
digest-pinned payload, so no re-run could ever land it, and stalling there would
freeze the ticket's status and every later entry. Other failures stop the
publish for a re-run.

**Where the stage-to-status mapping lives: both places.** A stage names a
gatorwalk status key (`tracker: { status: in_progress }`), and the adapter's
`statuses` argument maps keys to the tracker's own names. The key belongs in the
factory definition because only its author knows what a stage means, and there
it is pinned by digest with the rest of the run. The tracker's names belong to
whoever runs the workspace, and differ per team. The example factory definitions
use the built-in tracker's default statuses as keys (`open`, `in_progress`,
`shipped`, `closed`), so the built-in tracker needs no `statuses` list and
Linear maps the same keys to its team's names. A stage without a key leaves the status
alone.

**Retargeting.** A `retargeted` event whose old and new maps name different
tickets for this tracker ends one segment of the journal and starts the next
(`ticketSegments` in `ticket_view.ts`). A retarget of another tracker's ref does
not split this tracker's journal. Events up to and including the retarget
belong to the old ticket, later ones to the new. `publish` walks the segments
from the cursor, doing steps 3 to 5 for each ticket in turn:

- The old ticket gets what it had not been sent yet, then a note naming the new
  ticket (by its display id, else its stable id), and its status only up to the
  stage the work item was in at the retarget. A publish whose cursor was behind
  the retarget therefore finishes the old ticket before touching the new one.
- The new ticket gets a note naming the old one and the stage, then every later
  event, and the current stage's status whatever the old ticket had: its first
  status write is unconditional.
- A ref the retarget adds (no old ticket) gets a "linked" note instead. A ref
  it removes leaves the old ticket a note that the work item no longer reports
  to it. The events after that have no ticket for this tracker, so they are
  never pending: once the old ticket has its note, `publish` reports the work
  item up to date.
- The notes are comments in entry mode too, since no entry answers a retarget.
  The new ticket's history starts at the retarget; the earlier entries stay on
  the old ticket, and the note says where they are.
- The reason is free text and is left out of both notes, as an asserted actor
  is. Ref values go into the notes as given: refs from `claim` are safe, but a
  hand-typed one that swamp-club refuses (swamp-club#2284) stops the publish.
- The cursor is written after each ticket, so a failure on the new ticket keeps
  the old ticket's delivery. The old ticket's status write is keyed on the
  journal version before the retarget (the stage is the same there), and the
  new ticket's on the journal length, so no status key names two tickets.

**Why replay tolerates a reworded body.** The ledger refuses a key reused for a
different request. `publish` derives its keys from the journal, so a different
request under its own key can only mean a later gatorwalk-factory words the same
event differently; a re-run after an upgrade counts it as delivered and logs the
difference. `comment`, `set_status` and `set_type` keep the strict refusal.

**Known gaps.** A crash between the tracker accepting a comment and the ledger
recording it repeats that comment (the adapter contract's gap, above). Catching
up after a long outage posts one comment (or entry) per event. A work item
parked by its stage's dispatch cap is not in the journal, so it is not published
(#2703). A failed publish does not block the work item, unlike issue-lifecycle,
whose methods fail when their entry is refused; the ticket falls behind until
`publish` is re-run, which the driving reference asks for after each step.

### The swamp-club Lab adapter

This adapter is the swamp-club team's own, for its own repositories: it needs a
swamp-club team account, so it is not an option for anyone else, and the skill
and README offer only the built-in tracker and Linear.

`@swamp/gatorwalk-factory/swamp-club` is the Lab's adapter. What is particular
to it:

- **Ids.** The stable id is the issue number as a string (`2631`); the display
  form is `#2631`. `fetch_issue` accepts either; writes take the number only, as
  every adapter's writes take the stable id.
- **A ripple is a comment.** `comment` posts a ripple and records its id. A
  ripple has no anchor of its own, so its url is the issue's
  (`<server>/lab/<n>`, since the API returns no url either).
- **Statuses only move forward.** The Lab has five statuses: `open`, `triaged`,
  `in_progress`, `shipped` and `closed`. swamp-club accepts only the next step
  along open, triaged, in_progress, shipped, so `set_status` reads the issue's
  current status and PATCHes each step in turn. Moving backwards is `invalid`,
  as is a name that is not one of the five (the message lists them). `closed` is
  one move from anything but `shipped`; a closed issue reopens to `open` and
  walks forward from there. A walk that fails partway says which steps landed,
  and records no delivery, so a re-run starts from wherever the issue really is.
  The `statuses` argument defaults to each Lab status mapped to itself.
- **Beyond the contract.** `assign` adds a user (by swamp-club username) to the
  issue's assignees, keeping those already there; an already-assigned user
  writes nothing. swamp-club refuses the whole list if any id on it has left the
  team, so `assign` keeps only assignees still on the eligible list it has
  already fetched, and names each one it dropped in its result and log line. An
  assignee in the issue's reply without a `userId` could not be kept, so that
  reply is `upstream` rather than a silent unassign. Without a `username` input
  `assign` takes the stored login's user, as issue-lifecycle does, but only when
  the server it writes to is that login's own; otherwise it asks for `username`.
  `set_type` sets the issue's type (one of bug, feature, platform, security);
  the same type again writes nothing. `team_member` says whether the issue's
  author is on swamp-club's team, from a fresh read of the issue and of the
  eligible-assignee roster, matching the author's id and falling back to the
  username, as issue-lifecycle does. It is fail-closed: any failed read is an
  error, never "not on the team". `thank_author` does issue-lifecycle's
  `notify`: the team check, then issue-lifecycle's thank-you ripple (word for
  word, given the plan's summary and the pull request) to an author outside the
  team, or nothing for a team member. A failed lookup posts nothing; `force`
  skips only the roster check. A delivery key makes the ripple idempotent.
  `assign` records issue-lifecycle's `assigned` entry when it adds the user,
  best effort as there. The same assign is the adapter's assign capability,
  through which `publish` assigns the stored login's user when a work item
  starts; the method stays for assigning someone else, or a work item
  published before `publish` assigned. The history capability posts lifecycle
  entries (the server's step, emoji and summary limits checked before the
  call, a summary over 2000 characters cut as issue-lifecycle cuts it) and sets
  the type. The pull request capability sets `githubPrUrl`, and
  `githubPrNumber` when the url has a `/pulls/<n>`, as issue-lifecycle's
  `link_pr` does: swamp-club does not derive them from a `pr_linked` entry, and
  they put the link in the reporter's shipped notification.
  `fetch_issue` records the body, type, author and ripples in `details`.
  `post_attestation` posts a verification attestation that was built elsewhere
  (`deno task build-attestation`); the adapter only checks that `subject.commit`
  is a full lowercase SHA, and swamp-club validates the rest. swamp-club stores
  every attestation POST, never deduplicating by commit, so the adapter keeps an
  `attestation-<commit>` record of what it posted with a digest of the body. The
  exact same body again posts nothing. A rebuilt attestation differs (its
  timing, at least) and is posted, which is right: CI reads the latest
  attestation for a commit.
- **An admin key.** swamp-club lets any user read issues and ripple, but only an
  admin may move a status past `open` or `closed`, assign, look up assignees
  (and so check the team), post attestations or lifecycle entries, or set the
  type. A 403 says so.
- **One driver per issue.** issue-lifecycle keeps driving every issue it already
  has. The Lab adapter's `claim` refuses an issue that has an issue-lifecycle
  instance in the repository, `issue-<N>`: a definition of type
  `@swamp/issue-lifecycle` by that name (including the one direct type execution
  writes), or, when no definition is found, its `state` data. It refuses even
  once that instance is done, and writes nothing. Two drivers would both write
  the issue's status and history, and migrating an issue between them is not
  supported; deleting the issue-lifecycle instance is the way to hand an issue
  over. The check is gatorwalk's alone and read-only (`beforeClaim`, a hook the
  shared `claim` calls once the ticket is fetched).
- **Forked, not shared.** The client is a fork of issue-lifecycle's
  (`extensions/models/_lib/tracker/backends/swamp_club.ts` at the repository
  root). The two are published as separate packages, so neither can import the
  other, and issue-lifecycle is left unchanged for now. The fork keeps the
  endpoints, Bearer auth, the one-step status order, the `auth.json` reader
  (with its `swamp.club` to `swamp-club.com` rewrite), the credential precedence
  and the assignee lookup. It differs where the contract asks: the issue number
  is per call, failures are `TrackerError`s rather than best-effort nulls and
  warnings, there is no `/healthz` probe, assignment fails loudly, and the
  stored key stays with its own server. "Own server" compares parsed origins, so
  case and a default port do not matter. An `auth.json` that is not a JSON
  object, or has a `serverUrl`, `apiKey` or `username` that is not a string, is
  an `auth` error; any url on the `swamp.club` host is rewritten. A reply that
  stalls or breaks off after its headers is `upstream` too.
- **Known gaps.** swamp-club refuses some payload text (swamp-club#2284: a
  string that begins with a dollar sign, among others). The adapter does not
  guess at those rules; the refusal arrives as `invalid` with swamp-club's own
  reason, and the caller rephrases. Issue reads are rate limited per IP.
  `assign` reads the assignees and then writes their union, so an edit made in
  between is lost.

### The built-in tracker

**Decision.** `@swamp/gatorwalk-factory/tracker` keeps tickets in swamp data on
the tracker instance, for a project with no external tracker. It implements the
whole contract, `create` and the history capability included, and makes no
network call. Its tracker name, the `externalRefs` key, is `builtin`.

- **Ids.** A ticket's id is `<prefix>-<slug>-<suffix>` by the work-item key
  rules ("The model types"): the `prefix` argument, required, lowercase, with a
  trailing `-` dropped; the title's slug; four random base32 characters.
  Lowercase, because it is also a record name and, for the ticket's first work
  item, an instance name. The display id is the id, and any case finds it.
  There is **no counter**: several people can file tickets without one place
  minting numbers, and an id some ticket already has is drawn again (up to
  five times). A central swamp serve would let a team share one built-in
  tracker; nothing here depends on it.
- **Records.** `issue-<id>` is the ticket (origin `builtin`), latest version
  read, five kept. A comment is a `comment-<id>-<uuid>` record and a lifecycle
  entry an `entry-<id>-<uuid>` record, each written once and kept by version
  count, never by age, so a ticket's history outlives any retention window.
- **Statuses and types are the instance's own lists.** `statuses` defaults to
  `open`, `in_progress`, `shipped`, `closed`; each key is also the status
  name, so the `statuses` map every tracker has is the identity. A new ticket
  starts in the first; a ticket may move between any two, since the factory
  decides the order, not the tracker. An entry must name a declared status.
  `types` defaults to `bug`, `feature`, `security`.
- **Assignees.** A ticket keeps `assignees`, swamp usernames, so the tracker
  has the assign capability; `publish` adds the stored login's username when a
  work item starts. A record written before assignees has no field and reads
  as no one assigned.
- **Claim.** A ticket's first work item takes the ticket's id as its key, when
  no definition has that name yet; otherwise, and for every later work item on
  the ticket, the key is `<prefix>-<slug>-<suffix>`.
- **One method at a time.** `set_status`, `set_type` and `create` read a
  ticket's record and write a whole new version, so, like the ledger, they
  rely on swamp running one method at a time per tracker instance.
- **Settings on the instance.** `prefix`, `statuses` and `types` are the
  instance's global arguments, as are Linear's `teamId` and `types`. A factory
  definition names only the tracker's kind ("The factory's tracker").

**Why no counter.** A counter needs one place to mint numbers, which a repo
shared by several people (or several worktrees) does not have, and it reuses
numbers when an instance is recreated. The work-item key rules already give
readable, collision-resistant names without one.

### Start from a ticket

**Decision.** Every adapter has a `claim` method (`_lib/tracker/core/claim.ts`,
exposed by `trackerMethods`). It keeps a **ticket index** on the adapter
instance: one `ticket-<stable id>` record per ticket, naming the ticket's
current work-item key, the factory it starts under, and the keys of its
earlier, finished work items. A ticket finds its work item without scanning
every instance.

`claim` fetches the ticket (by stable id or display identifier), reads its
record, and reads the named work item's run through swamp's `readModelData`:

- **No record:** it loads the factory (checked in full), generates a key no
  definition uses from the ticket's display id and title (a built-in ticket's
  first key is its own id), **writes the record first**, and prints the
  work-item `start` command with the ticket's `externalRefs`. The driver runs
  it.
- **A record whose key has no run:** a reservation whose start never ran. The
  same key and command are printed again, and the index is not written. A
  different factory is refused.
- **An active run:** reported with its stage; the index is not written.
- **A terminal run** (done or abandoned): the ticket may start a new work item.
  A new key is reserved, and the old one goes to the front of `previous`.
- **A run whose `externalRefs` name another ticket:** refused, since the index
  and the work item disagree.

**Two claims of one ticket.** `claim` reads the record and then writes it, so it
relies on swamp running one method at a time per adapter instance, as the
delivery ledger does. The adapter instance exists before any claim, so swamp's
per-instance lock applies, and a second claim of the ticket waits and then finds
the first one's reservation.

A claim that succeeds also refreshes the ticket's `issue-<id>` snapshot, as
`fetch_issue` does, after the index is settled. A refused claim writes nothing.

`factory` is only needed when a new key is reserved. `claim` never comments,
moves or assigns the ticket; that is the publisher's (GW-17).

**Why write the index first.** A crash between reserving and starting then
leaves a reservation, which the next `claim` hands back, and the start command
is safe to repeat (`start` refuses a work item that has started). Writing the
index after the start would leave a started work item that no index names, and
finding it again would mean scanning every work item.

**Why a method that prints a command.** A swamp method cannot create or run
another model instance, so `claim` cannot start the work item itself. The
printed command is the whole hand-off.

**Retention.** Index records are never collected by age: a ticket's record must
outlive its work items. Only the latest version is read, so twenty versions are
kept.

**Only the run's own key counts.** swamp's `readModelData` labels every record
it returns with the name asked for, including data it attributes to that name
from an earlier definition. `claim` therefore uses only a run record whose `key`
is the claimed key.

**Known gaps.** The index lives per adapter instance, like the ledger, so keep
one instance per tracker workspace. A work item started directly with
`externalRefs`, not through `claim`, is not in the index. A retarget does not
move the index (#2799 does): the old ticket's record still names the work item,
whose `externalRefs` now name another ticket, so `claim` of the old ticket is
refused as a disagreement, and `claim` of the new ticket finds no record and
reserves a new key. A reserved key has no
definition until it starts, so a fresh key only avoids existing definitions; a
collision with a reservation is about 1 in 32^8 per key drawn. The same holds
for a built-in ticket's first key, its id: another ticket's reserved, unstarted
key with the same slug and suffix would have the same name, at the same odds. Two drivers
running the printed `start` at once race as any first start does (see "The model
types").

## Tests on the real engine

**Decision.** Besides the unit tests, which run against fakes
(`_lib/engine/fake_swamp.ts`, `memoryStore`), an integration suite drives
gatorwalk through the installed swamp CLI. Each test gets a throwaway repo
(`swamp init --tool none`, then `swamp extension source add` of this directory),
runs methods by direct type execution, without `--log` as the skill does, and
reads results back from swamp's storage with `swamp data get --json`. Code:
`integration/harness.ts`, `integration/engine/cli_test.ts`;
`integration/extension/skill_test.ts`, which checks every command the driving
skill shows and runs its worked example as written; and
`integration/tracker/tracker_test.ts`, which runs the Linear and swamp-club
adapters with their credentials in a vault made inside the temp repo,
against their local fakes.

### Why

Fakes can only show what their author believed about the engine. The GW-6 smoke
run showed the gap: swamp reads a model's type from the source without running
it, so a type given as a constant never registered, and no unit test could see
that. The first suite automates that smoke run. It also closes a GW-4 question
by checking that every payload version and the pinned factory definition read
back from swamp's storage still have the digest taken before they were written.

### How it runs in verification

The suite needs to run the swamp binary, write a temp dir and read the
environment, so it is its own command, `integration`, on the gatorwalk-factory
target in `verification/checks.yaml`. The unit `test` command never reaches
`integration/`. A separate command was chosen over widening the unit tests'
flags, so that tests of the pure runtime keep their guarantee: they read files
and nothing else.

Both commands also have `--allow-net=127.0.0.1`, only because the tracker tests
serve a local fake of each tracker's API
(`_lib/tracker/backends/linear_fake.ts`,
`_lib/tracker/backends/swamp_club_fake.ts`) on a free port. Nothing reaches a
live service. The state piece still makes no network calls; its tests would pass
without the flag.

What those flags do not limit:

- `--allow-run=swamp` is not a sandbox. The spawned binary runs with the
  caller's full rights.
- `--allow-write` is unscoped, because the temp dir is only known at run time.

What the suite depends on:

- **swamp on `PATH`.** Without it the suite fails rather than skipping, so it
  can never pass by checking nothing.
- **The caller's HOME.** swamp's config and stored login and deno's npm cache
  come from the host. That is what lets the suite run with no network. With a
  fresh HOME, swamp needed the network to load the extension. What the suite
  writes there, measured by running it against a copy of HOME on swamp
  `20260929.002922.0` with a warm cache: nothing under `~/.config/swamp` (config
  and login are only read, and the harness turns telemetry and update checks
  off, `SWAMP_NO_UPDATE_CHECK=1`, which would otherwise reach the network and
  write `~/.swamp/last-update-check.json`). swamp's embedded deno opens its
  caches in `~/.swamp/deno-cache` for writing while it loads the extension, and
  adds to them when the extension's dependencies are not cached yet, as any
  swamp run does. The deno test runner keeps its own cache under `DENO_DIR`.
- **The swamp version on the host.** The suite logs `swamp --version` at the
  start of each run, and the path of each repo it creates. It last ran against
  swamp `20260929.002922.0`.
- **Only gatorwalk-factory changes trigger it.** A swamp upgrade that breaks
  gatorwalk is caught by the next gatorwalk change, or by running
  `deno task test:integration` by hand.

Each swamp call runs in the temp repo with telemetry off. The harness sets
`SWAMP_NO_TELEMETRY=1` in the environment of every call rather than passing
`--no-telemetry`: swamp reads the variable before it parses arguments, so it
also covers `swamp --version`, which refuses any other option. `swamp --help`
lists only the flag; the variable is read in swamp's CLI entry point
(`isTelemetryDisabledByEnv`).

Every inherited `SWAMP_` variable is removed from swamp's environment except
`SWAMP_HOME`, so nothing is written into the source tree, another repo,
datastore or server. The rule is by prefix, not a list of known variables: swamp
reads dozens of them (`SWAMP_REPO_DIR`, `SWAMP_DATASTORE`, `SWAMP_MODELS_DIR`,
`SWAMP_SERVE_URL` and more) and adds new ones, and a hand-kept list had already
missed several. `SWAMP_HOME` is kept because it moves swamp's user directory
(config, stored login, the runtime that loads extensions), which the suite takes
from the caller like `HOME`. The cost: `SWAMP_DEBUG` and `SWAMP_LOG_LEVEL` are
removed too, so to see more of swamp's logging, run swamp by hand in the repo
the suite logs. Code: `swampEnv` in `integration/harness.ts`. That includes
`SWAMP_API_KEY` and `SWAMP_CLUB_URL`, so the swamp-club adapter never picks up
the host's key; its test also sets `apiKey` and `url`, so the host's stored
login is not read either.

**Out of scope.** Remote workers and `swamp serve` are not covered. A factory
read on a remote worker arrives as a plain object with `_globalArguments`, and
that shape is still unconfirmed against the real engine. The driving skill is
GW-8. Dispatch and usage run through the CLI in the summary test.

## Saved scenarios

**Decision** (swamp-club #2805; inline since #2884). A factory can be tested
before anyone runs work on it. Saved scenarios are the `scenarios` list in the
factory's `globalArguments`, beside its `definition`, one engine call per step
(the format is in the README, "Saved scenarios"). swamp checks their shape with
the rest of the factory's arguments (`SavedScenariosSchema`, which also refuses
two with one name). The factory's `validate` runs every one after the schema
and graph checks, and fails listing each step that did not do what its scenario
said, as `scenarios.<index> (<name>) step <n> (<label>): <message>`. The runner
is `_lib/engine/scenario.ts`.

**Why.** A factory definition is code people run work on, and its graph analysis
says what can happen, not what does. A scenario pins a known path, including the
gate messages a person or agent sees when a step is refused
(`expect: { refused }`), so a definition change that breaks one fails `validate`
wherever it runs: an author's machine, or CI through `examples_test.ts`. The
walks that were code in `factories_test.ts` are now the examples' scenarios, in
each example's `scenarios:` block; what stayed in code inspects CEL results on
the run a scenario leaves.

What it rests on:

- **In process, on `committingStore(memoryStore())`.** The runner calls the same
  operations a work item's methods do (`startRun`, `recordProduct`,
  `recordApproval`, `advance`, `grantOverride`) with the real gate evaluator,
  against a store that keeps nothing. That is good enough for now; revisit with
  data. A factory's dozen or so scenarios run in well under a second.
- **A simulated clock.** It moves one second per engine reading, plus each
  `wait`, so cooldowns and waits are exact and a run is repeatable. Reading a
  frame's readiness does not move it.
- **Two actors.** Records and automatic moves are `agent:scenario`; approvals,
  declines, overrides and manual moves are `user:scenario`.
- **No Deno API.** The studio will run scenarios in the browser, so the runner
  and everything it imports stay free of Deno APIs; `scenario_test.ts` walks the
  import graph to check. It returns one frame per step, frame n for step n: the
  committed run, readiness from `evaluateTransitions`, `computeMetrics`, and the
  outcome.
- **In the factory, not in files** (#2884). Scenarios were files at
  `scenarios/<factory>/<scenario>.yaml`, keyed by a `factory` field that had to
  match the directory. In the factory's model definition they are
  schema-checked by swamp, travel with the definition to a remote worker (where
  `validate` could not read the files), and need no factory key, path rules or
  symlink checks. The cost is one longer file: a definition with fifteen or so
  scenarios runs to about 2,000 lines, which the studio parses whole on each
  change.
- **An agent writes them.** The studio views and simulates but never edits, so
  the skill says where scenarios go, the verbs, and to run `validate` after
  writing one (`references/scenarios.md`).

Scenarios have no includes: variants of one late path each repeat the walk
that reaches it. An include step would be its own change.

## Decision log

### 2026-10-01: small driving fixes from the #2711 dogfood (swamp-club #2875)

**Decision.** Three changes. The swamp-club adapter's `post_attestation` says
the attestation id in its message, on a post and on a repeat that posted
nothing. An exit's gate failures are listed once: two gates that read the same
missing evidence fail with the same words, and `status`, `advance`'s refusal,
saved scenarios and the studio now show that line once, while the exit still
keeps one check per gate. The skill tells the driver to pass `onBehalfOf` on
every decision it runs on a person's word (`approve`, `decline`,
`grant_override`, a manual `advance`, `reset`, `retarget`), which the engine
has accepted since #2793; an advance the driver takes on its own names no one.
The swamp-club and work-item model versions are bumped; the factory's is not,
as `validate` changes only where a repeated failure was shown.

**Left out.** The issue also asked for a triage prompt that points at the
issue text, which lived in a local dogfood factory that has since been
discarded; empty report banners on `status`, which swamp itself no longer
prints; Lab tracker docs, which #2842 decided against; and saved scenarios
copied by `init`, which no longer exists since #2884 (a factory's scenarios are
its model definition's `scenarios` block).

### 2026-10-01: a manual exit waits on a person only once the agent has no way out (swamp-club #2874)

**Decision.** A manual exit with gates, all passing, is held by a person only
while the agent has no way out of its own (see "Why `awaiting` is journaled").
The summary's wait time is the time covered by finished waits, so two exits
waiting at once count once; each exit keeps its own row.

**Why.** The dogfood run on #2711 counted `attest.complete` and
`merge.complete` as waits from the moment their stages were entered, while the
agent built the attestation and waited for CI, and summed a `revise` that
overlapped a plan approval: 18m 57s of waits for 16m 09s a person was asked.
Whether the agent still has work is read from the gates and the products
recorded, not declared by the factory definition: the engine already has both.

### 2026-10-01: publish links the pull request on the Lab issue, as issue-lifecycle's link_pr does (swamp-club #2872)

**Decision.** A tracker entry may declare `linkPr`, a payload field holding a
pull request url. `publish` links it after the entry's type and before the
entry, under its own ledger key (`link_pr`), through a new optional
`pullRequests` capability. Only the swamp-club team's Lab adapter has it: it
PATCHes `githubPrUrl`, and `githubPrNumber` when the url has a `/pulls/<n>`,
and writes nothing when the issue already links that url. A later pull request
replaces the link.

**Why.** The dogfood run on #2711 shipped with no pull request on the issue:
swamp-club does not derive the fields from the `pr_linked` entry, so the
reporter's shipped notification had no link.

**Choices made with Seth in triage.** A capability of its own, not part of
history, so the built-in tracker and Linear need nothing. The field is
`linkPr`, since an issue could one day link several pull requests. Issues
already published past `pr_linked` are not backfilled. The team's factory
declares `linkPr: url` on its `pr_linked` entry when it is rebuilt; nothing in
this repository carries that definition since #2842.

### 2026-10-01: the swamp-club Lab is the swamp-club team's own, and the shipped docs say so (swamp-club #2842)

**Decision.** The skill, the README and the examples name only the built-in
tracker and Linear. The `swamp-club-swamp-extensions` example, its mapping and
the tests that pinned its process are deleted: the team's definition lives in
its own factory model (#2884), not in the skill. Tests that used it only as a
large definition moved to `build-swamp-extension`, and the graph pruning test to
seven inline self-loops. The examples' status keys are
the built-in tracker's default statuses (`open`, `in_progress`, `shipped`,
`closed`), not the Lab's `triaged`. The swamp-club adapter still ships,
unchanged, and its README section and "The swamp-club Lab adapter" say it is
for the swamp-club team. A guard in `integration/extension/skill_test.ts` fails
on any paragraph of the skill or README that mentions swamp-club or the Lab
without saying so.

**Why.** The first acceptance run of the authoring skill offered the Lab in its
interview (#2818). swamp-club is not a secret, but nobody outside the
swamp-club team can use its Lab, so it must never read as an option. Moving the
adapter to a team-only extension was left for later.

### 2026-10-01: a factory has one name, its model's (swamp-club #2816)

**Decision.** A factory definition has no `name` field. The factory model's
name is the factory's only name: `new_key` leads keys with it, the run record
and the `started` journal event carry it as `factory` (beside `definition: {
digest, version }`), and `validate`, `design_page`, the summary, ticket
comments, the design page and the studio show it. A definition that still has
`name` is a schema error, from swamp's checks and from `validate`.

**Why.** Since #2884 the definition sits in the factory's model definition,
next to the model's own `name`, so one factory had two names, and they differed
in practice (the dogfood factory `swamp-extensions` held a definition named
`swamp-club-swamp-extensions`). Requiring them to match would keep a field with
nothing to say; keeping both would need a reason, and none survived #2884: the
pinned copy already recorded the factory's model name.

**Choices made with Seth in triage.** The field is rejected, not ignored.
Records written before this change are not read: there are no users before
go-live, so `RUN_SCHEMA_VERSION` stays 1 and an old run record fails its strict
parse on the unexpected key. A factory model's name may start with a digit,
which the old definition name could not; keys allow it. Saved scenarios run in
memory under the factory name `scenario`, as their tracker instance is
`scenario`.

### 2026-10-01: the factory definition lives in the factory model, with its schema (swamp-club #2884)

**Decision.** A factory's `globalArguments` are `{ definition, tracker,
scenarios }`: the definition inline, schema-checked by swamp as the factory
type's own, beside its tracker and its saved scenarios. `factories/` files,
`scenarios/` files, `init`, the embedded starters and `definition_file.ts` are
gone. Every reader, the studio included, reads the factory's model definition.
See "Where a factory definition lives", "What swamp checks, and what validate
checks", and "Saved scenarios".

**Why.** Adam's review (2026-10-01): "I don't understand why the definition is
not itself a model. It will have to grow to have basically every feature models
have (schema, inputs, CEL expressions)." #2803's reason for a separate file,
hand-pasted copies drifting from the file, went when factories became authored
only by the agent. Keeping it in the model gives one copy where swamp looks,
swamp's own checks on it (#1236), and remote workers that can start work.

**Choices made with Seth in triage.** The definition is nested under
`definition` rather than spread across the top level: the definition's
`tracker: { kind }` and the factory's `tracker: <instance>` would otherwise
collide, the definition keeps its kind for scenarios, starters and #2847 where
no instance is known, and nesting keeps swamp's shallow `partial()` checking the
whole definition. `init` was dropped rather than made to write its own model
definition; the skill writes the example in. Saved scenarios moved inline too,
so `validate` works on a remote worker. The dogfood factory was not migrated:
it is reset after this lands. Work items as data inside the factory (Adam's
other suggestion) stay out: one instance per work item ("The runtime: one run
record per work item", #818).

### 2026-10-01: publish assigns the ticket when work starts (swamp-club #2801)

**Decided.** Assigning is an optional tracker capability, `assign`, which the
built-in tracker and the Lab have and Linear lacks. `publish` assigns through
it on the work item's `started` event, to the user swamp's stored login maps
to (each tracker model's `assignee`: the login's username for the built-in
tracker, and for the Lab when the login is for its server), keyed in the
delivery ledger. There is no opt-in: a tracker that can assign does. A failure
warns and is never retried. In entry mode issue-lifecycle's `assigned` entry
follows the `started` event's entry. The Lab adapter's `assign` method stays.

**Why.** issue-lifecycle's `start` assigns, and a driver following gatorwalk's
skill never ran the separate `assign`, so its Lab issues stayed unassigned
(#2771). The stored login, not the start event's actor: a local run records no
principal, and a principal is a swamp identity, not a tracker's user. Never
retried, because assigning is a convenience a person can do by hand, and a
retry on every publish would warn forever for a login that cannot assign.

### 2026-09-30: no `--log`, and every write prints the status that follows it (swamp-club #2780)

**Decided.** The skill, the worked example, the hints the extension prints and
the integration suite run methods without `--log`. Under current swamp it
prints every method's text twice: once as the method's output and once through
the console log sink, quoted and joined with `+`. Drivers filtered the doubled
text with `grep` and `sed` and dropped dispatch prompts. The skill says to read
a method's output whole, and its command check refuses `--log`. Every write
ends its text with the full status block, built from the run it committed
rather than read back, and rule 1 counts that as reading status. That keeps
one rendering and one rule, where a shorter block (only `expect` and the exits)
would be a second format. Writes still run one per command. A status that
cannot be built after a committed write is reported, not thrown. The empty
report box swamp draws after every method is swamp's to fix (swamp-club
#2813). The work-item model version is bumped: its write output changed.

### 2026-09-30: Design mode, in the browser, read-only (swamp-club #2807)

**Decision.** The studio's Design mode, built from the prototype: the engine
runs in the page, a pure lane layout draws the definition, and an inspector,
findings with trace walks, a read-only source and Copy reference explain it.
See "Design mode".

**Why.** The issue predates #2803, so its `lifecycles/`, `parseLifecycle` and
`analyzeLifecycle` became `factories/`, `parseDefinition` and
`analyzeDefinition`. Decided with Seth: an engine change the page bundles
needs a studio rebuild in the same change; Preact, signals and the `yaml`
package are added, pinned; changed marks last per browser until a stage is
selected; the graph scrolls in its own pane at phone width. Found in the work:
the bundle passes the single module's size budget, so the page is split into
three generated modules; the `yaml` package reads two environment variables, so
the unit tests allow exactly those; edges sharing an entry point overlapped in
the prototype, so each now has its own; selection is held by identity, since
paths shift; and, from Seth's first use, Enter on an exit follows it.

### 2026-09-30: a factory chooses its tracker, and status shows the lag (swamp-club #2795)

**Decided.** A factory definition names its tracker's kind (`builtin` by
default), the factory names the instance, and `validate` and `start` check the
instance's type against the kind; `start` pins the binding, and `status` reads
the instance's publish cursor to show how far the ticket is behind. The stage
`projection` block is now `tracker`, and the code and docs follow: "the
projection publisher" is "the publisher", and `projection.ts` is
`ticket_view.ts`. See "The factory's tracker".

**Decided with Seth.** The engine may know the bound instance and its kind and
read its cursor as data, which relaxes "nothing in the engine knows a tracker
exists". A binding is required. Tracker settings stay on the tracker instance
rather than moving into the factory definition, as the entry for #2794
expected: the instance is the tracker's definition. The check of status keys
and entries against the bound tracker is a tracker-side method (#2847).

### 2026-09-30: a person's plan feedback is kept and handed to the next plan (swamp-club #2770)

**Decided with Seth.** The feedback is evidence, `plan-feedback`, on
`plan-review`, not a note on `advance`: `revise` gains an `evidence-recorded`
gate on it, `plan` injects the last plan, its review and the feedback, and the
plan's optional `feedbackIncorporated` carries it to the ticket with
`plan_revised`. All three examples with a plan loop take it. The round is the
cycle the feedback was recorded in, not a field. `revise` is gated even after a
declined approval, and there is no gate on `submit` checking the plan quotes
the feedback: `plan_revised` is published when the plan is recorded, before any
`submit` gate could refuse it.

**Hoists into the engine.** Declaring the evidence on `plan-review`, a dispatch
stage, would have told every reviewer to write it, so evidence gains
`recordedBy: person` (see "The dispatch contract"). Recording it after a
decline is not rework ("Why `awaiting` is journaled"). Injecting products from
the stage's own loop is not a graph warning ("Graph validation"): warnings
about the first pass of a loop would teach authors to ignore warnings.

### 2026-09-30: the studio server, read-only, with its page embedded (swamp-club #2806)

**Decision.** A studio model type whose `serve` method runs a read-only local
server for the studio page. See "The studio server".

**Why.** The issue predates #2785 and #2803, so its `lifecycles/` and holder
became `factories/` and factories: the definition path is whatever the factory
names, checked by `resolveDefinitionPath`, and scenarios sit at
`scenarios/<factory>/`, the location #2805 settled on. Two changes from the
issue text, both from evidence found in triage. The page is embedded in a
generated module rather than found beside the model module and shipped as
`additionalFiles`, because a source-loaded model runs from swamp's bundle
directory. And the build is checked by a digest of its inputs rather than by
rebuilding and diffing, because the bundle depends on the Deno version.

### 2026-09-30: a built-in tracker core; Lab and Linear rebuilt on it (swamp-club #2794)

**Decided.** Every project has a tracker: the built-in one
(`@swamp/gatorwalk-factory/tracker`) when there is no external tracker. The
adapter contract gains `create`, an explicit `capabilities` object (history is
the first) and an `origin`; `issue-<id>` records carry `origin: builtin |
snapshot`. The Lab and Linear implement `create`: an external tracker files the
ticket and its id is used. A missing capability is refused as `invalid`. One
conformance suite runs against all three backends.

**Keys changed.** A claimed key no longer leads with the factory definition
name: an external ticket's key is `<display id>-<slug>-<suffix>`
(`2631-lab-adapter-r2ne`), and a built-in ticket's first work item takes the
ticket's id. The factory definition name added length and no meaning once the
ticket's id is there.

**Decided with Seth.** Ids all lowercase; built-in statuses default to open,
in_progress, shipped and closed, moving in any direction; the built-in tracker
keeps history; `create` takes a required type; Linear files in a configured
team and labels the type; a duplicate from a retried `create` is a known gap;
the prefix is required. Where the configuration lives (the tracker instance's
arguments for now) moves to the factory definition with #2795.

### 2026-09-30: saved scenarios, run by validate (swamp-club #2805)

**Decision.** Saved scenarios at `scenarios/<factory>/<scenario>.yaml`, run in
process by `validate`, and the examples' walks moved out of `factories_test.ts`
into scenario files. See "Saved scenarios".

**Why.** So a definition change that breaks a known path fails `validate`. The
issue used the names from before #2785 and #2803 for the directory and the key;
they are `scenarios/<factory>/` and `factory`, matching the factory's name.

### 2026-09-30: a factory definition lives in a file the factory names (swamp-club #2803)

**Decision.** The factory's `globalArguments` became `{ definition: <path> }`,
a repo-relative YAML file (`factories/<factory>.yaml` by convention), and the
inline definition was removed. A new `init` method copies a starter, one of the
skill's examples embedded in the engine, to that path. See "Where a factory
definition lives".

**Why.** One copy of each definition, where people look for it. The inline copy
and the file drifted, and pasting a definition under `globalArguments` by hand
was the skill's most error-prone step. The issue named the key `lifecycle` and
the directory `lifecycles/`; #2785 renamed the vocabulary first, so they are
`definition` and `factories/`. The issue also asked for the starters to be
resolved beside the model module; swamp bundles models, so they are embedded
instead. No model version was bumped: the extension has never been published.

### 2026-09-30: stage templates and apply cut; examples in the skill instead (swamp-club #2767)

**Cut.** The template model type (`@swamp/gatorwalk-factory/template`), the
factory's `apply` method and its `applied-definition` record, the stage
template format (a `contract` of inputs, outputs, exits and parameters, `exit:`
transitions, `{ $param }` placeholders), the five starter stage templates under
`templates/`, and the graph checks only stage templates used
(`exit-unreachable`, contract inputs present from the start).

**Why.** Once triage narrowed it to copy-and-own (#2663, renamed in #2717), the
feature was one-time scaffolding, and an agent does the same by copying YAML and
running `validate`. Nothing used it: neither `build-swamp-extension.yaml` nor
`swamp-club-swamp-extensions.yaml` used a template, `apply`, a contract or a
`$param`, and the starter templates were extracted from those factory
definitions, not used to build them. It was about 1,400 lines of source and
1,800 of tests, plus a public model type and a method that would have become API
at go-live. Removing it before go-live costs users nothing; after go-live it
would be a breaking change. No model version was bumped: the extension has never
been published, so there is nothing to upgrade.

**What replaced it.** Example factory definitions in the skill, under
`.claude/skills/gatorwalk-factory/references/examples/`: `minimal`, `starter`,
`build-swamp-extension`, and `swamp-club-swamp-extensions` as a real-world
example. The skill tells an agent to copy the closest one and run `validate`,
and `examples_test.ts` runs `validate` on each so none can rot. They live in the
skill rather than in an `examples/` directory at the extension root because the
skill is what reaches an agent: `swamp extension pull` installs a skill into the
skill directory of every agent tool the repository uses, so a path relative to
the skill works in all of them, whereas files at the extension root land under
the pulled extension's `files/` directory, which the skill cannot name. Push
refuses symlinks, so linking one place to the other is not an option.
The top-level directory of examples is gone too: gatorwalk-factory ships no
factory definition of its own.

**What was not kept.** One check only `apply` made: that a contract input read
only by a CEL binding is produced on every path into the stage template
(`productsMissingOnEntry`). Its general form, for any factory definition, is to
warn when a product only CEL reads is not produced on every path to the reading
stage. That came back as part of `product-missing-on-path` (swamp-club #2792;
see "Graph validation").
