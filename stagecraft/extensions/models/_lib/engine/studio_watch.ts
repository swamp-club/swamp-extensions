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
// when serve reads the list again. A watched directory deleted and made again
// keeps the old watch silent, so each is known by its inode too: the next
// list watches the new one, and reloads the factories in it. The unit tests
// use a fake event source; this runs in the integration suite.
// ---------------------------------------------------------------------------

export interface StudioWatcher extends StudioEvents {
  /**
   * Watch these factories' model definition files, by factory name; a no-op
   * when nothing changed.
   */
  follow(factories: FactoryEntry[], files: Map<string, string>): Promise<void>;
  close(): void;
}

/** How long a refresh waits for a closed watch's loop to end. */
const CLOSE_WAIT_MS = 1000;

/** A directory's watch, and its event loop, which ends once it has closed. */
interface Watch {
  watcher: Deno.FsWatcher;
  ended: Promise<void>;
}

export function watchStudio(
  files: RepoFiles = denoRepoFiles,
  debounceMs = 100,
): StudioWatcher {
  const listeners = new Set<(event: StudioEvent) => void>();
  // The watch on each directory, with the directory's inode when it opened
  // (null where the platform gives none).
  const watchers = new Map<string, Watch & { ino: number | null }>();
  // Closed watches whose loops have not ended yet, by directory.
  const closing = new Map<string, Promise<void>>();
  let closed = false;
  let listed = "[]";
  // Factory names by the real path of their model definition file.
  let definitions = new Map<string, string[]>();
  let started = false;

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

  const watch = (path: string): Watch => {
    const watcher = Deno.watchFs(path, { recursive: false });
    const ended = (async () => {
      for await (const event of watcher) event.paths.forEach(changed);
    })().catch(() => {
      // The watch closed under its loop, or its directory went; the next
      // refresh watches afresh.
    });
    return { watcher, ended };
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
    // Before the watch opens: a directory replaced in between then shows as
    // changed on the next list, never the other way round.
    const ids = new Map<string, number | null>();
    for (const dir of dirs) {
      try {
        ids.set(dir, (await Deno.stat(dir)).ino);
      } catch {
        // Gone since its file resolved; the next listing sees it.
        continue;
      }
    }
    // A factory newly resolved, or in a directory not watched as it is now
    // (made again, or not watched before), may have changed unseen. They are
    // told once the new watches are open, so no edit falls between the two.
    const unseen: string[] = [];
    if (started) {
      for (const [real, names] of defs) {
        const dir = dirname(real);
        const moved = watchers.get(dir)?.ino !== ids.get(dir);
        const before = definitions.get(real) ?? [];
        for (const factory of names) {
          if (moved || !before.includes(factory)) unseen.push(factory);
        }
      }
    }
    started = true;
    definitions = defs;
    if (closed) return;
    // A directory dropped from the list, or made again, loses its watch
    // before any new one opens: Deno keeps one watch per path, so a new watch
    // on a path whose old watch has not finished closing (its loop has not
    // ended) stays on the deleted directory and sees nothing.
    for (const [dir, { watcher, ended, ino }] of watchers) {
      if (ino === ids.get(dir)) continue;
      watchers.delete(dir);
      try {
        watcher.close();
      } catch {
        // Already closed; its loop ends all the same.
      }
      const done: Promise<void> = ended.then(() => {
        if (closing.get(dir) === done) closing.delete(dir);
      });
      closing.set(dir, done);
    }
    // Bounded, so a watch whose loop never ends cannot hold up every later
    // refresh. A directory whose old watch is still closing is left
    // unwatched, and the next refresh tries it again.
    let timeout: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([
      Promise.all(closing.values()),
      new Promise((resolve) => (timeout = setTimeout(resolve, CLOSE_WAIT_MS))),
    ]);
    clearTimeout(timeout);
    if (closed) return;
    try {
      for (const [dir, ino] of ids) {
        if (watchers.has(dir) || closing.has(dir)) continue;
        watchers.set(dir, { ...watch(dir), ino });
      }
    } finally {
      for (const factory of unseen) emit({ kind: "definition", factory });
    }
  }

  // One refresh at a time, in order, so a slow one never overwrites a newer
  // list. A failed refresh (a directory removed under it) never rejects: the
  // watches it opened stay, and the next one opens the rest.
  let queue: Promise<void> = Promise.resolve();
  function follow(
    next: FactoryEntry[],
    paths: Map<string, string>,
  ): Promise<void> {
    queue = queue.then(() => refresh(next, paths)).catch(() => {});
    return queue;
  }

  function close() {
    closed = true;
    for (const { watcher } of watchers.values()) watcher.close();
    watchers.clear();
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
