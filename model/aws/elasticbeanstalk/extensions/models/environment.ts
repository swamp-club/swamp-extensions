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

// Auto-generated extension model for @swamp/aws/elasticbeanstalk/environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticBeanstalk Environment (AWS::ElasticBeanstalk::Environment).
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

const OptionSettingSchema = z.object({
  ResourceName: z.string().describe(
    "A unique resource name for the option setting. Use it for a time–based scaling configuration option.",
  ).optional(),
  Value: z.string().describe("The current value for the configuration option.")
    .optional(),
  Namespace: z.string().describe(
    "A unique namespace that identifies the option's associated AWS resource.",
  ),
  OptionName: z.string().describe("The name of the configuration option."),
});

const TagSchema = z.object({
  Value: z.string().describe("The value for the tag."),
  Key: z.string().describe("The key name of the tag."),
});

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
  PlatformArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the custom platform to use with the environment.",
  ).optional(),
  ApplicationName: z.string().describe(
    "The name of the application that is associated with this environment.",
  ),
  Description: z.string().describe("Your description for this environment.")
    .optional(),
  EnvironmentName: z.string().describe("A unique name for the environment.")
    .optional(),
  OperationsRole: z.string().describe(
    "The Amazon Resource Name (ARN) of an existing IAM role to be used as the environment's operations role.",
  ).optional(),
  Tier: z.object({
    Type: z.string().describe("The type of this environment tier.").optional(),
    Version: z.string().describe(
      "The version of this environment tier. When you don't set a value to it, Elastic Beanstalk uses the latest compatible worker tier version.",
    ).optional(),
    Name: z.string().describe("The name of this environment tier.").optional(),
  }).describe(
    "Specifies the tier to use in creating this environment. The environment tier that you choose determines whether Elastic Beanstalk provisions resources to support a web application that handles HTTP(S) requests or a web application that handles background-processing tasks.",
  ).optional(),
  VersionLabel: z.string().describe(
    "The name of the application version to deploy.",
  ).optional(),
  OptionSettings: z.array(OptionSettingSchema).describe(
    "Key-value pairs defining configuration options for this environment, such as the instance type.",
  ).optional(),
  TemplateName: z.string().describe(
    "The name of the Elastic Beanstalk configuration template to use with the environment.",
  ).optional(),
  SolutionStackName: z.string().describe(
    "The name of an Elastic Beanstalk solution stack (platform version) to use with the environment.",
  ).optional(),
  CNAMEPrefix: z.string().describe(
    "If specified, the environment attempts to use this value as the prefix for the CNAME in your Elastic Beanstalk environment URL. If not specified, the CNAME is generated automatically by appending a random alphanumeric string to the environment name.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Specifies the tags applied to resources in the environment.",
  ).optional(),
});

const StateSchema = z.object({
  PlatformArn: z.string().optional(),
  ApplicationName: z.string().optional(),
  Description: z.string().optional(),
  EnvironmentName: z.string(),
  OperationsRole: z.string().optional(),
  Tier: z.object({
    Type: z.string(),
    Version: z.string(),
    Name: z.string(),
  }).optional(),
  VersionLabel: z.string().optional(),
  EndpointURL: z.string().optional(),
  OptionSettings: z.array(OptionSettingSchema).optional(),
  TemplateName: z.string().optional(),
  SolutionStackName: z.string().optional(),
  CNAMEPrefix: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  PlatformArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the custom platform to use with the environment.",
  ).optional(),
  ApplicationName: z.string().describe(
    "The name of the application that is associated with this environment.",
  ).optional(),
  Description: z.string().describe("Your description for this environment.")
    .optional(),
  EnvironmentName: z.string().describe("A unique name for the environment.")
    .optional(),
  OperationsRole: z.string().describe(
    "The Amazon Resource Name (ARN) of an existing IAM role to be used as the environment's operations role.",
  ).optional(),
  Tier: z.object({
    Type: z.string().describe("The type of this environment tier.").optional(),
    Version: z.string().describe(
      "The version of this environment tier. When you don't set a value to it, Elastic Beanstalk uses the latest compatible worker tier version.",
    ).optional(),
    Name: z.string().describe("The name of this environment tier.").optional(),
  }).describe(
    "Specifies the tier to use in creating this environment. The environment tier that you choose determines whether Elastic Beanstalk provisions resources to support a web application that handles HTTP(S) requests or a web application that handles background-processing tasks.",
  ).optional(),
  VersionLabel: z.string().describe(
    "The name of the application version to deploy.",
  ).optional(),
  OptionSettings: z.array(OptionSettingSchema).describe(
    "Key-value pairs defining configuration options for this environment, such as the instance type.",
  ).optional(),
  TemplateName: z.string().describe(
    "The name of the Elastic Beanstalk configuration template to use with the environment.",
  ).optional(),
  SolutionStackName: z.string().describe(
    "The name of an Elastic Beanstalk solution stack (platform version) to use with the environment.",
  ).optional(),
  CNAMEPrefix: z.string().describe(
    "If specified, the environment attempts to use this value as the prefix for the CNAME in your Elastic Beanstalk environment URL. If not specified, the CNAME is generated automatically by appending a random alphanumeric string to the environment name.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Specifies the tags applied to resources in the environment.",
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

/** Swamp extension model for ElasticBeanstalk Environment. Registered at `@swamp/aws/elasticbeanstalk/environment`. */
export const model = {
  type: "@swamp/aws/elasticbeanstalk/environment",
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
      description: "ElasticBeanstalk Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticBeanstalk Environment",
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
          "AWS::ElasticBeanstalk::Environment",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EnvironmentName ?? g.EnvironmentName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ElasticBeanstalk Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticBeanstalk Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticBeanstalk::Environment",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EnvironmentName ?? context.globalArgs.EnvironmentName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ElasticBeanstalk Environment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EnvironmentName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.EnvironmentName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticBeanstalk::Environment",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElasticBeanstalk::Environment",
          identifier,
          currentState,
          desiredState,
          [
            "CNAMEPrefix",
            "EnvironmentName",
            "ApplicationName",
            "SolutionStackName",
            "Name",
            "Type",
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
      description: "Delete a ElasticBeanstalk Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticBeanstalk Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticBeanstalk::Environment",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.EnvironmentName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync ElasticBeanstalk Environment state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EnvironmentName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.EnvironmentName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticBeanstalk::Environment",
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
