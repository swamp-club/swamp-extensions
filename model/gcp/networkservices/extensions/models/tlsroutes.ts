// Auto-generated extension model for @swamp/gcp/networkservices/tlsroutes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services TlsRoutes.
 *
 * TlsRoute defines how traffic should be routed based on SNI and other matching L3 attributes.
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
  return `${parent}/tlsRoutes/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.tlsRoutes.get",
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
  "id": "networkservices.projects.locations.tlsRoutes.create",
  "path": "v1/{+parent}/tlsRoutes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "tlsRouteId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.tlsRoutes.patch",
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
  "id": "networkservices.projects.locations.tlsRoutes.delete",
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
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  gateways: z.array(z.string()).describe(
    "Optional. Gateways defines a list of gateways this TlsRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/`",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the TlsRoute resource.",
  ).optional(),
  meshes: z.array(z.string()).describe(
    "Optional. Meshes defines a list of meshes this TlsRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the TlsRoute resource. It matches pattern `projects/*/locations/*/tlsRoutes/tls_route_name>`.",
  ).optional(),
  rules: z.array(z.object({
    action: z.object({
      destinations: z.array(z.object({
        serviceName: z.unknown().describe(
          "Required. The URL of a BackendService to route traffic to.",
        ).optional(),
        weight: z.unknown().describe(
          "Optional. Specifies the proportion of requests forwarded to the backend referenced by the service_name field. This is computed as: - weight/Sum(weights in destinations) Weights in all destinations does not need to sum up to 100.",
        ).optional(),
      })).describe(
        "Required. The destination services to which traffic should be forwarded. At least one destination service is required.",
      ).optional(),
      idleTimeout: z.string().describe(
        "Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled.",
      ).optional(),
    }).describe(
      "The specifications for routing traffic and applying associated policies.",
    ).optional(),
    matches: z.array(z.object({
      alpn: z.array(z.unknown()).describe(
        'Optional. ALPN (Application-Layer Protocol Negotiation) to match against. Examples: "http/1.1", "h2". At least one of sni_host and alpn is required. Up to 5 alpns across all matches can be set.',
      ).optional(),
      sniHost: z.array(z.unknown()).describe(
        "Optional. SNI (server name indicator) to match against. SNI will be matched against all wildcard domains, i.e. `www.example.com` will be first matched against `www.example.com`, then `*.example.com`, then `*.com.` Partial wildcards are not supported, and values like *w.example.com are invalid. At least one of sni_host and alpn is required. Up to 100 sni hosts across all matches can be set.",
      ).optional(),
    })).describe(
      'Required. RouteMatch defines the predicate used to match requests to a given action. Multiple match types are "OR"ed for evaluation. Atleast one RouteMatch must be supplied.',
    ).optional(),
  })).describe(
    "Required. Rules that define how traffic is routed and handled. At least one RouteRule must be supplied. If there are multiple rules then the action taken will be the first rule to match.",
  ).optional(),
  targetProxies: z.array(z.string()).describe(
    "Optional. TargetProxies defines a list of TargetTcpProxies this TlsRoute is attached to, as one of the routing rules to route the requests served by the TargetTcpProxy. Each TargetTcpProxy reference should match the pattern: `projects/*/locations/*/targetTcpProxies/`",
  ).optional(),
  tlsRouteId: z.string().describe(
    "Required. Short name of the TlsRoute resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  gateways: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  meshes: z.array(z.string()).optional(),
  name: z.string(),
  rules: z.array(z.object({
    action: z.object({
      destinations: z.array(z.object({
        serviceName: z.unknown(),
        weight: z.unknown(),
      })),
      idleTimeout: z.string(),
    }),
    matches: z.array(z.object({
      alpn: z.array(z.unknown()),
      sniHost: z.array(z.unknown()),
    })),
  })).optional(),
  selfLink: z.string().optional(),
  targetProxies: z.array(z.string()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  gateways: z.array(z.string()).describe(
    "Optional. Gateways defines a list of gateways this TlsRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/`",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the TlsRoute resource.",
  ).optional(),
  meshes: z.array(z.string()).describe(
    "Optional. Meshes defines a list of meshes this TlsRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the TlsRoute resource. It matches pattern `projects/*/locations/*/tlsRoutes/tls_route_name>`.",
  ).optional(),
  rules: z.array(z.object({
    action: z.object({
      destinations: z.array(z.object({
        serviceName: z.unknown().describe(
          "Required. The URL of a BackendService to route traffic to.",
        ).optional(),
        weight: z.unknown().describe(
          "Optional. Specifies the proportion of requests forwarded to the backend referenced by the service_name field. This is computed as: - weight/Sum(weights in destinations) Weights in all destinations does not need to sum up to 100.",
        ).optional(),
      })).describe(
        "Required. The destination services to which traffic should be forwarded. At least one destination service is required.",
      ).optional(),
      idleTimeout: z.string().describe(
        "Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled.",
      ).optional(),
    }).describe(
      "The specifications for routing traffic and applying associated policies.",
    ).optional(),
    matches: z.array(z.object({
      alpn: z.array(z.unknown()).describe(
        'Optional. ALPN (Application-Layer Protocol Negotiation) to match against. Examples: "http/1.1", "h2". At least one of sni_host and alpn is required. Up to 5 alpns across all matches can be set.',
      ).optional(),
      sniHost: z.array(z.unknown()).describe(
        "Optional. SNI (server name indicator) to match against. SNI will be matched against all wildcard domains, i.e. `www.example.com` will be first matched against `www.example.com`, then `*.example.com`, then `*.com.` Partial wildcards are not supported, and values like *w.example.com are invalid. At least one of sni_host and alpn is required. Up to 100 sni hosts across all matches can be set.",
      ).optional(),
    })).describe(
      'Required. RouteMatch defines the predicate used to match requests to a given action. Multiple match types are "OR"ed for evaluation. Atleast one RouteMatch must be supplied.',
    ).optional(),
  })).describe(
    "Required. Rules that define how traffic is routed and handled. At least one RouteRule must be supplied. If there are multiple rules then the action taken will be the first rule to match.",
  ).optional(),
  targetProxies: z.array(z.string()).describe(
    "Optional. TargetProxies defines a list of TargetTcpProxies this TlsRoute is attached to, as one of the routing rules to route the requests served by the TargetTcpProxy. Each TargetTcpProxy reference should match the pattern: `projects/*/locations/*/targetTcpProxies/`",
  ).optional(),
  tlsRouteId: z.string().describe(
    "Required. Short name of the TlsRoute resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Services TlsRoutes. Registered at `@swamp/gcp/networkservices/tlsroutes`. */
export const model = {
  type: "@swamp/gcp/networkservices/tlsroutes",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "TlsRoute defines how traffic should be routed based on SNI and other matching...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tlsRoutes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gateways"] !== undefined) body["gateways"] = g["gateways"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["meshes"] !== undefined) body["meshes"] = g["meshes"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["targetProxies"] !== undefined) {
          body["targetProxies"] = g["targetProxies"];
        }
        if (g["tlsRouteId"] !== undefined) body["tlsRouteId"] = g["tlsRouteId"];
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
      description: "Get a tlsRoutes",
      arguments: z.object({
        identifier: z.string().describe("The name of the tlsRoutes"),
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
      description: "Update tlsRoutes attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gateways"] !== undefined) body["gateways"] = g["gateways"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["meshes"] !== undefined) body["meshes"] = g["meshes"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["targetProxies"] !== undefined) {
          body["targetProxies"] = g["targetProxies"];
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
      description: "Delete the tlsRoutes",
      arguments: z.object({
        identifier: z.string().describe("The name of the tlsRoutes"),
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
      description: "Sync tlsRoutes state from GCP",
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
