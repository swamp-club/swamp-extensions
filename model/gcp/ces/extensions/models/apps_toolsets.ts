// Auto-generated extension model for @swamp/gcp/ces/apps-toolsets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Toolsets.
 *
 * A toolset represents a group of dynamically managed tools that can be used by the agent.
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
  return `${parent}/toolsets/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.toolsets.get",
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
  "id": "ces.projects.locations.apps.toolsets.create",
  "path": "v1/{+parent}/toolsets",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "toolsetId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "ces.projects.locations.apps.toolsets.patch",
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
  "id": "ces.projects.locations.apps.toolsets.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
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
  "id": "ces.projects.locations.apps.toolsets.list",
  "path": "v1/{+parent}/toolsets",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  connectorToolset: z.object({
    authConfig: z.object({
      oauth2AuthCodeConfig: z.object({
        oauthToken: z.string().describe(
          "Required. Oauth token parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Oauth 2.0 Authorization Code authentication configuration.")
        .optional(),
      oauth2JwtBearerConfig: z.object({
        clientKey: z.string().describe(
          "Required. Client parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
        issuer: z.string().describe(
          "Required. Issuer parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
        subject: z.string().describe(
          "Required. Subject parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe(
        "JWT Profile Oauth 2.0 Authorization Grant authentication configuration.",
      ).optional(),
    }).describe(
      "End-user authentication configuration used for Connection calls. The field values must be the names of context variables in the format `$context.variables.`.",
    ).optional(),
    connection: z.string().describe(
      "Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}`",
    ).optional(),
    connectorActions: z.array(z.object({
      connectionActionId: z.string().describe(
        "ID of a Connection action for the tool to use.",
      ).optional(),
      entityOperation: z.object({
        entityId: z.string().describe("Required. ID of the entity.").optional(),
        operation: z.enum([
          "OPERATION_TYPE_UNSPECIFIED",
          "LIST",
          "GET",
          "CREATE",
          "UPDATE",
          "DELETE",
        ]).describe("Required. Operation to perform on the entity.").optional(),
      }).describe("Entity CRUD operation specification.").optional(),
      inputFields: z.array(z.string()).describe(
        "Optional. Entity fields to use as inputs for the operation. If no fields are specified, all fields of the Entity will be used.",
      ).optional(),
      outputFields: z.array(z.string()).describe(
        "Optional. Entity fields to return from the operation. If no fields are specified, all fields of the Entity will be returned.",
      ).optional(),
    })).describe(
      "Required. The list of connector actions/entity operations to generate tools for.",
    ).optional(),
  }).describe(
    "A toolset that generates tools from an Integration Connectors Connection.",
  ).optional(),
  description: z.string().describe("Optional. The description of the toolset.")
    .optional(),
  displayName: z.string().describe(
    "Optional. The display name of the toolset. Must be unique within the same app.",
  ).optional(),
  executionType: z.enum([
    "EXECUTION_TYPE_UNSPECIFIED",
    "SYNCHRONOUS",
    "ASYNCHRONOUS",
  ]).describe("Optional. The execution type of the tools in the toolset.")
    .optional(),
  mcpToolset: z.object({
    apiAuthentication: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        keyName: z.string().describe(
          'Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name.',
        ).optional(),
        requestLocation: z.enum([
          "REQUEST_LOCATION_UNSPECIFIED",
          "HEADER",
          "QUERY_STRING",
        ]).describe("Required. Key location in the request.").optional(),
      }).describe("Configurations for authentication with API key.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Configurations for authentication with a bearer token.")
        .optional(),
      oauthConfig: z.object({
        clientId: z.string().describe(
          "Required. The client ID from the OAuth provider.",
        ).optional(),
        clientSecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        oauthGrantType: z.enum([
          "OAUTH_GRANT_TYPE_UNSPECIFIED",
          "CLIENT_CREDENTIAL",
        ]).describe("Required. OAuth grant types.").optional(),
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant.",
        ).optional(),
        tokenEndpoint: z.string().describe(
          "Required. The token endpoint in the OAuth provider to exchange for an access token.",
        ).optional(),
      }).describe("Configurations for authentication with OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe(
        "Configurations for authentication using a custom service account.",
      ).optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
      ).optional(),
    }).describe("Authentication information required for API calls.")
      .optional(),
    customHeaders: z.record(z.string(), z.string()).describe(
      "Optional. The custom headers to send in the request to the MCP server. The values must be in the format `$context.variables.` and can be set in the session variables. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/open-api#openapi-injection for more details.",
    ).optional(),
    serverAddress: z.string().describe(
      'Required. The address of the MCP server, for example, "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details.',
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
      ).optional(),
    }).describe("Configuration for tools using Service Directory.").optional(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string().describe(
          'Required. The allowed custom CA certificates (in DER format) for HTTPS verification. This overrides the default SSL trust store. If this is empty or unspecified, CES will use Google\'s default trust store to verify certificates. N.B. Make sure the HTTPS server certificates are signed with "subject alt name". For instance a certificate can be self-signed using the following command: ` openssl x509 -req -days 200 -in example.com.csr \\ -signkey example.com.key \\ -out example.com.crt \\ -extfile <(printf "\\nsubjectAltName=\'DNS:www.example.com\'") `',
        ).optional(),
        displayName: z.string().describe(
          "Required. The name of the allowed custom CA certificates. This can be used to disambiguate the custom CA certificates.",
        ).optional(),
      })).describe(
        "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
      ).optional(),
    }).describe("The TLS configuration.").optional(),
    toolOverrides: z.array(z.object({
      descriptionOverride: z.string().describe(
        "Optional. If present, this tool uses this description instead of the original description from the server.",
      ).optional(),
      nameOverride: z.string().describe(
        "Optional. If present, this tool uses this name in the Agent instead of the original name. This is primarily used as an alias if the MCP server offers poorly named tools.",
      ).optional(),
      snapshot: z.object({
        description: z.string().describe(
          "Output only. The description of the MCP tool. This can be overridden by `description_override` in `McpToolOverride`.",
        ).optional(),
        inputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        outputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      }).describe(
        "Container for a tool's core definition elements that are snapshot. Schemas in the snapshot are used as-is and cannot be overridden.",
      ).optional(),
      tool: z.string().describe(
        "Required. The original name of the tool as it is emitted by the MCP server.",
      ).optional(),
    })).describe(
      "Optional. Overrides for individual tools within this toolset. This allows overriding specific details like descriptions, names, or pinning the tools' states so they aren't fully dynamic.",
    ).optional(),
  }).describe(
    "A toolset that contains a list of tools that are offered by the MCP server.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
  ).optional(),
  openApiToolset: z.object({
    apiAuthentication: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        keyName: z.string().describe(
          'Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name.',
        ).optional(),
        requestLocation: z.enum([
          "REQUEST_LOCATION_UNSPECIFIED",
          "HEADER",
          "QUERY_STRING",
        ]).describe("Required. Key location in the request.").optional(),
      }).describe("Configurations for authentication with API key.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Configurations for authentication with a bearer token.")
        .optional(),
      oauthConfig: z.object({
        clientId: z.string().describe(
          "Required. The client ID from the OAuth provider.",
        ).optional(),
        clientSecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        oauthGrantType: z.enum([
          "OAUTH_GRANT_TYPE_UNSPECIFIED",
          "CLIENT_CREDENTIAL",
        ]).describe("Required. OAuth grant types.").optional(),
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant.",
        ).optional(),
        tokenEndpoint: z.string().describe(
          "Required. The token endpoint in the OAuth provider to exchange for an access token.",
        ).optional(),
      }).describe("Configurations for authentication with OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe(
        "Configurations for authentication using a custom service account.",
      ).optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
      ).optional(),
    }).describe("Authentication information required for API calls.")
      .optional(),
    ignoreUnknownFields: z.boolean().describe(
      "Optional. If true, the agent will ignore unknown fields in the API response for all operations defined in the OpenAPI schema.",
    ).optional(),
    openApiSchema: z.string().describe(
      "Required. The OpenAPI schema of the toolset.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
      ).optional(),
    }).describe("Configuration for tools using Service Directory.").optional(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string().describe(
          'Required. The allowed custom CA certificates (in DER format) for HTTPS verification. This overrides the default SSL trust store. If this is empty or unspecified, CES will use Google\'s default trust store to verify certificates. N.B. Make sure the HTTPS server certificates are signed with "subject alt name". For instance a certificate can be self-signed using the following command: ` openssl x509 -req -days 200 -in example.com.csr \\ -signkey example.com.key \\ -out example.com.crt \\ -extfile <(printf "\\nsubjectAltName=\'DNS:www.example.com\'") `',
        ).optional(),
        displayName: z.string().describe(
          "Required. The name of the allowed custom CA certificates. This can be used to disambiguate the custom CA certificates.",
        ).optional(),
      })).describe(
        "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
      ).optional(),
    }).describe("The TLS configuration.").optional(),
    url: z.string().describe(
      "Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
    ).optional(),
  }).describe(
    "A toolset that contains a list of tools that are defined by an OpenAPI schema.",
  ).optional(),
  toolFakeConfig: z.object({
    codeBlock: z.object({
      pythonCode: z.string().describe(
        "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
      ).optional(),
    }).describe("A code block to be executed instead of a real tool call.")
      .optional(),
    enableFakeMode: z.boolean().describe(
      "Optional. Whether the tool is using fake mode.",
    ).optional(),
  }).describe("Configuration for tool behavior in fake mode.").optional(),
  toolsetId: z.string().describe(
    "Optional. The ID to use for the toolset, which will become the final component of the toolset's resource name. If not provided, a unique ID will be automatically assigned for the toolset.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  connectorToolset: z.object({
    authConfig: z.object({
      oauth2AuthCodeConfig: z.object({
        oauthToken: z.string(),
      }),
      oauth2JwtBearerConfig: z.object({
        clientKey: z.string(),
        issuer: z.string(),
        subject: z.string(),
      }),
    }),
    connection: z.string(),
    connectorActions: z.array(z.object({
      connectionActionId: z.string(),
      entityOperation: z.object({
        entityId: z.string(),
        operation: z.string(),
      }),
      inputFields: z.array(z.string()),
      outputFields: z.array(z.string()),
    })),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  executionType: z.string().optional(),
  mcpToolset: z.object({
    apiAuthentication: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string(),
        keyName: z.string(),
        requestLocation: z.string(),
      }),
      bearerTokenConfig: z.object({
        token: z.string(),
      }),
      oauthConfig: z.object({
        clientId: z.string(),
        clientSecretVersion: z.string(),
        oauthGrantType: z.string(),
        scopes: z.array(z.string()),
        tokenEndpoint: z.string(),
      }),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()),
        serviceAccount: z.string(),
      }),
      serviceAgentIdTokenAuthConfig: z.object({}),
    }),
    customHeaders: z.record(z.string(), z.unknown()),
    serverAddress: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string(),
        displayName: z.string(),
      })),
    }),
    toolOverrides: z.array(z.object({
      descriptionOverride: z.string(),
      nameOverride: z.string(),
      snapshot: z.object({
        description: z.string(),
        inputSchema: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
        outputSchema: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
      }),
      tool: z.string(),
    })),
  }).optional(),
  name: z.string(),
  openApiToolset: z.object({
    apiAuthentication: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string(),
        keyName: z.string(),
        requestLocation: z.string(),
      }),
      bearerTokenConfig: z.object({
        token: z.string(),
      }),
      oauthConfig: z.object({
        clientId: z.string(),
        clientSecretVersion: z.string(),
        oauthGrantType: z.string(),
        scopes: z.array(z.string()),
        tokenEndpoint: z.string(),
      }),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()),
        serviceAccount: z.string(),
      }),
      serviceAgentIdTokenAuthConfig: z.object({}),
    }),
    ignoreUnknownFields: z.boolean(),
    openApiSchema: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string(),
        displayName: z.string(),
      })),
    }),
    url: z.string(),
  }).optional(),
  toolFakeConfig: z.object({
    codeBlock: z.object({
      pythonCode: z.string(),
    }),
    enableFakeMode: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  connectorToolset: z.object({
    authConfig: z.object({
      oauth2AuthCodeConfig: z.object({
        oauthToken: z.string().describe(
          "Required. Oauth token parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Oauth 2.0 Authorization Code authentication configuration.")
        .optional(),
      oauth2JwtBearerConfig: z.object({
        clientKey: z.string().describe(
          "Required. Client parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
        issuer: z.string().describe(
          "Required. Issuer parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
        subject: z.string().describe(
          "Required. Subject parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe(
        "JWT Profile Oauth 2.0 Authorization Grant authentication configuration.",
      ).optional(),
    }).describe(
      "End-user authentication configuration used for Connection calls. The field values must be the names of context variables in the format `$context.variables.`.",
    ).optional(),
    connection: z.string().describe(
      "Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}`",
    ).optional(),
    connectorActions: z.array(z.object({
      connectionActionId: z.string().describe(
        "ID of a Connection action for the tool to use.",
      ).optional(),
      entityOperation: z.object({
        entityId: z.string().describe("Required. ID of the entity.").optional(),
        operation: z.enum([
          "OPERATION_TYPE_UNSPECIFIED",
          "LIST",
          "GET",
          "CREATE",
          "UPDATE",
          "DELETE",
        ]).describe("Required. Operation to perform on the entity.").optional(),
      }).describe("Entity CRUD operation specification.").optional(),
      inputFields: z.array(z.string()).describe(
        "Optional. Entity fields to use as inputs for the operation. If no fields are specified, all fields of the Entity will be used.",
      ).optional(),
      outputFields: z.array(z.string()).describe(
        "Optional. Entity fields to return from the operation. If no fields are specified, all fields of the Entity will be returned.",
      ).optional(),
    })).describe(
      "Required. The list of connector actions/entity operations to generate tools for.",
    ).optional(),
  }).describe(
    "A toolset that generates tools from an Integration Connectors Connection.",
  ).optional(),
  description: z.string().describe("Optional. The description of the toolset.")
    .optional(),
  displayName: z.string().describe(
    "Optional. The display name of the toolset. Must be unique within the same app.",
  ).optional(),
  executionType: z.enum([
    "EXECUTION_TYPE_UNSPECIFIED",
    "SYNCHRONOUS",
    "ASYNCHRONOUS",
  ]).describe("Optional. The execution type of the tools in the toolset.")
    .optional(),
  mcpToolset: z.object({
    apiAuthentication: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        keyName: z.string().describe(
          'Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name.',
        ).optional(),
        requestLocation: z.enum([
          "REQUEST_LOCATION_UNSPECIFIED",
          "HEADER",
          "QUERY_STRING",
        ]).describe("Required. Key location in the request.").optional(),
      }).describe("Configurations for authentication with API key.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Configurations for authentication with a bearer token.")
        .optional(),
      oauthConfig: z.object({
        clientId: z.string().describe(
          "Required. The client ID from the OAuth provider.",
        ).optional(),
        clientSecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        oauthGrantType: z.enum([
          "OAUTH_GRANT_TYPE_UNSPECIFIED",
          "CLIENT_CREDENTIAL",
        ]).describe("Required. OAuth grant types.").optional(),
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant.",
        ).optional(),
        tokenEndpoint: z.string().describe(
          "Required. The token endpoint in the OAuth provider to exchange for an access token.",
        ).optional(),
      }).describe("Configurations for authentication with OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe(
        "Configurations for authentication using a custom service account.",
      ).optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
      ).optional(),
    }).describe("Authentication information required for API calls.")
      .optional(),
    customHeaders: z.record(z.string(), z.string()).describe(
      "Optional. The custom headers to send in the request to the MCP server. The values must be in the format `$context.variables.` and can be set in the session variables. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/open-api#openapi-injection for more details.",
    ).optional(),
    serverAddress: z.string().describe(
      'Required. The address of the MCP server, for example, "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details.',
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
      ).optional(),
    }).describe("Configuration for tools using Service Directory.").optional(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string().describe(
          'Required. The allowed custom CA certificates (in DER format) for HTTPS verification. This overrides the default SSL trust store. If this is empty or unspecified, CES will use Google\'s default trust store to verify certificates. N.B. Make sure the HTTPS server certificates are signed with "subject alt name". For instance a certificate can be self-signed using the following command: ` openssl x509 -req -days 200 -in example.com.csr \\ -signkey example.com.key \\ -out example.com.crt \\ -extfile <(printf "\\nsubjectAltName=\'DNS:www.example.com\'") `',
        ).optional(),
        displayName: z.string().describe(
          "Required. The name of the allowed custom CA certificates. This can be used to disambiguate the custom CA certificates.",
        ).optional(),
      })).describe(
        "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
      ).optional(),
    }).describe("The TLS configuration.").optional(),
    toolOverrides: z.array(z.object({
      descriptionOverride: z.string().describe(
        "Optional. If present, this tool uses this description instead of the original description from the server.",
      ).optional(),
      nameOverride: z.string().describe(
        "Optional. If present, this tool uses this name in the Agent instead of the original name. This is primarily used as an alias if the MCP server offers poorly named tools.",
      ).optional(),
      snapshot: z.object({
        description: z.string().describe(
          "Output only. The description of the MCP tool. This can be overridden by `description_override` in `McpToolOverride`.",
        ).optional(),
        inputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        outputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      }).describe(
        "Container for a tool's core definition elements that are snapshot. Schemas in the snapshot are used as-is and cannot be overridden.",
      ).optional(),
      tool: z.string().describe(
        "Required. The original name of the tool as it is emitted by the MCP server.",
      ).optional(),
    })).describe(
      "Optional. Overrides for individual tools within this toolset. This allows overriding specific details like descriptions, names, or pinning the tools' states so they aren't fully dynamic.",
    ).optional(),
  }).describe(
    "A toolset that contains a list of tools that are offered by the MCP server.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
  ).optional(),
  openApiToolset: z.object({
    apiAuthentication: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        keyName: z.string().describe(
          'Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name.',
        ).optional(),
        requestLocation: z.enum([
          "REQUEST_LOCATION_UNSPECIFIED",
          "HEADER",
          "QUERY_STRING",
        ]).describe("Required. Key location in the request.").optional(),
      }).describe("Configurations for authentication with API key.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Configurations for authentication with a bearer token.")
        .optional(),
      oauthConfig: z.object({
        clientId: z.string().describe(
          "Required. The client ID from the OAuth provider.",
        ).optional(),
        clientSecretVersion: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
        oauthGrantType: z.enum([
          "OAUTH_GRANT_TYPE_UNSPECIFIED",
          "CLIENT_CREDENTIAL",
        ]).describe("Required. OAuth grant types.").optional(),
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant.",
        ).optional(),
        tokenEndpoint: z.string().describe(
          "Required. The token endpoint in the OAuth provider to exchange for an access token.",
        ).optional(),
      }).describe("Configurations for authentication with OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe(
        "Configurations for authentication using a custom service account.",
      ).optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
      ).optional(),
    }).describe("Authentication information required for API calls.")
      .optional(),
    ignoreUnknownFields: z.boolean().describe(
      "Optional. If true, the agent will ignore unknown fields in the API response for all operations defined in the OpenAPI schema.",
    ).optional(),
    openApiSchema: z.string().describe(
      "Required. The OpenAPI schema of the toolset.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
      ).optional(),
    }).describe("Configuration for tools using Service Directory.").optional(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string().describe(
          'Required. The allowed custom CA certificates (in DER format) for HTTPS verification. This overrides the default SSL trust store. If this is empty or unspecified, CES will use Google\'s default trust store to verify certificates. N.B. Make sure the HTTPS server certificates are signed with "subject alt name". For instance a certificate can be self-signed using the following command: ` openssl x509 -req -days 200 -in example.com.csr \\ -signkey example.com.key \\ -out example.com.crt \\ -extfile <(printf "\\nsubjectAltName=\'DNS:www.example.com\'") `',
        ).optional(),
        displayName: z.string().describe(
          "Required. The name of the allowed custom CA certificates. This can be used to disambiguate the custom CA certificates.",
        ).optional(),
      })).describe(
        "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
      ).optional(),
    }).describe("The TLS configuration.").optional(),
    url: z.string().describe(
      "Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
    ).optional(),
  }).describe(
    "A toolset that contains a list of tools that are defined by an OpenAPI schema.",
  ).optional(),
  toolFakeConfig: z.object({
    codeBlock: z.object({
      pythonCode: z.string().describe(
        "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
      ).optional(),
    }).describe("A code block to be executed instead of a real tool call.")
      .optional(),
    enableFakeMode: z.boolean().describe(
      "Optional. Whether the tool is using fake mode.",
    ).optional(),
  }).describe("Configuration for tool behavior in fake mode.").optional(),
  toolsetId: z.string().describe(
    "Optional. The ID to use for the toolset, which will become the final component of the toolset's resource name. If not provided, a unique ID will be automatically assigned for the toolset.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Toolsets. Registered at `@swamp/gcp/ces/apps-toolsets`. */
export const model = {
  type: "@swamp/gcp/ces/apps-toolsets",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A toolset represents a group of dynamically managed tools that can be used by...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a toolsets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["connectorToolset"] !== undefined) {
          body["connectorToolset"] = g["connectorToolset"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionType"] !== undefined) {
          body["executionType"] = g["executionType"];
        }
        if (g["mcpToolset"] !== undefined) body["mcpToolset"] = g["mcpToolset"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["openApiToolset"] !== undefined) {
          body["openApiToolset"] = g["openApiToolset"];
        }
        if (g["toolFakeConfig"] !== undefined) {
          body["toolFakeConfig"] = g["toolFakeConfig"];
        }
        if (g["toolsetId"] !== undefined) body["toolsetId"] = g["toolsetId"];
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
      description: "Get a toolsets",
      arguments: z.object({
        identifier: z.string().describe("The name of the toolsets"),
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
      description: "Update toolsets attributes",
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
        if (g["connectorToolset"] !== undefined) {
          body["connectorToolset"] = g["connectorToolset"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionType"] !== undefined) {
          body["executionType"] = g["executionType"];
        }
        if (g["mcpToolset"] !== undefined) body["mcpToolset"] = g["mcpToolset"];
        if (g["openApiToolset"] !== undefined) {
          body["openApiToolset"] = g["openApiToolset"];
        }
        if (g["toolFakeConfig"] !== undefined) {
          body["toolFakeConfig"] = g["toolFakeConfig"];
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
      description: "Delete the toolsets",
      arguments: z.object({
        identifier: z.string().describe("The name of the toolsets"),
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
      description: "Sync toolsets state from GCP",
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
    retrieve_tools: {
      description: "retrieve tools",
      arguments: z.object({
        bypassPersistenceConfig: z.any().optional(),
        toolIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["toolset"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bypassPersistenceConfig"] !== undefined) {
          body["bypassPersistenceConfig"] = args["bypassPersistenceConfig"];
        }
        if (args["toolIds"] !== undefined) body["toolIds"] = args["toolIds"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "ces.projects.locations.apps.toolsets.retrieveTools",
            "path": "v1/{+toolset}:retrieveTools",
            "httpMethod": "POST",
            "parameterOrder": ["toolset"],
            "parameters": {
              "toolset": { "location": "path", "required": true },
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
