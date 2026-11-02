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
import type { Repo, RepoResolver, Resolved } from "../sessions/resolve.ts";
import {
  isFileGone,
  NoTranscriptsError,
  Placer,
  type TranscriptHead,
} from "../sessions/place.ts";

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

/** The transcript root: CLAUDE_CONFIG_DIR/projects, else ~/.claude/projects. */
export function defaultProjectsDir(
  env: { get(key: string): string | undefined },
  home: string | undefined,
): string | undefined {
  const config = env.get("CLAUDE_CONFIG_DIR");
  if (config) return join(config, "projects");
  return home ? join(home, ".claude", "projects") : undefined;
}

// The cwd is on every user and assistant record, after its message, so the
// first such record is read whole. A first record can hold a large pasted
// image, so whole lines are read, up to a bound, rather than a fixed head.
const HEAD_CHUNK = 64 * 1024;
const HEAD_LIMIT = 32 * 1024 * 1024;

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
    throw new NoTranscriptsError(host, [options.projectsDir]);
  }

  const seen = new Set<string>();
  const idOf = (name: string) => name.slice(0, -".jsonl".length);
  const placer = new Placer({
    resolver: options.resolver,
    mayHold: options.mayHold,
    readHead: transcriptHead,
    ...(options.knownResolved ? { knownResolved: options.knownResolved } : {}),
  });

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
      seen.add(idOf(entry.name).toLowerCase());
      // Claude Code's cleanup can delete a transcript mid-scan: skip that one
      // file, not the whole import.
      await placer.add(idOf(entry.name), join(projectDir, entry.name));
    }
  }

  const { placed, unresolved } = await placer.place();
  const found: DiscoveredSession[] = [];
  for (const p of placed) {
    if (!options.selects(p.place)) continue;
    try {
      const sessionId = p.id;
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
        repo: p.place.repo,
        root: p.place.root,
        subagents,
        fingerprint: await fingerprintOf(p.transcript, subagents),
      });
    } catch (error) {
      placer.gone(p.id, error);
    }
  }
  return {
    sessions: found.sort((a, b) => a.sessionId.localeCompare(b.sessionId)),
    resolved: placer.resolved,
    unresolved,
    unreadable: placer.unreadable,
    seen,
  };
}
