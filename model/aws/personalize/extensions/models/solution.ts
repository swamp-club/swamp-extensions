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

// Auto-generated extension model for @swamp/aws/personalize/solution
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Personalize Solution (AWS::Personalize::Solution).
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

const CategoricalHyperParameterRangeSchema = z.object({
  Name: z.string().max(256).describe("The name of the hyperparameter.")
    .optional(),
  Values: z.array(z.string().max(1000)).describe(
    "A list of the categories for the hyperparameter.",
  ).optional(),
});

const ContinuousHyperParameterRangeSchema = z.object({
  Name: z.string().max(256).describe("The name of the hyperparameter.")
    .optional(),
  MinValue: z.number().min(-1000000).describe(
    "The minimum allowable value for the hyperparameter.",
  ).optional(),
  MaxValue: z.number().min(-1000000).describe(
    "The maximum allowable value for the hyperparameter.",
  ).optional(),
});

const IntegerHyperParameterRangeSchema = z.object({
  Name: z.string().max(256).describe("The name of the hyperparameter.")
    .optional(),
  MinValue: z.number().int().min(-1000000).describe(
    "The minimum allowable value for the hyperparameter.",
  ).optional(),
  MaxValue: z.number().int().max(1000000).describe(
    "The maximum allowable value for the hyperparameter.",
  ).optional(),
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
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
  ).describe("The name for the solution"),
  EventType: z.string().max(256).describe(
    "When your have multiple event types (using an EVENT_TYPE schema field), this parameter specifies which event type (for example, 'click' or 'like') is used for training the model. If you do not provide an eventType, Amazon Personalize will use all interactions for training with equal weight regardless of type.",
  ).optional(),
  DatasetGroupArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe("The ARN of the dataset group that provides the training data."),
  PerformAutoML: z.boolean().describe(
    "Whether to perform automated machine learning (AutoML). The default is false. For this case, you must specify recipeArn.",
  ).optional(),
  PerformHPO: z.boolean().describe(
    "Whether to perform hyperparameter optimization (HPO) on the specified or selected recipe. The default is false. When performing AutoML, this parameter is always true and you should not set it to false.",
  ).optional(),
  RecipeArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the recipe to use for model training. Only specified when performAutoML is false.",
  ).optional(),
  SolutionConfig: z.object({
    AlgorithmHyperParameters: z.record(z.string(), z.string()).describe(
      "Lists the hyperparameter names and ranges.",
    ).optional(),
    AutoMLConfig: z.object({
      MetricName: z.string().max(256).describe("The metric to optimize.")
        .optional(),
      RecipeList: z.array(
        z.string().max(256).regex(
          new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
        ),
      ).describe("The list of candidate recipes.").optional(),
    }).describe(
      "The AutoMLConfig object containing a list of recipes to search when AutoML is performed.",
    ).optional(),
    EventValueThreshold: z.string().max(256).describe(
      "Only events with a value greater than or equal to this threshold are used for training a model.",
    ).optional(),
    FeatureTransformationParameters: z.record(z.string(), z.string()).describe(
      "Lists the feature transformation parameters.",
    ).optional(),
    HpoConfig: z.object({
      AlgorithmHyperParameterRanges: z.object({
        CategoricalHyperParameterRanges: z.array(
          CategoricalHyperParameterRangeSchema,
        ).describe("The categorical hyperparameters and their ranges.")
          .optional(),
        ContinuousHyperParameterRanges: z.array(
          ContinuousHyperParameterRangeSchema,
        ).describe("The continuous hyperparameters and their ranges.")
          .optional(),
        IntegerHyperParameterRanges: z.array(IntegerHyperParameterRangeSchema)
          .describe("The integer hyperparameters and their ranges.").optional(),
      }).describe("The hyperparameters and their allowable ranges").optional(),
      HpoObjective: z.object({
        MetricName: z.string().max(256).describe("The name of the metric")
          .optional(),
        Type: z.enum(["Maximize", "Minimize"]).describe(
          "The type of the metric. Valid values are Maximize and Minimize.",
        ).optional(),
        MetricRegex: z.string().max(256).describe(
          "A regular expression for finding the metric in the training job logs.",
        ).optional(),
      }).describe("The metric to optimize during HPO.").optional(),
      HpoResourceConfig: z.object({
        MaxNumberOfTrainingJobs: z.string().max(256).describe(
          "The maximum number of training jobs when you create a solution version. The maximum value for maxNumberOfTrainingJobs is 40.",
        ).optional(),
        MaxParallelTrainingJobs: z.string().max(256).describe(
          "The maximum number of parallel training jobs when you create a solution version. The maximum value for maxParallelTrainingJobs is 10.",
        ).optional(),
      }).describe(
        "Describes the resource configuration for hyperparameter optimization (HPO).",
      ).optional(),
    }).describe(
      "Describes the properties for hyperparameter optimization (HPO)",
    ).optional(),
  }).describe(
    "The configuration to use with the solution. When performAutoML is set to true, Amazon Personalize only evaluates the autoMLConfig section of the solution configuration.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  SolutionArn: z.string(),
  EventType: z.string().optional(),
  DatasetGroupArn: z.string().optional(),
  PerformAutoML: z.boolean().optional(),
  PerformHPO: z.boolean().optional(),
  RecipeArn: z.string().optional(),
  SolutionConfig: z.object({
    AlgorithmHyperParameters: z.record(z.string(), z.unknown()),
    AutoMLConfig: z.object({
      MetricName: z.string(),
      RecipeList: z.array(z.string()),
    }),
    EventValueThreshold: z.string(),
    FeatureTransformationParameters: z.record(z.string(), z.unknown()),
    HpoConfig: z.object({
      AlgorithmHyperParameterRanges: z.object({
        CategoricalHyperParameterRanges: z.array(
          CategoricalHyperParameterRangeSchema,
        ),
        ContinuousHyperParameterRanges: z.array(
          ContinuousHyperParameterRangeSchema,
        ),
        IntegerHyperParameterRanges: z.array(IntegerHyperParameterRangeSchema),
      }),
      HpoObjective: z.object({
        MetricName: z.string(),
        Type: z.string(),
        MetricRegex: z.string(),
      }),
      HpoResourceConfig: z.object({
        MaxNumberOfTrainingJobs: z.string(),
        MaxParallelTrainingJobs: z.string(),
      }),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
  ).describe("The name for the solution").optional(),
  EventType: z.string().max(256).describe(
    "When your have multiple event types (using an EVENT_TYPE schema field), this parameter specifies which event type (for example, 'click' or 'like') is used for training the model. If you do not provide an eventType, Amazon Personalize will use all interactions for training with equal weight regardless of type.",
  ).optional(),
  DatasetGroupArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe("The ARN of the dataset group that provides the training data.")
    .optional(),
  PerformAutoML: z.boolean().describe(
    "Whether to perform automated machine learning (AutoML). The default is false. For this case, you must specify recipeArn.",
  ).optional(),
  PerformHPO: z.boolean().describe(
    "Whether to perform hyperparameter optimization (HPO) on the specified or selected recipe. The default is false. When performing AutoML, this parameter is always true and you should not set it to false.",
  ).optional(),
  RecipeArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the recipe to use for model training. Only specified when performAutoML is false.",
  ).optional(),
  SolutionConfig: z.object({
    AlgorithmHyperParameters: z.record(z.string(), z.string()).describe(
      "Lists the hyperparameter names and ranges.",
    ).optional(),
    AutoMLConfig: z.object({
      MetricName: z.string().max(256).describe("The metric to optimize.")
        .optional(),
      RecipeList: z.array(
        z.string().max(256).regex(
          new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
        ),
      ).describe("The list of candidate recipes.").optional(),
    }).describe(
      "The AutoMLConfig object containing a list of recipes to search when AutoML is performed.",
    ).optional(),
    EventValueThreshold: z.string().max(256).describe(
      "Only events with a value greater than or equal to this threshold are used for training a model.",
    ).optional(),
    FeatureTransformationParameters: z.record(z.string(), z.string()).describe(
      "Lists the feature transformation parameters.",
    ).optional(),
    HpoConfig: z.object({
      AlgorithmHyperParameterRanges: z.object({
        CategoricalHyperParameterRanges: z.array(
          CategoricalHyperParameterRangeSchema,
        ).describe("The categorical hyperparameters and their ranges.")
          .optional(),
        ContinuousHyperParameterRanges: z.array(
          ContinuousHyperParameterRangeSchema,
        ).describe("The continuous hyperparameters and their ranges.")
          .optional(),
        IntegerHyperParameterRanges: z.array(IntegerHyperParameterRangeSchema)
          .describe("The integer hyperparameters and their ranges.").optional(),
      }).describe("The hyperparameters and their allowable ranges").optional(),
      HpoObjective: z.object({
        MetricName: z.string().max(256).describe("The name of the metric")
          .optional(),
        Type: z.enum(["Maximize", "Minimize"]).describe(
          "The type of the metric. Valid values are Maximize and Minimize.",
        ).optional(),
        MetricRegex: z.string().max(256).describe(
          "A regular expression for finding the metric in the training job logs.",
        ).optional(),
      }).describe("The metric to optimize during HPO.").optional(),
      HpoResourceConfig: z.object({
        MaxNumberOfTrainingJobs: z.string().max(256).describe(
          "The maximum number of training jobs when you create a solution version. The maximum value for maxNumberOfTrainingJobs is 40.",
        ).optional(),
        MaxParallelTrainingJobs: z.string().max(256).describe(
          "The maximum number of parallel training jobs when you create a solution version. The maximum value for maxParallelTrainingJobs is 10.",
        ).optional(),
      }).describe(
        "Describes the resource configuration for hyperparameter optimization (HPO).",
      ).optional(),
    }).describe(
      "Describes the properties for hyperparameter optimization (HPO)",
    ).optional(),
  }).describe(
    "The configuration to use with the solution. When performAutoML is set to true, Amazon Personalize only evaluates the autoMLConfig section of the solution configuration.",
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

/** Swamp extension model for Personalize Solution. Registered at `@swamp/aws/personalize/solution`. */
export const model = {
  type: "@swamp/aws/personalize/solution",
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
      description: "Personalize Solution resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Personalize Solution",
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
          "AWS::Personalize::Solution",
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
      description: "Get a Personalize Solution",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize Solution",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Personalize::Solution",
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
      description: "Delete a Personalize Solution",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize Solution",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Personalize::Solution",
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
      description: "Sync Personalize Solution state from AWS",
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
        const identifier = existing.SolutionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Personalize::Solution",
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
