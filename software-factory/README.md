# @swamp/software-factory

A fully generic, model-driven state machine for guiding agents through a
software development lifecycle. The entire machine — stages, transitions,
gates, required artifacts, review skills, agent commands, system prompts —
lives in the model definition's `globalArguments` as **data**. The engine
ships no lifecycle concepts: adversarial review, comprehensive testing,
release, and UAT stages are things a definition expresses, never things the
code knows about.

See [DESIGN.md](DESIGN.md) for the full design and its rationale.

## How it works

An instance is a factory; it serves **many work items concurrently**. Create
it once, then run thousands of work items through it — every method takes
`workItem`, and all run data is namespaced per work item:

```bash
swamp model create @swamp/software-factory my-factory
swamp model edit my-factory      # fill globalArguments: stages
                                 # (seed from examples/, see below)
swamp model method run my-factory validate
swamp model method run my-factory start --input workItem=ISSUE-42
```

From there the protocol is fixed, whatever the factory shape:

```bash
swamp model method run my-factory status --input workItem=ISSUE-42
# → STATUS_JSON: current stage, work spec (bindings resolved),
#   per-gate transition readiness, context manifest, cycle counts
swamp model method run my-factory status
# → factory-wide overview of every run

swamp model method run my-factory record_artifact --input workItem=ISSUE-42 \
  --input name=plan --input payload='{"summary":"…","steps":[…],"testingStrategy":"…"}'

swamp model method run my-factory advance --input workItem=ISSUE-42 --input transition=submit
# blocked transitions fail with actionable per-gate reasons
```

The agent is a generic interpreter: the definition is the program, each work
item's run state is a program counter, and `status` says what is required
next. The shipped `software-factory` skill teaches Claude the drive loop;
"start work on PAY-218 with the feature factory" is enough.

## Examples

| File | What it shows |
| --- | --- |
| [examples/minimal.yaml](examples/minimal.yaml) | Two stages, one gate — the hello-world. |
| [examples/feature-factory.yaml](examples/feature-factory.yaml) | Plan → dual-skill adversarial plan review → implement → verified test workflow → dual-skill code review → done, with loop-backs, freshness-forced re-review, human approvals, and a global abort. |
| [examples/sdlc-classic.yaml](examples/sdlc-classic.yaml) | The classic plan / adversarial-review / implement / test / release / UAT lifecycle, including `cooldown` and `cel` gates. |

## Concepts

- **Stage** — a named state with a `work` spec (how the work gets done):
  `interactive` (the driving agent), `dispatch` (one subagent per listed
  skill, in parallel), `workflow` (a named swamp workflow — zero-LLM), or
  `method` (a single model method call — also how tracker integrations work).
- **Artifact** — a versioned, schema-validated data product. Schemas are a
  declarative JSON-Schema-flavored subset compiled to zod at runtime.
  `kind: findings` unlocks the findings machinery; `reviews: <artifact>`
  pins subject versions for freshness checking.
- **Evidence** — opaque external facts (PR URL, CI outcome, release link),
  cycle-scoped. The engine never talks to external systems.
- **Gate** — hard enforcement on transitions: `artifact-exists`,
  `artifact-fresh`, `findings-clear`, `human-approval`, `evidence-recorded`,
  `cooldown`, `max-cycles`, `cel` (CEL predicates over run data), and
  `workflow-succeeded` (verified against swamp's own workflow run records,
  not driver attestation).
- **Cycles** — re-entering a stage increments its cycle; approvals and
  evidence are cycle-scoped, so rework automatically invalidates stale
  sign-offs and stale test runs. Every stage has `maxCycles` (default 5);
  entries past the limit park the run for an explicit human
  `cycle-override` approval.
- **Bindings** — stage config references run data in platform CEL syntax:
  `${{ data.latest(self.name, "evidence-change-request").payload.headSha }}`,
  resolved by the engine at stage execution time.

## Methods

| Method | Purpose |
| --- | --- |
| `start` | Validate the graph, start a work item at the initial stage. Refuses to restart — resume with `status`. |
| `status` | The driver's entrypoint: what a work item requires right now; without `workItem`, an overview of all runs (read-only). |
| `record_artifact` | Record a declared artifact; payload validated against its schema. |
| `record_evidence` | Record a declared external fact. |
| `resolve_findings` | Resolution notes on `kind: findings` artifacts (not a fresh recording). |
| `approve` / `reject` | Human gate decisions, cycle-scoped. Also grants `cycle-override:<stage>`. |
| `advance` | Move along a named transition. Gates run in pre-flight checks and re-validate in the method body. |
| `summary` | The full implementation history of a work item — every stage visit, artifact version, finding, approval, and transition — rendered as markdown, statically from the run data (read-only). |
| `validate` | Definition lint (read-only). |
| `describe` | Mermaid + stage/transition tables (read-only). |
| `reset` | Destructive restart; requires `confirm=reset`. |

## Run data

All resources are versioned, immutable, and namespaced per work item:
`state-<workItem>`, `artifact-<workItem>-<name>`, `evidence-<workItem>-<name>`,
`approval-<workItem>-<gateId>`, and the append-only `journal-<workItem>` audit
trail. (Work item refs that aren't name-safe — URLs, say — get a
deterministic hashed slug; envelopes always carry the original.) Inspect with:

```bash
# what exists
swamp data query 'modelName == "my-factory"' --select name
# one payload field, straight from the artifact's declared schema
swamp data query 'modelName == "my-factory" && name == "artifact-ISSUE-42-plan"' --select attributes.payload.summary --json
# the journal (one event per version; referencing `version` opens history)
swamp data query 'modelName == "my-factory" && name == "journal-ISSUE-42" && version > 0' --select attributes.summary --json
```

Records store the envelope as their content, so `attributes.payload.<field>`
reaches the declared schema and `attributes.stageId` / `.cycle` /
`.subjectVersion` reach provenance. The skill's `references/driving.md`
("Querying run data") has the full recipe set.

## The work-item summary report

`summary` prints a linear markdown history of a work item's run — the back
and forth of plans, reviews, findings and their resolutions, approvals,
evidence, and rework loops — reconstructed entirely from the journal and the
versioned run records. No LLM is involved; the same data always renders the
same report.

The extension also ships a `@swamp/software-factory/work-item-summary`
report that persists the identical markdown (plus a structured JSON twin)
through swamp's report machinery, browsable with `swamp report search` /
`swamp report get`. It is a model-type default; to keep the stored report
stream free of empty placeholder versions from other methods, scope it in
your definition file (a sibling of `globalArguments`):

```yaml
reports:
  require:
    - { name: "@swamp/software-factory/work-item-summary", methods: [summary] }
```

## Development

```bash
cd software-factory
deno task check
deno task lint
deno task fmt:check
deno task test
```
