// Auto-generated extension model for @swamp/gcp/displayvideo/custombiddingalgorithms
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 CustomBiddingAlgorithms.
 *
 * A single custom bidding algorithm.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.get",
  "path": "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}",
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
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.create",
  "path": "v4/customBiddingAlgorithms",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.patch",
  "path": "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "customBiddingAlgorithmId",
  ],
  "parameters": {
    "customBiddingAlgorithmId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.customBiddingAlgorithms.list",
  "path": "v4/customBiddingAlgorithms",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "filter": {
      "location": "query",
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
  advertiserId: z.string().describe(
    "Immutable. The unique ID of the advertiser that owns the custom bidding algorithm.",
  ).optional(),
  customBiddingAlgorithmType: z.enum([
    "CUSTOM_BIDDING_ALGORITHM_TYPE_UNSPECIFIED",
    "SCRIPT_BASED",
    "RULE_BASED",
  ]).describe("Required. Immutable. The type of custom bidding algorithm.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the custom bidding algorithm. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Controls whether or not the custom bidding algorithm can be used as a bidding strategy. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED`",
  ).optional(),
  partnerId: z.string().describe(
    "Immutable. The unique ID of the partner that owns the custom bidding algorithm.",
  ).optional(),
  sharedAdvertiserIds: z.array(z.string()).describe(
    "The IDs of the advertisers who have access to this algorithm. If advertiser_id is set, this field will only consist of that value. This field will not be set if the algorithm [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner) is a partner and is being retrieved using an advertiser [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor).",
  ).optional(),
  thirdPartyOptimizationPartner: z.enum(["UNKNOWN", "SCIBIDS", "ADELAIDE"])
    .describe(
      "Optional. Immutable. Designates the third party optimization partner that manages this algorithm.",
    ).optional(),
});

const StateSchema = z.object({
  advertiserId: z.string().optional(),
  customBiddingAlgorithmId: z.string().optional(),
  customBiddingAlgorithmType: z.string().optional(),
  displayName: z.string().optional(),
  entityStatus: z.string().optional(),
  modelDetails: z.array(z.object({
    advertiserId: z.string(),
    readinessState: z.string(),
    suspensionState: z.string(),
  })).optional(),
  name: z.string(),
  partnerId: z.string().optional(),
  sharedAdvertiserIds: z.array(z.string()).optional(),
  thirdPartyOptimizationPartner: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  advertiserId: z.string().describe(
    "Immutable. The unique ID of the advertiser that owns the custom bidding algorithm.",
  ).optional(),
  customBiddingAlgorithmType: z.enum([
    "CUSTOM_BIDDING_ALGORITHM_TYPE_UNSPECIFIED",
    "SCRIPT_BASED",
    "RULE_BASED",
  ]).describe("Required. Immutable. The type of custom bidding algorithm.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the custom bidding algorithm. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Controls whether or not the custom bidding algorithm can be used as a bidding strategy. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED`",
  ).optional(),
  partnerId: z.string().describe(
    "Immutable. The unique ID of the partner that owns the custom bidding algorithm.",
  ).optional(),
  sharedAdvertiserIds: z.array(z.string()).describe(
    "The IDs of the advertisers who have access to this algorithm. If advertiser_id is set, this field will only consist of that value. This field will not be set if the algorithm [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner) is a partner and is being retrieved using an advertiser [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor).",
  ).optional(),
  thirdPartyOptimizationPartner: z.enum(["UNKNOWN", "SCIBIDS", "ADELAIDE"])
    .describe(
      "Optional. Immutable. Designates the third party optimization partner that manages this algorithm.",
    ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 CustomBiddingAlgorithms. Registered at `@swamp/gcp/displayvideo/custombiddingalgorithms`. */
export const model = {
  type: "@swamp/gcp/displayvideo/custombiddingalgorithms",
  version: "2026.05.25.2",
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
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single custom bidding algorithm.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customBiddingAlgorithms",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["customBiddingAlgorithmType"] !== undefined) {
          body["customBiddingAlgorithmType"] = g["customBiddingAlgorithmType"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        if (g["sharedAdvertiserIds"] !== undefined) {
          body["sharedAdvertiserIds"] = g["sharedAdvertiserIds"];
        }
        if (g["thirdPartyOptimizationPartner"] !== undefined) {
          body["thirdPartyOptimizationPartner"] =
            g["thirdPartyOptimizationPartner"];
        }
        if (g["name"] !== undefined) {
          params["customBiddingAlgorithmId"] = String(g["name"]);
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
            listParams: {},
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a customBiddingAlgorithms",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the customBiddingAlgorithms",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["customBiddingAlgorithmId"] = args.identifier;
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
    update: {
      description: "Update customBiddingAlgorithms attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["customBiddingAlgorithmId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["sharedAdvertiserIds"] !== undefined) {
          body["sharedAdvertiserIds"] = g["sharedAdvertiserIds"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync customBiddingAlgorithms state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["customBiddingAlgorithmId"] = identifier;
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
      description: "List customBiddingAlgorithms resources",
      arguments: z.object({
        advertiserId: z.string().describe(
          "The ID of the DV360 advertiser that has access to the custom bidding algorithm.",
        ).optional(),
        filter: z.string().describe(
          'Allows filtering by custom bidding algorithm fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `customBiddingAlgorithmType` field must use the `EQUALS (=)` operator. * The `displayName` field must use the `HAS (:)` operator. Supported fields: * `customBiddingAlgorithmType` * `displayName` Examples: * All custom bidding algorithms for which the display name contains "politics": `displayName:"politics"`. * All custom bidding algorithms for which the type is "SCRIPT_BASED": `customBiddingAlgorithmType=SCRIPT_BASED` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
        ).optional(),
        partnerId: z.string().describe(
          "The ID of the DV360 partner that has access to the custom bidding algorithm.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
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
          "customBiddingAlgorithms",
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
    upload_rules: {
      description: "upload rules",
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
        params["customBiddingAlgorithmId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.customBiddingAlgorithms.uploadRules",
            "path":
              "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}:uploadRules",
            "httpMethod": "GET",
            "parameterOrder": ["customBiddingAlgorithmId"],
            "parameters": {
              "advertiserId": { "location": "query" },
              "customBiddingAlgorithmId": {
                "location": "path",
                "required": true,
              },
              "partnerId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    upload_script: {
      description: "upload script",
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
        params["customBiddingAlgorithmId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.customBiddingAlgorithms.uploadScript",
            "path":
              "v4/customBiddingAlgorithms/{+customBiddingAlgorithmId}:uploadScript",
            "httpMethod": "GET",
            "parameterOrder": ["customBiddingAlgorithmId"],
            "parameters": {
              "advertiserId": { "location": "query" },
              "customBiddingAlgorithmId": {
                "location": "path",
                "required": true,
              },
              "partnerId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
