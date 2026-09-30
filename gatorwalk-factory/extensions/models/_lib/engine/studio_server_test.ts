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

import { assert, assertEquals, assertMatch } from "@std/assert";
import { memoryRepo } from "./fake_swamp.ts";
import {
  handleStudioRequest,
  type StudioDeps,
  type StudioEvent,
} from "./studio_server.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// The studio's handler on an in-memory repo: each route, each refusal, and
// the headers every response carries. The real server, file watch and
// Ctrl-C run in integration/engine/studio_test.ts.

const PORT = 4321;
const HOST = `127.0.0.1:${PORT}`;

function setup() {
  const repo = memoryRepo();
  repo.write(".swamp/.keep", "");
  repo.write("factories/team.yaml", "name: team\n");
  const definitions: { definition: unknown; type: unknown }[] = [
    {
      definition: {
        name: "team",
        globalArguments: { definition: "factories/team.yaml" },
      },
      type: { raw: FACTORY_TYPE, normalized: FACTORY_TYPE },
    },
    {
      definition: { name: "unnamed-file", globalArguments: {} },
      type: FACTORY_TYPE,
    },
    {
      definition: { name: "issue-1", globalArguments: {} },
      type: "@swamp/issue-lifecycle",
    },
  ];
  const listeners = new Set<(e: StudioEvent) => void>();
  const followed: string[][] = [];
  const deps: StudioDeps = {
    repoDir: repo.dir,
    port: PORT,
    files: repo.files,
    factories: { findAllGlobal: () => Promise.resolve(definitions) },
    assets: {
      "index.html": {
        type: "text/html; charset=utf-8",
        text: "<!doctype html>",
      },
      "fonts/a.woff2": { type: "font/woff2", base64: btoa("\u0000\u0001") },
    },
    events: {
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
    },
    onFactories: (list) => followed.push(list.map((f) => f.name)),
  };
  const write = (path: string, text: string) => repo.write(path, text);
  const emit = (e: StudioEvent) => listeners.forEach((l) => l(e));
  return { repo, deps, definitions, write, emit, listeners, followed };
}

function get(
  path: string,
  headers: Record<string, string> = {},
  method = "GET",
): Request {
  return new Request(`http://${HOST}${path}`, {
    method,
    headers: { host: HOST, ...headers },
  });
}

async function body(res: Response): Promise<Record<string, unknown>> {
  return await res.json();
}

function assertSecurityHeaders(res: Response) {
  assertMatch(
    res.headers.get("content-security-policy") ?? "",
    /^default-src 'self'/,
  );
  assertEquals(res.headers.get("cross-origin-resource-policy"), "same-origin");
  assertEquals(res.headers.get("x-content-type-options"), "nosniff");
  for (const name of res.headers.keys()) {
    assert(!name.startsWith("access-control-"), `CORS header ${name}`);
  }
}

// --- routes ---------------------------------------------------------------------

Deno.test("studio: / and /assets serve the page, text and binary", async () => {
  const { deps } = setup();
  const page = await handleStudioRequest(get("/"), deps);
  assertEquals(page.status, 200);
  assertEquals(page.headers.get("content-type"), "text/html; charset=utf-8");
  assertEquals(await page.text(), "<!doctype html>");
  assertSecurityHeaders(page);

  const font = await handleStudioRequest(get("/assets/fonts/a.woff2"), deps);
  assertEquals(font.status, 200);
  assertEquals(font.headers.get("content-type"), "font/woff2");
  assertEquals([...new Uint8Array(await font.arrayBuffer())], [0, 1]);

  for (
    const path of [
      "/assets/nope.js",
      "/assets/",
      "/assets/..%2Findex.html",
      "/elsewhere",
    ]
  ) {
    const res = await handleStudioRequest(get(path), deps);
    assertEquals(res.status, 404, path);
    assertSecurityHeaders(res);
    await res.body?.cancel();
  }
});

Deno.test("studio: /api/factories lists factories only, with their paths", async () => {
  const { deps, followed } = setup();
  const res = await handleStudioRequest(get("/api/factories"), deps);
  assertEquals(res.status, 200);
  assertSecurityHeaders(res);
  assertEquals(await body(res), {
    factories: [
      { name: "team", path: "factories/team.yaml" },
      {
        name: "unnamed-file",
        path: null,
        error: "factory 'unnamed-file' does not name its definition file",
      },
    ],
  });
  assertEquals(followed, [["team", "unnamed-file"]]);
});

Deno.test("studio: /api/factories/<f> reads the definition file", async () => {
  const { deps } = setup();
  const res = await handleStudioRequest(get("/api/factories/team"), deps);
  assertEquals(res.status, 200);
  const file = await body(res);
  assertEquals(file.factory, "team");
  assertEquals(file.path, "factories/team.yaml");
  assertEquals(file.text, "name: team\n");
  assertMatch(String(file.digest), /^sha256:[0-9a-f]{64}$/);
});

Deno.test("studio: a factory's file problems are errors, not files", async () => {
  const { deps, repo, definitions } = setup();
  const cases: [string, number, RegExp][] = [
    ["nobody", 404, /no factory named 'nobody'/],
    ["unnamed-file", 422, /does not name its definition file/],
    ["issue-1", 404, /no factory named 'issue-1'/],
  ];
  for (const [name, status, message] of cases) {
    const res = await handleStudioRequest(get(`/api/factories/${name}`), deps);
    assertEquals(res.status, status, name);
    assertMatch(String((await body(res)).error), message);
  }
  // Outside the repo, through a symlink.
  repo.write("/elsewhere/secret.yaml", "secret: true\n");
  repo.symlink("factories/escape.yaml", "/elsewhere/secret.yaml");
  definitions.push({
    definition: {
      name: "escape",
      globalArguments: { definition: "factories/escape.yaml" },
    },
    type: FACTORY_TYPE,
  });
  const res = await handleStudioRequest(get("/api/factories/escape"), deps);
  assertEquals(res.status, 422);
  const refused = await body(res);
  assertMatch(String(refused.error), /resolves outside the repo/);
  assert(!JSON.stringify(refused).includes("secret: true"));
});

Deno.test("studio: scenarios are listed and read from scenarios/<factory>/", async () => {
  const { deps, write } = setup();
  const none = await handleStudioRequest(
    get("/api/factories/team/scenarios"),
    deps,
  );
  assertEquals(await body(none), {
    factory: "team",
    dir: "scenarios/team",
    scenarios: [],
  });

  write("scenarios/team/happy.yaml", "scenario: happy\n");
  write("scenarios/team/churn.yml", "scenario: churn\n");
  write("scenarios/team/notes.md", "not a scenario\n");
  write("scenarios/team/Bad.yaml", "not a scenario name\n");
  const list = await handleStudioRequest(
    get("/api/factories/team/scenarios"),
    deps,
  );
  assertEquals((await body(list)).scenarios, [
    { name: "churn", path: "scenarios/team/churn.yml" },
    { name: "happy", path: "scenarios/team/happy.yaml" },
  ]);

  const one = await handleStudioRequest(
    get("/api/factories/team/scenarios/churn"),
    deps,
  );
  assertEquals(one.status, 200);
  const file = await body(one);
  assertEquals(file.path, "scenarios/team/churn.yml");
  assertEquals(file.text, "scenario: churn\n");

  const missing = await handleStudioRequest(
    get("/api/factories/team/scenarios/nope"),
    deps,
  );
  assertEquals(missing.status, 404);
  await missing.body?.cancel();
});

// --- refusals -----------------------------------------------------------------

Deno.test("studio: a bad scenario name is refused before any path is built", async () => {
  const { deps, write } = setup();
  write("scenarios/team/happy.yaml", "scenario: happy\n");
  for (
    const name of ["..%2F..%2Ffactories%2Fteam", "a.b", "Happy", "%20", "-x"]
  ) {
    const res = await handleStudioRequest(
      get(`/api/factories/team/scenarios/${name}`),
      deps,
    );
    assertEquals(res.status, 400, name);
    assertMatch(String((await body(res)).error), /is not a scenario name/);
  }
  // A deeper path is not a route at all.
  const deep = await handleStudioRequest(
    get("/api/factories/team/scenarios/happy/x"),
    deps,
  );
  assertEquals(deep.status, 404);
  await deep.body?.cancel();
});

Deno.test("studio: a scenario whose real path leaves its directory is refused", async () => {
  const { deps, repo, write } = setup();
  write("scenarios/team/happy.yaml", "scenario: happy\n");
  repo.write("factories/other.yaml", "private: true\n");
  repo.symlink("scenarios/team/sneaky.yaml", "../../factories/other.yaml");
  const res = await handleStudioRequest(
    get("/api/factories/team/scenarios/sneaky"),
    deps,
  );
  assertEquals(res.status, 403);
  const refused = await body(res);
  assertMatch(String(refused.error), /resolves outside scenarios\/team/);
  assert(!JSON.stringify(refused).includes("private"));
});

Deno.test("studio: a scenario directory that escapes the repo is refused", async () => {
  const { deps, repo } = setup();
  repo.write("/elsewhere/team/x.yaml", "x: 1\n");
  repo.symlink("scenarios/team", "/elsewhere/team");
  const res = await handleStudioRequest(
    get("/api/factories/team/scenarios"),
    deps,
  );
  assertEquals(res.status, 422);
  assertMatch(
    String((await body(res)).error),
    /scenarios\/team resolves outside the repo/,
  );
});

Deno.test("studio: a Host other than this server is refused (DNS rebinding)", async () => {
  const { deps } = setup();
  for (
    const host of [
      `evil.example:${PORT}`,
      "127.0.0.1:9999",
      "127.0.0.1",
      `localhost:${PORT}0`,
    ]
  ) {
    const res = await handleStudioRequest(
      new Request(`http://${HOST}/api/factories`, { headers: { host } }),
      deps,
    );
    assertEquals(res.status, 403, host);
    assertSecurityHeaders(res);
    await res.body?.cancel();
  }
  const local = await handleStudioRequest(
    new Request(`http://localhost:${PORT}/`, {
      headers: { host: `localhost:${PORT}` },
    }),
    deps,
  );
  assertEquals(local.status, 200);
  await local.body?.cancel();
});

Deno.test("studio: an Origin other than the server's own is refused", async () => {
  const { deps } = setup();
  for (
    const origin of [
      "http://evil.example",
      `http://127.0.0.1:${PORT + 1}`,
      `http://localhost:${PORT}`,
      "null",
      `https://${HOST}`,
    ]
  ) {
    const res = await handleStudioRequest(
      get("/api/factories", { origin }),
      deps,
    );
    assertEquals(res.status, 403, origin);
    await res.body?.cancel();
  }
  const own = await handleStudioRequest(
    get("/api/factories", { origin: `http://${HOST}` }),
    deps,
  );
  assertEquals(own.status, 200);
  await own.body?.cancel();
});

Deno.test("studio: a cross-site fetch is refused even without an Origin", async () => {
  const { deps } = setup();
  for (const site of ["cross-site", "same-site"]) {
    const res = await handleStudioRequest(
      get("/api/factories/team", { "sec-fetch-site": site }),
      deps,
    );
    assertEquals(res.status, 403, site);
    await res.body?.cancel();
  }
  for (const site of ["same-origin", "none"]) {
    const res = await handleStudioRequest(
      get("/", { "sec-fetch-site": site }),
      deps,
    );
    assertEquals(res.status, 200, site);
    await res.body?.cancel();
  }
});

Deno.test("studio: anything but GET gets 405, on every route", async () => {
  const { deps } = setup();
  for (const method of ["POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]) {
    for (const path of ["/", "/api/factories/team", "/api/events"]) {
      const res = await handleStudioRequest(get(path, {}, method), deps);
      assertEquals(res.status, 405, `${method} ${path}`);
      assertEquals(res.headers.get("allow"), "GET");
      assertSecurityHeaders(res);
      await res.body?.cancel();
    }
  }
});

// --- events ---------------------------------------------------------------------

Deno.test("studio: /api/events streams each change as a data line", async () => {
  const { deps, emit, listeners } = setup();
  const res = await handleStudioRequest(get("/api/events"), deps);
  assertEquals(res.status, 200);
  assertEquals(
    res.headers.get("content-type"),
    "text/event-stream; charset=utf-8",
  );
  assertSecurityHeaders(res);
  const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader();
  try {
    assertEquals((await reader.read()).value, ": connected\n\n");
    emit({ kind: "definition", factory: "team" });
    assertEquals(
      (await reader.read()).value,
      'data: {"kind":"definition","factory":"team"}\n\n',
    );
  } finally {
    await reader.cancel();
  }
  // Cancelling unsubscribes.
  assertEquals(listeners.size, 0);
});

Deno.test("studio: event streams close when the server shuts down", async () => {
  const { deps, listeners } = setup();
  const stop = new AbortController();
  const res = await handleStudioRequest(get("/api/events"), {
    ...deps,
    signal: stop.signal,
  });
  const reader = res.body!.getReader();
  try {
    await reader.read();
    stop.abort();
    assertEquals((await reader.read()).done, true);
    assertEquals(listeners.size, 0);
  } finally {
    await reader.cancel();
  }
});

Deno.test("studio: on port 80 the Host may leave the port out", async () => {
  const { deps } = setup();
  const at80 = { ...deps, port: 80 };
  const ok = await handleStudioRequest(
    new Request("http://127.0.0.1/", {
      headers: { host: "127.0.0.1", origin: "http://127.0.0.1" },
    }),
    at80,
  );
  assertEquals(ok.status, 200);
  await ok.body?.cancel();
  const explicit = await handleStudioRequest(
    new Request("http://127.0.0.1/", { headers: { host: "127.0.0.1:80" } }),
    at80,
  );
  assertEquals(explicit.status, 200);
  await explicit.body?.cancel();
  const other = await handleStudioRequest(
    new Request("http://127.0.0.1/", { headers: { host: "127.0.0.1:8080" } }),
    at80,
  );
  assertEquals(other.status, 403);
  await other.body?.cancel();
});

Deno.test("studio: an event stream opened as the server stops closes at once", async () => {
  const { deps, listeners } = setup();
  const stop = new AbortController();
  stop.abort();
  const res = await handleStudioRequest(get("/api/events"), {
    ...deps,
    signal: stop.signal,
  });
  const reader = res.body!.getReader();
  try {
    await reader.read();
    assertEquals((await reader.read()).done, true);
    assertEquals(listeners.size, 0);
  } finally {
    await reader.cancel();
  }
});

Deno.test("studio: opening the page from a link in another site is allowed, and nothing else is", async () => {
  const { deps } = setup();
  const nav = { "sec-fetch-site": "cross-site", "sec-fetch-mode": "navigate" };
  const page = await handleStudioRequest(
    get("/", { ...nav, "sec-fetch-dest": "document" }),
    deps,
  );
  assertEquals(page.status, 200);
  await page.body?.cancel();
  const refused: [string, Record<string, string>][] = [
    ["/api/factories", { ...nav, "sec-fetch-dest": "document" }],
    ["/assets/fonts/a.woff2", { ...nav, "sec-fetch-dest": "document" }],
    ["/", { ...nav, "sec-fetch-dest": "iframe" }],
    ["/", {
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-dest": "script",
    }],
    ["/", { "sec-fetch-site": "cross-site", "sec-fetch-dest": "document" }],
  ];
  for (const [path, headers] of refused) {
    const res = await handleStudioRequest(get(path, headers), deps);
    assertEquals(res.status, 403, `${path} ${JSON.stringify(headers)}`);
    await res.body?.cancel();
  }
});
