import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import { model } from "./dirtyfrag_detect.ts";

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
