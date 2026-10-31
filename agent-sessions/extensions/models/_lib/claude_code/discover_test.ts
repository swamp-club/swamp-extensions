import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1.1.4";
import {
  defaultProjectsDir,
  type DiscoverOptions,
  discoverSessions,
  expandHome,
  transcriptHead,
} from "./discover.ts";
import { RepoResolver } from "./resolve.ts";

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

Deno.test("expandHome: expands a leading ~ only", () => {
  assertEquals(
    expandHome("~/.cue/work/*/<repo>", "/home/a"),
    "/home/a/.cue/work/*/<repo>",
  );
  assertEquals(expandHome("/abs/~x", "/home/a"), "/abs/~x");
  assertEquals(expandHome("~/x", undefined), "~/x");
});

/**
 * Options that import the sessions of `dir`, a folder that is not a git
 * repo, so these tests need no git.
 */
function plainRepo(projectsDir: string, dir: string): DiscoverOptions {
  const resolver = new RepoResolver(undefined, []);
  const repo = resolver.addPlain(dir);
  return {
    projectsDir,
    resolver,
    selects: (r) => r.repo.identity === repo.identity,
    mayHold: () => true,
  };
}

Deno.test("discoverSessions: membership rests on cwd, not on the folder's name", async () => {
  const root = await Deno.makeTempDir();
  const work = await Deno.makeTempDir();
  try {
    const demo = join(work, "demo");
    await Deno.mkdir(demo);
    await Deno.mkdir(join(work, "demo-two"));
    // A folder named nothing like the repo, holding a session that ran in it.
    const odd = join(root, "renamed-by-a-future-claude");
    await Deno.mkdir(odd);
    await Deno.writeTextFile(
      join(odd, "s1.jsonl"),
      JSON.stringify({ type: "summary" }) + "\n" +
        JSON.stringify({
          type: "user",
          cwd: demo,
          message: { content: "x" },
        }) + "\n",
    );
    // A folder named like the repo, holding another repo's session.
    const look = join(root, "-r-demo");
    await Deno.mkdir(look);
    await Deno.writeTextFile(
      join(look, "s2.jsonl"),
      JSON.stringify({ type: "user", cwd: join(work, "demo-two") }) + "\n",
    );
    await Deno.writeTextFile(join(look, "s3.jsonl"), "");
    const { sessions: found, unresolved } = await discoverSessions(
      plainRepo(root, demo),
    );
    // s2 ran in a sibling sharing the repo's prefix, which is no git repo;
    // the empty s3 ran nowhere and is not counted.
    assertEquals(unresolved, 1);
    assertEquals(found.map((s) => s.sessionId), ["s1"]);
    assertEquals(found[0].root, demo);
    assert(found[0].fingerprint.startsWith("s1.jsonl:"));
  } finally {
    await Deno.remove(root, { recursive: true });
    await Deno.remove(work, { recursive: true });
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
      JSON.stringify({ type: "user", cwd: project }) + "\n",
    );
    await Deno.writeTextFile(
      join(project, "s1", "subagents", "agent-a.jsonl"),
      "",
    );
    const scan = () => discoverSessions(plainRepo(root, project));
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
