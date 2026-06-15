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

// Auto-generated extension model for @swamp/aws/glue/job
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Job (AWS::Glue::Job).
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

const GlobalArgsSchema = z.object({
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
  Connections: z.object({
    Connections: z.array(z.string()).describe(
      "A list of connections used by the job.",
    ).optional(),
  }).describe("Specifies the connections used by a job").optional(),
  MaxRetries: z.number().describe(
    "The maximum number of times to retry this job after a JobRun fails",
  ).optional(),
  Description: z.string().describe("A description of the job.").optional(),
  Timeout: z.number().int().describe(
    "The maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status.",
  ).optional(),
  AllocatedCapacity: z.number().describe(
    "The number of capacity units that are allocated to this job.",
  ).optional(),
  Name: z.string().describe("The name you assign to the job definition")
    .optional(),
  Role: z.string().describe(
    "The name or Amazon Resource Name (ARN) of the IAM role associated with this job.",
  ),
  DefaultArguments: z.record(z.string(), z.unknown()).describe(
    "The default arguments for this job, specified as name-value pairs.",
  ).optional(),
  NotificationProperty: z.object({
    NotifyDelayAfter: z.number().int().describe(
      "It is the number of minutes to wait before sending a job run delay notification after a job run starts",
    ).optional(),
  }).describe("Specifies configuration properties of a notification.")
    .optional(),
  WorkerType: z.enum([
    "Standard",
    "G.1X",
    "G.2X",
    "G.025X",
    "G.4X",
    "G.8X",
    "Z.2X",
    "G.12X",
    "G.16X",
    "R.1X",
    "R.2X",
    "R.4X",
    "R.8X",
  ]).describe(
    "TThe type of predefined worker that is allocated when a job runs.",
  ).optional(),
  ExecutionClass: z.string().describe(
    "Indicates whether the job is run with a standard or flexible execution class.",
  ).optional(),
  LogUri: z.string().describe("This field is reserved for future use.")
    .optional(),
  Command: z.object({
    Name: z.string().describe("The name of the job command").optional(),
    PythonVersion: z.string().describe(
      "The Python version being used to execute a Python shell job.",
    ).optional(),
    Runtime: z.string().describe(
      "Runtime is used to specify the versions of Ray, Python and additional libraries available in your environment",
    ).optional(),
    ScriptLocation: z.string().describe(
      "Specifies the Amazon Simple Storage Service (Amazon S3) path to a script that executes a job",
    ).optional(),
  }).describe("The code that executes a job."),
  GlueVersion: z.string().describe(
    "Glue version determines the versions of Apache Spark and Python that AWS Glue supports.",
  ).optional(),
  ExecutionProperty: z.object({
    MaxConcurrentRuns: z.number().describe(
      "The maximum number of concurrent runs allowed for the job.",
    ).optional(),
  }).describe(
    "The maximum number of concurrent runs that are allowed for this job.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the SecurityConfiguration structure to be used with this job.",
  ).optional(),
  NumberOfWorkers: z.number().int().describe(
    "The number of workers of a defined workerType that are allocated when a job runs.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The tags to use with this job.",
  ).optional(),
  MaxCapacity: z.number().describe(
    "The number of AWS Glue data processing units (DPUs) that can be allocated when this job runs.",
  ).optional(),
  NonOverridableArguments: z.record(z.string(), z.unknown()).describe(
    "Non-overridable arguments for this job, specified as name-value pairs.",
  ).optional(),
  MaintenanceWindow: z.string().describe("Property description not available.")
    .optional(),
  JobMode: z.string().describe("Property description not available.")
    .optional(),
  JobRunQueuingEnabled: z.boolean().describe(
    "Property description not available.",
  ).optional(),
});

const StateSchema = z.object({
  Connections: z.object({
    Connections: z.array(z.string()),
  }).optional(),
  MaxRetries: z.number().optional(),
  Description: z.string().optional(),
  Timeout: z.number().optional(),
  AllocatedCapacity: z.number().optional(),
  Name: z.string(),
  Role: z.string().optional(),
  DefaultArguments: z.record(z.string(), z.unknown()).optional(),
  NotificationProperty: z.object({
    NotifyDelayAfter: z.number(),
  }).optional(),
  WorkerType: z.string().optional(),
  ExecutionClass: z.string().optional(),
  LogUri: z.string().optional(),
  Command: z.object({
    Name: z.string(),
    PythonVersion: z.string(),
    Runtime: z.string(),
    ScriptLocation: z.string(),
  }).optional(),
  GlueVersion: z.string().optional(),
  ExecutionProperty: z.object({
    MaxConcurrentRuns: z.number(),
  }).optional(),
  SecurityConfiguration: z.string().optional(),
  NumberOfWorkers: z.number().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  MaxCapacity: z.number().optional(),
  NonOverridableArguments: z.record(z.string(), z.unknown()).optional(),
  MaintenanceWindow: z.string().optional(),
  JobMode: z.string().optional(),
  JobRunQueuingEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Connections: z.object({
    Connections: z.array(z.string()).describe(
      "A list of connections used by the job.",
    ).optional(),
  }).describe("Specifies the connections used by a job").optional(),
  MaxRetries: z.number().describe(
    "The maximum number of times to retry this job after a JobRun fails",
  ).optional(),
  Description: z.string().describe("A description of the job.").optional(),
  Timeout: z.number().int().describe(
    "The maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status.",
  ).optional(),
  AllocatedCapacity: z.number().describe(
    "The number of capacity units that are allocated to this job.",
  ).optional(),
  Name: z.string().describe("The name you assign to the job definition")
    .optional(),
  Role: z.string().describe(
    "The name or Amazon Resource Name (ARN) of the IAM role associated with this job.",
  ).optional(),
  DefaultArguments: z.record(z.string(), z.unknown()).describe(
    "The default arguments for this job, specified as name-value pairs.",
  ).optional(),
  NotificationProperty: z.object({
    NotifyDelayAfter: z.number().int().describe(
      "It is the number of minutes to wait before sending a job run delay notification after a job run starts",
    ).optional(),
  }).describe("Specifies configuration properties of a notification.")
    .optional(),
  WorkerType: z.enum([
    "Standard",
    "G.1X",
    "G.2X",
    "G.025X",
    "G.4X",
    "G.8X",
    "Z.2X",
    "G.12X",
    "G.16X",
    "R.1X",
    "R.2X",
    "R.4X",
    "R.8X",
  ]).describe(
    "TThe type of predefined worker that is allocated when a job runs.",
  ).optional(),
  ExecutionClass: z.string().describe(
    "Indicates whether the job is run with a standard or flexible execution class.",
  ).optional(),
  LogUri: z.string().describe("This field is reserved for future use.")
    .optional(),
  Command: z.object({
    Name: z.string().describe("The name of the job command").optional(),
    PythonVersion: z.string().describe(
      "The Python version being used to execute a Python shell job.",
    ).optional(),
    Runtime: z.string().describe(
      "Runtime is used to specify the versions of Ray, Python and additional libraries available in your environment",
    ).optional(),
    ScriptLocation: z.string().describe(
      "Specifies the Amazon Simple Storage Service (Amazon S3) path to a script that executes a job",
    ).optional(),
  }).describe("The code that executes a job.").optional(),
  GlueVersion: z.string().describe(
    "Glue version determines the versions of Apache Spark and Python that AWS Glue supports.",
  ).optional(),
  ExecutionProperty: z.object({
    MaxConcurrentRuns: z.number().describe(
      "The maximum number of concurrent runs allowed for the job.",
    ).optional(),
  }).describe(
    "The maximum number of concurrent runs that are allowed for this job.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the SecurityConfiguration structure to be used with this job.",
  ).optional(),
  NumberOfWorkers: z.number().int().describe(
    "The number of workers of a defined workerType that are allocated when a job runs.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The tags to use with this job.",
  ).optional(),
  MaxCapacity: z.number().describe(
    "The number of AWS Glue data processing units (DPUs) that can be allocated when this job runs.",
  ).optional(),
  NonOverridableArguments: z.record(z.string(), z.unknown()).describe(
    "Non-overridable arguments for this job, specified as name-value pairs.",
  ).optional(),
  MaintenanceWindow: z.string().describe("Property description not available.")
    .optional(),
  JobMode: z.string().describe("Property description not available.")
    .optional(),
  JobRunQueuingEnabled: z.boolean().describe(
    "Property description not available.",
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

/** Swamp extension model for Glue Job. Registered at `@swamp/aws/glue/job`. */
export const model = {
  type: "@swamp/aws/glue/job",
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
      toVersion: "2026.05.27.1",
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
      description: "Glue Job resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Job",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Glue::Job",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Glue Job",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Job",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Job",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Glue Job",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::Job",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::Job",
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
      description: "Delete a Glue Job",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Job",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Job",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync Glue Job state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::Job",
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
