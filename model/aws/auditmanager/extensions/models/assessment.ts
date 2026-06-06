// Auto-generated extension model for @swamp/aws/auditmanager/assessment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AuditManager Assessment (AWS::AuditManager::Assessment).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const DelegationSchema = z.object({
  LastUpdated: z.number().describe(
    "The sequence of characters that identifies when the event occurred.",
  ).optional(),
  ControlSetId: z.string().min(1).max(300).regex(
    new RegExp("^[\\w\\W\\s\\S]*$"),
  ).describe("The identifier for the specified control set.").optional(),
  CreationTime: z.number().describe(
    "The sequence of characters that identifies when the event occurred.",
  ).optional(),
  CreatedBy: z.string().min(20).max(2048).regex(new RegExp("^arn:.*:*:.*"))
    .describe("The IAM user or role that performed the action.").optional(),
  RoleArn: z.string().min(20).max(2048).regex(new RegExp("^arn:.*:iam:.*"))
    .describe("The Amazon Resource Name (ARN) of the IAM user or role.")
    .optional(),
  AssessmentName: z.string().min(1).max(127).regex(
    new RegExp("^[a-zA-Z0-9-_\\.]+$"),
  ).describe("The name of the related assessment.").optional(),
  Comment: z.string().max(350).regex(new RegExp("^[\\w\\W\\s\\S]*$")).describe(
    "The comment related to the delegation.",
  ).optional(),
  Id: z.string().min(36).max(36).regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).optional(),
  RoleType: z.enum(["PROCESS_OWNER", "RESOURCE_OWNER"]).describe(
    "The IAM role type.",
  ).optional(),
  AssessmentId: z.string().min(36).max(36).regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).optional(),
  Status: z.enum(["IN_PROGRESS", "UNDER_REVIEW", "COMPLETE"]).describe(
    "The status of the delegation.",
  ).optional(),
});

const RoleSchema = z.object({
  RoleArn: z.string().min(20).max(2048).regex(new RegExp("^arn:.*:iam:.*"))
    .describe("The Amazon Resource Name (ARN) of the IAM user or role.")
    .optional(),
  RoleType: z.enum(["PROCESS_OWNER", "RESOURCE_OWNER"]).describe(
    "The IAM role type.",
  ).optional(),
});

const AWSAccountSchema = z.object({
  Id: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$")).describe(
    "The identifier for the specified AWS account.",
  ).optional(),
  EmailAddress: z.string().min(1).max(320).regex(new RegExp("^.*@.*$"))
    .describe("The unique identifier for the email account.").optional(),
  Name: z.string().min(1).max(50).regex(new RegExp("^[\\u0020-\\u007E]+$"))
    .describe("The name of the specified AWS account.").optional(),
});

const AWSServiceSchema = z.object({
  ServiceName: z.string().describe("The name of the AWS service.").optional(),
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
  FrameworkId: z.string().min(32).max(36).regex(
    new RegExp(
      "^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|.*\\S.*)$",
    ),
  ).describe("The identifier for the specified framework.").optional(),
  AwsAccount: z.object({
    Id: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$")).describe(
      "The identifier for the specified AWS account.",
    ).optional(),
    EmailAddress: z.string().min(1).max(320).regex(new RegExp("^.*@.*$"))
      .describe("The unique identifier for the email account.").optional(),
    Name: z.string().min(1).max(50).regex(new RegExp("^[\\u0020-\\u007E]+$"))
      .describe("The name of the specified AWS account.").optional(),
  }).describe("The AWS account associated with the assessment.").optional(),
  Tags: z.array(TagSchema).describe("The tags associated with the assessment.")
    .optional(),
  Delegations: z.array(DelegationSchema).describe("The list of delegations.")
    .optional(),
  Roles: z.array(RoleSchema).describe(
    "The list of roles for the specified assessment.",
  ).optional(),
  Scope: z.object({
    AwsAccounts: z.array(AWSAccountSchema).describe(
      "The AWS accounts included in scope.",
    ).optional(),
    AwsServices: z.array(AWSServiceSchema).describe(
      "The AWS services included in scope.",
    ).optional(),
  }).describe(
    "The wrapper that contains the AWS accounts and AWS services in scope for the assessment.",
  ).optional(),
  AssessmentReportsDestination: z.object({
    Destination: z.string().describe(
      "The URL of the specified Amazon S3 bucket.",
    ).optional(),
    DestinationType: z.enum(["S3"]).describe(
      "The destination type, such as Amazon S3.",
    ).optional(),
  }).describe(
    "The destination in which evidence reports are stored for the specified assessment.",
  ).optional(),
  Status: z.enum(["ACTIVE", "INACTIVE"]).describe(
    "The status of the specified assessment.",
  ).optional(),
  Name: z.string().min(1).max(127).regex(new RegExp("^[a-zA-Z0-9-_\\.]+$"))
    .describe("The name of the related assessment.").optional(),
  Description: z.string().describe(
    "The description of the specified assessment.",
  ).optional(),
});

const StateSchema = z.object({
  FrameworkId: z.string().optional(),
  AssessmentId: z.string(),
  AwsAccount: AWSAccountSchema.optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Delegations: z.array(DelegationSchema).optional(),
  Roles: z.array(RoleSchema).optional(),
  Scope: z.object({
    AwsAccounts: z.array(AWSAccountSchema),
    AwsServices: z.array(AWSServiceSchema),
  }).optional(),
  AssessmentReportsDestination: z.object({
    Destination: z.string(),
    DestinationType: z.string(),
  }).optional(),
  Status: z.string().optional(),
  CreationTime: z.number().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FrameworkId: z.string().min(32).max(36).regex(
    new RegExp(
      "^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|.*\\S.*)$",
    ),
  ).describe("The identifier for the specified framework.").optional(),
  AwsAccount: z.object({
    Id: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$")).describe(
      "The identifier for the specified AWS account.",
    ).optional(),
    EmailAddress: z.string().min(1).max(320).regex(new RegExp("^.*@.*$"))
      .describe("The unique identifier for the email account.").optional(),
    Name: z.string().min(1).max(50).regex(new RegExp("^[\\u0020-\\u007E]+$"))
      .describe("The name of the specified AWS account.").optional(),
  }).describe("The AWS account associated with the assessment.").optional(),
  Tags: z.array(TagSchema).describe("The tags associated with the assessment.")
    .optional(),
  Delegations: z.array(DelegationSchema).describe("The list of delegations.")
    .optional(),
  Roles: z.array(RoleSchema).describe(
    "The list of roles for the specified assessment.",
  ).optional(),
  Scope: z.object({
    AwsAccounts: z.array(AWSAccountSchema).describe(
      "The AWS accounts included in scope.",
    ).optional(),
    AwsServices: z.array(AWSServiceSchema).describe(
      "The AWS services included in scope.",
    ).optional(),
  }).describe(
    "The wrapper that contains the AWS accounts and AWS services in scope for the assessment.",
  ).optional(),
  AssessmentReportsDestination: z.object({
    Destination: z.string().describe(
      "The URL of the specified Amazon S3 bucket.",
    ).optional(),
    DestinationType: z.enum(["S3"]).describe(
      "The destination type, such as Amazon S3.",
    ).optional(),
  }).describe(
    "The destination in which evidence reports are stored for the specified assessment.",
  ).optional(),
  Status: z.enum(["ACTIVE", "INACTIVE"]).describe(
    "The status of the specified assessment.",
  ).optional(),
  Name: z.string().min(1).max(127).regex(new RegExp("^[a-zA-Z0-9-_\\.]+$"))
    .describe("The name of the related assessment.").optional(),
  Description: z.string().describe(
    "The description of the specified assessment.",
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

/** Swamp extension model for AuditManager Assessment. Registered at `@swamp/aws/auditmanager/assessment`. */
export const model = {
  type: "@swamp/aws/auditmanager/assessment",
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
      description: "AuditManager Assessment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AuditManager Assessment",
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
          "AWS::AuditManager::Assessment",
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
      description: "Get a AuditManager Assessment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AuditManager Assessment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AuditManager::Assessment",
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
      description: "Update a AuditManager Assessment",
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
        const identifier = existing.AssessmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AuditManager::Assessment",
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
          "AWS::AuditManager::Assessment",
          identifier,
          currentState,
          desiredState,
          ["FrameworkId", "AwsAccount"],
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
      description: "Delete a AuditManager Assessment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AuditManager Assessment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AuditManager::Assessment",
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
      description: "Sync AuditManager Assessment state from AWS",
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
        const identifier = existing.AssessmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AuditManager::Assessment",
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
