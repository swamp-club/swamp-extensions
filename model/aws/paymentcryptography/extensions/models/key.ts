// Auto-generated extension model for @swamp/aws/paymentcryptography/key
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for PaymentCryptography Key (AWS::PaymentCryptography::Key).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const KeyModesOfUseSchema = z.object({
  Encrypt: z.boolean().optional(),
  Decrypt: z.boolean().optional(),
  Wrap: z.boolean().optional(),
  Unwrap: z.boolean().optional(),
  Generate: z.boolean().optional(),
  Sign: z.boolean().optional(),
  Verify: z.boolean().optional(),
  DeriveKey: z.boolean().optional(),
  NoRestrictions: z.boolean().optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DeriveKeyUsage: z.enum([
    "TR31_B0_BASE_DERIVATION_KEY",
    "TR31_C0_CARD_VERIFICATION_KEY",
    "TR31_D0_SYMMETRIC_DATA_ENCRYPTION_KEY",
    "TR31_E0_EMV_MKEY_APP_CRYPTOGRAMS",
    "TR31_E1_EMV_MKEY_CONFIDENTIALITY",
    "TR31_E2_EMV_MKEY_INTEGRITY",
    "TR31_E4_EMV_MKEY_DYNAMIC_NUMBERS",
    "TR31_E5_EMV_MKEY_CARD_PERSONALIZATION",
    "TR31_E6_EMV_MKEY_OTHER",
    "TR31_K0_KEY_ENCRYPTION_KEY",
    "TR31_K1_KEY_BLOCK_PROTECTION_KEY",
    "TR31_M3_ISO_9797_3_MAC_KEY",
    "TR31_M1_ISO_9797_1_MAC_KEY",
    "TR31_M6_ISO_9797_5_CMAC_KEY",
    "TR31_M7_HMAC_KEY",
    "TR31_P0_PIN_ENCRYPTION_KEY",
    "TR31_P1_PIN_GENERATION_KEY",
    "TR31_V1_IBM3624_PIN_VERIFICATION_KEY",
    "TR31_V2_VISA_PIN_VERIFICATION_KEY",
  ]).optional(),
  Enabled: z.boolean().optional(),
  Exportable: z.boolean(),
  KeyAttributes: z.object({
    KeyUsage: z.enum([
      "TR31_B0_BASE_DERIVATION_KEY",
      "TR31_C0_CARD_VERIFICATION_KEY",
      "TR31_D0_SYMMETRIC_DATA_ENCRYPTION_KEY",
      "TR31_D1_ASYMMETRIC_KEY_FOR_DATA_ENCRYPTION",
      "TR31_E0_EMV_MKEY_APP_CRYPTOGRAMS",
      "TR31_E1_EMV_MKEY_CONFIDENTIALITY",
      "TR31_E2_EMV_MKEY_INTEGRITY",
      "TR31_E4_EMV_MKEY_DYNAMIC_NUMBERS",
      "TR31_E5_EMV_MKEY_CARD_PERSONALIZATION",
      "TR31_E6_EMV_MKEY_OTHER",
      "TR31_K0_KEY_ENCRYPTION_KEY",
      "TR31_K1_KEY_BLOCK_PROTECTION_KEY",
      "TR31_K3_ASYMMETRIC_KEY_FOR_KEY_AGREEMENT",
      "TR31_M0_ISO_16609_MAC_KEY",
      "TR31_M3_ISO_9797_3_MAC_KEY",
      "TR31_M1_ISO_9797_1_MAC_KEY",
      "TR31_M6_ISO_9797_5_CMAC_KEY",
      "TR31_M7_HMAC_KEY",
      "TR31_P0_PIN_ENCRYPTION_KEY",
      "TR31_P1_PIN_GENERATION_KEY",
      "TR31_S0_ASYMMETRIC_KEY_FOR_DIGITAL_SIGNATURE",
      "TR31_V1_IBM3624_PIN_VERIFICATION_KEY",
      "TR31_V2_VISA_PIN_VERIFICATION_KEY",
      "TR31_K2_TR34_ASYMMETRIC_KEY",
    ]),
    KeyClass: z.enum([
      "SYMMETRIC_KEY",
      "ASYMMETRIC_KEY_PAIR",
      "PRIVATE_KEY",
      "PUBLIC_KEY",
    ]),
    KeyAlgorithm: z.enum([
      "TDES_2KEY",
      "TDES_3KEY",
      "AES_128",
      "AES_192",
      "AES_256",
      "HMAC_SHA256",
      "HMAC_SHA384",
      "HMAC_SHA512",
      "HMAC_SHA224",
      "RSA_2048",
      "RSA_3072",
      "RSA_4096",
      "ECC_NIST_P256",
      "ECC_NIST_P384",
      "ECC_NIST_P521",
    ]),
    KeyModesOfUse: KeyModesOfUseSchema,
  }),
  KeyCheckValueAlgorithm: z.enum(["CMAC", "ANSI_X9_24", "HMAC", "SHA_1"])
    .optional(),
  Policy: z.string().min(1).max(20480).regex(
    new RegExp("^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$"),
  ).optional(),
  ReplicationRegions: z.array(
    z.string().regex(new RegExp("^[a-z]{2}-[a-z]{1,16}-[0-9]+$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  DeriveKeyUsage: z.string().optional(),
  Enabled: z.boolean().optional(),
  Exportable: z.boolean().optional(),
  KeyAttributes: z.object({
    KeyUsage: z.string(),
    KeyClass: z.string(),
    KeyAlgorithm: z.string(),
    KeyModesOfUse: KeyModesOfUseSchema,
  }).optional(),
  KeyCheckValueAlgorithm: z.string().optional(),
  KeyIdentifier: z.string(),
  KeyOrigin: z.string().optional(),
  KeyState: z.string().optional(),
  Policy: z.string().optional(),
  ReplicationRegions: z.array(z.string()).optional(),
  ReplicationStatus: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DeriveKeyUsage: z.enum([
    "TR31_B0_BASE_DERIVATION_KEY",
    "TR31_C0_CARD_VERIFICATION_KEY",
    "TR31_D0_SYMMETRIC_DATA_ENCRYPTION_KEY",
    "TR31_E0_EMV_MKEY_APP_CRYPTOGRAMS",
    "TR31_E1_EMV_MKEY_CONFIDENTIALITY",
    "TR31_E2_EMV_MKEY_INTEGRITY",
    "TR31_E4_EMV_MKEY_DYNAMIC_NUMBERS",
    "TR31_E5_EMV_MKEY_CARD_PERSONALIZATION",
    "TR31_E6_EMV_MKEY_OTHER",
    "TR31_K0_KEY_ENCRYPTION_KEY",
    "TR31_K1_KEY_BLOCK_PROTECTION_KEY",
    "TR31_M3_ISO_9797_3_MAC_KEY",
    "TR31_M1_ISO_9797_1_MAC_KEY",
    "TR31_M6_ISO_9797_5_CMAC_KEY",
    "TR31_M7_HMAC_KEY",
    "TR31_P0_PIN_ENCRYPTION_KEY",
    "TR31_P1_PIN_GENERATION_KEY",
    "TR31_V1_IBM3624_PIN_VERIFICATION_KEY",
    "TR31_V2_VISA_PIN_VERIFICATION_KEY",
  ]).optional(),
  Enabled: z.boolean().optional(),
  Exportable: z.boolean().optional(),
  KeyAttributes: z.object({
    KeyUsage: z.enum([
      "TR31_B0_BASE_DERIVATION_KEY",
      "TR31_C0_CARD_VERIFICATION_KEY",
      "TR31_D0_SYMMETRIC_DATA_ENCRYPTION_KEY",
      "TR31_D1_ASYMMETRIC_KEY_FOR_DATA_ENCRYPTION",
      "TR31_E0_EMV_MKEY_APP_CRYPTOGRAMS",
      "TR31_E1_EMV_MKEY_CONFIDENTIALITY",
      "TR31_E2_EMV_MKEY_INTEGRITY",
      "TR31_E4_EMV_MKEY_DYNAMIC_NUMBERS",
      "TR31_E5_EMV_MKEY_CARD_PERSONALIZATION",
      "TR31_E6_EMV_MKEY_OTHER",
      "TR31_K0_KEY_ENCRYPTION_KEY",
      "TR31_K1_KEY_BLOCK_PROTECTION_KEY",
      "TR31_K3_ASYMMETRIC_KEY_FOR_KEY_AGREEMENT",
      "TR31_M0_ISO_16609_MAC_KEY",
      "TR31_M3_ISO_9797_3_MAC_KEY",
      "TR31_M1_ISO_9797_1_MAC_KEY",
      "TR31_M6_ISO_9797_5_CMAC_KEY",
      "TR31_M7_HMAC_KEY",
      "TR31_P0_PIN_ENCRYPTION_KEY",
      "TR31_P1_PIN_GENERATION_KEY",
      "TR31_S0_ASYMMETRIC_KEY_FOR_DIGITAL_SIGNATURE",
      "TR31_V1_IBM3624_PIN_VERIFICATION_KEY",
      "TR31_V2_VISA_PIN_VERIFICATION_KEY",
      "TR31_K2_TR34_ASYMMETRIC_KEY",
    ]).optional(),
    KeyClass: z.enum([
      "SYMMETRIC_KEY",
      "ASYMMETRIC_KEY_PAIR",
      "PRIVATE_KEY",
      "PUBLIC_KEY",
    ]).optional(),
    KeyAlgorithm: z.enum([
      "TDES_2KEY",
      "TDES_3KEY",
      "AES_128",
      "AES_192",
      "AES_256",
      "HMAC_SHA256",
      "HMAC_SHA384",
      "HMAC_SHA512",
      "HMAC_SHA224",
      "RSA_2048",
      "RSA_3072",
      "RSA_4096",
      "ECC_NIST_P256",
      "ECC_NIST_P384",
      "ECC_NIST_P521",
    ]).optional(),
    KeyModesOfUse: KeyModesOfUseSchema.optional(),
  }).optional(),
  KeyCheckValueAlgorithm: z.enum(["CMAC", "ANSI_X9_24", "HMAC", "SHA_1"])
    .optional(),
  Policy: z.string().min(1).max(20480).regex(
    new RegExp("^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$"),
  ).optional(),
  ReplicationRegions: z.array(
    z.string().regex(new RegExp("^[a-z]{2}-[a-z]{1,16}-[0-9]+$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

/** Swamp extension model for PaymentCryptography Key. Registered at `@swamp/aws/paymentcryptography/key`. */
export const model = {
  type: "@swamp/aws/paymentcryptography/key",
  version: "2026.06.04.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "Added: Policy",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "PaymentCryptography Key resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a PaymentCryptography Key",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::PaymentCryptography::Key",
          desiredState,
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
      description: "Get a PaymentCryptography Key",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PaymentCryptography Key",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::PaymentCryptography::Key",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a PaymentCryptography Key",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.KeyIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::PaymentCryptography::Key",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::PaymentCryptography::Key",
          identifier,
          currentState,
          desiredState,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a PaymentCryptography Key",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PaymentCryptography Key",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::PaymentCryptography::Key",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync PaymentCryptography Key state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.KeyIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::PaymentCryptography::Key",
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
              identifier,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
