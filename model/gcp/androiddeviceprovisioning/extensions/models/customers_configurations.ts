// Auto-generated extension model for @swamp/gcp/androiddeviceprovisioning/customers-configurations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Android Device Provisioning Partner Customers.Configurations.
 *
 * A configuration collects the provisioning options for Android devices. Each configuration combines the following: * The EMM device policy controller (DPC) installed on the devices. * EMM policies enforced on the devices. * Metadata displayed on the device to help users during setup. Customers can add as many configurations as they need. However, zero-touch enrollment works best when a customer sets a default configuration that's applied to any new devices the organization purchases.
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
  return `${parent}/configurations/${shortName}`;
}

const BASE_URL = "https://androiddeviceprovisioning.googleapis.com/";

const GET_CONFIG = {
  "id": "androiddeviceprovisioning.customers.configurations.get",
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
  "id": "androiddeviceprovisioning.customers.configurations.create",
  "path": "v1/{+parent}/configurations",
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
  "id": "androiddeviceprovisioning.customers.configurations.patch",
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
  "id": "androiddeviceprovisioning.customers.configurations.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  companyName: z.string().describe(
    "Required. The name of the organization. Zero-touch enrollment shows this organization name to device users during device provisioning.",
  ).optional(),
  configurationName: z.string().describe(
    "Required. A short name that describes the configuration's purpose. For example, _Sales team_ or _Temporary employees_. The zero-touch enrollment portal displays this name to IT admins.",
  ).optional(),
  contactEmail: z.string().describe(
    "Required. The email address that device users can contact to get help. Zero-touch enrollment shows this email address to device users before device provisioning. The value is validated on input.",
  ).optional(),
  contactPhone: z.string().describe(
    "Required. The telephone number that device users can call, using another device, to get help. Zero-touch enrollment shows this number to device users before device provisioning. Accepts numerals, spaces, the plus sign, hyphens, and parentheses.",
  ).optional(),
  customMessage: z.string().describe(
    "A message, containing one or two sentences, to help device users get help or give them more details about what’s happening to their device. Zero-touch enrollment shows this message before the device is provisioned.",
  ).optional(),
  dpcExtras: z.string().describe(
    "The JSON-formatted EMM provisioning extras that are passed to the DPC.",
  ).optional(),
  dpcResourcePath: z.string().describe(
    "Required. The resource name of the selected DPC (device policy controller) in the format `customers/[CUSTOMER_ID]/dpcs/*`. To list the supported DPCs, call `customers.dpcs.list`.",
  ).optional(),
  forcedResetTime: z.string().describe(
    "Optional. The timeout before forcing factory reset the device if the device doesn't go through provisioning in the setup wizard, usually due to lack of network connectivity during setup wizard. Ranges from 0-6 hours, with 2 hours being the default if unset.",
  ).optional(),
  isDefault: z.boolean().describe(
    "Required. Whether this is the default configuration that zero-touch enrollment applies to any new devices the organization purchases in the future. Only one customer configuration can be the default. Setting this value to `true`, changes the previous default configuration's `isDefault` value to `false`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  companyName: z.string().optional(),
  configurationId: z.string().optional(),
  configurationName: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  customMessage: z.string().optional(),
  dpcExtras: z.string().optional(),
  dpcResourcePath: z.string().optional(),
  forcedResetTime: z.string().optional(),
  isDefault: z.boolean().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  companyName: z.string().describe(
    "Required. The name of the organization. Zero-touch enrollment shows this organization name to device users during device provisioning.",
  ).optional(),
  configurationName: z.string().describe(
    "Required. A short name that describes the configuration's purpose. For example, _Sales team_ or _Temporary employees_. The zero-touch enrollment portal displays this name to IT admins.",
  ).optional(),
  contactEmail: z.string().describe(
    "Required. The email address that device users can contact to get help. Zero-touch enrollment shows this email address to device users before device provisioning. The value is validated on input.",
  ).optional(),
  contactPhone: z.string().describe(
    "Required. The telephone number that device users can call, using another device, to get help. Zero-touch enrollment shows this number to device users before device provisioning. Accepts numerals, spaces, the plus sign, hyphens, and parentheses.",
  ).optional(),
  customMessage: z.string().describe(
    "A message, containing one or two sentences, to help device users get help or give them more details about what’s happening to their device. Zero-touch enrollment shows this message before the device is provisioned.",
  ).optional(),
  dpcExtras: z.string().describe(
    "The JSON-formatted EMM provisioning extras that are passed to the DPC.",
  ).optional(),
  dpcResourcePath: z.string().describe(
    "Required. The resource name of the selected DPC (device policy controller) in the format `customers/[CUSTOMER_ID]/dpcs/*`. To list the supported DPCs, call `customers.dpcs.list`.",
  ).optional(),
  forcedResetTime: z.string().describe(
    "Optional. The timeout before forcing factory reset the device if the device doesn't go through provisioning in the setup wizard, usually due to lack of network connectivity during setup wizard. Ranges from 0-6 hours, with 2 hours being the default if unset.",
  ).optional(),
  isDefault: z.boolean().describe(
    "Required. Whether this is the default configuration that zero-touch enrollment applies to any new devices the organization purchases in the future. Only one customer configuration can be the default. Setting this value to `true`, changes the previous default configuration's `isDefault` value to `false`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Android Device Provisioning Partner Customers.Configurations. Registered at `@swamp/gcp/androiddeviceprovisioning/customers-configurations`. */
export const model = {
  type: "@swamp/gcp/androiddeviceprovisioning/customers-configurations",
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
      description:
        "A configuration collects the provisioning options for Android devices. Each c...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a configurations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["companyName"] !== undefined) {
          body["companyName"] = g["companyName"];
        }
        if (g["configurationName"] !== undefined) {
          body["configurationName"] = g["configurationName"];
        }
        if (g["contactEmail"] !== undefined) {
          body["contactEmail"] = g["contactEmail"];
        }
        if (g["contactPhone"] !== undefined) {
          body["contactPhone"] = g["contactPhone"];
        }
        if (g["customMessage"] !== undefined) {
          body["customMessage"] = g["customMessage"];
        }
        if (g["dpcExtras"] !== undefined) body["dpcExtras"] = g["dpcExtras"];
        if (g["dpcResourcePath"] !== undefined) {
          body["dpcResourcePath"] = g["dpcResourcePath"];
        }
        if (g["forcedResetTime"] !== undefined) {
          body["forcedResetTime"] = g["forcedResetTime"];
        }
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
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
      description: "Get a configurations",
      arguments: z.object({
        identifier: z.string().describe("The name of the configurations"),
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
    update: {
      description: "Update configurations attributes",
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
        if (g["companyName"] !== undefined) {
          body["companyName"] = g["companyName"];
        }
        if (g["configurationName"] !== undefined) {
          body["configurationName"] = g["configurationName"];
        }
        if (g["contactEmail"] !== undefined) {
          body["contactEmail"] = g["contactEmail"];
        }
        if (g["contactPhone"] !== undefined) {
          body["contactPhone"] = g["contactPhone"];
        }
        if (g["customMessage"] !== undefined) {
          body["customMessage"] = g["customMessage"];
        }
        if (g["dpcExtras"] !== undefined) body["dpcExtras"] = g["dpcExtras"];
        if (g["dpcResourcePath"] !== undefined) {
          body["dpcResourcePath"] = g["dpcResourcePath"];
        }
        if (g["forcedResetTime"] !== undefined) {
          body["forcedResetTime"] = g["forcedResetTime"];
        }
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
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
      description: "Delete the configurations",
      arguments: z.object({
        identifier: z.string().describe("The name of the configurations"),
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
      description: "Sync configurations state from GCP",
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
  },
};
