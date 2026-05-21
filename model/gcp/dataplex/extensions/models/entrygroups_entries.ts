// Auto-generated extension model for @swamp/gcp/dataplex/entrygroups-entries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex EntryGroups.Entries.
 *
 * An entry is a representation of a data resource that can be described by various metadata.
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
  return `${parent}/entries/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.entryGroups.entries.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "aspectTypes": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "paths": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataplex.projects.locations.entryGroups.entries.create",
  "path": "v1/{+parent}/entries",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "entryId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.entryGroups.entries.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "aspectKeys": {
      "location": "query",
    },
    "deleteMissingAspects": {
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
  "id": "dataplex.projects.locations.entryGroups.entries.delete",
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
  "id": "dataplex.projects.locations.entryGroups.entries.list",
  "path": "v1/{+parent}/entries",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  aspects: z.record(
    z.string(),
    z.object({
      aspectSource: z.object({
        createTime: z.string().describe(
          "The time the aspect was created in the source system.",
        ).optional(),
        dataVersion: z.string().describe(
          "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
        ).optional(),
        updateTime: z.string().describe(
          "The time the aspect was last updated in the source system.",
        ).optional(),
      }).describe("Information related to the source system of the aspect.")
        .optional(),
      aspectType: z.string().describe(
        "Output only. The resource name of the type used to create this Aspect.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the Aspect was created.",
      ).optional(),
      data: z.record(z.string(), z.string()).describe(
        "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
      ).optional(),
      path: z.string().describe(
        "Output only. The path in the entry under which the aspect is attached.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the Aspect was last updated.",
      ).optional(),
    }),
  ).describe(
    "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
  ).optional(),
  entrySource: z.object({
    ancestors: z.array(z.object({
      name: z.string().describe("Optional. The name of the ancestor resource.")
        .optional(),
      type: z.string().describe("Optional. The type of the ancestor resource.")
        .optional(),
    })).describe(
      "Immutable. The entries representing the ancestors of the data resource in the source system.",
    ).optional(),
    createTime: z.string().describe(
      "The time when the resource was created in the source system.",
    ).optional(),
    description: z.string().describe(
      "A description of the data resource. Maximum length is 2,000 characters.",
    ).optional(),
    displayName: z.string().describe(
      "A user-friendly display name. Maximum length is 500 characters.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "User-defined labels. The maximum size of keys and values is 128 characters each.",
    ).optional(),
    location: z.string().describe(
      "Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud.",
    ).optional(),
    platform: z.string().describe(
      "The platform containing the source system. Maximum length is 64 characters.",
    ).optional(),
    resource: z.string().describe(
      "The name of the resource in the source system. Maximum length is 4,000 characters.",
    ).optional(),
    system: z.string().describe(
      "The name of the source system. Maximum length is 64 characters.",
    ).optional(),
    updateTime: z.string().describe(
      "The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time.",
    ).optional(),
  }).describe(
    "Information related to the source system of the data resource that is represented by the entry.",
  ).optional(),
  entryType: z.string().describe(
    "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
  ).optional(),
  fullyQualifiedName: z.string().describe(
    "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
  ).optional(),
  parentEntry: z.string().describe(
    "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
  ).optional(),
  entryId: z.string().describe(
    "Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aspects: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  entrySource: z.object({
    ancestors: z.array(z.object({
      name: z.string(),
      type: z.string(),
    })),
    createTime: z.string(),
    description: z.string(),
    displayName: z.string(),
    labels: z.record(z.string(), z.unknown()),
    location: z.string(),
    platform: z.string(),
    resource: z.string(),
    system: z.string(),
    updateTime: z.string(),
  }).optional(),
  entryType: z.string().optional(),
  fullyQualifiedName: z.string().optional(),
  name: z.string(),
  parentEntry: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  aspects: z.record(
    z.string(),
    z.object({
      aspectSource: z.object({
        createTime: z.string().describe(
          "The time the aspect was created in the source system.",
        ).optional(),
        dataVersion: z.string().describe(
          "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
        ).optional(),
        updateTime: z.string().describe(
          "The time the aspect was last updated in the source system.",
        ).optional(),
      }).describe("Information related to the source system of the aspect.")
        .optional(),
      aspectType: z.string().describe(
        "Output only. The resource name of the type used to create this Aspect.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the Aspect was created.",
      ).optional(),
      data: z.record(z.string(), z.string()).describe(
        "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
      ).optional(),
      path: z.string().describe(
        "Output only. The path in the entry under which the aspect is attached.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the Aspect was last updated.",
      ).optional(),
    }),
  ).describe(
    "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
  ).optional(),
  entrySource: z.object({
    ancestors: z.array(z.object({
      name: z.string().describe("Optional. The name of the ancestor resource.")
        .optional(),
      type: z.string().describe("Optional. The type of the ancestor resource.")
        .optional(),
    })).describe(
      "Immutable. The entries representing the ancestors of the data resource in the source system.",
    ).optional(),
    createTime: z.string().describe(
      "The time when the resource was created in the source system.",
    ).optional(),
    description: z.string().describe(
      "A description of the data resource. Maximum length is 2,000 characters.",
    ).optional(),
    displayName: z.string().describe(
      "A user-friendly display name. Maximum length is 500 characters.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "User-defined labels. The maximum size of keys and values is 128 characters each.",
    ).optional(),
    location: z.string().describe(
      "Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud.",
    ).optional(),
    platform: z.string().describe(
      "The platform containing the source system. Maximum length is 64 characters.",
    ).optional(),
    resource: z.string().describe(
      "The name of the resource in the source system. Maximum length is 4,000 characters.",
    ).optional(),
    system: z.string().describe(
      "The name of the source system. Maximum length is 64 characters.",
    ).optional(),
    updateTime: z.string().describe(
      "The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time.",
    ).optional(),
  }).describe(
    "Information related to the source system of the data resource that is represented by the entry.",
  ).optional(),
  entryType: z.string().describe(
    "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
  ).optional(),
  fullyQualifiedName: z.string().describe(
    "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
  ).optional(),
  parentEntry: z.string().describe(
    "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
  ).optional(),
  entryId: z.string().describe(
    "Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex EntryGroups.Entries. Registered at `@swamp/gcp/dataplex/entrygroups-entries`. */
export const model = {
  type: "@swamp/gcp/dataplex/entrygroups-entries",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An entry is a representation of a data resource that can be described by vari...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a entries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["aspects"] !== undefined) body["aspects"] = g["aspects"];
        if (g["entrySource"] !== undefined) {
          body["entrySource"] = g["entrySource"];
        }
        if (g["entryType"] !== undefined) body["entryType"] = g["entryType"];
        if (g["fullyQualifiedName"] !== undefined) {
          body["fullyQualifiedName"] = g["fullyQualifiedName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentEntry"] !== undefined) {
          body["parentEntry"] = g["parentEntry"];
        }
        if (g["entryId"] !== undefined) body["entryId"] = g["entryId"];
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
      description: "Get a entries",
      arguments: z.object({
        identifier: z.string().describe("The name of the entries"),
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
      description: "Update entries attributes",
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
        if (g["aspects"] !== undefined) body["aspects"] = g["aspects"];
        if (g["entrySource"] !== undefined) {
          body["entrySource"] = g["entrySource"];
        }
        if (g["fullyQualifiedName"] !== undefined) {
          body["fullyQualifiedName"] = g["fullyQualifiedName"];
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
      description: "Delete the entries",
      arguments: z.object({
        identifier: z.string().describe("The name of the entries"),
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
      description: "Sync entries state from GCP",
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
