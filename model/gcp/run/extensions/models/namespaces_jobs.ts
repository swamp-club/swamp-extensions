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

// Auto-generated extension model for @swamp/gcp/run/namespaces-jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Namespaces.Jobs.
 *
 * Job represents the configuration of a single job, which references a container image which is run to completion.
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
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.namespaces.jobs.get",
  "path": "apis/run.googleapis.com/v1/{+name}",
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
  "id": "run.namespaces.jobs.create",
  "path": "apis/run.googleapis.com/v1/{+parent}/jobs",
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
  "id": "run.namespaces.jobs.delete",
  "path": "apis/run.googleapis.com/v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "apiVersion": {
      "location": "query",
    },
    "kind": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "propagationPolicy": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "run.namespaces.jobs.list",
  "path": "apis/run.googleapis.com/v1/{+parent}/jobs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "continue": {
      "location": "query",
    },
    "fieldSelector": {
      "location": "query",
    },
    "includeUninitialized": {
      "location": "query",
    },
    "labelSelector": {
      "location": "query",
    },
    "limit": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "resourceVersion": {
      "location": "query",
    },
    "watch": {
      "location": "query",
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
  apiVersion: z.string().describe(
    "Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values.",
  ).optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution.",
    ).optional(),
    clusterName: z.string().describe("Not supported by Cloud Run").optional(),
    creationTimestamp: z.string().describe(
      "UTC timestamp representing the server time when this object was created.",
    ).optional(),
    deletionGracePeriodSeconds: z.number().int().describe(
      "Not supported by Cloud Run",
    ).optional(),
    deletionTimestamp: z.string().describe(
      "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
    ).optional(),
    finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
      .optional(),
    generateName: z.string().describe(
      "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
    ).optional(),
    generation: z.number().int().describe(
      "A system-provided sequence number representing a specific generation of the desired state.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
    ).optional(),
    name: z.string().describe(
      "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
    ).optional(),
    namespace: z.string().describe(
      "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
    ).optional(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      blockOwnerDeletion: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      controller: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      kind: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      name: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      uid: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
    })).describe("Not supported by Cloud Run").optional(),
    resourceVersion: z.string().describe(
      "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
    ).optional(),
    selfLink: z.string().describe("URL representing this object.").optional(),
    uid: z.string().describe(
      "Unique, system-generated identifier for this resource.",
    ).optional(),
  }).describe(
    "google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
  ).optional(),
  spec: z.object({
    runExecutionToken: z.string().describe(
      "A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters.",
    ).optional(),
    startExecutionToken: z.string().describe(
      "A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters.",
    ).optional(),
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.string()).describe(
          "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution.",
        ).optional(),
        clusterName: z.string().describe("Not supported by Cloud Run")
          .optional(),
        creationTimestamp: z.string().describe(
          "UTC timestamp representing the server time when this object was created.",
        ).optional(),
        deletionGracePeriodSeconds: z.number().int().describe(
          "Not supported by Cloud Run",
        ).optional(),
        deletionTimestamp: z.string().describe(
          "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
        ).optional(),
        finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
          .optional(),
        generateName: z.string().describe(
          "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
        ).optional(),
        generation: z.number().int().describe(
          "A system-provided sequence number representing a specific generation of the desired state.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
        ).optional(),
        namespace: z.string().describe(
          "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
        ).optional(),
        ownerReferences: z.array(z.object({
          apiVersion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          blockOwnerDeletion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          controller: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          kind: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          name: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          uid: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
        })).describe("Not supported by Cloud Run").optional(),
        resourceVersion: z.string().describe(
          "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
        ).optional(),
        selfLink: z.string().describe("URL representing this object.")
          .optional(),
        uid: z.string().describe(
          "Unique, system-generated identifier for this resource.",
        ).optional(),
      }).describe(
        "google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
      ).optional(),
      spec: z.object({
        parallelism: z.number().int().describe(
          "Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed, i.e. when the work left to do is less than max parallelism.",
        ).optional(),
        taskCount: z.number().int().describe(
          "Optional. Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1.",
        ).optional(),
        template: z.object({
          spec: z.object({
            containers: z.unknown().describe(
              "Optional. List of containers belonging to the task. We disallow a number of fields on this Container.",
            ).optional(),
            maxRetries: z.unknown().describe(
              "Optional. Number of retries allowed per task, before marking this job failed. Defaults to 3.",
            ).optional(),
            nodeSelector: z.unknown().describe(
              "Optional. The Node Selector configuration. Map of selector key to a value which matches a node.",
            ).optional(),
            serviceAccountName: z.unknown().describe(
              "Optional. Email address of the IAM service account associated with the task of a job execution. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account.",
            ).optional(),
            timeoutSeconds: z.unknown().describe(
              "Optional. Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds.",
            ).optional(),
            volumes: z.unknown().describe(
              "Optional. List of volumes that can be mounted by containers belonging to the task.",
            ).optional(),
          }).describe("TaskSpec is a description of a task.").optional(),
        }).describe(
          "TaskTemplateSpec describes the data a task should have when created from a template.",
        ).optional(),
      }).describe("ExecutionSpec describes how the execution will look.")
        .optional(),
    }).describe(
      "ExecutionTemplateSpec describes the metadata and spec an Execution should have when created from a job.",
    ).optional(),
  }).describe("JobSpec describes how the job will look.").optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Optional. Last time the condition transitioned from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Optional. Human readable message indicating details about the current status.",
      ).optional(),
      reason: z.string().describe(
        "Optional. One-word CamelCase reason for the condition's last transition. These are intended to be stable, unique values which the client may use to trigger error handling logic, whereas messages which may be changed later by the server.",
      ).optional(),
      severity: z.string().describe(
        "Optional. How to interpret this condition. One of Error, Warning, or Info. Conditions of severity Info do not contribute to resource readiness.",
      ).optional(),
      status: z.string().describe(
        "Status of the condition, one of True, False, Unknown.",
      ).optional(),
      type: z.string().describe(
        'type is used to communicate the status of the reconciliation process. Types common to all resources include: * "Ready" or "Completed": True when the Resource is ready.',
      ).optional(),
    })).describe(
      'Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Job-specific conditions include: * `Ready`: `True` when the job is ready to be executed.',
    ).optional(),
    executionCount: z.number().int().describe(
      "Number of executions created for this job.",
    ).optional(),
    latestCreatedExecution: z.object({
      completionStatus: z.enum([
        "COMPLETION_STATUS_UNSPECIFIED",
        "EXECUTION_SUCCEEDED",
        "EXECUTION_FAILED",
        "EXECUTION_RUNNING",
        "EXECUTION_PENDING",
        "EXECUTION_CANCELLED",
      ]).describe("Optional. Status for the execution completion.").optional(),
      completionTimestamp: z.string().describe(
        "Optional. Completion timestamp of the execution.",
      ).optional(),
      creationTimestamp: z.string().describe(
        "Optional. Creation timestamp of the execution.",
      ).optional(),
      deletionTimestamp: z.string().describe(
        "Optional. The read-only soft deletion timestamp of the execution.",
      ).optional(),
      name: z.string().describe("Optional. Name of the execution.").optional(),
    }).describe(
      "Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status.",
    ).optional(),
    observedGeneration: z.number().int().describe(
      "The 'generation' of the job that was last processed by the controller.",
    ).optional(),
  }).describe("JobStatus represents the current state of a Job.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiVersion: z.string().optional(),
  kind: z.string().optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.unknown()),
    clusterName: z.string(),
    creationTimestamp: z.string(),
    deletionGracePeriodSeconds: z.number(),
    deletionTimestamp: z.string(),
    finalizers: z.array(z.string()),
    generateName: z.string(),
    generation: z.number(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    namespace: z.string(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string(),
      blockOwnerDeletion: z.boolean(),
      controller: z.boolean(),
      kind: z.string(),
      name: z.string(),
      uid: z.string(),
    })),
    resourceVersion: z.string(),
    selfLink: z.string(),
    uid: z.string(),
  }).optional(),
  spec: z.object({
    runExecutionToken: z.string(),
    startExecutionToken: z.string(),
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.unknown()),
        clusterName: z.string(),
        creationTimestamp: z.string(),
        deletionGracePeriodSeconds: z.number(),
        deletionTimestamp: z.string(),
        finalizers: z.array(z.string()),
        generateName: z.string(),
        generation: z.number(),
        labels: z.record(z.string(), z.unknown()),
        name: z.string(),
        namespace: z.string(),
        ownerReferences: z.array(z.object({
          apiVersion: z.unknown(),
          blockOwnerDeletion: z.unknown(),
          controller: z.unknown(),
          kind: z.unknown(),
          name: z.unknown(),
          uid: z.unknown(),
        })),
        resourceVersion: z.string(),
        selfLink: z.string(),
        uid: z.string(),
      }),
      spec: z.object({
        parallelism: z.number(),
        taskCount: z.number(),
        template: z.object({
          spec: z.object({
            containers: z.unknown(),
            maxRetries: z.unknown(),
            nodeSelector: z.unknown(),
            serviceAccountName: z.unknown(),
            timeoutSeconds: z.unknown(),
            volumes: z.unknown(),
          }),
        }),
      }),
    }),
  }).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      severity: z.string(),
      status: z.string(),
      type: z.string(),
    })),
    executionCount: z.number(),
    latestCreatedExecution: z.object({
      completionStatus: z.string(),
      completionTimestamp: z.string(),
      creationTimestamp: z.string(),
      deletionTimestamp: z.string(),
      name: z.string(),
    }),
    observedGeneration: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  apiVersion: z.string().describe(
    "Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values.",
  ).optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution.",
    ).optional(),
    clusterName: z.string().describe("Not supported by Cloud Run").optional(),
    creationTimestamp: z.string().describe(
      "UTC timestamp representing the server time when this object was created.",
    ).optional(),
    deletionGracePeriodSeconds: z.number().int().describe(
      "Not supported by Cloud Run",
    ).optional(),
    deletionTimestamp: z.string().describe(
      "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
    ).optional(),
    finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
      .optional(),
    generateName: z.string().describe(
      "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
    ).optional(),
    generation: z.number().int().describe(
      "A system-provided sequence number representing a specific generation of the desired state.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
    ).optional(),
    name: z.string().describe(
      "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
    ).optional(),
    namespace: z.string().describe(
      "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
    ).optional(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      blockOwnerDeletion: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      controller: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      kind: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      name: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      uid: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
    })).describe("Not supported by Cloud Run").optional(),
    resourceVersion: z.string().describe(
      "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
    ).optional(),
    selfLink: z.string().describe("URL representing this object.").optional(),
    uid: z.string().describe(
      "Unique, system-generated identifier for this resource.",
    ).optional(),
  }).describe(
    "google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
  ).optional(),
  spec: z.object({
    runExecutionToken: z.string().describe(
      "A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters.",
    ).optional(),
    startExecutionToken: z.string().describe(
      "A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters.",
    ).optional(),
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.string()).describe(
          "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution.",
        ).optional(),
        clusterName: z.string().describe("Not supported by Cloud Run")
          .optional(),
        creationTimestamp: z.string().describe(
          "UTC timestamp representing the server time when this object was created.",
        ).optional(),
        deletionGracePeriodSeconds: z.number().int().describe(
          "Not supported by Cloud Run",
        ).optional(),
        deletionTimestamp: z.string().describe(
          "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
        ).optional(),
        finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
          .optional(),
        generateName: z.string().describe(
          "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
        ).optional(),
        generation: z.number().int().describe(
          "A system-provided sequence number representing a specific generation of the desired state.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
        ).optional(),
        namespace: z.string().describe(
          "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
        ).optional(),
        ownerReferences: z.array(z.object({
          apiVersion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          blockOwnerDeletion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          controller: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          kind: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          name: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          uid: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
        })).describe("Not supported by Cloud Run").optional(),
        resourceVersion: z.string().describe(
          "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
        ).optional(),
        selfLink: z.string().describe("URL representing this object.")
          .optional(),
        uid: z.string().describe(
          "Unique, system-generated identifier for this resource.",
        ).optional(),
      }).describe(
        "google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
      ).optional(),
      spec: z.object({
        parallelism: z.number().int().describe(
          "Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed, i.e. when the work left to do is less than max parallelism.",
        ).optional(),
        taskCount: z.number().int().describe(
          "Optional. Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1.",
        ).optional(),
        template: z.object({
          spec: z.object({
            containers: z.unknown().describe(
              "Optional. List of containers belonging to the task. We disallow a number of fields on this Container.",
            ).optional(),
            maxRetries: z.unknown().describe(
              "Optional. Number of retries allowed per task, before marking this job failed. Defaults to 3.",
            ).optional(),
            nodeSelector: z.unknown().describe(
              "Optional. The Node Selector configuration. Map of selector key to a value which matches a node.",
            ).optional(),
            serviceAccountName: z.unknown().describe(
              "Optional. Email address of the IAM service account associated with the task of a job execution. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account.",
            ).optional(),
            timeoutSeconds: z.unknown().describe(
              "Optional. Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds.",
            ).optional(),
            volumes: z.unknown().describe(
              "Optional. List of volumes that can be mounted by containers belonging to the task.",
            ).optional(),
          }).describe("TaskSpec is a description of a task.").optional(),
        }).describe(
          "TaskTemplateSpec describes the data a task should have when created from a template.",
        ).optional(),
      }).describe("ExecutionSpec describes how the execution will look.")
        .optional(),
    }).describe(
      "ExecutionTemplateSpec describes the metadata and spec an Execution should have when created from a job.",
    ).optional(),
  }).describe("JobSpec describes how the job will look.").optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Optional. Last time the condition transitioned from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Optional. Human readable message indicating details about the current status.",
      ).optional(),
      reason: z.string().describe(
        "Optional. One-word CamelCase reason for the condition's last transition. These are intended to be stable, unique values which the client may use to trigger error handling logic, whereas messages which may be changed later by the server.",
      ).optional(),
      severity: z.string().describe(
        "Optional. How to interpret this condition. One of Error, Warning, or Info. Conditions of severity Info do not contribute to resource readiness.",
      ).optional(),
      status: z.string().describe(
        "Status of the condition, one of True, False, Unknown.",
      ).optional(),
      type: z.string().describe(
        'type is used to communicate the status of the reconciliation process. Types common to all resources include: * "Ready" or "Completed": True when the Resource is ready.',
      ).optional(),
    })).describe(
      'Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Job-specific conditions include: * `Ready`: `True` when the job is ready to be executed.',
    ).optional(),
    executionCount: z.number().int().describe(
      "Number of executions created for this job.",
    ).optional(),
    latestCreatedExecution: z.object({
      completionStatus: z.enum([
        "COMPLETION_STATUS_UNSPECIFIED",
        "EXECUTION_SUCCEEDED",
        "EXECUTION_FAILED",
        "EXECUTION_RUNNING",
        "EXECUTION_PENDING",
        "EXECUTION_CANCELLED",
      ]).describe("Optional. Status for the execution completion.").optional(),
      completionTimestamp: z.string().describe(
        "Optional. Completion timestamp of the execution.",
      ).optional(),
      creationTimestamp: z.string().describe(
        "Optional. Creation timestamp of the execution.",
      ).optional(),
      deletionTimestamp: z.string().describe(
        "Optional. The read-only soft deletion timestamp of the execution.",
      ).optional(),
      name: z.string().describe("Optional. Name of the execution.").optional(),
    }).describe(
      "Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status.",
    ).optional(),
    observedGeneration: z.number().int().describe(
      "The 'generation' of the job that was last processed by the controller.",
    ).optional(),
  }).describe("JobStatus represents the current state of a Job.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Run Admin Namespaces.Jobs. Registered at `@swamp/gcp/run/namespaces-jobs`. */
export const model = {
  type: "@swamp/gcp/run/namespaces-jobs",
  version: "2026.06.25.1",
  upgrades: [
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
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Job represents the configuration of a single job, which references a containe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiVersion"] !== undefined) body["apiVersion"] = g["apiVersion"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync jobs state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List jobs resources",
      arguments: z.object({
        continue: z.string().describe(
          "Optional. Optional encoded string to continue paging.",
        ).optional(),
        fieldSelector: z.string().describe(
          "Optional. Not supported by Cloud Run.",
        ).optional(),
        includeUninitialized: z.boolean().describe(
          "Optional. Not supported by Cloud Run.",
        ).optional(),
        labelSelector: z.string().describe(
          "Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn.",
        ).optional(),
        limit: z.number().describe(
          "Optional. The maximum number of records that should be returned.",
        ).optional(),
        resourceVersion: z.string().describe(
          "Optional. Not supported by Cloud Run.",
        ).optional(),
        watch: z.boolean().describe("Optional. Not supported by Cloud Run.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["continue"] !== undefined) {
          params["continue"] = String(args["continue"]);
        }
        if (args["fieldSelector"] !== undefined) {
          params["fieldSelector"] = String(args["fieldSelector"]);
        }
        if (args["includeUninitialized"] !== undefined) {
          params["includeUninitialized"] = String(args["includeUninitialized"]);
        }
        if (args["labelSelector"] !== undefined) {
          params["labelSelector"] = String(args["labelSelector"]);
        }
        if (args["limit"] !== undefined) {
          params["limit"] = String(args["limit"]);
        }
        if (args["resourceVersion"] !== undefined) {
          params["resourceVersion"] = String(args["resourceVersion"]);
        }
        if (args["watch"] !== undefined) {
          params["watch"] = String(args["watch"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
    replace_job: {
      description: "replace job",
      arguments: z.object({
        apiVersion: z.any().optional(),
        kind: z.any().optional(),
        metadata: z.any().optional(),
        spec: z.any().optional(),
        status: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["apiVersion"] !== undefined) {
          body["apiVersion"] = args["apiVersion"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["metadata"] !== undefined) body["metadata"] = args["metadata"];
        if (args["spec"] !== undefined) body["spec"] = args["spec"];
        if (args["status"] !== undefined) body["status"] = args["status"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "run.namespaces.jobs.replaceJob",
            "path": "apis/run.googleapis.com/v1/{+name}",
            "httpMethod": "PUT",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    run: {
      description: "run",
      arguments: z.object({
        overrides: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["overrides"] !== undefined) {
          body["overrides"] = args["overrides"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "run.namespaces.jobs.run",
            "path": "apis/run.googleapis.com/v1/{+name}:run",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
