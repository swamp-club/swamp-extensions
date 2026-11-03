/**
 * The Codex importer on six real rollouts (swamp-club#4158), trimmed by
 * `testdata/codex/trim.ts`, from a scratch swamp repo:
 *
 * - A, an interactive session of six turns: swamp, git and read-only
 *   commands, a failing one, an apply_patch over a definition and a new
 *   file, a `sed -i` on the definition and a read of `.swamp/data`;
 * - B, `codex exec` in a worktree since removed, on branch `fx-b`;
 * - a parent that spawns two agents (one spawns its own) and sends one a
 *   follow-up, then runs `sleep 45` past exec's yield, has `sleep 120`
 *   interrupted and killed, and is resumed for `git status`.
 */

import {
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
} from "jsr:@std/assert@1.0.19";
import { dirname, fromFileUrl, join } from "jsr:@std/path@1.1.4";
import {
  type AgentSessionRecord,
  readAgentSessionRecord,
} from "../contract/session_record.ts";
import {
  type DataHandle,
  type ImportContext,
  importSessions,
} from "../importer.ts";
import { NoTranscriptsError } from "../sessions/place.ts";
import { RepoResolver } from "../sessions/resolve.ts";
import { CANARY, GIT_AVAILABLE, gitInit } from "../testdata/fixtures.ts";
import { HOME, ROOT, WORKTREE } from "../testdata/codex/trim.ts";
import {
  HOME as CLAUDE_HOME,
  ROOT as CLAUDE_ROOT,
} from "../testdata/sessions/trim.ts";
import { commandLine, invocationOf, parseRollout } from "./parse.ts";
import { defaultCodexDir, discoverCodexSessions } from "./discover.ts";

const TESTDATA = join(dirname(fromFileUrl(import.meta.url)), "..", "testdata");
const DAY = join("2026", "11", "02");

const A = "01a19dfa-962b-73f1-bdea-94fe0ef6bca8";
const B = "01a19dfe-3a65-7260-83e6-9d61ccd6d45e";
const PARENT = "01a19e01-e58c-7ef3-9034-2bbd0258ea19";
const SWAMP_AGENT = "01a19e02-22ff-75a2-8a53-c432360ccfb9";
const GIT_AGENT = "01a19e02-30e0-72b0-a3de-4e1dac619c9b";
const MODELS_AGENT = "01a19e02-3ffa-7a62-b063-fdfbc8fda526";

interface Tree {
  readonly home: string;
  readonly root: string;
  readonly codexDir: string;
  readonly projectsDir: string;
  /** Each rollout's path, by thread id. */
  readonly files: Map<string, string>;
}

/**
 * A temp home holding the scratch repo (with branch fx-b, whose worktree is
 * gone) and the six rollouts, filed as Codex files them.
 */
async function withTree(fn: (t: Tree) => Promise<void>): Promise<void> {
  const tmp = await Deno.makeTempDir({ prefix: "agent-sessions-codex-" });
  try {
    const home = join(tmp, "home");
    const root = join(home, "scratch", "codex-fixtures");
    const worktree = join(home, "worktrees", "codex-fx", "codex-fixtures");
    await gitInit(root, { branches: ["fx-b"] });
    const codexDir = join(home, ".codex", "sessions");
    await Deno.mkdir(join(codexDir, DAY), { recursive: true });
    const files = new Map<string, string>();
    for await (const e of Deno.readDir(join(TESTDATA, "codex", DAY))) {
      const text =
        (await Deno.readTextFile(join(TESTDATA, "codex", DAY, e.name)))
          .replaceAll(WORKTREE, worktree).replaceAll(ROOT, root)
          .replaceAll(HOME, home);
      const path = join(codexDir, DAY, e.name);
      await Deno.writeTextFile(path, text);
      files.set(e.name.slice(-42, -6), path);
    }
    await fn({
      home,
      root,
      codexDir,
      projectsDir: join(home, ".claude", "projects"),
      files,
    });
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
}

const parse = async (t: Tree, id: string) =>
  parseRollout(await Deno.readTextFile(t.files.get(id)!), {
    redact: { home: t.home, logDirs: [t.codexDir] },
    root: t.root,
  });

const calls = (r: { turns: AgentSessionRecord["turns"] }) =>
  r.turns.flatMap((turn) => turn.calls);

const gitTest = GIT_AVAILABLE ? Deno.test : Deno.test.ignore;

Deno.test("commandLine: a shell's -lc line is the command; any other argv is joined, quoted", () => {
  assertEquals(commandLine(["/usr/bin/bash", "-lc", "ls -la"]), "ls -la");
  assertEquals(commandLine(["zsh", "-c", "git status"]), "git status");
  assertEquals(commandLine(["git", "status"]), "git status");
  // A word with spaces or shell characters is quoted, so its text is elided
  // like a shell's.
  assertEquals(
    commandLine(["git", "commit", "-m", "it's for Acme"]),
    "git commit -m 'it'\\''s for Acme'",
  );
  assertEquals(commandLine(["echo", ""]), "echo ''");
  assertEquals(commandLine("ls"), "ls");
  assertEquals(commandLine([1, 2]), "");
});

Deno.test("invocationOf: the TUI is interactive, codex exec headless", () => {
  assertEquals(invocationOf("codex-tui"), "interactive");
  assertEquals(invocationOf("codex_exec"), "headless");
  assertEquals(invocationOf("something-else"), "unknown");
  assertEquals(invocationOf(undefined), "unknown");
});

Deno.test("defaultCodexDir: CODEX_HOME/sessions, else ~/.codex/sessions", () => {
  const env = (vars: Record<string, string>) => ({
    get: (k: string) => vars[k],
  });
  assertEquals(
    defaultCodexDir(env({ CODEX_HOME: "/c" }), "/h"),
    join("/c", "sessions"),
  );
  assertEquals(
    defaultCodexDir(env({}), "/h"),
    join("/h", ".codex", "sessions"),
  );
  assertEquals(defaultCodexDir(env({}), undefined), undefined);
});

gitTest(
  "parseRollout A: six turns of commands out of exec, apply_patch per file, OpenAI tokens",
  async () => {
    await withTree(async (t) => {
      const p = await parse(t, A);
      assertEquals(p.invocation, "interactive");
      assertEquals(p.harnessVersion, "0.166.0");
      assertEquals(p.model, "gpt-6.1-sol");
      assertEquals(p.turns.map((turn) => turn.calls.length), [
        9,
        4,
        1,
        4,
        1,
        1,
      ]);
      // exec itself is no call: every call is a command or a patched file.
      assertEquals(
        [...new Set(calls(p).map((c) => c.tool))].sort(),
        ["apply_patch", "exec_command"],
      );
      const failed = calls(p).filter((c) => !c.ok).map((
        c,
      ) => [c.text, c.exitCode]);
      assert(
        failed.some(([text, code]) =>
          text === "swamp data list" && code === 75
        ),
      );
      assert(
        failed.some(([text, code]) =>
          text === "ls /nonexistent-dir" && code === 2
        ),
      );
      const patch = p.turns[3].calls.filter((c) => c.tool === "apply_patch");
      assertEquals(
        patch.map((c) => [c.text, c.toolKind]).sort(),
        [["models/command/shell/hello.yaml", "file-edit"], [
          "notes.md",
          "file-write",
        ]],
      );
      assertEquals(new Set(patch.map((c) => c.id)).size, 2);
      // OpenAI's input_tokens include the cached ones; the record keeps them apart.
      assertEquals(p.turns[0].tokens, {
        input: 16289,
        output: 475,
        cacheRead: 122880,
        cacheWrite: 0,
      });
    });
  },
);

gitTest(
  "parseRollout parent: a yielded command, a killed one after an abort, and a resumed turn",
  async () => {
    await withTree(async (t) => {
      const p = await parse(t, PARENT);
      assertEquals(p.turns.length, 4);
      assertEquals(
        p.turns[0].calls.map((c) => [c.tool, c.toolKind]).filter(([tool]) =>
          tool !== "exec_command"
        ),
        [
          ["spawn_agent", "subagent"],
          ["spawn_agent", "subagent"],
          ["followup_task", "other"],
          ["wait_agent", "other"],
          ["wait_agent", "other"],
          ["wait_agent", "other"],
        ],
      );
      // sleep 45 finished through exec's wait, in its own turn.
      const [sleep45] = p.turns[1].calls;
      assertEquals([sleep45.text, sleep45.ok], ["sleep 45; echo done", true]);
      assert(sleep45.end - sleep45.start > 40_000);
      // sleep 120 was killed after the turn was interrupted: still its turn's.
      const [sleep120] = p.turns[2].calls;
      assertEquals([sleep120.text, sleep120.ok, sleep120.exitCode], [
        "sleep 120",
        false,
        -1,
      ]);
      assert(p.turns[2].end >= sleep120.end);
      assertEquals(p.turns[3].calls.map((c) => c.text), ["git status"]);
      assertEquals(
        [...p.spawned.values()].sort(),
        [SWAMP_AGENT, GIT_AGENT].sort(),
      );
    });
  },
);

gitTest(
  "parseRollout subagent: the copied parent history is skipped",
  async () => {
    await withTree(async (t) => {
      const swamp = await parse(t, SWAMP_AGENT);
      assertEquals(swamp.meta?.parentThreadId, PARENT);
      assertEquals(swamp.meta?.agentPath, "/root/swamp");
      assertEquals(swamp.turns.length, 1);
      // Only its own calls: none of the parent's cat or spawn_agent calls.
      assertEquals(calls(swamp).length, 8);
      assertFalse(calls(swamp).some((c) => c.tool === "spawn_agent"));
      assert(calls(swamp).some((c) => c.text === "swamp model get hello"));
      const git = await parse(t, GIT_AGENT);
      assertEquals(calls(git).map((c) => c.tool), [
        "spawn_agent",
        "exec_command",
        "wait_agent",
      ]);
      assertEquals([...git.spawned.values()], [MODELS_AGENT]);
      const models = await parse(t, MODELS_AGENT);
      assertEquals(calls(models).map((c) => c.text), ["ls models"]);
    });
  },
);

gitTest(
  "discoverCodexSessions: three sessions, subagents under their top session, B placed by its branch",
  async () => {
    await withTree(async (t) => {
      const resolver = new RepoResolver(t.home, [
        join(t.home, "worktrees", "*", "<repo>"),
      ]);
      const found = await discoverCodexSessions({
        sessionsDir: t.codexDir,
        resolver,
        selects: () => true,
        mayHold: () => true,
      });
      assertEquals(found.sessions.map((s) => s.sessionId), [A, B, PARENT]);
      assertEquals([...found.seen].sort(), [A, B, PARENT]);
      assertEquals(found.unresolved, 0);
      const parent = found.sessions.find((s) => s.sessionId === PARENT)!;
      assertEquals(
        parent.children.map((c) => [c.threadId, c.parentThreadId, c.agentPath]),
        [
          [SWAMP_AGENT, PARENT, "/root/swamp"],
          [GIT_AGENT, PARENT, "/root/git"],
          [MODELS_AGENT, GIT_AGENT, "/root/git/models"],
        ].sort(([a], [b]) => a.localeCompare(b)),
      );
      // B's worktree is gone; it is placed by the glob and its branch.
      const b = found.sessions.find((s) => s.sessionId === B)!;
      assertEquals(b.repo.mainCheckout, parent.repo.mainCheckout);
      // A since after every rollout keeps none.
      const later = await discoverCodexSessions({
        sessionsDir: t.codexDir,
        resolver,
        selects: () => true,
        mayHold: () => true,
        since: new Date(Date.now() + 60_000),
      });
      assertEquals(later.sessions.length, 0);
    });
  },
);

function harness() {
  const store = new Map<string, Record<string, unknown>>();
  const records = new Map<string, AgentSessionRecord>();
  const written: string[] = [];
  const logs: string[] = [];
  const ctx: ImportContext = {
    logger: { info: (m) => logs.push(m), warn: (m) => logs.push(m) },
    writeResource: (spec, name, data) => {
      written.push(name);
      assertFalse(JSON.stringify(data).includes(CANARY), "canary text leaked");
      if (spec === "session") {
        const read = readAgentSessionRecord(data);
        assertEquals(read.kind, "record", `${name} fails the v2 reader`);
        if (read.kind === "record") records.set(name, read.record);
      }
      store.set(name, structuredClone(data));
      return Promise.resolve({ name } as DataHandle);
    },
    readResource: (name) => Promise.resolve(store.get(name) ?? null),
  };
  return { ctx, records, written, logs };
}

const settings = (t: Tree) => ({
  repoDir: t.root,
  projectsDir: t.projectsDir,
  codexDir: t.codexDir,
  repos: [],
  all: false,
  exclude: [],
  worktreeGlobs: [join(t.home, "worktrees", "*", "<repo>")],
  home: t.home,
  importerVersion: "test",
  whoami: () => Promise.resolve({ kind: "none" as const }),
});

const name = (id: string) => `agent-session-codex_${id}`;

gitTest(
  "import: Codex alone writes a record per session and subagent, linked and labelled",
  async () => {
    await withTree(async (t) => {
      const h = harness();
      const { summary } = await importSessions(h.ctx, settings(t));
      assertEquals([summary.found, summary.imported, summary.subagents], [
        3,
        3,
        3,
      ]);
      const r = (id: string) => h.records.get(name(id))!;
      for (const id of [A, B, PARENT, SWAMP_AGENT, GIT_AGENT, MODELS_AGENT]) {
        assertEquals(r(id).harness, "codex");
        assertEquals(calls(r(id)).filter((c) => c.label === "unlabeled"), []);
      }
      assertEquals(r(B).invocation, "headless");
      // A subagent copies its session's invocation, names its parent thread,
      // and its parent's spawn_agent call points at it.
      const models = r(MODELS_AGENT);
      assertEquals(
        [models.parentSessionId, models.agentId, models.invocation],
        [GIT_AGENT, "/root/git/models", "interactive"],
      );
      for (
        const [parent, child] of [[PARENT, SWAMP_AGENT], [PARENT, GIT_AGENT], [
          GIT_AGENT,
          MODELS_AGENT,
        ]]
      ) {
        const start = calls(r(parent)).find((c) =>
          c.subagentSessionId === child
        );
        assertEquals(start?.tool, "spawn_agent");
      }
      // The same rules as Claude Code's calls.
      const a = calls(r(A));
      const label = (text: string) =>
        a.filter((c) => c.text.startsWith(text)).map((
          c,
        ) => [c.label, c.category]);
      assertEquals(label("models/command/shell/hello.yaml"), [[
        "bypass",
        "hand-edited definition",
      ]]);
      assertEquals(label("notes.md"), [["neutral", "user code"]]);
      assertEquals(label("sed -i"), [["bypass", "hand-edited definition"]]);
      assertEquals(label("ls -la .swamp/data"), [[
        "bypass",
        "read swamp state directly",
      ]]);
      assertEquals(label("swamp model get hello")[0], [
        "swamp",
        "swamp model get",
      ]);
      assert(r(A).findings.some((f) => f.title.includes("failed calls")));
      // Paths are relative to the repo, home is ~: no temp path is stored.
      for (const rec of h.records.values()) {
        assertFalse(JSON.stringify(rec).includes(t.home));
      }
    });
  },
);

gitTest(
  "import: unchanged rollouts write nothing; a resumed one re-imports its whole tree",
  async () => {
    await withTree(async (t) => {
      const h = harness();
      await importSessions(h.ctx, settings(t));
      const before = h.written.length;
      const again = await importSessions(h.ctx, settings(t));
      assertEquals(again.summary.imported, 0);
      assertEquals(h.written.length, before);
      // A resume appends to the same rollout.
      await Deno.writeTextFile(t.files.get(PARENT)!, "\n", { append: true });
      const resumed = await importSessions(h.ctx, settings(t));
      assertEquals([resumed.summary.imported, resumed.summary.subagents], [
        1,
        3,
      ]);
    });
  },
);

gitTest(
  "import: when whoami fails, a Codex session keeps the identity its last import recorded",
  async () => {
    await withTree(async (t) => {
      const h = harness();
      const identity = { swampUserId: "u-1", swampUsername: "seth" };
      await importSessions(h.ctx, {
        ...settings(t),
        whoami: () => Promise.resolve({ kind: "identity" as const, identity }),
      });
      await Deno.writeTextFile(t.files.get(A)!, "\n", { append: true });
      await importSessions(h.ctx, {
        ...settings(t),
        whoami: () => Promise.resolve({ kind: "failed" as const }),
      });
      assertEquals(h.records.get(name(A))!.swampUsername, "seth");
    });
  },
);

gitTest(
  "import: Claude Code and Codex sessions in one run; neither root is an error",
  async () => {
    await withTree(async (t) => {
      // A real Claude Code session in the same repo.
      const project = join(t.projectsDir, t.root.replace(/[^A-Za-z0-9]/g, "-"));
      await Deno.mkdir(project, { recursive: true });
      const claude = await Deno.readTextFile(
        join(TESTDATA, "sessions", "gatorwalk.jsonl"),
      );
      await Deno.writeTextFile(
        join(project, "3dc34d08-ebe6-484f-8034-e29c8785dcef.jsonl"),
        claude.replaceAll(CLAUDE_ROOT, t.root).replaceAll(CLAUDE_HOME, t.home),
      );
      const h = harness();
      const { summary } = await importSessions(h.ctx, settings(t));
      assertEquals(summary.found, 4);
      const harnesses = [...h.records.values()].map((r) => r.harness);
      assertEquals(harnesses.filter((x) => x === "claude-code").length, 1);
      assertEquals(harnesses.filter((x) => x === "codex").length, 6);
      await assertRejects(
        () =>
          importSessions(harness().ctx, {
            ...settings(t),
            projectsDir: join(t.home, "none-a"),
            codexDir: join(t.home, "none-b"),
          }),
        NoTranscriptsError,
      );
    });
  },
);

gitTest(
  "import: an unreadable Codex root is a warning, and Claude Code still imports",
  async () => {
    await withTree(async (t) => {
      const project = join(t.projectsDir, t.root.replace(/[^A-Za-z0-9]/g, "-"));
      await Deno.mkdir(project, { recursive: true });
      const claude = await Deno.readTextFile(
        join(TESTDATA, "sessions", "gatorwalk.jsonl"),
      );
      await Deno.writeTextFile(
        join(project, "3dc34d08-ebe6-484f-8034-e29c8785dcef.jsonl"),
        claude.replaceAll(CLAUDE_ROOT, t.root).replaceAll(CLAUDE_HOME, t.home),
      );
      const codexHome = dirname(t.codexDir);
      await Deno.chmod(codexHome, 0o000);
      try {
        // Root reads anything, so the case cannot be made there.
        const readable = await Deno.stat(t.codexDir).then(
          () => true,
          () => false,
        );
        if (readable) return;
        const h = harness();
        const { summary } = await importSessions(h.ctx, settings(t));
        assertEquals(summary.imported, 1);
        assert(
          h.logs.some((l) => l.startsWith("Cannot read Codex's rollouts")),
        );
      } finally {
        await Deno.chmod(codexHome, 0o755);
      }
    });
  },
);

gitTest(
  "import: a run without one harness's root keeps that harness's index entries",
  async () => {
    await withTree(async (t) => {
      const h = harness();
      await importSessions(h.ctx, settings(t));
      const before = h.written.length;
      // A run with only Claude Code's root (empty) and no Codex root.
      await Deno.mkdir(t.projectsDir, { recursive: true });
      await importSessions(h.ctx, {
        ...settings(t),
        codexDir: join(t.home, "elsewhere"),
      });
      const again = await importSessions(h.ctx, settings(t));
      assertEquals(again.summary.imported, 0);
      // No session was written again; only the index, whose resolve cache
      // key names both roots, was.
      assertEquals(
        h.written.slice(before).filter((n) => n !== "import-index"),
        [],
      );
    });
  },
);

gitTest(
  "import: a Codex agent path or role longer than the record allows is cut, not a refused session",
  async () => {
    await withTree(async (t) => {
      const path = t.files.get(MODELS_AGENT)!;
      const lines = (await Deno.readTextFile(path)).split("\n");
      const meta = JSON.parse(lines[0]);
      const long = "/root/" + "deep/".repeat(80) + "models";
      meta.payload.agent_path = long;
      meta.payload.agent_role = "r".repeat(300);
      lines[0] = JSON.stringify(meta);
      await Deno.writeTextFile(path, lines.join("\n"));
      const h = harness();
      const { summary } = await importSessions(h.ctx, settings(t));
      assertEquals(summary.skipped, 0);
      const child = h.records.get(name(MODELS_AGENT))!;
      assertEquals(child.agentId!.length, 200);
      assert(child.agentId!.endsWith("/models"));
      assertEquals(child.agentType, "r".repeat(200));
    });
  },
);
