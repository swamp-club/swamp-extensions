import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { model } from "./git.ts";
import { normaliseRemote } from "./_lib/operations.ts";
import { resetCommandExecutor, setCommandExecutor } from "./_lib/runner.ts";
import type { DataHandle, ExecResult, GitContext } from "./_lib/types.ts";

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

interface Harness {
  ctx: GitContext;
  writes: {
    specName: string;
    name: string;
    data: Record<string, unknown>;
    tags?: Record<string, string>;
  }[];
  logs: { level: string; message: string }[];
}

function makeHarness(
  globalArgs: Record<string, unknown> = {},
  opts?: { signal?: AbortSignal },
): Harness {
  const writes: Harness["writes"] = [];
  const logs: Harness["logs"] = [];

  const log = (level: string) => (message: string) => {
    logs.push({ level, message });
  };

  const ctx: GitContext = {
    signal: opts?.signal ?? new AbortController().signal,
    globalArgs: { repoPath: ".", remote: "origin", ...globalArgs },
    logger: {
      debug: log("debug"),
      info: log("info"),
      warn: log("warn"),
      error: log("error"),
    },
    writeResource: (
      specName: string,
      name: string,
      data: Record<string, unknown>,
      overrides?: { tags?: Record<string, string> },
    ): Promise<DataHandle> => {
      writes.push({ specName, name, data, tags: overrides?.tags });
      return Promise.resolve({ name, tags: overrides?.tags });
    },
    readResource: (): Promise<Record<string, unknown> | null> =>
      Promise.resolve(null),
  };

  return { ctx, writes, logs };
}

function ok(stdout = ""): ExecResult {
  return { stdout, stderr: "", exitCode: 0 };
}

function fail(stderr = "error", exitCode = 1): ExecResult {
  return { stdout: "", stderr, exitCode };
}

/**
 * stdout for the consolidated read-back that commit and amend perform:
 * `git log -1 --format=%H%n%aI%n%cI%n%s`.
 */
function metaOut(
  sha = "abc1234def",
  authorDate = "2026-01-01T00:00:00+00:00",
  committerDate = "2026-01-01T00:00:00+00:00",
  subject = "test commit",
): ExecResult {
  return ok(`${sha}\n${authorDate}\n${committerDate}\n${subject}\n`);
}

// ---------------------------------------------------------------------------
// Model export shape
// ---------------------------------------------------------------------------

Deno.test("model export has correct type", () => {
  assertEquals(model.type, "@swamp/git");
});

Deno.test("model version is CalVer format", () => {
  const parts = model.version.split(".");
  assertEquals(parts.length, 4);
  assertEquals(Number(parts[0]) >= 2026, true);
});

Deno.test("globalArguments defaults repoPath and remote", () => {
  const result = model.globalArguments.parse({});
  assertEquals(result.repoPath, ".");
  assertEquals(result.remote, "origin");
});

Deno.test("globalArguments accepts full config", () => {
  const result = model.globalArguments.parse({
    repoPath: "/repo",
    remote: "upstream",
    authorName: "Bot",
    authorEmail: "bot@example.com",
  });
  assertEquals(result.repoPath, "/repo");
  assertEquals(result.remote, "upstream");
  assertEquals(result.authorName, "Bot");
  assertEquals(result.authorEmail, "bot@example.com");
});

// ---------------------------------------------------------------------------
// Resource declarations
// ---------------------------------------------------------------------------

Deno.test("all 18 resource specs exist", () => {
  const names = Object.keys(model.resources);
  assertEquals(names.length, 18);
  for (
    const name of [
      "cloneResult",
      "checkoutResult",
      "diffResult",
      "worktreeDiffResult",
      "statusResult",
      "logResult",
      "commitResult",
      "amendResult",
      "pushResult",
      "branchResult",
      "configResult",
      "pullResult",
      "fetchResult",
      "cherryPickResult",
      "remoteRefResult",
      "isAncestorResult",
      "removeWorktreeResult",
      "upstreamStateResult",
    ]
  ) {
    assertEquals(
      name in model.resources,
      true,
      `missing resource: ${name}`,
    );
  }
});

Deno.test("resources have description and schema", () => {
  for (const [name, spec] of Object.entries(model.resources)) {
    assertEquals(
      typeof spec.description,
      "string",
      `${name} missing description`,
    );
    assertEquals(spec.schema !== undefined, true, `${name} missing schema`);
  }
});

// ---------------------------------------------------------------------------
// Method declarations
// ---------------------------------------------------------------------------

Deno.test("all 18 methods exist", () => {
  const names = Object.keys(model.methods);
  assertEquals(names.length, 18);
  for (
    const name of [
      "clone",
      "ensure_checkout",
      "diff",
      "worktree_diff",
      "status",
      "log",
      "commit",
      "amend",
      "push",
      "pull",
      "fetch",
      "cherry_pick",
      "branch",
      "config",
      "remote_ref",
      "upstream_state",
      "is_ancestor",
      "remove_worktree",
    ]
  ) {
    assertEquals(name in model.methods, true, `missing method: ${name}`);
  }
});

Deno.test("methods have description and execute function", () => {
  for (const [name, spec] of Object.entries(model.methods)) {
    assertEquals(
      typeof spec.description,
      "string",
      `${name} missing description`,
    );
    assertEquals(
      typeof spec.execute,
      "function",
      `${name} missing execute`,
    );
  }
});

// ---------------------------------------------------------------------------
// Check declarations
// ---------------------------------------------------------------------------

Deno.test("git-available check exists and covers all methods", () => {
  assertEquals(typeof model.checks["git-available"].execute, "function");
  assertEquals(
    model.checks["git-available"].appliesTo.includes("clone"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("amend"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("pull"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("fetch"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("cherry_pick"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("remote_ref"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("upstream_state"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("is_ancestor"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("remove_worktree"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("worktree_diff"),
    true,
  );
  assertEquals(
    model.checks["git-available"].appliesTo.includes("ensure_checkout"),
    true,
  );
});

Deno.test("repo-initialized check exists and excludes clone and remote_ref", () => {
  assertEquals(typeof model.checks["repo-initialized"].execute, "function");
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("clone"),
    false,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("remote_ref"),
    false,
  );
  // The destination may not exist yet, so the check cannot apply.
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("ensure_checkout"),
    false,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("diff"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("worktree_diff"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("amend"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("pull"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("fetch"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("cherry_pick"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("upstream_state"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("is_ancestor"),
    true,
  );
  assertEquals(
    model.checks["repo-initialized"].appliesTo.includes("remove_worktree"),
    true,
  );
});

// ---------------------------------------------------------------------------
// Schema validation
// ---------------------------------------------------------------------------

Deno.test("DiffArgs requires base", () => {
  const result = model.methods.diff.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("DiffArgs defaults", () => {
  const result = model.methods.diff.arguments.parse({ base: "HEAD~1" });
  assertEquals(result.head, "HEAD");
  assertEquals(result.nameOnly, false);
  assertEquals(result.stat, false);
  assertEquals(result.threeWay, false);
});

Deno.test("CommitArgs requires message", () => {
  const result = model.methods.commit.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("CommitArgs defaults addAll to false", () => {
  const result = model.methods.commit.arguments.parse({
    message: "test commit",
  });
  assertEquals(result.addAll, false);
});

Deno.test("PushArgs requires branch", () => {
  const result = model.methods.push.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("PushArgs defaults force and forceWithLease to false", () => {
  const result = model.methods.push.arguments.parse({ branch: "main" });
  assertEquals(result.force, false);
  assertEquals(result.forceWithLease, false);
  assertEquals(result.setUpstream, false);
});

Deno.test("PushArgs rejects force and forceWithLease together", () => {
  const result = model.methods.push.arguments.safeParse({
    branch: "main",
    force: true,
    forceWithLease: true,
  });
  assertEquals(result.success, false);
});

Deno.test("BranchArgs defaults", () => {
  const result = model.methods.branch.arguments.parse({});
  assertEquals(result.create, false);
  assertEquals(result.list, false);
});

Deno.test("ConfigArgs requires key", () => {
  const result = model.methods.config.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("ConfigArgs defaults scope to local", () => {
  const result = model.methods.config.arguments.parse({ key: "user.name" });
  assertEquals(result.scope, "local");
});

Deno.test("CloneArgs requires url", () => {
  const result = model.methods.clone.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("StatusArgs parses empty input", () => {
  const result = model.methods.status.arguments.parse({});
  assertEquals(result.paths, undefined);
});

// ---------------------------------------------------------------------------
// diff operation
// ---------------------------------------------------------------------------

Deno.test("diff name-only returns file list", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("src/main.ts\nsrc/lib.ts\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.diff.execute(
      { base: "HEAD~1", head: "HEAD", nameOnly: true },
      ctx,
    );

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "diffResult");
    const data = writes[0].data;
    assertEquals((data.files as string[]).length, 2);
    assertEquals((data.files as string[])[0], "src/main.ts");
    assertEquals(data.count, 2);

    const argv = calls[0];
    assertEquals(argv.includes("--name-only"), true);
    assertEquals(argv.includes("HEAD~1"), true);
    assertEquals(argv.includes("HEAD"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff three-way uses ... separator", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("file.ts\n");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.diff.execute(
      { base: "abc123", head: "def456", nameOnly: true, threeWay: true },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("abc123...def456"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff two-way uses separate refs", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.diff.execute(
      { base: "HEAD~1", head: "HEAD", nameOnly: true },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("HEAD~1"), true);
    assertEquals(argv.includes("HEAD"), true);
    assertEquals(argv.some((a) => a.includes("...")), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff passes diff-filter flag", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.diff.execute(
      { base: "HEAD~1", head: "HEAD", nameOnly: true, diffFilter: "d" },
      ctx,
    );

    assertEquals(calls[0].includes("--diff-filter=d"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff passes path filters after --", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.diff.execute(
      {
        base: "HEAD~1",
        head: "HEAD",
        nameOnly: true,
        paths: ["*/manifest.yaml"],
      },
      ctx,
    );

    const argv = calls[0];
    const dashIdx = argv.indexOf("--");
    assertEquals(dashIdx > 0, true);
    assertEquals(argv[dashIdx + 1], "*/manifest.yaml");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff stat mode", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok(" 3 files changed, 10 insertions(+)");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.diff.execute(
      { base: "HEAD~1", head: "HEAD", stat: true },
      ctx,
    );

    assertEquals(calls[0].includes("--stat"), true);
    assertEquals((writes[0].data.files as string[]).length, 0);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff throws on non-zero exit", async () => {
  setCommandExecutor(() => fail("fatal: bad ref"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.diff.execute(
          { base: "nonexistent", head: "HEAD", nameOnly: true },
          ctx,
        ),
      Error,
      "git diff failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("diff uses repoPath from globalArgs", async () => {
  const calls: { argv: string[]; opts?: { cwd?: string } }[] = [];
  setCommandExecutor((argv, opts) => {
    calls.push({ argv, opts });
    return ok("");
  });
  try {
    const { ctx } = makeHarness({ repoPath: "/my/repo" });
    await model.methods.diff.execute(
      { base: "HEAD~1", head: "HEAD", nameOnly: true },
      ctx,
    );

    assertEquals(calls[0].opts?.cwd, "/my/repo");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// status operation
// ---------------------------------------------------------------------------

Deno.test("status porcelain parses entries", async () => {
  setCommandExecutor(() => ok(" M src/main.ts\n?? new-file.ts\n"));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.status.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.clean, false);
    assertEquals(data.count, 2);
    const entries = data.entries as { path: string; status: string }[];
    assertEquals(entries[0].status, " M");
    assertEquals(entries[0].path, "src/main.ts");
    assertEquals(entries[1].status, "??");
    assertEquals(entries[1].path, "new-file.ts");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("status clean repo", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.status.execute({}, ctx);

    assertEquals(writes[0].data.clean, true);
    assertEquals(writes[0].data.count, 0);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("status with path filter", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok(" M model/aws/deno.json\n");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.status.execute(
      { paths: ["*/deno.json"] },
      ctx,
    );

    const argv = calls[0];
    const dashIdx = argv.indexOf("--");
    assertEquals(dashIdx > 0, true);
    assertEquals(argv[dashIdx + 1], "*/deno.json");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// log operation
// ---------------------------------------------------------------------------

Deno.test("log returns structured commits", async () => {
  const N = "\x00";
  const output =
    `abc1234${N}Alice${N}2026-08-05T10:00:00+00:00${N}fix: something${N}def5678${N}Bob${N}2026-08-04T09:00:00+00:00${N}feat: another${N}`;

  setCommandExecutor(() => ok(output));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.log.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.count, 2);
    const commits = data.commits as {
      sha: string;
      author: string;
      date: string;
      message: string;
    }[];
    assertEquals(commits[0].sha, "abc1234");
    assertEquals(commits[0].author, "Alice");
    assertEquals(commits[1].sha, "def5678");
    assertEquals(commits[1].message, "feat: another");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("log with custom format returns raw output", async () => {
  setCommandExecutor(() =>
    ok("abc1234 fix: something\ndef5678 feat: another\n")
  );
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.log.execute({ format: "%h %s" }, ctx);

    const data = writes[0].data;
    assertEquals((data.commits as unknown[]).length, 0);
    assertEquals(data.count, 0);
    assertEquals(
      (data.raw as string).includes("abc1234 fix: something"),
      true,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("log passes maxCount", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.log.execute({ maxCount: 5 }, ctx);

    assertEquals(calls[0].includes("-n"), true);
    assertEquals(calls[0].includes("5"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("log passes path scope", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.log.execute({ paths: ["codegen/aws/"] }, ctx);

    const argv = calls[0];
    const dashIdx = argv.indexOf("--");
    assertEquals(dashIdx > 0, true);
    assertEquals(argv[dashIdx + 1], "codegen/aws/");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// commit operation
// ---------------------------------------------------------------------------

Deno.test("commit with addAll stages then commits", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 3) return metaOut();
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.commit.execute(
      { message: "test commit", addAll: true },
      ctx,
    );

    assertEquals(calls.length, 3);
    assertEquals(calls[0].includes("add"), true);
    assertEquals(calls[0].includes("-A"), true);
    assertEquals(calls[1].includes("commit"), true);
    assertEquals(calls[1].includes("-m"), true);
    assertEquals(calls[1].includes("test commit"), true);
    assertEquals(calls[2].includes("log"), true);

    assertEquals(writes[0].specName, "commitResult");
    assertEquals(writes[0].data.message, "test commit");
    assertEquals(writes[0].data.authorDate, "2026-01-01T00:00:00+00:00");
    assertEquals(writes[0].data.committerDate, "2026-01-01T00:00:00+00:00");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit with specific paths", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 3) return metaOut();
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.commit.execute(
      { message: "update", paths: ["src/main.ts", "src/lib.ts"] },
      ctx,
    );

    assertEquals(calls[0].includes("add"), true);
    const dashIdx = calls[0].indexOf("--");
    assertEquals(dashIdx > 0, true);
    assertEquals(calls[0].includes("src/main.ts"), true);
    assertEquals(calls[0].includes("src/lib.ts"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit uses -c flags for author config", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 2) return metaOut("sha123");
    return ok("");
  });
  try {
    const { ctx } = makeHarness({
      authorName: "Bot",
      authorEmail: "bot@example.com",
    });
    await model.methods.commit.execute({ message: "auto" }, ctx);

    const commitArgv = calls[0];
    assertEquals(commitArgv.includes("-c"), true);
    assertEquals(commitArgv.includes("user.name=Bot"), true);
    assertEquals(commitArgv.includes("user.email=bot@example.com"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit throws on failure", async () => {
  setCommandExecutor(() => fail("nothing to commit"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.commit.execute({ message: "test" }, ctx),
      Error,
      "git commit failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// push operation
// ---------------------------------------------------------------------------

Deno.test("push normal", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.push.execute({ branch: "main" }, ctx);

    const argv = calls[0];
    assertEquals(argv.includes("push"), true);
    assertEquals(argv.includes("origin"), true);
    assertEquals(argv.includes("main"), true);
    assertEquals(argv.includes("--force"), false);

    assertEquals(writes[0].data.remote, "origin");
    assertEquals(writes[0].data.branch, "main");
    assertEquals(writes[0].data.forced, false);
    assertEquals(writes[0].data.forceWithLease, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("push force", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.push.execute({
      branch: "automated/regen",
      force: true,
    }, ctx);

    assertEquals(calls[0].includes("--force"), true);
    assertEquals(writes[0].data.forced, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("push set-upstream", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.push.execute({
      branch: "feature",
      setUpstream: true,
    }, ctx);

    assertEquals(calls[0].includes("-u"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("push with slash branch sanitizes resource name", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.push.execute({
      branch: "feature/my-branch",
    }, ctx);

    assertEquals(writes[0].name, "push-feature-my-branch");
    assertEquals(writes[0].data.branch, "feature/my-branch");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("push uses override remote", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.push.execute({
      remote: "upstream",
      branch: "main",
    }, ctx);

    assertEquals(calls[0].includes("upstream"), true);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// branch operation
// ---------------------------------------------------------------------------

Deno.test("branch list", async () => {
  setCommandExecutor(() => ok("* main\n  feature-a\n  feature-b\n"));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute({ list: true }, ctx);

    const data = writes[0].data;
    assertEquals(data.current, "main");
    assertEquals((data.branches as string[]).length, 3);
    assertEquals((data.branches as string[]).includes("main"), true);
    assertEquals((data.branches as string[]).includes("feature-a"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch create", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute({
      name: "automated/regen",
      create: true,
    }, ctx);

    assertEquals(calls[0].includes("checkout"), true);
    assertEquals(calls[0].includes("-b"), true);
    assertEquals(calls[0].includes("automated/regen"), true);

    assertEquals(writes[0].data.current, "automated/regen");
    assertEquals(writes[0].data.created, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch create with startPoint", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.branch.execute({
      name: "hotfix",
      create: true,
      startPoint: "v1.0.0",
    }, ctx);

    assertEquals(calls[0].includes("v1.0.0"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch switch", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute({ name: "main" }, ctx);

    assertEquals(calls[0].includes("checkout"), true);
    assertEquals(calls[0].includes("main"), true);
    assertEquals(calls[0].includes("-b"), false);

    assertEquals(writes[0].data.created, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch create with slash sanitizes resource name", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute({
      name: "feature/my-branch",
      create: true,
    }, ctx);

    assertEquals(writes[0].name, "branch-feature-my-branch");
    assertEquals(writes[0].data.current, "feature/my-branch");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch switch with slash sanitizes resource name", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute({ name: "issue-42/fix" }, ctx);

    assertEquals(writes[0].name, "branch-issue-42-fix");
    assertEquals(writes[0].data.current, "issue-42/fix");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch requires name when not listing", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.branch.execute({}, ctx),
      Error,
      "branch name is required",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// config operation
// ---------------------------------------------------------------------------

Deno.test("config get", async () => {
  setCommandExecutor(() => ok("Alice\n"));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.config.execute({ key: "user.name" }, ctx);

    assertEquals(writes[0].data.key, "user.name");
    assertEquals(writes[0].data.value, "Alice");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("config set local", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.config.execute({
      key: "user.name",
      value: "Bot",
    }, ctx);

    assertEquals(calls[0].includes("--local"), true);
    assertEquals(calls[0].includes("user.name"), true);
    assertEquals(calls[0].includes("Bot"), true);

    assertEquals(writes[0].data.key, "user.name");
    assertEquals(writes[0].data.value, "Bot");
    assertEquals(logs.some((l) => l.message.includes("user.name")), true);
    assertEquals(logs.some((l) => l.message.includes("Bot")), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("config set global", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.config.execute({
      key: "user.email",
      value: "bot@test.com",
      scope: "global",
    }, ctx);

    assertEquals(calls[0].includes("--global"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("config get throws on failure", async () => {
  setCommandExecutor(() => fail("key not found"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.config.execute({ key: "nonexistent.key" }, ctx),
      Error,
      "git config get failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// flag injection prevention
// ---------------------------------------------------------------------------

Deno.test("diff rejects base starting with dash", () => {
  const result = model.methods.diff.arguments.safeParse({
    base: "--output=/tmp/exfil",
  });
  assertEquals(result.success, false);
});

Deno.test("push rejects branch starting with dash", () => {
  const result = model.methods.push.arguments.safeParse({
    branch: "--mirror",
  });
  assertEquals(result.success, false);
});

Deno.test("config rejects key starting with dash", () => {
  const result = model.methods.config.arguments.safeParse({
    key: "--file=/etc/passwd",
  });
  assertEquals(result.success, false);
});

Deno.test("config rejects value starting with dash", () => {
  const result = model.methods.config.arguments.safeParse({
    key: "user.name",
    value: "--unset",
  });
  assertEquals(result.success, false);
});

Deno.test("globalArguments rejects remote starting with dash", () => {
  const result = model.globalArguments.safeParse({
    remote: "--mirror",
  });
  assertEquals(result.success, false);
});

Deno.test("branch rejects name starting with dash", () => {
  const result = model.methods.branch.arguments.safeParse({
    name: "--track",
    create: true,
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// clone operation
// ---------------------------------------------------------------------------

Deno.test("clone basic", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.clone.execute({
      url: "https://github.com/org/repo.git",
    }, ctx);

    assertEquals(calls[0].includes("clone"), true);
    const dashIdx = calls[0].indexOf("--");
    assertEquals(dashIdx > 0, true, "clone must use -- before positional args");
    assertEquals(
      calls[0].indexOf("https://github.com/org/repo.git") > dashIdx,
      true,
      "URL must come after --",
    );

    assertEquals(writes[0].data.url, "https://github.com/org/repo.git");
    assertEquals(writes[0].data.path, "repo");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone with depth", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.clone.execute({
      url: "https://github.com/org/repo",
      depth: 2,
    }, ctx);

    assertEquals(calls[0].includes("--depth"), true);
    assertEquals(calls[0].includes("2"), true);
    assertEquals(writes[0].data.depth, 2);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone depth 0 means full (no --depth flag)", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.clone.execute({
      url: "https://github.com/org/repo",
      depth: 0,
    }, ctx);

    assertEquals(calls[0].includes("--depth"), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone with branch", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.clone.execute({
      url: "https://github.com/org/repo",
      branch: "develop",
    }, ctx);

    assertEquals(calls[0].includes("--branch"), true);
    assertEquals(calls[0].includes("develop"), true);
    assertEquals(writes[0].data.branch, "develop");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone with token rewrites URL", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.clone.execute({
      url: "https://github.com/org/repo",
      token: "ghp_abc123",
    }, ctx);

    const cloneUrl = calls[0].find((a) =>
      a.startsWith("https://x-access-token")
    );
    assertEquals(cloneUrl !== undefined, true);
    assertEquals(cloneUrl!.includes("ghp_abc123"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone scrubs credentials from resource and tags", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.clone.execute({
      url: "https://user:secret@github.com/org/repo",
    }, ctx);

    const data = writes[0].data;
    assertEquals((data.url as string).includes("secret"), false);
    assertEquals((data.url as string).includes("***@"), true);
    assertEquals(writes[0].tags!.url.includes("secret"), false);
    assertEquals(writes[0].tags!.url.includes("***@"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone with token on non-https URL throws", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.clone.execute({
          url: "http://github.com/org/repo",
          token: "ghp_abc123",
        }, ctx),
      Error,
      "token authentication requires an https:// URL",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone failure scrubs credentials from error", async () => {
  setCommandExecutor(() =>
    fail(
      "fatal: unable to access 'https://x-access-token:ghp_secret@github.com/org/repo/': The requested URL returned error: 401",
    )
  );
  try {
    const { ctx } = makeHarness();
    try {
      await model.methods.clone.execute({
        url: "https://github.com/org/repo",
        token: "ghp_secret",
      }, ctx);
      throw new Error("should have thrown");
    } catch (e) {
      const msg = (e as Error).message;
      assertEquals(msg.includes("ghp_secret"), false);
      assertEquals(msg.includes("***@"), true);
    }
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("clone with custom path", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.clone.execute({
      url: "https://github.com/org/repo",
      path: "/tmp/checkout",
    }, ctx);

    assertEquals(calls[0].includes("/tmp/checkout"), true);
    assertEquals(writes[0].data.path, "/tmp/checkout");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// checks
// ---------------------------------------------------------------------------

Deno.test("git-available check passes when git exists", async () => {
  setCommandExecutor(() => ok("git version 2.45.0\n"));
  try {
    const result = await model.checks["git-available"].execute({
      globalArgs: {},
    });
    assertEquals(result.pass, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("git-available check fails on non-zero exit", async () => {
  setCommandExecutor(() => fail("not found"));
  try {
    const result = await model.checks["git-available"].execute({
      globalArgs: {},
    });
    assertEquals(result.pass, false);
    assertEquals(result.errors!.length > 0, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("repo-initialized check passes for valid repo", async () => {
  setCommandExecutor(() => ok("true\n"));
  try {
    const result = await model.checks["repo-initialized"].execute({
      globalArgs: { repoPath: "/repo" },
    });
    assertEquals(result.pass, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("repo-initialized check fails for non-repo", async () => {
  setCommandExecutor(() => fail("not a git repository"));
  try {
    const result = await model.checks["repo-initialized"].execute({
      globalArgs: { repoPath: "/tmp/empty" },
    });
    assertEquals(result.pass, false);
    assertEquals(result.errors!.length > 0, true);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// Harness smoke tests
// ---------------------------------------------------------------------------

Deno.test("harness writeResource records writes", async () => {
  const { ctx, writes } = makeHarness();

  await ctx.writeResource("diffResult", "test-1", { files: [] }, {
    tags: { method: "diff" },
  });

  assertEquals(writes.length, 1);
  assertEquals(writes[0].specName, "diffResult");
  assertEquals(writes[0].name, "test-1");
  assertEquals(writes[0].tags?.method, "diff");
});

Deno.test("harness readResource returns null for missing", async () => {
  const { ctx } = makeHarness();
  const result = await ctx.readResource("nonexistent");
  assertEquals(result, null);
});

// ---------------------------------------------------------------------------
// pull schema validation
// ---------------------------------------------------------------------------

Deno.test("PullArgs defaults", () => {
  const result = model.methods.pull.arguments.parse({});
  assertEquals(result.rebase, false);
  assertEquals(result.ffOnly, false);
});

Deno.test("PullArgs rejects remote starting with dash", () => {
  const result = model.methods.pull.arguments.safeParse({
    remote: "--mirror",
  });
  assertEquals(result.success, false);
});

Deno.test("PullArgs rejects branch starting with dash", () => {
  const result = model.methods.pull.arguments.safeParse({
    branch: "--upload-pack",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// pull operation
// ---------------------------------------------------------------------------

Deno.test("pull: basic pull from origin", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("Updating abc1234..def5678\nFast-forward\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.pull.execute({}, ctx);

    const argv = calls[0];
    assertEquals(argv.includes("pull"), true);
    assertEquals(argv.includes("origin"), true);

    assertEquals(writes[0].specName, "pullResult");
    assertEquals(writes[0].data.remote, "origin");
    assertEquals(writes[0].data.alreadyUpToDate, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pull: already up to date", async () => {
  setCommandExecutor(() => ok("Already up to date.\n"));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.pull.execute({}, ctx);

    assertEquals(writes[0].data.alreadyUpToDate, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pull: with rebase flag", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("Already up to date.\n");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.pull.execute({ rebase: true }, ctx);

    assertEquals(calls[0].includes("--rebase"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pull: with ff-only flag", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("Already up to date.\n");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.pull.execute({ ffOnly: true }, ctx);

    assertEquals(calls[0].includes("--ff-only"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pull: with specific branch", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("Already up to date.\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.pull.execute({ branch: "develop" }, ctx);

    assertEquals(calls[0].includes("develop"), true);
    assertEquals(writes[0].data.branch, "develop");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pull: override remote", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("Already up to date.\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.pull.execute({ remote: "upstream" }, ctx);

    assertEquals(calls[0].includes("upstream"), true);
    assertEquals(writes[0].data.remote, "upstream");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pull: throws on failure", async () => {
  setCommandExecutor(() => fail("fatal: not a git repository"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.pull.execute({}, ctx),
      Error,
      "git pull failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// fetch schema validation
// ---------------------------------------------------------------------------

Deno.test("FetchArgs defaults", () => {
  const result = model.methods.fetch.arguments.parse({});
  assertEquals(result.tags, false);
  assertEquals(result.prune, false);
});

Deno.test("FetchArgs rejects remote starting with dash", () => {
  const result = model.methods.fetch.arguments.safeParse({
    remote: "--upload-pack",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// fetch operation
// ---------------------------------------------------------------------------

Deno.test("fetch: basic fetch from origin", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.fetch.execute({}, ctx);

    const argv = calls[0];
    assertEquals(argv.includes("fetch"), true);
    assertEquals(argv.includes("origin"), true);
    assertEquals(argv.includes("--tags"), false);

    assertEquals(writes[0].specName, "fetchResult");
    assertEquals(writes[0].data.remote, "origin");
    assertEquals(writes[0].data.tags, false);
    assertEquals(writes[0].data.pruned, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("fetch: with tags", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.fetch.execute({ tags: true }, ctx);

    assertEquals(calls[0].includes("--tags"), true);
    assertEquals(writes[0].data.tags, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("fetch: with prune", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.fetch.execute({ prune: true }, ctx);

    assertEquals(calls[0].includes("--prune"), true);
    assertEquals(writes[0].data.pruned, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("fetch: with depth", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.fetch.execute({ depth: 5 }, ctx);

    assertEquals(calls[0].includes("--depth"), true);
    assertEquals(calls[0].includes("5"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("fetch: override remote", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.fetch.execute({ remote: "upstream", tags: true }, ctx);

    assertEquals(calls[0].includes("upstream"), true);
    assertEquals(writes[0].data.remote, "upstream");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("fetch: throws on failure", async () => {
  setCommandExecutor(() => fail("fatal: not a git repository"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.fetch.execute({}, ctx),
      Error,
      "git fetch failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// cherry_pick schema validation
// ---------------------------------------------------------------------------

Deno.test("CherryPickArgs defaults", () => {
  const result = model.methods.cherry_pick.arguments.parse({});
  assertEquals(result.noCommit, false);
  assertEquals(result.abort, false);
});

Deno.test("CherryPickArgs rejects commits starting with dash", () => {
  const result = model.methods.cherry_pick.arguments.safeParse({
    commits: ["--exec=malicious"],
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// cherry_pick operation
// ---------------------------------------------------------------------------

Deno.test("cherry_pick: single commit success", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("[main abc1234] cherry picked commit\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.cherry_pick.execute(
      { commits: ["abc1234"] },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("cherry-pick"), true);
    const dashIdx = argv.indexOf("--");
    assertEquals(dashIdx > 0, true);
    assertEquals(argv.includes("abc1234"), true);

    assertEquals(writes[0].specName, "cherryPickResult");
    assertEquals(writes[0].data.conflict, false);
    assertEquals((writes[0].data.commits as string[])[0], "abc1234");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: multiple commits", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.cherry_pick.execute(
      { commits: ["abc1234", "def5678"] },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("abc1234"), true);
    assertEquals(argv.includes("def5678"), true);
    assertEquals((writes[0].data.commits as string[]).length, 2);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: with noCommit flag", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.cherry_pick.execute(
      { commits: ["abc1234"], noCommit: true },
      ctx,
    );

    assertEquals(calls[0].includes("--no-commit"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: conflict detection", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) {
      return {
        stdout: "",
        stderr:
          "error: could not apply abc1234... some commit\nhint: after resolving the conflicts",
        exitCode: 1,
      };
    }
    return ok("src/main.ts\nsrc/lib.ts\n");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.cherry_pick.execute(
      { commits: ["abc1234"] },
      ctx,
    );

    assertEquals(writes[0].data.conflict, true);
    const conflictFiles = writes[0].data.conflictFiles as string[];
    assertEquals(conflictFiles.length, 2);
    assertEquals(conflictFiles[0], "src/main.ts");
    assertEquals(logs.some((l) => l.level === "warn"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: CONFLICT marker detection", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) {
      return {
        stdout: "CONFLICT (content): Merge conflict in src/main.ts\n",
        stderr: "",
        exitCode: 1,
      };
    }
    return ok("src/main.ts\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.cherry_pick.execute(
      { commits: ["abc1234"] },
      ctx,
    );

    assertEquals(writes[0].data.conflict, true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: non-conflict error throws", async () => {
  setCommandExecutor(() => fail("fatal: bad object abc1234"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.cherry_pick.execute(
          { commits: ["abc1234"] },
          ctx,
        ),
      Error,
      "git cherry-pick failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: abort success", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.cherry_pick.execute({ abort: true }, ctx);

    assertEquals(calls[0].includes("cherry-pick"), true);
    assertEquals(calls[0].includes("--abort"), true);

    assertEquals(writes[0].data.aborted, true);
    assertEquals(writes[0].data.conflict, false);
    assertEquals((writes[0].data.commits as string[]).length, 0);
    assertEquals(logs.some((l) => l.message.includes("aborted")), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: abort when no cherry-pick in progress throws", async () => {
  setCommandExecutor(() => fail("error: no cherry-pick or revert in progress"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.cherry_pick.execute({ abort: true }, ctx),
      Error,
      "git cherry-pick --abort failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("cherry_pick: requires commits when not aborting", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.cherry_pick.execute({}, ctx),
      Error,
      "commits are required",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// upstream_state schema validation
// ---------------------------------------------------------------------------

Deno.test("UpstreamStateArgs parses empty input", () => {
  const result = model.methods.upstream_state.arguments.parse({});
  assertEquals(result.branch, undefined);
});

Deno.test("UpstreamStateArgs accepts optional branch", () => {
  const result = model.methods.upstream_state.arguments.parse({
    branch: "main",
  });
  assertEquals(result.branch, "main");
});

Deno.test("UpstreamStateArgs rejects branch starting with dash", () => {
  const result = model.methods.upstream_state.arguments.safeParse({
    branch: "--evil",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// upstream_state operation
// ---------------------------------------------------------------------------

Deno.test("upstream_state: synced with upstream", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("main\n");
    if (callIdx === 2) return ok("origin/main\n");
    return ok("0\t0\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "upstreamStateResult");
    const data = writes[0].data;
    assertEquals(data.branch, "main");
    assertEquals(data.hasUpstream, true);
    assertEquals(data.upstream, "origin/main");
    assertEquals(data.configuredUpstream, "origin/main");
    assertEquals(data.trackingRefAvailable, true);
    assertEquals(data.ahead, 0);
    assertEquals(data.behind, 0);
    assertEquals(data.pushed, true);
    assertEquals(data.synced, true);
    assertEquals(writes[0].tags?.pushed, "true");
    assertEquals(writes[0].tags?.synced, "true");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: ahead only (unpushed commits)", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("feature\n");
    if (callIdx === 2) return ok("origin/feature\n");
    return ok("0\t3\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.branch, "feature");
    assertEquals(data.hasUpstream, true);
    assertEquals(data.trackingRefAvailable, true);
    assertEquals(data.configuredUpstream, "origin/feature");
    assertEquals(data.ahead, 3);
    assertEquals(data.behind, 0);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
    assertEquals(writes[0].tags?.pushed, "false");
    assertEquals(writes[0].tags?.synced, "false");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: behind only", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("main\n");
    if (callIdx === 2) return ok("origin/main\n");
    return ok("5\t0\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.ahead, 0);
    assertEquals(data.behind, 5);
    assertEquals(data.pushed, true);
    assertEquals(data.synced, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: both ahead and behind", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("feature\n");
    if (callIdx === 2) return ok("origin/feature\n");
    return ok("2\t4\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.ahead, 4);
    assertEquals(data.behind, 2);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: no upstream configured", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("feature\n");
    if (callIdx === 2) {
      return fail("fatal: no upstream configured for branch 'feature'");
    }
    if (callIdx === 3) return fail(""); // git config branch.feature.remote
    return fail(""); // git config branch.feature.merge
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.branch, "feature");
    assertEquals(data.hasUpstream, false);
    assertEquals(data.upstream, "");
    assertEquals(data.configuredUpstream, "");
    assertEquals(data.trackingRefAvailable, false);
    assertEquals(data.ahead, 0);
    assertEquals(data.behind, 0);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
    assertEquals(writes[0].tags?.pushed, "false");
    assertEquals(writes[0].tags?.synced, "false");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: detached HEAD", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("HEAD\n");
    if (callIdx === 2) {
      return fail("fatal: no upstream configured for branch 'HEAD'");
    }
    if (callIdx === 3) return fail(""); // git config branch.HEAD.remote
    return fail(""); // git config branch.HEAD.merge
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.branch, "HEAD");
    assertEquals(data.hasUpstream, false);
    assertEquals(data.trackingRefAvailable, false);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: explicit branch arg", async () => {
  let callIdx = 0;
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok("origin/develop\n");
    return ok("1\t2\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({ branch: "develop" }, ctx);

    assertEquals(calls.length, 2);
    assertEquals(calls[0].includes("develop@{u}"), true);

    const data = writes[0].data;
    assertEquals(data.branch, "develop");
    assertEquals(data.hasUpstream, true);
    assertEquals(data.trackingRefAvailable, true);
    assertEquals(data.configuredUpstream, "origin/develop");
    assertEquals(data.upstream, "origin/develop");
    assertEquals(data.ahead, 2);
    assertEquals(data.behind, 1);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: branch with slash sanitizes resource name", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("feature/foo\n");
    if (callIdx === 2) return ok("origin/feature/foo\n");
    return ok("0\t1\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    assertEquals(writes[0].name, "upstream-state-feature-foo");
    assertEquals(writes[0].data.branch, "feature/foo");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: configured upstream but no tracking ref (sparse fetch)", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("mere-dev-flow\n");
    if (callIdx === 2) {
      return fail(
        "fatal: no upstream configured for branch 'mere-dev-flow'",
      );
    }
    if (callIdx === 3) return ok("origin\n"); // git config branch.mere-dev-flow.remote
    return ok("refs/heads/mere-dev-flow\n"); // git config branch.mere-dev-flow.merge
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    assertEquals(writes.length, 1);
    const data = writes[0].data;
    assertEquals(data.branch, "mere-dev-flow");
    assertEquals(data.hasUpstream, true);
    assertEquals(data.trackingRefAvailable, false);
    assertEquals(data.upstream, "");
    assertEquals(data.configuredUpstream, "origin/mere-dev-flow");
    assertEquals(data.ahead, 0);
    assertEquals(data.behind, 0);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
    assertEquals(writes[0].tags?.pushed, "false");
    assertEquals(writes[0].tags?.synced, "false");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: partial config (remote only, no merge) treated as no upstream", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("feature\n");
    if (callIdx === 2) {
      return fail("fatal: no upstream configured for branch 'feature'");
    }
    if (callIdx === 3) return ok("origin\n"); // git config branch.feature.remote
    return fail(""); // git config branch.feature.merge — not set
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.upstream_state.execute({}, ctx);

    const data = writes[0].data;
    assertEquals(data.branch, "feature");
    assertEquals(data.hasUpstream, false);
    assertEquals(data.trackingRefAvailable, false);
    assertEquals(data.configuredUpstream, "");
    assertEquals(data.ahead, 0);
    assertEquals(data.behind, 0);
    assertEquals(data.pushed, false);
    assertEquals(data.synced, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("upstream_state: malformed rev-list output throws", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("main\n");
    if (callIdx === 2) return ok("origin/main\n");
    return ok("garbage output\n");
  });
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.upstream_state.execute({}, ctx),
      Error,
      "unexpected rev-list output",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// AbortSignal threading
// ---------------------------------------------------------------------------

Deno.test("execGit passes signal to executor", async () => {
  let receivedSignal: AbortSignal | undefined;
  const ac = new AbortController();
  setCommandExecutor((_argv, opts) => {
    receivedSignal = opts?.signal;
    return ok("");
  });
  try {
    const { ctx } = makeHarness({}, { signal: ac.signal });
    await model.methods.status.execute({}, ctx);
    assertEquals(receivedSignal, ac.signal);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("aborted signal rejects the method", async () => {
  const ac = new AbortController();
  ac.abort();
  setCommandExecutor((_argv, opts) => {
    if (opts?.signal?.aborted) {
      throw new DOMException("The operation was aborted.", "AbortError");
    }
    return ok("");
  });
  try {
    const { ctx } = makeHarness({}, { signal: ac.signal });
    await assertRejects(
      () => model.methods.status.execute({}, ctx),
      DOMException,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("non-aborted signal does not affect normal execution", async () => {
  const ac = new AbortController();
  setCommandExecutor((_argv, opts) => {
    assertEquals(opts?.signal !== undefined, true);
    assertEquals(opts?.signal?.aborted, false);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness({}, { signal: ac.signal });
    await model.methods.status.execute({}, ctx);
    assertEquals(writes.length, 1);
    assertEquals(writes[0].data.clean, true);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// amend schema validation
// ---------------------------------------------------------------------------

Deno.test("AmendArgs requires message or keepMessage", () => {
  const result = model.methods.amend.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("AmendArgs accepts message only", () => {
  const result = model.methods.amend.arguments.parse({
    message: "new message",
  });
  assertEquals(result.keepMessage, false);
});

Deno.test("AmendArgs accepts keepMessage only", () => {
  const result = model.methods.amend.arguments.parse({ keepMessage: true });
  assertEquals(result.keepMessage, true);
});

Deno.test("AmendArgs rejects message and keepMessage together", () => {
  const result = model.methods.amend.arguments.safeParse({
    message: "new message",
    keepMessage: true,
  });
  assertEquals(result.success, false);
});

Deno.test("AmendArgs defaults addAll to false", () => {
  const result = model.methods.amend.arguments.parse({
    message: "amend msg",
  });
  assertEquals(result.addAll, false);
});

// ---------------------------------------------------------------------------
// amend operation
// ---------------------------------------------------------------------------

Deno.test("amend with new message", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok("oldsha1234567890\n");
    if (callIdx === 2) return ok("");
    return metaOut(
      "newsha0987654321",
      undefined,
      undefined,
      "new commit message",
    );
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.amend.execute(
      { message: "new commit message" },
      ctx,
    );

    // Three calls, not four: the SHA and the subject now come from a single
    // consolidated read-back instead of a rev-parse plus a log --format=%s.
    assertEquals(calls.length, 3);
    assertEquals(calls[0].includes("rev-parse"), true);
    assertEquals(calls[1].includes("--amend"), true);
    assertEquals(calls[1].includes("-m"), true);
    assertEquals(calls[1].includes("new commit message"), true);
    assertEquals(calls[2].includes("log"), true);

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "amendResult");
    assertEquals(writes[0].data.oldSha, "oldsha1234567890");
    assertEquals(writes[0].data.newSha, "newsha0987654321");
    assertEquals(writes[0].data.message, "new commit message");
    assertEquals(writes[0].data.authorDate, "2026-01-01T00:00:00+00:00");
    assertEquals(writes[0].data.committerDate, "2026-01-01T00:00:00+00:00");
    assertEquals(
      logs.some((l) =>
        l.message.includes("oldsha12") && l.message.includes("newsha09")
      ),
      true,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend with keepMessage uses --no-edit", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok("oldsha\n");
    if (callIdx === 2) return ok("");
    return metaOut("newsha", undefined, undefined, "kept message");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.amend.execute({ keepMessage: true }, ctx);

    const commitArgv = calls[1];
    assertEquals(commitArgv.includes("--amend"), true);
    assertEquals(commitArgv.includes("--no-edit"), true);
    assertEquals(commitArgv.includes("-m"), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend stages paths before amending", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok("oldsha\n");
    if (callIdx === 2) return ok("");
    if (callIdx === 3) return ok("");
    return metaOut("newsha", undefined, undefined, "msg");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.amend.execute(
      { message: "msg", paths: ["src/main.ts"] },
      ctx,
    );

    assertEquals(calls[1].includes("add"), true);
    const dashIdx = calls[1].indexOf("--");
    assertEquals(dashIdx > 0, true);
    assertEquals(calls[1].includes("src/main.ts"), true);

    assertEquals(calls[2].includes("--amend"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend with addAll stages all before amending", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok("oldsha\n");
    if (callIdx === 2) return ok("");
    if (callIdx === 3) return ok("");
    return metaOut("newsha", undefined, undefined, "msg");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.amend.execute(
      { message: "msg", addAll: true },
      ctx,
    );

    assertEquals(calls[1].includes("add"), true);
    assertEquals(calls[1].includes("-A"), true);
    assertEquals(calls[2].includes("--amend"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend refuses on empty repo (no HEAD)", async () => {
  setCommandExecutor(() => fail("fatal: bad default revision 'HEAD'", 128));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.amend.execute({ message: "amend" }, ctx),
      Error,
      "cannot amend: no HEAD commit exists",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend uses -c flags for author config", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok("oldsha\n");
    if (callIdx === 2) return ok("");
    return metaOut("newsha", undefined, undefined, "msg");
  });
  try {
    const { ctx } = makeHarness({
      authorName: "Bot",
      authorEmail: "bot@example.com",
    });
    await model.methods.amend.execute({ message: "amend" }, ctx);

    const commitArgv = calls[1];
    assertEquals(commitArgv.includes("-c"), true);
    assertEquals(commitArgv.includes("user.name=Bot"), true);
    assertEquals(commitArgv.includes("user.email=bot@example.com"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend throws on commit --amend failure", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok("oldsha\n");
    return fail("nothing to amend");
  });
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.amend.execute({ message: "amend" }, ctx),
      Error,
      "git commit --amend failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// commit / amend date inputs
//
// The env var names are asserted as literal strings on purpose: git reads
// exactly GIT_AUTHOR_DATE and GIT_COMMITTER_DATE, so a rename must fail here.
// ---------------------------------------------------------------------------

/** Records argv alongside the options each call received, including env. */
function recordingExecutor(
  results: (idx: number) => ExecResult,
): { calls: { argv: string[]; env?: Record<string, string> }[] } {
  const calls: { argv: string[]; env?: Record<string, string> }[] = [];
  let idx = 0;
  setCommandExecutor((argv, opts) => {
    calls.push({ argv, env: opts?.env });
    idx++;
    return results(idx);
  });
  return { calls };
}

Deno.test("commit sets both date env vars", async () => {
  const { calls } = recordingExecutor((idx) => idx === 2 ? metaOut() : ok(""));
  try {
    const { ctx } = makeHarness();
    await model.methods.commit.execute(
      {
        message: "historical",
        authorDate: "2001-02-03T04:05:06+00:00",
        committerDate: "2011-12-13T14:15:16+00:00",
      },
      ctx,
    );

    const commit = calls[0];
    assertEquals(commit.argv.includes("commit"), true);
    assertEquals(commit.env?.GIT_AUTHOR_DATE, "2001-02-03T04:05:06+00:00");
    assertEquals(commit.env?.GIT_COMMITTER_DATE, "2011-12-13T14:15:16+00:00");
    // `--date` sets only the author date, so commit must not use it.
    assertEquals(commit.argv.some((a) => a.startsWith("--date=")), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit mirrors authorDate into committerDate", async () => {
  const { calls } = recordingExecutor((idx) => idx === 2 ? metaOut() : ok(""));
  try {
    const { ctx } = makeHarness();
    await model.methods.commit.execute(
      { message: "mirrored", authorDate: "2001-02-03T04:05:06+00:00" },
      ctx,
    );

    assertEquals(calls[0].env?.GIT_AUTHOR_DATE, "2001-02-03T04:05:06+00:00");
    assertEquals(calls[0].env?.GIT_COMMITTER_DATE, "2001-02-03T04:05:06+00:00");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit with committerDate alone leaves author date untouched", async () => {
  const { calls } = recordingExecutor((idx) => idx === 2 ? metaOut() : ok(""));
  try {
    const { ctx } = makeHarness();
    await model.methods.commit.execute(
      { message: "committer only", committerDate: "2011-12-13T14:15:16+00:00" },
      ctx,
    );

    assertEquals(calls[0].env?.GIT_AUTHOR_DATE, undefined);
    assertEquals(calls[0].env?.GIT_COMMITTER_DATE, "2011-12-13T14:15:16+00:00");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit without dates passes no env at all", async () => {
  const { calls } = recordingExecutor((idx) => idx === 2 ? metaOut() : ok(""));
  try {
    const { ctx } = makeHarness();
    await model.methods.commit.execute({ message: "plain" }, ctx);

    // Regression guard: behavior must be identical to before date support.
    for (const call of calls) {
      assertEquals(call.env, undefined);
    }
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("commit passes dates only to the commit, not to staging", async () => {
  const { calls } = recordingExecutor((idx) => idx === 3 ? metaOut() : ok(""));
  try {
    const { ctx } = makeHarness();
    await model.methods.commit.execute(
      { message: "staged", addAll: true, authorDate: "2001-02-03T04:05:06Z" },
      ctx,
    );

    assertEquals(calls[0].argv.includes("add"), true);
    assertEquals(calls[0].env, undefined);
    assertEquals(calls[1].env?.GIT_AUTHOR_DATE, "2001-02-03T04:05:06Z");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend sends author date via --date, not env", async () => {
  const { calls } = recordingExecutor((idx) =>
    idx === 1 ? ok("oldsha\n") : idx === 3 ? metaOut("newsha") : ok("")
  );
  try {
    const { ctx } = makeHarness();
    await model.methods.amend.execute(
      {
        message: "rewritten",
        authorDate: "2001-02-03T04:05:06+00:00",
        committerDate: "2011-12-13T14:15:16+00:00",
      },
      ctx,
    );

    const amend = calls[1];
    assertEquals(amend.argv.includes("--amend"), true);
    // `git commit --amend` reuses the original author info and ignores
    // GIT_AUTHOR_DATE outright, so the author date has to ride on --date.
    assertEquals(
      amend.argv.includes("--date=2001-02-03T04:05:06+00:00"),
      true,
    );
    assertEquals(amend.env?.GIT_AUTHOR_DATE, undefined);
    assertEquals(amend.env?.GIT_COMMITTER_DATE, "2011-12-13T14:15:16+00:00");
    // --reset-author would clobber the original author name and email.
    assertEquals(amend.argv.includes("--reset-author"), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend mirrors authorDate into the committer env", async () => {
  const { calls } = recordingExecutor((idx) =>
    idx === 1 ? ok("oldsha\n") : idx === 3 ? metaOut("newsha") : ok("")
  );
  try {
    const { ctx } = makeHarness();
    await model.methods.amend.execute(
      { message: "rewritten", authorDate: "2001-02-03T04:05:06+00:00" },
      ctx,
    );

    assertEquals(
      calls[1].argv.includes("--date=2001-02-03T04:05:06+00:00"),
      true,
    );
    assertEquals(
      calls[1].env?.GIT_COMMITTER_DATE,
      "2001-02-03T04:05:06+00:00",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("amend with committerDate alone emits no --date", async () => {
  const { calls } = recordingExecutor((idx) =>
    idx === 1 ? ok("oldsha\n") : idx === 3 ? metaOut("newsha") : ok("")
  );
  try {
    const { ctx } = makeHarness();
    await model.methods.amend.execute(
      { message: "rewritten", committerDate: "2011-12-13T14:15:16+00:00" },
      ctx,
    );

    assertEquals(calls[1].argv.some((a) => a.startsWith("--date=")), false);
    assertEquals(
      calls[1].env?.GIT_COMMITTER_DATE,
      "2011-12-13T14:15:16+00:00",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("date inputs reject empty and control-character values", () => {
  for (const bad of ["", "   ", "2001-01-01\nGIT_COMMITTER_DATE=evil"]) {
    assertThrows(
      () =>
        model.methods.commit.arguments.parse({ message: "m", authorDate: bad }),
      Error,
    );
    assertThrows(
      () =>
        model.methods.amend.arguments.parse({
          message: "m",
          committerDate: bad,
        }),
      Error,
    );
  }
});

// ---------------------------------------------------------------------------
// Real-git integration
//
// Every other test in this file mocks the executor, which verifies the SHAPE of
// the command but not whether git honors it. That gap is not hypothetical: an
// env-only amend sets GIT_AUTHOR_DATE, exits 0, and leaves the author date at
// wall clock — a mock asserting the env var is present would pass while the
// commit object is wrong. This test runs the real binary so that class of bug
// fails here instead of in a user's history.
// ---------------------------------------------------------------------------

/**
 * Compare two date strings by instant rather than spelling — git normalizes
 * `+00:00` to `Z` when it formats `%aI`/`%cI`, so the round trip is not
 * character-identical even when the timestamp is exactly right.
 */
function assertSameInstant(actual: string, expected: string): void {
  assertEquals(
    Date.parse(actual),
    Date.parse(expected),
    `expected ${actual} to be the same instant as ${expected}`,
  );
}

/** Run git directly, bypassing the extension, for arrange and assert steps. */
async function rawGit(cwd: string, ...args: string[]): Promise<string> {
  const output = await new Deno.Command("git", {
    args,
    cwd,
    stdout: "piped",
    stderr: "piped",
  }).output();
  if (output.code !== 0) {
    throw new Error(
      `test setup: git ${args.join(" ")} failed (exit ${output.code}): ${
        new TextDecoder().decode(output.stderr)
      }`,
    );
  }
  return new TextDecoder().decode(output.stdout).trim();
}

Deno.test("real git honors the dates commit and amend send", async () => {
  // Fixture dates pin explicit UTC offsets so assertions do not drift with the
  // runner's local timezone.
  const authorDate = "2001-02-03T04:05:06+00:00";
  const committerDate = "2011-12-13T14:15:16+00:00";
  const amendDate = "1995-06-07T08:09:10+00:00";

  let repo: string;
  try {
    repo = await Deno.makeTempDir({ prefix: "swamp-git-dates-" });
  } catch (error) {
    throw new Error(
      `test setup: could not create a temp dir: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  try {
    try {
      // -b pins the branch so the test does not depend on the runner's
      // init.defaultBranch, and surfaces a missing git binary as a clear error.
      await rawGit(repo, "init", "-q", "-b", "main", ".");
    } catch (error) {
      throw new Error(
        `real-git test needs a working git binary on PATH: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
    // Repo-local identity so results never depend on the developer's global
    // git config.
    await rawGit(repo, "config", "user.name", "Original Author");
    await rawGit(repo, "config", "user.email", "original@example.com");
    await Deno.writeTextFile(`${repo}/file.txt`, "one\n");

    const { ctx, writes } = makeHarness({ repoPath: repo });

    await model.methods.commit.execute(
      { message: "dated commit", addAll: true, authorDate, committerDate },
      ctx,
    );

    assertSameInstant(
      await rawGit(repo, "log", "-1", "--format=%aI"),
      authorDate,
    );
    assertSameInstant(
      await rawGit(repo, "log", "-1", "--format=%cI"),
      committerDate,
    );
    assertSameInstant(writes[0].data.authorDate as string, authorDate);
    assertSameInstant(writes[0].data.committerDate as string, committerDate);

    // Amend with a single date: it must reach BOTH timestamps on the rewritten
    // object. Passing it through GIT_AUTHOR_DATE alone would silently leave the
    // author date at the original value.
    await Deno.writeTextFile(`${repo}/file.txt`, "two\n");
    await model.methods.amend.execute(
      { message: "dated amend", addAll: true, authorDate: amendDate },
      ctx,
    );

    assertSameInstant(
      await rawGit(repo, "log", "-1", "--format=%aI"),
      amendDate,
    );
    assertSameInstant(
      await rawGit(repo, "log", "-1", "--format=%cI"),
      amendDate,
    );
    // The original author identity survives — this is why --reset-author is
    // not used to set the amend author date.
    assertEquals(
      await rawGit(repo, "log", "-1", "--format=%an <%ae>"),
      "Original Author <original@example.com>",
    );
    assertSameInstant(writes[1].data.authorDate as string, amendDate);
    assertSameInstant(writes[1].data.committerDate as string, amendDate);
    assertEquals(writes[1].data.message, "dated amend");
  } finally {
    await Deno.remove(repo, { recursive: true });
  }
});

Deno.test("date inputs accept the formats git accepts", () => {
  for (
    const good of [
      "2001-02-03T04:05:06+00:00",
      "Sat, 3 Feb 2001 04:05:06 +0000",
      "@981173106 +0000",
      "2 hours ago",
    ]
  ) {
    const parsed = model.methods.commit.arguments.parse({
      message: "m",
      authorDate: good,
    });
    assertEquals(parsed.authorDate, good);
  }
});

// ---------------------------------------------------------------------------
// push forceWithLease operation
// ---------------------------------------------------------------------------

Deno.test("push forceWithLease passes --force-with-lease", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.push.execute({
      branch: "main",
      forceWithLease: true,
    }, ctx);

    assertEquals(calls[0].includes("--force-with-lease"), true);
    assertEquals(calls[0].includes("--force"), false);
    assertEquals(writes[0].data.forced, true);
    assertEquals(writes[0].data.forceWithLease, true);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// remote_ref schema validation
// ---------------------------------------------------------------------------

Deno.test("RemoteRefArgs requires ref", () => {
  const result = model.methods.remote_ref.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("RemoteRefArgs accepts ref only (remote defaults)", () => {
  const result = model.methods.remote_ref.arguments.parse({
    ref: "refs/heads/main",
  });
  assertEquals(result.ref, "refs/heads/main");
  assertEquals(result.remote, undefined);
});

Deno.test("RemoteRefArgs accepts ref and remote", () => {
  const result = model.methods.remote_ref.arguments.parse({
    remote: "upstream",
    ref: "refs/heads/main",
  });
  assertEquals(result.remote, "upstream");
  assertEquals(result.ref, "refs/heads/main");
});

Deno.test("RemoteRefArgs rejects ref starting with dash", () => {
  const result = model.methods.remote_ref.arguments.safeParse({
    ref: "--upload-pack",
  });
  assertEquals(result.success, false);
});

Deno.test("RemoteRefArgs rejects remote starting with dash", () => {
  const result = model.methods.remote_ref.arguments.safeParse({
    remote: "--upload-pack",
    ref: "main",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// remote_ref operation
// ---------------------------------------------------------------------------

Deno.test("remote_ref: single ref found", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("abc1234def5678901234567890abcdef12345678\trefs/heads/main\n");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.remote_ref.execute(
      { ref: "refs/heads/main" },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("ls-remote"), true);
    assertEquals(argv.includes("origin"), true);
    assertEquals(argv.includes("refs/heads/main"), true);
    const dashIdx = argv.indexOf("--");
    assertEquals(
      dashIdx > 0,
      true,
      "ls-remote must use -- before positional args",
    );

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "remoteRefResult");
    assertEquals(writes[0].data.remote, "origin");
    assertEquals(writes[0].data.ref, "refs/heads/main");
    assertEquals(
      writes[0].data.sha,
      "abc1234def5678901234567890abcdef12345678",
    );
    assertEquals(writes[0].name, "remote-ref-refs-heads-main");
    assertEquals(writes[0].tags?.method, "remote-ref");

    assertEquals(logs.some((l) => l.message.includes("abc1234d")), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: shorthand ref resolved", async () => {
  setCommandExecutor(() =>
    ok("abc1234def5678901234567890abcdef12345678\trefs/heads/main\n")
  );
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.remote_ref.execute({ ref: "main" }, ctx);

    assertEquals(writes[0].data.ref, "refs/heads/main");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: override remote", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("abc1234def5678901234567890abcdef12345678\trefs/heads/main\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.remote_ref.execute(
      { remote: "upstream", ref: "main" },
      ctx,
    );

    assertEquals(calls[0].includes("upstream"), true);
    assertEquals(writes[0].data.remote, "upstream");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: absent ref throws", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.remote_ref.execute({ ref: "nonexistent" }, ctx),
      Error,
      "ref not found",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: ambiguous ref throws with ref list", async () => {
  setCommandExecutor(() =>
    ok(
      "abc1234def5678901234567890abcdef12345678\trefs/heads/main\n" +
        "def5678abc1234901234567890abcdef12345678\trefs/tags/main\n",
    )
  );
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.remote_ref.execute({ ref: "main" }, ctx),
      Error,
      "ambiguous ref",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: peeled tag entries filtered out", async () => {
  setCommandExecutor(() =>
    ok(
      "abc1234def5678901234567890abcdef12345678\trefs/tags/v1.0.0\n" +
        "def5678abc1234901234567890abcdef12345678\trefs/tags/v1.0.0^{}\n",
    )
  );
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.remote_ref.execute({ ref: "v1.0.0" }, ctx);

    assertEquals(writes[0].data.ref, "refs/tags/v1.0.0");
    assertEquals(
      writes[0].data.sha,
      "abc1234def5678901234567890abcdef12345678",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: git ls-remote failure throws", async () => {
  setCommandExecutor(() => fail("fatal: could not read from remote"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.remote_ref.execute({ ref: "refs/heads/main" }, ctx),
      Error,
      "git ls-remote failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: uses repoPath from globalArgs", async () => {
  const calls: { argv: string[]; opts?: { cwd?: string } }[] = [];
  setCommandExecutor((argv, opts) => {
    calls.push({ argv, opts });
    return ok("abc1234def5678901234567890abcdef12345678\trefs/heads/main\n");
  });
  try {
    const { ctx } = makeHarness({ repoPath: "/my/repo" });
    await model.methods.remote_ref.execute(
      { ref: "refs/heads/main" },
      ctx,
    );

    assertEquals(calls[0].opts?.cwd, "/my/repo");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remote_ref: signal passed to executor", async () => {
  let receivedSignal: AbortSignal | undefined;
  const ac = new AbortController();
  setCommandExecutor((_argv, opts) => {
    receivedSignal = opts?.signal;
    return ok("abc1234def5678901234567890abcdef12345678\trefs/heads/main\n");
  });
  try {
    const { ctx } = makeHarness({}, { signal: ac.signal });
    await model.methods.remote_ref.execute(
      { ref: "refs/heads/main" },
      ctx,
    );
    assertEquals(receivedSignal, ac.signal);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// is_ancestor schema validation
// ---------------------------------------------------------------------------

Deno.test("IsAncestorArgs requires ancestor and descendant", () => {
  const result = model.methods.is_ancestor.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("IsAncestorArgs accepts valid refs", () => {
  const result = model.methods.is_ancestor.arguments.parse({
    ancestor: "abc1234",
    descendant: "def5678",
  });
  assertEquals(result.ancestor, "abc1234");
  assertEquals(result.descendant, "def5678");
});

Deno.test("IsAncestorArgs rejects ancestor starting with dash", () => {
  const result = model.methods.is_ancestor.arguments.safeParse({
    ancestor: "--evil",
    descendant: "HEAD",
  });
  assertEquals(result.success, false);
});

Deno.test("IsAncestorArgs rejects descendant starting with dash", () => {
  const result = model.methods.is_ancestor.arguments.safeParse({
    ancestor: "HEAD",
    descendant: "--evil",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// is_ancestor operation
// ---------------------------------------------------------------------------

Deno.test("is_ancestor: true when ancestor", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.is_ancestor.execute(
      { ancestor: "abc1234", descendant: "def5678" },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("merge-base"), true);
    assertEquals(argv.includes("--is-ancestor"), true);
    assertEquals(argv.includes("abc1234"), true);
    assertEquals(argv.includes("def5678"), true);

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "isAncestorResult");
    assertEquals(writes[0].data.ancestor, "abc1234");
    assertEquals(writes[0].data.descendant, "def5678");
    assertEquals(writes[0].data.isAncestor, true);
    assertEquals(writes[0].tags?.isAncestor, "true");
    assertEquals(logs.some((l) => l.message.includes("is an ancestor")), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("is_ancestor: false when not ancestor", async () => {
  setCommandExecutor(() => ({ stdout: "", stderr: "", exitCode: 1 }));
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.is_ancestor.execute(
      { ancestor: "abc1234", descendant: "def5678" },
      ctx,
    );

    assertEquals(writes[0].data.isAncestor, false);
    assertEquals(writes[0].tags?.isAncestor, "false");
    assertEquals(
      logs.some((l) => l.message.includes("is not an ancestor")),
      true,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("is_ancestor: throws on bad ref (exit code 128)", async () => {
  setCommandExecutor(() => ({
    stdout: "",
    stderr: "fatal: Not a valid commit name nonexistent",
    exitCode: 128,
  }));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.is_ancestor.execute(
          { ancestor: "nonexistent", descendant: "HEAD" },
          ctx,
        ),
      Error,
      "git merge-base --is-ancestor failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("is_ancestor: uses repoPath from globalArgs", async () => {
  const calls: { argv: string[]; opts?: { cwd?: string } }[] = [];
  setCommandExecutor((argv, opts) => {
    calls.push({ argv, opts });
    return ok("");
  });
  try {
    const { ctx } = makeHarness({ repoPath: "/my/repo" });
    await model.methods.is_ancestor.execute(
      { ancestor: "abc", descendant: "def" },
      ctx,
    );

    assertEquals(calls[0].opts?.cwd, "/my/repo");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// orphan branch schema validation and operation
// ---------------------------------------------------------------------------

Deno.test("BranchArgs orphan defaults to false", () => {
  const result = model.methods.branch.arguments.parse({});
  assertEquals(result.orphan, false);
});

Deno.test("BranchArgs rejects orphan without create", () => {
  const result = model.methods.branch.arguments.safeParse({
    name: "evidence",
    orphan: true,
  });
  assertEquals(result.success, false);
});

Deno.test("BranchArgs rejects orphan with startPoint", () => {
  const result = model.methods.branch.arguments.safeParse({
    name: "evidence",
    create: true,
    orphan: true,
    startPoint: "main",
  });
  assertEquals(result.success, false);
});

Deno.test("BranchArgs accepts orphan with create", () => {
  const result = model.methods.branch.arguments.parse({
    name: "evidence",
    create: true,
    orphan: true,
  });
  assertEquals(result.orphan, true);
  assertEquals(result.create, true);
});

Deno.test("branch orphan create uses --orphan flag", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.branch.execute(
      { name: "evidence", create: true, orphan: true },
      ctx,
    );

    const argv = calls[0];
    assertEquals(argv.includes("checkout"), true);
    assertEquals(argv.includes("--orphan"), true);
    assertEquals(argv.includes("evidence"), true);
    assertEquals(argv.includes("-b"), false);

    assertEquals(writes[0].data.current, "evidence");
    assertEquals(writes[0].data.created, true);
    assertEquals(writes[0].data.orphan, true);
    assertEquals(
      logs.some((l) => l.message.includes("orphan branch")),
      true,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch non-orphan create still uses -b", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute(
      { name: "feature", create: true },
      ctx,
    );

    assertEquals(calls[0].includes("-b"), true);
    assertEquals(calls[0].includes("--orphan"), false);
    assertEquals(writes[0].data.orphan, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch orphan create throws on failure", async () => {
  setCommandExecutor(() => fail("fatal: cannot checkout orphan"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.branch.execute(
          { name: "evidence", create: true, orphan: true },
          ctx,
        ),
      Error,
      "git checkout --orphan failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// remove_worktree schema validation
// ---------------------------------------------------------------------------

Deno.test("RemoveWorktreeArgs requires path", () => {
  const result = model.methods.remove_worktree.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("RemoveWorktreeArgs accepts path", () => {
  const result = model.methods.remove_worktree.arguments.parse({
    path: "/tmp/worktree",
  });
  assertEquals(result.path, "/tmp/worktree");
});

Deno.test("RemoveWorktreeArgs rejects path starting with dash", () => {
  const result = model.methods.remove_worktree.arguments.safeParse({
    path: "--force",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// remove_worktree operation
// ---------------------------------------------------------------------------

const WORKTREE_LIST_PRIMARY = [
  "worktree /repo",
  "HEAD abc1234",
  "branch refs/heads/main",
  "",
].join("\n");

const WORKTREE_LIST_WITH_SECONDARY = [
  "worktree /repo",
  "HEAD abc1234",
  "branch refs/heads/main",
  "",
  "worktree /tmp/wt-feature",
  "HEAD def5678",
  "branch refs/heads/feature",
  "",
].join("\n");

Deno.test("remove_worktree: refuses primary checkout", async () => {
  setCommandExecutor(() => ok(WORKTREE_LIST_PRIMARY));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.remove_worktree.execute(
          { path: "/repo" },
          ctx,
        ),
      Error,
      "cannot remove the primary checkout",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: idempotent when absent", async () => {
  setCommandExecutor(() => ok(WORKTREE_LIST_PRIMARY));
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.remove_worktree.execute(
      { path: "/tmp/nonexistent" },
      ctx,
    );

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "removeWorktreeResult");
    assertEquals(writes[0].data.removed, false);
    assertEquals(writes[0].data.alreadyAbsent, true);
    assertEquals(writes[0].data.reason, "worktree not registered");
    assertEquals(writes[0].tags?.removed, "false");
    assertEquals(
      logs.some((l) => l.message.includes("already absent")),
      true,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: refuses dirty worktree", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok(WORKTREE_LIST_WITH_SECONDARY);
    return ok(" M dirty-file.ts\n");
  });
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.remove_worktree.execute(
          { path: "/tmp/wt-feature" },
          ctx,
        ),
      Error,
      "worktree has uncommitted changes",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: removes clean secondary worktree", async () => {
  const calls: string[][] = [];
  let callIdx = 0;
  setCommandExecutor((argv) => {
    calls.push(argv);
    callIdx++;
    if (callIdx === 1) return ok(WORKTREE_LIST_WITH_SECONDARY);
    if (callIdx === 2) return ok("");
    return ok("");
  });
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.remove_worktree.execute(
      { path: "/tmp/wt-feature" },
      ctx,
    );

    assertEquals(calls[1].includes("status"), true);
    assertEquals(calls[1].includes("--porcelain"), true);
    assertEquals(calls[2].includes("worktree"), true);
    assertEquals(calls[2].includes("remove"), true);
    assertEquals(calls[2].includes("/tmp/wt-feature"), true);

    assertEquals(writes[0].data.removed, true);
    assertEquals(writes[0].data.alreadyAbsent, false);
    assertEquals(writes[0].data.reason, "worktree removed");
    assertEquals(writes[0].tags?.removed, "true");
    assertEquals(
      logs.some((l) => l.message.includes("removed worktree")),
      true,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: throws when git status fails in worktree", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok(WORKTREE_LIST_WITH_SECONDARY);
    return fail("fatal: not a git repository", 128);
  });
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.remove_worktree.execute(
          { path: "/tmp/wt-feature" },
          ctx,
        ),
      Error,
      "git status failed for worktree",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: throws on git worktree remove failure", async () => {
  let callIdx = 0;
  setCommandExecutor(() => {
    callIdx++;
    if (callIdx === 1) return ok(WORKTREE_LIST_WITH_SECONDARY);
    if (callIdx === 2) return ok("");
    return fail("fatal: worktree remove failed");
  });
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.remove_worktree.execute(
          { path: "/tmp/wt-feature" },
          ctx,
        ),
      Error,
      "git worktree remove failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: throws on git worktree list failure", async () => {
  setCommandExecutor(() => fail("fatal: not a git repository"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.remove_worktree.execute(
          { path: "/tmp/wt" },
          ctx,
        ),
      Error,
      "git worktree list failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("remove_worktree: trailing slash on path is normalized", async () => {
  setCommandExecutor(() => ok(WORKTREE_LIST_PRIMARY));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.remove_worktree.execute(
      { path: "/tmp/nonexistent/" },
      ctx,
    );

    assertEquals(writes[0].data.path, "/tmp/nonexistent");
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// worktree_diff schema validation
// ---------------------------------------------------------------------------

Deno.test("WorktreeDiffArgs defaults", () => {
  const result = model.methods.worktree_diff.arguments.parse({});
  assertEquals(result.base, "HEAD");
  assertEquals(result.nameOnly, false);
  assertEquals(result.stat, false);
  assertEquals(result.paths, undefined);
});

Deno.test("WorktreeDiffArgs accepts base override", () => {
  const result = model.methods.worktree_diff.arguments.parse({
    base: "HEAD~3",
  });
  assertEquals(result.base, "HEAD~3");
});

Deno.test("WorktreeDiffArgs rejects base starting with dash", () => {
  const result = model.methods.worktree_diff.arguments.safeParse({
    base: "--output=/tmp/exfil",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// worktree_diff operation
// ---------------------------------------------------------------------------

Deno.test("worktree_diff: nameOnly returns tracked and untracked files", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    if (argv.includes("ls-files")) {
      return ok("new-file.ts\n");
    }
    // nameOnly: the --name-only call is the only diff call
    return ok("src/main.ts\nsrc/lib.ts\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute(
      { nameOnly: true },
      ctx,
    );

    // nameOnly: (1) diff --name-only, (2) ls-files
    assertEquals(calls.length, 2);
    assertEquals(calls[0].includes("diff"), true);
    assertEquals(calls[0].includes("HEAD"), true);
    assertEquals(calls[0].includes("--name-only"), true);
    assertEquals(calls[1].includes("ls-files"), true);
    assertEquals(calls[1].includes("--others"), true);
    assertEquals(calls[1].includes("--exclude-standard"), true);

    assertEquals(writes.length, 1);
    assertEquals(writes[0].specName, "worktreeDiffResult");
    const data = writes[0].data;
    assertEquals((data.files as string[]).length, 3);
    assertEquals((data.files as string[])[0], "src/main.ts");
    assertEquals((data.files as string[])[1], "src/lib.ts");
    assertEquals((data.files as string[])[2], "new-file.ts");
    assertEquals((data.untrackedFiles as string[]).length, 1);
    assertEquals((data.untrackedFiles as string[])[0], "new-file.ts");
    assertEquals(data.count, 3);
    assertEquals(data.base, "HEAD");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: full diff includes untracked file patches", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    if (argv.includes("ls-files")) {
      return ok("new-file.ts\n");
    }
    if (argv.includes("--no-index")) {
      return {
        stdout: "diff --no-index a/dev/null b/new-file.ts\n",
        stderr: "",
        exitCode: 1,
      };
    }
    if (argv.includes("--name-only")) {
      return ok("src/main.ts\n");
    }
    return ok("diff --git a/src/main.ts b/src/main.ts\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute({}, ctx);

    // full diff: (1) diff --name-only, (2) diff (patch), (3) ls-files, (4) diff --no-index
    assertEquals(calls.length, 4);
    assertEquals(calls[0].includes("--name-only"), true);
    assertEquals(calls[3].includes("--no-index"), true);
    assertEquals(calls[3].includes("/dev/null"), true);
    assertEquals(calls[3].includes("new-file.ts"), true);

    const data = writes[0].data;
    const raw = data.raw as string;
    assertEquals(raw.includes("diff --git a/src/main.ts"), true);
    assertEquals(raw.includes("diff --no-index a/dev/null"), true);
    assertEquals((data.files as string[]).length, 2);
    assertEquals((data.files as string[])[0], "src/main.ts");
    assertEquals((data.files as string[])[1], "new-file.ts");
    assertEquals(data.count, 2);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: full diff with tracked-only changes has correct count", async () => {
  setCommandExecutor((argv) => {
    if (argv.includes("ls-files")) {
      return ok("");
    }
    if (argv.includes("--name-only")) {
      return ok("src/main.ts\nsrc/lib.ts\nsrc/util.ts\n");
    }
    return ok("diff --git a/src/main.ts b/src/main.ts\n<patch content>\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute({}, ctx);

    const data = writes[0].data;
    assertEquals((data.files as string[]).length, 3);
    assertEquals(data.count, 3);
    assertEquals((data.untrackedFiles as string[]).length, 0);
    assertEquals((data.raw as string).includes("diff --git"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: stat mode skips untracked file patches", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    if (argv.includes("ls-files")) {
      return ok("new-file.ts\n");
    }
    if (argv.includes("--name-only")) {
      return ok("src/main.ts\n");
    }
    return ok(" 1 file changed, 5 insertions(+)\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute({ stat: true }, ctx);

    // stat: (1) diff --name-only, (2) diff --stat, (3) ls-files
    assertEquals(calls.length, 3);
    assertEquals(calls[0].includes("--name-only"), true);
    assertEquals(calls[1].includes("--stat"), true);

    const data = writes[0].data;
    assertEquals((data.files as string[]).length, 2);
    assertEquals(data.count, 2);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: no untracked files", async () => {
  setCommandExecutor((argv) => {
    if (argv.includes("ls-files")) {
      return ok("");
    }
    return ok("src/main.ts\n");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute({ nameOnly: true }, ctx);

    const data = writes[0].data;
    assertEquals((data.files as string[]).length, 1);
    assertEquals((data.untrackedFiles as string[]).length, 0);
    assertEquals(data.count, 1);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: clean working tree", async () => {
  setCommandExecutor((argv) => {
    if (argv.includes("ls-files")) {
      return ok("");
    }
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute({ nameOnly: true }, ctx);

    const data = writes[0].data;
    assertEquals((data.files as string[]).length, 0);
    assertEquals((data.untrackedFiles as string[]).length, 0);
    assertEquals(data.count, 0);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: custom base ref", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    if (argv.includes("ls-files")) {
      return ok("");
    }
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.worktree_diff.execute(
      { base: "HEAD~3", nameOnly: true },
      ctx,
    );

    assertEquals(calls[0].includes("HEAD~3"), true);
    assertEquals(writes[0].data.base, "HEAD~3");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: path filters passed to all commands", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    if (argv.includes("ls-files")) {
      return ok("");
    }
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await model.methods.worktree_diff.execute(
      { nameOnly: true, paths: ["src/", "lib/"] },
      ctx,
    );

    const diffArgv = calls[0];
    const diffDashIdx = diffArgv.indexOf("--");
    assertEquals(diffDashIdx > 0, true);
    assertEquals(diffArgv[diffDashIdx + 1], "src/");
    assertEquals(diffArgv[diffDashIdx + 2], "lib/");

    const lsArgv = calls[1];
    const lsDashIdx = lsArgv.indexOf("--");
    assertEquals(lsDashIdx > 0, true);
    assertEquals(lsArgv[lsDashIdx + 1], "src/");
    assertEquals(lsArgv[lsDashIdx + 2], "lib/");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: throws on git diff failure", async () => {
  setCommandExecutor(() => fail("fatal: bad ref"));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.worktree_diff.execute({}, ctx),
      Error,
      "git diff failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: throws on git ls-files failure", async () => {
  setCommandExecutor((argv) => {
    if (argv.includes("ls-files")) {
      return fail("fatal: not a git repository");
    }
    return ok("");
  });
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () => model.methods.worktree_diff.execute({}, ctx),
      Error,
      "git ls-files failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: uses repoPath from globalArgs", async () => {
  const calls: { argv: string[]; opts?: { cwd?: string } }[] = [];
  setCommandExecutor((argv, opts) => {
    calls.push({ argv, opts });
    if (argv.includes("ls-files")) {
      return ok("");
    }
    return ok("");
  });
  try {
    const { ctx } = makeHarness({ repoPath: "/my/repo" });
    await model.methods.worktree_diff.execute({ nameOnly: true }, ctx);

    assertEquals(calls[0].opts?.cwd, "/my/repo");
    assertEquals(calls[1].opts?.cwd, "/my/repo");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("worktree_diff: signal passed to executor", async () => {
  let receivedSignal: AbortSignal | undefined;
  const ac = new AbortController();
  setCommandExecutor((_argv, opts) => {
    receivedSignal = opts?.signal;
    if (_argv.includes("ls-files")) {
      return ok("");
    }
    return ok("");
  });
  try {
    const { ctx } = makeHarness({}, { signal: ac.signal });
    await model.methods.worktree_diff.execute({}, ctx);
    assertEquals(receivedSignal, ac.signal);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// ensure_checkout — argument schema
// ---------------------------------------------------------------------------

Deno.test("EnsureCheckoutArgs requires url and path", () => {
  const args = model.methods.ensure_checkout.arguments;
  assertEquals(args.safeParse({}).success, false);
  assertEquals(args.safeParse({ url: "https://x/o/r" }).success, false);
  assertEquals(args.safeParse({ path: "r" }).success, false);
});

Deno.test("EnsureCheckoutArgs defaults reset to false", () => {
  const result = model.methods.ensure_checkout.arguments.parse({
    url: "https://github.com/org/repo",
    path: "repo",
  });
  assertEquals(result.reset, false);
});

Deno.test("EnsureCheckoutArgs rejects ref and branch starting with dash", () => {
  const args = model.methods.ensure_checkout.arguments;
  assertEquals(
    args.safeParse({ url: "u", path: "p", ref: "--upload-pack=x" }).success,
    false,
  );
  assertEquals(
    args.safeParse({ url: "u", path: "p", branch: "-x" }).success,
    false,
  );
});

// ---------------------------------------------------------------------------
// ensure_checkout — remote identity
// ---------------------------------------------------------------------------

Deno.test("normaliseRemote treats spellings of one repository as equal", () => {
  const expected = { host: "github.com", path: "org/repo" };
  for (
    const url of [
      "https://github.com/org/repo",
      "https://github.com/org/repo.git",
      "https://github.com/org/repo/",
      "https://GitHub.com/Org/Repo.git",
      "https://user:secret@github.com/org/repo.git",
      "https://github.com:443/org/repo.git",
      "http://github.com/org/repo",
      "ssh://git@github.com/org/repo.git",
      "ssh://git@github.com:22/org/repo.git",
      "git@github.com:org/repo.git",
      "github.com:org/repo",
    ]
  ) {
    assertEquals(normaliseRemote(url, "/base"), expected, url);
  }
});

Deno.test("normaliseRemote distinguishes different repositories", () => {
  const base = normaliseRemote("https://github.com/org/repo", "/base");
  for (
    const url of [
      "https://github.com/org/other",
      "https://github.com/someone/repo",
      "https://git.swamp-club.com/org/repo",
      "git@github-work:org/repo.git",
    ]
  ) {
    assertEquals(
      JSON.stringify(normaliseRemote(url, "/base")) === JSON.stringify(base),
      false,
      url,
    );
  }
});

Deno.test("normaliseRemote keeps nested group paths whole", () => {
  assertEquals(
    normaliseRemote("git@gitlab.com:group/sub/name.git", "/base"),
    { host: "gitlab.com", path: "group/sub/name" },
  );
  assertEquals(
    normaliseRemote("https://gitlab.com/group/sub/name", "/base"),
    { host: "gitlab.com", path: "group/sub/name" },
  );
});

Deno.test("normaliseRemote resolves local paths and file URLs alike", () => {
  const plain = normaliseRemote("/srv/repos/thing.git", "/base");
  assertEquals(plain, { host: "", path: "srv/repos/thing.git" });
  assertEquals(normaliseRemote("file:///srv/repos/thing.git", "/base"), plain);
  assertEquals(normaliseRemote("repos/thing.git/", "/srv"), plain);
});

Deno.test("normaliseRemote keeps a malformed percent escape as-is", () => {
  assertEquals(
    normaliseRemote("https://example.com/org/100%zz", "/base"),
    { host: "example.com", path: "org/100%zz" },
  );
});

Deno.test("ensure_checkout scrubs credentials from a URL parse error", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx } = makeHarness();
    // Port out of range: the URL parser's error message repeats its input.
    const error = await assertRejects(() =>
      model.methods.ensure_checkout.execute({
        url: "https://bot:hunter2@example.com:99999/org/repo",
        path: `swamp-git-absent-${crypto.randomUUID()}`,
        token: "t",
      }, ctx)
    );
    const message = (error as Error).message;
    assertEquals(message.includes("hunter2"), false);
    // The parser's own error, scrubbed — not some unrelated failure.
    assertEquals(message.includes("https://***@example.com:99999"), true);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("normaliseRemote compares local paths exactly", () => {
  // A local filesystem is case-sensitive and x and x.git are different
  // directories, so neither may be folded together — this comparison is what
  // stops reset running against the wrong checkout.
  const repo = normaliseRemote("/srv/repo", "/base");
  assertEquals(
    JSON.stringify(normaliseRemote("/srv/Repo", "/base")) ===
      JSON.stringify(repo),
    false,
  );
  assertEquals(
    JSON.stringify(normaliseRemote("/srv/repo.git", "/base")) ===
      JSON.stringify(repo),
    false,
  );
});

// ---------------------------------------------------------------------------
// ensure_checkout — mocked git
// ---------------------------------------------------------------------------

interface RecordedCall {
  argv: string[];
  cwd?: string;
  env?: Record<string, string>;
}

/**
 * Executor that answers by git subcommand. Unlisted subcommands succeed with
 * empty output.
 */
function routeGit(
  calls: RecordedCall[],
  routes: Record<string, (argv: string[]) => ExecResult>,
) {
  return (
    argv: string[],
    opts?: { cwd?: string; env?: Record<string, string> },
  ): ExecResult => {
    calls.push({ argv, cwd: opts?.cwd, env: opts?.env });
    const sub = argv[1];
    const key = Object.keys(routes).find((k) =>
      k === sub || argv.slice(1).join(" ").startsWith(k)
    );
    return key ? routes[key](argv) : ok("");
  };
}

const GIT_CONFIG_ENV = /^GIT_CONFIG_(COUNT|KEY_\d+|VALUE_\d+)$/;

/**
 * Clears every GIT_CONFIG_COUNT/KEY_n/VALUE_n so the operator's environment
 * cannot leak into assertions. The returned function removes whatever the
 * test set and puts the originals back.
 */
function withoutGitConfigEnv(): () => void {
  const saved = Object.entries(Deno.env.toObject()).filter(([name]) =>
    GIT_CONFIG_ENV.test(name)
  );
  for (const [name] of saved) Deno.env.delete(name);
  return () => {
    for (const name of Object.keys(Deno.env.toObject())) {
      if (GIT_CONFIG_ENV.test(name)) Deno.env.delete(name);
    }
    for (const [name, value] of saved) Deno.env.set(name, value);
  };
}

Deno.test("ensure_checkout clones an absent path, token only in scoped env", async () => {
  let restoreEnv: (() => void) | undefined;
  let dir: string | undefined;
  const calls: RecordedCall[] = [];
  try {
    restoreEnv = withoutGitConfigEnv();
    dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
    setCommandExecutor(routeGit(calls, {
      "rev-parse --verify": () => ok("abc123\n"),
      "symbolic-ref": () => ok("main\n"),
    }));
    const { ctx, writes } = makeHarness();
    await model.methods.ensure_checkout.execute({
      url: "https://github.com/org/repo.git",
      path: `${dir}/repo`,
      token: "ghp_secret",
    }, ctx);

    for (const call of calls) {
      assertEquals(
        call.argv.some((a) => a.includes("ghp_secret")),
        false,
        `token leaked into argv: ${call.argv.join(" ")}`,
      );
    }
    const clone = calls.find((c) => c.argv[1] === "clone")!;
    assertEquals(clone.argv.includes("https://github.com/org/repo.git"), true);
    assertEquals(clone.argv.includes("--origin"), true);
    assertEquals(clone.env?.GIT_CONFIG_COUNT, "1");
    assertEquals(
      clone.env?.GIT_CONFIG_KEY_0,
      "http.https://github.com/.extraHeader",
    );
    assertEquals(
      clone.env?.GIT_CONFIG_VALUE_0,
      `Authorization: Basic ${btoa("x-access-token:ghp_secret")}`,
    );

    assertEquals(writes[0].specName, "checkoutResult");
    assertEquals(writes[0].data.action, "cloned");
    assertEquals(writes[0].data.ref, "main");
    assertEquals(writes[0].data.sha, "abc123");
    assertEquals(JSON.stringify(writes[0]).includes("ghp_secret"), false);
  } finally {
    resetCommandExecutor();
    restoreEnv?.();
    if (dir) await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ensure_checkout appends after an existing GIT_CONFIG_COUNT", async () => {
  let restoreEnv: (() => void) | undefined;
  let dir: string | undefined;
  const calls: RecordedCall[] = [];
  try {
    restoreEnv = withoutGitConfigEnv();
    Deno.env.set("GIT_CONFIG_COUNT", "2");
    dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
    setCommandExecutor(routeGit(calls, {
      "rev-parse --verify": () => ok("abc123\n"),
      "symbolic-ref": () => ok("main\n"),
    }));
    const { ctx } = makeHarness();
    await model.methods.ensure_checkout.execute({
      url: "https://git.example.com:8443/org/repo.git",
      path: `${dir}/repo`,
      token: "t0ken",
    }, ctx);

    const clone = calls.find((c) => c.argv[1] === "clone")!;
    assertEquals(clone.env?.GIT_CONFIG_COUNT, "3");
    assertEquals(
      clone.env?.GIT_CONFIG_KEY_2,
      "http.https://git.example.com:8443/.extraHeader",
    );
    assertEquals(clone.env?.GIT_CONFIG_KEY_0, undefined);
  } finally {
    resetCommandExecutor();
    restoreEnv?.();
    if (dir) await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ensure_checkout scrubs credentials from any URL scheme", async () => {
  const dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
  const calls: RecordedCall[] = [];
  setCommandExecutor(routeGit(calls, {
    "rev-parse --verify": () => ok("abc\n"),
    "symbolic-ref": () => ok("main\n"),
  }));
  try {
    const { ctx, writes, logs } = makeHarness();
    await model.methods.ensure_checkout.execute({
      url: "http://bot:hunter2@internal.example/org/repo.git",
      path: `${dir}/repo`,
    }, ctx);

    assertEquals(
      writes[0].data.url,
      "http://***@internal.example/org/repo.git",
    );
    assertEquals(JSON.stringify(writes[0]).includes("hunter2"), false);
    assertEquals(logs.some((l) => l.message.includes("hunter2")), false);
  } finally {
    resetCommandExecutor();
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("clone scrubs http credentials too", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.clone.execute({
      url: "http://user:secret@git.internal/org/repo",
    }, ctx);
    assertEquals(JSON.stringify(writes[0]).includes("secret"), false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("ensure_checkout refuses a dangling symlink", async () => {
  const dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
  await Deno.symlink(`${dir}/gone`, `${dir}/link`);
  const calls: RecordedCall[] = [];
  setCommandExecutor(routeGit(calls, {}));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.ensure_checkout.execute({
          url: "https://github.com/org/repo",
          path: `${dir}/link`,
        }, ctx),
      Error,
      "symlink whose target does not exist",
    );
    assertEquals(calls.some((c) => c.argv[1] === "clone"), false);
  } finally {
    resetCommandExecutor();
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ensure_checkout with token on non-https URL throws", async () => {
  setCommandExecutor(() => ok(""));
  try {
    const { ctx } = makeHarness();
    await assertRejects(
      () =>
        model.methods.ensure_checkout.execute({
          url: "git@github.com:org/repo.git",
          path: "unused",
          token: "t",
        }, ctx),
      Error,
      "https://",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("ensure_checkout data name never contains '..' or slashes", async () => {
  const calls: RecordedCall[] = [];
  setCommandExecutor(routeGit(calls, {
    "rev-parse --verify": () => ok("abc\n"),
    "symbolic-ref": () => ok("main\n"),
  }));
  try {
    for (
      const path of [
        `../swamp-git-absent-${crypto.randomUUID()}/repo.git`,
        `/tmp/swamp-git-absent-${crypto.randomUUID()}/a/../b`,
      ]
    ) {
      const { ctx, writes } = makeHarness();
      await model.methods.ensure_checkout.execute({
        url: "https://github.com/org/repo",
        path,
      }, ctx);
      const name = writes[0].name;
      assertEquals(name.includes(".."), false, name);
      assertEquals(name.includes("/"), false, name);
      assertEquals(name.startsWith("checkout-"), true, name);
    }
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("ensure_checkout refuses a checkout of a different repository without touching it", async () => {
  const dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
  await Deno.writeTextFile(`${dir}/keep.txt`, "local work");
  const calls: RecordedCall[] = [];
  setCommandExecutor(routeGit(calls, {
    "rev-parse --show-toplevel": () => ok(`${dir}\n`),
    "remote get-url": () => ok("git@github.com:org/other.git\n"),
  }));
  try {
    const { ctx, writes } = makeHarness();
    await assertRejects(
      () =>
        model.methods.ensure_checkout.execute({
          url: "https://github.com/org/repo",
          path: dir,
          reset: true,
        }, ctx),
      Error,
      "different repository",
    );
    for (const sub of ["fetch", "checkout", "clean", "clone"]) {
      assertEquals(calls.some((c) => c.argv[1] === sub), false, sub);
    }
    assertEquals(writes.length, 0);
  } finally {
    resetCommandExecutor();
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ensure_checkout with reset off only fetches", async () => {
  const dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
  await Deno.writeTextFile(`${dir}/file`, "x");
  const calls: RecordedCall[] = [];
  setCommandExecutor(routeGit(calls, {
    "rev-parse --show-toplevel": () => ok(`${dir}\n`),
    "remote get-url": () => ok("https://github.com/org/repo.git\n"),
    "ls-remote": () => ok("ref: refs/heads/main\tHEAD\nabc\tHEAD\n"),
    "config --get-all": () => ok("+refs/heads/*:refs/remotes/origin/*\n"),
    "rev-parse --is-shallow-repository": () => ok("false\n"),
    "rev-parse --verify": () => ok("abc\n"),
  }));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.ensure_checkout.execute({
      url: "https://github.com/org/repo",
      path: dir,
      depth: 1,
    }, ctx);

    const fetch = calls.find((c) => c.argv[1] === "fetch")!;
    assertEquals(fetch.argv.includes("--prune"), true);
    // Not shallow, so depth must not truncate a complete clone.
    assertEquals(fetch.argv.includes("--depth"), false);
    for (const sub of ["checkout", "clean", "clone"]) {
      assertEquals(calls.some((c) => c.argv[1] === sub), false, sub);
    }
    assertEquals(
      calls.some((c) => c.argv.join(" ").includes("set-branches")),
      false,
    );
    assertEquals(writes[0].data.action, "reused");
    assertEquals(writes[0].data.ref, "main");
  } finally {
    resetCommandExecutor();
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ensure_checkout widens a single-branch refspec and keeps depth on a shallow checkout", async () => {
  const dir = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
  await Deno.writeTextFile(`${dir}/file`, "x");
  const calls: RecordedCall[] = [];
  setCommandExecutor(routeGit(calls, {
    "rev-parse --show-toplevel": () => ok(`${dir}\n`),
    "remote get-url": () => ok("https://github.com/org/repo.git\n"),
    "config --get-all": () => ok("+refs/heads/main:refs/remotes/origin/main\n"),
    "rev-parse --is-shallow-repository": () => ok("true\n"),
    "rev-parse --verify": () => ok("abc\n"),
  }));
  try {
    const { ctx } = makeHarness();
    await model.methods.ensure_checkout.execute({
      url: "https://github.com/org/repo",
      path: dir,
      ref: "other",
      depth: 1,
      reset: true,
    }, ctx);

    const joined = calls.map((c) => c.argv.slice(1).join(" "));
    assertEquals(
      joined.includes("remote set-branches --add origin other"),
      true,
    );
    assertEquals(joined.includes("fetch --prune --depth 1 origin"), true);
    assertEquals(
      joined.includes("checkout --force -B other origin/other"),
      true,
    );
    assertEquals(joined.includes("clean -fd"), true);
    assertEquals(
      joined.indexOf("remote set-branches --add origin other") <
        joined.indexOf("fetch --prune --depth 1 origin"),
      true,
    );
  } finally {
    resetCommandExecutor();
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("ensure_checkout strips a credentialed remote URL when a token is passed", async () => {
  let restoreEnv: (() => void) | undefined;
  let dir: string | undefined;
  const calls: RecordedCall[] = [];
  try {
    restoreEnv = withoutGitConfigEnv();
    const tmp = await Deno.makeTempDir({ prefix: "swamp-git-ensure-" });
    dir = tmp;
    await Deno.writeTextFile(`${tmp}/file`, "x");
    setCommandExecutor(routeGit(calls, {
      "rev-parse --show-toplevel": () => ok(`${tmp}\n`),
      "remote get-url": () =>
        ok("https://x-access-token:stale@github.com/org/repo.git\n"),
      "ls-remote": () => ok("ref: refs/heads/main\tHEAD\nabc\tHEAD\n"),
      "config --get-all": () => ok("+refs/heads/*:refs/remotes/origin/*\n"),
      "rev-parse --is-shallow-repository": () => ok("false\n"),
      "rev-parse --verify": () => ok("abc\n"),
    }));
    const { ctx } = makeHarness();
    await model.methods.ensure_checkout.execute({
      url: "https://github.com/org/repo",
      path: tmp,
      token: "fresh",
    }, ctx);

    const setUrl = calls.find((c) => c.argv.join(" ").includes("set-url"))!;
    assertEquals(setUrl.argv.at(-1), "https://github.com/org/repo.git");
  } finally {
    resetCommandExecutor();
    restoreEnv?.();
    if (dir) await Deno.remove(dir, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// branch force
// ---------------------------------------------------------------------------

Deno.test("BranchArgs force defaults to false and requires create", () => {
  const args = model.methods.branch.arguments;
  assertEquals(args.parse({}).force, false);
  assertEquals(args.safeParse({ name: "x", force: true }).success, false);
  assertEquals(
    args.safeParse({ name: "x", create: true, force: true }).success,
    true,
  );
});

Deno.test("BranchArgs rejects force with orphan", () => {
  const result = model.methods.branch.arguments.safeParse({
    name: "evidence",
    create: true,
    orphan: true,
    force: true,
  });
  assertEquals(result.success, false);
});

Deno.test("branch create with force uses -B and reports an existing branch", async () => {
  const calls: string[][] = [];
  setCommandExecutor((argv) => {
    calls.push(argv);
    return ok("");
  });
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute(
      { name: "work", create: true, force: true, startPoint: "main" },
      ctx,
    );

    assertEquals(calls[0].slice(1), [
      "rev-parse",
      "--verify",
      "--quiet",
      "refs/heads/work",
    ]);
    assertEquals(calls[1].slice(1), ["checkout", "-B", "work", "main"]);
    assertEquals(writes[0].data.created, false);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("branch create with force reports a new branch as created", async () => {
  setCommandExecutor((argv) => argv[1] === "rev-parse" ? fail("", 1) : ok(""));
  try {
    const { ctx, writes } = makeHarness();
    await model.methods.branch.execute(
      { name: "work", create: true, force: true },
      ctx,
    );
    assertEquals(writes[0].data.created, true);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// ensure_checkout — real git
//
// These run the real git binary against a local bare repository in a temp
// dir — no network. They pin the git behaviours ensure_checkout depends on
// (depth handling, refspec-driven upstream tracking, show-toplevel symlink
// resolution), so a git that behaves differently fails here.
// ---------------------------------------------------------------------------

interface Fixture {
  root: string;
  remote: string;
  seed: string;
}

async function makeRemoteFixture(): Promise<Fixture> {
  const root = await Deno.makeTempDir({ prefix: "swamp-git-ensure-real-" });
  const remote = `${root}/remote.git`;
  const seed = `${root}/seed`;
  try {
    await rawGit(root, "init", "-q", "--bare", "-b", "main", remote);
  } catch (error) {
    throw new Error(
      `real-git test needs a working git binary on PATH: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  await rawGit(root, "init", "-q", "-b", "main", seed);
  await rawGit(seed, "config", "user.name", "Seed");
  await rawGit(seed, "config", "user.email", "seed@example.com");
  // Repo-local overrides so a developer's global signing config cannot fail
  // the fixture.
  await rawGit(seed, "config", "commit.gpgsign", "false");
  await rawGit(seed, "config", "tag.gpgsign", "false");
  for (const n of [1, 2, 3]) {
    await Deno.writeTextFile(`${seed}/file.txt`, `${n}\n`);
    await rawGit(seed, "add", "file.txt");
    await rawGit(seed, "commit", "-q", "-m", `c${n}`);
  }
  await rawGit(seed, "tag", "v1");
  await rawGit(seed, "push", "-q", remote, "main", "main:other", "v1");
  return { root, remote, seed };
}

async function pushNewCommit(fx: Fixture, content: string): Promise<string> {
  await Deno.writeTextFile(`${fx.seed}/file.txt`, content);
  await rawGit(fx.seed, "commit", "-q", "-am", content.trim());
  await rawGit(fx.seed, "push", "-q", fx.remote, "main");
  return await rawGit(fx.seed, "rev-parse", "HEAD");
}

async function ensure(
  args: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const { ctx, writes } = makeHarness();
  await model.methods.ensure_checkout.execute(
    args as { url: string; path: string },
    ctx,
  );
  return writes[0].data;
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
}

Deno.test("real git: ensure_checkout clones, reuses, updates, and resets", async () => {
  const fx = await makeRemoteFixture();
  try {
    const path = `${fx.root}/work`;
    const seedHead = await rawGit(fx.seed, "rev-parse", "HEAD");

    const first = await ensure({ url: fx.remote, path });
    assertEquals(first.action, "cloned");
    assertEquals(first.ref, "main");
    assertEquals(first.sha, seedHead);
    assertEquals(first.path, await Deno.realPath(path));

    // Re-running with nothing new is a no-op, and resolves the default
    // branch from the remote because ref is omitted.
    const second = await ensure({ url: fx.remote, path });
    assertEquals(second.action, "reused");
    assertEquals(second.ref, "main");

    // With reset off, a new remote commit is fetched but HEAD stays put.
    const newHead = await pushNewCommit(fx, "4\n");
    const noReset = await ensure({ url: fx.remote, path });
    assertEquals(noReset.action, "reused");
    assertEquals(noReset.sha, seedHead);

    // With reset, HEAD moves to the remote branch.
    const updated = await ensure({ url: fx.remote, path, reset: true });
    assertEquals(updated.action, "updated");
    assertEquals(updated.sha, newHead);
    assertEquals(
      await rawGit(path, "rev-parse", "--abbrev-ref", "main@{upstream}"),
      "origin/main",
    );

    // Reset discards local edits and untracked files, keeps ignored ones
    // (clean -fd, not -fdx). The ignore rule lives in info/exclude because an
    // untracked .gitignore would itself be cleaned.
    await Deno.writeTextFile(`${path}/.git/info/exclude`, "ignored.txt\n");
    await Deno.writeTextFile(`${path}/file.txt`, "local edit\n");
    await Deno.writeTextFile(`${path}/stray.txt`, "untracked\n");
    await Deno.writeTextFile(`${path}/ignored.txt`, "ignored\n");
    const cleaned = await ensure({ url: fx.remote, path, reset: true });
    assertEquals(cleaned.action, "reused");
    assertEquals(await Deno.readTextFile(`${path}/file.txt`), "4\n");
    assertEquals(await exists(`${path}/stray.txt`), false);
    assertEquals(await exists(`${path}/ignored.txt`), true);
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: ensure_checkout working branch is re-runnable", async () => {
  const fx = await makeRemoteFixture();
  try {
    const path = `${fx.root}/work`;
    await ensure({ url: fx.remote, path, branch: "automation/run" });
    assertEquals(
      await rawGit(path, "symbolic-ref", "--short", "HEAD"),
      "automation/run",
    );
    const again = await ensure({
      url: fx.remote,
      path,
      branch: "automation/run",
    });
    assertEquals(again.branch, "automation/run");
    assertEquals(
      await rawGit(path, "symbolic-ref", "--short", "HEAD"),
      "automation/run",
    );
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: ensure_checkout refuses paths it must not touch", async () => {
  const fx = await makeRemoteFixture();
  try {
    // A checkout of a different repository.
    const otherRemote = `${fx.root}/other.git`;
    await rawGit(fx.root, "init", "-q", "--bare", "-b", "main", otherRemote);
    await rawGit(fx.seed, "push", "-q", otherRemote, "main");
    const foreign = `${fx.root}/foreign`;
    await rawGit(fx.root, "clone", "-q", otherRemote, foreign);
    await Deno.writeTextFile(`${foreign}/local.txt`, "keep me\n");
    await assertRejects(
      () => ensure({ url: fx.remote, path: foreign, reset: true }),
      Error,
      "different repository",
    );
    assertEquals(await Deno.readTextFile(`${foreign}/local.txt`), "keep me\n");

    // A non-empty directory that is not a checkout.
    const plain = `${fx.root}/plain`;
    await Deno.mkdir(plain);
    await Deno.writeTextFile(`${plain}/notes.txt`, "hello\n");
    await assertRejects(
      () => ensure({ url: fx.remote, path: plain }),
      Error,
      "not a git checkout",
    );
    assertEquals(await exists(`${plain}/.git`), false);

    // A directory inside another checkout — rev-parse would succeed there.
    const nested = `${foreign}/sub`;
    await Deno.mkdir(nested);
    await Deno.writeTextFile(`${nested}/x.txt`, "x\n");
    await assertRejects(
      () => ensure({ url: fx.remote, path: nested }),
      Error,
      "inside the checkout",
    );

    // A file.
    const file = `${fx.root}/a-file`;
    await Deno.writeTextFile(file, "x");
    await assertRejects(
      () => ensure({ url: fx.remote, path: file }),
      Error,
      "not a directory",
    );

    // A tag is refused before anything is cloned.
    const tagged = `${fx.root}/tagged`;
    await assertRejects(
      () => ensure({ url: fx.remote, path: tagged, ref: "v1" }),
      Error,
      "not a branch",
    );
    assertEquals(await exists(tagged), false);
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: ensure_checkout switches ref in a shallow clone and keeps upstream tracking", async () => {
  const fx = await makeRemoteFixture();
  try {
    // file:// because git ignores --depth for plain local paths.
    const url = `file://${fx.remote}`;
    const path = `${fx.root}/shallow`;

    const first = await ensure({ url, path, depth: 1 });
    assertEquals(first.action, "cloned");
    assertEquals(
      await rawGit(path, "rev-parse", "--is-shallow-repository"),
      "true",
    );

    const switched = await ensure({
      url,
      path,
      ref: "other",
      depth: 1,
      reset: true,
    });
    assertEquals(switched.ref, "other");
    assertEquals(
      await rawGit(path, "symbolic-ref", "--short", "HEAD"),
      "other",
    );
    assertEquals(
      await rawGit(path, "rev-parse", "--abbrev-ref", "other@{upstream}"),
      "origin/other",
    );
    assertEquals(
      await rawGit(path, "rev-parse", "--abbrev-ref", "main@{upstream}"),
      "origin/main",
    );

    const specs = await rawGit(
      path,
      "config",
      "--get-all",
      "remote.origin.fetch",
    );
    await ensure({ url, path, ref: "other", depth: 1, reset: true });
    assertEquals(
      await rawGit(path, "config", "--get-all", "remote.origin.fetch"),
      specs,
    );
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: ensure_checkout depth does not truncate a full clone", async () => {
  const fx = await makeRemoteFixture();
  try {
    const url = `file://${fx.remote}`;
    const path = `${fx.root}/full`;
    await ensure({ url, path });
    await ensure({ url, path, depth: 1 });
    assertEquals(
      await rawGit(path, "rev-parse", "--is-shallow-repository"),
      "false",
    );
    assertEquals(await rawGit(path, "rev-list", "--count", "HEAD"), "3");
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: ensure_checkout recovers a checkout with no commits", async () => {
  const fx = await makeRemoteFixture();
  try {
    const remote = `${fx.root}/empty.git`;
    const path = `${fx.root}/work`;
    await rawGit(fx.root, "init", "-q", "--bare", "-b", "main", remote);

    // Cloning an empty remote succeeds in git but leaves an unborn HEAD —
    // the same state a clone killed after writing its config leaves behind.
    await assertRejects(
      () => ensure({ url: remote, path }),
      Error,
      "remote repository is empty",
    );
    assertEquals(await exists(`${path}/.git`), true);

    await rawGit(fx.seed, "push", "-q", remote, "main");
    const seedHead = await rawGit(fx.seed, "rev-parse", "HEAD");

    // Without reset there is nothing to leave HEAD on, so say how to recover.
    await assertRejects(
      () => ensure({ url: remote, path }),
      Error,
      "reset: true",
    );

    const recovered = await ensure({ url: remote, path, reset: true });
    assertEquals(recovered.action, "updated");
    assertEquals(recovered.sha, seedHead);
    assertEquals(
      await rawGit(path, "symbolic-ref", "--short", "HEAD"),
      "main",
    );
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: ensure_checkout warns when reset is off and HEAD is not on ref", async () => {
  const fx = await makeRemoteFixture();
  try {
    const path = `${fx.root}/work`;
    await ensure({ url: fx.remote, path });

    const { ctx, writes, logs } = makeHarness();
    await model.methods.ensure_checkout.execute(
      { url: fx.remote, path, ref: "other" },
      ctx,
    );
    assertEquals(writes[0].data.ref, "other");
    assertEquals(
      await rawGit(path, "symbolic-ref", "--short", "HEAD"),
      "main",
    );
    assertEquals(
      logs.some((l) =>
        l.level === "warn" && l.message.includes("is on main, not other")
      ),
      true,
    );

    // No warning when HEAD is on the working branch this call maintains.
    await ensure({ url: fx.remote, path, branch: "work" });
    const quiet = makeHarness();
    await model.methods.ensure_checkout.execute(
      { url: fx.remote, path, branch: "work" },
      quiet.ctx,
    );
    assertEquals(quiet.logs.some((l) => l.level === "warn"), false);
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});

Deno.test("real git: branch create with force is re-runnable", async () => {
  const fx = await makeRemoteFixture();
  try {
    const { ctx, writes } = makeHarness({ repoPath: fx.seed });
    await model.methods.branch.execute(
      { name: "work", create: true, force: true },
      ctx,
    );
    await rawGit(fx.seed, "checkout", "-q", "main");
    await model.methods.branch.execute(
      { name: "work", create: true, force: true },
      ctx,
    );
    assertEquals(writes[0].data.created, true);
    assertEquals(writes[1].data.created, false);
    assertEquals(
      await rawGit(fx.seed, "symbolic-ref", "--short", "HEAD"),
      "work",
    );
  } finally {
    await Deno.remove(fx.root, { recursive: true });
  }
});
