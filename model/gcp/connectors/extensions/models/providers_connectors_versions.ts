// Auto-generated extension model for @swamp/gcp/connectors/providers-connectors-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Providers.Connectors.Versions.
 *
 * ConnectorVersion indicates a specific version of a connector.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/versions/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id": "connectors.projects.locations.providers.connectors.versions.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "connectors.projects.locations.providers.connectors.versions.list",
  "path": "v1/{+parent}/versions",
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
    "view": {
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authConfigTemplates: z.array(z.object({
    authKey: z.string(),
    authType: z.string(),
    configVariableTemplates: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.unknown(),
        clientSecret: z.unknown(),
        enablePkce: z.unknown(),
        omitQueryParams: z.unknown(),
        scopes: z.unknown(),
        uri: z.unknown(),
      }),
      description: z.string(),
      displayName: z.string(),
      enumOptions: z.array(z.unknown()),
      enumSource: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      locationType: z.string(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.unknown(),
        multipleSelectOptions: z.unknown(),
        valueSeparator: z.unknown(),
      }),
      required: z.boolean(),
      requiredCondition: z.object({
        fieldComparisons: z.unknown(),
        logicalExpressions: z.unknown(),
        logicalOperator: z.unknown(),
      }),
      roleGrant: z.object({
        helperTextTemplate: z.unknown(),
        principal: z.unknown(),
        resource: z.unknown(),
        roles: z.unknown(),
      }),
      state: z.string(),
      validationRegex: z.string(),
      valueType: z.string(),
    })),
    description: z.string(),
    displayName: z.string(),
    isDefault: z.boolean(),
  })).optional(),
  authOverrideEnabled: z.boolean().optional(),
  configVariableTemplates: z.array(z.object({
    authorizationCodeLink: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
      enablePkce: z.boolean(),
      omitQueryParams: z.boolean(),
      scopes: z.array(z.string()),
      uri: z.string(),
    }),
    description: z.string(),
    displayName: z.string(),
    enumOptions: z.array(z.object({
      displayName: z.string(),
      id: z.string(),
    })),
    enumSource: z.string(),
    isAdvanced: z.boolean(),
    key: z.string(),
    locationType: z.string(),
    multipleSelectConfig: z.object({
      allowCustomValues: z.boolean(),
      multipleSelectOptions: z.array(z.object({
        description: z.unknown(),
        displayName: z.unknown(),
        key: z.unknown(),
        preselected: z.unknown(),
      })),
      valueSeparator: z.string(),
    }),
    required: z.boolean(),
    requiredCondition: z.object({
      fieldComparisons: z.array(z.object({
        boolValue: z.unknown(),
        comparator: z.unknown(),
        intValue: z.unknown(),
        key: z.unknown(),
        stringValue: z.unknown(),
      })),
      logicalExpressions: z.array(z.record(z.string(), z.unknown())),
      logicalOperator: z.string(),
    }),
    roleGrant: z.object({
      helperTextTemplate: z.string(),
      principal: z.string(),
      resource: z.object({
        pathTemplate: z.string(),
        type: z.string(),
      }),
      roles: z.array(z.string()),
    }),
    state: z.string(),
    validationRegex: z.string(),
    valueType: z.string(),
  })).optional(),
  connectorInfraConfig: z.object({
    alwaysAllocateCpu: z.boolean(),
    connectionRatelimitWindowSeconds: z.string(),
    connectionServiceAccountEnabled: z.boolean(),
    connectorVersioningEnabled: z.boolean(),
    deploymentModel: z.string(),
    hpaConfig: z.object({
      cpuUtilizationThreshold: z.string(),
      memoryUtilizationThreshold: z.string(),
    }),
    internalclientRatelimitThreshold: z.string(),
    maxInstanceRequestConcurrency: z.number(),
    migrateDeploymentModel: z.boolean(),
    migrateTls: z.boolean(),
    networkEgressModeOverride: z.object({
      isEventingOverrideEnabled: z.boolean(),
      isJobsOverrideEnabled: z.boolean(),
      networkEgressMode: z.string(),
    }),
    provisionCloudSpanner: z.boolean(),
    provisionMemstore: z.boolean(),
    publicNetworkIngressEnabled: z.boolean(),
    ratelimitThreshold: z.string(),
    resourceLimits: z.object({
      cpu: z.string(),
      memory: z.string(),
    }),
    resourceRequests: z.object({
      cpu: z.string(),
      memory: z.string(),
    }),
    sharedDeployment: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  destinationConfigTemplates: z.array(z.object({
    autocompleteSuggestions: z.array(z.string()),
    defaultPort: z.number(),
    description: z.string(),
    displayName: z.string(),
    isAdvanced: z.boolean(),
    key: z.string(),
    max: z.number(),
    min: z.number(),
    portFieldType: z.string(),
    regexPattern: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  egressControlConfig: z.object({
    accessMode: z.string(),
    additionalExtractionRules: z.object({
      extractionRule: z.array(z.object({
        extractionRegex: z.string(),
        formatString: z.string(),
        source: z.object({
          fieldId: z.unknown(),
          sourceType: z.unknown(),
        }),
      })),
    }),
    allowlistedProjectNumbers: z.array(z.string()),
    backends: z.string(),
    extractionRules: z.object({
      extractionRule: z.array(z.object({
        extractionRegex: z.string(),
        formatString: z.string(),
        source: z.object({
          fieldId: z.unknown(),
          sourceType: z.unknown(),
        }),
      })),
    }),
    launchEnvironment: z.string(),
  }).optional(),
  eventingConfigTemplate: z.object({
    additionalVariables: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.unknown(),
        }),
        enablePkce: z.boolean(),
        omitQueryParams: z.boolean(),
        scopes: z.array(z.unknown()),
        uri: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      enumOptions: z.array(z.object({
        displayName: z.unknown(),
        id: z.unknown(),
      })),
      enumSource: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      locationType: z.string(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.boolean(),
        multipleSelectOptions: z.array(z.unknown()),
        valueSeparator: z.string(),
      }),
      required: z.boolean(),
      requiredCondition: z.object({
        fieldComparisons: z.array(z.unknown()),
        logicalExpressions: z.array(z.unknown()),
        logicalOperator: z.string(),
      }),
      roleGrant: z.object({
        helperTextTemplate: z.string(),
        principal: z.string(),
        resource: z.object({
          pathTemplate: z.unknown(),
          type: z.unknown(),
        }),
        roles: z.array(z.unknown()),
      }),
      state: z.string(),
      validationRegex: z.string(),
      valueType: z.string(),
    })),
    authConfigTemplates: z.array(z.object({
      authKey: z.string(),
      authType: z.string(),
      configVariableTemplates: z.array(z.object({
        authorizationCodeLink: z.unknown(),
        description: z.unknown(),
        displayName: z.unknown(),
        enumOptions: z.unknown(),
        enumSource: z.unknown(),
        isAdvanced: z.unknown(),
        key: z.unknown(),
        locationType: z.unknown(),
        multipleSelectConfig: z.unknown(),
        required: z.unknown(),
        requiredCondition: z.unknown(),
        roleGrant: z.unknown(),
        state: z.unknown(),
        validationRegex: z.unknown(),
        valueType: z.unknown(),
      })),
      description: z.string(),
      displayName: z.string(),
      isDefault: z.boolean(),
    })),
    autoRefresh: z.boolean(),
    autoRegistrationSupported: z.boolean(),
    encryptionKeyTemplate: z.object({
      authorizationCodeLink: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.string(),
        }),
        enablePkce: z.boolean(),
        omitQueryParams: z.boolean(),
        scopes: z.array(z.string()),
        uri: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      enumOptions: z.array(z.object({
        displayName: z.string(),
        id: z.string(),
      })),
      enumSource: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      locationType: z.string(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.boolean(),
        multipleSelectOptions: z.array(z.object({
          description: z.unknown(),
          displayName: z.unknown(),
          key: z.unknown(),
          preselected: z.unknown(),
        })),
        valueSeparator: z.string(),
      }),
      required: z.boolean(),
      requiredCondition: z.object({
        fieldComparisons: z.array(z.object({
          boolValue: z.unknown(),
          comparator: z.unknown(),
          intValue: z.unknown(),
          key: z.unknown(),
          stringValue: z.unknown(),
        })),
        logicalExpressions: z.array(z.record(z.string(), z.unknown())),
        logicalOperator: z.string(),
      }),
      roleGrant: z.object({
        helperTextTemplate: z.string(),
        principal: z.string(),
        resource: z.object({
          pathTemplate: z.string(),
          type: z.string(),
        }),
        roles: z.array(z.string()),
      }),
      state: z.string(),
      validationRegex: z.string(),
      valueType: z.string(),
    }),
    enrichmentSupported: z.boolean(),
    eventListenerType: z.string(),
    isEventingSupported: z.boolean(),
    listenerAuthConfigTemplates: z.array(z.object({
      authKey: z.string(),
      authType: z.string(),
      configVariableTemplates: z.array(z.object({
        authorizationCodeLink: z.unknown(),
        description: z.unknown(),
        displayName: z.unknown(),
        enumOptions: z.unknown(),
        enumSource: z.unknown(),
        isAdvanced: z.unknown(),
        key: z.unknown(),
        locationType: z.unknown(),
        multipleSelectConfig: z.unknown(),
        required: z.unknown(),
        requiredCondition: z.unknown(),
        roleGrant: z.unknown(),
        state: z.unknown(),
        validationRegex: z.unknown(),
        valueType: z.unknown(),
      })),
      description: z.string(),
      displayName: z.string(),
      isDefault: z.boolean(),
    })),
    proxyDestinationConfig: z.object({
      autocompleteSuggestions: z.array(z.string()),
      defaultPort: z.number(),
      description: z.string(),
      displayName: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      max: z.number(),
      min: z.number(),
      portFieldType: z.string(),
      regexPattern: z.string(),
    }),
    registrationDestinationConfig: z.object({
      autocompleteSuggestions: z.array(z.string()),
      defaultPort: z.number(),
      description: z.string(),
      displayName: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      max: z.number(),
      min: z.number(),
      portFieldType: z.string(),
      regexPattern: z.string(),
    }),
    sslConfigTemplate: z.object({
      additionalVariables: z.array(z.object({
        authorizationCodeLink: z.object({
          clientId: z.unknown(),
          clientSecret: z.unknown(),
          enablePkce: z.unknown(),
          omitQueryParams: z.unknown(),
          scopes: z.unknown(),
          uri: z.unknown(),
        }),
        description: z.string(),
        displayName: z.string(),
        enumOptions: z.array(z.unknown()),
        enumSource: z.string(),
        isAdvanced: z.boolean(),
        key: z.string(),
        locationType: z.string(),
        multipleSelectConfig: z.object({
          allowCustomValues: z.unknown(),
          multipleSelectOptions: z.unknown(),
          valueSeparator: z.unknown(),
        }),
        required: z.boolean(),
        requiredCondition: z.object({
          fieldComparisons: z.unknown(),
          logicalExpressions: z.unknown(),
          logicalOperator: z.unknown(),
        }),
        roleGrant: z.object({
          helperTextTemplate: z.unknown(),
          principal: z.unknown(),
          resource: z.unknown(),
          roles: z.unknown(),
        }),
        state: z.string(),
        validationRegex: z.string(),
        valueType: z.string(),
      })),
      clientCertType: z.array(z.string()),
      isTlsMandatory: z.boolean(),
      serverCertType: z.array(z.string()),
      sslType: z.string(),
    }),
    triggerConfigVariables: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.unknown(),
        }),
        enablePkce: z.boolean(),
        omitQueryParams: z.boolean(),
        scopes: z.array(z.unknown()),
        uri: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      enumOptions: z.array(z.object({
        displayName: z.unknown(),
        id: z.unknown(),
      })),
      enumSource: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      locationType: z.string(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.boolean(),
        multipleSelectOptions: z.array(z.unknown()),
        valueSeparator: z.string(),
      }),
      required: z.boolean(),
      requiredCondition: z.object({
        fieldComparisons: z.array(z.unknown()),
        logicalExpressions: z.array(z.unknown()),
        logicalOperator: z.string(),
      }),
      roleGrant: z.object({
        helperTextTemplate: z.string(),
        principal: z.string(),
        resource: z.object({
          pathTemplate: z.unknown(),
          type: z.unknown(),
        }),
        roles: z.array(z.unknown()),
      }),
      state: z.string(),
      validationRegex: z.string(),
      valueType: z.string(),
    })),
  }).optional(),
  isCustomActionsSupported: z.boolean().optional(),
  isCustomEntitiesSupported: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  launchStage: z.string().optional(),
  name: z.string(),
  releaseVersion: z.string().optional(),
  roleGrant: z.object({
    helperTextTemplate: z.string(),
    principal: z.string(),
    resource: z.object({
      pathTemplate: z.string(),
      type: z.string(),
    }),
    roles: z.array(z.string()),
  }).optional(),
  roleGrants: z.array(z.object({
    helperTextTemplate: z.string(),
    principal: z.string(),
    resource: z.object({
      pathTemplate: z.string(),
      type: z.string(),
    }),
    roles: z.array(z.string()),
  })).optional(),
  schemaRefreshConfig: z.object({
    useActionDisplayNames: z.boolean(),
    useSynchronousSchemaRefresh: z.boolean(),
  }).optional(),
  sslConfigTemplate: z.object({
    additionalVariables: z.array(z.object({
      authorizationCodeLink: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.unknown(),
        }),
        enablePkce: z.boolean(),
        omitQueryParams: z.boolean(),
        scopes: z.array(z.unknown()),
        uri: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      enumOptions: z.array(z.object({
        displayName: z.unknown(),
        id: z.unknown(),
      })),
      enumSource: z.string(),
      isAdvanced: z.boolean(),
      key: z.string(),
      locationType: z.string(),
      multipleSelectConfig: z.object({
        allowCustomValues: z.boolean(),
        multipleSelectOptions: z.array(z.unknown()),
        valueSeparator: z.string(),
      }),
      required: z.boolean(),
      requiredCondition: z.object({
        fieldComparisons: z.array(z.unknown()),
        logicalExpressions: z.array(z.unknown()),
        logicalOperator: z.string(),
      }),
      roleGrant: z.object({
        helperTextTemplate: z.string(),
        principal: z.string(),
        resource: z.object({
          pathTemplate: z.unknown(),
          type: z.unknown(),
        }),
        roles: z.array(z.unknown()),
      }),
      state: z.string(),
      validationRegex: z.string(),
      valueType: z.string(),
    })),
    clientCertType: z.array(z.string()),
    isTlsMandatory: z.boolean(),
    serverCertType: z.array(z.string()),
    sslType: z.string(),
  }).optional(),
  supportedRuntimeFeatures: z.object({
    actionApis: z.boolean(),
    asyncOperations: z.boolean(),
    entityApis: z.boolean(),
    sqlQuery: z.boolean(),
  }).optional(),
  supportedStandardActions: z.array(z.object({
    name: z.string(),
  })).optional(),
  supportedStandardEntities: z.array(z.object({
    name: z.string(),
  })).optional(),
  unsupportedConnectionTypes: z.array(z.string()).optional(),
  updateTime: z.string().optional(),
  vpcscConfig: z.object({
    defaultAllowlistedHost: z.array(z.string()),
    disableFirewallVpcscFlow: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Connectors Providers.Connectors.Versions. Registered at `@swamp/gcp/connectors/providers-connectors-versions`. */
export const model = {
  type: "@swamp/gcp/connectors/providers-connectors-versions",
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
        "ConnectorVersion indicates a specific version of a connector.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
    sync: {
      description: "Sync versions state from GCP",
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
      description: "List versions resources",
      arguments: z.object({
        pageSize: z.number().describe("Page size.").optional(),
        view: z.string().describe(
          "Specifies which fields of the ConnectorVersion are returned in the response. Defaults to `BASIC` view.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "connectorVersions",
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
    fetch_auth_schema: {
      description: "fetch auth schema",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id":
              "connectors.projects.locations.providers.connectors.versions.fetchAuthSchema",
            "path": "v1/{+name}:fetchAuthSchema",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "view": { "location": "query" },
            },
          },
          params,
          {},
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
