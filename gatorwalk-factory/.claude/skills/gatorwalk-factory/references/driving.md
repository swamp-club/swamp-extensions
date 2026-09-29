# Driving a gatorwalk work item

How to take a work item from start to done with the two gatorwalk-factory model
types. Every command here is checked by `integration/skill_test.ts`: each names
a real method with inputs its schema accepts. The worked example,
[examples/build-swamp-extension.md](examples/build-swamp-extension.md), runs a
whole work item as written.

Placeholders are in angle brackets: `<key>`, `<holder>`, `<stage>`, `<cycle>`,
`<era>` and so on. Replace them, and nothing else.

## Contents

1. [The two model types](#the-two-model-types)
2. [Set up a lifecycle holder](#set-up-a-lifecycle-holder)
3. [Start a work item](#start-a-work-item)
4. [Read status](#read-status)
5. [The loop](#the-loop)
6. [Do the stage's work](#do-the-stages-work)
7. [Record products](#record-products)
8. [Advance: the propulsion rule](#advance-the-propulsion-rule)
9. [Human stops](#human-stops)
10. [When something fails](#when-something-fails)
11. [Resuming](#resuming)

## The two model types

- **`@swamp/gatorwalk-factory/lifecycle`**, the holder: one instance whose
  `globalArguments` are a lifecycle (stages, work, products, transitions,
  gates). Methods: `validate`, `new_key`.
- **`@swamp/gatorwalk-factory/work-item`**: one instance per piece of work,
  named by a key from `new_key`. `start` pins a copy of the holder's lifecycle,
  so editing the holder never changes a running item. Every other method works
  on that copy.

Work-item methods are run by type, with the key as the instance name:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

Pass `--log` on every call. Methods report through the log; without it you see
only that the method succeeded.

## Set up a lifecycle holder

Once per lifecycle, in the swamp repo:

```sh
swamp model create @swamp/gatorwalk-factory/lifecycle <holder> --json
```

The output's `path` is the holder's definition file. Set its `globalArguments`
to the lifecycle by editing that file: for example, paste the contents of
`lifecycles/build-swamp-extension.yaml` under `globalArguments:`, indented. Do
not use `swamp model edit`, which opens an editor, and do not try
`--global-arg`, which cannot carry a nested lifecycle. swamp does not check the
lifecycle when the file is saved, so check it:

```sh
swamp model method run <holder> validate --log
```

`validate` reports every problem with its path. Fix them all before starting
work.

## Start a work item

```sh
swamp model method run <holder> new_key --log
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input lifecycle=<holder> --log
```

`new_key` prints an unused key such as `build-swamp-extension-r2ner2de`. Use it
as the work item's name from then on. To link a tracker ticket, pass
`externalRefs` as a JSON object mapping tracker to id. The key never carries the
ticket id.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input lifecycle=<holder> \
  --input 'externalRefs={"linear":"<issue UUID>"}' --log
```

## Read status

`status` is the only view of the work item to act on. It is a read method: it
takes no lock and writes nothing.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
build-swamp-extension-r2ner2de: active at stage 'plan-review' cycle 1
  expect: --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=88f57628-58ac-4ed2-be4c-e377568741e8
  exit approve -> implement [human: plan-approval]: not ready: human-approval: awaiting approval 'plan-approval' (0/1) for stage 'plan-review' cycle 1
  exit rework -> plan: not ready: cel: rework needs an open critical or high finding
  exit revise -> plan (manual): ready
  exit abandon -> abandoned [human: abandon-confirmation]: not ready: ...
  work: dispatch; dispatches this cycle 1 of 2
```

| Line                                  | Meaning                                                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active at stage '<stage>' cycle <n>` | Where the item is. `terminal` means it has finished; nothing more can be written.                                                                 |
| `expect: ...`                         | The expectation. Copy these three `--input` flags into every write except `record_usage`. A write whose expectation no longer matches is refused. |
| `exit <name> -> <to>`                 | One way out of the stage, including global ones such as `abandon`.                                                                                |
| `(manual)`                            | Only a person can send the item this way, and `advance` needs `confirm=true`.                                                                     |
| `[human: <gate-id>, ...]`             | The exit has human-approval gates. A person decides them, even once they pass.                                                                    |
| `ready` / `not ready: ...`            | Whether `advance` would take it now. Each failure names the gate, what it needed and what it found; a cycle limit shows here too.                 |
| `work: <mode>; dispatches this cycle` | The stage's work mode, and how many dispatches this stage and cycle has had of its cap.                                                           |
| `dispatch not ready: ...`             | The stage's packet cannot be built: a binding failed or a prompt placeholder has no value. Fix the run data it names.                             |
| `rejected <kind> '<name>' (...): ...` | The latest rejection of that product, kept as retry feedback until the product is recorded.                                                       |

To read a recorded product itself (to show a person, or to check a value), get
its record. Artifacts are `artifact-<name>`, evidence is `evidence-<name>`; the
payload is under `content`:

```sh
swamp data get <key> artifact-<name> --json
```

## The loop

1. `status`.
2. If the item is terminal, stop and report.
3. `dispatch`, then do the stage's work.
4. Record each product the stage declares.
5. `status` again, and apply the propulsion rule: advance, or stop and ask.
6. Repeat.

## Do the stage's work

Start every stage's work, whatever its mode, with `dispatch`:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

It records the resolved inputs and prompt for later replay, counts toward the
stage's dispatch cap, and prints the dispatch id and the packet: the rendered
prompt, then the rest as JSON (`mode`, `subagents`, `values`, `inject`, and for
workflow and method stages `inputs` with the `workflow` or `method` to call).
Dispatch once per attempt at the work, not once per tool call.

Then, by `mode`:

- **interactive**: do the work yourself, following the prompt.
- **dispatch**: hand the prompt to `subagents` subagents (one per listed skill,
  or one reviewer). Give each the products named in `inject`, read fresh with
  `swamp data get`. Record what they return.
- **workflow** or **method**: run the workflow or model method the packet names,
  with the packet's `inputs`. Then record the stage's result evidence with the
  real run id and outcome: `{"status":"succeeded","runId":"<run id>"}`, or
  `failed`. Never record a run you did not see finish. (The bundled lifecycle
  has no such stage.)

When the work used tokens you can count (a subagent reports them), attach them
to the dispatch. `record_usage` takes no expectation, since usage arrives after
the item may have moved on, and each dispatch takes usage once:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_usage <key> \
  --input dispatchId=<dispatch-id> --input inputTokens=<tokens> --input outputTokens=<tokens> \
  --input model=<model> --log
```

## Record products

Record each artifact and each piece of evidence the stage declares. Give the
payload as JSON in single quotes:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=<name> --input payload='<json>' \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_evidence <key> \
  --input name=<name> --input payload='<json>' \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

If the payload contains a single quote, put all the inputs in a YAML file (keys
`name`, `payload` as a mapping, and the three expectation keys) and pass that
instead:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input-file <path> --log
```

Recording the same name again makes a new version; gates and bindings read the
latest. A `findings` artifact (a review) holds
`{"findings":[{"id":...,"severity":"critical|high|medium|low","description":...}]}`.
To resolve a finding, record the artifact again with `"resolved":true` and a
`resolutionNote` on it. That changes the product, so any approval bound to the
old version stops counting.

Evidence is a fact about the world, such as a check run or a release. Record
only what you observed, with the values you observed.

## Advance: the propulsion rule

After recording, read `status` and sort the `ready` exits into two kinds:

- **Yours**: ready, not `(manual)`, and no `[human: ...]`.
- **The person's**: ready and `(manual)`, or ready with `[human: ...]`.

A manual exit with no gates, such as `recheck` or `revise`, shows `ready` all
the time. It is a way back that is there for the person. Its being ready never
counts as a reason to stop, and never as a reason to take it.

Then:

- **Exactly one exit is yours, and no human-gated exit is ready**: advance on it
  now, without asking.
- **Several exits are yours**, or one is yours and a human-gated exit is also
  ready: stop and ask which to take.
- **None is yours, and a human-approval gate is what stands in the way**: stop
  and ask the person. See [Human stops](#human-stops).
- **None is yours and no person is needed**: the stage's work is not done. Read
  the failures and do what they name.

Take a manual exit only when the person asks for it.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=<transition> \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

`advance` checks every gate again under the lock. It refuses rather than
half-moves.

## Human stops

Locally, the agent and the person run swamp as the same user, so an approval
cannot show which of them gave it. This skill is the only guard. **Never run any
of these without the person's explicit word, given for this decision:**

- `approve` or `decline`;
- `grant_override`;
- `advance` with `confirm=true` (a manual exit);
- `reset`.

"Explicit word" means the person said it in this conversation about this item
and this decision. Earlier approvals, approvals of something similar, and your
own judgment that it is fine do not count.

When a person must decide:

1. Read the products being decided on fresh, with `swamp data get`. Never
   summarise from memory.
2. Say what the gate is for, what the reviews found, and what each choice leads
   to.
3. Ask for the decision and the next step in one question, so the approval can
   carry the go: "Approve the plan and move to implement, or decline and send it
   back with revise?"
4. Do exactly what the answer says. Put the person's reason in `note`, in their
   words.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run approve <key> \
  --input gateId=<gate-id> --input note="<their words>" \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run decline <key> \
  --input gateId=<gate-id> --input note="<their words>" \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

A decline blocks the gate, and the note shows in `status`. To send the work back
after a decline, take the manual exit the person names:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=<transition> --input confirm=true \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

An approval is bound to the exact versions of the products in the era. If a
product it covered is recorded again, the approval stops counting and the person
must decide again.

## When something fails

A failed write exits non-zero with its reason. Nothing is ever half-written.

| What you see                                                          | What happened                                                               | What to do                                                                                                     |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `stale: the work item is at stage ...`                                | Your expectation is out of date. The item moved, or you copied it wrong.    | Read `status` and use its `expect` line. Then decide again: the move may have changed what to do.              |
| `<kind> '<name>' was rejected and kept as retry feedback:`            | The payload broke its schema. It is kept on the item and shown in `status`. | Fix the payload using the errors, then record it again. The rejection clears when a valid version is recorded. |
| `transition '<name>' is not ready: ...`                               | A gate failed. Nothing moved.                                               | Read `status`. Do the work the failures name, or ask the person if a human gate is in the way.                 |
| `transition '<name>' is manual: a person must confirm it`             | You tried a manual exit without `confirm=true`.                             | Ask the person. Only on their word, run it again with `confirm=true`.                                          |
| `stage '<to>' has been entered N time(s) in this era, its limit is M` | The cycle limit of the stage the exit enters.                               | Stop. Only a person can grant a cycle override. Tell them the stage keeps coming back and why.                 |
| `runaway loop suspected: stage ... has had N dispatch(es)`            | The dispatch cap for this stage and cycle.                                  | Stop. The work keeps failing: tell the person what went wrong. Only on their word, grant a dispatch override.  |
| `stage '<stage>' is not ready to dispatch:`                           | A binding failed or a prompt placeholder has no value.                      | Record the product the binding reads, then dispatch again.                                                     |
| `the work item finished at stage '<stage>'`                           | It has finished.                                                            | Nothing to do.                                                                                                 |

Overrides, on the person's word:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run grant_override <key> \
  --input kind=cycle --input stage=<stage> --input note="<their words>" \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run grant_override <key> \
  --input kind=dispatch --input note="<their words>" \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

A cycle override names the stage that is being re-entered, which is the target
of the exit, not the current stage. Each grant adds exactly one entry or
dispatch, and grants add up.

### Ways back, so nothing wedges

- **Manual exits.** A well-made lifecycle gives a person a way back wherever
  work can be declined or blocked, so a decline never leaves `abandon` as the
  only exit. The bundled lifecycle has `revise` after either review, `recheck`
  from implement, and `rework` from release. Take one only on the person's word.
- **Global exits** such as `abandon` are open from every stage, are never closed
  by a cycle limit, and need the person's approval.
- **`reset`** is the last resort. It starts the item over at the initial stage
  in a new era: every product, approval and count from before stops counting,
  though the history is kept. It needs `confirm=reset` and the person's word.
  `repin=true` also adopts the holder's current lifecycle.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run reset <key> \
  --input confirm=reset \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

Never reset to get past a refusal you do not understand. Read `status` and ask
first.

## Resuming

In a new session, or after anything unexpected, trust `status` and nothing else:
not memory, not the conversation, not what you meant to do. Run it, then go on
from the loop. If a person's decision was pending, ask again; an answer given
before is not a go now unless they say so.
