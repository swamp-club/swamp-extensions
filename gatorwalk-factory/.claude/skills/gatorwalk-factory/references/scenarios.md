# Saved scenarios

A saved scenario is a known path through a factory, written as a file so that a
change to the factory definition that breaks it fails `validate`. You write
them: when you change a factory definition, when the person describes a path the
factory must keep allowing (or refusing), or when they ask for one. Nothing else
creates them.

## Where they go

One YAML file per scenario, under the repo root:

```
scenarios/<factory>/<scenario>.yaml
```

`<factory>` is the factory's name (the model instance, such as `team`), not the
`name:` inside its definition, which is often a starter's. The file's `factory`
key must be the same name. A scenario copied from
[examples/scenarios/](examples/scenarios/) names the example, so change its
`factory` key to your factory's name, or `validate` refuses it.

## The file

```yaml
scenario: plan-waits-for-approval
factory: team
description: A reviewed plan waits for a person's approval, then goes on to implement.
externalRefs: { swamp-club: "2805" }
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

`scenario` is a lowercase name; `description` and `externalRefs` (the work
item's ticket references, which some bindings read) are optional. The work item
starts at the initial stage. Each step is one engine call, one verb:

| Step                                          | What it does                                                |
| --------------------------------------------- | ----------------------------------------------------------- |
| `record: { artifact: <name> }` with `payload` | Record an artifact, as `record_artifact` does.              |
| `record: { evidence: <name> }` with `payload` | Record evidence, as `record_evidence` does.                 |
| `approve: <gate id>` / `decline: <gate id>`   | A person's decision on a human-approval gate.               |
| `move: <transition>`                          | Take a transition, as `advance` does.                       |
| `move: <transition>` with `manual: true`      | A person's go for a manual transition (`confirm=true`).     |
| `override: { stage: <stage>, note: <text> }`  | A person grants one more entry into a stage past its limit. |
| `wait: <seconds>`                             | Time passes, for cooldowns and waits.                       |
| `expect: { stage: <stage> }`, as its own step | The work item must be at that stage.                        |

Any step but a `wait` can carry `expect: { refused: "<text>" }`: the step must
be refused, and the refusal must contain the text. Quote a distinctive part of
the gate's message, so the scenario pins it; `""` accepts any refusal. Any step
can carry a `note` saying why it is there.

The clock moves one second per engine call, plus each `wait`. Records and
automatic moves are an agent's; approvals, declines, overrides and manual moves
are a person's. Payloads must pass the definition's schemas, as they would in a
real work item. Write the steps from the definition: the transitions out of each
stage, the gates on them, and the payload schemas.

## After writing one

Run `validate` and fix what it reports:

```sh
swamp model method run <factory> validate --log
```

It runs every scenario in `scenarios/<factory>/` and names each step that did
not do what its scenario said, as `<path> step <n> (<label>): <message>`; step 1
is the first in `steps`. A step that should pass but was refused means the
scenario or the definition is wrong: read the refusal, then ask the person which
one if it is not clear. Never weaken an `expect` to make `validate` pass without
the person's word, since the scenario may be catching a real break.
