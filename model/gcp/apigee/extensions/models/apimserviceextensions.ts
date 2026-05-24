// Auto-generated extension model for @swamp/gcp/apigee/apimserviceextensions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee ApimServiceExtensions.
 *
 * APIM Service Extension is a resource under an Apigee Organization that is used to create APIM Service Extension to route traffic to existing X instances.
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
  return `${parent}/apimServiceExtensions/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.apimServiceExtensions.get",
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
  "id": "apigee.organizations.apimServiceExtensions.create",
  "path": "v1/{+parent}/apimServiceExtensions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "apimServiceExtensionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.apimServiceExtensions.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "apigee.organizations.apimServiceExtensions.delete",
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
  "id": "apigee.organizations.apimServiceExtensions.list",
  "path": "v1/{+parent}/apimServiceExtensions",
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
  extensionProcessor: z.string().describe(
    "Required. Name of the proxy deployed in the Apigee X instance.",
  ).optional(),
  extensions: z.array(z.object({
    failOpen: z.boolean().describe(
      "Optional. Whether this request should fail open.",
    ).optional(),
    hostname: z.string().describe(
      "Required. One of the hostnames of Apigee EnvGroup where the proxy is deployed. This hostname (i.e FDQN) will be used to route traffic from the specified forwarding rule to the environment in Apigee X instance where the proxy is deployed for handling extension traffic. Format: ^([a-zA-Z0-9. _-])+$",
    ).optional(),
    matchCondition: z.string().describe(
      "Optional. Match Condition for CEL expression. Refer to https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference for more details.",
    ).optional(),
    name: z.string().describe(
      "Required. Name of the `LbTrafficExtension` resource. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number.",
    ).optional(),
    supportedEvents: z.array(
      z.enum([
        "SUPPORTED_EVENT_UNSPECIFIED",
        "REQUEST_HEADERS",
        "REQUEST_BODY",
        "RESPONSE_HEADERS",
        "RESPONSE_BODY",
        "REQUEST_TRAILERS",
        "RESPONSE_TRAILERS",
      ]),
    ).describe(
      "Optional. Supported events for the Service Extension. If not specified, all events are supported.",
    ).optional(),
  })).describe(
    "Optional. List of extensions that are part of the service extension. Refer to https://cloud.google.com/service-extensions/docs/quotas#limits for any limits.",
  ).optional(),
  lbForwardingRule: z.string().describe(
    "Required. Name of the Google Cloud LB forwarding rule. Format: projects/{project}/regions/{region}/forwardingRules/{forwarding_rule} projects/{project}/global/forwardingRules/{forwarding_rule}",
  ).optional(),
  name: z.string().describe(
    "Identifier. unique name of the APIM service extension. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number.",
  ).optional(),
  network: z.string().describe(
    "Required. The network where the forwarding rule is created. Format: projects/{project}/global/networks/{network}",
  ).optional(),
  networkConfigs: z.array(z.object({
    region: z.string().describe("Required. The region for the PSC NEG.")
      .optional(),
    subnet: z.string().describe(
      "Required. The subnet for the PSC NEG. Format: projects/{project}/regions/{region}/subnetworks/{subnet}",
    ).optional(),
  })).describe(
    "Required. List of network configurations for the APIM service extension.",
  ).optional(),
  apimServiceExtensionId: z.string().describe(
    "Optional. ID used to uniquely identify of the service extension. It must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  extensionProcessor: z.string().optional(),
  extensions: z.array(z.object({
    failOpen: z.boolean(),
    hostname: z.string(),
    matchCondition: z.string(),
    name: z.string(),
    supportedEvents: z.array(z.string()),
  })).optional(),
  lbForwardingRule: z.string().optional(),
  name: z.string(),
  network: z.string().optional(),
  networkConfigs: z.array(z.object({
    region: z.string(),
    subnet: z.string(),
  })).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  extensionProcessor: z.string().describe(
    "Required. Name of the proxy deployed in the Apigee X instance.",
  ).optional(),
  extensions: z.array(z.object({
    failOpen: z.boolean().describe(
      "Optional. Whether this request should fail open.",
    ).optional(),
    hostname: z.string().describe(
      "Required. One of the hostnames of Apigee EnvGroup where the proxy is deployed. This hostname (i.e FDQN) will be used to route traffic from the specified forwarding rule to the environment in Apigee X instance where the proxy is deployed for handling extension traffic. Format: ^([a-zA-Z0-9. _-])+$",
    ).optional(),
    matchCondition: z.string().describe(
      "Optional. Match Condition for CEL expression. Refer to https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference for more details.",
    ).optional(),
    name: z.string().describe(
      "Required. Name of the `LbTrafficExtension` resource. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number.",
    ).optional(),
    supportedEvents: z.array(
      z.enum([
        "SUPPORTED_EVENT_UNSPECIFIED",
        "REQUEST_HEADERS",
        "REQUEST_BODY",
        "RESPONSE_HEADERS",
        "RESPONSE_BODY",
        "REQUEST_TRAILERS",
        "RESPONSE_TRAILERS",
      ]),
    ).describe(
      "Optional. Supported events for the Service Extension. If not specified, all events are supported.",
    ).optional(),
  })).describe(
    "Optional. List of extensions that are part of the service extension. Refer to https://cloud.google.com/service-extensions/docs/quotas#limits for any limits.",
  ).optional(),
  lbForwardingRule: z.string().describe(
    "Required. Name of the Google Cloud LB forwarding rule. Format: projects/{project}/regions/{region}/forwardingRules/{forwarding_rule} projects/{project}/global/forwardingRules/{forwarding_rule}",
  ).optional(),
  name: z.string().describe(
    "Identifier. unique name of the APIM service extension. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number.",
  ).optional(),
  network: z.string().describe(
    "Required. The network where the forwarding rule is created. Format: projects/{project}/global/networks/{network}",
  ).optional(),
  networkConfigs: z.array(z.object({
    region: z.string().describe("Required. The region for the PSC NEG.")
      .optional(),
    subnet: z.string().describe(
      "Required. The subnet for the PSC NEG. Format: projects/{project}/regions/{region}/subnetworks/{subnet}",
    ).optional(),
  })).describe(
    "Required. List of network configurations for the APIM service extension.",
  ).optional(),
  apimServiceExtensionId: z.string().describe(
    "Optional. ID used to uniquely identify of the service extension. It must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee ApimServiceExtensions. Registered at `@swamp/gcp/apigee/apimserviceextensions`. */
export const model = {
  type: "@swamp/gcp/apigee/apimserviceextensions",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "APIM Service Extension is a resource under an Apigee Organization that is use...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apimServiceExtensions",
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
        if (g["extensionProcessor"] !== undefined) {
          body["extensionProcessor"] = g["extensionProcessor"];
        }
        if (g["extensions"] !== undefined) body["extensions"] = g["extensions"];
        if (g["lbForwardingRule"] !== undefined) {
          body["lbForwardingRule"] = g["lbForwardingRule"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["networkConfigs"] !== undefined) {
          body["networkConfigs"] = g["networkConfigs"];
        }
        if (g["apimServiceExtensionId"] !== undefined) {
          body["apimServiceExtensionId"] = g["apimServiceExtensionId"];
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
      description: "Get a apimServiceExtensions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the apimServiceExtensions",
        ),
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
      description: "Update apimServiceExtensions attributes",
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
        if (g["extensionProcessor"] !== undefined) {
          body["extensionProcessor"] = g["extensionProcessor"];
        }
        if (g["extensions"] !== undefined) body["extensions"] = g["extensions"];
        if (g["lbForwardingRule"] !== undefined) {
          body["lbForwardingRule"] = g["lbForwardingRule"];
        }
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["networkConfigs"] !== undefined) {
          body["networkConfigs"] = g["networkConfigs"];
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
      description: "Delete the apimServiceExtensions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the apimServiceExtensions",
        ),
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
      description: "Sync apimServiceExtensions state from GCP",
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
