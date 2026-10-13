// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/monitoring/dashboards
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring Dashboards.
 *
 * A Google Stackdriver dashboard. Dashboards define the content and layout of pages in the Stackdriver web application.
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
  return `${parent}/dashboards/${shortName}`;
}

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.projects.dashboards.get",
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
  "id": "monitoring.projects.dashboards.create",
  "path": "v1/{+parent}/dashboards",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "monitoring.projects.dashboards.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "monitoring.projects.dashboards.delete",
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
  "id": "monitoring.projects.dashboards.list",
  "path": "v1/{+parent}/dashboards",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  annotations: z.object({
    defaultResourceNames: z.array(z.string()).describe(
      "Dashboard level defaults for names of logging resources to search for events. Currently only projects are supported. Each individual EventAnnotation may have its own overrides. If both this field and the per annotation field is empty, then the scoping project is used. Limit: 50 projects. For example: “projects/some-project-id”",
    ).optional(),
    eventAnnotations: z.array(z.object({
      displayName: z.string().describe(
        "Solely for UI display. Should not be used programmatically.",
      ).optional(),
      enabled: z.boolean().describe(
        "Whether or not to show the events on the dashboard by default",
      ).optional(),
      eventType: z.enum([
        "EVENT_TYPE_UNSPECIFIED",
        "GKE_WORKLOAD_DEPLOYMENT",
        "GKE_POD_CRASH",
        "GKE_POD_UNSCHEDULABLE",
        "GKE_CONTAINER_CREATION_FAILED",
        "GKE_CLUSTER_CREATE_DELETE",
        "GKE_CLUSTER_UPDATE",
        "GKE_NODE_POOL_UPDATE",
        "GKE_CLUSTER_AUTOSCALER",
        "GKE_POD_AUTOSCALER",
        "VM_TERMINATION",
        "VM_GUEST_OS_ERROR",
        "VM_START_FAILED",
        "MIG_UPDATE",
        "MIG_AUTOSCALER",
        "CLOUD_RUN_DEPLOYMENT",
        "CLOUD_SQL_FAILOVER",
        "CLOUD_SQL_START_STOP",
        "CLOUD_SQL_STORAGE",
        "UPTIME_CHECK_FAILURE",
        "CLOUD_ALERTING_ALERT",
        "SERVICE_HEALTH_INCIDENT",
        "SAP_BACKINT",
        "SAP_AVAILABILITY",
        "SAP_OPERATIONS",
        "INTERCONNECT_MAINTENANCE_STARTED",
        "INTERCONNECT_MAINTENANCE_COMPLETED",
        "VPN_TRAFFIC_SELECTOR_NARROWING",
        "VPN_MAINTENANCE",
      ]).describe("The type of event to display.").optional(),
      filter: z.string().describe(
        "string filtering the events - event dependant. Example values: \"resource.labels.pod_name = 'pod-1'\" \"protoPayload.authenticationInfo.principalEmail='user@example.com'\"",
      ).optional(),
      resourceNames: z.array(z.string()).describe(
        "Per annotation level override for the names of logging resources to search for events. Currently only projects are supported. If both this field and the per annotation field is empty, it will default to the host project. Limit: 50 projects. For example: “projects/another-project-id”",
      ).optional(),
    })).describe(
      "List of annotation configurations for this dashboard. Each entry specifies one event type.",
    ).optional(),
  }).describe(
    "Configuration for event annotations to display on this dashboard.",
  ).optional(),
  columnLayout: z.object({
    columns: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this column. The column weight is used to adjust the width of columns on the screen (relative to peers). Greater the weight, greater the width of the column on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe("A chart of alert policy data.")
          .optional(),
        blank: z.unknown().describe("A blank space.").optional(),
        collapsibleGroup: z.unknown().describe(
          "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        errorReportingPanel: z.unknown().describe(
          "A widget that displays a list of error groups.",
        ).optional(),
        filterControl: z.unknown().describe(
          "A widget that displays an input field to change the value of a template variable.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
        ).optional(),
        incidentList: z.unknown().describe(
          "A widget that shows list of incidents.",
        ).optional(),
        logsPanel: z.unknown().describe("A widget that shows a stream of logs.")
          .optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie chart.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A scorecard summarizing time series data.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a section header for easier navigation of the dashboard.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu.",
        ).optional(),
        text: z.unknown().describe(
          "A raw string or markdown displaying textual content.",
        ).optional(),
        timeRange: z.unknown().describe(
          "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
        ).optional(),
        timeSeriesTable: z.unknown().describe(
          "A widget that displays time series data in a tabular format.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
        ).optional(),
        xyChart: z.unknown().describe("A chart of time series data.")
          .optional(),
      })).describe("The display widgets arranged vertically in this column.")
        .optional(),
    })).describe("The columns of content to display.").optional(),
  }).describe(
    "The content is divided into equally spaced columns and the widgets are arranged vertically.",
  ).optional(),
  dashboardFilters: z.array(z.object({
    filterType: z.enum([
      "FILTER_TYPE_UNSPECIFIED",
      "RESOURCE_LABEL",
      "METRIC_LABEL",
      "USER_METADATA_LABEL",
      "SYSTEM_METADATA_LABEL",
      "GROUP",
      "VALUE_ONLY",
    ]).describe("The specified filter type").optional(),
    labelKey: z.string().describe(
      "Optional. The key for the label. This must be omitted if the filter_type is VALUE_ONLY but is required otherwise.",
    ).optional(),
    stringArray: z.object({
      values: z.array(z.string()).describe("The values of the array")
        .optional(),
    }).describe("A list of possible string values for the filter").optional(),
    stringArrayValue: z.object({
      values: z.array(z.string()).describe("The values of the array")
        .optional(),
    }).describe(
      "An array of variable-length string values. If this field is set, value_type must be set to STRING_ARRAY or VALUE_TYPE_UNSPECIFIED",
    ).optional(),
    stringValue: z.string().describe(
      "A variable-length string value. If this field is set, value_type must be set to STRING or VALUE_TYPE_UNSPECIFIED",
    ).optional(),
    templateVariable: z.string().describe(
      "The placeholder text that can be referenced in a filter string or MQL query. If omitted, the dashboard filter will be applied to all relevant widgets in the dashboard.",
    ).optional(),
    timeSeriesQuery: z.object({
      opsAnalyticsQuery: z.object({
        sql: z.string().describe(
          "A SQL query to fetch time series, category series, or numeric series data.",
        ).optional(),
      }).describe(
        "Preview: A query used to fetch a time series, category series, or numeric series with SQL. This is a preview feature and may be subject to change before final release.",
      ).optional(),
      outputFullDuration: z.boolean().describe(
        "Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart",
      ).optional(),
      prometheusQuery: z.string().describe(
        "A query used to fetch time series with PromQL.",
      ).optional(),
      timeSeriesFilter: z.object({
        aggregation: z.object({
          alignmentPeriod: z.unknown().describe(
            "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks.",
          ).optional(),
          crossSeriesReducer: z.unknown().describe(
            "The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned.",
          ).optional(),
          groupByFields: z.unknown().describe(
            "The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored.",
          ).optional(),
          perSeriesAligner: z.unknown().describe(
            "An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned.",
          ).optional(),
        }).describe(
          "By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data.",
        ).optional(),
        filter: z.string().describe(
          "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
        ).optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Select the top N streams/time series within this time interval",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe("Ranking based time series filter.").optional(),
        secondaryAggregation: z.object({
          alignmentPeriod: z.unknown().describe(
            "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks.",
          ).optional(),
          crossSeriesReducer: z.unknown().describe(
            "The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned.",
          ).optional(),
          groupByFields: z.unknown().describe(
            "The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored.",
          ).optional(),
          perSeriesAligner: z.unknown().describe(
            "An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned.",
          ).optional(),
        }).describe("Apply a second aggregation after aggregation is applied.")
          .optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "Statistics based time series filter. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe("Filter parameters to fetch time series.").optional(),
      timeSeriesFilterRatio: z.object({
        denominator: z.object({
          aggregation: z.unknown().describe(
            "By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data.",
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe("The denominator of the ratio.").optional(),
        numerator: z.object({
          aggregation: z.unknown().describe(
            "By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data.",
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe("The numerator of the ratio.").optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Select the top N streams/time series within this time interval",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe("Ranking based time series filter.").optional(),
        secondaryAggregation: z.object({
          alignmentPeriod: z.unknown().describe(
            "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks.",
          ).optional(),
          crossSeriesReducer: z.unknown().describe(
            "The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned.",
          ).optional(),
          groupByFields: z.unknown().describe(
            "The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored.",
          ).optional(),
          perSeriesAligner: z.unknown().describe(
            "An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned.",
          ).optional(),
        }).describe("Apply a second aggregation after the ratio is computed.")
          .optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "Statistics based time series filter. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe(
        "Parameters to fetch a ratio between two time series filters.",
      ).optional(),
      timeSeriesQueryLanguage: z.string().describe(
        "A query used to fetch time series with MQL.",
      ).optional(),
      traceQuery: z.object({
        resourceContainer: z.string().describe(
          "Optional. The resource name of the project or Trace scope to fetch data from. If empty, the widget will default to the project's default Trace scope. If scope cannot be determined, then we fallback to the current project. Optional.",
        ).optional(),
        spanDataValue: z.enum([
          "SPAN_DATA_VALUE_UNSPECIFIED",
          "SPAN_COUNT",
          "SPAN_DURATION",
          "SPAN_DURATION_PERCENTILES",
        ]).describe(
          "The type of span data value to be displayed on the chart. Required.",
        ).optional(),
        spanFilters: z.object({
          apphubServices: z.unknown().describe(
            'Optional. Filtering for spans containing one of the Apphub service IDs in the list. Multiple values will be OR\'d together. Example: "service-id1", "service-id2"',
          ).optional(),
          apphubWorkloads: z.unknown().describe(
            'Optional. Filtering for spans containing one of the Apphub workload IDs in the list. Multiple values will be OR\'d together. Example: "workload-id1", "workload-id2"',
          ).optional(),
          applicationIds: z.unknown().describe(
            "Optional. Filtering for spans containing one of the Apphub Application IDs in the list. Multiple values will be OR'd together.",
          ).optional(),
          attributes: z.unknown().describe(
            "Optional. List of span attribute filters. Each SpanAttributeFilter key must be unique. Multiple attribute filters will be AND'd together.",
          ).optional(),
          displayNames: z.unknown().describe(
            "Optional. Filtering for spans containing one of the span display names in the list. Multiple values will be OR'd together.",
          ).optional(),
          isRootSpan: z.unknown().describe(
            "Optional. Filters for root spans only if set to true. A root span is a span without a defined parent span ID.",
          ).optional(),
          kinds: z.unknown().describe(
            "Optional. Filtering for spans containing one of the kinds in the list. Multiple values will be OR'd together.",
          ).optional(),
          maxDuration: z.unknown().describe(
            "Optional. Filtering for spans with a maximum duration.",
          ).optional(),
          minDuration: z.unknown().describe(
            "Optional. Filtering for spans with a minimum duration.",
          ).optional(),
          services: z.unknown().describe(
            "Optional. Filtering for spans containing one of the services in the list. Multiple values will be OR'd together.",
          ).optional(),
          status: z.unknown().describe(
            "Optional. Filtering for spans containing one of the statuses in the list. Multiple values will be OR'd together.",
          ).optional(),
        }).describe(
          "First version of span filtering that we will support. Required.",
        ).optional(),
      }).describe(
        "Optional. Preview: Query for traces. This is a preview feature and may be subject to change before final release.",
      ).optional(),
      unitOverride: z.string().describe(
        "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
      ).optional(),
    }).describe(
      "A query to run to fetch possible values for the filter. Only OpsAnalyticsQueries are supported",
    ).optional(),
    valueType: z.enum(["VALUE_TYPE_UNSPECIFIED", "STRING", "STRING_ARRAY"])
      .describe(
        "The type of the filter value. If value_type is not provided, it will be inferred from the default_value. If neither value_type nor default_value is provided, value_type will be set to STRING by default.",
      ).optional(),
  })).describe(
    "Filters to reduce the amount of data charted based on the filter criteria.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The mutable, human-readable name.",
  ).optional(),
  gridLayout: z.object({
    columns: z.string().describe(
      "The number of columns into which the view's width is divided. If omitted or set to zero, a system default will be used while rendering.",
    ).optional(),
    widgets: z.array(z.object({
      alertChart: z.object({
        name: z.string().describe(
          "Required. The resource name of the alert policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID]",
        ).optional(),
      }).describe("A chart of alert policy data.").optional(),
      blank: z.object({}).describe("A blank space.").optional(),
      collapsibleGroup: z.object({
        collapsed: z.boolean().describe(
          "The collapsed state of the widget on first page load.",
        ).optional(),
      }).describe(
        "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
      ).optional(),
      errorReportingPanel: z.object({
        projectNames: z.array(z.unknown()).describe(
          "The resource name of the Google Cloud Platform project. Written as projects/{projectID} or projects/{projectNumber}, where {projectID} and {projectNumber} can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840).Examples: projects/my-project-123, projects/5551234.",
        ).optional(),
        services: z.array(z.unknown()).describe(
          "An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to version, which can be changed whenever new code is deployed.Contains the service name for error reports extracted from Google App Engine logs or default if the App Engine default service is used.",
        ).optional(),
        versions: z.array(z.unknown()).describe(
          "Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app.",
        ).optional(),
      }).describe("A widget that displays a list of error groups.").optional(),
      filterControl: z.object({
        templateVariable: z.string().describe(
          "Name of the template variable the widget affects.",
        ).optional(),
      }).describe(
        "A widget that displays an input field to change the value of a template variable.",
      ).optional(),
      id: z.string().describe(
        "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
      ).optional(),
      incidentList: z.object({
        monitoredResources: z.array(z.unknown()).describe(
          "Optional. The monitored resource for which incidents are listed. The resource doesn't need to be fully specified. That is, you can specify the resource type but not the values of the resource labels. The resource type and labels are used for filtering.",
        ).optional(),
        policyNames: z.array(z.unknown()).describe(
          "Optional. A list of alert policy names to filter the incident list by. Don't include the project ID prefix in the policy name. For example, use alertPolicies/utilization.",
        ).optional(),
      }).describe("A widget that shows list of incidents.").optional(),
      logsPanel: z.object({
        filter: z.string().describe(
          "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
        ).optional(),
        resourceNames: z.array(z.unknown()).describe(
          "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
        ).optional(),
      }).describe("A widget that shows a stream of logs.").optional(),
      pieChart: z.object({
        chartType: z.enum(["PIE_CHART_TYPE_UNSPECIFIED", "PIE", "DONUT"])
          .describe(
            "Required. Indicates the visualization type for the PieChart.",
          ).optional(),
        dataSets: z.array(z.unknown()).describe(
          "Required. The queries for the chart's data.",
        ).optional(),
        showLabels: z.boolean().describe(
          "Optional. Indicates whether or not the pie chart should show slices' labels",
        ).optional(),
      }).describe("A widget that displays timeseries data as a pie chart.")
        .optional(),
      scorecard: z.object({
        blankView: z.object({}).describe(
          "Will cause the Scorecard to show only the value, with no indicator to its value relative to its thresholds.",
        ).optional(),
        breakdowns: z.array(z.unknown()).describe(
          "Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region.",
        ).optional(),
        dimensions: z.array(z.unknown()).describe(
          "Optional. A dimension is a structured label, class, or category for a set of measurements in your data.",
        ).optional(),
        gaugeView: z.object({
          lowerBound: z.unknown().describe(
            "The lower bound for this gauge chart. The value of the chart should always be greater than or equal to this.",
          ).optional(),
          upperBound: z.unknown().describe(
            "The upper bound for this gauge chart. The value of the chart should always be less than or equal to this.",
          ).optional(),
        }).describe("Will cause the scorecard to show a gauge chart.")
          .optional(),
        measures: z.array(z.unknown()).describe(
          "Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc.",
        ).optional(),
        sparkChartView: z.object({
          minAlignmentPeriod: z.unknown().describe(
            "The lower bound on data point frequency in the chart implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes it would not make sense to fetch and align data at one minute intervals. This field is optional and exists only as a hint.For PromQL queries, this field is used to set the minimum interval for the query step, controlling data granularity. Larger values can improve performance on long time ranges. See Querying Basics and Range Queries for more details on the PromQL step.",
          ).optional(),
          sparkChartType: z.unknown().describe(
            "Required. The type of sparkchart to show in this chartView.",
          ).optional(),
        }).describe("Will cause the scorecard to show a spark chart.")
          .optional(),
        thresholds: z.array(z.unknown()).describe(
          "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
        ).optional(),
        timeSeriesQuery: z.object({
          opsAnalyticsQuery: z.unknown().describe(
            "Preview: A query used to fetch a time series, category series, or numeric series with SQL. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          outputFullDuration: z.unknown().describe(
            "Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart",
          ).optional(),
          prometheusQuery: z.unknown().describe(
            "A query used to fetch time series with PromQL.",
          ).optional(),
          timeSeriesFilter: z.unknown().describe(
            "Filter parameters to fetch time series.",
          ).optional(),
          timeSeriesFilterRatio: z.unknown().describe(
            "Parameters to fetch a ratio between two time series filters.",
          ).optional(),
          timeSeriesQueryLanguage: z.unknown().describe(
            "A query used to fetch time series with MQL.",
          ).optional(),
          traceQuery: z.unknown().describe(
            "Optional. Preview: Query for traces. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          unitOverride: z.unknown().describe(
            "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
          ).optional(),
        }).describe(
          "Required. Fields for querying time series data from the Stackdriver metrics API.",
        ).optional(),
      }).describe("A scorecard summarizing time series data.").optional(),
      sectionHeader: z.object({
        dividerBelow: z.boolean().describe(
          "Whether to insert a divider below the section in the table of contents",
        ).optional(),
        subtitle: z.string().describe("The subtitle of the section").optional(),
      }).describe(
        "A widget that defines a section header for easier navigation of the dashboard.",
      ).optional(),
      singleViewGroup: z.object({
        displayType: z.enum(["DISPLAY_TYPE_UNSPECIFIED", "DROPDOWN", "TAB"])
          .describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
      }).describe(
        "A widget that groups the other widgets by using a dropdown menu.",
      ).optional(),
      text: z.object({
        content: z.string().describe("The text content to be displayed.")
          .optional(),
        format: z.enum(["FORMAT_UNSPECIFIED", "MARKDOWN", "RAW"]).describe(
          "How the text content is formatted.",
        ).optional(),
        style: z.object({
          backgroundColor: z.unknown().describe(
            'The background color as a hex string. "#RRGGBB" or "#RGB"',
          ).optional(),
          fontSize: z.unknown().describe(
            "Font sizes for both the title and content. The title will still be larger relative to the content.",
          ).optional(),
          horizontalAlignment: z.unknown().describe(
            "The horizontal alignment of both the title and content",
          ).optional(),
          padding: z.unknown().describe(
            "The amount of padding around the widget",
          ).optional(),
          pointerLocation: z.unknown().describe(
            'The pointer location for this widget (also sometimes called a "tail")',
          ).optional(),
          textColor: z.unknown().describe(
            'The text color as a hex string. "#RRGGBB" or "#RGB"',
          ).optional(),
          verticalAlignment: z.unknown().describe(
            "The vertical alignment of both the title and content",
          ).optional(),
        }).describe("How the text is styled").optional(),
      }).describe("A raw string or markdown displaying textual content.")
        .optional(),
      timeRange: z.object({
        absoluteWindow: z.object({
          endTime: z.unknown().describe(
            "Optional. Exclusive end of the interval.If specified, a Timestamp matching this interval will have to be before the end.",
          ).optional(),
          startTime: z.unknown().describe(
            "Optional. Inclusive start of the interval.If specified, a Timestamp matching this interval will have to be the same or after the start.",
          ).optional(),
        }).describe(
          "Optional. Represents a time range with absolute start and end times. The start time is inclusive, and the end time is exclusive.",
        ).optional(),
        relativeDuration: z.string().describe(
          "Optional. Specifies the duration used to shift the data relative to current time as the end time. The duration must be positive.",
        ).optional(),
      }).describe(
        "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
      ).optional(),
      timeSeriesTable: z.object({
        columnSettings: z.array(z.unknown()).describe(
          "Optional. The list of the persistent column settings for the table.",
        ).optional(),
        dataSets: z.array(z.unknown()).describe(
          "Required. The data displayed in this table.",
        ).optional(),
        metricVisualization: z.enum([
          "METRIC_VISUALIZATION_UNSPECIFIED",
          "NUMBER",
          "BAR",
        ]).describe("Optional. Store rendering strategy").optional(),
      }).describe(
        "A widget that displays time series data in a tabular format.",
      ).optional(),
      title: z.string().describe("Optional. The title of the widget.")
        .optional(),
      treemap: z.object({
        dataSets: z.array(z.unknown()).describe(
          "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
        ).optional(),
        treemapHierarchy: z.array(z.unknown()).describe(
          "Required. Ordered labels representing the hierarchical treemap structure.",
        ).optional(),
      }).describe("A widget that displays data as a treemap.").optional(),
      visibilityCondition: z.object({
        templateVariableCondition: z.object({
          comparator: z.unknown().describe(
            "Comparator to use to evaluate whether the value of the template variable matches the template_variable_value. For example, if the comparator is REGEX_FULL_MATCH, template_variable_value would contain a regex that is matched against the value of the template variable.",
          ).optional(),
          templateVariable: z.unknown().describe(
            "The template variable whose value is evaluated.",
          ).optional(),
          templateVariableValue: z.unknown().describe(
            "The value to compare the template variable to. For example, if the comparator is REGEX_FULL_MATCH, this field should contain a regex.",
          ).optional(),
        }).describe(
          "A condition whose evaluation is based on the value of a template variable.",
        ).optional(),
      }).describe(
        "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
      ).optional(),
      xyChart: z.object({
        chartOptions: z.object({
          displayHorizontal: z.unknown().describe(
            "Preview: Configures whether the charted values are shown on the horizontal or vertical axis. By default, values are represented the vertical axis. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          mode: z.unknown().describe("The chart mode.").optional(),
        }).describe("Display options for the chart.").optional(),
        dataSets: z.array(z.unknown()).describe(
          "Required. The data displayed in this chart.",
        ).optional(),
        thresholds: z.array(z.unknown()).describe(
          "Threshold lines drawn horizontally across the chart.",
        ).optional(),
        timeshiftDuration: z.string().describe(
          "The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type.",
        ).optional(),
        xAxis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("The properties applied to the x-axis.").optional(),
        y2Axis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("The properties applied to the y2-axis.").optional(),
        yAxis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("The properties applied to the y-axis.").optional(),
      }).describe("A chart of time series data.").optional(),
    })).describe(
      "The informational elements that are arranged into the columns row-first.",
    ).optional(),
  }).describe(
    "Content is arranged with a basic layout that re-flows a simple list of informational elements like widgets or tiles.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels applied to the dashboard",
  ).optional(),
  mosaicLayout: z.object({
    columns: z.number().int().describe(
      "The number of columns in the mosaic grid. The number of columns must be between 1 and 48, inclusive.",
    ).optional(),
    tiles: z.array(z.object({
      height: z.number().int().describe(
        "The height of the tile, measured in grid blocks. Tiles must have a minimum height of 1.",
      ).optional(),
      widget: z.object({
        alertChart: z.object({
          name: z.unknown().describe(
            "Required. The resource name of the alert policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID]",
          ).optional(),
        }).describe("A chart of alert policy data.").optional(),
        blank: z.object({}).describe("A blank space.").optional(),
        collapsibleGroup: z.object({
          collapsed: z.unknown().describe(
            "The collapsed state of the widget on first page load.",
          ).optional(),
        }).describe(
          "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        errorReportingPanel: z.object({
          projectNames: z.unknown().describe(
            "The resource name of the Google Cloud Platform project. Written as projects/{projectID} or projects/{projectNumber}, where {projectID} and {projectNumber} can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840).Examples: projects/my-project-123, projects/5551234.",
          ).optional(),
          services: z.unknown().describe(
            "An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to version, which can be changed whenever new code is deployed.Contains the service name for error reports extracted from Google App Engine logs or default if the App Engine default service is used.",
          ).optional(),
          versions: z.unknown().describe(
            "Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app.",
          ).optional(),
        }).describe("A widget that displays a list of error groups.")
          .optional(),
        filterControl: z.object({
          templateVariable: z.unknown().describe(
            "Name of the template variable the widget affects.",
          ).optional(),
        }).describe(
          "A widget that displays an input field to change the value of a template variable.",
        ).optional(),
        id: z.string().describe(
          "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
        ).optional(),
        incidentList: z.object({
          monitoredResources: z.unknown().describe(
            "Optional. The monitored resource for which incidents are listed. The resource doesn't need to be fully specified. That is, you can specify the resource type but not the values of the resource labels. The resource type and labels are used for filtering.",
          ).optional(),
          policyNames: z.unknown().describe(
            "Optional. A list of alert policy names to filter the incident list by. Don't include the project ID prefix in the policy name. For example, use alertPolicies/utilization.",
          ).optional(),
        }).describe("A widget that shows list of incidents.").optional(),
        logsPanel: z.object({
          filter: z.unknown().describe(
            "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
          ).optional(),
          resourceNames: z.unknown().describe(
            "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
          ).optional(),
        }).describe("A widget that shows a stream of logs.").optional(),
        pieChart: z.object({
          chartType: z.unknown().describe(
            "Required. Indicates the visualization type for the PieChart.",
          ).optional(),
          dataSets: z.unknown().describe(
            "Required. The queries for the chart's data.",
          ).optional(),
          showLabels: z.unknown().describe(
            "Optional. Indicates whether or not the pie chart should show slices' labels",
          ).optional(),
        }).describe("A widget that displays timeseries data as a pie chart.")
          .optional(),
        scorecard: z.object({
          blankView: z.unknown().describe(
            "Will cause the Scorecard to show only the value, with no indicator to its value relative to its thresholds.",
          ).optional(),
          breakdowns: z.unknown().describe(
            "Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region.",
          ).optional(),
          dimensions: z.unknown().describe(
            "Optional. A dimension is a structured label, class, or category for a set of measurements in your data.",
          ).optional(),
          gaugeView: z.unknown().describe(
            "Will cause the scorecard to show a gauge chart.",
          ).optional(),
          measures: z.unknown().describe(
            "Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc.",
          ).optional(),
          sparkChartView: z.unknown().describe(
            "Will cause the scorecard to show a spark chart.",
          ).optional(),
          thresholds: z.unknown().describe(
            "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
          ).optional(),
          timeSeriesQuery: z.unknown().describe(
            "Required. Fields for querying time series data from the Stackdriver metrics API.",
          ).optional(),
        }).describe("A scorecard summarizing time series data.").optional(),
        sectionHeader: z.object({
          dividerBelow: z.unknown().describe(
            "Whether to insert a divider below the section in the table of contents",
          ).optional(),
          subtitle: z.unknown().describe("The subtitle of the section")
            .optional(),
        }).describe(
          "A widget that defines a section header for easier navigation of the dashboard.",
        ).optional(),
        singleViewGroup: z.object({
          displayType: z.unknown().describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
        }).describe(
          "A widget that groups the other widgets by using a dropdown menu.",
        ).optional(),
        text: z.object({
          content: z.unknown().describe("The text content to be displayed.")
            .optional(),
          format: z.unknown().describe("How the text content is formatted.")
            .optional(),
          style: z.unknown().describe("How the text is styled").optional(),
        }).describe("A raw string or markdown displaying textual content.")
          .optional(),
        timeRange: z.object({
          absoluteWindow: z.unknown().describe(
            "Optional. Represents a time range with absolute start and end times. The start time is inclusive, and the end time is exclusive.",
          ).optional(),
          relativeDuration: z.unknown().describe(
            "Optional. Specifies the duration used to shift the data relative to current time as the end time. The duration must be positive.",
          ).optional(),
        }).describe(
          "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
        ).optional(),
        timeSeriesTable: z.object({
          columnSettings: z.unknown().describe(
            "Optional. The list of the persistent column settings for the table.",
          ).optional(),
          dataSets: z.unknown().describe(
            "Required. The data displayed in this table.",
          ).optional(),
          metricVisualization: z.unknown().describe(
            "Optional. Store rendering strategy",
          ).optional(),
        }).describe(
          "A widget that displays time series data in a tabular format.",
        ).optional(),
        title: z.string().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.object({
          dataSets: z.unknown().describe(
            "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
          ).optional(),
          treemapHierarchy: z.unknown().describe(
            "Required. Ordered labels representing the hierarchical treemap structure.",
          ).optional(),
        }).describe("A widget that displays data as a treemap.").optional(),
        visibilityCondition: z.object({
          templateVariableCondition: z.unknown().describe(
            "A condition whose evaluation is based on the value of a template variable.",
          ).optional(),
        }).describe(
          "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
        ).optional(),
        xyChart: z.object({
          chartOptions: z.unknown().describe("Display options for the chart.")
            .optional(),
          dataSets: z.unknown().describe(
            "Required. The data displayed in this chart.",
          ).optional(),
          thresholds: z.unknown().describe(
            "Threshold lines drawn horizontally across the chart.",
          ).optional(),
          timeshiftDuration: z.unknown().describe(
            "The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type.",
          ).optional(),
          xAxis: z.unknown().describe("The properties applied to the x-axis.")
            .optional(),
          y2Axis: z.unknown().describe("The properties applied to the y2-axis.")
            .optional(),
          yAxis: z.unknown().describe("The properties applied to the y-axis.")
            .optional(),
        }).describe("A chart of time series data.").optional(),
      }).describe(
        "The informational widget contained in the tile. For example an XyChart.",
      ).optional(),
      width: z.number().int().describe(
        "The width of the tile, measured in grid blocks. Tiles must have a minimum width of 1.",
      ).optional(),
      xPos: z.number().int().describe(
        "The zero-indexed position of the tile in grid blocks relative to the left edge of the grid. Tiles must be contained within the specified number of columns. x_pos cannot be negative.",
      ).optional(),
      yPos: z.number().int().describe(
        "The zero-indexed position of the tile in grid blocks relative to the top edge of the grid. y_pos cannot be negative.",
      ).optional(),
    })).describe("The tiles to display.").optional(),
  }).describe(
    "The content is arranged as a grid of tiles, with each content widget occupying one or more grid blocks.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the dashboard.")
    .optional(),
  rowLayout: z.object({
    rows: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this row. The row weight is used to adjust the height of rows on the screen (relative to peers). Greater the weight, greater the height of the row on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe("A chart of alert policy data.")
          .optional(),
        blank: z.unknown().describe("A blank space.").optional(),
        collapsibleGroup: z.unknown().describe(
          "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        errorReportingPanel: z.unknown().describe(
          "A widget that displays a list of error groups.",
        ).optional(),
        filterControl: z.unknown().describe(
          "A widget that displays an input field to change the value of a template variable.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
        ).optional(),
        incidentList: z.unknown().describe(
          "A widget that shows list of incidents.",
        ).optional(),
        logsPanel: z.unknown().describe("A widget that shows a stream of logs.")
          .optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie chart.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A scorecard summarizing time series data.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a section header for easier navigation of the dashboard.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu.",
        ).optional(),
        text: z.unknown().describe(
          "A raw string or markdown displaying textual content.",
        ).optional(),
        timeRange: z.unknown().describe(
          "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
        ).optional(),
        timeSeriesTable: z.unknown().describe(
          "A widget that displays time series data in a tabular format.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
        ).optional(),
        xyChart: z.unknown().describe("A chart of time series data.")
          .optional(),
      })).describe("The display widgets arranged horizontally in this row.")
        .optional(),
    })).describe("The rows of content to display.").optional(),
  }).describe(
    "The content is divided into equally spaced rows and the widgets are arranged horizontally.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.object({
    defaultResourceNames: z.array(z.string()),
    eventAnnotations: z.array(z.object({
      displayName: z.string(),
      enabled: z.boolean(),
      eventType: z.string(),
      filter: z.string(),
      resourceNames: z.array(z.string()),
    })),
  }).optional(),
  columnLayout: z.object({
    columns: z.array(z.object({
      weight: z.string(),
      widgets: z.array(z.object({
        alertChart: z.unknown(),
        blank: z.unknown(),
        collapsibleGroup: z.unknown(),
        errorReportingPanel: z.unknown(),
        filterControl: z.unknown(),
        id: z.unknown(),
        incidentList: z.unknown(),
        logsPanel: z.unknown(),
        pieChart: z.unknown(),
        scorecard: z.unknown(),
        sectionHeader: z.unknown(),
        singleViewGroup: z.unknown(),
        text: z.unknown(),
        timeRange: z.unknown(),
        timeSeriesTable: z.unknown(),
        title: z.unknown(),
        treemap: z.unknown(),
        visibilityCondition: z.unknown(),
        xyChart: z.unknown(),
      })),
    })),
  }).optional(),
  dashboardFilters: z.array(z.object({
    filterType: z.string(),
    labelKey: z.string(),
    stringArray: z.object({
      values: z.array(z.string()),
    }),
    stringArrayValue: z.object({
      values: z.array(z.string()),
    }),
    stringValue: z.string(),
    templateVariable: z.string(),
    timeSeriesQuery: z.object({
      opsAnalyticsQuery: z.object({
        sql: z.string(),
      }),
      outputFullDuration: z.boolean(),
      prometheusQuery: z.string(),
      timeSeriesFilter: z.object({
        aggregation: z.object({
          alignmentPeriod: z.unknown(),
          crossSeriesReducer: z.unknown(),
          groupByFields: z.unknown(),
          perSeriesAligner: z.unknown(),
        }),
        filter: z.string(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown(),
          interval: z.unknown(),
          numTimeSeries: z.unknown(),
          rankingMethod: z.unknown(),
        }),
        secondaryAggregation: z.object({
          alignmentPeriod: z.unknown(),
          crossSeriesReducer: z.unknown(),
          groupByFields: z.unknown(),
          perSeriesAligner: z.unknown(),
        }),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown(),
          rankingMethod: z.unknown(),
        }),
      }),
      timeSeriesFilterRatio: z.object({
        denominator: z.object({
          aggregation: z.unknown(),
          filter: z.unknown(),
        }),
        numerator: z.object({
          aggregation: z.unknown(),
          filter: z.unknown(),
        }),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown(),
          interval: z.unknown(),
          numTimeSeries: z.unknown(),
          rankingMethod: z.unknown(),
        }),
        secondaryAggregation: z.object({
          alignmentPeriod: z.unknown(),
          crossSeriesReducer: z.unknown(),
          groupByFields: z.unknown(),
          perSeriesAligner: z.unknown(),
        }),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown(),
          rankingMethod: z.unknown(),
        }),
      }),
      timeSeriesQueryLanguage: z.string(),
      traceQuery: z.object({
        resourceContainer: z.string(),
        spanDataValue: z.string(),
        spanFilters: z.object({
          apphubServices: z.unknown(),
          apphubWorkloads: z.unknown(),
          applicationIds: z.unknown(),
          attributes: z.unknown(),
          displayNames: z.unknown(),
          isRootSpan: z.unknown(),
          kinds: z.unknown(),
          maxDuration: z.unknown(),
          minDuration: z.unknown(),
          services: z.unknown(),
          status: z.unknown(),
        }),
      }),
      unitOverride: z.string(),
    }),
    valueType: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  gridLayout: z.object({
    columns: z.string(),
    widgets: z.array(z.object({
      alertChart: z.object({
        name: z.string(),
      }),
      blank: z.object({}),
      collapsibleGroup: z.object({
        collapsed: z.boolean(),
      }),
      errorReportingPanel: z.object({
        projectNames: z.array(z.unknown()),
        services: z.array(z.unknown()),
        versions: z.array(z.unknown()),
      }),
      filterControl: z.object({
        templateVariable: z.string(),
      }),
      id: z.string(),
      incidentList: z.object({
        monitoredResources: z.array(z.unknown()),
        policyNames: z.array(z.unknown()),
      }),
      logsPanel: z.object({
        filter: z.string(),
        resourceNames: z.array(z.unknown()),
      }),
      pieChart: z.object({
        chartType: z.string(),
        dataSets: z.array(z.unknown()),
        showLabels: z.boolean(),
      }),
      scorecard: z.object({
        blankView: z.object({}),
        breakdowns: z.array(z.unknown()),
        dimensions: z.array(z.unknown()),
        gaugeView: z.object({
          lowerBound: z.unknown(),
          upperBound: z.unknown(),
        }),
        measures: z.array(z.unknown()),
        sparkChartView: z.object({
          minAlignmentPeriod: z.unknown(),
          sparkChartType: z.unknown(),
        }),
        thresholds: z.array(z.unknown()),
        timeSeriesQuery: z.object({
          opsAnalyticsQuery: z.unknown(),
          outputFullDuration: z.unknown(),
          prometheusQuery: z.unknown(),
          timeSeriesFilter: z.unknown(),
          timeSeriesFilterRatio: z.unknown(),
          timeSeriesQueryLanguage: z.unknown(),
          traceQuery: z.unknown(),
          unitOverride: z.unknown(),
        }),
      }),
      sectionHeader: z.object({
        dividerBelow: z.boolean(),
        subtitle: z.string(),
      }),
      singleViewGroup: z.object({
        displayType: z.string(),
      }),
      text: z.object({
        content: z.string(),
        format: z.string(),
        style: z.object({
          backgroundColor: z.unknown(),
          fontSize: z.unknown(),
          horizontalAlignment: z.unknown(),
          padding: z.unknown(),
          pointerLocation: z.unknown(),
          textColor: z.unknown(),
          verticalAlignment: z.unknown(),
        }),
      }),
      timeRange: z.object({
        absoluteWindow: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
        relativeDuration: z.string(),
      }),
      timeSeriesTable: z.object({
        columnSettings: z.array(z.unknown()),
        dataSets: z.array(z.unknown()),
        metricVisualization: z.string(),
      }),
      title: z.string(),
      treemap: z.object({
        dataSets: z.array(z.unknown()),
        treemapHierarchy: z.array(z.unknown()),
      }),
      visibilityCondition: z.object({
        templateVariableCondition: z.object({
          comparator: z.unknown(),
          templateVariable: z.unknown(),
          templateVariableValue: z.unknown(),
        }),
      }),
      xyChart: z.object({
        chartOptions: z.object({
          displayHorizontal: z.unknown(),
          mode: z.unknown(),
        }),
        dataSets: z.array(z.unknown()),
        thresholds: z.array(z.unknown()),
        timeshiftDuration: z.string(),
        xAxis: z.object({
          label: z.unknown(),
          scale: z.unknown(),
        }),
        y2Axis: z.object({
          label: z.unknown(),
          scale: z.unknown(),
        }),
        yAxis: z.object({
          label: z.unknown(),
          scale: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  mosaicLayout: z.object({
    columns: z.number(),
    tiles: z.array(z.object({
      height: z.number(),
      widget: z.object({
        alertChart: z.object({
          name: z.unknown(),
        }),
        blank: z.object({}),
        collapsibleGroup: z.object({
          collapsed: z.unknown(),
        }),
        errorReportingPanel: z.object({
          projectNames: z.unknown(),
          services: z.unknown(),
          versions: z.unknown(),
        }),
        filterControl: z.object({
          templateVariable: z.unknown(),
        }),
        id: z.string(),
        incidentList: z.object({
          monitoredResources: z.unknown(),
          policyNames: z.unknown(),
        }),
        logsPanel: z.object({
          filter: z.unknown(),
          resourceNames: z.unknown(),
        }),
        pieChart: z.object({
          chartType: z.unknown(),
          dataSets: z.unknown(),
          showLabels: z.unknown(),
        }),
        scorecard: z.object({
          blankView: z.unknown(),
          breakdowns: z.unknown(),
          dimensions: z.unknown(),
          gaugeView: z.unknown(),
          measures: z.unknown(),
          sparkChartView: z.unknown(),
          thresholds: z.unknown(),
          timeSeriesQuery: z.unknown(),
        }),
        sectionHeader: z.object({
          dividerBelow: z.unknown(),
          subtitle: z.unknown(),
        }),
        singleViewGroup: z.object({
          displayType: z.unknown(),
        }),
        text: z.object({
          content: z.unknown(),
          format: z.unknown(),
          style: z.unknown(),
        }),
        timeRange: z.object({
          absoluteWindow: z.unknown(),
          relativeDuration: z.unknown(),
        }),
        timeSeriesTable: z.object({
          columnSettings: z.unknown(),
          dataSets: z.unknown(),
          metricVisualization: z.unknown(),
        }),
        title: z.string(),
        treemap: z.object({
          dataSets: z.unknown(),
          treemapHierarchy: z.unknown(),
        }),
        visibilityCondition: z.object({
          templateVariableCondition: z.unknown(),
        }),
        xyChart: z.object({
          chartOptions: z.unknown(),
          dataSets: z.unknown(),
          thresholds: z.unknown(),
          timeshiftDuration: z.unknown(),
          xAxis: z.unknown(),
          y2Axis: z.unknown(),
          yAxis: z.unknown(),
        }),
      }),
      width: z.number(),
      xPos: z.number(),
      yPos: z.number(),
    })),
  }).optional(),
  name: z.string(),
  rowLayout: z.object({
    rows: z.array(z.object({
      weight: z.string(),
      widgets: z.array(z.object({
        alertChart: z.unknown(),
        blank: z.unknown(),
        collapsibleGroup: z.unknown(),
        errorReportingPanel: z.unknown(),
        filterControl: z.unknown(),
        id: z.unknown(),
        incidentList: z.unknown(),
        logsPanel: z.unknown(),
        pieChart: z.unknown(),
        scorecard: z.unknown(),
        sectionHeader: z.unknown(),
        singleViewGroup: z.unknown(),
        text: z.unknown(),
        timeRange: z.unknown(),
        timeSeriesTable: z.unknown(),
        title: z.unknown(),
        treemap: z.unknown(),
        visibilityCondition: z.unknown(),
        xyChart: z.unknown(),
      })),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  annotations: z.object({
    defaultResourceNames: z.array(z.string()).describe(
      "Dashboard level defaults for names of logging resources to search for events. Currently only projects are supported. Each individual EventAnnotation may have its own overrides. If both this field and the per annotation field is empty, then the scoping project is used. Limit: 50 projects. For example: “projects/some-project-id”",
    ).optional(),
    eventAnnotations: z.array(z.object({
      displayName: z.string().describe(
        "Solely for UI display. Should not be used programmatically.",
      ).optional(),
      enabled: z.boolean().describe(
        "Whether or not to show the events on the dashboard by default",
      ).optional(),
      eventType: z.enum([
        "EVENT_TYPE_UNSPECIFIED",
        "GKE_WORKLOAD_DEPLOYMENT",
        "GKE_POD_CRASH",
        "GKE_POD_UNSCHEDULABLE",
        "GKE_CONTAINER_CREATION_FAILED",
        "GKE_CLUSTER_CREATE_DELETE",
        "GKE_CLUSTER_UPDATE",
        "GKE_NODE_POOL_UPDATE",
        "GKE_CLUSTER_AUTOSCALER",
        "GKE_POD_AUTOSCALER",
        "VM_TERMINATION",
        "VM_GUEST_OS_ERROR",
        "VM_START_FAILED",
        "MIG_UPDATE",
        "MIG_AUTOSCALER",
        "CLOUD_RUN_DEPLOYMENT",
        "CLOUD_SQL_FAILOVER",
        "CLOUD_SQL_START_STOP",
        "CLOUD_SQL_STORAGE",
        "UPTIME_CHECK_FAILURE",
        "CLOUD_ALERTING_ALERT",
        "SERVICE_HEALTH_INCIDENT",
        "SAP_BACKINT",
        "SAP_AVAILABILITY",
        "SAP_OPERATIONS",
        "INTERCONNECT_MAINTENANCE_STARTED",
        "INTERCONNECT_MAINTENANCE_COMPLETED",
        "VPN_TRAFFIC_SELECTOR_NARROWING",
        "VPN_MAINTENANCE",
      ]).describe("The type of event to display.").optional(),
      filter: z.string().describe(
        "string filtering the events - event dependant. Example values: \"resource.labels.pod_name = 'pod-1'\" \"protoPayload.authenticationInfo.principalEmail='user@example.com'\"",
      ).optional(),
      resourceNames: z.array(z.string()).describe(
        "Per annotation level override for the names of logging resources to search for events. Currently only projects are supported. If both this field and the per annotation field is empty, it will default to the host project. Limit: 50 projects. For example: “projects/another-project-id”",
      ).optional(),
    })).describe(
      "List of annotation configurations for this dashboard. Each entry specifies one event type.",
    ).optional(),
  }).describe(
    "Configuration for event annotations to display on this dashboard.",
  ).optional(),
  columnLayout: z.object({
    columns: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this column. The column weight is used to adjust the width of columns on the screen (relative to peers). Greater the weight, greater the width of the column on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe("A chart of alert policy data.")
          .optional(),
        blank: z.unknown().describe("A blank space.").optional(),
        collapsibleGroup: z.unknown().describe(
          "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        errorReportingPanel: z.unknown().describe(
          "A widget that displays a list of error groups.",
        ).optional(),
        filterControl: z.unknown().describe(
          "A widget that displays an input field to change the value of a template variable.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
        ).optional(),
        incidentList: z.unknown().describe(
          "A widget that shows list of incidents.",
        ).optional(),
        logsPanel: z.unknown().describe("A widget that shows a stream of logs.")
          .optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie chart.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A scorecard summarizing time series data.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a section header for easier navigation of the dashboard.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu.",
        ).optional(),
        text: z.unknown().describe(
          "A raw string or markdown displaying textual content.",
        ).optional(),
        timeRange: z.unknown().describe(
          "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
        ).optional(),
        timeSeriesTable: z.unknown().describe(
          "A widget that displays time series data in a tabular format.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
        ).optional(),
        xyChart: z.unknown().describe("A chart of time series data.")
          .optional(),
      })).describe("The display widgets arranged vertically in this column.")
        .optional(),
    })).describe("The columns of content to display.").optional(),
  }).describe(
    "The content is divided into equally spaced columns and the widgets are arranged vertically.",
  ).optional(),
  dashboardFilters: z.array(z.object({
    filterType: z.enum([
      "FILTER_TYPE_UNSPECIFIED",
      "RESOURCE_LABEL",
      "METRIC_LABEL",
      "USER_METADATA_LABEL",
      "SYSTEM_METADATA_LABEL",
      "GROUP",
      "VALUE_ONLY",
    ]).describe("The specified filter type").optional(),
    labelKey: z.string().describe(
      "Optional. The key for the label. This must be omitted if the filter_type is VALUE_ONLY but is required otherwise.",
    ).optional(),
    stringArray: z.object({
      values: z.array(z.string()).describe("The values of the array")
        .optional(),
    }).describe("A list of possible string values for the filter").optional(),
    stringArrayValue: z.object({
      values: z.array(z.string()).describe("The values of the array")
        .optional(),
    }).describe(
      "An array of variable-length string values. If this field is set, value_type must be set to STRING_ARRAY or VALUE_TYPE_UNSPECIFIED",
    ).optional(),
    stringValue: z.string().describe(
      "A variable-length string value. If this field is set, value_type must be set to STRING or VALUE_TYPE_UNSPECIFIED",
    ).optional(),
    templateVariable: z.string().describe(
      "The placeholder text that can be referenced in a filter string or MQL query. If omitted, the dashboard filter will be applied to all relevant widgets in the dashboard.",
    ).optional(),
    timeSeriesQuery: z.object({
      opsAnalyticsQuery: z.object({
        sql: z.string().describe(
          "A SQL query to fetch time series, category series, or numeric series data.",
        ).optional(),
      }).describe(
        "Preview: A query used to fetch a time series, category series, or numeric series with SQL. This is a preview feature and may be subject to change before final release.",
      ).optional(),
      outputFullDuration: z.boolean().describe(
        "Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart",
      ).optional(),
      prometheusQuery: z.string().describe(
        "A query used to fetch time series with PromQL.",
      ).optional(),
      timeSeriesFilter: z.object({
        aggregation: z.object({
          alignmentPeriod: z.unknown().describe(
            "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks.",
          ).optional(),
          crossSeriesReducer: z.unknown().describe(
            "The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned.",
          ).optional(),
          groupByFields: z.unknown().describe(
            "The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored.",
          ).optional(),
          perSeriesAligner: z.unknown().describe(
            "An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned.",
          ).optional(),
        }).describe(
          "By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data.",
        ).optional(),
        filter: z.string().describe(
          "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
        ).optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Select the top N streams/time series within this time interval",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe("Ranking based time series filter.").optional(),
        secondaryAggregation: z.object({
          alignmentPeriod: z.unknown().describe(
            "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks.",
          ).optional(),
          crossSeriesReducer: z.unknown().describe(
            "The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned.",
          ).optional(),
          groupByFields: z.unknown().describe(
            "The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored.",
          ).optional(),
          perSeriesAligner: z.unknown().describe(
            "An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned.",
          ).optional(),
        }).describe("Apply a second aggregation after aggregation is applied.")
          .optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "Statistics based time series filter. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe("Filter parameters to fetch time series.").optional(),
      timeSeriesFilterRatio: z.object({
        denominator: z.object({
          aggregation: z.unknown().describe(
            "By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data.",
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe("The denominator of the ratio.").optional(),
        numerator: z.object({
          aggregation: z.unknown().describe(
            "By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data.",
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe("The numerator of the ratio.").optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Select the top N streams/time series within this time interval",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe("Ranking based time series filter.").optional(),
        secondaryAggregation: z.object({
          alignmentPeriod: z.unknown().describe(
            "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks.",
          ).optional(),
          crossSeriesReducer: z.unknown().describe(
            "The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned.",
          ).optional(),
          groupByFields: z.unknown().describe(
            "The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored.",
          ).optional(),
          perSeriesAligner: z.unknown().describe(
            "An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned.",
          ).optional(),
        }).describe("Apply a second aggregation after the ratio is computed.")
          .optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "Statistics based time series filter. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe(
        "Parameters to fetch a ratio between two time series filters.",
      ).optional(),
      timeSeriesQueryLanguage: z.string().describe(
        "A query used to fetch time series with MQL.",
      ).optional(),
      traceQuery: z.object({
        resourceContainer: z.string().describe(
          "Optional. The resource name of the project or Trace scope to fetch data from. If empty, the widget will default to the project's default Trace scope. If scope cannot be determined, then we fallback to the current project. Optional.",
        ).optional(),
        spanDataValue: z.enum([
          "SPAN_DATA_VALUE_UNSPECIFIED",
          "SPAN_COUNT",
          "SPAN_DURATION",
          "SPAN_DURATION_PERCENTILES",
        ]).describe(
          "The type of span data value to be displayed on the chart. Required.",
        ).optional(),
        spanFilters: z.object({
          apphubServices: z.unknown().describe(
            'Optional. Filtering for spans containing one of the Apphub service IDs in the list. Multiple values will be OR\'d together. Example: "service-id1", "service-id2"',
          ).optional(),
          apphubWorkloads: z.unknown().describe(
            'Optional. Filtering for spans containing one of the Apphub workload IDs in the list. Multiple values will be OR\'d together. Example: "workload-id1", "workload-id2"',
          ).optional(),
          applicationIds: z.unknown().describe(
            "Optional. Filtering for spans containing one of the Apphub Application IDs in the list. Multiple values will be OR'd together.",
          ).optional(),
          attributes: z.unknown().describe(
            "Optional. List of span attribute filters. Each SpanAttributeFilter key must be unique. Multiple attribute filters will be AND'd together.",
          ).optional(),
          displayNames: z.unknown().describe(
            "Optional. Filtering for spans containing one of the span display names in the list. Multiple values will be OR'd together.",
          ).optional(),
          isRootSpan: z.unknown().describe(
            "Optional. Filters for root spans only if set to true. A root span is a span without a defined parent span ID.",
          ).optional(),
          kinds: z.unknown().describe(
            "Optional. Filtering for spans containing one of the kinds in the list. Multiple values will be OR'd together.",
          ).optional(),
          maxDuration: z.unknown().describe(
            "Optional. Filtering for spans with a maximum duration.",
          ).optional(),
          minDuration: z.unknown().describe(
            "Optional. Filtering for spans with a minimum duration.",
          ).optional(),
          services: z.unknown().describe(
            "Optional. Filtering for spans containing one of the services in the list. Multiple values will be OR'd together.",
          ).optional(),
          status: z.unknown().describe(
            "Optional. Filtering for spans containing one of the statuses in the list. Multiple values will be OR'd together.",
          ).optional(),
        }).describe(
          "First version of span filtering that we will support. Required.",
        ).optional(),
      }).describe(
        "Optional. Preview: Query for traces. This is a preview feature and may be subject to change before final release.",
      ).optional(),
      unitOverride: z.string().describe(
        "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
      ).optional(),
    }).describe(
      "A query to run to fetch possible values for the filter. Only OpsAnalyticsQueries are supported",
    ).optional(),
    valueType: z.enum(["VALUE_TYPE_UNSPECIFIED", "STRING", "STRING_ARRAY"])
      .describe(
        "The type of the filter value. If value_type is not provided, it will be inferred from the default_value. If neither value_type nor default_value is provided, value_type will be set to STRING by default.",
      ).optional(),
  })).describe(
    "Filters to reduce the amount of data charted based on the filter criteria.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The mutable, human-readable name.",
  ).optional(),
  gridLayout: z.object({
    columns: z.string().describe(
      "The number of columns into which the view's width is divided. If omitted or set to zero, a system default will be used while rendering.",
    ).optional(),
    widgets: z.array(z.object({
      alertChart: z.object({
        name: z.string().describe(
          "Required. The resource name of the alert policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID]",
        ).optional(),
      }).describe("A chart of alert policy data.").optional(),
      blank: z.object({}).describe("A blank space.").optional(),
      collapsibleGroup: z.object({
        collapsed: z.boolean().describe(
          "The collapsed state of the widget on first page load.",
        ).optional(),
      }).describe(
        "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
      ).optional(),
      errorReportingPanel: z.object({
        projectNames: z.array(z.unknown()).describe(
          "The resource name of the Google Cloud Platform project. Written as projects/{projectID} or projects/{projectNumber}, where {projectID} and {projectNumber} can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840).Examples: projects/my-project-123, projects/5551234.",
        ).optional(),
        services: z.array(z.unknown()).describe(
          "An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to version, which can be changed whenever new code is deployed.Contains the service name for error reports extracted from Google App Engine logs or default if the App Engine default service is used.",
        ).optional(),
        versions: z.array(z.unknown()).describe(
          "Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app.",
        ).optional(),
      }).describe("A widget that displays a list of error groups.").optional(),
      filterControl: z.object({
        templateVariable: z.string().describe(
          "Name of the template variable the widget affects.",
        ).optional(),
      }).describe(
        "A widget that displays an input field to change the value of a template variable.",
      ).optional(),
      id: z.string().describe(
        "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
      ).optional(),
      incidentList: z.object({
        monitoredResources: z.array(z.unknown()).describe(
          "Optional. The monitored resource for which incidents are listed. The resource doesn't need to be fully specified. That is, you can specify the resource type but not the values of the resource labels. The resource type and labels are used for filtering.",
        ).optional(),
        policyNames: z.array(z.unknown()).describe(
          "Optional. A list of alert policy names to filter the incident list by. Don't include the project ID prefix in the policy name. For example, use alertPolicies/utilization.",
        ).optional(),
      }).describe("A widget that shows list of incidents.").optional(),
      logsPanel: z.object({
        filter: z.string().describe(
          "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
        ).optional(),
        resourceNames: z.array(z.unknown()).describe(
          "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
        ).optional(),
      }).describe("A widget that shows a stream of logs.").optional(),
      pieChart: z.object({
        chartType: z.enum(["PIE_CHART_TYPE_UNSPECIFIED", "PIE", "DONUT"])
          .describe(
            "Required. Indicates the visualization type for the PieChart.",
          ).optional(),
        dataSets: z.array(z.unknown()).describe(
          "Required. The queries for the chart's data.",
        ).optional(),
        showLabels: z.boolean().describe(
          "Optional. Indicates whether or not the pie chart should show slices' labels",
        ).optional(),
      }).describe("A widget that displays timeseries data as a pie chart.")
        .optional(),
      scorecard: z.object({
        blankView: z.object({}).describe(
          "Will cause the Scorecard to show only the value, with no indicator to its value relative to its thresholds.",
        ).optional(),
        breakdowns: z.array(z.unknown()).describe(
          "Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region.",
        ).optional(),
        dimensions: z.array(z.unknown()).describe(
          "Optional. A dimension is a structured label, class, or category for a set of measurements in your data.",
        ).optional(),
        gaugeView: z.object({
          lowerBound: z.unknown().describe(
            "The lower bound for this gauge chart. The value of the chart should always be greater than or equal to this.",
          ).optional(),
          upperBound: z.unknown().describe(
            "The upper bound for this gauge chart. The value of the chart should always be less than or equal to this.",
          ).optional(),
        }).describe("Will cause the scorecard to show a gauge chart.")
          .optional(),
        measures: z.array(z.unknown()).describe(
          "Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc.",
        ).optional(),
        sparkChartView: z.object({
          minAlignmentPeriod: z.unknown().describe(
            "The lower bound on data point frequency in the chart implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes it would not make sense to fetch and align data at one minute intervals. This field is optional and exists only as a hint.For PromQL queries, this field is used to set the minimum interval for the query step, controlling data granularity. Larger values can improve performance on long time ranges. See Querying Basics and Range Queries for more details on the PromQL step.",
          ).optional(),
          sparkChartType: z.unknown().describe(
            "Required. The type of sparkchart to show in this chartView.",
          ).optional(),
        }).describe("Will cause the scorecard to show a spark chart.")
          .optional(),
        thresholds: z.array(z.unknown()).describe(
          "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
        ).optional(),
        timeSeriesQuery: z.object({
          opsAnalyticsQuery: z.unknown().describe(
            "Preview: A query used to fetch a time series, category series, or numeric series with SQL. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          outputFullDuration: z.unknown().describe(
            "Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart",
          ).optional(),
          prometheusQuery: z.unknown().describe(
            "A query used to fetch time series with PromQL.",
          ).optional(),
          timeSeriesFilter: z.unknown().describe(
            "Filter parameters to fetch time series.",
          ).optional(),
          timeSeriesFilterRatio: z.unknown().describe(
            "Parameters to fetch a ratio between two time series filters.",
          ).optional(),
          timeSeriesQueryLanguage: z.unknown().describe(
            "A query used to fetch time series with MQL.",
          ).optional(),
          traceQuery: z.unknown().describe(
            "Optional. Preview: Query for traces. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          unitOverride: z.unknown().describe(
            "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
          ).optional(),
        }).describe(
          "Required. Fields for querying time series data from the Stackdriver metrics API.",
        ).optional(),
      }).describe("A scorecard summarizing time series data.").optional(),
      sectionHeader: z.object({
        dividerBelow: z.boolean().describe(
          "Whether to insert a divider below the section in the table of contents",
        ).optional(),
        subtitle: z.string().describe("The subtitle of the section").optional(),
      }).describe(
        "A widget that defines a section header for easier navigation of the dashboard.",
      ).optional(),
      singleViewGroup: z.object({
        displayType: z.enum(["DISPLAY_TYPE_UNSPECIFIED", "DROPDOWN", "TAB"])
          .describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
      }).describe(
        "A widget that groups the other widgets by using a dropdown menu.",
      ).optional(),
      text: z.object({
        content: z.string().describe("The text content to be displayed.")
          .optional(),
        format: z.enum(["FORMAT_UNSPECIFIED", "MARKDOWN", "RAW"]).describe(
          "How the text content is formatted.",
        ).optional(),
        style: z.object({
          backgroundColor: z.unknown().describe(
            'The background color as a hex string. "#RRGGBB" or "#RGB"',
          ).optional(),
          fontSize: z.unknown().describe(
            "Font sizes for both the title and content. The title will still be larger relative to the content.",
          ).optional(),
          horizontalAlignment: z.unknown().describe(
            "The horizontal alignment of both the title and content",
          ).optional(),
          padding: z.unknown().describe(
            "The amount of padding around the widget",
          ).optional(),
          pointerLocation: z.unknown().describe(
            'The pointer location for this widget (also sometimes called a "tail")',
          ).optional(),
          textColor: z.unknown().describe(
            'The text color as a hex string. "#RRGGBB" or "#RGB"',
          ).optional(),
          verticalAlignment: z.unknown().describe(
            "The vertical alignment of both the title and content",
          ).optional(),
        }).describe("How the text is styled").optional(),
      }).describe("A raw string or markdown displaying textual content.")
        .optional(),
      timeRange: z.object({
        absoluteWindow: z.object({
          endTime: z.unknown().describe(
            "Optional. Exclusive end of the interval.If specified, a Timestamp matching this interval will have to be before the end.",
          ).optional(),
          startTime: z.unknown().describe(
            "Optional. Inclusive start of the interval.If specified, a Timestamp matching this interval will have to be the same or after the start.",
          ).optional(),
        }).describe(
          "Optional. Represents a time range with absolute start and end times. The start time is inclusive, and the end time is exclusive.",
        ).optional(),
        relativeDuration: z.string().describe(
          "Optional. Specifies the duration used to shift the data relative to current time as the end time. The duration must be positive.",
        ).optional(),
      }).describe(
        "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
      ).optional(),
      timeSeriesTable: z.object({
        columnSettings: z.array(z.unknown()).describe(
          "Optional. The list of the persistent column settings for the table.",
        ).optional(),
        dataSets: z.array(z.unknown()).describe(
          "Required. The data displayed in this table.",
        ).optional(),
        metricVisualization: z.enum([
          "METRIC_VISUALIZATION_UNSPECIFIED",
          "NUMBER",
          "BAR",
        ]).describe("Optional. Store rendering strategy").optional(),
      }).describe(
        "A widget that displays time series data in a tabular format.",
      ).optional(),
      title: z.string().describe("Optional. The title of the widget.")
        .optional(),
      treemap: z.object({
        dataSets: z.array(z.unknown()).describe(
          "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
        ).optional(),
        treemapHierarchy: z.array(z.unknown()).describe(
          "Required. Ordered labels representing the hierarchical treemap structure.",
        ).optional(),
      }).describe("A widget that displays data as a treemap.").optional(),
      visibilityCondition: z.object({
        templateVariableCondition: z.object({
          comparator: z.unknown().describe(
            "Comparator to use to evaluate whether the value of the template variable matches the template_variable_value. For example, if the comparator is REGEX_FULL_MATCH, template_variable_value would contain a regex that is matched against the value of the template variable.",
          ).optional(),
          templateVariable: z.unknown().describe(
            "The template variable whose value is evaluated.",
          ).optional(),
          templateVariableValue: z.unknown().describe(
            "The value to compare the template variable to. For example, if the comparator is REGEX_FULL_MATCH, this field should contain a regex.",
          ).optional(),
        }).describe(
          "A condition whose evaluation is based on the value of a template variable.",
        ).optional(),
      }).describe(
        "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
      ).optional(),
      xyChart: z.object({
        chartOptions: z.object({
          displayHorizontal: z.unknown().describe(
            "Preview: Configures whether the charted values are shown on the horizontal or vertical axis. By default, values are represented the vertical axis. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          mode: z.unknown().describe("The chart mode.").optional(),
        }).describe("Display options for the chart.").optional(),
        dataSets: z.array(z.unknown()).describe(
          "Required. The data displayed in this chart.",
        ).optional(),
        thresholds: z.array(z.unknown()).describe(
          "Threshold lines drawn horizontally across the chart.",
        ).optional(),
        timeshiftDuration: z.string().describe(
          "The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type.",
        ).optional(),
        xAxis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("The properties applied to the x-axis.").optional(),
        y2Axis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("The properties applied to the y2-axis.").optional(),
        yAxis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("The properties applied to the y-axis.").optional(),
      }).describe("A chart of time series data.").optional(),
    })).describe(
      "The informational elements that are arranged into the columns row-first.",
    ).optional(),
  }).describe(
    "Content is arranged with a basic layout that re-flows a simple list of informational elements like widgets or tiles.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels applied to the dashboard",
  ).optional(),
  mosaicLayout: z.object({
    columns: z.number().int().describe(
      "The number of columns in the mosaic grid. The number of columns must be between 1 and 48, inclusive.",
    ).optional(),
    tiles: z.array(z.object({
      height: z.number().int().describe(
        "The height of the tile, measured in grid blocks. Tiles must have a minimum height of 1.",
      ).optional(),
      widget: z.object({
        alertChart: z.object({
          name: z.unknown().describe(
            "Required. The resource name of the alert policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID]",
          ).optional(),
        }).describe("A chart of alert policy data.").optional(),
        blank: z.object({}).describe("A blank space.").optional(),
        collapsibleGroup: z.object({
          collapsed: z.unknown().describe(
            "The collapsed state of the widget on first page load.",
          ).optional(),
        }).describe(
          "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        errorReportingPanel: z.object({
          projectNames: z.unknown().describe(
            "The resource name of the Google Cloud Platform project. Written as projects/{projectID} or projects/{projectNumber}, where {projectID} and {projectNumber} can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840).Examples: projects/my-project-123, projects/5551234.",
          ).optional(),
          services: z.unknown().describe(
            "An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to version, which can be changed whenever new code is deployed.Contains the service name for error reports extracted from Google App Engine logs or default if the App Engine default service is used.",
          ).optional(),
          versions: z.unknown().describe(
            "Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app.",
          ).optional(),
        }).describe("A widget that displays a list of error groups.")
          .optional(),
        filterControl: z.object({
          templateVariable: z.unknown().describe(
            "Name of the template variable the widget affects.",
          ).optional(),
        }).describe(
          "A widget that displays an input field to change the value of a template variable.",
        ).optional(),
        id: z.string().describe(
          "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
        ).optional(),
        incidentList: z.object({
          monitoredResources: z.unknown().describe(
            "Optional. The monitored resource for which incidents are listed. The resource doesn't need to be fully specified. That is, you can specify the resource type but not the values of the resource labels. The resource type and labels are used for filtering.",
          ).optional(),
          policyNames: z.unknown().describe(
            "Optional. A list of alert policy names to filter the incident list by. Don't include the project ID prefix in the policy name. For example, use alertPolicies/utilization.",
          ).optional(),
        }).describe("A widget that shows list of incidents.").optional(),
        logsPanel: z.object({
          filter: z.unknown().describe(
            "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
          ).optional(),
          resourceNames: z.unknown().describe(
            "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
          ).optional(),
        }).describe("A widget that shows a stream of logs.").optional(),
        pieChart: z.object({
          chartType: z.unknown().describe(
            "Required. Indicates the visualization type for the PieChart.",
          ).optional(),
          dataSets: z.unknown().describe(
            "Required. The queries for the chart's data.",
          ).optional(),
          showLabels: z.unknown().describe(
            "Optional. Indicates whether or not the pie chart should show slices' labels",
          ).optional(),
        }).describe("A widget that displays timeseries data as a pie chart.")
          .optional(),
        scorecard: z.object({
          blankView: z.unknown().describe(
            "Will cause the Scorecard to show only the value, with no indicator to its value relative to its thresholds.",
          ).optional(),
          breakdowns: z.unknown().describe(
            "Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region.",
          ).optional(),
          dimensions: z.unknown().describe(
            "Optional. A dimension is a structured label, class, or category for a set of measurements in your data.",
          ).optional(),
          gaugeView: z.unknown().describe(
            "Will cause the scorecard to show a gauge chart.",
          ).optional(),
          measures: z.unknown().describe(
            "Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc.",
          ).optional(),
          sparkChartView: z.unknown().describe(
            "Will cause the scorecard to show a spark chart.",
          ).optional(),
          thresholds: z.unknown().describe(
            "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
          ).optional(),
          timeSeriesQuery: z.unknown().describe(
            "Required. Fields for querying time series data from the Stackdriver metrics API.",
          ).optional(),
        }).describe("A scorecard summarizing time series data.").optional(),
        sectionHeader: z.object({
          dividerBelow: z.unknown().describe(
            "Whether to insert a divider below the section in the table of contents",
          ).optional(),
          subtitle: z.unknown().describe("The subtitle of the section")
            .optional(),
        }).describe(
          "A widget that defines a section header for easier navigation of the dashboard.",
        ).optional(),
        singleViewGroup: z.object({
          displayType: z.unknown().describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
        }).describe(
          "A widget that groups the other widgets by using a dropdown menu.",
        ).optional(),
        text: z.object({
          content: z.unknown().describe("The text content to be displayed.")
            .optional(),
          format: z.unknown().describe("How the text content is formatted.")
            .optional(),
          style: z.unknown().describe("How the text is styled").optional(),
        }).describe("A raw string or markdown displaying textual content.")
          .optional(),
        timeRange: z.object({
          absoluteWindow: z.unknown().describe(
            "Optional. Represents a time range with absolute start and end times. The start time is inclusive, and the end time is exclusive.",
          ).optional(),
          relativeDuration: z.unknown().describe(
            "Optional. Specifies the duration used to shift the data relative to current time as the end time. The duration must be positive.",
          ).optional(),
        }).describe(
          "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
        ).optional(),
        timeSeriesTable: z.object({
          columnSettings: z.unknown().describe(
            "Optional. The list of the persistent column settings for the table.",
          ).optional(),
          dataSets: z.unknown().describe(
            "Required. The data displayed in this table.",
          ).optional(),
          metricVisualization: z.unknown().describe(
            "Optional. Store rendering strategy",
          ).optional(),
        }).describe(
          "A widget that displays time series data in a tabular format.",
        ).optional(),
        title: z.string().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.object({
          dataSets: z.unknown().describe(
            "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
          ).optional(),
          treemapHierarchy: z.unknown().describe(
            "Required. Ordered labels representing the hierarchical treemap structure.",
          ).optional(),
        }).describe("A widget that displays data as a treemap.").optional(),
        visibilityCondition: z.object({
          templateVariableCondition: z.unknown().describe(
            "A condition whose evaluation is based on the value of a template variable.",
          ).optional(),
        }).describe(
          "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
        ).optional(),
        xyChart: z.object({
          chartOptions: z.unknown().describe("Display options for the chart.")
            .optional(),
          dataSets: z.unknown().describe(
            "Required. The data displayed in this chart.",
          ).optional(),
          thresholds: z.unknown().describe(
            "Threshold lines drawn horizontally across the chart.",
          ).optional(),
          timeshiftDuration: z.unknown().describe(
            "The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type.",
          ).optional(),
          xAxis: z.unknown().describe("The properties applied to the x-axis.")
            .optional(),
          y2Axis: z.unknown().describe("The properties applied to the y2-axis.")
            .optional(),
          yAxis: z.unknown().describe("The properties applied to the y-axis.")
            .optional(),
        }).describe("A chart of time series data.").optional(),
      }).describe(
        "The informational widget contained in the tile. For example an XyChart.",
      ).optional(),
      width: z.number().int().describe(
        "The width of the tile, measured in grid blocks. Tiles must have a minimum width of 1.",
      ).optional(),
      xPos: z.number().int().describe(
        "The zero-indexed position of the tile in grid blocks relative to the left edge of the grid. Tiles must be contained within the specified number of columns. x_pos cannot be negative.",
      ).optional(),
      yPos: z.number().int().describe(
        "The zero-indexed position of the tile in grid blocks relative to the top edge of the grid. y_pos cannot be negative.",
      ).optional(),
    })).describe("The tiles to display.").optional(),
  }).describe(
    "The content is arranged as a grid of tiles, with each content widget occupying one or more grid blocks.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the dashboard.")
    .optional(),
  rowLayout: z.object({
    rows: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this row. The row weight is used to adjust the height of rows on the screen (relative to peers). Greater the weight, greater the height of the row on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe("A chart of alert policy data.")
          .optional(),
        blank: z.unknown().describe("A blank space.").optional(),
        collapsibleGroup: z.unknown().describe(
          "A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        errorReportingPanel: z.unknown().describe(
          "A widget that displays a list of error groups.",
        ).optional(),
        filterControl: z.unknown().describe(
          "A widget that displays an input field to change the value of a template variable.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional.",
        ).optional(),
        incidentList: z.unknown().describe(
          "A widget that shows list of incidents.",
        ).optional(),
        logsPanel: z.unknown().describe("A widget that shows a stream of logs.")
          .optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie chart.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A scorecard summarizing time series data.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a section header for easier navigation of the dashboard.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu.",
        ).optional(),
        text: z.unknown().describe(
          "A raw string or markdown displaying textual content.",
        ).optional(),
        timeRange: z.unknown().describe(
          "Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only.",
        ).optional(),
        timeSeriesTable: z.unknown().describe(
          "A widget that displays time series data in a tabular format.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Optional. If set, this widget is rendered only when the condition is evaluated to true.",
        ).optional(),
        xyChart: z.unknown().describe("A chart of time series data.")
          .optional(),
      })).describe("The display widgets arranged horizontally in this row.")
        .optional(),
    })).describe("The rows of content to display.").optional(),
  }).describe(
    "The content is divided into equally spaced rows and the widgets are arranged horizontally.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Monitoring Dashboards. Registered at `@swamp/gcp/monitoring/dashboards`. */
export const model = {
  type: "@swamp/gcp/monitoring/dashboards",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Google Stackdriver dashboard. Dashboards define the content and layout of p...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dashboards",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["columnLayout"] !== undefined) {
          body["columnLayout"] = g["columnLayout"];
        }
        if (g["dashboardFilters"] !== undefined) {
          body["dashboardFilters"] = g["dashboardFilters"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gridLayout"] !== undefined) body["gridLayout"] = g["gridLayout"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mosaicLayout"] !== undefined) {
          body["mosaicLayout"] = g["mosaicLayout"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rowLayout"] !== undefined) body["rowLayout"] = g["rowLayout"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a dashboards",
      arguments: z.object({
        identifier: z.string().describe("The name of the dashboards"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update dashboards attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific dashboards by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["columnLayout"] !== undefined) {
          body["columnLayout"] = g["columnLayout"];
        }
        if (g["dashboardFilters"] !== undefined) {
          body["dashboardFilters"] = g["dashboardFilters"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gridLayout"] !== undefined) body["gridLayout"] = g["gridLayout"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mosaicLayout"] !== undefined) {
          body["mosaicLayout"] = g["mosaicLayout"];
        }
        if (g["rowLayout"] !== undefined) body["rowLayout"] = g["rowLayout"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          baseUrl,
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
      description: "Delete the dashboards",
      arguments: z.object({
        identifier: z.string().describe("The name of the dashboards"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync dashboards state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific dashboards by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List dashboards resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "A positive number that is the maximum number of results to return. If unspecified, a default of 1000 is used.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "dashboards",
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
