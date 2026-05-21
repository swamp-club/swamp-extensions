// Auto-generated extension model for @swamp/gcp/developerconnect/connections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Developer Connect Connections.
 *
 * Message describing Connection object
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
  return `${parent}/connections/${shortName}`;
}

const BASE_URL = "https://developerconnect.googleapis.com/";

const GET_CONFIG = {
  "id": "developerconnect.projects.locations.connections.get",
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
  "id": "developerconnect.projects.locations.connections.create",
  "path": "v1/{+parent}/connections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "connectionId": {
      "location": "query",
    },
    "parent": {
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

const PATCH_CONFIG = {
  "id": "developerconnect.projects.locations.connections.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "developerconnect.projects.locations.connections.delete",
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

const LIST_CONFIG = {
  "id": "developerconnect.projects.locations.connections.list",
  "path": "v1/{+parent}/connections",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Allows clients to store small amounts of arbitrary data.",
  ).optional(),
  bitbucketCloudConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate and create webhooks.",
    ).optional(),
    workspace: z.string().describe(
      "Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of Bitbucket Cloud.",
  ).optional(),
  bitbucketDataCenterConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the Bitbucket Data Center host this connection is for.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the Bitbucket Data Center server running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL certificate authority to trust when making requests to Bitbucket Data Center.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of Bitbucket Data Center.",
  ).optional(),
  cryptoKeyConfig: z.object({
    keyReference: z.string().describe(
      "Required. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe(
    "The crypto key configuration. This field is used by the Customer-managed encryption keys (CMEK) feature.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled.",
  ).optional(),
  gitProxyConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Setting this to true allows the git proxy to be used for performing git operations on the repositories linked in the connection.",
    ).optional(),
    httpProxyBaseUri: z.string().describe(
      "Output only. The base URI for the HTTP proxy endpoint. Has the format `https://{generatedID}-c-h-{shortRegion}.developerconnect.dev` Populated only when enabled is set to true. This endpoint is used by other Google services that integrate with Developer Connect.",
    ).optional(),
  }).describe("The git proxy configuration.").optional(),
  githubConfig: z.object({
    appInstallationId: z.string().describe(
      "Optional. GitHub App installation id.",
    ).optional(),
    authorizerCredential: z.object({
      oauthTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the OAuth token that authorizes the connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents an OAuth token of the account that authorized the Connection, and associated metadata.",
    ).optional(),
    githubApp: z.enum([
      "GIT_HUB_APP_UNSPECIFIED",
      "DEVELOPER_CONNECT",
      "FIREBASE",
      "GEMINI_CODE_ASSIST",
      "DATAFORM",
    ]).describe(
      "Required. Immutable. The GitHub Application that was installed to the GitHub user or organization.",
    ).optional(),
    installationUri: z.string().describe(
      "Output only. The URI to navigate to in order to manage the installation associated with this GitHubConfig.",
    ).optional(),
  }).describe("Configuration for connections to github.com.").optional(),
  githubEnterpriseConfig: z.object({
    appId: z.string().describe(
      "Optional. ID of the GitHub App created from the manifest.",
    ).optional(),
    appInstallationId: z.string().describe(
      "Optional. ID of the installation of the GitHub App.",
    ).optional(),
    appSlug: z.string().describe(
      "Output only. The URL-friendly name of the GitHub App.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the GitHub Enterprise host this connection is for.",
    ).optional(),
    installationUri: z.string().describe(
      "Output only. The URI to navigate to in order to manage the installation associated with this GitHubEnterpriseConfig.",
    ).optional(),
    organization: z.string().describe(
      "Optional. Immutable. GitHub Enterprise organization in which the GitHub App is created.",
    ).optional(),
    privateKeySecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. GitHub Enterprise version installed at the host_uri.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL certificate to use for requests to GitHub Enterprise.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of GitHub Enterprise.",
  ).optional(),
  gitlabConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks.",
    ).optional(),
  }).describe("Configuration for connections to gitlab.com.").optional(),
  gitlabEnterpriseConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the GitLab Enterprise host this connection is for.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the GitLab Enterprise server running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL Certificate Authority certificate to use for requests to GitLab Enterprise instance.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of GitLab Enterprise.",
  ).optional(),
  httpConfig: z.object({
    basicAuthentication: z.object({
      passwordSecretVersion: z.string().describe(
        "The password SecretManager secret version to authenticate as.",
      ).optional(),
      username: z.string().describe(
        "Required. The username to authenticate as.",
      ).optional(),
    }).describe("Basic authentication with username and password.").optional(),
    bearerTokenAuthentication: z.object({
      tokenSecretVersion: z.string().describe(
        "Optional. The token SecretManager secret version to authenticate as.",
      ).optional(),
    }).describe("Bearer token authentication with a token.").optional(),
    hostUri: z.string().describe(
      "Required. Immutable. The service provider's https endpoint.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. The SSL certificate to use for requests to the HTTP service provider.",
    ).optional(),
  }).describe(
    "Defines the configuration for connections to an HTTP service provider.",
  ).optional(),
  installationState: z.object({
    actionUri: z.string().describe(
      "Output only. Link to follow for next action. Empty string if the installation is already complete.",
    ).optional(),
    message: z.string().describe(
      "Output only. Message of what the user should do next to continue the installation. Empty string if the installation is already complete.",
    ).optional(),
    stage: z.enum([
      "STAGE_UNSPECIFIED",
      "PENDING_CREATE_APP",
      "PENDING_USER_OAUTH",
      "PENDING_INSTALL_APP",
      "COMPLETE",
    ]).describe("Output only. Current step of the installation process.")
      .optional(),
  }).describe(
    "Describes stage and necessary actions to be taken by the user to complete the installation. Used for GitHub and GitHub Enterprise based connections.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`.",
  ).optional(),
  secureSourceManagerInstanceConfig: z.object({
    instance: z.string().describe(
      "Required. Immutable. Secure Source Manager instance resource, formatted as `projects/*/locations/*/instances/*`",
    ).optional(),
  }).describe("Configuration for connections to Secure Source Manager instance")
    .optional(),
  connectionId: z.string().describe(
    "Required. Id of the requesting object If auto-generating Id server-side, remove this field and connection_id from the method_signature of Create RPC",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  bitbucketCloudConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    webhookSecretSecretVersion: z.string(),
    workspace: z.string(),
  }).optional(),
  bitbucketDataCenterConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    hostUri: z.string(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCaCertificate: z.string(),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  cryptoKeyConfig: z.object({
    keyReference: z.string(),
  }).optional(),
  deleteTime: z.string().optional(),
  disabled: z.boolean().optional(),
  etag: z.string().optional(),
  gitProxyConfig: z.object({
    enabled: z.boolean(),
    httpProxyBaseUri: z.string(),
  }).optional(),
  githubConfig: z.object({
    appInstallationId: z.string(),
    authorizerCredential: z.object({
      oauthTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    githubApp: z.string(),
    installationUri: z.string(),
  }).optional(),
  githubEnterpriseConfig: z.object({
    appId: z.string(),
    appInstallationId: z.string(),
    appSlug: z.string(),
    hostUri: z.string(),
    installationUri: z.string(),
    organization: z.string(),
    privateKeySecretVersion: z.string(),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCaCertificate: z.string(),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  gitlabConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  gitlabEnterpriseConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    hostUri: z.string(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string(),
      username: z.string(),
    }),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCaCertificate: z.string(),
    webhookSecretSecretVersion: z.string(),
  }).optional(),
  httpConfig: z.object({
    basicAuthentication: z.object({
      passwordSecretVersion: z.string(),
      username: z.string(),
    }),
    bearerTokenAuthentication: z.object({
      tokenSecretVersion: z.string(),
    }),
    hostUri: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCaCertificate: z.string(),
  }).optional(),
  installationState: z.object({
    actionUri: z.string(),
    message: z.string(),
    stage: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  secureSourceManagerInstanceConfig: z.object({
    instance: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Allows clients to store small amounts of arbitrary data.",
  ).optional(),
  bitbucketCloudConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate and create webhooks.",
    ).optional(),
    workspace: z.string().describe(
      "Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of Bitbucket Cloud.",
  ).optional(),
  bitbucketDataCenterConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the Bitbucket Data Center host this connection is for.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the Bitbucket Data Center server running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL certificate authority to trust when making requests to Bitbucket Data Center.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of Bitbucket Data Center.",
  ).optional(),
  cryptoKeyConfig: z.object({
    keyReference: z.string().describe(
      "Required. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe(
    "The crypto key configuration. This field is used by the Customer-managed encryption keys (CMEK) feature.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled.",
  ).optional(),
  gitProxyConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Setting this to true allows the git proxy to be used for performing git operations on the repositories linked in the connection.",
    ).optional(),
    httpProxyBaseUri: z.string().describe(
      "Output only. The base URI for the HTTP proxy endpoint. Has the format `https://{generatedID}-c-h-{shortRegion}.developerconnect.dev` Populated only when enabled is set to true. This endpoint is used by other Google services that integrate with Developer Connect.",
    ).optional(),
  }).describe("The git proxy configuration.").optional(),
  githubConfig: z.object({
    appInstallationId: z.string().describe(
      "Optional. GitHub App installation id.",
    ).optional(),
    authorizerCredential: z.object({
      oauthTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the OAuth token that authorizes the connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents an OAuth token of the account that authorized the Connection, and associated metadata.",
    ).optional(),
    githubApp: z.enum([
      "GIT_HUB_APP_UNSPECIFIED",
      "DEVELOPER_CONNECT",
      "FIREBASE",
      "GEMINI_CODE_ASSIST",
      "DATAFORM",
    ]).describe(
      "Required. Immutable. The GitHub Application that was installed to the GitHub user or organization.",
    ).optional(),
    installationUri: z.string().describe(
      "Output only. The URI to navigate to in order to manage the installation associated with this GitHubConfig.",
    ).optional(),
  }).describe("Configuration for connections to github.com.").optional(),
  githubEnterpriseConfig: z.object({
    appId: z.string().describe(
      "Optional. ID of the GitHub App created from the manifest.",
    ).optional(),
    appInstallationId: z.string().describe(
      "Optional. ID of the installation of the GitHub App.",
    ).optional(),
    appSlug: z.string().describe(
      "Output only. The URL-friendly name of the GitHub App.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the GitHub Enterprise host this connection is for.",
    ).optional(),
    installationUri: z.string().describe(
      "Output only. The URI to navigate to in order to manage the installation associated with this GitHubEnterpriseConfig.",
    ).optional(),
    organization: z.string().describe(
      "Optional. Immutable. GitHub Enterprise organization in which the GitHub App is created.",
    ).optional(),
    privateKeySecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. GitHub Enterprise version installed at the host_uri.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL certificate to use for requests to GitHub Enterprise.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of GitHub Enterprise.",
  ).optional(),
  gitlabConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks.",
    ).optional(),
  }).describe("Configuration for connections to gitlab.com.").optional(),
  gitlabEnterpriseConfig: z.object({
    authorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The URI of the GitLab Enterprise host this connection is for.",
    ).optional(),
    readAuthorizerCredential: z.object({
      userTokenSecretVersion: z.string().describe(
        "Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location).",
      ).optional(),
      username: z.string().describe(
        "Output only. The username associated with this token.",
      ).optional(),
    }).describe(
      "Represents a personal access token that authorized the Connection, and associated metadata.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. Version of the GitLab Enterprise server running on the `host_uri`.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL Certificate Authority certificate to use for requests to GitLab Enterprise instance.",
    ).optional(),
    webhookSecretSecretVersion: z.string().describe(
      "Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks.",
    ).optional(),
  }).describe(
    "Configuration for connections to an instance of GitLab Enterprise.",
  ).optional(),
  httpConfig: z.object({
    basicAuthentication: z.object({
      passwordSecretVersion: z.string().describe(
        "The password SecretManager secret version to authenticate as.",
      ).optional(),
      username: z.string().describe(
        "Required. The username to authenticate as.",
      ).optional(),
    }).describe("Basic authentication with username and password.").optional(),
    bearerTokenAuthentication: z.object({
      tokenSecretVersion: z.string().describe(
        "Optional. The token SecretManager secret version to authenticate as.",
      ).optional(),
    }).describe("Bearer token authentication with a token.").optional(),
    hostUri: z.string().describe(
      "Required. Immutable. The service provider's https endpoint.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. The SSL certificate to use for requests to the HTTP service provider.",
    ).optional(),
  }).describe(
    "Defines the configuration for connections to an HTTP service provider.",
  ).optional(),
  installationState: z.object({
    actionUri: z.string().describe(
      "Output only. Link to follow for next action. Empty string if the installation is already complete.",
    ).optional(),
    message: z.string().describe(
      "Output only. Message of what the user should do next to continue the installation. Empty string if the installation is already complete.",
    ).optional(),
    stage: z.enum([
      "STAGE_UNSPECIFIED",
      "PENDING_CREATE_APP",
      "PENDING_USER_OAUTH",
      "PENDING_INSTALL_APP",
      "COMPLETE",
    ]).describe("Output only. Current step of the installation process.")
      .optional(),
  }).describe(
    "Describes stage and necessary actions to be taken by the user to complete the installation. Used for GitHub and GitHub Enterprise based connections.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`.",
  ).optional(),
  secureSourceManagerInstanceConfig: z.object({
    instance: z.string().describe(
      "Required. Immutable. Secure Source Manager instance resource, formatted as `projects/*/locations/*/instances/*`",
    ).optional(),
  }).describe("Configuration for connections to Secure Source Manager instance")
    .optional(),
  connectionId: z.string().describe(
    "Required. Id of the requesting object If auto-generating Id server-side, remove this field and connection_id from the method_signature of Create RPC",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Developer Connect Connections. Registered at `@swamp/gcp/developerconnect/connections`. */
export const model = {
  type: "@swamp/gcp/developerconnect/connections",
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
      description: "Message describing Connection object",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connections",
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
        if (g["bitbucketCloudConfig"] !== undefined) {
          body["bitbucketCloudConfig"] = g["bitbucketCloudConfig"];
        }
        if (g["bitbucketDataCenterConfig"] !== undefined) {
          body["bitbucketDataCenterConfig"] = g["bitbucketDataCenterConfig"];
        }
        if (g["cryptoKeyConfig"] !== undefined) {
          body["cryptoKeyConfig"] = g["cryptoKeyConfig"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["gitProxyConfig"] !== undefined) {
          body["gitProxyConfig"] = g["gitProxyConfig"];
        }
        if (g["githubConfig"] !== undefined) {
          body["githubConfig"] = g["githubConfig"];
        }
        if (g["githubEnterpriseConfig"] !== undefined) {
          body["githubEnterpriseConfig"] = g["githubEnterpriseConfig"];
        }
        if (g["gitlabConfig"] !== undefined) {
          body["gitlabConfig"] = g["gitlabConfig"];
        }
        if (g["gitlabEnterpriseConfig"] !== undefined) {
          body["gitlabEnterpriseConfig"] = g["gitlabEnterpriseConfig"];
        }
        if (g["httpConfig"] !== undefined) body["httpConfig"] = g["httpConfig"];
        if (g["installationState"] !== undefined) {
          body["installationState"] = g["installationState"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["secureSourceManagerInstanceConfig"] !== undefined) {
          body["secureSourceManagerInstanceConfig"] =
            g["secureSourceManagerInstanceConfig"];
        }
        if (g["connectionId"] !== undefined) {
          body["connectionId"] = g["connectionId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
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
      description: "Update connections attributes",
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
        if (g["bitbucketCloudConfig"] !== undefined) {
          body["bitbucketCloudConfig"] = g["bitbucketCloudConfig"];
        }
        if (g["bitbucketDataCenterConfig"] !== undefined) {
          body["bitbucketDataCenterConfig"] = g["bitbucketDataCenterConfig"];
        }
        if (g["cryptoKeyConfig"] !== undefined) {
          body["cryptoKeyConfig"] = g["cryptoKeyConfig"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["gitProxyConfig"] !== undefined) {
          body["gitProxyConfig"] = g["gitProxyConfig"];
        }
        if (g["githubConfig"] !== undefined) {
          body["githubConfig"] = g["githubConfig"];
        }
        if (g["githubEnterpriseConfig"] !== undefined) {
          body["githubEnterpriseConfig"] = g["githubEnterpriseConfig"];
        }
        if (g["gitlabConfig"] !== undefined) {
          body["gitlabConfig"] = g["gitlabConfig"];
        }
        if (g["gitlabEnterpriseConfig"] !== undefined) {
          body["gitlabEnterpriseConfig"] = g["gitlabEnterpriseConfig"];
        }
        if (g["httpConfig"] !== undefined) body["httpConfig"] = g["httpConfig"];
        if (g["installationState"] !== undefined) {
          body["installationState"] = g["installationState"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["secureSourceManagerInstanceConfig"] !== undefined) {
          body["secureSourceManagerInstanceConfig"] =
            g["secureSourceManagerInstanceConfig"];
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
      description: "Delete the connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
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
      description: "Sync connections state from GCP",
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
    fetch_git_hub_installations: {
      description: "fetch git hub installations",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["connection"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "developerconnect.projects.locations.connections.fetchGitHubInstallations",
            "path": "v1/{+connection}:fetchGitHubInstallations",
            "httpMethod": "GET",
            "parameterOrder": ["connection"],
            "parameters": {
              "connection": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    fetch_linkable_git_repositories: {
      description: "fetch linkable git repositories",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["connection"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "developerconnect.projects.locations.connections.fetchLinkableGitRepositories",
            "path": "v1/{+connection}:fetchLinkableGitRepositories",
            "httpMethod": "GET",
            "parameterOrder": ["connection"],
            "parameters": {
              "connection": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    process_git_hub_enterprise_webhook: {
      description: "process git hub enterprise webhook",
      arguments: z.object({
        body: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["body"] !== undefined) body["body"] = args["body"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "developerconnect.projects.locations.connections.processGitHubEnterpriseWebhook",
            "path": "v1/{+parent}/connections:processGitHubEnterpriseWebhook",
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
