// Auto-generated extension model for @swamp/gcp/displayvideo/custombiddingalgorithms-scripts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 CustomBiddingAlgorithms.Scripts.
 *
 * A single custom bidding script.
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

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.scripts.get",
  "path":
    "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}/scripts/{+customBiddingScriptId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customBiddingAlgorithmId",
    "customBiddingScriptId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "customBiddingAlgorithmId": {
      "location": "path",
      "required": true,
    },
    "customBiddingScriptId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.scripts.create",
  "path": "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}/scripts",
  "httpMethod": "POST",
  "parameterOrder": [
    "customBiddingAlgorithmId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "customBiddingAlgorithmId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.scripts.list",
  "path": "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}/scripts",
  "httpMethod": "GET",
  "parameterOrder": [
    "customBiddingAlgorithmId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "customBiddingAlgorithmId": {
      "location": "path",
      "required": true,
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  customBiddingAlgorithmId: z.string().describe(
    "Output only. The unique ID of the custom bidding algorithm the script belongs to.",
  ).optional(),
  script: z.object({
    resourceName: z.string().describe(
      "A resource name to be used in media.download to Download the script files. Or media.upload to Upload the script files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/scriptRef/{ref_id}`.",
    ).optional(),
  }).describe("The reference to the uploaded custom bidding script file.")
    .optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent custom bidding algorithm.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script.",
  ).optional(),
});

const StateSchema = z.object({
  active: z.boolean().optional(),
  createTime: z.string().optional(),
  customBiddingAlgorithmId: z.string().optional(),
  customBiddingScriptId: z.string().optional(),
  errors: z.array(z.object({
    column: z.string(),
    errorCode: z.string(),
    errorMessage: z.string(),
    line: z.string(),
  })).optional(),
  name: z.string(),
  script: z.object({
    resourceName: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  customBiddingAlgorithmId: z.string().describe(
    "Output only. The unique ID of the custom bidding algorithm the script belongs to.",
  ).optional(),
  script: z.object({
    resourceName: z.string().describe(
      "A resource name to be used in media.download to Download the script files. Or media.upload to Upload the script files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/scriptRef/{ref_id}`.",
    ).optional(),
  }).describe("The reference to the uploaded custom bidding script file.")
    .optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent custom bidding algorithm.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 CustomBiddingAlgorithms.Scripts. Registered at `@swamp/gcp/displayvideo/custombiddingalgorithms-scripts`. */
export const model = {
  type: "@swamp/gcp/displayvideo/custombiddingalgorithms-scripts",
  version: "2026.05.21.2",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single custom bidding script.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a scripts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["customBiddingAlgorithmId"] !== undefined) {
          params["customBiddingAlgorithmId"] = String(
            g["customBiddingAlgorithmId"],
          );
        }
        const body: Record<string, unknown> = {};
        if (g["script"] !== undefined) body["script"] = g["script"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        if (g["name"] !== undefined) {
          params["customBiddingScriptId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "customBiddingAlgorithmId": String(
                g["customBiddingAlgorithmId"] ?? "",
              ),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a scripts",
      arguments: z.object({
        identifier: z.string().describe("The name of the scripts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["customBiddingAlgorithmId"] !== undefined) {
          params["customBiddingAlgorithmId"] = String(
            g["customBiddingAlgorithmId"],
          );
        }
        params["customBiddingScriptId"] = args.identifier;
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
      description: "Sync scripts state from GCP",
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
          if (g["customBiddingAlgorithmId"] !== undefined) {
            params["customBiddingAlgorithmId"] = String(
              g["customBiddingAlgorithmId"],
            );
          } else if (existing["customBiddingAlgorithmId"]) {
            params["customBiddingAlgorithmId"] = String(
              existing["customBiddingAlgorithmId"],
            );
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["customBiddingScriptId"] = identifier;
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
  },
};
