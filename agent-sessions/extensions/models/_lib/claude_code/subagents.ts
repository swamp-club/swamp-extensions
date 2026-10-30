/**
 * Subagents of a Claude Code session. Claude Code writes each subagent to
 * `<session id>/subagents/agent-<agent id>.jsonl`, with a `.meta.json` beside
 * it naming the subagent type and the tool-use id of the call that started
 * it. A subagent can start subagents of its own; they land in the same
 * folder, and the call that started each one is found among every session's
 * calls, so nesting needs no special case. The brief a parent hands a
 * subagent, and its description, are never read into a record.
 *
 * @module
 */

import { join } from "jsr:@std/path@1.1.4";
import { agentSessionChildId } from "../contract/session_record.ts";
import type { ParsedTranscript } from "./parse.ts";

/** One subagent's files and what its meta says. */
export interface SubagentSource {
  readonly agentId: string;
  readonly transcript: string;
  readonly agentType?: string;
  /** Tool-use id of the call that started it, from its meta. */
  readonly toolUseId?: string;
}

const AGENT_FILE = /^agent-(.+)\.jsonl$/;

/** Lists a session's subagent transcripts, sorted by agent id. */
export async function listSubagents(
  sessionDir: string,
): Promise<SubagentSource[]> {
  const dir = join(sessionDir, "subagents");
  const found: SubagentSource[] = [];
  try {
    for await (const entry of Deno.readDir(dir)) {
      const m = entry.isFile ? AGENT_FILE.exec(entry.name) : null;
      if (!m) continue;
      const agentId = m[1];
      let agentType: string | undefined;
      let toolUseId: string | undefined;
      try {
        const meta = JSON.parse(
          await Deno.readTextFile(join(dir, `agent-${agentId}.meta.json`)),
        );
        if (typeof meta?.agentType === "string" && meta.agentType !== "") {
          agentType = meta.agentType.slice(0, 200);
        }
        if (typeof meta?.toolUseId === "string" && meta.toolUseId !== "") {
          toolUseId = meta.toolUseId;
        }
      } catch {
        // No meta, or an unreadable one: the parent's result can still name it.
      }
      found.push({
        agentId,
        transcript: join(dir, entry.name),
        ...(agentType ? { agentType } : {}),
        ...(toolUseId ? { toolUseId } : {}),
      });
    }
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) throw error;
  }
  return found.sort((a, b) => a.agentId.localeCompare(b.agentId));
}

/** A parsed subagent, placed under the session that started it. */
export interface LinkedSubagent {
  readonly source: SubagentSource;
  readonly parsed: ParsedTranscript;
  /** The child's record id, from `agentSessionChildId`. */
  readonly id: string;
  readonly parentSessionId: string;
  /** The parent's call that started it; absent when no call names it. */
  readonly callId?: string;
}

export interface LinkResult {
  readonly children: LinkedSubagent[];
  /** Agent ids no call in any session started; linked to the top-level session. */
  readonly unlinked: string[];
}

/**
 * Places every subagent under the session whose call started it: the call
 * whose id is the meta's `toolUseId`, or, without a meta, the call whose
 * result named the agent id. Ids are built top-down, since a child's id
 * hashes its parent's.
 */
export async function linkSubagents(
  topId: string,
  top: ParsedTranscript,
  subagents: ReadonlyArray<
    { readonly source: SubagentSource; readonly parsed: ParsedTranscript }
  >,
): Promise<LinkResult> {
  // Which session (top, or a subagent by agent id) holds each call id.
  const owner = new Map<string, string | null>();
  const callsOf = (p: ParsedTranscript) =>
    p.turns.flatMap((t) => t.calls.map((c) => c.id));
  for (const id of callsOf(top)) owner.set(id, null);
  for (const s of subagents) {
    for (const id of callsOf(s.parsed)) {
      if (!owner.has(id)) owner.set(id, s.source.agentId);
    }
  }
  // A call's result can name the agent it started, for subagents without a meta.
  const startedBy = new Map<string, string>();
  for (const p of [top, ...subagents.map((s) => s.parsed)]) {
    for (const [callId, agentId] of p.agentIdsByCall) {
      if (!startedBy.has(agentId)) startedBy.set(agentId, callId);
    }
  }

  const byAgent = new Map(subagents.map((s) => [s.source.agentId, s]));
  const ids = new Map<string, string>();
  const unlinked: string[] = [];
  const children: LinkedSubagent[] = [];

  const resolve = async (
    agentId: string,
    seen: Set<string>,
  ): Promise<string> => {
    const known = ids.get(agentId);
    if (known) return known;
    seen.add(agentId);
    const s = byAgent.get(agentId)!;
    const callId = s.source.toolUseId ?? startedBy.get(agentId);
    const owned = callId === undefined ? undefined : owner.get(callId);
    // A link back to itself or round a loop is malformed: treat it as unlinked,
    // so each subagent is placed exactly once.
    const parentAgent = owned !== undefined && owned !== null && seen.has(owned)
      ? undefined
      : owned;
    let parentId = topId;
    if (callId === undefined || parentAgent === undefined) {
      unlinked.push(agentId);
    } else if (parentAgent !== null) {
      parentId = await resolve(parentAgent, seen);
    }
    const again = ids.get(agentId);
    if (again) return again;
    const id = await agentSessionChildId(parentId, agentId);
    ids.set(agentId, id);
    children.push({
      source: s.source,
      parsed: s.parsed,
      id,
      parentSessionId: parentId,
      ...(callId !== undefined && parentAgent !== undefined ? { callId } : {}),
    });
    return id;
  };

  for (const s of subagents) await resolve(s.source.agentId, new Set());
  return { children, unlinked };
}
