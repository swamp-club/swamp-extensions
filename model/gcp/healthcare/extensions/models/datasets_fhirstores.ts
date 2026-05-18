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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  bulkExportGcsDestination: z.object({
    uriPrefix: z.string().describe(
      "Optional. URI for a Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`.",
    ).optional(),
  }).describe(
    "The configuration for exporting to Cloud Storage using the bulk export API.",
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
      "Configures consent audit log config for FHIR create, read, update, and delete (CRUD) operations. Cloud audit log for healthcare API must be [enabled](https://cloud.google.com/logging/docs/audit/configure-data-access#config-console-enable). The consent-related logs are included as part of `protoPayload.metadata`.",
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
    }).describe("How the server handles the consent header.").optional(),
    enforcedAdminConsents: z.array(z.string()).describe(
      "Output only. The versioned names of the enforced admin Consent resource(s), in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. This field can only be updated using ApplyAdminConsents.",
    ).optional(),
    version: z.enum(["CONSENT_ENFORCEMENT_VERSION_UNSPECIFIED", "V1"]).describe(
      "Required. Specifies which consent enforcement version is being used for this FHIR store. This field can only be set once by either CreateFhirStore or UpdateFhirStore. After that, you must call ApplyConsents to change the version.",
    ).optional(),
  }).describe(
    "Configures whether to enforce consent for the FHIR store and which consent enforcement version is being used.",
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
    "Specifies where to send notifications upon changes to a data store.",
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
        }).describe("Configuration for FHIR BigQuery time-partitioned tables.")
          .optional(),
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
        "Configuration for the FHIR BigQuery schema. Determines how the server generates the schema.",
      ).optional(),
      writeDisposition: z.enum([
        "WRITE_DISPOSITION_UNSPECIFIED",
        "WRITE_EMPTY",
        "WRITE_TRUNCATE",
        "WRITE_APPEND",
      ]).describe(
        "Optional. Determines if existing data in the destination dataset is overwritten, appended to, or not written if the tables contain data. If a write_disposition is specified, the `force` parameter is ignored.",
      ).optional(),
    }).describe("The configuration for exporting to BigQuery.").optional(),
    deidentifiedStoreDestination: z.object({
      config: z.object({
        dicom: z.object({
          filterProfile: z.unknown().describe(
            "Tag filtering profile that determines which tags to keep/remove.",
          ).optional(),
          keepList: z.unknown().describe("List of tags to be filtered.")
            .optional(),
          removeList: z.unknown().describe("List of tags to be filtered.")
            .optional(),
          skipIdRedaction: z.unknown().describe(
            "Optional. If true, skip replacing StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, and MediaStorageSOPInstanceUID and leave them untouched. The Cloud Healthcare API regenerates these UIDs by default based on the DICOM Standard's reasoning: \"Whilst these UIDs cannot be mapped directly to an individual out of context, given access to the original images, or to a database of the original images containing the UIDs, it would be possible to recover the individual's identity.\" https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.3.9.html",
          ).optional(),
        }).describe(
          "Specifies the parameters needed for de-identification of DICOM stores.",
        ).optional(),
        fhir: z.object({
          defaultKeepExtensions: z.unknown().describe(
            "Optional. The behaviour for handling FHIR extensions that aren't otherwise specified for de-identification. If true, all extensions are preserved during de-identification by default. If false or unspecified, all extensions are removed during de-identification by default.",
          ).optional(),
          fieldMetadataList: z.unknown().describe(
            "Optional. Specifies FHIR paths to match and how to transform them. Any field that is not matched by a FieldMetadata is passed through to the output dataset unmodified. All extensions will be processed according to `default_keep_extensions`.",
          ).optional(),
        }).describe(
          "Specifies how to handle de-identification of a FHIR store.",
        ).optional(),
        image: z.object({
          textRedactionMode: z.unknown().describe(
            "Optional. Determines how to redact text from image.",
          ).optional(),
        }).describe(
          "Specifies how to handle de-identification of image pixels.",
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
        }).optional(),
        useRegionalDataProcessing: z.boolean().describe(
          "Optional. Ensures in-flight data remains in the region of origin during de-identification. The default value is false. Using this option results in a significant reduction of throughput, and is not compatible with `LOCATION` or `ORGANIZATION_NAME` infoTypes. `LOCATION` must be excluded within TextConfig, and must also be excluded within ImageConfig if image redaction is required.",
        ).optional(),
      }).describe(
        "Configures de-id options specific to different types of content. Each submessage customizes the handling of an https://tools.ietf.org/html/rfc6838 media type or subtype. Configs are applied in a nested manner at runtime.",
      ).optional(),
      store: z.string().describe(
        "Optional. The full resource name of a Cloud Healthcare FHIR store, for example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.",
      ).optional(),
    }).describe(
      "Contains configuration for streaming de-identified FHIR export.",
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
  }).describe("Contains the configuration for FHIR profiles and validation.")
    .optional(),
  version: z.enum(["VERSION_UNSPECIFIED", "DSTU2", "STU3", "R4", "R5"])
    .describe(
      "Required. Immutable. The FHIR specification version that this FHIR store supports natively. This field is immutable after store creation. Requests are rejected if they contain FHIR resources of a different version. Version is required for every FHIR store.",
    ).optional(),
  fhirStoreId: z.string().describe(
    "Required. The ID of the FHIR store that is being created. The string must match the following regex: `[\\p{L}\\p{N}_\\-\\.]{1,256}`.",
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
  bulkExportGcsDestination: z.object({
    uriPrefix: z.string().describe(
      "Optional. URI for a Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`.",
    ).optional(),
  }).describe(
    "The configuration for exporting to Cloud Storage using the bulk export API.",
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
      "Configures consent audit log config for FHIR create, read, update, and delete (CRUD) operations. Cloud audit log for healthcare API must be [enabled](https://cloud.google.com/logging/docs/audit/configure-data-access#config-console-enable). The consent-related logs are included as part of `protoPayload.metadata`.",
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
    }).describe("How the server handles the consent header.").optional(),
    enforcedAdminConsents: z.array(z.string()).describe(
      "Output only. The versioned names of the enforced admin Consent resource(s), in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. This field can only be updated using ApplyAdminConsents.",
    ).optional(),
    version: z.enum(["CONSENT_ENFORCEMENT_VERSION_UNSPECIFIED", "V1"]).describe(
      "Required. Specifies which consent enforcement version is being used for this FHIR store. This field can only be set once by either CreateFhirStore or UpdateFhirStore. After that, you must call ApplyConsents to change the version.",
    ).optional(),
  }).describe(
    "Configures whether to enforce consent for the FHIR store and which consent enforcement version is being used.",
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
    "Specifies where to send notifications upon changes to a data store.",
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
        }).describe("Configuration for FHIR BigQuery time-partitioned tables.")
          .optional(),
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
        "Configuration for the FHIR BigQuery schema. Determines how the server generates the schema.",
      ).optional(),
      writeDisposition: z.enum([
        "WRITE_DISPOSITION_UNSPECIFIED",
        "WRITE_EMPTY",
        "WRITE_TRUNCATE",
        "WRITE_APPEND",
      ]).describe(
        "Optional. Determines if existing data in the destination dataset is overwritten, appended to, or not written if the tables contain data. If a write_disposition is specified, the `force` parameter is ignored.",
      ).optional(),
    }).describe("The configuration for exporting to BigQuery.").optional(),
    deidentifiedStoreDestination: z.object({
      config: z.object({
        dicom: z.object({
          filterProfile: z.unknown().describe(
            "Tag filtering profile that determines which tags to keep/remove.",
          ).optional(),
          keepList: z.unknown().describe("List of tags to be filtered.")
            .optional(),
          removeList: z.unknown().describe("List of tags to be filtered.")
            .optional(),
          skipIdRedaction: z.unknown().describe(
            "Optional. If true, skip replacing StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, and MediaStorageSOPInstanceUID and leave them untouched. The Cloud Healthcare API regenerates these UIDs by default based on the DICOM Standard's reasoning: \"Whilst these UIDs cannot be mapped directly to an individual out of context, given access to the original images, or to a database of the original images containing the UIDs, it would be possible to recover the individual's identity.\" https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.3.9.html",
          ).optional(),
        }).describe(
          "Specifies the parameters needed for de-identification of DICOM stores.",
        ).optional(),
        fhir: z.object({
          defaultKeepExtensions: z.unknown().describe(
            "Optional. The behaviour for handling FHIR extensions that aren't otherwise specified for de-identification. If true, all extensions are preserved during de-identification by default. If false or unspecified, all extensions are removed during de-identification by default.",
          ).optional(),
          fieldMetadataList: z.unknown().describe(
            "Optional. Specifies FHIR paths to match and how to transform them. Any field that is not matched by a FieldMetadata is passed through to the output dataset unmodified. All extensions will be processed according to `default_keep_extensions`.",
          ).optional(),
        }).describe(
          "Specifies how to handle de-identification of a FHIR store.",
        ).optional(),
        image: z.object({
          textRedactionMode: z.unknown().describe(
            "Optional. Determines how to redact text from image.",
          ).optional(),
        }).describe(
          "Specifies how to handle de-identification of image pixels.",
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
        }).optional(),
        useRegionalDataProcessing: z.boolean().describe(
          "Optional. Ensures in-flight data remains in the region of origin during de-identification. The default value is false. Using this option results in a significant reduction of throughput, and is not compatible with `LOCATION` or `ORGANIZATION_NAME` infoTypes. `LOCATION` must be excluded within TextConfig, and must also be excluded within ImageConfig if image redaction is required.",
        ).optional(),
      }).describe(
        "Configures de-id options specific to different types of content. Each submessage customizes the handling of an https://tools.ietf.org/html/rfc6838 media type or subtype. Configs are applied in a nested manner at runtime.",
      ).optional(),
      store: z.string().describe(
        "Optional. The full resource name of a Cloud Healthcare FHIR store, for example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.",
      ).optional(),
    }).describe(
      "Contains configuration for streaming de-identified FHIR export.",
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
  }).describe("Contains the configuration for FHIR profiles and validation.")
    .optional(),
  version: z.enum(["VERSION_UNSPECIFIED", "DSTU2", "STU3", "R4", "R5"])
    .describe(
      "Required. Immutable. The FHIR specification version that this FHIR store supports natively. This field is immutable after store creation. Requests are rejected if they contain FHIR resources of a different version. Version is required for every FHIR store.",
    ).optional(),
  fhirStoreId: z.string().describe(
    "Required. The ID of the FHIR store that is being created. The string must match the following regex: `[\\p{L}\\p{N}_\\-\\.]{1,256}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Healthcare Datasets.FhirStores. Registered at `@swamp/gcp/healthcare/datasets-fhirstores`. */
export const model = {
  type: "@swamp/gcp/healthcare/datasets-fhirstores",
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
      toVersion: "2026.05.15.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
          body["fhirStoreId"] = g["fhirStoreId"];
        }
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
      description: "Delete the fhirStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the fhirStores"),
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
      description: "Sync fhirStores state from GCP",
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
    apply_admin_consents: {
      description: "apply admin consents",
      arguments: z.object({
        newConsentsList: z.any().optional(),
        validateOnly: z.any().optional(),
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
        if (args["newConsentsList"] !== undefined) {
          body["newConsentsList"] = args["newConsentsList"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          BASE_URL,
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
        );
        return { result };
      },
    },
    bulk_export_group: {
      description: "bulk-export-group",
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
          {},
        );
        return { result };
      },
    },
    bulk_delete: {
      description: "bulk delete",
      arguments: z.object({
        gcsDestination: z.any().optional(),
        type: z.any().optional(),
        until: z.any().optional(),
        versionConfig: z.any().optional(),
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
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        if (args["until"] !== undefined) body["until"] = args["until"];
        if (args["versionConfig"] !== undefined) {
          body["versionConfig"] = args["versionConfig"];
        }
        const result = await createResource(
          BASE_URL,
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
          BASE_URL,
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
        );
        return { result };
      },
    },
    explain_data_access: {
      description: "explain data access",
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
          {},
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.fhirStores.export",
            "path": "v1/{+name}:export",
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
    get_fhirstore_metrics: {
      description: "get fhirstore metrics",
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
            "id":
              "healthcare.projects.locations.datasets.fhirStores.getFHIRStoreMetrics",
            "path": "v1/{+name}:getFHIRStoreMetrics",
            "httpMethod": "GET",
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
        contentStructure: z.any().optional(),
        gcsSource: z.any().optional(),
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
        if (args["contentStructure"] !== undefined) {
          body["contentStructure"] = args["contentStructure"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.fhirStores.import",
            "path": "v1/{+name}:import",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.fhirStores.rollback",
            "path": "v1/{+name}:rollback",
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
