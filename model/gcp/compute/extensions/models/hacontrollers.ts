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

// Auto-generated extension model for @swamp/gcp/compute/hacontrollers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine HaControllers.
 *
 * HaController handles failover for a VM Instance.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.haControllers.get",
  "path": "projects/{project}/regions/{region}/haControllers/{haController}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "haController",
  ],
  "parameters": {
    "haController": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.haControllers.insert",
  "path": "projects/{project}/regions/{region}/haControllers",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.haControllers.patch",
  "path": "projects/{project}/regions/{region}/haControllers/{haController}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "haController",
  ],
  "parameters": {
    "haController": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
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
  "id": "compute.haControllers.delete",
  "path": "projects/{project}/regions/{region}/haControllers/{haController}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "haController",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "haController": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.haControllers.list",
  "path": "projects/{project}/regions/{region}/haControllers",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "filter": {
      "location": "query",
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
    "region": {
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
  backendServices: z.array(z.string()).describe(
    "Advanced configuration option. If specified, these Backend Services need to be pre-created. Currently, only one backend service can be specified, and it must be L4 Internal Load Balancer (ILB).",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  failoverInitiation: z.enum([
    "AUTOMATIC",
    "FAILOVER_INITIATION_UNSPECIFIED",
    "MANUAL_ONLY",
  ]).describe("Indicates how failover should be initiated.").optional(),
  instanceName: z.string().regex(
    new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"),
  ).describe(
    "Name of the instance that HaController is in charge of. If not specified the HaController's resource name will be used instead. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  networkingAutoConfiguration: z.object({
    internal: z.object({
      ipAddress: z.string().describe(
        "Optional. IP addresses will be automatically allocated according to StackType if not provided.",
      ).optional(),
      ipv6Address: z.string().optional(),
      stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"]).describe(
        "Determine which IP addresses to automatically create. Field and option naming consistent with NetworkInterface configuration on Instances.",
      ).optional(),
    }).describe("Internal networking configuration").optional(),
  }).describe(
    "Basic networking configuration. Required backend services and forwarding rules will be automatically created with default parameters.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  zoneConfigurations: z.record(
    z.string(),
    z.object({
      nodeAffinities: z.array(z.object({
        key: z.string().describe(
          "Corresponds to the label key of Node resource.",
        ).optional(),
        operator: z.enum(["IN", "NOT_IN", "OPERATOR_UNSPECIFIED"]).describe(
          "Defines the operation of node selection. Valid operators areIN for affinity and NOT_IN for anti-affinity.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Corresponds to the label values of Node resource.",
        ).optional(),
      })).describe(
        "A set of node affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity.",
      ).optional(),
      reservationAffinity: z.object({
        consumeReservationType: z.enum([
          "ANY_RESERVATION",
          "ANY_RESERVATION_THEN_FAIL",
          "NO_RESERVATION",
          "SPECIFIC_RESERVATION",
          "SPECIFIC_THEN_ANY_RESERVATION",
          "SPECIFIC_THEN_NO_RESERVATION",
          "UNSPECIFIED",
        ]).describe(
          "Specifies the type of reservation from which this instance can consume resources: ANY_RESERVATION (default),SPECIFIC_RESERVATION, or NO_RESERVATION. See Consuming reserved instances for examples.",
        ).optional(),
        key: z.string().describe(
          "Corresponds to the label key of a reservation resource. To target aSPECIFIC_RESERVATION by name, specifygoogleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
        ).optional(),
        values: z.array(z.string()).describe(
          'Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.',
        ).optional(),
      }).describe(
        "Specifies the reservations that the instance can consume from.",
      ).optional(),
    }),
  ).describe(
    "Map of zone configurations Key: name of the zone Value: ZoneConfiguration",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed.",
  ).optional(),
});

const StateSchema = z.object({
  backendServices: z.array(z.string()).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  failoverInitiation: z.string().optional(),
  id: z.string().optional(),
  instanceName: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  networkingAutoConfiguration: z.object({
    internal: z.object({
      ipAddress: z.string(),
      ipv6Address: z.string(),
      stackType: z.string(),
    }),
  }).optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  state: z.string().optional(),
  status: z.object({
    failoverProgress: z.object({
      failoverCompleteTimestamp: z.string(),
      failoverDuration: z.string(),
      failoverTrigger: z.string(),
      failoverTriggerTimestamp: z.string(),
      lastFailoverAttempt: z.object({
        errors: z.object({
          errors: z.array(z.unknown()),
        }),
        timestamp: z.string(),
      }),
    }),
    lastFailoverInfo: z.object({
      failoverCompleteTimestamp: z.string(),
      failoverDuration: z.string(),
      failoverTrigger: z.string(),
      failoverTriggerTimestamp: z.string(),
      lastFailoverAttempt: z.object({
        errors: z.object({
          errors: z.array(z.unknown()),
        }),
        timestamp: z.string(),
      }),
    }),
    ongoingFailover: z.boolean(),
    primaryInstance: z.string(),
    primaryZone: z.string(),
    readyForFailover: z.boolean(),
    zoneStatus: z.record(z.string(), z.unknown()),
  }).optional(),
  zoneConfigurations: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  backendServices: z.array(z.string()).describe(
    "Advanced configuration option. If specified, these Backend Services need to be pre-created. Currently, only one backend service can be specified, and it must be L4 Internal Load Balancer (ILB).",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  failoverInitiation: z.enum([
    "AUTOMATIC",
    "FAILOVER_INITIATION_UNSPECIFIED",
    "MANUAL_ONLY",
  ]).describe("Indicates how failover should be initiated.").optional(),
  instanceName: z.string().regex(
    new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"),
  ).describe(
    "Name of the instance that HaController is in charge of. If not specified the HaController's resource name will be used instead. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  networkingAutoConfiguration: z.object({
    internal: z.object({
      ipAddress: z.string().describe(
        "Optional. IP addresses will be automatically allocated according to StackType if not provided.",
      ).optional(),
      ipv6Address: z.string().optional(),
      stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"]).describe(
        "Determine which IP addresses to automatically create. Field and option naming consistent with NetworkInterface configuration on Instances.",
      ).optional(),
    }).describe("Internal networking configuration").optional(),
  }).describe(
    "Basic networking configuration. Required backend services and forwarding rules will be automatically created with default parameters.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  zoneConfigurations: z.record(
    z.string(),
    z.object({
      nodeAffinities: z.array(z.object({
        key: z.string().describe(
          "Corresponds to the label key of Node resource.",
        ).optional(),
        operator: z.enum(["IN", "NOT_IN", "OPERATOR_UNSPECIFIED"]).describe(
          "Defines the operation of node selection. Valid operators areIN for affinity and NOT_IN for anti-affinity.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Corresponds to the label values of Node resource.",
        ).optional(),
      })).describe(
        "A set of node affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity.",
      ).optional(),
      reservationAffinity: z.object({
        consumeReservationType: z.enum([
          "ANY_RESERVATION",
          "ANY_RESERVATION_THEN_FAIL",
          "NO_RESERVATION",
          "SPECIFIC_RESERVATION",
          "SPECIFIC_THEN_ANY_RESERVATION",
          "SPECIFIC_THEN_NO_RESERVATION",
          "UNSPECIFIED",
        ]).describe(
          "Specifies the type of reservation from which this instance can consume resources: ANY_RESERVATION (default),SPECIFIC_RESERVATION, or NO_RESERVATION. See Consuming reserved instances for examples.",
        ).optional(),
        key: z.string().describe(
          "Corresponds to the label key of a reservation resource. To target aSPECIFIC_RESERVATION by name, specifygoogleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
        ).optional(),
        values: z.array(z.string()).describe(
          'Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.',
        ).optional(),
      }).describe(
        "Specifies the reservations that the instance can consume from.",
      ).optional(),
    }),
  ).describe(
    "Map of zone configurations Key: name of the zone Value: ZoneConfiguration",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed.",
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

/** Swamp extension model for Google Cloud Compute Engine HaControllers. Registered at `@swamp/gcp/compute/hacontrollers`. */
export const model = {
  type: "@swamp/gcp/compute/hacontrollers",
  version: "2026.09.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "HaController handles failover for a VM Instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a haControllers",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["backendServices"] !== undefined) {
          body["backendServices"] = g["backendServices"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failoverInitiation"] !== undefined) {
          body["failoverInitiation"] = g["failoverInitiation"];
        }
        if (g["instanceName"] !== undefined) {
          body["instanceName"] = g["instanceName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkingAutoConfiguration"] !== undefined) {
          body["networkingAutoConfiguration"] =
            g["networkingAutoConfiguration"];
        }
        if (g["zoneConfigurations"] !== undefined) {
          body["zoneConfigurations"] = g["zoneConfigurations"];
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) params["haController"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "region": String(g["region"] ?? ""),
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
      description: "Get a haControllers",
      arguments: z.object({
        identifier: z.string().describe("The name of the haControllers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["haController"] = args.identifier;
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
      description: "Update haControllers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific haControllers by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["haController"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["backendServices"] !== undefined) {
          body["backendServices"] = g["backendServices"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failoverInitiation"] !== undefined) {
          body["failoverInitiation"] = g["failoverInitiation"];
        }
        if (g["instanceName"] !== undefined) {
          body["instanceName"] = g["instanceName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkingAutoConfiguration"] !== undefined) {
          body["networkingAutoConfiguration"] =
            g["networkingAutoConfiguration"];
        }
        if (g["zoneConfigurations"] !== undefined) {
          body["zoneConfigurations"] = g["zoneConfigurations"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
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
      description: "Delete the haControllers",
      arguments: z.object({
        identifier: z.string().describe("The name of the haControllers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["haController"] = args.identifier;
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
      description: "Sync haControllers state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific haControllers by name (e.g. one discovered by list)",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["haController"] = identifier;
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
      description: "List haControllers resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
    failover: {
      description: "failover",
      arguments: z.object({
        failoverToZone: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["haController"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["requestId"] !== undefined) {
          params["requestId"] = String(args["requestId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["failoverToZone"] !== undefined) {
          body["failoverToZone"] = args["failoverToZone"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.haControllers.failover",
            "path":
              "projects/{project}/regions/{region}/haControllers/{haController}/failover",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "haController"],
            "parameters": {
              "haController": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
