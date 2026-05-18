// Auto-generated extension model for @swamp/gcp/apphub/applications-services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Hub Applications.Services.
 *
 * Service is an App Hub data model that contains a discovered service, which represents a network or API interface that exposes some functionality to clients for consumption over the network.
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
  return `${parent}/services/${shortName}`;
}

const BASE_URL = "https://apphub.googleapis.com/";

const GET_CONFIG = {
  "id": "apphub.projects.locations.applications.services.get",
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
  "id": "apphub.projects.locations.applications.services.create",
  "path": "v1/{+parent}/services",
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
    "serviceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apphub.projects.locations.applications.services.patch",
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
  "id": "apphub.projects.locations.applications.services.delete",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  attributes: z.object({
    businessOwners: z.array(z.object({
      displayName: z.string().describe(
        "Optional. Contact's name. Can have a maximum length of 63 characters.",
      ).optional(),
      email: z.string().describe("Required. Email address of the contacts.")
        .optional(),
    })).describe(
      "Optional. Business team that ensures user needs are met and value is delivered",
    ).optional(),
    criticality: z.object({
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "MISSION_CRITICAL",
        "HIGH",
        "MEDIUM",
        "LOW",
      ]).describe("Required. Criticality Type.").optional(),
    }).describe("Criticality of the Application, Service, or Workload")
      .optional(),
    developerOwners: z.array(z.object({
      displayName: z.string().describe(
        "Optional. Contact's name. Can have a maximum length of 63 characters.",
      ).optional(),
      email: z.string().describe("Required. Email address of the contacts.")
        .optional(),
    })).describe("Optional. Developer team that owns development and coding.")
      .optional(),
    environment: z.object({
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "PRODUCTION",
        "STAGING",
        "TEST",
        "DEVELOPMENT",
      ]).describe("Required. Environment Type.").optional(),
    }).describe("Environment of the Application, Service, or Workload")
      .optional(),
    operatorOwners: z.array(z.object({
      displayName: z.string().describe(
        "Optional. Contact's name. Can have a maximum length of 63 characters.",
      ).optional(),
      email: z.string().describe("Required. Email address of the contacts.")
        .optional(),
    })).describe("Optional. Operator team that ensures runtime and operations.")
      .optional(),
  }).describe("Consumer provided attributes.").optional(),
  description: z.string().describe(
    "Optional. User-defined description of a Service. Can have a maximum length of 2048 characters.",
  ).optional(),
  discoveredService: z.string().describe(
    "Required. Immutable. The resource name of the original discovered service.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User-defined name for the Service. Can have a maximum length of 63 characters.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name of a Service. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/services/{service-id}"`',
  ).optional(),
  serviceProperties: z.object({
    extendedMetadata: z.record(
      z.string(),
      z.object({
        metadataStruct: z.record(z.string(), z.string()).describe(
          "Output only. The metadata contents.",
        ).optional(),
      }),
    ).describe(
      "Output only. Additional metadata specific to the resource type. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}`",
    ).optional(),
    functionalType: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "AGENT", "MCP_SERVER", "ENDPOINT"])
        .describe("Output only. The functional type of a service or workload.")
        .optional(),
    }).describe("The functional type of a service or workload.").optional(),
    gcpProject: z.string().describe(
      "Output only. The service project identifier that the underlying cloud resource resides in.",
    ).optional(),
    identity: z.object({
      principal: z.string().describe(
        "Output only. The principal of the identity. Supported formats: * `sa://my-sa@PROJECT_ID.iam.gserviceaccount.com` for GCP Service Account * `principal://POOL_ID.global.PROJECT_NUMBER.workload.id.goog/ns/NAMESPACE_ID/sa/MANAGED_IDENTITY_ID` for Managed Workload Identity",
      ).optional(),
    }).describe("The identity associated with a service or workload.")
      .optional(),
    location: z.string().describe(
      "Output only. The location that the underlying resource resides in, for example, us-west1.",
    ).optional(),
    registrationType: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "EXCLUSIVE", "SHARED"]).describe(
        "Output only. The registration type of a service.",
      ).optional(),
    }).describe("The registration type of a service.").optional(),
    zone: z.string().describe(
      "Output only. The location that the underlying resource resides in if it is zonal, for example, us-west1-a).",
    ).optional(),
  }).describe(
    "Properties of an underlying cloud resource that can comprise a Service.",
  ).optional(),
  serviceReference: z.object({
    uri: z.string().describe(
      "Output only. The underlying resource URI. For example, URI of Forwarding Rule, URL Map, and Backend Service.",
    ).optional(),
  }).describe(
    "Reference to an underlying networking resource that can comprise a Service.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceId: z.string().describe(
    "Required. The Service identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  attributes: z.object({
    businessOwners: z.array(z.object({
      displayName: z.string(),
      email: z.string(),
    })),
    criticality: z.object({
      type: z.string(),
    }),
    developerOwners: z.array(z.object({
      displayName: z.string(),
      email: z.string(),
    })),
    environment: z.object({
      type: z.string(),
    }),
    operatorOwners: z.array(z.object({
      displayName: z.string(),
      email: z.string(),
    })),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  discoveredService: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  serviceProperties: z.object({
    extendedMetadata: z.record(z.string(), z.unknown()),
    functionalType: z.object({
      type: z.string(),
    }),
    gcpProject: z.string(),
    identity: z.object({
      principal: z.string(),
    }),
    location: z.string(),
    registrationType: z.object({
      type: z.string(),
    }),
    zone: z.string(),
  }).optional(),
  serviceReference: z.object({
    uri: z.string(),
  }).optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  attributes: z.object({
    businessOwners: z.array(z.object({
      displayName: z.string().describe(
        "Optional. Contact's name. Can have a maximum length of 63 characters.",
      ).optional(),
      email: z.string().describe("Required. Email address of the contacts.")
        .optional(),
    })).describe(
      "Optional. Business team that ensures user needs are met and value is delivered",
    ).optional(),
    criticality: z.object({
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "MISSION_CRITICAL",
        "HIGH",
        "MEDIUM",
        "LOW",
      ]).describe("Required. Criticality Type.").optional(),
    }).describe("Criticality of the Application, Service, or Workload")
      .optional(),
    developerOwners: z.array(z.object({
      displayName: z.string().describe(
        "Optional. Contact's name. Can have a maximum length of 63 characters.",
      ).optional(),
      email: z.string().describe("Required. Email address of the contacts.")
        .optional(),
    })).describe("Optional. Developer team that owns development and coding.")
      .optional(),
    environment: z.object({
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "PRODUCTION",
        "STAGING",
        "TEST",
        "DEVELOPMENT",
      ]).describe("Required. Environment Type.").optional(),
    }).describe("Environment of the Application, Service, or Workload")
      .optional(),
    operatorOwners: z.array(z.object({
      displayName: z.string().describe(
        "Optional. Contact's name. Can have a maximum length of 63 characters.",
      ).optional(),
      email: z.string().describe("Required. Email address of the contacts.")
        .optional(),
    })).describe("Optional. Operator team that ensures runtime and operations.")
      .optional(),
  }).describe("Consumer provided attributes.").optional(),
  description: z.string().describe(
    "Optional. User-defined description of a Service. Can have a maximum length of 2048 characters.",
  ).optional(),
  discoveredService: z.string().describe(
    "Required. Immutable. The resource name of the original discovered service.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User-defined name for the Service. Can have a maximum length of 63 characters.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name of a Service. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/services/{service-id}"`',
  ).optional(),
  serviceProperties: z.object({
    extendedMetadata: z.record(
      z.string(),
      z.object({
        metadataStruct: z.record(z.string(), z.string()).describe(
          "Output only. The metadata contents.",
        ).optional(),
      }),
    ).describe(
      "Output only. Additional metadata specific to the resource type. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}`",
    ).optional(),
    functionalType: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "AGENT", "MCP_SERVER", "ENDPOINT"])
        .describe("Output only. The functional type of a service or workload.")
        .optional(),
    }).describe("The functional type of a service or workload.").optional(),
    gcpProject: z.string().describe(
      "Output only. The service project identifier that the underlying cloud resource resides in.",
    ).optional(),
    identity: z.object({
      principal: z.string().describe(
        "Output only. The principal of the identity. Supported formats: * `sa://my-sa@PROJECT_ID.iam.gserviceaccount.com` for GCP Service Account * `principal://POOL_ID.global.PROJECT_NUMBER.workload.id.goog/ns/NAMESPACE_ID/sa/MANAGED_IDENTITY_ID` for Managed Workload Identity",
      ).optional(),
    }).describe("The identity associated with a service or workload.")
      .optional(),
    location: z.string().describe(
      "Output only. The location that the underlying resource resides in, for example, us-west1.",
    ).optional(),
    registrationType: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "EXCLUSIVE", "SHARED"]).describe(
        "Output only. The registration type of a service.",
      ).optional(),
    }).describe("The registration type of a service.").optional(),
    zone: z.string().describe(
      "Output only. The location that the underlying resource resides in if it is zonal, for example, us-west1-a).",
    ).optional(),
  }).describe(
    "Properties of an underlying cloud resource that can comprise a Service.",
  ).optional(),
  serviceReference: z.object({
    uri: z.string().describe(
      "Output only. The underlying resource URI. For example, URI of Forwarding Rule, URL Map, and Backend Service.",
    ).optional(),
  }).describe(
    "Reference to an underlying networking resource that can comprise a Service.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceId: z.string().describe(
    "Required. The Service identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Hub Applications.Services. Registered at `@swamp/gcp/apphub/applications-services`. */
export const model = {
  type: "@swamp/gcp/apphub/applications-services",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Service is an App Hub data model that contains a discovered service, which re...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a services",
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
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["discoveredService"] !== undefined) {
          body["discoveredService"] = g["discoveredService"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serviceProperties"] !== undefined) {
          body["serviceProperties"] = g["serviceProperties"];
        }
        if (g["serviceReference"] !== undefined) {
          body["serviceReference"] = g["serviceReference"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["serviceId"] !== undefined) body["serviceId"] = g["serviceId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
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
      description: "Update services attributes",
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
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["serviceProperties"] !== undefined) {
          body["serviceProperties"] = g["serviceProperties"];
        }
        if (g["serviceReference"] !== undefined) {
          body["serviceReference"] = g["serviceReference"];
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
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
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
      description: "Sync services state from GCP",
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
