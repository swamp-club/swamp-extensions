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

import { assert, assertEquals, assertRejects } from "@std/assert";
import { serveStudio, type StudioContext } from "./studio_serve.ts";
import type { SwampRunner } from "./studio_remote.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// serveStudio on a method context with no data query: it starts, serves the
// page, answers the work-item routes with 422, and stops on the signal. The
// rest of serve runs through the installed swamp CLI in
// integration/engine/studio_test.ts.

Deno.test("studio serve: starts without a data query, and the work-item routes answer 422", async () => {
  // Serve only reads the repo, and lists no factories here: this directory
  // will do, as the unit tests may not write.
  const repoDir = new URL(".", import.meta.url).pathname;
  const abort = new AbortController();
  const logged: string[] = [];
  let listening: (url: string) => void = () => {};
  const listened = new Promise<string>((resolve) => (listening = resolve));
  try {
    const served = serveStudio(
      {
        repoDir,
        definitionRepository: {
          findAllGlobal: () => Promise.resolve([]),
          getPath: () => "",
        },
        logger: {
          info(message) {
            logged.push(message);
            const url = message.match(/^studio: (http:\S+)$/);
            if (url !== null) listening(url[1]);
          },
        },
        signal: abort.signal,
      },
      0,
      { "index.html": { type: "text/html", text: "<p>studio</p>" } },
    );
    // A serve that fails, or ends, before it listens fails the test rather
    // than leaving it waiting.
    const url = await Promise.race([
      listened,
      served.then(() => {
        throw new Error("serve ended before it listened");
      }),
    ]);
    const page = await fetch(url);
    assertEquals(page.status, 200);
    assertEquals(await page.text(), "<p>studio</p>");
    for (const path of ["api/work-items?factory=team", "api/work-items/k-1"]) {
      const res = await fetch(url + path);
      assertEquals(res.status, 422, path);
      assert((await res.text()).includes("cannot read work items"), path);
    }
    assert(logged.some((m) => m.includes("work items are not shown")));
    abort.abort();
    assertEquals(await served, { dataHandles: [] });
  } finally {
    abort.abort();
  }
});

const PAGE = { "index.html": { type: "text/html", text: "<p>studio</p>" } };

/** A method context with a logger that resolves with serve's URL. */
function remoteContext(signal: AbortSignal) {
  const logged: string[] = [];
  let listening: (url: string) => void = () => {};
  const listened = new Promise<string>((resolve) => (listening = resolve));
  // No repo directory or definition repository: a remote studio needs none.
  const ctx: StudioContext = {
    logger: {
      info(message) {
        logged.push(message);
        const url = message.match(/^studio: (http:\S+)$/);
        if (url !== null) listening(url[1]);
      },
    },
    signal,
  };
  return { ctx, logged, listened };
}

Deno.test("studio serve: server with publicOrigin, or a bad server, is refused before anything runs", async () => {
  const abort = new AbortController();
  const { ctx } = remoteContext(abort.signal);
  let ran = false;
  const run: SwampRunner = () => {
    ran = true;
    return Promise.resolve({ results: [] });
  };
  await assertRejects(
    () =>
      serveStudio(ctx, 0, PAGE, "https://studio.example.com", {
        server: "wss://swamp.example.com",
        run,
      }),
    Error,
    "cannot be combined with publicOrigin",
  );
  await assertRejects(
    () =>
      serveStudio(ctx, 0, PAGE, undefined, {
        server: "swamp.example.com",
        run,
      }),
    Error,
    "server must be a swamp serve URL",
  );
  assert(!ran);
});

Deno.test("studio serve: a remote serve that cannot be read stops serve before it binds", async () => {
  const abort = new AbortController();
  const { ctx, logged } = remoteContext(abort.signal);
  await assertRejects(
    () =>
      serveStudio(ctx, 0, PAGE, undefined, {
        server: "wss://swamp.example.com",
        run: () =>
          Promise.reject(new Error("swamp model search failed: not signed in")),
      }),
    Error,
    "cannot read wss://swamp.example.com: swamp model search failed: not signed in",
  );
  assertEquals(logged, []);
});

Deno.test("studio serve: reading a remote serve, the routes answer from swamp's read commands", async () => {
  const abort = new AbortController();
  const { ctx, logged, listened } = remoteContext(abort.signal);
  const calls: string[] = [];
  const run: SwampRunner = (args) => {
    calls.push(args.slice(0, 2).join(" "));
    if (args[1] === "search") {
      return Promise.resolve({
        results: [{ name: "team", type: FACTORY_TYPE }],
      });
    }
    if (args[1] === "get") {
      return Promise.resolve({
        name: "team",
        type: FACTORY_TYPE,
        globalArguments: { definition: { schemaVersion: 3 } },
      });
    }
    return Promise.resolve({ results: [] });
  };
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run,
    });
    const url = await Promise.race([
      listened,
      served.then(() => {
        throw new Error("serve ended before it listened");
      }),
    ]);
    const list = await (await fetch(url + "api/factories")).json();
    assertEquals(list.factories, [
      { name: "team", path: "team on wss://swamp.example.com" },
    ]);
    const team = await (await fetch(url + "api/factories/team")).json();
    assert(String(team.text).includes("schemaVersion: 3"));
    const board = await fetch(url + "api/work-items?factory=team");
    assertEquals(board.status, 200);
    assertEquals((await board.json()).items, []);
    assert(calls.includes("data query"), calls.join(", "));
    // The list was read once, at startup; the page's reads used it.
    assertEquals(calls.filter((c) => c === "model search").length, 1);
    assert(logged.some((m) => m.includes("reading wss://swamp.example.com")));
    abort.abort();
    assertEquals(await served, { dataHandles: [] });
  } finally {
    abort.abort();
  }
});
