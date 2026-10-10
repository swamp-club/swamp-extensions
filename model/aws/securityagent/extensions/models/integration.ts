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

// Auto-generated extension model for @swamp/aws/securityagent/integration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecurityAgent Integration (AWS::SecurityAgent::Integration).
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

const GitHubInputSchema = z.object({
  Code: z.string().describe(
    "The OAuth authorization code received from GitHub.",
  ),
  State: z.string().describe(
    "The CSRF state token for validating the OAuth flow.",
  ),
  OrganizationName: z.string().describe(
    "The name of the GitHub organization to integrate with.",
  ).optional(),
});

const GitLabInputSchema = z.object({
  AccessToken: z.string().describe(
    "The GitLab access token used to authenticate. This can be a personal access token or a group access token.",
  ),
  TokenType: z.enum(["PERSONAL", "GROUP"]).describe(
    "The type of GitLab access token.",
  ),
  GroupId: z.string().describe(
    "The identifier of the GitLab group. Required when TokenType is GROUP and ignored for personal tokens.",
  ).optional(),
});

const BitbucketInputSchema = z.object({
  Workspace: z.string().describe(
    "The Bitbucket workspace slug that identifies the workspace to integrate.",
  ),
  Code: z.string().describe(
    "The OAuth 2.0 authorization code returned from the consent redirect.",
  ),
  State: z.string().describe(
    "The CSRF state token echoed back from the OAuth redirect.",
  ),
});

const ConfluenceInputSchema = z.object({
  Code: z.string().describe(
    "The OAuth 2.0 authorization code returned from the consent redirect.",
  ),
  State: z.string().describe(
    "The CSRF state token echoed back from the OAuth redirect.",
  ),
  SiteUrl: z.string().describe(
    "The Confluence Cloud site URL, for example https://mysite.atlassian.net.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  Provider: z.enum(["GITHUB", "GITLAB", "BITBUCKET", "CONFLUENCE"]).describe(
    "The integration provider.",
  ),
  ProviderInput: z.object({
    Github: GitHubInputSchema.describe(
      "The input required to create a GitHub integration.",
    ).optional(),
    Gitlab: GitLabInputSchema.describe(
      "The input required to create a GitLab integration.",
    ).optional(),
    Bitbucket: BitbucketInputSchema.describe(
      "The input required to create a Bitbucket integration.",
    ).optional(),
    Confluence: ConfluenceInputSchema.describe(
      "The input required to create a Confluence integration.",
    ).optional(),
  }).describe(
    "The provider-specific input required to create the integration. Exactly one of the provider input objects must be specified.",
  ).optional(),
  DisplayName: z.string().describe("The display name for the integration."),
  KmsKeyId: z.string().describe(
    "The identifier of the AWS KMS key to use for encrypting data associated with the integration. Can be a key ID, key ARN, alias name, or alias ARN.",
  ).optional(),
  PrivateConnectionName: z.string().describe(
    "The name of an active private connection used to reach a self-hosted provider instance over private networking.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to associate with the integration.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  IntegrationId: z.string().optional(),
  Provider: z.string().optional(),
  ProviderType: z.string().optional(),
  ProviderInput: z.object({
    Github: GitHubInputSchema,
    Gitlab: GitLabInputSchema,
    Bitbucket: BitbucketInputSchema,
    Confluence: ConfluenceInputSchema,
  }).optional(),
  DisplayName: z.string().optional(),
  KmsKeyId: z.string().optional(),
  InstallationId: z.string().optional(),
  TargetUrl: z.string().optional(),
  PrivateConnectionName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Provider: z.enum(["GITHUB", "GITLAB", "BITBUCKET", "CONFLUENCE"]).describe(
    "The integration provider.",
  ).optional(),
  ProviderInput: z.object({
    Github: GitHubInputSchema.describe(
      "The input required to create a GitHub integration.",
    ).optional(),
    Gitlab: GitLabInputSchema.describe(
      "The input required to create a GitLab integration.",
    ).optional(),
    Bitbucket: BitbucketInputSchema.describe(
      "The input required to create a Bitbucket integration.",
    ).optional(),
    Confluence: ConfluenceInputSchema.describe(
      "The input required to create a Confluence integration.",
    ).optional(),
  }).describe(
    "The provider-specific input required to create the integration. Exactly one of the provider input objects must be specified.",
  ).optional(),
  DisplayName: z.string().describe("The display name for the integration.")
    .optional(),
  KmsKeyId: z.string().describe(
    "The identifier of the AWS KMS key to use for encrypting data associated with the integration. Can be a key ID, key ARN, alias name, or alias ARN.",
  ).optional(),
  PrivateConnectionName: z.string().describe(
    "The name of an active private connection used to reach a self-hosted provider instance over private networking.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to associate with the integration.",
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

/** Swamp extension model for SecurityAgent Integration. Registered at `@swamp/aws/securityagent/integration`. */
export const model = {
  type: "@swamp/aws/securityagent/integration",
  version: "2026.10.09.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SecurityAgent Integration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityAgent Integration",
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
          "AWS::SecurityAgent::Integration",
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
      description: "Get a SecurityAgent Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityAgent Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SecurityAgent::Integration",
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
      description: "Update a SecurityAgent Integration",
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
          "AWS::SecurityAgent::Integration",
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
          "AWS::SecurityAgent::Integration",
          identifier,
          currentState,
          desiredState,
          [
            "Provider",
            "DisplayName",
            "KmsKeyId",
            "PrivateConnectionName",
            "ProviderInput",
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
      description: "Delete a SecurityAgent Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityAgent Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SecurityAgent::Integration",
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
      description: "Sync SecurityAgent Integration state from AWS",
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
            "AWS::SecurityAgent::Integration",
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
      description: "List SecurityAgent Integration resources",
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
          "AWS::SecurityAgent::Integration",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
