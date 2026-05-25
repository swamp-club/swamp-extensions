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
    "A KeyAccessJustificationsPolicy specifies zero or more allowed AccessReason values for encrypt, decrypt, and sign operations on a CryptoKey or KeyAccessJustificationsPolicyConfig (the default Key Access Justifications policy).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels with user-defined metadata. For more information, see [Labeling Keys](https://cloud.google.com/kms/docs/labeling-keys).",
  ).optional(),
  nextRotationTime: z.string().describe(
    "At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.",
  ).optional(),
  primary: z.object({
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
    ]).describe(
      "Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports.",
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
      ]).describe("Output only. The format of the attestation data.")
        .optional(),
    }).describe(
      "Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which this CryptoKeyVersion was created.",
    ).optional(),
    destroyEventTime: z.string().describe(
      "Output only. The time this CryptoKeyVersion's key material was destroyed. Only present if state is DESTROYED.",
    ).optional(),
    destroyTime: z.string().describe(
      "Output only. The time this CryptoKeyVersion's key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED.",
    ).optional(),
    externalDestructionFailureReason: z.string().describe(
      "Output only. The root cause of the most recent external destruction failure. Only present if state is EXTERNAL_DESTRUCTION_FAILED.",
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
    generateTime: z.string().describe(
      "Output only. The time this CryptoKeyVersion's key material was generated.",
    ).optional(),
    generationFailureReason: z.string().describe(
      "Output only. The root cause of the most recent generation failure. Only present if state is GENERATION_FAILED.",
    ).optional(),
    importFailureReason: z.string().describe(
      "Output only. The root cause of the most recent import failure. Only present if state is IMPORT_FAILED.",
    ).optional(),
    importJob: z.string().describe(
      "Output only. The name of the ImportJob used in the most recent import of this CryptoKeyVersion. Only present if the underlying key material was imported.",
    ).optional(),
    importTime: z.string().describe(
      "Output only. The time at which this CryptoKeyVersion's key material was most recently imported.",
    ).optional(),
    name: z.string().describe(
      "Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`.",
    ).optional(),
    protectionLevel: z.enum([
      "PROTECTION_LEVEL_UNSPECIFIED",
      "SOFTWARE",
      "HSM",
      "EXTERNAL",
      "EXTERNAL_VPC",
      "HSM_SINGLE_TENANT",
    ]).describe(
      "Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion.",
    ).optional(),
    reimportEligible: z.boolean().describe(
      "Output only. Whether or not this key version is eligible for reimport, by being specified as a target in ImportCryptoKeyVersionRequest.crypto_key_version.",
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
  }).describe(
    "A CryptoKeyVersion represents an individual cryptographic key, and the associated key material. An ENABLED version can be used for cryptographic operations. For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.",
  ).optional(),
  purpose: z.enum([
    "CRYPTO_KEY_PURPOSE_UNSPECIFIED",
    "ENCRYPT_DECRYPT",
    "ASYMMETRIC_SIGN",
    "ASYMMETRIC_DECRYPT",
    "RAW_ENCRYPT_DECRYPT",
    "MAC",
    "KEY_ENCAPSULATION",
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
    "A CryptoKeyVersionTemplate specifies the properties to use when creating a new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or automatically as a result of auto-rotation.",
  ).optional(),
  cryptoKeyId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  skipInitialVersionCreation: z.string().describe(
    "If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey.",
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
      ekmConnectionKeyPath: z.string(),
      externalKeyUri: z.string(),
    }),
    generateTime: z.string(),
    generationFailureReason: z.string(),
    importFailureReason: z.string(),
    importJob: z.string(),
    importTime: z.string(),
    name: z.string(),
    protectionLevel: z.string(),
    reimportEligible: z.boolean(),
    state: z.string(),
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
    "A KeyAccessJustificationsPolicy specifies zero or more allowed AccessReason values for encrypt, decrypt, and sign operations on a CryptoKey or KeyAccessJustificationsPolicyConfig (the default Key Access Justifications policy).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels with user-defined metadata. For more information, see [Labeling Keys](https://cloud.google.com/kms/docs/labeling-keys).",
  ).optional(),
  nextRotationTime: z.string().describe(
    "At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.",
  ).optional(),
  primary: z.object({
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
    ]).describe(
      "Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports.",
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
      ]).describe("Output only. The format of the attestation data.")
        .optional(),
    }).describe(
      "Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which this CryptoKeyVersion was created.",
    ).optional(),
    destroyEventTime: z.string().describe(
      "Output only. The time this CryptoKeyVersion's key material was destroyed. Only present if state is DESTROYED.",
    ).optional(),
    destroyTime: z.string().describe(
      "Output only. The time this CryptoKeyVersion's key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED.",
    ).optional(),
    externalDestructionFailureReason: z.string().describe(
      "Output only. The root cause of the most recent external destruction failure. Only present if state is EXTERNAL_DESTRUCTION_FAILED.",
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
    generateTime: z.string().describe(
      "Output only. The time this CryptoKeyVersion's key material was generated.",
    ).optional(),
    generationFailureReason: z.string().describe(
      "Output only. The root cause of the most recent generation failure. Only present if state is GENERATION_FAILED.",
    ).optional(),
    importFailureReason: z.string().describe(
      "Output only. The root cause of the most recent import failure. Only present if state is IMPORT_FAILED.",
    ).optional(),
    importJob: z.string().describe(
      "Output only. The name of the ImportJob used in the most recent import of this CryptoKeyVersion. Only present if the underlying key material was imported.",
    ).optional(),
    importTime: z.string().describe(
      "Output only. The time at which this CryptoKeyVersion's key material was most recently imported.",
    ).optional(),
    name: z.string().describe(
      "Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`.",
    ).optional(),
    protectionLevel: z.enum([
      "PROTECTION_LEVEL_UNSPECIFIED",
      "SOFTWARE",
      "HSM",
      "EXTERNAL",
      "EXTERNAL_VPC",
      "HSM_SINGLE_TENANT",
    ]).describe(
      "Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion.",
    ).optional(),
    reimportEligible: z.boolean().describe(
      "Output only. Whether or not this key version is eligible for reimport, by being specified as a target in ImportCryptoKeyVersionRequest.crypto_key_version.",
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
  }).describe(
    "A CryptoKeyVersion represents an individual cryptographic key, and the associated key material. An ENABLED version can be used for cryptographic operations. For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.",
  ).optional(),
  purpose: z.enum([
    "CRYPTO_KEY_PURPOSE_UNSPECIFIED",
    "ENCRYPT_DECRYPT",
    "ASYMMETRIC_SIGN",
    "ASYMMETRIC_DECRYPT",
    "RAW_ENCRYPT_DECRYPT",
    "MAC",
    "KEY_ENCAPSULATION",
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
    "A CryptoKeyVersionTemplate specifies the properties to use when creating a new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or automatically as a result of auto-rotation.",
  ).optional(),
  cryptoKeyId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  skipInitialVersionCreation: z.string().describe(
    "If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Key Management Service (KMS) KeyRings.CryptoKeys. Registered at `@swamp/gcp/cloudkms/keyrings-cryptokeys`. */
export const model = {
  type: "@swamp/gcp/cloudkms/keyrings-cryptokeys",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        if (g["primary"] !== undefined) body["primary"] = g["primary"];
        if (g["purpose"] !== undefined) body["purpose"] = g["purpose"];
        if (g["rotationPeriod"] !== undefined) {
          body["rotationPeriod"] = g["rotationPeriod"];
        }
        if (g["versionTemplate"] !== undefined) {
          body["versionTemplate"] = g["versionTemplate"];
        }
        if (g["cryptoKeyId"] !== undefined) {
          body["cryptoKeyId"] = g["cryptoKeyId"];
        }
        if (g["skipInitialVersionCreation"] !== undefined) {
          body["skipInitialVersionCreation"] = g["skipInitialVersionCreation"];
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
          undefined,
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
      description: "Get a cryptoKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the cryptoKeys"),
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
      description: "Update cryptoKeys attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["keyAccessJustificationsPolicy"] !== undefined) {
          body["keyAccessJustificationsPolicy"] =
            g["keyAccessJustificationsPolicy"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["nextRotationTime"] !== undefined) {
          body["nextRotationTime"] = g["nextRotationTime"];
        }
        if (g["primary"] !== undefined) body["primary"] = g["primary"];
        if (g["rotationPeriod"] !== undefined) {
          body["rotationPeriod"] = g["rotationPeriod"];
        }
        if (g["versionTemplate"] !== undefined) {
          body["versionTemplate"] = g["versionTemplate"];
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
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Sync cryptoKeys state from GCP",
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
        const projectId = await getProjectId();
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
        if (args["versionView"] !== undefined) {
          params["versionView"] = String(args["versionView"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "cryptoKeys",
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudkms.projects.locations.keyRings.cryptoKeys.decrypt",
            "path": "v1/{+name}:decrypt",
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
        if (args["plaintext"] !== undefined) {
          body["plaintext"] = args["plaintext"];
        }
        if (args["plaintextCrc32c"] !== undefined) {
          body["plaintextCrc32c"] = args["plaintextCrc32c"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudkms.projects.locations.keyRings.cryptoKeys.encrypt",
            "path": "v1/{+name}:encrypt",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          {},
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
        const projectId = await getProjectId();
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
        const projectId = await getProjectId();
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["cryptoKeyVersionId"] !== undefined) {
          body["cryptoKeyVersionId"] = args["cryptoKeyVersionId"];
        }
        const result = await createResource(
          BASE_URL,
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
        );
        return { result };
      },
    },
  },
};
