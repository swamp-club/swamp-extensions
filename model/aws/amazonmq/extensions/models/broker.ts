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

// Auto-generated extension model for @swamp/aws/amazonmq/broker
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AmazonMQ Broker (AWS::AmazonMQ::Broker).
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

const UserSchema = z.object({
  ReplicationUser: z.boolean().optional(),
  ConsoleAccess: z.boolean().optional(),
  Username: z.string().regex(new RegExp("^[A-Za-z0-9_.~-]{2,100}$")),
  Groups: z.array(z.string().regex(new RegExp("^[A-Za-z0-9._~-]{2,100}$")))
    .optional(),
  Password: z.string().min(12).regex(new RegExp("^[^,:=]+$")),
});

const TagsEntrySchema = z.object({
  Key: z.string(),
  Value: z.string(),
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
  BrokerName: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,50}$")),
  EngineType: z.string(),
  EngineVersion: z.string().describe(
    "The version specified to use. See also EngineVersionCurrent.",
  ).optional(),
  DeploymentMode: z.string(),
  HostInstanceType: z.string(),
  PubliclyAccessible: z.boolean(),
  AuthenticationStrategy: z.string().optional(),
  LdapServerMetadata: z.object({
    Hosts: z.array(z.string()),
    UserRoleName: z.string().optional(),
    UserSearchMatching: z.string(),
    RoleName: z.string().optional(),
    UserBase: z.string(),
    UserSearchSubtree: z.boolean().optional(),
    RoleSearchMatching: z.string(),
    ServiceAccountUsername: z.string(),
    RoleBase: z.string(),
    ServiceAccountPassword: z.string().optional(),
    RoleSearchSubtree: z.boolean().optional(),
  }).optional(),
  StorageType: z.string().optional(),
  EncryptionOptions: z.object({
    KmsKeyId: z.string().describe(
      "The customer master key (CMK) to use for the A KMS (KMS). This key is used to encrypt your data at rest. If not provided, Amazon MQ will use a default CMK to encrypt your data. The Key ARN is recommended so that drift can be detected, but a key ID or key alias will also be accepted for API compatibility reasons.",
    ).optional(),
    UseAwsOwnedKey: z.boolean(),
  }).optional(),
  Configuration: z.object({
    Revision: z.number().int(),
  }).describe(
    "The intended configuration (ID and revision) to be set when creating or updating. This property is write-only so that applications of a ConfigurationAssociation do not cause drift.",
  ).optional(),
  DataReplicationMode: z.string().optional(),
  DataReplicationPrimaryBrokerArn: z.string().regex(new RegExp("^arn:.*"))
    .describe(
      "The ARN of the primary broker that is used to replicate data from in a data replication pair when creating a replica. This field is only used at creation-time. Changes to it subsequently are ignored by CloudFormation. Information on the current primary is available on the DataReplicationMetadata object returned by the API.",
    ).optional(),
  MaintenanceWindowStartTime: z.object({
    DayOfWeek: z.string().describe(
      "_Allowed Values_: MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY",
    ),
    TimeOfDay: z.string().regex(new RegExp("^[0-9]{1,2}:[0-9]{2}(:[0-9]{2})?$"))
      .describe(
        "The time, in 24-hour format, and use only numbers separated by a colon, HH:MM or HH:MM:SS. Example: 13:05. When writing YAML this may need to be quoted to prevent a timestamp being read and converted to a number of minutes or seconds.",
      ),
    TimeZone: z.string().describe(
      "The time zone, UTC by default, in either the Country/City format, or the UTC offset format.",
    ),
  }).optional(),
  AutoMinorVersionUpgrade: z.boolean().optional(),
  Users: z.array(UserSchema).describe(
    "Users to configure on the broker. For RabbitMQ, this should be one user, created when the broker is created, and changes thereafter are ignored. For ActiveMQ, changes to anything but Password are detected and will trigger an update, but changes to Password cannot be detected so updates to Password may not take effect unless there is some other change.",
  ).optional(),
  Logs: z.object({
    Audit: z.boolean().optional(),
    General: z.boolean().optional(),
  }).optional(),
  SecurityGroups: z.array(z.string()).optional(),
  SubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagsEntrySchema).optional(),
  ResourceShareArns: z.array(z.string().regex(new RegExp("^arn:.*"))).describe(
    "The ARNs of the resource shares to be associated with the broker.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  BrokerName: z.string().optional(),
  EngineType: z.string().optional(),
  EngineVersion: z.string().optional(),
  EngineVersionCurrent: z.string().optional(),
  DeploymentMode: z.string().optional(),
  HostInstanceType: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  AuthenticationStrategy: z.string().optional(),
  LdapServerMetadata: z.object({
    Hosts: z.array(z.string()),
    UserRoleName: z.string(),
    UserSearchMatching: z.string(),
    RoleName: z.string(),
    UserBase: z.string(),
    UserSearchSubtree: z.boolean(),
    RoleSearchMatching: z.string(),
    ServiceAccountUsername: z.string(),
    RoleBase: z.string(),
    ServiceAccountPassword: z.string(),
    RoleSearchSubtree: z.boolean(),
  }).optional(),
  StorageType: z.string().optional(),
  EncryptionOptions: z.object({
    KmsKeyId: z.string(),
    UseAwsOwnedKey: z.boolean(),
  }).optional(),
  Configuration: z.object({
    Revision: z.number(),
    Id: z.string(),
  }).optional(),
  ConfigurationRevision: z.string().optional(),
  ConfigurationId: z.string().optional(),
  DataReplicationMode: z.string().optional(),
  DataReplicationPrimaryBrokerArn: z.string().optional(),
  MaintenanceWindowStartTime: z.object({
    DayOfWeek: z.string(),
    TimeOfDay: z.string(),
    TimeZone: z.string(),
  }).optional(),
  AutoMinorVersionUpgrade: z.boolean().optional(),
  Users: z.array(UserSchema).optional(),
  StompEndpoints: z.array(z.string()).optional(),
  MqttEndpoints: z.array(z.string()).optional(),
  AmqpEndpoints: z.array(z.string()).optional(),
  ConsoleURLs: z.array(z.string()).optional(),
  WssEndpoints: z.array(z.string()).optional(),
  OpenWireEndpoints: z.array(z.string()).optional(),
  Logs: z.object({
    Audit: z.boolean(),
    General: z.boolean(),
  }).optional(),
  SecurityGroups: z.array(z.string()).optional(),
  SubnetIds: z.array(z.string()).optional(),
  IpAddresses: z.array(z.string()).optional(),
  Tags: z.array(TagsEntrySchema).optional(),
  ResourceShareArns: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BrokerName: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,50}$")).optional(),
  EngineType: z.string().optional(),
  EngineVersion: z.string().describe(
    "The version specified to use. See also EngineVersionCurrent.",
  ).optional(),
  DeploymentMode: z.string().optional(),
  HostInstanceType: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  AuthenticationStrategy: z.string().optional(),
  LdapServerMetadata: z.object({
    Hosts: z.array(z.string()).optional(),
    UserRoleName: z.string().optional(),
    UserSearchMatching: z.string().optional(),
    RoleName: z.string().optional(),
    UserBase: z.string().optional(),
    UserSearchSubtree: z.boolean().optional(),
    RoleSearchMatching: z.string().optional(),
    ServiceAccountUsername: z.string().optional(),
    RoleBase: z.string().optional(),
    ServiceAccountPassword: z.string().optional(),
    RoleSearchSubtree: z.boolean().optional(),
  }).optional(),
  StorageType: z.string().optional(),
  EncryptionOptions: z.object({
    KmsKeyId: z.string().describe(
      "The customer master key (CMK) to use for the A KMS (KMS). This key is used to encrypt your data at rest. If not provided, Amazon MQ will use a default CMK to encrypt your data. The Key ARN is recommended so that drift can be detected, but a key ID or key alias will also be accepted for API compatibility reasons.",
    ).optional(),
    UseAwsOwnedKey: z.boolean().optional(),
  }).optional(),
  Configuration: z.object({
    Revision: z.number().int().optional(),
  }).describe(
    "The intended configuration (ID and revision) to be set when creating or updating. This property is write-only so that applications of a ConfigurationAssociation do not cause drift.",
  ).optional(),
  DataReplicationMode: z.string().optional(),
  DataReplicationPrimaryBrokerArn: z.string().regex(new RegExp("^arn:.*"))
    .describe(
      "The ARN of the primary broker that is used to replicate data from in a data replication pair when creating a replica. This field is only used at creation-time. Changes to it subsequently are ignored by CloudFormation. Information on the current primary is available on the DataReplicationMetadata object returned by the API.",
    ).optional(),
  MaintenanceWindowStartTime: z.object({
    DayOfWeek: z.string().describe(
      "_Allowed Values_: MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY",
    ).optional(),
    TimeOfDay: z.string().regex(new RegExp("^[0-9]{1,2}:[0-9]{2}(:[0-9]{2})?$"))
      .describe(
        "The time, in 24-hour format, and use only numbers separated by a colon, HH:MM or HH:MM:SS. Example: 13:05. When writing YAML this may need to be quoted to prevent a timestamp being read and converted to a number of minutes or seconds.",
      ).optional(),
    TimeZone: z.string().describe(
      "The time zone, UTC by default, in either the Country/City format, or the UTC offset format.",
    ).optional(),
  }).optional(),
  AutoMinorVersionUpgrade: z.boolean().optional(),
  Users: z.array(UserSchema).describe(
    "Users to configure on the broker. For RabbitMQ, this should be one user, created when the broker is created, and changes thereafter are ignored. For ActiveMQ, changes to anything but Password are detected and will trigger an update, but changes to Password cannot be detected so updates to Password may not take effect unless there is some other change.",
  ).optional(),
  Logs: z.object({
    Audit: z.boolean().optional(),
    General: z.boolean().optional(),
  }).optional(),
  SecurityGroups: z.array(z.string()).optional(),
  SubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagsEntrySchema).optional(),
  ResourceShareArns: z.array(z.string().regex(new RegExp("^arn:.*"))).describe(
    "The ARNs of the resource shares to be associated with the broker.",
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

/** Swamp extension model for AmazonMQ Broker. Registered at `@swamp/aws/amazonmq/broker`. */
export const model = {
  type: "@swamp/aws/amazonmq/broker",
  version: "2026.06.23.1",
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
    {
      toVersion: "2026.06.23.1",
      description: "Added: ResourceShareArns",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AmazonMQ Broker resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AmazonMQ Broker",
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
          "AWS::AmazonMQ::Broker",
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
      description: "Get a AmazonMQ Broker",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmazonMQ Broker",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AmazonMQ::Broker",
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
      description: "Update a AmazonMQ Broker",
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
          "AWS::AmazonMQ::Broker",
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
          "AWS::AmazonMQ::Broker",
          identifier,
          currentState,
          desiredState,
          [
            "BrokerName",
            "StorageType",
            "DeploymentMode",
            "EngineType",
            "SubnetIds",
            "AuthenticationStrategy",
            "EncryptionOptions",
            "PubliclyAccessible",
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
      description: "Delete a AmazonMQ Broker",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmazonMQ Broker",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AmazonMQ::Broker",
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
      description: "Sync AmazonMQ Broker state from AWS",
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
            "AWS::AmazonMQ::Broker",
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
