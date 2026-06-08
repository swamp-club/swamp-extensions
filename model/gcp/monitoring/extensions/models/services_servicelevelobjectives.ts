// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/monitoring/services-servicelevelobjectives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring Services.ServiceLevelObjectives.
 *
 * A Service-Level Objective (SLO) describes a level of desired good service. It consists of a service-level indicator (SLI), a performance goal, and a period over which the objective is to be evaluated against that goal. The SLO can use SLIs defined in a number of different manners. Typical SLOs might include "99% of requests in each rolling week have latency below 200 milliseconds" or "99.5% of requests in each calendar month return successfully."
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/serviceLevelObjectives/${shortName}`;
}

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.services.serviceLevelObjectives.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "monitoring.services.serviceLevelObjectives.create",
  "path": "v3/{+parent}/serviceLevelObjectives",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "serviceLevelObjectiveId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "monitoring.services.serviceLevelObjectives.patch",
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

const DELETE_CONFIG = {
  "id": "monitoring.services.serviceLevelObjectives.delete",
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
  "id": "monitoring.services.serviceLevelObjectives.list",
  "path": "v3/{+parent}/serviceLevelObjectives",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  calendarPeriod: z.enum([
    "CALENDAR_PERIOD_UNSPECIFIED",
    "DAY",
    "WEEK",
    "FORTNIGHT",
    "MONTH",
    "QUARTER",
    "HALF",
    "YEAR",
  ]).describe(
    'A calendar period, semantically "since the start of the current ". At this time, only DAY, WEEK, FORTNIGHT, and MONTH are supported.',
  ).optional(),
  displayName: z.string().describe(
    "Name used for UI elements listing this SLO.",
  ).optional(),
  goal: z.number().describe(
    "The fraction of service that must be good in order for this objective to be met. 0 < goal <= 0.9999.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for this ServiceLevelObjective. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME]",
  ).optional(),
  rollingPeriod: z.string().describe(
    'A rolling time period, semantically "in the past ". Must be an integer multiple of 1 day no larger than 30 days.',
  ).optional(),
  serviceLevelIndicator: z.object({
    basicSli: z.object({
      availability: z.object({}).describe(
        "Future parameters for the availability SLI.",
      ).optional(),
      latency: z.object({
        threshold: z.string().describe(
          "Good service is defined to be the count of requests made to this service that return in no more than threshold.",
        ).optional(),
      }).describe("Parameters for a latency threshold SLI.").optional(),
      location: z.array(z.string()).describe(
        "OPTIONAL: The set of locations to which this SLI is relevant. Telemetry from other locations will not be used to calculate performance for this SLI. If omitted, this SLI applies to all locations in which the Service has activity. For service types that don't support breaking down by location, setting this field will result in an error.",
      ).optional(),
      method: z.array(z.string()).describe(
        "OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from other methods will not be used to calculate performance for this SLI. If omitted, this SLI applies to all the Service's methods. For service types that don't support breaking down by method, setting this field will result in an error.",
      ).optional(),
      version: z.array(z.string()).describe(
        "OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry from other API versions will not be used to calculate performance for this SLI. If omitted, this SLI applies to all API versions. For service types that don't support breaking down by version, setting this field will result in an error.",
      ).optional(),
    }).describe(
      "An SLI measuring performance on a well-known service type. Performance will be computed on the basis of pre-defined metrics. The type of the service_resource determines the metrics to use and the service_resource.labels and metric_labels are used to construct a monitoring filter to filter that metric down to just the data relevant to this service.",
    ).optional(),
    requestBased: z.object({
      distributionCut: z.object({
        distributionFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries aggregating values. Must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
        range: z.object({
          max: z.number().describe("Range maximum.").optional(),
          min: z.number().describe("Range minimum.").optional(),
        }).describe("Range of numerical values within min and max.").optional(),
      }).describe(
        "A DistributionCut defines a TimeSeries and thresholds used for measuring good service and total service. The TimeSeries must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. The computed good_service will be the estimated count of values in the Distribution that fall within the specified min and max.",
      ).optional(),
      goodTotalRatio: z.object({
        badServiceFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying bad service, either demanded service that was not provided or demanded service that was of inadequate quality. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
        goodServiceFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying good service provided. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
        totalServiceFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying total demanded service. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
      }).describe(
        "A TimeSeriesRatio specifies two TimeSeries to use for computing the good_service / total_service ratio. The specified TimeSeries must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. The TimeSeriesRatio must specify exactly two of good, bad, and total, and the relationship good_service + bad_service = total_service will be assumed.",
      ).optional(),
    }).describe(
      "Service Level Indicators for which atomic units of service are counted directly.",
    ).optional(),
    windowsBased: z.object({
      goodBadMetricFilter: z.string().describe(
        "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries with ValueType = BOOL. The window is good if any true values appear in the window.",
      ).optional(),
      goodTotalRatioThreshold: z.object({
        basicSliPerformance: z.object({
          availability: z.object({}).describe(
            "Future parameters for the availability SLI.",
          ).optional(),
          latency: z.object({
            threshold: z.unknown().describe(
              "Good service is defined to be the count of requests made to this service that return in no more than threshold.",
            ).optional(),
          }).describe("Parameters for a latency threshold SLI.").optional(),
          location: z.array(z.unknown()).describe(
            "OPTIONAL: The set of locations to which this SLI is relevant. Telemetry from other locations will not be used to calculate performance for this SLI. If omitted, this SLI applies to all locations in which the Service has activity. For service types that don't support breaking down by location, setting this field will result in an error.",
          ).optional(),
          method: z.array(z.unknown()).describe(
            "OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from other methods will not be used to calculate performance for this SLI. If omitted, this SLI applies to all the Service's methods. For service types that don't support breaking down by method, setting this field will result in an error.",
          ).optional(),
          version: z.array(z.unknown()).describe(
            "OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry from other API versions will not be used to calculate performance for this SLI. If omitted, this SLI applies to all API versions. For service types that don't support breaking down by version, setting this field will result in an error.",
          ).optional(),
        }).describe(
          "An SLI measuring performance on a well-known service type. Performance will be computed on the basis of pre-defined metrics. The type of the service_resource determines the metrics to use and the service_resource.labels and metric_labels are used to construct a monitoring filter to filter that metric down to just the data relevant to this service.",
        ).optional(),
        performance: z.object({
          distributionCut: z.object({
            distributionFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries aggregating values. Must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
            range: z.unknown().describe(
              "Range of numerical values within min and max.",
            ).optional(),
          }).describe(
            "A DistributionCut defines a TimeSeries and thresholds used for measuring good service and total service. The TimeSeries must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. The computed good_service will be the estimated count of values in the Distribution that fall within the specified min and max.",
          ).optional(),
          goodTotalRatio: z.object({
            badServiceFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying bad service, either demanded service that was not provided or demanded service that was of inadequate quality. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
            goodServiceFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying good service provided. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
            totalServiceFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying total demanded service. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
          }).describe(
            "A TimeSeriesRatio specifies two TimeSeries to use for computing the good_service / total_service ratio. The specified TimeSeries must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. The TimeSeriesRatio must specify exactly two of good, bad, and total, and the relationship good_service + bad_service = total_service will be assumed.",
          ).optional(),
        }).describe(
          "Service Level Indicators for which atomic units of service are counted directly.",
        ).optional(),
        threshold: z.number().describe(
          "If window performance >= threshold, the window is counted as good.",
        ).optional(),
      }).describe(
        "A PerformanceThreshold is used when each window is good when that window has a sufficiently high performance.",
      ).optional(),
      metricMeanInRange: z.object({
        range: z.object({
          max: z.number().describe("Range maximum.").optional(),
          min: z.number().describe("Range minimum.").optional(),
        }).describe("Range of numerical values within min and max.").optional(),
        timeSeries: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying the TimeSeries to use for evaluating window quality.",
        ).optional(),
      }).describe(
        "A MetricRange is used when each window is good when the value x of a single TimeSeries satisfies range.min <= x <= range.max. The provided TimeSeries must have ValueType = INT64 or ValueType = DOUBLE and MetricKind = GAUGE.",
      ).optional(),
      metricSumInRange: z.object({
        range: z.object({
          max: z.number().describe("Range maximum.").optional(),
          min: z.number().describe("Range minimum.").optional(),
        }).describe("Range of numerical values within min and max.").optional(),
        timeSeries: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying the TimeSeries to use for evaluating window quality.",
        ).optional(),
      }).describe(
        "A MetricRange is used when each window is good when the value x of a single TimeSeries satisfies range.min <= x <= range.max. The provided TimeSeries must have ValueType = INT64 or ValueType = DOUBLE and MetricKind = GAUGE.",
      ).optional(),
      windowPeriod: z.string().describe(
        "Duration over which window quality is evaluated. Must be an integer fraction of a day and at least 60s.",
      ).optional(),
    }).describe(
      "A WindowsBasedSli defines good_service as the count of time windows for which the provided service was of good quality. Criteria for determining if service was good are embedded in the window_criterion.",
    ).optional(),
  }).describe(
    'A Service-Level Indicator (SLI) describes the "performance" of a service. For some services, the SLI is well-defined. In such cases, the SLI can be described easily by referencing the well-known SLI and providing the needed parameters. Alternatively, a "custom" SLI can be defined with a query to the underlying metric store. An SLI is defined to be good_service / total_service over any queried time interval. The value of performance always falls into the range 0 <= performance <= 1. A custom SLI describes how to compute this ratio, whether this is by dividing values from a pair of time series, cutting a Distribution into good and bad counts, or counting time windows in which the service complies with a criterion. For separation of concerns, a single Service-Level Indicator measures performance for only one aspect of service quality, such as fraction of successful queries or fast-enough queries.',
  ).optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "Labels which have been used to annotate the service-level objective. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value.",
  ).optional(),
  serviceLevelObjectiveId: z.string().describe(
    "Optional. The ServiceLevelObjective id to use for this ServiceLevelObjective. If omitted, an id will be generated instead. Must match the pattern ^[a-zA-Z0-9-_:.]+$",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  calendarPeriod: z.string().optional(),
  displayName: z.string().optional(),
  goal: z.number().optional(),
  name: z.string(),
  rollingPeriod: z.string().optional(),
  serviceLevelIndicator: z.object({
    basicSli: z.object({
      availability: z.object({}),
      latency: z.object({
        threshold: z.string(),
      }),
      location: z.array(z.string()),
      method: z.array(z.string()),
      version: z.array(z.string()),
    }),
    requestBased: z.object({
      distributionCut: z.object({
        distributionFilter: z.string(),
        range: z.object({
          max: z.number(),
          min: z.number(),
        }),
      }),
      goodTotalRatio: z.object({
        badServiceFilter: z.string(),
        goodServiceFilter: z.string(),
        totalServiceFilter: z.string(),
      }),
    }),
    windowsBased: z.object({
      goodBadMetricFilter: z.string(),
      goodTotalRatioThreshold: z.object({
        basicSliPerformance: z.object({
          availability: z.object({}),
          latency: z.object({
            threshold: z.unknown(),
          }),
          location: z.array(z.unknown()),
          method: z.array(z.unknown()),
          version: z.array(z.unknown()),
        }),
        performance: z.object({
          distributionCut: z.object({
            distributionFilter: z.unknown(),
            range: z.unknown(),
          }),
          goodTotalRatio: z.object({
            badServiceFilter: z.unknown(),
            goodServiceFilter: z.unknown(),
            totalServiceFilter: z.unknown(),
          }),
        }),
        threshold: z.number(),
      }),
      metricMeanInRange: z.object({
        range: z.object({
          max: z.number(),
          min: z.number(),
        }),
        timeSeries: z.string(),
      }),
      metricSumInRange: z.object({
        range: z.object({
          max: z.number(),
          min: z.number(),
        }),
        timeSeries: z.string(),
      }),
      windowPeriod: z.string(),
    }),
  }).optional(),
  userLabels: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  calendarPeriod: z.enum([
    "CALENDAR_PERIOD_UNSPECIFIED",
    "DAY",
    "WEEK",
    "FORTNIGHT",
    "MONTH",
    "QUARTER",
    "HALF",
    "YEAR",
  ]).describe(
    'A calendar period, semantically "since the start of the current ". At this time, only DAY, WEEK, FORTNIGHT, and MONTH are supported.',
  ).optional(),
  displayName: z.string().describe(
    "Name used for UI elements listing this SLO.",
  ).optional(),
  goal: z.number().describe(
    "The fraction of service that must be good in order for this objective to be met. 0 < goal <= 0.9999.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for this ServiceLevelObjective. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME]",
  ).optional(),
  rollingPeriod: z.string().describe(
    'A rolling time period, semantically "in the past ". Must be an integer multiple of 1 day no larger than 30 days.',
  ).optional(),
  serviceLevelIndicator: z.object({
    basicSli: z.object({
      availability: z.object({}).describe(
        "Future parameters for the availability SLI.",
      ).optional(),
      latency: z.object({
        threshold: z.string().describe(
          "Good service is defined to be the count of requests made to this service that return in no more than threshold.",
        ).optional(),
      }).describe("Parameters for a latency threshold SLI.").optional(),
      location: z.array(z.string()).describe(
        "OPTIONAL: The set of locations to which this SLI is relevant. Telemetry from other locations will not be used to calculate performance for this SLI. If omitted, this SLI applies to all locations in which the Service has activity. For service types that don't support breaking down by location, setting this field will result in an error.",
      ).optional(),
      method: z.array(z.string()).describe(
        "OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from other methods will not be used to calculate performance for this SLI. If omitted, this SLI applies to all the Service's methods. For service types that don't support breaking down by method, setting this field will result in an error.",
      ).optional(),
      version: z.array(z.string()).describe(
        "OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry from other API versions will not be used to calculate performance for this SLI. If omitted, this SLI applies to all API versions. For service types that don't support breaking down by version, setting this field will result in an error.",
      ).optional(),
    }).describe(
      "An SLI measuring performance on a well-known service type. Performance will be computed on the basis of pre-defined metrics. The type of the service_resource determines the metrics to use and the service_resource.labels and metric_labels are used to construct a monitoring filter to filter that metric down to just the data relevant to this service.",
    ).optional(),
    requestBased: z.object({
      distributionCut: z.object({
        distributionFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries aggregating values. Must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
        range: z.object({
          max: z.number().describe("Range maximum.").optional(),
          min: z.number().describe("Range minimum.").optional(),
        }).describe("Range of numerical values within min and max.").optional(),
      }).describe(
        "A DistributionCut defines a TimeSeries and thresholds used for measuring good service and total service. The TimeSeries must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. The computed good_service will be the estimated count of values in the Distribution that fall within the specified min and max.",
      ).optional(),
      goodTotalRatio: z.object({
        badServiceFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying bad service, either demanded service that was not provided or demanded service that was of inadequate quality. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
        goodServiceFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying good service provided. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
        totalServiceFilter: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying total demanded service. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
        ).optional(),
      }).describe(
        "A TimeSeriesRatio specifies two TimeSeries to use for computing the good_service / total_service ratio. The specified TimeSeries must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. The TimeSeriesRatio must specify exactly two of good, bad, and total, and the relationship good_service + bad_service = total_service will be assumed.",
      ).optional(),
    }).describe(
      "Service Level Indicators for which atomic units of service are counted directly.",
    ).optional(),
    windowsBased: z.object({
      goodBadMetricFilter: z.string().describe(
        "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries with ValueType = BOOL. The window is good if any true values appear in the window.",
      ).optional(),
      goodTotalRatioThreshold: z.object({
        basicSliPerformance: z.object({
          availability: z.object({}).describe(
            "Future parameters for the availability SLI.",
          ).optional(),
          latency: z.object({
            threshold: z.unknown().describe(
              "Good service is defined to be the count of requests made to this service that return in no more than threshold.",
            ).optional(),
          }).describe("Parameters for a latency threshold SLI.").optional(),
          location: z.array(z.unknown()).describe(
            "OPTIONAL: The set of locations to which this SLI is relevant. Telemetry from other locations will not be used to calculate performance for this SLI. If omitted, this SLI applies to all locations in which the Service has activity. For service types that don't support breaking down by location, setting this field will result in an error.",
          ).optional(),
          method: z.array(z.unknown()).describe(
            "OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from other methods will not be used to calculate performance for this SLI. If omitted, this SLI applies to all the Service's methods. For service types that don't support breaking down by method, setting this field will result in an error.",
          ).optional(),
          version: z.array(z.unknown()).describe(
            "OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry from other API versions will not be used to calculate performance for this SLI. If omitted, this SLI applies to all API versions. For service types that don't support breaking down by version, setting this field will result in an error.",
          ).optional(),
        }).describe(
          "An SLI measuring performance on a well-known service type. Performance will be computed on the basis of pre-defined metrics. The type of the service_resource determines the metrics to use and the service_resource.labels and metric_labels are used to construct a monitoring filter to filter that metric down to just the data relevant to this service.",
        ).optional(),
        performance: z.object({
          distributionCut: z.object({
            distributionFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries aggregating values. Must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
            range: z.unknown().describe(
              "Range of numerical values within min and max.",
            ).optional(),
          }).describe(
            "A DistributionCut defines a TimeSeries and thresholds used for measuring good service and total service. The TimeSeries must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. The computed good_service will be the estimated count of values in the Distribution that fall within the specified min and max.",
          ).optional(),
          goodTotalRatio: z.object({
            badServiceFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying bad service, either demanded service that was not provided or demanded service that was of inadequate quality. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
            goodServiceFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying good service provided. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
            totalServiceFilter: z.unknown().describe(
              "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying total demanded service. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE.",
            ).optional(),
          }).describe(
            "A TimeSeriesRatio specifies two TimeSeries to use for computing the good_service / total_service ratio. The specified TimeSeries must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. The TimeSeriesRatio must specify exactly two of good, bad, and total, and the relationship good_service + bad_service = total_service will be assumed.",
          ).optional(),
        }).describe(
          "Service Level Indicators for which atomic units of service are counted directly.",
        ).optional(),
        threshold: z.number().describe(
          "If window performance >= threshold, the window is counted as good.",
        ).optional(),
      }).describe(
        "A PerformanceThreshold is used when each window is good when that window has a sufficiently high performance.",
      ).optional(),
      metricMeanInRange: z.object({
        range: z.object({
          max: z.number().describe("Range maximum.").optional(),
          min: z.number().describe("Range minimum.").optional(),
        }).describe("Range of numerical values within min and max.").optional(),
        timeSeries: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying the TimeSeries to use for evaluating window quality.",
        ).optional(),
      }).describe(
        "A MetricRange is used when each window is good when the value x of a single TimeSeries satisfies range.min <= x <= range.max. The provided TimeSeries must have ValueType = INT64 or ValueType = DOUBLE and MetricKind = GAUGE.",
      ).optional(),
      metricSumInRange: z.object({
        range: z.object({
          max: z.number().describe("Range maximum.").optional(),
          min: z.number().describe("Range minimum.").optional(),
        }).describe("Range of numerical values within min and max.").optional(),
        timeSeries: z.string().describe(
          "A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying the TimeSeries to use for evaluating window quality.",
        ).optional(),
      }).describe(
        "A MetricRange is used when each window is good when the value x of a single TimeSeries satisfies range.min <= x <= range.max. The provided TimeSeries must have ValueType = INT64 or ValueType = DOUBLE and MetricKind = GAUGE.",
      ).optional(),
      windowPeriod: z.string().describe(
        "Duration over which window quality is evaluated. Must be an integer fraction of a day and at least 60s.",
      ).optional(),
    }).describe(
      "A WindowsBasedSli defines good_service as the count of time windows for which the provided service was of good quality. Criteria for determining if service was good are embedded in the window_criterion.",
    ).optional(),
  }).describe(
    'A Service-Level Indicator (SLI) describes the "performance" of a service. For some services, the SLI is well-defined. In such cases, the SLI can be described easily by referencing the well-known SLI and providing the needed parameters. Alternatively, a "custom" SLI can be defined with a query to the underlying metric store. An SLI is defined to be good_service / total_service over any queried time interval. The value of performance always falls into the range 0 <= performance <= 1. A custom SLI describes how to compute this ratio, whether this is by dividing values from a pair of time series, cutting a Distribution into good and bad counts, or counting time windows in which the service complies with a criterion. For separation of concerns, a single Service-Level Indicator measures performance for only one aspect of service quality, such as fraction of successful queries or fast-enough queries.',
  ).optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "Labels which have been used to annotate the service-level objective. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value.",
  ).optional(),
  serviceLevelObjectiveId: z.string().describe(
    "Optional. The ServiceLevelObjective id to use for this ServiceLevelObjective. If omitted, an id will be generated instead. Must match the pattern ^[a-zA-Z0-9-_:.]+$",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Monitoring Services.ServiceLevelObjectives. Registered at `@swamp/gcp/monitoring/services-servicelevelobjectives`. */
export const model = {
  type: "@swamp/gcp/monitoring/services-servicelevelobjectives",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Service-Level Objective (SLO) describes a level of desired good service. It...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a serviceLevelObjectives",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["calendarPeriod"] !== undefined) {
          body["calendarPeriod"] = g["calendarPeriod"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["goal"] !== undefined) body["goal"] = g["goal"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rollingPeriod"] !== undefined) {
          body["rollingPeriod"] = g["rollingPeriod"];
        }
        if (g["serviceLevelIndicator"] !== undefined) {
          body["serviceLevelIndicator"] = g["serviceLevelIndicator"];
        }
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
        if (g["serviceLevelObjectiveId"] !== undefined) {
          body["serviceLevelObjectiveId"] = g["serviceLevelObjectiveId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a serviceLevelObjectives",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the serviceLevelObjectives",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update serviceLevelObjectives attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["calendarPeriod"] !== undefined) {
          body["calendarPeriod"] = g["calendarPeriod"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["goal"] !== undefined) body["goal"] = g["goal"];
        if (g["rollingPeriod"] !== undefined) {
          body["rollingPeriod"] = g["rollingPeriod"];
        }
        if (g["serviceLevelIndicator"] !== undefined) {
          body["serviceLevelIndicator"] = g["serviceLevelIndicator"];
        }
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
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
          undefined,
          credentials,
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
      description: "Delete the serviceLevelObjectives",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the serviceLevelObjectives",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync serviceLevelObjectives state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List serviceLevelObjectives resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter specifying what ServiceLevelObjectives to return.",
        ).optional(),
        pageSize: z.number().describe(
          "A non-negative number that is the maximum number of results to return. When 0, use default page size.",
        ).optional(),
        view: z.string().describe(
          "View of the ServiceLevelObjectives to return. If DEFAULT, return each ServiceLevelObjective as originally defined. If EXPLICIT and the ServiceLevelObjective is defined in terms of a BasicSli, replace the BasicSli with a RequestBasedSli spelling out how the SLI is computed.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "serviceLevelObjectives",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
  },
};
