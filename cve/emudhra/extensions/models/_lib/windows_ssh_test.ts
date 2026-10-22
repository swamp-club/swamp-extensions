// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import {
  assert,
  assertEquals,
  assertMatch,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertCmdSafe,
  CHUNK_BYTES,
  cmdLine,
  runOverWindowsSsh,
  type SshSession,
} from "./windows_ssh.ts";

const enc = (s: string) => new TextEncoder().encode(s);

/**
 * A fake target: one temporary file, an output of `size` bytes, and a log of
 * every remote command.
 */
function fakeTarget(output: Uint8Array, opts: { failRead?: boolean } = {}) {
  const calls: { remote: string; input?: string }[] = [];
  const f = "/tmp/emudhra.Ab12Cd";
  const session: SshSession = (remote, input) => {
    calls.push({ remote, input });
    if (remote.startsWith("umask 077")) {
      return Promise.resolve({
        stdout: enc(`${f}\n`),
        stderr: "",
        exitCode: 0,
      });
    }
    if (remote.startsWith(`cd '${f}' && umask 077`)) {
      return Promise.resolve({
        stdout: enc(`rc=0\n${output.length}\n4\n`),
        stderr: "",
        exitCode: 0,
      });
    }
    const m = remote.match(/^tail -c \+(\d+) '([^']+)' \| head -c (\d+)$/);
    if (m) {
      if (opts.failRead && m[2].endsWith("/out") && m[1] !== "1") {
        return Promise.resolve({
          stdout: new Uint8Array(),
          stderr: "Connection closed",
          exitCode: 255,
        });
      }
      const data = m[2].endsWith("/err") ? enc("warn") : output;
      const off = parseInt(m[1], 10) - 1;
      return Promise.resolve({
        stdout: data.slice(off, off + parseInt(m[3], 10)),
        stderr: "",
        exitCode: 0,
      });
    }
    return Promise.resolve({
      stdout: new Uint8Array(),
      stderr: "",
      exitCode: 0,
    });
  };
  return { calls, session, f };
}

Deno.test("runOverWindowsSsh: upload, run, read back in chunks, clean up", async () => {
  // Over three chunks, with a multi-byte character across a chunk boundary.
  const text = "a".repeat(CHUNK_BYTES - 1) + "é" + "b".repeat(CHUNK_BYTES * 2);
  const out = enc(text);
  const t = fakeTarget(out);
  const r = await runOverWindowsSsh(t.session, "echo hi\n");
  assertEquals(r.stdout, text);
  assertEquals(r.stderr, "warn");
  assertEquals(r.exitCode, 0);
  assertEquals(t.calls[0].input, "echo hi\n");
  // Upload into a private directory; run inside it with a private umask.
  assertMatch(t.calls[0].remote, /^umask 077; d=\$\(mktemp -d /);
  assertEquals(
    t.calls[1].remote,
    "cd '/tmp/emudhra.Ab12Cd' && umask 077 && { sh probe.sh < /dev/null > out 2> err; echo rc=$?; wc -c < out; wc -c < err; }",
  );
  const reads = t.calls.filter((c) => c.remote.startsWith("tail"));
  // 3 * CHUNK_BYTES + 1 bytes of output (é is two) is four reads; stderr one.
  assertEquals(reads.length, 4 + 1);
  assertEquals(t.calls.at(-1)!.remote, `rm -rf '${t.f}'`);
  // No remote command carries what cmd.exe would read.
  for (const c of t.calls) assertCmdSafe("remote", c.remote);
});

Deno.test("runOverWindowsSsh: a failed read still removes the files", async () => {
  const t = fakeTarget(enc("x".repeat(CHUNK_BYTES + 10)), { failRead: true });
  await assertRejects(
    () => runOverWindowsSsh(t.session, "true"),
    Error,
    "reading the output back failed at byte 65536",
  );
  assert(t.calls.at(-1)!.remote.startsWith("rm -rf '/tmp/emudhra."));
});

Deno.test("runOverWindowsSsh: a refused upload reports ssh's error and runs nothing", async () => {
  const calls: string[] = [];
  const r = await runOverWindowsSsh((remote) => {
    calls.push(remote);
    return Promise.resolve({
      stdout: new Uint8Array(),
      stderr: "Permission denied (publickey).",
      exitCode: 255,
    });
  }, "true");
  assertEquals(r, {
    stdout: "",
    stderr: "Permission denied (publickey).",
    exitCode: 255,
  });
  assertEquals(calls.length, 1);
});

Deno.test("runOverWindowsSsh: an odd mktemp answer is refused before use", async () => {
  await assertRejects(
    () =>
      runOverWindowsSsh(
        () =>
          Promise.resolve({
            stdout: enc("/tmp/x'; rm -rf ~\n"),
            stderr: "",
            exitCode: 0,
          }),
        "true",
      ),
    Error,
    "temporary directory",
  );
});

Deno.test("cmdLine quotes every argument and refuses what cmd.exe would read", () => {
  assertEquals(
    cmdLine(
      ["-o", "BatchMode=yes", "-i", "C:\\keys\\my key", "--", "u@h"],
      "uname -s",
      {
        stdout: "C:\\t\\out",
        stderr: "C:\\t\\err",
      },
    ),
    '"ssh "-o" "BatchMode=yes" "-i" "C:\\keys\\my key" "--" "u@h" "uname -s" <NUL >"C:\\t\\out" 2>"C:\\t\\err""',
  );
  assertThrows(
    () => cmdLine(["-i", "C:\\%TEMP%\\k"], "x", { stdout: "o", stderr: "e" }),
    Error,
    "cmd.exe",
  );
  assertThrows(() => assertCmdSafe("x", 'a"b'));
});

Deno.test("assertCmdSafe refuses a trailing backslash", () => {
  assertThrows(() => assertCmdSafe("ssh argument", "C:\\keys\\"));
  assertCmdSafe("ssh argument", "C:\\keys\\id");
});
