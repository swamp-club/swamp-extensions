// Auto-generated extension model for @swamp/gcp/people/contactgroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud People ContactGroups.
 *
 * A contact group.
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

const BASE_URL = "https://people.googleapis.com/";

const GET_CONFIG = {
  "id": "people.contactGroups.get",
  "path": "v1/{+resourceName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "groupFields": {
      "location": "query",
    },
    "maxMembers": {
      "location": "query",
    },
    "resourceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "people.contactGroups.create",
  "path": "v1/contactGroups",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "people.contactGroups.update",
  "path": "v1/{+resourceName}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "resourceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "people.contactGroups.delete",
  "path": "v1/{+resourceName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "deleteContacts": {
      "location": "query",
    },
    "resourceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "people.contactGroups.list",
  "path": "v1/contactGroups",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "groupFields": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "syncToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  contactGroup: z.object({
    clientData: z.array(z.object({
      key: z.string().describe("The client specified key of the client data.")
        .optional(),
      value: z.string().describe(
        "The client specified value of the client data.",
      ).optional(),
    })).describe("The group's client data.").optional(),
    etag: z.string().describe(
      "The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation.",
    ).optional(),
    formattedName: z.string().describe(
      "Output only. The name translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale for system groups names. Group names set by the owner are the same as name.",
    ).optional(),
    groupType: z.enum([
      "GROUP_TYPE_UNSPECIFIED",
      "USER_CONTACT_GROUP",
      "SYSTEM_CONTACT_GROUP",
    ]).describe("Output only. The contact group type.").optional(),
    memberCount: z.number().int().describe(
      "Output only. The total number of contacts in the group irrespective of max members in specified in the request.",
    ).optional(),
    memberResourceNames: z.array(z.string()).describe(
      "Output only. The list of contact person resource names that are members of the contact group. The field is only populated for GET requests and will only return as many members as `maxMembers` in the get request.",
    ).optional(),
    metadata: z.object({
      deleted: z.boolean().describe(
        "Output only. True if the contact group resource has been deleted. Populated only for [`ListContactGroups`](/people/api/rest/v1/contactgroups/list) requests that include a sync token.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time the group was last updated.",
      ).optional(),
    }).describe("The metadata about a contact group.").optional(),
    name: z.string().describe(
      "The contact group name set by the group owner or a system provided name for system groups. For [`contactGroups.create`](/people/api/rest/v1/contactGroups/create) or [`contactGroups.update`](/people/api/rest/v1/contactGroups/update) the name must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error.",
    ).optional(),
    resourceName: z.string().describe(
      "The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`.",
    ).optional(),
  }).describe("A contact group.").optional(),
  readGroupFields: z.string().describe(
    "Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name",
  ).optional(),
  updateGroupFields: z.string().describe(
    "Optional. A field mask to restrict which fields on the group are updated. Multiple fields can be specified by separating them with commas. Defaults to `name` if not set or set to empty. Updated fields are replaced. Valid values are: * clientData * name",
  ).optional(),
});

const StateSchema = z.object({
  clientData: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  etag: z.string().optional(),
  formattedName: z.string().optional(),
  groupType: z.string().optional(),
  memberCount: z.number().optional(),
  memberResourceNames: z.array(z.string()).optional(),
  metadata: z.object({
    deleted: z.boolean(),
    updateTime: z.string(),
  }).optional(),
  name: z.string(),
  resourceName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  contactGroup: z.object({
    clientData: z.array(z.object({
      key: z.string().describe("The client specified key of the client data.")
        .optional(),
      value: z.string().describe(
        "The client specified value of the client data.",
      ).optional(),
    })).describe("The group's client data.").optional(),
    etag: z.string().describe(
      "The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation.",
    ).optional(),
    formattedName: z.string().describe(
      "Output only. The name translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale for system groups names. Group names set by the owner are the same as name.",
    ).optional(),
    groupType: z.enum([
      "GROUP_TYPE_UNSPECIFIED",
      "USER_CONTACT_GROUP",
      "SYSTEM_CONTACT_GROUP",
    ]).describe("Output only. The contact group type.").optional(),
    memberCount: z.number().int().describe(
      "Output only. The total number of contacts in the group irrespective of max members in specified in the request.",
    ).optional(),
    memberResourceNames: z.array(z.string()).describe(
      "Output only. The list of contact person resource names that are members of the contact group. The field is only populated for GET requests and will only return as many members as `maxMembers` in the get request.",
    ).optional(),
    metadata: z.object({
      deleted: z.boolean().describe(
        "Output only. True if the contact group resource has been deleted. Populated only for [`ListContactGroups`](/people/api/rest/v1/contactgroups/list) requests that include a sync token.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time the group was last updated.",
      ).optional(),
    }).describe("The metadata about a contact group.").optional(),
    name: z.string().describe(
      "The contact group name set by the group owner or a system provided name for system groups. For [`contactGroups.create`](/people/api/rest/v1/contactGroups/create) or [`contactGroups.update`](/people/api/rest/v1/contactGroups/update) the name must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error.",
    ).optional(),
    resourceName: z.string().describe(
      "The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`.",
    ).optional(),
  }).describe("A contact group.").optional(),
  readGroupFields: z.string().describe(
    "Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name",
  ).optional(),
  updateGroupFields: z.string().describe(
    "Optional. A field mask to restrict which fields on the group are updated. Multiple fields can be specified by separating them with commas. Defaults to `name` if not set or set to empty. Updated fields are replaced. Valid values are: * clientData * name",
  ).optional(),
});

/** Swamp extension model for Google Cloud People ContactGroups. Registered at `@swamp/gcp/people/contactgroups`. */
export const model = {
  type: "@swamp/gcp/people/contactgroups",
  version: "2026.05.25.2",
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
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A contact group.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a contactGroups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["contactGroup"] !== undefined) {
          body["contactGroup"] = g["contactGroup"];
        }
        if (g["readGroupFields"] !== undefined) {
          body["readGroupFields"] = g["readGroupFields"];
        }
        if (g["name"] !== undefined) params["resourceName"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
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
      description: "Get a contactGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the contactGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["resourceName"] = args.identifier;
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
      description: "Update contactGroups attributes",
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
        params["resourceName"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["contactGroup"] !== undefined) {
          body["contactGroup"] = g["contactGroup"];
        }
        if (g["readGroupFields"] !== undefined) {
          body["readGroupFields"] = g["readGroupFields"];
        }
        if (g["updateGroupFields"] !== undefined) {
          body["updateGroupFields"] = g["updateGroupFields"];
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
          UPDATE_CONFIG,
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
      description: "Delete the contactGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the contactGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["resourceName"] = args.identifier;
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
      description: "Sync contactGroups state from GCP",
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
          params["resourceName"] = identifier;
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
      description: "List contactGroups resources",
      arguments: z.object({
        groupFields: z.string().describe(
          "Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, `memberCount`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of resources to return. Valid values are between 1 and 1000, inclusive. Defaults to 30 if not set or set to 0.",
        ).optional(),
        syncToken: z.string().describe(
          "Optional. A sync token, returned by a previous call to `contactgroups.list`. Only resources changed since the sync token was created will be returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["groupFields"] !== undefined) {
          params["groupFields"] = String(args["groupFields"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["syncToken"] !== undefined) {
          params["syncToken"] = String(args["syncToken"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "contactGroups",
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
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "people.contactGroups.batchGet",
            "path": "v1/contactGroups:batchGet",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "groupFields": { "location": "query" },
              "maxMembers": { "location": "query" },
              "resourceNames": { "location": "query" },
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
