// Auto-generated extension model for @swamp/gcp/compute/previewfeatures
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine PreviewFeatures.
 *
 * Represents a single Google Compute Engine preview feature.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.previewFeatures.get",
  "path": "projects/{project}/global/previewFeatures/{previewFeature}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "previewFeature",
  ],
  "parameters": {
    "previewFeature": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.previewFeatures.update",
  "path": "projects/{project}/global/previewFeatures/{previewFeature}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "previewFeature",
  ],
  "parameters": {
    "previewFeature": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.previewFeatures.list",
  "path": "projects/{project}/global/previewFeatures",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  activationStatus: z.enum([
    "ACTIVATION_STATE_UNSPECIFIED",
    "DISABLED",
    "ENABLED",
  ]).describe("Specifies whether the feature is enabled or disabled.")
    .optional(),
  creationTimestamp: z.string().describe(
    "Output only. [Output Only] Creation timestamp inRFC3339 text format.",
  ).optional(),
  description: z.string().describe(
    "Output only. [Output Only] Description of the feature.",
  ).optional(),
  id: z.string().describe(
    "Output only. [Output Only] The unique identifier for the resource. This identifier is defined by the server.",
  ).optional(),
  kind: z.string().describe(
    'Output only. [Output only] The type of the feature. Always "compute#previewFeature" for preview features.',
  ).optional(),
  name: z.string().describe("Name of the feature.").optional(),
  rolloutOperation: z.object({
    rolloutInput: z.object({
      name: z.string().describe(
        "The name of the rollout plan Ex. organizations//locations/global/rolloutPlans/ Ex. folders//locations/global/rolloutPlans/ Ex. projects//locations/global/rolloutPlans/.",
      ).optional(),
      predefinedRolloutPlan: z.enum([
        "ROLLOUT_PLAN_FAST_ROLLOUT",
        "ROLLOUT_PLAN_TWO_DAY_ROLLOUT",
        "ROLLOUT_PLAN_UNSPECIFIED",
      ]).describe("Predefined rollout plan.").optional(),
    }).describe("Represents the input for the rollout operation.").optional(),
  }).describe("Represents the rollout operation").optional(),
  selfLink: z.string().describe(
    "Output only. [Output Only] Server-defined URL for the resource.",
  ).optional(),
  status: z.object({
    description: z.string().describe(
      "Output only. [Output Only] The description of the feature.",
    ).optional(),
    helpLink: z.string().describe(
      "Output only. [Output Only] Link to the public documentation for the feature.",
    ).optional(),
    releaseStatus: z.object({
      stage: z.enum(["DEPRECATED", "GA", "PREVIEW", "STAGE_UNSPECIFIED"])
        .describe("Output only. [Output Only] The stage of the feature.")
        .optional(),
      updateDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
    }).describe("[Output Only] The release status of the feature.").optional(),
  }).describe("[Output Only] The status of the feature.").optional(),
});

const StateSchema = z.object({
  activationStatus: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  rolloutOperation: z.object({
    rolloutInput: z.object({
      name: z.string(),
      predefinedRolloutPlan: z.string(),
    }),
  }).optional(),
  selfLink: z.string().optional(),
  status: z.object({
    description: z.string(),
    helpLink: z.string(),
    releaseStatus: z.object({
      stage: z.string(),
      updateDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  activationStatus: z.enum([
    "ACTIVATION_STATE_UNSPECIFIED",
    "DISABLED",
    "ENABLED",
  ]).describe("Specifies whether the feature is enabled or disabled.")
    .optional(),
  creationTimestamp: z.string().describe(
    "Output only. [Output Only] Creation timestamp inRFC3339 text format.",
  ).optional(),
  description: z.string().describe(
    "Output only. [Output Only] Description of the feature.",
  ).optional(),
  id: z.string().describe(
    "Output only. [Output Only] The unique identifier for the resource. This identifier is defined by the server.",
  ).optional(),
  kind: z.string().describe(
    'Output only. [Output only] The type of the feature. Always "compute#previewFeature" for preview features.',
  ).optional(),
  name: z.string().describe("Name of the feature.").optional(),
  rolloutOperation: z.object({
    rolloutInput: z.object({
      name: z.string().describe(
        "The name of the rollout plan Ex. organizations//locations/global/rolloutPlans/ Ex. folders//locations/global/rolloutPlans/ Ex. projects//locations/global/rolloutPlans/.",
      ).optional(),
      predefinedRolloutPlan: z.enum([
        "ROLLOUT_PLAN_FAST_ROLLOUT",
        "ROLLOUT_PLAN_TWO_DAY_ROLLOUT",
        "ROLLOUT_PLAN_UNSPECIFIED",
      ]).describe("Predefined rollout plan.").optional(),
    }).describe("Represents the input for the rollout operation.").optional(),
  }).describe("Represents the rollout operation").optional(),
  selfLink: z.string().describe(
    "Output only. [Output Only] Server-defined URL for the resource.",
  ).optional(),
  status: z.object({
    description: z.string().describe(
      "Output only. [Output Only] The description of the feature.",
    ).optional(),
    helpLink: z.string().describe(
      "Output only. [Output Only] Link to the public documentation for the feature.",
    ).optional(),
    releaseStatus: z.object({
      stage: z.enum(["DEPRECATED", "GA", "PREVIEW", "STAGE_UNSPECIFIED"])
        .describe("Output only. [Output Only] The stage of the feature.")
        .optional(),
      updateDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
    }).describe("[Output Only] The release status of the feature.").optional(),
  }).describe("[Output Only] The status of the feature.").optional(),
});

/** Swamp extension model for Google Cloud Compute Engine PreviewFeatures. Registered at `@swamp/gcp/compute/previewfeatures`. */
export const model = {
  type: "@swamp/gcp/compute/previewfeatures",
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
      description: "Represents a single Google Compute Engine preview feature.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a previewFeatures",
      arguments: z.object({
        identifier: z.string().describe("The name of the previewFeatures"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["previewFeature"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update previewFeatures attributes",
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
        params["previewFeature"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["activationStatus"] !== undefined) {
          body["activationStatus"] = g["activationStatus"];
        }
        if (g["creationTimestamp"] !== undefined) {
          body["creationTimestamp"] = g["creationTimestamp"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rolloutOperation"] !== undefined) {
          body["rolloutOperation"] = g["rolloutOperation"];
        }
        if (g["selfLink"] !== undefined) body["selfLink"] = g["selfLink"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
          UPDATE_CONFIG,
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
      description: "Sync previewFeatures state from GCP",
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
          params["previewFeature"] = identifier;
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
      description: "List previewFeatures resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
