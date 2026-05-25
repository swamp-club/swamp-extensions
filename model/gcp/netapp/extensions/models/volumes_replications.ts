// Auto-generated extension model for @swamp/gcp/netapp/volumes-replications
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud NetApp Volumes.Replications.
 *
 * Replication is a nested resource under Volume, that describes a cross-region replication relationship between 2 volumes in different regions.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/replications/${shortName}`;
}

const BASE_URL = "https://netapp.googleapis.com/";

const GET_CONFIG = {
  "id": "netapp.projects.locations.volumes.replications.get",
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
  "id": "netapp.projects.locations.volumes.replications.create",
  "path": "v1/{+parent}/replications",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "replicationId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "netapp.projects.locations.volumes.replications.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "netapp.projects.locations.volumes.replications.delete",
  "path": "v1/{+name}",
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
  "id": "netapp.projects.locations.volumes.replications.list",
  "path": "v1/{+parent}/replications",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  clusterLocation: z.string().describe(
    "Optional. Location of the user cluster.",
  ).optional(),
  description: z.string().describe(
    "A description about this replication relationship.",
  ).optional(),
  destinationVolumeParameters: z.object({
    description: z.string().describe("Description for the destination volume.")
      .optional(),
    shareName: z.string().describe(
      "Destination volume's share name. If not specified, source volume's share name will be used.",
    ).optional(),
    storagePool: z.string().describe(
      "Required. Existing destination StoragePool name.",
    ).optional(),
    tieringPolicy: z.object({
      coolingThresholdDays: z.number().int().describe(
        "Optional. Time in days to mark the volume's data block as cold and make it eligible for tiering, can be range from 2-183. Default is 31.",
      ).optional(),
      hotTierBypassModeEnabled: z.boolean().describe(
        "Optional. Flag indicating that the hot tier bypass mode is enabled. Default is false. This is only applicable to Flex service level.",
      ).optional(),
      tierAction: z.enum(["TIER_ACTION_UNSPECIFIED", "ENABLED", "PAUSED"])
        .describe(
          "Optional. Flag indicating if the volume has tiering policy enable/pause. Default is PAUSED.",
        ).optional(),
    }).describe("Defines tiering policy for the volume.").optional(),
    volumeId: z.string().describe(
      "Desired destination volume resource id. If not specified, source volume's resource id will be used. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.",
    ).optional(),
  }).describe(
    "DestinationVolumeParameters specify input parameters used for creating destination volume.",
  ).optional(),
  hybridPeeringDetails: z.object({
    command: z.string().describe(
      "Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests.",
    ).optional(),
    commandExpiryTime: z.string().describe(
      "Output only. Expiration time for the peering command to be executed on user's ONTAP.",
    ).optional(),
    passphrase: z.string().describe(
      "Output only. Temporary passphrase generated to accept cluster peering command.",
    ).optional(),
    peerClusterName: z.string().describe(
      "Output only. Name of the user's local source cluster to be peered with the destination cluster.",
    ).optional(),
    peerSvmName: z.string().describe(
      "Output only. Name of the user's local source vserver svm to be peered with the destination vserver svm.",
    ).optional(),
    peerVolumeName: z.string().describe(
      "Output only. Name of the user's local source volume to be peered with the destination volume.",
    ).optional(),
    subnetIp: z.string().describe("Output only. IP address of the subnet.")
      .optional(),
  }).describe("HybridPeeringDetails contains details about the hybrid peering.")
    .optional(),
  hybridReplicationUserCommands: z.object({
    commands: z.array(z.string()).describe(
      "Output only. List of commands to be executed by the customer.",
    ).optional(),
  }).describe(
    "UserCommands contains the commands to be executed by the customer.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Replication. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}`.",
  ).optional(),
  replicationSchedule: z.enum([
    "REPLICATION_SCHEDULE_UNSPECIFIED",
    "EVERY_10_MINUTES",
    "HOURLY",
    "DAILY",
  ]).describe("Required. Indicates the schedule for replication.").optional(),
  transferStats: z.object({
    lagDuration: z.string().describe(
      "Lag duration indicates the duration by which Destination region volume content lags behind the primary region volume content.",
    ).optional(),
    lastTransferBytes: z.string().describe("Last transfer size in bytes.")
      .optional(),
    lastTransferDuration: z.string().describe(
      "Time taken during last transfer.",
    ).optional(),
    lastTransferEndTime: z.string().describe(
      "Time when last transfer completed.",
    ).optional(),
    lastTransferError: z.string().describe(
      "A message describing the cause of the last transfer failure.",
    ).optional(),
    totalTransferDuration: z.string().describe(
      "Cumulative time taken across all transfers for the replication relationship.",
    ).optional(),
    transferBytes: z.string().describe(
      "Cumulative bytes transferred so far for the replication relationship.",
    ).optional(),
    updateTime: z.string().describe("Time when progress was updated last.")
      .optional(),
  }).describe(
    "TransferStats reports all statistics related to replication transfer.",
  ).optional(),
  replicationId: z.string().describe(
    "Required. ID of the replication to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  clusterLocation: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destinationVolume: z.string().optional(),
  destinationVolumeParameters: z.object({
    description: z.string(),
    shareName: z.string(),
    storagePool: z.string(),
    tieringPolicy: z.object({
      coolingThresholdDays: z.number(),
      hotTierBypassModeEnabled: z.boolean(),
      tierAction: z.string(),
    }),
    volumeId: z.string(),
  }).optional(),
  healthy: z.boolean().optional(),
  hybridPeeringDetails: z.object({
    command: z.string(),
    commandExpiryTime: z.string(),
    passphrase: z.string(),
    peerClusterName: z.string(),
    peerSvmName: z.string(),
    peerVolumeName: z.string(),
    subnetIp: z.string(),
  }).optional(),
  hybridReplicationType: z.string().optional(),
  hybridReplicationUserCommands: z.object({
    commands: z.array(z.string()),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  mirrorState: z.string().optional(),
  name: z.string(),
  replicationSchedule: z.string().optional(),
  role: z.string().optional(),
  sourceVolume: z.string().optional(),
  state: z.string().optional(),
  stateDetails: z.string().optional(),
  transferStats: z.object({
    lagDuration: z.string(),
    lastTransferBytes: z.string(),
    lastTransferDuration: z.string(),
    lastTransferEndTime: z.string(),
    lastTransferError: z.string(),
    totalTransferDuration: z.string(),
    transferBytes: z.string(),
    updateTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  clusterLocation: z.string().describe(
    "Optional. Location of the user cluster.",
  ).optional(),
  description: z.string().describe(
    "A description about this replication relationship.",
  ).optional(),
  destinationVolumeParameters: z.object({
    description: z.string().describe("Description for the destination volume.")
      .optional(),
    shareName: z.string().describe(
      "Destination volume's share name. If not specified, source volume's share name will be used.",
    ).optional(),
    storagePool: z.string().describe(
      "Required. Existing destination StoragePool name.",
    ).optional(),
    tieringPolicy: z.object({
      coolingThresholdDays: z.number().int().describe(
        "Optional. Time in days to mark the volume's data block as cold and make it eligible for tiering, can be range from 2-183. Default is 31.",
      ).optional(),
      hotTierBypassModeEnabled: z.boolean().describe(
        "Optional. Flag indicating that the hot tier bypass mode is enabled. Default is false. This is only applicable to Flex service level.",
      ).optional(),
      tierAction: z.enum(["TIER_ACTION_UNSPECIFIED", "ENABLED", "PAUSED"])
        .describe(
          "Optional. Flag indicating if the volume has tiering policy enable/pause. Default is PAUSED.",
        ).optional(),
    }).describe("Defines tiering policy for the volume.").optional(),
    volumeId: z.string().describe(
      "Desired destination volume resource id. If not specified, source volume's resource id will be used. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.",
    ).optional(),
  }).describe(
    "DestinationVolumeParameters specify input parameters used for creating destination volume.",
  ).optional(),
  hybridPeeringDetails: z.object({
    command: z.string().describe(
      "Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests.",
    ).optional(),
    commandExpiryTime: z.string().describe(
      "Output only. Expiration time for the peering command to be executed on user's ONTAP.",
    ).optional(),
    passphrase: z.string().describe(
      "Output only. Temporary passphrase generated to accept cluster peering command.",
    ).optional(),
    peerClusterName: z.string().describe(
      "Output only. Name of the user's local source cluster to be peered with the destination cluster.",
    ).optional(),
    peerSvmName: z.string().describe(
      "Output only. Name of the user's local source vserver svm to be peered with the destination vserver svm.",
    ).optional(),
    peerVolumeName: z.string().describe(
      "Output only. Name of the user's local source volume to be peered with the destination volume.",
    ).optional(),
    subnetIp: z.string().describe("Output only. IP address of the subnet.")
      .optional(),
  }).describe("HybridPeeringDetails contains details about the hybrid peering.")
    .optional(),
  hybridReplicationUserCommands: z.object({
    commands: z.array(z.string()).describe(
      "Output only. List of commands to be executed by the customer.",
    ).optional(),
  }).describe(
    "UserCommands contains the commands to be executed by the customer.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Replication. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}`.",
  ).optional(),
  replicationSchedule: z.enum([
    "REPLICATION_SCHEDULE_UNSPECIFIED",
    "EVERY_10_MINUTES",
    "HOURLY",
    "DAILY",
  ]).describe("Required. Indicates the schedule for replication.").optional(),
  transferStats: z.object({
    lagDuration: z.string().describe(
      "Lag duration indicates the duration by which Destination region volume content lags behind the primary region volume content.",
    ).optional(),
    lastTransferBytes: z.string().describe("Last transfer size in bytes.")
      .optional(),
    lastTransferDuration: z.string().describe(
      "Time taken during last transfer.",
    ).optional(),
    lastTransferEndTime: z.string().describe(
      "Time when last transfer completed.",
    ).optional(),
    lastTransferError: z.string().describe(
      "A message describing the cause of the last transfer failure.",
    ).optional(),
    totalTransferDuration: z.string().describe(
      "Cumulative time taken across all transfers for the replication relationship.",
    ).optional(),
    transferBytes: z.string().describe(
      "Cumulative bytes transferred so far for the replication relationship.",
    ).optional(),
    updateTime: z.string().describe("Time when progress was updated last.")
      .optional(),
  }).describe(
    "TransferStats reports all statistics related to replication transfer.",
  ).optional(),
  replicationId: z.string().describe(
    "Required. ID of the replication to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud NetApp Volumes.Replications. Registered at `@swamp/gcp/netapp/volumes-replications`. */
export const model = {
  type: "@swamp/gcp/netapp/volumes-replications",
  version: "2026.05.25.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Replication is a nested resource under Volume, that describes a cross-region ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a replications",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["clusterLocation"] !== undefined) {
          body["clusterLocation"] = g["clusterLocation"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destinationVolumeParameters"] !== undefined) {
          body["destinationVolumeParameters"] =
            g["destinationVolumeParameters"];
        }
        if (g["hybridPeeringDetails"] !== undefined) {
          body["hybridPeeringDetails"] = g["hybridPeeringDetails"];
        }
        if (g["hybridReplicationUserCommands"] !== undefined) {
          body["hybridReplicationUserCommands"] =
            g["hybridReplicationUserCommands"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["replicationSchedule"] !== undefined) {
          body["replicationSchedule"] = g["replicationSchedule"];
        }
        if (g["transferStats"] !== undefined) {
          body["transferStats"] = g["transferStats"];
        }
        if (g["replicationId"] !== undefined) {
          body["replicationId"] = g["replicationId"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["ERROR"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a replications",
      arguments: z.object({
        identifier: z.string().describe("The name of the replications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update replications attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["clusterLocation"] !== undefined) {
          body["clusterLocation"] = g["clusterLocation"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destinationVolumeParameters"] !== undefined) {
          body["destinationVolumeParameters"] =
            g["destinationVolumeParameters"];
        }
        if (g["hybridPeeringDetails"] !== undefined) {
          body["hybridPeeringDetails"] = g["hybridPeeringDetails"];
        }
        if (g["hybridReplicationUserCommands"] !== undefined) {
          body["hybridReplicationUserCommands"] =
            g["hybridReplicationUserCommands"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["replicationSchedule"] !== undefined) {
          body["replicationSchedule"] = g["replicationSchedule"];
        }
        if (g["transferStats"] !== undefined) {
          body["transferStats"] = g["transferStats"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["ERROR"],
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
      description: "Delete the replications",
      arguments: z.object({
        identifier: z.string().describe("The name of the replications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync replications state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    list: {
      description: "List replications resources",
      arguments: z.object({
        filter: z.string().describe("List filter.").optional(),
        orderBy: z.string().describe(
          'Sort results. Supported values are "name", "name desc" or "" (unsorted).',
        ).optional(),
        pageSize: z.number().describe("The maximum number of items to return.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "replications",
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
    establish_peering: {
      description: "establish peering",
      arguments: z.object({
        peerClusterName: z.any().optional(),
        peerIpAddresses: z.any().optional(),
        peerSvmName: z.any().optional(),
        peerVolumeName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["peerClusterName"] !== undefined) {
          body["peerClusterName"] = args["peerClusterName"];
        }
        if (args["peerIpAddresses"] !== undefined) {
          body["peerIpAddresses"] = args["peerIpAddresses"];
        }
        if (args["peerSvmName"] !== undefined) {
          body["peerSvmName"] = args["peerSvmName"];
        }
        if (args["peerVolumeName"] !== undefined) {
          body["peerVolumeName"] = args["peerVolumeName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "netapp.projects.locations.volumes.replications.establishPeering",
            "path": "v1/{+name}:establishPeering",
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
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.volumes.replications.resume",
            "path": "v1/{+name}:resume",
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
    reverse_direction: {
      description: "reverse direction",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "netapp.projects.locations.volumes.replications.reverseDirection",
            "path": "v1/{+name}:reverseDirection",
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
    stop: {
      description: "stop",
      arguments: z.object({
        force: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["force"] !== undefined) body["force"] = args["force"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.volumes.replications.stop",
            "path": "v1/{+name}:stop",
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
    action_sync: {
      description: "sync",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.volumes.replications.sync",
            "path": "v1/{+name}:sync",
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
