// Auto-generated extension model for @swamp/gcp/jobs/tenants-companies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Talent Solution Tenants.Companies.
 *
 * A Company resource represents a company in the service. A company is the entity that owns job postings, that is, the hiring entity responsible for employing applicants for the job position.
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
  return `${parent}/companies/${shortName}`;
}

const BASE_URL = "https://jobs.googleapis.com/";

const GET_CONFIG = {
  "id": "jobs.projects.tenants.companies.get",
  "path": "v4/{+name}",
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
  "id": "jobs.projects.tenants.companies.create",
  "path": "v4/{+parent}/companies",
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
  "id": "jobs.projects.tenants.companies.patch",
  "path": "v4/{+name}",
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
  "id": "jobs.projects.tenants.companies.delete",
  "path": "v4/{+name}",
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
  careerSiteUri: z.string().describe(
    "The URI to employer's career site or careers page on the employer's web site, for example, \"https://careers.google.com\".",
  ).optional(),
  derivedInfo: z.object({
    headquartersLocation: z.object({
      latLng: z.object({
        latitude: z.number().describe(
          "The latitude in degrees. It must be in the range [-90.0, +90.0].",
        ).optional(),
        longitude: z.number().describe(
          "The longitude in degrees. It must be in the range [-180.0, +180.0].",
        ).optional(),
      }).describe(
        "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
      ).optional(),
      locationType: z.enum([
        "LOCATION_TYPE_UNSPECIFIED",
        "COUNTRY",
        "ADMINISTRATIVE_AREA",
        "SUB_ADMINISTRATIVE_AREA",
        "LOCALITY",
        "POSTAL_CODE",
        "SUB_LOCALITY",
        "SUB_LOCALITY_1",
        "SUB_LOCALITY_2",
        "NEIGHBORHOOD",
        "STREET_ADDRESS",
      ]).describe(
        'The type of a location, which corresponds to the address lines field of google.type.PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a type of LocationType.NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of LocationType.LOCALITY.',
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
      radiusMiles: z.number().describe(
        'Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from google.type.LatLng covers the area associated with the job location. For example, currently, "Mountain View, CA, USA" has a radius of 6.17 miles.',
      ).optional(),
    }).describe(
      "A resource that represents a location with full geographic information.",
    ).optional(),
  }).describe("Derived details about the company.").optional(),
  displayName: z.string().describe(
    'Required. The display name of the company, for example, "Google LLC".',
  ).optional(),
  eeoText: z.string().describe(
    "Equal Employment Opportunity legal disclaimer text to be associated with all jobs, and typically to be displayed in all roles. The maximum number of allowed characters is 500.",
  ).optional(),
  externalId: z.string().describe(
    "Required. Client side company identifier, used to uniquely identify the company. The maximum number of allowed characters is 255.",
  ).optional(),
  headquartersAddress: z.string().describe(
    "The street address of the company's main headquarters, which may be different from the job location. The service attempts to geolocate the provided address, and populates a more specific location wherever possible in DerivedInfo.headquarters_location.",
  ).optional(),
  hiringAgency: z.boolean().describe(
    "Set to true if it is the hiring agency that post jobs for other employers. Defaults to false if not provided.",
  ).optional(),
  imageUri: z.string().describe("A URI that hosts the employer's company logo.")
    .optional(),
  name: z.string().describe(
    'Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz".',
  ).optional(),
  size: z.enum([
    "COMPANY_SIZE_UNSPECIFIED",
    "MINI",
    "SMALL",
    "SMEDIUM",
    "MEDIUM",
    "BIG",
    "BIGGER",
    "GIANT",
  ]).describe("The employer's company size.").optional(),
  websiteUri: z.string().describe(
    'The URI representing the company\'s primary web site or home page, for example, "https://www.google.com". The maximum number of allowed characters is 255.',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  careerSiteUri: z.string().optional(),
  derivedInfo: z.object({
    headquartersLocation: z.object({
      latLng: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      locationType: z.string(),
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
      radiusMiles: z.number(),
    }),
  }).optional(),
  displayName: z.string().optional(),
  eeoText: z.string().optional(),
  externalId: z.string().optional(),
  headquartersAddress: z.string().optional(),
  hiringAgency: z.boolean().optional(),
  imageUri: z.string().optional(),
  keywordSearchableJobCustomAttributes: z.array(z.string()).optional(),
  name: z.string(),
  size: z.string().optional(),
  suspended: z.boolean().optional(),
  websiteUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  careerSiteUri: z.string().describe(
    "The URI to employer's career site or careers page on the employer's web site, for example, \"https://careers.google.com\".",
  ).optional(),
  derivedInfo: z.object({
    headquartersLocation: z.object({
      latLng: z.object({
        latitude: z.number().describe(
          "The latitude in degrees. It must be in the range [-90.0, +90.0].",
        ).optional(),
        longitude: z.number().describe(
          "The longitude in degrees. It must be in the range [-180.0, +180.0].",
        ).optional(),
      }).describe(
        "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
      ).optional(),
      locationType: z.enum([
        "LOCATION_TYPE_UNSPECIFIED",
        "COUNTRY",
        "ADMINISTRATIVE_AREA",
        "SUB_ADMINISTRATIVE_AREA",
        "LOCALITY",
        "POSTAL_CODE",
        "SUB_LOCALITY",
        "SUB_LOCALITY_1",
        "SUB_LOCALITY_2",
        "NEIGHBORHOOD",
        "STREET_ADDRESS",
      ]).describe(
        'The type of a location, which corresponds to the address lines field of google.type.PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a type of LocationType.NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of LocationType.LOCALITY.',
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
      radiusMiles: z.number().describe(
        'Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from google.type.LatLng covers the area associated with the job location. For example, currently, "Mountain View, CA, USA" has a radius of 6.17 miles.',
      ).optional(),
    }).describe(
      "A resource that represents a location with full geographic information.",
    ).optional(),
  }).describe("Derived details about the company.").optional(),
  displayName: z.string().describe(
    'Required. The display name of the company, for example, "Google LLC".',
  ).optional(),
  eeoText: z.string().describe(
    "Equal Employment Opportunity legal disclaimer text to be associated with all jobs, and typically to be displayed in all roles. The maximum number of allowed characters is 500.",
  ).optional(),
  externalId: z.string().describe(
    "Required. Client side company identifier, used to uniquely identify the company. The maximum number of allowed characters is 255.",
  ).optional(),
  headquartersAddress: z.string().describe(
    "The street address of the company's main headquarters, which may be different from the job location. The service attempts to geolocate the provided address, and populates a more specific location wherever possible in DerivedInfo.headquarters_location.",
  ).optional(),
  hiringAgency: z.boolean().describe(
    "Set to true if it is the hiring agency that post jobs for other employers. Defaults to false if not provided.",
  ).optional(),
  imageUri: z.string().describe("A URI that hosts the employer's company logo.")
    .optional(),
  name: z.string().describe(
    'Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz".',
  ).optional(),
  size: z.enum([
    "COMPANY_SIZE_UNSPECIFIED",
    "MINI",
    "SMALL",
    "SMEDIUM",
    "MEDIUM",
    "BIG",
    "BIGGER",
    "GIANT",
  ]).describe("The employer's company size.").optional(),
  websiteUri: z.string().describe(
    'The URI representing the company\'s primary web site or home page, for example, "https://www.google.com". The maximum number of allowed characters is 255.',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Talent Solution Tenants.Companies. Registered at `@swamp/gcp/jobs/tenants-companies`. */
export const model = {
  type: "@swamp/gcp/jobs/tenants-companies",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Company resource represents a company in the service. A company is the enti...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a companies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["careerSiteUri"] !== undefined) {
          body["careerSiteUri"] = g["careerSiteUri"];
        }
        if (g["derivedInfo"] !== undefined) {
          body["derivedInfo"] = g["derivedInfo"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["eeoText"] !== undefined) body["eeoText"] = g["eeoText"];
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["headquartersAddress"] !== undefined) {
          body["headquartersAddress"] = g["headquartersAddress"];
        }
        if (g["hiringAgency"] !== undefined) {
          body["hiringAgency"] = g["hiringAgency"];
        }
        if (g["imageUri"] !== undefined) body["imageUri"] = g["imageUri"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["websiteUri"] !== undefined) body["websiteUri"] = g["websiteUri"];
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
      description: "Get a companies",
      arguments: z.object({
        identifier: z.string().describe("The name of the companies"),
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
      description: "Update companies attributes",
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
        if (g["careerSiteUri"] !== undefined) {
          body["careerSiteUri"] = g["careerSiteUri"];
        }
        if (g["derivedInfo"] !== undefined) {
          body["derivedInfo"] = g["derivedInfo"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["eeoText"] !== undefined) body["eeoText"] = g["eeoText"];
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["headquartersAddress"] !== undefined) {
          body["headquartersAddress"] = g["headquartersAddress"];
        }
        if (g["hiringAgency"] !== undefined) {
          body["hiringAgency"] = g["hiringAgency"];
        }
        if (g["imageUri"] !== undefined) body["imageUri"] = g["imageUri"];
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["websiteUri"] !== undefined) body["websiteUri"] = g["websiteUri"];
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
      description: "Delete the companies",
      arguments: z.object({
        identifier: z.string().describe("The name of the companies"),
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
      description: "Sync companies state from GCP",
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
