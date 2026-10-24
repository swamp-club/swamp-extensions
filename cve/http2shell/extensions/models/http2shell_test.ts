import { assert, assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import {
  errorStatus,
  failedMitigation,
  hostList,
  instanceName,
  mapLimit,
  model,
  splitList,
} from "./http2shell.ts";
import { analyze, parseProbe } from "./_lib/analysis.ts";
import { StatusSchema } from "./_lib/schemas.ts";

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/cve/http2shell");
  assertEquals(
    new Set(Object.keys(model.methods)),
    new Set(["scan", "scanFleet", "mitigate"]),
  );
  assertEquals(Object.keys(model.resources), ["status"]);
  assertEquals(model.reports, ["@swamp/cve/http2shell-report"]);
  assertEquals(model.files.log.streaming, true);
  assert(model.files.script);
});

Deno.test("globalArguments default to localhost as root, no search paths", () => {
  const g = model.globalArguments.parse({});
  assertEquals(g.targetHost, "localhost");
  assertEquals(g.sshUser, "root");
  assertEquals(g.searchPaths, "");
});

Deno.test("mitigate defaults: dry run, restarts on, Python untouched", () => {
  const a = model.methods.mitigate.arguments.parse({});
  assertEquals(a.dryRun, true);
  assertEquals(a.restartServices, true);
  assertEquals(a.upgradePython, false);
  assertEquals(a.removePythonBrotli, false);
});

Deno.test("scanFleet requires hosts and bounds concurrency", () => {
  assertEquals(model.methods.scanFleet.arguments.safeParse({}).success, false);
  assertEquals(
    model.methods.scanFleet.arguments.parse({ hosts: "a" }).concurrency,
    10,
  );
  assertEquals(
    model.methods.scanFleet.arguments.safeParse({ hosts: "a", concurrency: 0 })
      .success,
    false,
  );
});

Deno.test("hostList and splitList trim, dedupe and fold local aliases", () => {
  assertEquals(hostList(" a, b,a,localhost,127.0.0.1,", "root"), [
    { host: "a" },
    { host: "b" },
    { host: "localhost" },
  ]);
  assertEquals(splitList("/srv, /opt ,,/srv"), ["/srv", "/opt"]);
  assertEquals(splitList(undefined), []);
});

Deno.test("hostList: user@host carries its user; plain and local hosts carry none", () => {
  assertEquals(
    hostList(
      " ops@192.0.2.10,ops@192.0.2.10, 192.0.2.11,admin@fe80::1,kim@localhost,::1",
      "root",
    ),
    [
      { host: "192.0.2.10", sshUser: "ops" },
      { host: "192.0.2.11" },
      { host: "fe80::1", sshUser: "admin" },
      { host: "localhost" },
    ],
  );
});

Deno.test("hostList: refuses a bad user, an empty host, and one host with two users", () => {
  assertThrows(() => hostList("@h", "root"), Error, "invalid SSH user");
  assertThrows(
    () => hostList("-oProxyCommand=id@h", "root"),
    Error,
    "invalid SSH user",
  );
  assertThrows(() => hostList("a@", "root"), Error, "invalid host");
  assertThrows(() => hostList("a@b@h", "root"), Error, "invalid host");
  assertThrows(() => hostList("a@h,b@h", "root"), Error, "both a@h and b@h");
  assertThrows(() => hostList("h,a@h", "root"), Error, "both root@h and a@h");
  // The model's own user given explicitly is the same login: one host.
  assertEquals(hostList("h,root@h", "root"), [{ host: "h" }]);
});

Deno.test("instanceName removes path separators", () => {
  assertEquals(
    instanceName("gcr.io/distroless/nodejs24"),
    "gcr.io_distroless_nodejs24",
  );
  assertEquals(instanceName("a/../b"), "a___b");
});

Deno.test("mapLimit keeps order and never runs more than the limit", async () => {
  let running = 0;
  let peak = 0;
  const out = await mapLimit([1, 2, 3, 4, 5], 2, async (n) => {
    running++;
    peak = Math.max(peak, running);
    await new Promise((r) => setTimeout(r, 5));
    running--;
    if (n === 3) throw new Error("three");
    return n * 10;
  });
  assertEquals(peak, 2);
  assertEquals(out.map((o) => o.status), [
    "fulfilled",
    "fulfilled",
    "rejected",
    "fulfilled",
    "fulfilled",
  ]);
  assertEquals((out[4] as PromiseFulfilledResult<number>).value, 50);
});

Deno.test("statuses from analyze, errors and failed mitigations match the resource schema", () => {
  const s = analyze(
    parseProbe(
      "HOSTNAME|h\nUID|0\nOS|ID=debian\nOS|VERSION_ID=12\nPKG|dpkg|libbrotli1|1.0.9-2\nNODE|/usr/local/bin/node||v24.22.0 1.2.0|\nEND|1",
    ),
    "h",
    { inContainer: false, probe: "sh" },
  );
  StatusSchema.parse(s);
  const e = errorStatus("h", new Error("ssh: connect refused"));
  StatusSchema.parse(e);
  assertEquals(e.action, "unreachable");
  const m = failedMitigation(e, {
    dryRun: false,
    restartServices: true,
    upgradePython: true,
    removePythonBrotli: false,
  });
  StatusSchema.parse(m);
  assertEquals(m.mitigation?.outcome, "error");
  assertEquals(m.mitigation?.dryRun, false);
});

Deno.test("scanFleet keeps a user@host entry's user on its status, named by the bare host", async () => {
  const written: { name: string; data: unknown }[] = [];
  const writer = {
    writeLine: () => Promise.resolve(),
    finalize: () => Promise.resolve(),
  };
  await model.methods.scanFleet.execute(
    { hosts: "ops@unreachable.invalid,other.invalid", concurrency: 2 },
    {
      globalArgs: model.globalArguments.parse({}),
      logger: { info: () => {}, debug: () => {} },
      createFileWriter: () => writer,
      writeResource: (_spec, name, data) => {
        written.push({ name, data });
        return Promise.resolve({ name });
      },
    },
  );
  assertEquals(written.map((w) => w.name), [
    "unreachable.invalid",
    "other.invalid",
  ]);
  assertEquals(StatusSchema.parse(written[0].data).sshUser, "ops");
  assertEquals(StatusSchema.parse(written[1].data).sshUser, undefined);
});

Deno.test("scanFleet writes an error status for a host it cannot reach", async () => {
  const written: { name: string; data: unknown }[] = [];
  const writer = {
    writeLine: () => Promise.resolve(),
    finalize: () => Promise.resolve(),
  };
  const result = await model.methods.scanFleet.execute(
    { hosts: "unreachable.invalid", concurrency: 1 },
    {
      globalArgs: model.globalArguments.parse({}),
      logger: { info: () => {}, debug: () => {} },
      createFileWriter: () => writer,
      writeResource: (_spec, name, data) => {
        written.push({ name, data });
        return Promise.resolve({ name });
      },
    },
  );
  assertEquals(result.dataHandles.length, 1);
  assertEquals(written[0].name, "unreachable.invalid");
  const status = StatusSchema.parse(written[0].data);
  assertEquals(status.riskLevel, "unknown");
  assert(status.error);
});
