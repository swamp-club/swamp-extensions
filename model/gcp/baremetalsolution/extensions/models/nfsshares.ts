// Auto-generated extension model for @swamp/gcp/baremetalsolution/nfsshares
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Bare Metal Solution NfsShares.
 *
 * An NFS share.
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
  return `${parent}/nfsShares/${shortName}`;
}

const BASE_URL = "https://baremetalsolution.googleapis.com/";

const GET_CONFIG = {
  "id": "baremetalsolution.projects.locations.nfsShares.get",
  "path": "v2/{+name}",
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
  "id": "baremetalsolution.projects.locations.nfsShares.create",
  "path": "v2/{+parent}/nfsShares",
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
  "id": "baremetalsolution.projects.locations.nfsShares.patch",
  "path": "v2/{+name}",
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
  "id": "baremetalsolution.projects.locations.nfsShares.delete",
  "path": "v2/{+name}",
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
  allowedClients: z.array(z.object({
    allowDev: z.boolean().describe(
      "Allow dev flag. Which controls whether to allow creation of devices.",
    ).optional(),
    allowSuid: z.boolean().describe("Allow the setuid flag.").optional(),
    allowedClientsCidr: z.string().describe(
      "The subnet of IP addresses permitted to access the share.",
    ).optional(),
    mountPermissions: z.enum([
      "MOUNT_PERMISSIONS_UNSPECIFIED",
      "READ",
      "READ_WRITE",
    ]).describe("Mount permissions.").optional(),
    network: z.string().describe("The network the access point sits on.")
      .optional(),
    nfsPath: z.string().describe(
      'Output only. The path to access NFS, in format shareIP:/InstanceID InstanceID is the generated ID instead of customer provided name. example like "10.0.0.0:/g123456789-nfs001"',
    ).optional(),
    noRootSquash: z.boolean().describe(
      "Disable root squashing, which is a feature of NFS. Root squash is a special mapping of the remote superuser (root) identity when using identity authentication.",
    ).optional(),
    shareIp: z.string().describe(
      "Output only. The IP address of the share on this network. Assigned automatically during provisioning based on the network's services_cidr.",
    ).optional(),
  })).describe("List of allowed access points.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  name: z.string().describe("Immutable. The name of the NFS share.").optional(),
  pod: z.string().describe(
    "Immutable. Pod name. Pod is an independent part of infrastructure. NFSShare can only be connected to the assets (networks, instances) allocated in the same pod.",
  ).optional(),
  requestedSizeGib: z.string().describe("The requested size, in GiB.")
    .optional(),
  storageType: z.enum(["STORAGE_TYPE_UNSPECIFIED", "SSD", "HDD"]).describe(
    "Immutable. The storage type of the underlying volume.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowedClients: z.array(z.object({
    allowDev: z.boolean(),
    allowSuid: z.boolean(),
    allowedClientsCidr: z.string(),
    mountPermissions: z.string(),
    network: z.string(),
    nfsPath: z.string(),
    noRootSquash: z.boolean(),
    shareIp: z.string(),
  })).optional(),
  id: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  nfsShareId: z.string().optional(),
  pod: z.string().optional(),
  requestedSizeGib: z.string().optional(),
  state: z.string().optional(),
  storageType: z.string().optional(),
  volume: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowedClients: z.array(z.object({
    allowDev: z.boolean().describe(
      "Allow dev flag. Which controls whether to allow creation of devices.",
    ).optional(),
    allowSuid: z.boolean().describe("Allow the setuid flag.").optional(),
    allowedClientsCidr: z.string().describe(
      "The subnet of IP addresses permitted to access the share.",
    ).optional(),
    mountPermissions: z.enum([
      "MOUNT_PERMISSIONS_UNSPECIFIED",
      "READ",
      "READ_WRITE",
    ]).describe("Mount permissions.").optional(),
    network: z.string().describe("The network the access point sits on.")
      .optional(),
    nfsPath: z.string().describe(
      'Output only. The path to access NFS, in format shareIP:/InstanceID InstanceID is the generated ID instead of customer provided name. example like "10.0.0.0:/g123456789-nfs001"',
    ).optional(),
    noRootSquash: z.boolean().describe(
      "Disable root squashing, which is a feature of NFS. Root squash is a special mapping of the remote superuser (root) identity when using identity authentication.",
    ).optional(),
    shareIp: z.string().describe(
      "Output only. The IP address of the share on this network. Assigned automatically during provisioning based on the network's services_cidr.",
    ).optional(),
  })).describe("List of allowed access points.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  name: z.string().describe("Immutable. The name of the NFS share.").optional(),
  pod: z.string().describe(
    "Immutable. Pod name. Pod is an independent part of infrastructure. NFSShare can only be connected to the assets (networks, instances) allocated in the same pod.",
  ).optional(),
  requestedSizeGib: z.string().describe("The requested size, in GiB.")
    .optional(),
  storageType: z.enum(["STORAGE_TYPE_UNSPECIFIED", "SSD", "HDD"]).describe(
    "Immutable. The storage type of the underlying volume.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Bare Metal Solution NfsShares. Registered at `@swamp/gcp/baremetalsolution/nfsshares`. */
export const model = {
  type: "@swamp/gcp/baremetalsolution/nfsshares",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An NFS share.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a nfsShares",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["allowedClients"] !== undefined) {
          body["allowedClients"] = g["allowedClients"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pod"] !== undefined) body["pod"] = g["pod"];
        if (g["requestedSizeGib"] !== undefined) {
          body["requestedSizeGib"] = g["requestedSizeGib"];
        }
        if (g["storageType"] !== undefined) {
          body["storageType"] = g["storageType"];
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
      description: "Get a nfsShares",
      arguments: z.object({
        identifier: z.string().describe("The name of the nfsShares"),
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
      description: "Update nfsShares attributes",
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
        if (g["allowedClients"] !== undefined) {
          body["allowedClients"] = g["allowedClients"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["requestedSizeGib"] !== undefined) {
          body["requestedSizeGib"] = g["requestedSizeGib"];
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
      description: "Delete the nfsShares",
      arguments: z.object({
        identifier: z.string().describe("The name of the nfsShares"),
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
      description: "Sync nfsShares state from GCP",
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
    rename: {
      description: "rename",
      arguments: z.object({
        newNfsshareId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["newNfsshareId"] !== undefined) {
          body["newNfsshareId"] = args["newNfsshareId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "baremetalsolution.projects.locations.nfsShares.rename",
            "path": "v2/{+name}:rename",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
