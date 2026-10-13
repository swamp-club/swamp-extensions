// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/cloudkms/keyrings-cryptokeys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.CryptoKeys.
 *
 * A CryptoKey represents a logical key that can be used for cryptographic operations. A CryptoKey is made up of zero or more versions, which represent the actual key material used in cryptographic operations.
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
  return `${parent}/cryptoKeys/${shortName}`;
}

const BASE_URL = "https://cloudkms.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.cryptoKeys.get",
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
  "id": "cloudkms.projects.locations.keyRings.cryptoKeys.create",
  "path": "v1/{+parent}/cryptoKeys",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cryptoKeyId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "skipInitialVersionCreation": {
      "location": "query",
    },
    "trustedWrappingEnabled": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.cryptoKeys.patch",
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
  "id": "cloudkms.projects.locations.keyRings.cryptoKeys.delete",
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
  "id": "cloudkms.projects.locations.keyRings.cryptoKeys.list",
  "path": "v1/{+parent}/cryptoKeys",
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
    "versionView": {
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
  cryptoKeyBackend: z.string().describe(
    "Immutable. The resource name of the backend environment where the key material for all CryptoKeyVersions associated with this CryptoKey reside and where all related cryptographic operations are performed. Only applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC, with the resource name in the format `projects/*/locations/*/ekmConnections/*`. Only applicable if CryptoKeyVersions have a ProtectionLevel of HSM_SINGLE_TENANT, with the resource name in the format `projects/*/locations/*/singleTenantHsmInstances/*`. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future.",
  ).optional(),
  destroyScheduledDuration: z.string().describe(
    "Immutable. The period of time that versions of this key spend in the DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified at creation time, the default duration is 30 days.",
  ).optional(),
  importOnly: z.boolean().describe(
    "Immutable. Whether this key may contain imported versions only.",
  ).optional(),
  keyAccessJustificationsPolicy: z.object({
    allowedAccessReasons: z.array(
      z.enum([
        "REASON_UNSPECIFIED",
        "CUSTOMER_INITIATED_SUPPORT",
        "GOOGLE_INITIATED_SERVICE",
        "THIRD_PARTY_DATA_REQUEST",
        "GOOGLE_INITIATED_REVIEW",
        "CUSTOMER_INITIATED_ACCESS",
        "GOOGLE_INITIATED_SYSTEM_OPERATION",
        "REASON_NOT_EXPECTED",
        "MODIFIED_CUSTOMER_INITIATED_ACCESS",
        "MODIFIED_GOOGLE_INITIATED_SYSTEM_OPERATION",
        "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT",
        "CUSTOMER_AUTHORIZED_WORKFLOW_SERVICING",
      ]),
    ).describe(
      "The list of allowed reasons for access to a CryptoKey. Note that empty allowed_access_reasons has a different meaning depending on where this message appears. If this is under KeyAccessJustificationsPolicyConfig, it means allow-all. If this is under CryptoKey, it means deny-all.",
    ).optional(),
  }).describe(
    "Optional. The policy used for Key Access Justifications Policy Enforcement. If this field is present and this key is enrolled in Key Access Justifications Policy Enforcement, the policy will be evaluated in encrypt, decrypt, and sign operations, and the operation will fail if rejected by the policy. The policy is defined by specifying zero or more allowed justification codes. https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes By default, this field is absent, and all justification codes are allowed. If the `key_access_justifications_policy.allowed_access_reasons` is empty (zero allowed justification code), all encrypt, decrypt, and sign operations will fail.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels with user-defined metadata. For more information, see [Labeling Keys](https://cloud.google.com/kms/docs/labeling-keys).",
  ).optional(),
  nextRotationTime: z.string().describe(
    "At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.",
  ).optional(),
  purpose: z.enum([
    "CRYPTO_KEY_PURPOSE_UNSPECIFIED",
    "ENCRYPT_DECRYPT",
    "ASYMMETRIC_SIGN",
    "ASYMMETRIC_DECRYPT",
    "RAW_ENCRYPT_DECRYPT",
    "MAC",
    "KEY_ENCAPSULATION",
    "AES_WRAPPING",
  ]).describe("Immutable. The immutable purpose of this CryptoKey.").optional(),
  rotationPeriod: z.string().describe(
    "next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. If rotation_period is set, next_rotation_time must also be set. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.",
  ).optional(),
  versionTemplate: z.object({
    algorithm: z.enum([
      "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED",
      "GOOGLE_SYMMETRIC_ENCRYPTION",
      "AES_128_GCM",
      "AES_256_GCM",
      "AES_128_CBC",
      "AES_256_CBC",
      "AES_128_CTR",
      "AES_256_CTR",
      "RSA_SIGN_PSS_2048_SHA256",
      "RSA_SIGN_PSS_3072_SHA256",
      "RSA_SIGN_PSS_4096_SHA256",
      "RSA_SIGN_PSS_4096_SHA512",
      "RSA_SIGN_PKCS1_2048_SHA256",
      "RSA_SIGN_PKCS1_3072_SHA256",
      "RSA_SIGN_PKCS1_4096_SHA256",
      "RSA_SIGN_PKCS1_4096_SHA512",
      "RSA_SIGN_RAW_PKCS1_2048",
      "RSA_SIGN_RAW_PKCS1_3072",
      "RSA_SIGN_RAW_PKCS1_4096",
      "RSA_DECRYPT_OAEP_2048_SHA256",
      "RSA_DECRYPT_OAEP_3072_SHA256",
      "RSA_DECRYPT_OAEP_4096_SHA256",
      "RSA_DECRYPT_OAEP_4096_SHA512",
      "RSA_DECRYPT_OAEP_2048_SHA1",
      "RSA_DECRYPT_OAEP_3072_SHA1",
      "RSA_DECRYPT_OAEP_4096_SHA1",
      "EC_SIGN_P256_SHA256",
      "EC_SIGN_P384_SHA384",
      "EC_SIGN_SECP256K1_SHA256",
      "EC_SIGN_ED25519",
      "HMAC_SHA256",
      "HMAC_SHA1",
      "HMAC_SHA384",
      "HMAC_SHA512",
      "HMAC_SHA224",
      "EXTERNAL_SYMMETRIC_ENCRYPTION",
      "ML_KEM_768",
      "ML_KEM_1024",
      "KEM_XWING",
      "PQ_SIGN_ML_DSA_44",
      "PQ_SIGN_ML_DSA_65",
      "PQ_SIGN_ML_DSA_87",
      "PQ_SIGN_SLH_DSA_SHA2_128S",
      "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256",
      "PQ_SIGN_ML_DSA_44_EXTERNAL_MU",
      "PQ_SIGN_ML_DSA_65_EXTERNAL_MU",
      "PQ_SIGN_ML_DSA_87_EXTERNAL_MU",
      "KEM_ECDH_P256",
      "KEM_ECDH_P384",
      "AES_256_KWP",
    ]).describe(
      "Required. Algorithm to use when creating a CryptoKeyVersion based on this template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT.",
    ).optional(),
    protectionLevel: z.enum([
      "PROTECTION_LEVEL_UNSPECIFIED",
      "SOFTWARE",
      "HSM",
      "EXTERNAL",
      "EXTERNAL_VPC",
      "HSM_SINGLE_TENANT",
    ]).describe(
      "ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE.",
    ).optional(),
  }).describe(
    "A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template.",
  ).optional(),
  cryptoKeyId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  skipInitialVersionCreation: z.string().describe(
    "If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey.",
  ).optional(),
  trustedWrappingEnabled: z.string().describe(
    "Optional. Whether trusted wrapping will be enabled on the first CryptoKeyVersions created for this CryptoKey. This field is only supported for keys with CryptoKeyVersionTemplate.protection_level HSM_SINGLE_TENANT. This field is supported for all CryptoKeyPurposes except ENCRYPT_DECRYPT.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  cryptoKeyBackend: z.string().optional(),
  destroyScheduledDuration: z.string().optional(),
  importOnly: z.boolean().optional(),
  keyAccessJustificationsPolicy: z.object({
    allowedAccessReasons: z.array(z.string()),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  nextRotationTime: z.string().optional(),
  primary: z.object({
    algorithm: z.string(),
    attestation: z.object({
      certChains: z.object({
        caviumCerts: z.array(z.string()),
        googleCardCerts: z.array(z.string()),
        googlePartitionCerts: z.array(z.string()),
      }),
      content: z.string(),
      format: z.string(),
    }),
    createTime: z.string(),
    destroyEventTime: z.string(),
    destroyTime: z.string(),
    externalDestructionFailureReason: z.string(),
    externalProtectionLevelOptions: z.object({
      ekmConnectionBackendOverride: z.string(),
      ekmConnectionKeyPath: z.string(),
      externalKeyUri: z.string(),
    }),
    generateTime: z.string(),
    generationFailureReason: z.string(),
    hsmTrusted: z.boolean(),
    importFailureReason: z.string(),
    importJob: z.string(),
    importTime: z.string(),
    name: z.string(),
    protectionLevel: z.string(),
    reimportEligible: z.boolean(),
    state: z.string(),
    trustedWrappingEnabled: z.boolean(),
  }).optional(),
  purpose: z.string().optional(),
  rotationPeriod: z.string().optional(),
  versionTemplate: z.object({
    algorithm: z.string(),
    protectionLevel: z.string(),
  }).optional(),
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
  cryptoKeyBackend: z.string().describe(
    "Immutable. The resource name of the backend environment where the key material for all CryptoKeyVersions associated with this CryptoKey reside and where all related cryptographic operations are performed. Only applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC, with the resource name in the format `projects/*/locations/*/ekmConnections/*`. Only applicable if CryptoKeyVersions have a ProtectionLevel of HSM_SINGLE_TENANT, with the resource name in the format `projects/*/locations/*/singleTenantHsmInstances/*`. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future.",
  ).optional(),
  destroyScheduledDuration: z.string().describe(
    "Immutable. The period of time that versions of this key spend in the DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified at creation time, the default duration is 30 days.",
  ).optional(),
  importOnly: z.boolean().describe(
    "Immutable. Whether this key may contain imported versions only.",
  ).optional(),
  keyAccessJustificationsPolicy: z.object({
    allowedAccessReasons: z.array(
      z.enum([
        "REASON_UNSPECIFIED",
        "CUSTOMER_INITIATED_SUPPORT",
        "GOOGLE_INITIATED_SERVICE",
        "THIRD_PARTY_DATA_REQUEST",
        "GOOGLE_INITIATED_REVIEW",
        "CUSTOMER_INITIATED_ACCESS",
        "GOOGLE_INITIATED_SYSTEM_OPERATION",
        "REASON_NOT_EXPECTED",
        "MODIFIED_CUSTOMER_INITIATED_ACCESS",
        "MODIFIED_GOOGLE_INITIATED_SYSTEM_OPERATION",
        "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT",
        "CUSTOMER_AUTHORIZED_WORKFLOW_SERVICING",
      ]),
    ).describe(
      "The list of allowed reasons for access to a CryptoKey. Note that empty allowed_access_reasons has a different meaning depending on where this message appears. If this is under KeyAccessJustificationsPolicyConfig, it means allow-all. If this is under CryptoKey, it means deny-all.",
    ).optional(),
  }).describe(
    "Optional. The policy used for Key Access Justifications Policy Enforcement. If this field is present and this key is enrolled in Key Access Justifications Policy Enforcement, the policy will be evaluated in encrypt, decrypt, and sign operations, and the operation will fail if rejected by the policy. The policy is defined by specifying zero or more allowed justification codes. https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes By default, this field is absent, and all justification codes are allowed. If the `key_access_justifications_policy.allowed_access_reasons` is empty (zero allowed justification code), all encrypt, decrypt, and sign operations will fail.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels with user-defined metadata. For more information, see [Labeling Keys](https://cloud.google.com/kms/docs/labeling-keys).",
  ).optional(),
  nextRotationTime: z.string().describe(
    "At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.",
  ).optional(),
  purpose: z.enum([
    "CRYPTO_KEY_PURPOSE_UNSPECIFIED",
    "ENCRYPT_DECRYPT",
    "ASYMMETRIC_SIGN",
    "ASYMMETRIC_DECRYPT",
    "RAW_ENCRYPT_DECRYPT",
    "MAC",
    "KEY_ENCAPSULATION",
    "AES_WRAPPING",
  ]).describe("Immutable. The immutable purpose of this CryptoKey.").optional(),
  rotationPeriod: z.string().describe(
    "next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. If rotation_period is set, next_rotation_time must also be set. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.",
  ).optional(),
  versionTemplate: z.object({
    algorithm: z.enum([
      "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED",
      "GOOGLE_SYMMETRIC_ENCRYPTION",
      "AES_128_GCM",
      "AES_256_GCM",
      "AES_128_CBC",
      "AES_256_CBC",
      "AES_128_CTR",
      "AES_256_CTR",
      "RSA_SIGN_PSS_2048_SHA256",
      "RSA_SIGN_PSS_3072_SHA256",
      "RSA_SIGN_PSS_4096_SHA256",
      "RSA_SIGN_PSS_4096_SHA512",
      "RSA_SIGN_PKCS1_2048_SHA256",
      "RSA_SIGN_PKCS1_3072_SHA256",
      "RSA_SIGN_PKCS1_4096_SHA256",
      "RSA_SIGN_PKCS1_4096_SHA512",
      "RSA_SIGN_RAW_PKCS1_2048",
      "RSA_SIGN_RAW_PKCS1_3072",
      "RSA_SIGN_RAW_PKCS1_4096",
      "RSA_DECRYPT_OAEP_2048_SHA256",
      "RSA_DECRYPT_OAEP_3072_SHA256",
      "RSA_DECRYPT_OAEP_4096_SHA256",
      "RSA_DECRYPT_OAEP_4096_SHA512",
      "RSA_DECRYPT_OAEP_2048_SHA1",
      "RSA_DECRYPT_OAEP_3072_SHA1",
      "RSA_DECRYPT_OAEP_4096_SHA1",
      "EC_SIGN_P256_SHA256",
      "EC_SIGN_P384_SHA384",
      "EC_SIGN_SECP256K1_SHA256",
      "EC_SIGN_ED25519",
      "HMAC_SHA256",
      "HMAC_SHA1",
      "HMAC_SHA384",
      "HMAC_SHA512",
      "HMAC_SHA224",
      "EXTERNAL_SYMMETRIC_ENCRYPTION",
      "ML_KEM_768",
      "ML_KEM_1024",
      "KEM_XWING",
      "PQ_SIGN_ML_DSA_44",
      "PQ_SIGN_ML_DSA_65",
      "PQ_SIGN_ML_DSA_87",
      "PQ_SIGN_SLH_DSA_SHA2_128S",
      "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256",
      "PQ_SIGN_ML_DSA_44_EXTERNAL_MU",
      "PQ_SIGN_ML_DSA_65_EXTERNAL_MU",
      "PQ_SIGN_ML_DSA_87_EXTERNAL_MU",
      "KEM_ECDH_P256",
      "KEM_ECDH_P384",
      "AES_256_KWP",
    ]).describe(
      "Required. Algorithm to use when creating a CryptoKeyVersion based on this template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT.",
    ).optional(),
    protectionLevel: z.enum([
      "PROTECTION_LEVEL_UNSPECIFIED",
      "SOFTWARE",
      "HSM",
      "EXTERNAL",
      "EXTERNAL_VPC",
      "HSM_SINGLE_TENANT",
    ]).describe(
      "ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE.",
    ).optional(),
  }).describe(
    "A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template.",
  ).optional(),
  cryptoKeyId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  skipInitialVersionCreation: z.string().describe(
    "If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey.",
  ).optional(),
  trustedWrappingEnabled: z.string().describe(
    "Optional. Whether trusted wrapping will be enabled on the first CryptoKeyVersions created for this CryptoKey. This field is only supported for keys with CryptoKeyVersionTemplate.protection_level HSM_SINGLE_TENANT. This field is supported for all CryptoKeyPurposes except ENCRYPT_DECRYPT.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.CryptoKeys. Registered at `@swamp/gcp/cloudkms/keyrings-cryptokeys`. */
export const model = {
  type: "@swamp/gcp/cloudkms/keyrings-cryptokeys",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.09.1",
      description: "Added: trustedWrappingEnabled",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
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
      toVersion: "2026.07.20.2",
      description: "Added: trustedWrappingEnabled",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: primary",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { primary: _primary, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "Added: trustedWrappingEnabled",
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
      toVersion: "2026.08.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description: "Removed: allowedAccessReasons, algorithm, protectionLevel",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          allowedAccessReasons: _allowedAccessReasons,
          algorithm: _algorithm,
          protectionLevel: _protectionLevel,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A CryptoKey represents a logical key that can be used for cryptographic opera...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a cryptoKeys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["cryptoKeyBackend"] !== undefined) {
          body["cryptoKeyBackend"] = g["cryptoKeyBackend"];
        }
        if (g["destroyScheduledDuration"] !== undefined) {
          body["destroyScheduledDuration"] = g["destroyScheduledDuration"];
        }
        if (g["importOnly"] !== undefined) body["importOnly"] = g["importOnly"];
        if (g["keyAccessJustificationsPolicy"] !== undefined) {
          body["keyAccessJustificationsPolicy"] =
            g["keyAccessJustificationsPolicy"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["nextRotationTime"] !== undefined) {
          body["nextRotationTime"] = g["nextRotationTime"];
        }
        if (g["purpose"] !== undefined) body["purpose"] = g["purpose"];
        if (g["rotationPeriod"] !== undefined) {
          body["rotationPeriod"] = g["rotationPeriod"];
        }
        if (g["versionTemplate"] !== undefined) {
          body["versionTemplate"] = g["versionTemplate"];
        }
        if (g["cryptoKeyId"] !== undefined) {
          params["cryptoKeyId"] = String(g["cryptoKeyId"]);
        }
        if (g["skipInitialVersionCreation"] !== undefined) {
          params["skipInitialVersionCreation"] = String(
            g["skipInitialVersionCreation"],
          );
        }
        if (g["trustedWrappingEnabled"] !== undefined) {
          params["trustedWrappingEnabled"] = String(
            g["trustedWrappingEnabled"],
          );
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a cryptoKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the cryptoKeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
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
      description: "Update cryptoKeys attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific cryptoKeys by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["keyAccessJustificationsPolicy"] !== undefined) {
          body["keyAccessJustificationsPolicy"] =
            g["keyAccessJustificationsPolicy"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["nextRotationTime"] !== undefined) {
          body["nextRotationTime"] = g["nextRotationTime"];
        }
        if (g["rotationPeriod"] !== undefined) {
          body["rotationPeriod"] = g["rotationPeriod"];
        }
        if (g["versionTemplate"] !== undefined) {
          body["versionTemplate"] = g["versionTemplate"];
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
      description: "Delete the cryptoKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the cryptoKeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync cryptoKeys state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific cryptoKeys by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
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
      description: "List cryptoKeys resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Optional limit on the number of CryptoKeys to include in the response. Further CryptoKeys can subsequently be obtained by including the ListCryptoKeysResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
        ).optional(),
        versionView: z.string().describe(
          "The fields of the primary version to include in the response.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["versionView"] !== undefined) {
          params["versionView"] = String(args["versionView"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "cryptoKeys",
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
    decrypt: {
      description: "decrypt",
      arguments: z.object({
        additionalAuthenticatedData: z.any().optional(),
        additionalAuthenticatedDataCrc32c: z.any().optional(),
        ciphertext: z.any().optional(),
        ciphertextCrc32c: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
        const result = await createResource(
          baseUrl,
          {
            "id": "cloudkms.projects.locations.keyRings.cryptoKeys.decrypt",
            "path": "v1/{+name}:decrypt",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    encrypt: {
      description: "encrypt",
      arguments: z.object({
        additionalAuthenticatedData: z.any().optional(),
        additionalAuthenticatedDataCrc32c: z.any().optional(),
        plaintext: z.any().optional(),
        plaintextCrc32c: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
        if (args["plaintext"] !== undefined) {
          body["plaintext"] = args["plaintext"];
        }
        if (args["plaintextCrc32c"] !== undefined) {
          body["plaintextCrc32c"] = args["plaintextCrc32c"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "cloudkms.projects.locations.keyRings.cryptoKeys.encrypt",
            "path": "v1/{+name}:encrypt",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.setIamPolicy",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.testIamPermissions",
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
    update_primary_version: {
      description: "update primary version",
      arguments: z.object({
        cryptoKeyVersionId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["cryptoKeyVersionId"] !== undefined) {
          body["cryptoKeyVersionId"] = args["cryptoKeyVersionId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "cloudkms.projects.locations.keyRings.cryptoKeys.updatePrimaryVersion",
            "path": "v1/{+name}:updatePrimaryVersion",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
