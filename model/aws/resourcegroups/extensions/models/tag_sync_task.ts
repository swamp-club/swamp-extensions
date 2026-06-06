// Auto-generated extension model for @swamp/aws/resourcegroups/tag-sync-task
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ResourceGroups TagSyncTask (AWS::ResourceGroups::TagSyncTask).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

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
  Group: z.string().min(12).max(1600).regex(
    new RegExp(
      "([a-zA-Z0-9_\\\\.-]{1,150}/[a-z0-9]{26})|(arn:aws(-[a-z]+)*:resource-groups(-(test|beta|gamma))?:[a-z]{2}(-[a-z]+)+-\\d{1}:[0-9]{12}:group/[a-zA-Z0-9_\\\\.-]{1,150}/[a-z0-9]{26})",
    ),
  ).describe(
    "The Amazon resource name (ARN) or name of the application group for which you want to create a tag-sync task",
  ),
  TagKey: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The tag key. Resources tagged with this tag key-value pair will be added to the application. If a resource with this tag is later untagged, the tag-sync task removes the resource from the application.",
  ),
  TagValue: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The tag value. Resources tagged with this tag key-value pair will be added to the application. If a resource with this tag is later untagged, the tag-sync task removes the resource from the application.",
  ),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+",
    ),
  ).describe(
    "The Amazon resource name (ARN) of the role assumed by the service to tag and untag resources on your behalf.",
  ),
});

const StateSchema = z.object({
  Group: z.string().optional(),
  GroupArn: z.string().optional(),
  GroupName: z.string().optional(),
  TaskArn: z.string(),
  TagKey: z.string().optional(),
  TagValue: z.string().optional(),
  RoleArn: z.string().optional(),
  Status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Group: z.string().min(12).max(1600).regex(
    new RegExp(
      "([a-zA-Z0-9_\\\\.-]{1,150}/[a-z0-9]{26})|(arn:aws(-[a-z]+)*:resource-groups(-(test|beta|gamma))?:[a-z]{2}(-[a-z]+)+-\\d{1}:[0-9]{12}:group/[a-zA-Z0-9_\\\\.-]{1,150}/[a-z0-9]{26})",
    ),
  ).describe(
    "The Amazon resource name (ARN) or name of the application group for which you want to create a tag-sync task",
  ).optional(),
  TagKey: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The tag key. Resources tagged with this tag key-value pair will be added to the application. If a resource with this tag is later untagged, the tag-sync task removes the resource from the application.",
  ).optional(),
  TagValue: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The tag value. Resources tagged with this tag key-value pair will be added to the application. If a resource with this tag is later untagged, the tag-sync task removes the resource from the application.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+",
    ),
  ).describe(
    "The Amazon resource name (ARN) of the role assumed by the service to tag and untag resources on your behalf.",
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

/** Swamp extension model for ResourceGroups TagSyncTask. Registered at `@swamp/aws/resourcegroups/tag-sync-task`. */
export const model = {
  type: "@swamp/aws/resourcegroups/tag-sync-task",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ResourceGroups TagSyncTask resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ResourceGroups TagSyncTask",
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
          "AWS::ResourceGroups::TagSyncTask",
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
      description: "Get a ResourceGroups TagSyncTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ResourceGroups TagSyncTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ResourceGroups::TagSyncTask",
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
    delete: {
      description: "Delete a ResourceGroups TagSyncTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ResourceGroups TagSyncTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ResourceGroups::TagSyncTask",
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
      description: "Sync ResourceGroups TagSyncTask state from AWS",
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
        const identifier = existing.TaskArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ResourceGroups::TagSyncTask",
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
