// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "@std/assert";
import { evaluate } from "npm:@marcbachmann/cel-js@7.6.1";
import { parse as parseYaml } from "@std/yaml";
import {
  type ApplyOptions,
  type ApplyResult,
  applyStageTemplate,
  rewriteCel,
} from "./apply.ts";
import {
  type GateSpec,
  type Lifecycle,
  parseLifecycle,
  parseStageTemplate,
  type StageSpec,
  type StageTemplate,
} from "./lifecycle_schema.ts";
import { instantiateStageTemplate } from "./stage_template.ts";

const TESTDATA = new URL("../../../testdata/", import.meta.url);

async function raw(path: string): Promise<Record<string, unknown>> {
  return parseYaml(
    await Deno.readTextFile(new URL(path, TESTDATA)),
  ) as Record<string, unknown>;
}

function asLifecycle(doc: unknown): Lifecycle {
  const result = parseLifecycle(doc);
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

function lifecycle(yaml: string): Lifecycle {
  return asLifecycle(parseYaml(`schemaVersion: 1\nname: test\n${yaml}`));
}

function template(yaml: string): StageTemplate {
  const result = parseStageTemplate(
    parseYaml(`schemaVersion: 1\nname: helper\n${yaml}`),
  );
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

async function target(): Promise<Lifecycle> {
  return asLifecycle(await raw("lifecycles/apply-target.yaml"));
}

async function reviewPlan(
  params?: Record<string, unknown>,
): Promise<StageTemplate> {
  const result = instantiateStageTemplate(
    await raw("../templates/review-plan.yaml"),
    params,
  );
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.template;
}

function ok(result: ApplyResult): { lifecycle: Lifecycle; warnings: string[] } {
  if (!result.ok) {
    throw new Error(`apply failed:\n${result.errors.join("\n")}`);
  }
  return result;
}

function errorsOf(result: ApplyResult): string[] {
  assert(!result.ok, "apply succeeded");
  return result.ok ? [] : result.errors;
}

function assertMentions(errors: string[], ...needles: string[]) {
  for (const needle of needles) {
    assert(
      errors.some((e) => e.includes(needle)),
      `expected an error mentioning ${JSON.stringify(needle)} in:\n${
        errors.join("\n")
      }`,
    );
  }
}

function stage(doc: Lifecycle, id: string): StageSpec {
  const found = doc.stages.find((s) => s.id === id);
  if (found === undefined) throw new Error(`no stage '${id}'`);
  return found;
}

function edges(s: StageSpec): string[] {
  return (s.transitions ?? []).map((t) => `${t.name}->${t.to}`);
}

// --- replacing the placeholder --------------------------------------------------

Deno.test("apply: the stage template's stages replace the placeholder, wired by its transitions", async () => {
  const { lifecycle: out, warnings } = ok(
    applyStageTemplate(await target(), await reviewPlan(), {
      replace: "review",
    }),
  );
  assertEquals(out.stages.map((s) => s.id), [
    "plan",
    "plan-review",
    "implement",
    "done",
  ]);
  const review = stage(out, "plan-review");
  assertEquals(edges(review), [
    "approve->implement",
    "rework->plan",
    "revise->plan",
  ]);
  assert(review.transitions?.every((t) => t.exit === undefined));
  assertEquals(review.initial, undefined);
  assertEquals(review.work?.skills, ["adversarial-review"]);
  assertEquals(review.transitions?.[0].gates?.[1], {
    type: "findings-clear",
    config: { artifact: "plan-review", blocking: ["critical", "high"] },
  });
  assertEquals(edges(stage(out, "plan")), ["submit->plan-review"]);
  assertEquals(warnings, []);
});

Deno.test("apply: parameters reach the copied stages", async () => {
  const { lifecycle: out } = ok(
    applyStageTemplate(
      await target(),
      await reviewPlan({ blocking: ["critical"] }),
      {
        replace: "review",
      },
    ),
  );
  const [approve, rework] = stage(out, "plan-review").transitions ?? [];
  const clear = approve.gates?.[1];
  const open = rework.gates?.[1];
  assertEquals(
    clear?.type === "findings-clear" && clear.config.blocking,
    ["critical"],
  );
  assertEquals(
    open?.type === "findings-open" && open.config.blocking,
    ["critical"],
  );
});

Deno.test("apply: exits overrides the placeholder's wiring", async () => {
  const { lifecycle: out } = ok(
    applyStageTemplate(await target(), await reviewPlan(), {
      replace: "review",
      exits: { rework: "implement" },
    }),
  );
  assertEquals(edges(stage(out, "plan-review")), [
    "approve->implement",
    "rework->implement",
    "revise->implement",
  ]);
});

Deno.test("apply: an exit back to the placeholder re-enters the stage template", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  const stages = base.stages as { transitions: { to: string }[] }[];
  stages[1].transitions[1].to = "review";
  const { lifecycle: out } = ok(
    applyStageTemplate(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      names: { stages: { "plan-review": "critique" } },
    }),
  );
  assertEquals(edges(stage(out, "critique")), [
    "approve->implement",
    "rework->critique",
    "revise->critique",
  ]);
  assertEquals(edges(stage(out, "plan")), ["submit->critique"]);
});

Deno.test("apply: an initial placeholder makes the stage template's entry initial", () => {
  const base = lifecycle(`
stages:
  - id: review
    initial: true
    transitions:
      - { name: approved, to: done }
      - { name: rework, to: done }
  - id: done
    terminal: true
`);
  const helper = template(`
contract:
  exits: [{ name: approved }, { name: rework }]
stages:
  - id: look
    initial: true
    transitions:
      - { name: yes, exit: approved, manual: true }
      - { name: no, exit: rework, manual: true }
`);
  const { lifecycle: out } = ok(
    applyStageTemplate(base, helper, { replace: "review" }),
  );
  assertEquals(stage(out, "look").initial, true);
});

Deno.test("apply: global transitions into the placeholder enter the stage template", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  base.globalTransitions = [{
    name: "second-look",
    to: "review",
    manual: true,
  }];
  const { lifecycle: out } = ok(
    applyStageTemplate(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      names: { stages: { "plan-review": "critique" } },
    }),
  );
  assertEquals(out.globalTransitions?.[0].to, "critique");
});

Deno.test("apply: a placeholder transition's gates follow the stage template's own on each non-manual transition through that exit", async () => {
  const { lifecycle: out } = ok(
    applyStageTemplate(await target(), await reviewPlan(), {
      replace: "review",
    }),
  );
  const gates = (name: string) =>
    stage(out, "plan-review").transitions?.find((t) => t.name === name)
      ?.gates?.map((g) => g.type);
  assertEquals(gates("approve"), [
    "artifact-fresh",
    "findings-clear",
    "human-approval",
  ]);
  assertEquals(gates("rework"), ["artifact-fresh", "findings-open"]);
  // revise is manual, and leaves through rework, whose placeholder transition
  // has no gates anyway; see below for a gated exit with a manual transition.
  assertEquals(gates("revise"), undefined);

  const helper = template(`
contract:
  exits: [{ name: out }]
  outputs: [{ kind: artifact, name: note }]
stages:
  - id: write
    initial: true
    artifacts: [{ name: note, schema: { type: object } }]
    transitions:
      - name: quick
        exit: out
        gates: [{ type: artifact-exists, config: { artifact: note } }]
      - { name: slow, exit: out }
      - { name: skip, exit: out, manual: true }
`);
  const base = lifecycle(`
stages:
  - id: start
    initial: true
    artifacts: [{ name: ticket, schema: { type: object } }]
    transitions: [{ name: go, to: slot }]
  - id: slot
    transitions:
      - name: out
        to: end
        gates:
          - type: cel
            config: { expr: 'has(artifacts.ticket)' }
          - type: human-approval
            config: { id: sign-off }
  - id: end
    terminal: true
`);
  const { lifecycle: composed } = ok(
    applyStageTemplate(base, helper, {
      replace: "slot",
      names: { artifacts: { note: "ticket-note" } },
    }),
  );
  const write = stage(composed, "write");
  const added: GateSpec[] = [
    { type: "cel", config: { expr: "has(artifacts.ticket)" } },
    { type: "human-approval", config: { id: "sign-off" } },
  ];
  assertEquals(write.transitions?.map((t) => [t.name, t.gates]), [
    ["quick", [
      { type: "artifact-exists", config: { artifact: "ticket-note" } },
      ...added,
    ]],
    ["slow", added],
    ["skip", undefined],
  ]);
});

Deno.test("apply: a placeholder's gates follow the exit by name, even when exits sends it elsewhere", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  const placeholder = (base.stages as { transitions: object[] }[])[1];
  placeholder.transitions[1] = {
    name: "rework",
    to: "plan",
    gates: [{ type: "human-approval", config: { id: "redo" } }],
  };
  const { lifecycle: out } = ok(
    applyStageTemplate(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      exits: { rework: "implement" },
    }),
  );
  const rework = stage(out, "plan-review").transitions?.[1];
  assertEquals(rework?.to, "implement");
  assertEquals(rework?.gates?.at(-1), {
    type: "human-approval",
    config: { id: "redo" },
  });
});

Deno.test("apply: placeholder gates that would go nowhere, or repeat the stage template's approval, are refused", () => {
  const helper = template(`
contract:
  exits: [{ name: out }, { name: back }]
stages:
  - id: look
    initial: true
    transitions:
      - name: ok
        exit: out
        gates: [{ type: human-approval, config: { id: sign-off } }]
      - { name: undo, exit: back, manual: true }
`);
  const base = lifecycle(`
stages:
  - id: start
    initial: true
    transitions: [{ name: go, to: slot }]
  - id: slot
    transitions:
      - name: out
        to: end
        gates: [{ type: human-approval, config: { id: sign-off } }]
      - name: back
        to: start
        gates: [{ type: human-approval, config: { id: go-back } }]
  - id: end
    terminal: true
`);
  assertMentions(
    errorsOf(applyStageTemplate(base, helper, { replace: "slot" })),
    "replace: transition 'back' of placeholder stage 'slot' has gates, but every transition of stage template 'helper' through exit 'back' is manual, so they would go nowhere",
    "replace: transition 'out' of placeholder stage 'slot' adds approval 'sign-off', which transition 'ok' of stage 'look' of stage template 'helper' already has",
  );
});

Deno.test("apply: a findings-open gate's artifact is renamed like findings-clear's", async () => {
  const { lifecycle: out } = ok(
    applyStageTemplate(await target(), await reviewPlan(), {
      replace: "review",
      names: { artifacts: { "plan-review": "critique" } },
    }),
  );
  const rework = stage(out, "plan-review").transitions?.find((t) =>
    t.name === "rework"
  );
  assertEquals(rework?.gates?.[1], {
    type: "findings-open",
    config: { artifact: "critique", blocking: ["critical", "high"] },
  });
});

// --- what apply refuses ------------------------------------------------------

Deno.test("apply: the placeholder must exist and be bare", async () => {
  assertMentions(
    errorsOf(
      applyStageTemplate(await target(), await reviewPlan(), {
        replace: "nope",
      }),
    ),
    "replace: lifecycle 'plan-then-build' has no stage 'nope'",
  );
  assertMentions(
    errorsOf(
      applyStageTemplate(await target(), await reviewPlan(), {
        replace: "plan",
      }),
    ),
    "replace: stage 'plan' is not a bare placeholder (it declares maxCycles, work, artifacts)",
    "replace: transition 'submit' of placeholder stage 'plan' matches no exit of stage template 'review-plan' (approved, rework)",
  );
  const base = await raw("lifecycles/apply-target.yaml");
  const placeholder = (base.stages as { transitions: object[] }[])[1];
  placeholder.transitions[1] = { name: "rework", to: "plan", manual: true };
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "replace: transition 'rework' of placeholder stage 'review' has manual",
  );
});

Deno.test("apply: every exit must be wired to a stage of the lifecycle", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  (base.stages as { transitions: unknown[] }[])[1].transitions.pop();
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
        exits: { approved: "nowhere" },
      }),
    ),
    "exit 'rework' of stage template 'review-plan' is not wired: add exits.rework, or a transition named 'rework' on placeholder stage 'review'",
    "exit 'approved' of stage template 'review-plan' goes to 'nowhere', which is not a stage of lifecycle 'plan-then-build'",
  );
});

Deno.test("apply: options may only name what the stage template has, with valid names", async () => {
  assertMentions(
    errorsOf(
      applyStageTemplate(await target(), await reviewPlan(), {
        replace: "review",
        exits: { escalate: "done" },
        inputs: { spec: "plan" },
        names: {
          stages: { critique: "x", "plan-review": "Bad Name" },
          artifacts: { plan: "p" },
          evidence: { ci: "c" },
        },
      }),
    ),
    "exits.escalate: 'escalate' is not an exit of stage template 'review-plan' (approved, rework)",
    "inputs.spec: 'spec' is not a contract input of stage template 'review-plan' (plan)",
    "names.stages.critique: 'critique' is not a stage of stage template 'review-plan' (plan-review)",
    "names.stages.plan-review: 'Bad Name' is not a valid name",
    "names.artifacts.plan: 'plan' is not an artifact stage template 'review-plan' declares (plan-review)",
    "names.evidence.ci: 'ci' is not evidence stage template 'review-plan' declares (none)",
  );
});

Deno.test("apply: a max-cycles gate on the placeholder is refused", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  const implement = (base.stages as { transitions: unknown[] }[])[2];
  implement.transitions.push({
    name: "again",
    to: "plan",
    gates: [{
      type: "max-cycles",
      config: { stage: "review", limit: 2 },
    }],
  });
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "stage 'implement' of lifecycle 'plan-then-build', transition 'again': a max-cycles gate names placeholder stage 'review'",
  );
  // Nor on the placeholder's own transitions, whose gates apply carries over.
  const gated = await raw("lifecycles/apply-target.yaml");
  const placeholder = (gated.stages as { transitions: object[] }[])[1];
  placeholder.transitions[1] = {
    name: "rework",
    to: "plan",
    gates: [{ type: "max-cycles", config: { stage: "review", limit: 2 } }],
  };
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(gated), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "placeholder stage 'review', transition 'rework': a max-cycles gate names placeholder stage 'review'",
  );
});

Deno.test("apply: a stage template transition may not share a global transition's name", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  base.globalTransitions = [{ name: "approve", to: "plan", manual: true }];
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "transition 'approve' of stage 'plan-review' of stage template 'review-plan' has the same name as a global transition of lifecycle 'plan-then-build'",
  );
});

// --- contract inputs ----------------------------------------------------------------

Deno.test("apply: a contract input maps to the lifecycle's product, by name or inputs", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  const plan = (base.stages as {
    artifacts: { name: string }[];
    transitions: { gates: { config: { artifact: string } }[] }[];
  }[])[0];
  plan.artifacts[0].name = "design";
  plan.transitions[0].gates[0].config.artifact = "design";
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "input artifact 'plan' of stage template 'review-plan' is 'plan' in lifecycle 'plan-then-build', which no stage of it declares; map it with inputs.plan",
  );
  const { lifecycle: out } = ok(
    applyStageTemplate(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      inputs: { plan: "design" },
    }),
  );
  const review = stage(out, "plan-review");
  assertEquals(review.work?.context?.inject, ["design"]);
  assertEquals(review.artifacts?.[0].reviews, "design");
});

Deno.test("apply: a contract input missing on a path into the stage template is an error", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  const stages = base.stages as Record<string, unknown>[];
  delete stages[0].initial;
  stages.unshift({
    id: "intake",
    initial: true,
    transitions: [
      { name: "plan-it", to: "plan", manual: true },
      { name: "straight-to-review", to: "review", manual: true },
    ],
  });
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "input artifact 'plan' of stage template 'review-plan' is not produced on every path into stage 'plan-review': intake -> plan-review",
  );
});

Deno.test("apply: an input only a CEL binding reads is checked too", () => {
  const helper = template(`
contract:
  inputs: [{ kind: evidence, name: ci }]
  exits: [{ name: done }]
stages:
  - id: summarise
    initial: true
    work:
      mode: interactive
      systemPrompt: "CI said {{status}}."
      bindings: { status: evidence.ci.payload.status }
    transitions: [{ name: finish, exit: done }]
`);
  const base = lifecycle(`
stages:
  - id: start
    initial: true
    transitions:
      - { name: test, to: test, manual: true }
      - { name: skip, to: sum, manual: true }
  - id: test
    evidence: [{ name: ci, schema: { type: object } }]
    transitions: [{ name: next, to: sum }]
  - id: sum
    transitions: [{ name: done, to: end }]
  - id: end
    terminal: true
`);
  assertMentions(
    errorsOf(applyStageTemplate(base, helper, { replace: "sum" })),
    "input evidence 'ci' of stage template 'helper' is not produced on every path into stage 'summarise': start -> summarise",
  );
});

// --- names chosen at the use site ---------------------------------------------------

Deno.test("apply: renames follow every reference, CEL included", () => {
  const helper = template(`
contract:
  exits: [{ name: done }]
stages:
  - id: step
    initial: true
    work:
      mode: workflow
      workflow: { name: run-notes }
      resultEvidence: outcome
      bindings:
        text: artifacts.notes.payload.text
        old: 'artifacts["notes"].version'
        failed: validations.artifacts.notes
        here: stage.id == "step"
    artifacts:
      - name: notes
        schema: { type: object }
      - name: notes-review
        kind: findings
        reviews: notes
    transitions:
      - name: again
        to: step
        gates:
          - { type: max-cycles, config: { stage: step, limit: 2 } }
      - name: finish
        exit: done
        gates:
          - { type: artifact-fresh, config: { artifact: notes-review } }
          - { type: findings-clear, config: { artifact: notes-review, blocking: [high] } }
          - { type: evidence-recorded, config: { name: outcome, match: { status: { not: { const: failed } } }, message: not yet } }
          - { type: cooldown, config: { afterArtifact: notes, seconds: 5 } }
          - { type: cel, config: { expr: "has(artifacts.notes) && evidence.outcome.version > 0" } }
          - { type: human-approval, config: { id: sign-off } }
          - { type: human-approval, config: { id: risky, when: 'has(artifacts.notes)' } }
`);
  const base = lifecycle(`
stages:
  - id: start
    initial: true
    transitions: [{ name: go, to: slot }]
  - id: slot
    transitions: [{ name: done, to: end }]
  - id: end
    terminal: true
`);
  const { lifecycle: out, warnings } = ok(
    applyStageTemplate(base, helper, {
      replace: "slot",
      names: {
        stages: { step: "draft" },
        artifacts: { notes: "draft_notes", "notes-review": "draft-review" },
        evidence: { outcome: "draft-outcome" },
      },
    }),
  );
  const draft = stage(out, "draft");
  assertEquals(draft.work?.resultEvidence, "draft-outcome");
  assertEquals(draft.work?.bindings, {
    text: "artifacts.draft_notes.payload.text",
    old: 'artifacts["draft_notes"].version',
    failed: "validations.artifacts.draft_notes",
    here: 'stage.id == "step"',
  });
  assertEquals(draft.artifacts?.map((a) => [a.name, a.reviews]), [
    ["draft_notes", undefined],
    ["draft-review", "draft_notes"],
  ]);
  assertEquals(draft.transitions?.[0], {
    name: "again",
    to: "draft",
    gates: [{ type: "max-cycles", config: { stage: "draft", limit: 2 } }],
  });
  assertEquals(draft.transitions?.[1].to, "end");
  assertEquals(draft.transitions?.[1].gates, [
    { type: "artifact-fresh", config: { artifact: "draft-review" } },
    {
      type: "findings-clear",
      config: { artifact: "draft-review", blocking: ["high"] },
    },
    {
      type: "evidence-recorded",
      config: {
        name: "draft-outcome",
        match: { status: { not: { const: "failed" } } },
        message: "not yet",
      },
    },
    { type: "cooldown", config: { afterArtifact: "draft_notes", seconds: 5 } },
    {
      type: "cel",
      config: {
        expr:
          'has(artifacts.draft_notes) && evidence["draft-outcome"].version > 0',
      },
    },
    { type: "human-approval", config: { id: "sign-off" } },
    {
      type: "human-approval",
      config: { id: "risky", when: "has(artifacts.draft_notes)" },
    },
  ]);
  assertMentions(
    warnings,
    "stage 'step' of stage template 'helper', binding 'here': the CEL string \"step\" matches a stage of stage template 'helper' that is now 'draft'",
  );
});

Deno.test("apply: the same stage template twice, kept apart by the names given at the use site", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  const stages = base.stages as Record<string, unknown>[];
  // plan -> review -> design -> check-design -> implement
  (stages[1].transitions as { name: string; to: string }[])[0].to = "design";
  stages.splice(2, 0, {
    id: "design",
    work: { mode: "interactive", systemPrompt: "Design it." },
    artifacts: [{
      name: "design",
      schema: { type: "object", required: ["summary"] },
    }],
    transitions: [{ name: "submit", to: "check-design" }],
  }, {
    id: "check-design",
    transitions: [
      {
        name: "approved",
        to: "implement",
        gates: [{ type: "human-approval", config: { id: "plan-approval" } }],
      },
      { name: "rework", to: "design" },
    ],
  });
  const once = ok(
    applyStageTemplate(asLifecycle(base), await reviewPlan(), {
      replace: "review",
    }),
  ).lifecycle;
  assertMentions(
    errorsOf(
      applyStageTemplate(once, await reviewPlan(), {
        replace: "check-design",
        inputs: { plan: "design" },
      }),
    ),
    "stage 'plan-review' of stage template 'review-plan' clashes with stage 'plan-review' of lifecycle 'plan-then-build'; name it with names.stages.plan-review",
    "artifact 'plan-review' of stage template 'review-plan' clashes with artifact 'plan-review' of lifecycle 'plan-then-build'; name it with names.artifacts.plan-review",
  );
  const { lifecycle: twice } = ok(
    applyStageTemplate(once, await reviewPlan(), {
      replace: "check-design",
      inputs: { plan: "design" },
      names: {
        stages: { "plan-review": "design-review" },
        artifacts: { "plan-review": "design-findings" },
      },
    }),
  );
  assertEquals(twice.stages.map((s) => s.id), [
    "plan",
    "plan-review",
    "design",
    "design-review",
    "implement",
    "done",
  ]);
  const first = stage(twice, "plan-review");
  const second = stage(twice, "design-review");
  assertEquals(first.artifacts?.map((a) => [a.name, a.reviews]), [
    ["plan-review", "plan"],
  ]);
  assertEquals(second.artifacts?.map((a) => [a.name, a.reviews]), [
    ["design-findings", "design"],
  ]);
  assertEquals(edges(second), [
    "approve->implement",
    "rework->design",
    "revise->design",
  ]);
  // Each placeholder's approval, added to its use of the stage template,
  // keeps its id: approvals are counted per stage.
  const approvalIds = [first, second].map((s) =>
    s.transitions?.[0].gates?.find((g) => g.type === "human-approval")
  );
  assertEquals(approvalIds.map((g) => g?.config), [
    { id: "plan-approval" },
    { id: "plan-approval" },
  ]);
});

Deno.test("apply: two stage-template stages renamed alike are refused", () => {
  const helper = template(`
contract:
  exits: [{ name: done }]
stages:
  - id: a
    initial: true
    transitions: [{ name: next, to: b }]
  - id: b
    transitions: [{ name: finish, exit: done }]
`);
  const base = lifecycle(`
stages:
  - id: slot
    initial: true
    transitions: [{ name: done, to: end }]
  - id: end
    terminal: true
`);
  assertMentions(
    errorsOf(
      applyStageTemplate(base, helper, {
        replace: "slot",
        names: { stages: { a: "same", b: "same" } },
      }),
    ),
    "stages 'a' and 'b' of stage template 'helper' are both named 'same'",
  );
});

Deno.test("apply: a CEL string naming a renamed product, or the placeholder in a global transition, is warned about", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  base.globalTransitions = [{
    name: "second-look",
    to: "plan",
    manual: true,
    gates: [
      { type: "cel", config: { expr: 'stage.id != "review"' } },
      {
        type: "human-approval",
        config: { id: "look-again", when: 'stage.id == "review"' },
      },
    ],
  }];
  const doc = await raw("../templates/review-plan.yaml");
  const review = (doc.stages as { work: Record<string, unknown> }[])[0];
  review.work.bindings = {
    ...review.work.bindings as Record<string, string>,
    open: 'artifacts.exists(k, k == "plan-review")',
    failed: 'validations["artifacts"]["plan-review"]',
  };
  const instance = instantiateStageTemplate(doc);
  if (!instance.ok) throw new Error(instance.errors.join("\n"));
  const { lifecycle: out, warnings } = ok(
    applyStageTemplate(asLifecycle(base), instance.template, {
      replace: "review",
      names: { artifacts: { "plan-review": "critique" } },
    }),
  );
  assertEquals(stage(out, "plan-review").work?.bindings, {
    planSummary: 'artifacts["plan"].payload.summary',
    open: 'artifacts.exists(k, k == "plan-review")',
    failed: 'validations["artifacts"]["critique"]',
  });
  assertMentions(
    warnings,
    "stage 'plan-review' of stage template 'review-plan', binding 'open': the CEL string \"plan-review\" matches a product of stage template 'review-plan' that is now artifact 'critique'",
    "global transition 'second-look' of lifecycle 'plan-then-build': the CEL string \"review\" matches the placeholder stage",
  );
  assert(
    !warnings.some((w) => w.includes("binding 'failed'")),
    warnings.join("\n"),
  );
  // Once for the cel gate, once for the approval's when.
  assertEquals(
    warnings.filter((w) =>
      w.startsWith("global transition 'second-look' of lifecycle")
    ).length,
    2,
    warnings.join("\n"),
  );
});

Deno.test("apply: a product may not take a name the lifecycle uses for the other kind", async () => {
  assertMentions(
    errorsOf(
      applyStageTemplate(await target(), await reviewPlan(), {
        replace: "review",
        names: { artifacts: { "plan-review": "change" } },
      }),
    ),
    "artifact 'plan-review' of stage template 'review-plan' (named 'change') clashes with evidence 'change' of lifecycle 'plan-then-build'; name it with names.artifacts.plan-review",
  );
});

Deno.test("apply: names that are also JavaScript object properties are ordinary names", () => {
  const helper = template(`
contract:
  exits: [{ name: constructor }]
stages:
  - id: constructor
    initial: true
    artifacts: [{ name: tostring, schema: { type: object } }]
    transitions: [{ name: go, exit: constructor }]
`);
  const base = lifecycle(`
stages:
  - id: slot
    initial: true
    transitions: [{ name: constructor, to: end }]
  - id: end
    terminal: true
`);
  const { lifecycle: out } = ok(
    applyStageTemplate(base, helper, {
      replace: "slot",
      exits: {},
      inputs: {},
      names: { stages: {}, artifacts: {}, evidence: {} },
    }),
  );
  assertEquals(edges(stage(out, "constructor")), ["go->end"]);
});

// --- the composed lifecycle is checked -----------------------------------------------

Deno.test("apply: graph errors on the result name the stage and where it came from", async () => {
  const errors = errorsOf(
    applyStageTemplate(
      await target(),
      await reviewPlan(),
      {
        replace: "review",
        exits: { approved: "plan" },
      } satisfies ApplyOptions,
    ),
  );
  assertMentions(
    errors,
    "stages.2 [stage 'implement', from lifecycle 'plan-then-build'] (from stage 'implement'): stage 'implement' can never be entered",
  );
});

// --- CEL rewriting ----------------------------------------------------------------

Deno.test("rewriteCel: renames by source range and leaves the rest as written", () => {
  const rename = (n: string) => n === "plan" ? "the-plan" : n;
  assertEquals(
    rewriteCel(
      'artifacts.plan.version  >=  2 && artifacts["plan"].payload != null ' +
        '&& validations["artifacts"].plan == null ' +
        "&& evidence.plan.version > 0 && validations.evidence.plan == null",
      rename,
      (n) => n === "plan" ? "ci_plan" : n,
    ).expr,
    'artifacts["the-plan"].version  >=  2 && artifacts["the-plan"].payload != null ' +
      '&& validations["artifacts"]["the-plan"] == null ' +
      "&& evidence.ci_plan.version > 0 && validations.evidence.ci_plan == null",
  );
});

Deno.test("rewriteCel: has() on a name that is not an identifier becomes an in test that runs", () => {
  const rename = (n: string) => n === "notes" ? "draft-notes" : n;
  const expr = rewriteCel(
    "has(artifacts.notes) && !has(validations.artifacts.notes) && has(evidence.notes)",
    rename,
    (n) => n === "notes" ? "draft_notes" : n,
  ).expr;
  assertEquals(
    expr,
    '("draft-notes" in artifacts) && !("draft-notes" in validations.artifacts) && has(evidence.draft_notes)',
  );
  assertEquals(
    evaluate(expr, {
      artifacts: { "draft-notes": {} },
      validations: { artifacts: {} },
      evidence: { draft_notes: {} },
    }),
    true,
  );
});

Deno.test("rewriteCel: other maps and dynamic keys are left alone; string literals are reported", () => {
  const result = rewriteCel(
    'item.artifacts.plan == 1 && artifacts[stage.id] != null && stage.id == "plan"',
    () => "x",
    () => "y",
  );
  assertEquals(
    result.expr,
    'item.artifacts.plan == 1 && artifacts[stage.id] != null && stage.id == "plan"',
  );
  assertEquals(result.literals, ["plan"]);
});

// --- projection hints -------------------------------------------------------------

Deno.test("apply: a projection hint on a stage template's stage is carried into the lifecycle", async () => {
  const doc = await raw("../templates/review-plan.yaml");
  (doc.stages as Record<string, unknown>[])[0].projection = {
    status: "in_progress",
  };
  const instantiated = instantiateStageTemplate(doc, undefined);
  if (!instantiated.ok) throw new Error(instantiated.errors.join("\n"));
  const { lifecycle: out } = ok(
    applyStageTemplate(await target(), instantiated.template, {
      replace: "review",
    }),
  );
  assertEquals(stage(out, "plan-review").projection, {
    status: "in_progress",
  });
});

Deno.test("apply: a placeholder may not declare a projection hint; the stage template's stages carry their own", async () => {
  const base = await raw("lifecycles/apply-target.yaml");
  (base.stages as Record<string, unknown>[])[1].projection = {
    status: "triaged",
  };
  assertMentions(
    errorsOf(
      applyStageTemplate(asLifecycle(base), await reviewPlan(), {
        replace: "review",
      }),
    ),
    "replace: stage 'review' is not a bare placeholder (it declares projection)",
  );
});
