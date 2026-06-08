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

// Auto-generated extension model for @swamp/aws/apptest/test-case
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppTest TestCase (AWS::AppTest::TestCase).
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

const M2ManagedActionPropertiesSchema = z.object({
  ForceStop: z.boolean().optional(),
  ImportDataSetLocation: z.string().regex(new RegExp("^\\S{1,1000}$"))
    .optional(),
});

const M2ManagedApplicationActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.enum(["Configure", "Deconfigure"]),
  Properties: M2ManagedActionPropertiesSchema.optional(),
});

const M2NonManagedApplicationActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.enum(["Configure", "Deconfigure"]),
});

const CloudFormationActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.enum(["Create", "Delete"]).optional(),
});

const BatchSchema = z.object({
  BatchJobName: z.string().regex(new RegExp("^\\S{1,1000}$")),
  BatchJobParameters: z.record(z.string(), z.string()).optional(),
  ExportDataSetNames: z.array(z.string().regex(new RegExp("^\\S{1,100}$")))
    .optional(),
});

const ScriptSchema = z.object({
  ScriptLocation: z.string().min(0).max(1024),
  Type: z.enum(["Selenium"]),
});

const TN3270Schema = z.object({
  Script: ScriptSchema,
  ExportDataSetNames: z.array(z.string().regex(new RegExp("^\\S{1,100}$")))
    .optional(),
});

const MainframeActionPropertiesSchema = z.object({
  DmsTaskArn: z.string().regex(new RegExp("^\\S{1,1000}$")).optional(),
});

const MainframeActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.object({
    Batch: BatchSchema.optional(),
    Tn3270: TN3270Schema.optional(),
  }),
  Properties: MainframeActionPropertiesSchema.optional(),
});

const DataSetSchema = z.object({
  Type: z.enum(["PS"]),
  Name: z.string().regex(new RegExp("^\\S{1,100}$")),
  Ccsid: z.string().regex(new RegExp("^\\S{1,50}$")),
  Format: z.enum(["FIXED", "VARIABLE", "LINE_SEQUENTIAL"]),
  Length: z.number(),
});

const SourceDatabaseMetadataSchema = z.object({
  Type: z.enum(["z/OS-DB2"]),
  CaptureTool: z.enum(["Precisely", "AWS DMS"]),
});

const TargetDatabaseMetadataSchema = z.object({
  Type: z.enum(["PostgreSQL"]),
  CaptureTool: z.enum(["Precisely", "AWS DMS"]),
});

const DatabaseCDCSchema = z.object({
  SourceMetadata: SourceDatabaseMetadataSchema,
  TargetMetadata: TargetDatabaseMetadataSchema,
});

const InputFileSchema = z.object({
  SourceLocation: z.string().regex(new RegExp("^\\S{1,1000}$")),
  TargetLocation: z.string().regex(new RegExp("^\\S{1,1000}$")),
  FileMetadata: z.object({
    DataSets: z.array(DataSetSchema).optional(),
    DatabaseCDC: DatabaseCDCSchema.optional(),
  }),
});

const OutputFileSchema = z.object({
  FileLocation: z.string().min(0).max(1024).optional(),
});

const CompareActionSchema = z.object({
  Input: z.object({
    File: InputFileSchema.optional(),
  }),
  Output: z.object({
    File: OutputFileSchema.optional(),
  }).optional(),
});

const StepSchema = z.object({
  Name: z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9_\\-]{1,59}$")),
  Description: z.string().min(0).max(1000).optional(),
  Action: z.object({
    ResourceAction: z.object({
      M2ManagedApplicationAction: M2ManagedApplicationActionSchema.optional(),
      M2NonManagedApplicationAction: M2NonManagedApplicationActionSchema
        .optional(),
      CloudFormationAction: CloudFormationActionSchema.optional(),
    }).optional(),
    MainframeAction: MainframeActionSchema.optional(),
    CompareAction: CompareActionSchema.optional(),
  }),
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
  Description: z.string().min(0).max(1000).optional(),
  LatestVersion: z.object({
    Version: z.number(),
  }).optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9_\\-]{1,59}$")),
  Steps: z.array(StepSchema),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

const StateSchema = z.object({
  CreationTime: z.string().optional(),
  Description: z.string().optional(),
  LastUpdateTime: z.string().optional(),
  LatestVersion: z.object({
    Version: z.number(),
    Status: z.string(),
  }).optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  Steps: z.array(StepSchema).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TestCaseArn: z.string().optional(),
  TestCaseId: z.string(),
  TestCaseVersion: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(1000).optional(),
  LatestVersion: z.object({
    Version: z.number().optional(),
  }).optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9_\\-]{1,59}$"))
    .optional(),
  Steps: z.array(StepSchema).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
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

/** Swamp extension model for AppTest TestCase. Registered at `@swamp/aws/apptest/test-case`. */
export const model = {
  type: "@swamp/aws/apptest/test-case",
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
      description: "AppTest TestCase resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppTest TestCase",
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
          "AWS::AppTest::TestCase",
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
      description: "Get a AppTest TestCase",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppTest TestCase",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppTest::TestCase",
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
      description: "Update a AppTest TestCase",
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
        const identifier = existing.TestCaseId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppTest::TestCase",
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
          "AWS::AppTest::TestCase",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a AppTest TestCase",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppTest TestCase",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppTest::TestCase",
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
      description: "Sync AppTest TestCase state from AWS",
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
        const identifier = existing.TestCaseId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppTest::TestCase",
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
