import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { boxLayout } from "./box.ts";
import {
  DENY_ALL_HOST,
  type Exec,
  EXTERNAL_ACKNOWLEDGEMENT,
  ExternalIsolation,
  nonoArgs,
  type NonoConfig,
  nonoEnv,
  NonoIsolation,
  parseNonoDiagnostics,
  type Step,
} from "./isolation.ts";

const KEY = "swamp_sandbox_key_0123456789";
const TOKEN = "signin.token.abcdefghij";

function cfg(root: string, exec?: Exec): NonoConfig {
  return {
    box: boxLayout(root),
    swampPath: "/opt/swamp",
    apiKey: KEY,
    signinToken: TOKEN,
    canaryEnv: { GITHUB_TOKEN: "ghp_probe_canary" },
    nonoPath: "/opt/nono/nono",
    realHome: "/home/operator",
    memory: "2G",
    maxProcesses: 256,
    ...(exec ? { exec } : {}),
  };
}

const step = (over: Partial<Step> = {}): Step => ({
  id: "007",
  args: ["behavior", "run", "@t/x", "lint", "p", "--json"],
  network: { kind: "none" },
  timeoutMs: 1000,
  shims: true,
  ...over,
});

Deno.test("nono argv carries no secret; nono's env carries them for the launcher", () => {
  const c = cfg("/box");
  const argv = nonoArgs(c, step());
  const joined = argv.join(" ");
  assertFalse(joined.includes(KEY));
  assertFalse(joined.includes(TOKEN));
  assertFalse(joined.includes("ghp_probe_canary"));
  const env = nonoEnv(c, step());
  assertEquals(env.SWAMP_API_KEY, KEY);
  assertEquals(env.SWAMP_SIGNIN_TOKEN, TOKEN);
  assertEquals(env.HOME, "/home/operator");
  assertEquals(env.PROBE_HOME, "/box/home");
  assertEquals(env.PROBE_PATH.split(":")[0], "/box/bin");
});

Deno.test("nono grants only the box, never /proc, and a step marker", () => {
  const argv = nonoArgs(cfg("/box"), step());
  const grants = argv.flatMap((a, i) =>
    ["--allow", "--read", "--read-file"].includes(a) ? [argv[i + 1]] : []
  );
  assertEquals(grants, [
    "/opt/swamp",
    "/box/bin",
    "/box/home",
    "/box/tmp",
    "/box/repo",
    "/box/stub-calls",
    "/box/steps/007",
  ]);
  assertFalse(argv.includes("/proc"));
});

Deno.test("method runs deny all network through the proxy; setup allows the registry", () => {
  const none = nonoArgs(cfg("/box"), step());
  assertEquals(none[none.indexOf("--allow-domain") + 1], DENY_ALL_HOST);
  assertFalse(none.includes("--block-net"));
  const reg = nonoArgs(
    cfg("/box"),
    step({ network: { kind: "registry", hosts: ["swamp-club.com"] } }),
  );
  assertEquals(reg[reg.indexOf("--allow-domain") + 1], "swamp-club.com");
});

Deno.test("setup steps get no shims on PATH", () => {
  assertFalse(
    nonoEnv(cfg("/box"), step({ shims: false })).PROBE_PATH.includes(
      "/box/bin",
    ),
  );
});

Deno.test("NonoIsolation reads network events from nono's audit trail", async () => {
  const root = await Deno.makeTempDir();
  try {
    const calls: string[][] = [];
    const exec: Exec = (req) => {
      calls.push([...req.args]);
      if (req.args[0] === "run") {
        return Promise.resolve({
          code: 0,
          stdout: "{}",
          stderr:
            '{"session":{"exit_code":0,"denials":["/etc/shadow"],"violations":[]}}',
          timedOut: false,
        });
      }
      if (req.args[1] === "list") {
        return Promise.resolve({
          code: 0,
          stdout: JSON.stringify([{
            session_id: "abc",
            started: "x",
            tracked_paths: [`${root}/steps/007`],
          }]),
          stderr: "",
          timedOut: false,
        });
      }
      return Promise.resolve({
        code: 0,
        stdout: JSON.stringify({
          network_events: [{
            decision: "deny",
            target: "evil.example",
            port: 443,
          }],
        }),
        stderr: "",
        timedOut: false,
      });
    };
    const r = await new NonoIsolation(cfg(root, exec)).run(step());
    assertEquals(r.network, [{
      decision: "deny",
      host: "evil.example",
      port: 443,
    }]);
    assertEquals(r.violations, ["denials: /etc/shadow"]);
    assert(r.observed);
    assertEquals(calls[2], ["audit", "show", "abc", "--json"]);
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("external isolation refuses without the exact acknowledgement", () => {
  const c = cfg("/box");
  assertThrows(
    () => new ExternalIsolation(c, undefined),
    Error,
    "acknowledgeUnsandboxed",
  );
  assertThrows(
    () => new ExternalIsolation(c, "yes I know"),
    Error,
    "no sandbox from this probe",
  );
  const ok = new ExternalIsolation(c, EXTERNAL_ACKNOWLEDGEMENT);
  assertEquals(ok.mode, "external");
});

Deno.test("external isolation runs swamp directly with the box HOME and reports nothing observed", async () => {
  let seen: Parameters<Exec>[0] | undefined;
  const exec: Exec = (req) => {
    seen = req;
    return Promise.resolve({
      code: 0,
      stdout: "",
      stderr: "",
      timedOut: false,
    });
  };
  const r = await new ExternalIsolation(
    cfg("/box", exec),
    EXTERNAL_ACKNOWLEDGEMENT,
  )
    .run(step());
  assertEquals(seen?.cmd, "/opt/swamp");
  assertEquals(seen?.env.HOME, "/box/home");
  assertEquals(seen?.env.SWAMP_API_KEY, KEY);
  assertFalse(r.observed);
});

Deno.test("parseNonoDiagnostics ignores documents without a session", () => {
  assertEquals(parseNonoDiagnostics('{"error":"x"}'), []);
});

Deno.test("a failed audit lookup is unobserved network, never none", async () => {
  const root = await Deno.makeTempDir();
  try {
    const exec: Exec = (req) =>
      Promise.resolve(
        req.args[0] === "run"
          ? { code: 0, stdout: "{}", stderr: "", timedOut: false }
          : {
            code: 1,
            stdout: "",
            stderr: "audit store unavailable",
            timedOut: false,
          },
      );
    const r = await new NonoIsolation(cfg(root, exec)).run(step());
    assertEquals(r.network, []);
    assertFalse(r.networkObserved);
    assertEquals(r.networkGap, "nono audit list exited 1");
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});
