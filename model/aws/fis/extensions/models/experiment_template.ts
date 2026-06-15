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

// Auto-generated extension model for @swamp/aws/fis/experiment-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for FIS ExperimentTemplate (AWS::FIS::ExperimentTemplate).
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

const ExperimentTemplateTargetFilterSchema = z.object({
  Path: z.string().max(256).describe("The attribute path for the filter."),
  Values: z.array(z.string().max(128)).describe(
    "The attribute values for the filter.",
  ),
});

const ExperimentTemplateTargetSchema = z.object({
  ResourceType: z.string().max(64).describe(
    "The AWS resource type. The resource type must be supported for the specified action.",
  ),
  ResourceArns: z.array(z.string().min(20).max(2048)).describe(
    "The Amazon Resource Names (ARNs) of the target resources.",
  ).optional(),
  ResourceTags: z.record(z.string(), z.string().max(256)).optional(),
  Parameters: z.record(z.string(), z.string().max(1024)).optional(),
  Filters: z.array(ExperimentTemplateTargetFilterSchema).optional(),
  SelectionMode: z.string().max(64).describe(
    "Scopes the identified resources to a specific number of the resources at random, or a percentage of the resources.",
  ),
});

const ExperimentTemplateActionSchema = z.object({
  ActionId: z.string().max(64).describe("The ID of the action."),
  Description: z.string().max(512).describe("A description for the action.")
    .optional(),
  Parameters: z.record(z.string(), z.string().max(1024)).describe(
    "The parameters for the action, if applicable.",
  ).optional(),
  Targets: z.record(z.string(), z.string().max(64)).describe(
    "One or more targets for the action.",
  ).optional(),
  StartAfter: z.array(z.string().max(64)).describe(
    "The names of the actions that must be completed before the current action starts.",
  ).optional(),
});

const ExperimentTemplateStopConditionSchema = z.object({
  Source: z.string().max(64),
  Value: z.string().min(20).max(2048).optional(),
});

const CloudWatchDashboardSchema = z.object({
  DashboardIdentifier: z.string().min(1).max(512),
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
  Description: z.string().max(512).describe(
    "A description for the experiment template.",
  ),
  Targets: z.record(z.string(), ExperimentTemplateTargetSchema).describe(
    "The targets for the experiment.",
  ),
  Actions: z.record(z.string(), ExperimentTemplateActionSchema).describe(
    "The actions for the experiment.",
  ).optional(),
  StopConditions: z.array(ExperimentTemplateStopConditionSchema).describe(
    "One or more stop conditions.",
  ),
  LogConfiguration: z.object({
    CloudWatchLogsConfiguration: z.object({
      LogGroupArn: z.string().min(20).max(2048),
    }).optional(),
    S3Configuration: z.object({
      BucketName: z.string().min(3).max(63),
      Prefix: z.string().min(1).max(700).optional(),
    }).optional(),
    LogSchemaVersion: z.number().int().min(1),
  }).optional(),
  RoleArn: z.string().max(1224).describe(
    "The Amazon Resource Name (ARN) of an IAM role that grants the AWS FIS service permission to perform service actions on your behalf.",
  ),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
  ExperimentOptions: z.object({
    AccountTargeting: z.enum(["multi-account", "single-account"]).describe(
      "The account targeting setting for the experiment template.",
    ).optional(),
    EmptyTargetResolutionMode: z.enum(["fail", "skip"]).describe(
      "The target resolution failure mode for the experiment template.",
    ).optional(),
  }).optional(),
  ExperimentReportConfiguration: z.object({
    Outputs: z.object({
      ExperimentReportS3Configuration: z.object({
        BucketName: z.string().min(3).max(63),
        Prefix: z.string().min(1).max(256).optional(),
      }),
    }),
    DataSources: z.object({
      CloudWatchDashboards: z.array(CloudWatchDashboardSchema).optional(),
    }).optional(),
    PreExperimentDuration: z.string().optional(),
    PostExperimentDuration: z.string().optional(),
  }).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Description: z.string().optional(),
  Targets: z.record(z.string(), z.unknown()).optional(),
  Actions: z.record(z.string(), z.unknown()).optional(),
  StopConditions: z.array(ExperimentTemplateStopConditionSchema).optional(),
  LogConfiguration: z.object({
    CloudWatchLogsConfiguration: z.object({
      LogGroupArn: z.string(),
    }),
    S3Configuration: z.object({
      BucketName: z.string(),
      Prefix: z.string(),
    }),
    LogSchemaVersion: z.number(),
  }).optional(),
  RoleArn: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  ExperimentOptions: z.object({
    AccountTargeting: z.string(),
    EmptyTargetResolutionMode: z.string(),
  }).optional(),
  ExperimentReportConfiguration: z.object({
    Outputs: z.object({
      ExperimentReportS3Configuration: z.object({
        BucketName: z.string(),
        Prefix: z.string(),
      }),
    }),
    DataSources: z.object({
      CloudWatchDashboards: z.array(CloudWatchDashboardSchema),
    }),
    PreExperimentDuration: z.string(),
    PostExperimentDuration: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(512).describe(
    "A description for the experiment template.",
  ).optional(),
  Targets: z.record(z.string(), ExperimentTemplateTargetSchema).describe(
    "The targets for the experiment.",
  ).optional(),
  Actions: z.record(z.string(), ExperimentTemplateActionSchema).describe(
    "The actions for the experiment.",
  ).optional(),
  StopConditions: z.array(ExperimentTemplateStopConditionSchema).describe(
    "One or more stop conditions.",
  ).optional(),
  LogConfiguration: z.object({
    CloudWatchLogsConfiguration: z.object({
      LogGroupArn: z.string().min(20).max(2048).optional(),
    }).optional(),
    S3Configuration: z.object({
      BucketName: z.string().min(3).max(63).optional(),
      Prefix: z.string().min(1).max(700).optional(),
    }).optional(),
    LogSchemaVersion: z.number().int().min(1).optional(),
  }).optional(),
  RoleArn: z.string().max(1224).describe(
    "The Amazon Resource Name (ARN) of an IAM role that grants the AWS FIS service permission to perform service actions on your behalf.",
  ).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
  ExperimentOptions: z.object({
    AccountTargeting: z.enum(["multi-account", "single-account"]).describe(
      "The account targeting setting for the experiment template.",
    ).optional(),
    EmptyTargetResolutionMode: z.enum(["fail", "skip"]).describe(
      "The target resolution failure mode for the experiment template.",
    ).optional(),
  }).optional(),
  ExperimentReportConfiguration: z.object({
    Outputs: z.object({
      ExperimentReportS3Configuration: z.object({
        BucketName: z.string().min(3).max(63).optional(),
        Prefix: z.string().min(1).max(256).optional(),
      }).optional(),
    }).optional(),
    DataSources: z.object({
      CloudWatchDashboards: z.array(CloudWatchDashboardSchema).optional(),
    }).optional(),
    PreExperimentDuration: z.string().optional(),
    PostExperimentDuration: z.string().optional(),
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

/** Swamp extension model for FIS ExperimentTemplate. Registered at `@swamp/aws/fis/experiment-template`. */
export const model = {
  type: "@swamp/aws/fis/experiment-template",
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
      description: "FIS ExperimentTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FIS ExperimentTemplate",
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
          "AWS::FIS::ExperimentTemplate",
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
      description: "Get a FIS ExperimentTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FIS ExperimentTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::FIS::ExperimentTemplate",
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
      description: "Update a FIS ExperimentTemplate",
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
          "AWS::FIS::ExperimentTemplate",
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
          "AWS::FIS::ExperimentTemplate",
          identifier,
          currentState,
          desiredState,
          ["AccountTargeting"],
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
      description: "Delete a FIS ExperimentTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FIS ExperimentTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::FIS::ExperimentTemplate",
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
      description: "Sync FIS ExperimentTemplate state from AWS",
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
            "AWS::FIS::ExperimentTemplate",
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
