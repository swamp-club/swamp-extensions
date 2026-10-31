/**
 * Finds the Claude Code sessions to import. Claude Code files a session under
 * a folder named after its working directory, but the naming loses
 * information (every non-alphanumeric character becomes `-`), so a session's
 * repo rests only on the `cwd` its own records carry, resolved to a repo by
 * {@link RepoResolver}. A directory name alone is never enough: two repos can
 * share one.
 *
 * @module
 */

import { basename, join } from "jsr:@std/path@1.1.4";
import { listSubagents, type SubagentSource } from "./subagents.ts";
import type { Repo, RepoResolver, Resolved } from "./resolve.ts";

/** How the importer finds transcripts and decides which to import. */
export interface DiscoverOptions {
  readonly projectsDir: string;
  readonly resolver: RepoResolver;
  /** Whether a resolved session is one to import. */
  readonly selects: (resolved: Resolved) => boolean;
  /**
   * Whether any session of the repo with this identity key, or main checkout
   * key, could be imported; false lets a transcript already resolved go
   * unread. The checkout key catches a repo whose identity changed since (a
   * remote added), which the identity key alone would hide.
   */
  readonly mayHold: (identityKey: string, checkoutKey: string) => boolean;
  /** Skip sessions whose transcript and subagents all changed before this. */
  readonly since?: Date;
  /**
   * Transcripts already resolved, as the hash of their path mapped to their
   * size and mtime and the keys of their repo's identity, main checkout and
   * directory name, so their heads are not read again.
   */
  readonly knownResolved?: ReadonlyMap<string, string>;
}

/** What a scan found: the sessions to import, and every transcript resolved. */
export interface DiscoveryResult {
  readonly sessions: DiscoveredSession[];
  /** Every transcript resolved for good, hashed path to stamp and identity key, for the next scan. */
  readonly resolved: Map<string, string>;
  /** Sessions whose repo could not be found: not a git folder, or a repo that is gone. */
  readonly unresolved: number;
  /** Session ids whose files could not be read this scan; not proof they are gone. */
  readonly unreadable: Set<string>;
  /** Every session id with a transcript under the root, imported or not. */
  readonly seen: Set<string>;
}

/** One session found on disk. */
export interface DiscoveredSession {
  /** Claude Code's session id, from the file name. */
  readonly sessionId: string;
  readonly transcript: string;
  /** The session's folder of subagents and tool results. */
  readonly sessionDir: string;
  readonly cwd: string;
  /** The repo the session ran in. */
  readonly repo: Repo;
  /** The session's worktree root, which its paths are made relative to. */
  readonly root: string;
  readonly subagents: readonly SubagentSource[];
  /** Size and mtime of the transcript and every subagent file. */
  readonly fingerprint: string;
}

/** The error a host with no Claude Code transcripts gets. */
export class NoTranscriptsError extends Error {
  constructor(host: string, projectsDir: string) {
    super(
      `No Claude Code transcripts on ${host}: ${projectsDir} does not exist. ` +
        "Import must run on the machine that holds the transcripts; a serve " +
        "worker (--remote-only) has none. Pass projectsDir if they live elsewhere.",
    );
    this.name = "NoTranscriptsError";
  }
}

/** The transcript root: CLAUDE_CONFIG_DIR/projects, else ~/.claude/projects. */
export function defaultProjectsDir(
  env: { get(key: string): string | undefined },
  home: string | undefined,
): string | undefined {
  const config = env.get("CLAUDE_CONFIG_DIR");
  if (config) return join(config, "projects");
  return home ? join(home, ".claude", "projects") : undefined;
}

/** Expands a leading `~` in a path or glob. */
export function expandHome(pattern: string, home: string | undefined): string {
  if (home && (pattern === "~" || pattern.startsWith("~/"))) {
    return home + pattern.slice(1);
  }
  return pattern;
}

// The cwd is on every user and assistant record, after its message, so the
// first such record is read whole. A first record can hold a large pasted
// image, so whole lines are read, up to a bound, rather than a fixed head.
const HEAD_CHUNK = 64 * 1024;
const HEAD_LIMIT = 32 * 1024 * 1024;

/** Where and on which branch a session ran, from its first records. */
export interface TranscriptHead {
  readonly cwd?: string;
  readonly gitBranch?: string;
}

function headFrom(line: string): TranscriptHead | undefined {
  if (!line.includes('"cwd"')) return undefined;
  try {
    const record = JSON.parse(line);
    if (typeof record?.cwd !== "string" || record.cwd === "") return undefined;
    return {
      cwd: record.cwd,
      ...(typeof record.gitBranch === "string" && record.gitBranch !== ""
        ? { gitBranch: record.gitBranch }
        : {}),
    };
  } catch {
    return undefined;
  }
}

/**
 * The cwd and branch of the first record with a top-level cwd. Only whole
 * lines are parsed, so a cwd nested inside a record's content never counts.
 */
export async function transcriptHead(path: string): Promise<TranscriptHead> {
  const file = await Deno.open(path, { read: true });
  try {
    const decoder = new TextDecoder();
    const buf = new Uint8Array(HEAD_CHUNK);
    let pending = "";
    // Where the newline search resumes, so a long line is scanned once.
    let searched = 0;
    let read = 0;
    while (read < HEAD_LIMIT) {
      const n = await file.read(buf);
      if (n === null) break;
      read += n;
      pending += decoder.decode(buf.subarray(0, n), { stream: true });
      let newline = pending.indexOf("\n", searched);
      while (newline >= 0) {
        const head = headFrom(pending.slice(0, newline));
        if (head) return head;
        pending = pending.slice(newline + 1);
        newline = pending.indexOf("\n");
      }
      searched = pending.length;
    }
    // A last line with no newline.
    return (read < HEAD_LIMIT ? headFrom(pending) : undefined) ?? {};
  } finally {
    file.close();
  }
}

/** A short hash of a transcript path, so the index never stores its path. */
async function pathKey(path: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(path),
  );
  return Array.from(
    new Uint8Array(digest).subarray(0, 12),
    (b) => b.toString(16).padStart(2, "0"),
  ).join("");
}

/** Whether an error is a file vanishing or unreadable, which skips one file. */
function isFileGone(error: unknown): boolean {
  return error instanceof Deno.errors.NotFound ||
    error instanceof Deno.errors.PermissionDenied;
}

async function fingerprintOf(
  transcript: string,
  subagents: readonly SubagentSource[],
): Promise<string> {
  const parts: string[] = [];
  for (const path of [transcript, ...subagents.map((s) => s.transcript)]) {
    const info = await Deno.stat(path);
    parts.push(`${basename(path)}:${info.size}:${info.mtime?.getTime() ?? 0}`);
  }
  // A meta names a subagent's type and starting call, so one that appears or
  // changes re-imports the session too.
  for (const s of subagents) {
    const meta = s.transcript.replace(/\.jsonl$/, ".meta.json");
    try {
      const info = await Deno.stat(meta);
      parts.push(
        `${basename(meta)}:${info.size}:${info.mtime?.getTime() ?? 0}`,
      );
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) throw error;
    }
  }
  return parts.join(";");
}

/**
 * A short key for a repo identity, so the index does not hold it in plain
 * text. It is unsalted: anyone with the index can test a guessed repo.
 */
export function identityKey(identity: string): Promise<string> {
  return pathKey(`repo:${identity}`);
}

/** A short key for a repo's main checkout path, as {@link identityKey}. */
export function checkoutKey(mainCheckout: string): Promise<string> {
  return pathKey(`checkout:${mainCheckout}`);
}

/** A short key for a repo's directory name, as {@link identityKey}. */
function nameKey(name: string): Promise<string> {
  return pathKey(`name:${name}`);
}

interface Hidden {
  readonly name: string;
  readonly transcript: string;
  readonly nameKey: string;
}

interface Pending {
  readonly name: string;
  readonly transcript: string;
  readonly key: string;
  readonly stamp: string;
  readonly mtime: number;
  readonly cwd: string;
  readonly gitBranch?: string;
}

/** Lists the sessions to import under the transcript root. */
export async function discoverSessions(
  options: DiscoverOptions,
): Promise<DiscoveryResult> {
  try {
    const info = await Deno.stat(options.projectsDir);
    if (!info.isDirectory) throw new Deno.errors.NotFound();
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) throw error;
    let host = "this host";
    try {
      host = Deno.hostname();
    } catch {
      // No --allow-sys; the path alone says enough.
    }
    throw new NoTranscriptsError(host, options.projectsDir);
  }

  const resolved = new Map<string, string>();
  const unreadable = new Set<string>();
  const seen = new Set<string>();
  const idOf = (name: string) => name.slice(0, -".jsonl".length);
  const gone = (name: string, error: unknown) => {
    if (!isFileGone(error)) throw error;
    unreadable.add(idOf(name).toLowerCase());
  };

  // First every head, then every live directory, then the gone ones: a
  // removed worktree resolves only against repos this scan has found.
  const pending: Pending[] = [];
  // Transcripts the cache let go unread, kept in case a gone worktree needs
  // their repo to be known.
  const hidden: Hidden[] = [];
  for await (const project of Deno.readDir(options.projectsDir)) {
    if (!project.isDirectory) continue;
    const projectDir = join(options.projectsDir, project.name);
    let entries: Deno.DirEntry[];
    try {
      entries = await Array.fromAsync(Deno.readDir(projectDir));
    } catch (error) {
      if (isFileGone(error)) continue;
      throw error;
    }
    for (const entry of entries) {
      if (!entry.isFile || !entry.name.endsWith(".jsonl")) continue;
      const transcript = join(projectDir, entry.name);
      seen.add(idOf(entry.name).toLowerCase());
      // Claude Code's cleanup can delete a transcript mid-scan: skip that one
      // file, not the whole import.
      try {
        const info = await Deno.stat(transcript);
        const stamp = `${info.size}:${info.mtime?.getTime() ?? 0}`;
        const key = await pathKey(transcript);
        const known = options.knownResolved?.get(key);
        if (known?.startsWith(`${stamp}|`)) {
          const [identity, checkout, name] = known.slice(stamp.length + 1)
            .split("|");
          if (
            identity && checkout && name && !options.mayHold(identity, checkout)
          ) {
            resolved.set(key, known);
            hidden.push({ name: entry.name, transcript, nameKey: name });
            continue;
          }
        }
        const head = await transcriptHead(transcript);
        // A transcript with no working directory is no session to place.
        if (!head.cwd) continue;
        pending.push({
          name: entry.name,
          transcript,
          key,
          stamp,
          mtime: info.mtime?.getTime() ?? 0,
          cwd: head.cwd,
          ...(head.gitBranch ? { gitBranch: head.gitBranch } : {}),
        });
      } catch (error) {
        gone(entry.name, error);
      }
    }
  }

  const places = new Map<Pending, Resolved>();
  const lost: Pending[] = [];
  for (const p of pending) {
    const r = await options.resolver.resolveDir(p.cwd);
    if (r === "gone") lost.push(p);
    else if (r !== "unresolved") places.set(p, r);
  }
  let unresolved = pending.length - places.size - lost.length;
  // A gone worktree is placed only against every repo it could be, so the
  // repos the cache hid that share a name with it are resolved first;
  // otherwise whether a shared branch is ambiguous would depend on the cache.
  if (lost.length > 0 && hidden.length > 0) {
    let names: Set<string> | "any" = new Set();
    for (const p of lost) {
      const c = options.resolver.candidateNames(p.cwd);
      if (c === "any") {
        names = "any";
        break;
      }
      c.forEach((n) => (names as Set<string>).add(n));
    }
    const keys = names === "any"
      ? undefined
      : new Set(await Promise.all([...names].map(nameKey)));
    for (const h of hidden) {
      if (keys && !keys.has(h.nameKey)) continue;
      try {
        const head = await transcriptHead(h.transcript);
        if (head.cwd) await options.resolver.resolveDir(head.cwd);
      } catch (error) {
        gone(h.name, error);
      }
    }
  }
  for (const p of lost) {
    const r = await options.resolver.resolveGone(p.cwd, p.gitBranch);
    if (r) places.set(p, r);
    else unresolved++;
  }

  const found: DiscoveredSession[] = [];
  for (const [p, place] of places) {
    // Only a verdict no later fetch or remote can change is remembered.
    if (place.settled && !place.repo.byPath) {
      resolved.set(
        p.key,
        [
          p.stamp,
          await identityKey(place.repo.identity),
          await checkoutKey(place.repo.mainCheckout),
          await nameKey(place.repo.name),
        ].join("|"),
      );
    }
    if (!options.selects(place)) continue;
    try {
      const sessionId = idOf(p.name);
      const sessionDir = join(p.transcript, "..", sessionId);
      // A subagent file deleted mid-scan drops only that subagent.
      const subagents = [];
      for (const sub of await listSubagents(sessionDir)) {
        try {
          await Deno.stat(sub.transcript);
          subagents.push(sub);
        } catch (error) {
          if (!isFileGone(error)) throw error;
        }
      }
      if (options.since) {
        // A session is active since `since` if its transcript or any
        // subagent changed since then.
        let newest = p.mtime;
        for (const s of subagents) {
          newest = Math.max(
            newest,
            (await Deno.stat(s.transcript)).mtime?.getTime() ?? 0,
          );
        }
        if (newest < options.since.getTime()) continue;
      }
      found.push({
        sessionId,
        transcript: p.transcript,
        sessionDir,
        cwd: p.cwd,
        repo: place.repo,
        root: place.root,
        subagents,
        fingerprint: await fingerprintOf(p.transcript, subagents),
      });
    } catch (error) {
      gone(p.name, error);
    }
  }
  return {
    sessions: found.sort((a, b) => a.sessionId.localeCompare(b.sessionId)),
    resolved,
    unresolved,
    unreadable,
    seen,
  };
}
