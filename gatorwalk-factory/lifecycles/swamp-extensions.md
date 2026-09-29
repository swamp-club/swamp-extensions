# swamp-extensions as a gatorwalk lifecycle: the mapping

This is the paper check that swamp-club #2630 asked for before
`swamp-extensions.yaml` was written. It takes the process this repository runs
today, `@swamp/issue-lifecycle` plus
`agent-constraints/verification-conventions.md`, and maps every phase, gate and
human stop onto the lifecycle format. Anything the format could not express is
listed under [Format gaps](#format-gaps) at the end. Each gap is a finding about
the format; none was worked around silently.

`swamp-extensions.yaml` describes the process. It does not replace
issue-lifecycle: this repository keeps issue-lifecycle for now. gatorwalk has a
swamp-club adapter (`@swamp/gatorwalk-factory/swamp-club`), but this lifecycle
does not use it yet; wiring it in, so gatorwalk can stand in for issue-lifecycle
completely, is a follow-up.

## The process, stage by stage

```
triage ─┬─ bug ─────────→ reproduce ─┐
        └─ feature/platform/security ┴→ plan → plan-review → implement
  → conformance-review → verify → attest → pull-request → merge → release
  → notify → summary → done
```

Loops back: reproduce to triage (reclassify); plan-review to plan (rework,
revise); conformance-review, verify, attest and merge to implement; merge to
pull-request (a new PR); implement straight to verify (recheck). `abandon` is
open from every stage.

### Phases

| issue-lifecycle                                      | gatorwalk                                                                                                          | Fit                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `created`, `start` (fetch the issue, assign it)      | Starting the work item. The issue number goes in `externalRefs`.                                                   | Partial: fetching and assigning need swamp-club (gap 1)    |
| `triaging` → `triage` → `classified`                 | `triage` stage, `classification` evidence                                                                          | Fits                                                       |
| Bug reproduction (triage step 4)                     | `reproduce` stage, `reproduction` evidence, entered only for a bug                                                 | Fits                                                       |
| `classified` → `plan` → `plan_generated`             | `plan` stage, `plan` artifact                                                                                      | Fits                                                       |
| `adversarial_review`, `resolve_findings`, `iterate`  | `plan-review` stage, `plan-review` findings artifact reviewing `plan`; rework or revise go back to `plan`          | Fits; see "Resolving findings"                             |
| `approve` → `approved`                               | `plan-review.approve`, with `human-approval` `plan-approval`                                                       | Fits                                                       |
| `implement` → `implementing`                         | `implement` stage, `change-summary` artifact (full commit SHA and branch)                                          | Fits                                                       |
| `code_conformance_review`, `justify_deviations`      | `conformance-review` stage, `conformance` artifact reviewing `change-summary`; justifying is recording it again    | Fits                                                       |
| `verify` → `verifying`                               | `verify` stage, workflow mode: a wrapper runs verify-build and verify-reviews concurrently (gap 2)                 | Partial: the workflows' location (gap 3)                   |
| `verification_passed`, `verification_failed`         | `verification` evidence, `status: succeeded` or `failed` with each child's; failed goes back to `implement`        | Fits                                                       |
| `post_attestation`                                   | `attest` stage, `attestation` evidence carrying the id                                                             | Partial: the id is recorded, not posted or checked (gap 1) |
| `link_pr` → `pr_open`                                | `pull-request` stage, `pull-request` evidence                                                                      | Fits                                                       |
| `pr_merged` → `releasing`, `pr_failed` → `pr_failed` | `merge` stage, `merge` evidence `merged` or `failed`; failed has two manual exits, a new PR or back to `implement` | Fits                                                       |
| `ship`, `complete` → `notify`                        | `release` stage, `release` evidence `shipped` or `completed`                                                       | Partial: `complete` from other phases (gap 6)              |
| `notify`, `skip_notify` → `summarizing`              | `notify` stage, `notification` evidence `posted` or `skipped`; a person posts the ripple                           | Partial: posting needs swamp-club (gap 1)                  |
| `summarize` → `done`                                 | `summary` stage, `summary` artifact, then `done`                                                                   | Fits                                                       |
| `start` from any phase (a restart)                   | `reset`                                                                                                            | Partial (gap 7)                                            |
| (none)                                               | `abandoned`, through the global `abandon` behind `human-approval` `abandon-confirmation`                           | Added: an issue abandoned today is simply left             |

### Gates (issue-lifecycle's pre-flight checks)

| Check                      | Where it applies         | gatorwalk                                                                                                                                                                  |
| -------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `valid-transition`         | every method             | The stage graph: a transition exists only from its stage                                                                                                                   |
| `plan-exists`              | `approve`                | `plan.submit` needs `artifact-exists` `plan`                                                                                                                               |
| `adversarial-review-clear` | `approve`                | `artifact-fresh` `plan-review` (recorded this cycle, so it reviews the current plan) plus `findings-clear` on critical and high                                            |
| `plan-approved`            | `implement`              | `human-approval` `plan-approval` on the only way into `implement` from planning                                                                                            |
| `code-conformance-clear`   | `link_pr`, `complete`    | `conformance-review.conforms`: a fresh review, and a `cel` gate that every step not `implemented` has a justification. Checked before verification, as the skill orders it |
| `verification-clear`       | `link_pr`, `complete`    | `verify.passed`: `evidence-recorded` `status: succeeded`, and `cel` gates binding it to the `change-summary` commit and requiring both children to have succeeded          |
| `attestation-clear`        | `link_pr`                | `attest.attested`: `evidence-recorded` `attestation`, bound by `cel` to the commit and to both child verify runs                                                           |
| `pr-cooldown` (3 minutes)  | `pr_merged`, `pr_failed` | `cooldown` of 180 seconds after the `pull-request` evidence, on every `merge` exit                                                                                         |

Every exit past `implement` is bound to the commit named in `change-summary`,
the commit that was reviewed. `implement.submit` refuses a commit that
verification already ran on, so a loop back always brings a new commit;
`implement.recheck` (manual, and only for the commit verification already ran
on) re-runs verification on the same commit, for a failure that was not the
code's.

### Human stops

| Stop                                                                           | gatorwalk                                                                                                                                                                                  |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Low confidence: ask the person before classifying                              | `classification` needs `clarifyingQuestions` when `confidence` is `low`, and every triage exit needs confidence not low, so triage waits until the person answers and it is recorded again |
| Present the regression evidence and verdict before classifying                 | `triage.bug` needs `human-approval` `regression-review`, with `when` so it applies only when `isRegression` is true, whatever the verdict                                                  |
| A bug that cannot be reproduced: ask how to proceed                            | `reproduce.not-reproduced` needs `human-approval` `proceed-unreproduced`                                                                                                                   |
| Plan approval                                                                  | `human-approval` `plan-approval`                                                                                                                                                           |
| Plan feedback (iterate)                                                        | `plan-review.revise`, manual                                                                                                                                                               |
| Checklist: a person sees the green checklist and confirms before posting       | `verify.passed` needs `human-approval` `checklist-confirmed`                                                                                                                               |
| Never open a PR without asking                                                 | `attest.attested` needs `human-approval` `open-pr`                                                                                                                                         |
| PR failed: open a new PR or rework                                             | `merge.new-pr` and `merge.rework`, both manual                                                                                                                                             |
| Contributor lookup failed: ask, then re-run, force or skip                     | `notify` is interactive; a person decides and the evidence records `posted` or `skipped` with the reason                                                                                   |
| (gatorwalk's own) declined approval must not leave abandon as the only way out | Manual `reclassify` from reproduce; manual `revise` after plan-review, the checklist and the open-pr decision; manual `rework` after conformance-review                                    |

### Cycle limits

issue-lifecycle has no limit on how often a plan is revised or a change is
verified. gatorwalk always has one (5 entries per stage by default), after which
a person grants a cycle override to go round again. Here `plan` and `implement`
set `maxCycles: 3` (three plans, and three commits through verification), and
`triage` and `pull-request` set 2 (one reclassification, one replacement pull
request), before a person is asked. The lower limits are not a process choice;
see gap 8.

### Resolving findings

issue-lifecycle marks findings resolved on the review (`resolve_findings`), then
reviews the new plan version. Here a blocking finding sends the plan back
(`rework`); the next `plan-review` cycle records a fresh findings artifact
against the new plan. A finding can carry `resolved` and `resolutionNote`, as
issue-lifecycle's do. Nothing is lost, so this is not a gap.

## Format gaps

Candidates for issues. A resolved gap says so and keeps its number.

1. **No way to act on swamp-club.** Fetching the issue, assigning it,
   classifying it (the type PATCH), moving its status, posting lifecycle
   entries, posting the attestation and thanking the contributor all happen
   outside the lifecycle. The attestation id is recorded, but nothing checks
   that it was posted or that it matches. The swamp-club adapter now exists
   (`@swamp/gatorwalk-factory/swamp-club`: fetch, ripple, status, assign and
   posting an attestation), but this lifecycle does not call it yet; listed so
   the mapping is complete.
2. **No parallel stages (resolved inside one stage).** verify-build and
   verify-reviews run at the same time today and are judged together as one
   checklist. A lifecycle is in one stage at a time, so the first version ran
   them as two stages one after the other, and a reviews failure showed only
   after the build passed. The `verify` stage now runs
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
   `when: ... isRegression`, so a person sees the regression analysis and
   verdict before a regression claim goes on, and any other bug goes ahead
   without them. Kept here so the numbering the other gaps are cited by stays.
5. **`requireField` only matches equal values.** "Type is not bug" cannot be
   written, so triage has one exit per non-bug type (all to `plan`), and
   "confidence is not low" is a `cel` gate. The graph analysis only proves exits
   exclusive through `requireField`, so a `cel`-only condition would warn as
   ambiguous.
6. **The `complete` shortcut.** issue-lifecycle's `complete` goes straight to
   `notify` from `implementing`, `pr_open` or `releasing`. Only the `releasing`
   case is kept (`release` evidence `completed`). A shortcut from several stages
   to one would be a global transition, and a global transition cannot require
   stage-specific evidence.
7. **Restarting is not the same.** issue-lifecycle's `start` puts any phase back
   to triaging and keeps what was recorded. gatorwalk's `reset` starts a new
   era, in which nothing recorded before is visible. Going back to triage with
   the plan and reviews still in view has no equivalent.
8. **The graph analysis cannot finish a long loop at the default limit.** The
   loop from `implement` through verification, the pull request and the merge
   has six stages and three inner loops (`recheck`, `new-pr`, and
   `attest.revise`), and `reclassify` loops back to the start. With the default
   limit of 5 the count pass passes its 100,000-state cap and stops, so
   transitions that need a cycle override go unchecked. The limits under "Cycle
   limits" bring it to about 11,100 states. A lifecycle's limits should be
   chosen for the process, not for the analyser.
