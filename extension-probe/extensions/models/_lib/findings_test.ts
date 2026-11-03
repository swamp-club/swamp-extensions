import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { classify, type Finding, FindingSchema } from "./findings.ts";
import type { MethodRun, Report, SetupStep } from "./report.ts";

const HOSTS = ["swamp-club.com", "*.swamp-club.com"];

const quiet = {
  exitCode: 0,
  timedOut: false,
  durationMs: 10,
  network: [],
  networkObserved: true,
  violations: [],
  fileChanges: [],
  sightings: [],
};

function run(over: Partial<MethodRun> = {}): MethodRun {
  return {
    type: "@t/x",
    method: "lint",
    round: "all",
    before: [],
    inputs: {},
    stubbed: [],
    status: "succeeded",
    data: [],
    stubCalls: [],
    ...quiet,
    ...over,
  };
}

function report(over: Partial<Report> = {}): Report {
  return {
    target: "@t/x",
    isolation: "nono",
    notObserved: [],
    startedAt: "2026-11-03T00:00:00Z",
    finishedAt: "2026-11-03T00:01:00Z",
    types: ["@t/x"],
    skippedGrafts: [],
    setup: [],
    methods: [{
      type: "@t/x",
      method: "lint",
      description: "",
      schema: {},
      succeeded: true,
    }],
    runs: [run()],
    canaries: [],
    ...over,
  };
}

const by = (fs: Finding[], category: string) =>
  fs.filter((f) => f.category === category);

Deno.test("a quiet probe is clean, with one recon finding", () => {
  const f = classify(report(), HOSTS);
  assertEquals(f.clean, true);
  assertEquals(f.findings.length, 1);
  assertEquals(f.findings[0].id, "PROBE-0");
  for (const x of f.findings) FindingSchema.parse(x);
});

Deno.test("a canary or the sandbox key seen anywhere is critical", () => {
  const f = classify(
    report({
      runs: [run({
        sightings: [
          { canary: "github-token", where: "stub call 1's argv, cwd or stdin" },
          { canary: "sandbox-key", where: "data findings-latest" },
        ],
      })],
    }),
    HOSTS,
  );
  assertEquals(by(f.findings, "canary-seen")[0].severity, "critical");
  assertEquals(by(f.findings, "sandbox-key-exposed")[0].severity, "critical");
  assertEquals(f.clean, false);
  assertEquals(f.blockingCount, 2);
});

Deno.test("an unexpected host on pull is high; registry hosts are not flagged", () => {
  const pull: SetupStep = {
    step: "pull",
    ok: true,
    detail: "",
    ...quiet,
    network: [
      { decision: "allow", host: "swamp-club.com", port: 443 },
      { decision: "allow", host: "cdn.swamp-club.com", port: 443 },
      { decision: "deny", host: "evil.example", port: 443 },
    ],
  };
  const f = classify(report({ setup: [pull] }), HOSTS);
  const hosts = by(f.findings, "unexpected-host");
  assertEquals(hosts.length, 1);
  assert(hosts[0].description.includes("evil.example"));
  assertEquals(hosts[0].severity, "high");
});

Deno.test("method network attempts are medium; swamp's own are low", () => {
  const f = classify(
    report({
      runs: [run({
        network: [
          { decision: "deny", host: "api.example.com", port: 443 },
          { decision: "deny", host: "swamp-club.com", port: 443 },
        ],
      })],
    }),
    HOSTS,
  );
  assertEquals(by(f.findings, "network-attempt")[0].severity, "medium");
  assertEquals(by(f.findings, "swamp-traffic")[0].severity, "low");
  assertEquals(f.clean, true);
});

Deno.test("home writes outside swamp's own paths and agent-config writes are persistence", () => {
  const f = classify(
    report({
      runs: [run({
        fileChanges: [
          {
            path: ".config/swamp/auth_token_check.json",
            change: "created",
            area: "home",
          },
          { path: ".bashrc", change: "modified", area: "home" },
          { path: ".claude/settings.json", change: "created", area: "repo" },
          { path: "notes.txt", change: "created", area: "repo" },
          { path: "x.log", change: "created", area: "tmp" },
        ],
      })],
    }),
    HOSTS,
  );
  const p = by(f.findings, "persistence-write");
  assertEquals(p.length, 2);
  assert(p.some((x) => x.description.includes("~/.bashrc")));
  assert(p.some((x) => x.description.includes(".claude/settings.json")));
  assertEquals(by(f.findings, "repo-write").length, 1);
});

Deno.test("stub calls through a tool path are low; by PATH name, medium", () => {
  const f = classify(
    report({
      runs: [run({
        stubCalls: [
          {
            invokedAs: "/box/bin/probe-stub",
            argv: ["-p"],
            cwd: "/box/tmp",
            stdinBytes: 5,
            stdinHead: "draft",
          },
          {
            invokedAs: "/box/bin/curl",
            argv: ["https://x"],
            cwd: "/box/repo",
            stdinBytes: 0,
            stdinHead: "",
          },
        ],
      })],
    }),
    HOSTS,
  );
  assertEquals(by(f.findings, "stub-call")[0].severity, "low");
  assert(by(f.findings, "spawned-command")[0].description.includes("`curl`"));
});

Deno.test("methods that never succeeded are coverage gaps", () => {
  const f = classify(
    report({
      methods: [{
        type: "@t/x",
        method: "record",
        description: "",
        schema: {},
        succeeded: false,
        lastError: "run start first",
      }],
    }),
    HOSTS,
  );
  const g = by(f.findings, "coverage-gap");
  assertEquals(g.length, 1);
  assert(g[0].description.includes("run start first"));
});

Deno.test("external isolation says what it did not observe", () => {
  const f = classify(
    report({ isolation: "external", notObserved: ["network attempts"] }),
    HOSTS,
  );
  const n = by(f.findings, "not-observed");
  assertEquals(n.length, 1);
  assert(n[0].description.includes("not a clean result"));
});

Deno.test("a probe that stopped during setup is never clean", () => {
  const init: SetupStep = {
    step: "init",
    ok: false,
    detail: "Your swamp-club.com credentials have been revoked.",
    ...quiet,
    exitCode: 1,
  };
  const f = classify(report({ setup: [init], runs: [], methods: [] }), HOSTS);
  assertEquals(f.clean, false);
  const p = by(f.findings, "probe-incomplete");
  assertEquals(p.length, 1);
  assert(p[0].description.includes("credentials have been revoked"));
});

Deno.test("init's home writes are swamp's own; a pull's skills are a low skill-install", () => {
  const init: SetupStep = {
    step: "init",
    ok: true,
    detail: "",
    ...quiet,
    fileChanges: [
      {
        path: ".claude/skills/swamp/SKILL.md",
        change: "created",
        area: "home",
      },
    ],
  };
  const pull: SetupStep = {
    step: "pull",
    ok: true,
    detail: "",
    ...quiet,
    fileChanges: [
      {
        path: ".claude/skills/simple-english/SKILL.md",
        change: "created",
        area: "repo",
      },
      {
        path: ".claude/skills/simple-english/ref.md",
        change: "created",
        area: "home",
      },
      { path: ".claude/settings.json", change: "created", area: "home" },
    ],
  };
  const f = classify(report({ setup: [init, pull] }), HOSTS);
  const skill = by(f.findings, "skill-install");
  assertEquals(skill.length, 1);
  assert(skill[0].description.includes("simple-english"));
  const p = by(f.findings, "persistence-write");
  assertEquals(p.length, 1);
  assert(p[0].description.includes(".claude/settings.json"));
});

Deno.test("network attempts are one finding per host, listing the methods", () => {
  const net = [{
    decision: "deny" as const,
    host: "api.example.com",
    port: 443,
  }];
  const f = classify(
    report({
      runs: [
        run({ round: "empty", network: net }),
        run({ round: "all", network: net }),
        run({ method: "sync", network: net }),
      ],
    }),
    HOSTS,
  );
  const n = by(f.findings, "network-attempt");
  assertEquals(n.length, 1);
  assert(
    n[0].description.startsWith(
      "2 method(s) tried to reach api.example.com:443",
    ),
  );
});

Deno.test("a stub call seen in several rounds is one finding listing them", () => {
  const call = {
    invokedAs: "/box/bin/curl",
    argv: ["x"],
    cwd: "/box/repo",
    stdinBytes: 0,
    stdinHead: "",
  };
  const f = classify(
    report({
      runs: [
        run({ round: "empty", stubCalls: [call] }),
        run({ round: "all", stubCalls: [call] }),
      ],
    }),
    HOSTS,
  );
  const n = by(f.findings, "spawned-command");
  assertEquals(n.length, 1);
  assert(n[0].description.includes("(rounds: empty, all)"));
});

Deno.test("a pull that writes agent config in the repo is persistence", () => {
  const pull: SetupStep = {
    step: "pull",
    ok: true,
    detail: "",
    ...quiet,
    fileChanges: [
      {
        path: "extensions/models/upstream_extensions.json",
        change: "modified",
        area: "repo",
      },
      { path: "CLAUDE.md", change: "modified", area: "repo" },
    ],
  };
  const p = by(
    classify(report({ setup: [pull] }), HOSTS).findings,
    "persistence-write",
  );
  assertEquals(p.length, 1);
  assert(p[0].description.includes("CLAUDE.md"));
});

Deno.test("the same setup finding from repeated pulls is reported once", () => {
  const pull: SetupStep = {
    step: "pull",
    ok: true,
    detail: "",
    ...quiet,
    fileChanges: [{
      path: ".claude/skills/x/SKILL.md",
      change: "created",
      area: "repo",
    }],
  };
  const f = classify(report({ setup: [pull, pull] }), HOSTS);
  assertEquals(by(f.findings, "skill-install").length, 1);
});

Deno.test("a pull that yields no methods is never clean", () => {
  const ok: SetupStep = { step: "pull", ok: true, detail: "", ...quiet };
  const f = classify(
    report({ setup: [ok], types: [], methods: [], runs: [] }),
    HOSTS,
  );
  assertEquals(f.clean, false);
  assertEquals(by(f.findings, "probe-incomplete").length, 1);
});

Deno.test("method runs reaching the shared archive host are not swamp traffic", () => {
  const f = classify(
    report({
      runs: [run({
        network: [{
          decision: "deny",
          host: "sfo3.digitaloceanspaces.com",
          port: 443,
        }],
      })],
    }),
    [...HOSTS, "sfo3.digitaloceanspaces.com"],
  );
  assertEquals(by(f.findings, "network-attempt").length, 1);
  assertEquals(by(f.findings, "swamp-traffic").length, 0);
});

Deno.test("only the round label after the run name is merged, not parentheses in paths", () => {
  const f = classify(
    report({
      runs: [
        run({
          fileChanges: [{ path: "a (x).txt", change: "created", area: "repo" }],
        }),
        run({
          fileChanges: [{ path: "a (y).txt", change: "created", area: "repo" }],
        }),
      ],
    }),
    HOSTS,
  );
  assertEquals(by(f.findings, "repo-write").length, 2);
});

Deno.test("a step whose network could not be read blocks under nono", () => {
  const f = classify(
    report({
      runs: [
        run({ networkObserved: false, networkGap: "nono audit list exited 1" }),
      ],
    }),
    HOSTS,
  );
  const n = by(f.findings, "network-unobserved");
  assertEquals(n.length, 1);
  assertEquals(n[0].severity, "high");
  assert(n[0].description.includes("nono audit list exited 1"));
  assertEquals(f.clean, false);
});

Deno.test("a skill written after the pull is persistence", () => {
  const describe: SetupStep = {
    step: "describe",
    ok: true,
    detail: "",
    ...quiet,
    fileChanges: [{
      path: ".claude/skills/evil/SKILL.md",
      change: "created",
      area: "home",
    }],
  };
  const f = classify(report({ setup: [describe] }), HOSTS);
  assertEquals(by(f.findings, "persistence-write").length, 1);
  assertEquals(by(f.findings, "skill-install").length, 0);
});
