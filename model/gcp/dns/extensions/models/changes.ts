// Auto-generated extension model for @swamp/gcp/dns/changes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud DNS Changes.
 *
 * A Change represents a set of `ResourceRecordSet` additions and deletions applied atomically to a ManagedZone. ResourceRecordSets within a ManagedZone are modified by creating a new Change element in the Changes collection. In turn the Changes collection also records the past modifications to the `ResourceRecordSets` in a `ManagedZone`. The current state of the `ManagedZone` is the sum effect of applying all `Change` elements in the `Changes` collection in sequence.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dns.googleapis.com/";

const GET_CONFIG = {
  "id": "dns.changes.get",
  "path":
    "dns/v1/projects/{project}/managedZones/{managedZone}/changes/{changeId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "managedZone",
    "changeId",
  ],
  "parameters": {
    "changeId": {
      "location": "path",
      "required": true,
    },
    "clientOperationId": {
      "location": "query",
    },
    "managedZone": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dns.changes.create",
  "path": "dns/v1/projects/{project}/managedZones/{managedZone}/changes",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "managedZone",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "managedZone": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  additions: z.array(z.object({
    kind: z.string().optional(),
    name: z.string().describe("For example, www.example.com.").optional(),
    routingPolicy: z.object({
      geo: z.object({
        enableFencing: z.boolean().describe(
          "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
        ).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
      ).optional(),
      healthCheck: z.string().describe(
        "The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks",
      ).optional(),
      kind: z.string().optional(),
      primaryBackup: z.object({
        backupGeoTargets: z.object({
          enableFencing: z.unknown().describe(
            "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
          ).optional(),
          items: z.unknown().describe(
            "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
          ).optional(),
          kind: z.unknown().optional(),
        }).describe(
          "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
        ).optional(),
        kind: z.string().optional(),
        primaryTargets: z.object({
          externalEndpoints: z.unknown().describe(
            "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
          ).optional(),
          internalLoadBalancers: z.unknown().describe(
            "Configuration for internal load balancers to be health checked.",
          ).optional(),
        }).describe(
          "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
        ).optional(),
        trickleTraffic: z.number().describe(
          "When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets.",
        ).optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.",
      ).optional(),
      wrr: z.object({
        items: z.array(z.unknown()).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.",
      ).optional(),
    }).describe(
      "A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.",
    ).optional(),
    rrdatas: z.array(z.string()).describe(
      "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples.",
    ).optional(),
    signatureRrdatas: z.array(z.string()).describe(
      "As defined in RFC 4034 (section 3.2).",
    ).optional(),
    ttl: z.number().int().describe(
      "Number of seconds that this `ResourceRecordSet` can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "The identifier of a supported record type. See the list of Supported DNS record types.",
    ).optional(),
  })).describe("Which ResourceRecordSets to add?").optional(),
  deletions: z.array(z.object({
    kind: z.string().optional(),
    name: z.string().describe("For example, www.example.com.").optional(),
    routingPolicy: z.object({
      geo: z.object({
        enableFencing: z.boolean().describe(
          "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
        ).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
      ).optional(),
      healthCheck: z.string().describe(
        "The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks",
      ).optional(),
      kind: z.string().optional(),
      primaryBackup: z.object({
        backupGeoTargets: z.object({
          enableFencing: z.unknown().describe(
            "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
          ).optional(),
          items: z.unknown().describe(
            "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
          ).optional(),
          kind: z.unknown().optional(),
        }).describe(
          "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
        ).optional(),
        kind: z.string().optional(),
        primaryTargets: z.object({
          externalEndpoints: z.unknown().describe(
            "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
          ).optional(),
          internalLoadBalancers: z.unknown().describe(
            "Configuration for internal load balancers to be health checked.",
          ).optional(),
        }).describe(
          "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
        ).optional(),
        trickleTraffic: z.number().describe(
          "When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets.",
        ).optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.",
      ).optional(),
      wrr: z.object({
        items: z.array(z.unknown()).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.",
      ).optional(),
    }).describe(
      "A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.",
    ).optional(),
    rrdatas: z.array(z.string()).describe(
      "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples.",
    ).optional(),
    signatureRrdatas: z.array(z.string()).describe(
      "As defined in RFC 4034 (section 3.2).",
    ).optional(),
    ttl: z.number().int().describe(
      "Number of seconds that this `ResourceRecordSet` can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "The identifier of a supported record type. See the list of Supported DNS record types.",
    ).optional(),
  })).describe(
    "Which ResourceRecordSets to remove? Must match existing data exactly.",
  ).optional(),
  isServing: z.boolean().describe(
    "If the DNS queries for the zone will be served.",
  ).optional(),
  managedZone: z.string().describe(
    "Identifies the managed zone addressed by this request. Can be the managed zone name or ID.",
  ),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

const StateSchema = z.object({
  additions: z.array(z.object({
    kind: z.string(),
    name: z.string(),
    routingPolicy: z.object({
      geo: z.object({
        enableFencing: z.boolean(),
        items: z.array(z.unknown()),
        kind: z.string(),
      }),
      healthCheck: z.string(),
      kind: z.string(),
      primaryBackup: z.object({
        backupGeoTargets: z.object({
          enableFencing: z.unknown(),
          items: z.unknown(),
          kind: z.unknown(),
        }),
        kind: z.string(),
        primaryTargets: z.object({
          externalEndpoints: z.unknown(),
          internalLoadBalancers: z.unknown(),
        }),
        trickleTraffic: z.number(),
      }),
      wrr: z.object({
        items: z.array(z.unknown()),
        kind: z.string(),
      }),
    }),
    rrdatas: z.array(z.string()),
    signatureRrdatas: z.array(z.string()),
    ttl: z.number(),
    type: z.string(),
  })).optional(),
  deletions: z.array(z.object({
    kind: z.string(),
    name: z.string(),
    routingPolicy: z.object({
      geo: z.object({
        enableFencing: z.boolean(),
        items: z.array(z.unknown()),
        kind: z.string(),
      }),
      healthCheck: z.string(),
      kind: z.string(),
      primaryBackup: z.object({
        backupGeoTargets: z.object({
          enableFencing: z.unknown(),
          items: z.unknown(),
          kind: z.unknown(),
        }),
        kind: z.string(),
        primaryTargets: z.object({
          externalEndpoints: z.unknown(),
          internalLoadBalancers: z.unknown(),
        }),
        trickleTraffic: z.number(),
      }),
      wrr: z.object({
        items: z.array(z.unknown()),
        kind: z.string(),
      }),
    }),
    rrdatas: z.array(z.string()),
    signatureRrdatas: z.array(z.string()),
    ttl: z.number(),
    type: z.string(),
  })).optional(),
  id: z.string().optional(),
  isServing: z.boolean().optional(),
  kind: z.string().optional(),
  startTime: z.string().optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  additions: z.array(z.object({
    kind: z.string().optional(),
    name: z.string().describe("For example, www.example.com.").optional(),
    routingPolicy: z.object({
      geo: z.object({
        enableFencing: z.boolean().describe(
          "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
        ).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
      ).optional(),
      healthCheck: z.string().describe(
        "The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks",
      ).optional(),
      kind: z.string().optional(),
      primaryBackup: z.object({
        backupGeoTargets: z.object({
          enableFencing: z.unknown().describe(
            "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
          ).optional(),
          items: z.unknown().describe(
            "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
          ).optional(),
          kind: z.unknown().optional(),
        }).describe(
          "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
        ).optional(),
        kind: z.string().optional(),
        primaryTargets: z.object({
          externalEndpoints: z.unknown().describe(
            "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
          ).optional(),
          internalLoadBalancers: z.unknown().describe(
            "Configuration for internal load balancers to be health checked.",
          ).optional(),
        }).describe(
          "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
        ).optional(),
        trickleTraffic: z.number().describe(
          "When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets.",
        ).optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.",
      ).optional(),
      wrr: z.object({
        items: z.array(z.unknown()).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.",
      ).optional(),
    }).describe(
      "A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.",
    ).optional(),
    rrdatas: z.array(z.string()).describe(
      "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples.",
    ).optional(),
    signatureRrdatas: z.array(z.string()).describe(
      "As defined in RFC 4034 (section 3.2).",
    ).optional(),
    ttl: z.number().int().describe(
      "Number of seconds that this `ResourceRecordSet` can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "The identifier of a supported record type. See the list of Supported DNS record types.",
    ).optional(),
  })).describe("Which ResourceRecordSets to add?").optional(),
  deletions: z.array(z.object({
    kind: z.string().optional(),
    name: z.string().describe("For example, www.example.com.").optional(),
    routingPolicy: z.object({
      geo: z.object({
        enableFencing: z.boolean().describe(
          "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
        ).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
      ).optional(),
      healthCheck: z.string().describe(
        "The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks",
      ).optional(),
      kind: z.string().optional(),
      primaryBackup: z.object({
        backupGeoTargets: z.object({
          enableFencing: z.unknown().describe(
            "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
          ).optional(),
          items: z.unknown().describe(
            "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
          ).optional(),
          kind: z.unknown().optional(),
        }).describe(
          "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
        ).optional(),
        kind: z.string().optional(),
        primaryTargets: z.object({
          externalEndpoints: z.unknown().describe(
            "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
          ).optional(),
          internalLoadBalancers: z.unknown().describe(
            "Configuration for internal load balancers to be health checked.",
          ).optional(),
        }).describe(
          "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
        ).optional(),
        trickleTraffic: z.number().describe(
          "When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets.",
        ).optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.",
      ).optional(),
      wrr: z.object({
        items: z.array(z.unknown()).optional(),
        kind: z.string().optional(),
      }).describe(
        "Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.",
      ).optional(),
    }).describe(
      "A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.",
    ).optional(),
    rrdatas: z.array(z.string()).describe(
      "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples.",
    ).optional(),
    signatureRrdatas: z.array(z.string()).describe(
      "As defined in RFC 4034 (section 3.2).",
    ).optional(),
    ttl: z.number().int().describe(
      "Number of seconds that this `ResourceRecordSet` can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "The identifier of a supported record type. See the list of Supported DNS record types.",
    ).optional(),
  })).describe(
    "Which ResourceRecordSets to remove? Must match existing data exactly.",
  ).optional(),
  isServing: z.boolean().describe(
    "If the DNS queries for the zone will be served.",
  ).optional(),
  managedZone: z.string().describe(
    "Identifies the managed zone addressed by this request. Can be the managed zone name or ID.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

/** Swamp extension model for Google Cloud DNS Changes. Registered at `@swamp/gcp/dns/changes`. */
export const model = {
  type: "@swamp/gcp/dns/changes",
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
        "A Change represents a set of `ResourceRecordSet` additions and deletions appl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a changes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["managedZone"] !== undefined) {
          params["managedZone"] = String(g["managedZone"]);
        }
        const body: Record<string, unknown> = {};
        if (g["additions"] !== undefined) body["additions"] = g["additions"];
        if (g["deletions"] !== undefined) body["deletions"] = g["deletions"];
        if (g["isServing"] !== undefined) body["isServing"] = g["isServing"];
        if (g["clientOperationId"] !== undefined) {
          body["clientOperationId"] = g["clientOperationId"];
        }
        if (g["name"] !== undefined) params["changeId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a changes",
      arguments: z.object({
        identifier: z.string().describe("The name of the changes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["managedZone"] !== undefined) {
          params["managedZone"] = String(g["managedZone"]);
        }
        params["changeId"] = args.identifier;
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
    sync: {
      description: "Sync changes state from GCP",
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
          if (g["managedZone"] !== undefined) {
            params["managedZone"] = String(g["managedZone"]);
          } else if (existing["managedZone"]) {
            params["managedZone"] = String(existing["managedZone"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["changeId"] = identifier;
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
