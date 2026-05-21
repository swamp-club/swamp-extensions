// Auto-generated extension model for @swamp/gcp/calendar/acl
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Calendar Acl.
 *
 * Returns an access control rule.
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

const BASE_URL = "https://www.googleapis.com/calendar/v3/";

const GET_CONFIG = {
  "id": "calendar.acl.get",
  "path": "calendars/{calendarId}/acl/{ruleId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "calendarId",
    "ruleId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "ruleId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "calendar.acl.insert",
  "path": "calendars/{calendarId}/acl",
  "httpMethod": "POST",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "sendNotifications": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "calendar.acl.update",
  "path": "calendars/{calendarId}/acl/{ruleId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "calendarId",
    "ruleId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "ruleId": {
      "location": "path",
      "required": true,
    },
    "sendNotifications": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "calendar.acl.delete",
  "path": "calendars/{calendarId}/acl/{ruleId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "calendarId",
    "ruleId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "ruleId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "calendar.acl.list",
  "path": "calendars/{calendarId}/acl",
  "httpMethod": "GET",
  "parameterOrder": [
    "calendarId",
  ],
  "parameters": {
    "calendarId": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "showDeleted": {
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
  id: z.string().describe(
    "Identifier of the Access Control List (ACL) rule. See Sharing calendars.",
  ).optional(),
  role: z.string().describe(
    'The role assigned to the scope. Possible values are: - "none" - Provides no access. - "freeBusyReader" - Provides read access to free/busy information. - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. Provides read access to the calendar\'s ACLs. - "owner" - Provides manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to modify access levels of other users. Important: the owner role is different from the calendar\'s data owner. A calendar has a single data owner, but can have multiple users with owner role.',
  ),
  scope: z.object({
    type: z.string().describe(
      'The type of the scope. Possible values are: - "default" - The public scope. This is the default value. - "user" - Limits the scope to a single user. - "group" - Limits the scope to a group. - "domain" - Limits the scope to a domain. Note: The permissions granted to the "default", or public, scope apply to any user, authenticated or not.',
    ).optional(),
    value: z.string().describe(
      'The email address of a user or group, or the name of a domain, depending on the scope type. Omitted for type "default".',
    ).optional(),
  }).describe(
    "The extent to which calendar access is granted by this ACL rule.",
  ),
  calendarId: z.string().describe(
    'Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.',
  ),
  sendNotifications: z.string().describe(
    "Whether to send notifications about the calendar sharing change. Optional. The default is True.",
  ).optional(),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  role: z.string().optional(),
  scope: z.object({
    type: z.string(),
    value: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  id: z.string().describe(
    "Identifier of the Access Control List (ACL) rule. See Sharing calendars.",
  ).optional(),
  role: z.string().describe(
    'The role assigned to the scope. Possible values are: - "none" - Provides no access. - "freeBusyReader" - Provides read access to free/busy information. - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. Provides read access to the calendar\'s ACLs. - "owner" - Provides manager access to the calendar. This role has all of the permissions of the writer role with the additional ability to modify access levels of other users. Important: the owner role is different from the calendar\'s data owner. A calendar has a single data owner, but can have multiple users with owner role.',
  ).optional(),
  scope: z.object({
    type: z.string().describe(
      'The type of the scope. Possible values are: - "default" - The public scope. This is the default value. - "user" - Limits the scope to a single user. - "group" - Limits the scope to a group. - "domain" - Limits the scope to a domain. Note: The permissions granted to the "default", or public, scope apply to any user, authenticated or not.',
    ).optional(),
    value: z.string().describe(
      'The email address of a user or group, or the name of a domain, depending on the scope type. Omitted for type "default".',
    ).optional(),
  }).describe(
    "The extent to which calendar access is granted by this ACL rule.",
  ).optional(),
  calendarId: z.string().describe(
    'Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.',
  ).optional(),
  sendNotifications: z.string().describe(
    "Whether to send notifications about the calendar sharing change. Optional. The default is True.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Calendar Acl. Registered at `@swamp/gcp/calendar/acl`. */
export const model = {
  type: "@swamp/gcp/calendar/acl",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns an access control rule.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a acl",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["sendNotifications"] !== undefined) {
          body["sendNotifications"] = g["sendNotifications"];
        }
        if (g["name"] !== undefined) params["ruleId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "calendarId": String(g["calendarId"] ?? "") },
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
      description: "Get a acl",
      arguments: z.object({
        identifier: z.string().describe("The name of the acl"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        params["ruleId"] = args.identifier;
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
      description: "Update acl attributes",
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
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        } else if (existing["calendarId"]) {
          params["calendarId"] = String(existing["calendarId"]);
        }
        params["ruleId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
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
      description: "Delete the acl",
      arguments: z.object({
        identifier: z.string().describe("The name of the acl"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
        }
        params["ruleId"] = args.identifier;
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
      description: "Sync acl state from GCP",
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
          if (g["calendarId"] !== undefined) {
            params["calendarId"] = String(g["calendarId"]);
          } else if (existing["calendarId"]) {
            params["calendarId"] = String(existing["calendarId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["ruleId"] = identifier;
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
        if (g["calendarId"] !== undefined) {
          params["calendarId"] = String(g["calendarId"]);
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
            "id": "calendar.acl.watch",
            "path": "calendars/{calendarId}/acl/watch",
            "httpMethod": "POST",
            "parameterOrder": ["calendarId"],
            "parameters": {
              "calendarId": { "location": "path", "required": true },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
              "showDeleted": { "location": "query" },
              "syncToken": { "location": "query" },
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
