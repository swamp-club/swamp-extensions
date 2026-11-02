/**
 * Places transcripts in repos, for every harness (swamp-club#4158): from the
 * working directory and branch each transcript names, through
 * {@link RepoResolver}. Live directories first, then the repos the cache let
 * go unread that a removed worktree could belong to, then the removed
 * worktrees, which match only against repos the scan has found. A placement
 * no later fetch or remote can change is remembered by a hash of the
 * transcript's path, so the next scan does not read its head again.
 *
 * @module
 */

import type { RepoResolver, Resolved } from "./resolve.ts";

/** The error a host with no coding-agent transcripts gets. */
export class NoTranscriptsError extends Error {
  constructor(host: string, roots: readonly string[]) {
    super(
      `No coding-agent transcripts on ${host}: ${roots.join(" and ")} ${
        roots.length === 1 ? "does" : "do"
      } not exist. ` +
        "Import must run on the machine that holds the transcripts; a serve " +
        "worker (--remote-only) has none. Pass projectsDir or codexDir if they live elsewhere.",
    );
    this.name = "NoTranscriptsError";
  }
}

/** Expands a leading `~` in a path or glob. */
export function expandHome(pattern: string, home: string | undefined): string {
  if (home && (pattern === "~" || pattern.startsWith("~/"))) {
    return home + pattern.slice(1);
  }
  return pattern;
}

/** A short hash of a transcript path, so the index never stores its path. */
export async function pathKey(path: string): Promise<string> {
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
export function isFileGone(error: unknown): boolean {
  return error instanceof Deno.errors.NotFound ||
    error instanceof Deno.errors.PermissionDenied;
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

/** Where and on which branch a session ran, from its first records. */
export interface TranscriptHead {
  readonly cwd?: string;
  readonly gitBranch?: string;
}

export interface PlacerOptions {
  readonly resolver: RepoResolver;
  /**
   * Whether any session of the repo with this identity key, or main checkout
   * key, could be imported; false lets a transcript already resolved go
   * unread. The checkout key catches a repo whose identity changed since (a
   * remote added), which the identity key alone would hide.
   */
  readonly mayHold: (identityKey: string, checkoutKey: string) => boolean;
  /**
   * Transcripts already resolved, as the hash of their path mapped to their
   * size and mtime and the keys of their repo's identity, main checkout and
   * directory name, so their heads are not read again.
   */
  readonly knownResolved?: ReadonlyMap<string, string>;
  /** Reads the cwd and branch a transcript names. */
  readonly readHead: (transcript: string) => Promise<TranscriptHead>;
}

/** A transcript placed in a repo. */
export interface PlacedTranscript {
  readonly id: string;
  readonly transcript: string;
  readonly mtime: number;
  readonly cwd: string;
  readonly place: Resolved;
}

interface Pending {
  readonly id: string;
  readonly transcript: string;
  readonly key: string;
  readonly stamp: string;
  readonly mtime: number;
  readonly cwd: string;
  readonly gitBranch?: string;
}

interface Hidden {
  readonly id: string;
  readonly transcript: string;
  readonly nameKey: string;
}

/** Collects transcripts, then places them all at once. */
export class Placer {
  /** Every transcript resolved for good, hashed path to stamp and keys. */
  readonly resolved = new Map<string, string>();
  /** Session ids whose files could not be read; not proof they are gone. */
  readonly unreadable = new Set<string>();
  readonly #options: PlacerOptions;
  readonly #pending: Pending[] = [];
  // Transcripts the cache let go unread, kept in case a gone worktree needs
  // their repo to be known.
  readonly #hidden: Hidden[] = [];

  constructor(options: PlacerOptions) {
    this.#options = options;
  }

  /** Skips one file that vanished or cannot be read; rethrows anything else. */
  gone(id: string, error: unknown): void {
    if (!isFileGone(error)) throw error;
    this.unreadable.add(id.toLowerCase());
  }

  /** Adds one transcript; a harness's cleanup can delete it mid-scan. */
  async add(id: string, transcript: string): Promise<void> {
    try {
      const info = await Deno.stat(transcript);
      const stamp = `${info.size}:${info.mtime?.getTime() ?? 0}`;
      const key = await pathKey(transcript);
      const known = this.#options.knownResolved?.get(key);
      if (known?.startsWith(`${stamp}|`)) {
        const [identity, checkout, name] = known.slice(stamp.length + 1)
          .split("|");
        if (
          identity && checkout && name &&
          !this.#options.mayHold(identity, checkout)
        ) {
          this.resolved.set(key, known);
          this.#hidden.push({ id, transcript, nameKey: name });
          return;
        }
      }
      const head = await this.#options.readHead(transcript);
      // A transcript with no working directory is no session to place.
      if (!head.cwd) return;
      this.#pending.push({
        id,
        transcript,
        key,
        stamp,
        mtime: info.mtime?.getTime() ?? 0,
        cwd: head.cwd,
        ...(head.gitBranch ? { gitBranch: head.gitBranch } : {}),
      });
    } catch (error) {
      this.gone(id, error);
    }
  }

  /** Places every transcript added; those with no repo are counted. */
  async place(): Promise<
    { placed: PlacedTranscript[]; unresolved: number }
  > {
    const { resolver } = this.#options;
    const places = new Map<Pending, Resolved>();
    const lost: Pending[] = [];
    for (const p of this.#pending) {
      const r = await resolver.resolveDir(p.cwd);
      if (r === "gone") lost.push(p);
      else if (r !== "unresolved") places.set(p, r);
    }
    let unresolved = this.#pending.length - places.size - lost.length;
    // A gone worktree is placed only against every repo it could be, so the
    // repos the cache hid that share a name with it are resolved first;
    // otherwise whether a shared branch is ambiguous would depend on the cache.
    if (lost.length > 0 && this.#hidden.length > 0) {
      let names: Set<string> | "any" = new Set();
      for (const p of lost) {
        const c = resolver.candidateNames(p.cwd);
        if (c === "any") {
          names = "any";
          break;
        }
        c.forEach((n) => (names as Set<string>).add(n));
      }
      const keys = names === "any"
        ? undefined
        : new Set(await Promise.all([...names].map(nameKey)));
      for (const h of this.#hidden) {
        if (keys && !keys.has(h.nameKey)) continue;
        try {
          const head = await this.#options.readHead(h.transcript);
          if (head.cwd) await resolver.resolveDir(head.cwd);
        } catch (error) {
          this.gone(h.id, error);
        }
      }
    }
    for (const p of lost) {
      const r = await resolver.resolveGone(p.cwd, p.gitBranch);
      if (r) places.set(p, r);
      else unresolved++;
    }

    const placed: PlacedTranscript[] = [];
    for (const [p, place] of places) {
      // Only a verdict no later fetch or remote can change is remembered.
      if (place.settled && !place.repo.byPath) {
        this.resolved.set(
          p.key,
          [
            p.stamp,
            await identityKey(place.repo.identity),
            await checkoutKey(place.repo.mainCheckout),
            await nameKey(place.repo.name),
          ].join("|"),
        );
      }
      placed.push({
        id: p.id,
        transcript: p.transcript,
        mtime: p.mtime,
        cwd: p.cwd,
        place,
      });
    }
    return { placed, unresolved };
  }
}
