// Auto-generated extension model for @swamp/gcp/logging/metrics
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Logging Metrics.
 *
 * Describes a logs-based metric. The value of the metric is the number of log entries that match a logs filter in a given time interval.Logs-based metrics can also be used to extract values from logs and create a distribution of the values. The distribution records the statistics of the extracted values along with an optional histogram of the values as specified by the bucket options.
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

const BASE_URL = "https://logging.googleapis.com/";

const GET_CONFIG = {
  "id": "logging.projects.metrics.get",
  "path": "v2/{+metricName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "metricName",
  ],
  "parameters": {
    "metricName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "logging.projects.metrics.create",
  "path": "v2/{+parent}/metrics",
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

const UPDATE_CONFIG = {
  "id": "logging.projects.metrics.update",
  "path": "v2/{+metricName}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "metricName",
  ],
  "parameters": {
    "metricName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "logging.projects.metrics.delete",
  "path": "v2/{+metricName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "metricName",
  ],
  "parameters": {
    "metricName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "logging.projects.metrics.list",
  "path": "v2/{+parent}/metrics",
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
  bucketName: z.string().describe(
    "Optional. The resource name of the Log Bucket that owns the Log Metric. Only Log Buckets in projects are supported. The bucket has to be in the same project as the metric.For example:projects/my-project/locations/global/buckets/my-bucketIf empty, then the Log Metric is considered a non-Bucket Log Metric.",
  ).optional(),
  bucketOptions: z.object({
    explicitBuckets: z.object({
      bounds: z.array(z.number()).describe(
        "The values must be monotonically increasing.",
      ).optional(),
    }).describe(
      "Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): boundsi Lower bound (1 <= i < N); boundsi - 1The bounds field must contain at least one element. If bounds has only one element, then there are no finite buckets, and that single element is the common boundary of the overflow and underflow buckets.",
    ).optional(),
    exponentialBuckets: z.object({
      growthFactor: z.number().describe("Must be greater than 1.").optional(),
      numFiniteBuckets: z.number().int().describe("Must be greater than 0.")
        .optional(),
      scale: z.number().describe("Must be greater than 0.").optional(),
    }).describe(
      "Specifies an exponential sequence of buckets that have a width that is proportional to the value of the lower bound. Each bucket represents a constant relative uncertainty on a specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): scale * (growth_factor ^ i).Lower bound (1 <= i < N): scale * (growth_factor ^ (i - 1)).",
    ).optional(),
    linearBuckets: z.object({
      numFiniteBuckets: z.number().int().describe("Must be greater than 0.")
        .optional(),
      offset: z.number().describe("Lower bound of the first bucket.")
        .optional(),
      width: z.number().describe("Must be greater than 0.").optional(),
    }).describe(
      "Specifies a linear sequence of buckets that all have the same width (except overflow and underflow). Each bucket represents a constant absolute uncertainty on the specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): offset + (width * i).Lower bound (1 <= i < N): offset + (width * (i - 1)).",
    ).optional(),
  }).describe(
    "BucketOptions describes the bucket boundaries used to create a histogram for the distribution. The buckets can be in a linear sequence, an exponential sequence, or each bucket can be specified explicitly. BucketOptions does not include the number of values in each bucket.A bucket has an inclusive lower bound and exclusive upper bound for the values that are counted for that bucket. The upper bound of a bucket must be strictly greater than the lower bound. The sequence of N buckets for a distribution consists of an underflow bucket (number 0), zero or more finite buckets (number 1 through N - 2) and an overflow bucket (number N - 1). The buckets are contiguous: the lower bound of bucket i (i > 0) is the same as the upper bound of bucket i - 1. The buckets span the whole range of finite values: lower bound of the underflow bucket is -infinity and the upper bound of the overflow bucket is +infinity. The finite buckets are so-called because both bounds are finite.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of this metric, which is used in documentation. The maximum length of the description is 8000 characters.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. If set to True, then this metric is disabled and it does not generate any points.",
  ).optional(),
  filter: z.string().describe(
    'Required. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced_filters) which is used to match log entries. Example: "resource.type=gae_app AND severity>=ERROR" The maximum length of the filter is 20000 characters.',
  ).optional(),
  labelExtractors: z.record(z.string(), z.string()).describe(
    "Optional. A map from a label key string to an extractor expression which is used to extract data from a log entry field and assign as the label value. Each label key specified in the LabelDescriptor must have an associated extractor expression in this map. The syntax of the extractor expression is the same as for the value_extractor field.The extracted value is converted to the type defined in the label descriptor. If either the extraction or the type conversion fails, the label will have a default value. The default value for a string label is an empty string, for an integer label its 0, and for a boolean label its false.Note that there are upper bounds on the maximum number of labels and the number of active time series that are allowed in a project.",
  ).optional(),
  metricDescriptor: z.object({
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
      key: z.string().describe("The label key.").optional(),
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
  }).describe(
    "Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type's existing data unusable.",
  ).optional(),
  name: z.string().describe(
    'Required. The client-assigned metric identifier. Examples: "error_count", "nginx/requests".Metric identifiers are limited to 100 characters and can include only the following characters: A-Z, a-z, 0-9, and the special characters _-.,+!*\',()%/. The forward-slash character (/) denotes a hierarchy of name pieces, and it cannot be the first character of the name.This field is the [METRIC_ID] part of a metric resource name in the format "projects/PROJECT_ID/metrics/METRIC_ID". Example: If the resource name of a metric is "projects/my-project/metrics/nginx%2Frequests", this field\'s value is "nginx/requests".',
  ).optional(),
  valueExtractor: z.string().describe(
    'Optional. A value_extractor is required when using a distribution logs-based metric to extract the values to record from a log entry. Two functions are supported for value extraction: EXTRACT(field) or REGEXP_EXTRACT(field, regex). The arguments are: field: The name of the log entry field from which the value is to be extracted. regex: A regular expression using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax) with a single capture group to extract data from the specified log entry field. The value of the field is converted to a string before applying the regex. It is an error to specify a regex that does not include exactly one capture group.The result of the extraction must be convertible to a double type, as the distribution always records double values. If either the extraction or the conversion to double fails, then those values are not recorded in the distribution.Example: REGEXP_EXTRACT(jsonPayload.request, ".*quantity=(\\d+).*")',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bucketName: z.string().optional(),
  bucketOptions: z.object({
    explicitBuckets: z.object({
      bounds: z.array(z.number()),
    }),
    exponentialBuckets: z.object({
      growthFactor: z.number(),
      numFiniteBuckets: z.number(),
      scale: z.number(),
    }),
    linearBuckets: z.object({
      numFiniteBuckets: z.number(),
      offset: z.number(),
      width: z.number(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  disabled: z.boolean().optional(),
  filter: z.string().optional(),
  labelExtractors: z.record(z.string(), z.unknown()).optional(),
  metricDescriptor: z.object({
    description: z.string(),
    displayName: z.string(),
    labels: z.array(z.object({
      description: z.string(),
      key: z.string(),
      valueType: z.string(),
    })),
    launchStage: z.string(),
    metadata: z.object({
      ingestDelay: z.string(),
      launchStage: z.string(),
      samplePeriod: z.string(),
      timeSeriesResourceHierarchyLevel: z.array(z.string()),
    }),
    metricKind: z.string(),
    monitoredResourceTypes: z.array(z.string()),
    name: z.string(),
    type: z.string(),
    unit: z.string(),
    valueType: z.string(),
  }).optional(),
  name: z.string(),
  resourceName: z.string().optional(),
  updateTime: z.string().optional(),
  valueExtractor: z.string().optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bucketName: z.string().describe(
    "Optional. The resource name of the Log Bucket that owns the Log Metric. Only Log Buckets in projects are supported. The bucket has to be in the same project as the metric.For example:projects/my-project/locations/global/buckets/my-bucketIf empty, then the Log Metric is considered a non-Bucket Log Metric.",
  ).optional(),
  bucketOptions: z.object({
    explicitBuckets: z.object({
      bounds: z.array(z.number()).describe(
        "The values must be monotonically increasing.",
      ).optional(),
    }).describe(
      "Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): boundsi Lower bound (1 <= i < N); boundsi - 1The bounds field must contain at least one element. If bounds has only one element, then there are no finite buckets, and that single element is the common boundary of the overflow and underflow buckets.",
    ).optional(),
    exponentialBuckets: z.object({
      growthFactor: z.number().describe("Must be greater than 1.").optional(),
      numFiniteBuckets: z.number().int().describe("Must be greater than 0.")
        .optional(),
      scale: z.number().describe("Must be greater than 0.").optional(),
    }).describe(
      "Specifies an exponential sequence of buckets that have a width that is proportional to the value of the lower bound. Each bucket represents a constant relative uncertainty on a specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): scale * (growth_factor ^ i).Lower bound (1 <= i < N): scale * (growth_factor ^ (i - 1)).",
    ).optional(),
    linearBuckets: z.object({
      numFiniteBuckets: z.number().int().describe("Must be greater than 0.")
        .optional(),
      offset: z.number().describe("Lower bound of the first bucket.")
        .optional(),
      width: z.number().describe("Must be greater than 0.").optional(),
    }).describe(
      "Specifies a linear sequence of buckets that all have the same width (except overflow and underflow). Each bucket represents a constant absolute uncertainty on the specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): offset + (width * i).Lower bound (1 <= i < N): offset + (width * (i - 1)).",
    ).optional(),
  }).describe(
    "BucketOptions describes the bucket boundaries used to create a histogram for the distribution. The buckets can be in a linear sequence, an exponential sequence, or each bucket can be specified explicitly. BucketOptions does not include the number of values in each bucket.A bucket has an inclusive lower bound and exclusive upper bound for the values that are counted for that bucket. The upper bound of a bucket must be strictly greater than the lower bound. The sequence of N buckets for a distribution consists of an underflow bucket (number 0), zero or more finite buckets (number 1 through N - 2) and an overflow bucket (number N - 1). The buckets are contiguous: the lower bound of bucket i (i > 0) is the same as the upper bound of bucket i - 1. The buckets span the whole range of finite values: lower bound of the underflow bucket is -infinity and the upper bound of the overflow bucket is +infinity. The finite buckets are so-called because both bounds are finite.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of this metric, which is used in documentation. The maximum length of the description is 8000 characters.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. If set to True, then this metric is disabled and it does not generate any points.",
  ).optional(),
  filter: z.string().describe(
    'Required. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced_filters) which is used to match log entries. Example: "resource.type=gae_app AND severity>=ERROR" The maximum length of the filter is 20000 characters.',
  ).optional(),
  labelExtractors: z.record(z.string(), z.string()).describe(
    "Optional. A map from a label key string to an extractor expression which is used to extract data from a log entry field and assign as the label value. Each label key specified in the LabelDescriptor must have an associated extractor expression in this map. The syntax of the extractor expression is the same as for the value_extractor field.The extracted value is converted to the type defined in the label descriptor. If either the extraction or the type conversion fails, the label will have a default value. The default value for a string label is an empty string, for an integer label its 0, and for a boolean label its false.Note that there are upper bounds on the maximum number of labels and the number of active time series that are allowed in a project.",
  ).optional(),
  metricDescriptor: z.object({
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
      key: z.string().describe("The label key.").optional(),
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
  }).describe(
    "Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type's existing data unusable.",
  ).optional(),
  name: z.string().describe(
    'Required. The client-assigned metric identifier. Examples: "error_count", "nginx/requests".Metric identifiers are limited to 100 characters and can include only the following characters: A-Z, a-z, 0-9, and the special characters _-.,+!*\',()%/. The forward-slash character (/) denotes a hierarchy of name pieces, and it cannot be the first character of the name.This field is the [METRIC_ID] part of a metric resource name in the format "projects/PROJECT_ID/metrics/METRIC_ID". Example: If the resource name of a metric is "projects/my-project/metrics/nginx%2Frequests", this field\'s value is "nginx/requests".',
  ).optional(),
  valueExtractor: z.string().describe(
    'Optional. A value_extractor is required when using a distribution logs-based metric to extract the values to record from a log entry. Two functions are supported for value extraction: EXTRACT(field) or REGEXP_EXTRACT(field, regex). The arguments are: field: The name of the log entry field from which the value is to be extracted. regex: A regular expression using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax) with a single capture group to extract data from the specified log entry field. The value of the field is converted to a string before applying the regex. It is an error to specify a regex that does not include exactly one capture group.The result of the extraction must be convertible to a double type, as the distribution always records double values. If either the extraction or the conversion to double fails, then those values are not recorded in the distribution.Example: REGEXP_EXTRACT(jsonPayload.request, ".*quantity=(\\d+).*")',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Logging Metrics. Registered at `@swamp/gcp/logging/metrics`. */
export const model = {
  type: "@swamp/gcp/logging/metrics",
  version: "2026.05.21.2",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Describes a logs-based metric. The value of the metric is the number of log e...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a metrics",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["bucketName"] !== undefined) body["bucketName"] = g["bucketName"];
        if (g["bucketOptions"] !== undefined) {
          body["bucketOptions"] = g["bucketOptions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labelExtractors"] !== undefined) {
          body["labelExtractors"] = g["labelExtractors"];
        }
        if (g["metricDescriptor"] !== undefined) {
          body["metricDescriptor"] = g["metricDescriptor"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["valueExtractor"] !== undefined) {
          body["valueExtractor"] = g["valueExtractor"];
        }
        if (g["name"] !== undefined) params["metricName"] = String(g["name"]);
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
      description: "Get a metrics",
      arguments: z.object({
        identifier: z.string().describe("The name of the metrics"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["metricName"] = args.identifier;
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
      description: "Update metrics attributes",
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
        params["metricName"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["bucketName"] !== undefined) body["bucketName"] = g["bucketName"];
        if (g["bucketOptions"] !== undefined) {
          body["bucketOptions"] = g["bucketOptions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labelExtractors"] !== undefined) {
          body["labelExtractors"] = g["labelExtractors"];
        }
        if (g["metricDescriptor"] !== undefined) {
          body["metricDescriptor"] = g["metricDescriptor"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["valueExtractor"] !== undefined) {
          body["valueExtractor"] = g["valueExtractor"];
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
          UPDATE_CONFIG,
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
      description: "Delete the metrics",
      arguments: z.object({
        identifier: z.string().describe("The name of the metrics"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["metricName"] = args.identifier;
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
      description: "Sync metrics state from GCP",
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
          params["metricName"] = identifier;
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
