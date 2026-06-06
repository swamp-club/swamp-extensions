// Auto-generated extension model for @swamp/aws/elasticbeanstalk/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticBeanstalk Application (AWS::ElasticBeanstalk::Application).
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

const MaxAgeRuleSchema = z.object({
  DeleteSourceFromS3: z.boolean().describe(
    "Set to true to delete a version's source bundle from Amazon S3 when Elastic Beanstalk deletes the application version.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Specify true to apply the rule, or false to disable it.",
  ).optional(),
  MaxAgeInDays: z.number().int().describe(
    "Specify the number of days to retain an application versions.",
  ).optional(),
});

const MaxCountRuleSchema = z.object({
  DeleteSourceFromS3: z.boolean().describe(
    "Set to true to delete a version's source bundle from Amazon S3 when Elastic Beanstalk deletes the application version.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Specify true to apply the rule, or false to disable it.",
  ).optional(),
  MaxCount: z.number().int().describe(
    "Specify the maximum number of application versions to retain.",
  ).optional(),
});

const ApplicationVersionLifecycleConfigSchema = z.object({
  MaxAgeRule: MaxAgeRuleSchema.describe(
    "Specify a max age rule to restrict the length of time that application versions are retained for an application.",
  ).optional(),
  MaxCountRule: MaxCountRuleSchema.describe(
    "Specify a max count rule to restrict the number of application versions that are retained for an application.",
  ).optional(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ApplicationName: z.string().describe(
    "A name for the Elastic Beanstalk application. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the application name.",
  ).optional(),
  Description: z.string().describe("Your description of the application.")
    .optional(),
  ResourceLifecycleConfig: z.object({
    ServiceRole: z.string().describe(
      "The ARN of an IAM service role that Elastic Beanstalk has permission to assume. The ServiceRole property is required the first time that you provide a ResourceLifecycleConfig for the application. After you provide it once, Elastic Beanstalk persists the Service Role with the application, and you don't need to specify it again. You can, however, specify it in subsequent updates to change the Service Role to another value.",
    ).optional(),
    VersionLifecycleConfig: ApplicationVersionLifecycleConfigSchema.describe(
      "Defines lifecycle settings for application versions.",
    ).optional(),
  }).describe(
    "Specifies an application resource lifecycle configuration to prevent your application from accumulating too many versions.",
  ).optional(),
});

const StateSchema = z.object({
  ApplicationName: z.string(),
  Description: z.string().optional(),
  ResourceLifecycleConfig: z.object({
    ServiceRole: z.string(),
    VersionLifecycleConfig: ApplicationVersionLifecycleConfigSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApplicationName: z.string().describe(
    "A name for the Elastic Beanstalk application. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the application name.",
  ).optional(),
  Description: z.string().describe("Your description of the application.")
    .optional(),
  ResourceLifecycleConfig: z.object({
    ServiceRole: z.string().describe(
      "The ARN of an IAM service role that Elastic Beanstalk has permission to assume. The ServiceRole property is required the first time that you provide a ResourceLifecycleConfig for the application. After you provide it once, Elastic Beanstalk persists the Service Role with the application, and you don't need to specify it again. You can, however, specify it in subsequent updates to change the Service Role to another value.",
    ).optional(),
    VersionLifecycleConfig: ApplicationVersionLifecycleConfigSchema.describe(
      "Defines lifecycle settings for application versions.",
    ).optional(),
  }).describe(
    "Specifies an application resource lifecycle configuration to prevent your application from accumulating too many versions.",
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

/** Swamp extension model for ElasticBeanstalk Application. Registered at `@swamp/aws/elasticbeanstalk/application`. */
export const model = {
  type: "@swamp/aws/elasticbeanstalk/application",
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
      description: "ElasticBeanstalk Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticBeanstalk Application",
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
          "AWS::ElasticBeanstalk::Application",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ApplicationName ?? g.ApplicationName)?.toString() ??
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
      description: "Get a ElasticBeanstalk Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticBeanstalk Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticBeanstalk::Application",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ApplicationName ?? context.globalArgs.ApplicationName)
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
      description: "Update a ElasticBeanstalk Application",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ApplicationName?.toString() ?? "current")
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
        const identifier = existing.ApplicationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticBeanstalk::Application",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElasticBeanstalk::Application",
          identifier,
          currentState,
          desiredState,
          ["ApplicationName"],
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
      description: "Delete a ElasticBeanstalk Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticBeanstalk Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticBeanstalk::Application",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ApplicationName?.toString() ?? args.identifier)
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
      description: "Sync ElasticBeanstalk Application state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ApplicationName?.toString() ?? "current")
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
        const identifier = existing.ApplicationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticBeanstalk::Application",
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
