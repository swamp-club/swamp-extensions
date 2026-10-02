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
import { z } from "npm:zod@4.3.6";
import type { Metrics } from "../../extensions/models/_lib/engine/metrics.ts";
import { model as swampClubModel } from "../../extensions/models/tracker/swamp_club.ts";
import { EXTENSION_ROOT, splitWords, withRepo } from "../harness.ts";
import {
  checkCommand,
  commandsIn,
  README,
  readmeCommands,
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
const AUTHORING = "references/authoring.md";

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
    "  --input-file f.yaml",
    "swamp model method run team new_key",
    "```",
    "- a list item:",
    "  ```sh",
    "  ```text",
    "  swamp model method run team validate",
    "  ```",
  ].join("\n");
  const found = commandsIn("x.md", md);
  assertEquals(found.map((c) => [c.line, c.words.length, c.fails]), [
    [6, 8, "because"],
    [8, 6, undefined],
    [13, 6, undefined],
  ]);
});

Deno.test("skill: a background comment marks the next sh command only", () => {
  const md = [
    "```text",
    "# background: not in sh",
    "```",
    "```sh",
    "# background: runs until Ctrl-C",
    "swamp model method run <studio> serve",
    "swamp model method run team validate",
    "```",
  ].join("\n");
  assertEquals(
    commandsIn("x.md", md).map((c) => [c.line, c.background]),
    [[6, "runs until Ctrl-C"], [7, undefined]],
  );
});

Deno.test("skill: an agent: write line is the agent writing an example into a factory, not a command", () => {
  const found = commandsIn(
    "x.md",
    ["```sh", "# agent: write <starter> into <factory>", "```"].join("\n"),
  );
  assertEquals(found, [{
    file: "x.md",
    line: 2,
    words: [],
    write: { example: "<starter>", factory: "<factory>" },
  }]);
});

Deno.test("skill: every command names a real method with inputs it accepts", async () => {
  // Result blocks and agent writes are not commands.
  const commands = (await skillCommands()).filter((c) => c.words.length > 0);
  assert(commands.length > 40, `only ${commands.length} commands found`);
  const problems = commands.flatMap((c) => {
    const problem = checkCommand(c.words);
    return problem === null ? [] : [`${c.file}:${c.line}: ${problem}`];
  });
  assertEquals(problems, []);
});

// The README is the page a new user reads first, and the registry's page for
// the extension, so its commands are held to the skill's rule.
Deno.test("README: every command names a real method with inputs it accepts", async () => {
  const commands = await readmeCommands();
  assert(commands.length >= 8, `only ${commands.length} commands found`);
  const problems = commands.flatMap((c) => {
    const problem = checkCommand(c.words);
    return problem === null ? [] : [`${c.file}:${c.line}: ${problem}`];
  });
  assertEquals(problems, []);
});

Deno.test("README: the setup commands are checked for their exact shape", () => {
  assertEquals(checkCommand(["swamp", "init"]), null);
  assert(checkCommand(["swamp", "init", "x"])?.includes("init takes nothing"));
  assertEquals(
    checkCommand(["swamp", "extension", "pull", "@swamp/stagecraft"]),
    null,
  );
  assert(
    checkCommand(["swamp", "extension", "pull", "@swamp/stagecraf"])
      ?.includes("extension pull must be"),
  );
  assertEquals(
    checkCommand(["swamp", "vault", "create", "local_encryption", "secrets"]),
    null,
  );
  assert(
    checkCommand(["swamp", "vault", "create", "secrets"])?.includes(
      "vault create must be",
    ),
  );
  assertEquals(
    checkCommand(["swamp", "vault", "put", "secrets", "linear-token"]),
    null,
  );
  assert(
    checkCommand(["swamp", "vault", "put", "secrets", "linear-token", "lin_x"])
      ?.includes("prompts for it"),
    "a secret is never shown on the command line",
  );
});

Deno.test("README: every relative link names a file, and a heading in it", async () => {
  const text = await Deno.readTextFile(README);
  const links = [...text.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1])
    .filter((l) => !/^[a-z]+:/.test(l));
  assert(links.length >= 8, `only ${links.length} links found`);
  const broken: string[] = [];
  for (const link of links) {
    const [path, anchor] = link.split("#");
    const target = path === "" ? README : `${EXTENSION_ROOT}${path}`;
    try {
      const info = await Deno.stat(target);
      if (anchor === undefined) continue;
      const headings = info.isFile
        ? [...(await Deno.readTextFile(target)).matchAll(/^#+ (.+)$/gm)]
          .map((m) => slug(m[1]))
        : [];
      if (!headings.includes(anchor)) broken.push(`${link}: no such heading`);
    } catch {
      broken.push(`${link}: no such file`);
    }
  }
  assertEquals(broken, []);
});

Deno.test("skill: a result block is a subagent's file, and a subagent's product is recorded from its file", async () => {
  const found = commandsIn(
    "x.md",
    ["```json result", '{"findings": []}', "```", "```json", "{}", "```"]
      .join("\n"),
  );
  assertEquals(found, [{
    file: "x.md",
    line: 1,
    words: [],
    result: '{"findings": []}\n',
  }]);
  const recordsFromFile = (await skillCommands()).filter((c) =>
    c.file === "references/driving.md" && c.words.includes("record_artifact") &&
    c.words.includes("payload=@<result-path>")
  );
  assertEquals(recordsFromFile.length, 1);
  assertEquals(checkCommand(recordsFromFile[0].words), null);
});

Deno.test("skill: the checker refuses an unknown method or input", () => {
  const item = [
    "swamp",
    "model",
    "@swamp/stagecraft/work-item",
    "method",
    "run",
  ];
  assert(
    checkCommand([...item, "approv", "<key>"])?.includes(
      "no work-item method",
    ),
  );
  assert(
    checkCommand([...item, "status", "<key>", "--input", "stage=x"])
      ?.includes("no input 'stage'"),
  );
  assert(
    checkCommand([
      ...item,
      "advance",
      "<key>",
      "--input",
      "transition=submit",
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
    ])?.includes(
      "no method 'assign' that every tracker has: <board> and <linear> lack it",
    ),
    "a method only one tracker has is not a <tracker> method",
  );
  assert(
    checkCommand([...item, "status", "<key>", "--log"])?.includes(
      "--log prints every method's output twice",
    ),
    "--log doubles the output the skill tells the driver to read whole",
  );
  assert(
    checkCommand(["swamp", "model", "edit", "team"])?.includes(
      "not a command form",
    ),
  );
  assert(
    checkCommand([
      "swamp",
      "model",
      "create",
      "@swamp/stagecraft/tracker",
      "board",
      "--json",
    ])?.includes("prefix=<prefix>"),
    "the built-in tracker is created with its prefix",
  );
});

const run = ["swamp", "model", "method", "run"];

Deno.test("skill: a studio command is checked against the studio model", () => {
  const create = [
    "swamp",
    "model",
    "create",
    "@swamp/stagecraft/studio",
  ];
  assertEquals(checkCommand([...create, "<studio>", "--json"]), null);
  assert(
    checkCommand([...create, "<studio>", "--global-arg", "x=1", "--json"])
      ?.includes("model create must be"),
    "the studio has no arguments",
  );
  assertEquals(checkCommand([...run, "<studio>", "serve"]), null);
  assertEquals(
    checkCommand([...run, "<studio>", "serve", "--input", "port=8123"]),
    null,
  );
  assertEquals(
    checkCommand([...run, "<studio>", "validate"]),
    "no studio method 'validate'",
  );
  assertEquals(
    checkCommand([...run, "<studio>", "serve", "--input", "host=x"]),
    "no input 'host'",
  );
});

Deno.test("skill: a tracker command is checked against the adapter its placeholder names", () => {
  assertEquals(
    checkCommand([
      ...run,
      "<board>",
      "set_type",
      "--input",
      "issue=1",
      "--input",
      "type=feature",
    ]),
    null,
    "the built-in tracker has set_type",
  );
  assertEquals(
    checkCommand([...run, "<linear>", "assign", "--input", "issue=1"]),
    "no <linear> method 'assign'",
  );
  assertEquals(
    checkCommand([
      ...run,
      "<linear>",
      "fetch_issue",
      "--input",
      "issue=ABC-1",
    ]),
    null,
  );
  assertEquals(
    checkCommand([
      ...run,
      "<tracker>",
      "claim",
      "--input",
      "issue=1",
      "--input",
      "factory=team",
    ]),
    null,
    "claim is every tracker's",
  );
  assert(
    checkCommand([
      ...run,
      "<tracker>",
      "set_type",
      "--input",
      "issue=1",
      "--input",
      "type=bug",
    ])
      ?.includes("<linear> lack it"),
    "Linear has no set_type, so it is not a <tracker> method",
  );
  assert(
    checkCommand([...run, "<board>", "set_type", "--input", "nope=1"])
      ?.includes("no input 'nope'"),
  );
  // The swamp-club Lab has no placeholder: <lab> is an instance name like any
  // other, so it is read as a factory, which has no assign.
  assert(
    checkCommand([...run, "<lab>", "assign", "--input", "issue=1"])
      ?.includes("no factory method 'assign'"),
  );
  assertEquals(
    checkCommand([...run, "<factory>", "validate"]),
    null,
    "<factory> is still a factory",
  );
});

Deno.test("skill: <tracker> needs the method and its inputs on every adapter", () => {
  const method = (schema: z.ZodObject) => ({ arguments: schema });
  const shared = method(z.object({ issue: z.string() }));
  const trackers = {
    "builtin": { publish: shared },
    "swamp-club": {
      publish: shared,
      only_two: shared,
      kind: method(z.object({ type: z.enum(["bug", "feature"]) })),
    },
    "linear": {
      publish: shared,
      only_two: shared,
      kind: method(z.object({ type: z.string() })),
    },
  };
  assertEquals(
    checkCommand([
      ...run,
      "<tracker>",
      "publish",
      "--input",
      "issue=1",
    ], trackers),
    null,
  );
  assertEquals(
    checkCommand([
      ...run,
      "<tracker>",
      "only_two",
      "--input",
      "issue=1",
    ], trackers),
    "no method 'only_two' that every tracker has: <board> lack it",
    "the built-in tracker counts",
  );
  const trackersWithKind = {
    ...trackers,
    "builtin": { ...trackers.builtin, kind: trackers.linear.kind },
  };
  assertEquals(
    checkCommand(
      [...run, "<tracker>", "kind", "--input", "type=bug"],
      trackersWithKind,
    ),
    null,
  );
  assert(
    checkCommand(
      [...run, "<tracker>", "kind", "--input", "type=task"],
      trackersWithKind,
    )
      ?.startsWith("swamp-club: inputs do not fit"),
    "inputs are checked against every adapter, not only the first",
  );
});

// The swamp-club Lab tracker is the swamp-club team's own and the skill is
// public: no command in it may run on a Lab instance or create one.
Deno.test("skill: no skill command uses the swamp-club Lab tracker", async () => {
  const lab = (await skillCommands()).filter((c) =>
    c.words.some((w) =>
      w === "lab" || w === "<lab>" || w.includes(swampClubModel.type)
    )
  );
  assertEquals(lab.map((c) => `${c.file}:${c.line}`), []);
});

// Authoring runs, as written, from an empty repo to a started work item: the
// commands of its states, up to its first reference section.
Deno.test("skill: authoring runs as written, from no factory to a started work item", async () => {
  const text = await Deno.readTextFile(`${SKILL_DIR}/${AUTHORING}`);
  const end = text.split("\n").indexOf("## The tracker") + 1;
  assert(end > 0, "authoring.md has no '## The tracker' section");
  const commands = commandsIn(AUTHORING, text).filter((c) => c.line < end);
  // What each command does: its method, or its swamp subcommand; or the
  // agent writing an example in.
  const label = (c: (typeof commands)[number]) => {
    if (c.write !== undefined) return "agent write";
    const w = c.words;
    return w[2] === "method"
      ? w[5]
      : w[3] === "method"
      ? w[5]
      : `${w[1]} ${w[2]}`;
  };
  assertEquals(commands.map(label), [
    "model search",
    "model create",
    "agent write",
    "validate",
    "model create",
    "serve",
    "new_key",
    "start",
    "status",
  ]);
  await withRepo(async (repo) => {
    // State 2's step 5 sets up the tracker from "The tracker", which this walk
    // stops before: the built-in one, created as that section says.
    await repo.swamp([
      "model",
      "create",
      "@swamp/stagecraft/tracker",
      "board",
      "--global-arg",
      "prefix=team",
      "--json",
    ]);
    const steps = await runExample(repo, commands, {
      extensionRoot: EXTENSION_ROOT,
      values: {
        "<factory>": "team",
        "<starter>": "starter",
        "<title>": "Fix a typo",
        "<tracker>": "board",
        "<studio>": "studio",
      },
    }, async (step) => {
      // State 4's studio serves the page while the walk goes on.
      if (step.url === undefined) return;
      const page = await fetch(step.url);
      assertEquals(page.status, 200, step.output);
      assert((await page.text()).includes("/assets/app.js"));
    });
    const serve = steps.find((s) => s.ran.includes("serve"));
    assert(serve?.url !== undefined, "the studio logged no URL");
    const validate = steps.find((s) => s.ran.includes("validate"))!;
    assert(validate.output.includes("is valid"), validate.output);
    const last = steps.at(-1)!;
    assert(last.output.includes("'plan'"), last.output);
  });
});

// The finding table in authoring.md names every graph finding validate can
// report, and nothing else.
Deno.test("skill: authoring explains every graph finding", async () => {
  const graph = await Deno.readTextFile(
    `${EXTENSION_ROOT}/extensions/models/_lib/engine/graph.ts`,
  );
  const union = graph.match(/export type FindingCode =([^;]+);/)?.[1] ?? "";
  const codes = [...union.matchAll(/"([a-z-]+)"/g)].map((m) => m[1]).sort();
  assert(codes.length > 5, `FindingCode not found in graph.ts: ${codes}`);
  const text = await Deno.readTextFile(`${SKILL_DIR}/${AUTHORING}`);
  const table = text.split("## Findings in plain words")[1]?.split("\n## ")[0];
  assert(table !== undefined, "authoring.md has no findings section");
  const rows = [...table.matchAll(/^\| ([a-z]+(?:-[a-z]+)+) +\|/gm)]
    .map((m) => m[1]).sort();
  assertEquals(rows, codes);
});

/** A heading's anchor, as GitHub makes it. */
function slug(heading: string): string {
  return heading.trim().toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, "")
    .replace(/ /g, "-");
}

// The walkthrough runs the authoring states by linking to them, so a renamed
// state or section must break the build, not the walkthrough.
Deno.test("skill: every link in getting-started.md names a file and heading that exist", async () => {
  const file = "references/getting-started.md";
  const text = await Deno.readTextFile(`${SKILL_DIR}/${file}`);
  const links = [...text.matchAll(/\]\(([^)\s]*)\)/g)].map((m) => m[1])
    .filter((target) => !/^[a-z]+:/.test(target));
  assert(links.length > 10, `only ${links.length} links found`);
  const problems: string[] = [];
  for (const link of links) {
    const [path, anchor] = link.split("#");
    const target = path === ""
      ? `${SKILL_DIR}/${file}`
      : new URL(path, `file://${SKILL_DIR}/${file}`).pathname;
    let body: string;
    try {
      body = await Deno.readTextFile(target);
    } catch {
      problems.push(`${link}: no such file`);
      continue;
    }
    if (anchor === undefined || anchor === "") continue;
    const anchors = [...body.matchAll(/^#{1,6} (.+)$/gm)].map((m) =>
      slug(m[1])
    );
    if (!anchors.includes(anchor)) problems.push(`${link}: no such heading`);
  }
  assertEquals(problems, []);
});

Deno.test("skill: the worked example runs as written, from start to done", async () => {
  const commands = commandsIn(
    EXAMPLE,
    await Deno.readTextFile(`${SKILL_DIR}/${EXAMPLE}`),
  );
  await withRepo(async (repo) => {
    const steps = await runExample(repo, commands, {
      extensionRoot: EXTENSION_ROOT,
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
    // Each reviewer's usage is the harness's one total, as the example
    // records it, and the attested total is their sum.
    const reported = commands.filter((c) => c.words.includes("record_usage"))
      .map((c) =>
        Number(c.words.find((w) => w.startsWith("totalTokens="))?.slice(12))
      );
    assertEquals(reported.length, 3);
    const usages = run.dispatches.flatMap((d) =>
      d.usage === undefined ? [] : [d.usage]
    );
    assertEquals(usages.map((u) => u.totalTokens), reported);
    assert(usages.every((u) => u.inputTokens === undefined));
    const metrics = await repo.data(key, "metrics") as unknown as Metrics;
    assertEquals(
      metrics.summary.usage.totalTokens,
      reported.reduce((a, b) => a + b, 0),
    );
    // Each review was recorded from its reviewer's result file, as written:
    // the latest version of each equals the last file written for it.
    const written = new Map<string, unknown>();
    commands.forEach((c, i) => {
      if (c.result === undefined) return;
      const record = commands.slice(i + 1).find((n) =>
        n.words.includes("record_artifact")
      );
      const name = record?.words.find((w) => w.startsWith("name="))?.slice(5);
      assert(
        name !== undefined && record?.words.includes("payload=@<result-path>"),
        `${c.file}:${c.line}: a result block not recorded from its file`,
      );
      written.set(name, JSON.parse(c.result));
    });
    assertEquals([...written.keys()].sort(), ["code-review", "plan-review"]);
    for (const [name, payload] of written) {
      const read = await repo.swamp([
        "data",
        "get",
        key,
        `artifact-${name}`,
        "--json",
      ]);
      assertEquals(
        (JSON.parse(read.stdout) as { content?: unknown }).content,
        payload,
        name,
      );
    }
  });
});

// The swamp-club Lab tracker and its example are the swamp-club team's own:
// authoring must never offer them. Only the tracker section names them, to
// say so.
Deno.test("skill: authoring never offers the swamp-club Lab", async () => {
  const text = await Deno.readTextFile(`${SKILL_DIR}/${AUTHORING}`);
  const sections = text.split(/\n(?=## )/);
  const offering = sections.filter((s) =>
    !s.startsWith("## The tracker") && /swamp-club|\bLab\b/.test(s)
  );
  assertEquals(offering.map((s) => s.split("\n")[0]), []);
  assertEquals(
    commandsIn(AUTHORING, text).filter((c) =>
      c.words.some((w) => w.includes("swamp-club"))
    ),
    [],
  );
});

/** Every file under a directory, as paths relative to it. */
async function filesUnder(dir: string, prefix = ""): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(`${dir}${prefix}`)) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory) files.push(...await filesUnder(dir, `${path}/`));
    else if (entry.isFile) files.push(path);
  }
  return files.sort();
}

/** A text's paragraphs: blocks between blank lines, a fenced block whole. */
function paragraphs(text: string): { line: number; text: string }[] {
  const found: { line: number; text: string }[] = [];
  let current: string[] = [];
  let start = 0;
  let fenced = false;
  text.split("\n").forEach((line, i) => {
    if (line.trim() === "" && !fenced) {
      if (current.length > 0) {
        found.push({ line: start, text: current.join("\n") });
      }
      current = [];
      return;
    }
    if (current.length === 0) start = i + 1;
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    current.push(line);
  });
  if (current.length > 0) found.push({ line: start, text: current.join("\n") });
  return found;
}

// The swamp-club Lab tracker is not a secret, but only the swamp-club team can
// use it (swamp-club #2842). So wherever the shipped skill or REFERENCE.md
// names it, the same paragraph says it is the swamp-club team's; and no example
// is named for it, so none reads as an option. The README, the page a new user
// reads first, does not name it at all (swamp-club #2819).
Deno.test("skill and REFERENCE.md: the swamp-club Lab is named only as the swamp-club team's own", async () => {
  const mentions = /swamp-club|swamp_club|\bLab\b/;
  assertEquals(
    paragraphs(await Deno.readTextFile(README)).flatMap((p) =>
      mentions.test(p.text) ? [`README.md:${p.line}`] : []
    ),
    [],
  );
  const texts: [string, string][] = [
    ["REFERENCE.md", await Deno.readTextFile(`${EXTENSION_ROOT}REFERENCE.md`)],
  ];
  const skillFiles = await filesUnder(SKILL_DIR);
  assert(skillFiles.includes("SKILL.md"), skillFiles.join(", "));
  for (const file of skillFiles) {
    texts.push([file, await Deno.readTextFile(`${SKILL_DIR}${file}`)]);
  }
  const unlabelled = texts.flatMap(([file, text]) =>
    paragraphs(text).flatMap((p) =>
      mentions.test(p.text) && !/swamp-club\s+team/.test(p.text)
        ? [`${file}:${p.line}`]
        : []
    )
  );
  assertEquals(unlabelled, []);
  assertEquals(skillFiles.filter((f) => mentions.test(f)), []);
});
