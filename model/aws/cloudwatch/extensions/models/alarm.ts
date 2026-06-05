// Auto-generated extension model for @swamp/aws/cloudwatch/alarm
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch Alarm (AWS::CloudWatch::Alarm).
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

const DimensionSchema = z.object({
  Value: z.string().describe(
    "The value for the dimension, from 1–255 characters in length.",
  ),
  Name: z.string().describe(
    "The name of the dimension, from 1–255 characters in length. This dimension name must have been included when the metric was published.",
  ),
});

const MetricSchema = z.object({
  MetricName: z.string().describe(
    "The name of the metric that you want the alarm to watch. This is a required field.",
  ).optional(),
  Dimensions: z.array(DimensionSchema).describe(
    "The metric dimensions that you want to be used for the metric that the alarm will watch.",
  ).optional(),
  Namespace: z.string().describe(
    "The namespace of the metric that the alarm will watch.",
  ).optional(),
});

const MetricStatSchema = z.object({
  Period: z.number().int().describe(
    "The granularity, in seconds, of the returned data points. For metrics with regular resolution, a period can be as short as one minute (60 seconds) and must be a multiple of 60. For high-resolution metrics that are collected at intervals of less than one minute, the period can be 1, 5, 10, 20, 30, 60, or any multiple of 60. High-resolution metrics are those metrics stored by a PutMetricData call that includes a StorageResolution of 1 second. If the StartTime parameter specifies a time stamp that is greater than 3 hours ago, you must specify the period as follows or no data points in that time range is returned: Start time between 3 hours and 15 days ago - Use a multiple of 60 seconds (1 minute). Start time between 15 and 63 days ago - Use a multiple of 300 seconds (5 minutes). Start time greater than 63 days ago - Use a multiple of 3600 seconds (1 hour).",
  ),
  Metric: MetricSchema.describe(
    "The metric to return, including the metric name, namespace, and dimensions.",
  ),
  Stat: z.string().describe(
    "The statistic to return. It can include any CW statistic or extended statistic. For a list of valid values, see the table in [Statistics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic) in the *User Guide*.",
  ),
  Unit: z.string().describe(
    "The unit to use for the returned data points. Valid values are: Seconds, Microseconds, Milliseconds, Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, Bits, Kilobits, Megabits, Gigabits, Terabits, Percent, Count, Bytes/Second, Kilobytes/Second, Megabytes/Second, Gigabytes/Second, Terabytes/Second, Bits/Second, Kilobits/Second, Megabits/Second, Gigabits/Second, Terabits/Second, Count/Second, or None.",
  ).optional(),
});

const MetricDataQuerySchema = z.object({
  Label: z.string().describe(
    "A human-readable label for this metric or expression. This is especially useful if this is an expression, so that you know what the value represents. If the metric or expression is shown in a CW dashboard widget, the label is shown. If Label is omitted, CW generates a default.",
  ).optional(),
  MetricStat: MetricStatSchema.describe(
    "The metric to be returned, along with statistics, period, and units. Use this parameter only if this object is retrieving a metric and not performing a math expression on returned data. Within one MetricDataQuery object, you must specify either Expression or MetricStat but not both.",
  ).optional(),
  Id: z.string().describe(
    "A short name used to tie this object to the results in the response. This name must be unique within a single call to GetMetricData. If you are performing math expressions on this set of data, this name represents that data and can serve as a variable in the mathematical expression. The valid characters are letters, numbers, and underscore. The first character must be a lowercase letter.",
  ),
  ReturnData: z.boolean().describe(
    "This option indicates whether to return the timestamps and raw data values of this metric. When you create an alarm based on a metric math expression, specify True for this value for only the one math expression that the alarm is based on. You must specify False for ReturnData for all the other metrics and expressions used in the alarm. This field is required.",
  ).optional(),
  Expression: z.string().describe(
    "The math expression to be performed on the returned data, if this object is performing a math expression. This expression can use the Id of the other metrics to refer to those metrics, and can also use the Id of other expressions to use the result of those expressions. For more information about metric math expressions, see [Metric Math Syntax and Functions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html#metric-math-syntax) in the *User Guide*. Within each MetricDataQuery object, you must specify either Expression or MetricStat but not both.",
  ).optional(),
  Period: z.number().int().describe(
    "The granularity, in seconds, of the returned data points. For metrics with regular resolution, a period can be as short as one minute (60 seconds) and must be a multiple of 60. For high-resolution metrics that are collected at intervals of less than one minute, the period can be 1, 5, 10, 20, 30, 60, or any multiple of 60. High-resolution metrics are those metrics stored by a PutMetricData operation that includes a StorageResolution of 1 second.",
  ).optional(),
  AccountId: z.string().describe(
    "The ID of the account where the metrics are located, if this is a cross-account alarm.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A string that you can use to assign a value. The combination of tag keys and values can help you organize and categorize your resources.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the specified tag key.",
  ),
});

const AlarmPromQLCriteriaSchema = z.object({
  Query: z.string().describe(
    "The PromQL query that the alarm evaluates. The query must return a result of vector type. Each entry in the vector result represents an alarm contributor.",
  ).optional(),
  PendingPeriod: z.number().int().describe(
    "The duration, in seconds, that a contributor must be continuously breaching before it transitions to the ALARM state.",
  ).optional(),
  RecoveryPeriod: z.number().int().describe(
    "The duration, in seconds, that a contributor must continuously not be breaching before it transitions back to the OK state.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  ThresholdMetricId: z.string().describe(
    "In an alarm based on an anomaly detection model, this is the ID of the ANOMALY_DETECTION_BAND function used as the threshold for the alarm.",
  ).optional(),
  EvaluateLowSampleCountPercentile: z.string().describe(
    "Used only for alarms based on percentiles. If ignore, the alarm state does not change during periods with too few data points to be statistically significant. If evaluate or this parameter is not used, the alarm is always evaluated and possibly changes state no matter how many data points are available.",
  ).optional(),
  ExtendedStatistic: z.string().describe(
    "The percentile statistic for the metric associated with the alarm. Specify a value between p0.0 and p100. For an alarm based on a metric, you must specify either Statistic or ExtendedStatistic but not both. For an alarm based on a math expression, you can't specify ExtendedStatistic. Instead, you use Metrics.",
  ).optional(),
  ComparisonOperator: z.string().describe(
    "The arithmetic operation to use when comparing the specified statistic and threshold. The specified statistic value is used as the first operand.",
  ).optional(),
  TreatMissingData: z.string().describe(
    "Sets how this alarm is to handle missing data points. Valid values are breaching, notBreaching, ignore, and missing. For more information, see [Configuring How Alarms Treat Missing Data](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data) in the *Amazon User Guide*. If you omit this parameter, the default behavior of missing is used.",
  ).optional(),
  Dimensions: z.array(DimensionSchema).describe(
    "The dimensions for the metric associated with the alarm. For an alarm based on a math expression, you can't specify Dimensions. Instead, you use Metrics.",
  ).optional(),
  Period: z.number().int().describe(
    "The period, in seconds, over which the statistic is applied. This is required for an alarm based on a metric. Valid values are 10, 20, 30, 60, and any multiple of 60. For an alarm based on a math expression, you can't specify Period, and instead you use the Metrics parameter. *Minimum:* 10",
  ).optional(),
  EvaluationPeriods: z.number().int().describe(
    'The number of periods over which data is compared to the specified threshold. If you are setting an alarm that requires that a number of consecutive data points be breaching to trigger the alarm, this value specifies that number. If you are setting an "M out of N" alarm, this value is the N, and DatapointsToAlarm is the M. For more information, see [Evaluating an Alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation) in the *User Guide*.',
  ).optional(),
  Unit: z.string().describe(
    "The unit of the metric associated with the alarm. Specify this only if you are creating an alarm based on a single metric. Do not specify this if you are specifying a Metrics array. You can specify the following values: Seconds, Microseconds, Milliseconds, Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, Bits, Kilobits, Megabits, Gigabits, Terabits, Percent, Count, Bytes/Second, Kilobytes/Second, Megabytes/Second, Gigabytes/Second, Terabytes/Second, Bits/Second, Kilobits/Second, Megabits/Second, Gigabits/Second, Terabits/Second, Count/Second, or None.",
  ).optional(),
  Namespace: z.string().describe(
    "The namespace of the metric associated with the alarm. This is required for an alarm based on a metric. For an alarm based on a math expression, you can't specify Namespace and you use Metrics instead. For a list of namespaces for metrics from AWS services, see [Services That Publish Metrics.](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html)",
  ).optional(),
  OKActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the OK state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  AlarmActions: z.array(z.string()).describe(
    "The list of actions to execute when this alarm transitions into an ALARM state from any other state. Specify each action as an Amazon Resource Name (ARN). For more information about creating alarms and the actions that you can specify, see [PutMetricAlarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricAlarm.html) in the *API Reference*.",
  ).optional(),
  MetricName: z.string().describe(
    "The name of the metric associated with the alarm. This is required for an alarm based on a metric. For an alarm based on a math expression, you use Metrics instead and you can't specify MetricName.",
  ).optional(),
  ActionsEnabled: z.boolean().describe(
    "Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.",
  ).optional(),
  Metrics: z.array(MetricDataQuerySchema).describe(
    "An array that enables you to create an alarm based on the result of a metric math expression. Each item in the array either retrieves a metric or performs a math expression. If you specify the Metrics parameter, you cannot specify MetricName, Dimensions, Period, Namespace, Statistic, ExtendedStatistic, or Unit.",
  ).optional(),
  AlarmDescription: z.string().describe("The description of the alarm.")
    .optional(),
  AlarmName: z.string().describe(
    "The name of the alarm. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the alarm name. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  Statistic: z.string().describe(
    "The statistic for the metric associated with the alarm, other than percentile. For percentile statistics, use ExtendedStatistic. For an alarm based on a metric, you must specify either Statistic or ExtendedStatistic but not both. For an alarm based on a math expression, you can't specify Statistic. Instead, you use Metrics.",
  ).optional(),
  InsufficientDataActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  DatapointsToAlarm: z.number().int().describe(
    'The number of datapoints that must be breaching to trigger the alarm. This is used only if you are setting an "M out of N" alarm. In that case, this value is the M, and the value that you set for EvaluationPeriods is the N value. For more information, see [Evaluating an Alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation) in the *User Guide*. If you omit this parameter, CW uses the same value here that you set for EvaluationPeriods, and the alarm goes to alarm state if that many consecutive periods are breaching.',
  ).optional(),
  Threshold: z.number().describe(
    "The value to compare with the specified statistic.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the alarm. You can associate as many as 50 tags with an alarm. To be able to associate tags with the alarm when you create the alarm, you must have the cloudwatch:TagResource permission. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.",
  ).optional(),
  EvaluationCriteria: z.object({
    PromQLCriteria: AlarmPromQLCriteriaSchema.describe(
      "The PromQL criteria for the alarm evaluation.",
    ).optional(),
  }).describe("The evaluation criteria for the alarm.").optional(),
  EvaluationInterval: z.number().int().describe(
    "The frequency, in seconds, at which the alarm is evaluated.",
  ).optional(),
});

const StateSchema = z.object({
  ThresholdMetricId: z.string().optional(),
  EvaluateLowSampleCountPercentile: z.string().optional(),
  ExtendedStatistic: z.string().optional(),
  ComparisonOperator: z.string().optional(),
  TreatMissingData: z.string().optional(),
  Dimensions: z.array(DimensionSchema).optional(),
  Period: z.number().optional(),
  EvaluationPeriods: z.number().optional(),
  Unit: z.string().optional(),
  Namespace: z.string().optional(),
  OKActions: z.array(z.string()).optional(),
  AlarmActions: z.array(z.string()).optional(),
  MetricName: z.string().optional(),
  ActionsEnabled: z.boolean().optional(),
  Metrics: z.array(MetricDataQuerySchema).optional(),
  AlarmDescription: z.string().optional(),
  AlarmName: z.string(),
  Statistic: z.string().optional(),
  InsufficientDataActions: z.array(z.string()).optional(),
  Arn: z.string().optional(),
  DatapointsToAlarm: z.number().optional(),
  Threshold: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  EvaluationCriteria: z.object({
    PromQLCriteria: AlarmPromQLCriteriaSchema,
  }).optional(),
  EvaluationInterval: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ThresholdMetricId: z.string().describe(
    "In an alarm based on an anomaly detection model, this is the ID of the ANOMALY_DETECTION_BAND function used as the threshold for the alarm.",
  ).optional(),
  EvaluateLowSampleCountPercentile: z.string().describe(
    "Used only for alarms based on percentiles. If ignore, the alarm state does not change during periods with too few data points to be statistically significant. If evaluate or this parameter is not used, the alarm is always evaluated and possibly changes state no matter how many data points are available.",
  ).optional(),
  ExtendedStatistic: z.string().describe(
    "The percentile statistic for the metric associated with the alarm. Specify a value between p0.0 and p100. For an alarm based on a metric, you must specify either Statistic or ExtendedStatistic but not both. For an alarm based on a math expression, you can't specify ExtendedStatistic. Instead, you use Metrics.",
  ).optional(),
  ComparisonOperator: z.string().describe(
    "The arithmetic operation to use when comparing the specified statistic and threshold. The specified statistic value is used as the first operand.",
  ).optional(),
  TreatMissingData: z.string().describe(
    "Sets how this alarm is to handle missing data points. Valid values are breaching, notBreaching, ignore, and missing. For more information, see [Configuring How Alarms Treat Missing Data](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data) in the *Amazon User Guide*. If you omit this parameter, the default behavior of missing is used.",
  ).optional(),
  Dimensions: z.array(DimensionSchema).describe(
    "The dimensions for the metric associated with the alarm. For an alarm based on a math expression, you can't specify Dimensions. Instead, you use Metrics.",
  ).optional(),
  Period: z.number().int().describe(
    "The period, in seconds, over which the statistic is applied. This is required for an alarm based on a metric. Valid values are 10, 20, 30, 60, and any multiple of 60. For an alarm based on a math expression, you can't specify Period, and instead you use the Metrics parameter. *Minimum:* 10",
  ).optional(),
  EvaluationPeriods: z.number().int().describe(
    'The number of periods over which data is compared to the specified threshold. If you are setting an alarm that requires that a number of consecutive data points be breaching to trigger the alarm, this value specifies that number. If you are setting an "M out of N" alarm, this value is the N, and DatapointsToAlarm is the M. For more information, see [Evaluating an Alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation) in the *User Guide*.',
  ).optional(),
  Unit: z.string().describe(
    "The unit of the metric associated with the alarm. Specify this only if you are creating an alarm based on a single metric. Do not specify this if you are specifying a Metrics array. You can specify the following values: Seconds, Microseconds, Milliseconds, Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, Bits, Kilobits, Megabits, Gigabits, Terabits, Percent, Count, Bytes/Second, Kilobytes/Second, Megabytes/Second, Gigabytes/Second, Terabytes/Second, Bits/Second, Kilobits/Second, Megabits/Second, Gigabits/Second, Terabits/Second, Count/Second, or None.",
  ).optional(),
  Namespace: z.string().describe(
    "The namespace of the metric associated with the alarm. This is required for an alarm based on a metric. For an alarm based on a math expression, you can't specify Namespace and you use Metrics instead. For a list of namespaces for metrics from AWS services, see [Services That Publish Metrics.](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html)",
  ).optional(),
  OKActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the OK state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  AlarmActions: z.array(z.string()).describe(
    "The list of actions to execute when this alarm transitions into an ALARM state from any other state. Specify each action as an Amazon Resource Name (ARN). For more information about creating alarms and the actions that you can specify, see [PutMetricAlarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricAlarm.html) in the *API Reference*.",
  ).optional(),
  MetricName: z.string().describe(
    "The name of the metric associated with the alarm. This is required for an alarm based on a metric. For an alarm based on a math expression, you use Metrics instead and you can't specify MetricName.",
  ).optional(),
  ActionsEnabled: z.boolean().describe(
    "Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.",
  ).optional(),
  Metrics: z.array(MetricDataQuerySchema).describe(
    "An array that enables you to create an alarm based on the result of a metric math expression. Each item in the array either retrieves a metric or performs a math expression. If you specify the Metrics parameter, you cannot specify MetricName, Dimensions, Period, Namespace, Statistic, ExtendedStatistic, or Unit.",
  ).optional(),
  AlarmDescription: z.string().describe("The description of the alarm.")
    .optional(),
  AlarmName: z.string().describe(
    "The name of the alarm. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the alarm name. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  Statistic: z.string().describe(
    "The statistic for the metric associated with the alarm, other than percentile. For percentile statistics, use ExtendedStatistic. For an alarm based on a metric, you must specify either Statistic or ExtendedStatistic but not both. For an alarm based on a math expression, you can't specify Statistic. Instead, you use Metrics.",
  ).optional(),
  InsufficientDataActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  DatapointsToAlarm: z.number().int().describe(
    'The number of datapoints that must be breaching to trigger the alarm. This is used only if you are setting an "M out of N" alarm. In that case, this value is the M, and the value that you set for EvaluationPeriods is the N value. For more information, see [Evaluating an Alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation) in the *User Guide*. If you omit this parameter, CW uses the same value here that you set for EvaluationPeriods, and the alarm goes to alarm state if that many consecutive periods are breaching.',
  ).optional(),
  Threshold: z.number().describe(
    "The value to compare with the specified statistic.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the alarm. You can associate as many as 50 tags with an alarm. To be able to associate tags with the alarm when you create the alarm, you must have the cloudwatch:TagResource permission. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.",
  ).optional(),
  EvaluationCriteria: z.object({
    PromQLCriteria: AlarmPromQLCriteriaSchema.describe(
      "The PromQL criteria for the alarm evaluation.",
    ).optional(),
  }).describe("The evaluation criteria for the alarm.").optional(),
  EvaluationInterval: z.number().int().describe(
    "The frequency, in seconds, at which the alarm is evaluated.",
  ).optional(),
});

/** Swamp extension model for CloudWatch Alarm. Registered at `@swamp/aws/cloudwatch/alarm`. */
export const model = {
  type: "@swamp/aws/cloudwatch/alarm",
  version: "2026.06.05.1",
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
      toVersion: "2026.04.19.1",
      description: "Added: EvaluationCriteria, EvaluationInterval",
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
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch Alarm resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch Alarm",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudWatch::Alarm",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.AlarmName ?? g.AlarmName)?.toString() ?? "current").replace(
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
      description: "Get a CloudWatch Alarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch Alarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudWatch::Alarm",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.AlarmName ?? context.globalArgs.AlarmName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a CloudWatch Alarm",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.AlarmName?.toString() ?? "current").replace(
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
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudWatch::Alarm",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudWatch::Alarm",
          identifier,
          currentState,
          desiredState,
          ["AlarmName"],
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
      description: "Delete a CloudWatch Alarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch Alarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudWatch::Alarm",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.AlarmName?.toString() ?? args.identifier).replace(
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
      description: "Sync CloudWatch Alarm state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.AlarmName?.toString() ?? "current").replace(
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
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudWatch::Alarm",
            identifier,
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
