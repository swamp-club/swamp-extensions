import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  NOT_FOUND_EXIT,
  runArgv,
  startDockerImage,
  TIMEOUT_EXIT,
} from "./transport.ts";

const logger = { info: () => {}, debug: () => {} };

Deno.test("runArgv captures stdout, stderr and the exit code", async () => {
  const res = await runArgv(
    ["sh", "-c", "echo out; echo err >&2; exit 3"],
    5_000,
  );
  assertEquals(res, { stdout: "out", stderr: "err", exitCode: 3 });
});

Deno.test("runArgv feeds stdin", async () => {
  const res = await runArgv(["sh", "-c", "cat"], 5_000, "hello");
  assertEquals(res.stdout, "hello");
  assertEquals(res.exitCode, 0);
});

Deno.test("runArgv reports a timeout as exit 124", async () => {
  // exec, so the killed process is the one holding the output pipes.
  const res = await runArgv(["sh", "-c", "exec sleep 5"], 200);
  assertEquals(res.exitCode, TIMEOUT_EXIT);
  assertStringIncludes(res.stderr, "timed out");
});

Deno.test("a missing script exits 127 (the not-found code)", async () => {
  // A missing argv[0] cannot be run under --allow-run=sh (the permission
  // check comes first), so the 127 code is checked through sh instead.
  const res = await runArgv(["sh", "/nonexistent/sshole-probe.sh"], 5_000);
  assertEquals(res.exitCode, NOT_FOUND_EXIT);
});

/** A docker stand-in run through sh that logs each call. */
async function stubDocker(
  opts: { imagePresent: boolean; run: "ok" | "fail" | "hang" },
): Promise<{ docker: string[]; calls: () => Promise<string[]>; dir: string }> {
  const dir = await Deno.makeTempDir({ prefix: "sshole-docker-" });
  const log = `${dir}/calls.log`;
  const run = opts.run === "ok"
    ? "echo 0123456789ab; exit 0"
    : opts.run === "fail"
    ? "echo 'boom' >&2; exit 1"
    : "exec sleep 5";
  const script = [
    `printf '%s\\n' "$*" >> '${log}'`,
    `case "$1" in`,
    `  image) exit ${opts.imagePresent ? 0 : 1} ;;`,
    `  pull) exit 0 ;;`,
    `  run) ${run} ;;`,
    `  rm) exit 0 ;;`,
    `esac`,
  ].join("\n");
  await Deno.writeTextFile(`${dir}/docker.sh`, script);
  return {
    docker: ["sh", `${dir}/docker.sh`],
    dir,
    calls: async () =>
      (await Deno.readTextFile(log)).trim().split("\n").filter((l) => l),
  };
}

Deno.test("startDockerImage pulls only when the image is missing", async () => {
  for (const imagePresent of [true, false]) {
    const stub = await stubDocker({ imagePresent, run: "ok" });
    try {
      const name = await startDockerImage("alpine:3.20", logger, {
        docker: stub.docker,
      });
      assert(name.startsWith("sshole-scan-"));
      const calls = await stub.calls();
      assertEquals(calls.some((c) => c.startsWith("pull ")), !imagePresent);
      assert(calls.some((c) => c.includes(`--name ${name}`)));
      assert(!calls.some((c) => c.startsWith("rm ")));
    } finally {
      await Deno.remove(stub.dir, { recursive: true });
    }
  }
});

Deno.test("startDockerImage removes a failed run's container, twice after a timeout", async () => {
  for (const [run, removals] of [["fail", 1], ["hang", 2]] as const) {
    const stub = await stubDocker({ imagePresent: true, run });
    try {
      await assertRejects(
        () =>
          startDockerImage("alpine:3.20", logger, {
            docker: stub.docker,
            runTimeoutMs: 200,
            retryDelayMs: 10,
          }),
        Error,
        "docker run failed",
      );
      const calls = await stub.calls();
      const runCall = calls.find((c) => c.startsWith("run "))!;
      const name = runCall.match(/--name (\S+)/)![1];
      assertEquals(
        calls.filter((c) => c === `rm -f ${name}`).length,
        removals,
        run,
      );
    } finally {
      await Deno.remove(stub.dir, { recursive: true });
    }
  }
});

Deno.test("startDockerImage refuses an option-like image reference", async () => {
  await assertRejects(
    () => startDockerImage("--privileged", logger, { docker: ["false"] }),
    Error,
    "Refusing unsafe dockerImage",
  );
});
