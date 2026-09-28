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

// Auto-generated extension model for @swamp/gcp/cloudasset/assets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Asset Assets.
 *
 * An asset in Google Cloud. An asset can be any resource in the Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy), or a relationship (e.g. an INSTANCE_TO_INSTANCEGROUP relationship). See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  request,
} from "./_lib/gcp.ts";

const BASE_URL = "https://cloudasset.googleapis.com/";

const LIST_CONFIG = {
  "id": "cloudasset.assets.list",
  "path": "v1/{+parent}/assets",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assetTypes": {
      "location": "query",
    },
    "contentType": {
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
    "readTime": {
      "location": "query",
    },
    "relationshipTypes": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

// Identity, type, location and state metadata only. Requested server-side via
// readMask and re-applied client-side, so resource payloads
// (additionalAttributes, description, labels, versionedResources, ...) are
// never persisted even if the server or an emulator ignores the mask.
const ASSET_METADATA_FIELDS = [
  "name",
  "assetType",
  "project",
  "folders",
  "organization",
  "displayName",
  "location",
  "state",
  "createTime",
  "updateTime",
  "parentFullResourceName",
  "parentAssetType",
] as const;

function pickAssetMetadata(
  result: Record<string, unknown>,
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const field of ASSET_METADATA_FIELDS) {
    if (result[field] !== undefined) picked[field] = result[field];
  }
  return picked;
}

const assetInventoryMethods = {
  inventory_project_metadata: {
    description:
      "persist a complete paginated searchAllResources metadata snapshot for one project — fails on maxAssets breach rather than silently truncating; coverage is caller-visible search-index results, not proof of backup or retention completeness",
    arguments: z.object({
      project: z.string().describe(
        "Project to search, as a project ID or projects/{project}. Overrides the project global argument and GCP_PROJECT, which are used otherwise. Folder and organization scopes are rejected.",
      ).optional(),
      query: z.string().describe(
        "Cloud Asset search query, passed through verbatim (default: all resources in the project)",
      ).optional(),
      assetTypes: z.string().describe(
        "Comma-separated asset types (regular expressions supported), passed through verbatim (default: all search-supported types)",
      ).optional(),
      maxAssets: z.number().int().positive().describe(
        "Maximum number of resources to collect before failing with an explicit truncation error (default 10000)",
      ).optional(),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: {
        globalArgs: Record<string, unknown>;
        writeResource: (
          type: string,
          name: string,
          data: unknown,
        ) => Promise<unknown>;
      },
    ) => {
      const g = context.globalArgs;
      const baseUrl = g["apiEndpoint"]?.toString() ??
        Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
      const credentials = _buildGcpCredentials(g);
      const requested = (args.project as string | undefined) ??
        await getProjectId(credentials);
      const projectId = requested.startsWith("projects/")
        ? requested.slice("projects/".length)
        : requested;
      if (!projectId || projectId.includes("/")) {
        throw new Error(
          `inventory_project_metadata only snapshots a single project; got "${requested}". ` +
            "Pass a project ID or projects/{project} — folder and organization scopes are not supported.",
        );
      }
      const scope = `projects/${projectId}`;
      const maxAssets = (args.maxAssets as number | undefined) ?? 10000;
      const query = args.query as string | undefined;
      const assetTypes = args.assetTypes as string | undefined;
      const readMask = ASSET_METADATA_FIELDS.join(",");

      const resources: Record<string, unknown>[] = [];
      let pageToken: string | undefined;
      let pageCount = 0;
      const seenTokens = new Set<string>();

      do {
        const params = new URLSearchParams({
          pageSize: "500",
          readMask,
        });
        if (query !== undefined) params.set("query", query);
        if (assetTypes !== undefined) params.set("assetTypes", assetTypes);
        if (pageToken) params.set("pageToken", pageToken);
        const url = `${baseUrl}v1/${scope}:searchAllResources?${params}`;

        const resp = await request("GET", url, undefined, credentials);
        pageCount++;
        const body = await resp.text();
        if (!resp.ok) {
          throw new Error(
            `Failed to search resources in ${scope} (${resp.status}) on page ${pageCount}: ${body}`,
          );
        }

        let data: {
          results?: Record<string, unknown>[];
          nextPageToken?: string;
        };
        try {
          data = JSON.parse(body);
        } catch {
          throw new Error(
            `searchAllResources returned a non-JSON body for ${scope} on page ${pageCount}. The snapshot was NOT persisted.`,
          );
        }

        for (const result of data.results ?? []) {
          resources.push(pickAssetMetadata(result));
        }

        if (resources.length > maxAssets) {
          throw new Error(
            `Resource count (${resources.length}) exceeds maxAssets limit (${maxAssets}) for ${scope}. ` +
              "Increase maxAssets or narrow query/assetTypes. The snapshot was NOT persisted.",
          );
        }

        pageToken = data.nextPageToken || undefined;
        if (pageToken) {
          if (seenTokens.has(pageToken)) {
            throw new Error(
              `Repeated pagination token searching resources in ${scope}. ` +
                "This indicates an API pagination loop — aborting. The snapshot was NOT persisted.",
            );
          }
          seenTokens.add(pageToken);
        }
      } while (pageToken);

      // The API does not guarantee result order; sort so snapshots of an
      // unchanged project compare equal.
      resources.sort((a, b) => {
        const an = String(a.name ?? "");
        const bn = String(b.name ?? "");
        return an < bn ? -1 : an > bn ? 1 : 0;
      });

      const instanceName = `project_metadata_snapshot_${
        scope.replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "")
      }`;
      const snapshot = {
        name: instanceName,
        scope,
        query: query ?? null,
        assetTypes: assetTypes ?? null,
        readMask,
        maxAssets,
        count: resources.length,
        pageCount,
        resources,
        coverage: "caller-visible",
        source: "search-index",
        note:
          "Results come from the Cloud Asset search index, which can lag resource changes and only covers search-supported asset types. This snapshot is not proof of backup or retention completeness.",
        fetchedAt: new Date().toISOString(),
      };

      const handle = await context.writeResource(
        "state",
        instanceName,
        snapshot,
      );
      return { dataHandles: [handle] };
    },
  },
};

const StateSchema = z.object({
  accessLevel: z.object({
    basic: z.object({
      combiningFunction: z.string(),
      conditions: z.array(z.object({
        devicePolicy: z.object({
          allowedDeviceManagementLevels: z.unknown(),
          allowedEncryptionStatuses: z.unknown(),
          osConstraints: z.unknown(),
          requireAdminApproval: z.unknown(),
          requireCorpOwned: z.unknown(),
          requireScreenlock: z.unknown(),
        }),
        ipSubnetworks: z.array(z.unknown()),
        members: z.array(z.unknown()),
        negate: z.boolean(),
        regions: z.array(z.unknown()),
        requiredAccessLevels: z.array(z.unknown()),
        vpcNetworkSources: z.array(z.unknown()),
      })),
    }),
    custom: z.object({
      expr: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
    }),
    description: z.string(),
    name: z.string(),
    title: z.string(),
  }).optional(),
  accessPolicy: z.object({
    etag: z.string(),
    name: z.string(),
    parent: z.string(),
    scopes: z.array(z.string()),
    title: z.string(),
  }).optional(),
  ancestors: z.array(z.string()).optional(),
  assetExceptions: z.array(z.object({
    details: z.string(),
    exceptionType: z.string(),
  })).optional(),
  assetType: z.string().optional(),
  iamPolicy: z.object({
    auditConfigs: z.array(z.object({
      auditLogConfigs: z.array(z.object({
        exemptedMembers: z.unknown(),
        logType: z.unknown(),
      })),
      service: z.string(),
    })),
    bindings: z.array(z.object({
      condition: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
      members: z.array(z.string()),
      role: z.string(),
    })),
    etag: z.string(),
    version: z.number(),
  }).optional(),
  name: z.string(),
  orgPolicy: z.array(z.object({
    booleanPolicy: z.object({
      enforced: z.boolean(),
    }),
    constraint: z.string(),
    etag: z.string(),
    listPolicy: z.object({
      allValues: z.string(),
      allowedValues: z.array(z.string()),
      deniedValues: z.array(z.string()),
      inheritFromParent: z.boolean(),
      suggestedValue: z.string(),
    }),
    restoreDefault: z.object({}),
    updateTime: z.string(),
    version: z.number(),
  })).optional(),
  osInventory: z.object({
    items: z.record(z.string(), z.unknown()),
    name: z.string(),
    osInfo: z.object({
      architecture: z.string(),
      hostname: z.string(),
      kernelRelease: z.string(),
      kernelVersion: z.string(),
      longName: z.string(),
      osconfigAgentVersion: z.string(),
      shortName: z.string(),
      version: z.string(),
    }),
    updateTime: z.string(),
  }).optional(),
  relatedAsset: z.object({
    ancestors: z.array(z.string()),
    asset: z.string(),
    assetType: z.string(),
    relationshipType: z.string(),
  }).optional(),
  relatedAssets: z.object({
    assets: z.array(z.object({
      ancestors: z.array(z.string()),
      asset: z.string(),
      assetType: z.string(),
      relationshipType: z.string(),
    })),
    relationshipAttributes: z.object({
      action: z.string(),
      sourceResourceType: z.string(),
      targetResourceType: z.string(),
      type: z.string(),
    }),
  }).optional(),
  resource: z.object({
    data: z.record(z.string(), z.unknown()),
    discoveryDocumentUri: z.string(),
    discoveryName: z.string(),
    location: z.string(),
    parent: z.string(),
    resourceUrl: z.string(),
    version: z.string(),
  }).optional(),
  servicePerimeter: z.object({
    description: z.string(),
    etag: z.string(),
    name: z.string(),
    perimeterType: z.string(),
    spec: z.object({
      accessLevels: z.array(z.string()),
      egressPolicies: z.array(z.object({
        egressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sourceRestriction: z.unknown(),
          sources: z.unknown(),
        }),
        egressTo: z.object({
          externalResources: z.unknown(),
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      ingressPolicies: z.array(z.object({
        ingressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sources: z.unknown(),
        }),
        ingressTo: z.object({
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      resources: z.array(z.string()),
      restrictedServices: z.array(z.string()),
      vpcAccessibleServices: z.object({
        allowedServicePatterns: z.array(z.object({
          modifiers: z.unknown(),
          pattern: z.unknown(),
          service: z.unknown(),
        })),
        allowedServices: z.array(z.string()),
        enableRestriction: z.boolean(),
        servicePatternsEnforcementScopes: z.array(z.string()),
      }),
    }),
    status: z.object({
      accessLevels: z.array(z.string()),
      egressPolicies: z.array(z.object({
        egressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sourceRestriction: z.unknown(),
          sources: z.unknown(),
        }),
        egressTo: z.object({
          externalResources: z.unknown(),
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      ingressPolicies: z.array(z.object({
        ingressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sources: z.unknown(),
        }),
        ingressTo: z.object({
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      resources: z.array(z.string()),
      restrictedServices: z.array(z.string()),
      vpcAccessibleServices: z.object({
        allowedServicePatterns: z.array(z.object({
          modifiers: z.unknown(),
          pattern: z.unknown(),
          service: z.unknown(),
        })),
        allowedServices: z.array(z.string()),
        enableRestriction: z.boolean(),
        servicePatternsEnforcementScopes: z.array(z.string()),
      }),
    }),
    title: z.string(),
    useExplicitDryRunSpec: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Asset Assets. Registered at `@swamp/gcp/cloudasset/assets`. */
export const model = {
  type: "@swamp/gcp/cloudasset/assets",
  version: "2026.09.28.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An asset in Google Cloud. An asset can be any resource in the Google Cloud [r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          baseUrl,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
          credentials,
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
      description: "Sync assets state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific assets by name (e.g. one discovered by list)",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            baseUrl,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List assets resources",
      arguments: z.object({
        assetTypes: z.string().describe(
          'A list of asset types to take a snapshot for. For example: "compute.googleapis.com/Disk". Regular expression is also supported. For example: * "compute.googleapis.com.*" snapshots resources whose asset type starts with "compute.googleapis.com". * ".*Instance" snapshots resources whose asset type ends with "Instance". * ".*Instance.*" snapshots resources whose asset type contains "Instance". See [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported asset type, an INVALID_ARGUMENT error will be returned. If specified, only matching assets will be returned, otherwise, it will snapshot all asset types. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types.',
        ).optional(),
        contentType: z.string().describe(
          "Asset content type. If not specified, no content but the asset name will be returned.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of assets to be returned in a single response. Default is 100, minimum is 1, and maximum is 1000.",
        ).optional(),
        readTime: z.string().describe(
          "Timestamp to take an asset snapshot. This can only be set to a timestamp between the current time and the current time minus 35 days (inclusive). If not specified, the current time will be used. Due to delays in resource data collection and indexing, there is a volatile window during which running the same query may get different results.",
        ).optional(),
        relationshipTypes: z.string().describe(
          "A list of relationship types to output, for example: `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if content_type=RELATIONSHIP. * If specified: it snapshots specified relationships. It returns an error if any of the [relationship_types] doesn't belong to the supported relationship types of the [asset_types] or if any of the [asset_types] doesn't belong to the source types of the [relationship_types]. * Otherwise: it snapshots the supported relationships for all [asset_types] or returns an error if any of the [asset_types] has no relationship support. An unspecified asset types field means all supported asset_types. See [Introduction to Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all supported asset types and relationship types.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["assetTypes"] !== undefined) {
          params["assetTypes"] = String(args["assetTypes"]);
        }
        if (args["contentType"] !== undefined) {
          params["contentType"] = String(args["contentType"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["readTime"] !== undefined) {
          params["readTime"] = String(args["readTime"]);
        }
        if (args["relationshipTypes"] !== undefined) {
          params["relationshipTypes"] = String(args["relationshipTypes"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "assets",
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
    ...assetInventoryMethods,
  },
};
