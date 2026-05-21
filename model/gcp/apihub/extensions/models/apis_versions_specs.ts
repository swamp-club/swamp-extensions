// Auto-generated extension model for @swamp/gcp/apihub/apis-versions-specs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud API hub Apis.Versions.Specs.
 *
 * Represents a spec associated with an API version in the API Hub. Note that specs of various types can be uploaded, however parsing of details is supported for OpenAPI spec currently.
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
  return `${parent}/specs/${shortName}`;
}

const BASE_URL = "https://apihub.googleapis.com/";

const GET_CONFIG = {
  "id": "apihub.projects.locations.apis.versions.specs.get",
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
  "id": "apihub.projects.locations.apis.versions.specs.create",
  "path": "v1/{+parent}/specs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "specId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apihub.projects.locations.apis.versions.specs.patch",
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
  "id": "apihub.projects.locations.apis.versions.specs.delete",
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
  "id": "apihub.projects.locations.apis.versions.specs.list",
  "path": "v1/{+parent}/specs",
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
  attributes: z.record(
    z.string(),
    z.object({
      attribute: z.string().describe(
        "Output only. The name of the attribute. Format: projects/{project}/locations/{location}/attributes/{attribute}",
      ).optional(),
      enumValues: z.object({
        values: z.array(z.object({
          description: z.unknown().describe(
            "Optional. The detailed description of the allowed value.",
          ).optional(),
          displayName: z.unknown().describe(
            "Required. The display name of the allowed value.",
          ).optional(),
          id: z.unknown().describe(
            "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 4-63 characters, and valid characters are /a-z-/.",
          ).optional(),
          immutable: z.unknown().describe(
            "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
          ).optional(),
        })).describe(
          "Required. The attribute values in case attribute data type is enum.",
        ).optional(),
      }).describe("The attribute values of data type enum.").optional(),
      jsonValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe("The attribute values of data type string or JSON.")
        .optional(),
      stringValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe("The attribute values of data type string or JSON.")
        .optional(),
      uriValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe("The attribute values of data type string or JSON.")
        .optional(),
    }),
  ).describe(
    "Optional. The list of user defined attributes associated with the spec. The key is the attribute name. It will be of the format: `projects/{project}/locations/{location}/attributes/{attribute}`. The value is the attribute values associated with the resource.",
  ).optional(),
  contents: z.object({
    contents: z.string().describe("Required. The contents of the spec.")
      .optional(),
    mimeType: z.string().describe(
      "Required. The mime type of the content for example application/json, application/yaml, application/wsdl etc.",
    ).optional(),
  }).describe("The spec contents.").optional(),
  details: z.object({
    description: z.string().describe(
      "Output only. The description of the spec.",
    ).optional(),
    openApiSpecDetails: z.object({
      format: z.enum([
        "FORMAT_UNSPECIFIED",
        "OPEN_API_SPEC_2_0",
        "OPEN_API_SPEC_3_0",
        "OPEN_API_SPEC_3_1",
      ]).describe("Output only. The format of the spec.").optional(),
      owner: z.object({
        displayName: z.string().describe("Optional. The name of the owner.")
          .optional(),
        email: z.string().describe("Required. The email of the owner.")
          .optional(),
      }).describe("Owner details.").optional(),
      version: z.string().describe(
        "Output only. The version in the spec. This maps to `info.version` in OpenAPI spec.",
      ).optional(),
    }).describe(
      "OpenApiSpecDetails contains the details parsed from an OpenAPI spec in addition to the fields mentioned in SpecDetails.",
    ).optional(),
  }).describe(
    "SpecDetails contains the details parsed from supported spec types.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the spec. This can contain the file name of the spec.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  lintResponse: z.object({
    createTime: z.string().describe(
      "Required. Timestamp when the linting response was generated.",
    ).optional(),
    issues: z.array(z.object({
      code: z.string().describe(
        "Required. Rule code unique to each rule defined in linter.",
      ).optional(),
      message: z.string().describe(
        "Required. Human-readable message describing the issue found by the linter.",
      ).optional(),
      path: z.array(z.string()).describe(
        "Required. An array of strings indicating the location in the analyzed document where the rule was triggered.",
      ).optional(),
      range: z.object({
        end: z.object({
          character: z.unknown().describe(
            "Required. Character position within the line (zero-indexed).",
          ).optional(),
          line: z.unknown().describe("Required. Line number (zero-indexed).")
            .optional(),
        }).describe("Point within the file (line and character).").optional(),
        start: z.object({
          character: z.unknown().describe(
            "Required. Character position within the line (zero-indexed).",
          ).optional(),
          line: z.unknown().describe("Required. Line number (zero-indexed).")
            .optional(),
        }).describe("Point within the file (line and character).").optional(),
      }).describe("Object describing where in the file the issue was found.")
        .optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "SEVERITY_ERROR",
        "SEVERITY_WARNING",
        "SEVERITY_INFO",
        "SEVERITY_HINT",
      ]).describe("Required. Severity level of the rule violation.").optional(),
    })).describe("Optional. Array of issues found in the analyzed document.")
      .optional(),
    linter: z.enum(["LINTER_UNSPECIFIED", "SPECTRAL", "OTHER"]).describe(
      "Required. Name of the linter used.",
    ).optional(),
    source: z.string().describe("Required. Name of the linting application.")
      .optional(),
    state: z.enum([
      "LINT_STATE_UNSPECIFIED",
      "LINT_STATE_SUCCESS",
      "LINT_STATE_ERROR",
    ]).describe(
      "Required. Lint state represents success or failure for linting.",
    ).optional(),
    summary: z.array(z.object({
      count: z.number().int().describe(
        "Required. Count of issues with the given severity.",
      ).optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "SEVERITY_ERROR",
        "SEVERITY_WARNING",
        "SEVERITY_INFO",
        "SEVERITY_HINT",
      ]).describe("Required. Severity of the issue.").optional(),
    })).describe(
      "Optional. Summary of all issue types and counts for each severity level.",
    ).optional(),
  }).describe("LintResponse contains the response from the linter.").optional(),
  name: z.string().describe(
    "Identifier. The name of the spec. Format: `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}`",
  ).optional(),
  parsingMode: z.enum(["PARSING_MODE_UNSPECIFIED", "RELAXED", "STRICT"])
    .describe(
      "Optional. Input only. Enum specifying the parsing mode for OpenAPI Specification (OAS) parsing.",
    ).optional(),
  sourceUri: z.string().describe(
    "Optional. The URI of the spec source in case file is uploaded from an external version control system.",
  ).optional(),
  specType: z.object({
    attribute: z.string().describe(
      "Output only. The name of the attribute. Format: projects/{project}/locations/{location}/attributes/{attribute}",
    ).optional(),
    enumValues: z.object({
      values: z.array(z.object({
        description: z.string().describe(
          "Optional. The detailed description of the allowed value.",
        ).optional(),
        displayName: z.string().describe(
          "Required. The display name of the allowed value.",
        ).optional(),
        id: z.string().describe(
          "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 4-63 characters, and valid characters are /a-z-/.",
        ).optional(),
        immutable: z.boolean().describe(
          "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
        ).optional(),
      })).describe(
        "Required. The attribute values in case attribute data type is enum.",
      ).optional(),
    }).describe("The attribute values of data type enum.").optional(),
    jsonValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    stringValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    uriValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
  }).describe("The attribute values associated with resource.").optional(),
  specId: z.string().describe(
    "Optional. The ID to use for the spec, which will become the final component of the spec's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another spec in the API resource. * If not provided, a system generated id will be used. This value should be 4-500 characters, overall resource name which will be of format `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}`, its length is limited to 1000 characters and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  additionalSpecContents: z.array(z.object({
    createTime: z.string(),
    labels: z.record(z.string(), z.unknown()),
    specContentType: z.string(),
    specContents: z.object({
      contents: z.string(),
      mimeType: z.string(),
    }),
    updateTime: z.string(),
  })).optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  contents: z.object({
    contents: z.string(),
    mimeType: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  details: z.object({
    description: z.string(),
    openApiSpecDetails: z.object({
      format: z.string(),
      owner: z.object({
        displayName: z.string(),
        email: z.string(),
      }),
      version: z.string(),
    }),
  }).optional(),
  displayName: z.string().optional(),
  documentation: z.object({
    externalUri: z.string(),
  }).optional(),
  lintResponse: z.object({
    createTime: z.string(),
    issues: z.array(z.object({
      code: z.string(),
      message: z.string(),
      path: z.array(z.string()),
      range: z.object({
        end: z.object({
          character: z.unknown(),
          line: z.unknown(),
        }),
        start: z.object({
          character: z.unknown(),
          line: z.unknown(),
        }),
      }),
      severity: z.string(),
    })),
    linter: z.string(),
    source: z.string(),
    state: z.string(),
    summary: z.array(z.object({
      count: z.number(),
      severity: z.string(),
    })),
  }).optional(),
  name: z.string(),
  parsingMode: z.string().optional(),
  sourceMetadata: z.array(z.object({
    originalResourceCreateTime: z.string(),
    originalResourceId: z.string(),
    originalResourceUpdateTime: z.string(),
    pluginInstanceActionSource: z.object({
      actionId: z.string(),
      pluginInstance: z.string(),
    }),
    sourceType: z.string(),
  })).optional(),
  sourceUri: z.string().optional(),
  specType: z.object({
    attribute: z.string(),
    enumValues: z.object({
      values: z.array(z.object({
        description: z.string(),
        displayName: z.string(),
        id: z.string(),
        immutable: z.boolean(),
      })),
    }),
    jsonValues: z.object({
      values: z.array(z.string()),
    }),
    stringValues: z.object({
      values: z.array(z.string()),
    }),
    uriValues: z.object({
      values: z.array(z.string()),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  attributes: z.record(
    z.string(),
    z.object({
      attribute: z.string().describe(
        "Output only. The name of the attribute. Format: projects/{project}/locations/{location}/attributes/{attribute}",
      ).optional(),
      enumValues: z.object({
        values: z.array(z.object({
          description: z.unknown().describe(
            "Optional. The detailed description of the allowed value.",
          ).optional(),
          displayName: z.unknown().describe(
            "Required. The display name of the allowed value.",
          ).optional(),
          id: z.unknown().describe(
            "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 4-63 characters, and valid characters are /a-z-/.",
          ).optional(),
          immutable: z.unknown().describe(
            "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
          ).optional(),
        })).describe(
          "Required. The attribute values in case attribute data type is enum.",
        ).optional(),
      }).describe("The attribute values of data type enum.").optional(),
      jsonValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe("The attribute values of data type string or JSON.")
        .optional(),
      stringValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe("The attribute values of data type string or JSON.")
        .optional(),
      uriValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe("The attribute values of data type string or JSON.")
        .optional(),
    }),
  ).describe(
    "Optional. The list of user defined attributes associated with the spec. The key is the attribute name. It will be of the format: `projects/{project}/locations/{location}/attributes/{attribute}`. The value is the attribute values associated with the resource.",
  ).optional(),
  contents: z.object({
    contents: z.string().describe("Required. The contents of the spec.")
      .optional(),
    mimeType: z.string().describe(
      "Required. The mime type of the content for example application/json, application/yaml, application/wsdl etc.",
    ).optional(),
  }).describe("The spec contents.").optional(),
  details: z.object({
    description: z.string().describe(
      "Output only. The description of the spec.",
    ).optional(),
    openApiSpecDetails: z.object({
      format: z.enum([
        "FORMAT_UNSPECIFIED",
        "OPEN_API_SPEC_2_0",
        "OPEN_API_SPEC_3_0",
        "OPEN_API_SPEC_3_1",
      ]).describe("Output only. The format of the spec.").optional(),
      owner: z.object({
        displayName: z.string().describe("Optional. The name of the owner.")
          .optional(),
        email: z.string().describe("Required. The email of the owner.")
          .optional(),
      }).describe("Owner details.").optional(),
      version: z.string().describe(
        "Output only. The version in the spec. This maps to `info.version` in OpenAPI spec.",
      ).optional(),
    }).describe(
      "OpenApiSpecDetails contains the details parsed from an OpenAPI spec in addition to the fields mentioned in SpecDetails.",
    ).optional(),
  }).describe(
    "SpecDetails contains the details parsed from supported spec types.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the spec. This can contain the file name of the spec.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  lintResponse: z.object({
    createTime: z.string().describe(
      "Required. Timestamp when the linting response was generated.",
    ).optional(),
    issues: z.array(z.object({
      code: z.string().describe(
        "Required. Rule code unique to each rule defined in linter.",
      ).optional(),
      message: z.string().describe(
        "Required. Human-readable message describing the issue found by the linter.",
      ).optional(),
      path: z.array(z.string()).describe(
        "Required. An array of strings indicating the location in the analyzed document where the rule was triggered.",
      ).optional(),
      range: z.object({
        end: z.object({
          character: z.unknown().describe(
            "Required. Character position within the line (zero-indexed).",
          ).optional(),
          line: z.unknown().describe("Required. Line number (zero-indexed).")
            .optional(),
        }).describe("Point within the file (line and character).").optional(),
        start: z.object({
          character: z.unknown().describe(
            "Required. Character position within the line (zero-indexed).",
          ).optional(),
          line: z.unknown().describe("Required. Line number (zero-indexed).")
            .optional(),
        }).describe("Point within the file (line and character).").optional(),
      }).describe("Object describing where in the file the issue was found.")
        .optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "SEVERITY_ERROR",
        "SEVERITY_WARNING",
        "SEVERITY_INFO",
        "SEVERITY_HINT",
      ]).describe("Required. Severity level of the rule violation.").optional(),
    })).describe("Optional. Array of issues found in the analyzed document.")
      .optional(),
    linter: z.enum(["LINTER_UNSPECIFIED", "SPECTRAL", "OTHER"]).describe(
      "Required. Name of the linter used.",
    ).optional(),
    source: z.string().describe("Required. Name of the linting application.")
      .optional(),
    state: z.enum([
      "LINT_STATE_UNSPECIFIED",
      "LINT_STATE_SUCCESS",
      "LINT_STATE_ERROR",
    ]).describe(
      "Required. Lint state represents success or failure for linting.",
    ).optional(),
    summary: z.array(z.object({
      count: z.number().int().describe(
        "Required. Count of issues with the given severity.",
      ).optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "SEVERITY_ERROR",
        "SEVERITY_WARNING",
        "SEVERITY_INFO",
        "SEVERITY_HINT",
      ]).describe("Required. Severity of the issue.").optional(),
    })).describe(
      "Optional. Summary of all issue types and counts for each severity level.",
    ).optional(),
  }).describe("LintResponse contains the response from the linter.").optional(),
  name: z.string().describe(
    "Identifier. The name of the spec. Format: `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}`",
  ).optional(),
  parsingMode: z.enum(["PARSING_MODE_UNSPECIFIED", "RELAXED", "STRICT"])
    .describe(
      "Optional. Input only. Enum specifying the parsing mode for OpenAPI Specification (OAS) parsing.",
    ).optional(),
  sourceUri: z.string().describe(
    "Optional. The URI of the spec source in case file is uploaded from an external version control system.",
  ).optional(),
  specType: z.object({
    attribute: z.string().describe(
      "Output only. The name of the attribute. Format: projects/{project}/locations/{location}/attributes/{attribute}",
    ).optional(),
    enumValues: z.object({
      values: z.array(z.object({
        description: z.string().describe(
          "Optional. The detailed description of the allowed value.",
        ).optional(),
        displayName: z.string().describe(
          "Required. The display name of the allowed value.",
        ).optional(),
        id: z.string().describe(
          "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 4-63 characters, and valid characters are /a-z-/.",
        ).optional(),
        immutable: z.boolean().describe(
          "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
        ).optional(),
      })).describe(
        "Required. The attribute values in case attribute data type is enum.",
      ).optional(),
    }).describe("The attribute values of data type enum.").optional(),
    jsonValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    stringValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
    uriValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe("The attribute values of data type string or JSON.").optional(),
  }).describe("The attribute values associated with resource.").optional(),
  specId: z.string().describe(
    "Optional. The ID to use for the spec, which will become the final component of the spec's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another spec in the API resource. * If not provided, a system generated id will be used. This value should be 4-500 characters, overall resource name which will be of format `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}`, its length is limited to 1000 characters and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud API hub Apis.Versions.Specs. Registered at `@swamp/gcp/apihub/apis-versions-specs`. */
export const model = {
  type: "@swamp/gcp/apihub/apis-versions-specs",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a spec associated with an API version in the API Hub. Note that sp...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a specs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["contents"] !== undefined) body["contents"] = g["contents"];
        if (g["details"] !== undefined) body["details"] = g["details"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["lintResponse"] !== undefined) {
          body["lintResponse"] = g["lintResponse"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parsingMode"] !== undefined) {
          body["parsingMode"] = g["parsingMode"];
        }
        if (g["sourceUri"] !== undefined) body["sourceUri"] = g["sourceUri"];
        if (g["specType"] !== undefined) body["specType"] = g["specType"];
        if (g["specId"] !== undefined) body["specId"] = g["specId"];
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
      description: "Get a specs",
      arguments: z.object({
        identifier: z.string().describe("The name of the specs"),
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
      description: "Update specs attributes",
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
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["contents"] !== undefined) body["contents"] = g["contents"];
        if (g["details"] !== undefined) body["details"] = g["details"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["lintResponse"] !== undefined) {
          body["lintResponse"] = g["lintResponse"];
        }
        if (g["parsingMode"] !== undefined) {
          body["parsingMode"] = g["parsingMode"];
        }
        if (g["sourceUri"] !== undefined) body["sourceUri"] = g["sourceUri"];
        if (g["specType"] !== undefined) body["specType"] = g["specType"];
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
      description: "Delete the specs",
      arguments: z.object({
        identifier: z.string().describe("The name of the specs"),
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
      description: "Sync specs state from GCP",
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
    fetch_additional_spec_content: {
      description: "fetch additional spec content",
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
              "apihub.projects.locations.apis.versions.specs.fetchAdditionalSpecContent",
            "path": "v1/{+name}:fetchAdditionalSpecContent",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "specContentType": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_contents: {
      description: "get contents",
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
            "id": "apihub.projects.locations.apis.versions.specs.getContents",
            "path": "v1/{+name}:contents",
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
    lint: {
      description: "lint",
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
            "id": "apihub.projects.locations.apis.versions.specs.lint",
            "path": "v1/{+name}:lint",
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
