// Auto-generated extension model for @swamp/gcp/dataproc/sessiontemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataproc SessionTemplates.
 *
 * A representation of a session template.
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
  return `${parent}/sessionTemplates/${shortName}`;
}

const BASE_URL = "https://dataproc.googleapis.com/";

const GET_CONFIG = {
  "id": "dataproc.projects.locations.sessionTemplates.get",
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
  "id": "dataproc.projects.locations.sessionTemplates.create",
  "path": "v1/{+parent}/sessionTemplates",
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
  "id": "dataproc.projects.locations.sessionTemplates.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataproc.projects.locations.sessionTemplates.delete",
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
  description: z.string().describe(
    "Optional. Brief description of the template.",
  ).optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.enum([
          "AUTHENTICATION_TYPE_UNSPECIFIED",
          "SERVICE_ACCOUNT",
          "END_USER_CREDENTIALS",
        ]).describe(
          "Optional. Authentication type for the user workload running in containers.",
        ).optional(),
      }).describe(
        "Authentication configuration for a workload is used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s).",
      ).optional(),
      idleTtl: z.string().describe(
        "Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
      kmsKey: z.string().describe(
        "Optional. The Cloud KMS key to use for encryption.",
      ).optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. Tags used for network traffic control.",
      ).optional(),
      networkUri: z.string().describe(
        "Optional. Network URI to connect workload to.",
      ).optional(),
      resourceManagerTags: z.record(z.string(), z.string()).describe(
        "Optional. Associates Resource Manager tags with the workload nodes. There is a max limit of 30 tags. Keys and values can be either in numeric format, such as tagKeys/{tag_key_id} and tagValues/{tag_value_id}, or in namespaced format, such as {org_id|project_id}/{tag_key_short_name} and {tag_value_short_name}.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Service account that used to execute workload.",
      ).optional(),
      stagingBucket: z.string().describe(
        "Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
      ).optional(),
      subnetworkUri: z.string().describe(
        "Optional. Subnetwork URI to connect workload to.",
      ).optional(),
      ttl: z.string().describe(
        "Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
    }).describe("Execution configuration for a workload.").optional(),
    peripheralsConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id]",
      ).optional(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string().describe(
          "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]",
        ).optional(),
      }).describe("Spark History Server configuration for the workload.")
        .optional(),
    }).describe("Auxiliary services configuration for a workload.").optional(),
  }).describe("Environment configuration for a workload.").optional(),
  jupyterSession: z.object({
    displayName: z.string().describe(
      "Optional. Display name, shown in the Jupyter kernelspec card.",
    ).optional(),
    kernel: z.enum(["KERNEL_UNSPECIFIED", "PYTHON", "SCALA"]).describe(
      "Optional. Kernel",
    ).optional(),
  }).describe("Jupyter configuration for an interactive session.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels to associate with sessions created using this template. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty, but, if present, must contain 1 to 63 characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a session.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. The resource name of the session template.",
  ).optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(
        z.enum([
          "SCENARIO_UNSPECIFIED",
          "SCALING",
          "BROADCAST_HASH_JOIN",
          "MEMORY",
          "NONE",
          "AUTO",
        ]),
      ).describe("Optional. Scenarios for which tunings are applied.")
        .optional(),
    }).describe("Autotuning configuration of the workload.").optional(),
    cohort: z.string().describe(
      "Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs.",
    ).optional(),
    containerImage: z.string().describe(
      "Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, which are used to configure workload execution.",
    ).optional(),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string().describe(
          "Optional. The PyPi repository address. Note: This field is not available for batch workloads.",
        ).optional(),
      }).describe("Configuration for PyPi repository").optional(),
    }).describe("Configuration for dependency repositories").optional(),
    version: z.string().describe("Optional. Version of the batch runtime.")
      .optional(),
  }).describe("Runtime configuration for a workload.").optional(),
  sparkConnectSession: z.object({}).describe(
    "Spark connect configuration for an interactive session.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  creator: z.string().optional(),
  description: z.string().optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.string(),
      }),
      idleTtl: z.string(),
      kmsKey: z.string(),
      networkTags: z.array(z.string()),
      networkUri: z.string(),
      resourceManagerTags: z.record(z.string(), z.unknown()),
      serviceAccount: z.string(),
      stagingBucket: z.string(),
      subnetworkUri: z.string(),
      ttl: z.string(),
    }),
    peripheralsConfig: z.object({
      metastoreService: z.string(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string(),
      }),
    }),
  }).optional(),
  jupyterSession: z.object({
    displayName: z.string(),
    kernel: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(z.string()),
    }),
    cohort: z.string(),
    containerImage: z.string(),
    properties: z.record(z.string(), z.unknown()),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string(),
      }),
    }),
    version: z.string(),
  }).optional(),
  sparkConnectSession: z.object({}).optional(),
  updateTime: z.string().optional(),
  uuid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. Brief description of the template.",
  ).optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.enum([
          "AUTHENTICATION_TYPE_UNSPECIFIED",
          "SERVICE_ACCOUNT",
          "END_USER_CREDENTIALS",
        ]).describe(
          "Optional. Authentication type for the user workload running in containers.",
        ).optional(),
      }).describe(
        "Authentication configuration for a workload is used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s).",
      ).optional(),
      idleTtl: z.string().describe(
        "Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
      kmsKey: z.string().describe(
        "Optional. The Cloud KMS key to use for encryption.",
      ).optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. Tags used for network traffic control.",
      ).optional(),
      networkUri: z.string().describe(
        "Optional. Network URI to connect workload to.",
      ).optional(),
      resourceManagerTags: z.record(z.string(), z.string()).describe(
        "Optional. Associates Resource Manager tags with the workload nodes. There is a max limit of 30 tags. Keys and values can be either in numeric format, such as tagKeys/{tag_key_id} and tagValues/{tag_value_id}, or in namespaced format, such as {org_id|project_id}/{tag_key_short_name} and {tag_value_short_name}.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Service account that used to execute workload.",
      ).optional(),
      stagingBucket: z.string().describe(
        "Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
      ).optional(),
      subnetworkUri: z.string().describe(
        "Optional. Subnetwork URI to connect workload to.",
      ).optional(),
      ttl: z.string().describe(
        "Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
    }).describe("Execution configuration for a workload.").optional(),
    peripheralsConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id]",
      ).optional(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string().describe(
          "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]",
        ).optional(),
      }).describe("Spark History Server configuration for the workload.")
        .optional(),
    }).describe("Auxiliary services configuration for a workload.").optional(),
  }).describe("Environment configuration for a workload.").optional(),
  jupyterSession: z.object({
    displayName: z.string().describe(
      "Optional. Display name, shown in the Jupyter kernelspec card.",
    ).optional(),
    kernel: z.enum(["KERNEL_UNSPECIFIED", "PYTHON", "SCALA"]).describe(
      "Optional. Kernel",
    ).optional(),
  }).describe("Jupyter configuration for an interactive session.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels to associate with sessions created using this template. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty, but, if present, must contain 1 to 63 characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a session.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. The resource name of the session template.",
  ).optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(
        z.enum([
          "SCENARIO_UNSPECIFIED",
          "SCALING",
          "BROADCAST_HASH_JOIN",
          "MEMORY",
          "NONE",
          "AUTO",
        ]),
      ).describe("Optional. Scenarios for which tunings are applied.")
        .optional(),
    }).describe("Autotuning configuration of the workload.").optional(),
    cohort: z.string().describe(
      "Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs.",
    ).optional(),
    containerImage: z.string().describe(
      "Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, which are used to configure workload execution.",
    ).optional(),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string().describe(
          "Optional. The PyPi repository address. Note: This field is not available for batch workloads.",
        ).optional(),
      }).describe("Configuration for PyPi repository").optional(),
    }).describe("Configuration for dependency repositories").optional(),
    version: z.string().describe("Optional. Version of the batch runtime.")
      .optional(),
  }).describe("Runtime configuration for a workload.").optional(),
  sparkConnectSession: z.object({}).describe(
    "Spark connect configuration for an interactive session.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataproc SessionTemplates. Registered at `@swamp/gcp/dataproc/sessiontemplates`. */
export const model = {
  type: "@swamp/gcp/dataproc/sessiontemplates",
  version: "2026.05.20.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A representation of a session template.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sessionTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["environmentConfig"] !== undefined) {
          body["environmentConfig"] = g["environmentConfig"];
        }
        if (g["jupyterSession"] !== undefined) {
          body["jupyterSession"] = g["jupyterSession"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["runtimeConfig"] !== undefined) {
          body["runtimeConfig"] = g["runtimeConfig"];
        }
        if (g["sparkConnectSession"] !== undefined) {
          body["sparkConnectSession"] = g["sparkConnectSession"];
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
      description: "Get a sessionTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessionTemplates"),
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
      description: "Update sessionTemplates attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["environmentConfig"] !== undefined) {
          body["environmentConfig"] = g["environmentConfig"];
        }
        if (g["jupyterSession"] !== undefined) {
          body["jupyterSession"] = g["jupyterSession"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["runtimeConfig"] !== undefined) {
          body["runtimeConfig"] = g["runtimeConfig"];
        }
        if (g["sparkConnectSession"] !== undefined) {
          body["sparkConnectSession"] = g["sparkConnectSession"];
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
      description: "Delete the sessionTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessionTemplates"),
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
      description: "Sync sessionTemplates state from GCP",
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
