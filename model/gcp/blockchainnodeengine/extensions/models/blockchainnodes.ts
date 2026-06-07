// Auto-generated extension model for @swamp/gcp/blockchainnodeengine/blockchainnodes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Blockchain Node Engine BlockchainNodes.
 *
 * A representation of a blockchain node.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/blockchainNodes/${shortName}`;
}

const BASE_URL = "https://blockchainnodeengine.googleapis.com/";

const GET_CONFIG = {
  "id": "blockchainnodeengine.projects.locations.blockchainNodes.get",
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
  "id": "blockchainnodeengine.projects.locations.blockchainNodes.create",
  "path": "v1/{+parent}/blockchainNodes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "blockchainNodeId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "blockchainnodeengine.projects.locations.blockchainNodes.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "blockchainnodeengine.projects.locations.blockchainNodes.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "blockchainnodeengine.projects.locations.blockchainNodes.list",
  "path": "v1/{+parent}/blockchainNodes",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  blockchainType: z.enum(["BLOCKCHAIN_TYPE_UNSPECIFIED", "ETHEREUM"]).describe(
    "Immutable. The blockchain type of the node.",
  ).optional(),
  connectionInfo: z.object({
    endpointInfo: z.object({
      jsonRpcApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node JSON-RPC API endpoint.",
      ).optional(),
      websocketsApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node WebSockets API endpoint.",
      ).optional(),
    }).describe(
      "Contains endpoint information through which to interact with a blockchain node.",
    ).optional(),
    serviceAttachment: z.string().describe(
      "Output only. A service attachment that exposes a node, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}",
    ).optional(),
  }).describe(
    "The connection information through which to interact with a blockchain node.",
  ).optional(),
  ethereumDetails: z.object({
    additionalEndpoints: z.object({
      beaconApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node's Beacon API endpoint.",
      ).optional(),
      beaconPrometheusMetricsApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node's Beacon Prometheus metrics endpoint. See [Prometheus Metrics](https://lighthouse-book.sigmaprime.io/advanced_metrics.html) for more details.",
      ).optional(),
      executionClientPrometheusMetricsApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node's execution client's Prometheus metrics endpoint.",
      ).optional(),
    }).describe("Contains endpoint information specific to Ethereum nodes.")
      .optional(),
    apiEnableAdmin: z.boolean().describe(
      "Immutable. Enables JSON-RPC access to functions in the `admin` namespace. Defaults to `false`.",
    ).optional(),
    apiEnableDebug: z.boolean().describe(
      "Immutable. Enables JSON-RPC access to functions in the `debug` namespace. Defaults to `false`.",
    ).optional(),
    consensusClient: z.enum([
      "CONSENSUS_CLIENT_UNSPECIFIED",
      "LIGHTHOUSE",
      "ERIGON_EMBEDDED_CONSENSUS_LAYER",
    ]).describe("Immutable. The consensus client.").optional(),
    executionClient: z.enum(["EXECUTION_CLIENT_UNSPECIFIED", "GETH", "ERIGON"])
      .describe("Immutable. The execution client").optional(),
    gethDetails: z.object({
      garbageCollectionMode: z.enum([
        "GARBAGE_COLLECTION_MODE_UNSPECIFIED",
        "FULL",
        "ARCHIVE",
      ]).describe("Immutable. Blockchain garbage collection mode.").optional(),
    }).describe(
      "Options for the Geth execution client. See [Command-line Options](https://geth.ethereum.org/docs/fundamentals/command-line-options) for more details.",
    ).optional(),
    network: z.enum([
      "NETWORK_UNSPECIFIED",
      "MAINNET",
      "TESTNET_GOERLI_PRATER",
      "TESTNET_SEPOLIA",
      "TESTNET_HOLESKY",
    ]).describe("Immutable. The Ethereum environment being accessed.")
      .optional(),
    nodeType: z.enum(["NODE_TYPE_UNSPECIFIED", "LIGHT", "FULL", "ARCHIVE"])
      .describe("Immutable. The type of Ethereum node.").optional(),
    validatorConfig: z.object({
      beaconFeeRecipient: z.string().describe(
        'An Ethereum address which the beacon client will send fee rewards to if no recipient is configured in the validator client. See https://lighthouse-book.sigmaprime.io/suggested-fee-recipient.html or https://docs.prylabs.network/docs/execution-node/fee-recipient for examples of how this is used. Note that while this is often described as "suggested", as we run the execution node we can trust the execution node, and therefore this is considered enforced.',
      ).optional(),
      managedValidatorClient: z.boolean().describe(
        "Immutable. When true, deploys a GCP-managed validator client alongside the beacon client.",
      ).optional(),
      mevRelayUrls: z.array(z.string()).describe(
        "URLs for MEV-relay services to use for block building. When set, a GCP-managed MEV-boost service is configured on the beacon client.",
      ).optional(),
    }).describe(
      "Configuration for validator-related parameters on the beacon client, and for any GCP-managed validator client.",
    ).optional(),
  }).describe("Ethereum-specific blockchain node details.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-provided key-value pairs.",
  ).optional(),
  blockchainNodeId: z.string().describe(
    "Required. ID of the requesting object.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  blockchainType: z.string().optional(),
  connectionInfo: z.object({
    endpointInfo: z.object({
      jsonRpcApiEndpoint: z.string(),
      websocketsApiEndpoint: z.string(),
    }),
    serviceAttachment: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  ethereumDetails: z.object({
    additionalEndpoints: z.object({
      beaconApiEndpoint: z.string(),
      beaconPrometheusMetricsApiEndpoint: z.string(),
      executionClientPrometheusMetricsApiEndpoint: z.string(),
    }),
    apiEnableAdmin: z.boolean(),
    apiEnableDebug: z.boolean(),
    consensusClient: z.string(),
    executionClient: z.string(),
    gethDetails: z.object({
      garbageCollectionMode: z.string(),
    }),
    network: z.string(),
    nodeType: z.string(),
    validatorConfig: z.object({
      beaconFeeRecipient: z.string(),
      managedValidatorClient: z.boolean(),
      mevRelayUrls: z.array(z.string()),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  privateServiceConnectEnabled: z.boolean().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  blockchainType: z.enum(["BLOCKCHAIN_TYPE_UNSPECIFIED", "ETHEREUM"]).describe(
    "Immutable. The blockchain type of the node.",
  ).optional(),
  connectionInfo: z.object({
    endpointInfo: z.object({
      jsonRpcApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node JSON-RPC API endpoint.",
      ).optional(),
      websocketsApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node WebSockets API endpoint.",
      ).optional(),
    }).describe(
      "Contains endpoint information through which to interact with a blockchain node.",
    ).optional(),
    serviceAttachment: z.string().describe(
      "Output only. A service attachment that exposes a node, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}",
    ).optional(),
  }).describe(
    "The connection information through which to interact with a blockchain node.",
  ).optional(),
  ethereumDetails: z.object({
    additionalEndpoints: z.object({
      beaconApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node's Beacon API endpoint.",
      ).optional(),
      beaconPrometheusMetricsApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node's Beacon Prometheus metrics endpoint. See [Prometheus Metrics](https://lighthouse-book.sigmaprime.io/advanced_metrics.html) for more details.",
      ).optional(),
      executionClientPrometheusMetricsApiEndpoint: z.string().describe(
        "Output only. The assigned URL for the node's execution client's Prometheus metrics endpoint.",
      ).optional(),
    }).describe("Contains endpoint information specific to Ethereum nodes.")
      .optional(),
    apiEnableAdmin: z.boolean().describe(
      "Immutable. Enables JSON-RPC access to functions in the `admin` namespace. Defaults to `false`.",
    ).optional(),
    apiEnableDebug: z.boolean().describe(
      "Immutable. Enables JSON-RPC access to functions in the `debug` namespace. Defaults to `false`.",
    ).optional(),
    consensusClient: z.enum([
      "CONSENSUS_CLIENT_UNSPECIFIED",
      "LIGHTHOUSE",
      "ERIGON_EMBEDDED_CONSENSUS_LAYER",
    ]).describe("Immutable. The consensus client.").optional(),
    executionClient: z.enum(["EXECUTION_CLIENT_UNSPECIFIED", "GETH", "ERIGON"])
      .describe("Immutable. The execution client").optional(),
    gethDetails: z.object({
      garbageCollectionMode: z.enum([
        "GARBAGE_COLLECTION_MODE_UNSPECIFIED",
        "FULL",
        "ARCHIVE",
      ]).describe("Immutable. Blockchain garbage collection mode.").optional(),
    }).describe(
      "Options for the Geth execution client. See [Command-line Options](https://geth.ethereum.org/docs/fundamentals/command-line-options) for more details.",
    ).optional(),
    network: z.enum([
      "NETWORK_UNSPECIFIED",
      "MAINNET",
      "TESTNET_GOERLI_PRATER",
      "TESTNET_SEPOLIA",
      "TESTNET_HOLESKY",
    ]).describe("Immutable. The Ethereum environment being accessed.")
      .optional(),
    nodeType: z.enum(["NODE_TYPE_UNSPECIFIED", "LIGHT", "FULL", "ARCHIVE"])
      .describe("Immutable. The type of Ethereum node.").optional(),
    validatorConfig: z.object({
      beaconFeeRecipient: z.string().describe(
        'An Ethereum address which the beacon client will send fee rewards to if no recipient is configured in the validator client. See https://lighthouse-book.sigmaprime.io/suggested-fee-recipient.html or https://docs.prylabs.network/docs/execution-node/fee-recipient for examples of how this is used. Note that while this is often described as "suggested", as we run the execution node we can trust the execution node, and therefore this is considered enforced.',
      ).optional(),
      managedValidatorClient: z.boolean().describe(
        "Immutable. When true, deploys a GCP-managed validator client alongside the beacon client.",
      ).optional(),
      mevRelayUrls: z.array(z.string()).describe(
        "URLs for MEV-relay services to use for block building. When set, a GCP-managed MEV-boost service is configured on the beacon client.",
      ).optional(),
    }).describe(
      "Configuration for validator-related parameters on the beacon client, and for any GCP-managed validator client.",
    ).optional(),
  }).describe("Ethereum-specific blockchain node details.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-provided key-value pairs.",
  ).optional(),
  blockchainNodeId: z.string().describe(
    "Required. ID of the requesting object.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
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

/** Swamp extension model for Google Cloud Blockchain Node Engine BlockchainNodes. Registered at `@swamp/gcp/blockchainnodeengine/blockchainnodes`. */
export const model = {
  type: "@swamp/gcp/blockchainnodeengine/blockchainnodes",
  version: "2026.06.07.1",
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
      description: "A representation of a blockchain node.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a blockchainNodes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["blockchainType"] !== undefined) {
          body["blockchainType"] = g["blockchainType"];
        }
        if (g["connectionInfo"] !== undefined) {
          body["connectionInfo"] = g["connectionInfo"];
        }
        if (g["ethereumDetails"] !== undefined) {
          body["ethereumDetails"] = g["ethereumDetails"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["blockchainNodeId"] !== undefined) {
          body["blockchainNodeId"] = g["blockchainNodeId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
              "readyValues": ["RUNNING", "RECONCILING"],
              "failedValues": ["ERROR"],
            }
            : undefined,
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
      description: "Get a blockchainNodes",
      arguments: z.object({
        identifier: z.string().describe("The name of the blockchainNodes"),
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
    update: {
      description: "Update blockchainNodes attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["connectionInfo"] !== undefined) {
          body["connectionInfo"] = g["connectionInfo"];
        }
        if (g["ethereumDetails"] !== undefined) {
          body["ethereumDetails"] = g["ethereumDetails"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "RECONCILING"],
              "failedValues": ["ERROR"],
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
      description: "Delete the blockchainNodes",
      arguments: z.object({
        identifier: z.string().describe("The name of the blockchainNodes"),
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
      description: "Sync blockchainNodes state from GCP",
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
      description: "List blockchainNodes resources",
      arguments: z.object({
        filter: z.string().describe("Filtering results.").optional(),
        orderBy: z.string().describe("Hint for how to order the results.")
          .optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "blockchainNodes",
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
