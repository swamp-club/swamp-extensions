// Auto-generated extension model for @swamp/gcp/dataplex/aspecttypes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex AspectTypes.
 *
 * AspectType is a template for creating Aspects, and represents the JSON-schema for a given Entry, for example, BigQuery Table Schema.
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
  return `${parent}/aspectTypes/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.aspectTypes.get",
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
  "id": "dataplex.projects.locations.aspectTypes.create",
  "path": "v1/{+parent}/aspectTypes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "aspectTypeId": {
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
  "id": "dataplex.projects.locations.aspectTypes.patch",
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
  "id": "dataplex.projects.locations.aspectTypes.delete",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  authorization: z.object({
    alternateUsePermission: z.string().describe(
      "Immutable. The IAM permission grantable on the EntryGroup to allow access to instantiate Aspects of Dataplex Universal Catalog owned AspectTypes, only settable for Dataplex Universal Catalog owned Types.",
    ).optional(),
  }).describe("Authorization for an AspectType.").optional(),
  dataClassification: z.enum([
    "DATA_CLASSIFICATION_UNSPECIFIED",
    "METADATA_AND_DATA",
  ]).describe("Optional. Immutable. Stores data classification of the aspect.")
    .optional(),
  description: z.string().describe("Optional. Description of the AspectType.")
    .optional(),
  displayName: z.string().describe("Optional. User friendly display name.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the AspectType.",
  ).optional(),
  metadataTemplate: z.object({
    annotations: z.object({
      deprecated: z.string().describe(
        "Optional. Marks a field as deprecated. You can include a deprecation message.",
      ).optional(),
      description: z.string().describe("Optional. Description for a field.")
        .optional(),
      displayName: z.string().describe("Optional. Display name for a field.")
        .optional(),
      displayOrder: z.number().int().describe(
        "Optional. Display order for a field. You can use this to reorder where a field is rendered.",
      ).optional(),
      stringType: z.string().describe(
        "Optional. You can use String Type annotations to specify special meaning to string fields. The following values are supported: richText: The field must be interpreted as a rich text field. url: A fully qualified URL link. resource: A service qualified resource reference.",
      ).optional(),
      stringValues: z.array(z.string()).describe(
        "Optional. Suggested hints for string fields. You can use them to suggest values to users through console.",
      ).optional(),
    }).describe("Definition of the annotations of a field.").optional(),
    arrayItems: z.string().describe(
      "Circular reference to GoogleCloudDataplexV1AspectTypeMetadataTemplate",
    ).optional(),
    constraints: z.object({
      required: z.boolean().describe(
        "Optional. Marks this field as optional or required.",
      ).optional(),
    }).describe("Definition of the constraints of a field.").optional(),
    enumValues: z.array(z.object({
      deprecated: z.string().describe(
        "Optional. You can set this message if you need to deprecate an enum value.",
      ).optional(),
      index: z.number().int().describe(
        "Required. Index for the enum value. It can't be modified.",
      ).optional(),
      name: z.string().describe(
        "Required. Name of the enumvalue. This is the actual value that the aspect can contain.",
      ).optional(),
    })).describe(
      "Optional. The list of values for an enum type. You must define it if the type is enum.",
    ).optional(),
    index: z.number().int().describe(
      'Optional. Index is used to encode Template messages. The value of index can range between 1 and 2,147,483,647. Index must be unique within all fields in a Template. (Nested Templates can reuse indexes). Once a Template is defined, the index cannot be changed, because it identifies the field in the actual storage format. Index is a mandatory field, but it is optional for top level fields, and map/array "values" definitions.',
    ).optional(),
    mapItems: z.string().describe(
      "Circular reference to GoogleCloudDataplexV1AspectTypeMetadataTemplate",
    ).optional(),
    name: z.string().describe("Required. The name of the field.").optional(),
    recordFields: z.array(z.string()).describe(
      "Optional. Field definition. You must specify it if the type is record. It defines the nested fields.",
    ).optional(),
    type: z.string().describe(
      'Required. The datatype of this field. The following values are supported:Primitive types: string int bool double datetime. Must be of the format RFC3339 UTC "Zulu" (Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z").Complex types: enum array map record',
    ).optional(),
    typeId: z.string().describe(
      "Optional. You can use type id if this definition of the field needs to be reused later. The type id must be unique across the entire template. You can only specify it if the field type is record.",
    ).optional(),
    typeRef: z.string().describe(
      "Optional. A reference to another field definition (not an inline definition). The value must be equal to the value of an id field defined elsewhere in the MetadataTemplate. Only fields with record type can refer to other fields.",
    ).optional(),
  }).describe("MetadataTemplate definition for an AspectType.").optional(),
  aspectTypeId: z.string().describe("Required. AspectType identifier.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authorization: z.object({
    alternateUsePermission: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dataClassification: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadataTemplate: z.object({
    annotations: z.object({
      deprecated: z.string(),
      description: z.string(),
      displayName: z.string(),
      displayOrder: z.number(),
      stringType: z.string(),
      stringValues: z.array(z.string()),
    }),
    arrayItems: z.string(),
    constraints: z.object({
      required: z.boolean(),
    }),
    enumValues: z.array(z.object({
      deprecated: z.string(),
      index: z.number(),
      name: z.string(),
    })),
    index: z.number(),
    mapItems: z.string(),
    name: z.string(),
    recordFields: z.array(z.string()),
    type: z.string(),
    typeId: z.string(),
    typeRef: z.string(),
  }).optional(),
  name: z.string(),
  transferStatus: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  authorization: z.object({
    alternateUsePermission: z.string().describe(
      "Immutable. The IAM permission grantable on the EntryGroup to allow access to instantiate Aspects of Dataplex Universal Catalog owned AspectTypes, only settable for Dataplex Universal Catalog owned Types.",
    ).optional(),
  }).describe("Authorization for an AspectType.").optional(),
  dataClassification: z.enum([
    "DATA_CLASSIFICATION_UNSPECIFIED",
    "METADATA_AND_DATA",
  ]).describe("Optional. Immutable. Stores data classification of the aspect.")
    .optional(),
  description: z.string().describe("Optional. Description of the AspectType.")
    .optional(),
  displayName: z.string().describe("Optional. User friendly display name.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the AspectType.",
  ).optional(),
  metadataTemplate: z.object({
    annotations: z.object({
      deprecated: z.string().describe(
        "Optional. Marks a field as deprecated. You can include a deprecation message.",
      ).optional(),
      description: z.string().describe("Optional. Description for a field.")
        .optional(),
      displayName: z.string().describe("Optional. Display name for a field.")
        .optional(),
      displayOrder: z.number().int().describe(
        "Optional. Display order for a field. You can use this to reorder where a field is rendered.",
      ).optional(),
      stringType: z.string().describe(
        "Optional. You can use String Type annotations to specify special meaning to string fields. The following values are supported: richText: The field must be interpreted as a rich text field. url: A fully qualified URL link. resource: A service qualified resource reference.",
      ).optional(),
      stringValues: z.array(z.string()).describe(
        "Optional. Suggested hints for string fields. You can use them to suggest values to users through console.",
      ).optional(),
    }).describe("Definition of the annotations of a field.").optional(),
    arrayItems: z.string().describe(
      "Circular reference to GoogleCloudDataplexV1AspectTypeMetadataTemplate",
    ).optional(),
    constraints: z.object({
      required: z.boolean().describe(
        "Optional. Marks this field as optional or required.",
      ).optional(),
    }).describe("Definition of the constraints of a field.").optional(),
    enumValues: z.array(z.object({
      deprecated: z.string().describe(
        "Optional. You can set this message if you need to deprecate an enum value.",
      ).optional(),
      index: z.number().int().describe(
        "Required. Index for the enum value. It can't be modified.",
      ).optional(),
      name: z.string().describe(
        "Required. Name of the enumvalue. This is the actual value that the aspect can contain.",
      ).optional(),
    })).describe(
      "Optional. The list of values for an enum type. You must define it if the type is enum.",
    ).optional(),
    index: z.number().int().describe(
      'Optional. Index is used to encode Template messages. The value of index can range between 1 and 2,147,483,647. Index must be unique within all fields in a Template. (Nested Templates can reuse indexes). Once a Template is defined, the index cannot be changed, because it identifies the field in the actual storage format. Index is a mandatory field, but it is optional for top level fields, and map/array "values" definitions.',
    ).optional(),
    mapItems: z.string().describe(
      "Circular reference to GoogleCloudDataplexV1AspectTypeMetadataTemplate",
    ).optional(),
    name: z.string().describe("Required. The name of the field.").optional(),
    recordFields: z.array(z.string()).describe(
      "Optional. Field definition. You must specify it if the type is record. It defines the nested fields.",
    ).optional(),
    type: z.string().describe(
      'Required. The datatype of this field. The following values are supported:Primitive types: string int bool double datetime. Must be of the format RFC3339 UTC "Zulu" (Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z").Complex types: enum array map record',
    ).optional(),
    typeId: z.string().describe(
      "Optional. You can use type id if this definition of the field needs to be reused later. The type id must be unique across the entire template. You can only specify it if the field type is record.",
    ).optional(),
    typeRef: z.string().describe(
      "Optional. A reference to another field definition (not an inline definition). The value must be equal to the value of an id field defined elsewhere in the MetadataTemplate. Only fields with record type can refer to other fields.",
    ).optional(),
  }).describe("MetadataTemplate definition for an AspectType.").optional(),
  aspectTypeId: z.string().describe("Required. AspectType identifier.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex AspectTypes. Registered at `@swamp/gcp/dataplex/aspecttypes`. */
export const model = {
  type: "@swamp/gcp/dataplex/aspecttypes",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "AspectType is a template for creating Aspects, and represents the JSON-schema...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a aspectTypes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["authorization"] !== undefined) {
          body["authorization"] = g["authorization"];
        }
        if (g["dataClassification"] !== undefined) {
          body["dataClassification"] = g["dataClassification"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadataTemplate"] !== undefined) {
          body["metadataTemplate"] = g["metadataTemplate"];
        }
        if (g["aspectTypeId"] !== undefined) {
          body["aspectTypeId"] = g["aspectTypeId"];
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
      description: "Get a aspectTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the aspectTypes"),
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
      description: "Update aspectTypes attributes",
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
        if (g["authorization"] !== undefined) {
          body["authorization"] = g["authorization"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadataTemplate"] !== undefined) {
          body["metadataTemplate"] = g["metadataTemplate"];
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
      description: "Delete the aspectTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the aspectTypes"),
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
      description: "Sync aspectTypes state from GCP",
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
