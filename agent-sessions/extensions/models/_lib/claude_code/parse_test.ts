import { assertEquals } from "jsr:@std/assert@1.0.19";
import { invocationOf, parseTranscript, toolKind } from "./parse.ts";

const lines = (...records: unknown[]) =>
  records.map((r) => typeof r === "string" ? r : JSON.stringify(r)).join("\n");

const base = {
  cwd: "/w",
  version: "2.1.1",
  isSidechain: false,
};

Deno.test("toolKind: maps known tools, never guesses an unknown one", () => {
  assertEquals(toolKind("Bash"), "shell");
  assertEquals(toolKind("MultiEdit"), "file-edit");
  assertEquals(toolKind("Task"), "subagent");
  assertEquals(toolKind("mcp__github__issue"), "mcp");
  assertEquals(toolKind("Monitor"), "other");
  assertEquals(toolKind("Shiny"), "unknown");
});

Deno.test("invocationOf: sdk entrypoints are headless, the CLI interactive", () => {
  assertEquals(invocationOf("sdk-cli"), "headless");
  assertEquals(invocationOf("sdk-ts"), "headless");
  assertEquals(invocationOf("cli"), "interactive");
  assertEquals(invocationOf("claude-vscode"), "interactive");
  assertEquals(invocationOf("mystery"), "unknown");
  assertEquals(invocationOf(undefined), "unknown");
});

Deno.test("parseTranscript: ignores unknown record types and bad lines, counting the bad ones", () => {
  const parsed = parseTranscript(
    lines(
      "not json",
      "[1,2]",
      { type: "summary", summary: "x" },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        message: { content: "go" },
      },
      {
        ...base,
        type: "assistant",
        timestamp: "2026-10-30T10:00:01Z",
        message: { id: "m", model: "<synthetic>", content: [] },
      },
    ),
    { sidechain: false, redact: {} },
  );
  assertEquals(parsed.skippedLines, 2);
  assertEquals(parsed.turns.length, 1);
  // A synthetic error reply is not a model.
  assertEquals(parsed.model, undefined);
});

Deno.test("parseTranscript: a prompt with text blocks starts a turn; a tool result does not", () => {
  const parsed = parseTranscript(
    lines(
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        message: {
          content: [{ type: "text", text: "with image" }, { type: "image" }],
        },
      },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:01Z",
        message: { content: [{ type: "tool_result", tool_use_id: "x" }] },
      },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:02Z",
        isMeta: true,
        message: { content: "meta" },
      },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:03Z",
        origin: { kind: "task-notification" },
        message: { content: "done" },
      },
    ),
    { sidechain: false, redact: {} },
  );
  assertEquals(parsed.turns.length, 1);
});

Deno.test("parseTranscript: a call with no result keeps its start as its end and is not ok", () => {
  const parsed = parseTranscript(
    lines(
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        message: { content: "go" },
      },
      {
        ...base,
        type: "assistant",
        timestamp: "2026-10-30T10:00:02Z",
        message: {
          id: "m",
          content: [{
            type: "tool_use",
            id: "t1",
            name: "Bash",
            input: { command: "sleep 9" },
          }],
        },
      },
    ),
    { sidechain: false, redact: {} },
  );
  const [call] = parsed.turns[0].calls;
  assertEquals([call.start, call.end, call.ok], [2000, 2000, false]);
});

Deno.test("parseTranscript: a skill started by a slash command keeps its calls and tokens", () => {
  const parsed = parseTranscript(
    lines(
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        origin: { kind: "human" },
        message: {
          content:
            "<command-message>swamp</command-message>\n<command-name>/swamp</command-name>",
        },
      },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        isMeta: true,
        message: { content: [{ type: "text", text: "skill body" }] },
      },
      {
        ...base,
        type: "assistant",
        timestamp: "2026-10-30T10:00:01Z",
        message: {
          id: "m",
          usage: { input_tokens: 4, output_tokens: 5 },
          content: [{
            type: "tool_use",
            id: "t1",
            name: "Bash",
            input: { command: "swamp model list" },
          }],
        },
      },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:02Z",
        message: { content: "<local-command-stdout>ok</local-command-stdout>" },
      },
    ),
    { sidechain: false, redact: {} },
  );
  assertEquals(parsed.turns.length, 1);
  assertEquals(parsed.turns[0].calls.length, 1);
  assertEquals(parsed.turns[0].tokens.output, 5);
});

Deno.test("parseTranscript: a reply before any recognised prompt still gets a turn", () => {
  const parsed = parseTranscript(
    lines({
      ...base,
      type: "assistant",
      timestamp: "2026-10-30T10:00:01Z",
      message: {
        id: "m",
        content: [{ type: "tool_use", id: "t1", name: "Read", input: {} }],
      },
    }),
    { sidechain: false, redact: {} },
  );
  assertEquals(parsed.turns.length, 1);
  assertEquals(parsed.turns[0].calls[0].id, "t1");
});

Deno.test("parseTranscript: calls past the per-turn limit are dropped and counted", () => {
  const uses = Array.from({ length: 2005 }, (_, i) => ({
    type: "tool_use",
    id: `t${i}`,
    name: "Bash",
    input: { command: "ls" },
  }));
  const parsed = parseTranscript(
    lines(
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        message: { content: "go" },
      },
      {
        ...base,
        type: "assistant",
        timestamp: "2026-10-30T10:00:01Z",
        message: { id: "m", content: uses },
      },
    ),
    { sidechain: false, redact: {} },
  );
  assertEquals(parsed.turns[0].calls.length, 2000);
  assertEquals(parsed.droppedCalls, 5);
});

Deno.test("parseTranscript: an out-of-range exit code is left out and token sums are capped", () => {
  const parsed = parseTranscript(
    lines(
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:00Z",
        message: { content: "go" },
      },
      {
        ...base,
        type: "assistant",
        timestamp: "2026-10-30T10:00:01Z",
        message: {
          id: "m1",
          usage: { input_tokens: Number.MAX_SAFE_INTEGER },
          content: [{ type: "tool_use", id: "t1", name: "Bash", input: {} }],
        },
      },
      {
        ...base,
        type: "assistant",
        timestamp: "2026-10-30T10:00:01Z",
        message: { id: "m2", usage: { input_tokens: 5e20 }, content: [] },
      },
      {
        ...base,
        type: "user",
        timestamp: "2026-10-30T10:00:02Z",
        message: {
          content: [{
            type: "tool_result",
            tool_use_id: "t1",
            is_error: true,
            content: "Exit code 99999999999999999999",
          }],
        },
      },
    ),
    { sidechain: false, redact: {} },
  );
  assertEquals(parsed.turns[0].calls[0].exitCode, undefined);
  assertEquals(parsed.turns[0].tokens.input, Number.MAX_SAFE_INTEGER);
});
