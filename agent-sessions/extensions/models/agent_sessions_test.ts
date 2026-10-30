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
  type Fixture,
  FOREIGN_ID,
  HEADLESS_ID,
  OTHER_REPO_ID,
  SESSION_ID,
  SUBDIR_ID,
  WORKTREE_BRANCH,
  WORKTREE_ID,
  writeFixture,
} from "./_lib/testdata/fixtures.ts";

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
    repoPaths: [f.repoDir],
    worktreeGlobs: [f.worktreeGlob],
    repoBranches: new Set(["main", WORKTREE_BRANCH]),
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

Deno.test("import: every record passes the v2 reader, and only this repo's sessions are imported", async () => {
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
});

Deno.test("import: no prompt, reply, brief, description, query, output or home path reaches a record or tag", async () => {
  await withFixture(async (f) => {
    const h = harness();
    await importSessions(h.ctx, settings(f));
    const stored = JSON.stringify(h.writes);
    assertFalse(stored.includes(CANARY), "canary text leaked");
    assertFalse(stored.includes(f.home), "home path leaked");
    assertFalse(stored.includes("alice@example.com"), "email leaked");
    assertFalse(stored.includes("Bearer CANARY"), "bearer token leaked");
  });
});

Deno.test("import: a session's turns, calls, tokens and redacted text", async () => {
  await withFixture(async (f) => {
    const h = harness();
    await importSessions(h.ctx, settings(f));
    const s = sessions(h.writes).get(SESSION_ID)!;
    assertEquals(s.harness, "claude-code");
    assertEquals(s.harnessVersion, "2.1.150");
    assertEquals(s.model, "claude-opus-5-5");
    assertEquals(s.repo, "demo");
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
});

Deno.test("import: subagents are child records linked both ways, nesting included", async () => {
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
    const nestedCall = allCalls(child).find((c) => c.id === "toolu_s1_agent")!;
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
});

Deno.test("import: a headless session is marked, and tags mirror it", async () => {
  await withFixture(async (f) => {
    const h = harness();
    await importSessions(h.ctx, settings(f));
    assertEquals(sessions(h.writes).get(HEADLESS_ID)!.invocation, "headless");
    const tags = h.writes.find((w) => w.name === name(HEADLESS_ID))!.tags!;
    assertEquals(tags.headless, "true");
    assertEquals(tags.swampUserId, "user-123");
    assertEquals(tags.startedAt, "2026-10-30T10:00:00.000Z");
  });
});

Deno.test("import: re-import of an unchanged tree writes nothing; a touched file re-imports only its session", async () => {
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
});

Deno.test("import: since skips transcripts last modified before it", async () => {
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

Deno.test("import: offline, records and tags carry no identity", async () => {
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
        repoPaths: ["/nonexistent/repo"],
        worktreeGlobs: [],
        repoBranches: new Set(),
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
  assertFalse(
    model.methods.import.arguments.safeParse({ since: "soon" }).success,
  );
  assert(
    model.methods.import.arguments.safeParse({ since: "2026-10-01" }).success,
  );
});

Deno.test("import: a re-import with a new importer version rewrites finished sessions", async () => {
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
});

Deno.test("import: a session that fails the record is stamped and not retried until it changes", async () => {
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
    assert(h.logs.some((l) => l.startsWith("warn Skipped session not.valid")));
    const again = await importSessions(h.ctx, settings(f));
    assertEquals(again.summary.skipped, 0);
    assertEquals(again.summary.unchanged, 5);
  });
});

Deno.test("import: a transcript that vanishes mid-scan is skipped, not fatal", async () => {
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
});

Deno.test("import: a re-import reads no transcript head it already knows is another repo's", async () => {
  await withFixture(async (f) => {
    const h = harness();
    await importSessions(h.ctx, settings(f));
    const index = h.writes.filter((w) => w.name === "import-index").at(-1)!;
    const others = index.data.others as Record<string, string>;
    // The other repo's transcript, by hash only. The foreign worktree's is
    // not remembered: only its branch kept it out, and a fetch can change that.
    assertEquals(Object.keys(others).length, 1);
    assertFalse(JSON.stringify(index.data).includes(f.home));
    const writes = h.writes.length;
    await importSessions(h.ctx, settings(f));
    assertEquals(h.writes.length, writes, "an unchanged scan writes nothing");
  });
});

Deno.test("import: since keeps a session whose subagent changed after it", async () => {
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
});

Deno.test({
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

Deno.test("import: when whoami does not answer, a re-import keeps the identity a session had", async () => {
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
});

Deno.test("import: a subagent whose transcript is gone has its record removed", async () => {
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
});

Deno.test("import: a write that fails is retried, and sessions already written keep their stamps", async () => {
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
});

Deno.test("import: without deleteResource, a stale child id stays in the index", async () => {
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
});

Deno.test("import: a session whose transcript is gone leaves the index, its records stay", async () => {
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
});

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

Deno.test("import: a subagent file that vanishes mid-scan drops only that subagent", async () => {
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
});

Deno.test("import: a session first imported while whoami fails is attributed once whoami answers", async () => {
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
});

Deno.test({
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
