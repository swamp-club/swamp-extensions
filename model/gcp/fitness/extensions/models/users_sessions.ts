// Auto-generated extension model for @swamp/gcp/fitness/users-sessions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Fitness Users.Sessions.
 *
 * Sessions contain metadata, such as a user-friendly name and time interval information.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://fitness.googleapis.com/fitness/v1/users/";

const UPDATE_CONFIG = {
  "id": "fitness.users.sessions.update",
  "path": "{userId}/sessions/{sessionId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "userId",
    "sessionId",
  ],
  "parameters": {
    "sessionId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "fitness.users.sessions.delete",
  "path": "{userId}/sessions/{sessionId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "sessionId",
  ],
  "parameters": {
    "sessionId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "fitness.users.sessions.list",
  "path": "{userId}/sessions",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "activityType": {
      "location": "query",
    },
    "endTime": {
      "location": "query",
    },
    "includeDeleted": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "startTime": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
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
  activeTimeMillis: z.string().describe(
    "Session active time. While start_time_millis and end_time_millis define the full session time, the active time can be shorter and specified by active_time_millis. If the inactive time during the session is known, it should also be inserted via a com.google.activity.segment data point with a STILL activity value",
  ).optional(),
  activityType: z.number().int().describe(
    "The type of activity this session represents.",
  ).optional(),
  application: z.object({
    detailsUrl: z.string().describe(
      "An optional URI that can be used to link back to the application.",
    ).optional(),
    name: z.string().describe(
      "The name of this application. This is required for REST clients, but we do not enforce uniqueness of this name. It is provided as a matter of convenience for other developers who would like to identify which REST created an Application or Data Source.",
    ).optional(),
    packageName: z.string().describe(
      "Package name for this application. This is used as a unique identifier when created by Android applications, but cannot be specified by REST clients. REST clients will have their developer project number reflected into the Data Source data stream IDs, instead of the packageName.",
    ).optional(),
    version: z.string().describe(
      "Version of the application. You should update this field whenever the application changes in a way that affects the computation of the data.",
    ).optional(),
  }).optional(),
  description: z.string().describe("A description for this session.")
    .optional(),
  endTimeMillis: z.string().describe(
    "An end time, in milliseconds since epoch, inclusive.",
  ).optional(),
  id: z.string().describe(
    "A client-generated identifier that is unique across all sessions owned by this particular user.",
  ).optional(),
  modifiedTimeMillis: z.string().describe(
    "A timestamp that indicates when the session was last modified.",
  ).optional(),
  name: z.string().describe("A human readable name of the session.").optional(),
  startTimeMillis: z.string().describe(
    "A start time, in milliseconds since epoch, inclusive.",
  ).optional(),
});

const StateSchema = z.object({
  activeTimeMillis: z.string().optional(),
  activityType: z.number().optional(),
  application: z.object({
    detailsUrl: z.string(),
    name: z.string(),
    packageName: z.string(),
    version: z.string(),
  }).optional(),
  description: z.string().optional(),
  endTimeMillis: z.string().optional(),
  id: z.string().optional(),
  modifiedTimeMillis: z.string().optional(),
  name: z.string(),
  startTimeMillis: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  activeTimeMillis: z.string().describe(
    "Session active time. While start_time_millis and end_time_millis define the full session time, the active time can be shorter and specified by active_time_millis. If the inactive time during the session is known, it should also be inserted via a com.google.activity.segment data point with a STILL activity value",
  ).optional(),
  activityType: z.number().int().describe(
    "The type of activity this session represents.",
  ).optional(),
  application: z.object({
    detailsUrl: z.string().describe(
      "An optional URI that can be used to link back to the application.",
    ).optional(),
    name: z.string().describe(
      "The name of this application. This is required for REST clients, but we do not enforce uniqueness of this name. It is provided as a matter of convenience for other developers who would like to identify which REST created an Application or Data Source.",
    ).optional(),
    packageName: z.string().describe(
      "Package name for this application. This is used as a unique identifier when created by Android applications, but cannot be specified by REST clients. REST clients will have their developer project number reflected into the Data Source data stream IDs, instead of the packageName.",
    ).optional(),
    version: z.string().describe(
      "Version of the application. You should update this field whenever the application changes in a way that affects the computation of the data.",
    ).optional(),
  }).optional(),
  description: z.string().describe("A description for this session.")
    .optional(),
  endTimeMillis: z.string().describe(
    "An end time, in milliseconds since epoch, inclusive.",
  ).optional(),
  id: z.string().describe(
    "A client-generated identifier that is unique across all sessions owned by this particular user.",
  ).optional(),
  modifiedTimeMillis: z.string().describe(
    "A timestamp that indicates when the session was last modified.",
  ).optional(),
  name: z.string().describe("A human readable name of the session.").optional(),
  startTimeMillis: z.string().describe(
    "A start time, in milliseconds since epoch, inclusive.",
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

/** Swamp extension model for Google Cloud Fitness Users.Sessions. Registered at `@swamp/gcp/fitness/users-sessions`. */
export const model = {
  type: "@swamp/gcp/fitness/users-sessions",
  version: "2026.06.07.1",
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
        "Sessions contain metadata, such as a user-friendly name and time interval inf...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update sessions attributes",
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
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        params["sessionId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["activeTimeMillis"] !== undefined) {
          body["activeTimeMillis"] = g["activeTimeMillis"];
        }
        if (g["activityType"] !== undefined) {
          body["activityType"] = g["activityType"];
        }
        if (g["application"] !== undefined) {
          body["application"] = g["application"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endTimeMillis"] !== undefined) {
          body["endTimeMillis"] = g["endTimeMillis"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["modifiedTimeMillis"] !== undefined) {
          body["modifiedTimeMillis"] = g["modifiedTimeMillis"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["startTimeMillis"] !== undefined) {
          body["startTimeMillis"] = g["startTimeMillis"];
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
          undefined,
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
      description: "Delete the sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["sessionId"] = args.identifier;
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
      description: "Sync sessions state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
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
      description: "List sessions resources",
      arguments: z.object({
        activityType: z.number().describe(
          "If non-empty, only sessions with these activity types should be returned.",
        ).optional(),
        endTime: z.string().describe(
          "An RFC3339 timestamp. Only sessions starting before endTime and ending after startTime up to (endTime + 1 day) will be included in the response. If this time is omitted but startTime is specified, all sessions ending after startTime to the end of time will be returned.",
        ).optional(),
        includeDeleted: z.boolean().describe(
          "If true, and if both startTime and endTime are omitted, session deletions will be returned.",
        ).optional(),
        startTime: z.string().describe(
          "An RFC3339 timestamp. Only sessions starting before endTime and ending after startTime up to (endTime + 1 day) will be included in the response. If this time is omitted but endTime is specified, all sessions starting before endTime and ending after the start of time up to (endTime + 1 day) will be returned.",
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
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (args["activityType"] !== undefined) {
          params["activityType"] = String(args["activityType"]);
        }
        if (args["endTime"] !== undefined) {
          params["endTime"] = String(args["endTime"]);
        }
        if (args["includeDeleted"] !== undefined) {
          params["includeDeleted"] = String(args["includeDeleted"]);
        }
        if (args["startTime"] !== undefined) {
          params["startTime"] = String(args["startTime"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "deletedSession",
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
