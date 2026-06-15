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

// Auto-generated extension model for @swamp/aws/codepipeline/custom-action-type
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CodePipeline CustomActionType (AWS::CodePipeline::CustomActionType).
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

const ConfigurationPropertiesSchema = z.object({
  Description: z.string().describe(
    "The description of the action configuration property that is displayed to users.",
  ).optional(),
  Key: z.boolean().describe("Whether the configuration property is a key."),
  Name: z.string().describe("The name of the action configuration property."),
  Queryable: z.boolean().describe(
    "Indicates that the property is used with PollForJobs. When creating a custom action, an action can have up to one queryable property. If it has one, that property must be both required and not secret.If you create a pipeline with a custom action type, and that custom action contains a queryable property, the value for that configuration property is subject to other restrictions. The value must be less than or equal to twenty (20) characters. The value can contain only alphanumeric characters, underscores, and hyphens.",
  ).optional(),
  Required: z.boolean().describe(
    "Whether the configuration property is a required value.",
  ),
  Secret: z.boolean().describe(
    "Whether the configuration property is secret. Secrets are hidden from all calls except for GetJobDetails, GetThirdPartyJobDetails, PollForJobs, and PollForThirdPartyJobs.",
  ),
  Type: z.string().describe("The type of the configuration property.")
    .optional(),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
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
  Category: z.string().describe(
    "The category of the custom action, such as a build action or a test action.",
  ),
  ConfigurationProperties: z.array(ConfigurationPropertiesSchema).describe(
    "The configuration properties for the custom action.",
  ).optional(),
  InputArtifactDetails: z.object({
    MaximumCount: z.number().int().describe(
      "The maximum number of artifacts allowed for the action type.",
    ),
    MinimumCount: z.number().int().describe(
      "The minimum number of artifacts allowed for the action type.",
    ),
  }).describe(
    "The details of the input artifact for the action, such as its commit ID.",
  ),
  OutputArtifactDetails: z.object({
    MaximumCount: z.number().int().describe(
      "The maximum number of artifacts allowed for the action type.",
    ),
    MinimumCount: z.number().int().describe(
      "The minimum number of artifacts allowed for the action type.",
    ),
  }).describe(
    "The details of the output artifact of the action, such as its commit ID.",
  ),
  Provider: z.string().describe(
    "The provider of the service used in the custom action, such as AWS CodeDeploy.",
  ),
  Settings: z.object({
    EntityUrlTemplate: z.string().describe(
      "The URL returned to the AWS CodePipeline console that provides a deep link to the resources of the external system, such as the configuration page for an AWS CodeDeploy deployment group. This link is provided as part of the action display in the pipeline.",
    ).optional(),
    ExecutionUrlTemplate: z.string().describe(
      "The URL returned to the AWS CodePipeline console that contains a link to the top-level landing page for the external system, such as the console page for AWS CodeDeploy. This link is shown on the pipeline view page in the AWS CodePipeline console and provides a link to the execution entity of the external action.",
    ).optional(),
    RevisionUrlTemplate: z.string().describe(
      "The URL returned to the AWS CodePipeline console that contains a link to the page where customers can update or change the configuration of the external action.",
    ).optional(),
    ThirdPartyConfigurationUrl: z.string().describe(
      "The URL of a sign-up page where users can sign up for an external service and perform initial configuration of the action provided by that service.",
    ).optional(),
  }).describe("URLs that provide users information about this custom action.")
    .optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the custom action.")
    .optional(),
  Version: z.string().describe("The version identifier of the custom action."),
});

const StateSchema = z.object({
  Category: z.string(),
  ConfigurationProperties: z.array(ConfigurationPropertiesSchema).optional(),
  InputArtifactDetails: z.object({
    MaximumCount: z.number(),
    MinimumCount: z.number(),
  }).optional(),
  OutputArtifactDetails: z.object({
    MaximumCount: z.number(),
    MinimumCount: z.number(),
  }).optional(),
  Provider: z.string(),
  Settings: z.object({
    EntityUrlTemplate: z.string(),
    ExecutionUrlTemplate: z.string(),
    RevisionUrlTemplate: z.string(),
    ThirdPartyConfigurationUrl: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Version: z.string(),
  Id: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Category: z.string().describe(
    "The category of the custom action, such as a build action or a test action.",
  ).optional(),
  ConfigurationProperties: z.array(ConfigurationPropertiesSchema).describe(
    "The configuration properties for the custom action.",
  ).optional(),
  InputArtifactDetails: z.object({
    MaximumCount: z.number().int().describe(
      "The maximum number of artifacts allowed for the action type.",
    ).optional(),
    MinimumCount: z.number().int().describe(
      "The minimum number of artifacts allowed for the action type.",
    ).optional(),
  }).describe(
    "The details of the input artifact for the action, such as its commit ID.",
  ).optional(),
  OutputArtifactDetails: z.object({
    MaximumCount: z.number().int().describe(
      "The maximum number of artifacts allowed for the action type.",
    ).optional(),
    MinimumCount: z.number().int().describe(
      "The minimum number of artifacts allowed for the action type.",
    ).optional(),
  }).describe(
    "The details of the output artifact of the action, such as its commit ID.",
  ).optional(),
  Provider: z.string().describe(
    "The provider of the service used in the custom action, such as AWS CodeDeploy.",
  ).optional(),
  Settings: z.object({
    EntityUrlTemplate: z.string().describe(
      "The URL returned to the AWS CodePipeline console that provides a deep link to the resources of the external system, such as the configuration page for an AWS CodeDeploy deployment group. This link is provided as part of the action display in the pipeline.",
    ).optional(),
    ExecutionUrlTemplate: z.string().describe(
      "The URL returned to the AWS CodePipeline console that contains a link to the top-level landing page for the external system, such as the console page for AWS CodeDeploy. This link is shown on the pipeline view page in the AWS CodePipeline console and provides a link to the execution entity of the external action.",
    ).optional(),
    RevisionUrlTemplate: z.string().describe(
      "The URL returned to the AWS CodePipeline console that contains a link to the page where customers can update or change the configuration of the external action.",
    ).optional(),
    ThirdPartyConfigurationUrl: z.string().describe(
      "The URL of a sign-up page where users can sign up for an external service and perform initial configuration of the action provided by that service.",
    ).optional(),
  }).describe("URLs that provide users information about this custom action.")
    .optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the custom action.")
    .optional(),
  Version: z.string().describe("The version identifier of the custom action.")
    .optional(),
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

/** Swamp extension model for CodePipeline CustomActionType. Registered at `@swamp/aws/codepipeline/custom-action-type`. */
export const model = {
  type: "@swamp/aws/codepipeline/custom-action-type",
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
      description: "CodePipeline CustomActionType resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodePipeline CustomActionType",
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
          "AWS::CodePipeline::CustomActionType",
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
      description: "Get a CodePipeline CustomActionType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline CustomActionType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CodePipeline::CustomActionType",
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
      description: "Update a CodePipeline CustomActionType",
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
          existing.Category?.toString(),
          existing.Provider?.toString(),
          existing.Version?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CodePipeline::CustomActionType",
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
          "AWS::CodePipeline::CustomActionType",
          identifier,
          currentState,
          desiredState,
          [
            "Category",
            "ConfigurationProperties",
            "InputArtifactDetails",
            "OutputArtifactDetails",
            "Provider",
            "Settings",
            "Version",
          ],
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
      description: "Delete a CodePipeline CustomActionType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline CustomActionType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CodePipeline::CustomActionType",
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
      description: "Sync CodePipeline CustomActionType state from AWS",
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
          existing.Category?.toString(),
          existing.Provider?.toString(),
          existing.Version?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CodePipeline::CustomActionType",
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
