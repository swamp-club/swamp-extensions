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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  encryptionSpec: z.object({
    cloudKmsKey: z.string().describe(
      "The resource name for a Cloud KMS key in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe("The configuration used for encrypting data at rest.").optional(),
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
      "IssuanceModes specifies the allowed ways in which Certificates may be requested from this CaPool.",
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
      }).describe(
        "Describes an Elliptic Curve key that may be used in a Certificate issued from a CaPool.",
      ).optional(),
      rsa: z.object({
        maxModulusSize: z.string().describe(
          "Optional. The maximum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service will not enforce an explicit upper bound on RSA modulus sizes.",
        ).optional(),
        minModulusSize: z.string().describe(
          "Optional. The minimum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service-level min RSA modulus size will continue to apply.",
        ).optional(),
      }).describe(
        "Describes an RSA key that may be used in a Certificate issued from a CaPool.",
      ).optional(),
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
        }).describe(
          "An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.",
        ).optional(),
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
        "Describes the X.509 basic constraints extension, per [RFC 5280 section 4.2.1.9](https://tools.ietf.org/html/rfc5280#section-4.2.1.9)",
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
        }).describe(
          "KeyUsage.KeyUsageOptions corresponds to the key usage values described in https://tools.ietf.org/html/rfc5280#section-4.2.1.3.",
        ).optional(),
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
        }).describe(
          "KeyUsage.ExtendedKeyUsageOptions has fields that correspond to certain common OIDs that could be specified as an extended key usage value.",
        ).optional(),
        unknownExtendedKeyUsages: z.array(z.object({
          objectIdPath: z.unknown().describe(
            "Required. The parts of an OID path. The most significant parts of the path come first.",
          ).optional(),
        })).describe(
          "Used to describe extended key usages that are not listed in the KeyUsage.ExtendedKeyUsageOptions message.",
        ).optional(),
      }).describe(
        "A KeyUsage describes key usage values that may appear in an X.509 certificate.",
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
      }).describe(
        "Describes the X.509 name constraints extension, per https://tools.ietf.org/html/rfc5280#section-4.2.1.10",
      ).optional(),
      policyIds: z.array(z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      })).describe(
        "Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4.",
      ).optional(),
    }).describe(
      "An X509Parameters is used to describe certain fields of an X.509 certificate, such as the key usage fields, fields specific to CA certificates, certificate policy extensions and custom extensions.",
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
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
    }).describe(
      "Describes constraints on a Certificate's Subject and SubjectAltNames.",
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
      "Describes a set of X.509 extensions that may be part of some certificate issuance controls.",
    ).optional(),
  }).describe("Defines controls over all certificate issuance within a CaPool.")
    .optional(),
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
    "Options relating to the publication of each CertificateAuthority's CA certificate and CRLs and their inclusion as extensions in issued Certificates. The options set here apply to certificates issued by any CertificateAuthority in the CaPool.",
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
  encryptionSpec: z.object({
    cloudKmsKey: z.string().describe(
      "The resource name for a Cloud KMS key in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe("The configuration used for encrypting data at rest.").optional(),
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
      "IssuanceModes specifies the allowed ways in which Certificates may be requested from this CaPool.",
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
      }).describe(
        "Describes an Elliptic Curve key that may be used in a Certificate issued from a CaPool.",
      ).optional(),
      rsa: z.object({
        maxModulusSize: z.string().describe(
          "Optional. The maximum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service will not enforce an explicit upper bound on RSA modulus sizes.",
        ).optional(),
        minModulusSize: z.string().describe(
          "Optional. The minimum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service-level min RSA modulus size will continue to apply.",
        ).optional(),
      }).describe(
        "Describes an RSA key that may be used in a Certificate issued from a CaPool.",
      ).optional(),
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
        }).describe(
          "An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.",
        ).optional(),
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
        "Describes the X.509 basic constraints extension, per [RFC 5280 section 4.2.1.9](https://tools.ietf.org/html/rfc5280#section-4.2.1.9)",
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
        }).describe(
          "KeyUsage.KeyUsageOptions corresponds to the key usage values described in https://tools.ietf.org/html/rfc5280#section-4.2.1.3.",
        ).optional(),
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
        }).describe(
          "KeyUsage.ExtendedKeyUsageOptions has fields that correspond to certain common OIDs that could be specified as an extended key usage value.",
        ).optional(),
        unknownExtendedKeyUsages: z.array(z.object({
          objectIdPath: z.unknown().describe(
            "Required. The parts of an OID path. The most significant parts of the path come first.",
          ).optional(),
        })).describe(
          "Used to describe extended key usages that are not listed in the KeyUsage.ExtendedKeyUsageOptions message.",
        ).optional(),
      }).describe(
        "A KeyUsage describes key usage values that may appear in an X.509 certificate.",
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
      }).describe(
        "Describes the X.509 name constraints extension, per https://tools.ietf.org/html/rfc5280#section-4.2.1.10",
      ).optional(),
      policyIds: z.array(z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      })).describe(
        "Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4.",
      ).optional(),
    }).describe(
      "An X509Parameters is used to describe certain fields of an X.509 certificate, such as the key usage fields, fields specific to CA certificates, certificate policy extensions and custom extensions.",
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
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
    }).describe(
      "Describes constraints on a Certificate's Subject and SubjectAltNames.",
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
      "Describes a set of X.509 extensions that may be part of some certificate issuance controls.",
    ).optional(),
  }).describe("Defines controls over all certificate issuance within a CaPool.")
    .optional(),
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
    "Options relating to the publication of each CertificateAuthority's CA certificate and CRLs and their inclusion as extensions in issued Certificates. The options set here apply to certificates issued by any CertificateAuthority in the CaPool.",
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

/** Swamp extension model for Google Cloud Certificate Authority CaPools. Registered at `@swamp/gcp/privateca/capools`. */
export const model = {
  type: "@swamp/gcp/privateca/capools",
  version: "2026.05.09.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
        if (g["caPoolId"] !== undefined) body["caPoolId"] = g["caPoolId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
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
      description: "Delete the caPools",
      arguments: z.object({
        identifier: z.string().describe("The name of the caPools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync caPools state from GCP",
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
            String(g["parent"] ?? ""),
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
    fetch_ca_certs: {
      description: "fetch ca certs",
      arguments: z.object({
        requestId: z.any().optional(),
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
        params["caPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
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
        );
        return { result };
      },
    },
  },
};
