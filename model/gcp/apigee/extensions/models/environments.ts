// Auto-generated extension model for @swamp/gcp/apigee/environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Environments.
 *
 * Gets environment details.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/environments/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.environments.get",
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
  "id": "apigee.organizations.environments.create",
  "path": "v1/{+parent}/environments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "name": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "apigee.organizations.environments.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.environments.delete",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  apiProxyType: z.enum([
    "API_PROXY_TYPE_UNSPECIFIED",
    "PROGRAMMABLE",
    "CONFIGURABLE",
  ]).describe(
    "Optional. API Proxy type supported by the environment. The type can be set when creating the Environment and cannot be changed.",
  ).optional(),
  clientIpResolutionConfig: z.object({
    headerIndexAlgorithm: z.object({
      ipHeaderIndex: z.number().int().describe(
        "Required. The index of the ip in the header. Positive indices 0, 1, 2, 3 chooses indices from the left (first ips) Negative indices -1, -2, -3 chooses indices from the right (last ips)",
      ).optional(),
      ipHeaderName: z.string().describe(
        "Required. The name of the header to extract the client ip from.",
      ).optional(),
    }).describe("Resolves the client ip based on a custom header.").optional(),
  }).describe("Configuration for resolving the client ip.").optional(),
  deploymentType: z.enum(["DEPLOYMENT_TYPE_UNSPECIFIED", "PROXY", "ARCHIVE"])
    .describe(
      "Optional. Deployment type supported by the environment. The deployment type can be set when creating the environment and cannot be changed. When you enable archive deployment, you will be **prevented from performing** a [subset of actions](/apigee/docs/api-platform/local-development/overview#prevented-actions) within the environment, including: * Managing the deployment of API proxy or shared flow revisions * Creating, updating, or deleting resource files * Creating, updating, or deleting target servers",
    ).optional(),
  description: z.string().describe("Optional. Description of the environment.")
    .optional(),
  displayName: z.string().describe(
    "Optional. Display name for this environment.",
  ).optional(),
  forwardProxyUri: z.string().describe(
    'Optional. URI of the forward proxy to be applied to the runtime instances in this environment. Must be in the format of {scheme}://{hostname}:{port}. Note that the only supported scheme is "http". The port must be supplied. To remove a forward proxy setting, update the field to an empty value. Note: At this time, PUT operations to add forwardProxyUri to an existing environment fail if the environment has nodeConfig set up. To successfully add the forwardProxyUri setting in this case, include the NodeConfig details with the request.',
  ).optional(),
  hasAttachedFlowHooks: z.boolean().optional(),
  name: z.string().describe(
    "Required. Name of the environment. Values must match the regular expression `^[.\\\\p{Alnum}-_]{1,255}$`",
  ).optional(),
  nodeConfig: z.object({
    currentAggregateNodeCount: z.string().describe(
      "Output only. The current total number of gateway nodes that each environment currently has across all instances.",
    ).optional(),
    maxNodeCount: z.string().describe(
      "Optional. The maximum total number of gateway nodes that the is reserved for all instances that has the specified environment. If not specified, the default is determined by the recommended maximum number of nodes for that gateway.",
    ).optional(),
    minNodeCount: z.string().describe(
      "Optional. The minimum total number of gateway nodes that the is reserved for all instances that has the specified environment. If not specified, the default is determined by the recommended minimum number of nodes for that gateway.",
    ).optional(),
  }).describe(
    "NodeConfig for setting the min/max number of nodes associated with the environment.",
  ).optional(),
  properties: z.object({
    property: z.array(z.object({
      name: z.string().describe("The property key").optional(),
      value: z.string().describe("The property value").optional(),
    })).describe("List of all properties in the object").optional(),
  }).describe(
    "Message for compatibility with legacy Edge specification for Java Properties object in JSON.",
  ).optional(),
  type: z.enum([
    "ENVIRONMENT_TYPE_UNSPECIFIED",
    "BASE",
    "INTERMEDIATE",
    "COMPREHENSIVE",
  ]).describe("Optional. EnvironmentType selected for the environment.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiProxyType: z.string().optional(),
  clientIpResolutionConfig: z.object({
    headerIndexAlgorithm: z.object({
      ipHeaderIndex: z.number(),
      ipHeaderName: z.string(),
    }),
  }).optional(),
  createdAt: z.string().optional(),
  deploymentType: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  forwardProxyUri: z.string().optional(),
  hasAttachedFlowHooks: z.boolean().optional(),
  lastModifiedAt: z.string().optional(),
  name: z.string(),
  nodeConfig: z.object({
    currentAggregateNodeCount: z.string(),
    maxNodeCount: z.string(),
    minNodeCount: z.string(),
  }).optional(),
  properties: z.object({
    property: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }).optional(),
  state: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  apiProxyType: z.enum([
    "API_PROXY_TYPE_UNSPECIFIED",
    "PROGRAMMABLE",
    "CONFIGURABLE",
  ]).describe(
    "Optional. API Proxy type supported by the environment. The type can be set when creating the Environment and cannot be changed.",
  ).optional(),
  clientIpResolutionConfig: z.object({
    headerIndexAlgorithm: z.object({
      ipHeaderIndex: z.number().int().describe(
        "Required. The index of the ip in the header. Positive indices 0, 1, 2, 3 chooses indices from the left (first ips) Negative indices -1, -2, -3 chooses indices from the right (last ips)",
      ).optional(),
      ipHeaderName: z.string().describe(
        "Required. The name of the header to extract the client ip from.",
      ).optional(),
    }).describe("Resolves the client ip based on a custom header.").optional(),
  }).describe("Configuration for resolving the client ip.").optional(),
  deploymentType: z.enum(["DEPLOYMENT_TYPE_UNSPECIFIED", "PROXY", "ARCHIVE"])
    .describe(
      "Optional. Deployment type supported by the environment. The deployment type can be set when creating the environment and cannot be changed. When you enable archive deployment, you will be **prevented from performing** a [subset of actions](/apigee/docs/api-platform/local-development/overview#prevented-actions) within the environment, including: * Managing the deployment of API proxy or shared flow revisions * Creating, updating, or deleting resource files * Creating, updating, or deleting target servers",
    ).optional(),
  description: z.string().describe("Optional. Description of the environment.")
    .optional(),
  displayName: z.string().describe(
    "Optional. Display name for this environment.",
  ).optional(),
  forwardProxyUri: z.string().describe(
    'Optional. URI of the forward proxy to be applied to the runtime instances in this environment. Must be in the format of {scheme}://{hostname}:{port}. Note that the only supported scheme is "http". The port must be supplied. To remove a forward proxy setting, update the field to an empty value. Note: At this time, PUT operations to add forwardProxyUri to an existing environment fail if the environment has nodeConfig set up. To successfully add the forwardProxyUri setting in this case, include the NodeConfig details with the request.',
  ).optional(),
  hasAttachedFlowHooks: z.boolean().optional(),
  name: z.string().describe(
    "Required. Name of the environment. Values must match the regular expression `^[.\\\\p{Alnum}-_]{1,255}$`",
  ).optional(),
  nodeConfig: z.object({
    currentAggregateNodeCount: z.string().describe(
      "Output only. The current total number of gateway nodes that each environment currently has across all instances.",
    ).optional(),
    maxNodeCount: z.string().describe(
      "Optional. The maximum total number of gateway nodes that the is reserved for all instances that has the specified environment. If not specified, the default is determined by the recommended maximum number of nodes for that gateway.",
    ).optional(),
    minNodeCount: z.string().describe(
      "Optional. The minimum total number of gateway nodes that the is reserved for all instances that has the specified environment. If not specified, the default is determined by the recommended minimum number of nodes for that gateway.",
    ).optional(),
  }).describe(
    "NodeConfig for setting the min/max number of nodes associated with the environment.",
  ).optional(),
  properties: z.object({
    property: z.array(z.object({
      name: z.string().describe("The property key").optional(),
      value: z.string().describe("The property value").optional(),
    })).describe("List of all properties in the object").optional(),
  }).describe(
    "Message for compatibility with legacy Edge specification for Java Properties object in JSON.",
  ).optional(),
  type: z.enum([
    "ENVIRONMENT_TYPE_UNSPECIFIED",
    "BASE",
    "INTERMEDIATE",
    "COMPREHENSIVE",
  ]).describe("Optional. EnvironmentType selected for the environment.")
    .optional(),
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

/** Swamp extension model for Google Cloud Apigee Environments. Registered at `@swamp/gcp/apigee/environments`. */
export const model = {
  type: "@swamp/gcp/apigee/environments",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets environment details.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a environments",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiProxyType"] !== undefined) {
          body["apiProxyType"] = g["apiProxyType"];
        }
        if (g["clientIpResolutionConfig"] !== undefined) {
          body["clientIpResolutionConfig"] = g["clientIpResolutionConfig"];
        }
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["forwardProxyUri"] !== undefined) {
          body["forwardProxyUri"] = g["forwardProxyUri"];
        }
        if (g["hasAttachedFlowHooks"] !== undefined) {
          body["hasAttachedFlowHooks"] = g["hasAttachedFlowHooks"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          undefined,
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
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Update environments attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["clientIpResolutionConfig"] !== undefined) {
          body["clientIpResolutionConfig"] = g["clientIpResolutionConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["forwardProxyUri"] !== undefined) {
          body["forwardProxyUri"] = g["forwardProxyUri"];
        }
        if (g["hasAttachedFlowHooks"] !== undefined) {
          body["hasAttachedFlowHooks"] = g["hasAttachedFlowHooks"];
        }
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
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
          UPDATE_CONFIG,
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
      description: "Delete the environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Sync environments state from GCP",
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
    get_addons_config: {
      description: "get addons config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "apigee.organizations.environments.getAddonsConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_api_security_runtime_config: {
      description: "get api security runtime config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id":
              "apigee.organizations.environments.getApiSecurityRuntimeConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_debugmask: {
      description: "get debugmask",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "apigee.organizations.environments.getDebugmask",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_deployed_config: {
      description: "get deployed config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "apigee.organizations.environments.getDeployedConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
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
    get_security_actions_config: {
      description: "get security actions config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "apigee.organizations.environments.getSecurityActionsConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_trace_config: {
      description: "get trace config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "apigee.organizations.environments.getTraceConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    modify_environment: {
      description: "modify environment",
      arguments: z.object({
        apiProxyType: z.any().optional(),
        clientIpResolutionConfig: z.any().optional(),
        createdAt: z.any().optional(),
        deploymentType: z.any().optional(),
        description: z.any().optional(),
        displayName: z.any().optional(),
        forwardProxyUri: z.any().optional(),
        hasAttachedFlowHooks: z.any().optional(),
        lastModifiedAt: z.any().optional(),
        name: z.any().optional(),
        nodeConfig: z.any().optional(),
        properties: z.any().optional(),
        state: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["apiProxyType"] !== undefined) {
          body["apiProxyType"] = args["apiProxyType"];
        }
        if (args["clientIpResolutionConfig"] !== undefined) {
          body["clientIpResolutionConfig"] = args["clientIpResolutionConfig"];
        }
        if (args["createdAt"] !== undefined) {
          body["createdAt"] = args["createdAt"];
        }
        if (args["deploymentType"] !== undefined) {
          body["deploymentType"] = args["deploymentType"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["forwardProxyUri"] !== undefined) {
          body["forwardProxyUri"] = args["forwardProxyUri"];
        }
        if (args["hasAttachedFlowHooks"] !== undefined) {
          body["hasAttachedFlowHooks"] = args["hasAttachedFlowHooks"];
        }
        if (args["lastModifiedAt"] !== undefined) {
          body["lastModifiedAt"] = args["lastModifiedAt"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodeConfig"] !== undefined) {
          body["nodeConfig"] = args["nodeConfig"];
        }
        if (args["properties"] !== undefined) {
          body["properties"] = args["properties"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.modifyEnvironment",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    subscribe: {
      description: "subscribe",
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
            "id": "apigee.organizations.environments.subscribe",
            "path": "v1/{+parent}:subscribe",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    unsubscribe: {
      description: "unsubscribe",
      arguments: z.object({
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.unsubscribe",
            "path": "v1/{+parent}:unsubscribe",
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
    update_debugmask: {
      description: "update debugmask",
      arguments: z.object({
        faultJSONPaths: z.any().optional(),
        faultXPaths: z.any().optional(),
        name: z.any().optional(),
        namespaces: z.any().optional(),
        requestJSONPaths: z.any().optional(),
        requestXPaths: z.any().optional(),
        responseJSONPaths: z.any().optional(),
        responseXPaths: z.any().optional(),
        variables: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["faultJSONPaths"] !== undefined) {
          body["faultJSONPaths"] = args["faultJSONPaths"];
        }
        if (args["faultXPaths"] !== undefined) {
          body["faultXPaths"] = args["faultXPaths"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["namespaces"] !== undefined) {
          body["namespaces"] = args["namespaces"];
        }
        if (args["requestJSONPaths"] !== undefined) {
          body["requestJSONPaths"] = args["requestJSONPaths"];
        }
        if (args["requestXPaths"] !== undefined) {
          body["requestXPaths"] = args["requestXPaths"];
        }
        if (args["responseJSONPaths"] !== undefined) {
          body["responseJSONPaths"] = args["responseJSONPaths"];
        }
        if (args["responseXPaths"] !== undefined) {
          body["responseXPaths"] = args["responseXPaths"];
        }
        if (args["variables"] !== undefined) {
          body["variables"] = args["variables"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.updateDebugmask",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "replaceRepeatedFields": { "location": "query" },
              "updateMask": { "location": "query" },
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
    update_environment: {
      description: "update environment",
      arguments: z.object({
        apiProxyType: z.any().optional(),
        clientIpResolutionConfig: z.any().optional(),
        createdAt: z.any().optional(),
        deploymentType: z.any().optional(),
        description: z.any().optional(),
        displayName: z.any().optional(),
        forwardProxyUri: z.any().optional(),
        hasAttachedFlowHooks: z.any().optional(),
        lastModifiedAt: z.any().optional(),
        name: z.any().optional(),
        nodeConfig: z.any().optional(),
        properties: z.any().optional(),
        state: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["apiProxyType"] !== undefined) {
          body["apiProxyType"] = args["apiProxyType"];
        }
        if (args["clientIpResolutionConfig"] !== undefined) {
          body["clientIpResolutionConfig"] = args["clientIpResolutionConfig"];
        }
        if (args["createdAt"] !== undefined) {
          body["createdAt"] = args["createdAt"];
        }
        if (args["deploymentType"] !== undefined) {
          body["deploymentType"] = args["deploymentType"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["forwardProxyUri"] !== undefined) {
          body["forwardProxyUri"] = args["forwardProxyUri"];
        }
        if (args["hasAttachedFlowHooks"] !== undefined) {
          body["hasAttachedFlowHooks"] = args["hasAttachedFlowHooks"];
        }
        if (args["lastModifiedAt"] !== undefined) {
          body["lastModifiedAt"] = args["lastModifiedAt"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodeConfig"] !== undefined) {
          body["nodeConfig"] = args["nodeConfig"];
        }
        if (args["properties"] !== undefined) {
          body["properties"] = args["properties"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.updateEnvironment",
            "path": "v1/{+name}",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    update_security_actions_config: {
      description: "update security actions config",
      arguments: z.object({
        enabled: z.any().optional(),
        name: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["enabled"] !== undefined) body["enabled"] = args["enabled"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apigee.organizations.environments.updateSecurityActionsConfig",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
    update_trace_config: {
      description: "update trace config",
      arguments: z.object({
        endpoint: z.any().optional(),
        exporter: z.any().optional(),
        samplingConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["endpoint"] !== undefined) body["endpoint"] = args["endpoint"];
        if (args["exporter"] !== undefined) body["exporter"] = args["exporter"];
        if (args["samplingConfig"] !== undefined) {
          body["samplingConfig"] = args["samplingConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.environments.updateTraceConfig",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
