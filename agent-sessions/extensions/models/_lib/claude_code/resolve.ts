/**
 * Which repo a session ran in, from the working directory its transcript
 * records (swamp-club#4211). A directory that still exists is asked of git:
 * its toplevel, and its common dir, which folds a worktree into its main
 * repo. A repo is identified by its normalized `origin` URL, so two clones of
 * one remote are one repo, or by its main checkout's path when it has no
 * remote. A directory that is gone (a removed worktree) is matched against
 * the worktree globs, and counts only when the session ran on one of that
 * repo's own branches. Anything else is unresolved.
 *
 * Git runs once per distinct directory and once per repo for its remote and
 * branches.
 *
 * @module
 */

import { basename, globToRegExp, resolve } from "jsr:@std/path@1.1.4";

/** One repo, as sessions are grouped by it. */
export interface Repo {
  /** The normalized `origin` URL, else the main checkout's path, home as `~`. */
  readonly identity: string;
  /** The main checkout's directory name, which `<repo>` in a glob stands for. */
  readonly name: string;
  readonly mainCheckout: string;
  /** False for a directory that is not a git repo, taken as a repo by path. */
  readonly git: boolean;
  /**
   * True when the identity is a path (no remote), which a remote added
   * later changes; such a resolution is not cached between imports.
   */
  readonly byPath: boolean;
}

/** Where a directory sits in its repo. */
export interface Resolved {
  readonly repo: Repo;
  /** The worktree's top directory, in the form the directory was given in. */
  readonly root: string;
  /** The directory relative to the root, `/`-separated; empty at the root. */
  readonly prefix: string;
  /**
   * True when git answered for a directory that exists, which no later
   * fetch can change; false for a glob match, which rests on a branch.
   */
  readonly settled: boolean;
}

/** Why a directory has no repo: it is gone, or it is not in a git repo. */
export type Unresolved = "gone" | "unresolved";

// Branch names every repo can have, which say nothing about which repo it is.
const GENERIC_BRANCHES = new Set([
  "main",
  "master",
  "HEAD",
  "trunk",
  "develop",
]);

const GIT_TIMEOUT_MS = 10_000;

/**
 * Runs git and returns its stdout, or undefined when git is missing, fails,
 * or takes too long. It never prompts for credentials.
 *
 * Git runs in directories taken from transcripts, other people's checkouts
 * among them under `all`, so only read-only commands that run no hooks and
 * touch no index (rev-parse, config --get, for-each-ref) belong here.
 */
async function git(args: string[]): Promise<string | undefined> {
  try {
    const out = await new Deno.Command("git", {
      args,
      stdin: "null",
      stdout: "piped",
      stderr: "null",
      env: { GIT_TERMINAL_PROMPT: "0", GIT_OPTIONAL_LOCKS: "0" },
      signal: AbortSignal.timeout(GIT_TIMEOUT_MS),
    }).output();
    return out.success ? new TextDecoder().decode(out.stdout) : undefined;
  } catch {
    return undefined;
  }
}

/** Whether git is on PATH at all, as opposed to failing in a directory. */
export async function gitFound(): Promise<boolean> {
  return (await git(["--version"])) !== undefined;
}

/** A repo's local and remote branch names, with remote prefixes removed. */
export async function gitBranches(repoDir: string): Promise<Set<string>> {
  const out = await git([
    "-C",
    repoDir,
    "for-each-ref",
    "--format=%(refname)",
    "refs/heads",
    "refs/remotes",
  ]);
  const names = new Set<string>();
  for (const ref of (out ?? "").split("\n")) {
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
}

function trimSep(p: string): string {
  return p.length > 1 ? p.replace(/[\\/]+$/, "") : p;
}

/** A path with `/` separators and no trailing separator, for comparing. */
function slashed(p: string): string {
  return trimSep(p).replaceAll("\\", "/");
}

/** Whether `dir` is `root` or below it, never a sibling sharing a prefix. */
export function isUnder(dir: string, root: string): boolean {
  const d = slashed(dir);
  const r = slashed(root);
  return d === r || d.startsWith(r.endsWith("/") ? r : r + "/");
}

/** Whether a prefix is `parent` or below it; an empty parent holds all. */
export function prefixUnder(prefix: string, parent: string): boolean {
  return parent === "" || prefix === parent ||
    prefix.startsWith(parent + "/");
}

/** Shows a path with the home directory (or its real path) as `~`. */
export function displayPath(
  path: string,
  home: readonly string[],
): string {
  const p = trimSep(path);
  for (const h of home) {
    if (h.length > 1 && isUnder(p, h)) {
      return "~" + slashed(p).slice(slashed(h).length);
    }
  }
  return p;
}

/**
 * Normalizes a remote URL so every way of writing one remote reads the same:
 * the scheme, any user or credentials and the port are dropped, `host:path`
 * becomes `host/path`, the host is lowercased, and a trailing `.git` or `/`
 * goes. A local path or `file://` remote is shown as a path.
 */
export function normalizeRemote(
  url: string,
  home: readonly string[] = [],
): string {
  const raw = url.trim();
  const tidy = (host: string, path: string) =>
    `${host.toLowerCase()}/${
      path.replace(/^\/+/, "").replace(/\/+$/, "").replace(/\.git$/, "")
        .replace(/\/+$/, "")
    }`;
  if (/^file:\/\//i.test(raw)) {
    return displayPath(
      decodeURIComponent(raw.replace(/^file:\/\//i, "")).replace(/\.git$/, ""),
      home,
    );
  }
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      return tidy(u.hostname, decodeURIComponent(u.pathname));
    } catch {
      // Unparseable: keep it, without anything before an `@` in its authority.
      return raw.replace(/^([a-z][a-z0-9+.-]*:\/\/)[^/]*@/i, "$1");
    }
  }
  // scp-like: [user@]host:path, where host is not a Windows drive letter.
  const scp = /^(?:[^@/\\]+@)?([^:/\\]{2,}):(.+)$/.exec(raw);
  if (scp) return tidy(scp[1], scp[2]);
  return displayPath(raw.replace(/\.git$/, ""), home);
}

/** Whether an exclude or repos entry names a path rather than a remote. */
export function isPathLike(entry: string): boolean {
  return /^(?:[/\\~.]|[A-Za-z]:[\\/])/.test(entry);
}

/** Drops the last `count` components of a path, in its own form. */
function dropComponents(path: string, count: number): string {
  let p = trimSep(path);
  for (let i = 0; i < count; i++) {
    const cut = Math.max(p.lastIndexOf("/"), p.lastIndexOf("\\"));
    if (cut <= 0) return p.slice(0, cut + 1) || p;
    p = p.slice(0, cut);
  }
  return p;
}

/** Resolves directories to repos, asking git once per directory and repo. */
export class RepoResolver {
  readonly #home: readonly string[];
  readonly #globs: readonly string[];
  readonly #dirs = new Map<string, Promise<Resolved | Unresolved>>();
  readonly #repos = new Map<string, Promise<Repo>>();
  readonly #known = new Map<string, Repo>();
  readonly #branches = new Map<string, Promise<Set<string>>>();
  readonly #plain: Repo[] = [];
  // Roots of the repos being imported, so a gone directory below one (a
  // deleted subfolder) is still that repo's.
  readonly #anchors: { repo: Repo; root: string }[] = [];

  /**
   * @param home the home directory, for showing paths as `~`
   * @param worktreeGlobs globs over removed worktrees, `~` expanded; `<repo>`
   *   stands for each known repo's directory name
   */
  constructor(home: string | undefined, worktreeGlobs: readonly string[]) {
    const homes: string[] = [];
    if (home) {
      homes.push(home);
      try {
        const real = Deno.realPathSync(home);
        if (real !== home) homes.push(real);
      } catch {
        // No such home, or no read access: the given form is enough.
      }
    }
    this.#home = homes;
    this.#globs = worktreeGlobs;
  }

  /** Shows a path with home as `~`. */
  display(path: string): string {
    return displayPath(path, this.#home);
  }

  /**
   * Takes a directory that is not a git repo as a repo by its path, so the
   * directories below it resolve to it.
   */
  addPlain(dir: string): Repo {
    const repo: Repo = {
      identity: this.display(dir),
      name: basename(trimSep(dir)),
      mainCheckout: trimSep(dir),
      git: false,
      byPath: true,
    };
    this.#plain.push(repo);
    this.#anchors.push({ repo, root: repo.mainCheckout });
    this.#known.set(repo.mainCheckout, repo);
    // A directory already asked about resolved before this repo existed.
    for (const key of this.#dirs.keys()) {
      if (isUnder(key, dir)) this.#dirs.delete(key);
    }
    return repo;
  }

  /**
   * Marks a repo being imported, so a gone directory below its root counts
   * as that repo's.
   */
  addAnchor(place: Resolved): void {
    this.#anchors.push({ repo: place.repo, root: place.root });
  }

  /** Every repo resolved so far. */
  known(): Repo[] {
    return [...this.#known.values()];
  }

  /** The repo a directory that exists is in, or why there is none. */
  resolveDir(dir: string): Promise<Resolved | Unresolved> {
    const key = trimSep(dir);
    let found = this.#dirs.get(key);
    if (!found) {
      found = this.#resolveDir(key);
      this.#dirs.set(key, found);
    }
    return found;
  }

  async #resolveDir(dir: string): Promise<Resolved | Unresolved> {
    try {
      if (!(await Deno.stat(dir)).isDirectory) return "unresolved";
    } catch {
      return "gone";
    }
    const out = await git([
      "-C",
      dir,
      "rev-parse",
      "--show-toplevel",
      "--show-prefix",
      "--git-common-dir",
    ]);
    const lines = out?.split("\n");
    if (!lines || lines.length < 3 || !lines[0]) {
      return this.#plainFor(dir) ?? "unresolved";
    }
    const [toplevel, rawPrefix, rawCommon] = lines;
    const prefix = rawPrefix.replace(/[\\/]+$/, "");
    // The root is the directory less its prefix, so a symlinked path keeps
    // the form the session used, where git would print the real path.
    const depth = prefix === "" ? 0 : prefix.split("/").length;
    let root = dropComponents(dir, depth);
    // A symlink into a folder of the repo would put that root on an unrelated
    // ancestor; then the real toplevel is the root.
    try {
      if (slashed(await Deno.realPath(root)) !== slashed(toplevel)) {
        root = trimSep(toplevel);
      }
    } catch {
      root = trimSep(toplevel);
    }
    // A relative common dir is relative to the real directory, not to the
    // form the session gave, which may be a symlink.
    let real = dir;
    try {
      real = await Deno.realPath(dir);
    } catch {
      // Gone since the stat: the given form is the best there is.
    }
    const common = resolve(real, rawCommon);
    // A worktree's common dir is the main checkout's .git; a submodule's
    // lives under its parent's .git, so the submodule stands for itself.
    const mainCheckout = basename(common) === ".git"
      ? trimSep(resolve(common, ".."))
      : trimSep(toplevel);
    const repo = await this.#repo(mainCheckout);
    return { repo, root, prefix, settled: true };
  }

  #plainFor(dir: string): Resolved | undefined {
    for (const repo of this.#plain) {
      if (isUnder(dir, repo.mainCheckout)) {
        const rest = slashed(dir).slice(slashed(repo.mainCheckout).length)
          .replace(/^\/+/, "");
        return { repo, root: repo.mainCheckout, prefix: rest, settled: false };
      }
    }
    return undefined;
  }

  #repo(mainCheckout: string): Promise<Repo> {
    let repo = this.#repos.get(mainCheckout);
    if (!repo) {
      repo = (async () => {
        const remote = (await git([
          "-C",
          mainCheckout,
          "config",
          "--get",
          "remote.origin.url",
        ]))?.trim();
        const r: Repo = {
          identity: remote
            ? normalizeRemote(remote, this.#home)
            : this.display(mainCheckout),
          name: basename(mainCheckout),
          mainCheckout,
          git: true,
          byPath: !remote,
        };
        this.#known.set(mainCheckout, r);
        return r;
      })();
      this.#repos.set(mainCheckout, repo);
    }
    return repo;
  }

  /** A repo's branch names, read once. */
  branches(repo: Repo): Promise<Set<string>> {
    let names = this.#branches.get(repo.mainCheckout);
    if (!names) {
      names = repo.git
        ? gitBranches(repo.mainCheckout)
        : Promise.resolve(new Set());
      this.#branches.set(repo.mainCheckout, names);
    }
    return names;
  }

  /**
   * The repo names a gone directory could be a worktree of, by the worktree
   * globs; `any` when a glob has no `<repo>`, so any repo could match.
   */
  candidateNames(dir: string): Set<string> | "any" {
    const names = new Set<string>();
    const parts = slashed(dir).split("/");
    for (const g of this.#globs) {
      if (!g.includes("<repo>")) return "any";
      const marker = "REPONAMEMARKER";
      const source = globToRegExp(g.replaceAll("<repo>", marker), {
        extended: true,
        globstar: false,
      }).source.replaceAll(marker, "([^/\\\\]+)");
      const re = new RegExp(source);
      for (let i = parts.length; i > 1; i--) {
        const m = re.exec(parts.slice(0, i).join("/"));
        if (m) m.slice(1).forEach((n) => names.add(n));
      }
    }
    return names;
  }

  /**
   * The repo a gone directory was in: below the root of a repo being
   * imported (a deleted subfolder), or an ancestor matching a worktree glob
   * for a known repo, on a branch that repo has (never one every repo has).
   * Two repos both claiming it by glob leave it unresolved.
   */
  async resolveGone(
    dir: string,
    gitBranch: string | undefined,
  ): Promise<Resolved | undefined> {
    const path = trimSep(dir);
    for (const { repo, root } of this.#anchors) {
      if (isUnder(path, root)) {
        const prefix = slashed(path).slice(slashed(root).length).replace(
          /^\/+/,
          "",
        );
        return { repo, root, prefix, settled: false };
      }
    }
    if (!gitBranch || GENERIC_BRANCHES.has(gitBranch)) return undefined;
    const parts = slashed(path).split("/");
    const matches = new Map<string, Resolved>();
    for (const repo of this.known()) {
      if (!repo.git) continue;
      const globs = this.#globs.map((g) =>
        globToRegExp(g.replaceAll("<repo>", repo.name), {
          extended: true,
          globstar: false,
        })
      );
      // A glob matches the worktree root, so test the directory and each
      // ancestor.
      for (let i = parts.length; i > 1; i--) {
        const ancestor = parts.slice(0, i).join("/");
        if (!globs.some((g) => g.test(ancestor))) continue;
        if (!(await this.branches(repo)).has(gitBranch)) break;
        const depth = parts.length - i;
        matches.set(repo.identity, {
          repo,
          root: dropComponents(path, depth),
          prefix: parts.slice(i).join("/"),
          settled: false,
        });
        break;
      }
    }
    return matches.size === 1 ? [...matches.values()][0] : undefined;
  }
}
