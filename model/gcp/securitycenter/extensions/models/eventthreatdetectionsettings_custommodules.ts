// Auto-generated extension model for @swamp/gcp/securitycenter/eventthreatdetectionsettings-custommodules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Security Command Center EventThreatDetectionSettings.CustomModules.
 *
 * Represents an instance of an Event Threat Detection custom module, including its full module name, display name, enablement state, and last updated time. You can create a custom module at the organization, folder, or project level. Custom modules that you create at the organization or folder level are inherited by child folders and projects.
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
  return `${parent}/customModules/${shortName}`;
}

const BASE_URL = "https://securitycenter.googleapis.com/";

const GET_CONFIG = {
  "id": "securitycenter.folders.eventThreatDetectionSettings.customModules.get",
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
  "id":
    "securitycenter.folders.eventThreatDetectionSettings.customModules.create",
  "path": "v1/{+parent}/customModules",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "securitycenter.folders.eventThreatDetectionSettings.customModules.patch",
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
  "id":
    "securitycenter.folders.eventThreatDetectionSettings.customModules.delete",
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

const LIST_CONFIG = {
  "id":
    "securitycenter.folders.eventThreatDetectionSettings.customModules.list",
  "path": "v1/{+parent}/customModules",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).describe("The cloud provider of the custom module.").optional(),
  config: z.record(z.string(), z.string()).describe(
    "Config for the module. For the resident module, its config value is defined at this level. For the inherited module, its config value is inherited from the ancestor module.",
  ).optional(),
  description: z.string().describe("The description for the module.")
    .optional(),
  displayName: z.string().describe(
    "The human readable name to be displayed for the module.",
  ).optional(),
  enablementState: z.enum([
    "ENABLEMENT_STATE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
    "INHERITED",
  ]).describe(
    "The state of enablement for the module at the given level of the hierarchy.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`.",
  ).optional(),
  type: z.string().describe("Type for the module. e.g. CONFIGURABLE_BAD_IP.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  ancestorModule: z.string().optional(),
  cloudProvider: z.string().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enablementState: z.string().optional(),
  lastEditor: z.string().optional(),
  name: z.string(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).describe("The cloud provider of the custom module.").optional(),
  config: z.record(z.string(), z.string()).describe(
    "Config for the module. For the resident module, its config value is defined at this level. For the inherited module, its config value is inherited from the ancestor module.",
  ).optional(),
  description: z.string().describe("The description for the module.")
    .optional(),
  displayName: z.string().describe(
    "The human readable name to be displayed for the module.",
  ).optional(),
  enablementState: z.enum([
    "ENABLEMENT_STATE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
    "INHERITED",
  ]).describe(
    "The state of enablement for the module at the given level of the hierarchy.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the Event Threat Detection custom module. Its format is: * `organizations/{organization}/eventThreatDetectionSettings/customModules/{module}`. * `folders/{folder}/eventThreatDetectionSettings/customModules/{module}`. * `projects/{project}/eventThreatDetectionSettings/customModules/{module}`.",
  ).optional(),
  type: z.string().describe("Type for the module. e.g. CONFIGURABLE_BAD_IP.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Security Command Center EventThreatDetectionSettings.CustomModules. Registered at `@swamp/gcp/securitycenter/eventthreatdetectionsettings-custommodules`. */
export const model = {
  type: "@swamp/gcp/securitycenter/eventthreatdetectionsettings-custommodules",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an instance of an Event Threat Detection custom module, including ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customModules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablementState"] !== undefined) {
          body["enablementState"] = g["enablementState"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
          undefined,
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
      description: "Get a customModules",
      arguments: z.object({
        identifier: z.string().describe("The name of the customModules"),
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
      description: "Update customModules attributes",
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
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablementState"] !== undefined) {
          body["enablementState"] = g["enablementState"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the customModules",
      arguments: z.object({
        identifier: z.string().describe("The name of the customModules"),
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
      description: "Sync customModules state from GCP",
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
    list_descendant: {
      description: "list descendant",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securitycenter.folders.eventThreatDetectionSettings.customModules.listDescendant",
            "path": "v1/{+parent}/customModules:listDescendant",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
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
