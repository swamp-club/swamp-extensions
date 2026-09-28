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

- it is syntax-checked when the lifecycle is saved;
- its resolved value is recorded on the dispatch, typed, so a stage can later be
  replayed and evaluated against a changed prompt;
- it can also feed a workflow's or method's inputs and be handed to an agent as
  data, not only pasted into prose.

The cost is one extra line per value: you cannot write an expression inline in a
prompt.

### The rules

| Text                                                                    | Meaning                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `{{name}}` or `{{ name }}`                                              | Placeholder. `name` must be a declared binding, or the lifecycle is rejected when saved, with the error's path.                      |
| `{{` around anything else (`{{ .Values.x }}`, `{{#each}}`, `{{ a.b }}`) | Literal text, so most Helm, Handlebars and Go template snippets pass through unescaped.                                              |
| `{{` directly after `{` (`{{{body}}}`)                                  | Literal text, so Handlebars triple-stash passes through.                                                                             |
| `\{{`                                                                   | A literal `{{`, for text that would otherwise be a placeholder.                                                                      |
| `${{`                                                                   | Rejected anywhere in a lifecycle. swamp would evaluate it on save, and it has no escape, so a prompt cannot contain a literal `${{`. |

Bare-word template tags such as Go's `{{end}}` or Handlebars' `{{else}}` look
exactly like placeholders. They are rejected when the lifecycle is saved, as
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
  that write. `advance`, `recordApproval` and `reset` also take the caller's
  expected stage, cycle and era, and refuse a mismatch, so a writer acting on an
  out-of-date view fails instead of applying (#1998, #2343). The lock does not
  cover the first run that auto-creates an instance (`model_method_run.ts:431`
  in swamp), so two concurrent first starts can still race; that is accepted for
  solo use until swamp fixes it.
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
