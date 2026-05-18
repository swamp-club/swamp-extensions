// Auto-generated extension model for @swamp/gcp/datacatalog/entrygroups-entries-tags
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Cloud Data Catalog EntryGroups.Entries.Tags.
 *
 * Tags contain custom metadata and are attached to Data Catalog resources. Tags conform with the specification of their tag template. See [Data Catalog IAM](https://cloud.google.com/data-catalog/docs/concepts/iam) for information on the permissions needed to create or view tags.
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
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://datacatalog.googleapis.com/";

const INSERT_CONFIG = {
  "id": "datacatalog.projects.locations.entryGroups.entries.tags.create",
  "path": "v1/{+parent}/tags",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datacatalog.projects.locations.entryGroups.entries.tags.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "datacatalog.projects.locations.entryGroups.entries.tags.delete",
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
  "id": "datacatalog.projects.locations.entryGroups.entries.tags.list",
  "path": "v1/{+parent}/tags",
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
  column: z.string().describe(
    "Resources like entry can have schemas associated with them. This scope allows you to attach tags to an individual column based on that schema. To attach a tag to a nested column, separate column names with a dot (`.`). Example: `column.nested_column`.",
  ).optional(),
  fields: z.record(
    z.string(),
    z.object({
      boolValue: z.boolean().describe(
        "The value of a tag field with a boolean type.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The display name of this field.",
      ).optional(),
      doubleValue: z.number().describe(
        "The value of a tag field with a double type.",
      ).optional(),
      enumValue: z.object({
        displayName: z.string().describe("The display name of the enum value.")
          .optional(),
      }).describe("An enum value.").optional(),
      order: z.number().int().describe(
        "Output only. The order of this field with respect to other fields in this tag. Can be set by Tag. For example, a higher value can indicate a more important field. The value can be negative. Multiple fields can have the same order, and field orders within a tag don't have to be sequential.",
      ).optional(),
      richtextValue: z.string().describe(
        "The value of a tag field with a rich text type. The maximum length is 10 MiB as this value holds HTML descriptions including encoded images. The maximum length of the text without images is 100 KiB.",
      ).optional(),
      stringValue: z.string().describe(
        "The value of a tag field with a string type. The maximum length is 2000 UTF-8 characters.",
      ).optional(),
      timestampValue: z.string().describe(
        "The value of a tag field with a timestamp type.",
      ).optional(),
    }),
  ).describe(
    "Required. Maps the ID of a tag field to its value and additional information about that field. Tag template defines valid field IDs. A tag must have at least 1 field and at most 500 fields.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the tag in URL format where tag ID is a system-generated identifier. Note: The tag itself might not be stored in the location specified in its name.",
  ).optional(),
  template: z.string().describe(
    "Required. The resource name of the tag template this tag uses. Example: `projects/{PROJECT_ID}/locations/{LOCATION}/tagTemplates/{TAG_TEMPLATE_ID}` This field cannot be modified after creation.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  column: z.string().optional(),
  dataplexTransferStatus: z.string().optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  template: z.string().optional(),
  templateDisplayName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  column: z.string().describe(
    "Resources like entry can have schemas associated with them. This scope allows you to attach tags to an individual column based on that schema. To attach a tag to a nested column, separate column names with a dot (`.`). Example: `column.nested_column`.",
  ).optional(),
  fields: z.record(
    z.string(),
    z.object({
      boolValue: z.boolean().describe(
        "The value of a tag field with a boolean type.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The display name of this field.",
      ).optional(),
      doubleValue: z.number().describe(
        "The value of a tag field with a double type.",
      ).optional(),
      enumValue: z.object({
        displayName: z.string().describe("The display name of the enum value.")
          .optional(),
      }).describe("An enum value.").optional(),
      order: z.number().int().describe(
        "Output only. The order of this field with respect to other fields in this tag. Can be set by Tag. For example, a higher value can indicate a more important field. The value can be negative. Multiple fields can have the same order, and field orders within a tag don't have to be sequential.",
      ).optional(),
      richtextValue: z.string().describe(
        "The value of a tag field with a rich text type. The maximum length is 10 MiB as this value holds HTML descriptions including encoded images. The maximum length of the text without images is 100 KiB.",
      ).optional(),
      stringValue: z.string().describe(
        "The value of a tag field with a string type. The maximum length is 2000 UTF-8 characters.",
      ).optional(),
      timestampValue: z.string().describe(
        "The value of a tag field with a timestamp type.",
      ).optional(),
    }),
  ).describe(
    "Required. Maps the ID of a tag field to its value and additional information about that field. Tag template defines valid field IDs. A tag must have at least 1 field and at most 500 fields.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the tag in URL format where tag ID is a system-generated identifier. Note: The tag itself might not be stored in the location specified in its name.",
  ).optional(),
  template: z.string().describe(
    "Required. The resource name of the tag template this tag uses. Example: `projects/{PROJECT_ID}/locations/{LOCATION}/tagTemplates/{TAG_TEMPLATE_ID}` This field cannot be modified after creation.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Cloud Data Catalog EntryGroups.Entries.Tags. Registered at `@swamp/gcp/datacatalog/entrygroups-entries-tags`. */
export const model = {
  type: "@swamp/gcp/datacatalog/entrygroups-entries-tags",
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
        "Tags contain custom metadata and are attached to Data Catalog resources. Tags...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tags",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["column"] !== undefined) body["column"] = g["column"];
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["template"] !== undefined) body["template"] = g["template"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
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
      description: "Get a tags",
      arguments: z.object({
        identifier: z.string().describe("The name of the tags"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update tags attributes",
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
        if (g["column"] !== undefined) body["column"] = g["column"];
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
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
      description: "Delete the tags",
      arguments: z.object({
        identifier: z.string().describe("The name of the tags"),
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
      description: "Sync tags state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    reconcile: {
      description: "reconcile",
      arguments: z.object({
        forceDeleteMissing: z.any().optional(),
        tagTemplate: z.any().optional(),
        tags: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["forceDeleteMissing"] !== undefined) {
          body["forceDeleteMissing"] = args["forceDeleteMissing"];
        }
        if (args["tagTemplate"] !== undefined) {
          body["tagTemplate"] = args["tagTemplate"];
        }
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datacatalog.projects.locations.entryGroups.entries.tags.reconcile",
            "path": "v1/{+parent}/tags:reconcile",
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
