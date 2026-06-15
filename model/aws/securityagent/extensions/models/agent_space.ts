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

// Auto-generated extension model for @swamp/aws/securityagent/agent-space
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecurityAgent AgentSpace (AWS::SecurityAgent::AgentSpace).
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

const VpcConfigSchema = z.object({
  VpcArn: z.string().describe("ARN of the customer VPC").optional(),
  SecurityGroupArns: z.array(z.string()).describe(
    "List of security group ARNs in the customer VPC",
  ).optional(),
  SubnetArns: z.array(z.string()).describe(
    "List of subnet ARNs in the customer VPC",
  ).optional(),
});

const GitHubRepositoryResourceSchema = z.object({
  Name: z.string().describe("GitHub repository name"),
  Owner: z.string().describe("GitHub repository owner (user or organization)"),
});

const GitHubCapabilitiesResourceSchema = z.object({
  LeaveComments: z.boolean().describe("Enables Code Review in the repository"),
  RemediateCode: z.boolean().describe(
    "Enables creation of pull requests with automated fixes",
  ),
});

const ProviderResourceSchema = z.object({
  GitHubRepository: GitHubRepositoryResourceSchema.describe(
    "GitHub repository details",
  ).optional(),
  GitHubCapabilities: GitHubCapabilitiesResourceSchema.describe(
    "GitHub repository capabilities",
  ).optional(),
});

const IntegratedResourceSchema = z.object({
  Integration: z.string().describe(
    "Unique identifier of the Provider Integration",
  ),
  ProviderResources: z.array(ProviderResourceSchema).describe(
    "List of selected Resources from the Integration",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag"),
  Value: z.string().min(0).max(256).describe("The value for the tag"),
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
  Name: z.string().describe("Name of the agent space"),
  Description: z.string().describe("Description of the agent space").optional(),
  AwsResources: z.object({
    Vpcs: z.array(VpcConfigSchema).describe("VPC configurations").optional(),
    LogGroups: z.array(z.string()).describe("CloudWatch log group ARNs")
      .optional(),
    S3Buckets: z.array(z.string()).describe("S3 bucket ARNs").optional(),
    SecretArns: z.array(z.string()).describe(
      "SecretsManager secret ARNs used to store tester credentials for pentests",
    ).optional(),
    LambdaFunctionArns: z.array(z.string()).describe(
      "Lambda function ARNs used to retrieve tester credentials for pentests",
    ).optional(),
    IamRoles: z.array(z.string()).describe("IAM role ARNs").optional(),
  }).describe("AWS resource configuration").optional(),
  CodeReviewSettings: z.object({
    ControlsScanning: z.boolean().describe(
      "Whether Controls are utilized for code review analysis",
    ),
    GeneralPurposeScanning: z.boolean().describe(
      "Whether general purpose analysis is performed for code review",
    ),
  }).describe("Details of code review settings").optional(),
  KmsKeyId: z.string().min(1).max(2048).describe(
    "Identifier of the KMS key used to encrypt data. Can be a key ID, key ARN, alias name, or alias ARN. If not specified, an AWS managed key is used.",
  ).optional(),
  IntegratedResources: z.array(IntegratedResourceSchema).describe(
    "Integrated Resources configuration",
  ).optional(),
  TargetDomainIds: z.array(z.string()).describe(
    "List of target domain identifiers registered with the agent space",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags for the agent space").optional(),
});

const StateSchema = z.object({
  AgentSpaceId: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  AwsResources: z.object({
    Vpcs: z.array(VpcConfigSchema),
    LogGroups: z.array(z.string()),
    S3Buckets: z.array(z.string()),
    SecretArns: z.array(z.string()),
    LambdaFunctionArns: z.array(z.string()),
    IamRoles: z.array(z.string()),
  }).optional(),
  CodeReviewSettings: z.object({
    ControlsScanning: z.boolean(),
    GeneralPurposeScanning: z.boolean(),
  }).optional(),
  KmsKeyId: z.string().optional(),
  IntegratedResources: z.array(IntegratedResourceSchema).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  TargetDomainIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("Name of the agent space").optional(),
  Description: z.string().describe("Description of the agent space").optional(),
  AwsResources: z.object({
    Vpcs: z.array(VpcConfigSchema).describe("VPC configurations").optional(),
    LogGroups: z.array(z.string()).describe("CloudWatch log group ARNs")
      .optional(),
    S3Buckets: z.array(z.string()).describe("S3 bucket ARNs").optional(),
    SecretArns: z.array(z.string()).describe(
      "SecretsManager secret ARNs used to store tester credentials for pentests",
    ).optional(),
    LambdaFunctionArns: z.array(z.string()).describe(
      "Lambda function ARNs used to retrieve tester credentials for pentests",
    ).optional(),
    IamRoles: z.array(z.string()).describe("IAM role ARNs").optional(),
  }).describe("AWS resource configuration").optional(),
  CodeReviewSettings: z.object({
    ControlsScanning: z.boolean().describe(
      "Whether Controls are utilized for code review analysis",
    ).optional(),
    GeneralPurposeScanning: z.boolean().describe(
      "Whether general purpose analysis is performed for code review",
    ).optional(),
  }).describe("Details of code review settings").optional(),
  KmsKeyId: z.string().min(1).max(2048).describe(
    "Identifier of the KMS key used to encrypt data. Can be a key ID, key ARN, alias name, or alias ARN. If not specified, an AWS managed key is used.",
  ).optional(),
  IntegratedResources: z.array(IntegratedResourceSchema).describe(
    "Integrated Resources configuration",
  ).optional(),
  TargetDomainIds: z.array(z.string()).describe(
    "List of target domain identifiers registered with the agent space",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags for the agent space").optional(),
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

/** Swamp extension model for SecurityAgent AgentSpace. Registered at `@swamp/aws/securityagent/agent-space`. */
export const model = {
  type: "@swamp/aws/securityagent/agent-space",
  version: "2026.06.15.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
      description: "Added: KmsKeyId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.3",
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
      toVersion: "2026.04.03.3",
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
      description: "SecurityAgent AgentSpace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityAgent AgentSpace",
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
          "AWS::SecurityAgent::AgentSpace",
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
      description: "Get a SecurityAgent AgentSpace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityAgent AgentSpace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SecurityAgent::AgentSpace",
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
      description: "Update a SecurityAgent AgentSpace",
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
        const identifier = existing.AgentSpaceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SecurityAgent::AgentSpace",
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
          "AWS::SecurityAgent::AgentSpace",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyId"],
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
      description: "Delete a SecurityAgent AgentSpace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityAgent AgentSpace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SecurityAgent::AgentSpace",
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
      description: "Sync SecurityAgent AgentSpace state from AWS",
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
        const identifier = existing.AgentSpaceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SecurityAgent::AgentSpace",
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
