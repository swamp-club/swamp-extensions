// Auto-generated extension model for @swamp/gcp/apigee/environments-securityincidents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Environments.SecurityIncidents.
 *
 * Represents an SecurityIncident resource.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/securityIncidents/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.environments.securityIncidents.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.environments.securityIncidents.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  detectionTypes: z.array(z.string()).describe(
    "Output only. Detection types which are part of the incident. Examples: Flooder, OAuth Abuser, Static Content Scraper, Anomaly Detection.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Display name of the security incident.",
  ).optional(),
  firstDetectedTime: z.string().describe(
    "Output only. The time when events associated with the incident were first detected.",
  ).optional(),
  lastDetectedTime: z.string().describe(
    "Output only. The time when events associated with the incident were last detected.",
  ).optional(),
  lastObservabilityChangeTime: z.string().describe(
    "Output only. The time when the incident observability was last changed.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Name of the security incident resource. Format: organizations/{org}/environments/{environment}/securityIncidents/{incident} Example: organizations/apigee-org/environments/dev/securityIncidents/1234-5678-9101-1111",
  ).optional(),
  observability: z.enum(["OBSERVABILITY_UNSPECIFIED", "ACTIVE", "ARCHIVED"])
    .describe("Optional. Indicates if the user archived this incident.")
    .optional(),
  riskLevel: z.enum(["RISK_LEVEL_UNSPECIFIED", "LOW", "MODERATE", "SEVERE"])
    .describe("Output only. Risk level of the incident.").optional(),
  trafficCount: z.string().describe(
    "Total traffic detected as part of the incident.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  detectionTypes: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  firstDetectedTime: z.string().optional(),
  lastDetectedTime: z.string().optional(),
  lastObservabilityChangeTime: z.string().optional(),
  name: z.string(),
  observability: z.string().optional(),
  riskLevel: z.string().optional(),
  trafficCount: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  detectionTypes: z.array(z.string()).describe(
    "Output only. Detection types which are part of the incident. Examples: Flooder, OAuth Abuser, Static Content Scraper, Anomaly Detection.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Display name of the security incident.",
  ).optional(),
  firstDetectedTime: z.string().describe(
    "Output only. The time when events associated with the incident were first detected.",
  ).optional(),
  lastDetectedTime: z.string().describe(
    "Output only. The time when events associated with the incident were last detected.",
  ).optional(),
  lastObservabilityChangeTime: z.string().describe(
    "Output only. The time when the incident observability was last changed.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Name of the security incident resource. Format: organizations/{org}/environments/{environment}/securityIncidents/{incident} Example: organizations/apigee-org/environments/dev/securityIncidents/1234-5678-9101-1111",
  ).optional(),
  observability: z.enum(["OBSERVABILITY_UNSPECIFIED", "ACTIVE", "ARCHIVED"])
    .describe("Optional. Indicates if the user archived this incident.")
    .optional(),
  riskLevel: z.enum(["RISK_LEVEL_UNSPECIFIED", "LOW", "MODERATE", "SEVERE"])
    .describe("Output only. Risk level of the incident.").optional(),
  trafficCount: z.string().describe(
    "Total traffic detected as part of the incident.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Environments.SecurityIncidents. Registered at `@swamp/gcp/apigee/environments-securityincidents`. */
export const model = {
  type: "@swamp/gcp/apigee/environments-securityincidents",
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
      description: "Represents an SecurityIncident resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a securityIncidents",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityIncidents"),
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
      description: "Update securityIncidents attributes",
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
        if (g["detectionTypes"] !== undefined) {
          body["detectionTypes"] = g["detectionTypes"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["firstDetectedTime"] !== undefined) {
          body["firstDetectedTime"] = g["firstDetectedTime"];
        }
        if (g["lastDetectedTime"] !== undefined) {
          body["lastDetectedTime"] = g["lastDetectedTime"];
        }
        if (g["lastObservabilityChangeTime"] !== undefined) {
          body["lastObservabilityChangeTime"] =
            g["lastObservabilityChangeTime"];
        }
        if (g["observability"] !== undefined) {
          body["observability"] = g["observability"];
        }
        if (g["riskLevel"] !== undefined) body["riskLevel"] = g["riskLevel"];
        if (g["trafficCount"] !== undefined) {
          body["trafficCount"] = g["trafficCount"];
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
      description: "Sync securityIncidents state from GCP",
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apigee.organizations.environments.securityIncidents.batchUpdate",
            "path": "v1/{+parent}/securityIncidents:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
