// Auto-generated extension model for @swamp/gcp/privateca/capools-certificateauthorities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Authority CaPools.CertificateAuthorities.
 *
 * A CertificateAuthority represents an individual Certificate Authority. A CertificateAuthority can be used to create Certificates.
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
  return `${parent}/certificateAuthorities/${shortName}`;
}

const BASE_URL = "https://privateca.googleapis.com/";

const GET_CONFIG = {
  "id": "privateca.projects.locations.caPools.certificateAuthorities.get",
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
  "id": "privateca.projects.locations.caPools.certificateAuthorities.create",
  "path": "v1/{+parent}/certificateAuthorities",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "certificateAuthorityId": {
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
  "id": "privateca.projects.locations.caPools.certificateAuthorities.patch",
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
  "id": "privateca.projects.locations.caPools.certificateAuthorities.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "ignoreActiveCertificates": {
      "location": "query",
    },
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
    "skipGracePeriod": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "privateca.projects.locations.caPools.certificateAuthorities.list",
  "path": "v1/{+parent}/certificateAuthorities",
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
  accessUrls: z.object({
    caCertificateAccessUrl: z.string().describe(
      "The URL where this CertificateAuthority's CA certificate is published. This will only be set for CAs that have been activated.",
    ).optional(),
    crlAccessUrls: z.array(z.string()).describe(
      "The URLs where this CertificateAuthority's CRLs are published. This will only be set for CAs that have been activated.",
    ).optional(),
  }).describe("URLs where a CertificateAuthority will publish content.")
    .optional(),
  config: z.object({
    publicKey: z.object({
      format: z.enum(["KEY_FORMAT_UNSPECIFIED", "PEM"]).describe(
        "Required. The format of the public key.",
      ).optional(),
      key: z.string().describe(
        "Required. A public key. The padding and encoding must match with the `KeyFormat` value specified for the `format` field.",
      ).optional(),
    }).describe("A PublicKey describes a public key.").optional(),
    subjectConfig: z.object({
      subject: z.object({
        commonName: z.string().describe('The "common name" of the subject.')
          .optional(),
        countryCode: z.string().describe("The country code of the subject.")
          .optional(),
        locality: z.string().describe("The locality or city of the subject.")
          .optional(),
        organization: z.string().describe("The organization of the subject.")
          .optional(),
        organizationalUnit: z.string().describe(
          "The organizational_unit of the subject.",
        ).optional(),
        postalCode: z.string().describe("The postal code of the subject.")
          .optional(),
        province: z.string().describe(
          "The province, territory, or regional state of the subject.",
        ).optional(),
        rdnSequence: z.array(z.object({
          attributes: z.unknown().describe(
            "Attributes describes the attribute value assertions in the RDN.",
          ).optional(),
        })).describe(
          "This field can be used in place of the named subject fields.",
        ).optional(),
        streetAddress: z.string().describe("The street address of the subject.")
          .optional(),
      }).describe(
        "Subject describes parts of a distinguished name that, in turn, describes the subject of the certificate.",
      ).optional(),
      subjectAltName: z.object({
        customSans: z.array(z.object({
          critical: z.unknown().describe(
            "Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error).",
          ).optional(),
          objectId: z.unknown().describe(
            "An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.",
          ).optional(),
          value: z.unknown().describe(
            "Required. The value of this X.509 extension.",
          ).optional(),
        })).describe(
          "Contains additional subject alternative name values. For each custom_san, the `value` field must contain an ASN.1 encoded UTF8String.",
        ).optional(),
        dnsNames: z.array(z.string()).describe(
          "Contains only valid, fully-qualified host names.",
        ).optional(),
        emailAddresses: z.array(z.string()).describe(
          "Contains only valid RFC 2822 E-mail addresses.",
        ).optional(),
        ipAddresses: z.array(z.string()).describe(
          "Contains only valid 32-bit IPv4 addresses or RFC 4291 IPv6 addresses.",
        ).optional(),
        uris: z.array(z.string()).describe("Contains only valid RFC 3986 URIs.")
          .optional(),
      }).describe(
        'SubjectAltNames corresponds to a more modern way of listing what the asserted identity is in a certificate (i.e., compared to the "common name" in the distinguished name).',
      ).optional(),
    }).describe(
      "These values are used to create the distinguished name and subject alternative name fields in an X.509 certificate.",
    ).optional(),
    subjectKeyId: z.object({
      keyId: z.string().describe(
        "Required. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key.",
      ).optional(),
    }).describe(
      "A KeyId identifies a specific public key, usually by hashing the public key.",
    ).optional(),
    x509Config: z.object({
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
  }).describe(
    "A CertificateConfig describes an X.509 certificate or CSR that is to be created, as an alternative to using ASN.1.",
  ).optional(),
  gcsBucket: z.string().describe(
    "Immutable. The name of a Cloud Storage bucket where this CertificateAuthority will publish content, such as the CA certificate and CRLs. This must be a bucket name, without any prefixes (such as `gs://`) or suffixes (such as `.googleapis.com`). For example, to use a bucket named `my-bucket`, you would simply specify `my-bucket`. If not specified, a managed bucket will be created.",
  ).optional(),
  keySpec: z.object({
    algorithm: z.enum([
      "SIGN_HASH_ALGORITHM_UNSPECIFIED",
      "RSA_PSS_2048_SHA256",
      "RSA_PSS_3072_SHA256",
      "RSA_PSS_4096_SHA256",
      "RSA_PKCS1_2048_SHA256",
      "RSA_PKCS1_3072_SHA256",
      "RSA_PKCS1_4096_SHA256",
      "EC_P256_SHA256",
      "EC_P384_SHA384",
    ]).describe(
      "The algorithm to use for creating a managed Cloud KMS key for a for a simplified experience. All managed keys will be have their ProtectionLevel as `HSM`.",
    ).optional(),
    cloudKmsKeyVersion: z.string().describe(
      "The resource name for an existing Cloud KMS CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`. This option enables full flexibility in the key's capabilities and properties.",
    ).optional(),
  }).describe(
    "A Cloud KMS key configuration that a CertificateAuthority will use.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  lifetime: z.string().describe(
    'Required. Immutable. The desired lifetime of the CA certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate.',
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`.",
  ).optional(),
  subordinateConfig: z.object({
    certificateAuthority: z.string().describe(
      "Required. This can refer to a CertificateAuthority that was used to create a subordinate CertificateAuthority. This field is used for information and usability purposes only. The resource name is in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`.",
    ).optional(),
    pemIssuerChain: z.object({
      pemCertificates: z.array(z.string()).describe(
        "Required. Expected to be in leaf-to-root order according to RFC 5246.",
      ).optional(),
    }).describe(
      "This message describes a subordinate CA's issuer certificate chain. This wrapper exists for compatibility reasons.",
    ).optional(),
  }).describe(
    "Describes a subordinate CA's issuers. This is either a resource name to a known issuing CertificateAuthority, or a PEM issuer certificate chain.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "SELF_SIGNED", "SUBORDINATE"]).describe(
    "Required. Immutable. The Type of this CertificateAuthority.",
  ).optional(),
  userDefinedAccessUrls: z.object({
    aiaIssuingCertificateUrls: z.array(z.string()).describe(
      'Optional. A list of URLs where the issuer CA certificate may be downloaded, which appears in the "Authority Information Access" extension in the certificate. If specified, the default Cloud Storage URLs will be omitted.',
    ).optional(),
    crlAccessUrls: z.array(z.string()).describe(
      "Optional. A list of URLs where to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13. If specified, the default Cloud Storage URLs will be omitted.",
    ).optional(),
  }).describe(
    "User-defined URLs for accessing content published by this CertificateAuthority.",
  ).optional(),
  certificateAuthorityId: z.string().describe(
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
  accessUrls: z.object({
    caCertificateAccessUrl: z.string(),
    crlAccessUrls: z.array(z.string()),
  }).optional(),
  caCertificateDescriptions: z.array(z.object({
    aiaIssuingCertificateUrls: z.array(z.string()),
    authorityKeyId: z.object({
      keyId: z.string(),
    }),
    certFingerprint: z.object({
      sha256Hash: z.string(),
    }),
    crlDistributionPoints: z.array(z.string()),
    publicKey: z.object({
      format: z.string(),
      key: z.string(),
    }),
    subjectDescription: z.object({
      hexSerialNumber: z.string(),
      lifetime: z.string(),
      notAfterTime: z.string(),
      notBeforeTime: z.string(),
      subject: z.object({
        commonName: z.string(),
        countryCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        organizationalUnit: z.string(),
        postalCode: z.string(),
        province: z.string(),
        rdnSequence: z.array(z.unknown()),
        streetAddress: z.string(),
      }),
      subjectAltName: z.object({
        customSans: z.array(z.unknown()),
        dnsNames: z.array(z.unknown()),
        emailAddresses: z.array(z.unknown()),
        ipAddresses: z.array(z.unknown()),
        uris: z.array(z.unknown()),
      }),
    }),
    subjectKeyId: z.object({
      keyId: z.string(),
    }),
    tbsCertificateDigest: z.string(),
    x509Description: z.object({
      additionalExtensions: z.array(z.object({
        critical: z.unknown(),
        objectId: z.unknown(),
        value: z.unknown(),
      })),
      aiaOcspServers: z.array(z.string()),
      caOptions: z.object({
        isCa: z.boolean(),
        maxIssuerPathLength: z.number(),
      }),
      keyUsage: z.object({
        baseKeyUsage: z.object({
          certSign: z.unknown(),
          contentCommitment: z.unknown(),
          crlSign: z.unknown(),
          dataEncipherment: z.unknown(),
          decipherOnly: z.unknown(),
          digitalSignature: z.unknown(),
          encipherOnly: z.unknown(),
          keyAgreement: z.unknown(),
          keyEncipherment: z.unknown(),
        }),
        extendedKeyUsage: z.object({
          clientAuth: z.unknown(),
          codeSigning: z.unknown(),
          emailProtection: z.unknown(),
          ocspSigning: z.unknown(),
          serverAuth: z.unknown(),
          timeStamping: z.unknown(),
        }),
        unknownExtendedKeyUsages: z.array(z.unknown()),
      }),
      nameConstraints: z.object({
        critical: z.boolean(),
        excludedDnsNames: z.array(z.unknown()),
        excludedEmailAddresses: z.array(z.unknown()),
        excludedIpRanges: z.array(z.unknown()),
        excludedUris: z.array(z.unknown()),
        permittedDnsNames: z.array(z.unknown()),
        permittedEmailAddresses: z.array(z.unknown()),
        permittedIpRanges: z.array(z.unknown()),
        permittedUris: z.array(z.unknown()),
      }),
      policyIds: z.array(z.object({
        objectIdPath: z.unknown(),
      })),
    }),
  })).optional(),
  config: z.object({
    publicKey: z.object({
      format: z.string(),
      key: z.string(),
    }),
    subjectConfig: z.object({
      subject: z.object({
        commonName: z.string(),
        countryCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        organizationalUnit: z.string(),
        postalCode: z.string(),
        province: z.string(),
        rdnSequence: z.array(z.object({
          attributes: z.unknown(),
        })),
        streetAddress: z.string(),
      }),
      subjectAltName: z.object({
        customSans: z.array(z.object({
          critical: z.unknown(),
          objectId: z.unknown(),
          value: z.unknown(),
        })),
        dnsNames: z.array(z.string()),
        emailAddresses: z.array(z.string()),
        ipAddresses: z.array(z.string()),
        uris: z.array(z.string()),
      }),
    }),
    subjectKeyId: z.object({
      keyId: z.string(),
    }),
    x509Config: z.object({
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
  }).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  expireTime: z.string().optional(),
  gcsBucket: z.string().optional(),
  keySpec: z.object({
    algorithm: z.string(),
    cloudKmsKeyVersion: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lifetime: z.string().optional(),
  name: z.string(),
  pemCaCertificates: z.array(z.string()).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  subordinateConfig: z.object({
    certificateAuthority: z.string(),
    pemIssuerChain: z.object({
      pemCertificates: z.array(z.string()),
    }),
  }).optional(),
  tier: z.string().optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  userDefinedAccessUrls: z.object({
    aiaIssuingCertificateUrls: z.array(z.string()),
    crlAccessUrls: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accessUrls: z.object({
    caCertificateAccessUrl: z.string().describe(
      "The URL where this CertificateAuthority's CA certificate is published. This will only be set for CAs that have been activated.",
    ).optional(),
    crlAccessUrls: z.array(z.string()).describe(
      "The URLs where this CertificateAuthority's CRLs are published. This will only be set for CAs that have been activated.",
    ).optional(),
  }).describe("URLs where a CertificateAuthority will publish content.")
    .optional(),
  config: z.object({
    publicKey: z.object({
      format: z.enum(["KEY_FORMAT_UNSPECIFIED", "PEM"]).describe(
        "Required. The format of the public key.",
      ).optional(),
      key: z.string().describe(
        "Required. A public key. The padding and encoding must match with the `KeyFormat` value specified for the `format` field.",
      ).optional(),
    }).describe("A PublicKey describes a public key.").optional(),
    subjectConfig: z.object({
      subject: z.object({
        commonName: z.string().describe('The "common name" of the subject.')
          .optional(),
        countryCode: z.string().describe("The country code of the subject.")
          .optional(),
        locality: z.string().describe("The locality or city of the subject.")
          .optional(),
        organization: z.string().describe("The organization of the subject.")
          .optional(),
        organizationalUnit: z.string().describe(
          "The organizational_unit of the subject.",
        ).optional(),
        postalCode: z.string().describe("The postal code of the subject.")
          .optional(),
        province: z.string().describe(
          "The province, territory, or regional state of the subject.",
        ).optional(),
        rdnSequence: z.array(z.object({
          attributes: z.unknown().describe(
            "Attributes describes the attribute value assertions in the RDN.",
          ).optional(),
        })).describe(
          "This field can be used in place of the named subject fields.",
        ).optional(),
        streetAddress: z.string().describe("The street address of the subject.")
          .optional(),
      }).describe(
        "Subject describes parts of a distinguished name that, in turn, describes the subject of the certificate.",
      ).optional(),
      subjectAltName: z.object({
        customSans: z.array(z.object({
          critical: z.unknown().describe(
            "Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error).",
          ).optional(),
          objectId: z.unknown().describe(
            "An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.",
          ).optional(),
          value: z.unknown().describe(
            "Required. The value of this X.509 extension.",
          ).optional(),
        })).describe(
          "Contains additional subject alternative name values. For each custom_san, the `value` field must contain an ASN.1 encoded UTF8String.",
        ).optional(),
        dnsNames: z.array(z.string()).describe(
          "Contains only valid, fully-qualified host names.",
        ).optional(),
        emailAddresses: z.array(z.string()).describe(
          "Contains only valid RFC 2822 E-mail addresses.",
        ).optional(),
        ipAddresses: z.array(z.string()).describe(
          "Contains only valid 32-bit IPv4 addresses or RFC 4291 IPv6 addresses.",
        ).optional(),
        uris: z.array(z.string()).describe("Contains only valid RFC 3986 URIs.")
          .optional(),
      }).describe(
        'SubjectAltNames corresponds to a more modern way of listing what the asserted identity is in a certificate (i.e., compared to the "common name" in the distinguished name).',
      ).optional(),
    }).describe(
      "These values are used to create the distinguished name and subject alternative name fields in an X.509 certificate.",
    ).optional(),
    subjectKeyId: z.object({
      keyId: z.string().describe(
        "Required. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key.",
      ).optional(),
    }).describe(
      "A KeyId identifies a specific public key, usually by hashing the public key.",
    ).optional(),
    x509Config: z.object({
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
  }).describe(
    "A CertificateConfig describes an X.509 certificate or CSR that is to be created, as an alternative to using ASN.1.",
  ).optional(),
  gcsBucket: z.string().describe(
    "Immutable. The name of a Cloud Storage bucket where this CertificateAuthority will publish content, such as the CA certificate and CRLs. This must be a bucket name, without any prefixes (such as `gs://`) or suffixes (such as `.googleapis.com`). For example, to use a bucket named `my-bucket`, you would simply specify `my-bucket`. If not specified, a managed bucket will be created.",
  ).optional(),
  keySpec: z.object({
    algorithm: z.enum([
      "SIGN_HASH_ALGORITHM_UNSPECIFIED",
      "RSA_PSS_2048_SHA256",
      "RSA_PSS_3072_SHA256",
      "RSA_PSS_4096_SHA256",
      "RSA_PKCS1_2048_SHA256",
      "RSA_PKCS1_3072_SHA256",
      "RSA_PKCS1_4096_SHA256",
      "EC_P256_SHA256",
      "EC_P384_SHA384",
    ]).describe(
      "The algorithm to use for creating a managed Cloud KMS key for a for a simplified experience. All managed keys will be have their ProtectionLevel as `HSM`.",
    ).optional(),
    cloudKmsKeyVersion: z.string().describe(
      "The resource name for an existing Cloud KMS CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`. This option enables full flexibility in the key's capabilities and properties.",
    ).optional(),
  }).describe(
    "A Cloud KMS key configuration that a CertificateAuthority will use.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  lifetime: z.string().describe(
    'Required. Immutable. The desired lifetime of the CA certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate.',
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CertificateAuthority in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`.",
  ).optional(),
  subordinateConfig: z.object({
    certificateAuthority: z.string().describe(
      "Required. This can refer to a CertificateAuthority that was used to create a subordinate CertificateAuthority. This field is used for information and usability purposes only. The resource name is in the format `projects/*/locations/*/caPools/*/certificateAuthorities/*`.",
    ).optional(),
    pemIssuerChain: z.object({
      pemCertificates: z.array(z.string()).describe(
        "Required. Expected to be in leaf-to-root order according to RFC 5246.",
      ).optional(),
    }).describe(
      "This message describes a subordinate CA's issuer certificate chain. This wrapper exists for compatibility reasons.",
    ).optional(),
  }).describe(
    "Describes a subordinate CA's issuers. This is either a resource name to a known issuing CertificateAuthority, or a PEM issuer certificate chain.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "SELF_SIGNED", "SUBORDINATE"]).describe(
    "Required. Immutable. The Type of this CertificateAuthority.",
  ).optional(),
  userDefinedAccessUrls: z.object({
    aiaIssuingCertificateUrls: z.array(z.string()).describe(
      'Optional. A list of URLs where the issuer CA certificate may be downloaded, which appears in the "Authority Information Access" extension in the certificate. If specified, the default Cloud Storage URLs will be omitted.',
    ).optional(),
    crlAccessUrls: z.array(z.string()).describe(
      "Optional. A list of URLs where to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13. If specified, the default Cloud Storage URLs will be omitted.",
    ).optional(),
  }).describe(
    "User-defined URLs for accessing content published by this CertificateAuthority.",
  ).optional(),
  certificateAuthorityId: z.string().describe(
    "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Certificate Authority CaPools.CertificateAuthorities. Registered at `@swamp/gcp/privateca/capools-certificateauthorities`. */
export const model = {
  type: "@swamp/gcp/privateca/capools-certificateauthorities",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A CertificateAuthority represents an individual Certificate Authority. A Cert...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a certificateAuthorities",
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
        if (g["accessUrls"] !== undefined) body["accessUrls"] = g["accessUrls"];
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["gcsBucket"] !== undefined) body["gcsBucket"] = g["gcsBucket"];
        if (g["keySpec"] !== undefined) body["keySpec"] = g["keySpec"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifetime"] !== undefined) body["lifetime"] = g["lifetime"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subordinateConfig"] !== undefined) {
          body["subordinateConfig"] = g["subordinateConfig"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["userDefinedAccessUrls"] !== undefined) {
          body["userDefinedAccessUrls"] = g["userDefinedAccessUrls"];
        }
        if (g["certificateAuthorityId"] !== undefined) {
          body["certificateAuthorityId"] = g["certificateAuthorityId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
          credentials,
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
      description: "Get a certificateAuthorities",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the certificateAuthorities",
        ),
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
      description: "Update certificateAuthorities attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["accessUrls"] !== undefined) body["accessUrls"] = g["accessUrls"];
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["keySpec"] !== undefined) body["keySpec"] = g["keySpec"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["subordinateConfig"] !== undefined) {
          body["subordinateConfig"] = g["subordinateConfig"];
        }
        if (g["userDefinedAccessUrls"] !== undefined) {
          body["userDefinedAccessUrls"] = g["userDefinedAccessUrls"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the certificateAuthorities",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the certificateAuthorities",
        ),
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
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync certificateAuthorities state from GCP",
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
      description: "List certificateAuthorities resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Only include resources that match the filter in the response.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Specify how the results should be sorted.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Limit on the number of CertificateAuthorities to include in the response. Further CertificateAuthorities can subsequently be obtained by including the ListCertificateAuthoritiesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
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
          "certificateAuthorities",
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
    activate: {
      description: "activate",
      arguments: z.object({
        pemCaCertificate: z.any().optional(),
        requestId: z.any().optional(),
        subordinateConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["pemCaCertificate"] !== undefined) {
          body["pemCaCertificate"] = args["pemCaCertificate"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["subordinateConfig"] !== undefined) {
          body["subordinateConfig"] = args["subordinateConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "privateca.projects.locations.caPools.certificateAuthorities.activate",
            "path": "v1/{+name}:activate",
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
    disable: {
      description: "disable",
      arguments: z.object({
        ignoreDependentResources: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["ignoreDependentResources"] !== undefined) {
          body["ignoreDependentResources"] = args["ignoreDependentResources"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "privateca.projects.locations.caPools.certificateAuthorities.disable",
            "path": "v1/{+name}:disable",
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
    enable: {
      description: "enable",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "privateca.projects.locations.caPools.certificateAuthorities.enable",
            "path": "v1/{+name}:enable",
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
    fetch: {
      description: "fetch",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "privateca.projects.locations.caPools.certificateAuthorities.fetch",
            "path": "v1/{+name}:fetch",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    undelete: {
      description: "undelete",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "privateca.projects.locations.caPools.certificateAuthorities.undelete",
            "path": "v1/{+name}:undelete",
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
