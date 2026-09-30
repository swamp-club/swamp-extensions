# Worked example: build-swamp-extension

One work item driven from start to `done` on
[build-swamp-extension.yaml](build-swamp-extension.yaml), by the pull-request
route:

```
plan → plan-review → implement → check → code-review → release → done
```

Along the way:

- a plan is rejected by its schema and recorded again;
- the person declines the plan, and their feedback sends the work back by the
  manual `revise`;
- the person waives the quality score (the extension has no manifest yet);
- the person approves the plan and the release.

Every command here is run, in this order and as written, by
`integration/extension/skill_test.ts` against a real swamp repo. Output is from
such a run, trimmed to the lines that matter. `<key>` and `<era>` stand for the
generated work-item key and era, `<result-dir>` for a scratch directory and
`<result-path>` for the result file the latest dispatch named; everything else
is literal. The test cannot run a subagent, so at the two review stages a
reviewer's result file is shown as a `json result` block, and the test writes it
where the reviewer would.

## Set up

In a swamp repo, add gatorwalk-factory as an extension source, create a factory
that names its definition file, and copy this example into that file:

```sh
swamp extension source add <gatorwalk-factory>
swamp model create @swamp/gatorwalk-factory/factory team \
  --global-arg definition=factories/team.yaml --json
swamp model method run team init --input from=build-swamp-extension --log
```

`init` copies [build-swamp-extension.yaml](build-swamp-extension.yaml), beside
this file, to `factories/team.yaml`; it never overwrites a file. That file is
the one copy of the definition: edit it there. Then check it, get a key, and
start the work item under that key:

```sh
swamp model method run team validate --log
swamp model method run team new_key --input 'title=Add a list method' --log
swamp model @swamp/gatorwalk-factory/work-item method run start <key> \
  --input factory=team --log
```

```text
definition 'build-swamp-extension' in factories/team.yaml is valid: 8 stages (plan, plan-review, implement, check, code-review, release, done, abandoned)
build-swamp-extension-add-list-method-r2ne
started 'build-swamp-extension-add-list-method-r2ne' at stage 'plan' (definition 'build-swamp-extension' from 'team', factories/team.yaml)
```

## plan (cycle 1)

```sh
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
build-swamp-extension-add-list-method-r2ne: active at stage 'plan' cycle 1
  expect: --input expectedStage=plan --input expectedCycle=1 --input expectedEra=88f57628-58ac-4ed2-be4c-e377568741e8
  exit submit -> plan-review: not ready: artifact-exists: artifact 'plan' has not been recorded
  exit abandon -> abandoned [human: abandon-confirmation]: not ready: human-approval: awaiting approval 'abandon-confirmation' (0/1) for stage 'plan' cycle 1
  work: interactive; dispatches this cycle 0 of 2
```

The stage's work is interactive: the driving agent plans. Dispatch first, so the
resolved inputs and prompt are recorded:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input expectedStage=plan --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

```text
dispatch 1 for stage 'plan' cycle 1
Plan the change. Name the files each step touches, how it will be
tested, and whether the manifest version needs a bump (any behaviour
change to a published extension does).
packet: {
  "stage": "plan",
  "cycle": 1,
  "mode": "interactive",
  "skills": [],
  "subagents": 0,
  "values": {},
  "inject": [],
  "problems": [],
  "ready": true
}
```

A first plan that leaves out fields its schema requires is refused, and kept as
feedback:

```sh
# fails: the plan schema requires testingStrategy and versionBump
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=plan \
  --input payload='{"summary":"Add a list method","steps":[{"description":"Add list to the model","files":["extensions/models/thing.ts"]}]}' \
  --input expectedStage=plan --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
Error: artifact 'plan' was rejected and kept as retry feedback:
(root): Instance does not have required property "testingStrategy".
(root): Instance does not have required property "versionBump".

build-swamp-extension-add-list-method-r2ne: active at stage 'plan' cycle 1
  ...
  work: interactive; dispatches this cycle 1 of 2
  rejected artifact 'plan' (stage 'plan' cycle 1): (root): Instance does not have required property "testingStrategy".; (root): Instance does not have required property "versionBump".
```

Fix the payload and record it again. `submit` is then the one ready exit, with
no human gate and not manual, so advance without asking:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=plan \
  --input payload='{"summary":"Add a list method","steps":[{"description":"Add list to the model","files":["extensions/models/thing.ts","extensions/models/thing_test.ts"]}],"testingStrategy":"Unit tests for list against a fake client","versionBump":{"needed":true,"reason":"A new method"}}' \
  --input expectedStage=plan --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=submit \
  --input expectedStage=plan --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

```text
recorded artifact 'plan' version 1

  exit submit -> plan-review: ready
  exit abandon -> abandoned [human: abandon-confirmation]: not ready: ...

took 'submit' to stage 'plan-review' cycle 1
```

## plan-review (cycle 1): the person declines

A dispatch stage: dispatch with a scratch directory, send the printed subagent
prompt to one reviewer subagent as it is, record the result file it writes, and
attach the token count the harness reports for it (the task notification's
`<usage>` block) to the dispatch id.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input resultDir=<result-dir> \
  --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

```text
dispatch 2 for stage 'plan-review' cycle 1
packet: {
  "stage": "plan-review",
  "cycle": 1,
  "mode": "dispatch",
  "skills": [],
  "subagents": 1,
  "values": {
    "planSummary": "Add a list method"
  },
  "inject": [
    "plan"
  ],
  "products": [
    {
      "kind": "artifact",
      "name": "plan-review",
      "reviews": "plan"
    }
  ],
  "problems": [],
  "ready": true
}
--- subagent 1 of 1 prompt; send it as it is ---
You are an adversarial reviewer. Try to refute this plan:
Add a list method
Check its steps against the code, its testing strategy against the
risks, and whether the version bump call is right.
Rate a finding critical or high only if the plan would ship a
defect, lose data, break a stated rule, or make the declared checks
meaningless. Gaps in process, logistics or manual verification that
the automated checks already cover are medium at most. Judge the
plan against the size of the change: do not ask for verification
machinery bigger than the change, and give the smallest adequate fix
for each finding. Report findings with severities, and do not soften
the severity of a real defect.

---

Read these products fresh from the store:
- plan: swamp data get <key> artifact-plan --json

Write your result as JSON, one file per product, holding the
payload and nothing else. These files are the only thing you may
write.
- artifact plan-review: write it to <result-dir>/<key>-d2-1-plan-review.json
  Its schema:
    {
      "type": "object",
      "required": [
        "findings"
      ],
      ...
    }
--- end subagent 1 prompt ---
```

The reviewer writes its result file:

```json result
{
  "findings": [
    {
      "id": "F1",
      "severity": "medium",
      "description": "The plan does not update the README for the new method"
    }
  ]
}
```

Record it from the file, as written:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=plan-review \
  --input payload=@<result-path> \
  --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_usage <key> \
  --input dispatchId=2 --input totalTokens=65155 --input toolUses=12 --input durationMs=94000 \
  --input model=claude-opus-5-5 --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
build-swamp-extension-add-list-method-r2ne: active at stage 'plan-review' cycle 1
  expect: --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=88f57628-58ac-4ed2-be4c-e377568741e8
  exit approve -> implement [human: plan-approval]: not ready: human-approval: awaiting approval 'plan-approval' (0/1) for stage 'plan-review' cycle 1
  exit rework -> plan: not ready: cel: rework needs an open critical or high finding
  exit revise -> plan (manual): not ready: evidence-recorded: evidence 'plan-feedback' has not been recorded
  exit abandon -> abandoned [human: abandon-confirmation]: not ready: ...
  a person records: plan-feedback
  work: dispatch; dispatches this cycle 1 of 2
```

No finding blocks, so `rework` is not ready. `approve` needs the person
(`[human: plan-approval]`). `revise` is manual and needs `plan-feedback`, which
a person records: their feedback on the plan, never the agent's own. Stop and
ask, showing the plan and the review read fresh from the store:

```sh
swamp data get <key> artifact-plan --json
swamp data get <key> artifact-plan-review --json
```

> Plan-review found one medium finding (README not updated). Your options:
>
> - **Approve** and move to implement. Implement receives plan-review, so the
>   finding is carried into implementation.
> - **Decline and `revise`** with your feedback, which the next plan is handed:
>   the plan itself changes, at the cost of a new version and a full new review.
> - **Abandon** the work item.
>
> Which do you want?

The person (`sam`) answers: "Decline. The README must be in the plan. Send it
back." Record the decline with their reason, record their feedback in their
words and on their behalf, then take the manual exit they asked for:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run decline <key> \
  --input gateId=plan-approval \
  --input note="The README must be in the plan." \
  --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_evidence <key> \
  --input name=plan-feedback \
  --input payload='{"feedback":"The README must be in the plan."}' \
  --input onBehalfOf=sam \
  --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=revise --input confirm=true \
  --input expectedStage=plan-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

```text
declined 'plan-approval' (decision 1)
recorded evidence 'plan-feedback' version 1
took 'revise' to stage 'plan' cycle 2
```

## plan (cycle 2) and plan-review (cycle 2): the person approves

The expectation now names cycle 2. The dispatch injects the last plan, its
review and the feedback; the new plan answers the feedback and lists it in
`feedbackIncorporated`.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input expectedStage=plan --input expectedCycle=2 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=plan \
  --input payload='{"summary":"Add a list method","steps":[{"description":"Add list to the model","files":["extensions/models/thing.ts","extensions/models/thing_test.ts"]},{"description":"Document list","files":["README.md"]}],"testingStrategy":"Unit tests for list against a fake client","versionBump":{"needed":true,"reason":"A new method"},"feedbackIncorporated":["The README must be in the plan."]}' \
  --input expectedStage=plan --input expectedCycle=2 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=submit \
  --input expectedStage=plan --input expectedCycle=2 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input resultDir=<result-dir> \
  --input expectedStage=plan-review --input expectedCycle=2 --input expectedEra=<era> \
  --log
```

The reviewer writes its result file:

```json result
{
  "findings": []
}
```

Record it from the file, as written:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=plan-review \
  --input payload=@<result-path> \
  --input expectedStage=plan-review --input expectedCycle=2 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_usage <key> \
  --input dispatchId=4 --input totalTokens=49659 --input toolUses=8 --input durationMs=61000 \
  --input model=claude-opus-5-5 --log
```

> Plan-review found nothing. Approve the plan and move to implement? (Or
> `revise` it for another round, or abandon.)

The person answers: "Approved, go." Their approval carries their go, so approve
and advance:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run approve <key> \
  --input gateId=plan-approval --input note="Approved, go." \
  --input expectedStage=plan-review --input expectedCycle=2 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=approve \
  --input expectedStage=plan-review --input expectedCycle=2 --input expectedEra=<era> \
  --log
```

```text
approved 'plan-approval' (decision 2)
took 'approve' to stage 'implement' cycle 1
```

## implement

Implement and commit, then record `change-summary` with the commit's full SHA.

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input expectedStage=implement --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=change-summary \
  --input payload='{"summary":"Add list and document it","commit":"c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd","files":["extensions/models/thing.ts","extensions/models/thing_test.ts","README.md"]}' \
  --input expectedStage=implement --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
build-swamp-extension-add-list-method-r2ne: active at stage 'implement' cycle 1
  expect: --input expectedStage=implement --input expectedCycle=1 --input expectedEra=88f57628-58ac-4ed2-be4c-e377568741e8
  exit submit -> check: ready
  exit recheck -> check (manual): ready
  exit abandon -> abandoned [human: abandon-confirmation]: not ready: ...
  work: interactive; dispatches this cycle 1 of 2
```

Two exits are ready, but `recheck` is manual: a way back for the person, which
does not count. `submit` is the one exit that is yours, so advance without
asking:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=submit \
  --input expectedStage=implement --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

## check: the person waives the quality score

Run the checks on the change-summary commit and record them. This extension has
no manifest yet, so `swamp extension quality` cannot score it:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input expectedStage=check --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_evidence <key> \
  --input name=checks \
  --input payload='{"commit":"c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd","status":"passed","results":[{"name":"fmt","status":"passed"},{"name":"check","status":"passed"},{"name":"lint","status":"passed"},{"name":"test","status":"passed"}]}' \
  --input expectedStage=check --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
exit passed -> code-review: not ready: evidence-recorded: evidence 'quality' has not been recorded; cel: checks and quality must be for the change-summary commit
exit passed-with-quality-waiver -> code-review [human: quality-waiver]: not ready: human-approval: awaiting approval 'quality-waiver' (0/1) for stage 'check' cycle 1
exit failed -> implement: not ready: evidence-recorded: evidence 'checks': field 'status' is "passed", expected "failed"
exit quality-failed -> implement: not ready: evidence-recorded: evidence 'quality' has not been recorded
```

> Checks passed. The extension has no manifest, so it cannot be scored. Waive
> the quality score and move to code review? (Or abandon the work item.)

The person answers: "Waive it, go on."

```sh
swamp model @swamp/gatorwalk-factory/work-item method run approve <key> \
  --input gateId=quality-waiver --input note="No manifest yet; waive it, go on." \
  --input expectedStage=check --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=passed-with-quality-waiver \
  --input expectedStage=check --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

## code-review: the person approves the release

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input resultDir=<result-dir> \
  --input expectedStage=code-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

The reviewer writes its result file:

```json result
{
  "findings": [
    {
      "id": "F1",
      "severity": "low",
      "description": "list could page lazily",
      "resolved": false
    }
  ]
}
```

Record it from the file, as written:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run record_artifact <key> \
  --input name=code-review \
  --input payload=@<result-path> \
  --input expectedStage=code-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_usage <key> \
  --input dispatchId=7 --input totalTokens=80523 --input toolUses=15 --input durationMs=122000 \
  --input model=claude-opus-5-5 --log
```

> Code review found one low finding (list could page lazily). Approve the
> release and move to release, with the finding left open? (Or `revise` to go
> back to implement and a new review, or abandon.)

The person answers: "Approve the release."

```sh
swamp model @swamp/gatorwalk-factory/work-item method run approve <key> \
  --input gateId=release-approval --input note="Approve the release." \
  --input expectedStage=code-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=accept \
  --input expectedStage=code-review --input expectedCycle=1 --input expectedEra=<era> \
  --log
```

## release

Open the pull request, post the verification attestation, and once it merges
record the release with the merge commit:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run dispatch <key> \
  --input expectedStage=release --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run record_evidence <key> \
  --input name=release \
  --input payload='{"via":"pull-request","commit":"c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd","mergeCommit":"9e1f0c7b3a5d2e4f6a8b0c1d3e5f7a9b1c3d5e7f","url":"https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/400","pullRequest":"https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/400","attestationId":"att-0001"}' \
  --input expectedStage=release --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

`released` is the one exit that is yours (`rework` is manual), so advance:

```sh
swamp model @swamp/gatorwalk-factory/work-item method run advance <key> \
  --input transition=released \
  --input expectedStage=release --input expectedCycle=1 --input expectedEra=<era> \
  --log
swamp model @swamp/gatorwalk-factory/work-item method run status <key> --log
```

```text
took 'released' to stage 'done' cycle 1 (finished)
build-swamp-extension-add-list-method-r2ne: terminal at stage 'done' cycle 1
```
