// Auto-generated extension model for @swamp/gcp/saasservicemgmt/unitkinds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Lifecycle Manager UnitKinds.
 *
 * Definition of a Unit. Units belonging to the same UnitKind are managed together; for example they follow the same release model (blueprints, versions etc.) and are typically rolled out together.
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
  return `${parent}/unitKinds/${shortName}`;
}

const BASE_URL = "https://saasservicemgmt.googleapis.com/";

const GET_CONFIG = {
  "id": "saasservicemgmt.projects.locations.unitKinds.get",
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
  "id": "saasservicemgmt.projects.locations.unitKinds.create",
  "path": "v1/{+parent}/unitKinds",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "unitKindId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "saasservicemgmt.projects.locations.unitKinds.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "saasservicemgmt.projects.locations.unitKinds.delete",
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
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations",
  ).optional(),
  defaultFlagRevisions: z.array(z.string()).describe(
    "Optional. Default revisions of flags for this UnitKind. Newly created units will use the flag default_flag_revisions present at the time of creation.",
  ).optional(),
  defaultRelease: z.string().describe(
    "Optional. A reference to the Release object to use as default for creating new units of this UnitKind (optional). If not specified, a new unit must explicitly reference which release to use for its creation.",
  ).optional(),
  dependencies: z.array(z.object({
    alias: z.string().describe(
      "Required. An alias for the dependency. Used for input variable mapping.",
    ).optional(),
    unitKind: z.string().describe(
      "Required. Immutable. The unit kind of the dependency.",
    ).optional(),
  })).describe(
    "Optional. Immutable. List of other unit kinds that this release will depend on. Dependencies will be automatically provisioned if not found. Maximum 10.",
  ).optional(),
  inputVariableMappings: z.array(z.object({
    from: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the outputVariable will pass its value to",
      ).optional(),
      outputVariable: z.string().describe(
        "Required. Name of the outputVariable on the dependency",
      ).optional(),
    }).describe(
      "Output variables whose values will be passed on to dependencies",
    ).optional(),
    to: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the inputVariable will pass its value to",
      ).optional(),
      ignoreForLookup: z.boolean().describe(
        "Optional. Tells App Lifecycle Manager if this mapping should be used during lookup or not",
      ).optional(),
      inputVariable: z.string().describe(
        "Required. Name of the inputVariable on the dependency",
      ).optional(),
    }).describe(
      "Input variables whose values will be passed on to dependencies",
    ).optional(),
    variable: z.string().describe("Required. name of the variable").optional(),
  })).describe(
    "Optional. List of inputVariables for this release that will either be retrieved from a dependency’s outputVariables, or will be passed on to a dependency’s inputVariables. Maximum 100.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}"',
  ).optional(),
  outputVariableMappings: z.array(z.object({
    from: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the outputVariable will pass its value to",
      ).optional(),
      outputVariable: z.string().describe(
        "Required. Name of the outputVariable on the dependency",
      ).optional(),
    }).describe(
      "Output variables whose values will be passed on to dependencies",
    ).optional(),
    to: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the inputVariable will pass its value to",
      ).optional(),
      ignoreForLookup: z.boolean().describe(
        "Optional. Tells App Lifecycle Manager if this mapping should be used during lookup or not",
      ).optional(),
      inputVariable: z.string().describe(
        "Required. Name of the inputVariable on the dependency",
      ).optional(),
    }).describe(
      "Input variables whose values will be passed on to dependencies",
    ).optional(),
    variable: z.string().describe("Required. name of the variable").optional(),
  })).describe(
    "Optional. List of outputVariables for this unit kind will be passed to this unit's outputVariables. Maximum 100.",
  ).optional(),
  saas: z.string().describe(
    "Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with App Lifecycle Manager. Part of the App Lifecycle Manager common data model. Immutable once set.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  unitKindId: z.string().describe(
    "Required. The ID value for the new unit kind.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  defaultFlagRevisions: z.array(z.string()).optional(),
  defaultRelease: z.string().optional(),
  dependencies: z.array(z.object({
    alias: z.string(),
    unitKind: z.string(),
  })).optional(),
  etag: z.string().optional(),
  inputVariableMappings: z.array(z.object({
    from: z.object({
      dependency: z.string(),
      outputVariable: z.string(),
    }),
    to: z.object({
      dependency: z.string(),
      ignoreForLookup: z.boolean(),
      inputVariable: z.string(),
    }),
    variable: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  outputVariableMappings: z.array(z.object({
    from: z.object({
      dependency: z.string(),
      outputVariable: z.string(),
    }),
    to: z.object({
      dependency: z.string(),
      ignoreForLookup: z.boolean(),
      inputVariable: z.string(),
    }),
    variable: z.string(),
  })).optional(),
  saas: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations",
  ).optional(),
  defaultFlagRevisions: z.array(z.string()).describe(
    "Optional. Default revisions of flags for this UnitKind. Newly created units will use the flag default_flag_revisions present at the time of creation.",
  ).optional(),
  defaultRelease: z.string().describe(
    "Optional. A reference to the Release object to use as default for creating new units of this UnitKind (optional). If not specified, a new unit must explicitly reference which release to use for its creation.",
  ).optional(),
  dependencies: z.array(z.object({
    alias: z.string().describe(
      "Required. An alias for the dependency. Used for input variable mapping.",
    ).optional(),
    unitKind: z.string().describe(
      "Required. Immutable. The unit kind of the dependency.",
    ).optional(),
  })).describe(
    "Optional. Immutable. List of other unit kinds that this release will depend on. Dependencies will be automatically provisioned if not found. Maximum 10.",
  ).optional(),
  inputVariableMappings: z.array(z.object({
    from: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the outputVariable will pass its value to",
      ).optional(),
      outputVariable: z.string().describe(
        "Required. Name of the outputVariable on the dependency",
      ).optional(),
    }).describe(
      "Output variables whose values will be passed on to dependencies",
    ).optional(),
    to: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the inputVariable will pass its value to",
      ).optional(),
      ignoreForLookup: z.boolean().describe(
        "Optional. Tells App Lifecycle Manager if this mapping should be used during lookup or not",
      ).optional(),
      inputVariable: z.string().describe(
        "Required. Name of the inputVariable on the dependency",
      ).optional(),
    }).describe(
      "Input variables whose values will be passed on to dependencies",
    ).optional(),
    variable: z.string().describe("Required. name of the variable").optional(),
  })).describe(
    "Optional. List of inputVariables for this release that will either be retrieved from a dependency’s outputVariables, or will be passed on to a dependency’s inputVariables. Maximum 100.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}"',
  ).optional(),
  outputVariableMappings: z.array(z.object({
    from: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the outputVariable will pass its value to",
      ).optional(),
      outputVariable: z.string().describe(
        "Required. Name of the outputVariable on the dependency",
      ).optional(),
    }).describe(
      "Output variables whose values will be passed on to dependencies",
    ).optional(),
    to: z.object({
      dependency: z.string().describe(
        "Required. Alias of the dependency that the inputVariable will pass its value to",
      ).optional(),
      ignoreForLookup: z.boolean().describe(
        "Optional. Tells App Lifecycle Manager if this mapping should be used during lookup or not",
      ).optional(),
      inputVariable: z.string().describe(
        "Required. Name of the inputVariable on the dependency",
      ).optional(),
    }).describe(
      "Input variables whose values will be passed on to dependencies",
    ).optional(),
    variable: z.string().describe("Required. name of the variable").optional(),
  })).describe(
    "Optional. List of outputVariables for this unit kind will be passed to this unit's outputVariables. Maximum 100.",
  ).optional(),
  saas: z.string().describe(
    "Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with App Lifecycle Manager. Part of the App Lifecycle Manager common data model. Immutable once set.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  unitKindId: z.string().describe(
    "Required. The ID value for the new unit kind.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Lifecycle Manager UnitKinds. Registered at `@swamp/gcp/saasservicemgmt/unitkinds`. */
export const model = {
  type: "@swamp/gcp/saasservicemgmt/unitkinds",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.11.1",
      description: "Added: defaultFlagRevisions",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: defaultFlagRevisions",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { defaultFlagRevisions: _defaultFlagRevisions, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: defaultFlagRevisions",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Definition of a Unit. Units belonging to the same UnitKind are managed togeth...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a unitKinds",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["defaultFlagRevisions"] !== undefined) {
          body["defaultFlagRevisions"] = g["defaultFlagRevisions"];
        }
        if (g["defaultRelease"] !== undefined) {
          body["defaultRelease"] = g["defaultRelease"];
        }
        if (g["dependencies"] !== undefined) {
          body["dependencies"] = g["dependencies"];
        }
        if (g["inputVariableMappings"] !== undefined) {
          body["inputVariableMappings"] = g["inputVariableMappings"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["outputVariableMappings"] !== undefined) {
          body["outputVariableMappings"] = g["outputVariableMappings"];
        }
        if (g["saas"] !== undefined) body["saas"] = g["saas"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["unitKindId"] !== undefined) body["unitKindId"] = g["unitKindId"];
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
      description: "Get a unitKinds",
      arguments: z.object({
        identifier: z.string().describe("The name of the unitKinds"),
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
      description: "Update unitKinds attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["defaultFlagRevisions"] !== undefined) {
          body["defaultFlagRevisions"] = g["defaultFlagRevisions"];
        }
        if (g["defaultRelease"] !== undefined) {
          body["defaultRelease"] = g["defaultRelease"];
        }
        if (g["inputVariableMappings"] !== undefined) {
          body["inputVariableMappings"] = g["inputVariableMappings"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["outputVariableMappings"] !== undefined) {
          body["outputVariableMappings"] = g["outputVariableMappings"];
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
      description: "Delete the unitKinds",
      arguments: z.object({
        identifier: z.string().describe("The name of the unitKinds"),
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
      description: "Sync unitKinds state from GCP",
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
