// Auto-generated extension model for @swamp/gcp/migrationcenter/importjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Migration Center ImportJobs.
 *
 * A resource that represents the background job that imports asset frames.
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
  return `${parent}/importJobs/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.importJobs.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "migrationcenter.projects.locations.importJobs.create",
  "path": "v1/{+parent}/importJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "importJobId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "migrationcenter.projects.locations.importJobs.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "migrationcenter.projects.locations.importJobs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "migrationcenter.projects.locations.importJobs.list",
  "path": "v1/{+parent}/importJobs",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  assetSource: z.string().describe("Required. Reference to a source.")
    .optional(),
  displayName: z.string().describe(
    "Optional. User-friendly display name. Maximum length is 256 characters.",
  ).optional(),
  executionReport: z.object({
    executionErrors: z.object({
      fileValidations: z.array(z.object({
        fileErrors: z.array(z.unknown()).describe("List of file level errors.")
          .optional(),
        fileName: z.string().describe("The name of the file.").optional(),
        partialReport: z.boolean().describe(
          "Flag indicating that processing was aborted due to maximum number of errors.",
        ).optional(),
        rowErrors: z.array(z.unknown()).describe(
          "Partial list of rows that encountered validation error.",
        ).optional(),
      })).describe("List of errors found in files.").optional(),
      jobErrors: z.array(z.object({
        errorDetails: z.string().describe("The error information.").optional(),
        severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
          .describe("The severity of the error.").optional(),
      })).describe("List of job level errors.").optional(),
    }).describe("A resource that aggregates errors across import job files.")
      .optional(),
    framesReported: z.number().int().describe(
      "Total number of asset frames reported for the import job.",
    ).optional(),
    totalRowsCount: z.number().int().describe(
      "Output only. Total number of rows in the import job.",
    ).optional(),
  }).describe("A resource that reports result of the import job execution.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  validationReport: z.object({
    fileValidations: z.array(z.object({
      fileErrors: z.array(z.object({
        errorDetails: z.unknown().describe("The error information.").optional(),
        severity: z.unknown().describe("The severity of the error.").optional(),
      })).describe("List of file level errors.").optional(),
      fileName: z.string().describe("The name of the file.").optional(),
      partialReport: z.boolean().describe(
        "Flag indicating that processing was aborted due to maximum number of errors.",
      ).optional(),
      rowErrors: z.array(z.object({
        archiveError: z.unknown().describe("Error details for an archive file.")
          .optional(),
        assetTitle: z.unknown().describe("Output only. The asset title.")
          .optional(),
        csvError: z.unknown().describe("Error details for a CSV file.")
          .optional(),
        errors: z.unknown().describe("The list of errors detected in the row.")
          .optional(),
        rowNumber: z.unknown().describe(
          "The row number where the error was detected.",
        ).optional(),
        vmName: z.unknown().describe("The name of the VM in the row.")
          .optional(),
        vmUuid: z.unknown().describe("The VM UUID.").optional(),
        xlsxError: z.unknown().describe("Error details for an XLSX file.")
          .optional(),
      })).describe("Partial list of rows that encountered validation error.")
        .optional(),
    })).describe("List of errors found in files.").optional(),
    jobErrors: z.array(z.object({
      errorDetails: z.string().describe("The error information.").optional(),
      severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
        .describe("The severity of the error.").optional(),
    })).describe("List of job level errors.").optional(),
  }).describe("A resource that aggregates errors across import job files.")
    .optional(),
  importJobId: z.string().describe("Required. ID of the import job.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  assetSource: z.string().optional(),
  completeTime: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  executionReport: z.object({
    executionErrors: z.object({
      fileValidations: z.array(z.object({
        fileErrors: z.array(z.unknown()),
        fileName: z.string(),
        partialReport: z.boolean(),
        rowErrors: z.array(z.unknown()),
      })),
      jobErrors: z.array(z.object({
        errorDetails: z.string(),
        severity: z.string(),
      })),
    }),
    framesReported: z.number(),
    totalRowsCount: z.number(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  validationReport: z.object({
    fileValidations: z.array(z.object({
      fileErrors: z.array(z.object({
        errorDetails: z.unknown(),
        severity: z.unknown(),
      })),
      fileName: z.string(),
      partialReport: z.boolean(),
      rowErrors: z.array(z.object({
        archiveError: z.unknown(),
        assetTitle: z.unknown(),
        csvError: z.unknown(),
        errors: z.unknown(),
        rowNumber: z.unknown(),
        vmName: z.unknown(),
        vmUuid: z.unknown(),
        xlsxError: z.unknown(),
      })),
    })),
    jobErrors: z.array(z.object({
      errorDetails: z.string(),
      severity: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  assetSource: z.string().describe("Required. Reference to a source.")
    .optional(),
  displayName: z.string().describe(
    "Optional. User-friendly display name. Maximum length is 256 characters.",
  ).optional(),
  executionReport: z.object({
    executionErrors: z.object({
      fileValidations: z.array(z.object({
        fileErrors: z.array(z.unknown()).describe("List of file level errors.")
          .optional(),
        fileName: z.string().describe("The name of the file.").optional(),
        partialReport: z.boolean().describe(
          "Flag indicating that processing was aborted due to maximum number of errors.",
        ).optional(),
        rowErrors: z.array(z.unknown()).describe(
          "Partial list of rows that encountered validation error.",
        ).optional(),
      })).describe("List of errors found in files.").optional(),
      jobErrors: z.array(z.object({
        errorDetails: z.string().describe("The error information.").optional(),
        severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
          .describe("The severity of the error.").optional(),
      })).describe("List of job level errors.").optional(),
    }).describe("A resource that aggregates errors across import job files.")
      .optional(),
    framesReported: z.number().int().describe(
      "Total number of asset frames reported for the import job.",
    ).optional(),
    totalRowsCount: z.number().int().describe(
      "Output only. Total number of rows in the import job.",
    ).optional(),
  }).describe("A resource that reports result of the import job execution.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  validationReport: z.object({
    fileValidations: z.array(z.object({
      fileErrors: z.array(z.object({
        errorDetails: z.unknown().describe("The error information.").optional(),
        severity: z.unknown().describe("The severity of the error.").optional(),
      })).describe("List of file level errors.").optional(),
      fileName: z.string().describe("The name of the file.").optional(),
      partialReport: z.boolean().describe(
        "Flag indicating that processing was aborted due to maximum number of errors.",
      ).optional(),
      rowErrors: z.array(z.object({
        archiveError: z.unknown().describe("Error details for an archive file.")
          .optional(),
        assetTitle: z.unknown().describe("Output only. The asset title.")
          .optional(),
        csvError: z.unknown().describe("Error details for a CSV file.")
          .optional(),
        errors: z.unknown().describe("The list of errors detected in the row.")
          .optional(),
        rowNumber: z.unknown().describe(
          "The row number where the error was detected.",
        ).optional(),
        vmName: z.unknown().describe("The name of the VM in the row.")
          .optional(),
        vmUuid: z.unknown().describe("The VM UUID.").optional(),
        xlsxError: z.unknown().describe("Error details for an XLSX file.")
          .optional(),
      })).describe("Partial list of rows that encountered validation error.")
        .optional(),
    })).describe("List of errors found in files.").optional(),
    jobErrors: z.array(z.object({
      errorDetails: z.string().describe("The error information.").optional(),
      severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
        .describe("The severity of the error.").optional(),
    })).describe("List of job level errors.").optional(),
  }).describe("A resource that aggregates errors across import job files.")
    .optional(),
  importJobId: z.string().describe("Required. ID of the import job.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Migration Center ImportJobs. Registered at `@swamp/gcp/migrationcenter/importjobs`. */
export const model = {
  type: "@swamp/gcp/migrationcenter/importjobs",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A resource that represents the background job that imports asset frames.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a importJobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["assetSource"] !== undefined) {
          body["assetSource"] = g["assetSource"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionReport"] !== undefined) {
          body["executionReport"] = g["executionReport"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["validationReport"] !== undefined) {
          body["validationReport"] = g["validationReport"];
        }
        if (g["importJobId"] !== undefined) {
          body["importJobId"] = g["importJobId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a importJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the importJobs"),
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
      description: "Update importJobs attributes",
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
        if (g["assetSource"] !== undefined) {
          body["assetSource"] = g["assetSource"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionReport"] !== undefined) {
          body["executionReport"] = g["executionReport"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["validationReport"] !== undefined) {
          body["validationReport"] = g["validationReport"];
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
      description: "Delete the importJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the importJobs"),
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
      description: "Sync importJobs state from GCP",
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
    run: {
      description: "run",
      arguments: z.object({
        requestId: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "migrationcenter.projects.locations.importJobs.run",
            "path": "v1/{+name}:run",
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
    validate: {
      description: "validate",
      arguments: z.object({
        requestId: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "migrationcenter.projects.locations.importJobs.validate",
            "path": "v1/{+name}:validate",
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
