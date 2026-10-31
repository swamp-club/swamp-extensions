import { z } from "npm:zod@4.6.7";
import {
  AGENT_SESSION_TYPE_TAG,
  AgentSessionRecordV2Schema,
} from "./_lib/contract/session_record.ts";
import { defaultProjectsDir, expandHome } from "./_lib/claude_code/discover.ts";
import {
  type ImportContext,
  ImportIndexSchema,
  importSessions,
} from "./_lib/importer.ts";
import { swampWhoami } from "./_lib/whoami.ts";

/**
 * Import coding-agent sessions (Claude Code transcripts) as agent session
 * records the dashboard's agent sessions page reads (swamp-club#4156), with
 * every call labelled and findings per session (swamp-club#4157).
 *
 * @module
 */

const VERSION = "2026.10.31.2";

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
      "Globs over removed worktrees, whose directories are gone. <repo> is a repo's directory name. A match counts only when the session ran on one of that repo's branches.",
    ),
  repos: z.array(z.string().min(1)).default([]).describe(
    "Other repos whose sessions to import too, as paths (~ and paths relative to this repo work). Their records land in this repo.",
  ),
  all: z.boolean().default(false).describe(
    "Import every session on this machine whose repo can be found. For internal or local testing only: it puts every project's commands and paths in this repo's data.",
  ),
  exclude: z.array(z.string().min(1)).default([]).describe(
    "Repos to leave out, as paths or remote URLs. Excluding one clone leaves out every clone of its remote. Excluding this repo is an error.",
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
  upgrades: [
    {
      toVersion: "2026.10.31.1",
      description:
        "Import sessions by repo identity: repos, all and exclude arguments, a repo tag (no global arguments to change)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.31.2",
      description:
        "Label every call swamp, bypass or neutral and write findings; every session is imported again once (no arguments to change)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

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
        "Import this repo's Claude Code sessions, its worktrees' and their subagents' as agent session records, and those of other repos named in repos, or every repo with all. Must run on the machine that holds the transcripts.",
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
        const { dataHandles } = await importSessions(ctx, {
          repoDir: ctx.repoDir,
          projectsDir,
          repos: args.repos,
          all: args.all,
          exclude: args.exclude,
          worktreeGlobs: args.worktreeGlobs.map((g) => expandHome(g, home)),
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
