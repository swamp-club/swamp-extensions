// Auto-generated extension model for @swamp/gcp/vmmigration/sources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VM Migration Sources.
 *
 * Source message describes a specific vm migration Source resource. It contains the source environment information.
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
  return `${parent}/sources/${shortName}`;
}

const BASE_URL = "https://vmmigration.googleapis.com/";

const GET_CONFIG = {
  "id": "vmmigration.projects.locations.sources.get",
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
  "id": "vmmigration.projects.locations.sources.create",
  "path": "v1/{+parent}/sources",
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
    "sourceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "vmmigration.projects.locations.sources.patch",
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
  "id": "vmmigration.projects.locations.sources.delete",
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

const LIST_CONFIG = {
  "id": "vmmigration.projects.locations.sources.list",
  "path": "v1/{+parent}/sources",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  aws: z.object({
    accessKeyCreds: z.object({
      accessKeyId: z.string().describe("AWS access key ID.").optional(),
      secretAccessKey: z.string().describe("Input only. AWS secret access key.")
        .optional(),
      sessionToken: z.string().describe(
        "Input only. AWS session token. Used only when AWS security token service (STS) is responsible for creating the temporary credentials.",
      ).optional(),
    }).describe(
      "Message describing AWS Credentials using access key id and secret.",
    ).optional(),
    awsRegion: z.string().describe(
      "Immutable. The AWS region that the source VMs will be migrated from.",
    ).optional(),
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    inventorySecurityGroupNames: z.array(z.string()).describe(
      "AWS security group names to limit the scope of the source inventory.",
    ).optional(),
    inventoryTagList: z.array(z.object({
      key: z.string().describe("Required. Key of tag.").optional(),
      value: z.string().describe("Required. Value of tag.").optional(),
    })).describe(
      "AWS resource tags to limit the scope of the source inventory.",
    ).optional(),
    migrationResourcesUserTags: z.record(z.string(), z.string()).describe(
      "User specified tags to add to every M2VM generated resource in AWS. These tags will be set in addition to the default tags that are set as part of the migration process. The tags must not begin with the reserved prefix `m2vm`.",
    ).optional(),
    publicIp: z.string().describe(
      "Output only. The source's public IP. All communication initiated by this source will originate from this IP.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PENDING", "FAILED", "ACTIVE"])
      .describe(
        "Output only. State of the source as determined by the health check.",
      ).optional(),
  }).describe(
    "AwsSourceDetails message describes a specific source details for the AWS source type.",
  ).optional(),
  azure: z.object({
    azureLocation: z.string().describe(
      "Immutable. The Azure location (region) that the source VMs will be migrated from.",
    ).optional(),
    clientSecretCreds: z.object({
      clientId: z.string().describe("Azure client ID.").optional(),
      clientSecret: z.string().describe("Input only. Azure client secret.")
        .optional(),
      tenantId: z.string().describe("Azure tenant ID.").optional(),
    }).describe(
      "Message describing Azure Credentials using tenant ID, client ID and secret.",
    ).optional(),
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    migrationResourcesUserTags: z.record(z.string(), z.string()).describe(
      "User specified tags to add to every M2VM generated resource in Azure. These tags will be set in addition to the default tags that are set as part of the migration process. The tags must not begin with the reserved prefix `m4ce` or `m2vm`.",
    ).optional(),
    resourceGroupId: z.string().describe(
      "Output only. The ID of the Azure resource group that contains all resources related to the migration process of this source.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PENDING", "FAILED", "ACTIVE"])
      .describe(
        "Output only. State of the source as determined by the health check.",
      ).optional(),
    subscriptionId: z.string().describe("Immutable. Azure subscription ID.")
      .optional(),
  }).describe(
    "AzureSourceDetails message describes a specific source details for the Azure source type.",
  ).optional(),
  description: z.string().describe("User-provided description of the source.")
    .optional(),
  encryption: z.object({
    kmsKey: z.string().describe(
      "Required. The name of the encryption key that is stored in Google Cloud KMS.",
    ).optional(),
  }).describe(
    "Encryption message describes the details of the applied encryption.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("The labels of the source.")
    .optional(),
  vmware: z.object({
    password: z.string().describe(
      "Input only. The credentials password. This is write only and can not be read in a GET operation.",
    ).optional(),
    resolvedVcenterHost: z.string().describe("The hostname of the vcenter.")
      .optional(),
    thumbprint: z.string().describe(
      "The thumbprint representing the certificate for the vcenter.",
    ).optional(),
    username: z.string().describe("The credentials username.").optional(),
    vcenterIp: z.string().describe(
      "The ip address of the vcenter this Source represents.",
    ).optional(),
  }).describe(
    "VmwareSourceDetails message describes a specific source details for the vmware source type.",
  ).optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  sourceId: z.string().describe("Required. The source identifier.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aws: z.object({
    accessKeyCreds: z.object({
      accessKeyId: z.string(),
      secretAccessKey: z.string(),
      sessionToken: z.string(),
    }),
    awsRegion: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    inventorySecurityGroupNames: z.array(z.string()),
    inventoryTagList: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
    migrationResourcesUserTags: z.record(z.string(), z.unknown()),
    publicIp: z.string(),
    state: z.string(),
  }).optional(),
  azure: z.object({
    azureLocation: z.string(),
    clientSecretCreds: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      tenantId: z.string(),
    }),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    migrationResourcesUserTags: z.record(z.string(), z.unknown()),
    resourceGroupId: z.string(),
    state: z.string(),
    subscriptionId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  encryption: z.object({
    kmsKey: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  vmware: z.object({
    password: z.string(),
    resolvedVcenterHost: z.string(),
    thumbprint: z.string(),
    username: z.string(),
    vcenterIp: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  aws: z.object({
    accessKeyCreds: z.object({
      accessKeyId: z.string().describe("AWS access key ID.").optional(),
      secretAccessKey: z.string().describe("Input only. AWS secret access key.")
        .optional(),
      sessionToken: z.string().describe(
        "Input only. AWS session token. Used only when AWS security token service (STS) is responsible for creating the temporary credentials.",
      ).optional(),
    }).describe(
      "Message describing AWS Credentials using access key id and secret.",
    ).optional(),
    awsRegion: z.string().describe(
      "Immutable. The AWS region that the source VMs will be migrated from.",
    ).optional(),
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    inventorySecurityGroupNames: z.array(z.string()).describe(
      "AWS security group names to limit the scope of the source inventory.",
    ).optional(),
    inventoryTagList: z.array(z.object({
      key: z.string().describe("Required. Key of tag.").optional(),
      value: z.string().describe("Required. Value of tag.").optional(),
    })).describe(
      "AWS resource tags to limit the scope of the source inventory.",
    ).optional(),
    migrationResourcesUserTags: z.record(z.string(), z.string()).describe(
      "User specified tags to add to every M2VM generated resource in AWS. These tags will be set in addition to the default tags that are set as part of the migration process. The tags must not begin with the reserved prefix `m2vm`.",
    ).optional(),
    publicIp: z.string().describe(
      "Output only. The source's public IP. All communication initiated by this source will originate from this IP.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PENDING", "FAILED", "ACTIVE"])
      .describe(
        "Output only. State of the source as determined by the health check.",
      ).optional(),
  }).describe(
    "AwsSourceDetails message describes a specific source details for the AWS source type.",
  ).optional(),
  azure: z.object({
    azureLocation: z.string().describe(
      "Immutable. The Azure location (region) that the source VMs will be migrated from.",
    ).optional(),
    clientSecretCreds: z.object({
      clientId: z.string().describe("Azure client ID.").optional(),
      clientSecret: z.string().describe("Input only. Azure client secret.")
        .optional(),
      tenantId: z.string().describe("Azure tenant ID.").optional(),
    }).describe(
      "Message describing Azure Credentials using tenant ID, client ID and secret.",
    ).optional(),
    error: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    migrationResourcesUserTags: z.record(z.string(), z.string()).describe(
      "User specified tags to add to every M2VM generated resource in Azure. These tags will be set in addition to the default tags that are set as part of the migration process. The tags must not begin with the reserved prefix `m4ce` or `m2vm`.",
    ).optional(),
    resourceGroupId: z.string().describe(
      "Output only. The ID of the Azure resource group that contains all resources related to the migration process of this source.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "PENDING", "FAILED", "ACTIVE"])
      .describe(
        "Output only. State of the source as determined by the health check.",
      ).optional(),
    subscriptionId: z.string().describe("Immutable. Azure subscription ID.")
      .optional(),
  }).describe(
    "AzureSourceDetails message describes a specific source details for the Azure source type.",
  ).optional(),
  description: z.string().describe("User-provided description of the source.")
    .optional(),
  encryption: z.object({
    kmsKey: z.string().describe(
      "Required. The name of the encryption key that is stored in Google Cloud KMS.",
    ).optional(),
  }).describe(
    "Encryption message describes the details of the applied encryption.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("The labels of the source.")
    .optional(),
  vmware: z.object({
    password: z.string().describe(
      "Input only. The credentials password. This is write only and can not be read in a GET operation.",
    ).optional(),
    resolvedVcenterHost: z.string().describe("The hostname of the vcenter.")
      .optional(),
    thumbprint: z.string().describe(
      "The thumbprint representing the certificate for the vcenter.",
    ).optional(),
    username: z.string().describe("The credentials username.").optional(),
    vcenterIp: z.string().describe(
      "The ip address of the vcenter this Source represents.",
    ).optional(),
  }).describe(
    "VmwareSourceDetails message describes a specific source details for the vmware source type.",
  ).optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  sourceId: z.string().describe("Required. The source identifier.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VM Migration Sources. Registered at `@swamp/gcp/vmmigration/sources`. */
export const model = {
  type: "@swamp/gcp/vmmigration/sources",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Source message describes a specific vm migration Source resource. It contains...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["aws"] !== undefined) body["aws"] = g["aws"];
        if (g["azure"] !== undefined) body["azure"] = g["azure"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryption"] !== undefined) body["encryption"] = g["encryption"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["vmware"] !== undefined) body["vmware"] = g["vmware"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["sourceId"] !== undefined) body["sourceId"] = g["sourceId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a sources",
      arguments: z.object({
        identifier: z.string().describe("The name of the sources"),
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
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update sources attributes",
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
        if (g["aws"] !== undefined) body["aws"] = g["aws"];
        if (g["azure"] !== undefined) body["azure"] = g["azure"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryption"] !== undefined) body["encryption"] = g["encryption"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["vmware"] !== undefined) body["vmware"] = g["vmware"];
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
      description: "Delete the sources",
      arguments: z.object({
        identifier: z.string().describe("The name of the sources"),
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
      description: "Sync sources state from GCP",
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
    fetch_inventory: {
      description: "fetch inventory",
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
        params["source"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "vmmigration.projects.locations.sources.fetchInventory",
            "path": "v1/{+source}:fetchInventory",
            "httpMethod": "GET",
            "parameterOrder": ["source"],
            "parameters": {
              "forceRefresh": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "source": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    fetch_storage_inventory: {
      description: "fetch storage inventory",
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
        params["source"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.sources.fetchStorageInventory",
            "path": "v1/{+source}:fetchStorageInventory",
            "httpMethod": "GET",
            "parameterOrder": ["source"],
            "parameters": {
              "forceRefresh": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "source": { "location": "path", "required": true },
              "type": { "location": "query" },
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
