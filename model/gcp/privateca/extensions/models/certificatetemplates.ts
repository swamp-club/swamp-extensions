// Auto-generated extension model for @swamp/gcp/privateca/certificatetemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Authority CertificateTemplates.
 *
 * A CertificateTemplate refers to a managed template for certificate issuance.
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
  return `${parent}/certificateTemplates/${shortName}`;
}

const BASE_URL = "https://privateca.googleapis.com/";

const GET_CONFIG = {
  "id": "privateca.projects.locations.certificateTemplates.get",
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
  "id": "privateca.projects.locations.certificateTemplates.create",
  "path": "v1/{+parent}/certificateTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "certificateTemplateId": {
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
  "id": "privateca.projects.locations.certificateTemplates.patch",
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
  "id": "privateca.projects.locations.certificateTemplates.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "Optional. A human-readable description of scenarios this template is intended for.",
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
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  maximumLifetime: z.string().describe(
    "Optional. The maximum lifetime allowed for issued Certificates that use this template. If the issuing CaPool resource's IssuancePolicy specifies a maximum_lifetime the minimum of the two durations will be the maximum lifetime for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CertificateTemplate in the format `projects/*/locations/*/certificateTemplates/*`.",
  ).optional(),
  passthroughExtensions: z.object({
    additionalExtensions: z.array(z.object({
      objectIdPath: z.array(z.number().int()).describe(
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
  predefinedValues: z.object({
    additionalExtensions: z.array(z.object({
      critical: z.boolean().describe(
        "Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error).",
      ).optional(),
      objectId: z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      }).describe(
        "An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.",
      ).optional(),
      value: z.string().describe("Required. The value of this X.509 extension.")
        .optional(),
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
        objectIdPath: z.array(z.unknown()).describe(
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
      objectIdPath: z.array(z.number().int()).describe(
        "Required. The parts of an OID path. The most significant parts of the path come first.",
      ).optional(),
    })).describe(
      "Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4.",
    ).optional(),
  }).describe(
    "An X509Parameters is used to describe certain fields of an X.509 certificate, such as the key usage fields, fields specific to CA certificates, certificate policy extensions and custom extensions.",
  ).optional(),
  certificateTemplateId: z.string().describe(
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
  createTime: z.string().optional(),
  description: z.string().optional(),
  identityConstraints: z.object({
    allowSubjectAltNamesPassthrough: z.boolean(),
    allowSubjectPassthrough: z.boolean(),
    celExpression: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  maximumLifetime: z.string().optional(),
  name: z.string(),
  passthroughExtensions: z.object({
    additionalExtensions: z.array(z.object({
      objectIdPath: z.array(z.number()),
    })),
    knownExtensions: z.array(z.string()),
  }).optional(),
  predefinedValues: z.object({
    additionalExtensions: z.array(z.object({
      critical: z.boolean(),
      objectId: z.object({
        objectIdPath: z.array(z.unknown()),
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
        objectIdPath: z.array(z.unknown()),
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
      objectIdPath: z.array(z.number()),
    })),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. A human-readable description of scenarios this template is intended for.",
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
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  maximumLifetime: z.string().describe(
    "Optional. The maximum lifetime allowed for issued Certificates that use this template. If the issuing CaPool resource's IssuancePolicy specifies a maximum_lifetime the minimum of the two durations will be the maximum lifetime for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CertificateTemplate in the format `projects/*/locations/*/certificateTemplates/*`.",
  ).optional(),
  passthroughExtensions: z.object({
    additionalExtensions: z.array(z.object({
      objectIdPath: z.array(z.number().int()).describe(
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
  predefinedValues: z.object({
    additionalExtensions: z.array(z.object({
      critical: z.boolean().describe(
        "Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error).",
      ).optional(),
      objectId: z.object({
        objectIdPath: z.array(z.unknown()).describe(
          "Required. The parts of an OID path. The most significant parts of the path come first.",
        ).optional(),
      }).describe(
        "An ObjectId specifies an object identifier (OID). These provide context and describe types in ASN.1 messages.",
      ).optional(),
      value: z.string().describe("Required. The value of this X.509 extension.")
        .optional(),
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
        objectIdPath: z.array(z.unknown()).describe(
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
      objectIdPath: z.array(z.number().int()).describe(
        "Required. The parts of an OID path. The most significant parts of the path come first.",
      ).optional(),
    })).describe(
      "Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4.",
    ).optional(),
  }).describe(
    "An X509Parameters is used to describe certain fields of an X.509 certificate, such as the key usage fields, fields specific to CA certificates, certificate policy extensions and custom extensions.",
  ).optional(),
  certificateTemplateId: z.string().describe(
    "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Certificate Authority CertificateTemplates. Registered at `@swamp/gcp/privateca/certificatetemplates`. */
export const model = {
  type: "@swamp/gcp/privateca/certificatetemplates",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A CertificateTemplate refers to a managed template for certificate issuance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a certificateTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["identityConstraints"] !== undefined) {
          body["identityConstraints"] = g["identityConstraints"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maximumLifetime"] !== undefined) {
          body["maximumLifetime"] = g["maximumLifetime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["passthroughExtensions"] !== undefined) {
          body["passthroughExtensions"] = g["passthroughExtensions"];
        }
        if (g["predefinedValues"] !== undefined) {
          body["predefinedValues"] = g["predefinedValues"];
        }
        if (g["certificateTemplateId"] !== undefined) {
          body["certificateTemplateId"] = g["certificateTemplateId"];
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
      description: "Get a certificateTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the certificateTemplates"),
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
      description: "Update certificateTemplates attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["identityConstraints"] !== undefined) {
          body["identityConstraints"] = g["identityConstraints"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maximumLifetime"] !== undefined) {
          body["maximumLifetime"] = g["maximumLifetime"];
        }
        if (g["passthroughExtensions"] !== undefined) {
          body["passthroughExtensions"] = g["passthroughExtensions"];
        }
        if (g["predefinedValues"] !== undefined) {
          body["predefinedValues"] = g["predefinedValues"];
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
      description: "Delete the certificateTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the certificateTemplates"),
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
      description: "Sync certificateTemplates state from GCP",
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
  },
};
