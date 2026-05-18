// Auto-generated extension model for @swamp/gcp/datalabeling/evaluationjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Labeling EvaluationJobs.
 *
 * Defines an evaluation job that runs periodically to generate Evaluations. [Creating an evaluation job](/ml-engine/docs/continuous-evaluation/create-job) is the starting point for using continuous evaluation.
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
  return `${parent}/evaluationJobs/${shortName}`;
}

const BASE_URL = "https://datalabeling.googleapis.com/";

const GET_CONFIG = {
  "id": "datalabeling.projects.evaluationJobs.get",
  "path": "v1beta1/{+name}",
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
  "id": "datalabeling.projects.evaluationJobs.create",
  "path": "v1beta1/{+parent}/evaluationJobs",
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
  "id": "datalabeling.projects.evaluationJobs.patch",
  "path": "v1beta1/{+name}",
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
  "id": "datalabeling.projects.evaluationJobs.delete",
  "path": "v1beta1/{+name}",
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
  job: z.object({
    annotationSpecSet: z.string().describe(
      'Required. Name of the AnnotationSpecSet describing all the labels that your machine learning model outputs. You must create this resource before you create an evaluation job and provide its name in the following format: "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}"',
    ).optional(),
    attempts: z.array(z.object({
      attemptTime: z.string().optional(),
      partialFailures: z.array(z.object({
        code: z.unknown().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.unknown().describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.unknown().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      })).describe("Details of errors that occurred.").optional(),
    })).describe(
      "Output only. Every time the evaluation job runs and an error occurs, the failed attempt is appended to this array.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp of when this evaluation job was created.",
    ).optional(),
    description: z.string().describe(
      "Required. Description of the job. The description can be up to 25,000 characters long.",
    ).optional(),
    evaluationJobConfig: z.object({
      bigqueryImportKeys: z.record(z.string(), z.string()).describe(
        "Required. Prediction keys that tell Data Labeling Service where to find the data for evaluation in your BigQuery table. When the service samples prediction input and output from your model version and saves it to BigQuery, the data gets stored as JSON strings in the BigQuery table. These keys tell Data Labeling Service how to parse the JSON. You can provide the following entries in this field: * `data_json_key`: the data key for prediction input. You must provide either this key or `reference_json_key`. * `reference_json_key`: the data reference key for prediction input. You must provide either this key or `data_json_key`. * `label_json_key`: the label key for prediction output. Required. * `label_score_json_key`: the score key for prediction output. Required. * `bounding_box_json_key`: the bounding box key for prediction output. Required if your model version perform image object detection. Learn [how to configure prediction keys](/ml-engine/docs/continuous-evaluation/create-job#prediction-keys).",
      ).optional(),
      boundingPolyConfig: z.object({
        annotationSpecSet: z.string().describe(
          "Required. Annotation spec set resource name.",
        ).optional(),
        instructionMessage: z.string().describe(
          "Optional. Instruction message showed on contributors UI.",
        ).optional(),
      }).describe(
        "Config for image bounding poly (and bounding box) human labeling task.",
      ).optional(),
      evaluationConfig: z.object({
        boundingBoxEvaluationOptions: z.object({
          iouThreshold: z.number().describe(
            "Minimum [intersection-over-union (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union) required for 2 bounding boxes to be considered a match. This must be a number between 0 and 1.",
          ).optional(),
        }).describe("Options regarding evaluation between bounding boxes.")
          .optional(),
      }).describe(
        "Configuration details used for calculating evaluation metrics and creating an Evaluation.",
      ).optional(),
      evaluationJobAlertConfig: z.object({
        email: z.string().describe(
          "Required. An email address to send alerts to.",
        ).optional(),
        minAcceptableMeanAveragePrecision: z.number().describe(
          "Required. A number between 0 and 1 that describes a minimum mean average precision threshold. When the evaluation job runs, if it calculates that your model version's predictions from the recent interval have meanAveragePrecision below this threshold, then it sends an alert to your specified email.",
        ).optional(),
      }).describe(
        "Provides details for how an evaluation job sends email alerts based on the results of a run.",
      ).optional(),
      exampleCount: z.number().int().describe(
        "Required. The maximum number of predictions to sample and save to BigQuery during each evaluation interval. This limit overrides `example_sample_percentage`: even if the service has not sampled enough predictions to fulfill `example_sample_perecentage` during an interval, it stops sampling predictions when it meets this limit.",
      ).optional(),
      exampleSamplePercentage: z.number().describe(
        "Required. Fraction of predictions to sample and save to BigQuery during each evaluation interval. For example, 0.1 means 10% of predictions served by your model version get saved to BigQuery.",
      ).optional(),
      humanAnnotationConfig: z.object({
        annotatedDatasetDescription: z.string().describe(
          "Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long.",
        ).optional(),
        annotatedDatasetDisplayName: z.string().describe(
          "Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters.",
        ).optional(),
        contributorEmails: z.array(z.string()).describe(
          "Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/",
        ).optional(),
        instruction: z.string().describe("Required. Instruction resource name.")
          .optional(),
        labelGroup: z.string().describe(
          "Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\\\d_-]{0,128}`.",
        ).optional(),
        languageCode: z.string().describe(
          "Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification.",
        ).optional(),
        questionDuration: z.string().describe(
          "Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds.",
        ).optional(),
        replicaCount: z.number().int().describe(
          "Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5.",
        ).optional(),
        userEmailAddress: z.string().describe(
          "Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent.",
        ).optional(),
      }).describe("Configuration for how human labeling task should be done.")
        .optional(),
      imageClassificationConfig: z.object({
        allowMultiLabel: z.boolean().describe(
          "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one image.",
        ).optional(),
        annotationSpecSet: z.string().describe(
          "Required. Annotation spec set resource name.",
        ).optional(),
        answerAggregationType: z.enum([
          "STRING_AGGREGATION_TYPE_UNSPECIFIED",
          "MAJORITY_VOTE",
          "UNANIMOUS_VOTE",
          "NO_AGGREGATION",
        ]).describe("Optional. The type of how to aggregate answers.")
          .optional(),
      }).describe("Config for image classification human labeling task.")
        .optional(),
      inputConfig: z.object({
        annotationType: z.enum([
          "ANNOTATION_TYPE_UNSPECIFIED",
          "IMAGE_CLASSIFICATION_ANNOTATION",
          "IMAGE_BOUNDING_BOX_ANNOTATION",
          "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION",
          "IMAGE_BOUNDING_POLY_ANNOTATION",
          "IMAGE_POLYLINE_ANNOTATION",
          "IMAGE_SEGMENTATION_ANNOTATION",
          "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION",
          "VIDEO_OBJECT_TRACKING_ANNOTATION",
          "VIDEO_OBJECT_DETECTION_ANNOTATION",
          "VIDEO_EVENT_ANNOTATION",
          "TEXT_CLASSIFICATION_ANNOTATION",
          "TEXT_ENTITY_EXTRACTION_ANNOTATION",
          "GENERAL_CLASSIFICATION_ANNOTATION",
        ]).describe(
          "Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob.",
        ).optional(),
        bigquerySource: z.object({
          inputUri: z.string().describe(
            'Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).',
          ).optional(),
        }).describe(
          "The BigQuery location for input data. If used in an EvaluationJob, this is where the service saves the prediction input and output sampled from the model version.",
        ).optional(),
        classificationMetadata: z.object({
          isMultiLabel: z.boolean().describe(
            "Whether the classification task is multi-label or not.",
          ).optional(),
        }).describe("Metadata for classification annotations.").optional(),
        dataType: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "IMAGE",
          "VIDEO",
          "TEXT",
          "GENERAL_DATA",
        ]).describe(
          "Required. Data type must be specifed when user tries to import data.",
        ).optional(),
        gcsSource: z.object({
          inputUri: z.string().describe(
            "Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`).",
          ).optional(),
          mimeType: z.string().describe(
            'Required. The format of the source file. Only "text/csv" is supported.',
          ).optional(),
        }).describe("Source of the Cloud Storage file to be imported.")
          .optional(),
        textMetadata: z.object({
          languageCode: z.string().describe(
            "The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US.",
          ).optional(),
        }).describe("Metadata for the text.").optional(),
      }).describe(
        "The configuration of input data, including data type, location, etc.",
      ).optional(),
      textClassificationConfig: z.object({
        allowMultiLabel: z.boolean().describe(
          "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one text segment.",
        ).optional(),
        annotationSpecSet: z.string().describe(
          "Required. Annotation spec set resource name.",
        ).optional(),
        sentimentConfig: z.object({
          enableLabelSentimentSelection: z.boolean().describe(
            "If set to true, contributors will have the option to select sentiment of the label they selected, to mark it as negative or positive label. Default is false.",
          ).optional(),
        }).describe("Config for setting up sentiments.").optional(),
      }).describe("Config for text classification human labeling task.")
        .optional(),
    }).describe(
      "Configures specific details of how a continuous evaluation job works. Provide this configuration when you create an EvaluationJob.",
    ).optional(),
    labelMissingGroundTruth: z.boolean().describe(
      "Required. Whether you want Data Labeling Service to provide ground truth labels for prediction input. If you want the service to assign human labelers to annotate your data, set this to `true`. If you want to provide your own ground truth labels in the evaluation job's BigQuery table, set this to `false`.",
    ).optional(),
    modelVersion: z.string().describe(
      'Required. The [AI Platform Prediction model version](/ml-engine/docs/prediction-overview) to be evaluated. Prediction input and output is sampled from this model version. When creating an evaluation job, specify the model version in the following format: "projects/{project_id}/models/{model_name}/versions/{version_name}" There can only be one evaluation job per model version.',
    ).optional(),
    name: z.string().describe(
      'Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}"',
    ).optional(),
    schedule: z.string().describe(
      "Required. Describes the interval at which the job runs. This interval must be at least 1 day, and it is rounded to the nearest day. For example, if you specify a 50-hour interval, the job runs every 2 days. You can provide the schedule in [crontab format](/scheduler/docs/configuring/cron-job-schedules) or in an [English-like format](/appengine/docs/standard/python/config/cronref#schedule_format). Regardless of what you specify, the job will run at 10:00 AM UTC. Only the interval from this schedule is used, not the specific time of day.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "SCHEDULED",
      "RUNNING",
      "PAUSED",
      "STOPPED",
    ]).describe("Output only. Describes the current state of the job.")
      .optional(),
  }).describe(
    "Defines an evaluation job that runs periodically to generate Evaluations. [Creating an evaluation job](/ml-engine/docs/continuous-evaluation/create-job) is the starting point for using continuous evaluation.",
  ).optional(),
  annotationSpecSet: z.string().describe(
    'Required. Name of the AnnotationSpecSet describing all the labels that your machine learning model outputs. You must create this resource before you create an evaluation job and provide its name in the following format: "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}"',
  ).optional(),
  attempts: z.array(z.object({
    attemptTime: z.string().optional(),
    partialFailures: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.unknown()).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe("Details of errors that occurred.").optional(),
  })).describe(
    "Output only. Every time the evaluation job runs and an error occurs, the failed attempt is appended to this array.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Timestamp of when this evaluation job was created.",
  ).optional(),
  description: z.string().describe(
    "Required. Description of the job. The description can be up to 25,000 characters long.",
  ).optional(),
  evaluationJobConfig: z.object({
    bigqueryImportKeys: z.record(z.string(), z.string()).describe(
      "Required. Prediction keys that tell Data Labeling Service where to find the data for evaluation in your BigQuery table. When the service samples prediction input and output from your model version and saves it to BigQuery, the data gets stored as JSON strings in the BigQuery table. These keys tell Data Labeling Service how to parse the JSON. You can provide the following entries in this field: * `data_json_key`: the data key for prediction input. You must provide either this key or `reference_json_key`. * `reference_json_key`: the data reference key for prediction input. You must provide either this key or `data_json_key`. * `label_json_key`: the label key for prediction output. Required. * `label_score_json_key`: the score key for prediction output. Required. * `bounding_box_json_key`: the bounding box key for prediction output. Required if your model version perform image object detection. Learn [how to configure prediction keys](/ml-engine/docs/continuous-evaluation/create-job#prediction-keys).",
    ).optional(),
    boundingPolyConfig: z.object({
      annotationSpecSet: z.string().describe(
        "Required. Annotation spec set resource name.",
      ).optional(),
      instructionMessage: z.string().describe(
        "Optional. Instruction message showed on contributors UI.",
      ).optional(),
    }).describe(
      "Config for image bounding poly (and bounding box) human labeling task.",
    ).optional(),
    evaluationConfig: z.object({
      boundingBoxEvaluationOptions: z.object({
        iouThreshold: z.number().describe(
          "Minimum [intersection-over-union (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union) required for 2 bounding boxes to be considered a match. This must be a number between 0 and 1.",
        ).optional(),
      }).describe("Options regarding evaluation between bounding boxes.")
        .optional(),
    }).describe(
      "Configuration details used for calculating evaluation metrics and creating an Evaluation.",
    ).optional(),
    evaluationJobAlertConfig: z.object({
      email: z.string().describe(
        "Required. An email address to send alerts to.",
      ).optional(),
      minAcceptableMeanAveragePrecision: z.number().describe(
        "Required. A number between 0 and 1 that describes a minimum mean average precision threshold. When the evaluation job runs, if it calculates that your model version's predictions from the recent interval have meanAveragePrecision below this threshold, then it sends an alert to your specified email.",
      ).optional(),
    }).describe(
      "Provides details for how an evaluation job sends email alerts based on the results of a run.",
    ).optional(),
    exampleCount: z.number().int().describe(
      "Required. The maximum number of predictions to sample and save to BigQuery during each evaluation interval. This limit overrides `example_sample_percentage`: even if the service has not sampled enough predictions to fulfill `example_sample_perecentage` during an interval, it stops sampling predictions when it meets this limit.",
    ).optional(),
    exampleSamplePercentage: z.number().describe(
      "Required. Fraction of predictions to sample and save to BigQuery during each evaluation interval. For example, 0.1 means 10% of predictions served by your model version get saved to BigQuery.",
    ).optional(),
    humanAnnotationConfig: z.object({
      annotatedDatasetDescription: z.string().describe(
        "Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long.",
      ).optional(),
      annotatedDatasetDisplayName: z.string().describe(
        "Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters.",
      ).optional(),
      contributorEmails: z.array(z.string()).describe(
        "Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/",
      ).optional(),
      instruction: z.string().describe("Required. Instruction resource name.")
        .optional(),
      labelGroup: z.string().describe(
        "Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\\\d_-]{0,128}`.",
      ).optional(),
      languageCode: z.string().describe(
        "Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification.",
      ).optional(),
      questionDuration: z.string().describe(
        "Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds.",
      ).optional(),
      replicaCount: z.number().int().describe(
        "Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5.",
      ).optional(),
      userEmailAddress: z.string().describe(
        "Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent.",
      ).optional(),
    }).describe("Configuration for how human labeling task should be done.")
      .optional(),
    imageClassificationConfig: z.object({
      allowMultiLabel: z.boolean().describe(
        "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one image.",
      ).optional(),
      annotationSpecSet: z.string().describe(
        "Required. Annotation spec set resource name.",
      ).optional(),
      answerAggregationType: z.enum([
        "STRING_AGGREGATION_TYPE_UNSPECIFIED",
        "MAJORITY_VOTE",
        "UNANIMOUS_VOTE",
        "NO_AGGREGATION",
      ]).describe("Optional. The type of how to aggregate answers.").optional(),
    }).describe("Config for image classification human labeling task.")
      .optional(),
    inputConfig: z.object({
      annotationType: z.enum([
        "ANNOTATION_TYPE_UNSPECIFIED",
        "IMAGE_CLASSIFICATION_ANNOTATION",
        "IMAGE_BOUNDING_BOX_ANNOTATION",
        "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION",
        "IMAGE_BOUNDING_POLY_ANNOTATION",
        "IMAGE_POLYLINE_ANNOTATION",
        "IMAGE_SEGMENTATION_ANNOTATION",
        "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION",
        "VIDEO_OBJECT_TRACKING_ANNOTATION",
        "VIDEO_OBJECT_DETECTION_ANNOTATION",
        "VIDEO_EVENT_ANNOTATION",
        "TEXT_CLASSIFICATION_ANNOTATION",
        "TEXT_ENTITY_EXTRACTION_ANNOTATION",
        "GENERAL_CLASSIFICATION_ANNOTATION",
      ]).describe(
        "Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob.",
      ).optional(),
      bigquerySource: z.object({
        inputUri: z.string().describe(
          'Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).',
        ).optional(),
      }).describe(
        "The BigQuery location for input data. If used in an EvaluationJob, this is where the service saves the prediction input and output sampled from the model version.",
      ).optional(),
      classificationMetadata: z.object({
        isMultiLabel: z.boolean().describe(
          "Whether the classification task is multi-label or not.",
        ).optional(),
      }).describe("Metadata for classification annotations.").optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "IMAGE",
        "VIDEO",
        "TEXT",
        "GENERAL_DATA",
      ]).describe(
        "Required. Data type must be specifed when user tries to import data.",
      ).optional(),
      gcsSource: z.object({
        inputUri: z.string().describe(
          "Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`).",
        ).optional(),
        mimeType: z.string().describe(
          'Required. The format of the source file. Only "text/csv" is supported.',
        ).optional(),
      }).describe("Source of the Cloud Storage file to be imported.")
        .optional(),
      textMetadata: z.object({
        languageCode: z.string().describe(
          "The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US.",
        ).optional(),
      }).describe("Metadata for the text.").optional(),
    }).describe(
      "The configuration of input data, including data type, location, etc.",
    ).optional(),
    textClassificationConfig: z.object({
      allowMultiLabel: z.boolean().describe(
        "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one text segment.",
      ).optional(),
      annotationSpecSet: z.string().describe(
        "Required. Annotation spec set resource name.",
      ).optional(),
      sentimentConfig: z.object({
        enableLabelSentimentSelection: z.boolean().describe(
          "If set to true, contributors will have the option to select sentiment of the label they selected, to mark it as negative or positive label. Default is false.",
        ).optional(),
      }).describe("Config for setting up sentiments.").optional(),
    }).describe("Config for text classification human labeling task.")
      .optional(),
  }).describe(
    "Configures specific details of how a continuous evaluation job works. Provide this configuration when you create an EvaluationJob.",
  ).optional(),
  labelMissingGroundTruth: z.boolean().describe(
    "Required. Whether you want Data Labeling Service to provide ground truth labels for prediction input. If you want the service to assign human labelers to annotate your data, set this to `true`. If you want to provide your own ground truth labels in the evaluation job's BigQuery table, set this to `false`.",
  ).optional(),
  modelVersion: z.string().describe(
    'Required. The [AI Platform Prediction model version](/ml-engine/docs/prediction-overview) to be evaluated. Prediction input and output is sampled from this model version. When creating an evaluation job, specify the model version in the following format: "projects/{project_id}/models/{model_name}/versions/{version_name}" There can only be one evaluation job per model version.',
  ).optional(),
  name: z.string().describe(
    'Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}"',
  ).optional(),
  schedule: z.string().describe(
    "Required. Describes the interval at which the job runs. This interval must be at least 1 day, and it is rounded to the nearest day. For example, if you specify a 50-hour interval, the job runs every 2 days. You can provide the schedule in [crontab format](/scheduler/docs/configuring/cron-job-schedules) or in an [English-like format](/appengine/docs/standard/python/config/cronref#schedule_format). Regardless of what you specify, the job will run at 10:00 AM UTC. Only the interval from this schedule is used, not the specific time of day.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "SCHEDULED",
    "RUNNING",
    "PAUSED",
    "STOPPED",
  ]).describe("Output only. Describes the current state of the job.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotationSpecSet: z.string().optional(),
  attempts: z.array(z.object({
    attemptTime: z.string(),
    partialFailures: z.array(z.object({
      code: z.number(),
      details: z.array(z.unknown()),
      message: z.string(),
    })),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  evaluationJobConfig: z.object({
    bigqueryImportKeys: z.record(z.string(), z.unknown()),
    boundingPolyConfig: z.object({
      annotationSpecSet: z.string(),
      instructionMessage: z.string(),
    }),
    evaluationConfig: z.object({
      boundingBoxEvaluationOptions: z.object({
        iouThreshold: z.number(),
      }),
    }),
    evaluationJobAlertConfig: z.object({
      email: z.string(),
      minAcceptableMeanAveragePrecision: z.number(),
    }),
    exampleCount: z.number(),
    exampleSamplePercentage: z.number(),
    humanAnnotationConfig: z.object({
      annotatedDatasetDescription: z.string(),
      annotatedDatasetDisplayName: z.string(),
      contributorEmails: z.array(z.string()),
      instruction: z.string(),
      labelGroup: z.string(),
      languageCode: z.string(),
      questionDuration: z.string(),
      replicaCount: z.number(),
      userEmailAddress: z.string(),
    }),
    imageClassificationConfig: z.object({
      allowMultiLabel: z.boolean(),
      annotationSpecSet: z.string(),
      answerAggregationType: z.string(),
    }),
    inputConfig: z.object({
      annotationType: z.string(),
      bigquerySource: z.object({
        inputUri: z.string(),
      }),
      classificationMetadata: z.object({
        isMultiLabel: z.boolean(),
      }),
      dataType: z.string(),
      gcsSource: z.object({
        inputUri: z.string(),
        mimeType: z.string(),
      }),
      textMetadata: z.object({
        languageCode: z.string(),
      }),
    }),
    textClassificationConfig: z.object({
      allowMultiLabel: z.boolean(),
      annotationSpecSet: z.string(),
      sentimentConfig: z.object({
        enableLabelSentimentSelection: z.boolean(),
      }),
    }),
  }).optional(),
  labelMissingGroundTruth: z.boolean().optional(),
  modelVersion: z.string().optional(),
  name: z.string(),
  schedule: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  job: z.object({
    annotationSpecSet: z.string().describe(
      'Required. Name of the AnnotationSpecSet describing all the labels that your machine learning model outputs. You must create this resource before you create an evaluation job and provide its name in the following format: "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}"',
    ).optional(),
    attempts: z.array(z.object({
      attemptTime: z.string().optional(),
      partialFailures: z.array(z.object({
        code: z.unknown().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.unknown().describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.unknown().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      })).describe("Details of errors that occurred.").optional(),
    })).describe(
      "Output only. Every time the evaluation job runs and an error occurs, the failed attempt is appended to this array.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp of when this evaluation job was created.",
    ).optional(),
    description: z.string().describe(
      "Required. Description of the job. The description can be up to 25,000 characters long.",
    ).optional(),
    evaluationJobConfig: z.object({
      bigqueryImportKeys: z.record(z.string(), z.string()).describe(
        "Required. Prediction keys that tell Data Labeling Service where to find the data for evaluation in your BigQuery table. When the service samples prediction input and output from your model version and saves it to BigQuery, the data gets stored as JSON strings in the BigQuery table. These keys tell Data Labeling Service how to parse the JSON. You can provide the following entries in this field: * `data_json_key`: the data key for prediction input. You must provide either this key or `reference_json_key`. * `reference_json_key`: the data reference key for prediction input. You must provide either this key or `data_json_key`. * `label_json_key`: the label key for prediction output. Required. * `label_score_json_key`: the score key for prediction output. Required. * `bounding_box_json_key`: the bounding box key for prediction output. Required if your model version perform image object detection. Learn [how to configure prediction keys](/ml-engine/docs/continuous-evaluation/create-job#prediction-keys).",
      ).optional(),
      boundingPolyConfig: z.object({
        annotationSpecSet: z.string().describe(
          "Required. Annotation spec set resource name.",
        ).optional(),
        instructionMessage: z.string().describe(
          "Optional. Instruction message showed on contributors UI.",
        ).optional(),
      }).describe(
        "Config for image bounding poly (and bounding box) human labeling task.",
      ).optional(),
      evaluationConfig: z.object({
        boundingBoxEvaluationOptions: z.object({
          iouThreshold: z.number().describe(
            "Minimum [intersection-over-union (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union) required for 2 bounding boxes to be considered a match. This must be a number between 0 and 1.",
          ).optional(),
        }).describe("Options regarding evaluation between bounding boxes.")
          .optional(),
      }).describe(
        "Configuration details used for calculating evaluation metrics and creating an Evaluation.",
      ).optional(),
      evaluationJobAlertConfig: z.object({
        email: z.string().describe(
          "Required. An email address to send alerts to.",
        ).optional(),
        minAcceptableMeanAveragePrecision: z.number().describe(
          "Required. A number between 0 and 1 that describes a minimum mean average precision threshold. When the evaluation job runs, if it calculates that your model version's predictions from the recent interval have meanAveragePrecision below this threshold, then it sends an alert to your specified email.",
        ).optional(),
      }).describe(
        "Provides details for how an evaluation job sends email alerts based on the results of a run.",
      ).optional(),
      exampleCount: z.number().int().describe(
        "Required. The maximum number of predictions to sample and save to BigQuery during each evaluation interval. This limit overrides `example_sample_percentage`: even if the service has not sampled enough predictions to fulfill `example_sample_perecentage` during an interval, it stops sampling predictions when it meets this limit.",
      ).optional(),
      exampleSamplePercentage: z.number().describe(
        "Required. Fraction of predictions to sample and save to BigQuery during each evaluation interval. For example, 0.1 means 10% of predictions served by your model version get saved to BigQuery.",
      ).optional(),
      humanAnnotationConfig: z.object({
        annotatedDatasetDescription: z.string().describe(
          "Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long.",
        ).optional(),
        annotatedDatasetDisplayName: z.string().describe(
          "Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters.",
        ).optional(),
        contributorEmails: z.array(z.string()).describe(
          "Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/",
        ).optional(),
        instruction: z.string().describe("Required. Instruction resource name.")
          .optional(),
        labelGroup: z.string().describe(
          "Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\\\d_-]{0,128}`.",
        ).optional(),
        languageCode: z.string().describe(
          "Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification.",
        ).optional(),
        questionDuration: z.string().describe(
          "Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds.",
        ).optional(),
        replicaCount: z.number().int().describe(
          "Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5.",
        ).optional(),
        userEmailAddress: z.string().describe(
          "Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent.",
        ).optional(),
      }).describe("Configuration for how human labeling task should be done.")
        .optional(),
      imageClassificationConfig: z.object({
        allowMultiLabel: z.boolean().describe(
          "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one image.",
        ).optional(),
        annotationSpecSet: z.string().describe(
          "Required. Annotation spec set resource name.",
        ).optional(),
        answerAggregationType: z.enum([
          "STRING_AGGREGATION_TYPE_UNSPECIFIED",
          "MAJORITY_VOTE",
          "UNANIMOUS_VOTE",
          "NO_AGGREGATION",
        ]).describe("Optional. The type of how to aggregate answers.")
          .optional(),
      }).describe("Config for image classification human labeling task.")
        .optional(),
      inputConfig: z.object({
        annotationType: z.enum([
          "ANNOTATION_TYPE_UNSPECIFIED",
          "IMAGE_CLASSIFICATION_ANNOTATION",
          "IMAGE_BOUNDING_BOX_ANNOTATION",
          "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION",
          "IMAGE_BOUNDING_POLY_ANNOTATION",
          "IMAGE_POLYLINE_ANNOTATION",
          "IMAGE_SEGMENTATION_ANNOTATION",
          "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION",
          "VIDEO_OBJECT_TRACKING_ANNOTATION",
          "VIDEO_OBJECT_DETECTION_ANNOTATION",
          "VIDEO_EVENT_ANNOTATION",
          "TEXT_CLASSIFICATION_ANNOTATION",
          "TEXT_ENTITY_EXTRACTION_ANNOTATION",
          "GENERAL_CLASSIFICATION_ANNOTATION",
        ]).describe(
          "Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob.",
        ).optional(),
        bigquerySource: z.object({
          inputUri: z.string().describe(
            'Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).',
          ).optional(),
        }).describe(
          "The BigQuery location for input data. If used in an EvaluationJob, this is where the service saves the prediction input and output sampled from the model version.",
        ).optional(),
        classificationMetadata: z.object({
          isMultiLabel: z.boolean().describe(
            "Whether the classification task is multi-label or not.",
          ).optional(),
        }).describe("Metadata for classification annotations.").optional(),
        dataType: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "IMAGE",
          "VIDEO",
          "TEXT",
          "GENERAL_DATA",
        ]).describe(
          "Required. Data type must be specifed when user tries to import data.",
        ).optional(),
        gcsSource: z.object({
          inputUri: z.string().describe(
            "Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`).",
          ).optional(),
          mimeType: z.string().describe(
            'Required. The format of the source file. Only "text/csv" is supported.',
          ).optional(),
        }).describe("Source of the Cloud Storage file to be imported.")
          .optional(),
        textMetadata: z.object({
          languageCode: z.string().describe(
            "The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US.",
          ).optional(),
        }).describe("Metadata for the text.").optional(),
      }).describe(
        "The configuration of input data, including data type, location, etc.",
      ).optional(),
      textClassificationConfig: z.object({
        allowMultiLabel: z.boolean().describe(
          "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one text segment.",
        ).optional(),
        annotationSpecSet: z.string().describe(
          "Required. Annotation spec set resource name.",
        ).optional(),
        sentimentConfig: z.object({
          enableLabelSentimentSelection: z.boolean().describe(
            "If set to true, contributors will have the option to select sentiment of the label they selected, to mark it as negative or positive label. Default is false.",
          ).optional(),
        }).describe("Config for setting up sentiments.").optional(),
      }).describe("Config for text classification human labeling task.")
        .optional(),
    }).describe(
      "Configures specific details of how a continuous evaluation job works. Provide this configuration when you create an EvaluationJob.",
    ).optional(),
    labelMissingGroundTruth: z.boolean().describe(
      "Required. Whether you want Data Labeling Service to provide ground truth labels for prediction input. If you want the service to assign human labelers to annotate your data, set this to `true`. If you want to provide your own ground truth labels in the evaluation job's BigQuery table, set this to `false`.",
    ).optional(),
    modelVersion: z.string().describe(
      'Required. The [AI Platform Prediction model version](/ml-engine/docs/prediction-overview) to be evaluated. Prediction input and output is sampled from this model version. When creating an evaluation job, specify the model version in the following format: "projects/{project_id}/models/{model_name}/versions/{version_name}" There can only be one evaluation job per model version.',
    ).optional(),
    name: z.string().describe(
      'Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}"',
    ).optional(),
    schedule: z.string().describe(
      "Required. Describes the interval at which the job runs. This interval must be at least 1 day, and it is rounded to the nearest day. For example, if you specify a 50-hour interval, the job runs every 2 days. You can provide the schedule in [crontab format](/scheduler/docs/configuring/cron-job-schedules) or in an [English-like format](/appengine/docs/standard/python/config/cronref#schedule_format). Regardless of what you specify, the job will run at 10:00 AM UTC. Only the interval from this schedule is used, not the specific time of day.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "SCHEDULED",
      "RUNNING",
      "PAUSED",
      "STOPPED",
    ]).describe("Output only. Describes the current state of the job.")
      .optional(),
  }).describe(
    "Defines an evaluation job that runs periodically to generate Evaluations. [Creating an evaluation job](/ml-engine/docs/continuous-evaluation/create-job) is the starting point for using continuous evaluation.",
  ).optional(),
  annotationSpecSet: z.string().describe(
    'Required. Name of the AnnotationSpecSet describing all the labels that your machine learning model outputs. You must create this resource before you create an evaluation job and provide its name in the following format: "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}"',
  ).optional(),
  attempts: z.array(z.object({
    attemptTime: z.string().optional(),
    partialFailures: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.unknown()).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe("Details of errors that occurred.").optional(),
  })).describe(
    "Output only. Every time the evaluation job runs and an error occurs, the failed attempt is appended to this array.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Timestamp of when this evaluation job was created.",
  ).optional(),
  description: z.string().describe(
    "Required. Description of the job. The description can be up to 25,000 characters long.",
  ).optional(),
  evaluationJobConfig: z.object({
    bigqueryImportKeys: z.record(z.string(), z.string()).describe(
      "Required. Prediction keys that tell Data Labeling Service where to find the data for evaluation in your BigQuery table. When the service samples prediction input and output from your model version and saves it to BigQuery, the data gets stored as JSON strings in the BigQuery table. These keys tell Data Labeling Service how to parse the JSON. You can provide the following entries in this field: * `data_json_key`: the data key for prediction input. You must provide either this key or `reference_json_key`. * `reference_json_key`: the data reference key for prediction input. You must provide either this key or `data_json_key`. * `label_json_key`: the label key for prediction output. Required. * `label_score_json_key`: the score key for prediction output. Required. * `bounding_box_json_key`: the bounding box key for prediction output. Required if your model version perform image object detection. Learn [how to configure prediction keys](/ml-engine/docs/continuous-evaluation/create-job#prediction-keys).",
    ).optional(),
    boundingPolyConfig: z.object({
      annotationSpecSet: z.string().describe(
        "Required. Annotation spec set resource name.",
      ).optional(),
      instructionMessage: z.string().describe(
        "Optional. Instruction message showed on contributors UI.",
      ).optional(),
    }).describe(
      "Config for image bounding poly (and bounding box) human labeling task.",
    ).optional(),
    evaluationConfig: z.object({
      boundingBoxEvaluationOptions: z.object({
        iouThreshold: z.number().describe(
          "Minimum [intersection-over-union (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union) required for 2 bounding boxes to be considered a match. This must be a number between 0 and 1.",
        ).optional(),
      }).describe("Options regarding evaluation between bounding boxes.")
        .optional(),
    }).describe(
      "Configuration details used for calculating evaluation metrics and creating an Evaluation.",
    ).optional(),
    evaluationJobAlertConfig: z.object({
      email: z.string().describe(
        "Required. An email address to send alerts to.",
      ).optional(),
      minAcceptableMeanAveragePrecision: z.number().describe(
        "Required. A number between 0 and 1 that describes a minimum mean average precision threshold. When the evaluation job runs, if it calculates that your model version's predictions from the recent interval have meanAveragePrecision below this threshold, then it sends an alert to your specified email.",
      ).optional(),
    }).describe(
      "Provides details for how an evaluation job sends email alerts based on the results of a run.",
    ).optional(),
    exampleCount: z.number().int().describe(
      "Required. The maximum number of predictions to sample and save to BigQuery during each evaluation interval. This limit overrides `example_sample_percentage`: even if the service has not sampled enough predictions to fulfill `example_sample_perecentage` during an interval, it stops sampling predictions when it meets this limit.",
    ).optional(),
    exampleSamplePercentage: z.number().describe(
      "Required. Fraction of predictions to sample and save to BigQuery during each evaluation interval. For example, 0.1 means 10% of predictions served by your model version get saved to BigQuery.",
    ).optional(),
    humanAnnotationConfig: z.object({
      annotatedDatasetDescription: z.string().describe(
        "Optional. A human-readable description for AnnotatedDataset. The description can be up to 10000 characters long.",
      ).optional(),
      annotatedDatasetDisplayName: z.string().describe(
        "Required. A human-readable name for AnnotatedDataset defined by users. Maximum of 64 characters.",
      ).optional(),
      contributorEmails: z.array(z.string()).describe(
        "Optional. If you want your own labeling contributors to manage and work on this labeling request, you can set these contributors here. We will give them access to the question types in crowdcompute. Note that these emails must be registered in crowdcompute worker UI: https://crowd-compute.appspot.com/",
      ).optional(),
      instruction: z.string().describe("Required. Instruction resource name.")
        .optional(),
      labelGroup: z.string().describe(
        "Optional. A human-readable label used to logically group labeling tasks. This string must match the regular expression `[a-zA-Z\\\\d_-]{0,128}`.",
      ).optional(),
      languageCode: z.string().describe(
        "Optional. The Language of this question, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US. Only need to set this when task is language related. For example, French text classification.",
      ).optional(),
      questionDuration: z.string().describe(
        "Optional. Maximum duration for contributors to answer a question. Maximum is 3600 seconds. Default is 3600 seconds.",
      ).optional(),
      replicaCount: z.number().int().describe(
        "Optional. Replication of questions. Each question will be sent to up to this number of contributors to label. Aggregated answers will be returned. Default is set to 1. For image related labeling, valid values are 1, 3, 5.",
      ).optional(),
      userEmailAddress: z.string().describe(
        "Email of the user who started the labeling task and should be notified by email. If empty no notification will be sent.",
      ).optional(),
    }).describe("Configuration for how human labeling task should be done.")
      .optional(),
    imageClassificationConfig: z.object({
      allowMultiLabel: z.boolean().describe(
        "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one image.",
      ).optional(),
      annotationSpecSet: z.string().describe(
        "Required. Annotation spec set resource name.",
      ).optional(),
      answerAggregationType: z.enum([
        "STRING_AGGREGATION_TYPE_UNSPECIFIED",
        "MAJORITY_VOTE",
        "UNANIMOUS_VOTE",
        "NO_AGGREGATION",
      ]).describe("Optional. The type of how to aggregate answers.").optional(),
    }).describe("Config for image classification human labeling task.")
      .optional(),
    inputConfig: z.object({
      annotationType: z.enum([
        "ANNOTATION_TYPE_UNSPECIFIED",
        "IMAGE_CLASSIFICATION_ANNOTATION",
        "IMAGE_BOUNDING_BOX_ANNOTATION",
        "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION",
        "IMAGE_BOUNDING_POLY_ANNOTATION",
        "IMAGE_POLYLINE_ANNOTATION",
        "IMAGE_SEGMENTATION_ANNOTATION",
        "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION",
        "VIDEO_OBJECT_TRACKING_ANNOTATION",
        "VIDEO_OBJECT_DETECTION_ANNOTATION",
        "VIDEO_EVENT_ANNOTATION",
        "TEXT_CLASSIFICATION_ANNOTATION",
        "TEXT_ENTITY_EXTRACTION_ANNOTATION",
        "GENERAL_CLASSIFICATION_ANNOTATION",
      ]).describe(
        "Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob.",
      ).optional(),
      bigquerySource: z.object({
        inputUri: z.string().describe(
          'Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).',
        ).optional(),
      }).describe(
        "The BigQuery location for input data. If used in an EvaluationJob, this is where the service saves the prediction input and output sampled from the model version.",
      ).optional(),
      classificationMetadata: z.object({
        isMultiLabel: z.boolean().describe(
          "Whether the classification task is multi-label or not.",
        ).optional(),
      }).describe("Metadata for classification annotations.").optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "IMAGE",
        "VIDEO",
        "TEXT",
        "GENERAL_DATA",
      ]).describe(
        "Required. Data type must be specifed when user tries to import data.",
      ).optional(),
      gcsSource: z.object({
        inputUri: z.string().describe(
          "Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`).",
        ).optional(),
        mimeType: z.string().describe(
          'Required. The format of the source file. Only "text/csv" is supported.',
        ).optional(),
      }).describe("Source of the Cloud Storage file to be imported.")
        .optional(),
      textMetadata: z.object({
        languageCode: z.string().describe(
          "The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US.",
        ).optional(),
      }).describe("Metadata for the text.").optional(),
    }).describe(
      "The configuration of input data, including data type, location, etc.",
    ).optional(),
    textClassificationConfig: z.object({
      allowMultiLabel: z.boolean().describe(
        "Optional. If allow_multi_label is true, contributors are able to choose multiple labels for one text segment.",
      ).optional(),
      annotationSpecSet: z.string().describe(
        "Required. Annotation spec set resource name.",
      ).optional(),
      sentimentConfig: z.object({
        enableLabelSentimentSelection: z.boolean().describe(
          "If set to true, contributors will have the option to select sentiment of the label they selected, to mark it as negative or positive label. Default is false.",
        ).optional(),
      }).describe("Config for setting up sentiments.").optional(),
    }).describe("Config for text classification human labeling task.")
      .optional(),
  }).describe(
    "Configures specific details of how a continuous evaluation job works. Provide this configuration when you create an EvaluationJob.",
  ).optional(),
  labelMissingGroundTruth: z.boolean().describe(
    "Required. Whether you want Data Labeling Service to provide ground truth labels for prediction input. If you want the service to assign human labelers to annotate your data, set this to `true`. If you want to provide your own ground truth labels in the evaluation job's BigQuery table, set this to `false`.",
  ).optional(),
  modelVersion: z.string().describe(
    'Required. The [AI Platform Prediction model version](/ml-engine/docs/prediction-overview) to be evaluated. Prediction input and output is sampled from this model version. When creating an evaluation job, specify the model version in the following format: "projects/{project_id}/models/{model_name}/versions/{version_name}" There can only be one evaluation job per model version.',
  ).optional(),
  name: z.string().describe(
    'Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}"',
  ).optional(),
  schedule: z.string().describe(
    "Required. Describes the interval at which the job runs. This interval must be at least 1 day, and it is rounded to the nearest day. For example, if you specify a 50-hour interval, the job runs every 2 days. You can provide the schedule in [crontab format](/scheduler/docs/configuring/cron-job-schedules) or in an [English-like format](/appengine/docs/standard/python/config/cronref#schedule_format). Regardless of what you specify, the job will run at 10:00 AM UTC. Only the interval from this schedule is used, not the specific time of day.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "SCHEDULED",
    "RUNNING",
    "PAUSED",
    "STOPPED",
  ]).describe("Output only. Describes the current state of the job.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data Labeling EvaluationJobs. Registered at `@swamp/gcp/datalabeling/evaluationjobs`. */
export const model = {
  type: "@swamp/gcp/datalabeling/evaluationjobs",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Defines an evaluation job that runs periodically to generate Evaluations. [Cr...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluationJobs",
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
        if (g["job"] !== undefined) body["job"] = g["job"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a evaluationJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationJobs"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update evaluationJobs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["annotationSpecSet"] !== undefined) {
          body["annotationSpecSet"] = g["annotationSpecSet"];
        }
        if (g["attempts"] !== undefined) body["attempts"] = g["attempts"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["evaluationJobConfig"] !== undefined) {
          body["evaluationJobConfig"] = g["evaluationJobConfig"];
        }
        if (g["labelMissingGroundTruth"] !== undefined) {
          body["labelMissingGroundTruth"] = g["labelMissingGroundTruth"];
        }
        if (g["modelVersion"] !== undefined) {
          body["modelVersion"] = g["modelVersion"];
        }
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
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
      description: "Delete the evaluationJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationJobs"),
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
      description: "Sync evaluationJobs state from GCP",
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
            "id": "datalabeling.projects.evaluationJobs.pause",
            "path": "v1beta1/{+name}:pause",
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
            "id": "datalabeling.projects.evaluationJobs.resume",
            "path": "v1beta1/{+name}:resume",
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
  },
};
