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

// Auto-generated extension model for @swamp/aws/odb/cloud-exadata-infrastructure
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ODB CloudExadataInfrastructure (AWS::ODB::CloudExadataInfrastructure).
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

const CustomerContactSchema = z.object({
  Email: z.string().describe("The email address of the contact.").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that's 1 to 128 Unicode characters in length and can't be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,.,:, /, =, +, @, -, and \".",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that's 1 to 256 characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  AvailabilityZone: z.string().min(1).max(255).describe(
    "The name of the Availability Zone (AZ) where the Exadata infrastructure is located.",
  ).optional(),
  AvailabilityZoneId: z.string().min(1).max(255).describe(
    "The AZ ID of the AZ where the Exadata infrastructure is located.",
  ).optional(),
  MaintenanceWindow: z.object({
    CustomActionTimeoutInMins: z.number().int().min(15).max(120).describe(
      "The timeout duration for custom actions in minutes.",
    ).optional(),
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
    IsCustomActionTimeoutEnabled: z.boolean().describe(
      "Indicates whether custom action timeout is enabled.",
    ).optional(),
    LeadTimeInWeeks: z.number().int().min(1).max(4).describe(
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
    PatchingMode: z.string().describe(
      "The patching mode for the maintenance window.",
    ).optional(),
    Preference: z.string().describe(
      "The preference for the maintenance window scheduling.",
    ).optional(),
    WeeksOfMonth: z.array(z.number().int()).describe(
      "The weeks of the month when maintenance can be performed.",
    ).optional(),
  }).describe(
    "The scheduling details for the maintenance window. Patching and system updates take place during the maintenance window.",
  ).optional(),
  ComputeCount: z.number().int().describe(
    "The number of database servers for the Exadata infrastructure.",
  ).optional(),
  CustomerContactsToSendToOCI: z.array(CustomerContactSchema).describe(
    "The email addresses of contacts to receive notification from Oracle about maintenance updates for the Exadata infrastructure.",
  ).optional(),
  DatabaseServerType: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9_\\/.=-]+$"),
  ).describe(
    "The database server model type of the Exadata infrastructure. For the list of valid model names, use the ListDbSystemShapes operation.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The user-friendly name for the Exadata infrastructure.")
    .optional(),
  Shape: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9_\\/.=-]+$"))
    .describe("The model name of the Exadata infrastructure.").optional(),
  StorageCount: z.number().int().describe(
    "The number of storage servers that are activated for the Exadata infrastructure.",
  ).optional(),
  StorageServerType: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9_\\/.=-]+$"),
  ).describe(
    "The storage server model type of the Exadata infrastructure. For the list of valid model names, use the ListDbSystemShapes operation.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the Exadata Infrastructure.",
  ).optional(),
});

const StateSchema = z.object({
  ActivatedStorageCount: z.number().optional(),
  AdditionalStorageCount: z.number().optional(),
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  AvailableStorageSizeInGBs: z.number().optional(),
  CloudExadataInfrastructureArn: z.string(),
  CloudExadataInfrastructureId: z.string().optional(),
  MaintenanceWindow: z.object({
    CustomActionTimeoutInMins: z.number(),
    DaysOfWeek: z.array(z.string()),
    HoursOfDay: z.array(z.number()),
    IsCustomActionTimeoutEnabled: z.boolean(),
    LeadTimeInWeeks: z.number(),
    Months: z.array(z.string()),
    PatchingMode: z.string(),
    Preference: z.string(),
    WeeksOfMonth: z.array(z.number()),
  }).optional(),
  ComputeCount: z.number().optional(),
  ComputeModel: z.string().optional(),
  CpuCount: z.number().optional(),
  CustomerContactsToSendToOCI: z.array(CustomerContactSchema).optional(),
  DataStorageSizeInTBs: z.number().optional(),
  DatabaseServerType: z.string().optional(),
  DbNodeStorageSizeInGBs: z.number().optional(),
  DbServerVersion: z.string().optional(),
  DisplayName: z.string().optional(),
  MaxCpuCount: z.number().optional(),
  MaxDataStorageInTBs: z.number().optional(),
  MaxDbNodeStorageSizeInGBs: z.number().optional(),
  MaxMemoryInGBs: z.number().optional(),
  MemorySizeInGBs: z.number().optional(),
  OciResourceAnchorName: z.string().optional(),
  OciUrl: z.string().optional(),
  Ocid: z.string().optional(),
  Shape: z.string().optional(),
  StorageCount: z.number().optional(),
  StorageServerType: z.string().optional(),
  StorageServerVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TotalStorageSizeInGBs: z.number().optional(),
  DbServerIds: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AvailabilityZone: z.string().min(1).max(255).describe(
    "The name of the Availability Zone (AZ) where the Exadata infrastructure is located.",
  ).optional(),
  AvailabilityZoneId: z.string().min(1).max(255).describe(
    "The AZ ID of the AZ where the Exadata infrastructure is located.",
  ).optional(),
  MaintenanceWindow: z.object({
    CustomActionTimeoutInMins: z.number().int().min(15).max(120).describe(
      "The timeout duration for custom actions in minutes.",
    ).optional(),
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
    IsCustomActionTimeoutEnabled: z.boolean().describe(
      "Indicates whether custom action timeout is enabled.",
    ).optional(),
    LeadTimeInWeeks: z.number().int().min(1).max(4).describe(
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
    PatchingMode: z.string().describe(
      "The patching mode for the maintenance window.",
    ).optional(),
    Preference: z.string().describe(
      "The preference for the maintenance window scheduling.",
    ).optional(),
    WeeksOfMonth: z.array(z.number().int()).describe(
      "The weeks of the month when maintenance can be performed.",
    ).optional(),
  }).describe(
    "The scheduling details for the maintenance window. Patching and system updates take place during the maintenance window.",
  ).optional(),
  ComputeCount: z.number().int().describe(
    "The number of database servers for the Exadata infrastructure.",
  ).optional(),
  CustomerContactsToSendToOCI: z.array(CustomerContactSchema).describe(
    "The email addresses of contacts to receive notification from Oracle about maintenance updates for the Exadata infrastructure.",
  ).optional(),
  DatabaseServerType: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9_\\/.=-]+$"),
  ).describe(
    "The database server model type of the Exadata infrastructure. For the list of valid model names, use the ListDbSystemShapes operation.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The user-friendly name for the Exadata infrastructure.")
    .optional(),
  Shape: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9_\\/.=-]+$"))
    .describe("The model name of the Exadata infrastructure.").optional(),
  StorageCount: z.number().int().describe(
    "The number of storage servers that are activated for the Exadata infrastructure.",
  ).optional(),
  StorageServerType: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9_\\/.=-]+$"),
  ).describe(
    "The storage server model type of the Exadata infrastructure. For the list of valid model names, use the ListDbSystemShapes operation.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the Exadata Infrastructure.",
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

/** Swamp extension model for ODB CloudExadataInfrastructure. Registered at `@swamp/aws/odb/cloud-exadata-infrastructure`. */
export const model = {
  type: "@swamp/aws/odb/cloud-exadata-infrastructure",
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
      description: "ODB CloudExadataInfrastructure resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ODB CloudExadataInfrastructure",
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
          "AWS::ODB::CloudExadataInfrastructure",
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
      description: "Get a ODB CloudExadataInfrastructure",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB CloudExadataInfrastructure",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ODB::CloudExadataInfrastructure",
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
      description: "Update a ODB CloudExadataInfrastructure",
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
        const identifier = existing.CloudExadataInfrastructureArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ODB::CloudExadataInfrastructure",
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
          "AWS::ODB::CloudExadataInfrastructure",
          identifier,
          currentState,
          desiredState,
          [
            "AvailabilityZone",
            "AvailabilityZoneId",
            "Shape",
            "DatabaseServerType",
            "StorageServerType",
            "DisplayName",
            "ComputeCount",
            "CustomerContactsToSendToOCI",
            "StorageCount",
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
      description: "Delete a ODB CloudExadataInfrastructure",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB CloudExadataInfrastructure",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ODB::CloudExadataInfrastructure",
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
      description: "Sync ODB CloudExadataInfrastructure state from AWS",
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
        const identifier = existing.CloudExadataInfrastructureArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ODB::CloudExadataInfrastructure",
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
