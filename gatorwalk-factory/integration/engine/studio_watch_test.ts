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

import { assertEquals } from "@std/assert";
import { join } from "@std/path";
import type {
  FactoryEntry,
  StudioEvent,
} from "../../extensions/models/_lib/engine/studio_server.ts";
import { watchStudio } from "../../extensions/models/_lib/engine/studio_watch.ts";

// ---------------------------------------------------------------------------
// The studio's file watch on a real directory, without swamp: an edit is
// seen, and so is one made after the directory is deleted and made again
// (swamp-club #2841), which a watch on the old directory never sees. The unit
// tests cannot write files, so this lives here.
// ---------------------------------------------------------------------------

const ENTRIES: FactoryEntry[] = [{ name: "team", path: "models/team.yaml" }];

async function within<T>(ms: number, what: string, p: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      p,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`timed out: ${what}`)), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 300));

async function withWatch(
  run: (
    t: {
      dir: string;
      file: string;
      follow: () => Promise<void>;
      events: StudioEvent[];
      next: (what: string) => Promise<StudioEvent>;
    },
  ) => Promise<void>,
) {
  const root = await Deno.makeTempDir();
  const dir = join(root, "models");
  const file = join(dir, "team.yaml");
  await Deno.mkdir(dir);
  await Deno.writeTextFile(file, "a: 1\n");
  const watcher = watchStudio(undefined, 20);
  const events: StudioEvent[] = [];
  let waiter: ((e: StudioEvent) => void) | undefined;
  watcher.subscribe((e) => {
    events.push(e);
    waiter?.(e);
    waiter = undefined;
  });
  try {
    await run({
      dir,
      file,
      follow: () => watcher.follow(ENTRIES, new Map([["team", file]])),
      events,
      next: (what) =>
        within(10_000, what, new Promise((resolve) => (waiter = resolve))),
    });
  } finally {
    watcher.close();
    await Deno.remove(root, { recursive: true });
  }
}

Deno.test("studio watch: an unchanged follow sends nothing; an edit sends a definition event", async () => {
  await withWatch(async ({ file, follow, events, next }) => {
    await follow();
    await follow();
    await settle();
    // The first follow lists the factory; nothing else.
    assertEquals(events, [{ kind: "factories" }]);
    events.length = 0;
    const seen = next("the edit");
    await Deno.writeTextFile(file, "a: 2\n");
    assertEquals(await seen, { kind: "definition", factory: "team" });
  });
});

Deno.test("studio watch: a directory deleted and made again is watched again", async () => {
  await withWatch(async ({ dir, file, follow, events, next }) => {
    await follow();
    await settle();
    events.length = 0;
    await Deno.remove(dir, { recursive: true });
    await Deno.mkdir(dir);
    await Deno.writeTextFile(file, "a: 2\n");
    // The relist after the replace: the file may have changed unseen.
    const replaced = next("the event for the replaced directory");
    await follow();
    assertEquals(await replaced, { kind: "definition", factory: "team" });
    await settle();
    events.length = 0;
    const seen = next("an edit in the new directory");
    await Deno.writeTextFile(file, "a: 3\n");
    assertEquals(await seen, { kind: "definition", factory: "team" });
  });
});

Deno.test("studio watch: a file missing at one relist and back at the next is reloaded", async () => {
  await withWatch(async ({ dir, file, follow, events, next }) => {
    await follow();
    await settle();
    await Deno.remove(dir, { recursive: true });
    await follow();
    await settle();
    events.length = 0;
    await Deno.mkdir(dir);
    await Deno.writeTextFile(file, "a: 2\n");
    const back = next("the event for the file that came back");
    await follow();
    assertEquals(await back, { kind: "definition", factory: "team" });
    await settle();
    events.length = 0;
    const seen = next("an edit after it came back");
    await Deno.writeTextFile(file, "a: 3\n");
    assertEquals(await seen, { kind: "definition", factory: "team" });
  });
});
