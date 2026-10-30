/**
 * The import: finds this repo's Claude Code sessions, turns each one and its
 * subagents into agent session records (v2, swamp-club#4178), and writes them
 * as repo data. A session whose transcript and subagent files are unchanged
 * since the last import is skipped, so re-running is cheap and adds no
 * versions; a changed one is rewritten in place under the same data name.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { basename } from "jsr:@std/path@1.1.4";
import {
  AGENT_SESSION_SCHEMA_VERSION,
  AGENT_SESSION_USER_ID_TAG,
  agentSessionDataName,
  type AgentSessionRecord,
  AgentSessionRecordV2Schema,
  agentSessionTags,
  type AgentSessionToolCall,
} from "./contract/session_record.ts";
import {
  CLAUDE_CODE_HARNESS,
  type ParsedTranscript,
  parseTranscript,
} from "./claude_code/parse.ts";
import {
  type DiscoveredSession,
  discoverSessions,
} from "./claude_code/discover.ts";
import { linkSubagents } from "./claude_code/subagents.ts";
import type { RedactContext } from "./redact.ts";
import type { SwampIdentity, WhoamiResult } from "./whoami.ts";

/** Data name of the index of imported source files. */
export const IMPORT_INDEX_NAME = "import-index";

/**
 * Each session's import stamp, by session id: the importer version and its
 * source fingerprint (sizes and mtimes). A session is imported again when
 * either changes, so a fix in a later importer reaches finished sessions.
 * A session that could not be imported is stamped too, and is retried only
 * when its files or the importer change.
 */
export const ImportIndexSchema = z.object({
  version: z.literal(1),
  sessions: z.record(z.string(), z.string()),
  /**
   * Transcripts that are not this repo's: a hash of each path, never the
   * path, mapped to its size and mtime, so the next scan skips reading them.
   * Valid only for the repo paths and globs in `othersKey`.
   */
  others: z.record(z.string(), z.string()).optional(),
  othersKey: z.string().optional(),
  /** Each session's subagent record ids, so ones no longer produced are removed. */
  children: z.record(z.string(), z.array(z.string())).optional(),
});
export type ImportIndex = z.infer<typeof ImportIndexSchema>;

/** A handle swamp returns for a written resource. */
export interface DataHandle {
  readonly name: string;
  readonly [key: string]: unknown;
}

/** The parts of a method context the import uses. */
export interface ImportContext {
  readonly logger: {
    info(message: string): void;
    warn(message: string): void;
  };
  writeResource(
    specName: string,
    name: string,
    data: Record<string, unknown>,
    overrides?: { tags?: Record<string, string> },
  ): Promise<DataHandle>;
  readResource(name: string): Promise<Record<string, unknown> | null>;
  /** Removes every version of a stored resource, where the host allows it. */
  deleteResource?(name: string): Promise<void>;
}

/** Where to look and who is importing, resolved by the method. */
export interface ImportSettings {
  readonly repoDir: string;
  readonly projectsDir: string;
  readonly repoPaths: readonly string[];
  readonly worktreeGlobs: readonly string[];
  readonly repoBranches: ReadonlySet<string>;
  readonly since?: Date;
  readonly home?: string;
  readonly importerVersion: string;
  readonly whoami: () => Promise<WhoamiResult>;
}

/** What one import did. */
export interface ImportSummary {
  readonly found: number;
  readonly imported: number;
  readonly unchanged: number;
  readonly skipped: number;
  readonly subagents: number;
}

interface RecordBase {
  readonly id: string;
  readonly repo: string;
  readonly importerVersion: string;
  readonly invocation: AgentSessionRecord["invocation"];
  readonly identity?: SwampIdentity;
  readonly parentSessionId?: string;
  readonly agentId?: string;
  readonly agentType?: string;
}

function buildRecord(
  parsed: ParsedTranscript,
  base: RecordBase,
  fallbackStart: number,
): Record<string, unknown> {
  return {
    schemaVersion: AGENT_SESSION_SCHEMA_VERSION,
    id: base.id,
    repo: base.repo,
    harness: CLAUDE_CODE_HARNESS,
    ...(parsed.harnessVersion ? { harnessVersion: parsed.harnessVersion } : {}),
    ...(parsed.model ? { model: parsed.model } : {}),
    startedAt: new Date(parsed.startedAtMs ?? fallbackStart).toISOString(),
    invocation: base.invocation,
    ...(base.identity
      ? {
        swampUserId: base.identity.swampUserId,
        swampUsername: base.identity.swampUsername,
      }
      : {}),
    ...(base.parentSessionId ? { parentSessionId: base.parentSessionId } : {}),
    ...(base.agentId ? { agentId: base.agentId } : {}),
    ...(base.agentType ? { agentType: base.agentType } : {}),
    importerVersion: base.importerVersion,
    turns: parsed.turns,
    findings: [],
  };
}

/** Names where a record failed the schema, never what it held. */
function describeIssue(error: z.ZodError): string {
  const first = error.issues[0];
  const where = first && first.path.length > 0
    ? first.path.map(String).join(".")
    : "the record";
  return `${first?.code ?? "invalid"} at ${where}`;
}

async function readIndex(ctx: ImportContext): Promise<ImportIndex> {
  const stored = await ctx.readResource(IMPORT_INDEX_NAME);
  const parsed = ImportIndexSchema.safeParse(stored);
  return parsed.success ? parsed.data : { version: 1, sessions: {} };
}

/** Builds and validates a session's records: the session, then its subagents. */
async function sessionRecords(
  session: DiscoveredSession,
  settings: ImportSettings,
  identity: SwampIdentity | undefined,
  ctx: ImportContext,
): Promise<AgentSessionRecord[] | string> {
  const id = session.sessionId.toLowerCase();
  const redact: Omit<RedactContext, "cwd"> = {
    projectsDir: settings.projectsDir,
    ...(settings.home ? { home: settings.home } : {}),
  };
  const mtime = (await Deno.stat(session.transcript)).mtime?.getTime() ??
    Date.now();
  const top = parseTranscript(await Deno.readTextFile(session.transcript), {
    sidechain: false,
    redact,
  });
  const subagents = [];
  for (const source of session.subagents) {
    subagents.push({
      source,
      parsed: parseTranscript(await Deno.readTextFile(source.transcript), {
        sidechain: true,
        redact,
      }),
    });
  }
  const dropped = [top, ...subagents.map((s) => s.parsed)].reduce(
    (n, p) => n + p.droppedCalls,
    0,
  );
  if (dropped > 0) {
    ctx.logger.warn(
      `Session ${id} is over the record's size limits; ${dropped} calls were left out`,
    );
  }
  const linked = await linkSubagents(id, top, subagents);
  for (const agentId of linked.unlinked) {
    ctx.logger.warn(
      `Subagent ${agentId} of session ${id} names no call that started it; linked to the session`,
    );
  }

  const repo = basename(settings.repoDir) || "repo";
  const base = {
    repo,
    importerVersion: settings.importerVersion,
    invocation: top.invocation,
    ...(identity ? { identity } : {}),
  };
  const drafts = new Map<string, Record<string, unknown>>();
  drafts.set(id, buildRecord(top, { ...base, id }, mtime));
  for (const child of linked.children) {
    drafts.set(
      child.id,
      buildRecord(child.parsed, {
        ...base,
        id: child.id,
        parentSessionId: child.parentSessionId,
        agentId: child.source.agentId,
        ...(child.source.agentType
          ? { agentType: child.source.agentType }
          : {}),
      }, mtime),
    );
  }
  // Point each starting call at its child, in whichever session made the call.
  for (const child of linked.children) {
    if (child.callId === undefined) continue;
    const parent = drafts.get(child.parentSessionId);
    const turns = (parent?.turns ?? []) as Array<
      {
        calls: Array<
          {
            -readonly [K in keyof AgentSessionToolCall]:
              AgentSessionToolCall[K];
          }
        >;
      }
    >;
    for (const turn of turns) {
      const call = turn.calls.find((c) => c.id === child.callId);
      if (call && call.toolKind === "subagent") {
        call.subagentSessionId = child.id;
      }
    }
  }

  const records: AgentSessionRecord[] = [];
  for (const [recordId, draft] of drafts) {
    const parsed = AgentSessionRecordV2Schema.safeParse(draft);
    if (!parsed.success) {
      return `record ${recordId}: ${describeIssue(parsed.error)}`;
    }
    records.push(parsed.data);
  }
  return records;
}

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(
    new Uint8Array(digest),
    (b) => b.toString(16).padStart(2, "0"),
  ).join("");
}

/** An I/O failure, which may pass: the session is tried again next import. */
function isIoError(error: unknown): boolean {
  return Object.values(Deno.errors).some((E) => error instanceof E);
}

function sameRecord(
  a: Record<string, string> | undefined,
  b: Record<string, string>,
): boolean {
  const keys = Object.keys(b);
  return a !== undefined && Object.keys(a).length === keys.length &&
    keys.every((k) => a[k] === b[k]);
}

/** Imports this repo's Claude Code sessions. */
export async function importSessions(
  ctx: ImportContext,
  settings: ImportSettings,
): Promise<{ dataHandles: DataHandle[]; summary: ImportSummary }> {
  const index = await readIndex(ctx);
  // Which transcripts are not this repo's depends on where the repo is. The
  // key is a hash, so the index never holds the paths themselves.
  const othersKey = await sha256(JSON.stringify([
    settings.projectsDir,
    [...settings.repoPaths].sort(),
    [...settings.worktreeGlobs].sort(),
  ]));
  const { sessions, others, unreadable } = await discoverSessions({
    repoDir: settings.repoDir,
    projectsDir: settings.projectsDir,
    repoPaths: settings.repoPaths,
    worktreeGlobs: settings.worktreeGlobs,
    repoBranches: settings.repoBranches,
    ...(settings.since ? { since: settings.since } : {}),
    ...(index.othersKey === othersKey && index.others
      ? { knownOthers: new Map(Object.entries(index.others)) }
      : {}),
  });
  if (sessions.length === 0) {
    ctx.logger.warn(
      `No Claude Code sessions for this repo under ${settings.projectsDir}`,
    );
  }

  const stamp = (s: DiscoveredSession) =>
    `${settings.importerVersion}|${s.fingerprint}`;
  const changed = sessions.filter((s) =>
    index.sessions[s.sessionId.toLowerCase()] !== stamp(s)
  );
  const whoami: WhoamiResult = changed.length > 0
    ? await settings.whoami()
    : { kind: "none" };
  if (whoami.kind === "failed") {
    ctx.logger.warn(
      "swamp auth whoami did not answer; sessions keep the identity their last import recorded",
    );
  }
  // When whoami did not answer, a session keeps who its last import named,
  // rather than losing its attribution until its transcript changes again.
  const identityFor = async (
    id: string,
  ): Promise<SwampIdentity | undefined> => {
    if (whoami.kind === "identity") return whoami.identity;
    if (whoami.kind === "none") return undefined;
    const previous = await ctx.readResource(
      agentSessionDataName(CLAUDE_CODE_HARNESS, id),
    );
    const userId = previous?.swampUserId;
    const username = previous?.swampUsername;
    return typeof userId === "string" && typeof username === "string"
      ? { swampUserId: userId, swampUsername: username }
      : undefined;
  };

  const dataHandles: DataHandle[] = [];
  let imported = 0;
  let skipped = 0;
  let subagents = 0;
  const nextOthers = Object.fromEntries(others);
  const nextIndex: ImportIndex = {
    version: 1,
    sessions: { ...index.sessions },
    others: nextOthers,
    othersKey,
    children: { ...index.children },
  };
  const othersChanged = index.othersKey !== othersKey ||
    !sameRecord(index.others, nextOthers);
  for (const session of changed) {
    const id = session.sessionId.toLowerCase();
    let records: AgentSessionRecord[] | string;
    let identity: SwampIdentity | undefined;
    try {
      agentSessionDataName(CLAUDE_CODE_HARNESS, id);
      identity = await identityFor(id);
      records = await sessionRecords(session, settings, identity, ctx);
    } catch (error) {
      if (isIoError(error)) {
        // A read that failed may work next time: leave the stamp as it was.
        skipped++;
        ctx.logger.warn(
          `Could not read session ${id}, will retry: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
        continue;
      }
      records = error instanceof Error ? error.message : String(error);
    }
    if (typeof records === "string") {
      // Stamped, so it is retried only when its files or the importer change.
      skipped++;
      nextIndex.sessions[id] = stamp(session);
      ctx.logger.warn(`Skipped session ${id}: ${records}`);
      continue;
    }
    // A subagent relinked under another parent gets a new id; remove the
    // record its old id left behind, and any whose transcript is gone. A
    // stale id the host cannot delete stays in the index for a later try.
    const childIds = records.slice(1).map((r) => r.id);
    const kept: string[] = [];
    try {
      for (const record of records) {
        dataHandles.push(
          await ctx.writeResource(
            "session",
            agentSessionDataName(CLAUDE_CODE_HARNESS, record.id),
            record as unknown as Record<string, unknown>,
            {
              tags: {
                ...agentSessionTags(record),
                ...(identity
                  ? { [AGENT_SESSION_USER_ID_TAG]: identity.swampUserId }
                  : {}),
              },
            },
          ),
        );
      }
      for (const stale of index.children?.[id] ?? []) {
        if (childIds.includes(stale)) continue;
        if (ctx.deleteResource) {
          await ctx.deleteResource(
            agentSessionDataName(CLAUDE_CODE_HARNESS, stale),
          );
        } else {
          kept.push(stale);
        }
      }
    } catch (error) {
      // Not stamped, so the next import writes it again; the sessions
      // already written this run keep their stamps.
      skipped++;
      ctx.logger.warn(
        `Could not write session ${id}, will retry: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      continue;
    }
    const tracked = [...childIds, ...kept];
    if (tracked.length > 0) nextIndex.children![id] = tracked;
    else delete nextIndex.children![id];
    imported++;
    subagents += records.length - 1;
    // Written with no identity only because whoami did not answer: stamped
    // apart, so the next import, with whoami answering, attributes it.
    nextIndex.sessions[id] = whoami.kind === "failed" && !identity
      ? `${stamp(session)}|unattributed`
      : stamp(session);
  }
  // A session whose transcript is gone keeps its records, the lasting copy,
  // but its index entries go. A since-limited scan does not see every
  // session, so it prunes nothing.
  if (!settings.since) {
    const found = new Set(sessions.map((s) => s.sessionId.toLowerCase()));
    for (const id of Object.keys(nextIndex.sessions)) {
      // A session whose files could not be read this time may well be back.
      if (!found.has(id) && !unreadable.has(id)) {
        delete nextIndex.sessions[id];
        delete nextIndex.children![id];
      }
    }
  }
  const childrenChanged = JSON.stringify(index.children ?? {}) !==
    JSON.stringify(nextIndex.children);
  if (
    !sameRecord(index.sessions, nextIndex.sessions) || othersChanged ||
    childrenChanged
  ) {
    dataHandles.push(
      await ctx.writeResource("importIndex", IMPORT_INDEX_NAME, nextIndex),
    );
  }

  const summary: ImportSummary = {
    found: sessions.length,
    imported,
    unchanged: sessions.length - changed.length,
    skipped,
    subagents,
  };
  ctx.logger.info(
    `Imported ${imported} of ${sessions.length} sessions (${subagents} subagents); ${summary.unchanged} unchanged, ${skipped} skipped`,
  );
  return { dataHandles, summary };
}
