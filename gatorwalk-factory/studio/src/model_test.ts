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
import { loadDefinition, pathSegments } from "./model.ts";
import {
  EXAMPLES,
  exampleText,
  loadOk,
  MODEL_LINES,
  modelFile,
} from "./test_support.ts";

const TEXT = `schemaVersion: 1
name: tiny
stages:
  - id: a
    initial: true
    transitions:
      - name: go
        to: b
        gates:
          - type: human-approval
            config: { id: ok }
  - id: b
    terminal: true
`;

const FILE = "models/@swamp/gatorwalk-factory/factory/tiny.yaml";
const lineOf = (text: string, n: number) => text.split("\n")[n];
/** A line of the definition as the model file holds it, four spaces in. */
const held = (line: string) => `    ${line}`;

Deno.test("model: every example passes the schema, as validate would", async () => {
  for (const name of EXAMPLES) {
    const loaded = await loadOk(name);
    assert(loaded.view.stages.length > 0, name);
  }
});

Deno.test("model: a definition path finds its line in the model file", async () => {
  const text = modelFile(TEXT);
  const loaded = await loadDefinition(FILE, text);
  assert(loaded.ok);
  const exit = loaded.rangeOf("stages.0.transitions.0")!;
  assertEquals(lineOf(text, exit.line), held("      - name: go"));
  const gate = loaded.rangeOf("stages.0.transitions.0.gates.0.config.id")!;
  assertEquals(text.slice(gate.from, gate.to), "ok");
  const stage = loaded.rangeOf("stages.1")!;
  assertEquals(lineOf(text, stage.line), held("  - id: b"));
  assertEquals(
    text.slice(stage.from, stage.end).trim(),
    "id: b\n        terminal: true",
  );
});

Deno.test("model: a path that is not there falls back to its nearest parent", async () => {
  const text = modelFile(TEXT);
  const loaded = await loadDefinition(FILE, text);
  const range = loaded.rangeOf("stages.1.work.context.inject.3")!;
  assertEquals(lineOf(text, range.line), held("  - id: b"));
  // The definition's root is its first line in the file.
  assertEquals(loaded.rangeOf("(root)")!.line, MODEL_LINES);
});

Deno.test("model: schema errors keep their paths and positions", async () => {
  const text = modelFile(TEXT.replace("        to: b\n", ""));
  const loaded = await loadDefinition(FILE, text);
  assert(!loaded.ok);
  const problem = loaded.problems.find((p) =>
    p.path === "stages.0.transitions.0.to"
  );
  assert(problem !== undefined, JSON.stringify(loaded.problems));
  assertEquals(lineOf(text, problem.range!.line), held("      - name: go"));
});

Deno.test("model: YAML that does not parse is one problem, with its position", async () => {
  const text = "schemaVersion: 1\nname: [tiny\n";
  const loaded = await loadDefinition(FILE, text);
  assert(!loaded.ok);
  assertEquals(loaded.problems.length, 1);
  assert(loaded.problems[0].message.startsWith("not valid YAML"));
  assert(loaded.problems[0].range !== null);
});

Deno.test("model: an empty file is a problem", async () => {
  const loaded = await loadDefinition(FILE, "");
  assert(!loaded.ok);
  assertEquals(loaded.problems[0].message, "the file is empty");
});

Deno.test("model: a factory with no definition yet is a problem", async () => {
  const loaded = await loadDefinition(
    FILE,
    "name: tiny\nglobalArguments:\n  tracker: board\n",
  );
  assert(!loaded.ok);
  assertEquals(loaded.problems.map((p) => p.message), [
    "no definition yet: write one under globalArguments.definition",
  ]);
  assertEquals(loaded.scenarios, []);
});

Deno.test("model: saved scenarios are read from the same file, each with its own text", async () => {
  const loaded = await loadOk("starter", await exampleText("starter"));
  assertEquals(loaded.scenarios.map((s) => [s.name, s.path]), [
    ["plan-feedback", "globalArguments.scenarios.0"],
    ["plan-to-done", "globalArguments.scenarios.1"],
  ]);
  const [first] = loaded.scenarios;
  assert(first.text.startsWith("    - scenario: plan-feedback\n"), first.text);
  assert(!first.text.includes("scenario: plan-to-done"));
  // A broken definition still lists its scenarios.
  const broken = await loadDefinition(
    FILE,
    modelFile("name: x\n") +
      "  scenarios:\n    - scenario: one\n      steps: [{ move: a }]\n",
  );
  assert(!broken.ok);
  assertEquals(broken.scenarios.map((s) => s.name), ["one"]);
});

Deno.test("model: findings carry their source positions", async () => {
  const text = modelFile(TEXT.replace(
    "  - id: b\n",
    "  - id: c\n    terminal: true\n  - id: b\n",
  ));
  const loaded = await loadDefinition(FILE, text);
  assert(loaded.ok);
  const unreachable = loaded.findings.find((f) =>
    f.code === "unreachable-stage"
  );
  assert(unreachable !== undefined, JSON.stringify(loaded.findings));
  assertEquals(lineOf(text, unreachable.range!.line), held("  - id: c"));
});

Deno.test("model: path segments", () => {
  assertEquals(pathSegments("stages.2.transitions.0"), [
    "stages",
    2,
    "transitions",
    0,
  ]);
  assertEquals(pathSegments("(root)"), []);
});
