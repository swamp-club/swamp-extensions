// Auto-generated extension model for @swamp/gcp/apihub/deployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud API hub Deployments.
 *
 * Details of the deployment where APIs are hosted. A deployment could represent an Apigee proxy, API gateway, other Google Cloud services or non-Google Cloud services as well. A deployment entity is a root level entity in the API hub and exists independent of any API.
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
  return `${parent}/deployments/${shortName}`;
}

const BASE_URL = "https://apihub.googleapis.com/";

const GET_CONFIG = {
  "id": "apihub.projects.locations.deployments.get",
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
  "id": "apihub.projects.locations.deployments.create",
  "path": "v1/{+parent}/deployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "deploymentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apihub.projects.locations.deployments.patch",
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
  "id": "apihub.projects.locations.deployments.delete",
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
    "Optional. The list of user defined attributes associated with the deployment resource. The key is the attribute name. It will be of the format: `projects/{project}/locations/{location}/attributes/{attribute}`. The value is the attribute values associated with the resource.",
  ).optional(),
  deploymentType: z.object({
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
    "Optional. The description of the deployment.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the deployment.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  endpoints: z.array(z.string()).describe(
    "Required. The endpoints at which this deployment resource is listening for API requests. This could be a list of complete URIs, hostnames or an IP addresses.",
  ).optional(),
  environment: z.object({
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
  managementUrl: z.object({
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
    "Identifier. The name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}`",
  ).optional(),
  resourceUri: z.string().describe(
    "Required. The resource URI identifies the deployment within its gateway. For Apigee gateways, its recommended to use the format: organizations/{org}/environments/{env}/apis/{api}. For ex: if a proxy with name `orders` is deployed in `staging` environment of `cymbal` organization, the resource URI would be: `organizations/cymbal/environments/staging/apis/orders`.",
  ).optional(),
  slo: z.object({
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
  sourceEnvironment: z.string().describe(
    "Optional. The environment at source for the deployment. For example: prod, dev, staging, etc.",
  ).optional(),
  sourceProject: z.string().describe(
    "Optional. The project to which the deployment belongs. For Google Cloud gateways, this will refer to the project identifier. For others like Edge/OPDK, this will refer to the org identifier.",
  ).optional(),
  sourceUri: z.object({
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
  deploymentId: z.string().describe(
    "Optional. The ID to use for the deployment resource, which will become the final component of the deployment's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another deployment resource in the API hub. * If not provided, a system generated id will be used. This value should be 4-500 characters, and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  apiVersions: z.array(z.string()).optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  deploymentType: z.object({
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
  description: z.string().optional(),
  displayName: z.string().optional(),
  documentation: z.object({
    externalUri: z.string(),
  }).optional(),
  endpoints: z.array(z.string()).optional(),
  environment: z.object({
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
  managementUrl: z.object({
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
  resourceUri: z.string().optional(),
  slo: z.object({
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
  sourceEnvironment: z.string().optional(),
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
  sourceProject: z.string().optional(),
  sourceUri: z.object({
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
    "Optional. The list of user defined attributes associated with the deployment resource. The key is the attribute name. It will be of the format: `projects/{project}/locations/{location}/attributes/{attribute}`. The value is the attribute values associated with the resource.",
  ).optional(),
  deploymentType: z.object({
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
    "Optional. The description of the deployment.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the deployment.",
  ).optional(),
  documentation: z.object({
    externalUri: z.string().describe(
      "Optional. The uri of the externally hosted documentation.",
    ).optional(),
  }).describe("Documentation details.").optional(),
  endpoints: z.array(z.string()).describe(
    "Required. The endpoints at which this deployment resource is listening for API requests. This could be a list of complete URIs, hostnames or an IP addresses.",
  ).optional(),
  environment: z.object({
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
  managementUrl: z.object({
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
    "Identifier. The name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}`",
  ).optional(),
  resourceUri: z.string().describe(
    "Required. The resource URI identifies the deployment within its gateway. For Apigee gateways, its recommended to use the format: organizations/{org}/environments/{env}/apis/{api}. For ex: if a proxy with name `orders` is deployed in `staging` environment of `cymbal` organization, the resource URI would be: `organizations/cymbal/environments/staging/apis/orders`.",
  ).optional(),
  slo: z.object({
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
  sourceEnvironment: z.string().describe(
    "Optional. The environment at source for the deployment. For example: prod, dev, staging, etc.",
  ).optional(),
  sourceProject: z.string().describe(
    "Optional. The project to which the deployment belongs. For Google Cloud gateways, this will refer to the project identifier. For others like Edge/OPDK, this will refer to the org identifier.",
  ).optional(),
  sourceUri: z.object({
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
  deploymentId: z.string().describe(
    "Optional. The ID to use for the deployment resource, which will become the final component of the deployment's resource name. This field is optional. * If provided, the same will be used. The service will throw an error if the specified id is already used by another deployment resource in the API hub. * If not provided, a system generated id will be used. This value should be 4-500 characters, and valid characters are /a-z[0-9]-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud API hub Deployments. Registered at `@swamp/gcp/apihub/deployments`. */
export const model = {
  type: "@swamp/gcp/apihub/deployments",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Details of the deployment where APIs are hosted. A deployment could represent...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deployments",
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
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
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
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["managementUrl"] !== undefined) {
          body["managementUrl"] = g["managementUrl"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["resourceUri"] !== undefined) {
          body["resourceUri"] = g["resourceUri"];
        }
        if (g["slo"] !== undefined) body["slo"] = g["slo"];
        if (g["sourceEnvironment"] !== undefined) {
          body["sourceEnvironment"] = g["sourceEnvironment"];
        }
        if (g["sourceProject"] !== undefined) {
          body["sourceProject"] = g["sourceProject"];
        }
        if (g["sourceUri"] !== undefined) body["sourceUri"] = g["sourceUri"];
        if (g["deploymentId"] !== undefined) {
          body["deploymentId"] = g["deploymentId"];
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
      description: "Get a deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Update deployments attributes",
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
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
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
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["managementUrl"] !== undefined) {
          body["managementUrl"] = g["managementUrl"];
        }
        if (g["resourceUri"] !== undefined) {
          body["resourceUri"] = g["resourceUri"];
        }
        if (g["slo"] !== undefined) body["slo"] = g["slo"];
        if (g["sourceEnvironment"] !== undefined) {
          body["sourceEnvironment"] = g["sourceEnvironment"];
        }
        if (g["sourceProject"] !== undefined) {
          body["sourceProject"] = g["sourceProject"];
        }
        if (g["sourceUri"] !== undefined) body["sourceUri"] = g["sourceUri"];
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
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Sync deployments state from GCP",
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
