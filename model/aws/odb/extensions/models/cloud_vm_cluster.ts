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

// Auto-generated extension model for @swamp/aws/odb/cloud-vm-cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ODB CloudVmCluster (AWS::ODB::CloudVmCluster).
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that's 1 to 128 Unicode characters in length and can't be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,.,:, /, =, +, @, -, and \".",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that's 1 to 256 characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const DbNodeSchema = z.object({
  DbNodeId: z.string().describe("The unique identifier of the DB node.")
    .optional(),
  DbNodeArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the DB node.",
  ).optional(),
  Status: z.string().describe("The current status of the DB node.").optional(),
  CpuCoreCount: z.number().int().describe(
    "The number of CPU cores enabled on the DB node.",
  ).optional(),
  MemorySizeInGBs: z.number().int().describe(
    "The amount of memory, in gigabytes (GB), that allocated on the DB node.",
  ).optional(),
  DbNodeStorageSizeInGBs: z.number().int().describe(
    "The amount of local node storage, in gigabytes (GB), that's allocated on the DB node.",
  ).optional(),
  Hostname: z.string().describe("The host name for the DB node.").optional(),
  DbServerId: z.string().describe(
    "The unique identifier of the database server that's associated with the DB node.",
  ),
  Ocid: z.string().describe("The OCID of the DB node.").optional(),
  DbSystemId: z.string().describe("The OCID of the DB system.").optional(),
  BackupIpId: z.string().describe(
    "The Oracle Cloud ID (OCID) of the backup IP address that's associated with the DB node.",
  ).optional(),
  BackupVnic2Id: z.string().describe(
    "The OCID of the second backup virtual network interface card (VNIC) for the DB node.",
  ).optional(),
  VnicId: z.string().describe("The OCID of the VNIC.").optional(),
  Vnic2Id: z.string().describe("The OCID of the second VNIC.").optional(),
  HostIpId: z.string().describe(
    "The OCID of the host IP address that's associated with the DB node.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const IamRoleSchema = z.object({
  AwsIntegration: z.string().describe(
    "The AWS integration configuration settings for the AWS Identity and Access Management (IAM) service role.",
  ).optional(),
  IamRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) service role.",
  ).optional(),
  Status: z.string().describe(
    "The current status of the AWS Identity and Access Management (IAM) service role.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  CloudExadataInfrastructureId: z.string().describe(
    "The unique identifier of the Exadata infrastructure that this VM cluster belongs to.",
  ).optional(),
  ClusterName: z.string().min(1).max(11).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-]*$"),
  ).describe("The name of the Grid Infrastructure (GI) cluster.").optional(),
  DataCollectionOptions: z.object({
    IsDiagnosticsEventsEnabled: z.boolean().describe(
      "Indicates whether diagnostic collection is enabled for the VM cluster.",
    ).optional(),
    IsHealthMonitoringEnabled: z.boolean().describe(
      "Indicates whether health monitoring is enabled for the VM cluster.",
    ).optional(),
    IsIncidentLogsEnabled: z.boolean().describe(
      "Indicates whether incident logs are enabled for the cloud VM cluster.",
    ).optional(),
  }).describe(
    "The set of diagnostic collection options enabled for the VM cluster.",
  ).optional(),
  DataStorageSizeInTBs: z.number().describe(
    "The size of the data disk group, in terabytes (TB), that's allocated for the VM cluster.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The user-friendly name for the VM cluster.").optional(),
  GiVersion: z.string().min(1).max(255).describe(
    "The software version of the Oracle Grid Infrastructure (GI) for the VM cluster.",
  ).optional(),
  IsLocalBackupEnabled: z.boolean().describe(
    "Indicates whether database backups to local Exadata storage is enabled for the VM cluster.",
  ).optional(),
  IsSparseDiskgroupEnabled: z.boolean().describe(
    "Indicates whether the VM cluster is configured with a sparse disk group.",
  ).optional(),
  LicenseModel: z.enum(["BRING_YOUR_OWN_LICENSE", "LICENSE_INCLUDED"]).describe(
    "The Oracle license model applied to the VM cluster.",
  ).optional(),
  OdbNetworkId: z.string().describe(
    "The unique identifier of the ODB network for the VM cluster.",
  ).optional(),
  ScanListenerPortTcp: z.number().int().min(1024).max(8999).describe(
    "Property description not available.",
  ).optional(),
  SshPublicKeys: z.array(z.string()).describe(
    "The public key portion of one or more key pairs used for SSH access to the VM cluster.",
  ).optional(),
  SystemVersion: z.string().min(1).max(255).describe(
    "The operating system version of the image chosen for the VM cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the Vm Cluster.")
    .optional(),
  TimeZone: z.string().min(1).max(255).describe(
    "The time zone of the VM cluster.",
  ).optional(),
  DbServers: z.array(z.string()).describe(
    "The list of database servers for the VM cluster.",
  ).optional(),
  DbNodes: z.array(DbNodeSchema).describe(
    "The DB nodes that are implicitly created and managed as part of this VM Cluster.",
  ).optional(),
  IamRoles: z.array(IamRoleSchema).describe(
    "The AWS Identity and Access Management (IAM) service roles associated with the VM cluster.",
  ).optional(),
});

const StateSchema = z.object({
  CloudExadataInfrastructureId: z.string().optional(),
  CloudVmClusterArn: z.string(),
  CloudVmClusterId: z.string().optional(),
  ClusterName: z.string().optional(),
  ComputeModel: z.string().optional(),
  CpuCoreCount: z.number().optional(),
  DataCollectionOptions: z.object({
    IsDiagnosticsEventsEnabled: z.boolean(),
    IsHealthMonitoringEnabled: z.boolean(),
    IsIncidentLogsEnabled: z.boolean(),
  }).optional(),
  DataStorageSizeInTBs: z.number().optional(),
  DbNodeStorageSizeInGBs: z.number().optional(),
  DisplayName: z.string().optional(),
  DiskRedundancy: z.string().optional(),
  Domain: z.string().optional(),
  GiVersion: z.string().optional(),
  Hostname: z.string().optional(),
  IsLocalBackupEnabled: z.boolean().optional(),
  IsSparseDiskgroupEnabled: z.boolean().optional(),
  LicenseModel: z.string().optional(),
  ListenerPort: z.number().optional(),
  MemorySizeInGBs: z.number().optional(),
  NodeCount: z.number().optional(),
  OdbNetworkId: z.string().optional(),
  Ocid: z.string().optional(),
  OciResourceAnchorName: z.string().optional(),
  OciUrl: z.string().optional(),
  ScanDnsName: z.string().optional(),
  ScanIpIds: z.array(z.string()).optional(),
  ScanListenerPortTcp: z.number().optional(),
  Shape: z.string().optional(),
  SshPublicKeys: z.array(z.string()).optional(),
  StorageSizeInGBs: z.number().optional(),
  SystemVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TimeZone: z.string().optional(),
  VipIds: z.array(z.string()).optional(),
  DbServers: z.array(z.string()).optional(),
  DbNodes: z.array(DbNodeSchema).optional(),
  IamRoles: z.array(IamRoleSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CloudExadataInfrastructureId: z.string().describe(
    "The unique identifier of the Exadata infrastructure that this VM cluster belongs to.",
  ).optional(),
  ClusterName: z.string().min(1).max(11).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-]*$"),
  ).describe("The name of the Grid Infrastructure (GI) cluster.").optional(),
  DataCollectionOptions: z.object({
    IsDiagnosticsEventsEnabled: z.boolean().describe(
      "Indicates whether diagnostic collection is enabled for the VM cluster.",
    ).optional(),
    IsHealthMonitoringEnabled: z.boolean().describe(
      "Indicates whether health monitoring is enabled for the VM cluster.",
    ).optional(),
    IsIncidentLogsEnabled: z.boolean().describe(
      "Indicates whether incident logs are enabled for the cloud VM cluster.",
    ).optional(),
  }).describe(
    "The set of diagnostic collection options enabled for the VM cluster.",
  ).optional(),
  DataStorageSizeInTBs: z.number().describe(
    "The size of the data disk group, in terabytes (TB), that's allocated for the VM cluster.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The user-friendly name for the VM cluster.").optional(),
  GiVersion: z.string().min(1).max(255).describe(
    "The software version of the Oracle Grid Infrastructure (GI) for the VM cluster.",
  ).optional(),
  IsLocalBackupEnabled: z.boolean().describe(
    "Indicates whether database backups to local Exadata storage is enabled for the VM cluster.",
  ).optional(),
  IsSparseDiskgroupEnabled: z.boolean().describe(
    "Indicates whether the VM cluster is configured with a sparse disk group.",
  ).optional(),
  LicenseModel: z.enum(["BRING_YOUR_OWN_LICENSE", "LICENSE_INCLUDED"]).describe(
    "The Oracle license model applied to the VM cluster.",
  ).optional(),
  OdbNetworkId: z.string().describe(
    "The unique identifier of the ODB network for the VM cluster.",
  ).optional(),
  ScanListenerPortTcp: z.number().int().min(1024).max(8999).describe(
    "Property description not available.",
  ).optional(),
  SshPublicKeys: z.array(z.string()).describe(
    "The public key portion of one or more key pairs used for SSH access to the VM cluster.",
  ).optional(),
  SystemVersion: z.string().min(1).max(255).describe(
    "The operating system version of the image chosen for the VM cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the Vm Cluster.")
    .optional(),
  TimeZone: z.string().min(1).max(255).describe(
    "The time zone of the VM cluster.",
  ).optional(),
  DbServers: z.array(z.string()).describe(
    "The list of database servers for the VM cluster.",
  ).optional(),
  DbNodes: z.array(DbNodeSchema).describe(
    "The DB nodes that are implicitly created and managed as part of this VM Cluster.",
  ).optional(),
  IamRoles: z.array(IamRoleSchema).describe(
    "The AWS Identity and Access Management (IAM) service roles associated with the VM cluster.",
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

/** Swamp extension model for ODB CloudVmCluster. Registered at `@swamp/aws/odb/cloud-vm-cluster`. */
export const model = {
  type: "@swamp/aws/odb/cloud-vm-cluster",
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
      description: "ODB CloudVmCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ODB CloudVmCluster",
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
          "AWS::ODB::CloudVmCluster",
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
      description: "Get a ODB CloudVmCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB CloudVmCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ODB::CloudVmCluster",
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
      description: "Update a ODB CloudVmCluster",
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
        const identifier = existing.CloudVmClusterArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ODB::CloudVmCluster",
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
          "AWS::ODB::CloudVmCluster",
          identifier,
          currentState,
          desiredState,
          [
            "CloudExadataInfrastructureId",
            "DataCollectionOptions",
            "DataStorageSizeInTBs",
            "DbNodeStorageSizeInGBs",
            "OdbNetworkId",
            "GiVersion",
            "ClusterName",
            "LicenseModel",
            "Hostname",
            "IsLocalBackupEnabled",
            "IsSparseDiskgroupEnabled",
            "SystemVersion",
            "TimeZone",
            "ScanListenerPortTcp",
            "SshPublicKeys",
            "CpuCoreCount",
            "DisplayName",
            "MemorySizeInGBs",
            "DbServers",
            "DbServerId",
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
      description: "Delete a ODB CloudVmCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB CloudVmCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ODB::CloudVmCluster",
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
      description: "Sync ODB CloudVmCluster state from AWS",
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
        const identifier = existing.CloudVmClusterArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ODB::CloudVmCluster",
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
