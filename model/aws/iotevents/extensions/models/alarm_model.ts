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

// Auto-generated extension model for @swamp/aws/iotevents/alarm-model
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTEvents AlarmModel (AWS::IoTEvents::AlarmModel).
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

const SimpleRuleSchema = z.object({
  InputProperty: z.string().min(1).max(512).describe(
    "The value on the left side of the comparison operator. You can specify an ITE input attribute as an input property.",
  ),
  ComparisonOperator: z.enum([
    "GREATER",
    "GREATER_OR_EQUAL",
    "LESS",
    "LESS_OR_EQUAL",
    "EQUAL",
    "NOT_EQUAL",
  ]).describe("The comparison operator."),
  Threshold: z.string().min(1).max(512).describe(
    "The value on the right side of the comparison operator. You can enter a number or specify an ITE input attribute.",
  ),
});

const PayloadSchema = z.object({
  ContentExpression: z.string().min(1).describe(
    "The content of the payload. You can use a string expression that includes quoted strings ( ''), variables ( $variable.), input values ( $input..), string concatenations, and quoted strings that contain ${} as the content. The recommended maximum size of a content expression is 1 KB.",
  ),
  Type: z.string().describe(
    "The value of the payload type can be either STRING or JSON.",
  ),
});

const DynamoDBSchema = z.object({
  HashKeyField: z.string().describe(
    "The name of the hash key (also called the partition key). The hashKeyField value must match the partition key of the target DynamoDB table.",
  ),
  HashKeyType: z.string().describe(
    "The data type for the hash key (also called the partition key). You can specify the following values: 'STRING' - The hash key is a string. 'NUMBER' - The hash key is a number. If you don't specify hashKeyType, the default value is 'STRING'.",
  ).optional(),
  HashKeyValue: z.string().describe(
    "The value of the hash key (also called the partition key).",
  ),
  Operation: z.string().describe(
    "The type of operation to perform. You can specify the following values: 'INSERT' - Insert data as a new item into the DynamoDB table. This item uses the specified hash key as a partition key. If you specified a range key, the item uses the range key as a sort key. 'UPDATE' - Update an existing item of the DynamoDB table with new data. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key. 'DELETE' - Delete an existing item of the DynamoDB table. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key. If you don't specify this parameter, ITE triggers the 'INSERT' operation.",
  ).optional(),
  Payload: PayloadSchema.describe(
    "Information needed to configure the payload. By default, ITE generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use contentExpression.",
  ).optional(),
  PayloadField: z.string().describe(
    "The name of the DynamoDB column that receives the action payload. If you don't specify this parameter, the name of the DynamoDB column is payload.",
  ).optional(),
  RangeKeyField: z.string().describe(
    "The name of the range key (also called the sort key). The rangeKeyField value must match the sort key of the target DynamoDB table.",
  ).optional(),
  RangeKeyType: z.string().describe(
    "The data type for the range key (also called the sort key), You can specify the following values: 'STRING' - The range key is a string. 'NUMBER' - The range key is number. If you don't specify rangeKeyField, the default value is 'STRING'.",
  ).optional(),
  RangeKeyValue: z.string().describe(
    "The value of the range key (also called the sort key).",
  ).optional(),
  TableName: z.string().describe(
    "The name of the DynamoDB table. The tableName value must match the table name of the target DynamoDB table.",
  ),
});

const DynamoDBv2Schema = z.object({
  Payload: PayloadSchema.describe(
    "Information needed to configure the payload. By default, ITE generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use contentExpression.",
  ).optional(),
  TableName: z.string().describe("The name of the DynamoDB table."),
});

const FirehoseSchema = z.object({
  DeliveryStreamName: z.string().describe(
    "The name of the Kinesis Data Firehose delivery stream where the data is written.",
  ),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to an Amazon Data Firehose delivery stream.",
  ).optional(),
  Separator: z.string().regex(new RegExp("([\\n\\t])|(\\r\\n)|(,)")).describe(
    "A character separator that is used to separate records written to the Kinesis Data Firehose delivery stream. Valid values are: '\\n' (newline), '\\t' (tab), '\\r\\n' (Windows newline), ',' (comma).",
  ).optional(),
});

const IotEventsSchema = z.object({
  InputName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$"),
  ).describe("The name of the ITE input where the data is sent."),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to an ITE input.",
  ).optional(),
});

const AssetPropertyTimestampSchema = z.object({
  OffsetInNanos: z.string().describe(
    "The nanosecond offset converted from timeInSeconds. The valid range is between 0-999999999.",
  ).optional(),
  TimeInSeconds: z.string().describe(
    "The timestamp, in seconds, in the Unix epoch format. The valid range is between 1-31556889864403199.",
  ),
});

const AssetPropertyVariantSchema = z.object({
  BooleanValue: z.string().describe(
    "The asset property value is a Boolean value that must be 'TRUE' or 'FALSE'. You must use an expression, and the evaluated result should be a Boolean value.",
  ).optional(),
  DoubleValue: z.string().describe(
    "The asset property value is a double. You must use an expression, and the evaluated result should be a double.",
  ).optional(),
  IntegerValue: z.string().describe(
    "The asset property value is an integer. You must use an expression, and the evaluated result should be an integer.",
  ).optional(),
  StringValue: z.string().describe(
    "The asset property value is a string. You must use an expression, and the evaluated result should be a string.",
  ).optional(),
});

const AssetPropertyValueSchema = z.object({
  Quality: z.string().describe(
    "The quality of the asset property value. The value must be 'GOOD', 'BAD', or 'UNCERTAIN'.",
  ).optional(),
  Timestamp: AssetPropertyTimestampSchema.describe(
    "The timestamp associated with the asset property value. The default is the current event time.",
  ).optional(),
  Value: AssetPropertyVariantSchema.describe(
    "The value to send to an asset property.",
  ),
});

const IotSiteWiseSchema = z.object({
  AssetId: z.string().describe(
    "The ID of the asset that has the specified property.",
  ).optional(),
  EntryId: z.string().describe(
    "A unique identifier for this entry. You can use the entry ID to track which data entry causes an error in case of failure. The default is a new unique identifier.",
  ).optional(),
  PropertyAlias: z.string().describe("The alias of the asset property.")
    .optional(),
  PropertyId: z.string().describe("The ID of the asset property.").optional(),
  PropertyValue: AssetPropertyValueSchema.describe(
    "The value to send to the asset property. This value contains timestamp, quality, and value (TQV) information.",
  ).optional(),
});

const IotTopicPublishSchema = z.object({
  MqttTopic: z.string().min(1).max(128).describe(
    "The MQTT topic of the message. You can use a string expression that includes variables ( $variable.) and input values ( $input..) as the topic string.",
  ),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you publish a message to an IoTCore topic.",
  ).optional(),
});

const LambdaSchema = z.object({
  FunctionArn: z.string().min(1).max(2048).describe(
    "The ARN of the Lambda function that is executed.",
  ),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to a Lambda function.",
  ).optional(),
});

const SnsSchema = z.object({
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message as an Amazon SNS push notification.",
  ).optional(),
  TargetArn: z.string().min(1).max(2048).describe(
    "The ARN of the Amazon SNS target where the message is sent.",
  ),
});

const SqsSchema = z.object({
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to an Amazon SQS queue.",
  ).optional(),
  QueueUrl: z.string().describe(
    "The URL of the SQS queue where the data is written.",
  ),
  UseBase64: z.boolean().describe(
    "Set this to TRUE if you want the data to be base-64 encoded before it is written to the queue. Otherwise, set this to FALSE.",
  ).optional(),
});

const AlarmActionSchema = z.object({
  DynamoDB: DynamoDBSchema.describe(
    "Defines an action to write to the Amazon DynamoDB table that you created. The standard action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html). One column of the DynamoDB table receives all attribute-value pairs in the payload that you specify. You must use expressions for all parameters in DynamoDBAction. The expressions accept literals, operators, functions, references, and substitution templates. **Examples** For literal values, the expressions must contain single quotes. For example, the value for the hashKeyType parameter can be 'STRING'. For references, you must specify either variables or input values. For example, the value for the hashKeyField parameter can be $input.GreenhouseInput.name. For a substitution template, you must use ${}, and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates. In the following example, the value for the hashKeyValue parameter uses a substitution template. '${$input.GreenhouseInput.temperature * 6 / 5 + 32} in Fahrenheit' For a string concatenation, you must use +. A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates. In the following example, the value for the tableName parameter uses a string concatenation. 'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *Developer Guide*. If the defined payload type is a string, DynamoDBAction writes non-JSON data to the DynamoDB table as binary data. The DynamoDB console displays the data as Base64-encoded text. The value for the payloadField parameter is _raw.",
  ).optional(),
  DynamoDBv2: DynamoDBv2Schema.describe(
    'Defines an action to write to the Amazon DynamoDB table that you created. The default action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html). A separate column of the DynamoDB table receives one attribute-value pair in the payload that you specify. You must use expressions for all parameters in DynamoDBv2Action. The expressions accept literals, operators, functions, references, and substitution templates. **Examples** For literal values, the expressions must contain single quotes. For example, the value for the tableName parameter can be \'GreenhouseTemperatureTable\'. For references, you must specify either variables or input values. For example, the value for the tableName parameter can be $variable.ddbtableName. For a substitution template, you must use ${}, and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates. In the following example, the value for the contentExpression parameter in Payload uses a substitution template. \'{\\"sensorID\\": \\"${$input.GreenhouseInput.sensor_id}\\", \\"temperature\\": \\"${$input.GreenhouseInput.temperature * 9 / 5 + 32}\\"}\' For a string concatenation, you must use +. A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates. In the following example, the value for the tableName parameter uses a string concatenation. \'GreenhouseTemperatureTable \' + $input.GreenhouseInput.date For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *Developer Guide*. The value for the type parameter in Payload must be JSON.',
  ).optional(),
  Firehose: FirehoseSchema.describe(
    "Sends information about the detector model instance and the event that triggered the action to an Amazon Kinesis Data Firehose delivery stream.",
  ).optional(),
  IotEvents: IotEventsSchema.describe(
    "Sends an ITE input, passing in information about the detector model instance and the event that triggered the action.",
  ).optional(),
  IotSiteWise: IotSiteWiseSchema.describe(
    "Sends information about the detector model instance and the event that triggered the action to a specified asset property in ITSW. You must use expressions for all parameters in IotSiteWiseAction. The expressions accept literals, operators, functions, references, and substitutions templates. **Examples** For literal values, the expressions must contain single quotes. For example, the value for the propertyAlias parameter can be '/company/windfarm/3/turbine/7/temperature'. For references, you must specify either variables or input values. For example, the value for the assetId parameter can be $input.TurbineInput.assetId1. For a substitution template, you must use ${}, and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates. In the following example, the value for the propertyAlias parameter uses a substitution template. 'company/windfarm/${$input.TemperatureInput.sensorData.windfarmID}/turbine/ ${$input.TemperatureInput.sensorData.turbineID}/temperature' You must specify either propertyAlias or both assetId and propertyId to identify the target asset property in ITSW. For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *Developer Guide*.",
  ).optional(),
  IotTopicPublish: IotTopicPublishSchema.describe(
    "Information required to publish the MQTT message through the IoT message broker.",
  ).optional(),
  Lambda: LambdaSchema.describe(
    "Calls a Lambda function, passing in information about the detector model instance and the event that triggered the action.",
  ).optional(),
  Sns: SnsSchema.describe(
    "Information required to publish the Amazon SNS message.",
  ).optional(),
  Sqs: SqsSchema.describe(
    "Sends information about the detector model instance and the event that triggered the action to an Amazon SQS queue.",
  ).optional(),
});

const InitializationConfigurationSchema = z.object({
  DisabledOnInitialization: z.boolean().describe(
    "The value must be TRUE or FALSE. If FALSE, all alarm instances created based on the alarm model are activated. The default value is TRUE.",
  ),
});

const AcknowledgeFlowSchema = z.object({
  Enabled: z.boolean().describe(
    "The value must be TRUE or FALSE. If TRUE, you receive a notification when the alarm state changes. You must choose to acknowledge the notification before the alarm state can return to NORMAL. If FALSE, you won't receive notifications. The alarm automatically changes to the NORMAL state when the input property value returns to the specified range.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe("The tag's key."),
  Value: z.string().describe("The tag's value."),
});

const GlobalArgsSchema = z.object({
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  AlarmModelName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The name of the alarm model.").optional(),
  AlarmModelDescription: z.string().max(1024).describe(
    "The description of the alarm model.",
  ).optional(),
  RoleArn: z.string().min(1).max(2048).describe(
    "The ARN of the IAM role that allows the alarm to perform actions and access AWS resources. For more information, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
  ),
  Key: z.string().min(1).max(128).regex(
    new RegExp(
      "^((`[\\w\\- ]+`)|([\\w\\-]+))(\\.((`[\\w\\- ]+`)|([\\w\\-]+)))*$",
    ),
  ).describe(
    "An input attribute used as a key to create an alarm. ITE routes [inputs](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Input.html) associated with this key to the alarm.",
  ).optional(),
  Severity: z.number().int().min(0).max(2147483647).describe(
    "A non-negative integer that reflects the severity level of the alarm.",
  ).optional(),
  AlarmRule: z.object({
    SimpleRule: SimpleRuleSchema.describe(
      "A rule that compares an input property value to a threshold value with a comparison operator.",
    ).optional(),
  }).describe("Defines when your alarm is invoked."),
  AlarmEventActions: z.object({
    AlarmActions: z.array(AlarmActionSchema).describe(
      "Specifies one or more supported actions to receive notifications when the alarm state changes.",
    ).optional(),
  }).describe("Contains information about one or more alarm actions.")
    .optional(),
  AlarmCapabilities: z.object({
    InitializationConfiguration: InitializationConfigurationSchema.describe(
      "Specifies the default alarm state. The configuration applies to all alarms that were created based on this alarm model.",
    ).optional(),
    AcknowledgeFlow: AcknowledgeFlowSchema.describe(
      "Specifies whether to get notified for alarm state changes.",
    ).optional(),
  }).describe("Contains the configuration information of alarm state changes.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the alarm model. The tags help you manage the alarm model. For more information, see [Tagging your resources](https://docs.aws.amazon.com/iotevents/latest/developerguide/tagging-iotevents.html) in the *Developer Guide*. You can create up to 50 tags for one alarm model.",
  ).optional(),
});

const StateSchema = z.object({
  AlarmModelName: z.string(),
  AlarmModelDescription: z.string().optional(),
  RoleArn: z.string().optional(),
  Key: z.string().optional(),
  Severity: z.number().optional(),
  AlarmRule: z.object({
    SimpleRule: SimpleRuleSchema,
  }).optional(),
  AlarmEventActions: z.object({
    AlarmActions: z.array(AlarmActionSchema),
  }).optional(),
  AlarmCapabilities: z.object({
    InitializationConfiguration: InitializationConfigurationSchema,
    AcknowledgeFlow: AcknowledgeFlowSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AlarmModelName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The name of the alarm model.").optional(),
  AlarmModelDescription: z.string().max(1024).describe(
    "The description of the alarm model.",
  ).optional(),
  RoleArn: z.string().min(1).max(2048).describe(
    "The ARN of the IAM role that allows the alarm to perform actions and access AWS resources. For more information, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
  ).optional(),
  Key: z.string().min(1).max(128).regex(
    new RegExp(
      "^((`[\\w\\- ]+`)|([\\w\\-]+))(\\.((`[\\w\\- ]+`)|([\\w\\-]+)))*$",
    ),
  ).describe(
    "An input attribute used as a key to create an alarm. ITE routes [inputs](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Input.html) associated with this key to the alarm.",
  ).optional(),
  Severity: z.number().int().min(0).max(2147483647).describe(
    "A non-negative integer that reflects the severity level of the alarm.",
  ).optional(),
  AlarmRule: z.object({
    SimpleRule: SimpleRuleSchema.describe(
      "A rule that compares an input property value to a threshold value with a comparison operator.",
    ).optional(),
  }).describe("Defines when your alarm is invoked.").optional(),
  AlarmEventActions: z.object({
    AlarmActions: z.array(AlarmActionSchema).describe(
      "Specifies one or more supported actions to receive notifications when the alarm state changes.",
    ).optional(),
  }).describe("Contains information about one or more alarm actions.")
    .optional(),
  AlarmCapabilities: z.object({
    InitializationConfiguration: InitializationConfigurationSchema.describe(
      "Specifies the default alarm state. The configuration applies to all alarms that were created based on this alarm model.",
    ).optional(),
    AcknowledgeFlow: AcknowledgeFlowSchema.describe(
      "Specifies whether to get notified for alarm state changes.",
    ).optional(),
  }).describe("Contains the configuration information of alarm state changes.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the alarm model. The tags help you manage the alarm model. For more information, see [Tagging your resources](https://docs.aws.amazon.com/iotevents/latest/developerguide/tagging-iotevents.html) in the *Developer Guide*. You can create up to 50 tags for one alarm model.",
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

/** Swamp extension model for IoTEvents AlarmModel. Registered at `@swamp/aws/iotevents/alarm-model`. */
export const model = {
  type: "@swamp/aws/iotevents/alarm-model",
  version: "2026.06.15.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTEvents AlarmModel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTEvents AlarmModel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTEvents::AlarmModel",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AlarmModelName ?? g.AlarmModelName)?.toString() ?? "current")
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
      description: "Get a IoTEvents AlarmModel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTEvents AlarmModel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoTEvents::AlarmModel",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AlarmModelName ?? context.globalArgs.AlarmModelName)
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
      description: "Update a IoTEvents AlarmModel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AlarmModelName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AlarmModelName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTEvents::AlarmModel",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTEvents::AlarmModel",
          identifier,
          currentState,
          desiredState,
          ["AlarmModelName", "Key"],
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
      description: "Delete a IoTEvents AlarmModel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTEvents AlarmModel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoTEvents::AlarmModel",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.AlarmModelName?.toString() ?? args.identifier)
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
      description: "Sync IoTEvents AlarmModel state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AlarmModelName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AlarmModelName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTEvents::AlarmModel",
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
