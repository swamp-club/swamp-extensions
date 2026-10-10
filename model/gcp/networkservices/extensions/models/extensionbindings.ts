// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/networkservices/extensionbindings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services ExtensionBindings.
 *
 * `ExtensionBinding` is a resource representing the attachment of an extension to a service.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/extensionBindings/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.extensionBindings.get",
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
  "id": "networkservices.projects.locations.extensionBindings.create",
  "path": "v1/{+parent}/extensionBindings",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "extensionBindingId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.extensionBindings.patch",
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
  "id": "networkservices.projects.locations.extensionBindings.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "networkservices.projects.locations.extensionBindings.list",
  "path": "v1/{+parent}/extensionBindings",
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
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  failOpen: z.boolean().describe(
    "Optional. Determines the behavior of the extension binding when the call to the extension fails or times out. Default value is `FALSE`. When set to `TRUE`, failures of the extension are silently ignored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `ExtensionBinding` resource. The format must comply with [the following requirements](https://cloud.google.com/compute/docs/labeling-resources#requirements).",
  ).optional(),
  matchConditions: z.array(z.object({
    to: z.object({
      destination: z.object({
        headerSet: z.object({
          headers: z.unknown().describe(
            "Required. A list of HTTP headers to match against. If multiple header matches are provided, they are evaluated as an AND, meaning that all header matches must match for the request to match. Limited to 10 headers.",
          ).optional(),
        }).describe(
          "Optional. A set of HTTP headers to match against. If not specified, requests with any headers are matched.",
        ).optional(),
        hosts: z.array(z.unknown()).describe(
          "Optional. A list of HTTP Hosts to match against. Limited to 10 hosts. If not specified, any host is allowed. If specified, a match occurs if any of the hosts matches the host value in the request.",
        ).optional(),
        paths: z.array(z.unknown()).describe(
          "Optional. A list of paths to match against. Limited to 10 paths. If not specified, any path is allowed. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "Optional. A list of non-empty strings whose value is matched against the resource to which a request is sent (e.g., an Agent in AiApplication). If not specified, any resource is allowed. If specified, a match occurs if any of the resources matches the resource value in the request. Limited to 5 resources. When matching against resources in the AgentRegistry, use the URNs of the registry resources.",
        ).optional(),
      }).describe(
        "Optional. Describes properties of the destination of a request. A request matches the destination only if it matches every field that is set. Fields that are not set are always considered a match. For example, if only `hosts` and `paths` are set, a request matches when any host matches and any path matches. At least one of `destination` or `not_destination` must be specified.",
      ).optional(),
      notDestination: z.object({
        headerSet: z.object({
          headers: z.unknown().describe(
            "Required. A list of HTTP headers to match against. If multiple header matches are provided, they are evaluated as an AND, meaning that all header matches must match for the request to match. Limited to 10 headers.",
          ).optional(),
        }).describe(
          "Optional. A set of HTTP headers to match against. If not specified, requests with any headers are matched.",
        ).optional(),
        hosts: z.array(z.unknown()).describe(
          "Optional. A list of HTTP Hosts to match against. Limited to 10 hosts. If not specified, any host is allowed. If specified, a match occurs if any of the hosts matches the host value in the request.",
        ).optional(),
        paths: z.array(z.unknown()).describe(
          "Optional. A list of paths to match against. Limited to 10 paths. If not specified, any path is allowed. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "Optional. A list of non-empty strings whose value is matched against the resource to which a request is sent (e.g., an Agent in AiApplication). If not specified, any resource is allowed. If specified, a match occurs if any of the resources matches the resource value in the request. Limited to 5 resources. When matching against resources in the AgentRegistry, use the URNs of the registry resources.",
        ).optional(),
      }).describe(
        "Optional. Describes the negated properties of the request destination. Extension will not be invoked on requests that match the criteria specified in this field. At least one of destination or not_destination must be specified.",
      ).optional(),
    }).describe(
      "Optional. Describes properties of a destination of a request. If specified, the extension will only be invoked on requests to destinations that match the specified criteria.",
    ).optional(),
  })).describe(
    "Optional. A list of match conditions to evaluate against the incoming request. The extension is invoked if the request matches at least one condition, or if no match conditions are specified. A request matches a condition only if it matches every field that is set in that condition. Limited to 5 conditions.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `ExtensionBinding` resource in the following format: `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`.",
  ).optional(),
  priority: z.number().int().describe(
    "Optional. Priority of the extension binding. Lower numbers indicate higher priority. The priority determines the order in which extension bindings are applied to a request.",
  ).optional(),
  producerExtension: z.string().describe(
    "Required. The name of the extension that this binding should attach to target resources. Format: For Google-provided extensions, specify the service endpoint, for example `modelarmor.us-central1.rep.googleapis.com`.",
  ).optional(),
  producerMetadata: z.record(z.string(), z.string()).describe(
    "Optional. Additional metadata that should be passed to the attached extension with each request. This field is subject to the following limitations: * The total size of the metadata must be less than 1 KiB. * The total number of keys must be less than 16. * The length of each key must be less than 64 characters. * The length of each value must be less than 1024 characters.",
  ).optional(),
  target: z.object({
    resources: z.array(z.string()).describe(
      "Optional. The references to the target resources to which this binding should attach. Exactly one of `resources` or `scope` must be set. For AI Application resources, specify the full resource name in the format: `projects/{project}/locations/{location}/applications/{application}`. Limited to 1 resource.",
    ).optional(),
    scope: z.object({
      parent: z.string().describe(
        "Required. The parent resource that defines the scope, in the format `projects/{project_number}`. When the scope is a project, the binding applies to the resources that meet all of the following conditions: * The resource belongs to the specified project. * The resource is in the same location as the `ExtensionBinding`. * The resource type is listed in `resource_types`.",
      ).optional(),
      resourceTypes: z.array(
        z.enum([
          "RESOURCE_TYPE_UNSPECIFIED",
          "AI_APPLICATION",
          "AGENT_GATEWAY",
        ]),
      ).describe(
        "Required. The types of resources to which the binding should attach. Limited to 1 resource type.",
      ).optional(),
    }).describe(
      "Optional. Specifies the scope of resources to which this binding should attach. Exactly one of `resources` or `scope` must be set.",
    ).optional(),
  }).describe(
    "Required. Specifies a target to which this `ExtensionBinding` should be attached.",
  ).optional(),
  extensionBindingId: z.string().describe(
    "Required. Short name of the `ExtensionBinding` resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  failOpen: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  matchConditions: z.array(z.object({
    to: z.object({
      destination: z.object({
        headerSet: z.object({
          headers: z.unknown(),
        }),
        hosts: z.array(z.unknown()),
        paths: z.array(z.unknown()),
        resources: z.array(z.unknown()),
      }),
      notDestination: z.object({
        headerSet: z.object({
          headers: z.unknown(),
        }),
        hosts: z.array(z.unknown()),
        paths: z.array(z.unknown()),
        resources: z.array(z.unknown()),
      }),
    }),
  })).optional(),
  name: z.string(),
  priority: z.number().optional(),
  producerExtension: z.string().optional(),
  producerMetadata: z.record(z.string(), z.unknown()).optional(),
  target: z.object({
    resources: z.array(z.string()),
    scope: z.object({
      parent: z.string(),
      resourceTypes: z.array(z.string()),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  failOpen: z.boolean().describe(
    "Optional. Determines the behavior of the extension binding when the call to the extension fails or times out. Default value is `FALSE`. When set to `TRUE`, failures of the extension are silently ignored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `ExtensionBinding` resource. The format must comply with [the following requirements](https://cloud.google.com/compute/docs/labeling-resources#requirements).",
  ).optional(),
  matchConditions: z.array(z.object({
    to: z.object({
      destination: z.object({
        headerSet: z.object({
          headers: z.unknown().describe(
            "Required. A list of HTTP headers to match against. If multiple header matches are provided, they are evaluated as an AND, meaning that all header matches must match for the request to match. Limited to 10 headers.",
          ).optional(),
        }).describe(
          "Optional. A set of HTTP headers to match against. If not specified, requests with any headers are matched.",
        ).optional(),
        hosts: z.array(z.unknown()).describe(
          "Optional. A list of HTTP Hosts to match against. Limited to 10 hosts. If not specified, any host is allowed. If specified, a match occurs if any of the hosts matches the host value in the request.",
        ).optional(),
        paths: z.array(z.unknown()).describe(
          "Optional. A list of paths to match against. Limited to 10 paths. If not specified, any path is allowed. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "Optional. A list of non-empty strings whose value is matched against the resource to which a request is sent (e.g., an Agent in AiApplication). If not specified, any resource is allowed. If specified, a match occurs if any of the resources matches the resource value in the request. Limited to 5 resources. When matching against resources in the AgentRegistry, use the URNs of the registry resources.",
        ).optional(),
      }).describe(
        "Optional. Describes properties of the destination of a request. A request matches the destination only if it matches every field that is set. Fields that are not set are always considered a match. For example, if only `hosts` and `paths` are set, a request matches when any host matches and any path matches. At least one of `destination` or `not_destination` must be specified.",
      ).optional(),
      notDestination: z.object({
        headerSet: z.object({
          headers: z.unknown().describe(
            "Required. A list of HTTP headers to match against. If multiple header matches are provided, they are evaluated as an AND, meaning that all header matches must match for the request to match. Limited to 10 headers.",
          ).optional(),
        }).describe(
          "Optional. A set of HTTP headers to match against. If not specified, requests with any headers are matched.",
        ).optional(),
        hosts: z.array(z.unknown()).describe(
          "Optional. A list of HTTP Hosts to match against. Limited to 10 hosts. If not specified, any host is allowed. If specified, a match occurs if any of the hosts matches the host value in the request.",
        ).optional(),
        paths: z.array(z.unknown()).describe(
          "Optional. A list of paths to match against. Limited to 10 paths. If not specified, any path is allowed. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "Optional. A list of non-empty strings whose value is matched against the resource to which a request is sent (e.g., an Agent in AiApplication). If not specified, any resource is allowed. If specified, a match occurs if any of the resources matches the resource value in the request. Limited to 5 resources. When matching against resources in the AgentRegistry, use the URNs of the registry resources.",
        ).optional(),
      }).describe(
        "Optional. Describes the negated properties of the request destination. Extension will not be invoked on requests that match the criteria specified in this field. At least one of destination or not_destination must be specified.",
      ).optional(),
    }).describe(
      "Optional. Describes properties of a destination of a request. If specified, the extension will only be invoked on requests to destinations that match the specified criteria.",
    ).optional(),
  })).describe(
    "Optional. A list of match conditions to evaluate against the incoming request. The extension is invoked if the request matches at least one condition, or if no match conditions are specified. A request matches a condition only if it matches every field that is set in that condition. Limited to 5 conditions.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `ExtensionBinding` resource in the following format: `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`.",
  ).optional(),
  priority: z.number().int().describe(
    "Optional. Priority of the extension binding. Lower numbers indicate higher priority. The priority determines the order in which extension bindings are applied to a request.",
  ).optional(),
  producerExtension: z.string().describe(
    "Required. The name of the extension that this binding should attach to target resources. Format: For Google-provided extensions, specify the service endpoint, for example `modelarmor.us-central1.rep.googleapis.com`.",
  ).optional(),
  producerMetadata: z.record(z.string(), z.string()).describe(
    "Optional. Additional metadata that should be passed to the attached extension with each request. This field is subject to the following limitations: * The total size of the metadata must be less than 1 KiB. * The total number of keys must be less than 16. * The length of each key must be less than 64 characters. * The length of each value must be less than 1024 characters.",
  ).optional(),
  target: z.object({
    resources: z.array(z.string()).describe(
      "Optional. The references to the target resources to which this binding should attach. Exactly one of `resources` or `scope` must be set. For AI Application resources, specify the full resource name in the format: `projects/{project}/locations/{location}/applications/{application}`. Limited to 1 resource.",
    ).optional(),
    scope: z.object({
      parent: z.string().describe(
        "Required. The parent resource that defines the scope, in the format `projects/{project_number}`. When the scope is a project, the binding applies to the resources that meet all of the following conditions: * The resource belongs to the specified project. * The resource is in the same location as the `ExtensionBinding`. * The resource type is listed in `resource_types`.",
      ).optional(),
      resourceTypes: z.array(
        z.enum([
          "RESOURCE_TYPE_UNSPECIFIED",
          "AI_APPLICATION",
          "AGENT_GATEWAY",
        ]),
      ).describe(
        "Required. The types of resources to which the binding should attach. Limited to 1 resource type.",
      ).optional(),
    }).describe(
      "Optional. Specifies the scope of resources to which this binding should attach. Exactly one of `resources` or `scope` must be set.",
    ).optional(),
  }).describe(
    "Required. Specifies a target to which this `ExtensionBinding` should be attached.",
  ).optional(),
  extensionBindingId: z.string().describe(
    "Required. Short name of the `ExtensionBinding` resource to be created.",
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

/** Swamp extension model for Google Cloud Network Services ExtensionBindings. Registered at `@swamp/gcp/networkservices/extensionbindings`. */
export const model = {
  type: "@swamp/gcp/networkservices/extensionbindings",
  version: "2026.10.09.1",
  upgrades: [
    {
      toVersion: "2026.08.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "`ExtensionBinding` is a resource representing the attachment of an extension ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a extensionBindings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failOpen"] !== undefined) body["failOpen"] = g["failOpen"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["matchConditions"] !== undefined) {
          body["matchConditions"] = g["matchConditions"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["producerExtension"] !== undefined) {
          body["producerExtension"] = g["producerExtension"];
        }
        if (g["producerMetadata"] !== undefined) {
          body["producerMetadata"] = g["producerMetadata"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["extensionBindingId"] !== undefined) {
          params["extensionBindingId"] = String(g["extensionBindingId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a extensionBindings",
      arguments: z.object({
        identifier: z.string().describe("The name of the extensionBindings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update extensionBindings attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific extensionBindings by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failOpen"] !== undefined) body["failOpen"] = g["failOpen"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["matchConditions"] !== undefined) {
          body["matchConditions"] = g["matchConditions"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["producerExtension"] !== undefined) {
          body["producerExtension"] = g["producerExtension"];
        }
        if (g["producerMetadata"] !== undefined) {
          body["producerMetadata"] = g["producerMetadata"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
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
      description: "Delete the extensionBindings",
      arguments: z.object({
        identifier: z.string().describe("The name of the extensionBindings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync extensionBindings state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific extensionBindings by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List extensionBindings resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of `ExtensionBinding` resources to return per call.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "extensionBindings",
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
