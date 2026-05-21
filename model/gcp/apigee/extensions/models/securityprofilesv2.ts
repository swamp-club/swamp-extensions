// Auto-generated extension model for @swamp/gcp/apigee/securityprofilesv2
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee SecurityProfilesV2.
 *
 * Security profile for risk assessment version 2.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.securityProfilesV2.get",
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
    "riskAssessmentType": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "apigee.organizations.securityProfilesV2.create",
  "path": "v1/{+parent}/securityProfilesV2",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityProfileV2Id": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.securityProfilesV2.patch",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.securityProfilesV2.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "riskAssessmentType": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "apigee.organizations.securityProfilesV2.list",
  "path": "v1/{+parent}/securityProfilesV2",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "riskAssessmentType": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "Optional. The description of the security profile.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the security profile v2 resource. Format: organizations/{org}/securityProfilesV2/{profile}",
  ).optional(),
  profileAssessmentConfigs: z.record(
    z.string(),
    z.object({
      include: z.object({
        gatewayTypes: z.array(
          z.enum([
            "API_HUB_GATEWAY_TYPE_UNSPECIFIED",
            "APIGEE_X",
            "APIGEE_HYBRID",
            "APIGEE_EDGE",
            "APIGEE_OPDK",
          ]),
        ).describe("Required. The array of API Hub Gateway Types.").optional(),
      }).describe("Message for the array of API Hub Gateway Types.").optional(),
      weight: z.enum(["WEIGHT_UNSPECIFIED", "MINOR", "MODERATE", "MAJOR"])
        .describe("The weight of the assessment.").optional(),
    }),
  ).describe(
    "Required. The configuration for each assessment in this profile. Key is the name/id of the assessment.",
  ).optional(),
  riskAssessmentType: z.enum([
    "RISK_ASSESSMENT_TYPE_UNSPECIFIED",
    "APIGEE",
    "API_HUB",
  ]).describe(
    "Optional. The risk assessment type of the security profile. Defaults to ADVANCED_API_SECURITY.",
  ).optional(),
  securityProfileV2Id: z.string().describe("Required. The security profile id.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  googleDefined: z.boolean().optional(),
  name: z.string(),
  profileAssessmentConfigs: z.record(z.string(), z.unknown()).optional(),
  riskAssessmentType: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. The description of the security profile.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the security profile v2 resource. Format: organizations/{org}/securityProfilesV2/{profile}",
  ).optional(),
  profileAssessmentConfigs: z.record(
    z.string(),
    z.object({
      include: z.object({
        gatewayTypes: z.array(
          z.enum([
            "API_HUB_GATEWAY_TYPE_UNSPECIFIED",
            "APIGEE_X",
            "APIGEE_HYBRID",
            "APIGEE_EDGE",
            "APIGEE_OPDK",
          ]),
        ).describe("Required. The array of API Hub Gateway Types.").optional(),
      }).describe("Message for the array of API Hub Gateway Types.").optional(),
      weight: z.enum(["WEIGHT_UNSPECIFIED", "MINOR", "MODERATE", "MAJOR"])
        .describe("The weight of the assessment.").optional(),
    }),
  ).describe(
    "Required. The configuration for each assessment in this profile. Key is the name/id of the assessment.",
  ).optional(),
  riskAssessmentType: z.enum([
    "RISK_ASSESSMENT_TYPE_UNSPECIFIED",
    "APIGEE",
    "API_HUB",
  ]).describe(
    "Optional. The risk assessment type of the security profile. Defaults to ADVANCED_API_SECURITY.",
  ).optional(),
  securityProfileV2Id: z.string().describe("Required. The security profile id.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee SecurityProfilesV2. Registered at `@swamp/gcp/apigee/securityprofilesv2`. */
export const model = {
  type: "@swamp/gcp/apigee/securityprofilesv2",
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
      description: "Security profile for risk assessment version 2.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityProfilesV2",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["profileAssessmentConfigs"] !== undefined) {
          body["profileAssessmentConfigs"] = g["profileAssessmentConfigs"];
        }
        if (g["riskAssessmentType"] !== undefined) {
          body["riskAssessmentType"] = g["riskAssessmentType"];
        }
        if (g["securityProfileV2Id"] !== undefined) {
          body["securityProfileV2Id"] = g["securityProfileV2Id"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a securityProfilesV2",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfilesV2"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update securityProfilesV2 attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["profileAssessmentConfigs"] !== undefined) {
          body["profileAssessmentConfigs"] = g["profileAssessmentConfigs"];
        }
        if (g["riskAssessmentType"] !== undefined) {
          body["riskAssessmentType"] = g["riskAssessmentType"];
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
    delete: {
      description: "Delete the securityProfilesV2",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfilesV2"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync securityProfilesV2 state from GCP",
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
          params["name"] = identifier;
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
