/**
 * The box: the throwaway directory tree one probe runs in.
 *
 *   home/        fake HOME, with planted canaries
 *   tmp/         TMPDIR
 *   repo/        the fresh swamp repo the target is pulled into
 *   bin/         the logging stub, and a shim per stubbed command name
 *   stub-calls/  one directory per stub call
 *   steps/<n>/   an empty directory granted to step n only, so its nono
 *                audit session can be found by path
 *
 * @module
 */

import { constants as fsConstants } from "node:fs";
import { type FileHandle, open as fsOpen } from "node:fs/promises";
import { join } from "jsr:@std/path@1.1.4";
import type { CanarySet } from "./canaries.ts";

/** Paths of one box. */
export interface BoxLayout {
  readonly root: string;
  readonly home: string;
  readonly tmp: string;
  readonly repo: string;
  readonly bin: string;
  readonly stub: string;
  /** What the stub prints, when present (outside the sandbox's write grants). */
  readonly stubOutput: string;
  readonly stubCalls: string;
  readonly steps: string;
  /** A readable file methods can be pointed at when they want a path. */
  readonly sample: string;
  /** A writable directory methods can be pointed at when they want a dir. */
  readonly scratch: string;
}

/** The layout under `root`. */
export function boxLayout(root: string): BoxLayout {
  return {
    root,
    home: join(root, "home"),
    tmp: join(root, "tmp"),
    repo: join(root, "repo"),
    bin: join(root, "bin"),
    stub: join(root, "bin", "probe-stub"),
    stubOutput: join(root, "bin", "stub-output"),
    stubCalls: join(root, "stub-calls"),
    steps: join(root, "steps"),
    sample: join(root, "tmp", "sample.txt"),
    scratch: join(root, "tmp", "scratch"),
  };
}

/**
 * Command names shimmed to the stub on method runs' PATH. Not `git`: swamp
 * itself runs `git rev-parse` on every command, and a shim would both hide
 * nothing useful and feed swamp fake answers. A `git push` still shows as a
 * refused network attempt.
 */
export const DEFAULT_STUB_COMMANDS: readonly string[] = [
  "claude",
  "codex",
  "gemini",
  "gh",
  "aws",
  "gcloud",
  "az",
  "kubectl",
  "helm",
  "terraform",
  "docker",
  "podman",
  "ssh",
  "scp",
  "rsync",
  "curl",
  "wget",
  "nc",
  "npm",
  "npx",
  "pip",
  "python3",
  "node",
];

/**
 * The logging stub. POSIX sh and built-ins plus mkdir, cat and pwd, so it runs
 * on any box. The log directory is baked in: a method that spawns with a
 * cleared environment still logs. It prints `{}` (valid as text and as JSON),
 * or the content of the output file when a referee driver set one.
 */
export function stubScript(callsDir: string, outputFile: string): string {
  const q = shellQuote(callsDir);
  const outQ = shellQuote(outputFile);
  return `#!/bin/sh
d=${q}/$$
n=0
while ! mkdir "$d" 2>/dev/null; do
  n=$((n + 1))
  [ "$n" -ge 20 ] && { printf '%s\\n' '{}'; exit 0; }
  d="$d.x"
done
printf '%s' "$0" > "$d/invoked"
printf '%s\\0' "$@" > "$d/argv"
pwd > "$d/cwd"
if [ -t 0 ]; then : > "$d/stdin"; else cat > "$d/stdin"; fi
if [ -f ${outQ} ]; then cat ${outQ}; else printf '%s\\n' '{}'; fi
exit 0
`;
}

/** Single-quotes a string for POSIX sh. */
export function shellQuote(s: string): string {
  return `'${s.replaceAll("'", `'\\''`)}'`;
}

/** The sample file's content: plain prose a text-taking method can work on. */
export const SAMPLE_TEXT =
  "We will utilize the API, e.g. to leverage synergies; it's crucial.\n";

/** Creates the box on disk: directories, stub, shims, canaries. */
export async function createBox(
  layout: BoxLayout,
  canaries: CanarySet,
  stubCommands: readonly string[],
): Promise<void> {
  for (
    const d of [
      layout.home,
      layout.tmp,
      layout.repo,
      layout.bin,
      layout.stubCalls,
      layout.steps,
      layout.scratch,
    ]
  ) {
    await Deno.mkdir(d, { recursive: true });
  }
  await Deno.writeTextFile(
    layout.stub,
    stubScript(layout.stubCalls, layout.stubOutput),
    {
      mode: 0o755,
    },
  );
  for (const name of stubCommands) {
    if (!/^[A-Za-z0-9._+-]+$/.test(name) || name === "." || name === "..") {
      throw new Error(
        `stubCommands entry "${name}" is not a plain command name.`,
      );
    }
    await Deno.symlink(layout.stub, join(layout.bin, name));
  }
  await Deno.writeTextFile(layout.sample, SAMPLE_TEXT);
  for (const f of canaries.files) {
    const p = join(layout.home, f.path);
    await Deno.mkdir(join(p, ".."), { recursive: true });
    await Deno.writeTextFile(p, f.content, { mode: f.mode ?? 0o644 });
  }
}

/** One file's identity in a snapshot. */
export interface FileStamp {
  readonly size: number;
  readonly mtimeMs: number;
  /** Inode and change time: code under test can restore an mtime, not these. */
  readonly ino: number | null;
  readonly ctimeMs: number;
}

/** Path (relative to the snapshot root) → stamp. */
export type Snapshot = ReadonlyMap<string, FileStamp>;

/**
 * Walks `root`, skipping relative prefixes in `skip`. Symlinks are recorded,
 * never followed: the tree was written by code under test.
 */
export async function snapshot(
  root: string,
  skip: readonly string[] = [],
): Promise<Snapshot> {
  const out = new Map<string, FileStamp>();
  const stamp = (st: Deno.FileInfo): FileStamp => ({
    size: st.size,
    mtimeMs: st.mtime?.getTime() ?? 0,
    ino: st.ino,
    ctimeMs: st.ctime?.getTime() ?? 0,
  });
  async function walk(dir: string, rel: string) {
    let entries: Deno.DirEntry[];
    try {
      entries = await Array.fromAsync(Deno.readDir(dir));
    } catch {
      // Code under test can chmod a directory to hide what is inside. The
      // box is ours (same user), so give ourselves access back and look.
      try {
        await Deno.chmod(dir, 0o700);
        entries = await Array.fromAsync(Deno.readDir(dir));
      } catch {
        // Still unreadable: record the directory itself as a marker that
        // cannot match any earlier snapshot, so it shows as a change.
        out.set(`${rel}/(unreadable)`, {
          size: -1,
          mtimeMs: Date.now(),
          ino: null,
          ctimeMs: 0,
        });
        return;
      }
    }
    for (const e of entries) {
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (skip.some((s) => r === s || r.startsWith(`${s}/`))) continue;
      const p = join(dir, e.name);
      if (e.isDirectory) {
        await walk(p, r);
        continue;
      }
      try {
        out.set(r, stamp(await Deno.lstat(p)));
      } catch {
        // Gone between readDir and lstat.
      }
    }
  }
  await walk(root, "");
  return out;
}

/**
 * Removes a box, first giving back access to any directory the code under
 * test locked (chmod 000), so no canary or auth cache is left on disk.
 * Returns false when something could not be removed.
 */
export async function removeBox(root: string): Promise<boolean> {
  async function unlock(dir: string) {
    await Deno.chmod(dir, 0o700).catch(() => {});
    let entries: Deno.DirEntry[] = [];
    try {
      entries = await Array.fromAsync(Deno.readDir(dir));
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory) await unlock(join(dir, e.name));
    }
  }
  try {
    await Deno.remove(root, { recursive: true });
    return true;
  } catch {
    await unlock(root);
  }
  try {
    await Deno.remove(root, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

/** A file created, modified or deleted between two snapshots. */
export interface FileChange {
  readonly path: string;
  readonly change: "created" | "modified" | "deleted";
}

/** What changed from `before` to `after`. */
export function diffSnapshots(before: Snapshot, after: Snapshot): FileChange[] {
  const out: FileChange[] = [];
  for (const [p, s] of after) {
    const b = before.get(p);
    if (!b) out.push({ path: p, change: "created" });
    else if (
      b.size !== s.size || b.mtimeMs !== s.mtimeMs || b.ino !== s.ino ||
      b.ctimeMs !== s.ctimeMs
    ) {
      out.push({ path: p, change: "modified" });
    }
  }
  for (const p of before.keys()) {
    if (!after.has(p)) out.push({ path: p, change: "deleted" });
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

/** A regular file's first bytes, and its full size. */
export interface CappedRead {
  readonly text: string;
  readonly size: number;
}

/**
 * Reads at most `max` bytes of a regular file the code under test may have
 * written, from outside the sandbox. A symlink, FIFO, device or directory is
 * refused (null): Landlock limits what sandboxed code can open, not where a
 * symlink it plants points, and this process can read far more. The opened
 * file must be the one inspected, so a swap between the check and the read is
 * refused too.
 */
export async function readRegularFile(
  path: string,
  max: number,
): Promise<CappedRead | null> {
  // Three layers, because Deno resolves symlinks itself for its permission
  // check unless it runs with --allow-all, which drops O_NOFOLLOW:
  //   1. lstat: the path must be a regular file now;
  //   2. open with O_NOFOLLOW | O_NONBLOCK: a link is refused where the flag
  //      holds, and a FIFO swapped in cannot block the open;
  //   3. the opened file must be the one lstat saw (device and inode).
  let before: Deno.FileInfo;
  try {
    before = await Deno.lstat(path);
  } catch {
    return null;
  }
  if (!before.isFile) return null;
  const flags = fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW |
    fsConstants.O_NONBLOCK;
  let fh: FileHandle;
  try {
    fh = await fsOpen(path, flags);
  } catch {
    return null;
  }
  try {
    const st = await fh.stat();
    if (!st.isFile() || st.ino !== before.ino || st.dev !== before.dev) {
      return null;
    }
    const buf = new Uint8Array(Math.min(max, st.size));
    let n = 0;
    while (n < buf.length) {
      const { bytesRead } = await fh.read(buf, n, buf.length - n, n);
      if (bytesRead === 0) break;
      n += bytesRead;
    }
    return {
      text: new TextDecoder().decode(buf.subarray(0, n)),
      size: st.size,
    };
  } catch {
    return null;
  } finally {
    await fh.close().catch(() => {});
  }
}

/** The most stub-call records read per step. */
export const MAX_STUB_CALLS = 200;

/** The most of any one stub-call file the probe reads. */
export const STUB_FILE_CAP = 64 * 1024;

/** One stub call as read from disk. */
export interface RawStubCall {
  readonly id: string;
  readonly invokedAs: string;
  readonly argv: string;
  readonly cwd: string;
  readonly stdin: string;
  /** The full stdin size, before the read cap. */
  readonly stdinBytes: number;
}

/** Reads every stub call recorded since `seen`, oldest first. */
export async function readStubCalls(
  callsDir: string,
  seen: Set<string>,
): Promise<RawStubCall[]> {
  const out: RawStubCall[] = [];
  let entries: Deno.DirEntry[] = [];
  try {
    entries = await Array.fromAsync(Deno.readDir(callsDir));
  } catch {
    return [];
  }
  const fresh = entries
    .filter((e) => e.isDirectory && !seen.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (fresh.length > MAX_STUB_CALLS) {
    // A method can flood stub-calls/; read the first ones and say so.
    out.push({
      id: "dropped",
      invokedAs: "(probe)",
      argv: `${
        fresh.length - MAX_STUB_CALLS
      } more stub call records were not read\0`,
      cwd: "",
      stdin: "",
      stdinBytes: 0,
    });
    for (const e of fresh.slice(MAX_STUB_CALLS)) seen.add(e.name);
  }
  for (const e of fresh.slice(0, MAX_STUB_CALLS)) {
    // readDir does not follow links: a planted symlink is not a directory.
    seen.add(e.name);
    const d = join(callsDir, e.name);
    const read = (f: string) => readRegularFile(join(d, f), STUB_FILE_CAP);
    const stdin = await read("stdin");
    out.push({
      id: e.name,
      invokedAs: (await read("invoked"))?.text ?? "",
      argv: (await read("argv"))?.text ?? "",
      cwd: (await read("cwd"))?.text ?? "",
      stdin: stdin?.text ?? "",
      stdinBytes: stdin?.size ?? 0,
    });
  }
  return out;
}
