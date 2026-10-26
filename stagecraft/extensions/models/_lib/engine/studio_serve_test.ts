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

import { assert, assertEquals, assertMatch, assertRejects } from "@std/assert";
import {
  nextPollDelay,
  serveStudio,
  type StudioContext,
} from "./studio_serve.ts";
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

/** A fake serve holding one factory, `team`, recording each command. */
function countingRun(calls: string[], names: () => string[] = () => ["team"]) {
  const run: SwampRunner = (args) => {
    calls.push(args.slice(0, 2).join(" "));
    if (args[1] === "search") {
      return Promise.resolve({
        results: names().map((name) => ({ name, type: FACTORY_TYPE })),
      });
    }
    if (args[1] === "get") {
      return Promise.resolve({ name: args[2], type: FACTORY_TYPE });
    }
    return Promise.resolve({ results: [] });
  };
  return run;
}

/** Resolves once `done` holds, checking every few milliseconds. */
async function until(done: () => boolean, what: string): Promise<void> {
  const deadline = Date.now() + 2000;
  while (!done()) {
    if (Date.now() > deadline) throw new Error(`timed out waiting: ${what}`);
    await new Promise((r) => setTimeout(r, 5));
  }
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Resolves once `calls` stops growing for 200ms (ten 20ms polls). */
async function flat(calls: unknown[]): Promise<void> {
  const deadline = Date.now() + 2000;
  let seen = -1;
  while (seen !== calls.length) {
    if (Date.now() > deadline) throw new Error("the reads never stopped");
    seen = calls.length;
    await pause(200);
  }
}

/** The event stream's text until it holds `want`. */
async function heard(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  want: string,
): Promise<string> {
  const decoder = new TextDecoder();
  let text = "";
  const timeout = setTimeout(() => reader.cancel(), 2000);
  while (!text.includes(want)) {
    const { value, done } = await reader.read();
    if (done) throw new Error(`the event stream ended before ${want}`);
    text += decoder.decode(value);
  }
  clearTimeout(timeout);
  return text;
}

// swamp-club #3658: every poll starts swamp processes, so a studio with no
// page open must read nothing, however long it runs.
Deno.test("studio serve: a remote studio with no page listening reads nothing after startup", async () => {
  const abort = new AbortController();
  const { ctx, listened } = remoteContext(abort.signal);
  const calls: string[] = [];
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run: countingRun(calls),
      pollSeconds: 0.02,
    });
    const url = await listened;
    // A definition the page opened is read again by every poll.
    await (await fetch(url + "api/factories/team")).body?.cancel();
    const before = calls.length;
    // Many poll intervals, with no event stream open.
    await pause(300);
    assertEquals(calls.slice(before), []);
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});

Deno.test("studio serve: a remote studio polls while a page listens and stops when it leaves", async () => {
  const abort = new AbortController();
  const { ctx, listened } = remoteContext(abort.signal);
  const calls: string[] = [];
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run: countingRun(calls),
      pollSeconds: 0.02,
    });
    const url = await listened;
    const before = calls.length;
    const stream = await fetch(url + "api/events");
    const reader = stream.body!.getReader();
    await until(
      () => calls.slice(before).includes("model search"),
      "a poll while the page listens",
    );
    await reader.cancel();
    // The server hears of the closed stream a moment later: wait until no
    // read comes for several poll intervals, rather than a fixed pause a
    // loaded runner can outlast (swamp-club #3921).
    await flat(calls);
    const left = calls.length;
    await pause(300);
    assertEquals(calls.slice(left), []);
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});

Deno.test("studio serve: a factory added on the remote serve reaches the open page", async () => {
  const abort = new AbortController();
  const { ctx, listened } = remoteContext(abort.signal);
  const calls: string[] = [];
  let names = ["team"];
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run: countingRun(calls, () => names),
      pollSeconds: 0.02,
    });
    const url = await listened;
    const stream = await fetch(url + "api/events");
    const reader = stream.body!.getReader();
    names = ["ops", "team"];
    const decoder = new TextDecoder();
    let heard = "";
    while (!heard.includes(`"kind":"factories"`)) {
      const { value, done } = await reader.read();
      if (done) throw new Error("the event stream ended");
      heard += decoder.decode(value);
    }
    await reader.cancel();
    const list = await (await fetch(url + "api/factories")).json();
    assertEquals(
      list.factories.map((f: { name: string }) => f.name),
      ["ops", "team"],
    );
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});

Deno.test("studio serve: the remote poll backs off while nothing changes", () => {
  assertEquals(nextPollDelay(15, false, 15, 60), 30);
  assertEquals(nextPollDelay(30, false, 15, 60), 60);
  assertEquals(nextPollDelay(60, false, 15, 60), 60);
  assertEquals(nextPollDelay(60, true, 15, 60), 15);
});

// swamp-club #3921: the backoff relies on an unchanged poll telling the page
// nothing, so a poll that finds nothing changed must send no event.
Deno.test("studio serve: remote polls that find nothing changed send the page no event", async () => {
  const abort = new AbortController();
  const { ctx, listened } = remoteContext(abort.signal);
  const calls: string[] = [];
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run: countingRun(calls),
      pollSeconds: 0.02,
    });
    const url = await listened;
    // A definition and a board, so every kind of read is polled.
    await (await fetch(url + "api/factories/team")).body?.cancel();
    await (await fetch(url + "api/work-items?factory=team")).body?.cancel();
    const reader = (await fetch(url + "api/events")).body!.getReader();
    const decoder = new TextDecoder();
    let text = "";
    const reading = (async () => {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) return;
        text += decoder.decode(value);
      }
    })();
    const before = calls.length;
    await until(
      () => calls.slice(before).filter((c) => c === "model search").length >= 3,
      "three polls",
    );
    await reader.cancel();
    await reading;
    // The greeting only: no event.
    assert(text.includes(": connected"), text);
    assert(!text.includes("data:"), text);
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});

// swamp-club #3906: once serve rate-limits, the studio starts no swamp
// command until the wait ends, says so once, and tells the page to read
// again when serve answers.
Deno.test("studio serve: a rate-limited remote studio waits it out, logs once, and tells the page when serve answers", async () => {
  const abort = new AbortController();
  const { ctx, listened, logged } = remoteContext(abort.signal);
  const calls: string[] = [];
  const counting = countingRun(calls);
  let limited = false;
  const run: SwampRunner = (args) => {
    if (!limited) return counting(args);
    calls.push(args.slice(0, 2).join(" "));
    return Promise.reject(
      new Error(
        `swamp ${args[0]} ${
          args[1]
        } failed: Rate-limited by server — try again later`,
      ),
    );
  };
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run,
      pollSeconds: 0.02,
      pacing: { rateLimitWaitMs: 400 },
    });
    const url = await listened;
    const stream = await fetch(url + "api/events");
    const reader = stream.body!.getReader();
    limited = true;
    const before = calls.length;
    await until(() => calls.length > before, "a refused read");
    const refusedAt = Date.now();
    // A page's read while it waits is refused without starting swamp.
    const board = await fetch(url + "api/work-items?factory=team");
    assertEquals(board.status, 422);
    assertMatch((await board.json()).error, /is rate-limiting this address/);
    await pause(250);
    assertEquals(calls.length, before + 1, "no command while it waits");
    limited = false;
    await heard(reader, `"kind":"readable"`);
    assert(Date.now() - refusedAt >= 390, "read again only after the wait");
    await reader.cancel();
    const told = logged.filter((m) => m.includes("rate-limiting"));
    assertEquals(told.length, 1, JSON.stringify(logged));
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});

// swamp-club #3921: a first page arriving while a poll runs gets the next
// poll at the base wait, not the backed-off one.
Deno.test("studio serve: a first page arriving during a poll gets the next at the base wait", async () => {
  const abort = new AbortController();
  const { ctx, listened } = remoteContext(abort.signal);
  const searches: number[] = [];
  let hold: Promise<void> | null = null;
  let release = () => {};
  const counting = countingRun([]);
  const run: SwampRunner = async (args) => {
    if (args[1] === "search") {
      searches.push(Date.now());
      if (hold !== null) await hold;
    }
    return counting(args);
  };
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run,
      pollSeconds: 0.2,
    });
    const url = await listened;
    // One page: polls back off from 200ms while nothing changes.
    const first = (await fetch(url + "api/events")).body!.getReader();
    await until(() => searches.length >= 3, "polls backing off");
    // The last page leaves while a poll is held, and a new one arrives.
    hold = new Promise((resolve) => (release = resolve));
    const held = searches.length;
    await until(() => searches.length > held, "a held poll");
    await first.cancel();
    await pause(50);
    const second = (await fetch(url + "api/events")).body!.getReader();
    await pause(50);
    hold = null;
    release();
    const endedAt = Date.now();
    await until(() => searches.length > held + 1, "the next poll");
    // The base wait is 200ms; the backed-off one would be at least 400ms.
    assert(searches.at(-1)! - endedAt < 350, `${searches.at(-1)! - endedAt}ms`);
    await second.cancel();
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});

// A read that fails for good, not a rate limit, is no reason to tell the page
// to read again: it would fail again, and the poll would never back off.
Deno.test("studio serve: a page read that always fails sends no readable event", async () => {
  const abort = new AbortController();
  const { ctx, listened } = remoteContext(abort.signal);
  const calls: string[] = [];
  const counting = countingRun(calls);
  const run: SwampRunner = (args) =>
    args[0] === "data"
      ? Promise.reject(new Error("swamp data query failed: no grant"))
      : counting(args);
  try {
    const served = serveStudio(ctx, 0, PAGE, undefined, {
      server: "wss://swamp.example.com",
      run,
      pollSeconds: 0.02,
    });
    const url = await listened;
    const reader = (await fetch(url + "api/events")).body!.getReader();
    const decoder = new TextDecoder();
    let text = "";
    const reading = (async () => {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) return;
        text += decoder.decode(value);
      }
    })();
    const board = await fetch(url + "api/work-items?factory=team");
    assertEquals(board.status, 422);
    await board.body?.cancel();
    const before = calls.length;
    await until(
      () => calls.slice(before).filter((c) => c === "model search").length >= 3,
      "three polls",
    );
    await reader.cancel();
    await reading;
    assert(!text.includes("readable"), text);
    abort.abort();
    await served;
  } finally {
    abort.abort();
  }
});
