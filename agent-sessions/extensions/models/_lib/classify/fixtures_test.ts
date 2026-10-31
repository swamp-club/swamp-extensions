/**
 * Labels and findings on three real sessions from the agent observation
 * prototype, trimmed by `testdata/sessions/trim.ts`. The expected counts are
 * the ones swamp-club#4157 names, which the prototype found on the same
 * sessions.
 */

import { assert, assertEquals, assertFalse } from "jsr:@std/assert@1.0.19";
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
import { CANARY, GIT_AVAILABLE, gitInit } from "../testdata/fixtures.ts";
import { HOME, ROOT } from "../testdata/sessions/trim.ts";

const SESSIONS = join(
  dirname(fromFileUrl(import.meta.url)),
  "..",
  "testdata",
  "sessions",
);

interface Case {
  readonly name: string;
  readonly id: string;
  readonly extensions: readonly string[];
  readonly subagent?: { agentId: string; agentType: string; toolUseId: string };
}

async function importCase(c: Case): Promise<AgentSessionRecord[]> {
  const tmp = await Deno.makeTempDir({ prefix: "agent-sessions-real-" });
  try {
    const home = join(tmp, "home");
    const root = join(home, "src", c.name);
    await gitInit(root, { remote: `git@example.com:demo/${c.name}.git` });
    if (c.extensions.length > 0) {
      await Deno.mkdir(join(root, ".swamp"));
      await Deno.writeTextFile(
        join(root, ".swamp", "upstream_extensions.json"),
        JSON.stringify({ extensions: c.extensions.map((name) => ({ name })) }),
      );
    }
    const place = (text: string) =>
      text.replaceAll(ROOT, root).replaceAll(HOME, home);
    const projectsDir = join(home, ".claude", "projects");
    const project = join(projectsDir, root.replace(/[^A-Za-z0-9]/g, "-"));
    await Deno.mkdir(project, { recursive: true });
    await Deno.writeTextFile(
      join(project, `${c.id}.jsonl`),
      place(await Deno.readTextFile(join(SESSIONS, `${c.name}.jsonl`))),
    );
    if (c.subagent) {
      const dir = join(project, c.id, "subagents");
      await Deno.mkdir(dir, { recursive: true });
      const base = join(dir, `agent-${c.subagent.agentId}`);
      await Deno.writeTextFile(
        `${base}.jsonl`,
        place(
          await Deno.readTextFile(join(SESSIONS, `${c.name}-subagent.jsonl`)),
        ),
      );
      await Deno.writeTextFile(
        `${base}.meta.json`,
        JSON.stringify({
          agentType: c.subagent.agentType,
          toolUseId: c.subagent.toolUseId,
        }),
      );
    }
    const records: AgentSessionRecord[] = [];
    const ctx: ImportContext = {
      logger: { info: () => {}, warn: () => {} },
      writeResource: (spec, name, data) => {
        if (spec === "session") {
          const read = readAgentSessionRecord(data);
          assertEquals(read.kind, "record", `${name} fails the v2 reader`);
          if (read.kind === "record") records.push(read.record);
        }
        assertFalse(
          JSON.stringify(data).includes(CANARY),
          "canary text leaked",
        );
        return Promise.resolve({ name } as DataHandle);
      },
      readResource: () => Promise.resolve(null),
    };
    await importSessions(ctx, {
      repoDir: root,
      projectsDir,
      repos: [],
      all: false,
      exclude: [],
      worktreeGlobs: [],
      home,
      importerVersion: "test",
      whoami: () => Promise.resolve({ kind: "none" as const }),
    });
    return records;
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
}

const calls = (r: AgentSessionRecord) => r.turns.flatMap((t) => t.calls);

function counts(r: AgentSessionRecord): Record<string, number> {
  const n: Record<string, number> = {
    swamp: 0,
    bypass: 0,
    neutral: 0,
    unlabeled: 0,
  };
  for (const c of calls(r)) n[c.label]++;
  return n;
}

const titles = (r: AgentSessionRecord) =>
  r.findings.map((f) => [f.severity, f.title]);

const gitTest = GIT_AVAILABLE ? Deno.test : Deno.test.ignore;

gitTest(
  "real session status-checker: 17 swamp, 3 bypass, 12 neutral, a 2-call failure streak",
  async () => {
    const [s, ...rest] = await importCase({
      name: "status-checker",
      id: "1e47fb74-0a08-4d1e-8818-a7c38a0ecddf",
      extensions: [],
    });
    assertEquals(rest.length, 0);
    assertEquals(calls(s).length, 32);
    assertEquals(counts(s), {
      swamp: 17,
      bypass: 3,
      neutral: 12,
      unlabeled: 0,
    });
    assertEquals(titles(s), [
      ["medium", "2 failed calls within 3 minutes of each other (turn 1)"],
    ]);
  },
);

gitTest(
  "real session track-star: 100 / 17 / 52, a hand-edit loop, covered git and deno, 12 source reads",
  async () => {
    const records = await importCase({
      name: "track-star",
      id: "463d9bf4-5af8-4e45-b475-88d418b91701",
      extensions: ["@swamp/deno-runner", "@swamp/git", "@swamp/stagecraft"],
      subagent: {
        agentId: "ab074c6c38f1b6027",
        agentType: "general-purpose",
        toolUseId: "toolu_01FrXKuUGNM3spuNHJiYztgL",
      },
    });
    const s = records.find((r) => r.parentSessionId === undefined)!;
    assertEquals(calls(s).length, 169);
    assertEquals(counts(s), {
      swamp: 100,
      bypass: 17,
      neutral: 52,
      unlabeled: 0,
    });
    assertEquals(titles(s), [
      ["high", "Edited track-star.yaml by hand 4 times across 3 turns"],
      ["medium", "Ran git directly 3 times though @swamp/git is installed"],
      [
        "medium",
        "Ran deno directly 4 times though @swamp/deno-runner is installed",
      ],
      ["medium", "Read pulled extension source 12 times"],
    ]);
    // The subagent is labelled by the same rules on its own record, which its
    // parent's counts do not include.
    const child = records.find((r) => r.parentSessionId === s.id)!;
    assertEquals(child.agentId, "ab074c6c38f1b6027");
    assertEquals(calls(child).length, 5);
    assertEquals(counts(child).unlabeled, 0);
    const start = calls(s).find((c) => c.subagentSessionId === child.id)!;
    assertEquals([start.label, start.category], ["neutral", "agent"]);
    for (const f of child.findings) {
      const ids = new Set(calls(child).map((c) => c.id));
      assert(
        f.callIds.every((id) => ids.has(id)),
        "a subagent finding names its own calls",
      );
    }
  },
);

gitTest(
  "real session gatorwalk: 7 / 8 / 14, a loop on openapi.yaml with 4 failures between, a 3-call streak",
  async () => {
    const [s] = await importCase({
      name: "gatorwalk",
      id: "3dc34d08-ebe6-484f-8034-e29c8785dcef",
      extensions: [],
    });
    assertEquals(calls(s).length, 29);
    assertEquals(counts(s), { swamp: 7, bypass: 8, neutral: 14, unlabeled: 0 });
    assertEquals(titles(s), [
      ["high", "Edited openapi.yaml by hand 5 times across 2 turns"],
      ["high", "3 failed calls within 3 minutes of each other (turn 2)"],
    ]);
    assert(
      s.findings[0].detail.endsWith(
        "4 calls failed between the first and last edit.",
      ),
    );
  },
);
