# Driving a gatorwalk work item

How to take a work item from start to done with the two gatorwalk-factory model
types. Every command here is checked by `integration/extension/skill_test.ts`:
each names a real method with inputs its schema accepts. The worked example,
[examples/build-swamp-extension.md](examples/build-swamp-extension.md), runs a
whole work item as written.

Placeholders are in angle brackets: `<key>`, `<factory>`, `<stage>`, `<cycle>`,
`<era>` and so on. Replace them, and nothing else.

## Contents

1. [The two model types](#the-two-model-types)
2. [Set up a factory](#set-up-a-factory)
3. [Start a work item](#start-a-work-item)
4. [Start from a ticket](#start-from-a-ticket)
5. [Read status](#read-status)
6. [The loop](#the-loop)
7. [Do the stage's work](#do-the-stages-work)
8. [Record products](#record-products)
9. [Advance: the propulsion rule](#advance-the-propulsion-rule)
10. [Human stops](#human-stops)
11. [Keep the ticket in step](#keep-the-ticket-in-step)
12. [When something fails](#when-something-fails)
13. [Resuming](#resuming)

## The two model types

- **`@swamp/gatorwalk-factory/factory`**, the factory: one instance whose
  `globalArguments` name its factory definition file (stages, work, products,
  transitions, gates), `{ definition: factories/<factory>.yaml }`. Methods:
  `init`, `validate`, `design_page`, `new_key`.
- **`@swamp/gatorwalk-factory/work-item`**: one instance per piece of work,
  named by a key from `new_key`. `start` reads the definition file and pins a
  copy, so editing the file never changes a running item; `reset` with
  `repin=true` adopts the edited file. Every other method works on that copy.

Work-item methods are run by type, with the key as the instance name:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

Pass `--log` on every call. Methods report through the log; without it you see
only that the method succeeded.

## Set up a factory

Once per factory, in the swamp repo. A factory names its definition file, a YAML
path relative to the repo, `factories/<factory>.yaml` by convention. That file
is the one copy of the definition: edit it there, never in the factory's model
definition.

A factory also names the tracker instance its work items publish to, and the
instance must exist first. Its type is the one the definition's `tracker.kind`
needs: the built-in tracker (`@swamp/gatorwalk-factory/tracker`) when the
definition names no kind, or Linear (`@swamp/gatorwalk-factory/linear`, with its
token wired from a vault) for `kind: linear`. The instance keeps the tracker's
settings, such as the built-in tracker's `prefix`, `statuses` and `types`. With
no external tracker, create the built-in one once per project:

```sh
swamp model create @swamp/gatorwalk-factory/tracker board \
  --global-arg prefix=<prefix> --json
swamp model create @swamp/gatorwalk-factory/factory <factory> \
  --global-arg definition=factories/<factory>.yaml --global-arg tracker=board --json
swamp model method run <factory> init --input from=starter --log
```

`init` copies a starter to the definition file and never overwrites one. The
starters are the examples in [examples/](examples/): `minimal`, `starter`,
`build-swamp-extension` and `swamp-club-swamp-extensions`. Pick the closest.
Then edit the file: change what its description's "Change first" paragraph
names, and rewrite the description for your process. swamp does not check the
file when it is saved, so check it. `validate` also refuses a factory whose
tracker instance is missing or of another kind than the definition's:

```sh
swamp model method run <factory> validate --log
```

`validate` reports every problem with its path. Fix them all before starting
work. It also runs the factory's saved scenarios, the known paths through it,
from `scenarios/<factory>/`; write one for each path the factory must keep
([scenarios.md](scenarios.md)).

To see the factory definition as a page (the stage graph, gates, human stops,
handoffs and the graph findings with their traces), render it, then save the
`content` field of the stored page to an `.html` file and open that in a
browser:

```sh
swamp model method run <factory> design_page --log
swamp data get <factory> design-page --json
```

When a person wants to watch your edits to a factory definition or its
scenarios, point them at the studio: a read-only local page that reloads each
file as you save it. They start it themselves, since it runs until Ctrl-C:
`swamp model create @swamp/gatorwalk-factory/studio studio` once, then
`swamp model method run studio serve`, which logs the URL.

## Start a work item

```sh
swamp model method run <factory> new_key --input 'title=<title>' --log
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input factory=<factory> --log
```

`new_key` prints an unused key made from the work's title, such as
`build-swamp-extension-add-list-method-r2ne`: the factory definition name, a
slug of the title, and a short random suffix. Use it as the work item's name
from then on; it does not change if the work does. A title with no ASCII letters
or digits is refused. `start` takes any unused name, so a person may choose a
key by hand instead. To link a tracker ticket, pass `externalRefs` as a JSON
object mapping tracker to id; the code links a work item to a ticket only
through `externalRefs`.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input factory=<factory> \
  --input 'externalRefs={"linear":"<issue UUID>"}' --log
```

## Start from a ticket

When the work comes from a tracker ticket (a Linear issue, a swamp-club Lab
issue, or a built-in tracker's ticket), start it through the tracker's adapter
instance, so the same ticket never starts twice:

```sh
swamp model method run <tracker> claim --input issue=<ticket> \
  --input factory=<factory> --log
```

`issue` is the ticket's id or its display identifier (`ABC-1`, `#2631`,
`cue-board-shortcuts-r2ne`). `claim` answers in one of these ways:

- **`is claimed as '<key>'. Start it: swamp model ...`**: the ticket had no work
  item, so `claim` reserved a key and recorded it in the adapter's ticket index.
  The key starts with the ticket's display id, then its title (Lab:
  `2734-drive-lab-issue-k3xq`; Linear: `abc-12-...`), for reading only. A
  built-in ticket's first work item takes the ticket's id as its key
  (`cue-board-shortcuts-r2ne`); a later one gets `cue-<slug>-<suffix>`. Run the
  printed `start` command exactly as printed; it carries the ticket's
  `externalRefs`.
- **`not started yet. Start it: ...`**: an earlier claim reserved this key but
  its `start` never ran (or failed). Run the printed command.
- **`is already started: '<key>' at stage '<stage>'`**: drive that work item.
- **`is driven by issue-lifecycle here (instance 'issue-<N>')`** (the Lab only):
  `@swamp/issue-lifecycle` already drives this issue. Stop and drive it with
  issue-lifecycle; do not delete its instance unless the person says to.

If anything fails between `claim` and `start`, run `claim` again: it hands back
the same key and command. `factory` is only needed when a new key is reserved;
once a ticket's work item has finished, claiming it again reserves a new one.
`claim` never comments on or moves the ticket. Never choose a key by hand for a
ticket's work item; `claim` names it.

To file a new ticket when the person asks for one, run `create` on the tracker's
instance, then claim the id it prints:

```sh
swamp model method run <tracker> create --input 'title=<title>' \
  --input 'body=<body>' --input 'type=<type>' --log
```

The type must be one the tracker has (the Lab: `feature`, `bug`, `security`; the
built-in tracker: its `types`; Linear: a type its `types` argument maps to a
label). Never re-run a `create` that may have gone through: check the tracker
first, since a retry files a second ticket.

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
  exit revise -> plan (manual): not ready: evidence-recorded: evidence 'plan-feedback' has not been recorded
  exit abandon -> abandoned [human: abandon-confirmation]: not ready: ...
  a person records: plan-feedback
  work: dispatch; dispatches this cycle 1 of 2
```

| Line                                  | Meaning                                                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active at stage '<stage>' cycle <n>` | Where the item is. `terminal` means it has finished; nothing more can be written.                                                                 |
| `expect: ...`                         | The expectation. Copy these three `--input` flags into every write except `record_usage`. A write whose expectation no longer matches is refused. |
| `exit <name> -> <to>`                 | One way out of the stage, including global ones such as `abandon`.                                                                                |
| `(manual)`                            | Only a person can send the item this way, and `advance` needs `confirm=true`.                                                                     |
| `[human: <gate-id>, ...]`             | The exit has human-approval gates a person must decide now. A person decides them, even once they pass.                                           |
| `[approval not required now: <id>]`   | A conditional approval whose `when` is false right now: it passes and no one is asked. It can become `[human: ...]` when the data changes.        |
| `ready` / `not ready: ...`            | Whether `advance` would take it now. Each failure names the gate, what it needed and what it found; a cycle limit shows here too.                 |
| `a person records: <name>, ...`       | Evidence of this stage that a person gives, such as their feedback. Never record it yourself: record the person's words, on their behalf.         |
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
4. Record each product the stage's work records (the packet's `products`).
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
prompt, then the rest as JSON (`mode`, `subagents`, `values`, `inject`,
`products`, and for workflow and method stages `inputs` with the `workflow` or
`method` to call). `products` lists every artifact and evidence the stage's work
records, each with the `schema` its payload must meet: record each one. Evidence
a person records (`recordedBy: person`, which `status` lists under
`a person records:`) is not in it; see
[Evidence a person records](#evidence-a-person-records). Dispatch once per
attempt at the work, not once per tool call.

For a dispatch stage, pass your scratch directory as `resultDir`. Leave it out
and the engine makes a new temporary directory:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input resultDir=<scratch-dir> \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

Instead of the rendered prompt, the output then prints one prompt per subagent,
each between these two lines:

```text
--- subagent <n> of <total> (<skill>) prompt; send it as it is ---
--- end subagent <n> prompt ---
```

The `(<skill>)` part appears only when the stage lists skills. Each prompt
starts with the rendered prompt and goes on to name the skill to follow, a
`swamp data get` read for each injected product, and a result file for each
product with its schema. The dispatch records these prompts as they were
printed.

Then, by `mode`:

- **interactive**: do the work yourself, following the prompt.
- **dispatch**: start one subagent per printed prompt, from this repo's
  directory, and send each its prompt exactly as printed. Copy it from the
  dispatch output; never retype it, shorten it or add to it. Never change a
  reviewer's scope, its severity guidance or its stance. A decision the person
  made (say, that a risk is accepted) belongs in the product under review or in
  an approval note, never in a prompt. Each subagent writes its result to the
  files its prompt names. Record those files as they are (see
  [Record products](#record-products)).
- **workflow** or **method**: run the workflow or model method the packet names,
  with the packet's `inputs`. Then record the stage's result evidence with the
  real run id and outcome: `{"status":"succeeded","runId":"<run id>"}`, or
  `failed`. Never record a run you did not see finish. (The bundled factory
  definition has no such stage.)

A factory definition is in one stage at a time, so work that runs in parallel
does so inside one stage. Such a stage names a wrapper workflow whose jobs run
at once, often each nesting another workflow. swamp-extensions' `verify` stage
is one: it runs verify-build and verify-reviews together. Its result evidence
records each part, not only the wrapper:

- The wrapper's own run id and status are `runId` and `status`. The wrapper
  fails if any part failed.
- A part that succeeded has its run id in the wrapper's run record (the `path`
  that `swamp workflow run --json` prints), as the step's `output.runId`.
- A part that failed has none there. Find it with
  `swamp workflow history search <workflow name> --json`, and check that its
  inputs name the same commit.

See DESIGN.md, "Parallel work inside one stage", for the rule and the pattern.

Attach each subagent's usage to its dispatch as soon as it hands back. The
number comes from the harness's report of the subagent, not from anything the
subagent says: a subagent cannot see its own token count, so never ask one (a
reviewer included) to report it. In Claude Code the report is the `<usage>`
block of the subagent's task notification, or of the Agent tool result when the
call was synchronous: `subagent_tokens` is `totalTokens`, and `tool_uses` and
`duration_ms` are `toolUses` and `durationMs`. That is one total, with no
input/output split; give `inputTokens` and `outputTokens` too only when the
harness reports them. Take `model` from the model the Agent call resolved to.
Several subagents on one dispatch each report their own count: record their sum.
`record_usage` takes no expectation, since usage arrives after the item may have
moved on, and each dispatch takes usage once:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_usage <key> \
  --input dispatchId=<dispatch-id> --input totalTokens=<tokens> \
  --input toolUses=<tool-uses> --input durationMs=<duration-ms> \
  --input model=<model> --log
```

Interactive work (your own planning, implementing and checking) has no usage you
can see, so do not record any: the summary counts those dispatches as without
usage, by mode, and that is expected.

## Record products

Record each artifact and each piece of evidence the stage declares (the packet's
`products`). Give the payload as JSON in single quotes:

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

A subagent's product is never typed out again. Record the result file it wrote,
with `@` and the path from its prompt, so swamp reads the payload from the file:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=<name> --input payload=@<result-path> \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

You may read the file to show the person. Never edit it. If it is missing, is
not JSON, or is refused by its schema, send the subagent back to fix it (with
SendMessage, or your harness's way of continuing a subagent). Do not repair it
yourself.

When several subagents review into one findings artifact, join their files
mechanically and record the joined file. Each subagent's prompt has it start its
finding ids with its own number, so the join repeats no id. Fields other than
`findings` come from the first file:

```text
jq -s '.[0] + {findings: map(.findings) | add}' <result-path-1> <result-path-2> > <joined-path>
```

Recording the same name again makes a new version; gates and bindings read the
latest. A `findings` artifact (a review) holds
`{"findings":[{"id":...,"severity":"critical|high|medium|low","description":...}]}`.
To resolve a finding, record the artifact again with `"resolved":true` and a
`resolutionNote` on it. That changes the product, so any approval bound to the
old version stops counting.

Evidence is a fact about the world, such as a check run or a release. Record
only what you observed, with the values you observed.

### Evidence a person records

Some evidence is a person's, not the work's: the factory definition declares it
`recordedBy: person`, and `status` lists it under `a person records:`. The
bundled definitions' `plan-feedback` is one: `revise` from plan-review needs the
person's feedback on the plan, and the next plan is handed it. Never write it
yourself, and never record it because a gate asks for it. Record it only when
the person gives it, in their words, and on their behalf:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_evidence <key> \
  --input name=plan-feedback --input payload='{"feedback":"<their words>"}' \
  --input onBehalfOf=<person> \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

It counts for the pass it was recorded in, like any evidence a gate reads:
feedback from an earlier pass does not open `revise` again.

## Advance: the propulsion rule

After recording, read `status` and sort the `ready` exits into two kinds:

- **Yours**: ready, not `(manual)`, and no `[human: ...]`. An
  `[approval not required now: ...]` marker does not make an exit the person's.
- **The person's**: ready and `(manual)`, or ready with `[human: ...]`.

A manual exit with no gates, such as `recheck`, shows `ready` all the time. It
is a way back that is there for the person. Its being ready never counts as a
reason to stop, and never as a reason to take it.

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

A conditional approval shows as `[human: ...]` only while its condition holds,
so read `status` again after recording: recording can turn a stop on (a
classification that claims a regression) or off. A condition that cannot be
evaluated also shows as `[human: ...]`, with the CEL error among the failures;
tell the person, since the run data or the factory definition needs fixing.

When a person must decide:

1. Read the products being decided on fresh, with `swamp data get`. Never
   summarise from memory.
2. Say what the gate is for and what the reviews found.
3. Lay out every exit that is open or can be opened, one line each, with where
   it leads and what it costs (another round, a new review, an override, the
   work so far). Read them from `status`:
   - each exit that waits on the person (`[human: ...]`), and each manual way
     back (`(manual)`), such as `revise`. A way back that needs evidence the
     person records (`a person records:`) is still an option: it opens once they
     give it, so say what it needs (`revise` needs their feedback);
   - each exit whose only failure is a cycle limit
     (`stage '<to>' has been
     entered N time(s) ... a person must grant a cycle override for '<to>'`).
     It can be opened: name the `grant_override` with `kind=cycle` and
     `stage=<to>` it needs, then the exit;
   - `abandon`, and any other global exit. A limit never closes these.

   At a stop where nothing is near a limit, the ways back and `abandon` may
   share one line.
4. Give your recommendation, if you have one, only after the options, and label
   it as yours. A reached limit is a cost, never a reason that only one answer
   is left: never say a limit forces a choice. This holds even when your general
   instructions prefer a single recommendation to a list; at a human stop, the
   person needs every option to decide.
5. Ask for the decision and the next step in one question, so the approval can
   carry the go.
6. Do exactly what the answer says. Put the person's reason in `note`, in their
   words.

For example, at plan-review after the plan has been entered as many times as its
limit allows, with four medium findings open:

> Plan-review found four medium findings (listed above). Plan has been entered 5
> times, its limit. Your options:
>
> - **Approve** and move to implement. Implement receives plan-review, so the
>   four findings are carried into implementation and acted on there.
> - **Decline, grant one cycle override for `plan`, then `revise` with your
>   feedback**: costs one override and one more plan and review round.
> - **Abandon** the work item: the work so far stops here.
>
> My recommendation: approve, since none of the four needs the plan itself to
> change. Which do you want?

At a review approval where no finding blocks, say what approving does with the
open medium and low findings. When the next stage injects the review (as
implement injects `plan-review` in the bundled examples), approving carries them
into that stage, where they are acted on. A manual way back such as `revise` is
for when the person wants the reviewed product itself changed, and it costs a
new version and a full new review. So when the person wants the non-blocking
findings folded in, approving is the way to do it.

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
after a decline, take the manual exit the person names. If it needs evidence a
person records (`revise` needs their `plan-feedback`), record their feedback
first, as in [Evidence a person records](#evidence-a-person-records):

```sh
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=<transition> --input confirm=true \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

An approval is bound to the exact versions of the products in the era. If a
product it covered is recorded again, the approval stops counting and the person
must decide again.

## Keep the ticket in step

When the work item was started with `externalRefs` for its tracker, publish it
after each write, on the tracker instance its factory was bound to when it
started (`<tracker>`; publish refuses any other instance):

```sh
swamp model method run <tracker> publish --input workItem=<key> --log
```

`status` says when the ticket is behind. It reads the tracker's publish cursor,
with no network call, and while events are waiting it prints a line such as:

```text
tracker 'board' behind by 2 event(s): run publish on it
```

Once all are delivered it prints no tracker line. So the loop is: after each
write, run `status`, and run `publish` whenever it says the tracker is behind.
Before stopping for a person, make sure it no longer does. If it says
`lag unknown`, run `publish` anyway.

`publish` posts a comment for each new event a person on the ticket needs, and
moves the ticket when the stage's status key changes. When the factory
definition declares tracker entries and the tracker keeps them (the Lab), it
writes those lifecycle entries instead of comments, and sets the ticket type an
entry names. It is the only thing that writes the ticket's status and type:
never call `set_status` or `set_type` for a work item yourself. Running it again
delivers only what is new. A failed publish never blocks the work item, but the
ticket falls behind until it succeeds, and on the Lab that ticket is the audit
trail: after a failure, run it again before moving on. An entry the tracker
refuses outright is skipped and logged as a warning; tell the person which one.

When the work belongs to another ticket (for example the ticket turned out to
duplicate another), a person may move the work item there, on their word:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run retarget <key> \
  --input 'externalRefs={"swamp-club":"<id>","swamp-club.display":"#<id>"}' \
  --input reason="<their words>" \
  --input expectedStage=<stage> --input expectedCycle=<cycle> --input expectedEra=<era> \
  --log
```

`retarget` replaces the whole `externalRefs` map and records who moved it and
why. Nothing else changes: the stage, cycle, products and approvals stay as they
were. The next `publish` finishes the old ticket (what it had not been sent yet,
then a note saying where the work went) and carries on at the new one (a note
saying where it came from, the status, then every later event). The earlier
history stays on the old ticket. The reason is kept in the work item, not posted
on either ticket. After a retarget, `claim` on the old ticket is refused, since
its index still names this work item.

## When something fails

A failed write exits non-zero with its reason. Nothing is ever half-written.

| What you see                                                          | What happened                                                               | What to do                                                                                                     |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `stale: the work item is at stage ...`                                | Your expectation is out of date. The item moved, or you copied it wrong.    | Read `status` and use its `expect` line. Then decide again: the move may have changed what to do.              |
| `<kind> '<name>' was rejected and kept as retry feedback:`            | The payload broke its schema. It is kept on the item and shown in `status`. | Fix the payload using the errors, then record it again. The rejection clears when a valid version is recorded. |
| `transition '<name>' is not ready: ...`                               | A gate failed. Nothing moved.                                               | Read `status`. Do the work the failures name, or ask the person if a human gate is in the way.                 |
| `transition '<name>' is manual: a person must confirm it`             | You tried a manual exit without `confirm=true`.                             | Ask the person. Only on their word, run it again with `confirm=true`.                                          |
| `stage '<to>' has been entered N time(s) in this era, its limit is M` | The cycle limit of the stage the exit enters.                               | Stop. Tell them why the stage keeps coming back, and lay out every exit, an override among them.               |
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

- **Manual exits.** A well-made factory definition gives a person a way back
  wherever work can be declined or blocked, so a decline never leaves `abandon`
  as the only exit. The bundled factory definition has `revise` after either
  review, `recheck` from implement, and `rework` from release. Take one only on
  the person's word. `revise` after the plan review needs the person's feedback
  recorded first, which a person can always give.
- **Global exits** such as `abandon` are open from every stage, are never closed
  by a cycle limit, and need the person's approval.
- **`reset`** is the last resort. It starts the item over at the initial stage
  in a new era: every product, approval and count from before stops counting,
  though the history is kept. It needs `confirm=reset` and the person's word.
  `repin=true` also adopts the factory's current definition.

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
