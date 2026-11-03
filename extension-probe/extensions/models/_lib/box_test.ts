import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1.1.4";
import {
  boxLayout,
  createBox,
  diffSnapshots,
  MAX_STUB_CALLS,
  readRegularFile,
  readStubCalls,
  removeBox,
  snapshot,
  STUB_FILE_CAP,
} from "./box.ts";
import { makeCanaries } from "./canaries.ts";
import { assertRejects } from "jsr:@std/assert@1.0.19";
import { makeDenoExec } from "./isolation.ts";

async function withDir(fn: (d: string) => Promise<void>) {
  const d = await Deno.makeTempDir();
  try {
    await fn(d);
  } finally {
    await Deno.remove(d, { recursive: true });
  }
}

Deno.test("readRegularFile reads a capped prefix and the full size", async () => {
  await withDir(async (d) => {
    const p = join(d, "f");
    await Deno.writeTextFile(p, "abcdef");
    assertEquals(await readRegularFile(p, 3), { text: "abc", size: 6 });
  });
});

Deno.test("readRegularFile refuses symlinks, directories and devices", async () => {
  await withDir(async (d) => {
    const secret = join(d, "secret");
    await Deno.writeTextFile(secret, "operator secret");
    const link = join(d, "link");
    await Deno.symlink(secret, link);
    assertEquals(await readRegularFile(link, 100), null);
    assertEquals(await readRegularFile(d, 100), null);
    assertEquals(await readRegularFile("/dev/zero", 100), null);
    assertEquals(await readRegularFile(join(d, "missing"), 100), null);
  });
});

Deno.test("stub calls planted as symlinks are read as empty, never followed", async () => {
  await withDir(async (d) => {
    const secret = join(d, "secret");
    await Deno.writeTextFile(secret, "operator secret");
    const call = join(d, "calls", "1");
    await Deno.mkdir(call, { recursive: true });
    await Deno.writeTextFile(join(call, "invoked"), "/box/bin/claude");
    await Deno.writeTextFile(join(call, "argv"), "-p\0");
    await Deno.symlink(secret, join(call, "cwd"));
    await Deno.symlink("/dev/zero", join(call, "stdin"));
    // A whole call directory planted as a link is skipped.
    await Deno.symlink(d, join(d, "calls", "2"));
    const calls = await readStubCalls(join(d, "calls"), new Set());
    assertEquals(calls.length, 1);
    assertEquals(calls[0].cwd, "");
    assertEquals(calls[0].stdin, "");
    assertEquals(calls[0].stdinBytes, 0);
    assertEquals(calls[0].argv, "-p\0");
  });
});

Deno.test("stub stdin is capped, with its full size recorded", async () => {
  await withDir(async (d) => {
    const call = join(d, "calls", "1");
    await Deno.mkdir(call, { recursive: true });
    await Deno.writeTextFile(
      join(call, "stdin"),
      "x".repeat(STUB_FILE_CAP + 10),
    );
    const [c] = await readStubCalls(join(d, "calls"), new Set());
    assertEquals(c.stdin.length, STUB_FILE_CAP);
    assertEquals(c.stdinBytes, STUB_FILE_CAP + 10);
  });
});

Deno.test("a timed-out step returns even when a grandchild holds its pipes", async () => {
  const exec = makeDenoExec({ killMs: 100, pipesMs: 300, drainMs: 300 });
  const started = Date.now();
  const r = await exec({
    cmd: "/bin/sh",
    args: ["-c", "sleep 3 & sleep 3"],
    cwd: "/",
    env: { PATH: "/usr/bin:/bin" },
    timeoutMs: 200,
  });
  assert(r.timedOut);
  assert(Date.now() - started < 2_500, "did not wait for the pipes to close");
});

Deno.test("a step that exits cleanly is not timed out by a grandchild holding its pipes", async () => {
  const exec = makeDenoExec({ killMs: 100, pipesMs: 300, drainMs: 200 });
  const started = Date.now();
  const r = await exec({
    cmd: "/bin/sh",
    args: ["-c", "sleep 3 & echo done"],
    cwd: "/",
    env: { PATH: "/usr/bin:/bin" },
    timeoutMs: 5_000,
  });
  assertEquals(r.timedOut, false);
  assertEquals(r.code, 0);
  assertEquals(r.stdout.trim(), "done");
  assert(Date.now() - started < 2_500, "did not wait for the grandchild");
});

Deno.test("a flood of stub calls is capped, and the overflow is reported", async () => {
  await withDir(async (d) => {
    for (let i = 0; i < MAX_STUB_CALLS + 5; i++) {
      await Deno.mkdir(join(d, "calls", String(i).padStart(4, "0")), {
        recursive: true,
      });
    }
    const calls = await readStubCalls(join(d, "calls"), new Set());
    assertEquals(calls.length, MAX_STUB_CALLS + 1);
    assertEquals(calls[0].id, "dropped");
    assert(calls[0].argv.startsWith("5 more stub call records"));
  });
});

Deno.test("a write hidden in a chmod 000 directory still shows as a change", async () => {
  await withDir(async (d) => {
    const before = await snapshot(d);
    await Deno.mkdir(join(d, ".config", "autostart"), { recursive: true });
    await Deno.writeTextFile(join(d, ".config", "autostart", "x.desktop"), "x");
    await Deno.chmod(join(d, ".config", "autostart"), 0o000);
    const changes = diffSnapshots(before, await snapshot(d));
    assertEquals(changes.map((c) => c.path), [".config/autostart/x.desktop"]);
  });
});

Deno.test("removeBox removes a box with a locked directory", async () => {
  const d = await Deno.makeTempDir();
  await Deno.mkdir(join(d, "home", "locked"), { recursive: true });
  await Deno.writeTextFile(join(d, "home", "locked", "canary"), "x");
  await Deno.chmod(join(d, "home", "locked"), 0o000);
  assert(await removeBox(d));
  await assertRejects(() => Deno.lstat(d));
});

Deno.test("stubCommands must be plain command names", async () => {
  await withDir(async (d) => {
    await assertRejects(
      () => createBox(boxLayout(d), makeCanaries(), ["../../etc/evil"]),
      Error,
      "is not a plain command name",
    );
  });
});
