// Auto-generated extension model for @swamp/gcp/aiplatform/modeldeploymentmonitoringjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform ModelDeploymentMonitoringJobs.
 *
 * Represents a job that runs periodically to monitor the deployed models in an endpoint. It will analyze the logged training & prediction data to detect any abnormal behaviors.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/modelDeploymentMonitoringJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.modelDeploymentMonitoringJobs.get",
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
  "id": "aiplatform.projects.locations.modelDeploymentMonitoringJobs.create",
  "path": "v1/{+parent}/modelDeploymentMonitoringJobs",
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

const PATCH_CONFIG = {
  "id": "aiplatform.projects.locations.modelDeploymentMonitoringJobs.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.modelDeploymentMonitoringJobs.delete",
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
  analysisInstanceSchemaUri: z.string().describe(
    "YAML schema file uri describing the format of a single instance that you want Tensorflow Data Validation (TFDV) to analyze. If this field is empty, all the feature data types are inferred from predict_instance_schema_uri, meaning that TFDV will use the data in the exact format(data type) as prediction request/response. If there are any data type differences between predict instance and TFDV instance, this field can be used to override the schema. For models trained with Vertex AI, this field must be set as all the fields in predict instance formatted as string.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user-defined name of the ModelDeploymentMonitoringJob. The name can be up to 128 characters long and can consist of any UTF-8 characters. Display name of a ModelDeploymentMonitoringJob.",
  ).optional(),
  enableMonitoringPipelineLogs: z.boolean().describe(
    "If true, the scheduled monitoring pipeline logs are sent to Google Cloud Logging, including pipeline status and anomalies detected. Please note the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging#pricing).",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  endpoint: z.string().describe(
    "Required. Endpoint resource name. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize your ModelDeploymentMonitoringJob. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  latestMonitoringPipelineMetadata: z.object({
    runTime: z.string().describe(
      "The time that most recent monitoring pipelines that is related to this run.",
    ).optional(),
    status: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
  }).describe("All metadata of most recent monitoring pipelines.").optional(),
  logTtl: z.string().describe(
    "The TTL of BigQuery tables in user projects which stores logs. A day is the basic unit of the TTL and we take the ceil of TTL/86400(a day). e.g. { second: 3600} indicates ttl = 1 day.",
  ).optional(),
  loggingSamplingStrategy: z.object({
    randomSampleConfig: z.object({
      sampleRate: z.number().describe("Sample rate (0, 1]").optional(),
    }).describe("Requests are randomly selected.").optional(),
  }).describe(
    "Sampling Strategy for logging, can be for both training and prediction dataset.",
  ).optional(),
  modelDeploymentMonitoringObjectiveConfigs: z.array(z.object({
    deployedModelId: z.string().describe(
      "The DeployedModel ID of the objective config.",
    ).optional(),
    objectiveConfig: z.object({
      explanationConfig: z.object({
        enableFeatureAttributes: z.boolean().describe(
          "If want to analyze the Vertex Explainable AI feature attribute scores or not. If set to true, Vertex AI will log the feature attributions from explain response and do the skew/drift detection for them.",
        ).optional(),
        explanationBaseline: z.object({
          bigquery: z.unknown().describe(
            "The BigQuery location for the output content.",
          ).optional(),
          gcs: z.unknown().describe(
            "The Google Cloud Storage location where the output is to be written to.",
          ).optional(),
          predictionFormat: z.unknown().describe(
            "The storage format of the predictions generated BatchPrediction job.",
          ).optional(),
        }).describe(
          "Output from BatchPredictionJob for Model Monitoring baseline dataset, which can be used to generate baseline attribution scores.",
        ).optional(),
      }).describe(
        "The config for integrating with Vertex Explainable AI. Only applicable if the Model has explanation_spec populated.",
      ).optional(),
      predictionDriftDetectionConfig: z.object({
        attributionScoreDriftThresholds: z.record(z.string(), z.unknown())
          .describe(
            "Key is the feature name and value is the threshold. The threshold here is against attribution score distance between different time windows.",
          ).optional(),
        defaultDriftThreshold: z.object({
          value: z.unknown().describe(
            "Specify a threshold value that can trigger the alert. If this threshold config is for feature distribution distance: 1. For categorical feature, the distribution distance is calculated by L-inifinity norm. 2. For numerical feature, the distribution distance is calculated by Jensen–Shannon divergence. Each feature must have a non-zero threshold if they need to be monitored. Otherwise no alert will be triggered for that feature.",
          ).optional(),
        }).describe("The config for feature monitoring threshold.").optional(),
        driftThresholds: z.record(z.string(), z.unknown()).describe(
          "Key is the feature name and value is the threshold. If a feature needs to be monitored for drift, a value threshold must be configured for that feature. The threshold here is against feature distribution distance between different time windws.",
        ).optional(),
      }).describe("The config for Prediction data drift detection.").optional(),
      trainingDataset: z.object({
        bigquerySource: z.object({
          inputUri: z.unknown().describe(
            "Required. BigQuery URI to a table, up to 2000 characters long. Accepted forms: * BigQuery path. For example: `bq://projectId.bqDatasetId.bqTableId`.",
          ).optional(),
        }).describe("The BigQuery location for the input content.").optional(),
        dataFormat: z.string().describe(
          'Data format of the dataset, only applicable if the input is from Google Cloud Storage. The possible formats are: "tf-record" The source file is a TFRecord file. "csv" The source file is a CSV file. "jsonl" The source file is a JSONL file.',
        ).optional(),
        dataset: z.string().describe(
          "The resource name of the Dataset used to train this Model.",
        ).optional(),
        gcsSource: z.object({
          uris: z.unknown().describe(
            "Required. Google Cloud Storage URI(-s) to the input file(s). May contain wildcards. For more information on wildcards, see https://cloud.google.com/storage/docs/wildcards.",
          ).optional(),
        }).describe("The Google Cloud Storage location for the input content.")
          .optional(),
        loggingSamplingStrategy: z.object({
          randomSampleConfig: z.unknown().describe(
            "Requests are randomly selected.",
          ).optional(),
        }).describe(
          "Sampling Strategy for logging, can be for both training and prediction dataset.",
        ).optional(),
        targetField: z.string().describe(
          "The target field name the model is to predict. This field will be excluded when doing Predict and (or) Explain for the training data.",
        ).optional(),
      }).describe("Training Dataset information.").optional(),
      trainingPredictionSkewDetectionConfig: z.object({
        attributionScoreSkewThresholds: z.record(z.string(), z.unknown())
          .describe(
            "Key is the feature name and value is the threshold. The threshold here is against attribution score distance between the training and prediction feature.",
          ).optional(),
        defaultSkewThreshold: z.object({
          value: z.unknown().describe(
            "Specify a threshold value that can trigger the alert. If this threshold config is for feature distribution distance: 1. For categorical feature, the distribution distance is calculated by L-inifinity norm. 2. For numerical feature, the distribution distance is calculated by Jensen–Shannon divergence. Each feature must have a non-zero threshold if they need to be monitored. Otherwise no alert will be triggered for that feature.",
          ).optional(),
        }).describe("The config for feature monitoring threshold.").optional(),
        skewThresholds: z.record(z.string(), z.unknown()).describe(
          "Key is the feature name and value is the threshold. If a feature needs to be monitored for skew, a value threshold must be configured for that feature. The threshold here is against feature distribution distance between the training and prediction feature.",
        ).optional(),
      }).describe(
        "The config for Training & Prediction data skew detection. It specifies the training dataset sources and the skew detection parameters.",
      ).optional(),
    }).describe(
      "The objective configuration for model monitoring, including the information needed to detect anomalies for one particular model.",
    ).optional(),
  })).describe(
    "Required. The config for monitoring objectives. This is a per DeployedModel config. Each DeployedModel needs to be configured separately.",
  ).optional(),
  modelDeploymentMonitoringScheduleConfig: z.object({
    monitorInterval: z.string().describe(
      "Required. The model monitoring job scheduling interval. It will be rounded up to next full hour. This defines how often the monitoring jobs are triggered.",
    ).optional(),
    monitorWindow: z.string().describe(
      "The time window of the prediction data being included in each prediction dataset. This window specifies how long the data should be collected from historical model results for each run. If not set, ModelDeploymentMonitoringScheduleConfig.monitor_interval will be used. e.g. If currently the cutoff time is 2022-01-08 14:30:00 and the monitor_window is set to be 3600, then data from 2022-01-08 13:30:00 to 2022-01-08 14:30:00 will be retrieved and aggregated to calculate the monitoring statistics.",
    ).optional(),
  }).describe("The config for scheduling monitoring job.").optional(),
  modelMonitoringAlertConfig: z.object({
    emailAlertConfig: z.object({
      userEmails: z.array(z.string()).describe(
        "The email addresses to send the alert.",
      ).optional(),
    }).describe("The config for email alert.").optional(),
    enableLogging: z.boolean().describe(
      "Dump the anomalies to Cloud Logging. The anomalies will be put to json payload encoded from proto ModelMonitoringStatsAnomalies. This can be further synced to Pub/Sub or any other services supported by Cloud Logging.",
    ).optional(),
    notificationChannels: z.array(z.string()).describe(
      "Resource names of the NotificationChannels to send alert. Must be of the format `projects//notificationChannels/`",
    ).optional(),
  }).describe("The alert config for model monitoring.").optional(),
  predictInstanceSchemaUri: z.string().describe(
    "YAML schema file uri describing the format of a single instance, which are given to format this Endpoint's prediction (and explanation). If not set, we will generate predict schema from collected predict requests.",
  ).optional(),
  samplePredictInstance: z.string().describe(
    "Sample Predict instance, same format as PredictRequest.instances, this can be set as a replacement of ModelDeploymentMonitoringJob.predict_instance_schema_uri. If not set, we will generate predict schema from collected predict requests.",
  ).optional(),
  statsAnomaliesBaseDirectory: z.object({
    outputUriPrefix: z.string().describe(
      "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
    ).optional(),
  }).describe(
    "The Google Cloud Storage location where the output is to be written to.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  analysisInstanceSchemaUri: z.string().optional(),
  bigqueryTables: z.array(z.object({
    bigqueryTablePath: z.string(),
    logSource: z.string(),
    logType: z.string(),
    requestResponseLoggingSchemaVersion: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  enableMonitoringPipelineLogs: z.boolean().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  endpoint: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  latestMonitoringPipelineMetadata: z.object({
    runTime: z.string(),
    status: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
  }).optional(),
  logTtl: z.string().optional(),
  loggingSamplingStrategy: z.object({
    randomSampleConfig: z.object({
      sampleRate: z.number(),
    }),
  }).optional(),
  modelDeploymentMonitoringObjectiveConfigs: z.array(z.object({
    deployedModelId: z.string(),
    objectiveConfig: z.object({
      explanationConfig: z.object({
        enableFeatureAttributes: z.boolean(),
        explanationBaseline: z.object({
          bigquery: z.unknown(),
          gcs: z.unknown(),
          predictionFormat: z.unknown(),
        }),
      }),
      predictionDriftDetectionConfig: z.object({
        attributionScoreDriftThresholds: z.record(z.string(), z.unknown()),
        defaultDriftThreshold: z.object({
          value: z.unknown(),
        }),
        driftThresholds: z.record(z.string(), z.unknown()),
      }),
      trainingDataset: z.object({
        bigquerySource: z.object({
          inputUri: z.unknown(),
        }),
        dataFormat: z.string(),
        dataset: z.string(),
        gcsSource: z.object({
          uris: z.unknown(),
        }),
        loggingSamplingStrategy: z.object({
          randomSampleConfig: z.unknown(),
        }),
        targetField: z.string(),
      }),
      trainingPredictionSkewDetectionConfig: z.object({
        attributionScoreSkewThresholds: z.record(z.string(), z.unknown()),
        defaultSkewThreshold: z.object({
          value: z.unknown(),
        }),
        skewThresholds: z.record(z.string(), z.unknown()),
      }),
    }),
  })).optional(),
  modelDeploymentMonitoringScheduleConfig: z.object({
    monitorInterval: z.string(),
    monitorWindow: z.string(),
  }).optional(),
  modelMonitoringAlertConfig: z.object({
    emailAlertConfig: z.object({
      userEmails: z.array(z.string()),
    }),
    enableLogging: z.boolean(),
    notificationChannels: z.array(z.string()),
  }).optional(),
  name: z.string(),
  nextScheduleTime: z.string().optional(),
  predictInstanceSchemaUri: z.string().optional(),
  samplePredictInstance: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  scheduleState: z.string().optional(),
  state: z.string().optional(),
  statsAnomaliesBaseDirectory: z.object({
    outputUriPrefix: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  analysisInstanceSchemaUri: z.string().describe(
    "YAML schema file uri describing the format of a single instance that you want Tensorflow Data Validation (TFDV) to analyze. If this field is empty, all the feature data types are inferred from predict_instance_schema_uri, meaning that TFDV will use the data in the exact format(data type) as prediction request/response. If there are any data type differences between predict instance and TFDV instance, this field can be used to override the schema. For models trained with Vertex AI, this field must be set as all the fields in predict instance formatted as string.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user-defined name of the ModelDeploymentMonitoringJob. The name can be up to 128 characters long and can consist of any UTF-8 characters. Display name of a ModelDeploymentMonitoringJob.",
  ).optional(),
  enableMonitoringPipelineLogs: z.boolean().describe(
    "If true, the scheduled monitoring pipeline logs are sent to Google Cloud Logging, including pipeline status and anomalies detected. Please note the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging#pricing).",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  endpoint: z.string().describe(
    "Required. Endpoint resource name. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize your ModelDeploymentMonitoringJob. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  latestMonitoringPipelineMetadata: z.object({
    runTime: z.string().describe(
      "The time that most recent monitoring pipelines that is related to this run.",
    ).optional(),
    status: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
  }).describe("All metadata of most recent monitoring pipelines.").optional(),
  logTtl: z.string().describe(
    "The TTL of BigQuery tables in user projects which stores logs. A day is the basic unit of the TTL and we take the ceil of TTL/86400(a day). e.g. { second: 3600} indicates ttl = 1 day.",
  ).optional(),
  loggingSamplingStrategy: z.object({
    randomSampleConfig: z.object({
      sampleRate: z.number().describe("Sample rate (0, 1]").optional(),
    }).describe("Requests are randomly selected.").optional(),
  }).describe(
    "Sampling Strategy for logging, can be for both training and prediction dataset.",
  ).optional(),
  modelDeploymentMonitoringObjectiveConfigs: z.array(z.object({
    deployedModelId: z.string().describe(
      "The DeployedModel ID of the objective config.",
    ).optional(),
    objectiveConfig: z.object({
      explanationConfig: z.object({
        enableFeatureAttributes: z.boolean().describe(
          "If want to analyze the Vertex Explainable AI feature attribute scores or not. If set to true, Vertex AI will log the feature attributions from explain response and do the skew/drift detection for them.",
        ).optional(),
        explanationBaseline: z.object({
          bigquery: z.unknown().describe(
            "The BigQuery location for the output content.",
          ).optional(),
          gcs: z.unknown().describe(
            "The Google Cloud Storage location where the output is to be written to.",
          ).optional(),
          predictionFormat: z.unknown().describe(
            "The storage format of the predictions generated BatchPrediction job.",
          ).optional(),
        }).describe(
          "Output from BatchPredictionJob for Model Monitoring baseline dataset, which can be used to generate baseline attribution scores.",
        ).optional(),
      }).describe(
        "The config for integrating with Vertex Explainable AI. Only applicable if the Model has explanation_spec populated.",
      ).optional(),
      predictionDriftDetectionConfig: z.object({
        attributionScoreDriftThresholds: z.record(z.string(), z.unknown())
          .describe(
            "Key is the feature name and value is the threshold. The threshold here is against attribution score distance between different time windows.",
          ).optional(),
        defaultDriftThreshold: z.object({
          value: z.unknown().describe(
            "Specify a threshold value that can trigger the alert. If this threshold config is for feature distribution distance: 1. For categorical feature, the distribution distance is calculated by L-inifinity norm. 2. For numerical feature, the distribution distance is calculated by Jensen–Shannon divergence. Each feature must have a non-zero threshold if they need to be monitored. Otherwise no alert will be triggered for that feature.",
          ).optional(),
        }).describe("The config for feature monitoring threshold.").optional(),
        driftThresholds: z.record(z.string(), z.unknown()).describe(
          "Key is the feature name and value is the threshold. If a feature needs to be monitored for drift, a value threshold must be configured for that feature. The threshold here is against feature distribution distance between different time windws.",
        ).optional(),
      }).describe("The config for Prediction data drift detection.").optional(),
      trainingDataset: z.object({
        bigquerySource: z.object({
          inputUri: z.unknown().describe(
            "Required. BigQuery URI to a table, up to 2000 characters long. Accepted forms: * BigQuery path. For example: `bq://projectId.bqDatasetId.bqTableId`.",
          ).optional(),
        }).describe("The BigQuery location for the input content.").optional(),
        dataFormat: z.string().describe(
          'Data format of the dataset, only applicable if the input is from Google Cloud Storage. The possible formats are: "tf-record" The source file is a TFRecord file. "csv" The source file is a CSV file. "jsonl" The source file is a JSONL file.',
        ).optional(),
        dataset: z.string().describe(
          "The resource name of the Dataset used to train this Model.",
        ).optional(),
        gcsSource: z.object({
          uris: z.unknown().describe(
            "Required. Google Cloud Storage URI(-s) to the input file(s). May contain wildcards. For more information on wildcards, see https://cloud.google.com/storage/docs/wildcards.",
          ).optional(),
        }).describe("The Google Cloud Storage location for the input content.")
          .optional(),
        loggingSamplingStrategy: z.object({
          randomSampleConfig: z.unknown().describe(
            "Requests are randomly selected.",
          ).optional(),
        }).describe(
          "Sampling Strategy for logging, can be for both training and prediction dataset.",
        ).optional(),
        targetField: z.string().describe(
          "The target field name the model is to predict. This field will be excluded when doing Predict and (or) Explain for the training data.",
        ).optional(),
      }).describe("Training Dataset information.").optional(),
      trainingPredictionSkewDetectionConfig: z.object({
        attributionScoreSkewThresholds: z.record(z.string(), z.unknown())
          .describe(
            "Key is the feature name and value is the threshold. The threshold here is against attribution score distance between the training and prediction feature.",
          ).optional(),
        defaultSkewThreshold: z.object({
          value: z.unknown().describe(
            "Specify a threshold value that can trigger the alert. If this threshold config is for feature distribution distance: 1. For categorical feature, the distribution distance is calculated by L-inifinity norm. 2. For numerical feature, the distribution distance is calculated by Jensen–Shannon divergence. Each feature must have a non-zero threshold if they need to be monitored. Otherwise no alert will be triggered for that feature.",
          ).optional(),
        }).describe("The config for feature monitoring threshold.").optional(),
        skewThresholds: z.record(z.string(), z.unknown()).describe(
          "Key is the feature name and value is the threshold. If a feature needs to be monitored for skew, a value threshold must be configured for that feature. The threshold here is against feature distribution distance between the training and prediction feature.",
        ).optional(),
      }).describe(
        "The config for Training & Prediction data skew detection. It specifies the training dataset sources and the skew detection parameters.",
      ).optional(),
    }).describe(
      "The objective configuration for model monitoring, including the information needed to detect anomalies for one particular model.",
    ).optional(),
  })).describe(
    "Required. The config for monitoring objectives. This is a per DeployedModel config. Each DeployedModel needs to be configured separately.",
  ).optional(),
  modelDeploymentMonitoringScheduleConfig: z.object({
    monitorInterval: z.string().describe(
      "Required. The model monitoring job scheduling interval. It will be rounded up to next full hour. This defines how often the monitoring jobs are triggered.",
    ).optional(),
    monitorWindow: z.string().describe(
      "The time window of the prediction data being included in each prediction dataset. This window specifies how long the data should be collected from historical model results for each run. If not set, ModelDeploymentMonitoringScheduleConfig.monitor_interval will be used. e.g. If currently the cutoff time is 2022-01-08 14:30:00 and the monitor_window is set to be 3600, then data from 2022-01-08 13:30:00 to 2022-01-08 14:30:00 will be retrieved and aggregated to calculate the monitoring statistics.",
    ).optional(),
  }).describe("The config for scheduling monitoring job.").optional(),
  modelMonitoringAlertConfig: z.object({
    emailAlertConfig: z.object({
      userEmails: z.array(z.string()).describe(
        "The email addresses to send the alert.",
      ).optional(),
    }).describe("The config for email alert.").optional(),
    enableLogging: z.boolean().describe(
      "Dump the anomalies to Cloud Logging. The anomalies will be put to json payload encoded from proto ModelMonitoringStatsAnomalies. This can be further synced to Pub/Sub or any other services supported by Cloud Logging.",
    ).optional(),
    notificationChannels: z.array(z.string()).describe(
      "Resource names of the NotificationChannels to send alert. Must be of the format `projects//notificationChannels/`",
    ).optional(),
  }).describe("The alert config for model monitoring.").optional(),
  predictInstanceSchemaUri: z.string().describe(
    "YAML schema file uri describing the format of a single instance, which are given to format this Endpoint's prediction (and explanation). If not set, we will generate predict schema from collected predict requests.",
  ).optional(),
  samplePredictInstance: z.string().describe(
    "Sample Predict instance, same format as PredictRequest.instances, this can be set as a replacement of ModelDeploymentMonitoringJob.predict_instance_schema_uri. If not set, we will generate predict schema from collected predict requests.",
  ).optional(),
  statsAnomaliesBaseDirectory: z.object({
    outputUriPrefix: z.string().describe(
      "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
    ).optional(),
  }).describe(
    "The Google Cloud Storage location where the output is to be written to.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform ModelDeploymentMonitoringJobs. Registered at `@swamp/gcp/aiplatform/modeldeploymentmonitoringjobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/modeldeploymentmonitoringjobs",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a job that runs periodically to monitor the deployed models in an ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a modelDeploymentMonitoringJobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["analysisInstanceSchemaUri"] !== undefined) {
          body["analysisInstanceSchemaUri"] = g["analysisInstanceSchemaUri"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableMonitoringPipelineLogs"] !== undefined) {
          body["enableMonitoringPipelineLogs"] =
            g["enableMonitoringPipelineLogs"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["endpoint"] !== undefined) body["endpoint"] = g["endpoint"];
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["latestMonitoringPipelineMetadata"] !== undefined) {
          body["latestMonitoringPipelineMetadata"] =
            g["latestMonitoringPipelineMetadata"];
        }
        if (g["logTtl"] !== undefined) body["logTtl"] = g["logTtl"];
        if (g["loggingSamplingStrategy"] !== undefined) {
          body["loggingSamplingStrategy"] = g["loggingSamplingStrategy"];
        }
        if (g["modelDeploymentMonitoringObjectiveConfigs"] !== undefined) {
          body["modelDeploymentMonitoringObjectiveConfigs"] =
            g["modelDeploymentMonitoringObjectiveConfigs"];
        }
        if (g["modelDeploymentMonitoringScheduleConfig"] !== undefined) {
          body["modelDeploymentMonitoringScheduleConfig"] =
            g["modelDeploymentMonitoringScheduleConfig"];
        }
        if (g["modelMonitoringAlertConfig"] !== undefined) {
          body["modelMonitoringAlertConfig"] = g["modelMonitoringAlertConfig"];
        }
        if (g["predictInstanceSchemaUri"] !== undefined) {
          body["predictInstanceSchemaUri"] = g["predictInstanceSchemaUri"];
        }
        if (g["samplePredictInstance"] !== undefined) {
          body["samplePredictInstance"] = g["samplePredictInstance"];
        }
        if (g["statsAnomaliesBaseDirectory"] !== undefined) {
          body["statsAnomaliesBaseDirectory"] =
            g["statsAnomaliesBaseDirectory"];
        }
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
      description: "Get a modelDeploymentMonitoringJobs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the modelDeploymentMonitoringJobs",
        ),
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
    update: {
      description: "Update modelDeploymentMonitoringJobs attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["analysisInstanceSchemaUri"] !== undefined) {
          body["analysisInstanceSchemaUri"] = g["analysisInstanceSchemaUri"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableMonitoringPipelineLogs"] !== undefined) {
          body["enableMonitoringPipelineLogs"] =
            g["enableMonitoringPipelineLogs"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["endpoint"] !== undefined) body["endpoint"] = g["endpoint"];
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["latestMonitoringPipelineMetadata"] !== undefined) {
          body["latestMonitoringPipelineMetadata"] =
            g["latestMonitoringPipelineMetadata"];
        }
        if (g["logTtl"] !== undefined) body["logTtl"] = g["logTtl"];
        if (g["loggingSamplingStrategy"] !== undefined) {
          body["loggingSamplingStrategy"] = g["loggingSamplingStrategy"];
        }
        if (g["modelDeploymentMonitoringObjectiveConfigs"] !== undefined) {
          body["modelDeploymentMonitoringObjectiveConfigs"] =
            g["modelDeploymentMonitoringObjectiveConfigs"];
        }
        if (g["modelDeploymentMonitoringScheduleConfig"] !== undefined) {
          body["modelDeploymentMonitoringScheduleConfig"] =
            g["modelDeploymentMonitoringScheduleConfig"];
        }
        if (g["modelMonitoringAlertConfig"] !== undefined) {
          body["modelMonitoringAlertConfig"] = g["modelMonitoringAlertConfig"];
        }
        if (g["predictInstanceSchemaUri"] !== undefined) {
          body["predictInstanceSchemaUri"] = g["predictInstanceSchemaUri"];
        }
        if (g["samplePredictInstance"] !== undefined) {
          body["samplePredictInstance"] = g["samplePredictInstance"];
        }
        if (g["statsAnomaliesBaseDirectory"] !== undefined) {
          body["statsAnomaliesBaseDirectory"] =
            g["statsAnomaliesBaseDirectory"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the modelDeploymentMonitoringJobs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the modelDeploymentMonitoringJobs",
        ),
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
      description: "Sync modelDeploymentMonitoringJobs state from GCP",
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
    pause: {
      description: "pause",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.modelDeploymentMonitoringJobs.pause",
            "path": "v1/{+name}:pause",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.modelDeploymentMonitoringJobs.resume",
            "path": "v1/{+name}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_model_deployment_monitoring_stats_anomalies: {
      description: "search model deployment monitoring stats anomalies",
      arguments: z.object({
        deployedModelId: z.any().optional(),
        endTime: z.any().optional(),
        featureDisplayName: z.any().optional(),
        objectives: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        startTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["modelDeploymentMonitoringJob"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deployedModelId"] !== undefined) {
          body["deployedModelId"] = args["deployedModelId"];
        }
        if (args["endTime"] !== undefined) body["endTime"] = args["endTime"];
        if (args["featureDisplayName"] !== undefined) {
          body["featureDisplayName"] = args["featureDisplayName"];
        }
        if (args["objectives"] !== undefined) {
          body["objectives"] = args["objectives"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["startTime"] !== undefined) {
          body["startTime"] = args["startTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.modelDeploymentMonitoringJobs.searchModelDeploymentMonitoringStatsAnomalies",
            "path":
              "v1/{+modelDeploymentMonitoringJob}:searchModelDeploymentMonitoringStatsAnomalies",
            "httpMethod": "POST",
            "parameterOrder": ["modelDeploymentMonitoringJob"],
            "parameters": {
              "modelDeploymentMonitoringJob": {
                "location": "path",
                "required": true,
              },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
