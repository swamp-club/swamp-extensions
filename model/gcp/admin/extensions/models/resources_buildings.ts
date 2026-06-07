// Auto-generated extension model for @swamp/gcp/admin/resources-buildings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Resources.Buildings.
 *
 * Public API: Resources.buildings
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

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.resources.buildings.get",
  "path":
    "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
    "buildingId",
  ],
  "parameters": {
    "buildingId": {
      "location": "path",
      "required": true,
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.resources.buildings.insert",
  "path": "admin/directory/v1/customer/{customer}/resources/buildings",
  "httpMethod": "POST",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "coordinatesSource": {
      "location": "query",
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.resources.buildings.update",
  "path":
    "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customer",
    "buildingId",
  ],
  "parameters": {
    "buildingId": {
      "location": "path",
      "required": true,
    },
    "coordinatesSource": {
      "location": "query",
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.resources.buildings.delete",
  "path":
    "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customer",
    "buildingId",
  ],
  "parameters": {
    "buildingId": {
      "location": "path",
      "required": true,
    },
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.resources.buildings.list",
  "path": "admin/directory/v1/customer/{customer}/resources/buildings",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
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
  address: z.object({
    addressLines: z.array(z.string()).describe(
      "Unstructured address lines describing the lower levels of an address.",
    ).optional(),
    administrativeArea: z.string().describe(
      "Optional. Highest administrative subdivision which is used for postal addresses of a country or region.",
    ).optional(),
    languageCode: z.string().describe(
      "Optional. BCP-47 language code of the contents of this address (if known).",
    ).optional(),
    locality: z.string().describe(
      "Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use addressLines.",
    ).optional(),
    postalCode: z.string().describe("Optional. Postal code of the address.")
      .optional(),
    regionCode: z.string().describe(
      "Required. CLDR region code of the country/region of the address.",
    ).optional(),
    sublocality: z.string().describe("Optional. Sublocality of the address.")
      .optional(),
  }).describe("Public API: Resources.buildings").optional(),
  buildingId: z.string().describe(
    "Unique identifier for the building. The maximum length is 100 characters.",
  ).optional(),
  buildingName: z.string().describe(
    'The building name as seen by users in Calendar. Must be unique for the customer. For example, "NYC-CHEL". The maximum length is 100 characters.',
  ).optional(),
  coordinates: z.object({
    latitude: z.number().describe("Latitude in decimal degrees.").optional(),
    longitude: z.number().describe("Longitude in decimal degrees.").optional(),
  }).describe("Public API: Resources.buildings").optional(),
  description: z.string().describe(
    'A brief description of the building. For example, "Chelsea Market".',
  ).optional(),
  etags: z.string().describe("ETag of the resource.").optional(),
  floorNames: z.array(z.string()).describe(
    'The display names for all floors in this building. The floors are expected to be sorted in ascending order, from lowest floor to highest floor. For example, ["B2", "B1", "L", "1", "2", "2M", "3", "PH"] Must contain at least one entry.',
  ).optional(),
  customer: z.string().describe(
    "The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID.",
  ),
  coordinatesSource: z.string().describe(
    "Source from which Building.coordinates are derived.",
  ).optional(),
});

const StateSchema = z.object({
  address: z.object({
    addressLines: z.array(z.string()),
    administrativeArea: z.string(),
    languageCode: z.string(),
    locality: z.string(),
    postalCode: z.string(),
    regionCode: z.string(),
    sublocality: z.string(),
  }).optional(),
  buildingId: z.string().optional(),
  buildingName: z.string().optional(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  description: z.string().optional(),
  etags: z.string().optional(),
  floorNames: z.array(z.string()).optional(),
  kind: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  address: z.object({
    addressLines: z.array(z.string()).describe(
      "Unstructured address lines describing the lower levels of an address.",
    ).optional(),
    administrativeArea: z.string().describe(
      "Optional. Highest administrative subdivision which is used for postal addresses of a country or region.",
    ).optional(),
    languageCode: z.string().describe(
      "Optional. BCP-47 language code of the contents of this address (if known).",
    ).optional(),
    locality: z.string().describe(
      "Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use addressLines.",
    ).optional(),
    postalCode: z.string().describe("Optional. Postal code of the address.")
      .optional(),
    regionCode: z.string().describe(
      "Required. CLDR region code of the country/region of the address.",
    ).optional(),
    sublocality: z.string().describe("Optional. Sublocality of the address.")
      .optional(),
  }).describe("Public API: Resources.buildings").optional(),
  buildingId: z.string().describe(
    "Unique identifier for the building. The maximum length is 100 characters.",
  ).optional(),
  buildingName: z.string().describe(
    'The building name as seen by users in Calendar. Must be unique for the customer. For example, "NYC-CHEL". The maximum length is 100 characters.',
  ).optional(),
  coordinates: z.object({
    latitude: z.number().describe("Latitude in decimal degrees.").optional(),
    longitude: z.number().describe("Longitude in decimal degrees.").optional(),
  }).describe("Public API: Resources.buildings").optional(),
  description: z.string().describe(
    'A brief description of the building. For example, "Chelsea Market".',
  ).optional(),
  etags: z.string().describe("ETag of the resource.").optional(),
  floorNames: z.array(z.string()).describe(
    'The display names for all floors in this building. The floors are expected to be sorted in ascending order, from lowest floor to highest floor. For example, ["B2", "B1", "L", "1", "2", "2M", "3", "PH"] Must contain at least one entry.',
  ).optional(),
  customer: z.string().describe(
    "The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID.",
  ).optional(),
  coordinatesSource: z.string().describe(
    "Source from which Building.coordinates are derived.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Admin SDK Resources.Buildings. Registered at `@swamp/gcp/admin/resources-buildings`. */
export const model = {
  type: "@swamp/gcp/admin/resources-buildings",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Public API: Resources.buildings",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a buildings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        const body: Record<string, unknown> = {};
        if (g["address"] !== undefined) body["address"] = g["address"];
        if (g["buildingId"] !== undefined) body["buildingId"] = g["buildingId"];
        if (g["buildingName"] !== undefined) {
          body["buildingName"] = g["buildingName"];
        }
        if (g["coordinates"] !== undefined) {
          body["coordinates"] = g["coordinates"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["etags"] !== undefined) body["etags"] = g["etags"];
        if (g["floorNames"] !== undefined) body["floorNames"] = g["floorNames"];
        if (g["coordinatesSource"] !== undefined) {
          body["coordinatesSource"] = g["coordinatesSource"];
        }
        if (g["name"] !== undefined) params["buildingId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "customer": String(g["customer"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a buildings",
      arguments: z.object({
        identifier: z.string().describe("The name of the buildings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["buildingId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
    update: {
      description: "Update buildings attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        } else if (existing["customer"]) {
          params["customer"] = String(existing["customer"]);
        }
        params["buildingId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["address"] !== undefined) body["address"] = g["address"];
        if (g["buildingName"] !== undefined) {
          body["buildingName"] = g["buildingName"];
        }
        if (g["coordinates"] !== undefined) {
          body["coordinates"] = g["coordinates"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["etags"] !== undefined) body["etags"] = g["etags"];
        if (g["floorNames"] !== undefined) body["floorNames"] = g["floorNames"];
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
      description: "Delete the buildings",
      arguments: z.object({
        identifier: z.string().describe("The name of the buildings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["buildingId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync buildings state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          if (g["customer"] !== undefined) {
            params["customer"] = String(g["customer"]);
          } else if (existing["customer"]) {
            params["customer"] = String(existing["customer"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["buildingId"] = identifier;
          const result = await readResource(
            BASE_URL,
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
      description: "List buildings resources",
      arguments: z.object({
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "buildings",
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
