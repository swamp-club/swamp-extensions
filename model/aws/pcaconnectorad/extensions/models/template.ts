// Auto-generated extension model for @swamp/aws/pcaconnectorad/template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for PCAConnectorAD Template (AWS::PCAConnectorAD::Template).
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
import type { AwsCredentials } from "./_lib/aws.ts";

const ValidityPeriodSchema = z.object({
  PeriodType: z.enum(["HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"]),
  Period: z.number().min(1).max(8766000),
});

const CertificateValiditySchema = z.object({
  ValidityPeriod: ValidityPeriodSchema,
  RenewalPeriod: ValidityPeriodSchema,
});

const PrivateKeyAttributesV2Schema = z.object({
  MinimalKeyLength: z.number().min(1),
  KeySpec: z.enum(["KEY_EXCHANGE", "SIGNATURE"]),
  CryptoProviders: z.array(z.string().min(1).max(100)).optional(),
});

const PrivateKeyFlagsV2Schema = z.object({
  ExportableKey: z.boolean().optional(),
  StrongKeyProtectionRequired: z.boolean().optional(),
  ClientVersion: z.enum([
    "WINDOWS_SERVER_2003",
    "WINDOWS_SERVER_2008",
    "WINDOWS_SERVER_2008_R2",
    "WINDOWS_SERVER_2012",
    "WINDOWS_SERVER_2012_R2",
    "WINDOWS_SERVER_2016",
  ]),
});

const EnrollmentFlagsV2Schema = z.object({
  IncludeSymmetricAlgorithms: z.boolean().optional(),
  UserInteractionRequired: z.boolean().optional(),
  RemoveInvalidCertificateFromPersonalStore: z.boolean().optional(),
  NoSecurityExtension: z.boolean().optional(),
  EnableKeyReuseOnNtTokenKeysetStorageFull: z.boolean().optional(),
});

const SubjectNameFlagsV2Schema = z.object({
  SanRequireDomainDns: z.boolean().optional(),
  SanRequireSpn: z.boolean().optional(),
  SanRequireDirectoryGuid: z.boolean().optional(),
  SanRequireUpn: z.boolean().optional(),
  SanRequireEmail: z.boolean().optional(),
  SanRequireDns: z.boolean().optional(),
  RequireDnsAsCn: z.boolean().optional(),
  RequireEmail: z.boolean().optional(),
  RequireCommonName: z.boolean().optional(),
  RequireDirectoryPath: z.boolean().optional(),
});

const GeneralFlagsV2Schema = z.object({
  AutoEnrollment: z.boolean().optional(),
  MachineType: z.boolean().optional(),
});

const KeyUsageFlagsSchema = z.object({
  DigitalSignature: z.boolean().optional(),
  NonRepudiation: z.boolean().optional(),
  KeyEncipherment: z.boolean().optional(),
  DataEncipherment: z.boolean().optional(),
  KeyAgreement: z.boolean().optional(),
});

const KeyUsageSchema = z.object({
  Critical: z.boolean().optional(),
  UsageFlags: KeyUsageFlagsSchema,
});

const ApplicationPoliciesSchema = z.object({
  Critical: z.boolean().optional(),
  Policies: z.array(z.object({
    PolicyType: z.enum([
      "ALL_APPLICATION_POLICIES",
      "ANY_PURPOSE",
      "ATTESTATION_IDENTITY_KEY_CERTIFICATE",
      "CERTIFICATE_REQUEST_AGENT",
      "CLIENT_AUTHENTICATION",
      "CODE_SIGNING",
      "CTL_USAGE",
      "DIGITAL_RIGHTS",
      "DIRECTORY_SERVICE_EMAIL_REPLICATION",
      "DISALLOWED_LIST",
      "DNS_SERVER_TRUST",
      "DOCUMENT_ENCRYPTION",
      "DOCUMENT_SIGNING",
      "DYNAMIC_CODE_GENERATOR",
      "EARLY_LAUNCH_ANTIMALWARE_DRIVER",
      "EMBEDDED_WINDOWS_SYSTEM_COMPONENT_VERIFICATION",
      "ENCLAVE",
      "ENCRYPTING_FILE_SYSTEM",
      "ENDORSEMENT_KEY_CERTIFICATE",
      "FILE_RECOVERY",
      "HAL_EXTENSION",
      "IP_SECURITY_END_SYSTEM",
      "IP_SECURITY_IKE_INTERMEDIATE",
      "IP_SECURITY_TUNNEL_TERMINATION",
      "IP_SECURITY_USER",
      "ISOLATED_USER_MODE",
      "KDC_AUTHENTICATION",
      "KERNEL_MODE_CODE_SIGNING",
      "KEY_PACK_LICENSES",
      "KEY_RECOVERY",
      "KEY_RECOVERY_AGENT",
      "LICENSE_SERVER_VERIFICATION",
      "LIFETIME_SIGNING",
      "MICROSOFT_PUBLISHER",
      "MICROSOFT_TIME_STAMPING",
      "MICROSOFT_TRUST_LIST_SIGNING",
      "OCSP_SIGNING",
      "OEM_WINDOWS_SYSTEM_COMPONENT_VERIFICATION",
      "PLATFORM_CERTIFICATE",
      "PREVIEW_BUILD_SIGNING",
      "PRIVATE_KEY_ARCHIVAL",
      "PROTECTED_PROCESS_LIGHT_VERIFICATION",
      "PROTECTED_PROCESS_VERIFICATION",
      "QUALIFIED_SUBORDINATION",
      "REVOKED_LIST_SIGNER",
      "ROOT_PROGRAM_AUTO_UPDATE_CA_REVOCATION",
      "ROOT_PROGRAM_AUTO_UPDATE_END_REVOCATION",
      "ROOT_PROGRAM_NO_OSCP_FAILOVER_TO_CRL",
      "ROOT_LIST_SIGNER",
      "SECURE_EMAIL",
      "SERVER_AUTHENTICATION",
      "SMART_CARD_LOGIN",
      "SPC_ENCRYPTED_DIGEST_RETRY_COUNT",
      "SPC_RELAXED_PE_MARKER_CHECK",
      "TIME_STAMPING",
      "WINDOWS_HARDWARE_DRIVER_ATTESTED_VERIFICATION",
      "WINDOWS_HARDWARE_DRIVER_EXTENDED_VERIFICATION",
      "WINDOWS_HARDWARE_DRIVER_VERIFICATION",
      "WINDOWS_HELLO_RECOVERY_KEY_ENCRYPTION",
      "WINDOWS_KITS_COMPONENT",
      "WINDOWS_RT_VERIFICATION",
      "WINDOWS_SOFTWARE_EXTENSION_VERIFICATION",
      "WINDOWS_STORE",
      "WINDOWS_SYSTEM_COMPONENT_VERIFICATION",
      "WINDOWS_TCB_COMPONENT",
      "WINDOWS_THIRD_PARTY_APPLICATION_COMPONENT",
      "WINDOWS_UPDATE",
    ]).optional(),
    PolicyObjectIdentifier: z.string().min(1).max(64).regex(
      new RegExp("^([0-2])\\.([0-9]|([0-3][0-9]))(\\.([0-9]+)){0,126}$"),
    ).optional(),
  })),
});

const ExtensionsV2Schema = z.object({
  KeyUsage: KeyUsageSchema,
  ApplicationPolicies: ApplicationPoliciesSchema.optional(),
});

const TemplateV2Schema = z.object({
  CertificateValidity: CertificateValiditySchema,
  SupersededTemplates: z.array(
    z.string().min(1).max(64).regex(
      new RegExp("^(?!^\\s+$)((?![\\x5c'\\x2b,;<=>#\\x22])([\\x20-\\x7E]))+$"),
    ),
  ).optional(),
  PrivateKeyAttributes: PrivateKeyAttributesV2Schema,
  PrivateKeyFlags: PrivateKeyFlagsV2Schema,
  EnrollmentFlags: EnrollmentFlagsV2Schema,
  SubjectNameFlags: SubjectNameFlagsV2Schema,
  GeneralFlags: GeneralFlagsV2Schema,
  Extensions: ExtensionsV2Schema,
});

const KeyUsagePropertyFlagsSchema = z.object({
  Decrypt: z.boolean().optional(),
  KeyAgreement: z.boolean().optional(),
  Sign: z.boolean().optional(),
});

const PrivateKeyAttributesV3Schema = z.object({
  MinimalKeyLength: z.number().min(1),
  KeySpec: z.enum(["KEY_EXCHANGE", "SIGNATURE"]),
  CryptoProviders: z.array(z.string().min(1).max(100)).optional(),
  KeyUsageProperty: z.object({
    PropertyType: z.enum(["ALL"]).optional(),
    PropertyFlags: KeyUsagePropertyFlagsSchema.optional(),
  }),
  Algorithm: z.enum(["RSA", "ECDH_P256", "ECDH_P384", "ECDH_P521"]),
});

const PrivateKeyFlagsV3Schema = z.object({
  ExportableKey: z.boolean().optional(),
  StrongKeyProtectionRequired: z.boolean().optional(),
  RequireAlternateSignatureAlgorithm: z.boolean().optional(),
  ClientVersion: z.enum([
    "WINDOWS_SERVER_2008",
    "WINDOWS_SERVER_2008_R2",
    "WINDOWS_SERVER_2012",
    "WINDOWS_SERVER_2012_R2",
    "WINDOWS_SERVER_2016",
  ]),
});

const EnrollmentFlagsV3Schema = z.object({
  IncludeSymmetricAlgorithms: z.boolean().optional(),
  UserInteractionRequired: z.boolean().optional(),
  RemoveInvalidCertificateFromPersonalStore: z.boolean().optional(),
  NoSecurityExtension: z.boolean().optional(),
  EnableKeyReuseOnNtTokenKeysetStorageFull: z.boolean().optional(),
});

const SubjectNameFlagsV3Schema = z.object({
  SanRequireDomainDns: z.boolean().optional(),
  SanRequireSpn: z.boolean().optional(),
  SanRequireDirectoryGuid: z.boolean().optional(),
  SanRequireUpn: z.boolean().optional(),
  SanRequireEmail: z.boolean().optional(),
  SanRequireDns: z.boolean().optional(),
  RequireDnsAsCn: z.boolean().optional(),
  RequireEmail: z.boolean().optional(),
  RequireCommonName: z.boolean().optional(),
  RequireDirectoryPath: z.boolean().optional(),
});

const GeneralFlagsV3Schema = z.object({
  AutoEnrollment: z.boolean().optional(),
  MachineType: z.boolean().optional(),
});

const ExtensionsV3Schema = z.object({
  KeyUsage: KeyUsageSchema,
  ApplicationPolicies: ApplicationPoliciesSchema.optional(),
});

const TemplateV3Schema = z.object({
  CertificateValidity: CertificateValiditySchema,
  SupersededTemplates: z.array(
    z.string().min(1).max(64).regex(
      new RegExp("^(?!^\\s+$)((?![\\x5c'\\x2b,;<=>#\\x22])([\\x20-\\x7E]))+$"),
    ),
  ).optional(),
  PrivateKeyAttributes: PrivateKeyAttributesV3Schema,
  PrivateKeyFlags: PrivateKeyFlagsV3Schema,
  EnrollmentFlags: EnrollmentFlagsV3Schema,
  SubjectNameFlags: SubjectNameFlagsV3Schema,
  GeneralFlags: GeneralFlagsV3Schema,
  HashAlgorithm: z.enum(["SHA256", "SHA384", "SHA512"]),
  Extensions: ExtensionsV3Schema,
});

const PrivateKeyAttributesV4Schema = z.object({
  MinimalKeyLength: z.number().min(1),
  KeySpec: z.enum(["KEY_EXCHANGE", "SIGNATURE"]),
  CryptoProviders: z.array(z.string().min(1).max(100)).optional(),
  KeyUsageProperty: z.object({
    PropertyType: z.enum(["ALL"]).optional(),
    PropertyFlags: KeyUsagePropertyFlagsSchema.optional(),
  }).optional(),
  Algorithm: z.enum(["RSA", "ECDH_P256", "ECDH_P384", "ECDH_P521"]).optional(),
});

const PrivateKeyFlagsV4Schema = z.object({
  ExportableKey: z.boolean().optional(),
  StrongKeyProtectionRequired: z.boolean().optional(),
  RequireAlternateSignatureAlgorithm: z.boolean().optional(),
  RequireSameKeyRenewal: z.boolean().optional(),
  UseLegacyProvider: z.boolean().optional(),
  ClientVersion: z.enum([
    "WINDOWS_SERVER_2012",
    "WINDOWS_SERVER_2012_R2",
    "WINDOWS_SERVER_2016",
  ]),
});

const EnrollmentFlagsV4Schema = z.object({
  IncludeSymmetricAlgorithms: z.boolean().optional(),
  UserInteractionRequired: z.boolean().optional(),
  RemoveInvalidCertificateFromPersonalStore: z.boolean().optional(),
  NoSecurityExtension: z.boolean().optional(),
  EnableKeyReuseOnNtTokenKeysetStorageFull: z.boolean().optional(),
});

const SubjectNameFlagsV4Schema = z.object({
  SanRequireDomainDns: z.boolean().optional(),
  SanRequireSpn: z.boolean().optional(),
  SanRequireDirectoryGuid: z.boolean().optional(),
  SanRequireUpn: z.boolean().optional(),
  SanRequireEmail: z.boolean().optional(),
  SanRequireDns: z.boolean().optional(),
  RequireDnsAsCn: z.boolean().optional(),
  RequireEmail: z.boolean().optional(),
  RequireCommonName: z.boolean().optional(),
  RequireDirectoryPath: z.boolean().optional(),
});

const GeneralFlagsV4Schema = z.object({
  AutoEnrollment: z.boolean().optional(),
  MachineType: z.boolean().optional(),
});

const ExtensionsV4Schema = z.object({
  KeyUsage: KeyUsageSchema,
  ApplicationPolicies: ApplicationPoliciesSchema.optional(),
});

const TemplateV4Schema = z.object({
  CertificateValidity: CertificateValiditySchema,
  SupersededTemplates: z.array(
    z.string().min(1).max(64).regex(
      new RegExp("^(?!^\\s+$)((?![\\x5c'\\x2b,;<=>#\\x22])([\\x20-\\x7E]))+$"),
    ),
  ).optional(),
  PrivateKeyAttributes: PrivateKeyAttributesV4Schema,
  PrivateKeyFlags: PrivateKeyFlagsV4Schema,
  EnrollmentFlags: EnrollmentFlagsV4Schema,
  SubjectNameFlags: SubjectNameFlagsV4Schema,
  GeneralFlags: GeneralFlagsV4Schema,
  HashAlgorithm: z.enum(["SHA256", "SHA384", "SHA512"]).optional(),
  Extensions: ExtensionsV4Schema,
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ConnectorArn: z.string().min(5).max(200).regex(
    new RegExp(
      "^arn:[\\w-]+:pca-connector-ad:[\\w-]+:[0-9]+:connector\\/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$",
    ),
  ),
  Definition: z.object({
    TemplateV2: TemplateV2Schema.optional(),
    TemplateV3: TemplateV3Schema.optional(),
    TemplateV4: TemplateV4Schema.optional(),
  }),
  Name: z.string().min(1).max(64).regex(
    new RegExp("^(?!^\\s+$)((?![\\x5c'\\x2b,;<=>#\\x22])([\\x20-\\x7E]))+$"),
  ),
  ReenrollAllCertificateHolders: z.boolean().optional(),
  Tags: z.record(z.string(), z.string()).optional(),
});

const StateSchema = z.object({
  ConnectorArn: z.string().optional(),
  Definition: z.object({
    TemplateV2: TemplateV2Schema,
    TemplateV3: TemplateV3Schema,
    TemplateV4: TemplateV4Schema,
  }).optional(),
  Name: z.string().optional(),
  ReenrollAllCertificateHolders: z.boolean().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TemplateArn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ConnectorArn: z.string().min(5).max(200).regex(
    new RegExp(
      "^arn:[\\w-]+:pca-connector-ad:[\\w-]+:[0-9]+:connector\\/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$",
    ),
  ).optional(),
  Definition: z.object({
    TemplateV2: TemplateV2Schema.optional(),
    TemplateV3: TemplateV3Schema.optional(),
    TemplateV4: TemplateV4Schema.optional(),
  }).optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("^(?!^\\s+$)((?![\\x5c'\\x2b,;<=>#\\x22])([\\x20-\\x7E]))+$"),
  ).optional(),
  ReenrollAllCertificateHolders: z.boolean().optional(),
  Tags: z.record(z.string(), z.string()).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for PCAConnectorAD Template. Registered at `@swamp/aws/pcaconnectorad/template`. */
export const model = {
  type: "@swamp/aws/pcaconnectorad/template",
  version: "2026.06.06.1",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "PCAConnectorAD Template resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a PCAConnectorAD Template",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::PCAConnectorAD::Template",
          desiredState,
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
      description: "Get a PCAConnectorAD Template",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PCAConnectorAD Template",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::PCAConnectorAD::Template",
          args.identifier,
          credentials,
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
      description: "Update a PCAConnectorAD Template",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.TemplateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::PCAConnectorAD::Template",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::PCAConnectorAD::Template",
          identifier,
          currentState,
          desiredState,
          ["ConnectorArn", "Name"],
          credentials,
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
      description: "Delete a PCAConnectorAD Template",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PCAConnectorAD Template",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::PCAConnectorAD::Template",
          args.identifier,
          credentials,
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
      description: "Sync PCAConnectorAD Template state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.TemplateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::PCAConnectorAD::Template",
            identifier,
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
