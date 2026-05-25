// Auto-generated extension model for @swamp/gcp/apigee/environments-targetservers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Environments.Targetservers.
 *
 * TargetServer configuration. TargetServers are used to decouple a proxy TargetEndpoint HTTPTargetConnections from concrete URLs for backend services.
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
  return `${parent}/targetservers/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.environments.targetservers.get",
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
  "id": "apigee.organizations.environments.targetservers.create",
  "path": "v1/{+parent}/targetservers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "name": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "apigee.organizations.environments.targetservers.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.environments.targetservers.delete",
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
  description: z.string().describe(
    "Optional. A human-readable description of this TargetServer.",
  ).optional(),
  host: z.string().describe(
    "Required. The host name this target connects to. Value must be a valid hostname as described by RFC-1123.",
  ).optional(),
  isEnabled: z.boolean().describe(
    "Optional. Enabling/disabling a TargetServer is useful when TargetServers are used in load balancing configurations, and one or more TargetServers need to taken out of rotation periodically. Defaults to true.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource id of this target server. Values must match the regular expression",
  ).optional(),
  port: z.number().int().describe(
    "Required. The port number this target connects to on the given host. Value must be between 1 and 65535, inclusive.",
  ).optional(),
  protocol: z.enum([
    "PROTOCOL_UNSPECIFIED",
    "HTTP",
    "HTTP2",
    "GRPC_TARGET",
    "GRPC",
    "EXTERNAL_CALLOUT",
  ]).describe("Immutable. The protocol used by this TargetServer.").optional(),
  sSLInfo: z.object({
    ciphers: z.array(z.string()).describe(
      "The SSL/TLS cipher suites to be used. For programmable proxies, it must be one of the cipher suite names listed in: http://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#ciphersuites. For configurable proxies, it must follow the configuration specified in: https://commondatastorage.googleapis.com/chromium-boringssl-docs/ssl.h.html#Cipher-suite-configuration. This setting has no effect for configurable proxies when negotiating TLS 1.3.",
    ).optional(),
    clientAuthEnabled: z.boolean().describe("Optional. Enables two-way TLS.")
      .optional(),
    commonName: z.object({
      value: z.string().describe(
        "The TLS Common Name string of the certificate.",
      ).optional(),
      wildcardMatch: z.boolean().describe(
        "Indicates whether the cert should be matched against as a wildcard cert.",
      ).optional(),
    }).optional(),
    enabled: z.boolean().describe(
      "Required. Enables TLS. If false, neither one-way nor two-way TLS will be enabled.",
    ).optional(),
    enforce: z.boolean().describe("TLS is strictly enforced.").optional(),
    ignoreValidationErrors: z.boolean().describe(
      "If true, Edge ignores TLS certificate errors. Valid when configuring TLS for target servers and target endpoints, and when configuring virtual hosts that use 2-way TLS. When used with a target endpoint/target server, if the backend system uses SNI and returns a cert with a subject Distinguished Name (DN) that does not match the hostname, there is no way to ignore the error and the connection fails.",
    ).optional(),
    keyAlias: z.string().describe(
      "Required if `client_auth_enabled` is true. The resource ID for the alias containing the private key and cert.",
    ).optional(),
    keyStore: z.string().describe(
      "Required if `client_auth_enabled` is true. The resource ID of the keystore.",
    ).optional(),
    protocols: z.array(z.string()).describe("The TLS versioins to be used.")
      .optional(),
    trustStore: z.string().describe("The resource ID of the truststore.")
      .optional(),
  }).describe(
    "TLS configuration information for virtual hosts and TargetServers.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  host: z.string().optional(),
  isEnabled: z.boolean().optional(),
  name: z.string(),
  port: z.number().optional(),
  protocol: z.string().optional(),
  sSLInfo: z.object({
    ciphers: z.array(z.string()),
    clientAuthEnabled: z.boolean(),
    commonName: z.object({
      value: z.string(),
      wildcardMatch: z.boolean(),
    }),
    enabled: z.boolean(),
    enforce: z.boolean(),
    ignoreValidationErrors: z.boolean(),
    keyAlias: z.string(),
    keyStore: z.string(),
    protocols: z.array(z.string()),
    trustStore: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. A human-readable description of this TargetServer.",
  ).optional(),
  host: z.string().describe(
    "Required. The host name this target connects to. Value must be a valid hostname as described by RFC-1123.",
  ).optional(),
  isEnabled: z.boolean().describe(
    "Optional. Enabling/disabling a TargetServer is useful when TargetServers are used in load balancing configurations, and one or more TargetServers need to taken out of rotation periodically. Defaults to true.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource id of this target server. Values must match the regular expression",
  ).optional(),
  port: z.number().int().describe(
    "Required. The port number this target connects to on the given host. Value must be between 1 and 65535, inclusive.",
  ).optional(),
  protocol: z.enum([
    "PROTOCOL_UNSPECIFIED",
    "HTTP",
    "HTTP2",
    "GRPC_TARGET",
    "GRPC",
    "EXTERNAL_CALLOUT",
  ]).describe("Immutable. The protocol used by this TargetServer.").optional(),
  sSLInfo: z.object({
    ciphers: z.array(z.string()).describe(
      "The SSL/TLS cipher suites to be used. For programmable proxies, it must be one of the cipher suite names listed in: http://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#ciphersuites. For configurable proxies, it must follow the configuration specified in: https://commondatastorage.googleapis.com/chromium-boringssl-docs/ssl.h.html#Cipher-suite-configuration. This setting has no effect for configurable proxies when negotiating TLS 1.3.",
    ).optional(),
    clientAuthEnabled: z.boolean().describe("Optional. Enables two-way TLS.")
      .optional(),
    commonName: z.object({
      value: z.string().describe(
        "The TLS Common Name string of the certificate.",
      ).optional(),
      wildcardMatch: z.boolean().describe(
        "Indicates whether the cert should be matched against as a wildcard cert.",
      ).optional(),
    }).optional(),
    enabled: z.boolean().describe(
      "Required. Enables TLS. If false, neither one-way nor two-way TLS will be enabled.",
    ).optional(),
    enforce: z.boolean().describe("TLS is strictly enforced.").optional(),
    ignoreValidationErrors: z.boolean().describe(
      "If true, Edge ignores TLS certificate errors. Valid when configuring TLS for target servers and target endpoints, and when configuring virtual hosts that use 2-way TLS. When used with a target endpoint/target server, if the backend system uses SNI and returns a cert with a subject Distinguished Name (DN) that does not match the hostname, there is no way to ignore the error and the connection fails.",
    ).optional(),
    keyAlias: z.string().describe(
      "Required if `client_auth_enabled` is true. The resource ID for the alias containing the private key and cert.",
    ).optional(),
    keyStore: z.string().describe(
      "Required if `client_auth_enabled` is true. The resource ID of the keystore.",
    ).optional(),
    protocols: z.array(z.string()).describe("The TLS versioins to be used.")
      .optional(),
    trustStore: z.string().describe("The resource ID of the truststore.")
      .optional(),
  }).describe(
    "TLS configuration information for virtual hosts and TargetServers.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Environments.Targetservers. Registered at `@swamp/gcp/apigee/environments-targetservers`. */
export const model = {
  type: "@swamp/gcp/apigee/environments-targetservers",
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
      description:
        "TargetServer configuration. TargetServers are used to decouple a proxy Target...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a targetservers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["isEnabled"] !== undefined) body["isEnabled"] = g["isEnabled"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["port"] !== undefined) body["port"] = g["port"];
        if (g["protocol"] !== undefined) body["protocol"] = g["protocol"];
        if (g["sSLInfo"] !== undefined) body["sSLInfo"] = g["sSLInfo"];
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
      description: "Get a targetservers",
      arguments: z.object({
        identifier: z.string().describe("The name of the targetservers"),
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
      description: "Update targetservers attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["isEnabled"] !== undefined) body["isEnabled"] = g["isEnabled"];
        if (g["port"] !== undefined) body["port"] = g["port"];
        if (g["sSLInfo"] !== undefined) body["sSLInfo"] = g["sSLInfo"];
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
          UPDATE_CONFIG,
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
      description: "Delete the targetservers",
      arguments: z.object({
        identifier: z.string().describe("The name of the targetservers"),
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
      description: "Sync targetservers state from GCP",
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
