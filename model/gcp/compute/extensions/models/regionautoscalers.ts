// Auto-generated extension model for @swamp/gcp/compute/regionautoscalers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionAutoscalers.
 *
 * Represents an Autoscaler resource. Google Compute Engine has two Autoscaler resources: * [Zonal](/compute/docs/reference/rest/v1/autoscalers) * [Regional](/compute/docs/reference/rest/v1/regionAutoscalers) Use autoscalers to automatically add or delete instances from a managed instance group according to your defined autoscaling policy. For more information, read Autoscaling Groups of Instances. For zonal managed instance groups resource, use the autoscaler resource. For regional managed instance groups, use theregionAutoscalers resource.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionAutoscalers.get",
  "path": "projects/{project}/regions/{region}/autoscalers/{autoscaler}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "autoscaler",
  ],
  "parameters": {
    "autoscaler": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.regionAutoscalers.insert",
  "path": "projects/{project}/regions/{region}/autoscalers",
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

const UPDATE_CONFIG = {
  "id": "compute.regionAutoscalers.update",
  "path": "projects/{project}/regions/{region}/autoscalers",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "autoscaler": {
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.regionAutoscalers.delete",
  "path": "projects/{project}/regions/{region}/autoscalers/{autoscaler}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "autoscaler",
  ],
  "parameters": {
    "autoscaler": {
      "location": "path",
      "required": true,
    },
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

const GlobalArgsSchema = z.object({
  autoscalingPolicy: z.object({
    coolDownPeriodSec: z.number().int().describe(
      "The number of seconds that your application takes to initialize on a VM instance. This is referred to as the [initialization period](/compute/docs/autoscaler#cool_down_period). Specifying an accurate initialization period improves autoscaler decisions. For example, when scaling out, the autoscaler ignores data from VMs that are still initializing because those VMs might not yet represent normal usage of your application. The default initialization period is 60 seconds. Initialization periods might vary because of numerous factors. We recommend that you test how long your application takes to initialize. To do this, create a VM and time your application's startup process.",
    ).optional(),
    cpuUtilization: z.object({
      predictiveMethod: z.enum(["NONE", "OPTIMIZE_AVAILABILITY"]).describe(
        "Indicates whether predictive autoscaling based on CPU metric is enabled. Valid values are: * NONE (default). No predictive method is used. The autoscaler scales the group to meet current demand based on real-time metrics. * OPTIMIZE_AVAILABILITY. Predictive autoscaling improves availability by monitoring daily and weekly load patterns and scaling out ahead of anticipated demand.",
      ).optional(),
      utilizationTarget: z.number().describe(
        "The target CPU utilization that the autoscaler maintains. Must be a float value in the range (0, 1]. If not specified, the default is0.6. If the CPU level is below the target utilization, the autoscaler scales in the number of instances until it reaches the minimum number of instances you specified or until the average CPU of your instances reaches the target utilization. If the average CPU is above the target utilization, the autoscaler scales out until it reaches the maximum number of instances you specified or until the average utilization reaches the target utilization.",
      ).optional(),
    }).describe("CPU utilization policy.").optional(),
    customMetricUtilizations: z.array(z.object({
      filter: z.string().describe(
        "A filter string, compatible with a Stackdriver Monitoringfilter string forTimeSeries.list API call. This filter is used to select a specific TimeSeries for the purpose of autoscaling and to determine whether the metric is exporting per-instance or per-group data. For the filter to be valid for autoscaling purposes, the following rules apply: - You can only use the AND operator for joining selectors. - You can only use direct equality comparison operator (=) without any functions for each selector. - You can specify the metric in both the filter string and in the metric field. However, if specified in both places, the metric must be identical. - The monitored resource type determines what kind of values are expected for the metric. If it is a gce_instance, the autoscaler expects the metric to include a separate TimeSeries for each instance in a group. In such a case, you cannot filter on resource labels. If the resource type is any other value, the autoscaler expects this metric to contain values that apply to the entire autoscaled instance group and resource label filtering can be performed to point autoscaler at the correct TimeSeries to scale upon. This is called a *per-group metric* for the purpose of autoscaling. If not specified, the type defaults to gce_instance. Try to provide a filter that is selective enough to pick just one TimeSeries for the autoscaled group or for each of the instances (if you are using gce_instance resource type). If multiple TimeSeries are returned upon the query execution, the autoscaler will sum their respective values to obtain its scaling value.",
      ).optional(),
      metric: z.string().describe(
        "The identifier (type) of the Stackdriver Monitoring metric. The metric cannot have negative values. The metric must have a value type of INT64 orDOUBLE.",
      ).optional(),
      singleInstanceAssignment: z.number().describe(
        "If scaling is based on a per-group metric value that represents the total amount of work to be done or resource usage, set this value to an amount assigned for a single instance of the scaled group. Autoscaler keeps the number of instances proportional to the value of this metric. The metric itself does not change value due to group resizing. A good metric to use with the target is for examplepubsub.googleapis.com/subscription/num_undelivered_messages or a custom metric exporting the total number of requests coming to your instances. A bad example would be a metric exporting an average or median latency, since this value can't include a chunk assignable to a single instance, it could be better used with utilization_target instead.",
      ).optional(),
      utilizationTarget: z.number().describe(
        "The target value of the metric that autoscaler maintains. This must be a positive value. A utilization metric scales number of virtual machines handling requests to increase or decrease proportionally to the metric. For example, a good metric to use as a utilization_target ishttps://www.googleapis.com/compute/v1/instance/network/received_bytes_count. The autoscaler works to keep this value constant for each of the instances.",
      ).optional(),
      utilizationTargetType: z.enum([
        "DELTA_PER_MINUTE",
        "DELTA_PER_SECOND",
        "GAUGE",
      ]).describe(
        "Defines how target utilization value is expressed for a Stackdriver Monitoring metric. Either GAUGE,DELTA_PER_SECOND, or DELTA_PER_MINUTE.",
      ).optional(),
    })).describe(
      "Configuration parameters of autoscaling based on a custom metric.",
    ).optional(),
    loadBalancingUtilization: z.object({
      utilizationTarget: z.number().describe(
        "Fraction of backend capacity utilization (set in HTTP(S) load balancing configuration) that the autoscaler maintains. Must be a positive float value. If not defined, the default is 0.8.",
      ).optional(),
    }).describe(
      "Configuration parameters of autoscaling based on load balancing.",
    ).optional(),
    maxNumReplicas: z.number().int().describe(
      "The maximum number of instances that the autoscaler can scale out to. This is required when creating or updating an autoscaler. The maximum number of replicas must not be lower than minimal number of replicas.",
    ).optional(),
    minNumReplicas: z.number().int().describe(
      "The minimum number of replicas that the autoscaler can scale in to. This cannot be less than 0. If not provided, autoscaler chooses a default value depending on maximum number of instances allowed.",
    ).optional(),
    mode: z.enum(["OFF", "ON", "ONLY_SCALE_OUT", "ONLY_UP"]).describe(
      'Defines the operating mode for this policy. The following modes are available: - OFF: Disables the autoscaler but maintains its configuration. - ONLY_SCALE_OUT: Restricts the autoscaler to add VM instances only. - ON: Enables all autoscaler activities according to its policy. For more information, see "Turning off or restricting an autoscaler"',
    ).optional(),
    scaleInControl: z.object({
      maxScaledInReplicas: z.object({
        calculated: z.number().int().describe(
          "Output only. Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
        ).optional(),
        fixed: z.number().int().describe(
          "Specifies a fixed number of VM instances. This must be a positive integer.",
        ).optional(),
        percent: z.number().int().describe(
          "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
        ).optional(),
      }).describe(
        "Encapsulates numeric value that can be either absolute or relative.",
      ).optional(),
      timeWindowSec: z.number().int().describe(
        "How far back autoscaling looks when computing recommendations to include directives regarding slower scale in, as described above.",
      ).optional(),
    }).describe(
      "Configuration that allows for slower scale in so that even if Autoscaler recommends an abrupt scale in of a MIG, it will be throttled as specified by the parameters below.",
    ).optional(),
    scalingSchedules: z.record(
      z.string(),
      z.object({
        description: z.string().describe("A description of a scaling schedule.")
          .optional(),
        disabled: z.boolean().describe(
          "A boolean value that specifies whether a scaling schedule can influence autoscaler recommendations. If set to true, then a scaling schedule has no effect. This field is optional, and its value is false by default.",
        ).optional(),
        durationSec: z.number().int().describe(
          "The duration of time intervals, in seconds, for which this scaling schedule is to run. The minimum allowed value is 300. This field is required.",
        ).optional(),
        minRequiredReplicas: z.number().int().describe(
          "The minimum number of VM instances that the autoscaler will recommend in time intervals starting according to schedule. This field is required.",
        ).optional(),
        schedule: z.string().describe(
          "The start timestamps of time intervals when this scaling schedule is to provide a scaling signal. This field uses the extended cron format (with an optional year field). The expression can describe a single timestamp if the optional year is set, in which case the scaling schedule runs once. The schedule is interpreted with respect to time_zone. This field is required. Note: These timestamps only describe when autoscaler starts providing the scaling signal. The VMs need additional time to become serving.",
        ).optional(),
        timeZone: z.string().describe(
          'The time zone to use when interpreting the schedule. The value of this field must be a time zone name from the tz database: https://en.wikipedia.org/wiki/Tz_database. This field is assigned a default value of "UTC" if left empty.',
        ).optional(),
      }),
    ).describe(
      "Scaling schedules defined for an autoscaler. Multiple schedules can be set on an autoscaler, and they can overlap. During overlapping periods the greatest min_required_replicas of all scaling schedules is applied. Up to 128 scaling schedules are allowed.",
    ).optional(),
    stabilizationPeriodSec: z.number().int().describe(
      "The number of seconds that autoscaler waits for load stabilization before making scale-in decisions. This is referred to as the [stabilization period](/compute/docs/autoscaler#stabilization_period). This might appear as a delay in scaling in but it is an important mechanism for your application to not have fluctuating size due to short term load fluctuations. The default stabilization period is 600 seconds.",
    ).optional(),
  }).describe("Cloud Autoscaler policy.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of theregion where the instance group resides (for autoscalers living in regional scope).",
  ).optional(),
  target: z.string().describe(
    "URL of the managed instance group that this autoscaler will scale. This field is required when creating an autoscaler.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  autoscalingPolicy: z.object({
    coolDownPeriodSec: z.number(),
    cpuUtilization: z.object({
      predictiveMethod: z.string(),
      utilizationTarget: z.number(),
    }),
    customMetricUtilizations: z.array(z.object({
      filter: z.string(),
      metric: z.string(),
      singleInstanceAssignment: z.number(),
      utilizationTarget: z.number(),
      utilizationTargetType: z.string(),
    })),
    loadBalancingUtilization: z.object({
      utilizationTarget: z.number(),
    }),
    maxNumReplicas: z.number(),
    minNumReplicas: z.number(),
    mode: z.string(),
    scaleInControl: z.object({
      maxScaledInReplicas: z.object({
        calculated: z.number(),
        fixed: z.number(),
        percent: z.number(),
      }),
      timeWindowSec: z.number(),
    }),
    scalingSchedules: z.record(z.string(), z.unknown()),
    stabilizationPeriodSec: z.number(),
  }).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  recommendedSize: z.number().optional(),
  region: z.string().optional(),
  scalingScheduleStatus: z.record(z.string(), z.unknown()).optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  statusDetails: z.array(z.object({
    message: z.string(),
    type: z.string(),
  })).optional(),
  target: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  autoscalingPolicy: z.object({
    coolDownPeriodSec: z.number().int().describe(
      "The number of seconds that your application takes to initialize on a VM instance. This is referred to as the [initialization period](/compute/docs/autoscaler#cool_down_period). Specifying an accurate initialization period improves autoscaler decisions. For example, when scaling out, the autoscaler ignores data from VMs that are still initializing because those VMs might not yet represent normal usage of your application. The default initialization period is 60 seconds. Initialization periods might vary because of numerous factors. We recommend that you test how long your application takes to initialize. To do this, create a VM and time your application's startup process.",
    ).optional(),
    cpuUtilization: z.object({
      predictiveMethod: z.enum(["NONE", "OPTIMIZE_AVAILABILITY"]).describe(
        "Indicates whether predictive autoscaling based on CPU metric is enabled. Valid values are: * NONE (default). No predictive method is used. The autoscaler scales the group to meet current demand based on real-time metrics. * OPTIMIZE_AVAILABILITY. Predictive autoscaling improves availability by monitoring daily and weekly load patterns and scaling out ahead of anticipated demand.",
      ).optional(),
      utilizationTarget: z.number().describe(
        "The target CPU utilization that the autoscaler maintains. Must be a float value in the range (0, 1]. If not specified, the default is0.6. If the CPU level is below the target utilization, the autoscaler scales in the number of instances until it reaches the minimum number of instances you specified or until the average CPU of your instances reaches the target utilization. If the average CPU is above the target utilization, the autoscaler scales out until it reaches the maximum number of instances you specified or until the average utilization reaches the target utilization.",
      ).optional(),
    }).describe("CPU utilization policy.").optional(),
    customMetricUtilizations: z.array(z.object({
      filter: z.string().describe(
        "A filter string, compatible with a Stackdriver Monitoringfilter string forTimeSeries.list API call. This filter is used to select a specific TimeSeries for the purpose of autoscaling and to determine whether the metric is exporting per-instance or per-group data. For the filter to be valid for autoscaling purposes, the following rules apply: - You can only use the AND operator for joining selectors. - You can only use direct equality comparison operator (=) without any functions for each selector. - You can specify the metric in both the filter string and in the metric field. However, if specified in both places, the metric must be identical. - The monitored resource type determines what kind of values are expected for the metric. If it is a gce_instance, the autoscaler expects the metric to include a separate TimeSeries for each instance in a group. In such a case, you cannot filter on resource labels. If the resource type is any other value, the autoscaler expects this metric to contain values that apply to the entire autoscaled instance group and resource label filtering can be performed to point autoscaler at the correct TimeSeries to scale upon. This is called a *per-group metric* for the purpose of autoscaling. If not specified, the type defaults to gce_instance. Try to provide a filter that is selective enough to pick just one TimeSeries for the autoscaled group or for each of the instances (if you are using gce_instance resource type). If multiple TimeSeries are returned upon the query execution, the autoscaler will sum their respective values to obtain its scaling value.",
      ).optional(),
      metric: z.string().describe(
        "The identifier (type) of the Stackdriver Monitoring metric. The metric cannot have negative values. The metric must have a value type of INT64 orDOUBLE.",
      ).optional(),
      singleInstanceAssignment: z.number().describe(
        "If scaling is based on a per-group metric value that represents the total amount of work to be done or resource usage, set this value to an amount assigned for a single instance of the scaled group. Autoscaler keeps the number of instances proportional to the value of this metric. The metric itself does not change value due to group resizing. A good metric to use with the target is for examplepubsub.googleapis.com/subscription/num_undelivered_messages or a custom metric exporting the total number of requests coming to your instances. A bad example would be a metric exporting an average or median latency, since this value can't include a chunk assignable to a single instance, it could be better used with utilization_target instead.",
      ).optional(),
      utilizationTarget: z.number().describe(
        "The target value of the metric that autoscaler maintains. This must be a positive value. A utilization metric scales number of virtual machines handling requests to increase or decrease proportionally to the metric. For example, a good metric to use as a utilization_target ishttps://www.googleapis.com/compute/v1/instance/network/received_bytes_count. The autoscaler works to keep this value constant for each of the instances.",
      ).optional(),
      utilizationTargetType: z.enum([
        "DELTA_PER_MINUTE",
        "DELTA_PER_SECOND",
        "GAUGE",
      ]).describe(
        "Defines how target utilization value is expressed for a Stackdriver Monitoring metric. Either GAUGE,DELTA_PER_SECOND, or DELTA_PER_MINUTE.",
      ).optional(),
    })).describe(
      "Configuration parameters of autoscaling based on a custom metric.",
    ).optional(),
    loadBalancingUtilization: z.object({
      utilizationTarget: z.number().describe(
        "Fraction of backend capacity utilization (set in HTTP(S) load balancing configuration) that the autoscaler maintains. Must be a positive float value. If not defined, the default is 0.8.",
      ).optional(),
    }).describe(
      "Configuration parameters of autoscaling based on load balancing.",
    ).optional(),
    maxNumReplicas: z.number().int().describe(
      "The maximum number of instances that the autoscaler can scale out to. This is required when creating or updating an autoscaler. The maximum number of replicas must not be lower than minimal number of replicas.",
    ).optional(),
    minNumReplicas: z.number().int().describe(
      "The minimum number of replicas that the autoscaler can scale in to. This cannot be less than 0. If not provided, autoscaler chooses a default value depending on maximum number of instances allowed.",
    ).optional(),
    mode: z.enum(["OFF", "ON", "ONLY_SCALE_OUT", "ONLY_UP"]).describe(
      'Defines the operating mode for this policy. The following modes are available: - OFF: Disables the autoscaler but maintains its configuration. - ONLY_SCALE_OUT: Restricts the autoscaler to add VM instances only. - ON: Enables all autoscaler activities according to its policy. For more information, see "Turning off or restricting an autoscaler"',
    ).optional(),
    scaleInControl: z.object({
      maxScaledInReplicas: z.object({
        calculated: z.number().int().describe(
          "Output only. Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
        ).optional(),
        fixed: z.number().int().describe(
          "Specifies a fixed number of VM instances. This must be a positive integer.",
        ).optional(),
        percent: z.number().int().describe(
          "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
        ).optional(),
      }).describe(
        "Encapsulates numeric value that can be either absolute or relative.",
      ).optional(),
      timeWindowSec: z.number().int().describe(
        "How far back autoscaling looks when computing recommendations to include directives regarding slower scale in, as described above.",
      ).optional(),
    }).describe(
      "Configuration that allows for slower scale in so that even if Autoscaler recommends an abrupt scale in of a MIG, it will be throttled as specified by the parameters below.",
    ).optional(),
    scalingSchedules: z.record(
      z.string(),
      z.object({
        description: z.string().describe("A description of a scaling schedule.")
          .optional(),
        disabled: z.boolean().describe(
          "A boolean value that specifies whether a scaling schedule can influence autoscaler recommendations. If set to true, then a scaling schedule has no effect. This field is optional, and its value is false by default.",
        ).optional(),
        durationSec: z.number().int().describe(
          "The duration of time intervals, in seconds, for which this scaling schedule is to run. The minimum allowed value is 300. This field is required.",
        ).optional(),
        minRequiredReplicas: z.number().int().describe(
          "The minimum number of VM instances that the autoscaler will recommend in time intervals starting according to schedule. This field is required.",
        ).optional(),
        schedule: z.string().describe(
          "The start timestamps of time intervals when this scaling schedule is to provide a scaling signal. This field uses the extended cron format (with an optional year field). The expression can describe a single timestamp if the optional year is set, in which case the scaling schedule runs once. The schedule is interpreted with respect to time_zone. This field is required. Note: These timestamps only describe when autoscaler starts providing the scaling signal. The VMs need additional time to become serving.",
        ).optional(),
        timeZone: z.string().describe(
          'The time zone to use when interpreting the schedule. The value of this field must be a time zone name from the tz database: https://en.wikipedia.org/wiki/Tz_database. This field is assigned a default value of "UTC" if left empty.',
        ).optional(),
      }),
    ).describe(
      "Scaling schedules defined for an autoscaler. Multiple schedules can be set on an autoscaler, and they can overlap. During overlapping periods the greatest min_required_replicas of all scaling schedules is applied. Up to 128 scaling schedules are allowed.",
    ).optional(),
    stabilizationPeriodSec: z.number().int().describe(
      "The number of seconds that autoscaler waits for load stabilization before making scale-in decisions. This is referred to as the [stabilization period](/compute/docs/autoscaler#stabilization_period). This might appear as a delay in scaling in but it is an important mechanism for your application to not have fluctuating size due to short term load fluctuations. The default stabilization period is 600 seconds.",
    ).optional(),
  }).describe("Cloud Autoscaler policy.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of theregion where the instance group resides (for autoscalers living in regional scope).",
  ).optional(),
  target: z.string().describe(
    "URL of the managed instance group that this autoscaler will scale. This field is required when creating an autoscaler.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionAutoscalers. Registered at `@swamp/gcp/compute/regionautoscalers`. */
export const model = {
  type: "@swamp/gcp/compute/regionautoscalers",
  version: "2026.05.20.1",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an Autoscaler resource. Google Compute Engine has two Autoscaler r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionAutoscalers",
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
        if (g["autoscalingPolicy"] !== undefined) {
          body["autoscalingPolicy"] = g["autoscalingPolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["autoscaler"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR"],
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
      description: "Get a regionAutoscalers",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionAutoscalers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["autoscaler"] = args.identifier;
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
      description: "Update regionAutoscalers attributes",
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
        params["region"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["autoscalingPolicy"] !== undefined) {
          body["autoscalingPolicy"] = g["autoscalingPolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["target"] !== undefined) body["target"] = g["target"];
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
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
      description: "Delete the regionAutoscalers",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionAutoscalers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["autoscaler"] = args.identifier;
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
      description: "Sync regionAutoscalers state from GCP",
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
          params["autoscaler"] = identifier;
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
