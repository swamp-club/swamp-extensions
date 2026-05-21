// Auto-generated extension model for @swamp/gcp/cloudchannel/accounts-channelpartnerlinks-customers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Channel Accounts.ChannelPartnerLinks.Customers.
 *
 * Entity representing a customer of a reseller or distributor.
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
  return `${parent}/customers/${shortName}`;
}

const BASE_URL = "https://cloudchannel.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.customers.get",
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
  "id": "cloudchannel.accounts.channelPartnerLinks.customers.create",
  "path": "v1/{+parent}/customers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.customers.patch",
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
  "id": "cloudchannel.accounts.channelPartnerLinks.customers.delete",
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

const LIST_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.customers.list",
  "path": "v1/{+parent}/customers",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  alternateEmail: z.string().describe(
    "Secondary contact email. You need to provide an alternate email to create different domains if a primary contact email already exists. Users will receive a notification with credentials when you create an admin.google.com account. Secondary emails are also recovery email addresses. Alternate emails are optional when you create Team customers.",
  ).optional(),
  channelPartnerId: z.string().describe(
    "Cloud Identity ID of the customer's channel partner. Populated only if a channel partner exists for this customer.",
  ).optional(),
  cloudIdentityInfo: z.object({
    adminConsoleUri: z.string().describe(
      "Output only. URI of Customer's Admin console dashboard.",
    ).optional(),
    alternateEmail: z.string().describe("The alternate email.").optional(),
    customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
      .describe(
        "CustomerType indicates verification type needed for using services.",
      ).optional(),
    eduData: z.object({
      instituteSize: z.enum([
        "INSTITUTE_SIZE_UNSPECIFIED",
        "SIZE_1_100",
        "SIZE_101_500",
        "SIZE_501_1000",
        "SIZE_1001_2000",
        "SIZE_2001_5000",
        "SIZE_5001_10000",
        "SIZE_10001_OR_MORE",
      ]).describe("Size of the institute.").optional(),
      instituteType: z.enum(["INSTITUTE_TYPE_UNSPECIFIED", "K12", "UNIVERSITY"])
        .describe("Designated institute type of customer.").optional(),
      website: z.string().describe(
        "Web address for the edu customer's institution.",
      ).optional(),
    }).describe("Required Edu Attributes").optional(),
    isDomainVerified: z.boolean().describe(
      "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
    ).optional(),
    languageCode: z.string().describe("Language code.").optional(),
    phoneNumber: z.string().describe(
      "Phone number associated with the Cloud Identity.",
    ).optional(),
    primaryDomain: z.string().describe("Output only. The primary domain name.")
      .optional(),
  }).describe("Cloud Identity information for the Cloud Channel Customer.")
    .optional(),
  correlationId: z.string().describe(
    "Optional. External CRM ID for the customer. Populated only if a CRM ID exists for this customer.",
  ).optional(),
  customerAttestationState: z.enum([
    "CUSTOMER_ATTESTATION_STATE_UNSPECIFIED",
    "EXEMPT",
    "NON_EXEMPT_AND_INFO_VERIFIED",
  ]).describe(
    "Optional. Indicate if a customer is attesting about the correctness of provided information. Only required if creating a GCP Entitlement.",
  ).optional(),
  domain: z.string().describe(
    "Required. The customer's primary domain. Must match the primary contact email's domain.",
  ).optional(),
  languageCode: z.string().describe(
    'Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.',
  ).optional(),
  orgDisplayName: z.string().describe(
    "Required. Name of the organization that the customer entity represents.",
  ).optional(),
  orgPostalAddress: z.object({
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
  primaryContactInfo: z.object({
    displayName: z.string().describe(
      "Output only. The customer account contact's display name, formatted as a combination of the customer's first and last name.",
    ).optional(),
    email: z.string().describe(
      "The customer account's contact email. Required for entitlements that create admin.google.com accounts, and serves as the customer's username for those accounts. Use this email to invite Team customers.",
    ).optional(),
    firstName: z.string().describe(
      "The customer account contact's first name. Optional for Team customers.",
    ).optional(),
    lastName: z.string().describe(
      "The customer account contact's last name. Optional for Team customers.",
    ).optional(),
    phone: z.string().describe("The customer account's contact phone number.")
      .optional(),
    title: z.string().describe(
      "Optional. The customer account contact's job title.",
    ).optional(),
  }).describe("Contact information for a customer account.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  alternateEmail: z.string().optional(),
  channelPartnerId: z.string().optional(),
  cloudIdentityId: z.string().optional(),
  cloudIdentityInfo: z.object({
    adminConsoleUri: z.string(),
    alternateEmail: z.string(),
    customerType: z.string(),
    eduData: z.object({
      instituteSize: z.string(),
      instituteType: z.string(),
      website: z.string(),
    }),
    isDomainVerified: z.boolean(),
    languageCode: z.string(),
    phoneNumber: z.string(),
    primaryDomain: z.string(),
  }).optional(),
  correlationId: z.string().optional(),
  createTime: z.string().optional(),
  customerAttestationState: z.string().optional(),
  domain: z.string().optional(),
  languageCode: z.string().optional(),
  name: z.string(),
  orgDisplayName: z.string().optional(),
  orgPostalAddress: z.object({
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
  }).optional(),
  primaryContactInfo: z.object({
    displayName: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    title: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  alternateEmail: z.string().describe(
    "Secondary contact email. You need to provide an alternate email to create different domains if a primary contact email already exists. Users will receive a notification with credentials when you create an admin.google.com account. Secondary emails are also recovery email addresses. Alternate emails are optional when you create Team customers.",
  ).optional(),
  channelPartnerId: z.string().describe(
    "Cloud Identity ID of the customer's channel partner. Populated only if a channel partner exists for this customer.",
  ).optional(),
  cloudIdentityInfo: z.object({
    adminConsoleUri: z.string().describe(
      "Output only. URI of Customer's Admin console dashboard.",
    ).optional(),
    alternateEmail: z.string().describe("The alternate email.").optional(),
    customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
      .describe(
        "CustomerType indicates verification type needed for using services.",
      ).optional(),
    eduData: z.object({
      instituteSize: z.enum([
        "INSTITUTE_SIZE_UNSPECIFIED",
        "SIZE_1_100",
        "SIZE_101_500",
        "SIZE_501_1000",
        "SIZE_1001_2000",
        "SIZE_2001_5000",
        "SIZE_5001_10000",
        "SIZE_10001_OR_MORE",
      ]).describe("Size of the institute.").optional(),
      instituteType: z.enum(["INSTITUTE_TYPE_UNSPECIFIED", "K12", "UNIVERSITY"])
        .describe("Designated institute type of customer.").optional(),
      website: z.string().describe(
        "Web address for the edu customer's institution.",
      ).optional(),
    }).describe("Required Edu Attributes").optional(),
    isDomainVerified: z.boolean().describe(
      "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
    ).optional(),
    languageCode: z.string().describe("Language code.").optional(),
    phoneNumber: z.string().describe(
      "Phone number associated with the Cloud Identity.",
    ).optional(),
    primaryDomain: z.string().describe("Output only. The primary domain name.")
      .optional(),
  }).describe("Cloud Identity information for the Cloud Channel Customer.")
    .optional(),
  correlationId: z.string().describe(
    "Optional. External CRM ID for the customer. Populated only if a CRM ID exists for this customer.",
  ).optional(),
  customerAttestationState: z.enum([
    "CUSTOMER_ATTESTATION_STATE_UNSPECIFIED",
    "EXEMPT",
    "NON_EXEMPT_AND_INFO_VERIFIED",
  ]).describe(
    "Optional. Indicate if a customer is attesting about the correctness of provided information. Only required if creating a GCP Entitlement.",
  ).optional(),
  domain: z.string().describe(
    "Required. The customer's primary domain. Must match the primary contact email's domain.",
  ).optional(),
  languageCode: z.string().describe(
    'Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.',
  ).optional(),
  orgDisplayName: z.string().describe(
    "Required. Name of the organization that the customer entity represents.",
  ).optional(),
  orgPostalAddress: z.object({
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
  primaryContactInfo: z.object({
    displayName: z.string().describe(
      "Output only. The customer account contact's display name, formatted as a combination of the customer's first and last name.",
    ).optional(),
    email: z.string().describe(
      "The customer account's contact email. Required for entitlements that create admin.google.com accounts, and serves as the customer's username for those accounts. Use this email to invite Team customers.",
    ).optional(),
    firstName: z.string().describe(
      "The customer account contact's first name. Optional for Team customers.",
    ).optional(),
    lastName: z.string().describe(
      "The customer account contact's last name. Optional for Team customers.",
    ).optional(),
    phone: z.string().describe("The customer account's contact phone number.")
      .optional(),
    title: z.string().describe(
      "Optional. The customer account contact's job title.",
    ).optional(),
  }).describe("Contact information for a customer account.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Channel Accounts.ChannelPartnerLinks.Customers. Registered at `@swamp/gcp/cloudchannel/accounts-channelpartnerlinks-customers`. */
export const model = {
  type: "@swamp/gcp/cloudchannel/accounts-channelpartnerlinks-customers",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Entity representing a customer of a reseller or distributor.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["alternateEmail"] !== undefined) {
          body["alternateEmail"] = g["alternateEmail"];
        }
        if (g["channelPartnerId"] !== undefined) {
          body["channelPartnerId"] = g["channelPartnerId"];
        }
        if (g["cloudIdentityInfo"] !== undefined) {
          body["cloudIdentityInfo"] = g["cloudIdentityInfo"];
        }
        if (g["correlationId"] !== undefined) {
          body["correlationId"] = g["correlationId"];
        }
        if (g["customerAttestationState"] !== undefined) {
          body["customerAttestationState"] = g["customerAttestationState"];
        }
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["orgDisplayName"] !== undefined) {
          body["orgDisplayName"] = g["orgDisplayName"];
        }
        if (g["orgPostalAddress"] !== undefined) {
          body["orgPostalAddress"] = g["orgPostalAddress"];
        }
        if (g["primaryContactInfo"] !== undefined) {
          body["primaryContactInfo"] = g["primaryContactInfo"];
        }
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a customers",
      arguments: z.object({
        identifier: z.string().describe("The name of the customers"),
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
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update customers attributes",
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
        if (g["alternateEmail"] !== undefined) {
          body["alternateEmail"] = g["alternateEmail"];
        }
        if (g["channelPartnerId"] !== undefined) {
          body["channelPartnerId"] = g["channelPartnerId"];
        }
        if (g["cloudIdentityInfo"] !== undefined) {
          body["cloudIdentityInfo"] = g["cloudIdentityInfo"];
        }
        if (g["correlationId"] !== undefined) {
          body["correlationId"] = g["correlationId"];
        }
        if (g["customerAttestationState"] !== undefined) {
          body["customerAttestationState"] = g["customerAttestationState"];
        }
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["orgDisplayName"] !== undefined) {
          body["orgDisplayName"] = g["orgDisplayName"];
        }
        if (g["orgPostalAddress"] !== undefined) {
          body["orgPostalAddress"] = g["orgPostalAddress"];
        }
        if (g["primaryContactInfo"] !== undefined) {
          body["primaryContactInfo"] = g["primaryContactInfo"];
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
      description: "Delete the customers",
      arguments: z.object({
        identifier: z.string().describe("The name of the customers"),
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
      description: "Sync customers state from GCP",
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
    import: {
      description: "import",
      arguments: z.object({
        authToken: z.any().optional(),
        channelPartnerId: z.any().optional(),
        cloudIdentityId: z.any().optional(),
        customer: z.any().optional(),
        domain: z.any().optional(),
        overwriteIfExists: z.any().optional(),
        primaryAdminEmail: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["authToken"] !== undefined) {
          body["authToken"] = args["authToken"];
        }
        if (args["channelPartnerId"] !== undefined) {
          body["channelPartnerId"] = args["channelPartnerId"];
        }
        if (args["cloudIdentityId"] !== undefined) {
          body["cloudIdentityId"] = args["cloudIdentityId"];
        }
        if (args["customer"] !== undefined) body["customer"] = args["customer"];
        if (args["domain"] !== undefined) body["domain"] = args["domain"];
        if (args["overwriteIfExists"] !== undefined) {
          body["overwriteIfExists"] = args["overwriteIfExists"];
        }
        if (args["primaryAdminEmail"] !== undefined) {
          body["primaryAdminEmail"] = args["primaryAdminEmail"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudchannel.accounts.channelPartnerLinks.customers.import",
            "path": "v1/{+parent}/customers:import",
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
