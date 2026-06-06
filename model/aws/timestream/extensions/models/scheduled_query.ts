// Auto-generated extension model for @swamp/aws/timestream/scheduled-query
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Timestream ScheduledQuery (AWS::Timestream::ScheduledQuery).
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

const SnsConfigurationSchema = z.object({
  TopicArn: z.string().min(1).max(2048).describe(
    "SNS topic ARN that the scheduled query status notifications will be sent to.",
  ),
});

const DimensionMappingSchema = z.object({
  Name: z.string().describe("Column name from query result."),
  DimensionValueType: z.enum(["VARCHAR"]).describe("Type for the dimension."),
});

const MultiMeasureAttributeMappingSchema = z.object({
  SourceColumn: z.string().describe(
    "Source measure value column in the query result where the attribute value is to be read.",
  ),
  MeasureValueType: z.enum([
    "BIGINT",
    "BOOLEAN",
    "DOUBLE",
    "VARCHAR",
    "TIMESTAMP",
  ]).describe(
    "Value type of the measure value column to be read from the query result.",
  ),
  TargetMultiMeasureAttributeName: z.string().describe(
    "Custom name to be used for attribute name in derived table. If not provided, source column name would be used.",
  ).optional(),
});

const MultiMeasureMappingsSchema = z.object({
  TargetMultiMeasureName: z.string().describe(
    "Name of the target multi-measure in the derived table. Required if MeasureNameColumn is not provided. If MeasureNameColumn is provided then the value from that column will be used as the multi-measure name.",
  ).optional(),
  MultiMeasureAttributeMappings: z.array(MultiMeasureAttributeMappingSchema)
    .describe(
      "Required. Attribute mappings to be used for mapping query results to ingest data for multi-measure attributes.",
    ),
});

const MixedMeasureMappingSchema = z.object({
  MeasureName: z.string().describe(
    "Refers to the value of the measure name in a result row. This field is required if MeasureNameColumn is provided.",
  ).optional(),
  SourceColumn: z.string().describe(
    "This field refers to the source column from which the measure value is to be read for result materialization.",
  ).optional(),
  TargetMeasureName: z.string().describe(
    "Target measure name to be used. If not provided, the target measure name by default would be MeasureName if provided, or SourceColumn otherwise.",
  ).optional(),
  MeasureValueType: z.enum(["BIGINT", "BOOLEAN", "DOUBLE", "VARCHAR", "MULTI"])
    .describe(
      "Type of the value that is to be read from SourceColumn. If the mapping is for MULTI, use MeasureValueType.MULTI.",
    ),
  MultiMeasureAttributeMappings: z.array(MultiMeasureAttributeMappingSchema)
    .describe(
      "Required. Attribute mappings to be used for mapping query results to ingest data for multi-measure attributes.",
    ).optional(),
});

const TimestreamConfigurationSchema = z.object({
  DatabaseName: z.string().describe(
    "Name of Timestream database to which the query result will be written.",
  ),
  TableName: z.string().describe(
    "Name of Timestream table that the query result will be written to. The table should be within the same database that is provided in Timestream configuration.",
  ),
  TimeColumn: z.string().describe(
    "Column from query result that should be used as the time column in destination table. Column type for this should be TIMESTAMP.",
  ),
  DimensionMappings: z.array(DimensionMappingSchema).describe(
    "This is to allow mapping column(s) from the query result to the dimension in the destination table.",
  ),
  MultiMeasureMappings: MultiMeasureMappingsSchema.describe(
    "Only one of MixedMeasureMappings or MultiMeasureMappings is to be provided. MultiMeasureMappings can be used to ingest data as multi measures in the derived table.",
  ).optional(),
  MixedMeasureMappings: z.array(MixedMeasureMappingSchema).describe(
    "Specifies how to map measures to multi-measure records.",
  ).optional(),
  MeasureNameColumn: z.string().describe(
    "Name of the measure name column from the query result.",
  ).optional(),
});

const S3ConfigurationSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(
    new RegExp("[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]"),
  ).describe(
    "Name of the S3 bucket under which error reports will be created.",
  ),
  ObjectKeyPrefix: z.string().min(1).max(896).regex(
    new RegExp("[a-zA-Z0-9|!\\-_*'\\(\\)]([a-zA-Z0-9]|[!\\-_*'\\(\\)\\/.])+"),
  ).describe("Prefix for error report keys.").optional(),
  EncryptionOption: z.enum(["SSE_S3", "SSE_KMS"]).describe(
    "Encryption at rest options for the error reports. If no encryption option is specified, Timestream will choose SSE_S3 as default.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
  ScheduledQueryName: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9_.-]+"),
  ).describe(
    "The name of the scheduled query. Scheduled query names must be unique within each Region.",
  ).optional(),
  QueryString: z.string().min(1).max(262144).describe(
    "The query string to run. Parameter names can be specified in the query string @ character followed by an identifier. The named Parameter @scheduled_runtime is reserved and can be used in the query to get the time at which the query is scheduled to run. The timestamp calculated according to the ScheduleConfiguration parameter, will be the value of @scheduled_runtime paramater for each query run. For example, consider an instance of a scheduled query executing on 2021-12-01 00:00:00. For this instance, the @scheduled_runtime parameter is initialized to the timestamp 2021-12-01 00:00:00 when invoking the query.",
  ),
  ScheduleConfiguration: z.object({
    ScheduleExpression: z.string().min(1).max(256).describe(
      "An expression that denotes when to trigger the scheduled query run. This can be a cron expression or a rate expression.",
    ),
  }).describe("Configuration for when the scheduled query is executed."),
  NotificationConfiguration: z.object({
    SnsConfiguration: SnsConfigurationSchema.describe(
      "SNS configuration for notification upon scheduled query execution.",
    ),
  }).describe(
    "Notification configuration for the scheduled query. A notification is sent by Timestream when a query run finishes, when the state is updated or when you delete it.",
  ),
  ClientToken: z.string().min(32).max(128).describe(
    "Using a ClientToken makes the call to CreateScheduledQuery idempotent, in other words, making the same request repeatedly will produce the same result. Making multiple identical CreateScheduledQuery requests has the same effect as making a single request. If CreateScheduledQuery is called without a ClientToken, the Query SDK generates a ClientToken on your behalf. After 8 hours, any request with the same ClientToken is treated as a new request.",
  ).optional(),
  ScheduledQueryExecutionRoleArn: z.string().min(1).max(2048).describe(
    "The ARN for the IAM role that Timestream will assume when running the scheduled query.",
  ),
  TargetConfiguration: z.object({
    TimestreamConfiguration: TimestreamConfigurationSchema.describe(
      "Configuration needed to write data into the Timestream database and table.",
    ),
  }).describe(
    "Configuration of target store where scheduled query results are written to.",
  ).optional(),
  ErrorReportConfiguration: z.object({
    S3Configuration: S3ConfigurationSchema.describe(
      "Details on S3 location for error reports that result from running a query.",
    ),
  }).describe(
    "Configuration for error reporting. Error reports will be generated when a problem is encountered when writing the query results.",
  ),
  KmsKeyId: z.string().min(1).max(2048).describe(
    "The Amazon KMS key used to encrypt the scheduled query resource, at-rest. If the Amazon KMS key is not specified, the scheduled query resource will be encrypted with a Timestream owned Amazon KMS key. To specify a KMS key, use the key ID, key ARN, alias name, or alias ARN. When using an alias name, prefix the name with alias/. If ErrorReportConfiguration uses SSE_KMS as encryption type, the same KmsKeyId is used to encrypt the error report at rest.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to label the scheduled query.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ScheduledQueryName: z.string().optional(),
  QueryString: z.string().optional(),
  ScheduleConfiguration: z.object({
    ScheduleExpression: z.string(),
  }).optional(),
  NotificationConfiguration: z.object({
    SnsConfiguration: SnsConfigurationSchema,
  }).optional(),
  ClientToken: z.string().optional(),
  ScheduledQueryExecutionRoleArn: z.string().optional(),
  TargetConfiguration: z.object({
    TimestreamConfiguration: TimestreamConfigurationSchema,
  }).optional(),
  ErrorReportConfiguration: z.object({
    S3Configuration: S3ConfigurationSchema,
  }).optional(),
  KmsKeyId: z.string().optional(),
  SQName: z.string().optional(),
  SQQueryString: z.string().optional(),
  SQScheduleConfiguration: z.string().optional(),
  SQNotificationConfiguration: z.string().optional(),
  SQScheduledQueryExecutionRoleArn: z.string().optional(),
  SQTargetConfiguration: z.string().optional(),
  SQErrorReportConfiguration: z.string().optional(),
  SQKmsKeyId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ScheduledQueryName: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9_.-]+"),
  ).describe(
    "The name of the scheduled query. Scheduled query names must be unique within each Region.",
  ).optional(),
  QueryString: z.string().min(1).max(262144).describe(
    "The query string to run. Parameter names can be specified in the query string @ character followed by an identifier. The named Parameter @scheduled_runtime is reserved and can be used in the query to get the time at which the query is scheduled to run. The timestamp calculated according to the ScheduleConfiguration parameter, will be the value of @scheduled_runtime paramater for each query run. For example, consider an instance of a scheduled query executing on 2021-12-01 00:00:00. For this instance, the @scheduled_runtime parameter is initialized to the timestamp 2021-12-01 00:00:00 when invoking the query.",
  ).optional(),
  ScheduleConfiguration: z.object({
    ScheduleExpression: z.string().min(1).max(256).describe(
      "An expression that denotes when to trigger the scheduled query run. This can be a cron expression or a rate expression.",
    ).optional(),
  }).describe("Configuration for when the scheduled query is executed.")
    .optional(),
  NotificationConfiguration: z.object({
    SnsConfiguration: SnsConfigurationSchema.describe(
      "SNS configuration for notification upon scheduled query execution.",
    ).optional(),
  }).describe(
    "Notification configuration for the scheduled query. A notification is sent by Timestream when a query run finishes, when the state is updated or when you delete it.",
  ).optional(),
  ClientToken: z.string().min(32).max(128).describe(
    "Using a ClientToken makes the call to CreateScheduledQuery idempotent, in other words, making the same request repeatedly will produce the same result. Making multiple identical CreateScheduledQuery requests has the same effect as making a single request. If CreateScheduledQuery is called without a ClientToken, the Query SDK generates a ClientToken on your behalf. After 8 hours, any request with the same ClientToken is treated as a new request.",
  ).optional(),
  ScheduledQueryExecutionRoleArn: z.string().min(1).max(2048).describe(
    "The ARN for the IAM role that Timestream will assume when running the scheduled query.",
  ).optional(),
  TargetConfiguration: z.object({
    TimestreamConfiguration: TimestreamConfigurationSchema.describe(
      "Configuration needed to write data into the Timestream database and table.",
    ).optional(),
  }).describe(
    "Configuration of target store where scheduled query results are written to.",
  ).optional(),
  ErrorReportConfiguration: z.object({
    S3Configuration: S3ConfigurationSchema.describe(
      "Details on S3 location for error reports that result from running a query.",
    ).optional(),
  }).describe(
    "Configuration for error reporting. Error reports will be generated when a problem is encountered when writing the query results.",
  ).optional(),
  KmsKeyId: z.string().min(1).max(2048).describe(
    "The Amazon KMS key used to encrypt the scheduled query resource, at-rest. If the Amazon KMS key is not specified, the scheduled query resource will be encrypted with a Timestream owned Amazon KMS key. To specify a KMS key, use the key ID, key ARN, alias name, or alias ARN. When using an alias name, prefix the name with alias/. If ErrorReportConfiguration uses SSE_KMS as encryption type, the same KmsKeyId is used to encrypt the error report at rest.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to label the scheduled query.",
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

/** Swamp extension model for Timestream ScheduledQuery. Registered at `@swamp/aws/timestream/scheduled-query`. */
export const model = {
  type: "@swamp/aws/timestream/scheduled-query",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Timestream ScheduledQuery resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Timestream ScheduledQuery",
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
          "AWS::Timestream::ScheduledQuery",
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
      description: "Get a Timestream ScheduledQuery",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream ScheduledQuery",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Timestream::ScheduledQuery",
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
      description: "Update a Timestream ScheduledQuery",
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
          "AWS::Timestream::ScheduledQuery",
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
          "AWS::Timestream::ScheduledQuery",
          identifier,
          currentState,
          desiredState,
          [
            "ScheduledQueryName",
            "QueryString",
            "ScheduleConfiguration",
            "NotificationConfiguration",
            "ScheduledQueryExecutionRoleArn",
            "TargetConfiguration",
            "ErrorReportConfiguration",
            "KmsKeyId",
          ],
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
      description: "Delete a Timestream ScheduledQuery",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream ScheduledQuery",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Timestream::ScheduledQuery",
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
      description: "Sync Timestream ScheduledQuery state from AWS",
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
            "AWS::Timestream::ScheduledQuery",
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
