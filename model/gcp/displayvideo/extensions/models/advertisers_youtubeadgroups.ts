// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-youtubeadgroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.YoutubeAdGroups.
 *
 * A single YouTube ad group associated with a YouTube and Partners line item.
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
  "id": "displayvideo.advertisers.youtubeAdGroups.get",
  "path": "v2/advertisers/{+advertiserId}/youtubeAdGroups/{+youtubeAdGroupId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "youtubeAdGroupId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "youtubeAdGroupId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.youtubeAdGroups.list",
  "path": "v2/advertisers/{+advertiserId}/youtubeAdGroups",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  adGroupFormat: z.string().optional(),
  adGroupId: z.string().optional(),
  advertiserId: z.string().optional(),
  biddingStrategy: z.object({
    adGroupEffectiveTargetCpaSource: z.string(),
    adGroupEffectiveTargetCpaValue: z.string(),
    type: z.string(),
    value: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  entityStatus: z.string().optional(),
  lineItemId: z.string().optional(),
  name: z.string(),
  productFeedData: z.object({
    isFeedDisabled: z.boolean(),
    productMatchDimensions: z.array(z.object({
      customLabel: z.object({
        key: z.string(),
        value: z.string(),
      }),
      productOfferId: z.string(),
    })),
    productMatchType: z.string(),
  }).optional(),
  targetingExpansion: z.object({
    excludeDemographicExpansion: z.boolean(),
    excludeFirstPartyAudience: z.boolean(),
    targetingExpansionLevel: z.string(),
  }).optional(),
  youtubeAdIds: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.YoutubeAdGroups. Registered at `@swamp/gcp/displayvideo/advertisers-youtubeadgroups`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-youtubeadgroups",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A single YouTube ad group associated with a YouTube and Partners line item.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a youtubeAdGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the youtubeAdGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["youtubeAdGroupId"] = args.identifier;
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
      description: "Sync youtubeAdGroups state from GCP",
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
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["youtubeAdGroupId"] = identifier;
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
      description: "List youtubeAdGroups resources",
      arguments: z.object({
        filter: z.string().describe(
          'Allows filtering by custom YouTube ad group fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` and `OR`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported properties: * `adGroupId` * `displayName` * `entityStatus` * `lineItemId` * `adGroupFormat` Examples: * All ad groups under an line item: `lineItemId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` `YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_IN_STREAM` ad groups under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND adGroupFormat="YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_IN_STREAM"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "youtubeAdGroups",
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
    bulk_list_ad_group_assigned_targeting_options: {
      description: "bulk list ad group assigned targeting options",
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
        params["advertiserId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.youtubeAdGroups.bulkListAdGroupAssignedTargetingOptions",
            "path":
              "v2/advertisers/{+advertiserId}/youtubeAdGroups:bulkListAdGroupAssignedTargetingOptions",
            "httpMethod": "GET",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "youtubeAdGroupIds": { "location": "query" },
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
