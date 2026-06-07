// Auto-generated extension model for @swamp/gcp/cloudkms/keyrings-importjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.ImportJobs.
 *
 * An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using pre-existing key material, generated outside of Cloud KMS. When an ImportJob is created, Cloud KMS will generate a "wrapping key", which is a public/private key pair. You use the wrapping key to encrypt (also known as wrap) the pre-existing key material to protect it during the import process. The nature of the wrapping key depends on the choice of import_method. When the wrapping key generation is complete, the state will be set to ACTIVE and the public_key can be fetched. The fetched public key can then be used to wrap your pre-existing key material. Once the key material is wrapped, it can be imported into a new CryptoKeyVersion in an existing CryptoKey by calling ImportCryptoKeyVersion. Multiple CryptoKeyVersions can be imported with a single ImportJob. Cloud KMS uses the private key portion of the wrapping key to unwrap the key material. Only Cloud KMS has access to the private key. An ImportJob expires 3 days after it is created. Once expired, Cloud KMS will no longer be able to import or unwrap any key material that was wrapped with the ImportJob's public key. For more information, see [Importing a key](https://cloud.google.com/kms/docs/importing-a-key).
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
  return `${parent}/importJobs/${shortName}`;
}

const BASE_URL = "https://cloudkms.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.importJobs.get",
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
    "publicKeyFormat": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.importJobs.create",
  "path": "v1/{+parent}/importJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "importJobId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.importJobs.list",
  "path": "v1/{+parent}/importJobs",
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
  attestation: z.object({
    certChains: z.object({
      caviumCerts: z.array(z.string()).describe(
        "Cavium certificate chain corresponding to the attestation.",
      ).optional(),
      googleCardCerts: z.array(z.string()).describe(
        "Google card certificate chain corresponding to the attestation.",
      ).optional(),
      googlePartitionCerts: z.array(z.string()).describe(
        "Google partition certificate chain corresponding to the attestation.",
      ).optional(),
    }).describe(
      "Certificate chains needed to verify the attestation. Certificates in chains are PEM-encoded and are ordered based on https://tools.ietf.org/html/rfc5246#section-7.4.2.",
    ).optional(),
    content: z.string().describe(
      "Output only. The attestation data provided by the HSM when the key operation was performed.",
    ).optional(),
    format: z.enum([
      "ATTESTATION_FORMAT_UNSPECIFIED",
      "CAVIUM_V1_COMPRESSED",
      "CAVIUM_V2_COMPRESSED",
    ]).describe("Output only. The format of the attestation data.").optional(),
  }).describe(
    "Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).",
  ).optional(),
  cryptoKeyBackend: z.string().describe(
    'Immutable. The resource name of the backend environment where the key material for the wrapping key resides and where all related cryptographic operations are performed. Currently, this field is only populated for keys stored in HSM_SINGLE_TENANT. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. Supported resources: * `"projects/*/locations/*/singleTenantHsmInstances/*"`',
  ).optional(),
  importMethod: z.enum([
    "IMPORT_METHOD_UNSPECIFIED",
    "RSA_OAEP_3072_SHA1_AES_256",
    "RSA_OAEP_4096_SHA1_AES_256",
    "RSA_OAEP_3072_SHA256_AES_256",
    "RSA_OAEP_4096_SHA256_AES_256",
    "RSA_OAEP_3072_SHA256",
    "RSA_OAEP_4096_SHA256",
    "HPKE_KEM_ML_KEM_768_HKDF_SHA256_AES_256_GCM",
    "HPKE_KEM_ML_KEM_1024_HKDF_SHA256_AES_256_GCM",
    "HPKE_KEM_XWING_HKDF_SHA256_AES_256_GCM",
  ]).describe(
    "Required. Immutable. The wrapping method to be used for incoming key material.",
  ).optional(),
  protectionLevel: z.enum([
    "PROTECTION_LEVEL_UNSPECIFIED",
    "SOFTWARE",
    "HSM",
    "EXTERNAL",
    "EXTERNAL_VPC",
    "HSM_SINGLE_TENANT",
  ]).describe(
    "Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into.",
  ).optional(),
  publicKey: z.object({
    data: z.string().describe(
      "Output only. Contains the public key, formatted according to the PublicKey.PublicKeyFormat specified in the KeyManagementService.GetImportJob request.",
    ).optional(),
    pem: z.string().describe(
      "The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13). This field gets populated by default for RSA-based import methods, if no public_key_format is specified in the request. If you want to retrieve the wrapping key of an ImportJob in some other format, use KeyManagementService.GetImportJob and set the public_key_format to the desired public key format.",
    ).optional(),
  }).describe(
    "The public key component of the wrapping key. For details of the type of key this public key corresponds to, see the ImportMethod.",
  ).optional(),
  importJobId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  attestation: z.object({
    certChains: z.object({
      caviumCerts: z.array(z.string()),
      googleCardCerts: z.array(z.string()),
      googlePartitionCerts: z.array(z.string()),
    }),
    content: z.string(),
    format: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  cryptoKeyBackend: z.string().optional(),
  expireEventTime: z.string().optional(),
  expireTime: z.string().optional(),
  generateTime: z.string().optional(),
  importMethod: z.string().optional(),
  name: z.string(),
  protectionLevel: z.string().optional(),
  publicKey: z.object({
    data: z.string(),
    pem: z.string(),
  }).optional(),
  publicKeyFormat: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  attestation: z.object({
    certChains: z.object({
      caviumCerts: z.array(z.string()).describe(
        "Cavium certificate chain corresponding to the attestation.",
      ).optional(),
      googleCardCerts: z.array(z.string()).describe(
        "Google card certificate chain corresponding to the attestation.",
      ).optional(),
      googlePartitionCerts: z.array(z.string()).describe(
        "Google partition certificate chain corresponding to the attestation.",
      ).optional(),
    }).describe(
      "Certificate chains needed to verify the attestation. Certificates in chains are PEM-encoded and are ordered based on https://tools.ietf.org/html/rfc5246#section-7.4.2.",
    ).optional(),
    content: z.string().describe(
      "Output only. The attestation data provided by the HSM when the key operation was performed.",
    ).optional(),
    format: z.enum([
      "ATTESTATION_FORMAT_UNSPECIFIED",
      "CAVIUM_V1_COMPRESSED",
      "CAVIUM_V2_COMPRESSED",
    ]).describe("Output only. The format of the attestation data.").optional(),
  }).describe(
    "Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).",
  ).optional(),
  cryptoKeyBackend: z.string().describe(
    'Immutable. The resource name of the backend environment where the key material for the wrapping key resides and where all related cryptographic operations are performed. Currently, this field is only populated for keys stored in HSM_SINGLE_TENANT. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. Supported resources: * `"projects/*/locations/*/singleTenantHsmInstances/*"`',
  ).optional(),
  importMethod: z.enum([
    "IMPORT_METHOD_UNSPECIFIED",
    "RSA_OAEP_3072_SHA1_AES_256",
    "RSA_OAEP_4096_SHA1_AES_256",
    "RSA_OAEP_3072_SHA256_AES_256",
    "RSA_OAEP_4096_SHA256_AES_256",
    "RSA_OAEP_3072_SHA256",
    "RSA_OAEP_4096_SHA256",
    "HPKE_KEM_ML_KEM_768_HKDF_SHA256_AES_256_GCM",
    "HPKE_KEM_ML_KEM_1024_HKDF_SHA256_AES_256_GCM",
    "HPKE_KEM_XWING_HKDF_SHA256_AES_256_GCM",
  ]).describe(
    "Required. Immutable. The wrapping method to be used for incoming key material.",
  ).optional(),
  protectionLevel: z.enum([
    "PROTECTION_LEVEL_UNSPECIFIED",
    "SOFTWARE",
    "HSM",
    "EXTERNAL",
    "EXTERNAL_VPC",
    "HSM_SINGLE_TENANT",
  ]).describe(
    "Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into.",
  ).optional(),
  publicKey: z.object({
    data: z.string().describe(
      "Output only. Contains the public key, formatted according to the PublicKey.PublicKeyFormat specified in the KeyManagementService.GetImportJob request.",
    ).optional(),
    pem: z.string().describe(
      "The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13). This field gets populated by default for RSA-based import methods, if no public_key_format is specified in the request. If you want to retrieve the wrapping key of an ImportJob in some other format, use KeyManagementService.GetImportJob and set the public_key_format to the desired public key format.",
    ).optional(),
  }).describe(
    "The public key component of the wrapping key. For details of the type of key this public key corresponds to, see the ImportMethod.",
  ).optional(),
  importJobId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
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

/** Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.ImportJobs. Registered at `@swamp/gcp/cloudkms/keyrings-importjobs`. */
export const model = {
  type: "@swamp/gcp/cloudkms/keyrings-importjobs",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
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
      description:
        "An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using pre...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a importJobs",
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
        if (g["attestation"] !== undefined) {
          body["attestation"] = g["attestation"];
        }
        if (g["cryptoKeyBackend"] !== undefined) {
          body["cryptoKeyBackend"] = g["cryptoKeyBackend"];
        }
        if (g["importMethod"] !== undefined) {
          body["importMethod"] = g["importMethod"];
        }
        if (g["protectionLevel"] !== undefined) {
          body["protectionLevel"] = g["protectionLevel"];
        }
        if (g["publicKey"] !== undefined) body["publicKey"] = g["publicKey"];
        if (g["importJobId"] !== undefined) {
          body["importJobId"] = g["importJobId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
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
      description: "Get a importJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the importJobs"),
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
      description: "Sync importJobs state from GCP",
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
      description: "List importJobs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Optional limit on the number of ImportJobs to include in the response. Further ImportJobs can subsequently be obtained by including the ListImportJobsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
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
          "importJobs",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.importJobs.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.importJobs.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.importJobs.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
