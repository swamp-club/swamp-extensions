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

// Auto-generated extension model for @swamp/aws/gamelift/container-group-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GameLift ContainerGroupDefinition (AWS::GameLift::ContainerGroupDefinition).
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

const ContainerDependencySchema = z.object({
  ContainerName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "A descriptive label for the container definition. The container being defined depends on this container's condition.",
    ),
  Condition: z.enum(["START", "COMPLETE", "SUCCESS", "HEALTHY"]).describe(
    "The type of dependency.",
  ),
});

const ContainerEnvironmentSchema = z.object({
  Name: z.string().min(1).max(255).regex(new RegExp("^.*$")).describe(
    "The environment variable name.",
  ),
  Value: z.string().min(1).max(255).regex(new RegExp("^.*$")).describe(
    "The environment variable value.",
  ),
});

const ContainerPortRangeSchema = z.object({
  FromPort: z.number().int().min(1).max(60000).describe(
    "A starting value for the range of allowed port numbers.",
  ),
  Protocol: z.enum(["TCP", "UDP"]).describe(
    "Defines the protocol of these ports.",
  ),
  ToPort: z.number().int().min(1).max(60000).describe(
    "An ending value for the range of allowed port numbers. Port numbers are end-inclusive. This value must be equal to or greater than FromPort.",
  ),
});

const PortConfigurationSchema = z.object({
  ContainerPortRanges: z.array(ContainerPortRangeSchema).describe(
    "Specifies one or more ranges of ports on a container.",
  ),
});

const ContainerMountPointSchema = z.object({
  InstancePath: z.string().min(1).max(1024).regex(new RegExp("^\\/[\\s\\S]*$"))
    .describe("The path on the host that will be mounted in the container."),
  ContainerPath: z.string().min(1).max(1024).regex(
    new RegExp("^(\\/+[^\\/]+\\/*)+$"),
  ).describe("The path inside the container where the mount is accessible.")
    .optional(),
  AccessLevel: z.enum(["READ_ONLY", "READ_AND_WRITE"]).describe(
    "The access permissions for the mounted path.",
  ).optional(),
});

const ContainerHealthCheckSchema = z.object({
  Command: z.array(z.string().min(1).max(255).regex(new RegExp("^.*$")))
    .describe(
      "A string array representing the command that the container runs to determine if it is healthy.",
    ),
  Interval: z.number().int().min(60).max(300).describe(
    "How often (in seconds) the health is checked.",
  ).optional(),
  Timeout: z.number().int().min(30).max(60).describe(
    "How many seconds the process manager allows the command to run before canceling it.",
  ).optional(),
  Retries: z.number().int().min(5).max(10).describe(
    "How many times the process manager will retry the command after a timeout. (The first run of the command does not count as a retry.)",
  ).optional(),
  StartPeriod: z.number().int().min(0).max(300).describe(
    "The optional grace period (in seconds) to give a container time to boostrap before teh health check is declared failed.",
  ).optional(),
});

const SupportContainerDefinitionSchema = z.object({
  ContainerName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe("A descriptive label for the container definition."),
  Vcpu: z.number().min(0.125).max(10).describe(
    "The number of virtual CPUs to give to the support group",
  ).optional(),
  DependsOn: z.array(ContainerDependencySchema).describe(
    "A list of container dependencies that determines when this container starts up and shuts down. For container groups with multiple containers, dependencies let you define a startup/shutdown sequence across the containers.",
  ).optional(),
  Essential: z.boolean().describe(
    "Specifies if the container is essential. If an essential container fails a health check, then all containers in the container group will be restarted. You must specify exactly 1 essential container in a container group.",
  ).optional(),
  ImageUri: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9-_\\.@\\/:]+$"),
  ).describe("Specifies the image URI of this container."),
  ResolvedImageDigest: z.string().regex(new RegExp("^sha256:[a-fA-F0-9]{64}$"))
    .describe("The digest of the container image.").optional(),
  MemoryHardLimitMebibytes: z.number().int().min(4).max(1024000).describe(
    "The total memory limit of container groups following this definition in MiB",
  ).optional(),
  EnvironmentOverride: z.array(ContainerEnvironmentSchema).describe(
    "The environment variables to pass to a container.",
  ).optional(),
  PortConfiguration: PortConfigurationSchema.describe(
    "Defines the ports on the container.",
  ).optional(),
  HealthCheck: ContainerHealthCheckSchema.describe(
    "Specifies how the health of the containers will be checked.",
  ).optional(),
  MountPoints: z.array(ContainerMountPointSchema).describe(
    "A list of mount point configurations to be used in a container.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^.*$")).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length.",
  ),
  Value: z.string().min(0).max(256).regex(new RegExp("^.*$")).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length.",
  ),
});

const GlobalArgsSchema = z.object({
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
  OperatingSystem: z.enum(["AMAZON_LINUX_2023"]).describe(
    "The operating system of the container group",
  ),
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe("A descriptive label for the container group definition."),
  ContainerGroupType: z.enum(["GAME_SERVER", "PER_INSTANCE"]).describe(
    "The scope of the container group",
  ).optional(),
  TotalMemoryLimitMebibytes: z.number().int().min(4).max(1024000).describe(
    "The total memory limit of container groups following this definition in MiB",
  ),
  TotalVcpuLimit: z.number().min(0.125).max(10).describe(
    "The total amount of virtual CPUs on the container group definition",
  ),
  GameServerContainerDefinition: z.object({
    ContainerName: z.string().min(1).max(128).regex(
      new RegExp("^[a-zA-Z0-9-]+$"),
    ).describe(
      "A descriptive label for the container definition. Container definition names must be unique with a container group definition.",
    ),
    DependsOn: z.array(ContainerDependencySchema).describe(
      "A list of container dependencies that determines when this container starts up and shuts down. For container groups with multiple containers, dependencies let you define a startup/shutdown sequence across the containers.",
    ).optional(),
    ServerSdkVersion: z.string().max(128).regex(
      new RegExp("^\\d+\\.\\d+\\.\\d+$"),
    ).describe("The version of the server SDK used in this container group"),
    ImageUri: z.string().min(1).max(255).regex(
      new RegExp("^[a-zA-Z0-9-_\\.@\\/:]+$"),
    ).describe("Specifies the image URI of this container."),
    ResolvedImageDigest: z.string().regex(
      new RegExp("^sha256:[a-fA-F0-9]{64}$"),
    ).describe("The digest of the container image.").optional(),
    EnvironmentOverride: z.array(ContainerEnvironmentSchema).describe(
      "The environment variables to pass to a container.",
    ).optional(),
    PortConfiguration: PortConfigurationSchema.describe(
      "Defines the ports on the container.",
    ).optional(),
    MountPoints: z.array(ContainerMountPointSchema).describe(
      "A list of mount point configurations to be used in a container.",
    ).optional(),
  }).describe(
    "Specifies the information required to run game servers with this container group",
  ).optional(),
  SupportContainerDefinitions: z.array(SupportContainerDefinitionSchema)
    .describe(
      "A collection of support container definitions that define the containers in this group.",
    ).optional(),
  SourceVersionNumber: z.number().int().min(0).describe(
    "A specific ContainerGroupDefinition version to be updated",
  ).optional(),
  VersionDescription: z.string().min(1).max(1024).describe(
    "The description of this version",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ContainerGroupDefinitionArn: z.string().optional(),
  CreationTime: z.string().optional(),
  OperatingSystem: z.string().optional(),
  Name: z.string(),
  ContainerGroupType: z.string().optional(),
  TotalMemoryLimitMebibytes: z.number().optional(),
  TotalVcpuLimit: z.number().optional(),
  GameServerContainerDefinition: z.object({
    ContainerName: z.string(),
    DependsOn: z.array(ContainerDependencySchema),
    ServerSdkVersion: z.string(),
    ImageUri: z.string(),
    ResolvedImageDigest: z.string(),
    EnvironmentOverride: z.array(ContainerEnvironmentSchema),
    PortConfiguration: PortConfigurationSchema,
    MountPoints: z.array(ContainerMountPointSchema),
  }).optional(),
  SupportContainerDefinitions: z.array(SupportContainerDefinitionSchema)
    .optional(),
  VersionNumber: z.number().optional(),
  SourceVersionNumber: z.number().optional(),
  VersionDescription: z.string().optional(),
  Status: z.string().optional(),
  StatusReason: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OperatingSystem: z.enum(["AMAZON_LINUX_2023"]).describe(
    "The operating system of the container group",
  ).optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe("A descriptive label for the container group definition.")
    .optional(),
  ContainerGroupType: z.enum(["GAME_SERVER", "PER_INSTANCE"]).describe(
    "The scope of the container group",
  ).optional(),
  TotalMemoryLimitMebibytes: z.number().int().min(4).max(1024000).describe(
    "The total memory limit of container groups following this definition in MiB",
  ).optional(),
  TotalVcpuLimit: z.number().min(0.125).max(10).describe(
    "The total amount of virtual CPUs on the container group definition",
  ).optional(),
  GameServerContainerDefinition: z.object({
    ContainerName: z.string().min(1).max(128).regex(
      new RegExp("^[a-zA-Z0-9-]+$"),
    ).describe(
      "A descriptive label for the container definition. Container definition names must be unique with a container group definition.",
    ).optional(),
    DependsOn: z.array(ContainerDependencySchema).describe(
      "A list of container dependencies that determines when this container starts up and shuts down. For container groups with multiple containers, dependencies let you define a startup/shutdown sequence across the containers.",
    ).optional(),
    ServerSdkVersion: z.string().max(128).regex(
      new RegExp("^\\d+\\.\\d+\\.\\d+$"),
    ).describe("The version of the server SDK used in this container group")
      .optional(),
    ImageUri: z.string().min(1).max(255).regex(
      new RegExp("^[a-zA-Z0-9-_\\.@\\/:]+$"),
    ).describe("Specifies the image URI of this container.").optional(),
    ResolvedImageDigest: z.string().regex(
      new RegExp("^sha256:[a-fA-F0-9]{64}$"),
    ).describe("The digest of the container image.").optional(),
    EnvironmentOverride: z.array(ContainerEnvironmentSchema).describe(
      "The environment variables to pass to a container.",
    ).optional(),
    PortConfiguration: PortConfigurationSchema.describe(
      "Defines the ports on the container.",
    ).optional(),
    MountPoints: z.array(ContainerMountPointSchema).describe(
      "A list of mount point configurations to be used in a container.",
    ).optional(),
  }).describe(
    "Specifies the information required to run game servers with this container group",
  ).optional(),
  SupportContainerDefinitions: z.array(SupportContainerDefinitionSchema)
    .describe(
      "A collection of support container definitions that define the containers in this group.",
    ).optional(),
  SourceVersionNumber: z.number().int().min(0).describe(
    "A specific ContainerGroupDefinition version to be updated",
  ).optional(),
  VersionDescription: z.string().min(1).max(1024).describe(
    "The description of this version",
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

/** Swamp extension model for GameLift ContainerGroupDefinition. Registered at `@swamp/aws/gamelift/container-group-definition`. */
export const model = {
  type: "@swamp/aws/gamelift/container-group-definition",
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
      description: "GameLift ContainerGroupDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GameLift ContainerGroupDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GameLift::ContainerGroupDefinition",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a GameLift ContainerGroupDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift ContainerGroupDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GameLift::ContainerGroupDefinition",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a GameLift ContainerGroupDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::GameLift::ContainerGroupDefinition",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GameLift::ContainerGroupDefinition",
          identifier,
          currentState,
          desiredState,
          ["Name", "ContainerGroupType"],
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
      description: "Delete a GameLift ContainerGroupDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift ContainerGroupDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GameLift::ContainerGroupDefinition",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync GameLift ContainerGroupDefinition state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::GameLift::ContainerGroupDefinition",
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
