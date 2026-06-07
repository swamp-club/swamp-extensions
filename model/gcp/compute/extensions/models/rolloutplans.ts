// Auto-generated extension model for @swamp/gcp/compute/rolloutplans
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RolloutPlans.
 *
 * RolloutPlan resource. A RolloutPlan is the customer-defined strategy to divide a large-scale change into smaller increments, referred to as "waves". Each wave targets a specific portion of the overall affected area and defines criteria that must be met before progressing to the subsequent wave.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.rolloutPlans.get",
  "path": "projects/{project}/global/rolloutPlans/{rolloutPlan}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "rolloutPlan",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "rolloutPlan": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.rolloutPlans.insert",
  "path": "projects/{project}/global/rolloutPlans",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.rolloutPlans.delete",
  "path": "projects/{project}/global/rolloutPlans/{rolloutPlan}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "rolloutPlan",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "rolloutPlan": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.rolloutPlans.list",
  "path": "projects/{project}/global/rolloutPlans",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
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
    "returnPartialSuccess": {
      "location": "query",
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
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  locationScope: z.enum(["LOCATION_SCOPE_UNSPECIFIED", "REGIONAL", "ZONAL"])
    .describe(
      "The location scope of the rollout plan. If not specified, the location scope is considered as ZONAL.",
    ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  waves: z.array(z.object({
    displayName: z.string().describe(
      "Optional. The display name of this wave of the rollout plan.",
    ).optional(),
    number: z.string().describe("Output only. The wave number.").optional(),
    orchestrationOptions: z.object({
      delays: z.array(z.object({
        delimiter: z.unknown().describe(
          "Optional. Controls whether the delay should only be added between batches of projects corresponding to different locations, or also between batches of projects corresponding to the same location. Must be set to DELIMITER_UNSPECIFIED if no delay is to be added.",
        ).optional(),
        duration: z.unknown().describe(
          "Optional. The duration of the delay, if any, to be added between batches of projects. A zero duration corresponds to no delay.",
        ).optional(),
        type: z.unknown().describe(
          "Optional. Controls whether the specified duration is to be added at the end of each batch, or if the total processing time for each batch will be padded if needed to meet the specified duration. Must be set to TYPE_UNSPECIFIED if no delay is to be added.",
        ).optional(),
      })).describe(
        "Optional. Delays, if any, to be added between batches of projects. We allow multiple Delays to be specified, letting users set separate delays between batches of projects corresponding to different locations and batches of projects corresponding to the same location.",
      ).optional(),
      maxConcurrentLocations: z.string().describe(
        "Optional. Maximum number of locations to be orchestrated in parallel.",
      ).optional(),
      maxConcurrentResourcesPerLocation: z.string().describe(
        "Optional. Maximum number of resources to be orchestrated per location in parallel.",
      ).optional(),
    }).describe(
      "Options to control the pace of orchestration of a wave. These options are required only if the resource being rolled out follows the Orchestrated pattern.",
    ).optional(),
    selectors: z.array(z.object({
      locationSelector: z.object({
        includedLocations: z.unknown().describe(
          'Optional. Example: "us-central1-a"',
        ).optional(),
      }).describe("Roll out to resources by location.").optional(),
      resourceHierarchySelector: z.object({
        includedFolders: z.unknown().describe(
          'Optional. Format: "folders/{folder_id}"',
        ).optional(),
        includedOrganizations: z.unknown().describe(
          'Optional. Format: "organizations/{organization_id}"',
        ).optional(),
        includedProjects: z.unknown().describe(
          'Optional. Format: "projects/{project_id}"',
        ).optional(),
      }).describe(
        "Roll out to resources by Cloud Resource Manager resource hierarchy nodes such as projects, folders, orgs.",
      ).optional(),
    })).describe(
      "Required. The selectors for this wave. There is a logical AND between each selector defined in a wave, so a resource must satisfy the criteria of *all* the specified selectors to be in scope for the wave.",
    ).optional(),
    validation: z.object({
      timeBasedValidationMetadata: z.object({
        waitDuration: z.string().describe(
          "Optional. The duration that the system waits in between waves. This wait starts after all changes in the wave are rolled out.",
        ).optional(),
      }).describe('Metadata required if type = "time".').optional(),
      type: z.string().describe(
        'Required. The type of the validation. If a type of validation is associated with a metadata object, the appropriate metadata field mapping to the validation type must be provided in the validation message. Possible values are in quotes below alongside an explanation: "manual": The system waits for an end-user approval API before progressing to the next wave. "time": The system waits for a user specified duration before progressing to the next wave. TimeBasedValidation must be provided.',
      ).optional(),
    }).describe(
      "The validation to be performed before progressing to the next wave.",
    ).optional(),
  })).describe("Required. The waves included in this rollout plan.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  locationScope: z.string().optional(),
  name: z.string(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  waves: z.array(z.object({
    displayName: z.string(),
    number: z.string(),
    orchestrationOptions: z.object({
      delays: z.array(z.object({
        delimiter: z.unknown(),
        duration: z.unknown(),
        type: z.unknown(),
      })),
      maxConcurrentLocations: z.string(),
      maxConcurrentResourcesPerLocation: z.string(),
    }),
    selectors: z.array(z.object({
      locationSelector: z.object({
        includedLocations: z.unknown(),
      }),
      resourceHierarchySelector: z.object({
        includedFolders: z.unknown(),
        includedOrganizations: z.unknown(),
        includedProjects: z.unknown(),
      }),
    })),
    validation: z.object({
      timeBasedValidationMetadata: z.object({
        waitDuration: z.string(),
      }),
      type: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  locationScope: z.enum(["LOCATION_SCOPE_UNSPECIFIED", "REGIONAL", "ZONAL"])
    .describe(
      "The location scope of the rollout plan. If not specified, the location scope is considered as ZONAL.",
    ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  waves: z.array(z.object({
    displayName: z.string().describe(
      "Optional. The display name of this wave of the rollout plan.",
    ).optional(),
    number: z.string().describe("Output only. The wave number.").optional(),
    orchestrationOptions: z.object({
      delays: z.array(z.object({
        delimiter: z.unknown().describe(
          "Optional. Controls whether the delay should only be added between batches of projects corresponding to different locations, or also between batches of projects corresponding to the same location. Must be set to DELIMITER_UNSPECIFIED if no delay is to be added.",
        ).optional(),
        duration: z.unknown().describe(
          "Optional. The duration of the delay, if any, to be added between batches of projects. A zero duration corresponds to no delay.",
        ).optional(),
        type: z.unknown().describe(
          "Optional. Controls whether the specified duration is to be added at the end of each batch, or if the total processing time for each batch will be padded if needed to meet the specified duration. Must be set to TYPE_UNSPECIFIED if no delay is to be added.",
        ).optional(),
      })).describe(
        "Optional. Delays, if any, to be added between batches of projects. We allow multiple Delays to be specified, letting users set separate delays between batches of projects corresponding to different locations and batches of projects corresponding to the same location.",
      ).optional(),
      maxConcurrentLocations: z.string().describe(
        "Optional. Maximum number of locations to be orchestrated in parallel.",
      ).optional(),
      maxConcurrentResourcesPerLocation: z.string().describe(
        "Optional. Maximum number of resources to be orchestrated per location in parallel.",
      ).optional(),
    }).describe(
      "Options to control the pace of orchestration of a wave. These options are required only if the resource being rolled out follows the Orchestrated pattern.",
    ).optional(),
    selectors: z.array(z.object({
      locationSelector: z.object({
        includedLocations: z.unknown().describe(
          'Optional. Example: "us-central1-a"',
        ).optional(),
      }).describe("Roll out to resources by location.").optional(),
      resourceHierarchySelector: z.object({
        includedFolders: z.unknown().describe(
          'Optional. Format: "folders/{folder_id}"',
        ).optional(),
        includedOrganizations: z.unknown().describe(
          'Optional. Format: "organizations/{organization_id}"',
        ).optional(),
        includedProjects: z.unknown().describe(
          'Optional. Format: "projects/{project_id}"',
        ).optional(),
      }).describe(
        "Roll out to resources by Cloud Resource Manager resource hierarchy nodes such as projects, folders, orgs.",
      ).optional(),
    })).describe(
      "Required. The selectors for this wave. There is a logical AND between each selector defined in a wave, so a resource must satisfy the criteria of *all* the specified selectors to be in scope for the wave.",
    ).optional(),
    validation: z.object({
      timeBasedValidationMetadata: z.object({
        waitDuration: z.string().describe(
          "Optional. The duration that the system waits in between waves. This wait starts after all changes in the wave are rolled out.",
        ).optional(),
      }).describe('Metadata required if type = "time".').optional(),
      type: z.string().describe(
        'Required. The type of the validation. If a type of validation is associated with a metadata object, the appropriate metadata field mapping to the validation type must be provided in the validation message. Possible values are in quotes below alongside an explanation: "manual": The system waits for an end-user approval API before progressing to the next wave. "time": The system waits for a user specified duration before progressing to the next wave. TimeBasedValidation must be provided.',
      ).optional(),
    }).describe(
      "The validation to be performed before progressing to the next wave.",
    ).optional(),
  })).describe("Required. The waves included in this rollout plan.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Compute Engine RolloutPlans. Registered at `@swamp/gcp/compute/rolloutplans`. */
export const model = {
  type: "@swamp/gcp/compute/rolloutplans",
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
      description:
        "RolloutPlan resource. A RolloutPlan is the customer-defined strategy to divid...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rolloutPlans",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["locationScope"] !== undefined) {
          body["locationScope"] = g["locationScope"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["waves"] !== undefined) body["waves"] = g["waves"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["rolloutPlan"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a rolloutPlans",
      arguments: z.object({
        identifier: z.string().describe("The name of the rolloutPlans"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["rolloutPlan"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    delete: {
      description: "Delete the rolloutPlans",
      arguments: z.object({
        identifier: z.string().describe("The name of the rolloutPlans"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["rolloutPlan"] = args.identifier;
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
      description: "Sync rolloutPlans state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["rolloutPlan"] = identifier;
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
      description: "List rolloutPlans resources",
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
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
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
  },
};
