import { assertEquals } from "jsr:@std/assert@1.0.19";
import type {
  AgentSessionToolCall,
  AgentSessionTurn,
} from "../contract/session_record.ts";
import { findingsFor } from "./findings.ts";

const MIN = 60 * 1000;

let n = 0;
function call(
  start: number,
  over: Partial<AgentSessionToolCall> = {},
): AgentSessionToolCall {
  return {
    id: `c${++n}`,
    tool: "Bash",
    toolKind: "shell",
    start,
    end: start + 1000,
    ok: true,
    text: "ls",
    label: "neutral",
    category: "read-only shell",
    rule: "all programs are read-only",
    ...over,
  };
}

const turn = (calls: AgentSessionToolCall[], t = 1): AgentSessionTurn => ({
  n: t,
  start: 0,
  end: 0,
  tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  calls,
});

const edit = (start: number, path = "models/@x/y/a.yaml") =>
  call(start, {
    tool: "Edit",
    toolKind: "file-edit",
    text: path,
    label: "bypass",
    category: "hand-edited definition",
    rule: "Edit on a swamp-managed path",
  });

const failed = (start: number) =>
  call(start, { ok: false, category: "swamp model method" });

Deno.test("findingsFor: three hand edits of one definition are a loop, high when calls failed between", () => {
  const between = failed(2 * MIN);
  const calls = [
    edit(0),
    edit(MIN),
    between,
    edit(10 * MIN),
    edit(0, "models/@x/y/b.yaml"),
  ];
  const [loop] = findingsFor([turn(calls)]);
  assertEquals(loop.severity, "high");
  assertEquals(loop.title, "Edited a.yaml by hand 3 times in 10 min");
  assertEquals(loop.callIds, [
    calls[0].id,
    calls[1].id,
    calls[3].id,
    between.id,
  ]);
  assertEquals(
    loop.detail.endsWith("1 call failed between the first and last edit."),
    true,
  );
  // Two edits are not a loop; with no failures a loop is medium.
  assertEquals(findingsFor([turn([edit(0), edit(MIN)])]), []);
  assertEquals(
    findingsFor([
      turn([edit(0)], 1),
      turn([edit(MIN)], 2),
      turn([edit(2 * MIN)], 3),
    ])
      .map((f) => [f.severity, f.title]),
    [["medium", "Edited a.yaml by hand 3 times across 3 turns"]],
  );
});

Deno.test("findingsFor: failed calls under 3 minutes apart are a streak; 2 medium, 3 high", () => {
  const two = findingsFor([turn([failed(0), call(MIN), failed(2 * MIN)])]);
  assertEquals(two.map((f) => f.severity), ["medium"]);
  assertEquals(
    two[0].title,
    "2 failed calls within 3 minutes of each other (turn 1)",
  );
  const three = findingsFor([turn([failed(0), failed(MIN), failed(2 * MIN)])]);
  assertEquals(three.map((f) => f.severity), ["high"]);
  // Further apart, no streak.
  assertEquals(findingsFor([turn([failed(0), failed(10 * MIN)])]), []);
});

Deno.test("findingsFor: covered CLIs, one finding per program, and a docs gap from 3 source reads", () => {
  const git = (s: number) =>
    call(s, {
      label: "bypass",
      category: "git — covered by @swamp/git",
      rule: "program = git; @swamp/git is installed in this repo",
    });
  const src = (s: number) =>
    call(s, {
      category: "read extension source",
      rule: "read-only; .swamp/pulled-extensions (docs gap signal)",
    });
  const found = findingsFor([turn([git(0), git(MIN), src(0), src(1), src(2)])]);
  assertEquals(found.map((f) => [f.severity, f.title]), [
    ["medium", "Ran git directly 2 times though @swamp/git is installed"],
    ["medium", "Read pulled extension source 3 times"],
  ]);
  assertEquals(found[0].tune.includes("@swamp/git"), true);
  assertEquals(findingsFor([turn([src(0), src(1)])]), []);
});

Deno.test("findingsFor: unlabeled calls give no findings", () => {
  const c = call(0, { label: "unlabeled", ok: false });
  delete (c as { category?: string }).category;
  assertEquals(findingsFor([turn([c, { ...c, id: "x", start: 1 }])]), []);
});
