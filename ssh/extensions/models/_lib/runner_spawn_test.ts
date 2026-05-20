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
import {
  type CommandExecutor,
  denoExecutor,
  type ExecRequest,
  type HostPlan,
  resetCommandExecutor,
  runHosts,
  setCommandExecutor,
} from "./runner.ts";
import type { EffectiveHost } from "./hosts.ts";

function host(name: string): EffectiveHost {
  return {
    name,
    address: `${name}.example.com`,
    tags: [],
    attrs: {},
    env: {},
    transport: {
      kind: "ssh",
      user: "deploy",
      port: 22,
      auth: { kind: "key" },
      connectTimeoutSec: 10,
      extraOptions: [],
      controlMaster: { enabled: true, persistSec: 600 },
    },
  };
}

function plan(name: string, stdin?: string): HostPlan {
  return {
    host: host(name),
    argv: ["ssh", `${name}`, "--", "uptime"],
    env: {},
    stdin,
  };
}

function baseOpts() {
  return {
    method: "exec",
    parallel: 8,
    timeoutSec: 30,
    failFast: false,
    capture: true,
    recordedArgs: { command: "uptime" },
  };
}

/** Build a fake executor that records requests and returns canned outcomes. */
function recordingExecutor(
  respond: (req: ExecRequest) => {
    code?: number | null;
    signal?: string | null;
    stdout?: string;
    stderr?: string;
    delayMs?: number;
    throwMsg?: string;
  },
): { executor: CommandExecutor; requests: ExecRequest[] } {
  const requests: ExecRequest[] = [];
  const executor: CommandExecutor = async (req) => {
    requests.push(req);
    const r = respond(req);
    if (r.delayMs) await new Promise((res) => setTimeout(res, r.delayMs));
    if (r.throwMsg) throw new Error(r.throwMsg);
    return {
      code: r.code ?? 0,
      signal: r.signal ?? null,
      stdout: r.stdout ?? "",
      stderr: r.stderr ?? "",
    };
  };
  return { executor, requests };
}

// ---------------------------------------------------------------------------
// Basic capture
// ---------------------------------------------------------------------------

Deno.test("runHosts: captures stdout/stderr when capture=true", async () => {
  const { executor } = recordingExecutor(() => ({
    stdout: "load 0.1\n",
    stderr: "",
  }));
  setCommandExecutor(executor);
  try {
    const results = await runHosts([plan("web-1")], baseOpts());
    assertEquals(results.length, 1);
    assertEquals(results[0].exitCode, 0);
    assertEquals(results[0].stdout, "load 0.1\n");
    assertEquals(results[0].stderr, "");
    assertEquals(results[0].host, "web-1");
    assertEquals(results[0].method, "exec");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runHosts: capture=false omits stdout/stderr from result", async () => {
  const { executor, requests } = recordingExecutor(() => ({ stdout: "x" }));
  setCommandExecutor(executor);
  try {
    const results = await runHosts([plan("web-1")], {
      ...baseOpts(),
      capture: false,
    });
    assertEquals(results[0].stdout, undefined);
    assertEquals(results[0].stderr, undefined);
    assertEquals(requests[0].capture, false);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// stdin
// ---------------------------------------------------------------------------

Deno.test("runHosts: forwards stdin to the executor", async () => {
  const { executor, requests } = recordingExecutor(() => ({ code: 0 }));
  setCommandExecutor(executor);
  try {
    await runHosts([plan("web-1", "echo hi\n")], baseOpts());
    assertEquals(requests[0].stdin, "echo hi\n");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// env
// ---------------------------------------------------------------------------

Deno.test("runHosts: passes env to the executor", async () => {
  const { executor, requests } = recordingExecutor(() => ({ code: 0 }));
  setCommandExecutor(executor);
  try {
    const p = plan("web-1");
    p.env = { SSHPASS: "secret", APP_ENV: "prod" };
    await runHosts([p], baseOpts());
    assertEquals(requests[0].env.SSHPASS, "secret");
    assertEquals(requests[0].env.APP_ENV, "prod");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// non-zero exit
// ---------------------------------------------------------------------------

Deno.test("runHosts: records non-zero exit code", async () => {
  const { executor } = recordingExecutor(() => ({
    code: 7,
    stderr: "boom\n",
  }));
  setCommandExecutor(executor);
  try {
    const results = await runHosts([plan("web-1")], baseOpts());
    assertEquals(results[0].exitCode, 7);
    assertEquals(results[0].stderr, "boom\n");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// executor throw → error field
// ---------------------------------------------------------------------------

Deno.test("runHosts: executor throw is captured as error, not propagated", async () => {
  const { executor } = recordingExecutor(() => ({
    throwMsg: "spawn ENOENT",
  }));
  setCommandExecutor(executor);
  try {
    const results = await runHosts([plan("web-1")], baseOpts());
    assertEquals(results[0].exitCode, null);
    assert(results[0].error?.includes("spawn ENOENT"));
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// concurrency limit
// ---------------------------------------------------------------------------

Deno.test("runHosts: respects parallel limit", async () => {
  let active = 0;
  let peak = 0;
  const executor: CommandExecutor = async () => {
    active++;
    peak = Math.max(peak, active);
    await new Promise((res) => setTimeout(res, 10));
    active--;
    return { code: 0, signal: null, stdout: "", stderr: "" };
  };
  setCommandExecutor(executor);
  try {
    const plans = Array.from({ length: 10 }, (_, i) => plan(`h-${i}`));
    await runHosts(plans, { ...baseOpts(), parallel: 3 });
    assert(peak <= 3, `peak concurrency ${peak} exceeded limit 3`);
    assert(peak >= 2, `expected real parallelism, peak was ${peak}`);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runHosts: results returned in input order regardless of completion", async () => {
  const executor: CommandExecutor = async (req) => {
    // h-0 is slow, h-2 fast — completion order differs from input order.
    const isSlow = req.args.some((a) => a.includes("h-0"));
    await new Promise((res) => setTimeout(res, isSlow ? 20 : 1));
    return { code: 0, signal: null, stdout: "", stderr: "" };
  };
  setCommandExecutor(executor);
  try {
    const plans = [plan("h-0"), plan("h-1"), plan("h-2")];
    const results = await runHosts(plans, { ...baseOpts(), parallel: 3 });
    assertEquals(results.map((r) => r.host), ["h-0", "h-1", "h-2"]);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// fail-fast
// ---------------------------------------------------------------------------

Deno.test("runHosts: failFast skips not-yet-started hosts", async () => {
  let started = 0;
  const executor: CommandExecutor = async (req) => {
    started++;
    await new Promise((res) => setTimeout(res, 5));
    // First host fails.
    const isFirst = req.args.some((a) => a.includes("h-0"));
    return {
      code: isFirst ? 1 : 0,
      signal: null,
      stdout: "",
      stderr: "",
    };
  };
  setCommandExecutor(executor);
  try {
    const plans = Array.from({ length: 20 }, (_, i) => plan(`h-${i}`));
    const results = await runHosts(plans, {
      ...baseOpts(),
      parallel: 1,
      failFast: true,
    });
    // With parallel=1 and the first host failing, the rest should be
    // skipped. At most a couple actually started.
    assert(
      started < 20,
      `expected fail-fast to stop early, started ${started}`,
    );
    const skipped = results.filter((r) => r.error?.includes("fail-fast"));
    assert(skipped.length > 0, "expected some hosts marked skipped");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("runHosts: without failFast, all hosts run despite a failure", async () => {
  let started = 0;
  const executor: CommandExecutor = (req) => {
    started++;
    const isFirst = req.args.some((a) => a.includes("h-0"));
    return Promise.resolve({
      code: isFirst ? 1 : 0,
      signal: null,
      stdout: "",
      stderr: "",
    });
  };
  setCommandExecutor(executor);
  try {
    const plans = Array.from({ length: 5 }, (_, i) => plan(`h-${i}`));
    const results = await runHosts(plans, { ...baseOpts(), parallel: 1 });
    assertEquals(started, 5);
    assertEquals(results.filter((r) => r.error).length, 0);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// timeout (real executor, real subprocess)
// ---------------------------------------------------------------------------

Deno.test({
  name: "runHosts: per-host timeout kills a slow process (real sleep)",
  // The real executor spawns `sleep`, which holds an OS resource until
  // killed. sanitizeOps/Resources are relaxed because the kill races the
  // event loop teardown; the process IS terminated by SIGTERM.
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async () => {
    const slow: HostPlan = {
      host: host("slow"),
      argv: ["sleep", "30"],
      env: {},
    };
    const results = await runHosts([slow], {
      ...baseOpts(),
      timeoutSec: 1,
    });
    assertEquals(results[0].exitCode, null);
    assertEquals(results[0].signal, "SIGTERM");
  },
});

// ---------------------------------------------------------------------------
// real executor smoke test (echo)
// ---------------------------------------------------------------------------

Deno.test("denoExecutor: runs a real command and captures stdout", async () => {
  const outcome = await denoExecutor({
    command: "printf",
    args: ["hello"],
    env: {},
    capture: true,
    signal: new AbortController().signal,
  });
  assertEquals(outcome.code, 0);
  assertEquals(outcome.stdout, "hello");
});

Deno.test("denoExecutor: pipes stdin to a real command", async () => {
  const outcome = await denoExecutor({
    command: "cat",
    args: [],
    env: {},
    stdin: "piped-content",
    capture: true,
    signal: new AbortController().signal,
  });
  assertEquals(outcome.code, 0);
  assertEquals(outcome.stdout, "piped-content");
});
