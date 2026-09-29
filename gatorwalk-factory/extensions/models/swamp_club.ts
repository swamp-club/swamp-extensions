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
import { digestOf } from "./_lib/canonical.ts";
import {
  type CredentialSources,
  DEFAULT_SOURCES,
  LAB_STATUSES,
  type LabCredentials,
  resolveLabCredentials,
  sameServer,
  SWAMP_CLUB,
  swampClubAdapter,
} from "./_lib/swamp_club.ts";
import { TrackerError } from "./_lib/tracker.ts";
import {
  type TrackerContext,
  trackerMethods,
  trackerResources,
} from "./_lib/tracker_methods.ts";
import { type MethodOutput, stringMapFrom } from "./_lib/work_item_ops.ts";

// ---------------------------------------------------------------------------
// The swamp-club Lab adapter: one instance per swamp-club server. Its key
// comes from the apiKey global argument (a vault expression, if you like),
// then SWAMP_API_KEY, then swamp's stored login, as issue-lifecycle's does.
// Beyond the tracker contract it assigns an issue and posts a verification
// attestation built elsewhere. It is the only gatorwalk code that talks to
// swamp-club; see DESIGN.md, "Trackers".
// ---------------------------------------------------------------------------

export const SwampClubArgumentsSchema = z.object({
  apiKey: z.string().min(1).meta({ sensitive: true }).describe(
    "A swamp-club API key. Optional: without it, SWAMP_API_KEY and then " +
      "swamp's stored login (swamp auth login) are used. To set it, wire it " +
      "from a vault: ${{ vault.get(<vault>, <key>) }}. Status moves past " +
      "open or closed, assignment and attestations need an admin key.",
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
 * The adapter's methods: the shared fetch_issue, claim, comment and
 * set_status, plus assign and post_attestation. Tests pass their own
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

  return {
    ...trackerMethods({
      tracker: SWAMP_CLUB,
      adapter: adapterOf,
      statuses: (globalArgs) => labStatuses(argumentsOf(globalArgs).statuses),
      now,
    }),
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
        const result = await adapterOf(argsOf(ctx), credentials).assign(
          args.issue,
          username,
        );
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
  version: "2026.09.29.1",
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
