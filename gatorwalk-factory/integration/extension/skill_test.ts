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

import { assert, assertEquals, assertThrows } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import {
  BUILD_DEFINITION,
  EXTENSION_ROOT,
  splitWords,
  withRepo,
} from "../harness.ts";
import {
  checkCommand,
  commandsIn,
  runExample,
  SKILL_DIR,
  skillCommands,
} from "./skill_commands.ts";

// ---------------------------------------------------------------------------
// The skill is the contract a driving agent follows, so its commands must
// work as written. Every command in the skill is checked against the method
// it names; the worked example is run, in order, on the real engine.
// ---------------------------------------------------------------------------

const EXAMPLE = "references/examples/build-swamp-extension.md";

Deno.test("skill: commands split as a shell would, and shell syntax is refused", () => {
  assertEquals(
    splitWords(
      `swamp a --input payload='{"x":"a b"}' --input note="it's \\"so\\"" <key>`,
    ),
    [
      "swamp",
      "a",
      "--input",
      'payload={"x":"a b"}',
      "--input",
      `note=it's "so"`,
      "<key>",
    ],
  );
  for (
    const bad of ["swamp a | b", "swamp $(x)", "swamp a > f", 'swamp "$HOME"']
  ) {
    assertThrows(() => splitWords(bad), Error, "needs a shell");
  }
});

Deno.test("skill: marked failures, continuations and indented fences are read from sh blocks only", () => {
  const md = [
    "```text",
    "swamp not a command",
    "```",
    "```sh",
    "# fails: because",
    "swamp model method run team validate \\",
    "  --log",
    "swamp model method run team new_key --log",
    "```",
    "- a list item:",
    "  ```sh",
    "  ```text",
    "  swamp model method run team validate --log",
    "  ```",
  ].join("\n");
  const found = commandsIn("x.md", md);
  assertEquals(found.map((c) => [c.line, c.words.length, c.fails]), [
    [6, 7, "because"],
    [8, 7, undefined],
    [13, 7, undefined],
  ]);
});

Deno.test("skill: every command names a real method with inputs it accepts", async () => {
  const commands = await skillCommands();
  assert(commands.length > 40, `only ${commands.length} commands found`);
  const problems = commands.flatMap((c) => {
    const problem = checkCommand(c.words);
    return problem === null ? [] : [`${c.file}:${c.line}: ${problem}`];
  });
  assertEquals(problems, []);
});

Deno.test("skill: the checker refuses an unknown method or input", () => {
  const item = [
    "swamp",
    "model",
    "@swamp/gatorwalk-factory/work-item",
    "method",
    "run",
  ];
  assert(
    checkCommand([...item, "approv", "<key>", "--log"])?.includes(
      "no work-item method",
    ),
  );
  assert(
    checkCommand([...item, "status", "<key>", "--input", "stage=x", "--log"])
      ?.includes("no input 'stage'"),
  );
  assert(
    checkCommand([
      ...item,
      "advance",
      "<key>",
      "--input",
      "transition=submit",
      "--log",
    ])?.includes("inputs do not fit"),
    "a write without its expectation is refused",
  );
  assert(
    checkCommand([
      "swamp",
      "model",
      "method",
      "run",
      "<tracker>",
      "assign",
      "--input",
      "issue=1",
      "--log",
    ])?.includes("every tracker has"),
    "a method only one tracker has is not a <tracker> method",
  );
  assert(
    checkCommand(["swamp", "model", "edit", "team"])?.includes(
      "not a command form",
    ),
  );
});

Deno.test("skill: the worked example runs as written, from start to done", async () => {
  const commands = commandsIn(
    EXAMPLE,
    await Deno.readTextFile(`${SKILL_DIR}/${EXAMPLE}`),
  );
  const definition = parseYaml(await Deno.readTextFile(BUILD_DEFINITION));
  await withRepo(async (repo) => {
    const steps = await runExample(repo, commands, {
      extensionRoot: EXTENSION_ROOT,
      definition,
    });
    assertEquals(
      steps.filter((s) => s.code !== 0 && s.command.fails).length,
      1,
    );
    const last = steps.at(-1)!;
    assert(last.output.includes("terminal at stage 'done'"), last.output);
    const key = last.ran[5];
    const run = await repo.run(key);
    assertEquals(run.status, "terminal");
    assertEquals(
      run.approvals.map((a) => [a.gateId, a.decision]),
      [
        ["plan-approval", "decline"],
        ["plan-approval", "approve"],
        ["quality-waiver", "approve"],
        ["release-approval", "approve"],
      ],
    );
    assertEquals(run.dispatches.length, 8);
    assertEquals(run.dispatches.filter((d) => d.usage !== undefined).length, 3);
  });
});
