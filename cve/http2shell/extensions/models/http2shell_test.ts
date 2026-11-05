import {
  assert,
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
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

// --- Log and status names (swamp-club #4383) --------------------------------

/** A stored version of a data name, as the data repository describes it. */
type StoredVersion = { version: number; tags: Record<string, string> };

/**
 * Records the kind each data name is written as, and refuses one name written
 * as a file and a resource, in one run (swamp-club #3700) or across runs
 * (#4302), as swamp does. `stored` is data earlier runs left, served and
 * deleted through `repo`. Each refusal is also kept, so a method that catches
 * the error still shows it.
 */
function strictNames(stored: Record<string, StoredVersion[]> = {}) {
  const kinds = new Map<string, string>();
  const clashes: string[] = [];
  const deleted: string[] = [];
  const claim = (kind: string, name: string) => {
    const prior = kinds.get(name) ??
      stored[name]?.find((v) => v.tags.type !== kind)?.tags.type;
    if (prior !== undefined && prior !== kind) {
      const message =
        `Duplicate data instance name '${name}' (already written as ${prior})`;
      clashes.push(message);
      throw new Error(message);
    }
    kinds.set(name, kind);
  };
  const repo = {
    findByName: (_t: string, _id: string, name: string, version?: number) => {
      const versions = stored[name] ?? [];
      return Promise.resolve(
        (version === undefined
          ? versions[versions.length - 1]
          : versions.find((v) => v.version === version)) ?? null,
      );
    },
    delete: (_t: string, _id: string, name: string, version?: number) => {
      deleted.push(`${name}@${version ?? "all"}`);
      stored[name] = version === undefined
        ? []
        : (stored[name] ?? []).filter((v) => v.version !== version);
      return Promise.resolve();
    },
  };
  return { claim, clashes, kinds, repo, deleted };
}

/** What versions before #4383 left: the target's log under its status name. */
const OLD_LOG: StoredVersion = {
  version: 1,
  tags: { type: "file", specName: "log" },
};

const PROBE_OUTPUT =
  "HOSTNAME|h\nUID|0\nOS|ID=debian\nOS|VERSION_ID=12\nPKG|dpkg|libbrotli1|1.0.9-2\nEND|1";

/**
 * Run scan, scanFleet or mitigate (dry run) over ssh, with Deno.Command
 * replaced by a process that prints a probe's output, through a context that
 * refuses one name written as two kinds.
 */
async function runStrict(
  method: "scan" | "scanFleet" | "mitigate",
  hosts: string,
  stored: Record<string, StoredVersion[]> = {},
) {
  const names = strictNames(stored);
  const resources: Record<string, unknown> = {};
  const text = (s: string) =>
    new ReadableStream<Uint8Array>({
      start: (c) => {
        if (s) c.enqueue(new TextEncoder().encode(s));
        c.close();
      },
    });
  class FakeCommand {
    spawn() {
      return {
        stdout: text(PROBE_OUTPUT),
        stderr: text(""),
        stdin: new WritableStream<Uint8Array>(),
        status: Promise.resolve({ code: 0, success: true }),
      };
    }
  }
  const deno = Deno as unknown as { Command: unknown };
  const original = deno.Command;
  deno.Command = FakeCommand;
  try {
    const context = {
      globalArgs: model.globalArguments.parse({
        targetHost: hosts.split(",")[0],
        sshUser: "ops",
      }),
      logger: { info: () => {}, debug: () => {} },
      modelType: "@swamp/test",
      modelId: "m-1",
      dataRepository: names.repo,
      createFileWriter: (_spec: string, name: string) => {
        names.claim("file", name);
        return {
          writeLine: () => Promise.resolve(),
          finalize: () => Promise.resolve(),
        };
      },
      writeResource: (_spec: string, name: string, data: unknown) => {
        names.claim("resource", name);
        resources[name] = data;
        return Promise.resolve({ name });
      },
    } as unknown as Parameters<typeof model.methods.scanFleet.execute>[1];
    if (method === "scan") {
      await model.methods.scan.execute({}, context);
    } else if (method === "scanFleet") {
      await model.methods.scanFleet.execute({ hosts, concurrency: 2 }, context);
    } else {
      await model.methods.mitigate.execute({
        dryRun: true,
        hosts,
        restartServices: true,
        upgradePython: false,
        removePythonBrotli: false,
      }, context);
    }
  } finally {
    deno.Command = original;
  }
  return { names, resources };
}

for (const method of ["scan", "scanFleet", "mitigate"] as const) {
  Deno.test(`${method}: each target's log is <target>-log, apart from its status (#4383)`, async () => {
    const { names, resources } = await runStrict(
      method,
      "192.0.2.10,192.0.2.11",
    );
    assertEquals(names.clashes, []);
    const targets = method === "scan"
      ? ["192.0.2.10"]
      : ["192.0.2.10", "192.0.2.11"];
    for (const target of targets) {
      StatusSchema.parse(resources[target]);
      assertEquals(names.kinds.get(target), "resource");
      assertEquals(names.kinds.get(`${target}-log`), "file");
    }
  });
}

Deno.test("scanFleet refuses a host whose status would share the fleet summary log's name", async () => {
  const opened: string[] = [];
  await assertRejects(
    () =>
      model.methods.scanFleet.execute(
        { hosts: "10.0.0.1,ops@fleet", concurrency: 2 },
        {
          globalArgs: model.globalArguments.parse({}),
          logger: { info: () => {}, debug: () => {} },
          createFileWriter: (_spec: string, name: string) => {
            opened.push(name);
            return {
              writeLine: () => Promise.resolve(),
              finalize: () => Promise.resolve(),
            };
          },
          writeResource: () => Promise.resolve({}),
        } as unknown as Parameters<typeof model.methods.scanFleet.execute>[1],
      ),
    Error,
    "fleet would write its status under the fleet summary log's name",
  );
  assertEquals(opened, []);
});

Deno.test("a log an earlier version left under the status name is deleted, and the status written (#4383)", async () => {
  for (const method of ["scan", "scanFleet", "mitigate"] as const) {
    const stored: Record<string, StoredVersion[]> = {
      "192.0.2.10": [{ ...OLD_LOG }],
      // swamp before #3700 let the status follow the log under one name.
      "192.0.2.11": [
        { ...OLD_LOG },
        { version: 2, tags: { type: "resource", specName: "status" } },
      ],
    };
    const { resources, names } = await runStrict(
      method,
      "192.0.2.10,192.0.2.11",
      stored,
    );
    assertEquals(names.clashes, [], method);
    assert(resources["192.0.2.10"], `${method}: no status for 192.0.2.10`);
    const expected = method === "scan"
      ? ["192.0.2.10@1"]
      : ["192.0.2.10@1", "192.0.2.11@1"];
    assertEquals(names.deleted.sort(), expected, method);
  }
});

for (const method of ["scanFleet", "mitigate"] as const) {
  Deno.test(`${method} refuses a host whose log would share another host's status name`, async () => {
    await assertRejects(
      () => runStrict(method, "web,web-log"),
      Error,
      "web's log and web-log's status would both be stored as web-log",
    );
  });
}

Deno.test("another target's current log under a status name is never deleted (#4383)", async () => {
  // web's log from an earlier run of this version, then a host named web-log.
  const current: StoredVersion = {
    version: 1,
    tags: { type: "file", specName: "log", logFor: "web" },
  };
  const stored: Record<string, StoredVersion[]> = { "web-log": [current] };
  await assertRejects(
    () => runStrict("scan", "web-log", stored),
    Error,
    "Duplicate data instance name 'web-log'",
  );
  assertEquals(stored["web-log"], [current]);
});
