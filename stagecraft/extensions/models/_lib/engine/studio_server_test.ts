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
import { digestOf, jsonSafe } from "./canonical.ts";
import { start } from "./run_ops.ts";
import { type QueryData, watchWorkItems } from "./studio_work_items.ts";
import {
  ALICE,
  settableEnv,
  smallDefinition,
  TEST_TRACKER,
} from "./test_support.ts";
import {
  LOOPED_REVIEW,
  recordStore,
  scenarioItem,
} from "./studio_work_items_testing.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// The studio's handler on an in-memory repo: each route, each refusal, and
// the headers every response carries. The real server, file watch and
// Ctrl-C run in integration/engine/studio_test.ts.

const PORT = 4321;
const HOST = `127.0.0.1:${PORT}`;

const TEAM_FILE = "models/@swamp/stagecraft/factory/team.yaml";
const TEAM_TEXT = "type: '@swamp/stagecraft/factory'\nname: team\n" +
  "globalArguments:\n  tracker: board\n  definition:\n    schemaVersion: 1\n";

function setup() {
  const repo = memoryRepo();
  repo.write(".swamp/.keep", "");
  repo.write(TEAM_FILE, TEAM_TEXT);
  const definitions: { definition: unknown; type: unknown }[] = [
    {
      definition: { id: "id-team", name: "team", globalArguments: {} },
      type: { raw: FACTORY_TYPE, normalized: FACTORY_TYPE },
    },
    {
      definition: { id: "id-pathless", name: "pathless", globalArguments: {} },
      type: FACTORY_TYPE,
    },
    {
      definition: { id: "id-issue", name: "issue-1", globalArguments: {} },
      type: "@swamp/issue-lifecycle",
    },
  ];
  // Like swamp's repository: getPath answers from what the last listing
  // cached, so calling it on a definition not just listed fails here.
  const paths: Record<string, string> = {
    "id-team": `${repo.dir}/${TEAM_FILE}`,
    "id-issue": `${repo.dir}/models/@swamp/issue-lifecycle/issue-1.yaml`,
  };
  let cached = new Set<string>();
  const listeners = new Set<(e: StudioEvent) => void>();
  const followed: [string[], Record<string, string>][] = [];
  const deps: StudioDeps = {
    repoDir: repo.dir,
    port: PORT,
    files: repo.files,
    factories: {
      findAllGlobal: () => {
        cached = new Set(
          definitions.map((d) => String((d.definition as { id: unknown }).id)),
        );
        return Promise.resolve(definitions);
      },
      getPath: (_type, id) => {
        const path = paths[String(id)];
        if (!cached.has(String(id)) || path === undefined) {
          throw new Error(`no path cached for ${id}`);
        }
        return path;
      },
    },
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
    onFactories: (list, files) =>
      followed.push([list.map((f) => f.name), Object.fromEntries(files)]),
  };
  const emit = (e: StudioEvent) => listeners.forEach((l) => l(e));
  return { repo, deps, definitions, paths, emit, listeners, followed };
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

Deno.test("studio: the page is served on each view's path, and nowhere else", async () => {
  const { deps } = setup();
  for (
    const path of [
      "/f/team/design",
      "/f/team/simulate",
      "/f/team/board",
      "/w/team-add-board-k3xq",
    ]
  ) {
    const res = await handleStudioRequest(get(path), deps);
    assertEquals(res.status, 200, path);
    assertEquals(await res.text(), "<!doctype html>", path);
  }
  for (
    const path of [
      "/f",
      "/f/team",
      "/f/team/nope",
      "/f/team/board/more",
      "/w",
      "/w/a/b",
    ]
  ) {
    const res = await handleStudioRequest(get(path), deps);
    assertEquals(res.status, 404, path);
    await res.body?.cancel();
  }
});

/** A query over one titled work item of team, as swamp's would answer. */
async function workItemQuery(): Promise<QueryData & { asked: string[] }> {
  const definition = smallDefinition();
  const digest = await digestOf(definition);
  const run = start(
    definition,
    {
      key: "team-a",
      title: "Add a board",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: digest,
      definitionVersion: 1,
    },
    ALICE,
    settableEnv("2026-10-02T10:00:00.000Z"),
  );
  const asked: string[] = [];
  const query = (predicate: string, select?: string) => {
    asked.push(predicate);
    if (select !== undefined) return Promise.resolve([["team-a", 1]]);
    if (predicate.includes('name == "run"')) {
      return Promise.resolve([{
        modelName: "team-a",
        attributes: JSON.parse(JSON.stringify(run)),
      }]);
    }
    return Promise.resolve([{
      modelName: "team-a",
      attributes: { factory: "team", digest, definition: jsonSafe(definition) },
    }]);
  };
  return Object.assign(query, { asked });
}

Deno.test("studio: /api/work-items gives the board a card per work item of the factory, and keeps its poll alive", async () => {
  const { deps } = setup();
  const query = await workItemQuery();
  const told: StudioEvent[] = [];
  deps.query = query;
  deps.workItems = watchWorkItems(query, (e) => told.push(e));
  deps.env = settableEnv("2026-10-02T11:00:00.000Z");
  const res = await handleStudioRequest(
    get("/api/work-items?factory=team"),
    deps,
  );
  assertEquals(res.status, 200);
  assertSecurityHeaders(res);
  const answer = await body(res);
  assertEquals(answer.factory, "team");
  assertEquals(answer.problems, []);
  const [card] = answer.items as Record<string, unknown>[];
  assertEquals(card.key, "team-a");
  assertEquals(card.title, "Add a board");
  assertEquals(card.stage, "write");
  assertEquals(deps.workItems.size(), 1);
  assert(
    query.asked.every((p) => p.includes('"team-a"') || p.includes('"team"')),
    query.asked.join("\n"),
  );
});

Deno.test("studio: a poll that cannot start leaves the board readable", async () => {
  const { deps } = setup();
  const query = await workItemQuery();
  deps.query = query;
  deps.workItems = watchWorkItems(
    (predicate, select) =>
      select === undefined
        ? query(predicate)
        : Promise.reject(new Error("no projections here")),
    () => {},
  );
  const res = await handleStudioRequest(
    get("/api/work-items?factory=team"),
    deps,
  );
  assertEquals(res.status, 200);
  assertEquals((await body(res)).factory, "team");
});

Deno.test("studio: /api/work-items needs a factory the repo lists, and a query to read with", async () => {
  const { deps } = setup();
  const answers: [string, number][] = [
    ["/api/work-items", 400],
    ["/api/work-items?factory=", 400],
    ["/api/work-items?factory=team", 422],
  ];
  for (const [path, status] of answers) {
    const res = await handleStudioRequest(get(path), deps);
    assertEquals(res.status, status, path);
    await res.body?.cancel();
  }
  deps.query = await workItemQuery();
  for (
    const [path, status] of [
      ["/api/work-items?factory=nobody", 404],
      ["/api/work-items?factory=issue-1", 404],
    ] as [string, number][]
  ) {
    const res = await handleStudioRequest(get(path), deps);
    assertEquals(res.status, status, path);
    await res.body?.cancel();
  }
});

const ITEM = "team-looped-review-abcd";
const BUILD = "build-swamp-extension.yaml";

Deno.test("studio: /api/work-items/<key> gives one work item as the view draws it, and keeps its poll alive", async () => {
  const { deps } = setup();
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, ITEM);
  const told: StudioEvent[] = [];
  deps.query = item.query;
  deps.workItems = watchWorkItems(item.query, (e) => told.push(e));
  deps.env = settableEnv("2026-10-02T12:00:00.000Z");
  const res = await handleStudioRequest(get(`/api/work-items/${ITEM}`), deps);
  assertEquals(res.status, 200);
  assertSecurityHeaders(res);
  const found = await body(res);
  assertEquals(found.run, item.run);
  assertEquals(found.at, "2026-10-02T12:00:00.000Z");
  assertEquals((found.pinned as { version: number }).version, 1);
  assertEquals((found.status as { stage: string }).stage, "plan-review");
  assert(Array.isArray(found.readiness));
  // Product payloads only on request, for Copy as scenario.
  assertEquals(found.payloads, null);
  const full = await handleStudioRequest(
    get(`/api/work-items/${ITEM}?payloads=1`),
    deps,
  );
  assertEquals(((await body(full)).payloads as unknown[]).length, 4);
  assertEquals(deps.workItems.size(), 1);
});

Deno.test("studio: a work-item poll that cannot start still answers with the work item", async () => {
  const { deps } = setup();
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, ITEM);
  deps.query = item.query;
  deps.workItems = {
    ...watchWorkItems(item.query, () => {}),
    ask: () => Promise.reject(new Error("the poll cannot start")),
  };
  const res = await handleStudioRequest(get(`/api/work-items/${ITEM}`), deps);
  assertEquals(res.status, 200);
  assertEquals((await body(res)).run, item.run);
});

Deno.test("studio: an unknown or unsafe work-item key is 404, and an unsafe one is never queried", async () => {
  const { deps } = setup();
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, ITEM);
  deps.query = item.query;
  deps.workItems = watchWorkItems(item.query, () => {});
  const missing = await handleStudioRequest(get("/api/work-items/nope"), deps);
  assertEquals(missing.status, 404);
  assertEquals((await body(missing)).error, "no work item 'nope'");
  // A key no work item has is never watched.
  assertEquals(deps.workItems.size(), 0);
  item.asked.length = 0;
  for (const bad of ["a..b", encodeURIComponent('x" || true || "')]) {
    const res = await handleStudioRequest(get(`/api/work-items/${bad}`), deps);
    assertEquals(res.status, 404, bad);
    await res.body?.cancel();
  }
  assertEquals(item.asked, []);
  const deeper = await handleStudioRequest(
    get(`/api/work-items/${ITEM}/more`),
    deps,
  );
  assertEquals(deeper.status, 404);
  await deeper.body?.cancel();
});

Deno.test("studio: a work item whose pinned definition fails its digest is 422; without a query the route says so", async () => {
  const { deps } = setup();
  const none = await handleStudioRequest(get(`/api/work-items/${ITEM}`), deps);
  assertEquals(none.status, 422);
  assertEquals((await body(none)).error, "this studio cannot read work items");
  const store = recordStore();
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, ITEM, store);
  store.put(ITEM, "run", {
    ...item.run,
    definition: { digest: "sha256:0", version: 1 },
  });
  deps.query = item.query;
  const res = await handleStudioRequest(get(`/api/work-items/${ITEM}`), deps);
  assertEquals(res.status, 422);
  assertMatch(String((await body(res)).error), /digest|pinned/);
});

Deno.test("studio: /api/work-items/<key>/ticket gives the ticket as the tracker recorded it, with no poll", async () => {
  const { deps } = setup();
  const store = recordStore();
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, ITEM, store);
  const { instance, kind } = item.run.tracker;
  deps.query = item.query;
  deps.workItems = watchWorkItems(item.query, () => {});
  const ticketOf = async () => {
    const res = await handleStudioRequest(
      get(`/api/work-items/${ITEM}/ticket`),
      deps,
    );
    assertEquals(res.status, 200);
    assertSecurityHeaders(res);
    return await body(res);
  };
  // The scenario's run names no ticket.
  assertEquals(await ticketOf(), { state: "none" });
  store.put(ITEM, "run", { ...item.run, externalRefs: { [kind]: "T-1" } });
  assertEquals((await ticketOf()).state, "missing");
  store.put(
    instance,
    "issue-T-1",
    {
      origin: "snapshot",
      tracker: instance,
      id: "T-1",
      display: "ENG-1",
      title: "Add the thing",
      status: { id: "s1", name: "Todo" },
      description: "Body",
      activity: [],
      fetchedAt: "2026-10-01T00:00:00.000Z",
    },
    "@swamp/stagecraft/tracker",
    "issue",
  );
  const found = await ticketOf();
  assertEquals(found.state, "ok");
  assertEquals((found.ticket as { description: string }).description, "Body");
  // The Ticket tab reads when it opens; it starts no poll.
  assertEquals(deps.workItems.size(), 0);
});

Deno.test("studio: the ticket route is 404 for an unknown or unsafe key, and 422 for a record that does not parse", async () => {
  const { deps } = setup();
  const none = await handleStudioRequest(
    get(`/api/work-items/${ITEM}/ticket`),
    deps,
  );
  assertEquals(none.status, 422);
  await none.body?.cancel();
  const store = recordStore();
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, ITEM, store);
  const { instance, kind } = item.run.tracker;
  deps.query = item.query;
  item.asked.length = 0;
  for (const bad of ["nope", "a..b", encodeURIComponent('x" || "')]) {
    const res = await handleStudioRequest(
      get(`/api/work-items/${bad}/ticket`),
      deps,
    );
    assertEquals(res.status, 404, bad);
    await res.body?.cancel();
  }
  assertEquals(item.asked, [
    'modelName == "nope" && name == "run"',
  ]);
  store.put(ITEM, "run", { ...item.run, externalRefs: { [kind]: "T-1" } });
  store.put(instance, "issue-T-1", { origin: "snapshot", id: "T-1" });
  const res = await handleStudioRequest(
    get(`/api/work-items/${ITEM}/ticket`),
    deps,
  );
  assertEquals(res.status, 422);
  assertMatch(String((await body(res)).error), /does not parse/);
});

Deno.test("studio: /api/factories lists factories only, with their model definition files", async () => {
  const { deps, followed, repo } = setup();
  const res = await handleStudioRequest(get("/api/factories"), deps);
  assertEquals(res.status, 200);
  assertSecurityHeaders(res);
  assertEquals(await body(res), {
    factories: [
      {
        name: "pathless",
        path: null,
        error: "factory 'pathless': swamp gives no file for its model " +
          "definition: no path cached for id-pathless",
      },
      { name: "team", path: TEAM_FILE },
    ],
  });
  assertEquals(followed, [[["pathless", "team"], {
    team: `${repo.dir}/${TEAM_FILE}`,
  }]]);
});

Deno.test("studio: a model definition kept outside the repo is shown by its absolute path", async () => {
  const { deps, repo, definitions, paths } = setup();
  repo.write("/managed/models/x.yaml", "name: managed\n");
  definitions.push({
    definition: { id: "id-managed", name: "managed", globalArguments: {} },
    type: FACTORY_TYPE,
  });
  paths["id-managed"] = "/managed/models/x.yaml";
  const list = await body(
    await handleStudioRequest(get("/api/factories"), deps),
  );
  assert(
    JSON.stringify(list.factories).includes(
      '{"name":"managed","path":"/managed/models/x.yaml"}',
    ),
  );
  const file = await body(
    await handleStudioRequest(get("/api/factories/managed"), deps),
  );
  assertEquals(file.text, "name: managed\n");
});

/** Drop a factory from the listing, as swamp skips a file it cannot parse. */
function skip(
  definitions: { definition: unknown; type: unknown }[],
  name: string,
) {
  const at = definitions.findIndex((d) =>
    (d.definition as { name: unknown }).name === name
  );
  definitions.splice(at, 1);
}

const names = (list: Record<string, unknown>) =>
  (list.factories as { name: string }[]).map((f) => f.name);

Deno.test("studio: a factory whose file swamp skips stays listed while the file is there", async () => {
  const { deps, definitions, followed, repo } = setup();
  deps.remembered = new Map();
  await handleStudioRequest(get("/api/factories"), deps);
  // The agent leaves the file mid-edit: not valid YAML, so swamp skips it.
  skip(definitions, "team");
  repo.write(TEAM_FILE, "name: team\n  definition: [\n");
  const list = await body(
    await handleStudioRequest(get("/api/factories"), deps),
  );
  assertEquals(names(list), ["pathless", "team"]);
  assert(
    JSON.stringify(list.factories).includes(
      `{"name":"team","path":"${TEAM_FILE}"}`,
    ),
  );
  // The watch still follows it, so the fix reloads the page.
  assertEquals(followed.at(-1)?.[1], { team: `${repo.dir}/${TEAM_FILE}` });
  // The page reads the text and shows why it does not parse.
  const file = await body(
    await handleStudioRequest(get("/api/factories/team"), deps),
  );
  assertEquals(file.text, "name: team\n  definition: [\n");

  // Removed for real: the file is gone, and so is the factory.
  repo.remove(TEAM_FILE);
  assertEquals(
    names(await body(await handleStudioRequest(get("/api/factories"), deps))),
    ["pathless"],
  );
  // Forgotten: the file coming back unparsed does not list it again.
  repo.write(TEAM_FILE, "name: team\n  definition: [\n");
  assertEquals(
    names(await body(await handleStudioRequest(get("/api/factories"), deps))),
    ["pathless"],
  );
});

Deno.test("studio: a remembered factory gives way to the one now listed at its file", async () => {
  const { deps, definitions, paths, repo } = setup();
  deps.remembered = new Map();
  await handleStudioRequest(get("/api/factories"), deps);
  skip(definitions, "team");
  definitions.push({
    definition: { id: "id-crew", name: "crew", globalArguments: {} },
    type: FACTORY_TYPE,
  });
  paths["id-crew"] = `${repo.dir}/${TEAM_FILE}`;
  assertEquals(
    names(await body(await handleStudioRequest(get("/api/factories"), deps))),
    ["crew", "pathless"],
  );
});

Deno.test("studio: without a memory, a skipped factory is not listed", async () => {
  const { deps, definitions } = setup();
  await handleStudioRequest(get("/api/factories"), deps);
  skip(definitions, "team");
  assertEquals(
    names(await body(await handleStudioRequest(get("/api/factories"), deps))),
    ["pathless"],
  );
});

Deno.test("studio: /api/factories/<f> reads the factory's model definition file", async () => {
  const { deps } = setup();
  const res = await handleStudioRequest(get("/api/factories/team"), deps);
  assertEquals(res.status, 200);
  const file = await body(res);
  assertEquals(file.factory, "team");
  assertEquals(file.path, TEAM_FILE);
  assertEquals(file.text, TEAM_TEXT);
  assertMatch(String(file.digest), /^sha256:[0-9a-f]{64}$/);
});

Deno.test("studio: a factory's file problems are errors, not files", async () => {
  const { deps, repo } = setup();
  const cases: [string, number, RegExp][] = [
    ["nobody", 404, /no factory named 'nobody'/],
    ["pathless", 422, /swamp gives no file for its model definition/],
    ["issue-1", 404, /no factory named 'issue-1'/],
  ];
  for (const [name, status, message] of cases) {
    const res = await handleStudioRequest(get(`/api/factories/${name}`), deps);
    assertEquals(res.status, status, name);
    assertMatch(String((await body(res)).error), message);
  }
  repo.remove(TEAM_FILE);
  const res = await handleStudioRequest(get("/api/factories/team"), deps);
  assertEquals(res.status, 422);
  assertMatch(String((await body(res)).error), /team\.yaml is missing/);
});

Deno.test("studio: there are no scenario routes; scenarios are in the model definition file", async () => {
  const { deps } = setup();
  for (
    const path of ["/api/factories/team/scenarios", "/api/factories/team/x"]
  ) {
    const res = await handleStudioRequest(get(path), deps);
    assertEquals(res.status, 404, path);
    await res.body?.cancel();
  }
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
    for (
      const path of [
        "/",
        "/api/factories/team",
        "/api/events",
        "/api/work-items?factory=team",
        "/f/team/board",
      ]
    ) {
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
  for (const path of ["/", "/f/team/board", "/w/team-a"]) {
    const page = await handleStudioRequest(
      get(path, { ...nav, "sec-fetch-dest": "document" }),
      deps,
    );
    assertEquals(page.status, 200, path);
    await page.body?.cancel();
  }
  const refused: [string, Record<string, string>][] = [
    ["/api/factories", { ...nav, "sec-fetch-dest": "document" }],
    ["/api/work-items?factory=team", { ...nav, "sec-fetch-dest": "document" }],
    ["/f/team/nope", { ...nav, "sec-fetch-dest": "document" }],
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
