// Auto-generated extension model for @swamp/gcp/beyondcorp/securitygateways
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BeyondCorp SecurityGateways.
 *
 * The information about a security gateway resource.
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
  return `${parent}/securityGateways/${shortName}`;
}

const BASE_URL = "https://beyondcorp.googleapis.com/";

const GET_CONFIG = {
  "id": "beyondcorp.projects.locations.securityGateways.get",
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
  "id": "beyondcorp.projects.locations.securityGateways.create",
  "path": "v1/{+parent}/securityGateways",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "securityGatewayId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "beyondcorp.projects.locations.securityGateways.patch",
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
  "id": "beyondcorp.projects.locations.securityGateways.delete",
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

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Optional. An arbitrary user-provided name for the SecurityGateway. Cannot exceed 64 characters.",
  ).optional(),
  hubs: z.record(
    z.string(),
    z.object({
      internetGateway: z.object({
        assignedIps: z.array(z.string()).describe(
          "Output only. List of IP addresses assigned to the Cloud NAT.",
        ).optional(),
      }).describe("Represents the Internet Gateway configuration.").optional(),
    }),
  ).describe(
    "Optional. Map of Hubs that represents regional data path deployment with GCP region as a key.",
  ).optional(),
  logging: z.object({}).describe("Configuration for Cloud Logging.").optional(),
  name: z.string().describe("Identifier. Name of the resource.").optional(),
  proxyProtocolConfig: z.object({
    allowedClientHeaders: z.array(z.string()).describe(
      "Optional. List of the allowed client header names.",
    ).optional(),
    clientIp: z.boolean().describe(
      "Optional. Client IP configuration. The client IP address is included if true.",
    ).optional(),
    contextualHeaders: z.object({
      deviceInfo: z.object({
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe(
          "Optional. The output type details for the delegated device.",
        ).optional(),
      }).describe("The delegated device information configuration.").optional(),
      groupInfo: z.object({
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe(
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
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe("Optional. The delegated user's information.").optional(),
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
  serviceDiscovery: z.object({
    apiGateway: z.object({
      resourceOverride: z.object({
        path: z.string().describe(
          "Optional. Contains the URI path fragment where HTTP request is sent.",
        ).optional(),
      }).describe("API operation descriptor.").optional(),
    }).describe(
      "If Service Discovery is done through API, defines its settings.",
    ).optional(),
  }).describe("Settings related to the Service Discovery.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request.",
  ).optional(),
  securityGatewayId: z.string().describe(
    "Optional. User-settable SecurityGateway resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or letter.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  delegatingServiceAccount: z.string().optional(),
  displayName: z.string().optional(),
  externalIps: z.array(z.string()).optional(),
  hubs: z.record(z.string(), z.unknown()).optional(),
  logging: z.object({}).optional(),
  name: z.string(),
  proxyProtocolConfig: z.object({
    allowedClientHeaders: z.array(z.string()),
    clientIp: z.boolean(),
    contextualHeaders: z.object({
      deviceInfo: z.object({
        outputType: z.string(),
      }),
      groupInfo: z.object({
        outputType: z.string(),
      }),
      outputType: z.string(),
      userInfo: z.object({
        outputType: z.string(),
      }),
    }),
    gatewayIdentity: z.string(),
    metadataHeaders: z.record(z.string(), z.unknown()),
  }).optional(),
  serviceDiscovery: z.object({
    apiGateway: z.object({
      resourceOverride: z.object({
        path: z.string(),
      }),
    }),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Optional. An arbitrary user-provided name for the SecurityGateway. Cannot exceed 64 characters.",
  ).optional(),
  hubs: z.record(
    z.string(),
    z.object({
      internetGateway: z.object({
        assignedIps: z.array(z.string()).describe(
          "Output only. List of IP addresses assigned to the Cloud NAT.",
        ).optional(),
      }).describe("Represents the Internet Gateway configuration.").optional(),
    }),
  ).describe(
    "Optional. Map of Hubs that represents regional data path deployment with GCP region as a key.",
  ).optional(),
  logging: z.object({}).describe("Configuration for Cloud Logging.").optional(),
  name: z.string().describe("Identifier. Name of the resource.").optional(),
  proxyProtocolConfig: z.object({
    allowedClientHeaders: z.array(z.string()).describe(
      "Optional. List of the allowed client header names.",
    ).optional(),
    clientIp: z.boolean().describe(
      "Optional. Client IP configuration. The client IP address is included if true.",
    ).optional(),
    contextualHeaders: z.object({
      deviceInfo: z.object({
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe(
          "Optional. The output type details for the delegated device.",
        ).optional(),
      }).describe("The delegated device information configuration.").optional(),
      groupInfo: z.object({
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe(
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
        outputType: z.enum([
          "OUTPUT_TYPE_UNSPECIFIED",
          "PROTOBUF",
          "JSON",
          "NONE",
        ]).describe("Optional. The delegated user's information.").optional(),
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
  serviceDiscovery: z.object({
    apiGateway: z.object({
      resourceOverride: z.object({
        path: z.string().describe(
          "Optional. Contains the URI path fragment where HTTP request is sent.",
        ).optional(),
      }).describe("API operation descriptor.").optional(),
    }).describe(
      "If Service Discovery is done through API, defines its settings.",
    ).optional(),
  }).describe("Settings related to the Service Discovery.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request.",
  ).optional(),
  securityGatewayId: z.string().describe(
    "Optional. User-settable SecurityGateway resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or letter.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BeyondCorp SecurityGateways. Registered at `@swamp/gcp/beyondcorp/securitygateways`. */
export const model = {
  type: "@swamp/gcp/beyondcorp/securitygateways",
  version: "2026.05.20.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The information about a security gateway resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityGateways",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["hubs"] !== undefined) body["hubs"] = g["hubs"];
        if (g["logging"] !== undefined) body["logging"] = g["logging"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["proxyProtocolConfig"] !== undefined) {
          body["proxyProtocolConfig"] = g["proxyProtocolConfig"];
        }
        if (g["serviceDiscovery"] !== undefined) {
          body["serviceDiscovery"] = g["serviceDiscovery"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["securityGatewayId"] !== undefined) {
          body["securityGatewayId"] = g["securityGatewayId"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
            }
            : undefined,
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
      description: "Get a securityGateways",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityGateways"),
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
      description: "Update securityGateways attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["hubs"] !== undefined) body["hubs"] = g["hubs"];
        if (g["logging"] !== undefined) body["logging"] = g["logging"];
        if (g["proxyProtocolConfig"] !== undefined) {
          body["proxyProtocolConfig"] = g["proxyProtocolConfig"];
        }
        if (g["serviceDiscovery"] !== undefined) {
          body["serviceDiscovery"] = g["serviceDiscovery"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
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
      description: "Delete the securityGateways",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityGateways"),
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
      description: "Sync securityGateways state from GCP",
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
  },
};
