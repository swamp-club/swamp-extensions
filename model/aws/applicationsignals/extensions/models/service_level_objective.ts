// Auto-generated extension model for @swamp/aws/applicationsignals/service-level-objective
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApplicationSignals ServiceLevelObjective (AWS::ApplicationSignals::ServiceLevelObjective).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const DimensionSchema = z.object({
  Value: z.string().describe(
    "The value of the dimension. Dimension values must contain only ASCII characters and must include at least one non-whitespace character. ASCII control characters are not supported as part of dimension values",
  ),
  Name: z.string().describe(
    "The name of the dimension. Dimension names must contain only ASCII characters, must include at least one non-whitespace character, and cannot start with a colon (:). ASCII control characters are not supported as part of dimension names.",
  ),
});

const MetricSchema = z.object({
  MetricName: z.string().describe("The name of the metric to use.").optional(),
  Dimensions: z.array(DimensionSchema).describe(
    "An array of one or more dimensions to use to define the metric that you want to use.",
  ).optional(),
  Namespace: z.string().describe("The namespace of the metric.").optional(),
});

const MetricStatSchema = z.object({
  Period: z.number().int().describe(
    "The granularity, in seconds, to be used for the metric.",
  ),
  Metric: MetricSchema.describe(
    "This structure defines the metric used for a service level indicator, including the metric name, namespace, and dimensions.",
  ),
  Stat: z.string().describe(
    "The statistic to use for comparison to the threshold. It can be any CloudWatch statistic or extended statistic.",
  ),
  Unit: z.string().describe(
    "If you omit Unit then all data that was collected with any unit is returned, along with the corresponding units that were specified when the data was reported to CloudWatch. If you specify a unit, the operation returns only data that was collected with that unit specified. If you specify a unit that does not match the data collected, the results of the operation are null. CloudWatch does not perform unit conversions.",
  ).optional(),
});

const MetricDataQuerySchema = z.object({
  MetricStat: MetricStatSchema.describe(
    "A metric to be used directly for the SLO, or to be used in the math expression that will be used for the SLO. Within one MetricDataQuery, you must specify either Expression or MetricStat but not both.",
  ).optional(),
  Id: z.string().describe(
    "A short name used to tie this object to the results in the response.",
  ),
  ReturnData: z.boolean().describe(
    "This option indicates whether to return the timestamps and raw data values of this metric.",
  ).optional(),
  Expression: z.string().describe(
    "The math expression to be performed on the returned data.",
  ).optional(),
  AccountId: z.string().describe(
    "The ID of the account where the metrics are located, if this is a cross-account alarm.",
  ).optional(),
});

const DependencyConfigSchema = z.object({
  DependencyKeyAttributes: z.record(z.string(), z.string()).describe(
    "If this SLO is related to a metric collected by Application Signals, you must use this field to specify which dependency the SLO metric is related to.",
  ),
  DependencyOperationName: z.string().min(1).max(255).describe(
    "When the SLO monitors a specific operation of the dependency, this field specifies the name of that operation in the dependency.",
  ),
});

const MetricSourceSchema = z.object({
  MetricSourceKeyAttributes: z.record(z.string(), z.string()).describe(
    "Required attributes that identify the metric source",
  ),
  MetricSourceAttributes: z.record(z.string(), z.string()).describe(
    "Optional additional attributes for the metric source",
  ).optional(),
});

const SelectionConfigSchema = z.object({
  Type: z.enum(["EXPLICIT", "PREFIX", "REGEX"]),
  Pattern: z.string().regex(new RegExp("^.+$")).optional(),
});

const CompositeSliComponentSchema = z.object({
  OperationName: z.string(),
});

const CompositeSliConfigSchema = z.object({
  SelectionConfig: SelectionConfigSchema,
  CompositeSliComponents: z.array(CompositeSliComponentSchema).optional(),
});

const SliMetricSchema = z.object({
  KeyAttributes: z.record(z.string(), z.string()).describe(
    "This is a string-to-string map that contains information about the type of object that this SLO is related to.",
  ).optional(),
  OperationName: z.string().min(1).max(255).describe(
    "If the SLO monitors a specific operation of the service, this field displays that operation name.",
  ).optional(),
  MetricType: z.enum(["LATENCY", "AVAILABILITY"]).describe(
    "If the SLO monitors either the LATENCY or AVAILABILITY metric that Application Signals collects, this field displays which of those metrics is used.",
  ).optional(),
  Statistic: z.string().min(1).max(20).describe(
    "The statistic to use for comparison to the threshold. It can be any CloudWatch statistic or extended statistic",
  ).optional(),
  PeriodSeconds: z.number().int().min(60).max(900).describe(
    "The number of seconds to use as the period for SLO evaluation. Your application's performance is compared to the SLI during each period. For each period, the application is determined to have either achieved or not achieved the necessary performance.",
  ).optional(),
  MetricDataQueries: z.array(MetricDataQuerySchema).describe(
    "If this SLO monitors a CloudWatch metric or the result of a CloudWatch metric math expression, this structure includes the information about that metric or expression.",
  ).optional(),
  DependencyConfig: DependencyConfigSchema.describe(
    "Configuration for identifying a dependency and its operation",
  ).optional(),
  MetricSource: MetricSourceSchema.describe(
    "Configuration for identifying the source of metrics for non-Application Signals services",
  ).optional(),
  MetricName: z.string().min(1).max(255).describe(
    "The name of the metric for non-Application Signals services",
  ).optional(),
  CompositeSliConfig: CompositeSliConfigSchema.optional(),
});

const MonitoredRequestCountMetricSchema = z.object({
  GoodCountMetric: z.array(MetricDataQuerySchema).describe(
    'If you want to count "good requests" to determine the percentage of successful requests for this request-based SLO, specify the metric to use as "good requests" in this structure.',
  ).optional(),
  BadCountMetric: z.array(MetricDataQuerySchema).describe(
    'If you want to count "bad requests" to determine the percentage of successful requests for this request-based SLO, specify the metric to use as "bad requests" in this structure.',
  ).optional(),
});

const RequestBasedSliMetricSchema = z.object({
  KeyAttributes: z.record(z.string(), z.string()).describe(
    "This is a string-to-string map that contains information about the type of object that this SLO is related to.",
  ).optional(),
  OperationName: z.string().min(1).max(255).describe(
    "If the SLO monitors a specific operation of the service, this field displays that operation name.",
  ).optional(),
  MetricType: z.enum(["LATENCY", "AVAILABILITY"]).describe(
    "If the SLO monitors either the LATENCY or AVAILABILITY metric that Application Signals collects, this field displays which of those metrics is used.",
  ).optional(),
  TotalRequestCountMetric: z.array(MetricDataQuerySchema).describe(
    'This structure defines the metric that is used as the "total requests" number for a request-based SLO. The number observed for this metric is divided by the number of "good requests" or "bad requests" that is observed for the metric defined in `MonitoredRequestCountMetric`.',
  ).optional(),
  MonitoredRequestCountMetric: MonitoredRequestCountMetricSchema.describe(
    'This structure defines the metric that is used as the "good request" or "bad request" value for a request-based SLO. This value observed for the metric defined in `TotalRequestCountMetric` is divided by the number found for `MonitoredRequestCountMetric` to determine the percentage of successful requests that this SLO tracks.',
  ).optional(),
  DependencyConfig: DependencyConfigSchema.describe(
    "Configuration for identifying a dependency and its operation",
  ).optional(),
  MetricSource: MetricSourceSchema.describe(
    "Configuration for identifying the source of metrics for non-Application Signals services",
  ).optional(),
  MetricName: z.string().min(1).max(255).describe(
    "The name of the metric for non-Application Signals services",
  ).optional(),
  CompositeSliConfig: CompositeSliConfigSchema.optional(),
});

const RollingIntervalSchema = z.object({
  DurationUnit: z.enum(["MINUTE", "HOUR", "DAY", "MONTH"]).describe(
    "Specifies the interval unit.",
  ),
  Duration: z.number().int().min(1).describe(
    "Specifies the duration of each interval. For example, if `Duration` is 1 and `DurationUnit` is `MONTH`, each interval is one month, aligned with the calendar.",
  ),
});

const CalendarIntervalSchema = z.object({
  StartTime: z.number().int().min(946684800).describe(
    "Epoch time in seconds you want the first interval to start. Be sure to choose a time that configures the intervals the way that you want. For example, if you want weekly intervals starting on Mondays at 6 a.m., be sure to specify a start time that is a Monday at 6 a.m. As soon as one calendar interval ends, another automatically begins.",
  ),
  DurationUnit: z.enum(["MINUTE", "HOUR", "DAY", "MONTH"]).describe(
    "Specifies the interval unit.",
  ),
  Duration: z.number().int().min(1).describe(
    "Specifies the duration of each interval. For example, if `Duration` is 1 and `DurationUnit` is `MONTH`, each interval is one month, aligned with the calendar.",
  ),
});

const IntervalSchema = z.object({
  RollingInterval: RollingIntervalSchema.describe(
    "If the interval is a calendar interval, this structure contains the interval specifications.",
  ).optional(),
  CalendarInterval: CalendarIntervalSchema.describe(
    "If the interval for this service level objective is a calendar interval, this structure contains the interval specifications.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "A string that you can use to assign a value. The combination of tag keys and values can help you organize and categorize your resources.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the specified tag key.",
  ),
});

const BurnRateConfigurationSchema = z.object({
  LookBackWindowMinutes: z.number().int().min(1).max(10080).describe(
    "The number of minutes to use as the look-back window.",
  ),
});

const WindowSchema = z.object({
  DurationUnit: z.enum(["MINUTE", "HOUR", "DAY", "MONTH"]).describe(
    "Specifies the interval unit.",
  ),
  Duration: z.number().int().min(1).describe(
    "Specifies the duration of each interval. For example, if `Duration` is 1 and `DurationUnit` is `MONTH`, each interval is one month, aligned with the calendar.",
  ),
});

const RecurrenceRuleSchema = z.object({
  Expression: z.string().min(1).max(1024).describe(
    "A cron or rate expression denoting how often to repeat this exclusion window.",
  ),
});

const ExclusionWindowSchema = z.object({
  Window: WindowSchema.describe(
    "This object defines the length of time an exclusion window should span.",
  ),
  StartTime: z.string().describe(
    "The time you want the exclusion window to start at. Note that time exclusion windows can only be scheduled in the future, not the past.",
  ).optional(),
  RecurrenceRule: RecurrenceRuleSchema.describe(
    "This object defines how often to repeat a time exclusion window.",
  ).optional(),
  Reason: z.string().min(1).max(1024).describe(
    "An optional reason for scheduling this time exclusion window. Default is 'No reason'.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().regex(
    new RegExp("^[0-9A-Za-z][-._0-9A-Za-z ]{0,126}[0-9A-Za-z]$"),
  ).describe("The name of this SLO."),
  Description: z.string().min(1).max(1024).describe(
    "An optional description for this SLO. Default is 'No description'",
  ).optional(),
  Sli: z.object({
    SliMetric: SliMetricSchema.describe(
      "A structure that contains information about the metric that the SLO monitors.",
    ),
    MetricThreshold: z.number().describe(
      "The value that the SLI metric is compared to.",
    ),
    ComparisonOperator: z.enum([
      "GreaterThanOrEqualTo",
      "LessThanOrEqualTo",
      "LessThan",
      "GreaterThan",
    ]).describe(
      "The arithmetic operation used when comparing the specified metric to the threshold.",
    ),
  }).describe(
    "This structure contains information about the performance metric that an SLO monitors.",
  ).optional(),
  RequestBasedSli: z.object({
    RequestBasedSliMetric: RequestBasedSliMetricSchema.describe(
      "This structure contains the information about the metric that is used for a request-based SLO.",
    ),
    MetricThreshold: z.number().describe(
      "The value that the SLI metric is compared to.",
    ).optional(),
    ComparisonOperator: z.enum([
      "GreaterThanOrEqualTo",
      "LessThanOrEqualTo",
      "LessThan",
      "GreaterThan",
    ]).describe(
      "The arithmetic operation used when comparing the specified metric to the threshold.",
    ).optional(),
  }).describe(
    "This structure contains information about the performance metric that a request-based SLO monitors.",
  ).optional(),
  Goal: z.object({
    Interval: IntervalSchema.describe(
      "The time period used to evaluate the SLO. It can be either a calendar interval or rolling interval. If you omit this parameter, a rolling interval of 7 days is used.",
    ).optional(),
    AttainmentGoal: z.number().describe(
      "The threshold that determines if the goal is being met. An attainment goal is the ratio of good periods that meet the threshold requirements to the total periods within the interval. For example, an attainment goal of 99.9% means that within your interval, you are targeting 99.9% of the periods to be in healthy state. If you omit this parameter, 99 is used to represent 99% as the attainment goal.",
    ).optional(),
    WarningThreshold: z.number().describe(
      "The percentage of remaining budget over total budget that you want to get warnings for. If you omit this parameter, the default of 50.0 is used.",
    ).optional(),
  }).describe(
    "A structure that contains the attributes that determine the goal of the SLO. This includes the time period for evaluation and the attainment threshold.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The list of tag keys and values associated with the resource you specified",
  ).optional(),
  BurnRateConfigurations: z.array(BurnRateConfigurationSchema).describe(
    "Each object in this array defines the length of the look-back window used to calculate one burn rate metric for this SLO. The burn rate measures how fast the service is consuming the error budget, relative to the attainment goal of the SLO.",
  ).optional(),
  ExclusionWindows: z.array(ExclusionWindowSchema).describe(
    "Each object in this array defines a time exclusion window for this SLO. The time exclusion window is used to exclude breaching data points from affecting attainment rate, error budget, and burn rate metrics.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  CreatedTime: z.number().optional(),
  LastUpdatedTime: z.number().optional(),
  Sli: z.object({
    SliMetric: SliMetricSchema,
    MetricThreshold: z.number(),
    ComparisonOperator: z.string(),
  }).optional(),
  RequestBasedSli: z.object({
    RequestBasedSliMetric: RequestBasedSliMetricSchema,
    MetricThreshold: z.number(),
    ComparisonOperator: z.string(),
  }).optional(),
  EvaluationType: z.string().optional(),
  Goal: z.object({
    Interval: IntervalSchema,
    AttainmentGoal: z.number(),
    WarningThreshold: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  BurnRateConfigurations: z.array(BurnRateConfigurationSchema).optional(),
  ExclusionWindows: z.array(ExclusionWindowSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(
    new RegExp("^[0-9A-Za-z][-._0-9A-Za-z ]{0,126}[0-9A-Za-z]$"),
  ).describe("The name of this SLO.").optional(),
  Description: z.string().min(1).max(1024).describe(
    "An optional description for this SLO. Default is 'No description'",
  ).optional(),
  Sli: z.object({
    SliMetric: SliMetricSchema.describe(
      "A structure that contains information about the metric that the SLO monitors.",
    ).optional(),
    MetricThreshold: z.number().describe(
      "The value that the SLI metric is compared to.",
    ).optional(),
    ComparisonOperator: z.enum([
      "GreaterThanOrEqualTo",
      "LessThanOrEqualTo",
      "LessThan",
      "GreaterThan",
    ]).describe(
      "The arithmetic operation used when comparing the specified metric to the threshold.",
    ).optional(),
  }).describe(
    "This structure contains information about the performance metric that an SLO monitors.",
  ).optional(),
  RequestBasedSli: z.object({
    RequestBasedSliMetric: RequestBasedSliMetricSchema.describe(
      "This structure contains the information about the metric that is used for a request-based SLO.",
    ).optional(),
    MetricThreshold: z.number().describe(
      "The value that the SLI metric is compared to.",
    ).optional(),
    ComparisonOperator: z.enum([
      "GreaterThanOrEqualTo",
      "LessThanOrEqualTo",
      "LessThan",
      "GreaterThan",
    ]).describe(
      "The arithmetic operation used when comparing the specified metric to the threshold.",
    ).optional(),
  }).describe(
    "This structure contains information about the performance metric that a request-based SLO monitors.",
  ).optional(),
  Goal: z.object({
    Interval: IntervalSchema.describe(
      "The time period used to evaluate the SLO. It can be either a calendar interval or rolling interval. If you omit this parameter, a rolling interval of 7 days is used.",
    ).optional(),
    AttainmentGoal: z.number().describe(
      "The threshold that determines if the goal is being met. An attainment goal is the ratio of good periods that meet the threshold requirements to the total periods within the interval. For example, an attainment goal of 99.9% means that within your interval, you are targeting 99.9% of the periods to be in healthy state. If you omit this parameter, 99 is used to represent 99% as the attainment goal.",
    ).optional(),
    WarningThreshold: z.number().describe(
      "The percentage of remaining budget over total budget that you want to get warnings for. If you omit this parameter, the default of 50.0 is used.",
    ).optional(),
  }).describe(
    "A structure that contains the attributes that determine the goal of the SLO. This includes the time period for evaluation and the attainment threshold.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The list of tag keys and values associated with the resource you specified",
  ).optional(),
  BurnRateConfigurations: z.array(BurnRateConfigurationSchema).describe(
    "Each object in this array defines the length of the look-back window used to calculate one burn rate metric for this SLO. The burn rate measures how fast the service is consuming the error budget, relative to the attainment goal of the SLO.",
  ).optional(),
  ExclusionWindows: z.array(ExclusionWindowSchema).describe(
    "Each object in this array defines a time exclusion window for this SLO. The time exclusion window is used to exclude breaching data points from affecting attainment rate, error budget, and burn rate metrics.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for ApplicationSignals ServiceLevelObjective. Registered at `@swamp/aws/applicationsignals/service-level-objective`. */
export const model = {
  type: "@swamp/aws/applicationsignals/service-level-objective",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ApplicationSignals ServiceLevelObjective resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApplicationSignals ServiceLevelObjective",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApplicationSignals::ServiceLevelObjective",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a ApplicationSignals ServiceLevelObjective",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationSignals ServiceLevelObjective",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApplicationSignals::ServiceLevelObjective",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a ApplicationSignals ServiceLevelObjective",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApplicationSignals::ServiceLevelObjective",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApplicationSignals::ServiceLevelObjective",
          identifier,
          currentState,
          desiredState,
          ["Name"],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a ApplicationSignals ServiceLevelObjective",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationSignals ServiceLevelObjective",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApplicationSignals::ServiceLevelObjective",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description:
        "Sync ApplicationSignals ServiceLevelObjective state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApplicationSignals::ServiceLevelObjective",
            identifier,
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
              identifier,
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
