// Auto-generated extension model for @swamp/gcp/dataplex/dataproducts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex DataProducts.
 *
 * A data product is a curated collection of data assets, packaged to address specific use cases. It's a way to manage and share data in a more organized, product-like manner.
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
  return `${parent}/dataProducts/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.dataProducts.get",
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
  "id": "dataplex.projects.locations.dataProducts.create",
  "path": "v1/{+parent}/dataProducts",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dataProductId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.dataProducts.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.dataProducts.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessApprovalConfig: z.object({
    approverEmails: z.array(z.string()).describe(
      "Optional. Specifies the email addresses of users who are potential approvers and are notified when an access request is made for the data product. The maximum number of emails allowed is 10.",
    ).optional(),
  }).describe("Configuration for access approval for the data product.")
    .optional(),
  accessGroups: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "Optional. Description of the access group.",
      ).optional(),
      displayName: z.string().describe(
        'Required. User friendly display name of the access group. Eg. "Analyst", "Developer", etc.',
      ).optional(),
      id: z.string().describe(
        'Required. Unique identifier of the access group within the data product. User defined. Eg. "analyst", "developer", etc.',
      ).optional(),
      principal: z.object({
        googleGroup: z.string().describe(
          "Optional. Email of the Google Group, as per https://cloud.google.com/iam/docs/principals-overview#google-group.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Optional. Specifies the email of the producer service account, as per https://cloud.google.com/iam/docs/principals-overview#service-account.",
        ).optional(),
      }).describe(
        "Represents the principal entity associated with an access group, as per https://cloud.google.com/iam/docs/principals-overview.",
      ).optional(),
    }),
  ).describe(
    'Optional. Data product access groups by access group id as key. If data product is used only for packaging data assets, then access groups may be empty. However, if a data product is used for sharing data assets, then at least one access group must be specified.Example: { "analyst": { "id": "analyst", "displayName": "Analyst", "description": "Access group for analysts", "principal": { "googleGroup": "analysts@example.com" } } }',
  ).optional(),
  description: z.string().describe("Optional. Description of the data product.")
    .optional(),
  displayName: z.string().describe(
    "Required. User-friendly display name of the data product.",
  ).optional(),
  icon: z.string().describe(
    "Optional. Base64 encoded image representing the data product. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. User-defined labels for the data product.Example: { "environment": "production", "billing": "marketing-department" }',
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the data product. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}.",
  ).optional(),
  ownerEmails: z.array(z.string()).describe(
    "Required. Emails of the data product owners.",
  ).optional(),
  dataProductId: z.string().describe(
    "Optional. The ID of the data product to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ If not provided, a system generated ID will be used.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  accessApprovalConfig: z.object({
    approverEmails: z.array(z.string()),
  }).optional(),
  accessGroups: z.record(z.string(), z.unknown()).optional(),
  assetCount: z.number().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  icon: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  ownerEmails: z.array(z.string()).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessApprovalConfig: z.object({
    approverEmails: z.array(z.string()).describe(
      "Optional. Specifies the email addresses of users who are potential approvers and are notified when an access request is made for the data product. The maximum number of emails allowed is 10.",
    ).optional(),
  }).describe("Configuration for access approval for the data product.")
    .optional(),
  accessGroups: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "Optional. Description of the access group.",
      ).optional(),
      displayName: z.string().describe(
        'Required. User friendly display name of the access group. Eg. "Analyst", "Developer", etc.',
      ).optional(),
      id: z.string().describe(
        'Required. Unique identifier of the access group within the data product. User defined. Eg. "analyst", "developer", etc.',
      ).optional(),
      principal: z.object({
        googleGroup: z.string().describe(
          "Optional. Email of the Google Group, as per https://cloud.google.com/iam/docs/principals-overview#google-group.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Optional. Specifies the email of the producer service account, as per https://cloud.google.com/iam/docs/principals-overview#service-account.",
        ).optional(),
      }).describe(
        "Represents the principal entity associated with an access group, as per https://cloud.google.com/iam/docs/principals-overview.",
      ).optional(),
    }),
  ).describe(
    'Optional. Data product access groups by access group id as key. If data product is used only for packaging data assets, then access groups may be empty. However, if a data product is used for sharing data assets, then at least one access group must be specified.Example: { "analyst": { "id": "analyst", "displayName": "Analyst", "description": "Access group for analysts", "principal": { "googleGroup": "analysts@example.com" } } }',
  ).optional(),
  description: z.string().describe("Optional. Description of the data product.")
    .optional(),
  displayName: z.string().describe(
    "Required. User-friendly display name of the data product.",
  ).optional(),
  icon: z.string().describe(
    "Optional. Base64 encoded image representing the data product. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. User-defined labels for the data product.Example: { "environment": "production", "billing": "marketing-department" }',
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the data product. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}.",
  ).optional(),
  ownerEmails: z.array(z.string()).describe(
    "Required. Emails of the data product owners.",
  ).optional(),
  dataProductId: z.string().describe(
    "Optional. The ID of the data product to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ If not provided, a system generated ID will be used.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex DataProducts. Registered at `@swamp/gcp/dataplex/dataproducts`. */
export const model = {
  type: "@swamp/gcp/dataplex/dataproducts",
  version: "2026.05.18.2",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: accessApprovalConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A data product is a curated collection of data assets, packaged to address sp...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataProducts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["accessApprovalConfig"] !== undefined) {
          body["accessApprovalConfig"] = g["accessApprovalConfig"];
        }
        if (g["accessGroups"] !== undefined) {
          body["accessGroups"] = g["accessGroups"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["icon"] !== undefined) body["icon"] = g["icon"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["ownerEmails"] !== undefined) {
          body["ownerEmails"] = g["ownerEmails"];
        }
        if (g["dataProductId"] !== undefined) {
          body["dataProductId"] = g["dataProductId"];
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
      description: "Get a dataProducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataProducts"),
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
      description: "Update dataProducts attributes",
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
        if (g["accessApprovalConfig"] !== undefined) {
          body["accessApprovalConfig"] = g["accessApprovalConfig"];
        }
        if (g["accessGroups"] !== undefined) {
          body["accessGroups"] = g["accessGroups"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["icon"] !== undefined) body["icon"] = g["icon"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ownerEmails"] !== undefined) {
          body["ownerEmails"] = g["ownerEmails"];
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
      description: "Delete the dataProducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataProducts"),
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
      description: "Sync dataProducts state from GCP",
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
    request_access: {
      description: "request access",
      arguments: z.object({
        changeRequest: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["changeRequest"] !== undefined) {
          body["changeRequest"] = args["changeRequest"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataplex.projects.locations.dataProducts.requestAccess",
            "path": "v1/{+parent}:requestAccess",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
