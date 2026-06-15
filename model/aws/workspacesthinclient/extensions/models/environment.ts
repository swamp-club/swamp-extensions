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

// Auto-generated extension model for @swamp/aws/workspacesthinclient/environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkSpacesThinClient Environment (AWS::WorkSpacesThinClient::Environment).
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
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Name: z.string().min(1).max(64).regex(new RegExp("^.+$")).describe(
    "The name of the environment.",
  ).optional(),
  DesktopArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[0-9]{0,12}:[a-zA-Z0-9\\-\\/\\._]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the desktop to stream from Amazon WorkSpaces, WorkSpaces Web, or AppStream 2.0.",
  ),
  DesktopEndpoint: z.string().min(1).max(1024).regex(
    new RegExp(
      "^(https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,32}(:[0-9]{1,5})?(\\/.*)?$",
    ),
  ).describe(
    "The URL for the identity provider login (only for environments that use AppStream 2.0).",
  ).optional(),
  SoftwareSetUpdateSchedule: z.enum([
    "USE_MAINTENANCE_WINDOW",
    "APPLY_IMMEDIATELY",
  ]).describe(
    "An option to define if software updates should be applied within a maintenance window.",
  ).optional(),
  MaintenanceWindow: z.object({
    Type: z.enum(["SYSTEM", "CUSTOM"]).describe(
      "The type of maintenance window.",
    ),
    StartTimeHour: z.number().int().min(0).max(23).describe(
      "The hour start time of maintenance window.",
    ).optional(),
    StartTimeMinute: z.number().int().min(0).max(59).describe(
      "The minute start time of maintenance window.",
    ).optional(),
    EndTimeHour: z.number().int().min(0).max(23).describe(
      "The hour end time of maintenance window.",
    ).optional(),
    EndTimeMinute: z.number().int().min(0).max(59).describe(
      "The minute end time of maintenance window.",
    ).optional(),
    DaysOfTheWeek: z.array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    ).describe("The date of maintenance window.").optional(),
    ApplyTimeOf: z.enum(["UTC", "DEVICE"]).describe(
      "The desired time zone maintenance window.",
    ).optional(),
  }).describe("A specification for a time window to apply software updates.")
    .optional(),
  SoftwareSetUpdateMode: z.enum(["USE_LATEST", "USE_DESIRED"]).describe(
    "An option to define which software updates to apply.",
  ).optional(),
  DesiredSoftwareSetId: z.string().regex(new RegExp("^[0-9]{1,9}$")).describe(
    "The ID of the software set to apply.",
  ).optional(),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[0-9]{0,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the AWS Key Management Service key used to encrypt the environment.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  DeviceCreationTags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the newly created devices for this environment.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Name: z.string().optional(),
  DesktopArn: z.string().optional(),
  DesktopEndpoint: z.string().optional(),
  DesktopType: z.string().optional(),
  ActivationCode: z.string().optional(),
  RegisteredDevicesCount: z.number().optional(),
  SoftwareSetUpdateSchedule: z.string().optional(),
  MaintenanceWindow: z.object({
    Type: z.string(),
    StartTimeHour: z.number(),
    StartTimeMinute: z.number(),
    EndTimeHour: z.number(),
    EndTimeMinute: z.number(),
    DaysOfTheWeek: z.array(z.string()),
    ApplyTimeOf: z.string(),
  }).optional(),
  SoftwareSetUpdateMode: z.string().optional(),
  DesiredSoftwareSetId: z.string().optional(),
  PendingSoftwareSetId: z.string().optional(),
  PendingSoftwareSetVersion: z.string().optional(),
  SoftwareSetComplianceStatus: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Arn: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  DeviceCreationTags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^.+$")).describe(
    "The name of the environment.",
  ).optional(),
  DesktopArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[0-9]{0,12}:[a-zA-Z0-9\\-\\/\\._]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the desktop to stream from Amazon WorkSpaces, WorkSpaces Web, or AppStream 2.0.",
  ).optional(),
  DesktopEndpoint: z.string().min(1).max(1024).regex(
    new RegExp(
      "^(https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,32}(:[0-9]{1,5})?(\\/.*)?$",
    ),
  ).describe(
    "The URL for the identity provider login (only for environments that use AppStream 2.0).",
  ).optional(),
  SoftwareSetUpdateSchedule: z.enum([
    "USE_MAINTENANCE_WINDOW",
    "APPLY_IMMEDIATELY",
  ]).describe(
    "An option to define if software updates should be applied within a maintenance window.",
  ).optional(),
  MaintenanceWindow: z.object({
    Type: z.enum(["SYSTEM", "CUSTOM"]).describe(
      "The type of maintenance window.",
    ).optional(),
    StartTimeHour: z.number().int().min(0).max(23).describe(
      "The hour start time of maintenance window.",
    ).optional(),
    StartTimeMinute: z.number().int().min(0).max(59).describe(
      "The minute start time of maintenance window.",
    ).optional(),
    EndTimeHour: z.number().int().min(0).max(23).describe(
      "The hour end time of maintenance window.",
    ).optional(),
    EndTimeMinute: z.number().int().min(0).max(59).describe(
      "The minute end time of maintenance window.",
    ).optional(),
    DaysOfTheWeek: z.array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    ).describe("The date of maintenance window.").optional(),
    ApplyTimeOf: z.enum(["UTC", "DEVICE"]).describe(
      "The desired time zone maintenance window.",
    ).optional(),
  }).describe("A specification for a time window to apply software updates.")
    .optional(),
  SoftwareSetUpdateMode: z.enum(["USE_LATEST", "USE_DESIRED"]).describe(
    "An option to define which software updates to apply.",
  ).optional(),
  DesiredSoftwareSetId: z.string().regex(new RegExp("^[0-9]{1,9}$")).describe(
    "The ID of the software set to apply.",
  ).optional(),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[0-9]{0,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the AWS Key Management Service key used to encrypt the environment.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  DeviceCreationTags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the newly created devices for this environment.",
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

/** Swamp extension model for WorkSpacesThinClient Environment. Registered at `@swamp/aws/workspacesthinclient/environment`. */
export const model = {
  type: "@swamp/aws/workspacesthinclient/environment",
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
      description: "WorkSpacesThinClient Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpacesThinClient Environment",
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
          "AWS::WorkSpacesThinClient::Environment",
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
      description: "Get a WorkSpacesThinClient Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesThinClient Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WorkSpacesThinClient::Environment",
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
      description: "Update a WorkSpacesThinClient Environment",
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
          "AWS::WorkSpacesThinClient::Environment",
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
          "AWS::WorkSpacesThinClient::Environment",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyArn", "DesktopArn"],
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
      description: "Delete a WorkSpacesThinClient Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesThinClient Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WorkSpacesThinClient::Environment",
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
      description: "Sync WorkSpacesThinClient Environment state from AWS",
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
            "AWS::WorkSpacesThinClient::Environment",
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
