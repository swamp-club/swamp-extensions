// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { denoRepoFiles } from "./studio_files.ts";
import {
  type FactoryLister,
  handleStudioRequest,
  listFactories,
  type StudioAsset,
  type StudioDeps,
  type StudioEvent,
  type StudioEvents,
} from "./studio_server.ts";
import { watchStudio } from "./studio_watch.ts";
import { type QueryData, watchWorkItems } from "./studio_work_items.ts";
import type { Logger, MethodOutput } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's serve method: the handler on 127.0.0.1, with the file watch,
// until swamp aborts the method (Ctrl-C). It holds no state and runs no
// engine; the page does that.
// ---------------------------------------------------------------------------

/** How often serve reads the factory list again. */
const RELIST_SECONDS = 3;

/** How often serve polls the work items a page has open. */
const WORK_ITEM_POLL_SECONDS = 3;

/** The part of swamp's method context serve uses. */
export interface StudioContext {
  repoDir?: string;
  definitionRepository?: unknown;
  /** swamp's data query, for work items. */
  queryData?: QueryData;
  logger: Logger;
  signal?: AbortSignal;
}

export async function serveStudio(
  ctx: StudioContext,
  port: number,
  assets: Readonly<Record<string, StudioAsset>>,
): Promise<MethodOutput> {
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
  if (typeof ctx.queryData !== "function") {
    throw new Error("this method context cannot query data");
  }
  const query: QueryData = ctx.queryData.bind(ctx);
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
  const workItems = watchWorkItems(
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
  const poll = setInterval(() => {
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
    const server = Deno.serve({
      hostname: "127.0.0.1",
      port,
      signal: ctx.signal,
      onListen: ({ port }) =>
        ctx.logger.info(`studio: http://127.0.0.1:${port}/`),
    }, (req) => handleStudioRequest(req, deps));
    deps.port = server.addr.port;
    await server.finished;
  } finally {
    // Also when the port cannot be bound.
    clearInterval(relist);
    clearInterval(poll);
    watcher.close();
  }
  return { dataHandles: [] };
}
