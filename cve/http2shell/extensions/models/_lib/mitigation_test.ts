import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { analyze, parseProbe } from "./analysis.ts";
import {
  allowedSteps,
  type FileWriter,
  foreignPath,
  guardedCommand,
  interpreterFor,
  macScript,
  mitigateTarget,
  type MitigationStep,
  parseSudoList,
  planMitigation,
  preflightScript,
  renderStep,
  runsWithoutPassword,
  unitsOf,
  windowsInterpreter,
  windowsScript,
} from "./mitigation.ts";
import type { RunResult, Shell } from "./transport.ts";

const DEBIAN12 = [
  "HOSTNAME|web1",
  "UID|0",
  "KERNEL|Linux",
  "OS|ID=debian",
  "OS|VERSION_ID=12",
  "OS|VERSION_CODENAME=bookworm",
  "TOOL|apt-get|/usr/bin/apt-get",
  "TOOL|systemctl|/usr/bin/systemctl",
  "TOOL|sudo|/usr/bin/sudo",
  "PROCSCOPE|all",
];

const VULNERABLE = [
  ...DEBIAN12,
  "PKG|dpkg|libbrotli1|1.0.9-2",
  "PKG|dpkg|python3-brotli|1.0.9-2",
  "PKG|dpkg|nodejs|18.20.4+dfsg-1~deb12u3",
  "NODE|/usr/bin/node|nodejs|v18.20.4 1.0.9|/lib/x86_64-linux-gnu/libbrotlidec.so.1",
  "LOADED|501|node|api.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
  "LOADED|502|python3|worker.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
  "LOADED|1|systemd|init.scope|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
  "LOADED|900|node||/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
  "END|1",
].join("\n");

const FIXED_STALE = [
  ...DEBIAN12,
  "PKG|dpkg|libbrotli1|1.0.9-2+deb12u1",
  "PKG|dpkg|python3-brotli|1.0.9-2+deb12u1",
  "PKG|dpkg|nodejs|18.20.4+dfsg-1~deb12u3",
  "NODE|/usr/bin/node|nodejs|v18.20.4 1.0.9|/lib/x86_64-linux-gnu/libbrotlidec.so.1",
  "MAPS|501|node|api.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
  "END|1",
].join("\n");

const FIXED_CLEAN = FIXED_STALE.replace(/\nMAPS\|[^\n]*/, "");

function plan(text: string, opts = {}) {
  const facts = parseProbe(text);
  const status = analyze(facts, "web1", { inContainer: false, probe: "sh" });
  return planMitigation(status, facts, {
    restartServices: true,
    upgradePython: false,
    removePythonBrotli: false,
    ...opts,
  });
}

Deno.test("Debian: upgrade the brotli packages, then restart the units that load it", () => {
  const { steps, notes } = plan(VULNERABLE);
  assertEquals(steps[0].argv, ["apt-get", "update"]);
  assertEquals(steps[1].argv.slice(0, 4), [
    "apt-get",
    "install",
    "--only-upgrade",
    "-y",
  ]);
  // Distro node links the library, so only the brotli packages are upgraded.
  assertEquals(steps[1].argv.slice(-2), ["libbrotli1", "python3-brotli"]);
  const restarts = steps.filter((s) => s.phase === "restart").map((s) =>
    s.unit
  );
  assertEquals(restarts, ["api.service", "worker.service"]);
  assert(notes.some((n) => n.includes("node (pid 900)")));
});

Deno.test("restartServices=false plans no restarts and says so", () => {
  const { steps, notes } = plan(VULNERABLE, { restartServices: false });
  assertEquals(steps.filter((s) => s.phase === "restart").length, 0);
  assert(notes.some((n) => n.includes("restartServices=false")));
});

Deno.test("A fixed host with a stale unit only restarts that unit", () => {
  const { steps } = plan(FIXED_STALE);
  assertEquals(steps.map((s) => s.argv), [[
    "systemctl",
    "restart",
    "--",
    "api.service",
  ]]);
});

Deno.test("pip environments: notes by default, upgrade or removal when asked", () => {
  const text = [
    ...DEBIAN12,
    "PYENV|/srv/app/.venv/lib/python3.12/site-packages|0|drwxr-xr-x|venv|1",
    "PYPKG|/srv/app/.venv/lib/python3.12/site-packages|brotli-1.2.0.dist-info",
    "PYENV|/home/a/.local/lib/python3.12/site-packages|1000|drwxr-xr-x|",
    "PYPKG|/home/a/.local/lib/python3.12/site-packages|brotlicffi-1.2.0.1.dist-info",
    "END|1",
  ].join("\n");
  const def = plan(text);
  assertEquals(def.steps.length, 0);
  assert(def.notes.some((n) => n.includes("upgradePython=true")));
  assert(
    def.notes.some((n) =>
      n.includes("/home/a/.local") && n.includes("by hand")
    ),
  );
  const up = plan(text, { upgradePython: true });
  assertEquals(up.steps.map((s) => s.argv), [[
    "/srv/app/.venv/bin/python3.12",
    "-I",
    "-m",
    "pip",
    "install",
    "--upgrade",
    "Brotli>=1.2.1",
    "brotlicffi>=1.2.1.0",
  ]]);
  assertEquals(up.steps[0].privileged, false);
  const rm = plan(text, { removePythonBrotli: true });
  assertEquals(rm.steps[0].argv.slice(1, 6), [
    "-I",
    "-m",
    "pip",
    "uninstall",
    "-y",
  ]);
});

Deno.test("pip steps need a trusted interpreter, and check it again when they run", async () => {
  const text = [
    ...DEBIAN12,
    // Root-owned site-packages, but the probe could not trust its interpreter.
    "PYENV|/srv/app/.venv/lib/python3.12/site-packages|0|drwxr-xr-x|venv|0",
    "PYPKG|/srv/app/.venv/lib/python3.12/site-packages|brotli-1.2.0.dist-info",
    "END|1",
  ].join("\n");
  const p = plan(text, { upgradePython: true });
  assertEquals(p.steps.length, 0);
  assert(
    p.notes.some((n) => n.includes("its interpreter could not be confirmed")),
  );

  // The guard refuses a path others can write, at run time.
  const dir = await Deno.makeTempDir();
  try {
    await Deno.chmod(dir, 0o777);
    const step: MitigationStep = {
      phase: "python",
      argv: ["true"],
      privileged: false,
      purpose: "",
      guard: [dir],
    };
    const cmd = guardedCommand(step, "true");
    const out = await new Deno.Command("sh", {
      args: ["-c", cmd],
      stdout: "null",
      stderr: "piped",
    }).output();
    assertEquals(out.code, 3);
    assertStringIncludes(new TextDecoder().decode(out.stderr), "refused");
    await Deno.chmod(dir, 0o755);
    const ok = await new Deno.Command("sh", { args: ["-c", cmd] }).output();
    assertEquals(ok.code, 0);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
  assertEquals(
    guardedCommand({
      ...{ phase: "upgrade", argv: [], privileged: true, purpose: "" },
    }, "x"),
    "x",
  );
});

Deno.test("pip steps never run another user's, or a group-writable, environment", () => {
  const text = [
    ...DEBIAN12,
    "PYENV|/home/bob/.pyenv/versions/x/lib/python3.11/site-packages|1001|drwxr-xr-x|",
    "PYPKG|/home/bob/.pyenv/versions/x/lib/python3.11/site-packages|Brotli-1.0.0.dist-info",
    "PYENV|/srv/shared/lib/python3.12/site-packages|0|drwxrwxr-x|venv",
    "PYPKG|/srv/shared/lib/python3.12/site-packages|brotli-1.2.0.dist-info",
    "PYENV|/srv/unknown/lib/python3.12/site-packages",
    "PYPKG|/srv/unknown/lib/python3.12/site-packages|brotli-1.2.0.dist-info",
    "END|1",
  ].join("\n");
  for (const opts of [{ upgradePython: true }, { removePythonBrotli: true }]) {
    const p = plan(text, opts);
    assertEquals(p.steps.length, 0);
    assert(
      p.notes.some((n) =>
        n.includes("/home/bob") && n.includes("belongs to uid 1001")
      ),
    );
    assert(
      p.notes.some((n) =>
        n.includes("/srv/shared") && n.includes("not changed")
      ),
    );
    assert(
      p.notes.some((n) =>
        n.includes("/srv/unknown") && n.includes("not changed")
      ),
    );
  }
});

Deno.test("windowsInterpreter: install root, venv Scripts, and none for a user site", () => {
  assertEquals(
    windowsInterpreter("C:\\Python312\\Lib\\site-packages", ""),
    "C:\\Python312\\python.exe",
  );
  assertEquals(
    windowsInterpreter("C:\\app\\.venv\\Lib\\site-packages", "venv"),
    "C:\\app\\.venv\\Scripts\\python.exe",
  );
  assertEquals(
    windowsInterpreter(
      "C:\\Users\\a\\AppData\\Roaming\\Python\\Python311\\site-packages",
      "user",
    ),
    null,
  );
});

Deno.test("windowsScript quotes typographic single quotes in paths", () => {
  const evil =
    "C:\\srv\\x\u2019; Remove-Item C:\\ -Recurse; \u2019\\Lib\\site-packages";
  const script = windowsScript([{
    kind: "python",
    name: "brotli",
    path: evil,
    source: "pip",
    version: "1.2.0",
    brotliVersion: null,
    packageName: null,
    packageVersion: null,
    linksSystemBrotli: null,
    verdict: "vulnerable",
    action: "upgrade",
    fixedVersion: "1.2.1",
    note: "",
    exposure: [],
  }], [{ dir: evil, owner: null, mode: "", kind: "venv", trusted: false }])!;
  // Every typographic quote is doubled, so the string never ends early.
  assertStringIncludes(script, "x\u2019\u2019; Remove-Item");
  assertStringIncludes(script, "\u2019\u2019\\Scripts\\python.exe'");
});

Deno.test("runsWithoutPassword: a matching negated item denies", () => {
  const list = parseSudoList([
    "Sudoers entry:",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    "\tALL",
    "\t!/usr/bin/systemctl restart *",
  ]);
  assert(
    !runsWithoutPassword(
      ["/usr/bin/systemctl", "restart", "api.service"],
      list,
    ),
  );
  assert(runsWithoutPassword(["/usr/bin/apt-get", "update"], list));
});

Deno.test("interpreterFor maps site-packages to its interpreter", () => {
  assertEquals(
    interpreterFor("/opt/venv/lib/python3.11/site-packages"),
    "/opt/venv/bin/python3.11",
  );
  assertEquals(
    interpreterFor("/usr/local/lib/python3.12/site-packages"),
    "/usr/local/bin/python3.12",
  );
  assertEquals(interpreterFor("/usr/lib/python3.12/site-packages"), null);
  assertEquals(
    interpreterFor("/root/.local/lib/python3.12/site-packages"),
    null,
  );
  assertEquals(interpreterFor("/usr/lib/python3/dist-packages"), null);
});

Deno.test("Containers, macOS and Windows get no steps", () => {
  const facts = parseProbe(
    VULNERABLE.replace("PROCSCOPE|all", "INCONTAINER|1"),
  );
  const c = planMitigation(
    analyze(facts, "img", { inContainer: true, probe: "sh" }),
    facts,
    { restartServices: true, upgradePython: true, removePythonBrotli: false },
  );
  assertEquals(c.steps.length, 0);
  assertStringIncludes(c.notes[0], "rebuild its image");

  const mac = plan([
    "HOSTNAME|mac",
    "UID|501",
    "HOME|/Users/a",
    "OS|ID=macos",
    "BUN|/Users/eve/.bun/bin/bun|1.4.3",
    "PKG|brew|brotli|1.2.0",
    "PKG|brew|node@24|24.21.0",
    "NODE|/opt/homebrew/Cellar/node@24/24.21.0/bin/node|brew:node@24|v24.21.0 1.2.0|/opt/homebrew/opt/brotli/lib/libbrotlidec.1.dylib",
    "BUN|/Users/a/.bun/bin/bun|1.4.3",
    "BUN|/opt/homebrew/Cellar/bun/1.4.3/bin/bun|1.4.3",
    "END|1",
  ].join("\n"));
  assertEquals(mac.steps.length, 0);
  assertEquals(mac.script?.shell, "sh");
  assertStringIncludes(mac.script!.text, "brew upgrade brotli bun\n");
  assert(!mac.script!.text.includes("Cellar/bun/1.4.3/bin/bun upgrade"));
  assertStringIncludes(mac.script!.text, "/Users/a/.bun/bin/bun upgrade");
  // Another user's bun is never run by the script.
  assertStringIncludes(
    mac.script!.text,
    "# /Users/eve/.bun/bin/bun: belongs to another user",
  );

  const win = plan([
    "HOSTNAME|w",
    "UID|0",
    "OS|ID=windows",
    "HOME|C:\\Users\\admin",
    "NODE|C:\\Users\\a\\AppData\\Roaming\\nvm\\v24.22.0\\node.exe||24.22.0|",
    "NODE|C:\\Program Files\\nodejs\\node.exe||22.20.0|",
    "PYPKG|C:\\Python312\\Lib\\site-packages|brotli-1.2.0.dist-info",
    "PYPKG|C:\\Users\\eve\\AppData\\Local\\Programs\\Python\\Python312\\Lib\\site-packages|brotli-1.2.0.dist-info",
    "END|1",
  ].join("\n"));
  assertEquals(win.script?.shell, "powershell");
  assertStringIncludes(win.script!.text, "nvm install 24.22.1");
  assertStringIncludes(
    win.script!.text,
    "winget upgrade --id OpenJS.NodeJS.LTS",
  );
  assertStringIncludes(
    win.script!.text,
    "& 'C:\\Python312\\python.exe' -I -m pip install --upgrade 'Brotli>=1.2.1'",
  );
  assert(!win.script!.text.includes("& 'C:\\Users\\eve"));
  assertStringIncludes(win.script!.text, "# C:\\Users\\eve\\AppData");
});

Deno.test("macScript and windowsScript are null with nothing to do", () => {
  assertEquals(macScript([]), null);
  assertEquals(windowsScript([]), null);
});

Deno.test("unitsOf skips session and init units", () => {
  assertEquals(
    unitsOf([
      { pid: 1, process: "a", unit: "user@1000.service", path: "x" },
      { pid: 2, process: "b", unit: "b.service", path: "x" },
      { pid: 3, process: "c", unit: "b.service", path: "x" },
      { pid: 4, process: "d", unit: null, path: "x" },
    ]),
    ["b.service"],
  );
});

Deno.test("renderStep and the sudo preflight", () => {
  const step: MitigationStep = {
    phase: "upgrade",
    argv: ["apt-get", "update"],
    privileged: true,
    purpose: "",
  };
  const tools = { "apt-get": "/usr/bin/apt-get", sudo: "/usr/bin/sudo" };
  assertEquals(renderStep(step, tools, true), "/usr/bin/apt-get update");
  assertEquals(
    renderStep(step, tools, false),
    "/usr/bin/sudo -n -- /usr/bin/apt-get update",
  );
  assertStringIncludes(
    preflightScript([step], tools),
    "/usr/bin/sudo -n -l /usr/bin/apt-get update",
  );
  const listing = [
    "OK|0",
    "@@ sudo-ll",
    "Sudoers entry:",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    "\t/usr/bin/apt-get update",
  ].join("\n");
  assertEquals([...allowedSteps([step], tools, listing)], [0]);
  // The same rule without NOPASSWD refuses.
  assertEquals(
    [...allowedSteps(
      [step],
      tools,
      listing.replace("!authenticate", "authenticate"),
    )],
    [],
  );
});

Deno.test("runsWithoutPassword honours argument rules", () => {
  const list = parseSudoList([
    "Matching Defaults entries for ops on web1:",
    "    !authenticate",
    "Sudoers entry:",
    "    RunAsUsers: root",
    "    Commands:",
    "\t/usr/bin/systemctl restart *",
  ]);
  assert(
    runsWithoutPassword(["/usr/bin/systemctl", "restart", "api.service"], list),
  );
  assert(!runsWithoutPassword(["/usr/bin/apt-get", "update"], list));
});

/** A runner that returns probe output in turn and records every other command. */
function sequence(probes: string[]): {
  run: (c: string, t?: number, s?: Shell) => Promise<RunResult>;
  ran: string[];
} {
  const ran: string[] = [];
  let i = 0;
  return {
    ran,
    run: (c) => {
      if (c.includes('echo "HOSTNAME|')) {
        const out = probes[Math.min(i++, probes.length - 1)];
        return Promise.resolve({ stdout: out, stderr: "", exitCode: 0 });
      }
      // Guarded steps wrap the command in the ownership check; record the command.
      ran.push(c.match(/; then exec ([^\n]*); else echo /)?.[1] ?? c);
      return Promise.resolve({ stdout: "", stderr: "", exitCode: 0 });
    },
  };
}

const nullLog: FileWriter = {
  writeLine: () => Promise.resolve(),
  finalize: () => Promise.resolve(),
};

const OPTS = {
  restartServices: true,
  upgradePython: false,
  removePythonBrotli: false,
  inContainer: false,
  searchPaths: [],
};

Deno.test("mitigateTarget dry run runs nothing", async () => {
  const s = sequence([VULNERABLE]);
  const r = await mitigateTarget(
    s.run,
    null,
    "web1",
    { ...OPTS, dryRun: true },
    nullLog,
  );
  assertEquals(s.ran, []);
  assertEquals(r.mitigation.outcome, "dry-run");
  assertEquals(r.mitigation.privilege, "root");
  assert(r.mitigation.steps.every((x) => x.status === "planned"));
});

Deno.test("mitigateTarget applies: upgrade, then restart only units still stale", async () => {
  // After the upgrade api.service still maps the deleted library; worker.service
  // was restarted by the package's own hooks and maps the new one.
  const s = sequence([VULNERABLE, FIXED_STALE, FIXED_CLEAN]);
  const r = await mitigateTarget(s.run, null, "web1", {
    ...OPTS,
    dryRun: false,
  }, nullLog);
  assertEquals(s.ran, [
    "/usr/bin/apt-get update",
    "/usr/bin/apt-get install --only-upgrade -y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold libbrotli1 python3-brotli",
    "/usr/bin/systemctl restart -- api.service",
  ]);
  const worker = r.mitigation.steps.find((x) => x.command.includes("worker"));
  assertEquals(worker?.status, "skipped");
  assertEquals(r.mitigation.outcome, "applied");
  assertEquals(r.status.vulnerable, false);
});

Deno.test("mitigateTarget guards privileged binaries; a failed refresh still installs", async () => {
  const commands: string[] = [];
  let probes = 0;
  const run = (c: string) => {
    if (c.includes('echo "HOSTNAME|')) {
      probes++;
      return Promise.resolve({ stdout: VULNERABLE, stderr: "", exitCode: 0 });
    }
    commands.push(c);
    // apt-get update fails.
    return Promise.resolve({ stdout: "", stderr: "lock", exitCode: 100 });
  };
  const r = await mitigateTarget(run, null, "web1", {
    ...OPTS,
    restartServices: false,
    dryRun: false,
  }, nullLog);
  // A failed apt-get update (one dead source) does not stop the install.
  assertEquals(commands.length, 2);
  assertStringIncludes(commands[0], "trusted /usr/bin/apt-get");
  assertStringIncludes(commands[0], "cd / || exit 3");
  assertEquals(r.mitigation.steps[1].status, "failed");
  assertEquals(r.mitigation.outcome, "partial");
  assert(probes >= 2);
});

Deno.test("mitigateTarget without root or sudo needs privilege and runs nothing", async () => {
  const noRoot = VULNERABLE.replace("UID|0", "UID|1000").replace(
    "TOOL|sudo|/usr/bin/sudo\n",
    "",
  );
  const s = sequence([noRoot]);
  const r = await mitigateTarget(s.run, null, "web1", {
    ...OPTS,
    dryRun: false,
  }, nullLog);
  assertEquals(s.ran, []);
  assertEquals(r.mitigation.outcome, "needs-privilege");
  assertEquals(r.status.action, "needs-privilege");
  assert(r.mitigation.missingPrivileges.length > 0);
});

Deno.test("mitigateTarget with nothing to do is not-needed", async () => {
  const s = sequence([FIXED_CLEAN]);
  const r = await mitigateTarget(s.run, null, "web1", {
    ...OPTS,
    dryRun: false,
  }, nullLog);
  assertEquals(r.mitigation.outcome, "not-needed");
  assertEquals(s.ran, []);
});

Deno.test("foreignPath: other users' homes and profiles, not system or own", () => {
  assert(foreignPath("/home/bob/.bun/bin/bun", "/root"));
  assert(!foreignPath("/root/.bun/bin/bun", "/root"));
  assert(!foreignPath("/opt/bun/bin/bun", "/root"));
  assert(foreignPath("C:\\Users\\eve\\.bun\\bin\\bun.exe", "C:\\Users\\admin"));
  assert(
    !foreignPath("C:\\Users\\Admin\\.bun\\bin\\bun.exe", "C:\\Users\\admin"),
  );
  assert(
    !foreignPath("C:\\Program Files\\nodejs\\node.exe", "C:\\Users\\admin"),
  );
  // No known home: any home directory counts as foreign.
  assert(foreignPath("/Users/a/.bun/bin/bun", ""));
});

Deno.test("restarts only Brotli-decoding servers; other units are listed", () => {
  const { steps, notes } = plan([
    ...DEBIAN12,
    "PKG|dpkg|libbrotli1|1.0.9-2",
    "LOADED|10|NetworkManager|NetworkManager.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1",
    "LOADED|11|gdm|gdm.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1",
    "LOADED|12|node|api.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1",
    "END|1",
  ].join("\n"));
  assertEquals(
    steps.filter((s) => s.phase === "restart").map((s) => s.unit),
    ["api.service"],
  );
  assert(
    notes.some((n) =>
      n.includes("NetworkManager.service") && n.includes("gdm.service")
    ),
  );
});

Deno.test("parseSudoList: a directory item allows only files directly in it", () => {
  const list = parseSudoList([
    "Sudoers entry:",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    "\t/usr/bin/",
  ]);
  assert(runsWithoutPassword(["/usr/bin/apt-get", "update"], list));
  assert(!runsWithoutPassword(["/usr/bin/x/evil", "update"], list));
});
