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

// Auto-generated extension model for @swamp/gcp/datalabeling/datasets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Labeling Datasets.
 *
 * Dataset is the resource to hold your data. You can request multiple labeling tasks for a dataset while each one will generate an AnnotatedDataset.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/datasets/${shortName}`;
}

const BASE_URL = "https://datalabeling.googleapis.com/";

const GET_CONFIG = {
  "id": "datalabeling.projects.datasets.get",
  "path": "v1beta1/{+name}",
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
  "id": "datalabeling.projects.datasets.create",
  "path": "v1beta1/{+parent}/datasets",
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

const DELETE_CONFIG = {
  "id": "datalabeling.projects.datasets.delete",
  "path": "v1beta1/{+name}",
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
  "id": "datalabeling.projects.datasets.list",
  "path": "v1beta1/{+parent}/datasets",
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
  dataset: z.object({
    blockingResources: z.array(z.string()).describe(
      "Output only. The names of any related resources that are blocking changes to the dataset.",
    ).optional(),
    createTime: z.string().describe("Output only. Time the dataset is created.")
      .optional(),
    dataItemCount: z.string().describe(
      "Output only. The number of data items in the dataset.",
    ).optional(),
    description: z.string().describe(
      "Optional. User-provided description of the annotation specification set. The description can be up to 10000 characters long.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The display name of the dataset. Maximum of 64 characters.",
    ).optional(),
    inputConfigs: z.array(z.object({
      annotationType: z.enum([
        "ANNOTATION_TYPE_UNSPECIFIED",
        "IMAGE_CLASSIFICATION_ANNOTATION",
        "IMAGE_BOUNDING_BOX_ANNOTATION",
        "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION",
        "IMAGE_BOUNDING_POLY_ANNOTATION",
        "IMAGE_POLYLINE_ANNOTATION",
        "IMAGE_SEGMENTATION_ANNOTATION",
        "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION",
        "VIDEO_OBJECT_TRACKING_ANNOTATION",
        "VIDEO_OBJECT_DETECTION_ANNOTATION",
        "VIDEO_EVENT_ANNOTATION",
        "TEXT_CLASSIFICATION_ANNOTATION",
        "TEXT_ENTITY_EXTRACTION_ANNOTATION",
        "GENERAL_CLASSIFICATION_ANNOTATION",
      ]).describe(
        "Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob.",
      ).optional(),
      bigquerySource: z.object({
        inputUri: z.string().describe(
          'Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).',
        ).optional(),
      }).describe(
        "The BigQuery location for input data. If used in an EvaluationJob, this is where the service saves the prediction input and output sampled from the model version.",
      ).optional(),
      classificationMetadata: z.object({
        isMultiLabel: z.boolean().describe(
          "Whether the classification task is multi-label or not.",
        ).optional(),
      }).describe("Metadata for classification annotations.").optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "IMAGE",
        "VIDEO",
        "TEXT",
        "GENERAL_DATA",
      ]).describe(
        "Required. Data type must be specifed when user tries to import data.",
      ).optional(),
      gcsSource: z.object({
        inputUri: z.string().describe(
          "Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`).",
        ).optional(),
        mimeType: z.string().describe(
          'Required. The format of the source file. Only "text/csv" is supported.',
        ).optional(),
      }).describe("Source of the Cloud Storage file to be imported.")
        .optional(),
      textMetadata: z.object({
        languageCode: z.string().describe(
          "The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US.",
        ).optional(),
      }).describe("Metadata for the text.").optional(),
    })).describe(
      "Output only. This is populated with the original input configs where ImportData is called. It is available only after the clients import data to this dataset.",
    ).optional(),
    lastMigrateTime: z.string().describe(
      "Last time that the Dataset is migrated to AI Platform V2. If any of the AnnotatedDataset is migrated, the last_migration_time in Dataset is also updated.",
    ).optional(),
    name: z.string().describe(
      "Output only. Dataset resource name, format is: projects/{project_id}/datasets/{dataset_id}",
    ).optional(),
  }).describe(
    "Dataset is the resource to hold your data. You can request multiple labeling tasks for a dataset while each one will generate an AnnotatedDataset.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  blockingResources: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  dataItemCount: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  inputConfigs: z.array(z.object({
    annotationType: z.string(),
    bigquerySource: z.object({
      inputUri: z.string(),
    }),
    classificationMetadata: z.object({
      isMultiLabel: z.boolean(),
    }),
    dataType: z.string(),
    gcsSource: z.object({
      inputUri: z.string(),
      mimeType: z.string(),
    }),
    textMetadata: z.object({
      languageCode: z.string(),
    }),
  })).optional(),
  lastMigrateTime: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  dataset: z.object({
    blockingResources: z.array(z.string()).describe(
      "Output only. The names of any related resources that are blocking changes to the dataset.",
    ).optional(),
    createTime: z.string().describe("Output only. Time the dataset is created.")
      .optional(),
    dataItemCount: z.string().describe(
      "Output only. The number of data items in the dataset.",
    ).optional(),
    description: z.string().describe(
      "Optional. User-provided description of the annotation specification set. The description can be up to 10000 characters long.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The display name of the dataset. Maximum of 64 characters.",
    ).optional(),
    inputConfigs: z.array(z.object({
      annotationType: z.enum([
        "ANNOTATION_TYPE_UNSPECIFIED",
        "IMAGE_CLASSIFICATION_ANNOTATION",
        "IMAGE_BOUNDING_BOX_ANNOTATION",
        "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION",
        "IMAGE_BOUNDING_POLY_ANNOTATION",
        "IMAGE_POLYLINE_ANNOTATION",
        "IMAGE_SEGMENTATION_ANNOTATION",
        "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION",
        "VIDEO_OBJECT_TRACKING_ANNOTATION",
        "VIDEO_OBJECT_DETECTION_ANNOTATION",
        "VIDEO_EVENT_ANNOTATION",
        "TEXT_CLASSIFICATION_ANNOTATION",
        "TEXT_ENTITY_EXTRACTION_ANNOTATION",
        "GENERAL_CLASSIFICATION_ANNOTATION",
      ]).describe(
        "Optional. The type of annotation to be performed on this data. You must specify this field if you are using this InputConfig in an EvaluationJob.",
      ).optional(),
      bigquerySource: z.object({
        inputUri: z.string().describe(
          'Required. BigQuery URI to a table, up to 2,000 characters long. If you specify the URI of a table that does not exist, Data Labeling Service creates a table at the URI with the correct schema when you create your EvaluationJob. If you specify the URI of a table that already exists, it must have the [correct schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema). Provide the table URI in the following format: "bq://{your_project_id}/ {your_dataset_name}/{your_table_name}" [Learn more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).',
        ).optional(),
      }).describe(
        "The BigQuery location for input data. If used in an EvaluationJob, this is where the service saves the prediction input and output sampled from the model version.",
      ).optional(),
      classificationMetadata: z.object({
        isMultiLabel: z.boolean().describe(
          "Whether the classification task is multi-label or not.",
        ).optional(),
      }).describe("Metadata for classification annotations.").optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "IMAGE",
        "VIDEO",
        "TEXT",
        "GENERAL_DATA",
      ]).describe(
        "Required. Data type must be specifed when user tries to import data.",
      ).optional(),
      gcsSource: z.object({
        inputUri: z.string().describe(
          "Required. The input URI of source file. This must be a Cloud Storage path (`gs://...`).",
        ).optional(),
        mimeType: z.string().describe(
          'Required. The format of the source file. Only "text/csv" is supported.',
        ).optional(),
      }).describe("Source of the Cloud Storage file to be imported.")
        .optional(),
      textMetadata: z.object({
        languageCode: z.string().describe(
          "The language of this text, as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is en-US.",
        ).optional(),
      }).describe("Metadata for the text.").optional(),
    })).describe(
      "Output only. This is populated with the original input configs where ImportData is called. It is available only after the clients import data to this dataset.",
    ).optional(),
    lastMigrateTime: z.string().describe(
      "Last time that the Dataset is migrated to AI Platform V2. If any of the AnnotatedDataset is migrated, the last_migration_time in Dataset is also updated.",
    ).optional(),
    name: z.string().describe(
      "Output only. Dataset resource name, format is: projects/{project_id}/datasets/{dataset_id}",
    ).optional(),
  }).describe(
    "Dataset is the resource to hold your data. You can request multiple labeling tasks for a dataset while each one will generate an AnnotatedDataset.",
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

/** Swamp extension model for Google Cloud Data Labeling Datasets. Registered at `@swamp/gcp/datalabeling/datasets`. */
export const model = {
  type: "@swamp/gcp/datalabeling/datasets",
  version: "2026.06.08.1",
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
        "Dataset is the resource to hold your data. You can request multiple labeling ...",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataset"] !== undefined) body["dataset"] = g["dataset"];
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
      description: "Get a datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
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
    delete: {
      description: "Delete the datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
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
      description: "Sync datasets state from GCP",
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
      description: "List datasets resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter on dataset is not supported at this moment.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer results than requested. Default value is 100.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
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
    export_data: {
      description: "export data",
      arguments: z.object({
        annotatedDataset: z.any().optional(),
        filter: z.any().optional(),
        outputConfig: z.any().optional(),
        userEmailAddress: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        if (args["annotatedDataset"] !== undefined) {
          body["annotatedDataset"] = args["annotatedDataset"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["outputConfig"] !== undefined) {
          body["outputConfig"] = args["outputConfig"];
        }
        if (args["userEmailAddress"] !== undefined) {
          body["userEmailAddress"] = args["userEmailAddress"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datalabeling.projects.datasets.exportData",
            "path": "v1beta1/{+name}:exportData",
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
    import_data: {
      description: "import data",
      arguments: z.object({
        inputConfig: z.any().optional(),
        userEmailAddress: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        if (args["inputConfig"] !== undefined) {
          body["inputConfig"] = args["inputConfig"];
        }
        if (args["userEmailAddress"] !== undefined) {
          body["userEmailAddress"] = args["userEmailAddress"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datalabeling.projects.datasets.importData",
            "path": "v1beta1/{+name}:importData",
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
  },
};
