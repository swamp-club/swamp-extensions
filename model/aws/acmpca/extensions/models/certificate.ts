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

// Auto-generated extension model for @swamp/aws/acmpca/certificate
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ACMPCA Certificate (AWS::ACMPCA::Certificate).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const QualifierSchema = z.object({
  CpsUri: z.string().describe(
    "Contains a pointer to a certification practice statement (CPS) published by the CA.",
  ),
});

const PolicyQualifierInfoSchema = z.object({
  PolicyQualifierId: z.string().describe(
    "Identifies the qualifier modifying a CertPolicyId.",
  ),
  Qualifier: QualifierSchema.describe(
    "Defines the qualifier type. AWS Private CA supports the use of a URI for a CPS qualifier in this field.",
  ),
});

const PolicyInformationSchema = z.object({
  CertPolicyId: z.string().describe(
    "Specifies the object identifier (OID) of the certificate policy under which the certificate was issued. For more information, see NIST's definition of [Object Identifier (OID)](https://docs.aws.amazon.com/https://csrc.nist.gov/glossary/term/Object_Identifier).",
  ),
  PolicyQualifiers: z.array(PolicyQualifierInfoSchema).describe(
    "Modifies the given CertPolicyId with a qualifier. AWS Private CA supports the certification practice statement (CPS) qualifier.",
  ).optional(),
});

const ExtendedKeyUsageSchema = z.object({
  ExtendedKeyUsageType: z.string().describe(
    "Specifies a standard ExtendedKeyUsage as defined as in [RFC 5280](https://docs.aws.amazon.com/https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.12).",
  ).optional(),
  ExtendedKeyUsageObjectIdentifier: z.string().describe(
    "Specifies a custom ExtendedKeyUsage with an object identifier (OID).",
  ).optional(),
});

const KeyUsageSchema = z.object({
  DigitalSignature: z.boolean().describe("Key can be used for digital signing.")
    .optional(),
  NonRepudiation: z.boolean().describe("Key can be used for non-repudiation.")
    .optional(),
  KeyEncipherment: z.boolean().describe("Key can be used to encipher data.")
    .optional(),
  DataEncipherment: z.boolean().describe("Key can be used to decipher data.")
    .optional(),
  KeyAgreement: z.boolean().describe(
    "Key can be used in a key-agreement protocol.",
  ).optional(),
  KeyCertSign: z.boolean().describe("Key can be used to sign certificates.")
    .optional(),
  CRLSign: z.boolean().describe("Key can be used to sign CRLs.").optional(),
  EncipherOnly: z.boolean().describe("Key can be used only to encipher data.")
    .optional(),
  DecipherOnly: z.boolean().describe("Key can be used only to decipher data.")
    .optional(),
});

const OtherNameSchema = z.object({
  TypeId: z.string().describe("Specifies an OID."),
  Value: z.string().describe("Specifies an OID value."),
});

const CustomAttributeSchema = z.object({
  ObjectIdentifier: z.string().describe(
    "Specifies the object identifier (OID) of the attribute type of the relative distinguished name (RDN).",
  ),
  Value: z.string().describe(
    "Specifies the attribute value of relative distinguished name (RDN).",
  ),
});

const SubjectSchema = z.object({
  Country: z.string().describe(
    "Two-digit code that specifies the country in which the certificate subject located.",
  ).optional(),
  Organization: z.string().describe(
    "Legal name of the organization with which the certificate subject is affiliated.",
  ).optional(),
  OrganizationalUnit: z.string().describe(
    "A subdivision or unit of the organization (such as sales or finance) with which the certificate subject is affiliated.",
  ).optional(),
  DistinguishedNameQualifier: z.string().describe(
    "Disambiguating information for the certificate subject.",
  ).optional(),
  State: z.string().describe(
    "State in which the subject of the certificate is located.",
  ).optional(),
  CommonName: z.string().describe(
    "For CA and end-entity certificates in a private PKI, the common name (CN) can be any string within the length limit. Note: In publicly trusted certificates, the common name must be a fully qualified domain name (FQDN) associated with the certificate subject.",
  ).optional(),
  SerialNumber: z.string().describe("The certificate serial number.")
    .optional(),
  Locality: z.string().describe(
    "The locality (such as a city or town) in which the certificate subject is located.",
  ).optional(),
  Title: z.string().describe(
    "A title such as Mr. or Ms., which is pre-pended to the name to refer formally to the certificate subject.",
  ).optional(),
  Surname: z.string().describe(
    "Family name. In the US and the UK, for example, the surname of an individual is ordered last. In Asian cultures the surname is typically ordered first.",
  ).optional(),
  GivenName: z.string().describe("First name.").optional(),
  Initials: z.string().describe(
    "Concatenation that typically contains the first letter of the *GivenName*, the first letter of the middle name if one exists, and the first letter of the *Surname*.",
  ).optional(),
  Pseudonym: z.string().describe(
    "Typically a shortened version of a longer *GivenName*. For example, Jonathan is often shortened to John. Elizabeth is often shortened to Beth, Liz, or Eliza.",
  ).optional(),
  GenerationQualifier: z.string().describe(
    "Typically a qualifier appended to the name of an individual. Examples include Jr. for junior, Sr. for senior, and III for third.",
  ).optional(),
  CustomAttributes: z.array(CustomAttributeSchema).describe(
    "Contains a sequence of one or more X.500 relative distinguished names (RDNs), each of which consists of an object identifier (OID) and a value. For more information, see NIST’s definition of [Object Identifier (OID)](https://docs.aws.amazon.com/https://csrc.nist.gov/glossary/term/Object_Identifier). Custom attributes cannot be used in combination with standard attributes.",
  ).optional(),
});

const EdiPartyNameSchema = z.object({
  PartyName: z.string().describe("Specifies the party name."),
  NameAssigner: z.string().describe("Specifies the name assigner."),
});

const GeneralNameSchema = z.object({
  OtherName: OtherNameSchema.describe(
    "Represents GeneralName using an OtherName object.",
  ).optional(),
  Rfc822Name: z.string().describe(
    "Represents GeneralName as an [RFC 822](https://docs.aws.amazon.com/https://datatracker.ietf.org/doc/html/rfc822) email address.",
  ).optional(),
  DnsName: z.string().describe("Represents GeneralName as a DNS name.")
    .optional(),
  DirectoryName: SubjectSchema.describe(
    "Contains information about the certificate subject. The certificate can be one issued by your private certificate authority (CA) or it can be your private CA certificate. The Subject field in the certificate identifies the entity that owns or controls the public key in the certificate. The entity can be a user, computer, device, or service. The Subject must contain an X.500 distinguished name (DN). A DN is a sequence of relative distinguished names (RDNs). The RDNs are separated by commas in the certificate. The DN must be unique for each entity, but your private CA can issue more than one certificate with the same DN to the same entity.",
  ).optional(),
  EdiPartyName: EdiPartyNameSchema.describe(
    "Represents GeneralName as an EdiPartyName object.",
  ).optional(),
  UniformResourceIdentifier: z.string().describe(
    "Represents GeneralName as a URI.",
  ).optional(),
  IpAddress: z.string().describe(
    "Represents GeneralName as an IPv4 or IPv6 address.",
  ).optional(),
  RegisteredId: z.string().describe(
    "Represents GeneralName as an object identifier (OID).",
  ).optional(),
});

const CustomExtensionSchema = z.object({
  Critical: z.boolean().describe(
    "Specifies the critical flag of the X.509 extension.",
  ).optional(),
  ObjectIdentifier: z.string().describe(
    "Specifies the object identifier (OID) of the X.509 extension. For more information, see the [Global OID reference database.](https://docs.aws.amazon.com/https://oidref.com/2.5.29)",
  ),
  Value: z.string().describe(
    "Specifies the base64-encoded value of the X.509 extension.",
  ),
});

const ExtensionsSchema = z.object({
  CertificatePolicies: z.array(PolicyInformationSchema).describe(
    "Contains a sequence of one or more policy information terms, each of which consists of an object identifier (OID) and optional qualifiers. For more information, see NIST's definition of [Object Identifier (OID)](https://docs.aws.amazon.com/https://csrc.nist.gov/glossary/term/Object_Identifier). In an end-entity certificate, these terms indicate the policy under which the certificate was issued and the purposes for which it may be used. In a CA certificate, these terms limit the set of policies for certification paths that include this certificate.",
  ).optional(),
  ExtendedKeyUsage: z.array(ExtendedKeyUsageSchema).describe(
    "Specifies additional purposes for which the certified public key may be used other than basic purposes indicated in the KeyUsage extension.",
  ).optional(),
  KeyUsage: KeyUsageSchema.describe(
    "Defines one or more purposes for which the key contained in the certificate can be used. Default value for each option is false.",
  ).optional(),
  SubjectAlternativeNames: z.array(GeneralNameSchema).describe(
    "The subject alternative name extension allows identities to be bound to the subject of the certificate. These identities may be included in addition to or in place of the identity in the subject field of the certificate.",
  ).optional(),
  CustomExtensions: z.array(CustomExtensionSchema).describe(
    "Contains a sequence of one or more X.509 extensions, each of which consists of an object identifier (OID), a base64-encoded value, and the critical flag. For more information, see the [Global OID reference database.](https://docs.aws.amazon.com/https://oidref.com/2.5.29)",
  ).optional(),
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
  ApiPassthrough: z.object({
    Extensions: ExtensionsSchema.describe(
      "Specifies X.509 extension information for a certificate.",
    ).optional(),
    Subject: SubjectSchema.describe(
      "Contains information about the certificate subject. The Subject field in the certificate identifies the entity that owns or controls the public key in the certificate. The entity can be a user, computer, device, or service. The Subject must contain an X.500 distinguished name (DN). A DN is a sequence of relative distinguished names (RDNs). The RDNs are separated by commas in the certificate.",
    ).optional(),
  }).describe(
    "Specifies X.509 certificate information to be included in the issued certificate. An APIPassthrough or APICSRPassthrough template variant must be selected, or else this parameter is ignored.",
  ).optional(),
  CertificateAuthorityArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the private CA issues the certificate.",
  ),
  CertificateSigningRequest: z.string().min(1).describe(
    "The certificate signing request (CSR) for the certificate.",
  ),
  SigningAlgorithm: z.string().describe(
    "The name of the algorithm that will be used to sign the certificate to be issued. This parameter should not be confused with the SigningAlgorithm parameter used to sign a CSR in the CreateCertificateAuthority action. The specified signing algorithm family (RSA or ECDSA) must match the algorithm family of the CA's secret key.",
  ),
  TemplateArn: z.string().describe(
    "Specifies a custom configuration template to use when issuing a certificate. If this parameter is not provided, PCAshort defaults to the EndEntityCertificate/V1 template. For more information about PCAshort templates, see [Using Templates](https://docs.aws.amazon.com/privateca/latest/userguide/UsingTemplates.html).",
  ).optional(),
  Validity: z.object({
    Value: z.number().describe(
      "A long integer interpreted according to the value of Type, below.",
    ),
    Type: z.string().describe(
      "Specifies whether the Value parameter represents days, months, or years.",
    ),
  }).describe("The period of time during which the certificate will be valid."),
  ValidityNotBefore: z.object({
    Value: z.number().describe(
      "A long integer interpreted according to the value of Type, below.",
    ),
    Type: z.string().describe(
      "Specifies whether the Value parameter represents days, months, or years.",
    ),
  }).describe(
    'Information describing the start of the validity period of the certificate. This parameter sets the “Not Before" date for the certificate. By default, when issuing a certificate, PCAshort sets the "Not Before" date to the issuance time minus 60 minutes. This compensates for clock inconsistencies across computer systems. The ValidityNotBefore parameter can be used to customize the “Not Before” value. Unlike the Validity parameter, the ValidityNotBefore parameter is optional. The ValidityNotBefore value is expressed as an explicit date and time, using the Validity type value ABSOLUTE.',
  ).optional(),
});

const StateSchema = z.object({
  ApiPassthrough: z.object({
    Extensions: ExtensionsSchema,
    Subject: SubjectSchema,
  }).optional(),
  CertificateAuthorityArn: z.string(),
  CertificateSigningRequest: z.string().optional(),
  SigningAlgorithm: z.string().optional(),
  TemplateArn: z.string().optional(),
  Validity: z.object({
    Value: z.number(),
    Type: z.string(),
  }).optional(),
  ValidityNotBefore: z.object({
    Value: z.number(),
    Type: z.string(),
  }).optional(),
  Certificate: z.string().optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApiPassthrough: z.object({
    Extensions: ExtensionsSchema.describe(
      "Specifies X.509 extension information for a certificate.",
    ).optional(),
    Subject: SubjectSchema.describe(
      "Contains information about the certificate subject. The Subject field in the certificate identifies the entity that owns or controls the public key in the certificate. The entity can be a user, computer, device, or service. The Subject must contain an X.500 distinguished name (DN). A DN is a sequence of relative distinguished names (RDNs). The RDNs are separated by commas in the certificate.",
    ).optional(),
  }).describe(
    "Specifies X.509 certificate information to be included in the issued certificate. An APIPassthrough or APICSRPassthrough template variant must be selected, or else this parameter is ignored.",
  ).optional(),
  CertificateAuthorityArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the private CA issues the certificate.",
  ).optional(),
  CertificateSigningRequest: z.string().min(1).describe(
    "The certificate signing request (CSR) for the certificate.",
  ).optional(),
  SigningAlgorithm: z.string().describe(
    "The name of the algorithm that will be used to sign the certificate to be issued. This parameter should not be confused with the SigningAlgorithm parameter used to sign a CSR in the CreateCertificateAuthority action. The specified signing algorithm family (RSA or ECDSA) must match the algorithm family of the CA's secret key.",
  ).optional(),
  TemplateArn: z.string().describe(
    "Specifies a custom configuration template to use when issuing a certificate. If this parameter is not provided, PCAshort defaults to the EndEntityCertificate/V1 template. For more information about PCAshort templates, see [Using Templates](https://docs.aws.amazon.com/privateca/latest/userguide/UsingTemplates.html).",
  ).optional(),
  Validity: z.object({
    Value: z.number().describe(
      "A long integer interpreted according to the value of Type, below.",
    ).optional(),
    Type: z.string().describe(
      "Specifies whether the Value parameter represents days, months, or years.",
    ).optional(),
  }).describe("The period of time during which the certificate will be valid.")
    .optional(),
  ValidityNotBefore: z.object({
    Value: z.number().describe(
      "A long integer interpreted according to the value of Type, below.",
    ).optional(),
    Type: z.string().describe(
      "Specifies whether the Value parameter represents days, months, or years.",
    ).optional(),
  }).describe(
    'Information describing the start of the validity period of the certificate. This parameter sets the “Not Before" date for the certificate. By default, when issuing a certificate, PCAshort sets the "Not Before" date to the issuance time minus 60 minutes. This compensates for clock inconsistencies across computer systems. The ValidityNotBefore parameter can be used to customize the “Not Before” value. Unlike the Validity parameter, the ValidityNotBefore parameter is optional. The ValidityNotBefore value is expressed as an explicit date and time, using the Validity type value ABSOLUTE.',
  ).optional(),
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

/** Swamp extension model for ACMPCA Certificate. Registered at `@swamp/aws/acmpca/certificate`. */
export const model = {
  type: "@swamp/aws/acmpca/certificate",
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
      description: "ACMPCA Certificate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ACMPCA Certificate",
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
          "AWS::ACMPCA::Certificate",
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
      description: "Get a ACMPCA Certificate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ACMPCA Certificate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ACMPCA::Certificate",
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
    delete: {
      description: "Delete a ACMPCA Certificate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ACMPCA Certificate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ACMPCA::Certificate",
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
      description: "Sync ACMPCA Certificate state from AWS",
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
        const idParts = [
          existing.Arn?.toString(),
          existing.CertificateAuthorityArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ACMPCA::Certificate",
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
