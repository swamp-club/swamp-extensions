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

// Auto-generated extension model for @swamp/aws/imagebuilder/lifecycle-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ImageBuilder LifecyclePolicy (AWS::ImageBuilder::LifecyclePolicy).
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

const IncludeResourcesSchema = z.object({
  Amis: z.boolean().describe("Use to configure lifecycle actions on AMIs.")
    .optional(),
  Containers: z.boolean().describe(
    "Use to configure lifecycle actions on containers.",
  ).optional(),
  Snapshots: z.boolean().describe(
    "Use to configure lifecycle actions on snapshots.",
  ).optional(),
});

const ActionSchema = z.object({
  Type: z.enum(["DELETE", "DEPRECATE", "DISABLE"]).describe(
    "The action type of the policy detail.",
  ),
  IncludeResources: IncludeResourcesSchema.describe(
    "The included resources of the policy detail.",
  ).optional(),
});

const FilterSchema = z.object({
  Type: z.enum(["AGE", "COUNT"]).describe("The filter type."),
  Value: z.number().int().describe("The filter value."),
  Unit: z.enum(["DAYS", "WEEKS", "MONTHS", "YEARS"]).describe(
    "The value's time unit.",
  ).optional(),
  RetainAtLeast: z.number().int().describe(
    "The minimum number of Image Builder resources to retain.",
  ).optional(),
});

const LastLaunchedSchema = z.object({
  Value: z.number().int().describe("The last launched value."),
  Unit: z.enum(["DAYS", "WEEKS", "MONTHS", "YEARS"]).describe(
    "The value's time unit.",
  ),
});

const AmiExclusionRulesSchema = z.object({
  IsPublic: z.boolean().describe(
    "Use to apply lifecycle policy actions on whether the AMI is public.",
  ).optional(),
  Regions: z.array(z.string()).describe(
    "Use to apply lifecycle policy actions on AMIs distributed to a set of regions.",
  ).optional(),
  SharedAccounts: z.array(z.string()).describe(
    "Use to apply lifecycle policy actions on AMIs shared with a set of regions.",
  ).optional(),
  LastLaunched: LastLaunchedSchema.describe(
    "Use to apply lifecycle policy actions on AMIs launched before a certain time.",
  ).optional(),
  TagMap: z.record(z.string(), z.string()).describe(
    "The AMIs to select by tag.",
  ).optional(),
});

const ExclusionRulesSchema = z.object({
  TagMap: z.record(z.string(), z.string()).describe(
    "The Image Builder tags to filter on.",
  ).optional(),
  Amis: AmiExclusionRulesSchema.describe(
    "The AMI exclusion rules for the policy detail.",
  ).optional(),
});

const PolicyDetailSchema = z.object({
  Action: ActionSchema.describe("The action of the policy detail."),
  Filter: FilterSchema.describe("The filters to apply of the policy detail."),
  ExclusionRules: ExclusionRulesSchema.describe(
    "The exclusion rules to apply of the policy detail.",
  ).optional(),
});

const RecipeSelectionSchema = z.object({
  Name: z.string().describe("The recipe name."),
  SemanticVersion: z.string().describe("The recipe version."),
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
  Name: z.string().describe("The name of the lifecycle policy."),
  Description: z.string().describe("The description of the lifecycle policy.")
    .optional(),
  Status: z.enum(["DISABLED", "ENABLED"]).describe(
    "The status of the lifecycle policy.",
  ).optional(),
  ExecutionRole: z.string().describe(
    "The execution role of the lifecycle policy.",
  ),
  ResourceType: z.enum(["AMI_IMAGE", "CONTAINER_IMAGE"]).describe(
    "The resource type of the lifecycle policy.",
  ),
  PolicyDetails: z.array(PolicyDetailSchema).describe(
    "The policy details of the lifecycle policy.",
  ),
  ResourceSelection: z.object({
    Recipes: z.array(RecipeSelectionSchema).describe("The recipes to select.")
      .optional(),
    TagMap: z.record(z.string(), z.string()).describe(
      "The Image Builder resources to select by tag.",
    ).optional(),
  }).describe("The resource selection of the lifecycle policy."),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the lifecycle policy.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Status: z.string().optional(),
  ExecutionRole: z.string().optional(),
  ResourceType: z.string().optional(),
  PolicyDetails: z.array(PolicyDetailSchema).optional(),
  ResourceSelection: z.object({
    Recipes: z.array(RecipeSelectionSchema),
    TagMap: z.record(z.string(), z.unknown()),
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
  Name: z.string().describe("The name of the lifecycle policy.").optional(),
  Description: z.string().describe("The description of the lifecycle policy.")
    .optional(),
  Status: z.enum(["DISABLED", "ENABLED"]).describe(
    "The status of the lifecycle policy.",
  ).optional(),
  ExecutionRole: z.string().describe(
    "The execution role of the lifecycle policy.",
  ).optional(),
  ResourceType: z.enum(["AMI_IMAGE", "CONTAINER_IMAGE"]).describe(
    "The resource type of the lifecycle policy.",
  ).optional(),
  PolicyDetails: z.array(PolicyDetailSchema).describe(
    "The policy details of the lifecycle policy.",
  ).optional(),
  ResourceSelection: z.object({
    Recipes: z.array(RecipeSelectionSchema).describe("The recipes to select.")
      .optional(),
    TagMap: z.record(z.string(), z.string()).describe(
      "The Image Builder resources to select by tag.",
    ).optional(),
  }).describe("The resource selection of the lifecycle policy.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the lifecycle policy.",
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

/** Swamp extension model for ImageBuilder LifecyclePolicy. Registered at `@swamp/aws/imagebuilder/lifecycle-policy`. */
export const model = {
  type: "@swamp/aws/imagebuilder/lifecycle-policy",
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
      description: "ImageBuilder LifecyclePolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ImageBuilder LifecyclePolicy",
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
          "AWS::ImageBuilder::LifecyclePolicy",
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
      description: "Get a ImageBuilder LifecyclePolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder LifecyclePolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ImageBuilder::LifecyclePolicy",
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
      description: "Update a ImageBuilder LifecyclePolicy",
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
          "AWS::ImageBuilder::LifecyclePolicy",
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
          "AWS::ImageBuilder::LifecyclePolicy",
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
      description: "Delete a ImageBuilder LifecyclePolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder LifecyclePolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ImageBuilder::LifecyclePolicy",
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
      description: "Sync ImageBuilder LifecyclePolicy state from AWS",
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
            "AWS::ImageBuilder::LifecyclePolicy",
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
