/**
 * Claude Code transcript parser: one session's `.jsonl` (or one subagent's)
 * into the turns and calls of an agent session record. Only `user` and
 * `assistant` records are read; every other record type, and any line that
 * is not JSON, is ignored. Prompts, replies and tool output are read only to
 * find turn boundaries, pair results and read an exit code; none of their
 * text reaches the record.
 *
 * @module
 */

import {
  AGENT_SESSION_LIMITS,
  type AgentSessionToolCall,
  type AgentSessionTurn,
} from "../contract/session_record.ts";
import { callText, type RedactContext } from "../redact.ts";

/** The harness slug every Claude Code record is written under. */
export const CLAUDE_CODE_HARNESS = "claude-code";

type ToolKind = AgentSessionToolCall["toolKind"];
type Invocation = "interactive" | "headless" | "unknown";

const TOOL_KINDS: Record<string, ToolKind> = {
  Bash: "shell",
  BashOutput: "shell",
  KillShell: "shell",
  Read: "file-read",
  Edit: "file-edit",
  MultiEdit: "file-edit",
  NotebookEdit: "file-edit",
  Write: "file-write",
  Grep: "search",
  Glob: "search",
  ToolSearch: "search",
  WebFetch: "web",
  WebSearch: "web",
  Agent: "subagent",
  Task: "subagent",
  Skill: "skill",
  TodoWrite: "other",
  AskUserQuestion: "other",
  ExitPlanMode: "other",
  EnterPlanMode: "other",
  SendMessage: "other",
  ListAgents: "other",
  SubagentHandback: "other",
  Monitor: "other",
  TaskStop: "other",
  TaskCreate: "other",
  TaskGet: "other",
  TaskList: "other",
  TaskUpdate: "other",
  ScheduleWakeup: "other",
  CronCreate: "other",
  CronDelete: "other",
  CronList: "other",
  EnterWorktree: "other",
  ExitWorktree: "other",
  PushNotification: "other",
  RemoteTrigger: "other",
  Artifact: "other",
};

/** Maps a Claude Code tool name to the record's canonical kind. */
export function toolKind(tool: string): ToolKind {
  if (tool.startsWith("mcp__")) return "mcp";
  return TOOL_KINDS[tool] ?? "unknown";
}

/**
 * Whether a person steered the session, from the transcript's `entrypoint`:
 * the SDK entrypoints (`claude -p` is `sdk-cli`) are headless, the CLI and
 * IDE entrypoints interactive.
 */
export function invocationOf(entrypoint: unknown): Invocation {
  if (typeof entrypoint !== "string") return "unknown";
  if (entrypoint.startsWith("sdk")) return "headless";
  if (entrypoint === "cli" || entrypoint.startsWith("claude-")) {
    return "interactive";
  }
  return "unknown";
}

/** What one transcript file holds, before it becomes a record. */
export interface ParsedTranscript {
  /** Epoch ms of the first user or assistant record; turn times are relative to it. */
  readonly startedAtMs: number | undefined;
  readonly cwd: string | undefined;
  readonly harnessVersion: string | undefined;
  readonly model: string | undefined;
  readonly invocation: Invocation;
  readonly turns: AgentSessionTurn[];
  /** Tool-use id of each subagent call, mapped to the agent id its result named. */
  readonly agentIdsByCall: Map<string, string>;
  /** Lines that were not JSON. */
  readonly skippedLines: number;
  /** Calls left out to keep the session inside the record's size limits. */
  readonly droppedCalls: number;
}

export interface ParseOptions {
  /** Read the subagent's own records (`isSidechain: true`) instead of the parent's. */
  readonly sidechain: boolean;
  readonly redact: Omit<RedactContext, "cwd">;
}

type Json = Record<string, unknown>;

function obj(value: unknown): Json | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Json
    : undefined;
}

function num(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.min(Math.floor(value), Number.MAX_SAFE_INTEGER)
    : 0;
}

/** Adds token counts, stopping at the largest integer the record accepts. */
function addTokens(total: number, value: unknown): number {
  return Math.min(Number.MAX_SAFE_INTEGER, total + num(value));
}

function timeOf(record: Json): number | undefined {
  const t = typeof record.timestamp === "string"
    ? Date.parse(record.timestamp)
    : NaN;
  return Number.isNaN(t) ? undefined : t;
}

// User records the harness writes itself: command output, reminders and
// notifications. A slash command or skill (`<command-message>`,
// `<command-name>`), a `!` shell line (`<bash-input>`) and pasted text are a
// person's input, so they do start a turn, as does any other text.
const HARNESS_OUTPUT =
  /^<(?:local-command-|bash-stdout|bash-stderr|system-reminder|task-notification|artifact-content-|user-prompt-submit-hook)/;

/**
 * A user record that starts a turn: a prompt a person (or, headless, the
 * automation) typed. Tool results, meta records and the harness's own output
 * records are not prompts.
 */
function isPrompt(record: Json): boolean {
  if (record.isMeta === true) return false;
  const origin = obj(record.origin);
  if (origin && origin.kind !== undefined && origin.kind !== "human") {
    return false;
  }
  const content = obj(record.message)?.content;
  if (typeof content === "string") return !HARNESS_OUTPUT.test(content);
  if (!Array.isArray(content)) return false;
  let text = false;
  for (const block of content) {
    const b = obj(block);
    if (!b) continue;
    if (b.type === "tool_result") return false;
    if (b.type === "text" && typeof b.text === "string") {
      if (HARNESS_OUTPUT.test(b.text)) return false;
      text = true;
    }
  }
  return text;
}

const EXIT_CODE = /^Exit code (-?\d+)/m;

function resultText(content: unknown): string {
  if (typeof content === "string") return content.slice(0, 200);
  if (Array.isArray(content)) {
    for (const block of content) {
      const b = obj(block);
      if (b?.type === "text" && typeof b.text === "string") {
        return b.text.slice(0, 200);
      }
    }
  }
  return "";
}

/** Splits text into lines and parses each JSON line, counting the rest. */
export function* jsonLines(
  text: string,
  skipped: { count: number },
): Generator<Json> {
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    try {
      const parsed = obj(JSON.parse(line));
      if (parsed) yield parsed;
      else skipped.count++;
    } catch {
      skipped.count++;
    }
  }
}

interface OpenCall {
  readonly call: {
    -readonly [K in keyof AgentSessionToolCall]: AgentSessionToolCall[K];
  };
  readonly turn: AgentSessionTurn;
  readonly startMs: number;
}

/** Parses one transcript's text. */
export function parseTranscript(
  text: string,
  options: ParseOptions,
): ParsedTranscript {
  const skipped = { count: 0 };
  let startedAtMs: number | undefined;
  let cwd: string | undefined;
  let harnessVersion: string | undefined;
  let model: string | undefined;
  let entrypoint: unknown;
  const turns: AgentSessionTurn[] = [];
  const calls = new Map<string, OpenCall>();
  const answered = new Set<string>();
  const agentIdsByCall = new Map<string, string>();
  const seenReplies = new Set<string>();
  let turn: AgentSessionTurn | undefined;
  let callCount = 0;
  let droppedCalls = 0;

  const rel = (ms: number) => Math.max(0, ms - (startedAtMs ?? ms));
  // Past the turn limit, later prompts fold into the last turn, whose calls
  // the per-turn and per-session limits still bound.
  const openTurn = (start: number): AgentSessionTurn => {
    if (turn && turns.length >= AGENT_SESSION_LIMITS.turns) return turn;
    const next: AgentSessionTurn = {
      n: turns.length + 1,
      start,
      end: start,
      tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      calls: [],
    };
    turns.push(next);
    return next;
  };

  for (const record of jsonLines(text, skipped)) {
    if (record.type !== "user" && record.type !== "assistant") continue;
    if ((record.isSidechain === true) !== options.sidechain) continue;
    const at = timeOf(record);
    if (startedAtMs === undefined && at !== undefined) startedAtMs = at;
    if (cwd === undefined && typeof record.cwd === "string") cwd = record.cwd;
    if (harnessVersion === undefined && typeof record.version === "string") {
      harnessVersion = record.version;
    }
    if (entrypoint === undefined && record.entrypoint !== undefined) {
      entrypoint = record.entrypoint;
    }
    const message = obj(record.message);
    if (!message) continue;

    if (record.type === "user") {
      if (isPrompt(record)) {
        turn = openTurn(rel(at ?? startedAtMs ?? 0));
        continue;
      }
      const content = Array.isArray(message.content) ? message.content : [];
      for (const block of content) {
        const b = obj(block);
        if (b?.type !== "tool_result" || typeof b.tool_use_id !== "string") {
          continue;
        }
        const open = calls.get(b.tool_use_id);
        if (!open) continue;
        answered.add(b.tool_use_id);
        const end = rel(at ?? open.startMs);
        open.call.end = Math.max(open.call.start, end);
        open.call.ok = b.is_error !== true;
        if (!open.call.ok && open.call.tool === "Bash") {
          const code = EXIT_CODE.exec(resultText(b.content));
          // An exit code too large to be one is left out, not refused.
          if (code && Number.isSafeInteger(Number(code[1]))) {
            open.call.exitCode = Number(code[1]);
          }
        }
        open.turn.end = Math.max(open.turn.end, open.call.end);
      }
      const agentId = obj(record.toolUseResult)?.agentId;
      if (typeof agentId === "string" && agentId.length > 0) {
        for (const block of content) {
          const b = obj(block);
          if (b?.type === "tool_result" && typeof b.tool_use_id === "string") {
            agentIdsByCall.set(b.tool_use_id, agentId);
          }
        }
      }
      continue;
    }

    // An assistant record. Claude Code splits one reply over several records
    // that share message.id and repeat its usage, so usage counts once per id.
    if (
      model === undefined && typeof message.model === "string" &&
      message.model.length > 0 && !message.model.startsWith("<")
    ) {
      model = message.model;
    }
    const startMs = at ?? startedAtMs ?? 0;
    // A reply before any prompt the parser recognises still has a turn, so its
    // calls and tokens are never lost.
    if (!turn) turn = openTurn(rel(startMs));
    const replyId = typeof message.id === "string" ? message.id : undefined;
    const usage = obj(message.usage);
    if (usage && (replyId === undefined || !seenReplies.has(replyId))) {
      if (replyId !== undefined) seenReplies.add(replyId);
      turn.tokens.input = addTokens(turn.tokens.input, usage.input_tokens);
      turn.tokens.output = addTokens(turn.tokens.output, usage.output_tokens);
      turn.tokens.cacheRead = addTokens(
        turn.tokens.cacheRead,
        usage.cache_read_input_tokens,
      );
      turn.tokens.cacheWrite = addTokens(
        turn.tokens.cacheWrite,
        usage.cache_creation_input_tokens,
      );
    }
    turn.end = Math.max(turn.end, rel(startMs));
    const content = Array.isArray(message.content) ? message.content : [];
    for (const block of content) {
      const b = obj(block);
      if (
        b?.type !== "tool_use" || typeof b.id !== "string" ||
        typeof b.name !== "string" || b.id.length === 0 ||
        b.name.length === 0 || calls.has(b.id)
      ) {
        continue;
      }
      if (
        turn.calls.length >= AGENT_SESSION_LIMITS.callsPerTurn ||
        callCount >= AGENT_SESSION_LIMITS.callsPerSession
      ) {
        droppedCalls++;
        continue;
      }
      callCount++;
      const tool = b.name.slice(0, 200);
      const { text, truncated } = callText(tool, b.input, {
        ...options.redact,
        cwd: cwd ?? "",
      });
      const start = rel(startMs);
      const call: OpenCall["call"] = {
        id: b.id.slice(0, 200),
        tool,
        toolKind: toolKind(tool),
        start,
        end: start,
        ok: true,
        text,
        ...(truncated ? { truncated } : {}),
        label: "unlabeled",
      };
      turn.calls.push(call);
      calls.set(b.id, { call, turn, startMs });
    }
  }

  // A call that never got a result was interrupted or killed, or is still
  // running in a live session: it is not counted as a success.
  for (const [id, open] of calls) {
    if (!answered.has(id)) open.call.ok = false;
  }

  return {
    startedAtMs,
    cwd,
    harnessVersion: harnessVersion?.slice(0, 200),
    model: model?.slice(0, 200),
    invocation: invocationOf(entrypoint),
    turns,
    agentIdsByCall,
    skippedLines: skipped.count,
    droppedCalls,
  };
}
