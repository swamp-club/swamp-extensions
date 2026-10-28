// Copyright (C) 2026 Adam Jacob
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
  assertRejects,
  assertStringIncludes,
} from "@std/assert";
import {
  execSudo,
  getConnection,
  installStagedScript,
  prepareSocketDir,
  shellEscape,
  SUDO_OK,
  writeFileAs,
} from "./ssh.ts";
import { withFakeSsh } from "./fake_ssh.ts";

Deno.test("shellEscape survives a real shell round trip", async () => {
  for (
    const s of ["plain", "it's", "a b", "$(id)", "`id`", "x\ny", "'\"'", ""]
  ) {
    const out = await new Deno.Command("sh", {
      args: ["-c", `printf %s ${shellEscape(s)}`],
      stdout: "piped",
    }).output();
    assertEquals(new TextDecoder().decode(out.stdout), s);
  }
});

const conn = () =>
  getConnection({ host: "web-1", username: "deploy", port: 2222 });

Deno.test("execSudo runs the command as-is without become", async () => {
  await withFakeSsh([], async (fake) => {
    await execSudo(await conn(), "uptime");
    assertEquals(await fake.commands(), ["uptime"]);
  });
});

Deno.test("execSudo wraps the command in sudo -n as becomeUser", async () => {
  await withFakeSsh([], async (fake) => {
    await execSudo(await conn(), "cat '/etc/x'", {
      become: true,
      becomeUser: "app",
    });
    const [cmd] = await fake.commands();
    assert(cmd.startsWith("sudo -n -u 'app' -- sh -c '"), cmd);
    assertStringIncludes(cmd, SUDO_OK);
    assertStringIncludes(cmd, `cat '\\''/etc/x'\\''`);
  });
});

Deno.test("execSudo sends becomePassword on stdin, never in argv", async () => {
  await withFakeSsh([], async (fake) => {
    await execSudo(await conn(), "id", {
      become: true,
      becomePassword: "hunter2",
    });
    const [cmd] = await fake.commands();
    assert(cmd.startsWith("sudo -S -p '' -u 'root' -- sh -c '"), cmd);
    assert(cmd.endsWith("; id'"), cmd);
    assert(!cmd.includes("hunter2"));
  });
});

Deno.test("execSudo reports the remote exit code and output", async () => {
  await withFakeSsh(
    [{ match: "false", stdout: "nope\n", exitCode: 3 }],
    async () => {
      const r = await execSudo(await conn(), "false");
      assertEquals(r.exitCode, 3);
      assertEquals(r.stdout, "nope\n");
    },
  );
});

Deno.test("writeFileAs without become stages then renames as the SSH user", async () => {
  await withFakeSsh([], async (fake) => {
    await writeFileAs(await conn(), "/home/deploy/a", "hello");
    assertEquals(await fake.uploads(), new Map([["/home/deploy/a", "hello"]]));
    const [install] = await fake.commands();
    assert(!install.includes("sudo"), install);
    assertStringIncludes(install, "/tmp/.swamp-upload-");
    assertStringIncludes(install, "dest='/home/deploy/a'");
  });
});

Deno.test("writeFileAs with become stages in /tmp then sudo-moves", async () => {
  await withFakeSsh([], async (fake) => {
    await writeFileAs(await conn(), "/etc/motd", "hi", { become: true });
    assertEquals(await fake.uploads(), new Map([["/etc/motd", "hi"]]));
    const [install] = await fake.commands();
    assertStringIncludes(install, "sudo -n -u 'root' -- sh -c");
    assertStringIncludes(install, "/tmp/.swamp-upload-");
    assertStringIncludes(install, "/etc/motd");
  });
});

Deno.test("writeFileAs removes the staged file when the move fails", async () => {
  await withFakeSsh(
    [{ match: "mv ", exitCode: 1, stdout: "" }],
    async (fake) => {
      let threw = false;
      try {
        await writeFileAs(await conn(), "/etc/motd", "hi", { become: true });
      } catch {
        threw = true;
      }
      assert(threw);
      const cmds = await fake.commands();
      assertEquals(cmds.length, 2);
      assert(cmds[1].startsWith("rm -f '/tmp/.swamp-upload-"));
    },
  );
});

// These run against a private base directory, never the real /tmp one a
// concurrent swamp run could be using.
Deno.test("socket directory is private to the current user", async () => {
  const base = await Deno.makeTempDir();
  try {
    const dir = await prepareSocketDir(base);
    const info = await Deno.lstat(dir);
    assert(info.isDirectory && !info.isSymlink);
    assertEquals((info.mode ?? 0) & 0o077, 0);
  } finally {
    await Deno.remove(base, { recursive: true });
  }
});

Deno.test("socket directory is refused when others can reach it", async () => {
  const base = await Deno.makeTempDir();
  try {
    const dir = await prepareSocketDir(base);
    await Deno.chmod(dir, 0o777);
    await assertRejects(() => prepareSocketDir(base), Error, "accessible");
  } finally {
    await Deno.remove(base, { recursive: true });
  }
});

Deno.test("socket directory is refused when it is a symlink", async () => {
  const base = await Deno.makeTempDir();
  try {
    const real = await prepareSocketDir(base);
    await Deno.rename(real, `${real}-elsewhere`);
    await Deno.symlink(`${real}-elsewhere`, real);
    await assertRejects(() => prepareSocketDir(base), Error, "not a directory");
  } finally {
    await Deno.remove(base, { recursive: true });
  }
});

Deno.test("connections with different identity files use separate sockets", async () => {
  await withFakeSsh([], async () => {
    const a = await getConnection({
      host: "web-9",
      username: "deploy",
      privateKeyPath: "/keys/a",
    });
    const b = await getConnection({
      host: "web-9",
      username: "deploy",
      privateKeyPath: "/keys/b",
    });
    assert(a.socketPath !== b.socketPath);
    assertEquals(b.identityFile, "/keys/b");
  });
});

Deno.test("an authentication failure fails at once instead of retrying", async () => {
  const dir = await Deno.makeTempDir();
  const originalPath = Deno.env.get("PATH");
  try {
    // A master that never comes up because the key is refused.
    await Deno.writeTextFile(
      `${dir}/ssh`,
      `#!/bin/sh
case " $* " in *" -O "*) exit 1 ;; esac
echo "deploy@web-8: Permission denied (publickey)." >&2
exit 255
`,
      { mode: 0o755 },
    );
    Deno.env.set("PATH", `${dir}:${originalPath ?? ""}`);
    const started = Date.now();
    await assertRejects(
      () => getConnection({ host: "web-8", username: "deploy" }),
      Error,
      "Permission denied",
    );
    assert(Date.now() - started < 5000, "retried a permanent failure");
  } finally {
    if (originalPath === undefined) Deno.env.delete("PATH");
    else Deno.env.set("PATH", originalPath);
    await Deno.remove(dir, { recursive: true });
  }
});

async function runInstall(staged: string, dest: string): Promise<number> {
  const user = new TextDecoder().decode(
    (await new Deno.Command("id", { args: ["-un"], stdout: "piped" }).output())
      .stdout,
  ).trim();
  const out = await new Deno.Command("sh", {
    args: ["-c", installStagedScript(staged, dest, user)],
    stderr: "piped",
  }).output();
  return out.code;
}

Deno.test("staged install keeps an existing file's mode", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(`${dir}/dest`, "old", { mode: 0o600 });
    await Deno.chmod(`${dir}/dest`, 0o600);
    await Deno.writeTextFile(`${dir}/staged`, "new", { mode: 0o644 });
    assertEquals(await runInstall(`${dir}/staged`, `${dir}/dest`), 0);
    assertEquals(await Deno.readTextFile(`${dir}/dest`), "new");
    assertEquals((await Deno.stat(`${dir}/dest`)).mode! & 0o777, 0o600);
    assertEquals(
      [...Deno.readDirSync(dir)].map((e) => e.name),
      ["dest"],
      "staged and intermediate files are removed",
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("staged install creates a missing file", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(`${dir}/staged`, "fresh");
    assertEquals(await runInstall(`${dir}/staged`, `${dir}/dest`), 0);
    assertEquals(await Deno.readTextFile(`${dir}/dest`), "fresh");
    assertEquals([...Deno.readDirSync(dir)].map((e) => e.name), ["dest"]);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("getConnection refuses hosts and users ssh would read as options", async () => {
  await withFakeSsh([], async (fake) => {
    for (
      const opts of [
        { host: "-oProxyCommand=touch /tmp/pwned", username: "deploy" },
        { host: "web-1", username: "-oProxyCommand=id" },
        { host: "web 1", username: "deploy" },
        { host: "web-1/../x", username: "deploy" },
        { host: "web-1", username: "deploy", port: 0 },
      ]
    ) {
      await assertRejects(() => getConnection(opts), Error, "Invalid SSH");
    }
    assertEquals(await fake.commands(), []);
  });
});

Deno.test("getConnection accepts hostnames, IPv4 and IPv6 addresses", async () => {
  await withFakeSsh([], async () => {
    for (const host of ["web-1.example.com", "192.0.2.10", "2001:db8::1"]) {
      const conn = await getConnection({ host, username: "deploy" });
      assertEquals(conn.host, host);
    }
  });
});

Deno.test("staged install succeeds when the staged file cannot be removed", async () => {
  // A non-root become user installs from the SSH user's private staging dir,
  // where it may read but not delete: cleanup failing must not fail the run.
  const dir = await Deno.makeTempDir();
  try {
    await Deno.mkdir(`${dir}/stage`);
    await Deno.writeTextFile(`${dir}/stage/upload`, "data");
    await Deno.chmod(`${dir}/stage`, 0o555);
    assertEquals(await runInstall(`${dir}/stage/upload`, `${dir}/dest`), 0);
    assertEquals(await Deno.readTextFile(`${dir}/dest`), "data");
  } finally {
    await Deno.chmod(`${dir}/stage`, 0o755);
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("a password sudo did not read never reaches the command's stdin", async () => {
  await withFakeSsh([], async (fake) => {
    await execSudo(await conn(), "cat", {
      become: true,
      becomePassword: "hunter2",
    });
    const [cmd] = await fake.commands();
    // The shell sudo would start: everything after `sh -c `, still quoted.
    const quoted = cmd.slice(cmd.indexOf("sh -c ") + "sh -c ".length);
    // As with NOPASSWD sudo, the password line is left unread on stdin.
    const out = await new Deno.Command("sh", {
      args: ["-c", `eval "set -- $Q"; printf 'hunter2\\n' | sh -c "$1"`],
      env: { Q: quoted, PATH: "/usr/bin:/bin" },
      stdout: "piped",
    }).output();
    const stdout = new TextDecoder().decode(out.stdout);
    assertEquals(stdout, `${SUDO_OK}\n`);
  });
});

Deno.test("staged install writes through a symlink, keeping the target's mode", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(`${dir}/target`, "old");
    await Deno.chmod(`${dir}/target`, 0o640);
    await Deno.symlink(`${dir}/target`, `${dir}/link`);
    await Deno.writeTextFile(`${dir}/staged`, "new");
    assertEquals(await runInstall(`${dir}/staged`, `${dir}/link`), 0);
    // The link survives and the content lands in its target...
    assert((await Deno.lstat(`${dir}/link`)).isSymlink);
    assertEquals(await Deno.readTextFile(`${dir}/target`), "new");
    // ...with the target's mode, never the link's own 0777.
    assertEquals((await Deno.stat(`${dir}/target`)).mode! & 0o777, 0o640);
    assertEquals(
      [...Deno.readDirSync(dir)].map((e) => e.name).sort(),
      ["link", "target"],
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("staged install gives a new file mode 0644", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(`${dir}/staged`, "fresh", { mode: 0o600 });
    assertEquals(await runInstall(`${dir}/staged`, `${dir}/dest`), 0);
    assertEquals((await Deno.stat(`${dir}/dest`)).mode! & 0o777, 0o644);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("a long hostname still gives a short control socket path", async () => {
  await withFakeSsh([], async () => {
    const host = "ec2-198-51-100-123.us-west-2.compute.amazonaws.example.com";
    const c = await getConnection({ host, username: "deploy" });
    // ssh appends ~17 bytes while the master starts; macOS caps at 104.
    assert(c.socketPath.length + 17 < 104, c.socketPath);
  });
});

Deno.test("staged install refuses a symlink owned by someone else", async () => {
  const dir = await Deno.makeTempDir();
  const bin = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(`${dir}/target`, "precious");
    await Deno.symlink(`${dir}/target`, `${dir}/link`);
    await Deno.writeTextFile(`${dir}/staged`, "attack");
    // The link is ours; pretend the installer runs as another, non-root uid,
    // as root would be relative to a link a managed user planted.
    await Deno.writeTextFile(
      `${bin}/id`,
      `#!/bin/sh\ncase "$1" in -u) echo 99999 ;; *) exec /usr/bin/id "$@" ;; esac\n`,
      { mode: 0o755 },
    );
    const user = new TextDecoder().decode(
      (await new Deno.Command("id", { args: ["-un"], stdout: "piped" })
        .output()).stdout,
    ).trim();
    const out = await new Deno.Command("sh", {
      args: ["-c", installStagedScript(`${dir}/staged`, `${dir}/link`, user)],
      env: { PATH: `${bin}:/usr/bin:/bin` },
      stderr: "piped",
    }).output();
    assertEquals(out.code, 1);
    assertStringIncludes(
      new TextDecoder().decode(out.stderr),
      "refusing to write through",
    );
    assertEquals(await Deno.readTextFile(`${dir}/target`), "precious");
  } finally {
    await Deno.remove(dir, { recursive: true });
    await Deno.remove(bin, { recursive: true });
  }
});
