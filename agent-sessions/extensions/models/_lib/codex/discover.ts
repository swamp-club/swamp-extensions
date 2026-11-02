/**
 * Finds the Codex sessions to import (swamp-club#4158). Codex writes one
 * rollout per thread under `sessions/YYYY/MM/DD/`; a subagent is a thread of
 * its own, whose first `session_meta` names its parent thread. A top-level
 * session is placed in a repo by the cwd and branch its rollout names, with
 * the shared {@link Placer}; each subagent goes with the session at the top
 * of its chain of parents.
 *
 * @module
 */

import { basename, join } from "jsr:@std/path@1.1.4";
import type { Repo, RepoResolver, Resolved } from "../sessions/resolve.ts";
import { isFileGone, Placer, type TranscriptHead } from "../sessions/place.ts";
import { metaOf, type RolloutMeta } from "./parse.ts";

export interface CodexDiscoverOptions {
  /** Codex's rollout root: `sessions` under CODEX_HOME. */
  readonly sessionsDir: string;
  readonly resolver: RepoResolver;
  readonly selects: (resolved: Resolved) => boolean;
  readonly mayHold: (identityKey: string, checkoutKey: string) => boolean;
  /** Skip sessions whose rollouts all changed before this. */
  readonly since?: Date;
  readonly knownResolved?: ReadonlyMap<string, string>;
}

/** A subagent's rollout. */
export interface CodexChild {
  readonly threadId: string;
  readonly transcript: string;
  readonly parentThreadId: string;
  readonly agentPath?: string;
  readonly agentRole?: string;
}

/** One top-level Codex session found on disk, with every subagent below it. */
export interface CodexSession {
  readonly sessionId: string;
  readonly transcript: string;
  readonly cwd: string;
  readonly repo: Repo;
  readonly root: string;
  readonly children: readonly CodexChild[];
  /** Size and mtime of the session's rollout and every subagent's. */
  readonly fingerprint: string;
}

export interface CodexDiscoveryResult {
  readonly sessions: CodexSession[];
  readonly resolved: Map<string, string>;
  /** Sessions whose repo could not be found, and subagents whose top session is not on disk. */
  readonly unresolved: number;
  readonly unreadable: Set<string>;
  /** Every top-level session id with a rollout under the root. */
  readonly seen: Set<string>;
}

// session_meta is the first line, about 20 KB with Codex's base
// instructions; a longer one is not a rollout this importer knows.
const HEAD_CHUNK = 64 * 1024;
const HEAD_LIMIT = 4 * 1024 * 1024;

/** The rollout's own `session_meta`, from its first line. */
export async function rolloutHead(
  path: string,
): Promise<RolloutMeta | undefined> {
  const file = await Deno.open(path, { read: true });
  try {
    const decoder = new TextDecoder();
    const buf = new Uint8Array(HEAD_CHUNK);
    let line = "";
    let read = 0;
    while (read < HEAD_LIMIT) {
      const n = await file.read(buf);
      if (n === null) break;
      read += n;
      line += decoder.decode(buf.subarray(0, n), { stream: true });
      const newline = line.indexOf("\n");
      if (newline >= 0) {
        line = line.slice(0, newline);
        break;
      }
    }
    try {
      const record = JSON.parse(line);
      return record?.type === "session_meta" &&
          typeof record.payload === "object" && record.payload !== null
        ? metaOf(record.payload)
        : undefined;
    } catch {
      return undefined;
    }
  } finally {
    file.close();
  }
}

async function rollouts(dir: string): Promise<string[]> {
  const found: string[] = [];
  const walk = async (d: string, depth: number) => {
    let entries: Deno.DirEntry[];
    try {
      entries = await Array.fromAsync(Deno.readDir(d));
    } catch (error) {
      if (isFileGone(error)) return;
      throw error;
    }
    for (const e of entries) {
      if (e.isDirectory && depth < 3) await walk(join(d, e.name), depth + 1);
      else if (
        e.isFile && depth === 3 && e.name.startsWith("rollout-") &&
        e.name.endsWith(".jsonl")
      ) {
        found.push(join(d, e.name));
      }
    }
  };
  await walk(dir, 0);
  return found.sort();
}

async function fingerprintOf(paths: readonly string[]): Promise<string> {
  const parts: string[] = [];
  for (const path of paths) {
    const info = await Deno.stat(path);
    parts.push(`${basename(path)}:${info.size}:${info.mtime?.getTime() ?? 0}`);
  }
  return parts.join(";");
}

/** Codex's rollout root: CODEX_HOME/sessions, else ~/.codex/sessions. */
export function defaultCodexDir(
  env: { get(key: string): string | undefined },
  home: string | undefined,
): string | undefined {
  const codexHome = env.get("CODEX_HOME");
  if (codexHome) return join(codexHome, "sessions");
  return home ? join(home, ".codex", "sessions") : undefined;
}

/** Whether a directory exists; any other error is the caller's. */
export async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await Deno.stat(path)).isDirectory;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return false;
    throw error;
  }
}

/** Lists the Codex sessions to import under the rollout root. */
export async function discoverCodexSessions(
  options: CodexDiscoverOptions,
): Promise<CodexDiscoveryResult> {
  const heads = new Map<string, RolloutMeta>();
  const pathOf = new Map<string, string>();
  const headOf = new Map<string, RolloutMeta>();
  const unreadable = new Set<string>();
  for (const path of await rollouts(options.sessionsDir)) {
    try {
      const meta = await rolloutHead(path);
      if (!meta) continue;
      const id = meta.id.toLowerCase();
      heads.set(id, meta);
      pathOf.set(id, path);
      headOf.set(path, meta);
    } catch (error) {
      if (!isFileGone(error)) throw error;
      // The file name ends with the thread id.
      const id = /([0-9a-f-]{36})\.jsonl$/i.exec(path)?.[1];
      if (id) unreadable.add(id.toLowerCase());
    }
  }

  const isChild = (m: RolloutMeta) =>
    m.threadSource === "subagent" || m.parentThreadId !== undefined;
  const seen = new Set<string>();
  const placer = new Placer({
    resolver: options.resolver,
    mayHold: options.mayHold,
    // The head is already read; the placer asks again only by path.
    readHead: (path): Promise<TranscriptHead> => {
      const m = headOf.get(path);
      return Promise.resolve({
        ...(m?.cwd ? { cwd: m.cwd } : {}),
        ...(m?.gitBranch ? { gitBranch: m.gitBranch } : {}),
      });
    },
    ...(options.knownResolved ? { knownResolved: options.knownResolved } : {}),
  });
  for (const [id, meta] of heads) {
    if (isChild(meta)) continue;
    seen.add(id);
    await placer.add(id, pathOf.get(id)!);
  }

  // Each subagent under the top-level session at the end of its parents.
  const childrenOf = new Map<string, CodexChild[]>();
  let orphans = 0;
  for (const [id, meta] of heads) {
    if (!isChild(meta)) continue;
    let top: string | undefined = meta.parentThreadId?.toLowerCase();
    const chain = new Set([id]);
    while (top && heads.has(top) && isChild(heads.get(top)!)) {
      if (chain.has(top)) {
        top = undefined;
        break;
      }
      chain.add(top);
      top = heads.get(top)!.parentThreadId?.toLowerCase();
    }
    if (!top || !heads.has(top) || !meta.parentThreadId) {
      orphans++;
      continue;
    }
    const list = childrenOf.get(top) ?? [];
    list.push({
      threadId: id,
      transcript: pathOf.get(id)!,
      parentThreadId: meta.parentThreadId.toLowerCase(),
      ...(meta.agentPath ? { agentPath: meta.agentPath } : {}),
      ...(meta.agentRole ? { agentRole: meta.agentRole } : {}),
    });
    childrenOf.set(top, list);
  }

  const { placed, unresolved } = await placer.place();
  const found: CodexSession[] = [];
  for (const p of placed) {
    if (!options.selects(p.place)) continue;
    try {
      const children = (childrenOf.get(p.id) ?? []).sort((a, b) =>
        a.threadId.localeCompare(b.threadId)
      );
      const files = [p.transcript, ...children.map((c) => c.transcript)];
      if (options.since) {
        let newest = 0;
        for (const f of files) {
          newest = Math.max(newest, (await Deno.stat(f)).mtime?.getTime() ?? 0);
        }
        if (newest < options.since.getTime()) continue;
      }
      found.push({
        sessionId: p.id,
        transcript: p.transcript,
        cwd: p.cwd,
        repo: p.place.repo,
        root: p.place.root,
        children,
        fingerprint: await fingerprintOf(files),
      });
    } catch (error) {
      placer.gone(p.id, error);
    }
  }
  for (const id of placer.unreadable) unreadable.add(id);
  return {
    sessions: found.sort((a, b) => a.sessionId.localeCompare(b.sessionId)),
    resolved: placer.resolved,
    unresolved: unresolved + orphans,
    unreadable,
    seen,
  };
}
