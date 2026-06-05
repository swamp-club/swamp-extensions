// Auto-generated extension model for @swamp/gcp/iam/workforcepools-providers-scimtenants
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkforcePools.Providers.ScimTenants.
 *
 * Gemini Enterprise only. Represents a SCIM tenant. Used for provisioning and managing identity data (such as Users and Groups) in cross-domain environments.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/scimTenants/${shortName}`;
}

const BASE_URL = "https://iam.googleapis.com/";

const GET_CONFIG = {
  "id": "iam.locations.workforcePools.providers.scimTenants.get",
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
  "id": "iam.locations.workforcePools.providers.scimTenants.create",
  "path": "v1/{+parent}/scimTenants",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workforcePoolProviderScimTenantId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "iam.locations.workforcePools.providers.scimTenants.patch",
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
  "id": "iam.locations.workforcePools.providers.scimTenants.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "hardDelete": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "iam.locations.workforcePools.providers.scimTenants.list",
  "path": "v1/{+parent}/scimTenants",
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  claimMapping: z.record(z.string(), z.string()).describe(
    'Required. Immutable. Gemini Enterprise only. Maps SCIM attributes to Google attributes. This mapping is used to associate the attributes synced via SCIM with the Google Cloud attributes used in IAM policies for Workforce Identity Federation. SCIM-managed user and group attributes are mapped to `google.subject` and `google.group` respectively. Each key must be a string specifying the Google Cloud IAM attribute to map to. The supported keys are as follows: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. * `google.group`: Group the authenticating user belongs to. You can grant group access to resources using an IAM `principalSet` binding; access applies to all members of the group. Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) expression that maps SCIM user or group attribute to the normalized attribute specified by the corresponding map key. Example: To map the SCIM user\'s `externalId` to `google.subject` and the SCIM group\'s `externalId` to `google.group`: ` { "google.subject": "user.externalId", "google.group": "group.externalId" } `',
  ).optional(),
  description: z.string().describe(
    "Optional. Gemini Enterprise only. The description of the SCIM tenant. Cannot exceed 256 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Gemini Enterprise only. The display name of the SCIM tenant. Cannot exceed 32 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Gemini Enterprise only. The resource name of the SCIM Tenant. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}`",
  ).optional(),
  workforcePoolProviderScimTenantId: z.string().describe(
    "Required. Gemini Enterprise only. The ID to use for the SCIM tenant, which becomes the final component of the resource name. This value should be 4-32 characters, containing the characters `[a-z0-9-]`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  baseUri: z.string().optional(),
  claimMapping: z.record(z.string(), z.unknown()).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  purgeTime: z.string().optional(),
  serviceAgent: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  claimMapping: z.record(z.string(), z.string()).describe(
    'Required. Immutable. Gemini Enterprise only. Maps SCIM attributes to Google attributes. This mapping is used to associate the attributes synced via SCIM with the Google Cloud attributes used in IAM policies for Workforce Identity Federation. SCIM-managed user and group attributes are mapped to `google.subject` and `google.group` respectively. Each key must be a string specifying the Google Cloud IAM attribute to map to. The supported keys are as follows: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. * `google.group`: Group the authenticating user belongs to. You can grant group access to resources using an IAM `principalSet` binding; access applies to all members of the group. Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) expression that maps SCIM user or group attribute to the normalized attribute specified by the corresponding map key. Example: To map the SCIM user\'s `externalId` to `google.subject` and the SCIM group\'s `externalId` to `google.group`: ` { "google.subject": "user.externalId", "google.group": "group.externalId" } `',
  ).optional(),
  description: z.string().describe(
    "Optional. Gemini Enterprise only. The description of the SCIM tenant. Cannot exceed 256 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Gemini Enterprise only. The display name of the SCIM tenant. Cannot exceed 32 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Gemini Enterprise only. The resource name of the SCIM Tenant. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}`",
  ).optional(),
  workforcePoolProviderScimTenantId: z.string().describe(
    "Required. Gemini Enterprise only. The ID to use for the SCIM tenant, which becomes the final component of the resource name. This value should be 4-32 characters, containing the characters `[a-z0-9-]`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkforcePools.Providers.ScimTenants. Registered at `@swamp/gcp/iam/workforcepools-providers-scimtenants`. */
export const model = {
  type: "@swamp/gcp/iam/workforcepools-providers-scimtenants",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Gemini Enterprise only. Represents a SCIM tenant. Used for provisioning and m...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a scimTenants",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["claimMapping"] !== undefined) {
          body["claimMapping"] = g["claimMapping"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["workforcePoolProviderScimTenantId"] !== undefined) {
          body["workforcePoolProviderScimTenantId"] =
            g["workforcePoolProviderScimTenantId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a scimTenants",
      arguments: z.object({
        identifier: z.string().describe("The name of the scimTenants"),
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
      description: "Update scimTenants attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the scimTenants",
      arguments: z.object({
        identifier: z.string().describe("The name of the scimTenants"),
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
      description: "Sync scimTenants state from GCP",
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
    list: {
      description: "List scimTenants resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Gemini Enterprise only. The maximum number of SCIM tenants to return. If unspecified, at most 50 SCIM tenants will be returned. The maximum value is 100; values above 100 are truncated to 100.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Optional. Gemini Enterprise only. Whether to return soft-deleted SCIM tenants.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "workforcePoolProviderScimTenants",
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
    undelete: {
      description: "undelete",
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
            "id": "iam.locations.workforcePools.providers.scimTenants.undelete",
            "path": "v1/{+name}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
