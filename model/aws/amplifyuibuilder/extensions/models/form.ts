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

// Auto-generated extension model for @swamp/aws/amplifyuibuilder/form
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AmplifyUIBuilder Form (AWS::AmplifyUIBuilder::Form).
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

const FormButtonSchema = z.object({
  Excluded: z.boolean().optional(),
  Children: z.string().optional(),
  Position: z.object({
    Fixed: z.enum(["first"]).optional(),
    RightOf: z.string().optional(),
    Below: z.string().optional(),
  }).optional(),
});

const SectionalElementSchema = z.object({
  Type: z.string(),
  Position: z.object({
    Fixed: z.enum(["first"]).optional(),
    RightOf: z.string().optional(),
    Below: z.string().optional(),
  }).optional(),
  Text: z.string().optional(),
  Level: z.number().optional(),
  Orientation: z.string().optional(),
  Excluded: z.boolean().optional(),
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
  AppId: z.string().optional(),
  Cta: z.object({
    Position: z.enum(["top", "bottom", "top_and_bottom"]).optional(),
    Clear: FormButtonSchema.optional(),
    Cancel: FormButtonSchema.optional(),
    Submit: FormButtonSchema.optional(),
  }).optional(),
  DataType: z.object({
    DataSourceType: z.enum(["DataStore", "Custom"]),
    DataTypeName: z.string(),
  }).optional(),
  EnvironmentName: z.string().optional(),
  FormActionType: z.enum(["create", "update"]).optional(),
  LabelDecorator: z.enum(["required", "optional", "none"]).optional(),
  Name: z.string().min(1).max(255).optional(),
  SchemaVersion: z.string().optional(),
  SectionalElements: z.record(z.string(), SectionalElementSchema).optional(),
  Style: z.object({
    HorizontalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    VerticalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    OuterPadding: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
});

const StateSchema = z.object({
  AppId: z.string(),
  Cta: z.object({
    Position: z.string(),
    Clear: FormButtonSchema,
    Cancel: FormButtonSchema,
    Submit: FormButtonSchema,
  }).optional(),
  DataType: z.object({
    DataSourceType: z.string(),
    DataTypeName: z.string(),
  }).optional(),
  EnvironmentName: z.string(),
  FormActionType: z.string().optional(),
  Id: z.string(),
  LabelDecorator: z.string().optional(),
  Name: z.string().optional(),
  SchemaVersion: z.string().optional(),
  SectionalElements: z.record(z.string(), z.unknown()).optional(),
  Style: z.object({
    HorizontalGap: z.object({
      TokenReference: z.string(),
      Value: z.string(),
    }),
    VerticalGap: z.object({
      TokenReference: z.string(),
      Value: z.string(),
    }),
    OuterPadding: z.object({
      TokenReference: z.string(),
      Value: z.string(),
    }),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppId: z.string().optional(),
  Cta: z.object({
    Position: z.enum(["top", "bottom", "top_and_bottom"]).optional(),
    Clear: FormButtonSchema.optional(),
    Cancel: FormButtonSchema.optional(),
    Submit: FormButtonSchema.optional(),
  }).optional(),
  DataType: z.object({
    DataSourceType: z.enum(["DataStore", "Custom"]).optional(),
    DataTypeName: z.string().optional(),
  }).optional(),
  EnvironmentName: z.string().optional(),
  FormActionType: z.enum(["create", "update"]).optional(),
  LabelDecorator: z.enum(["required", "optional", "none"]).optional(),
  Name: z.string().min(1).max(255).optional(),
  SchemaVersion: z.string().optional(),
  SectionalElements: z.record(z.string(), SectionalElementSchema).optional(),
  Style: z.object({
    HorizontalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    VerticalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    OuterPadding: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
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

/** Swamp extension model for AmplifyUIBuilder Form. Registered at `@swamp/aws/amplifyuibuilder/form`. */
export const model = {
  type: "@swamp/aws/amplifyuibuilder/form",
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
      description: "AmplifyUIBuilder Form resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AmplifyUIBuilder Form",
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
          "AWS::AmplifyUIBuilder::Form",
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
      description: "Get a AmplifyUIBuilder Form",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmplifyUIBuilder Form",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AmplifyUIBuilder::Form",
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
      description: "Update a AmplifyUIBuilder Form",
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
        const idParts = [
          existing.AppId?.toString(),
          existing.EnvironmentName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::AmplifyUIBuilder::Form",
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
          "AWS::AmplifyUIBuilder::Form",
          identifier,
          currentState,
          desiredState,
          ["AppId", "EnvironmentName"],
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
      description: "Delete a AmplifyUIBuilder Form",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmplifyUIBuilder Form",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AmplifyUIBuilder::Form",
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
      description: "Sync AmplifyUIBuilder Form state from AWS",
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
        const idParts = [
          existing.AppId?.toString(),
          existing.EnvironmentName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::AmplifyUIBuilder::Form",
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
