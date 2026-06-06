// Auto-generated extension model for @swamp/aws/omics/workflow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Omics Workflow (AWS::Omics::Workflow).
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

const WorkflowParameterSchema = z.object({
  Description: z.string().min(0).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Optional: z.boolean().optional(),
});

const SourceReferenceSchema = z.object({
  type: z.enum(["BRANCH", "TAG", "COMMIT"]).optional(),
  value: z.string().optional(),
});

const RegistryMappingSchema = z.object({
  UpstreamRegistryUrl: z.string().min(1).max(750).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  EcrRepositoryPrefix: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  UpstreamRepositoryPrefix: z.string().min(2).max(30).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  EcrAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]+$"))
    .optional(),
});

const ImageMappingSchema = z.object({
  SourceImage: z.string().min(1).max(750).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  DestinationImage: z.string().min(1).max(750).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
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
  DefinitionUri: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Description: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Engine: z.enum(["WDL", "NEXTFLOW", "CWL"]).optional(),
  Main: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Name: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  ParameterTemplate: z.record(z.string(), WorkflowParameterSchema).optional(),
  Accelerators: z.enum(["GPU"]).optional(),
  StorageCapacity: z.number().min(0).max(100000).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A map of resource tags",
  ).optional(),
  StorageType: z.enum(["STATIC", "DYNAMIC"]).optional(),
  WorkflowBucketOwnerId: z.string().regex(new RegExp("^[0-9]{12}$")).describe(
    "Optional workflow bucket owner ID to verify the workflow bucket",
  ).optional(),
  DefinitionRepository: z.object({
    connectionArn: z.string().min(1).max(256).regex(
      new RegExp("^arn:aws(-[\\\\w]+)*:.+:.+:[0-9]{12}:.+$"),
    ).optional(),
    fullRepositoryId: z.string().regex(new RegExp(".+/.+")).optional(),
    sourceReference: SourceReferenceSchema.optional(),
    excludeFilePatterns: z.array(z.string()).optional(),
  }).optional(),
  ParameterTemplatePath: z.string().regex(new RegExp("^[\\S]+$")).describe(
    "Path to the primary workflow parameter template JSON file inside the repository",
  ).optional(),
  readmePath: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe(
    "The path to the workflow README markdown file within the repository. This file provides documentation and usage information for the workflow. If not specified, the README.md file from the root directory of the repository will be used.",
  ).optional(),
  readmeUri: z.string().regex(
    new RegExp("^s3://([a-z0-9][a-z0-9-.]{1,61}[a-z0-9])/((.{1,1024}))$"),
  ).describe(
    "The S3 URI of the README file for the workflow. This file provides documentation and usage information for the workflow. The S3 URI must begin with s3://USER-OWNED-BUCKET/. The requester must have access to the S3 bucket and object. The max README content length is 500 KiB.",
  ).optional(),
  readmeMarkdown: z.string().describe(
    "The markdown content for the workflow's README file. This provides documentation and usage information for users of the workflow.",
  ).optional(),
  ContainerRegistryMap: z.object({
    RegistryMappings: z.array(RegistryMappingSchema).optional(),
    ImageMappings: z.array(ImageMappingSchema).optional(),
  }).optional(),
  ContainerRegistryMapUri: z.string().min(1).max(750).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CreationTime: z.string().optional(),
  DefinitionUri: z.string().optional(),
  Description: z.string().optional(),
  Engine: z.string().optional(),
  Id: z.string(),
  Main: z.string().optional(),
  Name: z.string().optional(),
  ParameterTemplate: z.record(z.string(), z.unknown()).optional(),
  Status: z.string().optional(),
  Accelerators: z.string().optional(),
  StorageCapacity: z.number().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Type: z.string().optional(),
  StorageType: z.string().optional(),
  Uuid: z.string().optional(),
  WorkflowBucketOwnerId: z.string().optional(),
  DefinitionRepository: z.object({
    connectionArn: z.string(),
    fullRepositoryId: z.string(),
    sourceReference: SourceReferenceSchema,
    excludeFilePatterns: z.array(z.string()),
  }).optional(),
  ParameterTemplatePath: z.string().optional(),
  readmePath: z.string().optional(),
  readmeUri: z.string().optional(),
  readmeMarkdown: z.string().optional(),
  ContainerRegistryMap: z.object({
    RegistryMappings: z.array(RegistryMappingSchema),
    ImageMappings: z.array(ImageMappingSchema),
  }).optional(),
  ContainerRegistryMapUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DefinitionUri: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Description: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Engine: z.enum(["WDL", "NEXTFLOW", "CWL"]).optional(),
  Main: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  Name: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).optional(),
  ParameterTemplate: z.record(z.string(), WorkflowParameterSchema).optional(),
  Accelerators: z.enum(["GPU"]).optional(),
  StorageCapacity: z.number().min(0).max(100000).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A map of resource tags",
  ).optional(),
  StorageType: z.enum(["STATIC", "DYNAMIC"]).optional(),
  WorkflowBucketOwnerId: z.string().regex(new RegExp("^[0-9]{12}$")).describe(
    "Optional workflow bucket owner ID to verify the workflow bucket",
  ).optional(),
  DefinitionRepository: z.object({
    connectionArn: z.string().min(1).max(256).regex(
      new RegExp("^arn:aws(-[\\\\w]+)*:.+:.+:[0-9]{12}:.+$"),
    ).optional(),
    fullRepositoryId: z.string().regex(new RegExp(".+/.+")).optional(),
    sourceReference: SourceReferenceSchema.optional(),
    excludeFilePatterns: z.array(z.string()).optional(),
  }).optional(),
  ParameterTemplatePath: z.string().regex(new RegExp("^[\\S]+$")).describe(
    "Path to the primary workflow parameter template JSON file inside the repository",
  ).optional(),
  readmePath: z.string().min(1).max(128).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe(
    "The path to the workflow README markdown file within the repository. This file provides documentation and usage information for the workflow. If not specified, the README.md file from the root directory of the repository will be used.",
  ).optional(),
  readmeUri: z.string().regex(
    new RegExp("^s3://([a-z0-9][a-z0-9-.]{1,61}[a-z0-9])/((.{1,1024}))$"),
  ).describe(
    "The S3 URI of the README file for the workflow. This file provides documentation and usage information for the workflow. The S3 URI must begin with s3://USER-OWNED-BUCKET/. The requester must have access to the S3 bucket and object. The max README content length is 500 KiB.",
  ).optional(),
  readmeMarkdown: z.string().describe(
    "The markdown content for the workflow's README file. This provides documentation and usage information for users of the workflow.",
  ).optional(),
  ContainerRegistryMap: z.object({
    RegistryMappings: z.array(RegistryMappingSchema).optional(),
    ImageMappings: z.array(ImageMappingSchema).optional(),
  }).optional(),
  ContainerRegistryMapUri: z.string().min(1).max(750).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
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

/** Swamp extension model for Omics Workflow. Registered at `@swamp/aws/omics/workflow`. */
export const model = {
  type: "@swamp/aws/omics/workflow",
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
      description: "Omics Workflow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Omics Workflow",
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
          "AWS::Omics::Workflow",
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
      description: "Get a Omics Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Omics::Workflow",
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
      description: "Update a Omics Workflow",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Omics::Workflow",
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
          "AWS::Omics::Workflow",
          identifier,
          currentState,
          desiredState,
          [
            "DefinitionUri",
            "Engine",
            "Main",
            "ParameterTemplate",
            "StorageCapacity",
            "Accelerators",
            "DefinitionRepository",
            "ParameterTemplatePath",
            "readmePath",
            "readmeUri",
            "WorkflowBucketOwnerId",
            "ContainerRegistryMap",
            "ContainerRegistryMapUri",
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
      description: "Delete a Omics Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Omics::Workflow",
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
      description: "Sync Omics Workflow state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Omics::Workflow",
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
