// Auto-generated extension model for @swamp/aws/mwaaserverless/workflow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MWAAServerless Workflow (AWS::MWAAServerless::Workflow).
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
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9\\.\\-_]*$"),
  ).optional(),
  Description: z.string().min(1).max(1024).regex(new RegExp("^.+$")).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().min(1),
    ObjectKey: z.string().min(1),
    VersionId: z.string().optional(),
  }),
  RoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(?:-(?:cn|us-gov|iso|iso-b|iso-e|iso-f))?:iam::[0-9]{12}:role(/[a-zA-Z0-9+=,.@_-]{1,512})*?/[a-zA-Z0-9+=,.@_-]{1,64}$",
    ),
  ),
  EncryptionConfiguration: z.object({
    Type: z.enum(["AWS_MANAGED_KEY", "CUSTOMER_MANAGED_KEY"]),
    KmsKeyId: z.string().optional(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string().min(1),
  }).optional(),
  NetworkConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A map of key-value pairs to be applied as tags",
  ).optional(),
  TriggerMode: z.string().min(1).max(255).optional(),
  ScheduleConfiguration: z.object({
    CronExpression: z.string().optional(),
  }).optional(),
});

const StateSchema = z.object({
  WorkflowArn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string(),
    ObjectKey: z.string(),
    VersionId: z.string(),
  }).optional(),
  RoleArn: z.string().optional(),
  EncryptionConfiguration: z.object({
    Type: z.string(),
    KmsKeyId: z.string(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string(),
  }).optional(),
  NetworkConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
  WorkflowVersion: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TriggerMode: z.string().optional(),
  ScheduleConfiguration: z.object({
    CronExpression: z.string(),
  }).optional(),
  WorkflowStatus: z.string().optional(),
  CreatedAt: z.string().optional(),
  ModifiedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9\\.\\-_]*$"),
  ).optional(),
  Description: z.string().min(1).max(1024).regex(new RegExp("^.+$")).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().min(1).optional(),
    ObjectKey: z.string().min(1).optional(),
    VersionId: z.string().optional(),
  }).optional(),
  RoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(?:-(?:cn|us-gov|iso|iso-b|iso-e|iso-f))?:iam::[0-9]{12}:role(/[a-zA-Z0-9+=,.@_-]{1,512})*?/[a-zA-Z0-9+=,.@_-]{1,64}$",
    ),
  ).optional(),
  EncryptionConfiguration: z.object({
    Type: z.enum(["AWS_MANAGED_KEY", "CUSTOMER_MANAGED_KEY"]).optional(),
    KmsKeyId: z.string().optional(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string().min(1).optional(),
  }).optional(),
  NetworkConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A map of key-value pairs to be applied as tags",
  ).optional(),
  TriggerMode: z.string().min(1).max(255).optional(),
  ScheduleConfiguration: z.object({
    CronExpression: z.string().optional(),
  }).optional(),
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

/** Swamp extension model for MWAAServerless Workflow. Registered at `@swamp/aws/mwaaserverless/workflow`. */
export const model = {
  type: "@swamp/aws/mwaaserverless/workflow",
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
      description: "MWAAServerless Workflow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MWAAServerless Workflow",
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
          "AWS::MWAAServerless::Workflow",
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
      description: "Get a MWAAServerless Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MWAAServerless Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MWAAServerless::Workflow",
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
      description: "Update a MWAAServerless Workflow",
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
        const identifier = existing.WorkflowArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MWAAServerless::Workflow",
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
          "AWS::MWAAServerless::Workflow",
          identifier,
          currentState,
          desiredState,
          ["Name", "EncryptionConfiguration"],
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
      description: "Delete a MWAAServerless Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MWAAServerless Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MWAAServerless::Workflow",
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
      description: "Sync MWAAServerless Workflow state from AWS",
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
        const identifier = existing.WorkflowArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MWAAServerless::Workflow",
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
