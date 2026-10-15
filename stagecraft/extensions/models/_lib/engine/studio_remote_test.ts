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

import {
  assert,
  assertEquals,
  assertFalse,
  assertMatch,
  assertRejects,
  assertThrows,
} from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import {
  failure,
  remoteDefinition,
  remoteFactories,
  remoteFactoryNames,
  remoteQuery,
  swampBinary,
  type SwampRunner,
} from "./studio_remote.ts";
import type { StudioEvent } from "./studio_server.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// The remote reads over an in-memory runner standing in for swamp with
// --server: the commands asked for, the answers parsed, failures kept. The
// real swamp serve runs in integration/engine/studio_remote_test.ts.

const SERVER = "wss://swamp.example.com";

/** What `swamp model get <name> --json` gives for a factory. */
function modelGet(name: string, description = "the team's factory") {
  return {
    id: `id-${name}`,
    name,
    type: FACTORY_TYPE,
    version: 1,
    tags: {},
    globalArguments: {
      tracker: "board",
      definition: { schemaVersion: 3, description },
      scenarios: [{ name: "happy" }],
    },
    typeVersion: "2026.10.12.1",
    currentTypeVersion: "2026.10.12.1",
    staleness: "current",
    globalArgumentsSchema: { type: "object" },
    methods: [{ name: "validate", arguments: {} }],
  };
}

/** A runner answering from a table by command, recording each call. */
function fakeSwamp(answers: Record<string, () => unknown>) {
  const calls: string[][] = [];
  const run: SwampRunner = (args) => {
    calls.push(args);
    const key = args.slice(0, args[0] === "model" && args[1] === "get" ? 3 : 2)
      .join(" ");
    const answer = answers[key];
    if (answer === undefined) {
      return Promise.reject(new Error(`unexpected swamp ${args.join(" ")}`));
    }
    try {
      return Promise.resolve(answer());
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return { run, calls };
}

const search = (...models: { name: string; type: string }[]) => () => ({
  query: "",
  results: models,
});

Deno.test("remote: swampBinary is the swamp running the method, never deno", () => {
  assertEquals(
    swampBinary("/home/a/.local/bin/swamp"),
    "/home/a/.local/bin/swamp",
  );
  for (const deno of ["/usr/bin/deno", "C:\\deno\\deno.exe"]) {
    assertThrows(() => swampBinary(deno), Error, "installed swamp");
  }
});

Deno.test("remote: a failure names swamp's own error from the envelope after the Remote line", () => {
  const stderr = "     Remote   wss://swamp.example.com\n" +
    '{\n  "error": "Server reported model_get_failed: Behavior not found: x",\n' +
    '  "code": "model_get_failed"\n}\n';
  assertEquals(
    failure(["model", "get", "x"], stderr),
    "swamp model get failed: Server reported model_get_failed: Behavior not found: x",
  );
  assertEquals(
    failure(["data", "query"], "Remote x\nconnection refused\n"),
    "swamp data query failed: connection refused",
  );
  assertEquals(failure(["data", "query"], ""), "swamp data query failed");
});

Deno.test("remote: remoteQuery runs data query with the predicate and select, and gives its results", async () => {
  const record = { modelName: "k-1", version: 2, content: { key: "k-1" } };
  const { run, calls } = fakeSwamp({
    "data query": () => ({ predicate: "p", results: [record] }),
  });
  const query = remoteQuery(run);
  assertEquals(await query('name == "run"'), [record]);
  assertEquals(await query('name == "run"', "[modelName, version]"), [record]);
  assertEquals(calls, [
    ["data", "query", 'name == "run"'],
    ["data", "query", 'name == "run"', "--select", "[modelName, version]"],
  ]);
});

Deno.test("remote: an answer with no results list is an error, not an empty list", async () => {
  const { run } = fakeSwamp({ "data query": () => ({ nope: true }) });
  await assertRejects(() => remoteQuery(run)("p"), Error, "no results list");
});

Deno.test("remote: remoteFactoryNames keeps factories only, sorted and once each", async () => {
  const { run } = fakeSwamp({
    "model search": search(
      { name: "team", type: FACTORY_TYPE },
      { name: "issue-1", type: "@swamp/issue-lifecycle" },
      { name: "alpha", type: FACTORY_TYPE },
      { name: "team", type: FACTORY_TYPE },
      { name: "", type: FACTORY_TYPE },
    ),
  });
  assertEquals(await remoteFactoryNames(run), ["alpha", "team"]);
});

Deno.test("remote: remoteDefinition writes the model definition file's fields only, as YAML", async () => {
  const { run } = fakeSwamp({ "model get team": () => modelGet("team") });
  const got = await remoteDefinition(run, SERVER, "team");
  assertEquals(got.factory, "team");
  assertEquals(got.path, `team on ${SERVER}`);
  assertMatch(got.digest, /^sha256:[0-9a-f]{64}$/);
  const file = parseYaml(got.text) as Record<string, unknown>;
  assertEquals(Object.keys(file), [
    "type",
    "typeVersion",
    "id",
    "name",
    "version",
    "tags",
    "globalArguments",
  ]);
  assertEquals(file.globalArguments, modelGet("team").globalArguments);
});

Deno.test("remote: remoteDefinition refuses a dash-leading name before any call, and a model that is not that factory", async () => {
  const { run, calls } = fakeSwamp({
    "model get team": () => ({ ...modelGet("team"), type: "@other/type" }),
  });
  await assertRejects(
    () => remoteDefinition(run, SERVER, "--help"),
    Error,
    "starting with '-'",
  );
  assertEquals(calls, []);
  await assertRejects(
    () => remoteDefinition(run, SERVER, "team"),
    Error,
    "is not a factory",
  );
});

Deno.test("remote: the factory list and definitions come from the poll's last read", async () => {
  let description = "first";
  let names = [{ name: "team", type: FACTORY_TYPE }];
  const { run, calls } = fakeSwamp({
    "model search": () => ({ results: names }),
    "model get team": () => modelGet("team", description),
    "model get beta": () => modelGet("beta"),
  });
  const events: StudioEvent[] = [];
  const remote = remoteFactories(run, SERVER, (e) => events.push(e));
  const listed = await remote.list();
  assertEquals(listed, [{ name: "team", path: `team on ${SERVER}` }]);
  const first = await remote.definition(listed[0]);
  // A second page load reads nothing.
  await remote.list();
  assertEquals(await remote.definition(listed[0]), first);
  assertEquals(calls.length, 2);

  // A poll with nothing changed tells nothing.
  await remote.poll();
  assertEquals(events, []);

  description = "second";
  names = [...names, { name: "beta", type: FACTORY_TYPE }];
  await remote.poll();
  assertEquals(events, [
    { kind: "factories" },
    { kind: "definition", factory: "team" },
  ]);
  const second = await remote.definition(listed[0]);
  assert(second.digest !== first.digest);
  // A factory the page never opened is not read by the poll.
  assertFalse(calls.some((c) => c.join(" ") === "model get beta"));
});

Deno.test("remote: a failed poll keeps the last read and reports it; the next good poll goes on", async () => {
  let failing = false;
  const { run } = fakeSwamp({
    "model search": () => {
      if (failing) throw new Error("swamp model search failed: expired login");
      return { results: [{ name: "team", type: FACTORY_TYPE }] };
    },
    "model get team": () => modelGet("team"),
  });
  const errors: string[] = [];
  const remote = remoteFactories(run, SERVER, () => {}, (m) => errors.push(m));
  const [team] = await remote.list();
  const text = await remote.definition(team);
  failing = true;
  assertEquals(await remote.poll(), false);
  assertEquals(errors, ["swamp model search failed: expired login"]);
  assertEquals(await remote.list(), [team]);
  assertEquals(await remote.definition(team), text);
  failing = false;
  assertEquals(await remote.poll(), true);
  assertEquals(errors.length, 1);
});

Deno.test("remote: a dash-leading factory is listed with an error, and never read", async () => {
  const { run, calls } = fakeSwamp({
    "model search": search({ name: "-x", type: FACTORY_TYPE }),
  });
  const remote = remoteFactories(run, SERVER, () => {});
  const [entry] = await remote.list();
  assertEquals(entry.path, null);
  assertMatch(entry.error ?? "", /starting with '-'/);
  await remote.poll();
  assertEquals(calls.map((c) => c[1]), ["search", "search"]);
});

Deno.test("remote: a factory gone from the list is forgotten", async () => {
  let names = [{ name: "team", type: FACTORY_TYPE }];
  const { run, calls } = fakeSwamp({
    "model search": () => ({ results: names }),
    "model get team": () => modelGet("team"),
  });
  const remote = remoteFactories(run, SERVER, () => {});
  await remote.definition((await remote.list())[0]);
  names = [];
  await remote.poll();
  await remote.poll();
  assertEquals(calls.filter((c) => c[1] === "get").length, 1);
});
