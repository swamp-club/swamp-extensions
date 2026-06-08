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

// Auto-generated extension model for @swamp/aws/ses/mail-manager-rule-set
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SES MailManagerRuleSet (AWS::SES::MailManagerRuleSet).
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

const AnalysisSchema = z.object({
  Analyzer: z.string().regex(new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$")),
  ResultField: z.string().min(1).max(256).regex(
    new RegExp("^(addon\\.)?[\\sa-zA-Z0-9_]+$"),
  ),
});

const RuleIsInAddressListSchema = z.object({
  Attribute: z.enum(["RECIPIENT", "MAIL_FROM", "SENDER", "FROM", "TO", "CC"]),
  AddressLists: z.array(z.string()),
});

const RuleBooleanExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["READ_RECEIPT_REQUESTED", "TLS", "TLS_WRAPPED"])
      .optional(),
    Analysis: AnalysisSchema.optional(),
    IsInAddressList: RuleIsInAddressListSchema.optional(),
  }),
  Operator: z.enum(["IS_TRUE", "IS_FALSE"]),
});

const RuleStringExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum([
      "MAIL_FROM",
      "HELO",
      "RECIPIENT",
      "SENDER",
      "FROM",
      "SUBJECT",
      "TO",
      "CC",
    ]).optional(),
    MimeHeaderAttribute: z.string().regex(new RegExp("^X-[a-zA-Z0-9-]{1,256}$"))
      .optional(),
    Analysis: AnalysisSchema.optional(),
    ClientCertificateAttribute: z.enum([
      "CN",
      "SAN_RFC822_NAME",
      "SAN_DNS_NAME",
      "SAN_DIRECTORY_NAME",
      "SAN_UNIFORM_RESOURCE_IDENTIFIER",
      "SAN_IP_ADDRESS",
      "SAN_REGISTERED_ID",
      "SERIAL_NUMBER",
    ]).optional(),
  }),
  Operator: z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "STARTS_WITH",
    "ENDS_WITH",
    "CONTAINS",
  ]),
  Values: z.array(z.string().min(1).max(4096)),
});

const RuleNumberExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["MESSAGE_SIZE"]).optional(),
  }),
  Operator: z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "LESS_THAN",
    "GREATER_THAN",
    "LESS_THAN_OR_EQUAL",
    "GREATER_THAN_OR_EQUAL",
  ]),
  Value: z.number(),
});

const RuleIpExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["SOURCE_IP"]).optional(),
  }),
  Operator: z.enum(["CIDR_MATCHES", "NOT_CIDR_MATCHES"]),
  Values: z.array(
    z.string().min(1).max(43).regex(new RegExp("^(([0-9]|.|:|/)*)$")),
  ),
});

const RuleVerdictExpressionSchema = z.object({
  Evaluate: z.object({
    Attribute: z.enum(["SPF", "DKIM"]).optional(),
    Analysis: AnalysisSchema.optional(),
  }),
  Operator: z.enum(["EQUALS", "NOT_EQUALS"]),
  Values: z.array(z.enum(["PASS", "FAIL", "GRAY", "PROCESSING_FAILED"])),
});

const RuleDmarcExpressionSchema = z.object({
  Operator: z.enum(["EQUALS", "NOT_EQUALS"]),
  Values: z.array(z.enum(["NONE", "QUARANTINE", "REJECT"])),
});

const RelayActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  Relay: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  MailFrom: z.enum(["REPLACE", "PRESERVE"]).optional(),
});

const ArchiveActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  TargetArchive: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
});

const S3ActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  S3Bucket: z.string().min(1).max(62).regex(new RegExp("^[a-zA-Z0-9.-]+$")),
  S3Prefix: z.string().min(1).max(62).regex(
    new RegExp("^[a-zA-Z0-9!_.*'()/-]+$"),
  ).optional(),
  S3SseKmsKeyId: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9-:/]+$"),
  ).optional(),
});

const SendActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
});

const AddHeaderActionSchema = z.object({
  HeaderName: z.string().min(1).max(64).regex(
    new RegExp("^[xX]\\-[a-zA-Z0-9\\-]+$"),
  ),
  HeaderValue: z.string().min(1).max(128),
});

const ReplaceRecipientActionSchema = z.object({
  ReplaceWith: z.array(
    z.string().min(0).max(254).regex(new RegExp("^[0-9A-Za-z@+.-]+$")),
  ).optional(),
});

const DeliverToMailboxActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  MailboxArn: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
});

const DeliverToQBusinessActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  ApplicationId: z.string().min(36).max(36).regex(new RegExp("^[a-z0-9-]+$")),
  IndexId: z.string().min(36).max(36).regex(new RegExp("^[a-z0-9-]+$")),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
});

const SnsActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  TopicArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-eusc):sns:[a-z]{2}-[a-z]+-\\d{1}:\\d{12}:[\\w\\-]{1,256}$",
    ),
  ),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  Encoding: z.enum(["UTF-8", "BASE64"]).optional(),
  PayloadType: z.enum(["CONTENT", "HEADERS"]).optional(),
});

const BounceActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  Sender: z.string().min(0).max(254).regex(new RegExp("^[0-9A-Za-z@+.-]+$")),
  StatusCode: z.string().min(5).max(9).regex(
    new RegExp("^[45]\\.[0-9]{1,3}\\.[0-9]{1,3}$"),
  ),
  SmtpReplyCode: z.string().min(3).max(3).regex(new RegExp("^[45][0-9][0-9]$")),
  DiagnosticMessage: z.string().min(1).max(256).regex(
    new RegExp("^[\\x20-\\x7e]+$"),
  ),
  Message: z.string().min(1).max(500).regex(
    new RegExp("^[\\r\\n\\x20-\\x7e]+$"),
  ).optional(),
});

const InvokeLambdaActionSchema = z.object({
  ActionFailurePolicy: z.enum(["CONTINUE", "DROP"]).optional(),
  FunctionArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  InvocationType: z.enum(["EVENT", "REQUEST_RESPONSE"]),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^[a-zA-Z0-9:_/+=,@.#-]+$"),
  ),
  RetryTimeMinutes: z.number().int().min(0).max(2160).optional(),
});

const RuleSchema = z.object({
  Name: z.string().min(1).max(32).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .optional(),
  Conditions: z.array(z.object({
    BooleanExpression: RuleBooleanExpressionSchema.optional(),
    StringExpression: RuleStringExpressionSchema.optional(),
    NumberExpression: RuleNumberExpressionSchema.optional(),
    IpExpression: RuleIpExpressionSchema.optional(),
    VerdictExpression: RuleVerdictExpressionSchema.optional(),
    DmarcExpression: RuleDmarcExpressionSchema.optional(),
  })).optional(),
  Unless: z.array(z.object({
    BooleanExpression: RuleBooleanExpressionSchema.optional(),
    StringExpression: RuleStringExpressionSchema.optional(),
    NumberExpression: RuleNumberExpressionSchema.optional(),
    IpExpression: RuleIpExpressionSchema.optional(),
    VerdictExpression: RuleVerdictExpressionSchema.optional(),
    DmarcExpression: RuleDmarcExpressionSchema.optional(),
  })).optional(),
  Actions: z.array(z.object({
    Drop: z.record(z.string(), z.unknown()).optional(),
    Relay: RelayActionSchema.optional(),
    Archive: ArchiveActionSchema.optional(),
    WriteToS3: S3ActionSchema.optional(),
    Send: SendActionSchema.optional(),
    AddHeader: AddHeaderActionSchema.optional(),
    ReplaceRecipient: ReplaceRecipientActionSchema.optional(),
    DeliverToMailbox: DeliverToMailboxActionSchema.optional(),
    DeliverToQBusiness: DeliverToQBusinessActionSchema.optional(),
    PublishToSns: SnsActionSchema.optional(),
    Bounce: BounceActionSchema.optional(),
    InvokeLambda: InvokeLambdaActionSchema.optional(),
  })),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]+$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]*$"),
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
  RuleSetName: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .optional(),
  Rules: z.array(RuleSchema),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  RuleSetArn: z.string().optional(),
  RuleSetId: z.string(),
  RuleSetName: z.string().optional(),
  Rules: z.array(RuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RuleSetName: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .optional(),
  Rules: z.array(RuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for SES MailManagerRuleSet. Registered at `@swamp/aws/ses/mail-manager-rule-set`. */
export const model = {
  type: "@swamp/aws/ses/mail-manager-rule-set",
  version: "2026.06.08.1",
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
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SES MailManagerRuleSet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES MailManagerRuleSet",
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
          "AWS::SES::MailManagerRuleSet",
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
      description: "Get a SES MailManagerRuleSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerRuleSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SES::MailManagerRuleSet",
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
      description: "Update a SES MailManagerRuleSet",
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
        const identifier = existing.RuleSetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::MailManagerRuleSet",
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
          "AWS::SES::MailManagerRuleSet",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a SES MailManagerRuleSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerRuleSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SES::MailManagerRuleSet",
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
      description: "Sync SES MailManagerRuleSet state from AWS",
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
        const identifier = existing.RuleSetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::MailManagerRuleSet",
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
