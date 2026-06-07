// Auto-generated extension model for @swamp/gcp/admin/groups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Groups.
 *
 * Google Groups provide your users the ability to send messages to groups of people using the group's email address. For more information about common tasks, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-groups). For information about other types of groups, see the [Cloud Identity Groups API documentation](https://cloud.google.com/identity/docs/groups). Note: The user calling the API (or being impersonated by a service account) must have an assigned [role](https://developers.google.com/workspace/admin/directory/v1/guides/manage-roles) that includes Admin API Groups permissions, such as Super Admin or Groups Admin.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.groups.get",
  "path": "admin/directory/v1/groups/{groupKey}",
  "httpMethod": "GET",
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

const INSERT_CONFIG = {
  "id": "directory.groups.insert",
  "path": "admin/directory/v1/groups",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "directory.groups.update",
  "path": "admin/directory/v1/groups/{groupKey}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "directory.groups.delete",
  "path": "admin/directory/v1/groups/{groupKey}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "directory.groups.list",
  "path": "admin/directory/v1/groups",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "customer": {
      "location": "query",
    },
    "domain": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "query": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
    "userKey": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  adminCreated: z.boolean().describe(
    "Read-only. Value is `true` if this group was created by an administrator rather than a user.",
  ).optional(),
  aliases: z.array(z.string()).describe(
    "Read-only. The list of a group's alias email addresses. To add, update, or remove a group's aliases, use the `groups.aliases` methods. If edited in a group's POST or PUT request, the edit is ignored.",
  ).optional(),
  description: z.string().describe(
    "An extended description to help users determine the purpose of a group. For example, you can include information about who should join the group, the types of messages to send to the group, links to FAQs about the group, or related groups. Maximum length is `4,096` characters.",
  ).optional(),
  directMembersCount: z.string().describe(
    "The number of users that are direct members of the group. If a group is a member (child) of this group (the parent), members of the child group are not counted in the `directMembersCount` property of the parent group.",
  ).optional(),
  email: z.string().describe(
    "The group's email address. If your account has multiple domains, select the appropriate domain for the email address. The `email` must be unique. This property is required when creating a group. Group email addresses are subject to the same character usage rules as usernames, see the [help center](https://support.google.com/a/answer/9193374) for details.",
  ),
  id: z.string().describe(
    "Read-only. The unique ID of a group. A group `id` can be used as a group request URI's `groupKey`.",
  ).optional(),
  name: z.string().describe("The group's display name.").optional(),
  nonEditableAliases: z.array(z.string()).describe(
    "Read-only. The list of the group's non-editable alias email addresses that are outside of the account's primary domain or subdomains. These are functioning email addresses used by the group. This is a read-only property returned in the API's response for a group. If edited in a group's POST or PUT request, the edit is ignored.",
  ).optional(),
});

const StateSchema = z.object({
  adminCreated: z.boolean().optional(),
  aliases: z.array(z.string()).optional(),
  description: z.string().optional(),
  directMembersCount: z.string().optional(),
  email: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  nonEditableAliases: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  adminCreated: z.boolean().describe(
    "Read-only. Value is `true` if this group was created by an administrator rather than a user.",
  ).optional(),
  aliases: z.array(z.string()).describe(
    "Read-only. The list of a group's alias email addresses. To add, update, or remove a group's aliases, use the `groups.aliases` methods. If edited in a group's POST or PUT request, the edit is ignored.",
  ).optional(),
  description: z.string().describe(
    "An extended description to help users determine the purpose of a group. For example, you can include information about who should join the group, the types of messages to send to the group, links to FAQs about the group, or related groups. Maximum length is `4,096` characters.",
  ).optional(),
  directMembersCount: z.string().describe(
    "The number of users that are direct members of the group. If a group is a member (child) of this group (the parent), members of the child group are not counted in the `directMembersCount` property of the parent group.",
  ).optional(),
  email: z.string().describe(
    "The group's email address. If your account has multiple domains, select the appropriate domain for the email address. The `email` must be unique. This property is required when creating a group. Group email addresses are subject to the same character usage rules as usernames, see the [help center](https://support.google.com/a/answer/9193374) for details.",
  ).optional(),
  id: z.string().describe(
    "Read-only. The unique ID of a group. A group `id` can be used as a group request URI's `groupKey`.",
  ).optional(),
  name: z.string().describe("The group's display name.").optional(),
  nonEditableAliases: z.array(z.string()).describe(
    "Read-only. The list of the group's non-editable alias email addresses that are outside of the account's primary domain or subdomains. These are functioning email addresses used by the group. This is a read-only property returned in the API's response for a group. If edited in a group's POST or PUT request, the edit is ignored.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Admin SDK Groups. Registered at `@swamp/gcp/admin/groups`. */
export const model = {
  type: "@swamp/gcp/admin/groups",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Google Groups provide your users the ability to send messages to groups of pe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a groups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["adminCreated"] !== undefined) {
          body["adminCreated"] = g["adminCreated"];
        }
        if (g["aliases"] !== undefined) body["aliases"] = g["aliases"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["directMembersCount"] !== undefined) {
          body["directMembersCount"] = g["directMembersCount"];
        }
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nonEditableAliases"] !== undefined) {
          body["nonEditableAliases"] = g["nonEditableAliases"];
        }
        if (g["name"] !== undefined) params["groupKey"] = String(g["name"]);
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
          credentials,
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
      description: "Get a groups",
      arguments: z.object({
        identifier: z.string().describe("The name of the groups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["groupKey"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update groups attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["groupKey"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adminCreated"] !== undefined) {
          body["adminCreated"] = g["adminCreated"];
        }
        if (g["aliases"] !== undefined) body["aliases"] = g["aliases"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["directMembersCount"] !== undefined) {
          body["directMembersCount"] = g["directMembersCount"];
        }
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nonEditableAliases"] !== undefined) {
          body["nonEditableAliases"] = g["nonEditableAliases"];
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
          undefined,
          credentials,
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
      description: "Delete the groups",
      arguments: z.object({
        identifier: z.string().describe("The name of the groups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["groupKey"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync groups state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          params["groupKey"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
            credentials,
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
      description: "List groups resources",
      arguments: z.object({
        customer: z.string().describe(
          "The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter.",
        ).optional(),
        domain: z.string().describe(
          "The domain name. Use this field to get groups from only one domain. To return all domains for a customer account, use the `customer` query parameter instead.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of results to return. Max allowed value is 200.",
        ).optional(),
        orderBy: z.string().describe("Column to use for sorting results")
          .optional(),
        query: z.string().describe(
          "Query string search. Contains one or more search clauses, each with a field, operator, and value. For complete documentation, go to [Search for groups](https://developers.google.com/workspace/admin/directory/v1/guides/search-groups).",
        ).optional(),
        sortOrder: z.string().describe(
          "Whether to return results in ascending or descending order. Only of use when orderBy is also used",
        ).optional(),
        userKey: z.string().describe(
          "Email or immutable ID of the user if only those groups are to be listed, the given user is a member of. If it's an ID, it should match with the ID of the user object. Cannot be used with the `customer` parameter.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["customer"] !== undefined) {
          params["customer"] = String(args["customer"]);
        }
        if (args["domain"] !== undefined) {
          params["domain"] = String(args["domain"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["userKey"] !== undefined) {
          params["userKey"] = String(args["userKey"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "groups",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
  },
};
