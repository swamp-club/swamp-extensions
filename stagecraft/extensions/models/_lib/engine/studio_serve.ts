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

import { denoRepoFiles } from "./studio_files.ts";
import {
  type FactoryLister,
  handleStudioRequest,
  listFactories,
  parsePublicOrigin,
  type StudioAsset,
  type StudioDeps,
  type StudioEvent,
  type StudioEvents,
} from "./studio_server.ts";
import {
  remoteFactories,
  remoteQuery,
  type SwampRunner,
  swampRunner,
} from "./studio_remote.ts";
import { watchStudio } from "./studio_watch.ts";
import { type QueryData, watchWorkItems } from "./studio_work_items.ts";
import type { Logger, MethodOutput } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's serve method: the handler on 127.0.0.1, with the file watch,
// until swamp aborts the method (Ctrl-C). It holds no state and runs no
// engine; the page does that. Given a server, it reads that swamp serve
// instead of this repo (studio_remote.ts), on loopback only.
// ---------------------------------------------------------------------------

/** How often serve reads the factory list again. */
const RELIST_SECONDS = 3;

/** How often serve polls the work items a page has open. */
const WORK_ITEM_POLL_SECONDS = 3;

/**
 * How often a studio reading a remote serve reads its factories and work
 * items again while a page is open. Each read is a swamp command (about 0.7s,
 * mostly starting swamp), and nobody iterates on a deployed factory's
 * definition, so slowly.
 */
const REMOTE_POLL_SECONDS = 15;

/** The longest wait between remote polls, reached while nothing changes. */
const REMOTE_POLL_MAX_SECONDS = 60;

/** The part of swamp's method context serve uses. */
export interface StudioContext {
  repoDir?: string;
  definitionRepository?: unknown;
  /** swamp's data query, for work items. */
  queryData?: QueryData;
  logger: Logger;
  signal?: AbortSignal;
}

/**
 * The remote serve a studio reads, and how it runs swamp and how often it
 * polls (tests fake both).
 */
export interface StudioRemote {
  server: string;
  run?: SwampRunner;
  /** The poll interval while things change; four times it is the longest. */
  pollSeconds?: number;
}

/**
 * The wait before the next remote poll: the base after a poll that told the
 * page of a change, otherwise twice the last wait, up to max.
 */
export function nextPollDelay(
  last: number,
  changed: boolean,
  base: number,
  max: number,
): number {
  return changed ? base : Math.min(last * 2, max);
}

export async function serveStudio(
  ctx: StudioContext,
  port: number,
  assets: Readonly<Record<string, StudioAsset>>,
  publicOrigin?: string,
  remote?: StudioRemote,
): Promise<MethodOutput> {
  // Checked here as well as in the argument schema, so a bad value stops
  // serve before it binds rather than failing each request.
  if (publicOrigin !== undefined) parsePublicOrigin(publicOrigin);
  if (remote !== undefined) {
    parseServer(remote.server);
    if (publicOrigin !== undefined) throw new Error(REMOTE_PUBLIC);
    return await serveRemote(ctx, port, assets, remote);
  }
  const repoDir = ctx.repoDir;
  if (repoDir === undefined) {
    throw new Error("this method context has no repo directory");
  }
  const lister = ctx.definitionRepository as Partial<FactoryLister> | undefined;
  if (
    typeof lister?.findAllGlobal !== "function" ||
    typeof lister.getPath !== "function"
  ) {
    throw new Error("this method context cannot list model definitions");
  }
  // Without swamp's data query the studio still designs and simulates; the
  // work-item routes answer that they cannot read work items.
  const query: QueryData | undefined = typeof ctx.queryData === "function"
    ? ctx.queryData.bind(ctx)
    : undefined;
  if (query === undefined) {
    ctx.logger.info(
      "studio: this swamp gives no data query; work items are not shown",
    );
  }
  // getPath is a method of swamp's repository class: bound, so it keeps its
  // this when called through the lister.
  const repository = lister as FactoryLister;
  const factories: FactoryLister = {
    findAllGlobal: () => repository.findAllGlobal(),
    getPath: (type, id) => repository.getPath(type, id),
  };
  // The factories listed so far, so one whose file swamp skips mid-edit
  // stays listed; shared by the relist and every request.
  const remembered = new Map<string, string>();
  const memory = { factories: remembered, files: denoRepoFiles };
  const watcher = watchStudio();
  // The page hears of file changes from the watch, and of work items from
  // the poll: one stream carries both.
  const polled = new Set<(event: StudioEvent) => void>();
  const workItems = query === undefined ? undefined : watchWorkItems(
    query,
    (event) => polled.forEach((listener) => listener(event)),
  );
  const events: StudioEvents = {
    subscribe(listener) {
      const off = watcher.subscribe(listener);
      polled.add(listener);
      return () => {
        off();
        polled.delete(listener);
      };
    },
  };
  // One poll at a time: a slow datastore skips a beat rather than piling up.
  let polling = false;
  const poll = workItems === undefined ? undefined : setInterval(() => {
    if (polling) return;
    polling = true;
    workItems.tick().finally(() => (polling = false));
  }, WORK_ITEM_POLL_SECONDS * 1000);
  // A factory created or removed while the studio is open: swamp says
  // nothing, so the list is read again every few seconds. The watch tells
  // the page when it changed.
  const relist = setInterval(() => {
    listFactories(factories, repoDir, memory).then(({ entries, files }) =>
      watcher.follow(entries, files)
    ).catch(() => {
      // A definition mid-write; the next read sees it whole.
    });
  }, RELIST_SECONDS * 1000);
  try {
    const first = await listFactories(factories, repoDir, memory);
    await watcher.follow(first.entries, first.files);
    const deps: StudioDeps = {
      repoDir,
      // Set once the server has bound, before any request can arrive.
      port: 0,
      publicOrigin,
      files: denoRepoFiles,
      factories,
      remembered,
      assets,
      events,
      query,
      workItems,
      onFactories: (list, files) => void watcher.follow(list, files),
      // Deno.serve waits for open responses when it stops, so the event
      // streams close on the same signal.
      signal: ctx.signal,
    };
    await listen(ctx, port, deps, () => {
      if (publicOrigin === undefined) return;
      ctx.logger.info(
        `studio: also answering at ${publicOrigin}/ through a proxy. ` +
          "The studio has no authentication: anyone who can reach that " +
          "address reads every factory definition and work item, so put " +
          "access control in the proxy.",
      );
    });
  } finally {
    // Also when the port cannot be bound.
    clearInterval(relist);
    clearInterval(poll);
    watcher.close();
  }
  return { dataHandles: [] };
}

/** Why server and publicOrigin are refused together. */
export const REMOTE_PUBLIC =
  "server cannot be combined with publicOrigin: a studio reading a remote " +
  "serve reads it with your own login, so it answers on 127.0.0.1 only and " +
  "is never published through a proxy";

/**
 * The swamp serve a studio reads, as given: an absolute ws, wss, http or
 * https URL with no credentials in it. Throws on anything else.
 */
export function parseServer(text: string): string {
  let url: URL | null = null;
  try {
    url = new URL(text);
  } catch {
    // Reported below.
  }
  if (
    url === null ||
    !["ws:", "wss:", "http:", "https:"].includes(url.protocol)
  ) {
    throw new Error(
      `server must be a swamp serve URL such as wss://swamp.example.com ` +
        `(ws, wss, http or https), not '${text}'`,
    );
  }
  if (url.username !== "" || url.password !== "") {
    throw new Error(
      "server must not carry credentials; swamp reads your login itself",
    );
  }
  return text;
}

/** Runs the handler on 127.0.0.1 until the signal, logging its URL. */
async function listen(
  ctx: StudioContext,
  port: number,
  deps: StudioDeps,
  listened: () => void,
): Promise<void> {
  const server = Deno.serve({
    hostname: "127.0.0.1",
    port,
    signal: ctx.signal,
    onListen: ({ port }) => {
      ctx.logger.info(`studio: http://127.0.0.1:${port}/`);
      listened();
    },
  }, (req) => handleStudioRequest(req, deps));
  deps.port = server.addr.port;
  await server.finished;
}

/**
 * serve on a remote swamp serve's factories and work items, read with
 * swamp's read commands. No file is watched: one slow poll reads the factory
 * list, the definitions the page opened and the work items it watches, and
 * only while a page holds the event stream, since each read starts swamp.
 */
async function serveRemote(
  ctx: StudioContext,
  port: number,
  assets: Readonly<Record<string, StudioAsset>>,
  remote: StudioRemote,
): Promise<MethodOutput> {
  const { server } = remote;
  const run = remote.run ?? swampRunner(server, ctx.signal);
  const listeners = new Set<(event: StudioEvent) => void>();
  // Whether the poll told the page anything. One that did not, a failed one
  // included, backs off; the failure is logged and the next poll tries again.
  let changed = false;
  const emit = (event: StudioEvent) => {
    changed = true;
    listeners.forEach((l) => l(event));
  };
  // A failed read is told once, not on every poll, until another differs or
  // a good poll ends the outage. A read the shutdown killed is not told.
  let told: string | null = null;
  const factories = remoteFactories(run, server, emit, (message) => {
    if (ctx.signal?.aborted || message === told) return;
    told = message;
    ctx.logger.info(
      `studio: reading ${server} failed, showing the last read: ${message}`,
    );
  });
  // The first read stops serve before it binds when the server cannot be
  // read: a wrong URL, no login, or no grant to read it.
  try {
    await factories.list();
  } catch (e) {
    throw new Error(
      `studio: cannot read ${server}: ${e instanceof Error ? e.message : e}`,
    );
  }
  const query = remoteQuery(run);
  const workItems = watchWorkItems(query, emit);
  // Polled only while a page listens: with none, nothing is read. One poll
  // at a time, each scheduled when the last ends, so a slow serve delays the
  // next rather than piling them up.
  const base = (remote.pollSeconds ?? REMOTE_POLL_SECONDS) * 1000;
  const max = base * (REMOTE_POLL_MAX_SECONDS / REMOTE_POLL_SECONDS);
  let delay = base;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let polling = false;
  let stopped = false;
  // The first read, above, counts as a poll.
  let polledAt = Date.now();
  const schedule = (ms: number) => (timer = setTimeout(poll, ms));
  function poll() {
    timer = undefined;
    polling = true;
    changed = false;
    factories.poll().then((ok) => {
      if (ok) told = null;
      return workItems.tick();
    }).finally(() => {
      polling = false;
      polledAt = Date.now();
      delay = nextPollDelay(delay, changed, base, max);
      if (!stopped && listeners.size > 0) schedule(delay);
    });
  }
  const events: StudioEvents = {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) {
        // The first page after a quiet spell: read at once if the last read
        // is a poll old, so the page is told of what changed meanwhile.
        delay = base;
        if (timer === undefined && !polling) {
          schedule(Math.max(0, polledAt + base - Date.now()));
        }
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && timer !== undefined) {
          clearTimeout(timer);
          timer = undefined;
        }
      };
    },
  };
  try {
    const deps: StudioDeps = {
      repoDir: ctx.repoDir ?? "",
      port: 0,
      files: denoRepoFiles,
      factories: NO_FACTORIES,
      remote: factories,
      assets,
      events,
      query,
      workItems,
      signal: ctx.signal,
    };
    await listen(ctx, port, deps, () =>
      ctx.logger.info(
        `studio: reading ${server} with your swamp login while a page is ` +
          `open, every ${base / 1000}s, slowing to ${max / 1000}s while ` +
          `nothing changes; it only reads`,
      ));
  } finally {
    stopped = true;
    clearTimeout(timer);
  }
  return { dataHandles: [] };
}

/** The local listing a remote studio never reads. */
const NO_FACTORIES: FactoryLister = {
  findAllGlobal: () => Promise.resolve([]),
  getPath: () => {
    throw new Error("a studio reading a remote serve lists no local files");
  },
};
