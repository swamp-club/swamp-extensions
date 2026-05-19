// Auto-generated extension model for @swamp/gcp/vmwareengine/privateclouds-upgrades
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VMware Engine PrivateClouds.Upgrades.
 *
 * Describes Private cloud Upgrade.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/upgrades/${shortName}`;
}

const BASE_URL = "https://vmwareengine.googleapis.com/";

const GET_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.upgrades.get",
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

const PATCH_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.upgrades.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  componentUpgrades: z.array(z.object({
    componentType: z.enum([
      "VMWARE_COMPONENT_TYPE_UNSPECIFIED",
      "VCENTER",
      "ESXI",
      "NSXT_UC",
      "NSXT_EDGE",
      "NSXT_MGR",
      "HCX",
      "VSAN",
      "DVS",
      "NAMESERVER_VM",
      "KMS_VM",
      "WITNESS_VM",
      "NSXT",
      "CLUSTER",
      "VM_TOOLS",
    ]).describe("Output only. Type of component").optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "RUNNING",
      "PAUSED",
      "SUCCEEDED",
      "FAILED",
      "NOT_STARTED",
      "NOT_APPLICABLE",
    ]).describe("Output only. Component's upgrade state.").optional(),
  })).describe("Output only. Output Only. The list of component upgrades.")
    .optional(),
  createTime: z.string().describe(
    "Output only. Output Only. Creation time of this resource.",
  ).optional(),
  description: z.string().describe(
    "Output only. Output Only. The description of the upgrade. This is used to provide additional information about the private cloud upgrade, such as the upgrade's purpose, the changes included in the upgrade, or any other relevant information about the upgrade.",
  ).optional(),
  endTime: z.string().describe(
    "Output only. Output Only. End time of the upgrade.",
  ).optional(),
  estimatedDuration: z.string().describe(
    "Output only. Output Only. The estimated total duration of the upgrade. This information can be used to plan or schedule upgrades to minimize disruptions. Please note that the estimated duration is only an estimate. The actual upgrade duration may vary.",
  ).optional(),
  etag: z.string().describe(
    "The etag for the upgrade resource. If this is provided on update, it must match the server's etag.",
  ).optional(),
  name: z.string().describe(
    "Output only. Identifier. The resource name of the private cloud `Upgrade`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/privateClouds/my-cloud/upgrades/my-upgrade`",
  ).optional(),
  schedule: z.object({
    constraints: z.object({
      disallowedIntervals: z.array(z.object({
        endDay: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe(
          "Output only. The day on which the interval ends. Can be same as start day.",
        ).optional(),
        endTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
        ).optional(),
        startDay: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Output only. The day on which the interval starts.")
          .optional(),
        startTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
        ).optional(),
      })).describe(
        "Output only. Output Only. A list of intervals in which maintenance windows are not allowed. Any time window that overlaps with any of these intervals will be considered invalid.",
      ).optional(),
      minHoursDay: z.number().int().describe(
        "Output only. Minimum number of hours must be allotted for the upgrade activities for each selected day. This is a minimum; the upgrade schedule can allot more hours for the given day.",
      ).optional(),
      minHoursWeek: z.number().int().describe(
        "Output only. The minimum number of weekly hours must be allotted for the upgrade activities. This is just a minimum; the schedule can assign more weekly hours.",
      ).optional(),
      rescheduleDateRange: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
      ).optional(),
    }).describe(
      "Constraints to be applied while editing a schedule. These constraints ensure that `Upgrade` specific requirements are met.",
    ).optional(),
    editWindow: z.object({
      endTime: z.string().describe(
        "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
      ).optional(),
      startTime: z.string().describe(
        "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
      ).optional(),
    }).describe(
      "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
    ).optional(),
    lastEditor: z.enum(["EDITOR_UNSPECIFIED", "SYSTEM", "USER"]).describe(
      "Output only. Output Only. Indicates who most recently edited the upgrade schedule. The value is updated whenever the upgrade is rescheduled.",
    ).optional(),
    startTime: z.string().describe(
      "Required. The scheduled start time for the upgrade.",
    ).optional(),
    weeklyWindows: z.array(z.object({
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Required. Day of the week for this window.").optional(),
      duration: z.string().describe(
        "Required. The duration of the window. The max allowed duration for any window is 24 hours.",
      ).optional(),
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
      "Required. Weekly time windows for upgrade activities. The server performs upgrade activities during these time windows to minimize disruptions.",
    ).optional(),
  }).describe("Schedule for the upgrade.").optional(),
  startVersion: z.string().describe(
    "Output only. Output Only. The start version",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "SCHEDULED",
    "ONGOING",
    "SUCCEEDED",
    "PAUSED",
    "FAILED",
    "CANCELLING",
    "CANCELLED",
    "RESCHEDULING",
  ]).describe("Output only. The current state of the upgrade.").optional(),
  targetVersion: z.string().describe(
    "Output only. Output Only. The target version",
  ).optional(),
  type: z.enum([
    "TYPE_UNSPECIFIED",
    "VSPHERE_UPGRADE",
    "VSPHERE_PATCH",
    "WORKAROUND",
    "FIRMWARE_UPGRADE",
    "SWITCH_UPGRADE",
    "OTHER",
    "INFRASTRUCTURE_UPGRADE",
  ]).describe("Output only. Output Only. The type of upgrade.").optional(),
  uid: z.string().describe(
    "Output only. System-generated unique identifier for the resource.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Output Only. Last update time of this resource.",
  ).optional(),
  version: z.string().describe("Output only.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  componentUpgrades: z.array(z.object({
    componentType: z.string(),
    state: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  endTime: z.string().optional(),
  estimatedDuration: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  schedule: z.object({
    constraints: z.object({
      disallowedIntervals: z.array(z.object({
        endDay: z.string(),
        endTime: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        startDay: z.string(),
        startTime: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
      })),
      minHoursDay: z.number(),
      minHoursWeek: z.number(),
      rescheduleDateRange: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
    }),
    editWindow: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    lastEditor: z.string(),
    startTime: z.string(),
    weeklyWindows: z.array(z.object({
      dayOfWeek: z.string(),
      duration: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  startVersion: z.string().optional(),
  state: z.string().optional(),
  targetVersion: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  componentUpgrades: z.array(z.object({
    componentType: z.enum([
      "VMWARE_COMPONENT_TYPE_UNSPECIFIED",
      "VCENTER",
      "ESXI",
      "NSXT_UC",
      "NSXT_EDGE",
      "NSXT_MGR",
      "HCX",
      "VSAN",
      "DVS",
      "NAMESERVER_VM",
      "KMS_VM",
      "WITNESS_VM",
      "NSXT",
      "CLUSTER",
      "VM_TOOLS",
    ]).describe("Output only. Type of component").optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "RUNNING",
      "PAUSED",
      "SUCCEEDED",
      "FAILED",
      "NOT_STARTED",
      "NOT_APPLICABLE",
    ]).describe("Output only. Component's upgrade state.").optional(),
  })).describe("Output only. Output Only. The list of component upgrades.")
    .optional(),
  createTime: z.string().describe(
    "Output only. Output Only. Creation time of this resource.",
  ).optional(),
  description: z.string().describe(
    "Output only. Output Only. The description of the upgrade. This is used to provide additional information about the private cloud upgrade, such as the upgrade's purpose, the changes included in the upgrade, or any other relevant information about the upgrade.",
  ).optional(),
  endTime: z.string().describe(
    "Output only. Output Only. End time of the upgrade.",
  ).optional(),
  estimatedDuration: z.string().describe(
    "Output only. Output Only. The estimated total duration of the upgrade. This information can be used to plan or schedule upgrades to minimize disruptions. Please note that the estimated duration is only an estimate. The actual upgrade duration may vary.",
  ).optional(),
  etag: z.string().describe(
    "The etag for the upgrade resource. If this is provided on update, it must match the server's etag.",
  ).optional(),
  name: z.string().describe(
    "Output only. Identifier. The resource name of the private cloud `Upgrade`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/privateClouds/my-cloud/upgrades/my-upgrade`",
  ).optional(),
  schedule: z.object({
    constraints: z.object({
      disallowedIntervals: z.array(z.object({
        endDay: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe(
          "Output only. The day on which the interval ends. Can be same as start day.",
        ).optional(),
        endTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
        ).optional(),
        startDay: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Output only. The day on which the interval starts.")
          .optional(),
        startTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
        ).optional(),
      })).describe(
        "Output only. Output Only. A list of intervals in which maintenance windows are not allowed. Any time window that overlaps with any of these intervals will be considered invalid.",
      ).optional(),
      minHoursDay: z.number().int().describe(
        "Output only. Minimum number of hours must be allotted for the upgrade activities for each selected day. This is a minimum; the upgrade schedule can allot more hours for the given day.",
      ).optional(),
      minHoursWeek: z.number().int().describe(
        "Output only. The minimum number of weekly hours must be allotted for the upgrade activities. This is just a minimum; the schedule can assign more weekly hours.",
      ).optional(),
      rescheduleDateRange: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
      ).optional(),
    }).describe(
      "Constraints to be applied while editing a schedule. These constraints ensure that `Upgrade` specific requirements are met.",
    ).optional(),
    editWindow: z.object({
      endTime: z.string().describe(
        "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
      ).optional(),
      startTime: z.string().describe(
        "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
      ).optional(),
    }).describe(
      "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
    ).optional(),
    lastEditor: z.enum(["EDITOR_UNSPECIFIED", "SYSTEM", "USER"]).describe(
      "Output only. Output Only. Indicates who most recently edited the upgrade schedule. The value is updated whenever the upgrade is rescheduled.",
    ).optional(),
    startTime: z.string().describe(
      "Required. The scheduled start time for the upgrade.",
    ).optional(),
    weeklyWindows: z.array(z.object({
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Required. Day of the week for this window.").optional(),
      duration: z.string().describe(
        "Required. The duration of the window. The max allowed duration for any window is 24 hours.",
      ).optional(),
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
      "Required. Weekly time windows for upgrade activities. The server performs upgrade activities during these time windows to minimize disruptions.",
    ).optional(),
  }).describe("Schedule for the upgrade.").optional(),
  startVersion: z.string().describe(
    "Output only. Output Only. The start version",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "SCHEDULED",
    "ONGOING",
    "SUCCEEDED",
    "PAUSED",
    "FAILED",
    "CANCELLING",
    "CANCELLED",
    "RESCHEDULING",
  ]).describe("Output only. The current state of the upgrade.").optional(),
  targetVersion: z.string().describe(
    "Output only. Output Only. The target version",
  ).optional(),
  type: z.enum([
    "TYPE_UNSPECIFIED",
    "VSPHERE_UPGRADE",
    "VSPHERE_PATCH",
    "WORKAROUND",
    "FIRMWARE_UPGRADE",
    "SWITCH_UPGRADE",
    "OTHER",
    "INFRASTRUCTURE_UPGRADE",
  ]).describe("Output only. Output Only. The type of upgrade.").optional(),
  uid: z.string().describe(
    "Output only. System-generated unique identifier for the resource.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Output Only. Last update time of this resource.",
  ).optional(),
  version: z.string().describe("Output only.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VMware Engine PrivateClouds.Upgrades. Registered at `@swamp/gcp/vmwareengine/privateclouds-upgrades`. */
export const model = {
  type: "@swamp/gcp/vmwareengine/privateclouds-upgrades",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Describes Private cloud Upgrade.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a upgrades",
      arguments: z.object({
        identifier: z.string().describe("The name of the upgrades"),
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
      description: "Update upgrades attributes",
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
        if (g["componentUpgrades"] !== undefined) {
          body["componentUpgrades"] = g["componentUpgrades"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["estimatedDuration"] !== undefined) {
          body["estimatedDuration"] = g["estimatedDuration"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["startVersion"] !== undefined) {
          body["startVersion"] = g["startVersion"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["targetVersion"] !== undefined) {
          body["targetVersion"] = g["targetVersion"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["uid"] !== undefined) body["uid"] = g["uid"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["version"] !== undefined) body["version"] = g["version"];
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
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
    sync: {
      description: "Sync upgrades state from GCP",
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
  },
};
