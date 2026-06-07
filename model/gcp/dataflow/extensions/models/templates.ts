// Auto-generated extension model for @swamp/gcp/dataflow/templates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataflow Templates.
 *
 * The response to a GetTemplate request.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dataflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dataflow.projects.locations.templates.get",
  "path": "v1b3/projects/{projectId}/locations/{location}/templates:get",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "location",
  ],
  "parameters": {
    "gcsPath": {
      "location": "query",
    },
    "location": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataflow.projects.locations.templates.create",
  "path": "v1b3/projects/{projectId}/locations/{location}/templates",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "location",
  ],
  "parameters": {
    "location": {
      "location": "path",
      "required": true,
    },
    "projectId": {
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
  environment: z.object({
    additionalExperiments: z.array(z.string()).describe(
      "Optional. Additional experiment flags for the job, specified with the `--experiments` option.",
    ).optional(),
    additionalPipelineOptions: z.array(z.string()).describe(
      "Optional. Additional pipeline option flags for the job.",
    ).optional(),
    additionalUserLabels: z.record(z.string(), z.string()).describe(
      'Optional. Additional user labels to be specified for the job. Keys and values should follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }.',
    ).optional(),
    bypassTempDirValidation: z.boolean().describe(
      "Optional. Whether to bypass the safety checks for the job's temporary directory. Use with caution.",
    ).optional(),
    diskSizeGb: z.number().int().describe(
      "Optional. The disk size, in gigabytes, to use on each remote Compute Engine worker instance.",
    ).optional(),
    enableStreamingEngine: z.boolean().describe(
      "Optional. Whether to enable Streaming Engine for the job.",
    ).optional(),
    ipConfiguration: z.enum([
      "WORKER_IP_UNSPECIFIED",
      "WORKER_IP_PUBLIC",
      "WORKER_IP_PRIVATE",
    ]).describe("Optional. Configuration for VM IPs.").optional(),
    kmsKeyName: z.string().describe(
      "Optional. Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/",
    ).optional(),
    machineType: z.string().describe(
      "Optional. The machine type to use for the job. Defaults to the value from the template if not specified.",
    ).optional(),
    maxWorkers: z.number().int().describe(
      "Optional. The maximum number of Google Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000. The default value is 1.",
    ).optional(),
    network: z.string().describe(
      'Optional. Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
    ).optional(),
    numWorkers: z.number().int().describe(
      "Optional. The initial number of Google Compute Engine instances for the job. The default value is 11.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The email address of the service account to run the job as.",
    ).optional(),
    streamingMode: z.enum([
      "STREAMING_MODE_UNSPECIFIED",
      "STREAMING_MODE_EXACTLY_ONCE",
      "STREAMING_MODE_AT_LEAST_ONCE",
    ]).describe(
      "Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes).",
    ).optional(),
    subnetwork: z.string().describe(
      'Optional. Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL.',
    ).optional(),
    tempLocation: z.string().describe(
      "Required. The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`.",
    ).optional(),
    workerRegion: z.string().describe(
      'Required. The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane\'s region.',
    ).optional(),
    workerZone: z.string().describe(
      'Optional. The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane\'s region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.',
    ).optional(),
    zone: z.string().describe(
      "Optional. The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence.",
    ).optional(),
  }).describe("The environment values to set at runtime.").optional(),
  gcsPath: z.string().describe(
    "Required. A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL, beginning with `gs://`.",
  ).optional(),
  jobName: z.string().describe(
    "Required. The job name to use for the created job.",
  ).optional(),
  location: z.string().describe(
    "The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.",
  ).optional(),
  parameters: z.record(z.string(), z.string()).describe(
    "The runtime parameters to pass to the job.",
  ).optional(),
});

const StateSchema = z.object({
  metadata: z.object({
    defaultStreamingMode: z.string(),
    description: z.string(),
    name: z.string(),
    parameters: z.array(z.object({
      customMetadata: z.record(z.string(), z.unknown()),
      defaultValue: z.string(),
      enumOptions: z.array(z.object({
        description: z.unknown(),
        label: z.unknown(),
        value: z.unknown(),
      })),
      groupName: z.string(),
      helpText: z.string(),
      hiddenUi: z.boolean(),
      isOptional: z.boolean(),
      label: z.string(),
      name: z.string(),
      paramType: z.string(),
      parentName: z.string(),
      parentTriggerValues: z.array(z.string()),
      regexes: z.array(z.string()),
    })),
    streaming: z.boolean(),
    supportsAtLeastOnce: z.boolean(),
    supportsExactlyOnce: z.boolean(),
    yamlDefinition: z.string(),
  }).optional(),
  runtimeMetadata: z.object({
    parameters: z.array(z.object({
      customMetadata: z.record(z.string(), z.unknown()),
      defaultValue: z.string(),
      enumOptions: z.array(z.object({
        description: z.unknown(),
        label: z.unknown(),
        value: z.unknown(),
      })),
      groupName: z.string(),
      helpText: z.string(),
      hiddenUi: z.boolean(),
      isOptional: z.boolean(),
      label: z.string(),
      name: z.string(),
      paramType: z.string(),
      parentName: z.string(),
      parentTriggerValues: z.array(z.string()),
      regexes: z.array(z.string()),
    })),
    sdkInfo: z.object({
      language: z.string(),
      version: z.string(),
    }),
  }).optional(),
  status: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  templateType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  environment: z.object({
    additionalExperiments: z.array(z.string()).describe(
      "Optional. Additional experiment flags for the job, specified with the `--experiments` option.",
    ).optional(),
    additionalPipelineOptions: z.array(z.string()).describe(
      "Optional. Additional pipeline option flags for the job.",
    ).optional(),
    additionalUserLabels: z.record(z.string(), z.string()).describe(
      'Optional. Additional user labels to be specified for the job. Keys and values should follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }.',
    ).optional(),
    bypassTempDirValidation: z.boolean().describe(
      "Optional. Whether to bypass the safety checks for the job's temporary directory. Use with caution.",
    ).optional(),
    diskSizeGb: z.number().int().describe(
      "Optional. The disk size, in gigabytes, to use on each remote Compute Engine worker instance.",
    ).optional(),
    enableStreamingEngine: z.boolean().describe(
      "Optional. Whether to enable Streaming Engine for the job.",
    ).optional(),
    ipConfiguration: z.enum([
      "WORKER_IP_UNSPECIFIED",
      "WORKER_IP_PUBLIC",
      "WORKER_IP_PRIVATE",
    ]).describe("Optional. Configuration for VM IPs.").optional(),
    kmsKeyName: z.string().describe(
      "Optional. Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/",
    ).optional(),
    machineType: z.string().describe(
      "Optional. The machine type to use for the job. Defaults to the value from the template if not specified.",
    ).optional(),
    maxWorkers: z.number().int().describe(
      "Optional. The maximum number of Google Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000. The default value is 1.",
    ).optional(),
    network: z.string().describe(
      'Optional. Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
    ).optional(),
    numWorkers: z.number().int().describe(
      "Optional. The initial number of Google Compute Engine instances for the job. The default value is 11.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The email address of the service account to run the job as.",
    ).optional(),
    streamingMode: z.enum([
      "STREAMING_MODE_UNSPECIFIED",
      "STREAMING_MODE_EXACTLY_ONCE",
      "STREAMING_MODE_AT_LEAST_ONCE",
    ]).describe(
      "Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes).",
    ).optional(),
    subnetwork: z.string().describe(
      'Optional. Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL.',
    ).optional(),
    tempLocation: z.string().describe(
      "Required. The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`.",
    ).optional(),
    workerRegion: z.string().describe(
      'Required. The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane\'s region.',
    ).optional(),
    workerZone: z.string().describe(
      'Optional. The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane\'s region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.',
    ).optional(),
    zone: z.string().describe(
      "Optional. The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence.",
    ).optional(),
  }).describe("The environment values to set at runtime.").optional(),
  gcsPath: z.string().describe(
    "Required. A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL, beginning with `gs://`.",
  ).optional(),
  jobName: z.string().describe(
    "Required. The job name to use for the created job.",
  ).optional(),
  location: z.string().describe(
    "The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.",
  ).optional(),
  parameters: z.record(z.string(), z.string()).describe(
    "The runtime parameters to pass to the job.",
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

/** Swamp extension model for Google Cloud Dataflow Templates. Registered at `@swamp/gcp/dataflow/templates`. */
export const model = {
  type: "@swamp/gcp/dataflow/templates",
  version: "2026.06.07.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The response to a GetTemplate request.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a templates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const body: Record<string, unknown> = {};
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["gcsPath"] !== undefined) body["gcsPath"] = g["gcsPath"];
        if (g["jobName"] !== undefined) body["jobName"] = g["jobName"];
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["location"] = args.identifier;
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
    sync: {
      description: "Sync templates state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["location"] = identifier;
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
    launch: {
      description: "launch",
      arguments: z.object({
        environment: z.any().optional(),
        jobName: z.any().optional(),
        parameters: z.any().optional(),
        transformNameMapping: z.any().optional(),
        update: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const body: Record<string, unknown> = {};
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        if (args["jobName"] !== undefined) body["jobName"] = args["jobName"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["transformNameMapping"] !== undefined) {
          body["transformNameMapping"] = args["transformNameMapping"];
        }
        if (args["update"] !== undefined) body["update"] = args["update"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataflow.projects.locations.templates.launch",
            "path":
              "v1b3/projects/{projectId}/locations/{location}/templates:launch",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "location"],
            "parameters": {
              "dynamicTemplate.gcsPath": { "location": "query" },
              "dynamicTemplate.stagingLocation": { "location": "query" },
              "gcsPath": { "location": "query" },
              "location": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
              "validateOnly": { "location": "query" },
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
