// Auto-generated extension model for @swamp/gcp/apigee/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Instances.
 *
 * Apigee runtime instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.instances.get",
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
  "id": "apigee.organizations.instances.create",
  "path": "v1/{+parent}/instances",
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
  "id": "apigee.organizations.instances.patch",
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
  "id": "apigee.organizations.instances.delete",
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

const LIST_CONFIG = {
  "id": "apigee.organizations.instances.list",
  "path": "v1/{+parent}/instances",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  accessLoggingConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Boolean flag that specifies whether the customer access log feature is enabled.",
    ).optional(),
    filter: z.string().describe(
      'Optional. Ship the access log entries that match the status_code defined in the filter. The status_code is the only expected/supported filter field. (Ex: status_code) The filter will parse it to the Common Expression Language semantics for expression evaluation to build the filter condition. (Ex: "filter": status_code >= 200 && status_code < 300)',
    ).optional(),
  }).describe(
    "Access logging configuration enables customers to ship the access logs from the tenant projects to their own project's cloud logging. The feature is at the instance level ad disabled by default. It can be enabled during CreateInstance or UpdateInstance.",
  ).optional(),
  consumerAcceptList: z.array(z.string()).describe(
    "Optional. Customer accept list represents the list of projects (id/number) on customer side that can privately connect to the service attachment. It is an optional field which the customers can provide during the instance creation. By default, the customer project associated with the Apigee organization will be included to the list.",
  ).optional(),
  description: z.string().describe("Optional. Description of the instance.")
    .optional(),
  diskEncryptionKeyName: z.string().describe(
    "Optional. Customer Managed Encryption Key (CMEK) used for disk and volume encryption. If not specified, a Google-Managed encryption key will be used. Use the following format: `projects/([^/]+)/locations/([^/]+)/keyRings/([^/]+)/cryptoKeys/([^/]+)`",
  ).optional(),
  displayName: z.string().describe("Optional. Display name for the instance.")
    .optional(),
  ipRange: z.string().describe(
    "Optional. Comma-separated list of CIDR blocks of length 22 and/or 28 used to create the Apigee instance. Providing CIDR ranges is optional. You can provide just /22 or /28 or both (or neither). Ranges you provide should be freely available as part of a larger named range you have allocated to the Service Networking peering. If this parameter is not provided, Apigee automatically requests an available /22 and /28 CIDR block from Service Networking. Use the /22 CIDR block for configuring your firewall needs to allow traffic from Apigee. Input formats: `a.b.c.d/22` or `e.f.g.h/28` or `a.b.c.d/22,e.f.g.h/28`",
  ).optional(),
  location: z.string().describe(
    "Required. Compute Engine location where the instance resides.",
  ).optional(),
  maintenanceUpdatePolicy: z.object({
    maintenanceChannel: z.enum([
      "MAINTENANCE_CHANNEL_UNSPECIFIED",
      "WEEK1",
      "WEEK2",
    ]).describe(
      "Optional. Maintenance channel to specify relative scheduling for maintenance.",
    ).optional(),
    maintenanceWindows: z.array(z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Required. Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc.",
      ).optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Optional. Preferred windows to perform maintenance. Currently limited to 1.",
    ).optional(),
  }).describe(
    "MaintenanceUpdatePolicy specifies the preferred window to perform maintenance on the instance (day of the week and time of day).",
  ).optional(),
  name: z.string().describe(
    "Required. Resource ID of the instance. Values must match the regular expression `^a-z{0,30}[a-z\\d]$`.",
  ).optional(),
  scheduledMaintenance: z.object({
    startTime: z.string().describe(
      "Output only. The start time (UTC) of the scheduled maintenance.",
    ).optional(),
  }).describe("Scheduled maintenance information for an instance.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessLoggingConfig: z.object({
    enabled: z.boolean(),
    filter: z.string(),
  }).optional(),
  consumerAcceptList: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  description: z.string().optional(),
  diskEncryptionKeyName: z.string().optional(),
  displayName: z.string().optional(),
  host: z.string().optional(),
  ipRange: z.string().optional(),
  isVersionLocked: z.boolean().optional(),
  lastModifiedAt: z.string().optional(),
  location: z.string().optional(),
  maintenanceUpdatePolicy: z.object({
    maintenanceChannel: z.string(),
    maintenanceWindows: z.array(z.object({
      day: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  name: z.string(),
  peeringCidrRange: z.string().optional(),
  port: z.string().optional(),
  runtimeVersion: z.string().optional(),
  scheduledMaintenance: z.object({
    startTime: z.string(),
  }).optional(),
  serviceAttachment: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessLoggingConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Boolean flag that specifies whether the customer access log feature is enabled.",
    ).optional(),
    filter: z.string().describe(
      'Optional. Ship the access log entries that match the status_code defined in the filter. The status_code is the only expected/supported filter field. (Ex: status_code) The filter will parse it to the Common Expression Language semantics for expression evaluation to build the filter condition. (Ex: "filter": status_code >= 200 && status_code < 300)',
    ).optional(),
  }).describe(
    "Access logging configuration enables customers to ship the access logs from the tenant projects to their own project's cloud logging. The feature is at the instance level ad disabled by default. It can be enabled during CreateInstance or UpdateInstance.",
  ).optional(),
  consumerAcceptList: z.array(z.string()).describe(
    "Optional. Customer accept list represents the list of projects (id/number) on customer side that can privately connect to the service attachment. It is an optional field which the customers can provide during the instance creation. By default, the customer project associated with the Apigee organization will be included to the list.",
  ).optional(),
  description: z.string().describe("Optional. Description of the instance.")
    .optional(),
  diskEncryptionKeyName: z.string().describe(
    "Optional. Customer Managed Encryption Key (CMEK) used for disk and volume encryption. If not specified, a Google-Managed encryption key will be used. Use the following format: `projects/([^/]+)/locations/([^/]+)/keyRings/([^/]+)/cryptoKeys/([^/]+)`",
  ).optional(),
  displayName: z.string().describe("Optional. Display name for the instance.")
    .optional(),
  ipRange: z.string().describe(
    "Optional. Comma-separated list of CIDR blocks of length 22 and/or 28 used to create the Apigee instance. Providing CIDR ranges is optional. You can provide just /22 or /28 or both (or neither). Ranges you provide should be freely available as part of a larger named range you have allocated to the Service Networking peering. If this parameter is not provided, Apigee automatically requests an available /22 and /28 CIDR block from Service Networking. Use the /22 CIDR block for configuring your firewall needs to allow traffic from Apigee. Input formats: `a.b.c.d/22` or `e.f.g.h/28` or `a.b.c.d/22,e.f.g.h/28`",
  ).optional(),
  location: z.string().describe(
    "Required. Compute Engine location where the instance resides.",
  ).optional(),
  maintenanceUpdatePolicy: z.object({
    maintenanceChannel: z.enum([
      "MAINTENANCE_CHANNEL_UNSPECIFIED",
      "WEEK1",
      "WEEK2",
    ]).describe(
      "Optional. Maintenance channel to specify relative scheduling for maintenance.",
    ).optional(),
    maintenanceWindows: z.array(z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Required. Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc.",
      ).optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Optional. Preferred windows to perform maintenance. Currently limited to 1.",
    ).optional(),
  }).describe(
    "MaintenanceUpdatePolicy specifies the preferred window to perform maintenance on the instance (day of the week and time of day).",
  ).optional(),
  name: z.string().describe(
    "Required. Resource ID of the instance. Values must match the regular expression `^a-z{0,30}[a-z\\d]$`.",
  ).optional(),
  scheduledMaintenance: z.object({
    startTime: z.string().describe(
      "Output only. The start time (UTC) of the scheduled maintenance.",
    ).optional(),
  }).describe("Scheduled maintenance information for an instance.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Instances. Registered at `@swamp/gcp/apigee/instances`. */
export const model = {
  type: "@swamp/gcp/apigee/instances",
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
      description: "Apigee runtime instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accessLoggingConfig"] !== undefined) {
          body["accessLoggingConfig"] = g["accessLoggingConfig"];
        }
        if (g["consumerAcceptList"] !== undefined) {
          body["consumerAcceptList"] = g["consumerAcceptList"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskEncryptionKeyName"] !== undefined) {
          body["diskEncryptionKeyName"] = g["diskEncryptionKeyName"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["ipRange"] !== undefined) body["ipRange"] = g["ipRange"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = g["maintenanceUpdatePolicy"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["scheduledMaintenance"] !== undefined) {
          body["scheduledMaintenance"] = g["scheduledMaintenance"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Update instances attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["accessLoggingConfig"] !== undefined) {
          body["accessLoggingConfig"] = g["accessLoggingConfig"];
        }
        if (g["consumerAcceptList"] !== undefined) {
          body["consumerAcceptList"] = g["consumerAcceptList"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskEncryptionKeyName"] !== undefined) {
          body["diskEncryptionKeyName"] = g["diskEncryptionKeyName"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["ipRange"] !== undefined) body["ipRange"] = g["ipRange"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = g["maintenanceUpdatePolicy"];
        }
        if (g["scheduledMaintenance"] !== undefined) {
          body["scheduledMaintenance"] = g["scheduledMaintenance"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
      description: "List instances resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of instances to return. Defaults to 25.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "instances",
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
    report_status: {
      description: "report status",
      arguments: z.object({
        instanceUid: z.any().optional(),
        reportTime: z.any().optional(),
        resources: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instanceUid"] !== undefined) {
          body["instanceUid"] = args["instanceUid"];
        }
        if (args["reportTime"] !== undefined) {
          body["reportTime"] = args["reportTime"];
        }
        if (args["resources"] !== undefined) {
          body["resources"] = args["resources"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.instances.reportStatus",
            "path": "v1/{+instance}:reportStatus",
            "httpMethod": "POST",
            "parameterOrder": ["instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
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
