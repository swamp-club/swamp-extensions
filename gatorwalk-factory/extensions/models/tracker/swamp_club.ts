// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.3.6";
import {
  digestOf,
  type MethodOutput,
  stringMapFrom,
  typeNameOf,
} from "../_lib/engine/tracker.ts";
import {
  type CredentialSources,
  DEFAULT_SOURCES,
  LAB_STATUSES,
  LAB_TYPES,
  type LabCredentials,
  resolveLabCredentials,
  sameServer,
  SWAMP_CLUB,
  swampClubAdapter,
} from "../_lib/tracker/backends/swamp_club.ts";
import {
  TrackerError,
  type TrackerIssue,
} from "../_lib/tracker/core/adapter.ts";
import {
  deliveries,
  DeliveryInputs,
  deliveryKeyOf,
  type TrackerContext,
  trackerMethods,
  type TrackerModelOptions,
  trackerResources,
} from "../_lib/tracker/core/tracker_methods.ts";

// ---------------------------------------------------------------------------
// The swamp-club Lab adapter: one instance per swamp-club server. Its key
// comes from the apiKey global argument (a vault expression, if you like),
// then SWAMP_API_KEY, then swamp's stored login, as issue-lifecycle's does.
// Beyond the tracker contract it assigns an issue, posts a verification
// attestation built elsewhere, sets an issue's type, checks whether an
// issue's author is on the team and thanks one who is not. Its lifecycle
// entries are written by publish. It is the only gatorwalk code that talks to
// swamp-club; see DESIGN.md, "Trackers".
// ---------------------------------------------------------------------------

export const SwampClubArgumentsSchema = z.object({
  apiKey: z.string().min(1).meta({ sensitive: true }).describe(
    "A swamp-club API key. Optional: without it, SWAMP_API_KEY and then " +
      "swamp's stored login (swamp auth login) are used. To set it, wire it " +
      "from a vault: ${{ vault.get(<vault>, <key>) }}. Status moves past " +
      "open or closed, assignment, attestations, lifecycle entries, the " +
      "issue type and the team check need an admin key.",
  ).optional(),
  url: z.string().url().optional().describe(
    "The swamp-club server; defaults to SWAMP_CLUB_URL, then the stored " +
      "login's server, then https://swamp-club.com",
  ),
  statuses: z.union([z.record(z.string(), z.string()), z.string()]).optional()
    .describe(
      "Status keys to Lab statuses (open, triaged, in_progress, shipped, " +
        "closed): an object, or a JSON object as a string. Defaults to each " +
        "Lab status mapped to itself",
    ),
});

function argumentsOf(globalArgs: Record<string, unknown>) {
  // swamp validates globalArguments with .partial(), so check here too.
  return SwampClubArgumentsSchema.partial().parse(globalArgs);
}

/** The status map: given, or each Lab status as its own key. */
export function labStatuses(
  input: Record<string, string> | string | undefined,
): Record<string, string> {
  if (input === undefined) {
    return Object.fromEntries(LAB_STATUSES.map((s) => [s, s]));
  }
  const map = stringMapFrom("statuses", input);
  const bad = Object.entries(map).filter(([, v]) =>
    !(LAB_STATUSES as readonly string[]).includes(v)
  );
  if (bad.length > 0) {
    throw new TrackerError(
      "invalid",
      SWAMP_CLUB,
      `statuses maps to names that are not Lab statuses: ${
        bad.map(([k, v]) => `${k}: ${v}`).join(", ")
      } (they are: ${LAB_STATUSES.join(", ")})`,
    );
  }
  return map;
}

export const ATTESTATION_SPEC = "attestation";

export const AttestationRecordSchema = z.object({
  commit: z.string(),
  /** A digest of the attestation as posted. */
  digest: z.string(),
  id: z.string(),
  postedBy: z.string(),
  postedAt: z.string(),
  at: z.string(),
});

const COMMIT = /^[0-9a-f]{40}$/;

const assignArguments = z.object({
  issue: z.string().min(1).describe("The issue's stable id, its number"),
  username: z.string().min(1).optional().describe(
    "The swamp-club user to assign; defaults to the user of swamp's stored " +
      "login when the server is that login's own",
  ),
});

const postAttestationArguments = z.object({
  attestation: z.union([z.record(z.string(), z.unknown()), z.string()])
    .describe(
      "The attestation, built outside the adapter (deno task " +
        "build-attestation): a JSON object, or its JSON text",
    ),
});

const setTypeArguments = z.object({
  issue: z.string().min(1).describe("The issue's stable id, its number"),
  type: z.enum(LAB_TYPES).describe("The Lab issue type"),
  ...DeliveryInputs,
});

const teamMemberArguments = z.object({
  issue: z.string().min(1).describe("The issue's stable id, its number"),
});

const thankAuthorArguments = z.object({
  issue: z.string().min(1).describe("The issue's stable id, its number"),
  message: z.string().min(1).optional().describe(
    "The ripple to post; defaults to issue-lifecycle's thank-you",
  ),
  summary: z.string().min(1).optional().describe(
    "What shipped, for the default thank-you (the plan's summary)",
  ),
  prUrl: z.string().url().optional().describe(
    "The merged pull request, for the default thank-you",
  ),
  force: z.boolean().optional().describe(
    "Thank the author without the team check, as issue-lifecycle's force",
  ),
  ...DeliveryInputs,
});

export const ISSUE_LIFECYCLE_TYPE = "@swamp/issue-lifecycle";

/**
 * Refuse to claim an issue that @swamp/issue-lifecycle drives in this
 * repository: an instance issue-<N>, found by its definition (including the
 * one direct type execution writes) or, failing that, by its state data.
 * Two drivers would both write the issue's status and history. Read-only.
 */
export async function refuseIssueLifecycle(
  ctx: TrackerContext,
  issue: TrackerIssue,
): Promise<void> {
  const name = `issue-${issue.id}`;
  if (
    ctx.definitionRepository === undefined && ctx.readModelData === undefined
  ) {
    // Fail-closed: a claim that cannot check is refused, not waved through.
    throw new Error(
      `cannot check whether issue-lifecycle drives ${issue.display}: this ` +
        "method context reads no definitions or model data",
    );
  }
  const found = await ctx.definitionRepository?.findByNameGlobal(name) ??
    null;
  const driven = found !== null
    ? typeNameOf(found.type) === ISSUE_LIFECYCLE_TYPE
    : (await ctx.readModelData?.(name, "state") ?? []).length > 0;
  if (!driven) return;
  throw new Error(
    `${issue.display} is driven by issue-lifecycle here (instance '${name}'); ` +
      "gatorwalk will not claim it too, even once that instance is done, " +
      "since both would write the issue's status and history. Migrating " +
      "between drivers is not supported; to hand the issue to gatorwalk, " +
      `delete the '${name}' instance first`,
  );
}

/** issue-lifecycle's thank-you, word for word (its buildNotifyMessage). */
export function thankYou(
  author: string,
  summary?: string,
  prUrl?: string,
): string {
  const merged = prUrl === undefined ? "merged" : `[merged](${prUrl})`;
  const shipped = summary === undefined ? "" : ` We shipped: ${summary}.`;
  return `Thanks @${author} for reporting this!${shipped} ` +
    `The fix has been ${merged} and a release is on its way. ` +
    `We appreciate your contribution to swamp.`;
}

export interface SwampClubMethodOptions {
  /** Where credentials and the default username come from. */
  sources?: CredentialSources;
  now?: () => Date;
}

function parseAttestation(
  input: Record<string, unknown> | string,
): { body: Record<string, unknown>; commit: string } {
  let body: unknown = input;
  if (typeof input === "string") {
    try {
      body = JSON.parse(input);
    } catch (error) {
      throw new TrackerError(
        "invalid",
        SWAMP_CLUB,
        `the attestation is not valid JSON: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new TrackerError(
      "invalid",
      SWAMP_CLUB,
      "the attestation must be a JSON object",
    );
  }
  const commit = (body as { subject?: { commit?: unknown } }).subject?.commit;
  if (typeof commit !== "string" || !COMMIT.test(commit)) {
    throw new TrackerError(
      "invalid",
      SWAMP_CLUB,
      "the attestation's subject.commit must be a full 40-character " +
        "lowercase hex SHA",
    );
  }
  return { body: body as Record<string, unknown>, commit };
}

/**
 * The adapter's methods: the shared create, fetch_issue, claim, comment,
 * set_status and publish, plus assign and post_attestation. Tests pass their own
 * credential sources.
 */
export function swampClubMethods(options: SwampClubMethodOptions = {}) {
  const sources = options.sources ?? DEFAULT_SOURCES;
  const now = options.now ?? (() => new Date());
  const adapterOf = (
    globalArgs: Record<string, unknown>,
    credentials?: () => Promise<LabCredentials>,
  ) => {
    const args = argumentsOf(globalArgs);
    return swampClubAdapter({
      credentials: credentials ?? (() => resolveLabCredentials(args, sources)),
    });
  };
  const argsOf = (ctx: TrackerContext) => ctx.globalArgs ?? {};
  const trackerOptions: TrackerModelOptions = {
    tracker: SWAMP_CLUB,
    adapter: (ctx) => adapterOf(argsOf(ctx)),
    statuses: (globalArgs) => labStatuses(argumentsOf(globalArgs).statuses),
    beforeClaim: refuseIssueLifecycle,
    now,
  };
  const deliver = deliveries(trackerOptions, now);

  return {
    ...trackerMethods(trackerOptions),
    set_type: {
      description:
        "Set a Lab issue's type (publish is the single writer of a work item's type); already that type writes nothing",
      arguments: setTypeArguments,
      execute: async (
        args: z.infer<typeof setTypeArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const { handles } = await deliver.setType(ctx, {
          issue: args.issue,
          type: args.type,
          key: deliveryKeyOf(args),
          replay: false,
        });
        return { dataHandles: handles };
      },
    },
    team_member: {
      description:
        "Report whether a Lab issue's author is on swamp-club's team; fails rather than guess when a lookup fails",
      arguments: teamMemberArguments,
      execute: async (
        args: z.infer<typeof teamMemberArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const found = await adapterOf(argsOf(ctx)).teamMembership(args.issue);
        ctx.logger.info("{summary}", {
          summary: `#${args.issue}'s author @${found.author} is ` +
            (found.member ? "on" : "not on") + " swamp-club's team",
          ...found,
        });
        return { dataHandles: [] };
      },
    },
    thank_author: {
      description:
        "Thank a Lab issue's author with a ripple unless they are on swamp-club's team, as issue-lifecycle's notify does; a failed lookup posts nothing",
      arguments: thankAuthorArguments,
      execute: async (
        args: z.infer<typeof thankAuthorArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = adapterOf(argsOf(ctx));
        // Fail-closed: the author and the roster come from one fresh read,
        // and a lookup that fails throws before anything is posted.
        let author: string;
        let member = false;
        if (args.force === true) {
          const issue = await adapter.fetchIssue(args.issue);
          author = String(issue.details?.author ?? "");
          if (author === "") {
            throw new TrackerError(
              "upstream",
              SWAMP_CLUB,
              `#${args.issue} has no author to thank`,
            );
          }
        } else {
          ({ author, member } = await adapter.teamMembership(args.issue));
        }
        if (member) {
          ctx.logger.info("{summary}", {
            summary: `skipped thanks: @${author} is a swamp-club team member`,
            action: "skipped",
            author,
            reason: "team_member",
          });
          return { dataHandles: [] };
        }
        const body = args.message ?? thankYou(author, args.summary, args.prUrl);
        // Idempotent with or without a delivery key: the same thank-you
        // already on the issue (a re-run after a later failure) is not
        // posted again.
        const ripples = (await adapter.fetchIssue(args.issue)).details
          ?.comments;
        const posted = Array.isArray(ripples) &&
          ripples.some((r) => (r as { body?: unknown })?.body === body.trim());
        if (posted) {
          ctx.logger.info("{summary}", {
            summary: `@${author} was already thanked on #${args.issue}; ` +
              "posted nothing",
            action: "posted",
            author,
            reason: "already_thanked",
          });
          return { dataHandles: [] };
        }
        const { handles, wrote } = await deliver.comment(ctx, {
          issue: args.issue,
          body,
          key: deliveryKeyOf(args),
          replay: false,
        });
        ctx.logger.info("{summary}", {
          summary: wrote
            ? `thanked @${author}`
            : `@${author} was already thanked under this delivery key`,
          action: "posted",
          author,
          reason: args.force === true ? "forced" : "not_team_member",
        });
        return { dataHandles: handles };
      },
    },
    assign: {
      description:
        "Add a user to a Lab issue's assignees, keeping those already there that are still on the team; already assigned writes nothing",
      arguments: assignArguments,
      execute: async (
        args: z.infer<typeof assignArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        // Resolved once, here and for the adapter, so the default username
        // is checked against the server the write really goes to. Lazily, so
        // a failure is only raised where it is awaited.
        let resolved: Promise<LabCredentials> | undefined;
        const credentials = () =>
          resolved ??= resolveLabCredentials(argumentsOf(argsOf(ctx)), sources);
        let username = args.username;
        if (username === undefined) {
          const { url } = await credentials();
          const login = await sources.readAuthFile();
          if (login?.username === undefined) {
            throw new TrackerError(
              "invalid",
              SWAMP_CLUB,
              "no username: pass username, or run `swamp auth login` so the " +
                "stored login names you",
            );
          }
          // A user of one server is not a user of another.
          if (!sameServer(url, login.serverUrl)) {
            throw new TrackerError(
              "invalid",
              SWAMP_CLUB,
              `no username: the stored login is for ${login.serverUrl}, not ` +
                `${url}; pass username`,
            );
          }
          username = login.username;
        }
        const adapter = adapterOf(argsOf(ctx), credentials);
        const result = await adapter.assign(args.issue, username);
        if (result.changed) {
          // issue-lifecycle's assigned entry, best effort as there, labelled
          // with the status the issue is in (issue-lifecycle assigns only at
          // start, so it always says open).
          try {
            await adapter.capabilities.history.postEntry(args.issue, {
              step: "assigned",
              targetStatus: (LAB_STATUSES as readonly string[]).includes(
                  result.status,
                )
                ? result.status
                : "open",
              summary: `Assigned to ${username}`,
              emoji: "\u{1F464}",
              payload: { username, userId: result.userId },
              isVerbose: false,
            });
          } catch (error) {
            ctx.logger.info("{warning}", {
              warning: `assigned #${args.issue}, but its assigned entry ` +
                `was not recorded: ${
                  error instanceof Error ? error.message : String(error)
                }`,
            });
          }
        }
        const done = result.changed
          ? `assigned #${args.issue} to ${username}`
          : `#${args.issue} is already assigned to ${username}; wrote nothing`;
        const dropped = result.dropped.map((a) => a.username ?? a.userId);
        ctx.logger.info("{summary}", {
          summary: dropped.length === 0
            ? done
            : `${done}; dropped ${
              dropped.join(", ")
            }, no longer on swamp-club's team`,
        });
        return { dataHandles: [] };
      },
    },
    post_attestation: {
      description:
        "Post a verification attestation built elsewhere; the same attestation for the same commit again posts nothing",
      arguments: postAttestationArguments,
      execute: async (
        args: z.infer<typeof postAttestationArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        if (ctx.writeResource === undefined || ctx.readResource === undefined) {
          throw new Error(
            "this method context has no writeResource/readResource",
          );
        }
        const { body, commit } = parseAttestation(args.attestation);
        const digest = await digestOf(body);
        const name = `attestation-${commit}`;
        // swamp-club stores every POST, so skip only an exact repeat. A
        // rebuilt attestation differs (its timing at least) and is posted:
        // CI reads the latest for a commit.
        const raw = await ctx.readResource(name);
        const prior = raw === null ? null : AttestationRecordSchema.parse(raw);
        if (prior !== null && prior.digest === digest) {
          ctx.logger.info("{summary}", {
            summary: `already posted for ${commit}; posted nothing`,
            id: prior.id,
          });
          return { dataHandles: [] };
        }
        const posted = await adapterOf(argsOf(ctx)).postAttestation(body);
        const handle = await ctx.writeResource(ATTESTATION_SPEC, name, {
          commit,
          digest,
          ...posted,
          at: now().toISOString(),
        });
        ctx.logger.info("{summary}", {
          summary: `posted the attestation for ${commit}`,
          id: posted.id,
        });
        return { dataHandles: [handle] };
      },
    },
  };
}

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. swamp_club_test checks it equals SWAMP_CLUB_TYPE.
  type: "@swamp/gatorwalk-factory/swamp-club",
  version: "2026.09.30.2",
  globalArguments: SwampClubArgumentsSchema,
  resources: {
    ...trackerResources,
    [ATTESTATION_SPEC]: {
      description:
        "What swamp-club returned for each attestation posted, by commit",
      schema: AttestationRecordSchema,
      lifetime: "infinite" as const,
      garbageCollection: "1y",
    },
  },
  methods: swampClubMethods(),
};
