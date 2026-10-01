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
import { loadDefinition } from "./model.ts";
import {
  findFinding,
  findingTarget,
  follow,
  pathOf,
  type Target,
  targetAt,
} from "./selection.ts";

const BASE = `schemaVersion: 1
name: tiny
stages:
  - id: plan
    initial: true
    transitions:
      - name: submit
        to: review
        gates:
          - { type: artifact-exists, config: { artifact: plan } }
          - { type: human-approval, config: { id: plan-ok } }
    artifacts:
      - { name: plan, schema: { type: object } }
  - id: review
    transitions:
      - { name: accept, to: done }
  - id: done
    terminal: true
globalTransitions:
  - { name: abandon, to: done }
`;

async function load(text: string) {
  const loaded = await loadDefinition("factories/tiny.yaml", text);
  assert(loaded.ok, JSON.stringify(!loaded.ok && loaded.problems));
  return loaded;
}

const approval: Target = {
  kind: "gate",
  stage: "plan",
  exit: "submit",
  gate: { type: "human-approval", key: "plan-ok", nth: 0 },
};

Deno.test("selection: targets resolve to their paths", async () => {
  const { definition } = await load(BASE);
  assertEquals(
    pathOf(definition, { kind: "stage", stage: "review" }),
    "stages.1",
  );
  assertEquals(
    pathOf(definition, { kind: "exit", stage: "plan", exit: "submit" }),
    "stages.0.transitions.0",
  );
  assertEquals(pathOf(definition, approval), "stages.0.transitions.0.gates.1");
  assertEquals(
    pathOf(definition, { kind: "exit", stage: null, exit: "abandon" }),
    "globalTransitions.0",
  );
  assertEquals(pathOf(definition, { kind: "any" }), "globalTransitions");
});

Deno.test("selection: a path names the target it is in", async () => {
  const { definition } = await load(BASE);
  assertEquals(
    targetAt(definition, "stages.0.transitions.0.gates.1.config.id"),
    approval,
  );
  assertEquals(targetAt(definition, "stages.1.work"), {
    kind: "stage",
    stage: "review",
  });
  assertEquals(targetAt(definition, "globalTransitions.0"), {
    kind: "exit",
    stage: null,
    exit: "abandon",
  });
  assertEquals(targetAt(definition, "name"), null);
});

Deno.test("selection: a stage inserted above keeps the selection on what it was", async () => {
  const before = await load(BASE);
  const exit: Target = { kind: "exit", stage: "review", exit: "accept" };
  assertEquals(pathOf(before.definition, exit), "stages.1.transitions.0");
  const after = await load(BASE.replace(
    "  - id: review\n",
    "  - id: triage\n    transitions: [{ name: go, to: plan }]\n  - id: review\n",
  ));
  const kept = follow(after.definition, after.view.findings, exit);
  assertEquals(kept, exit);
  assertEquals(pathOf(after.definition, kept!), "stages.2.transitions.0");
});

Deno.test("selection: an exit or gate inserted above keeps the selection on what it was", async () => {
  const after = await load(
    BASE.replace(
      "      - name: submit\n",
      "      - { name: skip, to: done, manual: true }\n      - name: submit\n",
    ).replace(
      "          - { type: artifact-exists",
      "          - { type: human-approval, config: { id: other } }\n          - { type: artifact-exists",
    ),
  );
  assertEquals(
    follow(after.definition, after.view.findings, approval),
    approval,
  );
  assertEquals(
    pathOf(after.definition, approval),
    "stages.0.transitions.1.gates.2",
  );
});

Deno.test("selection: a target that is gone falls back to its stage, else to nothing", async () => {
  const after = await load(
    BASE.replace(
      "          - { type: human-approval, config: { id: plan-ok } }\n",
      "",
    ),
  );
  assertEquals(
    follow(after.definition, after.view.findings, approval),
    { kind: "exit", stage: "plan", exit: "submit" },
  );
  const renamed = await load(BASE.replaceAll("review", "check"));
  assertEquals(
    follow(renamed.definition, renamed.view.findings, {
      kind: "exit",
      stage: "review",
      exit: "accept",
    }),
    null,
  );
  const noGlobals = await load(
    BASE.slice(0, BASE.indexOf("globalTransitions")),
  );
  assertEquals(
    follow(noGlobals.definition, noGlobals.view.findings, {
      kind: "exit",
      stage: null,
      exit: "abandon",
    }),
    null,
  );
});

Deno.test("selection: a finding is followed by code, stage and message", async () => {
  const text = BASE.replace(
    "  - id: done\n",
    "  - id: lost\n    terminal: true\n  - id: done\n",
  );
  const first = await load(text);
  const f = first.view.findings.find((x) => x.code === "unreachable-stage")!;
  const target = findingTarget(f);
  const shifted = await load(text.replace(
    "  - id: review\n",
    "  - id: extra\n    transitions: [{ name: go, to: plan }]\n  - id: review\n",
  ));
  const kept = follow(shifted.definition, shifted.view.findings, target);
  assert(kept !== null && kept.kind === "finding");
  assertEquals([kept.code, kept.stage, kept.message], [
    f.code,
    f.stage ?? null,
    f.message,
  ]);
  // The followed finding carries its new path, so the inspector and the
  // source show where it is now.
  // (The inserted stage is unreachable too, so match the message.)
  const now = shifted.view.findings.find((x) =>
    x.code === "unreachable-stage" && x.message === f.message
  )!;
  assert(now.path !== f.path);
  assertEquals(kept.path, now.path);
  assertEquals(follow(shifted.definition, [], target), null);
});

Deno.test("selection: of two findings worded alike, the path picks the one selected", () => {
  const f = (path: string) => ({
    code: "product-missing-on-path" as const,
    stage: "implement",
    message: "the same words",
    path,
    severity: "error" as const,
  });
  const findings = [
    f("stages.4.work.context.inject.0"),
    f("stages.4.work.context.inject.1"),
  ];
  const target = findingTarget(findings[1]);
  assertEquals(
    findFinding(findings, target as Extract<Target, { kind: "finding" }>),
    findings[1],
  );
});
