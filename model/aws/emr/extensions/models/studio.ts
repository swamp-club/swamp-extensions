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

// Auto-generated extension model for @swamp/aws/emr/studio
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EMR Studio (AWS::EMR::Studio).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).regex(new RegExp("[a-zA-Z+-=._:/]+$"))
    .describe(
      "The value for the tag. You can specify a value that is 0 to 255 Unicode characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  AuthMode: z.enum(["SSO", "IAM"]).describe(
    "Specifies whether the Studio authenticates users using single sign-on (SSO) or IAM. Amazon EMR Studio currently only supports SSO authentication.",
  ),
  DefaultS3Location: z.string().min(6).max(10280).regex(new RegExp("^s3://.*"))
    .describe(
      "The default Amazon S3 location to back up EMR Studio Workspaces and notebook files. A Studio user can select an alternative Amazon S3 location when creating a Workspace.",
    ),
  Description: z.string().min(0).max(256).describe(
    "A detailed description of the Studio.",
  ).optional(),
  EngineSecurityGroupId: z.string().min(4).max(256).regex(
    new RegExp("^sg-[a-zA-Z0-9\\-._]+$"),
  ).describe(
    "The ID of the Amazon EMR Studio Engine security group. The Engine security group allows inbound network traffic from the Workspace security group, and it must be in the same VPC specified by VpcId.",
  ),
  Name: z.string().min(1).max(256).regex(new RegExp("[a-zA-Z0-9_-]+")).describe(
    "A descriptive name for the Amazon EMR Studio.",
  ),
  ServiceRole: z.string().regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso-f|iso-e))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe(
    "The IAM role that will be assumed by the Amazon EMR Studio. The service role provides a way for Amazon EMR Studio to interoperate with other AWS services.",
  ),
  SubnetIds: z.array(
    z.string().regex(
      new RegExp("^(subnet-[a-f0-9]{13})|(subnet-[a-f0-9]{8})$"),
    ),
  ).describe(
    "A list of up to 5 subnet IDs to associate with the Studio. The subnets must belong to the VPC specified by VpcId. Studio users can create a Workspace in any of the specified subnets.",
  ),
  Tags: z.array(TagSchema).describe(
    "A list of tags to associate with the Studio. Tags are user-defined key-value pairs that consist of a required key string with a maximum of 128 characters, and an optional value string with a maximum of 256 characters.",
  ).optional(),
  UserRole: z.string().regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso-f|iso-e))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe(
    "The IAM user role that will be assumed by users and groups logged in to a Studio. The permissions attached to this IAM role can be scoped down for each user or group using session policies.",
  ).optional(),
  VpcId: z.string().regex(new RegExp("^(vpc-[0-9a-f]{8}|vpc-[0-9a-f]{17})$"))
    .describe(
      "The ID of the Amazon Virtual Private Cloud (Amazon VPC) to associate with the Studio.",
    ),
  WorkspaceSecurityGroupId: z.string().regex(
    new RegExp("^sg-[a-zA-Z0-9\\-._]+$"),
  ).describe(
    "The ID of the Amazon EMR Studio Workspace security group. The Workspace security group allows outbound network traffic to resources in the Engine security group, and it must be in the same VPC specified by VpcId.",
  ),
  IdpAuthUrl: z.string().max(4096).regex(
    new RegExp(
      "^https://[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])(:[0-9]*)*([?/#].*)?$",
    ),
  ).describe(
    "Your identity provider's authentication endpoint. Amazon EMR Studio redirects federated users to this endpoint for authentication when logging in to a Studio with the Studio URL.",
  ).optional(),
  IdpRelayStateParameterName: z.string().min(0).max(256).describe(
    "The name of relay state parameter for external Identity Provider.",
  ).optional(),
  TrustedIdentityPropagationEnabled: z.boolean().describe(
    "A Boolean indicating whether to enable Trusted identity propagation for the Studio. The default value is false.",
  ).optional(),
  IdcUserAssignment: z.enum(["REQUIRED", "OPTIONAL"]).describe(
    "Specifies whether IAM Identity Center user assignment is REQUIRED or OPTIONAL. If the value is set to REQUIRED, users must be explicitly assigned to the Studio application to access the Studio.",
  ).optional(),
  IdcInstanceArn: z.string().min(20).max(2048).describe(
    "The ARN of the IAM Identity Center instance to create the Studio application.",
  ).optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso-f|iso-e))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe(
    "The AWS KMS key identifier (ARN) used to encrypt AWS EMR Studio workspace and notebook files when backed up to AWS S3.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AuthMode: z.string().optional(),
  DefaultS3Location: z.string().optional(),
  Description: z.string().optional(),
  EngineSecurityGroupId: z.string().optional(),
  Name: z.string().optional(),
  ServiceRole: z.string().optional(),
  StudioId: z.string(),
  SubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  Url: z.string().optional(),
  UserRole: z.string().optional(),
  VpcId: z.string().optional(),
  WorkspaceSecurityGroupId: z.string().optional(),
  IdpAuthUrl: z.string().optional(),
  IdpRelayStateParameterName: z.string().optional(),
  TrustedIdentityPropagationEnabled: z.boolean().optional(),
  IdcUserAssignment: z.string().optional(),
  IdcInstanceArn: z.string().optional(),
  EncryptionKeyArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AuthMode: z.enum(["SSO", "IAM"]).describe(
    "Specifies whether the Studio authenticates users using single sign-on (SSO) or IAM. Amazon EMR Studio currently only supports SSO authentication.",
  ).optional(),
  DefaultS3Location: z.string().min(6).max(10280).regex(new RegExp("^s3://.*"))
    .describe(
      "The default Amazon S3 location to back up EMR Studio Workspaces and notebook files. A Studio user can select an alternative Amazon S3 location when creating a Workspace.",
    ).optional(),
  Description: z.string().min(0).max(256).describe(
    "A detailed description of the Studio.",
  ).optional(),
  EngineSecurityGroupId: z.string().min(4).max(256).regex(
    new RegExp("^sg-[a-zA-Z0-9\\-._]+$"),
  ).describe(
    "The ID of the Amazon EMR Studio Engine security group. The Engine security group allows inbound network traffic from the Workspace security group, and it must be in the same VPC specified by VpcId.",
  ).optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("[a-zA-Z0-9_-]+")).describe(
    "A descriptive name for the Amazon EMR Studio.",
  ).optional(),
  ServiceRole: z.string().regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso-f|iso-e))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe(
    "The IAM role that will be assumed by the Amazon EMR Studio. The service role provides a way for Amazon EMR Studio to interoperate with other AWS services.",
  ).optional(),
  SubnetIds: z.array(
    z.string().regex(
      new RegExp("^(subnet-[a-f0-9]{13})|(subnet-[a-f0-9]{8})$"),
    ),
  ).describe(
    "A list of up to 5 subnet IDs to associate with the Studio. The subnets must belong to the VPC specified by VpcId. Studio users can create a Workspace in any of the specified subnets.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to associate with the Studio. Tags are user-defined key-value pairs that consist of a required key string with a maximum of 128 characters, and an optional value string with a maximum of 256 characters.",
  ).optional(),
  UserRole: z.string().regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso-f|iso-e))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe(
    "The IAM user role that will be assumed by users and groups logged in to a Studio. The permissions attached to this IAM role can be scoped down for each user or group using session policies.",
  ).optional(),
  VpcId: z.string().regex(new RegExp("^(vpc-[0-9a-f]{8}|vpc-[0-9a-f]{17})$"))
    .describe(
      "The ID of the Amazon Virtual Private Cloud (Amazon VPC) to associate with the Studio.",
    ).optional(),
  WorkspaceSecurityGroupId: z.string().regex(
    new RegExp("^sg-[a-zA-Z0-9\\-._]+$"),
  ).describe(
    "The ID of the Amazon EMR Studio Workspace security group. The Workspace security group allows outbound network traffic to resources in the Engine security group, and it must be in the same VPC specified by VpcId.",
  ).optional(),
  IdpAuthUrl: z.string().max(4096).regex(
    new RegExp(
      "^https://[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])(:[0-9]*)*([?/#].*)?$",
    ),
  ).describe(
    "Your identity provider's authentication endpoint. Amazon EMR Studio redirects federated users to this endpoint for authentication when logging in to a Studio with the Studio URL.",
  ).optional(),
  IdpRelayStateParameterName: z.string().min(0).max(256).describe(
    "The name of relay state parameter for external Identity Provider.",
  ).optional(),
  TrustedIdentityPropagationEnabled: z.boolean().describe(
    "A Boolean indicating whether to enable Trusted identity propagation for the Studio. The default value is false.",
  ).optional(),
  IdcUserAssignment: z.enum(["REQUIRED", "OPTIONAL"]).describe(
    "Specifies whether IAM Identity Center user assignment is REQUIRED or OPTIONAL. If the value is set to REQUIRED, users must be explicitly assigned to the Studio application to access the Studio.",
  ).optional(),
  IdcInstanceArn: z.string().min(20).max(2048).describe(
    "The ARN of the IAM Identity Center instance to create the Studio application.",
  ).optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso-f|iso-e))?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$",
    ),
  ).describe(
    "The AWS KMS key identifier (ARN) used to encrypt AWS EMR Studio workspace and notebook files when backed up to AWS S3.",
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

/** Swamp extension model for EMR Studio. Registered at `@swamp/aws/emr/studio`. */
export const model = {
  type: "@swamp/aws/emr/studio",
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
      description: "EMR Studio resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMR Studio",
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
          "AWS::EMR::Studio",
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
      description: "Get a EMR Studio",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Studio",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EMR::Studio",
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
      description: "Update a EMR Studio",
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
        const identifier = existing.StudioId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EMR::Studio",
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
          "AWS::EMR::Studio",
          identifier,
          currentState,
          desiredState,
          [
            "AuthMode",
            "EngineSecurityGroupId",
            "ServiceRole",
            "UserRole",
            "VpcId",
            "WorkspaceSecurityGroupId",
            "TrustedIdentityPropagationEnabled",
            "IdcUserAssignment",
            "IdcInstanceArn",
            "EncryptionKeyArn",
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
      description: "Delete a EMR Studio",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Studio",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EMR::Studio",
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
      description: "Sync EMR Studio state from AWS",
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
        const identifier = existing.StudioId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EMR::Studio",
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
