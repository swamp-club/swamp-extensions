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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
            "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 3-500 characters, and valid characters are /a-z[0-9]-_/.",
          ).optional(),
          immutable: z.unknown().describe(
            "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
          ).optional(),
        })).describe(
          "Required. The attribute values in case attribute data type is enum.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is enum.",
      ).optional(),
      jsonValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is JSON.",
      ).optional(),
      stringValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is string.",
      ).optional(),
      uriValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is URL, URI or IP, like gs://bucket-name/object-name.",
      ).optional(),
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
  }).describe("Optional. Input only. The contents of the uploaded spec.")
    .optional(),
  deployments: z.array(z.string()).describe(
    "Optional. The deployments linked directly to this spec. Format is `projects/{project}/locations/{location}/deployments/{deployment}`",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the spec. This can contain the file name of the spec.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe(
    "Optional. The documentation of the spec. For OpenAPI spec, this will be populated from `externalDocs` in OpenAPI spec.",
  ).optional(),
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
        }).describe("Required. End of the issue.").optional(),
        start: z.object({
          character: z.unknown().describe(
            "Required. Character position within the line (zero-indexed).",
          ).optional(),
          line: z.unknown().describe("Required. Line number (zero-indexed).")
            .optional(),
        }).describe("Required. Start of the issue.").optional(),
      }).describe(
        "Required. Object describing where in the file the issue was found.",
      ).optional(),
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
  }).describe("Optional. The lint response for the spec.").optional(),
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
          "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 3-500 characters, and valid characters are /a-z[0-9]-_/.",
        ).optional(),
        immutable: z.boolean().describe(
          "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
        ).optional(),
      })).describe(
        "Required. The attribute values in case attribute data type is enum.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is enum.",
    ).optional(),
    jsonValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is JSON.",
    ).optional(),
    stringValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is string.",
    ).optional(),
    uriValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is URL, URI or IP, like gs://bucket-name/object-name.",
    ).optional(),
  }).describe(
    "Required. The type of spec. The value should be one of the allowed values defined for `projects/{project}/locations/{location}/attributes/system-spec-type` attribute. The number of values for this attribute will be based on the cardinality of the attribute. The same can be retrieved via GetAttribute API. Note, this field is mandatory if content is provided.",
  ).optional(),
  specId: z.string().describe(
    "Optional. The ID to use for the spec, which will become the final component of the spec's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another spec in the API resource. * If not provided, a system generated id will be used. This value should be 4-500 characters, overall resource name which will be of format `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}`, its length is limited to 1000 characters and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  deployments: z.array(z.string()).optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
            "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 3-500 characters, and valid characters are /a-z[0-9]-_/.",
          ).optional(),
          immutable: z.unknown().describe(
            "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
          ).optional(),
        })).describe(
          "Required. The attribute values in case attribute data type is enum.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is enum.",
      ).optional(),
      jsonValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is JSON.",
      ).optional(),
      stringValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is string.",
      ).optional(),
      uriValues: z.object({
        values: z.array(z.string()).describe(
          "Required. The attribute values in case attribute data type is string or JSON.",
        ).optional(),
      }).describe(
        "The attribute values associated with a resource in case attribute data type is URL, URI or IP, like gs://bucket-name/object-name.",
      ).optional(),
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
  }).describe("Optional. Input only. The contents of the uploaded spec.")
    .optional(),
  deployments: z.array(z.string()).describe(
    "Optional. The deployments linked directly to this spec. Format is `projects/{project}/locations/{location}/deployments/{deployment}`",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the spec. This can contain the file name of the spec.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe(
    "Optional. The documentation of the spec. For OpenAPI spec, this will be populated from `externalDocs` in OpenAPI spec.",
  ).optional(),
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
        }).describe("Required. End of the issue.").optional(),
        start: z.object({
          character: z.unknown().describe(
            "Required. Character position within the line (zero-indexed).",
          ).optional(),
          line: z.unknown().describe("Required. Line number (zero-indexed).")
            .optional(),
        }).describe("Required. Start of the issue.").optional(),
      }).describe(
        "Required. Object describing where in the file the issue was found.",
      ).optional(),
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
  }).describe("Optional. The lint response for the spec.").optional(),
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
          "Required. The ID of the allowed value. * If provided, the same will be used. The service will throw an error if the specified id is already used by another allowed value in the same attribute resource. * If not provided, a system generated id derived from the display name will be used. In this case, the service will handle conflict resolution by adding a system generated suffix in case of duplicates. This value should be 3-500 characters, and valid characters are /a-z[0-9]-_/.",
        ).optional(),
        immutable: z.boolean().describe(
          "Optional. When set to true, the allowed value cannot be updated or deleted by the user. It can only be true for System defined attributes.",
        ).optional(),
      })).describe(
        "Required. The attribute values in case attribute data type is enum.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is enum.",
    ).optional(),
    jsonValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is JSON.",
    ).optional(),
    stringValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is string.",
    ).optional(),
    uriValues: z.object({
      values: z.array(z.string()).describe(
        "Required. The attribute values in case attribute data type is string or JSON.",
      ).optional(),
    }).describe(
      "The attribute values associated with a resource in case attribute data type is URL, URI or IP, like gs://bucket-name/object-name.",
    ).optional(),
  }).describe(
    "Required. The type of spec. The value should be one of the allowed values defined for `projects/{project}/locations/{location}/attributes/system-spec-type` attribute. The number of values for this attribute will be based on the cardinality of the attribute. The same can be retrieved via GetAttribute API. Note, this field is mandatory if content is provided.",
  ).optional(),
  specId: z.string().describe(
    "Optional. The ID to use for the spec, which will become the final component of the spec's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another spec in the API resource. * If not provided, a system generated id will be used. This value should be 4-500 characters, overall resource name which will be of format `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}`, its length is limited to 1000 characters and valid characters are /a-z[0-9]-_/.",
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

/** Swamp extension model for Google Cloud API hub Apis.Versions.Specs. Registered at `@swamp/gcp/apihub/apis-versions-specs`. */
export const model = {
  type: "@swamp/gcp/apihub/apis-versions-specs",
  version: "2026.09.25.1",
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
      toVersion: "2026.07.21.1",
      description: "Removed: details",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { details: _details, ...rest } = old;
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.09.1",
      description: "Added: deployments",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["contents"] !== undefined) body["contents"] = g["contents"];
        if (g["deployments"] !== undefined) {
          body["deployments"] = g["deployments"];
        }
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
        if (g["specId"] !== undefined) params["specId"] = String(g["specId"]);
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Update specs attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific specs by name (e.g. one discovered by list)",
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
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["contents"] !== undefined) body["contents"] = g["contents"];
        if (g["deployments"] !== undefined) {
          body["deployments"] = g["deployments"];
        }
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
      description: "Delete the specs",
      arguments: z.object({
        identifier: z.string().describe("The name of the specs"),
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
      description: "Sync specs state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific specs by name (e.g. one discovered by list)",
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
      description: "List specs resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. An expression that filters the list of Specs. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string. The comparison operator must be one of: `<`, `>`, `:` or `=`. Filters are not case sensitive. The following fields in the `Spec` are eligible for filtering: * `display_name` - The display name of the Spec. Allowed comparison operators: `=`. * `create_time` - The time at which the Spec was created. The value should be in the (RFC3339)[https://tools.ietf.org/html/rfc3339] format. Allowed comparison operators: `>` and `<`. * `spec_type.enum_values.values.id` - The allowed value id of the spec_type attribute associated with the Spec. Allowed comparison operators: `:`. * `spec_type.enum_values.values.display_name` - The allowed value display name of the spec_type attribute associated with the Spec. Allowed comparison operators: `:`. * `lint_response.json_values.values` - The json value of the lint_response attribute associated with the Spec. Allowed comparison operators: `:`. * `mime_type` - The MIME type of the Spec. Allowed comparison operators: `=`. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.enum_values.values.id` - The allowed value id of the user defined enum attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-enum-id is a placeholder that can be replaced with any user defined enum attribute name. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.enum_values.values.display_name` - The allowed value display name of the user defined enum attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-enum-display-name is a placeholder that can be replaced with any user defined enum attribute enum name. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.string_values.values` - The allowed value of the user defined string attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-string is a placeholder that can be replaced with any user defined string attribute name. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.json_values.values` - The allowed value of the user defined JSON attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-json is a placeholder that can be replaced with any user defined JSON attribute name. Expressions are combined with either `AND` logic operator or `OR` logical operator but not both of them together i.e. only one of the `AND` or `OR` operator can be used throughout the filter string and both the operators cannot be used together. No other logical operators are supported. At most three filter fields are allowed in the filter string and if provided more than that then `INVALID_ARGUMENT` error is returned by the API. Here are a few examples: * `spec_type.enum_values.values.id: rest-id` - The filter string specifies that the id of the allowed value associated with the spec_type attribute is _rest-id_. * `spec_type.enum_values.values.display_name: \\"Rest Display Name\\"` - The filter string specifies that the display name of the allowed value associated with the spec_type attribute is `Rest Display Name`. * `spec_type.enum_values.values.id: grpc-id AND create_time < \\"2021-08-15T14:50:00Z\\" AND create_time > \\"2021-08-10T12:00:00Z\\"` - The id of the allowed value associated with the spec_type attribute is _grpc-id_ and the spec was created before _2021-08-15 14:50:00 UTC_ and after _2021-08-10 12:00:00 UTC_. * `spec_type.enum_values.values.id: rest-id OR spec_type.enum_values.values.id: grpc-id` - The id of the allowed value associated with the spec_type attribute is _rest-id_ or _grpc-id_. * `spec_type.enum_values.values.id: rest-id AND attributes.projects/test-project-id/locations/test-location-id/ attributes/17650f90-4a29-4971-b3c0-d5532da3764b.enum_values.values.id: test` - The filter string specifies that the id of the allowed value associated with the spec_type attribute is _rest-id_ and the id of the allowed value associated with the user defined attribute of type enum is _test_.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of specs to return. The service may return fewer than this value. If unspecified, at most 50 specs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
          "specs",
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
    fetch_additional_spec_content: {
      description: "fetch additional spec content",
      arguments: z.object({
        specContentType: z.any().optional(),
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
        if (args["specContentType"] !== undefined) {
          params["specContentType"] = String(args["specContentType"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_contents: {
      description: "get contents",
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
            "id": "apihub.projects.locations.apis.versions.specs.getContents",
            "path": "v1/{+name}:contents",
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
    lint: {
      description: "lint",
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
            "id": "apihub.projects.locations.apis.versions.specs.lint",
            "path": "v1/{+name}:lint",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
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
