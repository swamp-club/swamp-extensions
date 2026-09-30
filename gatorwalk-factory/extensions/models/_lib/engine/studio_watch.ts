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

import { dirname, join, relative, SEPARATOR } from "jsr:@std/path@1.1.4";
import {
  denoRepoFiles,
  type RepoFiles,
  resolveDefinitionPath,
  SCENARIO_DIR,
} from "./definition_file.ts";
import {
  type FactoryEntry,
  inside,
  type StudioEvent,
  type StudioEvents,
} from "./studio_server.ts";

// ---------------------------------------------------------------------------
// The studio's file watch: tells the page when an agent changes a factory's
// definition file or its scenario files, so the page reloads the edit.
//
// It watches the directory holding each definition file, not the file, so an
// agent's write by rename is seen too (or, before that directory exists, the
// nearest one above it, until it appears); scenarios/ and each factory's
// directory in it; and the repo root, to see scenarios/ appear. Every watch
// is one level deep, on a directory whose real path is inside the repo, so
// no symlink leads a watch out of it. Paths nobody asked about are dropped.
// Events are coalesced for a short debounce, since one save is often several
// file-system events. The unit tests use a fake event source; this runs in
// the integration suite.
// ---------------------------------------------------------------------------

export interface StudioWatcher extends StudioEvents {
  /** Watch these factories' files; a no-op when nothing changed. */
  follow(factories: FactoryEntry[]): Promise<void>;
  close(): void;
}

export function watchStudio(
  repoDir: string,
  files: RepoFiles = denoRepoFiles,
  debounceMs = 100,
): StudioWatcher {
  const listeners = new Set<(event: StudioEvent) => void>();
  let watchers: Deno.FsWatcher[] = [];
  let key = "";
  let closed = false;
  let factories: FactoryEntry[] = [];
  let realRepo = repoDir;
  let definitions = new Map<string, string[]>();
  let scenarioRoot = join(repoDir, SCENARIO_DIR);

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

  // Definition paths whose directory does not exist yet, by factory.
  let awaited = new Map<string, string[]>();

  /** Watch afresh, then tell the page about these factories' files. */
  const refollow = (touched: string[] = []) => {
    key = "";
    void follow(factories).then(() => {
      for (const factory of touched) emit({ kind: "definition", factory });
    });
  };

  const changed = (path: string) => {
    for (const factory of definitions.get(path) ?? []) {
      emit({ kind: "definition", factory });
    }
    // A directory on the way to a definition file appeared: watch it now,
    // and reload those factories in case the file came with it.
    const created = [...awaited.entries()]
      .filter(([def]) => def.startsWith(`${path}${SEPARATOR}`))
      .flatMap(([, names]) => names);
    if (created.length > 0) refollow(created);
    if (path === scenarioRoot) {
      // scenarios/ appeared or went: watch it afresh, and every list may
      // have changed.
      refollow();
      for (const f of factories) emit({ kind: "scenarios", factory: f.name });
      return;
    }
    if (!inside(scenarioRoot, path)) return;
    const rel = relative(scenarioRoot, path);
    const [factory, file] = rel.split(SEPARATOR);
    const name = file?.match(/^(.+)\.ya?ml$/)?.[1];
    if (file === undefined) {
      // A factory's scenario directory appeared or went: watch it afresh.
      refollow();
      emit({ kind: "scenarios", factory });
    } else if (name !== undefined) emit({ kind: "scenarios", factory, name });
  };

  const isDir = async (path: string) =>
    (await files.lstat(path))?.isDirectory === true;

  /** Whether `dir` is a directory whose real path is inside the repo. */
  const ownDir = async (dir: string): Promise<boolean> => {
    if (!(await isDir(dir))) return false;
    try {
      return inside(realRepo, await files.realPath(dir));
    } catch {
      return false;
    }
  };

  /**
   * The nearest existing directory at or above `dir` whose real path is
   * inside the repo; the repo itself when a symlink on the way leads out.
   */
  const nearestDir = async (dir: string): Promise<string> => {
    while (!(await isDir(dir)) && dir !== realRepo) {
      const up = dirname(dir);
      if (up === dir || !inside(realRepo, up)) return realRepo;
      dir = up;
    }
    return await ownDir(dir) ? dir : realRepo;
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

  async function refresh(next: FactoryEntry[]): Promise<void> {
    if (closed) return;
    // A factory added, removed or renamed, or pointed at another file.
    const listed = (list: FactoryEntry[]) =>
      JSON.stringify(list.map((f) => [f.name, f.path]));
    if (listed(next) !== listed(factories)) emit({ kind: "factories" });
    factories = next;
    realRepo = await files.realPath(repoDir);
    scenarioRoot = join(realRepo, SCENARIO_DIR);
    const defs = new Map<string, string[]>();
    const waiting = new Map<string, string[]>();
    const dirs = new Set<string>([realRepo]);
    for (const f of next) {
      if (f.path === null) continue;
      let path: string;
      try {
        path = await resolveDefinitionPath(repoDir, f.path, files);
      } catch {
        // Missing or refused: watch where it would be, so its creation
        // shows; never anywhere outside the repo.
        path = join(realRepo, f.path);
        if (!inside(realRepo, path)) continue;
      }
      defs.set(path, [...(defs.get(path) ?? []), f.name]);
      const dir = await nearestDir(dirname(path));
      dirs.add(dir);
      if (dir !== dirname(path)) {
        waiting.set(path, [...(waiting.get(path) ?? []), f.name]);
      }
    }
    // scenarios/ and each listed factory's directory in it, one level each:
    // a recursive watch could follow a symlink out of the repo.
    if (await ownDir(scenarioRoot)) {
      dirs.add(scenarioRoot);
      for (const f of next) {
        const dir = join(scenarioRoot, f.name);
        if (inside(scenarioRoot, dir) && await ownDir(dir)) dirs.add(dir);
      }
    }
    const nextKey = JSON.stringify([
      [...dirs].sort(),
      [...defs.entries()].sort(),
    ]);
    definitions = defs;
    awaited = waiting;
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
  function follow(next: FactoryEntry[]): Promise<void> {
    queue = queue.then(() => refresh(next)).catch(() => {
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
