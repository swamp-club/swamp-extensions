/**
 * Trims a real Codex rollout into a fixture (swamp-club#4158): every line
 * stays, since a subagent's `subagent_history_start_ordinal` counts lines,
 * but each keeps only the fields the parser reads. Messages, reasoning,
 * instructions, tool output, the `exec` script, a subagent's message and
 * OpenAI account ids become `CANARY` or go. The swamp repo's path becomes
 * `${ROOT}`, a removed worktree's `${WORKTREE}` and home `${HOME}`, which
 * the tests replace with their own temp folders. The trimmed copy is checked
 * to parse to the same turns, calls, labels and links as the original.
 *
 * Usage, from agent-sessions/:
 *   deno run --allow-read --allow-write \
 *     extensions/models/_lib/testdata/codex/trim.ts \
 *     <out root> <home> <repo> <worktree> <rollout>...
 *
 * Each rollout lands at <out root>/YYYY/MM/DD/<its name>, as Codex files it.
 *
 * @module
 */

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { basename, dirname, join } from "jsr:@std/path@1.1.4";
import { coverageOf } from "../../classify/coverage.ts";
import { labelCall } from "../../classify/label.ts";
import { parseRollout } from "../../codex/parse.ts";

type Json = Record<string, unknown>;

export const ROOT = "${ROOT}";
export const WORKTREE = "${WORKTREE}";
export const HOME = "${HOME}";
const CANARY = "CANARY";

function obj(value: unknown): Json | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Json
    : undefined;
}

function pick(from: Json | undefined, keys: readonly string[]): Json {
  const out: Json = {};
  for (const k of keys) if (from && from[k] !== undefined) out[k] = from[k];
  return out;
}

const META = [
  "id",
  "timestamp",
  "cwd",
  "originator",
  "cli_version",
  "source",
  "thread_source",
  "parent_thread_id",
  "agent_path",
  "agent_role",
  "subagent_history_start_ordinal",
];

function trimItem(item: Json): Json {
  switch (item.type) {
    case "CommandExecution":
      return pick(item, [
        "type",
        "id",
        "command",
        "status",
        "exit_code",
        "duration",
      ]);
    case "FileChange": {
      const changes: Json = {};
      for (const [path, change] of Object.entries(obj(item.changes) ?? {})) {
        changes[path] = pick(obj(change), ["type", "move_path"]);
      }
      return { ...pick(item, ["type", "id", "status"]), changes };
    }
    case "SubAgentActivity":
      return pick(item, ["type", "id", "kind", "agent_thread_id"]);
    default:
      return { type: item.type, content: CANARY };
  }
}

/** One rollout line, trimmed to what the parser reads. */
export function trimLine(record: Json): Json {
  const payload = obj(record.payload) ?? {};
  const keep = (p: Json) => ({
    timestamp: record.timestamp,
    type: record.type,
    payload: p,
  });
  switch (record.type) {
    case "session_meta":
      return keep({
        ...pick(payload, META),
        git: pick(obj(payload.git), ["branch"]),
      });
    case "turn_context":
      return keep(pick(payload, ["turn_id", "model", "cwd"]));
    case "token_usage_record":
      return keep(pick(payload, ["turn_id", "response_id", "usage"]));
    case "event_msg": {
      const kind = payload.type;
      if (
        kind === "task_started" || kind === "task_complete" ||
        kind === "turn_aborted"
      ) {
        return keep(pick(payload, ["type", "turn_id", "reason"]));
      }
      if (kind === "item_completed") {
        return keep({
          ...pick(payload, [
            "type",
            "turn_id",
            "started_at_ms",
            "completed_at_ms",
          ]),
          item: trimItem(obj(payload.item) ?? {}),
        });
      }
      return keep({ type: kind });
    }
    case "response_item": {
      const kind = payload.type;
      const turn = pick(
        obj(payload.internal_chat_message_metadata_passthrough),
        ["turn_id"],
      );
      if (kind === "function_call" || kind === "custom_tool_call") {
        return keep({
          ...pick(payload, ["type", "name", "call_id"]),
          [kind === "function_call" ? "arguments" : "input"]: CANARY,
          internal_chat_message_metadata_passthrough: turn,
        });
      }
      if (
        kind === "function_call_output" || kind === "custom_tool_call_output"
      ) {
        return keep({ ...pick(payload, ["type", "call_id"]), output: CANARY });
      }
      return keep({ type: kind, content: CANARY });
    }
    default:
      return keep({ content: CANARY });
  }
}

/** Replaces this machine's paths with the placeholders, longest first. */
export function placeholders(
  text: string,
  paths: { home: string; root: string; worktree: string },
): string {
  return text
    .replaceAll(paths.worktree, WORKTREE)
    .replaceAll(paths.root, ROOT)
    .replaceAll(paths.home, HOME);
}

/** Trims a rollout's text, line for line. */
export function trimRollout(
  text: string,
  paths: { home: string; root: string; worktree: string },
): string {
  const out = text.split("\n").map((line) => {
    if (line.trim() === "") return line;
    return JSON.stringify(trimLine(JSON.parse(line)));
  }).join("\n");
  return placeholders(out, paths);
}

if (import.meta.main) {
  const [outRoot, home, root, worktree, ...rollouts] = Deno.args;
  const paths = { home, root, worktree };
  const coverage = coverageOf(["@swamp/git"]);
  for (const rollout of rollouts) {
    const original = await Deno.readTextFile(rollout);
    const trimmed = trimRollout(original, paths);
    // Parsed back with this machine's paths, it must give what the original does.
    const restored = trimmed.replaceAll(WORKTREE, worktree)
      .replaceAll(ROOT, root).replaceAll(HOME, home);
    const options = {
      redact: { home },
      root,
      label: (tool: string, action: Parameters<typeof labelCall>[1]) =>
        labelCall(tool, action, { root, coverage }),
    };
    const a = parseRollout(original, options);
    const b = parseRollout(restored, options);
    assertEquals(b.turns, a.turns, `${rollout}: calls differ after trimming`);
    assertEquals([...b.spawned], [...a.spawned]);
    assertEquals(b.meta, a.meta);
    assertEquals([b.model, b.invocation], [a.model, a.invocation]);
    const day = dirname(rollout).split("/").slice(-3);
    const out = join(outRoot, ...day, basename(rollout));
    await Deno.mkdir(dirname(out), { recursive: true });
    await Deno.writeTextFile(out, trimmed);
    console.log(
      `${out}: ${a.turns.length} turns, ${
        a.turns.reduce((n, t) => n + t.calls.length, 0)
      } calls`,
    );
  }
}
