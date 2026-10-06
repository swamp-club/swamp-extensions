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

// Auto-generated extension model for @swamp/gcp/bigquery/datasets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Datasets.
 *
 * Represents a BigQuery dataset.
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

const BASE_URL = "https://bigquery.googleapis.com/bigquery/v2/";

const GET_CONFIG = {
  "id": "bigquery.datasets.get",
  "path": "projects/{+projectId}/datasets/{+datasetId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "datasetId",
  ],
  "parameters": {
    "accessPolicyVersion": {
      "location": "query",
    },
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "datasetView": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "bigquery.datasets.insert",
  "path": "projects/{+projectId}/datasets",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "accessPolicyVersion": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "bigquery.datasets.update",
  "path": "projects/{+projectId}/datasets/{+datasetId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "projectId",
    "datasetId",
  ],
  "parameters": {
    "accessPolicyVersion": {
      "location": "query",
    },
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "updateMode": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigquery.datasets.delete",
  "path": "projects/{+projectId}/datasets/{+datasetId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "datasetId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "deleteContents": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "bigquery.datasets.list",
  "path": "projects/{+projectId}/datasets",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "all": {
      "location": "query",
    },
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
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
  access: z.array(z.object({
    condition: z.object({
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
      "Optional. condition for the binding. If CEL expression in this field is true, this access binding will be considered",
    ).optional(),
    dataset: z.object({
      dataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("The dataset this entry applies to").optional(),
      targetTypes: z.array(
        z.enum(["TARGET_TYPE_UNSPECIFIED", "VIEWS", "ROUTINES"]),
      ).describe(
        "Which resources in the dataset this entry applies to. Currently, only views are supported, but additional target types may be added in the future.",
      ).optional(),
    }).describe(
      "[Pick one] A grant authorizing all resources of a particular type in a particular dataset access to this dataset. Only views are supported for now. The role field is not required when this field is set. If that dataset is deleted and re-created, its access needs to be granted again via an update operation.",
    ).optional(),
    domain: z.string().describe(
      '[Pick one] A domain to grant access to. Any users signed in with the domain specified will be granted the specified access. Example: "example.com". Maps to IAM policy member "domain:DOMAIN".',
    ).optional(),
    groupByEmail: z.string().describe(
      '[Pick one] An email address of a Google Group to grant access to. Maps to IAM policy member "group:GROUP".',
    ).optional(),
    iamMember: z.string().describe(
      "[Pick one] Some other type of member that appears in the IAM Policy but isn't a user, group, domain, or special group.",
    ).optional(),
    role: z.string().describe(
      'An IAM role ID that should be granted to the user, group, or domain specified in this access entry. The following legacy mappings will be applied: * `OWNER`: `roles/bigquery.dataOwner` * `WRITER`: `roles/bigquery.dataEditor` * `READER`: `roles/bigquery.dataViewer` This field will accept any of the above formats, but will return only the legacy format. For example, if you set this field to "roles/bigquery.dataOwner", it will be returned back as "OWNER".',
    ).optional(),
    routine: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this routine.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this routine.",
      ).optional(),
      routineId: z.string().describe(
        "Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
      ).optional(),
    }).describe(
      "[Pick one] A routine from a different dataset to grant access to. Queries executed against that routine will have read access to views/tables/routines in this dataset. Only UDF is supported for now. The role field is not required when this field is set. If that routine is updated by any user, access to the routine needs to be granted again via an update operation.",
    ).optional(),
    specialGroup: z.string().describe(
      "[Pick one] A special group to grant access to. Possible values include: * projectOwners: Owners of the enclosing project. * projectReaders: Readers of the enclosing project. * projectWriters: Writers of the enclosing project. * allAuthenticatedUsers: All authenticated BigQuery users. Maps to similarly-named IAM members.",
    ).optional(),
    userByEmail: z.string().describe(
      '[Pick one] An email address of a user to grant access to. For example: fred@example.com. Maps to IAM policy member "user:EMAIL" or "serviceAccount:EMAIL".',
    ).optional(),
    view: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).describe(
      "[Pick one] A view from a different dataset to grant access to. Queries executed against that view will have read access to views/tables/routines in this dataset. The role field is not required when this field is set. If that view is updated by any user, access to the view needs to be granted again via an update operation.",
    ).optional(),
  })).describe(
    "Optional. An array of objects that define dataset access for one or more entities. You can set this property when inserting or updating a dataset in order to control who is allowed to access the data. If unspecified at dataset creation time, BigQuery adds default dataset access for the following entities: access.specialGroup: projectReaders; access.role: READER; access.specialGroup: projectWriters; access.role: WRITER; access.specialGroup: projectOwners; access.role: OWNER; access.userByEmail: [dataset creator email]; access.role: OWNER; If you patch a dataset, then this field is overwritten by the patched dataset's access field. To add entities, you must supply the entire existing access array in addition to any new entities that you want to add.",
  ).optional(),
  datasetReference: z.object({
    datasetId: z.string().describe(
      "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
    ).optional(),
    projectId: z.string().describe(
      "Optional. The ID of the project containing this dataset.",
    ).optional(),
  }).describe("Required. A reference that identifies the dataset.").optional(),
  defaultCollation: z.string().describe(
    "Optional. Defines the default collation specification of future tables created in the dataset. If a table is created in this dataset without table-level default collation, then the table inherits the dataset default collation, which is applied to the string fields that do not have explicit collation specified. A change to this field affects only tables created afterwards, and does not alter the existing tables. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
  ).optional(),
  defaultEncryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
    ).optional(),
  }).describe(
    "The default encryption key for all tables in the dataset. After this property is set, the encryption key of all newly-created tables in the dataset is set to this value unless the table creation request or query explicitly overrides the key.",
  ).optional(),
  defaultPartitionExpirationMs: z.string().describe(
    "This default partition expiration, expressed in milliseconds. When new time-partitioned tables are created in a dataset where this property is set, the table will inherit this value, propagated as the `TimePartitioning.expirationMs` property on the new table. If you set `TimePartitioning.expirationMs` explicitly when creating a table, the `defaultPartitionExpirationMs` of the containing dataset is ignored. When creating a partitioned table, if `defaultPartitionExpirationMs` is set, the `defaultTableExpirationMs` value is ignored and the table will not be inherit a table expiration deadline.",
  ).optional(),
  defaultRoundingMode: z.enum([
    "ROUNDING_MODE_UNSPECIFIED",
    "ROUND_HALF_AWAY_FROM_ZERO",
    "ROUND_HALF_EVEN",
  ]).describe(
    "Optional. Defines the default rounding mode specification of new tables created within this dataset. During table creation, if this field is specified, the table within this dataset will inherit the default rounding mode of the dataset. Setting the default rounding mode on a table overrides this option. Existing tables in the dataset are unaffected. If columns are defined during that table creation, they will immediately inherit the table's default rounding mode, unless otherwise specified.",
  ).optional(),
  defaultTableExpirationMs: z.string().describe(
    "Optional. The default lifetime of all tables in the dataset, in milliseconds. The minimum lifetime value is 3600000 milliseconds (one hour). To clear an existing default expiration with a PATCH request, set to 0. Once this property is set, all newly-created tables in the dataset will have an expirationTime property set to the creation time plus the value in this property, and changing the value will only affect new tables, not existing ones. When the expirationTime for a given table is reached, that table will be deleted automatically. If a table's expirationTime is modified or removed before the table expires, or if you provide an explicit expirationTime when creating a table, that value takes precedence over the default expiration time indicated by this property.",
  ).optional(),
  description: z.string().describe(
    "Optional. A user-friendly description of the dataset.",
  ).optional(),
  externalCatalogDatasetOptions: z.object({
    defaultStorageLocationUri: z.string().describe(
      "Optional. The storage location URI for all tables in the dataset. Equivalent to hive metastore's database locationUri. Maximum length of 1024 characters.",
    ).optional(),
    parameters: z.record(z.string(), z.string()).describe(
      "Optional. A map of key value pairs defining the parameters and properties of the open source schema. Maximum size of 2MiB.",
    ).optional(),
  }).describe(
    "Optional. Options defining open source compatible datasets living in the BigQuery catalog. Contains metadata of open source database, schema or namespace represented by the current dataset.",
  ).optional(),
  externalDatasetReference: z.object({
    connection: z.string().describe(
      "Required. The connection id that is used to access the external_source. Format: projects/{project_id}/locations/{location_id}/connections/{connection_id}",
    ).optional(),
    externalSource: z.string().describe(
      "Required. External source that backs this dataset.",
    ).optional(),
  }).describe(
    "Optional. Reference to a read-only external dataset defined in data catalogs outside of BigQuery. Filled out when the dataset type is EXTERNAL.",
  ).optional(),
  friendlyName: z.string().describe(
    "Optional. A descriptive name for the dataset.",
  ).optional(),
  isCaseInsensitive: z.boolean().describe(
    "Optional. TRUE if the dataset and its table names are case-insensitive, otherwise FALSE. By default, this is FALSE, which means the dataset and its table names are case-sensitive. This field does not affect routine references.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See [Creating and Updating Dataset Labels](https://cloud.google.com/bigquery/docs/creating-managing-labels#creating_and_updating_dataset_labels) for more information.",
  ).optional(),
  linkedDatasetSource: z.object({
    sourceDataset: z.object({
      datasetId: z.string().describe(
        "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
      ).optional(),
      projectId: z.string().describe(
        "Optional. The ID of the project containing this dataset.",
      ).optional(),
    }).describe(
      "The source dataset reference contains project numbers and not project ids.",
    ).optional(),
  }).describe(
    "Optional. The source dataset reference when the dataset is of type LINKED. For all other dataset types it is not set. This field cannot be updated once it is set. Any attempt to update this field using Update and Patch API Operations will be ignored.",
  ).optional(),
  location: z.string().describe(
    "The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations.",
  ).optional(),
  maxTimeTravelHours: z.string().describe(
    "Optional. Defines the time travel window in hours. The value can be from 48 to 168 hours (2 to 7 days). The default value is 168 hours if this is not set.",
  ).optional(),
  resourceTags: z.record(z.string(), z.string()).describe(
    'Optional. The [tags](https://cloud.google.com/bigquery/docs/tags) attached to this dataset. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/environment" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "Production". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details.',
  ).optional(),
  storageBillingModel: z.enum([
    "STORAGE_BILLING_MODEL_UNSPECIFIED",
    "LOGICAL",
    "PHYSICAL",
  ]).describe("Optional. Updates storage_billing_model for the dataset.")
    .optional(),
  accessPolicyVersion: z.string().describe(
    "Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, * Requests with conditional access policy binding in datasets must specify version 3. * But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM.",
  ).optional(),
  updateMode: z.string().describe(
    "Optional. Specifies the fields of dataset that update/patch operation is targeting By default, both metadata and ACL fields are updated.",
  ).optional(),
});

const StateSchema = z.object({
  access: z.array(z.object({
    condition: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
    dataset: z.object({
      dataset: z.object({
        datasetId: z.string(),
        projectId: z.string(),
      }),
      targetTypes: z.array(z.string()),
    }),
    domain: z.string(),
    groupByEmail: z.string(),
    iamMember: z.string(),
    role: z.string(),
    routine: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      routineId: z.string(),
    }),
    specialGroup: z.string(),
    userByEmail: z.string(),
    view: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
  })).optional(),
  catalogSource: z.string().optional(),
  creationTime: z.string().optional(),
  datasetReference: z.object({
    datasetId: z.string(),
    projectId: z.string(),
  }).optional(),
  defaultCollation: z.string().optional(),
  defaultEncryptionConfiguration: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  defaultPartitionExpirationMs: z.string().optional(),
  defaultRoundingMode: z.string().optional(),
  defaultTableExpirationMs: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  externalCatalogDatasetOptions: z.object({
    defaultStorageLocationUri: z.string(),
    parameters: z.record(z.string(), z.unknown()),
  }).optional(),
  externalDatasetReference: z.object({
    connection: z.string(),
    externalSource: z.string(),
  }).optional(),
  friendlyName: z.string().optional(),
  id: z.string().optional(),
  isCaseInsensitive: z.boolean().optional(),
  kind: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastModifiedTime: z.string().optional(),
  linkedDatasetMetadata: z.object({
    linkState: z.string(),
  }).optional(),
  linkedDatasetSource: z.object({
    sourceDataset: z.object({
      datasetId: z.string(),
      projectId: z.string(),
    }),
  }).optional(),
  location: z.string().optional(),
  maxTimeTravelHours: z.string().optional(),
  resourceTags: z.record(z.string(), z.unknown()).optional(),
  restrictions: z.object({
    type: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  selfLink: z.string().optional(),
  storageBillingModel: z.string().optional(),
  tags: z.array(z.object({
    tagKey: z.string(),
    tagValue: z.string(),
  })).optional(),
  type: z.string().optional(),
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
  access: z.array(z.object({
    condition: z.object({
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
      "Optional. condition for the binding. If CEL expression in this field is true, this access binding will be considered",
    ).optional(),
    dataset: z.object({
      dataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("The dataset this entry applies to").optional(),
      targetTypes: z.array(
        z.enum(["TARGET_TYPE_UNSPECIFIED", "VIEWS", "ROUTINES"]),
      ).describe(
        "Which resources in the dataset this entry applies to. Currently, only views are supported, but additional target types may be added in the future.",
      ).optional(),
    }).describe(
      "[Pick one] A grant authorizing all resources of a particular type in a particular dataset access to this dataset. Only views are supported for now. The role field is not required when this field is set. If that dataset is deleted and re-created, its access needs to be granted again via an update operation.",
    ).optional(),
    domain: z.string().describe(
      '[Pick one] A domain to grant access to. Any users signed in with the domain specified will be granted the specified access. Example: "example.com". Maps to IAM policy member "domain:DOMAIN".',
    ).optional(),
    groupByEmail: z.string().describe(
      '[Pick one] An email address of a Google Group to grant access to. Maps to IAM policy member "group:GROUP".',
    ).optional(),
    iamMember: z.string().describe(
      "[Pick one] Some other type of member that appears in the IAM Policy but isn't a user, group, domain, or special group.",
    ).optional(),
    role: z.string().describe(
      'An IAM role ID that should be granted to the user, group, or domain specified in this access entry. The following legacy mappings will be applied: * `OWNER`: `roles/bigquery.dataOwner` * `WRITER`: `roles/bigquery.dataEditor` * `READER`: `roles/bigquery.dataViewer` This field will accept any of the above formats, but will return only the legacy format. For example, if you set this field to "roles/bigquery.dataOwner", it will be returned back as "OWNER".',
    ).optional(),
    routine: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this routine.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this routine.",
      ).optional(),
      routineId: z.string().describe(
        "Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
      ).optional(),
    }).describe(
      "[Pick one] A routine from a different dataset to grant access to. Queries executed against that routine will have read access to views/tables/routines in this dataset. Only UDF is supported for now. The role field is not required when this field is set. If that routine is updated by any user, access to the routine needs to be granted again via an update operation.",
    ).optional(),
    specialGroup: z.string().describe(
      "[Pick one] A special group to grant access to. Possible values include: * projectOwners: Owners of the enclosing project. * projectReaders: Readers of the enclosing project. * projectWriters: Writers of the enclosing project. * allAuthenticatedUsers: All authenticated BigQuery users. Maps to similarly-named IAM members.",
    ).optional(),
    userByEmail: z.string().describe(
      '[Pick one] An email address of a user to grant access to. For example: fred@example.com. Maps to IAM policy member "user:EMAIL" or "serviceAccount:EMAIL".',
    ).optional(),
    view: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).describe(
      "[Pick one] A view from a different dataset to grant access to. Queries executed against that view will have read access to views/tables/routines in this dataset. The role field is not required when this field is set. If that view is updated by any user, access to the view needs to be granted again via an update operation.",
    ).optional(),
  })).describe(
    "Optional. An array of objects that define dataset access for one or more entities. You can set this property when inserting or updating a dataset in order to control who is allowed to access the data. If unspecified at dataset creation time, BigQuery adds default dataset access for the following entities: access.specialGroup: projectReaders; access.role: READER; access.specialGroup: projectWriters; access.role: WRITER; access.specialGroup: projectOwners; access.role: OWNER; access.userByEmail: [dataset creator email]; access.role: OWNER; If you patch a dataset, then this field is overwritten by the patched dataset's access field. To add entities, you must supply the entire existing access array in addition to any new entities that you want to add.",
  ).optional(),
  datasetReference: z.object({
    datasetId: z.string().describe(
      "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
    ).optional(),
    projectId: z.string().describe(
      "Optional. The ID of the project containing this dataset.",
    ).optional(),
  }).describe("Required. A reference that identifies the dataset.").optional(),
  defaultCollation: z.string().describe(
    "Optional. Defines the default collation specification of future tables created in the dataset. If a table is created in this dataset without table-level default collation, then the table inherits the dataset default collation, which is applied to the string fields that do not have explicit collation specified. A change to this field affects only tables created afterwards, and does not alter the existing tables. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
  ).optional(),
  defaultEncryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
    ).optional(),
  }).describe(
    "The default encryption key for all tables in the dataset. After this property is set, the encryption key of all newly-created tables in the dataset is set to this value unless the table creation request or query explicitly overrides the key.",
  ).optional(),
  defaultPartitionExpirationMs: z.string().describe(
    "This default partition expiration, expressed in milliseconds. When new time-partitioned tables are created in a dataset where this property is set, the table will inherit this value, propagated as the `TimePartitioning.expirationMs` property on the new table. If you set `TimePartitioning.expirationMs` explicitly when creating a table, the `defaultPartitionExpirationMs` of the containing dataset is ignored. When creating a partitioned table, if `defaultPartitionExpirationMs` is set, the `defaultTableExpirationMs` value is ignored and the table will not be inherit a table expiration deadline.",
  ).optional(),
  defaultRoundingMode: z.enum([
    "ROUNDING_MODE_UNSPECIFIED",
    "ROUND_HALF_AWAY_FROM_ZERO",
    "ROUND_HALF_EVEN",
  ]).describe(
    "Optional. Defines the default rounding mode specification of new tables created within this dataset. During table creation, if this field is specified, the table within this dataset will inherit the default rounding mode of the dataset. Setting the default rounding mode on a table overrides this option. Existing tables in the dataset are unaffected. If columns are defined during that table creation, they will immediately inherit the table's default rounding mode, unless otherwise specified.",
  ).optional(),
  defaultTableExpirationMs: z.string().describe(
    "Optional. The default lifetime of all tables in the dataset, in milliseconds. The minimum lifetime value is 3600000 milliseconds (one hour). To clear an existing default expiration with a PATCH request, set to 0. Once this property is set, all newly-created tables in the dataset will have an expirationTime property set to the creation time plus the value in this property, and changing the value will only affect new tables, not existing ones. When the expirationTime for a given table is reached, that table will be deleted automatically. If a table's expirationTime is modified or removed before the table expires, or if you provide an explicit expirationTime when creating a table, that value takes precedence over the default expiration time indicated by this property.",
  ).optional(),
  description: z.string().describe(
    "Optional. A user-friendly description of the dataset.",
  ).optional(),
  externalCatalogDatasetOptions: z.object({
    defaultStorageLocationUri: z.string().describe(
      "Optional. The storage location URI for all tables in the dataset. Equivalent to hive metastore's database locationUri. Maximum length of 1024 characters.",
    ).optional(),
    parameters: z.record(z.string(), z.string()).describe(
      "Optional. A map of key value pairs defining the parameters and properties of the open source schema. Maximum size of 2MiB.",
    ).optional(),
  }).describe(
    "Optional. Options defining open source compatible datasets living in the BigQuery catalog. Contains metadata of open source database, schema or namespace represented by the current dataset.",
  ).optional(),
  externalDatasetReference: z.object({
    connection: z.string().describe(
      "Required. The connection id that is used to access the external_source. Format: projects/{project_id}/locations/{location_id}/connections/{connection_id}",
    ).optional(),
    externalSource: z.string().describe(
      "Required. External source that backs this dataset.",
    ).optional(),
  }).describe(
    "Optional. Reference to a read-only external dataset defined in data catalogs outside of BigQuery. Filled out when the dataset type is EXTERNAL.",
  ).optional(),
  friendlyName: z.string().describe(
    "Optional. A descriptive name for the dataset.",
  ).optional(),
  isCaseInsensitive: z.boolean().describe(
    "Optional. TRUE if the dataset and its table names are case-insensitive, otherwise FALSE. By default, this is FALSE, which means the dataset and its table names are case-sensitive. This field does not affect routine references.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See [Creating and Updating Dataset Labels](https://cloud.google.com/bigquery/docs/creating-managing-labels#creating_and_updating_dataset_labels) for more information.",
  ).optional(),
  linkedDatasetSource: z.object({
    sourceDataset: z.object({
      datasetId: z.string().describe(
        "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
      ).optional(),
      projectId: z.string().describe(
        "Optional. The ID of the project containing this dataset.",
      ).optional(),
    }).describe(
      "The source dataset reference contains project numbers and not project ids.",
    ).optional(),
  }).describe(
    "Optional. The source dataset reference when the dataset is of type LINKED. For all other dataset types it is not set. This field cannot be updated once it is set. Any attempt to update this field using Update and Patch API Operations will be ignored.",
  ).optional(),
  location: z.string().describe(
    "The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations.",
  ).optional(),
  maxTimeTravelHours: z.string().describe(
    "Optional. Defines the time travel window in hours. The value can be from 48 to 168 hours (2 to 7 days). The default value is 168 hours if this is not set.",
  ).optional(),
  resourceTags: z.record(z.string(), z.string()).describe(
    'Optional. The [tags](https://cloud.google.com/bigquery/docs/tags) attached to this dataset. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/environment" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "Production". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details.',
  ).optional(),
  storageBillingModel: z.enum([
    "STORAGE_BILLING_MODEL_UNSPECIFIED",
    "LOGICAL",
    "PHYSICAL",
  ]).describe("Optional. Updates storage_billing_model for the dataset.")
    .optional(),
  accessPolicyVersion: z.string().describe(
    "Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, * Requests with conditional access policy binding in datasets must specify version 3. * But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM.",
  ).optional(),
  updateMode: z.string().describe(
    "Optional. Specifies the fields of dataset that update/patch operation is targeting By default, both metadata and ACL fields are updated.",
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

/** Swamp extension model for Google Cloud BigQuery Datasets. Registered at `@swamp/gcp/bigquery/datasets`. */
export const model = {
  type: "@swamp/gcp/bigquery/datasets",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.25.2",
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
      toVersion: "2026.07.21.1",
      description: "Removed: linkedDatasetMetadata, restrictions",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          linkedDatasetMetadata: _linkedDatasetMetadata,
          restrictions: _restrictions,
          ...rest
        } = old;
        return rest;
      },
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
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: updateMode",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a BigQuery dataset.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a datasets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { projectId: projectId };
        const body: Record<string, unknown> = {};
        if (g["access"] !== undefined) body["access"] = g["access"];
        if (g["datasetReference"] !== undefined) {
          body["datasetReference"] = g["datasetReference"];
        }
        if (g["defaultCollation"] !== undefined) {
          body["defaultCollation"] = g["defaultCollation"];
        }
        if (g["defaultEncryptionConfiguration"] !== undefined) {
          body["defaultEncryptionConfiguration"] =
            g["defaultEncryptionConfiguration"];
        }
        if (g["defaultPartitionExpirationMs"] !== undefined) {
          body["defaultPartitionExpirationMs"] =
            g["defaultPartitionExpirationMs"];
        }
        if (g["defaultRoundingMode"] !== undefined) {
          body["defaultRoundingMode"] = g["defaultRoundingMode"];
        }
        if (g["defaultTableExpirationMs"] !== undefined) {
          body["defaultTableExpirationMs"] = g["defaultTableExpirationMs"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["externalCatalogDatasetOptions"] !== undefined) {
          body["externalCatalogDatasetOptions"] =
            g["externalCatalogDatasetOptions"];
        }
        if (g["externalDatasetReference"] !== undefined) {
          body["externalDatasetReference"] = g["externalDatasetReference"];
        }
        if (g["friendlyName"] !== undefined) {
          body["friendlyName"] = g["friendlyName"];
        }
        if (g["isCaseInsensitive"] !== undefined) {
          body["isCaseInsensitive"] = g["isCaseInsensitive"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["linkedDatasetSource"] !== undefined) {
          body["linkedDatasetSource"] = g["linkedDatasetSource"];
        }
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["maxTimeTravelHours"] !== undefined) {
          body["maxTimeTravelHours"] = g["maxTimeTravelHours"];
        }
        if (g["resourceTags"] !== undefined) {
          body["resourceTags"] = g["resourceTags"];
        }
        if (g["storageBillingModel"] !== undefined) {
          body["storageBillingModel"] = g["storageBillingModel"];
        }
        if (g["accessPolicyVersion"] !== undefined) {
          params["accessPolicyVersion"] = String(g["accessPolicyVersion"]);
        }
        if (g["name"] !== undefined) params["datasetId"] = String(g["name"]);
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
      description: "Get a datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { projectId: projectId };
        params["datasetId"] = args.identifier;
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
      description: "Update datasets attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific datasets by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { projectId: projectId };
        const resourceId =
          existing["datasetReference"]?.["datasetId"]?.toString() ??
            g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["datasetId"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["datasetReference"] !== undefined) {
          body["datasetReference"] = g["datasetReference"];
        }
        if (g["defaultCollation"] !== undefined) {
          body["defaultCollation"] = g["defaultCollation"];
        }
        if (g["defaultEncryptionConfiguration"] !== undefined) {
          body["defaultEncryptionConfiguration"] =
            g["defaultEncryptionConfiguration"];
        }
        if (g["defaultPartitionExpirationMs"] !== undefined) {
          body["defaultPartitionExpirationMs"] =
            g["defaultPartitionExpirationMs"];
        }
        if (g["defaultRoundingMode"] !== undefined) {
          body["defaultRoundingMode"] = g["defaultRoundingMode"];
        }
        if (g["defaultTableExpirationMs"] !== undefined) {
          body["defaultTableExpirationMs"] = g["defaultTableExpirationMs"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["externalCatalogDatasetOptions"] !== undefined) {
          body["externalCatalogDatasetOptions"] =
            g["externalCatalogDatasetOptions"];
        }
        if (g["externalDatasetReference"] !== undefined) {
          body["externalDatasetReference"] = g["externalDatasetReference"];
        }
        if (g["friendlyName"] !== undefined) {
          body["friendlyName"] = g["friendlyName"];
        }
        if (g["isCaseInsensitive"] !== undefined) {
          body["isCaseInsensitive"] = g["isCaseInsensitive"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["maxTimeTravelHours"] !== undefined) {
          body["maxTimeTravelHours"] = g["maxTimeTravelHours"];
        }
        if (g["resourceTags"] !== undefined) {
          body["resourceTags"] = g["resourceTags"];
        }
        if (g["storageBillingModel"] !== undefined) {
          body["storageBillingModel"] = g["storageBillingModel"];
        }
        if (g["updateMode"] !== undefined) {
          params["updateMode"] = String(g["updateMode"]);
        } else if (existing["updateMode"] !== undefined) {
          params["updateMode"] = String(existing["updateMode"]);
        }
        let live: Record<string, unknown> | undefined;
        const unset = [
          "datasetReference",
          "defaultCollation",
          "defaultEncryptionConfiguration",
          "defaultPartitionExpirationMs",
          "defaultRoundingMode",
          "defaultTableExpirationMs",
          "description",
          "externalCatalogDatasetOptions",
          "friendlyName",
          "isCaseInsensitive",
          "labels",
          "location",
          "maxTimeTravelHours",
          "resourceTags",
          "storageBillingModel",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
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
      description: "Delete the datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { projectId: projectId };
        params["datasetId"] = args.identifier;
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
      description: "Sync datasets state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific datasets by name (e.g. one discovered by list)",
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
          const params: Record<string, string> = { projectId: projectId };
          const identifier =
            existing["datasetReference"]?.["datasetId"]?.toString() ??
              g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["datasetId"] = identifier;
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
      description: "List datasets resources",
      arguments: z.object({
        all: z.boolean().describe(
          "Whether to list all datasets, including hidden ones",
        ).optional(),
        filter: z.string().describe(
          "An expression for filtering the results of the request by label. The syntax is `labels.[:]`. Multiple filters can be AND-ed together by connecting with a space. Example: `labels.department:receiving labels.active`. See [Filtering datasets using labels](https://cloud.google.com/bigquery/docs/filtering-labels#filtering_datasets_using_labels) for details.",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection.",
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
        const params: Record<string, string> = { projectId: projectId };
        if (args["all"] !== undefined) params["all"] = String(args["all"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "datasets",
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
    undelete: {
      description: "undelete",
      arguments: z.object({
        deletionTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { projectId: projectId };
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
        params["datasetId"] =
          existing["datasetReference"]?.["datasetId"]?.toString() ??
            g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deletionTime"] !== undefined) {
          body["deletionTime"] = args["deletionTime"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "bigquery.datasets.undelete",
            "path": "projects/{+projectId}/datasets/{+datasetId}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "datasetId"],
            "parameters": {
              "datasetId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
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
