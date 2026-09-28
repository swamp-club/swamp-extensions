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

/**
 * Tests for resolveSelection — the single funnel that turns a method's `hosts`
 * selector into matched hosts and produces the agent-readable diagnostics
 * (precise no-match error, legacy-CEL deprecation warning, parse-error
 * wrapper). Driven by a structural FleetContext fake; no real swamp context,
 * no live SSH.
 *
 * @module
 */

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { createModelTestContext } from "@systeminit/swamp-testing";
import {
  type DataHandle,
  type FleetContext,
  resolveSelection,
  runCopy,
  runExec,
  runOpen,
  runScript,
  throwOnHostFailures,
} from "./operations.ts";
import { type GlobalArgs, GlobalArgsSchema } from "./schemas.ts";
import {
  type ExecRequest,
  type HostRunResult,
  resetCommandExecutor,
  setCommandExecutor,
} from "./runner.ts";

const makeCelEnv = createModelTestContext().context.createCelEnvironment;

function globals(): GlobalArgs {
  return GlobalArgsSchema.parse({
    name: "fleet",
    transport: { kind: "ssh" },
    hosts: [
      { name: "web-1", address: "10.0.0.1", tags: ["web", "prod"] },
      { name: "db-1", address: "10.0.5.1", tags: ["db", "prod"] },
    ],
  });
}

function fakeContext() {
  const warns: string[] = [];
  const logger = {
    debug() {},
    info() {},
    warn(msg: string) {
      warns.push(msg);
    },
    error() {},
  };
  const ctx = {
    signal: new AbortController().signal,
    globalArgs: {},
    modelType: "@swamp/ssh",
    modelId: "test",
    methodName: "exec",
    logger,
    writeResource: () => Promise.resolve({ name: "x" }),
    readResource: () => Promise.resolve(null),
    createCelEnvironment: makeCelEnv,
    dataRepository: {
      findAllForModel: () => Promise.resolve([]),
      delete: () => Promise.resolve(),
    },
  } as unknown as FleetContext;
  return { ctx, warns };
}

Deno.test("resolveSelection: plain identifier no-match throws a prescriptive error", () => {
  const { ctx } = fakeContext();
  assertThrows(
    () => resolveSelection(ctx, globals(), "ghost"),
    Error,
    "name:ghost",
  );
});

Deno.test("resolveSelection: bare name resolves", () => {
  const { ctx } = fakeContext();
  const hosts = resolveSelection(ctx, globals(), "db-1");
  assert(hosts.length === 1 && hosts[0].name === "db-1");
});

Deno.test("resolveSelection: legacy bare CEL resolves and warns exactly once", () => {
  const { ctx, warns } = fakeContext();
  const hosts = resolveSelection(ctx, globals(), '"prod" in host.tags');
  assert(hosts.length === 2);
  assert(warns.length === 1, `expected one warning, got ${warns.length}`);
  assert(warns[0].includes("deprecated"));
});

Deno.test("resolveSelection: cel: parse error surfaces as 'Invalid selector expression'", () => {
  const { ctx } = fakeContext();
  assertThrows(
    () => resolveSelection(ctx, globals(), "cel:size(host.tags"),
    Error,
    "Invalid selector expression",
  );
});

// ---------------------------------------------------------------------------
// runOpen — sshpass wrapping for password-auth hosts (#1339)
// ---------------------------------------------------------------------------

function openContext(globalArgs: GlobalArgs) {
  const { ctx } = fakeContext();
  return {
    ...ctx,
    globalArgs: globalArgs as unknown as Record<string, unknown>,
    methodName: "open",
  } as unknown as FleetContext;
}

Deno.test("runOpen: password-auth host argv is wrapped in sshpass -e", async () => {
  const requests: ExecRequest[] = [];
  setCommandExecutor((req: ExecRequest) => {
    requests.push(req);
    return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
  });
  const savedTmpdir = Deno.env.get("TMPDIR");
  const tmpDir = await Deno.makeTempDir({ prefix: "open-sshpass-" });
  Deno.env.set("TMPDIR", tmpDir);
  try {
    const g = GlobalArgsSchema.parse({
      name: "test-fleet",
      transport: { kind: "ssh" },
      hosts: [{
        name: "pw-host",
        address: "10.0.0.1",
        transport: {
          kind: "ssh",
          auth: { kind: "password", password: "hunter2" },
        },
      }],
    });
    await runOpen({ hosts: "all" }, openContext(g));
    assertEquals(requests.length, 1, "expected exactly one spawn");
    const argv = [requests[0].command, ...requests[0].args];
    assertEquals(argv[0], "sshpass");
    assertEquals(argv[1], "-e");
    assertEquals(argv[2], "ssh");
    assertEquals(requests[0].env.SSHPASS, "hunter2");
  } finally {
    resetCommandExecutor();
    if (savedTmpdir !== undefined) {
      Deno.env.set("TMPDIR", savedTmpdir);
    } else {
      Deno.env.delete("TMPDIR");
    }
    await Deno.remove(tmpDir, { recursive: true }).catch(() => {});
  }
});

// ---------------------------------------------------------------------------
// throwOnHostFailures — which hosts count as failed
// ---------------------------------------------------------------------------

function result(overrides: Partial<HostRunResult> = {}): HostRunResult {
  return {
    method: "exec",
    host: "web-1",
    transport: "ssh",
    startedAt: "2026-07-27T00:00:00.000Z",
    finishedAt: "2026-07-27T00:00:01.000Z",
    durationMs: 1000,
    exitCode: 0,
    signal: null,
    args: {},
    argv: ["ssh", "web-1", "--", "true"],
    ...overrides,
  };
}

Deno.test("throwOnHostFailures: non-zero exit throws when okExitCodes is omitted", () => {
  // Regression guard for #510 — the default must stay strict.
  assertThrows(
    () =>
      throwOnHostFailures([result({ exitCode: 1, stderr: "nope\n" })], "exec"),
    Error,
    "exec failed on 1/1 host(s)",
  );
});

Deno.test("throwOnHostFailures: exit 1 allowed by okExitCodes does not throw", () => {
  throwOnHostFailures([result({ exitCode: 1 })], "exec", [0, 1]);
});

Deno.test("throwOnHostFailures: 'any' accepts an arbitrary exit code", () => {
  throwOnHostFailures([result({ exitCode: 77 })], "exec", "any");
});

Deno.test("throwOnHostFailures: an array without 0 makes exit 0 a failure", () => {
  assertThrows(
    () => throwOnHostFailures([result({ exitCode: 0 })], "exec", [1]),
    Error,
    "exit 0",
  );
});

Deno.test("throwOnHostFailures: signal kill still throws under 'any'", () => {
  assertThrows(
    () =>
      throwOnHostFailures(
        [result({ exitCode: null, signal: "SIGTERM" })],
        "exec",
        "any",
      ),
    Error,
    "killed by SIGTERM",
  );
});

Deno.test("throwOnHostFailures: spawn error still throws under 'any'", () => {
  assertThrows(
    () =>
      throwOnHostFailures(
        [result({ exitCode: null, error: "spawn ENOENT" })],
        "exec",
        "any",
      ),
    Error,
    "spawn ENOENT",
  );
});

Deno.test("throwOnHostFailures: fail-fast skips stay informational under 'any'", () => {
  throwOnHostFailures(
    [
      result({ exitCode: 5 }),
      result({
        host: "web-2",
        exitCode: null,
        error: "skipped: fail-fast triggered by an earlier host",
      }),
    ],
    "exec",
    "any",
  );
});

Deno.test("throwOnHostFailures: reports only the genuinely-failed hosts", () => {
  const err = assertThrows(
    () =>
      throwOnHostFailures(
        [
          result({ host: "ok-0", exitCode: 0 }),
          result({ host: "allowed-1", exitCode: 1 }),
          result({ host: "bad-9", exitCode: 9, stderr: "boom\n" }),
          result({ host: "killed", exitCode: null, signal: "SIGKILL" }),
        ],
        "exec",
        [0, 1],
      ),
    Error,
  ) as Error;
  assert(
    err.message.startsWith("exec failed on 2/4 host(s):"),
    `unexpected message: ${err.message}`,
  );
  assert(err.message.includes("bad-9 (exit 9: boom)"));
  assert(err.message.includes("killed (killed by SIGKILL)"));
  assert(!err.message.includes("allowed-1"), "allowed exit must not be listed");
  assert(!err.message.includes("ok-0"));
});

// ---------------------------------------------------------------------------
// runResult write tags
// ---------------------------------------------------------------------------

interface RecordedWrite {
  specName: string;
  name: string;
  data: Record<string, unknown>;
  overrides?: { tags?: Record<string, string>; garbageCollection?: number };
}

/**
 * A fleet whose hosts disable ControlMaster, so `argvContextFor` never
 * touches the filesystem and the test stays hermetic.
 */
function tagGlobals(): GlobalArgs {
  return GlobalArgsSchema.parse({
    name: "tag-fleet",
    transport: { kind: "ssh", controlMaster: { enabled: false } },
    hosts: [
      { name: "web-1", address: "10.0.0.1" },
      { name: "web-2", address: "10.0.0.2" },
    ],
  });
}

/**
 * Context that records every write and echoes the applied tags back on the
 * handle, mirroring how swamp returns a DataHandle carrying its tags.
 */
function recordingContext(g: GlobalArgs) {
  const writes: RecordedWrite[] = [];
  const ctx = {
    ...fakeContext().ctx,
    globalArgs: g as unknown as Record<string, unknown>,
    methodName: "exec",
    writeResource: (
      specName: string,
      name: string,
      data: Record<string, unknown>,
      overrides?: { tags?: Record<string, string>; garbageCollection?: number },
    ): Promise<DataHandle> => {
      writes.push({ specName, name, data, overrides });
      return Promise.resolve({ name, tags: overrides?.tags ?? {} });
    },
  } as unknown as FleetContext;
  return { ctx, writes };
}

function runResultWrites(writes: RecordedWrite[]): RecordedWrite[] {
  return writes.filter((w) => w.specName === "runResult");
}

Deno.test("runExec: tags each runResult with fleet/host/method/exitCode", async () => {
  setCommandExecutor((req: ExecRequest) =>
    Promise.resolve({
      code: req.args.some((a) => a.includes("10.0.0.2")) ? 3 : 0,
      signal: null,
      stdout: "",
      stderr: "",
    })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    const { dataHandles } = await runExec(
      { hosts: "all", command: "true", okExitCodes: "any" },
      ctx,
    );

    const runs = runResultWrites(writes);
    assertEquals(runs.length, 2);
    assertEquals(runs[0].overrides?.tags, {
      fleet: "tag-fleet",
      host: "web-1",
      method: "exec",
      exitCode: "0",
    });
    assertEquals(runs[1].overrides?.tags, {
      fleet: "tag-fleet",
      host: "web-2",
      method: "exec",
      exitCode: "3",
    });
    // The gc override must survive alongside the new tags.
    assertEquals(runs[0].overrides?.garbageCollection, 50);

    // Handles returned to the caller carry the tags — the whole point, so a
    // runModel caller can branch without reading resource content.
    assertEquals(dataHandles.length, 2);
    assertEquals(dataHandles[0].tags?.exitCode, "0");
    assertEquals(dataHandles[1].tags?.exitCode, "3");
    assertEquals(dataHandles[1].tags?.host, "web-2");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runExec: every tag value is a string", async () => {
  setCommandExecutor(() =>
    Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    await runExec({ hosts: "all", command: "true" }, ctx);
    for (const w of runResultWrites(writes)) {
      for (const [key, value] of Object.entries(w.overrides?.tags ?? {})) {
        assertEquals(typeof value, "string", `tag ${key} must be a string`);
      }
    }
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runExec: exitCode tag is absent when the process died by signal", async () => {
  setCommandExecutor(() =>
    Promise.resolve({
      code: null,
      signal: "SIGKILL",
      stdout: "",
      stderr: "",
    })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    // A signal kill fails the method even under "any" — but the runResults
    // are written first, which is what we assert on here.
    await assertRejects(
      () => runExec({ hosts: "all", command: "true", okExitCodes: "any" }, ctx),
      Error,
      "killed by SIGKILL",
    );
    const runs = runResultWrites(writes);
    assertEquals(runs.length, 2, "runResults are written before the throw");
    assertEquals(runs[0].overrides?.tags, {
      fleet: "tag-fleet",
      host: "web-1",
      method: "exec",
    });
    assert(!("exitCode" in (runs[0].overrides?.tags ?? {})));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runExec: exitCode tag is absent when the spawn fails", async () => {
  setCommandExecutor(() => Promise.reject(new Error("spawn ENOENT")));
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    await assertRejects(
      () => runExec({ hosts: "all", command: "true", okExitCodes: "any" }, ctx),
      Error,
      "spawn ENOENT",
    );
    const runs = runResultWrites(writes);
    assertEquals(runs.length, 2);
    assert(!("exitCode" in (runs[0].overrides?.tags ?? {})));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runScript: tags carry the script method name", async () => {
  setCommandExecutor(() =>
    Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    await runScript(
      { hosts: "name:web-1", script: "echo hi", interpreter: "sh" },
      ctx,
    );
    const runs = runResultWrites(writes);
    assertEquals(runs.length, 1);
    assertEquals(runs[0].overrides?.tags, {
      fleet: "tag-fleet",
      host: "web-1",
      method: "script",
      exitCode: "0",
    });
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runCopy: runResult writes are tagged too", async () => {
  setCommandExecutor(() =>
    Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    await runCopy(
      { hosts: "name:web-1", src: "./a", dst: "/tmp/a", direction: "to" },
      ctx,
    );
    const runs = runResultWrites(writes);
    assertEquals(runs.length, 1);
    assertEquals(runs[0].overrides?.tags, {
      fleet: "tag-fleet",
      host: "web-1",
      method: "copy",
      exitCode: "0",
    });
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// okExitCodes end-to-end through runExec / runScript
// ---------------------------------------------------------------------------

Deno.test("runExec: an allowed non-zero exit resolves and records no error", async () => {
  setCommandExecutor(() =>
    Promise.resolve({ code: 1, signal: null, stdout: "", stderr: "" })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    await runExec(
      { hosts: "all", command: "test -f /etc/hosts", okExitCodes: [0, 1] },
      ctx,
    );
    const runs = runResultWrites(writes);
    assertEquals(runs.length, 2);
    assertEquals(runs[0].data.exitCode, 1);
    assertEquals(runs[0].data.error, undefined, "allowed exit sets no error");
    // The audit trail records the caller's declared allow-list.
    assertEquals(
      (runs[0].data.args as Record<string, unknown>).okExitCodes,
      [0, 1],
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runExec: exit 1 still fails the method when okExitCodes is omitted", async () => {
  setCommandExecutor(() =>
    Promise.resolve({ code: 1, signal: null, stdout: "", stderr: "" })
  );
  try {
    const { ctx, writes } = recordingContext(tagGlobals());
    await assertRejects(
      () => runExec({ hosts: "all", command: "false" }, ctx),
      Error,
      "exec failed on 2/2 host(s)",
    );
    const runs = runResultWrites(writes);
    // recordedArgs must stay clean when the caller did not opt in.
    assert(!("okExitCodes" in (runs[0].data.args as Record<string, unknown>)));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runScript: exit 2 allowed by okExitCodes resolves", async () => {
  setCommandExecutor(() =>
    Promise.resolve({ code: 2, signal: null, stdout: "", stderr: "" })
  );
  try {
    const { ctx } = recordingContext(tagGlobals());
    await runScript(
      {
        hosts: "all",
        script: "exit 2",
        interpreter: "sh",
        okExitCodes: [0, 2],
      },
      ctx,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runOpen: key-auth host argv is NOT wrapped in sshpass", async () => {
  const requests: ExecRequest[] = [];
  setCommandExecutor((req: ExecRequest) => {
    requests.push(req);
    return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
  });
  const savedTmpdir = Deno.env.get("TMPDIR");
  const tmpDir = await Deno.makeTempDir({ prefix: "open-key-" });
  Deno.env.set("TMPDIR", tmpDir);
  try {
    const g = GlobalArgsSchema.parse({
      name: "test-fleet",
      transport: { kind: "ssh" },
      hosts: [{
        name: "key-host",
        address: "10.0.0.2",
      }],
    });
    await runOpen({ hosts: "all" }, openContext(g));
    assertEquals(requests.length, 1, "expected exactly one spawn");
    assertEquals(requests[0].command, "ssh");
    assertEquals(requests[0].env.SSHPASS, undefined);
  } finally {
    resetCommandExecutor();
    if (savedTmpdir !== undefined) {
      Deno.env.set("TMPDIR", savedTmpdir);
    } else {
      Deno.env.delete("TMPDIR");
    }
    await Deno.remove(tmpDir, { recursive: true }).catch(() => {});
  }
});

// ---------------------------------------------------------------------------
// throwOnHostFailures — full stderr in error messages (#1423)
// ---------------------------------------------------------------------------

function execContext(globalArgs: GlobalArgs) {
  const { ctx } = fakeContext();
  return {
    ...ctx,
    globalArgs: globalArgs as unknown as Record<string, unknown>,
    methodName: "exec",
  } as unknown as FleetContext;
}

Deno.test("exec error includes full multi-line stderr, not just last line", async () => {
  setCommandExecutor(() =>
    Promise.resolve({
      code: 1,
      signal: null,
      stdout: "",
      stderr:
        "WARNING: host key mismatch\n# To authenticate, visit: https://login.ts.com/a/tok\nfinal line\n",
    })
  );
  try {
    const g = GlobalArgsSchema.parse({
      name: "test-fleet",
      transport: { kind: "ssh" },
      hosts: [{ name: "err-host", address: "10.0.0.1" }],
    });
    try {
      await runExec(
        { hosts: "all", command: "echo ok" },
        execContext(g),
      );
      assert(false, "should have thrown");
    } catch (e) {
      const msg = (e as Error).message;
      assertStringIncludes(msg, "host key mismatch");
      assertStringIncludes(msg, "To authenticate");
      assertStringIncludes(msg, "final line");
    }
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("exec error truncates stderr beyond 512 chars", async () => {
  const longStderr = "x".repeat(600) + "\n";
  setCommandExecutor(() =>
    Promise.resolve({
      code: 1,
      signal: null,
      stdout: "",
      stderr: longStderr,
    })
  );
  try {
    const g = GlobalArgsSchema.parse({
      name: "test-fleet",
      transport: { kind: "ssh" },
      hosts: [{ name: "err-host", address: "10.0.0.1" }],
    });
    try {
      await runExec(
        { hosts: "all", command: "echo ok" },
        execContext(g),
      );
      assert(false, "should have thrown");
    } catch (e) {
      const msg = (e as Error).message;
      assertStringIncludes(msg, "…");
      assert(
        msg.length < longStderr.length,
        "error should be shorter than raw stderr",
      );
    }
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// runExec — forwarded env reaches tailscale hosts (#2561)
// ---------------------------------------------------------------------------

Deno.test("runExec: tailscale host forwards host + per-call env via SendEnv", async () => {
  const requests: ExecRequest[] = [];
  setCommandExecutor((req: ExecRequest) => {
    requests.push(req);
    return Promise.resolve({ code: 0, signal: null, stdout: "", stderr: "" });
  });
  try {
    const g = GlobalArgsSchema.parse({
      name: "ts-fleet",
      transport: { kind: "tailscale", user: "deploy" },
      hosts: [{
        name: "edge-1",
        address: "edge-1",
        env: { APP: "host-value", REGION: "eu" },
      }],
    });
    await runExec(
      { hosts: "all", command: "printenv APP", env: { APP: "call-value" } },
      execContext(g),
    );
    assertEquals(requests.length, 1, "expected exactly one spawn");
    assertEquals([requests[0].command, ...requests[0].args], [
      "tailscale",
      "ssh",
      "--",
      "deploy@edge-1",
      "-o",
      "SendEnv=APP",
      "-o",
      "SendEnv=REGION",
      "--",
      "printenv APP",
    ]);
    assertEquals(requests[0].env, { APP: "call-value", REGION: "eu" });
  } finally {
    resetCommandExecutor();
  }
});
