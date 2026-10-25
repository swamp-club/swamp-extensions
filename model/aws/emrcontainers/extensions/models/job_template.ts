// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/emrcontainers/job-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EMRContainers JobTemplate (AWS::EMRContainers::JobTemplate).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ConfigurationSchema = z.object({
  Classification: z.string().min(1).max(1024).regex(new RegExp("\\S")).describe(
    "The classification within a configuration.",
  ),
  Properties: z.record(
    z.string(),
    z.string().min(1).max(1024).regex(new RegExp("\\S")),
  ).describe(
    "A set of properties specified within a configuration classification.",
  ).optional(),
  Configurations: z.array(z.record(z.string(), z.unknown())).optional(),
});

const ParametricCloudWatchMonitoringConfigurationSchema = z.object({
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("^[\\.\\-_/#A-Za-z0-9\\$\\{\\}]+$"),
  ).describe(
    "The name of the log group for log publishing, or a template parameter reference.",
  ).optional(),
  LogStreamNamePrefix: z.string().min(1).max(256).regex(new RegExp("\\S"))
    .describe("The specified name prefix for log streams.").optional(),
});

const ParametricS3MonitoringConfigurationSchema = z.object({
  LogUri: z.string().min(1).max(10280).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\r\\n\\t]*$",
    ),
  ).describe("Amazon S3 destination URI for log publishing.").optional(),
});

const ParametricMonitoringConfigurationSchema = z.object({
  PersistentAppUI: z.string().min(1).max(512).regex(
    new RegExp("^[\\.\\-_/#A-Za-z0-9\\$\\{\\}]+$"),
  ).describe(
    "Monitoring configurations for the persistent application UI, or a template parameter reference.",
  ).optional(),
  CloudWatchMonitoringConfiguration:
    ParametricCloudWatchMonitoringConfigurationSchema.describe(
      "A configuration for CloudWatch monitoring. This data type allows job template parameters to be specified within.",
    ).optional(),
  S3MonitoringConfiguration: ParametricS3MonitoringConfigurationSchema.describe(
    "Amazon S3 configuration for monitoring log publishing. This data type allows job template parameters to be specified within.",
  ).optional(),
});

const ParametricConfigurationOverridesSchema = z.object({
  ApplicationConfiguration: z.array(ConfigurationSchema).optional(),
  MonitoringConfiguration: ParametricMonitoringConfigurationSchema.describe(
    "Configuration setting for monitoring. This data type allows job template parameters to be specified within.",
  ).optional(),
});

const SparkSubmitJobDriverSchema = z.object({
  EntryPoint: z.string().min(1).max(256).regex(new RegExp("\\S")),
  EntryPointArguments: z.array(
    z.string().min(1).max(10280).regex(new RegExp("\\S")),
  ).optional(),
  SparkSubmitParameters: z.string().min(1).max(102400).regex(new RegExp("\\S"))
    .optional(),
});

const SparkSqlJobDriverSchema = z.object({
  EntryPoint: z.string().min(1).max(256).regex(new RegExp("\\S")).optional(),
  SparkSqlParameters: z.string().min(1).max(102400).regex(new RegExp("\\S"))
    .optional(),
});

const JobDriverSchema = z.object({
  SparkSubmitJobDriver: SparkSubmitJobDriverSchema.describe(
    "The information about job driver for Spark submit.",
  ).optional(),
  SparkSqlJobDriver: SparkSqlJobDriverSchema.describe(
    "The job driver for job type.",
  ).optional(),
});

const TemplateParameterConfigurationSchema = z.object({
  Type: z.enum(["NUMBER", "STRING"]).describe(
    "The type of the job template parameter.",
  ).optional(),
  DefaultValue: z.string().min(1).max(1024).regex(new RegExp("\\S")).describe(
    "The default value for the job template parameter.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"))
    .describe("The specified name of the job template."),
  JobTemplateData: z.object({
    ExecutionRoleArn: z.string().min(4).max(2048).regex(
      new RegExp(
        "^(^arn:(aws[a-zA-Z0-9-]*):iam::(\\d{12})?:(role((\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F))[\\w+=,.@-]+)$)|([\\.\\-_\\#A-Za-z0-9\\$\\{\\}]+)$",
      ),
    ).describe(
      "The execution role ARN of the job run, or a template parameter reference.",
    ),
    ReleaseLabel: z.string().min(1).max(64).regex(
      new RegExp("^([\\.\\-_/A-Za-z0-9]+|\\$\\{[a-zA-Z]\\w*\\})$"),
    ).describe(
      "The release version of Amazon EMR, or a template parameter reference.",
    ),
    ConfigurationOverrides: ParametricConfigurationOverridesSchema.describe(
      "A configuration specification to be used to override existing configurations. This data type allows job template parameters to be specified within.",
    ).optional(),
    JobDriver: JobDriverSchema.describe(
      "Specify the driver that the job runs on. Exactly one of the two available job drivers is required, either SparkSqlJobDriver or SparkSubmitJobDriver.",
    ),
    ParameterConfiguration: z.record(
      z.string(),
      TemplateParameterConfigurationSchema,
    ).describe("The configuration of parameters existing in the job template.")
      .optional(),
    JobTags: z.record(z.string(), z.string().min(0).max(256)).describe(
      "The tags assigned to jobs started using the job template.",
    ).optional(),
  }).describe(
    "The values of a StartJobRun API request used in job runs started using the job template.",
  ),
  Tags: z.array(TagSchema).describe(
    "The tags that are associated with the job template.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  JobTemplateData: z.object({
    ExecutionRoleArn: z.string(),
    ReleaseLabel: z.string(),
    ConfigurationOverrides: ParametricConfigurationOverridesSchema,
    JobDriver: JobDriverSchema,
    ParameterConfiguration: z.record(z.string(), z.unknown()),
    JobTags: z.record(z.string(), z.unknown()),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Id: z.string().optional(),
  Arn: z.string(),
  CreatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"))
    .describe("The specified name of the job template.").optional(),
  JobTemplateData: z.object({
    ExecutionRoleArn: z.string().min(4).max(2048).regex(
      new RegExp(
        "^(^arn:(aws[a-zA-Z0-9-]*):iam::(\\d{12})?:(role((\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F))[\\w+=,.@-]+)$)|([\\.\\-_\\#A-Za-z0-9\\$\\{\\}]+)$",
      ),
    ).describe(
      "The execution role ARN of the job run, or a template parameter reference.",
    ).optional(),
    ReleaseLabel: z.string().min(1).max(64).regex(
      new RegExp("^([\\.\\-_/A-Za-z0-9]+|\\$\\{[a-zA-Z]\\w*\\})$"),
    ).describe(
      "The release version of Amazon EMR, or a template parameter reference.",
    ).optional(),
    ConfigurationOverrides: ParametricConfigurationOverridesSchema.describe(
      "A configuration specification to be used to override existing configurations. This data type allows job template parameters to be specified within.",
    ).optional(),
    JobDriver: JobDriverSchema.describe(
      "Specify the driver that the job runs on. Exactly one of the two available job drivers is required, either SparkSqlJobDriver or SparkSubmitJobDriver.",
    ).optional(),
    ParameterConfiguration: z.record(
      z.string(),
      TemplateParameterConfigurationSchema,
    ).describe("The configuration of parameters existing in the job template.")
      .optional(),
    JobTags: z.record(z.string(), z.string().min(0).max(256)).describe(
      "The tags assigned to jobs started using the job template.",
    ).optional(),
  }).describe(
    "The values of a StartJobRun API request used in job runs started using the job template.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that are associated with the job template.",
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

/** Swamp extension model for EMRContainers JobTemplate. Registered at `@swamp/aws/emrcontainers/job-template`. */
export const model = {
  type: "@swamp/aws/emrcontainers/job-template",
  version: "2026.10.25.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "Added: JobTemplateData",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EMRContainers JobTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMRContainers JobTemplate",
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
          "AWS::EMRContainers::JobTemplate",
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
      description: "Get a EMRContainers JobTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRContainers JobTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EMRContainers::JobTemplate",
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
      description: "Delete a EMRContainers JobTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRContainers JobTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EMRContainers::JobTemplate",
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
      description: "Sync EMRContainers JobTemplate state from AWS",
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
            "AWS::EMRContainers::JobTemplate",
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
      description: "List EMRContainers JobTemplate resources",
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
          "AWS::EMRContainers::JobTemplate",
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
