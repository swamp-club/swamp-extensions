import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { buildShProbe, shQuote, TRUSTED_SH } from "./probe_sh.ts";
import { buildWindowsProbe, psQuote } from "./probe_windows.ts";
import {
  assertSafeDockerRef,
  buildTransport,
  containerExitMessage,
  directProbe,
  DOCKER_NO_SH,
  type Exec,
  makeRunner,
  NOT_FOUND_EXIT,
  runArgv,
  type RunResult,
  scanTarget,
  type Shell,
  sshArgv,
  TIMEOUT_EXIT,
  wrapScript,
} from "./transport.ts";

const quiet = { info: () => {}, debug: () => {} };

Deno.test("the sh probe parses as POSIX sh, with search paths quoted", async () => {
  const script = buildShProbe(["/srv/my app", "/opt/it's"]);
  assertStringIncludes(script, "'/srv/my app'");
  assertStringIncludes(script, `'/opt/it'\\''s'`);
  const out = await new Deno.Command("sh", {
    args: ["-n", "-c", script],
    stdout: "piped",
    stderr: "piped",
  }).output();
  assertEquals(new TextDecoder().decode(out.stderr), "");
  assertEquals(out.code, 0);
});

Deno.test("the sh probe never runs a binary others can write, and reports it", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const bin = `${dir}/v24.22.0/bin`;
    await Deno.mkdir(bin, { recursive: true });
    await Deno.writeTextFile(
      `${bin}/node`,
      `#!/bin/sh\ntouch ${dir}/RAN\necho v1.0.0\n`,
    );
    await Deno.chmod(`${bin}/node`, 0o755);
    // World-writable: anyone could have planted it.
    await Deno.chmod(bin, 0o777);
    const out = await new Deno.Command("sh", {
      args: ["-c", buildShProbe([])],
      env: { PATH: `${bin}:/usr/bin:/bin` },
      stdout: "piped",
      stderr: "null",
    }).output();
    const text = new TextDecoder().decode(out.stdout);
    const real = await Deno.realPath(`${bin}/node`);
    assertStringIncludes(text, `NOTRUN|${real}`);
    assertStringIncludes(text, `NODE|${real}||v24.22.0|?`);
    await assertRejects(() => Deno.stat(`${dir}/RAN`));
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("a lockfile directory named with \\n cannot forge probe lines", async () => {
  const dir = await Deno.makeTempDir();
  try {
    // A literal backslash-n, which awk -v would turn into a line break.
    const evil = `${dir}/x\\nMAPS|1|node|cron.service|\\lib\\libbrotlidec.so`;
    await Deno.mkdir(evil, { recursive: true });
    await Deno.writeTextFile(`${evil}/requirements.txt`, "brotli==1.2.0\n");
    const out = await new Deno.Command("sh", {
      args: ["-c", buildShProbe([dir])],
      stdout: "piped",
      stderr: "null",
    }).output();
    const lines = new TextDecoder().decode(out.stdout).split("\n");
    assert(!lines.some((l) => l.startsWith("MAPS|")));
    assert(
      lines.some((l) => l.startsWith("LOCK|") && l.includes("brotli==1.2.0")),
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("the sh probe refuses relative or multi-line search paths", () => {
  assertThrows(() => buildShProbe(["srv"]));
  assertThrows(() => buildShProbe(["/srv\n/etc"]));
});

Deno.test("the Windows probe quotes search paths and skips POSIX ones", () => {
  const script = buildWindowsProbe(["C:\\Users\\o'neil\\src", "/srv"]);
  assertStringIncludes(script, psQuote("C:\\Users\\o'neil\\src"));
  assert(!script.includes("'/srv'"));
  assertThrows(() => buildWindowsProbe(["relative\\path"]));
  assertEquals(psQuote("a\u2019b"), "'a\u2019\u2019b'");
  // The NODE line has the four fields the parser reads.
  assertStringIncludes(script, "'NODE|' + $i.FullName + '||' + $v + '|'");
});

Deno.test("shQuote leaves plain words alone", () => {
  assertEquals(shQuote("/usr/bin/apt-get"), "/usr/bin/apt-get");
  assertEquals(shQuote("a b"), "'a b'");
});

Deno.test("buildTransport: local aliases, ssh args, and docker refs", () => {
  assertEquals(
    buildTransport({ targetHost: "::1", sshUser: "root" }).kind,
    "local",
  );
  const ssh = buildTransport({
    targetHost: "web1",
    sshUser: "ops",
    sshKey: "/k",
  });
  assert(ssh.kind === "ssh");
  assertEquals(ssh.args.slice(-2), ["--", "ops@web1"]);
  assert(ssh.args.includes("/k"));
  assertThrows(() => assertSafeDockerRef("dockerImage", "--privileged"));
  assertThrows(() =>
    buildTransport({
      targetHost: "x",
      sshUser: "root",
      dockerContainer: "-it",
    })
  );
});

Deno.test("runArgv reports a missing program as exit 127", async () => {
  const r = await runArgv(["definitely-not-a-real-binary-h2s"], 5000);
  assertEquals(r.exitCode, NOT_FOUND_EXIT);
});

Deno.test("the local runner stops a command that runs too long", async () => {
  const run = makeRunner({ kind: "local" }, quiet);
  const r = await run("sleep 5", 200);
  assertEquals(r.exitCode, TIMEOUT_EXIT);
  assertStringIncludes(r.stderr, "timed out");
});

Deno.test("containerExitMessage explains an exited container", () => {
  assertEquals(containerExitMessage("img", "true 0", ""), null);
  const m = containerExitMessage("img", "false 1", "sh: cannot fork");
  assertStringIncludes(m!, "pids limit");
});

Deno.test("DOCKER_NO_SH matches docker's missing-sh errors", () => {
  assert(
    DOCKER_NO_SH.test(
      'OCI runtime exec failed: exec failed: unable to start container process: exec: "sh": executable file not found in $PATH: unknown',
    ),
  );
  assert(!DOCKER_NO_SH.test("Error: No such container: abc"));
});

/** A runner that answers the sh probe, or reports sh missing. */
function fakeRunner(
  answer: (cmd: string, shell: Shell) => RunResult,
): {
  run: (c: string, t?: number, s?: Shell) => Promise<RunResult>;
  calls: Shell[];
} {
  const calls: Shell[] = [];
  return {
    calls,
    run: (c, _t, s = "sh") => {
      calls.push(s);
      return Promise.resolve(answer(c, s));
    },
  };
}

const OK_PROBE = "HOSTNAME|h\nUID|0\nKERNEL|Linux\nOS|ID=debian\nEND|1";

Deno.test("scanTarget: the sh probe result is analyzed", async () => {
  const f = fakeRunner(() => ({ stdout: OK_PROBE, stderr: "", exitCode: 0 }));
  const { status } = await scanTarget(f.run, null, "h", {
    inContainer: false,
    searchPaths: [],
  });
  assertEquals(status.probe, "sh");
  assertEquals(f.calls, ["sh"]);
});

Deno.test("scanTarget: a host without sh gets the PowerShell probe", async () => {
  const f = fakeRunner((_c, s) =>
    s === "sh"
      ? {
        stdout: "",
        stderr:
          "'sh' is not recognized as an internal or external command, operable program or batch file.",
        exitCode: 1,
      }
      : {
        stdout: "HOSTNAME|WIN\r\nKERNEL|Windows\r\nOS|ID=windows\r\nEND|1\r\n",
        stderr: "",
        exitCode: 0,
      }
  );
  const { status } = await scanTarget(f.run, null, "win", {
    inContainer: false,
    searchPaths: [],
  });
  assertEquals(f.calls, ["sh", "powershell"]);
  assertEquals(status.probe, "powershell");
  assertEquals(status.os.id, "windows");
});

Deno.test("scanTarget: a probe cut short is an error, never a clean result", async () => {
  const f = fakeRunner(() => ({
    stdout: "HOSTNAME|h\nUID|0\nPKG|dpkg|libbrotli1|1.0.9-2",
    stderr: "timed out after 180s",
    exitCode: TIMEOUT_EXIT,
  }));
  await assertRejects(
    () => scanTarget(f.run, null, "h", { inContainer: false, searchPaths: [] }),
    Error,
    "Incomplete scan",
  );
  const none = fakeRunner(() => ({
    stdout: "",
    stderr: "Permission denied (publickey)",
    exitCode: 255,
  }));
  await assertRejects(
    () =>
      scanTarget(none.run, null, "h", { inContainer: false, searchPaths: [] }),
    Error,
    "Permission denied",
  );
});

Deno.test("scanTarget: a container without sh is checked through its runtimes", async () => {
  const f = fakeRunner(() => ({
    stdout: "",
    stderr:
      'OCI runtime exec failed: exec failed: unable to start container process: exec: "sh": executable file not found in $PATH',
    exitCode: 127,
  }));
  const execd: string[][] = [];
  const exec: Exec = (argv) => {
    execd.push(argv);
    if (argv[0] === "/nodejs/bin/node") {
      return Promise.resolve({
        stdout: "v24.22.0 1.2.0 /nodejs/bin/node",
        stderr: "",
        exitCode: 0,
      });
    }
    return Promise.resolve({ stdout: "", stderr: "not found", exitCode: 127 });
  };
  const { status } = await scanTarget(f.run, exec, "distroless", {
    inContainer: true,
    searchPaths: [],
    entrypoint: () => Promise.resolve(["/nodejs/bin/node"]),
  });
  assertEquals(status.probe, "direct");
  assertEquals(execd[0][0], "/nodejs/bin/node");
  const node = status.findings.find((x) => x.kind === "node")!;
  assertEquals(node.verdict, "vulnerable");
  assertEquals(node.action, "rebuild-image");
  assert(status.notChecked.some((n) => n.includes("no sh")));
});

Deno.test("directProbe lists Python packages from the interpreter", async () => {
  const exec: Exec = (argv) => {
    if (argv[0] === "python3") {
      return Promise.resolve({
        stdout:
          "PYENV|/usr/lib/python3/dist-packages\nPYPKG|/usr/lib/python3/dist-packages|Brotli-1.2.0.dist-info\nnoise",
        stderr: "",
        exitCode: 0,
      });
    }
    return Promise.resolve({ stdout: "", stderr: "", exitCode: 127 });
  };
  const text = await directProbe(exec, "img", []);
  assertStringIncludes(
    text,
    "PYPKG|/usr/lib/python3/dist-packages|Brotli-1.2.0.dist-info",
  );
  assert(!text.includes("noise"));
  assertStringIncludes(text, "END|1");
});

/** Writes an executable sh script. */
async function script(path: string, body: string): Promise<void> {
  await Deno.writeTextFile(path, `#!/bin/sh\n${body}\n`);
  await Deno.chmod(path, 0o755);
}

/**
 * A temp directory every ancestor of which passes trusted(): under $HOME,
 * since /tmp is world-writable on Linux.
 */
function trustedTempDir(): Promise<string> {
  return Deno.makeTempDir({ dir: Deno.env.get("HOME"), prefix: ".h2s-test-" });
}

/**
 * Removes group and other write from a fixture tree, which a umask of 002
 * leaves on files and directories Deno creates.
 */
async function tidy(path: string): Promise<void> {
  await new Deno.Command("sh", {
    args: ["-c", 'chmod -R go-w "$1"', "sh", path],
  }).output();
}

/** Runs sh code after TRUSTED_SH, with these environment variables. */
async function withTrusted(
  code: string,
  env: Record<string, string> = {},
): Promise<string> {
  const out = await new Deno.Command("sh", {
    args: ["-c", `${TRUSTED_SH}\n${code}`],
    env,
    stdout: "piped",
    stderr: "null",
  }).output();
  return new TextDecoder().decode(out.stdout).trim();
}

Deno.test("listener rows are sanitised, and a line break in a process name forges none", async () => {
  const dir = await Deno.makeTempDir();
  try {
    // What ss prints for a process named "x\nLISTEN 0 0 *:1" (15 bytes) and
    // one with a | in its name.
    await script(
      `${dir}/ss`,
      [
        "printf '%s\\n'",
        `'LISTEN 0 4096 0.0.0.0:8080 0.0.0.0:* users:(("a|b",pid=7,fd=3))'`,
        // Names with a line break: "x\nLISTEN 0 0 *:1", "\nLISTEN 0 0 1 2",
        // "\nLISTEN 0 0 :1 ", and two processes sharing one socket.
        `'LISTEN 0 4096 127.0.0.1:9 0.0.0.0:* users:(("x'`,
        `'LISTEN 0 0 *:1",pid=8,fd=3))'`,
        `'LISTEN 0 4096 127.0.0.1:10 0.0.0.0:* users:(("'`,
        `'LISTEN 0 0 1 2",pid=9,fd=3))'`,
        `'LISTEN 0 4096 127.0.0.1:11 0.0.0.0:* users:(("'`,
        `'LISTEN 0 0 :1 ",pid=10,fd=3))'`,
        `'LISTEN 0 4096 127.0.0.1:12 0.0.0.0:* users:(("x'`,
        `'LISTEN 0 0",pid=11,fd=3),(" *:443 z",pid=12,fd=3))'`,
      ].join(" "),
    );
    const out = await new Deno.Command("sh", {
      args: ["-c", buildShProbe([])],
      env: { PATH: `${dir}:/usr/bin:/bin` },
      stdout: "piped",
      stderr: "null",
    }).output();
    const listen = new TextDecoder().decode(out.stdout).split("\n").filter(
      (l) => l.startsWith("LISTEN|"),
    );
    assertEquals(listen.length, 5);
    assertStringIncludes(listen[0], '(("a?b",pid=7');
    assert(listen.every((l) => l.startsWith("LISTEN|LISTEN 0 4096 ")));
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("trusted and tree_ok refuse a Linux ACL that lets another user write", async () => {
  const dir = await trustedTempDir();
  try {
    const bin = `${dir}/bin`;
    const tree = `${dir}/tree`;
    await Deno.mkdir(bin);
    await Deno.mkdir(`${tree}/pip`, { recursive: true });
    await Deno.writeTextFile(`${tree}/pip/__init__.py`, "");
    // Linux, every path shown with an ACL, and getfacl printing $FACL.
    await script(`${bin}/uname`, "echo Linux");
    await script(
      `${bin}/ls`,
      `/bin/ls "$@" | sed 's/^\\([-dl][rwxsStT-]\\{9\\}\\)[@+.]\\{0,1\\} /\\1+ /'`,
    );
    await script(`${bin}/getfacl`, `[ -n "$FACL" ] || exit 1; printf "$FACL"`);
    await tidy(dir);
    const check = (facl: string) =>
      withTrusted(
        `trusted "$T/pip/__init__.py" && echo T; tree_ok "$T" && echo D`,
        { PATH: `${bin}:/usr/bin:/bin`, T: tree, FACL: facl },
      );
    const base = "user::rw-\\ngroup::r--\\nmask::r--\\nother::r--\\n";
    assertEquals(await check(base), "T\nD");
    // setfacl -m u:1234:rw: another user can write.
    assertEquals(await check(`${base}user:1234:rw-\\n`), "");
    // The mask removes the w; a default entry only shapes new files.
    assertEquals(
      await check(`${base}user:1234:rw-\\t#effective:r--\\n`),
      "T\nD",
    );
    assertEquals(await check(`${base}default:user:1234:rwx\\n`), "T\nD");
    // getfacl missing or failing: the ACL cannot be read, so refuse.
    assertEquals(await check(""), "");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test({
  name: "trusted refuses a macOS ACL that allows write, not a deny-only one",
  ignore: Deno.build.os !== "darwin",
  fn: async () => {
    const dir = await Deno.makeTempDir();
    try {
      const f = `${dir}/f`;
      await Deno.writeTextFile(f, "");
      const chmod = (acl: string) =>
        new Deno.Command("sh", {
          args: ["-c", 'chmod +a "$1" "$2"', "sh", acl, f],
        }).output();
      const check = () => withTrusted(`trusted "$F" && echo T`, { F: f });
      await chmod("everyone deny delete");
      assertEquals(await check(), "T");
      await chmod(`user:${Deno.env.get("USER")} allow write`);
      assertEquals(await check(), "T");
      await chmod("user:nobody allow write");
      assertEquals(await check(), "");
    } finally {
      // The deny delete entry would stop the cleanup.
      await new Deno.Command("sh", {
        args: ["-c", 'chmod -N "$1"', "sh", `${dir}/f`],
      }).output();
      await Deno.remove(dir, { recursive: true });
    }
  },
});

Deno.test("macOS ACL entries are read by principal, and an unreadable one refuses", async () => {
  const dir = await trustedTempDir();
  try {
    const bin = `${dir}/bin`;
    await Deno.mkdir(bin);
    await Deno.writeTextFile(`${dir}/f`, "");
    // macOS, every path shown with an ACL, and ls -lde listing $MACL.
    await script(`${bin}/uname`, "echo Darwin");
    await script(
      `${bin}/ls`,
      [
        `/bin/ls -ld "$2" | sed 's/^\\([-dl][rwxsStT-]\\{9\\}\\)[@+.]\\{0,1\\} /\\1+ /'`,
        `[ "$1" = -lde ] && printf "$MACL"`,
      ].join("\n"),
    );
    await tidy(dir);
    const check = (macl: string) =>
      withTrusted(`acl_ok "$F" && echo T`, {
        PATH: `${bin}:/usr/bin:/bin`,
        F: `${dir}/f`,
        MACL: macl,
      });
    const me = (await new Deno.Command("sh", {
      args: ["-c", "id -un"],
      stdout: "piped",
    }).output()).stdout;
    const user = new TextDecoder().decode(me).trim();
    assertEquals(
      await check(" 0: group:everyone inherited deny delete\\n"),
      "T",
    );
    assertEquals(await check(" 0: user:root allow write\\n"), "T");
    assertEquals(await check(` 0: user:${user} allow write,append\\n`), "T");
    assertEquals(await check(" 0: user:mallory allow write\\n"), "");
    // A principal with a space in its name.
    assertEquals(await check(" 0: group:Some Group allow write\\n"), "");
    assertEquals(
      await check(" 0: group:Some Group inherited allow add_file\\n"),
      "",
    );
    assertEquals(await check(" 0: unparseable\\n"), "");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("site directories are reported by their resolved path, as /proc maps show them", async () => {
  const dir = await trustedTempDir();
  try {
    // The venv's lib is a symlink, as with a venv on a linked volume.
    await Deno.mkdir(`${dir}/real/python3.12/site-packages`, {
      recursive: true,
    });
    await Deno.mkdir(`${dir}/src/venv/bin`, { recursive: true });
    await Deno.writeTextFile(`${dir}/src/venv/pyvenv.cfg`, "");
    await Deno.symlink(`${dir}/real`, `${dir}/src/venv/lib`);
    const out = await new Deno.Command("sh", {
      args: ["-c", buildShProbe([`${dir}/src`])],
      stdout: "piped",
      stderr: "null",
    }).output();
    const real = await Deno.realPath(`${dir}/real/python3.12/site-packages`);
    assertStringIncludes(
      new TextDecoder().decode(out.stdout),
      `PYENV|${real}|`,
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("a venv's pyvenv.cfg must be trusted, with a trusted install in home", async () => {
  const dir = await trustedTempDir();
  try {
    /** An install: bin/python3.12 and its lib/python3.12 standard library. */
    const install = async (prefix: string) => {
      await Deno.mkdir(`${prefix}/bin`, { recursive: true });
      await Deno.mkdir(`${prefix}/lib/python3.12`, { recursive: true });
      await Deno.writeTextFile(`${prefix}/lib/python3.12/os.py`, "");
      await script(`${prefix}/bin/python3.12`, "exit 0");
    };
    const base = `${dir}/base/bin`;
    const venv = `${dir}/src/venv`;
    await install(`${dir}/base`);
    await Deno.mkdir(`${venv}/bin`, { recursive: true });
    await Deno.mkdir(`${venv}/lib/python3.12/site-packages`, {
      recursive: true,
    });
    const ok = async (cfg: string, mode = 0o644) => {
      await Deno.writeTextFile(`${venv}/pyvenv.cfg`, cfg);
      await Deno.chmod(`${venv}/pyvenv.cfg`, mode);
      const out = await new Deno.Command("sh", {
        args: ["-c", buildShProbe([`${dir}/src`])],
        stdout: "piped",
        stderr: "null",
      }).output();
      const line = new TextDecoder().decode(out.stdout).split("\n").find((
        l,
      ) => l.startsWith("PYENV|") && l.includes("/src/venv/"));
      return line?.split("|").at(-1);
    };
    // A symlinked venv.
    await Deno.symlink(`${base}/python3.12`, `${venv}/bin/python3.12`);
    await tidy(dir);
    assertEquals(await ok(`home = ${base}\nversion = 3.12.4\n`), "1");
    assertEquals(await ok("version = 3.12.4\n"), "1");
    // Homebrew: home is an opt/ link whose interpreter resolves into the
    // framework, not into the directory home resolves to.
    const fw = `${dir}/Cellar/Frameworks`;
    await install(fw);
    await Deno.mkdir(`${dir}/Cellar/bin`);
    await Deno.symlink(`${fw}/bin/python3.12`, `${dir}/Cellar/bin/python3.12`);
    await Deno.symlink(`${dir}/Cellar/bin`, `${dir}/opt-bin`);
    await tidy(dir);
    assertEquals(await ok(`home = ${dir}/opt-bin\n`), "1");
    // home with no interpreter, a relative one, or a missing one.
    await Deno.mkdir(`${dir}/other/bin`, { recursive: true });
    await tidy(dir);
    assertEquals(await ok(`home = ${dir}/other/bin\n`), "0");
    assertEquals(await ok("home = base/bin\n"), "0");
    assertEquals(await ok(`home = ${dir}/missing\n`), "0");
    // Python reads the key in any case.
    assertEquals(await ok(`Home = ${dir}/other/bin\n`), "0");
    // An interpreter with no standard library next to it.
    await script(`${dir}/other/bin/python3.12`, "exit 0");
    assertEquals(await ok(`home = ${dir}/other/bin\n`), "0");
    await Deno.mkdir(`${dir}/other/lib/python3.12`, { recursive: true });
    await tidy(dir);
    assertEquals(await ok(`home = ${dir}/other/bin\n`), "1");
    // A standard library others can change, or an interpreter they can.
    await Deno.chmod(`${dir}/other/lib/python3.12`, 0o777);
    assertEquals(await ok(`home = ${dir}/other/bin\n`), "0");
    await Deno.chmod(`${dir}/other/lib/python3.12`, 0o755);
    await Deno.chmod(`${dir}/other/bin`, 0o777);
    assertEquals(await ok(`home = ${dir}/other/bin\n`), "0");
    // The cfg itself writable by others.
    assertEquals(await ok(`home = ${base}\n`, 0o666), "0");
    // The base install's site directories would be on sys.path too.
    assertEquals(
      await ok(`home = ${base}\nInclude-System-Site-Packages = True\n`),
      "0",
    );
    assertEquals(
      await ok(`home = ${base}\ninclude-system-site-packages = false\n`),
      "1",
    );
    // A pyvenv.cfg next to the interpreter is read first, and checked too.
    await Deno.writeTextFile(
      `${venv}/bin/pyvenv.cfg`,
      `home = ${dir}/other/bin\n`,
    );
    await Deno.chmod(`${venv}/bin/pyvenv.cfg`, 0o644);
    assertEquals(await ok(`home = ${base}\n`), "0");
    await Deno.remove(`${venv}/bin/pyvenv.cfg`);
    // A --copies venv: its interpreter is a real file, and home is the
    // install it was copied from.
    await Deno.remove(`${venv}/bin/python3.12`);
    await script(`${venv}/bin/python3.12`, "exit 0");
    await tidy(venv);
    assertEquals(await ok(`home = ${base}\n`), "1");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ssh runs sh -s with the script on stdin, which no command can consume", async () => {
  assertEquals(sshArgv(["--", "u@h"], false), ["ssh", "--", "u@h", "sh -s"]);
  const out = await new Deno.Command("sh", {
    args: ["-s"],
    stdin: "piped",
    stdout: "piped",
  });
  const child = out.spawn();
  const w = child.stdin.getWriter();
  await w.write(
    new TextEncoder().encode(
      wrapScript('read x; echo "read:$x"\necho after'),
    ),
  );
  await w.close();
  const r = await child.output();
  assertEquals(new TextDecoder().decode(r.stdout), "read:\nafter\n");
});
