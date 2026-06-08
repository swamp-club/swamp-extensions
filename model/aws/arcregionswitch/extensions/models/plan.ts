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

// Auto-generated extension model for @swamp/aws/arcregionswitch/plan
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ARCRegionSwitch Plan (AWS::ARCRegionSwitch::Plan).
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

const AssociatedAlarmSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  ResourceIdentifier: z.string(),
  AlarmType: z.enum(["applicationHealth", "trigger"]),
});

const S3ReportOutputConfigurationSchema = z.object({
  BucketPath: z.string().min(3).max(512).regex(
    new RegExp("^(?:s3://)?[a-z0-9][a-z0-9-]{1,61}[a-z0-9](?:/[^/ ][^/]*)*/?$"),
  ).optional(),
  BucketOwner: z.string().regex(new RegExp("^\\d{12}$")).optional(),
});

const TriggerConditionSchema = z.object({
  AssociatedAlarmName: z.string(),
  Condition: z.enum(["red", "green"]),
});

const TriggerSchema = z.object({
  Description: z.string().optional(),
  TargetRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$")),
  Action: z.enum(["activate", "deactivate", "postRecovery"]),
  Conditions: z.array(TriggerConditionSchema),
  MinDelayMinutesBetweenExecutions: z.number(),
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
  AssociatedAlarms: z.record(z.string(), AssociatedAlarmSchema).optional(),
  Description: z.string().optional(),
  ExecutionRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ),
  Name: z.string().min(1).max(32).regex(
    new RegExp("^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,30}[a-zA-Z0-9])?$"),
  ),
  PrimaryRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))
    .optional(),
  RecoveryApproach: z.enum(["activeActive", "activePassive"]),
  RecoveryTimeObjectiveMinutes: z.number().min(1).max(10080).optional(),
  Regions: z.array(z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))),
  ReportConfiguration: z.object({
    ReportOutput: z.array(z.object({
      S3Configuration: S3ReportOutputConfigurationSchema.optional(),
    })).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  Workflows: z.array(z.string()),
  Route53HealthChecks: z.object({
    HealthCheckIds: z.array(z.string()).optional(),
    RecordNames: z.array(z.string()).optional(),
    Regions: z.array(z.string()).optional(),
    HostedZoneIds: z.array(z.string()).optional(),
  }).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  AssociatedAlarms: z.record(z.string(), z.unknown()).optional(),
  Description: z.string().optional(),
  ExecutionRole: z.string().optional(),
  Name: z.string().optional(),
  Owner: z.string().optional(),
  PrimaryRegion: z.string().optional(),
  RecoveryApproach: z.string().optional(),
  RecoveryTimeObjectiveMinutes: z.number().optional(),
  Regions: z.array(z.string()).optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(z.object({
      S3Configuration: S3ReportOutputConfigurationSchema,
    })),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  Version: z.string().optional(),
  Workflows: z.array(z.string()).optional(),
  HealthChecksForPlan: z.record(z.string(), z.unknown()).optional(),
  Route53HealthChecks: z.object({
    HealthCheckIds: z.array(z.string()),
    RecordNames: z.array(z.string()),
    Regions: z.array(z.string()),
    HostedZoneIds: z.array(z.string()),
  }).optional(),
  PlanHealthChecks: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssociatedAlarms: z.record(z.string(), AssociatedAlarmSchema).optional(),
  Description: z.string().optional(),
  ExecutionRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  Name: z.string().min(1).max(32).regex(
    new RegExp("^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,30}[a-zA-Z0-9])?$"),
  ).optional(),
  PrimaryRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))
    .optional(),
  RecoveryApproach: z.enum(["activeActive", "activePassive"]).optional(),
  RecoveryTimeObjectiveMinutes: z.number().min(1).max(10080).optional(),
  Regions: z.array(z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$")))
    .optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(z.object({
      S3Configuration: S3ReportOutputConfigurationSchema.optional(),
    })).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  Workflows: z.array(z.string()).optional(),
  Route53HealthChecks: z.object({
    HealthCheckIds: z.array(z.string()).optional(),
    RecordNames: z.array(z.string()).optional(),
    Regions: z.array(z.string()).optional(),
    HostedZoneIds: z.array(z.string()).optional(),
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

/** Swamp extension model for ARCRegionSwitch Plan. Registered at `@swamp/aws/arcregionswitch/plan`. */
export const model = {
  type: "@swamp/aws/arcregionswitch/plan",
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
      description: "ARCRegionSwitch Plan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ARCRegionSwitch Plan",
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
          "AWS::ARCRegionSwitch::Plan",
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
      description: "Get a ARCRegionSwitch Plan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCRegionSwitch Plan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ARCRegionSwitch::Plan",
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
      description: "Update a ARCRegionSwitch Plan",
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
          "AWS::ARCRegionSwitch::Plan",
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
          "AWS::ARCRegionSwitch::Plan",
          identifier,
          currentState,
          desiredState,
          ["Name", "PrimaryRegion", "RecoveryApproach", "Regions"],
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
      description: "Delete a ARCRegionSwitch Plan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCRegionSwitch Plan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ARCRegionSwitch::Plan",
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
      description: "Sync ARCRegionSwitch Plan state from AWS",
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
            "AWS::ARCRegionSwitch::Plan",
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
