// Auto-generated extension model for @swamp/gcp/pubsublite/admin-projects-subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Pub/Sub Lite Admin.Projects.Subscriptions.
 *
 * Metadata about a subscription resource.
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
  return `${parent}/subscriptions/${shortName}`;
}

const BASE_URL = "https://pubsublite.googleapis.com/";

const GET_CONFIG = {
  "id": "pubsublite.admin.projects.locations.subscriptions.get",
  "path": "v1/admin/{+name}",
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
  "id": "pubsublite.admin.projects.locations.subscriptions.create",
  "path": "v1/admin/{+parent}/subscriptions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "skipBacklog": {
      "location": "query",
    },
    "subscriptionId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "pubsublite.admin.projects.locations.subscriptions.patch",
  "path": "v1/admin/{+name}",
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
  "id": "pubsublite.admin.projects.locations.subscriptions.delete",
  "path": "v1/admin/{+name}",
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

const GlobalArgsSchema = z.object({
  deliveryConfig: z.object({
    deliveryRequirement: z.enum([
      "DELIVERY_REQUIREMENT_UNSPECIFIED",
      "DELIVER_IMMEDIATELY",
      "DELIVER_AFTER_STORED",
    ]).describe("The DeliveryRequirement for this subscription.").optional(),
  }).describe("The settings for a subscription's message delivery.").optional(),
  exportConfig: z.object({
    currentState: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PAUSED",
      "PERMISSION_DENIED",
      "NOT_FOUND",
    ]).describe(
      "Output only. The current state of the export, which may be different to the desired state due to errors. This field is output only.",
    ).optional(),
    deadLetterTopic: z.string().describe(
      "Optional. The name of an optional Pub/Sub Lite topic to publish messages that can not be exported to the destination. For example, the message can not be published to the Pub/Sub service because it does not satisfy the constraints documented at https://cloud.google.com/pubsub/docs/publisher. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}. Must be within the same project and location as the subscription. The topic may be changed or removed.",
    ).optional(),
    desiredState: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PAUSED",
      "PERMISSION_DENIED",
      "NOT_FOUND",
    ]).describe(
      "The desired state of this export. Setting this to values other than `ACTIVE` and `PAUSED` will result in an error.",
    ).optional(),
    pubsubConfig: z.object({
      topic: z.string().describe(
        "The name of the Pub/Sub topic. Structured like: projects/{project_number}/topics/{topic_id}. The topic may be changed.",
      ).optional(),
    }).describe("Configuration for exporting to a Pub/Sub topic.").optional(),
  }).describe(
    "Configuration for a Pub/Sub Lite subscription that writes messages to a destination. User subscriber clients must not connect to this subscription.",
  ).optional(),
  name: z.string().describe(
    "The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id}",
  ).optional(),
  topic: z.string().describe(
    "The name of the topic this subscription is attached to. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}",
  ).optional(),
  skipBacklog: z.string().describe(
    "If true, the newly created subscription will only receive messages published after the subscription was created. Otherwise, the entire message backlog will be received on the subscription. Defaults to false.",
  ).optional(),
  subscriptionId: z.string().describe(
    "Required. The ID to use for the subscription, which will become the final component of the subscription's name. This value is structured like: `my-sub-name`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  deliveryConfig: z.object({
    deliveryRequirement: z.string(),
  }).optional(),
  exportConfig: z.object({
    currentState: z.string(),
    deadLetterTopic: z.string(),
    desiredState: z.string(),
    pubsubConfig: z.object({
      topic: z.string(),
    }),
  }).optional(),
  name: z.string(),
  topic: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  deliveryConfig: z.object({
    deliveryRequirement: z.enum([
      "DELIVERY_REQUIREMENT_UNSPECIFIED",
      "DELIVER_IMMEDIATELY",
      "DELIVER_AFTER_STORED",
    ]).describe("The DeliveryRequirement for this subscription.").optional(),
  }).describe("The settings for a subscription's message delivery.").optional(),
  exportConfig: z.object({
    currentState: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PAUSED",
      "PERMISSION_DENIED",
      "NOT_FOUND",
    ]).describe(
      "Output only. The current state of the export, which may be different to the desired state due to errors. This field is output only.",
    ).optional(),
    deadLetterTopic: z.string().describe(
      "Optional. The name of an optional Pub/Sub Lite topic to publish messages that can not be exported to the destination. For example, the message can not be published to the Pub/Sub service because it does not satisfy the constraints documented at https://cloud.google.com/pubsub/docs/publisher. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}. Must be within the same project and location as the subscription. The topic may be changed or removed.",
    ).optional(),
    desiredState: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PAUSED",
      "PERMISSION_DENIED",
      "NOT_FOUND",
    ]).describe(
      "The desired state of this export. Setting this to values other than `ACTIVE` and `PAUSED` will result in an error.",
    ).optional(),
    pubsubConfig: z.object({
      topic: z.string().describe(
        "The name of the Pub/Sub topic. Structured like: projects/{project_number}/topics/{topic_id}. The topic may be changed.",
      ).optional(),
    }).describe("Configuration for exporting to a Pub/Sub topic.").optional(),
  }).describe(
    "Configuration for a Pub/Sub Lite subscription that writes messages to a destination. User subscriber clients must not connect to this subscription.",
  ).optional(),
  name: z.string().describe(
    "The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id}",
  ).optional(),
  topic: z.string().describe(
    "The name of the topic this subscription is attached to. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}",
  ).optional(),
  skipBacklog: z.string().describe(
    "If true, the newly created subscription will only receive messages published after the subscription was created. Otherwise, the entire message backlog will be received on the subscription. Defaults to false.",
  ).optional(),
  subscriptionId: z.string().describe(
    "Required. The ID to use for the subscription, which will become the final component of the subscription's name. This value is structured like: `my-sub-name`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Pub/Sub Lite Admin.Projects.Subscriptions. Registered at `@swamp/gcp/pubsublite/admin-projects-subscriptions`. */
export const model = {
  type: "@swamp/gcp/pubsublite/admin-projects-subscriptions",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Metadata about a subscription resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscriptions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["deliveryConfig"] !== undefined) {
          body["deliveryConfig"] = g["deliveryConfig"];
        }
        if (g["exportConfig"] !== undefined) {
          body["exportConfig"] = g["exportConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["topic"] !== undefined) body["topic"] = g["topic"];
        if (g["skipBacklog"] !== undefined) {
          body["skipBacklog"] = g["skipBacklog"];
        }
        if (g["subscriptionId"] !== undefined) {
          body["subscriptionId"] = g["subscriptionId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update subscriptions attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["deliveryConfig"] !== undefined) {
          body["deliveryConfig"] = g["deliveryConfig"];
        }
        if (g["exportConfig"] !== undefined) {
          body["exportConfig"] = g["exportConfig"];
        }
        if (g["topic"] !== undefined) body["topic"] = g["topic"];
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
      description: "Delete the subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
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
    seek: {
      description: "seek",
      arguments: z.object({
        namedTarget: z.any().optional(),
        timeTarget: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["namedTarget"] !== undefined) {
          body["namedTarget"] = args["namedTarget"];
        }
        if (args["timeTarget"] !== undefined) {
          body["timeTarget"] = args["timeTarget"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsublite.admin.projects.locations.subscriptions.seek",
            "path": "v1/admin/{+name}:seek",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
