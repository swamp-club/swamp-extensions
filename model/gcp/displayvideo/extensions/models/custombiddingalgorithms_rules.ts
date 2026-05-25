// Auto-generated extension model for @swamp/gcp/displayvideo/custombiddingalgorithms-rules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 CustomBiddingAlgorithms.Rules.
 *
 * A single custom bidding algorithm rules.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.rules.get",
  "path":
    "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}/rules/{+customBiddingAlgorithmRulesId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customBiddingAlgorithmId",
    "customBiddingAlgorithmRulesId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "customBiddingAlgorithmId": {
      "location": "path",
      "required": true,
    },
    "customBiddingAlgorithmRulesId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.rules.create",
  "path": "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}/rules",
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
  "id": "displayvideo.customBiddingAlgorithms.rules.list",
  "path": "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}/rules",
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
    "Output only. The unique ID of the custom bidding algorithm that the rules resource belongs to.",
  ).optional(),
  error: z.object({
    errorCode: z.enum([
      "ERROR_CODE_UNSPECIFIED",
      "SYNTAX_ERROR",
      "CONSTRAINT_VIOLATION_ERROR",
      "INTERNAL_ERROR",
    ]).describe("The type of error.").optional(),
  }).describe("An error message for a CustomBiddingAlgorithmRules resource.")
    .optional(),
  rules: z.object({
    resourceName: z.string().describe(
      "A resource name to be used in media.download to download the rules files. Or media.upload to upload the rules files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/rulesRef/{ref_id}`.",
    ).optional(),
  }).describe(
    "The reference to the uploaded AlgorithmRules file. Retrieve the location to upload new AlgorithmRules file to using customBiddingAlgorithms.uploadRules.",
  ).optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent custom bidding algorithm.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this rules resource.",
  ).optional(),
});

const StateSchema = z.object({
  active: z.boolean().optional(),
  createTime: z.string().optional(),
  customBiddingAlgorithmId: z.string().optional(),
  customBiddingAlgorithmRulesId: z.string().optional(),
  error: z.object({
    errorCode: z.string(),
  }).optional(),
  name: z.string(),
  rules: z.object({
    resourceName: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  customBiddingAlgorithmId: z.string().describe(
    "Output only. The unique ID of the custom bidding algorithm that the rules resource belongs to.",
  ).optional(),
  error: z.object({
    errorCode: z.enum([
      "ERROR_CODE_UNSPECIFIED",
      "SYNTAX_ERROR",
      "CONSTRAINT_VIOLATION_ERROR",
      "INTERNAL_ERROR",
    ]).describe("The type of error.").optional(),
  }).describe("An error message for a CustomBiddingAlgorithmRules resource.")
    .optional(),
  rules: z.object({
    resourceName: z.string().describe(
      "A resource name to be used in media.download to download the rules files. Or media.upload to upload the rules files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/rulesRef/{ref_id}`.",
    ).optional(),
  }).describe(
    "The reference to the uploaded AlgorithmRules file. Retrieve the location to upload new AlgorithmRules file to using customBiddingAlgorithms.uploadRules.",
  ).optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent custom bidding algorithm.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this rules resource.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 CustomBiddingAlgorithms.Rules. Registered at `@swamp/gcp/displayvideo/custombiddingalgorithms-rules`. */
export const model = {
  type: "@swamp/gcp/displayvideo/custombiddingalgorithms-rules",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single custom bidding algorithm rules.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rules",
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
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        if (g["name"] !== undefined) {
          params["customBiddingAlgorithmRulesId"] = String(g["name"]);
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
      description: "Get a rules",
      arguments: z.object({
        identifier: z.string().describe("The name of the rules"),
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
        params["customBiddingAlgorithmRulesId"] = args.identifier;
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
      description: "Sync rules state from GCP",
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
          params["customBiddingAlgorithmRulesId"] = identifier;
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
    list: {
      description: "List rules resources",
      arguments: z.object({
        advertiserId: z.string().describe(
          "The ID of the advertiser that owns the parent custom bidding algorithm.",
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `createTime desc` (default) The default sorting order is descending. To specify ascending order for a field, the suffix "desc" should be removed. Example: `createTime`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
        ).optional(),
        partnerId: z.string().describe(
          "The ID of the partner that owns the parent custom bidding algorithm.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["customBiddingAlgorithmId"] !== undefined) {
          params["customBiddingAlgorithmId"] = String(
            g["customBiddingAlgorithmId"],
          );
        }
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["partnerId"] !== undefined) {
          params["partnerId"] = String(args["partnerId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "customBiddingRules",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
