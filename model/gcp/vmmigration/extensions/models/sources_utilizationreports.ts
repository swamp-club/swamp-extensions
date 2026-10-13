// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/vmmigration/sources-utilizationreports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VM Migration Sources.UtilizationReports.
 *
 * Utilization report details the utilization (CPU, memory, etc.) of selected source VMs.
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
  return `${parent}/utilizationReports/${shortName}`;
}

const BASE_URL = "https://vmmigration.googleapis.com/";

const GET_CONFIG = {
  "id": "vmmigration.projects.locations.sources.utilizationReports.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "vmmigration.projects.locations.sources.utilizationReports.create",
  "path": "v1/{+parent}/utilizationReports",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "utilizationReportId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vmmigration.projects.locations.sources.utilizationReports.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "vmmigration.projects.locations.sources.utilizationReports.list",
  "path": "v1/{+parent}/utilizationReports",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
    "view": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  displayName: z.string().describe(
    "The report display name, as assigned by the user.",
  ).optional(),
  timeFrame: z.enum(["TIME_FRAME_UNSPECIFIED", "WEEK", "MONTH", "YEAR"])
    .describe("Time frame of the report.").optional(),
  vms: z.array(z.object({
    utilization: z.object({
      cpuAveragePercent: z.number().int().describe(
        "Average CPU usage, percent.",
      ).optional(),
      cpuMaxPercent: z.number().int().describe("Max CPU usage, percent.")
        .optional(),
      diskIoRateAverageKbps: z.string().describe(
        "Average disk IO rate, in kilobytes per second.",
      ).optional(),
      diskIoRateMaxKbps: z.string().describe(
        "Max disk IO rate, in kilobytes per second.",
      ).optional(),
      memoryAveragePercent: z.number().int().describe(
        "Average memory usage, percent.",
      ).optional(),
      memoryMaxPercent: z.number().int().describe("Max memory usage, percent.")
        .optional(),
      networkThroughputAverageKbps: z.string().describe(
        "Average network throughput (combined transmit-rates and receive-rates), in kilobytes per second.",
      ).optional(),
      networkThroughputMaxKbps: z.string().describe(
        "Max network throughput (combined transmit-rates and receive-rates), in kilobytes per second.",
      ).optional(),
    }).describe("Utilization metrics for this VM.").optional(),
    vmId: z.string().describe("The VM's ID in the source.").optional(),
    vmwareVmDetails: z.object({
      architecture: z.enum([
        "VM_ARCHITECTURE_UNSPECIFIED",
        "VM_ARCHITECTURE_X86_FAMILY",
        "VM_ARCHITECTURE_ARM64",
      ]).describe("Output only. The CPU architecture.").optional(),
      bootOption: z.enum(["BOOT_OPTION_UNSPECIFIED", "EFI", "BIOS"]).describe(
        "Output only. The VM Boot Option.",
      ).optional(),
      committedStorageMb: z.string().describe(
        "The total size of the storage allocated to the VM in MB.",
      ).optional(),
      cpuCount: z.number().int().describe("The number of cpus in the VM.")
        .optional(),
      datacenterDescription: z.string().describe(
        "The descriptive name of the vCenter's datacenter this VM is contained in.",
      ).optional(),
      datacenterId: z.string().describe(
        "The id of the vCenter's datacenter this VM is contained in.",
      ).optional(),
      diskCount: z.number().int().describe("The number of disks the VM has.")
        .optional(),
      displayName: z.string().describe(
        "The display name of the VM. Note that this is not necessarily unique.",
      ).optional(),
      guestDescription: z.string().describe(
        "The VM's OS. See for example https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html for types of strings this might hold.",
      ).optional(),
      memoryMb: z.number().int().describe(
        "The size of the memory of the VM in MB.",
      ).optional(),
      powerState: z.enum(["POWER_STATE_UNSPECIFIED", "ON", "OFF", "SUSPENDED"])
        .describe("The power state of the VM at the moment list was taken.")
        .optional(),
      uuid: z.string().describe("The unique identifier of the VM in vCenter.")
        .optional(),
      vmId: z.string().describe(
        "The VM's id in the source (note that this is not the MigratingVm's id). This is the moref id of the VM.",
      ).optional(),
    }).describe("The description of the VM in a Source of type Vmware.")
      .optional(),
  })).describe(
    'List of utilization information per VM. When sent as part of the request, the "vm_id" field is used in order to specify which VMs to include in the report. In that case all other fields are ignored.',
  ).optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  utilizationReportId: z.string().describe(
    "Required. The ID to use for the report, which will become the final component of the reports's resource name. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  frameEndTime: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  stateTime: z.string().optional(),
  timeFrame: z.string().optional(),
  vmCount: z.number().optional(),
  vms: z.array(z.object({
    utilization: z.object({
      cpuAveragePercent: z.number(),
      cpuMaxPercent: z.number(),
      diskIoRateAverageKbps: z.string(),
      diskIoRateMaxKbps: z.string(),
      memoryAveragePercent: z.number(),
      memoryMaxPercent: z.number(),
      networkThroughputAverageKbps: z.string(),
      networkThroughputMaxKbps: z.string(),
    }),
    vmId: z.string(),
    vmwareVmDetails: z.object({
      architecture: z.string(),
      bootOption: z.string(),
      committedStorageMb: z.string(),
      cpuCount: z.number(),
      datacenterDescription: z.string(),
      datacenterId: z.string(),
      diskCount: z.number(),
      displayName: z.string(),
      guestDescription: z.string(),
      memoryMb: z.number(),
      powerState: z.string(),
      uuid: z.string(),
      vmId: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  displayName: z.string().describe(
    "The report display name, as assigned by the user.",
  ).optional(),
  timeFrame: z.enum(["TIME_FRAME_UNSPECIFIED", "WEEK", "MONTH", "YEAR"])
    .describe("Time frame of the report.").optional(),
  vms: z.array(z.object({
    utilization: z.object({
      cpuAveragePercent: z.number().int().describe(
        "Average CPU usage, percent.",
      ).optional(),
      cpuMaxPercent: z.number().int().describe("Max CPU usage, percent.")
        .optional(),
      diskIoRateAverageKbps: z.string().describe(
        "Average disk IO rate, in kilobytes per second.",
      ).optional(),
      diskIoRateMaxKbps: z.string().describe(
        "Max disk IO rate, in kilobytes per second.",
      ).optional(),
      memoryAveragePercent: z.number().int().describe(
        "Average memory usage, percent.",
      ).optional(),
      memoryMaxPercent: z.number().int().describe("Max memory usage, percent.")
        .optional(),
      networkThroughputAverageKbps: z.string().describe(
        "Average network throughput (combined transmit-rates and receive-rates), in kilobytes per second.",
      ).optional(),
      networkThroughputMaxKbps: z.string().describe(
        "Max network throughput (combined transmit-rates and receive-rates), in kilobytes per second.",
      ).optional(),
    }).describe("Utilization metrics for this VM.").optional(),
    vmId: z.string().describe("The VM's ID in the source.").optional(),
    vmwareVmDetails: z.object({
      architecture: z.enum([
        "VM_ARCHITECTURE_UNSPECIFIED",
        "VM_ARCHITECTURE_X86_FAMILY",
        "VM_ARCHITECTURE_ARM64",
      ]).describe("Output only. The CPU architecture.").optional(),
      bootOption: z.enum(["BOOT_OPTION_UNSPECIFIED", "EFI", "BIOS"]).describe(
        "Output only. The VM Boot Option.",
      ).optional(),
      committedStorageMb: z.string().describe(
        "The total size of the storage allocated to the VM in MB.",
      ).optional(),
      cpuCount: z.number().int().describe("The number of cpus in the VM.")
        .optional(),
      datacenterDescription: z.string().describe(
        "The descriptive name of the vCenter's datacenter this VM is contained in.",
      ).optional(),
      datacenterId: z.string().describe(
        "The id of the vCenter's datacenter this VM is contained in.",
      ).optional(),
      diskCount: z.number().int().describe("The number of disks the VM has.")
        .optional(),
      displayName: z.string().describe(
        "The display name of the VM. Note that this is not necessarily unique.",
      ).optional(),
      guestDescription: z.string().describe(
        "The VM's OS. See for example https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html for types of strings this might hold.",
      ).optional(),
      memoryMb: z.number().int().describe(
        "The size of the memory of the VM in MB.",
      ).optional(),
      powerState: z.enum(["POWER_STATE_UNSPECIFIED", "ON", "OFF", "SUSPENDED"])
        .describe("The power state of the VM at the moment list was taken.")
        .optional(),
      uuid: z.string().describe("The unique identifier of the VM in vCenter.")
        .optional(),
      vmId: z.string().describe(
        "The VM's id in the source (note that this is not the MigratingVm's id). This is the moref id of the VM.",
      ).optional(),
    }).describe("The description of the VM in a Source of type Vmware.")
      .optional(),
  })).describe(
    'List of utilization information per VM. When sent as part of the request, the "vm_id" field is used in order to specify which VMs to include in the report. In that case all other fields are ignored.',
  ).optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  utilizationReportId: z.string().describe(
    "Required. The ID to use for the report, which will become the final component of the reports's resource name. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud VM Migration Sources.UtilizationReports. Registered at `@swamp/gcp/vmmigration/sources-utilizationreports`. */
export const model = {
  type: "@swamp/gcp/vmmigration/sources-utilizationreports",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: error",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { error: _error, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Utilization report details the utilization (CPU, memory, etc.) of selected so...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a utilizationReports",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["timeFrame"] !== undefined) body["timeFrame"] = g["timeFrame"];
        if (g["vms"] !== undefined) body["vms"] = g["vms"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["utilizationReportId"] !== undefined) {
          params["utilizationReportId"] = String(g["utilizationReportId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a utilizationReports",
      arguments: z.object({
        identifier: z.string().describe("The name of the utilizationReports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
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
      description: "Delete the utilizationReports",
      arguments: z.object({
        identifier: z.string().describe("The name of the utilizationReports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync utilizationReports state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific utilizationReports by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List utilizationReports resources",
      arguments: z.object({
        filter: z.string().describe("Optional. The filter request.").optional(),
        orderBy: z.string().describe(
          "Optional. the order by fields for the result.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of reports to return. The service may return fewer than this value. If unspecified, at most 500 reports will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "Optional. The level of details of each report. Defaults to BASIC.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "utilizationReports",
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
  },
};
