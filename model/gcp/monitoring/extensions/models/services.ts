// Auto-generated extension model for @swamp/gcp/monitoring/services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring Services.
 *
 * A Service is a discrete, autonomous, and network-accessible unit, designed to solve an individual concern (Wikipedia (https://en.wikipedia.org/wiki/Service-orientation)). In Cloud Monitoring, a Service acts as the root resource under which operational aspects of the service are accessible.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/services/${shortName}`;
}

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.services.get",
  "path": "v3/{+name}",
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
  "id": "monitoring.services.create",
  "path": "v3/{+parent}/services",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "serviceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "monitoring.services.patch",
  "path": "v3/{+name}",
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
  "id": "monitoring.services.delete",
  "path": "v3/{+name}",
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
  "id": "monitoring.services.list",
  "path": "v3/{+parent}/services",
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
  appEngine: z.object({
    moduleId: z.string().describe(
      "The ID of the App Engine module underlying this service. Corresponds to the module_id resource label in the gae_app monitored resource (https://cloud.google.com/monitoring/api/resources#tag_gae_app).",
    ).optional(),
  }).describe(
    "App Engine service. Learn more at https://cloud.google.com/appengine.",
  ).optional(),
  basicService: z.object({
    serviceLabels: z.record(z.string(), z.string()).describe(
      "Labels that specify the resource that emits the monitoring data which is used for SLO reporting of this Service. Documentation and valid values for given service types here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).",
    ).optional(),
    serviceType: z.string().describe(
      "The type of service that this basic service defines, e.g. APP_ENGINE service type. Documentation and valid values here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).",
    ).optional(),
  }).describe(
    "A well-known service type, defined by its service type and service labels. Documentation and examples here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).",
  ).optional(),
  cloudEndpoints: z.object({
    service: z.string().describe(
      "The name of the Cloud Endpoints service underlying this service. Corresponds to the service resource label in the api monitored resource (https://cloud.google.com/monitoring/api/resources#tag_api).",
    ).optional(),
  }).describe(
    "Cloud Endpoints service. Learn more at https://cloud.google.com/endpoints.",
  ).optional(),
  cloudRun: z.object({
    location: z.string().describe(
      "The location the service is run. Corresponds to the location resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision).",
    ).optional(),
    serviceName: z.string().describe(
      "The name of the Cloud Run service. Corresponds to the service_name resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision).",
    ).optional(),
  }).describe("Cloud Run service. Learn more at https://cloud.google.com/run.")
    .optional(),
  clusterIstio: z.object({
    clusterName: z.string().describe(
      "The name of the Kubernetes cluster in which this Istio service is defined. Corresponds to the cluster_name resource label in k8s_cluster resources.",
    ).optional(),
    location: z.string().describe(
      "The location of the Kubernetes cluster in which this Istio service is defined. Corresponds to the location resource label in k8s_cluster resources.",
    ).optional(),
    serviceName: z.string().describe(
      "The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics.",
    ).optional(),
    serviceNamespace: z.string().describe(
      "The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics.",
    ).optional(),
  }).describe(
    "Istio service scoped to a single Kubernetes cluster. Learn more at https://istio.io. Clusters running OSS Istio will have their services ingested as this type.",
  ).optional(),
  custom: z.object({}).describe(
    "Use a custom service to designate a service that you want to monitor when none of the other service types (like App Engine, Cloud Run, or a GKE type) matches your intended service.",
  ).optional(),
  displayName: z.string().describe(
    "Name used for UI elements listing this Service.",
  ).optional(),
  gkeNamespace: z.object({
    clusterName: z.string().describe("The name of the parent cluster.")
      .optional(),
    location: z.string().describe(
      "The location of the parent cluster. This may be a zone or region.",
    ).optional(),
    namespaceName: z.string().describe("The name of this namespace.")
      .optional(),
    projectId: z.string().describe(
      "Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself.",
    ).optional(),
  }).describe(
    "GKE Namespace. The field names correspond to the resource metadata labels on monitored resources that fall under a namespace (for example, k8s_container or k8s_pod).",
  ).optional(),
  gkeService: z.object({
    clusterName: z.string().describe("The name of the parent cluster.")
      .optional(),
    location: z.string().describe(
      "The location of the parent cluster. This may be a zone or region.",
    ).optional(),
    namespaceName: z.string().describe("The name of the parent namespace.")
      .optional(),
    projectId: z.string().describe(
      "Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself.",
    ).optional(),
    serviceName: z.string().describe("The name of this service.").optional(),
  }).describe(
    'GKE Service. The "service" here represents a Kubernetes service object (https://kubernetes.io/docs/concepts/services-networking/service). The field names correspond to the resource labels on k8s_service monitored resources (https://cloud.google.com/monitoring/api/resources#tag_k8s_service).',
  ).optional(),
  gkeWorkload: z.object({
    clusterName: z.string().describe("The name of the parent cluster.")
      .optional(),
    location: z.string().describe(
      "The location of the parent cluster. This may be a zone or region.",
    ).optional(),
    namespaceName: z.string().describe("The name of the parent namespace.")
      .optional(),
    projectId: z.string().describe(
      "Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself.",
    ).optional(),
    topLevelControllerName: z.string().describe("The name of this workload.")
      .optional(),
    topLevelControllerType: z.string().describe(
      'The type of this workload (for example, "Deployment" or "DaemonSet")',
    ).optional(),
  }).describe(
    "A GKE Workload (Deployment, StatefulSet, etc). The field names correspond to the metadata labels on monitored resources that fall under a workload (for example, k8s_container or k8s_pod).",
  ).optional(),
  istioCanonicalService: z.object({
    canonicalService: z.string().describe(
      "The name of the canonical service underlying this service. Corresponds to the destination_canonical_service_name metric label in label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).",
    ).optional(),
    canonicalServiceNamespace: z.string().describe(
      "The namespace of the canonical service underlying this service. Corresponds to the destination_canonical_service_namespace metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).",
    ).optional(),
    meshUid: z.string().describe(
      "Identifier for the Istio mesh in which this canonical service is defined. Corresponds to the mesh_uid metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).",
    ).optional(),
  }).describe(
    "Canonical service scoped to an Istio mesh. Anthos clusters running ASM >= 1.6.8 will have their services ingested as this type.",
  ).optional(),
  meshIstio: z.object({
    meshUid: z.string().describe(
      "Identifier for the mesh in which this Istio service is defined. Corresponds to the mesh_uid metric label in Istio metrics.",
    ).optional(),
    serviceName: z.string().describe(
      "The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics.",
    ).optional(),
    serviceNamespace: z.string().describe(
      "The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics.",
    ).optional(),
  }).describe(
    "Istio service scoped to an Istio mesh. Anthos clusters running ASM < 1.6.8 will have their services ingested as this type.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for this Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]",
  ).optional(),
  telemetry: z.object({
    resourceName: z.string().describe(
      "The full name of the resource that defines this service. Formatted as described in https://cloud.google.com/apis/design/resource_names.",
    ).optional(),
  }).describe("Configuration for how to query telemetry on a Service.")
    .optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "Labels which have been used to annotate the service. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value.",
  ).optional(),
  serviceId: z.string().describe(
    "Optional. The Service id to use for this Service. If omitted, an id will be generated instead. Must match the pattern [a-z0-9\\-]+",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  appEngine: z.object({
    moduleId: z.string(),
  }).optional(),
  basicService: z.object({
    serviceLabels: z.record(z.string(), z.unknown()),
    serviceType: z.string(),
  }).optional(),
  cloudEndpoints: z.object({
    service: z.string(),
  }).optional(),
  cloudRun: z.object({
    location: z.string(),
    serviceName: z.string(),
  }).optional(),
  clusterIstio: z.object({
    clusterName: z.string(),
    location: z.string(),
    serviceName: z.string(),
    serviceNamespace: z.string(),
  }).optional(),
  custom: z.object({}).optional(),
  displayName: z.string().optional(),
  gkeNamespace: z.object({
    clusterName: z.string(),
    location: z.string(),
    namespaceName: z.string(),
    projectId: z.string(),
  }).optional(),
  gkeService: z.object({
    clusterName: z.string(),
    location: z.string(),
    namespaceName: z.string(),
    projectId: z.string(),
    serviceName: z.string(),
  }).optional(),
  gkeWorkload: z.object({
    clusterName: z.string(),
    location: z.string(),
    namespaceName: z.string(),
    projectId: z.string(),
    topLevelControllerName: z.string(),
    topLevelControllerType: z.string(),
  }).optional(),
  istioCanonicalService: z.object({
    canonicalService: z.string(),
    canonicalServiceNamespace: z.string(),
    meshUid: z.string(),
  }).optional(),
  meshIstio: z.object({
    meshUid: z.string(),
    serviceName: z.string(),
    serviceNamespace: z.string(),
  }).optional(),
  name: z.string(),
  telemetry: z.object({
    resourceName: z.string(),
  }).optional(),
  userLabels: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  appEngine: z.object({
    moduleId: z.string().describe(
      "The ID of the App Engine module underlying this service. Corresponds to the module_id resource label in the gae_app monitored resource (https://cloud.google.com/monitoring/api/resources#tag_gae_app).",
    ).optional(),
  }).describe(
    "App Engine service. Learn more at https://cloud.google.com/appengine.",
  ).optional(),
  basicService: z.object({
    serviceLabels: z.record(z.string(), z.string()).describe(
      "Labels that specify the resource that emits the monitoring data which is used for SLO reporting of this Service. Documentation and valid values for given service types here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).",
    ).optional(),
    serviceType: z.string().describe(
      "The type of service that this basic service defines, e.g. APP_ENGINE service type. Documentation and valid values here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).",
    ).optional(),
  }).describe(
    "A well-known service type, defined by its service type and service labels. Documentation and examples here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).",
  ).optional(),
  cloudEndpoints: z.object({
    service: z.string().describe(
      "The name of the Cloud Endpoints service underlying this service. Corresponds to the service resource label in the api monitored resource (https://cloud.google.com/monitoring/api/resources#tag_api).",
    ).optional(),
  }).describe(
    "Cloud Endpoints service. Learn more at https://cloud.google.com/endpoints.",
  ).optional(),
  cloudRun: z.object({
    location: z.string().describe(
      "The location the service is run. Corresponds to the location resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision).",
    ).optional(),
    serviceName: z.string().describe(
      "The name of the Cloud Run service. Corresponds to the service_name resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision).",
    ).optional(),
  }).describe("Cloud Run service. Learn more at https://cloud.google.com/run.")
    .optional(),
  clusterIstio: z.object({
    clusterName: z.string().describe(
      "The name of the Kubernetes cluster in which this Istio service is defined. Corresponds to the cluster_name resource label in k8s_cluster resources.",
    ).optional(),
    location: z.string().describe(
      "The location of the Kubernetes cluster in which this Istio service is defined. Corresponds to the location resource label in k8s_cluster resources.",
    ).optional(),
    serviceName: z.string().describe(
      "The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics.",
    ).optional(),
    serviceNamespace: z.string().describe(
      "The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics.",
    ).optional(),
  }).describe(
    "Istio service scoped to a single Kubernetes cluster. Learn more at https://istio.io. Clusters running OSS Istio will have their services ingested as this type.",
  ).optional(),
  custom: z.object({}).describe(
    "Use a custom service to designate a service that you want to monitor when none of the other service types (like App Engine, Cloud Run, or a GKE type) matches your intended service.",
  ).optional(),
  displayName: z.string().describe(
    "Name used for UI elements listing this Service.",
  ).optional(),
  gkeNamespace: z.object({
    clusterName: z.string().describe("The name of the parent cluster.")
      .optional(),
    location: z.string().describe(
      "The location of the parent cluster. This may be a zone or region.",
    ).optional(),
    namespaceName: z.string().describe("The name of this namespace.")
      .optional(),
    projectId: z.string().describe(
      "Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself.",
    ).optional(),
  }).describe(
    "GKE Namespace. The field names correspond to the resource metadata labels on monitored resources that fall under a namespace (for example, k8s_container or k8s_pod).",
  ).optional(),
  gkeService: z.object({
    clusterName: z.string().describe("The name of the parent cluster.")
      .optional(),
    location: z.string().describe(
      "The location of the parent cluster. This may be a zone or region.",
    ).optional(),
    namespaceName: z.string().describe("The name of the parent namespace.")
      .optional(),
    projectId: z.string().describe(
      "Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself.",
    ).optional(),
    serviceName: z.string().describe("The name of this service.").optional(),
  }).describe(
    'GKE Service. The "service" here represents a Kubernetes service object (https://kubernetes.io/docs/concepts/services-networking/service). The field names correspond to the resource labels on k8s_service monitored resources (https://cloud.google.com/monitoring/api/resources#tag_k8s_service).',
  ).optional(),
  gkeWorkload: z.object({
    clusterName: z.string().describe("The name of the parent cluster.")
      .optional(),
    location: z.string().describe(
      "The location of the parent cluster. This may be a zone or region.",
    ).optional(),
    namespaceName: z.string().describe("The name of the parent namespace.")
      .optional(),
    projectId: z.string().describe(
      "Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself.",
    ).optional(),
    topLevelControllerName: z.string().describe("The name of this workload.")
      .optional(),
    topLevelControllerType: z.string().describe(
      'The type of this workload (for example, "Deployment" or "DaemonSet")',
    ).optional(),
  }).describe(
    "A GKE Workload (Deployment, StatefulSet, etc). The field names correspond to the metadata labels on monitored resources that fall under a workload (for example, k8s_container or k8s_pod).",
  ).optional(),
  istioCanonicalService: z.object({
    canonicalService: z.string().describe(
      "The name of the canonical service underlying this service. Corresponds to the destination_canonical_service_name metric label in label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).",
    ).optional(),
    canonicalServiceNamespace: z.string().describe(
      "The namespace of the canonical service underlying this service. Corresponds to the destination_canonical_service_namespace metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).",
    ).optional(),
    meshUid: z.string().describe(
      "Identifier for the Istio mesh in which this canonical service is defined. Corresponds to the mesh_uid metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).",
    ).optional(),
  }).describe(
    "Canonical service scoped to an Istio mesh. Anthos clusters running ASM >= 1.6.8 will have their services ingested as this type.",
  ).optional(),
  meshIstio: z.object({
    meshUid: z.string().describe(
      "Identifier for the mesh in which this Istio service is defined. Corresponds to the mesh_uid metric label in Istio metrics.",
    ).optional(),
    serviceName: z.string().describe(
      "The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics.",
    ).optional(),
    serviceNamespace: z.string().describe(
      "The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics.",
    ).optional(),
  }).describe(
    "Istio service scoped to an Istio mesh. Anthos clusters running ASM < 1.6.8 will have their services ingested as this type.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for this Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]",
  ).optional(),
  telemetry: z.object({
    resourceName: z.string().describe(
      "The full name of the resource that defines this service. Formatted as described in https://cloud.google.com/apis/design/resource_names.",
    ).optional(),
  }).describe("Configuration for how to query telemetry on a Service.")
    .optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "Labels which have been used to annotate the service. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value.",
  ).optional(),
  serviceId: z.string().describe(
    "Optional. The Service id to use for this Service. If omitted, an id will be generated instead. Must match the pattern [a-z0-9\\-]+",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Monitoring Services. Registered at `@swamp/gcp/monitoring/services`. */
export const model = {
  type: "@swamp/gcp/monitoring/services",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Service is a discrete, autonomous, and network-accessible unit, designed to...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a services",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["appEngine"] !== undefined) body["appEngine"] = g["appEngine"];
        if (g["basicService"] !== undefined) {
          body["basicService"] = g["basicService"];
        }
        if (g["cloudEndpoints"] !== undefined) {
          body["cloudEndpoints"] = g["cloudEndpoints"];
        }
        if (g["cloudRun"] !== undefined) body["cloudRun"] = g["cloudRun"];
        if (g["clusterIstio"] !== undefined) {
          body["clusterIstio"] = g["clusterIstio"];
        }
        if (g["custom"] !== undefined) body["custom"] = g["custom"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gkeNamespace"] !== undefined) {
          body["gkeNamespace"] = g["gkeNamespace"];
        }
        if (g["gkeService"] !== undefined) body["gkeService"] = g["gkeService"];
        if (g["gkeWorkload"] !== undefined) {
          body["gkeWorkload"] = g["gkeWorkload"];
        }
        if (g["istioCanonicalService"] !== undefined) {
          body["istioCanonicalService"] = g["istioCanonicalService"];
        }
        if (g["meshIstio"] !== undefined) body["meshIstio"] = g["meshIstio"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["telemetry"] !== undefined) body["telemetry"] = g["telemetry"];
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
        if (g["serviceId"] !== undefined) body["serviceId"] = g["serviceId"];
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
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update services attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["appEngine"] !== undefined) body["appEngine"] = g["appEngine"];
        if (g["basicService"] !== undefined) {
          body["basicService"] = g["basicService"];
        }
        if (g["cloudEndpoints"] !== undefined) {
          body["cloudEndpoints"] = g["cloudEndpoints"];
        }
        if (g["cloudRun"] !== undefined) body["cloudRun"] = g["cloudRun"];
        if (g["clusterIstio"] !== undefined) {
          body["clusterIstio"] = g["clusterIstio"];
        }
        if (g["custom"] !== undefined) body["custom"] = g["custom"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gkeNamespace"] !== undefined) {
          body["gkeNamespace"] = g["gkeNamespace"];
        }
        if (g["gkeService"] !== undefined) body["gkeService"] = g["gkeService"];
        if (g["gkeWorkload"] !== undefined) {
          body["gkeWorkload"] = g["gkeWorkload"];
        }
        if (g["istioCanonicalService"] !== undefined) {
          body["istioCanonicalService"] = g["istioCanonicalService"];
        }
        if (g["meshIstio"] !== undefined) body["meshIstio"] = g["meshIstio"];
        if (g["telemetry"] !== undefined) body["telemetry"] = g["telemetry"];
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
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
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync services state from GCP",
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
            String(g["parent"] ?? ""),
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
    list: {
      description: "List services resources",
      arguments: z.object({
        filter: z.string().describe(
          'A filter specifying what Services to return. The filter supports filtering on a particular service-identifier type or one of its attributes.To filter on a particular service-identifier type, the identifier_case refers to which option in the identifier field is populated. For example, the filter identifier_case = "CUSTOM" would match all services with a value for the custom field. Valid options include "CUSTOM", "APP_ENGINE", "MESH_ISTIO", and the other options listed at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#ServiceTo filter on an attribute of a service-identifier type, apply the filter name by using the snake case of the service-identifier type and the attribute of that service-identifier type, and join the two with a period. For example, to filter by the meshUid field of the MeshIstio service-identifier type, you must filter on mesh_istio.mesh_uid = "123" to match all services with mesh UID "123". Service-identifier types and their attributes are described at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#Service',
        ).optional(),
        pageSize: z.number().describe(
          "A non-negative number that is the maximum number of results to return. When 0, use default page size.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "services",
          (args.maxPages as number | undefined) ?? 10,
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
  },
};
