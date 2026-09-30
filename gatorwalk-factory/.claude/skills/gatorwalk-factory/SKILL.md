---
name: gatorwalk-factory
description: >
  Drive a work item through a gatorwalk factory
  (@swamp/gatorwalk-factory): start it, read its status, dispatch and do each
  stage's work, record artifacts and evidence, advance, and stop for a person
  at every human gate. Use only when the user names gatorwalk: "gatorwalk",
  "gatorwalk-factory", "gatorwalk work item", "gatorwalk status", "drive a
  gatorwalk work item", "start a gatorwalk work item". Not for
  @swamp/software-factory runs or definitions, or @swamp/issue-lifecycle.
---

# gatorwalk-factory

gatorwalk-factory holds a software process as data: a **factory definition** of
stages, the work each stage does, the products it records, and gated transitions
between them. Each piece of work is a **work item**, one model instance that
enforces the gates, limits and human stops and writes a journal. You drive it;
it never does the work itself.

This skill covers **driving** a work item. Designing and authoring factory
definitions is not covered yet.

- Driving in full: [references/driving.md](references/driving.md)
- A whole work item, start to done:
  [references/examples/build-swamp-extension.md](references/examples/build-swamp-extension.md)
- A factory definition to start from: copy the closest example in
  [references/examples/](references/examples/) into a factory, then run
  `validate`. `minimal.yaml` is one stage; `starter.yaml` is a general change
  from plan to release; `build-swamp-extension.yaml` builds a swamp extension;
  `swamp-club-swamp-extensions.yaml` is a real repository's process, to read
  rather than copy whole. Each factory definition's description says what it is
  for and what to change first.
- Saved scenarios, the paths `validate` checks a factory still allows: write one
  to `scenarios/<factory>/<scenario>.yaml` when you change a factory definition
  or the person names a path to keep, then run `validate`. The format:
  [references/scenarios.md](references/scenarios.md)

## Rules

1. **`status` first, and after every change.** It is the only state to act on.
   Never act on memory or on what you meant to do.
2. **`--log` on every call.** Methods report through the log.
3. **Pass back the expectation `status` prints** (`expectedStage`,
   `expectedCycle`, `expectedEra`) on every write except `record_usage`. A
   refused write wrote nothing: read `status` again before retrying.
4. **Never decide for the person.** Locally you and the person run swamp as the
   same user, so nothing but this rule stops you approving your own work. Never
   run `approve`, `decline`, `grant_override`, `advance` with `confirm=true`, or
   `reset` without the person's explicit word for that decision, in this
   conversation.
5. **Advance on your own only when it is safe.** Count the ready exits that are
   neither `(manual)` nor `[human: ...]`. If there is exactly one and no
   human-gated exit is ready, advance on it. Otherwise stop and ask. Ready
   manual exits (ways back such as `revise`) are the person's; they do not
   count, and you never take one unasked. `[approval not required now: ...]` is
   not a human gate: its condition is false right now, so it does not stop you.
6. **Record only what happened.** Evidence is what you observed, with the real
   commit, run id and outcome.

## The loop

```sh
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

1. Read `status`. If the item is terminal, run `summary`, report and stop.
2. `dispatch`, then do the stage's work as its `mode` says: yourself
   (interactive), by subagents sent the prompts it prints, unchanged (dispatch),
   or by running the workflow or method the packet names.
3. Record each artifact and piece of evidence the stage declares, and
   `record_usage` for a dispatch whose tokens you know.
4. Read `status` and apply rule 5: `advance`, or stop and ask the person.

When a person must decide, read the products fresh with `swamp data get`, show
them, and ask for the decision and the next step in one question ("Approve and
move to implement, or decline and send it back?"). Then do exactly what they
said.

## Quick reference

Work-item methods run by type, with the key as the instance:
`swamp model @swamp/gatorwalk-factory/work-item method run <method> <key> ... --log`.
"expect" means the three `--input expected...=` flags from `status`.

| Method            | Inputs                                                          | Needs the person |
| ----------------- | --------------------------------------------------------------- | ---------------- |
| `start`           | `factory=<factory>` (and `externalRefs`, a JSON object)         |                  |
| `status`          | none (a read; no lock)                                          |                  |
| `summary`         | none (a read; the timeline and metrics)                         |                  |
| `dispatch`        | `resultDir` (optional, for a dispatch stage), expect            |                  |
| `record_artifact` | `name`, `payload` (JSON, or `@<path>` to a result file), expect |                  |
| `record_evidence` | `name`, `payload` (JSON), expect                                |                  |
| `record_usage`    | `dispatchId`, `inputTokens`, `outputTokens`, `model` (optional) |                  |
| `advance`         | `transition`, expect                                            |                  |
| `advance`         | `transition`, `confirm=true`, expect (a manual exit)            | yes              |
| `approve`         | `gateId`, `note`, expect                                        | yes              |
| `decline`         | `gateId`, `note`, expect                                        | yes              |
| `grant_override`  | `kind=cycle` with `stage`, or `kind=dispatch`; `note`, expect   | yes              |
| `reset`           | `confirm=reset`, `repin` (optional), expect                     | yes              |
| `retarget`        | `externalRefs` (a JSON object), `reason`, expect                | yes              |

Factory methods run by instance name:
`swamp model method run <factory> validate --log` checks a factory definition in
full and runs its saved scenarios in `scenarios/<factory>/`;
`swamp model method run <factory> new_key --input 'title=<title>' --log` makes a
key from the work's title to start a work item under; `start` also takes any
unused name chosen by hand.

Work from a tracker ticket starts through the tracker's adapter instance:
`swamp model method run <tracker> claim --input issue=<ticket> --input factory=<factory> --log`
reserves a key for the ticket and prints the `start` command to run, or names
the work item the ticket already has. Re-run it after any failure. See
[references/driving.md](references/driving.md#start-from-a-ticket).

## When something is refused

| Refusal                                   | Do                                                                |
| ----------------------------------------- | ----------------------------------------------------------------- |
| `stale: ...`                              | Read `status`; act on what it says now.                           |
| `... rejected and kept as retry feedback` | Fix the payload from the errors (also in `status`); record again. |
| `transition ... is not ready`             | Do what the failures name, or ask the person about a human gate.  |
| `transition ... is manual`                | Ask the person; `confirm=true` only on their word.                |
| cycle limit, `runaway loop suspected`     | Stop and tell the person. Only they can grant an override.        |
| `claim`: `driven by issue-lifecycle here` | Drive the issue with issue-lifecycle; gatorwalk does not take it. |

Why each limit exists, and how a person gets past it, is in DESIGN.md, "Loops
and their controls".

Nothing is ever half-written, and nothing wedges: a manual way back (such as
`revise` or `recheck`) or, as a last resort, a `reset` on the person's word gets
the item moving again. Never force past a refusal you do not understand.
