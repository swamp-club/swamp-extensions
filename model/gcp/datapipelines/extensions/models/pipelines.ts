// Auto-generated extension model for @swamp/gcp/datapipelines/pipelines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data pipelines Pipelines.
 *
 * The main pipeline entity and all the necessary metadata for launching and managing linked jobs.
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
  return `${parent}/pipelines/${shortName}`;
}

const BASE_URL = "https://datapipelines.googleapis.com/";

const GET_CONFIG = {
  "id": "datapipelines.projects.locations.pipelines.get",
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
  "id": "datapipelines.projects.locations.pipelines.create",
  "path": "v1/{+parent}/pipelines",
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
  "id": "datapipelines.projects.locations.pipelines.patch",
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
  "id": "datapipelines.projects.locations.pipelines.delete",
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
  "id": "datapipelines.projects.locations.pipelines.list",
  "path": "v1/{+parent}/pipelines",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Required. The display name of the pipeline. It can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), and underscores (_).",
  ).optional(),
  name: z.string().describe(
    "The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), and periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects). * `LOCATION_ID` is the canonical ID for the pipeline's location. The list of available locations can be obtained by calling `google.cloud.location.Locations.ListLocations`. Note that the Data Pipelines service is not available in all regions. It depends on Cloud Scheduler, an App Engine application, so it's only available in [App Engine regions](https://cloud.google.com/about/locations#region). * `PIPELINE_ID` is the ID of the pipeline. Must be unique for the selected project and location.",
  ).optional(),
  pipelineSources: z.record(z.string(), z.string()).describe(
    "Immutable. The sources of the pipeline (for example, Dataplex). The keys and values are set by the corresponding sources during pipeline creation.",
  ).optional(),
  scheduleInfo: z.object({
    nextJobTime: z.string().describe(
      "Output only. When the next Scheduler job is going to run.",
    ).optional(),
    schedule: z.string().describe(
      "Unix-cron format of the schedule. This information is retrieved from the linked Cloud Scheduler.",
    ).optional(),
    timeZone: z.string().describe(
      "Timezone ID. This matches the timezone IDs used by the Cloud Scheduler API. If empty, UTC time is assumed.",
    ).optional(),
  }).describe("Details of the schedule the pipeline runs on.").optional(),
  schedulerServiceAccountEmail: z.string().describe(
    "Optional. A service account email to be used with the Cloud Scheduler job. If not specified, the default compute engine service account will be used.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "STATE_RESUMING",
    "STATE_ACTIVE",
    "STATE_STOPPING",
    "STATE_ARCHIVED",
    "STATE_PAUSED",
  ]).describe(
    "Required. The state of the pipeline. When the pipeline is created, the state is set to 'PIPELINE_STATE_ACTIVE' by default. State changes can be requested by setting the state to stopping, paused, or resuming. State cannot be changed through UpdatePipeline requests.",
  ).optional(),
  type: z.enum([
    "PIPELINE_TYPE_UNSPECIFIED",
    "PIPELINE_TYPE_BATCH",
    "PIPELINE_TYPE_STREAMING",
  ]).describe(
    "Required. The type of the pipeline. This field affects the scheduling of the pipeline and the type of metrics to show for the pipeline.",
  ).optional(),
  workload: z.object({
    dataflowFlexTemplateRequest: z.object({
      launchParameter: z.object({
        containerSpecGcsPath: z.string().describe(
          "Cloud Storage path to a file with a JSON-serialized ContainerSpec as content.",
        ).optional(),
        environment: z.object({
          additionalExperiments: z.array(z.unknown()).describe(
            "Additional experiment flags for the job.",
          ).optional(),
          additionalUserLabels: z.record(z.string(), z.unknown()).describe(
            'Additional user labels to be specified for the job. Keys and values must follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions). An object containing a list of key/value pairs. Example: `{ "name": "wrench", "mass": "1kg", "count": "3" }`.',
          ).optional(),
          enableStreamingEngine: z.boolean().describe(
            "Whether to enable Streaming Engine for the job.",
          ).optional(),
          flexrsGoal: z.enum([
            "FLEXRS_UNSPECIFIED",
            "FLEXRS_SPEED_OPTIMIZED",
            "FLEXRS_COST_OPTIMIZED",
          ]).describe(
            "Set FlexRS goal for the job. https://cloud.google.com/dataflow/docs/guides/flexrs",
          ).optional(),
          ipConfiguration: z.enum([
            "WORKER_IP_UNSPECIFIED",
            "WORKER_IP_PUBLIC",
            "WORKER_IP_PRIVATE",
          ]).describe("Configuration for VM IPs.").optional(),
          kmsKeyName: z.string().describe(
            "Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/",
          ).optional(),
          machineType: z.string().describe(
            "The machine type to use for the job. Defaults to the value from the template if not specified.",
          ).optional(),
          maxWorkers: z.number().int().describe(
            "The maximum number of Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000.",
          ).optional(),
          network: z.string().describe(
            'Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
          ).optional(),
          numWorkers: z.number().int().describe(
            "The initial number of Compute Engine instances for the job.",
          ).optional(),
          serviceAccountEmail: z.string().describe(
            "The email address of the service account to run the job as.",
          ).optional(),
          subnetwork: z.string().describe(
            'Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL.',
          ).optional(),
          tempLocation: z.string().describe(
            "The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`.",
          ).optional(),
          workerRegion: z.string().describe(
            'The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, defaults to the control plane region.',
          ).optional(),
          workerZone: z.string().describe(
            'The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.',
          ).optional(),
          zone: z.string().describe(
            "The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence.",
          ).optional(),
        }).describe(
          "The environment values to be set at runtime for a Flex Template.",
        ).optional(),
        jobName: z.string().describe(
          "Required. The job name to use for the created job. For an update job request, the job name should be the same as the existing running job.",
        ).optional(),
        launchOptions: z.record(z.string(), z.string()).describe(
          "Launch options for this Flex Template job. This is a common set of options across languages and templates. This should not be used to pass job parameters.",
        ).optional(),
        parameters: z.record(z.string(), z.string()).describe(
          'The parameters for the Flex Template. Example: `{"num_workers":"5"}`',
        ).optional(),
        transformNameMappings: z.record(z.string(), z.string()).describe(
          'Use this to pass transform name mappings for streaming update jobs. Example: `{"oldTransformName":"newTransformName",...}`',
        ).optional(),
        update: z.boolean().describe(
          "Set this to true if you are sending a request to update a running streaming job. When set, the job name should be the same as the running job.",
        ).optional(),
      }).describe("Launch Flex Template parameter.").optional(),
      location: z.string().describe(
        "Required. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. For example, `us-central1`, `us-west1`.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the Cloud Platform project that the job belongs to.",
      ).optional(),
      validateOnly: z.boolean().describe(
        "If true, the request is validated but not actually executed. Defaults to false.",
      ).optional(),
    }).describe("A request to launch a Dataflow job from a Flex Template.")
      .optional(),
    dataflowLaunchTemplateRequest: z.object({
      gcsPath: z.string().describe(
        "A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL, beginning with 'gs://'.",
      ).optional(),
      launchParameters: z.object({
        environment: z.object({
          additionalExperiments: z.array(z.unknown()).describe(
            "Additional experiment flags for the job.",
          ).optional(),
          additionalUserLabels: z.record(z.string(), z.unknown()).describe(
            'Additional user labels to be specified for the job. Keys and values should follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }.',
          ).optional(),
          bypassTempDirValidation: z.boolean().describe(
            "Whether to bypass the safety checks for the job's temporary directory. Use with caution.",
          ).optional(),
          enableStreamingEngine: z.boolean().describe(
            "Whether to enable Streaming Engine for the job.",
          ).optional(),
          ipConfiguration: z.enum([
            "WORKER_IP_UNSPECIFIED",
            "WORKER_IP_PUBLIC",
            "WORKER_IP_PRIVATE",
          ]).describe("Configuration for VM IPs.").optional(),
          kmsKeyName: z.string().describe(
            "Name for the Cloud KMS key for the job. The key format is: projects//locations//keyRings//cryptoKeys/",
          ).optional(),
          machineType: z.string().describe(
            "The machine type to use for the job. Defaults to the value from the template if not specified.",
          ).optional(),
          maxWorkers: z.number().int().describe(
            "The maximum number of Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000.",
          ).optional(),
          network: z.string().describe(
            'Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
          ).optional(),
          numWorkers: z.number().int().describe(
            "The initial number of Compute Engine instances for the job.",
          ).optional(),
          serviceAccountEmail: z.string().describe(
            "The email address of the service account to run the job as.",
          ).optional(),
          subnetwork: z.string().describe(
            'Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL.',
          ).optional(),
          tempLocation: z.string().describe(
            "The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`.",
          ).optional(),
          workerRegion: z.string().describe(
            'The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane\'s region.',
          ).optional(),
          workerZone: z.string().describe(
            'The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane\'s region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.',
          ).optional(),
          zone: z.string().describe(
            "The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence.",
          ).optional(),
        }).describe("The environment values to set at runtime.").optional(),
        jobName: z.string().describe(
          "Required. The job name to use for the created job.",
        ).optional(),
        parameters: z.record(z.string(), z.string()).describe(
          "The runtime parameters to pass to the job.",
        ).optional(),
        transformNameMapping: z.record(z.string(), z.string()).describe(
          "Map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job. Only applicable when updating a pipeline.",
        ).optional(),
        update: z.boolean().describe(
          "If set, replace the existing pipeline with the name specified by jobName with this pipeline, preserving state.",
        ).optional(),
      }).describe("Parameters to provide to the template being launched.")
        .optional(),
      location: z.string().describe(
        "The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the Cloud Platform project that the job belongs to.",
      ).optional(),
      validateOnly: z.boolean().describe(
        "If true, the request is validated but not actually executed. Defaults to false.",
      ).optional(),
    }).describe("A request to launch a template.").optional(),
  }).describe("Workload details for creating the pipeline jobs.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  jobCount: z.number().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string(),
  pipelineSources: z.record(z.string(), z.unknown()).optional(),
  scheduleInfo: z.object({
    nextJobTime: z.string(),
    schedule: z.string(),
    timeZone: z.string(),
  }).optional(),
  schedulerServiceAccountEmail: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  workload: z.object({
    dataflowFlexTemplateRequest: z.object({
      launchParameter: z.object({
        containerSpecGcsPath: z.string(),
        environment: z.object({
          additionalExperiments: z.array(z.unknown()),
          additionalUserLabels: z.record(z.string(), z.unknown()),
          enableStreamingEngine: z.boolean(),
          flexrsGoal: z.string(),
          ipConfiguration: z.string(),
          kmsKeyName: z.string(),
          machineType: z.string(),
          maxWorkers: z.number(),
          network: z.string(),
          numWorkers: z.number(),
          serviceAccountEmail: z.string(),
          subnetwork: z.string(),
          tempLocation: z.string(),
          workerRegion: z.string(),
          workerZone: z.string(),
          zone: z.string(),
        }),
        jobName: z.string(),
        launchOptions: z.record(z.string(), z.unknown()),
        parameters: z.record(z.string(), z.unknown()),
        transformNameMappings: z.record(z.string(), z.unknown()),
        update: z.boolean(),
      }),
      location: z.string(),
      projectId: z.string(),
      validateOnly: z.boolean(),
    }),
    dataflowLaunchTemplateRequest: z.object({
      gcsPath: z.string(),
      launchParameters: z.object({
        environment: z.object({
          additionalExperiments: z.array(z.unknown()),
          additionalUserLabels: z.record(z.string(), z.unknown()),
          bypassTempDirValidation: z.boolean(),
          enableStreamingEngine: z.boolean(),
          ipConfiguration: z.string(),
          kmsKeyName: z.string(),
          machineType: z.string(),
          maxWorkers: z.number(),
          network: z.string(),
          numWorkers: z.number(),
          serviceAccountEmail: z.string(),
          subnetwork: z.string(),
          tempLocation: z.string(),
          workerRegion: z.string(),
          workerZone: z.string(),
          zone: z.string(),
        }),
        jobName: z.string(),
        parameters: z.record(z.string(), z.unknown()),
        transformNameMapping: z.record(z.string(), z.unknown()),
        update: z.boolean(),
      }),
      location: z.string(),
      projectId: z.string(),
      validateOnly: z.boolean(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Required. The display name of the pipeline. It can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), and underscores (_).",
  ).optional(),
  name: z.string().describe(
    "The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), and periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects). * `LOCATION_ID` is the canonical ID for the pipeline's location. The list of available locations can be obtained by calling `google.cloud.location.Locations.ListLocations`. Note that the Data Pipelines service is not available in all regions. It depends on Cloud Scheduler, an App Engine application, so it's only available in [App Engine regions](https://cloud.google.com/about/locations#region). * `PIPELINE_ID` is the ID of the pipeline. Must be unique for the selected project and location.",
  ).optional(),
  pipelineSources: z.record(z.string(), z.string()).describe(
    "Immutable. The sources of the pipeline (for example, Dataplex). The keys and values are set by the corresponding sources during pipeline creation.",
  ).optional(),
  scheduleInfo: z.object({
    nextJobTime: z.string().describe(
      "Output only. When the next Scheduler job is going to run.",
    ).optional(),
    schedule: z.string().describe(
      "Unix-cron format of the schedule. This information is retrieved from the linked Cloud Scheduler.",
    ).optional(),
    timeZone: z.string().describe(
      "Timezone ID. This matches the timezone IDs used by the Cloud Scheduler API. If empty, UTC time is assumed.",
    ).optional(),
  }).describe("Details of the schedule the pipeline runs on.").optional(),
  schedulerServiceAccountEmail: z.string().describe(
    "Optional. A service account email to be used with the Cloud Scheduler job. If not specified, the default compute engine service account will be used.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "STATE_RESUMING",
    "STATE_ACTIVE",
    "STATE_STOPPING",
    "STATE_ARCHIVED",
    "STATE_PAUSED",
  ]).describe(
    "Required. The state of the pipeline. When the pipeline is created, the state is set to 'PIPELINE_STATE_ACTIVE' by default. State changes can be requested by setting the state to stopping, paused, or resuming. State cannot be changed through UpdatePipeline requests.",
  ).optional(),
  type: z.enum([
    "PIPELINE_TYPE_UNSPECIFIED",
    "PIPELINE_TYPE_BATCH",
    "PIPELINE_TYPE_STREAMING",
  ]).describe(
    "Required. The type of the pipeline. This field affects the scheduling of the pipeline and the type of metrics to show for the pipeline.",
  ).optional(),
  workload: z.object({
    dataflowFlexTemplateRequest: z.object({
      launchParameter: z.object({
        containerSpecGcsPath: z.string().describe(
          "Cloud Storage path to a file with a JSON-serialized ContainerSpec as content.",
        ).optional(),
        environment: z.object({
          additionalExperiments: z.array(z.unknown()).describe(
            "Additional experiment flags for the job.",
          ).optional(),
          additionalUserLabels: z.record(z.string(), z.unknown()).describe(
            'Additional user labels to be specified for the job. Keys and values must follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions). An object containing a list of key/value pairs. Example: `{ "name": "wrench", "mass": "1kg", "count": "3" }`.',
          ).optional(),
          enableStreamingEngine: z.boolean().describe(
            "Whether to enable Streaming Engine for the job.",
          ).optional(),
          flexrsGoal: z.enum([
            "FLEXRS_UNSPECIFIED",
            "FLEXRS_SPEED_OPTIMIZED",
            "FLEXRS_COST_OPTIMIZED",
          ]).describe(
            "Set FlexRS goal for the job. https://cloud.google.com/dataflow/docs/guides/flexrs",
          ).optional(),
          ipConfiguration: z.enum([
            "WORKER_IP_UNSPECIFIED",
            "WORKER_IP_PUBLIC",
            "WORKER_IP_PRIVATE",
          ]).describe("Configuration for VM IPs.").optional(),
          kmsKeyName: z.string().describe(
            "Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/",
          ).optional(),
          machineType: z.string().describe(
            "The machine type to use for the job. Defaults to the value from the template if not specified.",
          ).optional(),
          maxWorkers: z.number().int().describe(
            "The maximum number of Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000.",
          ).optional(),
          network: z.string().describe(
            'Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
          ).optional(),
          numWorkers: z.number().int().describe(
            "The initial number of Compute Engine instances for the job.",
          ).optional(),
          serviceAccountEmail: z.string().describe(
            "The email address of the service account to run the job as.",
          ).optional(),
          subnetwork: z.string().describe(
            'Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL.',
          ).optional(),
          tempLocation: z.string().describe(
            "The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`.",
          ).optional(),
          workerRegion: z.string().describe(
            'The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, defaults to the control plane region.',
          ).optional(),
          workerZone: z.string().describe(
            'The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.',
          ).optional(),
          zone: z.string().describe(
            "The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence.",
          ).optional(),
        }).describe(
          "The environment values to be set at runtime for a Flex Template.",
        ).optional(),
        jobName: z.string().describe(
          "Required. The job name to use for the created job. For an update job request, the job name should be the same as the existing running job.",
        ).optional(),
        launchOptions: z.record(z.string(), z.string()).describe(
          "Launch options for this Flex Template job. This is a common set of options across languages and templates. This should not be used to pass job parameters.",
        ).optional(),
        parameters: z.record(z.string(), z.string()).describe(
          'The parameters for the Flex Template. Example: `{"num_workers":"5"}`',
        ).optional(),
        transformNameMappings: z.record(z.string(), z.string()).describe(
          'Use this to pass transform name mappings for streaming update jobs. Example: `{"oldTransformName":"newTransformName",...}`',
        ).optional(),
        update: z.boolean().describe(
          "Set this to true if you are sending a request to update a running streaming job. When set, the job name should be the same as the running job.",
        ).optional(),
      }).describe("Launch Flex Template parameter.").optional(),
      location: z.string().describe(
        "Required. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. For example, `us-central1`, `us-west1`.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the Cloud Platform project that the job belongs to.",
      ).optional(),
      validateOnly: z.boolean().describe(
        "If true, the request is validated but not actually executed. Defaults to false.",
      ).optional(),
    }).describe("A request to launch a Dataflow job from a Flex Template.")
      .optional(),
    dataflowLaunchTemplateRequest: z.object({
      gcsPath: z.string().describe(
        "A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL, beginning with 'gs://'.",
      ).optional(),
      launchParameters: z.object({
        environment: z.object({
          additionalExperiments: z.array(z.unknown()).describe(
            "Additional experiment flags for the job.",
          ).optional(),
          additionalUserLabels: z.record(z.string(), z.unknown()).describe(
            'Additional user labels to be specified for the job. Keys and values should follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }.',
          ).optional(),
          bypassTempDirValidation: z.boolean().describe(
            "Whether to bypass the safety checks for the job's temporary directory. Use with caution.",
          ).optional(),
          enableStreamingEngine: z.boolean().describe(
            "Whether to enable Streaming Engine for the job.",
          ).optional(),
          ipConfiguration: z.enum([
            "WORKER_IP_UNSPECIFIED",
            "WORKER_IP_PUBLIC",
            "WORKER_IP_PRIVATE",
          ]).describe("Configuration for VM IPs.").optional(),
          kmsKeyName: z.string().describe(
            "Name for the Cloud KMS key for the job. The key format is: projects//locations//keyRings//cryptoKeys/",
          ).optional(),
          machineType: z.string().describe(
            "The machine type to use for the job. Defaults to the value from the template if not specified.",
          ).optional(),
          maxWorkers: z.number().int().describe(
            "The maximum number of Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000.",
          ).optional(),
          network: z.string().describe(
            'Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
          ).optional(),
          numWorkers: z.number().int().describe(
            "The initial number of Compute Engine instances for the job.",
          ).optional(),
          serviceAccountEmail: z.string().describe(
            "The email address of the service account to run the job as.",
          ).optional(),
          subnetwork: z.string().describe(
            'Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL.',
          ).optional(),
          tempLocation: z.string().describe(
            "The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`.",
          ).optional(),
          workerRegion: z.string().describe(
            'The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane\'s region.',
          ).optional(),
          workerZone: z.string().describe(
            'The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane\'s region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.',
          ).optional(),
          zone: z.string().describe(
            "The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence.",
          ).optional(),
        }).describe("The environment values to set at runtime.").optional(),
        jobName: z.string().describe(
          "Required. The job name to use for the created job.",
        ).optional(),
        parameters: z.record(z.string(), z.string()).describe(
          "The runtime parameters to pass to the job.",
        ).optional(),
        transformNameMapping: z.record(z.string(), z.string()).describe(
          "Map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job. Only applicable when updating a pipeline.",
        ).optional(),
        update: z.boolean().describe(
          "If set, replace the existing pipeline with the name specified by jobName with this pipeline, preserving state.",
        ).optional(),
      }).describe("Parameters to provide to the template being launched.")
        .optional(),
      location: z.string().describe(
        "The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the Cloud Platform project that the job belongs to.",
      ).optional(),
      validateOnly: z.boolean().describe(
        "If true, the request is validated but not actually executed. Defaults to false.",
      ).optional(),
    }).describe("A request to launch a template.").optional(),
  }).describe("Workload details for creating the pipeline jobs.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data pipelines Pipelines. Registered at `@swamp/gcp/datapipelines/pipelines`. */
export const model = {
  type: "@swamp/gcp/datapipelines/pipelines",
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
        "The main pipeline entity and all the necessary metadata for launching and man...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pipelines",
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
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pipelineSources"] !== undefined) {
          body["pipelineSources"] = g["pipelineSources"];
        }
        if (g["scheduleInfo"] !== undefined) {
          body["scheduleInfo"] = g["scheduleInfo"];
        }
        if (g["schedulerServiceAccountEmail"] !== undefined) {
          body["schedulerServiceAccountEmail"] =
            g["schedulerServiceAccountEmail"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["workload"] !== undefined) body["workload"] = g["workload"];
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
      description: "Get a pipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the pipelines"),
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
      description: "Update pipelines attributes",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["scheduleInfo"] !== undefined) {
          body["scheduleInfo"] = g["scheduleInfo"];
        }
        if (g["schedulerServiceAccountEmail"] !== undefined) {
          body["schedulerServiceAccountEmail"] =
            g["schedulerServiceAccountEmail"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["workload"] !== undefined) body["workload"] = g["workload"];
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
      description: "Delete the pipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the pipelines"),
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
      description: "Sync pipelines state from GCP",
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
    run: {
      description: "run",
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
            "id": "datapipelines.projects.locations.pipelines.run",
            "path": "v1/{+name}:run",
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
    stop: {
      description: "stop",
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
            "id": "datapipelines.projects.locations.pipelines.stop",
            "path": "v1/{+name}:stop",
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
