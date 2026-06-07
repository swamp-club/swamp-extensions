// Auto-generated extension model for @swamp/gcp/securitycenter/securityhealthanalyticssettings-custommodules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Security Command Center SecurityHealthAnalyticsSettings.CustomModules.
 *
 * GCP securitycenter SecurityHealthAnalyticsSettings.CustomModules resource
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/customModules/${shortName}`;
}

const BASE_URL = "https://securitycenter.googleapis.com/";

const GET_CONFIG = {
  "id":
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.get",
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
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.create",
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
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.patch",
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
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.delete",
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
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.list",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  ancestorModule: z.string().optional(),
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).optional(),
  customConfig: z.object({
    customOutput: z.object({
      properties: z.array(z.object({
        name: z.string().optional(),
        valueExpression: z.object({
          description: z.unknown().optional(),
          expression: z.unknown().optional(),
          location: z.unknown().optional(),
          title: z.unknown().optional(),
        }).optional(),
      })).optional(),
    }).optional(),
    description: z.string().optional(),
    predicate: z.object({
      description: z.string().optional(),
      expression: z.string().optional(),
      location: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    recommendation: z.string().optional(),
    resourceSelector: z.object({
      resourceTypes: z.array(z.string()).optional(),
    }).optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "CRITICAL",
      "HIGH",
      "MEDIUM",
      "LOW",
    ]).optional(),
  }).optional(),
  displayName: z.string().optional(),
  enablementState: z.enum([
    "ENABLEMENT_STATE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
    "INHERITED",
  ]).optional(),
  lastEditor: z.string().optional(),
  name: z.string().optional(),
  updateTime: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  ancestorModule: z.string().optional(),
  cloudProvider: z.string().optional(),
  customConfig: z.object({
    customOutput: z.object({
      properties: z.array(z.object({
        name: z.string(),
        valueExpression: z.object({
          description: z.unknown(),
          expression: z.unknown(),
          location: z.unknown(),
          title: z.unknown(),
        }),
      })),
    }),
    description: z.string(),
    predicate: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
    recommendation: z.string(),
    resourceSelector: z.object({
      resourceTypes: z.array(z.string()),
    }),
    severity: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  enablementState: z.string().optional(),
  lastEditor: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  ancestorModule: z.string().optional(),
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).optional(),
  customConfig: z.object({
    customOutput: z.object({
      properties: z.array(z.object({
        name: z.string().optional(),
        valueExpression: z.object({
          description: z.unknown().optional(),
          expression: z.unknown().optional(),
          location: z.unknown().optional(),
          title: z.unknown().optional(),
        }).optional(),
      })).optional(),
    }).optional(),
    description: z.string().optional(),
    predicate: z.object({
      description: z.string().optional(),
      expression: z.string().optional(),
      location: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    recommendation: z.string().optional(),
    resourceSelector: z.object({
      resourceTypes: z.array(z.string()).optional(),
    }).optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "CRITICAL",
      "HIGH",
      "MEDIUM",
      "LOW",
    ]).optional(),
  }).optional(),
  displayName: z.string().optional(),
  enablementState: z.enum([
    "ENABLEMENT_STATE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
    "INHERITED",
  ]).optional(),
  lastEditor: z.string().optional(),
  name: z.string().optional(),
  updateTime: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Security Command Center SecurityHealthAnalyticsSettings.CustomModules. Registered at `@swamp/gcp/securitycenter/securityhealthanalyticssettings-custommodules`. */
export const model = {
  type:
    "@swamp/gcp/securitycenter/securityhealthanalyticssettings-custommodules",
  version: "2026.06.07.1",
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
      toVersion: "2026.04.04.1",
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
      toVersion: "2026.05.31.1",
      description: "Added: ancestorModule, lastEditor, updateTime",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "GCP securitycenter SecurityHealthAnalyticsSettings.CustomModules resource",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["ancestorModule"] !== undefined) {
          body["ancestorModule"] = g["ancestorModule"];
        }
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["customConfig"] !== undefined) {
          body["customConfig"] = g["customConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablementState"] !== undefined) {
          body["enablementState"] = g["enablementState"];
        }
        if (g["lastEditor"] !== undefined) body["lastEditor"] = g["lastEditor"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
          credentials,
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["ancestorModule"] !== undefined) {
          body["ancestorModule"] = g["ancestorModule"];
        }
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["customConfig"] !== undefined) {
          body["customConfig"] = g["customConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablementState"] !== undefined) {
          body["enablementState"] = g["enablementState"];
        }
        if (g["lastEditor"] !== undefined) body["lastEditor"] = g["lastEditor"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List customModules resources",
      arguments: z.object({
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "securityHealthAnalyticsCustomModules",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    list_descendant: {
      description: "list descendant",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securitycenter.folders.securityHealthAnalyticsSettings.customModules.listDescendant",
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    simulate: {
      description: "simulate",
      arguments: z.object({
        customConfig: z.any().optional(),
        resource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["customConfig"] !== undefined) {
          body["customConfig"] = args["customConfig"];
        }
        if (args["resource"] !== undefined) body["resource"] = args["resource"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securitycenter.folders.securityHealthAnalyticsSettings.customModules.simulate",
            "path": "v1/{+parent}/customModules:simulate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
