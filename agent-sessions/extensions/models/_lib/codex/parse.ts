/**
 * Parses one Codex rollout (`~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`)
 * into the agent session record's turns and calls (swamp-club#4158). Read
 * from Codex 0.165 and 0.166 rollouts.
 *
 * Codex's model runs shell through `exec`, a tool whose input is JavaScript
 * that calls `exec_command`, `apply_patch` and others inside it. The
 * commands it ran are `CommandExecution` items and the files a patch touched
 * are `FileChange` items, so those become the record's calls; `exec` and its
 * `wait` are not calls. Collaboration tools (`spawn_agent` and the rest) are
 * plain function calls. Messages, reasoning, command output and the `exec`
 * script are never read into a call.
 *
 * A subagent's rollout starts with a copy of its parent's history, up to
 * `subagent_history_start_ordinal`; that copy is skipped.
 *
 * @module
 */

import {
  AGENT_SESSION_LIMITS,
  type AgentSessionToolCall,
  type AgentSessionTurn,
} from "../contract/session_record.ts";
import type { CallAction } from "../classify/action.ts";
import type { CallLabel } from "../classify/label.ts";
import { callText, type RedactContext } from "../redact.ts";

export const CODEX_HARNESS = "codex";

type ToolKind = AgentSessionToolCall["toolKind"];
type Invocation = "interactive" | "headless" | "unknown";
type Json = Record<string, unknown>;
type MutableCall = {
  -readonly [K in keyof AgentSessionToolCall]: AgentSessionToolCall[K];
};

/** Function tools by kind. `wait` resumes an `exec` cell, so it is no call. */
const FUNCTION_KINDS: Record<string, ToolKind> = {
  spawn_agent: "subagent",
  followup_task: "other",
  send_message: "other",
  wait_agent: "other",
  list_agents: "other",
  interrupt_agent: "other",
  request_user_input: "other",
  request_user_input_async: "other",
  sleep: "other",
};
const NOT_CALLS = new Set(["wait"]);

// An argv that runs one command line through a shell.
const SHELL = /(^|\/)(ba|z|da|k|fi)?sh(\.exe)?$/;
const SHELL_FLAGS = new Set(["-c", "-lc", "-ic", "-lic"]);

/** The session a rollout holds, from its own first `session_meta`. */
export interface RolloutMeta {
  readonly id: string;
  readonly cwd?: string;
  readonly gitBranch?: string;
  /** `user` for a session a person or automation started, `subagent` for a spawned agent. */
  readonly threadSource?: string;
  readonly parentThreadId?: string;
  readonly agentPath?: string;
  readonly agentRole?: string;
  readonly originator?: string;
  readonly cliVersion?: string;
  readonly startedAtMs?: number;
  /** Where the subagent's own records start; earlier lines are its parent's. */
  readonly historyStart: number;
}

/** What one rollout holds, before it becomes a record. */
export interface ParsedRollout {
  readonly meta: RolloutMeta | undefined;
  /** Epoch ms of the session's start; turn and call times are relative to it. */
  readonly startedAtMs: number | undefined;
  readonly harnessVersion: string | undefined;
  readonly model: string | undefined;
  readonly invocation: Invocation;
  readonly turns: AgentSessionTurn[];
  /** Each `spawn_agent` call's id, mapped to the thread id of the agent it started. */
  readonly spawned: Map<string, string>;
  readonly skippedLines: number;
  readonly droppedCalls: number;
}

export interface RolloutParseOptions {
  readonly redact: Omit<RedactContext, "cwd">;
  /** The directory paths become relative to; when absent, the session's cwd. */
  readonly root?: string;
  /** Labels each call from its tool name and action; without it calls stay unlabeled. */
  readonly label?: (tool: string, action: CallAction) => CallLabel;
}

function obj(value: unknown): Json | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Json
    : undefined;
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function num(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.min(Math.floor(value), Number.MAX_SAFE_INTEGER)
    : 0;
}

function addTokens(total: number, value: number): number {
  return Math.min(Number.MAX_SAFE_INTEGER, total + value);
}

function timeOf(record: Json): number | undefined {
  const t = typeof record.timestamp === "string"
    ? Date.parse(record.timestamp)
    : NaN;
  return Number.isNaN(t) ? undefined : t;
}

function msOf(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : undefined;
}

/** Reads a `session_meta` payload. */
export function metaOf(payload: Json): RolloutMeta | undefined {
  const id = str(payload.id);
  if (!id) return undefined;
  const git = obj(payload.git);
  const started = typeof payload.timestamp === "string"
    ? Date.parse(payload.timestamp)
    : NaN;
  const ordinal = payload.subagent_history_start_ordinal;
  const field = (key: string) => str(payload[key]);
  const meta: Record<string, unknown> = {
    id,
    historyStart: typeof ordinal === "number" && Number.isInteger(ordinal) &&
        ordinal > 0
      ? ordinal
      : 0,
  };
  const set = (key: string, value: unknown) => {
    if (value !== undefined) meta[key] = value;
  };
  set("cwd", field("cwd"));
  set("gitBranch", str(git?.branch));
  set("threadSource", field("thread_source"));
  set("parentThreadId", field("parent_thread_id"));
  set("agentPath", field("agent_path"));
  set("agentRole", field("agent_role"));
  set("originator", field("originator"));
  set("cliVersion", field("cli_version"));
  set("startedAtMs", Number.isNaN(started) ? undefined : started);
  return meta as unknown as RolloutMeta;
}

/**
 * Whether a person steered the session, from its `originator`: the TUI is
 * interactive, `codex exec` headless.
 */
export function invocationOf(originator: string | undefined): Invocation {
  if (originator === "codex-tui") return "interactive";
  if (originator === "codex_exec") return "headless";
  return "unknown";
}

/** A command's argv as the one command line it ran. */
export function commandLine(argv: unknown): string {
  if (!Array.isArray(argv) || !argv.every((a) => typeof a === "string")) {
    return typeof argv === "string" ? argv : "";
  }
  const a = argv as string[];
  if (a.length === 3 && SHELL.test(a[0]) && SHELL_FLAGS.has(a[1])) return a[2];
  return a.join(" ");
}

/** Parses one rollout file's text. */
export function parseRollout(
  text: string,
  options: RolloutParseOptions,
): ParsedRollout {
  let meta: RolloutMeta | undefined;
  let model: string | undefined;
  let skippedLines = 0;
  let droppedCalls = 0;
  let callCount = 0;
  const turns: AgentSessionTurn[] = [];
  const byTurnId = new Map<string, AgentSessionTurn>();
  const seenResponses = new Set<string>();
  const functionCalls = new Map<string, MutableCall>();
  const answered = new Set<string>();
  const spawned = new Map<string, string>();
  let current: AgentSessionTurn | undefined;

  const base = () => meta?.startedAtMs;
  const rel = (ms: number) => Math.max(0, ms - (base() ?? ms));
  const openTurn = (id: string | undefined, start: number) => {
    let turn = id ? byTurnId.get(id) : undefined;
    if (turn) return turn;
    // Past the turn limit, later turns fold into the last one.
    if (turns.length >= AGENT_SESSION_LIMITS.turns) {
      turn = turns[turns.length - 1];
    } else {
      turn = {
        n: turns.length + 1,
        start,
        end: start,
        tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        calls: [],
      };
      turns.push(turn);
    }
    if (id) byTurnId.set(id, turn);
    return turn;
  };
  // A record with no turn of its own joins the open turn, else the last one.
  const turnFor = (id: string | undefined, at: number) =>
    (id ? byTurnId.get(id) : undefined) ?? current ??
      (id ? undefined : turns.at(-1)) ?? openTurn(id, at);
  const redactCtx = () => ({
    ...options.redact,
    cwd: options.root ?? meta?.cwd ?? "",
  });
  const addCall = (
    turn: AgentSessionTurn,
    fields: {
      id: string;
      tool: string;
      toolKind: ToolKind;
      action: CallAction;
      start: number;
      end: number;
      ok: boolean;
      exitCode?: number;
    },
  ): MutableCall | undefined => {
    if (
      turn.calls.length >= AGENT_SESSION_LIMITS.callsPerTurn ||
      callCount >= AGENT_SESSION_LIMITS.callsPerSession
    ) {
      droppedCalls++;
      return undefined;
    }
    callCount++;
    const { text, truncated } = callText(fields.action, redactCtx());
    const call: MutableCall = {
      id: fields.id.slice(0, AGENT_SESSION_LIMITS.idLength),
      tool: fields.tool,
      toolKind: fields.toolKind,
      start: fields.start,
      end: Math.max(fields.start, fields.end),
      ok: fields.ok,
      ...(fields.exitCode !== undefined ? { exitCode: fields.exitCode } : {}),
      text,
      ...(truncated ? { truncated } : {}),
      ...(options.label?.(fields.tool, fields.action) ??
        { label: "unlabeled" }),
    };
    (turn.calls as MutableCall[]).push(call);
    turn.end = Math.max(turn.end, call.end);
    return call;
  };

  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    let record: Json | undefined;
    try {
      record = obj(JSON.parse(line));
    } catch {
      record = undefined;
    }
    if (!record) {
      skippedLines++;
      continue;
    }
    const payload = obj(record.payload) ?? {};
    if (record.type === "session_meta") {
      // The first is the rollout's own; a subagent's copied history repeats
      // its parent's.
      if (!meta) meta = metaOf(payload);
      continue;
    }
    if (!meta || i < meta.historyStart) continue;
    const at = timeOf(record) ?? base() ?? 0;

    if (record.type === "turn_context") {
      if (model === undefined) model = str(payload.model);
      continue;
    }

    if (record.type === "token_usage_record") {
      const responseId = str(payload.response_id);
      const usage = obj(payload.usage);
      if (!usage || (responseId && seenResponses.has(responseId))) continue;
      if (responseId) seenResponses.add(responseId);
      const turn = turnFor(str(payload.turn_id), rel(at));
      // OpenAI counts cached tokens inside input_tokens; the record, like
      // Anthropic's usage, keeps them apart.
      const cached = num(usage.cached_input_tokens);
      const input = Math.max(0, num(usage.input_tokens) - cached);
      turn.tokens.input = addTokens(turn.tokens.input, input);
      turn.tokens.cacheRead = addTokens(turn.tokens.cacheRead, cached);
      turn.tokens.cacheWrite = addTokens(
        turn.tokens.cacheWrite,
        num(usage.cache_write_input_tokens),
      );
      turn.tokens.output = addTokens(
        turn.tokens.output,
        num(usage.output_tokens),
      );
      continue;
    }

    if (record.type === "event_msg") {
      const kind = payload.type;
      if (kind === "task_started") {
        current = openTurn(str(payload.turn_id), rel(at));
        continue;
      }
      if (kind === "task_complete" || kind === "turn_aborted") {
        const turn = turnFor(str(payload.turn_id), rel(at));
        turn.end = Math.max(turn.end, rel(at));
        if (current === turn) current = undefined;
        continue;
      }
      if (kind !== "item_completed") continue;
      const item = obj(payload.item);
      if (!item) continue;
      const turn = turnFor(str(payload.turn_id), rel(at));
      const end = rel(msOf(payload.completed_at_ms) ?? at);
      const start = rel(msOf(payload.started_at_ms) ?? at);
      if (item.type === "CommandExecution") {
        const id = str(item.id);
        if (!id) continue;
        const exit = item.exit_code;
        const ok = item.status === "completed" && exit === 0;
        addCall(turn, {
          id,
          tool: "exec_command",
          toolKind: "shell",
          action: { kind: "shell", command: commandLine(item.command) },
          start,
          end,
          ok,
          ...(!ok && typeof exit === "number" && Number.isSafeInteger(exit)
            ? { exitCode: exit }
            : {}),
        });
      } else if (item.type === "FileChange") {
        const id = str(item.id);
        const changes = obj(item.changes);
        if (!id || !changes) continue;
        let n = 0;
        for (const [path, change] of Object.entries(changes)) {
          const added = obj(change)?.type === "add";
          addCall(turn, {
            id: `${id}:${n++}`,
            tool: "apply_patch",
            toolKind: added ? "file-write" : "file-edit",
            action: { kind: added ? "file-write" : "file-edit", path },
            start,
            end,
            ok: item.status === "completed",
          });
        }
      } else if (item.type === "SubAgentActivity" && item.kind === "started") {
        const callId = str(item.id);
        const thread = str(item.agent_thread_id);
        if (callId && thread) spawned.set(callId, thread.toLowerCase());
      }
      continue;
    }

    if (record.type === "response_item") {
      if (payload.type === "function_call") {
        const name = str(payload.name);
        const callId = str(payload.call_id);
        if (!name || !callId || NOT_CALLS.has(name)) continue;
        const passthrough = obj(
          payload.internal_chat_message_metadata_passthrough,
        );
        const turn = turnFor(str(passthrough?.turn_id), rel(at));
        const tool = name.slice(0, AGENT_SESSION_LIMITS.nameLength);
        const call = addCall(turn, {
          id: callId,
          tool,
          toolKind: name.startsWith("mcp__")
            ? "mcp"
            : FUNCTION_KINDS[name] ?? "unknown",
          action: { kind: "none" },
          start: rel(at),
          end: rel(at),
          ok: true,
        });
        if (call) functionCalls.set(callId, call);
      } else if (payload.type === "function_call_output") {
        const callId = str(payload.call_id);
        const call = callId ? functionCalls.get(callId) : undefined;
        if (!call || !callId) continue;
        answered.add(callId);
        call.end = Math.max(call.start, rel(at));
        for (const turn of turns) {
          if (turn.calls.includes(call)) {
            turn.end = Math.max(turn.end, call.end);
          }
        }
      }
    }
  }

  // A call that never got a result was interrupted, or is still running in
  // a live session: it is not counted as a success.
  for (const [id, call] of functionCalls) {
    if (!answered.has(id)) call.ok = false;
  }
  // Commands finish out of order (one runs while another yields), so calls
  // are listed by when they started.
  for (const turn of turns) {
    (turn.calls as MutableCall[]).sort((a, b) => a.start - b.start);
  }

  return {
    meta,
    startedAtMs: meta?.startedAtMs,
    harnessVersion: meta?.cliVersion?.slice(0, AGENT_SESSION_LIMITS.nameLength),
    model: model?.slice(0, AGENT_SESSION_LIMITS.nameLength),
    invocation: invocationOf(meta?.originator),
    turns,
    spawned,
    skippedLines,
    droppedCalls,
  };
}
