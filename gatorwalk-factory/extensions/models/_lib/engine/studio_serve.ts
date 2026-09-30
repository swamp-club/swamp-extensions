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

import { denoRepoFiles } from "./definition_file.ts";
import {
  type FactoryLister,
  handleStudioRequest,
  listFactories,
  type StudioAsset,
  type StudioDeps,
} from "./studio_server.ts";
import { watchStudio } from "./studio_watch.ts";
import type { Logger, MethodOutput } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's serve method: the handler on 127.0.0.1, with the file watch,
// until swamp aborts the method (Ctrl-C). It holds no state and runs no
// engine; the page does that.
// ---------------------------------------------------------------------------

/** How often serve reads the factory list again. */
const RELIST_SECONDS = 3;

/** The part of swamp's method context serve uses. */
export interface StudioContext {
  repoDir?: string;
  definitionRepository?: unknown;
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
  if (typeof lister?.findAllGlobal !== "function") {
    throw new Error("this method context cannot list model definitions");
  }
  const factories = lister as FactoryLister;
  const watcher = watchStudio(repoDir);
  // A factory created or removed while the studio is open: swamp says
  // nothing, so the list is read again every few seconds. The watch tells
  // the page when it changed.
  const relist = setInterval(() => {
    listFactories(factories).then(watcher.follow).catch(() => {
      // A definition mid-write; the next read sees it whole.
    });
  }, RELIST_SECONDS * 1000);
  try {
    await watcher.follow(await listFactories(factories));
    const deps: StudioDeps = {
      repoDir,
      // Set once the server has bound, before any request can arrive.
      port: 0,
      files: denoRepoFiles,
      factories,
      assets,
      events: watcher,
      onFactories: (list) => void watcher.follow(list),
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
    watcher.close();
  }
  return { dataHandles: [] };
}
