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

// Auto-generated extension model for @swamp/gcp/privateca/capools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Authority CaPools.
 *
 * A CaPool represents a group of CertificateAuthorities that form a trust anchor. A CaPool can be used to manage issuance policies for one or more CertificateAuthority resources and to rotate CA certificates in and out of the trust anchor.
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
  return `${parent}/caPools/${shortName}`;
}

const BASE_URL = "https://privateca.googleapis.com/";

const GET_CONFIG = {
  "id": "privateca.projects.locations.caPools.get",
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
  "id": "privateca.projects.locations.caPools.create",
  "path": "v1/{+parent}/caPools",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "caPoolId": {
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
  "id": "privateca.projects.locations.caPools.patch",
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
  "id": "privateca.projects.locations.caPools.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "ignoreDependentResources": {
      "location": "query",
    },
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
  "id": "privateca.projects.locations.caPools.list",
  "path": "v1/{+parent}/caPools",
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
  encryptionSpec: z.object({
    cloudKmsKey: z.string().describe(
      "The resource name for a Cloud KMS key in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe(
    "Optional. When EncryptionSpec is provided, the Subject, SubjectAltNames, and the PEM-encoded certificate fields will be encrypted at rest.",
  ).optional(),
  issuancePolicy: z.object({
    allowRequesterSpecifiedNotBeforeTime: z.boolean().describe(
      "Optional. If set to true, allows requesters to specify the requested_not_before_time field when creating a Certificate. Certificates requested with this option enabled will have a 'not_before_time' equal to the value specified in the request. The 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum time that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if backdate_duration is set.",
    ).optional(),
    allowedIssuanceModes: z.object({
      allowConfigBasedIssuance: z.boolean().describe(
        "Optional. When true, allows callers to create Certificates by specifying a CertificateConfig.",
      ).optional(),
      allowCsrBasedIssuance: z.boolean().describe(
        "Optional. When true, allows callers to create Certificates by specifying a CSR.",
      ).optional(),
    }).describe(
      "Optional. If specified, then only methods allowed in the IssuanceModes may be used to issue Certificates.",
    ).optional(),
    allowedKeyTypes: z.array(z.object({
      ellipticCurve: z.object({
        signatureAlgorithm: z.enum([
          "EC_SIGNATURE_ALGORITHM_UNSPECIFIED",
          "ECDSA_P256",
          "ECDSA_P384",
          "EDDSA_25519",
        ]).describe(
          "Optional. A signature algorithm that must be used. If this is omitted, any EC-based signature algorithm will be allowed.",
        ).optional(),
      }).describe("Represents an allowed Elliptic Curve key type.").optional(),
      rsa: z.object({
        maxModulusSize: z.string().describe(
          "Optional. The maximum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service will not enforce an explicit upper bound on RSA modulus sizes.",
        ).optional(),
        minModulusSize: z.string().describe(
          "Optional. The minimum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service-level min RSA modulus size will continue to apply.",
        ).optional(),
      }).describe("Represents an allowed RSA key type.").optional(),
    })).describe(
      "Optional. If any AllowedKeyType is specified, then the certificate request's public key must match one of the key types listed here. Otherwise, any key may be used.",
    ).optional(),
    backdateDuration: z.string().describe(
      "Optional. If set, all certificates issued from this CaPool will be backdated by this duration. The 'not_before_time' will be the issuance time minus this backdate_duration, and the 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum duration that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if allow_requester_specified_not_before_time is set.",
    ).optional(),
    baselineValues: z.object({
      additionalExtensions: z.array(z.object({
        critical: z.boolean().describe(
          "Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error).",
        ).optional(),
        objectId: z.object({
          objectIdPath: z.unknown().describe(
            "Required. The parts of an OID path. The most significant parts of the path come first.",
          ).optional(),
        }).describe("Required. The OID for this X.509 extension.").optional(),
        value: z.string().describe(
          "Required. The value of this X.509 extension.",
        ).optional(),
      })).describe("Optional. Describes custom X.509 extensions.").optional(),
      aiaOcspServers: z.array(z.string()).describe(
        'Optional. Describes Online Certificate Status Protocol (OCSP) endpoint addresses that appear in the "Authority Information Access" extension in the certificate.',
      ).optional(),
      caOptions: z.object({
        isCa: z.boolean().describe(
          'Optional. Refers to the "CA" boolean field in the X.509 extension. When this value is missing, the basic constraints extension will be omitted from the certificate.',
        ).optional(),
        maxIssuerPathLength: z.number().int().describe(
          "Optional. Refers to the path length constraint field in the X.509 extension. For a CA certificate, this value describes the depth of subordinate CA certificates that are allowed. If this value is less than 0, the request will fail. If this value is missing, the max path length will be omitted from the certificate.",
        ).optional(),
      }).describe(
        "Optional. Describes options in this X509Parameters that are relevant in a CA certificate. If not specified, a default basic constraints extension with `is_ca=false` will be added for leaf certificates.",
      ).optional(),
      keyUsage: z.object({
        baseKeyUsage: z.object({
          certSign: z.boolean().describe(
            "The key may be used to sign certificates.",
          ).optional(),
          contentCommitment: z.boolean().describe(
            'The key may be used for cryptographic commitments. Note that this may also be referred to as "non-repudiation".',
          ).optional(),
          crlSign: z.boolean().describe(
            "The key may be used sign certificate revocation lists.",
          ).optional(),
          dataEncipherment: z.boolean().describe(
            "The key may be used to encipher data.",
          ).optional(),
          decipherOnly: z.boolean().describe(
            "The key may be used to decipher only.",
          ).optional(),
          digitalSignature: z.boolean().describe(
            "The key may be used for digital signatures.",
          ).optional(),
          encipherOnly: z.boolean().describe(
            "The key may be used to encipher only.",
          ).optional(),
          keyAgreement: z.boolean().describe(
            "The key may be used in a key agreement protocol.",
          ).optional(),
          keyEncipherment: z.boolean().describe(
            "The key may be used to encipher other keys.",
          ).optional(),
        }).describe("Describes high-level ways in which a key may be used.")
          .optional(),
        extendedKeyUsage: z.object({
          clientAuth: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.2. Officially described as "TLS WWW client authentication", though regularly used for non-WWW TLS.',
          ).optional(),
          codeSigning: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.3. Officially described as "Signing of downloadable executable code client authentication".',
          ).optional(),
          emailProtection: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.4. Officially described as "Email protection".',
          ).optional(),
          ocspSigning: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.9. Officially described as "Signing OCSP responses".',
          ).optional(),
          serverAuth: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.1. Officially described as "TLS WWW server authentication", though regularly used for non-WWW TLS.',
          ).optional(),
          timeStamping: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.8. Officially described as "Binding the hash of an object to a time".',
          ).optional(),
        }).describe("Detailed scenarios in which a key may be used.")
          .optional(),
        unknownExtendedKeyUsages: z.array(z.object({
          objectIdPath: z.unknown().describe(
            "Required. The parts of an OID path. The most significant parts of the path come first.",
          ).optional(),
        })).describe(
          "Used to describe extended key usages that are not listed in the KeyUsage.ExtendedKeyUsageOptions message.",
        ).optional(),
      }).describe(
        "Optional. Indicates the intended use for keys that correspond to a certificate.",
      ).optional(),
      nameConstraints: z.object({
        critical: z.boolean().describe(
          "Indicates whether or not the name constraints are marked critical.",
        ).optional(),
        excludedDnsNames: z.array(z.string()).describe(
          "Contains excluded DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not.",
        ).optional(),
        excludedEmailAddresses: z.array(z.string()).describe(
          "Contains the excluded email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain.",
        ).optional(),
        excludedIpRanges: z.array(z.string()).describe(
          "Contains the excluded IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses.",
        ).optional(),
        excludedUris: z.array(z.string()).describe(
          "Contains the excluded URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`)",
        ).optional(),
        permittedDnsNames: z.array(z.string()).describe(
          "Contains permitted DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not.",
        ).optional(),
        permittedEmailAddresses: z.array(z.string()).describe(
          "Contains the permitted email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain.",
        ).optional(),
        permittedIpRanges: z.array(z.string()).describe(
          "Contains the permitted IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses.",
        ).optional(),
        permittedUris: z.array(z.string()).describe(
          "Contains the permitted URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`)",
        ).optional(),
      }).describe("Optional. Describes the X.509 name constraints extension.")
        .optional(),
      policyIds: z.array(z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      })).describe(
        "Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4.",
      ).optional(),
    }).describe(
      "Optional. A set of X.509 values that will be applied to all certificates issued through this CaPool. If a certificate request includes conflicting values for the same properties, they will be overwritten by the values defined here. If a certificate request uses a CertificateTemplate that defines conflicting predefined_values for the same properties, the certificate issuance request will fail.",
    ).optional(),
    identityConstraints: z.object({
      allowSubjectAltNamesPassthrough: z.boolean().describe(
        "Required. If this is true, the SubjectAltNames extension may be copied from a certificate request into the signed certificate. Otherwise, the requested SubjectAltNames will be discarded.",
      ).optional(),
      allowSubjectPassthrough: z.boolean().describe(
        "Required. If this is true, the Subject field may be copied from a certificate request into the signed certificate. Otherwise, the requested Subject will be discarded.",
      ).optional(),
      celExpression: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        "Optional. A CEL expression that may be used to validate the resolved X.509 Subject and/or Subject Alternative Name before a certificate is signed. To see the full allowed syntax and some examples, see https://cloud.google.com/certificate-authority-service/docs/using-cel",
      ).optional(),
    }).describe(
      "Optional. Describes constraints on identities that may appear in Certificates issued through this CaPool. If this is omitted, then this CaPool will not add restrictions on a certificate's identity.",
    ).optional(),
    maximumLifetime: z.string().describe(
      "Optional. The maximum lifetime allowed for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate resource's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it.",
    ).optional(),
    passthroughExtensions: z.object({
      additionalExtensions: z.array(z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      })).describe(
        "Optional. A set of ObjectIds identifying custom X.509 extensions. Will be combined with known_extensions to determine the full set of X.509 extensions.",
      ).optional(),
      knownExtensions: z.array(
        z.enum([
          "KNOWN_CERTIFICATE_EXTENSION_UNSPECIFIED",
          "BASE_KEY_USAGE",
          "EXTENDED_KEY_USAGE",
          "CA_OPTIONS",
          "POLICY_IDS",
          "AIA_OCSP_SERVERS",
          "NAME_CONSTRAINTS",
        ]),
      ).describe(
        "Optional. A set of named X.509 extensions. Will be combined with additional_extensions to determine the full set of X.509 extensions.",
      ).optional(),
    }).describe(
      "Optional. Describes the set of X.509 extensions that may appear in a Certificate issued through this CaPool. If a certificate request sets extensions that don't appear in the passthrough_extensions, those extensions will be dropped. If a certificate request uses a CertificateTemplate with predefined_values that don't appear here, the certificate issuance request will fail. If this is omitted, then this CaPool will not add restrictions on a certificate's X.509 extensions. These constraints do not apply to X.509 extensions set in this CaPool's baseline_values.",
    ).optional(),
  }).describe(
    "Optional. The IssuancePolicy to control how Certificates will be issued from this CaPool.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CaPool in the format `projects/*/locations/*/caPools/*`.",
  ).optional(),
  publishingOptions: z.object({
    encodingFormat: z.enum(["ENCODING_FORMAT_UNSPECIFIED", "PEM", "DER"])
      .describe(
        "Optional. Specifies the encoding format of each CertificateAuthority resource's CA certificate and CRLs. If this is omitted, CA certificates and CRLs will be published in PEM.",
      ).optional(),
    publishCaCert: z.boolean().describe(
      'Optional. When true, publishes each CertificateAuthority\'s CA certificate and includes its URL in the "Authority Information Access" X.509 extension in all issued Certificates. If this is false, the CA certificate will not be published and the corresponding X.509 extension will not be written in issued certificates.',
    ).optional(),
    publishCrl: z.boolean().describe(
      'Optional. When true, publishes each CertificateAuthority\'s CRL and includes its URL in the "CRL Distribution Points" X.509 extension in all issued Certificates. If this is false, CRLs will not be published and the corresponding X.509 extension will not be written in issued certificates. CRLs will expire 7 days from their creation. However, we will rebuild daily. CRLs are also rebuilt shortly after a certificate is revoked.',
    ).optional(),
  }).describe(
    "Optional. The PublishingOptions to follow when issuing Certificates from any CertificateAuthority in this CaPool.",
  ).optional(),
  tier: z.enum(["TIER_UNSPECIFIED", "ENTERPRISE", "DEVOPS"]).describe(
    "Required. Immutable. The Tier of this CaPool.",
  ).optional(),
  caPoolId: z.string().describe(
    "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  encryptionSpec: z.object({
    cloudKmsKey: z.string(),
  }).optional(),
  issuancePolicy: z.object({
    allowRequesterSpecifiedNotBeforeTime: z.boolean(),
    allowedIssuanceModes: z.object({
      allowConfigBasedIssuance: z.boolean(),
      allowCsrBasedIssuance: z.boolean(),
    }),
    allowedKeyTypes: z.array(z.object({
      ellipticCurve: z.object({
        signatureAlgorithm: z.string(),
      }),
      rsa: z.object({
        maxModulusSize: z.string(),
        minModulusSize: z.string(),
      }),
    })),
    backdateDuration: z.string(),
    baselineValues: z.object({
      additionalExtensions: z.array(z.object({
        critical: z.boolean(),
        objectId: z.object({
          objectIdPath: z.unknown(),
        }),
        value: z.string(),
      })),
      aiaOcspServers: z.array(z.string()),
      caOptions: z.object({
        isCa: z.boolean(),
        maxIssuerPathLength: z.number(),
      }),
      keyUsage: z.object({
        baseKeyUsage: z.object({
          certSign: z.boolean(),
          contentCommitment: z.boolean(),
          crlSign: z.boolean(),
          dataEncipherment: z.boolean(),
          decipherOnly: z.boolean(),
          digitalSignature: z.boolean(),
          encipherOnly: z.boolean(),
          keyAgreement: z.boolean(),
          keyEncipherment: z.boolean(),
        }),
        extendedKeyUsage: z.object({
          clientAuth: z.boolean(),
          codeSigning: z.boolean(),
          emailProtection: z.boolean(),
          ocspSigning: z.boolean(),
          serverAuth: z.boolean(),
          timeStamping: z.boolean(),
        }),
        unknownExtendedKeyUsages: z.array(z.object({
          objectIdPath: z.unknown(),
        })),
      }),
      nameConstraints: z.object({
        critical: z.boolean(),
        excludedDnsNames: z.array(z.string()),
        excludedEmailAddresses: z.array(z.string()),
        excludedIpRanges: z.array(z.string()),
        excludedUris: z.array(z.string()),
        permittedDnsNames: z.array(z.string()),
        permittedEmailAddresses: z.array(z.string()),
        permittedIpRanges: z.array(z.string()),
        permittedUris: z.array(z.string()),
      }),
      policyIds: z.array(z.object({
        objectIdPath: z.array(z.unknown()),
      })),
    }),
    identityConstraints: z.object({
      allowSubjectAltNamesPassthrough: z.boolean(),
      allowSubjectPassthrough: z.boolean(),
      celExpression: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
    }),
    maximumLifetime: z.string(),
    passthroughExtensions: z.object({
      additionalExtensions: z.array(z.object({
        objectIdPath: z.array(z.unknown()),
      })),
      knownExtensions: z.array(z.string()),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  publishingOptions: z.object({
    encodingFormat: z.string(),
    publishCaCert: z.boolean(),
    publishCrl: z.boolean(),
  }).optional(),
  tier: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  encryptionSpec: z.object({
    cloudKmsKey: z.string().describe(
      "The resource name for a Cloud KMS key in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe(
    "Optional. When EncryptionSpec is provided, the Subject, SubjectAltNames, and the PEM-encoded certificate fields will be encrypted at rest.",
  ).optional(),
  issuancePolicy: z.object({
    allowRequesterSpecifiedNotBeforeTime: z.boolean().describe(
      "Optional. If set to true, allows requesters to specify the requested_not_before_time field when creating a Certificate. Certificates requested with this option enabled will have a 'not_before_time' equal to the value specified in the request. The 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum time that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if backdate_duration is set.",
    ).optional(),
    allowedIssuanceModes: z.object({
      allowConfigBasedIssuance: z.boolean().describe(
        "Optional. When true, allows callers to create Certificates by specifying a CertificateConfig.",
      ).optional(),
      allowCsrBasedIssuance: z.boolean().describe(
        "Optional. When true, allows callers to create Certificates by specifying a CSR.",
      ).optional(),
    }).describe(
      "Optional. If specified, then only methods allowed in the IssuanceModes may be used to issue Certificates.",
    ).optional(),
    allowedKeyTypes: z.array(z.object({
      ellipticCurve: z.object({
        signatureAlgorithm: z.enum([
          "EC_SIGNATURE_ALGORITHM_UNSPECIFIED",
          "ECDSA_P256",
          "ECDSA_P384",
          "EDDSA_25519",
        ]).describe(
          "Optional. A signature algorithm that must be used. If this is omitted, any EC-based signature algorithm will be allowed.",
        ).optional(),
      }).describe("Represents an allowed Elliptic Curve key type.").optional(),
      rsa: z.object({
        maxModulusSize: z.string().describe(
          "Optional. The maximum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service will not enforce an explicit upper bound on RSA modulus sizes.",
        ).optional(),
        minModulusSize: z.string().describe(
          "Optional. The minimum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service-level min RSA modulus size will continue to apply.",
        ).optional(),
      }).describe("Represents an allowed RSA key type.").optional(),
    })).describe(
      "Optional. If any AllowedKeyType is specified, then the certificate request's public key must match one of the key types listed here. Otherwise, any key may be used.",
    ).optional(),
    backdateDuration: z.string().describe(
      "Optional. If set, all certificates issued from this CaPool will be backdated by this duration. The 'not_before_time' will be the issuance time minus this backdate_duration, and the 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum duration that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if allow_requester_specified_not_before_time is set.",
    ).optional(),
    baselineValues: z.object({
      additionalExtensions: z.array(z.object({
        critical: z.boolean().describe(
          "Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error).",
        ).optional(),
        objectId: z.object({
          objectIdPath: z.unknown().describe(
            "Required. The parts of an OID path. The most significant parts of the path come first.",
          ).optional(),
        }).describe("Required. The OID for this X.509 extension.").optional(),
        value: z.string().describe(
          "Required. The value of this X.509 extension.",
        ).optional(),
      })).describe("Optional. Describes custom X.509 extensions.").optional(),
      aiaOcspServers: z.array(z.string()).describe(
        'Optional. Describes Online Certificate Status Protocol (OCSP) endpoint addresses that appear in the "Authority Information Access" extension in the certificate.',
      ).optional(),
      caOptions: z.object({
        isCa: z.boolean().describe(
          'Optional. Refers to the "CA" boolean field in the X.509 extension. When this value is missing, the basic constraints extension will be omitted from the certificate.',
        ).optional(),
        maxIssuerPathLength: z.number().int().describe(
          "Optional. Refers to the path length constraint field in the X.509 extension. For a CA certificate, this value describes the depth of subordinate CA certificates that are allowed. If this value is less than 0, the request will fail. If this value is missing, the max path length will be omitted from the certificate.",
        ).optional(),
      }).describe(
        "Optional. Describes options in this X509Parameters that are relevant in a CA certificate. If not specified, a default basic constraints extension with `is_ca=false` will be added for leaf certificates.",
      ).optional(),
      keyUsage: z.object({
        baseKeyUsage: z.object({
          certSign: z.boolean().describe(
            "The key may be used to sign certificates.",
          ).optional(),
          contentCommitment: z.boolean().describe(
            'The key may be used for cryptographic commitments. Note that this may also be referred to as "non-repudiation".',
          ).optional(),
          crlSign: z.boolean().describe(
            "The key may be used sign certificate revocation lists.",
          ).optional(),
          dataEncipherment: z.boolean().describe(
            "The key may be used to encipher data.",
          ).optional(),
          decipherOnly: z.boolean().describe(
            "The key may be used to decipher only.",
          ).optional(),
          digitalSignature: z.boolean().describe(
            "The key may be used for digital signatures.",
          ).optional(),
          encipherOnly: z.boolean().describe(
            "The key may be used to encipher only.",
          ).optional(),
          keyAgreement: z.boolean().describe(
            "The key may be used in a key agreement protocol.",
          ).optional(),
          keyEncipherment: z.boolean().describe(
            "The key may be used to encipher other keys.",
          ).optional(),
        }).describe("Describes high-level ways in which a key may be used.")
          .optional(),
        extendedKeyUsage: z.object({
          clientAuth: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.2. Officially described as "TLS WWW client authentication", though regularly used for non-WWW TLS.',
          ).optional(),
          codeSigning: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.3. Officially described as "Signing of downloadable executable code client authentication".',
          ).optional(),
          emailProtection: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.4. Officially described as "Email protection".',
          ).optional(),
          ocspSigning: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.9. Officially described as "Signing OCSP responses".',
          ).optional(),
          serverAuth: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.1. Officially described as "TLS WWW server authentication", though regularly used for non-WWW TLS.',
          ).optional(),
          timeStamping: z.boolean().describe(
            'Corresponds to OID 1.3.6.1.5.5.7.3.8. Officially described as "Binding the hash of an object to a time".',
          ).optional(),
        }).describe("Detailed scenarios in which a key may be used.")
          .optional(),
        unknownExtendedKeyUsages: z.array(z.object({
          objectIdPath: z.unknown().describe(
            "Required. The parts of an OID path. The most significant parts of the path come first.",
          ).optional(),
        })).describe(
          "Used to describe extended key usages that are not listed in the KeyUsage.ExtendedKeyUsageOptions message.",
        ).optional(),
      }).describe(
        "Optional. Indicates the intended use for keys that correspond to a certificate.",
      ).optional(),
      nameConstraints: z.object({
        critical: z.boolean().describe(
          "Indicates whether or not the name constraints are marked critical.",
        ).optional(),
        excludedDnsNames: z.array(z.string()).describe(
          "Contains excluded DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not.",
        ).optional(),
        excludedEmailAddresses: z.array(z.string()).describe(
          "Contains the excluded email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain.",
        ).optional(),
        excludedIpRanges: z.array(z.string()).describe(
          "Contains the excluded IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses.",
        ).optional(),
        excludedUris: z.array(z.string()).describe(
          "Contains the excluded URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`)",
        ).optional(),
        permittedDnsNames: z.array(z.string()).describe(
          "Contains permitted DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not.",
        ).optional(),
        permittedEmailAddresses: z.array(z.string()).describe(
          "Contains the permitted email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain.",
        ).optional(),
        permittedIpRanges: z.array(z.string()).describe(
          "Contains the permitted IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses.",
        ).optional(),
        permittedUris: z.array(z.string()).describe(
          "Contains the permitted URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`)",
        ).optional(),
      }).describe("Optional. Describes the X.509 name constraints extension.")
        .optional(),
      policyIds: z.array(z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      })).describe(
        "Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4.",
      ).optional(),
    }).describe(
      "Optional. A set of X.509 values that will be applied to all certificates issued through this CaPool. If a certificate request includes conflicting values for the same properties, they will be overwritten by the values defined here. If a certificate request uses a CertificateTemplate that defines conflicting predefined_values for the same properties, the certificate issuance request will fail.",
    ).optional(),
    identityConstraints: z.object({
      allowSubjectAltNamesPassthrough: z.boolean().describe(
        "Required. If this is true, the SubjectAltNames extension may be copied from a certificate request into the signed certificate. Otherwise, the requested SubjectAltNames will be discarded.",
      ).optional(),
      allowSubjectPassthrough: z.boolean().describe(
        "Required. If this is true, the Subject field may be copied from a certificate request into the signed certificate. Otherwise, the requested Subject will be discarded.",
      ).optional(),
      celExpression: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        "Optional. A CEL expression that may be used to validate the resolved X.509 Subject and/or Subject Alternative Name before a certificate is signed. To see the full allowed syntax and some examples, see https://cloud.google.com/certificate-authority-service/docs/using-cel",
      ).optional(),
    }).describe(
      "Optional. Describes constraints on identities that may appear in Certificates issued through this CaPool. If this is omitted, then this CaPool will not add restrictions on a certificate's identity.",
    ).optional(),
    maximumLifetime: z.string().describe(
      "Optional. The maximum lifetime allowed for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate resource's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it.",
    ).optional(),
    passthroughExtensions: z.object({
      additionalExtensions: z.array(z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      })).describe(
        "Optional. A set of ObjectIds identifying custom X.509 extensions. Will be combined with known_extensions to determine the full set of X.509 extensions.",
      ).optional(),
      knownExtensions: z.array(
        z.enum([
          "KNOWN_CERTIFICATE_EXTENSION_UNSPECIFIED",
          "BASE_KEY_USAGE",
          "EXTENDED_KEY_USAGE",
          "CA_OPTIONS",
          "POLICY_IDS",
          "AIA_OCSP_SERVERS",
          "NAME_CONSTRAINTS",
        ]),
      ).describe(
        "Optional. A set of named X.509 extensions. Will be combined with additional_extensions to determine the full set of X.509 extensions.",
      ).optional(),
    }).describe(
      "Optional. Describes the set of X.509 extensions that may appear in a Certificate issued through this CaPool. If a certificate request sets extensions that don't appear in the passthrough_extensions, those extensions will be dropped. If a certificate request uses a CertificateTemplate with predefined_values that don't appear here, the certificate issuance request will fail. If this is omitted, then this CaPool will not add restrictions on a certificate's X.509 extensions. These constraints do not apply to X.509 extensions set in this CaPool's baseline_values.",
    ).optional(),
  }).describe(
    "Optional. The IssuancePolicy to control how Certificates will be issued from this CaPool.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CaPool in the format `projects/*/locations/*/caPools/*`.",
  ).optional(),
  publishingOptions: z.object({
    encodingFormat: z.enum(["ENCODING_FORMAT_UNSPECIFIED", "PEM", "DER"])
      .describe(
        "Optional. Specifies the encoding format of each CertificateAuthority resource's CA certificate and CRLs. If this is omitted, CA certificates and CRLs will be published in PEM.",
      ).optional(),
    publishCaCert: z.boolean().describe(
      'Optional. When true, publishes each CertificateAuthority\'s CA certificate and includes its URL in the "Authority Information Access" X.509 extension in all issued Certificates. If this is false, the CA certificate will not be published and the corresponding X.509 extension will not be written in issued certificates.',
    ).optional(),
    publishCrl: z.boolean().describe(
      'Optional. When true, publishes each CertificateAuthority\'s CRL and includes its URL in the "CRL Distribution Points" X.509 extension in all issued Certificates. If this is false, CRLs will not be published and the corresponding X.509 extension will not be written in issued certificates. CRLs will expire 7 days from their creation. However, we will rebuild daily. CRLs are also rebuilt shortly after a certificate is revoked.',
    ).optional(),
  }).describe(
    "Optional. The PublishingOptions to follow when issuing Certificates from any CertificateAuthority in this CaPool.",
  ).optional(),
  tier: z.enum(["TIER_UNSPECIFIED", "ENTERPRISE", "DEVOPS"]).describe(
    "Required. Immutable. The Tier of this CaPool.",
  ).optional(),
  caPoolId: z.string().describe(
    "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Certificate Authority CaPools. Registered at `@swamp/gcp/privateca/capools`. */
export const model = {
  type: "@swamp/gcp/privateca/capools",
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
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
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
      toVersion: "2026.07.17.1",
      description: "No schema changes",
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
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "No schema changes",
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: cloudKmsKey, allowRequesterSpecifiedNotBeforeTime, allowedIssuanceModes, allowConfigBasedIssuance, allowCsrBasedIssuance, allowedKeyTypes, ellipticCurve, signatureAlgorithm, rsa, maxModulusSize, minModulusSize, backdateDuration, baselineValues, additionalExtensions, critical, objectId, objectIdPath, value, aiaOcspServers, caOptions, isCa, maxIssuerPathLength, keyUsage, baseKeyUsage, certSign, contentCommitment, crlSign, dataEncipherment, decipherOnly, digitalSignature, encipherOnly, keyAgreement, keyEncipherment, extendedKeyUsage, clientAuth, codeSigning, emailProtection, ocspSigning, serverAuth, timeStamping, unknownExtendedKeyUsages, objectIdPath, nameConstraints, critical, excludedDnsNames, excludedEmailAddresses, excludedIpRanges, excludedUris, permittedDnsNames, permittedEmailAddresses, permittedIpRanges, permittedUris, policyIds, objectIdPath, identityConstraints, allowSubjectAltNamesPassthrough, allowSubjectPassthrough, celExpression, description, expression, title, maximumLifetime, passthroughExtensions, additionalExtensions, objectIdPath, knownExtensions, encodingFormat, publishCaCert, publishCrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          cloudKmsKey: _cloudKmsKey,
          allowRequesterSpecifiedNotBeforeTime:
            _allowRequesterSpecifiedNotBeforeTime,
          allowedIssuanceModes: _allowedIssuanceModes,
          allowConfigBasedIssuance: _allowConfigBasedIssuance,
          allowCsrBasedIssuance: _allowCsrBasedIssuance,
          allowedKeyTypes: _allowedKeyTypes,
          ellipticCurve: _ellipticCurve,
          signatureAlgorithm: _signatureAlgorithm,
          rsa: _rsa,
          maxModulusSize: _maxModulusSize,
          minModulusSize: _minModulusSize,
          backdateDuration: _backdateDuration,
          baselineValues: _baselineValues,
          additionalExtensions: _additionalExtensions,
          critical: _critical,
          objectId: _objectId,
          objectIdPath: _objectIdPath,
          value: _value,
          aiaOcspServers: _aiaOcspServers,
          caOptions: _caOptions,
          isCa: _isCa,
          maxIssuerPathLength: _maxIssuerPathLength,
          keyUsage: _keyUsage,
          baseKeyUsage: _baseKeyUsage,
          certSign: _certSign,
          contentCommitment: _contentCommitment,
          crlSign: _crlSign,
          dataEncipherment: _dataEncipherment,
          decipherOnly: _decipherOnly,
          digitalSignature: _digitalSignature,
          encipherOnly: _encipherOnly,
          keyAgreement: _keyAgreement,
          keyEncipherment: _keyEncipherment,
          extendedKeyUsage: _extendedKeyUsage,
          clientAuth: _clientAuth,
          codeSigning: _codeSigning,
          emailProtection: _emailProtection,
          ocspSigning: _ocspSigning,
          serverAuth: _serverAuth,
          timeStamping: _timeStamping,
          unknownExtendedKeyUsages: _unknownExtendedKeyUsages,
          nameConstraints: _nameConstraints,
          excludedDnsNames: _excludedDnsNames,
          excludedEmailAddresses: _excludedEmailAddresses,
          excludedIpRanges: _excludedIpRanges,
          excludedUris: _excludedUris,
          permittedDnsNames: _permittedDnsNames,
          permittedEmailAddresses: _permittedEmailAddresses,
          permittedIpRanges: _permittedIpRanges,
          permittedUris: _permittedUris,
          policyIds: _policyIds,
          identityConstraints: _identityConstraints,
          allowSubjectAltNamesPassthrough: _allowSubjectAltNamesPassthrough,
          allowSubjectPassthrough: _allowSubjectPassthrough,
          celExpression: _celExpression,
          description: _description,
          expression: _expression,
          title: _title,
          maximumLifetime: _maximumLifetime,
          passthroughExtensions: _passthroughExtensions,
          knownExtensions: _knownExtensions,
          encodingFormat: _encodingFormat,
          publishCaCert: _publishCaCert,
          publishCrl: _publishCrl,
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
        "A CaPool represents a group of CertificateAuthorities that form a trust ancho...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a caPools",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["issuancePolicy"] !== undefined) {
          body["issuancePolicy"] = g["issuancePolicy"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["publishingOptions"] !== undefined) {
          body["publishingOptions"] = g["publishingOptions"];
        }
        if (g["tier"] !== undefined) body["tier"] = g["tier"];
        if (g["caPoolId"] !== undefined) {
          params["caPoolId"] = String(g["caPoolId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a caPools",
      arguments: z.object({
        identifier: z.string().describe("The name of the caPools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update caPools attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific caPools by name (e.g. one discovered by list)",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["issuancePolicy"] !== undefined) {
          body["issuancePolicy"] = g["issuancePolicy"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["publishingOptions"] !== undefined) {
          body["publishingOptions"] = g["publishingOptions"];
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
      description: "Delete the caPools",
      arguments: z.object({
        identifier: z.string().describe("The name of the caPools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync caPools state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific caPools by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List caPools resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Only include resources that match the filter in the response.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Specify how the results should be sorted.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Limit on the number of CaPools to include in the response. Further CaPools can subsequently be obtained by including the ListCaPoolsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
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
          baseUrl,
          LIST_CONFIG,
          params,
          "caPools",
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
    fetch_ca_certs: {
      description: "fetch ca certs",
      arguments: z.object({
        requestId: z.any().optional(),
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
        params["caPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "privateca.projects.locations.caPools.fetchCaCerts",
            "path": "v1/{+caPool}:fetchCaCerts",
            "httpMethod": "POST",
            "parameterOrder": ["caPool"],
            "parameters": {
              "caPool": { "location": "path", "required": true },
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
            "id": "privateca.projects.locations.caPools.getIamPolicy",
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
            "id": "privateca.projects.locations.caPools.setIamPolicy",
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
            "id": "privateca.projects.locations.caPools.testIamPermissions",
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
