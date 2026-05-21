// Auto-generated extension model for @swamp/gcp/games/scores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Games Services Scores.
 *
 * A list of player leaderboard scores.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://games.googleapis.com/";

const GET_CONFIG = {
  "id": "games.scores.get",
  "path":
    "games/v1/players/{playerId}/leaderboards/{leaderboardId}/scores/{timeSpan}",
  "httpMethod": "GET",
  "parameterOrder": [
    "playerId",
    "leaderboardId",
    "timeSpan",
  ],
  "parameters": {
    "includeRankType": {
      "location": "query",
    },
    "language": {
      "location": "query",
    },
    "leaderboardId": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "playerId": {
      "location": "path",
      "required": true,
    },
    "timeSpan": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  items: z.array(z.object({
    friendsRank: z.object({
      formattedNumScores: z.string(),
      formattedRank: z.string(),
      kind: z.string(),
      numScores: z.string(),
      rank: z.string(),
    }),
    kind: z.string(),
    leaderboard_id: z.string(),
    publicRank: z.object({
      formattedNumScores: z.string(),
      formattedRank: z.string(),
      kind: z.string(),
      numScores: z.string(),
      rank: z.string(),
    }),
    scoreString: z.string(),
    scoreTag: z.string(),
    scoreValue: z.string(),
    socialRank: z.object({
      formattedNumScores: z.string(),
      formattedRank: z.string(),
      kind: z.string(),
      numScores: z.string(),
      rank: z.string(),
    }),
    timeSpan: z.string(),
    writeTimestamp: z.string(),
  })).optional(),
  kind: z.string().optional(),
  nextPageToken: z.string().optional(),
  player: z.object({
    avatarImageUrl: z.string(),
    bannerUrlLandscape: z.string(),
    bannerUrlPortrait: z.string(),
    displayName: z.string(),
    experienceInfo: z.object({
      currentExperiencePoints: z.string(),
      currentLevel: z.object({
        kind: z.string(),
        level: z.number(),
        maxExperiencePoints: z.string(),
        minExperiencePoints: z.string(),
      }),
      kind: z.string(),
      lastLevelUpTimestampMillis: z.string(),
      nextLevel: z.object({
        kind: z.string(),
        level: z.number(),
        maxExperiencePoints: z.string(),
        minExperiencePoints: z.string(),
      }),
    }),
    friendStatus: z.string(),
    gamePlayerId: z.string(),
    kind: z.string(),
    name: z.object({
      familyName: z.string(),
      givenName: z.string(),
    }),
    originalPlayerId: z.string(),
    playerId: z.string(),
    profileSettings: z.object({
      friendsListVisibility: z.string(),
      kind: z.string(),
      profileVisible: z.boolean(),
    }),
    title: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Games Services Scores. Registered at `@swamp/gcp/games/scores`. */
export const model = {
  type: "@swamp/gcp/games/scores",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A list of player leaderboard scores.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a scores",
      arguments: z.object({
        identifier: z.string().describe("The name of the scores"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["playerId"] !== undefined) {
          params["playerId"] = String(g["playerId"]);
        }
        if (g["leaderboardId"] !== undefined) {
          params["leaderboardId"] = String(g["leaderboardId"]);
        }
        params["timeSpan"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync scores state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["playerId"] !== undefined) {
            params["playerId"] = String(g["playerId"]);
          } else if (existing["playerId"]) {
            params["playerId"] = String(existing["playerId"]);
          }
          if (g["leaderboardId"] !== undefined) {
            params["leaderboardId"] = String(g["leaderboardId"]);
          } else if (existing["leaderboardId"]) {
            params["leaderboardId"] = String(existing["leaderboardId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["timeSpan"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    list_window: {
      description: "list window",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["leaderboardId"] = existing["leaderboardId"]?.toString() ??
          g["leaderboardId"]?.toString() ?? "";
        params["collection"] = existing["collection"]?.toString() ??
          g["collection"]?.toString() ?? "";
        params["timeSpan"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "games.scores.listWindow",
            "path": "games/v1/leaderboards/{leaderboardId}/window/{collection}",
            "httpMethod": "GET",
            "parameterOrder": ["leaderboardId", "collection", "timeSpan"],
            "parameters": {
              "collection": { "location": "path", "required": true },
              "language": { "location": "query" },
              "leaderboardId": { "location": "path", "required": true },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
              "resultsAbove": { "location": "query" },
              "returnTopIfAbsent": { "location": "query" },
              "timeSpan": { "location": "query", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    submit: {
      description: "submit",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["leaderboardId"] = existing["leaderboardId"]?.toString() ??
          g["leaderboardId"]?.toString() ?? "";
        params["score"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "games.scores.submit",
            "path": "games/v1/leaderboards/{leaderboardId}/scores",
            "httpMethod": "POST",
            "parameterOrder": ["leaderboardId", "score"],
            "parameters": {
              "language": { "location": "query" },
              "leaderboardId": { "location": "path", "required": true },
              "score": { "location": "query", "required": true },
              "scoreTag": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    submit_multiple: {
      description: "submit multiple",
      arguments: z.object({
        kind: z.any().optional(),
        scores: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["scores"] !== undefined) body["scores"] = args["scores"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "games.scores.submitMultiple",
            "path": "games/v1/leaderboards/scores",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": { "language": { "location": "query" } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
