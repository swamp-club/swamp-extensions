import {
  assert,
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  buildMitigationCommands,
  model,
  PRIVILEGE_CHECK,
} from "./dirtyfrag_detect.ts";

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/cve/dirtyfrag");
  assertEquals(typeof model.version, "string");
  assertEquals(
    new Set(Object.keys(model.methods)),
    new Set(["scan", "scanFleet", "mitigate"]),
  );
  assertEquals(Object.keys(model.resources), ["status"]);
  assertEquals(model.resources.status.lifetime, "infinite");
  assertEquals(model.reports, ["@swamp/cve/dirtyfrag-report"]);
});

Deno.test("globalArguments accepts defaults-only config", () => {
  const result = model.globalArguments.parse({});
  assertEquals(result.targetHost, "localhost");
  assertEquals(result.sshUser, "root");
  assertEquals(result.suBinaryPath, "/usr/bin/su");
  assertEquals(result.sshKey, undefined);
  assertEquals(result.dockerContainer, undefined);
  assertEquals(result.dockerImage, undefined);
});

Deno.test("globalArguments accepts full remote config", () => {
  const result = model.globalArguments.parse({
    targetHost: "10.0.0.5",
    sshUser: "ubuntu",
    sshKey: "/home/user/.ssh/id_ed25519",
    suBinaryPath: "/usr/local/bin/su",
  });
  assertEquals(result.targetHost, "10.0.0.5");
  assertEquals(result.sshUser, "ubuntu");
  assertEquals(result.sshKey, "/home/user/.ssh/id_ed25519");
});

Deno.test("globalArguments accepts docker config", () => {
  const result = model.globalArguments.parse({
    dockerContainer: "my-container",
  });
  assertEquals(result.dockerContainer, "my-container");
  assertEquals(result.targetHost, "localhost");
});

Deno.test("globalArguments accepts dockerImage config", () => {
  const result = model.globalArguments.parse({
    dockerImage: "ubuntu:22.04",
  });
  assertEquals(result.dockerImage, "ubuntu:22.04");
});

Deno.test("inputsSchema accepts empty object", () => {
  const result = model.inputsSchema.parse({});
  assertEquals(result.targetHost, undefined);
  assertEquals(result.sshUser, undefined);
});

Deno.test("inputsSchema accepts partial overrides", () => {
  const result = model.inputsSchema.parse({
    targetHost: "10.0.0.1",
    sshKey: "/tmp/key",
  });
  assertEquals(result.targetHost, "10.0.0.1");
  assertEquals(result.sshKey, "/tmp/key");
  assertEquals(result.sshUser, undefined);
});

Deno.test("status resource schema validates a complete scan result", () => {
  const schema = model.resources.status.schema;
  const valid = {
    scanTimestamp: "2026-05-08T12:00:00.000Z",
    hostname: "web-01",
    kernelVersion: "6.8.0-40-generic",
    vulnerable: true,
    riskLevel: "critical",
    summary: "web-01 is critical-risk",
    cve202643284: {
      name: "CVE-2026-43284",
      description: "xfrm-ESP page-cache write",
      affected: true,
      patched: false,
      modulesLoaded: ["esp4"],
      modulesAvailable: ["esp4", "esp6"],
      userNamespacesEnabled: true,
    },
    cve202643500: {
      name: "CVE-2026-43500",
      description: "RxRPC RXKAD page-cache write",
      affected: false,
      patched: false,
      modulesLoaded: [],
      modulesAvailable: [],
    },
    mitigations: {
      espModulesBlocklisted: false,
      rxrpcModuleBlocklisted: false,
      userNamespacesRestricted: false,
      modprobeBlocklist: [],
    },
    indicators: {
      suPageCacheCorrupted: false,
      passwdPageCacheCorrupted: false,
      suspiciousXfrmSAs: false,
      rxrpcKeysFound: false,
      details: [],
    },
    recommendations: ["Apply kernel patch"],
  };
  const result = schema.parse(valid);
  assertEquals(result.hostname, "web-01");
  assertEquals(result.vulnerable, true);
});

Deno.test("status resource schema rejects invalid riskLevel", () => {
  const schema = model.resources.status.schema;
  assertThrows(() =>
    schema.parse({
      scanTimestamp: "2026-05-08T12:00:00.000Z",
      hostname: "h",
      kernelVersion: "6.8.0",
      vulnerable: false,
      riskLevel: "unknown",
      summary: "test",
      cve202643284: {
        name: "a",
        description: "b",
        affected: false,
        patched: false,
        modulesLoaded: [],
        modulesAvailable: [],
        userNamespacesEnabled: false,
      },
      cve202643500: {
        name: "a",
        description: "b",
        affected: false,
        patched: false,
        modulesLoaded: [],
        modulesAvailable: [],
      },
      mitigations: {
        espModulesBlocklisted: false,
        rxrpcModuleBlocklisted: false,
        userNamespacesRestricted: false,
        modprobeBlocklist: [],
      },
      indicators: {
        suPageCacheCorrupted: false,
        passwdPageCacheCorrupted: false,
        suspiciousXfrmSAs: false,
        rxrpcKeysFound: false,
        details: [],
      },
      recommendations: [],
    })
  );
});

Deno.test("scan method has no required arguments", () => {
  model.methods.scan.arguments.parse({});
});

Deno.test("scanFleet method requires hosts argument", () => {
  assertThrows(() => model.methods.scanFleet.arguments.parse({}));
  model.methods.scanFleet.arguments.parse({ hosts: "10.0.0.1,10.0.0.2" });
});

Deno.test("mitigate method defaults dryRun to true", () => {
  const result = model.methods.mitigate.arguments.parse({});
  assertEquals(result.dryRun, true);
  assertEquals(result.hosts, undefined);
});

Deno.test("mitigate method accepts hosts and dryRun override", () => {
  const result = model.methods.mitigate.arguments.parse({
    hosts: "10.0.0.1,10.0.0.2",
    dryRun: false,
  });
  assertEquals(result.hosts, "10.0.0.1,10.0.0.2");
  assertEquals(result.dryRun, false);
});

Deno.test("files spec has streaming log", () => {
  assertEquals(model.files.log.streaming, true);
  assertEquals(model.files.log.contentType, "text/plain");
});

// --- mitigate and log handles, with Deno.Command replaced by a script ---

type Reply = { code?: number; stdout?: string; stderr?: string };
type Status = {
  summary: string;
  riskLevel: string;
  mitigations: { espModulesBlocklisted: boolean; modprobeBlocklist: string[] };
  recommendations: string[];
};
type Handle = { kind: "resource" | "file"; name: string };
type Context = Parameters<typeof model.methods.mitigate.execute>[1];

// A vulnerable host: esp4 is loaded and nothing is patched or blocklisted.
function vulnerableHost(cmd: string, user: string): Reply | undefined {
  if (cmd === "uname -r") return { stdout: "6.8.0-generic" };
  if (cmd === "hostname") return { stdout: "web-01" };
  if (cmd === "whoami") return { stdout: user };
  if (cmd.startsWith("cat /proc/modules")) {
    return { stdout: "esp4 4096 0 - Live 0x0" };
  }
  return undefined;
}

// Replaces Deno.Command so no process is spawned (the cve/* test flags do not
// grant --allow-run) and records the command text each call would have run.
async function withCommands<T>(
  reply: (cmd: string) => Reply | undefined,
  run: (ran: string[]) => Promise<T>,
): Promise<T> {
  const ran: string[] = [];
  const encoder = new TextEncoder();
  class FakeCommand {
    #args: string[];
    constructor(_bin: string, options: { args: string[] }) {
      this.#args = options.args;
    }
    output() {
      const cmd = this.#args[this.#args.length - 1];
      ran.push(cmd);
      const r = reply(cmd) ?? {};
      return Promise.resolve({
        code: r.code ?? 0,
        stdout: encoder.encode(r.stdout ?? ""),
        stderr: encoder.encode(r.stderr ?? ""),
      });
    }
  }
  const deno = Deno as unknown as { Command: unknown };
  const original = deno.Command;
  deno.Command = FakeCommand;
  try {
    return await run(ran);
  } finally {
    deno.Command = original;
  }
}

function fakeContext(failLogs = false) {
  const statuses = new Map<string, Status>();
  const context = {
    globalArgs: model.globalArguments.parse({}),
    logger: { info: () => {}, debug: () => {} },
    createFileWriter: (_spec: string, name: string) => ({
      writeLine: () => Promise.resolve(),
      finalize: () =>
        failLogs
          ? Promise.reject(new Error("disk full"))
          : Promise.resolve({ kind: "file", name } as Handle),
    }),
    writeResource: (_spec: string, name: string, data: unknown) => {
      statuses.set(name, data as Status);
      return Promise.resolve({ kind: "resource", name } as Handle);
    },
  } as Context;
  return { context, statuses };
}

async function mitigate(
  reply: (cmd: string) => Reply | undefined,
  dryRun: boolean,
  failLogs = false,
) {
  const { context, statuses } = fakeContext(failLogs);
  return await withCommands(reply, async (ran) => {
    const result = await model.methods.mitigate.execute(
      { dryRun, hosts: "localhost" },
      context,
    );
    return {
      ran,
      status: statuses.get("localhost")!,
      handles: result.dataHandles as Handle[],
    };
  });
}

// The mitigation commands proper, not the privilege check.
const escalated = (ran: string[]) =>
  ran.filter((c) =>
    c !== PRIVILEGE_CHECK && (c.includes("tee ") || c.includes("rmmod "))
  );

Deno.test("mitigate: sudo needing a password fails before any command runs", async () => {
  const { ran, status } = await mitigate(
    (cmd) =>
      cmd === PRIVILEGE_CHECK
        ? { code: 1, stderr: "sudo: a password is required" }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assertEquals(escalated(ran), []);
  assert(
    status.summary.startsWith(
      "Mitigation failed on localhost: sudo needs a password",
    ),
    status.summary,
  );
  assertStringIncludes(status.summary, "a password is required");
  assertEquals(status.riskLevel, "high");
  assertEquals(status.mitigations.espModulesBlocklisted, false);
  assertEquals(status.mitigations.modprobeBlocklist, []);
  assertStringIncludes(status.recommendations[0], "passwordless sudo");
});

Deno.test("mitigate: dry run reports the sudo failure as a dry run", async () => {
  const { ran, status } = await mitigate(
    (cmd) =>
      cmd === PRIVILEGE_CHECK ? { code: 1 } : vulnerableHost(cmd, "ubuntu"),
    true,
  );
  assertEquals(escalated(ran), []);
  assert(
    status.summary.startsWith("Dry run: Mitigation failed on localhost"),
    status.summary,
  );
});

Deno.test("mitigate: a failing command means the host is not mitigated", async () => {
  const { status } = await mitigate(
    (cmd) =>
      cmd.includes("tee /etc/modprobe.d/")
        ? { code: 1, stderr: "tee: Permission denied" }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assertStringIncludes(status.summary, "Mitigation failed on localhost");
  assertStringIncludes(status.summary, "tee: Permission denied");
  assertEquals(status.riskLevel, "high");
  assertEquals(status.mitigations.espModulesBlocklisted, false);
});

Deno.test("mitigate: rmmod failing after the blocklist keeps the blocklist flag", async () => {
  const { status } = await mitigate(
    (cmd) =>
      cmd.includes("rmmod esp4")
        ? { code: 1, stderr: "rmmod: ERROR: Module esp4 is in use" }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assertStringIncludes(status.summary, "Mitigation failed on localhost");
  assertEquals(status.mitigations.espModulesBlocklisted, true);
  assertStringIncludes(status.recommendations[0], "reboot");
});

Deno.test("mitigate: success escalates with sudo -n -- and no sh -c", async () => {
  const { ran, status } = await mitigate(
    (cmd) => vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assert(ran.includes(PRIVILEGE_CHECK));
  assertEquals(escalated(ran).length, 5);
  for (const cmd of escalated(ran)) {
    assertStringIncludes(cmd, "sudo -n -- ");
    assert(!cmd.includes("sh -c"), cmd);
  }
  assertEquals(
    status.summary,
    "Mitigations applied: vulnerable modules blocklisted, page cache flushed.",
  );
  assertEquals(status.mitigations.espModulesBlocklisted, true);
  assertEquals(status.mitigations.modprobeBlocklist.length, 3);
});

Deno.test("mitigate: root runs commands without sudo or a privilege check", async () => {
  const { ran, status } = await mitigate(
    (cmd) => vulnerableHost(cmd, "root"),
    false,
  );
  assert(!ran.some((c) => c.includes("sudo")), ran.join("\n"));
  assertEquals(escalated(ran).length, 5);
  assertStringIncludes(status.summary, "Mitigations applied");
});

Deno.test("buildMitigationCommands: rmmod only modules /proc/modules lists", () => {
  const unload = buildMitigationCommands(false).filter((c) =>
    c.step === "unload"
  );
  assertEquals(unload.map((c) => c.command), [
    "! grep -q '^esp4 ' /proc/modules || LC_ALL=C sudo -n -- rmmod esp4",
    "! grep -q '^esp6 ' /proc/modules || LC_ALL=C sudo -n -- rmmod esp6",
    "! grep -q '^rxrpc ' /proc/modules || LC_ALL=C sudo -n -- rmmod rxrpc",
  ]);
});

function assertLogsSaved(handles: Handle[], expectedLogs: string[]) {
  const files = handles.filter((h) => h.kind === "file").map((h) => h.name);
  const resources = handles.filter((h) => h.kind === "resource").map((h) =>
    h.name
  );
  assertEquals(files.sort(), expectedLogs.sort());
  for (const name of files) {
    assert(!resources.includes(name), `${name} collides with a status`);
  }
}

Deno.test("scan, scanFleet and mitigate return their log files as -log data", async () => {
  const reply = (cmd: string) => vulnerableHost(cmd, "root");

  const scan = fakeContext();
  const scanResult = await withCommands(
    reply,
    () => model.methods.scan.execute({}, scan.context),
  );
  assertLogsSaved(scanResult.dataHandles as Handle[], ["localhost-log"]);

  const fleet = fakeContext();
  const fleetResult = await withCommands(
    reply,
    () =>
      model.methods.scanFleet.execute({ hosts: "localhost" }, fleet.context),
  );
  assertLogsSaved(fleetResult.dataHandles as Handle[], [
    "localhost-log",
    "fleet-log",
  ]);

  const { handles } = await mitigate(reply, false);
  assertLogsSaved(handles, ["localhost-log"]);
});

Deno.test("scanFleet keeps the log of a host that cannot be scanned", async () => {
  const fleet = fakeContext();
  const result = await withCommands(
    (cmd) => cmd === "uname -r" ? { code: 255, stderr: "boom" } : undefined,
    () =>
      model.methods.scanFleet.execute({ hosts: "localhost" }, fleet.context),
  );
  assertLogsSaved(result.dataHandles as Handle[], [
    "localhost-log",
    "fleet-log",
  ]);
});

Deno.test("mitigate: sudoers scoped to tee and rmmod is enough", async () => {
  // Such a rule refuses `sudo -n true`, so mitigate must never depend on it.
  const { ran, status } = await mitigate(
    (cmd) =>
      cmd.includes("sudo -n true")
        ? { code: 1, stderr: "sudo: a password is required" }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assert(!ran.some((c) => c.includes("sudo -n true")), ran.join("\n"));
  assertStringIncludes(status.summary, "Mitigations applied");
});

Deno.test("mitigate: sudo refusing rmmod gets the privilege recommendation", async () => {
  const { status } = await mitigate(
    (cmd) =>
      cmd.includes("rmmod esp4")
        ? {
          code: 1,
          stderr:
            "Sorry, user ubuntu is not allowed to execute '/usr/sbin/rmmod esp4' as root.",
        }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assertStringIncludes(status.summary, "Mitigation failed on localhost");
  assertStringIncludes(status.recommendations[0], "passwordless sudo");
});

Deno.test("mitigate: a failing whoami is reported as itself, not as sudo", async () => {
  const { ran, status } = await mitigate(
    (cmd) =>
      cmd === "whoami"
        ? { code: 255, stderr: "Connection reset" }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assertEquals(escalated(ran), []);
  assertStringIncludes(status.summary, "Cannot run whoami on localhost");
  assertStringIncludes(status.summary, "Connection reset");
});

Deno.test("mitigate: a log that cannot be saved does not fail the host", async () => {
  const { status, handles } = await mitigate(
    (cmd) => vulnerableHost(cmd, "ubuntu"),
    false,
    true,
  );
  assertStringIncludes(status.summary, "Mitigations applied");
  assertEquals(handles.filter((h) => h.kind === "file"), []);
});

Deno.test("mitigate: missing sudo is reported as missing, not as a password", async () => {
  const { ran, status } = await mitigate(
    (cmd) =>
      cmd === PRIVILEGE_CHECK
        ? { code: 127, stderr: "sh: sudo: command not found" }
        : vulnerableHost(cmd, "ubuntu"),
    false,
  );
  assertEquals(escalated(ran), []);
  assertStringIncludes(status.summary, "sudo is not installed on localhost");
});

// --- status records the address each host was scanned at ---

const targetOf = (status: Status | undefined) =>
  (status as { targetHost?: string } | undefined)?.targetHost;

Deno.test("scan: a local scan records localhost as its target", async () => {
  const { context, statuses } = fakeContext();
  await withCommands(
    (cmd) => vulnerableHost(cmd, "root"),
    () => model.methods.scan.execute({}, context),
  );
  assertEquals(targetOf(statuses.get("localhost")), "localhost");
});

Deno.test("scan: a Docker scan records no target", async () => {
  const { context, statuses } = fakeContext();
  context.globalArgs.dockerContainer = "4f2a9c1b7d3e";
  await withCommands(
    (cmd) => vulnerableHost(cmd, "root"),
    () => model.methods.scan.execute({}, context),
  );
  const status = statuses.get("docker-4f2a9c1b7d3e");
  assert(status, "docker scan should write a status");
  assertEquals(targetOf(status), undefined);
});

Deno.test("scanFleet: each host records its own address, not its hostname", async () => {
  const { context, statuses } = fakeContext();
  await withCommands(
    (cmd) => vulnerableHost(cmd, "root"),
    () =>
      model.methods.scanFleet.execute({ hosts: "10.0.0.5,10.0.0.6" }, context),
  );
  assertEquals(targetOf(statuses.get("10.0.0.5")), "10.0.0.5");
  assertEquals(targetOf(statuses.get("10.0.0.6")), "10.0.0.6");
  assertEquals(
    (statuses.get("10.0.0.5") as unknown as { hostname: string }).hostname,
    "web-01",
  );
});

Deno.test("mitigate: status records the host it was given", async () => {
  const { status } = await mitigate(
    (cmd) => vulnerableHost(cmd, "root"),
    true,
  );
  assertEquals(targetOf(status), "localhost");
});
