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

// Auto-generated extension model for @swamp/aws/outposts/site
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Outposts Site (AWS::Outposts::Site).
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
  ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[\\S \\n]+$")),
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
  Name: z.string().min(1).max(1000).regex(new RegExp("^[\\S ]+$")),
  Description: z.string().min(1).max(1001).regex(new RegExp("^[\\S ]+$"))
    .optional(),
  Notes: z.string().min(1).max(2000).regex(new RegExp("^[\\S \\n]+$"))
    .optional(),
  Tags: z.array(TagSchema).optional(),
  OperatingAddress: z.object({
    ContactName: z.string().min(1).max(255).regex(new RegExp("^\\S[\\S ]*$")),
    ContactPhoneNumber: z.string().min(1).max(20).regex(
      new RegExp("^[\\S ]+$"),
    ),
    AddressLine1: z.string().min(1).max(180).regex(new RegExp("^\\S[\\S ]*$")),
    AddressLine2: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    AddressLine3: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    City: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$")),
    StateOrRegion: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$")),
    DistrictOrCounty: z.string().min(1).max(60).regex(
      new RegExp("^\\S[\\S ]*$"),
    ).optional(),
    PostalCode: z.string().min(1).max(20).regex(new RegExp("^[a-zA-Z0-9 -]+$")),
    CountryCode: z.string().min(2).max(2).regex(new RegExp("^[A-Z]{2}$")),
    Municipality: z.string().min(0).max(180).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
  }).optional(),
  ShippingAddress: z.object({
    ContactName: z.string().min(1).max(255).regex(new RegExp("^\\S[\\S ]*$")),
    ContactPhoneNumber: z.string().min(1).max(20).regex(
      new RegExp("^[\\S ]+$"),
    ),
    AddressLine1: z.string().min(1).max(180).regex(new RegExp("^\\S[\\S ]*$")),
    AddressLine2: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    AddressLine3: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    City: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$")),
    StateOrRegion: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$")),
    DistrictOrCounty: z.string().min(1).max(60).regex(
      new RegExp("^\\S[\\S ]*$"),
    ).optional(),
    PostalCode: z.string().min(1).max(20).regex(new RegExp("^[a-zA-Z0-9 -]+$")),
    CountryCode: z.string().min(2).max(2).regex(new RegExp("^[A-Z]{2}$")),
    Municipality: z.string().min(0).max(180).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
  }).optional(),
  RackPhysicalProperties: z.object({
    PowerDrawKva: z.enum([
      "POWER_5_KVA",
      "POWER_10_KVA",
      "POWER_15_KVA",
      "POWER_30_KVA",
    ]).optional(),
    PowerPhase: z.enum(["SINGLE_PHASE", "THREE_PHASE"]).optional(),
    PowerConnector: z.enum([
      "L6_30P",
      "IEC309",
      "AH530P7W",
      "AH532P6W",
      "CS8365C",
    ]).optional(),
    PowerFeedDrop: z.enum(["ABOVE_RACK", "BELOW_RACK"]).optional(),
    UplinkGbps: z.enum(["UPLINK_1G", "UPLINK_10G", "UPLINK_40G", "UPLINK_100G"])
      .optional(),
    UplinkCount: z.enum([
      "UPLINK_COUNT_1",
      "UPLINK_COUNT_2",
      "UPLINK_COUNT_3",
      "UPLINK_COUNT_4",
      "UPLINK_COUNT_5",
      "UPLINK_COUNT_6",
      "UPLINK_COUNT_7",
      "UPLINK_COUNT_8",
      "UPLINK_COUNT_12",
      "UPLINK_COUNT_16",
    ]).optional(),
    FiberOpticCableType: z.enum(["SINGLE_MODE", "MULTI_MODE"]).optional(),
    OpticalStandard: z.enum([
      "OPTIC_10GBASE_SR",
      "OPTIC_10GBASE_IR",
      "OPTIC_10GBASE_LR",
      "OPTIC_40GBASE_SR",
      "OPTIC_40GBASE_ESR",
      "OPTIC_40GBASE_IR4_LR4L",
      "OPTIC_40GBASE_LR4",
      "OPTIC_100GBASE_SR4",
      "OPTIC_100GBASE_CWDM4",
      "OPTIC_100GBASE_LR4",
      "OPTIC_100G_PSM4_MSA",
      "OPTIC_1000BASE_LX",
      "OPTIC_1000BASE_SX",
    ]).optional(),
    MaximumSupportedWeightLbs: z.enum([
      "NO_LIMIT",
      "MAX_1400_LBS",
      "MAX_1600_LBS",
      "MAX_1800_LBS",
      "MAX_2000_LBS",
    ]).optional(),
  }).optional(),
});

const StateSchema = z.object({
  SiteId: z.string().optional(),
  SiteArn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Notes: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  OperatingAddress: z.object({
    ContactName: z.string(),
    ContactPhoneNumber: z.string(),
    AddressLine1: z.string(),
    AddressLine2: z.string(),
    AddressLine3: z.string(),
    City: z.string(),
    StateOrRegion: z.string(),
    DistrictOrCounty: z.string(),
    PostalCode: z.string(),
    CountryCode: z.string(),
    Municipality: z.string(),
  }).optional(),
  ShippingAddress: z.object({
    ContactName: z.string(),
    ContactPhoneNumber: z.string(),
    AddressLine1: z.string(),
    AddressLine2: z.string(),
    AddressLine3: z.string(),
    City: z.string(),
    StateOrRegion: z.string(),
    DistrictOrCounty: z.string(),
    PostalCode: z.string(),
    CountryCode: z.string(),
    Municipality: z.string(),
  }).optional(),
  RackPhysicalProperties: z.object({
    PowerDrawKva: z.string(),
    PowerPhase: z.string(),
    PowerConnector: z.string(),
    PowerFeedDrop: z.string(),
    UplinkGbps: z.string(),
    UplinkCount: z.string(),
    FiberOpticCableType: z.string(),
    OpticalStandard: z.string(),
    MaximumSupportedWeightLbs: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(1000).regex(new RegExp("^[\\S ]+$")).optional(),
  Description: z.string().min(1).max(1001).regex(new RegExp("^[\\S ]+$"))
    .optional(),
  Notes: z.string().min(1).max(2000).regex(new RegExp("^[\\S \\n]+$"))
    .optional(),
  Tags: z.array(TagSchema).optional(),
  OperatingAddress: z.object({
    ContactName: z.string().min(1).max(255).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    ContactPhoneNumber: z.string().min(1).max(20).regex(new RegExp("^[\\S ]+$"))
      .optional(),
    AddressLine1: z.string().min(1).max(180).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    AddressLine2: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    AddressLine3: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    City: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    StateOrRegion: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    DistrictOrCounty: z.string().min(1).max(60).regex(
      new RegExp("^\\S[\\S ]*$"),
    ).optional(),
    PostalCode: z.string().min(1).max(20).regex(new RegExp("^[a-zA-Z0-9 -]+$"))
      .optional(),
    CountryCode: z.string().min(2).max(2).regex(new RegExp("^[A-Z]{2}$"))
      .optional(),
    Municipality: z.string().min(0).max(180).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
  }).optional(),
  ShippingAddress: z.object({
    ContactName: z.string().min(1).max(255).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    ContactPhoneNumber: z.string().min(1).max(20).regex(new RegExp("^[\\S ]+$"))
      .optional(),
    AddressLine1: z.string().min(1).max(180).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    AddressLine2: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    AddressLine3: z.string().min(0).max(60).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    City: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    StateOrRegion: z.string().min(1).max(50).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
    DistrictOrCounty: z.string().min(1).max(60).regex(
      new RegExp("^\\S[\\S ]*$"),
    ).optional(),
    PostalCode: z.string().min(1).max(20).regex(new RegExp("^[a-zA-Z0-9 -]+$"))
      .optional(),
    CountryCode: z.string().min(2).max(2).regex(new RegExp("^[A-Z]{2}$"))
      .optional(),
    Municipality: z.string().min(0).max(180).regex(new RegExp("^\\S[\\S ]*$"))
      .optional(),
  }).optional(),
  RackPhysicalProperties: z.object({
    PowerDrawKva: z.enum([
      "POWER_5_KVA",
      "POWER_10_KVA",
      "POWER_15_KVA",
      "POWER_30_KVA",
    ]).optional(),
    PowerPhase: z.enum(["SINGLE_PHASE", "THREE_PHASE"]).optional(),
    PowerConnector: z.enum([
      "L6_30P",
      "IEC309",
      "AH530P7W",
      "AH532P6W",
      "CS8365C",
    ]).optional(),
    PowerFeedDrop: z.enum(["ABOVE_RACK", "BELOW_RACK"]).optional(),
    UplinkGbps: z.enum(["UPLINK_1G", "UPLINK_10G", "UPLINK_40G", "UPLINK_100G"])
      .optional(),
    UplinkCount: z.enum([
      "UPLINK_COUNT_1",
      "UPLINK_COUNT_2",
      "UPLINK_COUNT_3",
      "UPLINK_COUNT_4",
      "UPLINK_COUNT_5",
      "UPLINK_COUNT_6",
      "UPLINK_COUNT_7",
      "UPLINK_COUNT_8",
      "UPLINK_COUNT_12",
      "UPLINK_COUNT_16",
    ]).optional(),
    FiberOpticCableType: z.enum(["SINGLE_MODE", "MULTI_MODE"]).optional(),
    OpticalStandard: z.enum([
      "OPTIC_10GBASE_SR",
      "OPTIC_10GBASE_IR",
      "OPTIC_10GBASE_LR",
      "OPTIC_40GBASE_SR",
      "OPTIC_40GBASE_ESR",
      "OPTIC_40GBASE_IR4_LR4L",
      "OPTIC_40GBASE_LR4",
      "OPTIC_100GBASE_SR4",
      "OPTIC_100GBASE_CWDM4",
      "OPTIC_100GBASE_LR4",
      "OPTIC_100G_PSM4_MSA",
      "OPTIC_1000BASE_LX",
      "OPTIC_1000BASE_SX",
    ]).optional(),
    MaximumSupportedWeightLbs: z.enum([
      "NO_LIMIT",
      "MAX_1400_LBS",
      "MAX_1600_LBS",
      "MAX_1800_LBS",
      "MAX_2000_LBS",
    ]).optional(),
  }).optional(),
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

/** Swamp extension model for Outposts Site. Registered at `@swamp/aws/outposts/site`. */
export const model = {
  type: "@swamp/aws/outposts/site",
  version: "2026.06.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Outposts Site resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Outposts Site",
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
          "AWS::Outposts::Site",
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
      description: "Get a Outposts Site",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Outposts Site",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Outposts::Site",
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
      description: "Update a Outposts Site",
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
        const identifier = existing.SiteArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Outposts::Site",
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
          "AWS::Outposts::Site",
          identifier,
          currentState,
          desiredState,
          ["OperatingAddress", "ShippingAddress"],
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
      description: "Delete a Outposts Site",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Outposts Site",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Outposts::Site",
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
      description: "Sync Outposts Site state from AWS",
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
        const identifier = existing.SiteArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Outposts::Site",
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
