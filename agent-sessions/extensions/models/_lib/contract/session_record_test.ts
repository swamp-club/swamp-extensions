import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  agentSessionChildId,
  type AgentSessionRecord,
  agentSessionRecordJsonSchema,
  AgentSessionRecordV2Schema,
  agentSessionSummaryJsonSchema,
  agentSessionTags,
  readAgentSessionRecord,
  readAgentSessionSummary,
} from "./session_record.ts";

// The copy is checked against swamp's generated JSON Schemas, copied beside
// it from the same commit. A drift here means the copy was edited by hand or
// swamp's schema moved on without a re-copy.
async function checkedIn(file: string): Promise<unknown> {
  return JSON.parse(
    await Deno.readTextFile(new URL(`./${file}`, import.meta.url)),
  );
}

Deno.test("contract copy: record schema matches swamp's checked-in JSON Schema", async () => {
  assertEquals(
    await checkedIn("agent-session-record.schema.json"),
    agentSessionRecordJsonSchema(),
  );
});

Deno.test("contract copy: summary schema matches swamp's checked-in JSON Schema", async () => {
  assertEquals(
    await checkedIn("agent-session-summary.schema.json"),
    agentSessionSummaryJsonSchema(),
  );
});

function call(id: string, extra: Record<string, unknown> = {}) {
  return {
    id,
    tool: "Bash",
    toolKind: "shell",
    start: 0,
    end: 10,
    ok: true,
    text: "ls",
    label: "unlabeled",
    ...extra,
  };
}

function record(calls: unknown[], extra: Record<string, unknown> = {}) {
  return {
    schemaVersion: 2,
    id: "s1",
    repo: "demo",
    harness: "claude-code",
    startedAt: "2026-10-30T10:00:00.000Z",
    invocation: "interactive",
    importerVersion: "test",
    turns: [{
      n: 1,
      start: 0,
      end: 10,
      tokens: { input: 1, output: 1, cacheRead: 0, cacheWrite: 0 },
      calls,
    }],
    findings: [],
    ...extra,
  };
}

// The rules below are the ones the JSON Schema cannot express; the copy has
// to keep them, so each is pinned here.
Deno.test("contract copy: refuses duplicate call ids", () => {
  assert(
    !AgentSessionRecordV2Schema.safeParse(record([call("a"), call("a")]))
      .success,
  );
});

Deno.test("contract copy: refuses subagentSessionId on a non-subagent call", () => {
  assert(
    !AgentSessionRecordV2Schema.safeParse(
      record([call("a", { subagentSessionId: "child" })]),
    ).success,
  );
  assert(
    AgentSessionRecordV2Schema.safeParse(
      record([call("a", {
        tool: "Agent",
        toolKind: "subagent",
        subagentSessionId: "child",
      })]),
    ).success,
  );
});

Deno.test("contract copy: an unlabeled call has no category or rule, a labelled one has both", () => {
  assert(
    !AgentSessionRecordV2Schema.safeParse(
      record([call("a", { category: "x", rule: "y" })]),
    ).success,
  );
  assert(
    !AgentSessionRecordV2Schema.safeParse(
      record([call("a", { label: "neutral" })]),
    ).success,
  );
});

Deno.test("contract copy: agentId and agentType only on a child", () => {
  assert(
    !AgentSessionRecordV2Schema.safeParse(
      record([call("a")], { agentId: "abc" }),
    ).success,
  );
  assert(
    AgentSessionRecordV2Schema.safeParse(
      record([call("a")], {
        parentSessionId: "p1",
        agentId: "abc",
        agentType: "Explore",
      }),
    ).success,
  );
});

Deno.test("contract copy: refuses a field the schema does not name", () => {
  assertEquals(
    readAgentSessionRecord(record([call("a")], { prompt: "hello" })).kind,
    "skipped",
  );
});

Deno.test("contract copy: tags carry a summary the reader accepts", async () => {
  const parsed = AgentSessionRecordV2Schema.parse(
    record([call("a")], {
      parentSessionId: "p1",
      id: await agentSessionChildId("p1", "AbC"),
    }),
  ) as AgentSessionRecord;
  const tags = agentSessionTags(parsed);
  assertEquals(tags.parentSessionId, "p1");
  assertEquals(tags.headless, "false");
  assertEquals(readAgentSessionSummary(tags.summary)?.unlabeled, 1);
});
