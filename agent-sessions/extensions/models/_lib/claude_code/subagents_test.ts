import { assertEquals } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1.1.4";
import { agentSessionChildId } from "../contract/session_record.ts";
import type { ParsedTranscript } from "./parse.ts";
import { linkSubagents, listSubagents } from "./subagents.ts";

function transcript(
  callIds: string[],
  agentIdsByCall: Array<[string, string]> = [],
): ParsedTranscript {
  return {
    startedAtMs: 0,
    cwd: "/w",
    harnessVersion: undefined,
    model: undefined,
    invocation: "interactive",
    turns: [{
      n: 1,
      start: 0,
      end: 0,
      tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      calls: callIds.map((id) => ({
        id,
        tool: "Agent",
        toolKind: "subagent" as const,
        start: 0,
        end: 0,
        ok: true,
        text: "",
        label: "unlabeled" as const,
      })),
    }],
    agentIdsByCall: new Map(agentIdsByCall),
    skippedLines: 0,
    droppedCalls: 0,
  };
}

const source = (agentId: string, toolUseId?: string) => ({
  agentId,
  transcript: `/x/agent-${agentId}.jsonl`,
  ...(toolUseId ? { toolUseId } : {}),
});

Deno.test("linkSubagents: a nested subagent hangs off the subagent that started it", async () => {
  const { children, unlinked } = await linkSubagents(
    "top",
    transcript(["c1"]),
    [
      // Listed before its parent, to prove ids are built top-down.
      { source: source("b", "c2"), parsed: transcript([]) },
      { source: source("a", "c1"), parsed: transcript(["c2"]) },
    ],
  );
  const a = await agentSessionChildId("top", "a");
  const byAgent = new Map(children.map((c) => [c.source.agentId, c]));
  assertEquals(byAgent.get("a")!.parentSessionId, "top");
  assertEquals(byAgent.get("b")!.parentSessionId, a);
  assertEquals(byAgent.get("b")!.callId, "c2");
  assertEquals(unlinked, []);
});

Deno.test("linkSubagents: without a meta, the call whose result named the agent links it", async () => {
  const { children } = await linkSubagents(
    "top",
    transcript(["c1"], [["c1", "a"]]),
    [{ source: source("a"), parsed: transcript([]) }],
  );
  assertEquals(children[0].callId, "c1");
});

Deno.test("linkSubagents: a subagent no call started is linked to the session and reported", async () => {
  const { children, unlinked } = await linkSubagents(
    "top",
    transcript([]),
    [{ source: source("a", "gone"), parsed: transcript([]) }],
  );
  assertEquals(children[0].parentSessionId, "top");
  assertEquals(children[0].callId, undefined);
  assertEquals(unlinked, ["a"]);
});

Deno.test("listSubagents: reads type and starting call from meta, never the description", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.mkdir(join(dir, "subagents"));
    await Deno.writeTextFile(join(dir, "subagents", "agent-a.jsonl"), "");
    await Deno.writeTextFile(
      join(dir, "subagents", "agent-a.meta.json"),
      JSON.stringify({
        agentType: "Plan",
        toolUseId: "t1",
        description: "secret brief",
      }),
    );
    await Deno.writeTextFile(join(dir, "subagents", "agent-b.jsonl"), "");
    const found = await listSubagents(dir);
    assertEquals(found.map((s) => [s.agentId, s.agentType, s.toolUseId]), [
      ["a", "Plan", "t1"],
      ["b", undefined, undefined],
    ]);
    assertEquals(JSON.stringify(found).includes("secret"), false);
    assertEquals(await listSubagents(join(dir, "none")), []);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("linkSubagents: a subagent whose meta names its own call is placed once", async () => {
  const { children, unlinked } = await linkSubagents(
    "top",
    transcript([]),
    [{ source: source("a", "own"), parsed: transcript(["own"]) }],
  );
  assertEquals(children.length, 1);
  assertEquals(children[0].parentSessionId, "top");
  assertEquals(unlinked, ["a"]);
});

Deno.test("linkSubagents: two subagents naming each other's calls are each placed once", async () => {
  const { children } = await linkSubagents(
    "top",
    transcript([]),
    [
      { source: source("a", "cb"), parsed: transcript(["ca"]) },
      { source: source("b", "ca"), parsed: transcript(["cb"]) },
    ],
  );
  assertEquals(children.map((c) => c.source.agentId).sort(), ["a", "b"]);
});
