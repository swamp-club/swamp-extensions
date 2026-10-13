// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
  connectorToolset: z.object({
    authConfig: z.object({
      oauth2AuthCodeConfig: z.object({
        oauthToken: z.string().describe(
          "Required. Oauth token parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Oauth 2.0 Authorization Code authentication.").optional(),
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
      }).describe("JWT Profile Oauth 2.0 Authorization Grant authentication.")
        .optional(),
    }).describe(
      "Optional. Configures how authentication is handled in Integration Connectors. By default, an admin authentication is passed in the Integration Connectors API requests. You can override it with a different end-user authentication config. **Note**: The Connection must have authentication override enabled in order to specify an EUC configuration here - otherwise, the Toolset creation will fail. See: https://cloud.google.com/application-integration/docs/configure-connectors-task#configure-authentication-override",
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
      }).describe("Entity operation configuration for the tool to use.")
        .optional(),
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
    "Optional. A toolset that generates tools from an Integration Connectors Connection.",
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
      }).describe("Optional. Config for API key auth.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Optional. Config for bearer token auth.").optional(),
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
      }).describe("Optional. Config for OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe("Optional. Config for service account authentication.")
        .optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Optional. Config for ID token auth generated from CES service agent.",
      ).optional(),
    }).describe(
      "Optional. Authentication information required to access tools and execute a tool against the MCP server. For bearer token authentication, the token applies only to tool execution, not to listing tools. This requires that tools can be listed without authentication.",
    ).optional(),
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
    }).describe(
      "Optional. Service Directory configuration for VPC-SC, used to resolve service names within a perimeter.",
    ).optional(),
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
    }).describe(
      "Optional. The TLS configuration. Includes the custom server certificates that the client should trust.",
    ).optional(),
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
          "Output only. The schema of the input arguments of the MCP tool.",
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
          "Output only. The schema of the output arguments of the MCP tool.",
        ).optional(),
      }).describe(
        'Output only. If present, this tool is "Pinned" and uses the snapshot values as fallbacks if the server becomes temporarily unavailable or if no Override is present.',
      ).optional(),
      tool: z.string().describe(
        "Required. The original name of the tool as it is emitted by the MCP server.",
      ).optional(),
    })).describe(
      "Optional. Overrides for individual tools within this toolset. This allows overriding specific details like descriptions, names, or pinning the tools' states so they aren't fully dynamic.",
    ).optional(),
  }).describe(
    "Optional. A toolset that contains a list of tools that are offered by the MCP server.",
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
      }).describe("Optional. Config for API key auth.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Optional. Config for bearer token auth.").optional(),
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
      }).describe("Optional. Config for OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe("Optional. Config for service account authentication.")
        .optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Optional. Config for ID token auth generated from CES service agent.",
      ).optional(),
    }).describe("Optional. Authentication information required by the API.")
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
    }).describe("Optional. Service Directory configuration.").optional(),
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
    }).describe(
      "Optional. The TLS configuration. Includes the custom server certificates",
    ).optional(),
    url: z.string().describe(
      "Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
    ).optional(),
  }).describe(
    "Optional. A toolset that contains a list of tools that are defined by an OpenAPI schema.",
  ).optional(),
  timeout: z.string().describe(
    "Optional. The timeout for the toolset execution. If not set, the default timeout is 30 seconds for `SYNCHRONOUS` toolsets and 60 seconds for `ASYNCHRONOUS` toolsets.",
  ).optional(),
  toolFakeConfig: z.object({
    codeBlock: z.object({
      pythonCode: z.string().describe(
        "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
      ).optional(),
    }).describe(
      "Optional. Code block which will be executed instead of a real tool call.",
    ).optional(),
    enableFakeMode: z.boolean().describe(
      "Optional. Whether the tool is using fake mode.",
    ).optional(),
  }).describe("Optional. Configuration for tools behavior in fake mode.")
    .optional(),
  toolsetId: z.string().describe(
    "Optional. The ID to use for the toolset, which will become the final component of the toolset's resource name. If not provided, a unique ID will be automatically assigned for the toolset.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  timeout: z.string().optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  connectorToolset: z.object({
    authConfig: z.object({
      oauth2AuthCodeConfig: z.object({
        oauthToken: z.string().describe(
          "Required. Oauth token parameter name to pass through. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Oauth 2.0 Authorization Code authentication.").optional(),
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
      }).describe("JWT Profile Oauth 2.0 Authorization Grant authentication.")
        .optional(),
    }).describe(
      "Optional. Configures how authentication is handled in Integration Connectors. By default, an admin authentication is passed in the Integration Connectors API requests. You can override it with a different end-user authentication config. **Note**: The Connection must have authentication override enabled in order to specify an EUC configuration here - otherwise, the Toolset creation will fail. See: https://cloud.google.com/application-integration/docs/configure-connectors-task#configure-authentication-override",
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
      }).describe("Entity operation configuration for the tool to use.")
        .optional(),
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
    "Optional. A toolset that generates tools from an Integration Connectors Connection.",
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
      }).describe("Optional. Config for API key auth.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Optional. Config for bearer token auth.").optional(),
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
      }).describe("Optional. Config for OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe("Optional. Config for service account authentication.")
        .optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Optional. Config for ID token auth generated from CES service agent.",
      ).optional(),
    }).describe(
      "Optional. Authentication information required to access tools and execute a tool against the MCP server. For bearer token authentication, the token applies only to tool execution, not to listing tools. This requires that tools can be listed without authentication.",
    ).optional(),
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
    }).describe(
      "Optional. Service Directory configuration for VPC-SC, used to resolve service names within a perimeter.",
    ).optional(),
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
    }).describe(
      "Optional. The TLS configuration. Includes the custom server certificates that the client should trust.",
    ).optional(),
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
          "Output only. The schema of the input arguments of the MCP tool.",
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
          "Output only. The schema of the output arguments of the MCP tool.",
        ).optional(),
      }).describe(
        'Output only. If present, this tool is "Pinned" and uses the snapshot values as fallbacks if the server becomes temporarily unavailable or if no Override is present.',
      ).optional(),
      tool: z.string().describe(
        "Required. The original name of the tool as it is emitted by the MCP server.",
      ).optional(),
    })).describe(
      "Optional. Overrides for individual tools within this toolset. This allows overriding specific details like descriptions, names, or pinning the tools' states so they aren't fully dynamic.",
    ).optional(),
  }).describe(
    "Optional. A toolset that contains a list of tools that are offered by the MCP server.",
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
      }).describe("Optional. Config for API key auth.").optional(),
      bearerTokenConfig: z.object({
        token: z.string().describe(
          "Required. The bearer token. Must be in the format `$context.variables.`.",
        ).optional(),
      }).describe("Optional. Config for bearer token auth.").optional(),
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
      }).describe("Optional. Config for OAuth.").optional(),
      serviceAccountAuthConfig: z.object({
        scopes: z.array(z.string()).describe(
          "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
        ).optional(),
      }).describe("Optional. Config for service account authentication.")
        .optional(),
      serviceAgentIdTokenAuthConfig: z.object({}).describe(
        "Optional. Config for ID token auth generated from CES service agent.",
      ).optional(),
    }).describe("Optional. Authentication information required by the API.")
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
    }).describe("Optional. Service Directory configuration.").optional(),
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
    }).describe(
      "Optional. The TLS configuration. Includes the custom server certificates",
    ).optional(),
    url: z.string().describe(
      "Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
    ).optional(),
  }).describe(
    "Optional. A toolset that contains a list of tools that are defined by an OpenAPI schema.",
  ).optional(),
  timeout: z.string().describe(
    "Optional. The timeout for the toolset execution. If not set, the default timeout is 30 seconds for `SYNCHRONOUS` toolsets and 60 seconds for `ASYNCHRONOUS` toolsets.",
  ).optional(),
  toolFakeConfig: z.object({
    codeBlock: z.object({
      pythonCode: z.string().describe(
        "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
      ).optional(),
    }).describe(
      "Optional. Code block which will be executed instead of a real tool call.",
    ).optional(),
    enableFakeMode: z.boolean().describe(
      "Optional. Whether the tool is using fake mode.",
    ).optional(),
  }).describe("Optional. Configuration for tools behavior in fake mode.")
    .optional(),
  toolsetId: z.string().describe(
    "Optional. The ID to use for the toolset, which will become the final component of the toolset's resource name. If not provided, a unique ID will be automatically assigned for the toolset.",
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

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Toolsets. Registered at `@swamp/gcp/ces/apps-toolsets`. */
export const model = {
  type: "@swamp/gcp/ces/apps-toolsets",
  version: "2026.10.13.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
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
      toVersion: "2026.06.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.13.1",
      description: "Added: timeout",
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
      toVersion: "2026.07.20.2",
      description: "Added: timeout",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "Added: timeout",
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
      toVersion: "2026.10.13.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["toolFakeConfig"] !== undefined) {
          body["toolFakeConfig"] = g["toolFakeConfig"];
        }
        if (g["toolsetId"] !== undefined) {
          params["toolsetId"] = String(g["toolsetId"]);
        }
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
      description: "Get a toolsets",
      arguments: z.object({
        identifier: z.string().describe("The name of the toolsets"),
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
      description: "Update toolsets attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific toolsets by name (e.g. one discovered by list)",
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
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["toolFakeConfig"] !== undefined) {
          body["toolFakeConfig"] = g["toolFakeConfig"];
        }
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
      description: "Delete the toolsets",
      arguments: z.object({
        identifier: z.string().describe("The name of the toolsets"),
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
      description: "Sync toolsets state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific toolsets by name (e.g. one discovered by list)",
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
      description: "List toolsets resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter to be applied when listing the toolsets. See https://google.aip.dev/160 for more details.",
        ).optional(),
        orderBy: z.string().describe(
          'Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "toolsets",
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
    retrieve_tools: {
      description: "retrieve tools",
      arguments: z.object({
        bypassPersistenceConfig: z.any().optional(),
        toolIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
