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

// Auto-generated extension model for @swamp/gcp/aiplatform/studies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform Studies.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/studies/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.studies.get",
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
  "id": "aiplatform.projects.locations.studies.create",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.studies.delete",
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

const LIST_CONFIG = {
  "id": "aiplatform.projects.locations.studies.list",
  "path": "v1/{+parent}/studies",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Describes the Study, default value is empty string.",
  ).optional(),
  studySpec: z.object({
    algorithm: z.enum(["ALGORITHM_UNSPECIFIED", "GRID_SEARCH", "RANDOM_SEARCH"])
      .describe("The search algorithm specified for the Study.").optional(),
    convexAutomatedStoppingSpec: z.object({
      learningRateParameterName: z.string().describe(
        "The hyper-parameter name used in the tuning job that stands for learning rate. Leave it blank if learning rate is not in a parameter in tuning. The learning_rate is used to estimate the objective value of the ongoing trial.",
      ).optional(),
      maxStepCount: z.string().describe(
        "Steps used in predicting the final objective for early stopped trials. In general, it's set to be the same as the defined steps in training / tuning. If not defined, it will learn it from the completed trials. When use_steps is false, this field is set to the maximum elapsed seconds.",
      ).optional(),
      minMeasurementCount: z.string().describe(
        "The minimal number of measurements in a Trial. Early-stopping checks will not trigger if less than min_measurement_count+1 completed trials or pending trials with less than min_measurement_count measurements. If not defined, the default value is 5.",
      ).optional(),
      minStepCount: z.string().describe(
        "Minimum number of steps for a trial to complete. Trials which do not have a measurement with step_count > min_step_count won't be considered for early stopping. It's ok to set it to 0, and a trial can be early stopped at any stage. By default, min_step_count is set to be one-tenth of the max_step_count. When use_elapsed_duration is true, this field is set to the minimum elapsed seconds.",
      ).optional(),
      updateAllStoppedTrials: z.boolean().describe(
        "ConvexAutomatedStoppingSpec by default only updates the trials that needs to be early stopped using a newly trained auto-regressive model. When this flag is set to True, all stopped trials from the beginning are potentially updated in terms of their `final_measurement`. Also, note that the training logic of autoregressive models is different in this case. Enabling this option has shown better results and this may be the default option in the future.",
      ).optional(),
      useElapsedDuration: z.boolean().describe(
        "This bool determines whether or not the rule is applied based on elapsed_secs or steps. If use_elapsed_duration==false, the early stopping decision is made according to the predicted objective values according to the target steps. If use_elapsed_duration==true, elapsed_secs is used instead of steps. Also, in this case, the parameters max_num_steps and min_num_steps are overloaded to contain max_elapsed_seconds and min_elapsed_seconds.",
      ).optional(),
    }).describe(
      "Configuration for ConvexAutomatedStoppingSpec. When there are enough completed trials (configured by min_measurement_count), for pending trials with enough measurements and steps, the policy first computes an overestimate of the objective value at max_num_steps according to the slope of the incomplete objective value curve. No prediction can be made if the curve is completely flat. If the overestimation is worse than the best objective value of the completed trials, this pending trial will be early-stopped, but a last measurement will be added to the pending trial with max_num_steps and predicted objective value from the autoregression model.",
    ).optional(),
    decayCurveStoppingSpec: z.object({
      useElapsedDuration: z.boolean().describe(
        "True if Measurement.elapsed_duration is used as the x-axis of each Trials Decay Curve. Otherwise, Measurement.step_count will be used as the x-axis.",
      ).optional(),
    }).describe(
      "The decay curve automated stopping rule builds a Gaussian Process Regressor to predict the final objective value of a Trial based on the already completed Trials and the intermediate measurements of the current Trial. Early stopping is requested for the current Trial if there is very low probability to exceed the optimal value found so far.",
    ).optional(),
    measurementSelectionType: z.enum([
      "MEASUREMENT_SELECTION_TYPE_UNSPECIFIED",
      "LAST_MEASUREMENT",
      "BEST_MEASUREMENT",
    ]).describe("Describe which measurement selection type will be used")
      .optional(),
    medianAutomatedStoppingSpec: z.object({
      useElapsedDuration: z.boolean().describe(
        "True if median automated stopping rule applies on Measurement.elapsed_duration. It means that elapsed_duration field of latest measurement of current Trial is used to compute median objective value for each completed Trials.",
      ).optional(),
    }).describe(
      "The median automated stopping rule stops a pending Trial if the Trial's best objective_value is strictly below the median 'performance' of all completed Trials reported up to the Trial's last measurement. Currently, 'performance' refers to the running average of the objective values reported by the Trial in each measurement.",
    ).optional(),
    metrics: z.array(z.object({
      goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"]).describe(
        "Required. The optimization goal of the metric.",
      ).optional(),
      metricId: z.string().describe(
        "Required. The ID of the metric. Must not contain whitespaces and must be unique amongst all MetricSpecs.",
      ).optional(),
      safetyConfig: z.object({
        desiredMinSafeTrialsFraction: z.number().describe(
          "Desired minimum fraction of safe trials (over total number of trials) that should be targeted by the algorithm at any time during the study (best effort). This should be between 0.0 and 1.0 and a value of 0.0 means that there is no minimum and an algorithm proceeds without targeting any specific fraction. A value of 1.0 means that the algorithm attempts to only Suggest safe Trials.",
        ).optional(),
        safetyThreshold: z.number().describe(
          "Safety threshold (boundary value between safe and unsafe). NOTE that if you leave SafetyMetricConfig unset, a default value of 0 will be used.",
        ).optional(),
      }).describe(
        "Used in safe optimization to specify threshold levels and risk tolerance.",
      ).optional(),
    })).describe("Required. Metric specs for the Study.").optional(),
    observationNoise: z.enum(["OBSERVATION_NOISE_UNSPECIFIED", "LOW", "HIGH"])
      .describe(
        "The observation noise level of the study. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
      ).optional(),
    parameters: z.array(z.object({
      categoricalValueSpec: z.object({
        defaultValue: z.string().describe(
          "A default value for a `CATEGORICAL` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Required. The list of possible categories.",
        ).optional(),
      }).describe("Value specification for a parameter in `CATEGORICAL` type.")
        .optional(),
      conditionalParameterSpecs: z.array(z.object({
        parameterSpec: z.unknown().describe(
          "Circular reference to GoogleCloudAiplatformV1StudySpecParameterSpec",
        ).optional(),
        parentCategoricalValues: z.unknown().describe(
          "Represents the spec to match categorical values from parent parameter.",
        ).optional(),
        parentDiscreteValues: z.unknown().describe(
          "Represents the spec to match discrete values from parent parameter.",
        ).optional(),
        parentIntValues: z.unknown().describe(
          "Represents the spec to match integer values from parent parameter.",
        ).optional(),
      })).describe(
        "A conditional parameter node is active if the parameter's value matches the conditional node's parent_value_condition. If two items in conditional_parameter_specs have the same name, they must have disjoint parent_value_condition.",
      ).optional(),
      discreteValueSpec: z.object({
        defaultValue: z.number().describe(
          "A default value for a `DISCRETE` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. It automatically rounds to the nearest feasible discrete point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Required. A list of possible values. The list should be in increasing order and at least 1e-10 apart. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values.",
        ).optional(),
      }).describe("Value specification for a parameter in `DISCRETE` type.")
        .optional(),
      doubleValueSpec: z.object({
        defaultValue: z.number().describe(
          "A default value for a `DOUBLE` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        maxValue: z.number().describe(
          "Required. Inclusive maximum value of the parameter.",
        ).optional(),
        minValue: z.number().describe(
          "Required. Inclusive minimum value of the parameter.",
        ).optional(),
      }).describe("Value specification for a parameter in `DOUBLE` type.")
        .optional(),
      integerValueSpec: z.object({
        defaultValue: z.string().describe(
          "A default value for an `INTEGER` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        maxValue: z.string().describe(
          "Required. Inclusive maximum value of the parameter.",
        ).optional(),
        minValue: z.string().describe(
          "Required. Inclusive minimum value of the parameter.",
        ).optional(),
      }).describe("Value specification for a parameter in `INTEGER` type.")
        .optional(),
      parameterId: z.string().describe(
        "Required. The ID of the parameter. Must not contain whitespaces and must be unique amongst all ParameterSpecs.",
      ).optional(),
      scaleType: z.enum([
        "SCALE_TYPE_UNSPECIFIED",
        "UNIT_LINEAR_SCALE",
        "UNIT_LOG_SCALE",
        "UNIT_REVERSE_LOG_SCALE",
      ]).describe(
        "How the parameter should be scaled. Leave unset for `CATEGORICAL` parameters.",
      ).optional(),
    })).describe("Required. The set of parameters to tune.").optional(),
    studyStoppingConfig: z.object({
      maxDurationNoProgress: z.string().describe(
        "If the objective value has not improved for this much time, stop the study. WARNING: Effective only for single-objective studies.",
      ).optional(),
      maxNumTrials: z.number().int().describe(
        "If there are more than this many trials, stop the study.",
      ).optional(),
      maxNumTrialsNoProgress: z.number().int().describe(
        "If the objective value has not improved for this many consecutive trials, stop the study. WARNING: Effective only for single-objective studies.",
      ).optional(),
      maximumRuntimeConstraint: z.object({
        endTime: z.string().describe(
          "Compares the wallclock time to this time. Must use UTC timezone.",
        ).optional(),
        maxDuration: z.string().describe(
          "Counts the wallclock time passed since the creation of this Study.",
        ).optional(),
      }).describe("Time-based Constraint for Study").optional(),
      minNumTrials: z.number().int().describe(
        "If there are fewer than this many COMPLETED trials, do not stop the study.",
      ).optional(),
      minimumRuntimeConstraint: z.object({
        endTime: z.string().describe(
          "Compares the wallclock time to this time. Must use UTC timezone.",
        ).optional(),
        maxDuration: z.string().describe(
          "Counts the wallclock time passed since the creation of this Study.",
        ).optional(),
      }).describe("Time-based Constraint for Study").optional(),
      shouldStopAsap: z.boolean().describe(
        "If true, a Study enters STOPPING_ASAP whenever it would normally enters STOPPING state. The bottom line is: set to true if you want to interrupt on-going evaluations of Trials as soon as the study stopping condition is met. (Please see Study.State documentation for the source of truth).",
      ).optional(),
    }).describe(
      "The configuration (stopping conditions) for automated stopping of a Study. Conditions include trial budgets, time budgets, and convergence detection.",
    ).optional(),
  }).describe("Represents specification of a Study.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  inactiveReason: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  studySpec: z.object({
    algorithm: z.string(),
    convexAutomatedStoppingSpec: z.object({
      learningRateParameterName: z.string(),
      maxStepCount: z.string(),
      minMeasurementCount: z.string(),
      minStepCount: z.string(),
      updateAllStoppedTrials: z.boolean(),
      useElapsedDuration: z.boolean(),
    }),
    decayCurveStoppingSpec: z.object({
      useElapsedDuration: z.boolean(),
    }),
    measurementSelectionType: z.string(),
    medianAutomatedStoppingSpec: z.object({
      useElapsedDuration: z.boolean(),
    }),
    metrics: z.array(z.object({
      goal: z.string(),
      metricId: z.string(),
      safetyConfig: z.object({
        desiredMinSafeTrialsFraction: z.number(),
        safetyThreshold: z.number(),
      }),
    })),
    observationNoise: z.string(),
    parameters: z.array(z.object({
      categoricalValueSpec: z.object({
        defaultValue: z.string(),
        values: z.array(z.unknown()),
      }),
      conditionalParameterSpecs: z.array(z.object({
        parameterSpec: z.unknown(),
        parentCategoricalValues: z.unknown(),
        parentDiscreteValues: z.unknown(),
        parentIntValues: z.unknown(),
      })),
      discreteValueSpec: z.object({
        defaultValue: z.number(),
        values: z.array(z.unknown()),
      }),
      doubleValueSpec: z.object({
        defaultValue: z.number(),
        maxValue: z.number(),
        minValue: z.number(),
      }),
      integerValueSpec: z.object({
        defaultValue: z.string(),
        maxValue: z.string(),
        minValue: z.string(),
      }),
      parameterId: z.string(),
      scaleType: z.string(),
    })),
    studyStoppingConfig: z.object({
      maxDurationNoProgress: z.string(),
      maxNumTrials: z.number(),
      maxNumTrialsNoProgress: z.number(),
      maximumRuntimeConstraint: z.object({
        endTime: z.string(),
        maxDuration: z.string(),
      }),
      minNumTrials: z.number(),
      minimumRuntimeConstraint: z.object({
        endTime: z.string(),
        maxDuration: z.string(),
      }),
      shouldStopAsap: z.boolean(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe(
    "Required. Describes the Study, default value is empty string.",
  ).optional(),
  studySpec: z.object({
    algorithm: z.enum(["ALGORITHM_UNSPECIFIED", "GRID_SEARCH", "RANDOM_SEARCH"])
      .describe("The search algorithm specified for the Study.").optional(),
    convexAutomatedStoppingSpec: z.object({
      learningRateParameterName: z.string().describe(
        "The hyper-parameter name used in the tuning job that stands for learning rate. Leave it blank if learning rate is not in a parameter in tuning. The learning_rate is used to estimate the objective value of the ongoing trial.",
      ).optional(),
      maxStepCount: z.string().describe(
        "Steps used in predicting the final objective for early stopped trials. In general, it's set to be the same as the defined steps in training / tuning. If not defined, it will learn it from the completed trials. When use_steps is false, this field is set to the maximum elapsed seconds.",
      ).optional(),
      minMeasurementCount: z.string().describe(
        "The minimal number of measurements in a Trial. Early-stopping checks will not trigger if less than min_measurement_count+1 completed trials or pending trials with less than min_measurement_count measurements. If not defined, the default value is 5.",
      ).optional(),
      minStepCount: z.string().describe(
        "Minimum number of steps for a trial to complete. Trials which do not have a measurement with step_count > min_step_count won't be considered for early stopping. It's ok to set it to 0, and a trial can be early stopped at any stage. By default, min_step_count is set to be one-tenth of the max_step_count. When use_elapsed_duration is true, this field is set to the minimum elapsed seconds.",
      ).optional(),
      updateAllStoppedTrials: z.boolean().describe(
        "ConvexAutomatedStoppingSpec by default only updates the trials that needs to be early stopped using a newly trained auto-regressive model. When this flag is set to True, all stopped trials from the beginning are potentially updated in terms of their `final_measurement`. Also, note that the training logic of autoregressive models is different in this case. Enabling this option has shown better results and this may be the default option in the future.",
      ).optional(),
      useElapsedDuration: z.boolean().describe(
        "This bool determines whether or not the rule is applied based on elapsed_secs or steps. If use_elapsed_duration==false, the early stopping decision is made according to the predicted objective values according to the target steps. If use_elapsed_duration==true, elapsed_secs is used instead of steps. Also, in this case, the parameters max_num_steps and min_num_steps are overloaded to contain max_elapsed_seconds and min_elapsed_seconds.",
      ).optional(),
    }).describe(
      "Configuration for ConvexAutomatedStoppingSpec. When there are enough completed trials (configured by min_measurement_count), for pending trials with enough measurements and steps, the policy first computes an overestimate of the objective value at max_num_steps according to the slope of the incomplete objective value curve. No prediction can be made if the curve is completely flat. If the overestimation is worse than the best objective value of the completed trials, this pending trial will be early-stopped, but a last measurement will be added to the pending trial with max_num_steps and predicted objective value from the autoregression model.",
    ).optional(),
    decayCurveStoppingSpec: z.object({
      useElapsedDuration: z.boolean().describe(
        "True if Measurement.elapsed_duration is used as the x-axis of each Trials Decay Curve. Otherwise, Measurement.step_count will be used as the x-axis.",
      ).optional(),
    }).describe(
      "The decay curve automated stopping rule builds a Gaussian Process Regressor to predict the final objective value of a Trial based on the already completed Trials and the intermediate measurements of the current Trial. Early stopping is requested for the current Trial if there is very low probability to exceed the optimal value found so far.",
    ).optional(),
    measurementSelectionType: z.enum([
      "MEASUREMENT_SELECTION_TYPE_UNSPECIFIED",
      "LAST_MEASUREMENT",
      "BEST_MEASUREMENT",
    ]).describe("Describe which measurement selection type will be used")
      .optional(),
    medianAutomatedStoppingSpec: z.object({
      useElapsedDuration: z.boolean().describe(
        "True if median automated stopping rule applies on Measurement.elapsed_duration. It means that elapsed_duration field of latest measurement of current Trial is used to compute median objective value for each completed Trials.",
      ).optional(),
    }).describe(
      "The median automated stopping rule stops a pending Trial if the Trial's best objective_value is strictly below the median 'performance' of all completed Trials reported up to the Trial's last measurement. Currently, 'performance' refers to the running average of the objective values reported by the Trial in each measurement.",
    ).optional(),
    metrics: z.array(z.object({
      goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"]).describe(
        "Required. The optimization goal of the metric.",
      ).optional(),
      metricId: z.string().describe(
        "Required. The ID of the metric. Must not contain whitespaces and must be unique amongst all MetricSpecs.",
      ).optional(),
      safetyConfig: z.object({
        desiredMinSafeTrialsFraction: z.number().describe(
          "Desired minimum fraction of safe trials (over total number of trials) that should be targeted by the algorithm at any time during the study (best effort). This should be between 0.0 and 1.0 and a value of 0.0 means that there is no minimum and an algorithm proceeds without targeting any specific fraction. A value of 1.0 means that the algorithm attempts to only Suggest safe Trials.",
        ).optional(),
        safetyThreshold: z.number().describe(
          "Safety threshold (boundary value between safe and unsafe). NOTE that if you leave SafetyMetricConfig unset, a default value of 0 will be used.",
        ).optional(),
      }).describe(
        "Used in safe optimization to specify threshold levels and risk tolerance.",
      ).optional(),
    })).describe("Required. Metric specs for the Study.").optional(),
    observationNoise: z.enum(["OBSERVATION_NOISE_UNSPECIFIED", "LOW", "HIGH"])
      .describe(
        "The observation noise level of the study. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
      ).optional(),
    parameters: z.array(z.object({
      categoricalValueSpec: z.object({
        defaultValue: z.string().describe(
          "A default value for a `CATEGORICAL` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Required. The list of possible categories.",
        ).optional(),
      }).describe("Value specification for a parameter in `CATEGORICAL` type.")
        .optional(),
      conditionalParameterSpecs: z.array(z.object({
        parameterSpec: z.unknown().describe(
          "Circular reference to GoogleCloudAiplatformV1StudySpecParameterSpec",
        ).optional(),
        parentCategoricalValues: z.unknown().describe(
          "Represents the spec to match categorical values from parent parameter.",
        ).optional(),
        parentDiscreteValues: z.unknown().describe(
          "Represents the spec to match discrete values from parent parameter.",
        ).optional(),
        parentIntValues: z.unknown().describe(
          "Represents the spec to match integer values from parent parameter.",
        ).optional(),
      })).describe(
        "A conditional parameter node is active if the parameter's value matches the conditional node's parent_value_condition. If two items in conditional_parameter_specs have the same name, they must have disjoint parent_value_condition.",
      ).optional(),
      discreteValueSpec: z.object({
        defaultValue: z.number().describe(
          "A default value for a `DISCRETE` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. It automatically rounds to the nearest feasible discrete point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Required. A list of possible values. The list should be in increasing order and at least 1e-10 apart. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values.",
        ).optional(),
      }).describe("Value specification for a parameter in `DISCRETE` type.")
        .optional(),
      doubleValueSpec: z.object({
        defaultValue: z.number().describe(
          "A default value for a `DOUBLE` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        maxValue: z.number().describe(
          "Required. Inclusive maximum value of the parameter.",
        ).optional(),
        minValue: z.number().describe(
          "Required. Inclusive minimum value of the parameter.",
        ).optional(),
      }).describe("Value specification for a parameter in `DOUBLE` type.")
        .optional(),
      integerValueSpec: z.object({
        defaultValue: z.string().describe(
          "A default value for an `INTEGER` parameter that is assumed to be a relatively good starting point. Unset value signals that there is no offered starting point. Currently only supported by the Vertex AI Vizier service. Not supported by HyperparameterTuningJob or TrainingPipeline.",
        ).optional(),
        maxValue: z.string().describe(
          "Required. Inclusive maximum value of the parameter.",
        ).optional(),
        minValue: z.string().describe(
          "Required. Inclusive minimum value of the parameter.",
        ).optional(),
      }).describe("Value specification for a parameter in `INTEGER` type.")
        .optional(),
      parameterId: z.string().describe(
        "Required. The ID of the parameter. Must not contain whitespaces and must be unique amongst all ParameterSpecs.",
      ).optional(),
      scaleType: z.enum([
        "SCALE_TYPE_UNSPECIFIED",
        "UNIT_LINEAR_SCALE",
        "UNIT_LOG_SCALE",
        "UNIT_REVERSE_LOG_SCALE",
      ]).describe(
        "How the parameter should be scaled. Leave unset for `CATEGORICAL` parameters.",
      ).optional(),
    })).describe("Required. The set of parameters to tune.").optional(),
    studyStoppingConfig: z.object({
      maxDurationNoProgress: z.string().describe(
        "If the objective value has not improved for this much time, stop the study. WARNING: Effective only for single-objective studies.",
      ).optional(),
      maxNumTrials: z.number().int().describe(
        "If there are more than this many trials, stop the study.",
      ).optional(),
      maxNumTrialsNoProgress: z.number().int().describe(
        "If the objective value has not improved for this many consecutive trials, stop the study. WARNING: Effective only for single-objective studies.",
      ).optional(),
      maximumRuntimeConstraint: z.object({
        endTime: z.string().describe(
          "Compares the wallclock time to this time. Must use UTC timezone.",
        ).optional(),
        maxDuration: z.string().describe(
          "Counts the wallclock time passed since the creation of this Study.",
        ).optional(),
      }).describe("Time-based Constraint for Study").optional(),
      minNumTrials: z.number().int().describe(
        "If there are fewer than this many COMPLETED trials, do not stop the study.",
      ).optional(),
      minimumRuntimeConstraint: z.object({
        endTime: z.string().describe(
          "Compares the wallclock time to this time. Must use UTC timezone.",
        ).optional(),
        maxDuration: z.string().describe(
          "Counts the wallclock time passed since the creation of this Study.",
        ).optional(),
      }).describe("Time-based Constraint for Study").optional(),
      shouldStopAsap: z.boolean().describe(
        "If true, a Study enters STOPPING_ASAP whenever it would normally enters STOPPING state. The bottom line is: set to true if you want to interrupt on-going evaluations of Trials as soon as the study stopping condition is met. (Please see Study.State documentation for the source of truth).",
      ).optional(),
    }).describe(
      "The configuration (stopping conditions) for automated stopping of a Study. Conditions include trial budgets, time budgets, and convergence detection.",
    ).optional(),
  }).describe("Represents specification of a Study.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Agent Platform Studies. Registered at `@swamp/gcp/aiplatform/studies`. */
export const model = {
  type: "@swamp/gcp/aiplatform/studies",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
    {
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["studySpec"] !== undefined) body["studySpec"] = g["studySpec"];
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a studies",
      arguments: z.object({
        identifier: z.string().describe("The name of the studies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List studies resources",
      arguments: z.object({
        pageSize: z.number().describe(
          'Optional. The maximum number of studies to return per "page" of results. If unspecified, service will pick an appropriate default.',
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "studies",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    lookup: {
      description: "lookup",
      arguments: z.object({
        displayName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.studies.lookup",
            "path": "v1/{+parent}/studies:lookup",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
