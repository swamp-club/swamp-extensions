// Auto-generated extension model for @swamp/gcp/netapp/storagepools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud NetApp StoragePools.
 *
 * StoragePool is a container for volumes with a service level and capacity. Volumes can be created in a pool of sufficient available capacity. StoragePool capacity is what you are billed for.
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
  return `${parent}/storagePools/${shortName}`;
}

const BASE_URL = "https://netapp.googleapis.com/";

const GET_CONFIG = {
  "id": "netapp.projects.locations.storagePools.get",
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
  "id": "netapp.projects.locations.storagePools.create",
  "path": "v1/{+parent}/storagePools",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "storagePoolId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "netapp.projects.locations.storagePools.patch",
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
  "id": "netapp.projects.locations.storagePools.delete",
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
  "id": "netapp.projects.locations.storagePools.list",
  "path": "v1/{+parent}/storagePools",
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
  activeDirectory: z.string().describe(
    "Optional. Specifies the Active Directory to be used for creating a SMB volume.",
  ).optional(),
  allowAutoTiering: z.boolean().describe(
    "Optional. True if the storage pool supports Auto Tiering enabled volumes. Default is false. Auto-tiering can be enabled after storage pool creation but it can't be disabled once enabled.",
  ).optional(),
  capacityGib: z.string().describe("Required. Capacity in GIB of the pool")
    .optional(),
  customPerformanceEnabled: z.boolean().describe(
    "Optional. True if using Independent Scaling of capacity and performance (Hyperdisk) By default set to false",
  ).optional(),
  description: z.string().describe("Optional. Description of the storage pool")
    .optional(),
  enableHotTierAutoResize: z.boolean().describe(
    "Optional. Flag indicating that the hot-tier threshold will be auto-increased by 10% of the hot-tier when it hits 100%. Default is true. The increment will kick in only if the new size after increment is still less than or equal to storage pool size.",
  ).optional(),
  hotTierSizeGib: z.string().describe(
    "Optional. Total hot tier capacity for the Storage Pool. It is applicable only to Flex service level. It should be less than the minimum storage pool size and cannot be more than the current storage pool size. It cannot be decreased once set.",
  ).optional(),
  kmsConfig: z.string().describe(
    "Optional. Specifies the KMS config to be used for volume encryption.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  ldapEnabled: z.boolean().describe(
    "Optional. Flag indicating if the pool is NFS LDAP enabled or not.",
  ).optional(),
  mode: z.enum(["MODE_UNSPECIFIED", "DEFAULT", "ONTAP"]).describe(
    "Optional. Mode of the storage pool. This field is used to control whether the user can perform ONTAP operations on the storage pool using the GCNV ONTAP Mode APIs. If not specified during creation, it defaults to `DEFAULT`.",
  ).optional(),
  name: z.string().describe("Identifier. Name of the storage pool").optional(),
  network: z.string().describe(
    "Required. VPC Network name. Format: projects/{project}/global/networks/{network}",
  ).optional(),
  psaRange: z.string().describe(
    "Optional. This field is not implemented. The values provided in this field are ignored.",
  ).optional(),
  qosType: z.enum(["QOS_TYPE_UNSPECIFIED", "AUTO", "MANUAL"]).describe(
    "Optional. QoS (Quality of Service) Type of the storage pool",
  ).optional(),
  replicaZone: z.string().describe(
    "Optional. Specifies the replica zone for regional storagePool.",
  ).optional(),
  scaleType: z.enum([
    "SCALE_TYPE_UNSPECIFIED",
    "SCALE_TYPE_DEFAULT",
    "SCALE_TYPE_SCALEOUT",
  ]).describe(
    "Optional. The scale type of the storage pool. Defaults to `SCALE_TYPE_DEFAULT` if not specified.",
  ).optional(),
  serviceLevel: z.enum([
    "SERVICE_LEVEL_UNSPECIFIED",
    "PREMIUM",
    "EXTREME",
    "STANDARD",
    "FLEX",
  ]).describe("Required. Service level of the storage pool").optional(),
  totalIops: z.string().describe(
    "Optional. Custom Performance Total IOPS of the pool if not provided, it will be calculated based on the total_throughput_mibps",
  ).optional(),
  totalThroughputMibps: z.string().describe(
    "Optional. Custom Performance Total Throughput of the pool (in MiBps)",
  ).optional(),
  type: z.enum(["STORAGE_POOL_TYPE_UNSPECIFIED", "FILE", "UNIFIED"]).describe(
    "Optional. Type of the storage pool. This field is used to control whether the pool supports `FILE` based volumes only or `UNIFIED` (both `FILE` and `BLOCK`) volumes. If not specified during creation, it defaults to `FILE`.",
  ).optional(),
  zone: z.string().describe(
    "Optional. Specifies the active zone for regional storagePool.",
  ).optional(),
  storagePoolId: z.string().describe(
    "Required. Id of the requesting storage pool. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  activeDirectory: z.string().optional(),
  allowAutoTiering: z.boolean().optional(),
  availableThroughputMibps: z.number().optional(),
  capacityGib: z.string().optional(),
  coldTierSizeUsedGib: z.string().optional(),
  createTime: z.string().optional(),
  customPerformanceEnabled: z.boolean().optional(),
  description: z.string().optional(),
  enableHotTierAutoResize: z.boolean().optional(),
  encryptionType: z.string().optional(),
  globalAccessAllowed: z.boolean().optional(),
  hotTierSizeGib: z.string().optional(),
  hotTierSizeUsedGib: z.string().optional(),
  kmsConfig: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  ldapEnabled: z.boolean().optional(),
  mode: z.string().optional(),
  name: z.string(),
  network: z.string().optional(),
  psaRange: z.string().optional(),
  qosType: z.string().optional(),
  replicaZone: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  scaleType: z.string().optional(),
  serviceLevel: z.string().optional(),
  state: z.string().optional(),
  stateDetails: z.string().optional(),
  totalIops: z.string().optional(),
  totalThroughputMibps: z.string().optional(),
  type: z.string().optional(),
  volumeCapacityGib: z.string().optional(),
  volumeCount: z.number().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  activeDirectory: z.string().describe(
    "Optional. Specifies the Active Directory to be used for creating a SMB volume.",
  ).optional(),
  allowAutoTiering: z.boolean().describe(
    "Optional. True if the storage pool supports Auto Tiering enabled volumes. Default is false. Auto-tiering can be enabled after storage pool creation but it can't be disabled once enabled.",
  ).optional(),
  capacityGib: z.string().describe("Required. Capacity in GIB of the pool")
    .optional(),
  customPerformanceEnabled: z.boolean().describe(
    "Optional. True if using Independent Scaling of capacity and performance (Hyperdisk) By default set to false",
  ).optional(),
  description: z.string().describe("Optional. Description of the storage pool")
    .optional(),
  enableHotTierAutoResize: z.boolean().describe(
    "Optional. Flag indicating that the hot-tier threshold will be auto-increased by 10% of the hot-tier when it hits 100%. Default is true. The increment will kick in only if the new size after increment is still less than or equal to storage pool size.",
  ).optional(),
  hotTierSizeGib: z.string().describe(
    "Optional. Total hot tier capacity for the Storage Pool. It is applicable only to Flex service level. It should be less than the minimum storage pool size and cannot be more than the current storage pool size. It cannot be decreased once set.",
  ).optional(),
  kmsConfig: z.string().describe(
    "Optional. Specifies the KMS config to be used for volume encryption.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  ldapEnabled: z.boolean().describe(
    "Optional. Flag indicating if the pool is NFS LDAP enabled or not.",
  ).optional(),
  mode: z.enum(["MODE_UNSPECIFIED", "DEFAULT", "ONTAP"]).describe(
    "Optional. Mode of the storage pool. This field is used to control whether the user can perform ONTAP operations on the storage pool using the GCNV ONTAP Mode APIs. If not specified during creation, it defaults to `DEFAULT`.",
  ).optional(),
  name: z.string().describe("Identifier. Name of the storage pool").optional(),
  network: z.string().describe(
    "Required. VPC Network name. Format: projects/{project}/global/networks/{network}",
  ).optional(),
  psaRange: z.string().describe(
    "Optional. This field is not implemented. The values provided in this field are ignored.",
  ).optional(),
  qosType: z.enum(["QOS_TYPE_UNSPECIFIED", "AUTO", "MANUAL"]).describe(
    "Optional. QoS (Quality of Service) Type of the storage pool",
  ).optional(),
  replicaZone: z.string().describe(
    "Optional. Specifies the replica zone for regional storagePool.",
  ).optional(),
  scaleType: z.enum([
    "SCALE_TYPE_UNSPECIFIED",
    "SCALE_TYPE_DEFAULT",
    "SCALE_TYPE_SCALEOUT",
  ]).describe(
    "Optional. The scale type of the storage pool. Defaults to `SCALE_TYPE_DEFAULT` if not specified.",
  ).optional(),
  serviceLevel: z.enum([
    "SERVICE_LEVEL_UNSPECIFIED",
    "PREMIUM",
    "EXTREME",
    "STANDARD",
    "FLEX",
  ]).describe("Required. Service level of the storage pool").optional(),
  totalIops: z.string().describe(
    "Optional. Custom Performance Total IOPS of the pool if not provided, it will be calculated based on the total_throughput_mibps",
  ).optional(),
  totalThroughputMibps: z.string().describe(
    "Optional. Custom Performance Total Throughput of the pool (in MiBps)",
  ).optional(),
  type: z.enum(["STORAGE_POOL_TYPE_UNSPECIFIED", "FILE", "UNIFIED"]).describe(
    "Optional. Type of the storage pool. This field is used to control whether the pool supports `FILE` based volumes only or `UNIFIED` (both `FILE` and `BLOCK`) volumes. If not specified during creation, it defaults to `FILE`.",
  ).optional(),
  zone: z.string().describe(
    "Optional. Specifies the active zone for regional storagePool.",
  ).optional(),
  storagePoolId: z.string().describe(
    "Required. Id of the requesting storage pool. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud NetApp StoragePools. Registered at `@swamp/gcp/netapp/storagepools`. */
export const model = {
  type: "@swamp/gcp/netapp/storagepools",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Removed: scaleTier",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { scaleTier: _scaleTier, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.01.1",
      description: "Added: scaleType",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: location",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.3",
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
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "StoragePool is a container for volumes with a service level and capacity. Vol...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a storagePools",
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
        if (g["activeDirectory"] !== undefined) {
          body["activeDirectory"] = g["activeDirectory"];
        }
        if (g["allowAutoTiering"] !== undefined) {
          body["allowAutoTiering"] = g["allowAutoTiering"];
        }
        if (g["capacityGib"] !== undefined) {
          body["capacityGib"] = g["capacityGib"];
        }
        if (g["customPerformanceEnabled"] !== undefined) {
          body["customPerformanceEnabled"] = g["customPerformanceEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableHotTierAutoResize"] !== undefined) {
          body["enableHotTierAutoResize"] = g["enableHotTierAutoResize"];
        }
        if (g["hotTierSizeGib"] !== undefined) {
          body["hotTierSizeGib"] = g["hotTierSizeGib"];
        }
        if (g["kmsConfig"] !== undefined) body["kmsConfig"] = g["kmsConfig"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ldapEnabled"] !== undefined) {
          body["ldapEnabled"] = g["ldapEnabled"];
        }
        if (g["mode"] !== undefined) body["mode"] = g["mode"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["psaRange"] !== undefined) body["psaRange"] = g["psaRange"];
        if (g["qosType"] !== undefined) body["qosType"] = g["qosType"];
        if (g["replicaZone"] !== undefined) {
          body["replicaZone"] = g["replicaZone"];
        }
        if (g["scaleType"] !== undefined) body["scaleType"] = g["scaleType"];
        if (g["serviceLevel"] !== undefined) {
          body["serviceLevel"] = g["serviceLevel"];
        }
        if (g["totalIops"] !== undefined) body["totalIops"] = g["totalIops"];
        if (g["totalThroughputMibps"] !== undefined) {
          body["totalThroughputMibps"] = g["totalThroughputMibps"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
        if (g["storagePoolId"] !== undefined) {
          body["storagePoolId"] = g["storagePoolId"];
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
      description: "Get a storagePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the storagePools"),
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
      description: "Update storagePools attributes",
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
        if (g["activeDirectory"] !== undefined) {
          body["activeDirectory"] = g["activeDirectory"];
        }
        if (g["allowAutoTiering"] !== undefined) {
          body["allowAutoTiering"] = g["allowAutoTiering"];
        }
        if (g["capacityGib"] !== undefined) {
          body["capacityGib"] = g["capacityGib"];
        }
        if (g["customPerformanceEnabled"] !== undefined) {
          body["customPerformanceEnabled"] = g["customPerformanceEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableHotTierAutoResize"] !== undefined) {
          body["enableHotTierAutoResize"] = g["enableHotTierAutoResize"];
        }
        if (g["hotTierSizeGib"] !== undefined) {
          body["hotTierSizeGib"] = g["hotTierSizeGib"];
        }
        if (g["kmsConfig"] !== undefined) body["kmsConfig"] = g["kmsConfig"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ldapEnabled"] !== undefined) {
          body["ldapEnabled"] = g["ldapEnabled"];
        }
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["psaRange"] !== undefined) body["psaRange"] = g["psaRange"];
        if (g["qosType"] !== undefined) body["qosType"] = g["qosType"];
        if (g["replicaZone"] !== undefined) {
          body["replicaZone"] = g["replicaZone"];
        }
        if (g["scaleType"] !== undefined) body["scaleType"] = g["scaleType"];
        if (g["serviceLevel"] !== undefined) {
          body["serviceLevel"] = g["serviceLevel"];
        }
        if (g["totalIops"] !== undefined) body["totalIops"] = g["totalIops"];
        if (g["totalThroughputMibps"] !== undefined) {
          body["totalThroughputMibps"] = g["totalThroughputMibps"];
        }
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
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
      description: "Delete the storagePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the storagePools"),
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
      description: "Sync storagePools state from GCP",
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
    restore_volume: {
      description: "restore volume",
      arguments: z.object({
        backupSource: z.any().optional(),
        ontapVolumeTarget: z.any().optional(),
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
        if (args["backupSource"] !== undefined) {
          body["backupSource"] = args["backupSource"];
        }
        if (args["ontapVolumeTarget"] !== undefined) {
          body["ontapVolumeTarget"] = args["ontapVolumeTarget"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.storagePools.restoreVolume",
            "path": "v1/{+name}:restoreVolume",
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
    switch: {
      description: "switch",
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
            "id": "netapp.projects.locations.storagePools.switch",
            "path": "v1/{+name}:switch",
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
    update_backup_config: {
      description: "update backup config",
      arguments: z.object({
        backupConfig: z.any().optional(),
        updateMask: z.any().optional(),
        volumeUuid: z.any().optional(),
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
        if (args["backupConfig"] !== undefined) {
          body["backupConfig"] = args["backupConfig"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        if (args["volumeUuid"] !== undefined) {
          body["volumeUuid"] = args["volumeUuid"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.storagePools.updateBackupConfig",
            "path": "v1/{+name}:updateBackupConfig",
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
    validate_directory_service: {
      description: "validate directory service",
      arguments: z.object({
        directoryServiceType: z.any().optional(),
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
        if (args["directoryServiceType"] !== undefined) {
          body["directoryServiceType"] = args["directoryServiceType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "netapp.projects.locations.storagePools.validateDirectoryService",
            "path": "v1/{+name}:validateDirectoryService",
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
