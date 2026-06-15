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

// Auto-generated extension model for @swamp/aws/groundstation/mission-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GroundStation MissionProfile (AWS::GroundStation::MissionProfile).
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

const DataflowEdgeSchema = z.object({
  Source: z.string().optional(),
  Destination: z.string().optional(),
});

const TagSchema = z.object({
  Key: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,128}$")),
  Value: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,256}$")),
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
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")).describe(
    "A name used to identify a mission profile.",
  ),
  ContactPrePassDurationSeconds: z.number().int().describe(
    "Pre-pass time needed before the contact.",
  ).optional(),
  ContactPostPassDurationSeconds: z.number().int().describe(
    "Post-pass time needed after the contact.",
  ).optional(),
  MinimumViableContactDurationSeconds: z.number().int().describe(
    "Visibilities with shorter duration than the specified minimum viable contact duration will be ignored when searching for available contacts.",
  ),
  StreamsKmsKey: z.object({
    KmsKeyArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).optional(),
    KmsAliasArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).optional(),
    KmsAliasName: z.string().regex(new RegExp("^alias/[a-zA-Z0-9:/_-]+$"))
      .optional(),
  }).describe(
    "The ARN of a KMS Key used for encrypting data during transmission from the source to destination locations.",
  ).optional(),
  StreamsKmsRole: z.string().describe(
    "The ARN of the KMS Key or Alias Key role used to define permissions on KMS Key usage.",
  ).optional(),
  TelemetrySinkConfigArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).describe(
    "ARN of a Config resource of type TelemetrySinkConfig used for telemetry data sink configuration.",
  ).optional(),
  DataflowEdges: z.array(DataflowEdgeSchema),
  TrackingConfigArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  ContactPrePassDurationSeconds: z.number().optional(),
  ContactPostPassDurationSeconds: z.number().optional(),
  MinimumViableContactDurationSeconds: z.number().optional(),
  StreamsKmsKey: z.object({
    KmsKeyArn: z.string(),
    KmsAliasArn: z.string(),
    KmsAliasName: z.string(),
  }).optional(),
  StreamsKmsRole: z.string().optional(),
  TelemetrySinkConfigArn: z.string().optional(),
  DataflowEdges: z.array(DataflowEdgeSchema).optional(),
  TrackingConfigArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Id: z.string(),
  Arn: z.string(),
  Region: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")).describe(
    "A name used to identify a mission profile.",
  ).optional(),
  ContactPrePassDurationSeconds: z.number().int().describe(
    "Pre-pass time needed before the contact.",
  ).optional(),
  ContactPostPassDurationSeconds: z.number().int().describe(
    "Post-pass time needed after the contact.",
  ).optional(),
  MinimumViableContactDurationSeconds: z.number().int().describe(
    "Visibilities with shorter duration than the specified minimum viable contact duration will be ignored when searching for available contacts.",
  ).optional(),
  StreamsKmsKey: z.object({
    KmsKeyArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).optional(),
    KmsAliasArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).optional(),
    KmsAliasName: z.string().regex(new RegExp("^alias/[a-zA-Z0-9:/_-]+$"))
      .optional(),
  }).describe(
    "The ARN of a KMS Key used for encrypting data during transmission from the source to destination locations.",
  ).optional(),
  StreamsKmsRole: z.string().describe(
    "The ARN of the KMS Key or Alias Key role used to define permissions on KMS Key usage.",
  ).optional(),
  TelemetrySinkConfigArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).describe(
    "ARN of a Config resource of type TelemetrySinkConfig used for telemetry data sink configuration.",
  ).optional(),
  DataflowEdges: z.array(DataflowEdgeSchema).optional(),
  TrackingConfigArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
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

/** Swamp extension model for GroundStation MissionProfile. Registered at `@swamp/aws/groundstation/mission-profile`. */
export const model = {
  type: "@swamp/aws/groundstation/mission-profile",
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
      description: "GroundStation MissionProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GroundStation MissionProfile",
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
          "AWS::GroundStation::MissionProfile",
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
      description: "Get a GroundStation MissionProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation MissionProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GroundStation::MissionProfile",
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
      description: "Update a GroundStation MissionProfile",
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
        const idParts = [existing.Id?.toString(), existing.Arn?.toString()];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::GroundStation::MissionProfile",
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
          "AWS::GroundStation::MissionProfile",
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
      description: "Delete a GroundStation MissionProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation MissionProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GroundStation::MissionProfile",
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
      description: "Sync GroundStation MissionProfile state from AWS",
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
        const idParts = [existing.Id?.toString(), existing.Arn?.toString()];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::GroundStation::MissionProfile",
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
