// Auto-generated extension model for @swamp/gcp/monitoring/snoozes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring Snoozes.
 *
 * A Snooze will prevent any alerts from being opened, and close any that are already open. The Snooze will work on alerts that match the criteria defined in the Snooze. The Snooze will be active from interval.start_time through interval.end_time.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/snoozes/${shortName}`;
}

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.projects.snoozes.get",
  "path": "v3/{+name}",
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
  "id": "monitoring.projects.snoozes.create",
  "path": "v3/{+parent}/snoozes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "monitoring.projects.snoozes.patch",
  "path": "v3/{+name}",
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

const LIST_CONFIG = {
  "id": "monitoring.projects.snoozes.list",
  "path": "v3/{+parent}/snoozes",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  criteria: z.object({
    filter: z.string().describe(
      'Optional. When you define a snooze, you can also define a filter for that snooze. The filter is a string containing one or more key-value pairs. The string uses the standard https://google.aip.dev/160 filter syntax. If you define a filter for a snooze, then the snooze can only apply to one alert policy. When the snooze is active, incidents won\'t be created when the incident would have key-value pairs (labels) that match those specified by the filter in the snooze.Snooze filters support resource, metric, and metadata labels. If multiple labels are used, then they must be connected with an AND operator. For example, the following filter applies the snooze to incidents that have a resource label with an instance ID of 1234567890, a metric label with an instance name of test_group, a metadata user label with a key of foo and a value of bar, and a metadata system label with a key of region and a value of us-central1: "filter": "resource.labels.instance_id=\\"1234567890\\" AND metric.labels.instance_name=\\"test_group\\" AND metadata.user_labels.foo=\\"bar\\" AND metadata.system_labels.region=\\"us-central1\\""',
    ).optional(),
    policies: z.array(z.string()).describe(
      "The specific AlertPolicy names for the alert that should be snoozed. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID] There is a limit of 16 policies per snooze. This limit is checked during snooze creation. Exactly 1 alert policy is required if filter is specified at the same time.",
    ).optional(),
  }).describe(
    "Criteria specific to the AlertPolicys that this Snooze applies to. The Snooze will suppress alerts that come from one of the AlertPolicys whose names are supplied.",
  ).optional(),
  displayName: z.string().describe(
    "Required. A display name for the Snooze. This can be, at most, 512 unicode characters.",
  ).optional(),
  interval: z.object({
    endTime: z.string().describe("Required. The end of the time interval.")
      .optional(),
    startTime: z.string().describe(
      "Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time.",
    ).optional(),
  }).describe(
    "Describes a time interval: Reads: A half-open time interval. It includes the end time but excludes the start time: (startTime, endTime]. The start time must be specified, must be earlier than the end time, and should be no older than the data retention period for the metric. Writes: A closed time interval. It extends from the start time to the end time, and includes both: [startTime, endTime]. Valid time intervals depend on the MetricKind (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors#MetricKind) of the metric value. The end time must not be earlier than the start time, and the end time must not be more than 25 hours in the past or more than five minutes in the future. For GAUGE metrics, the startTime value is technically optional; if no value is specified, the start time defaults to the value of the end time, and the interval represents a single point in time. If both start and end times are specified, they must be identical. Such an interval is valid only for GAUGE metrics, which are point-in-time measurements. The end time of a new interval must be at least a millisecond after the end time of the previous interval. For DELTA metrics, the start time and end time must specify a non-zero interval, with subsequent points specifying contiguous and non-overlapping intervals. For DELTA metrics, the start time of the next interval must be at least a millisecond after the end time of the previous interval. For CUMULATIVE metrics, the start time and end time must specify a non-zero interval, with subsequent points specifying the same start time and increasing end times, until an event resets the cumulative value to zero and sets a new start time for the following points. The new start time must be at least a millisecond after the end time of the previous interval. The start time of a new interval must be at least a millisecond after the end time of the previous interval because intervals are closed. If the start time of a new interval is the same as the end time of the previous interval, then data written at the new start time could overwrite data written at the previous end time.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the Snooze. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] The ID of the Snooze will be generated by the system.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  criteria: z.object({
    filter: z.string(),
    policies: z.array(z.string()),
  }).optional(),
  displayName: z.string().optional(),
  interval: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  criteria: z.object({
    filter: z.string().describe(
      'Optional. When you define a snooze, you can also define a filter for that snooze. The filter is a string containing one or more key-value pairs. The string uses the standard https://google.aip.dev/160 filter syntax. If you define a filter for a snooze, then the snooze can only apply to one alert policy. When the snooze is active, incidents won\'t be created when the incident would have key-value pairs (labels) that match those specified by the filter in the snooze.Snooze filters support resource, metric, and metadata labels. If multiple labels are used, then they must be connected with an AND operator. For example, the following filter applies the snooze to incidents that have a resource label with an instance ID of 1234567890, a metric label with an instance name of test_group, a metadata user label with a key of foo and a value of bar, and a metadata system label with a key of region and a value of us-central1: "filter": "resource.labels.instance_id=\\"1234567890\\" AND metric.labels.instance_name=\\"test_group\\" AND metadata.user_labels.foo=\\"bar\\" AND metadata.system_labels.region=\\"us-central1\\""',
    ).optional(),
    policies: z.array(z.string()).describe(
      "The specific AlertPolicy names for the alert that should be snoozed. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID] There is a limit of 16 policies per snooze. This limit is checked during snooze creation. Exactly 1 alert policy is required if filter is specified at the same time.",
    ).optional(),
  }).describe(
    "Criteria specific to the AlertPolicys that this Snooze applies to. The Snooze will suppress alerts that come from one of the AlertPolicys whose names are supplied.",
  ).optional(),
  displayName: z.string().describe(
    "Required. A display name for the Snooze. This can be, at most, 512 unicode characters.",
  ).optional(),
  interval: z.object({
    endTime: z.string().describe("Required. The end of the time interval.")
      .optional(),
    startTime: z.string().describe(
      "Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time.",
    ).optional(),
  }).describe(
    "Describes a time interval: Reads: A half-open time interval. It includes the end time but excludes the start time: (startTime, endTime]. The start time must be specified, must be earlier than the end time, and should be no older than the data retention period for the metric. Writes: A closed time interval. It extends from the start time to the end time, and includes both: [startTime, endTime]. Valid time intervals depend on the MetricKind (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors#MetricKind) of the metric value. The end time must not be earlier than the start time, and the end time must not be more than 25 hours in the past or more than five minutes in the future. For GAUGE metrics, the startTime value is technically optional; if no value is specified, the start time defaults to the value of the end time, and the interval represents a single point in time. If both start and end times are specified, they must be identical. Such an interval is valid only for GAUGE metrics, which are point-in-time measurements. The end time of a new interval must be at least a millisecond after the end time of the previous interval. For DELTA metrics, the start time and end time must specify a non-zero interval, with subsequent points specifying contiguous and non-overlapping intervals. For DELTA metrics, the start time of the next interval must be at least a millisecond after the end time of the previous interval. For CUMULATIVE metrics, the start time and end time must specify a non-zero interval, with subsequent points specifying the same start time and increasing end times, until an event resets the cumulative value to zero and sets a new start time for the following points. The new start time must be at least a millisecond after the end time of the previous interval. The start time of a new interval must be at least a millisecond after the end time of the previous interval because intervals are closed. If the start time of a new interval is the same as the end time of the previous interval, then data written at the new start time could overwrite data written at the previous end time.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the Snooze. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] The ID of the Snooze will be generated by the system.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Monitoring Snoozes. Registered at `@swamp/gcp/monitoring/snoozes`. */
export const model = {
  type: "@swamp/gcp/monitoring/snoozes",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Snooze will prevent any alerts from being opened, and close any that are al...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a snoozes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["interval"] !== undefined) body["interval"] = g["interval"];
        if (g["name"] !== undefined) body["name"] = g["name"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a snoozes",
      arguments: z.object({
        identifier: z.string().describe("The name of the snoozes"),
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
      description: "Update snoozes attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["interval"] !== undefined) body["interval"] = g["interval"];
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
    sync: {
      description: "Sync snoozes state from GCP",
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
