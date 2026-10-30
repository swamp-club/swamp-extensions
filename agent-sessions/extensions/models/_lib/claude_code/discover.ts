/**
 * Finds the Claude Code sessions that ran in this repo. Claude Code files a
 * session under a folder named after its working directory, but the naming
 * loses information (every non-alphanumeric character becomes `-`), so a
 * session belongs to the repo only by the `cwd` its own records carry: the
 * repo or one of its live worktrees, or a path matching a worktree glob (cue
 * removes worktrees after merge, so git no longer lists them) whose session
 * ran on a branch this repo has. A directory name alone is never enough: two
 * repos can share one.
 *
 * @module
 */

import { basename, globToRegExp, join, SEPARATOR } from "jsr:@std/path@1.1.4";
import { listSubagents, type SubagentSource } from "./subagents.ts";

/** How the importer finds transcripts and decides which belong to the repo. */
export interface DiscoverOptions {
  readonly repoDir: string;
  readonly projectsDir: string;
  /** Paths that are this repo: the repo itself and its live worktrees. */
  readonly repoPaths: readonly string[];
  /** Globs over working directories that are also this repo. */
  readonly worktreeGlobs: readonly string[];
  /**
   * This repo's branch names. A glob match counts only when the session ran
   * on one of them, other than a name every repo has (main, master).
   */
  readonly repoBranches: ReadonlySet<string>;
  /** Skip sessions whose transcript and subagents all changed before this. */
  readonly since?: Date;
  /**
   * Transcripts already known not to be this repo's, as the hash of their
   * path mapped to their size and mtime, so their heads are not read again.
   */
  readonly knownOthers?: ReadonlyMap<string, string>;
}

/** What a scan found: this repo's sessions, and every transcript that is not. */
export interface DiscoveryResult {
  readonly sessions: DiscoveredSession[];
  /** Every other transcript seen, hashed path to size and mtime, for the next scan. */
  readonly others: Map<string, string>;
  /** Session ids whose files could not be read this scan; not proof they are gone. */
  readonly unreadable: Set<string>;
}

/** One session found on disk. */
export interface DiscoveredSession {
  /** Claude Code's session id, from the file name. */
  readonly sessionId: string;
  readonly transcript: string;
  /** The session's folder of subagents and tool results. */
  readonly sessionDir: string;
  readonly cwd: string;
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

/** Expands a leading `~` and the `<repo>` placeholder in a worktree glob. */
export function expandGlob(
  pattern: string,
  home: string | undefined,
  repoDir: string,
): string {
  const withRepo = pattern.replaceAll("<repo>", basename(repoDir));
  if (home && (withRepo === "~" || withRepo.startsWith("~/"))) {
    return home + withRepo.slice(1);
  }
  return withRepo;
}

function trimSep(p: string): string {
  return p.length > 1 ? p.replace(/[\\/]+$/, "") : p;
}

// Branch names every repo can have, which say nothing about which repo it is.
const GENERIC_BRANCHES = new Set([
  "main",
  "master",
  "HEAD",
  "trunk",
  "develop",
]);

/**
 * How a session relates to this repo: `repo` when its cwd is the repo, below
 * it, or a live worktree, or it matches a worktree glob and ran on one of
 * this repo's own branches; `branch` when only the branch check refused a
 * glob match, which a later fetch can change; `other` otherwise.
 */
export type RepoMatch = "repo" | "branch" | "other";

/** Whether a session belongs to this repo (see {@link repoMatch}). */
export function belongsToRepo(
  head: TranscriptHead,
  repoPaths: readonly string[],
  globs: readonly RegExp[],
  repoBranches: ReadonlySet<string>,
): boolean {
  return repoMatch(head, repoPaths, globs, repoBranches) === "repo";
}

/** How a session relates to this repo. */
export function repoMatch(
  head: TranscriptHead,
  repoPaths: readonly string[],
  globs: readonly RegExp[],
  repoBranches: ReadonlySet<string>,
): RepoMatch {
  const { cwd, gitBranch } = head;
  if (!cwd) return "other";
  const dir = trimSep(cwd);
  for (const p of repoPaths) {
    const root = trimSep(p);
    if (
      dir === root || dir.startsWith(root + "/") ||
      dir.startsWith(root + SEPARATOR)
    ) {
      return "repo";
    }
  }
  if (globs.length === 0) return "other";
  // A glob matches the worktree root, so test the cwd and each ancestor.
  const parts = dir.split(/[\\/]/);
  let globbed = false;
  for (let i = parts.length; i > 1 && !globbed; i--) {
    const prefix = parts.slice(0, i).join("/");
    globbed = globs.some((g) => g.test(prefix));
  }
  if (!globbed) return "other";
  return gitBranch && !GENERIC_BRANCHES.has(gitBranch) &&
      repoBranches.has(gitBranch)
    ? "repo"
    : "branch";
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

/** A short hash of a transcript path, so the index never stores other repos' paths. */
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

/** Lists this repo's sessions under the transcript root. */
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

  const globs = options.worktreeGlobs.map((g) =>
    globToRegExp(g, { extended: true, globstar: false })
  );
  const found: DiscoveredSession[] = [];
  const others = new Map<string, string>();
  const unreadable = new Set<string>();
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
      // Claude Code's cleanup can delete a transcript mid-scan: skip that one
      // file, not the whole import.
      try {
        const info = await Deno.stat(transcript);
        const stamp = `${info.size}:${info.mtime?.getTime() ?? 0}`;
        const key = await pathKey(transcript);
        if (options.knownOthers?.get(key) === stamp) {
          others.set(key, stamp);
          continue;
        }
        const head = await transcriptHead(transcript);
        const match = repoMatch(
          head,
          options.repoPaths,
          globs,
          options.repoBranches,
        );
        if (match !== "repo") {
          // Only a verdict no later fetch can change is remembered.
          if (match === "other") others.set(key, stamp);
          continue;
        }
        const sessionId = entry.name.slice(0, -".jsonl".length);
        const sessionDir = join(projectDir, sessionId);
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
          let newest = info.mtime?.getTime() ?? 0;
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
          transcript,
          sessionDir,
          cwd: head.cwd!,
          subagents,
          fingerprint: await fingerprintOf(transcript, subagents),
        });
      } catch (error) {
        if (!isFileGone(error)) throw error;
        unreadable.add(entry.name.slice(0, -".jsonl".length).toLowerCase());
      }
    }
  }
  return {
    sessions: found.sort((a, b) => a.sessionId.localeCompare(b.sessionId)),
    others,
    unreadable,
  };
}

/** This repo's local and remote branch names, with remote prefixes removed. */
export async function gitBranches(repoDir: string): Promise<Set<string>> {
  try {
    const out = await new Deno.Command("git", {
      args: [
        "-C",
        repoDir,
        "for-each-ref",
        "--format=%(refname)",
        "refs/heads",
        "refs/remotes",
      ],
      stdout: "piped",
      stderr: "null",
    }).output();
    if (!out.success) return new Set();
    const names = new Set<string>();
    for (const ref of new TextDecoder().decode(out.stdout).split("\n")) {
      if (ref.startsWith("refs/heads/")) {
        names.add(ref.slice("refs/heads/".length));
      } else if (ref.startsWith("refs/remotes/")) {
        // refs/remotes/<remote>/<branch>
        const rest = ref.slice("refs/remotes/".length);
        const slash = rest.indexOf("/");
        if (slash > 0) names.add(rest.slice(slash + 1));
      }
    }
    return names;
  } catch {
    // No git on PATH: globs then match nothing, and the repo paths still apply.
    return new Set();
  }
}

/** The repo and its live worktrees, from `git worktree list --porcelain`. */
export async function gitWorktrees(repoDir: string): Promise<string[]> {
  try {
    const out = await new Deno.Command("git", {
      args: ["-C", repoDir, "worktree", "list", "--porcelain"],
      stdout: "piped",
      stderr: "null",
    }).output();
    if (!out.success) return [];
    return new TextDecoder().decode(out.stdout).split("\n")
      .filter((l) => l.startsWith("worktree "))
      .map((l) => l.slice("worktree ".length));
  } catch {
    // No git on PATH: the repo dir and the globs still apply.
    return [];
  }
}
