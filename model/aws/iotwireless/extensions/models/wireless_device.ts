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

// Auto-generated extension model for @swamp/aws/iotwireless/wireless-device
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTWireless WirelessDevice (AWS::IoTWireless::WirelessDevice).
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

const OtaaV11Schema = z.object({
  AppKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  NwkKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  JoinEui: z.string().regex(new RegExp("[a-fA-F0-9]{16}")),
});

const OtaaV10xSchema = z.object({
  AppKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  AppEui: z.string().regex(new RegExp("[a-fA-F0-9]{16}")),
});

const SessionKeysAbpV11Schema = z.object({
  FNwkSIntKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  SNwkSIntKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  NwkSEncKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  AppSKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
});

const AbpV11Schema = z.object({
  DevAddr: z.string().regex(new RegExp("[a-fA-F0-9]{8}")),
  SessionKeys: SessionKeysAbpV11Schema,
});

const SessionKeysAbpV10xSchema = z.object({
  NwkSKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  AppSKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
});

const AbpV10xSchema = z.object({
  DevAddr: z.string().regex(new RegExp("[a-fA-F0-9]{8}")),
  SessionKeys: SessionKeysAbpV10xSchema,
});

const ApplicationSchema = z.object({
  DestinationName: z.string().max(128).regex(new RegExp("[a-zA-Z0-9-_]+"))
    .describe(
      "The name of the position data destination that describes the AWS IoT rule that processes the device's position data for use by AWS IoT Core for LoRaWAN.",
    ).optional(),
  FPort: z.number().int().min(1).max(223).describe("The Fport value.")
    .optional(),
  Type: z.enum([
    "SemtechGeolocation",
    "SemtechGNSS",
    "SemtechGNSSNG",
    "SemtechWiFi",
  ]).describe(
    "Application type, which can be specified to obtain real-time position information of your LoRaWAN device.",
  ).optional(),
});

const FPortsSchema = z.object({
  Applications: z.array(ApplicationSchema).describe(
    "A list of optional LoRaWAN application information, which can be used for geolocation.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
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
  Type: z.enum(["Sidewalk", "LoRaWAN"]).describe(
    "Wireless device type, currently only Sidewalk and LoRa",
  ),
  Name: z.string().max(256).describe("Wireless device name").optional(),
  Description: z.string().max(2048).describe("Wireless device description")
    .optional(),
  DestinationName: z.string().max(128).describe(
    "Wireless device destination name",
  ),
  LoRaWAN: z.object({
    DevEui: z.string().regex(new RegExp("[a-f0-9]{16}")).optional(),
    DeviceProfileId: z.string().max(256).optional(),
    ServiceProfileId: z.string().max(256).optional(),
    OtaaV11: OtaaV11Schema.optional(),
    OtaaV10x: OtaaV10xSchema.optional(),
    AbpV11: AbpV11Schema.optional(),
    AbpV10x: AbpV10xSchema.optional(),
    FPorts: FPortsSchema.optional(),
  }).describe(
    "The combination of Package, Station and Model which represents the version of the LoRaWAN Wireless Device.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the device. Currently not supported, will not create if tags are passed.",
  ).optional(),
  ThingArn: z.string().describe(
    "Thing arn. Passed into update to associate Thing with Wireless device.",
  ).optional(),
  LastUplinkReceivedAt: z.string().describe(
    "The date and time when the most recent uplink was received.",
  ).optional(),
  Positioning: z.enum(["Enabled", "Disabled"]).describe(
    "FPort values for the GNSS, stream, and ClockSync functions of the positioning information.",
  ).optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  DestinationName: z.string().optional(),
  LoRaWAN: z.object({
    DevEui: z.string(),
    DeviceProfileId: z.string(),
    ServiceProfileId: z.string(),
    OtaaV11: OtaaV11Schema,
    OtaaV10x: OtaaV10xSchema,
    AbpV11: AbpV11Schema,
    AbpV10x: AbpV10xSchema,
    FPorts: FPortsSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  Id: z.string(),
  ThingArn: z.string().optional(),
  ThingName: z.string().optional(),
  LastUplinkReceivedAt: z.string().optional(),
  Positioning: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Type: z.enum(["Sidewalk", "LoRaWAN"]).describe(
    "Wireless device type, currently only Sidewalk and LoRa",
  ).optional(),
  Name: z.string().max(256).describe("Wireless device name").optional(),
  Description: z.string().max(2048).describe("Wireless device description")
    .optional(),
  DestinationName: z.string().max(128).describe(
    "Wireless device destination name",
  ).optional(),
  LoRaWAN: z.object({
    DevEui: z.string().regex(new RegExp("[a-f0-9]{16}")).optional(),
    DeviceProfileId: z.string().max(256).optional(),
    ServiceProfileId: z.string().max(256).optional(),
    OtaaV11: OtaaV11Schema.optional(),
    OtaaV10x: OtaaV10xSchema.optional(),
    AbpV11: AbpV11Schema.optional(),
    AbpV10x: AbpV10xSchema.optional(),
    FPorts: FPortsSchema.optional(),
  }).describe(
    "The combination of Package, Station and Model which represents the version of the LoRaWAN Wireless Device.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the device. Currently not supported, will not create if tags are passed.",
  ).optional(),
  ThingArn: z.string().describe(
    "Thing arn. Passed into update to associate Thing with Wireless device.",
  ).optional(),
  LastUplinkReceivedAt: z.string().describe(
    "The date and time when the most recent uplink was received.",
  ).optional(),
  Positioning: z.enum(["Enabled", "Disabled"]).describe(
    "FPort values for the GNSS, stream, and ClockSync functions of the positioning information.",
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

/** Swamp extension model for IoTWireless WirelessDevice. Registered at `@swamp/aws/iotwireless/wireless-device`. */
export const model = {
  type: "@swamp/aws/iotwireless/wireless-device",
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
      description: "IoTWireless WirelessDevice resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless WirelessDevice",
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
          "AWS::IoTWireless::WirelessDevice",
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
      description: "Get a IoTWireless WirelessDevice",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless WirelessDevice",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoTWireless::WirelessDevice",
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
      description: "Update a IoTWireless WirelessDevice",
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
          "AWS::IoTWireless::WirelessDevice",
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
          "AWS::IoTWireless::WirelessDevice",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a IoTWireless WirelessDevice",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless WirelessDevice",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoTWireless::WirelessDevice",
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
      description: "Sync IoTWireless WirelessDevice state from AWS",
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
            "AWS::IoTWireless::WirelessDevice",
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
