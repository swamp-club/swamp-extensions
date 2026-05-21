// Auto-generated extension model for @swamp/gcp/oracledatabase/cloudexadatainfrastructures
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud CloudExadataInfrastructures.
 *
 * Represents CloudExadataInfrastructure resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/CloudExadataInfrastructure/
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
  return `${parent}/cloudExadataInfrastructures/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.cloudExadataInfrastructures.get",
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
  "id": "oracledatabase.projects.locations.cloudExadataInfrastructures.create",
  "path": "v1/{+parent}/cloudExadataInfrastructures",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cloudExadataInfrastructureId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "oracledatabase.projects.locations.cloudExadataInfrastructures.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
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
  "id": "oracledatabase.projects.locations.cloudExadataInfrastructures.list",
  "path": "v1/{+parent}/cloudExadataInfrastructures",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Optional. User friendly name for this resource.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle Exadata Infrastructure is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels or tags associated with the resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the Exadata Infrastructure resource with the format: projects/{project}/locations/{region}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}",
  ).optional(),
  properties: z.object({
    activatedStorageCount: z.number().int().describe(
      "Output only. The requested number of additional storage servers activated for the Exadata Infrastructure.",
    ).optional(),
    additionalStorageCount: z.number().int().describe(
      "Output only. The requested number of additional storage servers for the Exadata Infrastructure.",
    ).optional(),
    availableStorageSizeGb: z.number().int().describe(
      "Output only. The available storage can be allocated to the Exadata Infrastructure resource, in gigabytes (GB).",
    ).optional(),
    computeCount: z.number().int().describe(
      "Optional. The number of compute servers for the Exadata Infrastructure.",
    ).optional(),
    computeModel: z.enum([
      "COMPUTE_MODEL_UNSPECIFIED",
      "COMPUTE_MODEL_ECPU",
      "COMPUTE_MODEL_OCPU",
    ]).describe("Output only. The compute model of the Exadata Infrastructure.")
      .optional(),
    cpuCount: z.number().int().describe(
      "Output only. The number of enabled CPU cores.",
    ).optional(),
    customerContacts: z.array(z.object({
      email: z.string().describe(
        "Required. The email address used by Oracle to send notifications regarding databases and infrastructure.",
      ).optional(),
    })).describe("Optional. The list of customer contacts.").optional(),
    dataStorageSizeTb: z.number().describe(
      "Output only. Size, in terabytes, of the DATA disk group.",
    ).optional(),
    databaseServerType: z.string().describe(
      "Output only. The database server type of the Exadata Infrastructure.",
    ).optional(),
    dbNodeStorageSizeGb: z.number().int().describe(
      "Output only. The local node storage allocated in GBs.",
    ).optional(),
    dbServerVersion: z.string().describe(
      "Output only. The software version of the database servers (dom0) in the Exadata Infrastructure.",
    ).optional(),
    maintenanceWindow: z.object({
      customActionTimeoutMins: z.number().int().describe(
        "Optional. Determines the amount of time the system will wait before the start of each database server patching operation. Custom action timeout is in minutes and valid value is between 15 to 120 (inclusive).",
      ).optional(),
      daysOfWeek: z.array(
        z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      ).describe(
        "Optional. Days during the week when maintenance should be performed.",
      ).optional(),
      hoursOfDay: z.array(z.number().int()).describe(
        "Optional. The window of hours during the day when maintenance should be performed. The window is a 4 hour slot. Valid values are: 0 - represents time slot 0:00 - 3:59 UTC 4 - represents time slot 4:00 - 7:59 UTC 8 - represents time slot 8:00 - 11:59 UTC 12 - represents time slot 12:00 - 15:59 UTC 16 - represents time slot 16:00 - 19:59 UTC 20 - represents time slot 20:00 - 23:59 UTC",
      ).optional(),
      isCustomActionTimeoutEnabled: z.boolean().describe(
        "Optional. If true, enables the configuration of a custom action timeout (waiting period) between database server patching operations.",
      ).optional(),
      leadTimeWeek: z.number().int().describe(
        "Optional. Lead time window allows user to set a lead time to prepare for a down time. The lead time is in weeks and valid value is between 1 to 4.",
      ).optional(),
      months: z.array(
        z.enum([
          "MONTH_UNSPECIFIED",
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ]),
      ).describe(
        "Optional. Months during the year when maintenance should be performed.",
      ).optional(),
      patchingMode: z.enum([
        "PATCHING_MODE_UNSPECIFIED",
        "ROLLING",
        "NON_ROLLING",
      ]).describe(
        'Optional. Cloud CloudExadataInfrastructure node patching method, either "ROLLING" or "NONROLLING". Default value is ROLLING.',
      ).optional(),
      preference: z.enum([
        "MAINTENANCE_WINDOW_PREFERENCE_UNSPECIFIED",
        "CUSTOM_PREFERENCE",
        "NO_PREFERENCE",
      ]).describe("Optional. The maintenance window scheduling preference.")
        .optional(),
      weeksOfMonth: z.array(z.number().int()).describe(
        "Optional. Weeks during the month when maintenance should be performed. Weeks start on the 1st, 8th, 15th, and 22nd days of the month, and have a duration of 7 days. Weeks start and end based on calendar dates, not days of the week.",
      ).optional(),
    }).describe(
      "Maintenance window as defined by Oracle. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/MaintenanceWindow",
    ).optional(),
    maxCpuCount: z.number().int().describe(
      "Output only. The total number of CPU cores available.",
    ).optional(),
    maxDataStorageTb: z.number().describe(
      "Output only. The total available DATA disk group size.",
    ).optional(),
    maxDbNodeStorageSizeGb: z.number().int().describe(
      "Output only. The total local node storage available in GBs.",
    ).optional(),
    maxMemoryGb: z.number().int().describe(
      "Output only. The total memory available in GBs.",
    ).optional(),
    memorySizeGb: z.number().int().describe(
      "Output only. The memory allocated in GBs.",
    ).optional(),
    monthlyDbServerVersion: z.string().describe(
      "Output only. The monthly software version of the database servers (dom0) in the Exadata Infrastructure. Example: 20.1.15",
    ).optional(),
    monthlyStorageServerVersion: z.string().describe(
      "Output only. The monthly software version of the storage servers (cells) in the Exadata Infrastructure. Example: 20.1.15",
    ).optional(),
    nextMaintenanceRunId: z.string().describe(
      "Output only. The OCID of the next maintenance run.",
    ).optional(),
    nextMaintenanceRunTime: z.string().describe(
      "Output only. The time when the next maintenance run will occur.",
    ).optional(),
    nextSecurityMaintenanceRunTime: z.string().describe(
      "Output only. The time when the next security maintenance run will occur.",
    ).optional(),
    ociUrl: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. OCID of created infra. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle",
    ).optional(),
    shape: z.string().describe(
      "Required. The shape of the Exadata Infrastructure. The shape determines the amount of CPU, storage, and memory resources allocated to the instance.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MAINTENANCE_IN_PROGRESS",
    ]).describe(
      "Output only. The current lifecycle state of the Exadata Infrastructure.",
    ).optional(),
    storageCount: z.number().int().describe(
      "Optional. The number of Cloud Exadata storage servers for the Exadata Infrastructure.",
    ).optional(),
    storageServerType: z.string().describe(
      "Output only. The storage server type of the Exadata Infrastructure.",
    ).optional(),
    storageServerVersion: z.string().describe(
      "Output only. The software version of the storage servers (cells) in the Exadata Infrastructure.",
    ).optional(),
    totalStorageSizeGb: z.number().int().describe(
      "Optional. The total storage allocated to the Exadata Infrastructure resource, in gigabytes (GB).",
    ).optional(),
  }).describe("Various properties of Exadata Infrastructure.").optional(),
  cloudExadataInfrastructureId: z.string().describe(
    "Required. The ID of the Exadata Infrastructure to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  entitlementId: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  properties: z.object({
    activatedStorageCount: z.number(),
    additionalStorageCount: z.number(),
    availableStorageSizeGb: z.number(),
    computeCount: z.number(),
    computeModel: z.string(),
    cpuCount: z.number(),
    customerContacts: z.array(z.object({
      email: z.string(),
    })),
    dataStorageSizeTb: z.number(),
    databaseServerType: z.string(),
    dbNodeStorageSizeGb: z.number(),
    dbServerVersion: z.string(),
    maintenanceWindow: z.object({
      customActionTimeoutMins: z.number(),
      daysOfWeek: z.array(z.string()),
      hoursOfDay: z.array(z.number()),
      isCustomActionTimeoutEnabled: z.boolean(),
      leadTimeWeek: z.number(),
      months: z.array(z.string()),
      patchingMode: z.string(),
      preference: z.string(),
      weeksOfMonth: z.array(z.number()),
    }),
    maxCpuCount: z.number(),
    maxDataStorageTb: z.number(),
    maxDbNodeStorageSizeGb: z.number(),
    maxMemoryGb: z.number(),
    memorySizeGb: z.number(),
    monthlyDbServerVersion: z.string(),
    monthlyStorageServerVersion: z.string(),
    nextMaintenanceRunId: z.string(),
    nextMaintenanceRunTime: z.string(),
    nextSecurityMaintenanceRunTime: z.string(),
    ociUrl: z.string(),
    ocid: z.string(),
    shape: z.string(),
    state: z.string(),
    storageCount: z.number(),
    storageServerType: z.string(),
    storageServerVersion: z.string(),
    totalStorageSizeGb: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Optional. User friendly name for this resource.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle Exadata Infrastructure is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels or tags associated with the resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the Exadata Infrastructure resource with the format: projects/{project}/locations/{region}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}",
  ).optional(),
  properties: z.object({
    activatedStorageCount: z.number().int().describe(
      "Output only. The requested number of additional storage servers activated for the Exadata Infrastructure.",
    ).optional(),
    additionalStorageCount: z.number().int().describe(
      "Output only. The requested number of additional storage servers for the Exadata Infrastructure.",
    ).optional(),
    availableStorageSizeGb: z.number().int().describe(
      "Output only. The available storage can be allocated to the Exadata Infrastructure resource, in gigabytes (GB).",
    ).optional(),
    computeCount: z.number().int().describe(
      "Optional. The number of compute servers for the Exadata Infrastructure.",
    ).optional(),
    computeModel: z.enum([
      "COMPUTE_MODEL_UNSPECIFIED",
      "COMPUTE_MODEL_ECPU",
      "COMPUTE_MODEL_OCPU",
    ]).describe("Output only. The compute model of the Exadata Infrastructure.")
      .optional(),
    cpuCount: z.number().int().describe(
      "Output only. The number of enabled CPU cores.",
    ).optional(),
    customerContacts: z.array(z.object({
      email: z.string().describe(
        "Required. The email address used by Oracle to send notifications regarding databases and infrastructure.",
      ).optional(),
    })).describe("Optional. The list of customer contacts.").optional(),
    dataStorageSizeTb: z.number().describe(
      "Output only. Size, in terabytes, of the DATA disk group.",
    ).optional(),
    databaseServerType: z.string().describe(
      "Output only. The database server type of the Exadata Infrastructure.",
    ).optional(),
    dbNodeStorageSizeGb: z.number().int().describe(
      "Output only. The local node storage allocated in GBs.",
    ).optional(),
    dbServerVersion: z.string().describe(
      "Output only. The software version of the database servers (dom0) in the Exadata Infrastructure.",
    ).optional(),
    maintenanceWindow: z.object({
      customActionTimeoutMins: z.number().int().describe(
        "Optional. Determines the amount of time the system will wait before the start of each database server patching operation. Custom action timeout is in minutes and valid value is between 15 to 120 (inclusive).",
      ).optional(),
      daysOfWeek: z.array(
        z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      ).describe(
        "Optional. Days during the week when maintenance should be performed.",
      ).optional(),
      hoursOfDay: z.array(z.number().int()).describe(
        "Optional. The window of hours during the day when maintenance should be performed. The window is a 4 hour slot. Valid values are: 0 - represents time slot 0:00 - 3:59 UTC 4 - represents time slot 4:00 - 7:59 UTC 8 - represents time slot 8:00 - 11:59 UTC 12 - represents time slot 12:00 - 15:59 UTC 16 - represents time slot 16:00 - 19:59 UTC 20 - represents time slot 20:00 - 23:59 UTC",
      ).optional(),
      isCustomActionTimeoutEnabled: z.boolean().describe(
        "Optional. If true, enables the configuration of a custom action timeout (waiting period) between database server patching operations.",
      ).optional(),
      leadTimeWeek: z.number().int().describe(
        "Optional. Lead time window allows user to set a lead time to prepare for a down time. The lead time is in weeks and valid value is between 1 to 4.",
      ).optional(),
      months: z.array(
        z.enum([
          "MONTH_UNSPECIFIED",
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ]),
      ).describe(
        "Optional. Months during the year when maintenance should be performed.",
      ).optional(),
      patchingMode: z.enum([
        "PATCHING_MODE_UNSPECIFIED",
        "ROLLING",
        "NON_ROLLING",
      ]).describe(
        'Optional. Cloud CloudExadataInfrastructure node patching method, either "ROLLING" or "NONROLLING". Default value is ROLLING.',
      ).optional(),
      preference: z.enum([
        "MAINTENANCE_WINDOW_PREFERENCE_UNSPECIFIED",
        "CUSTOM_PREFERENCE",
        "NO_PREFERENCE",
      ]).describe("Optional. The maintenance window scheduling preference.")
        .optional(),
      weeksOfMonth: z.array(z.number().int()).describe(
        "Optional. Weeks during the month when maintenance should be performed. Weeks start on the 1st, 8th, 15th, and 22nd days of the month, and have a duration of 7 days. Weeks start and end based on calendar dates, not days of the week.",
      ).optional(),
    }).describe(
      "Maintenance window as defined by Oracle. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/MaintenanceWindow",
    ).optional(),
    maxCpuCount: z.number().int().describe(
      "Output only. The total number of CPU cores available.",
    ).optional(),
    maxDataStorageTb: z.number().describe(
      "Output only. The total available DATA disk group size.",
    ).optional(),
    maxDbNodeStorageSizeGb: z.number().int().describe(
      "Output only. The total local node storage available in GBs.",
    ).optional(),
    maxMemoryGb: z.number().int().describe(
      "Output only. The total memory available in GBs.",
    ).optional(),
    memorySizeGb: z.number().int().describe(
      "Output only. The memory allocated in GBs.",
    ).optional(),
    monthlyDbServerVersion: z.string().describe(
      "Output only. The monthly software version of the database servers (dom0) in the Exadata Infrastructure. Example: 20.1.15",
    ).optional(),
    monthlyStorageServerVersion: z.string().describe(
      "Output only. The monthly software version of the storage servers (cells) in the Exadata Infrastructure. Example: 20.1.15",
    ).optional(),
    nextMaintenanceRunId: z.string().describe(
      "Output only. The OCID of the next maintenance run.",
    ).optional(),
    nextMaintenanceRunTime: z.string().describe(
      "Output only. The time when the next maintenance run will occur.",
    ).optional(),
    nextSecurityMaintenanceRunTime: z.string().describe(
      "Output only. The time when the next security maintenance run will occur.",
    ).optional(),
    ociUrl: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. OCID of created infra. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle",
    ).optional(),
    shape: z.string().describe(
      "Required. The shape of the Exadata Infrastructure. The shape determines the amount of CPU, storage, and memory resources allocated to the instance.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MAINTENANCE_IN_PROGRESS",
    ]).describe(
      "Output only. The current lifecycle state of the Exadata Infrastructure.",
    ).optional(),
    storageCount: z.number().int().describe(
      "Optional. The number of Cloud Exadata storage servers for the Exadata Infrastructure.",
    ).optional(),
    storageServerType: z.string().describe(
      "Output only. The storage server type of the Exadata Infrastructure.",
    ).optional(),
    storageServerVersion: z.string().describe(
      "Output only. The software version of the storage servers (cells) in the Exadata Infrastructure.",
    ).optional(),
    totalStorageSizeGb: z.number().int().describe(
      "Optional. The total storage allocated to the Exadata Infrastructure resource, in gigabytes (GB).",
    ).optional(),
  }).describe("Various properties of Exadata Infrastructure.").optional(),
  cloudExadataInfrastructureId: z.string().describe(
    "Required. The ID of the Exadata Infrastructure to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud CloudExadataInfrastructures. Registered at `@swamp/gcp/oracledatabase/cloudexadatainfrastructures`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/cloudexadatainfrastructures",
  version: "2026.05.21.1",
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
        "Represents CloudExadataInfrastructure resource. https://docs.oracle.com/en-us...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a cloudExadataInfrastructures",
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
        if (g["gcpOracleZone"] !== undefined) {
          body["gcpOracleZone"] = g["gcpOracleZone"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["cloudExadataInfrastructureId"] !== undefined) {
          body["cloudExadataInfrastructureId"] =
            g["cloudExadataInfrastructureId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a cloudExadataInfrastructures",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the cloudExadataInfrastructures",
        ),
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
    delete: {
      description: "Delete the cloudExadataInfrastructures",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the cloudExadataInfrastructures",
        ),
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
      description: "Sync cloudExadataInfrastructures state from GCP",
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
