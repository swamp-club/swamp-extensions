import { z } from "npm:zod@4.6.7";
import {
  AGENT_SESSION_TYPE_TAG,
  AgentSessionRecordV2Schema,
} from "./_lib/contract/session_record.ts";
import {
  defaultProjectsDir,
  expandGlob,
  gitBranches,
  gitWorktrees,
} from "./_lib/claude_code/discover.ts";
import {
  type ImportContext,
  ImportIndexSchema,
  importSessions,
} from "./_lib/importer.ts";
import { swampWhoami } from "./_lib/whoami.ts";

/**
 * Import coding-agent sessions (Claude Code transcripts) as agent session
 * records the dashboard's agent sessions page reads (swamp-club#4156).
 *
 * @module
 */

const VERSION = "2026.10.30.1";

/** Arguments of the import method. */
export const ImportArgsSchema = z.object({
  since: z.iso.date().or(z.iso.datetime()).optional().describe(
    "Only import sessions whose transcript or any subagent changed on or after this date: YYYY-MM-DD (local midnight) or an ISO 8601 time. A session started earlier but active since is imported.",
  ),
  projectsDir: z.string().min(1).optional().describe(
    "Claude Code's transcript root. Defaults to CLAUDE_CONFIG_DIR/projects, else ~/.claude/projects.",
  ),
  worktreeGlobs: z.array(z.string().min(1)).default(["~/.cue/work/*/<repo>"])
    .describe(
      "Globs over working directories that are also this repo, for worktrees git no longer lists. <repo> is the repo directory's name. A match counts only when the session ran on one of this repo's branches.",
    ),
});

type ImportArgs = z.infer<typeof ImportArgsSchema>;

/**
 * Reads `since`: a date alone is local midnight, as a person means "since
 * Monday"; a full ISO 8601 time is taken as written.
 */
export function sinceDate(since: string): Date {
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(since);
  return day
    ? new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3]))
    : new Date(since);
}

interface MethodContext extends ImportContext {
  readonly repoDir: string;
}

/** Agent sessions model: imports coding-agent sessions as repo data. */
export const model = {
  type: "@swamp/agent-sessions",
  version: VERSION,

  resources: {
    session: {
      description:
        "One coding-agent session or subagent: its turns and tool calls, never its prompts or replies (agent session record v2)",
      schema: AgentSessionRecordV2Schema,
      lifetime: "infinite" as const,
      garbageCollection: 1,
      tags: { type: AGENT_SESSION_TYPE_TAG },
    },
    importIndex: {
      description:
        "Size and mtime of each imported transcript, so unchanged sessions are skipped",
      schema: ImportIndexSchema,
      lifetime: "infinite" as const,
      garbageCollection: 1,
    },
  },

  methods: {
    import: {
      description:
        "Import this repo's Claude Code sessions, their worktrees' and their subagents' as agent session records. Must run on the machine that holds the transcripts.",
      arguments: ImportArgsSchema,
      execute: async (args: ImportArgs, ctx: MethodContext) => {
        const home = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE");
        const projectsDir = args.projectsDir ??
          defaultProjectsDir(Deno.env, home);
        if (!projectsDir) {
          throw new Error(
            "Cannot find Claude Code's transcripts: no HOME or CLAUDE_CONFIG_DIR. Pass projectsDir.",
          );
        }
        const repoPaths = [ctx.repoDir, ...await gitWorktrees(ctx.repoDir)];
        const repoBranches = await gitBranches(ctx.repoDir);
        const { dataHandles } = await importSessions(ctx, {
          repoDir: ctx.repoDir,
          projectsDir,
          repoPaths,
          worktreeGlobs: args.worktreeGlobs.map((g) =>
            expandGlob(g, home, ctx.repoDir)
          ),
          repoBranches,
          ...(args.since ? { since: sinceDate(args.since) } : {}),
          ...(home ? { home } : {}),
          importerVersion: VERSION,
          whoami: () => swampWhoami(),
        });
        return { dataHandles };
      },
    },
  },
};
