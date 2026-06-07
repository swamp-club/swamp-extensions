// Auto-generated extension model for @swamp/gcp/forms/forms-watches
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Forms Forms.Watches.
 *
 * A watch for events for a form. When the designated event happens, a notification will be published to the specified target. The notification's attributes will include a `formId` key that has the ID of the watched form and an `eventType` key that has the string of the type. Messages are sent with at-least-once delivery and are only dropped in extraordinary circumstances. Typically all notifications should be reliably delivered within a few seconds; however, in some situations notifications may be delayed. A watch expires seven days after it is created unless it is renewed with watches.renew
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://forms.googleapis.com/";

const INSERT_CONFIG = {
  "id": "forms.forms.watches.create",
  "path": "v1/forms/{formId}/watches",
  "httpMethod": "POST",
  "parameterOrder": [
    "formId",
  ],
  "parameters": {
    "formId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "forms.forms.watches.delete",
  "path": "v1/forms/{formId}/watches/{watchId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "formId",
    "watchId",
  ],
  "parameters": {
    "formId": {
      "location": "path",
      "required": true,
    },
    "watchId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "forms.forms.watches.list",
  "path": "v1/forms/{formId}/watches",
  "httpMethod": "GET",
  "parameterOrder": [
    "formId",
  ],
  "parameters": {
    "formId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  watch: z.object({
    createTime: z.string().describe(
      "Output only. Timestamp of when this was created.",
    ).optional(),
    errorType: z.enum([
      "ERROR_TYPE_UNSPECIFIED",
      "PROJECT_NOT_AUTHORIZED",
      "NO_USER_ACCESS",
      "OTHER_ERRORS",
    ]).describe(
      "Output only. The most recent error type for an attempted delivery. To begin watching the form again a call can be made to watches.renew which also clears this error information.",
    ).optional(),
    eventType: z.enum(["EVENT_TYPE_UNSPECIFIED", "SCHEMA", "RESPONSES"])
      .describe("Required. Which event type to watch for.").optional(),
    expireTime: z.string().describe(
      "Output only. Timestamp for when this will expire. Each watches.renew call resets this to seven days in the future.",
    ).optional(),
    id: z.string().describe(
      "Output only. The ID of this watch. See notes on CreateWatchRequest.watch_id.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "SUSPENDED"]).describe(
      "Output only. The current state of the watch. Additional details about suspended watches can be found by checking the `error_type`.",
    ).optional(),
    target: z.object({
      topic: z.object({
        topicName: z.string().describe(
          "Required. A fully qualified Pub/Sub topic name to publish the events to. This topic must be owned by the calling project and already exist in Pub/Sub.",
        ).optional(),
      }).describe("A Pub/Sub topic.").optional(),
    }).describe("The target for notification delivery.").optional(),
  }).describe(
    "A watch for events for a form. When the designated event happens, a notification will be published to the specified target. The notification's attributes will include a `formId` key that has the ID of the watched form and an `eventType` key that has the string of the type. Messages are sent with at-least-once delivery and are only dropped in extraordinary circumstances. Typically all notifications should be reliably delivered within a few seconds; however, in some situations notifications may be delayed. A watch expires seven days after it is created unless it is renewed with watches.renew",
  ).optional(),
  watchId: z.string().describe(
    "The ID to use for the watch. If specified, the ID must not already be in use. If not specified, an ID is generated. This value should be 4-63 characters, and valid characters are /a-z-/.",
  ).optional(),
  formId: z.string().describe("Required. ID of the Form to watch."),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  errorType: z.string().optional(),
  eventType: z.string().optional(),
  expireTime: z.string().optional(),
  id: z.string().optional(),
  state: z.string().optional(),
  target: z.object({
    topic: z.object({
      topicName: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  watch: z.object({
    createTime: z.string().describe(
      "Output only. Timestamp of when this was created.",
    ).optional(),
    errorType: z.enum([
      "ERROR_TYPE_UNSPECIFIED",
      "PROJECT_NOT_AUTHORIZED",
      "NO_USER_ACCESS",
      "OTHER_ERRORS",
    ]).describe(
      "Output only. The most recent error type for an attempted delivery. To begin watching the form again a call can be made to watches.renew which also clears this error information.",
    ).optional(),
    eventType: z.enum(["EVENT_TYPE_UNSPECIFIED", "SCHEMA", "RESPONSES"])
      .describe("Required. Which event type to watch for.").optional(),
    expireTime: z.string().describe(
      "Output only. Timestamp for when this will expire. Each watches.renew call resets this to seven days in the future.",
    ).optional(),
    id: z.string().describe(
      "Output only. The ID of this watch. See notes on CreateWatchRequest.watch_id.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "SUSPENDED"]).describe(
      "Output only. The current state of the watch. Additional details about suspended watches can be found by checking the `error_type`.",
    ).optional(),
    target: z.object({
      topic: z.object({
        topicName: z.string().describe(
          "Required. A fully qualified Pub/Sub topic name to publish the events to. This topic must be owned by the calling project and already exist in Pub/Sub.",
        ).optional(),
      }).describe("A Pub/Sub topic.").optional(),
    }).describe("The target for notification delivery.").optional(),
  }).describe(
    "A watch for events for a form. When the designated event happens, a notification will be published to the specified target. The notification's attributes will include a `formId` key that has the ID of the watched form and an `eventType` key that has the string of the type. Messages are sent with at-least-once delivery and are only dropped in extraordinary circumstances. Typically all notifications should be reliably delivered within a few seconds; however, in some situations notifications may be delayed. A watch expires seven days after it is created unless it is renewed with watches.renew",
  ).optional(),
  watchId: z.string().describe(
    "The ID to use for the watch. If specified, the ID must not already be in use. If not specified, an ID is generated. This value should be 4-63 characters, and valid characters are /a-z-/.",
  ).optional(),
  formId: z.string().describe("Required. ID of the Form to watch.").optional(),
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

/** Swamp extension model for Google Cloud Google Forms Forms.Watches. Registered at `@swamp/gcp/forms/forms-watches`. */
export const model = {
  type: "@swamp/gcp/forms/forms-watches",
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
      toVersion: "2026.05.25.2",
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
        "A watch for events for a form. When the designated event happens, a notificat...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a watches",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["formId"] !== undefined) params["formId"] = String(g["formId"]);
        const body: Record<string, unknown> = {};
        if (g["watch"] !== undefined) body["watch"] = g["watch"];
        if (g["watchId"] !== undefined) body["watchId"] = g["watchId"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "formId": String(g["formId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a watches",
      arguments: z.object({
        identifier: z.string().describe("The name of the watches"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["formId"] !== undefined) params["formId"] = String(g["formId"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
          credentials,
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
      description: "Delete the watches",
      arguments: z.object({
        identifier: z.string().describe("The name of the watches"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["formId"] !== undefined) params["formId"] = String(g["formId"]);
        params["watchId"] = args.identifier;
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
      description: "Sync watches state from GCP",
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
          if (g["formId"] !== undefined) params["formId"] = String(g["formId"]);
          else if (existing["formId"]) {
            params["formId"] = String(existing["formId"]);
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
      description: "List watches resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["formId"] !== undefined) params["formId"] = String(g["formId"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "watches",
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
    renew: {
      description: "renew",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["formId"] !== undefined) params["formId"] = String(g["formId"]);
        if (g["watchId"] !== undefined) {
          params["watchId"] = String(g["watchId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "forms.forms.watches.renew",
            "path": "v1/forms/{formId}/watches/{watchId}:renew",
            "httpMethod": "POST",
            "parameterOrder": ["formId", "watchId"],
            "parameters": {
              "formId": { "location": "path", "required": true },
              "watchId": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
