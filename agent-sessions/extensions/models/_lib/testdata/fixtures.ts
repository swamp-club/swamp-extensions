/**
 * Synthetic Claude Code transcripts for tests, written into a temp home so
 * the absolute paths redaction works on are real. Never copied from a real
 * session. Every prompt, reply, brief, description, query and tool output
 * holds a `CANARY` string, so a test can prove none of it reaches a record.
 *
 * @module
 */

import { join } from "jsr:@std/path@1.1.4";

/** Text that must never appear in a record or a tag. */
export const CANARY = "CANARY";

export const SESSION_ID = "11111111-2222-4333-8444-555555555555";
export const HEADLESS_ID = "22222222-2222-4333-8444-555555555555";
export const WORKTREE_ID = "33333333-2222-4333-8444-555555555555";
export const OTHER_REPO_ID = "44444444-2222-4333-8444-555555555555";
export const SUBDIR_ID = "55555555-2222-4333-8444-555555555555";
export const FOREIGN_ID = "66666666-2222-4333-8444-555555555555";

/** The branch the removed worktree ran on; the repo still has it. */
export const WORKTREE_BRANCH = "cue/123-feature";

/** The temp tree a fixture lives in. */
export interface Fixture {
  readonly root: string;
  readonly home: string;
  readonly repoDir: string;
  readonly projectsDir: string;
  /** A removed cue worktree of the repo, matched by glob only. */
  readonly worktreeGlob: string;
  readonly sessionDir: string;
  /** The interactive session's transcript, for touching it in tests. */
  readonly transcript: string;
}

type Rec = Record<string, unknown>;

const T0 = Date.parse("2026-10-30T10:00:00.000Z");
const at = (s: number) => new Date(T0 + s * 1000).toISOString();

function encode(path: string): string {
  return path.replace(/[^A-Za-z0-9]/g, "-");
}

function common(cwd: string, sessionId: string, sidechain = false): Rec {
  return {
    cwd,
    sessionId,
    version: "2.1.150",
    entrypoint: "cli",
    isSidechain: sidechain,
    userType: "external",
    gitBranch: "main",
  };
}

function prompt(
  c: Rec,
  s: number,
  text: string,
  origin: Rec | null = { kind: "human" },
): Rec {
  return {
    ...c,
    type: "user",
    timestamp: at(s),
    origin,
    promptSource: "typed",
    message: { role: "user", content: `${CANARY}-PROMPT ${text}` },
  };
}

function usage(input: number, output: number, read = 0, write = 0): Rec {
  return {
    input_tokens: input,
    output_tokens: output,
    cache_read_input_tokens: read,
    cache_creation_input_tokens: write,
  };
}

function reply(c: Rec, s: number, id: string, content: Rec[], u: Rec): Rec {
  return {
    ...c,
    type: "assistant",
    timestamp: at(s),
    message: {
      id,
      role: "assistant",
      model: "claude-opus-5-5",
      content,
      usage: u,
    },
  };
}

function toolUse(id: string, name: string, input: Rec): Rec {
  return { type: "tool_use", id, name, input };
}

function result(
  c: Rec,
  s: number,
  id: string,
  isError = false,
  extra: Rec = {},
  output = `${CANARY}-OUTPUT done`,
): Rec {
  return {
    ...c,
    type: "user",
    timestamp: at(s),
    message: {
      role: "user",
      content: [{
        type: "tool_result",
        tool_use_id: id,
        is_error: isError,
        content: output,
      }],
    },
    ...extra,
  };
}

async function writeJsonl(path: string, records: Array<Rec | string>) {
  await Deno.writeTextFile(
    path,
    records.map((r) => typeof r === "string" ? r : JSON.stringify(r)).join(
      "\n",
    ) + "\n",
  );
}

/** Writes the fixture tree into a fresh temp directory. */
export async function writeFixture(): Promise<Fixture> {
  const root = await Deno.makeTempDir({ prefix: "agent-sessions-" });
  const home = join(root, "home");
  const repoDir = join(home, "src", "demo");
  const worktree = join(home, ".cue", "work", "123-feature", "demo");
  const otherRepo = join(home, "src", "other");
  const projectsDir = join(home, ".claude", "projects");
  for (const d of [repoDir, otherRepo]) {
    await Deno.mkdir(d, { recursive: true });
  }

  // The interactive session, with a subagent that starts a nested subagent.
  const project = join(projectsDir, encode(repoDir));
  const sessionDir = join(project, SESSION_ID);
  await Deno.mkdir(join(sessionDir, "subagents"), { recursive: true });
  const c = common(repoDir, SESSION_ID);
  const longArg = "x".repeat(1500);
  const transcript = join(project, `${SESSION_ID}.jsonl`);
  await writeJsonl(transcript, [
    {
      type: "permission-mode",
      permissionMode: "default",
      sessionId: SESSION_ID,
    },
    {
      ...c,
      type: "user",
      timestamp: at(0),
      message: {
        role: "user",
        content: `<command-name>/clear</command-name> ${CANARY}-COMMAND`,
      },
    },
    prompt(c, 1, "fix the models"),
    // One reply split over two records that repeat its usage.
    reply(
      c,
      2,
      "msg_a",
      [{ type: "text", text: `${CANARY}-REPLY looking` }],
      usage(10, 100, 1000, 50),
    ),
    reply(c, 3, "msg_a", [
      toolUse("toolu_bash1", "Bash", {
        command:
          `cat > ${repoDir}/models/a.yaml <<'EOF'\n${CANARY}-HEREDOC body\nEOF\ncurl -H 'Authorization: Bearer ${CANARY}tok12345' -u alice@example.com ${home}/notes token=${CANARY}`,
        description: `${CANARY}-DESC write a model`,
      }),
    ], usage(10, 100, 1000, 50)),
    result(
      c,
      5,
      "toolu_bash1",
      true,
      {},
      `Exit code 2\n${CANARY}-OUTPUT failed`,
    ),
    reply(c, 6, "msg_b", [
      toolUse("toolu_read1", "Read", { file_path: `${repoDir}/README.md` }),
      toolUse("toolu_search1", "WebSearch", { query: `${CANARY}-QUERY swamp` }),
      toolUse("toolu_grep1", "Grep", {
        pattern: `${CANARY}-PATTERN`,
        path: `${repoDir}/src`,
      }),
    ], usage(5, 20)),
    result(c, 7, "toolu_read1"),
    result(c, 7, "toolu_search1"),
    result(c, 8, "toolu_grep1"),
    "{not json",
    {
      type: "attachment",
      attachment: { content: `${CANARY}-ATTACHMENT` },
      timestamp: at(8),
    },
    // A 1.0.x-era subagent record inline in the parent file: not the parent's.
    {
      ...common(repoDir, SESSION_ID, true),
      type: "assistant",
      timestamp: at(8),
      message: {
        id: "msg_old",
        content: [toolUse("toolu_old", "Bash", { command: "ls" })],
        usage: usage(1, 1),
      },
    },
    prompt(c, 10, "now delegate"),
    reply(c, 11, "msg_c", [
      toolUse("toolu_agent1", "Agent", {
        description: `${CANARY}-AGENT-DESC`,
        prompt: `${CANARY}-BRIEF explore it`,
        subagent_type: "Explore",
      }),
      toolUse("toolu_long", "Bash", { command: `echo ${longArg}` }),
      toolUse("toolu_mcp", "mcp__server__lookup", { q: `${CANARY}-MCP` }),
      toolUse("toolu_new", "SomeFutureTool", { x: `${CANARY}-NEW` }),
    ], usage(7, 70)),
    result(c, 12, "toolu_agent1", false, {
      toolUseResult: {
        status: "async_launched",
        agentId: "a1",
        prompt: `${CANARY}-BRIEF`,
      },
    }),
    result(c, 13, "toolu_long"),
    result(c, 13, "toolu_mcp"),
  ]);
  const s1 = common(repoDir, SESSION_ID, true);
  await writeJsonl(join(sessionDir, "subagents", "agent-a1.jsonl"), [
    { ...prompt(s1, 12, "explore", null), agentId: "a1" },
    {
      ...reply(s1, 14, "msg_s1", [
        toolUse("toolu_s1_glob", "Glob", { pattern: "**/*.ts", path: repoDir }),
        toolUse("toolu_s1_agent", "Agent", {
          description: `${CANARY}-NESTED-DESC`,
          prompt: `${CANARY}-NESTED-BRIEF`,
        }),
      ], usage(3, 30)),
      agentId: "a1",
    },
    { ...result(s1, 15, "toolu_s1_glob"), agentId: "a1" },
    {
      ...result(s1, 20, "toolu_s1_agent", false, {
        toolUseResult: { agentId: "a2" },
      }),
      agentId: "a1",
    },
  ]);
  await Deno.writeTextFile(
    join(sessionDir, "subagents", "agent-a1.meta.json"),
    JSON.stringify({
      agentType: "Explore",
      toolUseId: "toolu_agent1",
      description: `${CANARY}-AGENT-DESC`,
      spawnDepth: 1,
    }),
  );
  await writeJsonl(join(sessionDir, "subagents", "agent-a2.jsonl"), [
    { ...prompt(s1, 16, "nested", null), agentId: "a2" },
    {
      ...reply(s1, 17, "msg_s2", [
        toolUse("toolu_s2_read", "Read", { file_path: `${repoDir}/a.ts` }),
      ], usage(2, 20)),
      agentId: "a2",
    },
    { ...result(s1, 18, "toolu_s2_read"), agentId: "a2" },
  ]);
  await Deno.writeTextFile(
    join(sessionDir, "subagents", "agent-a2.meta.json"),
    JSON.stringify({
      agentType: "general-purpose",
      toolUseId: "toolu_s1_agent",
      spawnDepth: 2,
    }),
  );

  // A headless session (claude -p): sdk entrypoint, no origin.
  const h = { ...common(repoDir, HEADLESS_ID), entrypoint: "sdk-cli" };
  await writeJsonl(join(project, `${HEADLESS_ID}.jsonl`), [
    { ...prompt(h, 0, "review", null), promptSource: "sdk" },
    reply(h, 1, "msg_h", [
      toolUse("toolu_h1", "Bash", { command: "swamp model list" }),
    ], usage(1, 2)),
    result(h, 2, "toolu_h1"),
  ]);

  // A session started in a subdirectory of the repo, in its own folder.
  const sub = join(repoDir, "src");
  const subProject = join(projectsDir, encode(sub));
  await Deno.mkdir(subProject, { recursive: true });
  const sc = common(sub, SUBDIR_ID);
  await writeJsonl(join(subProject, `${SUBDIR_ID}.jsonl`), [
    prompt(sc, 0, "hi"),
    reply(
      sc,
      1,
      "msg_sub",
      [{ type: "text", text: `${CANARY}-REPLY` }],
      usage(1, 1),
    ),
  ]);

  // A removed worktree: git no longer lists it, the glob still matches.
  const wtProject = join(projectsDir, encode(worktree));
  await Deno.mkdir(wtProject, { recursive: true });
  const wc = { ...common(worktree, WORKTREE_ID), gitBranch: WORKTREE_BRANCH };
  await writeJsonl(join(wtProject, `${WORKTREE_ID}.jsonl`), [
    prompt(wc, 0, "worktree work"),
    reply(wc, 1, "msg_w", [
      toolUse("toolu_w1", "Edit", {
        file_path: `${worktree}/x.ts`,
        old_string: `${CANARY}-OLD`,
        new_string: `${CANARY}-NEW`,
      }),
    ], usage(1, 1)),
    result(wc, 2, "toolu_w1"),
  ]);

  // Another repo's cue worktree with the same directory name: the glob
  // matches it, but it ran on a branch this repo does not have.
  const foreign = join(home, ".cue", "work", "999-other", "demo");
  const foreignProject = join(projectsDir, encode(foreign));
  await Deno.mkdir(foreignProject, { recursive: true });
  const fc = { ...common(foreign, FOREIGN_ID), gitBranch: "cue/999-other" };
  await writeJsonl(join(foreignProject, `${FOREIGN_ID}.jsonl`), [
    prompt(fc, 0, "foreign"),
  ]);

  // Another repo whose folder name shares a prefix: never imported.
  const otherProject = join(projectsDir, encode(otherRepo));
  await Deno.mkdir(otherProject, { recursive: true });
  const oc = common(otherRepo, OTHER_REPO_ID);
  await writeJsonl(join(otherProject, `${OTHER_REPO_ID}.jsonl`), [
    prompt(oc, 0, "other"),
  ]);

  return {
    root,
    home,
    repoDir,
    projectsDir,
    worktreeGlob: join(home, ".cue", "work", "*", "demo"),
    sessionDir,
    transcript,
  };
}
