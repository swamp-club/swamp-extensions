// Auto-generated extension model for @swamp/gcp/workstations/workstationclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workstations WorkstationClusters.
 *
 * A workstation cluster resource in the Cloud Workstations API. Defines a group of workstations in a particular region and the VPC network they're attached to.
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
  return `${parent}/workstationClusters/${shortName}`;
}

const BASE_URL = "https://workstations.googleapis.com/";

const GET_CONFIG = {
  "id": "workstations.projects.locations.workstationClusters.get",
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
  "id": "workstations.projects.locations.workstationClusters.create",
  "path": "v1/{+parent}/workstationClusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
    "workstationClusterId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "workstations.projects.locations.workstationClusters.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "workstations.projects.locations.workstationClusters.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "workstations.projects.locations.workstationClusters.list",
  "path": "v1/{+parent}/workstationClusters",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Client-specified annotations.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for this workstation cluster.",
  ).optional(),
  domainConfig: z.object({
    domain: z.string().describe(
      "Immutable. Domain used by Workstations for HTTP ingress.",
    ).optional(),
  }).describe("Configuration options for a custom domain.").optional(),
  gatewayConfig: z.object({
    http2Enabled: z.boolean().describe(
      "Optional. Whether HTTP/2 is enabled for this workstation cluster. Defaults to false.",
    ).optional(),
  }).describe("Configuration options for Cluster HTTP Gateway.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation cluster and that are also propagated to the underlying Compute Engine resources.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Full name of this workstation cluster.",
  ).optional(),
  network: z.string().describe(
    "Immutable. Name of the Compute Engine network in which instances associated with this workstation cluster will be created.",
  ).optional(),
  privateClusterConfig: z.object({
    allowedProjects: z.array(z.string()).describe(
      "Optional. Additional projects that are allowed to attach to the workstation cluster's service attachment. By default, the workstation cluster's project and the VPC host project (if different) are allowed.",
    ).optional(),
    clusterHostname: z.string().describe(
      "Output only. Hostname for the workstation cluster. This field will be populated only when private endpoint is enabled. To access workstations in the workstation cluster, create a new DNS zone mapping this domain name to an internal IP address and a forwarding rule mapping that address to the service attachment.",
    ).optional(),
    enablePrivateEndpoint: z.boolean().describe(
      "Immutable. Whether Workstations endpoint is private.",
    ).optional(),
    serviceAttachmentUri: z.string().describe(
      "Output only. Service attachment URI for the workstation cluster. The service attachment is created when private endpoint is enabled. To access workstations in the workstation cluster, configure access to the managed service using [Private Service Connect](https://cloud.google.com/vpc/docs/configure-private-service-connect-services).",
    ).optional(),
  }).describe("Configuration options for private workstation clusters.")
    .optional(),
  subnetwork: z.string().describe(
    "Immutable. Name of the Compute Engine subnetwork in which instances associated with this workstation cluster will be created. Must be part of the subnetwork specified for this workstation cluster.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  workstationAuthorizationUrl: z.string().describe(
    "Optional. Specifies the redirect URL for unauthorized requests received by workstation VMs in this cluster. Redirects to this endpoint will send a base64 encoded `state` query param containing the target workstation name and original request hostname. The endpoint is responsible for retrieving a token using `GenerateAccessToken` and redirecting back to the original hostname with the token.",
  ).optional(),
  workstationLaunchUrl: z.string().describe(
    "Optional. Specifies the launch URL for workstations in this cluster. Requests sent to unstarted workstations will be redirected to this URL. Requests redirected to the launch endpoint will be sent with a `workstation` and `project` query parameter containing the full workstation resource name and project ID, respectively. The launch endpoint is responsible for starting the workstation, polling it until it reaches `STATE_RUNNING`, and then issuing a redirect to the workstation's host URL.",
  ).optional(),
  workstationClusterId: z.string().describe(
    "Required. ID to use for the workstation cluster.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  conditions: z.array(z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  })).optional(),
  controlPlaneIp: z.string().optional(),
  createTime: z.string().optional(),
  degraded: z.boolean().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  domainConfig: z.object({
    domain: z.string(),
  }).optional(),
  etag: z.string().optional(),
  gatewayConfig: z.object({
    http2Enabled: z.boolean(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  privateClusterConfig: z.object({
    allowedProjects: z.array(z.string()),
    clusterHostname: z.string(),
    enablePrivateEndpoint: z.boolean(),
    serviceAttachmentUri: z.string(),
  }).optional(),
  reconciling: z.boolean().optional(),
  subnetwork: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  workstationAuthorizationUrl: z.string().optional(),
  workstationLaunchUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Client-specified annotations.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for this workstation cluster.",
  ).optional(),
  domainConfig: z.object({
    domain: z.string().describe(
      "Immutable. Domain used by Workstations for HTTP ingress.",
    ).optional(),
  }).describe("Configuration options for a custom domain.").optional(),
  gatewayConfig: z.object({
    http2Enabled: z.boolean().describe(
      "Optional. Whether HTTP/2 is enabled for this workstation cluster. Defaults to false.",
    ).optional(),
  }).describe("Configuration options for Cluster HTTP Gateway.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation cluster and that are also propagated to the underlying Compute Engine resources.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Full name of this workstation cluster.",
  ).optional(),
  network: z.string().describe(
    "Immutable. Name of the Compute Engine network in which instances associated with this workstation cluster will be created.",
  ).optional(),
  privateClusterConfig: z.object({
    allowedProjects: z.array(z.string()).describe(
      "Optional. Additional projects that are allowed to attach to the workstation cluster's service attachment. By default, the workstation cluster's project and the VPC host project (if different) are allowed.",
    ).optional(),
    clusterHostname: z.string().describe(
      "Output only. Hostname for the workstation cluster. This field will be populated only when private endpoint is enabled. To access workstations in the workstation cluster, create a new DNS zone mapping this domain name to an internal IP address and a forwarding rule mapping that address to the service attachment.",
    ).optional(),
    enablePrivateEndpoint: z.boolean().describe(
      "Immutable. Whether Workstations endpoint is private.",
    ).optional(),
    serviceAttachmentUri: z.string().describe(
      "Output only. Service attachment URI for the workstation cluster. The service attachment is created when private endpoint is enabled. To access workstations in the workstation cluster, configure access to the managed service using [Private Service Connect](https://cloud.google.com/vpc/docs/configure-private-service-connect-services).",
    ).optional(),
  }).describe("Configuration options for private workstation clusters.")
    .optional(),
  subnetwork: z.string().describe(
    "Immutable. Name of the Compute Engine subnetwork in which instances associated with this workstation cluster will be created. Must be part of the subnetwork specified for this workstation cluster.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  workstationAuthorizationUrl: z.string().describe(
    "Optional. Specifies the redirect URL for unauthorized requests received by workstation VMs in this cluster. Redirects to this endpoint will send a base64 encoded `state` query param containing the target workstation name and original request hostname. The endpoint is responsible for retrieving a token using `GenerateAccessToken` and redirecting back to the original hostname with the token.",
  ).optional(),
  workstationLaunchUrl: z.string().describe(
    "Optional. Specifies the launch URL for workstations in this cluster. Requests sent to unstarted workstations will be redirected to this URL. Requests redirected to the launch endpoint will be sent with a `workstation` and `project` query parameter containing the full workstation resource name and project ID, respectively. The launch endpoint is responsible for starting the workstation, polling it until it reaches `STATE_RUNNING`, and then issuing a redirect to the workstation's host URL.",
  ).optional(),
  workstationClusterId: z.string().describe(
    "Required. ID to use for the workstation cluster.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Workstations WorkstationClusters. Registered at `@swamp/gcp/workstations/workstationclusters`. */
export const model = {
  type: "@swamp/gcp/workstations/workstationclusters",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.08.1",
      description: "Added: workstationAuthorizationUrl, workstationLaunchUrl",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.09.1",
      description: "Removed: workstationAuthorizationUrl, workstationLaunchUrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          workstationAuthorizationUrl: _workstationAuthorizationUrl,
          workstationLaunchUrl: _workstationLaunchUrl,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.11.1",
      description: "Added: workstationAuthorizationUrl, workstationLaunchUrl",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: workstationAuthorizationUrl, workstationLaunchUrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          workstationAuthorizationUrl: _workstationAuthorizationUrl,
          workstationLaunchUrl: _workstationLaunchUrl,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: workstationAuthorizationUrl, workstationLaunchUrl",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: workstationAuthorizationUrl, workstationLaunchUrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          workstationAuthorizationUrl: _workstationAuthorizationUrl,
          workstationLaunchUrl: _workstationLaunchUrl,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: workstationAuthorizationUrl, workstationLaunchUrl",
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
        "A workstation cluster resource in the Cloud Workstations API. Defines a group...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workstationClusters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["domainConfig"] !== undefined) {
          body["domainConfig"] = g["domainConfig"];
        }
        if (g["gatewayConfig"] !== undefined) {
          body["gatewayConfig"] = g["gatewayConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["privateClusterConfig"] !== undefined) {
          body["privateClusterConfig"] = g["privateClusterConfig"];
        }
        if (g["subnetwork"] !== undefined) body["subnetwork"] = g["subnetwork"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["workstationAuthorizationUrl"] !== undefined) {
          body["workstationAuthorizationUrl"] =
            g["workstationAuthorizationUrl"];
        }
        if (g["workstationLaunchUrl"] !== undefined) {
          body["workstationLaunchUrl"] = g["workstationLaunchUrl"];
        }
        if (g["workstationClusterId"] !== undefined) {
          body["workstationClusterId"] = g["workstationClusterId"];
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
      description: "Get a workstationClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the workstationClusters"),
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
      description: "Update workstationClusters attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["domainConfig"] !== undefined) {
          body["domainConfig"] = g["domainConfig"];
        }
        if (g["gatewayConfig"] !== undefined) {
          body["gatewayConfig"] = g["gatewayConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["privateClusterConfig"] !== undefined) {
          body["privateClusterConfig"] = g["privateClusterConfig"];
        }
        if (g["workstationAuthorizationUrl"] !== undefined) {
          body["workstationAuthorizationUrl"] =
            g["workstationAuthorizationUrl"];
        }
        if (g["workstationLaunchUrl"] !== undefined) {
          body["workstationLaunchUrl"] = g["workstationLaunchUrl"];
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
      description: "Delete the workstationClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the workstationClusters"),
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
      description: "Sync workstationClusters state from GCP",
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
