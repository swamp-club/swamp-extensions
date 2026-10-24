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

// Auto-generated extension model for @swamp/aws/ses/receipt-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SES ReceiptRule (AWS::SES::ReceiptRule).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const AddHeaderActionSchema = z.object({
  HeaderName: z.string().describe(
    "The name of the header to add to the incoming message. The name must contain at least one character, and can contain up to 50 characters. It consists of alphanumeric (a-z, A-Z, 0-9) characters and dashes.",
  ),
  HeaderValue: z.string().describe(
    "The content to include in the header. This value can contain up to 2048 characters. It can't contain newline (\\n) or carriage return (\\r) characters.",
  ),
});

const BounceActionSchema = z.object({
  Sender: z.string().describe(
    "The email address of the sender of the bounced email. This is the address from which the bounce message is sent.",
  ),
  SmtpReplyCode: z.string().describe(
    "The SMTP reply code, as defined by RFC 5321.",
  ),
  Message: z.string().describe(
    "Human-readable text to include in the bounce message.",
  ),
  TopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the bounce action is taken. You can find the ARN of a topic by using the ListTopics operation in Amazon SNS.",
  ).optional(),
  StatusCode: z.string().describe(
    "The SMTP enhanced status code, as defined by RFC 3463.",
  ).optional(),
});

const ConnectActionSchema = z.object({
  InstanceARN: z.string().describe(
    "The Amazon Resource Name (ARN) for the Amazon Connect instance that Amazon SES integrates with for starting email contacts.",
  ),
  IAMRoleARN: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role to be used by Amazon Simple Email Service while starting email contacts to the Amazon Connect instance. This role should have permission to invoke connect:StartEmailContact for the given Amazon Connect instance.",
  ),
});

const LambdaActionSchema = z.object({
  FunctionArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS Lambda function. An example of an AWS Lambda function ARN is arn:aws:lambda:us-west-2:account-id:function:MyFunction. For more information about AWS Lambda, see the AWS Lambda Developer Guide.",
  ),
  InvocationType: z.string().describe(
    "The invocation type of the AWS Lambda function. An invocation type of RequestResponse means that the execution of the function immediately results in a response, and a value of Event means that the function is invoked asynchronously. The default value is Event. For information about AWS Lambda invocation types, see the AWS Lambda Developer Guide. There is a 30-second timeout on RequestResponse invocations. You should use Event invocation in most cases. Use RequestResponse only to make a mail flow decision, such as whether to stop the receipt rule or the receipt rule set.",
  ).optional(),
  TopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the Lambda action is executed. You can find the ARN of a topic by using the ListTopics operation in Amazon SNS.",
  ).optional(),
});

const S3ActionSchema = z.object({
  BucketName: z.string().describe(
    "The name of the Amazon S3 bucket for incoming email.",
  ),
  ObjectKeyPrefix: z.string().describe(
    "The key prefix of the Amazon S3 bucket. The key prefix is similar to a directory name that enables you to store similar data under the same directory in a bucket.",
  ).optional(),
  IamRoleArn: z.string().describe(
    "The ARN of the IAM role to be used by Amazon SES while writing to the Amazon S3 bucket.",
  ).optional(),
  KmsKeyArn: z.string().describe(
    "The customer managed key that Amazon SES should use to encrypt your emails before saving them to the Amazon S3 bucket. You can use the AWS managed key or a customer managed key that you created in AWS KMS as follows: To use the AWS managed key, provide an ARN in the form of arn:aws:kms:REGION:ACCOUNT-ID-WITHOUT-HYPHENS:alias/aws/ses. For example, if your AWS account ID is 123456789012 and you want to use the AWS managed key in the US West (Oregon) Region, the ARN of the AWS managed key would be arn:aws:kms:us-west-2:123456789012:alias/aws/ses. If you use the AWS managed key, you don't need to perform any extra steps to give Amazon SES permission to use the key. To use a customer managed key that you created in AWS KMS, provide the ARN of the customer managed key and ensure that you add a statement to your key's policy to give Amazon SES permission to use it. For more information about giving permissions, see the Amazon SES Developer Guide. For more information about key policies, see the AWS KMS Developer Guide. If you do not specify an AWS KMS key, Amazon SES does not encrypt your emails. Your mail is encrypted by Amazon SES using the Amazon S3 encryption client before the mail is submitted to Amazon S3 for storage. It is not encrypted using Amazon S3 server-side encryption. This means that you must use the Amazon S3 encryption client to decrypt the email after retrieving it from Amazon S3, as the service has no access to use your AWS KMS keys for decryption. This encryption client is currently available with the AWS SDK for Java and AWS SDK for Ruby only. For more information about client-side encryption using AWS KMS managed keys, see the Amazon S3 Developer Guide.",
  ).optional(),
  TopicArn: z.string().describe(
    "The ARN of the Amazon SNS topic to notify when the message is saved to the Amazon S3 bucket. You can find the ARN of a topic by using the ListTopics operation in Amazon SNS.",
  ).optional(),
});

const SNSActionSchema = z.object({
  TopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS Topic to which notification for the email received will be published.",
  ).optional(),
  Encoding: z.string().describe(
    "The encoding to use for the email within the Amazon SNS notification. The default value is UTF-8. Use BASE64 if you need to preserve all special characters, especially when the original message uses a different encoding format.",
  ).optional(),
});

const StopActionSchema = z.object({
  Scope: z.string().describe(
    "The scope of the StopAction. The only acceptable value is RuleSet.",
  ),
  TopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the stop action is taken. You can find the ARN of a topic by using the ListTopics Amazon SNS operation.",
  ).optional(),
});

const WorkmailActionSchema = z.object({
  OrganizationArn: z.string().describe(
    'The Amazon Resource Name (ARN) of the Amazon WorkMail organization. Amazon WorkMail ARNs use the following format: arn:aws:workmail:::organization/. You can find the ID of your organization by using the ListOrganizations operation in Amazon WorkMail. Amazon WorkMail organization IDs begin with "m-", followed by a string of alphanumeric characters.',
  ),
  TopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the WorkMail action is called. You can find the ARN of a topic by using the ListTopics operation in Amazon SNS.",
  ).optional(),
});

const ActionSchema = z.object({
  AddHeaderAction: AddHeaderActionSchema.describe(
    "When included in a receipt rule, this action adds a header to the received email.",
  ).optional(),
  BounceAction: BounceActionSchema.describe(
    "When included in a receipt rule, this action rejects the received email by returning a bounce response to the sender and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).",
  ).optional(),
  ConnectAction: ConnectActionSchema.describe(
    "When included in a receipt rule, this action parses the received message and starts an email contact in Amazon Connect on your behalf.",
  ).optional(),
  LambdaAction: LambdaActionSchema.describe(
    "When included in a receipt rule, this action calls an AWS Lambda function and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).",
  ).optional(),
  S3Action: S3ActionSchema.describe(
    "When included in a receipt rule, this action saves the received message to an Amazon Simple Storage Service (Amazon S3) bucket and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).",
  ).optional(),
  SNSAction: SNSActionSchema.describe(
    "The action to publish the email content to an Amazon SNS topic. When executed, this action will send the email as a notification to the specified SNS topic.",
  ).optional(),
  StopAction: StopActionSchema.describe(
    "When included in a receipt rule, this action terminates the evaluation of the receipt rule set and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).",
  ).optional(),
  WorkmailAction: WorkmailActionSchema.describe(
    "When included in a receipt rule, this action calls Amazon WorkMail and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS). It usually isn't necessary to set this up manually, because Amazon WorkMail adds the rule automatically during its setup procedure.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  After: z.string().describe(
    "The name of an existing rule after which the new rule is placed. If this parameter is null, the new rule is inserted at the beginning of the rule list.",
  ).optional(),
  Rule: z.object({
    Name: z.string().describe(
      "The name of the receipt rule. The name must meet the following requirements: Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), dashes (-), or periods (.). Start and end with a letter or number. Contain 64 characters or fewer.",
    ).optional(),
    Enabled: z.boolean().describe(
      "If true, the receipt rule is active. The default value is false.",
    ).optional(),
    TlsPolicy: z.string().describe(
      "Specifies whether Amazon SES should require that incoming email is delivered over a connection encrypted with Transport Layer Security (TLS). If this parameter is set to Require, Amazon SES bounces emails that are not received over TLS. The default is Optional.",
    ).optional(),
    Recipients: z.array(z.string()).describe(
      "The recipient domains and email addresses that the receipt rule applies to. If this field is not specified, this rule matches all recipients on all verified domains.",
    ).optional(),
    Actions: z.array(ActionSchema).describe(
      "An ordered list of actions to perform on messages that match at least one of the recipient email addresses or domains specified in the receipt rule.",
    ).optional(),
    ScanEnabled: z.boolean().describe(
      "If true, then messages that this receipt rule applies to are scanned for spam and viruses. The default value is false.",
    ).optional(),
  }).describe(
    "A data structure that contains the specified rule's name, actions, recipients, domains, enabled status, scan status, and TLS policy.",
  ),
  RuleSetName: z.string().describe(
    "The name of the rule set where the receipt rule is added.",
  ),
});

const StateSchema = z.object({
  RuleName: z.string(),
  After: z.string().optional(),
  Rule: z.object({
    Name: z.string(),
    Enabled: z.boolean(),
    TlsPolicy: z.string(),
    Recipients: z.array(z.string()),
    Actions: z.array(ActionSchema),
    ScanEnabled: z.boolean(),
  }).optional(),
  RuleSetName: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  After: z.string().describe(
    "The name of an existing rule after which the new rule is placed. If this parameter is null, the new rule is inserted at the beginning of the rule list.",
  ).optional(),
  Rule: z.object({
    Name: z.string().describe(
      "The name of the receipt rule. The name must meet the following requirements: Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), dashes (-), or periods (.). Start and end with a letter or number. Contain 64 characters or fewer.",
    ).optional(),
    Enabled: z.boolean().describe(
      "If true, the receipt rule is active. The default value is false.",
    ).optional(),
    TlsPolicy: z.string().describe(
      "Specifies whether Amazon SES should require that incoming email is delivered over a connection encrypted with Transport Layer Security (TLS). If this parameter is set to Require, Amazon SES bounces emails that are not received over TLS. The default is Optional.",
    ).optional(),
    Recipients: z.array(z.string()).describe(
      "The recipient domains and email addresses that the receipt rule applies to. If this field is not specified, this rule matches all recipients on all verified domains.",
    ).optional(),
    Actions: z.array(ActionSchema).describe(
      "An ordered list of actions to perform on messages that match at least one of the recipient email addresses or domains specified in the receipt rule.",
    ).optional(),
    ScanEnabled: z.boolean().describe(
      "If true, then messages that this receipt rule applies to are scanned for spam and viruses. The default value is false.",
    ).optional(),
  }).describe(
    "A data structure that contains the specified rule's name, actions, recipients, domains, enabled status, scan status, and TLS policy.",
  ).optional(),
  RuleSetName: z.string().describe(
    "The name of the rule set where the receipt rule is added.",
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

/** Swamp extension model for SES ReceiptRule. Registered at `@swamp/aws/ses/receipt-rule`. */
export const model = {
  type: "@swamp/aws/ses/receipt-rule",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SES ReceiptRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES ReceiptRule",
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
          "AWS::SES::ReceiptRule",
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
      description: "Get a SES ReceiptRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES ReceiptRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SES::ReceiptRule",
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
      description: "Update a SES ReceiptRule",
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
        const idParts = [
          existing.RuleName?.toString(),
          existing.RuleSetName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SES::ReceiptRule",
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
          "AWS::SES::ReceiptRule",
          identifier,
          currentState,
          desiredState,
          ["Name", "RuleSetName"],
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
      description: "Delete a SES ReceiptRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES ReceiptRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SES::ReceiptRule",
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
      description: "Sync SES ReceiptRule state from AWS",
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
        const idParts = [
          existing.RuleName?.toString(),
          existing.RuleSetName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SES::ReceiptRule",
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
    list: {
      description: "List SES ReceiptRule resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::SES::ReceiptRule",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
