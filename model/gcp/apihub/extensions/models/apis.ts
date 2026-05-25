// Auto-generated extension model for @swamp/gcp/apihub/apis
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud API hub Apis.
 *
 * An API resource in the API Hub.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/apis/${shortName}`;
}

const BASE_URL = "https://apihub.googleapis.com/";

const GET_CONFIG = {
  "id": "apihub.projects.locations.apis.get",
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
  "id": "apihub.projects.locations.apis.create",
  "path": "v1/{+parent}/apis",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "apiId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apihub.projects.locations.apis.patch",
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
  "id": "apihub.projects.locations.apis.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "apihub.projects.locations.apis.list",
  "path": "v1/{+parent}/apis",
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
  apiFunctionalRequirements: z.object({
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
  apiRequirements: z.object({
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
  apiStyle: z.object({
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
  apiTechnicalRequirements: z.object({
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
    "Optional. The list of user defined attributes associated with the API resource. The key is the attribute name. It will be of the format: `projects/{project}/locations/{location}/attributes/{attribute}`. The value is the attribute values associated with the resource.",
  ).optional(),
  businessUnit: z.object({
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
  description: z.string().describe(
    "Optional. The description of the API resource.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the API resource.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  fingerprint: z.string().describe(
    "Optional. Fingerprint of the API resource. This must be unique for each API resource. It can neither be unset nor be updated to an existing fingerprint of another API resource.",
  ).optional(),
  maturityLevel: z.object({
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
  name: z.string().describe(
    "Identifier. The name of the API resource in the API Hub. Format: `projects/{project}/locations/{location}/apis/{api}`",
  ).optional(),
  owner: z.object({
    displayName: z.string().describe("Optional. The name of the owner.")
      .optional(),
    email: z.string().describe("Required. The email of the owner.").optional(),
  }).describe("Owner details.").optional(),
  selectedVersion: z.string().describe(
    "Optional. The selected version for an API resource. This can be used when special handling is needed on client side for particular version of the API. Format is `projects/{project}/locations/{location}/apis/{api}/versions/{version}`",
  ).optional(),
  targetUser: z.object({
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
  team: z.object({
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
  apiId: z.string().describe(
    "Optional. The ID to use for the API resource, which will become the final component of the API's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another API resource in the API hub. * If not provided, a system generated id will be used. This value should be 4-500 characters, and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  apiFunctionalRequirements: z.object({
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
  apiRequirements: z.object({
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
  apiStyle: z.object({
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
  apiTechnicalRequirements: z.object({
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
  attributes: z.record(z.string(), z.unknown()).optional(),
  businessUnit: z.object({
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
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  documentation: z.object({
    externalUri: z.string(),
  }).optional(),
  fingerprint: z.string().optional(),
  maturityLevel: z.object({
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
  name: z.string(),
  owner: z.object({
    displayName: z.string(),
    email: z.string(),
  }).optional(),
  selectedVersion: z.string().optional(),
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
  targetUser: z.object({
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
  team: z.object({
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
  versions: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  apiFunctionalRequirements: z.object({
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
  apiRequirements: z.object({
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
  apiStyle: z.object({
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
  apiTechnicalRequirements: z.object({
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
    "Optional. The list of user defined attributes associated with the API resource. The key is the attribute name. It will be of the format: `projects/{project}/locations/{location}/attributes/{attribute}`. The value is the attribute values associated with the resource.",
  ).optional(),
  businessUnit: z.object({
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
  description: z.string().describe(
    "Optional. The description of the API resource.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the API resource.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  fingerprint: z.string().describe(
    "Optional. Fingerprint of the API resource. This must be unique for each API resource. It can neither be unset nor be updated to an existing fingerprint of another API resource.",
  ).optional(),
  maturityLevel: z.object({
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
  name: z.string().describe(
    "Identifier. The name of the API resource in the API Hub. Format: `projects/{project}/locations/{location}/apis/{api}`",
  ).optional(),
  owner: z.object({
    displayName: z.string().describe("Optional. The name of the owner.")
      .optional(),
    email: z.string().describe("Required. The email of the owner.").optional(),
  }).describe("Owner details.").optional(),
  selectedVersion: z.string().describe(
    "Optional. The selected version for an API resource. This can be used when special handling is needed on client side for particular version of the API. Format is `projects/{project}/locations/{location}/apis/{api}/versions/{version}`",
  ).optional(),
  targetUser: z.object({
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
  team: z.object({
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
  apiId: z.string().describe(
    "Optional. The ID to use for the API resource, which will become the final component of the API's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another API resource in the API hub. * If not provided, a system generated id will be used. This value should be 4-500 characters, and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud API hub Apis. Registered at `@swamp/gcp/apihub/apis`. */
export const model = {
  type: "@swamp/gcp/apihub/apis",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An API resource in the API Hub.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apis",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["apiFunctionalRequirements"] !== undefined) {
          body["apiFunctionalRequirements"] = g["apiFunctionalRequirements"];
        }
        if (g["apiRequirements"] !== undefined) {
          body["apiRequirements"] = g["apiRequirements"];
        }
        if (g["apiStyle"] !== undefined) body["apiStyle"] = g["apiStyle"];
        if (g["apiTechnicalRequirements"] !== undefined) {
          body["apiTechnicalRequirements"] = g["apiTechnicalRequirements"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["businessUnit"] !== undefined) {
          body["businessUnit"] = g["businessUnit"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["maturityLevel"] !== undefined) {
          body["maturityLevel"] = g["maturityLevel"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["selectedVersion"] !== undefined) {
          body["selectedVersion"] = g["selectedVersion"];
        }
        if (g["targetUser"] !== undefined) body["targetUser"] = g["targetUser"];
        if (g["team"] !== undefined) body["team"] = g["team"];
        if (g["apiId"] !== undefined) body["apiId"] = g["apiId"];
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
      description: "Get a apis",
      arguments: z.object({
        identifier: z.string().describe("The name of the apis"),
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
      description: "Update apis attributes",
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
        if (g["apiFunctionalRequirements"] !== undefined) {
          body["apiFunctionalRequirements"] = g["apiFunctionalRequirements"];
        }
        if (g["apiRequirements"] !== undefined) {
          body["apiRequirements"] = g["apiRequirements"];
        }
        if (g["apiStyle"] !== undefined) body["apiStyle"] = g["apiStyle"];
        if (g["apiTechnicalRequirements"] !== undefined) {
          body["apiTechnicalRequirements"] = g["apiTechnicalRequirements"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["businessUnit"] !== undefined) {
          body["businessUnit"] = g["businessUnit"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentation"] !== undefined) {
          body["documentation"] = g["documentation"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["maturityLevel"] !== undefined) {
          body["maturityLevel"] = g["maturityLevel"];
        }
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["selectedVersion"] !== undefined) {
          body["selectedVersion"] = g["selectedVersion"];
        }
        if (g["targetUser"] !== undefined) body["targetUser"] = g["targetUser"];
        if (g["team"] !== undefined) body["team"] = g["team"];
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
      description: "Delete the apis",
      arguments: z.object({
        identifier: z.string().describe("The name of the apis"),
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
      description: "Sync apis state from GCP",
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
    list: {
      description: "List apis resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. An expression that filters the list of ApiResources. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string. The comparison operator must be one of: `<`, `>`, `:` or `=`. Filters are not case sensitive. The following fields in the `ApiResource` are eligible for filtering: * `owner.email` - The email of the team which owns the ApiResource. Allowed comparison operators: `=`. * `create_time` - The time at which the ApiResource was created. The value should be in the (RFC3339)[https://tools.ietf.org/html/rfc3339] format. Allowed comparison operators: `>` and `<`. * `display_name` - The display name of the ApiResource. Allowed comparison operators: `=`. * `target_user.enum_values.values.id` - The allowed value id of the target users attribute associated with the ApiResource. Allowed comparison operator is `:`. * `target_user.enum_values.values.display_name` - The allowed value display name of the target users attribute associated with the ApiResource. Allowed comparison operator is `:`. * `team.enum_values.values.id` - The allowed value id of the team attribute associated with the ApiResource. Allowed comparison operator is `:`. * `team.enum_values.values.display_name` - The allowed value display name of the team attribute associated with the ApiResource. Allowed comparison operator is `:`. * `business_unit.enum_values.values.id` - The allowed value id of the business unit attribute associated with the ApiResource. Allowed comparison operator is `:`. * `business_unit.enum_values.values.display_name` - The allowed value display name of the business unit attribute associated with the ApiResource. Allowed comparison operator is `:`. * `maturity_level.enum_values.values.id` - The allowed value id of the maturity level attribute associated with the ApiResource. Allowed comparison operator is `:`. * `maturity_level.enum_values.values.display_name` - The allowed value display name of the maturity level attribute associated with the ApiResource. Allowed comparison operator is `:`. * `api_style.enum_values.values.id` - The allowed value id of the api style attribute associated with the ApiResource. Allowed comparison operator is `:`. * `api_style.enum_values.values.display_name` - The allowed value display name of the api style attribute associated with the ApiResource. Allowed comparison operator is `:`. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.enum_values.values.id` - The allowed value id of the user defined enum attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-enum-id is a placeholder that can be replaced with any user defined enum attribute name. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.enum_values.values.display_name` - The allowed value display name of the user defined enum attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-enum-display-name is a placeholder that can be replaced with any user defined enum attribute enum name. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.string_values.values` - The allowed value of the user defined string attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-string is a placeholder that can be replaced with any user defined string attribute name. * `attributes.projects/test-project-id/locations/test-location-id/ attributes/user-defined-attribute-id.json_values.values` - The allowed value of the user defined JSON attribute associated with the Resource. Allowed comparison operator is `:`. Here user-defined-attribute-json is a placeholder that can be replaced with any user defined JSON attribute name. A filter function is also supported in the filter string. The filter function is `id(name)`. The `id(name)` function returns the id of the resource name. For example, `id(name) = \\"api-1\\"` is equivalent to `name = \\"projects/test-project-id/locations/test-location-id/apis/api-1\\"` provided the parent is `projects/test-project-id/locations/test-location-id`. Another supported filter function is `plugins(source_metadata)`. This function filters for resources that are associated with a specific plugin. For example, `plugins(source_metadata) : "projects/test-project-id/locations/test-location-id/plugins/test-plugin-id"` will return resources sourced from the given plugin. Expressions are combined with either `AND` logic operator or `OR` logical operator but not both of them together i.e. only one of the `AND` or `OR` operator can be used throughout the filter string and both the operators cannot be used together. No other logical operators are supported. At most three filter fields are allowed in the filter string and if provided more than that then `INVALID_ARGUMENT` error is returned by the API. Here are a few examples: * `owner.email = \\"apihub@google.com\\"` - - The owner team email is _apihub@google.com_. * `owner.email = \\"apihub@google.com\\" AND create_time < \\"2021-08-15T14:50:00Z\\" AND create_time > \\"2021-08-10T12:00:00Z\\"` - The owner team email is _apihub@google.com_ and the api was created before _2021-08-15 14:50:00 UTC_ and after _2021-08-10 12:00:00 UTC_. * `owner.email = \\"apihub@google.com\\" OR team.enum_values.values.id: apihub-team-id` - The filter string specifies the APIs where the owner team email is _apihub@google.com_ or the id of the allowed value associated with the team attribute is _apihub-team-id_. * `owner.email = \\"apihub@google.com\\" OR team.enum_values.values.display_name: ApiHub Team` - The filter string specifies the APIs where the owner team email is _apihub@google.com_ or the display name of the allowed value associated with the team attribute is `ApiHub Team`. * `owner.email = \\"apihub@google.com\\" AND attributes.projects/test-project-id/locations/test-location-id/ attributes/17650f90-4a29-4971-b3c0-d5532da3764b.enum_values.values.id: test_enum_id AND attributes.projects/test-project-id/locations/test-location-id/ attributes/1765\\0f90-4a29-5431-b3d0-d5532da3764c.string_values.values: test_string_value` - The filter string specifies the APIs where the owner team email is _apihub@google.com_ and the id of the allowed value associated with the user defined attribute of type enum is _test_enum_id_ and the value of the user defined attribute of type string is _test_..',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of API resources to return. The service may return fewer than this value. If unspecified, at most 50 Apis will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          "apis",
          (args.maxPages as number | undefined) ?? 10,
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
  },
};
