// Auto-generated extension model for @swamp/gcp/compute/resourcepolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ResourcePolicies.
 *
 * Represents a Resource Policy resource. You can use resource policies to schedule actions for some Compute Engine resources. For example, you can use them toschedule persistent disk snapshots.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.resourcePolicies.get",
  "path":
    "projects/{project}/regions/{region}/resourcePolicies/{resourcePolicy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "resourcePolicy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "resourcePolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.resourcePolicies.insert",
  "path": "projects/{project}/regions/{region}/resourcePolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.resourcePolicies.patch",
  "path":
    "projects/{project}/regions/{region}/resourcePolicies/{resourcePolicy}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "resourcePolicy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "resourcePolicy": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.resourcePolicies.delete",
  "path":
    "projects/{project}/regions/{region}/resourcePolicies/{resourcePolicy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "resourcePolicy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "resourcePolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.resourcePolicies.list",
  "path": "projects/{project}/regions/{region}/resourcePolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().optional(),
  diskConsistencyGroupPolicy: z.object({}).describe(
    "Resource policy for disk consistency groups.",
  ).optional(),
  groupPlacementPolicy: z.object({
    acceleratorTopologyMode: z.enum(["AUTO_CONNECT", "PROVISION_ONLY"])
      .describe(
        "Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT.",
      ).optional(),
    availabilityDomainCount: z.number().int().describe(
      "The number of availability domains to spread instances across. If two instances are in different availability domain, they are not in the same low latency network.",
    ).optional(),
    collocation: z.enum(["COLLOCATED", "UNSPECIFIED_COLLOCATION"]).describe(
      "Specifies network collocation",
    ).optional(),
    gpuTopology: z.string().describe(
      "Specifies the shape of the GPU slice, in slice based GPU families eg. A4X.",
    ).optional(),
    vmCount: z.number().int().describe(
      "Number of VMs in this placement group. Google does not recommend that you use this field unless you use a compact policy and you want your policy to work only if it contains this exact number of VMs.",
    ).optional(),
  }).describe(
    "A GroupPlacementPolicy specifies resource placement configuration. It specifies the failure bucket separation",
  ).optional(),
  instanceSchedulePolicy: z.object({
    expirationTime: z.string().describe(
      "The expiration time of the schedule. The timestamp is an RFC3339 string.",
    ).optional(),
    startTime: z.string().describe(
      "The start time of the schedule. The timestamp is an RFC3339 string.",
    ).optional(),
    timeZone: z.string().describe(
      "Specifies the time zone to be used in interpreting Schedule.schedule. The value of this field must be a time zone name from the tz database: https://wikipedia.org/wiki/Tz_database.",
    ).optional(),
    vmStartSchedule: z.object({
      schedule: z.string().describe(
        "Specifies the frequency for the operation, using the unix-cron format.",
      ).optional(),
    }).describe("Schedule for an instance operation.").optional(),
    vmStopSchedule: z.object({
      schedule: z.string().describe(
        "Specifies the frequency for the operation, using the unix-cron format.",
      ).optional(),
    }).describe("Schedule for an instance operation.").optional(),
  }).describe(
    "An InstanceSchedulePolicy specifies when and how frequent certain operations are performed on the instance.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  region: z.string().optional(),
  snapshotSchedulePolicy: z.object({
    retentionPolicy: z.object({
      maxRetentionDays: z.number().int().describe(
        "Maximum age of the snapshot that is allowed to be kept.",
      ).optional(),
      onSourceDiskDelete: z.enum([
        "APPLY_RETENTION_POLICY",
        "KEEP_AUTO_SNAPSHOTS",
        "UNSPECIFIED_ON_SOURCE_DISK_DELETE",
      ]).describe(
        "Specifies the behavior to apply to scheduled snapshots when the source disk is deleted.",
      ).optional(),
    }).describe("Policy for retention of scheduled snapshots.").optional(),
    schedule: z.object({
      dailySchedule: z.object({
        daysInCycle: z.number().int().describe(
          "Defines a schedule with units measured in days. The value determines how many days pass between the start of each cycle.",
        ).optional(),
        duration: z.string().describe(
          "Output only. [Output only] A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario.",
        ).optional(),
        startTime: z.string().describe(
          "Start time of the window. This must be in UTC format that resolves to one of 00:00, 04:00, 08:00,12:00, 16:00, or 20:00. For example, both 13:00-5 and 08:00 are valid.",
        ).optional(),
      }).describe("Time window specified for daily operations.").optional(),
      hourlySchedule: z.object({
        duration: z.string().describe(
          "Output only. [Output only] Duration of the time window, automatically chosen to be smallest possible in the given scenario.",
        ).optional(),
        hoursInCycle: z.number().int().describe(
          "Defines a schedule with units measured in hours. The value determines how many hours pass between the start of each cycle.",
        ).optional(),
        startTime: z.string().describe(
          'Time within the window to start the operations. It must be in format "HH:MM", where HH: [00-23] and MM: [00-00] GMT.',
        ).optional(),
      }).describe("Time window specified for hourly operations.").optional(),
      weeklySchedule: z.object({
        dayOfWeeks: z.array(z.object({
          day: z.unknown().describe(
            "Defines a schedule that runs on specific days of the week. Specify one or more days. The following options are available: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY.",
          ).optional(),
          duration: z.unknown().describe(
            "Output only. [Output only] Duration of the time window, automatically chosen to be smallest possible in the given scenario.",
          ).optional(),
          startTime: z.unknown().describe(
            'Time within the window to start the operations. It must be in format "HH:MM", where HH: [00-23] and MM: [00-00] GMT.',
          ).optional(),
        })).describe("Up to 7 intervals/windows, one for each day of the week.")
          .optional(),
      }).describe("Time window specified for weekly operations.").optional(),
    }).describe(
      "A schedule for disks where the schedueled operations are performed.",
    ).optional(),
    snapshotProperties: z.object({
      chainName: z.string().describe(
        "Chain name that the snapshot is created in.",
      ).optional(),
      guestFlush: z.boolean().describe(
        "Indication to perform a 'guest aware' snapshot.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Labels to apply to scheduled snapshots. These can be later modified by the setLabels method. Label values may be empty.",
      ).optional(),
      storageLocations: z.array(z.string()).describe(
        "Cloud Storage bucket storage location of the auto snapshot (regional or multi-regional).",
      ).optional(),
    }).describe(
      "Specified snapshot properties for scheduled snapshots created by this policy.",
    ).optional(),
  }).describe(
    "A snapshot schedule policy specifies when and how frequently snapshots are to be created for the target disk. Also specifies how many and how long these scheduled snapshots should be retained.",
  ).optional(),
  workloadPolicy: z.object({
    acceleratorTopology: z.string().describe(
      "Specifies the topology required to create a partition for VMs that have interconnected GPUs.",
    ).optional(),
    acceleratorTopologyMode: z.enum(["AUTO_CONNECT", "PROVISION_ONLY"])
      .describe(
        "Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT.",
      ).optional(),
    maxTopologyDistance: z.enum(["BLOCK", "CLUSTER", "SUBBLOCK"]).describe(
      "Specifies the maximum distance between instances.",
    ).optional(),
    type: z.enum(["HIGH_AVAILABILITY", "HIGH_THROUGHPUT"]).describe(
      "Specifies the intent of the instance placement in the MIG.",
    ).optional(),
  }).describe("Represents the workload policy.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  diskConsistencyGroupPolicy: z.object({}).optional(),
  groupPlacementPolicy: z.object({
    acceleratorTopologyMode: z.string(),
    availabilityDomainCount: z.number(),
    collocation: z.string(),
    gpuTopology: z.string(),
    vmCount: z.number(),
  }).optional(),
  id: z.string().optional(),
  instanceSchedulePolicy: z.object({
    expirationTime: z.string(),
    startTime: z.string(),
    timeZone: z.string(),
    vmStartSchedule: z.object({
      schedule: z.string(),
    }),
    vmStopSchedule: z.object({
      schedule: z.string(),
    }),
  }).optional(),
  kind: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  resourceStatus: z.object({
    instanceSchedulePolicy: z.object({
      lastRunStartTime: z.string(),
      nextRunStartTime: z.string(),
    }),
  }).optional(),
  selfLink: z.string().optional(),
  snapshotSchedulePolicy: z.object({
    retentionPolicy: z.object({
      maxRetentionDays: z.number(),
      onSourceDiskDelete: z.string(),
    }),
    schedule: z.object({
      dailySchedule: z.object({
        daysInCycle: z.number(),
        duration: z.string(),
        startTime: z.string(),
      }),
      hourlySchedule: z.object({
        duration: z.string(),
        hoursInCycle: z.number(),
        startTime: z.string(),
      }),
      weeklySchedule: z.object({
        dayOfWeeks: z.array(z.object({
          day: z.unknown(),
          duration: z.unknown(),
          startTime: z.unknown(),
        })),
      }),
    }),
    snapshotProperties: z.object({
      chainName: z.string(),
      guestFlush: z.boolean(),
      labels: z.record(z.string(), z.unknown()),
      storageLocations: z.array(z.string()),
    }),
  }).optional(),
  status: z.string().optional(),
  workloadPolicy: z.object({
    acceleratorTopology: z.string(),
    acceleratorTopologyMode: z.string(),
    maxTopologyDistance: z.string(),
    type: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().optional(),
  diskConsistencyGroupPolicy: z.object({}).describe(
    "Resource policy for disk consistency groups.",
  ).optional(),
  groupPlacementPolicy: z.object({
    acceleratorTopologyMode: z.enum(["AUTO_CONNECT", "PROVISION_ONLY"])
      .describe(
        "Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT.",
      ).optional(),
    availabilityDomainCount: z.number().int().describe(
      "The number of availability domains to spread instances across. If two instances are in different availability domain, they are not in the same low latency network.",
    ).optional(),
    collocation: z.enum(["COLLOCATED", "UNSPECIFIED_COLLOCATION"]).describe(
      "Specifies network collocation",
    ).optional(),
    gpuTopology: z.string().describe(
      "Specifies the shape of the GPU slice, in slice based GPU families eg. A4X.",
    ).optional(),
    vmCount: z.number().int().describe(
      "Number of VMs in this placement group. Google does not recommend that you use this field unless you use a compact policy and you want your policy to work only if it contains this exact number of VMs.",
    ).optional(),
  }).describe(
    "A GroupPlacementPolicy specifies resource placement configuration. It specifies the failure bucket separation",
  ).optional(),
  instanceSchedulePolicy: z.object({
    expirationTime: z.string().describe(
      "The expiration time of the schedule. The timestamp is an RFC3339 string.",
    ).optional(),
    startTime: z.string().describe(
      "The start time of the schedule. The timestamp is an RFC3339 string.",
    ).optional(),
    timeZone: z.string().describe(
      "Specifies the time zone to be used in interpreting Schedule.schedule. The value of this field must be a time zone name from the tz database: https://wikipedia.org/wiki/Tz_database.",
    ).optional(),
    vmStartSchedule: z.object({
      schedule: z.string().describe(
        "Specifies the frequency for the operation, using the unix-cron format.",
      ).optional(),
    }).describe("Schedule for an instance operation.").optional(),
    vmStopSchedule: z.object({
      schedule: z.string().describe(
        "Specifies the frequency for the operation, using the unix-cron format.",
      ).optional(),
    }).describe("Schedule for an instance operation.").optional(),
  }).describe(
    "An InstanceSchedulePolicy specifies when and how frequent certain operations are performed on the instance.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  region: z.string().optional(),
  snapshotSchedulePolicy: z.object({
    retentionPolicy: z.object({
      maxRetentionDays: z.number().int().describe(
        "Maximum age of the snapshot that is allowed to be kept.",
      ).optional(),
      onSourceDiskDelete: z.enum([
        "APPLY_RETENTION_POLICY",
        "KEEP_AUTO_SNAPSHOTS",
        "UNSPECIFIED_ON_SOURCE_DISK_DELETE",
      ]).describe(
        "Specifies the behavior to apply to scheduled snapshots when the source disk is deleted.",
      ).optional(),
    }).describe("Policy for retention of scheduled snapshots.").optional(),
    schedule: z.object({
      dailySchedule: z.object({
        daysInCycle: z.number().int().describe(
          "Defines a schedule with units measured in days. The value determines how many days pass between the start of each cycle.",
        ).optional(),
        duration: z.string().describe(
          "Output only. [Output only] A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario.",
        ).optional(),
        startTime: z.string().describe(
          "Start time of the window. This must be in UTC format that resolves to one of 00:00, 04:00, 08:00,12:00, 16:00, or 20:00. For example, both 13:00-5 and 08:00 are valid.",
        ).optional(),
      }).describe("Time window specified for daily operations.").optional(),
      hourlySchedule: z.object({
        duration: z.string().describe(
          "Output only. [Output only] Duration of the time window, automatically chosen to be smallest possible in the given scenario.",
        ).optional(),
        hoursInCycle: z.number().int().describe(
          "Defines a schedule with units measured in hours. The value determines how many hours pass between the start of each cycle.",
        ).optional(),
        startTime: z.string().describe(
          'Time within the window to start the operations. It must be in format "HH:MM", where HH: [00-23] and MM: [00-00] GMT.',
        ).optional(),
      }).describe("Time window specified for hourly operations.").optional(),
      weeklySchedule: z.object({
        dayOfWeeks: z.array(z.object({
          day: z.unknown().describe(
            "Defines a schedule that runs on specific days of the week. Specify one or more days. The following options are available: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY.",
          ).optional(),
          duration: z.unknown().describe(
            "Output only. [Output only] Duration of the time window, automatically chosen to be smallest possible in the given scenario.",
          ).optional(),
          startTime: z.unknown().describe(
            'Time within the window to start the operations. It must be in format "HH:MM", where HH: [00-23] and MM: [00-00] GMT.',
          ).optional(),
        })).describe("Up to 7 intervals/windows, one for each day of the week.")
          .optional(),
      }).describe("Time window specified for weekly operations.").optional(),
    }).describe(
      "A schedule for disks where the schedueled operations are performed.",
    ).optional(),
    snapshotProperties: z.object({
      chainName: z.string().describe(
        "Chain name that the snapshot is created in.",
      ).optional(),
      guestFlush: z.boolean().describe(
        "Indication to perform a 'guest aware' snapshot.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Labels to apply to scheduled snapshots. These can be later modified by the setLabels method. Label values may be empty.",
      ).optional(),
      storageLocations: z.array(z.string()).describe(
        "Cloud Storage bucket storage location of the auto snapshot (regional or multi-regional).",
      ).optional(),
    }).describe(
      "Specified snapshot properties for scheduled snapshots created by this policy.",
    ).optional(),
  }).describe(
    "A snapshot schedule policy specifies when and how frequently snapshots are to be created for the target disk. Also specifies how many and how long these scheduled snapshots should be retained.",
  ).optional(),
  workloadPolicy: z.object({
    acceleratorTopology: z.string().describe(
      "Specifies the topology required to create a partition for VMs that have interconnected GPUs.",
    ).optional(),
    acceleratorTopologyMode: z.enum(["AUTO_CONNECT", "PROVISION_ONLY"])
      .describe(
        "Specifies the connection mode for the accelerator topology. If not specified, the default is AUTO_CONNECT.",
      ).optional(),
    maxTopologyDistance: z.enum(["BLOCK", "CLUSTER", "SUBBLOCK"]).describe(
      "Specifies the maximum distance between instances.",
    ).optional(),
    type: z.enum(["HIGH_AVAILABILITY", "HIGH_THROUGHPUT"]).describe(
      "Specifies the intent of the instance placement in the MIG.",
    ).optional(),
  }).describe("Represents the workload policy.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine ResourcePolicies. Registered at `@swamp/gcp/compute/resourcepolicies`. */
export const model = {
  type: "@swamp/gcp/compute/resourcepolicies",
  version: "2026.05.25.1",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Resource Policy resource. You can use resource policies to sched...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a resourcePolicies",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskConsistencyGroupPolicy"] !== undefined) {
          body["diskConsistencyGroupPolicy"] = g["diskConsistencyGroupPolicy"];
        }
        if (g["groupPlacementPolicy"] !== undefined) {
          body["groupPlacementPolicy"] = g["groupPlacementPolicy"];
        }
        if (g["instanceSchedulePolicy"] !== undefined) {
          body["instanceSchedulePolicy"] = g["instanceSchedulePolicy"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["snapshotSchedulePolicy"] !== undefined) {
          body["snapshotSchedulePolicy"] = g["snapshotSchedulePolicy"];
        }
        if (g["workloadPolicy"] !== undefined) {
          body["workloadPolicy"] = g["workloadPolicy"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["resourcePolicy"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "region": String(g["region"] ?? ""),
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
      description: "Get a resourcePolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the resourcePolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["resourcePolicy"] = args.identifier;
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
      description: "Update resourcePolicies attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["resourcePolicy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskConsistencyGroupPolicy"] !== undefined) {
          body["diskConsistencyGroupPolicy"] = g["diskConsistencyGroupPolicy"];
        }
        if (g["groupPlacementPolicy"] !== undefined) {
          body["groupPlacementPolicy"] = g["groupPlacementPolicy"];
        }
        if (g["instanceSchedulePolicy"] !== undefined) {
          body["instanceSchedulePolicy"] = g["instanceSchedulePolicy"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["snapshotSchedulePolicy"] !== undefined) {
          body["snapshotSchedulePolicy"] = g["snapshotSchedulePolicy"];
        }
        if (g["workloadPolicy"] !== undefined) {
          body["workloadPolicy"] = g["workloadPolicy"];
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
              "statusField": "status",
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
      description: "Delete the resourcePolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the resourcePolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["resourcePolicy"] = args.identifier;
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
      description: "Sync resourcePolicies state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resourcePolicy"] = identifier;
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
      description: "List resourcePolicies resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.resourcePolicies.getIamPolicy",
            "path":
              "projects/{project}/regions/{region}/resourcePolicies/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.resourcePolicies.setIamPolicy",
            "path":
              "projects/{project}/regions/{region}/resourcePolicies/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.resourcePolicies.testIamPermissions",
            "path":
              "projects/{project}/regions/{region}/resourcePolicies/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
