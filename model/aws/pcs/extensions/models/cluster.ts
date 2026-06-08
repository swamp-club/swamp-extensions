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

// Auto-generated extension model for @swamp/aws/pcs/cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for PCS Cluster (AWS::PCS::Cluster).
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

const AccountingSchema = z.object({
  DefaultPurgeTimeInDays: z.number().int().min(-1).max(10000).describe(
    "The default value for all purge settings for `slurmdbd.conf`. For more information, see the [slurmdbd.conf documentation at SchedMD](https://slurm.schedmd.com/slurmdbd.conf.html). The default value is `-1`. A value of `-1` means there is no purge time and records persist as long as the cluster exists.",
  ).optional(),
  Mode: z.enum(["STANDARD", "NONE"]).describe(
    "The default value is `NONE`. A value of `STANDARD` means that Slurm accounting is enabled.",
  ),
});

const SlurmRestSchema = z.object({
  Mode: z.enum(["STANDARD", "NONE"]).describe(
    "The default value is `NONE`. A value of `STANDARD` means that Slurm Rest is enabled.",
  ),
});

const AuthKeySchema = z.object({
  SecretArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the the shared Slurm key.",
  ),
  SecretVersion: z.string().describe("The version of the shared Slurm key."),
});

const JwtKeySchema = z.object({
  SecretArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the JWT key secret.",
  ),
  SecretVersion: z.string().describe("The version of the JWT key secret."),
});

const JwtAuthSchema = z.object({
  JwtKey: JwtKeySchema.describe("JWT key configuration.").optional(),
});

const SlurmCustomSettingSchema = z.object({
  ParameterName: z.string().describe(
    "AWS PCS supports configuration of the following Slurm parameters for clusters: Prolog, Epilog, and SelectTypeParameters.",
  ),
  ParameterValue: z.string().describe(
    "The value for the configured Slurm setting.",
  ),
});

const CgroupCustomSettingSchema = z.object({
  ParameterName: z.string().describe("The cgroup.conf parameter name."),
  ParameterValue: z.string().describe(
    "The value for the cgroup.conf parameter.",
  ),
});

const SlurmdbdCustomSettingSchema = z.object({
  ParameterName: z.string().describe("The slurmdbd.conf parameter name."),
  ParameterValue: z.string().describe(
    "The value for the slurmdbd.conf parameter.",
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
  Name: z.string().describe("The name that identifies the cluster.").optional(),
  Networking: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "The list of security group IDs associated with the Elastic Network Interface (ENI) created in subnets.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe(
      "The list of subnet IDs where AWS PCS creates an Elastic Network Interface (ENI) to enable communication between managed controllers and AWS PCS resources. The subnet must have an available IP address, cannot reside in AWS Outposts, AWS Wavelength, or an AWS Local Zone. AWS PCS currently supports only 1 subnet in this list.",
    ).optional(),
    NetworkType: z.enum(["IPV4", "IPV6"]).describe(
      "The IP of the cluster (IPV4 or IPV6)",
    ).optional(),
  }).describe("The networking configuration for the cluster's control plane."),
  Scheduler: z.object({
    Type: z.enum(["SLURM"]).describe(
      "The software AWS PCS uses to manage cluster scaling and job scheduling.",
    ),
    Version: z.string().describe(
      "The version of the specified scheduling software that AWS PCS uses to manage cluster scaling and job scheduling.",
    ),
  }).describe(
    "The cluster management and job scheduling software associated with the cluster.",
  ),
  Size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe(
    "The size of the cluster.",
  ),
  SlurmConfiguration: z.object({
    Accounting: AccountingSchema.describe(
      "The accounting configuration includes configurable settings for Slurm accounting.",
    ).optional(),
    SlurmRest: SlurmRestSchema.describe(
      "The SlurmRest configuration includes configurable settings for Slurm Rest.",
    ).optional(),
    AuthKey: AuthKeySchema.describe(
      "The shared Slurm key for authentication, also known as the cluster secret.",
    ).optional(),
    JwtAuth: JwtAuthSchema.describe(
      "JWT authentication configuration for Slurm.",
    ).optional(),
    ScaleDownIdleTimeInSeconds: z.number().int().min(1).describe(
      "The time before an idle node is scaled down.",
    ).optional(),
    SlurmCustomSettings: z.array(SlurmCustomSettingSchema).describe(
      "Additional Slurm-specific configuration that directly maps to Slurm settings.",
    ).optional(),
    CgroupCustomSettings: z.array(CgroupCustomSettingSchema).describe(
      "Additional cgroup-specific configuration that directly maps to cgroup.conf settings.",
    ).optional(),
    SlurmdbdCustomSettings: z.array(SlurmdbdCustomSettingSchema).describe(
      "Additional slurmdbd-specific configuration that directly maps to slurmdbd.conf settings.",
    ).optional(),
  }).describe("Additional options related to the Slurm scheduler.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Endpoints: z.array(z.object({
    Port: z.string(),
    PrivateIpAddress: z.string(),
    Ipv6Address: z.string(),
    Type: z.string(),
    PublicIpAddress: z.string(),
  })).optional(),
  ErrorInfo: z.array(z.object({
    Code: z.string(),
    Message: z.string(),
  })).optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  Networking: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
    NetworkType: z.string(),
  }).optional(),
  Scheduler: z.object({
    Type: z.string(),
    Version: z.string(),
  }).optional(),
  Size: z.string().optional(),
  SlurmConfiguration: z.object({
    Accounting: AccountingSchema,
    SlurmRest: SlurmRestSchema,
    AuthKey: AuthKeySchema,
    JwtAuth: JwtAuthSchema,
    ScaleDownIdleTimeInSeconds: z.number(),
    SlurmCustomSettings: z.array(SlurmCustomSettingSchema),
    CgroupCustomSettings: z.array(CgroupCustomSettingSchema),
    SlurmdbdCustomSettings: z.array(SlurmdbdCustomSettingSchema),
  }).optional(),
  Status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name that identifies the cluster.").optional(),
  Networking: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "The list of security group IDs associated with the Elastic Network Interface (ENI) created in subnets.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe(
      "The list of subnet IDs where AWS PCS creates an Elastic Network Interface (ENI) to enable communication between managed controllers and AWS PCS resources. The subnet must have an available IP address, cannot reside in AWS Outposts, AWS Wavelength, or an AWS Local Zone. AWS PCS currently supports only 1 subnet in this list.",
    ).optional(),
    NetworkType: z.enum(["IPV4", "IPV6"]).describe(
      "The IP of the cluster (IPV4 or IPV6)",
    ).optional(),
  }).describe("The networking configuration for the cluster's control plane.")
    .optional(),
  Scheduler: z.object({
    Type: z.enum(["SLURM"]).describe(
      "The software AWS PCS uses to manage cluster scaling and job scheduling.",
    ).optional(),
    Version: z.string().describe(
      "The version of the specified scheduling software that AWS PCS uses to manage cluster scaling and job scheduling.",
    ).optional(),
  }).describe(
    "The cluster management and job scheduling software associated with the cluster.",
  ).optional(),
  Size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe(
    "The size of the cluster.",
  ).optional(),
  SlurmConfiguration: z.object({
    Accounting: AccountingSchema.describe(
      "The accounting configuration includes configurable settings for Slurm accounting.",
    ).optional(),
    SlurmRest: SlurmRestSchema.describe(
      "The SlurmRest configuration includes configurable settings for Slurm Rest.",
    ).optional(),
    AuthKey: AuthKeySchema.describe(
      "The shared Slurm key for authentication, also known as the cluster secret.",
    ).optional(),
    JwtAuth: JwtAuthSchema.describe(
      "JWT authentication configuration for Slurm.",
    ).optional(),
    ScaleDownIdleTimeInSeconds: z.number().int().min(1).describe(
      "The time before an idle node is scaled down.",
    ).optional(),
    SlurmCustomSettings: z.array(SlurmCustomSettingSchema).describe(
      "Additional Slurm-specific configuration that directly maps to Slurm settings.",
    ).optional(),
    CgroupCustomSettings: z.array(CgroupCustomSettingSchema).describe(
      "Additional cgroup-specific configuration that directly maps to cgroup.conf settings.",
    ).optional(),
    SlurmdbdCustomSettings: z.array(SlurmdbdCustomSettingSchema).describe(
      "Additional slurmdbd-specific configuration that directly maps to slurmdbd.conf settings.",
    ).optional(),
  }).describe("Additional options related to the Slurm scheduler.").optional(),
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

/** Swamp extension model for PCS Cluster. Registered at `@swamp/aws/pcs/cluster`. */
export const model = {
  type: "@swamp/aws/pcs/cluster",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "PCS Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a PCS Cluster",
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
          "AWS::PCS::Cluster",
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
      description: "Get a PCS Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PCS Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::PCS::Cluster",
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
      description: "Update a PCS Cluster",
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
          "AWS::PCS::Cluster",
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
          "AWS::PCS::Cluster",
          identifier,
          currentState,
          desiredState,
          ["Name", "Networking", "Scheduler", "Size"],
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
      description: "Delete a PCS Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PCS Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::PCS::Cluster",
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
      description: "Sync PCS Cluster state from AWS",
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
            "AWS::PCS::Cluster",
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
