// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
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
import { SelectionSchema } from "./_lib/schemas.ts";

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
      "resolve",
      "open",
      "check",
      "close",
      "exec",
      "script",
      "copy",
      "forward",
      "collect-host-public-key",
    ]
  ) {
    assert(m in model.methods, `missing method ${m}`);
  }
  for (
    const r of [
      "host",
      "runResult",
      "forwardState",
      "masterAudit",
      "hostPublicKey",
      "selection",
    ]
  ) {
    assert(r in model.resources, `missing resource ${r}`);
  }
  for (const c of ["master-writable", "sshpass-available"]) {
    assert(c in model.checks, `missing check ${c}`);
  }
  // `resolve` never spawns ssh, so the fleet-wide sshpass pre-flight check
  // must not gate it.
  assert(
    !model.checks["sshpass-available"].appliesTo.includes("resolve"),
    "resolve must not be gated by the sshpass-available check",
  );
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

Deno.test("exec: sudo wraps a chained command in sh -c (#2336)", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "systemctl status foo.service; cat /var/run/foo.pid",
      sudo: true,
    });
    await model.methods.exec.execute(args, h.ctx);
    const last = requests[0].args.at(-1);
    assertEquals(
      last,
      "sudo -n -- sh -c 'systemctl status foo.service; cat /var/run/foo.pid'",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec: sudo re-exports forwarded env into the wrapped shell", async () => {
  const h = makeHarness(FLEET, "exec");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: ["web-1"],
      command: "rm -rf /var/lib/$APP/cache",
      env: { APP: "myapp" },
      sudo: true,
    });
    await model.methods.exec.execute(args, h.ctx);
    const argv = requests[0].args;
    assert(argv.includes("SendEnv=APP"));
    assertEquals(
      argv.at(-1),
      `sudo -n -- env "APP=$APP" sh -c 'rm -rf /var/lib/$APP/cache'`,
    );
    assertEquals(requests[0].env.APP, "myapp");
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
// resolve
// ---------------------------------------------------------------------------

/**
 * Fleet exercising every resolve edge at once: a host NAMED "prod" while two
 * other hosts carry the "prod" TAG (bare-string precedence), credential
 * material in three forms (password, identityContent, fleet identityFile)
 * that must never reach a selection record, and a tailscale host (no port).
 */
const RESOLVE_FLEET = {
  name: "resolve-fleet",
  transport: {
    kind: "ssh",
    user: "deploy",
    identityFile: "/secret/fleet-key",
  },
  hosts: [
    {
      name: "web-1",
      address: "10.0.0.11",
      tags: ["web", "prod"],
      attrs: { region: "us-east-1" },
      transport: { auth: { kind: "password", password: "hunter2" } },
    },
    {
      name: "web-2",
      address: "10.0.0.12",
      tags: ["web", "staging"],
      attrs: { region: "us-east-1" },
      transport: {
        identityContent: "-----BEGIN OPENSSH PRIVATE KEY-----\nsecretbytes\n",
      },
    },
    {
      name: "prod", // collides with the "prod" tag on web-1/edge-1
      address: "10.0.0.13",
      tags: ["db"],
      attrs: { region: "eu-west-1" },
    },
    {
      name: "edge-1",
      address: "edge-1",
      tags: ["edge", "prod"],
      attrs: { region: "eu-west-1" },
      transport: { kind: "tailscale", user: "deploy" },
    },
  ],
};

/** Run resolve through the model surface and return the selection write. */
async function runResolveOn(
  h: Harness,
  hosts: unknown,
): Promise<
  { name: string; data: Record<string, unknown>; tags?: Record<string, string> }
> {
  const args = model.methods.resolve.arguments.parse({ hosts });
  const out = await model.methods.resolve.execute(args, h.ctx);
  assertEquals(out.dataHandles.length, 1);
  const write = h.writes.filter((w) => w.specName === "selection").at(-1);
  assert(write, "expected a selection write");
  return write;
}

function selectionNames(write: { data: Record<string, unknown> }): string[] {
  return (write.data.hosts as { name: string }[]).map((x) => x.name);
}

Deno.test("resolve: 'all' matches every host, spawns nothing, validates", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const write = await runResolveOn(h, "all");
    assertEquals(requests.length, 0, "resolve must never spawn a process");
    // The written record round-trips through the declared resource schema.
    const parsed = SelectionSchema.parse(write.data);
    assertEquals(parsed.fleet, "resolve-fleet");
    assertEquals(parsed.selector, "all");
    assertEquals(parsed.count, 4);
    assertEquals(
      parsed.hosts.map((x) => x.name),
      ["web-1", "web-2", "prod", "edge-1"],
    );
    // ssh host: full addressing; tailscale host: no port.
    const web = parsed.hosts.find((x) => x.name === "web-1");
    assertEquals(web?.port, 22);
    assertEquals(web?.user, "deploy");
    assertEquals(web?.transport, "ssh");
    assertEquals(web?.tags, ["web", "prod"]);
    assertEquals(web?.attrs, { region: "us-east-1" });
    const edge = parsed.hosts.find((x) => x.name === "edge-1");
    assertEquals(edge?.port, undefined);
    assertEquals(edge?.transport, "tailscale");
    // Write tags mirror the runResult convention; count is the gate value.
    assertEquals(write.tags, {
      fleet: "resolve-fleet",
      method: "resolve",
      count: "4",
    });
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("resolve: explicit name array records a JSON selector", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(h, ["web-1", "web-2"]);
  assertEquals(write.data.count, 2);
  assertEquals(selectionNames(write), ["web-1", "web-2"]);
  assertEquals(write.data.selector, '["web-1","web-2"]');
});

Deno.test("resolve: bare string prefers exact host name over tag", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(h, "prod");
  // The host NAMED "prod" wins over the two hosts TAGGED "prod".
  assertEquals(selectionNames(write), ["prod"]);
});

Deno.test("resolve: bare string falls back to tag when no name matches", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(h, "web");
  assertEquals(selectionNames(write), ["web-1", "web-2"]);
});

Deno.test("resolve: name: prefix selects exactly one host", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(h, "name:web-2");
  assertEquals(selectionNames(write), ["web-2"]);
});

Deno.test("resolve: tag: prefix ignores the colliding host name", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(h, "tag:prod");
  assertEquals(selectionNames(write), ["web-1", "edge-1"]);
});

Deno.test("resolve: cel: predicate with attrs and matchesRegex", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(
    h,
    'cel:host.attrs.region == "us-east-1" && matchesRegex(host.name, "^web-")',
  );
  assertEquals(selectionNames(write), ["web-1", "web-2"]);
});

Deno.test("resolve: zero matches succeeds with empty hosts and count tag '0'", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const write = await runResolveOn(h, "tag:nope");
    const parsed = SelectionSchema.parse(write.data);
    assertEquals(parsed.count, 0);
    assertEquals(parsed.hosts, []);
    assertEquals(write.tags?.count, "0");
    assertEquals(requests.length, 0);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("resolve: malformed CEL still throws", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const args = model.methods.resolve.arguments.parse({
    hosts: "cel:size(host.tags",
  });
  let msg = "";
  try {
    await model.methods.resolve.execute(args, h.ctx);
  } catch (e) {
    msg = e instanceof Error ? e.message : String(e);
  }
  assert(msg.includes("Invalid selector expression"), msg);
  assertEquals(
    h.writes.filter((w) => w.specName === "selection").length,
    0,
    "an invalid selector must not write a selection",
  );
});

Deno.test("resolve: selection records carry no credential material", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const write = await runResolveOn(h, "all");
  const serialized = JSON.stringify(write.data);
  for (
    const leak of [
      "hunter2",
      "password",
      "auth",
      "identity",
      "PRIVATE KEY",
      "/secret/fleet-key",
      "proxy",
    ]
  ) {
    assert(
      !serialized.includes(leak),
      `selection record must not contain '${leak}'`,
    );
  }
});

Deno.test("resolve: same selector reuses one instance, different selectors do not", async () => {
  const h = makeHarness(RESOLVE_FLEET, "resolve");
  const first = await runResolveOn(h, "tag:prod");
  const again = await runResolveOn(h, "tag:prod");
  const other = await runResolveOn(h, "tag:staging");
  assert(
    /^resolve-[0-9a-f]{12}$/.test(first.name),
    `unexpected instance name: ${first.name}`,
  );
  assertEquals(first.name, again.name, "same selector must reuse the instance");
  assert(
    other.name !== first.name,
    "different selectors must get different instances",
  );
});

Deno.test("exec: empty selection still throws (regression for the resolve refactor)", async () => {
  // `resolve` treating zero matches as data must not leak into the
  // connecting methods — they share the selection funnel.
  const h = makeHarness(RESOLVE_FLEET, "exec");
  const { executor, requests } = okExecutor();
  setCommandExecutor(executor);
  try {
    const args = model.methods.exec.arguments.parse({
      hosts: "tag:nope",
      command: "uptime",
    });
    let msg = "";
    try {
      await model.methods.exec.execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("No host carrying tag 'nope'"), msg);
    assertEquals(requests.length, 0, "no process may spawn on empty selection");
    assertEquals(h.writes.length, 0, "no resource may be written");
  } finally {
    resetCommandExecutor();
  }
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

// ---------------------------------------------------------------------------
// collect-host-public-key
// ---------------------------------------------------------------------------

const ED25519_PUBKEY =
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl host@example";

Deno.test("collect-host-public-key: writes hostPublicKey resource with correct fields", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = okExecutor(() => ED25519_PUBKEY + "\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
    });
    const out = await model.methods["collect-host-public-key"].execute(
      args,
      h.ctx,
    );
    assert(out.dataHandles.length >= 2);
    const rec = h.resources.get("hostPublicKey-web-1");
    assert(rec !== undefined, "hostPublicKey resource should exist");
    assertEquals(rec.name, "web-1");
    assertEquals(rec.host, "10.0.0.11");
    assertEquals(rec.user, "deploy");
    assertEquals(rec.hostKeyPath, "/etc/ssh/ssh_host_ed25519_key.pub");
    assertEquals(rec.publicKey, ED25519_PUBKEY);
    assertEquals(rec.algorithm, "ssh-ed25519");
    assert(
      (rec.fingerprint as string).startsWith("SHA256:"),
      "fingerprint should start with SHA256:",
    );
    assert(typeof rec.observedAt === "string");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: custom hostKeyPath is used in the remote command", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor, requests } = okExecutor(() => ED25519_PUBKEY + "\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
      hostKeyPath: "/etc/ssh/ssh_host_rsa_key.pub",
    });
    await model.methods["collect-host-public-key"].execute(args, h.ctx);
    const remoteCmd = requests[0].args.at(-1) as string;
    assert(
      remoteCmd.includes("/etc/ssh/ssh_host_rsa_key.pub"),
      "remote command should reference the custom path",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: empty output throws clear error", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = okExecutor(() => "");
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
    });
    let msg = "";
    try {
      await model.methods["collect-host-public-key"].execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("empty or unreadable"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: multi-line output throws", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = okExecutor(
    () => "ssh-ed25519 AAAA... host1\nssh-rsa AAAA... host2\n",
  );
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
    });
    let msg = "";
    try {
      await model.methods["collect-host-public-key"].execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("single public key line"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: private key content is rejected", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = okExecutor(
    () =>
      "-----BEGIN OPENSSH PRIVATE KEY-----\nfake\n-----END OPENSSH PRIVATE KEY-----\n",
  );
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
    });
    let msg = "";
    try {
      await model.methods["collect-host-public-key"].execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("private key"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: invalid key format throws", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = okExecutor(() => "not-a-known-algo AAAA...\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
    });
    let msg = "";
    try {
      await model.methods["collect-host-public-key"].execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("unrecognized key algorithm"), msg);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: non-zero exit throws via throwOnHostFailures", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = failExecutor(1, "No such file or directory\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: ["web-1"],
    });
    let msg = "";
    try {
      await model.methods["collect-host-public-key"].execute(args, h.ctx);
    } catch (e) {
      msg = e instanceof Error ? e.message : String(e);
    }
    assert(msg.includes("collect-host-public-key failed"), msg);
    assert(msg.includes("web-1"), msg);
    assert(
      h.resources.has("run-collect-host-public-key-web-1"),
      "runResult should be written before throw",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("collect-host-public-key: multiple hosts, all succeed", async () => {
  const h = makeHarness(FLEET, "collect-host-public-key");
  const { executor } = okExecutor(() => ED25519_PUBKEY + "\n");
  setCommandExecutor(executor);
  try {
    const args = model.methods["collect-host-public-key"].arguments.parse({
      hosts: "all",
    });
    const out = await model.methods["collect-host-public-key"].execute(
      args,
      h.ctx,
    );
    assert(out.dataHandles.length >= 6);
    assert(h.resources.has("hostPublicKey-web-1"));
    assert(h.resources.has("hostPublicKey-web-2"));
    assert(h.resources.has("hostPublicKey-edge-1"));
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
