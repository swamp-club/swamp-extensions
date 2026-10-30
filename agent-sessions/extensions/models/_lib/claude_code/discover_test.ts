import { assert, assertEquals, assertFalse } from "jsr:@std/assert@1.0.19";
import { globToRegExp, join } from "jsr:@std/path@1.1.4";
import {
  belongsToRepo,
  defaultProjectsDir,
  discoverSessions,
  expandGlob,
  transcriptHead,
} from "./discover.ts";

const env = (vars: Record<string, string>) => ({ get: (k: string) => vars[k] });

Deno.test("defaultProjectsDir: CLAUDE_CONFIG_DIR wins over home", () => {
  assertEquals(
    defaultProjectsDir(env({ CLAUDE_CONFIG_DIR: "/cfg" }), "/home/a"),
    join("/cfg", "projects"),
  );
  assertEquals(
    defaultProjectsDir(env({}), "/home/a"),
    join("/home/a", ".claude", "projects"),
  );
  assertEquals(defaultProjectsDir(env({}), undefined), undefined);
});

Deno.test("expandGlob: expands ~ and <repo>", () => {
  assertEquals(
    expandGlob("~/.cue/work/*/<repo>", "/home/a", "/home/a/sc/demo"),
    "/home/a/.cue/work/*/demo",
  );
  assertEquals(expandGlob("/abs/<repo>", undefined, "/r/x"), "/abs/x");
});

Deno.test("belongsToRepo: the repo or below it; never a sibling sharing a prefix", () => {
  const paths = ["/h/src/demo"];
  const yes = (cwd: string) => belongsToRepo({ cwd }, paths, [], new Set());
  assert(yes("/h/src/demo"));
  assert(yes("/h/src/demo/sub/dir"));
  assert(yes("/h/src/demo/"));
  assertFalse(yes("/h/src/demo-two"));
  assertFalse(belongsToRepo({}, paths, [], new Set()));
});

Deno.test("belongsToRepo: a glob match counts only on one of this repo's own branches", () => {
  const globs = [globToRegExp("/h/.cue/work/*/demo", { globstar: false })];
  const branches = new Set(["main", "cue/12-x"]);
  const at = (cwd: string, gitBranch?: string) =>
    belongsToRepo(
      gitBranch ? { cwd, gitBranch } : { cwd },
      [],
      globs,
      branches,
    );
  assert(at("/h/.cue/work/12-x/demo", "cue/12-x"));
  assert(at("/h/.cue/work/12-x/demo/a", "cue/12-x"));
  assertFalse(at("/h/.cue/work/12-x/other", "cue/12-x"));
  // Another repo with the same name, on a branch this repo lacks.
  assertFalse(at("/h/.cue/work/99-y/demo", "cue/99-y"));
  // A name every repo has proves nothing.
  assertFalse(at("/h/.cue/work/99-y/demo", "main"));
  assertFalse(at("/h/.cue/work/12-x/demo"));
});

Deno.test("discoverSessions: membership rests on cwd, not on the folder's name", async () => {
  const root = await Deno.makeTempDir();
  try {
    // A folder named nothing like the repo, holding a session that ran in it.
    const odd = join(root, "renamed-by-a-future-claude");
    await Deno.mkdir(odd);
    await Deno.writeTextFile(
      join(odd, "s1.jsonl"),
      JSON.stringify({ type: "summary" }) + "\n" +
        JSON.stringify({
          type: "user",
          cwd: "/r/demo",
          message: { content: "x" },
        }) + "\n",
    );
    // A folder named like the repo, holding another repo's session.
    const look = join(root, "-r-demo");
    await Deno.mkdir(look);
    await Deno.writeTextFile(
      join(look, "s2.jsonl"),
      JSON.stringify({ type: "user", cwd: "/r/demo-two" }) + "\n",
    );
    await Deno.writeTextFile(join(look, "s3.jsonl"), "");
    const { sessions: found, others } = await discoverSessions({
      repoDir: "/r/demo",
      projectsDir: root,
      repoPaths: ["/r/demo"],
      worktreeGlobs: [],
      repoBranches: new Set(),
    });
    // s2 and the empty s3 are other repos' (or nobody's), by hash only.
    assertEquals(others.size, 2);
    assertFalse([...others.keys()].some((k) => k.includes("/")));
    assertEquals(found.map((s) => s.sessionId), ["s1"]);
    assert(found[0].fingerprint.startsWith("s1.jsonl:"));
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("transcriptCwd: finds cwd when the first record is longer than the head read", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const path = join(dir, "big.jsonl");
    await Deno.writeTextFile(
      path,
      JSON.stringify({
        type: "user",
        cwd: '/r/demo "quoted"',
        message: { content: [{ type: "image", data: "A".repeat(400_000) }] },
      }) + "\n",
    );
    assertEquals(await transcriptHead(path), { cwd: '/r/demo "quoted"' });
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("transcriptHead: a cwd nested in a long first record's content never counts", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const path = join(dir, "big.jsonl");
    // As Claude Code writes it: message first, cwd after, long enough to
    // run past any fixed head.
    await Deno.writeTextFile(
      path,
      `{"type":"user","message":{"content":"${
        "x".repeat(300_000)
      } {\\"cwd\\":\\"/evil\\"}"},"cwd":"/r/demo","gitBranch":"b"}\n`,
    );
    assertEquals(await transcriptHead(path), {
      cwd: "/r/demo",
      gitBranch: "b",
    });
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("discoverSessions: a subagent's meta is part of the fingerprint", async () => {
  const root = await Deno.makeTempDir();
  try {
    const project = join(root, "p");
    await Deno.mkdir(join(project, "s1", "subagents"), { recursive: true });
    await Deno.writeTextFile(
      join(project, "s1.jsonl"),
      JSON.stringify({ type: "user", cwd: "/r/demo" }) + "\n",
    );
    await Deno.writeTextFile(
      join(project, "s1", "subagents", "agent-a.jsonl"),
      "",
    );
    const scan = () =>
      discoverSessions({
        repoDir: "/r/demo",
        projectsDir: root,
        repoPaths: ["/r/demo"],
        worktreeGlobs: [],
        repoBranches: new Set(),
      });
    const before = (await scan()).sessions[0].fingerprint;
    await Deno.writeTextFile(
      join(project, "s1", "subagents", "agent-a.meta.json"),
      JSON.stringify({ agentType: "Plan", toolUseId: "t" }),
    );
    const after = (await scan()).sessions[0].fingerprint;
    assert(after.includes("agent-a.meta.json"));
    assert(before !== after);
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});
