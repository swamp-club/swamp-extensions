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

import { stringify as stringifyYaml } from "jsr:@std/yaml@1.0.10";
import {
  type DefinitionText,
  type FactoryEntry,
  type FactorySource,
  sha256,
  type StudioEvent,
} from "./studio_server.ts";
import type { ModelArguments } from "./studio_tickets.ts";
import type { QueryData } from "./studio_work_items.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio reading a remote swamp serve (swamp-club #3363; DESIGN.md, "The
// studio server"). serve runs on the operator's machine and reads through
// swamp's own read commands with --server, so every read carries the
// operator's login and grants, and the serve stays the only writer:
// `model search` lists the factories, `model get` gives each one's model
// definition, and `data query` reads work items. No method runs on the serve,
// so nothing is written there and no factory's lock is taken.
//
// `model get` gives the definition as data, not the file: the page gets YAML
// written from its fields, so the server file's comments and layout are not
// shown. The factory routes answer from what the last poll read, so a page
// load starts no swamp call of its own once a factory has been read.
// ---------------------------------------------------------------------------

/** One swamp command against the serve: its parsed --json output. */
export type SwampRunner = (args: string[]) => Promise<unknown>;

/**
 * The swamp binary running this method, for the read commands. Under deno (a
 * development run) there is no swamp binary to call, and serve says so.
 */
export function swampBinary(execPath: string = Deno.execPath()): string {
  // Either separator: the path is the host's, and may be Windows'.
  const name = execPath.split(/[\\/]/).at(-1) ?? "";
  if (/^deno(\.exe)?$/i.test(name)) {
    throw new Error(
      `reading a remote serve calls the swamp binary running the studio, ` +
        `but this method runs under ${execPath}; run it with the installed swamp`,
    );
  }
  return execPath;
}

/**
 * Runs `swamp <args> --server <server> --json` with no shell. The child gets
 * this process's environment, so swamp finds the operator's stored login and
 * SWAMP_SERVER_TOKEN, SWAMP_CA_CERT and SWAMP_SERVE_EXTRA_HEADERS itself. A
 * failed command throws with swamp's own message.
 */
export function swampRunner(
  server: string,
  signal?: AbortSignal,
  binary: string = swampBinary(),
): SwampRunner {
  return async (args) => {
    const out = await new Deno.Command(binary, {
      args: [...args, "--server", server, "--json", "--no-color"],
      stdin: "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).output();
    const decoder = new TextDecoder();
    if (out.code !== 0) {
      throw new Error(failure(args, decoder.decode(out.stderr)));
    }
    const text = decoder.decode(out.stdout);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `swamp ${args[0]} ${args[1]} gave no JSON: ${text.slice(0, 200)}`,
      );
    }
  };
}

// ---------------------------------------------------------------------------
// Pacing (swamp-club #3906). Each swamp command opens its own WebSocket, and
// swamp serve allows 50 per source IP in 60 seconds (#3399), a budget a team
// behind one NAT address shares. So every remote read, the poll's and the
// page's, goes through one gate: one command at a time, a read already
// waiting or running shared by whoever asks for it again, and at most
// REMOTE_CALLS_PER_MINUTE commands started in any minute. When serve answers
// that it is rate-limiting, no command starts until the window has passed.
// One long-lived connection needs swamp's support (#3963).
// ---------------------------------------------------------------------------

/** The most swamp commands the studio starts in any minute: 40% of serve's 50. */
export const REMOTE_CALLS_PER_MINUTE = 20;

/** How long the studio starts no command once serve rate-limits it. */
export const RATE_LIMIT_WAIT_MS = 60_000;

/**
 * Whether swamp failed because serve refused the connection with a 429.
 * swamp gives this no error code or exit code of its own yet (#3963), so
 * its message is matched, as failure() passes it on.
 */
export function isRateLimited(e: unknown): boolean {
  return e instanceof Error && /Rate-limited by server/.test(e.message);
}

/** A read refused because serve is rate-limiting the studio. */
export class RateLimitedError extends Error {
  constructor(server: string, until: number) {
    // The same message for every read until `until`, so it is logged once.
    super(
      `${server} is rate-limiting this address (serve allows 50 ` +
        `connections a minute per address); reading again at ` +
        `${new Date(until).toISOString().slice(11, 19)} UTC`,
    );
    this.name = "RateLimitedError";
  }
}

/** The paced runner: one gate for the page's reads and the poll's. */
export interface PacedRunner {
  /** For a page's request: it goes ahead of every waiting poll read. */
  page: SwampRunner;
  /** For the poll. */
  poll: SwampRunner;
  /** When the wait after a rate limit ends, in ms, or 0 when there is none. */
  waitUntil(): number;
  /**
   * How many reads the rate limit has refused so far, so a clean poll after
   * them can tell the page to read again. Other failures do not count: a read
   * that always fails must not keep the poll from backing off.
   */
  refusals(): number;
}

interface Waiting {
  args: string[];
  page: boolean;
  resolve: (answer: unknown) => void;
  reject: (e: unknown) => void;
}

export function pacedRunner(
  run: SwampRunner,
  server: string,
  options: {
    perWindow?: number;
    windowMs?: number;
    rateLimitWaitMs?: number;
    signal?: AbortSignal;
  } = {},
): PacedRunner {
  const perWindow = options.perWindow ?? REMOTE_CALLS_PER_MINUTE;
  const windowMs = options.windowMs ?? 60_000;
  const rateLimitWaitMs = options.rateLimitWaitMs ?? RATE_LIMIT_WAIT_MS;
  const signal = options.signal;
  // The start of each command in the last window, oldest first.
  const started: number[] = [];
  // Each read waiting or running, by its arguments, so an identical read
  // shares it.
  const shared = new Map<
    string,
    { promise: Promise<unknown>; job?: Waiting }
  >();
  const queue: Waiting[] = [];
  let working = false;
  let waitUntil = 0;
  let refusals = 0;

  const refusal = () => new RateLimitedError(server, waitUntil);
  const stopped = () =>
    signal?.reason ?? new DOMException("the studio stopped", "AbortError");

  // Waits ms, or less when the shutdown signal comes first.
  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      const done = () => {
        clearTimeout(timer);
        signal?.removeEventListener("abort", done);
        resolve();
      };
      const timer = setTimeout(done, ms);
      signal?.addEventListener("abort", done);
    });

  async function work() {
    working = true;
    try {
      while (queue.length > 0) {
        if (signal?.aborted) {
          for (const job of queue.splice(0)) job.reject(stopped());
          return;
        }
        // A page's read first, else the oldest.
        const at = Math.max(0, queue.findIndex((j) => j.page));
        const job = queue[at];
        if (Date.now() < waitUntil) {
          queue.splice(at, 1);
          refusals++;
          job.reject(refusal());
          continue;
        }
        while (started.length > 0 && started[0] <= Date.now() - windowMs) {
          started.shift();
        }
        if (started.length >= perWindow) {
          // Over the budget: wait for the oldest start to leave the window,
          // then choose again, since a page's read may have come meanwhile.
          await sleep(started[0] + windowMs - Date.now());
          continue;
        }
        queue.splice(at, 1);
        started.push(Date.now());
        try {
          job.resolve(await run(job.args));
        } catch (e) {
          if (isRateLimited(e)) {
            refusals++;
            waitUntil = Date.now() + rateLimitWaitMs;
            job.reject(refusal());
          } else {
            job.reject(e);
          }
        }
      }
    } finally {
      working = false;
    }
  }

  const runner = (page: boolean): SwampRunner => (args) => {
    if (signal?.aborted) return Promise.reject(stopped());
    if (Date.now() < waitUntil) {
      refusals++;
      return Promise.reject(refusal());
    }
    const key = JSON.stringify(args);
    const held = shared.get(key);
    if (held !== undefined) {
      // A page joining a poll's waiting read moves it up with it.
      if (page && held.job !== undefined) held.job.page = true;
      return held.promise;
    }
    const entry: { promise: Promise<unknown>; job?: Waiting } = {
      promise: Promise.resolve(),
    };
    entry.promise = new Promise<unknown>((resolve, reject) => {
      entry.job = { args, page, resolve, reject };
      queue.push(entry.job);
    }).finally(() => shared.delete(key));
    shared.set(key, entry);
    if (!working) void work();
    return entry.promise;
  };

  return {
    page: runner(true),
    poll: runner(false),
    waitUntil: () => waitUntil,
    refusals: () => refusals,
  };
}

/**
 * Why a command failed: the error of the JSON envelope swamp writes to
 * stderr with --json, after the lines it prints first (the server it is
 * reaching), or the last line of stderr when there is none.
 */
export function failure(args: string[], stderr: string): string {
  const command = `swamp ${args[0]} ${args[1]}`;
  const start = stderr.search(/^\{/m);
  if (start !== -1) {
    try {
      const envelope = JSON.parse(stderr.slice(start)) as { error?: unknown };
      if (typeof envelope.error === "string") {
        return `${command} failed: ${envelope.error}`;
      }
    } catch {
      // Not the envelope; the text is shown instead.
    }
  }
  const last = stderr.trim().split("\n").at(-1)?.trim() ?? "";
  return `${command} failed${last === "" ? "" : `: ${last}`}`;
}

/** The results array of a --json answer; throws on any other shape. */
function resultsOf(answer: unknown, command: string): unknown[] {
  const results = answer !== null && typeof answer === "object"
    ? (answer as { results?: unknown }).results
    : undefined;
  if (!Array.isArray(results)) {
    throw new Error(`swamp ${command} gave no results list`);
  }
  return results;
}

/** swamp's data query, through `swamp data query` on the serve. */
export function remoteQuery(run: SwampRunner): QueryData {
  return async (predicate, select) => {
    const args = ["data", "query", predicate];
    if (select !== undefined) args.push("--select", select);
    return resultsOf(await run(args), "data query");
  };
}

/** The name of every factory the serve holds, sorted. */
export async function remoteFactoryNames(run: SwampRunner): Promise<string[]> {
  const names = new Set<string>();
  for (
    const found of resultsOf(await run(["model", "search"]), "model search")
  ) {
    const { name, type } = (found ?? {}) as { name?: unknown; type?: unknown };
    if (type === FACTORY_TYPE && typeof name === "string" && name !== "") {
      names.add(name);
    }
  }
  return [...names].sort();
}

/** How the page shows where a remote factory's definition is from. */
export function remotePath(server: string, name: string): string {
  return `${name} on ${server}`;
}

/**
 * A factory's model definition, from `model get` on the serve, written as
 * YAML from the fields of a model definition file. The rest of what model
 * get gives (the type's methods and argument schema, its current version and
 * staleness) is not in the file, so it is left out.
 */
export async function remoteDefinition(
  run: SwampRunner,
  server: string,
  name: string,
): Promise<DefinitionText> {
  if (name.startsWith("-")) throw new Error(dashed(name));
  const got = await run(["model", "get", name]);
  if (got === null || typeof got !== "object") {
    throw new Error(`swamp model get ${name} gave no model definition`);
  }
  const d = got as Record<string, unknown>;
  if (d.type !== FACTORY_TYPE || d.name !== name) {
    throw new Error(`'${name}' on ${server} is not a factory`);
  }
  const file: Record<string, unknown> = {};
  for (
    const field of [
      "type",
      "typeVersion",
      "id",
      "name",
      "version",
      "tags",
      "globalArguments",
    ]
  ) {
    if (d[field] !== undefined) file[field] = d[field];
  }
  const text = stringifyYaml(file);
  return {
    factory: name,
    path: remotePath(server, name),
    text,
    digest: await sha256(text),
  };
}

/**
 * Any model's type and globalArguments, from `model get` on the serve, or
 * null when the serve has no model of that name.
 */
export async function remoteModel(
  run: SwampRunner,
  name: string,
  names?: Set<string>,
): Promise<ModelArguments | null> {
  if (name.startsWith("-")) throw new Error(dashed(name));
  if (!(names ?? await remoteModelNames(run)).has(name)) return null;
  const got = await run(["model", "get", name]);
  const d = (got ?? {}) as Record<string, unknown>;
  if (typeof d.type !== "string") {
    throw new Error(`swamp model get ${name} gave no model definition`);
  }
  const args = d.globalArguments;
  return {
    type: d.type,
    globalArguments: args !== null && typeof args === "object" &&
        !Array.isArray(args)
      ? args as Record<string, unknown>
      : {},
  };
}

/** The name of every model the serve holds. */
export async function remoteModelNames(run: SwampRunner): Promise<Set<string>> {
  const names = new Set<string>();
  for (
    const found of resultsOf(await run(["model", "search"]), "model search")
  ) {
    const { name } = (found ?? {}) as { name?: unknown };
    if (typeof name === "string" && name !== "") names.add(name);
  }
  return names;
}

/** Why a factory named with a leading dash is not read. */
function dashed(name: string): string {
  return `factory '${name}': a name starting with '-' is not passed to ` +
    `swamp model get, which would read it as an option`;
}

/** The remote factories, read by the poll, for the factory routes. */
export interface RemoteFactories extends FactorySource {
  /**
   * One poll: list the factories again and read each definition the page has
   * opened, telling `emit` of what changed. A failed read keeps what was
   * read last and is reported to `onError`; the next poll tries again.
   * Resolves true when every read succeeded.
   */
  poll(): Promise<boolean>;
}

export function remoteFactories(
  run: SwampRunner,
  server: string,
  emit: (event: StudioEvent) => void,
  onError: (message: string) => void = () => {},
  // The poll's reads, when they go through the paced runner's poll side.
  pollRun: SwampRunner = run,
): RemoteFactories {
  let listed: FactoryEntry[] | null = null;
  // Each definition read, by factory: the ones the page opened.
  const read = new Map<string, DefinitionText>();
  // Each other model read, by name: a factory and its tracker instance.
  // Only those a page asked for since the last poll are read again.
  const models = new Map<string, ModelArguments | null>();
  const asked = new Set<string>();

  const entryOf = (name: string): FactoryEntry =>
    name.startsWith("-")
      ? { name, path: null, error: dashed(name) }
      : { name, path: remotePath(server, name) };

  async function relist(by: SwampRunner): Promise<FactoryEntry[]> {
    const next = (await remoteFactoryNames(by)).map(entryOf);
    if (
      listed !== null && JSON.stringify(next) !== JSON.stringify(listed)
    ) emit({ kind: "factories" });
    listed = next;
    for (const name of read.keys()) {
      if (!next.some((f) => f.name === name)) read.delete(name);
    }
    return next;
  }

  return {
    async list() {
      return listed ?? await relist(run);
    },
    async definition(entry) {
      const held = read.get(entry.name);
      if (held !== undefined) return held;
      const text = await remoteDefinition(run, server, entry.name);
      read.set(entry.name, text);
      return text;
    },
    async model(name) {
      asked.add(name);
      if (models.has(name)) return models.get(name) ?? null;
      const got = await remoteModel(run, name);
      models.set(name, got);
      return got;
    },
    async poll() {
      try {
        await relist(pollRun);
      } catch (e) {
        onError(message(e));
        return false;
      }
      let ok = true;
      for (const name of models.keys()) {
        if (!asked.has(name)) models.delete(name);
      }
      asked.clear();
      if (models.size > 0) {
        // One search for every name, then a model get for each one held; a
        // read that fails keeps that model's last copy until the next poll.
        let names: Set<string> | null = null;
        try {
          names = await remoteModelNames(pollRun);
        } catch (e) {
          onError(message(e));
          ok = false;
        }
        for (const name of names === null ? [] : models.keys()) {
          try {
            models.set(
              name,
              await remoteModel(pollRun, name, names ?? undefined),
            );
          } catch (e) {
            onError(message(e));
            ok = false;
          }
        }
      }
      for (const [name, before] of read) {
        let now: DefinitionText;
        try {
          now = await remoteDefinition(pollRun, server, name);
        } catch (e) {
          onError(message(e));
          ok = false;
          continue;
        }
        read.set(name, now);
        if (now.digest !== before.digest) {
          emit({ kind: "definition", factory: name });
        }
      }
      return ok;
    },
  };
}

const message = (e: unknown) => e instanceof Error ? e.message : String(e);
