// Auto-generated extension model for @swamp/gcp/admin/members
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Members.
 *
 * A Google Groups member can be a user or another group. This member can be inside or outside of your account's domains. For more information about common group member tasks, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-group-members).
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

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.members.get",
  "path": "admin/directory/v1/groups/{groupKey}/members/{memberKey}",
  "httpMethod": "GET",
  "parameterOrder": [
    "groupKey",
    "memberKey",
  ],
  "parameters": {
    "groupKey": {
      "location": "path",
      "required": true,
    },
    "memberKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.members.insert",
  "path": "admin/directory/v1/groups/{groupKey}/members",
  "httpMethod": "POST",
  "parameterOrder": [
    "groupKey",
  ],
  "parameters": {
    "groupKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.members.update",
  "path": "admin/directory/v1/groups/{groupKey}/members/{memberKey}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "groupKey",
    "memberKey",
  ],
  "parameters": {
    "groupKey": {
      "location": "path",
      "required": true,
    },
    "memberKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.members.delete",
  "path": "admin/directory/v1/groups/{groupKey}/members/{memberKey}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "groupKey",
    "memberKey",
  ],
  "parameters": {
    "groupKey": {
      "location": "path",
      "required": true,
    },
    "memberKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.members.list",
  "path": "admin/directory/v1/groups/{groupKey}/members",
  "httpMethod": "GET",
  "parameterOrder": [
    "groupKey",
  ],
  "parameters": {
    "groupKey": {
      "location": "path",
      "required": true,
    },
    "includeDerivedMembership": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "roles": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  delivery_settings: z.string().describe(
    "Defines mail delivery preferences of member. This field is only supported by `insert`, `update`, and `get` methods.",
  ).optional(),
  email: z.string().describe(
    "The member's email address. A member can be a user or another group. This property is required when adding a member to a group. The `email` must be unique and cannot be an alias of another group. If the email address is changed, the API automatically reflects the email address changes.",
  ).optional(),
  id: z.string().describe(
    "The unique ID of the group member. A member `id` can be used as a member request URI's `memberKey`.",
  ).optional(),
  role: z.string().describe(
    "The member's role in a group. The API returns an error for cycles in group memberships. For example, if `group1` is a member of `group2`, `group2` cannot be a member of `group1`. For more information about a member's role, see the [administration help center](https://support.google.com/a/answer/167094).",
  ).optional(),
  status: z.string().describe("Status of member (Immutable)").optional(),
  type: z.string().describe("The type of group member.").optional(),
  groupKey: z.string().describe(
    "Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID.",
  ),
});

const StateSchema = z.object({
  delivery_settings: z.string().optional(),
  email: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  delivery_settings: z.string().describe(
    "Defines mail delivery preferences of member. This field is only supported by `insert`, `update`, and `get` methods.",
  ).optional(),
  email: z.string().describe(
    "The member's email address. A member can be a user or another group. This property is required when adding a member to a group. The `email` must be unique and cannot be an alias of another group. If the email address is changed, the API automatically reflects the email address changes.",
  ).optional(),
  id: z.string().describe(
    "The unique ID of the group member. A member `id` can be used as a member request URI's `memberKey`.",
  ).optional(),
  role: z.string().describe(
    "The member's role in a group. The API returns an error for cycles in group memberships. For example, if `group1` is a member of `group2`, `group2` cannot be a member of `group1`. For more information about a member's role, see the [administration help center](https://support.google.com/a/answer/167094).",
  ).optional(),
  status: z.string().describe("Status of member (Immutable)").optional(),
  type: z.string().describe("The type of group member.").optional(),
  groupKey: z.string().describe(
    "Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Admin SDK Members. Registered at `@swamp/gcp/admin/members`. */
export const model = {
  type: "@swamp/gcp/admin/members",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Google Groups member can be a user or another group. This member can be ins...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a members",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["groupKey"] !== undefined) {
          params["groupKey"] = String(g["groupKey"]);
        }
        const body: Record<string, unknown> = {};
        if (g["delivery_settings"] !== undefined) {
          body["delivery_settings"] = g["delivery_settings"];
        }
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["name"] !== undefined) params["memberKey"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "groupKey": String(g["groupKey"] ?? "") },
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
      description: "Get a members",
      arguments: z.object({
        identifier: z.string().describe("The name of the members"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["groupKey"] !== undefined) {
          params["groupKey"] = String(g["groupKey"]);
        }
        params["memberKey"] = args.identifier;
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
      description: "Update members attributes",
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
        if (g["groupKey"] !== undefined) {
          params["groupKey"] = String(g["groupKey"]);
        } else if (existing["groupKey"]) {
          params["groupKey"] = String(existing["groupKey"]);
        }
        params["memberKey"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["delivery_settings"] !== undefined) {
          body["delivery_settings"] = g["delivery_settings"];
        }
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the members",
      arguments: z.object({
        identifier: z.string().describe("The name of the members"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["groupKey"] !== undefined) {
          params["groupKey"] = String(g["groupKey"]);
        }
        params["memberKey"] = args.identifier;
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
      description: "Sync members state from GCP",
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
          if (g["groupKey"] !== undefined) {
            params["groupKey"] = String(g["groupKey"]);
          } else if (existing["groupKey"]) {
            params["groupKey"] = String(existing["groupKey"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["memberKey"] = identifier;
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
      description: "List members resources",
      arguments: z.object({
        includeDerivedMembership: z.boolean().describe(
          "Whether to list indirect memberships. Default: false.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of results to return. Max allowed value is 200.",
        ).optional(),
        roles: z.string().describe(
          "The `roles` query parameter allows you to retrieve group members by role. Allowed values are `OWNER`, `MANAGER`, and `MEMBER`.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["groupKey"] !== undefined) {
          params["groupKey"] = String(g["groupKey"]);
        }
        if (args["includeDerivedMembership"] !== undefined) {
          params["includeDerivedMembership"] = String(
            args["includeDerivedMembership"],
          );
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["roles"] !== undefined) {
          params["roles"] = String(args["roles"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "members",
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
    has_member: {
      description: "has member",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["groupKey"] !== undefined) {
          params["groupKey"] = String(g["groupKey"]);
        }
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
        params["memberKey"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "directory.members.hasMember",
            "path":
              "admin/directory/v1/groups/{groupKey}/hasMember/{memberKey}",
            "httpMethod": "GET",
            "parameterOrder": ["groupKey", "memberKey"],
            "parameters": {
              "groupKey": { "location": "path", "required": true },
              "memberKey": { "location": "path", "required": true },
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
