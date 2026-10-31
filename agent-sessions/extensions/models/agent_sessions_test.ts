import {
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { model, sinceDate } from "./agent_sessions.ts";
import {
  agentSessionChildId,
  agentSessionDataName,
  type AgentSessionRecord,
  readAgentSessionRecord,
  readAgentSessionSummary,
} from "./_lib/contract/session_record.ts";
import {
  type DataHandle,
  type ImportContext,
  importSessions,
  type ImportSettings,
} from "./_lib/importer.ts";
import { NoTranscriptsError } from "./_lib/claude_code/discover.ts";
import {
  CANARY,
  DEMO_REMOTE,
  DEMO_REPO,
  type Fixture,
  FOREIGN_ID,
  GIT_AVAILABLE,
  gitInit,
  gitWorktree,
  HEADLESS_ID,
  OTHER_REPO_ID,
  SESSION_ID,
  SUBDIR_ID,
  transcriptPath,
  WORKTREE_ID,
  writeFixture,
  writeSession,
} from "./_lib/testdata/fixtures.ts";
import { join } from "jsr:@std/path@1.1.4";

interface Write {
  spec: string;
  name: string;
  data: Record<string, unknown>;
  tags?: Record<string, string>;
}

function harness() {
  const store = new Map<string, Record<string, unknown>>();
  const writes: Write[] = [];
  const logs: string[] = [];
  const deleted: string[] = [];
  const ctx: ImportContext = {
    logger: {
      info: (m) => logs.push(`info ${m}`),
      warn: (m) => logs.push(`warn ${m}`),
    },
    writeResource: (spec, name, data, overrides) => {
      writes.push({ spec, name, data, tags: overrides?.tags });
      store.set(name, structuredClone(data));
      return Promise.resolve({ name } as DataHandle);
    },
    readResource: (name) => Promise.resolve(store.get(name) ?? null),
    deleteResource: (name) => {
      deleted.push(name);
      store.delete(name);
      return Promise.resolve();
    },
  };
  return { ctx, writes, logs, deleted };
}

function settings(
  f: Fixture,
  extra: Partial<ImportSettings> = {},
): ImportSettings {
  return {
    repoDir: f.repoDir,
    projectsDir: f.projectsDir,
    repos: [],
    all: false,
    exclude: [],
    worktreeGlobs: [f.worktreeGlob],
    home: f.home,
    importerVersion: "test",
    // A whoami reply carries the account's email; it must never reach data.
    whoami: () =>
      Promise.resolve({
        kind: "identity" as const,
        identity: { swampUserId: "user-123", swampUsername: "alice" },
      }),
    ...extra,
  };
}

async function withFixture(fn: (f: Fixture) => Promise<void>) {
  const f = await writeFixture();
  try {
    await fn(f);
  } finally {
    await Deno.remove(f.root, { recursive: true });
  }
}

// Sessions resolve to repos through git; without it these tests cannot run.
const gitTest = GIT_AVAILABLE ? Deno.test : Deno.test.ignore;
if (!GIT_AVAILABLE) console.warn("git is not on PATH: import tests ignored");

const name = (id: string) => agentSessionDataName("claude-code", id);

function sessions(writes: Write[]): Map<string, AgentSessionRecord> {
  const out = new Map<string, AgentSessionRecord>();
  for (const w of writes.filter((w) => w.spec === "session")) {
    const read = readAgentSessionRecord(w.data);
    assertEquals(read.kind, "record", `${w.name} fails the v2 reader`);
    if (read.kind === "record") out.set(read.record.id, read.record);
  }
  return out;
}

const allCalls = (r: AgentSessionRecord) => r.turns.flatMap((t) => t.calls);

gitTest(
  "import: every record passes the v2 reader, and only this repo's sessions are imported",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      const { summary } = await importSessions(h.ctx, settings(f));
      const records = sessions(h.writes);
      assertEquals(summary.found, 4);
      assertEquals(summary.imported, 4);
      assertEquals(summary.subagents, 2);
      for (const id of [SESSION_ID, HEADLESS_ID, WORKTREE_ID, SUBDIR_ID]) {
        assert(records.has(id), `${id} imported`);
      }
      assertFalse(records.has(OTHER_REPO_ID));
      // Another repo's cue worktree with the same name ran on a branch this
      // repo does not have.
      assertFalse(records.has(FOREIGN_ID));
      assertEquals(records.size, 6);
    });
  },
);

gitTest(
  "import: no prompt, reply, brief, description, query, output or home path reaches a record or tag",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const stored = JSON.stringify(h.writes);
      assertFalse(stored.includes(CANARY), "canary text leaked");
      assertFalse(stored.includes(f.home), "home path leaked");
      assertFalse(stored.includes("alice@example.com"), "email leaked");
      assertFalse(stored.includes("Bearer CANARY"), "bearer token leaked");
    });
  },
);

gitTest(
  "import: a session's turns, calls, tokens and redacted text",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const s = sessions(h.writes).get(SESSION_ID)!;
      assertEquals(s.harness, "claude-code");
      assertEquals(s.harnessVersion, "2.1.150");
      assertEquals(s.model, "claude-opus-5-5");
      assertEquals(s.repo, DEMO_REPO);
      assertEquals(s.invocation, "interactive");
      assertEquals(s.swampUserId, "user-123");
      assertEquals(s.startedAt, "2026-10-30T10:00:00.000Z");
      // A slash command (<command-name>) is a person's input and opens a turn,
      // then two typed prompts.
      assertEquals(s.turns.length, 3);
      assertEquals(s.turns[0].calls, []);
      // msg_a's usage counted once, though two records repeat it.
      assertEquals(s.turns[1].tokens, {
        input: 15,
        output: 120,
        cacheRead: 1000,
        cacheWrite: 50,
      });
      const calls = new Map(allCalls(s).map((c) => [c.id, c]));
      // The 1.0.x inline subagent record is not the parent's call.
      assertFalse(calls.has("toolu_old"));
      const bash = calls.get("toolu_bash1")!;
      assertEquals(bash.ok, false);
      assertEquals(bash.exitCode, 2);
      assertEquals(bash.label, "unlabeled");
      assertEquals(bash.category, undefined);
      assertEquals(bash.start, 3000);
      assertEquals(bash.end, 5000);
      assertEquals(
        bash.text,
        "cat > models/a.yaml <<EOF … EOF\ncurl -H 'Authorization: Bearer ‹redacted›' -u ‹email› ~/notes token=‹redacted›",
      );
      assertEquals(calls.get("toolu_read1")!.text, "README.md");
      assertEquals(calls.get("toolu_search1")!.text, "");
      assertEquals(calls.get("toolu_search1")!.toolKind, "web");
      assertEquals(calls.get("toolu_grep1")!.text, "src");
      assertEquals(calls.get("toolu_mcp")!.toolKind, "mcp");
      assertEquals(calls.get("toolu_new")!.toolKind, "unknown");
      const long = calls.get("toolu_long")!;
      assertEquals(long.text.length, 1000);
      assertEquals(long.truncated, true);
    });
  },
);

gitTest(
  "import: subagents are child records linked both ways, nesting included",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const records = sessions(h.writes);
      const a1 = await agentSessionChildId(SESSION_ID, "a1");
      const a2 = await agentSessionChildId(a1, "a2");
      const child = records.get(a1)!;
      const nested = records.get(a2)!;
      assertEquals(child.parentSessionId, SESSION_ID);
      assertEquals(child.agentId, "a1");
      assertEquals(child.agentType, "Explore");
      assertEquals(nested.parentSessionId, a1);
      assertEquals(nested.agentType, "general-purpose");
      // A child copies its parent's invocation.
      assertEquals(child.invocation, "interactive");
      const startedBy = allCalls(records.get(SESSION_ID)!).find((c) =>
        c.id === "toolu_agent1"
      )!;
      assertEquals(startedBy.toolKind, "subagent");
      assertEquals(startedBy.subagentSessionId, a1);
      const nestedCall = allCalls(child).find((c) =>
        c.id === "toolu_s1_agent"
      )!;
      assertEquals(nestedCall.subagentSessionId, a2);
      // The brief opens the child's first turn but is never stored.
      assertEquals(child.turns.length, 1);
      assertEquals(allCalls(child).find((c) => c.tool === "Glob")!.text, ".");
      const tags = h.writes.find((w) => w.name === name(a1))!.tags!;
      assertEquals(tags.parentSessionId, SESSION_ID);
      assertEquals(tags.type, undefined, "type comes from the output spec");
      const parentSummary = readAgentSessionSummary(
        h.writes.find((w) => w.name === name(SESSION_ID))!.tags!.summary,
      );
      assertEquals(parentSummary?.subagents, 1);
    });
  },
);

gitTest(
  "import: a headless session is marked, and tags mirror it",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      assertEquals(sessions(h.writes).get(HEADLESS_ID)!.invocation, "headless");
      const tags = h.writes.find((w) => w.name === name(HEADLESS_ID))!.tags!;
      assertEquals(tags.headless, "true");
      assertEquals(tags.swampUserId, "user-123");
      assertEquals(tags.startedAt, "2026-10-30T10:00:00.000Z");
    });
  },
);

gitTest(
  "import: re-import of an unchanged tree writes nothing; a touched file re-imports only its session",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const first = h.writes.length;
      const again = await importSessions(h.ctx, settings(f));
      assertEquals(again.summary.imported, 0);
      assertEquals(again.summary.unchanged, 4);
      assertEquals(h.writes.length, first);

      await Deno.writeTextFile(f.transcript, "\n", { append: true });
      const touched = await importSessions(h.ctx, settings(f));
      assertEquals(touched.summary.imported, 1);
      const rewritten = h.writes.slice(first).map((w) => w.name);
      assert(rewritten.includes(name(SESSION_ID)));
      assertFalse(rewritten.includes(name(HEADLESS_ID)));
      assert(rewritten.includes("import-index"));
    });
  },
);

gitTest("import: since skips transcripts last modified before it", async () => {
  await withFixture(async (f) => {
    const old = new Date("2020-01-01T00:00:00Z");
    await Deno.utime(f.transcript, old, old);
    for (const a of ["a1", "a2"]) {
      await Deno.utime(`${f.sessionDir}/subagents/agent-${a}.jsonl`, old, old);
    }
    const h = harness();
    const { summary } = await importSessions(
      h.ctx,
      settings(f, { since: new Date("2021-01-01T00:00:00Z") }),
    );
    assertEquals(summary.found, 3);
    assertFalse(sessions(h.writes).has(SESSION_ID));
  });
});

gitTest("import: offline, records and tags carry no identity", async () => {
  await withFixture(async (f) => {
    const h = harness();
    await importSessions(
      h.ctx,
      settings(f, { whoami: () => Promise.resolve({ kind: "none" as const }) }),
    );
    const s = sessions(h.writes).get(SESSION_ID)!;
    assertEquals(s.swampUserId, undefined);
    assertEquals(s.swampUsername, undefined);
    assertEquals(
      h.writes.find((w) => w.name === name(SESSION_ID))!.tags!.swampUserId,
      undefined,
    );
  });
});

Deno.test("import: a host without transcripts fails, naming the path and why", async () => {
  const h = harness();
  const missing = "/nonexistent/agent-sessions/projects";
  const error = await assertRejects(
    () =>
      importSessions(h.ctx, {
        repoDir: "/nonexistent/repo",
        projectsDir: missing,
        repos: [],
        all: false,
        exclude: [],
        worktreeGlobs: [],
        importerVersion: "test",
        whoami: () => Promise.resolve({ kind: "none" as const }),
      }),
    NoTranscriptsError,
  );
  assertStringIncludes(error.message, missing);
  assertStringIncludes(error.message, "machine that holds the transcripts");
});

Deno.test("model: export shape, resources and import arguments", () => {
  assertEquals(model.type, "@swamp/agent-sessions");
  assertEquals(model.version.split(".").length, 4);
  assertEquals(model.resources.session.garbageCollection, 1);
  assertEquals(model.resources.session.lifetime, "infinite");
  assertEquals(model.resources.session.tags, { type: "agent-session" });
  const args = model.methods.import.arguments.parse({});
  assertEquals(args.worktreeGlobs, ["~/.cue/work/*/<repo>"]);
  assertEquals(args.repos, []);
  assertEquals(args.all, false);
  assertEquals(args.exclude, []);
  assertEquals(model.upgrades.at(-1)!.toVersion, model.version);
  assertEquals(model.upgrades.at(-1)!.upgradeAttributes({}), {});
  assertFalse(
    model.methods.import.arguments.safeParse({ since: "soon" }).success,
  );
  assert(
    model.methods.import.arguments.safeParse({ since: "2026-10-01" }).success,
  );
});

gitTest(
  "import: a re-import with a new importer version rewrites finished sessions",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const first = h.writes.length;
      const upgraded = await importSessions(
        h.ctx,
        settings(f, { importerVersion: "test-2" }),
      );
      assertEquals(upgraded.summary.imported, 4);
      assert(h.writes.length > first);
    });
  },
);

gitTest(
  "import: a session that fails the record is stamped and not retried until it changes",
  async () => {
    await withFixture(async (f) => {
      // A session id the record refuses (upper case is fine; a dot is not).
      const bad = `${f.projectsDir}/-x/not.valid.jsonl`;
      await Deno.mkdir(`${f.projectsDir}/-x`, { recursive: true });
      await Deno.writeTextFile(
        bad,
        JSON.stringify({
          type: "user",
          cwd: f.repoDir,
          message: { content: "x" },
        }) +
          "\n",
      );
      const h = harness();
      const first = await importSessions(h.ctx, settings(f));
      assertEquals(first.summary.skipped, 1);
      assert(
        h.logs.some((l) => l.startsWith("warn Skipped session not.valid")),
      );
      const again = await importSessions(h.ctx, settings(f));
      assertEquals(again.summary.skipped, 0);
      assertEquals(again.summary.unchanged, 5);
    });
  },
);

gitTest(
  "import: a transcript that vanishes mid-scan is skipped, not fatal",
  async () => {
    await withFixture(async (f) => {
      // A dangling symlink: listed by readDir, gone at stat.
      await Deno.symlink(
        `${f.root}/nowhere.jsonl`,
        `${f.projectsDir}/${f.transcript.split("/").at(-2)}/gone.jsonl`,
      );
      const h = harness();
      const { summary } = await importSessions(h.ctx, settings(f));
      assertEquals(summary.found, 4);
    });
  },
);

gitTest(
  "import: a re-import reads no transcript head it already knows is another repo's",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const index = h.writes.filter((w) => w.name === "import-index").at(-1)!;
      const resolved = index.data.resolved as Record<string, string>;
      // Every transcript git placed, by hash only: this repo's three. The
      // removed worktrees are not remembered (a branch placed them, and a
      // fetch can change that), nor the other repo's, known by its path
      // until it gains a remote.
      assertEquals(Object.keys(resolved).length, 3);
      assertFalse(JSON.stringify(index.data).includes(f.home));
      assertFalse(JSON.stringify(index.data).includes("example.com"));
      const writes = h.writes.length;
      await importSessions(h.ctx, settings(f));
      assertEquals(h.writes.length, writes, "an unchanged scan writes nothing");
    });
  },
);

gitTest(
  "import: since keeps a session whose subagent changed after it",
  async () => {
    await withFixture(async (f) => {
      const old = new Date("2020-01-01T00:00:00Z");
      await Deno.utime(f.transcript, old, old);
      const h = harness();
      await importSessions(
        h.ctx,
        settings(f, { since: new Date("2021-01-01T00:00:00Z") }),
      );
      // Its subagent files are new, so the session counts as active since.
      assert(sessions(h.writes).has(SESSION_ID));
    });
  },
);

gitTest({
  name: "import: a read that fails is retried next time, not stamped",
  // chmod 000 makes a file unreadable only for a non-root user on a POSIX OS.
  ignore: Deno.build.os === "windows" || Deno.uid() === 0,
}, async () => {
  await withFixture(async (f) => {
    const h = harness();
    // A subagent file that cannot be read: listed, then fails at read time.
    const unreadable = `${f.sessionDir}/subagents/agent-a1.jsonl`;
    await Deno.chmod(unreadable, 0o000);
    let first;
    try {
      first = await importSessions(h.ctx, settings(f));
    } finally {
      await Deno.chmod(unreadable, 0o644);
    }
    assertEquals(first.summary.skipped, 1);
    assert(h.logs.some((l) => l.includes("will retry")));
    const again = await importSessions(h.ctx, settings(f));
    assertEquals(again.summary.imported, 1);
  });
});

gitTest(
  "import: when whoami does not answer, a re-import keeps the identity a session had",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      await Deno.writeTextFile(f.transcript, "\n", { append: true });
      await importSessions(
        h.ctx,
        settings(f, {
          whoami: () => Promise.resolve({ kind: "failed" as const }),
        }),
      );
      const last = h.writes.filter((w) => w.name === name(SESSION_ID)).at(-1)!;
      assertEquals(last.data.swampUserId, "user-123");
      assertEquals(last.tags!.swampUserId, "user-123");
      assert(h.logs.some((l) => l.includes("did not answer")));
    });
  },
);

gitTest(
  "import: a subagent whose transcript is gone has its record removed",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const a1 = await agentSessionChildId(SESSION_ID, "a1");
      const a2 = await agentSessionChildId(a1, "a2");
      await Deno.remove(`${f.sessionDir}/subagents/agent-a2.jsonl`);
      await Deno.remove(`${f.sessionDir}/subagents/agent-a2.meta.json`);
      await importSessions(h.ctx, settings(f));
      assertEquals(h.deleted, [name(a2)]);
    });
  },
);

gitTest(
  "import: a write that fails is retried, and sessions already written keep their stamps",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      const write = h.ctx.writeResource;
      let fail = true;
      const ctx: ImportContext = {
        ...h.ctx,
        writeResource: (spec, n, data, o) => {
          if (fail && n === name(HEADLESS_ID)) {
            return Promise.reject(new Error("disk full"));
          }
          return write(spec, n, data, o);
        },
      };
      const first = await importSessions(ctx, settings(f));
      assertEquals(first.summary.skipped, 1);
      assertEquals(first.summary.imported, 3);
      assert(h.logs.some((l) => l.includes("Could not write session")));
      fail = false;
      const again = await importSessions(ctx, settings(f));
      assertEquals(again.summary.imported, 1);
      assertEquals(again.summary.unchanged, 3);
    });
  },
);

gitTest(
  "import: without deleteResource, a stale child id stays in the index",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      const { deleteResource: _, ...noDelete } = h.ctx;
      await importSessions(noDelete, settings(f));
      const a1 = await agentSessionChildId(SESSION_ID, "a1");
      const a2 = await agentSessionChildId(a1, "a2");
      await Deno.remove(`${f.sessionDir}/subagents/agent-a2.jsonl`);
      await importSessions(noDelete, settings(f));
      const index = h.writes.filter((w) => w.name === "import-index").at(-1)!;
      const children = index.data.children as Record<string, string[]>;
      assert(children[SESSION_ID].includes(a2), "kept for a later delete");
      assertEquals(h.deleted, []);
    });
  },
);

gitTest(
  "import: a session whose transcript is gone leaves the index, its records stay",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      await Deno.remove(f.transcript);
      await importSessions(h.ctx, settings(f));
      const index = h.writes.filter((w) => w.name === "import-index").at(-1)!;
      const stamped = index.data.sessions as Record<string, string>;
      assertFalse(SESSION_ID in stamped);
      assertEquals(h.deleted, []);
    });
  },
);

Deno.test("sinceDate: a date alone is local midnight, a full time as written", () => {
  const local = sinceDate("2026-10-01");
  assertEquals(
    [local.getFullYear(), local.getMonth(), local.getDate(), local.getHours()],
    [2026, 9, 1, 0],
  );
  assertEquals(
    sinceDate("2026-10-01T12:00:00Z").toISOString(),
    "2026-10-01T12:00:00.000Z",
  );
});

gitTest(
  "import: a subagent file that vanishes mid-scan drops only that subagent",
  async () => {
    await withFixture(async (f) => {
      // A dangling symlink: listed by readDir, gone at stat.
      await Deno.symlink(
        `${f.root}/nowhere.jsonl`,
        `${f.sessionDir}/subagents/agent-zz.jsonl`,
      );
      const h = harness();
      const { summary } = await importSessions(h.ctx, settings(f));
      assertEquals(summary.found, 4);
      assertEquals(summary.subagents, 2);
      assert(sessions(h.writes).has(SESSION_ID));
    });
  },
);

gitTest(
  "import: a session first imported while whoami fails is attributed once whoami answers",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      const offline = await importSessions(
        h.ctx,
        settings(f, {
          whoami: () => Promise.resolve({ kind: "failed" as const }),
        }),
      );
      assertEquals(offline.summary.imported, 4);
      assertEquals(sessions(h.writes).get(SESSION_ID)!.swampUserId, undefined);
      const online = await importSessions(h.ctx, settings(f));
      assertEquals(online.summary.imported, 4);
      assertEquals(sessions(h.writes).get(SESSION_ID)!.swampUserId, "user-123");
      const settled = await importSessions(h.ctx, settings(f));
      assertEquals(settled.summary.imported, 0);
    });
  },
);

gitTest({
  name: "import: a session unreadable for one scan keeps its index entry",
  // chmod 000 makes a file unreadable only for a non-root user on a POSIX OS.
  ignore: Deno.build.os === "windows" || Deno.uid() === 0,
}, async () => {
  await withFixture(async (f) => {
    const h = harness();
    await importSessions(h.ctx, settings(f));
    // Unreadable for one scan: the head read fails, the file is still there.
    await Deno.chmod(f.transcript, 0o000);
    try {
      await importSessions(h.ctx, settings(f));
    } finally {
      await Deno.chmod(f.transcript, 0o644);
    }
    const index = h.writes.filter((w) => w.name === "import-index").at(-1)!;
    const children = index.data.children as Record<string, string[]>;
    assert(SESSION_ID in (index.data.sessions as Record<string, string>));
    assertEquals(children[SESSION_ID].length, 2);
  });
});

// Sessions in other repos (swamp-club#4211).
const THIRD_ID = "a0000001-2222-4333-8444-555555555555";
const NONGIT_ID = "a0000002-2222-4333-8444-555555555555";
const DELETED_ID = "a0000003-2222-4333-8444-555555555555";
const CLONE_ID = "a0000004-2222-4333-8444-555555555555";
const THIRD_WT_ID = "a0000005-2222-4333-8444-555555555555";
const LIVE_WT_ID = "a0000006-2222-4333-8444-555555555555";
const MONO_SUB_ID = "a0000007-2222-4333-8444-555555555555";
const MONO_OTHER_ID = "a0000008-2222-4333-8444-555555555555";
const PLAIN_ID = "a0000009-2222-4333-8444-555555555555";
const THIRD_REPO = "example.com/acme/third";

/** A third repo, with a remote written as an ssh URL with a port. */
async function addThird(f: Fixture, branches: string[] = []): Promise<string> {
  const third = join(f.home, "src", "third");
  await gitInit(third, {
    remote: "ssh://git@Example.com:22/acme/third.git",
    branches,
  });
  await writeSession(f, { cwd: third, id: THIRD_ID });
  return third;
}

async function addRemote(repo: string, url: string): Promise<void> {
  const added = await new Deno.Command("git", {
    args: ["-C", repo, "remote", "add", "origin", url],
    stdout: "null",
    stderr: "null",
  }).output();
  assert(added.success, "git remote add");
}

const readText = (r: AgentSessionRecord) =>
  allCalls(r).find((c) => c.tool === "Read")?.text;

gitTest(
  "import: all imports every repo it can place, tags each record with its repo, and counts the rest",
  async () => {
    await withFixture(async (f) => {
      await addThird(f);
      const scratch = join(f.home, "scratch");
      await Deno.mkdir(scratch);
      await writeSession(f, { cwd: scratch, id: NONGIT_ID });
      await writeSession(f, {
        cwd: join(f.home, "src", "deleted"),
        id: DELETED_ID,
      });
      const h = harness();
      const { summary } = await importSessions(
        h.ctx,
        settings(f, { all: true }),
      );
      const records = sessions(h.writes);
      assertEquals(records.get(SESSION_ID)!.repo, DEMO_REPO);
      assertEquals(records.get(THIRD_ID)!.repo, THIRD_REPO);
      // No remote: the main checkout's path, home as ~.
      assertEquals(records.get(OTHER_REPO_ID)!.repo, "~/src/other");
      // Not a git folder, a repo that is gone, and the foreign worktree on a
      // branch no repo here has.
      for (const id of [NONGIT_ID, DELETED_ID, FOREIGN_ID]) {
        assertFalse(records.has(id), `${id} has no repo`);
      }
      assertEquals(summary.unresolved, 3);
      assert(h.logs.some((l) => l.includes("3 sessions skipped whose repo")));
      for (const w of h.writes.filter((w) => w.spec === "session")) {
        assertEquals(w.tags!.repo, w.data.repo, `${w.name} repo tag`);
      }
      // Paths are relative to each session's own repo.
      assertEquals(readText(records.get(THIRD_ID)!), "a.ts");
      const stored = JSON.stringify(h.writes);
      assertFalse(stored.includes(CANARY), "canary text leaked");
      assertFalse(stored.includes(f.home), "home path leaked");
    });
  },
);

gitTest(
  "import: repos adds another repo's sessions; one that is not there is reported and left out",
  async () => {
    await withFixture(async (f) => {
      await addThird(f);
      const h = harness();
      await importSessions(
        h.ctx,
        settings(f, { repos: ["~/src/other", "~/src/missing"] }),
      );
      const records = sessions(h.writes);
      assert(records.has(SESSION_ID));
      assertEquals(records.get(OTHER_REPO_ID)!.repo, "~/src/other");
      assertFalse(records.has(THIRD_ID));
      assert(
        h.logs.includes("warn repos: ~/src/missing is not there; left out"),
      );
    });
  },
);

gitTest(
  "import: two clones of one remote are one repo, and a remote's credentials never reach a record",
  async () => {
    await withFixture(async (f) => {
      const clone = join(f.home, "src", "demo-clone");
      await gitInit(clone, {
        remote: "https://user:s3cret@EXAMPLE.com/acme/demo/",
      });
      await writeSession(f, { cwd: clone, id: CLONE_ID });
      const h = harness();
      await importSessions(h.ctx, settings(f));
      assertEquals(sessions(h.writes).get(CLONE_ID)!.repo, DEMO_REPO);
      assertFalse(JSON.stringify(h.writes).includes("s3cret"));
    });
  },
);

gitTest(
  "import: exclude leaves out repos by path and by remote; excluding this repo is an error",
  async () => {
    await withFixture(async (f) => {
      await addThird(f);
      const h = harness();
      await importSessions(
        h.ctx,
        settings(f, {
          all: true,
          exclude: ["~/src/other", "https://example.com/acme/third.git"],
        }),
      );
      const records = sessions(h.writes);
      assert(records.has(SESSION_ID));
      assertFalse(records.has(OTHER_REPO_ID));
      assertFalse(records.has(THIRD_ID));

      const clone = join(f.home, "src", "demo-clone");
      await gitInit(clone, { remote: DEMO_REMOTE });
      // This repo by its remote, or by another clone of it.
      for (const exclude of [DEMO_REMOTE, "~/src/demo-clone"]) {
        const error = await assertRejects(
          () =>
            importSessions(harness().ctx, settings(f, { exclude: [exclude] })),
          Error,
        );
        assertStringIncludes(error.message, "the repo this import runs in");
      }
    });
  },
);

gitTest(
  "import: a live worktree is its repo; a removed one is placed by glob and branch",
  async () => {
    await withFixture(async (f) => {
      const live = join(f.home, "wt", "demo-live");
      await gitWorktree(f.repoDir, live, "cue/9-live");
      await writeSession(f, { cwd: live, id: LIVE_WT_ID });
      const third = await addThird(f, ["cue/7-x"]);
      const removed = join(f.home, ".cue", "work", "7-x", "third");
      await writeSession(f, {
        cwd: join(removed, "src"),
        id: THIRD_WT_ID,
        gitBranch: "cue/7-x",
        file: join(removed, "src", "b.ts"),
      });
      const h = harness();
      await importSessions(h.ctx, settings(f, { repos: [third] }));
      const records = sessions(h.writes);
      assertEquals(records.get(LIVE_WT_ID)!.repo, DEMO_REPO);
      assertEquals(readText(records.get(LIVE_WT_ID)!), "a.ts");
      assertEquals(records.get(WORKTREE_ID)!.repo, DEMO_REPO);
      assertEquals(records.get(THIRD_WT_ID)!.repo, THIRD_REPO);
      // Relative to the worktree's root, not the directory it started in.
      assertEquals(readText(records.get(THIRD_WT_ID)!), "src/b.ts");
    });
  },
);

gitTest(
  "import: a swamp repo below its git toplevel imports only sessions at or below it",
  async () => {
    await withFixture(async (f) => {
      const mono = join(f.home, "src", "mono");
      await gitInit(mono, { remote: "git@example.com:acme/mono.git" });
      await Deno.mkdir(join(mono, "sub", "deep"), { recursive: true });
      await Deno.mkdir(join(mono, "other"));
      await writeSession(f, {
        cwd: join(mono, "sub", "deep"),
        id: MONO_SUB_ID,
        file: join(mono, "sub", "a.ts"),
      });
      await writeSession(f, { cwd: join(mono, "other"), id: MONO_OTHER_ID });
      const h = harness();
      await importSessions(h.ctx, settings(f, { repoDir: join(mono, "sub") }));
      const records = sessions(h.writes);
      assertEquals([...records.keys()], [MONO_SUB_ID]);
      assertEquals(records.get(MONO_SUB_ID)!.repo, "example.com/acme/mono");
      assertEquals(readText(records.get(MONO_SUB_ID)!), "sub/a.ts");
    });
  },
);

gitTest(
  "import: a swamp repo that is not a git repo imports the sessions below its path",
  async () => {
    await withFixture(async (f) => {
      const plain = join(f.home, "plain");
      await Deno.mkdir(join(plain, "x"), { recursive: true });
      await writeSession(f, {
        cwd: join(plain, "x"),
        id: PLAIN_ID,
        file: join(plain, "y.ts"),
      });
      const h = harness();
      await importSessions(h.ctx, settings(f, { repoDir: plain }));
      const records = sessions(h.writes);
      assertEquals([...records.keys()], [PLAIN_ID]);
      assertEquals(records.get(PLAIN_ID)!.repo, "~/plain");
      assertEquals(readText(records.get(PLAIN_ID)!), "y.ts");
    });
  },
);

gitTest(
  "import: an index from before repo resolution keeps its subagent ids, so a stale one is still removed",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const index = structuredClone(
        h.writes.filter((w) => w.name === "import-index").at(-1)!.data,
      ) as Record<string, unknown> & {
        sessions: Record<string, string>;
        children: Record<string, string[]>;
      };
      // As the first release wrote it: a skip cache of other repos.
      delete index.resolved;
      delete index.resolvedKey;
      index.others = { abc: "1:2" };
      index.othersKey = "key";
      const stale = await agentSessionChildId(SESSION_ID, "gone");
      index.children[SESSION_ID].push(stale);
      index.sessions[SESSION_ID] = "older|stamp";
      await h.ctx.writeResource("importIndex", "import-index", index);
      await importSessions(h.ctx, settings(f));
      assertEquals(h.deleted, [name(stale)]);
      const next = h.writes.filter((w) => w.name === "import-index").at(-1)!;
      assertFalse("others" in next.data);
      assert("resolved" in next.data);
    });
  },
);

gitTest(
  "import: changing exclude or repos reads no transcript head already placed in another repo",
  async () => {
    await withFixture(async (f) => {
      await addRemote(f.otherRepo, "git@example.com:acme/other.git");
      const h = harness();
      await importSessions(h.ctx, settings(f));
      // Point the other repo's transcript at this repo, keeping its size and
      // mtime: only a scan that read its head again would import it.
      const path = transcriptPath(f, f.otherRepo, OTHER_REPO_ID);
      const text = await Deno.readTextFile(path);
      const info = await Deno.stat(path);
      const swapped = text.replaceAll(
        JSON.stringify(f.otherRepo),
        JSON.stringify(f.repoDir + "/"),
      );
      assertEquals(swapped.length, text.length);
      await Deno.writeTextFile(path, swapped);
      await Deno.utime(path, info.atime!, info.mtime!);
      const { summary } = await importSessions(
        h.ctx,
        settings(f, {
          exclude: ["git@example.com:acme/nothing.git"],
          repos: ["~/src/missing"],
        }),
      );
      assertEquals(summary.found, 4);
      assertFalse(sessions(h.writes).has(OTHER_REPO_ID));
    });
  },
);

gitTest(
  "import: a repo that gains a remote is read again, though its transcripts are cached under its old identity",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(h.ctx, settings(f));
      await addRemote(f.otherRepo, "git@example.com:acme/other.git");
      await importSessions(h.ctx, settings(f, { repos: [f.otherRepo] }));
      assertEquals(
        sessions(h.writes).get(OTHER_REPO_ID)!.repo,
        "example.com/acme/other",
      );
    });
  },
);

gitTest(
  "import: a narrower run keeps other repos' index entries, so a wider one after it rewrites nothing",
  async () => {
    await withFixture(async (f) => {
      await addThird(f);
      const h = harness();
      await importSessions(h.ctx, settings(f, { all: true }));
      await importSessions(h.ctx, settings(f));
      const index = h.writes.filter((w) => w.name === "import-index").at(-1)!;
      const stamps = index.data.sessions as Record<string, string>;
      assert(stamps[THIRD_ID] && stamps[OTHER_REPO_ID]);
      const writes = h.writes.length;
      const again = await importSessions(h.ctx, settings(f, { all: true }));
      assertEquals(again.summary.imported, 0);
      assertEquals(h.writes.length, writes);
    });
  },
);

gitTest(
  "import: an exclude path that is not there is reported; a bare repo's path excludes its clones",
  async () => {
    await withFixture(async (f) => {
      const h = harness();
      await importSessions(
        h.ctx,
        settings(f, { all: true, exclude: ["~/src/other.git"] }),
      );
      assertFalse(sessions(h.writes).has(OTHER_REPO_ID));
      assert(h.logs.includes("warn exclude: ~/src/other.git is not there"));
    });
  },
);

gitTest(
  "import: a run repo git cannot read fails rather than importing as a plain folder",
  async () => {
    await withFixture(async (f) => {
      const broken = join(f.home, "broken");
      await Deno.mkdir(broken);
      await Deno.writeTextFile(join(broken, ".git"), "not a gitdir\n");
      const error = await assertRejects(
        () => importSessions(harness().ctx, settings(f, { repoDir: broken })),
        Error,
      );
      assertStringIncludes(error.message, "git did not answer for ~/broken");
    });
  },
);

gitTest(
  "import: a swamp repo that is not a git repo imports a session started at its root",
  async () => {
    await withFixture(async (f) => {
      const plain = join(f.home, "plain");
      await Deno.mkdir(plain);
      await writeSession(f, { cwd: plain, id: PLAIN_ID });
      const h = harness();
      await importSessions(h.ctx, settings(f, { repoDir: plain }));
      assertEquals([...sessions(h.writes).keys()], [PLAIN_ID]);
    });
  },
);

gitTest(
  "import: another clone that gains this repo's remote is read again",
  async () => {
    await withFixture(async (f) => {
      const clone = join(f.home, "src", "demo2");
      await gitInit(clone);
      await writeSession(f, { cwd: clone, id: CLONE_ID });
      const h = harness();
      await importSessions(h.ctx, settings(f));
      assertFalse(sessions(h.writes).has(CLONE_ID));
      await addRemote(clone, DEMO_REMOTE);
      await importSessions(h.ctx, settings(f));
      assertEquals(sessions(h.writes).get(CLONE_ID)!.repo, DEMO_REPO);
    });
  },
);

gitTest(
  "import: a shared branch keeps a removed worktree unplaced on every run, cached or not",
  async () => {
    await withFixture(async (f) => {
      // A second repo named demo, with a remote (so it is cached), sharing a
      // branch with this repo.
      const twin = join(f.home, "other", "demo");
      await gitInit(twin, {
        remote: "git@example.com:acme/twin.git",
        branches: ["shared"],
      });
      await writeSession(f, { cwd: twin, id: THIRD_ID });
      const branched = await new Deno.Command("git", {
        args: ["-C", f.repoDir, "branch", "shared"],
        stdout: "null",
        stderr: "null",
      }).output();
      assert(branched.success);
      const gone = join(f.home, ".cue", "work", "3-z", "demo");
      await writeSession(f, {
        cwd: gone,
        id: THIRD_WT_ID,
        gitBranch: "shared",
      });
      const h = harness();
      const first = await importSessions(h.ctx, settings(f));
      const second = await importSessions(h.ctx, settings(f));
      assertFalse(sessions(h.writes).has(THIRD_WT_ID));
      assertEquals(second.summary.unresolved, first.summary.unresolved);
    });
  },
);

gitTest(
  "import: a session in a since-deleted subfolder of this repo is still this repo's",
  async () => {
    await withFixture(async (f) => {
      const deleted = join(f.repoDir, "scratch");
      await writeSession(f, {
        cwd: deleted,
        id: DELETED_ID,
        file: join(f.repoDir, "models", "x.yaml"),
      });
      const h = harness();
      await importSessions(h.ctx, settings(f));
      const record = sessions(h.writes).get(DELETED_ID)!;
      assertEquals(record.repo, DEMO_REPO);
      assertEquals(readText(record), "models/x.yaml");
    });
  },
);

gitTest(
  "import: with no git on PATH, this repo's sessions are imported by path, with a warning",
  async () => {
    await withFixture(async (f) => {
      const path = Deno.env.get("PATH");
      const empty = await Deno.makeTempDir();
      Deno.env.set("PATH", empty);
      try {
        const h = harness();
        await importSessions(h.ctx, settings(f));
        const records = sessions(h.writes);
        assert(records.has(SESSION_ID));
        assert(records.has(SUBDIR_ID));
        assertFalse(records.has(OTHER_REPO_ID));
        assert(h.logs.some((l) => l.startsWith("warn git is not on PATH")));
      } finally {
        if (path === undefined) Deno.env.delete("PATH");
        else Deno.env.set("PATH", path);
        await Deno.remove(empty);
      }
    });
  },
);
