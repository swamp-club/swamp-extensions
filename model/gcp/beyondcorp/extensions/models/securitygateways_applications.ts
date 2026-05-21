// Auto-generated extension model for @swamp/gcp/beyondcorp/securitygateways-applications
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BeyondCorp SecurityGateways.Applications.
 *
 * The information about an application resource.
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
  return `${parent}/applications/${shortName}`;
}

const BASE_URL = "https://beyondcorp.googleapis.com/";

const GET_CONFIG = {
  "id": "beyondcorp.projects.locations.securityGateways.applications.get",
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
  "id": "beyondcorp.projects.locations.securityGateways.applications.create",
  "path": "v1/{+parent}/applications",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "applicationId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "beyondcorp.projects.locations.securityGateways.applications.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "beyondcorp.projects.locations.securityGateways.applications.delete",
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
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "beyondcorp.projects.locations.securityGateways.applications.list",
  "path": "v1/{+parent}/applications",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  displayName: z.string().describe(
    "Optional. An arbitrary user-provided name for the application resource. Cannot exceed 64 characters.",
  ).optional(),
  endpointMatchers: z.array(z.object({
    hostname: z.string().describe("Required. Hostname of the application.")
      .optional(),
    ports: z.array(z.number().int()).describe(
      "Required. The ports of the application.",
    ).optional(),
  })).describe(
    'Optional. An array of conditions to match the application\'s network endpoint. Each element in the array is an EndpointMatcher object, which defines a specific combination of a hostname pattern and one or more ports. The application is considered matched if at least one of the EndpointMatcher conditions in this array is met (the conditions are combined using OR logic). Each EndpointMatcher must contain a hostname pattern, such as "example.com", and one or more port numbers specified as a string, such as "443". Hostname and port number examples: "*.example.com", "443" "example.com" and "22" "example.com" and "22,33"',
  ).optional(),
  name: z.string().describe("Identifier. Name of the resource.").optional(),
  schema: z.enum(["SCHEMA_UNSPECIFIED", "PROXY_GATEWAY", "API_GATEWAY"])
    .describe("Optional. Type of the external application.").optional(),
  upstreams: z.array(z.object({
    egressPolicy: z.object({
      regions: z.array(z.string()).describe(
        "Required. List of the regions where the application sends traffic.",
      ).optional(),
    }).describe("Routing policy information.").optional(),
    external: z.object({
      endpoints: z.array(z.object({
        hostname: z.unknown().describe("Required. Hostname of the endpoint.")
          .optional(),
        port: z.unknown().describe("Required. Port of the endpoint.")
          .optional(),
      })).describe("Required. List of the endpoints to forward traffic to.")
        .optional(),
    }).describe("Endpoints to forward traffic to.").optional(),
    network: z.object({
      name: z.string().describe(
        "Required. Network name is of the format: `projects/{project}/global/networks/{network}",
      ).optional(),
    }).describe("Network to forward traffic to.").optional(),
    proxyProtocol: z.object({
      allowedClientHeaders: z.array(z.string()).describe(
        "Optional. List of the allowed client header names.",
      ).optional(),
      clientIp: z.boolean().describe(
        "Optional. Client IP configuration. The client IP address is included if true.",
      ).optional(),
      contextualHeaders: z.object({
        deviceInfo: z.object({
          outputType: z.unknown().describe(
            "Optional. The output type details for the delegated device.",
          ).optional(),
        }).describe("The delegated device information configuration.")
          .optional(),
        groupInfo: z.object({
          outputType: z.unknown().describe(
            "Optional. The output type of the delegated group information.",
          ).optional(),
        }).describe("The delegated group configuration details.").optional(),
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe("Optional. Default output type for all enabled headers.")
          .optional(),
        userInfo: z.object({
          outputType: z.unknown().describe(
            "Optional. The delegated user's information.",
          ).optional(),
        }).describe("The configuration information for the delegated user.")
          .optional(),
      }).describe("Contextual headers configuration.").optional(),
      gatewayIdentity: z.enum(["GATEWAY_IDENTITY_UNSPECIFIED", "RESOURCE_NAME"])
        .describe("Optional. The security gateway identity configuration.")
        .optional(),
      metadataHeaders: z.record(z.string(), z.string()).describe(
        "Optional. Custom resource specific headers along with the values. The names should conform to RFC 9110: >Field names can contain alphanumeric characters, hyphens, and periods, can contain only ASCII-printable characters and tabs, and must start with a letter.",
      ).optional(),
    }).describe("The configuration for the proxy.").optional(),
  })).describe("Optional. Which upstream resources to forward traffic to.")
    .optional(),
  applicationId: z.string().describe(
    "Optional. User-settable Application resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or letter.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  endpointMatchers: z.array(z.object({
    hostname: z.string(),
    ports: z.array(z.number()),
  })).optional(),
  name: z.string(),
  schema: z.string().optional(),
  updateTime: z.string().optional(),
  upstreams: z.array(z.object({
    egressPolicy: z.object({
      regions: z.array(z.string()),
    }),
    external: z.object({
      endpoints: z.array(z.object({
        hostname: z.unknown(),
        port: z.unknown(),
      })),
    }),
    network: z.object({
      name: z.string(),
    }),
    proxyProtocol: z.object({
      allowedClientHeaders: z.array(z.string()),
      clientIp: z.boolean(),
      contextualHeaders: z.object({
        deviceInfo: z.object({
          outputType: z.unknown(),
        }),
        groupInfo: z.object({
          outputType: z.unknown(),
        }),
        outputType: z.string(),
        userInfo: z.object({
          outputType: z.unknown(),
        }),
      }),
      gatewayIdentity: z.string(),
      metadataHeaders: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Optional. An arbitrary user-provided name for the application resource. Cannot exceed 64 characters.",
  ).optional(),
  endpointMatchers: z.array(z.object({
    hostname: z.string().describe("Required. Hostname of the application.")
      .optional(),
    ports: z.array(z.number().int()).describe(
      "Required. The ports of the application.",
    ).optional(),
  })).describe(
    'Optional. An array of conditions to match the application\'s network endpoint. Each element in the array is an EndpointMatcher object, which defines a specific combination of a hostname pattern and one or more ports. The application is considered matched if at least one of the EndpointMatcher conditions in this array is met (the conditions are combined using OR logic). Each EndpointMatcher must contain a hostname pattern, such as "example.com", and one or more port numbers specified as a string, such as "443". Hostname and port number examples: "*.example.com", "443" "example.com" and "22" "example.com" and "22,33"',
  ).optional(),
  name: z.string().describe("Identifier. Name of the resource.").optional(),
  schema: z.enum(["SCHEMA_UNSPECIFIED", "PROXY_GATEWAY", "API_GATEWAY"])
    .describe("Optional. Type of the external application.").optional(),
  upstreams: z.array(z.object({
    egressPolicy: z.object({
      regions: z.array(z.string()).describe(
        "Required. List of the regions where the application sends traffic.",
      ).optional(),
    }).describe("Routing policy information.").optional(),
    external: z.object({
      endpoints: z.array(z.object({
        hostname: z.unknown().describe("Required. Hostname of the endpoint.")
          .optional(),
        port: z.unknown().describe("Required. Port of the endpoint.")
          .optional(),
      })).describe("Required. List of the endpoints to forward traffic to.")
        .optional(),
    }).describe("Endpoints to forward traffic to.").optional(),
    network: z.object({
      name: z.string().describe(
        "Required. Network name is of the format: `projects/{project}/global/networks/{network}",
      ).optional(),
    }).describe("Network to forward traffic to.").optional(),
    proxyProtocol: z.object({
      allowedClientHeaders: z.array(z.string()).describe(
        "Optional. List of the allowed client header names.",
      ).optional(),
      clientIp: z.boolean().describe(
        "Optional. Client IP configuration. The client IP address is included if true.",
      ).optional(),
      contextualHeaders: z.object({
        deviceInfo: z.object({
          outputType: z.unknown().describe(
            "Optional. The output type details for the delegated device.",
          ).optional(),
        }).describe("The delegated device information configuration.")
          .optional(),
        groupInfo: z.object({
          outputType: z.unknown().describe(
            "Optional. The output type of the delegated group information.",
          ).optional(),
        }).describe("The delegated group configuration details.").optional(),
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe("Optional. Default output type for all enabled headers.")
          .optional(),
        userInfo: z.object({
          outputType: z.unknown().describe(
            "Optional. The delegated user's information.",
          ).optional(),
        }).describe("The configuration information for the delegated user.")
          .optional(),
      }).describe("Contextual headers configuration.").optional(),
      gatewayIdentity: z.enum(["GATEWAY_IDENTITY_UNSPECIFIED", "RESOURCE_NAME"])
        .describe("Optional. The security gateway identity configuration.")
        .optional(),
      metadataHeaders: z.record(z.string(), z.string()).describe(
        "Optional. Custom resource specific headers along with the values. The names should conform to RFC 9110: >Field names can contain alphanumeric characters, hyphens, and periods, can contain only ASCII-printable characters and tabs, and must start with a letter.",
      ).optional(),
    }).describe("The configuration for the proxy.").optional(),
  })).describe("Optional. Which upstream resources to forward traffic to.")
    .optional(),
  applicationId: z.string().describe(
    "Optional. User-settable Application resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or letter.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BeyondCorp SecurityGateways.Applications. Registered at `@swamp/gcp/beyondcorp/securitygateways-applications`. */
export const model = {
  type: "@swamp/gcp/beyondcorp/securitygateways-applications",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      description: "The information about an application resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a applications",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endpointMatchers"] !== undefined) {
          body["endpointMatchers"] = g["endpointMatchers"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["upstreams"] !== undefined) body["upstreams"] = g["upstreams"];
        if (g["applicationId"] !== undefined) {
          body["applicationId"] = g["applicationId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a applications",
      arguments: z.object({
        identifier: z.string().describe("The name of the applications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update applications attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endpointMatchers"] !== undefined) {
          body["endpointMatchers"] = g["endpointMatchers"];
        }
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["upstreams"] !== undefined) body["upstreams"] = g["upstreams"];
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
      description: "Delete the applications",
      arguments: z.object({
        identifier: z.string().describe("The name of the applications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync applications state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id":
              "beyondcorp.projects.locations.securityGateways.applications.getIamPolicy",
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
        const projectId = await getProjectId();
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
            "id":
              "beyondcorp.projects.locations.securityGateways.applications.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        const projectId = await getProjectId();
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
            "id":
              "beyondcorp.projects.locations.securityGateways.applications.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
