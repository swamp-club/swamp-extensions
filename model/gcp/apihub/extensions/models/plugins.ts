// Auto-generated extension model for @swamp/gcp/apihub/plugins
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud API hub Plugins.
 *
 * A plugin resource in the API Hub.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/plugins/${shortName}`;
}

const BASE_URL = "https://apihub.googleapis.com/";

const GET_CONFIG = {
  "id": "apihub.projects.locations.plugins.get",
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
  "id": "apihub.projects.locations.plugins.create",
  "path": "v1/{+parent}/plugins",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "pluginId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "apihub.projects.locations.plugins.delete",
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
  "id": "apihub.projects.locations.plugins.list",
  "path": "v1/{+parent}/plugins",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  actionsConfig: z.array(z.object({
    description: z.string().describe(
      "Required. The description of the operation performed by the action.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The display name of the action.",
    ).optional(),
    id: z.string().describe("Required. The id of the action.").optional(),
    triggerMode: z.enum([
      "TRIGGER_MODE_UNSPECIFIED",
      "API_HUB_ON_DEMAND_TRIGGER",
      "API_HUB_SCHEDULE_TRIGGER",
      "NON_API_HUB_MANAGED",
    ]).describe("Required. The trigger mode supported by the action.")
      .optional(),
  })).describe(
    "Optional. The configuration of actions supported by the plugin. **REQUIRED**: This field must be provided when creating or updating a Plugin. The server will reject requests if this field is missing.",
  ).optional(),
  configTemplate: z.object({
    additionalConfigTemplate: z.array(z.object({
      description: z.string().describe("Optional. Description.").optional(),
      enumOptions: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Description of the option.",
        ).optional(),
        displayName: z.unknown().describe(
          "Required. Display name of the option.",
        ).optional(),
        id: z.unknown().describe("Required. Id of the option.").optional(),
      })).describe(
        "Optional. Enum options. To be populated if `ValueType` is `ENUM`.",
      ).optional(),
      id: z.string().describe(
        "Required. ID of the config variable. Must be unique within the configuration.",
      ).optional(),
      multiSelectOptions: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Description of the option.",
        ).optional(),
        displayName: z.unknown().describe(
          "Required. Display name of the option.",
        ).optional(),
        id: z.unknown().describe("Required. Id of the option.").optional(),
      })).describe(
        "Optional. Multi select options. To be populated if `ValueType` is `MULTI_SELECT`.",
      ).optional(),
      required: z.boolean().describe(
        "Optional. Flag represents that this `ConfigVariable` must be provided for a PluginInstance.",
      ).optional(),
      validationRegex: z.string().describe(
        "Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`.",
      ).optional(),
      valueType: z.enum([
        "VALUE_TYPE_UNSPECIFIED",
        "STRING",
        "INT",
        "BOOL",
        "SECRET",
        "ENUM",
        "MULTI_SELECT",
        "MULTI_STRING",
        "MULTI_INT",
      ]).describe("Required. Type of the parameter: string, int, bool etc.")
        .optional(),
    })).describe(
      "Optional. The list of additional configuration variables for the plugin's configuration.",
    ).optional(),
    authConfigTemplate: z.object({
      serviceAccount: z.object({
        serviceAccount: z.string().describe(
          "Required. The service account to be used for authenticating request. The `iam.serviceAccounts.getAccessToken` permission should be granted on this service account to the impersonator service account.",
        ).optional(),
      }).describe("Config for Google service account authentication.")
        .optional(),
      supportedAuthTypes: z.array(
        z.enum([
          "AUTH_TYPE_UNSPECIFIED",
          "NO_AUTH",
          "GOOGLE_SERVICE_ACCOUNT",
          "USER_PASSWORD",
          "API_KEY",
          "OAUTH2_CLIENT_CREDENTIALS",
        ]),
      ).describe(
        "Required. The list of authentication types supported by the plugin.",
      ).optional(),
    }).describe(
      "AuthConfigTemplate represents the authentication template for a plugin.",
    ).optional(),
  }).describe(
    "ConfigTemplate represents the configuration template for a plugin.",
  ).optional(),
  description: z.string().describe(
    "Optional. The plugin description. Max length is 2000 characters (Unicode code points).",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the plugin. Max length is 50 characters (Unicode code points).",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  gatewayType: z.enum([
    "GATEWAY_TYPE_UNSPECIFIED",
    "APIGEE_X_AND_HYBRID",
    "APIGEE_EDGE_PUBLIC_CLOUD",
    "APIGEE_EDGE_PRIVATE_CLOUD",
    "CLOUD_API_GATEWAY",
    "CLOUD_ENDPOINTS",
    "API_DISCOVERY",
    "OTHERS",
  ]).describe("Optional. The type of the gateway.").optional(),
  hostingService: z.object({
    serviceUri: z.string().describe(
      "Optional. The URI of the service implemented by the plugin developer, used to invoke the plugin's functionality. This information is only required for user defined plugins.",
    ).optional(),
  }).describe(
    "The information related to the service implemented by the plugin developer, used to invoke the plugin's functionality.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the plugin. Format: `projects/{project}/locations/{location}/plugins/{plugin}`",
  ).optional(),
  pluginCategory: z.enum([
    "PLUGIN_CATEGORY_UNSPECIFIED",
    "API_GATEWAY",
    "API_PRODUCER",
  ]).describe(
    "Optional. The category of the plugin, identifying its primary category or purpose. This field is required for all plugins.",
  ).optional(),
  type: z.object({
    attribute: z.string().describe(
      "Output only. The name of the attribute. Format: projects/{project}/locations/{location}/attributes/{attribute}",
    ).optional(),
    enumValues: z.object({
      values: z.array(z.object({
        description: z.string().describe(
          "Optional. The detailed description of the allowed value.",
        ).optional(),
        displayName: z.string().describe(
          "Required. The display name of the allowed value.",
        ).optional(),
        id: z.string().describe(
          "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 4-63 characters, and valid characters are /a-z-/.",
        ).optional(),
        immutable: z.boolean().describe(
          "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
        ).optional(),
      })).describe(
        "Required. The attribute values in case attribute data type is enum.",
      ).optional(),
    }).describe("The attribute values of data type enum.").optional(),
    jsonValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    stringValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    uriValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
  }).describe("The attribute values associated with resource.").optional(),
  pluginId: z.string().describe(
    "Optional. The ID to use for the Plugin resource, which will become the final component of the Plugin's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another Plugin resource in the API hub instance. * If not provided, a system generated id will be used. This value should be 4-63 characters, overall resource name which will be of format `projects/{project}/locations/{location}/plugins/{plugin}`, its length is limited to 1000 characters and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  actionsConfig: z.array(z.object({
    description: z.string(),
    displayName: z.string(),
    id: z.string(),
    triggerMode: z.string(),
  })).optional(),
  configTemplate: z.object({
    additionalConfigTemplate: z.array(z.object({
      description: z.string(),
      enumOptions: z.array(z.object({
        description: z.unknown(),
        displayName: z.unknown(),
        id: z.unknown(),
      })),
      id: z.string(),
      multiSelectOptions: z.array(z.object({
        description: z.unknown(),
        displayName: z.unknown(),
        id: z.unknown(),
      })),
      required: z.boolean(),
      validationRegex: z.string(),
      valueType: z.string(),
    })),
    authConfigTemplate: z.object({
      serviceAccount: z.object({
        serviceAccount: z.string(),
      }),
      supportedAuthTypes: z.array(z.string()),
    }),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  documentation: z.object({
    externalUri: z.string(),
  }).optional(),
  gatewayType: z.string().optional(),
  hostingService: z.object({
    serviceUri: z.string(),
  }).optional(),
  name: z.string(),
  ownershipType: z.string().optional(),
  pluginCategory: z.string().optional(),
  state: z.string().optional(),
  type: z.object({
    attribute: z.string(),
    enumValues: z.object({
      values: z.array(z.object({
        description: z.string(),
        displayName: z.string(),
        id: z.string(),
        immutable: z.boolean(),
      })),
    }),
    jsonValues: z.object({
      values: z.array(z.string()),
    }),
    stringValues: z.object({
      values: z.array(z.string()),
    }),
    uriValues: z.object({
      values: z.array(z.string()),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  actionsConfig: z.array(z.object({
    description: z.string().describe(
      "Required. The description of the operation performed by the action.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The display name of the action.",
    ).optional(),
    id: z.string().describe("Required. The id of the action.").optional(),
    triggerMode: z.enum([
      "TRIGGER_MODE_UNSPECIFIED",
      "API_HUB_ON_DEMAND_TRIGGER",
      "API_HUB_SCHEDULE_TRIGGER",
      "NON_API_HUB_MANAGED",
    ]).describe("Required. The trigger mode supported by the action.")
      .optional(),
  })).describe(
    "Optional. The configuration of actions supported by the plugin. **REQUIRED**: This field must be provided when creating or updating a Plugin. The server will reject requests if this field is missing.",
  ).optional(),
  configTemplate: z.object({
    additionalConfigTemplate: z.array(z.object({
      description: z.string().describe("Optional. Description.").optional(),
      enumOptions: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Description of the option.",
        ).optional(),
        displayName: z.unknown().describe(
          "Required. Display name of the option.",
        ).optional(),
        id: z.unknown().describe("Required. Id of the option.").optional(),
      })).describe(
        "Optional. Enum options. To be populated if `ValueType` is `ENUM`.",
      ).optional(),
      id: z.string().describe(
        "Required. ID of the config variable. Must be unique within the configuration.",
      ).optional(),
      multiSelectOptions: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Description of the option.",
        ).optional(),
        displayName: z.unknown().describe(
          "Required. Display name of the option.",
        ).optional(),
        id: z.unknown().describe("Required. Id of the option.").optional(),
      })).describe(
        "Optional. Multi select options. To be populated if `ValueType` is `MULTI_SELECT`.",
      ).optional(),
      required: z.boolean().describe(
        "Optional. Flag represents that this `ConfigVariable` must be provided for a PluginInstance.",
      ).optional(),
      validationRegex: z.string().describe(
        "Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`.",
      ).optional(),
      valueType: z.enum([
        "VALUE_TYPE_UNSPECIFIED",
        "STRING",
        "INT",
        "BOOL",
        "SECRET",
        "ENUM",
        "MULTI_SELECT",
        "MULTI_STRING",
        "MULTI_INT",
      ]).describe("Required. Type of the parameter: string, int, bool etc.")
        .optional(),
    })).describe(
      "Optional. The list of additional configuration variables for the plugin's configuration.",
    ).optional(),
    authConfigTemplate: z.object({
      serviceAccount: z.object({
        serviceAccount: z.string().describe(
          "Required. The service account to be used for authenticating request. The `iam.serviceAccounts.getAccessToken` permission should be granted on this service account to the impersonator service account.",
        ).optional(),
      }).describe("Config for Google service account authentication.")
        .optional(),
      supportedAuthTypes: z.array(
        z.enum([
          "AUTH_TYPE_UNSPECIFIED",
          "NO_AUTH",
          "GOOGLE_SERVICE_ACCOUNT",
          "USER_PASSWORD",
          "API_KEY",
          "OAUTH2_CLIENT_CREDENTIALS",
        ]),
      ).describe(
        "Required. The list of authentication types supported by the plugin.",
      ).optional(),
    }).describe(
      "AuthConfigTemplate represents the authentication template for a plugin.",
    ).optional(),
  }).describe(
    "ConfigTemplate represents the configuration template for a plugin.",
  ).optional(),
  description: z.string().describe(
    "Optional. The plugin description. Max length is 2000 characters (Unicode code points).",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the plugin. Max length is 50 characters (Unicode code points).",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  gatewayType: z.enum([
    "GATEWAY_TYPE_UNSPECIFIED",
    "APIGEE_X_AND_HYBRID",
    "APIGEE_EDGE_PUBLIC_CLOUD",
    "APIGEE_EDGE_PRIVATE_CLOUD",
    "CLOUD_API_GATEWAY",
    "CLOUD_ENDPOINTS",
    "API_DISCOVERY",
    "OTHERS",
  ]).describe("Optional. The type of the gateway.").optional(),
  hostingService: z.object({
    serviceUri: z.string().describe(
      "Optional. The URI of the service implemented by the plugin developer, used to invoke the plugin's functionality. This information is only required for user defined plugins.",
    ).optional(),
  }).describe(
    "The information related to the service implemented by the plugin developer, used to invoke the plugin's functionality.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the plugin. Format: `projects/{project}/locations/{location}/plugins/{plugin}`",
  ).optional(),
  pluginCategory: z.enum([
    "PLUGIN_CATEGORY_UNSPECIFIED",
    "API_GATEWAY",
    "API_PRODUCER",
  ]).describe(
    "Optional. The category of the plugin, identifying its primary category or purpose. This field is required for all plugins.",
  ).optional(),
  type: z.object({
    attribute: z.string().describe(
      "Output only. The name of the attribute. Format: projects/{project}/locations/{location}/attributes/{attribute}",
    ).optional(),
    enumValues: z.object({
      values: z.array(z.object({
        description: z.string().describe(
          "Optional. The detailed description of the allowed value.",
        ).optional(),
        displayName: z.string().describe(
          "Required. The display name of the allowed value.",
        ).optional(),
        id: z.string().describe(
          "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 4-63 characters, and valid characters are /a-z-/.",
        ).optional(),
        immutable: z.boolean().describe(
          "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
        ).optional(),
      })).describe(
        "Required. The attribute values in case attribute data type is enum.",
      ).optional(),
    }).describe("The attribute values of data type enum.").optional(),
    jsonValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    stringValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    uriValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
  }).describe("The attribute values associated with resource.").optional(),
  pluginId: z.string().describe(
    "Optional. The ID to use for the Plugin resource, which will become the final component of the Plugin's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another Plugin resource in the API hub instance. * If not provided, a system generated id will be used. This value should be 4-63 characters, overall resource name which will be of format `projects/{project}/locations/{location}/plugins/{plugin}`, its length is limited to 1000 characters and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud API hub Plugins. Registered at `@swamp/gcp/apihub/plugins`. */
export const model = {
  type: "@swamp/gcp/apihub/plugins",
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
      description: "A plugin resource in the API Hub.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a plugins",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["actionsConfig"] !== undefined) {
          body["actionsConfig"] = g["actionsConfig"];
        }
        if (g["configTemplate"] !== undefined) {
          body["configTemplate"] = g["configTemplate"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["gatewayType"] !== undefined) {
          body["gatewayType"] = g["gatewayType"];
        }
        if (g["hostingService"] !== undefined) {
          body["hostingService"] = g["hostingService"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pluginCategory"] !== undefined) {
          body["pluginCategory"] = g["pluginCategory"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["pluginId"] !== undefined) body["pluginId"] = g["pluginId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a plugins",
      arguments: z.object({
        identifier: z.string().describe("The name of the plugins"),
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
    delete: {
      description: "Delete the plugins",
      arguments: z.object({
        identifier: z.string().describe("The name of the plugins"),
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
      description: "Sync plugins state from GCP",
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
    list: {
      description: "List plugins resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. An expression that filters the list of plugins. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string. The comparison operator must be one of: `<`, `>` or `=`. Filters are not case sensitive. The following fields in the `Plugins` are eligible for filtering: * `plugin_category` - The category of the Plugin. Allowed comparison operators: `=`. Expressions are combined with either `AND` logic operator or `OR` logical operator but not both of them together i.e. only one of the `AND` or `OR` operator can be used throughout the filter string and both the operators cannot be used together. No other logical operators are supported. At most three filter fields are allowed in the filter string and if provided more than that then `INVALID_ARGUMENT` error is returned by the API. Here are a few examples: * `plugin_category = ON_RAMP` - The plugin is of category on ramp.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of hub plugins to return. The service may return fewer than this value. If unspecified, at most 50 hub plugins will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "plugins",
          (args.maxPages as number | undefined) ?? 10,
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
    disable: {
      description: "disable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.disable",
            "path": "v1/{+name}:disable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    enable: {
      description: "enable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.enable",
            "path": "v1/{+name}:enable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_style_guide: {
      description: "get style guide",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.getStyleGuide",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    update_style_guide: {
      description: "update style guide",
      arguments: z.object({
        contents: z.any().optional(),
        linter: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["linter"] !== undefined) body["linter"] = args["linter"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apihub.projects.locations.plugins.updateStyleGuide",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
