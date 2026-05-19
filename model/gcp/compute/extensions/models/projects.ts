// Auto-generated extension model for @swamp/gcp/compute/projects
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Projects.
 *
 * Represents a Project resource. A project is used to organize resources in a Google Cloud Platform environment. For more information, read about the Resource Hierarchy.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.projects.get",
  "path": "projects/{project}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  cloudArmorTier: z.string().optional(),
  commonInstanceMetadata: z.object({
    fingerprint: z.string(),
    items: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
    kind: z.string(),
  }).optional(),
  creationTimestamp: z.string().optional(),
  defaultNetworkTier: z.string().optional(),
  defaultServiceAccount: z.string().optional(),
  description: z.string().optional(),
  enabledFeatures: z.array(z.string()).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  quotas: z.array(z.object({
    limit: z.number(),
    metric: z.string(),
    owner: z.string(),
    usage: z.number(),
  })).optional(),
  selfLink: z.string().optional(),
  usageExportLocation: z.object({
    bucketName: z.string(),
    reportNamePrefix: z.string(),
  }).optional(),
  vmDnsSetting: z.string().optional(),
  xpnProjectStatus: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Projects. Registered at `@swamp/gcp/compute/projects`. */
export const model = {
  type: "@swamp/gcp/compute/projects",
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
      toVersion: "2026.04.23.1",
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
        "Represents a Project resource. A project is used to organize resources in a G...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a projects",
      arguments: z.object({
        identifier: z.string().describe("The name of the projects"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
    sync: {
      description: "Sync projects state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        try {
          const params: Record<string, string> = { project: projectId };
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
    disable_xpn_host: {
      description: "disable xpn host",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.disableXpnHost",
            "path": "projects/{project}/disableXpnHost",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    disable_xpn_resource: {
      description: "disable xpn resource",
      arguments: z.object({
        xpnResource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["xpnResource"] !== undefined) {
          body["xpnResource"] = args["xpnResource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.disableXpnResource",
            "path": "projects/{project}/disableXpnResource",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    enable_xpn_host: {
      description: "enable xpn host",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.enableXpnHost",
            "path": "projects/{project}/enableXpnHost",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    enable_xpn_resource: {
      description: "enable xpn resource",
      arguments: z.object({
        xpnResource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["xpnResource"] !== undefined) {
          body["xpnResource"] = args["xpnResource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.enableXpnResource",
            "path": "projects/{project}/enableXpnResource",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_xpn_host: {
      description: "get xpn host",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.getXpnHost",
            "path": "projects/{project}/getXpnHost",
            "httpMethod": "GET",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_xpn_resources: {
      description: "get xpn resources",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.getXpnResources",
            "path": "projects/{project}/getXpnResources",
            "httpMethod": "GET",
            "parameterOrder": ["project"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_xpn_hosts: {
      description: "list xpn hosts",
      arguments: z.object({
        organization: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["organization"] !== undefined) {
          body["organization"] = args["organization"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.listXpnHosts",
            "path": "projects/{project}/listXpnHosts",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    move_disk: {
      description: "move disk",
      arguments: z.object({
        destinationZone: z.any().optional(),
        targetDisk: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["destinationZone"] !== undefined) {
          body["destinationZone"] = args["destinationZone"];
        }
        if (args["targetDisk"] !== undefined) {
          body["targetDisk"] = args["targetDisk"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.moveDisk",
            "path": "projects/{project}/moveDisk",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    move_instance: {
      description: "move instance",
      arguments: z.object({
        destinationZone: z.any().optional(),
        targetInstance: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["destinationZone"] !== undefined) {
          body["destinationZone"] = args["destinationZone"];
        }
        if (args["targetInstance"] !== undefined) {
          body["targetInstance"] = args["targetInstance"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.moveInstance",
            "path": "projects/{project}/moveInstance",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_cloud_armor_tier: {
      description: "set cloud armor tier",
      arguments: z.object({
        cloudArmorTier: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["cloudArmorTier"] !== undefined) {
          body["cloudArmorTier"] = args["cloudArmorTier"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.setCloudArmorTier",
            "path": "projects/{project}/setCloudArmorTier",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_common_instance_metadata: {
      description: "set common instance metadata",
      arguments: z.object({
        fingerprint: z.any().optional(),
        items: z.any().optional(),
        kind: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["items"] !== undefined) body["items"] = args["items"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.setCommonInstanceMetadata",
            "path": "projects/{project}/setCommonInstanceMetadata",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_default_network_tier: {
      description: "set default network tier",
      arguments: z.object({
        networkTier: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["networkTier"] !== undefined) {
          body["networkTier"] = args["networkTier"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.setDefaultNetworkTier",
            "path": "projects/{project}/setDefaultNetworkTier",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_usage_export_bucket: {
      description: "set usage export bucket",
      arguments: z.object({
        bucketName: z.any().optional(),
        reportNamePrefix: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["bucketName"] !== undefined) {
          body["bucketName"] = args["bucketName"];
        }
        if (args["reportNamePrefix"] !== undefined) {
          body["reportNamePrefix"] = args["reportNamePrefix"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.projects.setUsageExportBucket",
            "path": "projects/{project}/setUsageExportBucket",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
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
