// Auto-generated extension model for @swamp/gcp/apigee/apiproducts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Apiproducts.
 *
 * Gets configuration details for an API product. The API product name required in the request URL is the internal name of the product, not the display name. While they may be the same, it depends on whether the API product was created via the UI or the API. View the list of API products to verify the internal name.
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
  return `${parent}/apiproducts/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.apiproducts.get",
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
  "id": "apigee.organizations.apiproducts.create",
  "path": "v1/{+parent}/apiproducts",
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

const UPDATE_CONFIG = {
  "id": "apigee.organizations.apiproducts.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.apiproducts.delete",
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
  "id": "apigee.organizations.apiproducts.list",
  "path": "v1/{+parent}/apiproducts",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "attributename": {
      "location": "query",
    },
    "attributevalue": {
      "location": "query",
    },
    "count": {
      "location": "query",
    },
    "expand": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "space": {
      "location": "query",
    },
    "startKey": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  apiResources: z.array(z.string()).describe(
    "Comma-separated list of API resources to be bundled in the API product. By default, the resource paths are mapped from the `proxy.pathsuffix` variable. The proxy path suffix is defined as the URI fragment following the ProxyEndpoint base path. For example, if the `apiResources` element is defined to be `/forecastrss` and the base path defined for the API proxy is `/weather`, then only requests to `/weather/forecastrss` are permitted by the API product. You can select a specific path, or you can select all subpaths with the following wildcard: - `/**`: Indicates that all sub-URIs are included. - `/*`: Indicates that only URIs one level down are included. By default, / supports the same resources as /** as well as the base path defined by the API proxy. For example, if the base path of the API proxy is `/v1/weatherapikey`, then the API product supports requests to `/v1/weatherapikey` and to any sub-URIs, such as `/v1/weatherapikey/forecastrss`, `/v1/weatherapikey/region/CA`, and so on. For more information, see Managing API products.",
  ).optional(),
  approvalType: z.string().describe(
    'Flag that specifies how API keys are approved to access the APIs defined by the API product. If set to `manual`, the consumer key is generated and returned in "pending" state. In this case, the API keys won\'t work until they have been explicitly approved. If set to `auto`, the consumer key is generated and returned in "approved" state and can be used immediately. **Note:** Typically, `auto` is used to provide access to free or trial API products that provide limited quota or capabilities.',
  ).optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe(
    "Array of attributes that may be used to extend the default API product profile with customer-specific metadata. You can specify a maximum of 18 attributes. Use this property to specify the access level of the API product as either `public`, `private`, or `internal`. Only products marked `public` are available to developers in the Apigee developer portal. For example, you can set a product to `internal` while it is in development and then change access to `public` when it is ready to release on the portal. API products marked as `private` do not appear on the portal, but can be accessed by external developers.",
  ).optional(),
  createdAt: z.string().describe(
    "Response only. Creation time of this environment as milliseconds since epoch.",
  ).optional(),
  description: z.string().describe(
    "Description of the API product. Include key information about the API product that is not captured by other fields.",
  ).optional(),
  displayName: z.string().describe(
    "Name displayed in the UI or developer portal to developers registering for API access.",
  ).optional(),
  environments: z.array(z.string()).describe(
    "Comma-separated list of environment names to which the API product is bound. Requests to environments that are not listed are rejected. By specifying one or more environments, you can bind the resources listed in the API product to a specific environment, preventing developers from accessing those resources through API proxies deployed in another environment. This setting is used, for example, to prevent resources associated with API proxies in `prod` from being accessed by API proxies deployed in `test`.",
  ).optional(),
  graphqlOperationGroup: z.object({
    operationConfigType: z.string().describe(
      "Flag that specifies whether the configuration is for Apigee API proxy or a remote service. Valid values include `proxy` or `remoteservice`. Defaults to `proxy`. Set to `proxy` when Apigee API proxies are associated with the API product. Set to `remoteservice` when non-Apigee proxies like Istio-Envoy are associated with the API product.",
    ).optional(),
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy endpoint or remote service with which the GraphQL operation and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Custom attributes associated with the operation.")
        .optional(),
      operations: z.array(z.object({
        operation: z.unknown().describe(
          "GraphQL operation name. The name and operation type will be used to apply quotas. If no name is specified, the quota will be applied to all GraphQL operations irrespective of their operation names in the payload.",
        ).optional(),
        operationTypes: z.unknown().describe(
          "Required. GraphQL operation types. Valid values include `query` or `mutation`. **Note**: Apigee does not currently support `subscription` types.",
        ).optional(),
      })).describe(
        "Required. List of GraphQL name/operation type pairs for the proxy or remote service to which quota will be applied. If only operation types are specified, the quota will be applied to all GraphQL requests irrespective of the GraphQL name. **Note**: Currently, you can specify only a single GraphQLOperation. Specifying more than one will cause the operation to fail.",
      ).optional(),
      quota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "Quota contains the essential parameters needed that can be applied on the resources, methods, API source combination associated with this API product. While Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
    })).describe(
      "Required. List of operation configurations for either Apigee API proxies or other remote services that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of graphQL operation configuration details associated with Apigee API proxies or remote services. Remote services are non-Apigee proxies, such as Istio-Envoy.",
  ).optional(),
  grpcOperationGroup: z.object({
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy with which the gRPC operation and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Custom attributes associated with the operation.")
        .optional(),
      methods: z.array(z.string()).describe(
        'List of unqualified gRPC method names for the proxy to which quota will be applied. If this field is empty, the Quota will apply to all operations on the gRPC service defined on the proxy. Example: Given a proxy that is configured to serve com.petstore.PetService, the methods com.petstore.PetService.ListPets and com.petstore.PetService.GetPet would be specified here as simply ["ListPets", "GetPet"].',
      ).optional(),
      quota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "Quota contains the essential parameters needed that can be applied on the resources, methods, API source combination associated with this API product. While Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
      service: z.string().describe(
        "Required. gRPC Service name associated to be associated with the API proxy, on which quota rules can be applied upon.",
      ).optional(),
    })).describe(
      "Required. List of operation configurations for either Apigee API proxies that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of gRPC operation configuration details associated with Apigee API proxies.",
  ).optional(),
  lastModifiedAt: z.string().describe(
    "Response only. Modified time of this environment as milliseconds since epoch.",
  ).optional(),
  llmOperationGroup: z.object({
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy or remote service with which the resources, methods, and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Optional. Custom attributes associated with the operation.")
        .optional(),
      llmOperations: z.array(z.object({
        methods: z.unknown().describe(
          "Optional. methods refers to the REST verbs as in https://httpwg.org/specs/rfc9110.html For example: GET, POST, PUT, DELETE, etc. They need to be in uppercase. When none specified, all verb types are allowed.",
        ).optional(),
        model: z.unknown().describe(
          "Required. LLM model name associated with the API proxy",
        ).optional(),
        resource: z.unknown().describe(
          "Required. REST resource path associated with the API proxy or remote service.",
        ).optional(),
      })).describe(
        "Required. List of resource/method/model for the API proxy to which quota will applied. **Note**: Currently, you can specify only a single resource/method/model mapping. The call will fail if more than one resource/method/model mappings are provided.",
      ).optional(),
      llmTokenQuota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit of LLM tokens allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Optional. Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "LLM Token Quota contains the essential parameters needed that can be applied on the resources, methods, models, API source combination associated with this API product. While LLM Token Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
    })).describe(
      "Required. List of LLM operation configurations for either Apigee API proxies that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of LLM operation configuration details associated with Apigee API proxies.",
  ).optional(),
  llmQuota: z.string().describe(
    "Optional. Number of LLM tokens permitted per app by this API product for the specified `llm_quota_interval` and `llm_quota_time_unit`. For example, an `llm_quota` of 50,000, for an `llm_quota_interval` of 12 and an `llm_quota_time_unit` of hours means 50,000 llm tokens are allowed to be used every 12 hours.",
  ).optional(),
  llmQuotaInterval: z.string().describe(
    "Optional. Time interval over which the number of tokens from LLM responses is calculated.",
  ).optional(),
  llmQuotaTimeUnit: z.string().describe(
    "Optional. Time unit defined for the `llm_quota_interval`. Valid values include `minute`, `hour`, `day`, or `month`.",
  ).optional(),
  name: z.string().describe(
    "Internal name of the API product. Characters you can use in the name are restricted to: `A-Z0-9._\\-$ %`. **Note:** The internal name cannot be edited when updating the API product.",
  ).optional(),
  operationGroup: z.object({
    operationConfigType: z.string().describe(
      "Flag that specifes whether the configuration is for Apigee API proxy or a remote service. Valid values include `proxy` or `remoteservice`. Defaults to `proxy`. Set to `proxy` when Apigee API proxies are associated with the API product. Set to `remoteservice` when non-Apigee proxies like Istio-Envoy are associated with the API product.",
    ).optional(),
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy or remote service with which the resources, methods, and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Custom attributes associated with the operation.")
        .optional(),
      operations: z.array(z.object({
        methods: z.unknown().describe(
          "methods refers to the REST verbs as in https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html. When none specified, all verb types are allowed.",
        ).optional(),
        resource: z.unknown().describe(
          "Required. REST resource path associated with the API proxy or remote service.",
        ).optional(),
      })).describe(
        "List of resource/method pairs for the API proxy or remote service to which quota will applied. **Note**: Currently, you can specify only a single resource/method pair. The call will fail if more than one resource/method pair is provided.",
      ).optional(),
      quota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "Quota contains the essential parameters needed that can be applied on the resources, methods, API source combination associated with this API product. While Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
    })).describe(
      "Required. List of operation configurations for either Apigee API proxies or other remote services that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of operation configuration details associated with Apigee API proxies or remote services. Remote services are non-Apigee proxies, such as Istio-Envoy.",
  ).optional(),
  proxies: z.array(z.string()).describe(
    "Comma-separated list of API proxy names to which this API product is bound. By specifying API proxies, you can associate resources in the API product with specific API proxies, preventing developers from accessing those resources through other API proxies. Apigee rejects requests to API proxies that are not listed. **Note:** The API proxy names must already exist in the specified environment as they will be validated upon creation.",
  ).optional(),
  quota: z.string().describe(
    "Number of request messages permitted per app by this API product for the specified `quotaInterval` and `quotaTimeUnit`. For example, a `quota` of 50, for a `quotaInterval` of 12 and a `quotaTimeUnit` of hours means 50 requests are allowed every 12 hours.",
  ).optional(),
  quotaCounterScope: z.enum([
    "QUOTA_COUNTER_SCOPE_UNSPECIFIED",
    "PROXY",
    "OPERATION",
    "PRODUCT",
  ]).describe(
    "Scope of the quota decides how the quota counter gets applied and evaluate for quota violation. If the Scope is set as PROXY, then all the operations defined for the APIproduct that are associated with the same proxy will share the same quota counter set at the APIproduct level, making it a global counter at a proxy level. If the Scope is set as OPERATION, then each operations get the counter set at the API product dedicated, making it a local counter. Note that, the QuotaCounterScope applies only when an operation does not have dedicated quota set for itself.",
  ).optional(),
  quotaInterval: z.string().describe(
    "Time interval over which the number of request messages is calculated.",
  ).optional(),
  quotaTimeUnit: z.string().describe(
    "Time unit defined for the `quotaInterval`. Valid values include `minute`, `hour`, `day`, or `month`.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Comma-separated list of OAuth scopes that are validated at runtime. Apigee validates that the scopes in any access token presented match the scopes defined in the OAuth policy associated with the API product.",
  ).optional(),
  space: z.string().describe(
    "Optional. The resource ID of the parent Space. If not set, the parent resource will be the Organization. To learn how Spaces can be used to manage resources, read the [Apigee Spaces Overview](https://cloud.google.com/apigee/docs/api-platform/system-administration/spaces/apigee-spaces-overview).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiResources: z.array(z.string()).optional(),
  approvalType: z.string().optional(),
  attributes: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
  createdAt: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  environments: z.array(z.string()).optional(),
  graphqlOperationGroup: z.object({
    operationConfigType: z.string(),
    operationConfigs: z.array(z.object({
      apiSource: z.string(),
      attributes: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      operations: z.array(z.object({
        operation: z.unknown(),
        operationTypes: z.unknown(),
      })),
      quota: z.object({
        interval: z.string(),
        limit: z.string(),
        timeUnit: z.string(),
      }),
    })),
  }).optional(),
  grpcOperationGroup: z.object({
    operationConfigs: z.array(z.object({
      apiSource: z.string(),
      attributes: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      methods: z.array(z.string()),
      quota: z.object({
        interval: z.string(),
        limit: z.string(),
        timeUnit: z.string(),
      }),
      service: z.string(),
    })),
  }).optional(),
  lastModifiedAt: z.string().optional(),
  llmOperationGroup: z.object({
    operationConfigs: z.array(z.object({
      apiSource: z.string(),
      attributes: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      llmOperations: z.array(z.object({
        methods: z.unknown(),
        model: z.unknown(),
        resource: z.unknown(),
      })),
      llmTokenQuota: z.object({
        interval: z.string(),
        limit: z.string(),
        timeUnit: z.string(),
      }),
    })),
  }).optional(),
  llmQuota: z.string().optional(),
  llmQuotaInterval: z.string().optional(),
  llmQuotaTimeUnit: z.string().optional(),
  name: z.string(),
  operationGroup: z.object({
    operationConfigType: z.string(),
    operationConfigs: z.array(z.object({
      apiSource: z.string(),
      attributes: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      operations: z.array(z.object({
        methods: z.unknown(),
        resource: z.unknown(),
      })),
      quota: z.object({
        interval: z.string(),
        limit: z.string(),
        timeUnit: z.string(),
      }),
    })),
  }).optional(),
  proxies: z.array(z.string()).optional(),
  quota: z.string().optional(),
  quotaCounterScope: z.string().optional(),
  quotaInterval: z.string().optional(),
  quotaTimeUnit: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  space: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  apiResources: z.array(z.string()).describe(
    "Comma-separated list of API resources to be bundled in the API product. By default, the resource paths are mapped from the `proxy.pathsuffix` variable. The proxy path suffix is defined as the URI fragment following the ProxyEndpoint base path. For example, if the `apiResources` element is defined to be `/forecastrss` and the base path defined for the API proxy is `/weather`, then only requests to `/weather/forecastrss` are permitted by the API product. You can select a specific path, or you can select all subpaths with the following wildcard: - `/**`: Indicates that all sub-URIs are included. - `/*`: Indicates that only URIs one level down are included. By default, / supports the same resources as /** as well as the base path defined by the API proxy. For example, if the base path of the API proxy is `/v1/weatherapikey`, then the API product supports requests to `/v1/weatherapikey` and to any sub-URIs, such as `/v1/weatherapikey/forecastrss`, `/v1/weatherapikey/region/CA`, and so on. For more information, see Managing API products.",
  ).optional(),
  approvalType: z.string().describe(
    'Flag that specifies how API keys are approved to access the APIs defined by the API product. If set to `manual`, the consumer key is generated and returned in "pending" state. In this case, the API keys won\'t work until they have been explicitly approved. If set to `auto`, the consumer key is generated and returned in "approved" state and can be used immediately. **Note:** Typically, `auto` is used to provide access to free or trial API products that provide limited quota or capabilities.',
  ).optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe(
    "Array of attributes that may be used to extend the default API product profile with customer-specific metadata. You can specify a maximum of 18 attributes. Use this property to specify the access level of the API product as either `public`, `private`, or `internal`. Only products marked `public` are available to developers in the Apigee developer portal. For example, you can set a product to `internal` while it is in development and then change access to `public` when it is ready to release on the portal. API products marked as `private` do not appear on the portal, but can be accessed by external developers.",
  ).optional(),
  createdAt: z.string().describe(
    "Response only. Creation time of this environment as milliseconds since epoch.",
  ).optional(),
  description: z.string().describe(
    "Description of the API product. Include key information about the API product that is not captured by other fields.",
  ).optional(),
  displayName: z.string().describe(
    "Name displayed in the UI or developer portal to developers registering for API access.",
  ).optional(),
  environments: z.array(z.string()).describe(
    "Comma-separated list of environment names to which the API product is bound. Requests to environments that are not listed are rejected. By specifying one or more environments, you can bind the resources listed in the API product to a specific environment, preventing developers from accessing those resources through API proxies deployed in another environment. This setting is used, for example, to prevent resources associated with API proxies in `prod` from being accessed by API proxies deployed in `test`.",
  ).optional(),
  graphqlOperationGroup: z.object({
    operationConfigType: z.string().describe(
      "Flag that specifies whether the configuration is for Apigee API proxy or a remote service. Valid values include `proxy` or `remoteservice`. Defaults to `proxy`. Set to `proxy` when Apigee API proxies are associated with the API product. Set to `remoteservice` when non-Apigee proxies like Istio-Envoy are associated with the API product.",
    ).optional(),
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy endpoint or remote service with which the GraphQL operation and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Custom attributes associated with the operation.")
        .optional(),
      operations: z.array(z.object({
        operation: z.unknown().describe(
          "GraphQL operation name. The name and operation type will be used to apply quotas. If no name is specified, the quota will be applied to all GraphQL operations irrespective of their operation names in the payload.",
        ).optional(),
        operationTypes: z.unknown().describe(
          "Required. GraphQL operation types. Valid values include `query` or `mutation`. **Note**: Apigee does not currently support `subscription` types.",
        ).optional(),
      })).describe(
        "Required. List of GraphQL name/operation type pairs for the proxy or remote service to which quota will be applied. If only operation types are specified, the quota will be applied to all GraphQL requests irrespective of the GraphQL name. **Note**: Currently, you can specify only a single GraphQLOperation. Specifying more than one will cause the operation to fail.",
      ).optional(),
      quota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "Quota contains the essential parameters needed that can be applied on the resources, methods, API source combination associated with this API product. While Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
    })).describe(
      "Required. List of operation configurations for either Apigee API proxies or other remote services that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of graphQL operation configuration details associated with Apigee API proxies or remote services. Remote services are non-Apigee proxies, such as Istio-Envoy.",
  ).optional(),
  grpcOperationGroup: z.object({
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy with which the gRPC operation and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Custom attributes associated with the operation.")
        .optional(),
      methods: z.array(z.string()).describe(
        'List of unqualified gRPC method names for the proxy to which quota will be applied. If this field is empty, the Quota will apply to all operations on the gRPC service defined on the proxy. Example: Given a proxy that is configured to serve com.petstore.PetService, the methods com.petstore.PetService.ListPets and com.petstore.PetService.GetPet would be specified here as simply ["ListPets", "GetPet"].',
      ).optional(),
      quota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "Quota contains the essential parameters needed that can be applied on the resources, methods, API source combination associated with this API product. While Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
      service: z.string().describe(
        "Required. gRPC Service name associated to be associated with the API proxy, on which quota rules can be applied upon.",
      ).optional(),
    })).describe(
      "Required. List of operation configurations for either Apigee API proxies that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of gRPC operation configuration details associated with Apigee API proxies.",
  ).optional(),
  lastModifiedAt: z.string().describe(
    "Response only. Modified time of this environment as milliseconds since epoch.",
  ).optional(),
  llmOperationGroup: z.object({
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy or remote service with which the resources, methods, and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Optional. Custom attributes associated with the operation.")
        .optional(),
      llmOperations: z.array(z.object({
        methods: z.unknown().describe(
          "Optional. methods refers to the REST verbs as in https://httpwg.org/specs/rfc9110.html For example: GET, POST, PUT, DELETE, etc. They need to be in uppercase. When none specified, all verb types are allowed.",
        ).optional(),
        model: z.unknown().describe(
          "Required. LLM model name associated with the API proxy",
        ).optional(),
        resource: z.unknown().describe(
          "Required. REST resource path associated with the API proxy or remote service.",
        ).optional(),
      })).describe(
        "Required. List of resource/method/model for the API proxy to which quota will applied. **Note**: Currently, you can specify only a single resource/method/model mapping. The call will fail if more than one resource/method/model mappings are provided.",
      ).optional(),
      llmTokenQuota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit of LLM tokens allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Optional. Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "LLM Token Quota contains the essential parameters needed that can be applied on the resources, methods, models, API source combination associated with this API product. While LLM Token Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
    })).describe(
      "Required. List of LLM operation configurations for either Apigee API proxies that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of LLM operation configuration details associated with Apigee API proxies.",
  ).optional(),
  llmQuota: z.string().describe(
    "Optional. Number of LLM tokens permitted per app by this API product for the specified `llm_quota_interval` and `llm_quota_time_unit`. For example, an `llm_quota` of 50,000, for an `llm_quota_interval` of 12 and an `llm_quota_time_unit` of hours means 50,000 llm tokens are allowed to be used every 12 hours.",
  ).optional(),
  llmQuotaInterval: z.string().describe(
    "Optional. Time interval over which the number of tokens from LLM responses is calculated.",
  ).optional(),
  llmQuotaTimeUnit: z.string().describe(
    "Optional. Time unit defined for the `llm_quota_interval`. Valid values include `minute`, `hour`, `day`, or `month`.",
  ).optional(),
  name: z.string().describe(
    "Internal name of the API product. Characters you can use in the name are restricted to: `A-Z0-9._\\-$ %`. **Note:** The internal name cannot be edited when updating the API product.",
  ).optional(),
  operationGroup: z.object({
    operationConfigType: z.string().describe(
      "Flag that specifes whether the configuration is for Apigee API proxy or a remote service. Valid values include `proxy` or `remoteservice`. Defaults to `proxy`. Set to `proxy` when Apigee API proxies are associated with the API product. Set to `remoteservice` when non-Apigee proxies like Istio-Envoy are associated with the API product.",
    ).optional(),
    operationConfigs: z.array(z.object({
      apiSource: z.string().describe(
        "Required. Name of the API proxy or remote service with which the resources, methods, and quota are associated.",
      ).optional(),
      attributes: z.array(z.object({
        name: z.unknown().describe("API key of the attribute.").optional(),
        value: z.unknown().describe("Value of the attribute.").optional(),
      })).describe("Custom attributes associated with the operation.")
        .optional(),
      operations: z.array(z.object({
        methods: z.unknown().describe(
          "methods refers to the REST verbs as in https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html. When none specified, all verb types are allowed.",
        ).optional(),
        resource: z.unknown().describe(
          "Required. REST resource path associated with the API proxy or remote service.",
        ).optional(),
      })).describe(
        "List of resource/method pairs for the API proxy or remote service to which quota will applied. **Note**: Currently, you can specify only a single resource/method pair. The call will fail if more than one resource/method pair is provided.",
      ).optional(),
      quota: z.object({
        interval: z.string().describe(
          "Required. Time interval over which the number of request messages is calculated.",
        ).optional(),
        limit: z.string().describe(
          "Required. Upper limit allowed for the time interval and time unit specified. Requests exceeding this limit will be rejected.",
        ).optional(),
        timeUnit: z.string().describe(
          "Time unit defined for the `interval`. Valid values include `minute`, `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default value is `hour`; otherwise, the default is null.",
        ).optional(),
      }).describe(
        "Quota contains the essential parameters needed that can be applied on the resources, methods, API source combination associated with this API product. While Quota is optional, setting it prevents requests from exceeding the provisioned parameters.",
      ).optional(),
    })).describe(
      "Required. List of operation configurations for either Apigee API proxies or other remote services that are associated with this API product.",
    ).optional(),
  }).describe(
    "List of operation configuration details associated with Apigee API proxies or remote services. Remote services are non-Apigee proxies, such as Istio-Envoy.",
  ).optional(),
  proxies: z.array(z.string()).describe(
    "Comma-separated list of API proxy names to which this API product is bound. By specifying API proxies, you can associate resources in the API product with specific API proxies, preventing developers from accessing those resources through other API proxies. Apigee rejects requests to API proxies that are not listed. **Note:** The API proxy names must already exist in the specified environment as they will be validated upon creation.",
  ).optional(),
  quota: z.string().describe(
    "Number of request messages permitted per app by this API product for the specified `quotaInterval` and `quotaTimeUnit`. For example, a `quota` of 50, for a `quotaInterval` of 12 and a `quotaTimeUnit` of hours means 50 requests are allowed every 12 hours.",
  ).optional(),
  quotaCounterScope: z.enum([
    "QUOTA_COUNTER_SCOPE_UNSPECIFIED",
    "PROXY",
    "OPERATION",
    "PRODUCT",
  ]).describe(
    "Scope of the quota decides how the quota counter gets applied and evaluate for quota violation. If the Scope is set as PROXY, then all the operations defined for the APIproduct that are associated with the same proxy will share the same quota counter set at the APIproduct level, making it a global counter at a proxy level. If the Scope is set as OPERATION, then each operations get the counter set at the API product dedicated, making it a local counter. Note that, the QuotaCounterScope applies only when an operation does not have dedicated quota set for itself.",
  ).optional(),
  quotaInterval: z.string().describe(
    "Time interval over which the number of request messages is calculated.",
  ).optional(),
  quotaTimeUnit: z.string().describe(
    "Time unit defined for the `quotaInterval`. Valid values include `minute`, `hour`, `day`, or `month`.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Comma-separated list of OAuth scopes that are validated at runtime. Apigee validates that the scopes in any access token presented match the scopes defined in the OAuth policy associated with the API product.",
  ).optional(),
  space: z.string().describe(
    "Optional. The resource ID of the parent Space. If not set, the parent resource will be the Organization. To learn how Spaces can be used to manage resources, read the [Apigee Spaces Overview](https://cloud.google.com/apigee/docs/api-platform/system-administration/spaces/apigee-spaces-overview).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Apiproducts. Registered at `@swamp/gcp/apigee/apiproducts`. */
export const model = {
  type: "@swamp/gcp/apigee/apiproducts",
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
        "Gets configuration details for an API product. The API product name required ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apiproducts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiResources"] !== undefined) {
          body["apiResources"] = g["apiResources"];
        }
        if (g["approvalType"] !== undefined) {
          body["approvalType"] = g["approvalType"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["createdAt"] !== undefined) body["createdAt"] = g["createdAt"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["environments"] !== undefined) {
          body["environments"] = g["environments"];
        }
        if (g["graphqlOperationGroup"] !== undefined) {
          body["graphqlOperationGroup"] = g["graphqlOperationGroup"];
        }
        if (g["grpcOperationGroup"] !== undefined) {
          body["grpcOperationGroup"] = g["grpcOperationGroup"];
        }
        if (g["lastModifiedAt"] !== undefined) {
          body["lastModifiedAt"] = g["lastModifiedAt"];
        }
        if (g["llmOperationGroup"] !== undefined) {
          body["llmOperationGroup"] = g["llmOperationGroup"];
        }
        if (g["llmQuota"] !== undefined) body["llmQuota"] = g["llmQuota"];
        if (g["llmQuotaInterval"] !== undefined) {
          body["llmQuotaInterval"] = g["llmQuotaInterval"];
        }
        if (g["llmQuotaTimeUnit"] !== undefined) {
          body["llmQuotaTimeUnit"] = g["llmQuotaTimeUnit"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["operationGroup"] !== undefined) {
          body["operationGroup"] = g["operationGroup"];
        }
        if (g["proxies"] !== undefined) body["proxies"] = g["proxies"];
        if (g["quota"] !== undefined) body["quota"] = g["quota"];
        if (g["quotaCounterScope"] !== undefined) {
          body["quotaCounterScope"] = g["quotaCounterScope"];
        }
        if (g["quotaInterval"] !== undefined) {
          body["quotaInterval"] = g["quotaInterval"];
        }
        if (g["quotaTimeUnit"] !== undefined) {
          body["quotaTimeUnit"] = g["quotaTimeUnit"];
        }
        if (g["scopes"] !== undefined) body["scopes"] = g["scopes"];
        if (g["space"] !== undefined) body["space"] = g["space"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a apiproducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the apiproducts"),
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
      description: "Update apiproducts attributes",
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
        if (g["apiResources"] !== undefined) {
          body["apiResources"] = g["apiResources"];
        }
        if (g["approvalType"] !== undefined) {
          body["approvalType"] = g["approvalType"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["createdAt"] !== undefined) body["createdAt"] = g["createdAt"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["environments"] !== undefined) {
          body["environments"] = g["environments"];
        }
        if (g["graphqlOperationGroup"] !== undefined) {
          body["graphqlOperationGroup"] = g["graphqlOperationGroup"];
        }
        if (g["grpcOperationGroup"] !== undefined) {
          body["grpcOperationGroup"] = g["grpcOperationGroup"];
        }
        if (g["lastModifiedAt"] !== undefined) {
          body["lastModifiedAt"] = g["lastModifiedAt"];
        }
        if (g["llmOperationGroup"] !== undefined) {
          body["llmOperationGroup"] = g["llmOperationGroup"];
        }
        if (g["llmQuota"] !== undefined) body["llmQuota"] = g["llmQuota"];
        if (g["llmQuotaInterval"] !== undefined) {
          body["llmQuotaInterval"] = g["llmQuotaInterval"];
        }
        if (g["llmQuotaTimeUnit"] !== undefined) {
          body["llmQuotaTimeUnit"] = g["llmQuotaTimeUnit"];
        }
        if (g["operationGroup"] !== undefined) {
          body["operationGroup"] = g["operationGroup"];
        }
        if (g["proxies"] !== undefined) body["proxies"] = g["proxies"];
        if (g["quota"] !== undefined) body["quota"] = g["quota"];
        if (g["quotaCounterScope"] !== undefined) {
          body["quotaCounterScope"] = g["quotaCounterScope"];
        }
        if (g["quotaInterval"] !== undefined) {
          body["quotaInterval"] = g["quotaInterval"];
        }
        if (g["quotaTimeUnit"] !== undefined) {
          body["quotaTimeUnit"] = g["quotaTimeUnit"];
        }
        if (g["scopes"] !== undefined) body["scopes"] = g["scopes"];
        if (g["space"] !== undefined) body["space"] = g["space"];
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
          UPDATE_CONFIG,
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
      description: "Delete the apiproducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the apiproducts"),
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
      description: "Sync apiproducts state from GCP",
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
    attributes: {
      description: "attributes",
      arguments: z.object({
        attribute: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["attribute"] !== undefined) {
          body["attribute"] = args["attribute"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.apiproducts.attributes",
            "path": "v1/{+name}/attributes",
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
    move: {
      description: "move",
      arguments: z.object({
        space: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["space"] !== undefined) body["space"] = args["space"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.apiproducts.move",
            "path": "v1/{+name}:move",
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
