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
import { EXAMPLES, loadOk } from "./test_support.ts";

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

const lineOf = (text: string, n: number) => text.split("\n")[n];

Deno.test("model: every example passes the schema, as validate would", async () => {
  for (const name of EXAMPLES) {
    const loaded = await loadOk(name);
    assert(loaded.view.stages.length > 0, name);
  }
});

Deno.test("model: a document path finds its line", async () => {
  const loaded = await loadDefinition("factories/tiny.yaml", TEXT);
  assert(loaded.ok);
  const exit = loaded.rangeOf("stages.0.transitions.0")!;
  assertEquals(lineOf(TEXT, exit.line), "      - name: go");
  const gate = loaded.rangeOf("stages.0.transitions.0.gates.0.config.id")!;
  assertEquals(TEXT.slice(gate.from, gate.to), "ok");
  const stage = loaded.rangeOf("stages.1")!;
  assertEquals(lineOf(TEXT, stage.line), "  - id: b");
  assertEquals(
    TEXT.slice(stage.from, stage.end).trim(),
    "id: b\n    terminal: true",
  );
});

Deno.test("model: a path that is not there falls back to its nearest parent", async () => {
  const loaded = await loadDefinition("factories/tiny.yaml", TEXT);
  const range = loaded.rangeOf("stages.1.work.context.inject.3")!;
  assertEquals(lineOf(TEXT, range.line), "  - id: b");
  assertEquals(loaded.rangeOf("(root)")!.line, 0);
});

Deno.test("model: schema errors keep their paths and positions", async () => {
  const text = TEXT.replace("        to: b\n", "");
  const loaded = await loadDefinition("factories/tiny.yaml", text);
  assert(!loaded.ok);
  const problem = loaded.problems.find((p) =>
    p.path === "stages.0.transitions.0.to"
  );
  assert(problem !== undefined, JSON.stringify(loaded.problems));
  assertEquals(lineOf(text, problem.range!.line), "      - name: go");
});

Deno.test("model: YAML that does not parse is one problem, with its position", async () => {
  const text = "schemaVersion: 1\nname: [tiny\n";
  const loaded = await loadDefinition("factories/tiny.yaml", text);
  assert(!loaded.ok);
  assertEquals(loaded.problems.length, 1);
  assert(loaded.problems[0].message.startsWith("not valid YAML"));
  assert(loaded.problems[0].range !== null);
});

Deno.test("model: an empty file is a problem", async () => {
  const loaded = await loadDefinition("factories/tiny.yaml", "");
  assert(!loaded.ok);
  assertEquals(loaded.problems[0].message, "the file is empty");
});

Deno.test("model: findings carry their source positions", async () => {
  const text = TEXT.replace(
    "  - id: b\n",
    "  - id: c\n    terminal: true\n  - id: b\n",
  );
  const loaded = await loadDefinition("factories/tiny.yaml", text);
  assert(loaded.ok);
  const unreachable = loaded.findings.find((f) =>
    f.code === "unreachable-stage"
  );
  assert(unreachable !== undefined, JSON.stringify(loaded.findings));
  assertEquals(lineOf(text, unreachable.range!.line), "  - id: c");
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
