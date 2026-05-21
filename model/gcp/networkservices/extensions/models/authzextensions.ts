// Auto-generated extension model for @swamp/gcp/networkservices/authzextensions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services AuthzExtensions.
 *
 * `AuthzExtension` is a resource that allows traffic forwarding to a callout backend service to make an authorization decision.
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
  return `${parent}/authzExtensions/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.authzExtensions.get",
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
  "id": "networkservices.projects.locations.authzExtensions.create",
  "path": "v1/{+parent}/authzExtensions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "authzExtensionId": {
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

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.authzExtensions.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networkservices.projects.locations.authzExtensions.delete",
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
  "id": "networkservices.projects.locations.authzExtensions.list",
  "path": "v1/{+parent}/authzExtensions",
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
  authority: z.string().describe(
    "Optional. The `:authority` header in the gRPC request sent from Envoy to the extension service. It is required when the `service` field points to a backend service or a wasm plugin.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  failOpen: z.boolean().describe(
    "Optional. Determines how the proxy behaves if the call to the extension fails or times out. When set to `TRUE`, request or response processing continues without error. Any subsequent extensions in the extension chain are also executed. When set to `FALSE` or the default setting of `FALSE` is used, one of the following happens: * If response headers have not been delivered to the downstream client, a generic 500 error is returned to the client. The error response can be tailored by configuring a custom error response in the load balancer. * If response headers have been delivered, then the HTTP stream to the downstream client is reset.",
  ).optional(),
  forwardAttributes: z.array(z.string()).describe(
    "Optional. List of the Envoy attributes to forward to the extension server. The attributes provided here are included as part of the `ProcessingRequest.attributes` field (of type `map`), where the keys are the attribute names. Refer to the [documentation](https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference#attributes) for the names of attributes that can be forwarded. If omitted, no attributes are sent. Each element is a string indicating the attribute name.",
  ).optional(),
  forwardHeaders: z.array(z.string()).describe(
    "Optional. List of the HTTP headers to forward to the extension (from the client). If omitted, all headers are sent. Each element is a string indicating the header name.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `AuthzExtension` resource. The format must comply with [the requirements for labels](/compute/docs/labeling-resources#requirements) for Google Cloud resources.",
  ).optional(),
  loadBalancingScheme: z.enum([
    "LOAD_BALANCING_SCHEME_UNSPECIFIED",
    "INTERNAL_MANAGED",
    "EXTERNAL_MANAGED",
  ]).describe(
    "Optional. All backend services and forwarding rules referenced by this extension must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. Can be omitted for AuthzExtensions that do not reference a backend service. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. The metadata is available under the namespace `com.google.authz_extension.`. The following variables are supported in the metadata Struct: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Name of the `AuthzExtension` resource in the following format: `projects/{project}/locations/{location}/authzExtensions/{authz_extension}`.",
  ).optional(),
  service: z.string().describe(
    "Required. The reference to the service that runs the extension. To configure a callout extension, `service` must be a fully-qualified reference to a [backend service](https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) in the format: `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/backendServices/{backendService}` or `https://www.googleapis.com/compute/v1/projects/{project}/global/backendServices/{backendService}`.",
  ).optional(),
  timeout: z.string().describe(
    "Required. Specifies the timeout for each individual message on the stream. The timeout must be between 10-10000 milliseconds.",
  ).optional(),
  wireFormat: z.enum([
    "WIRE_FORMAT_UNSPECIFIED",
    "EXT_PROC_GRPC",
    "EXT_AUTHZ_GRPC",
  ]).describe(
    "Optional. The format of communication supported by the callout extension. This field is supported only for regional `AuthzExtension` resources. If not specified, the default value `EXT_PROC_GRPC` is used. Global `AuthzExtension` resources use the `EXT_PROC_GRPC` wire format.",
  ).optional(),
  authzExtensionId: z.string().describe(
    "Required. User-provided ID of the `AuthzExtension` resource to be created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authority: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  failOpen: z.boolean().optional(),
  forwardAttributes: z.array(z.string()).optional(),
  forwardHeaders: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  loadBalancingScheme: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  service: z.string().optional(),
  timeout: z.string().optional(),
  updateTime: z.string().optional(),
  wireFormat: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  authority: z.string().describe(
    "Optional. The `:authority` header in the gRPC request sent from Envoy to the extension service. It is required when the `service` field points to a backend service or a wasm plugin.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  failOpen: z.boolean().describe(
    "Optional. Determines how the proxy behaves if the call to the extension fails or times out. When set to `TRUE`, request or response processing continues without error. Any subsequent extensions in the extension chain are also executed. When set to `FALSE` or the default setting of `FALSE` is used, one of the following happens: * If response headers have not been delivered to the downstream client, a generic 500 error is returned to the client. The error response can be tailored by configuring a custom error response in the load balancer. * If response headers have been delivered, then the HTTP stream to the downstream client is reset.",
  ).optional(),
  forwardAttributes: z.array(z.string()).describe(
    "Optional. List of the Envoy attributes to forward to the extension server. The attributes provided here are included as part of the `ProcessingRequest.attributes` field (of type `map`), where the keys are the attribute names. Refer to the [documentation](https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference#attributes) for the names of attributes that can be forwarded. If omitted, no attributes are sent. Each element is a string indicating the attribute name.",
  ).optional(),
  forwardHeaders: z.array(z.string()).describe(
    "Optional. List of the HTTP headers to forward to the extension (from the client). If omitted, all headers are sent. Each element is a string indicating the header name.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `AuthzExtension` resource. The format must comply with [the requirements for labels](/compute/docs/labeling-resources#requirements) for Google Cloud resources.",
  ).optional(),
  loadBalancingScheme: z.enum([
    "LOAD_BALANCING_SCHEME_UNSPECIFIED",
    "INTERNAL_MANAGED",
    "EXTERNAL_MANAGED",
  ]).describe(
    "Optional. All backend services and forwarding rules referenced by this extension must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. Can be omitted for AuthzExtensions that do not reference a backend service. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. The metadata is available under the namespace `com.google.authz_extension.`. The following variables are supported in the metadata Struct: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Name of the `AuthzExtension` resource in the following format: `projects/{project}/locations/{location}/authzExtensions/{authz_extension}`.",
  ).optional(),
  service: z.string().describe(
    "Required. The reference to the service that runs the extension. To configure a callout extension, `service` must be a fully-qualified reference to a [backend service](https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) in the format: `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/backendServices/{backendService}` or `https://www.googleapis.com/compute/v1/projects/{project}/global/backendServices/{backendService}`.",
  ).optional(),
  timeout: z.string().describe(
    "Required. Specifies the timeout for each individual message on the stream. The timeout must be between 10-10000 milliseconds.",
  ).optional(),
  wireFormat: z.enum([
    "WIRE_FORMAT_UNSPECIFIED",
    "EXT_PROC_GRPC",
    "EXT_AUTHZ_GRPC",
  ]).describe(
    "Optional. The format of communication supported by the callout extension. This field is supported only for regional `AuthzExtension` resources. If not specified, the default value `EXT_PROC_GRPC` is used. Global `AuthzExtension` resources use the `EXT_PROC_GRPC` wire format.",
  ).optional(),
  authzExtensionId: z.string().describe(
    "Required. User-provided ID of the `AuthzExtension` resource to be created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Services AuthzExtensions. Registered at `@swamp/gcp/networkservices/authzextensions`. */
export const model = {
  type: "@swamp/gcp/networkservices/authzextensions",
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
        "`AuthzExtension` is a resource that allows traffic forwarding to a callout ba...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a authzExtensions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["authority"] !== undefined) body["authority"] = g["authority"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failOpen"] !== undefined) body["failOpen"] = g["failOpen"];
        if (g["forwardAttributes"] !== undefined) {
          body["forwardAttributes"] = g["forwardAttributes"];
        }
        if (g["forwardHeaders"] !== undefined) {
          body["forwardHeaders"] = g["forwardHeaders"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loadBalancingScheme"] !== undefined) {
          body["loadBalancingScheme"] = g["loadBalancingScheme"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["service"] !== undefined) body["service"] = g["service"];
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["wireFormat"] !== undefined) body["wireFormat"] = g["wireFormat"];
        if (g["authzExtensionId"] !== undefined) {
          body["authzExtensionId"] = g["authzExtensionId"];
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
      description: "Get a authzExtensions",
      arguments: z.object({
        identifier: z.string().describe("The name of the authzExtensions"),
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
      description: "Update authzExtensions attributes",
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
        if (g["authority"] !== undefined) body["authority"] = g["authority"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failOpen"] !== undefined) body["failOpen"] = g["failOpen"];
        if (g["forwardAttributes"] !== undefined) {
          body["forwardAttributes"] = g["forwardAttributes"];
        }
        if (g["forwardHeaders"] !== undefined) {
          body["forwardHeaders"] = g["forwardHeaders"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loadBalancingScheme"] !== undefined) {
          body["loadBalancingScheme"] = g["loadBalancingScheme"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["service"] !== undefined) body["service"] = g["service"];
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["wireFormat"] !== undefined) body["wireFormat"] = g["wireFormat"];
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
      description: "Delete the authzExtensions",
      arguments: z.object({
        identifier: z.string().describe("The name of the authzExtensions"),
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
      description: "Sync authzExtensions state from GCP",
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
