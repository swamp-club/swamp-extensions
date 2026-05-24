// Auto-generated extension model for @swamp/gcp/aiplatform/trainingpipelines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform TrainingPipelines.
 *
 * The TrainingPipeline orchestrates tasks associated with training a Model. It always executes the training task, and optionally may also export data from Vertex AI's Dataset which becomes the training input, upload the Model to Vertex AI, and evaluate the Model.
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
  return `${parent}/trainingPipelines/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.trainingPipelines.get",
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
  "id": "aiplatform.projects.locations.trainingPipelines.create",
  "path": "v1/{+parent}/trainingPipelines",
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
  "id": "aiplatform.projects.locations.trainingPipelines.delete",
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
  "id": "aiplatform.projects.locations.trainingPipelines.list",
  "path": "v1/{+parent}/trainingPipelines",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
    "readMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  displayName: z.string().describe(
    "Required. The user-defined name of this TrainingPipeline.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
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
  inputDataConfig: z.object({
    annotationSchemaUri: z.string().describe(
      "Applicable only to custom training with Datasets that have DataItems and Annotations. Cloud Storage URI that points to a YAML file describing the annotation schema. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). The schema files that can be used here are found in gs://google-cloud-aiplatform/schema/dataset/annotation/, note that the chosen schema must be consistent with metadata of the Dataset specified by dataset_id. Only Annotations that both match this schema and belong to DataItems not ignored by the split method are used in respectively training, validation or test role, depending on the role of the DataItem they are on. When used in conjunction with annotations_filter, the Annotations used for training are filtered by both annotations_filter and annotation_schema_uri.",
    ).optional(),
    annotationsFilter: z.string().describe(
      "Applicable only to Datasets that have DataItems and Annotations. A filter on Annotations of the Dataset. Only Annotations that both match this filter and belong to DataItems not ignored by the split method are used in respectively training, validation or test role, depending on the role of the DataItem they are on (for the auto-assigned that role is decided by Vertex AI). A filter with same syntax as the one used in ListAnnotations may be used, but note here it filters across all Annotations of the Dataset, and not just within a single DataItem.",
    ).optional(),
    bigqueryDestination: z.object({
      outputUri: z.string().describe(
        "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
      ).optional(),
    }).describe("The BigQuery location for the output content.").optional(),
    datasetId: z.string().describe(
      "Required. The ID of the Dataset in the same Project and Location which data will be used to train the Model. The Dataset must use schema compatible with Model being trained, and what is compatible should be described in the used TrainingPipeline's training_task_definition. For tabular Datasets, all their data is exported to training, to pick and choose from.",
    ).optional(),
    filterSplit: z.object({
      testFilter: z.string().describe(
        "Required. A filter on DataItems of the Dataset. DataItems that match this filter are used to test the Model. A filter with same syntax as the one used in DatasetService.ListDataItems may be used. If a single DataItem is matched by more than one of the FilterSplit filters, then it is assigned to the first set that applies to it in the training, validation, test order.",
      ).optional(),
      trainingFilter: z.string().describe(
        "Required. A filter on DataItems of the Dataset. DataItems that match this filter are used to train the Model. A filter with same syntax as the one used in DatasetService.ListDataItems may be used. If a single DataItem is matched by more than one of the FilterSplit filters, then it is assigned to the first set that applies to it in the training, validation, test order.",
      ).optional(),
      validationFilter: z.string().describe(
        "Required. A filter on DataItems of the Dataset. DataItems that match this filter are used to validate the Model. A filter with same syntax as the one used in DatasetService.ListDataItems may be used. If a single DataItem is matched by more than one of the FilterSplit filters, then it is assigned to the first set that applies to it in the training, validation, test order.",
      ).optional(),
    }).describe(
      "Assigns input data to training, validation, and test sets based on the given filters, data pieces not matched by any filter are ignored. Currently only supported for Datasets containing DataItems. If any of the filters in this message are to match nothing, then they can be set as '-' (the minus sign). Supported only for unstructured Datasets.",
    ).optional(),
    fractionSplit: z.object({
      testFraction: z.number().describe(
        "The fraction of the input data that is to be used to evaluate the Model.",
      ).optional(),
      trainingFraction: z.number().describe(
        "The fraction of the input data that is to be used to train the Model.",
      ).optional(),
      validationFraction: z.number().describe(
        "The fraction of the input data that is to be used to validate the Model.",
      ).optional(),
    }).describe(
      "Assigns the input data to training, validation, and test sets as per the given fractions. Any of `training_fraction`, `validation_fraction` and `test_fraction` may optionally be provided, they must sum to up to 1. If the provided ones sum to less than 1, the remainder is assigned to sets as decided by Vertex AI. If none of the fractions are set, by default roughly 80% of data is used for training, 10% for validation, and 10% for test.",
    ).optional(),
    gcsDestination: z.object({
      outputUriPrefix: z.string().describe(
        "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
      ).optional(),
    }).describe(
      "The Google Cloud Storage location where the output is to be written to.",
    ).optional(),
    persistMlUseAssignment: z.boolean().describe(
      "Whether to persist the ML use assignment to data item system labels.",
    ).optional(),
    predefinedSplit: z.object({
      key: z.string().describe(
        "Required. The key is a name of one of the Dataset's data columns. The value of the key (either the label's value or value in the column) must be one of {`training`, `validation`, `test`}, and it defines to which set the given piece of data is assigned. If for a piece of data the key is not present or has an invalid value, that piece is ignored by the pipeline.",
      ).optional(),
    }).describe(
      "Assigns input data to training, validation, and test sets based on the value of a provided key. Supported only for tabular Datasets.",
    ).optional(),
    savedQueryId: z.string().describe(
      "Only applicable to Datasets that have SavedQueries. The ID of a SavedQuery (annotation set) under the Dataset specified by dataset_id used for filtering Annotations for training. Only Annotations that are associated with this SavedQuery are used in respectively training. When used in conjunction with annotations_filter, the Annotations used for training are filtered by both saved_query_id and annotations_filter. Only one of saved_query_id and annotation_schema_uri should be specified as both of them represent the same thing: problem type.",
    ).optional(),
    stratifiedSplit: z.object({
      key: z.string().describe(
        "Required. The key is a name of one of the Dataset's data columns. The key provided must be for a categorical column.",
      ).optional(),
      testFraction: z.number().describe(
        "The fraction of the input data that is to be used to evaluate the Model.",
      ).optional(),
      trainingFraction: z.number().describe(
        "The fraction of the input data that is to be used to train the Model.",
      ).optional(),
      validationFraction: z.number().describe(
        "The fraction of the input data that is to be used to validate the Model.",
      ).optional(),
    }).describe(
      'Assigns input data to the training, validation, and test sets so that the distribution of values found in the categorical column (as specified by the `key` field) is mirrored within each split. The fraction values determine the relative sizes of the splits. For example, if the specified column has three values, with 50% of the rows having value "A", 25% value "B", and 25% value "C", and the split fractions are specified as 80/10/10, then the training set will constitute 80% of the training data, with about 50% of the training set rows having the value "A" for the specified column, about 25% having the value "B", and about 25% having the value "C". Only the top 500 occurring values are used; any values not in the top 500 values are randomly assigned to a split. If less than three rows contain a specific value, those rows are randomly assigned. Supported only for tabular Datasets.',
    ).optional(),
    timestampSplit: z.object({
      key: z.string().describe(
        'Required. The key is a name of one of the Dataset\'s data columns. The values of the key (the values in the column) must be in RFC 3339 `date-time` format, where `time-offset` = `"Z"` (e.g. 1985-04-12T23:20:50.52Z). If for a piece of data the key is not present or has an invalid value, that piece is ignored by the pipeline.',
      ).optional(),
      testFraction: z.number().describe(
        "The fraction of the input data that is to be used to evaluate the Model.",
      ).optional(),
      trainingFraction: z.number().describe(
        "The fraction of the input data that is to be used to train the Model.",
      ).optional(),
      validationFraction: z.number().describe(
        "The fraction of the input data that is to be used to validate the Model.",
      ).optional(),
    }).describe(
      "Assigns input data to training, validation, and test sets based on a provided timestamps. The youngest data pieces are assigned to training set, next to validation set, and the oldest to the test set. Supported only for tabular Datasets.",
    ).optional(),
  }).describe(
    "Specifies Vertex AI owned input data to be used for training, and possibly evaluating, the Model.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize TrainingPipelines. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  modelId: z.string().describe(
    "Optional. The ID to use for the uploaded Model, which will become the final component of the model resource name. This value may be up to 63 characters, and valid characters are `[a-z0-9_-]`. The first character cannot be a number or hyphen.",
  ).optional(),
  modelToUpload: z.object({
    artifactUri: z.string().describe(
      "Immutable. The path to the directory containing the Model artifact and any of its supporting files. Not required for AutoML Models.",
    ).optional(),
    baseModelSource: z.object({
      genieSource: z.object({
        baseModelUri: z.string().describe(
          "Required. The public base model URI.",
        ).optional(),
      }).describe(
        "Contains information about the source of the models generated from Generative AI Studio.",
      ).optional(),
      modelGardenSource: z.object({
        publicModelName: z.string().describe(
          "Required. The model garden source model resource name.",
        ).optional(),
        skipHfModelCache: z.boolean().describe(
          "Optional. Whether to avoid pulling the model from the HF cache.",
        ).optional(),
        versionId: z.string().describe(
          "Optional. The model garden source model version ID.",
        ).optional(),
      }).describe(
        "Contains information about the source of the models generated from Model Garden.",
      ).optional(),
    }).describe(
      "User input field to specify the base model source. Currently it only supports specifing the Model Garden models and Genie models.",
    ).optional(),
    checkpoints: z.array(z.object({
      checkpointId: z.string().describe("The ID of the checkpoint.").optional(),
      epoch: z.string().describe("The epoch of the checkpoint.").optional(),
      step: z.string().describe("The step of the checkpoint.").optional(),
    })).describe("Optional. Output only. The checkpoints of the model.")
      .optional(),
    containerSpec: z.object({
      args: z.array(z.string()).describe(
        "Immutable. Specifies arguments for the command that runs when the container starts. This overrides the container's [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd). Specify this field as an array of executable and arguments, similar to a Docker `CMD`'s \"default parameters\" form. If you don't specify this field but do specify the command field, then the command from the `command` field runs without any additional arguments. See the [Kubernetes documentation about how the `command` and `args` fields interact with a container's `ENTRYPOINT` and `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes). If you don't specify this field and don't specify the `command` field, then the container's [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#cmd) and `CMD` determine what runs based on their default behavior. See the Docker documentation about [how `CMD` and `ENTRYPOINT` interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact). In this field, you can reference [environment variables set by Vertex AI](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables) and environment variables set in the env field. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $( VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field corresponds to the `args` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).",
      ).optional(),
      command: z.array(z.string()).describe(
        "Immutable. Specifies the command that runs when the container starts. This overrides the container's [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint). Specify this field as an array of executable and arguments, similar to a Docker `ENTRYPOINT`'s \"exec\" form, not its \"shell\" form. If you do not specify this field, then the container's `ENTRYPOINT` runs, in conjunction with the args field or the container's [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd), if either exists. If this field is not specified and the container does not have an `ENTRYPOINT`, then refer to the Docker documentation about [how `CMD` and `ENTRYPOINT` interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact). If you specify this field, then you can also specify the `args` field to provide additional arguments for this command. However, if you specify this field, then the container's `CMD` is ignored. See the [Kubernetes documentation about how the `command` and `args` fields interact with a container's `ENTRYPOINT` and `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes). In this field, you can reference [environment variables set by Vertex AI](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables) and environment variables set in the env field. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $( VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field corresponds to the `command` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).",
      ).optional(),
      deploymentTimeout: z.string().describe(
        "Immutable. Deployment timeout. Limit for deployment timeout is 2 hours.",
      ).optional(),
      env: z.array(z.object({
        name: z.string().describe(
          "Required. Name of the environment variable. Must be a valid C identifier.",
        ).optional(),
        value: z.string().describe(
          "Required. Variables that reference a $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not.",
        ).optional(),
      })).describe(
        'Immutable. List of environment variables to set in the container. After the container starts running, code running in the container can read these environment variables. Additionally, the command and args fields can reference these variables. Later entries in this list can also reference earlier entries. For example, the following example sets the variable `VAR_2` to have the value `foo bar`: ` json [ { "name": "VAR_1", "value": "foo" }, { "name": "VAR_2", "value": "$(VAR_1) bar" } ] ` If you switch the order of the variables in the example, then the expansion does not occur. This field corresponds to the `env` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).',
      ).optional(),
      grpcPorts: z.array(z.object({
        containerPort: z.number().int().describe(
          "The number of the port to expose on the pod's IP address. Must be a valid port number, between 1 and 65535 inclusive.",
        ).optional(),
      })).describe(
        "Immutable. List of ports to expose from the container. Vertex AI sends gRPC prediction requests that it receives to the first port on this list. Vertex AI also sends liveness and health checks to this port. If you do not specify this field, gRPC requests to the container will be disabled. Vertex AI does not use ports other than the first one listed. This field corresponds to the `ports` field of the Kubernetes Containers v1 core API.",
      ).optional(),
      healthProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()).describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe("ExecAction specifies a command to execute.").optional(),
        failureThreshold: z.number().int().describe(
          "Number of consecutive failures before the probe is considered failed. Defaults to 3. Minimum value is 1. Maps to Kubernetes probe argument 'failureThreshold'.",
        ).optional(),
        grpc: z.object({
          port: z.number().int().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.string().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. See https://github.com/grpc/grpc/blob/master/doc/health-checking.md. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe(
          "GrpcAction checks the health of a container using a gRPC service.",
        ).optional(),
        httpGet: z.object({
          host: z.string().describe(
            'Host name to connect to, defaults to the model serving container\'s IP. You probably want to set "Host" in httpHeaders instead.',
          ).optional(),
          httpHeaders: z.array(z.unknown()).describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.string().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.string().describe(
            'Scheme to use for connecting to the host. Defaults to HTTP. Acceptable values are "HTTP" or "HTTPS".',
          ).optional(),
        }).describe(
          "HttpGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds to wait before starting the probe. Defaults to 0. Minimum value is 0. Maps to Kubernetes probe argument 'initialDelaySeconds'.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Must be less than timeout_seconds. Maps to Kubernetes probe argument 'periodSeconds'.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Number of consecutive successes before the probe is considered successful. Defaults to 1. Minimum value is 1. Maps to Kubernetes probe argument 'successThreshold'.",
        ).optional(),
        tcpSocket: z.object({
          host: z.string().describe(
            "Optional: Host name to connect to, defaults to the model serving container's IP.",
          ).optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TcpSocketAction probes the health of a container by opening a TCP socket connection.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Must be greater or equal to period_seconds. Maps to Kubernetes probe argument 'timeoutSeconds'.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      healthRoute: z.string().describe(
        "Immutable. HTTP path on the container to send health checks to. Vertex AI intermittently sends GET requests to this path on the container's IP address and port to check that the container is healthy. Read more about [health checks](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#health). For example, if you set this field to `/bar`, then Vertex AI intermittently sends a GET request to the `/bar` path on the port of your container specified by the first value of this `ModelContainerSpec`'s ports field. If you don't specify this field, it defaults to the following value when you deploy this Model to an Endpoint: /v1/endpoints/ENDPOINT/deployedModels/ DEPLOYED_MODEL:predict The placeholders in this value are replaced as follows: * ENDPOINT: The last segment (following `endpoints/`)of the Endpoint.name][] field of the Endpoint where this Model has been deployed. (Vertex AI makes this value available to your container code as the [`AIP_ENDPOINT_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).) * DEPLOYED_MODEL: DeployedModel.id of the `DeployedModel`. (Vertex AI makes this value available to your container code as the [`AIP_DEPLOYED_MODEL_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).)",
      ).optional(),
      imageUri: z.string().describe(
        "Required. Immutable. URI of the Docker image to be used as the custom container for serving predictions. This URI must identify an image in Artifact Registry or Container Registry. Learn more about the [container publishing requirements](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#publishing), including permissions requirements for the Vertex AI Service Agent. The container image is ingested upon ModelService.UploadModel, stored internally, and this original path is afterwards not used. To learn about the requirements for the Docker image itself, see [Custom container requirements](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#). You can use the URI to one of Vertex AI's [pre-built container images for prediction](https://cloud.google.com/vertex-ai/docs/predictions/pre-built-containers) in this field.",
      ).optional(),
      invokeRoutePrefix: z.string().describe(
        'Immutable. Invoke route prefix for the custom container. "/*" is the only supported value right now. By setting this field, any non-root route on this model will be accessible with invoke http call eg: "/invoke/foo/bar", however the [PredictionService.Invoke] RPC is not supported yet. Only one of `predict_route` or `invoke_route_prefix` can be set, and we default to using `predict_route` if this field is not set. If this field is set, the Model can only be deployed to dedicated endpoint.',
      ).optional(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()).describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe("ExecAction specifies a command to execute.").optional(),
        failureThreshold: z.number().int().describe(
          "Number of consecutive failures before the probe is considered failed. Defaults to 3. Minimum value is 1. Maps to Kubernetes probe argument 'failureThreshold'.",
        ).optional(),
        grpc: z.object({
          port: z.number().int().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.string().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. See https://github.com/grpc/grpc/blob/master/doc/health-checking.md. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe(
          "GrpcAction checks the health of a container using a gRPC service.",
        ).optional(),
        httpGet: z.object({
          host: z.string().describe(
            'Host name to connect to, defaults to the model serving container\'s IP. You probably want to set "Host" in httpHeaders instead.',
          ).optional(),
          httpHeaders: z.array(z.unknown()).describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.string().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.string().describe(
            'Scheme to use for connecting to the host. Defaults to HTTP. Acceptable values are "HTTP" or "HTTPS".',
          ).optional(),
        }).describe(
          "HttpGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds to wait before starting the probe. Defaults to 0. Minimum value is 0. Maps to Kubernetes probe argument 'initialDelaySeconds'.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Must be less than timeout_seconds. Maps to Kubernetes probe argument 'periodSeconds'.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Number of consecutive successes before the probe is considered successful. Defaults to 1. Minimum value is 1. Maps to Kubernetes probe argument 'successThreshold'.",
        ).optional(),
        tcpSocket: z.object({
          host: z.string().describe(
            "Optional: Host name to connect to, defaults to the model serving container's IP.",
          ).optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TcpSocketAction probes the health of a container by opening a TCP socket connection.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Must be greater or equal to period_seconds. Maps to Kubernetes probe argument 'timeoutSeconds'.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      ports: z.array(z.object({
        containerPort: z.number().int().describe(
          "The number of the port to expose on the pod's IP address. Must be a valid port number, between 1 and 65535 inclusive.",
        ).optional(),
      })).describe(
        'Immutable. List of ports to expose from the container. Vertex AI sends any prediction requests that it receives to the first port on this list. Vertex AI also sends [liveness and health checks](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#liveness) to this port. If you do not specify this field, it defaults to following value: ` json [ { "containerPort": 8080 } ] ` Vertex AI does not use ports other than the first one listed. This field corresponds to the `ports` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).',
      ).optional(),
      predictRoute: z.string().describe(
        "Immutable. HTTP path on the container to send prediction requests to. Vertex AI forwards requests sent using projects.locations.endpoints.predict to this path on the container's IP address and port. Vertex AI then returns the container's response in the API response. For example, if you set this field to `/foo`, then when Vertex AI receives a prediction request, it forwards the request body in a POST request to the `/foo` path on the port of your container specified by the first value of this `ModelContainerSpec`'s ports field. If you don't specify this field, it defaults to the following value when you deploy this Model to an Endpoint: /v1/endpoints/ENDPOINT/deployedModels/DEPLOYED_MODEL:predict The placeholders in this value are replaced as follows: * ENDPOINT: The last segment (following `endpoints/`)of the Endpoint.name][] field of the Endpoint where this Model has been deployed. (Vertex AI makes this value available to your container code as the [`AIP_ENDPOINT_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).) * DEPLOYED_MODEL: DeployedModel.id of the `DeployedModel`. (Vertex AI makes this value available to your container code as the [`AIP_DEPLOYED_MODEL_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).)",
      ).optional(),
      sharedMemorySizeMb: z.string().describe(
        "Immutable. The amount of the VM memory to reserve as the shared memory for the model in megabytes.",
      ).optional(),
      startupProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()).describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe("ExecAction specifies a command to execute.").optional(),
        failureThreshold: z.number().int().describe(
          "Number of consecutive failures before the probe is considered failed. Defaults to 3. Minimum value is 1. Maps to Kubernetes probe argument 'failureThreshold'.",
        ).optional(),
        grpc: z.object({
          port: z.number().int().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.string().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. See https://github.com/grpc/grpc/blob/master/doc/health-checking.md. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe(
          "GrpcAction checks the health of a container using a gRPC service.",
        ).optional(),
        httpGet: z.object({
          host: z.string().describe(
            'Host name to connect to, defaults to the model serving container\'s IP. You probably want to set "Host" in httpHeaders instead.',
          ).optional(),
          httpHeaders: z.array(z.unknown()).describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.string().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.string().describe(
            'Scheme to use for connecting to the host. Defaults to HTTP. Acceptable values are "HTTP" or "HTTPS".',
          ).optional(),
        }).describe(
          "HttpGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds to wait before starting the probe. Defaults to 0. Minimum value is 0. Maps to Kubernetes probe argument 'initialDelaySeconds'.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Must be less than timeout_seconds. Maps to Kubernetes probe argument 'periodSeconds'.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Number of consecutive successes before the probe is considered successful. Defaults to 1. Minimum value is 1. Maps to Kubernetes probe argument 'successThreshold'.",
        ).optional(),
        tcpSocket: z.object({
          host: z.string().describe(
            "Optional: Host name to connect to, defaults to the model serving container's IP.",
          ).optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TcpSocketAction probes the health of a container by opening a TCP socket connection.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Must be greater or equal to period_seconds. Maps to Kubernetes probe argument 'timeoutSeconds'.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
    }).describe(
      "Specification of a container for serving predictions. Some fields in this message correspond to fields in the [Kubernetes Container v1 core specification](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp when this Model was uploaded into Vertex AI.",
    ).optional(),
    dataStats: z.object({
      testAnnotationsCount: z.string().describe(
        "Number of Annotations that are used for evaluating this Model. If the Model is evaluated multiple times, this will be the number of test Annotations used by the first evaluation. If the Model is not evaluated, the number is 0.",
      ).optional(),
      testDataItemsCount: z.string().describe(
        "Number of DataItems that were used for evaluating this Model. If the Model is evaluated multiple times, this will be the number of test DataItems used by the first evaluation. If the Model is not evaluated, the number is 0.",
      ).optional(),
      trainingAnnotationsCount: z.string().describe(
        "Number of Annotations that are used for training this Model.",
      ).optional(),
      trainingDataItemsCount: z.string().describe(
        "Number of DataItems that were used for training this Model.",
      ).optional(),
      validationAnnotationsCount: z.string().describe(
        "Number of Annotations that are used for validating this Model during training.",
      ).optional(),
      validationDataItemsCount: z.string().describe(
        "Number of DataItems that were used for validating this Model during training.",
      ).optional(),
    }).describe("Stats of data used for train or evaluate the Model.")
      .optional(),
    defaultCheckpointId: z.string().describe(
      "The default checkpoint id of a model version.",
    ).optional(),
    deployedModels: z.array(z.object({
      checkpointId: z.string().describe(
        "Immutable. The ID of the Checkpoint deployed in the DeployedModel.",
      ).optional(),
      deployedModelId: z.string().describe(
        "Immutable. An ID of a DeployedModel in the above Endpoint.",
      ).optional(),
      endpoint: z.string().describe(
        "Immutable. A resource name of an Endpoint.",
      ).optional(),
    })).describe(
      "Output only. The pointers to DeployedModels created from this Model. Note that Model could have been deployed to Endpoints in different Locations.",
    ).optional(),
    description: z.string().describe("The description of the Model.")
      .optional(),
    displayName: z.string().describe(
      "Required. The display name of the Model. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
    ).optional(),
    encryptionSpec: z.object({
      kmsKeyName: z.string().describe(
        "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
    }).describe(
      "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
    ).optional(),
    etag: z.string().describe(
      'Used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
    ).optional(),
    explanationSpec: z.object({
      metadata: z.object({
        featureAttributionsSchemaUri: z.string().describe(
          "Points to a YAML file stored on Google Cloud Storage describing the format of the feature attributions. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML tabular Models always have this field populated by Vertex AI. Note: The URI given on output may be different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
        ).optional(),
        inputs: z.record(
          z.string(),
          z.object({
            denseShapeTensorName: z.unknown().describe(
              "Specifies the shape of the values of the input if the input is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
            ).optional(),
            encodedBaselines: z.unknown().describe(
              "A list of baselines for the encoded tensor. The shape of each baseline should match the shape of the encoded tensor. If a scalar is provided, Vertex AI broadcasts to the same shape as the encoded tensor.",
            ).optional(),
            encodedTensorName: z.unknown().describe(
              "Encoded tensor is a transformation of the input tensor. Must be provided if choosing Integrated Gradients attribution or XRAI attribution and the input tensor is not differentiable. An encoded tensor is generated if the input tensor is encoded by a lookup table.",
            ).optional(),
            encoding: z.unknown().describe(
              "Defines how the feature is encoded into the input tensor. Defaults to IDENTITY.",
            ).optional(),
            featureValueDomain: z.unknown().describe(
              "Domain details of the input feature value. Provides numeric information about the feature, such as its range (min, max). If the feature has been pre-processed, for example with z-scoring, then it provides information about how to recover the original feature. For example, if the input feature is an image and it has been pre-processed to obtain 0-mean and stddev = 1 values, then original_mean, and original_stddev refer to the mean and stddev of the original feature (e.g. image tensor) from which input feature (with mean = 0 and stddev = 1) was obtained.",
            ).optional(),
            groupName: z.unknown().describe(
              "Name of the group that the input belongs to. Features with the same group name will be treated as one feature when computing attributions. Features grouped together can have different shapes in value. If provided, there will be one single attribution generated in Attribution.feature_attributions, keyed by the group name.",
            ).optional(),
            indexFeatureMapping: z.unknown().describe(
              "A list of feature names for each index in the input tensor. Required when the input InputMetadata.encoding is BAG_OF_FEATURES, BAG_OF_FEATURES_SPARSE, INDICATOR.",
            ).optional(),
            indicesTensorName: z.unknown().describe(
              "Specifies the index of the values of the input tensor. Required when the input tensor is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
            ).optional(),
            inputBaselines: z.unknown().describe(
              "Baseline inputs for this feature. If no baseline is specified, Vertex AI chooses the baseline for this feature. If multiple baselines are specified, Vertex AI returns the average attributions across them in Attribution.feature_attributions. For Vertex AI-provided Tensorflow images (both 1.x and 2.x), the shape of each baseline must match the shape of the input tensor. If a scalar is provided, we broadcast to the same shape as the input tensor. For custom images, the element of the baselines must be in the same format as the feature's input in the instance[]. The schema of any single instance may be specified via Endpoint's DeployedModels' Model's PredictSchemata's instance_schema_uri.",
            ).optional(),
            inputTensorName: z.unknown().describe(
              "Name of the input tensor for this feature. Required and is only applicable to Vertex AI-provided images for Tensorflow.",
            ).optional(),
            modality: z.unknown().describe(
              "Modality of the feature. Valid values are: numeric, image. Defaults to numeric.",
            ).optional(),
            visualization: z.unknown().describe(
              "Visualization configurations for image explanation.",
            ).optional(),
          }),
        ).describe(
          "Required. Map from feature names to feature input metadata. Keys are the name of the features. Values are the specification of the feature. An empty InputMetadata is valid. It describes a text feature which has the name specified as the key in ExplanationMetadata.inputs. The baseline of the empty feature is chosen by Vertex AI. For Vertex AI-provided Tensorflow images, the key can be any friendly name of the feature. Once specified, featureAttributions are keyed by this key (if not grouped with another feature). For custom images, the key must match with the key in instance.",
        ).optional(),
        latentSpaceSource: z.string().describe(
          "Name of the source to generate embeddings for example based explanations.",
        ).optional(),
        outputs: z.record(
          z.string(),
          z.object({
            displayNameMappingKey: z.unknown().describe(
              "Specify a field name in the prediction to look for the display name. Use this if the prediction contains the display names for the outputs. The display names in the prediction must have the same shape of the outputs, so that it can be located by Attribution.output_index for a specific output.",
            ).optional(),
            indexDisplayNameMapping: z.unknown().describe(
              "Static mapping between the index and display name. Use this if the outputs are a deterministic n-dimensional array, e.g. a list of scores of all the classes in a pre-defined order for a multi-classification Model. It's not feasible if the outputs are non-deterministic, e.g. the Model produces top-k classes or sort the outputs by their values. The shape of the value must be an n-dimensional array of strings. The number of dimensions must match that of the outputs to be explained. The Attribution.output_display_name is populated by locating in the mapping with Attribution.output_index.",
            ).optional(),
            outputTensorName: z.unknown().describe(
              "Name of the output tensor. Required and is only applicable to Vertex AI provided images for Tensorflow.",
            ).optional(),
          }),
        ).describe(
          "Required. Map from output names to output metadata. For Vertex AI-provided Tensorflow images, keys can be any user defined string that consists of any UTF-8 characters. For custom images, keys are the name of the output field in the prediction to be explained. Currently only one key is allowed.",
        ).optional(),
      }).describe(
        "Metadata describing the Model's input and output for explanation.",
      ).optional(),
      parameters: z.object({
        examples: z.object({
          exampleGcsSource: z.object({
            dataFormat: z.unknown().describe(
              "The format in which instances are given, if not specified, assume it's JSONL format. Currently only JSONL format is supported.",
            ).optional(),
            gcsSource: z.unknown().describe(
              "The Google Cloud Storage location for the input content.",
            ).optional(),
          }).describe("The Cloud Storage input instances.").optional(),
          nearestNeighborSearchConfig: z.string().describe(
            "The full configuration for the generated index, the semantics are the same as metadata and should match [NearestNeighborSearchConfig](https://cloud.google.com/vertex-ai/docs/explainable-ai/configuring-explanations-example-based#nearest-neighbor-search-config).",
          ).optional(),
          neighborCount: z.number().int().describe(
            "The number of neighbors to return when querying for examples.",
          ).optional(),
          presets: z.object({
            modality: z.unknown().describe(
              "The modality of the uploaded model, which automatically configures the distance measurement and feature normalization for the underlying example index and queries. If your model does not precisely fit one of these types, it is okay to choose the closest type.",
            ).optional(),
            query: z.unknown().describe(
              "Preset option controlling parameters for speed-precision trade-off when querying for examples. If omitted, defaults to `PRECISE`.",
            ).optional(),
          }).describe("Preset configuration for example-based explanations")
            .optional(),
        }).describe(
          "Example-based explainability that returns the nearest neighbors from the provided dataset.",
        ).optional(),
        integratedGradientsAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.unknown().describe(
              "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
            ).optional(),
          }).describe(
            "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
          ).optional(),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.unknown().describe(
              "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
            ).optional(),
            noiseSigma: z.unknown().describe(
              "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
            ).optional(),
            noisySampleCount: z.unknown().describe(
              "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
            ).optional(),
          }).describe(
            "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
          ).optional(),
          stepCount: z.number().int().describe(
            "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is within the desired error range. Valid range of its value is [1, 100], inclusively.",
          ).optional(),
        }).describe(
          "An attribution method that computes the Aumann-Shapley value taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1703.01365",
        ).optional(),
        outputIndices: z.array(z.string()).describe(
          "If populated, only returns attributions that have output_index contained in output_indices. It must be an ndarray of integers, with the same shape of the output it's explaining. If not populated, returns attributions for top_k indices of outputs. If neither top_k nor output_indices is populated, returns the argmax index of the outputs. Only applicable to Models that predict multiple outputs (e,g, multi-class Models that predict multiple classes).",
        ).optional(),
        sampledShapleyAttribution: z.object({
          pathCount: z.number().int().describe(
            "Required. The number of feature permutations to consider when approximating the Shapley values. Valid range of its value is [1, 50], inclusively.",
          ).optional(),
        }).describe(
          "An attribution method that approximates Shapley values for features that contribute to the label being predicted. A sampling strategy is used to approximate the value rather than considering all subsets of features.",
        ).optional(),
        topK: z.number().int().describe(
          "If populated, returns attributions for top K indices of outputs (defaults to 1). Only applies to Models that predicts more than one outputs (e,g, multi-class Models). When set to -1, returns explanations for all outputs.",
        ).optional(),
        xraiAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.unknown().describe(
              "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
            ).optional(),
          }).describe(
            "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
          ).optional(),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.unknown().describe(
              "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
            ).optional(),
            noiseSigma: z.unknown().describe(
              "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
            ).optional(),
            noisySampleCount: z.unknown().describe(
              "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
            ).optional(),
          }).describe(
            "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
          ).optional(),
          stepCount: z.number().int().describe(
            "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. Valid range of its value is [1, 100], inclusively.",
          ).optional(),
        }).describe(
          "An explanation method that redistributes Integrated Gradients attributions to segmented regions, taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1906.02825 Supported only by image Models.",
        ).optional(),
      }).describe("Parameters to configure explaining for Model's predictions.")
        .optional(),
    }).describe("Specification of Model explanation.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels with user-defined metadata to organize your Models. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
    ).optional(),
    metadata: z.string().describe(
      "Immutable. An additional information about the Model; the schema of the metadata can be found in metadata_schema. Unset if the Model does not have any additional information.",
    ).optional(),
    metadataArtifact: z.string().describe(
      "Output only. The resource name of the Artifact that was created in MetadataStore when creating the Model. The Artifact resource name pattern is `projects/{project}/locations/{location}/metadataStores/{metadata_store}/artifacts/{artifact}`.",
    ).optional(),
    metadataSchemaUri: z.string().describe(
      "Immutable. Points to a YAML file stored on Google Cloud Storage describing additional information about the Model, that is specific to it. Unset if the Model does not have any additional information. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI, if no additional metadata is needed, this field is set to an empty string. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
    ).optional(),
    modelSourceInfo: z.object({
      copy: z.boolean().describe(
        "If this Model is copy of another Model. If true then source_type pertains to the original.",
      ).optional(),
      sourceType: z.enum([
        "MODEL_SOURCE_TYPE_UNSPECIFIED",
        "AUTOML",
        "CUSTOM",
        "BQML",
        "MODEL_GARDEN",
        "GENIE",
        "CUSTOM_TEXT_EMBEDDING",
        "MARKETPLACE",
      ]).describe("Type of the model source.").optional(),
    }).describe("Detail description of the source information of the model.")
      .optional(),
    name: z.string().describe("Identifier. The resource name of the Model.")
      .optional(),
    originalModelInfo: z.object({
      model: z.string().describe(
        "Output only. The resource name of the Model this Model is a copy of, including the revision. Format: `projects/{project}/locations/{location}/models/{model_id}@{version_id}`",
      ).optional(),
    }).describe(
      "Contains information about the original Model if this Model is a copy.",
    ).optional(),
    pipelineJob: z.string().describe(
      "Optional. This field is populated if the model is produced by a pipeline job.",
    ).optional(),
    predictSchemata: z.object({
      instanceSchemaUri: z.string().describe(
        "Immutable. Points to a YAML file stored on Google Cloud Storage describing the format of a single instance, which are used in PredictRequest.instances, ExplainRequest.instances and BatchPredictionJob.input_config. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
      ).optional(),
      parametersSchemaUri: z.string().describe(
        "Immutable. Points to a YAML file stored on Google Cloud Storage describing the parameters of prediction and explanation via PredictRequest.parameters, ExplainRequest.parameters and BatchPredictionJob.model_parameters. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI, if no parameters are supported, then it is set to an empty string. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
      ).optional(),
      predictionSchemaUri: z.string().describe(
        "Immutable. Points to a YAML file stored on Google Cloud Storage describing the format of a single prediction produced by this Model, which are returned via PredictResponse.predictions, ExplainResponse.explanations, and BatchPredictionJob.output_config. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
      ).optional(),
    }).describe(
      "Contains the schemata used in Model's predictions and explanations via PredictionService.Predict, PredictionService.Explain and BatchPredictionJob.",
    ).optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    supportedDeploymentResourcesTypes: z.array(
      z.enum([
        "DEPLOYMENT_RESOURCES_TYPE_UNSPECIFIED",
        "DEDICATED_RESOURCES",
        "AUTOMATIC_RESOURCES",
        "SHARED_RESOURCES",
      ]),
    ).describe(
      "Output only. When this Model is deployed, its prediction resources are described by the `prediction_resources` field of the Endpoint.deployed_models object. Because not all Models support all resource configuration types, the configuration types this Model supports are listed here. If no configuration types are listed, the Model cannot be deployed to an Endpoint and does not support online predictions (PredictionService.Predict or PredictionService.Explain). Such a Model can serve predictions by using a BatchPredictionJob, if it has at least one entry each in supported_input_storage_formats and supported_output_storage_formats.",
    ).optional(),
    supportedExportFormats: z.array(z.object({
      exportableContents: z.array(
        z.enum(["EXPORTABLE_CONTENT_UNSPECIFIED", "ARTIFACT", "IMAGE"]),
      ).describe("Output only. The content of this Model that may be exported.")
        .optional(),
      id: z.string().describe(
        "Output only. The ID of the export format. The possible format IDs are: * `tflite` Used for Android mobile devices. * `edgetpu-tflite` Used for [Edge TPU](https://cloud.google.com/edge-tpu/) devices. * `tf-saved-model` A tensorflow model in SavedModel format. * `tf-js` A [TensorFlow.js](https://www.tensorflow.org/js) model that can be used in the browser and in Node.js using JavaScript. * `core-ml` Used for iOS mobile devices. * `custom-trained` A Model that was uploaded or trained by custom code. * `genie` A tuned Model Garden model.",
      ).optional(),
    })).describe(
      "Output only. The formats in which this Model may be exported. If empty, this Model is not available for export.",
    ).optional(),
    supportedInputStorageFormats: z.array(z.string()).describe(
      "Output only. The formats this Model supports in BatchPredictionJob.input_config. If PredictSchemata.instance_schema_uri exists, the instances should be given as per that schema. The possible formats are: * `jsonl` The JSON Lines format, where each instance is a single line. Uses GcsSource. * `csv` The CSV format, where each instance is a single comma-separated line. The first line in the file is the header, containing comma-separated field names. Uses GcsSource. * `tf-record` The TFRecord format, where each instance is a single record in tfrecord syntax. Uses GcsSource. * `tf-record-gzip` Similar to `tf-record`, but the file is gzipped. Uses GcsSource. * `bigquery` Each instance is a single row in BigQuery. Uses BigQuerySource. * `file-list` Each line of the file is the location of an instance to process, uses `gcs_source` field of the InputConfig object. If this Model doesn't support any of these formats it means it cannot be used with a BatchPredictionJob. However, if it has supported_deployment_resources_types, it could serve online predictions by using PredictionService.Predict or PredictionService.Explain.",
    ).optional(),
    supportedOutputStorageFormats: z.array(z.string()).describe(
      "Output only. The formats this Model supports in BatchPredictionJob.output_config. If both PredictSchemata.instance_schema_uri and PredictSchemata.prediction_schema_uri exist, the predictions are returned together with their instances. In other words, the prediction has the original instance data first, followed by the actual prediction content (as per the schema). The possible formats are: * `jsonl` The JSON Lines format, where each prediction is a single line. Uses GcsDestination. * `csv` The CSV format, where each prediction is a single comma-separated line. The first line in the file is the header, containing comma-separated field names. Uses GcsDestination. * `bigquery` Each prediction is a single row in a BigQuery table, uses BigQueryDestination. If this Model doesn't support any of these formats it means it cannot be used with a BatchPredictionJob. However, if it has supported_deployment_resources_types, it could serve online predictions by using PredictionService.Predict or PredictionService.Explain.",
    ).optional(),
    trainingPipeline: z.string().describe(
      "Output only. The resource name of the TrainingPipeline that uploaded this Model, if any.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp when this Model was most recently updated.",
    ).optional(),
    versionAliases: z.array(z.string()).describe(
      "User provided version aliases so that a model version can be referenced via alias (i.e. `projects/{project}/locations/{location}/models/{model_id}@{version_alias}` instead of auto-generated version id (i.e. `projects/{project}/locations/{location}/models/{model_id}@{version_id})`. The format is a-z{0,126}[a-z0-9] to distinguish from version_id. A default version alias will be created for the first version of the model, and there must be exactly one default version alias for a model.",
    ).optional(),
    versionCreateTime: z.string().describe(
      "Output only. Timestamp when this version was created.",
    ).optional(),
    versionDescription: z.string().describe("The description of this version.")
      .optional(),
    versionId: z.string().describe(
      "Output only. Immutable. The version ID of the model. A new version is committed when a new model version is uploaded or trained under an existing model id. It is an auto-incrementing decimal number in string representation.",
    ).optional(),
    versionUpdateTime: z.string().describe(
      "Output only. Timestamp when this version was most recently updated.",
    ).optional(),
  }).describe("A trained machine learning Model.").optional(),
  parentModel: z.string().describe(
    "Optional. When specify this field, the `model_to_upload` will not be uploaded as a new model, instead, it will become a new version of this `parent_model`.",
  ).optional(),
  trainingTaskDefinition: z.string().describe(
    "Required. A Google Cloud Storage path to the YAML file that defines the training task which is responsible for producing the model artifact, and may also include additional auxiliary work. The definition files that can be used here are found in gs://google-cloud-aiplatform/schema/trainingjob/definition/. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
  ).optional(),
  trainingTaskInputs: z.string().describe(
    "Required. The training task's parameter(s), as specified in the training_task_definition's `inputs`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  inputDataConfig: z.object({
    annotationSchemaUri: z.string(),
    annotationsFilter: z.string(),
    bigqueryDestination: z.object({
      outputUri: z.string(),
    }),
    datasetId: z.string(),
    filterSplit: z.object({
      testFilter: z.string(),
      trainingFilter: z.string(),
      validationFilter: z.string(),
    }),
    fractionSplit: z.object({
      testFraction: z.number(),
      trainingFraction: z.number(),
      validationFraction: z.number(),
    }),
    gcsDestination: z.object({
      outputUriPrefix: z.string(),
    }),
    persistMlUseAssignment: z.boolean(),
    predefinedSplit: z.object({
      key: z.string(),
    }),
    savedQueryId: z.string(),
    stratifiedSplit: z.object({
      key: z.string(),
      testFraction: z.number(),
      trainingFraction: z.number(),
      validationFraction: z.number(),
    }),
    timestampSplit: z.object({
      key: z.string(),
      testFraction: z.number(),
      trainingFraction: z.number(),
      validationFraction: z.number(),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  modelId: z.string().optional(),
  modelToUpload: z.object({
    artifactUri: z.string(),
    baseModelSource: z.object({
      genieSource: z.object({
        baseModelUri: z.string(),
      }),
      modelGardenSource: z.object({
        publicModelName: z.string(),
        skipHfModelCache: z.boolean(),
        versionId: z.string(),
      }),
    }),
    checkpoints: z.array(z.object({
      checkpointId: z.string(),
      epoch: z.string(),
      step: z.string(),
    })),
    containerSpec: z.object({
      args: z.array(z.string()),
      command: z.array(z.string()),
      deploymentTimeout: z.string(),
      env: z.array(z.object({
        name: z.string(),
        value: z.string(),
      })),
      grpcPorts: z.array(z.object({
        containerPort: z.number(),
      })),
      healthProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.number(),
          service: z.string(),
        }),
        httpGet: z.object({
          host: z.string(),
          httpHeaders: z.array(z.unknown()),
          path: z.string(),
          port: z.number(),
          scheme: z.string(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.string(),
          port: z.number(),
        }),
        timeoutSeconds: z.number(),
      }),
      healthRoute: z.string(),
      imageUri: z.string(),
      invokeRoutePrefix: z.string(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.number(),
          service: z.string(),
        }),
        httpGet: z.object({
          host: z.string(),
          httpHeaders: z.array(z.unknown()),
          path: z.string(),
          port: z.number(),
          scheme: z.string(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.string(),
          port: z.number(),
        }),
        timeoutSeconds: z.number(),
      }),
      ports: z.array(z.object({
        containerPort: z.number(),
      })),
      predictRoute: z.string(),
      sharedMemorySizeMb: z.string(),
      startupProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.number(),
          service: z.string(),
        }),
        httpGet: z.object({
          host: z.string(),
          httpHeaders: z.array(z.unknown()),
          path: z.string(),
          port: z.number(),
          scheme: z.string(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.string(),
          port: z.number(),
        }),
        timeoutSeconds: z.number(),
      }),
    }),
    createTime: z.string(),
    dataStats: z.object({
      testAnnotationsCount: z.string(),
      testDataItemsCount: z.string(),
      trainingAnnotationsCount: z.string(),
      trainingDataItemsCount: z.string(),
      validationAnnotationsCount: z.string(),
      validationDataItemsCount: z.string(),
    }),
    defaultCheckpointId: z.string(),
    deployedModels: z.array(z.object({
      checkpointId: z.string(),
      deployedModelId: z.string(),
      endpoint: z.string(),
    })),
    description: z.string(),
    displayName: z.string(),
    encryptionSpec: z.object({
      kmsKeyName: z.string(),
    }),
    etag: z.string(),
    explanationSpec: z.object({
      metadata: z.object({
        featureAttributionsSchemaUri: z.string(),
        inputs: z.record(z.string(), z.unknown()),
        latentSpaceSource: z.string(),
        outputs: z.record(z.string(), z.unknown()),
      }),
      parameters: z.object({
        examples: z.object({
          exampleGcsSource: z.object({
            dataFormat: z.unknown(),
            gcsSource: z.unknown(),
          }),
          nearestNeighborSearchConfig: z.string(),
          neighborCount: z.number(),
          presets: z.object({
            modality: z.unknown(),
            query: z.unknown(),
          }),
        }),
        integratedGradientsAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.unknown(),
          }),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.unknown(),
            noiseSigma: z.unknown(),
            noisySampleCount: z.unknown(),
          }),
          stepCount: z.number(),
        }),
        outputIndices: z.array(z.string()),
        sampledShapleyAttribution: z.object({
          pathCount: z.number(),
        }),
        topK: z.number(),
        xraiAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.unknown(),
          }),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.unknown(),
            noiseSigma: z.unknown(),
            noisySampleCount: z.unknown(),
          }),
          stepCount: z.number(),
        }),
      }),
    }),
    labels: z.record(z.string(), z.unknown()),
    metadata: z.string(),
    metadataArtifact: z.string(),
    metadataSchemaUri: z.string(),
    modelSourceInfo: z.object({
      copy: z.boolean(),
      sourceType: z.string(),
    }),
    name: z.string(),
    originalModelInfo: z.object({
      model: z.string(),
    }),
    pipelineJob: z.string(),
    predictSchemata: z.object({
      instanceSchemaUri: z.string(),
      parametersSchemaUri: z.string(),
      predictionSchemaUri: z.string(),
    }),
    satisfiesPzi: z.boolean(),
    satisfiesPzs: z.boolean(),
    supportedDeploymentResourcesTypes: z.array(z.string()),
    supportedExportFormats: z.array(z.object({
      exportableContents: z.array(z.string()),
      id: z.string(),
    })),
    supportedInputStorageFormats: z.array(z.string()),
    supportedOutputStorageFormats: z.array(z.string()),
    trainingPipeline: z.string(),
    updateTime: z.string(),
    versionAliases: z.array(z.string()),
    versionCreateTime: z.string(),
    versionDescription: z.string(),
    versionId: z.string(),
    versionUpdateTime: z.string(),
  }).optional(),
  name: z.string(),
  parentModel: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  trainingTaskDefinition: z.string().optional(),
  trainingTaskInputs: z.string().optional(),
  trainingTaskMetadata: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  displayName: z.string().describe(
    "Required. The user-defined name of this TrainingPipeline.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
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
  inputDataConfig: z.object({
    annotationSchemaUri: z.string().describe(
      "Applicable only to custom training with Datasets that have DataItems and Annotations. Cloud Storage URI that points to a YAML file describing the annotation schema. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). The schema files that can be used here are found in gs://google-cloud-aiplatform/schema/dataset/annotation/, note that the chosen schema must be consistent with metadata of the Dataset specified by dataset_id. Only Annotations that both match this schema and belong to DataItems not ignored by the split method are used in respectively training, validation or test role, depending on the role of the DataItem they are on. When used in conjunction with annotations_filter, the Annotations used for training are filtered by both annotations_filter and annotation_schema_uri.",
    ).optional(),
    annotationsFilter: z.string().describe(
      "Applicable only to Datasets that have DataItems and Annotations. A filter on Annotations of the Dataset. Only Annotations that both match this filter and belong to DataItems not ignored by the split method are used in respectively training, validation or test role, depending on the role of the DataItem they are on (for the auto-assigned that role is decided by Vertex AI). A filter with same syntax as the one used in ListAnnotations may be used, but note here it filters across all Annotations of the Dataset, and not just within a single DataItem.",
    ).optional(),
    bigqueryDestination: z.object({
      outputUri: z.string().describe(
        "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
      ).optional(),
    }).describe("The BigQuery location for the output content.").optional(),
    datasetId: z.string().describe(
      "Required. The ID of the Dataset in the same Project and Location which data will be used to train the Model. The Dataset must use schema compatible with Model being trained, and what is compatible should be described in the used TrainingPipeline's training_task_definition. For tabular Datasets, all their data is exported to training, to pick and choose from.",
    ).optional(),
    filterSplit: z.object({
      testFilter: z.string().describe(
        "Required. A filter on DataItems of the Dataset. DataItems that match this filter are used to test the Model. A filter with same syntax as the one used in DatasetService.ListDataItems may be used. If a single DataItem is matched by more than one of the FilterSplit filters, then it is assigned to the first set that applies to it in the training, validation, test order.",
      ).optional(),
      trainingFilter: z.string().describe(
        "Required. A filter on DataItems of the Dataset. DataItems that match this filter are used to train the Model. A filter with same syntax as the one used in DatasetService.ListDataItems may be used. If a single DataItem is matched by more than one of the FilterSplit filters, then it is assigned to the first set that applies to it in the training, validation, test order.",
      ).optional(),
      validationFilter: z.string().describe(
        "Required. A filter on DataItems of the Dataset. DataItems that match this filter are used to validate the Model. A filter with same syntax as the one used in DatasetService.ListDataItems may be used. If a single DataItem is matched by more than one of the FilterSplit filters, then it is assigned to the first set that applies to it in the training, validation, test order.",
      ).optional(),
    }).describe(
      "Assigns input data to training, validation, and test sets based on the given filters, data pieces not matched by any filter are ignored. Currently only supported for Datasets containing DataItems. If any of the filters in this message are to match nothing, then they can be set as '-' (the minus sign). Supported only for unstructured Datasets.",
    ).optional(),
    fractionSplit: z.object({
      testFraction: z.number().describe(
        "The fraction of the input data that is to be used to evaluate the Model.",
      ).optional(),
      trainingFraction: z.number().describe(
        "The fraction of the input data that is to be used to train the Model.",
      ).optional(),
      validationFraction: z.number().describe(
        "The fraction of the input data that is to be used to validate the Model.",
      ).optional(),
    }).describe(
      "Assigns the input data to training, validation, and test sets as per the given fractions. Any of `training_fraction`, `validation_fraction` and `test_fraction` may optionally be provided, they must sum to up to 1. If the provided ones sum to less than 1, the remainder is assigned to sets as decided by Vertex AI. If none of the fractions are set, by default roughly 80% of data is used for training, 10% for validation, and 10% for test.",
    ).optional(),
    gcsDestination: z.object({
      outputUriPrefix: z.string().describe(
        "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
      ).optional(),
    }).describe(
      "The Google Cloud Storage location where the output is to be written to.",
    ).optional(),
    persistMlUseAssignment: z.boolean().describe(
      "Whether to persist the ML use assignment to data item system labels.",
    ).optional(),
    predefinedSplit: z.object({
      key: z.string().describe(
        "Required. The key is a name of one of the Dataset's data columns. The value of the key (either the label's value or value in the column) must be one of {`training`, `validation`, `test`}, and it defines to which set the given piece of data is assigned. If for a piece of data the key is not present or has an invalid value, that piece is ignored by the pipeline.",
      ).optional(),
    }).describe(
      "Assigns input data to training, validation, and test sets based on the value of a provided key. Supported only for tabular Datasets.",
    ).optional(),
    savedQueryId: z.string().describe(
      "Only applicable to Datasets that have SavedQueries. The ID of a SavedQuery (annotation set) under the Dataset specified by dataset_id used for filtering Annotations for training. Only Annotations that are associated with this SavedQuery are used in respectively training. When used in conjunction with annotations_filter, the Annotations used for training are filtered by both saved_query_id and annotations_filter. Only one of saved_query_id and annotation_schema_uri should be specified as both of them represent the same thing: problem type.",
    ).optional(),
    stratifiedSplit: z.object({
      key: z.string().describe(
        "Required. The key is a name of one of the Dataset's data columns. The key provided must be for a categorical column.",
      ).optional(),
      testFraction: z.number().describe(
        "The fraction of the input data that is to be used to evaluate the Model.",
      ).optional(),
      trainingFraction: z.number().describe(
        "The fraction of the input data that is to be used to train the Model.",
      ).optional(),
      validationFraction: z.number().describe(
        "The fraction of the input data that is to be used to validate the Model.",
      ).optional(),
    }).describe(
      'Assigns input data to the training, validation, and test sets so that the distribution of values found in the categorical column (as specified by the `key` field) is mirrored within each split. The fraction values determine the relative sizes of the splits. For example, if the specified column has three values, with 50% of the rows having value "A", 25% value "B", and 25% value "C", and the split fractions are specified as 80/10/10, then the training set will constitute 80% of the training data, with about 50% of the training set rows having the value "A" for the specified column, about 25% having the value "B", and about 25% having the value "C". Only the top 500 occurring values are used; any values not in the top 500 values are randomly assigned to a split. If less than three rows contain a specific value, those rows are randomly assigned. Supported only for tabular Datasets.',
    ).optional(),
    timestampSplit: z.object({
      key: z.string().describe(
        'Required. The key is a name of one of the Dataset\'s data columns. The values of the key (the values in the column) must be in RFC 3339 `date-time` format, where `time-offset` = `"Z"` (e.g. 1985-04-12T23:20:50.52Z). If for a piece of data the key is not present or has an invalid value, that piece is ignored by the pipeline.',
      ).optional(),
      testFraction: z.number().describe(
        "The fraction of the input data that is to be used to evaluate the Model.",
      ).optional(),
      trainingFraction: z.number().describe(
        "The fraction of the input data that is to be used to train the Model.",
      ).optional(),
      validationFraction: z.number().describe(
        "The fraction of the input data that is to be used to validate the Model.",
      ).optional(),
    }).describe(
      "Assigns input data to training, validation, and test sets based on a provided timestamps. The youngest data pieces are assigned to training set, next to validation set, and the oldest to the test set. Supported only for tabular Datasets.",
    ).optional(),
  }).describe(
    "Specifies Vertex AI owned input data to be used for training, and possibly evaluating, the Model.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize TrainingPipelines. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  modelId: z.string().describe(
    "Optional. The ID to use for the uploaded Model, which will become the final component of the model resource name. This value may be up to 63 characters, and valid characters are `[a-z0-9_-]`. The first character cannot be a number or hyphen.",
  ).optional(),
  modelToUpload: z.object({
    artifactUri: z.string().describe(
      "Immutable. The path to the directory containing the Model artifact and any of its supporting files. Not required for AutoML Models.",
    ).optional(),
    baseModelSource: z.object({
      genieSource: z.object({
        baseModelUri: z.string().describe(
          "Required. The public base model URI.",
        ).optional(),
      }).describe(
        "Contains information about the source of the models generated from Generative AI Studio.",
      ).optional(),
      modelGardenSource: z.object({
        publicModelName: z.string().describe(
          "Required. The model garden source model resource name.",
        ).optional(),
        skipHfModelCache: z.boolean().describe(
          "Optional. Whether to avoid pulling the model from the HF cache.",
        ).optional(),
        versionId: z.string().describe(
          "Optional. The model garden source model version ID.",
        ).optional(),
      }).describe(
        "Contains information about the source of the models generated from Model Garden.",
      ).optional(),
    }).describe(
      "User input field to specify the base model source. Currently it only supports specifing the Model Garden models and Genie models.",
    ).optional(),
    checkpoints: z.array(z.object({
      checkpointId: z.string().describe("The ID of the checkpoint.").optional(),
      epoch: z.string().describe("The epoch of the checkpoint.").optional(),
      step: z.string().describe("The step of the checkpoint.").optional(),
    })).describe("Optional. Output only. The checkpoints of the model.")
      .optional(),
    containerSpec: z.object({
      args: z.array(z.string()).describe(
        "Immutable. Specifies arguments for the command that runs when the container starts. This overrides the container's [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd). Specify this field as an array of executable and arguments, similar to a Docker `CMD`'s \"default parameters\" form. If you don't specify this field but do specify the command field, then the command from the `command` field runs without any additional arguments. See the [Kubernetes documentation about how the `command` and `args` fields interact with a container's `ENTRYPOINT` and `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes). If you don't specify this field and don't specify the `command` field, then the container's [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#cmd) and `CMD` determine what runs based on their default behavior. See the Docker documentation about [how `CMD` and `ENTRYPOINT` interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact). In this field, you can reference [environment variables set by Vertex AI](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables) and environment variables set in the env field. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $( VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field corresponds to the `args` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).",
      ).optional(),
      command: z.array(z.string()).describe(
        "Immutable. Specifies the command that runs when the container starts. This overrides the container's [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint). Specify this field as an array of executable and arguments, similar to a Docker `ENTRYPOINT`'s \"exec\" form, not its \"shell\" form. If you do not specify this field, then the container's `ENTRYPOINT` runs, in conjunction with the args field or the container's [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd), if either exists. If this field is not specified and the container does not have an `ENTRYPOINT`, then refer to the Docker documentation about [how `CMD` and `ENTRYPOINT` interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact). If you specify this field, then you can also specify the `args` field to provide additional arguments for this command. However, if you specify this field, then the container's `CMD` is ignored. See the [Kubernetes documentation about how the `command` and `args` fields interact with a container's `ENTRYPOINT` and `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes). In this field, you can reference [environment variables set by Vertex AI](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables) and environment variables set in the env field. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $( VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field corresponds to the `command` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).",
      ).optional(),
      deploymentTimeout: z.string().describe(
        "Immutable. Deployment timeout. Limit for deployment timeout is 2 hours.",
      ).optional(),
      env: z.array(z.object({
        name: z.string().describe(
          "Required. Name of the environment variable. Must be a valid C identifier.",
        ).optional(),
        value: z.string().describe(
          "Required. Variables that reference a $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not.",
        ).optional(),
      })).describe(
        'Immutable. List of environment variables to set in the container. After the container starts running, code running in the container can read these environment variables. Additionally, the command and args fields can reference these variables. Later entries in this list can also reference earlier entries. For example, the following example sets the variable `VAR_2` to have the value `foo bar`: ` json [ { "name": "VAR_1", "value": "foo" }, { "name": "VAR_2", "value": "$(VAR_1) bar" } ] ` If you switch the order of the variables in the example, then the expansion does not occur. This field corresponds to the `env` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).',
      ).optional(),
      grpcPorts: z.array(z.object({
        containerPort: z.number().int().describe(
          "The number of the port to expose on the pod's IP address. Must be a valid port number, between 1 and 65535 inclusive.",
        ).optional(),
      })).describe(
        "Immutable. List of ports to expose from the container. Vertex AI sends gRPC prediction requests that it receives to the first port on this list. Vertex AI also sends liveness and health checks to this port. If you do not specify this field, gRPC requests to the container will be disabled. Vertex AI does not use ports other than the first one listed. This field corresponds to the `ports` field of the Kubernetes Containers v1 core API.",
      ).optional(),
      healthProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()).describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe("ExecAction specifies a command to execute.").optional(),
        failureThreshold: z.number().int().describe(
          "Number of consecutive failures before the probe is considered failed. Defaults to 3. Minimum value is 1. Maps to Kubernetes probe argument 'failureThreshold'.",
        ).optional(),
        grpc: z.object({
          port: z.number().int().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.string().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. See https://github.com/grpc/grpc/blob/master/doc/health-checking.md. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe(
          "GrpcAction checks the health of a container using a gRPC service.",
        ).optional(),
        httpGet: z.object({
          host: z.string().describe(
            'Host name to connect to, defaults to the model serving container\'s IP. You probably want to set "Host" in httpHeaders instead.',
          ).optional(),
          httpHeaders: z.array(z.unknown()).describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.string().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.string().describe(
            'Scheme to use for connecting to the host. Defaults to HTTP. Acceptable values are "HTTP" or "HTTPS".',
          ).optional(),
        }).describe(
          "HttpGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds to wait before starting the probe. Defaults to 0. Minimum value is 0. Maps to Kubernetes probe argument 'initialDelaySeconds'.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Must be less than timeout_seconds. Maps to Kubernetes probe argument 'periodSeconds'.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Number of consecutive successes before the probe is considered successful. Defaults to 1. Minimum value is 1. Maps to Kubernetes probe argument 'successThreshold'.",
        ).optional(),
        tcpSocket: z.object({
          host: z.string().describe(
            "Optional: Host name to connect to, defaults to the model serving container's IP.",
          ).optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TcpSocketAction probes the health of a container by opening a TCP socket connection.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Must be greater or equal to period_seconds. Maps to Kubernetes probe argument 'timeoutSeconds'.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      healthRoute: z.string().describe(
        "Immutable. HTTP path on the container to send health checks to. Vertex AI intermittently sends GET requests to this path on the container's IP address and port to check that the container is healthy. Read more about [health checks](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#health). For example, if you set this field to `/bar`, then Vertex AI intermittently sends a GET request to the `/bar` path on the port of your container specified by the first value of this `ModelContainerSpec`'s ports field. If you don't specify this field, it defaults to the following value when you deploy this Model to an Endpoint: /v1/endpoints/ENDPOINT/deployedModels/ DEPLOYED_MODEL:predict The placeholders in this value are replaced as follows: * ENDPOINT: The last segment (following `endpoints/`)of the Endpoint.name][] field of the Endpoint where this Model has been deployed. (Vertex AI makes this value available to your container code as the [`AIP_ENDPOINT_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).) * DEPLOYED_MODEL: DeployedModel.id of the `DeployedModel`. (Vertex AI makes this value available to your container code as the [`AIP_DEPLOYED_MODEL_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).)",
      ).optional(),
      imageUri: z.string().describe(
        "Required. Immutable. URI of the Docker image to be used as the custom container for serving predictions. This URI must identify an image in Artifact Registry or Container Registry. Learn more about the [container publishing requirements](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#publishing), including permissions requirements for the Vertex AI Service Agent. The container image is ingested upon ModelService.UploadModel, stored internally, and this original path is afterwards not used. To learn about the requirements for the Docker image itself, see [Custom container requirements](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#). You can use the URI to one of Vertex AI's [pre-built container images for prediction](https://cloud.google.com/vertex-ai/docs/predictions/pre-built-containers) in this field.",
      ).optional(),
      invokeRoutePrefix: z.string().describe(
        'Immutable. Invoke route prefix for the custom container. "/*" is the only supported value right now. By setting this field, any non-root route on this model will be accessible with invoke http call eg: "/invoke/foo/bar", however the [PredictionService.Invoke] RPC is not supported yet. Only one of `predict_route` or `invoke_route_prefix` can be set, and we default to using `predict_route` if this field is not set. If this field is set, the Model can only be deployed to dedicated endpoint.',
      ).optional(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()).describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe("ExecAction specifies a command to execute.").optional(),
        failureThreshold: z.number().int().describe(
          "Number of consecutive failures before the probe is considered failed. Defaults to 3. Minimum value is 1. Maps to Kubernetes probe argument 'failureThreshold'.",
        ).optional(),
        grpc: z.object({
          port: z.number().int().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.string().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. See https://github.com/grpc/grpc/blob/master/doc/health-checking.md. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe(
          "GrpcAction checks the health of a container using a gRPC service.",
        ).optional(),
        httpGet: z.object({
          host: z.string().describe(
            'Host name to connect to, defaults to the model serving container\'s IP. You probably want to set "Host" in httpHeaders instead.',
          ).optional(),
          httpHeaders: z.array(z.unknown()).describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.string().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.string().describe(
            'Scheme to use for connecting to the host. Defaults to HTTP. Acceptable values are "HTTP" or "HTTPS".',
          ).optional(),
        }).describe(
          "HttpGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds to wait before starting the probe. Defaults to 0. Minimum value is 0. Maps to Kubernetes probe argument 'initialDelaySeconds'.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Must be less than timeout_seconds. Maps to Kubernetes probe argument 'periodSeconds'.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Number of consecutive successes before the probe is considered successful. Defaults to 1. Minimum value is 1. Maps to Kubernetes probe argument 'successThreshold'.",
        ).optional(),
        tcpSocket: z.object({
          host: z.string().describe(
            "Optional: Host name to connect to, defaults to the model serving container's IP.",
          ).optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TcpSocketAction probes the health of a container by opening a TCP socket connection.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Must be greater or equal to period_seconds. Maps to Kubernetes probe argument 'timeoutSeconds'.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      ports: z.array(z.object({
        containerPort: z.number().int().describe(
          "The number of the port to expose on the pod's IP address. Must be a valid port number, between 1 and 65535 inclusive.",
        ).optional(),
      })).describe(
        'Immutable. List of ports to expose from the container. Vertex AI sends any prediction requests that it receives to the first port on this list. Vertex AI also sends [liveness and health checks](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#liveness) to this port. If you do not specify this field, it defaults to following value: ` json [ { "containerPort": 8080 } ] ` Vertex AI does not use ports other than the first one listed. This field corresponds to the `ports` field of the Kubernetes Containers [v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).',
      ).optional(),
      predictRoute: z.string().describe(
        "Immutable. HTTP path on the container to send prediction requests to. Vertex AI forwards requests sent using projects.locations.endpoints.predict to this path on the container's IP address and port. Vertex AI then returns the container's response in the API response. For example, if you set this field to `/foo`, then when Vertex AI receives a prediction request, it forwards the request body in a POST request to the `/foo` path on the port of your container specified by the first value of this `ModelContainerSpec`'s ports field. If you don't specify this field, it defaults to the following value when you deploy this Model to an Endpoint: /v1/endpoints/ENDPOINT/deployedModels/DEPLOYED_MODEL:predict The placeholders in this value are replaced as follows: * ENDPOINT: The last segment (following `endpoints/`)of the Endpoint.name][] field of the Endpoint where this Model has been deployed. (Vertex AI makes this value available to your container code as the [`AIP_ENDPOINT_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).) * DEPLOYED_MODEL: DeployedModel.id of the `DeployedModel`. (Vertex AI makes this value available to your container code as the [`AIP_DEPLOYED_MODEL_ID` environment variable](https://cloud.google.com/vertex-ai/docs/predictions/custom-container-requirements#aip-variables).)",
      ).optional(),
      sharedMemorySizeMb: z.string().describe(
        "Immutable. The amount of the VM memory to reserve as the shared memory for the model in megabytes.",
      ).optional(),
      startupProbe: z.object({
        exec: z.object({
          command: z.array(z.unknown()).describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe("ExecAction specifies a command to execute.").optional(),
        failureThreshold: z.number().int().describe(
          "Number of consecutive failures before the probe is considered failed. Defaults to 3. Minimum value is 1. Maps to Kubernetes probe argument 'failureThreshold'.",
        ).optional(),
        grpc: z.object({
          port: z.number().int().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.string().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. See https://github.com/grpc/grpc/blob/master/doc/health-checking.md. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe(
          "GrpcAction checks the health of a container using a gRPC service.",
        ).optional(),
        httpGet: z.object({
          host: z.string().describe(
            'Host name to connect to, defaults to the model serving container\'s IP. You probably want to set "Host" in httpHeaders instead.',
          ).optional(),
          httpHeaders: z.array(z.unknown()).describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.string().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.string().describe(
            'Scheme to use for connecting to the host. Defaults to HTTP. Acceptable values are "HTTP" or "HTTPS".',
          ).optional(),
        }).describe(
          "HttpGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds to wait before starting the probe. Defaults to 0. Minimum value is 0. Maps to Kubernetes probe argument 'initialDelaySeconds'.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Must be less than timeout_seconds. Maps to Kubernetes probe argument 'periodSeconds'.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Number of consecutive successes before the probe is considered successful. Defaults to 1. Minimum value is 1. Maps to Kubernetes probe argument 'successThreshold'.",
        ).optional(),
        tcpSocket: z.object({
          host: z.string().describe(
            "Optional: Host name to connect to, defaults to the model serving container's IP.",
          ).optional(),
          port: z.number().int().describe(
            "Number of the port to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TcpSocketAction probes the health of a container by opening a TCP socket connection.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Must be greater or equal to period_seconds. Maps to Kubernetes probe argument 'timeoutSeconds'.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
    }).describe(
      "Specification of a container for serving predictions. Some fields in this message correspond to fields in the [Kubernetes Container v1 core specification](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core).",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp when this Model was uploaded into Vertex AI.",
    ).optional(),
    dataStats: z.object({
      testAnnotationsCount: z.string().describe(
        "Number of Annotations that are used for evaluating this Model. If the Model is evaluated multiple times, this will be the number of test Annotations used by the first evaluation. If the Model is not evaluated, the number is 0.",
      ).optional(),
      testDataItemsCount: z.string().describe(
        "Number of DataItems that were used for evaluating this Model. If the Model is evaluated multiple times, this will be the number of test DataItems used by the first evaluation. If the Model is not evaluated, the number is 0.",
      ).optional(),
      trainingAnnotationsCount: z.string().describe(
        "Number of Annotations that are used for training this Model.",
      ).optional(),
      trainingDataItemsCount: z.string().describe(
        "Number of DataItems that were used for training this Model.",
      ).optional(),
      validationAnnotationsCount: z.string().describe(
        "Number of Annotations that are used for validating this Model during training.",
      ).optional(),
      validationDataItemsCount: z.string().describe(
        "Number of DataItems that were used for validating this Model during training.",
      ).optional(),
    }).describe("Stats of data used for train or evaluate the Model.")
      .optional(),
    defaultCheckpointId: z.string().describe(
      "The default checkpoint id of a model version.",
    ).optional(),
    deployedModels: z.array(z.object({
      checkpointId: z.string().describe(
        "Immutable. The ID of the Checkpoint deployed in the DeployedModel.",
      ).optional(),
      deployedModelId: z.string().describe(
        "Immutable. An ID of a DeployedModel in the above Endpoint.",
      ).optional(),
      endpoint: z.string().describe(
        "Immutable. A resource name of an Endpoint.",
      ).optional(),
    })).describe(
      "Output only. The pointers to DeployedModels created from this Model. Note that Model could have been deployed to Endpoints in different Locations.",
    ).optional(),
    description: z.string().describe("The description of the Model.")
      .optional(),
    displayName: z.string().describe(
      "Required. The display name of the Model. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
    ).optional(),
    encryptionSpec: z.object({
      kmsKeyName: z.string().describe(
        "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
    }).describe(
      "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
    ).optional(),
    etag: z.string().describe(
      'Used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
    ).optional(),
    explanationSpec: z.object({
      metadata: z.object({
        featureAttributionsSchemaUri: z.string().describe(
          "Points to a YAML file stored on Google Cloud Storage describing the format of the feature attributions. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML tabular Models always have this field populated by Vertex AI. Note: The URI given on output may be different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
        ).optional(),
        inputs: z.record(
          z.string(),
          z.object({
            denseShapeTensorName: z.unknown().describe(
              "Specifies the shape of the values of the input if the input is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
            ).optional(),
            encodedBaselines: z.unknown().describe(
              "A list of baselines for the encoded tensor. The shape of each baseline should match the shape of the encoded tensor. If a scalar is provided, Vertex AI broadcasts to the same shape as the encoded tensor.",
            ).optional(),
            encodedTensorName: z.unknown().describe(
              "Encoded tensor is a transformation of the input tensor. Must be provided if choosing Integrated Gradients attribution or XRAI attribution and the input tensor is not differentiable. An encoded tensor is generated if the input tensor is encoded by a lookup table.",
            ).optional(),
            encoding: z.unknown().describe(
              "Defines how the feature is encoded into the input tensor. Defaults to IDENTITY.",
            ).optional(),
            featureValueDomain: z.unknown().describe(
              "Domain details of the input feature value. Provides numeric information about the feature, such as its range (min, max). If the feature has been pre-processed, for example with z-scoring, then it provides information about how to recover the original feature. For example, if the input feature is an image and it has been pre-processed to obtain 0-mean and stddev = 1 values, then original_mean, and original_stddev refer to the mean and stddev of the original feature (e.g. image tensor) from which input feature (with mean = 0 and stddev = 1) was obtained.",
            ).optional(),
            groupName: z.unknown().describe(
              "Name of the group that the input belongs to. Features with the same group name will be treated as one feature when computing attributions. Features grouped together can have different shapes in value. If provided, there will be one single attribution generated in Attribution.feature_attributions, keyed by the group name.",
            ).optional(),
            indexFeatureMapping: z.unknown().describe(
              "A list of feature names for each index in the input tensor. Required when the input InputMetadata.encoding is BAG_OF_FEATURES, BAG_OF_FEATURES_SPARSE, INDICATOR.",
            ).optional(),
            indicesTensorName: z.unknown().describe(
              "Specifies the index of the values of the input tensor. Required when the input tensor is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
            ).optional(),
            inputBaselines: z.unknown().describe(
              "Baseline inputs for this feature. If no baseline is specified, Vertex AI chooses the baseline for this feature. If multiple baselines are specified, Vertex AI returns the average attributions across them in Attribution.feature_attributions. For Vertex AI-provided Tensorflow images (both 1.x and 2.x), the shape of each baseline must match the shape of the input tensor. If a scalar is provided, we broadcast to the same shape as the input tensor. For custom images, the element of the baselines must be in the same format as the feature's input in the instance[]. The schema of any single instance may be specified via Endpoint's DeployedModels' Model's PredictSchemata's instance_schema_uri.",
            ).optional(),
            inputTensorName: z.unknown().describe(
              "Name of the input tensor for this feature. Required and is only applicable to Vertex AI-provided images for Tensorflow.",
            ).optional(),
            modality: z.unknown().describe(
              "Modality of the feature. Valid values are: numeric, image. Defaults to numeric.",
            ).optional(),
            visualization: z.unknown().describe(
              "Visualization configurations for image explanation.",
            ).optional(),
          }),
        ).describe(
          "Required. Map from feature names to feature input metadata. Keys are the name of the features. Values are the specification of the feature. An empty InputMetadata is valid. It describes a text feature which has the name specified as the key in ExplanationMetadata.inputs. The baseline of the empty feature is chosen by Vertex AI. For Vertex AI-provided Tensorflow images, the key can be any friendly name of the feature. Once specified, featureAttributions are keyed by this key (if not grouped with another feature). For custom images, the key must match with the key in instance.",
        ).optional(),
        latentSpaceSource: z.string().describe(
          "Name of the source to generate embeddings for example based explanations.",
        ).optional(),
        outputs: z.record(
          z.string(),
          z.object({
            displayNameMappingKey: z.unknown().describe(
              "Specify a field name in the prediction to look for the display name. Use this if the prediction contains the display names for the outputs. The display names in the prediction must have the same shape of the outputs, so that it can be located by Attribution.output_index for a specific output.",
            ).optional(),
            indexDisplayNameMapping: z.unknown().describe(
              "Static mapping between the index and display name. Use this if the outputs are a deterministic n-dimensional array, e.g. a list of scores of all the classes in a pre-defined order for a multi-classification Model. It's not feasible if the outputs are non-deterministic, e.g. the Model produces top-k classes or sort the outputs by their values. The shape of the value must be an n-dimensional array of strings. The number of dimensions must match that of the outputs to be explained. The Attribution.output_display_name is populated by locating in the mapping with Attribution.output_index.",
            ).optional(),
            outputTensorName: z.unknown().describe(
              "Name of the output tensor. Required and is only applicable to Vertex AI provided images for Tensorflow.",
            ).optional(),
          }),
        ).describe(
          "Required. Map from output names to output metadata. For Vertex AI-provided Tensorflow images, keys can be any user defined string that consists of any UTF-8 characters. For custom images, keys are the name of the output field in the prediction to be explained. Currently only one key is allowed.",
        ).optional(),
      }).describe(
        "Metadata describing the Model's input and output for explanation.",
      ).optional(),
      parameters: z.object({
        examples: z.object({
          exampleGcsSource: z.object({
            dataFormat: z.unknown().describe(
              "The format in which instances are given, if not specified, assume it's JSONL format. Currently only JSONL format is supported.",
            ).optional(),
            gcsSource: z.unknown().describe(
              "The Google Cloud Storage location for the input content.",
            ).optional(),
          }).describe("The Cloud Storage input instances.").optional(),
          nearestNeighborSearchConfig: z.string().describe(
            "The full configuration for the generated index, the semantics are the same as metadata and should match [NearestNeighborSearchConfig](https://cloud.google.com/vertex-ai/docs/explainable-ai/configuring-explanations-example-based#nearest-neighbor-search-config).",
          ).optional(),
          neighborCount: z.number().int().describe(
            "The number of neighbors to return when querying for examples.",
          ).optional(),
          presets: z.object({
            modality: z.unknown().describe(
              "The modality of the uploaded model, which automatically configures the distance measurement and feature normalization for the underlying example index and queries. If your model does not precisely fit one of these types, it is okay to choose the closest type.",
            ).optional(),
            query: z.unknown().describe(
              "Preset option controlling parameters for speed-precision trade-off when querying for examples. If omitted, defaults to `PRECISE`.",
            ).optional(),
          }).describe("Preset configuration for example-based explanations")
            .optional(),
        }).describe(
          "Example-based explainability that returns the nearest neighbors from the provided dataset.",
        ).optional(),
        integratedGradientsAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.unknown().describe(
              "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
            ).optional(),
          }).describe(
            "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
          ).optional(),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.unknown().describe(
              "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
            ).optional(),
            noiseSigma: z.unknown().describe(
              "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
            ).optional(),
            noisySampleCount: z.unknown().describe(
              "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
            ).optional(),
          }).describe(
            "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
          ).optional(),
          stepCount: z.number().int().describe(
            "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is within the desired error range. Valid range of its value is [1, 100], inclusively.",
          ).optional(),
        }).describe(
          "An attribution method that computes the Aumann-Shapley value taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1703.01365",
        ).optional(),
        outputIndices: z.array(z.string()).describe(
          "If populated, only returns attributions that have output_index contained in output_indices. It must be an ndarray of integers, with the same shape of the output it's explaining. If not populated, returns attributions for top_k indices of outputs. If neither top_k nor output_indices is populated, returns the argmax index of the outputs. Only applicable to Models that predict multiple outputs (e,g, multi-class Models that predict multiple classes).",
        ).optional(),
        sampledShapleyAttribution: z.object({
          pathCount: z.number().int().describe(
            "Required. The number of feature permutations to consider when approximating the Shapley values. Valid range of its value is [1, 50], inclusively.",
          ).optional(),
        }).describe(
          "An attribution method that approximates Shapley values for features that contribute to the label being predicted. A sampling strategy is used to approximate the value rather than considering all subsets of features.",
        ).optional(),
        topK: z.number().int().describe(
          "If populated, returns attributions for top K indices of outputs (defaults to 1). Only applies to Models that predicts more than one outputs (e,g, multi-class Models). When set to -1, returns explanations for all outputs.",
        ).optional(),
        xraiAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.unknown().describe(
              "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
            ).optional(),
          }).describe(
            "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
          ).optional(),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.unknown().describe(
              "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
            ).optional(),
            noiseSigma: z.unknown().describe(
              "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
            ).optional(),
            noisySampleCount: z.unknown().describe(
              "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
            ).optional(),
          }).describe(
            "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
          ).optional(),
          stepCount: z.number().int().describe(
            "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. Valid range of its value is [1, 100], inclusively.",
          ).optional(),
        }).describe(
          "An explanation method that redistributes Integrated Gradients attributions to segmented regions, taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1906.02825 Supported only by image Models.",
        ).optional(),
      }).describe("Parameters to configure explaining for Model's predictions.")
        .optional(),
    }).describe("Specification of Model explanation.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels with user-defined metadata to organize your Models. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
    ).optional(),
    metadata: z.string().describe(
      "Immutable. An additional information about the Model; the schema of the metadata can be found in metadata_schema. Unset if the Model does not have any additional information.",
    ).optional(),
    metadataArtifact: z.string().describe(
      "Output only. The resource name of the Artifact that was created in MetadataStore when creating the Model. The Artifact resource name pattern is `projects/{project}/locations/{location}/metadataStores/{metadata_store}/artifacts/{artifact}`.",
    ).optional(),
    metadataSchemaUri: z.string().describe(
      "Immutable. Points to a YAML file stored on Google Cloud Storage describing additional information about the Model, that is specific to it. Unset if the Model does not have any additional information. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI, if no additional metadata is needed, this field is set to an empty string. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
    ).optional(),
    modelSourceInfo: z.object({
      copy: z.boolean().describe(
        "If this Model is copy of another Model. If true then source_type pertains to the original.",
      ).optional(),
      sourceType: z.enum([
        "MODEL_SOURCE_TYPE_UNSPECIFIED",
        "AUTOML",
        "CUSTOM",
        "BQML",
        "MODEL_GARDEN",
        "GENIE",
        "CUSTOM_TEXT_EMBEDDING",
        "MARKETPLACE",
      ]).describe("Type of the model source.").optional(),
    }).describe("Detail description of the source information of the model.")
      .optional(),
    name: z.string().describe("Identifier. The resource name of the Model.")
      .optional(),
    originalModelInfo: z.object({
      model: z.string().describe(
        "Output only. The resource name of the Model this Model is a copy of, including the revision. Format: `projects/{project}/locations/{location}/models/{model_id}@{version_id}`",
      ).optional(),
    }).describe(
      "Contains information about the original Model if this Model is a copy.",
    ).optional(),
    pipelineJob: z.string().describe(
      "Optional. This field is populated if the model is produced by a pipeline job.",
    ).optional(),
    predictSchemata: z.object({
      instanceSchemaUri: z.string().describe(
        "Immutable. Points to a YAML file stored on Google Cloud Storage describing the format of a single instance, which are used in PredictRequest.instances, ExplainRequest.instances and BatchPredictionJob.input_config. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
      ).optional(),
      parametersSchemaUri: z.string().describe(
        "Immutable. Points to a YAML file stored on Google Cloud Storage describing the parameters of prediction and explanation via PredictRequest.parameters, ExplainRequest.parameters and BatchPredictionJob.model_parameters. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI, if no parameters are supported, then it is set to an empty string. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
      ).optional(),
      predictionSchemaUri: z.string().describe(
        "Immutable. Points to a YAML file stored on Google Cloud Storage describing the format of a single prediction produced by this Model, which are returned via PredictResponse.predictions, ExplainResponse.explanations, and BatchPredictionJob.output_config. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML Models always have this field populated by Vertex AI. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
      ).optional(),
    }).describe(
      "Contains the schemata used in Model's predictions and explanations via PredictionService.Predict, PredictionService.Explain and BatchPredictionJob.",
    ).optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    supportedDeploymentResourcesTypes: z.array(
      z.enum([
        "DEPLOYMENT_RESOURCES_TYPE_UNSPECIFIED",
        "DEDICATED_RESOURCES",
        "AUTOMATIC_RESOURCES",
        "SHARED_RESOURCES",
      ]),
    ).describe(
      "Output only. When this Model is deployed, its prediction resources are described by the `prediction_resources` field of the Endpoint.deployed_models object. Because not all Models support all resource configuration types, the configuration types this Model supports are listed here. If no configuration types are listed, the Model cannot be deployed to an Endpoint and does not support online predictions (PredictionService.Predict or PredictionService.Explain). Such a Model can serve predictions by using a BatchPredictionJob, if it has at least one entry each in supported_input_storage_formats and supported_output_storage_formats.",
    ).optional(),
    supportedExportFormats: z.array(z.object({
      exportableContents: z.array(
        z.enum(["EXPORTABLE_CONTENT_UNSPECIFIED", "ARTIFACT", "IMAGE"]),
      ).describe("Output only. The content of this Model that may be exported.")
        .optional(),
      id: z.string().describe(
        "Output only. The ID of the export format. The possible format IDs are: * `tflite` Used for Android mobile devices. * `edgetpu-tflite` Used for [Edge TPU](https://cloud.google.com/edge-tpu/) devices. * `tf-saved-model` A tensorflow model in SavedModel format. * `tf-js` A [TensorFlow.js](https://www.tensorflow.org/js) model that can be used in the browser and in Node.js using JavaScript. * `core-ml` Used for iOS mobile devices. * `custom-trained` A Model that was uploaded or trained by custom code. * `genie` A tuned Model Garden model.",
      ).optional(),
    })).describe(
      "Output only. The formats in which this Model may be exported. If empty, this Model is not available for export.",
    ).optional(),
    supportedInputStorageFormats: z.array(z.string()).describe(
      "Output only. The formats this Model supports in BatchPredictionJob.input_config. If PredictSchemata.instance_schema_uri exists, the instances should be given as per that schema. The possible formats are: * `jsonl` The JSON Lines format, where each instance is a single line. Uses GcsSource. * `csv` The CSV format, where each instance is a single comma-separated line. The first line in the file is the header, containing comma-separated field names. Uses GcsSource. * `tf-record` The TFRecord format, where each instance is a single record in tfrecord syntax. Uses GcsSource. * `tf-record-gzip` Similar to `tf-record`, but the file is gzipped. Uses GcsSource. * `bigquery` Each instance is a single row in BigQuery. Uses BigQuerySource. * `file-list` Each line of the file is the location of an instance to process, uses `gcs_source` field of the InputConfig object. If this Model doesn't support any of these formats it means it cannot be used with a BatchPredictionJob. However, if it has supported_deployment_resources_types, it could serve online predictions by using PredictionService.Predict or PredictionService.Explain.",
    ).optional(),
    supportedOutputStorageFormats: z.array(z.string()).describe(
      "Output only. The formats this Model supports in BatchPredictionJob.output_config. If both PredictSchemata.instance_schema_uri and PredictSchemata.prediction_schema_uri exist, the predictions are returned together with their instances. In other words, the prediction has the original instance data first, followed by the actual prediction content (as per the schema). The possible formats are: * `jsonl` The JSON Lines format, where each prediction is a single line. Uses GcsDestination. * `csv` The CSV format, where each prediction is a single comma-separated line. The first line in the file is the header, containing comma-separated field names. Uses GcsDestination. * `bigquery` Each prediction is a single row in a BigQuery table, uses BigQueryDestination. If this Model doesn't support any of these formats it means it cannot be used with a BatchPredictionJob. However, if it has supported_deployment_resources_types, it could serve online predictions by using PredictionService.Predict or PredictionService.Explain.",
    ).optional(),
    trainingPipeline: z.string().describe(
      "Output only. The resource name of the TrainingPipeline that uploaded this Model, if any.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp when this Model was most recently updated.",
    ).optional(),
    versionAliases: z.array(z.string()).describe(
      "User provided version aliases so that a model version can be referenced via alias (i.e. `projects/{project}/locations/{location}/models/{model_id}@{version_alias}` instead of auto-generated version id (i.e. `projects/{project}/locations/{location}/models/{model_id}@{version_id})`. The format is a-z{0,126}[a-z0-9] to distinguish from version_id. A default version alias will be created for the first version of the model, and there must be exactly one default version alias for a model.",
    ).optional(),
    versionCreateTime: z.string().describe(
      "Output only. Timestamp when this version was created.",
    ).optional(),
    versionDescription: z.string().describe("The description of this version.")
      .optional(),
    versionId: z.string().describe(
      "Output only. Immutable. The version ID of the model. A new version is committed when a new model version is uploaded or trained under an existing model id. It is an auto-incrementing decimal number in string representation.",
    ).optional(),
    versionUpdateTime: z.string().describe(
      "Output only. Timestamp when this version was most recently updated.",
    ).optional(),
  }).describe("A trained machine learning Model.").optional(),
  parentModel: z.string().describe(
    "Optional. When specify this field, the `model_to_upload` will not be uploaded as a new model, instead, it will become a new version of this `parent_model`.",
  ).optional(),
  trainingTaskDefinition: z.string().describe(
    "Required. A Google Cloud Storage path to the YAML file that defines the training task which is responsible for producing the model artifact, and may also include additional auxiliary work. The definition files that can be used here are found in gs://google-cloud-aiplatform/schema/trainingjob/definition/. Note: The URI given on output will be immutable and probably different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
  ).optional(),
  trainingTaskInputs: z.string().describe(
    "Required. The training task's parameter(s), as specified in the training_task_definition's `inputs`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform TrainingPipelines. Registered at `@swamp/gcp/aiplatform/trainingpipelines`. */
export const model = {
  type: "@swamp/gcp/aiplatform/trainingpipelines",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The TrainingPipeline orchestrates tasks associated with training a Model. It ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a trainingPipelines",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["inputDataConfig"] !== undefined) {
          body["inputDataConfig"] = g["inputDataConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["modelId"] !== undefined) body["modelId"] = g["modelId"];
        if (g["modelToUpload"] !== undefined) {
          body["modelToUpload"] = g["modelToUpload"];
        }
        if (g["parentModel"] !== undefined) {
          body["parentModel"] = g["parentModel"];
        }
        if (g["trainingTaskDefinition"] !== undefined) {
          body["trainingTaskDefinition"] = g["trainingTaskDefinition"];
        }
        if (g["trainingTaskInputs"] !== undefined) {
          body["trainingTaskInputs"] = g["trainingTaskInputs"];
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
          undefined,
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
      description: "Get a trainingPipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the trainingPipelines"),
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
      description: "Delete the trainingPipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the trainingPipelines"),
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
      description: "Sync trainingPipelines state from GCP",
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
    cancel: {
      description: "cancel",
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
            "id": "aiplatform.projects.locations.trainingPipelines.cancel",
            "path": "v1/{+name}:cancel",
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
