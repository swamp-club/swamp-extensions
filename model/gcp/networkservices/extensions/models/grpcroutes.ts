// Auto-generated extension model for @swamp/gcp/networkservices/grpcroutes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services GrpcRoutes.
 *
 * GrpcRoute is the resource defining how gRPC traffic routed by a Mesh or Gateway resource is routed.
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
  return `${parent}/grpcRoutes/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.grpcRoutes.get",
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
  "id": "networkservices.projects.locations.grpcRoutes.create",
  "path": "v1/{+parent}/grpcRoutes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "grpcRouteId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.grpcRoutes.patch",
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
  "id": "networkservices.projects.locations.grpcRoutes.delete",
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
  "id": "networkservices.projects.locations.grpcRoutes.list",
  "path": "v1/{+parent}/grpcRoutes",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  gateways: z.array(z.string()).describe(
    "Optional. Gateways defines a list of gateways this GrpcRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/`",
  ).optional(),
  hostnames: z.array(z.string()).describe(
    'Required. Service hostnames with an optional port for which this route describes traffic. Format: [:] Hostname is the fully qualified domain name of a network host. This matches the RFC 1123 definition of a hostname with 2 notable exceptions: - IPs are not allowed. - A hostname may be prefixed with a wildcard label (`*.`). The wildcard label must appear by itself as the first label. Hostname can be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`) or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. `*.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or \'-\', and must start and end with an alphanumeric character. No other punctuation is allowed. The routes associated with a Mesh or Gateway must have unique hostnames. If you attempt to attach multiple routes with conflicting hostnames, the configuration will be rejected. For example, while it is acceptable for routes for the hostnames `*.foo.bar.com` and `*.bar.com` to be associated with the same route, it is not possible to associate two routes both with `*.bar.com` or both with `bar.com`. If a port is specified, then gRPC clients must use the channel URI with the port to match this rule (i.e. "xds:///service:123"), otherwise they must supply the URI without a port (i.e. "xds:///service").',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the GrpcRoute resource.",
  ).optional(),
  meshes: z.array(z.string()).describe(
    "Optional. Meshes defines a list of meshes this GrpcRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/`",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the GrpcRoute resource. It matches pattern `projects/*/locations/*/grpcRoutes/`",
  ).optional(),
  rules: z.array(z.object({
    action: z.object({
      destinations: z.array(z.object({
        serviceName: z.unknown().describe(
          "Required. The URL of a destination service to which to route traffic. Must refer to either a BackendService or ServiceDirectoryService.",
        ).optional(),
        weight: z.unknown().describe(
          "Optional. Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them.",
        ).optional(),
      })).describe(
        "Optional. The destination services to which traffic should be forwarded. If multiple destinations are specified, traffic will be split between Backend Service(s) according to the weight field of these destinations.",
      ).optional(),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown().describe(
            "The HTTP status code used to abort the request. The value must be between 200 and 599 inclusive.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic which will be aborted. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are aborted as part of fault injection before being sent to a destination.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            "Specify a fixed delay before forwarding the request.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic on which delay will be injected. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are delayed as part of fault injection before being sent to a destination.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced on a percentage of requests before sending those requests to the destination service. Similarly requests from clients can be aborted by for a percentage of requests.",
      ).optional(),
      idleTimeout: z.string().describe(
        "Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled.",
      ).optional(),
      retryPolicy: z.object({
        numRetries: z.number().int().describe(
          "Specifies the allowed number of retries. This number must be > 0. If not specified, default to 1.",
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "- connect-failure: Router will retry on failures connecting to Backend Services, for example due to connection timeouts. - refused-stream: Router will retry if the backend service resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: Router will retry if the gRPC status code in the response header is set to cancelled - deadline-exceeded: Router will retry if the gRPC status code in the response header is set to deadline-exceeded - resource-exhausted: Router will retry if the gRPC status code in the response header is set to resource-exhausted - unavailable: Router will retry if the gRPC status code in the response header is set to unavailable",
        ).optional(),
      }).describe(
        "The specifications for retries. Specifies one or more conditions for which this retry rule applies. Valid values are:",
      ).optional(),
      statefulSessionAffinity: z.object({
        cookieTtl: z.string().describe(
          "Required. The cookie TTL value for the Set-Cookie header generated by the data plane. The lifetime of the cookie may be set to a value from 0 to 86400 seconds (24 hours) inclusive. Set this to 0s to use a session cookie and disable cookie expiration.",
        ).optional(),
      }).describe(
        'The specification for cookie-based stateful session affinity where the date plane supplies a “session cookie” with the name "GSSA" which encodes a specific destination host and each request containing that cookie will be directed to that host as long as the destination host remains up and healthy. The gRPC proxyless mesh library or sidecar proxy will manage the session cookie but the client application code is responsible for copying the cookie from each RPC in the session to the next.',
      ).optional(),
      timeout: z.string().describe(
        "Optional. Specifies the timeout for selected route. Timeout is computed from the time the request has been fully processed (i.e. end of stream) up until the response has been completely processed. Timeout includes all retries.",
      ).optional(),
    }).describe("Specifies how to route matched traffic.").optional(),
    matches: z.array(z.object({
      headers: z.array(z.unknown()).describe(
        "Optional. Specifies a collection of headers to match.",
      ).optional(),
      method: z.object({
        caseSensitive: z.unknown().describe(
          "Optional. Specifies that matches are case sensitive. The default value is true. case_sensitive must not be used with a type of REGULAR_EXPRESSION.",
        ).optional(),
        grpcMethod: z.unknown().describe(
          "Required. Name of the method to match against. If unspecified, will match all methods.",
        ).optional(),
        grpcService: z.unknown().describe(
          "Required. Name of the service to match against. If unspecified, will match all services.",
        ).optional(),
        type: z.unknown().describe(
          'Optional. Specifies how to match against the name. If not specified, a default value of "EXACT" is used.',
        ).optional(),
      }).describe("Specifies a match against a method.").optional(),
    })).describe(
      "Optional. Matches define conditions used for matching the rule against incoming gRPC requests. Each match is independent, i.e. this rule will be matched if ANY one of the matches is satisfied. If no matches field is specified, this rule will unconditionally match traffic.",
    ).optional(),
  })).describe(
    "Required. A list of detailed rules defining how to route traffic. Within a single GrpcRoute, the GrpcRoute.RouteAction associated with the first matching GrpcRoute.RouteRule will be executed. At least one rule must be supplied.",
  ).optional(),
  grpcRouteId: z.string().describe(
    "Required. Short name of the GrpcRoute resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  gateways: z.array(z.string()).optional(),
  hostnames: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  meshes: z.array(z.string()).optional(),
  name: z.string(),
  rules: z.array(z.object({
    action: z.object({
      destinations: z.array(z.object({
        serviceName: z.unknown(),
        weight: z.unknown(),
      })),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown(),
          percentage: z.unknown(),
        }),
        delay: z.object({
          fixedDelay: z.unknown(),
          percentage: z.unknown(),
        }),
      }),
      idleTimeout: z.string(),
      retryPolicy: z.object({
        numRetries: z.number(),
        retryConditions: z.array(z.unknown()),
      }),
      statefulSessionAffinity: z.object({
        cookieTtl: z.string(),
      }),
      timeout: z.string(),
    }),
    matches: z.array(z.object({
      headers: z.array(z.unknown()),
      method: z.object({
        caseSensitive: z.unknown(),
        grpcMethod: z.unknown(),
        grpcService: z.unknown(),
        type: z.unknown(),
      }),
    })),
  })).optional(),
  selfLink: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  gateways: z.array(z.string()).describe(
    "Optional. Gateways defines a list of gateways this GrpcRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/`",
  ).optional(),
  hostnames: z.array(z.string()).describe(
    'Required. Service hostnames with an optional port for which this route describes traffic. Format: [:] Hostname is the fully qualified domain name of a network host. This matches the RFC 1123 definition of a hostname with 2 notable exceptions: - IPs are not allowed. - A hostname may be prefixed with a wildcard label (`*.`). The wildcard label must appear by itself as the first label. Hostname can be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`) or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. `*.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or \'-\', and must start and end with an alphanumeric character. No other punctuation is allowed. The routes associated with a Mesh or Gateway must have unique hostnames. If you attempt to attach multiple routes with conflicting hostnames, the configuration will be rejected. For example, while it is acceptable for routes for the hostnames `*.foo.bar.com` and `*.bar.com` to be associated with the same route, it is not possible to associate two routes both with `*.bar.com` or both with `bar.com`. If a port is specified, then gRPC clients must use the channel URI with the port to match this rule (i.e. "xds:///service:123"), otherwise they must supply the URI without a port (i.e. "xds:///service").',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the GrpcRoute resource.",
  ).optional(),
  meshes: z.array(z.string()).describe(
    "Optional. Meshes defines a list of meshes this GrpcRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/`",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the GrpcRoute resource. It matches pattern `projects/*/locations/*/grpcRoutes/`",
  ).optional(),
  rules: z.array(z.object({
    action: z.object({
      destinations: z.array(z.object({
        serviceName: z.unknown().describe(
          "Required. The URL of a destination service to which to route traffic. Must refer to either a BackendService or ServiceDirectoryService.",
        ).optional(),
        weight: z.unknown().describe(
          "Optional. Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them.",
        ).optional(),
      })).describe(
        "Optional. The destination services to which traffic should be forwarded. If multiple destinations are specified, traffic will be split between Backend Service(s) according to the weight field of these destinations.",
      ).optional(),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown().describe(
            "The HTTP status code used to abort the request. The value must be between 200 and 599 inclusive.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic which will be aborted. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are aborted as part of fault injection before being sent to a destination.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            "Specify a fixed delay before forwarding the request.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic on which delay will be injected. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are delayed as part of fault injection before being sent to a destination.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced on a percentage of requests before sending those requests to the destination service. Similarly requests from clients can be aborted by for a percentage of requests.",
      ).optional(),
      idleTimeout: z.string().describe(
        "Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled.",
      ).optional(),
      retryPolicy: z.object({
        numRetries: z.number().int().describe(
          "Specifies the allowed number of retries. This number must be > 0. If not specified, default to 1.",
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "- connect-failure: Router will retry on failures connecting to Backend Services, for example due to connection timeouts. - refused-stream: Router will retry if the backend service resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: Router will retry if the gRPC status code in the response header is set to cancelled - deadline-exceeded: Router will retry if the gRPC status code in the response header is set to deadline-exceeded - resource-exhausted: Router will retry if the gRPC status code in the response header is set to resource-exhausted - unavailable: Router will retry if the gRPC status code in the response header is set to unavailable",
        ).optional(),
      }).describe(
        "The specifications for retries. Specifies one or more conditions for which this retry rule applies. Valid values are:",
      ).optional(),
      statefulSessionAffinity: z.object({
        cookieTtl: z.string().describe(
          "Required. The cookie TTL value for the Set-Cookie header generated by the data plane. The lifetime of the cookie may be set to a value from 0 to 86400 seconds (24 hours) inclusive. Set this to 0s to use a session cookie and disable cookie expiration.",
        ).optional(),
      }).describe(
        'The specification for cookie-based stateful session affinity where the date plane supplies a “session cookie” with the name "GSSA" which encodes a specific destination host and each request containing that cookie will be directed to that host as long as the destination host remains up and healthy. The gRPC proxyless mesh library or sidecar proxy will manage the session cookie but the client application code is responsible for copying the cookie from each RPC in the session to the next.',
      ).optional(),
      timeout: z.string().describe(
        "Optional. Specifies the timeout for selected route. Timeout is computed from the time the request has been fully processed (i.e. end of stream) up until the response has been completely processed. Timeout includes all retries.",
      ).optional(),
    }).describe("Specifies how to route matched traffic.").optional(),
    matches: z.array(z.object({
      headers: z.array(z.unknown()).describe(
        "Optional. Specifies a collection of headers to match.",
      ).optional(),
      method: z.object({
        caseSensitive: z.unknown().describe(
          "Optional. Specifies that matches are case sensitive. The default value is true. case_sensitive must not be used with a type of REGULAR_EXPRESSION.",
        ).optional(),
        grpcMethod: z.unknown().describe(
          "Required. Name of the method to match against. If unspecified, will match all methods.",
        ).optional(),
        grpcService: z.unknown().describe(
          "Required. Name of the service to match against. If unspecified, will match all services.",
        ).optional(),
        type: z.unknown().describe(
          'Optional. Specifies how to match against the name. If not specified, a default value of "EXACT" is used.',
        ).optional(),
      }).describe("Specifies a match against a method.").optional(),
    })).describe(
      "Optional. Matches define conditions used for matching the rule against incoming gRPC requests. Each match is independent, i.e. this rule will be matched if ANY one of the matches is satisfied. If no matches field is specified, this rule will unconditionally match traffic.",
    ).optional(),
  })).describe(
    "Required. A list of detailed rules defining how to route traffic. Within a single GrpcRoute, the GrpcRoute.RouteAction associated with the first matching GrpcRoute.RouteRule will be executed. At least one rule must be supplied.",
  ).optional(),
  grpcRouteId: z.string().describe(
    "Required. Short name of the GrpcRoute resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Services GrpcRoutes. Registered at `@swamp/gcp/networkservices/grpcroutes`. */
export const model = {
  type: "@swamp/gcp/networkservices/grpcroutes",
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
        "GrpcRoute is the resource defining how gRPC traffic routed by a Mesh or Gatew...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a grpcRoutes",
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
        if (g["hostnames"] !== undefined) body["hostnames"] = g["hostnames"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["meshes"] !== undefined) body["meshes"] = g["meshes"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["grpcRouteId"] !== undefined) {
          body["grpcRouteId"] = g["grpcRouteId"];
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
      description: "Get a grpcRoutes",
      arguments: z.object({
        identifier: z.string().describe("The name of the grpcRoutes"),
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
      description: "Update grpcRoutes attributes",
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
        if (g["hostnames"] !== undefined) body["hostnames"] = g["hostnames"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["meshes"] !== undefined) body["meshes"] = g["meshes"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
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
      description: "Delete the grpcRoutes",
      arguments: z.object({
        identifier: z.string().describe("The name of the grpcRoutes"),
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
      description: "Sync grpcRoutes state from GCP",
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
