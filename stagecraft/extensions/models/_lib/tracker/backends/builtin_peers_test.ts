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

import { assert, assertEquals } from "@std/assert";
import {
  type Peer,
  peerEnv,
  type PeerOutput,
  peerReader,
  type PeerRun,
  type PeerRunSeams,
  relationStatuses,
  swampPeerRun,
} from "./builtin_peers.ts";
import type { TrackerRelation } from "../core/adapter.ts";

const REF = { tracker: "devswamp", id: "devswamp-25" };
const TICKET = {
  id: "devswamp-25",
  display: "DEVSWAMP-25",
  status: { id: "open", name: "open" },
};
const answer = (...tickets: unknown[]): PeerOutput => ({
  code: 0,
  stdout: JSON.stringify({
    results: tickets.map((content) => ({ content, attributes: content })),
  }),
  stderr: "",
});
const failed = (message: string): PeerOutput => ({
  code: 1,
  stdout: "",
  stderr: `Remote x\n{\n  "error": "${message}"\n}\n`,
});

function reader(
  peer: Peer,
  output: PeerOutput | ((args: string[]) => PeerOutput),
) {
  const calls: { args: string[]; token: string | undefined }[] = [];
  const run: PeerRun = (args, token) => {
    calls.push({ args, token });
    return Promise.resolve(
      typeof output === "function" ? output(args) : output,
    );
  };
  return { reader: peerReader({ peers: { devswamp: peer }, run }), calls };
}

Deno.test("peer reader: a repository is read by path, asking for the one ticket", async () => {
  const { reader: r, calls } = reader(
    { repo: "/work/devswamp" },
    answer(TICKET),
  );
  assertEquals(await r.read(REF), {
    state: "resolved",
    id: "devswamp-25",
    display: "DEVSWAMP-25",
    status: "open",
  });
  assertEquals(calls, [{
    args: [
      "data",
      "query",
      'modelName == "devswamp" && specName == "issue" && name == "issue-devswamp-25"',
      "--json",
      "--no-color",
      "--no-telemetry",
      "--repo-dir",
      "/work/devswamp",
    ],
    token: undefined,
  }]);
});

Deno.test("peer reader: a serve is read by URL, with its token", async () => {
  const { reader: r, calls } = reader(
    { server: "https://s.example", token: "name.secret" },
    answer(TICKET),
  );
  assertEquals((await r.read(REF)).state, "resolved");
  assertEquals(calls[0].args.slice(-2), ["--server", "https://s.example"]);
  assertEquals(calls[0].token, "name.secret");
  assert(!calls[0].args.join(" ").includes("secret"));
});

Deno.test("peer reader: each reference is read once per call", async () => {
  const { reader: r, calls } = reader({ repo: "/a" }, answer(TICKET));
  await r.read(REF);
  await r.read(REF);
  assertEquals(calls.length, 1);
});

Deno.test("peer reader: a display id is found among the tracker's tickets, and an id with other characters never reaches the predicate", async () => {
  const other = { ...TICKET, id: "other", display: "OTHER" };
  const { reader: r, calls } = reader(
    { repo: "/a" },
    (args) => args[2].includes("name ==") ? answer() : answer(other, TICKET),
  );
  assertEquals(
    await r.read({ tracker: "devswamp", id: "DEVSWAMP-25" }),
    {
      state: "resolved",
      id: "devswamp-25",
      display: "DEVSWAMP-25",
      status: "open",
    },
  );
  assertEquals(calls.length, 2, "by name, then among its tickets");
  const odd = reader({ repo: "/a" }, answer({ ...TICKET, id: 'a" || true' }));
  const read = await odd.reader.read({ tracker: "devswamp", id: 'a"||true' });
  assertEquals(read.state, "unresolved");
  assertEquals(
    odd.calls.map((c) => c.args[2]),
    ['modelName == "devswamp" && specName == "issue"'],
  );
});

Deno.test("peer reader: only a record whose own id or display matches counts, and an old version never does", async () => {
  const wrong = reader(
    { repo: "/a" },
    answer({ ...TICKET, id: "other", display: "OTHER" }),
  );
  assertEquals((await wrong.reader.read(REF)).state, "unresolved");
  const run: PeerRun = () =>
    Promise.resolve({
      code: 0,
      stderr: "",
      stdout: JSON.stringify({
        results: [{ isLatest: false, content: TICKET, attributes: TICKET }],
      }),
    });
  const old = peerReader({ peers: { devswamp: { repo: "/a" } }, run });
  assertEquals((await old.read(REF)).state, "unresolved");
});

Deno.test("peer reader: a snapshot tracker's ticket says when it was last read", async () => {
  const { reader: r } = reader(
    { repo: "/a" },
    answer({ ...TICKET, fetchedAt: "2026-11-01T00:00:00.000Z" }),
  );
  const read = await r.read(REF);
  assert(read.state === "resolved");
  assertEquals(read.fetchedAt, "2026-11-01T00:00:00.000Z");
});

const unresolvedCases: [string, PeerOutput, string][] = [
  ["no such ticket", answer(), "not_found"],
  ["no token", failed("Authentication failed — run: swamp auth"), "auth"],
  ["no repository", failed("Not a swamp repository: /a"), "unreachable"],
  ["refused", failed("Connection refused"), "unreachable"],
  ["rate limited", failed("Rate-limited by server"), "rate_limited"],
  ["not JSON", { code: 0, stdout: "<html>", stderr: "" }, "bad_answer"],
  ["no results", { code: 0, stdout: "{}", stderr: "" }, "bad_answer"],
  ["no status", answer({ id: "devswamp-25" }), "bad_answer"],
  ["empty failure", { code: 3, stdout: "", stderr: "" }, "unreachable"],
];
for (const [what, output, reason] of unresolvedCases) {
  Deno.test(`peer reader: unresolved, never thrown: ${what}`, async () => {
    const { reader: r } = reader({ repo: "/a" }, output);
    const read = await r.read(REF);
    assert(read.state === "unresolved");
    assertEquals(read.reason, reason);
    assert(read.detail.length > 0 && read.detail.length <= 200);
  });
}

Deno.test("peer reader: a command that cannot start is unreachable", async () => {
  const run: PeerRun = () => Promise.reject(new Error("spawn failed"));
  const read = await peerReader({ peers: { devswamp: { repo: "/a" } }, run })
    .read(REF);
  assertEquals(read, {
    state: "unresolved",
    reason: "unreachable",
    detail: "spawn failed",
  });
});

/** A run that ends only when it is aborted, with the signal's exit code, as
 * Deno.Command does: it does not reject. */
const hangs: PeerRun = (_args, _token, signal) =>
  new Promise((resolve) => {
    signal.addEventListener(
      "abort",
      () => resolve({ code: 143, stdout: "", stderr: "" }),
    );
  });

Deno.test("peer reader: a read that hangs times out", async () => {
  const read = await peerReader({
    peers: { devswamp: { repo: "/a" } },
    run: hangs,
    readTimeoutMs: 5,
  }).read(REF);
  assert(read.state === "unresolved");
  assertEquals(read.reason, "timeout");
});

Deno.test("peer reader: a read that hangs and rejects when aborted times out too", async () => {
  const read = await peerReader({
    peers: { devswamp: { repo: "/a" } },
    run: (_args, _token, signal) =>
      new Promise((_, reject) => {
        signal.addEventListener("abort", () => reject(new Error("killed")));
      }),
    readTimeoutMs: 5,
  }).read(REF);
  assertEquals((read as { reason: string }).reason, "timeout");
});

Deno.test("peer reader: once the call's budget is spent, nothing more runs", async () => {
  let runs = 0;
  const r = peerReader({
    peers: { devswamp: { repo: "/a" } },
    run: (args, token, signal) => {
      runs++;
      return hangs(args, token, signal);
    },
    readTimeoutMs: 1000,
    budgetMs: 5,
  });
  assertEquals((await r.read(REF) as { reason: string }).reason, "timeout");
  const spent = runs;
  const next = await r.read({ tracker: "devswamp", id: "other" });
  assertEquals((next as { reason: string }).reason, "timeout");
  assertEquals(runs, spent);
});

Deno.test("peer reader: a tracker with no peer is looked for in this repository", async () => {
  const predicates: string[] = [];
  const query = (predicate: string) => {
    predicates.push(predicate);
    return Promise.resolve(
      predicate.includes("name ==")
        ? [{ attributes: TICKET, content: TICKET }]
        : [],
    );
  };
  const here = peerReader({
    peers: {},
    query,
    run: () => {
      throw new Error("no command for this repository");
    },
  });
  assertEquals((await here.read(REF)).state, "resolved");
  assertEquals(predicates.length, 1);

  const none = await peerReader({ peers: {}, query: () => Promise.resolve([]) })
    .read(REF);
  assertEquals((none as { reason: string }).reason, "no_peer");
  const noQuery = await peerReader({ peers: {} }).read(REF);
  assertEquals((noQuery as { reason: string }).reason, "no_peer");
  const missing = await peerReader({
    peers: {},
    query: () =>
      Promise.resolve([{ attributes: { ...TICKET, id: "x", display: "X" } }]),
  }).read(REF);
  assertEquals((missing as { reason: string }).reason, "not_found");
  const broken = await peerReader({
    peers: {},
    query: () => Promise.reject(new Error("no datastore")),
  }).read(REF);
  assertEquals((broken as { reason: string }).reason, "unreachable");
});

Deno.test("peer reader: a peer takes precedence over an instance of the name here", async () => {
  let queried = false;
  const r = peerReader({
    peers: { devswamp: { repo: "/a" } },
    query: () => {
      queried = true;
      return Promise.resolve([]);
    },
    run: () => Promise.resolve(answer(TICKET)),
  });
  assertEquals((await r.read(REF)).state, "resolved");
  assertEquals(queried, false);
});

Deno.test("peer reader: a tracker named like an Object property is not a peer", async () => {
  const read = await peerReader({
    peers: {},
    run: () => {
      throw new Error("no peer to run");
    },
  }).read({ tracker: "constructor", id: "x" });
  assertEquals((read as { reason: string }).reason, "no_peer");
});

Deno.test("peer env: a peer's swamp takes its account and files, and no other swamp setting", () => {
  assertEquals(
    peerEnv({
      HOME: "/h",
      PATH: "/p",
      SWAMP_API_KEY: "k",
      SWAMP_API_KEY_FILE: "/k",
      SWAMP_CA_CERT: "/ca",
      SWAMP_CONFIG_DIR: "/c",
      SWAMP_HOME: "/s",
      SWAMP_SIGNIN_TOKEN: "t",
      SWAMP_DATASTORE: "s3://elsewhere",
      SWAMP_REPO_DIR: "/r",
      SWAMP_SERVER_TOKEN: "t",
      SWAMP_SERVER_TOKEN_FILE: "/f",
      SWAMP_SERVE_EXTRA_HEADERS: "h",
      SWAMP_SERVE_URL: "u",
      SWAMP_SERVER_URL: "u",
      SWAMP_SOMETHING_NEW: "x",
    }),
    {
      HOME: "/h",
      PATH: "/p",
      SWAMP_API_KEY: "k",
      SWAMP_API_KEY_FILE: "/k",
      SWAMP_CA_CERT: "/ca",
      SWAMP_CONFIG_DIR: "/c",
      SWAMP_HOME: "/s",
      SWAMP_SIGNIN_TOKEN: "t",
    },
  );
});

Deno.test("peer reader: a peer's instance names the tracker there, so two peers can both be called board", async () => {
  const { reader: r, calls } = reader(
    { repo: "/a", instance: "board" },
    answer(TICKET),
  );
  await r.read({ tracker: "devswamp", id: "devswamp-25" });
  assert(calls[0].args[2].startsWith('modelName == "board" && '));
});

Deno.test("peer reader: a read that will not end after it is aborted is left behind", async () => {
  const read = await peerReader({
    peers: { devswamp: { repo: "/a" } },
    run: () => new Promise(() => {}),
    readTimeoutMs: 5,
  }).read(REF);
  assertEquals((read as { reason: string }).reason, "timeout");
});

Deno.test("peer reader: a null among the results, or a display id in another case, does no harm", async () => {
  const { reader: r } = reader(
    { repo: "/a" },
    {
      code: 0,
      stderr: "",
      stdout: JSON.stringify({
        results: [null, { content: TICKET, attributes: TICKET }],
      }),
    },
  );
  assertEquals((await r.read(REF)).state, "resolved");
  const lower = reader(
    { repo: "/a" },
    answer({ ...TICKET, id: "uuid-1", display: "SREMON-2131" }),
  );
  const read = await lower.reader.read({
    tracker: "devswamp",
    id: "sremon-2131",
  });
  assertEquals((read as { id: string }).id, "uuid-1");
});

/** swampPeerRun's outside world, recorded. */
function seams(spawn?: PeerRunSeams["spawn"]) {
  const log: string[] = [];
  const spawned: { args: string[]; env: Record<string, string> }[] = [];
  const s: PeerRunSeams = {
    execPath: () => "/usr/local/bin/swamp",
    env: () => ({ HOME: "/h", SWAMP_SERVER_TOKEN: "operator" }),
    spawn: (binary, args, env, signal) => {
      spawned.push({ args, env });
      log.push(`spawn ${binary}`);
      return spawn?.(binary, args, env, signal) ??
        Promise.resolve({ code: 0, stdout: "{}", stderr: "" });
    },
    writePrivateFile: (text) => {
      log.push(`write ${text}`);
      return Promise.resolve("/tmp/token");
    },
    remove: (path) => {
      log.push(`remove ${path}`);
      return Promise.resolve();
    },
  };
  return { s, log, spawned };
}

const signal = new AbortController().signal;

Deno.test("peer run: with no token there is no file, and the operator's token is withheld", async () => {
  const { s, log, spawned } = seams();
  await swampPeerRun(s)(["data", "query"], undefined, signal);
  assertEquals(log, ["spawn /usr/local/bin/swamp"]);
  assertEquals(spawned[0].args, ["data", "query"]);
  assertEquals(spawned[0].env, { HOME: "/h" });
});

Deno.test("peer run: a token goes in a private file, never an argument, and the file goes when the read does", async () => {
  const { s, log, spawned } = seams();
  await swampPeerRun(s)(["data", "query"], "name.secret", signal);
  assertEquals(log, [
    "write name.secret",
    "spawn /usr/local/bin/swamp",
    "remove /tmp/token",
  ]);
  assertEquals(spawned[0].args, [
    "data",
    "query",
    "--token-file",
    "/tmp/token",
  ]);
  assert(!JSON.stringify(spawned).includes("secret"));
});

Deno.test("peer run: the token file is removed when the read fails", async () => {
  const { s, log } = seams(() => Promise.reject(new Error("killed")));
  let thrown = false;
  await swampPeerRun(s)([], "name.secret", signal).catch(() => thrown = true);
  assert(thrown);
  assertEquals(log.at(-1), "remove /tmp/token");
});

Deno.test("peer run: under deno there is no swamp to run, and the read says so", async () => {
  const { s } = seams();
  const run = swampPeerRun({ ...s, execPath: () => "/usr/bin/deno" });
  const read = await peerReader({ peers: { devswamp: { repo: "/a" } }, run })
    .read(REF);
  assert(read.state === "unresolved");
  assertEquals(read.reason, "unsupported_runtime");
});

const relation = (issue: string): TrackerRelation => ({
  type: "blocked_by",
  direction: "outgoing",
  issue,
  display: issue,
});

Deno.test("relation statuses: a local ticket is read from this tracker, and a missing one is unresolved", async () => {
  const none = peerReader({ peers: {} });
  const statuses = await relationStatuses(
    [relation("a"), relation("gone")],
    "builtin",
    none,
    (id) =>
      Promise.resolve(
        id === "a" ? { status: { id: "shipped", name: "shipped" } } : null,
      ),
  );
  assertEquals(statuses.map((s) => [s.external, s.state, s.status, s.reason]), [
    [false, "resolved", "shipped", undefined],
    [false, "unresolved", undefined, "not_found"],
  ]);
});

Deno.test("relation statuses: a stored reference that no longer parses reads as unresolved", async () => {
  const statuses = await relationStatuses(
    [relation("Bad:x")],
    "builtin",
    peerReader({ peers: {} }),
    () => Promise.resolve(null),
  );
  assertEquals(statuses[0].external, true);
  assertEquals(statuses[0].reason, "bad_answer");
});
