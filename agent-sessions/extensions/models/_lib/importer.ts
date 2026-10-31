/**
 * The import: finds the Claude Code sessions of the repos it is asked for, turns each one and its
 * subagents into agent session records (v2, swamp-club#4178), and writes them
 * as repo data. A session whose transcript and subagent files are unchanged
 * since the last import is skipped, so re-running is cheap and adds no
 * versions; a changed one is rewritten in place under the same data name.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { join, resolve } from "jsr:@std/path@1.1.4";
import {
  AGENT_SESSION_LIMITS,
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
  checkoutKey,
  type DiscoveredSession,
  discoverSessions,
  expandHome,
  identityKey,
} from "./claude_code/discover.ts";
import {
  gitFound,
  isPathLike,
  normalizeRemote,
  prefixUnder,
  RepoResolver,
  type Resolved,
} from "./claude_code/resolve.ts";
import { linkSubagents } from "./claude_code/subagents.ts";
import type { RedactContext } from "./redact.ts";
import type { SwampIdentity, WhoamiResult } from "./whoami.ts";

/** Data name of the index of imported source files. */
export const IMPORT_INDEX_NAME = "import-index";

/** The tag naming a session's repo, so a list can filter by it. */
export const REPO_TAG = "repo";

// Bumped when how a directory resolves to a repo changes, which drops the
// index's resolved transcripts.
const RESOLVE_FORMAT = 3;

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
   * Each transcript's repo: a hash of its path, never the path, mapped to its
   * size and mtime and a key of its repo's identity, never the identity, so
   * the next scan skips reading one whose repo is not imported. Valid only
   * for the transcript root and resolve format in `resolvedKey`.
   */
  resolved: z.record(z.string(), z.string()).optional(),
  resolvedKey: z.string().optional(),
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
  /** The repo the import runs in; its sessions are always imported. */
  readonly repoDir: string;
  readonly projectsDir: string;
  /** Other repos whose sessions to import, as paths. */
  readonly repos: readonly string[];
  /** Import every session whose repo can be found. */
  readonly all: boolean;
  /** Repos to leave out, as paths or remotes. */
  readonly exclude: readonly string[];
  /** Globs over removed worktrees; `<repo>` stands for a repo's directory name. */
  readonly worktreeGlobs: readonly string[];
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
  /** Sessions whose repo could not be found. */
  readonly unresolved: number;
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
    root: session.root,
  });
  const subagents = [];
  for (const source of session.subagents) {
    subagents.push({
      source,
      parsed: parseTranscript(await Deno.readTextFile(source.transcript), {
        sidechain: true,
        redact,
        root: session.root,
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

  const base = {
    repo: recordRepo(session.repo.identity),
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

/**
 * A repo identity as the record holds it: one over the record's name limit
 * keeps its end, the part that tells repos apart.
 */
export function recordRepo(identity: string): string {
  const max = AGENT_SESSION_LIMITS.nameLength;
  return identity.length <= max ? identity : "…" + identity.slice(-(max - 1));
}

/** What to import: which repos, which to leave out. */
interface Selection {
  readonly selects: (resolved: Resolved) => boolean;
  readonly mayHold: (identityKey: string, checkoutKey: string) => boolean;
}

/**
 * Resolves the repo the import runs in, each of `repos` and each of
 * `exclude` to repo identities. A `repos` path that is not a git repo is
 * reported and left out; excluding the repo the import runs in is an error.
 */
async function selection(
  settings: ImportSettings,
  resolver: RepoResolver,
  ctx: ImportContext,
): Promise<Selection> {
  const pathOf = (entry: string) =>
    resolve(settings.repoDir, expandHome(entry, settings.home));
  const run = await resolver.resolveDir(settings.repoDir);
  const noGit = typeof run === "string" && !(await gitFound());
  if (noGit) {
    ctx.logger.warn(
      "git is not on PATH: only sessions at or below this repo's path are imported",
    );
  } else if (
    typeof run === "string" && await exists(join(settings.repoDir, ".git"))
  ) {
    // A git repo git could not read (it timed out, or refused the folder):
    // taken as a plain folder, it would import almost nothing.
    throw new Error(
      `git did not answer for ${
        resolver.display(settings.repoDir)
      }, which is a git repo; try the import again`,
    );
  }

  // A swamp repo that is not a git repo (or with no git to ask) is a repo by
  // its path.
  const runPlace = typeof run === "string"
    ? { repo: resolver.addPlain(settings.repoDir), prefix: "" }
    : run;
  if (typeof run !== "string") resolver.addAnchor(run);
  const targets = [{
    identity: runPlace.repo.identity,
    mainCheckout: runPlace.repo.mainCheckout,
    prefix: runPlace.prefix,
  }];
  for (const entry of settings.repos) {
    const r = await resolver.resolveDir(pathOf(entry));
    if (typeof r === "string") {
      ctx.logger.warn(
        `repos: ${resolver.display(pathOf(entry))} is ${
          r === "gone" ? "not there" : "not a git repo"
        }; left out`,
      );
      continue;
    }
    resolver.addAnchor(r);
    targets.push({
      identity: r.repo.identity,
      mainCheckout: r.repo.mainCheckout,
      prefix: r.prefix,
    });
  }
  const excluded = new Set<string>();
  for (const entry of settings.exclude) {
    let identity: string;
    if (isPathLike(entry)) {
      const r = await resolver.resolveDir(pathOf(entry));
      if (r === "gone") {
        ctx.logger.warn(
          `exclude: ${resolver.display(pathOf(entry))} is not there`,
        );
      }
      // A bare repo is excluded as its clones name it, without `.git`.
      identity = typeof r === "string"
        ? resolver.display(pathOf(entry).replace(/\.git$/, ""))
        : r.repo.identity;
    } else {
      identity = normalizeRemote(entry);
    }
    if (identity === runPlace.repo.identity) {
      throw new Error(
        `exclude names ${identity}, the repo this import runs in; its sessions are always imported`,
      );
    }
    excluded.add(identity);
  }
  if (settings.all && settings.repos.length > 0) {
    ctx.logger.info("all imports every repo; repos adds nothing");
  }
  const targetKeys = new Set(
    await Promise.all(targets.map((t) => identityKey(t.identity))),
  );
  const targetCheckouts = new Set(
    await Promise.all(targets.map((t) => checkoutKey(t.mainCheckout))),
  );
  const excludedKeys = new Set(
    await Promise.all([...excluded].map((i) => identityKey(i))),
  );
  return {
    selects: (r) =>
      !excluded.has(r.repo.identity) &&
      (settings.all ||
        targets.some((t) =>
          t.identity === r.repo.identity && prefixUnder(r.prefix, t.prefix)
        )),
    mayHold: (key, checkout) =>
      !excludedKeys.has(key) &&
      (settings.all || targetKeys.has(key) || targetCheckouts.has(checkout)),
  };
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
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

/** Imports the Claude Code sessions of the selected repos. */
export async function importSessions(
  ctx: ImportContext,
  settings: ImportSettings,
): Promise<{ dataHandles: DataHandle[]; summary: ImportSummary }> {
  const index = await readIndex(ctx);
  const resolver = new RepoResolver(settings.home, settings.worktreeGlobs);
  const { selects, mayHold } = await selection(settings, resolver, ctx);
  // A transcript's repo does not depend on which repos are imported, so only
  // a new transcript root or resolve format drops what is known. The key is
  // a hash, so the index never holds the path itself.
  const resolvedKey = await sha256(
    JSON.stringify([settings.projectsDir, RESOLVE_FORMAT]),
  );
  const { sessions, resolved, unresolved, unreadable, seen } =
    await discoverSessions(
      {
        projectsDir: settings.projectsDir,
        resolver,
        selects,
        mayHold,
        ...(settings.since ? { since: settings.since } : {}),
        ...(index.resolvedKey === resolvedKey && index.resolved
          ? { knownResolved: new Map(Object.entries(index.resolved)) }
          : {}),
      },
    );
  if (sessions.length === 0) {
    ctx.logger.warn(
      `No Claude Code sessions for the selected repos under ${settings.projectsDir}`,
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
  const nextResolved = Object.fromEntries(resolved);
  const nextIndex: ImportIndex = {
    version: 1,
    sessions: { ...index.sessions },
    resolved: nextResolved,
    resolvedKey,
    children: { ...index.children },
  };
  const resolvedChanged = index.resolvedKey !== resolvedKey ||
    !sameRecord(index.resolved, nextResolved);
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
                [REPO_TAG]: record.repo,
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
  // but its index entries go. One only left out by this run's repos, all or
  // exclude keeps them, so a wider run later does not rewrite it. A
  // since-limited scan does not see every session, so it prunes nothing.
  if (!settings.since) {
    for (const id of Object.keys(nextIndex.sessions)) {
      // A session whose files could not be read this time may well be back.
      if (!seen.has(id) && !unreadable.has(id)) {
        delete nextIndex.sessions[id];
        delete nextIndex.children![id];
      }
    }
  }
  const childrenChanged = JSON.stringify(index.children ?? {}) !==
    JSON.stringify(nextIndex.children);
  if (
    !sameRecord(index.sessions, nextIndex.sessions) || resolvedChanged ||
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
    unresolved,
    subagents,
  };
  ctx.logger.info(
    `Imported ${imported} of ${sessions.length} sessions (${subagents} subagents); ${summary.unchanged} unchanged, ${skipped} skipped` +
      (unresolved > 0
        ? `; ${unresolved} sessions skipped whose repo could not be found`
        : ""),
  );
  return { dataHandles, summary };
}
