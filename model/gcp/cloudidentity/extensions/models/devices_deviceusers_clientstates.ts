// Auto-generated extension model for @swamp/gcp/cloudidentity/devices-deviceusers-clientstates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity Devices.DeviceUsers.ClientStates.
 *
 * Represents the state associated with an API client calling the Devices API. Resource representing ClientState and supports updates from API users
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/clientStates/${shortName}`;
}

const BASE_URL = "https://cloudidentity.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudidentity.devices.deviceUsers.clientStates.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "customer": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudidentity.devices.deviceUsers.clientStates.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "customer": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  assetTags: z.array(z.string()).describe(
    "The caller can specify asset tags for this resource",
  ).optional(),
  complianceState: z.enum([
    "COMPLIANCE_STATE_UNSPECIFIED",
    "COMPLIANT",
    "NON_COMPLIANT",
  ]).describe(
    "The compliance state of the resource as specified by the API client.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time the client state data was created.",
  ).optional(),
  customId: z.string().describe(
    "This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field.",
  ).optional(),
  etag: z.string().describe(
    "The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest",
  ).optional(),
  healthScore: z.enum([
    "HEALTH_SCORE_UNSPECIFIED",
    "VERY_POOR",
    "POOR",
    "NEUTRAL",
    "GOOD",
    "VERY_GOOD",
  ]).describe(
    "The Health score of the resource. The Health score is the callers specification of the condition of the device from a usability point of view. For example, a third-party device management provider may specify a health score based on its compliance with organizational policies.",
  ).optional(),
  keyValuePairs: z.record(
    z.string(),
    z.object({
      boolValue: z.boolean().describe("Represents a boolean value.").optional(),
      numberValue: z.number().describe("Represents a double value.").optional(),
      stringValue: z.string().describe("Represents a string value.").optional(),
    }),
  ).describe(
    "The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map.",
  ).optional(),
  lastUpdateTime: z.string().describe(
    "Output only. The time the client state data was last updated.",
  ).optional(),
  managed: z.enum(["MANAGED_STATE_UNSPECIFIED", "MANAGED", "UNMANAGED"])
    .describe(
      "The management state of the resource as specified by the API client.",
    ).optional(),
  name: z.string().describe(
    "Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the \"BeyondCorp Alliance\", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C')",
  ).optional(),
  ownerType: z.enum([
    "OWNER_TYPE_UNSPECIFIED",
    "OWNER_TYPE_CUSTOMER",
    "OWNER_TYPE_PARTNER",
  ]).describe("Output only. The owner of the ClientState").optional(),
  scoreReason: z.string().describe("A descriptive cause of the health score.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  assetTags: z.array(z.string()).optional(),
  complianceState: z.string().optional(),
  createTime: z.string().optional(),
  customId: z.string().optional(),
  etag: z.string().optional(),
  healthScore: z.string().optional(),
  keyValuePairs: z.record(z.string(), z.unknown()).optional(),
  lastUpdateTime: z.string().optional(),
  managed: z.string().optional(),
  name: z.string(),
  ownerType: z.string().optional(),
  scoreReason: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  assetTags: z.array(z.string()).describe(
    "The caller can specify asset tags for this resource",
  ).optional(),
  complianceState: z.enum([
    "COMPLIANCE_STATE_UNSPECIFIED",
    "COMPLIANT",
    "NON_COMPLIANT",
  ]).describe(
    "The compliance state of the resource as specified by the API client.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time the client state data was created.",
  ).optional(),
  customId: z.string().describe(
    "This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field.",
  ).optional(),
  etag: z.string().describe(
    "The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest",
  ).optional(),
  healthScore: z.enum([
    "HEALTH_SCORE_UNSPECIFIED",
    "VERY_POOR",
    "POOR",
    "NEUTRAL",
    "GOOD",
    "VERY_GOOD",
  ]).describe(
    "The Health score of the resource. The Health score is the callers specification of the condition of the device from a usability point of view. For example, a third-party device management provider may specify a health score based on its compliance with organizational policies.",
  ).optional(),
  keyValuePairs: z.record(
    z.string(),
    z.object({
      boolValue: z.boolean().describe("Represents a boolean value.").optional(),
      numberValue: z.number().describe("Represents a double value.").optional(),
      stringValue: z.string().describe("Represents a string value.").optional(),
    }),
  ).describe(
    "The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map.",
  ).optional(),
  lastUpdateTime: z.string().describe(
    "Output only. The time the client state data was last updated.",
  ).optional(),
  managed: z.enum(["MANAGED_STATE_UNSPECIFIED", "MANAGED", "UNMANAGED"])
    .describe(
      "The management state of the resource as specified by the API client.",
    ).optional(),
  name: z.string().describe(
    "Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the \"BeyondCorp Alliance\", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C')",
  ).optional(),
  ownerType: z.enum([
    "OWNER_TYPE_UNSPECIFIED",
    "OWNER_TYPE_CUSTOMER",
    "OWNER_TYPE_PARTNER",
  ]).describe("Output only. The owner of the ClientState").optional(),
  scoreReason: z.string().describe("A descriptive cause of the health score.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity Devices.DeviceUsers.ClientStates. Registered at `@swamp/gcp/cloudidentity/devices-deviceusers-clientstates`. */
export const model = {
  type: "@swamp/gcp/cloudidentity/devices-deviceusers-clientstates",
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
      description:
        "Represents the state associated with an API client calling the Devices API. R...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a clientStates",
      arguments: z.object({
        identifier: z.string().describe("The name of the clientStates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update clientStates attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["assetTags"] !== undefined) body["assetTags"] = g["assetTags"];
        if (g["complianceState"] !== undefined) {
          body["complianceState"] = g["complianceState"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["customId"] !== undefined) body["customId"] = g["customId"];
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["healthScore"] !== undefined) {
          body["healthScore"] = g["healthScore"];
        }
        if (g["keyValuePairs"] !== undefined) {
          body["keyValuePairs"] = g["keyValuePairs"];
        }
        if (g["lastUpdateTime"] !== undefined) {
          body["lastUpdateTime"] = g["lastUpdateTime"];
        }
        if (g["managed"] !== undefined) body["managed"] = g["managed"];
        if (g["ownerType"] !== undefined) body["ownerType"] = g["ownerType"];
        if (g["scoreReason"] !== undefined) {
          body["scoreReason"] = g["scoreReason"];
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
      description: "Sync clientStates state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
