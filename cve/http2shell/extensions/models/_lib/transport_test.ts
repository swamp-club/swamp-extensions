import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { buildShProbe, shQuote } from "./probe_sh.ts";
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
  TIMEOUT_EXIT,
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
