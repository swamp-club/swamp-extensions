// Auto-generated extension model for @swamp/gcp/monitoring/metricdescriptors
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring MetricDescriptors.
 *
 * Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type's existing data unusable.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.projects.metricDescriptors.get",
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
  "id": "monitoring.projects.metricDescriptors.create",
  "path": "v3/{+name}/metricDescriptors",
  "httpMethod": "POST",
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

const DELETE_CONFIG = {
  "id": "monitoring.projects.metricDescriptors.delete",
  "path": "v3/{+name}",
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
  "id": "monitoring.projects.metricDescriptors.list",
  "path": "v3/{+name}/metricDescriptors",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "activeOnly": {
      "location": "query",
    },
    "filter": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "A detailed description of the metric, which can be used in documentation.",
  ).optional(),
  displayName: z.string().describe(
    'A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota.',
  ).optional(),
  labels: z.array(z.object({
    description: z.string().describe(
      "A human-readable description for the label.",
    ).optional(),
    key: z.string().describe(
      "The key for this label. The key must meet the following criteria: Does not exceed 100 characters. Matches the following regular expression: [a-zA-Z][a-zA-Z0-9_]* The first character must be an upper- or lower-case letter. The remaining characters must be letters, digits, or underscores.",
    ).optional(),
    valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
      "The type of data that can be assigned to the label.",
    ).optional(),
  })).describe(
    "The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed.",
  ).optional(),
  launchStage: z.enum([
    "LAUNCH_STAGE_UNSPECIFIED",
    "UNIMPLEMENTED",
    "PRELAUNCH",
    "EARLY_ACCESS",
    "ALPHA",
    "BETA",
    "GA",
    "DEPRECATED",
  ]).describe("Optional. The launch stage of the metric definition.")
    .optional(),
  metadata: z.object({
    ingestDelay: z.string().describe(
      "The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors.",
    ).optional(),
    launchStage: z.enum([
      "LAUNCH_STAGE_UNSPECIFIED",
      "UNIMPLEMENTED",
      "PRELAUNCH",
      "EARLY_ACCESS",
      "ALPHA",
      "BETA",
      "GA",
      "DEPRECATED",
    ]).describe(
      "Deprecated. Must use the MetricDescriptor.launch_stage instead.",
    ).optional(),
    samplePeriod: z.string().describe(
      "The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period.",
    ).optional(),
    timeSeriesResourceHierarchyLevel: z.array(
      z.enum([
        "TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED",
        "PROJECT",
        "ORGANIZATION",
        "FOLDER",
      ]),
    ).describe("The scope of the timeseries data of the metric.").optional(),
  }).describe(
    "Additional annotations that can be used to guide the usage of a metric.",
  ).optional(),
  metricKind: z.enum([
    "METRIC_KIND_UNSPECIFIED",
    "GAUGE",
    "DELTA",
    "CUMULATIVE",
  ]).describe(
    "Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported.",
  ).optional(),
  monitoredResourceTypes: z.array(z.string()).describe(
    "Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here.",
  ).optional(),
  name: z.string().describe("The resource name of the metric descriptor.")
    .optional(),
  type: z.string().describe(
    'The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies"',
  ).optional(),
  unit: z.string().describe(
    'The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems might scale the values to be more easily displayed (so a value of 0.02kBy might be displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy). However, if the unit is kBy, then the value of the metric is always in thousands of bytes, no matter how it might be displayed.If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples, kBy/{email} or MiBy/10ms (although you should almost never have /s in a metric unit; rates should always be computed at query time from the underlying cumulative or delta value).. multiplication or composition (as an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component }; Component = ( [ PREFIX ] UNIT | "%") [ Annotation ] | Annotation | "1"; Annotation = "{" NAME "}"; Notes: Annotation is just a comment if it follows a UNIT. If the annotation is used alone, then the unit is equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not containing { or }. 1 represents a unitary dimensionless unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in 1/s. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as 1/d or {new-users}/d (and a metric value 5 would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as 1000/d or k1/d or k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per day"). % represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value 0.03 means "3 percent").',
  ).optional(),
  valueType: z.enum([
    "VALUE_TYPE_UNSPECIFIED",
    "BOOL",
    "INT64",
    "DOUBLE",
    "STRING",
    "DISTRIBUTION",
    "MONEY",
  ]).describe(
    "Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported.",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  displayName: z.string().optional(),
  labels: z.array(z.object({
    description: z.string(),
    key: z.string(),
    valueType: z.string(),
  })).optional(),
  launchStage: z.string().optional(),
  metadata: z.object({
    ingestDelay: z.string(),
    launchStage: z.string(),
    samplePeriod: z.string(),
    timeSeriesResourceHierarchyLevel: z.array(z.string()),
  }).optional(),
  metricKind: z.string().optional(),
  monitoredResourceTypes: z.array(z.string()).optional(),
  name: z.string(),
  type: z.string().optional(),
  unit: z.string().optional(),
  valueType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "A detailed description of the metric, which can be used in documentation.",
  ).optional(),
  displayName: z.string().describe(
    'A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota.',
  ).optional(),
  labels: z.array(z.object({
    description: z.string().describe(
      "A human-readable description for the label.",
    ).optional(),
    key: z.string().describe(
      "The key for this label. The key must meet the following criteria: Does not exceed 100 characters. Matches the following regular expression: [a-zA-Z][a-zA-Z0-9_]* The first character must be an upper- or lower-case letter. The remaining characters must be letters, digits, or underscores.",
    ).optional(),
    valueType: z.enum(["STRING", "BOOL", "INT64"]).describe(
      "The type of data that can be assigned to the label.",
    ).optional(),
  })).describe(
    "The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed.",
  ).optional(),
  launchStage: z.enum([
    "LAUNCH_STAGE_UNSPECIFIED",
    "UNIMPLEMENTED",
    "PRELAUNCH",
    "EARLY_ACCESS",
    "ALPHA",
    "BETA",
    "GA",
    "DEPRECATED",
  ]).describe("Optional. The launch stage of the metric definition.")
    .optional(),
  metadata: z.object({
    ingestDelay: z.string().describe(
      "The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors.",
    ).optional(),
    launchStage: z.enum([
      "LAUNCH_STAGE_UNSPECIFIED",
      "UNIMPLEMENTED",
      "PRELAUNCH",
      "EARLY_ACCESS",
      "ALPHA",
      "BETA",
      "GA",
      "DEPRECATED",
    ]).describe(
      "Deprecated. Must use the MetricDescriptor.launch_stage instead.",
    ).optional(),
    samplePeriod: z.string().describe(
      "The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period.",
    ).optional(),
    timeSeriesResourceHierarchyLevel: z.array(
      z.enum([
        "TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED",
        "PROJECT",
        "ORGANIZATION",
        "FOLDER",
      ]),
    ).describe("The scope of the timeseries data of the metric.").optional(),
  }).describe(
    "Additional annotations that can be used to guide the usage of a metric.",
  ).optional(),
  metricKind: z.enum([
    "METRIC_KIND_UNSPECIFIED",
    "GAUGE",
    "DELTA",
    "CUMULATIVE",
  ]).describe(
    "Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported.",
  ).optional(),
  monitoredResourceTypes: z.array(z.string()).describe(
    "Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here.",
  ).optional(),
  name: z.string().describe("The resource name of the metric descriptor.")
    .optional(),
  type: z.string().describe(
    'The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies"',
  ).optional(),
  unit: z.string().describe(
    'The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems might scale the values to be more easily displayed (so a value of 0.02kBy might be displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy). However, if the unit is kBy, then the value of the metric is always in thousands of bytes, no matter how it might be displayed.If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples, kBy/{email} or MiBy/10ms (although you should almost never have /s in a metric unit; rates should always be computed at query time from the underlying cumulative or delta value).. multiplication or composition (as an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component }; Component = ( [ PREFIX ] UNIT | "%") [ Annotation ] | Annotation | "1"; Annotation = "{" NAME "}"; Notes: Annotation is just a comment if it follows a UNIT. If the annotation is used alone, then the unit is equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not containing { or }. 1 represents a unitary dimensionless unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in 1/s. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as 1/d or {new-users}/d (and a metric value 5 would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as 1000/d or k1/d or k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per day"). % represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value 0.03 means "3 percent").',
  ).optional(),
  valueType: z.enum([
    "VALUE_TYPE_UNSPECIFIED",
    "BOOL",
    "INT64",
    "DOUBLE",
    "STRING",
    "DISTRIBUTION",
    "MONEY",
  ]).describe(
    "Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Monitoring MetricDescriptors. Registered at `@swamp/gcp/monitoring/metricdescriptors`. */
export const model = {
  type: "@swamp/gcp/monitoring/metricdescriptors",
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
        "Defines a metric type and its schema. Once a metric descriptor is created, de...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a metricDescriptors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["launchStage"] !== undefined) {
          body["launchStage"] = g["launchStage"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["metricKind"] !== undefined) body["metricKind"] = g["metricKind"];
        if (g["monitoredResourceTypes"] !== undefined) {
          body["monitoredResourceTypes"] = g["monitoredResourceTypes"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["unit"] !== undefined) body["unit"] = g["unit"];
        if (g["valueType"] !== undefined) body["valueType"] = g["valueType"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "name": String(g["name"] ?? "") },
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
      description: "Get a metricDescriptors",
      arguments: z.object({
        identifier: z.string().describe("The name of the metricDescriptors"),
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
    delete: {
      description: "Delete the metricDescriptors",
      arguments: z.object({
        identifier: z.string().describe("The name of the metricDescriptors"),
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
      description: "Sync metricDescriptors state from GCP",
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
  },
};
