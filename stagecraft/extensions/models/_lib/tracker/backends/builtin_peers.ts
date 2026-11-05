// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.6.7";
import { recordObject } from "../../engine/tracker.ts";
import { RELATION_TYPES, type TrackerRelation } from "../core/adapter.ts";
import { type ExternalRef, parseExternalRef } from "../core/relations.ts";

// ---------------------------------------------------------------------------
// Reading a ticket in another tracker (swamp-club #4376; DESIGN.md, "Relations
// to another tracker"): another instance in this repository through swamp's
// data query, or a configured peer, another repository by path or a swamp
// serve, through the swamp binary's read command. Only relate and fetch_issue
// read here, never the adapter's own ticket read, so claim and publish never
// contact a peer. A read never throws: what it cannot learn is unresolved, with
// the reason. It reports the status by name and never judges what it means:
// that is each factory's to decide.
//
// A peer's URL comes from a definition, so the swamp it runs gets none of the
// operator's serve settings from the environment: only that peer's own vault
// token, in a private file, or swamp's stored login for that URL.
// ---------------------------------------------------------------------------

/** The relations record's spec, and its name for a ticket. */
export const RELATIONS_SPEC = "relations";
export function relationsName(issueId: string): string {
  return `${RELATIONS_SPEC}-${issueId}`;
}

/** The longest one read waits, and the most one method call spends on reads:
 * the tracker instance's lock is held meanwhile. */
export const PEER_READ_TIMEOUT_MS = 10_000;
export const PEER_BUDGET_MS = 30_000;
/** How long a read that timed out is given to end, before it is left behind. */
const PEER_ABORT_GRACE_MS = 2_000;

export const UNRESOLVED_REASONS = [
  "no_peer",
  "unreachable",
  "auth",
  "rate_limited",
  "not_found",
  "timeout",
  "bad_answer",
  "unsupported_runtime",
] as const;
export type UnresolvedReason = typeof UNRESOLVED_REASONS[number];

/** What a read of another tracker's ticket learned. */
export type ExternalRead =
  | {
    state: "resolved";
    id: string;
    display: string;
    /** The status as that tracker names it. */
    status: string;
    /** When a snapshot tracker's record was last read from its tracker. */
    fetchedAt?: string;
  }
  | { state: "unresolved"; reason: UnresolvedReason; detail: string };

const PEER_NAME = /^[a-z0-9][a-z0-9_-]*$/;

/** swamp resolves an expression after this check can first see the value. */
const isExpression = (value: string) => value.includes("${{");

/** A TLS address, or this machine's own: where a token may be sent. */
function mayCarryToken(url: URL): boolean {
  return url.protocol === "https:" || url.protocol === "wss:" ||
    url.hostname === "127.0.0.1" || url.hostname === "[::1]";
}

/** One peer: another repository by path, or a swamp serve. */
export const PeerSchema = z.strictObject({
  repo: z.string().min(1).optional().describe(
    "Another swamp repository on this machine, by absolute path",
  ),
  server: z.string().min(1).optional().describe(
    "A swamp serve to read through: a ws, wss, http or https URL",
  ),
  token: z.string().min(1).meta({ sensitive: true }).optional().describe(
    "The server's token, from a vault. Absent, swamp's stored login for that " +
      "URL is used",
  ),
  instance: z.string().regex(PEER_NAME).optional().describe(
    "The tracker's instance name there, when it differs from this peer's name",
  ),
}).superRefine((peer, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: "custom", message });
  if ((peer.repo === undefined) === (peer.server === undefined)) {
    fail("a peer has exactly one of repo and server");
  }
  if (peer.token !== undefined && peer.server === undefined) {
    fail("a peer's token goes with its server");
  }
  const { repo, server, token } = peer;
  if (
    repo !== undefined && !isExpression(repo) &&
    !repo.startsWith("/") && !/^[A-Za-z]:[\\/]/.test(repo)
  ) {
    fail(`a peer's repo must be an absolute path, not '${repo}'`);
  }
  if (server !== undefined && !isExpression(server)) {
    let url: URL | undefined;
    try {
      url = new URL(server);
    } catch {
      fail(`a peer's server must be a URL, not '${server}'`);
    }
    if (url !== undefined) {
      if (!["ws:", "wss:", "http:", "https:"].includes(url.protocol)) {
        fail(`a peer's server must be ws, wss, http or https, not '${server}'`);
      } else if (token !== undefined && !mayCarryToken(url)) {
        fail(
          `a peer's token is only sent over TLS or to this machine, not to ` +
            `'${server}'`,
        );
      }
    }
  }
});
export type Peer = z.infer<typeof PeerSchema>;

/** The tracker instance's peers, by the name references use. */
export const PeersSchema = z.record(z.string().regex(PEER_NAME), PeerSchema);

/** One relation of a ticket, with what is known of its other ticket. */
export const RelationStatusSchema = z.object({
  type: z.enum(RELATION_TYPES),
  direction: z.enum(["outgoing", "incoming"]),
  issue: z.string(),
  display: z.string(),
  /** True for a ticket in another tracker. */
  external: z.boolean(),
  state: z.enum(["resolved", "unresolved"]),
  status: z.string().optional(),
  reason: z.enum(UNRESOLVED_REASONS).optional(),
  detail: z.string().optional(),
  fetchedAt: z.string().optional(),
});
export type RelationStatus = z.infer<typeof RelationStatusSchema>;

/** The relations record fetch_issue writes: its last read of them. */
export const RelationsRecordSchema = z.object({
  issue: z.string(),
  checkedAt: z.string(),
  relations: z.array(RelationStatusSchema),
});

/** What one swamp read command gave. */
export interface PeerOutput {
  code: number;
  stdout: string;
  stderr: string;
}

/** Runs one swamp read command, with this peer's token if it has one. */
export type PeerRun = (
  args: string[],
  token: string | undefined,
  signal: AbortSignal,
) => Promise<PeerOutput>;

/** The swamp running this method cannot be found: a development run. */
class UnsupportedRuntime extends Error {}

/**
 * The only SWAMP_ settings a peer's swamp takes from the environment: its
 * account and where its own files are. Every other one is left out rather than
 * listed, since swamp adds new ones, and any could point it at another repo,
 * datastore or server, or hand a definition's URL the operator's credential.
 */
const KEPT_ENV = new Set([
  "SWAMP_API_KEY",
  "SWAMP_API_KEY_FILE",
  "SWAMP_CA_CERT",
  "SWAMP_CONFIG_DIR",
  "SWAMP_HOME",
  "SWAMP_NO_TELEMETRY",
  "SWAMP_NO_UPDATE_CHECK",
  "SWAMP_SIGNIN_TOKEN",
]);

/** The environment a peer's swamp runs with. */
export function peerEnv(env: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(env).filter(([name]) =>
      !name.startsWith("SWAMP_") || KEPT_ENV.has(name)
    ),
  );
}

/** What swampPeerRun does outside itself, for tests. */
export interface PeerRunSeams {
  execPath(): string;
  env(): Record<string, string>;
  spawn(
    binary: string,
    args: string[],
    env: Record<string, string>,
    signal: AbortSignal,
  ): Promise<PeerOutput>;
  /** A new file only this user can read, holding the text. */
  writePrivateFile(text: string): Promise<string>;
  remove(path: string): Promise<void>;
}

const decoder = new TextDecoder();

const realSeams: PeerRunSeams = {
  execPath: () => Deno.execPath(),
  env: () => Deno.env.toObject(),
  spawn: async (binary, args, env, signal) => {
    const out = await new Deno.Command(binary, {
      args,
      env,
      clearEnv: true,
      stdin: "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).output();
    return {
      code: out.code,
      stdout: decoder.decode(out.stdout),
      stderr: decoder.decode(out.stderr),
    };
  },
  writePrivateFile: async (text) => {
    const path = await Deno.makeTempFile({ prefix: "stagecraft-peer-" });
    await Deno.chmod(path, 0o600).catch(() => {});
    await Deno.writeTextFile(path, text);
    return path;
  },
  remove: (path) => Deno.remove(path),
};

/**
 * Runs a read with the swamp binary running this method. The token goes in a
 * private file, removed however the read ends: --token would show in process
 * listings.
 */
export function swampPeerRun(seams: PeerRunSeams = realSeams): PeerRun {
  return async (args, token, signal) => {
    const binary = seams.execPath();
    const name = binary.split(/[\\/]/).at(-1) ?? "";
    if (/^deno(\.exe)?$/i.test(name)) {
      throw new UnsupportedRuntime(
        `this method runs under ${binary}; another repository is read with ` +
          "the installed swamp",
      );
    }
    const env = peerEnv(seams.env());
    if (token === undefined) {
      return await seams.spawn(binary, args, env, signal);
    }
    const file = await seams.writePrivateFile(token);
    try {
      return await seams.spawn(
        binary,
        [...args, "--token-file", file],
        env,
        signal,
      );
    } finally {
      await seams.remove(file).catch(() => {});
    }
  };
}

/** swamp's own message from a failed command, without its banner. */
function failureText(stderr: string): string {
  const quoted = stderr.match(/"error":\s*"((?:[^"\\]|\\.)*)"/);
  const text = quoted?.[1] ?? stderr.trim().split("\n").at(-1) ?? "";
  return text.slice(0, 200);
}

function failureOf(output: PeerOutput): ExternalRead {
  const detail = failureText(output.stderr) ||
    `swamp exited with ${output.code}`;
  const reason: UnresolvedReason = /Rate-limited by server/.test(output.stderr)
    ? "rate_limited"
    : /Authentication failed|not authori[sz]ed|permission denied|forbidden/i
        .test(output.stderr)
    ? "auth"
    : "unreachable";
  return { state: "unresolved", reason, detail };
}

export interface PeerReaderOptions {
  peers: Record<string, Peer>;
  /** This repository's data query, for another instance here. */
  query?(predicate: string): Promise<unknown[]>;
  run?: PeerRun;
  readTimeoutMs?: number;
  budgetMs?: number;
}

export interface PeerReader {
  read(ref: ExternalRef): Promise<ExternalRead>;
}

const unresolved = (
  reason: UnresolvedReason,
  detail: string,
): ExternalRead => ({ state: "unresolved", reason, detail });

/**
 * A reader for one method call: each reference is read once, and reads stop
 * when the call's budget is spent.
 */
export function peerReader(options: PeerReaderOptions): PeerReader {
  const run = options.run ?? swampPeerRun();
  const readTimeoutMs = options.readTimeoutMs ?? PEER_READ_TIMEOUT_MS;
  const budgetMs = options.budgetMs ?? PEER_BUDGET_MS;
  const deadline = Date.now() + budgetMs;
  const seen = new Map<string, ExternalRead>();

  /** One command against a peer: its records, or why there are none. */
  const remote = async (
    peer: Peer,
    predicate: string,
  ): Promise<unknown[] | ExternalRead> => {
    const left = deadline - Date.now();
    if (left <= 0) {
      return unresolved("timeout", "this call's time for reads was spent");
    }
    const controller = new AbortController();
    let grace: ReturnType<typeof setTimeout> | undefined;
    // A child slow to die, or one holding its pipes open, must not outlast the
    // limit: the tracker's lock is held meanwhile.
    const abandoned = new Promise<PeerOutput>((resolve) => {
      controller.signal.addEventListener("abort", () => {
        grace = setTimeout(
          () => resolve({ code: 143, stdout: "", stderr: "" }),
          PEER_ABORT_GRACE_MS,
        );
      });
    });
    const timer = setTimeout(
      () => controller.abort(),
      Math.min(left, readTimeoutMs),
    );
    try {
      const output = await Promise.race([
        run(
          [
            "data",
            "query",
            predicate,
            "--json",
            "--no-color",
            "--no-telemetry",
            ...(peer.repo !== undefined
              ? ["--repo-dir", peer.repo]
              : ["--server", peer.server!]),
          ],
          peer.token,
          controller.signal,
        ),
        abandoned,
      ]);
      // An aborted command ends with its signal's exit code: it does not reject.
      if (controller.signal.aborted) {
        return unresolved(
          "timeout",
          `no answer within ${Math.min(left, readTimeoutMs)}ms`,
        );
      }
      if (output.code !== 0) return failureOf(output);
      try {
        const { results } = JSON.parse(output.stdout) as { results?: unknown };
        if (Array.isArray(results)) return results;
      } catch {
        // Reported below.
      }
      return unresolved("bad_answer", "swamp's answer had no results");
    } catch (error) {
      if (error instanceof UnsupportedRuntime) {
        return unresolved("unsupported_runtime", error.message);
      }
      if (controller.signal.aborted) {
        return unresolved(
          "timeout",
          `no answer within ${Math.min(left, readTimeoutMs)}ms`,
        );
      }
      return unresolved(
        "unreachable",
        (error instanceof Error ? error.message : String(error)).slice(0, 200),
      );
    } finally {
      clearTimeout(timer);
      clearTimeout(grace);
    }
  };

  /** The ticket in these records, as its id or its display id. */
  const match = (records: unknown[], id: string): ExternalRead | null => {
    const lower = id.toLowerCase();
    for (const record of records) {
      if ((record as { isLatest?: unknown } | null)?.isLatest === false) {
        continue;
      }
      const data = recordObject(record);
      if (data === null || data === undefined) continue;
      if (
        data.id !== id && data.id !== lower &&
        (typeof data.display !== "string" ||
          data.display.toLowerCase() !== lower)
      ) continue;
      const status = (data.status as { name?: unknown } | undefined)?.name;
      if (typeof data.id !== "string" || typeof status !== "string") {
        return unresolved("bad_answer", `the record of '${id}' has no status`);
      }
      return {
        state: "resolved",
        id: data.id,
        display: typeof data.display === "string" ? data.display : data.id,
        status,
        ...(typeof data.fetchedAt === "string"
          ? { fetchedAt: data.fetchedAt }
          : {}),
      };
    }
    return null;
  };

  const lookup = async (ref: ExternalRef): Promise<ExternalRead> => {
    const { tracker, id } = ref;
    // Its own entry only: a tracker may be named `constructor`.
    const peer = Object.hasOwn(options.peers, tracker)
      ? options.peers[tracker]
      : undefined;
    const { query } = options;
    if (peer === undefined && query === undefined) {
      return unresolved("no_peer", `no peer is configured for '${tracker}'`);
    }
    const ask = async (predicate: string) =>
      peer !== undefined ? await remote(peer, predicate) : await (async () => {
        try {
          return await query!(predicate);
        } catch (error) {
          return unresolved(
            "unreachable",
            (error instanceof Error ? error.message : String(error))
              .slice(0, 200),
          );
        }
      })();
    // The tracker's name passed the reference's rules, so it is safe in a
    // predicate, and the id is only ever compared with what comes back.
    const ofTracker = `modelName == "${
      peer?.instance ?? tracker
    }" && specName == "issue"`;
    const lower = id.toLowerCase();
    // By name first, so a stable id asks for one record; any other form, a
    // display id, is looked for among the tracker's tickets.
    if (/^[a-z0-9][a-z0-9._-]*$/.test(lower) && !lower.includes("..")) {
      const named = await ask(`${ofTracker} && name == "issue-${lower}"`);
      if (!Array.isArray(named)) return named;
      const found = match(named, id);
      if (found !== null) return found;
    }
    const all = await ask(ofTracker);
    if (!Array.isArray(all)) return all;
    const found = match(all, id);
    if (found !== null) return found;
    if (peer === undefined && all.length === 0) {
      return unresolved(
        "no_peer",
        `no tracker '${tracker}' with tickets is in this repository, and no ` +
          "peer is configured for it",
      );
    }
    return unresolved("not_found", `'${tracker}' has no ticket '${id}'`);
  };

  return {
    read: async (ref) => {
      const key = `${ref.tracker}:${ref.id}`;
      const prior = seen.get(key);
      if (prior !== undefined) return prior;
      const read = await lookup(ref);
      seen.set(key, read);
      return read;
    },
  };
}

/**
 * What a ticket's relations are known to be now: an external one through the
 * reader, a local one from this tracker's own record. `tracker` labels a bad
 * stored reference, which reads as unresolved rather than failing the read.
 */
export async function relationStatuses(
  relations: readonly TrackerRelation[],
  tracker: string,
  reader: PeerReader,
  readLocal: (id: string) => Promise<Record<string, unknown> | null>,
): Promise<RelationStatus[]> {
  const statuses: RelationStatus[] = [];
  for (const relation of relations) {
    const { type, direction, issue, display } = relation;
    const base = { type, direction, issue, display };
    let ref: ExternalRef | null;
    try {
      ref = parseExternalRef(issue, tracker);
    } catch (error) {
      statuses.push({
        ...base,
        external: true,
        state: "unresolved",
        reason: "bad_answer",
        detail: (error as Error).message.slice(0, 200),
      });
      continue;
    }
    if (ref === null) {
      const local = await readLocal(issue);
      const status = (local?.status as { name?: unknown } | undefined)?.name;
      statuses.push(
        typeof status === "string"
          ? { ...base, external: false, state: "resolved", status }
          : {
            ...base,
            external: false,
            state: "unresolved",
            reason: "not_found",
            detail: `this tracker has no ticket '${issue}'`,
          },
      );
      continue;
    }
    const read = await reader.read(ref);
    statuses.push(
      read.state === "resolved"
        ? {
          ...base,
          external: true,
          state: "resolved",
          status: read.status,
          ...(read.fetchedAt === undefined
            ? {}
            : { fetchedAt: read.fetchedAt }),
        }
        : {
          ...base,
          external: true,
          state: "unresolved",
          reason: read.reason,
          detail: read.detail,
        },
    );
  }
  return statuses;
}
