// Auto-generated extension model for @swamp/gcp/admin/users-aliases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Users.Aliases.
 *
 * Lists all aliases for a user.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const INSERT_CONFIG = {
  "id": "directory.users.aliases.insert",
  "path": "admin/directory/v1/users/{userKey}/aliases",
  "httpMethod": "POST",
  "parameterOrder": [
    "userKey",
  ],
  "parameters": {
    "userKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.users.aliases.delete",
  "path": "admin/directory/v1/users/{userKey}/aliases/{alias}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userKey",
    "alias",
  ],
  "parameters": {
    "alias": {
      "location": "path",
      "required": true,
    },
    "userKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.users.aliases.list",
  "path": "admin/directory/v1/users/{userKey}/aliases",
  "httpMethod": "GET",
  "parameterOrder": [
    "userKey",
  ],
  "parameters": {
    "event": {
      "location": "query",
    },
    "userKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  alias: z.string().optional(),
  id: z.string().optional(),
  primaryEmail: z.string().optional(),
  userKey: z.string().describe(
    "Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.",
  ),
});

const StateSchema = z.object({}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  alias: z.string().optional(),
  id: z.string().optional(),
  primaryEmail: z.string().optional(),
  userKey: z.string().describe(
    "Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Admin SDK Users.Aliases. Registered at `@swamp/gcp/admin/users-aliases`. */
export const model = {
  type: "@swamp/gcp/admin/users-aliases",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lists all aliases for a user.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a aliases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        const body: Record<string, unknown> = {};
        if (g["alias"] !== undefined) body["alias"] = g["alias"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["primaryEmail"] !== undefined) {
          body["primaryEmail"] = g["primaryEmail"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "userKey": String(g["userKey"] ?? "") },
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
      description: "Get a aliases",
      arguments: z.object({
        identifier: z.string().describe("The name of the aliases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    delete: {
      description: "Delete the aliases",
      arguments: z.object({
        identifier: z.string().describe("The name of the aliases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        params["alias"] = args.identifier;
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
      description: "Sync aliases state from GCP",
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
          if (g["userKey"] !== undefined) {
            params["userKey"] = String(g["userKey"]);
          } else if (existing["userKey"]) {
            params["userKey"] = String(existing["userKey"]);
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
    watch: {
      description: "watch",
      arguments: z.object({
        address: z.any().optional(),
        expiration: z.any().optional(),
        id: z.any().optional(),
        kind: z.any().optional(),
        params: z.any().optional(),
        payload: z.any().optional(),
        resourceId: z.any().optional(),
        resourceUri: z.any().optional(),
        token: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        const body: Record<string, unknown> = {};
        if (args["address"] !== undefined) body["address"] = args["address"];
        if (args["expiration"] !== undefined) {
          body["expiration"] = args["expiration"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["resourceId"] !== undefined) {
          body["resourceId"] = args["resourceId"];
        }
        if (args["resourceUri"] !== undefined) {
          body["resourceUri"] = args["resourceUri"];
        }
        if (args["token"] !== undefined) body["token"] = args["token"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "directory.users.aliases.watch",
            "path": "admin/directory/v1/users/{userKey}/aliases/watch",
            "httpMethod": "POST",
            "parameterOrder": ["userKey"],
            "parameters": {
              "event": { "location": "query" },
              "userKey": { "location": "path", "required": true },
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
