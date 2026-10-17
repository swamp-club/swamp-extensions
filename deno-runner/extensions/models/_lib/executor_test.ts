import { assertEquals } from "jsr:@std/assert@1.0.19";
import { execute } from "./executor.ts";
import type { DenoRunnerLogger } from "./types.ts";

function makeLogger(): { logger: DenoRunnerLogger; logs: string[] } {
  const logs: string[] = [];
  const logger: DenoRunnerLogger = {
    debug: (msg) => logs.push(`debug: ${msg}`),
    info: (msg) => logs.push(`info: ${msg}`),
    warn: (msg) => logs.push(`warn: ${msg}`),
    error: (msg) => logs.push(`error: ${msg}`),
  };
  return { logger, logs };
}

// ---------------------------------------------------------------------------
// Successful execution
// ---------------------------------------------------------------------------

Deno.test("execute runs a simple command and captures output", async () => {
  const { logger } = makeLogger();
  const result = await execute({
    binaryPath: "/bin/echo",
    args: ["hello", "world"],
    workingDir: Deno.cwd(),
    logger,
    signal: new AbortController().signal,
  });

  assertEquals(result.stdout.trim(), "hello world");
  assertEquals(result.exitCode, 0);
  assertEquals(result.command, "deno hello world");
});

// ---------------------------------------------------------------------------
// Non-zero exit code
// ---------------------------------------------------------------------------

Deno.test("execute captures non-zero exit code", async () => {
  const { logger, logs } = makeLogger();
  const result = await execute({
    binaryPath: "/bin/sh",
    args: ["-c", "exit 42"],
    workingDir: Deno.cwd(),
    logger,
    signal: new AbortController().signal,
  });

  assertEquals(result.exitCode, 42);
  assertEquals(logs.some((l) => l.includes("exited with code 42")), true);
});

// ---------------------------------------------------------------------------
// Environment variables
// ---------------------------------------------------------------------------

Deno.test("execute passes extra env vars to subprocess", async () => {
  const { logger } = makeLogger();
  const result = await execute({
    binaryPath: "/bin/sh",
    args: ["-c", "echo $DENO_RUNNER_TEST_VAR"],
    workingDir: Deno.cwd(),
    env: { DENO_RUNNER_TEST_VAR: "test_value_123" },
    logger,
    signal: new AbortController().signal,
  });

  assertEquals(result.stdout.trim(), "test_value_123");
  assertEquals(result.exitCode, 0);
});

// ---------------------------------------------------------------------------
// Stderr capture
// ---------------------------------------------------------------------------

Deno.test("execute captures stderr", async () => {
  const { logger } = makeLogger();
  const result = await execute({
    binaryPath: "/bin/sh",
    args: ["-c", "echo err >&2; exit 1"],
    workingDir: Deno.cwd(),
    logger,
    signal: new AbortController().signal,
  });

  assertEquals(result.stderr.trim(), "err");
  assertEquals(result.exitCode, 1);
});

// ---------------------------------------------------------------------------
// inheritEnv
// ---------------------------------------------------------------------------

Deno.test("execute with inheritEnv passes full parent environment", async () => {
  const marker = `DENO_RUNNER_INHERIT_TEST_${Date.now()}`;
  Deno.env.set(marker, "inherited_value");
  try {
    const { logger } = makeLogger();
    const result = await execute({
      binaryPath: "/bin/sh",
      args: ["-c", `echo $${marker}`],
      workingDir: Deno.cwd(),
      inheritEnv: true,
      logger,
      signal: new AbortController().signal,
    });

    assertEquals(result.stdout.trim(), "inherited_value");
    assertEquals(result.exitCode, 0);
  } finally {
    Deno.env.delete(marker);
  }
});

Deno.test("execute without inheritEnv strips non-allowlisted vars", async () => {
  const marker = `DENO_RUNNER_STRIPPED_TEST_${Date.now()}`;
  Deno.env.set(marker, "should_not_appear");
  try {
    const { logger } = makeLogger();
    const result = await execute({
      binaryPath: "/bin/sh",
      args: ["-c", `echo $${marker}`],
      workingDir: Deno.cwd(),
      logger,
      signal: new AbortController().signal,
    });

    assertEquals(result.stdout.trim(), "");
    assertEquals(result.exitCode, 0);
  } finally {
    Deno.env.delete(marker);
  }
});

Deno.test({
  name: "execute without inheritEnv forwards the Windows profile variables",
  // The probe uses /bin/sh.
  ignore: Deno.build.os === "windows",
  fn: async () => {
    const names = ["USERPROFILE", "APPDATA", "LOCALAPPDATA", "SystemRoot"];
    const originals = new Map(names.map((n) => [n, Deno.env.get(n)]));
    try {
      for (const name of names) {
        Deno.env.set(name, `value-of-${name}`);
      }
      const { logger } = makeLogger();
      const result = await execute({
        binaryPath: "/bin/sh",
        args: ["-c", names.map((n) => `echo $${n}`).join("; ")],
        workingDir: Deno.cwd(),
        logger,
        signal: new AbortController().signal,
      });

      assertEquals(
        result.stdout.trim().split("\n"),
        names.map((n) => `value-of-${n}`),
      );
    } finally {
      for (const [name, value] of originals) {
        if (value !== undefined) {
          Deno.env.set(name, value);
        } else {
          Deno.env.delete(name);
        }
      }
    }
  },
});

Deno.test("execute with inheritEnv merges extra env on top", async () => {
  const { logger } = makeLogger();
  const result = await execute({
    binaryPath: "/bin/sh",
    args: ["-c", "echo $INHERIT_MERGE_VAR"],
    workingDir: Deno.cwd(),
    inheritEnv: true,
    env: { INHERIT_MERGE_VAR: "merged_value" },
    logger,
    signal: new AbortController().signal,
  });

  assertEquals(result.stdout.trim(), "merged_value");
  assertEquals(result.exitCode, 0);
});

// ---------------------------------------------------------------------------
// Working directory
// ---------------------------------------------------------------------------

Deno.test("execute respects working directory", async () => {
  const tmpDir = await Deno.makeTempDir();
  try {
    const { logger } = makeLogger();
    const result = await execute({
      binaryPath: "/bin/sh",
      args: ["-c", "pwd"],
      workingDir: tmpDir,
      logger,
      signal: new AbortController().signal,
    });

    // macOS may use /private prefix for temp dirs
    const normalized = result.stdout.trim().replace(/^\/private/, "");
    const expectedNormalized = tmpDir.replace(/^\/private/, "");
    assertEquals(normalized, expectedNormalized);
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});
