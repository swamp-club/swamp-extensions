// Auto-generated extension model for @swamp/gcp/dataplex/metadatajobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex MetadataJobs.
 *
 * A metadata job resource.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/metadataJobs/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.metadataJobs.get",
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
  "id": "dataplex.projects.locations.metadataJobs.create",
  "path": "v1/{+parent}/metadataJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "metadataJobId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  exportResult: z.object({
    errorMessage: z.string().describe(
      "Output only. The error message if the metadata export job failed.",
    ).optional(),
    exportedEntries: z.string().describe(
      "Output only. The number of entries that were exported.",
    ).optional(),
  }).describe(
    "Summary results from a metadata export job. The results are a snapshot of the metadata at the time when the job was created. The exported entries are saved to a Cloud Storage bucket.",
  ).optional(),
  exportSpec: z.object({
    outputPath: z.string().describe(
      "Required. The root path of the Cloud Storage bucket to export the metadata to, in the format gs://{bucket}/. You can optionally specify a custom prefix after the bucket name, in the format gs://{bucket}/{prefix}/. The maximum length of the custom prefix is 128 characters. Dataplex Universal Catalog constructs the object path for the exported files by using the bucket name and prefix that you provide, followed by a system-generated path.The bucket must be in the same VPC Service Controls perimeter as the job.",
    ).optional(),
    scope: z.object({
      aspectTypes: z.array(z.string()).describe(
        "The aspect types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}. Only aspects that belong to the specified aspect types are affected by the job.",
      ).optional(),
      entryGroups: z.array(z.string()).describe(
        "The entry groups whose metadata you want to export, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. Only the entries in the specified entry groups are exported.The entry groups must be in the same location and the same VPC Service Controls perimeter as the job.If you set the job scope to be a list of entry groups, then set the organization-level export flag to false and don't provide a list of projects.",
      ).optional(),
      entryTypes: z.array(z.string()).describe(
        "The entry types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are affected by the job.",
      ).optional(),
      organizationLevel: z.boolean().describe(
        "Whether the metadata export job is an organization-level export job. If true, the job exports the entries from the same organization and VPC Service Controls perimeter as the job. The project that the job belongs to determines the VPC Service Controls perimeter. If you set the job scope to be at the organization level, then don't provide a list of projects or entry groups. If false, you must specify a list of projects or a list of entry groups whose entries you want to export.The default is false.",
      ).optional(),
      projects: z.array(z.string()).describe(
        "The projects whose metadata you want to export, in the format projects/{project_id_or_number}. Only the entries from the specified projects are exported.The projects must be in the same organization and VPC Service Controls perimeter as the job.If you set the job scope to be a list of projects, then set the organization-level export flag to false and don't provide a list of entry groups.",
      ).optional(),
    }).describe("The scope of the export job.").optional(),
  }).describe("Job specification for a metadata export job.").optional(),
  importResult: z.object({
    createdEntries: z.string().describe(
      "Output only. The total number of entries that were created.",
    ).optional(),
    createdEntryLinks: z.string().describe(
      "Output only. The total number of entry links that were successfully created.",
    ).optional(),
    deletedEntries: z.string().describe(
      "Output only. The total number of entries that were deleted.",
    ).optional(),
    deletedEntryLinks: z.string().describe(
      "Output only. The total number of entry links that were successfully deleted.",
    ).optional(),
    recreatedEntries: z.string().describe(
      "Output only. The total number of entries that were recreated.",
    ).optional(),
    unchangedEntries: z.string().describe(
      "Output only. The total number of entries that were unchanged.",
    ).optional(),
    unchangedEntryLinks: z.string().describe(
      "Output only. The total number of entry links that were left unchanged.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the status was updated.",
    ).optional(),
    updatedEntries: z.string().describe(
      "Output only. The total number of entries that were updated.",
    ).optional(),
  }).describe("Results from a metadata import job.").optional(),
  importSpec: z.object({
    aspectSyncMode: z.enum([
      "SYNC_MODE_UNSPECIFIED",
      "FULL",
      "INCREMENTAL",
      "NONE",
    ]).describe("Required. The sync mode for aspects.").optional(),
    entrySyncMode: z.enum([
      "SYNC_MODE_UNSPECIFIED",
      "FULL",
      "INCREMENTAL",
      "NONE",
    ]).describe("Required. The sync mode for entries.").optional(),
    logLevel: z.enum(["LOG_LEVEL_UNSPECIFIED", "DEBUG", "INFO"]).describe(
      "Optional. The level of logs to write to Cloud Logging for this job.Debug-level logs provide highly-detailed information for troubleshooting, but their increased verbosity could incur additional costs (https://cloud.google.com/stackdriver/pricing) that might not be merited for all jobs.If unspecified, defaults to INFO.",
    ).optional(),
    scope: z.object({
      aspectTypes: z.array(z.string()).describe(
        "Optional. The aspect types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/aspectTypes/{aspect_type_id}. The job modifies only the aspects that belong to these aspect types.This field is required when creating an aspect-only import job.If the metadata import file attempts to modify an aspect whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an aspect type must either match the location of the job, or the aspect type must be global.",
      ).optional(),
      entryGroups: z.array(z.string()).describe(
        "Required. The entry groups that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id}. Only entries and aspects that belong to the specified entry groups are affected by the job.The entry groups and the job must be in the same location.",
      ).optional(),
      entryLinkTypes: z.array(z.string()).describe(
        "Optional. The entry link types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryLinkTypes/{entry_link_type_id}. The job modifies only the entryLinks that belong to these entry link types.If the metadata import file attempts to create or delete an entry link whose entry link type isn't included in this list, the import job will skip those entry links.",
      ).optional(),
      entryTypes: z.array(z.string()).describe(
        "Required. The entry types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryTypes/{entry_type_id}. The job modifies only the entries and aspects that belong to these entry types.If the metadata import file attempts to modify an entry whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an entry type must either match the location of the job, or the entry type must be global.",
      ).optional(),
      glossaries: z.array(z.string()).describe(
        "Optional. The glossaries that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/glossaries/{glossary_id}.While importing Business Glossary entries, the user must provide glossaries. While importing entries, the user does not have to provide glossaries. If the metadata import file attempts to modify Business Glossary entries whose glossary isn't included in this list, the import job will skip those entries.The location of a glossary must either match the location of the job, or the glossary must be global.",
      ).optional(),
      referencedEntryScopes: z.array(z.string()).describe(
        "Optional. Defines the scope of entries that can be referenced in the entry links.Currently, projects are supported as valid scopes. Format: projects/{project_number_or_id}If the metadata import file attempts to create an entry link which references an entry that is not in the scope, the import job will skip that entry link.",
      ).optional(),
    }).describe(
      "A boundary on the scope of impact that the metadata import job can have.",
    ).optional(),
    sourceCreateTime: z.string().describe(
      "Optional. The time when the process that created the metadata import files began.",
    ).optional(),
    sourceStorageUri: z.string().describe(
      "Optional. The URI of a Cloud Storage bucket or folder (beginning with gs:// and ending with /) that contains the metadata import files for this job.A metadata import file defines the values to set for each of the entries and aspects in a metadata import job. For more information about how to create a metadata import file and the file requirements, see Metadata import file (https://cloud.google.com/dataplex/docs/import-metadata#metadata-import-file).You can provide multiple metadata import files in the same metadata job. The bucket or folder must contain at least one metadata import file, in JSON Lines format (either.json or.jsonl file extension).In FULL entry sync mode, don't save the metadata import file in a folder named SOURCE_STORAGE_URI/deletions/.Caution: If the metadata import file contains no data, all entries and aspects that belong to the job's scope are deleted.",
    ).optional(),
  }).describe(
    "Job specification for a metadata import job.You can run the following kinds of metadata import jobs: Full sync of entries with incremental import of their aspects. Supported for custom entries. Incremental import of aspects only. Supported for aspects that belong to custom entries and system entries. For custom entries, you can modify both optional aspects and required aspects. For system entries, you can modify optional aspects.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  status: z.object({
    completionPercent: z.number().int().describe(
      "Output only. Progress tracking.",
    ).optional(),
    message: z.string().describe(
      "Output only. Message relating to the progression of a metadata job.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "QUEUED",
      "RUNNING",
      "CANCELING",
      "CANCELED",
      "SUCCEEDED",
      "FAILED",
      "SUCCEEDED_WITH_ERRORS",
    ]).describe("Output only. State of the metadata job.").optional(),
    updateTime: z.string().describe(
      "Output only. The time when the status was updated.",
    ).optional(),
  }).describe("Metadata job status.").optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "IMPORT", "EXPORT"]).describe(
    "Required. Metadata job type.",
  ).optional(),
  metadataJobId: z.string().describe(
    "Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  exportResult: z.object({
    errorMessage: z.string(),
    exportedEntries: z.string(),
  }).optional(),
  exportSpec: z.object({
    outputPath: z.string(),
    scope: z.object({
      aspectTypes: z.array(z.string()),
      entryGroups: z.array(z.string()),
      entryTypes: z.array(z.string()),
      organizationLevel: z.boolean(),
      projects: z.array(z.string()),
    }),
  }).optional(),
  importResult: z.object({
    createdEntries: z.string(),
    createdEntryLinks: z.string(),
    deletedEntries: z.string(),
    deletedEntryLinks: z.string(),
    recreatedEntries: z.string(),
    unchangedEntries: z.string(),
    unchangedEntryLinks: z.string(),
    updateTime: z.string(),
    updatedEntries: z.string(),
  }).optional(),
  importSpec: z.object({
    aspectSyncMode: z.string(),
    entrySyncMode: z.string(),
    logLevel: z.string(),
    scope: z.object({
      aspectTypes: z.array(z.string()),
      entryGroups: z.array(z.string()),
      entryLinkTypes: z.array(z.string()),
      entryTypes: z.array(z.string()),
      glossaries: z.array(z.string()),
      referencedEntryScopes: z.array(z.string()),
    }),
    sourceCreateTime: z.string(),
    sourceStorageUri: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  status: z.object({
    completionPercent: z.number(),
    message: z.string(),
    state: z.string(),
    updateTime: z.string(),
  }).optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  exportResult: z.object({
    errorMessage: z.string().describe(
      "Output only. The error message if the metadata export job failed.",
    ).optional(),
    exportedEntries: z.string().describe(
      "Output only. The number of entries that were exported.",
    ).optional(),
  }).describe(
    "Summary results from a metadata export job. The results are a snapshot of the metadata at the time when the job was created. The exported entries are saved to a Cloud Storage bucket.",
  ).optional(),
  exportSpec: z.object({
    outputPath: z.string().describe(
      "Required. The root path of the Cloud Storage bucket to export the metadata to, in the format gs://{bucket}/. You can optionally specify a custom prefix after the bucket name, in the format gs://{bucket}/{prefix}/. The maximum length of the custom prefix is 128 characters. Dataplex Universal Catalog constructs the object path for the exported files by using the bucket name and prefix that you provide, followed by a system-generated path.The bucket must be in the same VPC Service Controls perimeter as the job.",
    ).optional(),
    scope: z.object({
      aspectTypes: z.array(z.string()).describe(
        "The aspect types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}. Only aspects that belong to the specified aspect types are affected by the job.",
      ).optional(),
      entryGroups: z.array(z.string()).describe(
        "The entry groups whose metadata you want to export, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. Only the entries in the specified entry groups are exported.The entry groups must be in the same location and the same VPC Service Controls perimeter as the job.If you set the job scope to be a list of entry groups, then set the organization-level export flag to false and don't provide a list of projects.",
      ).optional(),
      entryTypes: z.array(z.string()).describe(
        "The entry types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are affected by the job.",
      ).optional(),
      organizationLevel: z.boolean().describe(
        "Whether the metadata export job is an organization-level export job. If true, the job exports the entries from the same organization and VPC Service Controls perimeter as the job. The project that the job belongs to determines the VPC Service Controls perimeter. If you set the job scope to be at the organization level, then don't provide a list of projects or entry groups. If false, you must specify a list of projects or a list of entry groups whose entries you want to export.The default is false.",
      ).optional(),
      projects: z.array(z.string()).describe(
        "The projects whose metadata you want to export, in the format projects/{project_id_or_number}. Only the entries from the specified projects are exported.The projects must be in the same organization and VPC Service Controls perimeter as the job.If you set the job scope to be a list of projects, then set the organization-level export flag to false and don't provide a list of entry groups.",
      ).optional(),
    }).describe("The scope of the export job.").optional(),
  }).describe("Job specification for a metadata export job.").optional(),
  importResult: z.object({
    createdEntries: z.string().describe(
      "Output only. The total number of entries that were created.",
    ).optional(),
    createdEntryLinks: z.string().describe(
      "Output only. The total number of entry links that were successfully created.",
    ).optional(),
    deletedEntries: z.string().describe(
      "Output only. The total number of entries that were deleted.",
    ).optional(),
    deletedEntryLinks: z.string().describe(
      "Output only. The total number of entry links that were successfully deleted.",
    ).optional(),
    recreatedEntries: z.string().describe(
      "Output only. The total number of entries that were recreated.",
    ).optional(),
    unchangedEntries: z.string().describe(
      "Output only. The total number of entries that were unchanged.",
    ).optional(),
    unchangedEntryLinks: z.string().describe(
      "Output only. The total number of entry links that were left unchanged.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the status was updated.",
    ).optional(),
    updatedEntries: z.string().describe(
      "Output only. The total number of entries that were updated.",
    ).optional(),
  }).describe("Results from a metadata import job.").optional(),
  importSpec: z.object({
    aspectSyncMode: z.enum([
      "SYNC_MODE_UNSPECIFIED",
      "FULL",
      "INCREMENTAL",
      "NONE",
    ]).describe("Required. The sync mode for aspects.").optional(),
    entrySyncMode: z.enum([
      "SYNC_MODE_UNSPECIFIED",
      "FULL",
      "INCREMENTAL",
      "NONE",
    ]).describe("Required. The sync mode for entries.").optional(),
    logLevel: z.enum(["LOG_LEVEL_UNSPECIFIED", "DEBUG", "INFO"]).describe(
      "Optional. The level of logs to write to Cloud Logging for this job.Debug-level logs provide highly-detailed information for troubleshooting, but their increased verbosity could incur additional costs (https://cloud.google.com/stackdriver/pricing) that might not be merited for all jobs.If unspecified, defaults to INFO.",
    ).optional(),
    scope: z.object({
      aspectTypes: z.array(z.string()).describe(
        "Optional. The aspect types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/aspectTypes/{aspect_type_id}. The job modifies only the aspects that belong to these aspect types.This field is required when creating an aspect-only import job.If the metadata import file attempts to modify an aspect whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an aspect type must either match the location of the job, or the aspect type must be global.",
      ).optional(),
      entryGroups: z.array(z.string()).describe(
        "Required. The entry groups that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id}. Only entries and aspects that belong to the specified entry groups are affected by the job.The entry groups and the job must be in the same location.",
      ).optional(),
      entryLinkTypes: z.array(z.string()).describe(
        "Optional. The entry link types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryLinkTypes/{entry_link_type_id}. The job modifies only the entryLinks that belong to these entry link types.If the metadata import file attempts to create or delete an entry link whose entry link type isn't included in this list, the import job will skip those entry links.",
      ).optional(),
      entryTypes: z.array(z.string()).describe(
        "Required. The entry types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryTypes/{entry_type_id}. The job modifies only the entries and aspects that belong to these entry types.If the metadata import file attempts to modify an entry whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an entry type must either match the location of the job, or the entry type must be global.",
      ).optional(),
      glossaries: z.array(z.string()).describe(
        "Optional. The glossaries that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/glossaries/{glossary_id}.While importing Business Glossary entries, the user must provide glossaries. While importing entries, the user does not have to provide glossaries. If the metadata import file attempts to modify Business Glossary entries whose glossary isn't included in this list, the import job will skip those entries.The location of a glossary must either match the location of the job, or the glossary must be global.",
      ).optional(),
      referencedEntryScopes: z.array(z.string()).describe(
        "Optional. Defines the scope of entries that can be referenced in the entry links.Currently, projects are supported as valid scopes. Format: projects/{project_number_or_id}If the metadata import file attempts to create an entry link which references an entry that is not in the scope, the import job will skip that entry link.",
      ).optional(),
    }).describe(
      "A boundary on the scope of impact that the metadata import job can have.",
    ).optional(),
    sourceCreateTime: z.string().describe(
      "Optional. The time when the process that created the metadata import files began.",
    ).optional(),
    sourceStorageUri: z.string().describe(
      "Optional. The URI of a Cloud Storage bucket or folder (beginning with gs:// and ending with /) that contains the metadata import files for this job.A metadata import file defines the values to set for each of the entries and aspects in a metadata import job. For more information about how to create a metadata import file and the file requirements, see Metadata import file (https://cloud.google.com/dataplex/docs/import-metadata#metadata-import-file).You can provide multiple metadata import files in the same metadata job. The bucket or folder must contain at least one metadata import file, in JSON Lines format (either.json or.jsonl file extension).In FULL entry sync mode, don't save the metadata import file in a folder named SOURCE_STORAGE_URI/deletions/.Caution: If the metadata import file contains no data, all entries and aspects that belong to the job's scope are deleted.",
    ).optional(),
  }).describe(
    "Job specification for a metadata import job.You can run the following kinds of metadata import jobs: Full sync of entries with incremental import of their aspects. Supported for custom entries. Incremental import of aspects only. Supported for aspects that belong to custom entries and system entries. For custom entries, you can modify both optional aspects and required aspects. For system entries, you can modify optional aspects.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  status: z.object({
    completionPercent: z.number().int().describe(
      "Output only. Progress tracking.",
    ).optional(),
    message: z.string().describe(
      "Output only. Message relating to the progression of a metadata job.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "QUEUED",
      "RUNNING",
      "CANCELING",
      "CANCELED",
      "SUCCEEDED",
      "FAILED",
      "SUCCEEDED_WITH_ERRORS",
    ]).describe("Output only. State of the metadata job.").optional(),
    updateTime: z.string().describe(
      "Output only. The time when the status was updated.",
    ).optional(),
  }).describe("Metadata job status.").optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "IMPORT", "EXPORT"]).describe(
    "Required. Metadata job type.",
  ).optional(),
  metadataJobId: z.string().describe(
    "Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex MetadataJobs. Registered at `@swamp/gcp/dataplex/metadatajobs`. */
export const model = {
  type: "@swamp/gcp/dataplex/metadatajobs",
  version: "2026.05.18.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A metadata job resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a metadataJobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["exportResult"] !== undefined) {
          body["exportResult"] = g["exportResult"];
        }
        if (g["exportSpec"] !== undefined) body["exportSpec"] = g["exportSpec"];
        if (g["importResult"] !== undefined) {
          body["importResult"] = g["importResult"];
        }
        if (g["importSpec"] !== undefined) body["importSpec"] = g["importSpec"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["metadataJobId"] !== undefined) {
          body["metadataJobId"] = g["metadataJobId"];
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
      description: "Get a metadataJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the metadataJobs"),
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
    sync: {
      description: "Sync metadataJobs state from GCP",
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
    cancel: {
      description: "cancel",
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
            "id": "dataplex.projects.locations.metadataJobs.cancel",
            "path": "v1/{+name}:cancel",
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
  },
};
