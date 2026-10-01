# swamp-extensions as a gatorwalk factory definition: the mapping

This is the paper check that swamp-club #2630 asked for before
`swamp-club-swamp-extensions.yaml` (first named `swamp-extensions.yaml`) was
written. It takes the process this repository runs today,
`@swamp/issue-lifecycle` plus `agent-constraints/verification-conventions.md`,
and maps every phase, gate and human stop onto the factory definition format.
Anything the format could not express is listed under
[Format gaps](#format-gaps) at the end. Each gap is a finding about the format;
none was worked around silently.

A work item on `swamp-club-swamp-extensions.yaml` drives a Lab issue end to end
through the swamp-club adapter (`@swamp/gatorwalk-factory/swamp-club`), so the
issue reads the same as one issue-lifecycle drives: the same status moves, the
same lifecycle entries under the same step names, the type set at triage, the
attestation posted and the contributor thanked. issue-lifecycle stays and drives
every other issue; the adapter's `claim` refuses an issue that has an
issue-lifecycle instance (`issue-<N>`) in the repository, so one issue never has
two drivers. No stage loads the issue-lifecycle skill or cites a file that runs
its methods, and every stage an agent works tells it not to drive
issue-lifecycle; `factories_test.ts` pins both. See
[Lifecycle entries](#lifecycle-entries).

## The process, stage by stage

```
triage ─┬─ bug ─────────→ reproduce ─┐
        └─ feature/platform/security ┴→ plan → plan-review → implement
  → conformance-review → verify → attest → pull-request → merge → release
  → notify → summary → done
```

Loops back: reproduce to triage (reclassify); plan-review to plan (rework,
revise); conformance-review, verify, attest and merge to implement; merge to
pull-request (a new PR); implement straight to verify (recheck). Forward: attest
and merge straight to notify (`complete`, a person's choice). `abandon` is open
from every stage.

### Phases

| issue-lifecycle                                      | gatorwalk                                                                                                          | Fit                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `created`, `start` (fetch the issue, assign it)      | The adapter's `claim` fetches the issue; `publish` assigns it on start and records `assigned`.                     | Fits                                           |
| `triaging` → `triage` → `classified`                 | `triage` stage, `classification` evidence                                                                          | Fits                                           |
| Bug reproduction (triage step 4)                     | `reproduce` stage, `reproduction` evidence, entered only for a bug                                                 | Fits                                           |
| `classified` → `plan` → `plan_generated`             | `plan` stage, `plan` artifact                                                                                      | Fits                                           |
| `adversarial_review`, `resolve_findings`, `iterate`  | `plan-review` stage, `plan-review` findings artifact reviewing `plan`; rework or revise go back to `plan`          | Fits; see "Resolving findings"                 |
| `approve` → `approved`                               | `plan-review.approve`, with `human-approval` `plan-approval`                                                       | Fits                                           |
| `implement` → `implementing`                         | `implement` stage, `change-summary` artifact (full commit SHA and branch)                                          | Fits                                           |
| `code_conformance_review`, `justify_deviations`      | `conformance-review` stage, `conformance` artifact reviewing `change-summary`; justifying is recording it again    | Fits                                           |
| `verify` → `verifying`                               | `verify` stage, workflow mode: a wrapper runs verify-build and verify-reviews concurrently (gap 2)                 | Partial: the workflows' location (gap 3)       |
| `verification_passed`, `verification_failed`         | `verification` evidence, `status: succeeded` or `failed` with each child's; failed goes back to `implement`        | Fits                                           |
| `post_attestation`                                   | `attest` stage: posted through the adapter's `post_attestation`, `attestation` evidence carrying the id it returns | Fits; CI checks the attestation, as today      |
| `link_pr` → `pr_open`                                | `pull-request` stage, `pull-request` evidence                                                                      | Fits                                           |
| `pr_merged` → `releasing`, `pr_failed` → `pr_failed` | `merge` stage, `merge` evidence `merged` or `failed`; failed has two manual exits, a new PR or back to `implement` | Fits                                           |
| `ship`, `complete` → `notify`                        | `release` stage, `release` evidence `shipped` or `completed`; `complete` from other phases: see below              | Fits                                           |
| `complete` from `implementing` → `notify`            | `attest.complete`, manual: conformance and verification clear at the `change-summary` commit                       | Fits (gap 6); posts no `complete` entry        |
| `complete` from `pr_open` → `notify`                 | `merge.complete`, manual: the same gates, and no merge outcome recorded for the open pull request                  | Fits (gap 6); posts no `complete` entry        |
| `notify`, `skip_notify` → `summarizing`              | `notify` stage: the adapter's `thank_author`, `notification` evidence `posted` or `skipped`                        | Fits                                           |
| `summarize` → `done`                                 | `summary` stage, `summary` artifact, then `done`                                                                   | Fits                                           |
| `start` from any phase (a restart)                   | `reset`                                                                                                            | Partial (gap 7)                                |
| (none)                                               | `abandoned`, through the global `abandon` behind `human-approval` `abandon-confirmation`                           | Added: an issue abandoned today is simply left |

### Gates (issue-lifecycle's pre-flight checks)

| Check                      | Where it applies         | gatorwalk                                                                                                                                                                                                                                |
| -------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `valid-transition`         | every method             | The stage graph: a transition exists only from its stage                                                                                                                                                                                 |
| `plan-exists`              | `approve`                | `plan.submit` needs `artifact-exists` `plan`, and a `cel` gate that it was recorded in this cycle, so a revised plan is never the old one sent back                                                                                      |
| `adversarial-review-clear` | `approve`                | `artifact-fresh` `plan-review` (recorded this cycle, so it reviews the current plan) plus `findings-clear` on critical and high                                                                                                          |
| `plan-approved`            | `implement`              | `human-approval` `plan-approval` on the only way into `implement` from planning                                                                                                                                                          |
| `code-conformance-clear`   | `link_pr`, `complete`    | `conformance-review.conforms`: a fresh review, and a `cel` gate that every step not `implemented` has a justification. Checked before verification, as the skill orders it. `attest.complete` and `merge.complete` repeat the `cel` gate |
| `verification-clear`       | `link_pr`, `complete`    | `verify.passed`: `evidence-recorded` `status: succeeded`, and `cel` gates binding it to the `change-summary` commit and requiring both children to have succeeded. `attest.complete` and `merge.complete` repeat the `cel` gates         |
| `attestation-clear`        | `link_pr`                | `attest.attested`: `evidence-recorded` `attestation`, bound by `cel` to the commit and to both child verify runs                                                                                                                         |
| `pr-cooldown` (3 minutes)  | `pr_merged`, `pr_failed` | `cooldown` of 180 seconds after the `pull-request` evidence, on every `merge` exit but `complete`, as issue-lifecycle's `complete` has none                                                                                              |

Every exit past `implement` is bound to the commit named in `change-summary`,
the commit that was reviewed. `implement.submit` refuses a commit that
verification already ran on, so a loop back always brings a new commit;
`implement.recheck` (manual, and only for the commit verification already ran
on) re-runs verification on the same commit, for a failure that was not the
code's.

### Human stops

| Stop                                                                           | gatorwalk                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Low confidence: ask the person before classifying                              | `classification` needs `clarifyingQuestions` when `confidence` is `low`, and every triage exit has a `match` gate needing confidence `high` or `medium`, so triage waits until the person answers and it is recorded again                                                               |
| Present the regression evidence and verdict before classifying                 | `triage.bug` needs `human-approval` `regression-review`, with `when` so it applies only when a `regressionVerdict` is recorded, whatever the verdict                                                                                                                                     |
| A bug that cannot be reproduced: ask how to proceed                            | `reproduce.not-reproduced` needs `human-approval` `proceed-unreproduced`                                                                                                                                                                                                                 |
| Plan approval                                                                  | `human-approval` `plan-approval`                                                                                                                                                                                                                                                         |
| Plan feedback (iterate)                                                        | `plan-review.revise`, manual, needs `plan-feedback` evidence (the person's words, `recordedBy: person`) recorded in this pass; `plan` injects the last plan, its review and the feedback, and the revised plan keeps every round in `feedbackIncorporated`, which `plan_revised` carries |
| Checklist: a person sees the green checklist and confirms before posting       | `verify.passed` needs `human-approval` `checklist-confirmed`                                                                                                                                                                                                                             |
| Never open a PR without asking                                                 | `attest.attested` needs `human-approval` `open-pr`                                                                                                                                                                                                                                       |
| PR failed: open a new PR or rework                                             | `merge.new-pr` and `merge.rework`, both manual                                                                                                                                                                                                                                           |
| Contributor lookup failed: ask, then re-run, force or skip                     | `thank_author` fails closed and posts nothing; `notify` is interactive, so a person decides and the evidence records `posted` or `skipped` with the reason                                                                                                                               |
| (gatorwalk's own) declined approval must not leave abandon as the only way out | Manual `reclassify` from reproduce; manual `revise` after plan-review, the checklist and the open-pr decision; manual `rework` after conformance-review                                                                                                                                  |

### Cycle limits

issue-lifecycle has no limit on how often a plan is revised or a change is
verified. gatorwalk always has one (5 entries per stage by default), after which
a person grants a cycle override to go round again. Here `triage`, `plan`,
`implement` and `pull-request` set `maxCycles: 5`: five classifications, five
plans, five commits through verification and five pull requests before a person
is asked. That is the default, stated so that every loop has a limit someone
chose. The graph analysis finishes at these limits (gap 8).

### Resolving findings

issue-lifecycle marks findings resolved on the review (`resolve_findings`), then
reviews the new plan version. Here a blocking finding sends the plan back
(`rework`); the next `plan-review` cycle records a fresh findings artifact
against the new plan. That review is given the last one and the person's latest
feedback, and says for each earlier finding whether the new plan resolves it. A
finding can carry `resolved` and `resolutionNote`, as issue-lifecycle's do.
`conformance-review` is given the approving review too, so a deviation it asked
for is justified by its finding. Nothing is lost, so this is not a gap.

### Lifecycle entries

Each stage's `tracker.entries` says which journal events become which Lab
lifecycle entries, and `publish` writes them in place of comments. Every step
name is issue-lifecycle's, with its emoji and its `targetStatus` label (an entry
names its own `status` where the stage's differs, as `classified` and
`plan_approved` do). The `classified` entry sets the issue type first, as
issue-lifecycle's triage does. `classification` records `isRegression` as
issue-lifecycle's triage computes it, true only with a confirmed verdict, so the
Lab's regression flag is set or cleared by every classification, and
`classified` has two entries chosen by it, the regression one saying
"(regression)".

| Step                      | From                                         | Summary                                                                      |
| ------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| `triage_started`          | entering `triage`                            | Same                                                                         |
| `classified`              | `classification` recorded; sets the type     | Same                                                                         |
| `plan_generated`          | `plan` recorded, first cycle                 | Same                                                                         |
| `plan_revised`            | `plan` recorded, a later cycle               | Close: no version; the feedback rounds are the plan's `feedbackIncorporated` |
| `adversarial_review`      | `plan-review` recorded                       | Close: no counts                                                             |
| `plan_approved`           | `plan-approval` approved                     | Close: no version                                                            |
| `implementation_started`  | entering `implement`                         | Same                                                                         |
| `code_conformance_review` | `conformance` recorded                       | Close: no counts                                                             |
| `verification_started`    | entering `verify`                            | Close: no commit or branch                                                   |
| `verification_passed`     | `verification` recorded, `succeeded`         | Close: the commit, not the step count                                        |
| `verification_failed`     | `verification` recorded, `failed`            | Close: the commit, not the reason                                            |
| `attestation_posted`      | `attestation` recorded                       | Same                                                                         |
| `pr_linked`               | `pull-request` recorded                      | Close: no attempt number                                                     |
| `pr_merged`, `pr_failed`  | `merge` recorded, `merged` or `failed`       | Close: no attempt number                                                     |
| `shipped`, `complete`     | `release` recorded, `shipped` or `completed` | Same (no release url)                                                        |
| `contributor_notified`    | `notification` recorded, `posted`            | Same                                                                         |
| `notification_skipped`    | `notification` recorded, `skipped`           | Close: gives the reason                                                      |
| `session_summarized`      | `summary` recorded                           | Same                                                                         |
| `abandoned` (gatorwalk's) | entering `abandoned`                         | issue-lifecycle has none                                                     |

"Close" summaries leave out what issue-lifecycle computes (counts, versions,
attempt numbers): an entry's summary fills only fields of the recorded payload.
Payloads are gatorwalk's own products, not issue-lifecycle's shapes.
issue-lifecycle's `assigned` comes from `publish` on start, not from an entry.
It has no entry for entering `reproduce`, for waiting on a person, for a reset
or for a declined approval, and none of those posts one here.
`findings_resolved` and `deviations_justified` have no gatorwalk event: a
finding is resolved by recording the review again. `attest.complete` and
`merge.complete` post no `complete` entry: an entry comes from entering a stage
or recording a product, never from taking a transition, and neither exit records
anything. Entering `notify` still moves the issue to `shipped`, as
issue-lifecycle's `complete` does. The thank-you describes the work with the
`change-summary` summary, what was committed, not the plan's. It links a pull
request only when it is for the `change-summary` commit, so after
`attest.complete` it links none, even when an earlier round's pull request
failed; issue-lifecycle links whichever it has.

## Format gaps

Candidates for issues. A resolved gap says so and keeps its number.

1. **No way to act on swamp-club.** Resolved by swamp-club #2734. The adapter's
   `publish` moves the status, writes the lifecycle entries and sets the type
   from the classification; `attest` posts the attestation and `notify` thanks
   the contributor through the adapter; `claim` and `publish` start from the
   issue, `publish` assigning it. The attestation is still checked only in CI
   (`validate-attestation` reads it from the Lab by commit), as today. Kept here
   so the numbering the other gaps are cited by stays.
2. **No parallel stages (resolved inside one stage).** verify-build and
   verify-reviews run at the same time today and are judged together as one
   checklist. A factory definition is in one stage at a time, so the first
   version ran them as two stages one after the other, and a reviews failure
   showed only after the build passed. The `verify` stage now runs
   `verification/workflow-verify.yaml`, a wrapper whose two jobs each nest one
   verify workflow and run concurrently, and records both outcomes in one
   `verification` evidence. Parallel stages themselves remain deferred
   (swamp-club #2665); see DESIGN.md, "Parallel work inside one stage".
3. **A workflow call cannot say where its workflow lives.** A `workflow` block
   has a name and inputs. This repository's verify workflows, and the wrapper
   that nests them, run only with `SWAMP_WORKFLOWS_DIR` pointing at
   `verification/` (an absolute path from a worktree) and `--repo-dir` at the
   main checkout. The stage carries that in its `command` for the driver.
4. **No conditional human approval.** Resolved by swamp-club #2666: a
   `human-approval` gate's `when` makes it apply only while a CEL condition
   holds. `triage.bug` now carries `regression-review` with
   `when: ... has(...regressionVerdict)`, so a person sees the regression
   analysis and verdict before a regression claim goes on, confirmed or
   downgraded, and any other bug goes ahead without them. Kept here so the
   numbering the other gaps are cited by stays.
5. **`requireField` only matches equal values.** Resolved by swamp-club #2667:
   an `evidence-recorded` gate's `match` holds a JSON Schema fragment per field,
   and the graph analysis proves exits exclusive through its `const`, `enum` and
   `not` of those. Triage keeps one exit per type, as issue-lifecycle names
   them, and "confidence is not low" is a `match` gate carrying the old message.
   Kept here so the numbering the other gaps are cited by stays.
6. **The `complete` shortcut.** Resolved by swamp-club #2732, as decided on
   #2668: one manual exit per stage, with no new format construct.
   issue-lifecycle's `complete` goes straight to `notify` from `implementing`,
   `pr_open` or `releasing`. A global transition cannot require stage-specific
   evidence, so each case is its own exit, gated by `cel` on conformance and
   verification being clear at the `change-summary` commit. `implementing`
   covers what gatorwalk splits into `implement`, `conformance-review` and
   `verify`; the exit is `attest.complete`, the first stage where both are clear
   and the person has confirmed the checklist. `pr_open` is `merge`, entered
   when the `pull-request` evidence (issue-lifecycle's `link_pr`) is recorded;
   `merge.complete` also needs no merge outcome recorded yet, since a merged or
   failed pull request has left `pr_open`. `releasing` stays `release.released`
   with `completed`. The exits post no `complete` entry (see
   [Lifecycle entries](#lifecycle-entries)). Kept here so the numbering the
   other gaps are cited by stays.
7. **Restarting is not the same.** issue-lifecycle's `start` puts any phase back
   to triaging and keeps what was recorded. gatorwalk's `reset` starts a new
   era, in which nothing recorded before is visible. Going back to triage with
   the plan and reviews still in view has no equivalent.
8. **The graph analysis cannot finish a long loop at the default limit.**
   Resolved by swamp-club #2730. The loop from `implement` through verification,
   the pull request and the merge has six stages and three inner loops
   (`recheck`, `new-pr`, and `attest.revise`), and `reclassify` loops back to
   the start. At the default limit of 5 the count pass needed 506,220 states,
   past its 100,000-state cap, so the limits here had been lowered to 2 and 3,
   for 11,132 states. The count pass now drops a state when another at the same
   stage, with the same stages entered, has no more entries into any stage
   (DESIGN.md, "What the analysis assumes"). It finishes this factory definition
   at the default limits in 119 states, with the same findings (159 once gap 6
   added the `complete` exits). Kept here so the numbering the other gaps are
   cited by stays.
