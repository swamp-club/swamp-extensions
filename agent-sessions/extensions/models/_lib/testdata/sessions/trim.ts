/**
 * Trims a real Claude Code transcript into a labelling fixture: only the
 * fields the parser reads stay. Prompts, replies and tool output become
 * `CANARY` (a harness tag keeps its name, since it decides turn
 * boundaries), a result keeps only its `Exit code N` line, and a call keeps
 * only the input fields the record and the labeller read. The session's cwd
 * becomes `${ROOT}` and home `${HOME}`, which the fixture test replaces with
 * its temp repo; home spelled with dashes, as harness folders name it,
 * becomes `-HOME`. The trimmed copy is checked to label and pass or fail every
 * call exactly as the original does.
 *
 * Usage, from agent-sessions/:
 *   deno run --allow-read --allow-write \
 *     extensions/models/_lib/testdata/sessions/trim.ts <transcript> <out> \
 *     [<subagent transcript> <subagent out>]
 *
 * @module
 */

import { parseTranscript } from "../../claude_code/parse.ts";
import { coverageOf } from "../../classify/coverage.ts";
import { labelCall } from "../../classify/label.ts";

type Json = Record<string, unknown>;

export const ROOT = "${ROOT}";
export const HOME = "${HOME}";
const CANARY = "CANARY";

const KEEP = [
  "type",
  "timestamp",
  "cwd",
  "version",
  "entrypoint",
  "isSidechain",
  "isMeta",
  "sessionId",
  "gitBranch",
  "agentId",
];
const INPUT_KEEP = [
  "command",
  "file_path",
  "notebook_path",
  "skill",
  "url",
  "path",
];
const USAGE_KEEP = [
  "input_tokens",
  "output_tokens",
  "cache_read_input_tokens",
  "cache_creation_input_tokens",
];
const TAG = /^<[\w-]+/;

function obj(v: unknown): Json | undefined {
  return typeof v === "object" && v !== null && !Array.isArray(v)
    ? v as Json
    : undefined;
}

function pick(o: Json, keys: string[]): Json {
  return Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]]));
}

/** Text a person or the model wrote, or a harness tag around it. */
function canary(text: string): string {
  const tag = TAG.exec(text)?.[0];
  return tag ? `${tag}>${CANARY}` : CANARY;
}

function trimResult(b: Json): Json {
  const raw = typeof b.content === "string"
    ? b.content
    : Array.isArray(b.content)
    ? String(obj(b.content[0])?.text ?? "")
    : "";
  const exit = /^Exit code -?\d+/m.exec(raw)?.[0];
  return {
    type: "tool_result",
    tool_use_id: b.tool_use_id,
    ...(b.is_error === true ? { is_error: true } : {}),
    content: exit ? `${exit}\n${CANARY}` : CANARY,
  };
}

function trimContent(content: unknown): unknown {
  if (typeof content === "string") return canary(content);
  if (!Array.isArray(content)) return content;
  return content.flatMap((block) => {
    const b = obj(block);
    if (!b) return [];
    if (b.type === "text") {
      return [{ type: "text", text: canary(String(b.text)) }];
    }
    if (b.type === "tool_result") return [trimResult(b)];
    if (b.type === "tool_use") {
      return [{
        type: "tool_use",
        id: b.id,
        name: b.name,
        input: pick(obj(b.input) ?? {}, INPUT_KEEP),
      }];
    }
    return [];
  });
}

function trimRecord(record: Json): Json | undefined {
  if (record.type !== "user" && record.type !== "assistant") return undefined;
  const out = pick(record, KEEP);
  const origin = obj(record.origin);
  if (origin?.kind !== undefined) out.origin = { kind: origin.kind };
  const agentId = obj(record.toolUseResult)?.agentId;
  if (typeof agentId === "string") out.toolUseResult = { agentId };
  const message = obj(record.message);
  if (message) {
    const usage = obj(message.usage);
    out.message = {
      ...pick(message, ["id", "model", "role"]),
      ...(usage ? { usage: pick(usage, USAGE_KEEP) } : {}),
      content: trimContent(message.content),
    };
  }
  return out;
}

/** Trims one transcript, with its cwd and home as placeholders. */
export function trim(text: string, cwd: string, home: string): string {
  const lines: string[] = [];
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    const record = trimRecord(JSON.parse(line));
    if (!record) continue;
    lines.push(
      JSON.stringify(record).replaceAll(cwd, ROOT).replaceAll(home, HOME)
        // The harness's folders name the home path with dashes.
        .replaceAll(home.replaceAll("/", "-"), "-HOME"),
    );
  }
  return lines.join("\n") + "\n";
}

function cwdOf(text: string): string {
  for (const line of text.split("\n")) {
    try {
      const cwd = JSON.parse(line).cwd;
      if (typeof cwd === "string") return cwd;
    } catch {
      // not a record
    }
  }
  throw new Error("transcript names no cwd");
}

/** Every call's label, category and outcome, to compare original and copy. */
function labels(text: string, root: string, sidechain: boolean): string[] {
  // Coverage that matters to some fixture, so its rules are compared too.
  const coverage = coverageOf(["@swamp/git", "@swamp/deno-runner"]);
  return parseTranscript(text, {
    sidechain,
    redact: {},
    root,
    label: (tool, input) => labelCall(tool, input, { root, coverage }),
  }).turns.flatMap((t) =>
    t.calls.map((c) => `${t.n} ${c.label} ${c.category} ${c.ok}`)
  );
}

async function trimFile(
  source: string,
  out: string,
  home: string,
  sidechain: boolean,
  cwd?: string,
): Promise<string> {
  const text = await Deno.readTextFile(source);
  const root = cwd ?? cwdOf(text);
  const trimmed = trim(text, root, home);
  const before = labels(text, root, sidechain);
  const after = labels(
    trimmed.replaceAll(ROOT, root).replaceAll(HOME, home),
    root,
    sidechain,
  );
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    throw new Error(`${source}: the trimmed copy labels differently`);
  }
  await Deno.writeTextFile(out, trimmed);
  console.log(`${out}: ${before.length} calls`);
  return root;
}

if (import.meta.main) {
  const [source, out, subSource, subOut] = Deno.args;
  const home = Deno.env.get("HOME");
  if (!source || !out || !home) {
    console.error("usage: trim.ts <transcript> <out> [<subagent> <out>]");
    Deno.exit(2);
  }
  const root = await trimFile(source, out, home, false);
  if (subSource && subOut) await trimFile(subSource, subOut, home, true, root);
}
