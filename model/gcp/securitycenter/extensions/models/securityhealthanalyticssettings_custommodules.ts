// Auto-generated extension model for @swamp/gcp/securitycenter/securityhealthanalyticssettings-custommodules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Security Command Center SecurityHealthAnalyticsSettings.CustomModules.
 *
 * Represents an instance of a Security Health Analytics custom module, including its full module name, display name, enablement state, and last updated time. You can create a custom module at the organization, folder, or project level. Custom modules that you create at the organization or folder level are inherited by the child folders and projects.
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
  return `${parent}/customModules/${shortName}`;
}

const BASE_URL = "https://securitycenter.googleapis.com/";

const GET_CONFIG = {
  "id":
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.get",
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
  "id":
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.create",
  "path": "v1/{+parent}/customModules",
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
  "id":
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.patch",
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
  "id":
    "securitycenter.folders.securityHealthAnalyticsSettings.customModules.delete",
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
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).describe("The cloud provider of the custom module.").optional(),
  customConfig: z.object({
    customOutput: z.object({
      properties: z.array(z.object({
        name: z.string().describe("Name of the property for the custom output.")
          .optional(),
        valueExpression: z.object({
          description: z.unknown().describe(
            "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
          ).optional(),
          expression: z.unknown().describe(
            "Textual representation of an expression in Common Expression Language syntax.",
          ).optional(),
          location: z.unknown().describe(
            "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
          ).optional(),
        }).describe(
          'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
        ).optional(),
      })).describe("A list of custom output properties to add to the finding.")
        .optional(),
    }).describe(
      "A set of optional name-value pairs that define custom source properties to return with each finding that is generated by the custom module. The custom source properties that are defined here are included in the finding JSON under `sourceProperties`.",
    ).optional(),
    description: z.string().describe(
      "Text that describes the vulnerability or misconfiguration that the custom module detects. This explanation is returned with each finding instance to help investigators understand the detected issue. The text must be enclosed in quotation marks.",
    ).optional(),
    predicate: z.object({
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
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
    recommendation: z.string().describe(
      "An explanation of the recommended steps that security teams can take to resolve the detected issue. This explanation is returned with each finding generated by this module in the `nextSteps` property of the finding JSON.",
    ).optional(),
    resourceSelector: z.object({
      resourceTypes: z.array(z.string()).describe(
        "The resource types to run the detector on.",
      ).optional(),
    }).describe("Resource for selecting resource type.").optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "CRITICAL",
      "HIGH",
      "MEDIUM",
      "LOW",
    ]).describe("The severity to assign to findings generated by the module.")
      .optional(),
  }).describe(
    "Defines the properties in a custom module configuration for Security Health Analytics. Use the custom module configuration to create custom detectors that generate custom findings for resources that you specify.",
  ).optional(),
  displayName: z.string().describe(
    "The display name of the Security Health Analytics custom module. This display name becomes the finding category for all findings that are returned by this custom module. The display name must be between 1 and 128 characters, start with a lowercase letter, and contain alphanumeric characters or underscores only.",
  ).optional(),
  enablementState: z.enum([
    "ENABLEMENT_STATE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
    "INHERITED",
  ]).describe("The enablement state of the custom module.").optional(),
  name: z.string().describe(
    'Immutable. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}" The id {customModule} is server-generated and is not user settable. It will be a numeric id containing 1-20 digits.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  ancestorModule: z.string().optional(),
  cloudProvider: z.string().optional(),
  customConfig: z.object({
    customOutput: z.object({
      properties: z.array(z.object({
        name: z.string(),
        valueExpression: z.object({
          description: z.unknown(),
          expression: z.unknown(),
          location: z.unknown(),
          title: z.unknown(),
        }),
      })),
    }),
    description: z.string(),
    predicate: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
    recommendation: z.string(),
    resourceSelector: z.object({
      resourceTypes: z.array(z.string()),
    }),
    severity: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  enablementState: z.string().optional(),
  lastEditor: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).describe("The cloud provider of the custom module.").optional(),
  customConfig: z.object({
    customOutput: z.object({
      properties: z.array(z.object({
        name: z.string().describe("Name of the property for the custom output.")
          .optional(),
        valueExpression: z.object({
          description: z.unknown().describe(
            "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
          ).optional(),
          expression: z.unknown().describe(
            "Textual representation of an expression in Common Expression Language syntax.",
          ).optional(),
          location: z.unknown().describe(
            "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
          ).optional(),
        }).describe(
          'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
        ).optional(),
      })).describe("A list of custom output properties to add to the finding.")
        .optional(),
    }).describe(
      "A set of optional name-value pairs that define custom source properties to return with each finding that is generated by the custom module. The custom source properties that are defined here are included in the finding JSON under `sourceProperties`.",
    ).optional(),
    description: z.string().describe(
      "Text that describes the vulnerability or misconfiguration that the custom module detects. This explanation is returned with each finding instance to help investigators understand the detected issue. The text must be enclosed in quotation marks.",
    ).optional(),
    predicate: z.object({
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
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
    recommendation: z.string().describe(
      "An explanation of the recommended steps that security teams can take to resolve the detected issue. This explanation is returned with each finding generated by this module in the `nextSteps` property of the finding JSON.",
    ).optional(),
    resourceSelector: z.object({
      resourceTypes: z.array(z.string()).describe(
        "The resource types to run the detector on.",
      ).optional(),
    }).describe("Resource for selecting resource type.").optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "CRITICAL",
      "HIGH",
      "MEDIUM",
      "LOW",
    ]).describe("The severity to assign to findings generated by the module.")
      .optional(),
  }).describe(
    "Defines the properties in a custom module configuration for Security Health Analytics. Use the custom module configuration to create custom detectors that generate custom findings for resources that you specify.",
  ).optional(),
  displayName: z.string().describe(
    "The display name of the Security Health Analytics custom module. This display name becomes the finding category for all findings that are returned by this custom module. The display name must be between 1 and 128 characters, start with a lowercase letter, and contain alphanumeric characters or underscores only.",
  ).optional(),
  enablementState: z.enum([
    "ENABLEMENT_STATE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
    "INHERITED",
  ]).describe("The enablement state of the custom module.").optional(),
  name: z.string().describe(
    'Immutable. The resource name of the custom module. Its format is "organizations/{organization}/securityHealthAnalyticsSettings/customModules/{customModule}", or "folders/{folder}/securityHealthAnalyticsSettings/customModules/{customModule}", or "projects/{project}/securityHealthAnalyticsSettings/customModules/{customModule}" The id {customModule} is server-generated and is not user settable. It will be a numeric id containing 1-20 digits.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Security Command Center SecurityHealthAnalyticsSettings.CustomModules. Registered at `@swamp/gcp/securitycenter/securityhealthanalyticssettings-custommodules`. */
export const model = {
  type:
    "@swamp/gcp/securitycenter/securityhealthanalyticssettings-custommodules",
  version: "2026.05.19.1",
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
        "Represents an instance of a Security Health Analytics custom module, includin...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customModules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["customConfig"] !== undefined) {
          body["customConfig"] = g["customConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablementState"] !== undefined) {
          body["enablementState"] = g["enablementState"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
      description: "Get a customModules",
      arguments: z.object({
        identifier: z.string().describe("The name of the customModules"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update customModules attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["customConfig"] !== undefined) {
          body["customConfig"] = g["customConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablementState"] !== undefined) {
          body["enablementState"] = g["enablementState"];
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
      description: "Delete the customModules",
      arguments: z.object({
        identifier: z.string().describe("The name of the customModules"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync customModules state from GCP",
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
            String(g["parent"] ?? ""),
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
    list_descendant: {
      description: "list descendant",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securitycenter.folders.securityHealthAnalyticsSettings.customModules.listDescendant",
            "path": "v1/{+parent}/customModules:listDescendant",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    simulate: {
      description: "simulate",
      arguments: z.object({
        customConfig: z.any().optional(),
        resource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["customConfig"] !== undefined) {
          body["customConfig"] = args["customConfig"];
        }
        if (args["resource"] !== undefined) body["resource"] = args["resource"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securitycenter.folders.securityHealthAnalyticsSettings.customModules.simulate",
            "path": "v1/{+parent}/customModules:simulate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
