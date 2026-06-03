// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./ssh.ts";
import {
  type CommandExecutor,
  type ExecRequest,
  resetCommandExecutor,
  setCommandExecutor,
} from "./_lib/runner.ts";
import {
  resetForwardSeams,
  setForwardSpawner,
  setProcessKiller,
} from "./_lib/forwarding.ts";
import type { CelEnvLike } from "./_lib/selectors.ts";
import type { FleetContext } from "./_lib/operations.ts";

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

// Same CEL environment the swamp host injects via ctx.createCelEnvironment(),
// sourced through the testing harness.
const makeEnv: () => CelEnvLike =
  createModelTestContext().context.createCelEnvironment;

interface Harness {
  ctx: FleetContext;
  resources: Map<string, Record<string, unknown>>;
  writes: {
    specName: string;
    name: string;
    data: Record<string, unknown>;
    tags?: Record<string, string>;
  }[];
  deletes: string[];
  logs: { level: string; message: string; args: unknown[] }[];
}

function makeHarness(
  globalArgs: Record<string, unknown>,
  methodName: string,
  seed: Record<string, Record<string, unknown>> = {},
): Harness {
  const resources = new Map<string, Record<string, unknown>>(
    Object.entries(seed),
  );
  const writes: Harness["writes"] = [];
  const deletes: string[] = [];
  const logs: Harness["logs"] = [];

  const log = (level: string) => (message: string, ...args: unknown[]) => {
    logs.push({ level, message, args });
  };

  const ctx: FleetContext = {
    signal: new AbortController().signal,
    globalArgs,
    modelType: "@swamp/ssh",
    modelId: "test-fleet-id",
    methodName,
    logger: {
      debug: log("debug"),
      info: log("info"),
      warn: log("warn"),
      error: log("error"),
    },
    writeResource: (specName, name, data, overrides) => {
      writes.push({ specName, name, data, tags: overrides?.tags });
      resources.set(name, data);
      return Promise.resolve({ name });
    },
    readResource: (name) => Promise.resolve(resources.get(name) ?? null),
    createCelEnvironment: makeEnv,
    dataRepository: {
      findAllForModel: () =>
        Promise.resolve([...resources.keys()].map((name) => ({ name }))),
      delete: (_t, _m, dataName) => {
        deletes.push(dataName);
        resources.delete(dataName);
        return Promise.resolve();
      },
    },
  };

  return { ctx, resources, writes, deletes, logs };
}

/** A command executor that records every request and returns success. */
function okExecutor(
  stdoutFor: (req: ExecRequest) => string = () => "",
): { executor: CommandExecutor; requests: ExecRequest[] } {
  const requests: ExecRequest[] = [];
  const executor: CommandExecutor = (req) => {
    requests.push(req);
    return Promise.resolve({
      code: 0,
      signal: null,
      stdout: stdoutFor(req),
      stderr: "",
    });
  };
  return { executor, requests };
}

const FLEET = {
  name: "awesome",
  transport: {
    kind: "ssh",
    user: "deploy",
    identityFile: "/key",
    controlMaster: { enabled: true, persistSec: 600 },
  },
  hosts: [
    {
      name: "web-1",
      address: "10.0.0.11",
      tags: ["web", "prod"],
      attrs: { region: "us-east-1" },
    },
    {
      name: "web-2",
      address: "10.0.0.12",
      tags: ["web", "staging"],
      attrs: { region: "us-east-1" },
    },
    {
      name: "edge-1",
      address: "edge-1",
      tags: ["edge", "prod"],
      attrs: { region: "eu-west-1" },
      transport: { kind: "tailscale", user: "deploy" },
    },
  ],
  // Point all binaries somewhere harmless; the executor is mocked anyway.
  sshBinary: "ssh",
  scpBinary: "scp",
  tailscaleBinary: "tailscale",
};

// ---------------------------------------------------------------------------
// Model shape
// ---------------------------------------------------------------------------

Deno.test("model: declares expected type, methods, resources, checks", () => {
  assertEquals(model.type, "@swamp/ssh");
  for (
    const m of [
      "apply",
      "open",
      "check",
      "close",
      "exec",
      "script",
      "copy",
      "forward",
    ]
  ) {
    assert(m in model.methods, `missing method ${m}`);
  }
  for (const r of ["host", "runResult", "forwardState", "masterAudit"]) {
    assert(r in model.resources, `missing resource ${r}`);
  }
  for (const c of ["master-writable", "sshpass-available"]) {
    assert(c in model.checks, `missing check ${c}`);
  }
  // These were removed: their validation needs method args, which swamp
  // does not pass to check contexts. The spec is validated by the schema;
  // selector syntax / empty-selection are validated inside execute.
  for (const c of ["select-syntax", "fleet-non-empty", "forward-spec-valid"]) {
    assert(!(c in model.checks), `check ${c} should have been removed`);
  }
});

// ---------------------------------------------------------------------------
// exec
// ---------------------------------------------------------------------------

Deno.test("exec: writes one run-exec-<host> per matched prod host", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor } = okExecutor(() => "load 0.1\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: '"prod" in host.tags',
      command: "uptime",
    });
    const out = await model.methods.exec.execute(args, h.ctx);
    assertEquals(out.dataHandles.length, 2); // web-1, edge-1
    const names = h.writes.filter((w) => w.specName === "runResult").map((w) =>
      w.name
    );
    assertEquals(names.sort(), ["run-exec-edge-1", "run-exec-web-1"]);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: captured stdout lands in the resource", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor } = okExecutor(() => "hello\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "echo hello",
    });
    await model.methods.exec.execute(args, h.ctx);
    const rec = h.resources.get("run-exec-web-1");
    assertEquals(rec?.stdout, "hello\n");
    assertEquals(rec?.exitCode, 0);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: sudo prefixes sudo -n -- in the remote command", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "systemctl reload nginx",
      sudo: true,
    });
    await model.methods.exec.execute(args, h.ctx);
    const last = requests[0].args.at(-1);
    assertEquals(last, "sudo -n -- systemctl reload nginx");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: captureOutput=false omits stdout in the resource", async () => {
  const h = makeHarness({ ...FLEET, captureOutput: false }, "exec");
  const { executor } = okExecutor(() => "ignored");
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "uptime",
    });
    await model.methods.exec.execute(args, h.ctx);
    const rec = h.resources.get("run-exec-web-1");
    assertEquals(rec?.stdout, undefined);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: tailscale host produces tailscale argv (no ControlPath)", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["edge-1"],
      command: "uptime",
    });
    await model.methods.exec.execute(args, h.ctx);
    assertEquals(requests[0].command, "tailscale");
    assert(!requests[0].args.some((a) => a.startsWith("ControlPath=")));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: password auth puts SSHPASS in env, not argv", async () => {
  const pwFleet = {
    ...FLEET,
    transport: {
      kind: "ssh",
      user: "deploy",
      auth: { kind: "password", password: "hunter2" },
      controlMaster: { enabled: false, persistSec: 600 },
    },
    hosts: [{ name: "web-1", address: "10.0.0.11", tags: ["prod"] }],
  };
  const h = makeHarness(pwFleet, "exec");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: "all",
      command: "uptime",
    });
    await model.methods.exec.execute(args, h.ctx);
    assertEquals(requests[0].command, "sshpass");
    assertEquals(requests[0].env.SSHPASS, "hunter2");
    assert(!requests[0].args.some((a) => a.includes("hunter2")));
    // The recorded resource argv must not leak the password either.
    const rec = h.resources.get("run-exec-web-1");
    const argv = rec?.argv as string[];
    assert(!argv.some((a) => a.includes("hunter2")));
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// identityContent (temp-key materialization across methods)
// ---------------------------------------------------------------------------

const PEM_CONTENT =
  "-----BEGIN OPENSSH PRIVATE KEY-----\nfakekey\n-----END OPENSSH PRIVATE KEY-----\n";

const FLEET_WITH_IDENTITY_CONTENT = {
  ...FLEET,
  transport: {
    kind: "ssh",
    user: "deploy",
    identityContent: PEM_CONTENT,
    controlMaster: { enabled: true, persistSec: 600 },
  },
};

/** Extract the -i flag value from a captured ExecRequest. */
function extractIdentityPath(req: ExecRequest): string | undefined {
  const argv = [req.command, ...req.args];
  const iIdx = argv.indexOf("-i");
  return iIdx !== -1 ? argv[iIdx + 1] : undefined;
}

/** Assert a temp path no longer exists on disk. */
async function assertFileRemoved(path: string, label: string): Promise<void> {
  let exists = true;
  try {
    await Deno.stat(path);
  } catch {
    exists = false;
  }
  assert(!exists, `${label}: temp key file should be removed`);
}

Deno.test({
  name:
    "exec: identityContent materializes to temp file with correct content and passes -i",
  fn: async () => {
    const h = makeHarness(FLEET_WITH_IDENTITY_CONTENT, "exec");
    let tempFileContent: string | undefined;
    const requests: ExecRequest[] = [];
    setCommandExecutor((req) => {
      requests.push(req);
      const tmpPath = extractIdentityPath(req);
      if (tmpPath) {
        tempFileContent = Deno.readTextFileSync(tmpPath);
      }
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.exec.arguments.parse({
        hosts: ["web-1"],
        command: "uptime",
      });
      await model.methods.exec.execute(args, h.ctx);

      assertEquals(requests.length, 1);
      const tmpPath = extractIdentityPath(requests[0]);
      assert(tmpPath !== undefined, "expected -i flag in argv");
      assert(tmpPath!.includes("swamp-ssh-key-"), "temp path has prefix");
      assertEquals(tempFileContent, PEM_CONTENT, "temp file has PEM content");
      await assertFileRemoved(tmpPath!, "exec");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name: "exec: identityContent temp file cleaned up even on host failure",
  fn: async () => {
    const h = makeHarness(FLEET_WITH_IDENTITY_CONTENT, "exec");
    let capturedTmpPath: string | undefined;
    setCommandExecutor((req) => {
      capturedTmpPath = extractIdentityPath(req);
      return Promise.resolve({
        code: 1,
        signal: null,
        stdout: "",
        stderr: "fail",
      });
    });
    try {
      const args = model.methods.exec.arguments.parse({
        hosts: ["web-1"],
        command: "false",
      });
      try {
        await model.methods.exec.execute(args, h.ctx);
        assert(false, "should have thrown");
      } catch {
        // Expected — throwOnHostFailures fires.
      }
      assert(capturedTmpPath !== undefined, "should have captured -i path");
      await assertFileRemoved(capturedTmpPath!, "exec failure");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name: "script: identityContent materializes and cleans up",
  fn: async () => {
    const h = makeHarness(FLEET_WITH_IDENTITY_CONTENT, "script");
    let capturedTmpPath: string | undefined;
    let tempFileContent: string | undefined;
    setCommandExecutor((req) => {
      const p = extractIdentityPath(req);
      if (p) {
        capturedTmpPath = p;
        tempFileContent = Deno.readTextFileSync(p);
      }
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.script.arguments.parse({
        hosts: ["web-1"],
        script: "echo hi",
      });
      await model.methods.script.execute(args, h.ctx);

      assert(capturedTmpPath !== undefined, "expected -i flag");
      assertEquals(tempFileContent, PEM_CONTENT, "temp file has PEM content");
      await assertFileRemoved(capturedTmpPath!, "script");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name: "copy: identityContent materializes and cleans up",
  fn: async () => {
    const h = makeHarness(FLEET_WITH_IDENTITY_CONTENT, "copy");
    let capturedTmpPath: string | undefined;
    let tempFileContent: string | undefined;
    setCommandExecutor((req) => {
      const argv = [req.command, ...req.args];
      const iIdx = argv.indexOf("-i");
      if (iIdx !== -1) {
        capturedTmpPath = argv[iIdx + 1];
        tempFileContent = Deno.readTextFileSync(capturedTmpPath);
      }
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.copy.arguments.parse({
        hosts: ["web-1"],
        src: "./local",
        dst: "/remote",
        direction: "to",
      });
      await model.methods.copy.execute(args, h.ctx);

      assert(capturedTmpPath !== undefined, "expected -i flag");
      assertEquals(tempFileContent, PEM_CONTENT, "temp file has PEM content");
      await assertFileRemoved(capturedTmpPath!, "copy");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name: "open: identityContent materializes and passes -i to master argv",
  fn: async () => {
    const h = makeHarness(FLEET_WITH_IDENTITY_CONTENT, "open");
    let capturedTmpPath: string | undefined;
    let tempFileContent: string | undefined;
    setCommandExecutor((req) => {
      const argv = [req.command, ...req.args];
      const iIdx = argv.indexOf("-i");
      if (iIdx !== -1) {
        capturedTmpPath = argv[iIdx + 1];
        tempFileContent = Deno.readTextFileSync(capturedTmpPath);
      }
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.open.arguments.parse({ hosts: ["web-1"] });
      await model.methods.open.execute(args, h.ctx);

      assert(capturedTmpPath !== undefined, "expected -i flag in open argv");
      assertEquals(tempFileContent, PEM_CONTENT, "temp file has PEM content");
      await assertFileRemoved(capturedTmpPath!, "open");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name:
    "exec: mixed fleet — identityContent host gets temp -i, identityFile host keeps its path",
  fn: async () => {
    const mixedFleet = {
      ...FLEET,
      transport: {
        kind: "ssh",
        user: "deploy",
        identityFile: "/original/key",
        controlMaster: { enabled: true, persistSec: 600 },
      },
      hosts: [
        {
          name: "web-1",
          address: "10.0.0.11",
          tags: ["web"],
          attrs: {},
          transport: { identityContent: PEM_CONTENT, identityFile: undefined },
        },
        {
          name: "web-2",
          address: "10.0.0.12",
          tags: ["web"],
          attrs: {},
        },
      ],
    };
    const h = makeHarness(mixedFleet, "exec");
    const requests: ExecRequest[] = [];
    setCommandExecutor((req) => {
      requests.push(req);
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.exec.arguments.parse({
        hosts: "all",
        command: "uptime",
      });
      await model.methods.exec.execute(args, h.ctx);

      assertEquals(requests.length, 2);

      // web-1 should use a temp key (identityContent)
      const web1Path = extractIdentityPath(requests[0]);
      assert(web1Path !== undefined, "web-1 should have -i");
      assert(
        web1Path!.includes("swamp-ssh-key-"),
        "web-1 should use temp key path",
      );
      await assertFileRemoved(web1Path!, "web-1 temp");

      // web-2 should use the fleet default identityFile
      const web2Path = extractIdentityPath(requests[1]);
      assert(web2Path !== undefined, "web-2 should have -i");
      assertEquals(web2Path, "/original/key", "web-2 keeps fleet identityFile");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name: "exec: host override identityContent over fleet identityFile",
  fn: async () => {
    const fleetWithOverride = {
      ...FLEET,
      transport: {
        kind: "ssh",
        user: "deploy",
        identityFile: "/fleet/key",
        controlMaster: { enabled: true, persistSec: 600 },
      },
      hosts: [
        {
          name: "web-1",
          address: "10.0.0.11",
          tags: [],
          attrs: {},
          transport: { identityContent: PEM_CONTENT, identityFile: undefined },
        },
      ],
    };
    const h = makeHarness(fleetWithOverride, "exec");
    let tempFileContent: string | undefined;
    let capturedPath: string | undefined;
    setCommandExecutor((req) => {
      capturedPath = extractIdentityPath(req);
      if (capturedPath) {
        tempFileContent = Deno.readTextFileSync(capturedPath);
      }
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.exec.arguments.parse({
        hosts: ["web-1"],
        command: "uptime",
      });
      await model.methods.exec.execute(args, h.ctx);

      assert(capturedPath !== undefined, "expected -i flag");
      assert(
        capturedPath!.includes("swamp-ssh-key-"),
        "should use temp path, not fleet /fleet/key",
      );
      assertEquals(tempFileContent, PEM_CONTENT, "temp file has PEM content");
      await assertFileRemoved(capturedPath!, "override");
    } finally {
      resetCommandExecutor();
    }
  },
  // Deno.makeTempFile's internal handle may outlive the test callback.
  sanitizeResources: false,
});

Deno.test({
  name: "exec: identityContent without trailing newline gets one appended",
  fn: async () => {
    const pemNoNewline =
      "-----BEGIN OPENSSH PRIVATE KEY-----\nfakekey\n-----END OPENSSH PRIVATE KEY-----";
    const fleetNoNewline = {
      ...FLEET,
      transport: {
        kind: "ssh",
        user: "deploy",
        identityContent: pemNoNewline,
        controlMaster: { enabled: true, persistSec: 600 },
      },
    };
    const h = makeHarness(fleetNoNewline, "exec");
    let tempFileContent: string | undefined;
    setCommandExecutor((req) => {
      const p = extractIdentityPath(req);
      if (p) tempFileContent = Deno.readTextFileSync(p);
      return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
    });
    try {
      const args = model.methods.exec.arguments.parse({
        hosts: ["web-1"],
        command: "uptime",
      });
      await model.methods.exec.execute(args, h.ctx);
      assertEquals(
        tempFileContent,
        pemNoNewline + "\n",
        "trailing newline appended for OpenSSH compatibility",
      );
    } finally {
      resetCommandExecutor();
    }
  },
  sanitizeResources: false,
});

// ---------------------------------------------------------------------------
// script
// ---------------------------------------------------------------------------

Deno.test("script: pipes the body via stdin to sh -s --", async () => {
  const h = makeHarness(FLEET, "script");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.script.arguments.parse({
      hosts: ["web-1"],
      script: "set -e\necho hi\n",
    });
    await model.methods.script.execute(args, h.ctx);
    assertEquals(requests[0].stdin, "set -e\necho hi\n");
    assertEquals(requests[0].args.at(-1), "sh -s --");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("script: bash interpreter + sudo", async () => {
  const h = makeHarness(FLEET, "script");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.script.arguments.parse({
      hosts: ["web-1"],
      script: "echo hi",
      interpreter: "bash",
      sudo: true,
    });
    await model.methods.script.execute(args, h.ctx);
    assertEquals(requests[0].args.at(-1), "sudo -n -- bash -s --");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// copy
// ---------------------------------------------------------------------------

Deno.test("copy: scp to all web hosts", async () => {
  const h = makeHarness(FLEET, "copy");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.copy.arguments.parse({
      hosts: '"web" in host.tags',
      src: "./nginx.conf",
      dst: "/etc/nginx/nginx.conf",
      direction: "to",
    });
    const out = await model.methods.copy.execute(args, h.ctx);
    assertEquals(out.dataHandles.length, 2);
    assertEquals(requests[0].command, "scp");
    assert(
      requests.some((r) =>
        r.args.at(-1) === "deploy@10.0.0.11:/etc/nginx/nginx.conf"
      ),
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy: tailscale host uses ProxyCommand nc", async () => {
  const h = makeHarness(FLEET, "copy");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.copy.arguments.parse({
      hosts: ["edge-1"],
      src: "./f",
      dst: "/f",
      direction: "to",
    });
    await model.methods.copy.execute(args, h.ctx);
    assert(requests[0].args.includes("ProxyCommand=tailscale nc %h %p"));
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// apply
// ---------------------------------------------------------------------------

Deno.test("apply: writes one host-* per fleet member", async () => {
  const h = makeHarness(FLEET, "apply");
  const out = await model.methods.apply.execute({}, h.ctx);
  assertEquals(out.dataHandles.length, 3);
  assert(h.resources.has("host-web-1"));
  assert(h.resources.has("host-web-2"));
  assert(h.resources.has("host-edge-1"));
  const webRec = h.resources.get("host-web-1");
  assertEquals(webRec?.fleet, "awesome");
  assertEquals(webRec?.transport, "ssh");
  const edgeRec = h.resources.get("host-edge-1");
  assertEquals(edgeRec?.transport, "tailscale");
  // host resources carry a fleet tag for data.findByTag().
  const webWrite = h.writes.find((w) => w.name === "host-web-1");
  assertEquals(webWrite?.tags, { fleet: "awesome" });
});

Deno.test("apply: prunes stale host-* resources", async () => {
  // Seed a host that is no longer in the fleet.
  const h = makeHarness(FLEET, "apply", {
    "host-ghost": { name: "ghost", fleet: "awesome" },
    "run-exec-web-1": { method: "exec" }, // non-host resource must survive
  });
  await model.methods.apply.execute({}, h.ctx);
  assert(h.deletes.includes("host-ghost"), "stale host should be deleted");
  assert(!h.resources.has("host-ghost"));
  // Non-host resources are untouched.
  assert(h.resources.has("run-exec-web-1"));
});

// ---------------------------------------------------------------------------
// open / check / close
// ---------------------------------------------------------------------------

Deno.test("open: ssh hosts get a master audit, tailscale is no-op-ok", async () => {
  const h = makeHarness(FLEET, "open");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.open.arguments.parse({ hosts: "all" });
    await model.methods.open.execute(args, h.ctx);
    // 2 ssh hosts spawn a master; edge-1 doesn't.
    assertEquals(requests.length, 2);
    assert(requests.every((r) => r.args.includes("-fN")));
    const edge = h.resources.get("masterAudit-edge-1");
    assertEquals(edge?.event, "open");
    assertEquals(edge?.outcome, "ok");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("check: ssh -O check exit 0 → ok; tailscale runs `true`", async () => {
  const h = makeHarness(FLEET, "check");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.check.arguments.parse({ hosts: "all" });
    await model.methods.check.execute(args, h.ctx);
    assertEquals(requests.length, 3);
    const sshCheck = requests.find((r) => r.args.includes("check"));
    assert(sshCheck, "expected an ssh -O check call");
    const tsProbe = requests.find((r) =>
      r.command === "tailscale" && r.args.at(-1) === "true"
    );
    assert(tsProbe, "expected a tailscale `true` probe");
    assertEquals(h.resources.get("masterAudit-web-1")?.outcome, "ok");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("close: ssh -O exit per ssh host", async () => {
  const h = makeHarness(FLEET, "close");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.close.arguments.parse({ hosts: "all" });
    await model.methods.close.execute(args, h.ctx);
    assertEquals(requests.length, 2); // only ssh hosts
    assert(requests.every((r) => r.args.includes("exit")));
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// forward
// ---------------------------------------------------------------------------

Deno.test("forward open: ssh issues -O forward and records ControlPath", async () => {
  const h = makeHarness(FLEET, "forward");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.forward.arguments.parse({
      hosts: ["web-1"],
      action: "open",
      spec: "9090:localhost:9090",
    });
    await model.methods.forward.execute(args, h.ctx);
    assert(requests[0].args.includes("forward"));
    assert(requests[0].args.includes("-L"));
    const state = h.resources.get(
      "forwardState-web-1-L-9090_localhost_9090",
    );
    assertEquals(state?.transport, "ssh");
    assert(typeof state?.controlPath === "string");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("forward open: tailscale spawns detached child, records pid", async () => {
  const h = makeHarness(FLEET, "forward");
  setForwardSpawner(() => ({ pid: 9999 }));
  try {
    const args = model.methods.forward.arguments.parse({
      hosts: ["edge-1"],
      action: "open",
      spec: "9090:localhost:9090",
    });
    await model.methods.forward.execute(args, h.ctx);
    const state = h.resources.get(
      "forwardState-edge-1-L-9090_localhost_9090",
    );
    assertEquals(state?.transport, "tailscale");
    assertEquals(state?.pid, 9999);
  } finally {
    resetForwardSeams();
  }
});

Deno.test("forward cancel: tailscale kills the tracked pid", async () => {
  const seedName = "forwardState-edge-1-L-9090_localhost_9090";
  const h = makeHarness(FLEET, "forward", {
    [seedName]: {
      host: "edge-1",
      transport: "tailscale",
      type: "L",
      spec: "9090:localhost:9090",
      pid: 9999,
      openedAt: "2026-05-19T00:00:00.000Z",
    },
  });
  const killed: number[] = [];
  setProcessKiller((pid) => killed.push(pid));
  try {
    const args = model.methods.forward.arguments.parse({
      hosts: ["edge-1"],
      action: "cancel",
      spec: "9090:localhost:9090",
    });
    await model.methods.forward.execute(args, h.ctx);
    assertEquals(killed, [9999]);
    const state = h.resources.get(seedName);
    assert(typeof state?.closedAt === "string");
  } finally {
    resetForwardSeams();
  }
});

Deno.test("forward list: echoes a recorded forwardState", async () => {
  const seedName = "forwardState-web-1-L-9090_localhost_9090";
  const h = makeHarness(FLEET, "forward", {
    [seedName]: {
      host: "web-1",
      transport: "ssh",
      type: "L",
      spec: "9090:localhost:9090",
      controlPath: "/x.sock",
      openedAt: "2026-05-19T00:00:00.000Z",
    },
  });
  const args = model.methods.forward.arguments.parse({
    hosts: ["web-1"],
    action: "list",
    spec: "9090:localhost:9090",
  });
  const out = await model.methods.forward.execute(args, h.ctx);
  assertEquals(out.dataHandles.length, 1);
});

Deno.test("forward list: enumerates all forwards for a host without a spec", async () => {
  const h = makeHarness(FLEET, "forward", {
    "forwardState-web-1-L-9090_localhost_9090": {
      host: "web-1",
      transport: "ssh",
      type: "L",
      spec: "9090:localhost:9090",
      openedAt: "2026-05-19T00:00:00.000Z",
    },
    "forwardState-web-1-L-8080_localhost_8080": {
      host: "web-1",
      transport: "ssh",
      type: "L",
      spec: "8080:localhost:8080",
      openedAt: "2026-05-19T00:00:00.000Z",
    },
    // A different host's forward must NOT be returned.
    "forwardState-web-2-L-7000_localhost_7000": {
      host: "web-2",
      transport: "ssh",
      type: "L",
      spec: "7000:localhost:7000",
      openedAt: "2026-05-19T00:00:00.000Z",
    },
  });
  const args = model.methods.forward.arguments.parse({
    hosts: ["web-1"],
    action: "list",
  });
  const out = await model.methods.forward.execute(args, h.ctx);
  assertEquals(out.dataHandles.length, 2);
});

// ---------------------------------------------------------------------------
// checks
// ---------------------------------------------------------------------------

// Checks now receive only { globalArgs } — swamp does not pass method args
// to a check context (the bug that broke forward-spec-valid).
function checkCtx(globalArgs: Record<string, unknown> = FLEET) {
  return { globalArgs };
}

Deno.test("check master-writable: passes for a fresh temp dir", async () => {
  const tmp = await Deno.makeTempDir();
  const prev = Deno.env.get("XDG_RUNTIME_DIR");
  Deno.env.set("XDG_RUNTIME_DIR", tmp);
  try {
    const r = await model.checks["master-writable"].execute(checkCtx());
    assertEquals(r.pass, true);
  } finally {
    if (prev !== undefined) Deno.env.set("XDG_RUNTIME_DIR", prev);
    else Deno.env.delete("XDG_RUNTIME_DIR");
    await Deno.remove(tmp, { recursive: true });
  }
});

Deno.test("check sshpass-available: fails when a fleet host needs password auth + missing binary", async () => {
  const pwFleet = {
    ...FLEET,
    transport: {
      kind: "ssh",
      user: "deploy",
      auth: { kind: "password", password: "x" },
      controlMaster: { enabled: false, persistSec: 600 },
    },
    hosts: [{ name: "web-1", address: "10.0.0.11", tags: ["prod"] }],
    sshpassBinary: "definitely-not-on-path-xyz",
  };
  const r = await model.checks["sshpass-available"].execute(
    checkCtx(pwFleet),
    () => Promise.resolve(false),
  );
  assertEquals(r.pass, false);
  assert(r.errors && r.errors[0].includes("password auth"));
});

Deno.test("check sshpass-available: passes for key auth", async () => {
  const r = await model.checks["sshpass-available"].execute(
    checkCtx(),
    () => Promise.resolve(false), // probe says missing, but no host needs it
  );
  assertEquals(r.pass, true);
});

// ---------------------------------------------------------------------------
// execute-time selector validation (was previously checks, now in execute)
// ---------------------------------------------------------------------------

Deno.test("exec: malformed selector throws a clear error from execute", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: "size(host.tags",
      command: "uptime",
    });
    let msg = "";
    try {
      await model.methods.exec.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("Invalid selector expression"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: selector matching no hosts throws from execute", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: '"nonexistent" in host.tags',
      command: "uptime",
    });
    let msg = "";
    try {
      await model.methods.exec.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("matched no hosts"), msg);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// non-zero exit propagation (#510)
// ---------------------------------------------------------------------------

/** Executor that returns a fixed non-zero exit code for every host. */
function failExecutor(
  code: number,
  stderr = "",
): { executor: CommandExecutor; requests: ExecRequest[] } {
  const requests: ExecRequest[] = [];
  const executor: CommandExecutor = (req) => {
    requests.push(req);
    return Promise.resolve({
      code,
      signal: null,
      stdout: "",
      stderr,
    });
  };
  return { executor, requests };
}

Deno.test("exec: non-zero exit throws and names the failed host", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor } = failExecutor(255, "Connection closed\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "uptime",
    });
    let msg = "";
    try {
      await model.methods.exec.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("exec failed"), msg);
    assert(msg.includes("web-1"), msg);
    assert(msg.includes("exit 255"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: resources are written before the throw", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor } = failExecutor(1);
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "false",
    });
    try {
      await model.methods.exec.execute(args, h.ctx);
    } catch {
      // expected
    }
    assert(
      h.resources.has("run-exec-web-1"),
      "resource should be written before throw",
    );
    assertEquals(h.resources.get("run-exec-web-1")?.exitCode, 1);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("script: non-zero exit throws", async () => {
  const h = makeHarness(FLEET, "script");
  const { executor } = failExecutor(2);
  setCommandExecutor(executor);
  try {
    const args = model.methods.script.arguments.parse({
      hosts: ["web-1"],
      script: "exit 2",
    });
    let msg = "";
    try {
      await model.methods.script.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("script failed"), msg);
    assert(msg.includes("web-1"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy: non-zero exit throws", async () => {
  const h = makeHarness(FLEET, "copy");
  const { executor } = failExecutor(255, "scp: Connection closed\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods.copy.arguments.parse({
      hosts: ["web-1"],
      src: "./f",
      dst: "/f",
      direction: "to",
    });
    let msg = "";
    try {
      await model.methods.copy.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("copy failed"), msg);
    assert(msg.includes("web-1"), msg);
    assert(msg.includes("exit 255"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: fail-fast skipped hosts do not count as failures", async () => {
  let callCount = 0;
  const executor: CommandExecutor = () => {
    callCount++;
    if (callCount === 1) {
      return Promise.resolve({
        code: 1,
        signal: null,
        stdout: "",
        stderr: "boom",
      });
    }
    return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
  };
  const h = makeHarness({ ...FLEET, failFast: true }, "exec");
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: "all",
      command: "uptime",
    });
    let msg = "";
    try {
      await model.methods.exec.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("exec failed"), msg);
    // The error should reference the genuinely failed host, not
    // every skipped host.
    assert(
      !msg.includes("skipped"),
      "fail-fast skipped hosts should not appear in the error",
    );
  } finally {
    resetCommandExecutor();
  }
});
