// Auto-generated extension model for @swamp/gcp/cloudkms/keyrings-cryptokeys-cryptokeyversions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.CryptoKeys.CryptoKeyVersions.
 *
 * A CryptoKeyVersion represents an individual cryptographic key, and the associated key material. An ENABLED version can be used for cryptographic operations. For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/cryptoKeyVersions/${shortName}`;
}

const BASE_URL = "https://cloudkms.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.get",
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
  "id":
    "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.create",
  "path": "v1/{+parent}/cryptoKeyVersions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.delete",
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
  "id":
    "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.list",
  "path": "v1/{+parent}/cryptoKeyVersions",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  externalProtectionLevelOptions: z.object({
    ekmConnectionKeyPath: z.string().describe(
      'The path to the external key material on the EKM when using EkmConnection e.g., "v0/my/key". Set this field instead of external_key_uri when using an EkmConnection.',
    ).optional(),
    externalKeyUri: z.string().describe(
      "The URI for an external resource that this CryptoKeyVersion represents.",
    ).optional(),
  }).describe(
    "ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels.",
  ).optional(),
  state: z.enum([
    "CRYPTO_KEY_VERSION_STATE_UNSPECIFIED",
    "PENDING_GENERATION",
    "ENABLED",
    "DISABLED",
    "DESTROYED",
    "DESTROY_SCHEDULED",
    "PENDING_IMPORT",
    "IMPORT_FAILED",
    "GENERATION_FAILED",
    "PENDING_EXTERNAL_DESTRUCTION",
    "EXTERNAL_DESTRUCTION_FAILED",
  ]).describe("The current state of the CryptoKeyVersion.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  algorithm: z.string().optional(),
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
  destroyEventTime: z.string().optional(),
  destroyTime: z.string().optional(),
  externalDestructionFailureReason: z.string().optional(),
  externalProtectionLevelOptions: z.object({
    ekmConnectionKeyPath: z.string(),
    externalKeyUri: z.string(),
  }).optional(),
  generateTime: z.string().optional(),
  generationFailureReason: z.string().optional(),
  importFailureReason: z.string().optional(),
  importJob: z.string().optional(),
  importTime: z.string().optional(),
  name: z.string(),
  protectionLevel: z.string().optional(),
  reimportEligible: z.boolean().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
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
  externalProtectionLevelOptions: z.object({
    ekmConnectionKeyPath: z.string().describe(
      'The path to the external key material on the EKM when using EkmConnection e.g., "v0/my/key". Set this field instead of external_key_uri when using an EkmConnection.',
    ).optional(),
    externalKeyUri: z.string().describe(
      "The URI for an external resource that this CryptoKeyVersion represents.",
    ).optional(),
  }).describe(
    "ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels.",
  ).optional(),
  state: z.enum([
    "CRYPTO_KEY_VERSION_STATE_UNSPECIFIED",
    "PENDING_GENERATION",
    "ENABLED",
    "DISABLED",
    "DESTROYED",
    "DESTROY_SCHEDULED",
    "PENDING_IMPORT",
    "IMPORT_FAILED",
    "GENERATION_FAILED",
    "PENDING_EXTERNAL_DESTRUCTION",
    "EXTERNAL_DESTRUCTION_FAILED",
  ]).describe("The current state of the CryptoKeyVersion.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.CryptoKeys.CryptoKeyVersions. Registered at `@swamp/gcp/cloudkms/keyrings-cryptokeys-cryptokeyversions`. */
export const model = {
  type: "@swamp/gcp/cloudkms/keyrings-cryptokeys-cryptokeyversions",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A CryptoKeyVersion represents an individual cryptographic key, and the associ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a cryptoKeyVersions",
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
        if (g["attestation"] !== undefined) {
          body["attestation"] = g["attestation"];
        }
        if (g["externalProtectionLevelOptions"] !== undefined) {
          body["externalProtectionLevelOptions"] =
            g["externalProtectionLevelOptions"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a cryptoKeyVersions",
      arguments: z.object({
        identifier: z.string().describe("The name of the cryptoKeyVersions"),
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
      description: "Update cryptoKeyVersions attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["attestation"] !== undefined) {
          body["attestation"] = g["attestation"];
        }
        if (g["externalProtectionLevelOptions"] !== undefined) {
          body["externalProtectionLevelOptions"] =
            g["externalProtectionLevelOptions"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
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
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the cryptoKeyVersions",
      arguments: z.object({
        identifier: z.string().describe("The name of the cryptoKeyVersions"),
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
      description: "Sync cryptoKeyVersions state from GCP",
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
    asymmetric_decrypt: {
      description: "asymmetric decrypt",
      arguments: z.object({
        ciphertext: z.any().optional(),
        ciphertextCrc32c: z.any().optional(),
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
        if (args["ciphertext"] !== undefined) {
          body["ciphertext"] = args["ciphertext"];
        }
        if (args["ciphertextCrc32c"] !== undefined) {
          body["ciphertextCrc32c"] = args["ciphertextCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricDecrypt",
            "path": "v1/{+name}:asymmetricDecrypt",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    asymmetric_sign: {
      description: "asymmetric sign",
      arguments: z.object({
        data: z.any().optional(),
        dataCrc32c: z.any().optional(),
        digest: z.any().optional(),
        digestCrc32c: z.any().optional(),
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
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["dataCrc32c"] !== undefined) {
          body["dataCrc32c"] = args["dataCrc32c"];
        }
        if (args["digest"] !== undefined) body["digest"] = args["digest"];
        if (args["digestCrc32c"] !== undefined) {
          body["digestCrc32c"] = args["digestCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricSign",
            "path": "v1/{+name}:asymmetricSign",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    decapsulate: {
      description: "decapsulate",
      arguments: z.object({
        ciphertext: z.any().optional(),
        ciphertextCrc32c: z.any().optional(),
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
        if (args["ciphertext"] !== undefined) {
          body["ciphertext"] = args["ciphertext"];
        }
        if (args["ciphertextCrc32c"] !== undefined) {
          body["ciphertextCrc32c"] = args["ciphertextCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.decapsulate",
            "path": "v1/{+name}:decapsulate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    destroy: {
      description: "destroy",
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
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.destroy",
            "path": "v1/{+name}:destroy",
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
    get_public_key: {
      description: "get public key",
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
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.getPublicKey",
            "path": "v1/{+name}/publicKey",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "publicKeyFormat": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        algorithm: z.any().optional(),
        cryptoKeyVersion: z.any().optional(),
        importJob: z.any().optional(),
        rsaAesWrappedKey: z.any().optional(),
        wrappedKey: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["algorithm"] !== undefined) {
          body["algorithm"] = args["algorithm"];
        }
        if (args["cryptoKeyVersion"] !== undefined) {
          body["cryptoKeyVersion"] = args["cryptoKeyVersion"];
        }
        if (args["importJob"] !== undefined) {
          body["importJob"] = args["importJob"];
        }
        if (args["rsaAesWrappedKey"] !== undefined) {
          body["rsaAesWrappedKey"] = args["rsaAesWrappedKey"];
        }
        if (args["wrappedKey"] !== undefined) {
          body["wrappedKey"] = args["wrappedKey"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.import",
            "path": "v1/{+parent}/cryptoKeyVersions:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    mac_sign: {
      description: "mac sign",
      arguments: z.object({
        data: z.any().optional(),
        dataCrc32c: z.any().optional(),
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
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["dataCrc32c"] !== undefined) {
          body["dataCrc32c"] = args["dataCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.macSign",
            "path": "v1/{+name}:macSign",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    mac_verify: {
      description: "mac verify",
      arguments: z.object({
        data: z.any().optional(),
        dataCrc32c: z.any().optional(),
        mac: z.any().optional(),
        macCrc32c: z.any().optional(),
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
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["dataCrc32c"] !== undefined) {
          body["dataCrc32c"] = args["dataCrc32c"];
        }
        if (args["mac"] !== undefined) body["mac"] = args["mac"];
        if (args["macCrc32c"] !== undefined) {
          body["macCrc32c"] = args["macCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.macVerify",
            "path": "v1/{+name}:macVerify",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    raw_decrypt: {
      description: "raw decrypt",
      arguments: z.object({
        additionalAuthenticatedData: z.any().optional(),
        additionalAuthenticatedDataCrc32c: z.any().optional(),
        ciphertext: z.any().optional(),
        ciphertextCrc32c: z.any().optional(),
        initializationVector: z.any().optional(),
        initializationVectorCrc32c: z.any().optional(),
        tagLength: z.any().optional(),
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
        if (args["additionalAuthenticatedData"] !== undefined) {
          body["additionalAuthenticatedData"] =
            args["additionalAuthenticatedData"];
        }
        if (args["additionalAuthenticatedDataCrc32c"] !== undefined) {
          body["additionalAuthenticatedDataCrc32c"] =
            args["additionalAuthenticatedDataCrc32c"];
        }
        if (args["ciphertext"] !== undefined) {
          body["ciphertext"] = args["ciphertext"];
        }
        if (args["ciphertextCrc32c"] !== undefined) {
          body["ciphertextCrc32c"] = args["ciphertextCrc32c"];
        }
        if (args["initializationVector"] !== undefined) {
          body["initializationVector"] = args["initializationVector"];
        }
        if (args["initializationVectorCrc32c"] !== undefined) {
          body["initializationVectorCrc32c"] =
            args["initializationVectorCrc32c"];
        }
        if (args["tagLength"] !== undefined) {
          body["tagLength"] = args["tagLength"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.rawDecrypt",
            "path": "v1/{+name}:rawDecrypt",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    raw_encrypt: {
      description: "raw encrypt",
      arguments: z.object({
        additionalAuthenticatedData: z.any().optional(),
        additionalAuthenticatedDataCrc32c: z.any().optional(),
        initializationVector: z.any().optional(),
        initializationVectorCrc32c: z.any().optional(),
        plaintext: z.any().optional(),
        plaintextCrc32c: z.any().optional(),
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
        if (args["additionalAuthenticatedData"] !== undefined) {
          body["additionalAuthenticatedData"] =
            args["additionalAuthenticatedData"];
        }
        if (args["additionalAuthenticatedDataCrc32c"] !== undefined) {
          body["additionalAuthenticatedDataCrc32c"] =
            args["additionalAuthenticatedDataCrc32c"];
        }
        if (args["initializationVector"] !== undefined) {
          body["initializationVector"] = args["initializationVector"];
        }
        if (args["initializationVectorCrc32c"] !== undefined) {
          body["initializationVectorCrc32c"] =
            args["initializationVectorCrc32c"];
        }
        if (args["plaintext"] !== undefined) {
          body["plaintext"] = args["plaintext"];
        }
        if (args["plaintextCrc32c"] !== undefined) {
          body["plaintextCrc32c"] = args["plaintextCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.rawEncrypt",
            "path": "v1/{+name}:rawEncrypt",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
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
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.restore",
            "path": "v1/{+name}:restore",
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
  },
};
