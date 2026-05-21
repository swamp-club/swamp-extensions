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
  getProjectId,
  isResourceNotFoundError,
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
  displayName: z.string().describe(
    "The report display name, as assigned by the user.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
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
    }).describe("Utilization metrics values for a single VM.").optional(),
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
    }).describe("VmwareVmDetails describes a VM in vCenter.").optional(),
  })).describe(
    'List of utilization information per VM. When sent as part of the request, the "vm_id" field is used in order to specify which VMs to include in the report. In that case all other fields are ignored.',
  ).optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  utilizationReportId: z.string().describe(
    "Required. The ID to use for the report, which will become the final component of the reports's resource name. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen.",
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
  displayName: z.string().describe(
    "The report display name, as assigned by the user.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
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
    }).describe("Utilization metrics values for a single VM.").optional(),
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
    }).describe("VmwareVmDetails describes a VM in vCenter.").optional(),
  })).describe(
    'List of utilization information per VM. When sent as part of the request, the "vm_id" field is used in order to specify which VMs to include in the report. In that case all other fields are ignored.',
  ).optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  utilizationReportId: z.string().describe(
    "Required. The ID to use for the report, which will become the final component of the reports's resource name. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VM Migration Sources.UtilizationReports. Registered at `@swamp/gcp/vmmigration/sources-utilizationreports`. */
export const model = {
  type: "@swamp/gcp/vmmigration/sources-utilizationreports",
  version: "2026.05.21.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["timeFrame"] !== undefined) body["timeFrame"] = g["timeFrame"];
        if (g["vms"] !== undefined) body["vms"] = g["vms"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["utilizationReportId"] !== undefined) {
          body["utilizationReportId"] = g["utilizationReportId"];
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Sync utilizationReports state from GCP",
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
