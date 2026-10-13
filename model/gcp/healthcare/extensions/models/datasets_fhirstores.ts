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

// Auto-generated extension model for @swamp/gcp/healthcare/datasets-fhirstores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Healthcare Datasets.FhirStores.
 *
 * Represents a FHIR store.
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
  return `${parent}/fhirStores/${shortName}`;
}

const BASE_URL = "https://healthcare.googleapis.com/";

const GET_CONFIG = {
  "id": "healthcare.projects.locations.datasets.fhirStores.get",
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
  "id": "healthcare.projects.locations.datasets.fhirStores.create",
  "path": "v1/{+parent}/fhirStores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "fhirStoreId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "healthcare.projects.locations.datasets.fhirStores.patch",
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
  "id": "healthcare.projects.locations.datasets.fhirStores.delete",
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
  "id": "healthcare.projects.locations.datasets.fhirStores.list",
  "path": "v1/{+parent}/fhirStores",
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
  bulkExportGcsDestination: z.object({
    uriPrefix: z.string().describe(
      "Optional. URI for a Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`.",
    ).optional(),
  }).describe(
    "Optional. FHIR bulk export exports resources to the specified Cloud Storage destination. A Cloud Storage destination is a URI for a Cloud Storage directory where result files will be written. Only used in the spec-defined bulk $export methods. The Cloud Healthcare Service Agent requires the `roles/storage.objectAdmin` Cloud IAM role on the destination.",
  ).optional(),
  complexDataTypeReferenceParsing: z.enum([
    "COMPLEX_DATA_TYPE_REFERENCE_PARSING_UNSPECIFIED",
    "DISABLED",
    "ENABLED",
  ]).describe(
    "Optional. Enable parsing of references within complex FHIR data types such as Extensions. If this value is set to ENABLED, then features like referential integrity and Bundle reference rewriting apply to all references. If this flag has not been specified the behavior of the FHIR store will not change, references in complex data types will not be parsed. New stores will have this value set to ENABLED after a notification period. Warning: turning on this flag causes processing existing resources to fail if they contain references to non-existent resources. Cannot be disabled in R5.",
  ).optional(),
  consentConfig: z.object({
    accessDeterminationLogConfig: z.object({
      logLevel: z.enum([
        "LOG_LEVEL_UNSPECIFIED",
        "DISABLED",
        "MINIMUM",
        "VERBOSE",
      ]).describe(
        "Optional. Controls the amount of detail to include as part of the audit logs.",
      ).optional(),
    }).describe(
      "Optional. Specifies how the server logs the consent-aware requests. If not specified, the `AccessDeterminationLogConfig.LogLevel.MINIMUM` option is used.",
    ).optional(),
    accessEnforced: z.boolean().describe(
      "Optional. The default value is false. If set to true, when accessing FHIR resources, the consent headers will be verified against consents given by patients. See the ConsentEnforcementVersion for the supported consent headers.",
    ).optional(),
    consentHeaderHandling: z.object({
      profile: z.enum([
        "SCOPE_PROFILE_UNSPECIFIED",
        "PERMIT_EMPTY_SCOPE",
        "REQUIRED_ON_READ",
      ]).describe(
        "Optional. Specifies the default server behavior when the header is empty. If not specified, the `ScopeProfile.PERMIT_EMPTY_SCOPE` option is used.",
      ).optional(),
    }).describe(
      "Optional. Different options to configure the behaviour of the server when handling the `X-Consent-Scope` header.",
    ).optional(),
    enforcedAdminConsents: z.array(z.string()).describe(
      "Output only. The versioned names of the enforced admin Consent resource(s), in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. This field can only be updated using ApplyAdminConsents.",
    ).optional(),
    version: z.enum(["CONSENT_ENFORCEMENT_VERSION_UNSPECIFIED", "V1"]).describe(
      "Required. Specifies which consent enforcement version is being used for this FHIR store. This field can only be set once by either CreateFhirStore or UpdateFhirStore. After that, you must call ApplyConsents to change the version.",
    ).optional(),
  }).describe(
    "Optional. Specifies whether this store has consent enforcement. Not available for DSTU2 FHIR version due to absence of Consent resources. Not supported for R5 FHIR version.",
  ).optional(),
  defaultSearchHandlingStrict: z.boolean().describe(
    "Optional. If true, overrides the default search behavior for this FHIR store to `handling=strict` which returns an error for unrecognized search parameters. If false, uses the FHIR specification default `handling=lenient` which ignores unrecognized search parameters. The handling can always be changed from the default on an individual API call by setting the HTTP header `Prefer: handling=strict` or `Prefer: handling=lenient`. Defaults to false.",
  ).optional(),
  disableReferentialIntegrity: z.boolean().describe(
    "Immutable. Whether to disable referential integrity in this FHIR store. This field is immutable after FHIR store creation. The default value is false, meaning that the API enforces referential integrity and fails the requests that result in inconsistent state in the FHIR store. When this field is set to true, the API skips referential integrity checks. Consequently, operations that rely on references, such as GetPatientEverything, do not return all the results if broken references exist.",
  ).optional(),
  disableResourceVersioning: z.boolean().describe(
    "Immutable. Whether to disable resource versioning for this FHIR store. This field can not be changed after the creation of FHIR store. If set to false, all write operations cause historical versions to be recorded automatically. The historical versions can be fetched through the history APIs, but cannot be updated. If set to true, no historical versions are kept. The server sends errors for attempts to read the historical versions. Defaults to false.",
  ).optional(),
  enableUpdateCreate: z.boolean().describe(
    "Optional. Whether this FHIR store has the [updateCreate capability](https://www.hl7.org/fhir/capabilitystatement-definitions.html#CapabilityStatement.rest.resource.updateCreate). This determines if the client can use an Update operation to create a new resource with a client-specified ID. If false, all IDs are server-assigned through the Create operation and attempts to update a non-existent resource return errors. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud audit logs and Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. Defaults to false.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize FHIR stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  notificationConfig: z.object({
    pubsubTopic: z.string().describe(
      "The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. PubsubMessage.Data contains the resource name. PubsubMessage.MessageId is the ID of this message. It is guaranteed to be unique within the topic. PubsubMessage.PublishTime is the time at which the message was published. Notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. Cloud Healthcare API service account must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). If the number of errors exceeds a certain rate, some aren't submitted. Note that not all operations trigger notifications, see [Configuring Pub/Sub notifications](https://cloud.google.com/healthcare/docs/how-tos/pubsub) for specific details.",
    ).optional(),
    sendForBulkImport: z.boolean().describe(
      "Indicates whether or not to send Pub/Sub notifications on bulk import. Only supported for DICOM imports.",
    ).optional(),
  }).describe(
    'Deprecated. Use `notification_configs` instead. If non-empty, publish all resource modifications of this FHIR store to this destination. The Pub/Sub message attributes contain a map with a string describing the action that has triggered the notification. For example, "action":"CreateResource". Not supported in R5. Use `notification_configs` instead.',
  ).optional(),
  notificationConfigs: z.array(z.object({
    pubsubTopic: z.string().describe(
      "Optional. The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail (https://cloud.google.com/healthcare-api/docs/permissions-healthcare-api-gcp-products#dicom_fhir_and_hl7v2_store_cloud_pubsub_permissions). If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare-api/docs/how-tos/logging).",
    ).optional(),
    sendFullResource: z.boolean().describe(
      "Optional. Whether to send full FHIR resource to this Pub/Sub topic. The default value is false.",
    ).optional(),
    sendPreviousResourceOnDelete: z.boolean().describe(
      'Optional. Whether to send full FHIR resource to this Pub/Sub topic for deleting FHIR resource. The default value is false. Note that setting this to true does not guarantee that all previous resources will be sent in the format of full FHIR resource. When a resource change is too large or during heavy traffic, only the resource name will be sent. Clients should always check the "payloadType" label from a Pub/Sub message to determine whether it needs to fetch the full previous resource as a separate operation.',
    ).optional(),
  })).describe(
    "Optional. Specifies where and whether to send notifications upon changes to a FHIR store.",
  ).optional(),
  streamConfigs: z.array(z.object({
    bigqueryDestination: z.object({
      datasetUri: z.string().describe(
        "Optional. BigQuery URI to an existing dataset, up to 2000 characters long, in the format `bq://projectId.bqDatasetId`.",
      ).optional(),
      force: z.boolean().describe(
        "Optional. The default value is false. If this flag is `TRUE`, all tables are deleted from the dataset before the new exported tables are written. If the flag is not set and the destination dataset contains tables, the export call returns an error. If `write_disposition` is specified, this parameter is ignored. force=false is equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to write_disposition=WRITE_TRUNCATE.",
      ).optional(),
      schemaConfig: z.object({
        lastUpdatedPartitionConfig: z.object({
          expirationMs: z.unknown().describe(
            "Number of milliseconds for which to keep the storage for a partition.",
          ).optional(),
          type: z.unknown().describe("Type of partitioning.").optional(),
        }).describe(
          "The configuration for exported BigQuery tables to be partitioned by FHIR resource's last updated time column.",
        ).optional(),
        recursiveStructureDepth: z.string().describe(
          "The depth for all recursive structures in the output analytics schema. For example, `concept` in the CodeSystem resource is a recursive structure; when the depth is 2, the CodeSystem table will have a column called `concept.concept` but not `concept.concept.concept`. If not specified or set to 0, the server will use the default value 2. The maximum depth allowed is 5.",
        ).optional(),
        schemaType: z.enum([
          "SCHEMA_TYPE_UNSPECIFIED",
          "ANALYTICS",
          "ANALYTICS_V2",
        ]).describe(
          "Specifies the output schema type. Schema type is required.",
        ).optional(),
      }).describe(
        "Optional. The configuration for the exported BigQuery schema.",
      ).optional(),
      writeDisposition: z.enum([
        "WRITE_DISPOSITION_UNSPECIFIED",
        "WRITE_EMPTY",
        "WRITE_TRUNCATE",
        "WRITE_APPEND",
      ]).describe(
        "Optional. Determines if existing data in the destination dataset is overwritten, appended to, or not written if the tables contain data. If a write_disposition is specified, the `force` parameter is ignored.",
      ).optional(),
    }).describe(
      'Optional. The destination BigQuery structure that contains both the dataset location and corresponding schema config. The output is organized in one table per resource type. The server reuses the existing tables (if any) that are named after the resource types. For example, "Patient", "Observation". When there is no existing table for a given resource type, the server attempts to create one. When a table schema doesn\'t align with the schema config, either because of existing incompatible schema or out of band incompatible modification, the server does not stream in new data. BigQuery imposes a 1 MB limit on streaming insert row size, therefore any resource mutation that generates more than 1 MB of BigQuery data is not streamed. One resolution in this case is to delete the incompatible table and let the server recreate one, though the newly created table only contains data after the table recreation. Results are written to BigQuery tables according to the parameters in BigQueryDestination.WriteDisposition. Different versions of the same resource are distinguishable by the meta.versionId and meta.lastUpdated columns. The operation (CREATE/UPDATE/DELETE) that results in the new version is recorded in the meta.tag. The tables contain all historical resource versions since streaming was enabled. For query convenience, the server also creates one view per table of the same name containing only the current resource version. The streamed data in the BigQuery dataset is not guaranteed to be completely unique. The combination of the id and meta.versionId columns should ideally identify a single unique row. But in rare cases, duplicates may exist. At query time, users may use the SQL select statement to keep only one of the duplicate rows given an id and meta.versionId pair. Alternatively, the server created view mentioned above also filters out duplicates. If a resource mutation cannot be streamed to BigQuery, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).',
    ).optional(),
    deidentifiedStoreDestination: z.object({
      config: z.object({
        dicom: z.object({
          filterProfile: z.unknown().describe(
            "Tag filtering profile that determines which tags to keep/remove.",
          ).optional(),
          keepList: z.unknown().describe(
            "List of tags to keep. Remove all other tags.",
          ).optional(),
          removeList: z.unknown().describe(
            "List of tags to remove. Keep all other tags.",
          ).optional(),
          skipIdRedaction: z.unknown().describe(
            "Optional. If true, skip replacing StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, and MediaStorageSOPInstanceUID and leave them untouched. The Cloud Healthcare API regenerates these UIDs by default based on the DICOM Standard's reasoning: \"Whilst these UIDs cannot be mapped directly to an individual out of context, given access to the original images, or to a database of the original images containing the UIDs, it would be possible to recover the individual's identity.\" https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.3.9.html",
          ).optional(),
        }).describe("Optional. Configures de-id of application/DICOM content.")
          .optional(),
        fhir: z.object({
          defaultKeepExtensions: z.unknown().describe(
            "Optional. The behaviour for handling FHIR extensions that aren't otherwise specified for de-identification. If true, all extensions are preserved during de-identification by default. If false or unspecified, all extensions are removed during de-identification by default.",
          ).optional(),
          fieldMetadataList: z.unknown().describe(
            "Optional. Specifies FHIR paths to match and how to transform them. Any field that is not matched by a FieldMetadata is passed through to the output dataset unmodified. All extensions will be processed according to `default_keep_extensions`.",
          ).optional(),
        }).describe("Optional. Configures de-id of application/FHIR content.")
          .optional(),
        image: z.object({
          textRedactionMode: z.unknown().describe(
            "Optional. Determines how to redact text from image.",
          ).optional(),
        }).describe(
          "Optional. Configures de-identification of image pixels wherever they are found in the source_dataset.",
        ).optional(),
        text: z.object({
          additionalTransformations: z.unknown().describe(
            "Optional. Transformations to apply to the detected data, overridden by `exclude_info_types`.",
          ).optional(),
          excludeInfoTypes: z.unknown().describe(
            "Optional. InfoTypes to skip transforming, overriding `additional_transformations`.",
          ).optional(),
          transformations: z.unknown().describe(
            "Optional. The transformations to apply to the detected data. Deprecated. Use `additional_transformations` instead.",
          ).optional(),
        }).describe(
          "Optional. Configures de-identification of text wherever it is found in the source_dataset.",
        ).optional(),
        useRegionalDataProcessing: z.boolean().describe(
          "Optional. Ensures in-flight data remains in the region of origin during de-identification. The default value is false. Using this option results in a significant reduction of throughput, and is not compatible with `LOCATION` or `ORGANIZATION_NAME` infoTypes. `LOCATION` must be excluded within TextConfig, and must also be excluded within ImageConfig if image redaction is required.",
        ).optional(),
      }).describe(
        "Optional. The configuration to use when de-identifying resources that are added to this store.",
      ).optional(),
      store: z.string().describe(
        "Optional. The full resource name of a Cloud Healthcare FHIR store, for example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.",
      ).optional(),
    }).describe(
      "The destination FHIR store for de-identified resources. After this field is added, all subsequent creates/updates/patches to the source store will be de-identified using the provided configuration and applied to the destination store. Resources deleted from the source store will be deleted from the destination store. Importing resources to the source store will not trigger the streaming. If the source store already contains resources when this option is enabled, those resources will not be copied to the destination store unless they are subsequently updated. This may result in invalid references in the destination store. Before adding this config, you must grant the healthcare.fhirResources.update permission on the destination store to your project's **Cloud Healthcare Service Agent** [service account](https://cloud.google.com/healthcare/docs/how-tos/permissions-healthcare-api-gcp-products#the_cloud_healthcare_service_agent). The destination store must set enable_update_create to true. The destination store must have disable_referential_integrity set to true. If a resource cannot be de-identified, errors will be logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Not supported for R5 stores.",
    ).optional(),
    resourceTypes: z.array(z.string()).describe(
      'Optional. Supply a FHIR resource type (such as "Patient" or "Observation"). See https://www.hl7.org/fhir/valueset-resource-types.html for a list of all FHIR resource types. The server treats an empty list as an intent to stream all the supported resource types in this FHIR store.',
    ).optional(),
  })).describe(
    "Optional. A list of streaming configs that configure the destinations of streaming export for every resource mutation in this FHIR store. Each store is allowed to have up to 10 streaming configs. After a new config is added, the next resource mutation is streamed to the new location in addition to the existing ones. When a location is removed from the list, the server stops streaming to that location. Before adding a new config, you must add the required [`bigquery.dataEditor`](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor) role to your project's **Cloud Healthcare Service Agent** [service account](https://cloud.google.com/iam/docs/service-accounts). Some lag (typically on the order of dozens of seconds) is expected before the results show up in the streaming destination.",
  ).optional(),
  validationConfig: z.object({
    disableFhirpathValidation: z.boolean().describe(
      "Optional. Whether to disable FHIRPath validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against FHIRPath requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced.",
    ).optional(),
    disableProfileValidation: z.boolean().describe(
      "Optional. Whether to disable profile validation for this FHIR store. The default value is false. Set this to true to disable checking incoming resources for conformance against structure definitions in this FHIR store.",
    ).optional(),
    disableReferenceTypeValidation: z.boolean().describe(
      "Optional. Whether to disable reference type validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against reference type requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced.",
    ).optional(),
    disableRequiredFieldValidation: z.boolean().describe(
      "Optional. Whether to disable required fields validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against required fields requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced.",
    ).optional(),
    enableFhirpathProfileValidation: z.boolean().describe(
      "Optional. Whether to enable FHIRPath validation for incoming resource types that have profiles configured for them in the `enabled_implementation_guides` list. Set this to true to enable checking incoming resources for conformance against FHIRPath requirements defined in the configured profiles.",
    ).optional(),
    enabledImplementationGuides: z.array(z.string()).describe(
      'Optional. A list of implementation guide URLs in this FHIR store that are used to configure the profiles to use for validation. For example, to use the US Core profiles for validation, set `enabled_implementation_guides` to `["http://hl7.org/fhir/us/core/ImplementationGuide/ig"]`. If `enabled_implementation_guides` is empty or omitted, then incoming resources are only required to conform to the base FHIR profiles. Otherwise, a resource must conform to at least one profile listed in the `global` property of one of the enabled ImplementationGuides. The Cloud Healthcare API does not currently enforce all of the rules in a StructureDefinition. The following rules are supported: - min/max - minValue/maxValue - maxLength - type - fixed[x] - pattern[x] on simple types - slicing, when using "value" as the discriminator type - FHIRPath constraints (only when `enable_fhirpath_profile_validation` is true) When a URL cannot be resolved (for example, in a type assertion), the server does not return an error.',
    ).optional(),
  }).describe(
    "Optional. Configuration for how to validate incoming FHIR resources against configured profiles.",
  ).optional(),
  version: z.enum(["VERSION_UNSPECIFIED", "DSTU2", "STU3", "R4", "R5"])
    .describe(
      "Required. Immutable. The FHIR specification version that this FHIR store supports natively. This field is immutable after store creation. Requests are rejected if they contain FHIR resources of a different version. Version is required for every FHIR store.",
    ).optional(),
  fhirStoreId: z.string().describe(
    "Required. The ID of the FHIR store that is being created. The string must match the following regex: `[\\p{L}\\p{N}_\\-\\.]{1,256}`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bulkExportGcsDestination: z.object({
    uriPrefix: z.string(),
  }).optional(),
  complexDataTypeReferenceParsing: z.string().optional(),
  consentConfig: z.object({
    accessDeterminationLogConfig: z.object({
      logLevel: z.string(),
    }),
    accessEnforced: z.boolean(),
    consentHeaderHandling: z.object({
      profile: z.string(),
    }),
    enforcedAdminConsents: z.array(z.string()),
    version: z.string(),
  }).optional(),
  defaultSearchHandlingStrict: z.boolean().optional(),
  disableReferentialIntegrity: z.boolean().optional(),
  disableResourceVersioning: z.boolean().optional(),
  enableUpdateCreate: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  notificationConfig: z.object({
    pubsubTopic: z.string(),
    sendForBulkImport: z.boolean(),
  }).optional(),
  notificationConfigs: z.array(z.object({
    pubsubTopic: z.string(),
    sendFullResource: z.boolean(),
    sendPreviousResourceOnDelete: z.boolean(),
  })).optional(),
  streamConfigs: z.array(z.object({
    bigqueryDestination: z.object({
      datasetUri: z.string(),
      force: z.boolean(),
      schemaConfig: z.object({
        lastUpdatedPartitionConfig: z.object({
          expirationMs: z.unknown(),
          type: z.unknown(),
        }),
        recursiveStructureDepth: z.string(),
        schemaType: z.string(),
      }),
      writeDisposition: z.string(),
    }),
    deidentifiedStoreDestination: z.object({
      config: z.object({
        dicom: z.object({
          filterProfile: z.unknown(),
          keepList: z.unknown(),
          removeList: z.unknown(),
          skipIdRedaction: z.unknown(),
        }),
        fhir: z.object({
          defaultKeepExtensions: z.unknown(),
          fieldMetadataList: z.unknown(),
        }),
        image: z.object({
          textRedactionMode: z.unknown(),
        }),
        text: z.object({
          additionalTransformations: z.unknown(),
          excludeInfoTypes: z.unknown(),
          transformations: z.unknown(),
        }),
        useRegionalDataProcessing: z.boolean(),
      }),
      store: z.string(),
    }),
    resourceTypes: z.array(z.string()),
  })).optional(),
  validationConfig: z.object({
    disableFhirpathValidation: z.boolean(),
    disableProfileValidation: z.boolean(),
    disableReferenceTypeValidation: z.boolean(),
    disableRequiredFieldValidation: z.boolean(),
    enableFhirpathProfileValidation: z.boolean(),
    enabledImplementationGuides: z.array(z.string()),
  }).optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  bulkExportGcsDestination: z.object({
    uriPrefix: z.string().describe(
      "Optional. URI for a Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`.",
    ).optional(),
  }).describe(
    "Optional. FHIR bulk export exports resources to the specified Cloud Storage destination. A Cloud Storage destination is a URI for a Cloud Storage directory where result files will be written. Only used in the spec-defined bulk $export methods. The Cloud Healthcare Service Agent requires the `roles/storage.objectAdmin` Cloud IAM role on the destination.",
  ).optional(),
  complexDataTypeReferenceParsing: z.enum([
    "COMPLEX_DATA_TYPE_REFERENCE_PARSING_UNSPECIFIED",
    "DISABLED",
    "ENABLED",
  ]).describe(
    "Optional. Enable parsing of references within complex FHIR data types such as Extensions. If this value is set to ENABLED, then features like referential integrity and Bundle reference rewriting apply to all references. If this flag has not been specified the behavior of the FHIR store will not change, references in complex data types will not be parsed. New stores will have this value set to ENABLED after a notification period. Warning: turning on this flag causes processing existing resources to fail if they contain references to non-existent resources. Cannot be disabled in R5.",
  ).optional(),
  consentConfig: z.object({
    accessDeterminationLogConfig: z.object({
      logLevel: z.enum([
        "LOG_LEVEL_UNSPECIFIED",
        "DISABLED",
        "MINIMUM",
        "VERBOSE",
      ]).describe(
        "Optional. Controls the amount of detail to include as part of the audit logs.",
      ).optional(),
    }).describe(
      "Optional. Specifies how the server logs the consent-aware requests. If not specified, the `AccessDeterminationLogConfig.LogLevel.MINIMUM` option is used.",
    ).optional(),
    accessEnforced: z.boolean().describe(
      "Optional. The default value is false. If set to true, when accessing FHIR resources, the consent headers will be verified against consents given by patients. See the ConsentEnforcementVersion for the supported consent headers.",
    ).optional(),
    consentHeaderHandling: z.object({
      profile: z.enum([
        "SCOPE_PROFILE_UNSPECIFIED",
        "PERMIT_EMPTY_SCOPE",
        "REQUIRED_ON_READ",
      ]).describe(
        "Optional. Specifies the default server behavior when the header is empty. If not specified, the `ScopeProfile.PERMIT_EMPTY_SCOPE` option is used.",
      ).optional(),
    }).describe(
      "Optional. Different options to configure the behaviour of the server when handling the `X-Consent-Scope` header.",
    ).optional(),
    enforcedAdminConsents: z.array(z.string()).describe(
      "Output only. The versioned names of the enforced admin Consent resource(s), in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. This field can only be updated using ApplyAdminConsents.",
    ).optional(),
    version: z.enum(["CONSENT_ENFORCEMENT_VERSION_UNSPECIFIED", "V1"]).describe(
      "Required. Specifies which consent enforcement version is being used for this FHIR store. This field can only be set once by either CreateFhirStore or UpdateFhirStore. After that, you must call ApplyConsents to change the version.",
    ).optional(),
  }).describe(
    "Optional. Specifies whether this store has consent enforcement. Not available for DSTU2 FHIR version due to absence of Consent resources. Not supported for R5 FHIR version.",
  ).optional(),
  defaultSearchHandlingStrict: z.boolean().describe(
    "Optional. If true, overrides the default search behavior for this FHIR store to `handling=strict` which returns an error for unrecognized search parameters. If false, uses the FHIR specification default `handling=lenient` which ignores unrecognized search parameters. The handling can always be changed from the default on an individual API call by setting the HTTP header `Prefer: handling=strict` or `Prefer: handling=lenient`. Defaults to false.",
  ).optional(),
  disableReferentialIntegrity: z.boolean().describe(
    "Immutable. Whether to disable referential integrity in this FHIR store. This field is immutable after FHIR store creation. The default value is false, meaning that the API enforces referential integrity and fails the requests that result in inconsistent state in the FHIR store. When this field is set to true, the API skips referential integrity checks. Consequently, operations that rely on references, such as GetPatientEverything, do not return all the results if broken references exist.",
  ).optional(),
  disableResourceVersioning: z.boolean().describe(
    "Immutable. Whether to disable resource versioning for this FHIR store. This field can not be changed after the creation of FHIR store. If set to false, all write operations cause historical versions to be recorded automatically. The historical versions can be fetched through the history APIs, but cannot be updated. If set to true, no historical versions are kept. The server sends errors for attempts to read the historical versions. Defaults to false.",
  ).optional(),
  enableUpdateCreate: z.boolean().describe(
    "Optional. Whether this FHIR store has the [updateCreate capability](https://www.hl7.org/fhir/capabilitystatement-definitions.html#CapabilityStatement.rest.resource.updateCreate). This determines if the client can use an Update operation to create a new resource with a client-specified ID. If false, all IDs are server-assigned through the Create operation and attempts to update a non-existent resource return errors. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud audit logs and Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. Defaults to false.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize FHIR stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  notificationConfig: z.object({
    pubsubTopic: z.string().describe(
      "The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. PubsubMessage.Data contains the resource name. PubsubMessage.MessageId is the ID of this message. It is guaranteed to be unique within the topic. PubsubMessage.PublishTime is the time at which the message was published. Notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. Cloud Healthcare API service account must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). If the number of errors exceeds a certain rate, some aren't submitted. Note that not all operations trigger notifications, see [Configuring Pub/Sub notifications](https://cloud.google.com/healthcare/docs/how-tos/pubsub) for specific details.",
    ).optional(),
    sendForBulkImport: z.boolean().describe(
      "Indicates whether or not to send Pub/Sub notifications on bulk import. Only supported for DICOM imports.",
    ).optional(),
  }).describe(
    'Deprecated. Use `notification_configs` instead. If non-empty, publish all resource modifications of this FHIR store to this destination. The Pub/Sub message attributes contain a map with a string describing the action that has triggered the notification. For example, "action":"CreateResource". Not supported in R5. Use `notification_configs` instead.',
  ).optional(),
  notificationConfigs: z.array(z.object({
    pubsubTopic: z.string().describe(
      "Optional. The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail (https://cloud.google.com/healthcare-api/docs/permissions-healthcare-api-gcp-products#dicom_fhir_and_hl7v2_store_cloud_pubsub_permissions). If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare-api/docs/how-tos/logging).",
    ).optional(),
    sendFullResource: z.boolean().describe(
      "Optional. Whether to send full FHIR resource to this Pub/Sub topic. The default value is false.",
    ).optional(),
    sendPreviousResourceOnDelete: z.boolean().describe(
      'Optional. Whether to send full FHIR resource to this Pub/Sub topic for deleting FHIR resource. The default value is false. Note that setting this to true does not guarantee that all previous resources will be sent in the format of full FHIR resource. When a resource change is too large or during heavy traffic, only the resource name will be sent. Clients should always check the "payloadType" label from a Pub/Sub message to determine whether it needs to fetch the full previous resource as a separate operation.',
    ).optional(),
  })).describe(
    "Optional. Specifies where and whether to send notifications upon changes to a FHIR store.",
  ).optional(),
  streamConfigs: z.array(z.object({
    bigqueryDestination: z.object({
      datasetUri: z.string().describe(
        "Optional. BigQuery URI to an existing dataset, up to 2000 characters long, in the format `bq://projectId.bqDatasetId`.",
      ).optional(),
      force: z.boolean().describe(
        "Optional. The default value is false. If this flag is `TRUE`, all tables are deleted from the dataset before the new exported tables are written. If the flag is not set and the destination dataset contains tables, the export call returns an error. If `write_disposition` is specified, this parameter is ignored. force=false is equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to write_disposition=WRITE_TRUNCATE.",
      ).optional(),
      schemaConfig: z.object({
        lastUpdatedPartitionConfig: z.object({
          expirationMs: z.unknown().describe(
            "Number of milliseconds for which to keep the storage for a partition.",
          ).optional(),
          type: z.unknown().describe("Type of partitioning.").optional(),
        }).describe(
          "The configuration for exported BigQuery tables to be partitioned by FHIR resource's last updated time column.",
        ).optional(),
        recursiveStructureDepth: z.string().describe(
          "The depth for all recursive structures in the output analytics schema. For example, `concept` in the CodeSystem resource is a recursive structure; when the depth is 2, the CodeSystem table will have a column called `concept.concept` but not `concept.concept.concept`. If not specified or set to 0, the server will use the default value 2. The maximum depth allowed is 5.",
        ).optional(),
        schemaType: z.enum([
          "SCHEMA_TYPE_UNSPECIFIED",
          "ANALYTICS",
          "ANALYTICS_V2",
        ]).describe(
          "Specifies the output schema type. Schema type is required.",
        ).optional(),
      }).describe(
        "Optional. The configuration for the exported BigQuery schema.",
      ).optional(),
      writeDisposition: z.enum([
        "WRITE_DISPOSITION_UNSPECIFIED",
        "WRITE_EMPTY",
        "WRITE_TRUNCATE",
        "WRITE_APPEND",
      ]).describe(
        "Optional. Determines if existing data in the destination dataset is overwritten, appended to, or not written if the tables contain data. If a write_disposition is specified, the `force` parameter is ignored.",
      ).optional(),
    }).describe(
      'Optional. The destination BigQuery structure that contains both the dataset location and corresponding schema config. The output is organized in one table per resource type. The server reuses the existing tables (if any) that are named after the resource types. For example, "Patient", "Observation". When there is no existing table for a given resource type, the server attempts to create one. When a table schema doesn\'t align with the schema config, either because of existing incompatible schema or out of band incompatible modification, the server does not stream in new data. BigQuery imposes a 1 MB limit on streaming insert row size, therefore any resource mutation that generates more than 1 MB of BigQuery data is not streamed. One resolution in this case is to delete the incompatible table and let the server recreate one, though the newly created table only contains data after the table recreation. Results are written to BigQuery tables according to the parameters in BigQueryDestination.WriteDisposition. Different versions of the same resource are distinguishable by the meta.versionId and meta.lastUpdated columns. The operation (CREATE/UPDATE/DELETE) that results in the new version is recorded in the meta.tag. The tables contain all historical resource versions since streaming was enabled. For query convenience, the server also creates one view per table of the same name containing only the current resource version. The streamed data in the BigQuery dataset is not guaranteed to be completely unique. The combination of the id and meta.versionId columns should ideally identify a single unique row. But in rare cases, duplicates may exist. At query time, users may use the SQL select statement to keep only one of the duplicate rows given an id and meta.versionId pair. Alternatively, the server created view mentioned above also filters out duplicates. If a resource mutation cannot be streamed to BigQuery, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).',
    ).optional(),
    deidentifiedStoreDestination: z.object({
      config: z.object({
        dicom: z.object({
          filterProfile: z.unknown().describe(
            "Tag filtering profile that determines which tags to keep/remove.",
          ).optional(),
          keepList: z.unknown().describe(
            "List of tags to keep. Remove all other tags.",
          ).optional(),
          removeList: z.unknown().describe(
            "List of tags to remove. Keep all other tags.",
          ).optional(),
          skipIdRedaction: z.unknown().describe(
            "Optional. If true, skip replacing StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, and MediaStorageSOPInstanceUID and leave them untouched. The Cloud Healthcare API regenerates these UIDs by default based on the DICOM Standard's reasoning: \"Whilst these UIDs cannot be mapped directly to an individual out of context, given access to the original images, or to a database of the original images containing the UIDs, it would be possible to recover the individual's identity.\" https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.3.9.html",
          ).optional(),
        }).describe("Optional. Configures de-id of application/DICOM content.")
          .optional(),
        fhir: z.object({
          defaultKeepExtensions: z.unknown().describe(
            "Optional. The behaviour for handling FHIR extensions that aren't otherwise specified for de-identification. If true, all extensions are preserved during de-identification by default. If false or unspecified, all extensions are removed during de-identification by default.",
          ).optional(),
          fieldMetadataList: z.unknown().describe(
            "Optional. Specifies FHIR paths to match and how to transform them. Any field that is not matched by a FieldMetadata is passed through to the output dataset unmodified. All extensions will be processed according to `default_keep_extensions`.",
          ).optional(),
        }).describe("Optional. Configures de-id of application/FHIR content.")
          .optional(),
        image: z.object({
          textRedactionMode: z.unknown().describe(
            "Optional. Determines how to redact text from image.",
          ).optional(),
        }).describe(
          "Optional. Configures de-identification of image pixels wherever they are found in the source_dataset.",
        ).optional(),
        text: z.object({
          additionalTransformations: z.unknown().describe(
            "Optional. Transformations to apply to the detected data, overridden by `exclude_info_types`.",
          ).optional(),
          excludeInfoTypes: z.unknown().describe(
            "Optional. InfoTypes to skip transforming, overriding `additional_transformations`.",
          ).optional(),
          transformations: z.unknown().describe(
            "Optional. The transformations to apply to the detected data. Deprecated. Use `additional_transformations` instead.",
          ).optional(),
        }).describe(
          "Optional. Configures de-identification of text wherever it is found in the source_dataset.",
        ).optional(),
        useRegionalDataProcessing: z.boolean().describe(
          "Optional. Ensures in-flight data remains in the region of origin during de-identification. The default value is false. Using this option results in a significant reduction of throughput, and is not compatible with `LOCATION` or `ORGANIZATION_NAME` infoTypes. `LOCATION` must be excluded within TextConfig, and must also be excluded within ImageConfig if image redaction is required.",
        ).optional(),
      }).describe(
        "Optional. The configuration to use when de-identifying resources that are added to this store.",
      ).optional(),
      store: z.string().describe(
        "Optional. The full resource name of a Cloud Healthcare FHIR store, for example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.",
      ).optional(),
    }).describe(
      "The destination FHIR store for de-identified resources. After this field is added, all subsequent creates/updates/patches to the source store will be de-identified using the provided configuration and applied to the destination store. Resources deleted from the source store will be deleted from the destination store. Importing resources to the source store will not trigger the streaming. If the source store already contains resources when this option is enabled, those resources will not be copied to the destination store unless they are subsequently updated. This may result in invalid references in the destination store. Before adding this config, you must grant the healthcare.fhirResources.update permission on the destination store to your project's **Cloud Healthcare Service Agent** [service account](https://cloud.google.com/healthcare/docs/how-tos/permissions-healthcare-api-gcp-products#the_cloud_healthcare_service_agent). The destination store must set enable_update_create to true. The destination store must have disable_referential_integrity set to true. If a resource cannot be de-identified, errors will be logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Not supported for R5 stores.",
    ).optional(),
    resourceTypes: z.array(z.string()).describe(
      'Optional. Supply a FHIR resource type (such as "Patient" or "Observation"). See https://www.hl7.org/fhir/valueset-resource-types.html for a list of all FHIR resource types. The server treats an empty list as an intent to stream all the supported resource types in this FHIR store.',
    ).optional(),
  })).describe(
    "Optional. A list of streaming configs that configure the destinations of streaming export for every resource mutation in this FHIR store. Each store is allowed to have up to 10 streaming configs. After a new config is added, the next resource mutation is streamed to the new location in addition to the existing ones. When a location is removed from the list, the server stops streaming to that location. Before adding a new config, you must add the required [`bigquery.dataEditor`](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor) role to your project's **Cloud Healthcare Service Agent** [service account](https://cloud.google.com/iam/docs/service-accounts). Some lag (typically on the order of dozens of seconds) is expected before the results show up in the streaming destination.",
  ).optional(),
  validationConfig: z.object({
    disableFhirpathValidation: z.boolean().describe(
      "Optional. Whether to disable FHIRPath validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against FHIRPath requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced.",
    ).optional(),
    disableProfileValidation: z.boolean().describe(
      "Optional. Whether to disable profile validation for this FHIR store. The default value is false. Set this to true to disable checking incoming resources for conformance against structure definitions in this FHIR store.",
    ).optional(),
    disableReferenceTypeValidation: z.boolean().describe(
      "Optional. Whether to disable reference type validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against reference type requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced.",
    ).optional(),
    disableRequiredFieldValidation: z.boolean().describe(
      "Optional. Whether to disable required fields validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against required fields requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced.",
    ).optional(),
    enableFhirpathProfileValidation: z.boolean().describe(
      "Optional. Whether to enable FHIRPath validation for incoming resource types that have profiles configured for them in the `enabled_implementation_guides` list. Set this to true to enable checking incoming resources for conformance against FHIRPath requirements defined in the configured profiles.",
    ).optional(),
    enabledImplementationGuides: z.array(z.string()).describe(
      'Optional. A list of implementation guide URLs in this FHIR store that are used to configure the profiles to use for validation. For example, to use the US Core profiles for validation, set `enabled_implementation_guides` to `["http://hl7.org/fhir/us/core/ImplementationGuide/ig"]`. If `enabled_implementation_guides` is empty or omitted, then incoming resources are only required to conform to the base FHIR profiles. Otherwise, a resource must conform to at least one profile listed in the `global` property of one of the enabled ImplementationGuides. The Cloud Healthcare API does not currently enforce all of the rules in a StructureDefinition. The following rules are supported: - min/max - minValue/maxValue - maxLength - type - fixed[x] - pattern[x] on simple types - slicing, when using "value" as the discriminator type - FHIRPath constraints (only when `enable_fhirpath_profile_validation` is true) When a URL cannot be resolved (for example, in a type assertion), the server does not return an error.',
    ).optional(),
  }).describe(
    "Optional. Configuration for how to validate incoming FHIR resources against configured profiles.",
  ).optional(),
  version: z.enum(["VERSION_UNSPECIFIED", "DSTU2", "STU3", "R4", "R5"])
    .describe(
      "Required. Immutable. The FHIR specification version that this FHIR store supports natively. This field is immutable after store creation. Requests are rejected if they contain FHIR resources of a different version. Version is required for every FHIR store.",
    ).optional(),
  fhirStoreId: z.string().describe(
    "Required. The ID of the FHIR store that is being created. The string must match the following regex: `[\\p{L}\\p{N}_\\-\\.]{1,256}`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Healthcare Datasets.FhirStores. Registered at `@swamp/gcp/healthcare/datasets-fhirstores`. */
export const model = {
  type: "@swamp/gcp/healthcare/datasets-fhirstores",
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
      toVersion: "2026.05.15.1",
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
      description: "Added: parent",
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
      toVersion: "2026.08.22.1",
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
        "Removed: uriPrefix, accessDeterminationLogConfig, logLevel, accessEnforced, consentHeaderHandling, profile, enforcedAdminConsents, pubsubTopic, sendForBulkImport, pubsubTopic, sendFullResource, sendPreviousResourceOnDelete, bigqueryDestination, datasetUri, force, schemaConfig, lastUpdatedPartitionConfig, expirationMs, type, recursiveStructureDepth, schemaType, writeDisposition, deidentifiedStoreDestination, config, dicom, filterProfile, keepList, removeList, skipIdRedaction, fhir, defaultKeepExtensions, fieldMetadataList, image, textRedactionMode, text, additionalTransformations, excludeInfoTypes, transformations, useRegionalDataProcessing, store, resourceTypes, disableFhirpathValidation, disableProfileValidation, disableReferenceTypeValidation, disableRequiredFieldValidation, enableFhirpathProfileValidation, enabledImplementationGuides",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          uriPrefix: _uriPrefix,
          accessDeterminationLogConfig: _accessDeterminationLogConfig,
          logLevel: _logLevel,
          accessEnforced: _accessEnforced,
          consentHeaderHandling: _consentHeaderHandling,
          profile: _profile,
          enforcedAdminConsents: _enforcedAdminConsents,
          pubsubTopic: _pubsubTopic,
          sendForBulkImport: _sendForBulkImport,
          sendFullResource: _sendFullResource,
          sendPreviousResourceOnDelete: _sendPreviousResourceOnDelete,
          bigqueryDestination: _bigqueryDestination,
          datasetUri: _datasetUri,
          force: _force,
          schemaConfig: _schemaConfig,
          lastUpdatedPartitionConfig: _lastUpdatedPartitionConfig,
          expirationMs: _expirationMs,
          type: _type,
          recursiveStructureDepth: _recursiveStructureDepth,
          schemaType: _schemaType,
          writeDisposition: _writeDisposition,
          deidentifiedStoreDestination: _deidentifiedStoreDestination,
          config: _config,
          dicom: _dicom,
          filterProfile: _filterProfile,
          keepList: _keepList,
          removeList: _removeList,
          skipIdRedaction: _skipIdRedaction,
          fhir: _fhir,
          defaultKeepExtensions: _defaultKeepExtensions,
          fieldMetadataList: _fieldMetadataList,
          image: _image,
          textRedactionMode: _textRedactionMode,
          text: _text,
          additionalTransformations: _additionalTransformations,
          excludeInfoTypes: _excludeInfoTypes,
          transformations: _transformations,
          useRegionalDataProcessing: _useRegionalDataProcessing,
          store: _store,
          resourceTypes: _resourceTypes,
          disableFhirpathValidation: _disableFhirpathValidation,
          disableProfileValidation: _disableProfileValidation,
          disableReferenceTypeValidation: _disableReferenceTypeValidation,
          disableRequiredFieldValidation: _disableRequiredFieldValidation,
          enableFhirpathProfileValidation: _enableFhirpathProfileValidation,
          enabledImplementationGuides: _enabledImplementationGuides,
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
      description: "Represents a FHIR store.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a fhirStores",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["bulkExportGcsDestination"] !== undefined) {
          body["bulkExportGcsDestination"] = g["bulkExportGcsDestination"];
        }
        if (g["complexDataTypeReferenceParsing"] !== undefined) {
          body["complexDataTypeReferenceParsing"] =
            g["complexDataTypeReferenceParsing"];
        }
        if (g["consentConfig"] !== undefined) {
          body["consentConfig"] = g["consentConfig"];
        }
        if (g["defaultSearchHandlingStrict"] !== undefined) {
          body["defaultSearchHandlingStrict"] =
            g["defaultSearchHandlingStrict"];
        }
        if (g["disableReferentialIntegrity"] !== undefined) {
          body["disableReferentialIntegrity"] =
            g["disableReferentialIntegrity"];
        }
        if (g["disableResourceVersioning"] !== undefined) {
          body["disableResourceVersioning"] = g["disableResourceVersioning"];
        }
        if (g["enableUpdateCreate"] !== undefined) {
          body["enableUpdateCreate"] = g["enableUpdateCreate"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["notificationConfigs"] !== undefined) {
          body["notificationConfigs"] = g["notificationConfigs"];
        }
        if (g["streamConfigs"] !== undefined) {
          body["streamConfigs"] = g["streamConfigs"];
        }
        if (g["validationConfig"] !== undefined) {
          body["validationConfig"] = g["validationConfig"];
        }
        if (g["version"] !== undefined) body["version"] = g["version"];
        if (g["fhirStoreId"] !== undefined) {
          params["fhirStoreId"] = String(g["fhirStoreId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
          undefined,
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
      description: "Get a fhirStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the fhirStores"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
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
      description: "Update fhirStores attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific fhirStores by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["bulkExportGcsDestination"] !== undefined) {
          body["bulkExportGcsDestination"] = g["bulkExportGcsDestination"];
        }
        if (g["complexDataTypeReferenceParsing"] !== undefined) {
          body["complexDataTypeReferenceParsing"] =
            g["complexDataTypeReferenceParsing"];
        }
        if (g["consentConfig"] !== undefined) {
          body["consentConfig"] = g["consentConfig"];
        }
        if (g["defaultSearchHandlingStrict"] !== undefined) {
          body["defaultSearchHandlingStrict"] =
            g["defaultSearchHandlingStrict"];
        }
        if (g["enableUpdateCreate"] !== undefined) {
          body["enableUpdateCreate"] = g["enableUpdateCreate"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["notificationConfigs"] !== undefined) {
          body["notificationConfigs"] = g["notificationConfigs"];
        }
        if (g["streamConfigs"] !== undefined) {
          body["streamConfigs"] = g["streamConfigs"];
        }
        if (g["validationConfig"] !== undefined) {
          body["validationConfig"] = g["validationConfig"];
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
      description: "Delete the fhirStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the fhirStores"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync fhirStores state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific fhirStores by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
      description: "List fhirStores resources",
      arguments: z.object({
        filter: z.string().describe(
          'Restricts stores returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it\'s just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. Only filtering on labels is supported, for example `labels.key=value`.',
        ).optional(),
        pageSize: z.number().describe(
          "Limit on the number of FHIR stores to return in a single response. If not specified, 100 is used. May not be larger than 1000.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "fhirStores",
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
    apply_admin_consents: {
      description: "apply admin consents",
      arguments: z.object({
        newConsentsList: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["newConsentsList"] !== undefined) {
          body["newConsentsList"] = args["newConsentsList"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.applyAdminConsents",
            "path": "v1/{+name}:applyAdminConsents",
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
    apply_consents: {
      description: "apply consents",
      arguments: z.object({
        patientScope: z.any().optional(),
        timeRange: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["patientScope"] !== undefined) {
          body["patientScope"] = args["patientScope"];
        }
        if (args["timeRange"] !== undefined) {
          body["timeRange"] = args["timeRange"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.applyConsents",
            "path": "v1/{+name}:applyConsents",
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
    bulk_export_group: {
      description: "bulk-export-group",
      arguments: z.object({
        _since: z.any().optional(),
        _type: z.any().optional(),
        organizeOutputBy: z.any().optional(),
        outputFormat: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        if (args["_since"] !== undefined) {
          params["_since"] = String(args["_since"]);
        }
        if (args["_type"] !== undefined) {
          params["_type"] = String(args["_type"]);
        }
        if (args["organizeOutputBy"] !== undefined) {
          params["organizeOutputBy"] = String(args["organizeOutputBy"]);
        }
        if (args["outputFormat"] !== undefined) {
          params["outputFormat"] = String(args["outputFormat"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.bulk-export-group",
            "path": "v1/{+name}/$export",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "_since": { "location": "query" },
              "_type": { "location": "query" },
              "name": { "location": "path", "required": true },
              "organizeOutputBy": { "location": "query" },
              "outputFormat": { "location": "query" },
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
    bulk_delete: {
      description: "bulk delete",
      arguments: z.object({
        gcsDestination: z.any().optional(),
        gcsSource: z.any().optional(),
        type: z.any().optional(),
        until: z.any().optional(),
        validateOnly: z.any().optional(),
        versionConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        if (args["until"] !== undefined) body["until"] = args["until"];
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["versionConfig"] !== undefined) {
          body["versionConfig"] = args["versionConfig"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.bulkDelete",
            "path": "v1/{+name}:bulkDelete",
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
    deidentify: {
      description: "deidentify",
      arguments: z.object({
        config: z.any().optional(),
        destinationStore: z.any().optional(),
        gcsConfigUri: z.any().optional(),
        resourceFilter: z.any().optional(),
        skipModifiedResources: z.any().optional(),
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
        params["sourceStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["config"] !== undefined) body["config"] = args["config"];
        if (args["destinationStore"] !== undefined) {
          body["destinationStore"] = args["destinationStore"];
        }
        if (args["gcsConfigUri"] !== undefined) {
          body["gcsConfigUri"] = args["gcsConfigUri"];
        }
        if (args["resourceFilter"] !== undefined) {
          body["resourceFilter"] = args["resourceFilter"];
        }
        if (args["skipModifiedResources"] !== undefined) {
          body["skipModifiedResources"] = args["skipModifiedResources"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.deidentify",
            "path": "v1/{+sourceStore}:deidentify",
            "httpMethod": "POST",
            "parameterOrder": ["sourceStore"],
            "parameters": {
              "sourceStore": { "location": "path", "required": true },
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
    explain_data_access: {
      description: "explain data access",
      arguments: z.object({
        resourceId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        if (args["resourceId"] !== undefined) {
          params["resourceId"] = String(args["resourceId"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.explainDataAccess",
            "path": "v1/{+name}:explainDataAccess",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "resourceId": { "location": "query" },
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
    export: {
      description: "export",
      arguments: z.object({
        _since: z.any().optional(),
        _type: z.any().optional(),
        bigqueryDestination: z.any().optional(),
        gcsDestination: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["_since"] !== undefined) body["_since"] = args["_since"];
        if (args["_type"] !== undefined) body["_type"] = args["_type"];
        if (args["bigqueryDestination"] !== undefined) {
          body["bigqueryDestination"] = args["bigqueryDestination"];
        }
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "healthcare.projects.locations.datasets.fhirStores.export",
            "path": "v1/{+name}:export",
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
    get_fhirstore_metrics: {
      description: "get fhirstore metrics",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "healthcare.projects.locations.datasets.fhirStores.getFHIRStoreMetrics",
            "path": "v1/{+name}:getFHIRStoreMetrics",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
            "id":
              "healthcare.projects.locations.datasets.fhirStores.getIamPolicy",
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
    import: {
      description: "import",
      arguments: z.object({
        contentStructure: z.any().optional(),
        gcsSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["contentStructure"] !== undefined) {
          body["contentStructure"] = args["contentStructure"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "healthcare.projects.locations.datasets.fhirStores.import",
            "path": "v1/{+name}:import",
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
    rollback: {
      description: "rollback",
      arguments: z.object({
        changeType: z.any().optional(),
        excludeRollbacks: z.any().optional(),
        filteringFields: z.any().optional(),
        force: z.any().optional(),
        inputGcsObject: z.any().optional(),
        resultGcsBucket: z.any().optional(),
        rollbackTime: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["changeType"] !== undefined) {
          body["changeType"] = args["changeType"];
        }
        if (args["excludeRollbacks"] !== undefined) {
          body["excludeRollbacks"] = args["excludeRollbacks"];
        }
        if (args["filteringFields"] !== undefined) {
          body["filteringFields"] = args["filteringFields"];
        }
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["inputGcsObject"] !== undefined) {
          body["inputGcsObject"] = args["inputGcsObject"];
        }
        if (args["resultGcsBucket"] !== undefined) {
          body["resultGcsBucket"] = args["resultGcsBucket"];
        }
        if (args["rollbackTime"] !== undefined) {
          body["rollbackTime"] = args["rollbackTime"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          baseUrl,
          {
            "id": "healthcare.projects.locations.datasets.fhirStores.rollback",
            "path": "v1/{+name}:rollback",
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
            "id":
              "healthcare.projects.locations.datasets.fhirStores.setIamPolicy",
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
            "id":
              "healthcare.projects.locations.datasets.fhirStores.testIamPermissions",
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
