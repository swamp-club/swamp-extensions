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

// Auto-generated extension model for @swamp/gcp/jobs/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Talent Solution Jobs.
 *
 * A Job resource represents a job posting (also referred to as a "job listing" or "job requisition"). A job belongs to a Company, which is the hiring entity responsible for the job.
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
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://jobs.googleapis.com/";

const GET_CONFIG = {
  "id": "jobs.projects.jobs.get",
  "path": "v3/{+name}",
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
  "id": "jobs.projects.jobs.create",
  "path": "v3/{+parent}/jobs",
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
  "id": "jobs.projects.jobs.patch",
  "path": "v3/{+name}",
  "httpMethod": "PATCH",
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

const DELETE_CONFIG = {
  "id": "jobs.projects.jobs.delete",
  "path": "v3/{+name}",
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
  "id": "jobs.projects.jobs.list",
  "path": "v3/{+parent}/jobs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "jobView": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  job: z.object({
    addresses: z.array(z.string()).describe(
      "Optional but strongly recommended for the best service experience. Location(s) where the employer is looking to hire for this job posting. Specifying the full street address(es) of the hiring location enables better API results, especially job searches by commute time. At most 50 locations are allowed for best search performance. If a job has more locations, it is suggested to split it into multiple jobs with unique requisition_ids (e.g. 'ReqA' becomes 'ReqA-1', 'ReqA-2', etc.) as multiple jobs with the same company_name, language_code and requisition_id are not allowed. If the original requisition_id must be preserved, a custom field should be used for storage. It is also suggested to group the locations that close to each other in the same job for better search experience. Jobs with multiple addresses must have their addresses with the same LocationType to allow location filtering to work properly. (For example, a Job with addresses \"1600 Amphitheatre Parkway, Mountain View, CA, USA\" and \"London, UK\" may not have location filters applied correctly at search time since the first is a LocationType.STREET_ADDRESS and the second is a LocationType.LOCALITY.) If a job needs to have multiple addresses, it is suggested to split it into multiple jobs with same LocationTypes. The maximum number of allowed characters is 500.",
    ).optional(),
    applicationInfo: z.object({
      emails: z.array(z.string()).describe(
        "Optional but at least one of uris, emails or instruction must be specified. Use this field to specify email address(es) to which resumes or applications can be sent. The maximum number of allowed characters for each entry is 255.",
      ).optional(),
      instruction: z.string().describe(
        'Optional but at least one of uris, emails or instruction must be specified. Use this field to provide instructions, such as "Mail your application to...", that a candidate can follow to apply for the job. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 3,000.',
      ).optional(),
      uris: z.array(z.string()).describe(
        "Optional but at least one of uris, emails or instruction must be specified. Use this URI field to direct an applicant to a website, for example to link to an online application form. The maximum number of allowed characters for each entry is 2,000.",
      ).optional(),
    }).describe("Application related details of a job posting.").optional(),
    companyDisplayName: z.string().describe(
      "Output only. Display name of the company listing the job.",
    ).optional(),
    companyName: z.string().describe(
      'Required. The resource name of the company listing the job, such as "projects/api-test-project/companies/foo".',
    ).optional(),
    compensationInfo: z.object({
      annualizedBaseCompensationRange: z.object({
        maxCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        minCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
      }).describe("Compensation range.").optional(),
      annualizedTotalCompensationRange: z.object({
        maxCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        minCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
      }).describe("Compensation range.").optional(),
      entries: z.array(z.object({
        amount: z.object({
          currencyCode: z.unknown().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.unknown().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.unknown().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        description: z.string().describe(
          "Optional. Compensation description. For example, could indicate equity terms or provide additional context to an estimated bonus.",
        ).optional(),
        expectedUnitsPerYear: z.number().describe(
          "Optional. Expected number of units paid each year. If not specified, when Job.employment_types is FULLTIME, a default value is inferred based on unit. Default values: - HOURLY: 2080 - DAILY: 260 - WEEKLY: 52 - MONTHLY: 12 - ANNUAL: 1",
        ).optional(),
        range: z.object({
          maxCompensation: z.unknown().describe(
            "Represents an amount of money with its currency type.",
          ).optional(),
          minCompensation: z.unknown().describe(
            "Represents an amount of money with its currency type.",
          ).optional(),
        }).describe("Compensation range.").optional(),
        type: z.enum([
          "COMPENSATION_TYPE_UNSPECIFIED",
          "BASE",
          "BONUS",
          "SIGNING_BONUS",
          "EQUITY",
          "PROFIT_SHARING",
          "COMMISSIONS",
          "TIPS",
          "OTHER_COMPENSATION_TYPE",
        ]).describe(
          "Optional. Compensation type. Default is CompensationUnit.COMPENSATION_TYPE_UNSPECIFIED.",
        ).optional(),
        unit: z.enum([
          "COMPENSATION_UNIT_UNSPECIFIED",
          "HOURLY",
          "DAILY",
          "WEEKLY",
          "MONTHLY",
          "YEARLY",
          "ONE_TIME",
          "OTHER_COMPENSATION_UNIT",
        ]).describe(
          "Optional. Frequency of the specified amount. Default is CompensationUnit.COMPENSATION_UNIT_UNSPECIFIED.",
        ).optional(),
      })).describe(
        "Optional. Job compensation information. At most one entry can be of type CompensationInfo.CompensationType.BASE, which is referred as ** base compensation entry ** for the job.",
      ).optional(),
    }).describe("Job compensation details.").optional(),
    customAttributes: z.record(
      z.string(),
      z.object({
        filterable: z.boolean().describe(
          "Optional. If the `filterable` flag is true, the custom field values may be used for custom attribute filters JobQuery.custom_attribute_filter. If false, these values may not be used for custom attribute filters. Default is false.",
        ).optional(),
        longValues: z.array(z.string()).describe(
          "Optional but exactly one of string_values or long_values must be specified. This field is used to perform number range search. (`EQ`, `GT`, `GE`, `LE`, `LT`) over filterable `long_value`. Currently at most 1 long_values is supported.",
        ).optional(),
        stringValues: z.array(z.string()).describe(
          "Optional but exactly one of string_values or long_values must be specified. This field is used to perform a string match (`CASE_SENSITIVE_MATCH` or `CASE_INSENSITIVE_MATCH`) search. For filterable `string_value`s, a maximum total number of 200 values is allowed, with each `string_value` has a byte size of no more than 500B. For unfilterable `string_values`, the maximum total byte size of unfilterable `string_values` is 50KB. Empty string is not allowed.",
        ).optional(),
      }),
    ).describe(
      "Optional. A map of fields to hold both filterable and non-filterable custom job attributes that are not covered by the provided structured fields. The keys of the map are strings up to 64 bytes and must match the pattern: a-zA-Z*. For example, key0LikeThis or KEY_1_LIKE_THIS. At most 100 filterable and at most 100 unfilterable keys are supported. For filterable `string_values`, across all keys at most 200 values are allowed, with each string no more than 255 characters. For unfilterable `string_values`, the maximum total size of `string_values` across all keys is 50KB.",
    ).optional(),
    degreeTypes: z.array(
      z.enum([
        "DEGREE_TYPE_UNSPECIFIED",
        "PRIMARY_EDUCATION",
        "LOWER_SECONDARY_EDUCATION",
        "UPPER_SECONDARY_EDUCATION",
        "ADULT_REMEDIAL_EDUCATION",
        "ASSOCIATES_OR_EQUIVALENT",
        "BACHELORS_OR_EQUIVALENT",
        "MASTERS_OR_EQUIVALENT",
        "DOCTORAL_OR_EQUIVALENT",
      ]),
    ).describe(
      "Optional. The desired education degrees for the job, such as Bachelors, Masters.",
    ).optional(),
    department: z.string().describe(
      "Optional. The department or functional area within the company with the open position. The maximum number of allowed characters is 255.",
    ).optional(),
    derivedInfo: z.object({
      jobCategories: z.array(
        z.enum([
          "JOB_CATEGORY_UNSPECIFIED",
          "ACCOUNTING_AND_FINANCE",
          "ADMINISTRATIVE_AND_OFFICE",
          "ADVERTISING_AND_MARKETING",
          "ANIMAL_CARE",
          "ART_FASHION_AND_DESIGN",
          "BUSINESS_OPERATIONS",
          "CLEANING_AND_FACILITIES",
          "COMPUTER_AND_IT",
          "CONSTRUCTION",
          "CUSTOMER_SERVICE",
          "EDUCATION",
          "ENTERTAINMENT_AND_TRAVEL",
          "FARMING_AND_OUTDOORS",
          "HEALTHCARE",
          "HUMAN_RESOURCES",
          "INSTALLATION_MAINTENANCE_AND_REPAIR",
          "LEGAL",
          "MANAGEMENT",
          "MANUFACTURING_AND_WAREHOUSE",
          "MEDIA_COMMUNICATIONS_AND_WRITING",
          "OIL_GAS_AND_MINING",
          "PERSONAL_CARE_AND_SERVICES",
          "PROTECTIVE_SERVICES",
          "REAL_ESTATE",
          "RESTAURANT_AND_HOSPITALITY",
          "SALES_AND_RETAIL",
          "SCIENCE_AND_ENGINEERING",
          "SOCIAL_SERVICES_AND_NON_PROFIT",
          "SPORTS_FITNESS_AND_RECREATION",
          "TRANSPORTATION_AND_LOGISTICS",
        ]),
      ).describe("Job categories derived from Job.title and Job.description.")
        .optional(),
      locations: z.array(z.object({
        latLng: z.object({
          latitude: z.unknown().describe(
            "The latitude in degrees. It must be in the range [-90.0, +90.0].",
          ).optional(),
          longitude: z.unknown().describe(
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
          'The type of a location, which corresponds to the address lines field of PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a type of LocationType#NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of LocationType#LOCALITY.',
        ).optional(),
        postalAddress: z.object({
          addressLines: z.unknown().describe(
            'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
          ).optional(),
          administrativeArea: z.unknown().describe(
            'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
          ).optional(),
          languageCode: z.unknown().describe(
            'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
          ).optional(),
          locality: z.unknown().describe(
            "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
          ).optional(),
          organization: z.unknown().describe(
            "Optional. The name of the organization at the address.",
          ).optional(),
          postalCode: z.unknown().describe(
            "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
          ).optional(),
          recipients: z.unknown().describe(
            'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
          ).optional(),
          regionCode: z.unknown().describe(
            'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
          ).optional(),
          revision: z.unknown().describe(
            "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
          ).optional(),
          sortingCode: z.unknown().describe(
            'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
          ).optional(),
          sublocality: z.unknown().describe(
            "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
          ).optional(),
        }).describe(
          "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
        ).optional(),
        radiusInMiles: z.number().describe(
          'Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from LatLng covers the area associated with the job location. For example, currently, "Mountain View, CA, USA" has a radius of 6.17 miles.',
        ).optional(),
      })).describe(
        "Structured locations of the job, resolved from Job.addresses. locations are exactly matched to Job.addresses in the same order.",
      ).optional(),
    }).describe("Output only. Derived details about the job posting.")
      .optional(),
    description: z.string().describe(
      "Required. The description of the job, which typically includes a multi-paragraph description of the company and related information. Separate fields are provided on the job object for responsibilities, qualifications, and other job characteristics. Use of these separate job fields is recommended. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 100,000.",
    ).optional(),
    employmentTypes: z.array(
      z.enum([
        "EMPLOYMENT_TYPE_UNSPECIFIED",
        "FULL_TIME",
        "PART_TIME",
        "CONTRACTOR",
        "CONTRACT_TO_HIRE",
        "TEMPORARY",
        "INTERN",
        "VOLUNTEER",
        "PER_DIEM",
        "FLY_IN_FLY_OUT",
        "OTHER_EMPLOYMENT_TYPE",
      ]),
    ).describe(
      "Optional. The employment type(s) of a job, for example, full time or part time.",
    ).optional(),
    incentives: z.string().describe(
      "Optional. A description of bonus, commission, and other compensation incentives associated with the job not including salary or pay. The maximum number of allowed characters is 10,000.",
    ).optional(),
    jobBenefits: z.array(
      z.enum([
        "JOB_BENEFIT_UNSPECIFIED",
        "CHILD_CARE",
        "DENTAL",
        "DOMESTIC_PARTNER",
        "FLEXIBLE_HOURS",
        "MEDICAL",
        "LIFE_INSURANCE",
        "PARENTAL_LEAVE",
        "RETIREMENT_PLAN",
        "SICK_DAYS",
        "VACATION",
        "VISION",
      ]),
    ).describe("Optional. The benefits included with the job.").optional(),
    jobEndTime: z.string().describe(
      "Optional. The end timestamp of the job. Typically this field is used for contracting engagements. Invalid timestamps are ignored.",
    ).optional(),
    jobLevel: z.enum([
      "JOB_LEVEL_UNSPECIFIED",
      "ENTRY_LEVEL",
      "EXPERIENCED",
      "MANAGER",
      "DIRECTOR",
      "EXECUTIVE",
    ]).describe(
      'Optional. The experience level associated with the job, such as "Entry Level".',
    ).optional(),
    jobStartTime: z.string().describe(
      "Optional. The start timestamp of the job in UTC time zone. Typically this field is used for contracting engagements. Invalid timestamps are ignored.",
    ).optional(),
    languageCode: z.string().describe(
      'Optional. The language of the posting. This field is distinct from any requirements for fluency that are associated with the job. Language codes must be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47){: class="external" target="_blank" }. If this field is unspecified and Job.description is present, detected language code based on Job.description is assigned, otherwise defaults to \'en_US\'.',
    ).optional(),
    name: z.string().describe(
      'Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique.',
    ).optional(),
    postingCreateTime: z.string().describe(
      "Output only. The timestamp when this job posting was created.",
    ).optional(),
    postingExpireTime: z.string().describe(
      "Optional but strongly recommended for the best service experience. The expiration timestamp of the job. After this timestamp, the job is marked as expired, and it no longer appears in search results. The expired job can't be deleted or listed by the DeleteJob and ListJobs APIs, but it can be retrieved with the GetJob API or updated with the UpdateJob API. An expired job can be updated and opened again by using a future expiration timestamp. Updating an expired job fails if there is another existing open job with same company_name, language_code and requisition_id. The expired jobs are retained in our system for 90 days. However, the overall expired job count cannot exceed 3 times the maximum of open jobs count over the past week, otherwise jobs with earlier expire time are cleaned first. Expired jobs are no longer accessible after they are cleaned out. Invalid timestamps are ignored, and treated as expire time not provided. Timestamp before the instant request is made is considered valid, the job will be treated as expired immediately. If this value is not provided at the time of job creation or is invalid, the job posting expires after 30 days from the job's creation time. For example, if the job was created on 2017/01/01 13:00AM UTC with an unspecified expiration date, the job expires after 2017/01/31 13:00AM UTC. If this value is not provided on job update, it depends on the field masks set by UpdateJobRequest.update_mask. If the field masks include expiry_time, or the masks are empty meaning that every field is updated, the job posting expires after 30 days from the job's last update time. Otherwise the expiration date isn't updated.",
    ).optional(),
    postingPublishTime: z.string().describe(
      "Optional. The timestamp this job posting was most recently published. The default value is the time the request arrives at the server. Invalid timestamps are ignored.",
    ).optional(),
    postingRegion: z.enum([
      "POSTING_REGION_UNSPECIFIED",
      "ADMINISTRATIVE_AREA",
      "NATION",
      "TELECOMMUTE",
    ]).describe(
      "Optional. The job PostingRegion (for example, state, country) throughout which the job is available. If this field is set, a LocationFilter in a search query within the job region finds this job posting if an exact location match isn't specified. If this field is set to PostingRegion.NATION or PostingRegion.ADMINISTRATIVE_AREA, setting job Job.addresses to the same location level as this field is strongly recommended.",
    ).optional(),
    postingUpdateTime: z.string().describe(
      "Output only. The timestamp when this job posting was last updated.",
    ).optional(),
    processingOptions: z.object({
      disableStreetAddressResolution: z.boolean().describe(
        "Optional. If set to `true`, the service does not attempt to resolve a more precise address for the job.",
      ).optional(),
      htmlSanitization: z.enum([
        "HTML_SANITIZATION_UNSPECIFIED",
        "HTML_SANITIZATION_DISABLED",
        "SIMPLE_FORMATTING_ONLY",
      ]).describe(
        "Optional. Option for job HTML content sanitization. Applied fields are: * description * applicationInfo.instruction * incentives * qualifications * responsibilities HTML tags in these fields may be stripped if sanitiazation is not disabled. Defaults to HtmlSanitization.SIMPLE_FORMATTING_ONLY.",
      ).optional(),
    }).describe("Input only. Options for job processing.").optional(),
    promotionValue: z.number().int().describe(
      "Optional. A promotion value of the job, as determined by the client. The value determines the sort order of the jobs returned when searching for jobs using the featured jobs search call, with higher promotional values being returned first and ties being resolved by relevance sort. Only the jobs with a promotionValue >0 are returned in a FEATURED_JOB_SEARCH. Default value is 0, and negative values are treated as 0.",
    ).optional(),
    qualifications: z.string().describe(
      "Optional. A description of the qualifications required to perform the job. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000.",
    ).optional(),
    requisitionId: z.string().describe(
      "Required. The requisition ID, also referred to as the posting ID, assigned by the client to identify a job. This field is intended to be used by clients for client identification and tracking of postings. A job is not allowed to be created if there is another job with the same [company_name], language_code and requisition_id. The maximum number of allowed characters is 255.",
    ).optional(),
    responsibilities: z.string().describe(
      "Optional. A description of job responsibilities. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000.",
    ).optional(),
    title: z.string().describe(
      'Required. The title of the job, such as "Software Engineer" The maximum number of allowed characters is 500.',
    ).optional(),
    visibility: z.enum([
      "VISIBILITY_UNSPECIFIED",
      "ACCOUNT_ONLY",
      "SHARED_WITH_GOOGLE",
      "SHARED_WITH_PUBLIC",
    ]).describe(
      "Deprecated. The job is only visible to the owner. The visibility of the job. Defaults to Visibility.ACCOUNT_ONLY if not specified.",
    ).optional(),
  }).describe(
    'A Job resource represents a job posting (also referred to as a "job listing" or "job requisition"). A job belongs to a Company, which is the hiring entity responsible for the job.',
  ).optional(),
  updateMask: z.string().describe(
    "Optional but strongly recommended to be provided for the best service experience. If update_mask is provided, only the specified fields in job are updated. Otherwise all the fields are updated. A field mask to restrict the fields that are updated. Only top level fields of Job are supported.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  addresses: z.array(z.string()).optional(),
  applicationInfo: z.object({
    emails: z.array(z.string()),
    instruction: z.string(),
    uris: z.array(z.string()),
  }).optional(),
  companyDisplayName: z.string().optional(),
  companyName: z.string().optional(),
  compensationInfo: z.object({
    annualizedBaseCompensationRange: z.object({
      maxCompensation: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      minCompensation: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
    }),
    annualizedTotalCompensationRange: z.object({
      maxCompensation: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      minCompensation: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
    }),
    entries: z.array(z.object({
      amount: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      description: z.string(),
      expectedUnitsPerYear: z.number(),
      range: z.object({
        maxCompensation: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        minCompensation: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
      }),
      type: z.string(),
      unit: z.string(),
    })),
  }).optional(),
  customAttributes: z.record(z.string(), z.unknown()).optional(),
  degreeTypes: z.array(z.string()).optional(),
  department: z.string().optional(),
  derivedInfo: z.object({
    jobCategories: z.array(z.string()),
    locations: z.array(z.object({
      latLng: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      locationType: z.string(),
      postalAddress: z.object({
        addressLines: z.array(z.unknown()),
        administrativeArea: z.string(),
        languageCode: z.string(),
        locality: z.string(),
        organization: z.string(),
        postalCode: z.string(),
        recipients: z.array(z.unknown()),
        regionCode: z.string(),
        revision: z.number(),
        sortingCode: z.string(),
        sublocality: z.string(),
      }),
      radiusInMiles: z.number(),
    })),
  }).optional(),
  description: z.string().optional(),
  employmentTypes: z.array(z.string()).optional(),
  incentives: z.string().optional(),
  jobBenefits: z.array(z.string()).optional(),
  jobEndTime: z.string().optional(),
  jobLevel: z.string().optional(),
  jobStartTime: z.string().optional(),
  languageCode: z.string().optional(),
  name: z.string(),
  postingCreateTime: z.string().optional(),
  postingExpireTime: z.string().optional(),
  postingPublishTime: z.string().optional(),
  postingRegion: z.string().optional(),
  postingUpdateTime: z.string().optional(),
  processingOptions: z.object({
    disableStreetAddressResolution: z.boolean(),
    htmlSanitization: z.string(),
  }).optional(),
  promotionValue: z.number().optional(),
  qualifications: z.string().optional(),
  requisitionId: z.string().optional(),
  responsibilities: z.string().optional(),
  title: z.string().optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  job: z.object({
    addresses: z.array(z.string()).describe(
      "Optional but strongly recommended for the best service experience. Location(s) where the employer is looking to hire for this job posting. Specifying the full street address(es) of the hiring location enables better API results, especially job searches by commute time. At most 50 locations are allowed for best search performance. If a job has more locations, it is suggested to split it into multiple jobs with unique requisition_ids (e.g. 'ReqA' becomes 'ReqA-1', 'ReqA-2', etc.) as multiple jobs with the same company_name, language_code and requisition_id are not allowed. If the original requisition_id must be preserved, a custom field should be used for storage. It is also suggested to group the locations that close to each other in the same job for better search experience. Jobs with multiple addresses must have their addresses with the same LocationType to allow location filtering to work properly. (For example, a Job with addresses \"1600 Amphitheatre Parkway, Mountain View, CA, USA\" and \"London, UK\" may not have location filters applied correctly at search time since the first is a LocationType.STREET_ADDRESS and the second is a LocationType.LOCALITY.) If a job needs to have multiple addresses, it is suggested to split it into multiple jobs with same LocationTypes. The maximum number of allowed characters is 500.",
    ).optional(),
    applicationInfo: z.object({
      emails: z.array(z.string()).describe(
        "Optional but at least one of uris, emails or instruction must be specified. Use this field to specify email address(es) to which resumes or applications can be sent. The maximum number of allowed characters for each entry is 255.",
      ).optional(),
      instruction: z.string().describe(
        'Optional but at least one of uris, emails or instruction must be specified. Use this field to provide instructions, such as "Mail your application to...", that a candidate can follow to apply for the job. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 3,000.',
      ).optional(),
      uris: z.array(z.string()).describe(
        "Optional but at least one of uris, emails or instruction must be specified. Use this URI field to direct an applicant to a website, for example to link to an online application form. The maximum number of allowed characters for each entry is 2,000.",
      ).optional(),
    }).describe("Application related details of a job posting.").optional(),
    companyDisplayName: z.string().describe(
      "Output only. Display name of the company listing the job.",
    ).optional(),
    companyName: z.string().describe(
      'Required. The resource name of the company listing the job, such as "projects/api-test-project/companies/foo".',
    ).optional(),
    compensationInfo: z.object({
      annualizedBaseCompensationRange: z.object({
        maxCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        minCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
      }).describe("Compensation range.").optional(),
      annualizedTotalCompensationRange: z.object({
        maxCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        minCompensation: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
      }).describe("Compensation range.").optional(),
      entries: z.array(z.object({
        amount: z.object({
          currencyCode: z.unknown().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.unknown().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.unknown().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        description: z.string().describe(
          "Optional. Compensation description. For example, could indicate equity terms or provide additional context to an estimated bonus.",
        ).optional(),
        expectedUnitsPerYear: z.number().describe(
          "Optional. Expected number of units paid each year. If not specified, when Job.employment_types is FULLTIME, a default value is inferred based on unit. Default values: - HOURLY: 2080 - DAILY: 260 - WEEKLY: 52 - MONTHLY: 12 - ANNUAL: 1",
        ).optional(),
        range: z.object({
          maxCompensation: z.unknown().describe(
            "Represents an amount of money with its currency type.",
          ).optional(),
          minCompensation: z.unknown().describe(
            "Represents an amount of money with its currency type.",
          ).optional(),
        }).describe("Compensation range.").optional(),
        type: z.enum([
          "COMPENSATION_TYPE_UNSPECIFIED",
          "BASE",
          "BONUS",
          "SIGNING_BONUS",
          "EQUITY",
          "PROFIT_SHARING",
          "COMMISSIONS",
          "TIPS",
          "OTHER_COMPENSATION_TYPE",
        ]).describe(
          "Optional. Compensation type. Default is CompensationUnit.COMPENSATION_TYPE_UNSPECIFIED.",
        ).optional(),
        unit: z.enum([
          "COMPENSATION_UNIT_UNSPECIFIED",
          "HOURLY",
          "DAILY",
          "WEEKLY",
          "MONTHLY",
          "YEARLY",
          "ONE_TIME",
          "OTHER_COMPENSATION_UNIT",
        ]).describe(
          "Optional. Frequency of the specified amount. Default is CompensationUnit.COMPENSATION_UNIT_UNSPECIFIED.",
        ).optional(),
      })).describe(
        "Optional. Job compensation information. At most one entry can be of type CompensationInfo.CompensationType.BASE, which is referred as ** base compensation entry ** for the job.",
      ).optional(),
    }).describe("Job compensation details.").optional(),
    customAttributes: z.record(
      z.string(),
      z.object({
        filterable: z.boolean().describe(
          "Optional. If the `filterable` flag is true, the custom field values may be used for custom attribute filters JobQuery.custom_attribute_filter. If false, these values may not be used for custom attribute filters. Default is false.",
        ).optional(),
        longValues: z.array(z.string()).describe(
          "Optional but exactly one of string_values or long_values must be specified. This field is used to perform number range search. (`EQ`, `GT`, `GE`, `LE`, `LT`) over filterable `long_value`. Currently at most 1 long_values is supported.",
        ).optional(),
        stringValues: z.array(z.string()).describe(
          "Optional but exactly one of string_values or long_values must be specified. This field is used to perform a string match (`CASE_SENSITIVE_MATCH` or `CASE_INSENSITIVE_MATCH`) search. For filterable `string_value`s, a maximum total number of 200 values is allowed, with each `string_value` has a byte size of no more than 500B. For unfilterable `string_values`, the maximum total byte size of unfilterable `string_values` is 50KB. Empty string is not allowed.",
        ).optional(),
      }),
    ).describe(
      "Optional. A map of fields to hold both filterable and non-filterable custom job attributes that are not covered by the provided structured fields. The keys of the map are strings up to 64 bytes and must match the pattern: a-zA-Z*. For example, key0LikeThis or KEY_1_LIKE_THIS. At most 100 filterable and at most 100 unfilterable keys are supported. For filterable `string_values`, across all keys at most 200 values are allowed, with each string no more than 255 characters. For unfilterable `string_values`, the maximum total size of `string_values` across all keys is 50KB.",
    ).optional(),
    degreeTypes: z.array(
      z.enum([
        "DEGREE_TYPE_UNSPECIFIED",
        "PRIMARY_EDUCATION",
        "LOWER_SECONDARY_EDUCATION",
        "UPPER_SECONDARY_EDUCATION",
        "ADULT_REMEDIAL_EDUCATION",
        "ASSOCIATES_OR_EQUIVALENT",
        "BACHELORS_OR_EQUIVALENT",
        "MASTERS_OR_EQUIVALENT",
        "DOCTORAL_OR_EQUIVALENT",
      ]),
    ).describe(
      "Optional. The desired education degrees for the job, such as Bachelors, Masters.",
    ).optional(),
    department: z.string().describe(
      "Optional. The department or functional area within the company with the open position. The maximum number of allowed characters is 255.",
    ).optional(),
    derivedInfo: z.object({
      jobCategories: z.array(
        z.enum([
          "JOB_CATEGORY_UNSPECIFIED",
          "ACCOUNTING_AND_FINANCE",
          "ADMINISTRATIVE_AND_OFFICE",
          "ADVERTISING_AND_MARKETING",
          "ANIMAL_CARE",
          "ART_FASHION_AND_DESIGN",
          "BUSINESS_OPERATIONS",
          "CLEANING_AND_FACILITIES",
          "COMPUTER_AND_IT",
          "CONSTRUCTION",
          "CUSTOMER_SERVICE",
          "EDUCATION",
          "ENTERTAINMENT_AND_TRAVEL",
          "FARMING_AND_OUTDOORS",
          "HEALTHCARE",
          "HUMAN_RESOURCES",
          "INSTALLATION_MAINTENANCE_AND_REPAIR",
          "LEGAL",
          "MANAGEMENT",
          "MANUFACTURING_AND_WAREHOUSE",
          "MEDIA_COMMUNICATIONS_AND_WRITING",
          "OIL_GAS_AND_MINING",
          "PERSONAL_CARE_AND_SERVICES",
          "PROTECTIVE_SERVICES",
          "REAL_ESTATE",
          "RESTAURANT_AND_HOSPITALITY",
          "SALES_AND_RETAIL",
          "SCIENCE_AND_ENGINEERING",
          "SOCIAL_SERVICES_AND_NON_PROFIT",
          "SPORTS_FITNESS_AND_RECREATION",
          "TRANSPORTATION_AND_LOGISTICS",
        ]),
      ).describe("Job categories derived from Job.title and Job.description.")
        .optional(),
      locations: z.array(z.object({
        latLng: z.object({
          latitude: z.unknown().describe(
            "The latitude in degrees. It must be in the range [-90.0, +90.0].",
          ).optional(),
          longitude: z.unknown().describe(
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
          'The type of a location, which corresponds to the address lines field of PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a type of LocationType#NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of LocationType#LOCALITY.',
        ).optional(),
        postalAddress: z.object({
          addressLines: z.unknown().describe(
            'Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
          ).optional(),
          administrativeArea: z.unknown().describe(
            'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated.',
          ).optional(),
          languageCode: z.unknown().describe(
            'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
          ).optional(),
          locality: z.unknown().describe(
            "Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`.",
          ).optional(),
          organization: z.unknown().describe(
            "Optional. The name of the organization at the address.",
          ).optional(),
          postalCode: z.unknown().describe(
            "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States).",
          ).optional(),
          recipients: z.unknown().describe(
            'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
          ).optional(),
          regionCode: z.unknown().describe(
            'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
          ).optional(),
          revision: z.unknown().describe(
            "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
          ).optional(),
          sortingCode: z.unknown().describe(
            'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d\'Ivoire).',
          ).optional(),
          sublocality: z.unknown().describe(
            "Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district.",
          ).optional(),
        }).describe(
          "Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.",
        ).optional(),
        radiusInMiles: z.number().describe(
          'Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from LatLng covers the area associated with the job location. For example, currently, "Mountain View, CA, USA" has a radius of 6.17 miles.',
        ).optional(),
      })).describe(
        "Structured locations of the job, resolved from Job.addresses. locations are exactly matched to Job.addresses in the same order.",
      ).optional(),
    }).describe("Output only. Derived details about the job posting.")
      .optional(),
    description: z.string().describe(
      "Required. The description of the job, which typically includes a multi-paragraph description of the company and related information. Separate fields are provided on the job object for responsibilities, qualifications, and other job characteristics. Use of these separate job fields is recommended. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 100,000.",
    ).optional(),
    employmentTypes: z.array(
      z.enum([
        "EMPLOYMENT_TYPE_UNSPECIFIED",
        "FULL_TIME",
        "PART_TIME",
        "CONTRACTOR",
        "CONTRACT_TO_HIRE",
        "TEMPORARY",
        "INTERN",
        "VOLUNTEER",
        "PER_DIEM",
        "FLY_IN_FLY_OUT",
        "OTHER_EMPLOYMENT_TYPE",
      ]),
    ).describe(
      "Optional. The employment type(s) of a job, for example, full time or part time.",
    ).optional(),
    incentives: z.string().describe(
      "Optional. A description of bonus, commission, and other compensation incentives associated with the job not including salary or pay. The maximum number of allowed characters is 10,000.",
    ).optional(),
    jobBenefits: z.array(
      z.enum([
        "JOB_BENEFIT_UNSPECIFIED",
        "CHILD_CARE",
        "DENTAL",
        "DOMESTIC_PARTNER",
        "FLEXIBLE_HOURS",
        "MEDICAL",
        "LIFE_INSURANCE",
        "PARENTAL_LEAVE",
        "RETIREMENT_PLAN",
        "SICK_DAYS",
        "VACATION",
        "VISION",
      ]),
    ).describe("Optional. The benefits included with the job.").optional(),
    jobEndTime: z.string().describe(
      "Optional. The end timestamp of the job. Typically this field is used for contracting engagements. Invalid timestamps are ignored.",
    ).optional(),
    jobLevel: z.enum([
      "JOB_LEVEL_UNSPECIFIED",
      "ENTRY_LEVEL",
      "EXPERIENCED",
      "MANAGER",
      "DIRECTOR",
      "EXECUTIVE",
    ]).describe(
      'Optional. The experience level associated with the job, such as "Entry Level".',
    ).optional(),
    jobStartTime: z.string().describe(
      "Optional. The start timestamp of the job in UTC time zone. Typically this field is used for contracting engagements. Invalid timestamps are ignored.",
    ).optional(),
    languageCode: z.string().describe(
      'Optional. The language of the posting. This field is distinct from any requirements for fluency that are associated with the job. Language codes must be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47){: class="external" target="_blank" }. If this field is unspecified and Job.description is present, detected language code based on Job.description is assigned, otherwise defaults to \'en_US\'.',
    ).optional(),
    name: z.string().describe(
      'Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique.',
    ).optional(),
    postingCreateTime: z.string().describe(
      "Output only. The timestamp when this job posting was created.",
    ).optional(),
    postingExpireTime: z.string().describe(
      "Optional but strongly recommended for the best service experience. The expiration timestamp of the job. After this timestamp, the job is marked as expired, and it no longer appears in search results. The expired job can't be deleted or listed by the DeleteJob and ListJobs APIs, but it can be retrieved with the GetJob API or updated with the UpdateJob API. An expired job can be updated and opened again by using a future expiration timestamp. Updating an expired job fails if there is another existing open job with same company_name, language_code and requisition_id. The expired jobs are retained in our system for 90 days. However, the overall expired job count cannot exceed 3 times the maximum of open jobs count over the past week, otherwise jobs with earlier expire time are cleaned first. Expired jobs are no longer accessible after they are cleaned out. Invalid timestamps are ignored, and treated as expire time not provided. Timestamp before the instant request is made is considered valid, the job will be treated as expired immediately. If this value is not provided at the time of job creation or is invalid, the job posting expires after 30 days from the job's creation time. For example, if the job was created on 2017/01/01 13:00AM UTC with an unspecified expiration date, the job expires after 2017/01/31 13:00AM UTC. If this value is not provided on job update, it depends on the field masks set by UpdateJobRequest.update_mask. If the field masks include expiry_time, or the masks are empty meaning that every field is updated, the job posting expires after 30 days from the job's last update time. Otherwise the expiration date isn't updated.",
    ).optional(),
    postingPublishTime: z.string().describe(
      "Optional. The timestamp this job posting was most recently published. The default value is the time the request arrives at the server. Invalid timestamps are ignored.",
    ).optional(),
    postingRegion: z.enum([
      "POSTING_REGION_UNSPECIFIED",
      "ADMINISTRATIVE_AREA",
      "NATION",
      "TELECOMMUTE",
    ]).describe(
      "Optional. The job PostingRegion (for example, state, country) throughout which the job is available. If this field is set, a LocationFilter in a search query within the job region finds this job posting if an exact location match isn't specified. If this field is set to PostingRegion.NATION or PostingRegion.ADMINISTRATIVE_AREA, setting job Job.addresses to the same location level as this field is strongly recommended.",
    ).optional(),
    postingUpdateTime: z.string().describe(
      "Output only. The timestamp when this job posting was last updated.",
    ).optional(),
    processingOptions: z.object({
      disableStreetAddressResolution: z.boolean().describe(
        "Optional. If set to `true`, the service does not attempt to resolve a more precise address for the job.",
      ).optional(),
      htmlSanitization: z.enum([
        "HTML_SANITIZATION_UNSPECIFIED",
        "HTML_SANITIZATION_DISABLED",
        "SIMPLE_FORMATTING_ONLY",
      ]).describe(
        "Optional. Option for job HTML content sanitization. Applied fields are: * description * applicationInfo.instruction * incentives * qualifications * responsibilities HTML tags in these fields may be stripped if sanitiazation is not disabled. Defaults to HtmlSanitization.SIMPLE_FORMATTING_ONLY.",
      ).optional(),
    }).describe("Input only. Options for job processing.").optional(),
    promotionValue: z.number().int().describe(
      "Optional. A promotion value of the job, as determined by the client. The value determines the sort order of the jobs returned when searching for jobs using the featured jobs search call, with higher promotional values being returned first and ties being resolved by relevance sort. Only the jobs with a promotionValue >0 are returned in a FEATURED_JOB_SEARCH. Default value is 0, and negative values are treated as 0.",
    ).optional(),
    qualifications: z.string().describe(
      "Optional. A description of the qualifications required to perform the job. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000.",
    ).optional(),
    requisitionId: z.string().describe(
      "Required. The requisition ID, also referred to as the posting ID, assigned by the client to identify a job. This field is intended to be used by clients for client identification and tracking of postings. A job is not allowed to be created if there is another job with the same [company_name], language_code and requisition_id. The maximum number of allowed characters is 255.",
    ).optional(),
    responsibilities: z.string().describe(
      "Optional. A description of job responsibilities. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000.",
    ).optional(),
    title: z.string().describe(
      'Required. The title of the job, such as "Software Engineer" The maximum number of allowed characters is 500.',
    ).optional(),
    visibility: z.enum([
      "VISIBILITY_UNSPECIFIED",
      "ACCOUNT_ONLY",
      "SHARED_WITH_GOOGLE",
      "SHARED_WITH_PUBLIC",
    ]).describe(
      "Deprecated. The job is only visible to the owner. The visibility of the job. Defaults to Visibility.ACCOUNT_ONLY if not specified.",
    ).optional(),
  }).describe(
    'A Job resource represents a job posting (also referred to as a "job listing" or "job requisition"). A job belongs to a Company, which is the hiring entity responsible for the job.',
  ).optional(),
  updateMask: z.string().describe(
    "Optional but strongly recommended to be provided for the best service experience. If update_mask is provided, only the specified fields in job are updated. Otherwise all the fields are updated. A field mask to restrict the fields that are updated. Only top level fields of Job are supported.",
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

/** Swamp extension model for Google Cloud Talent Solution Jobs. Registered at `@swamp/gcp/jobs/jobs`. */
export const model = {
  type: "@swamp/gcp/jobs/jobs",
  version: "2026.06.08.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        'A Job resource represents a job posting (also referred to as a "job listing" ...',
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["job"] !== undefined) body["job"] = g["job"];
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "Update jobs attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["job"] !== undefined) body["job"] = g["job"];
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "Sync jobs state from GCP",
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
      description: "List jobs resources",
      arguments: z.object({
        filter: z.string().describe(
          'Required. The filter string specifies the jobs to be enumerated. Supported operator: =, AND The fields eligible for filtering are: * `companyName` * `requisitionId` * `status` Available values: OPEN, EXPIRED, ALL. Defaults to OPEN if no value is specified. At least one of `companyName` and `requisitionId` must present or an INVALID_ARGUMENT error is thrown. Sample Query: * companyName = "projects/api-test-project/companies/123" * companyName = "projects/api-test-project/companies/123" AND requisitionId = "req-1" * companyName = "projects/api-test-project/companies/123" AND status = "EXPIRED" * requisitionId = "req-1" * requisitionId = "req-1" AND status = "EXPIRED"',
        ).optional(),
        jobView: z.string().describe(
          "Optional. The desired job attributes returned for jobs in the search response. Defaults to JobView.JOB_VIEW_FULL if no value is specified.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of jobs to be returned per page of results. If job_view is set to JobView.JOB_VIEW_ID_ONLY, the maximum allowed page size is 1000. Otherwise, the maximum allowed page size is 100. Default is 100 if empty or a number < 1 is specified.",
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
        if (args["jobView"] !== undefined) {
          params["jobView"] = String(args["jobView"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "jobs",
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        filter: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "jobs.projects.jobs.batchDelete",
            "path": "v3/{+parent}/jobs:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    search: {
      description: "search",
      arguments: z.object({
        disableKeywordMatch: z.any().optional(),
        diversificationLevel: z.any().optional(),
        enableBroadening: z.any().optional(),
        histogramFacets: z.any().optional(),
        jobQuery: z.any().optional(),
        jobView: z.any().optional(),
        offset: z.any().optional(),
        orderBy: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        requestMetadata: z.any().optional(),
        requirePreciseResultSize: z.any().optional(),
        searchMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["disableKeywordMatch"] !== undefined) {
          body["disableKeywordMatch"] = args["disableKeywordMatch"];
        }
        if (args["diversificationLevel"] !== undefined) {
          body["diversificationLevel"] = args["diversificationLevel"];
        }
        if (args["enableBroadening"] !== undefined) {
          body["enableBroadening"] = args["enableBroadening"];
        }
        if (args["histogramFacets"] !== undefined) {
          body["histogramFacets"] = args["histogramFacets"];
        }
        if (args["jobQuery"] !== undefined) body["jobQuery"] = args["jobQuery"];
        if (args["jobView"] !== undefined) body["jobView"] = args["jobView"];
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        if (args["requirePreciseResultSize"] !== undefined) {
          body["requirePreciseResultSize"] = args["requirePreciseResultSize"];
        }
        if (args["searchMode"] !== undefined) {
          body["searchMode"] = args["searchMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "jobs.projects.jobs.search",
            "path": "v3/{+parent}/jobs:search",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    search_for_alert: {
      description: "search for alert",
      arguments: z.object({
        disableKeywordMatch: z.any().optional(),
        diversificationLevel: z.any().optional(),
        enableBroadening: z.any().optional(),
        histogramFacets: z.any().optional(),
        jobQuery: z.any().optional(),
        jobView: z.any().optional(),
        offset: z.any().optional(),
        orderBy: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        requestMetadata: z.any().optional(),
        requirePreciseResultSize: z.any().optional(),
        searchMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["disableKeywordMatch"] !== undefined) {
          body["disableKeywordMatch"] = args["disableKeywordMatch"];
        }
        if (args["diversificationLevel"] !== undefined) {
          body["diversificationLevel"] = args["diversificationLevel"];
        }
        if (args["enableBroadening"] !== undefined) {
          body["enableBroadening"] = args["enableBroadening"];
        }
        if (args["histogramFacets"] !== undefined) {
          body["histogramFacets"] = args["histogramFacets"];
        }
        if (args["jobQuery"] !== undefined) body["jobQuery"] = args["jobQuery"];
        if (args["jobView"] !== undefined) body["jobView"] = args["jobView"];
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["requestMetadata"] !== undefined) {
          body["requestMetadata"] = args["requestMetadata"];
        }
        if (args["requirePreciseResultSize"] !== undefined) {
          body["requirePreciseResultSize"] = args["requirePreciseResultSize"];
        }
        if (args["searchMode"] !== undefined) {
          body["searchMode"] = args["searchMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "jobs.projects.jobs.searchForAlert",
            "path": "v3/{+parent}/jobs:searchForAlert",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
