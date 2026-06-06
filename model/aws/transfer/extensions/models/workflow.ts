// Auto-generated extension model for @swamp/aws/transfer/workflow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Transfer Workflow (AWS::Transfer::Workflow).
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

const S3InputFileLocationSchema = z.object({
  Bucket: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ).describe("Specifies the S3 bucket that contains the file.").optional(),
  Key: z.string().min(0).max(1024).regex(new RegExp(".*")).describe(
    "The name assigned to the file when it was created in S3. You use the object key to retrieve the object.",
  ).optional(),
});

const S3FileLocationSchema = z.object({
  S3FileLocation: S3InputFileLocationSchema.describe(
    "Specifies the details for a S3 file.",
  ).optional(),
});

const EfsInputFileLocationSchema = z.object({
  FileSystemId: z.string().min(0).max(128).regex(
    new RegExp(
      "^(arn:aws[-a-z]*:elasticfilesystem:[0-9a-z-:]+:(access-point/fsap|file-system/fs)-[0-9a-f]{8,40}|fs(ap)?-[0-9a-f]{8,40})$",
    ),
  ).describe("Specifies the EFS filesystem that contains the file.").optional(),
  Path: z.string().min(1).max(65536).regex(new RegExp("^[^\\x00]+$")).describe(
    "The name assigned to the file when it was created in EFS. You use the object path to retrieve the object.",
  ).optional(),
});

const InputFileLocationSchema = z.object({
  S3FileLocation: S3InputFileLocationSchema.describe(
    "Specifies the details for a S3 file.",
  ).optional(),
  EfsFileLocation: EfsInputFileLocationSchema.describe(
    "Specifies the details for an EFS file.",
  ).optional(),
});

const S3TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The name assigned to the tag that you create.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value that corresponds to the key.",
  ),
});

const WorkflowStepSchema = z.object({
  CopyStepDetails: z.object({
    DestinationFileLocation: S3FileLocationSchema.describe(
      "Specifies the location for the file being copied. Only applicable for the Copy type of workflow steps.",
    ).optional(),
    Name: z.string().min(0).max(30).regex(new RegExp("^[\\w-]*$")).describe(
      "The name of the step, used as an identifier.",
    ).optional(),
    OverwriteExisting: z.enum(["TRUE", "FALSE"]).describe(
      "A flag that indicates whether or not to overwrite an existing file of the same name. The default is FALSE.",
    ).optional(),
    SourceFileLocation: z.string().min(0).max(256).regex(
      new RegExp("^\\$\\{(\\w+.)+\\w+\\}$"),
    ).describe("Specifies which file to use as input to the workflow step.")
      .optional(),
  }).describe("Details for a step that performs a file copy.").optional(),
  CustomStepDetails: z.object({
    Name: z.string().min(0).max(30).regex(new RegExp("^[\\w-]*$")).describe(
      "The name of the step, used as an identifier.",
    ).optional(),
    Target: z.string().min(0).max(170).regex(
      new RegExp("arn:[a-z-]+:lambda:.*$"),
    ).describe("The ARN for the lambda function that is being called.")
      .optional(),
    TimeoutSeconds: z.number().int().min(1).max(1800).describe(
      "Timeout, in seconds, for the step.",
    ).optional(),
    SourceFileLocation: z.string().min(0).max(256).regex(
      new RegExp("^\\$\\{(\\w+.)+\\w+\\}$"),
    ).describe("Specifies which file to use as input to the workflow step.")
      .optional(),
  }).describe("Details for a step that invokes a lambda function.").optional(),
  DecryptStepDetails: z.object({
    DestinationFileLocation: InputFileLocationSchema.describe(
      "Specifies the location for the file being decrypted. Only applicable for the Decrypt type of workflow steps.",
    ),
    Name: z.string().min(0).max(30).regex(new RegExp("^[\\w-]*$")).describe(
      "The name of the step, used as an identifier.",
    ).optional(),
    Type: z.enum(["PGP"]).describe("Specifies which encryption method to use."),
    OverwriteExisting: z.enum(["TRUE", "FALSE"]).describe(
      "A flag that indicates whether or not to overwrite an existing file of the same name. The default is FALSE.",
    ).optional(),
    SourceFileLocation: z.string().min(0).max(256).regex(
      new RegExp("^\\$\\{(\\w+.)+\\w+\\}$"),
    ).describe("Specifies which file to use as input to the workflow step.")
      .optional(),
  }).describe("Details for a step that performs a file decryption.").optional(),
  DeleteStepDetails: z.object({
    Name: z.string().min(0).max(30).regex(new RegExp("^[\\w-]*$")).describe(
      "The name of the step, used as an identifier.",
    ).optional(),
    SourceFileLocation: z.string().min(0).max(256).regex(
      new RegExp("^\\$\\{(\\w+.)+\\w+\\}$"),
    ).describe("Specifies which file to use as input to the workflow step.")
      .optional(),
  }).describe("Details for a step that deletes the file.").optional(),
  TagStepDetails: z.object({
    Name: z.string().min(0).max(30).regex(new RegExp("^[\\w-]*$")).describe(
      "The name of the step, used as an identifier.",
    ).optional(),
    Tags: z.array(S3TagSchema).describe(
      "Array that contains from 1 to 10 key/value pairs.",
    ).optional(),
    SourceFileLocation: z.string().min(0).max(256).regex(
      new RegExp("^\\$\\{(\\w+.)+\\w+\\}$"),
    ).describe("Specifies which file to use as input to the workflow step.")
      .optional(),
  }).describe("Details for a step that creates one or more tags.").optional(),
  Type: z.enum(["COPY", "CUSTOM", "DECRYPT", "DELETE", "TAG"]).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The name assigned to the tag that you create.",
  ),
  Value: z.string().min(0).max(256).describe(
    "Contains one or more values that you assigned to the key name you create.",
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
  OnExceptionSteps: z.array(WorkflowStepSchema).describe(
    "Specifies the steps (actions) to take if any errors are encountered during execution of the workflow.",
  ).optional(),
  Steps: z.array(WorkflowStepSchema).describe(
    "Specifies the details for the steps that are in the specified workflow.",
  ),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to group and search for workflows. Tags are metadata attached to workflows for any purpose.",
  ).optional(),
  Description: z.string().min(0).max(256).regex(new RegExp("^[\\w\\- ]*$"))
    .describe("A textual description for the workflow.").optional(),
});

const StateSchema = z.object({
  OnExceptionSteps: z.array(WorkflowStepSchema).optional(),
  Steps: z.array(WorkflowStepSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Description: z.string().optional(),
  WorkflowId: z.string(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OnExceptionSteps: z.array(WorkflowStepSchema).describe(
    "Specifies the steps (actions) to take if any errors are encountered during execution of the workflow.",
  ).optional(),
  Steps: z.array(WorkflowStepSchema).describe(
    "Specifies the details for the steps that are in the specified workflow.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to group and search for workflows. Tags are metadata attached to workflows for any purpose.",
  ).optional(),
  Description: z.string().min(0).max(256).regex(new RegExp("^[\\w\\- ]*$"))
    .describe("A textual description for the workflow.").optional(),
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

/** Swamp extension model for Transfer Workflow. Registered at `@swamp/aws/transfer/workflow`. */
export const model = {
  type: "@swamp/aws/transfer/workflow",
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
      description: "Transfer Workflow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Transfer Workflow",
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
          "AWS::Transfer::Workflow",
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
      description: "Get a Transfer Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Transfer::Workflow",
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
      description: "Update a Transfer Workflow",
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
        const identifier = existing.WorkflowId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Transfer::Workflow",
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
          "AWS::Transfer::Workflow",
          identifier,
          currentState,
          desiredState,
          ["Steps", "OnExceptionSteps", "Description"],
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
      description: "Delete a Transfer Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Transfer::Workflow",
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
      description: "Sync Transfer Workflow state from AWS",
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
        const identifier = existing.WorkflowId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Transfer::Workflow",
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
