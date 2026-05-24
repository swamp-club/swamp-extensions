// Auto-generated extension model for @swamp/gcp/compute/instancegroupmanagerresizerequests
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine InstanceGroupManagerResizeRequests.
 *
 * InstanceGroupManagerResizeRequest represents a request to create a number of VMs: either immediately or by queuing the request for the specified time. This resize request is nested under InstanceGroupManager and the VMs created by this request are added to the owning InstanceGroupManager.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.instanceGroupManagerResizeRequests.get",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resizeRequests/{resizeRequest}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
    "resizeRequest",
  ],
  "parameters": {
    "instanceGroupManager": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "resizeRequest": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.instanceGroupManagerResizeRequests.insert",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resizeRequests",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
  ],
  "parameters": {
    "instanceGroupManager": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.instanceGroupManagerResizeRequests.delete",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resizeRequests/{resizeRequest}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
    "resizeRequest",
  ],
  "parameters": {
    "instanceGroupManager": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "resizeRequest": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.instanceGroupManagerResizeRequests.list",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resizeRequests",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "instanceGroupManager": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of this resize request. The name must be 1-63 characters long, and comply withRFC1035.",
    ),
  requestedRunDuration: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  resizeBy: z.number().int().describe(
    "The number of instances to be created by this resize request. The group's target size will be increased by this number. This field cannot be used together with 'instances'.",
  ).optional(),
  status: z.object({
    error: z.object({
      errors: z.array(z.object({
        code: z.string().describe(
          "[Output Only] The error type identifier for this error.",
        ).optional(),
        errorDetails: z.array(z.unknown()).describe(
          "[Output Only] An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.",
        ).optional(),
        location: z.string().describe(
          "[Output Only] Indicates the field in the request that caused the error. This property is optional.",
        ).optional(),
        message: z.string().describe(
          "[Output Only] An optional, human-readable error message.",
        ).optional(),
      })).describe(
        "[Output Only] The array of errors encountered while processing this operation.",
      ).optional(),
    }).describe(
      "Output only. Fatal errors encountered during the queueing or provisioning phases of the ResizeRequest that caused the transition to the FAILED state. Contrary to the last_attempt errors, this field is final and errors are never removed from here, as the ResizeRequest is not going to retry.",
    ).optional(),
    lastAttempt: z.object({
      error: z.object({
        errors: z.array(z.object({
          code: z.unknown().describe(
            "[Output Only] The error type identifier for this error.",
          ).optional(),
          errorDetails: z.unknown().describe(
            "[Output Only] An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.",
          ).optional(),
          location: z.unknown().describe(
            "[Output Only] Indicates the field in the request that caused the error. This property is optional.",
          ).optional(),
          message: z.unknown().describe(
            "[Output Only] An optional, human-readable error message.",
          ).optional(),
        })).describe(
          "[Output Only] The array of errors encountered while processing this operation.",
        ).optional(),
      }).describe(
        "Output only. Errors that prevented the ResizeRequest to be fulfilled.",
      ).optional(),
    }).optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. The URL of a zone where the resize request is located. Populated only for zonal resize requests.",
  ).optional(),
  instanceGroupManager: z.string().describe(
    "The name of the managed instance group to which the resize request will be added. Name should conform to RFC1035 or be a resource ID.",
  ),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  requestedRunDuration: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  resizeBy: z.number().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  state: z.string().optional(),
  status: z.object({
    error: z.object({
      errors: z.array(z.object({
        code: z.string(),
        errorDetails: z.array(z.unknown()),
        location: z.string(),
        message: z.string(),
      })),
    }),
    lastAttempt: z.object({
      error: z.object({
        errors: z.array(z.object({
          code: z.unknown(),
          errorDetails: z.unknown(),
          location: z.unknown(),
          message: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of this resize request. The name must be 1-63 characters long, and comply withRFC1035.",
    ).optional(),
  requestedRunDuration: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  resizeBy: z.number().int().describe(
    "The number of instances to be created by this resize request. The group's target size will be increased by this number. This field cannot be used together with 'instances'.",
  ).optional(),
  status: z.object({
    error: z.object({
      errors: z.array(z.object({
        code: z.string().describe(
          "[Output Only] The error type identifier for this error.",
        ).optional(),
        errorDetails: z.array(z.unknown()).describe(
          "[Output Only] An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.",
        ).optional(),
        location: z.string().describe(
          "[Output Only] Indicates the field in the request that caused the error. This property is optional.",
        ).optional(),
        message: z.string().describe(
          "[Output Only] An optional, human-readable error message.",
        ).optional(),
      })).describe(
        "[Output Only] The array of errors encountered while processing this operation.",
      ).optional(),
    }).describe(
      "Output only. Fatal errors encountered during the queueing or provisioning phases of the ResizeRequest that caused the transition to the FAILED state. Contrary to the last_attempt errors, this field is final and errors are never removed from here, as the ResizeRequest is not going to retry.",
    ).optional(),
    lastAttempt: z.object({
      error: z.object({
        errors: z.array(z.object({
          code: z.unknown().describe(
            "[Output Only] The error type identifier for this error.",
          ).optional(),
          errorDetails: z.unknown().describe(
            "[Output Only] An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.",
          ).optional(),
          location: z.unknown().describe(
            "[Output Only] Indicates the field in the request that caused the error. This property is optional.",
          ).optional(),
          message: z.unknown().describe(
            "[Output Only] An optional, human-readable error message.",
          ).optional(),
        })).describe(
          "[Output Only] The array of errors encountered while processing this operation.",
        ).optional(),
      }).describe(
        "Output only. Errors that prevented the ResizeRequest to be fulfilled.",
      ).optional(),
    }).optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. The URL of a zone where the resize request is located. Populated only for zonal resize requests.",
  ).optional(),
  instanceGroupManager: z.string().describe(
    "The name of the managed instance group to which the resize request will be added. Name should conform to RFC1035 or be a resource ID.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine InstanceGroupManagerResizeRequests. Registered at `@swamp/gcp/compute/instancegroupmanagerresizerequests`. */
export const model = {
  type: "@swamp/gcp/compute/instancegroupmanagerresizerequests",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.07.1",
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
        "InstanceGroupManagerResizeRequest represents a request to create a number of ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instanceGroupManagerResizeRequests",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["instanceGroupManager"] !== undefined) {
          params["instanceGroupManager"] = String(g["instanceGroupManager"]);
        }
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["requestedRunDuration"] !== undefined) {
          body["requestedRunDuration"] = g["requestedRunDuration"];
        }
        if (g["resizeBy"] !== undefined) body["resizeBy"] = g["resizeBy"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["resizeRequest"] = String(g["name"]);
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
              "project": projectId,
              "zone": String(g["zone"] ?? ""),
              "instanceGroupManager": String(g["instanceGroupManager"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a instanceGroupManagerResizeRequests",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the instanceGroupManagerResizeRequests",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["instanceGroupManager"] !== undefined) {
          params["instanceGroupManager"] = String(g["instanceGroupManager"]);
        }
        params["resizeRequest"] = args.identifier;
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
      description: "Delete the instanceGroupManagerResizeRequests",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the instanceGroupManagerResizeRequests",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["instanceGroupManager"] !== undefined) {
          params["instanceGroupManager"] = String(g["instanceGroupManager"]);
        }
        params["resizeRequest"] = args.identifier;
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
      description: "Sync instanceGroupManagerResizeRequests state from GCP",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          if (g["instanceGroupManager"] !== undefined) {
            params["instanceGroupManager"] = String(g["instanceGroupManager"]);
          } else if (existing["instanceGroupManager"]) {
            params["instanceGroupManager"] = String(
              existing["instanceGroupManager"],
            );
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resizeRequest"] = identifier;
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
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["instanceGroupManager"] !== undefined) {
          params["instanceGroupManager"] = String(g["instanceGroupManager"]);
        }
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
        params["resizeRequest"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagerResizeRequests.cancel",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resizeRequests/{resizeRequest}/cancel",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "instanceGroupManager",
              "resizeRequest",
            ],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "resizeRequest": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
