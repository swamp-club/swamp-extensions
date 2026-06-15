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

// Auto-generated extension model for @swamp/aws/eks/capability
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EKS Capability (AWS::EKS::Capability).
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

const AwsIdcSchema = z.object({
  IdcInstanceArn: z.string().describe(
    "The ARN of the IAM Identity Center instance to use for authentication.",
  ),
  IdcRegion: z.string().describe(
    "The Region where your IAM Identity Center instance is located.",
  ).optional(),
});

const SsoIdentitySchema = z.object({
  Id: z.string().describe(
    "The unique identifier of the IAM Identity Center user or group.",
  ),
  Type: z.enum(["SSO_USER", "SSO_GROUP"]).describe(
    "The type of identity. Valid values are SSO_USER or SSO_GROUP.",
  ),
});

const ArgoCdRoleMappingSchema = z.object({
  Role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).describe(
    "The Argo CD role to assign. Valid values are: ADMIN (full administrative access to Argo CD), EDITOR (edit access to Argo CD resources), or VIEWER (read-only access to Argo CD resources).",
  ),
  Identities: z.array(SsoIdentitySchema).describe(
    "A list of IAM Identity Center identities (users or groups) that should be assigned this Argo CD role.",
  ),
});

const NetworkAccessSchema = z.object({
  VpceIds: z.array(z.string()).describe(
    "A list of VPC endpoint IDs to associate with the managed Argo CD API server endpoint. Each VPC endpoint provides private connectivity from a specific VPC to the Argo CD server. You can specify multiple VPC endpoint IDs to enable access from multiple VPCs.",
  ).optional(),
});

const ArgoCdSchema = z.object({
  Namespace: z.string().describe(
    "The Kubernetes namespace where Argo CD resources will be created. If not specified, the default namespace is used.",
  ).optional(),
  AwsIdc: AwsIdcSchema.describe(
    "Configuration for integrating Argo CD with IAM Identity Center. This allows you to use your organization's identity provider for authentication to Argo CD.",
  ),
  RbacRoleMappings: z.array(ArgoCdRoleMappingSchema).describe(
    "A list of role mappings that define which IAM Identity Center users or groups have which Argo CD roles. Each mapping associates an Argo CD role (ADMIN, EDITOR, or VIEWER) with one or more IAM Identity Center identities.",
  ).optional(),
  NetworkAccess: NetworkAccessSchema.describe(
    "Configuration for network access to the Argo CD capability's managed API server endpoint. By default, the Argo CD server is accessible via a public endpoint. You can optionally specify one or more VPC endpoint IDs to enable private connectivity from your VPCs.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  ClusterName: z.string().min(1).max(100).describe(
    "The name of the EKS cluster where you want to create the capability.",
  ),
  CapabilityName: z.string().min(1).max(100).describe(
    "A unique name for the capability. The name must be unique within your cluster and can contain alphanumeric characters, hyphens, and underscores.",
  ),
  Type: z.enum(["ARGOCD", "ACK", "KRO"]).describe(
    "The type of capability to create. Valid values are: ACK (AWS Controllers for Kubernetes, which lets you manage AWS resources directly from Kubernetes), ARGOCD (Argo CD for GitOps-based continuous delivery), or KRO (Kube Resource Orchestrator for composing and managing custom Kubernetes resources).",
  ),
  RoleArn: z.string().regex(
    new RegExp("^arn:aws[a-z-]*:iam::[0-9]+:role/[a-zA-Z0-9+=,.@_-]+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that the capability uses to interact with AWS services. This role must have a trust policy that allows the EKS service principal to assume it, and it must have the necessary permissions for the capability type you're creating.",
  ),
  DeletePropagationPolicy: z.enum(["RETAIN"]).describe(
    "Specifies how Kubernetes resources managed by the capability should be handled when the capability is deleted. Currently, the only supported value is RETAIN which retains all Kubernetes resources managed by the capability when the capability is deleted.",
  ),
  Configuration: z.object({
    ArgoCd: ArgoCdSchema.describe(
      "Configuration settings for an Argo CD capability. This includes the Kubernetes namespace, IAM Identity Center integration, RBAC role mappings, and network access configuration.",
    ).optional(),
  }).describe(
    "The configuration settings for the capability. The structure of this object varies depending on the capability type. For Argo CD capabilities, you can configure IAM Identity Center integration, RBAC role mappings, and network access settings.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ClusterName: z.string().optional(),
  CapabilityName: z.string().optional(),
  Type: z.string().optional(),
  RoleArn: z.string().optional(),
  DeletePropagationPolicy: z.string().optional(),
  Configuration: z.object({
    ArgoCd: ArgoCdSchema,
  }).optional(),
  Arn: z.string(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  ModifiedAt: z.string().optional(),
  Version: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ClusterName: z.string().min(1).max(100).describe(
    "The name of the EKS cluster where you want to create the capability.",
  ).optional(),
  CapabilityName: z.string().min(1).max(100).describe(
    "A unique name for the capability. The name must be unique within your cluster and can contain alphanumeric characters, hyphens, and underscores.",
  ).optional(),
  Type: z.enum(["ARGOCD", "ACK", "KRO"]).describe(
    "The type of capability to create. Valid values are: ACK (AWS Controllers for Kubernetes, which lets you manage AWS resources directly from Kubernetes), ARGOCD (Argo CD for GitOps-based continuous delivery), or KRO (Kube Resource Orchestrator for composing and managing custom Kubernetes resources).",
  ).optional(),
  RoleArn: z.string().regex(
    new RegExp("^arn:aws[a-z-]*:iam::[0-9]+:role/[a-zA-Z0-9+=,.@_-]+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that the capability uses to interact with AWS services. This role must have a trust policy that allows the EKS service principal to assume it, and it must have the necessary permissions for the capability type you're creating.",
  ).optional(),
  DeletePropagationPolicy: z.enum(["RETAIN"]).describe(
    "Specifies how Kubernetes resources managed by the capability should be handled when the capability is deleted. Currently, the only supported value is RETAIN which retains all Kubernetes resources managed by the capability when the capability is deleted.",
  ).optional(),
  Configuration: z.object({
    ArgoCd: ArgoCdSchema.describe(
      "Configuration settings for an Argo CD capability. This includes the Kubernetes namespace, IAM Identity Center integration, RBAC role mappings, and network access configuration.",
    ).optional(),
  }).describe(
    "The configuration settings for the capability. The structure of this object varies depending on the capability type. For Argo CD capabilities, you can configure IAM Identity Center integration, RBAC role mappings, and network access settings.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for EKS Capability. Registered at `@swamp/aws/eks/capability`. */
export const model = {
  type: "@swamp/aws/eks/capability",
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
      description: "EKS Capability resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EKS Capability",
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
          "AWS::EKS::Capability",
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
      description: "Get a EKS Capability",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Capability",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EKS::Capability",
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
      description: "Update a EKS Capability",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EKS::Capability",
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
          "AWS::EKS::Capability",
          identifier,
          currentState,
          desiredState,
          ["ClusterName", "CapabilityName", "Type", "Namespace", "AwsIdc"],
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
      description: "Delete a EKS Capability",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Capability",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EKS::Capability",
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
      description: "Sync EKS Capability state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EKS::Capability",
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
