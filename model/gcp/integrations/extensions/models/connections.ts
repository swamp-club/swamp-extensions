// Auto-generated extension model for @swamp/gcp/integrations/connections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Connections.
 *
 * Connection represents an instance of connector.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://integrations.googleapis.com/";

const LIST_CONFIG = {
  "id": "integrations.projects.locations.connections.list",
  "path": "v1/{+parent}/connections",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  asyncOperationsEnabled: z.boolean().optional(),
  authConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string(),
        type: z.string(),
      }),
      intValue: z.string(),
      key: z.string(),
      secretValue: z.object({
        secretVersion: z.string(),
      }),
      stringValue: z.string(),
    })),
    authKey: z.string(),
    authType: z.string(),
    oauth2AuthCodeFlow: z.object({
      authCode: z.string(),
      authUri: z.string(),
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
      enablePkce: z.boolean(),
      pkceVerifier: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2AuthCodeFlowGoogleManaged: z.object({
      authCode: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2ClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
    }),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string(),
      }),
      jwtClaims: z.object({
        audience: z.string(),
        issuer: z.string(),
        subject: z.string(),
      }),
    }),
    sshPublicKey: z.object({
      certType: z.string(),
      sshClientCert: z.object({
        secretVersion: z.string(),
      }),
      sshClientCertPass: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
  }).optional(),
  authOverrideEnabled: z.boolean().optional(),
  billingConfig: z.object({
    billingCategory: z.string(),
  }).optional(),
  configVariables: z.array(z.object({
    boolValue: z.boolean(),
    encryptionKeyValue: z.object({
      kmsKeyName: z.string(),
      type: z.string(),
    }),
    intValue: z.string(),
    key: z.string(),
    secretValue: z.object({
      secretVersion: z.string(),
    }),
    stringValue: z.string(),
  })).optional(),
  connectionRevision: z.string().optional(),
  connectorVersion: z.string().optional(),
  connectorVersionInfraConfig: z.object({
    connectionRatelimitWindowSeconds: z.string(),
    deploymentModel: z.string(),
    deploymentModelMigrationState: z.string(),
    hpaConfig: z.object({
      cpuUtilizationThreshold: z.string(),
      memoryUtilizationThreshold: z.string(),
    }),
    internalclientRatelimitThreshold: z.string(),
    maxInstanceRequestConcurrency: z.number(),
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
    tlsMigrationState: z.string(),
  }).optional(),
  connectorVersionLaunchStage: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destinationConfigs: z.array(z.object({
    destinations: z.array(z.object({
      host: z.string(),
      port: z.number(),
      serviceAttachment: z.string(),
    })),
    key: z.string(),
  })).optional(),
  envoyImageLocation: z.string().optional(),
  euaOauthAuthConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string(),
        type: z.string(),
      }),
      intValue: z.string(),
      key: z.string(),
      secretValue: z.object({
        secretVersion: z.string(),
      }),
      stringValue: z.string(),
    })),
    authKey: z.string(),
    authType: z.string(),
    oauth2AuthCodeFlow: z.object({
      authCode: z.string(),
      authUri: z.string(),
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
      enablePkce: z.boolean(),
      pkceVerifier: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2AuthCodeFlowGoogleManaged: z.object({
      authCode: z.string(),
      redirectUri: z.string(),
      scopes: z.array(z.string()),
    }),
    oauth2ClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        secretVersion: z.string(),
      }),
    }),
    oauth2JwtBearer: z.object({
      clientKey: z.object({
        secretVersion: z.string(),
      }),
      jwtClaims: z.object({
        audience: z.string(),
        issuer: z.string(),
        subject: z.string(),
      }),
    }),
    sshPublicKey: z.object({
      certType: z.string(),
      sshClientCert: z.object({
        secretVersion: z.string(),
      }),
      sshClientCertPass: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
    userPassword: z.object({
      password: z.object({
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
  }).optional(),
  eventingConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string(),
        type: z.string(),
      }),
      intValue: z.string(),
      key: z.string(),
      secretValue: z.object({
        secretVersion: z.string(),
      }),
      stringValue: z.string(),
    })),
    allowedEventTypes: z.array(z.string()),
    authConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      authKey: z.string(),
      authType: z.string(),
      oauth2AuthCodeFlow: z.object({
        authCode: z.string(),
        authUri: z.string(),
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.string(),
        }),
        enablePkce: z.boolean(),
        pkceVerifier: z.string(),
        redirectUri: z.string(),
        scopes: z.array(z.string()),
      }),
      oauth2AuthCodeFlowGoogleManaged: z.object({
        authCode: z.string(),
        redirectUri: z.string(),
        scopes: z.array(z.string()),
      }),
      oauth2ClientCredentials: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.string(),
        }),
      }),
      oauth2JwtBearer: z.object({
        clientKey: z.object({
          secretVersion: z.string(),
        }),
        jwtClaims: z.object({
          audience: z.string(),
          issuer: z.string(),
          subject: z.string(),
        }),
      }),
      sshPublicKey: z.object({
        certType: z.string(),
        sshClientCert: z.object({
          secretVersion: z.string(),
        }),
        sshClientCertPass: z.object({
          secretVersion: z.string(),
        }),
        username: z.string(),
      }),
      userPassword: z.object({
        password: z.object({
          secretVersion: z.string(),
        }),
        username: z.string(),
      }),
    }),
    deadLetterConfig: z.object({
      projectId: z.string(),
      topic: z.string(),
    }),
    enrichmentConfig: z.object({
      appendAcl: z.boolean(),
    }),
    enrichmentEnabled: z.boolean(),
    eventsListenerIngressEndpoint: z.string(),
    listenerAuthConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      authKey: z.string(),
      authType: z.string(),
      oauth2AuthCodeFlow: z.object({
        authCode: z.string(),
        authUri: z.string(),
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.string(),
        }),
        enablePkce: z.boolean(),
        pkceVerifier: z.string(),
        redirectUri: z.string(),
        scopes: z.array(z.string()),
      }),
      oauth2AuthCodeFlowGoogleManaged: z.object({
        authCode: z.string(),
        redirectUri: z.string(),
        scopes: z.array(z.string()),
      }),
      oauth2ClientCredentials: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          secretVersion: z.string(),
        }),
      }),
      oauth2JwtBearer: z.object({
        clientKey: z.object({
          secretVersion: z.string(),
        }),
        jwtClaims: z.object({
          audience: z.string(),
          issuer: z.string(),
          subject: z.string(),
        }),
      }),
      sshPublicKey: z.object({
        certType: z.string(),
        sshClientCert: z.object({
          secretVersion: z.string(),
        }),
        sshClientCertPass: z.object({
          secretVersion: z.string(),
        }),
        username: z.string(),
      }),
      userPassword: z.object({
        password: z.object({
          secretVersion: z.string(),
        }),
        username: z.string(),
      }),
    }),
    privateConnectivityAllowlistedProjects: z.array(z.string()),
    privateConnectivityEnabled: z.boolean(),
    proxyDestinationConfig: z.object({
      destinations: z.array(z.object({
        host: z.string(),
        port: z.number(),
        serviceAttachment: z.string(),
      })),
      key: z.string(),
    }),
    registrationDestinationConfig: z.object({
      destinations: z.array(z.object({
        host: z.string(),
        port: z.number(),
        serviceAttachment: z.string(),
      })),
      key: z.string(),
    }),
    sslConfig: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      clientCertType: z.string(),
      clientCertificate: z.object({
        secretVersion: z.string(),
      }),
      clientPrivateKey: z.object({
        secretVersion: z.string(),
      }),
      clientPrivateKeyPass: z.object({
        secretVersion: z.string(),
      }),
      privateServerCertificate: z.object({
        secretVersion: z.string(),
      }),
      serverCertType: z.string(),
      trustModel: z.string(),
      type: z.string(),
      useSsl: z.boolean(),
    }),
  }).optional(),
  eventingEnablementType: z.string().optional(),
  eventingRuntimeData: z.object({
    eventsListenerEndpoint: z.string(),
    eventsListenerPscSa: z.string(),
    status: z.object({
      description: z.string(),
      state: z.string(),
    }),
    webhookData: z.object({
      additionalVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      createTime: z.string(),
      id: z.string(),
      name: z.string(),
      nextRefreshTime: z.string(),
      updateTime: z.string(),
    }),
    webhookSubscriptions: z.object({
      webhookData: z.array(z.object({
        additionalVariables: z.array(z.unknown()),
        createTime: z.string(),
        id: z.string(),
        name: z.string(),
        nextRefreshTime: z.string(),
        updateTime: z.string(),
      })),
    }),
  }).optional(),
  fallbackOnAdminCredentials: z.boolean().optional(),
  host: z.string().optional(),
  imageLocation: z.string().optional(),
  isTrustedTester: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lockConfig: z.object({
    locked: z.boolean(),
    reason: z.string(),
  }).optional(),
  logConfig: z.object({
    enabled: z.boolean(),
    level: z.string(),
  }).optional(),
  name: z.string(),
  nodeConfig: z.object({
    maxNodeCount: z.number(),
    minNodeCount: z.number(),
  }).optional(),
  serviceAccount: z.string().optional(),
  serviceDirectory: z.string().optional(),
  sslConfig: z.object({
    additionalVariables: z.array(z.object({
      boolValue: z.boolean(),
      encryptionKeyValue: z.object({
        kmsKeyName: z.string(),
        type: z.string(),
      }),
      intValue: z.string(),
      key: z.string(),
      secretValue: z.object({
        secretVersion: z.string(),
      }),
      stringValue: z.string(),
    })),
    clientCertType: z.string(),
    clientCertificate: z.object({
      secretVersion: z.string(),
    }),
    clientPrivateKey: z.object({
      secretVersion: z.string(),
    }),
    clientPrivateKeyPass: z.object({
      secretVersion: z.string(),
    }),
    privateServerCertificate: z.object({
      secretVersion: z.string(),
    }),
    serverCertType: z.string(),
    trustModel: z.string(),
    type: z.string(),
    useSsl: z.boolean(),
  }).optional(),
  status: z.object({
    description: z.string(),
    state: z.string(),
    status: z.string(),
  }).optional(),
  subscriptionType: z.string().optional(),
  suspended: z.boolean().optional(),
  tlsServiceDirectory: z.string().optional(),
  trafficShapingConfigs: z.array(z.object({
    duration: z.string(),
    quotaLimit: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Application Integration Connections. Registered at `@swamp/gcp/integrations/connections`. */
export const model = {
  type: "@swamp/gcp/integrations/connections",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connection represents an instance of connector.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync connections state from GCP",
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
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    get_connection_schema_metadata: {
      description: "get connection schema metadata",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.connections.getConnectionSchemaMetadata",
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
  },
};
