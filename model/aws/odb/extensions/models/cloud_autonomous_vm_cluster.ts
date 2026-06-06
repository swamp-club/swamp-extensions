// Auto-generated extension model for @swamp/aws/odb/cloud-autonomous-vm-cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ODB CloudAutonomousVmCluster (AWS::ODB::CloudAutonomousVmCluster).
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  OdbNetworkId: z.string().describe(
    "The unique identifier of the ODB network associated with this Autonomous VM cluster.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The display name of the Autonomous VM cluster.").optional(),
  CloudExadataInfrastructureId: z.string().describe(
    "The unique identifier of the Cloud Exadata Infrastructure containing this Autonomous VM cluster.",
  ).optional(),
  AutonomousDataStorageSizeInTBs: z.number().describe(
    "The data storage size allocated for Autonomous Databases in the Autonomous VM cluster, in TB.",
  ).optional(),
  CpuCoreCountPerNode: z.number().int().describe(
    "The number of CPU cores enabled per node in the Autonomous VM cluster.",
  ).optional(),
  DbServers: z.array(z.string()).describe(
    "The list of database servers associated with the Autonomous VM cluster.",
  ).optional(),
  Description: z.string().describe(
    "The user-provided description of the Autonomous VM cluster.",
  ).optional(),
  IsMtlsEnabledVmCluster: z.boolean().describe(
    "Indicates whether mutual TLS (mTLS) authentication is enabled for the Autonomous VM cluster.",
  ).optional(),
  LicenseModel: z.enum(["BRING_YOUR_OWN_LICENSE", "LICENSE_INCLUDED"]).describe(
    "The Oracle license model that applies to the Autonomous VM cluster. Valid values are LICENSE_INCLUDED or BRING_YOUR_OWN_LICENSE.",
  ).optional(),
  MaintenanceWindow: z.object({
    DaysOfWeek: z.array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    ).describe("The days of the week when maintenance can be performed.")
      .optional(),
    HoursOfDay: z.array(z.number().int()).describe(
      "The hours of the day when maintenance can be performed.",
    ).optional(),
    LeadTimeInWeeks: z.number().int().describe(
      "The lead time in weeks before the maintenance window.",
    ).optional(),
    Months: z.array(
      z.enum([
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ]),
    ).describe("The months when maintenance can be performed.").optional(),
    Preference: z.enum(["NO_PREFERENCE", "CUSTOM_PREFERENCE"]).describe(
      "The preference for the maintenance window scheduling.",
    ).optional(),
    WeeksOfMonth: z.array(z.number().int()).describe(
      "The weeks of the month when maintenance can be performed.",
    ).optional(),
  }).describe(
    "The scheduling details for the maintenance window. Patching and system updates take place during the maintenance window.",
  ).optional(),
  MemoryPerOracleComputeUnitInGBs: z.number().int().describe(
    "The amount of memory allocated per Oracle Compute Unit, in GB.",
  ).optional(),
  ScanListenerPortNonTls: z.number().int().min(1024).max(8999).describe(
    "The SCAN listener port for non-TLS (TCP) protocol. The default is 1521.",
  ).optional(),
  ScanListenerPortTls: z.number().int().min(1024).max(8999).describe(
    "The SCAN listener port for TLS (TCP) protocol. The default is 2484.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with the Autonomous VM cluster.",
  ).optional(),
  TimeZone: z.string().min(1).max(255).describe(
    "The time zone of the Autonomous VM cluster.",
  ).optional(),
  TotalContainerDatabases: z.number().int().describe(
    "The total number of Autonomous Container Databases that can be created with the allocated local storage.",
  ).optional(),
  IamRoles: z.array(IamRoleSchema).describe(
    "The AWS Identity and Access Management (IAM) service roles associated with the Autonomous VM cluster.",
  ).optional(),
});

const StateSchema = z.object({
  CloudAutonomousVmClusterId: z.string().optional(),
  CloudAutonomousVmClusterArn: z.string(),
  OdbNetworkId: z.string().optional(),
  OciResourceAnchorName: z.string().optional(),
  DisplayName: z.string().optional(),
  CloudExadataInfrastructureId: z.string().optional(),
  AutonomousDataStoragePercentage: z.number().optional(),
  AutonomousDataStorageSizeInTBs: z.number().optional(),
  AvailableAutonomousDataStorageSizeInTBs: z.number().optional(),
  AvailableContainerDatabases: z.number().optional(),
  AvailableCpus: z.number().optional(),
  ComputeModel: z.string().optional(),
  CpuCoreCount: z.number().optional(),
  CpuCoreCountPerNode: z.number().optional(),
  CpuPercentage: z.number().optional(),
  DataStorageSizeInGBs: z.number().optional(),
  DataStorageSizeInTBs: z.number().optional(),
  DbNodeStorageSizeInGBs: z.number().optional(),
  DbServers: z.array(z.string()).optional(),
  Description: z.string().optional(),
  Domain: z.string().optional(),
  ExadataStorageInTBsLowestScaledValue: z.number().optional(),
  Hostname: z.string().optional(),
  Ocid: z.string().optional(),
  OciUrl: z.string().optional(),
  IsMtlsEnabledVmCluster: z.boolean().optional(),
  LicenseModel: z.string().optional(),
  MaintenanceWindow: z.object({
    DaysOfWeek: z.array(z.string()),
    HoursOfDay: z.array(z.number()),
    LeadTimeInWeeks: z.number(),
    Months: z.array(z.string()),
    Preference: z.string(),
    WeeksOfMonth: z.array(z.number()),
  }).optional(),
  MaxAcdsLowestScaledValue: z.number().optional(),
  MemoryPerOracleComputeUnitInGBs: z.number().optional(),
  MemorySizeInGBs: z.number().optional(),
  NodeCount: z.number().optional(),
  NonProvisionableAutonomousContainerDatabases: z.number().optional(),
  ProvisionableAutonomousContainerDatabases: z.number().optional(),
  ProvisionedAutonomousContainerDatabases: z.number().optional(),
  ProvisionedCpus: z.number().optional(),
  ReclaimableCpus: z.number().optional(),
  ReservedCpus: z.number().optional(),
  ScanListenerPortNonTls: z.number().optional(),
  ScanListenerPortTls: z.number().optional(),
  Shape: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TimeZone: z.string().optional(),
  TotalContainerDatabases: z.number().optional(),
  IamRoles: z.array(IamRoleSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OdbNetworkId: z.string().describe(
    "The unique identifier of the ODB network associated with this Autonomous VM cluster.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The display name of the Autonomous VM cluster.").optional(),
  CloudExadataInfrastructureId: z.string().describe(
    "The unique identifier of the Cloud Exadata Infrastructure containing this Autonomous VM cluster.",
  ).optional(),
  AutonomousDataStorageSizeInTBs: z.number().describe(
    "The data storage size allocated for Autonomous Databases in the Autonomous VM cluster, in TB.",
  ).optional(),
  CpuCoreCountPerNode: z.number().int().describe(
    "The number of CPU cores enabled per node in the Autonomous VM cluster.",
  ).optional(),
  DbServers: z.array(z.string()).describe(
    "The list of database servers associated with the Autonomous VM cluster.",
  ).optional(),
  Description: z.string().describe(
    "The user-provided description of the Autonomous VM cluster.",
  ).optional(),
  IsMtlsEnabledVmCluster: z.boolean().describe(
    "Indicates whether mutual TLS (mTLS) authentication is enabled for the Autonomous VM cluster.",
  ).optional(),
  LicenseModel: z.enum(["BRING_YOUR_OWN_LICENSE", "LICENSE_INCLUDED"]).describe(
    "The Oracle license model that applies to the Autonomous VM cluster. Valid values are LICENSE_INCLUDED or BRING_YOUR_OWN_LICENSE.",
  ).optional(),
  MaintenanceWindow: z.object({
    DaysOfWeek: z.array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    ).describe("The days of the week when maintenance can be performed.")
      .optional(),
    HoursOfDay: z.array(z.number().int()).describe(
      "The hours of the day when maintenance can be performed.",
    ).optional(),
    LeadTimeInWeeks: z.number().int().describe(
      "The lead time in weeks before the maintenance window.",
    ).optional(),
    Months: z.array(
      z.enum([
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ]),
    ).describe("The months when maintenance can be performed.").optional(),
    Preference: z.enum(["NO_PREFERENCE", "CUSTOM_PREFERENCE"]).describe(
      "The preference for the maintenance window scheduling.",
    ).optional(),
    WeeksOfMonth: z.array(z.number().int()).describe(
      "The weeks of the month when maintenance can be performed.",
    ).optional(),
  }).describe(
    "The scheduling details for the maintenance window. Patching and system updates take place during the maintenance window.",
  ).optional(),
  MemoryPerOracleComputeUnitInGBs: z.number().int().describe(
    "The amount of memory allocated per Oracle Compute Unit, in GB.",
  ).optional(),
  ScanListenerPortNonTls: z.number().int().min(1024).max(8999).describe(
    "The SCAN listener port for non-TLS (TCP) protocol. The default is 1521.",
  ).optional(),
  ScanListenerPortTls: z.number().int().min(1024).max(8999).describe(
    "The SCAN listener port for TLS (TCP) protocol. The default is 2484.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with the Autonomous VM cluster.",
  ).optional(),
  TimeZone: z.string().min(1).max(255).describe(
    "The time zone of the Autonomous VM cluster.",
  ).optional(),
  TotalContainerDatabases: z.number().int().describe(
    "The total number of Autonomous Container Databases that can be created with the allocated local storage.",
  ).optional(),
  IamRoles: z.array(IamRoleSchema).describe(
    "The AWS Identity and Access Management (IAM) service roles associated with the Autonomous VM cluster.",
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

/** Swamp extension model for ODB CloudAutonomousVmCluster. Registered at `@swamp/aws/odb/cloud-autonomous-vm-cluster`. */
export const model = {
  type: "@swamp/aws/odb/cloud-autonomous-vm-cluster",
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
      description: "ODB CloudAutonomousVmCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ODB CloudAutonomousVmCluster",
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
          "AWS::ODB::CloudAutonomousVmCluster",
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
      description: "Get a ODB CloudAutonomousVmCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB CloudAutonomousVmCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ODB::CloudAutonomousVmCluster",
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
      description: "Update a ODB CloudAutonomousVmCluster",
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
        const identifier = existing.CloudAutonomousVmClusterArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ODB::CloudAutonomousVmCluster",
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
          "AWS::ODB::CloudAutonomousVmCluster",
          identifier,
          currentState,
          desiredState,
          [
            "OdbNetworkId",
            "CloudExadataInfrastructureId",
            "DbServers",
            "IsMtlsEnabledVmCluster",
            "MemoryPerOracleComputeUnitInGBs",
            "ScanListenerPortNonTls",
            "ScanListenerPortTls",
            "TimeZone",
            "AutonomousDataStorageSizeInTBs",
            "DisplayName",
            "CpuCoreCountPerNode",
            "Description",
            "LicenseModel",
            "MaintenanceWindow",
            "TotalContainerDatabases",
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
      description: "Delete a ODB CloudAutonomousVmCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB CloudAutonomousVmCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ODB::CloudAutonomousVmCluster",
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
      description: "Sync ODB CloudAutonomousVmCluster state from AWS",
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
        const identifier = existing.CloudAutonomousVmClusterArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ODB::CloudAutonomousVmCluster",
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
