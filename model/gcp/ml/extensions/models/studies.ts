// Auto-generated extension model for @swamp/gcp/ml/studies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud AI Platform Training & Prediction Studies.
 *
 * A message representing a Study.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/studies/${shortName}`;
}

const BASE_URL = "https://ml.googleapis.com/";

const GET_CONFIG = {
  "id": "ml.projects.locations.studies.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "ml.projects.locations.studies.create",
  "path": "v1/{+parent}/studies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "studyId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "ml.projects.locations.studies.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  studyConfig: z.object({
    algorithm: z.enum([
      "ALGORITHM_UNSPECIFIED",
      "GAUSSIAN_PROCESS_BANDIT",
      "GRID_SEARCH",
      "RANDOM_SEARCH",
    ]).describe("The search algorithm specified for the study.").optional(),
    automatedStoppingConfig: z.object({
      decayCurveStoppingConfig: z.object({
        useElapsedTime: z.boolean().describe(
          "If true, measurement.elapsed_time is used as the x-axis of each Trials Decay Curve. Otherwise, Measurement.steps will be used as the x-axis.",
        ).optional(),
      }).optional(),
      medianAutomatedStoppingConfig: z.object({
        useElapsedTime: z.boolean().describe(
          "If true, the median automated stopping rule applies to measurement.use_elapsed_time, which means the elapsed_time field of the current trial's latest measurement is used to compute the median objective value for each completed trial.",
        ).optional(),
      }).describe(
        "The median automated stopping rule stops a pending trial if the trial's best objective_value is strictly below the median 'performance' of all completed trials reported up to the trial's last measurement. Currently, 'performance' refers to the running average of the objective values reported by the trial in each measurement.",
      ).optional(),
    }).describe(
      "Configuration for Automated Early Stopping of Trials. If no implementation_config is set, automated early stopping will not be run.",
    ).optional(),
    metrics: z.array(z.object({
      goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"]).describe(
        "Required. The optimization goal of the metric.",
      ).optional(),
      metric: z.string().describe("Required. The name of the metric.")
        .optional(),
    })).describe("Metric specs for the study.").optional(),
    parameters: z.array(z.object({
      categoricalValueSpec: z.object({
        values: z.array(z.unknown()).describe(
          "Must be specified if type is `CATEGORICAL`. The list of possible categories.",
        ).optional(),
      }).optional(),
      childParameterSpecs: z.array(z.string()).describe(
        "A child node is active if the parameter's value matches the child node's matching_parent_values. If two items in child_parameter_specs have the same name, they must have disjoint matching_parent_values.",
      ).optional(),
      discreteValueSpec: z.object({
        values: z.array(z.unknown()).describe(
          "Must be specified if type is `DISCRETE`. A list of feasible points. The list should be in strictly increasing order. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values.",
        ).optional(),
      }).optional(),
      doubleValueSpec: z.object({
        maxValue: z.number().describe(
          "Must be specified if type is `DOUBLE`. Maximum value of the parameter.",
        ).optional(),
        minValue: z.number().describe(
          "Must be specified if type is `DOUBLE`. Minimum value of the parameter.",
        ).optional(),
      }).optional(),
      integerValueSpec: z.object({
        maxValue: z.string().describe(
          "Must be specified if type is `INTEGER`. Maximum value of the parameter.",
        ).optional(),
        minValue: z.string().describe(
          "Must be specified if type is `INTEGER`. Minimum value of the parameter.",
        ).optional(),
      }).optional(),
      parameter: z.string().describe(
        "Required. The parameter name must be unique amongst all ParameterSpecs.",
      ).optional(),
      parentCategoricalValues: z.object({
        values: z.array(z.unknown()).describe(
          "Matches values of the parent parameter with type 'CATEGORICAL'. All values must exist in `categorical_value_spec` of parent parameter.",
        ).optional(),
      }).describe(
        "Represents the spec to match categorical values from parent parameter.",
      ).optional(),
      parentDiscreteValues: z.object({
        values: z.array(z.unknown()).describe(
          "Matches values of the parent parameter with type 'DISCRETE'. All values must exist in `discrete_value_spec` of parent parameter.",
        ).optional(),
      }).describe(
        "Represents the spec to match discrete values from parent parameter.",
      ).optional(),
      parentIntValues: z.object({
        values: z.array(z.unknown()).describe(
          "Matches values of the parent parameter with type 'INTEGER'. All values must lie in `integer_value_spec` of parent parameter.",
        ).optional(),
      }).describe(
        "Represents the spec to match integer values from parent parameter.",
      ).optional(),
      scaleType: z.enum([
        "SCALE_TYPE_UNSPECIFIED",
        "UNIT_LINEAR_SCALE",
        "UNIT_LOG_SCALE",
        "UNIT_REVERSE_LOG_SCALE",
      ]).describe(
        "How the parameter should be scaled. Leave unset for categorical parameters.",
      ).optional(),
      type: z.enum([
        "PARAMETER_TYPE_UNSPECIFIED",
        "DOUBLE",
        "INTEGER",
        "CATEGORICAL",
        "DISCRETE",
      ]).describe("Required. The type of the parameter.").optional(),
    })).describe("Required. The set of parameters to tune.").optional(),
  }).describe("Represents configuration of a study.").optional(),
  studyId: z.string().describe(
    "Required. The ID to use for the study, which will become the final component of the study's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  inactiveReason: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  studyConfig: z.object({
    algorithm: z.string(),
    automatedStoppingConfig: z.object({
      decayCurveStoppingConfig: z.object({
        useElapsedTime: z.boolean(),
      }),
      medianAutomatedStoppingConfig: z.object({
        useElapsedTime: z.boolean(),
      }),
    }),
    metrics: z.array(z.object({
      goal: z.string(),
      metric: z.string(),
    })),
    parameters: z.array(z.object({
      categoricalValueSpec: z.object({
        values: z.array(z.unknown()),
      }),
      childParameterSpecs: z.array(z.string()),
      discreteValueSpec: z.object({
        values: z.array(z.unknown()),
      }),
      doubleValueSpec: z.object({
        maxValue: z.number(),
        minValue: z.number(),
      }),
      integerValueSpec: z.object({
        maxValue: z.string(),
        minValue: z.string(),
      }),
      parameter: z.string(),
      parentCategoricalValues: z.object({
        values: z.array(z.unknown()),
      }),
      parentDiscreteValues: z.object({
        values: z.array(z.unknown()),
      }),
      parentIntValues: z.object({
        values: z.array(z.unknown()),
      }),
      scaleType: z.string(),
      type: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  studyConfig: z.object({
    algorithm: z.enum([
      "ALGORITHM_UNSPECIFIED",
      "GAUSSIAN_PROCESS_BANDIT",
      "GRID_SEARCH",
      "RANDOM_SEARCH",
    ]).describe("The search algorithm specified for the study.").optional(),
    automatedStoppingConfig: z.object({
      decayCurveStoppingConfig: z.object({
        useElapsedTime: z.boolean().describe(
          "If true, measurement.elapsed_time is used as the x-axis of each Trials Decay Curve. Otherwise, Measurement.steps will be used as the x-axis.",
        ).optional(),
      }).optional(),
      medianAutomatedStoppingConfig: z.object({
        useElapsedTime: z.boolean().describe(
          "If true, the median automated stopping rule applies to measurement.use_elapsed_time, which means the elapsed_time field of the current trial's latest measurement is used to compute the median objective value for each completed trial.",
        ).optional(),
      }).describe(
        "The median automated stopping rule stops a pending trial if the trial's best objective_value is strictly below the median 'performance' of all completed trials reported up to the trial's last measurement. Currently, 'performance' refers to the running average of the objective values reported by the trial in each measurement.",
      ).optional(),
    }).describe(
      "Configuration for Automated Early Stopping of Trials. If no implementation_config is set, automated early stopping will not be run.",
    ).optional(),
    metrics: z.array(z.object({
      goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"]).describe(
        "Required. The optimization goal of the metric.",
      ).optional(),
      metric: z.string().describe("Required. The name of the metric.")
        .optional(),
    })).describe("Metric specs for the study.").optional(),
    parameters: z.array(z.object({
      categoricalValueSpec: z.object({
        values: z.array(z.unknown()).describe(
          "Must be specified if type is `CATEGORICAL`. The list of possible categories.",
        ).optional(),
      }).optional(),
      childParameterSpecs: z.array(z.string()).describe(
        "A child node is active if the parameter's value matches the child node's matching_parent_values. If two items in child_parameter_specs have the same name, they must have disjoint matching_parent_values.",
      ).optional(),
      discreteValueSpec: z.object({
        values: z.array(z.unknown()).describe(
          "Must be specified if type is `DISCRETE`. A list of feasible points. The list should be in strictly increasing order. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values.",
        ).optional(),
      }).optional(),
      doubleValueSpec: z.object({
        maxValue: z.number().describe(
          "Must be specified if type is `DOUBLE`. Maximum value of the parameter.",
        ).optional(),
        minValue: z.number().describe(
          "Must be specified if type is `DOUBLE`. Minimum value of the parameter.",
        ).optional(),
      }).optional(),
      integerValueSpec: z.object({
        maxValue: z.string().describe(
          "Must be specified if type is `INTEGER`. Maximum value of the parameter.",
        ).optional(),
        minValue: z.string().describe(
          "Must be specified if type is `INTEGER`. Minimum value of the parameter.",
        ).optional(),
      }).optional(),
      parameter: z.string().describe(
        "Required. The parameter name must be unique amongst all ParameterSpecs.",
      ).optional(),
      parentCategoricalValues: z.object({
        values: z.array(z.unknown()).describe(
          "Matches values of the parent parameter with type 'CATEGORICAL'. All values must exist in `categorical_value_spec` of parent parameter.",
        ).optional(),
      }).describe(
        "Represents the spec to match categorical values from parent parameter.",
      ).optional(),
      parentDiscreteValues: z.object({
        values: z.array(z.unknown()).describe(
          "Matches values of the parent parameter with type 'DISCRETE'. All values must exist in `discrete_value_spec` of parent parameter.",
        ).optional(),
      }).describe(
        "Represents the spec to match discrete values from parent parameter.",
      ).optional(),
      parentIntValues: z.object({
        values: z.array(z.unknown()).describe(
          "Matches values of the parent parameter with type 'INTEGER'. All values must lie in `integer_value_spec` of parent parameter.",
        ).optional(),
      }).describe(
        "Represents the spec to match integer values from parent parameter.",
      ).optional(),
      scaleType: z.enum([
        "SCALE_TYPE_UNSPECIFIED",
        "UNIT_LINEAR_SCALE",
        "UNIT_LOG_SCALE",
        "UNIT_REVERSE_LOG_SCALE",
      ]).describe(
        "How the parameter should be scaled. Leave unset for categorical parameters.",
      ).optional(),
      type: z.enum([
        "PARAMETER_TYPE_UNSPECIFIED",
        "DOUBLE",
        "INTEGER",
        "CATEGORICAL",
        "DISCRETE",
      ]).describe("Required. The type of the parameter.").optional(),
    })).describe("Required. The set of parameters to tune.").optional(),
  }).describe("Represents configuration of a study.").optional(),
  studyId: z.string().describe(
    "Required. The ID to use for the study, which will become the final component of the study's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud AI Platform Training & Prediction Studies. Registered at `@swamp/gcp/ml/studies`. */
export const model = {
  type: "@swamp/gcp/ml/studies",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A message representing a Study.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a studies",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["studyConfig"] !== undefined) {
          body["studyConfig"] = g["studyConfig"];
        }
        if (g["studyId"] !== undefined) body["studyId"] = g["studyId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE", "COMPLETED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a studies",
      arguments: z.object({
        identifier: z.string().describe("The name of the studies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Delete the studies",
      arguments: z.object({
        identifier: z.string().describe("The name of the studies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync studies state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
