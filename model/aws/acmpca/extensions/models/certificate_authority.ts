// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/acmpca/certificate-authority
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ACMPCA CertificateAuthority (AWS::ACMPCA::CertificateAuthority).
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

const CustomAttributeSchema = z.object({
  ObjectIdentifier: z.string().describe(
    "String that contains X.509 ObjectIdentifier information.",
  ),
  Value: z.string(),
});

const CrlDistributionPointExtensionConfigurationSchema = z.object({
  OmitExtension: z.boolean(),
});

const CrlConfigurationSchema = z.object({
  Enabled: z.boolean(),
  ExpirationInDays: z.number().int().optional(),
  CustomCname: z.string().optional(),
  S3BucketName: z.string().optional(),
  S3ObjectAcl: z.string().optional(),
  CrlDistributionPointExtensionConfiguration:
    CrlDistributionPointExtensionConfigurationSchema.describe(
      "Configures the default behavior of the CRL Distribution Point extension for certificates issued by your certificate authority",
    ).optional(),
  CrlType: z.string().optional(),
  CustomPath: z.string().optional(),
});

const OcspConfigurationSchema = z.object({
  Enabled: z.boolean(),
  OcspCustomCname: z.string().optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string().optional(),
});

const KeyUsageSchema = z.object({
  DigitalSignature: z.boolean().optional(),
  NonRepudiation: z.boolean().optional(),
  KeyEncipherment: z.boolean().optional(),
  DataEncipherment: z.boolean().optional(),
  KeyAgreement: z.boolean().optional(),
  KeyCertSign: z.boolean().optional(),
  CRLSign: z.boolean().optional(),
  EncipherOnly: z.boolean().optional(),
  DecipherOnly: z.boolean().optional(),
});

const AccessMethodSchema = z.object({
  CustomObjectIdentifier: z.string().describe(
    "String that contains X.509 ObjectIdentifier information.",
  ).optional(),
  AccessMethodType: z.string().describe(
    "Pre-defined enum string for X.509 AccessMethod ObjectIdentifiers.",
  ).optional(),
});

const OtherNameSchema = z.object({
  TypeId: z.string().describe(
    "String that contains X.509 ObjectIdentifier information.",
  ),
  Value: z.string(),
});

const SubjectSchema = z.object({
  Country: z.string().optional(),
  Organization: z.string().optional(),
  OrganizationalUnit: z.string().optional(),
  DistinguishedNameQualifier: z.string().optional(),
  State: z.string().optional(),
  CommonName: z.string().optional(),
  SerialNumber: z.string().optional(),
  Locality: z.string().optional(),
  Title: z.string().optional(),
  Surname: z.string().optional(),
  GivenName: z.string().optional(),
  Initials: z.string().optional(),
  Pseudonym: z.string().optional(),
  GenerationQualifier: z.string().optional(),
  CustomAttributes: z.array(CustomAttributeSchema).describe(
    "Array of X.500 attribute type and value. CustomAttributes cannot be used along with pre-defined attributes.",
  ).optional(),
});

const EdiPartyNameSchema = z.object({
  PartyName: z.string(),
  NameAssigner: z.string().optional(),
});

const GeneralNameSchema = z.object({
  OtherName: OtherNameSchema.describe(
    "Structure that contains X.509 OtherName information.",
  ).optional(),
  Rfc822Name: z.string().describe(
    "String that contains X.509 Rfc822Name information.",
  ).optional(),
  DnsName: z.string().describe(
    "String that contains X.509 DnsName information.",
  ).optional(),
  DirectoryName: SubjectSchema.describe(
    "Structure that contains X.500 distinguished name information for your CA.",
  ).optional(),
  EdiPartyName: EdiPartyNameSchema.describe(
    "Structure that contains X.509 EdiPartyName information.",
  ).optional(),
  UniformResourceIdentifier: z.string().describe(
    "String that contains X.509 UniformResourceIdentifier information.",
  ).optional(),
  IpAddress: z.string().describe(
    "String that contains X.509 IpAddress information.",
  ).optional(),
  RegisteredId: z.string().describe(
    "String that contains X.509 ObjectIdentifier information.",
  ).optional(),
});

const AccessDescriptionSchema = z.object({
  AccessMethod: AccessMethodSchema.describe(
    "Structure that contains X.509 AccessMethod information. Assign one and ONLY one field.",
  ),
  AccessLocation: GeneralNameSchema.describe(
    "Structure that contains X.509 GeneralName information. Assign one and ONLY one field.",
  ),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Type: z.string().describe("The type of the certificate authority."),
  KeyAlgorithm: z.string().describe(
    "Public key algorithm and size, in bits, of the key pair that your CA creates when it issues a certificate.",
  ),
  SigningAlgorithm: z.string().describe(
    "Algorithm your CA uses to sign certificate requests.",
  ),
  Subject: z.object({
    Country: z.string().optional(),
    Organization: z.string().optional(),
    OrganizationalUnit: z.string().optional(),
    DistinguishedNameQualifier: z.string().optional(),
    State: z.string().optional(),
    CommonName: z.string().optional(),
    SerialNumber: z.string().optional(),
    Locality: z.string().optional(),
    Title: z.string().optional(),
    Surname: z.string().optional(),
    GivenName: z.string().optional(),
    Initials: z.string().optional(),
    Pseudonym: z.string().optional(),
    GenerationQualifier: z.string().optional(),
    CustomAttributes: z.array(CustomAttributeSchema).describe(
      "Array of X.500 attribute type and value. CustomAttributes cannot be used along with pre-defined attributes.",
    ).optional(),
  }).describe(
    "Structure that contains X.500 distinguished name information for your CA.",
  ),
  RevocationConfiguration: z.object({
    CrlConfiguration: CrlConfigurationSchema.describe(
      "Your certificate authority can create and maintain a certificate revocation list (CRL). A CRL contains information about certificates that have been revoked.",
    ).optional(),
    OcspConfiguration: OcspConfigurationSchema.describe(
      "Helps to configure online certificate status protocol (OCSP) responder for your certificate authority",
    ).optional(),
  }).describe(
    "Certificate revocation information used by the CreateCertificateAuthority and UpdateCertificateAuthority actions.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  CsrExtensions: z.object({
    KeyUsage: KeyUsageSchema.describe(
      "Structure that contains X.509 KeyUsage information.",
    ).optional(),
    SubjectInformationAccess: z.array(AccessDescriptionSchema).describe(
      "Array of X.509 AccessDescription.",
    ).optional(),
  }).describe(
    "Structure that contains CSR pass through extension information used by the CreateCertificateAuthority action.",
  ).optional(),
  KeyStorageSecurityStandard: z.string().describe(
    "KeyStorageSecurityStadard defines a cryptographic key management compliance standard used for handling CA keys.",
  ).optional(),
  UsageMode: z.string().describe("Usage mode of the ceritificate authority.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Type: z.string().optional(),
  KeyAlgorithm: z.string().optional(),
  SigningAlgorithm: z.string().optional(),
  Subject: SubjectSchema.optional(),
  RevocationConfiguration: z.object({
    CrlConfiguration: CrlConfigurationSchema,
    OcspConfiguration: OcspConfigurationSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CertificateSigningRequest: z.string().optional(),
  CsrExtensions: z.object({
    KeyUsage: KeyUsageSchema,
    SubjectInformationAccess: z.array(AccessDescriptionSchema),
  }).optional(),
  KeyStorageSecurityStandard: z.string().optional(),
  UsageMode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Type: z.string().describe("The type of the certificate authority.")
    .optional(),
  KeyAlgorithm: z.string().describe(
    "Public key algorithm and size, in bits, of the key pair that your CA creates when it issues a certificate.",
  ).optional(),
  SigningAlgorithm: z.string().describe(
    "Algorithm your CA uses to sign certificate requests.",
  ).optional(),
  Subject: z.object({
    Country: z.string().optional(),
    Organization: z.string().optional(),
    OrganizationalUnit: z.string().optional(),
    DistinguishedNameQualifier: z.string().optional(),
    State: z.string().optional(),
    CommonName: z.string().optional(),
    SerialNumber: z.string().optional(),
    Locality: z.string().optional(),
    Title: z.string().optional(),
    Surname: z.string().optional(),
    GivenName: z.string().optional(),
    Initials: z.string().optional(),
    Pseudonym: z.string().optional(),
    GenerationQualifier: z.string().optional(),
    CustomAttributes: z.array(CustomAttributeSchema).describe(
      "Array of X.500 attribute type and value. CustomAttributes cannot be used along with pre-defined attributes.",
    ).optional(),
  }).describe(
    "Structure that contains X.500 distinguished name information for your CA.",
  ).optional(),
  RevocationConfiguration: z.object({
    CrlConfiguration: CrlConfigurationSchema.describe(
      "Your certificate authority can create and maintain a certificate revocation list (CRL). A CRL contains information about certificates that have been revoked.",
    ).optional(),
    OcspConfiguration: OcspConfigurationSchema.describe(
      "Helps to configure online certificate status protocol (OCSP) responder for your certificate authority",
    ).optional(),
  }).describe(
    "Certificate revocation information used by the CreateCertificateAuthority and UpdateCertificateAuthority actions.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  CsrExtensions: z.object({
    KeyUsage: KeyUsageSchema.describe(
      "Structure that contains X.509 KeyUsage information.",
    ).optional(),
    SubjectInformationAccess: z.array(AccessDescriptionSchema).describe(
      "Array of X.509 AccessDescription.",
    ).optional(),
  }).describe(
    "Structure that contains CSR pass through extension information used by the CreateCertificateAuthority action.",
  ).optional(),
  KeyStorageSecurityStandard: z.string().describe(
    "KeyStorageSecurityStadard defines a cryptographic key management compliance standard used for handling CA keys.",
  ).optional(),
  UsageMode: z.string().describe("Usage mode of the ceritificate authority.")
    .optional(),
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

/** Swamp extension model for ACMPCA CertificateAuthority. Registered at `@swamp/aws/acmpca/certificate-authority`. */
export const model = {
  type: "@swamp/aws/acmpca/certificate-authority",
  version: "2026.06.15.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ACMPCA CertificateAuthority resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ACMPCA CertificateAuthority",
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
          "AWS::ACMPCA::CertificateAuthority",
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
      description: "Get a ACMPCA CertificateAuthority",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ACMPCA CertificateAuthority",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ACMPCA::CertificateAuthority",
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
      description: "Update a ACMPCA CertificateAuthority",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ACMPCA::CertificateAuthority",
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
          "AWS::ACMPCA::CertificateAuthority",
          identifier,
          currentState,
          desiredState,
          [
            "Type",
            "KeyAlgorithm",
            "SigningAlgorithm",
            "Subject",
            "CsrExtensions",
            "KeyStorageSecurityStandard",
            "UsageMode",
          ],
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
      description: "Delete a ACMPCA CertificateAuthority",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ACMPCA CertificateAuthority",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ACMPCA::CertificateAuthority",
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
      description: "Sync ACMPCA CertificateAuthority state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ACMPCA::CertificateAuthority",
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
