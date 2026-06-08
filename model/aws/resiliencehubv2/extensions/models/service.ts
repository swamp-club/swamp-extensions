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

// Auto-generated extension model for @swamp/aws/resiliencehubv2/service
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ResilienceHubV2 Service (AWS::ResilienceHubV2::Service).
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

const AssociatedSystemSchema = z.object({
  SystemArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-iso|aws-iso-[a-z]{1}|aws-us-gov):[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:([a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]):[0-9]{12}:[A-Za-z0-9/][A-Za-z0-9:_/+.-]{0,1023}$",
    ),
  ).describe("The system ARN."),
  UserJourneyIds: z.array(z.string().regex(new RegExp("^\\S{1,255}$")))
    .describe("User journey IDs associated with this system.").optional(),
});

const CrossAccountRoleConfigurationSchema = z.object({
  CrossAccountRoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-iso|aws-iso-[a-z]{1}|aws-us-gov):iam::[0-9]{12}:role\\/(([^\\/][\\x21-\\x7E]+\\/){1,511})?[A-Za-z0-9_+=,.@-]{1,64}$",
    ),
  ).describe("ARN of the cross-account IAM role."),
  ExternalId: z.string().describe("External ID for cross-account access.")
    .optional(),
});

const S3ReportOutputConfigurationSchema = z.object({
  BucketPath: z.string().min(3).max(512).regex(
    new RegExp("^(s3://)?[a-z0-9][a-z0-9.-]{1,61}[a-z0-9](/.*)?$"),
  ).describe("S3 bucket path where reports will be written."),
  BucketOwner: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "Account ID of the bucket owner.",
  ),
});

const ReportOutputConfigurationSchema = z.object({
  S3: S3ReportOutputConfigurationSchema.describe(
    "S3 configuration for report output.",
  ).optional(),
});

const ResourceTagSchema = z.object({
  Key: z.string().min(1).max(128).describe("Tag key."),
  Values: z.array(z.string()).describe("Tag values."),
});

const EksSourceSchema = z.object({
  ClusterArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-iso|aws-iso-[a-z]{1}|aws-us-gov):[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:([a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]):[0-9]{12}:[A-Za-z0-9/][A-Za-z0-9:_/+.-]{0,1023}$",
    ),
  ).describe("ARN of the EKS cluster."),
  Namespaces: z.array(z.string()).describe("EKS namespaces."),
});

const ResourceConfigurationSchema = z.object({
  ResourceTags: z.array(ResourceTagSchema).describe(
    "Resource tags to discover resources.",
  ).optional(),
  CfnStackArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-iso|aws-iso-[a-z]{1}|aws-us-gov):[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:([a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]):[0-9]{12}:[A-Za-z0-9/][A-Za-z0-9:_/+.-]{0,1023}$",
    ),
  ).describe("ARN of a CloudFormation stack.").optional(),
  TfStateFileUrl: z.string().describe("URL of a Terraform state file.")
    .optional(),
  Eks: EksSourceSchema.optional(),
  DesignFileS3Url: z.string().describe("S3 URL of a design file.").optional(),
});

const InputSourceDefinitionSchema = z.object({
  ResourceConfiguration: ResourceConfigurationSchema.describe(
    "Resource configuration for an input source. Provide exactly one field.",
  ),
});

const AssertionDefinitionSchema = z.object({
  Text: z.string().min(1).max(1000).describe("The text of the assertion."),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag key."),
  Value: z.string().min(0).max(256).describe("The tag value."),
});

const SloSourceSchema = z.object({
  Value: z.number().optional(),
  PolicyName: z.string().optional(),
});

const TargetSourceSchema = z.object({
  Value: z.number().int().optional(),
  PolicyName: z.string().optional(),
});

const DisasterRecoverySourceSchema = z.object({
  Value: z.string().optional(),
  PolicyName: z.string().optional(),
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
  Name: z.string().regex(new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-]{1,59}$"))
    .describe("The name of the service."),
  Description: z.string().max(615).describe("The description of the service.")
    .optional(),
  Regions: z.array(
    z.string().regex(
      new RegExp("^[a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]$"),
    ),
  ).describe("AWS regions for the service."),
  AssociatedSystems: z.array(AssociatedSystemSchema).describe(
    "Systems associated with this service.",
  ).optional(),
  PolicyArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-iso|aws-iso-[a-z]{1}|aws-us-gov):[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:([a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]):[0-9]{12}:[A-Za-z0-9/][A-Za-z0-9:_/+.-]{0,1023}$",
    ),
  ).describe("The ARN of the resilience policy to associate.").optional(),
  PermissionModel: z.object({
    InvokerRoleName: z.string().regex(
      new RegExp("^[A-Za-z0-9_+=,.@\\-]{1,64}$"),
    ).describe("Name of the invoker IAM role."),
    CrossAccountRoleArns: z.array(CrossAccountRoleConfigurationSchema).describe(
      "Cross-account role ARNs.",
    ).optional(),
  }).optional(),
  DependencyDiscovery: z.enum(["ENABLED", "DISABLED", "INITIALIZING"]).describe(
    "Dependency discovery state.",
  ).optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(ReportOutputConfigurationSchema).describe(
      "Output destinations for generated reports.",
    ),
  }).describe("Configuration for automatic report generation on a Service.")
    .optional(),
  InputSources: z.array(InputSourceDefinitionSchema).describe(
    "Input sources for this service.",
  ).optional(),
  Assertions: z.array(AssertionDefinitionSchema).describe(
    "Assertions associated with this service.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags assigned to the service.").optional(),
  EffectivePolicyValues: z.object({
    AvailabilitySlo: SloSourceSchema.optional(),
    MultiAzRto: TargetSourceSchema.optional(),
    MultiAzRpo: TargetSourceSchema.optional(),
    MultiAzDrApproach: DisasterRecoverySourceSchema.optional(),
    MultiRegionRto: TargetSourceSchema.optional(),
    MultiRegionRpo: TargetSourceSchema.optional(),
    MultiRegionDrApproach: DisasterRecoverySourceSchema.optional(),
  }).describe("Effective policy values computed from the associated policy.")
    .optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^((arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:((key/[a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)))|([a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+))$",
    ),
  ).describe("The KMS key ID for encrypting service data.").optional(),
});

const StateSchema = z.object({
  ServiceArn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Regions: z.array(z.string()).optional(),
  AssociatedSystems: z.array(AssociatedSystemSchema).optional(),
  PolicyArn: z.string().optional(),
  PermissionModel: z.object({
    InvokerRoleName: z.string(),
    CrossAccountRoleArns: z.array(CrossAccountRoleConfigurationSchema),
  }).optional(),
  DependencyDiscovery: z.string().optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(ReportOutputConfigurationSchema),
  }).optional(),
  InputSources: z.array(InputSourceDefinitionSchema).optional(),
  Assertions: z.array(AssertionDefinitionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  EffectivePolicyValues: z.object({
    AvailabilitySlo: SloSourceSchema,
    MultiAzRto: TargetSourceSchema,
    MultiAzRpo: TargetSourceSchema,
    MultiAzDrApproach: DisasterRecoverySourceSchema,
    MultiRegionRto: TargetSourceSchema,
    MultiRegionRpo: TargetSourceSchema,
    MultiRegionDrApproach: DisasterRecoverySourceSchema,
  }).optional(),
  KmsKeyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-]{1,59}$"))
    .describe("The name of the service.").optional(),
  Description: z.string().max(615).describe("The description of the service.")
    .optional(),
  Regions: z.array(
    z.string().regex(
      new RegExp("^[a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]$"),
    ),
  ).describe("AWS regions for the service.").optional(),
  AssociatedSystems: z.array(AssociatedSystemSchema).describe(
    "Systems associated with this service.",
  ).optional(),
  PolicyArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-iso|aws-iso-[a-z]{1}|aws-us-gov):[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:([a-z]{2}-((iso[a-z]{0,1}-)|(gov-)){0,1}[a-z]+-[0-9]):[0-9]{12}:[A-Za-z0-9/][A-Za-z0-9:_/+.-]{0,1023}$",
    ),
  ).describe("The ARN of the resilience policy to associate.").optional(),
  PermissionModel: z.object({
    InvokerRoleName: z.string().regex(
      new RegExp("^[A-Za-z0-9_+=,.@\\-]{1,64}$"),
    ).describe("Name of the invoker IAM role.").optional(),
    CrossAccountRoleArns: z.array(CrossAccountRoleConfigurationSchema).describe(
      "Cross-account role ARNs.",
    ).optional(),
  }).optional(),
  DependencyDiscovery: z.enum(["ENABLED", "DISABLED", "INITIALIZING"]).describe(
    "Dependency discovery state.",
  ).optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(ReportOutputConfigurationSchema).describe(
      "Output destinations for generated reports.",
    ).optional(),
  }).describe("Configuration for automatic report generation on a Service.")
    .optional(),
  InputSources: z.array(InputSourceDefinitionSchema).describe(
    "Input sources for this service.",
  ).optional(),
  Assertions: z.array(AssertionDefinitionSchema).describe(
    "Assertions associated with this service.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags assigned to the service.").optional(),
  EffectivePolicyValues: z.object({
    AvailabilitySlo: SloSourceSchema.optional(),
    MultiAzRto: TargetSourceSchema.optional(),
    MultiAzRpo: TargetSourceSchema.optional(),
    MultiAzDrApproach: DisasterRecoverySourceSchema.optional(),
    MultiRegionRto: TargetSourceSchema.optional(),
    MultiRegionRpo: TargetSourceSchema.optional(),
    MultiRegionDrApproach: DisasterRecoverySourceSchema.optional(),
  }).describe("Effective policy values computed from the associated policy.")
    .optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^((arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:((key/[a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)))|([a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+))$",
    ),
  ).describe("The KMS key ID for encrypting service data.").optional(),
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

/** Swamp extension model for ResilienceHubV2 Service. Registered at `@swamp/aws/resiliencehubv2/service`. */
export const model = {
  type: "@swamp/aws/resiliencehubv2/service",
  version: "2026.06.08.1",
  upgrades: [
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
      description: "ResilienceHubV2 Service resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ResilienceHubV2 Service",
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
          "AWS::ResilienceHubV2::Service",
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
      description: "Get a ResilienceHubV2 Service",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ResilienceHubV2 Service",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ResilienceHubV2::Service",
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
      description: "Update a ResilienceHubV2 Service",
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
        const identifier = existing.ServiceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ResilienceHubV2::Service",
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
          "AWS::ResilienceHubV2::Service",
          identifier,
          currentState,
          desiredState,
          ["Name", "Regions", "KmsKeyId"],
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
      description: "Delete a ResilienceHubV2 Service",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ResilienceHubV2 Service",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ResilienceHubV2::Service",
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
      description: "Sync ResilienceHubV2 Service state from AWS",
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
        const identifier = existing.ServiceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ResilienceHubV2::Service",
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
