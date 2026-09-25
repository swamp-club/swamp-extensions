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

// Auto-generated extension model for @swamp/aws/sagemaker/workteam
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Workteam (AWS::SageMaker::Workteam).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const CognitoMemberDefinitionSchema = z.object({
  CognitoUserGroup: z.string().min(1).max(128).describe(
    "An identifier for a user group.",
  ),
  CognitoUserPool: z.string().min(1).max(55).describe(
    "An identifier for a user pool. The user pool must be in the same region as the service that you are calling.",
  ),
  CognitoClientId: z.string().min(1).max(128).describe(
    "An identifier for an application client. You must create the app client ID using Amazon Cognito.",
  ),
});

const OidcMemberDefinitionSchema = z.object({
  OidcGroups: z.array(z.string().min(1).max(63)).describe(
    "A list of OIDC group names whose members will be part of this workteam",
  ),
});

const MemberDefinitionSchema = z.object({
  CognitoMemberDefinition: CognitoMemberDefinitionSchema.describe(
    "The Amazon Cognito user group that is part of the work team",
  ).optional(),
  OidcMemberDefinition: OidcMemberDefinitionSchema.describe(
    "A list user groups that exist in your OIDC Identity Provider (IdP).",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe("The key of the tag."),
  Value: z.string().describe("The value of the tag."),
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
  Description: z.string().min(1).max(200).describe(
    "A description of the work team.",
  ),
  WorkforceName: z.string().min(1).max(63).describe("The name of the Workforce")
    .optional(),
  WorkteamName: z.string().min(1).max(63).describe("The name of the work team.")
    .optional(),
  NotificationConfiguration: z.object({
    NotificationTopicArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the Amazon SNS topic to which notifications should be published.",
    ),
  }).describe(
    "Configures SNS notifications of available or expiring work items for work teams.",
  ).optional(),
  MemberDefinitions: z.array(MemberDefinitionSchema).describe(
    "A list of MemberDefinition objects that contains objects that identify the workers that make up the work team.",
  ),
  Tags: z.array(TagSchema).describe("An array of key-value pairs.").optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  WorkforceName: z.string().optional(),
  WorkteamName: z.string().optional(),
  WorkteamArn: z.string(),
  NotificationConfiguration: z.object({
    NotificationTopicArn: z.string(),
  }).optional(),
  MemberDefinitions: z.array(MemberDefinitionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(1).max(200).describe(
    "A description of the work team.",
  ).optional(),
  WorkforceName: z.string().min(1).max(63).describe("The name of the Workforce")
    .optional(),
  WorkteamName: z.string().min(1).max(63).describe("The name of the work team.")
    .optional(),
  NotificationConfiguration: z.object({
    NotificationTopicArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the Amazon SNS topic to which notifications should be published.",
    ).optional(),
  }).describe(
    "Configures SNS notifications of available or expiring work items for work teams.",
  ).optional(),
  MemberDefinitions: z.array(MemberDefinitionSchema).describe(
    "A list of MemberDefinition objects that contains objects that identify the workers that make up the work team.",
  ).optional(),
  Tags: z.array(TagSchema).describe("An array of key-value pairs.").optional(),
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

/** Swamp extension model for SageMaker Workteam. Registered at `@swamp/aws/sagemaker/workteam`. */
export const model = {
  type: "@swamp/aws/sagemaker/workteam",
  version: "2026.09.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker Workteam resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Workteam",
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
          "AWS::SageMaker::Workteam",
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
      description: "Get a SageMaker Workteam",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Workteam",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Workteam",
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
      description: "Update a SageMaker Workteam",
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
        const identifier = existing.WorkteamArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Workteam",
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
          "AWS::SageMaker::Workteam",
          identifier,
          currentState,
          desiredState,
          ["WorkteamName", "WorkforceName"],
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
      description: "Delete a SageMaker Workteam",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Workteam",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Workteam",
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
      description: "Sync SageMaker Workteam state from AWS",
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
        const identifier = existing.WorkteamArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Workteam",
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
    list: {
      description: "List SageMaker Workteam resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::SageMaker::Workteam",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.WorkteamArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
