// Auto-generated extension model for @swamp/gcp/domains/registrations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Domains Registrations.
 *
 * The `Registration` resource facilitates managing and configuring domain name registrations. There are several ways to create a new `Registration` resource: To create a new `Registration` resource, find a suitable domain name by calling the `SearchDomains` method with a query to see available domain name options. After choosing a name, call `RetrieveRegisterParameters` to ensure availability and obtain information like pricing, which is needed to build a call to `RegisterDomain`. Another way to create a new `Registration` is to transfer an existing domain from another registrar (Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations)). First, go to the current registrar to unlock the domain for transfer and retrieve the domain's transfer authorization code. Then call `RetrieveTransferParameters` to confirm that the domain is unlocked and to get values needed to build a call to `TransferDomain`. Finally, you can create a new `Registration` by importing an existing domain managed with [Google Domains](https://domains.google/) (Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations)). First, call `RetrieveImportableDomains` to list domains to which the calling user has sufficient access. Then call `ImportDomain` on any domain names you want to use with Cloud Domains.
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
  return `${parent}/registrations/${shortName}`;
}

const BASE_URL = "https://domains.googleapis.com/";

const GET_CONFIG = {
  "id": "domains.projects.locations.registrations.get",
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

const PATCH_CONFIG = {
  "id": "domains.projects.locations.registrations.patch",
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
  "id": "domains.projects.locations.registrations.delete",
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

const GlobalArgsSchema = z.object({
  contactSettings: z.object({
    adminContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    privacy: z.enum([
      "CONTACT_PRIVACY_UNSPECIFIED",
      "PUBLIC_CONTACT_DATA",
      "PRIVATE_CONTACT_DATA",
      "REDACTED_CONTACT_DATA",
    ]).describe(
      "Required. Privacy setting for the contacts associated with the `Registration`.",
    ).optional(),
    registrantContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    technicalContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
  }).describe(
    "Defines the contact information associated with a `Registration`. [ICANN](https://icann.org/) requires all domain names to have associated contact information. The `registrant_contact` is considered the domain's legal owner, and often the other contacts are identical.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The creation timestamp of the `Registration` resource.",
  ).optional(),
  dnsSettings: z.object({
    customDns: z.object({
      dsRecords: z.array(z.object({
        algorithm: z.enum([
          "ALGORITHM_UNSPECIFIED",
          "RSAMD5",
          "DH",
          "DSA",
          "ECC",
          "RSASHA1",
          "DSANSEC3SHA1",
          "RSASHA1NSEC3SHA1",
          "RSASHA256",
          "RSASHA512",
          "ECCGOST",
          "ECDSAP256SHA256",
          "ECDSAP384SHA384",
          "ED25519",
          "ED448",
          "INDIRECT",
          "PRIVATEDNS",
          "PRIVATEOID",
        ]).describe("The algorithm used to generate the referenced DNSKEY.")
          .optional(),
        digest: z.string().describe(
          "The digest generated from the referenced DNSKEY.",
        ).optional(),
        digestType: z.enum([
          "DIGEST_TYPE_UNSPECIFIED",
          "SHA1",
          "SHA256",
          "GOST3411",
          "SHA384",
        ]).describe(
          "The hash function used to generate the digest of the referenced DNSKEY.",
        ).optional(),
        keyTag: z.number().int().describe(
          "The key tag of the record. Must be set in range 0 -- 65535.",
        ).optional(),
      })).describe(
        "The list of DS records for this domain, which are used to enable DNSSEC. The domain's DNS provider can provide the values to set here. If this field is empty, DNSSEC is disabled.",
      ).optional(),
      nameServers: z.array(z.string()).describe(
        "Required. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format.",
      ).optional(),
    }).describe("Configuration for an arbitrary DNS provider.").optional(),
    glueRecords: z.array(z.object({
      hostName: z.string().describe(
        "Required. Domain name of the host in Punycode format.",
      ).optional(),
      ipv4Addresses: z.array(z.string()).describe(
        "List of IPv4 addresses corresponding to this host in the standard decimal format (e.g. `198.51.100.1`). At least one of `ipv4_address` and `ipv6_address` must be set.",
      ).optional(),
      ipv6Addresses: z.array(z.string()).describe(
        "List of IPv6 addresses corresponding to this host in the standard hexadecimal format (e.g. `2001:db8::`). At least one of `ipv4_address` and `ipv6_address` must be set.",
      ).optional(),
    })).describe(
      "The list of glue records for this `Registration`. Commonly empty.",
    ).optional(),
    googleDomainsDns: z.object({
      dsRecords: z.array(z.object({
        algorithm: z.enum([
          "ALGORITHM_UNSPECIFIED",
          "RSAMD5",
          "DH",
          "DSA",
          "ECC",
          "RSASHA1",
          "DSANSEC3SHA1",
          "RSASHA1NSEC3SHA1",
          "RSASHA256",
          "RSASHA512",
          "ECCGOST",
          "ECDSAP256SHA256",
          "ECDSAP384SHA384",
          "ED25519",
          "ED448",
          "INDIRECT",
          "PRIVATEDNS",
          "PRIVATEOID",
        ]).describe("The algorithm used to generate the referenced DNSKEY.")
          .optional(),
        digest: z.string().describe(
          "The digest generated from the referenced DNSKEY.",
        ).optional(),
        digestType: z.enum([
          "DIGEST_TYPE_UNSPECIFIED",
          "SHA1",
          "SHA256",
          "GOST3411",
          "SHA384",
        ]).describe(
          "The hash function used to generate the digest of the referenced DNSKEY.",
        ).optional(),
        keyTag: z.number().int().describe(
          "The key tag of the record. Must be set in range 0 -- 65535.",
        ).optional(),
      })).describe(
        "Output only. The list of DS records published for this domain. The list is automatically populated when `ds_state` is `DS_RECORDS_PUBLISHED`, otherwise it remains empty.",
      ).optional(),
      dsState: z.enum([
        "DS_STATE_UNSPECIFIED",
        "DS_RECORDS_UNPUBLISHED",
        "DS_RECORDS_PUBLISHED",
      ]).describe(
        "Required. The state of DS records for this domain. Used to enable or disable automatic DNSSEC.",
      ).optional(),
      nameServers: z.array(z.string()).describe(
        "Output only. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format. This field is automatically populated with the name servers assigned to the Google Domains DNS zone.",
      ).optional(),
    }).describe(
      "Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Configuration for using the free DNS zone provided by Google Domains as a `Registration`'s `dns_provider`. You cannot configure the DNS zone itself using the API. To configure the DNS zone, go to [Google Domains](https://domains.google/).",
    ).optional(),
    googleDomainsRedirectsDataAvailable: z.boolean().describe(
      "Output only. Indicates if this `Registration` has configured one of the following deprecated Google Domains DNS features: * Domain forwarding (HTTP `301` and `302` response status codes), * Email forwarding. See https://cloud.google.com/domains/docs/deprecations/feature-deprecations for more details. If any of these features is enabled call the `RetrieveGoogleDomainsForwardingConfig` method to get details about the feature's configuration. A forwarding configuration might not work correctly if required DNS records are not present in the domain's authoritative DNS Zone.",
    ).optional(),
  }).describe(
    "Defines the DNS configuration of a `Registration`, including name servers, DNSSEC, and glue records.",
  ).optional(),
  domainName: z.string().describe(
    "Required. Immutable. The domain name. Unicode domain names must be expressed in Punycode format.",
  ).optional(),
  domainProperties: z.array(
    z.enum([
      "DOMAIN_PROPERTY_UNSPECIFIED",
      "TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY",
      "REQUIRE_PUSH_TRANSFER",
    ]),
  ).describe("Output only. Special properties of the domain.").optional(),
  expireTime: z.string().describe(
    "Output only. The expiration timestamp of the `Registration`.",
  ).optional(),
  issues: z.array(
    z.enum([
      "ISSUE_UNSPECIFIED",
      "CONTACT_SUPPORT",
      "UNVERIFIED_EMAIL",
      "PROBLEM_WITH_BILLING",
      "DNS_NOT_ACTIVATED",
      "AUTO_RENEWAL_UPDATE_NOT_EFFECTIVE",
    ]),
  ).describe(
    "Output only. The set of issues with the `Registration` that require attention.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Set of labels associated with the `Registration`.",
  ).optional(),
  managementSettings: z.object({
    effectiveTransferLockState: z.enum([
      "TRANSFER_LOCK_STATE_UNSPECIFIED",
      "UNLOCKED",
      "LOCKED",
    ]).describe(
      "Output only. The actual transfer lock state for this `Registration`.",
    ).optional(),
    preferredRenewalMethod: z.enum([
      "RENEWAL_METHOD_UNSPECIFIED",
      "AUTOMATIC_RENEWAL",
      "MANUAL_RENEWAL",
      "RENEWAL_DISABLED",
    ]).describe(
      "Optional. The desired renewal method for this `Registration`. The actual `renewal_method` is automatically updated to reflect this choice. If unset or equal to `RENEWAL_METHOD_UNSPECIFIED`, the actual `renewalMethod` is treated as if it were set to `AUTOMATIC_RENEWAL`. You cannot use `RENEWAL_DISABLED` during resource creation, and you can update the renewal status only when the `Registration` resource has state `ACTIVE` or `SUSPENDED`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be set to `RENEWAL_DISABLED` in case of problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours.",
    ).optional(),
    renewalMethod: z.enum([
      "RENEWAL_METHOD_UNSPECIFIED",
      "AUTOMATIC_RENEWAL",
      "MANUAL_RENEWAL",
      "RENEWAL_DISABLED",
    ]).describe(
      "Output only. The actual renewal method for this `Registration`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be equal to `RENEWAL_DISABLED`—for example, when there are problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours.",
    ).optional(),
    transferLockState: z.enum([
      "TRANSFER_LOCK_STATE_UNSPECIFIED",
      "UNLOCKED",
      "LOCKED",
    ]).describe(
      "This is the desired transfer lock state for this `Registration`. A transfer lock controls whether the domain can be transferred to another registrar. The transfer lock state of the domain is returned in the `effective_transfer_lock_state` property. The transfer lock state values might be different for the following reasons: * `transfer_lock_state` was updated only a short time ago. * Domains with the `TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY` state are in the list of `domain_properties`. These domains are always in the `UNLOCKED` state.",
    ).optional(),
  }).describe(
    "Defines renewal, billing, and transfer settings for a `Registration`.",
  ).optional(),
  name: z.string().describe(
    "Output only. Name of the `Registration` resource, in the format `projects/*/locations/*/registrations/`.",
  ).optional(),
  pendingContactSettings: z.object({
    adminContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    privacy: z.enum([
      "CONTACT_PRIVACY_UNSPECIFIED",
      "PUBLIC_CONTACT_DATA",
      "PRIVATE_CONTACT_DATA",
      "REDACTED_CONTACT_DATA",
    ]).describe(
      "Required. Privacy setting for the contacts associated with the `Registration`.",
    ).optional(),
    registrantContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    technicalContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
  }).describe(
    "Defines the contact information associated with a `Registration`. [ICANN](https://icann.org/) requires all domain names to have associated contact information. The `registrant_contact` is considered the domain's legal owner, and often the other contacts are identical.",
  ).optional(),
  registerFailureReason: z.enum([
    "REGISTER_FAILURE_REASON_UNSPECIFIED",
    "REGISTER_FAILURE_REASON_UNKNOWN",
    "DOMAIN_NOT_AVAILABLE",
    "INVALID_CONTACTS",
  ]).describe(
    "Output only. The reason the domain registration failed. Only set for domains in REGISTRATION_FAILED state.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "REGISTRATION_PENDING",
    "REGISTRATION_FAILED",
    "TRANSFER_PENDING",
    "TRANSFER_FAILED",
    "IMPORT_PENDING",
    "ACTIVE",
    "SUSPENDED",
    "EXPORTED",
    "EXPIRED",
  ]).describe("Output only. The state of the `Registration`").optional(),
  supportedPrivacy: z.array(
    z.enum([
      "CONTACT_PRIVACY_UNSPECIFIED",
      "PUBLIC_CONTACT_DATA",
      "PRIVATE_CONTACT_DATA",
      "REDACTED_CONTACT_DATA",
    ]),
  ).describe(
    "Output only. Set of options for the `contact_settings.privacy` field that this `Registration` supports.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  contactSettings: z.object({
    adminContact: z.object({
      email: z.string(),
      faxNumber: z.string(),
      phoneNumber: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.string()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.string()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
    }),
    privacy: z.string(),
    registrantContact: z.object({
      email: z.string(),
      faxNumber: z.string(),
      phoneNumber: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.string()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.string()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
    }),
    technicalContact: z.object({
      email: z.string(),
      faxNumber: z.string(),
      phoneNumber: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.string()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.string()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
    }),
  }).optional(),
  createTime: z.string().optional(),
  dnsSettings: z.object({
    customDns: z.object({
      dsRecords: z.array(z.object({
        algorithm: z.string(),
        digest: z.string(),
        digestType: z.string(),
        keyTag: z.number(),
      })),
      nameServers: z.array(z.string()),
    }),
    glueRecords: z.array(z.object({
      hostName: z.string(),
      ipv4Addresses: z.array(z.string()),
      ipv6Addresses: z.array(z.string()),
    })),
    googleDomainsDns: z.object({
      dsRecords: z.array(z.object({
        algorithm: z.string(),
        digest: z.string(),
        digestType: z.string(),
        keyTag: z.number(),
      })),
      dsState: z.string(),
      nameServers: z.array(z.string()),
    }),
    googleDomainsRedirectsDataAvailable: z.boolean(),
  }).optional(),
  domainName: z.string().optional(),
  domainProperties: z.array(z.string()).optional(),
  expireTime: z.string().optional(),
  issues: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  managementSettings: z.object({
    effectiveTransferLockState: z.string(),
    preferredRenewalMethod: z.string(),
    renewalMethod: z.string(),
    transferLockState: z.string(),
  }).optional(),
  name: z.string(),
  pendingContactSettings: z.object({
    adminContact: z.object({
      email: z.string(),
      faxNumber: z.string(),
      phoneNumber: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.string()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.string()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
    }),
    privacy: z.string(),
    registrantContact: z.object({
      email: z.string(),
      faxNumber: z.string(),
      phoneNumber: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.string()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.string()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
    }),
    technicalContact: z.object({
      email: z.string(),
      faxNumber: z.string(),
      phoneNumber: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.string()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.string()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
    }),
  }).optional(),
  registerFailureReason: z.string().optional(),
  state: z.string().optional(),
  supportedPrivacy: z.array(z.string()).optional(),
  transferFailureReason: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  contactSettings: z.object({
    adminContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    privacy: z.enum([
      "CONTACT_PRIVACY_UNSPECIFIED",
      "PUBLIC_CONTACT_DATA",
      "PRIVATE_CONTACT_DATA",
      "REDACTED_CONTACT_DATA",
    ]).describe(
      "Required. Privacy setting for the contacts associated with the `Registration`.",
    ).optional(),
    registrantContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    technicalContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
  }).describe(
    "Defines the contact information associated with a `Registration`. [ICANN](https://icann.org/) requires all domain names to have associated contact information. The `registrant_contact` is considered the domain's legal owner, and often the other contacts are identical.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The creation timestamp of the `Registration` resource.",
  ).optional(),
  dnsSettings: z.object({
    customDns: z.object({
      dsRecords: z.array(z.object({
        algorithm: z.enum([
          "ALGORITHM_UNSPECIFIED",
          "RSAMD5",
          "DH",
          "DSA",
          "ECC",
          "RSASHA1",
          "DSANSEC3SHA1",
          "RSASHA1NSEC3SHA1",
          "RSASHA256",
          "RSASHA512",
          "ECCGOST",
          "ECDSAP256SHA256",
          "ECDSAP384SHA384",
          "ED25519",
          "ED448",
          "INDIRECT",
          "PRIVATEDNS",
          "PRIVATEOID",
        ]).describe("The algorithm used to generate the referenced DNSKEY.")
          .optional(),
        digest: z.string().describe(
          "The digest generated from the referenced DNSKEY.",
        ).optional(),
        digestType: z.enum([
          "DIGEST_TYPE_UNSPECIFIED",
          "SHA1",
          "SHA256",
          "GOST3411",
          "SHA384",
        ]).describe(
          "The hash function used to generate the digest of the referenced DNSKEY.",
        ).optional(),
        keyTag: z.number().int().describe(
          "The key tag of the record. Must be set in range 0 -- 65535.",
        ).optional(),
      })).describe(
        "The list of DS records for this domain, which are used to enable DNSSEC. The domain's DNS provider can provide the values to set here. If this field is empty, DNSSEC is disabled.",
      ).optional(),
      nameServers: z.array(z.string()).describe(
        "Required. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format.",
      ).optional(),
    }).describe("Configuration for an arbitrary DNS provider.").optional(),
    glueRecords: z.array(z.object({
      hostName: z.string().describe(
        "Required. Domain name of the host in Punycode format.",
      ).optional(),
      ipv4Addresses: z.array(z.string()).describe(
        "List of IPv4 addresses corresponding to this host in the standard decimal format (e.g. `198.51.100.1`). At least one of `ipv4_address` and `ipv6_address` must be set.",
      ).optional(),
      ipv6Addresses: z.array(z.string()).describe(
        "List of IPv6 addresses corresponding to this host in the standard hexadecimal format (e.g. `2001:db8::`). At least one of `ipv4_address` and `ipv6_address` must be set.",
      ).optional(),
    })).describe(
      "The list of glue records for this `Registration`. Commonly empty.",
    ).optional(),
    googleDomainsDns: z.object({
      dsRecords: z.array(z.object({
        algorithm: z.enum([
          "ALGORITHM_UNSPECIFIED",
          "RSAMD5",
          "DH",
          "DSA",
          "ECC",
          "RSASHA1",
          "DSANSEC3SHA1",
          "RSASHA1NSEC3SHA1",
          "RSASHA256",
          "RSASHA512",
          "ECCGOST",
          "ECDSAP256SHA256",
          "ECDSAP384SHA384",
          "ED25519",
          "ED448",
          "INDIRECT",
          "PRIVATEDNS",
          "PRIVATEOID",
        ]).describe("The algorithm used to generate the referenced DNSKEY.")
          .optional(),
        digest: z.string().describe(
          "The digest generated from the referenced DNSKEY.",
        ).optional(),
        digestType: z.enum([
          "DIGEST_TYPE_UNSPECIFIED",
          "SHA1",
          "SHA256",
          "GOST3411",
          "SHA384",
        ]).describe(
          "The hash function used to generate the digest of the referenced DNSKEY.",
        ).optional(),
        keyTag: z.number().int().describe(
          "The key tag of the record. Must be set in range 0 -- 65535.",
        ).optional(),
      })).describe(
        "Output only. The list of DS records published for this domain. The list is automatically populated when `ds_state` is `DS_RECORDS_PUBLISHED`, otherwise it remains empty.",
      ).optional(),
      dsState: z.enum([
        "DS_STATE_UNSPECIFIED",
        "DS_RECORDS_UNPUBLISHED",
        "DS_RECORDS_PUBLISHED",
      ]).describe(
        "Required. The state of DS records for this domain. Used to enable or disable automatic DNSSEC.",
      ).optional(),
      nameServers: z.array(z.string()).describe(
        "Output only. A list of name servers that store the DNS zone for this domain. Each name server is a domain name, with Unicode domain names expressed in Punycode format. This field is automatically populated with the name servers assigned to the Google Domains DNS zone.",
      ).optional(),
    }).describe(
      "Deprecated: For more information, see [Cloud Domains feature deprecation](https://cloud.google.com/domains/docs/deprecations/feature-deprecations). Configuration for using the free DNS zone provided by Google Domains as a `Registration`'s `dns_provider`. You cannot configure the DNS zone itself using the API. To configure the DNS zone, go to [Google Domains](https://domains.google/).",
    ).optional(),
    googleDomainsRedirectsDataAvailable: z.boolean().describe(
      "Output only. Indicates if this `Registration` has configured one of the following deprecated Google Domains DNS features: * Domain forwarding (HTTP `301` and `302` response status codes), * Email forwarding. See https://cloud.google.com/domains/docs/deprecations/feature-deprecations for more details. If any of these features is enabled call the `RetrieveGoogleDomainsForwardingConfig` method to get details about the feature's configuration. A forwarding configuration might not work correctly if required DNS records are not present in the domain's authoritative DNS Zone.",
    ).optional(),
  }).describe(
    "Defines the DNS configuration of a `Registration`, including name servers, DNSSEC, and glue records.",
  ).optional(),
  domainName: z.string().describe(
    "Required. Immutable. The domain name. Unicode domain names must be expressed in Punycode format.",
  ).optional(),
  domainProperties: z.array(
    z.enum([
      "DOMAIN_PROPERTY_UNSPECIFIED",
      "TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY",
      "REQUIRE_PUSH_TRANSFER",
    ]),
  ).describe("Output only. Special properties of the domain.").optional(),
  expireTime: z.string().describe(
    "Output only. The expiration timestamp of the `Registration`.",
  ).optional(),
  issues: z.array(
    z.enum([
      "ISSUE_UNSPECIFIED",
      "CONTACT_SUPPORT",
      "UNVERIFIED_EMAIL",
      "PROBLEM_WITH_BILLING",
      "DNS_NOT_ACTIVATED",
      "AUTO_RENEWAL_UPDATE_NOT_EFFECTIVE",
    ]),
  ).describe(
    "Output only. The set of issues with the `Registration` that require attention.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Set of labels associated with the `Registration`.",
  ).optional(),
  managementSettings: z.object({
    effectiveTransferLockState: z.enum([
      "TRANSFER_LOCK_STATE_UNSPECIFIED",
      "UNLOCKED",
      "LOCKED",
    ]).describe(
      "Output only. The actual transfer lock state for this `Registration`.",
    ).optional(),
    preferredRenewalMethod: z.enum([
      "RENEWAL_METHOD_UNSPECIFIED",
      "AUTOMATIC_RENEWAL",
      "MANUAL_RENEWAL",
      "RENEWAL_DISABLED",
    ]).describe(
      "Optional. The desired renewal method for this `Registration`. The actual `renewal_method` is automatically updated to reflect this choice. If unset or equal to `RENEWAL_METHOD_UNSPECIFIED`, the actual `renewalMethod` is treated as if it were set to `AUTOMATIC_RENEWAL`. You cannot use `RENEWAL_DISABLED` during resource creation, and you can update the renewal status only when the `Registration` resource has state `ACTIVE` or `SUSPENDED`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be set to `RENEWAL_DISABLED` in case of problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours.",
    ).optional(),
    renewalMethod: z.enum([
      "RENEWAL_METHOD_UNSPECIFIED",
      "AUTOMATIC_RENEWAL",
      "MANUAL_RENEWAL",
      "RENEWAL_DISABLED",
    ]).describe(
      "Output only. The actual renewal method for this `Registration`. When `preferred_renewal_method` is set to `AUTOMATIC_RENEWAL`, the actual `renewal_method` can be equal to `RENEWAL_DISABLED`—for example, when there are problems with the billing account or reported domain abuse. In such cases, check the `issues` field on the `Registration`. After the problem is resolved, the `renewal_method` is automatically updated to `preferred_renewal_method` in a few hours.",
    ).optional(),
    transferLockState: z.enum([
      "TRANSFER_LOCK_STATE_UNSPECIFIED",
      "UNLOCKED",
      "LOCKED",
    ]).describe(
      "This is the desired transfer lock state for this `Registration`. A transfer lock controls whether the domain can be transferred to another registrar. The transfer lock state of the domain is returned in the `effective_transfer_lock_state` property. The transfer lock state values might be different for the following reasons: * `transfer_lock_state` was updated only a short time ago. * Domains with the `TRANSFER_LOCK_UNSUPPORTED_BY_REGISTRY` state are in the list of `domain_properties`. These domains are always in the `UNLOCKED` state.",
    ).optional(),
  }).describe(
    "Defines renewal, billing, and transfer settings for a `Registration`.",
  ).optional(),
  name: z.string().describe(
    "Output only. Name of the `Registration` resource, in the format `projects/*/locations/*/registrations/`.",
  ).optional(),
  pendingContactSettings: z.object({
    adminContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    privacy: z.enum([
      "CONTACT_PRIVACY_UNSPECIFIED",
      "PUBLIC_CONTACT_DATA",
      "PRIVATE_CONTACT_DATA",
      "REDACTED_CONTACT_DATA",
    ]).describe(
      "Required. Privacy setting for the contacts associated with the `Registration`.",
    ).optional(),
    registrantContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
    technicalContact: z.object({
      email: z.string().describe("Required. Email address of the contact.")
        .optional(),
      faxNumber: z.string().describe(
        'Fax number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      phoneNumber: z.string().describe(
        'Required. Phone number of the contact in international format. For example, `"+1-800-555-0123"`.',
      ).optional(),
      postalAddress: z.object({
        addressLines: z.array(z.string()).describe(
          'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
        ).optional(),
        administrativeArea: z.string().describe(
          'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
        ).optional(),
        languageCode: z.string().describe(
          'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
        ).optional(),
        locality: z.string().describe(
          "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
        ).optional(),
        organization: z.string().describe(
          "Optional. The name of the organization at the address.",
        ).optional(),
        postalCode: z.string().describe(
          "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
        ).optional(),
        recipients: z.array(z.string()).describe(
          'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
        ).optional(),
        regionCode: z.string().describe(
          'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
        ).optional(),
        revision: z.number().int().describe(
          "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
        ).optional(),
        sortingCode: z.string().describe(
          'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
        ).optional(),
        sublocality: z.string().describe(
          "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
        ).optional(),
      }).describe(
        "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
      ).optional(),
    }).describe(
      "Details required for a contact associated with a `Registration`.",
    ).optional(),
  }).describe(
    "Defines the contact information associated with a `Registration`. [ICANN](https://icann.org/) requires all domain names to have associated contact information. The `registrant_contact` is considered the domain's legal owner, and often the other contacts are identical.",
  ).optional(),
  registerFailureReason: z.enum([
    "REGISTER_FAILURE_REASON_UNSPECIFIED",
    "REGISTER_FAILURE_REASON_UNKNOWN",
    "DOMAIN_NOT_AVAILABLE",
    "INVALID_CONTACTS",
  ]).describe(
    "Output only. The reason the domain registration failed. Only set for domains in REGISTRATION_FAILED state.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "REGISTRATION_PENDING",
    "REGISTRATION_FAILED",
    "TRANSFER_PENDING",
    "TRANSFER_FAILED",
    "IMPORT_PENDING",
    "ACTIVE",
    "SUSPENDED",
    "EXPORTED",
    "EXPIRED",
  ]).describe("Output only. The state of the `Registration`").optional(),
  supportedPrivacy: z.array(
    z.enum([
      "CONTACT_PRIVACY_UNSPECIFIED",
      "PUBLIC_CONTACT_DATA",
      "PRIVATE_CONTACT_DATA",
      "REDACTED_CONTACT_DATA",
    ]),
  ).describe(
    "Output only. Set of options for the `contact_settings.privacy` field that this `Registration` supports.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Domains Registrations. Registered at `@swamp/gcp/domains/registrations`. */
export const model = {
  type: "@swamp/gcp/domains/registrations",
  version: "2026.05.20.1",
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
      toVersion: "2026.05.01.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The `Registration` resource facilitates managing and configuring domain name ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a registrations",
      arguments: z.object({
        identifier: z.string().describe("The name of the registrations"),
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
      description: "Update registrations attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["contactSettings"] !== undefined) {
          body["contactSettings"] = g["contactSettings"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["dnsSettings"] !== undefined) {
          body["dnsSettings"] = g["dnsSettings"];
        }
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["domainProperties"] !== undefined) {
          body["domainProperties"] = g["domainProperties"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["issues"] !== undefined) body["issues"] = g["issues"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managementSettings"] !== undefined) {
          body["managementSettings"] = g["managementSettings"];
        }
        if (g["pendingContactSettings"] !== undefined) {
          body["pendingContactSettings"] = g["pendingContactSettings"];
        }
        if (g["registerFailureReason"] !== undefined) {
          body["registerFailureReason"] = g["registerFailureReason"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["supportedPrivacy"] !== undefined) {
          body["supportedPrivacy"] = g["supportedPrivacy"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the registrations",
      arguments: z.object({
        identifier: z.string().describe("The name of the registrations"),
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
      description: "Sync registrations state from GCP",
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
    configure_contact_settings: {
      description: "configure contact settings",
      arguments: z.object({
        contactNotices: z.any().optional(),
        contactSettings: z.any().optional(),
        updateMask: z.any().optional(),
        validateOnly: z.any().optional(),
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["contactNotices"] !== undefined) {
          body["contactNotices"] = args["contactNotices"];
        }
        if (args["contactSettings"] !== undefined) {
          body["contactSettings"] = args["contactSettings"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.configureContactSettings",
            "path": "v1/{+registration}:configureContactSettings",
            "httpMethod": "POST",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    configure_dns_settings: {
      description: "configure dns settings",
      arguments: z.object({
        dnsSettings: z.any().optional(),
        updateMask: z.any().optional(),
        validateOnly: z.any().optional(),
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dnsSettings"] !== undefined) {
          body["dnsSettings"] = args["dnsSettings"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.configureDnsSettings",
            "path": "v1/{+registration}:configureDnsSettings",
            "httpMethod": "POST",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    configure_management_settings: {
      description: "configure management settings",
      arguments: z.object({
        managementSettings: z.any().optional(),
        updateMask: z.any().optional(),
        validateOnly: z.any().optional(),
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["managementSettings"] !== undefined) {
          body["managementSettings"] = args["managementSettings"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.configureManagementSettings",
            "path": "v1/{+registration}:configureManagementSettings",
            "httpMethod": "POST",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    export: {
      description: "export",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "domains.projects.locations.registrations.export",
            "path": "v1/{+name}:export",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        domainName: z.any().optional(),
        labels: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["domainName"] !== undefined) {
          body["domainName"] = args["domainName"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "domains.projects.locations.registrations.import",
            "path": "v1/{+parent}/registrations:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    initiate_push_transfer: {
      description: "initiate push transfer",
      arguments: z.object({
        tag: z.any().optional(),
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["tag"] !== undefined) body["tag"] = args["tag"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.initiatePushTransfer",
            "path": "v1/{+registration}:initiatePushTransfer",
            "httpMethod": "POST",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    register: {
      description: "register",
      arguments: z.object({
        contactNotices: z.any().optional(),
        domainNotices: z.any().optional(),
        registration: z.any().optional(),
        validateOnly: z.any().optional(),
        yearlyPrice: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["contactNotices"] !== undefined) {
          body["contactNotices"] = args["contactNotices"];
        }
        if (args["domainNotices"] !== undefined) {
          body["domainNotices"] = args["domainNotices"];
        }
        if (args["registration"] !== undefined) {
          body["registration"] = args["registration"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["yearlyPrice"] !== undefined) {
          body["yearlyPrice"] = args["yearlyPrice"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "domains.projects.locations.registrations.register",
            "path": "v1/{+parent}/registrations:register",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    renew_domain: {
      description: "renew domain",
      arguments: z.object({
        validateOnly: z.any().optional(),
        yearlyPrice: z.any().optional(),
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["yearlyPrice"] !== undefined) {
          body["yearlyPrice"] = args["yearlyPrice"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "domains.projects.locations.registrations.renewDomain",
            "path": "v1/{+registration}:renewDomain",
            "httpMethod": "POST",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    reset_authorization_code: {
      description: "reset authorization code",
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.resetAuthorizationCode",
            "path": "v1/{+registration}:resetAuthorizationCode",
            "httpMethod": "POST",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_authorization_code: {
      description: "retrieve authorization code",
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.retrieveAuthorizationCode",
            "path": "v1/{+registration}:retrieveAuthorizationCode",
            "httpMethod": "GET",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_google_domains_dns_records: {
      description: "retrieve google domains dns records",
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.retrieveGoogleDomainsDnsRecords",
            "path": "v1/{+registration}:retrieveGoogleDomainsDnsRecords",
            "httpMethod": "GET",
            "parameterOrder": ["registration"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_google_domains_forwarding_config: {
      description: "retrieve google domains forwarding config",
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
        params["registration"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.retrieveGoogleDomainsForwardingConfig",
            "path": "v1/{+registration}:retrieveGoogleDomainsForwardingConfig",
            "httpMethod": "GET",
            "parameterOrder": ["registration"],
            "parameters": {
              "registration": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_importable_domains: {
      description: "retrieve importable domains",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.retrieveImportableDomains",
            "path": "v1/{+location}/registrations:retrieveImportableDomains",
            "httpMethod": "GET",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_register_parameters: {
      description: "retrieve register parameters",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.retrieveRegisterParameters",
            "path": "v1/{+location}/registrations:retrieveRegisterParameters",
            "httpMethod": "GET",
            "parameterOrder": ["location"],
            "parameters": {
              "domainName": { "location": "query" },
              "location": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_transfer_parameters: {
      description: "retrieve transfer parameters",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "domains.projects.locations.registrations.retrieveTransferParameters",
            "path": "v1/{+location}/registrations:retrieveTransferParameters",
            "httpMethod": "GET",
            "parameterOrder": ["location"],
            "parameters": {
              "domainName": { "location": "query" },
              "location": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_domains: {
      description: "search domains",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "domains.projects.locations.registrations.searchDomains",
            "path": "v1/{+location}/registrations:searchDomains",
            "httpMethod": "GET",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
              "query": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    transfer: {
      description: "transfer",
      arguments: z.object({
        authorizationCode: z.any().optional(),
        contactNotices: z.any().optional(),
        registration: z.any().optional(),
        validateOnly: z.any().optional(),
        yearlyPrice: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["authorizationCode"] !== undefined) {
          body["authorizationCode"] = args["authorizationCode"];
        }
        if (args["contactNotices"] !== undefined) {
          body["contactNotices"] = args["contactNotices"];
        }
        if (args["registration"] !== undefined) {
          body["registration"] = args["registration"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["yearlyPrice"] !== undefined) {
          body["yearlyPrice"] = args["yearlyPrice"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "domains.projects.locations.registrations.transfer",
            "path": "v1/{+parent}/registrations:transfer",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
