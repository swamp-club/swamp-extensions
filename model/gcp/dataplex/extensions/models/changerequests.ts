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

// Auto-generated extension model for @swamp/gcp/dataplex/changerequests
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex ChangeRequests.
 *
 * Represents a proposed change to a metadata resource.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/changeRequests/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.changeRequests.get",
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
  "id": "dataplex.projects.locations.changeRequests.patch",
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
  "id": "dataplex.projects.locations.changeRequests.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dataplex.projects.locations.changeRequests.list",
  "path": "v1/{+parent}/changeRequests",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  approver: z.string().describe(
    "Output only. The email address of the user who approved/rejected the ChangeRequest.",
  ).optional(),
  author: z.string().describe(
    "Output only. The email address of the user who created the ChangeRequest.",
  ).optional(),
  batchChangeMetadataRequest: z.object({
    changes: z.array(z.object({
      createEntryLinkRequest: z.object({
        entryLink: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed.",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the Entry Link was created.",
          ).optional(),
          entryLinkType: z.unknown().describe(
            "Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition",
          ).optional(),
          entryReferences: z.unknown().describe(
            "Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references.",
          ).optional(),
          name: z.unknown().describe(
            "Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the Entry Link was last updated.",
          ).optional(),
        }).describe("Required. Entry Link resource.").optional(),
        entryLinkId: z.string().describe(
          "Required. Entry Link identifier * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the EntryGroup.",
        ).optional(),
        parent: z.string().describe(
          "Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}.",
        ).optional(),
      }).describe("Payload for creating an EntryLink.").optional(),
      createEntryRequest: z.object({
        entry: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the entry was created in Dataplex Universal Catalog.",
          ).optional(),
          entryGroupType: z.unknown().describe(
            "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
          ).optional(),
          entrySource: z.unknown().describe(
            "Optional. Information related to the source system of the data resource that is represented by the entry.",
          ).optional(),
          entryType: z.unknown().describe(
            "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
          ).optional(),
          fullyQualifiedName: z.unknown().describe(
            "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
          ).optional(),
          name: z.unknown().describe(
            "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          parentEntry: z.unknown().describe(
            "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
          ).optional(),
        }).describe("Required. Entry resource.").optional(),
        entryId: z.string().describe(
          "Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters.",
        ).optional(),
        parent: z.string().describe(
          "Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}.",
        ).optional(),
      }).describe("Payload for creating an Entry.").optional(),
      deleteEntryLinkRequest: z.object({
        name: z.string().describe(
          "Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}.",
        ).optional(),
      }).describe("Payload for deleting an EntryLink.").optional(),
      deleteEntryRequest: z.object({
        name: z.string().describe(
          "Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}.",
        ).optional(),
      }).describe("Payload for deleting an Entry.").optional(),
      updateEntryLinkRequest: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If set to true and the entry link doesn't exist, the service will create it.",
        ).optional(),
        aspectKeys: z.array(z.unknown()).describe(
          "Optional. The map keys of the Aspects which the service should modify. It should be the aspect type reference in the format {project_id_or_number}.{location_id}.{aspect_type_id}.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request.",
        ).optional(),
        entryLink: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed.",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the Entry Link was created.",
          ).optional(),
          entryLinkType: z.unknown().describe(
            "Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition",
          ).optional(),
          entryReferences: z.unknown().describe(
            "Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references.",
          ).optional(),
          name: z.unknown().describe(
            "Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the Entry Link was last updated.",
          ).optional(),
        }).describe("Required. Entry Link resource.").optional(),
      }).describe("Payload for updating an EntryLink.").optional(),
      updateEntryRequest: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If set to true and the entry doesn't exist, the service will create it.",
        ).optional(),
        aspectKeys: z.array(z.unknown()).describe(
          "Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @* - matches aspects of the given type for all paths. *@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request.",
        ).optional(),
        deleteMissingAspects: z.boolean().describe(
          "Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request.",
        ).optional(),
        entry: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the entry was created in Dataplex Universal Catalog.",
          ).optional(),
          entryGroupType: z.unknown().describe(
            "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
          ).optional(),
          entrySource: z.unknown().describe(
            "Optional. Information related to the source system of the data resource that is represented by the entry.",
          ).optional(),
          entryType: z.unknown().describe(
            "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
          ).optional(),
          fullyQualifiedName: z.unknown().describe(
            "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
          ).optional(),
          name: z.unknown().describe(
            "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          parentEntry: z.unknown().describe(
            "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
          ).optional(),
        }).describe("Required. Entry resource.").optional(),
        updateMask: z.string().describe(
          'Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request.',
        ).optional(),
      }).describe("Payload for updating an Entry.").optional(),
    })).describe(
      "Required. The list of changes to apply. Only a single change per resource is supported. Maximum number of changes supported is 250.",
    ).optional(),
    description: z.object({
      content: z.string().describe("Optional. The text description content.")
        .optional(),
      job: z.object({
        name: z.string().describe(
          "Optional. The name of the job that created the batch change. For example: projects/{project_number}/locations/{location_id}/enrichmentTasks/{enrichment_task_id}/runs/{enrichment_run_id}",
        ).optional(),
        runTime: z.string().describe(
          "Optional. The start time of the job run that created the batch change.",
        ).optional(),
      }).describe("Optional. The job that created the batch change.")
        .optional(),
    }).describe("Optional. Text description of the batch change.").optional(),
    name: z.string().describe(
      "Required. The resource name of the EntryGroup on which the batch change applies. Format: projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id}",
    ).optional(),
  }).describe("Payload for executing a batch of catalog changes.").optional(),
  batchChangeMetadataResponse: z.object({
    failedRequests: z.record(
      z.string(),
      z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }),
    ).describe(
      "A map of failed requests for a batch change, where the key is the 0-based index of the failed request in the batch and the value is the error status. If all operations succeeded, this map is empty.",
    ).optional(),
  }).describe(
    "Output only. Result of applying a batch change metadata request.",
  ).optional(),
  changeType: z.enum([
    "CHANGE_TYPE_UNSPECIFIED",
    "CREATE_ENTRY",
    "UPDATE_ENTRY",
    "DELETE_ENTRY",
    "CREATE_ENTRY_LINK",
    "DELETE_ENTRY_LINK",
    "CREATE_GLOSSARY",
    "UPDATE_GLOSSARY",
    "DELETE_GLOSSARY",
    "CREATE_GLOSSARY_CATEGORY",
    "UPDATE_GLOSSARY_CATEGORY",
    "DELETE_GLOSSARY_CATEGORY",
    "CREATE_GLOSSARY_TERM",
    "UPDATE_GLOSSARY_TERM",
    "DELETE_GLOSSARY_TERM",
    "REQUEST_DATA_PRODUCT_ACCESS",
    "BATCH_CHANGE_METADATA",
  ]).describe(
    "Output only. The type of change represented by the change_payload. This field is derived from the populated field in the change_payload oneof.",
  ).optional(),
  createEntry: z.object({
    entry: z.object({
      aspects: z.record(
        z.string(),
        z.object({
          aspectSource: z.object({
            createTime: z.unknown().describe(
              "The time the aspect was created in the source system.",
            ).optional(),
            dataVersion: z.unknown().describe(
              "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
            ).optional(),
            updateTime: z.unknown().describe(
              "The time the aspect was last updated in the source system.",
            ).optional(),
          }).describe(
            "Optional. Information related to the source system of the aspect.",
          ).optional(),
          aspectType: z.string().describe(
            "Output only. The resource name of the type used to create this Aspect.",
          ).optional(),
          createTime: z.string().describe(
            "Output only. The time when the Aspect was created.",
          ).optional(),
          data: z.record(z.string(), z.unknown()).describe(
            "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
          path: z.string().describe(
            "Output only. The path in the entry under which the aspect is attached.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. The time when the Aspect was last updated.",
          ).optional(),
        }),
      ).describe(
        "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the entry was created in Dataplex Universal Catalog.",
      ).optional(),
      entryGroupType: z.string().describe(
        "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
      ).optional(),
      entrySource: z.object({
        ancestors: z.array(z.object({
          name: z.unknown().describe(
            "Optional. The name of the ancestor resource.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. The type of the ancestor resource.",
          ).optional(),
        })).describe(
          "Immutable. The entries representing the ancestors of the data resource in the source system.",
        ).optional(),
        createTime: z.string().describe(
          "The time when the resource was created in the source system.",
        ).optional(),
        description: z.string().describe(
          "A description of the data resource. Maximum length is 2,000 characters.",
        ).optional(),
        displayName: z.string().describe(
          "A user-friendly display name. Maximum length is 500 characters.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "User-defined labels. The maximum size of keys and values is 128 characters each.",
        ).optional(),
        location: z.string().describe(
          "Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud.",
        ).optional(),
        platform: z.string().describe(
          "The platform containing the source system. Maximum length is 64 characters.",
        ).optional(),
        resource: z.string().describe(
          "The name of the resource in the source system. Maximum length is 4,000 characters.",
        ).optional(),
        system: z.string().describe(
          "The name of the source system. Maximum length is 64 characters.",
        ).optional(),
        updateTime: z.string().describe(
          "The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time.",
        ).optional(),
      }).describe(
        "Optional. Information related to the source system of the data resource that is represented by the entry.",
      ).optional(),
      entryType: z.string().describe(
        "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
      ).optional(),
      fullyQualifiedName: z.string().describe(
        "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      parentEntry: z.string().describe(
        "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
      ).optional(),
    }).describe("Required. Entry resource.").optional(),
    entryId: z.string().describe(
      "Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}.",
    ).optional(),
  }).describe("Payload for creating an Entry.").optional(),
  createEntryLink: z.object({
    entryLink: z.object({
      aspects: z.record(
        z.string(),
        z.object({
          aspectSource: z.object({
            createTime: z.unknown().describe(
              "The time the aspect was created in the source system.",
            ).optional(),
            dataVersion: z.unknown().describe(
              "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
            ).optional(),
            updateTime: z.unknown().describe(
              "The time the aspect was last updated in the source system.",
            ).optional(),
          }).describe(
            "Optional. Information related to the source system of the aspect.",
          ).optional(),
          aspectType: z.string().describe(
            "Output only. The resource name of the type used to create this Aspect.",
          ).optional(),
          createTime: z.string().describe(
            "Output only. The time when the Aspect was created.",
          ).optional(),
          data: z.record(z.string(), z.unknown()).describe(
            "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
          path: z.string().describe(
            "Output only. The path in the entry under which the aspect is attached.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. The time when the Aspect was last updated.",
          ).optional(),
        }),
      ).describe(
        "Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the Entry Link was created.",
      ).optional(),
      entryLinkType: z.string().describe(
        "Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition",
      ).optional(),
      entryReferences: z.array(z.object({
        name: z.string().describe(
          "Required. Immutable. The relative resource name of the referenced Entry, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
        ).optional(),
        path: z.string().describe(
          "Immutable. The path in the Entry that is referenced in the Entry Link. Empty path denotes that the Entry itself is referenced in the Entry Link.",
        ).optional(),
        type: z.enum(["UNSPECIFIED", "SOURCE", "TARGET"]).describe(
          "Required. Immutable. The reference type of the Entry.",
        ).optional(),
      })).describe(
        "Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references.",
      ).optional(),
      name: z.string().describe(
        "Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the Entry Link was last updated.",
      ).optional(),
    }).describe("Required. Entry Link resource.").optional(),
    entryLinkId: z.string().describe(
      "Required. Entry Link identifier * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the EntryGroup.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}.",
    ).optional(),
  }).describe("Payload for creating an EntryLink.").optional(),
  createGlossary: z.object({
    glossary: z.object({
      categoryCount: z.number().int().describe(
        "Output only. The number of GlossaryCategories in the Glossary.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time at which the Glossary was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the Glossary.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the Glossary. This is user-mutable. This will be same as the GlossaryId, if not specified.",
      ).optional(),
      etag: z.string().describe(
        "Optional. Needed for resource freshness validation. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the Glossary.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
      ).optional(),
      termCount: z.number().int().describe(
        "Output only. The number of GlossaryTerms in the Glossary.",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the Glossary. This ID will be different if the Glossary is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the Glossary was last updated.",
      ).optional(),
    }).describe("Required. The Glossary to create.").optional(),
    glossaryId: z.string().describe(
      "Required. Glossary ID: Glossary identifier.",
    ).optional(),
    parent: z.string().describe(
      "Required. The parent resource where this Glossary will be created. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region.",
    ).optional(),
    validateOnly: z.boolean().describe(
      "Optional. Validates the request without actually creating the Glossary. Default: false.",
    ).optional(),
  }).describe("Payload for creating a Glossary.").optional(),
  createGlossaryCategory: z.object({
    category: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryCategory.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryCategory. This is user-mutable. This will be same as the GlossaryCategoryId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryCategory.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryCategory in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryCategory. This ID will be different if the GlossaryCategory is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was last updated.",
      ).optional(),
    }).describe("Required. The GlossaryCategory to create.").optional(),
    categoryId: z.string().describe("Required. GlossaryCategory identifier.")
      .optional(),
    parent: z.string().describe(
      "Required. The parent resource where this GlossaryCategory will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where locationId refers to a Google Cloud region.",
    ).optional(),
  }).describe("Payload for creating a GlossaryCategory.").optional(),
  createGlossaryTerm: z.object({
    parent: z.string().describe(
      "Required. The parent resource where the GlossaryTerm will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region.",
    ).optional(),
    term: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryTerm.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryTerm. This is user-mutable. This will be same as the GlossaryTermId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryTerm.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryTerm in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryTerm. This ID will be different if the GlossaryTerm is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was last updated.",
      ).optional(),
    }).describe("Required. The GlossaryTerm to create.").optional(),
    termId: z.string().describe("Required. GlossaryTerm identifier.")
      .optional(),
  }).describe("Payload for creating a GlossaryTerm.").optional(),
  createTime: z.string().describe(
    "Output only. The time when the ChangeRequest was created.",
  ).optional(),
  dataProductAccessRequest: z.object({
    accessGroupDisplayName: z.string().describe(
      "Output only. The display name of the access group defined in the Data Product for which access is being requested.",
    ).optional(),
    accessGroupId: z.string().describe(
      "Required. The ID of the access group for which access is being requested. This corresponds to the unique identifier of the AccessGroup defined in the Data Product.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the data product. Format: projects/{project_number}/locations/{location_id}/dataProducts/{data_product_id}",
    ).optional(),
    requestedPrincipal: z.string().describe(
      "Optional. The principal for which access is being requested in IAM format. If not specified, the requestor's principal will be used. Example: serviceAccount:my-sa@my-project.iam.gserviceaccount.com. Only service account principals are currently supported. https://cloud.google.com/iam/docs/principal-identifiers",
    ).optional(),
  }).describe("Payload for Data Product access request.").optional(),
  deleteEntry: z.object({
    name: z.string().describe(
      "Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}.",
    ).optional(),
  }).describe("Payload for deleting an Entry.").optional(),
  deleteEntryLink: z.object({
    name: z.string().describe(
      "Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}.",
    ).optional(),
  }).describe("Payload for deleting an EntryLink.").optional(),
  deleteGlossary: z.object({
    etag: z.string().describe(
      "Optional. The etag of the Glossary. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the Glossary to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
    ).optional(),
  }).describe("Payload for deleting a Glossary.").optional(),
  deleteGlossaryCategory: z.object({
    name: z.string().describe(
      "Required. The name of the GlossaryCategory to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
    ).optional(),
  }).describe("Payload for deleting a GlossaryCategory.").optional(),
  deleteGlossaryTerm: z.object({
    name: z.string().describe(
      "Required. The name of the GlossaryTerm to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
    ).optional(),
  }).describe("Payload for deleting a GlossaryTerm.").optional(),
  etag: z.string().describe(
    "Optional. This checksum is computed by the service. It can be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
  ).optional(),
  justification: z.string().describe(
    "Optional. Justification of the ChangeRequest. This should explain why the change is needed or why it should be approved.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the ChangeRequest.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The relative resource name of the ChangeRequest, of the form: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id}",
  ).optional(),
  rejectionComment: z.string().describe(
    "Output only. The reason provided for rejecting the ChangeRequest.",
  ).optional(),
  resource: z.string().describe(
    "Output only. The full resource name of the target resource to be modified. Example: //dataplex.googleapis.com/projects/my-project/locations/us-central1/entryGroups/my-group/entries/my-entry",
  ).optional(),
  reviewerComment: z.string().describe(
    "Output only. The comment provided by the reviewer when approving or rejecting the ChangeRequest. Maximum length is 1024 characters.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "NEW",
    "APPROVED",
    "REJECTED",
    "EXPIRED",
    "REVOKED",
    "APPLYING",
    "FAILED",
  ]).describe("Output only. The current state of the ChangeRequest.")
    .optional(),
  uid: z.string().describe(
    "Output only. System generated globally unique ID for the ChangeRequest.",
  ).optional(),
  updateEntry: z.object({
    allowMissing: z.boolean().describe(
      "Optional. If set to true and the entry doesn't exist, the service will create it.",
    ).optional(),
    aspectKeys: z.array(z.string()).describe(
      "Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @* - matches aspects of the given type for all paths. *@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request.",
    ).optional(),
    deleteMissingAspects: z.boolean().describe(
      "Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request.",
    ).optional(),
    entry: z.object({
      aspects: z.record(
        z.string(),
        z.object({
          aspectSource: z.object({
            createTime: z.unknown().describe(
              "The time the aspect was created in the source system.",
            ).optional(),
            dataVersion: z.unknown().describe(
              "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
            ).optional(),
            updateTime: z.unknown().describe(
              "The time the aspect was last updated in the source system.",
            ).optional(),
          }).describe(
            "Optional. Information related to the source system of the aspect.",
          ).optional(),
          aspectType: z.string().describe(
            "Output only. The resource name of the type used to create this Aspect.",
          ).optional(),
          createTime: z.string().describe(
            "Output only. The time when the Aspect was created.",
          ).optional(),
          data: z.record(z.string(), z.unknown()).describe(
            "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
          path: z.string().describe(
            "Output only. The path in the entry under which the aspect is attached.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. The time when the Aspect was last updated.",
          ).optional(),
        }),
      ).describe(
        "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the entry was created in Dataplex Universal Catalog.",
      ).optional(),
      entryGroupType: z.string().describe(
        "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
      ).optional(),
      entrySource: z.object({
        ancestors: z.array(z.object({
          name: z.unknown().describe(
            "Optional. The name of the ancestor resource.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. The type of the ancestor resource.",
          ).optional(),
        })).describe(
          "Immutable. The entries representing the ancestors of the data resource in the source system.",
        ).optional(),
        createTime: z.string().describe(
          "The time when the resource was created in the source system.",
        ).optional(),
        description: z.string().describe(
          "A description of the data resource. Maximum length is 2,000 characters.",
        ).optional(),
        displayName: z.string().describe(
          "A user-friendly display name. Maximum length is 500 characters.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "User-defined labels. The maximum size of keys and values is 128 characters each.",
        ).optional(),
        location: z.string().describe(
          "Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud.",
        ).optional(),
        platform: z.string().describe(
          "The platform containing the source system. Maximum length is 64 characters.",
        ).optional(),
        resource: z.string().describe(
          "The name of the resource in the source system. Maximum length is 4,000 characters.",
        ).optional(),
        system: z.string().describe(
          "The name of the source system. Maximum length is 64 characters.",
        ).optional(),
        updateTime: z.string().describe(
          "The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time.",
        ).optional(),
      }).describe(
        "Optional. Information related to the source system of the data resource that is represented by the entry.",
      ).optional(),
      entryType: z.string().describe(
        "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
      ).optional(),
      fullyQualifiedName: z.string().describe(
        "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      parentEntry: z.string().describe(
        "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
      ).optional(),
    }).describe("Required. Entry resource.").optional(),
    updateMask: z.string().describe(
      'Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request.',
    ).optional(),
  }).describe("Payload for updating an Entry.").optional(),
  updateGlossary: z.object({
    glossary: z.object({
      categoryCount: z.number().int().describe(
        "Output only. The number of GlossaryCategories in the Glossary.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time at which the Glossary was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the Glossary.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the Glossary. This is user-mutable. This will be same as the GlossaryId, if not specified.",
      ).optional(),
      etag: z.string().describe(
        "Optional. Needed for resource freshness validation. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the Glossary.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
      ).optional(),
      termCount: z.number().int().describe(
        "Output only. The number of GlossaryTerms in the Glossary.",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the Glossary. This ID will be different if the Glossary is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the Glossary was last updated.",
      ).optional(),
    }).describe(
      "Required. The Glossary to update. The Glossary's name field is used to identify the Glossary to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
    ).optional(),
    updateMask: z.string().describe("Required. The list of fields to update.")
      .optional(),
    validateOnly: z.boolean().describe(
      "Optional. Validates the request without actually updating the Glossary. Default: false.",
    ).optional(),
  }).describe("Payload for updating a Glossary.").optional(),
  updateGlossaryCategory: z.object({
    category: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryCategory.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryCategory. This is user-mutable. This will be same as the GlossaryCategoryId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryCategory.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryCategory in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryCategory. This ID will be different if the GlossaryCategory is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was last updated.",
      ).optional(),
    }).describe(
      "Required. The GlossaryCategory to update. The GlossaryCategory's name field is used to identify the GlossaryCategory to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
    ).optional(),
    updateMask: z.string().describe("Required. The list of fields to update.")
      .optional(),
  }).describe("Payload for updating a GlossaryCategory.").optional(),
  updateGlossaryTerm: z.object({
    term: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryTerm.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryTerm. This is user-mutable. This will be same as the GlossaryTermId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryTerm.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryTerm in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryTerm. This ID will be different if the GlossaryTerm is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was last updated.",
      ).optional(),
    }).describe(
      "Required. The GlossaryTerm to update. The GlossaryTerm's name field is used to identify the GlossaryTerm to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
    ).optional(),
    updateMask: z.string().describe("Required. The list of fields to update.")
      .optional(),
  }).describe("Payload for updating a GlossaryTerm.").optional(),
  updateTime: z.string().describe(
    "Output only. The time when the ChangeRequest was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  approver: z.string().optional(),
  author: z.string().optional(),
  batchChangeMetadataRequest: z.object({
    changes: z.array(z.object({
      createEntryLinkRequest: z.object({
        entryLink: z.object({
          aspects: z.unknown(),
          createTime: z.unknown(),
          entryLinkType: z.unknown(),
          entryReferences: z.unknown(),
          name: z.unknown(),
          updateTime: z.unknown(),
        }),
        entryLinkId: z.string(),
        parent: z.string(),
      }),
      createEntryRequest: z.object({
        entry: z.object({
          aspects: z.unknown(),
          createTime: z.unknown(),
          entryGroupType: z.unknown(),
          entrySource: z.unknown(),
          entryType: z.unknown(),
          fullyQualifiedName: z.unknown(),
          name: z.unknown(),
          parentEntry: z.unknown(),
          updateTime: z.unknown(),
        }),
        entryId: z.string(),
        parent: z.string(),
      }),
      deleteEntryLinkRequest: z.object({
        name: z.string(),
      }),
      deleteEntryRequest: z.object({
        name: z.string(),
      }),
      updateEntryLinkRequest: z.object({
        allowMissing: z.boolean(),
        aspectKeys: z.array(z.unknown()),
        entryLink: z.object({
          aspects: z.unknown(),
          createTime: z.unknown(),
          entryLinkType: z.unknown(),
          entryReferences: z.unknown(),
          name: z.unknown(),
          updateTime: z.unknown(),
        }),
      }),
      updateEntryRequest: z.object({
        allowMissing: z.boolean(),
        aspectKeys: z.array(z.unknown()),
        deleteMissingAspects: z.boolean(),
        entry: z.object({
          aspects: z.unknown(),
          createTime: z.unknown(),
          entryGroupType: z.unknown(),
          entrySource: z.unknown(),
          entryType: z.unknown(),
          fullyQualifiedName: z.unknown(),
          name: z.unknown(),
          parentEntry: z.unknown(),
          updateTime: z.unknown(),
        }),
        updateMask: z.string(),
      }),
    })),
    description: z.object({
      content: z.string(),
      job: z.object({
        name: z.string(),
        runTime: z.string(),
      }),
    }),
    name: z.string(),
  }).optional(),
  batchChangeMetadataResponse: z.object({
    failedRequests: z.record(z.string(), z.unknown()),
  }).optional(),
  changeType: z.string().optional(),
  createEntry: z.object({
    entry: z.object({
      aspects: z.record(z.string(), z.unknown()),
      createTime: z.string(),
      entryGroupType: z.string(),
      entrySource: z.object({
        ancestors: z.array(z.object({
          name: z.unknown(),
          type: z.unknown(),
        })),
        createTime: z.string(),
        description: z.string(),
        displayName: z.string(),
        labels: z.record(z.string(), z.unknown()),
        location: z.string(),
        platform: z.string(),
        resource: z.string(),
        system: z.string(),
        updateTime: z.string(),
      }),
      entryType: z.string(),
      fullyQualifiedName: z.string(),
      name: z.string(),
      parentEntry: z.string(),
      updateTime: z.string(),
    }),
    entryId: z.string(),
    parent: z.string(),
  }).optional(),
  createEntryLink: z.object({
    entryLink: z.object({
      aspects: z.record(z.string(), z.unknown()),
      createTime: z.string(),
      entryLinkType: z.string(),
      entryReferences: z.array(z.object({
        name: z.string(),
        path: z.string(),
        type: z.string(),
      })),
      name: z.string(),
      updateTime: z.string(),
    }),
    entryLinkId: z.string(),
    parent: z.string(),
  }).optional(),
  createGlossary: z.object({
    glossary: z.object({
      categoryCount: z.number(),
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      etag: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      termCount: z.number(),
      uid: z.string(),
      updateTime: z.string(),
    }),
    glossaryId: z.string(),
    parent: z.string(),
    validateOnly: z.boolean(),
  }).optional(),
  createGlossaryCategory: z.object({
    category: z.object({
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      parent: z.string(),
      uid: z.string(),
      updateTime: z.string(),
    }),
    categoryId: z.string(),
    parent: z.string(),
  }).optional(),
  createGlossaryTerm: z.object({
    parent: z.string(),
    term: z.object({
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      parent: z.string(),
      uid: z.string(),
      updateTime: z.string(),
    }),
    termId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dataProductAccessRequest: z.object({
    accessGroupDisplayName: z.string(),
    accessGroupId: z.string(),
    parent: z.string(),
    requestedPrincipal: z.string(),
  }).optional(),
  deleteEntry: z.object({
    name: z.string(),
  }).optional(),
  deleteEntryLink: z.object({
    name: z.string(),
  }).optional(),
  deleteGlossary: z.object({
    etag: z.string(),
    name: z.string(),
  }).optional(),
  deleteGlossaryCategory: z.object({
    name: z.string(),
  }).optional(),
  deleteGlossaryTerm: z.object({
    name: z.string(),
  }).optional(),
  etag: z.string().optional(),
  justification: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  rejectionComment: z.string().optional(),
  resource: z.string().optional(),
  reviewerComment: z.string().optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateEntry: z.object({
    allowMissing: z.boolean(),
    aspectKeys: z.array(z.string()),
    deleteMissingAspects: z.boolean(),
    entry: z.object({
      aspects: z.record(z.string(), z.unknown()),
      createTime: z.string(),
      entryGroupType: z.string(),
      entrySource: z.object({
        ancestors: z.array(z.object({
          name: z.unknown(),
          type: z.unknown(),
        })),
        createTime: z.string(),
        description: z.string(),
        displayName: z.string(),
        labels: z.record(z.string(), z.unknown()),
        location: z.string(),
        platform: z.string(),
        resource: z.string(),
        system: z.string(),
        updateTime: z.string(),
      }),
      entryType: z.string(),
      fullyQualifiedName: z.string(),
      name: z.string(),
      parentEntry: z.string(),
      updateTime: z.string(),
    }),
    updateMask: z.string(),
  }).optional(),
  updateGlossary: z.object({
    glossary: z.object({
      categoryCount: z.number(),
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      etag: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      termCount: z.number(),
      uid: z.string(),
      updateTime: z.string(),
    }),
    updateMask: z.string(),
    validateOnly: z.boolean(),
  }).optional(),
  updateGlossaryCategory: z.object({
    category: z.object({
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      parent: z.string(),
      uid: z.string(),
      updateTime: z.string(),
    }),
    updateMask: z.string(),
  }).optional(),
  updateGlossaryTerm: z.object({
    term: z.object({
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      parent: z.string(),
      uid: z.string(),
      updateTime: z.string(),
    }),
    updateMask: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  approver: z.string().describe(
    "Output only. The email address of the user who approved/rejected the ChangeRequest.",
  ).optional(),
  author: z.string().describe(
    "Output only. The email address of the user who created the ChangeRequest.",
  ).optional(),
  batchChangeMetadataRequest: z.object({
    changes: z.array(z.object({
      createEntryLinkRequest: z.object({
        entryLink: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed.",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the Entry Link was created.",
          ).optional(),
          entryLinkType: z.unknown().describe(
            "Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition",
          ).optional(),
          entryReferences: z.unknown().describe(
            "Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references.",
          ).optional(),
          name: z.unknown().describe(
            "Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the Entry Link was last updated.",
          ).optional(),
        }).describe("Required. Entry Link resource.").optional(),
        entryLinkId: z.string().describe(
          "Required. Entry Link identifier * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the EntryGroup.",
        ).optional(),
        parent: z.string().describe(
          "Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}.",
        ).optional(),
      }).describe("Payload for creating an EntryLink.").optional(),
      createEntryRequest: z.object({
        entry: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the entry was created in Dataplex Universal Catalog.",
          ).optional(),
          entryGroupType: z.unknown().describe(
            "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
          ).optional(),
          entrySource: z.unknown().describe(
            "Optional. Information related to the source system of the data resource that is represented by the entry.",
          ).optional(),
          entryType: z.unknown().describe(
            "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
          ).optional(),
          fullyQualifiedName: z.unknown().describe(
            "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
          ).optional(),
          name: z.unknown().describe(
            "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          parentEntry: z.unknown().describe(
            "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
          ).optional(),
        }).describe("Required. Entry resource.").optional(),
        entryId: z.string().describe(
          "Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters.",
        ).optional(),
        parent: z.string().describe(
          "Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}.",
        ).optional(),
      }).describe("Payload for creating an Entry.").optional(),
      deleteEntryLinkRequest: z.object({
        name: z.string().describe(
          "Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}.",
        ).optional(),
      }).describe("Payload for deleting an EntryLink.").optional(),
      deleteEntryRequest: z.object({
        name: z.string().describe(
          "Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}.",
        ).optional(),
      }).describe("Payload for deleting an Entry.").optional(),
      updateEntryLinkRequest: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If set to true and the entry link doesn't exist, the service will create it.",
        ).optional(),
        aspectKeys: z.array(z.unknown()).describe(
          "Optional. The map keys of the Aspects which the service should modify. It should be the aspect type reference in the format {project_id_or_number}.{location_id}.{aspect_type_id}.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request.",
        ).optional(),
        entryLink: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed.",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the Entry Link was created.",
          ).optional(),
          entryLinkType: z.unknown().describe(
            "Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition",
          ).optional(),
          entryReferences: z.unknown().describe(
            "Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references.",
          ).optional(),
          name: z.unknown().describe(
            "Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the Entry Link was last updated.",
          ).optional(),
        }).describe("Required. Entry Link resource.").optional(),
      }).describe("Payload for updating an EntryLink.").optional(),
      updateEntryRequest: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If set to true and the entry doesn't exist, the service will create it.",
        ).optional(),
        aspectKeys: z.array(z.unknown()).describe(
          "Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @* - matches aspects of the given type for all paths. *@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request.",
        ).optional(),
        deleteMissingAspects: z.boolean().describe(
          "Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request.",
        ).optional(),
        entry: z.object({
          aspects: z.unknown().describe(
            "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The time when the entry was created in Dataplex Universal Catalog.",
          ).optional(),
          entryGroupType: z.unknown().describe(
            "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
          ).optional(),
          entrySource: z.unknown().describe(
            "Optional. Information related to the source system of the data resource that is represented by the entry.",
          ).optional(),
          entryType: z.unknown().describe(
            "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
          ).optional(),
          fullyQualifiedName: z.unknown().describe(
            "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
          ).optional(),
          name: z.unknown().describe(
            "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          parentEntry: z.unknown().describe(
            "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
          ).optional(),
        }).describe("Required. Entry resource.").optional(),
        updateMask: z.string().describe(
          'Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request.',
        ).optional(),
      }).describe("Payload for updating an Entry.").optional(),
    })).describe(
      "Required. The list of changes to apply. Only a single change per resource is supported. Maximum number of changes supported is 250.",
    ).optional(),
    description: z.object({
      content: z.string().describe("Optional. The text description content.")
        .optional(),
      job: z.object({
        name: z.string().describe(
          "Optional. The name of the job that created the batch change. For example: projects/{project_number}/locations/{location_id}/enrichmentTasks/{enrichment_task_id}/runs/{enrichment_run_id}",
        ).optional(),
        runTime: z.string().describe(
          "Optional. The start time of the job run that created the batch change.",
        ).optional(),
      }).describe("Optional. The job that created the batch change.")
        .optional(),
    }).describe("Optional. Text description of the batch change.").optional(),
    name: z.string().describe(
      "Required. The resource name of the EntryGroup on which the batch change applies. Format: projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id}",
    ).optional(),
  }).describe("Payload for executing a batch of catalog changes.").optional(),
  batchChangeMetadataResponse: z.object({
    failedRequests: z.record(
      z.string(),
      z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }),
    ).describe(
      "A map of failed requests for a batch change, where the key is the 0-based index of the failed request in the batch and the value is the error status. If all operations succeeded, this map is empty.",
    ).optional(),
  }).describe(
    "Output only. Result of applying a batch change metadata request.",
  ).optional(),
  changeType: z.enum([
    "CHANGE_TYPE_UNSPECIFIED",
    "CREATE_ENTRY",
    "UPDATE_ENTRY",
    "DELETE_ENTRY",
    "CREATE_ENTRY_LINK",
    "DELETE_ENTRY_LINK",
    "CREATE_GLOSSARY",
    "UPDATE_GLOSSARY",
    "DELETE_GLOSSARY",
    "CREATE_GLOSSARY_CATEGORY",
    "UPDATE_GLOSSARY_CATEGORY",
    "DELETE_GLOSSARY_CATEGORY",
    "CREATE_GLOSSARY_TERM",
    "UPDATE_GLOSSARY_TERM",
    "DELETE_GLOSSARY_TERM",
    "REQUEST_DATA_PRODUCT_ACCESS",
    "BATCH_CHANGE_METADATA",
  ]).describe(
    "Output only. The type of change represented by the change_payload. This field is derived from the populated field in the change_payload oneof.",
  ).optional(),
  createEntry: z.object({
    entry: z.object({
      aspects: z.record(
        z.string(),
        z.object({
          aspectSource: z.object({
            createTime: z.unknown().describe(
              "The time the aspect was created in the source system.",
            ).optional(),
            dataVersion: z.unknown().describe(
              "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
            ).optional(),
            updateTime: z.unknown().describe(
              "The time the aspect was last updated in the source system.",
            ).optional(),
          }).describe(
            "Optional. Information related to the source system of the aspect.",
          ).optional(),
          aspectType: z.string().describe(
            "Output only. The resource name of the type used to create this Aspect.",
          ).optional(),
          createTime: z.string().describe(
            "Output only. The time when the Aspect was created.",
          ).optional(),
          data: z.record(z.string(), z.unknown()).describe(
            "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
          path: z.string().describe(
            "Output only. The path in the entry under which the aspect is attached.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. The time when the Aspect was last updated.",
          ).optional(),
        }),
      ).describe(
        "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the entry was created in Dataplex Universal Catalog.",
      ).optional(),
      entryGroupType: z.string().describe(
        "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
      ).optional(),
      entrySource: z.object({
        ancestors: z.array(z.object({
          name: z.unknown().describe(
            "Optional. The name of the ancestor resource.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. The type of the ancestor resource.",
          ).optional(),
        })).describe(
          "Immutable. The entries representing the ancestors of the data resource in the source system.",
        ).optional(),
        createTime: z.string().describe(
          "The time when the resource was created in the source system.",
        ).optional(),
        description: z.string().describe(
          "A description of the data resource. Maximum length is 2,000 characters.",
        ).optional(),
        displayName: z.string().describe(
          "A user-friendly display name. Maximum length is 500 characters.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "User-defined labels. The maximum size of keys and values is 128 characters each.",
        ).optional(),
        location: z.string().describe(
          "Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud.",
        ).optional(),
        platform: z.string().describe(
          "The platform containing the source system. Maximum length is 64 characters.",
        ).optional(),
        resource: z.string().describe(
          "The name of the resource in the source system. Maximum length is 4,000 characters.",
        ).optional(),
        system: z.string().describe(
          "The name of the source system. Maximum length is 64 characters.",
        ).optional(),
        updateTime: z.string().describe(
          "The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time.",
        ).optional(),
      }).describe(
        "Optional. Information related to the source system of the data resource that is represented by the entry.",
      ).optional(),
      entryType: z.string().describe(
        "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
      ).optional(),
      fullyQualifiedName: z.string().describe(
        "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      parentEntry: z.string().describe(
        "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
      ).optional(),
    }).describe("Required. Entry resource.").optional(),
    entryId: z.string().describe(
      "Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}.",
    ).optional(),
  }).describe("Payload for creating an Entry.").optional(),
  createEntryLink: z.object({
    entryLink: z.object({
      aspects: z.record(
        z.string(),
        z.object({
          aspectSource: z.object({
            createTime: z.unknown().describe(
              "The time the aspect was created in the source system.",
            ).optional(),
            dataVersion: z.unknown().describe(
              "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
            ).optional(),
            updateTime: z.unknown().describe(
              "The time the aspect was last updated in the source system.",
            ).optional(),
          }).describe(
            "Optional. Information related to the source system of the aspect.",
          ).optional(),
          aspectType: z.string().describe(
            "Output only. The resource name of the type used to create this Aspect.",
          ).optional(),
          createTime: z.string().describe(
            "Output only. The time when the Aspect was created.",
          ).optional(),
          data: z.record(z.string(), z.unknown()).describe(
            "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
          path: z.string().describe(
            "Output only. The path in the entry under which the aspect is attached.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. The time when the Aspect was last updated.",
          ).optional(),
        }),
      ).describe(
        "Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the Entry Link was created.",
      ).optional(),
      entryLinkType: z.string().describe(
        "Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition",
      ).optional(),
      entryReferences: z.array(z.object({
        name: z.string().describe(
          "Required. Immutable. The relative resource name of the referenced Entry, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
        ).optional(),
        path: z.string().describe(
          "Immutable. The path in the Entry that is referenced in the Entry Link. Empty path denotes that the Entry itself is referenced in the Entry Link.",
        ).optional(),
        type: z.enum(["UNSPECIFIED", "SOURCE", "TARGET"]).describe(
          "Required. Immutable. The reference type of the Entry.",
        ).optional(),
      })).describe(
        "Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references.",
      ).optional(),
      name: z.string().describe(
        "Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the Entry Link was last updated.",
      ).optional(),
    }).describe("Required. Entry Link resource.").optional(),
    entryLinkId: z.string().describe(
      "Required. Entry Link identifier * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the EntryGroup.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}.",
    ).optional(),
  }).describe("Payload for creating an EntryLink.").optional(),
  createGlossary: z.object({
    glossary: z.object({
      categoryCount: z.number().int().describe(
        "Output only. The number of GlossaryCategories in the Glossary.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time at which the Glossary was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the Glossary.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the Glossary. This is user-mutable. This will be same as the GlossaryId, if not specified.",
      ).optional(),
      etag: z.string().describe(
        "Optional. Needed for resource freshness validation. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the Glossary.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
      ).optional(),
      termCount: z.number().int().describe(
        "Output only. The number of GlossaryTerms in the Glossary.",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the Glossary. This ID will be different if the Glossary is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the Glossary was last updated.",
      ).optional(),
    }).describe("Required. The Glossary to create.").optional(),
    glossaryId: z.string().describe(
      "Required. Glossary ID: Glossary identifier.",
    ).optional(),
    parent: z.string().describe(
      "Required. The parent resource where this Glossary will be created. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region.",
    ).optional(),
    validateOnly: z.boolean().describe(
      "Optional. Validates the request without actually creating the Glossary. Default: false.",
    ).optional(),
  }).describe("Payload for creating a Glossary.").optional(),
  createGlossaryCategory: z.object({
    category: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryCategory.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryCategory. This is user-mutable. This will be same as the GlossaryCategoryId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryCategory.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryCategory in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryCategory. This ID will be different if the GlossaryCategory is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was last updated.",
      ).optional(),
    }).describe("Required. The GlossaryCategory to create.").optional(),
    categoryId: z.string().describe("Required. GlossaryCategory identifier.")
      .optional(),
    parent: z.string().describe(
      "Required. The parent resource where this GlossaryCategory will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where locationId refers to a Google Cloud region.",
    ).optional(),
  }).describe("Payload for creating a GlossaryCategory.").optional(),
  createGlossaryTerm: z.object({
    parent: z.string().describe(
      "Required. The parent resource where the GlossaryTerm will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region.",
    ).optional(),
    term: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryTerm.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryTerm. This is user-mutable. This will be same as the GlossaryTermId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryTerm.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryTerm in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryTerm. This ID will be different if the GlossaryTerm is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was last updated.",
      ).optional(),
    }).describe("Required. The GlossaryTerm to create.").optional(),
    termId: z.string().describe("Required. GlossaryTerm identifier.")
      .optional(),
  }).describe("Payload for creating a GlossaryTerm.").optional(),
  createTime: z.string().describe(
    "Output only. The time when the ChangeRequest was created.",
  ).optional(),
  dataProductAccessRequest: z.object({
    accessGroupDisplayName: z.string().describe(
      "Output only. The display name of the access group defined in the Data Product for which access is being requested.",
    ).optional(),
    accessGroupId: z.string().describe(
      "Required. The ID of the access group for which access is being requested. This corresponds to the unique identifier of the AccessGroup defined in the Data Product.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the data product. Format: projects/{project_number}/locations/{location_id}/dataProducts/{data_product_id}",
    ).optional(),
    requestedPrincipal: z.string().describe(
      "Optional. The principal for which access is being requested in IAM format. If not specified, the requestor's principal will be used. Example: serviceAccount:my-sa@my-project.iam.gserviceaccount.com. Only service account principals are currently supported. https://cloud.google.com/iam/docs/principal-identifiers",
    ).optional(),
  }).describe("Payload for Data Product access request.").optional(),
  deleteEntry: z.object({
    name: z.string().describe(
      "Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}.",
    ).optional(),
  }).describe("Payload for deleting an Entry.").optional(),
  deleteEntryLink: z.object({
    name: z.string().describe(
      "Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}.",
    ).optional(),
  }).describe("Payload for deleting an EntryLink.").optional(),
  deleteGlossary: z.object({
    etag: z.string().describe(
      "Optional. The etag of the Glossary. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the Glossary to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
    ).optional(),
  }).describe("Payload for deleting a Glossary.").optional(),
  deleteGlossaryCategory: z.object({
    name: z.string().describe(
      "Required. The name of the GlossaryCategory to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
    ).optional(),
  }).describe("Payload for deleting a GlossaryCategory.").optional(),
  deleteGlossaryTerm: z.object({
    name: z.string().describe(
      "Required. The name of the GlossaryTerm to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
    ).optional(),
  }).describe("Payload for deleting a GlossaryTerm.").optional(),
  etag: z.string().describe(
    "Optional. This checksum is computed by the service. It can be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
  ).optional(),
  justification: z.string().describe(
    "Optional. Justification of the ChangeRequest. This should explain why the change is needed or why it should be approved.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the ChangeRequest.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The relative resource name of the ChangeRequest, of the form: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id}",
  ).optional(),
  rejectionComment: z.string().describe(
    "Output only. The reason provided for rejecting the ChangeRequest.",
  ).optional(),
  resource: z.string().describe(
    "Output only. The full resource name of the target resource to be modified. Example: //dataplex.googleapis.com/projects/my-project/locations/us-central1/entryGroups/my-group/entries/my-entry",
  ).optional(),
  reviewerComment: z.string().describe(
    "Output only. The comment provided by the reviewer when approving or rejecting the ChangeRequest. Maximum length is 1024 characters.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "NEW",
    "APPROVED",
    "REJECTED",
    "EXPIRED",
    "REVOKED",
    "APPLYING",
    "FAILED",
  ]).describe("Output only. The current state of the ChangeRequest.")
    .optional(),
  uid: z.string().describe(
    "Output only. System generated globally unique ID for the ChangeRequest.",
  ).optional(),
  updateEntry: z.object({
    allowMissing: z.boolean().describe(
      "Optional. If set to true and the entry doesn't exist, the service will create it.",
    ).optional(),
    aspectKeys: z.array(z.string()).describe(
      "Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @* - matches aspects of the given type for all paths. *@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request.",
    ).optional(),
    deleteMissingAspects: z.boolean().describe(
      "Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request.",
    ).optional(),
    entry: z.object({
      aspects: z.record(
        z.string(),
        z.object({
          aspectSource: z.object({
            createTime: z.unknown().describe(
              "The time the aspect was created in the source system.",
            ).optional(),
            dataVersion: z.unknown().describe(
              "The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc).",
            ).optional(),
            updateTime: z.unknown().describe(
              "The time the aspect was last updated in the source system.",
            ).optional(),
          }).describe(
            "Optional. Information related to the source system of the aspect.",
          ).optional(),
          aspectType: z.string().describe(
            "Output only. The resource name of the type used to create this Aspect.",
          ).optional(),
          createTime: z.string().describe(
            "Output only. The time when the Aspect was created.",
          ).optional(),
          data: z.record(z.string(), z.unknown()).describe(
            "Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
          path: z.string().describe(
            "Output only. The path in the entry under which the aspect is attached.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. The time when the Aspect was last updated.",
          ).optional(),
        }),
      ).describe(
        "Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path}",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time when the entry was created in Dataplex Universal Catalog.",
      ).optional(),
      entryGroupType: z.string().describe(
        "Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: * context-set: EntryGroup containing context set data assets.",
      ).optional(),
      entrySource: z.object({
        ancestors: z.array(z.object({
          name: z.unknown().describe(
            "Optional. The name of the ancestor resource.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. The type of the ancestor resource.",
          ).optional(),
        })).describe(
          "Immutable. The entries representing the ancestors of the data resource in the source system.",
        ).optional(),
        createTime: z.string().describe(
          "The time when the resource was created in the source system.",
        ).optional(),
        description: z.string().describe(
          "A description of the data resource. Maximum length is 2,000 characters.",
        ).optional(),
        displayName: z.string().describe(
          "A user-friendly display name. Maximum length is 500 characters.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "User-defined labels. The maximum size of keys and values is 128 characters each.",
        ).optional(),
        location: z.string().describe(
          "Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud.",
        ).optional(),
        platform: z.string().describe(
          "The platform containing the source system. Maximum length is 64 characters.",
        ).optional(),
        resource: z.string().describe(
          "The name of the resource in the source system. Maximum length is 4,000 characters.",
        ).optional(),
        system: z.string().describe(
          "The name of the source system. Maximum length is 64 characters.",
        ).optional(),
        updateTime: z.string().describe(
          "The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time.",
        ).optional(),
      }).describe(
        "Optional. Information related to the source system of the data resource that is represented by the entry.",
      ).optional(),
      entryType: z.string().describe(
        "Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}.",
      ).optional(),
      fullyQualifiedName: z.string().describe(
        "Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      parentEntry: z.string().describe(
        "Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time when the entry was last updated in Dataplex Universal Catalog.",
      ).optional(),
    }).describe("Required. Entry resource.").optional(),
    updateMask: z.string().describe(
      'Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request.',
    ).optional(),
  }).describe("Payload for updating an Entry.").optional(),
  updateGlossary: z.object({
    glossary: z.object({
      categoryCount: z.number().int().describe(
        "Output only. The number of GlossaryCategories in the Glossary.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The time at which the Glossary was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the Glossary.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the Glossary. This is user-mutable. This will be same as the GlossaryId, if not specified.",
      ).optional(),
      etag: z.string().describe(
        "Optional. Needed for resource freshness validation. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the Glossary.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
      ).optional(),
      termCount: z.number().int().describe(
        "Output only. The number of GlossaryTerms in the Glossary.",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the Glossary. This ID will be different if the Glossary is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the Glossary was last updated.",
      ).optional(),
    }).describe(
      "Required. The Glossary to update. The Glossary's name field is used to identify the Glossary to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}",
    ).optional(),
    updateMask: z.string().describe("Required. The list of fields to update.")
      .optional(),
    validateOnly: z.boolean().describe(
      "Optional. Validates the request without actually updating the Glossary. Default: false.",
    ).optional(),
  }).describe("Payload for updating a Glossary.").optional(),
  updateGlossaryCategory: z.object({
    category: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryCategory.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryCategory. This is user-mutable. This will be same as the GlossaryCategoryId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryCategory.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryCategory in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryCategory. This ID will be different if the GlossaryCategory is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryCategory was last updated.",
      ).optional(),
    }).describe(
      "Required. The GlossaryCategory to update. The GlossaryCategory's name field is used to identify the GlossaryCategory to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
    ).optional(),
    updateMask: z.string().describe("Required. The list of fields to update.")
      .optional(),
  }).describe("Payload for updating a GlossaryCategory.").optional(),
  updateGlossaryTerm: z.object({
    term: z.object({
      createTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The user-mutable description of the GlossaryTerm.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. User friendly display name of the GlossaryTerm. This is user-mutable. This will be same as the GlossaryTermId, if not specified.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined labels for the GlossaryTerm.",
      ).optional(),
      name: z.string().describe(
        "Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
      ).optional(),
      parent: z.string().describe(
        "Required. The immediate parent of the GlossaryTerm in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}",
      ).optional(),
      uid: z.string().describe(
        "Output only. System generated unique id for the GlossaryTerm. This ID will be different if the GlossaryTerm is deleted and re-created with the same name.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which the GlossaryTerm was last updated.",
      ).optional(),
    }).describe(
      "Required. The GlossaryTerm to update. The GlossaryTerm's name field is used to identify the GlossaryTerm to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
    ).optional(),
    updateMask: z.string().describe("Required. The list of fields to update.")
      .optional(),
  }).describe("Payload for updating a GlossaryTerm.").optional(),
  updateTime: z.string().describe(
    "Output only. The time when the ChangeRequest was last updated.",
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

/** Swamp extension model for Google Cloud Dataplex ChangeRequests. Registered at `@swamp/gcp/dataplex/changerequests`. */
export const model = {
  type: "@swamp/gcp/dataplex/changerequests",
  version: "2026.10.28.1",
  upgrades: [
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: entry, aspects, aspectSource, dataVersion, aspectType, data, path, entrySource, ancestors, type, description, displayName, platform, system, entryType, fullyQualifiedName, parentEntry, entryId, parent, entryLink, aspects, aspectSource, dataVersion, aspectType, data, path, entryLinkType, entryReferences, path, type, entryLinkId, parent, glossary, categoryCount, description, displayName, termCount, glossaryId, parent, validateOnly, category, description, displayName, parent, categoryId, parent, parent, term, description, displayName, parent, termId, accessGroupDisplayName, accessGroupId, parent, requestedPrincipal, allowMissing, aspectKeys, deleteMissingAspects, entry, aspects, aspectSource, dataVersion, aspectType, data, path, entrySource, ancestors, type, description, displayName, platform, system, entryType, fullyQualifiedName, parentEntry, updateMask, glossary, categoryCount, description, displayName, termCount, updateMask, validateOnly, category, description, displayName, parent, updateMask, term, description, displayName, parent, updateMask",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          entry: _entry,
          aspects: _aspects,
          aspectSource: _aspectSource,
          dataVersion: _dataVersion,
          aspectType: _aspectType,
          data: _data,
          path: _path,
          entrySource: _entrySource,
          ancestors: _ancestors,
          type: _type,
          description: _description,
          displayName: _displayName,
          platform: _platform,
          system: _system,
          entryType: _entryType,
          fullyQualifiedName: _fullyQualifiedName,
          parentEntry: _parentEntry,
          entryId: _entryId,
          parent: _parent,
          entryLink: _entryLink,
          entryLinkType: _entryLinkType,
          entryReferences: _entryReferences,
          entryLinkId: _entryLinkId,
          glossary: _glossary,
          categoryCount: _categoryCount,
          termCount: _termCount,
          glossaryId: _glossaryId,
          validateOnly: _validateOnly,
          category: _category,
          categoryId: _categoryId,
          term: _term,
          termId: _termId,
          accessGroupDisplayName: _accessGroupDisplayName,
          accessGroupId: _accessGroupId,
          requestedPrincipal: _requestedPrincipal,
          allowMissing: _allowMissing,
          aspectKeys: _aspectKeys,
          deleteMissingAspects: _deleteMissingAspects,
          updateMask: _updateMask,
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
    {
      toVersion: "2026.10.15.1",
      description:
        "Added: batchChangeMetadataRequest, batchChangeMetadataResponse",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a proposed change to a metadata resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a changeRequests",
      arguments: z.object({
        identifier: z.string().describe("The name of the changeRequests"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update changeRequests attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific changeRequests by name (e.g. one discovered by list)",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["approver"] !== undefined) body["approver"] = g["approver"];
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["batchChangeMetadataRequest"] !== undefined) {
          body["batchChangeMetadataRequest"] = g["batchChangeMetadataRequest"];
        }
        if (g["batchChangeMetadataResponse"] !== undefined) {
          body["batchChangeMetadataResponse"] =
            g["batchChangeMetadataResponse"];
        }
        if (g["changeType"] !== undefined) body["changeType"] = g["changeType"];
        if (g["createEntry"] !== undefined) {
          body["createEntry"] = g["createEntry"];
        }
        if (g["createEntryLink"] !== undefined) {
          body["createEntryLink"] = g["createEntryLink"];
        }
        if (g["createGlossary"] !== undefined) {
          body["createGlossary"] = g["createGlossary"];
        }
        if (g["createGlossaryCategory"] !== undefined) {
          body["createGlossaryCategory"] = g["createGlossaryCategory"];
        }
        if (g["createGlossaryTerm"] !== undefined) {
          body["createGlossaryTerm"] = g["createGlossaryTerm"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["dataProductAccessRequest"] !== undefined) {
          body["dataProductAccessRequest"] = g["dataProductAccessRequest"];
        }
        if (g["deleteEntry"] !== undefined) {
          body["deleteEntry"] = g["deleteEntry"];
        }
        if (g["deleteEntryLink"] !== undefined) {
          body["deleteEntryLink"] = g["deleteEntryLink"];
        }
        if (g["deleteGlossary"] !== undefined) {
          body["deleteGlossary"] = g["deleteGlossary"];
        }
        if (g["deleteGlossaryCategory"] !== undefined) {
          body["deleteGlossaryCategory"] = g["deleteGlossaryCategory"];
        }
        if (g["deleteGlossaryTerm"] !== undefined) {
          body["deleteGlossaryTerm"] = g["deleteGlossaryTerm"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["justification"] !== undefined) {
          body["justification"] = g["justification"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["rejectionComment"] !== undefined) {
          body["rejectionComment"] = g["rejectionComment"];
        }
        if (g["resource"] !== undefined) body["resource"] = g["resource"];
        if (g["reviewerComment"] !== undefined) {
          body["reviewerComment"] = g["reviewerComment"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["uid"] !== undefined) body["uid"] = g["uid"];
        if (g["updateEntry"] !== undefined) {
          body["updateEntry"] = g["updateEntry"];
        }
        if (g["updateGlossary"] !== undefined) {
          body["updateGlossary"] = g["updateGlossary"];
        }
        if (g["updateGlossaryCategory"] !== undefined) {
          body["updateGlossaryCategory"] = g["updateGlossaryCategory"];
        }
        if (g["updateGlossaryTerm"] !== undefined) {
          body["updateGlossaryTerm"] = g["updateGlossaryTerm"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Delete the changeRequests",
      arguments: z.object({
        identifier: z.string().describe("The name of the changeRequests"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync changeRequests state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific changeRequests by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List changeRequests resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter request. Supports filtering by: state, author, resource, create_time, update_time.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Order by fields for the result.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of ChangeRequests to return. The service may return fewer.",
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
          baseUrl,
          LIST_CONFIG,
          params,
          "changeRequests",
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
    approve: {
      description: "approve",
      arguments: z.object({
        comment: z.any().optional(),
        etag: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["comment"] !== undefined) body["comment"] = args["comment"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        const result = await createResource(
          baseUrl,
          {
            "id": "dataplex.projects.locations.changeRequests.approve",
            "path": "v1/{+name}:approve",
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
        if (g["resource"] !== undefined) {
          params["resource"] = String(g["resource"]);
        }
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "dataplex.projects.locations.changeRequests.getIamPolicy",
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
    reject: {
      description: "reject",
      arguments: z.object({
        comment: z.any().optional(),
        etag: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["comment"] !== undefined) body["comment"] = args["comment"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        const result = await createResource(
          baseUrl,
          {
            "id": "dataplex.projects.locations.changeRequests.reject",
            "path": "v1/{+name}:reject",
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
        if (g["resource"] !== undefined) {
          params["resource"] = String(g["resource"]);
        }
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "dataplex.projects.locations.changeRequests.setIamPolicy",
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
        if (g["resource"] !== undefined) {
          params["resource"] = String(g["resource"]);
        }
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "dataplex.projects.locations.changeRequests.testIamPermissions",
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
