// Auto-generated extension model for @swamp/gcp/monitoring/alertpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring AlertPolicies.
 *
 * A description of the conditions under which some aspect of your system is considered to be "unhealthy" and the ways to notify people or services about this state. For an overview of alerting policies, see Introduction to Alerting (https://cloud.google.com/monitoring/alerts/).
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

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.projects.alertPolicies.get",
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
  "id": "monitoring.projects.alertPolicies.create",
  "path": "v3/{+name}/alertPolicies",
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

const PATCH_CONFIG = {
  "id": "monitoring.projects.alertPolicies.patch",
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
  "id": "monitoring.projects.alertPolicies.delete",
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
  "id": "monitoring.projects.alertPolicies.list",
  "path": "v3/{+name}/alertPolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
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
  },
} as const;

const GlobalArgsSchema = z.object({
  alertStrategy: z.object({
    autoClose: z.string().describe(
      "If an alerting policy that was active has no data for this long, any open incidents will close",
    ).optional(),
    notificationChannelStrategy: z.array(z.object({
      notificationChannelNames: z.array(z.string()).describe(
        "The full REST resource name for the notification channels that these settings apply to. Each of these correspond to the name field in one of the NotificationChannel objects referenced in the notification_channels field of this AlertPolicy. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]",
      ).optional(),
      renotifyInterval: z.string().describe(
        "The frequency at which to send reminder notifications for open incidents. The value must be between 30 minutes and 24 hours.",
      ).optional(),
    })).describe(
      "Control how notifications will be sent out, on a per-channel basis.",
    ).optional(),
    notificationPrompts: z.array(
      z.enum(["NOTIFICATION_PROMPT_UNSPECIFIED", "OPENED", "CLOSED"]),
    ).describe(
      "For log-based alert policies, the notification prompts is always OPENED. For non log-based alert policies, the notification prompts can be OPENED or OPENED, CLOSED.",
    ).optional(),
    notificationRateLimit: z.object({
      period: z.string().describe("Not more than one notification per period.")
        .optional(),
    }).describe(
      "Control over the rate of notifications sent to this alerting policy's notification channels.",
    ).optional(),
  }).describe(
    "Control over how the notification channels in notification_channels are notified when this alert fires.",
  ).optional(),
  combiner: z.enum([
    "COMBINE_UNSPECIFIED",
    "AND",
    "OR",
    "AND_WITH_MATCHING_RESOURCE",
  ]).describe(
    "How to combine the results of multiple conditions to determine if an incident should be opened. If condition_time_series_query_language is present, this must be COMBINE_UNSPECIFIED.",
  ).optional(),
  conditions: z.array(z.object({
    conditionAbsent: z.object({
      aggregations: z.array(z.object({
        alignmentPeriod: z.unknown().describe(
          "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies.",
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
      })).describe(
        "Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field.",
      ).optional(),
      duration: z.string().describe(
        "Required. The amount of time that a time series must fail to report new data to be considered failing. The minimum value of this field is 120 seconds. Larger values that are a multiple of a minute--for example, 240 or 300 seconds--are supported. If an invalid value is given, an error will be returned.",
      ).optional(),
      filter: z.string().describe(
        "Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length.",
      ).optional(),
      trigger: z.object({
        count: z.number().int().describe(
          "The absolute number of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
        percent: z.number().describe(
          "The percentage of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
      }).describe(
        "Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.",
      ).optional(),
    }).describe(
      "A condition type that checks that monitored resources are reporting data. The configuration defines a metric and a set of monitored resources. The predicate is considered in violation when a time series for the specified metric of a monitored resource does not include any data in the specified duration.",
    ).optional(),
    conditionMatchedLog: z.object({
      filter: z.string().describe(
        "Required. A logs-based filter. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries) for how this filter should be constructed.",
      ).optional(),
      labelExtractors: z.record(z.string(), z.string()).describe(
        "Optional. A map from a label key to an extractor expression, which is used to extract the value for this label key. Each entry in this map is a specification for how data should be extracted from log entries that match filter. Each combination of extracted values is treated as a separate rule for the purposes of triggering notifications. Label keys and corresponding values can be used in notifications generated by this condition.Please see the documentation on logs-based metric valueExtractors (https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.FIELDS.value_extractor) for syntax and examples.",
      ).optional(),
    }).describe(
      "A condition type that checks whether a log message in the scoping project (https://cloud.google.com/monitoring/api/v3#project_name) satisfies the given filter. Logs from other projects in the metrics scope are not evaluated.",
    ).optional(),
    conditionMonitoringQueryLanguage: z.object({
      duration: z.string().describe(
        "Optional. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly. The default value is zero.",
      ).optional(),
      evaluationMissingData: z.enum([
        "EVALUATION_MISSING_DATA_UNSPECIFIED",
        "EVALUATION_MISSING_DATA_INACTIVE",
        "EVALUATION_MISSING_DATA_ACTIVE",
        "EVALUATION_MISSING_DATA_NO_OP",
      ]).describe(
        "A condition control that determines how metric-threshold conditions are evaluated when data stops arriving.",
      ).optional(),
      query: z.string().describe(
        "Monitoring Query Language (https://cloud.google.com/monitoring/mql) query that outputs a boolean stream.",
      ).optional(),
      trigger: z.object({
        count: z.number().int().describe(
          "The absolute number of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
        percent: z.number().describe(
          "The percentage of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
      }).describe(
        "Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.",
      ).optional(),
    }).describe(
      "A condition type that allows alerting policies to be defined using Monitoring Query Language (https://cloud.google.com/monitoring/mql).",
    ).optional(),
    conditionPrometheusQueryLanguage: z.object({
      alertRule: z.string().describe(
        "Optional. The alerting rule name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must be a valid Prometheus label name (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). This field may not exceed 2048 Unicode characters in length.",
      ).optional(),
      disableMetricValidation: z.boolean().describe(
        "Optional. Whether to disable metric existence validation for this condition.This allows alerting policies to be defined on metrics that do not yet exist, improving advanced customer workflows such as configuring alerting policies using Terraform.Users with the monitoring.alertPolicyViewer role are able to see the name of the non-existent metric in the alerting policy condition.",
      ).optional(),
      duration: z.string().describe(
        'Optional. Alerts are considered firing once their PromQL expression was evaluated to be "true" for this long. Alerts whose PromQL expression was not evaluated to be "true" for long enough are considered pending. Must be a non-negative duration or missing. This field is optional. Its default value is zero.',
      ).optional(),
      evaluationInterval: z.string().describe(
        "Optional. How often this rule should be evaluated. Must be a positive multiple of 30 seconds or missing. This field is optional. Its default value is 30 seconds. If this PrometheusQueryLanguageCondition was generated from a Prometheus alerting rule, then this value should be taken from the enclosing rule group.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        'Optional. Labels to add to or overwrite in the PromQL query result. Label names must be valid (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). Label values can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). The only available variable names are the names of the labels in the PromQL result, including "__name__" and "value". "labels" may be empty.',
      ).optional(),
      query: z.string().describe(
        "Required. The PromQL expression to evaluate. Every evaluation cycle this expression is evaluated at the current time, and all resultant time series become pending/firing alerts. This field must not be empty.",
      ).optional(),
      ruleGroup: z.string().describe(
        "Optional. The rule group name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must contain a valid UTF-8 string. This field may not exceed 2048 Unicode characters in length.",
      ).optional(),
    }).describe(
      "A condition type that allows alerting policies to be defined using Prometheus Query Language (PromQL) (https://prometheus.io/docs/prometheus/latest/querying/basics/).The PrometheusQueryLanguageCondition message contains information from a Prometheus alerting rule and its associated rule group.A Prometheus alerting rule is described here (https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/). The semantics of a Prometheus alerting rule is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#rule).A Prometheus rule group is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/). The semantics of a Prometheus rule group is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#rule_group).Because Cloud Alerting has no representation of a Prometheus rule group resource, we must embed the information of the parent rule group inside each of the conditions that refer to it. We must also update the contents of all Prometheus alerts in case the information of their rule group changes.The PrometheusQueryLanguageCondition protocol buffer combines the information of the corresponding rule group and alerting rule. The structure of the PrometheusQueryLanguageCondition protocol buffer does NOT mimic the structure of the Prometheus rule group and alerting rule YAML declarations. The PrometheusQueryLanguageCondition protocol buffer may change in the future to support future rule group and/or alerting rule features. There are no new such features at the present time (2023-06-26).",
    ).optional(),
    conditionSql: z.object({
      booleanTest: z.object({
        column: z.string().describe(
          "Required. The name of the column containing the boolean value. If the value in a row is NULL, that row is ignored.",
        ).optional(),
      }).describe(
        "A test that uses an alerting result in a boolean column produced by the SQL query.",
      ).optional(),
      daily: z.object({
        executionTime: z.object({
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
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and google.protobuf.Timestamp.",
        ).optional(),
        periodicity: z.number().int().describe(
          "Required. The number of days between runs. Must be greater than or equal to 1 day and less than or equal to 31 days.",
        ).optional(),
      }).describe("Used to schedule the query to run every so many days.")
        .optional(),
      hourly: z.object({
        minuteOffset: z.number().int().describe(
          "Optional. The number of minutes after the hour (in UTC) to run the query. Must be greater than or equal to 0 minutes and less than or equal to 59 minutes. If left unspecified, then an arbitrary offset is used.",
        ).optional(),
        periodicity: z.number().int().describe(
          "Required. The number of hours between runs. Must be greater than or equal to 1 hour and less than or equal to 48 hours.",
        ).optional(),
      }).describe("Used to schedule the query to run every so many hours.")
        .optional(),
      minutes: z.object({
        periodicity: z.number().int().describe(
          "Required. Number of minutes between runs. The interval must be greater than or equal to 5 minutes and less than or equal to 1440 minutes.",
        ).optional(),
      }).describe("Used to schedule the query to run every so many minutes.")
        .optional(),
      query: z.string().describe(
        "Required. The Log Analytics SQL query to run, as a string. The query must conform to the required shape. Specifically, the query must not try to filter the input by time. A filter will automatically be applied to filter the input so that the query receives all rows received since the last time the query was run.For example, the following query extracts all log entries containing an HTTP request: SELECT timestamp, log_name, severity, http_request, resource, labels FROM my-project.global._Default._AllLogs WHERE http_request IS NOT NULL",
      ).optional(),
      rowCountTest: z.object({
        comparison: z.enum([
          "COMPARISON_UNSPECIFIED",
          "COMPARISON_GT",
          "COMPARISON_GE",
          "COMPARISON_LT",
          "COMPARISON_LE",
          "COMPARISON_EQ",
          "COMPARISON_NE",
        ]).describe(
          "Required. The comparison to apply between the number of rows returned by the query and the threshold.",
        ).optional(),
        threshold: z.string().describe(
          "Required. The value against which to compare the row count.",
        ).optional(),
      }).describe(
        "A test that checks if the number of rows in the result set violates some threshold.",
      ).optional(),
    }).describe(
      "A condition that allows alerting policies to be defined using GoogleSQL. SQL conditions examine a sliding window of logs using GoogleSQL. Alert policies with SQL conditions may incur additional billing.",
    ).optional(),
    conditionThreshold: z.object({
      aggregations: z.array(z.object({
        alignmentPeriod: z.unknown().describe(
          "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies.",
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
      })).describe(
        "Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field.",
      ).optional(),
      comparison: z.enum([
        "COMPARISON_UNSPECIFIED",
        "COMPARISON_GT",
        "COMPARISON_GE",
        "COMPARISON_LT",
        "COMPARISON_LE",
        "COMPARISON_EQ",
        "COMPARISON_NE",
      ]).describe(
        "The comparison to apply between the time series (indicated by filter and aggregation) and the threshold (indicated by threshold_value). The comparison is applied on each time series, with the time series on the left-hand side and the threshold on the right-hand side.Only COMPARISON_LT and COMPARISON_GT are supported currently.",
      ).optional(),
      denominatorAggregations: z.array(z.object({
        alignmentPeriod: z.unknown().describe(
          "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies.",
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
      })).describe(
        "Specifies the alignment of data points in individual time series selected by denominatorFilter as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources).When computing ratios, the aggregations and denominator_aggregations fields must use the same alignment period and produce time series that have the same periodicity and labels.",
      ).optional(),
      denominatorFilter: z.string().describe(
        "A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies a time series that should be used as the denominator of a ratio that will be compared with the threshold. If a denominator_filter is specified, the time series specified by the filter field will be used as the numerator.The filter must specify the metric type and optionally may contain restrictions on resource type, resource labels, and metric labels. This field may not exceed 2048 Unicode characters in length.",
      ).optional(),
      duration: z.string().describe(
        "Required. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly.",
      ).optional(),
      evaluationMissingData: z.enum([
        "EVALUATION_MISSING_DATA_UNSPECIFIED",
        "EVALUATION_MISSING_DATA_INACTIVE",
        "EVALUATION_MISSING_DATA_ACTIVE",
        "EVALUATION_MISSING_DATA_NO_OP",
      ]).describe(
        "A condition control that determines how metric-threshold conditions are evaluated when data stops arriving. To use this control, the value of the duration field must be greater than or equal to 60 seconds.",
      ).optional(),
      filter: z.string().describe(
        "Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length.",
      ).optional(),
      forecastOptions: z.object({
        forecastHorizon: z.string().describe(
          "Required. The length of time into the future to forecast whether a time series will violate the threshold. If the predicted value is found to violate the threshold, and the violation is observed in all forecasts made for the configured duration, then the time series is considered to be failing. The forecast horizon can range from 1 hour to 60 hours.",
        ).optional(),
      }).describe(
        "Options used when forecasting the time series and testing the predicted value against the threshold.",
      ).optional(),
      thresholdValue: z.number().describe(
        "A value against which to compare the time series.",
      ).optional(),
      trigger: z.object({
        count: z.number().int().describe(
          "The absolute number of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
        percent: z.number().describe(
          "The percentage of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
      }).describe(
        "Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.",
      ).optional(),
    }).describe(
      "A condition type that compares a collection of time series against a threshold.",
    ).optional(),
    displayName: z.string().describe(
      "A short name or phrase used to identify the condition in dashboards, notifications, and incidents. To avoid confusion, don't use the same display name for multiple conditions in the same policy.",
    ).optional(),
    name: z.string().describe(
      "Required if the condition exists. The unique resource name for this condition. Its format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID]/conditions/[CONDITION_ID] [CONDITION_ID] is assigned by Cloud Monitoring when the condition is created as part of a new or updated alerting policy.When calling the alertPolicies.create method, do not include the name field in the conditions of the requested alerting policy. Cloud Monitoring creates the condition identifiers and includes them in the new policy.When calling the alertPolicies.update method to update a policy, including a condition name causes the existing condition to be updated. Conditions without names are added to the updated policy. Existing conditions are deleted if they are not updated.Best practice is to preserve [CONDITION_ID] if you make only small changes, such as those to condition thresholds, durations, or trigger values. Otherwise, treat the change as a new condition and let the existing condition be deleted.",
    ).optional(),
  })).describe(
    "A list of conditions for the policy. The conditions are combined by AND or OR according to the combiner field. If the combined conditions evaluate to true, then an incident is created. A policy can have from one to six conditions. If condition_time_series_query_language is present, it must be the only condition. If condition_monitoring_query_language is present, it must be the only condition.",
  ).optional(),
  creationRecord: z.object({
    mutateTime: z.string().describe("When the change occurred.").optional(),
    mutatedBy: z.string().describe(
      "The email address of the user making the change.",
    ).optional(),
  }).describe("Describes a change made to a configuration.").optional(),
  displayName: z.string().describe(
    'A short name or phrase used to identify the policy in dashboards, notifications, and incidents. To avoid confusion, don\'t use the same display name for multiple policies in the same project. The name is limited to 512 Unicode characters.The convention for the display_name of a PrometheusQueryLanguageCondition is "{rule group name}/{alert name}", where the {rule group name} and {alert name} should be taken from the corresponding Prometheus configuration file. This convention is not enforced. In any case the display_name is not a unique key of the AlertPolicy.',
  ).optional(),
  documentation: z.object({
    content: z.string().describe(
      "The body of the documentation, interpreted according to mime_type. The content may not exceed 8,192 Unicode characters and may not exceed more than 10,240 bytes when encoded in UTF-8 format, whichever is smaller. This text can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars).",
    ).optional(),
    links: z.array(z.object({
      displayName: z.string().describe(
        'A short display name for the link. The display name must not be empty or exceed 63 characters. Example: "playbook".',
      ).optional(),
      url: z.string().describe(
        'The url of a webpage. A url can be templatized by using variables in the path or the query parameters. The total length of a URL should not exceed 2083 characters before and after variable expansion. Example: "https://my_domain.com/playbook?name=${resource.name}"',
      ).optional(),
    })).describe(
      "Optional. Links to content such as playbooks, repositories, and other resources. This field can contain up to 3 entries.",
    ).optional(),
    mimeType: z.string().describe(
      'The format of the content field. Presently, only the value "text/markdown" is supported. See Markdown (https://en.wikipedia.org/wiki/Markdown) for more information.',
    ).optional(),
    subject: z.string().describe(
      "Optional. The subject line of the notification. The subject line may not exceed 10,240 bytes. In notifications generated by this policy, the contents of the subject line after variable expansion will be truncated to 255 bytes or shorter at the latest UTF-8 character boundary. The 255-byte limit is recommended by this thread (https://stackoverflow.com/questions/1592291/what-is-the-email-subject-length-limit). It is both the limit imposed by some third-party ticketing products and it is common to define textual fields in databases as VARCHAR(255).The contents of the subject line can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). If this field is missing or empty, a default subject line will be generated.",
    ).optional(),
  }).describe(
    "Documentation that is included in the notifications and incidents pertaining to this policy.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether or not the policy is enabled. On write, the default interpretation if unset is that the policy is enabled. On read, clients should not make any assumption about the state if it has not been populated. The field should always be populated on List and Get operations, unless a field projection has been specified that strips it out.",
  ).optional(),
  mutationRecord: z.object({
    mutateTime: z.string().describe("When the change occurred.").optional(),
    mutatedBy: z.string().describe(
      "The email address of the user making the change.",
    ).optional(),
  }).describe("Describes a change made to a configuration.").optional(),
  name: z.string().describe(
    "Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request.",
  ).optional(),
  notificationChannels: z.array(z.string()).describe(
    "Identifies the notification channels to which notifications should be sent when incidents are opened or closed or when new violations occur on an already opened incident. Each element of this array corresponds to the name field in each of the NotificationChannel objects that are returned from the ListNotificationChannels method. The format of the entries in this field is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]",
  ).optional(),
  severity: z.enum(["SEVERITY_UNSPECIFIED", "CRITICAL", "ERROR", "WARNING"])
    .describe(
      "Optional. The severity of an alerting policy indicates how important incidents generated by that policy are. The severity level will be displayed on the Incident detail page and in notifications.",
    ).optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "User-supplied key/value data to be used for organizing and identifying the AlertPolicy objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter.Note that Prometheus {alert name} is a valid Prometheus label names (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels), whereas Prometheus {rule group} is an unrestricted UTF-8 string. This means that they cannot be stored as-is in user labels, because they may contain characters that are not allowed in user-label values.",
  ).optional(),
  validity: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each Status message contains three pieces of data: error code, error message, and error details.You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).",
  ).optional(),
});

const StateSchema = z.object({
  alertStrategy: z.object({
    autoClose: z.string(),
    notificationChannelStrategy: z.array(z.object({
      notificationChannelNames: z.array(z.string()),
      renotifyInterval: z.string(),
    })),
    notificationPrompts: z.array(z.string()),
    notificationRateLimit: z.object({
      period: z.string(),
    }),
  }).optional(),
  combiner: z.string().optional(),
  conditions: z.array(z.object({
    conditionAbsent: z.object({
      aggregations: z.array(z.object({
        alignmentPeriod: z.unknown(),
        crossSeriesReducer: z.unknown(),
        groupByFields: z.unknown(),
        perSeriesAligner: z.unknown(),
      })),
      duration: z.string(),
      filter: z.string(),
      trigger: z.object({
        count: z.number(),
        percent: z.number(),
      }),
    }),
    conditionMatchedLog: z.object({
      filter: z.string(),
      labelExtractors: z.record(z.string(), z.unknown()),
    }),
    conditionMonitoringQueryLanguage: z.object({
      duration: z.string(),
      evaluationMissingData: z.string(),
      query: z.string(),
      trigger: z.object({
        count: z.number(),
        percent: z.number(),
      }),
    }),
    conditionPrometheusQueryLanguage: z.object({
      alertRule: z.string(),
      disableMetricValidation: z.boolean(),
      duration: z.string(),
      evaluationInterval: z.string(),
      labels: z.record(z.string(), z.unknown()),
      query: z.string(),
      ruleGroup: z.string(),
    }),
    conditionSql: z.object({
      booleanTest: z.object({
        column: z.string(),
      }),
      daily: z.object({
        executionTime: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        periodicity: z.number(),
      }),
      hourly: z.object({
        minuteOffset: z.number(),
        periodicity: z.number(),
      }),
      minutes: z.object({
        periodicity: z.number(),
      }),
      query: z.string(),
      rowCountTest: z.object({
        comparison: z.string(),
        threshold: z.string(),
      }),
    }),
    conditionThreshold: z.object({
      aggregations: z.array(z.object({
        alignmentPeriod: z.unknown(),
        crossSeriesReducer: z.unknown(),
        groupByFields: z.unknown(),
        perSeriesAligner: z.unknown(),
      })),
      comparison: z.string(),
      denominatorAggregations: z.array(z.object({
        alignmentPeriod: z.unknown(),
        crossSeriesReducer: z.unknown(),
        groupByFields: z.unknown(),
        perSeriesAligner: z.unknown(),
      })),
      denominatorFilter: z.string(),
      duration: z.string(),
      evaluationMissingData: z.string(),
      filter: z.string(),
      forecastOptions: z.object({
        forecastHorizon: z.string(),
      }),
      thresholdValue: z.number(),
      trigger: z.object({
        count: z.number(),
        percent: z.number(),
      }),
    }),
    displayName: z.string(),
    name: z.string(),
  })).optional(),
  creationRecord: z.object({
    mutateTime: z.string(),
    mutatedBy: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  documentation: z.object({
    content: z.string(),
    links: z.array(z.object({
      displayName: z.string(),
      url: z.string(),
    })),
    mimeType: z.string(),
    subject: z.string(),
  }).optional(),
  enabled: z.boolean().optional(),
  mutationRecord: z.object({
    mutateTime: z.string(),
    mutatedBy: z.string(),
  }).optional(),
  name: z.string(),
  notificationChannels: z.array(z.string()).optional(),
  severity: z.string().optional(),
  userLabels: z.record(z.string(), z.unknown()).optional(),
  validity: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alertStrategy: z.object({
    autoClose: z.string().describe(
      "If an alerting policy that was active has no data for this long, any open incidents will close",
    ).optional(),
    notificationChannelStrategy: z.array(z.object({
      notificationChannelNames: z.array(z.string()).describe(
        "The full REST resource name for the notification channels that these settings apply to. Each of these correspond to the name field in one of the NotificationChannel objects referenced in the notification_channels field of this AlertPolicy. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]",
      ).optional(),
      renotifyInterval: z.string().describe(
        "The frequency at which to send reminder notifications for open incidents. The value must be between 30 minutes and 24 hours.",
      ).optional(),
    })).describe(
      "Control how notifications will be sent out, on a per-channel basis.",
    ).optional(),
    notificationPrompts: z.array(
      z.enum(["NOTIFICATION_PROMPT_UNSPECIFIED", "OPENED", "CLOSED"]),
    ).describe(
      "For log-based alert policies, the notification prompts is always OPENED. For non log-based alert policies, the notification prompts can be OPENED or OPENED, CLOSED.",
    ).optional(),
    notificationRateLimit: z.object({
      period: z.string().describe("Not more than one notification per period.")
        .optional(),
    }).describe(
      "Control over the rate of notifications sent to this alerting policy's notification channels.",
    ).optional(),
  }).describe(
    "Control over how the notification channels in notification_channels are notified when this alert fires.",
  ).optional(),
  combiner: z.enum([
    "COMBINE_UNSPECIFIED",
    "AND",
    "OR",
    "AND_WITH_MATCHING_RESOURCE",
  ]).describe(
    "How to combine the results of multiple conditions to determine if an incident should be opened. If condition_time_series_query_language is present, this must be COMBINE_UNSPECIFIED.",
  ).optional(),
  conditions: z.array(z.object({
    conditionAbsent: z.object({
      aggregations: z.array(z.object({
        alignmentPeriod: z.unknown().describe(
          "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies.",
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
      })).describe(
        "Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field.",
      ).optional(),
      duration: z.string().describe(
        "Required. The amount of time that a time series must fail to report new data to be considered failing. The minimum value of this field is 120 seconds. Larger values that are a multiple of a minute--for example, 240 or 300 seconds--are supported. If an invalid value is given, an error will be returned.",
      ).optional(),
      filter: z.string().describe(
        "Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length.",
      ).optional(),
      trigger: z.object({
        count: z.number().int().describe(
          "The absolute number of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
        percent: z.number().describe(
          "The percentage of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
      }).describe(
        "Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.",
      ).optional(),
    }).describe(
      "A condition type that checks that monitored resources are reporting data. The configuration defines a metric and a set of monitored resources. The predicate is considered in violation when a time series for the specified metric of a monitored resource does not include any data in the specified duration.",
    ).optional(),
    conditionMatchedLog: z.object({
      filter: z.string().describe(
        "Required. A logs-based filter. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries) for how this filter should be constructed.",
      ).optional(),
      labelExtractors: z.record(z.string(), z.string()).describe(
        "Optional. A map from a label key to an extractor expression, which is used to extract the value for this label key. Each entry in this map is a specification for how data should be extracted from log entries that match filter. Each combination of extracted values is treated as a separate rule for the purposes of triggering notifications. Label keys and corresponding values can be used in notifications generated by this condition.Please see the documentation on logs-based metric valueExtractors (https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.FIELDS.value_extractor) for syntax and examples.",
      ).optional(),
    }).describe(
      "A condition type that checks whether a log message in the scoping project (https://cloud.google.com/monitoring/api/v3#project_name) satisfies the given filter. Logs from other projects in the metrics scope are not evaluated.",
    ).optional(),
    conditionMonitoringQueryLanguage: z.object({
      duration: z.string().describe(
        "Optional. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly. The default value is zero.",
      ).optional(),
      evaluationMissingData: z.enum([
        "EVALUATION_MISSING_DATA_UNSPECIFIED",
        "EVALUATION_MISSING_DATA_INACTIVE",
        "EVALUATION_MISSING_DATA_ACTIVE",
        "EVALUATION_MISSING_DATA_NO_OP",
      ]).describe(
        "A condition control that determines how metric-threshold conditions are evaluated when data stops arriving.",
      ).optional(),
      query: z.string().describe(
        "Monitoring Query Language (https://cloud.google.com/monitoring/mql) query that outputs a boolean stream.",
      ).optional(),
      trigger: z.object({
        count: z.number().int().describe(
          "The absolute number of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
        percent: z.number().describe(
          "The percentage of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
      }).describe(
        "Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.",
      ).optional(),
    }).describe(
      "A condition type that allows alerting policies to be defined using Monitoring Query Language (https://cloud.google.com/monitoring/mql).",
    ).optional(),
    conditionPrometheusQueryLanguage: z.object({
      alertRule: z.string().describe(
        "Optional. The alerting rule name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must be a valid Prometheus label name (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). This field may not exceed 2048 Unicode characters in length.",
      ).optional(),
      disableMetricValidation: z.boolean().describe(
        "Optional. Whether to disable metric existence validation for this condition.This allows alerting policies to be defined on metrics that do not yet exist, improving advanced customer workflows such as configuring alerting policies using Terraform.Users with the monitoring.alertPolicyViewer role are able to see the name of the non-existent metric in the alerting policy condition.",
      ).optional(),
      duration: z.string().describe(
        'Optional. Alerts are considered firing once their PromQL expression was evaluated to be "true" for this long. Alerts whose PromQL expression was not evaluated to be "true" for long enough are considered pending. Must be a non-negative duration or missing. This field is optional. Its default value is zero.',
      ).optional(),
      evaluationInterval: z.string().describe(
        "Optional. How often this rule should be evaluated. Must be a positive multiple of 30 seconds or missing. This field is optional. Its default value is 30 seconds. If this PrometheusQueryLanguageCondition was generated from a Prometheus alerting rule, then this value should be taken from the enclosing rule group.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        'Optional. Labels to add to or overwrite in the PromQL query result. Label names must be valid (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). Label values can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). The only available variable names are the names of the labels in the PromQL result, including "__name__" and "value". "labels" may be empty.',
      ).optional(),
      query: z.string().describe(
        "Required. The PromQL expression to evaluate. Every evaluation cycle this expression is evaluated at the current time, and all resultant time series become pending/firing alerts. This field must not be empty.",
      ).optional(),
      ruleGroup: z.string().describe(
        "Optional. The rule group name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must contain a valid UTF-8 string. This field may not exceed 2048 Unicode characters in length.",
      ).optional(),
    }).describe(
      "A condition type that allows alerting policies to be defined using Prometheus Query Language (PromQL) (https://prometheus.io/docs/prometheus/latest/querying/basics/).The PrometheusQueryLanguageCondition message contains information from a Prometheus alerting rule and its associated rule group.A Prometheus alerting rule is described here (https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/). The semantics of a Prometheus alerting rule is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#rule).A Prometheus rule group is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/). The semantics of a Prometheus rule group is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#rule_group).Because Cloud Alerting has no representation of a Prometheus rule group resource, we must embed the information of the parent rule group inside each of the conditions that refer to it. We must also update the contents of all Prometheus alerts in case the information of their rule group changes.The PrometheusQueryLanguageCondition protocol buffer combines the information of the corresponding rule group and alerting rule. The structure of the PrometheusQueryLanguageCondition protocol buffer does NOT mimic the structure of the Prometheus rule group and alerting rule YAML declarations. The PrometheusQueryLanguageCondition protocol buffer may change in the future to support future rule group and/or alerting rule features. There are no new such features at the present time (2023-06-26).",
    ).optional(),
    conditionSql: z.object({
      booleanTest: z.object({
        column: z.string().describe(
          "Required. The name of the column containing the boolean value. If the value in a row is NULL, that row is ignored.",
        ).optional(),
      }).describe(
        "A test that uses an alerting result in a boolean column produced by the SQL query.",
      ).optional(),
      daily: z.object({
        executionTime: z.object({
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
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and google.protobuf.Timestamp.",
        ).optional(),
        periodicity: z.number().int().describe(
          "Required. The number of days between runs. Must be greater than or equal to 1 day and less than or equal to 31 days.",
        ).optional(),
      }).describe("Used to schedule the query to run every so many days.")
        .optional(),
      hourly: z.object({
        minuteOffset: z.number().int().describe(
          "Optional. The number of minutes after the hour (in UTC) to run the query. Must be greater than or equal to 0 minutes and less than or equal to 59 minutes. If left unspecified, then an arbitrary offset is used.",
        ).optional(),
        periodicity: z.number().int().describe(
          "Required. The number of hours between runs. Must be greater than or equal to 1 hour and less than or equal to 48 hours.",
        ).optional(),
      }).describe("Used to schedule the query to run every so many hours.")
        .optional(),
      minutes: z.object({
        periodicity: z.number().int().describe(
          "Required. Number of minutes between runs. The interval must be greater than or equal to 5 minutes and less than or equal to 1440 minutes.",
        ).optional(),
      }).describe("Used to schedule the query to run every so many minutes.")
        .optional(),
      query: z.string().describe(
        "Required. The Log Analytics SQL query to run, as a string. The query must conform to the required shape. Specifically, the query must not try to filter the input by time. A filter will automatically be applied to filter the input so that the query receives all rows received since the last time the query was run.For example, the following query extracts all log entries containing an HTTP request: SELECT timestamp, log_name, severity, http_request, resource, labels FROM my-project.global._Default._AllLogs WHERE http_request IS NOT NULL",
      ).optional(),
      rowCountTest: z.object({
        comparison: z.enum([
          "COMPARISON_UNSPECIFIED",
          "COMPARISON_GT",
          "COMPARISON_GE",
          "COMPARISON_LT",
          "COMPARISON_LE",
          "COMPARISON_EQ",
          "COMPARISON_NE",
        ]).describe(
          "Required. The comparison to apply between the number of rows returned by the query and the threshold.",
        ).optional(),
        threshold: z.string().describe(
          "Required. The value against which to compare the row count.",
        ).optional(),
      }).describe(
        "A test that checks if the number of rows in the result set violates some threshold.",
      ).optional(),
    }).describe(
      "A condition that allows alerting policies to be defined using GoogleSQL. SQL conditions examine a sliding window of logs using GoogleSQL. Alert policies with SQL conditions may incur additional billing.",
    ).optional(),
    conditionThreshold: z.object({
      aggregations: z.array(z.object({
        alignmentPeriod: z.unknown().describe(
          "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies.",
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
      })).describe(
        "Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field.",
      ).optional(),
      comparison: z.enum([
        "COMPARISON_UNSPECIFIED",
        "COMPARISON_GT",
        "COMPARISON_GE",
        "COMPARISON_LT",
        "COMPARISON_LE",
        "COMPARISON_EQ",
        "COMPARISON_NE",
      ]).describe(
        "The comparison to apply between the time series (indicated by filter and aggregation) and the threshold (indicated by threshold_value). The comparison is applied on each time series, with the time series on the left-hand side and the threshold on the right-hand side.Only COMPARISON_LT and COMPARISON_GT are supported currently.",
      ).optional(),
      denominatorAggregations: z.array(z.object({
        alignmentPeriod: z.unknown().describe(
          "The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies.",
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
      })).describe(
        "Specifies the alignment of data points in individual time series selected by denominatorFilter as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources).When computing ratios, the aggregations and denominator_aggregations fields must use the same alignment period and produce time series that have the same periodicity and labels.",
      ).optional(),
      denominatorFilter: z.string().describe(
        "A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies a time series that should be used as the denominator of a ratio that will be compared with the threshold. If a denominator_filter is specified, the time series specified by the filter field will be used as the numerator.The filter must specify the metric type and optionally may contain restrictions on resource type, resource labels, and metric labels. This field may not exceed 2048 Unicode characters in length.",
      ).optional(),
      duration: z.string().describe(
        "Required. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly.",
      ).optional(),
      evaluationMissingData: z.enum([
        "EVALUATION_MISSING_DATA_UNSPECIFIED",
        "EVALUATION_MISSING_DATA_INACTIVE",
        "EVALUATION_MISSING_DATA_ACTIVE",
        "EVALUATION_MISSING_DATA_NO_OP",
      ]).describe(
        "A condition control that determines how metric-threshold conditions are evaluated when data stops arriving. To use this control, the value of the duration field must be greater than or equal to 60 seconds.",
      ).optional(),
      filter: z.string().describe(
        "Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length.",
      ).optional(),
      forecastOptions: z.object({
        forecastHorizon: z.string().describe(
          "Required. The length of time into the future to forecast whether a time series will violate the threshold. If the predicted value is found to violate the threshold, and the violation is observed in all forecasts made for the configured duration, then the time series is considered to be failing. The forecast horizon can range from 1 hour to 60 hours.",
        ).optional(),
      }).describe(
        "Options used when forecasting the time series and testing the predicted value against the threshold.",
      ).optional(),
      thresholdValue: z.number().describe(
        "A value against which to compare the time series.",
      ).optional(),
      trigger: z.object({
        count: z.number().int().describe(
          "The absolute number of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
        percent: z.number().describe(
          "The percentage of time series that must fail the predicate for the condition to be triggered.",
        ).optional(),
      }).describe(
        "Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.",
      ).optional(),
    }).describe(
      "A condition type that compares a collection of time series against a threshold.",
    ).optional(),
    displayName: z.string().describe(
      "A short name or phrase used to identify the condition in dashboards, notifications, and incidents. To avoid confusion, don't use the same display name for multiple conditions in the same policy.",
    ).optional(),
    name: z.string().describe(
      "Required if the condition exists. The unique resource name for this condition. Its format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID]/conditions/[CONDITION_ID] [CONDITION_ID] is assigned by Cloud Monitoring when the condition is created as part of a new or updated alerting policy.When calling the alertPolicies.create method, do not include the name field in the conditions of the requested alerting policy. Cloud Monitoring creates the condition identifiers and includes them in the new policy.When calling the alertPolicies.update method to update a policy, including a condition name causes the existing condition to be updated. Conditions without names are added to the updated policy. Existing conditions are deleted if they are not updated.Best practice is to preserve [CONDITION_ID] if you make only small changes, such as those to condition thresholds, durations, or trigger values. Otherwise, treat the change as a new condition and let the existing condition be deleted.",
    ).optional(),
  })).describe(
    "A list of conditions for the policy. The conditions are combined by AND or OR according to the combiner field. If the combined conditions evaluate to true, then an incident is created. A policy can have from one to six conditions. If condition_time_series_query_language is present, it must be the only condition. If condition_monitoring_query_language is present, it must be the only condition.",
  ).optional(),
  creationRecord: z.object({
    mutateTime: z.string().describe("When the change occurred.").optional(),
    mutatedBy: z.string().describe(
      "The email address of the user making the change.",
    ).optional(),
  }).describe("Describes a change made to a configuration.").optional(),
  displayName: z.string().describe(
    'A short name or phrase used to identify the policy in dashboards, notifications, and incidents. To avoid confusion, don\'t use the same display name for multiple policies in the same project. The name is limited to 512 Unicode characters.The convention for the display_name of a PrometheusQueryLanguageCondition is "{rule group name}/{alert name}", where the {rule group name} and {alert name} should be taken from the corresponding Prometheus configuration file. This convention is not enforced. In any case the display_name is not a unique key of the AlertPolicy.',
  ).optional(),
  documentation: z.object({
    content: z.string().describe(
      "The body of the documentation, interpreted according to mime_type. The content may not exceed 8,192 Unicode characters and may not exceed more than 10,240 bytes when encoded in UTF-8 format, whichever is smaller. This text can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars).",
    ).optional(),
    links: z.array(z.object({
      displayName: z.string().describe(
        'A short display name for the link. The display name must not be empty or exceed 63 characters. Example: "playbook".',
      ).optional(),
      url: z.string().describe(
        'The url of a webpage. A url can be templatized by using variables in the path or the query parameters. The total length of a URL should not exceed 2083 characters before and after variable expansion. Example: "https://my_domain.com/playbook?name=${resource.name}"',
      ).optional(),
    })).describe(
      "Optional. Links to content such as playbooks, repositories, and other resources. This field can contain up to 3 entries.",
    ).optional(),
    mimeType: z.string().describe(
      'The format of the content field. Presently, only the value "text/markdown" is supported. See Markdown (https://en.wikipedia.org/wiki/Markdown) for more information.',
    ).optional(),
    subject: z.string().describe(
      "Optional. The subject line of the notification. The subject line may not exceed 10,240 bytes. In notifications generated by this policy, the contents of the subject line after variable expansion will be truncated to 255 bytes or shorter at the latest UTF-8 character boundary. The 255-byte limit is recommended by this thread (https://stackoverflow.com/questions/1592291/what-is-the-email-subject-length-limit). It is both the limit imposed by some third-party ticketing products and it is common to define textual fields in databases as VARCHAR(255).The contents of the subject line can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). If this field is missing or empty, a default subject line will be generated.",
    ).optional(),
  }).describe(
    "Documentation that is included in the notifications and incidents pertaining to this policy.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether or not the policy is enabled. On write, the default interpretation if unset is that the policy is enabled. On read, clients should not make any assumption about the state if it has not been populated. The field should always be populated on List and Get operations, unless a field projection has been specified that strips it out.",
  ).optional(),
  mutationRecord: z.object({
    mutateTime: z.string().describe("When the change occurred.").optional(),
    mutatedBy: z.string().describe(
      "The email address of the user making the change.",
    ).optional(),
  }).describe("Describes a change made to a configuration.").optional(),
  name: z.string().describe(
    "Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request.",
  ).optional(),
  notificationChannels: z.array(z.string()).describe(
    "Identifies the notification channels to which notifications should be sent when incidents are opened or closed or when new violations occur on an already opened incident. Each element of this array corresponds to the name field in each of the NotificationChannel objects that are returned from the ListNotificationChannels method. The format of the entries in this field is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]",
  ).optional(),
  severity: z.enum(["SEVERITY_UNSPECIFIED", "CRITICAL", "ERROR", "WARNING"])
    .describe(
      "Optional. The severity of an alerting policy indicates how important incidents generated by that policy are. The severity level will be displayed on the Incident detail page and in notifications.",
    ).optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "User-supplied key/value data to be used for organizing and identifying the AlertPolicy objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter.Note that Prometheus {alert name} is a valid Prometheus label names (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels), whereas Prometheus {rule group} is an unrestricted UTF-8 string. This means that they cannot be stored as-is in user labels, because they may contain characters that are not allowed in user-label values.",
  ).optional(),
  validity: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each Status message contains three pieces of data: error code, error message, and error details.You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Monitoring AlertPolicies. Registered at `@swamp/gcp/monitoring/alertpolicies`. */
export const model = {
  type: "@swamp/gcp/monitoring/alertpolicies",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A description of the conditions under which some aspect of your system is con...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a alertPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (g["alertStrategy"] !== undefined) {
          body["alertStrategy"] = g["alertStrategy"];
        }
        if (g["combiner"] !== undefined) body["combiner"] = g["combiner"];
        if (g["conditions"] !== undefined) body["conditions"] = g["conditions"];
        if (g["creationRecord"] !== undefined) {
          body["creationRecord"] = g["creationRecord"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["enabled"] !== undefined) body["enabled"] = g["enabled"];
        if (g["mutationRecord"] !== undefined) {
          body["mutationRecord"] = g["mutationRecord"];
        }
        if (g["notificationChannels"] !== undefined) {
          body["notificationChannels"] = g["notificationChannels"];
        }
        if (g["severity"] !== undefined) body["severity"] = g["severity"];
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
        if (g["validity"] !== undefined) body["validity"] = g["validity"];
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
      description: "Get a alertPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the alertPolicies"),
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
    update: {
      description: "Update alertPolicies attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alertStrategy"] !== undefined) {
          body["alertStrategy"] = g["alertStrategy"];
        }
        if (g["combiner"] !== undefined) body["combiner"] = g["combiner"];
        if (g["conditions"] !== undefined) body["conditions"] = g["conditions"];
        if (g["creationRecord"] !== undefined) {
          body["creationRecord"] = g["creationRecord"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["enabled"] !== undefined) body["enabled"] = g["enabled"];
        if (g["mutationRecord"] !== undefined) {
          body["mutationRecord"] = g["mutationRecord"];
        }
        if (g["notificationChannels"] !== undefined) {
          body["notificationChannels"] = g["notificationChannels"];
        }
        if (g["severity"] !== undefined) body["severity"] = g["severity"];
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
        if (g["validity"] !== undefined) body["validity"] = g["validity"];
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
    delete: {
      description: "Delete the alertPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the alertPolicies"),
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
      description: "Sync alertPolicies state from GCP",
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
