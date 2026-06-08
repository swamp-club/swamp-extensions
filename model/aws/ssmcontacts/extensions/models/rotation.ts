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

// Auto-generated extension model for @swamp/aws/ssmcontacts/rotation
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSMContacts Rotation (AWS::SSMContacts::Rotation).
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

const MonthlySettingSchema = z.object({
  DayOfMonth: z.number().int().min(1).max(31).describe(
    "The day of the month when monthly recurring on-call rotations begin.",
  ),
  HandOffTime: z.string().regex(
    new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"),
  ).describe(
    "Details about when an on-call rotation shift begins or ends. Time of the day in format HH:MM",
  ),
});

const WeeklySettingSchema = z.object({
  DayOfWeek: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]).describe(
    "The day of the week when weekly recurring on-call shift rotations begin.",
  ),
  HandOffTime: z.string().regex(
    new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"),
  ).describe(
    "Details about when an on-call rotation shift begins or ends. Time of the day in format HH:MM",
  ),
});

const CoverageTimeSchema = z.object({
  StartTime: z.string().regex(
    new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"),
  ).describe(
    "Details about when an on-call rotation shift begins or ends. Time of the day in format HH:MM",
  ),
  EndTime: z.string().regex(
    new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"),
  ).describe(
    "Details about when an on-call rotation shift begins or ends. Time of the day in format HH:MM",
  ),
});

const ShiftCoverageSchema = z.object({
  DayOfWeek: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]).describe(
    "The day of the week when weekly recurring on-call shift rotations begin.",
  ),
  CoverageTimes: z.array(CoverageTimeSchema).describe(
    "Information about when an on-call shift begins and ends.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag"),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_]*$")).describe(
    "Name of the Rotation",
  ),
  ContactIds: z.array(z.string()).describe("Members of the rotation"),
  StartTime: z.string().regex(
    new RegExp("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})$"),
  ).describe("Start time of the first shift of Oncall Schedule"),
  TimeZoneId: z.string().describe(
    "TimeZone Identifier for the Oncall Schedule",
  ),
  Recurrence: z.object({
    MonthlySettings: z.array(MonthlySettingSchema).describe(
      "Information about on-call rotations that recur monthly.",
    ).optional(),
    WeeklySettings: z.array(WeeklySettingSchema).describe(
      "Information about on-call rotations that recur weekly.",
    ).optional(),
    DailySettings: z.array(
      z.string().regex(new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")),
    ).describe("Information about on-call rotations that recur daily.")
      .optional(),
    NumberOfOnCalls: z.number().int().min(1).describe(
      "Number of Oncalls per shift.",
    ).optional(),
    RecurrenceMultiplier: z.number().int().min(1).max(100).describe(
      "The number of days, weeks, or months a single rotation lasts.",
    ).optional(),
    ShiftCoverages: z.array(ShiftCoverageSchema).describe(
      "Information about the days of the week included in on-call rotation coverage.",
    ).optional(),
  }).describe(
    "Information about when an on-call rotation is in effect and how long the rotation period lasts.",
  ),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  ContactIds: z.array(z.string()).optional(),
  StartTime: z.string().optional(),
  TimeZoneId: z.string().optional(),
  Recurrence: z.object({
    MonthlySettings: z.array(MonthlySettingSchema),
    WeeklySettings: z.array(WeeklySettingSchema),
    DailySettings: z.array(z.string()),
    NumberOfOnCalls: z.number(),
    RecurrenceMultiplier: z.number(),
    ShiftCoverages: z.array(ShiftCoverageSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_]*$")).describe(
    "Name of the Rotation",
  ).optional(),
  ContactIds: z.array(z.string()).describe("Members of the rotation")
    .optional(),
  StartTime: z.string().regex(
    new RegExp("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})$"),
  ).describe("Start time of the first shift of Oncall Schedule").optional(),
  TimeZoneId: z.string().describe("TimeZone Identifier for the Oncall Schedule")
    .optional(),
  Recurrence: z.object({
    MonthlySettings: z.array(MonthlySettingSchema).describe(
      "Information about on-call rotations that recur monthly.",
    ).optional(),
    WeeklySettings: z.array(WeeklySettingSchema).describe(
      "Information about on-call rotations that recur weekly.",
    ).optional(),
    DailySettings: z.array(
      z.string().regex(new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")),
    ).describe("Information about on-call rotations that recur daily.")
      .optional(),
    NumberOfOnCalls: z.number().int().min(1).describe(
      "Number of Oncalls per shift.",
    ).optional(),
    RecurrenceMultiplier: z.number().int().min(1).max(100).describe(
      "The number of days, weeks, or months a single rotation lasts.",
    ).optional(),
    ShiftCoverages: z.array(ShiftCoverageSchema).describe(
      "Information about the days of the week included in on-call rotation coverage.",
    ).optional(),
  }).describe(
    "Information about when an on-call rotation is in effect and how long the rotation period lasts.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for SSMContacts Rotation. Registered at `@swamp/aws/ssmcontacts/rotation`. */
export const model = {
  type: "@swamp/aws/ssmcontacts/rotation",
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
      description: "SSMContacts Rotation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMContacts Rotation",
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
          "AWS::SSMContacts::Rotation",
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
      description: "Get a SSMContacts Rotation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts Rotation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SSMContacts::Rotation",
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
      description: "Update a SSMContacts Rotation",
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
          "AWS::SSMContacts::Rotation",
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
          "AWS::SSMContacts::Rotation",
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
      description: "Delete a SSMContacts Rotation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts Rotation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SSMContacts::Rotation",
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
      description: "Sync SSMContacts Rotation state from AWS",
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
            "AWS::SSMContacts::Rotation",
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
