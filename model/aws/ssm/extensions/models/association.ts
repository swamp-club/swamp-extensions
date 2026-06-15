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

// Auto-generated extension model for @swamp/aws/ssm/association
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSM Association (AWS::SSM::Association).
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

const TargetSchema = z.object({
  Values: z.array(z.string()),
  Key: z.string().regex(
    new RegExp(
      "^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]{1,128}$|resource-groups:Name",
      "u",
    ),
  ),
});

const S3OutputLocationSchema = z.object({
  OutputS3KeyPrefix: z.string().max(1024).optional(),
  OutputS3Region: z.string().min(3).max(20).optional(),
  OutputS3BucketName: z.string().min(3).max(63).optional(),
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
  AssociationName: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{3,128}$"))
    .describe("The name of the association.").optional(),
  CalendarNames: z.array(z.string()).optional(),
  ScheduleExpression: z.string().min(1).max(256).describe(
    "A Cron or Rate expression that specifies when the association is applied to the target.",
  ).optional(),
  MaxErrors: z.string().regex(
    new RegExp("^([1-9][0-9]{0,6}|[0]|[1-9][0-9]%|[0-9]%|100%)$"),
  ).optional(),
  Parameters: z.record(z.string(), z.array(z.string())).describe(
    "Parameter values that the SSM document uses at runtime.",
  ).optional(),
  InstanceId: z.string().regex(
    new RegExp("(^i-(\\w{8}|\\w{17})$)|(^mi-\\w{17}$)"),
  ).describe("The ID of the instance that the SSM document is associated with.")
    .optional(),
  WaitForSuccessTimeoutSeconds: z.number().int().min(15).max(172800).optional(),
  MaxConcurrency: z.string().regex(
    new RegExp("^([1-9][0-9]{0,6}|[1-9][0-9]%|[1-9]%|100%)$"),
  ).optional(),
  ComplianceSeverity: z.enum([
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
    "UNSPECIFIED",
  ]).optional(),
  Targets: z.array(TargetSchema).describe(
    "The targets that the SSM document sends commands to.",
  ).optional(),
  SyncCompliance: z.enum(["AUTO", "MANUAL"]).optional(),
  OutputLocation: z.object({
    S3Location: S3OutputLocationSchema.optional(),
  }).optional(),
  ScheduleOffset: z.number().int().min(1).max(6).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.:/]{3,200}$")).describe(
    "The name of the SSM document.",
  ),
  ApplyOnlyAtCronInterval: z.boolean().optional(),
  DocumentVersion: z.string().regex(
    new RegExp("([$]LATEST|[$]DEFAULT|^[1-9][0-9]*$)"),
  ).describe("The version of the SSM document to associate with the target.")
    .optional(),
  AutomationTargetParameterName: z.string().min(1).max(50).optional(),
});

const StateSchema = z.object({
  AssociationName: z.string().optional(),
  CalendarNames: z.array(z.string()).optional(),
  ScheduleExpression: z.string().optional(),
  MaxErrors: z.string().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  InstanceId: z.string().optional(),
  WaitForSuccessTimeoutSeconds: z.number().optional(),
  MaxConcurrency: z.string().optional(),
  ComplianceSeverity: z.string().optional(),
  Targets: z.array(TargetSchema).optional(),
  SyncCompliance: z.string().optional(),
  OutputLocation: z.object({
    S3Location: S3OutputLocationSchema,
  }).optional(),
  ScheduleOffset: z.number().optional(),
  Name: z.string().optional(),
  ApplyOnlyAtCronInterval: z.boolean().optional(),
  DocumentVersion: z.string().optional(),
  AssociationId: z.string(),
  AutomationTargetParameterName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssociationName: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{3,128}$"))
    .describe("The name of the association.").optional(),
  CalendarNames: z.array(z.string()).optional(),
  ScheduleExpression: z.string().min(1).max(256).describe(
    "A Cron or Rate expression that specifies when the association is applied to the target.",
  ).optional(),
  MaxErrors: z.string().regex(
    new RegExp("^([1-9][0-9]{0,6}|[0]|[1-9][0-9]%|[0-9]%|100%)$"),
  ).optional(),
  Parameters: z.record(z.string(), z.array(z.string())).describe(
    "Parameter values that the SSM document uses at runtime.",
  ).optional(),
  InstanceId: z.string().regex(
    new RegExp("(^i-(\\w{8}|\\w{17})$)|(^mi-\\w{17}$)"),
  ).describe("The ID of the instance that the SSM document is associated with.")
    .optional(),
  WaitForSuccessTimeoutSeconds: z.number().int().min(15).max(172800).optional(),
  MaxConcurrency: z.string().regex(
    new RegExp("^([1-9][0-9]{0,6}|[1-9][0-9]%|[1-9]%|100%)$"),
  ).optional(),
  ComplianceSeverity: z.enum([
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
    "UNSPECIFIED",
  ]).optional(),
  Targets: z.array(TargetSchema).describe(
    "The targets that the SSM document sends commands to.",
  ).optional(),
  SyncCompliance: z.enum(["AUTO", "MANUAL"]).optional(),
  OutputLocation: z.object({
    S3Location: S3OutputLocationSchema.optional(),
  }).optional(),
  ScheduleOffset: z.number().int().min(1).max(6).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.:/]{3,200}$")).describe(
    "The name of the SSM document.",
  ).optional(),
  ApplyOnlyAtCronInterval: z.boolean().optional(),
  DocumentVersion: z.string().regex(
    new RegExp("([$]LATEST|[$]DEFAULT|^[1-9][0-9]*$)"),
  ).describe("The version of the SSM document to associate with the target.")
    .optional(),
  AutomationTargetParameterName: z.string().min(1).max(50).optional(),
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

/** Swamp extension model for SSM Association. Registered at `@swamp/aws/ssm/association`. */
export const model = {
  type: "@swamp/aws/ssm/association",
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
      description: "SSM Association resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSM Association",
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
          "AWS::SSM::Association",
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
      description: "Get a SSM Association",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM Association",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SSM::Association",
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
      description: "Update a SSM Association",
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
        const identifier = existing.AssociationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSM::Association",
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
          "AWS::SSM::Association",
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
      description: "Delete a SSM Association",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM Association",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SSM::Association",
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
      description: "Sync SSM Association state from AWS",
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
        const identifier = existing.AssociationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSM::Association",
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
