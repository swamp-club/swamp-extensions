// Auto-generated extension model for @swamp/gcp/workspaceevents/subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Workspace Events Subscriptions.
 *
 * A subscription to receive events about a Google Workspace resource. To learn more about subscriptions, see the [Google Workspace Events API overview](https://developers.google.com/workspace/events).
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

const BASE_URL = "https://workspaceevents.googleapis.com/";

const GET_CONFIG = {
  "id": "workspaceevents.subscriptions.get",
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
  "id": "workspaceevents.subscriptions.create",
  "path": "v1/subscriptions",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "workspaceevents.subscriptions.patch",
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
  "id": "workspaceevents.subscriptions.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  driveOptions: z.object({
    includeDescendants: z.boolean().describe(
      "Optional. Immutable. For subscriptions to Google Drive events, whether to receive events about Drive files that are children of the target folder or shared drive. * If `false`, the subscription only receives events about changes to the folder or shared drive that's specified as the `targetResource`. * If `true`, the `mimeType` field of the `file` resource must be set to `application/vnd.google-apps.folder`. For details, see [Google Drive event types](https://developers.google.com/workspace/events/guides/events-drive#event-types).",
    ).optional(),
  }).describe("Additional supported options for serving Drive events.")
    .optional(),
  expireTime: z.string().describe(
    "Non-empty default. The timestamp in UTC when the subscription expires. Always displayed on output, regardless of what was used on input.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the subscription. Format: `subscriptions/{subscription}`",
  ).optional(),
  notificationEndpoint: z.object({
    pubsubTopic: z.string().describe(
      "Immutable. The Pub/Sub topic that receives events for the subscription. Format: `projects/{project}/topics/{topic}` You must create the topic in the same Google Cloud project where you create this subscription. Note: The Google Workspace Events API uses [ordering keys](https://cloud.google.com/pubsub/docs/ordering) for the benefit of sequential events. If the Cloud Pub/Sub topic has a [message storage policy](https://cloud.google.com/pubsub/docs/resource-location-restriction#exceptions) configured to exclude the nearest Google Cloud region, publishing events with ordering keys will fail. When the topic receives events, the events are encoded as Pub/Sub messages. For details, see the [Google Cloud Pub/Sub Protocol Binding for CloudEvents](https://github.com/googleapis/google-cloudevents/blob/main/docs/spec/pubsub.md).",
    ).optional(),
  }).describe("The endpoint where the subscription delivers events.")
    .optional(),
  payloadOptions: z.object({
    fieldMask: z.string().describe(
      "Optional. If `include_resource` is set to `true`, the list of fields to include in the event payload. Separate fields with a comma. For example, to include a Google Chat message's sender and create time, enter `message.sender,message.createTime`. If omitted, the payload includes all fields for the resource. If you specify a field that doesn't exist for the resource, the system ignores the field.",
    ).optional(),
    includeResource: z.boolean().describe(
      "Optional. Whether the event payload includes data about the resource that changed. For example, for an event where a Google Chat message was created, whether the payload contains data about the [`Message`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages) resource. If false, the event payload only includes the name of the changed resource.",
    ).optional(),
  }).describe(
    "Options about what data to include in the event payload. Only supported for Google Chat and Google Drive events.",
  ).optional(),
  targetResource: z.string().describe(
    "Required. Immutable. The Google Workspace resource that's monitored for events, formatted as the [full resource name](https://google.aip.dev/122#full-resource-names). To learn about target resources and the events that they support, see [Supported Google Workspace events](https://developers.google.com/workspace/events#supported-events). A user can only authorize your app to create one subscription for a given target resource. If your app tries to create another subscription with the same user credentials, the request returns an `ALREADY_EXISTS` error.",
  ).optional(),
  ttl: z.string().describe(
    "Input only. The time-to-live (TTL) or duration for the subscription. If unspecified or set to `0`, uses the maximum possible duration.",
  ).optional(),
});

const StateSchema = z.object({
  authority: z.string().optional(),
  createTime: z.string().optional(),
  driveOptions: z.object({
    includeDescendants: z.boolean(),
  }).optional(),
  etag: z.string().optional(),
  eventTypes: z.array(z.string()).optional(),
  expireTime: z.string().optional(),
  name: z.string(),
  notificationEndpoint: z.object({
    pubsubTopic: z.string(),
  }).optional(),
  payloadOptions: z.object({
    fieldMask: z.string(),
    includeResource: z.boolean(),
  }).optional(),
  reconciling: z.boolean().optional(),
  serviceAccountAuthority: z.string().optional(),
  state: z.string().optional(),
  suspensionReason: z.string().optional(),
  targetResource: z.string().optional(),
  ttl: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  userAuthority: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  driveOptions: z.object({
    includeDescendants: z.boolean().describe(
      "Optional. Immutable. For subscriptions to Google Drive events, whether to receive events about Drive files that are children of the target folder or shared drive. * If `false`, the subscription only receives events about changes to the folder or shared drive that's specified as the `targetResource`. * If `true`, the `mimeType` field of the `file` resource must be set to `application/vnd.google-apps.folder`. For details, see [Google Drive event types](https://developers.google.com/workspace/events/guides/events-drive#event-types).",
    ).optional(),
  }).describe("Additional supported options for serving Drive events.")
    .optional(),
  expireTime: z.string().describe(
    "Non-empty default. The timestamp in UTC when the subscription expires. Always displayed on output, regardless of what was used on input.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the subscription. Format: `subscriptions/{subscription}`",
  ).optional(),
  notificationEndpoint: z.object({
    pubsubTopic: z.string().describe(
      "Immutable. The Pub/Sub topic that receives events for the subscription. Format: `projects/{project}/topics/{topic}` You must create the topic in the same Google Cloud project where you create this subscription. Note: The Google Workspace Events API uses [ordering keys](https://cloud.google.com/pubsub/docs/ordering) for the benefit of sequential events. If the Cloud Pub/Sub topic has a [message storage policy](https://cloud.google.com/pubsub/docs/resource-location-restriction#exceptions) configured to exclude the nearest Google Cloud region, publishing events with ordering keys will fail. When the topic receives events, the events are encoded as Pub/Sub messages. For details, see the [Google Cloud Pub/Sub Protocol Binding for CloudEvents](https://github.com/googleapis/google-cloudevents/blob/main/docs/spec/pubsub.md).",
    ).optional(),
  }).describe("The endpoint where the subscription delivers events.")
    .optional(),
  payloadOptions: z.object({
    fieldMask: z.string().describe(
      "Optional. If `include_resource` is set to `true`, the list of fields to include in the event payload. Separate fields with a comma. For example, to include a Google Chat message's sender and create time, enter `message.sender,message.createTime`. If omitted, the payload includes all fields for the resource. If you specify a field that doesn't exist for the resource, the system ignores the field.",
    ).optional(),
    includeResource: z.boolean().describe(
      "Optional. Whether the event payload includes data about the resource that changed. For example, for an event where a Google Chat message was created, whether the payload contains data about the [`Message`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages) resource. If false, the event payload only includes the name of the changed resource.",
    ).optional(),
  }).describe(
    "Options about what data to include in the event payload. Only supported for Google Chat and Google Drive events.",
  ).optional(),
  targetResource: z.string().describe(
    "Required. Immutable. The Google Workspace resource that's monitored for events, formatted as the [full resource name](https://google.aip.dev/122#full-resource-names). To learn about target resources and the events that they support, see [Supported Google Workspace events](https://developers.google.com/workspace/events#supported-events). A user can only authorize your app to create one subscription for a given target resource. If your app tries to create another subscription with the same user credentials, the request returns an `ALREADY_EXISTS` error.",
  ).optional(),
  ttl: z.string().describe(
    "Input only. The time-to-live (TTL) or duration for the subscription. If unspecified or set to `0`, uses the maximum possible duration.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Workspace Events Subscriptions. Registered at `@swamp/gcp/workspaceevents/subscriptions`. */
export const model = {
  type: "@swamp/gcp/workspaceevents/subscriptions",
  version: "2026.05.14.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.05.14.1",
      description: "Added: driveOptions",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A subscription to receive events about a Google Workspace resource. To learn ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscriptions",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["driveOptions"] !== undefined) {
          body["driveOptions"] = g["driveOptions"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notificationEndpoint"] !== undefined) {
          body["notificationEndpoint"] = g["notificationEndpoint"];
        }
        if (g["payloadOptions"] !== undefined) {
          body["payloadOptions"] = g["payloadOptions"];
        }
        if (g["targetResource"] !== undefined) {
          body["targetResource"] = g["targetResource"];
        }
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update subscriptions attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["driveOptions"] !== undefined) {
          body["driveOptions"] = g["driveOptions"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["notificationEndpoint"] !== undefined) {
          body["notificationEndpoint"] = g["notificationEndpoint"];
        }
        if (g["payloadOptions"] !== undefined) {
          body["payloadOptions"] = g["payloadOptions"];
        }
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
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
      description: "Sync subscriptions state from GCP",
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
          params["name"] = identifier;
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
    reactivate: {
      description: "reactivate",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "workspaceevents.subscriptions.reactivate",
            "path": "v1/{+name}:reactivate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
