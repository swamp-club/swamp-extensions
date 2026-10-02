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
import {
  addDecision,
  GENERATED,
  leftovers,
  reflow,
  renamePath,
  transform,
} from "./rename_to_stagecraft.ts";

const TS = "x.ts";
const MD = "x.md";

Deno.test("rename: the directory and the skill's directory move", () => {
  assertEquals(
    renamePath("gatorwalk-factory/extensions/models/engine/factory.ts"),
    "stagecraft/extensions/models/engine/factory.ts",
  );
  assertEquals(
    renamePath("gatorwalk-factory/.claude/skills/gatorwalk-factory/SKILL.md"),
    "stagecraft/.claude/skills/stagecraft/SKILL.md",
  );
  assertEquals(
    renamePath("gatorwalk-factory/.claude/skills/issue-lifecycle/SKILL.md"),
    "stagecraft/.claude/skills/issue-lifecycle/SKILL.md",
  );
});

Deno.test("rename: types, paths and the bare name, keeping case", () => {
  assertEquals(
    transform(
      TS,
      'export const FACTORY_TYPE = "@swamp/gatorwalk-factory/factory";',
    ),
    'export const FACTORY_TYPE = "@swamp/stagecraft/factory";',
  );
  assertEquals(
    transform(TS, '  name: "@swamp/gatorwalk-factory/work-item-summary",'),
    '  name: "@swamp/stagecraft/work-item-summary",',
  );
  assertEquals(
    transform(TS, '  labels: ["gatorwalk-factory"],'),
    '  labels: ["stagecraft"],',
  );
  assertEquals(
    transform(TS, "      `query GatorwalkIssue($id: String!) {"),
    "      `query StagecraftIssue($id: String!) {",
  );
  assertEquals(
    transform(TS, 'const PICK_KEY = "gatorwalk-studio.factory";'),
    'const PICK_KEY = "stagecraft-studio.factory";',
  );
  assertEquals(
    transform("x.tsx", '        <span class="a">GATORWALK</span>'),
    '        <span class="a">STAGECRAFT</span>',
  );
  assertEquals(
    transform("x.html", "    <title>Gatorwalk Studio</title>"),
    "    <title>Stagecraft Studio</title>",
  );
  assertEquals(
    transform(MD, "drive a gatorwalk work item"),
    "drive a stagecraft work item",
  );
  assertEquals(
    transform(TS, '  "<gatorwalk-factory>": context.extensionRoot,'),
    '  "<stagecraft>": context.extensionRoot,',
  );
  assertEquals(
    transform("checks.yaml", "      - dir: gatorwalk-factory"),
    "      - dir: stagecraft",
  );
});

Deno.test("rename: the skill's triggers name stagecraft once", () => {
  const before =
    `  for a person at every human gate. Use only when the user names gatorwalk:
  "gatorwalk", "gatorwalk-factory", "set up a gatorwalk factory", "create a
  gatorwalk factory", "change a gatorwalk factory", "gatorwalk factory
  definition", "gatorwalk work item".`;
  const after = transform("SKILL.md", before);
  assertEquals(
    after,
    `  for a person at every human gate. Use only when the user names stagecraft:
  "stagecraft", "set up a stagecraft factory", "create a stagecraft
  factory", "change a stagecraft factory", "stagecraft factory
  definition", "stagecraft work item".`,
  );
});

Deno.test("rename: README drops the code-name wording", () => {
  const before = `# gatorwalk-factory

\`gatorwalk-factory\` is a code name. This is the from-scratch rebuild of
\`@swamp/software-factory\`: a factory definition held as data.
It is **not published**, and its public name is chosen at go-live.
`;
  assertEquals(
    transform("README.md", before),
    `# stagecraft

\`stagecraft\` is the from-scratch rebuild of
\`@swamp/software-factory\`: a factory definition held as data.
It is **not published** until go-live.
`,
  );
});

Deno.test("rename: workflow-verify.yaml drops the removed example", () => {
  const before = `description: |
  run that fails if either fails. The gatorwalk swamp-club-swamp-extensions
  example factory definition, at
  gatorwalk-factory/.claude/skills/gatorwalk-factory/references/examples/swamp-club-swamp-extensions.yaml,
  runs this as its one verify stage; see gatorwalk-factory/DESIGN.md,
  "Parallel work inside one stage".`;
  assertEquals(
    transform("verification/workflow-verify.yaml", before),
    `description: |
  run that fails if either fails. A factory definition can
  run this as its one verify stage; see stagecraft/DESIGN.md,
  "Parallel work inside one stage".`,
  );
});

Deno.test("rename: DESIGN.md gains its decision once, within 80 columns", () => {
  const before = "# x\n\n## Decision log\n\n### 2026-10-01: older\n";
  const once = addDecision(before);
  assert(once.includes("the extension is named stagecraft"));
  assertEquals(addDecision(once), once);
  assert(once.indexOf("named stagecraft") < once.indexOf("older"));
  assertEquals(leftovers(once), []);
  for (const line of once.split("\n")) {
    assert(line.length <= 80, `too long: ${line}`);
  }
  assertEquals(transform("stagecraft/DESIGN.md", once), once);
});

Deno.test("rename: only a line the name pushed past 80 columns re-wraps", () => {
  // 80 columns before; the bare name is one letter longer after.
  const at80 = "// " + "word ".repeat(10) + "and then the gatorwalk one.";
  assertEquals(at80.length, 80);
  const out = transform(TS, at80 + "\n// tail");
  assertEquals(out.split("\n").length, 2);
  for (const line of out.split("\n")) assert(line.length <= 80, line);
  assertEquals(leftovers(out), []);
  // A YAML shell line that was already long is left alone.
  const long = "              if echo x | grep -qE '^(software-factory/|" +
    "gatorwalk-factory/|container-image/|git/|typesafe-ai/|extensions/)'; then";
  assertEquals(
    transform("y.yaml", long),
    long.replace("gatorwalk-factory/", "stagecraft/"),
  );
});

Deno.test("rename: reflow keeps a code span whole", () => {
  const text = "Run `deno task build:studio` and then " + "x ".repeat(25) +
    "done.";
  const out = reflow(MD, text, new Set());
  assert(out.includes("`deno task build:studio`"));
  for (const line of out.split("\n")) assert(line.length <= 80, line);
});

Deno.test("rename: a second run changes nothing", () => {
  const samples: [string, string][] = [
    [TS, 'type: "@swamp/gatorwalk-factory/linear", // gatorwalk Gatorwalk'],
    [MD, "a gatorwalk factory (`@swamp/gatorwalk-factory/factory`)"],
    [
      "SKILL.md",
      '  "gatorwalk", "gatorwalk-factory", "set up a gatorwalk factory", "create a\n  gatorwalk factory", "gatorwalk status"',
    ],
  ];
  for (const [path, text] of samples) {
    const once = transform(path, text);
    assertEquals(leftovers(once), []);
    assertEquals(transform(path, once), once);
  }
});

Deno.test("rename: only the generated studio assets are skipped", () => {
  const dir = "stagecraft/extensions/models/_lib/engine/";
  for (
    const f of [
      "studio_assets.ts",
      "studio_asset_app.ts",
      "studio_asset_fonts.ts",
    ]
  ) {
    assert(GENERATED.test(dir + f), f);
  }
  for (const f of ["studio_assets_test.ts", "studio_server.ts"]) {
    assert(!GENERATED.test(dir + f), f);
  }
});
