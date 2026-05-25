// Auto-generated extension model for @swamp/gcp/discoveryengine/collections-datastores-branches-documents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine Collections.DataStores.Branches.Documents.
 *
 * Document captures all raw metadata information of items to be recommended or searched.
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
  return `${parent}/documents/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.dataStores.branches.documents.get",
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
    "discoveryengine.projects.locations.collections.dataStores.branches.documents.create",
  "path": "v1/{+parent}/documents",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "documentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.dataStores.branches.documents.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
    "discoveryengine.projects.locations.collections.dataStores.branches.documents.delete",
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
    "discoveryengine.projects.locations.collections.dataStores.branches.documents.list",
  "path": "v1/{+parent}/documents",
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
  aclInfo: z.object({
    readers: z.array(z.object({
      idpWide: z.boolean().describe("All users within the Identity Provider.")
        .optional(),
      principals: z.array(z.object({
        externalEntityId: z.unknown().describe(
          "For 3P application identities which are not present in the customer identity provider.",
        ).optional(),
        groupId: z.unknown().describe(
          "Group identifier. For Google Workspace user account, group_id should be the google workspace group email. For non-google identity provider user account, group_id is the mapped group identifier configured during the workforcepool config.",
        ).optional(),
        userId: z.unknown().describe(
          "User identifier. For Google Workspace user account, user_id should be the google workspace user email. For non-google identity provider user account, user_id is the mapped user identifier configured during the workforcepool config.",
        ).optional(),
      })).describe("List of principals.").optional(),
    })).describe("Readers of the document.").optional(),
  }).describe("ACL Information of the Document.").optional(),
  content: z.object({
    mimeType: z.string().describe(
      "The MIME type of the content. Supported types: * `application/pdf` (PDF, only native PDFs are supported for now) * `text/html` (HTML) * `text/plain` (TXT) * `application/xml` or `text/xml` (XML) * `application/json` (JSON) * `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX) * `application/vnd.openxmlformats-officedocument.presentationml.presentation` (PPTX) * `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (XLSX) * `application/vnd.ms-excel.sheet.macroenabled.12` (XLSM) The following types are supported only if layout parser is enabled in the data store: * `image/bmp` (BMP) * `image/gif` (GIF) * `image/jpeg` (JPEG) * `image/png` (PNG) * `image/tiff` (TIFF) See https://www.iana.org/assignments/media-types/media-types.xhtml.",
    ).optional(),
    rawBytes: z.string().describe(
      "The content represented as a stream of bytes. The maximum length is 1,000,000 bytes (1 MB / ~0.95 MiB). Note: As with all `bytes` fields, this field is represented as pure binary in Protocol Buffers and base64-encoded string in JSON. For example, `abc123!?$*&()'-=@~` should be represented as `YWJjMTIzIT8kKiYoKSctPUB+` in JSON. See https://developers.google.com/protocol-buffers/docs/proto3#json.",
    ).optional(),
    uri: z.string().describe(
      "The URI of the content. Only Cloud Storage URIs (e.g. `gs://bucket-name/path/to/file`) are supported. The maximum file size is 2.5 MB for text-based formats, 200 MB for other formats.",
    ).optional(),
  }).describe("Unstructured data linked to this document.").optional(),
  id: z.string().describe(
    "Immutable. The identifier of the document. Id should conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 128 characters.",
  ).optional(),
  indexStatus: z.object({
    errorSamples: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe(
      "A sample of errors encountered while indexing the document. If this field is populated, the document is not indexed due to errors.",
    ).optional(),
    indexTime: z.string().describe(
      "The time when the document was indexed. If this field is populated, it means the document has been indexed. While documents typically become searchable within seconds of indexing, it can sometimes take up to a few hours.",
    ).optional(),
    pendingMessage: z.string().describe(
      "Immutable. The message indicates the document index is in progress. If this field is populated, the document index is pending.",
    ).optional(),
  }).describe("Index status of the document.").optional(),
  jsonData: z.string().describe(
    "The JSON string representation of the document. It should conform to the registered Schema or an `INVALID_ARGUMENT` error is thrown.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the document. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  parentDocumentId: z.string().describe(
    "The identifier of the parent document. Currently supports at most two level document hierarchy. Id should conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 63 characters.",
  ).optional(),
  schemaId: z.string().describe(
    "The identifier of the schema located in the same data store.",
  ).optional(),
  structData: z.record(z.string(), z.string()).describe(
    "The structured JSON data for the document. It should conform to the registered Schema or an `INVALID_ARGUMENT` error is thrown.",
  ).optional(),
  documentId: z.string().describe(
    "Required. The ID to use for the Document, which becomes the final component of the Document.name. If the caller does not have permission to create the Document, regardless of whether or not it exists, a `PERMISSION_DENIED` error is returned. This field must be unique among all Documents with the same parent. Otherwise, an `ALREADY_EXISTS` error is returned. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 128 characters. Otherwise, an `INVALID_ARGUMENT` error is returned.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aclInfo: z.object({
    readers: z.array(z.object({
      idpWide: z.boolean(),
      principals: z.array(z.object({
        externalEntityId: z.unknown(),
        groupId: z.unknown(),
        userId: z.unknown(),
      })),
    })),
  }).optional(),
  content: z.object({
    mimeType: z.string(),
    rawBytes: z.string(),
    uri: z.string(),
  }).optional(),
  derivedStructData: z.record(z.string(), z.unknown()).optional(),
  id: z.string().optional(),
  indexStatus: z.object({
    errorSamples: z.array(z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    })),
    indexTime: z.string(),
    pendingMessage: z.string(),
  }).optional(),
  indexTime: z.string().optional(),
  jsonData: z.string().optional(),
  name: z.string(),
  parentDocumentId: z.string().optional(),
  schemaId: z.string().optional(),
  structData: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  aclInfo: z.object({
    readers: z.array(z.object({
      idpWide: z.boolean().describe("All users within the Identity Provider.")
        .optional(),
      principals: z.array(z.object({
        externalEntityId: z.unknown().describe(
          "For 3P application identities which are not present in the customer identity provider.",
        ).optional(),
        groupId: z.unknown().describe(
          "Group identifier. For Google Workspace user account, group_id should be the google workspace group email. For non-google identity provider user account, group_id is the mapped group identifier configured during the workforcepool config.",
        ).optional(),
        userId: z.unknown().describe(
          "User identifier. For Google Workspace user account, user_id should be the google workspace user email. For non-google identity provider user account, user_id is the mapped user identifier configured during the workforcepool config.",
        ).optional(),
      })).describe("List of principals.").optional(),
    })).describe("Readers of the document.").optional(),
  }).describe("ACL Information of the Document.").optional(),
  content: z.object({
    mimeType: z.string().describe(
      "The MIME type of the content. Supported types: * `application/pdf` (PDF, only native PDFs are supported for now) * `text/html` (HTML) * `text/plain` (TXT) * `application/xml` or `text/xml` (XML) * `application/json` (JSON) * `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX) * `application/vnd.openxmlformats-officedocument.presentationml.presentation` (PPTX) * `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (XLSX) * `application/vnd.ms-excel.sheet.macroenabled.12` (XLSM) The following types are supported only if layout parser is enabled in the data store: * `image/bmp` (BMP) * `image/gif` (GIF) * `image/jpeg` (JPEG) * `image/png` (PNG) * `image/tiff` (TIFF) See https://www.iana.org/assignments/media-types/media-types.xhtml.",
    ).optional(),
    rawBytes: z.string().describe(
      "The content represented as a stream of bytes. The maximum length is 1,000,000 bytes (1 MB / ~0.95 MiB). Note: As with all `bytes` fields, this field is represented as pure binary in Protocol Buffers and base64-encoded string in JSON. For example, `abc123!?$*&()'-=@~` should be represented as `YWJjMTIzIT8kKiYoKSctPUB+` in JSON. See https://developers.google.com/protocol-buffers/docs/proto3#json.",
    ).optional(),
    uri: z.string().describe(
      "The URI of the content. Only Cloud Storage URIs (e.g. `gs://bucket-name/path/to/file`) are supported. The maximum file size is 2.5 MB for text-based formats, 200 MB for other formats.",
    ).optional(),
  }).describe("Unstructured data linked to this document.").optional(),
  id: z.string().describe(
    "Immutable. The identifier of the document. Id should conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 128 characters.",
  ).optional(),
  indexStatus: z.object({
    errorSamples: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe(
      "A sample of errors encountered while indexing the document. If this field is populated, the document is not indexed due to errors.",
    ).optional(),
    indexTime: z.string().describe(
      "The time when the document was indexed. If this field is populated, it means the document has been indexed. While documents typically become searchable within seconds of indexing, it can sometimes take up to a few hours.",
    ).optional(),
    pendingMessage: z.string().describe(
      "Immutable. The message indicates the document index is in progress. If this field is populated, the document index is pending.",
    ).optional(),
  }).describe("Index status of the document.").optional(),
  jsonData: z.string().describe(
    "The JSON string representation of the document. It should conform to the registered Schema or an `INVALID_ARGUMENT` error is thrown.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the document. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  parentDocumentId: z.string().describe(
    "The identifier of the parent document. Currently supports at most two level document hierarchy. Id should conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 63 characters.",
  ).optional(),
  schemaId: z.string().describe(
    "The identifier of the schema located in the same data store.",
  ).optional(),
  structData: z.record(z.string(), z.string()).describe(
    "The structured JSON data for the document. It should conform to the registered Schema or an `INVALID_ARGUMENT` error is thrown.",
  ).optional(),
  documentId: z.string().describe(
    "Required. The ID to use for the Document, which becomes the final component of the Document.name. If the caller does not have permission to create the Document, regardless of whether or not it exists, a `PERMISSION_DENIED` error is returned. This field must be unique among all Documents with the same parent. Otherwise, an `ALREADY_EXISTS` error is returned. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 128 characters. Otherwise, an `INVALID_ARGUMENT` error is returned.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine Collections.DataStores.Branches.Documents. Registered at `@swamp/gcp/discoveryengine/collections-datastores-branches-documents`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/collections-datastores-branches-documents",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Document captures all raw metadata information of items to be recommended or ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a documents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["aclInfo"] !== undefined) body["aclInfo"] = g["aclInfo"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["indexStatus"] !== undefined) {
          body["indexStatus"] = g["indexStatus"];
        }
        if (g["jsonData"] !== undefined) body["jsonData"] = g["jsonData"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentDocumentId"] !== undefined) {
          body["parentDocumentId"] = g["parentDocumentId"];
        }
        if (g["schemaId"] !== undefined) body["schemaId"] = g["schemaId"];
        if (g["structData"] !== undefined) body["structData"] = g["structData"];
        if (g["documentId"] !== undefined) body["documentId"] = g["documentId"];
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
      description: "Get a documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
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
      description: "Update documents attributes",
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
        if (g["aclInfo"] !== undefined) body["aclInfo"] = g["aclInfo"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["indexStatus"] !== undefined) {
          body["indexStatus"] = g["indexStatus"];
        }
        if (g["jsonData"] !== undefined) body["jsonData"] = g["jsonData"];
        if (g["parentDocumentId"] !== undefined) {
          body["parentDocumentId"] = g["parentDocumentId"];
        }
        if (g["schemaId"] !== undefined) body["schemaId"] = g["schemaId"];
        if (g["structData"] !== undefined) body["structData"] = g["structData"];
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
      description: "Delete the documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
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
      description: "Sync documents state from GCP",
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
    list: {
      description: "List documents resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of Documents to return. If unspecified, defaults to 100. The maximum allowed value is 1000. Values above 1000 are set to 1000. If this field is negative, an `INVALID_ARGUMENT` error is returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "documents",
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
    import: {
      description: "import",
      arguments: z.object({
        alloyDbSource: z.any().optional(),
        autoGenerateIds: z.any().optional(),
        bigquerySource: z.any().optional(),
        bigtableSource: z.any().optional(),
        cloudSqlSource: z.any().optional(),
        errorConfig: z.any().optional(),
        fhirStoreSource: z.any().optional(),
        firestoreSource: z.any().optional(),
        forceRefreshContent: z.any().optional(),
        gcsSource: z.any().optional(),
        idField: z.any().optional(),
        inlineSource: z.any().optional(),
        reconciliationMode: z.any().optional(),
        spannerSource: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["alloyDbSource"] !== undefined) {
          body["alloyDbSource"] = args["alloyDbSource"];
        }
        if (args["autoGenerateIds"] !== undefined) {
          body["autoGenerateIds"] = args["autoGenerateIds"];
        }
        if (args["bigquerySource"] !== undefined) {
          body["bigquerySource"] = args["bigquerySource"];
        }
        if (args["bigtableSource"] !== undefined) {
          body["bigtableSource"] = args["bigtableSource"];
        }
        if (args["cloudSqlSource"] !== undefined) {
          body["cloudSqlSource"] = args["cloudSqlSource"];
        }
        if (args["errorConfig"] !== undefined) {
          body["errorConfig"] = args["errorConfig"];
        }
        if (args["fhirStoreSource"] !== undefined) {
          body["fhirStoreSource"] = args["fhirStoreSource"];
        }
        if (args["firestoreSource"] !== undefined) {
          body["firestoreSource"] = args["firestoreSource"];
        }
        if (args["forceRefreshContent"] !== undefined) {
          body["forceRefreshContent"] = args["forceRefreshContent"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        if (args["idField"] !== undefined) body["idField"] = args["idField"];
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        if (args["reconciliationMode"] !== undefined) {
          body["reconciliationMode"] = args["reconciliationMode"];
        }
        if (args["spannerSource"] !== undefined) {
          body["spannerSource"] = args["spannerSource"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.collections.dataStores.branches.documents.import",
            "path": "v1/{+parent}/documents:import",
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
    purge: {
      description: "purge",
      arguments: z.object({
        errorConfig: z.any().optional(),
        filter: z.any().optional(),
        force: z.any().optional(),
        gcsSource: z.any().optional(),
        inlineSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["errorConfig"] !== undefined) {
          body["errorConfig"] = args["errorConfig"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.collections.dataStores.branches.documents.purge",
            "path": "v1/{+parent}/documents:purge",
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
