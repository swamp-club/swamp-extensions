// Auto-generated extension model for @swamp/gcp/memcache/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Memorystore for Memcached Instances.
 *
 * A Memorystore for Memcached instance
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://memcache.googleapis.com/";

const GET_CONFIG = {
  "id": "memcache.projects.locations.instances.get",
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
  "id": "memcache.projects.locations.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "memcache.projects.locations.instances.patch",
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
  "id": "memcache.projects.locations.instances.delete",
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

const GlobalArgsSchema = z.object({
  authorizedNetwork: z.string().describe(
    "The full name of the Google Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the instance is connected. If left unspecified, the `default` network will be used.",
  ).optional(),
  displayName: z.string().describe(
    "User provided name for the instance, which is only used for display purposes. Cannot be more than 80 characters.",
  ).optional(),
  instanceMessages: z.array(z.object({
    code: z.enum(["CODE_UNSPECIFIED", "ZONE_DISTRIBUTION_UNBALANCED"]).describe(
      "A code that correspond to one type of user-facing message.",
    ).optional(),
    message: z.string().describe(
      "Message on memcached instance which will be exposed to users.",
    ).optional(),
  })).describe(
    "List of messages that describe the current state of the Memcached instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources",
  ).optional(),
  maintenancePolicy: z.object({
    createTime: z.string().describe(
      "Output only. The time when the policy was created.",
    ).optional(),
    description: z.string().describe(
      "Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the policy was updated.",
    ).optional(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Required. Allows to define schedule that runs specified day of the week.",
      ).optional(),
      duration: z.string().describe("Required. Duration of the time window.")
        .optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Required. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_windows is expected to be one.",
    ).optional(),
  }).describe("Maintenance policy per instance.").optional(),
  maintenanceSchedule: z.object({
    endTime: z.string().describe(
      "Output only. The end time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
    scheduleDeadlineTime: z.string().describe(
      "Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The start time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
  }).describe("Upcoming maintenance schedule.").optional(),
  maintenanceVersion: z.string().describe(
    "Optional. Last self service update maintenance version triggered by the customer. If it is empty, it means that the maintenance version is not set by the user.",
  ).optional(),
  memcacheVersion: z.enum([
    "MEMCACHE_VERSION_UNSPECIFIED",
    "MEMCACHE_1_5",
    "MEMCACHE_1_6_15",
  ]).describe(
    "The major version of Memcached software. If not provided, latest supported version will be used. Currently the latest supported major version is `MEMCACHE_1_5`. The minor version will be automatically determined by our system based on the latest supported minor version.",
  ).optional(),
  name: z.string().describe(
    "Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details.",
  ).optional(),
  nodeConfig: z.object({
    cpuCount: z.number().int().describe(
      "Required. Number of cpus per Memcached node.",
    ).optional(),
    memorySizeMb: z.number().int().describe(
      "Required. Memory size in MiB for each Memcached node.",
    ).optional(),
  }).describe("Configuration for a Memcached Node.").optional(),
  nodeCount: z.number().int().describe(
    "Required. Number of nodes in the Memcached instance.",
  ).optional(),
  parameters: z.object({
    id: z.string().describe(
      "Output only. The unique ID associated with this set of parameters. Users can use this id to determine if the parameters associated with the instance differ from the parameters associated with the nodes. A discrepancy between parameter ids can inform users that they may need to take action to apply parameters on nodes.",
    ).optional(),
    params: z.record(z.string(), z.string()).describe(
      "User defined set of parameters to use in the memcached process.",
    ).optional(),
  }).optional(),
  reservedIpRangeId: z.array(z.string()).describe(
    'Optional. Contains the id of allocated IP address ranges associated with the private service access connection for example, "test-default" associated with IP range 10.0.0.0/29.',
  ).optional(),
  zones: z.array(z.string()).describe(
    "Zones in which Memcached nodes should be provisioned. Memcached nodes will be equally distributed across these zones. If not provided, the service will by default create nodes in all zones in the region for the instance.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The logical name of the Memcached instance in the user project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the user project / location. If any of the above are not met, the API raises an invalid argument error.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authorizedNetwork: z.string().optional(),
  availableMaintenanceVersions: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  discoveryEndpoint: z.string().optional(),
  displayName: z.string().optional(),
  effectiveMaintenanceVersion: z.string().optional(),
  instanceMessages: z.array(z.object({
    code: z.string(),
    message: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  maintenancePolicy: z.object({
    createTime: z.string(),
    description: z.string(),
    updateTime: z.string(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.string(),
      duration: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  maintenanceSchedule: z.object({
    endTime: z.string(),
    scheduleDeadlineTime: z.string(),
    startTime: z.string(),
  }).optional(),
  maintenanceVersion: z.string().optional(),
  memcacheFullVersion: z.string().optional(),
  memcacheNodes: z.array(z.object({
    host: z.string(),
    memcacheFullVersion: z.string(),
    memcacheVersion: z.string(),
    nodeId: z.string(),
    parameters: z.object({
      id: z.string(),
      params: z.record(z.string(), z.unknown()),
    }),
    port: z.number(),
    state: z.string(),
    zone: z.string(),
  })).optional(),
  memcacheVersion: z.string().optional(),
  name: z.string(),
  nodeConfig: z.object({
    cpuCount: z.number(),
    memorySizeMb: z.number(),
  }).optional(),
  nodeCount: z.number().optional(),
  parameters: z.object({
    id: z.string(),
    params: z.record(z.string(), z.unknown()),
  }).optional(),
  reservedIpRangeId: z.array(z.string()).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  zones: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  authorizedNetwork: z.string().describe(
    "The full name of the Google Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the instance is connected. If left unspecified, the `default` network will be used.",
  ).optional(),
  displayName: z.string().describe(
    "User provided name for the instance, which is only used for display purposes. Cannot be more than 80 characters.",
  ).optional(),
  instanceMessages: z.array(z.object({
    code: z.enum(["CODE_UNSPECIFIED", "ZONE_DISTRIBUTION_UNBALANCED"]).describe(
      "A code that correspond to one type of user-facing message.",
    ).optional(),
    message: z.string().describe(
      "Message on memcached instance which will be exposed to users.",
    ).optional(),
  })).describe(
    "List of messages that describe the current state of the Memcached instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources",
  ).optional(),
  maintenancePolicy: z.object({
    createTime: z.string().describe(
      "Output only. The time when the policy was created.",
    ).optional(),
    description: z.string().describe(
      "Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the policy was updated.",
    ).optional(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Required. Allows to define schedule that runs specified day of the week.",
      ).optional(),
      duration: z.string().describe("Required. Duration of the time window.")
        .optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Required. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_windows is expected to be one.",
    ).optional(),
  }).describe("Maintenance policy per instance.").optional(),
  maintenanceSchedule: z.object({
    endTime: z.string().describe(
      "Output only. The end time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
    scheduleDeadlineTime: z.string().describe(
      "Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The start time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
  }).describe("Upcoming maintenance schedule.").optional(),
  maintenanceVersion: z.string().describe(
    "Optional. Last self service update maintenance version triggered by the customer. If it is empty, it means that the maintenance version is not set by the user.",
  ).optional(),
  memcacheVersion: z.enum([
    "MEMCACHE_VERSION_UNSPECIFIED",
    "MEMCACHE_1_5",
    "MEMCACHE_1_6_15",
  ]).describe(
    "The major version of Memcached software. If not provided, latest supported version will be used. Currently the latest supported major version is `MEMCACHE_1_5`. The minor version will be automatically determined by our system based on the latest supported minor version.",
  ).optional(),
  name: z.string().describe(
    "Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details.",
  ).optional(),
  nodeConfig: z.object({
    cpuCount: z.number().int().describe(
      "Required. Number of cpus per Memcached node.",
    ).optional(),
    memorySizeMb: z.number().int().describe(
      "Required. Memory size in MiB for each Memcached node.",
    ).optional(),
  }).describe("Configuration for a Memcached Node.").optional(),
  nodeCount: z.number().int().describe(
    "Required. Number of nodes in the Memcached instance.",
  ).optional(),
  parameters: z.object({
    id: z.string().describe(
      "Output only. The unique ID associated with this set of parameters. Users can use this id to determine if the parameters associated with the instance differ from the parameters associated with the nodes. A discrepancy between parameter ids can inform users that they may need to take action to apply parameters on nodes.",
    ).optional(),
    params: z.record(z.string(), z.string()).describe(
      "User defined set of parameters to use in the memcached process.",
    ).optional(),
  }).optional(),
  reservedIpRangeId: z.array(z.string()).describe(
    'Optional. Contains the id of allocated IP address ranges associated with the private service access connection for example, "test-default" associated with IP range 10.0.0.0/29.',
  ).optional(),
  zones: z.array(z.string()).describe(
    "Zones in which Memcached nodes should be provisioned. Memcached nodes will be equally distributed across these zones. If not provided, the service will by default create nodes in all zones in the region for the instance.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The logical name of the Memcached instance in the user project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the user project / location. If any of the above are not met, the API raises an invalid argument error.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Memorystore for Memcached Instances. Registered at `@swamp/gcp/memcache/instances`. */
export const model = {
  type: "@swamp/gcp/memcache/instances",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Memorystore for Memcached instance",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
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
        if (g["authorizedNetwork"] !== undefined) {
          body["authorizedNetwork"] = g["authorizedNetwork"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["instanceMessages"] !== undefined) {
          body["instanceMessages"] = g["instanceMessages"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceVersion"] !== undefined) {
          body["maintenanceVersion"] = g["maintenanceVersion"];
        }
        if (g["memcacheVersion"] !== undefined) {
          body["memcacheVersion"] = g["memcacheVersion"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["nodeCount"] !== undefined) body["nodeCount"] = g["nodeCount"];
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        if (g["reservedIpRangeId"] !== undefined) {
          body["reservedIpRangeId"] = g["reservedIpRangeId"];
        }
        if (g["zones"] !== undefined) body["zones"] = g["zones"];
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Update instances attributes",
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
        if (g["authorizedNetwork"] !== undefined) {
          body["authorizedNetwork"] = g["authorizedNetwork"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["instanceMessages"] !== undefined) {
          body["instanceMessages"] = g["instanceMessages"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceVersion"] !== undefined) {
          body["maintenanceVersion"] = g["maintenanceVersion"];
        }
        if (g["memcacheVersion"] !== undefined) {
          body["memcacheVersion"] = g["memcacheVersion"];
        }
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["nodeCount"] !== undefined) body["nodeCount"] = g["nodeCount"];
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        if (g["reservedIpRangeId"] !== undefined) {
          body["reservedIpRangeId"] = g["reservedIpRangeId"];
        }
        if (g["zones"] !== undefined) body["zones"] = g["zones"];
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
    apply_parameters: {
      description: "apply parameters",
      arguments: z.object({
        applyAll: z.any().optional(),
        nodeIds: z.any().optional(),
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
        if (args["applyAll"] !== undefined) body["applyAll"] = args["applyAll"];
        if (args["nodeIds"] !== undefined) body["nodeIds"] = args["nodeIds"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "memcache.projects.locations.instances.applyParameters",
            "path": "v1/{+name}:applyParameters",
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
    get_tags: {
      description: "get tags",
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
            "id": "memcache.projects.locations.instances.getTags",
            "path": "v1/{+name}:getTags",
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
    reschedule_maintenance: {
      description: "reschedule maintenance",
      arguments: z.object({
        rescheduleType: z.any().optional(),
        scheduleTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["rescheduleType"] !== undefined) {
          body["rescheduleType"] = args["rescheduleType"];
        }
        if (args["scheduleTime"] !== undefined) {
          body["scheduleTime"] = args["scheduleTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "memcache.projects.locations.instances.rescheduleMaintenance",
            "path": "v1/{+instance}:rescheduleMaintenance",
            "httpMethod": "POST",
            "parameterOrder": ["instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_tags: {
      description: "set tags",
      arguments: z.object({
        etag: z.any().optional(),
        name: z.any().optional(),
        requestId: z.any().optional(),
        tags: z.any().optional(),
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "memcache.projects.locations.instances.setTags",
            "path": "v1/{+name}:setTags",
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
    update_parameters: {
      description: "update parameters",
      arguments: z.object({
        parameters: z.any().optional(),
        updateMask: z.any().optional(),
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
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "memcache.projects.locations.instances.updateParameters",
            "path": "v1/{+name}:updateParameters",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    upgrade: {
      description: "upgrade",
      arguments: z.object({
        memcacheVersion: z.any().optional(),
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
        if (args["memcacheVersion"] !== undefined) {
          body["memcacheVersion"] = args["memcacheVersion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "memcache.projects.locations.instances.upgrade",
            "path": "v1/{+name}:upgrade",
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
