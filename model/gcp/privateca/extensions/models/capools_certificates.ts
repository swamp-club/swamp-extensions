// Auto-generated extension model for @swamp/gcp/privateca/capools-certificates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Authority CaPools.Certificates.
 *
 * A Certificate corresponds to a signed X.509 certificate issued by a CertificateAuthority.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/certificates/${shortName}`;
}

const BASE_URL = "https://privateca.googleapis.com/";

const GET_CONFIG = {
  "id": "privateca.projects.locations.caPools.certificates.get",
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
  "id": "privateca.projects.locations.caPools.certificates.create",
  "path": "v1/{+parent}/certificates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "certificateId": {
      "location": "query",
    },
    "issuingCertificateAuthorityId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "privateca.projects.locations.caPools.certificates.patch",
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

const GlobalArgsSchema = z.object({
  certificateDescription: z.object({
    aiaIssuingCertificateUrls: z.array(z.string()).describe(
      'Describes lists of issuer CA certificate URLs that appear in the "Authority Information Access" extension in the certificate.',
    ).optional(),
    authorityKeyId: z.object({
      keyId: z.string().describe(
        "Optional. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key.",
      ).optional(),
    }).describe(
      "A KeyId identifies a specific public key, usually by hashing the public key.",
    ).optional(),
    certFingerprint: z.object({
      sha256Hash: z.string().describe(
        "The SHA 256 hash, encoded in hexadecimal, of the DER x509 certificate.",
      ).optional(),
    }).describe("A group of fingerprints for the x509 certificate.").optional(),
    crlDistributionPoints: z.array(z.string()).describe(
      "Describes a list of locations to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13",
    ).optional(),
    publicKey: z.object({
      format: z.enum(["KEY_FORMAT_UNSPECIFIED", "PEM"]).describe(
        "Required. The format of the public key.",
      ).optional(),
      key: z.string().describe(
        "Required. A public key. The padding and encoding must match with the `KeyFormat` value specified for the `format` field.",
      ).optional(),
    }).describe("A PublicKey describes a public key.").optional(),
    subjectDescription: z.object({
      hexSerialNumber: z.string().describe(
        "The serial number encoded in lowercase hexadecimal.",
      ).optional(),
      lifetime: z.string().describe(
        "For convenience, the actual lifetime of an issued certificate.",
      ).optional(),
      notAfterTime: z.string().describe(
        "The time after which the certificate is expired. Per RFC 5280, the validity period for a certificate is the period of time from not_before_time through not_after_time, inclusive. Corresponds to 'not_before_time' + 'lifetime' - 1 second.",
      ).optional(),
      notBeforeTime: z.string().describe(
        "The time at which the certificate becomes valid.",
      ).optional(),
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
      "These values describe fields in an issued X.509 certificate such as the distinguished name, subject alternative names, serial number, and lifetime.",
    ).optional(),
    subjectKeyId: z.object({
      keyId: z.string().describe(
        "Optional. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key.",
      ).optional(),
    }).describe(
      "A KeyId identifies a specific public key, usually by hashing the public key.",
    ).optional(),
    tbsCertificateDigest: z.string().describe(
      "The hash of the pre-signed certificate, which will be signed by the CA. Corresponds to the TBS Certificate in https://tools.ietf.org/html/rfc5280#section-4.1.2. The field will always be populated.",
    ).optional(),
    x509Description: z.object({
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
    "A CertificateDescription describes an X.509 certificate or CSR that has been issued, as an alternative to using ASN.1 / X.509.",
  ).optional(),
  certificateTemplate: z.string().describe(
    "Immutable. The resource name for a CertificateTemplate used to issue this certificate, in the format `projects/*/locations/*/certificateTemplates/*`. If this is specified, the caller must have the necessary permission to use this template. If this is omitted, no template will be used. This template must be in the same location as the Certificate.",
  ).optional(),
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
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  lifetime: z.string().describe(
    'Required. Immutable. The desired lifetime of a certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate. Note that the lifetime may be truncated if it would extend past the life of any certificate authority in the issuing chain.',
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`.",
  ).optional(),
  pemCsr: z.string().describe(
    "Immutable. A pem-encoded X.509 certificate signing request (CSR).",
  ).optional(),
  requestedNotBeforeTime: z.string().describe(
    "Optional. The requested not_before_time of this Certificate. This field may only be set if the CaPool.IssuancePolicy.allow_requester_specified_not_before_time field is set to true for the issuing CaPool. If this field is specified, the certificate will be issued with this 'not_before_time'. If this is not specified, the 'not_before_time' will be set to the issuance time or issuance time minus backdate_duration depending on the CaPool configuration.",
  ).optional(),
  revocationDetails: z.object({
    revocationState: z.enum([
      "REVOCATION_REASON_UNSPECIFIED",
      "KEY_COMPROMISE",
      "CERTIFICATE_AUTHORITY_COMPROMISE",
      "AFFILIATION_CHANGED",
      "SUPERSEDED",
      "CESSATION_OF_OPERATION",
      "CERTIFICATE_HOLD",
      "PRIVILEGE_WITHDRAWN",
      "ATTRIBUTE_AUTHORITY_COMPROMISE",
    ]).describe("Indicates why a Certificate was revoked.").optional(),
    revocationTime: z.string().describe(
      "The time at which this Certificate was revoked.",
    ).optional(),
  }).describe(
    "Describes fields that are relavent to the revocation of a Certificate.",
  ).optional(),
  subjectMode: z.enum([
    "SUBJECT_REQUEST_MODE_UNSPECIFIED",
    "DEFAULT",
    "RDN_SEQUENCE",
    "REFLECTED_SPIFFE",
  ]).describe(
    "Immutable. Specifies how the Certificate's identity fields are to be decided. If this is omitted, the `DEFAULT` subject mode will be used.",
  ).optional(),
  certificateId: z.string().describe(
    "Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. This field is required when using a CertificateAuthority in the Enterprise CertificateAuthority.tier, but is optional and its value is ignored otherwise.",
  ).optional(),
  issuingCertificateAuthorityId: z.string().describe(
    'Optional. The resource ID of the CertificateAuthority that should issue the certificate. This optional field will ignore the load-balancing scheme of the Pool and directly issue the certificate from the CA with the specified ID, contained in the same CaPool referenced by `parent`. Per-CA quota rules apply. If left empty, a CertificateAuthority will be chosen from the CaPool by the service. For example, to issue a Certificate from a Certificate Authority with resource name "projects/my-project/locations/us-central1/caPools/my-pool/certificateAuthorities/my-ca", you can set the parent to "projects/my-project/locations/us-central1/caPools/my-pool" and the issuing_certificate_authority_id to "my-ca".',
  ).optional(),
  requestId: z.string().describe(
    "Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  certificateDescription: z.object({
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
    tbsCertificateDigest: z.string(),
    x509Description: z.object({
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
  certificateTemplate: z.string().optional(),
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
  issuerCertificateAuthority: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lifetime: z.string().optional(),
  name: z.string(),
  pemCertificate: z.string().optional(),
  pemCertificateChain: z.array(z.string()).optional(),
  pemCsr: z.string().optional(),
  requestedNotBeforeTime: z.string().optional(),
  revocationDetails: z.object({
    revocationState: z.string(),
    revocationTime: z.string(),
  }).optional(),
  subjectMode: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  certificateDescription: z.object({
    aiaIssuingCertificateUrls: z.array(z.string()).describe(
      'Describes lists of issuer CA certificate URLs that appear in the "Authority Information Access" extension in the certificate.',
    ).optional(),
    authorityKeyId: z.object({
      keyId: z.string().describe(
        "Optional. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key.",
      ).optional(),
    }).describe(
      "A KeyId identifies a specific public key, usually by hashing the public key.",
    ).optional(),
    certFingerprint: z.object({
      sha256Hash: z.string().describe(
        "The SHA 256 hash, encoded in hexadecimal, of the DER x509 certificate.",
      ).optional(),
    }).describe("A group of fingerprints for the x509 certificate.").optional(),
    crlDistributionPoints: z.array(z.string()).describe(
      "Describes a list of locations to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13",
    ).optional(),
    publicKey: z.object({
      format: z.enum(["KEY_FORMAT_UNSPECIFIED", "PEM"]).describe(
        "Required. The format of the public key.",
      ).optional(),
      key: z.string().describe(
        "Required. A public key. The padding and encoding must match with the `KeyFormat` value specified for the `format` field.",
      ).optional(),
    }).describe("A PublicKey describes a public key.").optional(),
    subjectDescription: z.object({
      hexSerialNumber: z.string().describe(
        "The serial number encoded in lowercase hexadecimal.",
      ).optional(),
      lifetime: z.string().describe(
        "For convenience, the actual lifetime of an issued certificate.",
      ).optional(),
      notAfterTime: z.string().describe(
        "The time after which the certificate is expired. Per RFC 5280, the validity period for a certificate is the period of time from not_before_time through not_after_time, inclusive. Corresponds to 'not_before_time' + 'lifetime' - 1 second.",
      ).optional(),
      notBeforeTime: z.string().describe(
        "The time at which the certificate becomes valid.",
      ).optional(),
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
      "These values describe fields in an issued X.509 certificate such as the distinguished name, subject alternative names, serial number, and lifetime.",
    ).optional(),
    subjectKeyId: z.object({
      keyId: z.string().describe(
        "Optional. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key.",
      ).optional(),
    }).describe(
      "A KeyId identifies a specific public key, usually by hashing the public key.",
    ).optional(),
    tbsCertificateDigest: z.string().describe(
      "The hash of the pre-signed certificate, which will be signed by the CA. Corresponds to the TBS Certificate in https://tools.ietf.org/html/rfc5280#section-4.1.2. The field will always be populated.",
    ).optional(),
    x509Description: z.object({
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
    "A CertificateDescription describes an X.509 certificate or CSR that has been issued, as an alternative to using ASN.1 / X.509.",
  ).optional(),
  certificateTemplate: z.string().describe(
    "Immutable. The resource name for a CertificateTemplate used to issue this certificate, in the format `projects/*/locations/*/certificateTemplates/*`. If this is specified, the caller must have the necessary permission to use this template. If this is omitted, no template will be used. This template must be in the same location as the Certificate.",
  ).optional(),
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
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  lifetime: z.string().describe(
    'Required. Immutable. The desired lifetime of a certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate. Note that the lifetime may be truncated if it would extend past the life of any certificate authority in the issuing chain.',
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`.",
  ).optional(),
  pemCsr: z.string().describe(
    "Immutable. A pem-encoded X.509 certificate signing request (CSR).",
  ).optional(),
  requestedNotBeforeTime: z.string().describe(
    "Optional. The requested not_before_time of this Certificate. This field may only be set if the CaPool.IssuancePolicy.allow_requester_specified_not_before_time field is set to true for the issuing CaPool. If this field is specified, the certificate will be issued with this 'not_before_time'. If this is not specified, the 'not_before_time' will be set to the issuance time or issuance time minus backdate_duration depending on the CaPool configuration.",
  ).optional(),
  revocationDetails: z.object({
    revocationState: z.enum([
      "REVOCATION_REASON_UNSPECIFIED",
      "KEY_COMPROMISE",
      "CERTIFICATE_AUTHORITY_COMPROMISE",
      "AFFILIATION_CHANGED",
      "SUPERSEDED",
      "CESSATION_OF_OPERATION",
      "CERTIFICATE_HOLD",
      "PRIVILEGE_WITHDRAWN",
      "ATTRIBUTE_AUTHORITY_COMPROMISE",
    ]).describe("Indicates why a Certificate was revoked.").optional(),
    revocationTime: z.string().describe(
      "The time at which this Certificate was revoked.",
    ).optional(),
  }).describe(
    "Describes fields that are relavent to the revocation of a Certificate.",
  ).optional(),
  subjectMode: z.enum([
    "SUBJECT_REQUEST_MODE_UNSPECIFIED",
    "DEFAULT",
    "RDN_SEQUENCE",
    "REFLECTED_SPIFFE",
  ]).describe(
    "Immutable. Specifies how the Certificate's identity fields are to be decided. If this is omitted, the `DEFAULT` subject mode will be used.",
  ).optional(),
  certificateId: z.string().describe(
    "Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. This field is required when using a CertificateAuthority in the Enterprise CertificateAuthority.tier, but is optional and its value is ignored otherwise.",
  ).optional(),
  issuingCertificateAuthorityId: z.string().describe(
    'Optional. The resource ID of the CertificateAuthority that should issue the certificate. This optional field will ignore the load-balancing scheme of the Pool and directly issue the certificate from the CA with the specified ID, contained in the same CaPool referenced by `parent`. Per-CA quota rules apply. If left empty, a CertificateAuthority will be chosen from the CaPool by the service. For example, to issue a Certificate from a Certificate Authority with resource name "projects/my-project/locations/us-central1/caPools/my-pool/certificateAuthorities/my-ca", you can set the parent to "projects/my-project/locations/us-central1/caPools/my-pool" and the issuing_certificate_authority_id to "my-ca".',
  ).optional(),
  requestId: z.string().describe(
    "Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Certificate Authority CaPools.Certificates. Registered at `@swamp/gcp/privateca/capools-certificates`. */
export const model = {
  type: "@swamp/gcp/privateca/capools-certificates",
  version: "2026.05.18.2",
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
      description: "Added: requestedNotBeforeTime",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: requestedNotBeforeTime",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { requestedNotBeforeTime: _requestedNotBeforeTime, ...rest } =
          old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: requestedNotBeforeTime",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Certificate corresponds to a signed X.509 certificate issued by a Certifica...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a certificates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["certificateDescription"] !== undefined) {
          body["certificateDescription"] = g["certificateDescription"];
        }
        if (g["certificateTemplate"] !== undefined) {
          body["certificateTemplate"] = g["certificateTemplate"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifetime"] !== undefined) body["lifetime"] = g["lifetime"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pemCsr"] !== undefined) body["pemCsr"] = g["pemCsr"];
        if (g["requestedNotBeforeTime"] !== undefined) {
          body["requestedNotBeforeTime"] = g["requestedNotBeforeTime"];
        }
        if (g["revocationDetails"] !== undefined) {
          body["revocationDetails"] = g["revocationDetails"];
        }
        if (g["subjectMode"] !== undefined) {
          body["subjectMode"] = g["subjectMode"];
        }
        if (g["certificateId"] !== undefined) {
          body["certificateId"] = g["certificateId"];
        }
        if (g["issuingCertificateAuthorityId"] !== undefined) {
          body["issuingCertificateAuthorityId"] =
            g["issuingCertificateAuthorityId"];
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
      description: "Get a certificates",
      arguments: z.object({
        identifier: z.string().describe("The name of the certificates"),
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
      description: "Update certificates attributes",
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
        if (g["certificateDescription"] !== undefined) {
          body["certificateDescription"] = g["certificateDescription"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["requestedNotBeforeTime"] !== undefined) {
          body["requestedNotBeforeTime"] = g["requestedNotBeforeTime"];
        }
        if (g["revocationDetails"] !== undefined) {
          body["revocationDetails"] = g["revocationDetails"];
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
    sync: {
      description: "Sync certificates state from GCP",
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
    revoke: {
      description: "revoke",
      arguments: z.object({
        reason: z.any().optional(),
        requestId: z.any().optional(),
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
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "privateca.projects.locations.caPools.certificates.revoke",
            "path": "v1/{+name}:revoke",
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
