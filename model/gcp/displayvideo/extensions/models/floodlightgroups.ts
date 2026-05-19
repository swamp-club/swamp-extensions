// Auto-generated extension model for @swamp/gcp/displayvideo/floodlightgroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 FloodlightGroups.
 *
 * A single Floodlight group.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.floodlightGroups.get",
  "path": "v4/floodlightGroups/{+floodlightGroupId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "floodlightGroupId",
  ],
  "parameters": {
    "floodlightGroupId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.floodlightGroups.patch",
  "path": "v4/floodlightGroups/{floodlightGroupId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "floodlightGroupId",
  ],
  "parameters": {
    "floodlightGroupId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  activeViewConfig: z.object({
    displayName: z.string().describe(
      "Required. The display name of the custom metric.",
    ).optional(),
    minimumDuration: z.enum([
      "VIDEO_DURATION_UNSPECIFIED",
      "VIDEO_DURATION_SECONDS_NONE",
      "VIDEO_DURATION_SECONDS_0",
      "VIDEO_DURATION_SECONDS_1",
      "VIDEO_DURATION_SECONDS_2",
      "VIDEO_DURATION_SECONDS_3",
      "VIDEO_DURATION_SECONDS_4",
      "VIDEO_DURATION_SECONDS_5",
      "VIDEO_DURATION_SECONDS_6",
      "VIDEO_DURATION_SECONDS_7",
      "VIDEO_DURATION_SECONDS_8",
      "VIDEO_DURATION_SECONDS_9",
      "VIDEO_DURATION_SECONDS_10",
      "VIDEO_DURATION_SECONDS_11",
      "VIDEO_DURATION_SECONDS_12",
      "VIDEO_DURATION_SECONDS_13",
      "VIDEO_DURATION_SECONDS_14",
      "VIDEO_DURATION_SECONDS_15",
      "VIDEO_DURATION_SECONDS_30",
      "VIDEO_DURATION_SECONDS_45",
      "VIDEO_DURATION_SECONDS_60",
    ]).describe(
      "The minimum visible video duration required (in seconds) in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first).",
    ).optional(),
    minimumQuartile: z.enum([
      "VIDEO_DURATION_QUARTILE_UNSPECIFIED",
      "VIDEO_DURATION_QUARTILE_NONE",
      "VIDEO_DURATION_QUARTILE_FIRST",
      "VIDEO_DURATION_QUARTILE_SECOND",
      "VIDEO_DURATION_QUARTILE_THIRD",
      "VIDEO_DURATION_QUARTILE_FOURTH",
    ]).describe(
      "The minimum visible video duration required, based on the video quartiles, in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first).",
    ).optional(),
    minimumViewability: z.enum([
      "VIEWABILITY_PERCENT_UNSPECIFIED",
      "VIEWABILITY_PERCENT_0",
      "VIEWABILITY_PERCENT_25",
      "VIEWABILITY_PERCENT_50",
      "VIEWABILITY_PERCENT_75",
      "VIEWABILITY_PERCENT_100",
    ]).describe(
      "Required. The minimum percentage of the video ad's pixels visible on the screen in order for an impression to be recorded.",
    ).optional(),
    minimumVolume: z.enum([
      "VIDEO_VOLUME_PERCENT_UNSPECIFIED",
      "VIDEO_VOLUME_PERCENT_0",
      "VIDEO_VOLUME_PERCENT_10",
    ]).describe(
      "Required. The minimum percentage of the video ad's volume required in order for an impression to be recorded.",
    ).optional(),
  }).describe("Configuration for custom Active View video viewability metrics.")
    .optional(),
  customVariables: z.record(z.string(), z.string()).describe(
    'User-defined custom variables owned by the Floodlight group. Use custom Floodlight variables to create reporting data that is tailored to your unique business needs. Custom Floodlight variables use the keys `U1=`, `U2=`, and so on, and can take any values that you choose to pass to them. You can use them to track virtually any type of data that you collect about your customers, such as the genre of movie that a customer purchases, the country to which the item is shipped, and so on. Custom Floodlight variables may not be used to pass any data that could be used or recognized as personally identifiable information (PII). Example: `custom_variables { fields { "U1": value { number_value: 123.4 }, "U2": value { string_value: "MyVariable2" }, "U3": value { string_value: "MyVariable3" } } }` Acceptable values for keys are "U1" through "U100", inclusive. String values must be less than 64 characters long, and cannot contain the following characters: `"<>`.',
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the Floodlight group.",
  ).optional(),
  floodlightGroupId: z.string().describe(
    "Output only. The unique ID of the Floodlight group. Assigned by the system.",
  ).optional(),
  lookbackWindow: z.object({
    clickDays: z.number().int().describe(
      "Lookback window, in days, from the last time a given user clicked on one of your ads.",
    ).optional(),
    impressionDays: z.number().int().describe(
      "Lookback window, in days, from the last time a given user viewed one of your ads.",
    ).optional(),
  }).describe(
    "Specifies how many days into the past to look when determining whether to record a conversion.",
  ).optional(),
  name: z.string().describe(
    "Output only. The resource name of the Floodlight group.",
  ).optional(),
  webTagType: z.enum([
    "WEB_TAG_TYPE_UNSPECIFIED",
    "WEB_TAG_TYPE_NONE",
    "WEB_TAG_TYPE_IMAGE",
    "WEB_TAG_TYPE_DYNAMIC",
  ]).describe("Required. The web tag type enabled for the Floodlight group.")
    .optional(),
});

const StateSchema = z.object({
  activeViewConfig: z.object({
    displayName: z.string(),
    minimumDuration: z.string(),
    minimumQuartile: z.string(),
    minimumViewability: z.string(),
    minimumVolume: z.string(),
  }).optional(),
  customVariables: z.record(z.string(), z.unknown()).optional(),
  displayName: z.string().optional(),
  floodlightGroupId: z.string().optional(),
  lookbackWindow: z.object({
    clickDays: z.number(),
    impressionDays: z.number(),
  }).optional(),
  name: z.string(),
  webTagType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  activeViewConfig: z.object({
    displayName: z.string().describe(
      "Required. The display name of the custom metric.",
    ).optional(),
    minimumDuration: z.enum([
      "VIDEO_DURATION_UNSPECIFIED",
      "VIDEO_DURATION_SECONDS_NONE",
      "VIDEO_DURATION_SECONDS_0",
      "VIDEO_DURATION_SECONDS_1",
      "VIDEO_DURATION_SECONDS_2",
      "VIDEO_DURATION_SECONDS_3",
      "VIDEO_DURATION_SECONDS_4",
      "VIDEO_DURATION_SECONDS_5",
      "VIDEO_DURATION_SECONDS_6",
      "VIDEO_DURATION_SECONDS_7",
      "VIDEO_DURATION_SECONDS_8",
      "VIDEO_DURATION_SECONDS_9",
      "VIDEO_DURATION_SECONDS_10",
      "VIDEO_DURATION_SECONDS_11",
      "VIDEO_DURATION_SECONDS_12",
      "VIDEO_DURATION_SECONDS_13",
      "VIDEO_DURATION_SECONDS_14",
      "VIDEO_DURATION_SECONDS_15",
      "VIDEO_DURATION_SECONDS_30",
      "VIDEO_DURATION_SECONDS_45",
      "VIDEO_DURATION_SECONDS_60",
    ]).describe(
      "The minimum visible video duration required (in seconds) in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first).",
    ).optional(),
    minimumQuartile: z.enum([
      "VIDEO_DURATION_QUARTILE_UNSPECIFIED",
      "VIDEO_DURATION_QUARTILE_NONE",
      "VIDEO_DURATION_QUARTILE_FIRST",
      "VIDEO_DURATION_QUARTILE_SECOND",
      "VIDEO_DURATION_QUARTILE_THIRD",
      "VIDEO_DURATION_QUARTILE_FOURTH",
    ]).describe(
      "The minimum visible video duration required, based on the video quartiles, in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first).",
    ).optional(),
    minimumViewability: z.enum([
      "VIEWABILITY_PERCENT_UNSPECIFIED",
      "VIEWABILITY_PERCENT_0",
      "VIEWABILITY_PERCENT_25",
      "VIEWABILITY_PERCENT_50",
      "VIEWABILITY_PERCENT_75",
      "VIEWABILITY_PERCENT_100",
    ]).describe(
      "Required. The minimum percentage of the video ad's pixels visible on the screen in order for an impression to be recorded.",
    ).optional(),
    minimumVolume: z.enum([
      "VIDEO_VOLUME_PERCENT_UNSPECIFIED",
      "VIDEO_VOLUME_PERCENT_0",
      "VIDEO_VOLUME_PERCENT_10",
    ]).describe(
      "Required. The minimum percentage of the video ad's volume required in order for an impression to be recorded.",
    ).optional(),
  }).describe("Configuration for custom Active View video viewability metrics.")
    .optional(),
  customVariables: z.record(z.string(), z.string()).describe(
    'User-defined custom variables owned by the Floodlight group. Use custom Floodlight variables to create reporting data that is tailored to your unique business needs. Custom Floodlight variables use the keys `U1=`, `U2=`, and so on, and can take any values that you choose to pass to them. You can use them to track virtually any type of data that you collect about your customers, such as the genre of movie that a customer purchases, the country to which the item is shipped, and so on. Custom Floodlight variables may not be used to pass any data that could be used or recognized as personally identifiable information (PII). Example: `custom_variables { fields { "U1": value { number_value: 123.4 }, "U2": value { string_value: "MyVariable2" }, "U3": value { string_value: "MyVariable3" } } }` Acceptable values for keys are "U1" through "U100", inclusive. String values must be less than 64 characters long, and cannot contain the following characters: `"<>`.',
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the Floodlight group.",
  ).optional(),
  floodlightGroupId: z.string().describe(
    "Output only. The unique ID of the Floodlight group. Assigned by the system.",
  ).optional(),
  lookbackWindow: z.object({
    clickDays: z.number().int().describe(
      "Lookback window, in days, from the last time a given user clicked on one of your ads.",
    ).optional(),
    impressionDays: z.number().int().describe(
      "Lookback window, in days, from the last time a given user viewed one of your ads.",
    ).optional(),
  }).describe(
    "Specifies how many days into the past to look when determining whether to record a conversion.",
  ).optional(),
  name: z.string().describe(
    "Output only. The resource name of the Floodlight group.",
  ).optional(),
  webTagType: z.enum([
    "WEB_TAG_TYPE_UNSPECIFIED",
    "WEB_TAG_TYPE_NONE",
    "WEB_TAG_TYPE_IMAGE",
    "WEB_TAG_TYPE_DYNAMIC",
  ]).describe("Required. The web tag type enabled for the Floodlight group.")
    .optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 FloodlightGroups. Registered at `@swamp/gcp/displayvideo/floodlightgroups`. */
export const model = {
  type: "@swamp/gcp/displayvideo/floodlightgroups",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single Floodlight group.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a floodlightGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the floodlightGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["floodlightGroupId"] = args.identifier;
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
      description: "Update floodlightGroups attributes",
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
        params["floodlightGroupId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["activeViewConfig"] !== undefined) {
          body["activeViewConfig"] = g["activeViewConfig"];
        }
        if (g["customVariables"] !== undefined) {
          body["customVariables"] = g["customVariables"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lookbackWindow"] !== undefined) {
          body["lookbackWindow"] = g["lookbackWindow"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["webTagType"] !== undefined) body["webTagType"] = g["webTagType"];
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
      description: "Sync floodlightGroups state from GCP",
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
          params["floodlightGroupId"] = identifier;
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
