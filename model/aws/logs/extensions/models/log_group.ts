// Auto-generated extension model for @swamp/aws/logs/log-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Logs LogGroup (AWS::Logs::LogGroup).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256).describe(
    "The value of this key-value pair.",
  ),
});

const GlobalArgsSchema = z.object({
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("^[.\\-_/#A-Za-z0-9]{1,512}$"),
  ).describe(
    "The name of the log group. If you don't specify a name, CFNlong generates a unique ID for the log group.",
  ).optional(),
  KmsKeyId: z.string().max(256).regex(
    new RegExp("^arn:[a-z0-9-]+:kms:[a-z0-9-]+:\\d{12}:(key|alias)/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data. To associate an KMS key with the log group, specify the ARN of that KMS key here. If you do so, ingested data is encrypted using this key. This association is stored as long as the data encrypted with the KMS key is still within CWL. This enables CWL to decrypt this data whenever it is requested. If you attempt to associate a KMS key with the log group but the KMS key doesn't exist or is deactivated, you will receive an InvalidParameterException error. Log group data is always encrypted in CWL. If you omit this key, the encryption does not use KMS. For more information, see [Encrypt log data in using](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html)",
  ).optional(),
  DataProtectionPolicy: z.record(z.string(), z.unknown()).describe(
    "Creates a data protection policy and assigns it to the log group. A data protection policy can help safeguard sensitive data that's ingested by the log group by auditing and masking the sensitive log data. When a user who does not have permission to view masked data views a log event that includes masked data, the sensitive data is replaced by asterisks.",
  ).optional(),
  FieldIndexPolicies: z.array(z.record(z.string(), z.unknown())).describe(
    "Creates or updates a *field index policy* for the specified log group. Only log groups in the Standard log class support field index policies. For more information about log classes, see [Log classes](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html). You can use field index policies to create *field indexes* on fields found in log events in the log group. Creating field indexes lowers the costs for CWL Insights queries that reference those field indexes, because these queries attempt to skip the processing of log events that are known to not match the indexed field. Good fields to index are fields that you often need to query for and fields that have high cardinality of values Common examples of indexes include request ID, session ID, userID, and instance IDs. For more information, see [Create field indexes to improve query performance and reduce costs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs-Field-Indexing.html). Currently, this array supports only one field index policy object.",
  ).optional(),
  LogGroupClass: z.enum(["STANDARD", "INFREQUENT_ACCESS", "DELIVERY"]).describe(
    "Specifies the log group class for this log group. There are two classes: The Standard log class supports all CWL features. The Infrequent Access log class supports a subset of CWL features and incurs lower costs. For details about the features supported by each class, see [Log classes](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html)",
  ).optional(),
  RetentionInDays: z.union([
    z.literal(1),
    z.literal(3),
    z.literal(5),
    z.literal(7),
    z.literal(14),
    z.literal(30),
    z.literal(60),
    z.literal(90),
    z.literal(120),
    z.literal(150),
    z.literal(180),
    z.literal(365),
    z.literal(400),
    z.literal(545),
    z.literal(731),
    z.literal(1096),
    z.literal(1827),
    z.literal(2192),
    z.literal(2557),
    z.literal(2922),
    z.literal(3288),
    z.literal(3653),
  ]).describe(
    "The number of days to retain the log events in the specified log group. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, and 3653. To set a log group so that its log events do not expire, do not specify this property.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the log group. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
  ResourcePolicyDocument: z.record(z.string(), z.unknown()).describe(
    "Creates or updates a resource policy for the specified log group that allows other services to put log events to this account. A LogGroup can have 1 resource policy.",
  ).optional(),
  DeletionProtectionEnabled: z.boolean().describe(
    "Indicates whether deletion protection is enabled for this log group. When enabled, deletion protection blocks all deletion operations until it is explicitly disabled.",
  ).optional(),
  BearerTokenAuthenticationEnabled: z.boolean().describe(
    "Indicates whether bearer token authentication is enabled for this log group. When enabled, bearer token authentication is allowed on operations until it is explicitly disabled.",
  ).optional(),
});

const StateSchema = z.object({
  LogGroupName: z.string(),
  KmsKeyId: z.string().optional(),
  DataProtectionPolicy: z.record(z.string(), z.unknown()).optional(),
  FieldIndexPolicies: z.array(z.record(z.string(), z.unknown())).optional(),
  LogGroupClass: z.string().optional(),
  RetentionInDays: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  ResourcePolicyDocument: z.record(z.string(), z.unknown()).optional(),
  DeletionProtectionEnabled: z.boolean().optional(),
  BearerTokenAuthenticationEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("^[.\\-_/#A-Za-z0-9]{1,512}$"),
  ).describe(
    "The name of the log group. If you don't specify a name, CFNlong generates a unique ID for the log group.",
  ).optional(),
  KmsKeyId: z.string().max(256).regex(
    new RegExp("^arn:[a-z0-9-]+:kms:[a-z0-9-]+:\\d{12}:(key|alias)/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data. To associate an KMS key with the log group, specify the ARN of that KMS key here. If you do so, ingested data is encrypted using this key. This association is stored as long as the data encrypted with the KMS key is still within CWL. This enables CWL to decrypt this data whenever it is requested. If you attempt to associate a KMS key with the log group but the KMS key doesn't exist or is deactivated, you will receive an InvalidParameterException error. Log group data is always encrypted in CWL. If you omit this key, the encryption does not use KMS. For more information, see [Encrypt log data in using](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html)",
  ).optional(),
  DataProtectionPolicy: z.record(z.string(), z.unknown()).describe(
    "Creates a data protection policy and assigns it to the log group. A data protection policy can help safeguard sensitive data that's ingested by the log group by auditing and masking the sensitive log data. When a user who does not have permission to view masked data views a log event that includes masked data, the sensitive data is replaced by asterisks.",
  ).optional(),
  FieldIndexPolicies: z.array(z.record(z.string(), z.unknown())).describe(
    "Creates or updates a *field index policy* for the specified log group. Only log groups in the Standard log class support field index policies. For more information about log classes, see [Log classes](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html). You can use field index policies to create *field indexes* on fields found in log events in the log group. Creating field indexes lowers the costs for CWL Insights queries that reference those field indexes, because these queries attempt to skip the processing of log events that are known to not match the indexed field. Good fields to index are fields that you often need to query for and fields that have high cardinality of values Common examples of indexes include request ID, session ID, userID, and instance IDs. For more information, see [Create field indexes to improve query performance and reduce costs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs-Field-Indexing.html). Currently, this array supports only one field index policy object.",
  ).optional(),
  LogGroupClass: z.enum(["STANDARD", "INFREQUENT_ACCESS", "DELIVERY"]).describe(
    "Specifies the log group class for this log group. There are two classes: The Standard log class supports all CWL features. The Infrequent Access log class supports a subset of CWL features and incurs lower costs. For details about the features supported by each class, see [Log classes](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html)",
  ).optional(),
  RetentionInDays: z.union([
    z.literal(1),
    z.literal(3),
    z.literal(5),
    z.literal(7),
    z.literal(14),
    z.literal(30),
    z.literal(60),
    z.literal(90),
    z.literal(120),
    z.literal(150),
    z.literal(180),
    z.literal(365),
    z.literal(400),
    z.literal(545),
    z.literal(731),
    z.literal(1096),
    z.literal(1827),
    z.literal(2192),
    z.literal(2557),
    z.literal(2922),
    z.literal(3288),
    z.literal(3653),
  ]).describe(
    "The number of days to retain the log events in the specified log group. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, and 3653. To set a log group so that its log events do not expire, do not specify this property.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the log group. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
  ResourcePolicyDocument: z.record(z.string(), z.unknown()).describe(
    "Creates or updates a resource policy for the specified log group that allows other services to put log events to this account. A LogGroup can have 1 resource policy.",
  ).optional(),
  DeletionProtectionEnabled: z.boolean().describe(
    "Indicates whether deletion protection is enabled for this log group. When enabled, deletion protection blocks all deletion operations until it is explicitly disabled.",
  ).optional(),
  BearerTokenAuthenticationEnabled: z.boolean().describe(
    "Indicates whether bearer token authentication is enabled for this log group. When enabled, bearer token authentication is allowed on operations until it is explicitly disabled.",
  ).optional(),
});

/** Swamp extension model for Logs LogGroup. Registered at `@swamp/aws/logs/log-group`. */
export const model = {
  type: "@swamp/aws/logs/log-group",
  version: "2026.05.27.1",
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
      toVersion: "2026.04.22.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Logs LogGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs LogGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::LogGroup",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.LogGroupName ?? g.LogGroupName)?.toString() ?? "current")
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
      description: "Get a Logs LogGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs LogGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Logs::LogGroup",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.LogGroupName ?? context.globalArgs.LogGroupName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Logs LogGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.LogGroupName?.toString() ?? "current").replace(
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
        const identifier = existing.LogGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Logs::LogGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::LogGroup",
          identifier,
          currentState,
          desiredState,
          ["LogGroupName"],
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
      description: "Delete a Logs LogGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs LogGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Logs::LogGroup",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.LogGroupName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Logs LogGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.LogGroupName?.toString() ?? "current").replace(
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
        const identifier = existing.LogGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::LogGroup",
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
