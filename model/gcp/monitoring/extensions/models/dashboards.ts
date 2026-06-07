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
  }).describe("Dashboard-level configuration for annotations").optional(),
  columnLayout: z.object({
    columns: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this column. The column weight is used to adjust the width of columns on the screen (relative to peers). Greater the weight, greater the width of the column on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe(
          "A chart that displays alert policy data.",
        ).optional(),
        blank: z.unknown().describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
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
          "A widget that displays a list of incidents",
        ).optional(),
        logsPanel: z.unknown().describe(
          "A widget that displays a stream of log.",
        ).optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie or a donut.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        text: z.unknown().describe("A widget that displays textual content.")
          .optional(),
        timeSeriesTable: z.unknown().describe(
          "A table that displays time series data.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays hierarchical data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Condition that determines whether the widget should be displayed.",
        ).optional(),
        xyChart: z.unknown().describe(
          "A chart that displays data on a 2D (X and Y axes) plane.",
        ).optional(),
      })).describe("The display widgets arranged vertically in this column.")
        .optional(),
    })).describe("The columns of content to display.").optional(),
  }).describe(
    "A simplified layout that divides the available space into vertical columns and arranges a set of widgets vertically in each column.",
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
    }).describe("An array of strings").optional(),
    stringArrayValue: z.object({
      values: z.array(z.string()).describe("The values of the array")
        .optional(),
    }).describe("An array of strings").optional(),
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
        "Preview: A query that produces an aggregated response and supporting data. This is a preview feature and may be subject to change before final release.",
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
          'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
        ).optional(),
        filter: z.string().describe(
          "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
        ).optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive).The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe(
          "Describes a ranking-based time series filter. Each input time series is ranked with an aligner. The filter will allow up to num_time_series time series to pass through it, selecting them based on the relative ranking.For example, if ranking_method is METHOD_MEAN,direction is BOTTOM, and num_time_series is 3, then the 3 times series with the lowest mean values will pass through the filter.",
        ).optional(),
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
        }).describe(
          'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
        ).optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "A filter that ranks streams based on their statistical relation to other streams in a request. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe(
        "A filter that defines a subset of time series data that is displayed in a widget. Time series data is fetched using the ListTimeSeries (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) method.",
      ).optional(),
      timeSeriesFilterRatio: z.object({
        denominator: z.object({
          aggregation: z.unknown().describe(
            'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe(
          "Describes a query to build the numerator or denominator of a TimeSeriesFilterRatio.",
        ).optional(),
        numerator: z.object({
          aggregation: z.unknown().describe(
            'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe(
          "Describes a query to build the numerator or denominator of a TimeSeriesFilterRatio.",
        ).optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive).The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe(
          "Describes a ranking-based time series filter. Each input time series is ranked with an aligner. The filter will allow up to num_time_series time series to pass through it, selecting them based on the relative ranking.For example, if ranking_method is METHOD_MEAN,direction is BOTTOM, and num_time_series is 3, then the 3 times series with the lowest mean values will pass through the filter.",
        ).optional(),
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
        }).describe(
          'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
        ).optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "A filter that ranks streams based on their statistical relation to other streams in a request. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe(
        "A pair of time series filters that define a ratio computation. The output time series is the pair-wise division of each aligned element from the numerator and denominator time series.",
      ).optional(),
      timeSeriesQueryLanguage: z.string().describe(
        "A query used to fetch time series with MQL.",
      ).optional(),
      unitOverride: z.string().describe(
        "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
      ).optional(),
    }).describe(
      "TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.",
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
      }).describe("A chart that displays alert policy data.").optional(),
      blank: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
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
      }).describe("A widget that displays a list of incidents").optional(),
      logsPanel: z.object({
        filter: z.string().describe(
          "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
        ).optional(),
        resourceNames: z.array(z.unknown()).describe(
          "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
        ).optional(),
      }).describe("A widget that displays a stream of log.").optional(),
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
      }).describe("A widget that displays timeseries data as a pie or a donut.")
        .optional(),
      scorecard: z.object({
        blankView: z.object({}).describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
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
        }).describe(
          "A gauge chart shows where the current value sits within a pre-defined range. The upper and lower bounds should define the possible range of values for the scorecard's query (inclusive).",
        ).optional(),
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
        }).describe(
          "A sparkChart is a small chart suitable for inclusion in a table-cell or inline in text. This message contains the configuration for a sparkChart to show up on a Scorecard, showing recent trends of the scorecard's timeseries.",
        ).optional(),
        thresholds: z.array(z.unknown()).describe(
          "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
        ).optional(),
        timeSeriesQuery: z.object({
          opsAnalyticsQuery: z.unknown().describe(
            "Preview: A query that produces an aggregated response and supporting data. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          outputFullDuration: z.unknown().describe(
            "Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart",
          ).optional(),
          prometheusQuery: z.unknown().describe(
            "A query used to fetch time series with PromQL.",
          ).optional(),
          timeSeriesFilter: z.unknown().describe(
            "A filter that defines a subset of time series data that is displayed in a widget. Time series data is fetched using the ListTimeSeries (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) method.",
          ).optional(),
          timeSeriesFilterRatio: z.unknown().describe(
            "A pair of time series filters that define a ratio computation. The output time series is the pair-wise division of each aligned element from the numerator and denominator time series.",
          ).optional(),
          timeSeriesQueryLanguage: z.unknown().describe(
            "A query used to fetch time series with MQL.",
          ).optional(),
          unitOverride: z.unknown().describe(
            "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
          ).optional(),
        }).describe(
          "TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.",
        ).optional(),
      }).describe(
        "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
      ).optional(),
      sectionHeader: z.object({
        dividerBelow: z.boolean().describe(
          "Whether to insert a divider below the section in the table of contents",
        ).optional(),
        subtitle: z.string().describe("The subtitle of the section").optional(),
      }).describe(
        "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
      ).optional(),
      singleViewGroup: z.object({
        displayType: z.enum(["DISPLAY_TYPE_UNSPECIFIED", "DROPDOWN", "TAB"])
          .describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
      }).describe(
        "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
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
        }).describe(
          "Properties that determine how the title and content are styled",
        ).optional(),
      }).describe("A widget that displays textual content.").optional(),
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
      }).describe("A table that displays time series data.").optional(),
      title: z.string().describe("Optional. The title of the widget.")
        .optional(),
      treemap: z.object({
        dataSets: z.array(z.unknown()).describe(
          "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
        ).optional(),
        treemapHierarchy: z.array(z.unknown()).describe(
          "Required. Ordered labels representing the hierarchical treemap structure.",
        ).optional(),
      }).describe("A widget that displays hierarchical data as a treemap.")
        .optional(),
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
        "Condition that determines whether the widget should be displayed.",
      ).optional(),
      xyChart: z.object({
        chartOptions: z.object({
          displayHorizontal: z.unknown().describe(
            "Preview: Configures whether the charted values are shown on the horizontal or vertical axis. By default, values are represented the vertical axis. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          mode: z.unknown().describe("The chart mode.").optional(),
        }).describe("Options to control visual rendering of a chart.")
          .optional(),
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
        }).describe("A chart axis.").optional(),
        y2Axis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("A chart axis.").optional(),
        yAxis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("A chart axis.").optional(),
      }).describe("A chart that displays data on a 2D (X and Y axes) plane.")
        .optional(),
    })).describe(
      "The informational elements that are arranged into the columns row-first.",
    ).optional(),
  }).describe(
    "A basic layout divides the available space into vertical columns of equal width and arranges a list of widgets using a row-first strategy.",
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
        }).describe("A chart that displays alert policy data.").optional(),
        blank: z.object({}).describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
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
        }).describe("A widget that displays a list of incidents").optional(),
        logsPanel: z.object({
          filter: z.unknown().describe(
            "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
          ).optional(),
          resourceNames: z.unknown().describe(
            "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
          ).optional(),
        }).describe("A widget that displays a stream of log.").optional(),
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
        }).describe(
          "A widget that displays timeseries data as a pie or a donut.",
        ).optional(),
        scorecard: z.object({
          blankView: z.unknown().describe(
            "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
          ).optional(),
          breakdowns: z.unknown().describe(
            "Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region.",
          ).optional(),
          dimensions: z.unknown().describe(
            "Optional. A dimension is a structured label, class, or category for a set of measurements in your data.",
          ).optional(),
          gaugeView: z.unknown().describe(
            "A gauge chart shows where the current value sits within a pre-defined range. The upper and lower bounds should define the possible range of values for the scorecard's query (inclusive).",
          ).optional(),
          measures: z.unknown().describe(
            "Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc.",
          ).optional(),
          sparkChartView: z.unknown().describe(
            "A sparkChart is a small chart suitable for inclusion in a table-cell or inline in text. This message contains the configuration for a sparkChart to show up on a Scorecard, showing recent trends of the scorecard's timeseries.",
          ).optional(),
          thresholds: z.unknown().describe(
            "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
          ).optional(),
          timeSeriesQuery: z.unknown().describe(
            "TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.",
          ).optional(),
        }).describe(
          "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
        ).optional(),
        sectionHeader: z.object({
          dividerBelow: z.unknown().describe(
            "Whether to insert a divider below the section in the table of contents",
          ).optional(),
          subtitle: z.unknown().describe("The subtitle of the section")
            .optional(),
        }).describe(
          "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
        ).optional(),
        singleViewGroup: z.object({
          displayType: z.unknown().describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
        }).describe(
          "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        text: z.object({
          content: z.unknown().describe("The text content to be displayed.")
            .optional(),
          format: z.unknown().describe("How the text content is formatted.")
            .optional(),
          style: z.unknown().describe(
            "Properties that determine how the title and content are styled",
          ).optional(),
        }).describe("A widget that displays textual content.").optional(),
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
        }).describe("A table that displays time series data.").optional(),
        title: z.string().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.object({
          dataSets: z.unknown().describe(
            "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
          ).optional(),
          treemapHierarchy: z.unknown().describe(
            "Required. Ordered labels representing the hierarchical treemap structure.",
          ).optional(),
        }).describe("A widget that displays hierarchical data as a treemap.")
          .optional(),
        visibilityCondition: z.object({
          templateVariableCondition: z.unknown().describe(
            "A condition whose evaluation is based on the value of a template variable.",
          ).optional(),
        }).describe(
          "Condition that determines whether the widget should be displayed.",
        ).optional(),
        xyChart: z.object({
          chartOptions: z.unknown().describe(
            "Options to control visual rendering of a chart.",
          ).optional(),
          dataSets: z.unknown().describe(
            "Required. The data displayed in this chart.",
          ).optional(),
          thresholds: z.unknown().describe(
            "Threshold lines drawn horizontally across the chart.",
          ).optional(),
          timeshiftDuration: z.unknown().describe(
            "The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type.",
          ).optional(),
          xAxis: z.unknown().describe("A chart axis.").optional(),
          y2Axis: z.unknown().describe("A chart axis.").optional(),
          yAxis: z.unknown().describe("A chart axis.").optional(),
        }).describe("A chart that displays data on a 2D (X and Y axes) plane.")
          .optional(),
      }).describe(
        "Widget contains a single dashboard component and configuration of how to present the component in the dashboard.",
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
    "A mosaic layout divides the available space into a grid of blocks, and overlays the grid with tiles. Unlike GridLayout, tiles may span multiple grid blocks and can be placed at arbitrary locations in the grid.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the dashboard.")
    .optional(),
  rowLayout: z.object({
    rows: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this row. The row weight is used to adjust the height of rows on the screen (relative to peers). Greater the weight, greater the height of the row on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe(
          "A chart that displays alert policy data.",
        ).optional(),
        blank: z.unknown().describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
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
          "A widget that displays a list of incidents",
        ).optional(),
        logsPanel: z.unknown().describe(
          "A widget that displays a stream of log.",
        ).optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie or a donut.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        text: z.unknown().describe("A widget that displays textual content.")
          .optional(),
        timeSeriesTable: z.unknown().describe(
          "A table that displays time series data.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays hierarchical data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Condition that determines whether the widget should be displayed.",
        ).optional(),
        xyChart: z.unknown().describe(
          "A chart that displays data on a 2D (X and Y axes) plane.",
        ).optional(),
      })).describe("The display widgets arranged horizontally in this row.")
        .optional(),
    })).describe("The rows of content to display.").optional(),
  }).describe(
    "A simplified layout that divides the available space into rows and arranges a set of widgets horizontally in each row.",
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
  }).describe("Dashboard-level configuration for annotations").optional(),
  columnLayout: z.object({
    columns: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this column. The column weight is used to adjust the width of columns on the screen (relative to peers). Greater the weight, greater the width of the column on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe(
          "A chart that displays alert policy data.",
        ).optional(),
        blank: z.unknown().describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
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
          "A widget that displays a list of incidents",
        ).optional(),
        logsPanel: z.unknown().describe(
          "A widget that displays a stream of log.",
        ).optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie or a donut.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        text: z.unknown().describe("A widget that displays textual content.")
          .optional(),
        timeSeriesTable: z.unknown().describe(
          "A table that displays time series data.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays hierarchical data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Condition that determines whether the widget should be displayed.",
        ).optional(),
        xyChart: z.unknown().describe(
          "A chart that displays data on a 2D (X and Y axes) plane.",
        ).optional(),
      })).describe("The display widgets arranged vertically in this column.")
        .optional(),
    })).describe("The columns of content to display.").optional(),
  }).describe(
    "A simplified layout that divides the available space into vertical columns and arranges a set of widgets vertically in each column.",
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
    }).describe("An array of strings").optional(),
    stringArrayValue: z.object({
      values: z.array(z.string()).describe("The values of the array")
        .optional(),
    }).describe("An array of strings").optional(),
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
        "Preview: A query that produces an aggregated response and supporting data. This is a preview feature and may be subject to change before final release.",
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
          'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
        ).optional(),
        filter: z.string().describe(
          "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
        ).optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive).The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe(
          "Describes a ranking-based time series filter. Each input time series is ranked with an aligner. The filter will allow up to num_time_series time series to pass through it, selecting them based on the relative ranking.For example, if ranking_method is METHOD_MEAN,direction is BOTTOM, and num_time_series is 3, then the 3 times series with the lowest mean values will pass through the filter.",
        ).optional(),
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
        }).describe(
          'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
        ).optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "A filter that ranks streams based on their statistical relation to other streams in a request. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe(
        "A filter that defines a subset of time series data that is displayed in a widget. Time series data is fetched using the ListTimeSeries (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) method.",
      ).optional(),
      timeSeriesFilterRatio: z.object({
        denominator: z.object({
          aggregation: z.unknown().describe(
            'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe(
          "Describes a query to build the numerator or denominator of a TimeSeriesFilterRatio.",
        ).optional(),
        numerator: z.object({
          aggregation: z.unknown().describe(
            'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
          ).optional(),
          filter: z.unknown().describe(
            "Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query.",
          ).optional(),
        }).describe(
          "Describes a query to build the numerator or denominator of a TimeSeriesFilterRatio.",
        ).optional(),
        pickTimeSeriesFilter: z.object({
          direction: z.unknown().describe(
            "How to use the ranking to select time series that pass through the filter.",
          ).optional(),
          interval: z.unknown().describe(
            "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive).The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
          ).optional(),
          numTimeSeries: z.unknown().describe(
            "How many time series to allow to pass through the filter.",
          ).optional(),
          rankingMethod: z.unknown().describe(
            "ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series.",
          ).optional(),
        }).describe(
          "Describes a ranking-based time series filter. Each input time series is ranked with an aligner. The filter will allow up to num_time_series time series to pass through it, selecting them based on the relative ranking.For example, if ranking_method is METHOD_MEAN,direction is BOTTOM, and num_time_series is 3, then the 3 times series with the lowest mean values will pass through the filter.",
        ).optional(),
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
        }).describe(
          'Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).',
        ).optional(),
        statisticalTimeSeriesFilter: z.object({
          numTimeSeries: z.unknown().describe("How many time series to output.")
            .optional(),
          rankingMethod: z.unknown().describe(
            "rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series.",
          ).optional(),
        }).describe(
          "A filter that ranks streams based on their statistical relation to other streams in a request. Note: This field is deprecated and completely ignored by the API.",
        ).optional(),
      }).describe(
        "A pair of time series filters that define a ratio computation. The output time series is the pair-wise division of each aligned element from the numerator and denominator time series.",
      ).optional(),
      timeSeriesQueryLanguage: z.string().describe(
        "A query used to fetch time series with MQL.",
      ).optional(),
      unitOverride: z.string().describe(
        "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
      ).optional(),
    }).describe(
      "TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.",
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
      }).describe("A chart that displays alert policy data.").optional(),
      blank: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
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
      }).describe("A widget that displays a list of incidents").optional(),
      logsPanel: z.object({
        filter: z.string().describe(
          "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
        ).optional(),
        resourceNames: z.array(z.unknown()).describe(
          "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
        ).optional(),
      }).describe("A widget that displays a stream of log.").optional(),
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
      }).describe("A widget that displays timeseries data as a pie or a donut.")
        .optional(),
      scorecard: z.object({
        blankView: z.object({}).describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
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
        }).describe(
          "A gauge chart shows where the current value sits within a pre-defined range. The upper and lower bounds should define the possible range of values for the scorecard's query (inclusive).",
        ).optional(),
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
        }).describe(
          "A sparkChart is a small chart suitable for inclusion in a table-cell or inline in text. This message contains the configuration for a sparkChart to show up on a Scorecard, showing recent trends of the scorecard's timeseries.",
        ).optional(),
        thresholds: z.array(z.unknown()).describe(
          "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
        ).optional(),
        timeSeriesQuery: z.object({
          opsAnalyticsQuery: z.unknown().describe(
            "Preview: A query that produces an aggregated response and supporting data. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          outputFullDuration: z.unknown().describe(
            "Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart",
          ).optional(),
          prometheusQuery: z.unknown().describe(
            "A query used to fetch time series with PromQL.",
          ).optional(),
          timeSeriesFilter: z.unknown().describe(
            "A filter that defines a subset of time series data that is displayed in a widget. Time series data is fetched using the ListTimeSeries (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) method.",
          ).optional(),
          timeSeriesFilterRatio: z.unknown().describe(
            "A pair of time series filters that define a ratio computation. The output time series is the pair-wise division of each aligned element from the numerator and denominator time series.",
          ).optional(),
          timeSeriesQueryLanguage: z.unknown().describe(
            "A query used to fetch time series with MQL.",
          ).optional(),
          unitOverride: z.unknown().describe(
            "The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor.",
          ).optional(),
        }).describe(
          "TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.",
        ).optional(),
      }).describe(
        "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
      ).optional(),
      sectionHeader: z.object({
        dividerBelow: z.boolean().describe(
          "Whether to insert a divider below the section in the table of contents",
        ).optional(),
        subtitle: z.string().describe("The subtitle of the section").optional(),
      }).describe(
        "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
      ).optional(),
      singleViewGroup: z.object({
        displayType: z.enum(["DISPLAY_TYPE_UNSPECIFIED", "DROPDOWN", "TAB"])
          .describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
      }).describe(
        "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
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
        }).describe(
          "Properties that determine how the title and content are styled",
        ).optional(),
      }).describe("A widget that displays textual content.").optional(),
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
      }).describe("A table that displays time series data.").optional(),
      title: z.string().describe("Optional. The title of the widget.")
        .optional(),
      treemap: z.object({
        dataSets: z.array(z.unknown()).describe(
          "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
        ).optional(),
        treemapHierarchy: z.array(z.unknown()).describe(
          "Required. Ordered labels representing the hierarchical treemap structure.",
        ).optional(),
      }).describe("A widget that displays hierarchical data as a treemap.")
        .optional(),
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
        "Condition that determines whether the widget should be displayed.",
      ).optional(),
      xyChart: z.object({
        chartOptions: z.object({
          displayHorizontal: z.unknown().describe(
            "Preview: Configures whether the charted values are shown on the horizontal or vertical axis. By default, values are represented the vertical axis. This is a preview feature and may be subject to change before final release.",
          ).optional(),
          mode: z.unknown().describe("The chart mode.").optional(),
        }).describe("Options to control visual rendering of a chart.")
          .optional(),
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
        }).describe("A chart axis.").optional(),
        y2Axis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("A chart axis.").optional(),
        yAxis: z.object({
          label: z.unknown().describe("The label of the axis.").optional(),
          scale: z.unknown().describe(
            "The axis scale. By default, a linear scale is used.",
          ).optional(),
        }).describe("A chart axis.").optional(),
      }).describe("A chart that displays data on a 2D (X and Y axes) plane.")
        .optional(),
    })).describe(
      "The informational elements that are arranged into the columns row-first.",
    ).optional(),
  }).describe(
    "A basic layout divides the available space into vertical columns of equal width and arranges a list of widgets using a row-first strategy.",
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
        }).describe("A chart that displays alert policy data.").optional(),
        blank: z.object({}).describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
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
        }).describe("A widget that displays a list of incidents").optional(),
        logsPanel: z.object({
          filter: z.unknown().describe(
            "A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries.",
          ).optional(),
          resourceNames: z.unknown().describe(
            "The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project.",
          ).optional(),
        }).describe("A widget that displays a stream of log.").optional(),
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
        }).describe(
          "A widget that displays timeseries data as a pie or a donut.",
        ).optional(),
        scorecard: z.object({
          blankView: z.unknown().describe(
            "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
          ).optional(),
          breakdowns: z.unknown().describe(
            "Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region.",
          ).optional(),
          dimensions: z.unknown().describe(
            "Optional. A dimension is a structured label, class, or category for a set of measurements in your data.",
          ).optional(),
          gaugeView: z.unknown().describe(
            "A gauge chart shows where the current value sits within a pre-defined range. The upper and lower bounds should define the possible range of values for the scorecard's query (inclusive).",
          ).optional(),
          measures: z.unknown().describe(
            "Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc.",
          ).optional(),
          sparkChartView: z.unknown().describe(
            "A sparkChart is a small chart suitable for inclusion in a table-cell or inline in text. This message contains the configuration for a sparkChart to show up on a Scorecard, showing recent trends of the scorecard's timeseries.",
          ).optional(),
          thresholds: z.unknown().describe(
            "The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state.",
          ).optional(),
          timeSeriesQuery: z.unknown().describe(
            "TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.",
          ).optional(),
        }).describe(
          "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
        ).optional(),
        sectionHeader: z.object({
          dividerBelow: z.unknown().describe(
            "Whether to insert a divider below the section in the table of contents",
          ).optional(),
          subtitle: z.unknown().describe("The subtitle of the section")
            .optional(),
        }).describe(
          "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
        ).optional(),
        singleViewGroup: z.object({
          displayType: z.unknown().describe(
            "Optional. Determines how the widget selector will be displayed.",
          ).optional(),
        }).describe(
          "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        text: z.object({
          content: z.unknown().describe("The text content to be displayed.")
            .optional(),
          format: z.unknown().describe("How the text content is formatted.")
            .optional(),
          style: z.unknown().describe(
            "Properties that determine how the title and content are styled",
          ).optional(),
        }).describe("A widget that displays textual content.").optional(),
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
        }).describe("A table that displays time series data.").optional(),
        title: z.string().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.object({
          dataSets: z.unknown().describe(
            "Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment.",
          ).optional(),
          treemapHierarchy: z.unknown().describe(
            "Required. Ordered labels representing the hierarchical treemap structure.",
          ).optional(),
        }).describe("A widget that displays hierarchical data as a treemap.")
          .optional(),
        visibilityCondition: z.object({
          templateVariableCondition: z.unknown().describe(
            "A condition whose evaluation is based on the value of a template variable.",
          ).optional(),
        }).describe(
          "Condition that determines whether the widget should be displayed.",
        ).optional(),
        xyChart: z.object({
          chartOptions: z.unknown().describe(
            "Options to control visual rendering of a chart.",
          ).optional(),
          dataSets: z.unknown().describe(
            "Required. The data displayed in this chart.",
          ).optional(),
          thresholds: z.unknown().describe(
            "Threshold lines drawn horizontally across the chart.",
          ).optional(),
          timeshiftDuration: z.unknown().describe(
            "The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type.",
          ).optional(),
          xAxis: z.unknown().describe("A chart axis.").optional(),
          y2Axis: z.unknown().describe("A chart axis.").optional(),
          yAxis: z.unknown().describe("A chart axis.").optional(),
        }).describe("A chart that displays data on a 2D (X and Y axes) plane.")
          .optional(),
      }).describe(
        "Widget contains a single dashboard component and configuration of how to present the component in the dashboard.",
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
    "A mosaic layout divides the available space into a grid of blocks, and overlays the grid with tiles. Unlike GridLayout, tiles may span multiple grid blocks and can be placed at arbitrary locations in the grid.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the dashboard.")
    .optional(),
  rowLayout: z.object({
    rows: z.array(z.object({
      weight: z.string().describe(
        "The relative weight of this row. The row weight is used to adjust the height of rows on the screen (relative to peers). Greater the weight, greater the height of the row on the screen. If omitted, a value of 1 is used while rendering.",
      ).optional(),
      widgets: z.array(z.object({
        alertChart: z.unknown().describe(
          "A chart that displays alert policy data.",
        ).optional(),
        blank: z.unknown().describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
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
          "A widget that displays a list of incidents",
        ).optional(),
        logsPanel: z.unknown().describe(
          "A widget that displays a stream of log.",
        ).optional(),
        pieChart: z.unknown().describe(
          "A widget that displays timeseries data as a pie or a donut.",
        ).optional(),
        scorecard: z.unknown().describe(
          "A widget showing the latest value of a metric, and how this value relates to one or more thresholds.",
        ).optional(),
        sectionHeader: z.unknown().describe(
          "A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.",
        ).optional(),
        singleViewGroup: z.unknown().describe(
          "A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.",
        ).optional(),
        text: z.unknown().describe("A widget that displays textual content.")
          .optional(),
        timeSeriesTable: z.unknown().describe(
          "A table that displays time series data.",
        ).optional(),
        title: z.unknown().describe("Optional. The title of the widget.")
          .optional(),
        treemap: z.unknown().describe(
          "A widget that displays hierarchical data as a treemap.",
        ).optional(),
        visibilityCondition: z.unknown().describe(
          "Condition that determines whether the widget should be displayed.",
        ).optional(),
        xyChart: z.unknown().describe(
          "A chart that displays data on a 2D (X and Y axes) plane.",
        ).optional(),
      })).describe("The display widgets arranged horizontally in this row.")
        .optional(),
    })).describe("The rows of content to display.").optional(),
  }).describe(
    "A simplified layout that divides the available space into rows and arranges a set of widgets horizontally in each row.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Monitoring Dashboards. Registered at `@swamp/gcp/monitoring/dashboards`. */
export const model = {
  type: "@swamp/gcp/monitoring/dashboards",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
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
      description: "Get a dashboards",
      arguments: z.object({
        identifier: z.string().describe("The name of the dashboards"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update dashboards attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
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
      description: "Delete the dashboards",
      arguments: z.object({
        identifier: z.string().describe("The name of the dashboards"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync dashboards state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          BASE_URL,
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
