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

import { dirname } from "jsr:@std/path@1.1.4";
import { denoRepoFiles, type RepoFiles } from "./studio_files.ts";
import type {
  FactoryEntry,
  StudioEvent,
  StudioEvents,
} from "./studio_server.ts";

// ---------------------------------------------------------------------------
// The studio's file watch: tells the page when an agent changes a factory's
// model definition file, which holds its definition and saved scenarios, so
// the page reloads the edit.
//
// It watches the directory holding each file, not the file, so an agent's
// write by rename is seen too. Every watch is one level deep, on the
// directory of a path swamp's definition repository gave. Paths nobody asked
// about are dropped. Events are coalesced for a short debounce, since one save
// is often several file-system events. A factory created or removed shows
// when serve reads the list again. The unit tests use a fake event source;
// this runs in the integration suite.
// ---------------------------------------------------------------------------

export interface StudioWatcher extends StudioEvents {
  /**
   * Watch these factories' model definition files, by factory name; a no-op
   * when nothing changed.
   */
  follow(factories: FactoryEntry[], files: Map<string, string>): Promise<void>;
  close(): void;
}

export function watchStudio(
  files: RepoFiles = denoRepoFiles,
  debounceMs = 100,
): StudioWatcher {
  const listeners = new Set<(event: StudioEvent) => void>();
  let watchers: Deno.FsWatcher[] = [];
  let key = "";
  let closed = false;
  let listed = "[]";
  // Factory names by the real path of their model definition file.
  let definitions = new Map<string, string[]>();

  const pending = new Map<string, StudioEvent>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const emit = (event: StudioEvent) => {
    pending.set(JSON.stringify(event), event);
    if (timer !== undefined) return;
    timer = setTimeout(() => {
      timer = undefined;
      const events = [...pending.values()];
      pending.clear();
      for (const e of events) for (const listener of listeners) listener(e);
    }, debounceMs);
  };

  const changed = (path: string) => {
    for (const factory of definitions.get(path) ?? []) {
      emit({ kind: "definition", factory });
    }
  };

  const watch = (path: string): Deno.FsWatcher => {
    const w = Deno.watchFs(path, { recursive: false });
    (async () => {
      for await (const event of w) event.paths.forEach(changed);
    })().catch(() => {
      // The watch closed under its loop, or its directory went; the next
      // refresh watches afresh.
    });
    return w;
  };

  async function refresh(
    next: FactoryEntry[],
    paths: Map<string, string>,
  ): Promise<void> {
    if (closed) return;
    // A factory added, removed or renamed, or moved to another file.
    const nextListed = JSON.stringify(next.map((f) => [f.name, f.path]));
    if (nextListed !== listed) emit({ kind: "factories" });
    listed = nextListed;
    const defs = new Map<string, string[]>();
    const dirs = new Set<string>();
    for (const [name, file] of paths) {
      let real: string;
      try {
        real = await files.realPath(file);
      } catch {
        // Gone between the listing and now; the next listing drops it.
        continue;
      }
      defs.set(real, [...(defs.get(real) ?? []), name]);
      dirs.add(dirname(real));
    }
    const nextKey = JSON.stringify([
      [...dirs].sort(),
      [...defs.entries()].sort(),
    ]);
    definitions = defs;
    if (nextKey === key || closed) return;
    // The new watches first: if one fails, the old ones stay.
    const fresh: Deno.FsWatcher[] = [];
    try {
      for (const d of dirs) fresh.push(watch(d));
    } catch (error) {
      for (const w of fresh) w.close();
      throw error;
    }
    for (const w of watchers) w.close();
    watchers = fresh;
    key = nextKey;
    if (closed) close();
  }

  // One refresh at a time, in order, so a slow one never overwrites a newer
  // list. A failed refresh (a directory removed under it) never rejects:
  // it leaves the old watches and clears the key, so the next one retries.
  let queue: Promise<void> = Promise.resolve();
  function follow(
    next: FactoryEntry[],
    paths: Map<string, string>,
  ): Promise<void> {
    queue = queue.then(() => refresh(next, paths)).catch(() => {
      key = "";
    });
    return queue;
  }

  function close() {
    closed = true;
    for (const w of watchers) w.close();
    watchers = [];
    if (timer !== undefined) clearTimeout(timer);
    listeners.clear();
  }

  return {
    follow,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    close,
  };
}
