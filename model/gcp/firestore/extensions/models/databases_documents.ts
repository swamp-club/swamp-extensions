// Auto-generated extension model for @swamp/gcp/firestore/databases-documents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firestore Databases.Documents.
 *
 * A Firestore document. Must not exceed 1 MiB - 4 bytes.
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

const BASE_URL = "https://firestore.googleapis.com/";

const GET_CONFIG = {
  "id": "firestore.projects.databases.documents.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "mask.fieldPaths": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "readTime": {
      "location": "query",
    },
    "transaction": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "firestore.projects.databases.documents.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "currentDocument.exists": {
      "location": "query",
    },
    "currentDocument.updateTime": {
      "location": "query",
    },
    "mask.fieldPaths": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask.fieldPaths": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "firestore.projects.databases.documents.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "currentDocument.exists": {
      "location": "query",
    },
    "currentDocument.updateTime": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "firestore.projects.databases.documents.list",
  "path": "v1/{+parent}/{collectionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
    "collectionId",
  ],
  "parameters": {
    "collectionId": {
      "location": "path",
      "required": true,
    },
    "mask.fieldPaths": {
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
    "readTime": {
      "location": "query",
    },
    "showMissing": {
      "location": "query",
    },
    "transaction": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  createTime: z.string().describe(
    "Output only. The time at which the document was created. This value increases monotonically when a document is deleted then recreated. It can also be compared to values from other documents and the `read_time` of a query.",
  ).optional(),
  fields: z.record(
    z.string(),
    z.object({
      arrayValue: z.object({
        values: z.array(z.string()).describe("Values in the array.").optional(),
      }).describe("An array value.").optional(),
      booleanValue: z.boolean().describe("A boolean value.").optional(),
      bytesValue: z.string().describe(
        "A bytes value. Must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes are considered by queries.",
      ).optional(),
      doubleValue: z.number().describe("A double value.").optional(),
      fieldReferenceValue: z.string().describe(
        "Value which references a field. This is considered relative (vs absolute) since it only refers to a field and not a field within a particular document. **Requires:** * Must follow field reference limitations. * Not allowed to be used when writing documents.",
      ).optional(),
      functionValue: z.object({
        args: z.array(z.string()).describe(
          "Optional. Ordered list of arguments the given function expects.",
        ).optional(),
        name: z.string().describe(
          "Required. The name of the function to evaluate. **Requires:** * must be in snake case (lower case with underscore separator).",
        ).optional(),
        options: z.record(z.string(), z.string()).describe(
          "Optional. Optional named arguments that certain functions may support.",
        ).optional(),
      }).describe(
        'Represents an unevaluated scalar expression. For example, the expression `like(user_name, "%alice%")` is represented as: ` name: "like" args { field_reference: "user_name" } args { string_value: "%alice%" } `',
      ).optional(),
      geoPointValue: z.object({
        latitude: z.number().describe(
          "The latitude in degrees. It must be in the range [-90.0, +90.0].",
        ).optional(),
        longitude: z.number().describe(
          "The longitude in degrees. It must be in the range [-180.0, +180.0].",
        ).optional(),
      }).describe(
        "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
      ).optional(),
      integerValue: z.string().describe("An integer value.").optional(),
      mapValue: z.object({
        fields: z.record(z.string(), z.string()).describe(
          "The map's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty.",
        ).optional(),
      }).describe("A map value.").optional(),
      nullValue: z.enum(["NULL_VALUE"]).describe("A null value.").optional(),
      pipelineValue: z.object({
        stages: z.array(z.object({
          args: z.unknown().describe(
            "Optional. Ordered list of arguments the given stage expects.",
          ).optional(),
          name: z.unknown().describe(
            "Required. The name of the stage to evaluate. **Requires:** * must be in snake case (lower case with underscore separator).",
          ).optional(),
          options: z.unknown().describe(
            "Optional. Optional named arguments that certain functions may support.",
          ).optional(),
        })).describe("Required. Ordered list of stages to evaluate.")
          .optional(),
      }).describe(
        "A Firestore query represented as an ordered list of operations / stages.",
      ).optional(),
      referenceValue: z.string().describe(
        "A reference to a document. For example: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.",
      ).optional(),
      stringValue: z.string().describe(
        "A string value. The string, represented as UTF-8, must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes of the UTF-8 representation are considered by queries.",
      ).optional(),
      timestampValue: z.string().describe(
        "A timestamp value. Precise only to microseconds. When stored, any additional precision is rounded down.",
      ).optional(),
      variableReferenceValue: z.string().describe(
        "Pointer to a variable defined elsewhere in a pipeline. Unlike `field_reference_value` which references a field within a document, this refers to a variable, defined in a separate namespace than the fields of a document.",
      ).optional(),
    }),
  ).describe(
    'The document\'s fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The field names, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. Field paths may be used in other contexts to refer to structured fields defined here. For `map_value`, the field path is represented by a dot-delimited (`.`) string of segments. Each segment is either a simple field name (defined below) or a quoted field name. For example, the structured field `"foo": { map_value: { "x&y": { string_value: "hello" }}}` would be represented by the field path `` foo.`x&y` ``. A simple field name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`, and must not start with `0` to `9`. For example, `foo_bar_17`. A quoted field name starts and ends with `` ` and may contain any character. Some characters, including ` ``, must be escaped using a `\\`. For example, `` `x&y` `` represents `x&y` and `` `bak\\`tik` represents bak`tik ``.',
  ).optional(),
  name: z.string().describe(
    "The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time at which the document was last changed. This value is initially set to the `create_time` then increases monotonically with each change to the document. It can also be compared to values from other documents and the `read_time` of a query.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  createTime: z.string().describe(
    "Output only. The time at which the document was created. This value increases monotonically when a document is deleted then recreated. It can also be compared to values from other documents and the `read_time` of a query.",
  ).optional(),
  fields: z.record(
    z.string(),
    z.object({
      arrayValue: z.object({
        values: z.array(z.string()).describe("Values in the array.").optional(),
      }).describe("An array value.").optional(),
      booleanValue: z.boolean().describe("A boolean value.").optional(),
      bytesValue: z.string().describe(
        "A bytes value. Must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes are considered by queries.",
      ).optional(),
      doubleValue: z.number().describe("A double value.").optional(),
      fieldReferenceValue: z.string().describe(
        "Value which references a field. This is considered relative (vs absolute) since it only refers to a field and not a field within a particular document. **Requires:** * Must follow field reference limitations. * Not allowed to be used when writing documents.",
      ).optional(),
      functionValue: z.object({
        args: z.array(z.string()).describe(
          "Optional. Ordered list of arguments the given function expects.",
        ).optional(),
        name: z.string().describe(
          "Required. The name of the function to evaluate. **Requires:** * must be in snake case (lower case with underscore separator).",
        ).optional(),
        options: z.record(z.string(), z.string()).describe(
          "Optional. Optional named arguments that certain functions may support.",
        ).optional(),
      }).describe(
        'Represents an unevaluated scalar expression. For example, the expression `like(user_name, "%alice%")` is represented as: ` name: "like" args { field_reference: "user_name" } args { string_value: "%alice%" } `',
      ).optional(),
      geoPointValue: z.object({
        latitude: z.number().describe(
          "The latitude in degrees. It must be in the range [-90.0, +90.0].",
        ).optional(),
        longitude: z.number().describe(
          "The longitude in degrees. It must be in the range [-180.0, +180.0].",
        ).optional(),
      }).describe(
        "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
      ).optional(),
      integerValue: z.string().describe("An integer value.").optional(),
      mapValue: z.object({
        fields: z.record(z.string(), z.string()).describe(
          "The map's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty.",
        ).optional(),
      }).describe("A map value.").optional(),
      nullValue: z.enum(["NULL_VALUE"]).describe("A null value.").optional(),
      pipelineValue: z.object({
        stages: z.array(z.object({
          args: z.unknown().describe(
            "Optional. Ordered list of arguments the given stage expects.",
          ).optional(),
          name: z.unknown().describe(
            "Required. The name of the stage to evaluate. **Requires:** * must be in snake case (lower case with underscore separator).",
          ).optional(),
          options: z.unknown().describe(
            "Optional. Optional named arguments that certain functions may support.",
          ).optional(),
        })).describe("Required. Ordered list of stages to evaluate.")
          .optional(),
      }).describe(
        "A Firestore query represented as an ordered list of operations / stages.",
      ).optional(),
      referenceValue: z.string().describe(
        "A reference to a document. For example: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.",
      ).optional(),
      stringValue: z.string().describe(
        "A string value. The string, represented as UTF-8, must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes of the UTF-8 representation are considered by queries.",
      ).optional(),
      timestampValue: z.string().describe(
        "A timestamp value. Precise only to microseconds. When stored, any additional precision is rounded down.",
      ).optional(),
      variableReferenceValue: z.string().describe(
        "Pointer to a variable defined elsewhere in a pipeline. Unlike `field_reference_value` which references a field within a document, this refers to a variable, defined in a separate namespace than the fields of a document.",
      ).optional(),
    }),
  ).describe(
    'The document\'s fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The field names, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. Field paths may be used in other contexts to refer to structured fields defined here. For `map_value`, the field path is represented by a dot-delimited (`.`) string of segments. Each segment is either a simple field name (defined below) or a quoted field name. For example, the structured field `"foo": { map_value: { "x&y": { string_value: "hello" }}}` would be represented by the field path `` foo.`x&y` ``. A simple field name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`, and must not start with `0` to `9`. For example, `foo_bar_17`. A quoted field name starts and ends with `` ` and may contain any character. Some characters, including ` ``, must be escaped using a `\\`. For example, `` `x&y` `` represents `x&y` and `` `bak\\`tik` represents bak`tik ``.',
  ).optional(),
  name: z.string().describe(
    "The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time at which the document was last changed. This value is initially set to the `create_time` then increases monotonically with each change to the document. It can also be compared to values from other documents and the `read_time` of a query.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firestore Databases.Documents. Registered at `@swamp/gcp/firestore/databases-documents`. */
export const model = {
  type: "@swamp/gcp/firestore/databases-documents",
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
      description: "A Firestore document. Must not exceed 1 MiB - 4 bytes.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
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
        params["name"] = args.identifier;
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
        mask_fieldPaths: z.string().describe(
          "The list of field paths in the mask. See Document.fields for a field path syntax reference.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value.",
        ).optional(),
        readTime: z.string().describe(
          "Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days.",
        ).optional(),
        showMissing: z.boolean().describe(
          "If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`.",
        ).optional(),
        transaction: z.string().describe(
          "Perform the read as part of an already active transaction.",
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
        if (g["collectionId"] !== undefined) {
          params["collectionId"] = String(g["collectionId"]);
        }
        if (args["mask_fieldPaths"] !== undefined) {
          params["mask.fieldPaths"] = String(args["mask_fieldPaths"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["readTime"] !== undefined) {
          params["readTime"] = String(args["readTime"]);
        }
        if (args["showMissing"] !== undefined) {
          params["showMissing"] = String(args["showMissing"]);
        }
        if (args["transaction"] !== undefined) {
          params["transaction"] = String(args["transaction"]);
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
    batch_get: {
      description: "batch get",
      arguments: z.object({
        documents: z.any().optional(),
        mask: z.any().optional(),
        newTransaction: z.any().optional(),
        readTime: z.any().optional(),
        transaction: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["documents"] !== undefined) {
          body["documents"] = args["documents"];
        }
        if (args["mask"] !== undefined) body["mask"] = args["mask"];
        if (args["newTransaction"] !== undefined) {
          body["newTransaction"] = args["newTransaction"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.batchGet",
            "path": "v1/{+database}/documents:batchGet",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_write: {
      description: "batch write",
      arguments: z.object({
        labels: z.any().optional(),
        writes: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["writes"] !== undefined) body["writes"] = args["writes"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.batchWrite",
            "path": "v1/{+database}/documents:batchWrite",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    begin_transaction: {
      description: "begin transaction",
      arguments: z.object({
        options: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.beginTransaction",
            "path": "v1/{+database}/documents:beginTransaction",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    commit: {
      description: "commit",
      arguments: z.object({
        transaction: z.any().optional(),
        writes: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        if (args["writes"] !== undefined) body["writes"] = args["writes"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.commit",
            "path": "v1/{+database}/documents:commit",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    create_document: {
      description: "create document",
      arguments: z.object({
        createTime: z.any().optional(),
        fields: z.any().optional(),
        name: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        params["collectionId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["fields"] !== undefined) body["fields"] = args["fields"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.createDocument",
            "path": "v1/{+parent}/{collectionId}",
            "httpMethod": "POST",
            "parameterOrder": ["parent", "collectionId"],
            "parameters": {
              "collectionId": { "location": "path", "required": true },
              "documentId": { "location": "query" },
              "mask.fieldPaths": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    execute_pipeline: {
      description: "execute pipeline",
      arguments: z.object({
        newTransaction: z.any().optional(),
        readTime: z.any().optional(),
        structuredPipeline: z.any().optional(),
        transaction: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["newTransaction"] !== undefined) {
          body["newTransaction"] = args["newTransaction"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        if (args["structuredPipeline"] !== undefined) {
          body["structuredPipeline"] = args["structuredPipeline"];
        }
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.executePipeline",
            "path": "v1/{+database}/documents:executePipeline",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_collection_ids: {
      description: "list collection ids",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        readTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.listCollectionIds",
            "path": "v1/{+parent}:listCollectionIds",
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
    list_documents: {
      description: "list documents",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        params["collectionId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.listDocuments",
            "path": "v1/{+parent}/{collectionId}",
            "httpMethod": "GET",
            "parameterOrder": ["parent", "collectionId"],
            "parameters": {
              "collectionId": { "location": "path", "required": true },
              "mask.fieldPaths": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "readTime": { "location": "query" },
              "showMissing": { "location": "query" },
              "transaction": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    listen: {
      description: "listen",
      arguments: z.object({
        addTarget: z.any().optional(),
        labels: z.any().optional(),
        removeTarget: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addTarget"] !== undefined) {
          body["addTarget"] = args["addTarget"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["removeTarget"] !== undefined) {
          body["removeTarget"] = args["removeTarget"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.listen",
            "path": "v1/{+database}/documents:listen",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    partition_query: {
      description: "partition query",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        partitionCount: z.any().optional(),
        readTime: z.any().optional(),
        structuredQuery: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["partitionCount"] !== undefined) {
          body["partitionCount"] = args["partitionCount"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        if (args["structuredQuery"] !== undefined) {
          body["structuredQuery"] = args["structuredQuery"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.partitionQuery",
            "path": "v1/{+parent}:partitionQuery",
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
    rollback: {
      description: "rollback",
      arguments: z.object({
        transaction: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.rollback",
            "path": "v1/{+database}/documents:rollback",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    run_aggregation_query: {
      description: "run aggregation query",
      arguments: z.object({
        explainOptions: z.any().optional(),
        newTransaction: z.any().optional(),
        readTime: z.any().optional(),
        structuredAggregationQuery: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["explainOptions"] !== undefined) {
          body["explainOptions"] = args["explainOptions"];
        }
        if (args["newTransaction"] !== undefined) {
          body["newTransaction"] = args["newTransaction"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        if (args["structuredAggregationQuery"] !== undefined) {
          body["structuredAggregationQuery"] =
            args["structuredAggregationQuery"];
        }
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.runAggregationQuery",
            "path": "v1/{+parent}:runAggregationQuery",
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
    run_query: {
      description: "run query",
      arguments: z.object({
        explainOptions: z.any().optional(),
        newTransaction: z.any().optional(),
        readTime: z.any().optional(),
        structuredQuery: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["explainOptions"] !== undefined) {
          body["explainOptions"] = args["explainOptions"];
        }
        if (args["newTransaction"] !== undefined) {
          body["newTransaction"] = args["newTransaction"];
        }
        if (args["readTime"] !== undefined) body["readTime"] = args["readTime"];
        if (args["structuredQuery"] !== undefined) {
          body["structuredQuery"] = args["structuredQuery"];
        }
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.runQuery",
            "path": "v1/{+parent}:runQuery",
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
    write: {
      description: "write",
      arguments: z.object({
        labels: z.any().optional(),
        streamId: z.any().optional(),
        streamToken: z.any().optional(),
        writes: z.any().optional(),
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
        params["database"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["streamId"] !== undefined) body["streamId"] = args["streamId"];
        if (args["streamToken"] !== undefined) {
          body["streamToken"] = args["streamToken"];
        }
        if (args["writes"] !== undefined) body["writes"] = args["writes"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.documents.write",
            "path": "v1/{+database}/documents:write",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
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
