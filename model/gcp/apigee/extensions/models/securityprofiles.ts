// Auto-generated extension model for @swamp/gcp/apigee/securityprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee SecurityProfiles.
 *
 * Represents a SecurityProfile resource.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/securityProfiles/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.securityProfiles.get",
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

const INSERT_CONFIG = {
  "id": "apigee.organizations.securityProfiles.create",
  "path": "v1/{+parent}/securityProfiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityProfileId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.securityProfiles.patch",
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
  "id": "apigee.organizations.securityProfiles.delete",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe("Description of the security profile.")
    .optional(),
  environments: z.array(z.object({
    attachTime: z.string().describe(
      "Output only. Time at which environment was attached to the security profile.",
    ).optional(),
    environment: z.string().describe("Output only. Name of the environment.")
      .optional(),
  })).describe("List of environments attached to security profile.").optional(),
  name: z.string().describe(
    "Immutable. Name of the security profile resource. Format: organizations/{org}/securityProfiles/{profile}",
  ).optional(),
  profileConfig: z.object({
    categories: z.array(z.object({
      abuse: z.object({}).describe(
        "Checks for abuse, which includes any requests sent to the API for purposes other than what it is intended for, such as high volumes of requests, data scraping, and abuse related to authorization.",
      ).optional(),
      authorization: z.object({}).describe(
        "By default, following policies will be included: - JWS - JWT - OAuth - BasicAuth - APIKey",
      ).optional(),
      cors: z.object({}).describe(
        "Checks to see if you have CORS policy in place.",
      ).optional(),
      mediation: z.object({}).describe(
        "By default, following policies will be included: - OASValidation - SOAPMessageValidation",
      ).optional(),
      mtls: z.object({}).describe(
        "Checks to see if you have configured mTLS for the target server.",
      ).optional(),
      threat: z.object({}).describe(
        "By default, following policies will be included: - XMLThreatProtection - JSONThreatProtection",
      ).optional(),
    })).describe("List of categories of profile config.").optional(),
  }).describe(
    "ProfileConfig defines a set of categories and policies which will be used to compute security score.",
  ).optional(),
  scoringConfigs: z.array(z.object({
    description: z.string().describe("Description of the config.").optional(),
    scorePath: z.string().describe(
      "Path of the component config used for scoring.",
    ).optional(),
    title: z.string().describe("Title of the config.").optional(),
  })).describe("List of profile scoring configs in this revision.").optional(),
  securityProfileId: z.string().describe(
    'Required. The ID to use for the SecurityProfile, which will become the final component of the action\'s resource name. This value should be 1-63 characters and validated by "(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$)".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  displayName: z.string().optional(),
  environments: z.array(z.object({
    attachTime: z.string(),
    environment: z.string(),
  })).optional(),
  maxScore: z.number().optional(),
  minScore: z.number().optional(),
  name: z.string(),
  profileConfig: z.object({
    categories: z.array(z.object({
      abuse: z.object({}),
      authorization: z.object({}),
      cors: z.object({}),
      mediation: z.object({}),
      mtls: z.object({}),
      threat: z.object({}),
    })),
  }).optional(),
  revisionCreateTime: z.string().optional(),
  revisionId: z.string().optional(),
  revisionPublishTime: z.string().optional(),
  revisionUpdateTime: z.string().optional(),
  scoringConfigs: z.array(z.object({
    description: z.string(),
    scorePath: z.string(),
    title: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe("Description of the security profile.")
    .optional(),
  environments: z.array(z.object({
    attachTime: z.string().describe(
      "Output only. Time at which environment was attached to the security profile.",
    ).optional(),
    environment: z.string().describe("Output only. Name of the environment.")
      .optional(),
  })).describe("List of environments attached to security profile.").optional(),
  name: z.string().describe(
    "Immutable. Name of the security profile resource. Format: organizations/{org}/securityProfiles/{profile}",
  ).optional(),
  profileConfig: z.object({
    categories: z.array(z.object({
      abuse: z.object({}).describe(
        "Checks for abuse, which includes any requests sent to the API for purposes other than what it is intended for, such as high volumes of requests, data scraping, and abuse related to authorization.",
      ).optional(),
      authorization: z.object({}).describe(
        "By default, following policies will be included: - JWS - JWT - OAuth - BasicAuth - APIKey",
      ).optional(),
      cors: z.object({}).describe(
        "Checks to see if you have CORS policy in place.",
      ).optional(),
      mediation: z.object({}).describe(
        "By default, following policies will be included: - OASValidation - SOAPMessageValidation",
      ).optional(),
      mtls: z.object({}).describe(
        "Checks to see if you have configured mTLS for the target server.",
      ).optional(),
      threat: z.object({}).describe(
        "By default, following policies will be included: - XMLThreatProtection - JSONThreatProtection",
      ).optional(),
    })).describe("List of categories of profile config.").optional(),
  }).describe(
    "ProfileConfig defines a set of categories and policies which will be used to compute security score.",
  ).optional(),
  scoringConfigs: z.array(z.object({
    description: z.string().describe("Description of the config.").optional(),
    scorePath: z.string().describe(
      "Path of the component config used for scoring.",
    ).optional(),
    title: z.string().describe("Title of the config.").optional(),
  })).describe("List of profile scoring configs in this revision.").optional(),
  securityProfileId: z.string().describe(
    'Required. The ID to use for the SecurityProfile, which will become the final component of the action\'s resource name. This value should be 1-63 characters and validated by "(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$)".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee SecurityProfiles. Registered at `@swamp/gcp/apigee/securityprofiles`. */
export const model = {
  type: "@swamp/gcp/apigee/securityprofiles",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a SecurityProfile resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityProfiles",
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
        if (g["environments"] !== undefined) {
          body["environments"] = g["environments"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["profileConfig"] !== undefined) {
          body["profileConfig"] = g["profileConfig"];
        }
        if (g["scoringConfigs"] !== undefined) {
          body["scoringConfigs"] = g["scoringConfigs"];
        }
        if (g["securityProfileId"] !== undefined) {
          body["securityProfileId"] = g["securityProfileId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a securityProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfiles"),
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
      description: "Update securityProfiles attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["environments"] !== undefined) {
          body["environments"] = g["environments"];
        }
        if (g["profileConfig"] !== undefined) {
          body["profileConfig"] = g["profileConfig"];
        }
        if (g["scoringConfigs"] !== undefined) {
          body["scoringConfigs"] = g["scoringConfigs"];
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
      description: "Delete the securityProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync securityProfiles state from GCP",
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
    list_revisions: {
      description: "list revisions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.securityProfiles.listRevisions",
            "path": "v1/{+name}:listRevisions",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
