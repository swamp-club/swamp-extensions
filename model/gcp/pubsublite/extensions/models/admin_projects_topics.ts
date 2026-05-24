// Auto-generated extension model for @swamp/gcp/pubsublite/admin-projects-topics
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Pub/Sub Lite Admin.Projects.Topics.
 *
 * Metadata about a topic resource.
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
  return `${parent}/topics/${shortName}`;
}

const BASE_URL = "https://pubsublite.googleapis.com/";

const GET_CONFIG = {
  "id": "pubsublite.admin.projects.locations.topics.get",
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
  "id": "pubsublite.admin.projects.locations.topics.create",
  "path": "v1/admin/{+parent}/topics",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "topicId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "pubsublite.admin.projects.locations.topics.patch",
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
  "id": "pubsublite.admin.projects.locations.topics.delete",
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

const LIST_CONFIG = {
  "id": "pubsublite.admin.projects.locations.topics.list",
  "path": "v1/admin/{+parent}/topics",
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
  name: z.string().describe(
    "The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}",
  ).optional(),
  partitionConfig: z.object({
    capacity: z.object({
      publishMibPerSec: z.number().int().describe(
        "Publish throughput capacity per partition in MiB/s. Must be >= 4 and <= 16.",
      ).optional(),
      subscribeMibPerSec: z.number().int().describe(
        "Subscribe throughput capacity per partition in MiB/s. Must be >= 4 and <= 32.",
      ).optional(),
    }).describe("The throughput capacity configuration for each partition.")
      .optional(),
    count: z.string().describe(
      "The number of partitions in the topic. Must be at least 1. Once a topic has been created the number of partitions can be increased but not decreased. Message ordering is not guaranteed across a topic resize. For more information see https://cloud.google.com/pubsub/lite/docs/topics#scaling_capacity",
    ).optional(),
    scale: z.number().int().describe(
      "DEPRECATED: Use capacity instead which can express a superset of configurations. Every partition in the topic is allocated throughput equivalent to `scale` times the standard partition throughput (4 MiB/s). This is also reflected in the cost of this topic; a topic with `scale` of 2 and count of 10 is charged for 20 partitions. This value must be in the range [1,4].",
    ).optional(),
  }).describe("The settings for a topic's partitions.").optional(),
  reservationConfig: z.object({
    throughputReservation: z.string().describe(
      "The Reservation to use for this topic's throughput capacity. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id}",
    ).optional(),
  }).describe("The settings for this topic's Reservation usage.").optional(),
  retentionConfig: z.object({
    perPartitionBytes: z.string().describe(
      "The provisioned storage, in bytes, per partition. If the number of bytes stored in any of the topic's partitions grows beyond this value, older messages will be dropped to make room for newer ones, regardless of the value of `period`.",
    ).optional(),
    period: z.string().describe(
      "How long a published message is retained. If unset, messages will be retained as long as the bytes retained for each partition is below `per_partition_bytes`.",
    ).optional(),
  }).describe("The settings for a topic's message retention.").optional(),
  topicId: z.string().describe(
    "Required. The ID to use for the topic, which will become the final component of the topic's name. This value is structured like: `my-topic-name`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  name: z.string(),
  partitionConfig: z.object({
    capacity: z.object({
      publishMibPerSec: z.number(),
      subscribeMibPerSec: z.number(),
    }),
    count: z.string(),
    scale: z.number(),
  }).optional(),
  reservationConfig: z.object({
    throughputReservation: z.string(),
  }).optional(),
  retentionConfig: z.object({
    perPartitionBytes: z.string(),
    period: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().describe(
    "The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}",
  ).optional(),
  partitionConfig: z.object({
    capacity: z.object({
      publishMibPerSec: z.number().int().describe(
        "Publish throughput capacity per partition in MiB/s. Must be >= 4 and <= 16.",
      ).optional(),
      subscribeMibPerSec: z.number().int().describe(
        "Subscribe throughput capacity per partition in MiB/s. Must be >= 4 and <= 32.",
      ).optional(),
    }).describe("The throughput capacity configuration for each partition.")
      .optional(),
    count: z.string().describe(
      "The number of partitions in the topic. Must be at least 1. Once a topic has been created the number of partitions can be increased but not decreased. Message ordering is not guaranteed across a topic resize. For more information see https://cloud.google.com/pubsub/lite/docs/topics#scaling_capacity",
    ).optional(),
    scale: z.number().int().describe(
      "DEPRECATED: Use capacity instead which can express a superset of configurations. Every partition in the topic is allocated throughput equivalent to `scale` times the standard partition throughput (4 MiB/s). This is also reflected in the cost of this topic; a topic with `scale` of 2 and count of 10 is charged for 20 partitions. This value must be in the range [1,4].",
    ).optional(),
  }).describe("The settings for a topic's partitions.").optional(),
  reservationConfig: z.object({
    throughputReservation: z.string().describe(
      "The Reservation to use for this topic's throughput capacity. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id}",
    ).optional(),
  }).describe("The settings for this topic's Reservation usage.").optional(),
  retentionConfig: z.object({
    perPartitionBytes: z.string().describe(
      "The provisioned storage, in bytes, per partition. If the number of bytes stored in any of the topic's partitions grows beyond this value, older messages will be dropped to make room for newer ones, regardless of the value of `period`.",
    ).optional(),
    period: z.string().describe(
      "How long a published message is retained. If unset, messages will be retained as long as the bytes retained for each partition is below `per_partition_bytes`.",
    ).optional(),
  }).describe("The settings for a topic's message retention.").optional(),
  topicId: z.string().describe(
    "Required. The ID to use for the topic, which will become the final component of the topic's name. This value is structured like: `my-topic-name`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Pub/Sub Lite Admin.Projects.Topics. Registered at `@swamp/gcp/pubsublite/admin-projects-topics`. */
export const model = {
  type: "@swamp/gcp/pubsublite/admin-projects-topics",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Metadata about a topic resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a topics",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["partitionConfig"] !== undefined) {
          body["partitionConfig"] = g["partitionConfig"];
        }
        if (g["reservationConfig"] !== undefined) {
          body["reservationConfig"] = g["reservationConfig"];
        }
        if (g["retentionConfig"] !== undefined) {
          body["retentionConfig"] = g["retentionConfig"];
        }
        if (g["topicId"] !== undefined) body["topicId"] = g["topicId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a topics",
      arguments: z.object({
        identifier: z.string().describe("The name of the topics"),
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
      description: "Update topics attributes",
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
        if (g["partitionConfig"] !== undefined) {
          body["partitionConfig"] = g["partitionConfig"];
        }
        if (g["reservationConfig"] !== undefined) {
          body["reservationConfig"] = g["reservationConfig"];
        }
        if (g["retentionConfig"] !== undefined) {
          body["retentionConfig"] = g["retentionConfig"];
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
      description: "Delete the topics",
      arguments: z.object({
        identifier: z.string().describe("The name of the topics"),
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
      description: "Sync topics state from GCP",
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
    get_partitions: {
      description: "get partitions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsublite.admin.projects.locations.topics.getPartitions",
            "path": "v1/admin/{+name}/partitions",
            "httpMethod": "GET",
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
