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
  type EjectOptions,
  ejectPlugin,
  type EjectResult,
  rewriteCel,
} from "./eject.ts";
import {
  type Lifecycle,
  parseLifecycle,
  parsePlugin,
  type Plugin,
  type StageSpec,
} from "./lifecycle_schema.ts";
import { instantiatePlugin } from "./plugin_instance.ts";

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

function plugin(yaml: string): Plugin {
  const result = parsePlugin(
    parseYaml(`schemaVersion: 1\nname: helper\n${yaml}`),
  );
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

async function target(): Promise<Lifecycle> {
  return asLifecycle(await raw("lifecycles/eject-target.yaml"));
}

async function reviewPlan(params?: Record<string, unknown>): Promise<Plugin> {
  const result = instantiatePlugin(
    await raw("plugins/review-plan.yaml"),
    params,
  );
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.plugin;
}

function ok(result: EjectResult): { lifecycle: Lifecycle; warnings: string[] } {
  if (!result.ok) {
    throw new Error(`eject failed:\n${result.errors.join("\n")}`);
  }
  return result;
}

function errorsOf(result: EjectResult): string[] {
  assert(!result.ok, "eject succeeded");
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

Deno.test("eject: the plugin's stages replace the placeholder, wired by its transitions", async () => {
  const { lifecycle: out, warnings } = ok(
    ejectPlugin(await target(), await reviewPlan(), { replace: "review" }),
  );
  assertEquals(out.stages.map((s) => s.id), [
    "plan",
    "review",
    "implement",
    "done",
  ]);
  const review = stage(out, "review");
  assertEquals(edges(review), ["approve->implement", "rework->plan"]);
  assert(review.transitions?.every((t) => t.exit === undefined));
  assertEquals(review.initial, undefined);
  assertEquals(review.work?.skills, ["adversarial-review"]);
  assertEquals(review.transitions?.[0].gates?.[1], {
    type: "findings-clear",
    config: { artifact: "plan-review", blocking: ["critical", "high"] },
  });
  assertEquals(edges(stage(out, "plan")), ["submit->review"]);
  assertEquals(warnings, []);
});

Deno.test("eject: parameters reach the copied stages", async () => {
  const { lifecycle: out } = ok(
    ejectPlugin(await target(), await reviewPlan({ blocking: ["critical"] }), {
      replace: "review",
    }),
  );
  const gate = stage(out, "review").transitions?.[0].gates?.[1];
  assertEquals(
    gate?.type === "findings-clear" && gate.config.blocking,
    ["critical"],
  );
});

Deno.test("eject: exits overrides the placeholder's wiring", async () => {
  const { lifecycle: out } = ok(
    ejectPlugin(await target(), await reviewPlan(), {
      replace: "review",
      exits: { rework: "implement" },
    }),
  );
  assertEquals(edges(stage(out, "review")), [
    "approve->implement",
    "rework->implement",
  ]);
});

Deno.test("eject: an exit back to the placeholder re-enters the plugin", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
  const stages = base.stages as { transitions: { to: string }[] }[];
  stages[1].transitions[1].to = "review";
  const { lifecycle: out } = ok(
    ejectPlugin(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      names: { stages: { review: "plan-review" } },
    }),
  );
  assertEquals(edges(stage(out, "plan-review")), [
    "approve->implement",
    "rework->plan-review",
  ]);
  assertEquals(edges(stage(out, "plan")), ["submit->plan-review"]);
});

Deno.test("eject: an initial placeholder makes the plugin's entry initial", () => {
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
  const helper = plugin(`
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
    ejectPlugin(base, helper, { replace: "review" }),
  );
  assertEquals(stage(out, "look").initial, true);
});

Deno.test("eject: global transitions into the placeholder enter the plugin", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
  base.globalTransitions = [{
    name: "second-look",
    to: "review",
    manual: true,
  }];
  const { lifecycle: out } = ok(
    ejectPlugin(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      names: { stages: { review: "critique" } },
    }),
  );
  assertEquals(out.globalTransitions?.[0].to, "critique");
});

// --- what eject refuses -----------------------------------------------------------

Deno.test("eject: the placeholder must exist and be bare", async () => {
  assertMentions(
    errorsOf(
      ejectPlugin(await target(), await reviewPlan(), { replace: "nope" }),
    ),
    "replace: lifecycle 'plan-then-build' has no stage 'nope'",
  );
  assertMentions(
    errorsOf(
      ejectPlugin(await target(), await reviewPlan(), { replace: "plan" }),
    ),
    "replace: stage 'plan' is not a bare placeholder (it declares maxCycles, work, artifacts)",
    "replace: transition 'submit' of placeholder stage 'plan' matches no exit of plugin 'review-plan' (approved, rework)",
    "replace: transition 'submit' of placeholder stage 'plan' has gates or manual",
  );
});

Deno.test("eject: every exit must be wired to a stage of the lifecycle", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
  (base.stages as { transitions: unknown[] }[])[1].transitions.pop();
  assertMentions(
    errorsOf(
      ejectPlugin(asLifecycle(base), await reviewPlan(), {
        replace: "review",
        exits: { approved: "nowhere" },
      }),
    ),
    "exit 'rework' of plugin 'review-plan' is not wired: add exits.rework, or a transition named 'rework' on placeholder stage 'review'",
    "exit 'approved' of plugin 'review-plan' goes to 'nowhere', which is not a stage of lifecycle 'plan-then-build'",
  );
});

Deno.test("eject: options may only name what the plugin has, with valid names", async () => {
  assertMentions(
    errorsOf(
      ejectPlugin(await target(), await reviewPlan(), {
        replace: "review",
        exits: { escalate: "done" },
        inputs: { spec: "plan" },
        names: {
          stages: { critique: "x", review: "Bad Name" },
          artifacts: { plan: "p" },
          evidence: { ci: "c" },
        },
      }),
    ),
    "exits.escalate: 'escalate' is not an exit of plugin 'review-plan' (approved, rework)",
    "inputs.spec: 'spec' is not a contract input of plugin 'review-plan' (plan)",
    "names.stages.critique: 'critique' is not a stage of plugin 'review-plan' (review)",
    "names.stages.review: 'Bad Name' is not a valid name",
    "names.artifacts.plan: 'plan' is not an artifact plugin 'review-plan' declares (plan-review)",
    "names.evidence.ci: 'ci' is not evidence plugin 'review-plan' declares (none)",
  );
});

Deno.test("eject: a max-cycles gate on the placeholder is refused", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
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
      ejectPlugin(asLifecycle(base), await reviewPlan(), { replace: "review" }),
    ),
    "stage 'implement' of lifecycle 'plan-then-build', transition 'again': a max-cycles gate names placeholder stage 'review'",
  );
});

Deno.test("eject: a plugin transition may not share a global transition's name", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
  base.globalTransitions = [{ name: "approve", to: "plan", manual: true }];
  assertMentions(
    errorsOf(
      ejectPlugin(asLifecycle(base), await reviewPlan(), { replace: "review" }),
    ),
    "transition 'approve' of stage 'review' of plugin 'review-plan' has the same name as a global transition of lifecycle 'plan-then-build'",
  );
});

// --- contract inputs ----------------------------------------------------------------

Deno.test("eject: a contract input maps to the lifecycle's product, by name or inputs", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
  const plan = (base.stages as {
    artifacts: { name: string }[];
    transitions: { gates: { config: { artifact: string } }[] }[];
  }[])[0];
  plan.artifacts[0].name = "design";
  plan.transitions[0].gates[0].config.artifact = "design";
  assertMentions(
    errorsOf(
      ejectPlugin(asLifecycle(base), await reviewPlan(), { replace: "review" }),
    ),
    "input artifact 'plan' of plugin 'review-plan' is 'plan' in lifecycle 'plan-then-build', which no stage of it declares; map it with inputs.plan",
  );
  const { lifecycle: out } = ok(
    ejectPlugin(asLifecycle(base), await reviewPlan(), {
      replace: "review",
      inputs: { plan: "design" },
    }),
  );
  const review = stage(out, "review");
  assertEquals(review.work?.context?.inject, ["design"]);
  assertEquals(review.artifacts?.[0].reviews, "design");
});

Deno.test("eject: a contract input missing on a path into the plugin is an error", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
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
      ejectPlugin(asLifecycle(base), await reviewPlan(), { replace: "review" }),
    ),
    "input artifact 'plan' of plugin 'review-plan' is not produced on every path into stage 'review': intake -> review",
  );
});

Deno.test("eject: an input only a CEL binding reads is checked too", () => {
  const helper = plugin(`
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
    errorsOf(ejectPlugin(base, helper, { replace: "sum" })),
    "input evidence 'ci' of plugin 'helper' is not produced on every path into stage 'summarise': start -> summarise",
  );
});

// --- names chosen at the use site ---------------------------------------------------

Deno.test("eject: renames follow every reference, CEL included", () => {
  const helper = plugin(`
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
    ejectPlugin(base, helper, {
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
    "stage 'step' of plugin 'helper', binding 'here': the CEL string \"step\" matches a stage of plugin 'helper' that is now 'draft'",
  );
});

Deno.test("eject: the same plugin twice, kept apart by the names given at the use site", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
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
      { name: "approved", to: "implement" },
      { name: "rework", to: "design" },
    ],
  });
  const once = ok(
    ejectPlugin(asLifecycle(base), await reviewPlan(), { replace: "review" }),
  ).lifecycle;
  assertMentions(
    errorsOf(
      ejectPlugin(once, await reviewPlan(), {
        replace: "check-design",
        inputs: { plan: "design" },
      }),
    ),
    "stage 'review' of plugin 'review-plan' clashes with stage 'review' of lifecycle 'plan-then-build'; name it with names.stages.review",
    "artifact 'plan-review' of plugin 'review-plan' clashes with artifact 'plan-review' of lifecycle 'plan-then-build'; name it with names.artifacts.plan-review",
  );
  const { lifecycle: twice } = ok(
    ejectPlugin(once, await reviewPlan(), {
      replace: "check-design",
      inputs: { plan: "design" },
      names: {
        stages: { review: "design-review" },
        artifacts: { "plan-review": "design-findings" },
      },
    }),
  );
  assertEquals(twice.stages.map((s) => s.id), [
    "plan",
    "review",
    "design",
    "design-review",
    "implement",
    "done",
  ]);
  const first = stage(twice, "review");
  const second = stage(twice, "design-review");
  assertEquals(first.artifacts?.map((a) => [a.name, a.reviews]), [
    ["plan-review", "plan"],
  ]);
  assertEquals(second.artifacts?.map((a) => [a.name, a.reviews]), [
    ["design-findings", "design"],
  ]);
  assertEquals(edges(second), ["approve->implement", "rework->design"]);
  // The approval gate keeps its id in both: approvals are counted per stage.
  const approvalIds = [first, second].map((s) =>
    s.transitions?.[0].gates?.find((g) => g.type === "human-approval")
  );
  assertEquals(approvalIds.map((g) => g?.config), [
    { id: "plan-approval" },
    { id: "plan-approval" },
  ]);
});

Deno.test("eject: two plugin stages renamed alike are refused", () => {
  const helper = plugin(`
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
      ejectPlugin(base, helper, {
        replace: "slot",
        names: { stages: { a: "same", b: "same" } },
      }),
    ),
    "stages 'a' and 'b' of plugin 'helper' are both named 'same'",
  );
});

Deno.test("eject: a CEL string naming a renamed product, or the placeholder in a global transition, is warned about", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
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
  const doc = await raw("plugins/review-plan.yaml");
  const review = (doc.stages as { work: Record<string, unknown> }[])[0];
  review.work.bindings = {
    open: 'artifacts.exists(k, k == "plan-review")',
    failed: 'validations["artifacts"]["plan-review"]',
  };
  const instance = instantiatePlugin(doc);
  if (!instance.ok) throw new Error(instance.errors.join("\n"));
  const { lifecycle: out, warnings } = ok(
    ejectPlugin(asLifecycle(base), instance.plugin, {
      replace: "review",
      names: { artifacts: { "plan-review": "critique" } },
    }),
  );
  assertEquals(stage(out, "review").work?.bindings, {
    open: 'artifacts.exists(k, k == "plan-review")',
    failed: 'validations["artifacts"]["critique"]',
  });
  assertMentions(
    warnings,
    "stage 'review' of plugin 'review-plan', binding 'open': the CEL string \"plan-review\" matches a product of plugin 'review-plan' that is now artifact 'critique'",
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

Deno.test("eject: a product may not take a name the lifecycle uses for the other kind", async () => {
  assertMentions(
    errorsOf(
      ejectPlugin(await target(), await reviewPlan(), {
        replace: "review",
        names: { artifacts: { "plan-review": "change" } },
      }),
    ),
    "artifact 'plan-review' of plugin 'review-plan' (named 'change') clashes with evidence 'change' of lifecycle 'plan-then-build'; name it with names.artifacts.plan-review",
  );
});

Deno.test("eject: names that are also JavaScript object properties are ordinary names", () => {
  const helper = plugin(`
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
    ejectPlugin(base, helper, {
      replace: "slot",
      exits: {},
      inputs: {},
      names: { stages: {}, artifacts: {}, evidence: {} },
    }),
  );
  assertEquals(edges(stage(out, "constructor")), ["go->end"]);
});

// --- the composed lifecycle is checked -----------------------------------------------

Deno.test("eject: graph errors on the result name the stage and where it came from", async () => {
  const errors = errorsOf(
    ejectPlugin(
      await target(),
      await reviewPlan(),
      {
        replace: "review",
        exits: { approved: "plan" },
      } satisfies EjectOptions,
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

Deno.test("eject: a plugin stage's projection hint is carried into the lifecycle", async () => {
  const doc = await raw("plugins/review-plan.yaml");
  (doc.stages as Record<string, unknown>[])[0].projection = {
    status: "triaged",
  };
  const instantiated = instantiatePlugin(doc, undefined);
  if (!instantiated.ok) throw new Error(instantiated.errors.join("\n"));
  const { lifecycle: out } = ok(
    ejectPlugin(await target(), instantiated.plugin, { replace: "review" }),
  );
  assertEquals(stage(out, "review").projection, { status: "triaged" });
});

Deno.test("eject: a placeholder may not declare a projection hint; the plugin's stages carry their own", async () => {
  const base = await raw("lifecycles/eject-target.yaml");
  (base.stages as Record<string, unknown>[])[1].projection = {
    status: "triaged",
  };
  assertMentions(
    errorsOf(
      ejectPlugin(asLifecycle(base), await reviewPlan(), { replace: "review" }),
    ),
    "replace: stage 'review' is not a bare placeholder (it declares projection)",
  );
});
